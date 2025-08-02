"use client";

import { GameBoard } from "@/components/game/GameBoard";
import { LevelSelect } from "@/components/game/LevelSelect";
import { useGameStore } from "@/stores/gameStore";

export default function HomePage() {
	const { status, startLevel } = useGameStore();

	if (status === "levelSelect") {
		return (
			<main>
				<LevelSelect onLevelSelect={startLevel} />
			</main>
		);
	}

	return (
		<main>
			<GameBoard />
		</main>
	);
}
