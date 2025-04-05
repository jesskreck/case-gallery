<script lang="ts">
    import StatusBadge from './StatusBadge.svelte';
    import type { Case } from '$lib/types/case';

    let { caseData }: { caseData: Case } = $props();

    function formatRelativeTime(date: string | Date, locale = 'de') {
  const rtf = new Intl.RelativeTimeFormat(locale, { 
    numeric: 'auto',
    style: 'long'
  });

  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = (now.getTime() - past.getTime()) / 1000;

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60]
  ];

  for (const [unit, seconds] of units) {
    const value = Math.floor(diffInSeconds / seconds);
    if (value >= 1) {
      return rtf.format(-value, unit);
    }
  }

  return rtf.format(-1, 'second');
}
    
  </script>
  
  <a href="/case/{caseData.id}" class="block">
    <div class="card case-card h-full overflow-hidden hover:border-primary/50 transition-colors">
      {#if caseData.imageUrl}
        <figure class="h-48">
          <img
            src={caseData.imageUrl}
            alt={caseData.title}
            class="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        </figure>
      {/if}
      <div class="card-body p-4">
        <div class="flex justify-between items-start">
          <h3 class="card-title text-lg">{caseData.title}</h3>
          <StatusBadge status={caseData.status} />
        </div>
        <p class="text-sm text-base-content/70">{caseData.subtitle}</p>
        <div class="text-sm text-base-content/70 line-clamp-2 my-2">
          {caseData.meta.vision}
        </div>
        <div class="card-actions justify-start text-xs text-base-content/50 mt-auto">
            Aktualisiert {formatRelativeTime(caseData.updatedAt)}        </div>
      </div>
    </div>
  </a>