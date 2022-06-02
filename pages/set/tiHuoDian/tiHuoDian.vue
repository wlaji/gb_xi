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
		<u-subsection :list="list" :current="current" @change="changeTab">
		</u-subsection>
		<template v-if="current===0">
			<view class="kuCunCon">
				<template v-if="kuCunList.length||loadDataKuCunStatus">
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadKuCunData">
						<view class="productWrap">
							<template v-for="(product, index) in kuCunList">
								<KuCunProductItem :product="product" :key="index"></KuCunProductItem>
							</template>
						</view>
						<u-loadmore :status="kuCunstatus" />
					</scroll-view>
				</template>
				<template v-else>
					<view class="no-result">
						<u-empty mode="data"></u-empty>
					</view>
				</template>
			</view>
		</template>
		<template v-if="current===1">
			<view class="content1">
				<template v-if="buHuolist.length||loadDataBuHuoStatus">
					<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadBuHuoData">
						<view class="productWrap">
							<view class="product-item-wrap" v-for="(item, index) in buHuolist" :key="item.id">
								<view class="product-title u-border-bottom">
									<text>{{item.createTime}}</text>
									<text class="status">{{buHuoStatusList[item.status]}}</text>
								</view>
								<view class="product-item" v-for="(citem,cindex) in JSON.parse(item.demandProducts)"
									:key="cindex">
									<view class="left-img">
										<u-image :showLoading="true" :src="citem.picPath[0].url" width="100%"
											height="200rpx" radius="4px">
										</u-image>
									</view>
									<view class="right-con">
										<view class="r1">
											<text class="title u-line-1">{{citem.name}}</text>
										</view>
										<view class="r2">
											<text class="num">
												x{{citem.qty}}
											</text>
										</view>
									</view>
								</view>
								<view class="orderBtnGroup">
									<view class="left">
										<u-text type="info" :text="'运单号:'+item.numberId" size="12"></u-text>
									</view>
									<view class="right">
										<button class="u-reset-button zf" @click="addNew(item)">再来一单</button>
									</view>
								</view>
							</view>
						</view>
						<u-loadmore :status="buHuostatus" />
					</scroll-view>
				</template>
				<template v-else>
					<view class="no-result">
						<u-empty mode="data"></u-empty>
					</view>
				</template>
			</view>
		</template>
		<template v-else-if="current===2">
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
		</template>
	</view>
</template>

<script>
	import {
		getReplenishmentList,
		addReplenishment,
		editReplenishment,
		getInventoryList
	} from '@/api/replenishment.js';
	import {
		getProductList
	} from '@/api/product.js'
	import KuCunProductItem from '@/components/KuCunProductItem.vue'
	import BuHuoProductItem from '@/components/BuHuoProductItem.vue'
	import PriceText from '@/components/PriceText.vue'
	export default {
		data() {
			return {
				buHuoStatusList: {
					0: '驳回/取消',
					1: '已提交',
					2: '审核通过',
					3: '已发货',
					4: '已签收',
				},
				loadingPopup: false,
				showBuhuoListDetail: false,
				buhuoListDetail: [],
				loading2: false,
				productList: [],
				loadDataBuHuoStatus: true,
				loadDataProductStatus: true,
				buHuostatus: 'loadmore',
				productStatus: 'loadmore',
				buHuolist: [],
				kuCunForm: {
					page: 1,
					pageSize: 10,
					totalPages: 0,
				},
				buHuoForm: {
					page: 1,
					pageSize: 10,
					totalPages: 0,
				},
				productForm: {
					page: 1,
					pageSize: 10,
					total: 0,
				},
				list: ['库存', '补货列表', '补货'],
				current: 0,
				list1: [],
				menuList: [{
					cateName: '普通产品',
					productType: 0,
				}, {
					cateName: '推广产品',
					productType: 1,
				}],
				kuCunList: [],
				loadDataKuCunStatus: true,
				kuCunstatus: false,
			};
		},
		components: {
			BuHuoProductItem,
			KuCunProductItem,
			PriceText
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
		watch: {
			current(newVal) {
				console.log(newVal)
				if (newVal === 0) {
					this.loadDataKuCunStatus = true;
					this.kuCunForm.page = 1;
					this.kuCunList = [];
					this.getKuCunList()
				} else if (newVal === 1) {
					this.loadDataBuHuoStatus = true;
					this.buHuoForm.page = 1;
					this.buHuolist = [];
					this.getList();
				} else if (newVal === 2) {
					this.loadDataProductStatus = true;
					this.productList = []
					this.productForm.page = 1;
					this.productForm.productType = 0;
					this.getProduct()
				}
			}
		},
		methods: {
			loadKuCunData() {
				if (this.kuCunForm.page >= this.kuCunForm.totalPages) {
					this.kuCunstatus = 'noMore';
					return;
				}
				this.kuCunForm.page += 1;
				this.getKuCunList()
			},
			loadBuHuoData() {
				if (this.buHuoForm.page >= this.buHuoForm.totalPages) {
					this.buHuostatus = 'noMore';
					return;
				}
				this.buHuoForm.page += 1;
				this.getList()
			},
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
			changeTab(index) {
				this.current = index;
			},
			getList() {
				this.buHuostatus = 'loading'
				getReplenishmentList(this.buHuoForm).then(res => {
					this.buHuolist = this.buHuolist.concat(res.data.content);
					this.buHuoForm.totalPages = res.data.totalPages;
					this.buHuostatus = 'noMore';
					this.loadDataBuHuoStatus = false;
				})
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
			getKuCunList() {
				this.kuCunstatus = 'loading'
				getInventoryList(this.kuCunForm).then(res => {
					this.kuCunList = res.data.content;
					this.kuCunForm.totalPages = res.data.totalPages;
					this.kuCunstatus = 'noMore';
					this.loadDataKuCunStatus = false;
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
			addNew(item) {
				editReplenishment({
					id: item.id,
					demandProducts: item.demandProducts
				}).then(res => {
					uni.$u.toast('补货单已提交~');
				})
			},
		},
		onLoad() {
			this.getKuCunList();
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

	.kuCunCon {
		height: calc(100% - 32px);

		.productWrap {
			display: flex;
			flex-wrap: wrap;
			padding: 10rpx;
		}
	}

	.content1 {
		height: calc(100% - 32px);
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
		height: calc(100% - 76px);
		padding: 10rpx;
		padding-bottom: 80px;

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
</style>
