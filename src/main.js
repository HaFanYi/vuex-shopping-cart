/*
 * @Descripttion: 
 * @Author: lhw
 * @Date: 2020-04-03 09:12:32
 * @LastEditTime: 2020-04-06 01:05:10
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
