import request from '@/utils/request';

//支付宝支付
export const alipaySign = function(data) {
  return request({
    url: '/app/payment/alipaySign',
    method: 'post',
	data
  })
}

export const wxorderTest = function(data) {
  return request({
    url: '/app/pay/wxorderTest',
    method: 'post',
	data
  })
}

export const payment = function(data) {
  return request({
    url: '/app/pay/payment',
    method: 'post',
	data
  })
}

export const calculation = function(data) {
  return request({
    url: '/app/pay/calculation',
    method: 'post',
	data
  })
}

export const fundsOut = function(data) {
  return request({
    url: '/app/pay/fundsOut',
    method: 'post',
	data
  })
}

