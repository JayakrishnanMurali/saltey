"use client";

import { useResponsive } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import type { Color, Tube as TubeType } from "@/types/game";
import { AnimatePresence, motion } from "framer-motion";

interface TubeProps {
	tube: TubeType;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
}

const colorMap: Record<Color, string> = {
	red: "bg-red-500",
	blue: "bg-blue-500",
	green: "bg-green-500",
	yellow: "bg-yellow-500",
	purple: "bg-purple-500",
	orange: "bg-orange-500",
	pink: "bg-pink-500",
	cyan: "bg-cyan-500",
};

export function Tube({ tube, isSelected, onClick, className }: TubeProps) {
	const { isMobile } = useResponsive();

	// Responsive tube dimensions
	const tubeHeight = isMobile ? 150 : 200;
	const tubeWidth = isMobile ? 50 : 60;
	const layerHeight = tubeHeight / tube.capacity;

	return (
		<div className={cn("flex flex-col items-center gap-2", className)}>
			<motion.div
				className={cn(
					"relative cursor-pointer rounded-b-lg border-4 border-gray-800",
					"hover:border-gray-600",
					isSelected && "border-blue-500 ring-2 ring-blue-300",
				)}
				style={{ width: tubeWidth, height: tubeHeight }}
				onClick={onClick}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				animate={{
					borderColor: isSelected ? "#3b82f6" : "#1f2937",
					scale: isSelected ? 1.02 : 1,
				}}
				transition={{ duration: 0.2 }}
			>
				{/* Water layers */}
				<div className="absolute right-0 bottom-0 left-0 flex flex-col-reverse overflow-hidden rounded-b-lg">
					<AnimatePresence>
						{tube.layers.map((layer, index) => (
							<motion.div
								key={`${index}-${layer.color}`}
								className={cn(
									"relative rounded-b-lg",
									colorMap[layer.color],
									index === tube.layers.length - 1 && "rounded-t-lg",
								)}
								initial={{ height: 0, opacity: 0 }}
								animate={{
									height: layerHeight * layer.amount,
									opacity: 1,
								}}
								exit={{ height: 0, opacity: 0 }}
								transition={{
									duration: 0.4,
									ease: "easeInOut",
									delay: index * 0.1,
								}}
								style={{ width: "100%" }}
							>
								{/* Water surface ripple effect */}
								{index === tube.layers.length - 1 && (
									<motion.div
										className="absolute top-0 right-0 left-0 h-1 rounded-t-lg bg-white bg-opacity-30"
										animate={{
											opacity: [0.3, 0.6, 0.3],
										}}
										transition={{
											duration: 2,
											repeat: Number.POSITIVE_INFINITY,
											ease: "easeInOut",
										}}
									/>
								)}
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{/* Tube rim */}
				<motion.div
					className="-top-2 -translate-x-1/2 absolute left-1/2 transform rounded-full bg-gray-800"
					style={{ width: tubeWidth + 8, height: 8 }}
					animate={{
						boxShadow: isSelected
							? "0 0 10px rgba(59, 130, 246, 0.5)"
							: "0 0 0px rgba(0, 0, 0, 0)",
					}}
				/>

				{/* Selection glow effect */}
				{isSelected && (
					<motion.div
						className="pointer-events-none absolute inset-0 rounded-b-lg"
						initial={{ opacity: 0 }}
						animate={{
							opacity: [0.5, 0.8, 0.5],
							boxShadow: [
								"0 0 20px rgba(59, 130, 246, 0.3)",
								"0 0 30px rgba(59, 130, 246, 0.5)",
								"0 0 20px rgba(59, 130, 246, 0.3)",
							],
						}}
						transition={{
							duration: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
				)}
			</motion.div>

			{/* Tube ID for debugging */}
			<span className="text-gray-500 text-xs">{tube.id}</span>
		</div>
	);
}
