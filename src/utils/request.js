import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})
export default instance
