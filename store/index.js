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
		newVersionCode:0,
		currentVersionCode:0,
		versionInfo:'',
		appUpdateInfo:null
	},
	mutations: {
		login(state, res) {
			state.hasLogin = true;
			state.userinfo = res.userInfo;
			uni.setStorage({
				key: 'userInfo',
				data: res.userInfo
			});
			uni.setStorage({
				key: 'token',
				data: res.token
			});
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
		version(state,widgetInfo){
			state.versionInfo = widgetInfo;
			state.currentVersionCode = widgetInfo.versionCode;
		},
		updateAppInfo(state,data){
			console.log(data,'后台返回的更新结果')
			state.appUpdateInfo = data;
		}
	},
	getters: {
		isLogin(state) {
			return state.hasLogin
		},
		hasNewVersion(state){
			return state.newVersionCode>state.currentVersionCode?true:false
		}
	},
	actions: {

	}
})

export default store
