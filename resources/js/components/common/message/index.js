import Message from './src/message'

Message.install = function(Vue) {
  Vue.component(Message.name, Message)
}

export default Message
