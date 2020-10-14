import directive from './src/directive'
import loading from './src/loading'


export default {
  install(Vue) {
    Vue.use(directive)
    Vue.prototype.$loading = loading
  },
  directive,
  loading
}
