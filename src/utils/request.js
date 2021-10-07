import axios from 'axios'
import store from '@/store'
import router from '@/router'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.authorization = 'Bearer ' + store.state.user.token.token
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response.data
  },
  async function(error) {
    const token = store.state.user.token.token
    const refreshToken = store.state.user.token.refresh_token
    if (error.response.status === 401) {
      if (token) {
        try {
          const res = await axios({
            method: 'PUT',
            url: 'http://toutiao.itheima.net/v1_0/authorizations',
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          })
          store.commit('user/setStoreToken', {
            token: res.data.data.token,
            refresh_token: refreshToken
          })
          return instance(error.config)
        } catch (e) {
          toLogin()
        }
      } else {
        toLogin()
      }
    } else {
      return Promise.reject(error)
    }
  }
)
export default instance
function toLogin() {
  store.commit('user/removeStoreToken')
  router.push({
    path: '/login',
    query: {
      back: router.currentRoute.fullPath
    }
  })
}
