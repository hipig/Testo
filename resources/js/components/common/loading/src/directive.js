import Vue from 'vue'
import LoadingVue from './Loading.vue'
import { addClass, removeClass, getStyle, afterLeave } from '@/utils/util'

const LoadingConstructor = Vue.extend(LoadingVue)

const loadingDirective = {}
loadingDirective.install = Vue => {
  if (Vue.prototype.$isServer) return
  const toggleLoading = (el, binding) => {
    if (binding.value) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          el.originalPosition = getStyle(document.body, 'position')
          el.originalOverflow = getStyle(document.body, 'overflow')

          addClass(el.loading, 'fixed')
          insertDom(document.body, el, binding)
        } else {
          removeClass(el.loading, 'fixed')

          if (binding.modifiers.body) {
            el.originalPosition = getStyle(document.body, 'position')
            insertDom(document.body, el, binding)
          } else {
            el.originalPosition = getStyle(el, 'position')
            insertDom(el, el, binding)
          }
        }
      })
    } else {
      afterLeave(el.instance, _ => {
        if (!el.instance.hiding) return
        el.domVisible = false
        const target = binding.modifiers.fullscreen || binding.modifiers.body
          ? document.body
          : el
        removeClass(target, 'relative')
        removeClass(target, 'overflow-hidden')
        el.instance.hiding = false
      }, 300, true)
      el.instance.visible = false
      el.instance.hiding = true
    }
  }
  const insertDom = (parent, el, binding) => {
    if (!el.domVisible && getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.loadingStyle).forEach(property => {
        el.loading.style[property] = el.loadingStyle[property]
      })

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(parent, 'relative')
      }
      if (binding.modifiers.fullscreen && binding.modifiers.lock) {
        addClass(parent, 'overflow-hidden')
      }
      el.domVisible = true

      parent.appendChild(el.loading)
      Vue.nextTick(() => {
        if (el.instance.hiding) {
          el.instance.$emit('after-leave')
        } else {
          el.instance.visible = true
        }
      })
      el.domInserted = true
    } else if (el.domVisible && el.instance.hiding === true) {
      el.instance.visible = true
      el.instance.hiding = false
    }
  }

  Vue.directive('loading', {
    bind: function(el, binding, vnode) {
      const textExr = el.getAttribute('loading-text')
      const spinnerExr = el.getAttribute('loading-spinner')
      const backgroundExr = el.getAttribute('loading-background')
      const customClassExr = el.getAttribute('loading-custom-class')
      const vm = vnode.context
      const loading = new LoadingConstructor({
        el: document.createElement('div'),
        data: {
          text: vm && vm[textExr] || textExr,
          spinner: vm && vm[spinnerExr] || spinnerExr,
          background: vm && vm[backgroundExr] || backgroundExr,
          customClass: vm && vm[customClassExr] || customClassExr,
          fullscreen: !!binding.modifiers.fullscreen
        }
      })
      el.instance = loading
      el.loading = loading.$el
      el.loadingStyle = {}

      binding.value && toggleLoading(el, binding)
    },

    update: function(el, binding) {
      el.instance.setText(el.getAttribute('element-loading-text'))
      if (binding.oldValue !== binding.value) {
        toggleLoading(el, binding)
      }
    },

    unbind: function(el, binding) {
      if (el.domInserted) {
        el.loading &&
        el.loading.parentNode &&
        el.loading.parentNode.removeChild(el.loading)
        toggleLoading(el, { value: false, modifiers: binding.modifiers })
      }
      el.instance && el.instance.$destroy()
    }
  })
}

export default loadingDirective
