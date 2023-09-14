import { createStore } from 'vuex';
import { join } from './join.module';
import { chat } from './chat.module';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    join,
    chat
  }
});
