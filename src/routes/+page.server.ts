import { supabase } from '$lib/supabase';
import { adaptCase } from '$lib/adapters';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const { data, error } = await supabase
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
  
  // Adapter für die Transformation verwenden
  return { 
    cases: data.map(adaptCase)
  };
};