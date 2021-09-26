import { getToken, removeToken, setToken } from '@/utils/storage'
const token = getToken()
export default {
  namespaced: true,
  state: {
    token
  },
  mutations: {
    setStoreToken(state, token) {
      setToken(token)
      state.token = getToken()
    },
    removeStoreToken(state) {
      removeToken()
      state.token = {}
    }
  }
}
