import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false


import basics from './pages/basics/home.vue'
Vue.component('basics', basics)

import components from './pages/component/home.vue'
Vue.component('components', components)

import mine from './pages/mine/home.vue'
Vue.component('mine', mine)

import auth from './pages/auth/auth.vue'
Vue.component('auth', auth)

import plugin from './pages/plugin/home.vue'
Vue.component('plugin', plugin)
// cu-custom 组件
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

// 聊天
import store from "./common/chat/store.js";
Vue.prototype.$store = store;
// 请求
import {
	http
} from "utils/luch-request/index.js"
Vue.prototype.$http = http;

//自定义事件引入


App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
