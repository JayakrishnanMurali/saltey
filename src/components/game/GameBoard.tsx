"use client";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/gameStore";
import { AnimatePresence, motion } from "framer-motion";
import { Tube } from "./Tube";

export function GameBoard() {
  const {
    tubes,
    selectedTubeId,
    score,
    isComplete,
    canUndo,
    status,
    selectTube,
    undoMove,
    resetGame,
  } = useGameStore();

  if (status === "idle") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button onClick={() => useGameStore.getState().startNewGame()}>
          Start Game
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-2 sm:p-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center justify-between gap-4 sm:mb-8 sm:flex-row">
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
              Undo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="px-2 text-xs sm:px-3 sm:text-sm"
            >
              Reset
            </Button>
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
                  🎉 Congratulations!
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  You completed the level in {score.moves} moves!
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
              >
                <Button onClick={resetGame}>Play Again</Button>
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
