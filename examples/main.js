import Vue from 'vue'
import App from './App.vue'
import ZkjUI from '../src/index.js'
import '../src/styles/index.scss'

Vue.use(ZkjUI)


new Vue({
  render: h => h(App)
}).$mount('#app')