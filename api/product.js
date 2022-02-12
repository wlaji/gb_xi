import request from '@/utils/request';

export const getAllProductCate = function(data) {
  return request({
    url: '/app/product/getAllProductCate',
    method: 'post',
	data
  })
}

export const getProductList = function(data) {
  return request({
    url: '/app/product/getProductList',
    method: 'post',
	data
  })
}

export const getProductInfo = function(data) {
  return request({
    url: '/app/product/getProductInfo',
    method: 'post',
	data
  })
}

