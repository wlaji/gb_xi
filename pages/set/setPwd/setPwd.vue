<template>
	<view class="container">
		<view class="input-content">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="100px" errorType="toast" borderBottom>
				<u-form-item label="新密码" prop="password" borderBottom>
					<u-input :type="inputType1" placeholder="请输入新密码" v-model="form.password" border="none" clearable>
						<template slot="suffix">
							<u-icon name="eye" @click="changeType1" :color="inputType1==='password'?'#333333':'#2b85e4'"></u-icon>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="确认密码" prop="password2" borderBottom>
					<u-input :type="inputType2" placeholder="请输入新密码" v-model="form.password2" border="none" clearable>
						<template slot="suffix">
							<u-icon name="eye" @click="changeType2" :color="inputType2==='password'?'#333333':'#2b85e4'"></u-icon>
						</template>
					</u-input>
				</u-form-item>
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button type="primary" @click="submit" :loading="loading" loadingText="正在修改">完成</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					password: '',
					password2: '',
				},
				loading:false,
				rules: {
					'password': [{
							required: true,
							message: '请输入新密码',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								if(value!==this.form.password2){
									return false;
								}
								return true
							},
							message: '两次密码不一致',
							trigger: ['blur'],
						}
					],
					'password2': [{
							required: true,
							message: '请输入新密码',
							trigger: ['blur'],
						},
						{
							validator: (rule, value, callback) => {
								if(value!==this.form.password){
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
				inputType2: 'password'
			};
		},
		methods:{
			changeType1(){
				if(this.inputType1==='password'){
					this.inputType1 = 'number'
				}else{
					this.inputType1 = 'password'
				}
			},
			changeType2(){
				if(this.inputType2==='password'){
					this.inputType2 = 'number'
				}else{
					this.inputType2 = 'password'
				}
			},
			submit(){
				this.$refs.form.validate().then(() => {
					uni.$u.toast('表单验证成功');
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
					}, 2000)
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
