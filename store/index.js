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
	},
	mutations: {
		login(state, res) {
			state.hasLogin = true;
			state.userinfo = res.userInfo;
			uni.setStorage({
				key: 'userinfo',
				data: res.userInfo
			});
			uni.setStorage({
				key: 'token',
				data: res.token
			})
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = null;
			uni.removeStorage({
				key: 'userInfo'
			})
			uni.removeStorage({
				key: 'token'
			})
		}
	},
	getters: {
		isLogin(state) {
			return state.hasLogin
		}
	},
	actions: {

	}
})

export default store
