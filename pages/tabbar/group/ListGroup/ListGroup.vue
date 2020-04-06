<template>
	<view>
		<uni-list v-for="g in GroupList" :key="g.id" class="pg_list_cell_left">
			<uni-list-item thumb="https://img-cdn-qiniu.dcloud.net.cn/new-page/hx.png" @tap="chat(g.id, g.Name)">{{ g.Name }}</uni-list-item>
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
			GroupList: []
		};
	},
	onLoad() {
		let that = this
		that.loadfriend();
		uni.$on('updateGroupList', function(res) {
			that.loadfriend()
		});
	},
	onShow() {},
	onUnload(){
		uni.$once('FriendsList')
	},
	methods: {
		chat(id, name) {
			uni.navigateTo({
				url: '../../../chat/Group?id=' + id + '&name=' + name
			});
		},
		loadfriend() {
			// 群列表
			uni.request({
				url: uni.getStorageSync('URL') + '/contact/loadcommunity',
				method: 'POST',
				data: {
					userid: uni.getStorageSync('UID')
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.GroupList = res.data.rows;
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
