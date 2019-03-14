/**
 * @Token 设置用户的token
 */

import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'

export const getToken = () => {
  const token = Cookies.get(token)
  if (token) return token
  else return false
}

export const setToken = (token) => {
  /**
   * @expires 表示cookie可以存在的时间，1天
   */
  Cookies.set(TOKEN_KEY, token, { expires: 1 })
}
