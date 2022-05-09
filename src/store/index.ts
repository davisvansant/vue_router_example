import { createStore } from 'vuex'

interface Data {
  authenticated: boolean,
  username: string,
  password: string,
}

const data: Data = {
  authenticated: false,
  username: '',
  password: ''
}

export default createStore({
  state: {
    data
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
