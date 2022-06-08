import axios from 'axios'
import store from '../store/index.js'
import {getCookie} from '@/utils/util'
// 创建axios实例
const service = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ?
		'http://192.168.1.92:8088' : 'http://139.196.204.139:8088',
	timeout: 100000,
	transformRequest: [(data) => {
		data = JSON.stringify(data);
		return data
	}],
	headers: {
		get: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
		},
		post: {
			'Content-Type': 'application/json;charset=utf-8'
		}
	},
})


// request拦截器
service.interceptors.request.use(
	(config) => {
		const token = getCookie('token');
		if (token) {
			config.headers['token'] = token;
		}
		return config;
	},
	error => {
		return Promise.reject(error)
	}
);

// 响应拦截器
service.interceptors.response.use(
	(res) => {
		const code = res.data.code;
		if (res.status === 200) {
			if (code === 401) {
				uni.showModal({
				    title: '提示',
				    content: '登录过期了, 请重新登录',
					showCancel:false,
					confirmText:'我知道了',
				    success: function (res) {
				        if (res.confirm) {
							store.commit('logout')
				            uni.navigateTo({
				            	url:'/pages/login/login'
				            })
				        }
				    }
				});
			} else if (code === 200 || !code) {
				return res.data
			} else {
				uni.showToast({
					title: res.data.message,
					duration: 2000,
					icon: 'none'
				});
				return Promise.reject(res.data)
			}
		} else {
			return Promise.reject(res.data)
		}
	},
	error => {
		if (axios.isCancel(error)) {
			console.log('repeated request')
		} else {
			error.data = {};
			error.data.message = error.message || '请求超时或服务器异常，请检查网络或联系管理员！';
		}
		return Promise.reject(error)
	}
);

axios.defaults.adapter = function(config) {
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};

				settle(resolve, reject, response);
			}
		})
	})
}
export default service
