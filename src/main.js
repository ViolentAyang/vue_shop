import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入axios 基于nodejs和promise的http客户端
import axios from 'axios'
//配置请求根路径 根路径即接口基准地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//挂载原型属性 
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
