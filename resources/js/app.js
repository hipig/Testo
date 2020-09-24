import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import Message from '@/components/common/message'

Vue.config.productionTip = false

Vue.prototype.$Message = Message

new Vue({
    store,
    router,
    render: h=>h(App)
}).$mount('#app')
