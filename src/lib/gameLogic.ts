import type { Color, GameConfig, Tube, WaterLayer } from "@/types/game";

export function createTube(
	id: string,
	capacity: number,
	layers: WaterLayer[] = [],
): Tube {
	const isEmpty = layers.length === 0;
	const isFull =
		layers.reduce((sum, layer) => sum + layer.amount, 0) >= capacity;
	const isComplete =
		layers.length > 0 &&
		layers.every((layer) => layer.color === layers[0]?.color);

	return {
		id,
		capacity,
		layers,
		isEmpty,
		isFull,
		isComplete,
	};
}

export function canPour(fromTube: Tube, toTube: Tube): boolean {
	// Can't pour from empty tube
	if (fromTube.isEmpty) return false;

	// Can't pour into full tube
	if (toTube.isFull) return false;

	// Can't pour into same tube
	if (fromTube.id === toTube.id) return false;

	// If destination is empty, can always pour
	if (toTube.isEmpty) return true;

	// Can only pour if top colors match
	const fromTopColor = fromTube.layers[fromTube.layers.length - 1]?.color;
	const toTopColor = toTube.layers[toTube.layers.length - 1]?.color;

	return fromTopColor === toTopColor;
}

export function pourWater(
	fromTube: Tube,
	toTube: Tube,
): { from: Tube; to: Tube } | null {
	if (!canPour(fromTube, toTube)) return null;

	const newFromLayers = [...fromTube.layers];
	const newToLayers = [...toTube.layers];

	// Get the top layer from source
	const topLayer = newFromLayers.pop();
	if (!topLayer) return null;

	// Calculate how much we can pour
	const toCapacity =
		toTube.capacity - newToLayers.reduce((sum, layer) => sum + layer.amount, 0);
	const pourAmount = Math.min(topLayer.amount, toCapacity);

	// Add to destination
	const existingTopLayer = newToLayers[newToLayers.length - 1];
	if (existingTopLayer && existingTopLayer.color === topLayer.color) {
		// Combine with existing layer
		existingTopLayer.amount += pourAmount;
	} else {
		// Add new layer
		newToLayers.push({
			color: topLayer.color,
			amount: pourAmount,
		});
	}

	// Update source
	if (topLayer.amount > pourAmount) {
		// Keep remaining in source
		newFromLayers.push({
			color: topLayer.color,
			amount: topLayer.amount - pourAmount,
		});
	}

	return {
		from: createTube(fromTube.id, fromTube.capacity, newFromLayers),
		to: createTube(toTube.id, toTube.capacity, newToLayers),
	};
}

export function isGameComplete(tubes: Tube[]): boolean {
	return tubes.every((tube) => tube.isEmpty || tube.isComplete);
}

export function generateLevel(config: GameConfig): Tube[] {
	const { tubeCount, tubeCapacity, colorCount, emptyTubes } = config;
	const colors: Color[] = [
		"red",
		"blue",
		"green",
		"yellow",
		"purple",
		"orange",
		"pink",
		"cyan",
	];
	const selectedColors = colors.slice(0, colorCount);

	// Create tubes
	const tubes: Tube[] = [];

	// Create filled tubes
	const filledTubes = tubeCount - emptyTubes;
	for (let i = 0; i < filledTubes; i++) {
		tubes.push(createTube(`tube-${i}`, tubeCapacity));
	}

	// Create empty tubes
	for (let i = filledTubes; i < tubeCount; i++) {
		tubes.push(createTube(`tube-${i}`, tubeCapacity, []));
	}

	// Distribute colors randomly across filled tubes
	const allLayers: WaterLayer[] = [];
	for (const color of selectedColors) {
		for (let i = 0; i < tubeCapacity; i++) {
			allLayers.push({ color, amount: 1 });
		}
	}

	// Shuffle layers
	for (let i = allLayers.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const layerI = allLayers[i];
		const layerJ = allLayers[j];
		if (layerI && layerJ) {
			[allLayers[i], allLayers[j]] = [layerJ, layerI];
		}
	}

	// Distribute to tubes
	let layerIndex = 0;
	for (let i = 0; i < filledTubes; i++) {
		const tubeLayers: WaterLayer[] = [];
		for (let j = 0; j < tubeCapacity && layerIndex < allLayers.length; j++) {
			const layer = allLayers[layerIndex++];
			if (layer) {
				tubeLayers.push(layer);
			}
		}
		tubes[i] = createTube(`tube-${i}`, tubeCapacity, tubeLayers);
	}

	return tubes;
}
