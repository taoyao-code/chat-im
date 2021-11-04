<template>
	<view>
		<view class="UCenter-bg">
			<image src="/images/logo.png" class="png" mode="widthFix"></image>
			<view class="text-xl">
				ColorUI组件库
				<text class="text-df">v2.0</text>
			</view>
			<view class="margin-top-sm"><text>By:文晓港</text></view>
		</view>
		<view class="padding-xl"><button class="cu-btn  bg-green shadow lg block" open-type="getUserInfo" bindgetuserinfo="onGetUserInfo">微信登录</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style>
.UCenter-bg {
	background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
	background-size: cover;
	height: 700rpx;
	display: flex;
	justify-content: center;
	overflow: hidden;
	position: relative;
	flex-direction: column;
	align-items: center;
	color: #fff;
	font-weight: 300;
	text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}
.UCenter-bg::after {
	content: '';
	position: absolute;
	width: 100vw;
	height: 50vw;
	background-color: #f1f1f1;
	transform: rotate(-10deg) scale(2, 2);
	bottom: -60vw;
	left: 0;
	right: 0;
	margin: auto;
}
.UCenter-bg text {
	opacity: 0.8;
}
.UCenter-bg image {
	width: 250rpx;
	height: 250rpx;
}
</style>
