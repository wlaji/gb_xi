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
					<image class="portrait" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg"
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
					<image class="portrait" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg"
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
			};
		},
		onLoad() {

		},
		methods: {

		},
		// #ifndef MP
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url:'/pages/search/search'
			})
		},
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				
			} else if (index === 1) {
				uni.switchTab({
					url: '/pages/cart/cart'
				});
			}
		},
		// #endif
	}
</script>

<style lang="scss" scoped>
	.container {
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */

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
			.eva-section{
				display: flex;
				flex-direction: column;
				padding: 20rpx 30rpx;
				background: #fff;
				margin-top: 16rpx;
				.e-header{
					display: flex;
					align-items: center;
					height: 70rpx;
					color: $u-tips-color;
					.tit{
						margin-right: 4rpx;
						color: $u-main-color;
					}
					.tip{
						flex: 1;
						text-align: right;
					}
				}
			}
			.eva-box{
				display: flex;
				padding: 20rpx 0;
				.portrait{
					flex-shrink: 0;
					width: 80rpx;
					height: 80rpx;
					border-radius: 100px;
				}
				.right{
					flex: 1;
					display: flex;
					flex-direction: column;
					padding-left: 26rpx;
					color: $u-tips-color;
					.con{
						padding: 20rpx 0;
						color: $u-main-color;
					}
					.bot{
						display: flex;
						justify-content: space-between;
						font-size:12px;
					}
				}
			}
		}

		.carousel-section {}
	}
</style>
