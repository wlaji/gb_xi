<template>
	<view class="container">
		<u-popup :show="show" mode="bottom" closeable @close="close">
			<view class="popupCon">
				<view class="title">订单备注</view>
				<view class="con">
					<u-textarea v-model="beizhu" placeholder="请输入订单备注" count></u-textarea>
				</view>
				<view class="btn-bottom">
					<u-button type="primary" text="确定"
						color="linear-gradient(to right, rgb(255, 85, 0), rgb(240, 76, 0))" @click="addBeizhu">
					</u-button>
				</view>
			</view>
		</u-popup>
		<view class="part">
			<u-cell-group :border="false">
				<u-cell size="large" icon="map-fill" :border="false" :iconStyle="{color:'red'}" title="中建五局二公司"
					label="肖伟成 15773003996" isLink url="/pages/set/addressManage/addressManage"></u-cell>
			</u-cell-group>
		</view>
		<view class="part" v-for="item in 3">
			<view class="cart-item">
				<view class="rightContent">
					<view class="image-wrapper">
						<u-image :showLoading="true" src="/static/image/1.jpg" width="150rpx" height="150rpx"
							radius="10px"></u-image>
					</view>
					<view class="item-right">
						<view class="t1">
							<text class="title u-line-1"
								style="display: block;">321321323213213213213213213213213213211321321</text>
							<text style="margin-left: 20rpx;">￥158</text>
						</view>
						<view class="t2">
							<text>颜色:白色;尺码:L;</text>
							<text>x1</text>
						</view>
					</view>
				</view>
			</view>
			<u-cell-group :border="false">
				<u-cell :border="false" title="配送服务" value="快递 免邮">
				</u-cell>
				<u-cell :border="false" title="优惠" value="￥3">
				</u-cell>
				<u-cell :border="false" title="订单备注" value="无备注" isLink @click="addBezhuBefore(index)">
				</u-cell>
			</u-cell-group>
		</view>
		<view class="part">
			<u-cell-group :border="false">
				<u-cell :border="false" title="商品总价" label="共三件宝贝">
					<view slot="value" class="u-slot-title">
						￥321
					</view>
				</u-cell>
				<u-cell :border="false" title="优惠">
					<view slot="value" class="u-slot-title2">
						￥3
					</view>
				</u-cell>
				<u-cell :border="false" title="合计">
					<view slot="value" class="u-slot-title">
						￥318
					</view>
				</u-cell>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bezhuIndex: '',
				beizhu: '',
				show: false,
			};
		},
		methods: {
			addBezhuBefore(index) {
				this.bezhuIndex = index;
				this.beizhu = ''
				this.show = true;
			},
			addBeizhu() {
				this.close();
			},
			close() {
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-slot-title,.u-slot-title2{
		font-weight: 700;
	}
	.u-slot-title2{
		color:$u-tips-color;
	}
	.container {
		padding: 20rpx;
	}

	.part {
		overflow: hidden;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 10px;
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		align-items: center;
		position: relative;
		padding: 20rpx;
		background-color: #fff;

		.rightContent {
			display: flex;
			flex: 1;
		}

		.image-wrapper {
			width: 150rpx;
			height: 150rpx;
			flex-shrink: 0;
			position: relative;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 0;
			overflow: hidden;
			position: relative;
			padding-left: 30rpx;

			.t1,
			.t2 {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10rpx;
			}

			.t2 {
				color: $u-tips-color;
			}
		}
	}

	.popupCon {
		position: relative;
		height: 800rpx;
		padding: 0 20rpx;

		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60px;
			font-weight: 700;
			font-size: 16px;
		}

		.btn-bottom {
			position: absolute;
			bottom: 20rpx;
			left: 20rpx;
			right: 20rpx;
		}
	}
</style>
