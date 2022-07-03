<template>
	<view class="container">
		<view class="input-content">
			<u-form labelPosition="top" :model="form" ref="form1" labelWidth="auto" errorType="toast" borderBottom>
				<u-form-item label="手机号" prop="mobile" borderBottom>
					<u-input type="number" placeholder="请输入手机号" v-model="form.mobile" border="none"></u-input>
				</u-form-item>
				<u-form-item label="验证码" prop="code" borderBottom>
					<u-input type="number" placeholder="请输入验证码" v-model="form.code" border="none">
						<template slot="suffix">
							<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
							<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="交易密码" prop="payPass" borderBottom>
					<u-input :type="inputType" placeholder="请输入交易密码" v-model="form.payPass" border="none">
						<template slot="suffix">
							<u-icon name="eye" @click="changeType" :color="inputType==='password'?'#333333':'#2b85e4'">
							</u-icon>
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button @click="toResetPwd" type="primary">重置密码</u-button>
			</view>
			<view class="fuzhu">
				<noCode></noCode>
			</view>
		</view>
	</view>
</template>

<script>
	import noCode from '@/components/noCode.vue';
	import {
		sendSms,
		payPwd
	} from '@/api/newApi.js'
	export default {
		data() {
			return {
				smsToken: '',
				inputType: 'password',
				status: 1,
				beforeStatus: '',
				tips: '',
				form: {
					mobile: '',
					code: '',
					payPass: '',
				},
				rules: {
					'mobile': [{
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
					],
					'code': [{
							required: true,
							message: '请输入验证码',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.code(value, 6);
							},
							message: '验证码格式不正确',
							trigger: ['blur'],
						}
					],
					'payPass': [{
						required: true,
						message: '请输入交易密码',
						trigger: ['blur'],
					}]
				},
			}
		},
		components: {
			noCode
		},
		onReady() {
			this.$refs.form1.setRules(this.rules);
		},
		methods: {
			changeType() {
				if (this.inputType === 'password') {
					this.inputType = 'number'
				} else {
					this.inputType = 'password'
				}
			},
			navBack() {
				uni.navigateBack();
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					let mobile = this.form.mobile;
					if (!mobile) {
						uni.$u.toast('请先输入手机号');
						return false;
					}
					if (this.$refs.uCode.canGetCode) {
						sendSms({
							tel: mobile
						}).then(res => {
							console.log(res)
							uni.$u.toast('验证码已发送,请注意短信!');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
							this.smsToken = res.data[0].token
						})
					} else {
						uni.$u.toast('倒计时结束后再发送');
					}
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			toResetPwd() {
				this.$refs.form1.validate().then(() => {
					payPwd(this.form, {
						token: this.smsToken
					}).then(async res => {
						uni.$u.toast('支付密码已重置');
						await store.dispatch('updateUserInfo');
						this.$nextTick(()=>{
							uni.navigateBack()
						})
					})
				}).catch(err => {
					console.log(err)
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}

	.input-content {
		padding: 0 20rpx;

		/deep/ .u-line {
			margin: 0 !important;
		}
	}

	.fuzhu {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 80rpx;

		.t2 {
			color: $u-tips-color;
		}
	}
</style>
