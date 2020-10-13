import Pagination from '@/components/common/pagination'
import Message from '@/components/common/message'
import Loading from '@/components/common/loading'

const components = [
  Pagination
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(Loading.directive)

  Vue.prototype.$Loading = Loading.loading
  Vue.prototype.$Message = Message
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
