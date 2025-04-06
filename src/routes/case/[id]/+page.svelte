<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    import type { PageData } from './$types';
    import StatusBadge from '$lib/components/CaseGallery/StatusBadge.svelte';
    import MetaSection from '$lib/components/CaseGallery/tabs/MetaSection.svelte';
    import LogSection from '$lib/components/CaseGallery/tabs/LogSection.svelte';
    import SnapshotSection from '$lib/components/CaseGallery/tabs/SnapshotSection.svelte';
    import DecisionSection from '$lib/components/CaseGallery/tabs/DecisionSection.svelte';
    
    let {data} : {data: PageData} = $props();
    
    let activeTab = $state('meta');
    
    // Eine einfache Implementierung für die Tab-Navigation
    function setActiveTab(tab: string) {
      activeTab = tab;
      // Wir könnten hier auch die URL aktualisieren, z.B. mit ?tab=meta
    }
  </script>
  
  <div class="container bg-base-300 mx-auto py-8 px-4 md:px-6">
    <div class="mb-8">
      <a href="/" class="btn btn-sm mb-4">
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
      

      <!-- REITER MIT TABS Meta, Logbuch, Snapshots, Entscheidungen -->
      <div class="tabs tabs-border tabs-primary">
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
      
      <!-- CONDITONAL RENDERING DER TABS WENN INHALT VORHANDEN -->
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