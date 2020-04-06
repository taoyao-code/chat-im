<template>
	<view>
		<uni-list v-for="g in GroupList" :key="g.id" class="pg_list_cell_left">
			<uni-list-item :showArrow="false" @tap="chat(g.id, g.Name)">
				<template v-slot:right="">
					<image style="width: 40px;height: 40px;" :src="image(g.icon)" mode="widthFix"></image>
				</template>
				{{ g.Name }}
			</uni-list-item>
			<view style='background-color:#f7f7f7;height:1px;border:none;'></view>
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
		let that = this;
		that.loadfriend();
		uni.$on('updateGroupList', function(res) {
			that.loadfriend();
		});
	},
	onShow() {},
	onUnload() {
		uni.$once('FriendsList');
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
		},
		image(url) {
			return uni.getStorageSync('URL') + url;
		}
	}
};
</script>

<style>
.pg_list_cell_left {
	font-size: 40rpx;
}
</style>
