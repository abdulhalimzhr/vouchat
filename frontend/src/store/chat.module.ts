import ChatService from '../services/chat.service';
import { Chat, ChatState } from '../types/chatType';

const initialState: ChatState = {
  chats: [],
  typingUsernames: []
};

export const chat = {
  namespaced: true,
  state: initialState,
  actions: {
    async getChatMessages({ commit }: any, roomId: string) {
      return await ChatService.getChatMessages(roomId).then(
        (data: any) => {
          commit('updateChatMessages', data.data);
          return Promise.resolve(data);
        },
        (error: any) => {
          return Promise.reject(error);
        }
      );
    },
    async sendChatMessage({ rootState }: any, message: string) {
      try {
        const chat = {
          username: rootState.join.username,
          roomId: rootState.join.roomId,
          message: message,
          sessionId: rootState.join.sessionId
        };
        return await ChatService.sendChatMessage(chat).then(
          (data: any) => {
            return Promise.resolve(data);
          },
          (error: any) => {
            return Promise.reject(error);
          }
        );
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
  mutations: {
    updateChatMessages(state: ChatState, chats: Chat[]) {
      state.chats = chats;
    },
    resetChatMessages(state: ChatState) {
      state.chats = [];
    }
  }
};
