<template>
	<view>
		<uni-list v-for="(user,index) in UserList" :key="user.id" class="pg_list_cell_left">
			<uni-list-item :thumb="imageURL(user.avatar)" :show-badge="true" :badge-text="nums(user.num)" @tap="chat(user.id, user.nickname,index)">{{ user.nickname }}</uni-list-item>
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
		let that = this;
		that.loadfriend();
		uni.$on('FriendsList', function(res) {
			// 监听新添加的好友，并请求新的数据
			that.loadfriend();
		});
		// 好友发送过来的数据量状态增加
		uni.$on('chat_user_list_add', function(res) {
			var user_liset = that.UserList;
			for (var i = 0; i < user_liset.length; i++) {
				if (user_liset[i].id == res.dstid) {
					if(user_liset[i].num == '0'){
						user_liset[i].num = '1';
					}else{
						user_liset[i].num = (parseInt(user_liset[i].num) + 1)+'';
					}
				}
			}
			that.UserList = user_liset
		});
	},
	onShow() {
		let that = this;
	},
	onUnload() {
		// 事件卸载
		uni.$once('FriendsList');
		uni.$once('chat_user_list_add');
	},
	methods: {
		chat(id, name,index) {
			uni.navigateTo({
				url: '../../chat/chatim?id=' + id + '&name=' + name+'&index='+index,
				success: res => {
					// 将当前消息值设为 0
					this.UserList[index].num = '0'
				},
			});
		},
		loadfriend() {
			// 好友列表
			uni.request({
				url: uni.getStorageSync('URL') + '/contact/loadfriend',
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
					this.UserList = reslut;
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
