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

export const addOrderByCart = function(data) {
	return request({
		url: '/app/orders/addOrderByCart',
		method: 'post',
		data
	})
}

export const addOrder = function(data) {
	return request({
		url: '/app/orders/addOrder',
		method: 'post',
		data
	})
}
