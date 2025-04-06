<script lang="ts">
    import type { CaseMeta } from '$lib/types/case';
    
    export let meta: CaseMeta;
  </script>
  
  <div class="space-y-6">

    <!-- KARTE VISION -->
    <div class="card bg-accent text-base-content">
      <div class="card-body text-accent-content">
        <h2 class="card-title">Vision</h2>
        <code>{meta.vision}</code>
        <div class="card-actions justify-end">
          <button class="btn btn-circle btn-soft btn-sm">✒️</button>
        </div>
      </div>
    </div>
    
    <!-- LISTE HYPOTHESEN -->
    <div class="card border border-accent bg-base-100">
      <div class="card-body">
        <h2 class="card-title">Hypothesen</h2>
        <ul class="list">
          {#each meta.hypotheses as hypothesis}
            <li class="list-row"><code>{hypothesis}</code></li>
          {/each}
        </ul> 
        <div class="card-actions justify-end">
          <button class="btn btn-circle btn-soft btn-accent btn-sm">✒️</button>
        </div>
      </div>
    </div>
    
    <!-- KARTE STRATEGIE -->
    <div class="card border border-accent bg-base-100">
      <div class="card-body">
        <h2 class="card-title text-xl">Strategie</h2>
        <code>{meta.strategy}</code>
        <div class="card-actions justify-end">
          <button class="btn btn-circle btn-soft btn-accent btn-sm">✒️</button>
        </div>
      </div>
    </div>
  </div>