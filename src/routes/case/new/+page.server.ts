// src/routes/case/new/+page.server.ts
import { redirect, error, fail } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';
import type { Actions } from './$types';
import type { CaseFormData } from '$lib/types/forms';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    
    // Basis-Case-Daten extrahieren
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const imageUrl = formData.get('imageUrl') as string || null;
    const vision = formData.get('vision') as string;
    const hypothesesText = formData.get('hypotheses') as string;
    const strategy = formData.get('strategy') as string;
    
    // Für Fehler-Rückgaben
    const values = { title, subtitle, imageUrl, vision, hypothesesText, strategy };
    
    // Validierung
    if (!title || !subtitle || !vision || !strategy) {
      return fail(400, { 
        message: 'Alle Pflichtfelder müssen ausgefüllt sein',
        values
      } as CaseFormData);
    }
    
    // Hypothesen aufbereiten
    const hypotheses = hypothesesText
      .split('\n')
      .map(h => h.trim())
      .filter(h => h.length > 0);
    
    if (hypotheses.length === 0) {
      return fail(400, { 
        message: 'Mindestens eine Hypothese muss angegeben werden',
        values
      } as CaseFormData);
    }
    
    try {
      // 1. Basis-Case erstellen
      const { data: caseData, error: caseError } = await supabase
        .from('cases')
        .insert([{ 
          title, 
          subtitle, 
          image_url: imageUrl,
          status: 'active' as const
        }])
        .select()
        .single();
      
      if (caseError || !caseData) {
        console.error('Error creating case:', caseError);
        return fail(500, { message: 'Fehler beim Erstellen des Cases', values } as CaseFormData);
      }
      
      // 2. Meta-Informationen erstellen
      const { error: metaError } = await supabase
        .from('case_metas')
        .insert([{ 
          case_id: caseData.id, 
          vision, 
          strategy 
        }]);
        
      if (metaError) {
        console.error('Error creating meta:', metaError);
        return fail(500, { message: 'Fehler beim Erstellen der Meta-Informationen', values } as CaseFormData);
      }
      
      // 3. Hypothesen erstellen
      const hypothesisRecords = hypotheses.map(hypothesis => ({
        case_id: caseData.id,
        hypothesis
      }));
      
      const { error: hypothesesError } = await supabase
        .from('case_hypotheses')
        .insert(hypothesisRecords);
        
      if (hypothesesError) {
        console.error('Error creating hypotheses:', hypothesesError);
        return fail(500, { message: 'Fehler beim Erstellen der Hypothesen', values } as CaseFormData);
      }
      
      // Bei Erfolg zur Detail-Ansicht weiterleiten
      redirect(303, `/case/${caseData.id}`);
    } catch (err) {
      console.error('Transaction error:', err);
      return fail(500, { message: 'Ein unerwarteter Fehler ist aufgetreten', values } as CaseFormData);
    }
  }
};