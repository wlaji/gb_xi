<template>
	<view class="container">
		<view class="input-content">
			<u-form labelPosition="top" :model="form" ref="form1" labelWidth="auto" errorType="toast" borderBottom>
				<u-form-item label="手机号" prop="phone" borderBottom>
					<u-input type="number" placeholder="请输入手机号" v-model="form.phone" border="none"></u-input>
				</u-form-item>
				<u-form-item label="微信号" prop="phone" borderBottom>
					<u-input type="number" placeholder="请输入微信号" v-model="form.phone" border="none"></u-input>
				</u-form-item>
				<u-form-item label="邮箱" prop="phone" borderBottom>
					<u-input type="number" placeholder="请输入邮箱" v-model="form.phone" border="none"></u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button @click="toLogin" :loading="loading" loadingText="正在提交" type="primary">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				form: {
					phone: ''
				},
				rules: {
					'phone': [{
							required: true,
							message: '请输入手机号',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['blur'],
						}
					]
				},
			};
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		height: 100%;
		background-color: #fff;
	}
	.container {
		padding: 20rpx;
	}
</style>
