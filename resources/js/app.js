import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import VCalendar from 'v-calendar'
import Component from './component'

Vue.config.productionTip = false

Vue.use(VCalendar)
Vue.use(Component)

new Vue({
    store,
    router,
    render: h=>h(App)
}).$mount('#app')
