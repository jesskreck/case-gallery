import type { 
  ActionResult as SvelteKitActionResult,
  SubmitFunction as SvelteKitSubmitFunction
} from '@sveltejs/kit';


export interface ActionFormData {
  message: string;
  [key: string]: any;
}

export interface CaseFormValues {
  title?: string;
  subtitle?: string;
  imageUrl?: string | null;
  vision?: string;
  hypothesesText?: string;
  strategy?: string;
}

export interface CaseFormData extends ActionFormData {
  values?: CaseFormValues;
}

// Verwende die SvelteKit-Typen direkt, anstatt sie zu reimplementieren
export type { SvelteKitSubmitFunction as SubmitFunction };
export type { SvelteKitActionResult as ActionResult };