<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">验证码：</text>
				<m-input type="Captcha" displayable v-model="code" placeholder="请输入验证码"></m-input>
				<image :src="ico" mode="" @tap="initCaptcha" class="captcha"></image>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="register">注册</button></view>
	</view>
</template>

<script>
import service from '../../service.js';
import mInput from '../../components/m-input.vue';

export default {
	components: {
		mInput
	},
	data() {
		return {
			account: '',
			password: '',
			ico: '',
			code: '',
			id: ''
		};
	},
	onLoad() {
		this.initCaptcha();
	},
	methods: {
		initCaptcha() {
			this.$http
				.post('/getCaptcha')
				.then(res => {
					if (res.code == 0) {
						this.ico = res.data;
						this.id = res.id;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
				.catch(err => {});
		},
		register() {
			/**
			 * 客户端对账号信息进行一些必要的校验。
			 * 实际开发中，根据业务需要进行处理，这里仅做示例。
			 */
			if (this.account.length < 1) {
				uni.showToast({
					icon: 'none',
					title: '账号最短为 1 个字符'
				});
				return;
			}
			if (this.password.length < 1) {
				uni.showToast({
					icon: 'none',
					title: '密码最短为 1 个字符'
				});
				return;
			}
			if (this.code.length < 1) {
				uni.showToast({
					icon: 'none',
					title: '验证码最短为 1 个字符'
				});
				return;
			}
			this.$http
				.post('/user/register', { mobile: this.account, passwd: this.password, uuid: this.id, code: this.code })
				.then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '注册成功',
							duration: 2000
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style>
page {
	min-height: 100%;
	display: flex;
	font-size: 16px;
}
/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	/* min-height: 100%; */
	display: flex;
	flex: 1;
}

.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #efeff4;
	padding: 10px;
}

.input-group {
	background-color: #ffffff;
	margin-top: 20px;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
	font-size: 18px;
	line-height: 40px;
}

.input-row .title {
	width: 72px;
	padding-left: 15px;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 8px;
	height: 1px;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 25px;
	padding: 10px;
}

button.primary {
	background-color: #0faeff;
}

.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.action-row navigator {
	color: #007aff;
	padding: 0 10px;
}

.oauth-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}

.oauth-image {
	position: relative;
	width: 50px;
	height: 50px;
	border: 1px solid #dddddd;
	border-radius: 50px;
	margin: 0 20px;
	background-color: #ffffff;
}

.oauth-image image {
	width: 30px;
	height: 30px;
	margin: 10px;
}

.oauth-image button {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.captcha {
	height: 100upx;
	width: 300upx;
}
</style>
