export interface CaseMeta {
    vision: string;
    hypotheses: string[];
    strategy: string;
  }
  
  export interface LogEntry {
    id: string;
    date: string;
    title: string;
    content: string;
    tags: string[];
  }
  
  export interface SnapshotDay {
    id: string;
    date: string;
    reflections: string;
    progress: {
      achieved: string[];
      ongoing: string[];
      challenges: string[];
    };
    nextSteps: string[];
  }
  
  export interface Decision {
    id: string;
    date: string;
    title: string;
    options: {
      title: string;
      pros: string[];
      cons: string[];
    }[];
    decision: string;
    reasoning: string;
  }
  
  export interface Case {
    id: string;
    title: string;
    subtitle: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
    status: 'active' | 'paused' | 'completed' | 'abandoned';
    meta: CaseMeta;
    logEntries: LogEntry[];
    snapshots: SnapshotDay[];
    decisions: Decision[];
  }