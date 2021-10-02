import axios from '@/utils/request'

/**
 *   获取新闻文章列表
 * @param {*} id 频道ID
 * @param {*} timestamp 时间戳
 * @returns
 */
export const getNewsList = function(id, timestamp) {
  return axios({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
/**
 * 获取文章内容
 * @param {*} id 文章ID
 * @returns
 */
export function getArticleContent(id) {
  return axios({
    url: `/v1_0/articles/${id}`
  })
}
/**
 *  关注作者
 * @param {*} target 关注作者ID
 * @returns
 */
export function followAut(target) {
  return axios({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}
export function unfollowAut(target) {
  return axios({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`
  })
}
