<script lang="ts">
    import type { CaseMeta } from '$lib/types/case';
    
    export let meta: CaseMeta;
  </script>
  
  <div class="space-y-6">
    <div class="card transition-all duration-300">
      <div class="card-body">
        <h2 class="card-title text-xl">Vision</h2>
        <p>{meta.vision}</p>
      </div>
    </div>
    
    <div class="card transition-all duration-300">
      <div class="card-body">
        <h2 class="card-title text-xl">Hypothesen</h2>
        <ul class="list-disc pl-5 space-y-2">
          {#each meta.hypotheses as hypothesis}
            <li>{hypothesis}</li>
          {/each}
        </ul>
      </div>
    </div>
    
    <div class="card transition-all duration-300">
      <div class="card-body">
        <h2 class="card-title text-xl">Strategie</h2>
        <p>{meta.strategy}</p>
      </div>
    </div>
  </div>