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
