import Vue from 'vue'
import DialogVue from './Dialog.vue'

const DialogConstructor = Vue.extend(DialogVue)

let currentModal
let instance
let modalQueue = []

const dialogType = ['info', 'success', 'warning', 'error']
const defaults = {
  title: '',
  content: '',
  type: ''
}

const defultCallback = action => {
  if (currentModal) {
    const callback = currentModal.callback
    if (typeof callback === 'function') {
      if (instance.showInput) {
        callback(instance.inputValue, action)
      } else {
        callback(action)
      }
    }

    if (currentModal.resolve) {
      const type = currentModal.options.type
      if (type === 'confirm' || type === 'prompt') {
        if (action === 'confirm') {
          if (instance.showInput) {
            currentModal.resolve({ value: instance.inputValue, action })
          } else {
            currentModal.resolve(action)
          }
        } else if (action === 'cancel' && currentModal.reject) {
          currentModal.reject(action)
        }
      } else {
        currentModal.resolve(action)
      }
    }
  }
}

const initInstance = () => {
  instance = new DialogConstructor({
    el: document.createElement('div')
  })

  instance.callback = defultCallback
}

const showNextModal = () => {
  /**
   * TODO: 给每个框添加 fid ，避免不停的新建对话框
   */
  // if (!instance) {
  //   initInstance()
  // }
  initInstance()
  instance.action = ''

  if (!instance.visible && modalQueue.length) {
    currentModal = modalQueue.shift()

    const options = currentModal.options
    for (const prop in options) {
      if (Object.prototype.hasOwnProperty.call(options, prop)) {
        instance[prop] = options[prop]
      }
    }

    if (typeof options.callback !== 'function') {
      instance.callback = defultCallback
    }

    const oldCallback = instance.callback
    instance.callback = (action, instance) => {
      oldCallback(action, instance)
      showNextModal()
    }

    document.body.appendChild(instance.$el)

    Vue.nextTick(() => {
      instance.visible = true
    })
  }
}

const Dialog = (options, callback) => {
  if (Vue.prototype.$isServer) return
  if (options.callback && !callback) {
    callback = options.callback
  }

  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      modalQueue.push({
        options: Object.assign({}, defaults, options),
        callback,
        resolve,
        reject
      })

      showNextModal()
    })
  }

  modalQueue.push({
    options: Object.assign({}, defaults, options),
    callback
  })

  showNextModal()
}

Dialog.close = () => {
  instance.visible = false
  modalQueue = []
  currentModal = null
}

/**
 * Such like window.alert
 */
Dialog.alert = (content, title, options) => {
  if (typeof content === 'object') {
    options = content
    content = options.content
    title = options.title || ''
  }

  return Dialog(Object.assign({
    title,
    content,
    type: 'alert',
    maskClosable: false,
    showCancelButton: false,
    showClose: false
  }, options))
}

/**
 * Such like window.confirm
 */
Dialog.confirm = (content, title, options) => {
  if (typeof content === 'object') {
    options = content
    content = options.content
    title = options.title || ''
  }

  return Dialog(Object.assign({
    title,
    content,
    type: 'confirm'
  }, options))
}

/**
 * Such like window.prompt
 */
Dialog.prompt = (content, title, options) => {
  if (typeof content === 'object') {
    options = content
    content = options.content
    title = options.title || ''
  }

  return Dialog(Object.assign({
    title,
    content,
    type: 'prompt',
    showInput: true
  }, options))
}

dialogType.forEach(type => {
  const statusTitles = {
    'info': '信息',
    'success': '成功',
    'warning': '警告',
    'error': '错误'
  }
  return (content, title, options) => {
    if (typeof content === 'object') {
      options = content
      content = options.content
      title = options.title
    }
    title = title || statusTitles[type]

    return Dialog(Object.assign({
      title,
      content,
      type,
      maskClosable: false,
      showCancelButton: false,
      showClose: false
    }, options))
  }
})

export default Dialog
