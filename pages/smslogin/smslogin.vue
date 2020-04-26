<template>
	<view class="page login">
		<view class="l-wrap">
			<view class="w-title"><text>短信登录</text></view>
			<view class="w-form">
				<view class="f-input">
					<view class="i-item"><input type="text" placeholder="请输入手机号" v-model="phone" /></view>
					<view class="i-item">
						<input type="password" placeholder="请输入验证码" />
						<text class="btn btn-disable" v-if="time">{{ time }}S后重发</text>
						<text class="btn" v-else @tap="sendCode">获取验证码</text>
					</view>
				</view>
				<view class="f-btn"><text @tap="bindLogin">登录</text></view>
			</view>
			<view class="w-service">
				<text @tap="reg">
					注册账号
				</text>
			</view>
		</view>
	</view>
</template>

<script>
import service from '../../service.js';
import { mapState, mapMutations } from 'vuex';
import mInput from '../../components/m-input.vue';
import { validate } from '../../utils/validate';

export default {
	components: {
		mInput
	},
	data() {
		return {
			time: 0,
			providerList: [],
			hasProvider: false,
			phone: '',
			password: '',
			positionTop: 0
		};
	},
	methods: {
		initPosition() {
			/**
			 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
			 * 反向使用 top 进行定位，可以避免此问题。
			 */
			this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
		},
		sendCode() {
			if (!this.phone) {
				uni.showToast({
					icon: 'none',
					title: '手机号不能为空！'
				});
				return;
			}
			if (!validate.isMobile(this.phone)) {
				uni.showToast({
					icon: 'none',
					title: '手机号格式错误！'
				});
				return;
			}
			let timer = null;
			this.time = 60;
			timer = setInterval(() => {
				if (this.time === 0 || this.timer) {
					this.time = 0;
					clearInterval(timer);
					timer = null;
					return;
				}
				this.time = this.time - 1;
			}, 1000);
		},
		bindLogin() {
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
			/**
			 * 下面简单模拟下服务端的处理
			 * 检测用户账号密码是否在已注册的用户列表中
			 * 实际开发中，使用 uni.request 将账号信息发送至服务端，客户端在回调函数中获取结果信息。
			 */
			const data = {
				account: this.account,
				password: this.password
			};
			this.$http
				.post('/user/login', {
					mobile: this.account,
					passwd: this.password
				})
				.then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
						let uid = res.data.id;
						let token = res.data.token;
						uni.setStorageSync('UID', uid + '');
						uni.setStorageSync('Token', token);
						uni.setStorageSync('nickname', res.data.nickname);
						uni.setStorageSync('mobile', res.data.mobile);

						var avatar = res.data.avatar ? res.data.avatar : 'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png';
						if (avatar.substring(0, 4) == 'http') {
							uni.setStorageSync('avatar', avatar);
						} else {
							uni.setStorageSync('avatar', uni.getStorageSync('URL') + avatar);
						}
						this.$store.commit('setUid', uid);
						this.$store.commit('setSid', token);
						this.$store.commit('setUrl', uni.getStorageSync('WS') + '/chat?id=' + uid + '&token=' + token);
						this.$store.dispatch('webSocketInit'); // 初始化ws
						uni.reLaunch({
							url: '../tabbar/contact/contact'
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
		},
		reg() {
			uni.navigateTo({
				url: '../reg/reg'
			});
		}
	},
	onReady() {
		this.initPosition();
	}
};
</script>

<style lang="less">
@import './smslogin';
</style>
