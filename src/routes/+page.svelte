<script lang="ts">
    import type { PageData } from './$types';
    import CaseCard from '$lib/components/CaseCard.svelte';
    
    let {data} : {data: PageData} = $props();


  </script>
  
  <div class="container mx-auto py-8 px-4 md:px-6">
    <div class="mb-8 text-center">
      <h1 class="text-4xl font-bold">Case Galerie</h1>
      <p class="mt-2 text-lg text-base-content/70 max-w-3xl mx-auto">
        Entwicklung, Dokumentation und Bewertung unternehmerischer Ideen.
      </p>
    </div>
    
    <div class="gallery-grid animate-fade-in">
      {#each data.cases as caseItem (caseItem.id)}
        <CaseCard caseData={caseItem} />
      {/each}
    </div>
  </div>