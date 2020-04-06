<script>
export default {
	onLaunch: function() {
		uni.setStorageSync('WS', 'ws://chat.bo5.xyz');
		uni.setStorageSync('URL', 'http://chat.bo5.xyz');
		let value = uni.getStorageSync('UID');
		if (!value) {
			uni.reLaunch({
				url: './pages/login/login'
			});
		} else {
			let uid = uni.getStorageSync('UID');
			let token = uni.getStorageSync('Token');
			this.$store.commit('setUid', uid);
			this.$store.commit('setSid', token);
			this.$store.commit('setUrl', uni.getStorageSync('WS') + '/chat?id=' + uid + '&token=' + token);
			this.$store.dispatch('webSocketInit'); // 初始化ws
		}
	},
	onShow: function() {
		console.log('App Show');
		// let that = this;
		// if (that.$store.getters.sendMsgStatus) {
		// 	that.$store.dispatch('webSocketInit');
		// }
	},
	onHide: function() {
		console.log('App Hide');
	},
	onError(e) {
		console.log('error', e);
	}
};
</script>

<style>
/*每个页面公共css */
</style>
