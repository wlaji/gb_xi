<template>
	<view class="container">
		<view class="cardList">
			<template v-if="cardList.length">
				
			</template>
			<template v-else>
				<view class="no-result">
					<u-empty mode="data" text="暂无银行卡"></u-empty>
				</view>
			</template>
		</view>
		<view class="add-address-btn">
			<u-button type="primary" text="添加银行卡" icon="plus" @click="toPlusCard"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList:[]
			};
		},
		methods: {
			toPlusCard(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx 20rpx 130rpx;
	}
	.cardList{
		
	}
	.add-address-btn {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 20rpx;
		background-color: #fff;
		height: 140rpx;
	}
</style>
