<template>
	<view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<!-- <u-cell title="设置交易密码" isLink></u-cell>
			<u-cell title="设置支付宝提现账号" value="去绑定" isLink></u-cell>
			<u-cell title="设置微信提现账号" value="去绑定" isLink></u-cell> -->
			<u-cell title="银行卡" isLink url="/pages/set/bindCard/bindCard"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
		
		},
		onLoad() {
			
		}
	}
</script>

<style lang="scss" scoped>

</style>
