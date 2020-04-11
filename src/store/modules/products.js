import { requestGetProducts } from '../../api/product'

/*
 * @Descripttion: 
 * @Author: lhw
 * @Date: 2020-04-06 16:42:06
 * @LastEditTime: 2020-04-11 08:04:25
 */
const state = {
  list: [],
  cartInfo:[]
}

const mutations = {
  'SET_PRODUCTS': (state, v) => {
    state.list = v
  },
  'SET_CARTINFO': (state, v) => {
    state.cartInfo = v
  }
}

const actions = {
  //获取商品信息
  getProducts({ commit }) {
    return new Promise((resolve, reject) => {
      requestGetProducts().then(response => {
        const  { code, msg, data } = response
        if (code === 200) {
          commit('SET_PRODUCTS', data)
          resolve({code: code, msg: msg})
        }else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  cartInfo({ commit }, v) {
    commit('SET_CARTINFO', v)
  }
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}