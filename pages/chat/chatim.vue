<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view
				class="msg-list"
				scroll-y="true"
				:scroll-with-animation="scrollAnimation"
				:scroll-top="scrollTop"
				:scroll-into-view="scrollToView"
				@scrolltoupper="loadHistory"
				upper-threshold="50"
			>
				<view class="chatBox">
					<!-- 加载历史数据waitingUI -->
					<!-- <view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view> -->
					<view class="row" v-for="(row, index) in msgList" :key="index" :id="'msg' + row.userid">
						<!-- 系统消息 -->
						<!-- <block v-if="row.type == 1"> -->
						<!-- <view class="system"> -->
						<!-- 文字消息 -->
						<!-- <view v-if="row.msg.type == 'text'" class="text">{{ row.msg.content.text }}</view> -->
						<!-- 领取红包消息 -->
						<!-- <view v-if="row.msg.type == 'redEnvelope'" class="red-envelope">
								<image src="/static/img/red-envelope-chat.png"></image>
								{{ row.msg.content.text }}
							</view>
						</view>
					</block> -->
						<!-- 用户消息 -->
						<block v-if="row.type == 2">
							<!-- 自己发出的消息 -->
							<view class="my" v-if="row.userid == myuid">
								<!-- 左-消息 -->
								<view class="left">
									<!-- 文字消息 -->
									<view v-if="row.media == 1" class="bubble"><rich-text :nodes="row.content"></rich-text></view>
									<!-- 语言消息 -->
									<view v-if="row.media == 3" class="bubble voice" @tap="playVoice(row.url, index)" :class="playMsgid == index ? 'play' : ''">
										<view class="length">{{ row.amount }}</view>
										<view class="icon my-voice"></view>
									</view>
									<!-- 图片消息 -->
									<view v-if="row.media == 4" class="bubble img" @tap="showPic(row.url)">
										<!-- <image :src="row.url" :style="{ width: row.msg.content.w + 'px', height: row.msg.content.h + 'px' }"></image> -->
										<image :src="row.url" mode="aspectFill" lazy-load @load="onImageLoad('msgList', index)" @error="onImageError('msgList', index)"></image>
									</view>
									<!-- 红包 -->
									<!-- <view v-if="row.msg.type == 'redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg, index)">
									<image src="/static/img/red-envelope.png"></image>
									<view class="tis"> -->
									<!-- 点击开红包 -->
									<!-- </view>
									<view class="blessing">{{ row.msg.content.blessing }}</view>
								</view> -->
								</view>
								<!-- 右-头像 -->
								<view class="right"><image :src="row.face"></image></view>
							</view>
							<!-- 别人发出的消息 -->
							<view class="other" v-if="row.userid != myuid">
								<!-- 左-头像 -->
								<view class="left"><image :src="row.face"></image></view>
								<!-- 右-用户名称-时间-消息 -->
								<view class="right">
									<view class="username">
										<view class="name">{{ row.username }}</view>
										<view class="time">{{ row.time }}</view>
									</view>
									<!-- 文字消息 -->
									<view v-if="row.media == 1" class="bubble"><rich-text :nodes="row.content"></rich-text></view>
									<!-- 语音消息 -->
									<view v-if="row.media == 3" class="bubble voice" @tap="playVoice(row.url, index)" :class="playMsgid == index ? 'play' : ''">
										<view class="icon other-voice"></view>
										<view class="length">{{ row.amount }}</view>
									</view>
									<!-- 图片消息 -->
									<view v-if="row.media == 4" class="bubble img" @tap="showPic(row.url)">
										<!-- <image :src="row.msg.content.url" :style="{ width: row.msg.content.w + 'px', height: row.msg.content.h + 'px' }"></image> -->
										<image :src="row.url" mode="aspectFill"></image>
									</view>
									<!-- 红包 -->
									<!-- <view v-if="row.msg.type == 'redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg, index)">
									<image src="/static/img/red-envelope.png"></image>
									<view class="tis"> -->
									<!-- 点击开红包 -->
									<!-- 		</view>
									<view class="blessing">{{ row.msg.content.blessing }}</view>
								</view> -->
								</view>
							</view>
						</block>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 -->
			<emotion @addEmoji="addEmoji" :class="{ hidden: hideEmoji }"></emotion>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{ hidden: hideMore }">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					<view class="box" @tap="handRedEnvelopes"><view class="icon hongbao"></view></view>
					<view class="box" @tap="yuyintonghua"><image style="font-size:16px;width: 32px; height: 32px;" src="../../static/img/more/yuyintonghua.png"></image></view>
					<view class="box" @tap="weizhi"><image style="font-size:16px;width: 32px; height: 32px;" src="../../static/img/more/weizhi.png"></image></view>
					<view class="box" @tap="yuyinshuru"><image style="font-size:16px;width: 32px; height: 32px;" src="../../static/img/more/yuyinshuru.png"></image></view>
					<view class="box" @tap="meShouchang"><image style="font-size:16px;width: 32px; height: 32px;" src="../../static/img/more/me-shouchang.png"></image></view>
					<view class="box" @tap="userinfo"><image style="font-size:16px;width: 32px; height: 32px;" src="../../static/img/more/userinfo.png"></image></view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice"><view class="icon" :class="isVoice ? 'jianpan' : 'yuyin'" @tap="switchVoice"></view></view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore"><view class="icon add"></view></view>
			<!-- #endif -->
			<view class="textbox">
				<view
					class="voice-mode"
					:class="[isVoice ? '' : 'hidden', recording ? 'recording' : '']"
					@touchstart="voiceBegin"
					@touchmove.stop.prevent="voiceIng"
					@touchend="voiceEnd"
					@touchcancel="voiceCancel"
				>
					{{ voiceTis }}
				</view>
				<view class="text-mode" :class="isVoice ? 'hidden' : ''">
					<view class="box"><textarea auto-height="true" v-model="textMsg" @focus="textareaFocus" /></view>
					<view class="em" @tap="chooseEmoji"><view class="icon biaoqing"></view></view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore"><view class="icon add"></view></view>
			<!-- #endif -->
			<view class="send" :class="isVoice ? 'hidden' : ''" @tap="sendText"><view class="btn">发送</view></view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording ? '' : 'hidden'">
			<view class="ing" :class="willStop ? 'hidden' : ''"><view class="icon luyin2"></view></view>
			<view class="cancel" :class="willStop ? '' : 'hidden'"><view class="icon chehui"></view></view>
			<view class="tis" :class="willStop ? 'change' : ''">{{ recordTis }}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn"><view class="icon close" @tap="closeRedEnvelope"></view></view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{ redenvelopeData.from }}</view>
					<view class="blessing">{{ redenvelopeData.blessing }}</view>
					<view class="money">{{ redenvelopeData.money }}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情
						<view class="icon to"></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
import emotion from '@/components/emotion/index.vue';
import emojiData from '../../static/emoji/emojiData.js';
import { mapState } from 'vuex';
const CMD = 10;
const TEXT = 1;
const VOICE = 3;
const IMG = 4;
const EMOJ = 6;
const VIDEO = 8;

let scrennH = 0;
let androidH = 0;
let androidOff = 0;

export default {
	computed: {
		...mapState(['SocketState'])
	},
	components: {
		emotion
	},
	data() {
		return {
			//文字消息
			// dotsCurrent:1,
			textMsg: '',
			//消息列表
			isHistoryLoading: false,
			scrollAnimation: false,
			scrollTop: 0,
			scrollToView: '',
			total: 0,
			msgList: [],
			msgImgList: [],
			pagefrom: 1, // 当前页
			pagesize: 20, // 每页大小
			myuid: 0,
			dstid: 0, //对方ID
			toName: '', // 对方名称

			//录音相关参数
			// #ifndef H5
			//H5不能录音
			RECORDER: uni.getRecorderManager(),
			// #endif
			isVoice: false,
			voiceTis: '按住 说话',
			recordTis: '手指上滑 取消发送',
			recording: false,
			willStop: false,
			initPoint: { identifier: 0, Y: 0 },
			recordTimer: null,
			recordLength: 0,

			//播放语音相关参数
			AUDIO: uni.createInnerAudioContext(),
			playMsgid: null,
			VoiceTimer: null,
			// 抽屉参数
			popupLayerClass: '',
			// more参数
			hideMore: true,
			//表情定义
			hideEmoji: true,
			emojiList: [{}],
			emojiPath: '',

			//红包相关参数
			windowsState: '',
			redenvelopeData: {
				rid: null, //红包ID
				from: null,
				face: null,
				blessing: null,
				money: null
			},
			index: '' // 列表下标
		};
	},
	onLoad(option) {
		this.myuid = uni.getStorageSync('UID');
		this.dstid = option.id;
		this.toName = option.name;
		this.index = option.index;
		// 设置标题
		uni.setNavigationBarTitle({
			title: this.toName + ''
		});
		this.getMsgList();
		//语音自然播放结束
		this.AUDIO.onEnded(res => {
			this.playMsgid = null;
		});
		// #ifndef H5
		//录音开始事件
		this.RECORDER.onStart(e => {
			this.recordBegin(e);
		});
		//录音结束事件
		this.RECORDER.onStop(e => {
			this.recordEnd(e);
		});
		// #endif
		this.emojiList = emojiData.imgArr[1].emojiList;
		setTimeout(() => {
			let crSelect = uni.createSelectorQuery();
			crSelect
				.select('.msg-list')
				.boundingClientRect(res => {
					scrennH = res.height;
				})
				.exec();
		}, 300);
		uni.onWindowResize(res => {
			androidH = res.size.windowHeight;
			if (scrennH < androidH) {
				androidOff = androidH - scrennH;
			}
			this.isScrollBottom();
		});
	},
	onShow() {
		this.isScrollBottom();
	},
	onNavigationBarButtonTap() {
		// 监听原生标题栏按钮点击事件，参数为Object
		uni.showToast({
			title: '标题',
			duration: 2000
		});
	},
	onBackPress() {
		var pages = getCurrentPages();
		var currPage = pages[pages.length - 1]; //当前页面
		var prevPage = pages[pages.length - 2]; //上一个页面
		prevPage.UserList[this.index].num = '0'; // 将上一页的消息设为0
	},
	watch: {
		'SocketState.chartPage': function(val) {
			let State = this.$store.state.SocketState.chartPage;
			for (var i = 0; i < val.length; i++) {
				if (val[i].dstid == this.myuid) {
					this.screenMsg(val[i]);
					State.splice(i, 1);
					this.$store.state.SocketState.chartPage = State;
				}
			}
		}
	},
	methods: {
		isScrollBottom() {
			setTimeout(() => {
				uni.createSelectorQuery()
					.select('.chatBox')
					.boundingClientRect(res => {
						if (this.isIos) {
							if (scrennH < res.height) {
								this.scrollTop = res.height - scrennH;
							}
						} else {
							if (androidH < res.height) {
								this.scrollTop = res.height - androidH + androidOff;
							}
						}
					})
					.exec();
			}, 100);
		},
		yuyintonghua() {
			this.showtext();
		},
		weizhi() {
			this.showtext();
		},
		yuyinshuru() {
			this.showtext();
		},
		meShouchang() {
			this.showtext();
		},
		userinfo() {
			this.showtext();
		},
		showtext() {
			uni.showToast({
				title: '敬请期待',
				icon: 'none'
			});
		},
		// 接受消息(筛选处理)
		screenMsg(msg) {
			//从长连接处转发给这个方法，进行筛选处理
			if (msg.type == 1) {
				// 系统消息
				switch (msg.media) {
					case TEXT:
						this.addSystemTextMsg(msg);
						break;
					case 'redEnvelope':
						this.addSystemRedEnvelopeMsg(msg);
						break;
				}
			} else if (msg.type == 2) {
				// 用户消息
				switch (msg.media) {
					case TEXT:
						this.addTextMsg(msg);
						break;
					case VOICE:
						this.addVoiceMsg(msg);
						break;
					case IMG:
						this.addImgMsg(msg);
						break;
					case 'redEnvelope':
						this.addRedEnvelopeMsg(msg);
						break;
				}
				//非自己的消息震动
				if (msg.userid != this.myuid) {
					// console.log('振动');
					let s = uni.getStorageSync('shock');
					if (s) {
						uni.vibrateLong();
					}
				}
			}
			// 滚动到底部
			this.isScrollBottom();
		},
		//触发滑动到顶部(加载历史信息记录)
		loadHistory(e) {},
		// 加载初始页面消息
		getMsgList() {
			// 获取记录列表
			this.$http
				.post('/message/chathistory', {
					userid: this.myuid,
					dstid: this.dstid,
					cmd: CMD,
					pagefrom: this.pagefrom,
					pagesize: this.pagesize
				})
				.then(res => {
					if (res.code == 0) {
						// 获取消息中的图片,并处理显示尺寸
						let list = res.rows;
						for (let i = res.total; i > 0; i--) {
							if (list[i - 1].type == 2 && list[i - 1].media == IMG) {
								list[i - 1].url = this.imageUrl(list[i - 1].url);
								this.msgImgList.push(list[i - 1].url);
							}
							this.msgList.push(list[i - 1]);
						}
						this.total = res.total;
					}
				})
				.catch(err => {});
		},
		//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
		setPicSize(content) {
			// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
			let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
			let maxH = uni.upx2px(350); //350是定义消息图片最大高度
			if (content.w > maxW || content.h > maxH) {
				let scale = content.w / content.h;
				content.w = scale > 1 ? maxW : maxH * scale;
				content.h = scale > 1 ? maxW / scale : maxH;
			}
			return content;
		},
		//更多功能(点击+弹出)
		showMore() {
			this.isVoice = false;
			this.hideEmoji = true;
			if (this.hideMore) {
				this.hideMore = false;
				this.openDrawer();
			} else {
				this.hideDrawer();
			}
		},
		// 打开抽屉
		openDrawer() {
			this.popupLayerClass = 'showLayer';
		},
		// 隐藏抽屉
		hideDrawer() {
			this.popupLayerClass = '';
			setTimeout(() => {
				this.hideMore = true;
				this.hideEmoji = true;
			}, 150);
		},
		// 选择图片发送
		chooseImage() {
			this.getImage('album');
		},
		//拍照发送
		camera() {
			this.getImage('camera');
		},
		//发红包
		handRedEnvelopes() {
			this.showtext();
			return;
			uni.navigateTo({
				url: 'HM-hand/HM-hand'
			});
			this.hideDrawer();
		},
		//选照片 or 拍照
		getImage(type) {
			this.hideDrawer();
			uni.chooseImage({
				sourceType: [type],
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: res => {
					for (let i = 0; i < res.tempFilePaths.length; i++) {
						// 上传图片
						uni.uploadFile({
							url: uni.getStorageSync('URL') + '/attach/upload', //仅为示例，非真实的接口地址
							filePath: res.tempFilePaths[i],
							name: 'file',
							sizeType: ['compressed'],
							success: r => {
								let ret = JSON.parse(r.data);
								if (ret.code == 0) {
									// {id:1,userid:2,dstid:3,cmd:10,media:4,url:"http://www.baidu.com/a/log,jpg"}
									var nowDate = new Date();
									let msg = {
										userid: this.myuid,
										dstid: parseInt(this.dstid),
										cmd: CMD,
										media: IMG,
										url: ret.data,
										time: nowDate.getHours() + ':' + nowDate.getMinutes(),
										type: 2,
										username: uni.getStorageSync('nickname'),
										face: uni.getStorageSync('avatar')
									};
									this.sendMsg(msg);
								} else {
									uni.showToast({
										title: ret.msg,
										duration: 2000
									});
								}
							}
						});
						// uni.getImageInfo({
						// 	src: res.tempFilePaths[i],
						// 	success: image => {
						// 		let msg = { url: res.tempFilePaths[i], w: image.width, h: image.height };
						// 		this.sendMsg(msg, 'img');
						// 	}
						// });
					}
				}
			});
		},
		// 选择表情
		chooseEmoji() {
			this.hideMore = true;
			if (this.hideEmoji) {
				this.hideEmoji = false;
				this.openDrawer();
			} else {
				this.hideDrawer();
			}
		},
		//添加表情
		addEmoji(em) {
			//判断删除按钮
			if (em.emojiItem.alt === '[删除]') {
				//  uni.showToast({
				//  	title:"触发删除操作",
				// icon:"none"
				//  })
				var str;
				var msglen = this.textMsg.length - 1;
				let start = this.textMsg.lastIndexOf('[');
				let end = this.textMsg.lastIndexOf(']');
				let len = end - start;
				if (end != -1 && end === msglen && len >= 2 && len <= 4) {
					// 表情字符
					str = this.textMsg.slice(0, start);
				} else {
					// 普通键盘输入汉字 或者字符
					str = this.textMsg.slice(0, msglen);
				}
				this.textMsg = str;
				return;
			}
			// console.log(em)
			this.emojiList = emojiData.imgArr[em.groupIndex].emojiList;
			this.emojiPath = emojiData.imgArr[em.groupIndex].emojiPath;
			if (em.minEmoji === false) {
				this.sendBigEmoji(em.emojiItem.url);
			} else {
				// this.textMsg+=em.alt;
				this.textMsg += em.emojiItem.alt;
			}
		},
		// 发送大表情
		sendBigEmoji(url) {
			this.hideDrawer(); //隐藏抽屉
			if (!url) {
				return;
			}
			let imgstr = '<img style="width:48px;height:48px;" src="' + this.emojiPath + url + '">';
			let content = '<div style="align-items: center;word-wrap:break-word;">' + imgstr + '</div>';

			var nowDate = new Date();
			let msg = {
				userid: this.myuid,
				dstid: parseInt(this.dstid),
				cmd: CMD,
				media: TEXT,
				content: content,
				time: nowDate.getHours() + ':' + nowDate.getMinutes(),
				type: 2,
				username: uni.getStorageSync('nickname'),
				face: uni.getStorageSync('avatar')
			};
			this.sendMsg(msg);
			this.textMsg = ''; //清空输入框
		},
		//获取焦点，如果不是选表情ing,则关闭抽屉
		textareaFocus() {
			if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
				this.hideDrawer();
			}
		},
		// 发送文字消息
		sendText() {
			// uni.showToast({
			// 	title: '发送文本消息',
			// 	icon: 'none'
			// });
			this.hideDrawer(); //隐藏抽屉
			if (!this.textMsg) {
				return;
			}
			let content = this.replaceEmoji(this.textMsg);

			var nowDate = new Date();
			let msg = {
				userid: this.myuid,
				dstid: parseInt(this.dstid),
				cmd: CMD,
				media: TEXT,
				content: content,
				time: nowDate.getHours() + ':' + nowDate.getMinutes(),
				type: 2,
				username: uni.getStorageSync('nickname'),
				face: uni.getStorageSync('avatar')
			};

			this.sendMsg(msg);
			this.textMsg = ''; //清空输入框
		},
		//替换表情符号为图片
		replaceEmoji(str) {
			// 正则表达式匹配内容
			let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
				// console.log("item: " + item);
				for (let i = 0; i < this.emojiList.length; i++) {
					let row = this.emojiList[i];
					for (let j = 0; j < row.length; j++) {
						let EM = row[j];
						if (EM.alt == item) {
							let onlinePath = this.emojiPath;
							let imgstr = '<img style="width:24px;height:24px;" src="' + onlinePath + EM.url + '">';
							// console.log("imgstr: " + imgstr);
							return imgstr;
						}
					}
				}
			});
			return '<div style="align-items: center;word-wrap:break-word;">' + replacedStr + '</div>';
		},
		// 发送消息
		sendMsg(msg) {
			//实际应用中，此处应该提交长连接，模板仅做本地处理。
			this.$store.commit('webSocketSend', msg);
			// 发送消息到接收消息
			this.screenMsg(msg);
			// 定时器模拟对方回复,三秒

			// setTimeout(() => {
			// 	lastid = this.msgList[this.msgList.length - 1].msg.id;
			// 	lastid++;
			// 	msg = {
			// 		type: 'user',
			// 		msg: {
			// 			id: lastid,
			// 			time: nowDate.getHours() + ':' + nowDate.getMinutes(),
			// 			type: type,
			// 			userinfo: { uid: 1, username: '售后客服008', face: '/static/img/im/face/face_2.jpg' },
			// 			content: content
			// 		}
			// 	};
			// 	// 本地模拟发送消息
			// 	this.screenMsg(msg);
			// }, 100);
		},

		// 添加文字消息到列表
		addTextMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加语音消息到列表
		addVoiceMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加图片消息到列表
		addImgMsg(msg) {
			// msg.content = this.setPicSize(msg.content);
			msg.url = this.imageUrl(msg.url);
			this.msgImgList.push(msg.url);
			this.msgList.push(msg);
		},
		addRedEnvelopeMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加系统文字消息到列表
		addSystemTextMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加系统红包消息到列表
		addSystemRedEnvelopeMsg(msg) {
			this.msgList.push(msg);
		},
		// 打开红包
		openRedEnvelope(msg, index) {
			let rid = msg.content.rid;
			uni.showLoading({
				title: '加载中...'
			});
			// console.log("index: " + index);
			//模拟请求服务器效果
			setTimeout(() => {
				//加载数据
				if (rid == 0) {
					this.redenvelopeData = {
						rid: 0, //红包ID
						from: uni.getStorageSync('nickname'),
						face: '/static/img/im/face/face.jpg',
						blessing: '恭喜发财，大吉大利',
						money: '已领完'
					};
				} else {
					this.redenvelopeData = {
						rid: 1, //红包ID
						from: '售后客服008',
						face: '/static/img/im/face/face_2.jpg',
						blessing: '恭喜发财',
						money: '0.01'
					};
					if (!msg.content.isReceived) {
						// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
						this.sendSystemMsg({ text: '你领取了' + (msg.userinfo.uid == this.myuid ? '自己' : msg.userinfo.username) + '的红包' }, 'redEnvelope');
						// console.log("this.msgList[index]: " + JSON.stringify(this.msgList[index]));
						this.msgList[index].msg.content.isReceived = true;
					}
				}
				uni.hideLoading();
				this.windowsState = 'show';
			}, 200);
		},
		// 关闭红包弹窗
		closeRedEnvelope() {
			this.windowsState = 'hide';
			setTimeout(() => {
				this.windowsState = '';
			}, 200);
		},
		sendSystemMsg(content, type) {
			let lastid = this.msgList[this.msgList.length - 1].msg.id;
			lastid++;
			let row = { type: 'system', msg: { id: lastid, type: type, content: content } };
			this.screenMsg(row);
		},
		//领取详情
		toDetails(rid) {
			uni.navigateTo({
				url: 'HM-details/HM-details?rid=' + rid
			});
		},
		// 预览图片
		showPic(url) {
			uni.previewImage({
				indicator: 'none',
				current: url,
				urls: this.msgImgList
			});
		},
		// 播放语音
		playVoice(url, index) {
			this.playMsgid = index;
			this.AUDIO.src = url;
			this.$nextTick(function() {
				this.AUDIO.play();
			});
		},
		// 录音开始
		voiceBegin(e) {
			if (e.touches.length > 1) {
				return;
			}
			this.initPoint.Y = e.touches[0].clientY;
			this.initPoint.identifier = e.touches[0].identifier;
			this.RECORDER.start({ format: 'mp3' }); //录音开始,
		},
		//录音开始UI效果
		recordBegin(e) {
			this.recording = true;
			this.voiceTis = '松开 结束';
			this.recordLength = 0;
			this.recordTimer = setInterval(() => {
				this.recordLength++;
			}, 1000);
		},
		// 录音被打断
		voiceCancel() {
			this.recording = false;
			this.voiceTis = '按住 说话';
			this.recordTis = '手指上滑 取消发送';
			this.willStop = true; //不发送录音
			this.RECORDER.stop(); //录音结束
		},
		// 录音中(判断是否触发上滑取消发送)
		voiceIng(e) {
			if (!this.recording) {
				return;
			}
			let touche = e.touches[0];
			//上滑一个导航栏的高度触发上滑取消发送
			if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
				this.willStop = true;
				this.recordTis = '松开手指 取消发送';
			} else {
				this.willStop = false;
				this.recordTis = '手指上滑 取消发送';
			}
		},
		// 结束录音
		voiceEnd(e) {
			if (!this.recording) {
				return;
			}
			this.recording = false;
			this.voiceTis = '按住 说话';
			this.recordTis = '手指上滑 取消发送';
			this.RECORDER.stop(); //录音结束
		},
		//录音结束(回调文件)
		recordEnd(e) {
			clearInterval(this.recordTimer);
			if (!this.willStop) {
				// console.log('e: ' + JSON.stringify(e));
				// let msg = {
				// 	length: 0,
				// 	url: e.tempFilePath
				// };
				// // 上传图片
				let min = parseInt(this.recordLength / 60);
				let sec = this.recordLength % 60;
				min = min < 10 ? '0' + min : min;
				sec = sec < 10 ? '0' + sec : sec;
				if (min == '00' && sec == '00') {
					// 长度都为0
					return false;
				}
				uni.uploadFile({
					url: uni.getStorageSync('URL') + '/attach/upload',
					filePath: e.tempFilePath,
					name: 'file',
					success: r => {
						let ret = JSON.parse(r.data);
						if (ret.code == 0) {
							// {id:1,userid:2,dstid:3,cmd:10,media:4,url:"http://www.baidu.com/a/log,jpg"}
							var nowDate = new Date();
							let msg = {
								userid: this.myuid,
								dstid: parseInt(this.dstid),
								cmd: CMD,
								media: VOICE,
								url: ret.data,
								amount: 0,
								time: nowDate.getHours() + ':' + nowDate.getMinutes(),
								type: 2,
								username: uni.getStorageSync('nickname'),
								face: uni.getStorageSync('avatar')
							};
							msg.amount = min + ':' + sec;
							this.sendMsg(msg);
						} else {
							uni.showToast({
								title: ret.msg,
								duration: 2000
							});
						}
					}
				});
				// this.sendMsg(msg, 'voice');
			} else {
				// console.log('取消发送录音');
			}
			this.willStop = false;
		},
		// 切换语音/文字输入
		switchVoice() {
			this.hideDrawer();
			this.isVoice = this.isVoice ? false : true;
		},
		discard() {
			return;
		},
		//监听image加载完成
		onImageLoad(key, index) {
			this.$set(this[key][index], 'loaded', 'loaded');
		},
		//监听image加载失败
		onImageError(key, index) {
			this[key][index].DefaultPicURL = '/static/img/errorImage.jpg';
		},
		imageUrl(url) {
			if (url.substring(0, 4) == 'http') {
				return url;
			} else {
				return uni.getStorageSync('ImageURL') + url;
			}
		}
	}
};
</script>
<style lang="scss">
@import '@/static/HM-chat/css/style.scss';
</style>
