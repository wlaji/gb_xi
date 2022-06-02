<template>
	<view class="container">
		<view class="tab">
			<view :class="[{ active: activeIndex===index }, 'tab-item']" v-for="(item,key,index) in tabList" :key="index"
				@click="tabClick(index)">{{item}}</view>
		</view>
		<view class="content">
			<swiper :current="activeIndex" class="swiper-box" duration="300" @change="changeTab">
				<swiper-item class="tab-content" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex">
					<scroll-view class="list-scroll-content" scroll-y @scrolltolower="loadData">
						<template v-if="productList.length||loadDataStatus">
							<view v-for="(item, index) in productList" :key="index" class="product-item-wrap">
								<view class="product-title u-border-bottom">
									<text>{{item.createTime}}</text>
									<text class="status">{{tabList[item.status]}}</text>
								</view>
								<view class="product-item" v-for="(citem,cindex) in item.productList" :key="cindex">
									<view class="left-img">
										<u-image :showLoading="true" :src="citem.image" width="100%" height="200rpx"
											radius="4px">
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
											<text class="num">
												x1
											</text>
										</view>
									</view>
								</view>
								<view class="priceInfo">
									<text class="totalPrice">总价:￥{{item.orderPrice}}</text>
								</view>
								<view class="orderBtnGroup">
									<view class="left" @click="toOrderDetail(item.id)">
										<text>更多</text>
									</view>
									<view class="right">
										<!-- 	<button class="u-reset-button">加入购物车</button> -->
										<button class="u-reset-button" v-if="item.status<4" @click="cancelOrder">取消订单</button>
										<button class="u-reset-button zf" v-if="item.status===1">立即支付</button>
										<button class="u-reset-button pj" v-if="item.status===4">评价</button>
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
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import {
		userGetOrderList,
		editOrderPayment,
		getOrderInfo
	} from '@/api/order.js'
	export default {
		data() {
			return {
				loadDataStatus: true,
				activeIndex: 0,
				productList: [],
				status: 'loadmore',
				form: {
					page: 1,
					pageSize: 25,
					status: null,
				},
				total: 0,
			};
		},
		computed:{
			tabList(){
				return this.$store.state.orderStatus||[]
			}
		},
		watch:{
			activeIndex(newVal){
				this.form.status = newVal?newVal:null;
				this.form.page=1;
				this.productList = [];
				this.loadDataStatus = true;
				this.getList()
			}
		},
		methods: {
			cancelOrder(){
				uni.navigateTo({
					url:'/pages/set/cancelOrder/cancelOrder'
				})
			},
			toOrderDetail(id) {
				uni.navigateTo({
					url: `/pages/set/orderDetail/orderDetail?id=${id}`
				})
			},
			//swiper 切换
			changeTab(e) {
				this.activeIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.activeIndex = index;
			},
			loadData() {
				if (this.productList.length >= this.total) {
					this.status = 'noMore';
					return;
				}
				this.form.page += 1;
				this.getList()
			},
			getList() {
				this.status = 'loading'
				userGetOrderList(this.form).then(res => {
					this.productList = this.productList.concat(res.data.list);
					this.total = res.data.total;
					if (this.productList.length >= this.total) {
						this.status = 'noMore';
					}
				}).finally(()=>{
					this.loadDataStatus = false;
				})
			},
		},
		onShow() {
			this.getList();
		}
	}
</script>

<style lang="scss">
	page,
	.container {
		height: 100%;
	}

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
			padding-top: 20rpx;
			height: calc(100% - 40px);

			.swiper-box {
				height: 100%;
			}

			.list-scroll-content {
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
					line-height: 40px;

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
