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
				<image :src="ico" mode="" @tap='initCaptcha' class="captcha"></image>
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
			uni.request({
				url: uni.getStorageSync('URL') + '/getCaptcha',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code == 200) {
						this.ico = res.data.data;
						this.id = res.data.id;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
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
			uni.request({
				url: uni.getStorageSync('URL') + '/user/register',
				method: 'POST',
				data: {
					mobile: this.account,
					passwd: this.password,
					uuid:this.id,
					code:this.code
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.code == 0) {
						uni.showToast({
							title: '注册成功',
							duration: 2000
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				}
			});
		}
	}
};
</script>

<style>
	.captcha{
		height: 100upx;
		width: 300upx;
	}
</style>
