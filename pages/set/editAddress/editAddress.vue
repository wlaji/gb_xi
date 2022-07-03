<template>
	<view class="container">
		<u-modal :show="showModal" closeOnClickOverlay :content='modalCon' confirmText="确定" confirmColor="#E44273"
			@confirm="setPermision" @close="showModal=false"></u-modal>
		<view class="formWrap">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="70px" errorType="toast">
				<u-form-item label="联系人" prop="name" borderBottom>
					<u-input type="text" placeholder="请填写收货人姓名" v-model="form.name" border="none"></u-input>
				</u-form-item>
				<u-form-item label="手机号" prop="mobile" borderBottom>
					<u-input type="number" placeholder="请填写收货人手机号" v-model="form.mobile" border="none"></u-input>
				</u-form-item>
				<u-form-item label="选择地区" prop="dizhi" borderBottom>
					<view class="input" type="text" placeholder="请选择地区">
						<picker class="pickerList" mode="multiSelector" :range="newProvinceDataList" :value="multiIndex"
							@change="pickerChange" @columnchange="pickerColumnchange">
							<!-- <view>{{provinceDataList[0].name}}--{{provinceDataList[0].city[0].name}}--{{provinceDataList[0].city[0].area[0]}}</view> -->
							<view class="">{{form.dizhi || '选择省市区'}}</view>
						</picker>
					</view>
				</u-form-item>
				<u-form-item label="详细地址" prop="detail" borderBottom
					:customStyle="{'alignItems':'flex-start'}">
					<u-textarea v-model="form.detail" placeholder="例如街道、门牌号、小区、楼栋号、单元室等" border="none">
					</u-textarea>
					<template slot="right">
						<view style="display: flex;align-items: center;line-height: 20px;" @click="getLocationInfo">
							<u-icon name="map" color="#fa436a" size="20"></u-icon>
							<text style="vertical-align: middle;">定位</text>
						</view>
					</template>
				</u-form-item>
<!-- 				<u-form-item label="设为默认">
					<u-switch v-model="form.isDefault" :activeValue="1" :inactiveValue="0"></u-switch>
				</u-form-item> -->
			</u-form>
			<view class="add-address-btn">
				<u-button type="primary" text="保存" @click="save"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	// import {
	// 	getProvinceList,
	// 	getProvinceCityList,
	// 	getProvinceCityAreaList,
	// 	editUserAddressList,
	// 	getUserAddressById
	// } from '@/api/auth.js';
	import provinceData from '@/utils/province.js';
	import {
		createOrUpdateAddress
	} from '@/api/newApi.js'
	import {
		getLocation
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				oldpProvinceDataList: provinceData.data,
				newProvinceDataList: [
					[],
					[],
					[]
				],
				multiIndex: [0, 0, 0],
				showAddressPicker: false,
				showModalType: 0,
				modalCon: '',
				showModal: false,
				showLocation: false,
				form: {
					id: '',
					name: '',
					mobile: '',
					dizhi: '',
					detail: '',
					isDefault: 0,
				},
				rules: {
					'mobile': [{
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
					],
					"name": [{
						required: true,
						message: '请输入名称',
						trigger: ['change', 'blur'],
					}],
					"detail": [{
						required: true,
						message: '请输入详细地址',
						trigger: ['change', 'blur'],
					}],
					"dizhi": [{
						required: true,
						message: '请选择地区',
						trigger: ['change', 'blur'],
					}]
				},
			};
		},
		methods: {
			// 省市区确认事件
			pickerChange(e) {
				this.multiIndex = e.detail.value;
				this.form.dizhi =
					`${this.newProvinceDataList[0][this.multiIndex[0]]}--${this.newProvinceDataList[1][this.multiIndex[1]]}--${this.newProvinceDataList[2][this.multiIndex[2]]}`
			},
			pickerColumnchange(e) {
				// 第几列滑动
				// console.log(e.detail.column);
				// 第几列滑动的下标
				// console.log(e.detail.value)
				// 第一列滑动
				if (e.detail.column === 0) {
					this.multiIndex[0] = e.detail.value
					// console.log('第一列滑动');
					// this.newProvinceDataList[1] = [];
					this.newProvinceDataList[1] = this.oldpProvinceDataList[this.multiIndex[0]].city.map((item, index) => {
						// console.log(item)
						return item.name
					})
					// console.log(this.multiIndex)
					if (this.oldpProvinceDataList[this.multiIndex[0]].city.length === 1) {
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[0].area.map((item,
							index) => {
							// console.log(item)
							return item
						})
					} else {
						this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[this.multiIndex[
							1]].area.map((item, index) => {
							// console.log(item)
							return item
						})
					}
					// 第一列滑动  第二列 和第三列 都变为第一个
					this.multiIndex.splice(1, 1, 0)
					this.multiIndex.splice(2, 1, 0)
				}
				// 第二列滑动
				if (e.detail.column === 1) {
					this.multiIndex[1] = e.detail.value
					// console.log('第二列滑动');
					// console.log(this.multiIndex)
					this.newProvinceDataList[2] = this.oldpProvinceDataList[this.multiIndex[0]].city[this.multiIndex[1]]
						.area.map((item, index) => {
							// console.log(item)
							return item
						})
					// 第二列 滑动 第三列 变成第一个
					this.multiIndex.splice(2, 1, 0)
				}
				// 第三列滑动
				if (e.detail.column === 2) {
					this.multiIndex[2] = e.detail.value
					// console.log('第三列滑动')
					// console.log(this.multiIndex)
				}
			},
			save() {
				this.$refs.form.validate().then(() => {
					let province = this.newProvinceDataList[0][this.multiIndex[0]],
						city = this.newProvinceDataList[1][this.multiIndex[1]],
						country = this.newProvinceDataList[2][this.multiIndex[2]],
						form = this.form;
					createOrUpdateAddress({
						city: city,
						country: country,
						province: province,
						detail: form.detail,
						isDefault: form.isDefault,
						name: form.name,
						mobile: form.mobile,
						id: form.id
					}).then(res => {
						uni.navigateBack()
					})
				}).catch(err => {
					console.log(err)
				})
			},

			getLocationInfo() {
				getLocation((data) => {
					console.log(data);
					if (data.code == 200) {
						this.form.detail = data.data.address;
					} else if (data.code == 401) {
						this.modalCon = data.msg;
						this.showModal = true;
					}
				})
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
			},
		},
		onLoad(options) {
			for (let i = 0; i < this.oldpProvinceDataList.length; i++) {
				// console.log(this.oldpProvinceDataList[i].name);
				this.newProvinceDataList[0].push(this.oldpProvinceDataList[i].name);
			}
			for (let i = 0; i < this.oldpProvinceDataList[0].city.length; i++) {
				// console.log(this.oldpProvinceDataList[0].city[i].name)
				this.newProvinceDataList[1].push(this.oldpProvinceDataList[0].city[i].name);
			}
			for (let i = 0; i < this.oldpProvinceDataList[0].city[0].area.length; i++) {
				// console.log(this.oldpProvinceDataList[0].city[0].area)
				this.newProvinceDataList[2].push(this.oldpProvinceDataList[0].city[0].area[i]);
			}
			if (options.type === 'add') {
				uni.setNavigationBarTitle({
					title: '新增收货地址'
				});
			} else if (options.type === 'edit') {
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				});
			}
			if (options.id) {
				getUserAddressById({
					id: options.id
				}).then(async res => {
					this.form = {
						id: res.data.id,
						name: res.data.name,
						mobile: res.data.mobile,
						dizhi: '',
						detail: res.data.detail,
						isDefault: res.data.isDefault,
					}
					let defaultProvinceId = res.data.provinceId;
					let defaultCityId = res.data.cityId;
					let defaultAreaId = res.data.areaId
					let provinceList = (await getProvinceList()).data;
					let cityList = (await getProvinceCityList({
						id: defaultProvinceId
					})).data;
					let areaList = (await getProvinceCityAreaList({
						id: defaultCityId
					})).data;
					this.columns = [provinceList, cityList, areaList];
					let defaultProvinceInd = 0,
						defaultCityInd = 0,
						defaultAreaInd = 0;
					defaultProvinceInd = provinceList.findIndex(item => {
						return item.provinceId == defaultProvinceId
					})
					if (cityList.length) {
						defaultCityInd = cityList.findIndex(item => {
							return item.cityId == defaultCityId
						})
					}
					if (areaList.length) {
						defaultAreaInd = areaList.findIndex(item => {
							return item.areaId == defaultAreaId
						})
					}
					this.defaultIndex = [defaultProvinceInd, defaultCityInd, defaultAreaInd];
					this.$nextTick(() => {
						this.confirmAddress()
					})
					console.log(this.defaultIndex)
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
