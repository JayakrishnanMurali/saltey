"use client";

import type { LevelProgress, PlayerProgress } from "@/types/game";
import { LEVELS } from "./levels";

const STORAGE_KEY = "saltey-progress";

function getDefaultProgress(): PlayerProgress {
	return {
		currentLevel: 1,
		totalStars: 0,
		levelsCompleted: 0,
		levelProgress: {},
		lastPlayed: new Date(),
	};
}

export function loadPlayerProgress(): PlayerProgress {
	if (typeof window === "undefined") {
		return getDefaultProgress();
	}

	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (!stored) {
			return getDefaultProgress();
		}

		const parsed = JSON.parse(stored) as PlayerProgress;

		// Convert date strings back to Date objects
		if (parsed.lastPlayed) {
			parsed.lastPlayed = new Date(parsed.lastPlayed);
		}

		for (const levelProgress of Object.values(parsed.levelProgress)) {
			if (levelProgress.completedAt) {
				levelProgress.completedAt = new Date(levelProgress.completedAt);
			}
		}

		return parsed;
	} catch (error) {
		console.warn("Failed to load player progress:", error);
		return getDefaultProgress();
	}
}

export function savePlayerProgress(progress: PlayerProgress): void {
	if (typeof window === "undefined") {
		return;
	}

	try {
		const toSave = {
			...progress,
			lastPlayed: new Date(),
		};
		localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
	} catch (error) {
		console.warn("Failed to save player progress:", error);
	}
}

export function updateLevelProgress(
	levelId: number,
	moves: number,
	time: number,
	stars: number,
): PlayerProgress {
	const currentProgress = loadPlayerProgress();
	const existingLevelProgress = currentProgress.levelProgress[levelId];

	const newLevelProgress: LevelProgress = {
		levelId,
		completed: true,
		bestScore: {
			moves,
			time,
			stars,
		},
		completedAt: new Date(),
	};

	// Only update if this is a better score or first completion
	if (
		!existingLevelProgress ||
		stars > (existingLevelProgress.bestScore?.stars ?? 0) ||
		(stars === (existingLevelProgress.bestScore?.stars ?? 0) &&
			moves <
				(existingLevelProgress.bestScore?.moves ?? Number.POSITIVE_INFINITY))
	) {
		// Remove old stars from total if updating
		if (existingLevelProgress?.bestScore) {
			currentProgress.totalStars -= existingLevelProgress.bestScore.stars;
		}

		currentProgress.levelProgress[levelId] = newLevelProgress;
		currentProgress.totalStars += stars;

		// If this is first completion, increment completed count
		if (!existingLevelProgress) {
			currentProgress.levelsCompleted += 1;
		}

		// Update current level to next available
		if (levelId === currentProgress.currentLevel && levelId < LEVELS.length) {
			currentProgress.currentLevel = levelId + 1;
		}
	}

	savePlayerProgress(currentProgress);
	return currentProgress;
}

export function isLevelUnlocked(
	levelId: number,
	progress: PlayerProgress,
): boolean {
	// Level 1 is always unlocked
	if (levelId === 1) return true;

	// Check if previous level is completed
	const previousLevelProgress = progress.levelProgress[levelId - 1];
	return previousLevelProgress?.completed ?? false;
}

export function getTotalStarsForDifficulty(
	difficulty: "Easy" | "Medium" | "Hard",
	progress: PlayerProgress,
): { earned: number; total: number } {
	const difficultyLevels = LEVELS.filter(
		(level) => level.difficulty === difficulty,
	);
	const total = difficultyLevels.length * 3; // max 3 stars per level

	const earned = difficultyLevels.reduce((sum, level) => {
		const levelProgress = progress.levelProgress[level.id];
		return sum + (levelProgress?.bestScore?.stars ?? 0);
	}, 0);

	return { earned, total };
}

export function resetProgress(): void {
	if (typeof window === "undefined") {
		return;
	}

	localStorage.removeItem(STORAGE_KEY);
}
