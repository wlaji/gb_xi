<template>
	<view class="container">
		<u-subsection :list="list" :current="current" @change="changeTab">
		</u-subsection>
		<template v-if="current===0">
			<view class="content" style="padding:0;display: flex;flex-direction: column;">
				<view class="small-title">
					<text>姓名</text>
					<text>日期</text>
					<text>积分</text>
				</view>
				<scroll-view scroll-y="true" class="jf-wrap" @scrolltolower="loadData">
					<view class="jf-item">
						<text>罗勇</text>
						<text>2020-12-52</text>
						<text>100</text>
					</view>
					<view class="jf-item">
						<text>罗勇</text>
						<text>2020-12-52</text>
						<text>100</text>
					</view>
					<view class="jf-item">
						<text>罗勇</text>
						<text>2020-12-52</text>
						<text>100</text>
					</view>
					<u-loadmore :status="status" height="30px" />
				</scroll-view>
			</view>
		</template>
		<template v-else-if="current===1">
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
					<u-button @click="zhuanzhang" type="primary" :loading="loading2" loadingText="正在转账">
						转账
					</u-button>
				</view>
			</view>
		</template>
		<template v-else-if="current===2">
			<view class="content input-content">
				<view class="title">您的可用积分: <text style="color:#fa436a">3000</text></view>
				<u-form labelPosition="left" :model="form1" ref="form1" errorType="toast" labelWidth="100px">
					<u-form-item label="提现金额" prop="money">
						<u-input type="number" placeholder="请输入提现金额" v-model="form1.money"></u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="tixian" type="primary" :loading="loading" loadingText="正在请求">提现
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
				status: 'loadmore',
				page: 0,
				list: ['积分明细', '积分转账', '积分提现'],
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
					if (index === 1) {
						this.$refs.form2.setRules(this.rules2);
					} else if (index === 2) {
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
			},
			loadData() {
				console.log('加载数据')
				if (this.page >= 3) return;
				this.status = 'loading';
				this.page = ++this.page;
				setTimeout(() => {
					if (this.page >= 3) {
						this.status = 'nomore';
					} else {
						this.status = 'loading';
					}
				}, 2000)
			}
		},
		onReady() {

		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #fff;
	}

	.content {
		flex: 1;
		height: 0;
		padding: 40rpx 20rpx;

		.title {
			font-size: 16px;
			margin-bottom: 40rpx;
			font-weight: 700;
		}
	}

	.small-title {
		display: flex;
		justify-content: space-between;
		color: $u-tips-color;
		padding: 20rpx;
	}

	.jf-wrap {
		overflow: auto;
		flex: 1;

		.jf-item {
			display: flex;
			justify-content: space-between;
			color: $u-content-color;
			padding: 10rpx 20rpx;
		}
	}
</style>
