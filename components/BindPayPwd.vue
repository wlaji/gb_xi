<template>
	<view class="bindInfo">
		<u-modal :show="showBindPayPwd" title="支付密码设置" @cancel="showBindPayPwd=false" confirmText="去设置"
			@confirm="toBindIdCard" content="检测到您未设置支付密码,请先去设置支付密码!"></u-modal>
	</view>
</template>

<script>
	export default {
		props:['showBindPayPwd'],
		name: "BindInfo",
		data() {
			return {
			};
		},
		methods: {
			toBindIdCard() {
				this.$emit('closeModal')
				uni.navigateTo({
					url: '/pages/set/setPayPwd/setPayPwd',
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.bindInfo {
		/deep/ .u-line {
			margin: 0 !important;
		}
	}
</style>
