import Home from './views/frontpage/index.vue'
import List from './views/listpage/index.vue'
import Login from './views/loginpage/index.vue'
import User from './views/users/index.vue'
import Appoint from './views/appointpage/index.vue'
import Collect from './views/collectpage/index.vue'
import Host from './views/hostingpage/index.vue'
import Register from './views/registerpage/index.vue'
import Detail from './views/detailpage/index.vue'
import Map from './views/mappage/index.vue'
import Edit from './views/users/edit.vue'
import History from './views/history/index.vue'
import Maintenance from './views/maintenance/index.vue'
import About from './views/about/index.vue'
import Secondary from './views/secondary/index.vue'
import store from './store'
import { getToken } from '@/utils/auth' // 验权
import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)

const routes = [
    //......
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/appoint',
      name: 'appoint',
      component: Appoint
    },
    {
      path: '/collect',
      name: 'collect',
      component: Collect
    },
    {
      path: '/hosting',
      name: 'hosting',
      component: Host
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/history',
      name: 'history',
      component: History
    },
    {
      path: '/maintenance',
      name: 'maintenance',
      component:Maintenance
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/secondary',
      name: 'secondary',
      component: Secondary
    }
]
const router = new Router({
  mode: 'history',
  routes // short for `routes: routes`
})
const whiteList = ['/', '/list','/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  }else{
    var a = getToken()
    if (a != undefined) {
      //console.log(a)
      store.dispatch('GetInfo').then(res => { // 拉取用户信息
        if(res == 'error'){
          next({ path: '/login' })
        }else{
          next()
        }
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
        })
      })
    }else{
      next()
    }
  }
})
export default router
