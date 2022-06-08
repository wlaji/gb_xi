import request from '@/utils/request';

//获取转账人列表
export const getUserDirectRelation = function(data) {
	return request({
		url: '/app/user/getUserDirectRelation',
		method: 'post',
		data
	})
}

//转账
export const turnFunds = function(data) {
	return request({
		url: '/app/user/turnFunds',
		method: 'post',
		data
	})
}

export const getMyFundsLog = function(data) {
	return request({
		url: '/app/fundslog/getMyFundsLog',
		method: 'post',
		data
	})
}

//提现
export const fundsOut = function(data) {
  return request({
    url: '/app/pay/fundsOut',
    method: 'post',
	data
  })
}
