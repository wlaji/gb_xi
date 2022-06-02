<template>
	<view class="container">
		<view class="list-item" v-for="item in articleList" :key="item.id" @click="goNewsDetail(item.id)">
			<view class="imgWrap">
				<u-image :showLoading="true" :src="item.picPath" width="100" height="100" mode="aspectFill"></u-image>
			</view>
			<view class="con">
				<view class="title">
					{{item.title}}
				</view>
				<view class="time d-flex align-center">
					{{item.createTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getArticle
	} from '@/api/public.js'
	export default {
		data() {
			return {
				articleList: []
			}
		},
		methods: {
			goNewsDetail(id) {
				uni.navigateTo({
					url: './newsDetail?id=' + id
				})
			}
		},
		onLoad() {
			getArticle({
				categoryName: 'news'
			}).then(res => {
				this.articleList = res.data
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 10px;
		font-size: 14px;
		background-color: #fff;
		.list-item {
			display: flex;
			padding: 10px 0;
			border-bottom: 1px solid #ccc;

			&:last-child {
				border-bottom: none;
			}

			.imgWrap {
				flex-shrink: 0;
				width: 100px;
				height: 100px;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.con {
				display: flex;
				flex-direction: column;
				flex: 1;
				margin-left: 10px;
				padding: 10px 0;

				.title {
					flex: 1;
				}

				.time {
					color: $u-info;
					font-size: 12px;
				}
			}
		}
	}
</style>
