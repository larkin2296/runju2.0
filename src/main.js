import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import './styles/index.css'
import VueLazyload from 'vue-lazyload'
import store from './store/index'
import { Dialog } from 'vant';

Vue.use(Dialog);
Vue.use(VueLazyload)


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
