import { getTabs, getAllTags, delUserTag } from '@/api/channels'
export default {
  namespaced: true,
  state: {
    userList: [],
    allList: []
  },
  mutations: {
    setUserList(state, val) {
      state.userList = val
    },
    setAllList(state, val) {
      state.allList = val
    },
    pushUserList(state, val) {
      state.userList.push(val)
    }
  },
  actions: {
    async actionGetUserList(context) {
      const res = await getTabs()
      context.commit('setUserList', res.data.channels)
    },
    async actionGetAllList(context) {
      const res = await getAllTags()
      context.commit('setAllList', res.data.channels)
    },
    async actionDelUserList(context, target) {
      await delUserTag(target)
    }
  },
  getters: {
    getOptional(state) {
      return state.allList.filter(
        item => !state.userList.some(channel => channel.id === item.id)
      )
    }
  }
}
