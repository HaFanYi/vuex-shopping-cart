/*
 * @Descripttion: 
 * @Author: lhw
 * @Date: 2020-04-06 10:11:34
 * @LastEditTime: 2020-04-06 10:18:15
 */
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
