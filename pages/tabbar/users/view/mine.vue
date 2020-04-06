<template>
	<view>
		<uni-list>
			<uni-list-item :show-arrow="false">
				<!-- <text class="pg_list_cell_left">头像</text> -->
				<view class="headImage">
					<avatar
						selWidth="200px"
						selHeight="200px"
						@upload="updateAvatar"
						:avatarSrc="userInfo.avatar"
						avatarStyle="width: 50px;height: 50px;border-radius: 5px;"
					></avatar>
				</view>
			</uni-list-item>
			<uni-list-item title="" :show-arrow="true">
				<text class="pg_list_cell_left">昵称:{{ userInfo.nickname }}</text>
			</uni-list-item>
			<!-- <uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left">用户名:{{userInfo.username}}</text></uni-list-item> -->
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="addfriend">添加好友</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="addGroup">加入群组</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="createGroup">创建群组</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="systemSettings">系统设置</text></uni-list-item>
			<uni-list-item title="" :show-arrow="true"><text class="pg_list_cell_left" @tap="userOut">退出登录</text></uni-list-item>
			<!-- <view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="jumpToMyQrcodeCard">
			 	  <view class="uni-list-cell-navigate uni-navigate-right">
			 		  <text class="pg_list_cell_left">二维码名片</text>
					  <view class="pg_list_cell_right">
						  <image class="qrcode" src="/static/pg_def_qrcode.png"></image>
					  </view>
			 	  </view>
			  </view> -->
		</uni-list>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import avatar from '@/components/yq-avatar/yq-avatar.vue';

// user
// import UserApi from '@/pages/user/service/UserApi.js'
// import UserManager from '@/pages/user/logical/UserManager.js'
// import UserJumpHelper from '@/pages/user/helper/UserJumpHelper.js'

export default {
	components: {
		uniList,
		uniListItem,
		avatar
	},
	data() {
		return {
			userInfo: {
				username: '',
				nickname: '',
				avatar: ''
			},
			reload: false
		};
	},
	onLoad() {
		this.userInfo.username = uni.getStorageSync('mobile');
		this.userInfo.nickname = uni.getStorageSync('nickname');
		this.userInfo.avatar = uni.getStorageSync('avatar');
	},
	onShow() {
		// UserApi.getUserInfo(this.reload, userInfo => {
		// 	this.userInfo = userInfo;
		// 	//console.log("user info  : ", this.userInfo)
		// });
	},
	methods: {
		updateAvatar(res) {
			let self = this;
			this.userInfo.avatar = res.path;
			//console.log(res);
			UserApi.uploadAvatar(
				this.userInfo.avatar,
				avatarURL => {
					//console.log(res);
					console.log('user :', UserManager.getUserInfo().avatar);
					self.userInfo.avatar = avatarURL;
				},
				(code, msg) => {}
			);
		},
		jumpToMyQrcodeCard() {
			UserJumpHelper.jumpToMyQrcodeCard();
		},
		addfriend() {
			uni.navigateTo({
				url: './addfriend/addfriend'
			});
		},
		createGroup() {
			// 创建群组
			uni.navigateTo({
				url: '../../group/CreateGroup/CreateGroup'
			});
		},
		addGroup() {
			uni.navigateTo({
				url: '../../group/AddGroup/AddGroup'
			});
		},
		userOut() {
			uni.removeStorageSync('UID');
			uni.removeStorageSync('Token');
			// 账号退出
			uni.reLaunch({
				url: '../../../login/login'
			});
		},
		systemSettings() {
			// 系统设置
			let that = this
		}
	}
};
</script>

<style>
.avatar {
	width: 130upx;
	height: 130upx;
	border-radius: 10upx;
}
.qrcode {
	width: 50upx;
	height: 50upx;
}

.headImage {
	width: 100rpx;
	height: 100rpx;
	border: 1px solid #e8e8f8;
	background-color: #f8f8f8;
	border-radius: 50%;
	/*border-radius: 100%;*/
}
.pg_list_cell_left {
	font-size: 30rpx;
}
</style>
