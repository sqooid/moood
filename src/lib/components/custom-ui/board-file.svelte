<script lang="ts">
	import type { FileState } from '$lib/models/board';
	import Moveable, { type SvelteMoveableEvents } from 'svelte-moveable';

	type Props = {
		fileState: FileState;
	};

	let { fileState = $bindable() }: Props = $props();

	let target = $state<HTMLElement | null>(null);

	let transform = $state<string>('');

	const onDrag = (e: SvelteMoveableEvents['drag']['detail']) => {
		console.log(e);
		transform = e.transform;
	};

	const onDragEnd = (e: SvelteMoveableEvents['dragEnd']['detail']) => {
		console.log(e);

		fileState.position.x += e.lastEvent.dist[0];
		fileState.position.y += e.lastEvent.dist[1];
		transform = '';
	};
</script>

<div
	class="absolute"
	style:left={`${fileState.position.x}px`}
	style:top={`${fileState.position.y}px`}
	style:width={`${fileState.size.w}px`}
	style:height={`${fileState.size.h}px`}
	style:transform
	bind:this={target}
>
	<img src={fileState.url} alt="" class="rounded-md" />
</div>

<Moveable {target} draggable {onDrag} {onDragEnd} />
