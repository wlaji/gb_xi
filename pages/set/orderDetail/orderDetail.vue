<template>
	<view class="container">
		<view class="part">
			<view class="product-item" v-for="(citem,cindex) in productList[0].goodsList" :key="cindex">
				<view class="left-img">
					<u-image :showLoading="true" :src="citem.image" width="100%" height="200rpx" radius="4px">
					</u-image>
				</view>
				<view class="right-con">
					<view class="r1">
						<text class="title u-line-1">回力女鞋高帮帆布鞋女学生韩版鞋子女</text>
						<text class="des">白色-高帮 39</text>
					</view>
					<view class="r2">
						<text class="price">
							￥3300.96
						</text>
						<text class="oprice">
							￥3300.96
						</text>
						<text class="num">
							x1
						</text>
					</view>
				</view>
			</view>
			<view class="priceInfo">
				<u-transition :show="showMore">
					<view class="price-item">
						<view class="label">商品总价</view>
						<view class="price">
							<text>商品总价</text>
							<text class="num">￥718.00</text>
						</view>
					</view>
					<view class="price-item">
						<view class="label">运费</view>
						<view class="price">
							<text>运费(快递)</text>
							<text class="num">￥718.00</text>
						</view>
					</view>
					<view class="price-item discountPrice">
						<view class="label">折扣</view>
						<view class="price">
							<text>商城优惠</text>
							<text class="num">-￥200.00</text>
						</view>
					</view>
				</u-transition>
				<view class="price-item actualPayment">
					<view class="label">实付款</view>
					<view class="price">
						<u-icon :name="showMore?'arrow-up':'arrow-down'" color="#909193" labelPos="left" label="￥718.00"
							labelColor="#333" @click="showMore=!showMore"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="part part2">
			<view class="title">
				订单详情
			</view>
			<view class="info-item">
				<view class="label">收货信息</view>
				<view class="text">
					肖伟成, 86-15773003996, 湖南省 岳阳市 岳阳楼区 五里牌街道 中建五局二公司
				</view>
			</view>
			<view class="info-item order-bh">
				<view class="label">订单编号</view>
				<view class="text">
					1321321321321321321321
					<u-line direction="col" length="14px" :hairline="false" margin="0 10rpx"></u-line>
					<text style="color:#333" @click="copy('321321321321')">复制</text>
				</view>
			</view>
			<view class="info-item">
				<view class="label">创建时间</view>
				<view class="text">
					2021-12-23 15:14:20
				</view>
			</view>
			<view class="info-item">
				<view class="label">付款时间</view>
				<view class="text">
					2021-12-23 15:14:20
				</view>
			</view>
			<view class="info-item">
				<view class="label">发货时间</view>
				<view class="text">
					2021-12-23 15:14:20
				</view>
			</view>
			<view class="info-item">
				<view class="label">成交时间</view>
				<view class="text">
					2021-12-23 15:14:20
				</view>
			</view>
		</view>
		<view class="orderBtnGroup u-border-top">
			<view class="left">
				<text>更多</text>
			</view>
			<view class="right">
				<!-- 	<button class="u-reset-button">加入购物车</button> -->
				<button class="u-reset-button">取消订单</button>
				<button class="u-reset-button zf">立即支付</button>
				<button class="u-reset-button pj">评价</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showMore: false,
				productList: [{
					time: '2019-04-06 11:37',
					state: 1,
					goodsList: [{
							image: '/static/image/2.jpg',
						},
						{
							image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
						},
						{
							image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
						},
						{
							image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
						},
						{
							image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
						},
						{
							image: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4031878334,2682695508&fm=11&gp=0.jpg',
						},
						{
							image: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1620020012,789258862&fm=26&gp=0.jpg',
						}
					]
				}]
			};
		},
		methods:{
			copy(value){
				console.log(value)
				uni.setClipboardData({
				    data: value,
				    success: function () {
						uni.$u.toast('复制成功');
				    },
					fail(err) {
						console.log(err)
					}
				});
			}
		},
		onLoad() {
			this.productList = this.$json.orderList
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx 0 70px;
	}

	.part {
		margin-bottom: 20rpx;
		border-radius: 4px;
		background-color: #fff;
		padding: 20rpx;
	}

	.product-item {
		display: flex;
		margin-bottom: 10rpx;

		.left-img {
			flex-basis: 200rpx;
			height: 200rpx;
			flex-shrink: 0;
		}

		.right-con {
			display: flex;
			justify-content: space-between;
			flex: 1;
			width: 0;
			margin-left: 20rpx;

			.r1,
			.r2 {
				display: flex;
				flex-direction: column;
			}

			.r1 {
				flex: 1;
				margin-right: 20rpx;
				width: 0;

				.title {
					display: block;
					word-wrap: break-word;
					margin-bottom: 10rpx;
				}

				.des {
					color: $u-tips-color;
					word-wrap: break-word;
				}
			}

			.r2 {
				text-align: right;

				.price {
					margin-bottom: 10rpx;
				}

				.oprice {
					color: $u-tips-color;
				}

				.num {
					color: $u-tips-color;
				}
			}
		}
	}

	.priceInfo {
		margin-top: 20rpx;
		.price-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 30rpx;

			.label {
				color: #333;
			}

			.price {
				color: $u-tips-color;

				.num {
					font-size: 12px;
					margin-left: 20rpx;
				}
			}
		}

		.price-item.discountPrice {
			.num {
				color: $price-color;
			}
		}

		.price-item.actualPayment {
			margin-bottom: 0;

			.label {
				font-weight: 700;
			}
		}
	}

	.part2 .title {
		font-weight: 700;
		margin-bottom: 40rpx;
		font-size: 16px;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 30rpx;

		.label {
			width: 100px;
			flex-shrink: 0;
			color: #333;
		}

		.text {
			flex: 1;
			color: $u-tips-color;
			text-align: right;
			word-wrap: break-word;

			.num {
				font-size: 12px;
				margin-left: 20rpx;
			}
		}
	}

	.info-item.order-bh {
		.text {
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}

	.orderBtnGroup {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		background-color: #fff;
		height: 60px;

		.left {
			color: $u-tips-color;
			flex-shrink: 0;
			margin-right: 20rpx;
		}

		.right {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-end;

			button {
				width: 180rpx;
				line-height: 60rpx;
				border-radius: 40rpx;
				border: 1px solid $u-border-color;
				margin: 0 0 0 10rpx;
				font-size: 14px;
			}

			.zf {
				border-color: $price-color;
				color: $price-color;
				background: #fff9f9;
			}

			.pj {
				border-color: $price-color;
				color: $price-color;
			}
		}
	}
</style>
