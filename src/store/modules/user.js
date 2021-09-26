export default {
  namespaced: true,
  state: {
    token: {}
  },
  mutations: {
    setStoreToken(state, token) {
      state.token = token
    }
  }
}
