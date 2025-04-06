<script lang="ts">
	import StatusBadge from './StatusBadge.svelte';
	import type { Case } from '$lib/types/case';
	import { goto } from '$app/navigation';

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

  function handleClick(){
    goto(`/case/${caseData.id}`)
  }
</script>

<a href="/case/{caseData.id}" class="card bg-base-100 shadow">
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
				<h1 class="card-title text-lg">{caseData.title}</h1>
				<StatusBadge status={caseData.status} />
			</div>
			<p class="text-sm text-base-content/70 line-clamp-1">{caseData.subtitle}</p>
			<div class="text-xs text-base-content/70 line-clamp-3 my-2">
				{caseData.meta.vision}
			</div>
			<div class="card-actions justify-start text-xs text-base-content/50 mt-auto">
				Aktualisiert {formatRelativeTime(caseData.updatedAt)}
			</div>
		</div>
</a>
