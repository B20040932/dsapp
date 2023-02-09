import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/api/mock'
import 'swiper/css/swiper.css'
import '@/plugins/validate'

import {Button,Message,MessageBox} from 'element-ui'
import VueLazyload from 'vue-lazyload'
const loadimage = require('@/assets/images/1.jpg')

Vue.config.productionTip = false
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: loadimage
})
Vue.component(Button.name,Button)
Vue.component(MessageBox.name,MessageBox)
Vue.prototype.$msgbox = MessageBox


new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  },
  render: h => h(App)
}).$mount('#app')
