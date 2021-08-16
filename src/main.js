import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

//引入全局css文件
import './assets/css/base.css';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
