export type FileState = {
	id?: string;
	url: string;
	position: { x: number; y: number };
	size: { w: number; h: number };
	crop?: { l?: number; t?: number; r?: number; b?: number };
};

export type BoardState = {
	files: FileState[];
	position: { x: number; y: number };
};
