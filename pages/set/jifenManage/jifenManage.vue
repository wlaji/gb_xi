<template>
	<view class="container">
		<u-subsection :list="list" :current="current" @change="changeTab">
		</u-subsection>
		<template v-if="current===0">
			<view class="content" style="padding:0;">
				<view class="small-title">
					<text style="width: 30%;text-align: center;">日期</text>
					<text style="width: 30%;text-align: center;">金额</text>
					<text style="width: 30%;text-align: center;">用途</text>
				</view>
				<div class="jf-wrap">
					<view class="jf-item" v-for="item in logList" :key="item.id">
						<text style="width: 30%;text-align: center;">
							<u-text style="display: inline-block;" mode="date" :text="item.create_time" block size="12"></u-text>
						</text>
						<text style="width: 30%;text-align: center;">{{item.type===1?'+':'-'}}{{item.amount}}</text>
						<text style="width: 30%;text-align: center;">{{item.name}}</text>
					</view>
				</div>
			</view>
		</template>
		<template v-else-if="current===1">
			<BindPayPwd></BindPayPwd>
			<view class="content input-content">
				<u-form labelPosition="left" :model="form2" ref="form2" errorType="toast" labelWidth="100px">
					<u-form-item label="转账人手机号" prop="mobile" borderBottom>
						<u-input v-model="form2.mobile" disabledColor="transparent" placeholder="请输入手机号" border="none">
						</u-input>
					</u-form-item>
					<u-form-item label="余额" prop="money" borderBottom>
						<u-input type="digit" :placeholder="'当前可转余额 '+userInfo.balance" v-model="form2.money"
							border="none"></u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="zhuanzhangBefore" type="primary" :loading="loading2" loadingText="正在转账">
						转账
					</u-button>
				</view>
			</view>
		</template>
		<template v-else-if="current===2">
			<view class="content input-content">
				<u-form labelPosition="left" :model="form1" ref="form1" errorType="toast" labelWidth="100px">
					<u-form-item label="提现金额" prop="money" borderBottom>
						<u-input type="number" :placeholder="'当前可提现金额 '+userInfo.balance" v-model="form1.money"
							border="none"></u-input>
					</u-form-item>
				</u-form>
				<view style="margin-top:40rpx;">
					<u-button @click="tixian" type="primary" :loading="loading" loadingText="正在请求">提现
					</u-button>
				</view>
			</view>
		</template>
		<u-modal :show="show" @close="close" closeOnClickOverlay title="支付密码" @confirm="toSubmit">
			<view class="slot-content">
				<u-input type="password" v-model="form2.paypass" focus placeholder="请输入支付密码" border="surround" prefixIcon="lock-fill">
				</u-input>
			</view>
		</u-modal>
	</view>
</template>

<script>
	import BindPayPwd from '@/components/BindPayPwd.vue'
	import {
		myBalanceLog,
		balanceTransaction
	} from '@/api/newApi.js'

	export default {
		data() {
			return {
				show: false,
				logList: [],
				status: 'loadmore',
				list: ['余额明细', '余额转账'],
				current: 0,
				form1: {
					money: ''
				},
				form2: {
					money: '',
					mobile: '',
					paypass: ''
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
					'money': [{
						required: true,
						message: '请输入转账金额',
						trigger: ['blur'],
					}],
					'mobile': [{
						required: true,
						message: '请选择转账人手机号',
						trigger: ['blur'],
					}, {
						validator: (rule, value, callback) => {
							return uni.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['blur'],
					}]
				}
			};
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo || {}
			}
		},
		components:{
			BindPayPwd
		},
		methods: {
			toSubmit() {
				this.show = false;
				this.zhuanzhang();
			},
			close() {
				this.show = false
			},
			updateUserInfo() {
				getUserInfo().then(res => {
					let userInfo = res.data;
					this.$store.commit('updateUserInfo', userInfo)
				})
			},
			formatSymbol(symbol) {
				let str
				switch (symbol) {
					case 1:
						str = '+'
						break;
					case 2:
						str = '-'
						break;
					case 3:
						str = '+'
						break;
					case 4:
						str = '-'
						break;
					case 5:
						str = '-'
						break;
				}
				return str
			},
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
					fundsOut(this.form1).then(res => {
						if (res.data.status === 'SUCCESS') {
							uni.$u.toast('提现成功');
						} else {
							uni.$u.toast('微信异常')
						}
					})

				}).catch(err => {
					console.log(err)
				})
			},
			zhuanzhangBefore() {
				this.$refs.form2.validate().then(() => {
					this.show = true;
				}).catch(err => {
					console.log(err)
				})
			},
			zhuanzhang() {
				balanceTransaction(this.form2).then(res => {
					uni.$u.toast('转账成功');
					this.updateUserInfo();
					this.form2 = {
						money: '',
						toUserId: '',
						mobile: ''
					}
				})
			},
		},
		onLoad() {
			myBalanceLog({
				page: 1,
				size: 1000000
			}).then(res => {
				this.logList = res.data[0].data
			})
		}
	}
</script>

<style lang="scss" scoped>
	@include container-100();

	.content {
		height: calc(100% - 32px);
		padding: 40rpx 20rpx;
		font-size: 12px;

		.title {
			font-size: 16px;
			margin-bottom: 40rpx;
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
