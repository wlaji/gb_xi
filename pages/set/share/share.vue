<template>
	<view class="container">
		<view class="box">
			<view class="titleDes">
				<view class="t1">国本商城</view>
				<!-- <view class="t2">更准 更全 更方便</view> -->
			</view>
			<view class="title">
				分享一下，佣金到手
			</view>
			<view class="ma">
				<uqrcode ref="uqrcode" :text="shareUrl"></uqrcode>
				<text>二维码扫一扫分享</text>
			</view>
			<view class="btn">
				<u-button type="primary" text="生成海报分享" @click="shareFc"
					color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></u-button>
				<canvas class="canvas-hide" canvas-id="default_PosterCanvasId"
					:style="{width: (poster.width||0) + 'px', height: (poster.height||0) + 'px'}"></canvas>
			</view>
		</view>

		<u-popup :show="showHb" @close="closeHb" mode="bottom" closeable :closeOnClickOverlay="false">
			<view class="dialog">
				<view class="dialog-content">
					<view class="con">
						<u-image :showLoading="true" :src="finalPath" width="100%" height="600px"></u-image>
					</view>
					<view class="btnGroup">
						<u-button type="success" hairline text="保存图片" :customStyle="{'border-radius':0}"
							@click="saveHb"></u-button>
						<u-button type="primary" hairline text="分享好友" :customStyle="{'border-radius':0}"
							@click="shareHb"></u-button>
					</view>
				</view>
			</view>
		</u-popup>

	</view>
</template>

<script>
	import {
		getSharePoster
	} from '@/js_sdk/QuShe-SharerPoster/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				qImg: '',
				showHb: false,
				poster: {},
				finalPath: '',
				userInfo: '',
				canvasId: 'default_PosterCanvasId',
				hbImg: 'https://customed-center.oss-accelerate.aliyuncs.com/web/quoteManage/20220524/20220524MZCQZeT3.jpg',
				logoImg: 'https://customed-center.oss-accelerate.aliyuncs.com/web/quoteManage/20220524/20220524EMk3zyQb.png',
			};
		},
		computed: {
			shareUrl() {
				let userInfo = this.$store.state.userInfo;
				if(!userInfo){
					return '';
				}
				return `http://app.guoben.shop/register?num=${userInfo.recommendCode}`
			}
		},
		methods: {
			closeHb() {
				this.showHb = false;
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
					posterCanvasId: _this.canvasId, //canvasId
					backgroundImage: _this.hbImg,
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
								text: _this.shareUrl,
								size: 400,
								image: _this.logoImg,
								imageSize: 100,
								dx: (bgObj.width - 400) / 2,
								dy: (bgObj.height - 400) / 2 + 50,
								background: '#ffffff',
							},
							{
								type: 'text',
								text: '国本商城',
								size: 80,
								dy: 200,
								color: '#fff',
								infoCallBack(val) {
									return {
										dx: Math.abs(bgObj.width - val) / 2,
									}
								}
							},
							{
								type: 'text',
								text: '快点分享给好友吧!',
								dy: 300,
								size: 40,
								lineFeed: {
									maxWidth: 520,
									lineHeight: 50
								},
								color: '#fff',
								infoCallBack(val) {
									return {
										dx: Math.abs(bgObj.width - val) / 2,
									}
								}
							}
						]
					}
				})
				_this.finalPath = d.poster.tempFilePath;
				console.log(_this.finalPath)
				_this.showHb = true
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
								uni.$u.toast('保存成功')
							},
							fail: (e) => {
								uni.$u.toast('保存失败')
							}
						});
					},
					fail: () => {
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
						uni.$u.toast('保存成功')
					},
					fail: (e) => {
						uni.$u.toast('保存失败')
					}
				});
				// #endif
			},
			shareHb() {
				// #ifdef MP-WEIXIN
				wx.showShareImageMenu({
					path: this.finalPath
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
							uni.$u.toast('分享成功')
						},
						fail: function(err) {
							uni.$u.toast('分享失败')
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
								}
							});
						}
					}
				});
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dialog {

		.dialog-content {

			.btnGroup {
				display: flex;
				justify-content: space-around;
				background-color: #fff;
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
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin: 20px 0;

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
