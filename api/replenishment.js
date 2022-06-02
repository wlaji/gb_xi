import request from '@/utils/request';

//获取补货单列表
export const getReplenishmentList = function(data) {
  return request({
    url: '/app/replenishment/getReplenishmentList',
    method: 'post',
	data
  })
}

//提交补货单
export const addReplenishment = function(data) {
  return request({
    url: '/app/replenishment/addReplenishment',
    method: 'post',
	data
  })
}

//重新提交补货单列表
export const editReplenishment = function(data) {
  return request({
    url: '/app/replenishment/editReplenishment',
    method: 'post',
	data
  })
}

//获取库存
export const getInventoryList = function(data) {
  return request({
    url: '/app/inventory/getInventoryList',
    method: 'post',
	data
  })
}





