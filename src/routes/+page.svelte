<script lang="ts">
	import type { PageData } from './$types';
	import CaseGallery from '$lib/components/CaseGallery.svelte';
	import TalkToMe from '$lib/components/TalkToMe.svelte';
	import ZuEndeDenken from '$lib/components/ZuEndeDenken.svelte';

	let { data }: { data: PageData } = $props();
</script>
<div class="bg-base-200">
  
  <TalkToMe></TalkToMe>
  <ZuEndeDenken></ZuEndeDenken>
  <CaseGallery {data}></CaseGallery>
</div>
