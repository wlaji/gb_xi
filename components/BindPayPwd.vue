<template>
	<view class="bindInfo">
		<u-modal :show="showBindIdCard" title="支付密码设置" @cancel="showBindIdCard=false" confirmText="去设置"
			@confirm="toBindIdCard" content="检测到您未设置支付密码,请先去设置支付密码!"></u-modal>
	</view>
</template>

<script>
	export default {
		name: "BindInfo",
		data() {
			return {
			};
		},
		computed: {
			showBindIdCard() {
				let userInfo = this.$store.state.userInfo;
				if(!userInfo){
					return false;
				}
				if (!userInfo.payPass) {
					return true
				}
				return false;
			}
		},
		methods: {
			toBindIdCard() {
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
