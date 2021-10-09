<template>
	<view class="box">
		<view class="top">
			<view class="region">
				<view class="img-box"><image src="/static/other/1.png"></image></view>
				<view class="info">
					<view class="name">niew</view>
					<view class="time">到期时间: 2099.09.09</view>
				</view>
				<view class="btn-box"><view class="btn">续费</view></view>
			</view>
		</view>
		<view class="title">会员特权</view>
		<view class="menu-box">
			<view class="menu">
				<image src="/static/other/3.png"></image>
				<text>课程免费</text>
			</view>
			<view class="menu">
				<image src="/static/other/2.png"></image>
				<text>双倍积分</text>
			</view>
			<view class="menu">
				<image src="/static/other/5.png"></image>
				<text>专属兑换</text>
			</view>
			<view class="menu">
				<image src="/static/other/7.png"></image>
				<text>尊贵标识</text>
			</view>
		</view>
		<view style="height: 20rpx;margin: 50rpx 20rpx 20rpx 20rpx;background-color: #f4f4f4;"></view>
		<view class="">
			1
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tagEle: []
		};
	},
	onShow() {}
};
</script>

<style lang="scss" scoped>
.box {
	width: 100%;
	margin: auto;
	overflow: hidden;
}

.top {
	position: relative;
	padding-top: 100rpx;
	width: 100%;
	height: 350rpx;
}

.top:after {
	width: 140%;
	height: 150px;
	position: absolute;
	left: -20%;
	top: 0;
	z-index: -1;
	content: '';
	border-radius: 0 0 50% 50%;
	background: linear-gradient(to right, #319efd, #1ccee8);
}

.region {
	padding: 0 50rpx;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;

	.img-box {
		width: 100rpx;
		height: 100rpx;

		image {
			width: 100rpx;
			height: 100rpx;
		}
	}

	.info {
		padding-left: 20rpx;
		width: 400rpx;
		line-height: 55rpx;
		flex-direction: column;

		.name {
			font-size: 40rpx;
			letter-spacing: 5rpx;
			color: #ffffff;
		}

		.time {
			font-size: 28rpx;
			letter-spacing: 2rpx;
			color: #b3dffe;
		}
	}

	.btn-box {
		width: 150rpx;

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 120rpx;
			height: 50rpx;
			font-size: 28rpx;
			font-weight: bold;
			border-radius: 50rpx;
			background-color: #ffffff;
			color: #ff9602;
			box-shadow: 5rpx 5rpx 10rpx #489dcf;
		}
	}
}

.title {
	width: 100%;
	letter-spacing: 10rpx;
	display: flex;
	justify-content: center;
	color: #fd9903;
	font-size: 35rpx;
	font-weight: 600;
}

.menu-box {
	padding: 0 50rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;

	.menu {
		padding-top: 50rpx;
		height: 200rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		image {
			width: 100rpx;
			height: 100rpx;
		}

		text {
			padding-top: 30rpx;
			font-size: 24rpx;
			color: #808080;
		}
	}
}

</style>
