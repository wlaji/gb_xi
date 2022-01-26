<template>
	<view class="container">
		<u-modal :show="showModal" closeOnClickOverlay :content='modalCon' confirmText="确定" confirmColor="#E44273"
			@confirm="setPermision" @close="showModal=false"></u-modal>
		<view class="formWrap">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="70px" errorType="toast">
				<u-form-item label="联系人" prop="name" borderBottom>
					<u-input type="text" placeholder="请填写收货人姓名" v-model="form.name" border="none"></u-input>
				</u-form-item>
				<u-form-item label="手机号" prop="phone" borderBottom>
					<u-input type="number" placeholder="请填写收货人手机号" v-model="form.phone" border="none"></u-input>
				</u-form-item>
				<u-form-item label="选择地区" prop="dizhi" borderBottom @click="showLocation = true;hideKeyboard()">
					<u-input type="text" placeholder="省、市、区、街道" v-model="form.dizhi" disabled disabledColor="#ffffff"
						border="none">
						<template slot="suffix">
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-input>

				</u-form-item>
				<u-form-item label="详细地址" prop="detailDizhi" borderBottom :customStyle="{'alignItems':'flex-start'}">
					<u-textarea v-model="form.detailDizhi" placeholder="例如街道、门牌号、小区、楼栋号、单元室等" border="none">
					</u-textarea>
					<template slot="right">
						<view style="display: flex;align-items: center;line-height: 20px;" @click="getLocation">
							<u-icon name="map" color="#fa436a" size="20"></u-icon>
							<text style="vertical-align: middle;">定位</text>
						</view>
					</template>

				</u-form-item>
				<u-form-item label="设为默认">
					<u-switch v-model="form.default"></u-switch>
				</u-form-item>
			</u-form>
			<view class="add-address-btn">
				<u-button type="primary" text="保存" @click="save"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import permision from "@/js_sdk/wa-permission/permission.js"
	export default {
		data() {
			return {
				showModalType: 0,
				modalCon: '',
				showModal: false,
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
			},
			async getLocation() {
				// #ifdef APP-PLUS
				if (permision.checkSystemEnableLocation()) {
					let platform = uni.getSystemInfoSync().platform,
						result = 1;
					if (platform === 'android') {
						result = await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
					} else if (platform === 'ios') {
						result = await permision.judgeIosPermission("location")
					}
					if (result == 1) {
						uni.chooseLocation({
							success: function(res) {
								console.log('位置名称：' + res.name);
								console.log('详细地址：' + res.address);
								console.log('纬度：' + res.latitude);
								console.log('经度：' + res.longitude);
							}
						});
					} else {
						this.showModalType = 2;
						this.showModal = true;
						this.modalCon = 'App没有获取位置的权限, 是否去开启';
					}
				} else {
					this.showModalType = 1;
					this.showModal = true;
					this.modalCon = '系统定位权限未开启,请先开启手机定位';
				}
				// #endif
				// #ifdef MP-WEIXIN
				let that = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() { //1.1 允许授权
						uni.chooseLocation({
							success: function(res) {
								console.log('位置名称：' + res.name);
								console.log('详细地址：' + res.address);
								console.log('纬度：' + res.latitude);
								console.log('经度：' + res.longitude);
							}
						});
					},
					fail(e) { //1.2 拒绝授权
						console.log(e)
						that.showModalType = 3;
						that.showModal = true;
						that.modalCon = '程序没有获取位置的权限, 是否去开启';
					}
				})
				// #endif
			},
			setPermision() {
				this.showModal = false;
				if (this.showModalType === 2) {
					permision.gotoAppPermissionSetting();
				}
				if (this.showModalType === 3) {
					uni.openSetting({
						success: (res) => {
							console.log(res)
						}
					})
				}
			}
		},
		onLoad(options) {
			console.log(options)
			if(options.type === 'add'){
				uni.setNavigationBarTitle({
				    title: '新增收货地址'
				});
			}else if (options.type === 'edit'){
				uni.setNavigationBarTitle({
				    title: '编辑收货地址'
				});
			}
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
			padding: 20rpx;

			/deep/ .u-line {
				margin: 0 !important;
			}
		}

		.add-address-btn {
			display: flex;
			align-items: center;
			margin-top: 20rpx;
		}

		.u-textarea {
			padding: 0;
		}
	}
</style>
