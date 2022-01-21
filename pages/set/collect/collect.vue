<template>
	<view class="container">
		<view class="content">
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
					<view class="heart" @click.stop="cancelCollect">
						<u-icon name="heart-fill" size="24" color="#fa436a"></u-icon>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="no-result">
					<u-empty mode="data" text="暂无收藏"></u-empty>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productList: [],
				page: 0
			};
		},
		methods: {
			navToDetailPage() {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			},
			cancelCollect() {
				console.log('取消')
			}
		},
		onLoad() {
			this.productList = this.$json.goodsList
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;

		.product-item {
			position: relative;
			display: flex;
			flex-direction: column;
			margin: 10rpx;
			width: calc(50% - 20rpx);
			background-color: #fff;
			box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
			border-radius: 4px;

			.heart {
				position: absolute;
				left: 2rpx;
				top: 2rpx;
			}

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
	.no-result {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 800rpx;
	}
</style>
