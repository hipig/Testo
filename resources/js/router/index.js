import Vue from 'vue'
import routes from './routes'
import Router from 'vue-router'
import store from '@/store'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false, speed: 350 })

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = createRouter()

router.beforeEach(before)
router.afterEach(after)

export default router

function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    routes
  })
}

function before(to, from, next) {
  NProgress.start()

  next()
}

function after() {
  NProgress.done()
}
