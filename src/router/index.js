import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'

Vue.use(VueRouter)
// const VueRouterPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push (to) {
//   return VueRouterPush.call(this, to).catch(err => err)
// }


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savdPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async(to, from, next) => {
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    let agree = ['/login','/register','/home','/search']
    if(token){
      if(to.path=='/login' || to.path=='/register'){
        next('/home')
      }else{
        if(name){
          next();
        }else{
          //派发用户信息到仓库
          try{
            await store.dispatch('user/getUserInfo')
            next()
          }catch(error){
            await store.dispatch('user/userLogout')
            next('/login')
          }
        }
      }
    }else{
      // 未登录
      if(agree.indexOf(to.path)==-1){
        alert("请登录")
        next('/login')
      }else{
        next()
      }
    }

})

export default router
