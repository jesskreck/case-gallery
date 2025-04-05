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