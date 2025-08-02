"use client";

import { Button } from "@/components/ui/button";
import { LEVELS } from "@/lib/levels";
import {
	getTotalStarsForDifficulty,
	isLevelUnlocked,
	loadPlayerProgress,
} from "@/lib/storage";
import type { Difficulty, Level, PlayerProgress } from "@/types/game";
import { motion } from "framer-motion";
import { Lock, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface LevelSelectProps {
	onLevelSelect: (level: Level) => void;
	onBack?: () => void;
}

interface LevelCardProps {
	level: Level;
	progress: PlayerProgress;
	onSelect: (level: Level) => void;
}

function LevelCard({ level, progress, onSelect }: LevelCardProps) {
	const isUnlocked = isLevelUnlocked(level.id, progress);
	const levelProgress = progress.levelProgress[level.id];
	const stars = levelProgress?.bestScore?.stars ?? 0;

	const difficultyColors = {
		Easy: "bg-green-100 border-green-300 text-green-800",
		Medium: "bg-yellow-100 border-yellow-300 text-yellow-800",
		Hard: "bg-red-100 border-red-300 text-red-800",
	};

	return (
		<motion.div
			className={`relative rounded-lg border-2 p-4 transition-all cursor-pointer${
				isUnlocked
					? "border-gray-300 bg-white hover:border-blue-400 hover:shadow-md"
					: "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60"
			}
			`}
			onClick={() => isUnlocked && onSelect(level)}
			whileHover={isUnlocked ? { scale: 1.02 } : {}}
			whileTap={isUnlocked ? { scale: 0.98 } : {}}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.3 }}
		>
			{/* Lock overlay for locked levels */}
			{!isUnlocked && (
				<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-gray-100 bg-opacity-90">
					<Lock className="h-8 w-8 text-gray-400" />
				</div>
			)}

			{/* Level number */}
			<div className="mb-2 flex items-center justify-between">
				<span className="font-bold text-2xl text-gray-800">{level.id}</span>
				<span
					className={`rounded px-2 py-1 font-medium text-xs ${difficultyColors[level.difficulty]}`}
				>
					{level.difficulty}
				</span>
			</div>

			{/* Level name */}
			<h3 className="mb-3 font-semibold text-gray-700 text-sm">{level.name}</h3>

			{/* Stars */}
			<div className="flex items-center gap-1">
				{[1, 2, 3].map((starIndex) => (
					<Star
						key={starIndex}
						className={`h-4 w-4 ${
							starIndex <= stars
								? "fill-yellow-400 text-yellow-400"
								: "text-gray-300"
						}`}
					/>
				))}
			</div>

			{/* Best score */}
			{levelProgress?.bestScore && (
				<div className="mt-2 text-gray-500 text-xs">
					Best: {levelProgress.bestScore.moves} moves
				</div>
			)}
		</motion.div>
	);
}

interface DifficultySectioinProps {
	difficulty: Difficulty;
	levels: Level[];
	progress: PlayerProgress;
	onLevelSelect: (level: Level) => void;
}

function DifficultySection({
	difficulty,
	levels,
	progress,
	onLevelSelect,
}: DifficultySectioinProps) {
	const { earned, total } = getTotalStarsForDifficulty(difficulty, progress);

	const difficultyColors = {
		Easy: "text-green-600",
		Medium: "text-yellow-600",
		Hard: "text-red-600",
	};

	return (
		<motion.div
			className="mb-8"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<div className="mb-4 flex items-center justify-between">
				<h2 className={`font-bold text-xl ${difficultyColors[difficulty]}`}>
					{difficulty} Levels
				</h2>
				<div className="flex items-center gap-1 text-gray-600 text-sm">
					<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
					<span>
						{earned}/{total}
					</span>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{levels.map((level) => (
					<LevelCard
						key={level.id}
						level={level}
						progress={progress}
						onSelect={onLevelSelect}
					/>
				))}
			</div>
		</motion.div>
	);
}

export function LevelSelect({ onLevelSelect, onBack }: LevelSelectProps) {
	const [progress, setProgress] = useState<PlayerProgress | null>(null);

	useEffect(() => {
		setProgress(loadPlayerProgress());
	}, []);

	if (!progress) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center">
					<div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-blue-600 border-b-2" />
					<p className="text-gray-600">Loading your progress...</p>
				</div>
			</div>
		);
	}

	const easyLevels = LEVELS.filter((level) => level.difficulty === "Easy");
	const mediumLevels = LEVELS.filter((level) => level.difficulty === "Medium");
	const hardLevels = LEVELS.filter((level) => level.difficulty === "Hard");

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
			<div className="mx-auto max-w-6xl">
				{/* Header */}
				<motion.div
					className="mb-8 flex items-center justify-between"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<div>
						<h1 className="mb-2 font-bold text-3xl text-gray-800">
							Select Level
						</h1>
						<div className="flex items-center gap-4 text-gray-600 text-sm">
							<div className="flex items-center gap-1">
								<Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
								<span>{progress.totalStars} total stars</span>
							</div>
							<div>
								{progress.levelsCompleted}/{LEVELS.length} completed
							</div>
						</div>
					</div>

					{onBack && (
						<Button variant="outline" onClick={onBack}>
							← Back to Game
						</Button>
					)}
				</motion.div>

				{/* Difficulty Sections */}
				<DifficultySection
					difficulty="Easy"
					levels={easyLevels}
					progress={progress}
					onLevelSelect={onLevelSelect}
				/>

				<DifficultySection
					difficulty="Medium"
					levels={mediumLevels}
					progress={progress}
					onLevelSelect={onLevelSelect}
				/>

				<DifficultySection
					difficulty="Hard"
					levels={hardLevels}
					progress={progress}
					onLevelSelect={onLevelSelect}
				/>
			</div>
		</div>
	);
}
