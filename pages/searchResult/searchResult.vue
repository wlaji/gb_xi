<template>
	<view class="container" :style="{paddingTop:customBar+'px'}">
		<u-navbar leftText="返回" title="搜索结果" fixed>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="19" @click="goBack"></u-icon>
				<u-line direction="column" :hairline="false" length="16" margin="0 8px"></u-line>
				<u-icon name="home" size="20" @click="goHome"></u-icon>
			</view>
		</u-navbar>
		<view class="content">
			<template v-if="productList.length||loadDataStatus">
				<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadData">
					<view class="productWrap">
						<template v-for="(product, index) in productList">
							<ProductItem :product="product" :key="index" @clickItem="navToDetailPage"></ProductItem>
						</template>
					</view>
					<u-loadmore :status="status" />
				</scroll-view>
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
	import {
		getProductList
	} from '@/api/product.js'
	import ProductItem from '@/components/ProductItem.vue'
	export default {
		data() {
			return {
				loadDataStatus: true,
				productList: [],
				status: 'loadmore',
				customBar: this.customBar,
				form: {
					keyword: '',
					categoryId: null,
					page: 1,
					pageSize: 7,
				},
				total: 0
			};
		},
		components: {
			ProductItem
		},
		methods: {
			loadData() {
				if (this.productList.length >= this.total) {
					this.status = 'noMore';
					return;
				}
				this.form.page += 1;
				this.getPageData()
			},
			getPageData() {
				this.status = 'loading'
				getProductList(this.form).then(res => {
					this.productList = this.productList.concat(res.data.list);
					this.total = res.data.total;
					if (this.productList.length >= this.total) {
						this.status = 'noMore';
					}
					this.loadDataStatus = false;
				})
			},
			navToDetailPage(item) {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail?id=' + item.id
				})
			},
			goBack() {
				uni.navigateBack()
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		},
		onLoad(options) {
			this.form.keyword = decodeURIComponent(options.keyword);
			this.getPageData();
		}
	}
</script>

<style lang="scss" scoped>
	@include container-100();

	.container {
		display: flex;
		flex-direction: column;

		.content {
			height: 100%;
			padding-bottom: 10px;

			.scroll-Y {
				height: 100%;

				.productWrap {
					display: flex;
					flex-wrap: wrap;
					padding: 10rpx;
				}
			}
		}
	}
</style>
