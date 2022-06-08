<template>
	<view class="container">
		<u-popup :show="showBuhuoListDetail" @close="showBuhuoListDetail = false">
			<view class="popupCon">
				<view class="productWrap">
					<view class="product-item" v-for="item in buhuoListDetail" :key="item.id">
						<view class="image-wrapper">
							<u-image :showLoading="true" :src="JSON.parse(item.photoPath)[0].url" mode="aspectFit"
								width="100%" height="100rpx" radius="4px">
							</u-image>
						</view>
						<text class="num">数量: {{item.quantity}}</text>
					</view>
				</view>
				<view class="totalPrice">合计:<u-text mode="price" color="#fa436a" :text="buHuoPrice"></u-text>
				</view>
				<u-button text="提交补货单" type="primary" :loading="loadingPopup" @click="submitFormBuHuo"></u-button>
			</view>
		</u-popup>
		<u-tabs :list="menuList" keyName="cateName" @click="clickMenu"></u-tabs>
		<view class="content2">
			<view class="productWrapCon">
				<template v-if="productList.length||loadDataProductStatus">
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadProductData">
						<view class="productWrap">
							<template v-for="(product, index) in productList">
								<BuHuoProductItem :product="product" :key="index"></BuHuoProductItem>
							</template>
						</view>
						<u-loadmore :status="productStatus" />
					</scroll-view>
				</template>
				<template v-else>
					<view class="no-result">
						<u-empty mode="data"></u-empty>
					</view>
				</template>
			</view>
		</view>
		<view class="btn">
			<u-button text="提交补货单" type="primary" :loading="loading2" @click="submitFormBuHuoBefore"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		addReplenishment,
	} from '@/api/replenishment.js';
	import {
		getProductList
	} from '@/api/product.js'
	import BuHuoProductItem from '@/components/BuHuoProductItem.vue'
	export default {
		data() {
			return {
				loadingPopup: false,
				showBuhuoListDetail: false,
				buhuoListDetail: [],
				loading2: false,
				productList: [],
				loadDataProductStatus: true,
				productStatus: 'loadmore',
				productForm: {
					page: 1,
					pageSize: 10,
					total: 0,
					productType:0
				},
				menuList: [{
					cateName: '普通产品',
					productType: 0,
				}, {
					cateName: '推广产品',
					productType: 1,
				}]
			};
		},
		components: {
			BuHuoProductItem,
		},
		computed: {
			buHuoPrice() {
				let buhuoListDetail = this.buhuoListDetail,
					price = 0;
				buhuoListDetail.forEach(item => {
					price += (item.price * item.quantity)
				})
				return price
			}
		},
		methods: {
			loadProductData() {
				if (this.productList.length >= this.productForm.total) {
					this.productStatus = 'noMore';
					return;
				}
				this.productForm.page += 1;
				this.getProduct()
			},
			clickMenu(item) {
				console.log('item', item);
				this.productForm.productType = item.productType;
				this.loadDataProductStatus = true;
				this.productList = []
				this.productForm.page = 1;
				this.getProduct()
			},
			getProduct() {
				this.productStatus = 'loading'
				getProductList(this.productForm).then(res => {
					this.productForm.total = res.data.total;
					this.productStatus = 'noMore';
					this.loadDataProductStatus = false;
					res.data.list.forEach(item => {
						item.quantity = 0;
					});
					this.productList = this.productList.concat(res.data.list);
				})
			},
			submitFormBuHuo() {
				this.loadingPopup = true;
				let postData = [];
				this.buhuoListDetail.forEach(item => {
					postData.push({
						productId: item.id,
						qty: item.quantity,
						name: item.productName,
						picPath: JSON.parse(item.photoPath)
					})
				})
				addReplenishment({
					demandProducts: JSON.stringify(postData)
				}).then(res => {
					uni.$u.toast('补货单已提交~')
					this.showBuhuoListDetail = false;
				}).finally(() => {
					this.loadingPopup = false;
				})
			},
			submitFormBuHuoBefore() {
				let arr = [];
				this.productList.forEach(item => {
					if (item.quantity > 0) {
						arr.push(item)
					}
				})
				if (!arr.length) {
					uni.$u.toast('请先选择货物');
					return false;
				}
				this.buhuoListDetail = arr;
				this.showBuhuoListDetail = true;
			},
		},
		onLoad() {
			this.getProduct();
		}
	}
</script>

<style lang="scss" scoped>
	@include container-100();

	.container {
		position: relative;
	}

	.scroll-Y {
		height: 100%;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 10px;
		background-color: #fff;
	}

	.content2 {
		height: calc(100% - 104px);
		padding: 10rpx;

		.productWrapCon {
			height: 100%;
		}

		.productWrap {
			display: flex;
			flex-wrap: wrap;
			padding: 10rpx;
		}
	}

	.popupCon {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 400rpx;

		.productWrap {
			overflow: auto;
			max-height: 400rpx;
		}

		.product-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx;
			background-color: #fff;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			padding: 10rpx;

			.qtyInput {
				display: flex;
				justify-content: flex-end;
			}

			.btm {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 14px;
			}
		}

		.image-wrapper {
			width: 100rpx;
			height: 100rpx;
			overflow: hidden;
			flex-shrink: 0;
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			flex: 1;

			.top {
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				justify-content: space-between;
				margin-bottom: 30rpx;
			}
		}

		.totalPrice {
			padding: 10rpx;
			font-size: 16px;
		}
	}
</style>
