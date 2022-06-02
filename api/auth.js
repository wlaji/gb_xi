import request from '@/utils/request';

//绑定手机号
export const bindLoginTel = function(data) {
	return request({
		url: '/app/user/bindLoginTel',
		method: 'post',
		data: data
	})
}


//绑定身份证
export const bindIdCard = function(data) {
	return request({
		url: '/app/user/bindIdCard',
		method: 'post',
		data: data
	})
}


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

//获取用户地址列表
export const getUserAddressList = function(data) {
	return request({
		url: '/app/address/getUserAddressList',
		method: 'post',
		data: data
	})
}

//编辑用户地址
export const editUserAddressList = function(data) {
	return request({
		url: '/app/address/editUserAddressList',
		method: 'post',
		data: data
	})
}

//删除用户地址
export const deleteUserAddressList = function(data) {
	return request({
		url: '/app/address/deleteUserAddressList',
		method: 'post',
		data: data
	})
}

//获取地址详情
export const getUserAddressById = function(data) {
	return request({
		url: '/app/address/getUserAddressById',
		method: 'post',
		data: data
	})
}

//获取省
export const getProvinceList = function(data) {
	return request({
		url: '/app/config/getProvinceList',
		method: 'post',
		data: data
	})
}

//获取市
export const getProvinceCityList = function(data) {
	return request({
		url: '/app/config/getProvinceCityList',
		method: 'post',
		data: data
	})
}

//获取区
export const getProvinceCityAreaList = function(data) {
	return request({
		url: '/app/config/getProvinceCityAreaList',
		method: 'post',
		data: data
	})
}

//编辑用户信息
export const editMember = function(data) {
	return request({
		url: '/app/user/editMember',
		method: 'post',
		data: data
	})
}
