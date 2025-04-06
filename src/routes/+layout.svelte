<script lang="ts">
	import '../app.css';
	import Toast from '$lib/components/utils/Toast.svelte';

	let { children } = $props();
</script>

<main>

	{@render children()}
</main>
<Toast></Toast>