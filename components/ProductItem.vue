<template>
	<view class="product-item" @click="handleClick(product)">
		<view class="image-wrapper">
			<u-image :showLoading="true" :src="'https://www.guoben.shop'+product.pic" mode="aspectFit" width="100%" height="330rpx" radius="4px">
			</u-image>
		</view>
		<view style="padding:10rpx;">
			<u-text :lines="1" block margin="10rpx 0" :text="product.product_name"></u-text>
			<view class="btm">
				<div style="display: flex;align-items: center;">
					<u-text mode="price" :text="product.discount_amount" color="#fa436a"></u-text>
					<u-text mode="price" decoration="line-through" size="12" :text="product.product_amount" color="#ccc"></u-text>
				</div>
				<text class="num">库存: {{product.stock}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import PriceText from '@/components/PriceText.vue'
	export default {
		name: "ProductItem",
		props: ['product'],
		data() {
			return {

			};
		},
		components:{
			PriceText
		},
		methods: {
			handleClick(product) {
				console.log(product)
				this.$emit('clickItem',product)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-item {
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		min-width: calc(50% - 20rpx);
		width: calc(50% - 20rpx);
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 4px;

		.btm {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size:14px;
		}
	}

	.image-wrapper {
		width: 100%;
		height: 330rpx;
		overflow: hidden;
		padding: 10rpx;
		flex-shrink: 0;
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
</style>
