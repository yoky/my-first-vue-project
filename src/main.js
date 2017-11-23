// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'Vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

import './common/stylus/index.styl'

Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.config.productionTip = false

/* eslint-disable no-new */

var routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: goods
}, {
  path: '/ratings',
  component: ratings
}, {
  path: '/seller',
  component: seller
}]

var router = new VueRouter({
  routes: routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
