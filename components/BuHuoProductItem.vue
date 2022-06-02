<template>
	<view class="product-item" @click="handleClick(product)">
		<view class="image-wrapper">
			<u-image :showLoading="true" :src="JSON.parse(product.photoPath)[0].url" mode="aspectFit" width="100%" height="200rpx" radius="4px">
			</u-image>
		</view>
		<view class="right">
			<view class="top">
				<u-text :lines="1" block margin="10rpx 0" :text="product.productName"></u-text>
				<view class="btm">
					<PriceText :productItem="product"></PriceText>
				</view>
			</view>
			<u-number-box v-model="product.quantity" @change="valChange" integer min="0" :max="product.inventory===-1?9999:product.inventory"></u-number-box>
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
		components:{
			PriceText
		},
		methods: {
			handleClick(product) {
				console.log(product)
				this.$emit('clickItem',product)
			},
			valChange(val){
				console.log(val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.product-item {
		display: flex;
		margin: 10rpx;
		width: 100%;
		background-color: #fff;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		border-radius: 4px;
		padding:10rpx;
		
		.qtyInput{
			display: flex;
			justify-content: flex-end;
		}

		.btm {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size:14px;
		}
	}

	.image-wrapper {
		width: 50%;
		height: 200rpx;
		overflow: hidden;
		flex-shrink: 0;
	}
	
	.right{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		flex:1;
		.top{
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			justify-content: space-between;
			margin-bottom: 30rpx;
		}
	}
</style>
