<template>
	<view class="container">
		<u-modal :show="showModal" title="如何加盟?" :showCancelButton="true" closeOnClickOverlay confirmText="支付押金"
			cancelText="取消" confirmColor="#E44273" @confirm="confirm" @cancel="showModal = false;"
			@close="showModal=false">
			<view slot="default">
				加盟需支付 8000元 押金, 同时我们将给您配送价值 12000元/24套 的产品
			</view>
		</u-modal>
		<view class="banner">
			<u-image :showLoading="true" src="/static/image/jm.png" width="100%" height="200px"></u-image>
			<text>我们期待您的加入</text>
		</view>
		<view class="des">
			<u-divider text="加盟店权益"></u-divider>
			<view>
				<u-parse :content="content"></u-parse>
			</view>
			<u-divider text=""></u-divider>
		</view>
		<view class="input-content">
			<u-form labelPosition="top" :model="form" ref="form1" labelWidth="auto" errorType="toast" borderBottom>
				<u-form-item label="姓名" prop="name" borderBottom>
					<u-input type="text" placeholder="请输入您的姓名" v-model="form.name" border="none"></u-input>
				</u-form-item>
				<u-form-item label="手机号" prop="phone" borderBottom>
					<u-input type="number" placeholder="请输入手机号" v-model="form.phone" border="none"></u-input>
				</u-form-item>
				<u-form-item label="微信号" prop="wxCode" borderBottom>
					<u-input type="text" placeholder="请输入微信号" v-model="form.wxCode" border="none"></u-input>
				</u-form-item>
				<u-form-item label="邮箱" prop="email" borderBottom>
					<u-input type="text" placeholder="请输入邮箱" v-model="form.email" border="none"></u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button @click="toSubmit" :loading="loading" loadingText="正在提交" type="primary">申请加盟</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showModal:false,
				loading: false,
				form: {
					phone: ''
				},
				rules: {
					'name': [{
						required: true,
						message: '请输入您的姓名',
						trigger: ['blur'],
					}],
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
					'wxCode': [{
						required: true,
						message: '请输入微信号',
						trigger: ['blur'],
					}],
					'email': [{
							required: true,
							message: '请输入邮箱',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.email(value);
							},
							message: '邮箱不正确',
							trigger: ['blur'],
						}
					]
				},
				content: `<p>线下到店提货服务费补贴20元/套归提货点加盟店所有, 网上下单归属区域所有加盟店平均分配, 服务加盟店者奖励加盟店的收入的20%</p>`
			};
		},
		methods: {
			toSubmit() {
				this.$refs.form1.validate().then(() => {
					uni.$u.toast('表单验证成功');
					this.showModal = true;
				}).catch(err => {
					console.log(err)
				})
			},
			confirm(){
				this.showModal = false;
			}
		},
		onReady() {
			this.$refs.form1.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	page,
	.container {
		height: 100%;
		background-color: #fff;
	}

	.input-content {
		padding: 20rpx;
	}

	.banner {
		position: relative;

		text {
			position: absolute;
			left: 50%;
			top: 50px;
			transform: translateX(-50%);
			color: #fff;
			font-size: 30px;
			white-space: nowrap;
		}
	}
	.des{
		padding:0 20rpx;
	}
</style>
