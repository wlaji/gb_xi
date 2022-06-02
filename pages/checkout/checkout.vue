<template>
	<view class="container">
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
		<view class="part">
			<u-cell-group :border="false">
				<u-cell size="large" icon="map-fill" :border="false" :iconStyle="{color:'red'}" title="中建五局二公司"
					label="肖伟成 15773003996" isLink url="/pages/set/addressManage/addressManage"></u-cell>
			</u-cell-group>
		</view>
		<view class="part" v-for="(item,index) in goodsData" :key="index">
			<view class="cart-item">
				<view class="rightContent">
					<view class="image-wrapper">
						<u-image :showLoading="true" :src="JSON.parse(item.photoPath)[0].url" width="150rpx"
							height="150rpx" radius="10px"></u-image>
					</view>
					<view class="item-right">
						<view class="t1">
							<text class="title u-line-1" style="display: block;">{{item.productName}}</text>
							<view>
								<template v-if="item.productType==4">
									<u-text prefixIcon="rmb-circle"
										iconStyle="color:#fa436a;font-size:18px;margin-right:5rpx;"
										:text="item.pointPrice*item.quantity" color="#fa436a"></u-text>
								</template>
								<template v-else>
									<u-text mode="price" :text="item.price*item.quantity" color="#fa436a" align="right">
									</u-text>
								</template>
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
				<u-cell :border="false" title="配送服务" value="快递 免邮">
				</u-cell>
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
				<u-cell :border="false" title="合计">
					<view slot="value" class="u-slot-title">
						￥{{total}}
					</view>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="part">
			<PayList></PayList>
		</view>
		<view class="add-address-btn">
			<u-button :loading="loading" color="linear-gradient(to right, rgb(255, 85, 0), rgb(240, 76, 0))" text="提交订单"
				@click="submitOrder"></u-button>
		</view>
	</view>
</template>

<script>
	import PayList from '@/components/PayList.vue'
	export default {
		data() {
			return {
				loading:false,
				bezhuIndex: '',
				beizhu: '',
				show: false,
				total: 0,
				discount: 0,
			}
		},
		components: {
			PayList
		},
		computed: {
			goodsData() {
				return this.$store.state.tempCart
			}
		},
		methods: {
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
			calcTotal() {
				let list = this.goodsData;
				let total = 0;
				list.forEach(item => {
					total += item.price
				})
				this.total = Number(total.toFixed(2));
			},
			submitOrder() {
				console.log(this.payMentMethod);
				this.loading = true;
				uni.$u.sleep(300).then(() => {
					console.log('定时结束');
					this.loading = false;
					uni.navigateTo({
						url:'/pages/payAfter/payAfter'
					})
				})
			}
		},
		onShow() {
			this.calcTotal()
		}
	}
</script>

<style lang="scss" scoped>
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
