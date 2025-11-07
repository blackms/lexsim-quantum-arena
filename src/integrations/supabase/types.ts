export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      case_documents: {
        Row: {
          case_id: string
          created_at: string | null
          extracted_text: string | null
          file_path: string
          file_size: number | null
          id: string
          metadata: Json | null
          mime_type: string | null
          organization_id: string
          summary: string | null
          title: string
          uploaded_by: string | null
        }
        Insert: {
          case_id: string
          created_at?: string | null
          extracted_text?: string | null
          file_path: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          organization_id: string
          summary?: string | null
          title: string
          uploaded_by?: string | null
        }
        Update: {
          case_id?: string
          created_at?: string | null
          extracted_text?: string | null
          file_path?: string
          file_size?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          organization_id?: string
          summary?: string | null
          title?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_documents_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "case_documents_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      cases: {
        Row: {
          case_number: string | null
          case_type: string
          case_value: number | null
          court_date: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          evidence_strength: number | null
          id: string
          jurisdiction: string
          metadata: Json | null
          organization_id: string
          status: Database["public"]["Enums"]["case_status"] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          case_number?: string | null
          case_type: string
          case_value?: number | null
          court_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          evidence_strength?: number | null
          id?: string
          jurisdiction: string
          metadata?: Json | null
          organization_id: string
          status?: Database["public"]["Enums"]["case_status"] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          case_number?: string | null
          case_type?: string
          case_value?: number | null
          court_date?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          evidence_strength?: number | null
          id?: string
          jurisdiction?: string
          metadata?: Json | null
          organization_id?: string
          status?: Database["public"]["Enums"]["case_status"] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cases_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      legal_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          created_by: string | null
          decision_patterns: Json | null
          full_name: string
          id: string
          jurisdiction: string | null
          notable_cases: string[] | null
          organization_id: string
          personality_type:
            | Database["public"]["Enums"]["personality_type"]
            | null
          photo_url: string | null
          psychological_profile: Json | null
          psychometric_data: Json | null
          role: Database["public"]["Enums"]["legal_role"]
          success_rate: number | null
          updated_at: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          decision_patterns?: Json | null
          full_name: string
          id?: string
          jurisdiction?: string | null
          notable_cases?: string[] | null
          organization_id: string
          personality_type?:
            | Database["public"]["Enums"]["personality_type"]
            | null
          photo_url?: string | null
          psychological_profile?: Json | null
          psychometric_data?: Json | null
          role: Database["public"]["Enums"]["legal_role"]
          success_rate?: number | null
          updated_at?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          created_by?: string | null
          decision_patterns?: Json | null
          full_name?: string
          id?: string
          jurisdiction?: string | null
          notable_cases?: string[] | null
          organization_id?: string
          personality_type?:
            | Database["public"]["Enums"]["personality_type"]
            | null
          photo_url?: string | null
          psychological_profile?: Json | null
          psychometric_data?: Json | null
          role?: Database["public"]["Enums"]["legal_role"]
          success_rate?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legal_profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          settings: Json | null
          slug: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          settings?: Json | null
          slug: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          settings?: Json | null
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          organization_id: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          organization_id?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          organization_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      simulation_messages: {
        Row: {
          agent_role: string
          content: string
          context_used: string[] | null
          id: string
          model_used: string | null
          organization_id: string
          simulation_id: string
          timestamp: string | null
        }
        Insert: {
          agent_role: string
          content: string
          context_used?: string[] | null
          id?: string
          model_used?: string | null
          organization_id: string
          simulation_id: string
          timestamp?: string | null
        }
        Update: {
          agent_role?: string
          content?: string
          context_used?: string[] | null
          id?: string
          model_used?: string | null
          organization_id?: string
          simulation_id?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "simulation_messages_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulation_messages_simulation_id_fkey"
            columns: ["simulation_id"]
            isOneToOne: false
            referencedRelation: "simulations"
            referencedColumns: ["id"]
          },
        ]
      }
      simulations: {
        Row: {
          agent_models: Json | null
          case_id: string
          completed_at: string | null
          country: string | null
          created_at: string | null
          defense_profile_id: string | null
          duration_seconds: number | null
          expert_profile_id: string | null
          id: string
          judge_profile_id: string | null
          organization_id: string
          prosecutor_profile_id: string | null
          results: Json | null
          scenarios_run: number | null
          started_at: string | null
          started_by: string | null
          status: string | null
          title: string
          win_probability: number | null
        }
        Insert: {
          agent_models?: Json | null
          case_id: string
          completed_at?: string | null
          country?: string | null
          created_at?: string | null
          defense_profile_id?: string | null
          duration_seconds?: number | null
          expert_profile_id?: string | null
          id?: string
          judge_profile_id?: string | null
          organization_id: string
          prosecutor_profile_id?: string | null
          results?: Json | null
          scenarios_run?: number | null
          started_at?: string | null
          started_by?: string | null
          status?: string | null
          title: string
          win_probability?: number | null
        }
        Update: {
          agent_models?: Json | null
          case_id?: string
          completed_at?: string | null
          country?: string | null
          created_at?: string | null
          defense_profile_id?: string | null
          duration_seconds?: number | null
          expert_profile_id?: string | null
          id?: string
          judge_profile_id?: string | null
          organization_id?: string
          prosecutor_profile_id?: string | null
          results?: Json | null
          scenarios_run?: number | null
          started_at?: string | null
          started_by?: string | null
          status?: string | null
          title?: string
          win_probability?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "simulations_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "cases"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulations_defense_profile_id_fkey"
            columns: ["defense_profile_id"]
            isOneToOne: false
            referencedRelation: "legal_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulations_expert_profile_id_fkey"
            columns: ["expert_profile_id"]
            isOneToOne: false
            referencedRelation: "legal_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulations_judge_profile_id_fkey"
            columns: ["judge_profile_id"]
            isOneToOne: false
            referencedRelation: "legal_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulations_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "simulations_prosecutor_profile_id_fkey"
            columns: ["prosecutor_profile_id"]
            isOneToOne: false
            referencedRelation: "legal_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          organization_id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          organization_id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization: { Args: { _user_id: string }; Returns: string }
      has_role: {
        Args: {
          _organization_id: string
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "owner" | "admin" | "lawyer" | "viewer"
      case_status: "draft" | "active" | "closed" | "archived"
      legal_role:
        | "judge"
        | "prosecutor"
        | "defense_attorney"
        | "expert_witness"
        | "witness"
      personality_type:
        | "analytical"
        | "aggressive"
        | "diplomatic"
        | "cautious"
        | "creative"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["owner", "admin", "lawyer", "viewer"],
      case_status: ["draft", "active", "closed", "archived"],
      legal_role: [
        "judge",
        "prosecutor",
        "defense_attorney",
        "expert_witness",
        "witness",
      ],
      personality_type: [
        "analytical",
        "aggressive",
        "diplomatic",
        "cautious",
        "creative",
      ],
    },
  },
} as const
