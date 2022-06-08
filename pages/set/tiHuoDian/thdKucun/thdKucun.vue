<template>
	<view class="container">
		<view class="kuCunCon">
			<template v-if="kuCunList.length||loadDataKuCunStatus">
				<scroll-view scroll-y="true" class="scroll-Y" @scrolltolower="loadKuCunData">
					<view class="productWrap">
						<template v-for="(product, index) in kuCunList">
							<KuCunProductItem :product="product" :key="index"></KuCunProductItem>
						</template>
					</view>
					<u-loadmore :status="kuCunstatus" />
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
		getInventoryList
	} from '@/api/replenishment.js';
	import KuCunProductItem from '@/components/KuCunProductItem.vue'
	export default {
		data() {
			return {
				kuCunForm: {
					page: 1,
					pageSize: 10,
					totalPages: 0,
				},
				kuCunList: [],
				loadDataKuCunStatus: true,
				kuCunstatus: 'loadmore',
			};
		},
		components: {
			KuCunProductItem,
		},
		methods: {
			loadKuCunData() {
				if (this.kuCunForm.page >= this.kuCunForm.totalPages) {
					this.kuCunstatus = 'noMore';
					return;
				}
				this.kuCunForm.page += 1;
				this.getKuCunList()
			},
			getKuCunList() {
				this.kuCunstatus = 'loading'
				getInventoryList(this.kuCunForm).then(res => {
					this.kuCunList = res.data.content;
					this.kuCunForm.totalPages = res.data.totalPages;
					this.kuCunstatus = 'noMore';
					this.loadDataKuCunStatus = false;
				})
			},
		},
		onLoad() {
			this.getKuCunList();
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

	.kuCunCon {
		height: calc(100% - 32px);

		.productWrap {
			display: flex;
			flex-wrap: wrap;
			padding: 10rpx;
		}
	}
</style>
