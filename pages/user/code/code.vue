<template>
	<view>
		<view class="p-5">
			<view class="bg-white rounded p-4">
				<view class="card-code"><u-image width="100%" height="540rpx" :src="codeSrc"></u-image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			codeSrc: ''
		};
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
	min-height: 100vh;
	height: auto;
}
.p-5 {
	padding: 50rpx;
}
.p-4 {
	padding: 40rpx;
}
.rounded {
	border-radius: 8rpx;
}
.bg-white {
	background-color: #ffffff;
}
.card-code {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 550rpx;
	// width: 550rpx;
}
</style>
