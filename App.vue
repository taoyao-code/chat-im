<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
		this.initOpenImListener();
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		//初始化监听
		initOpenImListener() {
			// 会话监听
			// 消息状态监听
			// 群组监听
			// 好友监听
		}
	}
};
</script>

<style></style>
<style lang="scss">
@import 'colorui/main.css';
@import 'colorui/icon.css';
/*每个页面公共css */
page {
	height: 100%;
}
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import 'uview-ui/index.scss';
</style>
