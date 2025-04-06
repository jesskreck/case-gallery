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