import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css' //elementUI样式
import '@/assets/style/index.scss' // 全局css
import './plugins/element.js' //elementUI组件按需引入

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
