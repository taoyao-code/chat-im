<template>
	<view class="content">
		<view class="bg"></view>
		<view class="bg2"></view>
		<view class="tips">
			<text class="title">登录</text>
			<text class="subtitle">欢迎再次回来~</text>
		</view>
		<view class="form-box">
			<view class="input-box">
				<image class="left" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E7%99%BB%E5%BD%95%E6%A0%B7%E5%BC%8F/%E7%99%BB%E5%BD%959/%E8%B4%A6%E5%8F%B7.png"></image>
				<input placeholder="请输入账号" />
				<image class="right" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E7%99%BB%E5%BD%95%E6%A0%B7%E5%BC%8F/%E7%99%BB%E5%BD%959/%E4%B8%8B%E6%8B%89.png"></image>
			</view>
			<view class="input-box">
				<image class="left" src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E7%99%BB%E5%BD%95%E6%A0%B7%E5%BC%8F/%E7%99%BB%E5%BD%959/%E5%AF%86%E7%A0%81.png"></image>
				<input placeholder="请输入密码" />
				<image
					class="right"
					src="https://6e69-niew6-1302638010.tcb.qcloud.la/%E7%99%BB%E5%BD%95%E6%A0%B7%E5%BC%8F/%E7%99%BB%E5%BD%959/%E6%98%BE%E7%A4%BA%E5%AF%86%E7%A0%81.png"
				></image>
			</view>
			<view class="btn">登录</view>
			<view class="other">
				<text>找回密码</text>
				<text style="color:#00c6fc;">快速注册</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;

	.tips {
		padding-top: 200rpx;
		padding-left: 80rpx;
		display: flex;
		flex-direction: column;

		.title {
			line-height: 70rpx;
			font-weight: bold;
			font-size: 50rpx;
		}

		.subtitle {
			line-height: 70rpx;
			font-size: 35rpx;
			font-weight: bold;
			color: #b0b0b1;
		}
	}

	.bg {
		position: fixed;
		top: -250rpx;
		right: -250rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 100%;
		background-color: #00baef;
		z-index: 2;
	}

	.bg2 {
		position: fixed;
		top: -150rpx;
		right: -300rpx;
		width: 600rpx;
		height: 600rpx;
		border-radius: 100%;
		background-color: #ade8f9;
		z-index: 1;
	}

	.form-box {
		padding-top: 180rpx;
		padding-left: 70rpx;
		padding-right: 70rpx;
		// width: 90%;

		.input-box {
			margin: 40rpx 0;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100rpx;
			background-color: #f5f5f5;
			border-radius: 100rpx;
			width: 100%;

			input {
				flex: 1;
				height: 100%;
				font-size: 30rpx;
			}

			.left {
				padding: 0 30rpx;
				width: 35rpx;
				height: 35rpx;
			}

			.right {
				padding: 0 30rpx;
				width: 40rpx;
				height: 40rpx;
			}
		}

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100rpx;
			border-radius: 100rpx;
			color: #ffffff;
			background: linear-gradient(to right, #00c6fc, #9adcf1);
		}

		.other {
			display: flex;
			justify-content: space-between;

			text {
				line-height: 80rpx;
				font-size: 28rpx;
			}
		}
	}
}
</style>
