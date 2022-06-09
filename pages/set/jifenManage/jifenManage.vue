<template>
	<view class="container">
		<u-subsection :list="list" :current="current" @change="changeTab">
		</u-subsection>
		<template v-if="current===0">
			<view class="content" style="padding:0;">
				<view class="small-title">
					<text style="width: 20%;">姓名</text>
					<text style="width: 20%;text-align: right;">日期</text>
					<text style="width: 30%;text-align: right;">金额</text>
					<text style="width: 30%;text-align: right;">用途</text>
				</view>
				<div class="jf-wrap">
					<view class="jf-item" v-for="item in logList" :key="item.id">
						<text style="width: 20%;">{{item.fromUser?item.fromUser.userName:'自己'}}</text>
						<text style="width: 20%;text-align: right;">{{item.createTimeStr}}</text>
						<text
							style="width: 30%;text-align: right;">{{formatSymbol(item.changeSymbol)}}{{item.rebatFunds}}</text>
						<text style="width: 30%;text-align: right;">{{changeSymbol[item.changeSymbol]}}</text>
					</view>
				</div>
			</view>
		</template>
		<template v-else-if="current===1">
			<u-action-sheet :show="showSheet" :actions="userList" title="请选择转账人" @close="showSheet = false"
				@select="userSelect">
			</u-action-sheet>
			<view class="content input-content">
				<u-form labelPosition="left" :model="form2" ref="form2" errorType="toast" labelWidth="100px">
					<u-form-item label="转账人" prop="userName" borderBottom @click="showSheet = true; hideKeyboard()"
						ref="item1">
						<u-input v-model="form2.userName" disabled disabledColor="transparent" placeholder="请选择转账人"
							border="none"></u-input>
					</u-form-item>
					<u-form-item label="余额" prop="changeFunds" borderBottom>
						<u-input type="number" :placeholder="'当前可转余额 '+userInfo.funds" v-model="form2.changeFunds"
							border="none"></u-input>
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
				<u-form labelPosition="left" :model="form1" ref="form1" errorType="toast" labelWidth="100px">
					<u-form-item label="提现金额" prop="changeFunds" borderBottom>
						<u-input type="number" :placeholder="'当前可提现金额 '+userInfo.funds" v-model="form1.changeFunds"
							border="none"></u-input>
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
	import {getUserInfo} from '@/api/auth.js'
	import {
		getUserDirectRelation,
		turnFunds,
		getMyFundsLog,
		fundsOut
	} from '@/api/jfManage.js'
	export default {
		data() {
			return {
				changeSymbol: {
					1: '返利',
					2: '转账',
					3: '收款',
					4: '使用',
					5: '提现'
				},
				logList: [],
				showSheet: false,
				userList: [],
				status: 'loadmore',
				page: 0,
				list: ['余额明细', '余额转账'],
				current: 0,
				form1: {
					changeFunds: ''
				},
				form2: {
					changeFunds: '',
					toUserId: '',
					userName: ''
				},
				loading: false,
				loading2: false,
				rules: {
					'changeFunds': [{
						required: true,
						message: '请输入提现金额',
						trigger: ['blur'],
					}]
				},
				rules2: {
					'changeFunds': [{
						required: true,
						message: '请输入转账金额',
						trigger: ['blur'],
					}],
					'userName': [{
						required: true,
						message: '请选择转账人',
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
		methods: {
			updateUserInfo(){
				getUserInfo().then(res=>{
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
			hideKeyboard() {
				uni.hideKeyboard()
			},
			userSelect(item) {
				console.log(item);
				this.form2.toUserId = item.id;
				this.form2.userName = item.name
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
			zhuanzhang() {
				this.$refs.form2.validate().then(() => {
					turnFunds(this.form2).then(res => {
						uni.$u.toast('转账成功');
						this.updateUserInfo();
						this.form2 = {
							changeFunds: '',
							toUserId: '',
							userName: ''
						}
					})
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
			},
			getUserDirectRelationList() {
				getUserDirectRelation().then(res => {
					console.log(res);
					res.data.forEach(item => {
						item.name = item.userName;
						item.subname = item.loginTel
					})
					this.userList = res.data;
				})
			},
		},
		onLoad() {
			this.getUserDirectRelationList();
			getMyFundsLog().then(res => {
				this.logList = res.data;
			});
		}
	}
</script>

<style lang="scss" scoped>
	@include container-100();

	.content {
		height: calc(100% - 32px);
		padding: 40rpx 20rpx;

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
