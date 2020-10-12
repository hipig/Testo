import Vue from 'vue'
import MessageVue from './Message.vue'

const MessageConstructor = Vue.extend(MessageVue)

const messageType = ['info', 'success', 'warning', 'error', 'loading']
const instances = []
let seed = 1
let zindexSeed = 1010

const Message = options => {
  if (Vue.prototype.$isServer) return
  options = options || {}

  if (typeof options === 'string') {
    options = {
      message: options
    }
  }

  const customCloseFunc = options.onClose
  const id = `message_${seed++}`

  options.onClose = () => {
    Message.close(id, customCloseFunc)
  }

  const instance = new MessageConstructor({
    data: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  instance.$el.style.zIndex = zindexSeed++

  let topDist  = options.top || 10
  instances.forEach(item => {
    topDist  += (item.$el.offsetHeight || 0) + 10
  })
  instance.top  = topDist

  instances.push(instance)

  // 返回关闭方法，用于手动消除
  return function () {
    instance.vm.close(id)
  }
}

Message.close = (id, customCloseFunc) => {
  const len = instances.length
  let index, removedHeight

  for (let i = 0; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof customCloseFunc === 'function') {
        customCloseFunc(instances[i])
      }
      index = i
      removedHeight = instances[i].$el.offsetHeight
      instances.splice(i, 1)
      break
    }
  }

  if (len > 1) {
    for (let i = index; i < len - 1; i++) {
      instances[i].$el.style.top = `${parseInt(instances[i].$el.style.top) - removedHeight - 10}px`
    }
  }
}

Message.closeAll = () => {
  instances.forEach((elem) => {
    elem.close()
  })
}

messageType.forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return Message(options)
  }
})

export default Message
