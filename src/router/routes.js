import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'

export default [
    {
      path:'',
      redirect:'/home',
      component:Home,
      meta:{show:true}
    },
    {
      path:'/home',
      name:'home',
      component:Home,
      meta:{show:true}
    },
    {
      path:'/search/:keyword?',
      name:'search',
      component:Search,
      meta:{show:true}
    },
    {
      path:'/login',
      name:'login',
      component:Login,
      meta:{show:false}
  
    },
    {
      path:'/register',
      name:'register',
      component:Register,
      meta:{show:false}
    },
    {
      path:'/detail/:goodId',
      name:'detail',
      component:Detail,
      meta:{show:true}
    },
  ]