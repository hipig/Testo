import Pagination from "@/components/common/pagination"
import Dialog from "@/components/common/dialog"
import Message from "@/components/common/message"
import Loading from "@/components/common/loading"
import Progress from "@/components/common/progress"
import Upload from "@/components/common/upload"

const components = [
  Pagination,
  Progress,
  Upload
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })

  Vue.use(Loading.directive)

  Vue.prototype.$Loading = Loading.loading
  Vue.prototype.$Dialog = Dialog
  Vue.prototype.$Message = Message

  Vue.directive('auth', )
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
