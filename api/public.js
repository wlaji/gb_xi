import request from '@/utils/request';

export const getAdvertising = function(data) {
	return request({
		url: '/app/config/getAdvertising',
		method: 'post',
		data: data
	})
}
