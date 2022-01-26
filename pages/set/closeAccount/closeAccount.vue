<template>
	<view class="container">
		<view class="title">
			国本商城用户注销规则
		</view>
		<view class="con">
			<view>国本商城提醒您，账户一旦注销，您在商城所有的权益 (包括但不限于、优惠券、红包、卖家激励等) 都一并失效。如果您执意放弃账户，需要同时满足以下条件:</view>
			<view>
				<view>1、您的账户上没有未完结的订单。</view>
				<view>2、您的账户在国本商城上没有现金未提取。</view>
				<view>3、 您的账户没有未解决的纠纷记录, 纠纷记录包括但不限于投诉举报或被投诉举报至平台或工商、税务、消协等行政主管部门，您与交易相对方或平台之间存在司法纠纷等。</view>
			</view>
		</view>
		<view class="title">
			温馨提示
		</view>
		<view class="con">
			<view>1、 国本App账户不满足以上任意一项或多项条件的，账户将无法注销，请等待上述情况消失后再提交账户注销申请。</view>
			<view>2、 符合注销条件，将在一个工作日完成账号注销，后续有任何问题可随时联系在线客服。</view>
		</view>
		<view>
			<u-button type="error" text="同意并注销" @click="showModal=true"></u-button>
		</view>
		<u-modal :show="showModal" :showCancelButton="true" closeOnClickOverlay content='确定要注销您的账户吗?' confirmText="确认注销" cancelText="暂不注销"
			@confirm="writeOff" @cancel="showModal = false;" @close="showModal=false"></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
			};
		},
		methods: {
			writeOff() {
				setTimeout(()=>{
					this.showModal = false;
					uni.$u.toast('提交成功')
				},1000)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 40rpx 20rpx;

		.title {
			font-size: 18px;
			margin-bottom: 20rpx;
		}

		.con {
			margin-bottom: 40rpx;

			view {
				margin-bottom: 10rpx;
			}
		}
	}
</style>
