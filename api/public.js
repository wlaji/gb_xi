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

