<template>
	<view class="container">
		<view class="part">
			<view class="input-content">
				<u-form labelPosition="left" :model="bindTelForm" ref="bindTelForm" labelWidth="100" errorType="toast"
					borderBottom>
					<u-form-item label="手机号" prop="loginTel" borderBottom>
						<u-input type="number" placeholder="请输入手机号" v-model="bindTelForm.loginTel" border="none">
						</u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="btnWrap">
				<u-button type="primary" :loading="loading" loadingText="正在验证" text="提交" @click="bindTel"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bindLoginTel,
		getUserInfo
	} from '@/api/auth.js'
	export default {
		data() {
			return {
				loading:false,
				bindTelForm: {
					loginTel: '',
				},
				bindTelFormRules: {
					'loginTel': [{
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
		},
		methods: {
			bindTel() {
				this.$refs.bindTelForm.validate().then(() => {
					this.loading = true;
					bindLoginTel({
						loginTel: this.bindTelForm.loginTel
					}).then(res => {
						uni.$u.toast('手机号绑定成功');
						return getUserInfo();
					}).then(userInfo => {
						this.$store.commit('updateUserInfo', userInfo.data);
						this.$nextTick(()=>{
							uni.switchTab({
								url:'/pages/index/index'
							})
						})
					}).finally(()=>{
						this.loading = false;
					})
				}).catch(err => {
					console.log(err)
				})
			},
		},
		onReady() {
			this.$refs.bindTelForm.setRules(this.bindTelFormRules);
		}
	}
</script>

<style lang="scss" scoped>
	.input-content {
		/deep/ .u-line {
			margin: 0 !important;
		}
	}

	.container {
		padding: 20rpx;
		background-color: #fff;
	}
</style>
