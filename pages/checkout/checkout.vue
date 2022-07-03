<template>
	<view class="container" :style="{paddingTop:customBar+'px'}">
		<u-navbar leftText="返回" title="确认订单" fixed @leftClick="goBack"></u-navbar>
		<BindPayPwd></BindPayPwd>
		<view class="part" style="margin-top: 20rpx;">
			<u-cell-group :border="false" v-if="defaultAddress">
				<u-cell size="large" icon="map-fill" :border="false" :iconStyle="{color:'red'}"
					:title="defaultAddress.detail" :label="defaultAddress.name +' '+ defaultAddress.mobile" isLink
					url="/pages/set/addressManage/addressManage?from='checkout'"></u-cell>
			</u-cell-group>
			<u-cell-group :border="false" v-else>
				<u-cell size="large" icon="map-fill" :border="false" :iconStyle="{color:'red'}" title="暂无地址" label=""
					isLink url="/pages/set/addressManage/addressManage?from='checkout'"></u-cell>
			</u-cell-group>
		</view>
		<view class="part" v-for="(item,index) in goodsData" :key="index">
			<view class="cart-item">
				<view class="rightContent">
					<view class="image-wrapper">
						<u-image :showLoading="true" :src="'https://www.guoben.shop'+item.pic" width="150rpx"
							height="150rpx" radius="10px"></u-image>
					</view>
					<view class="item-right">
						<view class="t1">
							<text class="title u-line-1" style="display: block;">{{item.product_name}}</text>
							<view>
								<u-text mode="price" :text="item.discount_amount * item.qty" color="#fa436a"></u-text>
							</view>
						</view>
						<view class="t2">
							<text></text>
							<text>x{{item.qty}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="part">
			<u-cell-group :border="false">
				<!-- <u-cell :border="false" title="配送服务" :value="'快递 '+(calcPostage==0?'免邮':'￥'+calcPostage)">
				</u-cell> -->
				<!-- <u-cell :border="false" title="提货点" value="暂无">
				</u-cell> -->
				<!-- <u-cell :border="false" title="优惠" value="￥3">
				</u-cell> -->
				<!-- <u-cell :border="false" title="订单备注" value="无备注" isLink @click="addBezhuBefore(index)">
				</u-cell> -->
			</u-cell-group>
		</view>
		<view class="part">
			<view style="font-weight: 700;padding: 10px 15px;">价格明细</view>
			<u-cell-group :border="false">
				<u-cell :border="false" title="商品总价" :label="'共'+goodsData.length+'件宝贝'">
					<view slot="value" class="u-slot-title">
						￥{{total}}
					</view>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="part">
			<PayList @changeMethod="changeMethod" :type="goodsData[0].type"></PayList>
		</view>
		<view class="add-address-btn">
			<u-button :loading="loading" color="linear-gradient(to right, rgb(255, 85, 0), rgb(240, 76, 0))" text="提交订单"
				@click="submitOrderBefore"></u-button>
		</view>
		<u-modal :show="show" @close="close" closeOnClickOverlay title="支付密码" @confirm="toSubmit">
			<view class="slot-content">
				<u-input type="password" v-model="paypass" focus placeholder="请输入支付密码" border="surround" prefixIcon="lock-fill">
				</u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import PayList from '@/components/PayList.vue';
	import {
		getUserAddress,
		placeOrder,
		getPreOrder
	} from '@/api/newApi.js'
	import BindPayPwd from '@/components/BindPayPwd.vue'
	export default {
		data() {
			return {
				customBar: this.customBar,
				loading: false,
				bezhuIndex: '',
				beizhu: '',
				show: false,
				discount: 0,
				addressList: [],
				postage: 0,
				paymentMethod: '',
				buyNow: 0,
				mixPayPrice: '',
				paypass: ''
			}
		},
		components: {
			PayList,
			BindPayPwd
		},
		computed: {
			jfStatus() {
				return Number(this.userInfo.cp) >= this.totalJf
			},
			goodsData() {
				return this.$store.state.tempCart
			},
			totalJf() {
				let list = this.goodsData;
				let total = 0;
				list.forEach(item => {
					total += item.pointPrice
				})
				return Number(total.toFixed(2)) || 0;
			},
			defaultAddress() {
				return this.addressList[0]
			},
			userInfo() {
				return this.$store.state.userInfo || {}
			},
			total() {
				let list = this.goodsData;
				let total = 0;
				list.forEach(item => {
					total += Number(item.discount_amount) * item.qty;
				})
				return Number(total.toFixed(2)) || 0;
			},
		},
		methods: {
			goBack() {
				if (this.buyNow == 1) {
					uni.navigateBack()
				} else {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			changeMethod(method) {
				this.paymentMethod = method
			},
			close() {
				this.show = false
			},
			pay(data, provider) {
				if (provider === 'balance') {
					uni.redirectTo({
						url: '/pages/payAfter/payAfter?status=' + 1
					})
				} else if (provider === 'wxpay') {
					console.log(data)

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
								uni.$u.toast(err);
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
			submitOrderBefore() {
				if (this.paymentMethod === 'Balance' || this.paymentMethod === 'Mix') {
					this.show = true;
				} else {
					this.submitOrder()
				}
			},
			toSubmit() {
				this.show = false;
				this.submitOrder();
			},
			submitOrder() {
				if (!this.defaultAddress) {
					uni.$u.toast('请选择收货地址');
					return false;
				}
				if (!this.paymentMethod) {
					uni.$u.toast('请选择支付方式');
					return false;
				}
				let type;
				if (this.paymentMethod === 'WxPay') {
					type = 0
				} else if (this.paymentMethod === 'Balance') {
					type = 1
				} else {
					type = 2
				}
				let postData = {
					products: [],
					type,
					paypass: this.paypass
				}
				this.goodsData.forEach(item => {
					postData.products.push({
						product_id: item.id,
						count: item.qty
					})
				})
				this.loading = true;
				placeOrder(postData).then(res => {
					if (type == 0) {
						getPreOrder({
							id: res.data[0].order_id
						}).then(res => {
							let data = res.data[0]
							uni.requestPayment({
								"provider": "wxpay",
								"orderInfo": {
									'appid': data.appid,
									'noncestr': data.noncestr,
									'package': data.package,
									'partnerid': data.partnerid,
									'timestamp': data.timeStamp,
									'prepayid': data.prepayid,
									'sign': data.sign,
								},
								success(res) {
									uni.redirectTo({
										url: '/pages/payAfter/payAfter?status=' + 1
									})
								},
								fail(err) {
									uni.$u.toast(err);
									uni.redirectTo({
										url: '/pages/payAfter/payAfter?status=' + 0
									})
								}
							})
						})
					} else {
						uni.redirectTo({
							url: '/pages/payAfter/payAfter?status=' + 1
						})
					}
				}).finally(() => {
					this.loading = false;
				})
			},
			getList() {
				getUserAddress().then(res => {
					this.addressList = res.data
				})
			}
		},
		onLoad(options) {
			this.buyNow = options.buyNow || 0
		},
		onShow() {
			this.getList();
		}
	}
</script>

<style lang="scss" scoped>
	.customLabel {
		margin-top: 5px;
		font-size: 12px;
		color: #909193;
		line-height: 18px;
	}

	.add-address-btn {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 20rpx;
		background-color: #fff;
		height: 140rpx;
	}

	.u-slot-title,
	.u-slot-title2 {
		font-weight: 700;
		text-align: right;
	}

	.u-slot-title2 {
		color: $u-tips-color;
	}

	.container {
		padding: 20rpx;
		padding-bottom: 150rpx;
	}

	.part {
		overflow: hidden;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 10px;
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		align-items: center;
		position: relative;
		padding: 20rpx;
		background-color: #fff;

		.rightContent {
			display: flex;
			flex: 1;
		}

		.image-wrapper {
			width: 150rpx;
			height: 150rpx;
			flex-shrink: 0;
			position: relative;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 0;
			overflow: hidden;
			position: relative;
			padding-left: 30rpx;

			.t1,
			.t2 {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
			}

			.t2 {
				color: $u-tips-color;
			}
		}
	}

	.popupCon {
		position: relative;
		height: 800rpx;
		padding: 0 20rpx;
		display: flex;
		flex-direction: column;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60px;
			font-weight: 700;
			font-size: 16px;
		}

		.con {
			overflow: auto;
			flex: 1;
			height: 0;
		}

		.btn-bottom {
			padding: 20rpx 0;
		}
	}
</style>
