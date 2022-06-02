<template>
	<view class="product-item">
		<view class="image-wrapper">
			<u-image :showLoading="true" :src="JSON.parse(product.product.photoPath)[0].url" mode="aspectFit"
				width="100%" height="330rpx" radius="4px">
			</u-image>
		</view>
		<view class="right">
			<u-text :lines="1" block margin="10rpx 0" :text="product.product.productName"></u-text>
			<view class="btm">
				<PriceText :productItem="product.product"></PriceText>
				<text class="num">库存: {{product.inventory}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import PriceText from '@/components/PriceText.vue'
	export default {
		props: ['product'],
		data() {
			return {

			};
		},
		components: {
			PriceText
		},
		methods: {
			handleClick(product) {
				this.$emit('clickItem', product)
			},
			valChange(val) {
				console.log(val)
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

		.qtyInput {
			display: flex;
			justify-content: flex-end;
		}

		.btm {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
		}
	}

	.image-wrapper {
		width: 100%;
		height: 330rpx;
		overflow: hidden;
		flex-shrink: 0;
	}

	.right {
		padding: 10rpx;
	}
</style>
