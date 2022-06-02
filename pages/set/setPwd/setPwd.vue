<template>
	<view class="container">
		<view class="tips" style="margin-bottom: 20rpx;">
			注意: 微信快捷登录后, 初始密码是 <text style="color:red">123456</text>,请及时修改~
		</view>
		<view class="input-content">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="100px" errorType="toast" borderBottom>
				<u-form-item label="原密码" prop="oldPassword" borderBottom>
					<u-input :type="inputType3" placeholder="请输入原密码" v-model="form.oldPassword" border="none" clearable>
						<template slot="suffix">
							<u-icon name="eye" @click="changeType3"
								:color="inputType3==='password'?'#333333':'#2b85e4'"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="新密码" prop="newPassword" borderBottom>
					<u-input :type="inputType1" placeholder="请输入新密码" v-model="form.newPassword" border="none" clearable>
						<template slot="suffix">
							<u-icon name="eye" @click="changeType1"
								:color="inputType1==='password'?'#333333':'#2b85e4'"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="确认密码" prop="newPassword2" borderBottom>
					<u-input :type="inputType2" placeholder="请输入新密码" v-model="form.newPassword2" border="none" clearable>
						<template slot="suffix">
							<u-icon name="eye" @click="changeType2"
								:color="inputType2==='password'?'#333333':'#2b85e4'"></u-icon>
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button type="primary" @click="submit" :loading="loading" loadingText="正在修改">提交</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		changePassword
	} from '@/api/auth.js'
	export default {
		data() {
			return {
				form: {
					oldPassword: '',
					newPassword: '',
					newPassword2: '',
				},
				loading: false,
				rules: {
					'oldPassword': [{
						required: true,
						message: '请输入原密码',
						trigger: ['blur'],
					}],
					'newPassword': [{
							required: true,
							message: '请输入新密码',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								if (value !== this.form.newPassword2) {
									return false;
								}
								return true
							},
							message: '两次密码不一致',
							trigger: ['blur'],
						}
					],
					'newPassword2': [{
							required: true,
							message: '请输入新密码',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								if (value !== this.form.newPassword) {
									return false;
								}
								return true
							},
							message: '两次密码不一致',
							trigger: ['blur'],
						}
					]
				},
				inputType1: 'password',
				inputType2: 'password',
				inputType3: 'password',
			};
		},
		methods: {
			changeType1() {
				if (this.inputType1 === 'password') {
					this.inputType1 = 'number'
				} else {
					this.inputType1 = 'password'
				}
			},
			changeType2() {
				if (this.inputType2 === 'password') {
					this.inputType2 = 'number'
				} else {
					this.inputType2 = 'password'
				}
			},
			changeType3() {
				if (this.inputType3 === 'password') {
					this.inputType3 = 'number'
				} else {
					this.inputType3 = 'password'
				}
			},
			submit() {
				this.$refs.form.validate().then(() => {
					this.loading = true;
					changePassword(this.form).then(res => {
						uni.setStorageSync('token', res.data.token);
						uni.$u.toast('修改密码成功')
						uni.navigateBack()
					}).finally(() => {
						this.loading = false;
					})
				}).catch(err => {
					console.log(err)
				})
			}
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
		background-color: #fff;
	}

	.input-content {
		/deep/ .u-line {
			margin: 0 !important;
		}
	}
</style>
