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


//获取基本信息
export const appInfo = function(data) {
	return request({
		url: '/v1/login/appInfo',
		method: 'get',
		params:data
	})
}

//忘记密码
export const updatePassword = function(data,headers) {
	return request({
		url: '/v1/login/updatePassword',
		method: 'post',
		headers,
		data
	})
}

//获取商品列表
export const goodlist = function(data) {
	return request({
		url: '/v1/index/goodlist',
		method: 'post',
		data
	})
}

//获取商品详情
export const goodinfo = function(data) {
	return request({
		url: '/v1/index/goodinfo',
		method: 'post',
		data
	})
}

//身份证验证
export const checkId = function(data) {
	return request({
		url: '/api/user/checkId',
		method: 'post',
		data
	})
}

//获取用户地址
export const getUserAddress = function(data) {
	return request({
		url: '/v1/user/getUserAddress',
		method: 'get',
		params:data
	})
}

//更新或者创建收获地址
export const createOrUpdateAddress = function(data) {
	return request({
		url: '/v1/user/createOrUpdateAddress',
		method: 'post',
		data
	})
}

//余额变更记录
export const myBalanceLog = function(data) {
	return request({
		url: '/v1/user/myBalanceLog',
		method: 'get',
		params:data
	})
}


//积分记录
export const myCpLog = function(data) {
	return request({
		url: '/v1/user/myCpLog',
		method: 'get',
		params:data
	})
}

//修改交易密码
export const payPwd = function(data) {
	return request({
		url: '/api/user/register',
		method: 'post',
		data
	})
}

//生成订单
export const placeOrder = function(data) {
	return request({
		url: '/v1/Order/placeOrder',
		method: 'post',
		data
	})
}

//拉起支付
export const getPreOrder = function(data) {
	return request({
		url: '/v1/Order/getPreOrder',
		method: 'post',
		data
	})
}

//转账
export const balanceTransaction = function(data) {
	return request({
		url: '/v1/Order/balanceTransaction',
		method: 'post',
		data
	})
}

//订单列表
export const orderlist = function(data) {
	return request({
		url: '/v1/order/orderlist',
		method: 'post',
		data
	})
}


