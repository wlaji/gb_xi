import request from '@/utils/request';

export const addCart = function(data) {
  return request({
    url: '/app/cart/addCart',
    method: 'post',
	data
  })
}

export const getUserCart = function(data) {
  return request({
    url: '/app/cart/getUserCart',
    method: 'post',
	data
  })
}

export const deleteCart = function(data) {
  return request({
    url: '/app/cart/deleteCart',
    method: 'post',
	data
  })
}

export const editCart = function(data) {
  return request({
    url: '/app/cart/editCart',
    method: 'post',
	data
  })
}

//立即下单数据组装
export const getByNowInfo = function(data) {
	return request({
		url: '/app/product/getByNowInfo',
		method: 'post',
		data
	})
}






