<template>
	<view class="container">
		<view class="part" v-if="step===1">
			<view class="title">
				原手机号验证
			</view>
			<view class="des">
				请输入您的原绑定手机号
			</view>
			<view class="input-content">
				<u-form labelPosition="left" :model="form1" ref="form1" labelWidth="auto" errorType="toast"
					borderBottom>
					<u-form-item label="手机号" prop="phone" borderBottom>
						<u-input type="number" placeholder="请输入手机号" v-model="form1.phone" border="none"></u-input>
					</u-form-item>
					<u-form-item label="验证码" prop="code" borderBottom>
						<u-input type="number" placeholder="请输入验证码" v-model="form1.code" border="none">
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
							</template>
						</u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="btnWrap">
				<u-button type="primary" text="下一步" @click="next"></u-button>
			</view>
		</view>
		<view class="part" v-if="step===2">
			<view class="title">
				输入新手机号
			</view>
			<view class="des">
				更换后, 下次可用新手机号登录
			</view>
			<view class="input-content">
				<u-form labelPosition="left" :model="form2" ref="form2" labelWidth="auto" errorType="toast"
					borderBottom>
					<u-form-item label="手机号" prop="phone" borderBottom>
						<u-input type="number" placeholder="请输入手机号" v-model="form2.phone" border="none"></u-input>
					</u-form-item>
					<u-form-item label="验证码" prop="code" borderBottom>
						<u-input type="number" placeholder="请输入验证码" v-model="form2.code" border="none">
							<template slot="suffix">
								<u-code ref="uCode" @change="codeChange" seconds="60" changeText="X秒重新获取"></u-code>
								<u-button @tap="getCode" :text="tips" type="success" size="mini"></u-button>
							</template>
						</u-input>
					</u-form-item>
				</u-form>
			</view>
			<view class="btnWrap">
				<u-button type="primary" text="确定更换" @click="confirmChange"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal: false,
				tips: '',
				form1: {
					phone: '',
					code: '',
				},
				form2: {
					phone: '',
					code: '',
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
				step: 1
			};
		},
		methods: {
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
			next() {
				this.$refs.form1.validate().then(() => {
					this.step += 1;
					this.$refs.form2.setRules(this.rules);
				}).catch(err => {
					console.log(err)
				})
			},
			confirmChange() {
				this.$refs.form2.validate().then(() => {

				}).catch(err => {
					console.log(err)
				})
			},
			confirm(){
				uni.navigateBack();
				uni.na
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rules);
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

	.part {
		.title {
			font-weight: 700;
			font-size: 18px;
			margin-bottom: 10rpx;
		}

		.des {
			margin-bottom: 60rpx;
			color: $u-tips-color;
		}

		.input-content {
			margin-bottom: 40rpx;
		}
	}
</style>
