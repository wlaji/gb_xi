<template>
	<view>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="实名认证" isLink value="未认证" url="/pages/set/realNameAuthentication/realNameAuthentication"></u-cell>
			<u-cell title="绑定手机" :label="phone" value="更换号码" isLink></u-cell>
			<u-cell title="设置登录密码" isLink></u-cell>
		</u-cell-group>
		<u-cell-group :customStyle="{'backgroundColor':'#ffffff','marginBottom':'20rpx'}">
			<u-cell title="账号注销" isLink></u-cell>
		</u-cell-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:''
			};
		},
		methods:{
			formatPhone(phone){
				return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			}
		},
		onLoad() {
			this.phone = this.formatPhone('15773003996')
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		font-size: 12px;
		color:$u-tips-color;
		padding:0 0 20rpx 30rpx;
	}

</style>
