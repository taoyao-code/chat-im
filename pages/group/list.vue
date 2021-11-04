<template>
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item " v-for="(g, index) in GroupList" :key="g.id" @tap="chat(g.id, g.Name, index)">
				<view class="cu-avatar round lg" :style="[{ backgroundImage: 'url(' + imageURL(g.icon) + ')' }]"></view>
				<view class="content">
					<view class="text-pink">
						<view class="text-cut">{{ g.Name }}</view>
					</view>
					<view class="text-gray text-sm flex"><view class="text-cut">xxxxxxx！</view></view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{g.time}}</view>
					<view class="cu-tag round bg-red sm" v-if="g.num > 0">{{ g.num }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			GroupList: []
		};
	},
	created() {
		let that = this;
		that.loadfriend();
		uni.$on('updateGroupList', function(res) {
			that.loadfriend();
		});
		let nowDate = new Date();
		uni.$on('chat_Group_list_add', function(res) {
			var user_liset = that.GroupList;
			for (var i = 0; i < user_liset.length; i++) {
				if (user_liset[i].id == res.dstid) {
					if (user_liset[i].num == '0') {
						user_liset[i].num = '1';
						user_liset[i].time = nowDate.getHours() + ':' + nowDate.getMinutes();
					} else {
						user_liset[i].num = parseInt(user_liset[i].num) + 1 + '';
						user_liset[i].time = nowDate.getHours() + ':' + nowDate.getMinutes();
					}
				}
			}
			that.GroupList = user_liset;
		});
	},
	beforeDestroy() {
		console.log('beforeDestroy 销毁前');
		// 事件卸载
		// uni.$once('FriendsList');
	},
	methods: {
		chat(id, name, index) {
			uni.navigateTo({
				url: '../Chat/groupChat?id=' + id + '&name=' + name + '&index=' + index,
				success: res => {
					// 将当前消息值设为 0
					this.GroupList[index].num = '0';
				}
			});
		},
		loadfriend() {
			// 群列表
			this.$http
				.post('/contact/loadcommunity', { userid: uni.getStorageSync('UID') })
				.then(res => {
					let reslut = res.rows;
					for (let i = 0; i < reslut.length; i++) {
						reslut[i]['num'] = '0';
					}
					this.GroupList = reslut;
				})
				.catch(err => {});
		},
		imageURL(url) {
			if (url.substring(0, 4) == 'http') {
				return url;
			} else {
				return uni.getStorageSync('URL') + url;
			}
		},
		nums(n) {
			if (n == 0 || n == '0') {
				return '';
			} else {
				return n;
			}
		}
	}
};
</script>

<style></style>
