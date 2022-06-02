<template>
	<u-cell-group>
		<u-cell :title="item.title" :icon="item.icon" :iconStyle="item.iconStyle" v-for="item in payList"
			:key="item.name">
			<view slot="value">
				<u-radio-group v-model="payMentMethod" iconPlacement="right">
					<u-radio :name="item.name" activeColor="red"></u-radio>
				</u-radio-group>
			</view>
		</u-cell>
	</u-cell-group>
</template>

<script>
	export default {
		name: "PayList",
		data() {
			return {
				payList: [{
						name: 'alPay',
						title: '支付宝支付',
						icon: 'zhifubao-circle-fill',
						iconStyle: {
							'color': '#2979ff',
							'font-size': '20px'
						}
					},
					{
						name: 'wxPay',
						title: '微信支付',
						icon: 'weixin-circle-fill',
						iconStyle: {
							'color': '#19be6b',
							'font-size': '20px'
						}
					},
					{
						name: 'yuer',
						title: '余额支付',
						icon: 'rmb-circle',
						iconStyle: {
							'color': 'red',
							'font-size': '20px'
						}
					},
					{
						name: 'card',
						title: '银行卡支付',
						icon: 'weixin-circle-fill',
						iconStyle: {
							'color': '#19be6b',
							'font-size': '20px'
						}
					}
				],
				payMentMethod: 'alPay',
			};
		}
	}
</script>

<style lang="scss">

</style>
