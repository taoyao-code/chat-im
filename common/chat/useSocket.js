import Vue from 'vue'
import socket from "./socket.js"; //引入socket.js 重要
import store from "@/common/chat/store.js";

const Socket = new socket({
	url: 'ws://192.168.31.161:8081/chat?id=1&token=D4BC3086FA34D621A916B18B0960B6CE', //连接地址 必填
	maxInterValCount: 5,
	interValTime: 2000,
	onOpen(res) {
		console.log('连接成功')
		let msg = {
			cmd:0
		};
		this.nsend(JSON.stringify(msg));
	},
	onClose(err) {
		console.log('关闭了连接')
		
	},
	onReload(res) {
		console.log('重载：' + res)
	},
	onRdFinsh(count) {
		console.log(count + '次重连已完成')
	},
	onMsg(msg) {
		const res = JSON.parse(msg.data);
		// 追加
		var obj = {};
		switch (res.cmd) {
			case 10:
				var key = "chartPage"; // 10 单聊 /key:响应界面
				break;
			default:
				break;
		}
		obj[key] = res;
		// end
		const keys = Object.keys(obj);
		const State = Object.assign({}, store.state.SocketState)
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			if (!State[key]) {
				State[key] = [];
			}
			State[key].push(obj[key])
		}
		store.commit('setSocketState', State)
	}
})
Vue.prototype.$Socket = Socket;