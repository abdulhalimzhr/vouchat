import { Chat, ChatResponse } from '@/types/chatType';
import axios, { AxiosResponse } from 'axios';
import { API_URL, socket } from '@/utils/helpers';

class ChatService {
  async getChatMessages(roomId: string): Promise<ChatResponse> {
    return axios
      .get<ChatResponse>(`${API_URL}messages/room/${roomId}`)
      .then((response: AxiosResponse<ChatResponse>) => {
        return response.data;
      });
  }

  async sendChatMessage(chat: Chat): Promise<ChatResponse> {
    return axios
      .post<ChatResponse>(`${API_URL}send-message`, chat)
      .then((response: AxiosResponse<ChatResponse>) => {
        socket.emit('chat message', chat);
        return response.data;
      });
  }
}

export default new ChatService();
