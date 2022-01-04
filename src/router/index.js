import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Cate from '../components/goods/Cate.vue'
import Params from '../components/goods/Params.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login'},
    { path: '/login', component: Login },
    { 
      path: '/home', 
      component: Home, 
      redirect: '/welcome',
      children: [
        { path: '/welcome',component: Welcome},
        { path: '/users',component: Users},
        { path: '/rights',component: Rights},
        { path: '/roles',component: Roles},
        { path: '/categories',component: Cate},
        { path: '/params',component: Params}
      ] 
    }
  ]
})
//挂载一个路由导航守卫
router.beforeEach((to, from, next) => {
  //to表示将要访问的路径
  //from代表从哪个路径跳转而来
  //next是一个函数表示放行
  //next() 放行        next('/login')强制跳转
  if(to.path == '/login') return next()
  //先获取token
  const tokenStr = window.sessionStorage.getItem('token')
  //没有token跳转到登录页
  if(!tokenStr) return next('/login')
  //有token放行，token真假以及时效性放在后端验证了
  next()
})
export default router
