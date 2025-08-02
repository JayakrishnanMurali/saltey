import type { Difficulty, Level } from "@/types/game";

export const LEVELS: Level[] = [
	// Easy Levels (1-5)
	{
		id: 1,
		name: "First Pour",
		difficulty: "Easy",
		config: {
			tubeCount: 4,
			tubeCapacity: 3,
			colorCount: 2,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 3,
			twoStar: 5,
			oneStar: 8,
		},
		isUnlocked: true,
	},
	{
		id: 2,
		name: "Three Colors",
		difficulty: "Easy",
		config: {
			tubeCount: 5,
			tubeCapacity: 3,
			colorCount: 3,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 6,
			twoStar: 9,
			oneStar: 12,
		},
		isUnlocked: false,
	},
	{
		id: 3,
		name: "Getting Warmer",
		difficulty: "Easy",
		config: {
			tubeCount: 5,
			tubeCapacity: 4,
			colorCount: 3,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 8,
			twoStar: 12,
			oneStar: 16,
		},
		isUnlocked: false,
	},
	{
		id: 4,
		name: "Four Square",
		difficulty: "Easy",
		config: {
			tubeCount: 6,
			tubeCapacity: 4,
			colorCount: 4,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 12,
			twoStar: 16,
			oneStar: 22,
		},
		isUnlocked: false,
	},
	{
		id: 5,
		name: "Easy Champion",
		difficulty: "Easy",
		config: {
			tubeCount: 7,
			tubeCapacity: 4,
			colorCount: 4,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 15,
			twoStar: 20,
			oneStar: 28,
		},
		isUnlocked: false,
	},

	// Medium Levels (6-12)
	{
		id: 6,
		name: "Step It Up",
		difficulty: "Medium",
		config: {
			tubeCount: 7,
			tubeCapacity: 4,
			colorCount: 5,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 18,
			twoStar: 25,
			oneStar: 35,
		},
		isUnlocked: false,
	},
	{
		id: 7,
		name: "Rainbow Mix",
		difficulty: "Medium",
		config: {
			tubeCount: 8,
			tubeCapacity: 4,
			colorCount: 5,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 20,
			twoStar: 28,
			oneStar: 38,
		},
		isUnlocked: false,
	},
	{
		id: 8,
		name: "Six Pack",
		difficulty: "Medium",
		config: {
			tubeCount: 8,
			tubeCapacity: 4,
			colorCount: 6,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 22,
			twoStar: 30,
			oneStar: 42,
		},
		isUnlocked: false,
	},
	{
		id: 9,
		name: "Deep Waters",
		difficulty: "Medium",
		config: {
			tubeCount: 8,
			tubeCapacity: 5,
			colorCount: 6,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 25,
			twoStar: 35,
			oneStar: 48,
		},
		isUnlocked: false,
	},
	{
		id: 10,
		name: "Color Chaos",
		difficulty: "Medium",
		config: {
			tubeCount: 9,
			tubeCapacity: 4,
			colorCount: 6,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 28,
			twoStar: 38,
			oneStar: 52,
		},
		isUnlocked: false,
	},
	{
		id: 11,
		name: "Almost There",
		difficulty: "Medium",
		config: {
			tubeCount: 9,
			tubeCapacity: 5,
			colorCount: 6,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 30,
			twoStar: 42,
			oneStar: 58,
		},
		isUnlocked: false,
	},
	{
		id: 12,
		name: "Medium Master",
		difficulty: "Medium",
		config: {
			tubeCount: 10,
			tubeCapacity: 5,
			colorCount: 7,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 35,
			twoStar: 48,
			oneStar: 65,
		},
		isUnlocked: false,
	},

	// Hard Levels (13-20)
	{
		id: 13,
		name: "Hard Start",
		difficulty: "Hard",
		config: {
			tubeCount: 10,
			tubeCapacity: 5,
			colorCount: 8,
			emptyTubes: 2,
		},
		starThresholds: {
			threeStar: 38,
			twoStar: 52,
			oneStar: 72,
		},
		isUnlocked: false,
	},
	{
		id: 14,
		name: "Overflow",
		difficulty: "Hard",
		config: {
			tubeCount: 11,
			tubeCapacity: 5,
			colorCount: 8,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 42,
			twoStar: 58,
			oneStar: 78,
		},
		isUnlocked: false,
	},
	{
		id: 15,
		name: "Deep Trouble",
		difficulty: "Hard",
		config: {
			tubeCount: 11,
			tubeCapacity: 6,
			colorCount: 8,
			emptyTubes: 3,
		},
		starThresholds: {
			threeStar: 45,
			twoStar: 62,
			oneStar: 85,
		},
		isUnlocked: false,
	},
	{
		id: 16,
		name: "Color Storm",
		difficulty: "Hard",
		config: {
			tubeCount: 12,
			tubeCapacity: 6,
			colorCount: 8,
			emptyTubes: 4,
		},
		starThresholds: {
			threeStar: 48,
			twoStar: 66,
			oneStar: 90,
		},
		isUnlocked: false,
	},
	{
		id: 17,
		name: "Expert Level",
		difficulty: "Hard",
		config: {
			tubeCount: 12,
			tubeCapacity: 6,
			colorCount: 8,
			emptyTubes: 4,
		},
		starThresholds: {
			threeStar: 50,
			twoStar: 70,
			oneStar: 95,
		},
		isUnlocked: false,
	},
	{
		id: 18,
		name: "Mind Bender",
		difficulty: "Hard",
		config: {
			tubeCount: 13,
			tubeCapacity: 6,
			colorCount: 8,
			emptyTubes: 5,
		},
		starThresholds: {
			threeStar: 55,
			twoStar: 75,
			oneStar: 100,
		},
		isUnlocked: false,
	},
	{
		id: 19,
		name: "Final Challenge",
		difficulty: "Hard",
		config: {
			tubeCount: 14,
			tubeCapacity: 6,
			colorCount: 8,
			emptyTubes: 6,
		},
		starThresholds: {
			threeStar: 60,
			twoStar: 80,
			oneStar: 110,
		},
		isUnlocked: false,
	},
	{
		id: 20,
		name: "Saltey Master",
		difficulty: "Hard",
		config: {
			tubeCount: 15,
			tubeCapacity: 6,
			colorCount: 8,
			emptyTubes: 7,
		},
		starThresholds: {
			threeStar: 65,
			twoStar: 85,
			oneStar: 120,
		},
		isUnlocked: false,
	},
];

export function getLevelById(id: number): Level | undefined {
	return LEVELS.find((level) => level.id === id);
}

export function getLevelsByDifficulty(difficulty: Difficulty): Level[] {
	return LEVELS.filter((level) => level.difficulty === difficulty);
}

export function getNextLevel(currentLevelId: number): Level | undefined {
	return LEVELS.find((level) => level.id === currentLevelId + 1);
}

export function calculateStars(moves: number, level: Level): number {
	if (moves <= level.starThresholds.threeStar) return 3;
	if (moves <= level.starThresholds.twoStar) return 2;
	if (moves <= level.starThresholds.oneStar) return 1;
	return 0;
}
