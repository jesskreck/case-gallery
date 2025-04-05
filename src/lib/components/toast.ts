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