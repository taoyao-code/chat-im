<template>
	<view>
		<uni-list>
			<uni-list-item :show-arrow="false">
				<text class="pg_list_cell_left">头像</text>
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
		</uni-list>
		<view class="uni-form-item uni-column">
			<view class="title">名称:</view>
			<input class="uni-input" @input="GroupNameInput" type="text" placeholder="请输入群名称" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">介绍:</view>
			<input class="uni-input" @input="GroupIntroductionInput" placeholder="请输入群简介" />
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="button-sp-area"><button class="mini-btn" type="primary" @tap="addGroupData">提交</button></view>
		</view>
	</view>
</template>
<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import avatar from '@/components/yq-avatar/yq-avatar.vue';
export default {
	components: {
		uniList,
		uniListItem,
		avatar
	},
	data() {
		return {
			GroupName: '',
			GroupIntroduction: '',
			userInfo: {
				avatar: ''
			},
			reload: false
		};
	},
	methods: {
		GroupNameInput: function(event) {
			this.GroupName = event.target.value;
		},
		GroupIntroductionInput: function(event) {
			this.GroupIntroduction = event.target.value;
		},
		addGroupData() {
			// 添加群组信息
			if (this.GroupName && this.GroupIntroduction) {
				uni.request({
					url: uni.getStorageSync('URL')+'/contact/createcommunity',
					method: 'POST',
					data: {
						name: this.GroupName,
						cate: 1,
						memo: this.GroupIntroduction,
						icon: '/asset/images/community.png',
						ownerid: uni.getStorageSync('UID') // 群主ID
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.code == 0) {
							// 添加监听器，通知群组页面
							uni.$emit('updateGroupList',{data:''});
							uni.showToast({
								title: '创建成功',
								duration: 2000
							});
							setTimeout(function(){
								uni.navigateBack({
									delta: 1
								});
							},1000)
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							});
						}
					}
				});
			} else {
				uni.showToast({
					title: '请填写正确的值!',
					duration: 2000
				});
			}
		}
	}
};
</script>

<style></style>
