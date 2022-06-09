<template>
	<view class="container">
		<view class="part">
			<view class="product-item" v-for="(citem,cindex) in orderInfo.productList" :key="cindex">
				<view class="left-img">
					<u-image :showLoading="true" :src="JSON.parse(citem.photoPath)[0].url" width="200rpx"
						height="200rpx" radius="10px"></u-image>
				</view>
				<view class="right-con">
					<view class="r1">
						<text class="title u-line-1">{{citem.productName}}</text>
					</view>
					<view class="r2">
						<view class="price">
							<PriceText :productItem="citem"></PriceText>
						</view>
						<view class="num">
							x{{citem.quantity}}
						</view>
					</view>
				</view>
			</view>
			<view class="priceInfo">
				<!-- <u-transition :show="showMore">
					<view class="price-item">
						<view class="label">商品总价</view>
						<view class="price">
							<u-text mode="price" :text="(orderInfo.orderPrice + orderInfo.mixPayPrice).toFixed(2)" style="flex:0">
							</u-text>
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
				</u-transition> -->
				<view class="price-item">
					<view class="label">商品总价</view>
					<view class="price">
						<u-text mode="price" :text="(orderInfo.orderPrice + orderInfo.mixPayPrice).toFixed(2)" style="flex:0" size="14" color="#909193">
						</u-text>
					</view>
				</view>
				<view class="price-item">
					<view class="label">运费</view>
					<view class="price">
						<text class="num">￥{{orderInfo.shippingPrice}}</text>
					</view>
				</view>
				<view class="price-item">
					<view class="label">宝豆</view>
					<view class="price">
						<u-text bold prefixIcon="rmb-circle"
							iconStyle="color:#c7b033;font-size:14px;margin-right:5rpx;"
							:text="orderInfo.pointPrice" color="#fa436a" style="flex:0" size="14"></u-text>
					</view>
				</view>
				<view class="price-item actualPayment">
					<view class="label">实付款</view>
					<view class="price">
						<u-text mode="price" bold
							:text="(orderInfo.orderPrice + orderInfo.mixPayPrice + orderInfo.shippingPrice).toFixed(2)"
							style="flex:0" size="14" color="#333">
						</u-text>
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
				<view class="text" v-if="orderInfo">
					{{cusAddress}}
				</view>
			</view>
			<view class="info-item order-bh">
				<view class="label">订单编号</view>
				<view class="text">
					{{orderInfo.orderId}}
					<u-line direction="col" length="14px" :hairline="false" margin="0 10rpx"></u-line>
					<text style="color:#333" @click="copy(orderInfo.orderId)">复制</text>
				</view>
			</view>
			<view class="info-item order-bh" v-if="orderInfo.deliverySlipNumber">
				<view class="label">运单号</view>
				<view class="text">
					{{orderInfo.deliverySlipNumber}}
					<u-line direction="col" length="14px" :hairline="false" margin="0 10rpx"></u-line>
					<text style="color:#333" @click="copy(orderInfo.deliverySlipNumber)">复制</text>
				</view>
			</view>
			<view class="info-item">
				<view class="label">创建时间</view>
				<view class="text">
					{{orderInfo.createTime}}
				</view>
			</view>
			<view class="info-item">
				<view class="label">支付方式</view>
				<view class="text">
					{{payList[orderInfo.paymentMethod]}}
				</view>
			</view>
		</view>
		<!-- <view class="orderBtnGroup u-border-top">
			<view class="left">
			</view>
			<view class="right">
				<button class="u-reset-button" v-if="orderInfo.status===1"
					@click="cancelOrderDefault(orderInfo.orderId)">取消订单</button>
				<button class="u-reset-button zf" v-if="orderInfo.status===1"
					@click="goZhifu(orderInfo.orderId,orderInfo.paymentMethod)">立即支付</button>
			</view>
		</view> -->
	</view>
</template>

<script>
	import PriceText from '@/components/PriceText.vue'
	import {
		getOrderInfo,
		payment,
		cancelOrder
	} from '@/api/order.js'
	export default {
		data() {
			return {
				payList: {
					Balance: '余额',
					WxPay: '微信支付',
					Mix:'混合支付'
				},
				orderInfo: '',
				showMore: false
			};
		},
		components: {
			PriceText
		},
		computed: {
			cusAddress() {
				let orderInfo = this.orderInfo;
				return `${orderInfo.address.name},${orderInfo.address.phone},${orderInfo.address.province} ${orderInfo.address.city} ${orderInfo.address.area||''} ${orderInfo.address.detailedAddress}`
			}
		},
		methods: {
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.$u.toast('复制成功');
					},
					fail(err) {
						console.log(err)
					}
				});
			}
		},
		onLoad(options) {
			getOrderInfo({
				id: options.id
			}).then(res => {
				this.orderInfo = res.data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
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
					font-size: 14px;
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
