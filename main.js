import App from './App'
import Vue from 'vue'
import store from './store'
import Json from './Json' //测试用数据
// main.js
import uView from "uview-ui";
Vue.config.productionTip = false
App.mpType = 'app'
import {
	router,
	RouterMount
} from './router.js' //路径换成自己的

Vue.prototype.$store = store
Vue.prototype.$json = Json
Vue.use(router)
Vue.use(uView)
const app = new Vue({
    ...App
})

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif