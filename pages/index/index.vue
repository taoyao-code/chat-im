<template>
	<view>
		<basics v-if="PageCur == 'basics'"></basics>
		<components v-if="PageCur == 'component'"></components>
		<!-- <plugin v-if="PageCur == 'plugin'"></plugin> -->
		<mine v-if="PageCur == 'mine'"></mine>

		<view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" @click="NavChange" data-cur="basics">
				<view class="cuIcon-cu-image">
					<image :src="'/static/tabbar/basics' + [PageCur == 'basics' ? '_cur' : ''] + '.png'"></image>
					<view class="cu-tag badge">99</view>
				</view>
				<view :class="PageCur == 'basics' ? 'text-green' : 'text-gray'">消息</view>
			</view>
			<view class="action" @click="NavChange" data-cur="component">
				<view class="cuIcon-cu-image">
					<image :src="'/static/tabbar/component' + [PageCur == 'component' ? '_cur' : ''] + '.png'"></image>
					<view class="cu-tag badge">99</view>
				</view>
				<view :class="PageCur == 'component' ? 'text-green' : 'text-gray'">联系人</view>
			</view>
			<!-- <view class="action" @click="NavChange" data-cur="plugin">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/plugin' + [PageCur == 'plugin' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'plugin' ? 'text-green' : 'text-gray'">动态</view>
			</view> -->
			<view class="action" @click="NavChange" data-cur="mine">
				<view class="cuIcon-cu-image"><image :src="'/static/tabbar/mine' + [PageCur == 'mine' ? '_cur' : ''] + '.png'"></image></view>
				<view :class="PageCur == 'mine' ? 'text-green' : 'text-gray'">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			PageCur: 'basics'
		};
	},
	methods: {
		NavChange: function(e) {
			this.PageCur = e.currentTarget.dataset.cur;
		}
	}
};
</script>

<style></style>
