<script lang="ts">
	import type { Decision } from '$lib/types/case';

	export let decisions: Decision[];

	const sortedDecisions = [...decisions].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
	{#if sortedDecisions.length > 0}
		{#each sortedDecisions as decision}
			<div class="card transition-all duration-300">
				<div class="card-body">
					<div class="flex justify-between items-center">
						<h2 class="card-title text-xl">{decision.title}</h2>
						<span class="text-sm text-base-content/70">
							{formatDate(decision.date)}
						</span>
					</div>

					<div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
						{#each decision.options as option}
							<div
								class="card border {option.title === decision.decision
									? 'border-success shadow-sm'
									: ''}"
							>
								<div class="card-body p-4">
									<h3 class="text-lg flex items-center font-semibold">
										{#if option.title === decision.decision}
											<span class="mr-2 bg-success text-success-content p-1 rounded-full">
												<svg
													class="h-3 w-3"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
											</span>
										{/if}
										{option.title}
									</h3>
									<div class="space-y-4">
										<div>
											<h4 class="text-sm font-medium flex items-center mb-2">
												<svg
													class="h-4 w-4 mr-1 text-success"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
												Vorteile
											</h4>
											<ul class="space-y-1 text-sm">
												{#each option.pros as pro}
													<li class="pl-5 relative">
														<span class="absolute left-0 top-1.5 h-1 w-1 rounded-full bg-success"
														></span>
														{pro}
													</li>
												{/each}
											</ul>
										</div>
										<div>
											<h4 class="text-sm font-medium flex items-center mb-2">
												<svg
													class="h-4 w-4 mr-1 text-error"
													xmlns="http://www.w3.org/2000/svg"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<line x1="18" y1="6" x2="6" y2="18"></line>
													<line x1="6" y1="6" x2="18" y2="18"></line>
												</svg>
												Nachteile
											</h4>
											<ul class="space-y-1 text-sm">
												{#each option.cons as con}
													<li class="pl-5 relative">
														<span class="absolute left-0 top-1.5 h-1 w-1 rounded-full bg-error"
														></span>
														{con}
													</li>
												{/each}
											</ul>
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>

					<div class="divider"></div>

					<div>
						<h3 class="font-medium mb-2">Entscheidung</h3>
						<p class="text-success font-medium">{decision.decision}</p>
					</div>

					<div>
						<h3 class="font-medium mb-2">Begründung</h3>
						<p class="text-base-content/70">{decision.reasoning}</p>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="card">
			<div class="card-body py-6">
				<p class="text-base-content/70">Keine Entscheidungen dokumentiert.</p>
			</div>
		</div>
	{/if}
</div>
