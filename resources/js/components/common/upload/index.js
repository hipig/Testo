import Upload from './src/index'

Upload.install = function(Vue) {
  Vue.component(Upload.name, Upload)
}

export default Upload
