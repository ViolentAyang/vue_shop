import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入树状表格
import TreeTable from 'vue-table-with-tree-grid'
//导入axios 基于nodejs和promise的http客户端
import axios from 'axios'
//配置请求根路径 根路径即接口基准地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
//设置一个请求拦截器
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //在最后必须return config
  return config
})
//挂载原型属性 
Vue.prototype.$http = axios

Vue.config.productionTip = false

Vue.component('tree-table',TreeTable)

//定义一个全局过滤器
Vue.filter('dateFormat',function(originVal){
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 +'').padStart(2,'0')
  const d = (dt.getDate() +'').padStart(2,'0')
  const hh = (dt.getHours() + '').padStart(2,'0')
  const mm = (dt.getMinutes() + '').padStart(2,'0')
  const ss = (dt.getSeconds() + '').padStart(2,'0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
