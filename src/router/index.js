import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Books from '@/views/Books'
import BookDetail from '@/views/BookDetail'
import BookReader from '@/views/BookReader'
import Regster from '@/views/Regster'
import UserInfo from '@/views/UserInfo'

Vue.use(Router)

var router = new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Regster',
      name: 'Regster',
      component: Regster
    },
    {
      path: '/',
      name: 'Books',
      component: Books
    },
    {
      path: '/BookDetail',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/BookReader',
      name: 'BookReader',
      component: BookReader
    },
    {
      path: '/UserInfo',
      name: 'UserInfo',
      component: UserInfo
    }
  ],
})

export default router;

// 注册全局钩子用来拦截导航
// router.beforeEach((to, from, next) => {
//   var userId = sessionStorage.getItem("userId")
//   if (to.fullPath.contains('/auth')) { // 判断该路由是否需要登录权限
//     if (userId) { // 通过vuex state获取当前的token是否存在
//       next()
//     } else {
//       console.log('该页面需要登陆')
//       next({
//         path: '/login'
//         // query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//     }
//  } else {
//     next()
//   }
// })
