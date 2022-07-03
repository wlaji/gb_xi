<template>
	<view class="container">
		<u-modal :show="showModal" title="服务协议及隐私保护" :showCancelButton="true" closeOnClickOverlay confirmText="同意"
			cancelText="不同意" confirmColor="#E44273" @confirm="confirmChecked" @cancel="showModal = false;"
			@close="showModal=false">
			<view class="modalContent" slot="default">
				<text>为了更好的保障您的合法权益,请您阅读并同意以下协议</text>
				<navigator url="/pages/userAgreement/userAgreement" hover-class="navigator-hover">
					《用户协议》
				</navigator>
				<navigator url="/pages/privacyPolicy/privacyPolicy" hover-class="navigator-hover">
					《隐私政策》
				</navigator>
			</view>
		</u-modal>
		<view class="left-bottom-sign"></view>
		<view class="back-btn">
			<u-icon name="arrow-leftward" size="40rpx" color="#333" bold @click="navBack"></u-icon>
		</view>
		<view class="right-top-sign"></view>
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="welcome">
				欢迎新用户！
			</view>
			<view class="input-content">
				<u-form labelPosition="top" :model="form" :rules="rules" ref="form1" labelWidth="auto" errorType="toast"
					borderBottom>
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
					<u-form-item label="密码" prop="password" borderBottom>
						<u-input :type="inputType" placeholder="请输入密码" v-model="form.password" border="none">
							<template slot="suffix">
								<u-icon name="eye" @click="changeType"
									:color="inputType==='password'?'#333333':'#2b85e4'"></u-icon>
							</template>
						</u-input>
					</u-form-item>
					<u-form-item label="邀请码(非必填)" prop="pt" borderBottom>
						<u-input placeholder="请输入邀请码" v-model="form.pt" border="none"></u-input>
					</u-form-item>
				</u-form>
				<view class="ys">
					<view class="box">
						<u-checkbox-group @change="changeStatus">
							<u-checkbox :checked="checked" shape="circle"></u-checkbox>
						</u-checkbox-group>
					</view>
					<view class="t1">
						<text>已阅读并同意以下协议:</text>
						<navigator url="/pages/userAgreement/userAgreement" hover-class="navigator-hover">
							《用户协议》
						</navigator>
						<navigator url="/pages/privacyPolicy/privacyPolicy" hover-class="navigator-hover">
							《隐私政策》
						</navigator>
					</view>
				</view>
				<view style="margin-top:40rpx;">
					<u-button @click="toRegister" :loading="loading" loadingText="正在注册中" type="primary">注册</u-button>
				</view>
			</view>
		</view>
		<view class="register-section">
			已有账号?
			<text @click="toLogin">去登陆</text>
		</view>
	</view>
</template>

<script>
	import {
		sendSms,
		register
	} from '@/api/newApi.js'
	export default {
		data() {
			return {
				smsToken:'',
				inputType: 'password',
				beforeStatus: '',
				showModal: false,
				checked: false,
				tips: '',
				loading: false,
				form: {
					mobile: '',
					code: '',
					password: '',
					pt: ''
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
					'password': [{
						required: true,
						message: '请输入密码',
						trigger: ['blur'],
					}]
				},
			}
		},
		onLoad() {
		},
		methods: {
			changeType() {
				if (this.inputType === 'password') {
					this.inputType = 'number'
				} else {
					this.inputType = 'password'
				}
			},
			confirmChecked() {
				this.checked = true;
				this.showModal = false;
				console.log(this.checked)
				if (this.beforeStatus === 'getCode') {
					this.getCode()
				} else if (this.beforeStatus === 'toRegister') {
					this.toRegister()
				}
			},
			changeStatus(e) {
				this.checked = !this.checked;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegister() {
				if (!this.checked) {
					this.showModal = true;
					this.beforeStatus = 'toRegister';
					return;
				}
				this.$refs.form1.validate().then(() => {
					this.loading = true;
					register(this.form,{
						token:this.smsToken
					}).then(res => {
						uni.$u.toast('注册成功!');
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}, 1000)
					}).finally(() => {
						this.loading = false;
					})
				}).catch(err => {
					console.log(err)
				})
			},
			toLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				});
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				let mobile = this.form.mobile;
				if (!mobile) {
					uni.$u.toast('请先输入手机号');
					return false;
				}
				if (!this.checked) {
					this.showModal = true;
					this.beforeStatus = 'getCode';
					return false;
				}
				if (this.$refs.uCode.canGetCode) {
					sendSms({
						tel:mobile
					}).then(res=>{
						console.log(res)
						uni.$u.toast('验证码已发送,请注意短信!');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
						this.smsToken = res.data[0].token
					})
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 115px;
		position: relative;
		min-height: 100vh;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40rpx;
	}

	.back-btn {
		position: absolute;
		top: 0;
		left: 40rpx;
		z-index: 9999;
		padding-top: calc(var(--status-bar-height) + 50px);
	}

	.left-top-sign {
		font-size: 60px;
		color: #f8f8f8;
		position: relative;
		left: -16rpx;
	}

	.right-top-sign {
		position: absolute;
		top: 80rpx;
		right: -30rpx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400rpx;
			height: 80rpx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198rpx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270rpx;
		bottom: -320rpx;
		border: 100rpx solid #d0d1fd;
		border-radius: 50%;
		padding: 180rpx;
	}

	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60rpx;

		/deep/ .u-line {
			margin: 0 !important;
		}
	}

	.forget-section {
		text-align: center;
		margin-top: 40rpx;
		color: $u-primary;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 80rpx;
		width: 100%;
		text-align: center;
		font-size: 12px;
		color: $u-tips-color;
		z-index: 100;

		text {
			margin-left: 10rpx;
			color: $u-primary;
		}
	}

	.ys {
		display: flex;
		font-size: 12px;
		color: $u-tips-color;
		margin-top: 40rpx;

		.t1 {
			display: flex;

			navigator {
				color: $u-main-color;
			}
		}
	}

	.modalContent {
		font-size: 12px;
		color: $u-tips-color;

		navigator {
			display: inline-block;
			color: $u-main-color;
		}
	}
</style>
