<script>
export default {
	onLaunch: function() {
		uni.setStorageSync('WS', 'ws://localhost:8081');
		uni.setStorageSync('URL', 'http://localhost:8081');
		uni.setStorageSync('ImageURL', 'http://localhost:8081/');
		
		// uni.setStorageSync('WS', 'ws://chat.bo5.xyz');
		// uni.setStorageSync('URL', 'http://chat.bo5.xyz');
		// uni.setStorageSync('ImageURL', 'http://chat.bo5.xyz/');
		
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
		uni.$on('Reconnect_sign_out', function(res) {
			// ws连接失败，重新登录
			uni.showToast({
			    title: '连接失败，请重新登录',
				icon:'none',
			    duration: 2000
			});
			setTimeout(function() {
				uni.removeStorageSync('UID');
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}, 1000);
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onError(e) {
		console.log('error', e);
	}
};
</script>
<style lang="less">
    @import "./common/less/base";
    @import "./common/less/iconfont";
    @import "./common/less/border-1px";
</style>
