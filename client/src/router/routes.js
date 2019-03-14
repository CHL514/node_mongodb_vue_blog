
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: () => import('@/views/login/Login')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Home - 首页'
    },
    component: () => import('@/views/home/Home'),
  },
  {
    path: '/blog/:userId',
    name: 'blog',
    component: () => import('@/views/blog')
  },
  {
    path: '*',
    name: 'FourOhFour',
    meta: {
      title: '404 Not Found.'
    },
    component: () => import('@/views/404/FourOhFour')
  }
]