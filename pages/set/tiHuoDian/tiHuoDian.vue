<template>
	<view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="补货" isLink url="/pages/set/tiHuoDian/thdBuhuo/thdBuhuo"></u-cell>
			<u-cell title="补货列表" isLink url="/pages/set/tiHuoDian/thdList/thdList"></u-cell>
			<u-cell title="库存" isLink url="/pages/set/tiHuoDian/thdKucun/thdKucun"></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo || {}
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
