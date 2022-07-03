<template>
	<view class="container">
		<u-modal :show="show" title="取消订单" content='确认取消此订单吗?' closeOnClickOverlay @close="show=false"
			@confirm="submitCancelForm"></u-modal>
		<!-- <view class="tab">
			<view :class="[{ active: activeIndex===index }, 'tab-item']" v-for="(item,key,index) in tabList"
				:key="index" @click="tabClick(index)">{{item}}</view>
		</view> -->
		<view class="content">
			<!-- <swiper :current="activeIndex" class="swiper-box" duration="300" @change="changeTab" disable-touch>
				<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
					
				</swiper-item>
			</swiper> -->

			<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
				<template v-if="productList.length||loadDataStatus">
					<view v-for="(item, index) in productList" :key="index" class="product-item-wrap">
						<view class="product-title u-border-bottom">
							<view>
								<u-text mode="date" :text="item.createTime" size="12"></u-text>
								<u-text :text="item.order_no" size="12"></u-text>
							</view>
							<text class="status">{{tabList[item.status]}}</text>
						</view>
						<view class="product-item">
							<view class="left-img">
								<u-image :showLoading="true" :src="'https://www.guoben.shop'+item.snap_img"
									width="200rpx" height="200rpx" radius="10px"></u-image>
							</view>
							<view class="right-con">
								<view class="r1">
									<text class="title u-line-1">{{item.snap_name}}</text>
								</view>
								<view class="r2">
									<!-- <view class="price">
										<u-text mode="price" :text="item.end_price" color="#fa436a"></u-text>
									</view> -->
									<view class="num">
										x{{item.total_count}}
									</view>
								</view>
							</view>
						</view>
						<view class="priceInfo">
							<text>物流状态: </text>
							<text>{{item.send_out?'已发货':'待发货'}}</text>
						</view>
						<view class="priceInfo">
							<text>总计:</text>
							<u-text mode="price" :text="item.end_price" color="#fa436a" style="flex:0"></u-text>
							<u-text mode="price" :text="item.total_price" decoration="line-through" size="12"
								style="flex:0"></u-text>
						</view>
						<view class="orderBtnGroup">
							<view class="left">
								<!-- <text>更多</text> -->
							</view>
							<view class="right">
								<template v-if="item.status==1">
									<!-- <button class="u-reset-button"
										@click.stop="cancelOrderDefault(item.orderId)">取消订单</button> -->
									<button class="u-reset-button zf"
										@click.stop="goZhifu(item.orderId,item.paymentMethod)">立即支付</button>
								</template>
								<!-- <template v-if="item.status===3">
									<button class="u-reset-button" @click.stop="viewWuliu(item)">查看物流</button>
									<button class="u-reset-button zf" @click.stop="confirmShouhuo(item.orderId)">确认收货</button>
								</template> -->
							</view>
						</view>
					</view>
					<u-loadmore :status="status" height="30px" />
				</template>
				<template v-else>
					<view class="no-result">
						<u-empty mode="order"></u-empty>
					</view>
				</template>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import PriceText from '@/components/PriceText.vue'
	// import {
	// 	userGetOrderList,
	// 	editOrderPayment,
	// 	getOrderInfo,
	// 	payment,
	// 	cancelOrder,
	// 	confirmOrder
	// } from '@/api/order.js'
	import {
		orderlist
	} from '@/api/newApi.js'
	export default {
		data() {
			return {
				show: false,
				loadDataStatus: true,
				activeIndex: 0,
				productList: [],
				status: 'loadmore',
				form: {
					page: 1,
					size: 4,
					status: null,
				},
				total: 0,
				cancelOrderId: '',
				hasMore: false,
			};
		},
		computed: {
			tabList() {
				return this.$store.state.orderStatus || []
			}
		},
		components: {
			PriceText
		},
		methods: {
			viewWuliu(item) {
				uni.navigateTo({
					// url:`/pages/viewWl/viewWl?expressNum=${item.deliverySlipNumber}&phone=${item.address.phone}`
					url: `/pages/viewWl/viewWl?expressNum=${item.deliverySlipNumber}&phone=${item.address.phone}`
				})
			},
			confirmShouhuo(orderId) {
				confirmOrder({
					orderId
				}).then(res => {
					uni.$u.toast('确认收货成功');
					this.form.page = 1;
					this.productList = [];
					this.loadDataStatus = true;
					this.getList()
				})
			},
			submitCancelForm() {
				cancelOrder({
					orderId: this.cancelOrderId
				}).then(res => {
					this.show = false;
					this.form.page = 1;
					this.productList = [];
					this.loadDataStatus = true;
					this.getList()
				})
			},
			cancelOrderDefault(orderId) {
				this.cancelOrderId = orderId;
				this.show = true;
			},
			toOrderDetail(id) {
				uni.navigateTo({
					url: `/pages/set/orderDetail/orderDetail?id=${id}`
				})
			},
			//swiper 切换
			changeTab(e) {
				this.activeIndex = e.target.current;
				this.form.status = this.activeIndex ? this.activeIndex : null;
				this.form.page = 1;
				this.productList = [];
				this.loadDataStatus = true;
				this.getList()
			},
			//顶部tab点击
			tabClick(index) {
				if (this.loadDataStatus) {
					return false;
				}
				this.activeIndex = index;
			},
			loadData() {
				if (!this.hasMore) {
					this.status = 'noMore';
					return;
				}
				this.form.page += 1;
				this.getList()
			},
			getList() {
				this.status = 'loading'
				orderlist(this.form).then(res => {
					this.productList = this.productList.concat(res.data[0].data);
					this.hasMore = res.data[0].has_more
					if (!this.hasMore) {
						this.status = 'noMore';
					}
					this.$nextTick(() => {
						this.loadDataStatus = false;
					})
				}).finally(() => {
					setTimeout(() => {
						this.loadDataStatus = false;
					}, 1000)
				})
			},
			pay(data, provider) {
				if (provider === 'balance') {
					uni.redirectTo({
						url: '/pages/payAfter/payAfter?status=' + 1
					})
				} else if (provider === 'wxpay') {
					uni.requestPayment({
						provider: provider,
						orderInfo: data,
						success(res) {
							uni.redirectTo({
								url: '/pages/payAfter/payAfter?status=' + 1
							})
						},
						fail(err) {
							uni.$u.toast('取消支付');
							uni.redirectTo({
								url: '/pages/payAfter/payAfter?status=' + 0
							})
						}
					})
				} else {
					if (data === 'success') {
						uni.redirectTo({
							url: '/pages/payAfter/payAfter?status=' + 1
						})
					} else if (data.package === 'Sign=WXPay') {
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: data,
							success(res) {
								uni.redirectTo({
									url: '/pages/payAfter/payAfter?status=' + 1
								})
							},
							fail(err) {
								uni.$u.toast('取消支付');
								uni.redirectTo({
									url: '/pages/payAfter/payAfter?status=' + 0
								})
							}
						})
					} else {
						uni.redirectTo({
							url: '/pages/payAfter/payAfter?status=' + 0
						})
					}
				}
			},
			goZhifu(orderId, paymentMethod) {
				payment({
					orderId
				}).then(res => {
					this.pay(res.data, paymentMethod.toLowerCase())
				}).catch(err => {
					uni.$u.toast(err.message);
					setTimeout(() => {
						uni.redirectTo({
							url: '/pages/payAfter/payAfter?status=' + 0
						})
					}, 1000)
				})
			},
		},
		onLoad(options) {
			this.form.status = Number(options.status) || null;
			this.activeIndex = this.form.status || 0;
			this.$nextTick(() => {
				this.getList();
			})
		}
	}
</script>

<style lang="scss">
	.plus {
		color: $price-color;
		font-weight: 700;
		margin: 0 2px;
	}

	@include container-100();

	.container {
		display: flex;
		flex-direction: column;

		.tab {
			display: flex;
			align-items: center;
			height: 40px;
			padding: 0 20rpx;
			font-size: 14px;
			background: #fff;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .25);
			z-index: 10;

			.tab-item {
				flex: 1;
				height: 100%;
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;

				.arrow {
					margin-left: 10rpx;
				}
			}

			.tab-item.active {
				color: #fa436a;

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 62px;
					height: 0;
					border-bottom: 2px solid #fa436a;
				}
			}
		}

		.content {
			position: relative;
			padding-top: 20rpx;
			height: 100%;

			.swiper-box {
				height: 100%;
			}

			.list-scroll-content {
				position: relative;
				height: 100%;
			}

			.product-item-wrap {
				margin-bottom: 20rpx;
				border-radius: 4px;
				background-color: #fff;
				padding: 0 20rpx;

				.product-title {
					display: flex;
					height: 40px;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 20rpx;

					.status {
						color: $price-color;
					}
				}

				.product-item {
					display: flex;
					margin-bottom: 20rpx;

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

							.num {
								color: $u-tips-color;
							}
						}
					}
				}

				.priceInfo {
					display: flex;
					align-items: center;
					justify-content: flex-end;
					margin-bottom: 10rpx;

					.totalPrice,
					.discountPrice {
						color: $u-tips-color;
						margin-right: 10rpx;
					}

					.realPrice {
						font-weight: 700;
					}
				}

				.orderBtnGroup {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 20rpx 0;

					.left {
						color: $u-tips-color;
						flex-shrink: 0;
						margin-right: 20rpx;
					}

					.right {
						display: flex;
						flex-wrap: wrap;
						align-items: center;
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
			}
		}
	}
</style>
