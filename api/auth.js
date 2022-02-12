import request from '@/utils/request';

//注册
export const register = function(data) {
	return request({
		url: '/app/user/register',
		method: 'post',
		data
	})
}

export const byPassword = function(data) {
	return request({
		url: '/app/login/byPassword',
		method: 'post',
		data
	})
}

export const byCode = function(data) {
	return request({
		url: '/app/login/byCode',
		method: 'post',
		data
	})
}

export const byJsWx = function(data) {
	return request({
		url: '/app/login/byJsWx',
		method: 'post',
		data
	})
}

export const forgetPassword = function(data) {
	return request({
		url: '/app/user/forgetPassword',
		method: 'post',
		data
	})
}

export const getUserInfo = function(data) {
	return request({
		url: '/app/user/getUserInfo',
		method: 'post',
		data
	})
}

export const sendRegisterCode = function(data) {
	return request({
		url: '/message/sendRegisterCode',
		method: 'get',
		params: data
	})
}

export const sendLoginCode = function(data) {
	return request({
		url: '/message/sendLoginCode',
		method: 'get',
		params: data
	})
}

export const sendChangePasswordCode = function(data) {
	return request({
		url: '/message/sendChangePasswordCode',
		method: 'get',
		params: data
	})
}


export const changePassword = function(data) {
	return request({
		url: '/app/user/changePassword',
		method: 'post',
		data: data
	})
}

export const byWx = function(data) {
	return request({
		url: '/app/login/byWx',
		method: 'post',
		data: data
	})
}

export const bindWx = function(data) {
	return request({
		url: '/app/user/bindWx',
		method: 'post',
		data: data
	})
}









