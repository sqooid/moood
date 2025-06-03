<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	const onSelectFiles = async (event: any) => {
		console.log('File selection event:', event);
		const files = event.target?.files;
		if (files.length === 0) {
			console.log('No files selected');
			return;
		}
		console.log('Selected files:', files);
		const form = new FormData();
		for (let i = 0; i < files.length; i++) {
			form.append('files', files[i]);
		}
		const response = await fetch('/api/file', { method: 'POST', body: form });
		console.log(await response.json());
	};
</script>

<h1>Sign in</h1>
<Button href="/login/google">Log in with Google</Button>

<Input type="file" onchange={onSelectFiles} multiple accept="image/*" />
