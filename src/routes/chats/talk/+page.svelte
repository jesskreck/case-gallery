<script lang="ts">
	import ChatUi from "$lib/components/Chat/ChatUI.svelte";
	import { DEFAULT_MESSAGES, HEADINGS } from "$lib/data/prompts";

</script>

<ChatUi
	heading={HEADINGS.network} 
	defaultMessages={DEFAULT_MESSAGES.network} 
/>