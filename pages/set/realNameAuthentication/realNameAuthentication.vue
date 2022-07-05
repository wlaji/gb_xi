<template>
	<view class="container">
		<view class="tips">
			<i class="iconfont icon-anquan" style="font-size:18px;color:#2979FF"></i>
			<text>根据国家相关法律要求, 你需要填写身份证信息完成实名认证，以免影响使用国本商城相关功能和服务</text>
		</view>
		<view class="formWrap input-content">
			<view class="title">
				身份证信息
			</view>
			<view class="des">
				信息仅用于身份验证和提现，我们将保障您的信息安全
			</view>
			<u-form labelPosition="left" :model="bindIdCardForm" ref="bindIdCardForm" labelWidth="100" errorType="toast"
				borderBottom>
				<u-form-item label="姓名" prop="name" borderBottom>
					<u-input type="text" placeholder="请输入真实姓名" v-model="bindIdCardForm.name" border="none">
					</u-input>
				</u-form-item>
				<u-form-item label="身份证" prop="num" borderBottom>
					<u-input type="idcard" placeholder="请输入身份证号码" v-model="bindIdCardForm.num" border="none">
					</u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button @click="submit" :loading="loading" loadingText="正在验证" type="primary">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		checkId
	} from '@/api/newApi.js'
	export default {
		data() {
			return {
				loading: false,
				bindIdCardForm: {
					name: '',
					num: '',
				},
				bindIdCardFormRules: {
					'name': [{
						required: true,
						message: '请输入真实姓名',
						trigger: ['blur'],
					}],
					'num': [{
						required: true,
						message: '请输入身份证号码',
						trigger: ['blur'],
					}]
				},
			};
		},
		methods: {
			submit() {
				this.$refs.bindIdCardForm.validate().then(() => {
					this.loading = true;
					checkId(this.bindIdCardForm).then(async res => {
						uni.$u.toast('身份证绑定成功');
						await this.$store.dispatch('updateUserInfo');
						this.$nextTick(()=>{
							uni.navigateBack()
						})
					}).finally(() => {
						this.loading = false;
					})
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onReady() {
			this.$refs.bindIdCardForm.setRules(this.bindIdCardFormRules);
		},
	}
</script>

<style lang="scss" scoped>
	.input-content {
		/deep/ .u-line {
			margin: 0 !important;
		}
	}

	.tips {
		padding: 10rpx 20rpx;
		display: flex;
		align-items: flex-start;
		background-color: #eee;

		text {
			margin-left: 10rpx;
			font-size: 12px;
		}
	}

	.formWrap {
		padding: 20rpx;
		background-color: #fff;

		.title {
			margin-bottom: 10rpx;
			font-weight: 700;
		}

		.des {
			margin-bottom: 20rpx;
			color: $u-tips-color;
			font-size: 12px;
		}
	}
</style>
