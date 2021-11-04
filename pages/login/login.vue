<template>
	<view class="">
		<view class="page login">
			<view class="l-wrap">
				<view class="w-title"><text>账号密码登录</text></view>
				<view class="w-form">
					<view class="f-input">
						<view class="i-item"><input type="text" placeholder="请输入手机号" v-model="account" /></view>
						<view class="i-item"><input type="password" placeholder="请输入密码" v-model="password" /></view>
					</view>
					<view class="f-btn" @tap="bindLogin"><text>登录</text></view>
				</view>
				<view class="w-service">
					<text @tap="reg">注册账号</text>
					<!-- <text @tap="smslogin">
					《短信登录》
				</text> -->
				</view>
				<view class="w-third">
					<view class="t-title"><text>第三方账号登录：</text></view>
					<view class="t-entry">
						<view class="e-item">
							<!-- <text class="cuIcon-weibo text-red"></text> -->
							<text class="iconfont" style="color:#FF8200;">&#xe61b;</text>
						</view>
						<view class="e-item">
							<!-- <text class="cuIcon-weixin text-red"></text> -->
							<text class="iconfont" style="color:#07c160;">&#xe7e5;</text>
							<button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doWeixinLogin"></button>
						</view>
						<!-- <text class="cuIcon-wenzi text-red"></text> -->
						<view class="e-item"><text class="iconfont" style="color:#007fff;">&#xe64b;</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			providerList: [],
			hasProvider: false,
			account: '',
			password: '',
			positionTop: 0
		};
	},
	onLoad(option) {
		let that = this;
		if (option.backtype == 1) {
			// 关闭ws重连
			this.$store.state.webSocketIsReconnect = false;
			setTimeout(function() {
				// 开启
				that.$store.state.webSocketIsReconnect = true;
			}, 2000);
		}
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
			let timer = null;
			this.time = 60;
			timer = setInterval(() => {
				if (this.time === 0 && this.timer) {
					this.time = 60;
					timer = null;
					return;
				}
				this.time = this.time - 1;
			}, 1000);
		},
		bindLogin() {
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
			const data = {
				account: this.account,
				password: this.password
			};
			this.$http
				.post(
					'/index/user/login',
					{
						mobile: this.account,
						passwd: this.password
					},
					{
						custom: { auth: false }
					}
				)
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
						// 请求中Authorization的Token信息
						uni.setStorageSync('Authorization', res.msg);

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
							url: '../index/index'
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
		},
		smslogin() {
			uni.navigateTo({
				url: '../smslogin/smslogin'
			});
		}
	},
	onReady() {
		this.initPosition();
	}
};
</script>

<style lang="less">
@import './login';
</style>
