const TOKEN_NAME = 'hm-news-token'
const CHANNEL_NAME = 'hm-news-channel'
export function setToken(token) {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}
export function getToken() {
  return JSON.parse(localStorage.getItem(TOKEN_NAME)) || {}
}
export function removeToken() {
  localStorage.removeItem(TOKEN_NAME)
}
export function setChannel(val) {
  localStorage.setItem(CHANNEL_NAME, JSON.stringify(val))
}
export function getChannel() {
  return JSON.parse(localStorage.getItem(CHANNEL_NAME))
}
