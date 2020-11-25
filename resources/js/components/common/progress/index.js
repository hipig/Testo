import Progress from './src/Progress'

Progress.install = function(Vue) {
  Vue.component(Progress.name, Progress)
}

export default Progress
