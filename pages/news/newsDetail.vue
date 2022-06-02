<template>
	<view class="container">
		<view class="title font-weight-bold mb-1">
			{{newsDetail.title}}
		</view>
		<view class="content">
			<u-parse :content="newsDetail.content"></u-parse>
		</view>
		<view class="notice-time">{{newsDetail.createTime}}</view>
	</view>
</template>

<script>
	import {
		getArticleInfo
	} from '@/api/public.js'
	export default {
		data() {
			return {
				newsDetail: '<p>1<p>'
			}
		},
		onLoad(options) {
			getArticleInfo({
				id: options.id
			}).then(res => {
				this.newsDetail = res.data;
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10px;
		font-size: 14px;

		.title {
			text-align: center;
		}

		.time {
			color: #acacac;
			font-size: 14px;
			image{
				width: 18px;
				height:18px;
			}
		}
		.content /deep/{
			margin-top: 30rpx;
			image {
				width: 100% !important;
			}
		}
		.notice-time{
			margin-top: 20rpx;
			text-align: right;
			color:$u-info;
			font-size: 12px;
		}
	}
</style>
