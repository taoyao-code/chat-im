import Vue from 'vue'
import App from './App'

import {http} from "utils/luch-request/index.js"
Vue.prototype.$http = http;


//聊天测试
import store from "./common/chat/store.js";
Vue.prototype.$store = store;
//聊天测试结束

//自定义事件引入
import event from './common/uni-app-customEvent/custom-event.js'
const Event = new event();
Vue.prototype.$event = Event;



Vue.config.productionTip = false;
// backpage : 登录后返回的页面
// backtype : 打开页面的类型[1 : redirectTo 2 : switchTab]
Vue.prototype.checkLogin = function(backpage, backtype) {
	var UID = uni.getStorageSync('UID');
	var TOKEN = uni.getStorageSync('Token');
	if (UID == '' || TOKEN == '') {
		uni.redirectTo({
			url: './pages/login/login?backpage=' + backpage + '&backtype=' + backtype
		});
		return false;
	}
	return [UID, TOKEN];
}




App.mpType = 'app'

const app = new Vue({
	...App,
	store,
})
app.$mount()
