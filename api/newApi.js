import request from '@/utils/request';

//发送短信
export const sendSms = function(data) {
	return request({
		url: '/v1/login/sendSms',
		method: 'get',
		params: data
	})
}

//注册
export const register = function(data,headers) {
	return request({
		url: '/v1/login/register',
		method: 'post',
		headers,
		data
	})
}

//登录
export const login = function(data) {
	return request({
		url: '/v1/login/login',
		method: 'post',
		data
	})
}

