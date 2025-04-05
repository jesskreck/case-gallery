<script lang="ts">
  import { enhance } from '$app/forms';
  import { toastStore } from '$lib/components/toast';
  import Toast from '$lib/components/Toast.svelte';
  import type { CaseFormData } from '$lib/types/forms';
  
  let { form }: { form: CaseFormData | null } = $props();
  
  let submitting = $state(false);
  
  function handleSubmit() {
    submitting = true;
    return async ({ result, update }) => {
      submitting = false;
      
      if (result.type === 'success') {
        toastStore.success('Case erfolgreich angelegt');
      } else if (result.type === 'failure') {
        toastStore.error(result.data?.message || 'Fehler beim Anlegen des Cases');
      } else if (result.type === 'error') {
        toastStore.error(`Fehler: ${result.error.message}`);
      } else if (result.type === 'redirect') {
        // Erfolgreiche Weiterleitung
        toastStore.success('Case erfolgreich angelegt');
      }
      
      await update();
    };
  }
</script>

<Toast />

<div class="container mx-auto py-8 px-4 md:px-6">
  <a href="/" class="btn btn-ghost btn-sm mb-4">
    Zurück zur Galerie
  </a>
  
  <h1 class="text-3xl font-bold mb-6">Neues Exponat erstellen</h1>
  
  <div class="card max-w-3xl mx-auto">
    <div class="card-body">
      <h2 class="card-title">Grundlegende Informationen</h2>
      <p class="text-base-content/70">Geben Sie die grundlegenden Informationen für das neue Exponat ein.</p>
      
      {#if form && form.message}
        <div class="alert alert-error mb-4">
          <span>{form.message}</span>
        </div>
      {/if}
      
      <form method="POST" use:enhance={handleSubmit} class="mt-6 space-y-4">
        <div class="form-control">
          <label class="label" for="title">
            <span class="label-text">Titel</span>
          </label>
          <input 
            type="text" 
            id="title"
            name="title" 
            value={form?.values?.title ?? ''}
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
            value={form?.values?.subtitle ?? ''}
            placeholder="z.B. Ein All-in-One Tool für die Selbstständigkeit" 
            class="input input-bordered w-full" 
            required
          />
        </div>
        
        <div class="form-control">
          <label class="label" for="imageUrl">
            <span class="label-text">Bild-URL (optional)</span>
          </label>
          <input 
            type="url" 
            id="imageUrl"
            name="imageUrl" 
            value={form?.values?.imageUrl ?? ''}
            placeholder="https://example.com/image.jpg" 
            class="input input-bordered w-full"
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
          >{form?.values?.vision ?? ''}</textarea>
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
          >{form?.values?.hypothesesText ?? ''}</textarea>
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
          >{form?.values?.strategy ?? ''}</textarea>
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