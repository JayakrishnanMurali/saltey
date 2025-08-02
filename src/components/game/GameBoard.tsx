"use client";

import { Button } from "@/components/ui/button";
import { getNextLevel } from "@/lib/levels";
import { useGameStore } from "@/stores/gameStore";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw, SkipForward, Undo } from "lucide-react";
import { Tube } from "./Tube";

export function GameBoard() {
	const {
		tubes,
		selectedTubeId,
		score,
		isComplete,
		canUndo,
		status,
		currentLevel,
		selectTube,
		undoMove,
		resetGame,
		startLevel,
		goToLevelSelect,
	} = useGameStore();

	if (status === "idle") {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<Button onClick={goToLevelSelect}>Select Level</Button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 sm:p-4">
			<div className="mx-auto max-w-4xl">
				{/* Header */}
				<div className="mb-4 flex flex-col gap-4 sm:mb-8">
					{/* Level info and back button */}
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								size="sm"
								onClick={goToLevelSelect}
								className="px-2 text-xs sm:px-3 sm:text-sm"
							>
								<ArrowLeft className="mr-1 h-4 w-4" />
								Levels
							</Button>
							{currentLevel && (
								<div>
									<h2 className="font-bold text-lg">Level {currentLevel.id}</h2>
									<p className="text-gray-600 text-sm">{currentLevel.name}</p>
								</div>
							)}
						</div>

						<div className="flex items-center gap-1 text-sm">
							<span
								className={`rounded px-2 py-1 font-medium text-xs ${
									currentLevel?.difficulty === "Easy"
										? "bg-green-100 text-green-800"
										: currentLevel?.difficulty === "Medium"
											? "bg-yellow-100 text-yellow-800"
											: "bg-red-100 text-red-800"
								}`}
							>
								{currentLevel?.difficulty || "Custom"}
							</span>
						</div>
					</div>

					{/* Score and controls */}
					<div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
						<div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-4">
							<div className="text-xs sm:text-sm">
								<span className="font-semibold">Moves:</span> {score.moves}
							</div>
							<div className="text-xs sm:text-sm">
								<span className="font-semibold">Time:</span> {score.time}s
							</div>
							<div className="text-xs sm:text-sm">
								<span className="font-semibold">Stars:</span> ⭐ {score.stars}/3
							</div>
						</div>

						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={undoMove}
								disabled={!canUndo}
								className="px-2 text-xs sm:px-3 sm:text-sm"
							>
								<Undo className="mr-1 h-4 w-4" />
								Undo
							</Button>
							<Button
								variant="outline"
								size="sm"
								onClick={resetGame}
								className="px-2 text-xs sm:px-3 sm:text-sm"
							>
								<RotateCcw className="mr-1 h-4 w-4" />
								Reset
							</Button>
						</div>
					</div>
				</div>

				{/* Game Board */}
				<motion.div
					className="mb-4 flex flex-wrap justify-center gap-2 px-2 sm:mb-8 sm:gap-4"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, staggerChildren: 0.1 }}
				>
					{tubes.map((tube, index) => (
						<motion.div
							key={tube.id}
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.4,
								delay: index * 0.1,
								ease: "easeOut",
							}}
							className="flex-shrink-0"
						>
							<Tube
								tube={tube}
								isSelected={selectedTubeId === tube.id}
								onClick={() => selectTube(tube.id)}
							/>
						</motion.div>
					))}
				</motion.div>

				{/* Game Status */}
				<AnimatePresence>
					{isComplete && (
						<motion.div
							className="text-center"
							initial={{ opacity: 0, scale: 0.8, y: 50 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.8, y: 50 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
						>
							<motion.div
								className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
								initial={{ rotateY: -90 }}
								animate={{ rotateY: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<motion.h2
									className="mb-2 font-bold text-2xl"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.4 }}
								>
									🎉{" "}
									{currentLevel
										? `Level ${currentLevel.id} Complete!`
										: "Congratulations!"}
								</motion.h2>
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.6 }}
								>
									You completed {currentLevel ? currentLevel.name : "the level"}{" "}
									in {score.moves} moves!
								</motion.p>
								<motion.p
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 0.8 }}
								>
									Rating: {"⭐".repeat(score.stars)}
								</motion.p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 1 }}
								className="flex gap-2"
							>
								{currentLevel && getNextLevel(currentLevel.id) && (
									<Button
										onClick={() => {
											const nextLevel = getNextLevel(currentLevel.id);
											if (nextLevel) startLevel(nextLevel);
										}}
									>
										<SkipForward className="mr-1 h-4 w-4" />
										Next Level
									</Button>
								)}
								<Button variant="outline" onClick={resetGame}>
									Play Again
								</Button>
								<Button variant="outline" onClick={goToLevelSelect}>
									Level Select
								</Button>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Instructions */}
				{!isComplete && selectedTubeId === null && (
					<motion.div
						className="px-4 text-center text-gray-600 text-xs sm:text-sm"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 1 }}
					>
						Tap a tube to select it, then tap another tube to pour water
					</motion.div>
				)}

				{selectedTubeId && (
					<motion.div
						className="px-4 text-center text-blue-600 text-xs sm:text-sm"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
					>
						Selected tube: {selectedTubeId}. Tap another tube to pour water.
					</motion.div>
				)}
			</div>
		</div>
	);
}
