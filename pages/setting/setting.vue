<template>
	<view>
		<uni-list>
			<uni-list-item :show-extra-icon="true" :showArrow="false" :extra-icon="extraIcon1" :show-switch="true" title="震动" @switchChange="switchChange" :switchChecked="checked" />
		</uni-list>
	</view>
</template>
<script>
import uniSection from '../../components/uni-section/uni-section.vue';
import uniList from '../../components/uni-list/uni-list.vue';
import uniListItem from '../../components/uni-list-item/uni-list-item.vue';
export default {
	components: {
		uniSection,
		uniList,
		uniListItem
	},
	data() {
		return {
			extraIcon1: {
				color: '#007aff',
				size: '22',
				type: 'gear-filled'
			},
			checked:true
		};
	},
	onShow() {
		let s = uni.getStorageSync('shock');
		if (s) {
			this.checked = true
		} else {
			this.checked = false
		}
	},
	methods: {
		switchChange(e) {
			uni.setStorageSync('shock', e.value);
		}
	}
};
</script>

<style>
/* #ifndef APP-NVUE */
page {
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	background-color: #efeff4;
	min-height: 100%;
	height: auto;
}

view {
	font-size: 14px;
	line-height: inherit;
}

.example {
	padding: 0 15px 15px;
}

.example-info {
	padding: 15px;
	color: #3b4144;
	background: #ffffff;
}

.example-body {
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	font-size: 14px;
	background-color: #ffffff;
}

/* #endif */
.example {
	padding: 0 15px;
}

.example-info {
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
	padding: 15px;
	color: #3b4144;
	background-color: #ffffff;
	font-size: 14px;
	line-height: 20px;
}

.example-info-text {
	font-size: 14px;
	line-height: 20px;
	color: #3b4144;
}

.example-body {
	flex-direction: column;
	padding: 15px;
	background-color: #ffffff;
}

.word-btn-white {
	font-size: 18px;
	color: #ffffff;
}

.word-btn {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 6px;
	height: 48px;
	margin: 15px;
	background-color: #007aff;
}

.word-btn--hover {
	background-color: #4ca2ff;
}
</style>
