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

  if (to.matched.some(res => res.name.startsWith('admin'))) {
    const whiteList = ['admin.login']
    if (store.getters['admin/token']) {
      if (to.path === '/admin/login') {
        next({ name: 'admin.dashboard', replace: true })
      } else {
        // 请求带有 redirect 重定向时，登录自动重定向到该地址
        const redirect = decodeURIComponent(from.query.redirect || to.path)
        if (to.path === redirect) {
          next()
        } else {
          // 跳转到目的路由
          next({ path: redirect })
        }
      }
    } else {
      if (whiteList.includes(to.name)) {
        next()
      } else {
        next({ name: 'admin.login', replace: true })
        NProgress.done()
      }
    }
  }

  next()
}

function after() {
  NProgress.done()
}
