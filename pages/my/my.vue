<template>
	<view class="container">
		<view class="avatar">
			<u-avatar src="https://cdn.uviewui.com/uview/album/1.jpg" size="70"></u-avatar>
			<view class="nickname">
				小鱼人
			</view>
		</view>
		<view class="part part1">
			<view class="top">
				<u-icon name="level" size="25" color="#c2a160"></u-icon>
				<text style="margin-left:10rpx;">国本商城 (V1会员)</text>
			</view>	
			<view class="bottom">
				<view class="b1">
					<text>￥0.02</text>
					<text>累计消费</text>
				</view>
				<view class="b2">
					<text>3300</text>
					<text>积分</text>
				</view>
			</view>
		</view>
		<view class="part part2">
			
		</view>
		<view class="part part3">
			
		</view>
		<view class="part part4">
			
		</view>
	</view>
</template>

<script>
	import {register} from '@/api/index.js'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
	
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.avatar{
		display:flex;
		justify-content:center;
		align-items:center;
		padding:40rpx 0;
		.nickname{
			margin-left:20rpx;
			font-size:16px;
			font-weight:700;
		}
	}
	.part{
		overflow:hidden;
		border-radius:10px;
		background-color:#fff;
		margin:20rpx;
	}
	.part1{
		.top{
			display:flex;
			align-items:center;
			height:80rpx;
			background-color:#3F3F3F;
			padding:0 20rpx;
			color:#c2a160;
		}
		.bottom{
			display:flex;
			align-items:center;
			justify-content:center;
			height:180rpx;
			.b1,.b2{
				display:flex;
				flex-direction:column;
				align-items:center;
				flex:1;
				color:$u-content-color;
				&>text:first-child{
					margin-bottom:10rpx;
					font-weight:500;
					font-size:16px;
				}
				&>text:last-child{
					font-size:12px;
				}
			}
		}
	}
</style>
