import JoinService from '../services/join.service';
import { Join, JoinState } from '../types/joinType';

const initialState: JoinState = {
  roomId: localStorage.getItem('roomId') ?? '',
  sessionId: localStorage.getItem('sessionId') ?? '',
  username: localStorage.getItem('username') ?? ''
};

export const join = {
  namespaced: true,
  state: initialState,
  actions: {
    async joinRoom({ commit }: any, join: Join) {
      try {
        return await JoinService.join(join).then(
          (data: any) => {
            const result = {
              sessionId: data.sessionId,
              roomId: data.data.roomId,
              username: data.data.username
            };
            commit('joined', result);
            commit('chat/resetChatMessages', null, { root: true });
            return Promise.resolve();
          },
          (error: any) => {
            return Promise.reject(error);
          }
        );
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async exitRoom({ commit }: any) {
      try {
        return await JoinService.exitRoom({
          roomId: initialState.roomId,
          username: initialState.username
        })
          .then(
            (data: any) => {
              commit('exit');
              return Promise.resolve(data);
            },
            (error: any) => {
              return Promise.reject(error);
            }
          )
          .then(() => {
            localStorage.removeItem('sessionId');
          });
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
  mutations: {
    joined(state: JoinState, data: JoinState) {
      state.sessionId = data.sessionId;
      state.roomId = data.roomId;
      state.username = data.username;

      localStorage.setItem('username', data.username);
      localStorage.setItem('sessionId', data.sessionId);
      localStorage.setItem('roomId', data.roomId);
    },
    exit(state: JoinState) {
      state.sessionId = '';
      state.roomId = '';
      localStorage.removeItem('sessionId');
      localStorage.removeItem('roomId');
      localStorage.removeItem('username');
    }
  },
  getters: {
    getRoomId(state: JoinState) {
      return state.roomId;
    }
  }
};
