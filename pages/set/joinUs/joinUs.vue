<template>
	<view class="container">
		<view class="banner">
			<u-image :showLoading="true" src="/static/image/jm.png" width="100%" height="200px"></u-image>
			<text>我们期待您的加入</text>
		</view>
		<view class="des">
			<u-divider text="合伙人权益"></u-divider>
			<view>
				<u-parse :content="content"></u-parse>
			</view>
			<u-divider text=""></u-divider>
		</view>
		<view class="input-content">
			<u-form labelPosition="left" :model="form" ref="form" labelWidth="80" errorType="toast" borderBottom>
				<u-form-item label="微信号" prop="wxNum" borderBottom>
					<u-input type="text" placeholder="请输入微信号" v-model="form.wxNum" border="none"></u-input>
				</u-form-item>
				<u-form-item label="邮箱" prop="email" borderBottom>
					<u-input type="text" placeholder="请输入邮箱" v-model="form.email" border="none"></u-input>
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
			</u-form>
			<view style="margin-top:40rpx;">
				<u-button @click="toSubmit" :loading="loadingBtn" loadingText="正在提交" type="primary">申请成为合伙人</u-button>
			</view>
		</view>

		<u-picker :show="showAddressPicker" ref="uPicker" :closeOnClickOverlay="true" :columns="columns"
			:loading="loading" keyName="name" :defaultIndex="defaultIndex" @cancel="showAddressPicker=false"
			@close="showAddressPicker=false" @confirm="confirmAddress" @change="changeHandler"></u-picker>
		<u-modal :show="showModal" closeOnClickOverlay :content='modalCon' confirmText="确定" confirmColor="#E44273"
			@confirm="setPermision" @close="showModal=false"></u-modal>
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
	import {
		addJoinCheck
	} from '@/api/public.js'
	import {
		getLocation
	} from '@/utils/util.js'
	export default {
		data() {
			return {
				showAddressPicker: false,
				showModalType: 0,
				modalCon: '',
				showModal: false,
				loading: false,
				loadingBtn: false,
				columns: [
					[],
					[],
					[]
				],
				defaultIndex: [0, 0, 0],
				provinceList: [],
				form: {
					wxNum: '',
					email: '',
					detailedAddress: '',
					dizhi: ''
				},
				rules: {
					'wxNum': [{
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
					],
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
				content: `<p>线下到店提货服务费补贴20元/套归提货点加盟店所有, 网上下单归属区域所有加盟店平均分配, 服务加盟店者奖励加盟店的收入的20%</p>`
			};
		},
		methods: {
			toSubmit() {
				this.$refs.form.validate().then(() => {
					this.loadingBtn = true;
					let values = this.$refs.uPicker.getValues(),
						form = this.form;
					let provinceId = values[0] ? values[0].provinceId : null,
						province = values[0] ? values[0].name : null,
						cityId = values[1] ? values[1].cityId : null,
						city = values[1] ? values[1].name : null,
						areaId = values[2] ? values[2].areaId : null,
						area = values[2] ? values[2].name : null;
					console.log(values);
					addJoinCheck({
						cityId: cityId,
						city: city,
						areaId: areaId,
						area: area,
						provinceId: provinceId,
						province: province,
						detailedAddress: form.detailedAddress,
						email: form.email,
						wxNum: form.wxNum
					}).then(res => {
						uni.$u.toast('加盟成功');
						uni.navigateBack()
					}).finally(()=>{
						this.loadingBtn = false;
					})
				}).catch(err => {
					console.log(err)
				})
			},
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
			hideKeyboard() {
				uni.hideKeyboard()
			},
			getLocationInfo() {
				getLocation((data) => {
					console.log(data);
					if (data.code == 200) {
						this.form.detailedAddress = data.data.address;
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
		onLoad() {
			this.getList();
		},
		onReady() {
			this.$refs.form.setRules(this.rules);
		}
	}
</script>

<style lang="scss" scoped>
	.input-content {
		padding: 20rpx;
		background-color: #fff;
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

	.des {
		padding: 0 20rpx;
	}

	.u-textarea {
		padding: 0;
	}
</style>
