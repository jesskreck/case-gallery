import { supabase } from "$lib/supabase";
import { adaptCase, adaptLogEntry, adaptSnapshot, adaptDecision } from "$lib/adapters";
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
    throw error(404, 'Case nicht gefunden');
  }
  
  // Log-Einträge laden
  const { data: logEntries = [], error: logError } = await supabase
    .from('log_entries')
    .select(`
      *,
      log_tags(tag)
    `)
    .eq('case_id', params.id)
    .order('date', { ascending: false });
  
  if (logError) {
    console.error('Error fetching log entries:', logError);
  }
  
  // Snapshots laden
  const { data: snapshots = [], error: snapshotsError } = await supabase
    .from('snapshots')
    .select(`
      *,
      snapshot_progress_items(type, content),
      snapshot_next_steps(step)
    `)
    .eq('case_id', params.id)
    .order('date', { ascending: false });
  
  if (snapshotsError) {
    console.error('Error fetching snapshots:', snapshotsError);
  }
  
  // Entscheidungen laden
  const { data: decisions = [], error: decisionsError } = await supabase
    .from('decisions')
    .select(`
      *,
      decision_options(
        id,
        title,
        decision_option_points(type, point)
      )
    `)
    .eq('case_id', params.id)
    .order('date', { ascending: false });
  
  if (decisionsError) {
    console.error('Error fetching decisions:', decisionsError);
  }
  
  // Alles in ein Case-Objekt zusammenführen
  const fullCase = {
    ...caseData,
    log_entries: logEntries,
    snapshots: snapshots,
    decisions: decisions
  };
  
  return { 
    case: adaptCase(fullCase)
  };
};