<script lang="ts">
	import type { PageData } from '../../routes/$types';

    import CaseCard from '$lib/components/CaseGallery/CaseCard.svelte';
    
    let {data} : {data: PageData} = $props();

</script>

<div class="border-b bg-base-100">
	<div class="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
		<div class="flex items-center gap-4">
			<h1 class="text-2xl font-bold tracking-tight">Case Galerie</h1>
			<div class="badge badge-ghost tooltip tooltip-bottom" data-tip="Entwicklung, Dokumentation und Bewertung unternehmerischer Ideen">
				🔍
			</div>
		</div>
		<div class="flex items-center space-x-4">
			<a href="/case/new" class="btn btn-primary btn-sm">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 mr-2"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4v16m8-8H4"
					/>
				</svg>
				Neues Exponat
			</a>
		</div>
	</div>
</div>


<div class="container mx-auto py-8 px-4 md:px-6">
  
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 content-stretch items-stretch animate-fade-in">
    {#each data.cases as caseItem (caseItem.id)}
      <CaseCard caseData={caseItem} />
    {/each}
  </div>
</div>