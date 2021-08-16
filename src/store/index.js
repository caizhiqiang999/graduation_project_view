import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {
      nickname: window.sessionStorage.getItem('nickname') || null,
      token: window.sessionStorage.getItem('token') || null
    }
  },
  mutations: {
    SET_USERINFO(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {},
  modules: {}
})
export default store
