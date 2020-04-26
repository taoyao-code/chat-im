<template>
	<view class="page login">
		<view class="l-wrap">
			<view class="w-title"><text>注册</text></view>
			<view class="w-form">
				<view class="f-input">
					<view class="i-item"><input type="text" placeholder="请输入手机号" v-model="phone" /></view>
					<view class="i-item"><input type="password" placeholder="请输入密码" v-model="password" /></view>
					<view class="i-item">
						<input type="text" placeholder="请输入验证码" v-model="code" />
						<image :src="ico" mode="" @tap="initCaptcha" class="btn captcha"></image>
					</view>
				</view>
				<view class="f-btn"><text @tap="register">注册</text></view>
			</view>
		</view>
	</view>
</template>
<script>
import service from '../../service.js';
import mInput from '../../components/m-input.vue';
import { validate } from '../../utils/validate';
export default {
	components: {
		mInput
	},
	data() {
		return {
			account: '',
			password: '',
			phone: '',
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
				.post(
					'/index/getCaptcha',
					{},
					{
						custom: { auth: false }
					}
				)
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
			if (!this.phone.length) {
				uni.showToast({
					icon: 'none',
					title: '手机号必须'
				});
				return;
			}
			if (!validate.isMobile(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号格式不对'
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
				.post(
					'/index/user/register',
					{ mobile: this.phone, passwd: this.password, uuid: this.id, code: this.code },
					{
						custom: { auth: false }
					}
				)
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
						// 重新加载验证码
						this.initCaptcha();
					}
				})
				.catch(err => {});
		}
	}
};
</script>
<style lang="less">
@import './reg';
.captcha {
	// background-color: #e9f7f7!important;
	height: 65upx;
	width: 200upx;
}
</style>
