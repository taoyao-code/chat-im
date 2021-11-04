<template name="basics">
	<view>
		<view class="cu-list menu-avatar">
			<view class="cu-item" v-for="(user, index) in UserList" :key="user.id" @tap="chat(user.id, user.nickname, index)">
				<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ imageURL(user.avatar) +')'}]"></view>
				<view class="content">
					<view class="text-pink">
						<view class="text-cut">{{ user.nickname }}</view>
					</view>
					<view class="text-gray text-sm flex">
						<view class="text-cut">xxxxxxx！</view>
					</view>
				</view>
				<view class="action">
					<view class="text-grey text-xs">{{ user.time }}</view>
					<view class="cu-tag round bg-red sm" v-if="user.num > 0">{{ user.num }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'basics',
	data() {
		return {
			modalName: null,
			listTouchStart: 0,
			listTouchDirection: null,
			UserList: []
		};
	},

	created() {
		let that = this;
		that.loadfriend();
		uni.$on('FriendsList', function(res) {
			// 监听新添加的好友，并请求新的数据
			that.loadfriend();
		});
		let nowDate = new Date();
		// 好友发送过来的数据量状态增加
		uni.$on('chat_user_list_add', function(res) {
			var user_liset = that.UserList;
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
			that.UserList = user_liset;
		});
	},
	beforeDestroy() {
		console.log('beforeDestroy 销毁前');
		// 事件卸载
		// uni.$once('FriendsList');
		// uni.$once('chat_user_list_add');
	},
	destroyed() {
		console.log('destroyed 销毁完成');
	},
	methods: {
		// ListTouch触摸开始
		ListTouchStart(e) {
			this.listTouchStart = e.touches[0].pageX;
		},

		// ListTouch计算方向
		ListTouchMove(e) {
			this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left';
		},

		// ListTouch计算滚动
		ListTouchEnd(e) {
			if (this.listTouchDirection == 'left') {
				this.modalName = e.currentTarget.dataset.target;
			} else {
				this.modalName = null;
			}
			this.listTouchDirection = null;
		},
		chat(id, name, index) {
			uni.navigateTo({
				url: '../Chat/singleChat?id=' + id + '&name=' + name + '&index=' + index,
				success: res => {
					// 将当前消息值设为 0
					this.UserList[index].num = '0';
				}
			});
		},
		loadfriend() {
			// 好友列表
			this.$http
				.post('/contact/loadfriend', {
					userid: uni.getStorageSync('UID')
				})
				.then(res => {
					let reslut = res.rows;
					for (let i = 0; i < reslut.length; i++) {
						reslut[i]['num'] = '0';
					}
					this.UserList = reslut;
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

<style>
.page {
	height: 100vh;
}
</style>
