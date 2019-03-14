import Vue from 'vue'
import Router from 'vue-router'
import iview from 'iview'

import routes from './routes'
import { getToken, setToken} from '@/utils/userToken.js'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

const LOGIN_PAGE_NAME = 'login'

/**
 * @description 导航钩子，路由发生改变时，会触发
 */

router.beforeEach((to, access, next) => {
  iview.LoadingBar.start()
  const { token } = getToken()
  /**
   * @unLogin 未登录，且要跳转的页面不是登录页面，next({ name: 'login' })
   * @logined 已登录，且要跳转的页面是登录页面，next({ name: 'home' }),跳转到首页
   */
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    next({
      name: LOGIN_PAGE_NAME
    })
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    next({
      name: '_home'
    })
  } else {
    next()
  }
})


router.afterEach(to => {
  iview.LoadingBar.finish()
  window.scrollTo(0, 0) // scrollTo() 方法可把内容滚动到指定的坐标
})

export default router
