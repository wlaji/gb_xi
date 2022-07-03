<template>
	<view class="bindInfo">
		<u-modal :show="showBindIdCard" title="身份信息绑定" @cancel="showBindIdCard=false" confirmText="去绑定"
			@confirm="toBindIdCard" content="检测到您未绑定身份信息,请先进行实名认证!"></u-modal>
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
				if (!userInfo.is_zsb) {
					return true
				}
				return false;
			}
		},
		methods: {
			toBindIdCard() {
				uni.navigateTo({
					url: '/pages/set/realNameAuthentication/realNameAuthentication',
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
