<template name="components">
	<view>
		<!-- <scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index == TabCur ? 'text-orange cur' : ''" v-for="(item, index) in 2" :key="index" @tap="tabSelect" :data-id="index">
					{{ index == 0 ? '好友' : '群聊' }}
				</view>
			</view>
		</scroll-view>
		<pluginIndexs v-if="TabCur == 0"></pluginIndexs> -->
		<!-- <group v-else></group> -->
		<group></group>
	</view>
</template>

<script>
import pluginIndexs from '../plugin/indexes.vue';
import group from '../group/list.vue';
export default {
	name: 'components',
	components: {
		pluginIndexs,
		group
	},
	data() {
		return {
			TabCur: 0,
			scrollLeft: 0
		};
	},
	methods: {
		tabSelect(e) {
			this.TabCur = e.currentTarget.dataset.id;
			this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			if (e.currentTarget.dataset.id == 0) {
				// 好友页面
				console.log(1);
			} else {
				// 群聊页
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
