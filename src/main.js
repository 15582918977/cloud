import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//import '../public/rem';
import '../public/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI);

//事件总线
let EventBus = new Vue();

Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
