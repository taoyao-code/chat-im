<template>
	<view class="container">
		
		<!--
		 marign与transform的区别:
		 
		 marign:外边距可以改变元素的位移。
		浏览器页面渲染时margin可以控制元素的位置,
		同时会改变render tree的结构,会引起页面layout回流和repaint重绘。
		从浏览器性能考虑,transform会比margin更省时间。
		transform实际上也是用到了GPU加速,占用了内存,
		合成器会负责将层合成绘制为最终的屏幕画面。在硬件加速体系结构，合成由GPU负责。
		在chrome浏览器多进程模型中，有一个专门的进程来负责传递Render进程的命令，即GPU进程。
		Render进程和GPU进程是通过共享内存传递的。
		Render进程可以快速的将命令发给命令缓冲区,
		并且返回到CPU密集的render活动中,留给GPU进程去处理这些命令。
		我们可以充分利用多内核机器上的GPU进程和CPU进程。
		这也是为什么GPU会加速渲染,使transform渲染速度更快的又一原因。
		
		
		浏览器取回代码后,首先会构造DOM树,根据HTML标签,构造DOM树。
		之后会解析CSS样式,
		1、解析的顺序是浏览器的样式 -> 
		2、用户自定义的样式 -> 
		3、页面的link标签等引进来的样式 -> 
		4、写在style标签里面的内联样式
		
		最后根据DOM树以及解析的CSS样式,
		构造RENDER树,在RENDER树中,会把DOM树中没有的元素给去除,
		比如head标签以及里面的内容,以及display:none的元素也会被去除。
		
		重绘(repaint)和重排(reflow):
		当DOM的变化影响了元素的几何属性（宽或高）,
		浏览器需要重新计算元素的几何属性,
		同样其他元素的几何属性和位置也会因此受到影响。
		浏览器会使渲染树中受到影响的部分失效,并重新构造渲染树。这个过程称为重排。
		完成重排后,浏览器会重新绘制受影响的部分到屏幕,该过程称为重绘。
		并不是所有的DOM变化都会影响几何属性,比如改变一个元素的背景色并不会影响元素的宽和高,
		这种情况下只会发生重绘。
		重排必然导致重绘,所以重排更加恶心。其实我们一直研究的应该是怎么避免触发多次重排。
		
		transform是否可以避免重排重绘问题:
		那么使用CSS3的transform来实现动画是否可以避免重排问题？或者说浏览器针对这一部分做了其他优化？

		CSS的最终表现分为以下四步：Recalculate Style -> Layout -> Paint Setup and Paint -> Composite Layers
		按照中文的意思大致是 查找并计算样式 -> 排布 -> 绘制 -> 组合层
		这上面的几个步骤有点类似于上文说到的重排必定导致重绘，而查询属性会强制发生重排。
		所以上文提到的重排重绘内容可以结合这里进行理解。
		由于transform是位于Composite Layers层,而width、left、margin等则是位于Layout层,在Layout层发生的改变必定导致Paint Setup and Paint -> Composite Layers
		所以相对而言使用transform实现的动画效果肯定比left这些更加流畅。
		而且就算抛开这一角度，在另一方面浏览器也会针对transform等开启GPU加速。
	-->
		
		<!-- <view class="emojiList" 
		        :style="[{'margin-left': emojiMarginLeft + 'px'},{'width':emojiWidth+'px'},{'transition': transition }]"
			    @touchstart="gtouchstart($event)" 
				@touchmove="gtouchmove($event)" 
				@touchend="gtouchend($event)"> -->
			
			<view class="emojiList"
			        :style="[{'transform': 'translateX(' + emojiMarginLeft + 'px)'},{'width':emojiWidth+'px'},{'transition': transition }]"
				    @touchstart="gtouchstart($event)" 
					@touchmove="gtouchmove($event)" 
					@touchend="gtouchend($event)">	
				<view class="item"> 
					<view v-for="(item1,index1) in beforeList" :key="index1">
					   <image   
					   v-if="item1.url!=''" 
					   :src="items[groupIndex -1].minEmoji && index1===beforeList.length -1  ? item1.url : items[groupIndex -1].emojiPath + item1.url " 
					   class="emojiImg"
					   :class="[{ 'minImg' : items[groupIndex-1].minEmoji },{'bigImg' : !items[groupIndex-1].minEmoji }]"
					   /> 
					     
					  <view v-else 
					   class="emojiImg"
					   :class="[{ 'minImg' : items[groupIndex-1].minEmoji },{'bigImg' : !items[groupIndex-1].minEmoji }]">
					   </view>
					    
					</view>
				</view> 
				
				
				<view class="item"  v-for="(item3,index3) in items[groupIndex].emojiList" :key="index3" >
					<view v-for="(em4,index4) in item3" :key="index4" >
						<image :src="items[groupIndex].minEmoji && index4 === item3.length-1 ? em4.url : items[groupIndex].emojiPath + em4.url "
						class="emojiImg"
						:class="[{ 'minImg' : items[groupIndex].minEmoji },{'bigImg' : !items[groupIndex].minEmoji }]"
						@tap="imgClick($event,items[groupIndex],em4,groupIndex)"
						/>
						
						<!-- <img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif"/> -->
					</view>
				</view>
				 <!-- 最后一个 -->
				 <view class="item" >
				 		   <view v-for="(item5,index5) in nextList" :key="index5" >
				 			   <image 
				 			   v-if="item5.url!=''" 
				 			   :src="items[groupIndex +1].minEmoji && index5 === nextList.length -1  ? item5.url : items[groupIndex +1].emojiPath + item5.url " 
				 			    class="emojiImg"
				 			   :class="[{ 'minImg' : items[groupIndex+1].minEmoji },{'bigImg' : !items[groupIndex+1].minEmoji }]"/>
				 		           
				 		  <view v-else 
				 		       class="emojiImg"
				 			   :class="[{ 'minImg' : items[groupIndex+1].minEmoji },{'bigImg' : !items[groupIndex+1].minEmoji }]">
				 		  </view>
				 		</view> 
				 			   
				 </view> 
			  
		    </view>
			
		    <view class="point">
				<view class="point-item" v-for="(item7,index7) in pointItemList" :key="index7" 
				:class="{'active':activeIndex -1 ===index7}"></view>
		    </view>
		    <!-- <image src="../../static/img/tab/add2.png" @tap="addEmojiPackage"
		    style="float:left;margin-top: -64px; margin-left: 12px; width: 32px;height: 32px;"
		     /> -->
				<scroll-view 
					class="scroll-view_H" 
					scroll-x="true" 
					@scroll="scroll" 
					scroll-left="120">
					
					<view  class="scroll-view-item_H" 
					v-for="(emoji,index) in items" :key="index"
					v-if="index!==0 && index!==items.length-1"
					>
						<image style="width: 32px;height: 32px;" 
						@tap="selectTab(1,index)"
						:src="emoji.emojiPath + emoji.emojiList[0][0].url" 
						:class="{'activeEmojiTab':activeEmojiTab ===index}"
						/>
					</view>
					
				</scroll-view>
			
			<!-- <image src="../../static/img/tab/setting.png" @tap="settingEmoji"
			style="float:left;margin-top: -64px; margin-left: 320px; width: 32px;height: 32px;"
			   > -->
	
		 <view class="toast" v-show="toastShow">
		      {{toastText}}
		 </view>
		 
	</view>
</template>

<script>
	import emojiData from "../../static/emoji/emojiData.js"
			
	var windowWidth=0
	uni.getSystemInfo({
	    success: function (res) {
			windowWidth=res.windowWidth
	    }
	});
				  
	export default {
		// 接受父组件参数，单向数据流
		props: {
		
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				emojiWidth: windowWidth * 8,
				emojiMarginLeft:- windowWidth,
				transition:'transform 0 ease-in 0',
				
				toastShow: false,
				toastText: '',
				beginX:0,
				beforeList:[{}],
				nextList:[{}],
				nowX:0,
				endX:0,
				activeEmojiTab:1,
				activeIndex:1,
				groupSize: emojiData.imgArr.length,         // 表情包的组的个数
				groupIndex:1,         // 当前整个表情包的所在位置索引
				items: emojiData.imgArr,
				pointItemList:0,
				// list: [
				// 	['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴'],
				// 	['睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过'],
				// 	['酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢'],
				// 	['饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂'],
				// 	['疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见'],
				// 	['擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠'],
				// 	['鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀'],
				// 	['西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰'],
				// 	['凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀'],
				// 	['足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强'],
				// 	['弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你'],
				// 	['NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈'],
				// 	['磕头', '回头', '跳绳', '挥手', '激动', '街舞', '左太极', '右太极']
				// ],
				// reg: /\S{1,3}/gi,
				// item: []
			}
		},
		created() {
			 this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
			 this.emojiMarginLeft= - windowWidth * this.activeIndex
			 // this.transition='none'
			 
			// // 初始化
			this.pointItemList=this.items[this.groupIndex].emojiList.length
			// console.log(this.pointItemList)
			this.beforeList =this.items[this.groupIndex-1].emojiList[this.items[this.groupIndex-1].emojiList.length-1]
			this.nextList =this.items[this.groupIndex+1].emojiList[0]	
		 },
		 
		onLoad: function () {
			const res = uni.getSystemInfoSync();
			this.style.pageHeight = res.windowHeight;
			// console.log(uni.getSystemInfoSync().screenWidth)
			this.style.contentViewHeight = res.windowHeight - uni.getSystemInfoSync().screenWidth / 750 * (100); //像素
		},
		methods: {
			selectTab:function(activeIndex,index){
				// this.toast("选择表情包:" + index + "激活索引:"+activeIndex)
				
				this.activeIndex=activeIndex
				this.groupIndex=index
				this.activeEmojiTab=index
				
				this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
				this.emojiMarginLeft= - windowWidth * this.activeIndex
				// this.transition="none"
				this.beforeList =this.items[this.groupIndex-1].emojiList[this.items[this.groupIndex-1].emojiList.length-1]
				this.nextList =this.items[this.groupIndex+1].emojiList[0]
				this.pointItemList=this.items[this.groupIndex].emojiList.length
				
			},	
			addEmojiPackage:function(){
				this.toast("添加表情包")
			},
			settingEmoji:function(){
				this.toast("设置表情")
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon:"none",
					title:"纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 开始触摸
			gtouchstart:function(e){
				this.beginX=e.touches[0].clientX
				// this.toast('开始: ' + this.beginX + '')
			},
			// 移动
			gtouchmove:function(e){
				this.nowX=e.changedTouches[0].clientX
				// console.log(e)
				// this.toast('移动: ' + this.nowX + '')
				this.slice()
			},
			// 结束触摸
			gtouchend:function(e){
				this.endX=e.changedTouches[0].clientX
				// this.toast('结束: ' + this.endX + '')
				this.judgeMove()
			},
			
			/**
			 * 计算偏移量
			 */
			judgeMove : function(){
				var deltaX = this.endX - this.beginX
			    if(deltaX >= windowWidth * 3 / 5){  // 右移
				     // this.toast('上一张')
					// [1]小点指示器 减去 1
					this.activeIndex--
					// [2]小点指示器边界判断, 小于等于 0, 重新赋值为 1
			         if(this.activeIndex <= 0 ){	 
						 // [3]当 activeIndex 小于等于0 时, 组的索引 减去 1
						 this.groupIndex --
						 var transition=''
						// [4]groupIndex 组的边界判断 小于等于 0, 重新赋值为 1,并且指示器 activeIndex 为 1
						 if(this.groupIndex <= 0){     
						 	this.groupIndex = 1 
						 	this.pointItemList = this.items[1].emojiList.length
						 	this.activeIndex = 1
							// transition='margin-left .2s ease-out'
						 }else{
								this.pointItemList = this.items[this.groupIndex].emojiList.length
						 		this.activeIndex = this.items[this.groupIndex].emojiList.length
						        // transition='none'
								 this.selectTab(this.activeIndex,this.groupIndex)
						 } 
						 
						 this.beforeList =this.items[this.groupIndex-1].emojiList[this.items[this.groupIndex-1].emojiList.length-1]
						 this.nextList =this.items[this.groupIndex+1].emojiList[0]
						 
						 
						 this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
						 this.emojiMarginLeft= - windowWidth * this.activeIndex
						 // this.transition=transition
						 
						
			         }else{
						 
						 this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
						 this.emojiMarginLeft= - windowWidth * this.activeIndex
						 // this.transition='none'
						 
			         }
			    }else if (deltaX <= - windowWidth * 3 / 5){ // 左移
			        // this.toast('下一张')
					// [1]小点指示器 加 1
					++this.activeIndex
					// [2]小点指示器边界判断, 大于等于 items.length -2, 重新赋值为 items.length -2
			         if(this.activeIndex > this.items[this.groupIndex].emojiList.length ){ 
					// 最后一次改变 组的值
					 	 ++this.groupIndex 
						 var transition=''
					     // this.toast("组数:"+vm.groupIndex +",组个数:" + vm.groupSize)
					    // 判断是否是最后一组
					 	if(this.groupIndex > this.groupSize -2){
					        // 等于1 是循环,等于 vm.groupSize 是结束, 去掉前一个和后一个为空的列表
					 		this.groupIndex = this.groupSize -2 
					 		this.pointItemList = this.items[this.groupIndex].emojiList.length
					 		this.activeIndex = this.items[this.groupIndex].emojiList.length
							// transition='margin-left .2s ease-out'
							
					 	}else{
					 		this.pointItemList = this.items[this.groupIndex].emojiList.length
					 		this.activeIndex = 1
							// transition='none'
							this.selectTab(1,this.groupIndex)
					 	} 
						
						this.beforeList =this.items[this.groupIndex-1].emojiList[this.items[this.groupIndex-1].emojiList.length-1]
						this.nextList =this.items[this.groupIndex+1].emojiList[0]
						
						this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
						this.emojiMarginLeft= - windowWidth * this.activeIndex
						// this.transition=transition
						
			          }else{
						  
						  this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
						  this.emojiMarginLeft= - windowWidth * this.activeIndex
						  // this.transition='none'
					 }
			    } else{
					// this.toast('不动')
			        this.reset()
			    }
			},
			
			/**
			 * 计算起始位置
			 */
			slice: function () {
			    var deltaX = this.nowX - this.beginX
				
				this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
				this.emojiMarginLeft= - windowWidth * this.activeIndex + deltaX
				// this.transition='none'
			},
			/**
			 * 重置
			 */
			reset : function(){
				
				this.emojiWidth=  windowWidth * (this.items[this.groupIndex].emojiList.length + 2)
				this.emojiMarginLeft= - windowWidth * this.activeIndex
				// this.transition='all .2s ease-out'
			},
			
			imgClick:function(e,emojiList,emojiItem,groupIndex){
				// this.toast('表情: ' + emojiItem.alt + ':' + emojiItem.url)
				// let emotion = '<img src="' + emojiPath + emojiItem.url + '"/>'
				this.$emit('addEmoji',{
					emojiPath:emojiList.emojiPath,
					minEmoji:emojiList.minEmoji,
					emojiItem:emojiItem,
					groupIndex:groupIndex
				})
			},
			// 自定义 toast 弹窗
			toast: function (str) {
			   let me = this
				if(str.length>0){
					me.toastText = str
					me.toastShow = true
					setTimeout(function(){
					  me.toastShow = false
					  me.toastText = ""
					}, 1500)
				 }
			 } 
			// clickHandler(i) {
				
			// 	let emotion = `#${i};`
			// 	this.$emit('emotion', emotion)
			// },
			// emotion(res) {
			// 	//let word = res.replace(/\#|\;/gi,'')
			// 	const list = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极']
			// 	let index = list.indexOf(res)
			// 	return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`
			// }
		}
	}
</script>

<style scoped>
	@import url("../../static/css/vue-emoji.css");
	
		.scroll-view_H {
			/* border:2px solid red; */
			white-space: nowrap;
			width: 76%;
			margin-top: -128upx;
			margin-left: 96upx;
		}
	
		.scroll-view-item_H {
			display: inline-block;
			width: 20%;
			height: 100upx;
			line-height: 100upx;
			text-align: center;
			font-size: 16upx;
		}
		
		.activeEmojiTab{
		   background-color: gray;
		   opacity: 0.8;
		   border-radius: 20upx;
		}	
</style>
