# .gitignore

```
node_modules

# Output
.output
.vercel
.netlify
.wrangler
/.svelte-kit
/build

# OS
.DS_Store
Thumbs.db

# Env
.env
.env.*
!.env.example
!.env.test

# Vite
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

```

# .npmrc

```
engine-strict=true

```

# .prettierignore

```
# Package Managers
package-lock.json
pnpm-lock.yaml
yarn.lock
bun.lock
bun.lockb

```

# .prettierrc

```
{
	"useTabs": true,
	"singleQuote": true,
	"trailingComma": "none",
	"printWidth": 100,
	"plugins": ["prettier-plugin-svelte"],
	"overrides": [
		{
			"files": "*.svelte",
			"options": {
				"parser": "svelte"
			}
		}
	]
}

```

# package.json

```json
{
	"name": "case-gallery",
	"private": true,
	"version": "0.0.1",
	"type": "module",
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"prepare": "svelte-kit sync || echo ''",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch",
		"format": "prettier --write .",
		"lint": "prettier --check ."
	},
	"devDependencies": {
		"@sveltejs/adapter-netlify": "^5.0.0",
		"@sveltejs/kit": "^2.16.0",
		"@sveltejs/vite-plugin-svelte": "^5.0.0",
		"@tailwindcss/forms": "^0.5.9",
		"@tailwindcss/typography": "^0.5.15",
		"@tailwindcss/vite": "^4.0.0",
		"prettier": "^3.4.2",
		"prettier-plugin-svelte": "^3.3.3",
		"svelte": "^5.0.0",
		"svelte-check": "^4.0.0",
		"tailwindcss": "^4.0.0",
		"typescript": "^5.0.0",
		"vite": "^6.2.5"
	},
	"dependencies": {
		"@supabase/supabase-js": "^2.49.4",
		"supabase": "^2.20.5"
	}
}

```

# README.md

```md
# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

\`\`\`bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
\`\`\`

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

\`\`\`bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
\`\`\`

## Building

To create a production version of your app:

\`\`\`bash
npm run build
\`\`\`

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

```

# src\app.css

```css
@import 'tailwindcss';
@plugin '@tailwindcss/forms';
@plugin '@tailwindcss/typography';

```

# src\app.d.ts

```ts
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

```

# src\app.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>

```

# src\lib\components\CaseCard.svelte

```svelte
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
```

# src\lib\components\Header.svelte

```svelte
<script lang="ts">
  </script>
  
  <header class="border-b bg-base-100 sticky top-0 z-10">
    <div class="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
      <div class="flex items-center">
        <a href="/" class="text-2xl font-bold tracking-tight">Case Galerie</a>
      </div>
      <div class="flex items-center space-x-4">
        <a href="/case/new" class="btn btn-primary btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Neues Exponat
        </a>
      </div>
    </div>
  </header>
```

# src\lib\components\StatusBadge.svelte

```svelte
<script lang="ts">
    import type { Case } from '$lib/types/case';
    
    export let status: Case['status'];
    
    // Helper Funktionen für Status-Darstellung
    function getStatusColor(status: Case['status']) {
      switch (status) {
        case 'active':
          return 'badge-success';
        case 'paused':
          return 'badge-warning';
        case 'completed':
          return 'badge-info';
        case 'abandoned':
          return 'badge-ghost';
        default:
          return 'badge-ghost';
      }
    }
    
    function getStatusText(status: Case['status']) {
      switch (status) {
        case 'active':
          return 'Aktiv';
        case 'paused':
          return 'Pausiert';
        case 'completed':
          return 'Abgeschlossen';
        case 'abandoned':
          return 'Verworfen';
        default:
          return status;
      }
    }
    
    const badgeClass = getStatusColor(status);
  </script>
  
  <span class="badge {badgeClass}">
    {getStatusText(status)}
  </span>
```

# src\lib\components\tabs\DecisionSection.svelte

```svelte
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

```

# src\lib\components\tabs\LogSection.svelte

```svelte
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
```

# src\lib\components\tabs\MetaSection.svelte

```svelte
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
```

# src\lib\components\tabs\SnapshotSection.svelte

```svelte
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
```

# src\lib\components\Toast.svelte

```svelte
<script lang="ts">
    import { fly, fade } from 'svelte/transition';
    import { toastStore } from './toast';
    
    function getToastClasses(type: 'success' | 'error' | 'info' | 'warning') {
      switch (type) {
        case 'success':
          return 'alert-success';
        case 'error':
          return 'alert-error';
        case 'info':
          return 'alert-info';
        case 'warning':
          return 'alert-warning';
        default:
          return '';
      }
    }
  </script>
  
  <div class="toast toast-end z-50">
    {#each $toastStore as toast (toast.id)}
      <div 
        class="alert {getToastClasses(toast.type)}"
        in:fly={{ y: 50, duration: 300 }}
        out:fade={{ duration: 200 }}
      >
        <span>{toast.message}</span>
        <button class="btn btn-sm btn-ghost" on:click={() => toastStore.remove(toast.id)}>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    {/each}
  </div>
  
  <script context="module">
    export { toastStore };
  </script>
```

# src\lib\components\toast.ts

```ts
import { writable } from 'svelte/store';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  timeout: number;
}

function createToastStore() {
  const { subscribe, update } = writable<Toast[]>([]);
  
  function addToast(type: ToastType, message: string, timeout = 3000) {
    const id = Math.random().toString(36).substring(2, 9);
    
    update(toasts => [
      ...toasts,
      { id, type, message, timeout }
    ]);
    
    if (timeout > 0) {
      setTimeout(() => {
        removeToast(id);
      }, timeout);
    }
    
    return id;
  }
  
  function removeToast(id: string) {
    update(toasts => toasts.filter(t => t.id !== id));
  }
  
  return {
    subscribe,
    success: (message: string, timeout?: number) => addToast('success', message, timeout),
    error: (message: string, timeout?: number) => addToast('error', message, timeout),
    info: (message: string, timeout?: number) => addToast('info', message, timeout),
    warning: (message: string, timeout?: number) => addToast('warning', message, timeout),
    remove: removeToast
  };
}

export const toastStore = createToastStore();
```

# src\lib\data\mockCases.ts

```ts
import type { Case } from '$lib/types/case';

export const mockCases: Case[] = [
  {
    id: '1',
    title: 'SaaS Platform für Freelancer',
    subtitle: 'Ein All-in-One Tool für die Selbstständigkeit',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-01-15',
    updatedAt: '2023-04-02',
    status: 'active',
    meta: {
      vision: 'Eine Plattform schaffen, die alle administrativen Aufgaben für Freelancer automatisiert und integriert',
      hypotheses: [
        'Freelancer verbringen 30% ihrer Zeit mit Administration statt mit bezahlter Arbeit',
        'Eine All-in-One Lösung wird einer Vielzahl einzelner Tools vorgezogen',
        'Automatisierte Buchhaltung ist der größte Schmerzpunkt'
      ],
      strategy: 'Entwicklung eines modularen Systems mit Buchhaltung als Einstiegspunkt, anschließend Erweiterung um CRM und Projektmanagement'
    },
    logEntries: [
      {
        id: 'log1',
        date: '2023-01-15',
        title: 'Projektstart und erste Recherchen',
        content: 'Heute habe ich mit der Recherche zum Freelancer-Markt begonnen. Erste Interviews mit 5 potenziellen Nutzern deuten darauf hin, dass besonders Zeiterfassung und automatisierte Rechnungsstellung große Schmerzpunkte sind.',
        tags: ['Recherche', 'Interviews']
      },
      // Weitere Einträge wie im Original
    ],
    snapshots: [
      {
        id: 'snap1',
        date: '2023-02-15',
        reflections: 'Der erste Monat hat gezeigt, dass die Hypothese über den Zeitaufwand für Administration zutrifft. Interviews mit 15 Freelancern ergaben einen Durchschnitt von 12 Stunden pro Woche für administrative Aufgaben.',
        progress: {
          achieved: [
            'Marktanalyse abgeschlossen',
            'Ersten Prototyp entwickelt',
            'Validierung der Kern-Hypothese'
          ],
          ongoing: [
            'Entwicklung des MVP für das Buchhaltungsmodul',
            'Gespräche mit potenziellen Frühanwendern'
          ],
          challenges: [
            'Technische Integration mit Banken erfordert mehr Ressourcen als geplant',
            'Rechtliche Anforderungen an Buchhaltungssoftware sind komplex'
          ]
        },
        nextSteps: [
          'Rechtliche Beratung für Buchhaltungssoftware einholen',
          'MVP bis Ende März fertigstellen',
          'Beta-Testgruppe von 10 Nutzern aufbauen'
        ]
      }
    ],
    decisions: [
      {
        id: 'dec1',
        date: '2023-02-01',
        title: 'Technologiestapel für MVP',
        options: [
          {
            title: 'React und Firebase',
            pros: ['Schnelle Entwicklung', 'Geringe Serverkosten zu Beginn', 'Gute Skalierbarkeit'],
            cons: ['Begrenzte Datenbankoptionen', 'Abhängigkeit von Google', 'Höhere Kosten bei Skalierung']
          },
          {
            title: 'Vue.js und eigener Server',
            pros: ['Volle Kontrolle über Backend', 'Langfristig geringere Kosten', 'Flexibilität bei Datenbanken'],
            cons: ['Längere Entwicklungszeit', 'Höhere initiale Serverkosten', 'Komplexeres Deployment']
          }
        ],
        decision: 'React und Firebase',
        reasoning: 'Die Geschwindigkeit der Markteinführung ist der wichtigste Faktor für dieses Projekt. Firebase ermöglicht eine schnelle Entwicklung des MVP und kann später bei Bedarf durch eine eigene Lösung ersetzt werden.'
      }
    ]
  },
  // Weitere Cases wie im Original
];
```

# src\lib\index.ts

```ts
// place files you want to import through the `$lib` alias in this folder.

```

# src\lib\supabase.ts

```ts
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';
import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import type { Database } from '$lib/types/database';

export const supabase = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);
```

# src\lib\types\case.ts

```ts
export interface CaseMeta {
    vision: string;
    hypotheses: string[];
    strategy: string;
  }
  
  export interface LogEntry {
    id: string;
    date: string;
    title: string;
    content: string;
    tags: string[];
  }
  
  export interface SnapshotDay {
    id: string;
    date: string;
    reflections: string;
    progress: {
      achieved: string[];
      ongoing: string[];
      challenges: string[];
    };
    nextSteps: string[];
  }
  
  export interface Decision {
    id: string;
    date: string;
    title: string;
    options: {
      title: string;
      pros: string[];
      cons: string[];
    }[];
    decision: string;
    reasoning: string;
  }
  
  export interface Case {
    id: string;
    title: string;
    subtitle: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'paused' | 'completed' | 'abandoned';
    meta: CaseMeta;
    logEntries: LogEntry[];
    snapshots: SnapshotDay[];
    decisions: Decision[];
  }
```

# src\lib\types\database.ts

```ts
// src/lib/types/database.ts
export type Database = {
    public: {
      Tables: {
        cases: {
          Row: {
            id: string
            title: string
            subtitle: string
            image_url: string | null
            created_at: string
            updated_at: string
            status: 'active' | 'paused' | 'completed' | 'abandoned'
          }
          Insert: {
            id?: string
            title: string
            subtitle: string
            image_url?: string | null
            created_at?: string
            updated_at?: string
            status: 'active' | 'paused' | 'completed' | 'abandoned'
          }
          Update: {
            id?: string
            title?: string
            subtitle?: string
            image_url?: string | null
            created_at?: string
            updated_at?: string
            status?: 'active' | 'paused' | 'completed' | 'abandoned'
          }
        }
        // Weitere Tabellendefinitionen...
      }
    }
  }
```

# src\routes\+error.svelte

```svelte
<script>
    import { page } from '$app/stores';
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="text-center">
      <h1 class="text-5xl font-bold mb-4">{$page.status}</h1>
      <p class="text-xl text-base-content/70 mb-6">{$page.error?.message || 'Ein Fehler ist aufgetreten'}</p>
      <a href="/" class="btn btn-primary">Zurück zur Startseite</a>
    </div>
  </div>
```

# src\routes\+layout.svelte

```svelte
<script lang="ts">
	import '../app.css';
	import Header from "$lib/components/Header.svelte"

	let { children } = $props();
</script>

<Header></Header>
<main>

	{@render children()}
</main>

```

# src\routes\+page.server.ts

```ts
import { supabase } from '$lib/supabase';
import type { Case } from '$lib/types/case';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data: cases, error } = await supabase
    .from('cases')
    .select(`
      *,
      case_metas(vision, strategy),
      case_hypotheses(hypothesis)
    `)
    .order('updated_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching cases:', error);
    return { cases: [] };
  }
  
  return { cases: cases as Case[]} 
  ;
};
```

# src\routes\+page.svelte

```svelte
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
```

# src\routes\case\[id]\+page.server.ts

```ts
import { supabase } from "$lib/supabase";
import type { Case } from "$lib/types/case";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  // Basis-Case-Daten laden
  const { data: caseData, error: caseError } = await supabase
    .from('cases')
    .select(`
      *,
      case_metas(vision, strategy),
      case_hypotheses(hypothesis)
    `)
    .eq('id', params.id)
    .single();
  
  if (caseError || !caseData) {
    error(404, 'Case nicht gefunden');
  }
  
  // Weitere Daten laden
  const [
    { data: logEntries } = {},
    { data: snapshots } = {},
    { data: decisions } = {}
  ] = await Promise.all([
    supabase
      .from('log_entries')
      .select(`*, log_tags(tag)`)
      .eq('case_id', params.id)
      .order('date', { ascending: false }),
    supabase
      .from('snapshots')
      .select(`*, snapshot_progress_items(type, content), snapshot_next_steps(step)`)
      .eq('case_id', params.id)
      .order('date', { ascending: false }),
    supabase
      .from('decisions')
      .select(`*, decision_options(id, title, decision_option_points(type, point))`)
      .eq('case_id', params.id)
      .order('date', { ascending: false })
  ]);
  
  return {
    case: {
      ...caseData,
      meta: {
        vision: caseData.case_metas[0]?.vision || '',
        strategy: caseData.case_metas[0]?.strategy || '',
        hypotheses: caseData.case_hypotheses.map(h => h.hypothesis)
      },
      logEntries: logEntries || [],
      snapshots: snapshots || [],
      decisions: decisions || []
    } as Case
  };
};
```

# src\routes\case\[id]\+page.svelte

```svelte
<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import type { PageData } from './$types';
    import StatusBadge from '$lib/components/StatusBadge.svelte';
    import MetaSection from '$lib/components/tabs/MetaSection.svelte';
    import LogSection from '$lib/components/tabs/LogSection.svelte';
    import SnapshotSection from '$lib/components/tabs/SnapshotSection.svelte';
    import DecisionSection from '$lib/components/tabs/DecisionSection.svelte';
    
    let {data} : {data: PageData} = $props();
    
    let activeTab = $state('meta');
    
    // Eine einfache Implementierung für die Tab-Navigation
    function setActiveTab(tab: string) {
      activeTab = tab;
      // Wir könnten hier auch die URL aktualisieren, z.B. mit ?tab=meta
    }
  </script>
  
  <div class="container mx-auto py-8 px-4 md:px-6">
    <div class="mb-8">
      <a href="/" class="btn btn-ghost btn-sm mb-4">
        Zurück zur Galerie
      </a>
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-3xl font-bold">{data.case.title}</h1>
            <StatusBadge status={data.case.status} />
          </div>
          <p class="text-xl text-base-content/70 mt-1">{data.case.subtitle}</p>
        </div>
      </div>
      
      {#if data.case.imageUrl}
        <div class="mb-6 h-64 md:h-80 w-full overflow-hidden rounded-lg">
          <img
            src={data.case.imageUrl}
            alt={data.case.title}
            class="w-full h-full object-cover"
          />
        </div>
      {/if}
      
      <div class="tabs tabs-boxed mb-6">
        <button 
          class="tab {activeTab === 'meta' ? 'tab-active' : ''}" 
          onclick={() => setActiveTab('meta')}
        >
          <span class="hidden sm:inline">Meta</span>
        </button>
        <button 
          class="tab {activeTab === 'log' ? 'tab-active' : ''}" 
          onclick={() => setActiveTab('log')}
        >
          <span class="hidden sm:inline">Logbuch</span>
        </button>
        <button 
          class="tab {activeTab === 'snapshots' ? 'tab-active' : ''}" 
          onclick={() => setActiveTab('snapshots')}
        >
          <span class="hidden sm:inline">Snapshots</span>
        </button>
        <button 
          class="tab {activeTab === 'decisions' ? 'tab-active' : ''}" 
          onclick={() => setActiveTab('decisions')}
        >
          <span class="hidden sm:inline">Entscheidungen</span>
        </button>
      </div>
      
      <div class="mt-6">
        {#if activeTab === 'meta'}
          <div class="animate-fade-in">
            <MetaSection meta={data.case.meta} />
          </div>
        {:else if activeTab === 'log'}
          <div class="animate-fade-in">
            <LogSection logEntries={data.case.logEntries} />
          </div>
        {:else if activeTab === 'snapshots'}
          <div class="animate-fade-in">
            <SnapshotSection snapshots={data.case.snapshots} />
          </div>
        {:else if activeTab === 'decisions'}
          <div class="animate-fade-in">
            <DecisionSection decisions={data.case.decisions} />
          </div>
        {/if}
      </div>
    </div>
  </div>
```

# src\routes\case\new\+page.server.ts

```ts
// src/routes/case/new/+page.server.ts
import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions } from './$types';
import type { CaseMeta } from '$lib/types/case';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const vision = formData.get('vision') as string;
    const hypothesesText = formData.get('hypotheses') as string;
    const strategy = formData.get('strategy') as string;
    
    const hypotheses = hypothesesText
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);
    
    // Erstelle Meta-Objekt zur Validierung
    const meta: CaseMeta = {
      vision,
      strategy,
      hypotheses
    };
    
    // Case erstellen
    const { data: caseData, error: caseError } = await supabase
      .from('cases')
      .insert([
        { 
          title, 
          subtitle, 
          status: 'active' as const
        }
      ])
      .select()
      .single();
    
    if (caseError || !caseData) {
      return { success: false, message: 'Fehler beim Erstellen des Cases' };
    }
    
    // Meta-Informationen erstellen
    const { error: metaError } = await supabase
      .from('case_metas')
      .insert([
        { 
          case_id: caseData.id, 
          vision: meta.vision, 
          strategy: meta.strategy 
        }
      ]);
      
    if (metaError) {
      console.error('Error creating meta:', metaError);
      return { success: false, message: 'Fehler beim Erstellen der Meta-Informationen' };
    }
    
    // Hypothesen erstellen
    const hypothesisInserts = meta.hypotheses.map(hypothesis => ({
      case_id: caseData.id,
      hypothesis
    }));
    
    const { error: hypothesesError } = await supabase
      .from('case_hypotheses')
      .insert(hypothesisInserts);
      
    if (hypothesesError) {
      console.error('Error creating hypotheses:', hypothesesError);
      return { success: false, message: 'Fehler beim Erstellen der Hypothesen' };
    }
    
    redirect(303, `/case/${caseData.id}`);
  }
};
```

# src\routes\case\new\+page.svelte

```svelte
<script lang="ts">
    import { enhance } from '$app/forms';
    import { toastStore } from '$lib/components/toast';
    
    let submitting = false;
    
    function handleSubmit() {
      submitting = true;
      return async ({ result, update }) => {
        submitting = false;
        if (result.type === 'success') {
          toastStore.success('Case erfolgreich angelegt');
          await update();
        } else {
          toastStore.error('Fehler beim Anlegen des Cases');
        }
      };
    }
  </script>
  
  <div class="container mx-auto py-8 px-4 md:px-6">
    <a href="/" class="btn btn-ghost btn-sm mb-4">
      Zurück zur Galerie
    </a>
    
    <h1 class="text-3xl font-bold mb-6">Neues Exponat erstellen</h1>
    
    <div class="card max-w-3xl mx-auto">
      <div class="card-body">
        <h2 class="card-title">Grundlegende Informationen</h2>
        <p class="text-base-content/70">Geben Sie die grundlegenden Informationen für das neue Exponat ein.</p>
        
        <form method="POST" use:enhance={handleSubmit} class="mt-6 space-y-4">
          <div class="form-control">
            <label class="label" for="title">
              <span class="label-text">Titel</span>
            </label>
            <input 
              type="text" 
              id="title"
              name="title" 
              placeholder="z.B. SaaS Platform für Freelancer" 
              class="input input-bordered w-full" 
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label" for="subtitle">
              <span class="label-text">Untertitel</span>
            </label>
            <input 
              type="text" 
              id="subtitle"
              name="subtitle" 
              placeholder="z.B. Ein All-in-One Tool für die Selbstständigkeit" 
              class="input input-bordered w-full" 
              required
            />
          </div>
          
          <div class="form-control">
            <label class="label" for="vision">
              <span class="label-text">Vision</span>
            </label>
            <textarea 
              id="vision"
              name="vision" 
              placeholder="Beschreiben Sie die Vision für dieses Projekt" 
              class="textarea textarea-bordered w-full" 
              rows="3"
              required
            ></textarea>
          </div>
          
          <div class="form-control">
            <label class="label" for="hypotheses">
              <span class="label-text">Hypothesen</span>
            </label>
            <textarea 
              id="hypotheses"
              name="hypotheses" 
              placeholder="Eine Hypothese pro Zeile" 
              class="textarea textarea-bordered w-full" 
              rows="4"
              required
            ></textarea>
          </div>
          
          <div class="form-control">
            <label class="label" for="strategy">
              <span class="label-text">Strategie</span>
            </label>
            <textarea 
              id="strategy"
              name="strategy" 
              placeholder="Beschreiben Sie die Strategie für dieses Projekt" 
              class="textarea textarea-bordered w-full" 
              rows="3"
              required
            ></textarea>
          </div>
          
          <div class="form-control mt-6">
            <button type="submit" class="btn btn-primary" disabled={submitting}>
              {#if submitting}
                <span class="loading loading-spinner loading-sm"></span>
              {/if}
              Exponat erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
```

# static\favicon.png

This is a binary file of the type: Image

# svelte.config.js

```js
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: { adapter: adapter() }
};

export default config;

```

# tsconfig.json

```json
{
	"extends": "./.svelte-kit/tsconfig.json",
	"compilerOptions": {
		"allowJs": true,
		"checkJs": true,
		"esModuleInterop": true,
		"forceConsistentCasingInFileNames": true,
		"resolveJsonModule": true,
		"skipLibCheck": true,
		"sourceMap": true,
		"strict": true,
		"moduleResolution": "bundler"
	}
	// Path aliases are handled by https://svelte.dev/docs/kit/configuration#alias
	// except $lib which is handled by https://svelte.dev/docs/kit/configuration#files
	//
	// If you want to overwrite includes/excludes, make sure to copy over the relevant includes/excludes
	// from the referenced tsconfig.json - TypeScript does not merge them in
}

```

# vite.config.ts

```ts
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()]
});

```

