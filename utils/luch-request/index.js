import Request from './request'

const http = new Request()

http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = 'http://chat.bo5.xyz' /* 服务 */
	// config.baseUrl = uni.getStorageSync('URL') /* 本地 */
	config.header = {
		...config.header,
	}
	config.custom = {
		auth: true
	}
	return config
})

/**
 * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
 * @param { Number } statusCode - 请求响应体statusCode（只读）
 * @return { Boolean } 如果为true,则 resolve, 否则 reject
 */
http.validateStatus = (statusCode) => {
	return statusCode === 200
}

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	config.header = {
		...config.header,
	}
	if (config.custom.auth) {
		// 添加token
		let Authorization = uni.getStorageSync('Authorization');
		config.params.Authorization = Authorization;
		if (!Authorization) { // 如果token不存在，调用cancel 会取消本次请求，但是该函数的catch() 仍会执行
			cancel('token 不存在') // 接收一个参数，会传给catch((err) => {}) err.errMsg === 'token 不存在'
		}
	} else {
		// 不需要token
	}

	return config
})

http.interceptor.response((response) => { /* 请求之后拦截器 */

	if (response.statusCode == 401) {
		// token过期，进行刷新token
		// response = await 
	}
	// if (response.data.code == -3) {
	// 	//  刷新token
	// 	// 提示其他
	// }
	// return Promise.reject(response)
	// if (response.statusCode !== 200) { // 服务端返回的状态码不等于200，则reject()

	// }
	// if (response.config.custom.verification) { // 演示自定义参数的作用
	//   return response.data
	// }
	return response.data
}, (response) => { // 请求错误做点什么
	if (response.statusCode == 400 || response.statusCode == 401) {
		// token不存在，跳转登录
		uni.showToast({
			title: '请重新登录!',
			duration: 2000
		});
		setTimeout(function() {
			uni.removeStorageSync('UID');
			uni.reLaunch({
				url: '/pages/login/login?backtype=1',
			});
		}, 1000);
		return
	}
	if (response.statusCode == 500) {
		uni.showToast({
			title: '网络错误，请稍后再试!',
			duration: 2000
		});
		return
	}
	return response
})

export {
	http
}
