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
			<view v-for="(item, index) in productList" :key="index" class="hot-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<u-image :showLoading="true" :src="item.image" width="100%" height="330rpx" radius="4px">
					</u-image>
				</view>
				<view style="padding:10rpx;">
					<text class="title u-line-1" style="display: block;">{{item.title}}</text>
					<view class="btm">
						<text class="price">￥{{item.price}}</text>
						<text>已售: 10</text>
					</view>
				</view>
			</view>
		</view>
		<view>
			<u-popup :show="showDialog" safeAreaInsetTop mode="right" :customStyle="{width:'600rpx'}"
				@close="showDialog=false">
				<view>
					<text>出淤泥而不染，濯清涟而不妖</text>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
				}]
			};
		},
		methods: {
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
		overflow: hidden;
		display: flex;
		flex-direction: column;
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */

		.tab {
			display: flex;
			align-items: center;
			height: 80rpx;
			padding: 0 20rpx;
			font-size: 16px;
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
			overflow: auto;
			display: flex;
			flex-wrap: wrap;
			padding: 10rpx;

			.hot-item {
				display: flex;
				flex-direction: column;
				margin:10rpx;
				width: calc(50% - 20rpx);
				background-color: #fff;
				box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
				.btm{
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
			}

			.price {
				line-height: 1;
				color: $price-color;
				font-weight: 700;
			}

			.originPrice {
				margin-left: 10rpx;
				text-decoration: line-through;
				color: $u-light-color;
			}
		}

	}
</style>
