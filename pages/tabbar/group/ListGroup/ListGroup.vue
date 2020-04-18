<template>
	<view>
		<!-- <uni-list v-for="g in GroupList" :key="g.id" class="pg_list_cell_left">
			<uni-list-item :showArrow="false" @tap="chat(g.id, g.Name)">
				<template v-slot:right="">
					<image style="width: 30px;height: 30px;" :src="imageURL(g.icon)" mode="widthFix"></image>
				</template>
				{{ g.Name }}
			</uni-list-item>
			<view style="background-color:#f7f7f7;height:1px;border:none;"></view>
		</uni-list> -->
		<uni-list  v-for="(g,index) in GroupList" :key="g.id" class="pg_list_cell_left">
			<uni-list-item :thumb="imageURL(g.icon)" :show-badge="true" :badge-text="nums(g.num)" @tap="chat(g.id, g.Name,index)">{{ g.Name }}</uni-list-item>
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
		uni.$on('chat_Group_list_add', function(res) {
			var user_liset = that.GroupList;
			for (var i = 0; i < user_liset.length; i++) {
				if (user_liset[i].id == res.dstid) {
					if(user_liset[i].num == '0'){
						user_liset[i].num = '1';
					}else{
						user_liset[i].num = (parseInt(user_liset[i].num) + 1)+'';
					}
				}
			}
			that.GroupList = user_liset
		});
	},
	onShow() {},
	onUnload() {
		uni.$once('FriendsList');
	},
	methods: {
		chat(id, name) {
			uni.navigateTo({
				url: '../../../chat/Groupim?id=' + id + '&name=' + name+'&index='+index,
				success: res => {
					// 将当前消息值设为 0
					this.GroupList[index].num = '0'
				},
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
					let reslut = res.data.rows
					for (let i = 0; i < reslut.length; i++) {
						reslut[i]['num'] = '0'
					}
					this.GroupList = reslut;
				}
			});
		},
		imageURL(url) {
			if (url.substring(0, 4) == 'http') {
				return url;
			} else {
				return uni.getStorageSync('URL') + url;
			}
		},
		nums(n){
			if(n == 0 || n == '0'){
				return ''
			}else{
				return n
			}
		}
	}
};
</script>

<style>
.pg_list_cell_left {
	font-size: 40rpx;
}
</style>
