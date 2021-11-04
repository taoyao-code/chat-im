<template name="mine">
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<view class="cu-avatar xl round bg-gray"><avatar selWidth="200px" selHeight="200px" @upload="updateAvatar" :avatarSrc="userInfo.avatar"></avatar></view>
				<!-- <image src="/static/logo.png" class="png" mode="widthFix"></image> -->
				<view class="text-xl">
					{{ userInfo.nickname }}
					<!-- <text class="text-df">v2.0</text> -->
				</view>
				<view class="margin-top-sm"><text>账号:{{ userInfo.id }}</text></view>
				<image src="../../static/wave.gif" mode="scaleToFill" class="gif-wave"></image>
			</view>
			<view class="padding flex text-center text-grey bg-white shadow-warp">
				<!-- <view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-orange">{{ visitTotal }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-attentionfill"></text>
						View
					</view>
				</view>
				<view class="flex flex-sub flex-direction solid-right">
					<view class="text-xxl text-blue">{{ starCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-favorfill"></text>
						Star
					</view>
				</view>
				<view class="flex flex-sub flex-direction">
					<view class="text-xxl text-green">{{ forksCount }}</view>
					<view class="margin-top-sm">
						<text class="cuIcon-fork"></text>
						Fork
					</view>
				</view> -->
			</view>
			<view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
				<view class="cu-item arrow">
					<view class="content" @tap="addfriend">
						<text class="cuIcon-friendaddfill text-grey"></text>
						<text class="text-grey">添加好友/群</text>
					</view>
				</view>
	<!-- 			<view class="cu-item arrow">
					<view class="content" bindtap="showQrcode" @tap="addGroup">
						<text class="cuIcon-friendaddfill text-red"></text>
						<text class="text-grey">加入群聊</text>
					</view>
				</view> -->
				<view class="cu-item arrow">
					<view class="content" @tap="createGroup">
						<text class="cuIcon-group text-cyan"></text>
						<text class="text-grey">创建群聊</text>
					</view>
				</view>
				<!-- <view class="cu-item arrow">
					<navigator class="content" url="/pages/about/test/list" hover-class="none">
						<text class="cuIcon-creativefill text-orange"></text>
						<text class="text-grey">Bug测试</text>
					</navigator>
				</view> -->
				<view class="cu-item arrow" @tap="systemSettings">
					<navigator class="content" url="/pages/about/about/about" hover-class="none">
						<text class="cuIcon-settings text-cyan"></text>
						<text class="text-grey">系统设置</text>
					</navigator>
				</view>
				<view class="cu-item arrow">
					<navigator class="content" url="/pages/about/log/log" hover-class="none" @tap="userOut">
						<text class="cuIcon-roundclose text-red"></text>
						<text class="text-grey">退出登录</text>
					</navigator>
				</view>
			</view>
			<view class="cu-tabbar-height"></view>
		</scroll-view>
	</view>
</template>

<script>
import avatar from '@/components/yq-avatar/yq-avatar.vue';

export default {
	name:'mine',
	components: {
		avatar
	},
	data() {
		return {
			userInfo: {
				id: 0,
				username: '',
				nickname: '',
				avatar: '/static/logo.png'
			},
			reload: false,
			starCount: 0,
			forksCount: 0,
			visitTotal: 0
		};
	},
	mounted(){
		this.userInfo.id = uni.getStorageSync('UID');
		this.userInfo.username = uni.getStorageSync('mobile');
		this.userInfo.nickname = uni.getStorageSync('nickname');
		this.userInfo.avatar = uni.getStorageSync('avatar');
	},
	methods: {
		updateAvatar(res) {
			// 上传头像
			let self = this;
			this.userInfo.avatar = res.path;
			uni.uploadFile({
				url: uni.getStorageSync('URL') + '/attach/upload',
				filePath: res.path,
				name: 'file',
				count: 1,
				sizeType: ['compressed'],
				success: r => {
					let ret = JSON.parse(r.data);
					if (ret.code == 0) {
						self.updateUser(ret.data);
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		addfriend() {
			// 添加好友
			uni.navigateTo({
				url: '../basics/addBuddy'
			});
		},
		createGroup() {
			// 创建群组
			uni.navigateTo({
				url: '../group/createGroup'
			});
		},
		addGroup() {
			uni.navigateTo({
				url: '../basics/addBuddy'
			});
		},
		userOut() {
			let msg = {
				userid: uni.getStorageSync('UID'),
				cmd: 1
			};
			this.$store.commit('webSocketSend', msg);
			uni.removeStorageSync('UID');
			// 账号退出
			uni.reLaunch({
				url: '../login/login'
			});
		},
		updateUser(url) {
			this.$http
				.post('/user/updateUser', { userid: uni.getStorageSync('UID'), avatar: url })
				.then(res => {
					if (res.code == 0) {
						if (url.substring(0, 4) == 'http') {
							uni.setStorageSync('avatar', url);
						} else {
							uni.setStorageSync('avatar', uni.getStorageSync('URL') + url);
						}
					} else {
						uni.showToast({
							title: res.msg,
							duration: 2000
						});
					}
				})
				.catch(err => {});
		},
		systemSettings() {
			// 系统设置
			let that = this;
			uni.navigateTo({
				url: '../../../setting/setting'
			});
		}
	}
};
</script>

<style>
.UCenter-bg {
	background-image: url(../../static/index.jpg);
	background-size: cover;
	height: 550rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.UCenter-bg .gif-wave {
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	left: 0;
	z-index: 99;
	mix-blend-mode: screen;
	height: 100rpx;
}

map,
.mapBox {
	width: 750rpx;
	height: 300rpx;
}
</style>
