import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3001/api/chat/';

interface User {
  username: string;
  roomId: string;
}

interface ChatResponse {
  sessionId: string;
}

class ChatService {
  async getChatMessages(user: User): Promise<ChatResponse> {
    return axios
      .post<ChatResponse>(API_URL + 'join', {
        username: user.username,
        roomId: user.roomId
      })
      .then((response: AxiosResponse<ChatResponse>) => {
        if (response.data.sessionId) {
          localStorage.setItem('sessionId', JSON.stringify(response.data));
        }

        return response.data;
      });
  }
}

export default new ChatService();
