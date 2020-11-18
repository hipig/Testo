import Vue from 'vue'
import App from './App.vue'
import store from '@/admin/store'
import router from '@/admin/router'

import Component from './component'

Vue.config.productionTip = false

Vue.use(Component)

new Vue({
  store,
  router,
  render: h=>h(App)
}).$mount('#app')
