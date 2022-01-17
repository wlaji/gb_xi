<template>
	<view class="container">
		<view class="formWrap">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="70px" errorType="toast">
				<u-form-item label="联系人" prop="name">
					<u-input type="text" placeholder="请填写收货人姓名" v-model="form.name"></u-input>
				</u-form-item>
				<u-form-item label="手机号" prop="phone">
					<u-input type="number" placeholder="请填写收货人手机号" v-model="form.phone"></u-input>
				</u-form-item>
				<u-form-item label="选择地区" prop="dizhi" @click="showLocation = true;hideKeyboard()">
					<u-input type="text" placeholder="省、市、区、街道" v-model="form.dizhi" disabled disabledColor="#ffffff">
						<template slot="suffix">
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-input>

				</u-form-item>
				<u-form-item label="详细地址" prop="detailDizhi">
					<u-textarea v-model="form.detailDizhi" placeholder="例如街道、门牌号、小区、楼栋号、单元室等"></u-textarea>
				</u-form-item>
				<u-form-item label="设为默认">
					<u-switch v-model="form.default" activeColor="#fa436a"></u-switch>
				</u-form-item>
			</u-form>
		</view>
		<view class="add-address-btn">
			<u-button type="primary" text="保存" color="#fa436a" @click="save"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLocation: false,
				form: {
					name: '',
					phone: '',
					dizhi: '',
					detailDizhi: '',
					default: false,
				},
				rules: {
					'phone': [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					]
				},
			};
		},
		methods: {
			save() {

			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
		onLoad(options) {
			console.log(options)
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 20rpx;

		.formWrap {
			background-color: #fff;
			padding: 10rpx;

			/deep/ .u-line {
				margin: 0 !important;
			}
		}

		.add-address-btn {
			display: flex;
			align-items: center;
			padding: 20rpx;
			margin-top: 20rpx;
		}
	}
</style>
