<template>
	<view class="container">
		<view>
			<u-search placeholder="请输入搜索关键字" disabled shape="round" margin="10px" bgColor="#ffffff" :showAction="false"></u-search>
		</view>
		<view class="content">
			<view class="left-aside">
				<view v-for="(item,index) in flist" :key="item.id" class="f-item" :class="{active: index === currentIndex}"
					@click="tabtap(item,index)">
					{{item.name}}
				</view>
			</view>
			<view class="right-content">
				<view v-for="item in slist" :key="item.id" class="s-list">
					<text class="s-item">{{item.name}}</text>
					<view class="t-list">
						<view class="t-item" v-for="titem in item.productList" :key="titem.id">
							<u-image :showLoading="true" :src="titem.picture" width="140rpx" height="140rpx"></u-image>
							<text style="margin-top: 4px;">{{titem.name}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0,
				slist: [],
				flist: [],

			}
		},
		onLoad() {
			this.flist = this.$json.productList;
			this.slist = this.flist[this.currentIndex].children;
		},
		methods: {
			tabtap(item, index) {
				this.currentIndex = index;
				this.slist = this.flist[this.currentIndex].children;
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}
	.container{
		display:flex;
		flex-direction:column;
		height:100%
	}
	.content {
		overflow:auto;
		flex:1;
		display: flex;
		.left-aside {
			overflow: auto;
			flex-shrink: 0;
			width: 200rpx;
			background-color: #fff;

			.f-item {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
				height: 100rpx;
				font-size: 28rpx;
				position: relative;
				color: $u-main-color;

				&.active {
					background: #f8f8f8;
					color: $primary-color;

					&:before {
						content: '';
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
						height: 36rpx;
						width: 8rpx;
						border-radius: 0 4px 4px 0;
						background-color: $primary-color;
						opacity: .8;
					}
				}
			}
		}
		
		.right-content{
			overflow: auto;
			flex:1;
			margin-left: 20rpx;
			.s-item{
				display: flex;
				align-items: center;
				height: 70rpx;
				padding-top: 8rpx;
				font-size: 28rpx;
			}
			.t-list{
				display: flex;
				flex-wrap: wrap;
				width: 100%;
				background: #fff;
				padding-top: 12rpx;
				&:after{
					content: '';
					flex: 99;
					height: 0;
				}
			}
			.t-item{
				flex-shrink: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				width: 176rpx;
				font-size: 26rpx;
				color: #666;
				padding-bottom: 20rpx;
			}
		}
	}
</style>
