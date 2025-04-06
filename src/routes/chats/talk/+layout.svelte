<script lang="ts">
	import { onMount } from 'svelte';
	import { initChat } from '$lib/services/chatService';
	import { PROMPTS } from '$lib/data/prompts';
	import ChatLayout from '$lib/components/Chat/ChatLayout.svelte';

	let { children } = $props();

	onMount(() => {
		// Initialisiere Chat im "network" Modus
		initChat(PROMPTS.network);
	});
</script>

<ChatLayout>
	{@render children()}
</ChatLayout>