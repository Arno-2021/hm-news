import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/base.less'
import '@/utils/vant.js'
import 'amfe-flexible'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
