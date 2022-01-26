<template>
	<view class="container">
		<u-modal :show="showDelModal" :showCancelButton="true" closeOnClickOverlay content='确认删除该地址吗?'
			confirmText="删除" cancelText="取消" confirmColor="#E44273" @confirm="confirmDel"
			@cancel="showDelModal = false;" @close="showDelModal=false"></u-modal>
		<view>
			<template v-if="addressList.length">
				<view class="address-item">
					<view class="title">
						<text class="name">肖伟成</text>
						<text class="phone">15773003996</text>
						<text class="tag">默认</text>
					</view>
					<view class="address-con u-border-bottom">
						<text class="detail">
							湖南省 岳阳市 岳阳楼区 五里牌街道中建五局二公司 五里牌街道中建五局二公司
						</text>
						<u-icon name="edit-pen" size="28" color="#999" @click="toEdit"></u-icon>
					</view>
					<view class="btm">
						<view>
							<u-checkbox-group>
								<u-checkbox label="默认地址" shape="circle" labelSize="14" @change="changeStatus"></u-checkbox>
							</u-checkbox-group>
						</view>
						<text @click="showDelModal= true">删除</text>
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
	export default {
		data() {
			return {
				activeIndex:0,
				showDelModal:false,
				addressList:[]
			};
		},
		methods:{
			changeStatus(){
				
			},
			confirmDel(){
				
			},
			toPlusAddress(){
				uni.navigateTo({
					url:'/pages/set/editAddress/editAddress?type='+'add'
				})
			},
			toEdit(){
				uni.navigateTo({
					url:'/pages/set/editAddress/editAddress?type='+'edit'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding:20rpx 20rpx 130rpx;
	}
	.address-item{
		position: relative;
		padding:20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
		border-radius: 8px;
		.title{
			margin-bottom: 10rpx;
			line-height: 30px;
			.name{
				font-weight: 700;
			}
			.phone{
				color:$u-tips-color;
				margin-left: 10rpx;
			}
			.tag{
				border:1px solid $price-color;
				color:$price-color;
				padding:5rpx;
				border-radius: 4px;
				font-size: 12px;
				margin-left: 10rpx;
			}
		}
		.address-con{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;
			.detail{
				margin-right: 10rpx;
			}
		}
		.btm{
			display: flex;
			justify-content: space-between;
			height:30px;
			align-items: center;
		}
		
	}
	.add-address-btn{
		display: flex;
		align-items: center;
		position: fixed;
		bottom:0;
		left:0;
		right:0;
		padding:0 20rpx;
		background-color: #fff;
		height:140rpx;
	}

</style>
