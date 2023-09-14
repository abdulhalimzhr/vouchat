import JoinService from '../services/join.service';

interface Join {
  username: string;
  roomId: string;
}

interface JoinState {
  roomId: string;
  sessionId: string;
  username: string;
}

const initialState: JoinState = {
  roomId: '',
  sessionId: localStorage.getItem('sessionId') ?? '',
  username: ''
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
      localStorage.setItem('sessionId', data.sessionId);
    },
    exit(state: JoinState) {
      state.sessionId = '';
      state.roomId = '';
      localStorage.removeItem('sessionId');
    }
  },
  getters: {
    getRoomId(state: JoinState) {
      return state.roomId;
    }
  }
};
