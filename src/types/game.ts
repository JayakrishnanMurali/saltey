export type Color =
	| "red"
	| "blue"
	| "green"
	| "yellow"
	| "purple"
	| "orange"
	| "pink"
	| "cyan";

export interface WaterLayer {
	color: Color;
	amount: number; // 0-1, represents how much of tube capacity this layer takes
}

export interface Tube {
	id: string;
	capacity: number; // maximum number of layers
	layers: WaterLayer[];
	isEmpty: boolean;
	isFull: boolean;
	isComplete: boolean; // true if all layers are same color
}

export interface Move {
	from: string;
	to: string;
	timestamp: number;
}

export interface GameState {
	tubes: Tube[];
	selectedTubeId: string | null;
	moves: Move[];
	isComplete: boolean;
	canUndo: boolean;
	currentLevel: Level | null;
	score: {
		moves: number;
		time: number;
		stars: number;
	};
}

export interface GameConfig {
	tubeCount: number;
	tubeCapacity: number;
	colorCount: number;
	emptyTubes: number;
}

export type GameStatus =
	| "idle"
	| "playing"
	| "completed"
	| "paused"
	| "levelSelect";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Level {
	id: number;
	name: string;
	difficulty: Difficulty;
	config: GameConfig;
	starThresholds: {
		threeStar: number; // max moves for 3 stars
		twoStar: number; // max moves for 2 stars
		oneStar: number; // max moves for 1 star
	};
	isUnlocked: boolean;
}

export interface LevelProgress {
	levelId: number;
	completed: boolean;
	bestScore: {
		moves: number;
		time: number;
		stars: number;
	} | null;
	completedAt?: Date;
}

export interface PlayerProgress {
	currentLevel: number;
	totalStars: number;
	levelsCompleted: number;
	levelProgress: Record<number, LevelProgress>;
	lastPlayed?: Date;
}
