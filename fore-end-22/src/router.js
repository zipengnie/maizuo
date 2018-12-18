// 路由相关的代码
import VueRouter from 'vue-router'
// import和require一样，第一次加载vue模块时，会缓存该模块，以后再加载该模块，就直接从缓存取出该模块 ，这里引入的其实是main.js引入vue模块的缓存，并不是真正又引入了一次vue组件，因为main.js是第一次引入的)
import Vue from 'vue'
// // 引入进度条效果
// import NProgress from 'nprogress'
// 按需引入mint-ui里面的进度条组件
import { Indicator } from 'mint-ui'
// 引入进度条效果css
import 'nprogress/nprogress.css'
// // 引入home组件
// import Home from './views/Home.vue'
// 引入电影首页（单页面组件）组件
// import Films from './views/Films.vue'
// // 引入影院首页（单页面组件）组件
// import Cinema from './views/Cinema.vue'
// // 引入城市首页（单页面组件）组件
// import City from './views/City.vue'
// // 引入个人中心首页（单页面组件）组件
// import Center from './views/Center.vue'
// // 引入登录组件
// import Login from './views/Login.vue'
// // 引入购物车组件
// import Card from './views/Card.vue'

// // 引入影片详情页组件
// import FilmDetail from './views/filmDetail.vue'

// // 引入正在上映影片组件
// import NowPlay from './components/NowPlay/index.vue'
// // 引入正在上映影片组件
// import SoonPlay from './components/SoonPlay/index.vue'

// 插件安装
Vue.use(VueRouter)
// 按需引入Mint ui里面的进度条组件
Vue.use(Indicator)
var router = new VueRouter({
  routes: [
    {
      path: '/',
      // component: Home,
      // 路由懒加载
      component: () => import('./views/Home.vue'),
      children: [
        {
          path: '',
          redirect: '/films/nowPlaying'
        },
        {
          // 电影首页
          path: 'films',
          // name: 'films',
          // component: Films,
          // 路由懒加载
          component: () => import('./views/Films.vue'),
          children: [
            {
              // 正在上映
              path: 'nowPlaying',
              name: 'nowPlaying',
              // component: NowPlay
              // 路由懒加载
              component: () => import('./components/NowPlay/index.vue')
            },
            {
              // 即将上映
              path: 'soonPlaying',
              name: 'soonPlaying',
              // component: SoonPlay
              // 路由懒加载
              component: () => import('./components/SoonPlay/index.vue')
            }
          ]
        },
        // 影院首页
        {
          path: '/cinema',
          name: 'cinema',
          // component: Cinema
          // 路由懒加载
          component: () =>
            import('./views/Cinema.vue')
        },
        // 个人中心首页
        {
          path: '/center',
          name: 'center',
          // component: Center
          // 路由懒加载
          component: () => import('./views/Center.vue')
        }
      ]
    },
    // 影片详情页
    {
      path: '/film/:filmId',
      name: 'filmDetail',
      // component: FilmDetail,
      // 路由懒加载
      component: () =>
        import('./views/filmDetail.vue'),
      beforeEnter (to, from, next) {
        console.log('路由独享守卫')
        next()
      }
    },
    // 用户
    {
      path: '/user',
      component: {
        template: `
      <div>
      <router-view></router-view>
      </div>
  `
      },
      children: [{
        path: 'card',
        // component: Card,
        component: () => import(/* webpackChunkName: "card" */ './views/Card.vue'),
        beforeEnter (to, from, next) {
        // 用没有登录
          if (localStorage.getItem('userName')) {
            next()
          } else {
            // 注意，如果需要实现，拦截到登陆页面之后，登录成功回跳到那个页面。
            // localStorage.setItem('myNeedPage', '/user/card');
            // next('/user/login');
            console.log(to.fullPath)
            next({
              path: '/user/login',
              query: {
                redirect: to.fullPath
              }
            })
          }
        }
      },
      {
        path: 'login',
        // component: Login
        component: () => import('./views/Login.vue')
      }
      ]
    },
    { // 默认路径
      path: '*',
      redirect: '/films/NowPlaying'
    }
    //  // 城市首页
    //  {
    //   path: '/city',
    //   name: 'city',
    //   // component: Cinema
    //   // 路由懒加载
    //   component: () => import('./views/City.vue')
    // },
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // NProgress.start()
  Indicator.open('加载中...')
  // 判断当前要去的路由是不是卖座卡或者余额或者设置  这样在全局里面是没有问题，只是要做判断
  // if (to.name === 'card' || to.name === 'yue' || to.name === 'set') {
  //   // 如果当前用户有登录，就可以去
  //   next();
  //   // 如果没有，就让去登陆页面
  //   next('/user/login')
  // }
  // console.log(from)
  // console.log(to)
  next()
  // console.log(to)
})

// 全局后置守卫
router.afterEach((to, from) => {
  // NProgress.done()
  Indicator.close()
  // console.log(from)
  // console.log(to)
})
export default router
