<script lang="ts">
    import type { LogEntry } from '$lib/types/case';
    
    export let logEntries: LogEntry[];
    
    const sortedEntries = [...logEntries].sort((a, b) => 
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
    
  <div class="card">
    <div class="card-body">
      <h2 class="card-title text-xl">Logbuch</h2>
      
      {#if sortedEntries.length > 0}
        <div class="space-y-6">
          {#each sortedEntries as entry, index}
            <div class="timeline-item">
              <div class="flex flex-col">
                <div class="flex items-center justify-between mb-2">
                  <h3 class="text-lg font-semibold">{entry.title}</h3>
                  <span class="text-sm text-base-content/70">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p class="mb-3 text-base-content/70">{entry.content}</p>
                <div class="flex flex-wrap gap-2">
                  {#each entry.tags as tag}
                    <span class="badge badge-outline">{tag}</span>
                  {/each}
                </div>
              </div>
              {#if index < sortedEntries.length - 1}
                <div class="divider my-4"></div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-base-content/70">Keine Logbucheinträge vorhanden.</p>
      {/if}
    </div>
  </div>