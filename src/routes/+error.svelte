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