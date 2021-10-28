<template>
	<view>
		<u-cell-group>
			<u-cell-item icon="setting-fill" title="新的朋友" :arrow="false"></u-cell-item>
			<u-cell-item icon="integral-fill" title="群聊" :arrow="false"></u-cell-item>
		</u-cell-group>
		<u-index-list :scrollTop="scrollTop">
			<view v-for="(item, index) in indexList" :key="index">
				<u-index-anchor :index="item" />
				<u-cell-group>
					<u-cell-item title="个人设置" :arrow="false" :title-style="{ paddingLeft: '10rpx' }">
						<view class="" slot="icon">
							<view class="" style="display:flex;justify-content: center;align-items: center;">
								<u-avatar src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></u-avatar>
							</view>
						</view>
					</u-cell-item>
					<u-cell-item title="个人设置" :arrow="false" :title-style="{ paddingLeft: '10rpx' }">
						<view class="" slot="icon">
							<view class="" style="display:flex;justify-content: center;align-items: center;">
								<u-avatar src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg"></u-avatar>
							</view>
						</view>
					</u-cell-item>
				</u-cell-group>
				<!-- <view class="list-cell">列表3</view> -->
			</view>
		</u-index-list>
	</view>
</template>
<script>
export default {
	components: {},
	data() {
		return {
			scrollTop: 0,
			indexList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
		};
	},
	onLoad() {},

	methods: {
		
	},
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	}
};
</script>

<style scoped lang="scss">
.list-cell {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 24rpx;
	overflow: hidden;
	color: #323233;
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
}
</style>
