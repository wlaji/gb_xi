<template>
	<view class="container">
		<template v-if="status===1">
			<view style="padding-top: 40px;">
				<view style="display: flex;justify-content: center;">
					<u-icon name="checkmark-circle-fill" color="#6193fe" size="50"></u-icon>
				</view>
				<u-text text="支付完成" size="24" align="center" margin="40px 0"></u-text>
			</view>
			<view>
				<u-button type="primary" text="返回首页" @click="goHome"></u-button>
			</view>
		</template>
		<template v-else>
			<view style="padding-top: 40px;">
				<view style="display: flex;justify-content: center;">
					<u-icon name="close-circle-fill" color="red" size="50"></u-icon>
				</view>
				<u-text text="支付失败" size="24" align="center" margin="40px 0"></u-text>
			</view>
			<view>
				<u-button type="primary" text="返回" @click="goBack"></u-button>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				status:1
			};
		},
		methods:{
			goHome(){
				uni.navigateTo({
					url:'/pages/index/index'
				})
			},
			goBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		align-items: center;
		padding: 20rpx;
		text-align: center;
	}

</style>
