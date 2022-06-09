<template>
	<view class="container" :style="{paddingTop:customBar+'px'}">
		<u-navbar leftText="返回" title="确认订单" fixed @leftClick="goBack"></u-navbar>
		<u-popup :show="show" mode="bottom" closeable @close="close">
			<view class="popupCon">
				<view class="title">订单备注</view>
				<view class="con">
					<u-textarea v-model="beizhu" placeholder="请输入订单备注" count></u-textarea>
				</view>
				<view class="btn-bottom">
					<u-button type="primary" text="确定"
						color="linear-gradient(to right, rgb(255, 85, 0), rgb(240, 76, 0))" @click="addBeizhu">
					</u-button>
				</view>
			</view>
		</u-popup>
		<view class="part" style="margin-top: 20rpx;">
			<u-cell-group :border="false" v-if="defaultAddress">
				<u-cell size="large" icon="map-fill" :border="false" :iconStyle="{color:'red'}"
					:title="defaultAddress.detailedAddress" :label="defaultAddress.name +' '+ defaultAddress.phone"
					isLink url="/pages/set/addressManage/addressManage?from='checkout'"></u-cell>
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
						<u-image :showLoading="true" :src="JSON.parse(item.product.photoPath)[0].url" width="150rpx"
							height="150rpx" radius="10px"></u-image>
					</view>
					<view class="item-right">
						<view class="t1">
							<text class="title u-line-1" style="display: block;">{{item.product.productName}}</text>
							<view>
								<PriceText :productItem="item.product"></PriceText>
							</view>
						</view>
						<view class="t2">
							<text></text>
							<text>x{{item.quantity}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="part">
			<u-cell-group :border="false">
				<u-cell :border="false" title="配送服务" :value="'快递 '+(calcPostage==0?'免邮':'￥'+calcPostage)">
				</u-cell>
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
				<u-cell :border="false" title="宝豆">
					<view slot="value" class="u-slot-title">
						<u-text bold prefixIcon="rmb-circle" iconStyle="color:#c7b033;font-size:18px;margin-right:5rpx;"
							:text="totalJf" color="#000000" style="flex:0"></u-text>
					</view>
					<view slot="label" class="customLabel">
						<text>可用宝豆{{userInfo.points}}</text>
						<text style="color:red;margin-left: 10px;" v-if="!jfStatus">宝豆不足</text>
					</view>
				</u-cell>
				<u-cell :border="false" title="实付款">
					<view slot="value" class="u-slot-title">
						￥{{totalPrice}}
					</view>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="part">
			<PayList @changeMethod="changeMethod"></PayList>
		</view>
		<view class="part" style="padding: 10px;" v-if="paymentMethod==='Mix'">
			<u-input v-model="mixPayPrice" type="digit" :placeholder="`请输入您要支付的余额(可用余额:${userInfo.funds})`" clearable>
			</u-input>
		</view>
		<view class="add-address-btn">
			<u-button :loading="loading" color="linear-gradient(to right, rgb(255, 85, 0), rgb(240, 76, 0))" text="提交订单"
				@click="submitOrder"></u-button>
		</view>
	</view>
</template>

<script>
	import PriceText from '@/components/PriceText.vue'
	import PayList from '@/components/PayList.vue';
	import {
		addOrder,
		addOrderByCart,
		payment
	} from '@/api/order.js'
	import {
		getUserAddressList,
	} from '@/api/auth.js'
	import {
		getJoinByAreaId,
		getConfigValue
	} from '@/api/public.js'
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
				paymentMethod: 'WxPay',
				buyNow: 0,
				mixPayPrice: '',
			}
		},
		components: {
			PayList,
			PriceText
		},
		computed: {
			jfStatus() {
				return Number(this.userInfo.points) >= this.totalJf
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
				if (!this.addressList) {
					return null;
				}
				let list = this.addressList;
				if (this.$store.state.defaultAddress) {
					console.log(this.$store.state.defaultAddress)
					let findDefault = list.find(item => {
						return item.id == this.$store.state.defaultAddress.id
					})
					if (findDefault) {
						return findDefault
					}
				} else {
					let findDefault = list.find(item => {
						return item.isDefault === 1
					})
					if (findDefault) {
						return findDefault
					} else {
						return list[0]
					}
				}
			},
			calcPostage() {
				let list = this.goodsData,
					postage = this.postage,
					totalPrice = this.total;
				if (totalPrice > postage) {
					return 0
				} else {
					let price = 0;
					list.forEach(item => {
						if (item.product.postagePrice > price) {
							price = item.product.postagePrice
						}
					})
					return Number(price.toFixed(2))
				}
			},
			userInfo() {
				return this.$store.state.userInfo || {}
			},
			total() {
				let list = this.goodsData;
				let total = 0;
				list.forEach(item => {
					total += item.price
				})
				return Number(total.toFixed(2)) || 0;
			},
			totalPrice() {
				return Number((this.total + this.calcPostage).toFixed(2))
			}
		},
		watch: {
			defaultAddress(newValue) {
				// getJoinByAreaId({
				// 	areaId: newValue.areaId
				// }).then(res => {
				// 	console.log(res)
				// })
			}
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
			addBezhuBefore(index) {
				this.bezhuIndex = index;
				this.beizhu = ''
				this.show = true;
			},
			addBeizhu() {
				this.close();
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
					uni.requestPayment({
						provider: provider,
						orderInfo: data,
						success(res) {
							uni.redirectTo({
								url: '/pages/payAfter/payAfter?status=' + 1
							})
						},
						fail(err) {
							uni.$u.toast(err.errMsg);
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
								uni.$u.toast(err.errMsg);
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
			submitOrder() {
				if (!this.defaultAddress) {
					uni.$u.toast('请选择收货地址');
					return false;
				}
				if (!this.paymentMethod) {
					uni.$u.toast('请选择支付方式');
					return false;
				}
				this.loading = true;
				let list = this.goodsData;
				let cartIdList = list.map(item => {
					return item.id
				});
				let defaultAddress = this.defaultAddress;
				let postData
				if (this.buyNow == 1) {
					postData = {
						productId: this.goodsData[0].product.id,
						quantity: this.goodsData[0].quantity,
						provinceId: defaultAddress.provinceId,
						province: defaultAddress.province,
						cityId: defaultAddress.cityId,
						city: defaultAddress.city,
						areaId: defaultAddress.areaId,
						area: defaultAddress.area,
						detailedAddress: defaultAddress.detailedAddress,
						pickupPointId: null,
						paymentMethod: this.paymentMethod,
						phone: defaultAddress.phone,
						mixPayPrice: this.mixPayPrice,
						name: defaultAddress.name
					};
					addOrder(postData).then(res => {
						payment({
							orderId: res.data
						}).then(res => {
							this.pay(res.data, this.paymentMethod.toLowerCase())
						}).catch(err => {
							uni.$u.toast(err.message);
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/payAfter/payAfter?status=' + 0
								})
							}, 1000)
						})
					}).finally(() => {
						this.loading = false;
					})
				} else {
					postData = {
						cartIdList: cartIdList,
						provinceId: defaultAddress.provinceId,
						province: defaultAddress.province,
						cityId: defaultAddress.cityId,
						city: defaultAddress.city,
						areaId: defaultAddress.areaId,
						area: defaultAddress.area,
						detailedAddress: defaultAddress.detailedAddress,
						pickupPointId: null,
						paymentMethod: this.paymentMethod,
						mixPayPrice: this.mixPayPrice,
						phone: defaultAddress.phone,
						name: defaultAddress.name
					};
					//调用下单
					addOrderByCart(postData).then(res => {
						payment({
							orderId: res.data
						}).then(res => {
							this.pay(res.data, this.paymentMethod.toLowerCase())
						}).catch(err => {
							uni.$u.toast(err.message);
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/payAfter/payAfter?status=' + 0
								})
							}, 1000)
						})
					}).finally(() => {
						this.loading = false;
					})
				}
			},
			getList() {
				getUserAddressList().then(res => {
					this.addressList = res.data;
				})
			}
		},
		onLoad(options) {
			this.buyNow = options.buyNow || 0
		},
		onShow() {
			this.getList();
			getConfigValue({
				groupName: 'order',
				configName: 'free_shipping'
			}).then(res => {
				console.log(res);
				this.postage = Number(res.data);
			})
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
