<template>
	<view>
		<!-- 常规产品 -->
		<template v-if="productItem.productType==0">
			<u-text bold mode="price" :text="productItem.price*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 推广产品 -->
		<template v-else-if="productItem.productType==1">
			<u-text bold mode="price" :text="productItem.price*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 0元购产品 -->
		<template v-else-if="productItem.productType==2">
			<u-text bold mode="price" :text="productItem.price*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 秒杀 -->
		<template v-else-if="productItem.productType==3">
			<u-text bold mode="price" :text="productItem.flashDalePrice*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 金币兑换 -->
		<template v-else-if="productItem.productType==4">
			<view style="display: flex;">
				<u-text bold mode="price" :text="productItem.price*quantity" color="#fa436a" style="flex:0"></u-text>
				<text class="plus">+</text>
				<u-text bold prefixIcon="rmb-circle" iconStyle="color:#c7b033;font-size:18px;margin-right:5rpx;"
					:text="productItem.pointPrice*quantity" color="#fa436a" style="flex:0"></u-text>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		name: "PriceText",
		props: {
			'productItem': {},
			'quantity': {
				type: Number,
				default: 1
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.plus {
		color: $price-color;
		font-weight: 700;
		margin: 0 2px;
	}
</style>
