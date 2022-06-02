<template>
	<view class="container">
		<u-modal :show="showDelModal" :showCancelButton="true" closeOnClickOverlay content='确认删除该地址吗?' confirmText="删除"
			cancelText="取消" confirmColor="#E44273" @confirm="confirmDel" @cancel="showDelModal = false;"
			@close="showDelModal=false"></u-modal>
		<view>
			<template v-if="addressList.length">
				<view class="address-item" v-for="item in addressList" :key="item.id">
					<view class="title">
						<text class="name">{{item.name}}</text>
						<text class="phone">{{item.phone}}</text>
						<text class="tag" v-if="item.isDefault">默认</text>
					</view>
					<view class="address-con u-border-bottom">
						<text class="detail">
							{{item.province}} {{item.city}} {{item.area}} {{item.detailedAddress}}
						</text>
						<u-icon name="edit-pen" size="28" color="#999" @click="toEdit(item.id)"></u-icon>
					</view>
					<view class="btm">
						<view>
							<u-checkbox-group>
								<u-checkbox label="默认地址" shape="circle" labelSize="14" :checked="item.isDefault===1"
									@change="changeStatus($event,item)"></u-checkbox>
							</u-checkbox-group>
						</view>
						<text @click="deleteDizhi(item)">删除</text>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="no-result">
					<u-empty mode="address"></u-empty>
				</view>
			</template>
		</view>
		<view class="add-address-btn">
			<u-button type="primary" text="新增收货地址" icon="plus" @click="toPlusAddress"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		getUserAddressList,
		deleteUserAddressList,
		editUserAddressList
	} from '@/api/auth.js'
	export default {
		data() {
			return {
				activeIndex: 0,
				showDelModal: false,
				addressList: [],
				delId: '',
			};
		},
		methods: {
			deleteDizhi(item) {
				this.showDelModal = true;
				this.delId = item.id
			},
			changeStatus(val, item) {
				val ? item.isDefault = 1 : item.isDefault = 0;
				editUserAddressList(item).then(res => {
					this.getList();
				})
			},
			confirmDel() {
				deleteUserAddressList({
					id: this.delId
				}).then(res => {
					this.getList();
				}).finally(() => {
					this.showDelModal = false;
				})
			},
			toPlusAddress() {
				uni.navigateTo({
					url: '/pages/set/editAddress/editAddress?type=' + 'add'
				})
			},
			toEdit(id) {
				uni.navigateTo({
					url: `/pages/set/editAddress/editAddress?type=edit&id=${id}`
				})
			},
			getList() {
				getUserAddressList().then(res => {
					console.log(res.data);
					this.addressList = res.data;
				})
			}
		},
		onShow() {
			this.getList();
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx 20rpx 130rpx;
	}

	.address-item {
		position: relative;
		padding: 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 8px;

		.title {
			margin-bottom: 10rpx;
			line-height: 30px;

			.name {
				font-weight: 700;
			}

			.phone {
				color: $u-tips-color;
				margin-left: 10rpx;
			}

			.tag {
				border: 1px solid $price-color;
				color: $price-color;
				padding: 5rpx;
				border-radius: 4px;
				font-size: 12px;
				margin-left: 10rpx;
			}
		}

		.address-con {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;

			.detail {
				margin-right: 10rpx;
			}
		}

		.btm {
			display: flex;
			justify-content: space-between;
			height: 30px;
			align-items: center;
		}

	}

	.add-address-btn {
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 0 20rpx;
		background-color: #fff;
		height: 140rpx;
	}
</style>
