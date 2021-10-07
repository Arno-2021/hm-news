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
/**
 * 修改用户信息
 * @param {*} data name昵称 gender性别 birthday生日
 * @returns
 */
export function subEdit(data) {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
/**
 * 上传用户头像
 * @param {*} data 上传头像FormDate
 * @returns
 */
export function editAvatar(data) {
  return axios({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
