import axios from '@/utils/request'
export function getTabs() {
  return axios({
    url: '/v1_0/user/channels'
  })
}
export const getNewsList = function(id, timestamp) {
  return axios({
    url: '/v1_0/articles',
    params: {
      channel_id: id,
      timestamp
    }
  })
}
