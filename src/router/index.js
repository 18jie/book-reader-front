import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Books from '@/views/Books'
import BookDetail from '@/views/BookDetail'
import Axios from 'axios'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    },
    {
      path: '/BookDetail',
      name: 'BookDetail',
      component: BookDetail
    }
  ],
})


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
