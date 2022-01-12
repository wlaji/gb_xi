<template>
	<view class="container" :style="{paddingTop:customBar+'px'}">
		<u-navbar leftText="返回" title="搜索结果" fixed>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="19" @click="goBack"></u-icon>
				<u-line direction="column" :hairline="false" length="16" margin="0 8px"></u-line>
				<u-icon name="home" size="20" @click="goHome"></u-icon>
			</view>
		</u-navbar>
		<view class="searchCon">
			<template v-if="productList.length">
				<view v-for="(item, index) in productList" :key="index" class="product-item"
					@click="navToDetailPage(item)">
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
			</template>
			<template v-else>
				<view class="no-result">
					<u-empty mode="search"></u-empty>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: '',
				productList: [],
				status: 'loadmore',
				customBar:this.customBar
			};
		},
		methods: {
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			goBack(){
				uni.navigateBack()
			},
			goHome(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			}
		},
		onLoad(options) {
			this.keyword = decodeURIComponent(options.keyword);
			this.productList = this.$json.goodsList

		},
		onReady() {
			console.log()
		},
		onReachBottom() {
			console.log(321321)
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

	.no-result {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 800rpx;
	}

	.container {
		display: flex;
		flex-direction: column;
		/* #ifndef H5 */
		min-height: 100vh;

		/* #endif */
		.search-area {
			position: fixed;
			top: 44px;
			left: 0;
			right: 0;
			background-color: $u-bg-color;
			z-index: 10;
		}

		.searchCon {
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
				font-weight: 700;
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
