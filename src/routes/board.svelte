<script lang="ts">
	import BoardFile from '$lib/components/custom-ui/board-file.svelte';
	import Dropzone from '$lib/components/custom-ui/dropzone.svelte';
	import type { BoardState } from '$lib/models/board';
	import { readFile } from '$lib/utils/file';
	import { imageSize } from 'image-size';

	// todo: pass in as prop
	const boardState = $state<BoardState>({ files: [], position: { x: 0, y: 0 } });

	const newFiles = $state<{ file: File; url: string }[]>([]);

	let boardRef = $state<HTMLElement | null>(null);
	let positionOffset = $derived({
		x: boardRef ? boardRef.getBoundingClientRect().width / 2 + boardState.position.x : 0,
		y: boardRef ? boardRef.getBoundingClientRect().height / 2 + boardState.position.y : 0
	});

	const onAddFiles = async (files: File[]) => {
		files.forEach(async (file) => {
			console.log(file);

			const url = URL.createObjectURL(file);
			newFiles.push({ file, url });
			const size = imageSize(new Uint8Array(await readFile(file)));
			console.log(size);

			boardState.files.push({
				url,
				position: { x: -Math.floor(size.width / 2), y: -Math.floor(size.height / 2) },
				size: { w: size.width, h: size.height }
			});
		});
	};

	$inspect(boardState, newFiles);
	$inspect(positionOffset);
</script>

<div class="fixed inset-0 bg-slate-300" bind:this={boardRef}>
	<Dropzone className="absolute inset-0 opacity-0" onDrop={onAddFiles} />
	<div class="absolute" style:left={`${positionOffset.x}px`} style:top={`${positionOffset.y}px`}>
		{#each boardState.files as item, i}
			<BoardFile bind:fileState={boardState.files[i]} />
		{/each}
	</div>
</div>
