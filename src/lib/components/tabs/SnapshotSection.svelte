<script lang="ts">
    import type { SnapshotDay } from '$lib/types/case';
    
    export let snapshots: SnapshotDay[];
    
    const sortedSnapshots = [...snapshots].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  
    function formatDate(dateString: string) {
      return new Intl.DateTimeFormat('de-DE', {
        day: 'numeric', 
        month: 'long', 
        year: 'numeric'
      }).format(new Date(dateString));
    }
  </script>
    
  <div class="space-y-8">
    {#if sortedSnapshots.length > 0}
      {#each sortedSnapshots as snapshot}
        <div class="card transition-all duration-300">
          <div class="card-body">
            <div class="flex justify-between items-center">
              <h2 class="card-title text-xl">
                Snapshot: {formatDate(snapshot.date)}
              </h2>
            </div>
            
            <div class="space-y-6">
              <!-- Rest of the component remains the same -->
              <div>
                <h3 class="font-medium mb-2">Reflexion</h3>
                <p class="text-base-content/70">{snapshot.reflections}</p>
              </div>
              
              <div class="divider"></div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Existing content remains unchanged -->
              </div>
            </div>
          </div>
        </div>
      {/each}
    {:else}
      <div class="card">
        <div class="card-body py-6">
          <p class="text-base-content/70">Keine Snapshots vorhanden.</p>
        </div>
      </div>
    {/if}
  </div>