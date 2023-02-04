import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/api/mock'
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
// import {reqCategoryList} from '@/api/index'
// reqCategoryList();

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
