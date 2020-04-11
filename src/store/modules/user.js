/*
 * @Desc:
 * @Author: lhw
 * @Date: 2020-04-03 15:50:47
 * @LastEditTime: 2020-04-11 08:21:19
 */
import { login, logout } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
 
const state = {
  token: getToken(),
  userInfo: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  login ({ commit }, userInfo) {
    const { phone, password } = userInfo
    return new Promise((resolve, reject) => {
      login({phone: phone}).then(response => {
        const { code, data, token } = response
        if (code === 200) {
          commit('SET_USERINFO', data)
          commit('SET_TOKEN', token)
          setToken(token)
          resolve({'msg': 'success'}) 
        }else {
          reject('request error')
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
