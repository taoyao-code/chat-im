<template>
	<view>
		<view class="box">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="number" placeholder="搜索账号/群号" confirm-type="search" v-model="dstid"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow-blur round" @tap="searchs">搜索</button>
				</view>
			</view>
		</view>
		<view class="" v-if="AccountNumber != ''">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 人
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ imageURL(AccountNumber.avatar) +')'}]"></view>
					<view class="content">
						<view class="text-grey">{{AccountNumber.nickname}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								xxxxxxx。
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs" @tap="addfriend(AccountNumber.id)">添加</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="Groups != ''">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 群
				</view>
			</view>
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ imageURL(Groups.icon) +')'}]"></view>
					<view class="content">
						<view class="text-grey">{{Groups.Name}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								xxxxxxx。
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs" @tap="addcommunity(Groups.id)">添加</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" v-if="AccountNumber == '' && Groups == ''">
			<view class="cu-bar bg-white solid-bottom margin-top">
				<view class="action">
					<text class="cuIcon-title text-orange "></text> 推荐好友
				</view>
			</view>
			<view class="cu-list menu-avatar">
				
				<view class="cu-item" v-for="(item,index) in UserList" :key="index">
					<view class="cu-avatar round lg" :style="[{backgroundImage:'url('+ imageURL(item.avatar) +')'}]"></view>
					<view class="content">
						<view class="text-grey">{{item.nickname}}</view>
						<view class="text-gray text-sm flex">
							<view class="text-cut">
								<text class="cuIcon-infofill text-red  margin-right-xs"></text>
								xxxxxxx。
							</view> </view>
					</view>
					<view class="action">
						<view class="text-grey text-xs" @tap="addfriend(item.id)">添加</view>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				InputBottom: 0,
				dstid:'',
				AccountNumber:[],
				Groups:[],
				UserList:[],
				userid:0
			};
		},
		
		onLoad(option) {
			this.userid = uni.getStorageSync('UID');
		},
		onShow() {
			this.initRecommend()
		},
		methods: {
			InputFocus(e) {
				// 光标移入
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				// 光标移出
				this.InputBottom = 0
			},
			searchs(){
				// 搜索
				this.$http
					.post('/user/search', {
						dstid: this.dstid
					})
					.then(res => {
						if(res.data.Account.id != 0){
							this.AccountNumber = res.data.Account
						}
						if(res.data.Group.id != 0){
							this.Groups = res.data.Group
						}

						if(res.data.Group.id == 0 && res.data.Account.id == 0){
							uni.showToast({
								title: '未查询到!',
								icon:'none',
								duration: 2000
							});
						}
					})
					.catch(err => {});
			},
			initRecommend(){
				// 推荐好友
				this.$http
					.post('/user/recommend', {
						userid: this.userid
					})
					.then(res => {
						this.UserList = res.data
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
			addcommunity(id) {
				// 加入群聊
				this.$http
					.post('/contact/joincommunity', {
						dstid: id, // 群ID
						userid: this.userid
					})
					.then(res => {
						if (res.code == 0) {
							// 添加监听器，通知群组页面
							uni.$emit('updateGroupList', { data: '' });
							uni.showToast({
								title: '加入成功',
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
								icon: 'none',
								duration: 2000
							});
						}
					})
					.catch(err => {});
			},
			addfriend(id) {
				// 添加好友
				this.$http
					.post('/contact/addfriend', {
						dstid: id,
						userid: this.userid
					})
					.then(res => {
						if (res.code == 0) {
							// 添加监听器，通知群组页面
							uni.$emit('FriendsList', { data: '' });
							uni.showToast({
								title: '添加成功',
								duration: 2000
							});
							let msg = {
								dstid: parseInt(id),
								cmd: 9
							};
							this.$store.commit('webSocketSend', msg);
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
			}
			
		}
	}
</script>

<style>

</style>
