<template>
	<view class="container">
		<u-subsection :list="list" :current="current" activeColor="#fa436a" mode="subsection" @change="changeTab">
		</u-subsection>
		<template v-if="current===0">
			<view class="content input-content">
				<view class="title">您的可用积分: <text style="color:#fa436a">3000</text></view>
				<u-form labelPosition="left" :model="form2" ref="form2" errorType="toast" labelWidth="100px">
					<u-form-item label="转账人手机号" prop="phone">
						<u-input type="number" placeholder="请输入转账人手机号" v-model="form2.phone"></u-input>
					</u-form-item>
					<u-form-item label="提现金额" prop="money">
						<u-input type="number" placeholder="请输入提现金额" v-model="form2.money"></u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="zhuanzhang" type="primary" :loading="loading2" loadingText="正在转账" color="#fa436a">
						转账
					</u-button>
				</view>
			</view>
		</template>
		<template v-else-if="current===1">
			<view class="content input-content">
				<view class="title">您的可用积分: <text style="color:#fa436a">3000</text></view>
				<u-form labelPosition="left" :model="form1" ref="form1" errorType="toast" labelWidth="100px">
					<u-form-item label="提现金额" prop="money">
						<u-input type="number" placeholder="请输入提现金额" v-model="form1.money"></u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="tixian" type="primary" :loading="loading" loadingText="正在请求" color="#fa436a">提现
					</u-button>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: ['积分转账', '积分提现'],
				current: 0,
				form1: {
					money: ''
				},
				form2: {
					money: '',
					phone: ''
				},
				loading: false,
				loading2: false,
				rules: {
					'money': [{
						required: true,
						message: '请输入提现金额',
						trigger: ['blur'],
					}]
				},
				rules2: {
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
					'money': [{
						required: true,
						message: '请输入提现金额',
						trigger: ['blur'],
					}]
				}
			};
		},
		methods: {
			changeTab(index) {
				console.log(index)
				this.current = index;
				this.$nextTick(() => {
					if (index === 0) {
						this.$refs.form2.setRules(this.rules2);
					} else {
						this.$refs.form1.setRules(this.rules);
					}
				})
			},
			tixian() {
				this.$refs.form1.validate().then(() => {
					uni.$u.toast('表单验证成功');
					uni.showActionSheet({
						itemList: ['微信', '支付宝'],
						success: res => {
							console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						},
						fail: res => {
							console.log(res.errMsg);
						}
					});
				}).catch(err => {
					console.log(err)
				})
			},
			zhuanzhang() {
				this.$refs.form2.validate().then(() => {
					uni.$u.toast('表单验证成功');

				}).catch(err => {
					console.log(err)
				})
			}
		},
		onReady() {
			this.$refs.form2.setRules(this.rules2);
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		height: 100%;
		background-color: #fff;
	}

	.content {
		padding: 40rpx 20rpx;

		.title {
			font-size: 16px;
			margin-bottom: 40rpx;
			font-weight: 700;
		}
	}
</style>
