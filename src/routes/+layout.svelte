<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte"
	import Toast from '$lib/components/Toast.svelte';

	let { children } = $props();
</script>

<Header></Header>
<main>

	{@render children()}
</main>
<Toast></Toast>