import request from '@/utils/request';

//注册
export const register = function(data) {
	return request({
		url: '/app/user/register',
		method: 'post',
		data
	})
}


export const checkForUpdates = function(data) {
	return request({
		url: '/app/checkForUpdates',
		method: 'post',
		data
	})
}