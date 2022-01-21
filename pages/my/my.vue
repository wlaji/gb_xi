<template>
	<view class="container" :style="{paddingTop:customBar+'px'}">
		<view v-show="showNavBar">
			<u-navbar title="个人中心" :leftIcon="null" fixed bgColor="#f8f8f8">
			</u-navbar>
		</view>
		<view class="avatar">
			<u-avatar src="https://cdn.uviewui.com/uview/album/1.jpg" size="70"></u-avatar>
			<view class="rightArea">
				<view class="nickname">
					小鱼人
				</view>
				<view class="bh">
					编号:12132
				</view>
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
				<u-line direction="col" length="50rpx"></u-line>
				<view class="b1">
					<text>￥3300.00</text>
					<text>奖金</text>
				</view>
				<view class="b1">
					<text>3300.00</text>
					<text>积分</text>
				</view>
				<u-line direction="col" length="50rpx"></u-line>
				<view class="b1">
					<text>￥3300.00</text>
					<text>团队业绩</text>
				</view>
			</view>
		</view>
		<view class="part part2">
			<u-cell-group :border="false">
				<u-cell icon="order" iconStyle="color:#F66D74;font-size:25px;" title="我的订单" value="查看全部订单" isLink
					:border="false" url="/pages/set/myOrder/myOrder"></u-cell>
			</u-cell-group>

			<view class="bottom">
				<view class="b1">
					<i class="iconfont icon-daifukuan"></i>
					<text>待付款</text>
				</view>
				<view class="b1">
					<i class="iconfont icon-daifahuo"></i>
					<text>待发货</text>
				</view>
				<view class="b1">
					<i class="iconfont icon-daishouhuo"></i>
					<text>待收货</text>
				</view>
				<view class="b1">
					<i class="iconfont icon-daipingjia"></i>
					<text>待评价</text>
				</view>
				<view class="b1">
					<i class="iconfont icon-shouhou"></i>
					<text>售后/退款</text>
				</view>
			</view>
		</view>
		<view class="part history">
			<u-cell-group :border="false">
				<u-cell icon="clock-fill" iconStyle="color:#5EBA40;font-size:24px;" title="浏览历史" :border="false">
				</u-cell>
			</u-cell-group>
			<view class="historyItemWrap">
				<u-scroll-list indicator indicatorColor="#fff0f0" indicatorActiveColor="#f56c6c">
					<view v-for="(item, index) in goodsList" :key="index" class="history-item"
						@click="navToDetailPage(item)">
						<u-image :showLoading="true" :src="item.image" width="150rpx" height="150rpx" radius="4px">
						</u-image>
						<text class="title u-line-1" style="display: block;font-size:13px;">{{item.title}}</text>
						<view>
							<text class="price">￥0</text>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<u-cell-group :border="false">
				<u-cell icon="share" iconStyle="color:#9789F7;font-size:24px;" title="分享好友" isLink
					url="/pages/set/share/share" value="分享赚米"></u-cell>
				<u-cell icon="man-add" iconStyle="color:#F66D74;font-size:24px;" title="我要加盟" isLink
					url="/pages/set/joinUs/joinUs" value="加盟店"></u-cell>
				<u-cell icon="rmb-circle" iconStyle="color:#F66D74;font-size:24px;" title="营销业绩" isLink
					url="/pages/set/marketing/marketing" value="查看返佣"></u-cell>
				<u-cell icon="red-packet" iconStyle="color:#F66D74;font-size:24px;" title="积分管理" isLink
					url="/pages/set/integralTransfer/integralTransfer"></u-cell>
				<u-cell icon="plus-people-fill" iconStyle="color:#FFB273;font-size:24px;" title="团队成员" isLink
					url="/pages/set/team/team"></u-cell>
				<u-cell icon="star-fill" iconStyle="color:#fa436a;font-size:24px;" title="我的收藏" isLink
					url="/pages/set/collect/collect"></u-cell>
				<u-cell icon="bell" iconStyle="color:#54B4EF;font-size:24px;" title="留言管理" isLink
					url="/pages/set/msg/msg">
					<u-badge slot="value" max="99" value="99"></u-badge>
				</u-cell>
				<u-cell icon="setting" iconStyle="color:#2b85e4;font-size:24px;" title="设置" :border="false" isLink
					url="/pages/set/set/set"></u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		register
	} from '@/api/index.js'
	export default {
		data() {
			return {
				customBar: this.customBar,
				showNavBar: false,
			}
		},
		onLoad() {
			this.goodsList = this.$json.goodsList
		},
		methods: {
			navToDetailPage() {
				uni.navigateTo({
					url: '/pages/productDetail/productDetail'
				})
			},
		},
		onPageScroll(data) {
			if (data.scrollTop > 88) {
				this.showNavBar = true;
			} else {
				this.showNavBar = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navBar {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: var(--status-bar-height);
		left: 0;
		right: 0;
		height: 44px;
		background-color: #fff;
		z-index: 1000;
	}

	.container {
		padding: 20rpx;
	}

	.avatar {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 10rpx 0 40rpx;

		.rightArea {
			margin-left: 20rpx;

			.nickname {
				font-size: 16px;
				font-weight: 700;
			}

			.bh {
				color: #909399;
				font-size: 12px;
				margin-top: 10rpx;
			}
		}
	}


	.part {
		overflow: hidden;
		border-radius: 10px;
		background-color: #fff;
		margin: 20rpx 0;
	}

	.part1 {
		.top {
			display: flex;
			align-items: center;
			height: 80rpx;
			background-color: #3F3F3F;
			padding: 0 20rpx;
			color: #c2a160;
		}

		.bottom {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			height: 250rpx;

			.b1 {
				display: flex;
				flex-direction: column;
				align-items: center;
				flex-basis: 49%;
				flex-shrink: 0;
				color: $u-content-color;

				&>text:first-child {
					margin-bottom: 10rpx;
					font-weight: 500;
				}

				&>text:last-child {
					font-size: 12px;
				}
			}
		}
	}

	.part2 {
		.bottom {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 150rpx;
		}

		.b1 {
			display: flex;
			flex-direction: column;
			align-items: center;
			flex: 1;
			color: $u-content-color;
			font-size: 12px;

			i {
				font-size: 24px;
				margin-bottom: 10rpx;
				color: $price-color;
			}
		}
	}

	.history {
		.historyItemWrap {
			padding: 0 30rpx;
		}

		.history-item {
			width: 150rpx;
			margin-right: 20rpx;

			.title {
				padding: 10rpx 0;
			}

			.price {
				color: $price-color;
			}
		}
	}
</style>
