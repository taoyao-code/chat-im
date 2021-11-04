<template>
	<view>
		<scroll-view scroll-y class="scrollPage">
			<view class="UCenter-bg">
				<view class="cu-avatar xl round bg-gray"><avatar selWidth="200px" selHeight="200px" @upload="updateAvatar" :avatarSrc="avatar"></avatar></view>
			</view>
			<view class="">
				<form>
					<view class="cu-form-group">
						<view class="title">群名称</view>
						<input placeholder="填写群名称(2-20个字)" name="input" v-model="GroupName"></input>
					</view>
					<view class="cu-form-group align-start">
						<view class="title">简介</view>
						<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaBInput" placeholder="群简介"></textarea>
					</view>
				</form>
			</view>
			<view class="">
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-grey lg round" @tap="addGroupData">提交</button>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
import avatar from '@/components/yq-avatar/yq-avatar.vue';
export default {
	components: {
		avatar
	},
	data() {
		return {
			GroupName: '',
			GroupIntroduction: '',
			avatar: '',
			reload: false,
			modalName: null
		};
	},
	methods: {
		textareaBInput(e) {
			this.GroupIntroduction = e.detail.value
		},
		addGroupData() {
			if(this.avatar == ''){
				uni.showToast({
					title: '请选择头像',
					icon:"none",
					duration: 2000
				});
				return false
			}
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
							}, 500);
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
			uni.uploadFile({
				url: uni.getStorageSync('URL') + '/attach/upload',
				filePath: res.path,
				name: 'file',
				success: r => {
					let ret = JSON.parse(r.data);
					if (ret.code == 0) {
						this.avatar = ret.data;
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
.UCenter-bg {
	background-image: url(../../static/index.jpg);
	background-size: cover;
	height: 300rpx;
	display: flex;
	justify-content: center;
	padding-top: 40rpx;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
	opacity: 0.8;
}

.UCenter-bg image {
	width: 200rpx;
	height: 200rpx;
}

.cu-form-group .title {
	min-width: calc(4em + 15px);
}
</style>
