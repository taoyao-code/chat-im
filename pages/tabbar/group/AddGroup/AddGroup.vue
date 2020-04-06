<template>
	<view>
		<form @submit="formSubmit" @reset="formReset">
			<view class="uni-form-item uni-column">
				<text class="title">群ID:</text>
				<input class="uni-input" name="dstid" type="number" focus  placeholder="请输入群ID" />
			</view>
			<view class="uni-btn-v">
				<button form-type="submit">添加</button>
			</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userid:0,
		};
	},
	onLoad(option){
		this.userid = uni.getStorageSync('UID');
	},
	methods: {
		formSubmit: function(e) {
			if (!e.detail.value) {
				return
			}
			var formdata = e.detail.value
			// 加入群聊
			uni.request({
			    url: uni.getStorageSync('URL')+'/contact/joincommunity',
				method:"POST",
			    data: {
			        dstid: formdata.dstid, // 群ID
					userid:this.userid
			    },
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    success: (res) => {
					if(res.data.code == 0){
						// 添加监听器，通知群组页面
						uni.$emit('updateGroupList',{data:''});
						uni.showToast({
						    title: '加入成功',
						    duration: 2000
						});
						setTimeout(function(){
							uni.navigateBack({
								delta: 1
							});
						},1000)
					}else{
						uni.showToast({
						    title: res.data.msg,
							icon:'none',
						    duration: 2000
						});
					}
			    }
			});
		},
		
	}
};
</script>

<style>
	.uni-btn-v{
		margin-top: 100rpx;
	}
</style>
