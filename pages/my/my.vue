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
				<u-cell icon="order" iconStyle="color:#F66D74;font-size:25px;" title="我的订单" value="查看全部订单"
					isLink :border="false" url="/pages/set/myOrder/myOrder"></u-cell>
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
		<view class="part part3">
			<u-grid :border="false" col="4">
				<u-grid-item @click="toSet('/pages/set/joinUs/joinUs')">
					<view class="list-item">
						<u-icon name="man-add" size="24" color="#F66D74"></u-icon>
						<text class="grid-text">我要加盟</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/addressManage/addressManage')">
					<view class="list-item">
						<u-icon name="car-fill" size="24" color="#5FCDA2"></u-icon>
						<text class="grid-text">地址管理</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/share/share')">
					<view class="list-item">
						<u-icon name="share" size="24" color="#9789F7"></u-icon>
						<text class="grid-text">分享</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/marketing/marketing')">
					<view class="list-item">
						<u-icon name="rmb-circle" size="24" color="#F66D74"></u-icon>
						<text class="grid-text">营销业绩</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/integralTransfer/integralTransfer')">
					<view class="list-item">
						<u-icon name="red-packet" size="24" color="#F66D74"></u-icon>
						<text class="grid-text">积分转账</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/integralWithdrawal/integralWithdrawal')">
					<view class="list-item">
						<u-icon name="rmb" size="24" color="#F66D74"></u-icon>
						<text class="grid-text">积分提现</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/team/team')">
					<view class="list-item">
						<u-icon name="plus-people-fill" size="24" color="#FFB273"></u-icon>
						<text class="grid-text">团队成员</text>
					</view>
				</u-grid-item>
			<!-- 	<u-grid-item>
					<view class="list-item">
						<u-icon name="server-fill" size="24" color="#EE883B"></u-icon>
						<text class="grid-text">联系客服</text>
					</view>
				</u-grid-item> -->
				<u-grid-item @click="toSet('/pages/set/history/history')">
					<view class="list-item">
						<u-icon name="clock-fill" size="24" color="#5EBA40"></u-icon>
						<text class="grid-text">浏览历史</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/collect/collect')">
					<view class="list-item">
						<u-icon name="star-fill" size="24" color="#fa436a"></u-icon>
						<text class="grid-text">我的收藏</text>
					</view>
				</u-grid-item>
				<u-grid-item @click="toSet('/pages/set/msg/msg')">
					<view class="list-item">
						<view style="position: relative;">
							<u-icon name="bell" size="24" color="#54B4EF"></u-icon>
							<u-badge max="99" value="99" absolute :offset="[-8,-10]"></u-badge>
						</view>
						<text class="grid-text">留言管理</text>
					</view>
				</u-grid-item>
				
				<u-grid-item @click="toSet('/pages/set/set/set')">
					<view class="list-item">
						<u-icon name="setting" size="24" color="#2b85e4"></u-icon>
						<text class="grid-text">设置</text>
					</view>
				</u-grid-item>
			</u-grid>
		</view>
		<view class="part part4">
			<u-button type="default" text="退出登录" @click="showModal1 = true"></u-button>
		</view>
		<u-modal :show="showModal1" :showCancelButton="true" closeOnClickOverlay content='确定要退出登陆吗?' @confirm="toLogOut"
			@cancel="showModal1 = false;" @close="showModal1=false"></u-modal>
	</view>
</template>

<script>
	import {
		register
	} from '@/api/index.js'
	export default {
		data() {
			return {
				showModal1: false,
				count: 2,
				customBar: this.customBar,
				showNavBar: false,
			}
		},
		onLoad() {

		},
		methods: {
			toSet(page) {
				uni.navigateTo({
					url: page
				})
			},
			toLogOut() {
				this.showModal1 = false;
				this.$store.commit('logout');
				uni.switchTab({
					url: '/pages/index/index'
				});
			},
			// 未读消息数量
			setBadgeText(count, index) {
				if (this.count == 0) {
					//隐藏
					// #ifdef APP-PLUS
					const pages = getCurrentPages();
					const page = pages[pages.length - 1];
					const currentWebview = page.$getAppWebview();
					currentWebview.removeTitleNViewButtonBadge({
						index
					});
					// #endif
				} else {
					//显示
					// #ifdef APP-PLUS
					const pages = getCurrentPages();
					const page = pages[pages.length - 1];
					const currentWebview = page.$getAppWebview();
					currentWebview.setTitleNViewButtonBadge({
						index,
						text: this.count
					});
					// #endif
				}
			},
			// 设置按钮角标
			setRedDot(count, index) {
				if (this.count == 0) {
					//隐藏
					// #ifdef APP-PLUS
					const pages = getCurrentPages();
					const page = pages[pages.length - 1];
					const currentWebview = page.$getAppWebview();
					currentWebview.hideTitleNViewButtonRedDot({
						index
					});
					// #endif
				} else {
					//显示
					// #ifdef APP-PLUS
					const pages = getCurrentPages();
					const page = pages[pages.length - 1];
					const currentWebview = page.$getAppWebview();
					currentWebview.showTitleNViewButtonRedDot({
						index,
					});
					// #endif
				}
			}
		},
		onShow() {
			this.setBadgeText(this.count, 1);
			this.setRedDot(this.count, 0)
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

	.part3 {
		.list-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			padding: 20rpx 0;

			.grid-text {
				margin-top: 10rpx;
			}
		}
	}
</style>
