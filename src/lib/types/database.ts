export type Database = {
  public: {
    Tables: {
      cases: {
        Row: {
          id: string
          title: string
          subtitle: string
          image_url: string | null
          created_at: string
          updated_at: string
          status: 'active' | 'paused' | 'completed' | 'abandoned'
        }
        Insert: {
          id?: string
          title: string
          subtitle: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
          status: 'active' | 'paused' | 'completed' | 'abandoned'
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
          status?: 'active' | 'paused' | 'completed' | 'abandoned'
        }
      },
      case_metas: {
        Row: {
          id: string
          case_id: string
          vision: string
          strategy: string
        }
        Insert: {
          id?: string
          case_id: string
          vision: string
          strategy: string
        }
        Update: {
          id?: string
          case_id?: string
          vision?: string
          strategy?: string
        }
      },
      case_hypotheses: {
        Row: {
          id: string
          case_id: string
          hypothesis: string
        }
        Insert: {
          id?: string
          case_id: string
          hypothesis: string
        }
        Update: {
          id?: string
          case_id?: string
          hypothesis?: string
        }
      },
      log_entries: {
        Row: {
          id: string
          case_id: string
          date: string
          title: string
          content: string
        }
        Insert: {
          id?: string
          case_id: string
          date?: string
          title: string
          content: string
        }
        Update: {
          id?: string
          case_id?: string
          date?: string
          title?: string
          content?: string
        }
      },
      log_tags: {
        Row: {
          id: string
          log_entry_id: string
          tag: string
        }
        Insert: {
          id?: string
          log_entry_id: string
          tag: string
        }
        Update: {
          id?: string
          log_entry_id?: string
          tag?: string
        }
      },
      snapshots: {
        Row: {
          id: string
          case_id: string
          date: string
          reflections: string
        }
        Insert: {
          id?: string
          case_id: string
          date?: string
          reflections: string
        }
        Update: {
          id?: string
          case_id?: string
          date?: string
          reflections?: string
        }
      },
      snapshot_progress_items: {
        Row: {
          id: string
          snapshot_id: string
          type: 'achieved' | 'ongoing' | 'challenges'
          content: string
        }
        Insert: {
          id?: string
          snapshot_id: string
          type: 'achieved' | 'ongoing' | 'challenges'
          content: string
        }
        Update: {
          id?: string
          snapshot_id?: string
          type?: 'achieved' | 'ongoing' | 'challenges'
          content?: string
        }
      },
      snapshot_next_steps: {
        Row: {
          id: string
          snapshot_id: string
          step: string
        }
        Insert: {
          id?: string
          snapshot_id: string
          step: string
        }
        Update: {
          id?: string
          snapshot_id?: string
          step?: string
        }
      },
      decisions: {
        Row: {
          id: string
          case_id: string
          date: string
          title: string
          decision: string
          reasoning: string
        }
        Insert: {
          id?: string
          case_id: string
          date?: string
          title: string
          decision: string
          reasoning: string
        }
        Update: {
          id?: string
          case_id?: string
          date?: string
          title?: string
          decision?: string
          reasoning?: string
        }
      },
      decision_options: {
        Row: {
          id: string
          decision_id: string
          title: string
        }
        Insert: {
          id?: string
          decision_id: string
          title: string
        }
        Update: {
          id?: string
          decision_id?: string
          title?: string
        }
      },
      decision_option_points: {
        Row: {
          id: string
          option_id: string
          type: 'pro' | 'con'
          point: string
        }
        Insert: {
          id?: string
          option_id: string
          type: 'pro' | 'con'
          point: string
        }
        Update: {
          id?: string
          option_id?: string
          type?: 'pro' | 'con'
          point?: string
        }
      }
    }
  }
}