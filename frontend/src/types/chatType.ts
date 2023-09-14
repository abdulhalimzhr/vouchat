// Chat types

export interface ChatItem {
  id: number;
  roomId: string;
  message: string;
  username: string;
  sessionId: string;
  createdAt: string;
}

export interface Chat {
  username: string;
  roomId: string;
  message: string;
  sessionId: string;
}

export interface ChatState {
  chats?: Chat[];
  typingUsernames?: string[];
}

export interface ChatResponse {
  error: boolean;
  message: string;
  data: Chat[];
}
