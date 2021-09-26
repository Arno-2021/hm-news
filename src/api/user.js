import axios from '@/utils/request'
/**
 * 登录注册请求
 * @param {*} mobile 用户手机号
 * @param {*} code 验证码
 * @returns
 */
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

export function getProfile() {
  return axios({
    url: '/v1_0/user/profile'
    // headers: {
    //   Authorization: 'Bearer ' + token
    // }
  })
}
