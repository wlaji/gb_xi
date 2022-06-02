<template>
	<view>
		<!-- 常规产品 -->
		<template v-if="productItem.productType==0">
			<u-text mode="price" :text="productItem.price*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 推广产品 -->
		<template v-else-if="productItem.productType==1">
			<u-text mode="price" :text="productItem.price*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 0元购产品 -->
		<template v-else-if="productItem.productType==2">
			<u-text mode="price" :text="productItem.price*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 秒杀 -->
		<template v-else-if="productItem.productType==3">
			<u-text mode="price" :text="productItem.flashDalePrice*quantity" color="#fa436a"></u-text>
		</template>
		<!-- 金币兑换 -->
		<template v-else-if="productItem.productType==4">
			<u-text prefixIcon="rmb-circle" iconStyle="color:#fa436a;font-size:18px;margin-right:5rpx;" :text="productItem.pointPrice*quantity" color="#fa436a"></u-text>
		</template>
	</view>
</template>

<script>
	export default {
		name:"PriceText",
		props:{
			'productItem':{
			},
			'quantity':{
				type:Number,
				default:1
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">

</style>
