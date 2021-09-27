import { getToken, removeToken, setToken } from '@/utils/storage'
import { getProfile } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setStoreToken(state, token) {
      state.token = token
      setToken(token)
    },
    removeStoreToken(state) {
      state.token = {}
      removeToken()
    },
    storeUserInfo(state, val) {
      state.userInfo = val
    }
  },
  actions: {
    async storeGetProfile(context) {
      const res = await getProfile()
      context.commit('storeUserInfo', res.data)
    }
  }
}
