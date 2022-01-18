<template>
	<view class="container">
		<view class="tab">
			<view class="tab-left">
				<view :class="[{ active: activeIndex===0 }, 'tab-item']" @click="changeTab(0)">综合排序</view>
				<view :class="[{ active: activeIndex===1 }, 'tab-item']" @click="changeTab(1)">销量优先</view>
				<view :class="[{ active: activeIndex===2 }, 'tab-item']" @click="changeTab(2)">
					价格
					<view class="arrow">
						<u-icon name="arrow-up" :customStyle="{color:priceType===1?'#fa436a':'#303133'}" size="12px">
						</u-icon>
						<u-icon name="arrow-down" :customStyle="{color:priceType===2?'#fa436a':'#303133'}" size="12px">
						</u-icon>
					</view>
				</view>
			</view>
			<u-line direction="col" length="16px" margin="0 20rpx" color="#333"></u-line>
			<u-icon name="grid" size="30px" @click="showDialog = true"></u-icon>
		</view>
		<view class="content">
			<view v-for="(item, index) in productList" :key="index" class="product-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<u-image :showLoading="true" :src="item.image" width="100%" height="330rpx" radius="4px">
					</u-image>
				</view>
				<view style="padding:10rpx;">
					<text class="title u-line-1" style="display: block;">{{item.title}}</text>
					<view class="btm">
						<text class="price">￥{{item.price}}</text>
						<text class="num">已售: 10</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" />
		</view>
		<view>
			<u-popup class="popupConWrap" :show="showDialog" mode="right" :customStyle="{width:'600rpx'}"
				@close="showDialog=false">
				<view class="popupCon">
					<view>
						<view class="cate-item two">手机通讯</view>
						<view class="cate-item active">全面屏手机</view>
						<view class="cate-item">游戏手机</view>
						<view class="cate-item">老人机</view>
						<view class="cate-item">拍照手机</view>
						<view class="cate-item">女性手机</view>
					</view>
					<view>
						<view class="cate-item two">手机通讯</view>
						<view class="cate-item active">全面屏手机</view>
						<view class="cate-item">游戏手机</view>
						<view class="cate-item">老人机</view>
						<view class="cate-item">拍照手机</view>
						<view class="cate-item">女性手机</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status: 'loadmore',
				showDialog: false,
				priceType: 0,
				activeIndex: 0,
				list1: [{
					name: '综合排序',
				}, {
					name: '销量优先',
				}, {
					name: '价格',
				}],
				productList: [{
					url: '',
					des: '',
					num: 10,
					price: '240'
				}],
				page: 0
			};
		},
		methods: {
			navToDetailPage() {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			},
			changeTab(index) {
				console.log(index)
				this.activeIndex = index;
				if (index === 0) {
					this.priceType = 0;
				} else if (index === 1) {
					this.priceType = 0;
				} else if (index === 2) {
					if (this.priceType === 1) {
						this.priceType = 2
					} else {
						this.priceType = 1
					}
				}
			},
			onReachBottom() {
				if (this.page >= 3) return;
				this.status = 'loading';
				this.page = ++this.page;
				setTimeout(() => {
					if (this.page >= 3) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 2000)
			}
		},
		onLoad() {
			this.productList = this.$json.goodsList
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef H5 */
	page {
		height: 100%;
	}

	.container {
		height: 100%
	}

	/* #endif */
	.container {
		display: flex;
		flex-direction: column;
		/* #ifndef H5 */
		min-height: 100vh;
		/* #endif */
		padding-top: 40px;

		.popupCon {
			.cate-item {
				display: flex;
				align-items: center;
				height: 46px;
				padding-left: 15px;
				position: relative;
				border-bottom: 1px solid #E4E7ED;
			}

			.cate-item.two {
				height: 33px;
				font-size: 16px;
				background: #f8f8f8;
			}

			.cate-item.active {
				color: $price-color;
			}
		}

		.tab {
			position: fixed;
			top: var(--window-top);
			left: 0;
			right: 0;
			display: flex;
			align-items: center;
			height: 40px;
			padding: 0 20rpx;
			font-size: 14px;
			background: #fff;
			box-shadow: 0 1px 5px rgba(0, 0, 0, .25);
			z-index: 10;

			.tab-left {
				flex: 1;
				display: flex;
				justify-content: space-around;
				height: 100%;
			}

			.tab-item {
				position: relative;
				display: flex;
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
			display: flex;
			flex-wrap: wrap;
			padding: 10rpx;

			.product-item {
				display: flex;
				flex-direction: column;
				margin: 10rpx;
				width: calc(50% - 20rpx);
				background-color: #fff;
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
				border-radius: 4px;
				.btm {
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
			}

			.image-wrapper {
				width: 100%;
				height: 330rpx;
				overflow: hidden;
			}

			.title {
				padding: 10rpx 0;
				line-height: 30px;
			}

			.price {
				line-height: 1;
				color: $price-color;
			}

			.num {
				color: $u-tips-color;
				font-size: 12px;
			}

			.originPrice {
				margin-left: 10rpx;
				text-decoration: line-through;
				color: $u-light-color;
			}
		}

	}
</style>
