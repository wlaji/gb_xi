<template>
	<view class="container">
		<view class="box">
			<view class="titleDes">
				<view class="t1">铑斯夫报价</view>
				<view class="t2">更准 更全 更方便</view>
			</view>
			<view class="title">
				分享一下，佣金到手
			</view>
			<view class="ma">
				<image :src="qImg" mode=""></image>
				<uqrcode ref="uqrcode" class="canvas-hide"></uqrcode>
				<text>二维码扫一扫分享</text>
			</view>
			<view class="btn">
				<button type="default" @click="shareFc">生成海报分享</button>
				<canvas class="canvas-hide" canvas-id="default_PosterCanvasId"
					:style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
			</view>
		</view>
		<view class="dialog" v-show="showHb">
			<view class="content">
				<view class="close" @click="showHb = false">
					<!-- <uni-icons type="closeempty" size="25"></uni-icons> -->
				</view>
				<view class="con">
					<image :src="finalPath" mode="aspectFill">
				</view>
				<view class="btnGroup">
					<button type="primary" size="mini" @click="saveHb">保存图片</button>
					<button type="primary" size="mini" @click="shareHb">分享图片</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const hbImg = 'https://rhskieapi.oss-cn-hangzhou.aliyuncs.com/webData/2022-01-04/20220104RhTJnWJk.jpg'
	const logoImg = 'https://rhskieapi.oss-cn-hangzhou.aliyuncs.com/webData/2022-01-04/20220104a7iasRY7.png'
	import Utils from '@/utils/util.js'
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	import uQRCode from '@/uni_modules/Sansnn-uQRCode/components/uqrcode/common/uqrcode.js'
	export default {
		data() {
			return {
				qImg: '',
				showHb: false,
				poster: {},
				finalPath: '',
				userInfo: '',
				canvasId: 'default_PosterCanvasId'
			};
		},
		components:{
			uqrcode:uQRCode
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			async shareFc() {
				let _this = this;
				uni.showLoading({
					title: '海报生成中...'
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 2000);
				let d = await getSharePoster({ //return Promise
					_this: _this, //若在组件中使用 必传
					posterCanvasId: this.canvasId, //canvasId
					backgroundImage: hbImg,
					bgScale: '0.5',
					setCanvasWH({
						bgObj
					}) { //一般必传， 动态设置canvas宽高
						_this.poster = bgObj
					},
					drawArray({ //绘制序列
						bgObj, //背景图对象
						type, //自定义标识
						bgScale //背景缩放
					}) {
						return [{
								type: 'qrcode',
								text: 'http://mia666.com/register?num=' + _this.userInfo.recommendCode,
								size: 400,
								image: logoImg,
								imageSize: 100,
								dx: (bgObj.width - 400) / 2,
								dy: (bgObj.height - 400) / 2 + 150,
								background: '#ffffff',
							},
							{
								type: 'text',
								text: '铑斯夫',
								size: 80,
								dy: 200,
								color: '#fff',
								infoCallBack(val) {
									console.log(val)
									return {
										dx: Math.abs(bgObj.width - val) / 2,
									}
								}
							},
							{
								type: 'text',
								text: '一款专注于三元催化器报价的软件，型号齐全，实时根据钯铂铑金价波动，更新数据。',
								dy: 300,
								size: 40,
								lineFeed: {
									maxWidth: 520,
									lineHeight: 50
								},
								color: '#fff',
								infoCallBack(val) {
									return {
										dx: Math.abs(bgObj.width - 520) / 2,
									}
								}
							}
						]
					}
				})
				this.finalPath = d.poster.tempFilePath;
				console.log(d)
				this.showHb = true
			},
			saveHb() {
				// #ifdef MP-WEIXIN
				let that = this;
				uni.authorize({
					scope: 'scope.writePhotosAlbum',
					success: () => {
						uni.saveImageToPhotosAlbum({
							filePath: that.finalPath,
							success: () => {
								uni.showToast({
									title: '保存成功',
									duration: 2000
								});
							},
							fail: (e) => {
								console.log(e)
								uni.showToast({
									title: '保存失败',
									duration: 2000
								});
							}
						});
					},
					fail() {
						uni.openSetting({
							success(res) {
								console.log(res.authSetting)
							}
						});
					}
				})
				// #endif
				// #ifdef APP-PLUS
				uni.saveImageToPhotosAlbum({
					filePath: this.finalPath,
					success: () => {
						uni.showToast({
							title: '保存成功',
							duration: 2000
						});
					},
					fail: (e) => {
						console.log(e)
						uni.showToast({
							title: '保存失败',
							duration: 2000
						});
					}
				});
				// #endif
			},
			shareHb() {
				// #ifdef MP-WEIXIN
				wx.showShareImageMenu({
					path:this.finalPath
				})
				// #endif
				// #ifdef APP-PLUS
				const share = async (scene) => {
					//分享到微信
					uni.share({
						provider: "weixin",
						scene: scene,
						type: 2,
						imageUrl: this.finalPath,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
				uni.showActionSheet({
					itemList: ['微信'],
					success: function(res) {
						if (res.tapIndex === 0) {
							uni.showActionSheet({
								itemList: ['微信好友', '微信朋友圈', '微信收藏'],
								success: function(res) {
									if (res.tapIndex === 0) {
										//分享到微信好友
										share('WXSceneSession')
									} else if (res.tapIndex === 1) {
										//分享到微信朋友圈
										share('WXSenceTimeline')
									} else if (res.tapIndex === 2) {
										//分享到微信收藏
										share('WXSceneFavorite')
									}
								},
								fail: function(res) {
									console.log(res.errMsg);
								}
							});
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
				// #endif
			}
		},
		onReady() {
			const userInfo = uni.getStorageSync('userInfo');
			this.userInfo = userInfo;
			this.$refs
				.uqrcode
				.make({
					size: 200,
					text: 'http://mia666.com/register?num=' + userInfo.recommendCode
				})
				.then(res => {
					this.qImg = res.tempFilePath
				})
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				return {
					imageUrl: this.finalPath
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.dialog {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .45);

		.content {
			width: 600rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			.close {
				position: absolute;
				right: -15px;
				top: -15px;
				width: 30px;
				height: 30px;
				border-radius: 50%;
				background-color: #fff;
				border: 1px solid #ccc;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fff;
			}

			.con {
				height: 500px;
				border: 10px solid #fff;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.btnGroup {
				display: flex;
				justify-content: space-around;
				margin-top: 10px;
			}
		}
	}

	.canvas-hide {
		/* 1 */
		position: fixed;
		right: 100vw;
		bottom: 100vh;
		/* 2 */
		z-index: -9999;
		/* 3 */
		opacity: 0;
	}

	.container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #007AFF;
		background: url('https://rhskieapi.oss-cn-hangzhou.aliyuncs.com/webData/2022-01-04/20220104RhTJnWJk.jpg') center/cover no-repeat;

		.back {
			position: absolute;
			top: 50px;
			left: 20px;
		}

		.box {
			position: absolute;
			top: 60%;
			left: 20px;
			right: 20px;
			background-color: #fff;
			border-radius: 4px;
			padding: 20px;
			transform: translateY(-50%);

			.titleDes {
				position: absolute;
				top: 0;
				left: 50%;
				width: 100%;
				transform: translate(-50%, -100%);
				padding-bottom: 20px;
				color: #fff;
				text-align: center;

				.t1 {
					font-size: 24px;
					margin-bottom: 10px;
				}

				.t2 {
					font-size: 30px;
				}
			}

			.ma {
				margin: 20px 0;
				text-align: center;

				image {
					width: 400rpx;
					height: 400rpx;
				}

				text {
					display: block;
					margin-top: 10px;
					color: #333;
				}
			}

			.title {
				color: #1092D7;
				font-size: 24px;
				text-align: center;
				line-height: 1.7em;
			}
		}
	}
</style>
