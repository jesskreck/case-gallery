<script lang="ts">
	import { goto, afterNavigate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { store } from '$lib/stores/chatStore.svelte';
	import DefaultMessageButtons from './DefaultMessageButtons.svelte';
	import ResponseMessage from './ResponseMessage.svelte';
	import Heading from '../Layout/Heading.svelte';

	type ChatUIProps = {
		heading: string;
		defaultMessages: string[];
	};

	let { heading, defaultMessages }: ChatUIProps = $props();

	// Ref für den Container
	let chatContainer: HTMLElement;
	let latestMessageRef = $state<HTMLElement | null>(null);
		
	// Funktion zum Scrollen zur neuesten Nachricht
	function scrollToLatest() {
		if (latestMessageRef) {
			latestMessageRef.scrollIntoView({ behavior: 'smooth' });
		}
	}

	// Wenn neue Nachrichten hinzugefügt werden
	$effect(() => {
		if (store.messages.length) {
			setTimeout(scrollToLatest, 50);
		}
	});

	// Bei Komponenten-Montierung
	onMount(() => {
		if (store.messages.length) {
			scrollToLatest();
		}
	});

	// Nach Navigation
	afterNavigate(() => {
		if (store.messages.length) {
			scrollToLatest();
		}
	});
</script>

<div bind:this={chatContainer} class="flex flex-col h-[calc(100vh-180px)] overflow-y-auto p-4">
	{#if store.messages.length === 0}
		<div class="flex-grow flex flex-col items-center justify-center">
			<Heading level="h1">{heading}</Heading>
			
			<!-- Default Nachricht Buttons -->
			<DefaultMessageButtons messages={defaultMessages} />
		</div>

		<div class="italic text-sm text-center">
			<p>Oben: Vorschläge.</p>
			<p>Unten: Echtzeit.</p>
			<p>Du entscheidest, was gerade passt.</p>
		</div>
	{:else}
		<!-- Umgekehrte Reihenfolge - Älteste Nachrichten zuerst -->
		<div class="flex flex-col">
			<Heading level="h2">{heading}</Heading>
			<!-- Ältere Nachrichten -->
			{#each [...store.messages].slice(1).reverse() as message (message.id)}
				<div class="mb-8">
					<ResponseMessage
						transcript={message.transcript}
						summary={message.summary}
						response={message.response}
						timestamp={message.timestamp}
					/>
				</div>
			{/each}
			
			<!-- Trennlinie wenn ältere Nachrichten vorhanden sind -->
			{#if store.messages.length > 1}
				<div class="border-t border-base-300 my-4"></div>
				<div class="text-xs text-center opacity-50 mb-8">Neueste Nachricht</div>
			{/if}
			
			<!-- Neueste Nachricht mit Anker -->
			{#if store.messages.length > 0}
				<div bind:this={latestMessageRef} class="pt-2" id="latestMessage">
					<ResponseMessage 
						transcript={store.messages[0].transcript}
						summary={store.messages[0].summary}
						response={store.messages[0].response}
						timestamp={store.messages[0].timestamp}
						streaming={!store.messages[0].response.endsWith('.')}
					/>
				</div>
			{/if}
			
			<!-- Platzhalter damit die neueste Nachricht oben angezeigt wird -->
			<div class="flex-grow min-h-[70vh]"></div>
		</div>
	{/if}
</div>