<template>
	<view class="container">
		<BindInfo></BindInfo>
		<view class="content">
			<u-search placeholder="请输入搜索关键字" disabled shape="round" margin="10px" bgColor="#ffffff" :showAction="false"
				@click="toSearch"></u-search>
			<!-- 头部轮播 -->
			<view class="carousel-section">
				<u-swiper class="swiper" :list="carouselList" keyName="url" circular indicator height="400rpx"
					radius="5"></u-swiper>
			</view>
			<view style="margin-bottom:20rpx;">
				<u-notice-bar :text="newsList" direction="column" mode="link" bgColor="#eaeef1" color="#333"
					url="/pages/news/newsList">
				</u-notice-bar>
			</view>
			<view class="category">
				<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
					<view v-for="(item, index) in categoryList" :key="index" class="category-item" @click="toCategory">
						<u-image :showLoading="true" src="/static/image/2.jpg" width="50" height="50" shape="circle">
						</u-image>
						<text style="margin-top: 4px;width: 100%;" class="u-line-1">{{item.cateName}}</text>
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

			<!-- 秒杀专区 -->
			<template v-if="productList['秒杀专区'].length">
				<view class="hot-header" @click="tozq(3,'秒杀')">
					<u-icon name="clock" color="#fa436a" size="30" style="margin-right: 20rpx"></u-icon>
					<view class="tit-box">
						<text class="tit">秒杀专区</text>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="category-section">
					<template v-if="productList['秒杀专区'].length">
						<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
							<template v-for="(product,index) in productList['秒杀专区']">
								<ProductItem :key="index" :product="product" @clickItem="navToDetailPage"></ProductItem>
							</template>
						</u-scroll-list>
					</template>
					<template v-else>
						<u-empty mode="list"></u-empty>
					</template>
				</view>
			</template>

			<!-- 0元购 -->
			<template v-if="productList['0元购'].length">
				<view class="hot-header" @click="tozq(2,'0元购')">
					<u-icon name="rmb" color="#fa436a" size="30" style="margin-right: 20rpx"></u-icon>
					<view class="tit-box">
						<text class="tit">0元购</text>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="category-section">
					<template v-if="productList['0元购'].length">
						<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
							<template v-for="(product,index) in productList['0元购']">
								<ProductItem :key="index" :product="product" @clickItem="navToDetailPage"></ProductItem>
							</template>
						</u-scroll-list>
					</template>
					<template v-else>
						<u-empty mode="list"></u-empty>
					</template>
				</view>
			</template>
			<!-- 推广专区 -->
			<template v-if="productList['推广'].length">
				<view class="hot-header" @click="tozq(1,'推广专区')">
					<u-icon name="share" color="#fa436a" size="30" style="margin-right: 20rpx"></u-icon>
					<view class="tit-box">
						<text class="tit">推广专区</text>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="category-section">
					<template v-if="productList['推广'].length">
						<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
							<template v-for="(product,index) in productList['推广']">
								<ProductItem :key="index" :product="product" @clickItem="navToDetailPage"></ProductItem>
							</template>
						</u-scroll-list>
					</template>
					<template v-else>
						<u-empty mode="list"></u-empty>
					</template>
				</view>
			</template>
			<!-- 金币兑换 -->
			<template v-if="productList['金币兑换'].length">
				<view class="hot-header" @click="tozq(4,'金币兑换')">
					<u-icon name="rmb-circle" color="#fa436a" size="30" style="margin-right: 20rpx"></u-icon>
					<view class="tit-box">
						<text class="tit">金币兑换</text>
					</view>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view class="category-section">
					<template v-if="productList['金币兑换'].length">
						<u-scroll-list :indicator="indicator" indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
							<template v-for="(product,index) in productList['金币兑换']">
								<ProductItem :key="index" :product="product" @clickItem="navToDetailPage"></ProductItem>
							</template>
						</u-scroll-list>
					</template>
					<template v-else>
						<u-empty mode="list"></u-empty>
					</template>
				</view>
			</template>

			<!-- 推荐 -->
			<view class="hot-header" @click="toCategory">
				<i class="iconfont icon-remen" style="font-size:30px;margin-right: 20rpx;color:#fa436a"></i>
				<view class="tit-box">
					<text class="tit">热门推荐</text>
				</view>
				<u-icon name="arrow-right"></u-icon>
			</view>
			<view class="hot-section">
				<template v-for="(product,index) in productList['产品推荐']">
					<ProductItem :key="index" :product="product" @clickItem="navToDetailPage"></ProductItem>
				</template>
			</view>
		</view>
		<view class="login-alert" v-if="false">
			<view class="left">
				登录国本商城打开精彩世界
			</view>
			<button type="default" class="u-reset-button" @click="toLogin">立即登录</button>
		</view>
		<updateDialog :showModal.sync="showModal"></updateDialog>
	</view>
</template>

<script>
	import checkUpdateApp from '@/utils/appUpdate.js';
	import updateDialog from '@/components/updateDialog.vue';
	import ProductItem from '@/components/ProductItem.vue';
	import BindInfo from '@/components/BindInfo.vue'
	import {
		getAdvertising,
		getArticle,
		getRecommend
	} from '@/api/public.js'
	import {
		getAllProductCate,
		getProductList
	} from '@/api/product.js'
	export default {
		data() {
			return {
				newsList: [],
				showModal: false,
				carouselList: [],
				indicator: true,
				categoryList: [],
				productList: {
					'0元购': [],
					'产品推荐': [],
					'推广': [],
					'秒杀专区': [],
					'金币兑换': []
				},
			};
		},

		components: {
			updateDialog,
			ProductItem,
			BindInfo
		},
		

		watch: {
			'$store.state.appUpdateInfo': function(val) {
				this.showModal = this.$store.getters.hasNewVersion
			}
		},

		computed: {
			isLogin() {
				return this.$store.getters.isLogin
			}
		},

		onLoad() {
			this.getPageData();
			checkUpdateApp();
		},
		methods: {
			tozq(productType, cateName) {
				uni.navigateTo({
					url: `/pages/productList/productList?cateId=null&productType=${productType}&cateName=${cateName}`
				})
			},
			getPageData() {
				//获取banner
				getAdvertising({
					categoryName: 'home_banner'
				}).then(res => {
					this.carouselList = res.data;
				});
				getArticle({
					categoryName: 'news'
				}).then(res => {
					res.data.forEach(item => {
						this.newsList.push(item.title);
					})
				});
				//获取所有产品分类
				getAllProductCate().then(res => {
					this.categoryList = res.data;
				})
				getRecommend().then(res => {
					this.productList = res.data;
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			navToDetailPage(item) {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail?id=' + item.id
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
			}
		},
		onPullDownRefresh() {
			this.getPageData()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	.login-alert {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		padding: 0 20rpx;
		background-color: rgba(0, 0, 0, .7);
		color: #fff;

		.left {
			flex: 1;
		}

		button {
			width: 100px;
			height: 30px;
			line-height: 30px;
			margin-left: 20px;
			border-radius: 20px;
			background-color: #fa436a;
			color: #fff;
			text-align: center;
			font-size: 14px !important;
		}
	}

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

	.hot-header {
		display: flex;
		align-items: center;
		height: 80rpx;
		margin: 10px 0 0;
		padding: 10rpx 20rpx;
		background: #f6f7fb;
		border-radius: 4px;
		font-weight: 700;

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
	}

	/* 推荐 */
	.hot-section {
		display: flex;
		flex-wrap: wrap;
		padding: 10rpx;
	}
</style>
