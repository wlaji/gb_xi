<template>
	<view class="container">
		<view class="content">
			<u-search placeholder="请输入搜索关键字" disabled shape="round" margin="10px" bgColor="#ffffff" :showAction="false"
				@click="toSearch"></u-search>
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<u-swiper class="swiper" :list="carouselList" keyName="src" circular indicator height="400rpx"
					radius="5"></u-swiper>
			</view>
			<view class="category">
				<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
					<view v-for="(item, index) in list" :key="index" class="category-item" @click="toCategory">
						<u-image :showLoading="true" :src="item.thumb" width="50" height="50" shape="circle"></u-image>
						<text style="margin-top: 4px;">{{item.title}}</text>
					</view>
					<view class="category-item" @click="toCategory">
						<u-icon size="50" name="more-circle-fill" color="#2b85e4"></u-icon>
						<text>查看更多</text>
					</view>
				</u-scroll-list>
			</view>

			<!-- 			<view class="ad-1">
				<u-image :showLoading="true" src="/static/temp/ad1.jpg" width="100%" height="210rpx"
					mode="scrollToFill"></u-image>
			</view> -->

			<!-- 0元购 -->
			<view class="hot-header">
				<i class="iconfont icon-xianshitejia" style="font-size:30px;margin-right: 20rpx;color:#fa436a"></i>
				<view class="tit-box">
					<text class="tit">0元购专区</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="seckill-section">
				<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
					<view v-for="(item, index) in goodsList" :key="index" class="floor-item"
						@click="navToDetailPage(item)">
						<u-image :showLoading="true" :src="item.image" width="150rpx" height="150rpx" radius="4px">
						</u-image>
						<text class="title u-line-1" style="display: block;font-size:13px;">{{item.title}}</text>
						<view>
							<text class="price">￥0</text>
						</view>
					</view>
				</u-scroll-list>
			</view>

			<!-- 分类精选 -->
			<view class="hot-header">
				<i class="iconfont icon-fenlei" style="font-size:30px;margin-right: 20rpx;color:#fa436a"></i>
				<view class="tit-box">
					<text class="tit">分类精选</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="category-section">
				<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
					<view v-for="(item, index) in goodsList" :key="index" class="cate-item"
						@click="navToDetailPage(item)">
						<view class="image-wrapper">
							<u-image :showLoading="true" :src="item.image" width="100%" height="330rpx" radius="4px">
							</u-image>
						</view>
						<text class="title u-line-1" style="display: block;">{{item.title}}</text>
						<view>
							<text class="price">￥{{item.price}}</text>
							<text class="originPrice">￥{{item.price}}</text>
						</view>
					</view>
				</u-scroll-list>
			</view>

			<!-- 推荐 -->
			<view class="hot-header">
				<i class="iconfont icon-remen" style="font-size:30px;margin-right: 20rpx;color:#fa436a"></i>
				<view class="tit-box">
					<text class="tit">热门推荐</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>

			<view class="hot-section">
				<view v-for="(item, index) in goodsList" :key="index" class="hot-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<u-image :showLoading="true" :src="item.image" width="100%" height="330rpx" radius="4px">
						</u-image>
					</view>
					<text class="title u-line-2" style="display: block;">{{item.title}}</text>
					<view>
						<text class="price">￥{{item.price}}</text>
						<text class="originPrice">￥{{item.price}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeData: {},
				carouselList: [],
				goodsList: [],
				indicator: true,
				list: [{
					thumb: "/static/temp/c3.png",
					title: "分类1"
				}, {
					thumb: "/static/temp/c5.png",
					title: "分类2"
				}, {
					thumb: "/static/temp/c6.png",
					title: "分类3"
				}, {
					thumb: "/static/temp/c7.png",
					title: "分类4"
				}, {
					thumb: "/static/temp/c8.png",
					title: "分类5"
				}, {
					thumb: "/static/temp/c3.png",
					title: "分类6"
				}]
			};
		},

		onLoad() {
			console.log(this.$json)
			this.carouselList = this.$json.carouselList
			this.goodsList = this.$json.goodsList
		},
		methods: {
			navToDetailPage() {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			},
			toCategory() {
				uni.switchTab({
					url: '/pages/productCategory/productCategory'
				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			onChange(e) {
				this.timeData = e
			}
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				uni.navigateTo({
					url: '/pages/msg/msg'
				});
			}
		},
		// #endif
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 0 10rpx 10rpx;
	}

	.carousel-section {
		margin-bottom: 20px;
	}

	.category {
		padding: 10px 0;
		background: #fff;
	}

	.category-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: calc(20% - 20rpx);
		margin: 0 10rpx;
		flex-shrink: 0;
		text-align: center;
	}

	.ad-1 {
		height: 210rpx;
		padding: 10rpx 20rpx;
		background: #fff;
	}

	/* 秒杀专区 */
	.seckill-section {
		margin: 10px 0;
		padding: 0 20rpx;
		background: #fff;

		.s-header {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 92rpx;
			line-height: 1;

			.left {
				display: flex;
				align-items: center;
			}

			.tip {
				margin: 0 20rpx 0 40rpx;
			}
		}

		.floor-item {
			width: 150rpx;
			margin-right: 20rpx;

			.title {
				padding: 10rpx 0;
			}

			.price {
				color: $price-color;
			}
		}
	}

	.hot-header {
		display: flex;
		align-items: center;
		height: 100rpx;
		margin: 10px 0 0;
		padding: 10rpx 20rpx;
		background: #fff;

		.tit-box {
			flex: 1;
			display: flex;
			flex-direction: column;
		}

		.tit {
			font-size: 16px;
		}
	}

	.category-section {
		background-color: #fff;

		.cate-item {
			display: flex;
			flex-direction: column;
			width: calc(50% - 20rpx);
			margin: 0 10rpx;
			flex-shrink: 0;

			.title {
				padding: 10rpx 0;
			}

			.image-wrapper {
				width: 100%;
				height: 330rpx;
				overflow: hidden;
			}

			.price {
				line-height: 1;
				color: $price-color;
			}

			.originPrice {
				margin-left: 10rpx;
				text-decoration: line-through;
				color: $u-light-color;
			}
		}
	}

	/* 推荐 */
	.hot-section {
		column-count: 2;
		column-gap: 20rpx;
		padding: 0 20rpx;
		background: #fff;

		.hot-item {
			display: flex;
			flex-direction: column;
			padding-bottom: 40rpx;
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
		}

		.originPrice {
			margin-left: 10rpx;
			text-decoration: line-through;
			color: $u-light-color;
		}
	}
</style>
