import axios from '@/utils/request'
/**
 * 搜索推荐
 * @param {*} q 请求的前缀词
 */
export function getSuggetion(q) {
  return axios({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
export function getSearchResults(page, q) {
  return axios({
    url: '/v1_0/search',
    params: {
      page,
      per_page: 10,
      q
    }
  })
}
