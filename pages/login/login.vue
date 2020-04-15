<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<m-input class="m-input" type="text" clearable focus v-model="account" placeholder="请输入账号"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="bindLogin">登录</button></view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<!-- <text>|</text> -->
			<!-- <navigator url="../pwd/pwd">忘记密码</navigator> -->
		</view>
	</view>
</template>

<script>
import service from '../../service.js';
import { mapState, mapMutations } from 'vuex';
import mInput from '../../components/m-input.vue';

export default {
	components: {
		mInput
	},
	data() {
		return {
			providerList: [],
			hasProvider: false,
			account: '',
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
			uni.request({
				url: uni.getStorageSync('URL') + '/user/login',
				method: 'POST',
				data: {
					mobile: this.account,
					passwd: this.password
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					console.log(res.data.data.token);

					if (res.data.code == 0) {
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
						let uid = res.data.data.id;
						let token = res.data.data.token;
						uni.setStorageSync('UID', uid + '');
						uni.setStorageSync('Token', token);
						uni.setStorageSync('nickname', res.data.data.nickname);
						uni.setStorageSync('mobile', res.data.data.mobile);
						uni.setStorageSync(
							'avatar',
							res.data.data.avatar ? uni.getStorageSync('URL') + res.data.data.avatar : 'https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png'
						);
						this.$store.commit('setUid', uid);
						this.$store.commit('setSid', token);
						this.$store.commit('setUrl', uni.getStorageSync('WS') + '/chat?id=' + uid + '&token=' + token);
						this.$store.dispatch('webSocketInit'); // 初始化ws
						uni.reLaunch({
							url: '../tabbar/tabbar-1/tabbar-1'
						});
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
							duration: 2000
						});
					}
				},
				fail: () => {
					uni.showToast({
						title: '错误',
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	},
	onReady() {
		this.initPosition();
	}
};
</script>

<style>
.action-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.action-row navigator {
	color: #007aff;
	padding: 0 20upx;
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
	width: 100upx;
	height: 100upx;
	border: 1upx solid #dddddd;
	border-radius: 100upx;
	margin: 0 40upx;
	background-color: #ffffff;
}

.oauth-image image {
	width: 60upx;
	height: 60upx;
	margin: 20upx;
}
</style>
