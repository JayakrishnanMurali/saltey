import { generateLevel, isGameComplete, pourWater } from "@/lib/gameLogic";
import { calculateStars, getLevelById, getNextLevel } from "@/lib/levels";
import { loadPlayerProgress, updateLevelProgress } from "@/lib/storage";
import type {
	GameConfig,
	GameState,
	GameStatus,
	Level,
	Move,
	PlayerProgress,
	Tube,
} from "@/types/game";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GameStore extends GameState {
	status: GameStatus;
	startTime: number | null;
	playerProgress: PlayerProgress | null;

	// Actions
	selectTube: (tubeId: string) => void;
	pourBetweenTubes: (fromId: string, toId: string) => boolean;
	undoMove: () => void;
	resetGame: () => void;
	startLevel: (level: Level) => void;
	startNewGame: (config?: GameConfig) => void;
	updateScore: () => void;
	completeLevel: () => void;
	goToLevelSelect: () => void;
	loadProgress: () => void;
}

const defaultConfig: GameConfig = {
	tubeCount: 6,
	tubeCapacity: 4,
	colorCount: 4,
	emptyTubes: 2,
};

export const useGameStore = create<GameStore>()(
	subscribeWithSelector((set, get) => ({
		// Initial state
		tubes: [],
		selectedTubeId: null,
		moves: [],
		isComplete: false,
		canUndo: false,
		currentLevel: null,
		score: { moves: 0, time: 0, stars: 0 },
		status: "levelSelect",
		startTime: null,
		playerProgress: null,

		selectTube: (tubeId: string) => {
			const { selectedTubeId, tubes, pourBetweenTubes } = get();

			if (selectedTubeId === null) {
				// First selection
				const tube = tubes.find((t) => t.id === tubeId);
				if (tube && !tube.isEmpty) {
					set({ selectedTubeId: tubeId });
				}
			} else if (selectedTubeId === tubeId) {
				// Deselect same tube
				set({ selectedTubeId: null });
			} else {
				// Pour from selected to clicked tube
				const success = pourBetweenTubes(selectedTubeId, tubeId);
				if (success) {
					set({ selectedTubeId: null });
				}
			}
		},

		pourBetweenTubes: (fromId: string, toId: string) => {
			const { tubes } = get();
			const fromTube = tubes.find((t) => t.id === fromId);
			const toTube = tubes.find((t) => t.id === toId);

			if (!fromTube || !toTube) return false;

			const result = pourWater(fromTube, toTube);
			if (!result) return false;

			const newTubes = tubes.map((tube) => {
				if (tube.id === fromId) return result.from;
				if (tube.id === toId) return result.to;
				return tube;
			});

			const move: Move = {
				from: fromId,
				to: toId,
				timestamp: Date.now(),
			};

			const newMoves = [...get().moves, move];
			const gameComplete = isGameComplete(newTubes);

			set({
				tubes: newTubes,
				moves: newMoves,
				canUndo: newMoves.length > 0,
				isComplete: gameComplete,
				status: gameComplete ? "completed" : "playing",
			});

			get().updateScore();

			// Complete level if game is complete
			if (gameComplete) {
				get().completeLevel();
			}

			return true;
		},

		undoMove: () => {
			const { moves } = get();
			if (moves.length === 0) return;

			// For now, just remove the last move
			// In a full implementation, we'd store tube states
			const newMoves = moves.slice(0, -1);
			set({
				moves: newMoves,
				canUndo: newMoves.length > 0,
				selectedTubeId: null,
			});
		},

		resetGame: () => {
			const { currentLevel } = get();
			if (currentLevel) {
				get().startLevel(currentLevel);
			}
		},

		startLevel: (level: Level) => {
			const tubes = generateLevel(level.config);
			set({
				tubes,
				selectedTubeId: null,
				moves: [],
				isComplete: false,
				canUndo: false,
				currentLevel: level,
				score: { moves: 0, time: 0, stars: 0 },
				status: "playing",
				startTime: Date.now(),
			});
		},

		startNewGame: (config = defaultConfig) => {
			const tubes = generateLevel(config);
			set({
				tubes,
				selectedTubeId: null,
				moves: [],
				isComplete: false,
				canUndo: false,
				currentLevel: null,
				score: { moves: 0, time: 0, stars: 0 },
				status: "playing",
				startTime: Date.now(),
			});
		},

		updateScore: () => {
			const { moves, startTime, currentLevel } = get();
			const currentTime = startTime ? Date.now() - startTime : 0;

			// Calculate stars based on level thresholds if we have a level
			let stars = 0;
			if (currentLevel) {
				stars = calculateStars(moves.length, currentLevel);
			} else {
				// Fallback for custom games
				if (moves.length <= 15) stars = 3;
				else if (moves.length <= 25) stars = 2;
				else stars = 1;
			}

			set({
				score: {
					moves: moves.length,
					time: Math.floor(currentTime / 1000),
					stars,
				},
			});
		},

		completeLevel: () => {
			const { currentLevel, score } = get();
			if (!currentLevel) return;

			// Update progress and save to localStorage
			const updatedProgress = updateLevelProgress(
				currentLevel.id,
				score.moves,
				score.time,
				score.stars,
			);

			set({
				playerProgress: updatedProgress,
			});
		},

		goToLevelSelect: () => {
			set({
				status: "levelSelect",
				tubes: [],
				selectedTubeId: null,
				moves: [],
				isComplete: false,
				canUndo: false,
				currentLevel: null,
				score: { moves: 0, time: 0, stars: 0 },
				startTime: null,
			});
		},

		loadProgress: () => {
			const progress = loadPlayerProgress();
			set({ playerProgress: progress });
		},
	})),
);

// Initialize progress on first load
useGameStore.getState().loadProgress();
