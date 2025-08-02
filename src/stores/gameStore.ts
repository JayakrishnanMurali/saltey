import { generateLevel, isGameComplete, pourWater } from "@/lib/gameLogic";
import type {
	GameConfig,
	GameState,
	GameStatus,
	Move,
	Tube,
} from "@/types/game";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface GameStore extends GameState {
	status: GameStatus;
	startTime: number | null;

	// Actions
	selectTube: (tubeId: string) => void;
	pourBetweenTubes: (fromId: string, toId: string) => boolean;
	undoMove: () => void;
	resetGame: () => void;
	startNewGame: (config?: GameConfig) => void;
	updateScore: () => void;
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
		level: 1,
		score: { moves: 0, time: 0, stars: 0 },
		status: "idle",
		startTime: null,

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
			const { level } = get();
			get().startNewGame(defaultConfig);
		},

		startNewGame: (config = defaultConfig) => {
			const tubes = generateLevel(config);
			set({
				tubes,
				selectedTubeId: null,
				moves: [],
				isComplete: false,
				canUndo: false,
				score: { moves: 0, time: 0, stars: 0 },
				status: "playing",
				startTime: Date.now(),
			});
		},

		updateScore: () => {
			const { moves, startTime } = get();
			const currentTime = startTime ? Date.now() - startTime : 0;

			// Calculate stars based on moves (simple logic for now)
			let stars = 3;
			if (moves.length > 15) stars = 2;
			if (moves.length > 25) stars = 1;

			set({
				score: {
					moves: moves.length,
					time: Math.floor(currentTime / 1000),
					stars,
				},
			});
		},
	})),
);

// Initialize game on first load
useGameStore.getState().startNewGame();
