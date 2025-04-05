import type { Case, LogEntry, SnapshotDay, Decision } from '$lib/types/case';

//Adapter-Funktionen zum Umwandeln der Supabase-Daten in die Frontend-Typen
////// Datenstruktur von Supabase (snake_case und verschachtelte Objekte) ist anders als meine Case-Struktur (camelCase mit flachen Arrays).
////// Adapter übersetzt zwischen Supabase-Daten und Frontend-Format

export function adaptCase(dbCase: any): Case {
  return {
    id: dbCase.id,
    title: dbCase.title,
    subtitle: dbCase.subtitle,
    imageUrl: dbCase.image_url,
    createdAt: dbCase.created_at,
    updatedAt: dbCase.updated_at,
    status: dbCase.status,
    meta: {
      vision: dbCase.case_metas?.[0]?.vision || '',
      strategy: dbCase.case_metas?.[0]?.strategy || '',
      hypotheses: dbCase.case_hypotheses?.map((h: any) => h.hypothesis) || []
    },
    logEntries: (dbCase.log_entries || []).map(adaptLogEntry),
    snapshots: (dbCase.snapshots || []).map(adaptSnapshot),
    decisions: (dbCase.decisions || []).map(adaptDecision)
  };
}

export function adaptLogEntry(dbEntry: any): LogEntry {
  return {
    id: dbEntry.id,
    date: dbEntry.date,
    title: dbEntry.title,
    content: dbEntry.content,
    tags: (dbEntry.log_tags || []).map((t: any) => t.tag)
  };
}

export function adaptSnapshot(dbSnapshot: any): SnapshotDay {
  // Gruppiere Progress-Items nach Typ
  const progressItems = dbSnapshot.snapshot_progress_items || [];
  
  return {
    id: dbSnapshot.id,
    date: dbSnapshot.date,
    reflections: dbSnapshot.reflections,
    progress: {
      achieved: progressItems
        .filter((item: any) => item.type === 'achieved')
        .map((item: any) => item.content),
      ongoing: progressItems
        .filter((item: any) => item.type === 'ongoing')
        .map((item: any) => item.content),
      challenges: progressItems
        .filter((item: any) => item.type === 'challenges')
        .map((item: any) => item.content)
    },
    nextSteps: (dbSnapshot.snapshot_next_steps || []).map((s: any) => s.step)
  };
}

export function adaptDecision(dbDecision: any): Decision {
  return {
    id: dbDecision.id,
    date: dbDecision.date,
    title: dbDecision.title,
    decision: dbDecision.decision,
    reasoning: dbDecision.reasoning,
    options: (dbDecision.decision_options || []).map((option: any) => {
      const points = option.decision_option_points || [];
      
      return {
        title: option.title,
        pros: points
          .filter((point: any) => point.type === 'pro')
          .map((point: any) => point.point),
        cons: points
          .filter((point: any) => point.type === 'con')
          .map((point: any) => point.point)
      };
    })
  };
}