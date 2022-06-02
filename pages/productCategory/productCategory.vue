<template>
	<view class="container">
		<BindInfo></BindInfo>
		<view>
			<u-search placeholder="请输入搜索关键字" disabled shape="round" margin="10px" bgColor="#ffffff" :showAction="false"
				@click="toSearch"></u-search>
		</view>
		<view class="zqList">
			<view class="zqItem" v-for="item in zqList" :key="item.cateName" @click="tozq(item)">
				<u-icon :name="item.iconName" color="#fa436a" size="30"></u-icon>
				<text>{{item.cateName}}</text>
			</view>
		</view>
		<view class="content">
			<view class="left-aside">
				<view v-for="(item,index) in flist" :key="item.id" class="f-item"
					:class="{active: index === currentIndex}" @click="tabtap(item,index)">
					{{item.cateName}}
				</view>
			</view>
			<view class="right-content">
				<view class="t-list">
					<view class="t-item" v-for="titem in slist" :key="titem.id" @click="toProductList(titem)">
						<u-image :showLoading="true" src="/static/image/2.jpg" width="140rpx" height="140rpx"></u-image>
						<text style="margin-top: 10rpx;">{{titem.cateName}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getAllProductCate
	} from '@/api/product.js';
	import BindInfo from '@/components/BindInfo.vue'
	export default {
		data() {
			return {
				currentIndex: 0,
				slist: [],
				flist: [],
				carouselList: []
			}
		},
		components: {
			BindInfo
		},
		computed:{
			zqList(){
				return this.$store.state.list
			}
		},
		onLoad() {
			this.carouselList = this.$json.carouselList
			this.getPageData()
		},
		methods: {
			getPageData() {
				//获取所有产品分类
				getAllProductCate().then(res => {
					this.flist = res.data;
					this.slist = this.flist[this.currentIndex].children;
				})
			},
			toProductList(item) {
				uni.navigateTo({
					url: `/pages/productList/productList?cateId=${item.id}&productType=0&cateName=${item.cateName}`
				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			tabtap(item, index) {
				this.currentIndex = index;
				this.slist = this.flist[this.currentIndex].children;
			},
			tozq(item){
				uni.navigateTo({
					url: `/pages/productList/productList?cateId=null&productType=${item.productType}&cateName=${item.cateName}`
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
		height: 100vh;
		/* #endif */
	}
	
	.zqList{
		display: flex;
		margin-bottom: 10rpx;
		.zqItem{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			flex-basis: calc(25% - 20rpx);
			margin:10rpx;
			height: 150rpx;
			background-color: #fefefe;
			border-radius: 10px;
			text{
				margin-top: 10rpx;
			}
		}
	}

	.content {
		overflow: auto;
		flex: 1;
		display: flex;

		.left-aside {
			overflow: auto;
			flex-shrink: 0;
			width: 200rpx;
			background-color: #fff;

			.f-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100rpx;
				font-size: 28rpx;
				position: relative;
				color: $u-main-color;

				&.active {
					background: #f8f8f8;
					color: $primary-color;

					&:before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						height: 36rpx;
						width: 8rpx;
						border-radius: 0 4px 4px 0;
						background-color: $primary-color;
						opacity: .8;
					}
				}
			}
		}

		.right-content {
			overflow: auto;
			flex: 1;
			margin-left: 20rpx;
			margin-right: 20rpx;
			border-radius: 8px;
			background: #fff;

			.t-list {
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				padding-top: 12rpx;

				&:after {
					content: '';
					flex: 99;
					height: 0;
				}
			}

			.t-item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: calc(100% / 3);
				padding: 5rpx;
				font-size: 26rpx;
				color: #666;
				padding-bottom: 20rpx;
			}
		}
	}
</style>
