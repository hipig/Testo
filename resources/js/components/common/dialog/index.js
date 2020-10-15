import Dialog from "./src/dialog"

Dialog.install = function(Vue) {
  Vue.property.$Dialog = Dialog
}

export default Dialog
