<template>
	<view class="container">
		<view class="carousel-section">
			<u-swiper :list="imgList" keyName="src" :autoplay="false" indicator indicatorMode="dot" height="750rpx"
				radius="0"></u-swiper>
		</view>
		<view class="content">
			<view class="part introduce-section">
				<text class="title">恒源祥2019春季长袖白色t恤 新款春装</text>
				<view class="price-box">
					<text class="price">￥341.6</text>
					<text class="m-price">¥488</text>
				</view>
				<view class="bot-row">
					<text>销量: 108</text>
					<text>库存: 4690</text>
					<text>浏览量: 768</text>
				</view>
			</view>
			
			<view class="part c-list">
				<view class="c-row" @click="toggleSpec">
					<text class="tit">购买类型</text>
					<view class="con">
						<text class="selected-text">
							颜色
						</text>
						<text class="selected-text">
							尺码
						</text>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="c-row">
					<text class="tit">发货</text>
					<view class="con fh">
						<view class="top">
							<view class="left">
								<text>广东广州</text>
								<u-line direction="col" margin="20rpx" length="20rpx"></u-line>
								<text>快递:免运费</text>
							</view>
							<view class="right">
								月销 4000+
							</view>
						</view>
						<view class="bm">
							付款后48小时内发货
						</view>
					</view>
				</view>
				<view class="c-row">
					<text class="tit">保障</text>
					<view class="con">
						付款后48小时内发货 · 无忧退货
					</view>
				</view>
				<view class="c-row">
					<text class="tit">参数</text>
					<view class="bz-list con">
						<text>品牌</text>
						<text>材质...</text>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>

			<!-- 评价 -->
			<view class="eva-section">
				<view class="e-header">
					<text class="tit">评价</text>
					<text>(86)</text>
					<text class="tip">好评率 100%</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="eva-box">
					<image class="portrait"
						src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg"
						mode="aspectFill"></image>
					<view class="right">
						<text class="name">Leo yo</text>
						<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
						<view class="bot">
							<text class="attr">购买类型：XL 红色</text>
							<text class="time">2019-04-01 19:21</text>
						</view>
					</view>
				</view>
				<view class="eva-box">
					<image class="portrait"
						src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg"
						mode="aspectFill"></image>
					<view class="right">
						<text class="name">Leo yo</text>
						<text class="con">商品收到了，79元两件，质量不错，试了一下有点瘦，但是加个外罩很漂亮，我很喜欢</text>
						<view class="bot">
							<text class="attr">购买类型：XL 红色</text>
							<text class="time">2019-04-01 19:21</text>
						</view>
					</view>
				</view>
			</view>

			<view class="detail-desc">
				<view class="d-header">
					<text>图文详情</text>
				</view>
				<rich-text :nodes="desc"></rich-text>
			</view>

			<!-- 组合按钮 -->
			<view class="buttonGroup">
				<view class="b1" @click="goHome">
					<u-icon name="home" size="24"></u-icon>
					首页
				</view>
				<view class="b1" @click="goCart">
					<u-icon name="shopping-cart" size="24"></u-icon>
					购物车
				</view>
				<view class="b1" @click="collect">
				<!-- 	<u-icon name="heart" size="24"></u-icon> -->
					<u-icon name="heart-fill" size="24" color="#fa436a"></u-icon>
					收藏
				</view>
				<view class="action-btn">
					<u-button class="btn1" type="primary" :customStyle="{backgroundColor: '#FFBC49',
					border: 'none',
					borderRadius:'0',
					borderTopLeftRadius: '20px',
					borderBottomLeftRadius: '20px'}" text="加入购物车"></u-button>
					<u-button class="btn2" type="primary" :customStyle="{backgroundColor: '#FE696D',
					border: 'none',
					borderRadius:'0',
					borderTopRightRadius: '20px',
					borderBottomRightRadius: '20px'}" text="立即购买"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList: [{
						src: 'https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg'
					},
					{
						src: 'https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg'
					},
					{
						src: 'https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg'
					}
				],
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`,
			};
		},
		onLoad() {

		},
		methods: {
			goHome(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goCart(){
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			collect(){
				
			}
		},
		// #ifndef MP
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 120rpx;

		.content {
			padding: 20rpx 10rpx;

			.part {
				background-color: #fff;
				border-radius: 8px;
				padding: 20rpx;
				margin-bottom: 20rpx;
			}

			/* 标题简介 */
			.introduce-section {
				position: relative;

				.title {
					font-size: 32rpx;
					height: 50rpx;
					line-height: 50rpx;
				}

				.price-box {
					display: flex;
					align-items: baseline;
					height: 64rpx;
					padding: 10rpx 0;
					color: $price-color;
				}

				.price {
					font-size: 16px;
				}

				.m-price {
					margin: 0 12rpx;
					text-decoration: line-through;
					font-size: 14px;
					color: $u-tips-color;
				}

				.bot-row {
					display: flex;
					align-items: center;
					height: 50rpx;
					color: $u-tips-color;
					font-size: 12px;

					text {
						flex: 1;
					}
				}
			}

			.c-list {
				padding: 0;

				.c-row {
					display: flex;
					align-items: center;
					position: relative;
					padding: 10px;
					border-bottom: .5px solid #E4E7ED;

					&:last-child {
						border-bottom: none;
					}
				}

				.tit {
					width: 140rpx;
					color: $u-tips-color;
				}

				.fh {
					.top {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.left {
							display: flex;
							align-items: center;
						}

						.right {
							color: $u-tips-color;
						}
					}

					.bm {
						font-size: 12px;
					}
				}

				.con {
					flex: 1;

					.selected-text {
						margin-right: 10rpx;
					}
				}

				.bz-list {
					text {
						display: inline-block;
						margin-right: 10rpx;
					}
				}
			}

			/* 评价 */
			.eva-section {
				display: flex;
				flex-direction: column;
				padding: 20rpx 30rpx;
				background: #fff;
				margin-top: 16rpx;

				.e-header {
					display: flex;
					align-items: center;
					height: 70rpx;
					color: $u-tips-color;

					.tit {
						margin-right: 4rpx;
						color: $u-main-color;
					}

					.tip {
						flex: 1;
						text-align: right;
					}
				}
			}

			.eva-box {
				display: flex;
				padding: 20rpx 0;

				.portrait {
					flex-shrink: 0;
					width: 80rpx;
					height: 80rpx;
					border-radius: 100px;
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					padding-left: 26rpx;
					color: $u-tips-color;

					.con {
						padding: 20rpx 0;
						color: $u-main-color;
					}

					.bot {
						display: flex;
						justify-content: space-between;
						font-size: 12px;
					}
				}
			}
		}

		/*  详情 */
		.detail-desc {
			background: #fff;
			margin-top: 16rpx;

			.d-header {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 80rpx;
				position: relative;

				text {
					padding: 0 20rpx;
					background: #fff;
					position: relative;
					z-index: 1;
				}

				&:after {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translateX(-50%);
					width: 300rpx;
					height: 0;
					content: '';
					border-bottom: 1px solid #ccc;
				}
			}
		}

		.carousel-section {}

		.buttonGroup {
			position: fixed;
			left: 20px;
			right: 20px;
			bottom: 15px;
			height: 52px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(255, 255, 255, 0.9);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, .35);
			border-radius: 8px;
			padding: 0 10rpx;

			.b1 {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin: 0 15rpx;
			}

			.action-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 20rpx;
			}
		}
	}
</style>
