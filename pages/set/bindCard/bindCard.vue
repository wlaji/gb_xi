<template>
	<view class="container">
		<template v-if="cardList.length">
			<view class="title">
				<view class="left">
					<text>我的卡</text>
					<text>(共5张)</text>
				</view>
				<view class="right">
					<u-icon name="plus" label="添加银行卡" color="#2979ff" size="14px" labelSize="14px"></u-icon>
				</view>
			</view>
			<view class="cardList">
				<view class="card-item" v-for="(item,index) in cardList" :key="index">
			
				</view>
			</view>
		</template>
		<template v-else>
			<view class="no-result">
				<u-empty mode="data" text="暂无银行卡"></u-empty>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cardList: ['321']
			};
		},
		methods: {
			toPlusCard() {

			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fff;
	}
	.container {
		padding: 40px 20rpx 20rpx;
	}
	.title{
		position: fixed;
		top: var(--window-top);
		right:20rpx;
		left:20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 40px;
		.left{
			text:last-child{
				color:$u-tips-color;
				margin-left: 10rpx;
			}
		}
		.right{
			display: flex;
			align-items: center;
			background-color: #ECF5FF;
			border-radius: 10px;
			padding:10rpx;
			font-size: 12px;
		}
	}

	.cardList {
		padding:0 10rpx;
	}
</style>
