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
					<u-form-item label="手机号" prop="phone" borderBottom>
						<u-input type="number" placeholder="请输入手机号" v-model="form.phone" border="none"></u-input>
					</u-form-item>
					<u-form-item label="验证码" prop="code" borderBottom>
						<u-input type="number" placeholder="请输入验证码" v-model="form.code" border="none">
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
							</template>
						</u-input>
					</u-form-item>
					<u-form-item label="邀请码(非必填)" prop="code" borderBottom>
						<u-input placeholder="请输入邀请码" v-model="form.yqcode" border="none"></u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="toRegister" :loading="loading" loadingText="正在注册中" type="primary"
						>注册</u-button>
				</view>
				<!-- #ifndef H5 -->
				<view style="margin-top:40rpx;">
					<u-button type="success" icon="weixin-fill" open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber" text="微信一键登录"></u-button>
				</view>
				<!-- #endif -->
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
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				beforeStatus:'',
				showModal: false,
				checked: false,
				tips: '',
				loading: false,
				form: {
					phone: '',
					code: '',
					yqcode: ''
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
					]
				},
			}
		},
		onLoad() {

		},
		methods: {
			confirmChecked() {
				this.checked = true;
				this.showModal = false;
				console.log(this.checked)
				if(this.beforeStatus === 'getCode'){
					this.getCode()
				}else if(this.beforeStatus === 'toRegister'){
					this.toRegister()
				}
			},
			getPhoneNumber(e) {
				if (!this.checked) {
					this.showModal = true;
					return;
				}
				// 获取到微信服务器返回的加密数据
				const iv = e.detail.iv;
				const encryptedData = e.detail.encryptedData;
				let that = this;
				if (!encryptedData) {
					return false;
				}
				uni.login({
					//获取code
					provider: 'weixin',
					success: async function(res) {
						console.log({
							code: res.code,
							encrypData: encryptedData,
							ivData: iv
						})
						//调用开发服务器，服务器先通过code获取openid和session_key，然后再解密好加密数据
			
					}
				})
			},
			changeStatus(e) {
				this.checked = !this.checked;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegister() {
				if(!this.checked){
					this.showModal = true;
					this.beforeStatus = 'toRegister';
					return;
				}
				this.$refs.form1.validate().then(() => {
					uni.$u.toast('表单验证成功');
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						uni.switchTab({
						    url: '/pages/index/index'
						});
					}, 1000)
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
				if(!this.checked){
					this.showModal = true;
					this.beforeStatus = 'getCode';
					return;
				}
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
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
		top:0;
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
