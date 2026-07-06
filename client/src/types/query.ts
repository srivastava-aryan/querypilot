// export interface QueryResponse {
//   sql: string;
//   data: Record<string, any>[];
// }

// export interface ChatMessage {
//   role: "user" | "assistant";
//   content: string;
// }

export interface QueryResponse {
  sql: string;
  data: Record<string, any>[];
}

export interface Message {
  role: "user" | "assistant";

  content: string;

  sql?: string;

  data?: Record<string, any>[];
}

export interface HistoryMessage {
  role: "user" | "assistant";

  content: string;

  sql_query?: string;

  data?: Record<string, any>[];
}

export interface Session {
  id: string;
  title: string;
  created_at: string;
}