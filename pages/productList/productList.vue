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
					<u-empty mode="data"></u-empty>
				</view>
			</template>
		</view>
		<view>
			<u-popup class="popupConWrap" :show="showDialog" mode="right" :customStyle="{width:'600rpx'}"
				@close="showDialog=false">
				<view class="popupCon">
					<view v-for="item in flist" :key="item.id">
						<view class="cate-item two">{{item.cateName}}</view>
						<view class="cate-item" :class="{'active':citem.id===form.categoryId}"
							v-for="citem in item.children" :key="citem.id" @click="handleClick(citem)">
							{{citem.cateName}}
						</view>
					</view>
					<view v-for="item in zqList" :key="item.cateName">
						<view class="cate-item two" @click="handleClickZq(item)">{{item.cateName}}</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
	import {
		getProductList,
		getAllProductCate
	} from '@/api/product.js'
	import ProductItem from '@/components/ProductItem.vue'
	export default {
		data() {
			return {
				loadDataStatus: true,
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
				flist: [],
				productList: [],
				form: {
					keyword: null,
					categoryId: null,
					page: 1,
					pageSize: 10,
					productType: ''
				},
				total: 0,
			};
		},
		components: {
			ProductItem
		},
		computed: {
			zqList() {
				return this.$store.state.list
			}
		},
		methods: {
			handleClickZq(item) {
				uni.setNavigationBarTitle({
					title: item.cateName
				})
				this.loadDataStatus = true;
				this.form.categoryId = null;
				this.form.productType = item.productType;
				this.form.page = 1;
				this.showDialog = false;
				this.productList = [];
				this.getPageData()
			},
			loadData() {
				if (this.productList.length >= this.total) {
					this.status = 'noMore';
					return;
				}
				this.form.page += 1;
				this.getPageData()
			},
			getPageData() {
				//获取所有产品
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
			handleClick(item) {
				console.log(item);
				uni.setNavigationBarTitle({
					title: item.cateName
				})
				this.loadDataStatus = true;
				this.form.categoryId = item.id;
				this.form.productType = 0;
				this.form.page = 1;
				this.showDialog = false;
				this.productList = [];
				this.getPageData()
			},
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: options.cateName
			})
			this.form.categoryId = options.cateId;
			this.form.productType = options.productType;
			this.getPageData();
			//获取所有产品分类
			getAllProductCate().then(res => {
				this.flist = res.data
			})
		},
		onPullDownRefresh(options) {
			this.loadDataStatus = true;
			this.form.page = 1;
			this.productList = [];
			this.getPageData();
			getAllProductCate().then(res => {
				this.flist = res.data
			})
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss" scoped>
	@include container-100();

	.container {
		display: flex;
		flex-direction: column;

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

		.content {
			height: calc(100% - 40px);
			padding-bottom: 20rpx;

			.scroll-Y {
				height: 100%;

				.productWrap {
					display: flex;
					flex-wrap: wrap;
					padding: 10rpx;
				}
			}
		}

		.tab {
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
	}
</style>
