<template>
	<view class="container">
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
								<!-- <view class="right">
									<button class="u-reset-button zf" @click="addNew(item)">重新提交</button>
								</view> -->
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
	</view>
</template>

<script>
	import {
		getReplenishmentList,
		addReplenishment,
		editReplenishment,
	} from '@/api/replenishment.js';
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
				loadDataBuHuoStatus: true,
				buHuostatus: 'loadmore',
				buHuolist: [],
				buHuoForm: {
					page: 1,
					pageSize: 10,
					totalPages: 0,
				}
			};
		},
		methods: {
			loadBuHuoData() {
				if (this.buHuoForm.page >= this.buHuoForm.totalPages) {
					this.buHuostatus = 'noMore';
					return;
				}
				this.buHuoForm.page += 1;
				this.getList()
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
			this.getList();
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

	.content1 {
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
</style>
