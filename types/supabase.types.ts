export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      days: {
        Row: {
          display_name: string
          id: number
          name: string
        }
        Insert: {
          display_name: string
          id?: number
          name: string
        }
        Update: {
          display_name?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      docs: {
        Row: {
          id: number
          name: string
          path: string
        }
        Insert: {
          id?: number
          name: string
          path: string
        }
        Update: {
          id?: number
          name?: string
          path?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          id: number
          message: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          message?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          message?: string | null
        }
        Relationships: []
      }
      modules: {
        Row: {
          id: number
          isVisible: boolean
          name: string
          path: string
        }
        Insert: {
          id?: number
          isVisible?: boolean
          name: string
          path: string
        }
        Update: {
          id?: number
          isVisible?: boolean
          name?: string
          path?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          day: string | null
          element_number: number | null
          id: number
          name: string | null
          time: string | null
        }
        Insert: {
          day?: string | null
          element_number?: number | null
          id?: number
          name?: string | null
          time?: string | null
        }
        Update: {
          day?: string | null
          element_number?: number | null
          id?: number
          name?: string | null
          time?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string
          id: number
          subscription: Json
        }
        Insert: {
          created_at?: string
          id?: number
          subscription: Json
        }
        Update: {
          created_at?: string
          id?: number
          subscription?: Json
        }
        Relationships: []
      }
      swipes: {
        Row: {
          created_at: string
          id: number
          owner: string | null
          "swiped-left": string | null
          "swiped-right": string | null
        }
        Insert: {
          created_at?: string
          id?: number
          owner?: string | null
          "swiped-left"?: string | null
          "swiped-right"?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          owner?: string | null
          "swiped-left"?: string | null
          "swiped-right"?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          description: string | null
          email: string | null
          facebook_nickname: string | null
          id: string
          image_path: string
          name: string | null
          phone: string | null
          role: string | null
          room: string | null
          surname: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          email?: string | null
          facebook_nickname?: string | null
          id?: string
          image_path?: string
          name?: string | null
          phone?: string | null
          role?: string | null
          room?: string | null
          surname?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          email?: string | null
          facebook_nickname?: string | null
          id?: string
          image_path?: string
          name?: string | null
          phone?: string | null
          role?: string | null
          room?: string | null
          surname?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
