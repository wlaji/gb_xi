<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn">
			<u-icon name="arrow-leftward" size="40rpx" color="#333" bold @click="navBack"></u-icon>
		</view>
		<view class="right-top-sign"></view>
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">
				<u-form labelPosition="top" :model="form" ref="form1" labelWidth="auto" errorType="toast" borderBottom>
					<u-form-item label="手机号" prop="mobile" borderBottom>
						<u-input type="number" placeholder="请输入手机号" v-model="form.mobile" border="none"></u-input>
					</u-form-item>
					<u-form-item label="验证码" prop="code" borderBottom v-if="status===2">
						<u-input type="number" placeholder="请输入验证码" v-model="form.code" border="none">
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
							</template>
						</u-input>
					</u-form-item>
					<u-form-item label="密码" prop="password" borderBottom v-if="status===1">
						<u-input :type="inputType" placeholder="请输入密码" v-model="form.password" border="none">
							<template slot="suffix">
								<u-icon name="eye" @click="changeType"
									:color="inputType==='password'?'#333333':'#2b85e4'"></u-icon>
							</template>
						</u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="toLogin" :loading="loading" loadingText="正在登录" type="primary">登录</u-button>
				</view>
				<view class="fuzhu">
					<text class="t1" @click="changeLoginMethod">{{status===2?'密码登录':'验证码登录'}}</text>
					<template v-if="status===1">
						<text class="t2" @click="helpHandle">忘记密码</text>
					</template>
					<template v-else>
						<noCode></noCode>
					</template>
				</view>
				<!-- <view style="margin-top:40rpx;">
					<u-button type="success" icon="weixin-fill" open-type="getPhoneNumber"
						@getphonenumber="getPhoneNumber" text="微信一键登录"></u-button>
				</view> -->

			</view>
		</view>
		<view class="register-section">
			<view style="text-align: center;margin-bottom: 40px;">
				<view style="font-size: 12px;margin-bottom: 10px;">其他登录方式</view>
				<view>
					<u-button type="primary" color="#888" iconColor="#3c9cff"
						:customStyle="{'borderRadius':'50%','width':'30px','height':'30px','padding':'10px'}" plain
						icon="weixin-fill" @click="wxLogin"></u-button>
				</view>
			</view>
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	import noCode from '@/components/noCode.vue'
	// import {
	// 	byPassword,
	// 	byCode,
	// 	sendLoginCode,
	// 	byWx,
	// 	byJsWx
	// } from '@/api/auth.js'
	import {
		login
	} from '@/api/newApi.js'

	export default {
		data() {
			return {
				inputType: 'password',
				status: 1,
				showModal2: false,
				tips: '',
				loading: false,
				form: {
					mobile: '',
					code: '',
					password: ''
				},
				checked: false,
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
			changeLoginMethod() {
				if (this.status === 2) {
					this.status = 1
				} else {
					this.status = 2
				}
				this.form = {
					mobile: '',
					code: '',
					password: ''
				}
			},
			helpHandle() {
				uni.navigateTo({
					url: '/pages/findPwd/findPwd'
				})
			},
			getPhoneNumber(e) {
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
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			},
			toLogin() {
				this.$refs.form1.validate().then(() => {
					this.loading = true;
					login(Object.assign(this.form, {
						type: this.status
					})).then(res => {
						console.log(res);
						this.$store.commit('login', res.data[0]); // vuex的方法
						uni.switchTab({
							url: '/pages/index/index'
						});
					}).finally(() => {
						this.loading = false;
					})
				}).catch(err => {
					console.log(err)
				})
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
					sendLoginCode({
						mobile
					}).then(res => {
						uni.$u.toast('验证码已发送,请注意短信!');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					})
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},

			//微信快捷登录
			wxLogin() {
				console.log(321321)
				let that = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (res.provider.indexOf('weixin') > -1) {
							uni.login({
								provider: 'weixin',
								success: loginRes => {
									// 获取用户信息
									uni.showLoading({
										title: '登录中...'
									})
									setTimeout(function() {
										uni.hideLoading();
									}, 1000);
									uni.getUserInfo({
										provider: 'weixin',
										success: function(infoRes) {
											console.log(infoRes)
											byWx({
												openId: infoRes.userInfo
													.openId,
												nickName: infoRes.userInfo
													.nickName,
												wxUnionId: infoRes.userInfo
													.unionId
											}).then(res => {
												that.$store.commit('login', res
													.data); // vuex的方法
												uni.switchTab({
													url: '/pages/index/index'
												});
											}).catch(err => {
												console.log(err)
												uni.$u.toast('微信登录失败');
											})
										},
										fail() {
											uni.$u.toast('获取用户信息失败');
										}
									});
								},
								fail: (err) => {
									uni.$u.toast('微信登录失败');
								}
							});
						}
					}
				})
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
		left: 40rpx;
		top: 0;
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

	.modal2Con {
		text-align: left;
	}

	.fuzhu {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;

		.t2 {
			color: $u-tips-color;
		}
	}
</style>
