//模拟数据
var emojiData = {
	"imgArr": [{
			emojiName: "",
			emojiSort: 0,
			minEmoji: false,
			emojiPath: "",
			emojiList: []
		},
		{
			// QQ 表情
			emojiName: "QQemoji",
			emojiSort: 1,
			minEmoji: true,
			emojiPath: "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/",
			// emojiPath: "static/img/qq/",
			emojiList: [
				[{
						url: '0.gif',
						alt: '[微笑]'
					},
					{
						url: '1.gif',
						alt: '[撇嘴]'
					},
					{
						url: '2.gif',
						alt: '[色]'
					},
					{
						url: '3.gif',
						alt: '[发呆]'
					},
					{
						url: '4.gif',
						alt: '[得意]'
					},
					{
						url: '5.gif',
						alt: '[流泪]'
					},
					{
						url: '6.gif',
						alt: '[害羞]'
					},
					{
						url: '7.gif',
						alt: '[闭嘴]'
					},
					{
						url: '8.gif',
						alt: '[睡]'
					},
					{
						url: '9.gif',
						alt: '[大哭]'
					},
					{
						url: '10.gif',
						alt: '[尴尬]'
					},
					{
						url: '11.gif',
						alt: '[发怒]'
					},
					{
						url: '12.gif',
						alt: '[调皮]'
					},
					{
						url: '13.gif',
						alt: '[呲牙]'
					},
					{
						url: '14.gif',
						alt: '[惊讶]'
					},
					{
						url: '15.gif',
						alt: '[难过]'
					},
					{
						url: '16.gif',
						alt: '[酷]'
					},
					{
						url: '17.gif',
						alt: '[冷汗]'
					},
					{
						url: '18.gif',
						alt: '[抓狂]'
					},
					{
						url: '19.gif',
						alt: '[吐]'
					},
					{
						url: 'static/img/tab/delete2.png',
						alt: '[删除]'
					}

				],
				[{
						url: '20.gif',
						alt: '[偷笑]'
					},
					{
						url: '21.gif',
						alt: '[愉快]'
					},
					{
						url: '22.gif',
						alt: '[白眼]'
					},
					{
						url: '23.gif',
						alt: '[傲慢]'
					},
					{
						url: '24.gif',
						alt: '[饥饿]'
					},
					{
						url: '25.gif',
						alt: '[困]'
					},
					{
						url: '26.gif',
						alt: '[惊恐]'
					},
					{
						url: '27.gif',
						alt: '[流汗]'
					},
					{
						url: '28.gif',
						alt: '[憨笑]'
					},
					{
						url: '29.gif',
						alt: '[悠闲]'
					},
					{
						url: '30.gif',
						alt: '[奋斗]'
					},
					{
						url: '31.gif',
						alt: '[咒骂]'
					},
					{
						url: '32.gif',
						alt: '[疑问]'
					},
					{
						url: '33.gif',
						alt: '[嘘]'
					},
					{
						url: '34.gif',
						alt: '[晕]'
					},
					{
						url: '35.gif',
						alt: '[疯了]'
					},
					{
						url: '36.gif',
						alt: '[衰]'
					},
					{
						url: '37.gif',
						alt: '[骷髅]'
					},
					{
						url: '38.gif',
						alt: '[敲打]'
					},
					{
						url: '39.gif',
						alt: '[再见]'
					},

					{
						url: 'static/img/tab/delete2.png',
						alt: '[删除]'
					}
				],
				[{
						url: '40.gif',
						alt: '[擦汗]'
					},
					{
						url: '41.gif',
						alt: '[抠鼻]'
					},
					{
						url: '42.gif',
						alt: '[鼓掌]'
					},
					{
						url: '43.gif',
						alt: '[糗大了]'
					},
					{
						url: '44.gif',
						alt: '[坏笔]'
					},
					{
						url: '45.gif',
						alt: '[左哼哼]'
					},
					{
						url: '46.gif',
						alt: '[右哼哼]'
					},
					{
						url: '47.gif',
						alt: '[哈欠]'
					},
					{
						url: '48.gif',
						alt: '[鄙视]'
					},
					{
						url: '49.gif',
						alt: '[委屈]'
					},
					{
						url: '50.gif',
						alt: '[快哭了]'
					},
					{
						url: '51.gif',
						alt: '[阴险]'
					},
					{
						url: '52.gif',
						alt: '[亲亲]'
					},
					{
						url: '53.gif',
						alt: '[吓]'
					},
					{
						url: '54.gif',
						alt: '[可怜]'
					},
					{
						url: '55.gif',
						alt: '[菜刀]'
					},
					{
						url: '56.gif',
						alt: '[西瓜]'
					},
					{
						url: '57.gif',
						alt: '[啤酒]'
					},
					{
						url: '58.gif',
						alt: '[篮球]'
					},
					{
						url: '59.gif',
						alt: '[乒乓]'
					},

					{
						url: 'static/img/tab/delete2.png',
						alt: '[删除]'
					}
				],
				[{
						url: '60.gif',
						alt: '[咖啡]'
					},
					{
						url: '61.gif',
						alt: '[饭]'
					},
					{
						url: '62.gif',
						alt: '[猪头]'
					},
					{
						url: '63.gif',
						alt: '[玫瑰]'
					},
					{
						url: '64.gif',
						alt: '[凋谢]'
					},
					{
						url: '65.gif',
						alt: '[嘴唇]'
					},
					{
						url: '66.gif',
						alt: '[爱心]'
					},
					{
						url: '67.gif',
						alt: '[心碎]'
					},
					{
						url: '68.gif',
						alt: '[蛋糕]'
					},
					{
						url: '69.gif',
						alt: '[闪电]'
					},
					{
						url: '70.gif',
						alt: '[炸弹]'
					},
					{
						url: '71.gif',
						alt: '[刀]'
					},
					{
						url: '72.gif',
						alt: '[足球]'
					},
					{
						url: '73.gif',
						alt: '[瓢虫]'
					},
					{
						url: '74.gif',
						alt: '[便便]'
					},
					{
						url: '75.gif',
						alt: '[月亮]'
					},
					{
						url: '76.gif',
						alt: '[太阳]'
					},
					{
						url: '77.gif',
						alt: '[礼物]'
					},
					{
						url: '78.gif',
						alt: '[拥抱]'
					},
					{
						url: '79.gif',
						alt: '[强]'
					},

					{
						url: 'static/img/tab/delete2.png',
						alt: '[删除]'
					}
				],
				[{
						url: '80.gif',
						alt: '[弱]'
					},
					{
						url: '81.gif',
						alt: '[握手]'
					},
					{
						url: '82.gif',
						alt: '[胜利]'
					},
					{
						url: '83.gif',
						alt: '[抱拳]'
					},
					{
						url: '84.gif',
						alt: '[勾引]'
					},
					{
						url: '85.gif',
						alt: '[拳头]'
					},
					{
						url: '86.gif',
						alt: '[差劲]'
					},
					{
						url: '87.gif',
						alt: '[爱你]'
					},
					{
						url: '88.gif',
						alt: '[NO]'
					},
					{
						url: '89.gif',
						alt: '[OK]'
					},
					{
						url: '90.gif',
						alt: '[爱情]'
					},
					{
						url: '91.gif',
						alt: '[飞吻]'
					},
					{
						url: '92.gif',
						alt: '[跳跳]'
					},
					{
						url: '93.gif',
						alt: '[发抖]'
					},
					{
						url: '94.gif',
						alt: '[怄火]'
					},
					{
						url: '95.gif',
						alt: '[转圈]'
					},
					{
						url: '96.gif',
						alt: '[磕头]'
					},
					{
						url: '97.gif',
						alt: '[回头]'
					},
					{
						url: '98.gif',
						alt: '[跳绳]'
					},
					{
						url: '99.gif',
						alt: '[投降]'
					},

					{
						url: 'static/img/tab/delete2.png',
						alt: '[删除]'
					}
				],
				[{
						url: '100.gif',
						alt: '[激动]'
					},
					{
						url: '101.gif',
						alt: '[乱舞]'
					},
					{
						url: '102.gif',
						alt: '[献吻]'
					},
					{
						url: '103.gif',
						alt: '[左太极]'
					},
					{
						url: '104.gif',
						alt: '[右太极]'
					},

					{
						url: 'static/img/tab/delete2.png',
						alt: '[删除]'
					}
				]
			]
		},
		{
			emojiName: "",
			emojiSort: 8,
			minEmoji: false,
			emojiPath: "",
			emojiList: []
		}
	]
}




// export与export default均可用于导出常量、函数、文件、模块等
// 在一个文件或模块中，export、import可以有多个，export default仅有一个
// 通过export方式导出，在导入时要加{ }，export default则不需要
// export能直接导出变量表达式，export default不行。


export default emojiData;
