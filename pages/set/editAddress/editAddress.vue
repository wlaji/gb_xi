<template>
	<view class="container">
		<u-picker :show="showAddressPicker" ref="uPicker" :closeOnClickOverlay="true" :columns="columns"
			:loading="loading" keyName="name" :defaultIndex="defaultIndex" @cancel="showAddressPicker=false"
			@close="showAddressPicker=false" @confirm="confirmAddress" @change="changeHandler"></u-picker>
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
				<u-form-item label="选择地区" prop="dizhi" borderBottom @click="showAddressPicker = true;">
					<u-input type="text" placeholder="省、市、区、街道" v-model="form.dizhi" disabled disabledColor="#ffffff"
						border="none">
						<template slot="suffix">
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-input>

				</u-form-item>
				<u-form-item label="详细地址" prop="detailedAddress" borderBottom
					:customStyle="{'alignItems':'flex-start'}">
					<u-textarea v-model="form.detailedAddress" placeholder="例如街道、门牌号、小区、楼栋号、单元室等" border="none">
					</u-textarea>
					<template slot="right">
						<view style="display: flex;align-items: center;line-height: 20px;" @click="getLocationInfo">
							<u-icon name="map" color="#fa436a" size="20"></u-icon>
							<text style="vertical-align: middle;">定位</text>
						</view>
					</template>
				</u-form-item>
				<u-form-item label="设为默认">
					<u-switch v-model="form.isDefault" :activeValue="1" :inactiveValue="0"></u-switch>
				</u-form-item>
			</u-form>
			<view class="add-address-btn">
				<u-button type="primary" text="保存" @click="save"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getProvinceList,
		getProvinceCityList,
		getProvinceCityAreaList,
		editUserAddressList,
		getUserAddressById
	} from '@/api/auth.js';
	import {getLocation} from '@/utils/util.js'
	export default {
		data() {
			return {
				showAddressPicker: false,
				showModalType: 0,
				modalCon: '',
				showModal: false,
				showLocation: false,
				form: {
					id: '',
					name: '',
					phone: '',
					dizhi: '',
					detailedAddress: '',
					isDefault: 0,
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
					],
					"name": [{
						required: true,
						message: '请输入名称',
						trigger: ['change', 'blur'],
					}],
					"detailedAddress": [{
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
				columns: [
					[],
					[],
					[]
				],
				defaultIndex: [0, 0, 0],
				provinceList: [],
				loading: false,
			};
		},
		methods: {
			confirmAddress() {
				this.showAddressPicker = false;
				let values = this.$refs.uPicker.getValues(),
					str = '';
				console.log(values);
				values.forEach(item => {
					str = str + ' ' + (item ? item.name : '')
				})
				this.form.dizhi = str;
			},
			async changeHandler(e) {
				const {
					value,
					values, // values为当前变化列的数组内容
					columnIndex,
					index,
					// 微信小程序无法将picker实例传出来，只能通过ref操作
					picker = this.$refs.uPicker
				} = e
				console.log(value, values);
				if (columnIndex === 0) {
					let provinceId = values[columnIndex][index].provinceId;
					let cityList = await getProvinceCityList({
						id: provinceId
					});
					picker.setColumnValues(1, cityList.data);
					let cityId = cityList.data.length ? cityList.data[0].cityId : null;
					if (!cityId) {
						picker.setColumnValues(2, []);
						return false;
					}
					let areaList = await getProvinceCityAreaList({
						id: cityId
					})
					picker.setColumnValues(2, areaList.data);
				} else if (columnIndex === 1) {
					let cityId = values[columnIndex][index].cityId;
					let areaList = await getProvinceCityAreaList({
						id: cityId
					})
					picker.setColumnValues(2, areaList.data)
				}
			},
			save() {
				this.$refs.form.validate().then(() => {
					let values = this.$refs.uPicker.getValues(),
						form = this.form;
					let provinceId = values[0] ? values[0].provinceId : null,
						province = values[0] ? values[0].name : null,
						cityId = values[1] ? values[1].cityId : null,
						city = values[1] ? values[1].name : null,
						areaId = values[2] ? values[2].areaId : null,
						area = values[2] ? values[2].name : null;
					console.log(values);
					editUserAddressList({
						cityId: cityId,
						city: city,
						areaId: areaId,
						area: area,
						provinceId: provinceId,
						province: province,
						detailedAddress: form.detailedAddress,
						isDefault: form.isDefault,
						name: form.name,
						phone: form.phone,
						id: form.id
					}).then(res => {
						uni.navigateBack()
					})
				}).catch(err => {
					console.log(err)
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			getLocationInfo(){
				getLocation((data)=>{
					console.log(data);
					if(data.code==200){
						this.form.detailedAddress = data.data.address;
					}else if(data.code==401){
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
			async getList() {
				let provinceList = await getProvinceList();
				let defaultProvinceId = provinceList.data[0].provinceId;
				let cityList = await getProvinceCityList({
					id: defaultProvinceId
				});
				let defaultCityId = cityList.data[0].cityId;
				let areaList = await getProvinceCityAreaList({
					id: defaultCityId
				});
				this.columns = [provinceList.data, cityList.data, areaList.data]
			}
		},
		onLoad(options) {
			console.log(options)
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
						phone: res.data.phone,
						dizhi: '',
						detailedAddress: res.data.detailedAddress,
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
			} else {
				this.getList();
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
