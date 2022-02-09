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
				找回登录密码！
			</view>
			<view class="input-content">
				<u-form labelPosition="top" :model="form" ref="form1" labelWidth="auto" errorType="toast" borderBottom>
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
					<u-form-item label="密码" prop="password" borderBottom>
						<u-input :type="inputType" placeholder="请输入新密码" v-model="form.password" border="none">
							<template slot="suffix">
								<u-icon name="eye" @click="changeType" :color="inputType==='password'?'#333333':'#2b85e4'"></u-icon>
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
	</view>
</template>

<script>
	import noCode from '@/components/noCode.vue'
	export default {
		data() {
			return {
				inputType:'password',
				status: 1,
				beforeStatus: '',
				tips: '',
				form: {
					phone: '',
					code: '',
					password:'',
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
					],
					'password': [{
							required: true,
							message: '请输入密码',
							trigger: ['blur'],
						}
					]
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
			helpHandle(){
				
			},
			changeType(){
				if(this.inputType==='password'){
					this.inputType = 'number'
				}else{
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
			toResetPwd(){
				this.$refs.form1.validate().then(() => {
					uni.$u.toast('表单验证成功');
				}).catch(err => {
					console.log(err)
				})
			}
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
