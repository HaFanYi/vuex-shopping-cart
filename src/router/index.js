/*
 * @Descripttion: 
 * @Author: lhw
 * @Date: 2020-04-03 09:12:32
 * @LastEditTime: 2020-04-11 14:03:28
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index/Home'
import { getToken } from '../utils/auth'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('../views/index/vip.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import('../views/index/cartList.vue')
  }
]

const router = new VueRouter({
  routes
})
const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({path:'/'})
      return
    }else {
      const userInfo = store.getters.userInfo
      if (userInfo) {
        next()
      }else {
        next(`/login?redirect=${to.path}`)
        return
      }
    }
  }else {
    //无token
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {

      next(`/login?redirect=${to.path}`)
    }
  }
})


export default router
