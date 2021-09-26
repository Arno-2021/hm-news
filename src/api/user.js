import axios from '@/utils/request'
export function login(mobile, code) {
  return axios({
    method: 'post',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}
