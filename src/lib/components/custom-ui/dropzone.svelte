<script lang="ts">
	type Props = {
		className: string;
		onDrop?: (files: File[]) => void;
	};
	const { className, onDrop }: Props = $props();

	let draggingInside = $state<boolean>(false);

	const onDropHandler = (event: DragEvent) => {
		event.preventDefault();
		if (draggingInside) {
			draggingInside = false;
			return;
		}
		const files = Array.from(event.dataTransfer?.files ?? []);
		onDrop?.(files);
	};

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();
	};

	// todo: move to board
	const onDragStart = (event: DragEvent) => {
		draggingInside = true;
	};
</script>

<div
	ondrop={onDropHandler}
	ondragover={onDragOver}
	ondragstart={onDragStart}
	class={className}
></div>
