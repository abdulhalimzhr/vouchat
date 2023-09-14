import ChatService from '../services/chat.service';

interface Chat {
  username: string;
  roomId: string;
  message: string;
  sessionId: string;
}

interface ChatState {
  chats?: Chat[];
}

const initialState: ChatState = {
  chats: []
};

export const chat = {
  namespaced: true,
  state: initialState,
  actions: {
    async getChatMessages({ commit }: any, chat: Chat) {
      return await ChatService.getChatMessages(chat).then(
        (data: any) => {
          commit('getChatMessages', data.chats);
          return Promise.resolve(data);
        },
        (error: any) => {
          return Promise.reject(error);
        }
      );
    }
  },
  mutations: {
    updateChatMessages(state: ChatState, chats: Chat[]) {
      state.chats = chats;
    }
  }
};
