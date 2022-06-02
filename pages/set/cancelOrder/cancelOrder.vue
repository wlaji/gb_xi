<template>
	<view class="container">
		<u-form labelPosition="top" :model="form" ref="form" labelWidth="70px" errorType="toast">
			<u-form-item label="取消理由:" prop="cancelReason" borderBottom>
				<u-textarea v-model="form.cancelReason" placeholder="请输入您取消订单的理由" ></u-textarea>
			</u-form-item>
		</u-form>
		<view class="add-address-btn">
			<u-button type="primary" text="提交" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					cancelReason:''
				},
				rules: {
					'cancelReason': [{
						required: true,
						message: '请输入理由',
						trigger: ['blur'],
					}]
				},
			};
		},
		methods:{
			submit(){
				this.$refs.form.validate().then(() => {
					uni.$u.toast('取消订单');
					uni.navigateBack()
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
.container{
	padding:20rpx;
	/deep/ .u-line {
		margin: 0 !important;
	}
}
</style>
