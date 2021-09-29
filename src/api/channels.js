import axios from '@/utils/request'
/**
 *  获取文章新闻推荐
 * @returns
 */
export function getTabs() {
  return axios({
    url: '/v1_0/user/channels'
  })
}
/**
 *  用户不感兴趣文章
 * @param {*} target 文章ID
 * @returns
 */
export function dislikeArticle(target) {
  return axios({
    method: 'post',
    url: '/v1_0/article/dislikes',
    data: {
      target
    }
  })
}
/**
 * 举报文章
 * @param {*} target 文章ID
 * @param {*} type 举报类型
 * @returns
 */
export function reportArticle(target, type) {
  return axios({
    method: 'post',
    url: '/v1_0/article/reports',
    data: {
      target,
      type
    }
  })
}
export function getAllTags() {
  return axios({
    url: '/v1_0/channels'
  })
}
export function delUserTag(target) {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${target}`
  })
}
export function addUserTag(id) {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels: [{ id }]
    }
  })
}
