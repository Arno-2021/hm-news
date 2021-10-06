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
/**
 * 取消关注
 * @param {*} target 作者ID
 * @returns
 */
export function unfollowAut(target) {
  return axios({
    method: 'delete',
    url: `/v1_0/user/followings/${target}`
  })
}
/**
 *  点赞文章
 * @param {*} target 文章ID
 * @returns
 */
export function likeArticle(target) {
  return axios({
    method: 'post',
    url: '/v1_0/article/likings',
    data: {
      target
    }
  })
}
/**
 * 取消点赞
 * @param {*} target 文章ID
 * @returns
 */
export function dislikeArticle(target) {
  return axios({
    method: 'delete',
    url: `/v1_0/article/likings/${target}`
  })
}
/**
 * 获取文章评论
 * @param {*} source 文章ID
 * @param {*} offset 偏移量
 * @returns
 */
export function getComment(source, offset) {
  return axios({
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source,
      offset,
      limit: 10
    }
  })
}
/**
 * 发表文章评论
 * @param {*} target 文章ID
 * @param {*} content 发表内容
 * @returns
 */
export function commentBelow(data) {
  return axios({
    method: 'post',
    url: '/v1_0/comments',
    data
  })
}
/**
 * 对评论或评论回复点赞
 * @param {*} target 点赞评论的id
 * @returns
 */
export function likeComment(target) {
  return axios({
    method: 'post',
    url: '/v1_0/comment/likings',
    data: {
      target
    }
  })
}
/**
 * 取消对评论或评论回复点赞
 * @param {*} target 取消点赞评论的id
 * @returns
 */
export function dislickComment(target) {
  return axios({
    method: 'delete',
    url: `/v1_0/comment/likings/${target}`
  })
}
/**
 * 获取评论回复
 * @param {*} source 评论ID
 * @param {*} offset 偏移量
 * @returns
 */
export function getReply(source, offset) {
  return axios({
    url: '/v1_0/comments',
    params: {
      type: 'c',
      source,
      offset,
      limit: 10
    }
  })
}
