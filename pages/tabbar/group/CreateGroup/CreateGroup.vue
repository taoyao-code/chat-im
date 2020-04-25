<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<uni-list>
					<uni-list-item :show-arrow="false">
						<text class="pg_list_cell_left">头像</text>
						<view class="headImage">
							<avatar
								selWidth="200px"
								selHeight="200px"
								@upload="updateAvatar"
								:avatarSrc="avatar"
								avatarStyle="width: 50px;height: 50px;border-radius: 5px;"
							></avatar>
						</view>
					</uni-list-item>
				</uni-list>
			</view>
			<view class="input-row border">
				<view class="title">名称:</view>
				<m-input type="text" focus clearable v-model="GroupName" placeholder="请输入群名称"></m-input>
			</view>
			<view class="input-row border">
				<view class="title">介绍:</view>
				<m-input type="text" focus clearable v-model="GroupIntroduction" placeholder="请输入群简介"></m-input>
			</view>
		</view>
		<view class="btn-row"><button class="mini-btn" type="primary" @tap="addGroupData">提交</button></view>
	</view>
</template>
<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import avatar from '@/components/yq-avatar/yq-avatar.vue';
import mInput from '@/components/m-input.vue';
export default {
	components: {
		uniList,
		uniListItem,
		avatar,
		mInput
	},
	data() {
		return {
			GroupName: '',
			GroupIntroduction: '',
			avatar: '',
			reload: false
		};
	},
	methods: {
		addGroupData() {
			// 添加群组信息
			if (this.GroupName && this.GroupIntroduction) {
				this.$http
					.post('/contact/createcommunity', {
						name: this.GroupName,
						cate: 1,
						memo: this.GroupIntroduction,
						icon: this.avatar ? this.avatar : '/asset/images/community.png',
						ownerid: uni.getStorageSync('UID') // 群主ID
					})
					.then(res => {
						if (res.code == 0) {
							// 添加监听器，通知群组页面
							uni.$emit('updateGroupList', { data: '' });
							uni.showToast({
								title: '创建成功',
								duration: 2000
							});
							setTimeout(function() {
								uni.navigateBack({
									delta: 1
								});
							}, 1000);
						} else {
							uni.showToast({
								title: res.msg,
								duration: 2000
							});
						}
					})
					.catch(err => {});
			} else {
				uni.showToast({
					title: '请填写正确的值!',
					duration: 2000
				});
			}
		},
		updateAvatar(res) {
			let self = this;
			this.avatar = res.path;
			uni.uploadFile({
				url: uni.getStorageSync('URL') + '/attach/upload',
				filePath: res.path,
				name: 'file',
				success: r => {
					let ret = JSON.parse(r.data);
					if (ret.code == 0) {
						// self.avatar = ret.data;
					}
				},
				fail: err => {
					console.log(err);
				}
			});
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
