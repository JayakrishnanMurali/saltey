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
	level: number;
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

export type GameStatus = "idle" | "playing" | "completed" | "paused";
