import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant.js'
import '@/style/base.less'
import 'amfe-flexible'
import moment from 'moment'
Vue.config.productionTip = false
Vue.filter('fromNow', val => {
  return moment(val).fromNow()
})
moment.locale('zh-cn')
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
