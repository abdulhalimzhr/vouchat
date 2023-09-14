import axios, { AxiosResponse } from 'axios';

const API_URL = 'http://localhost:3001/api/chat/';

interface Join {
  username: string;
  roomId: string;
}

interface AuthResponse {
  message: string;
  data: any;
  sessionId: string;
}

class JoinService {
  async join(user: Join): Promise<AuthResponse> {
    return axios
      .post<AuthResponse>(API_URL + 'join', {
        username: user.username,
        roomId: user.roomId
      })
      .then((response: AxiosResponse<AuthResponse>) => {
        return response.data;
      });
  }

  async exitRoom(user: Join): Promise<AuthResponse> {
    const response = await axios.post<AuthResponse>(API_URL + 'exit', {
      username: user.username,
      roomId: user.roomId
    });
    return response.data;
  }
}

export default new JoinService();
