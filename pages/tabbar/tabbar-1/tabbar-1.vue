<template>
	<view>
		<uni-list v-for="user in UserList" :key="user.id" class="pg_list_cell_left">
			<uni-list-item thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png" @tap="chat(user.id,user.nickname)">{{ user.nickname }}</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';

export default {
	components: { uniList, uniListItem },
	data() {
		return {
			UserList: []
		};
	},
	onLoad() {
		let that = this
		that.loadfriend();
		uni.$on('FriendsList', function(res) {
			that.loadfriend()
		});
	},
	onShow() {},
	onUnload(){
		// 事件卸载
		uni.$once('FriendsList')
	},
	methods: {
		chat(id,name) {
			uni.navigateTo({
				url: '../../chat/chat?id=' + id+'&name='+name
			});
		},
		loadfriend() {
			// 好友列表
			uni.request({
				url: uni.getStorageSync('URL')+'/contact/loadfriend',
				method: 'POST',
				data: {
					userid: uni.getStorageSync('UID')
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.UserList = res.data.rows;
				}
			});
		}
	}
};
</script>

<style>
.pg_list_cell_left {
	font-size: 40rpx;
}
</style>
