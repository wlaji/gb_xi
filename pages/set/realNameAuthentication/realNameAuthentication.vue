<template>
	<view class="container">
		<view class="tips">
			<i class="iconfont icon-anquan" style="font-size:18px;color:#2979FF"></i>
			<text>根据国家相关法律要求, 你需要填写身份证信息完成实名认证，以免影响使用国本商城相关功能和服务</text>
		</view>
		<view class="formWrap">
			<view class="title">
				身份证信息
			</view>
			<view class="des">
				信息仅用于身份验证，我们将保障您的信息安全
			</view>
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="60px" borderBottom>
				<u-form-item label="姓名" prop="name" borderBottom>
					<u-input type="number" placeholder="真实姓名" v-model="form.name" border="none"></u-input>
				</u-form-item>
				<u-form-item label="身份证" prop="idCard" borderBottom>
					<u-input type="number" placeholder="身份证号码" v-model="form.idCard" border="none"></u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button @click="submit" :loading="loading" loadingText="正在验证" type="primary">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loading:false,
				form: {
					name: '',
					idCard: ''
				},
				rules: {
					name: {
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur'],
					},
					idCard: {
						required: true,
						message: '请输入身份证号码',
						trigger: ['change', 'blur'],
					}
				},
			};
		},
		methods:{
			submit(){
				this.$refs.form.validate().then(() => {
					uni.$u.toast('表单验证成功');
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
					}, 1000)
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onLoad() {
			
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
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
	.formWrap{
		padding:20rpx;
		background-color: #fff;
		.title{
			margin-bottom: 10rpx;
			font-weight: 700;
		}
		.des{
			margin-bottom: 20rpx;
			color:$u-tips-color;
			font-size:12px;
		}
	}
</style>
