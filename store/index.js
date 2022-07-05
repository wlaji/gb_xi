import Vue from 'vue'
import Vuex from 'vuex'
import {
	getCookie
} from '@/utils/util'
Vue.use(Vuex)
import {
	userinfo
} from '@/api/newApi.js'
const store = new Vuex.Store({
	state: {
		addcartMessage:'',
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
			1: '未支付',
			2: '已支付',
			3: '已支付,但库存不够'
		},
		partnerLevel: {
			0: '注册会员',
			1: '普通会员',
			2: '合伙人'
		},
		tempCart: uni.getStorageSync('tempCart') || [],
		cart: uni.getStorageSync('cart') || [],
	},
	mutations: {
		setDefaultAddress(state, data) {
			state.defaultAddress = data;
		},
		addCart(state, data) {
			if(!state.cart.length){
				state.cart.push(data);
			}else{
				let findType = state.cart.find(item=>{
					return item.type == data.type
				})
				if(!findType){
					state.cart = [];
					state.cart.push(data);
					return false;
				}
				let findInd = state.cart.findIndex(item => {
					return item.id == data.id
				})
				if (findInd >= 0) {
					let oldQty = state.cart[findInd].qty
					state.cart[findInd] = data;
					state.cart[findInd].qty = oldQty + state.cart[findInd].qty
				} else {
					state.cart.push(data);
				}
			}
			uni.setStorageSync('cart', state.cart)
		},
		updateCart(state, data) {
			state.cart = data;
			uni.setStorageSync('cart', state.cart)
		},
		delCart(state, data) {
			state.cart.splice(data, 1);
			uni.setStorageSync('cart', state.cart)
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
		updateUserInfo({
			commit
		}) {
			return new Promise(resolve=>{
				userinfo().then(res => {
					commit('updateUserInfo', res.data[0]);
					resolve()
				})
			})
		}
	}
})

export default store
