const TOKEN_NAME = 'hm-news-token'
export function setToken(token) {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}
export function getToken() {
  return JSON.parse(localStorage.getItem(TOKEN_NAME)) || {}
}
export function removeToken() {
  localStorage.removeItem(TOKEN_NAME)
}
