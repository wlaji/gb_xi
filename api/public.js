import request from '@/utils/request';

export const getAdvertising = function(data) {
	return request({
		url: '/app/config/getAdvertising',
		method: 'post',
		data: data
	})
}


export const getArticle = function(data) {
	return request({
		url: '/app/config/getArticle',
		method: 'post',
		data: data
	})
}

export const getArticleInfo = function(data) {
	return request({
		url: '/app/config/getArticleInfo',
		method: 'post',
		data: data
	})
}

export const getRecommend = function(data) {
	return request({
		url: '/app/product/getRecommend',
		method: 'post',
		data: data
	})
}

//获取我的团队
export const getMyTeam = function(data) {
	return request({
		url: '/app/user/getMyTeam',
		method: 'post',
		data: data
	})
}

//获取我的业绩
export const getMyPerformance = function(data) {
	return request({
		url: '/app/fundslog/getMyPerformance',
		method: 'get',
		params: data
	})
}

//加盟
export const addJoinCheck = function(data) {
	return request({
		url: '/app/join/addJoinCheck',
		method: 'post',
		data: data
	})
}

//获取附近提货点
export const getJoinByAreaId = function(data) {
	return request({
		url: '/app/join/getJoinByAreaId',
		method: 'get',
		params: data
	})
}

//获取邮费配置
export const getConfigValue = function(data) {
	return request({
		url: '/app/config/getConfigValue',
		method: 'post',
		data: data
	})
}

//获取物流信息
export const getExpressData = function(data) {
	return request({
		url: '/app/orders/getExpressData',
		method: 'get',
		params: data
	})
}

