import request from '@/utils/request';

export const userGetOrderList = function(data) {
	return request({
		url: '/app/orders/userGetOrderList',
		method: 'post',
		data
	})
}

export const getOrderInfo = function(data) {
	return request({
		url: '/app/orders/getOrderInfo',
		method: 'post',
		data
	})
}

export const editOrderPayment = function(data) {
	return request({
		url: '/app/orders/editOrderPayment',
		method: 'post',
		data
	})
}

//购物车下单
export const addOrderByCart = function(data) {
	return request({
		url: '/app/orders/addOrderByCart',
		method: 'post',
		data
	})
}

//直接下单
export const addOrder = function(data) {
	return request({
		url: '/app/orders/addOrder',
		method: 'post',
		data
	})
}

//支付
export const payment = function(data) {
	return request({
		url: '/app/pay/payment',
		method: 'post',
		data
	})
}