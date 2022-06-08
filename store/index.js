import Vue from 'vue'
import Vuex from 'vuex'
import {
	getCookie
} from '@/utils/util'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: null,
		newVersionCode: 0,
		currentVersionCode: 0,
		versionInfo: '',
		appUpdateInfo: null,
		defaultAddress: '',
		list: [{
				cateName: '秒杀',
				productType: 3,
				iconName: 'clock'
			},
			{
				cateName: '0元购',
				productType: 2,
				iconName: 'rmb'
			},
			{
				cateName: '推广专区',
				productType: 1,
				iconName: 'share'
			},

			{
				cateName: '金币兑换',
				productType: 4,
				iconName: 'rmb-circle'
			}
		],
		orderStatus: {
			0: '全部',
			1: '待付款',
			2: '待发货',
			3: '待收货',
			4: '已签收',
			5: '已取消',
		},
		tempCart: uni.getStorageSync('tempCart') || [],
	},
	mutations: {
		setDefaultAddress(state, data) {
			state.defaultAddress = data;
		},
		updateTempCart(state, data) {
			state.tempCart = data;
			uni.setStorageSync('tempCart', data)
		},
		updateUserInfo(state, data) {
			state.userInfo = data;
			uni.setStorageSync('userInfo', data);
		},
		login(state, res) {
			state.hasLogin = true;
			state.userInfo = res.userInfo;
			uni.setStorageSync('userInfo', res.userInfo);
			uni.setStorageSync('token', res.token)
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = null;
			uni.removeStorage({
				key: 'userInfo'
			});
			uni.removeStorage({
				key: 'token'
			});
		},
		version(state, widgetInfo) {
			state.versionInfo = widgetInfo;
			state.currentVersionCode = widgetInfo.versionCode;
		},
		updateAppInfo(state, data) {
			console.log(data, '后台返回的更新结果')
			state.appUpdateInfo = data;
			state.newVersionCode = data.versions
		}
	},
	getters: {
		isLogin(state) {
			return state.hasLogin
		},
		hasNewVersion(state) {
			return state.newVersionCode > state.currentVersionCode ? true : false
		}
	},
	actions: {

	}
})

export default store
