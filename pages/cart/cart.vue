<template>
	<view class="container">
		<BindInfo></BindInfo>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showDelModal" :showCancelButton="true" closeOnClickOverlay content='确认删除该宝贝?' confirmText="删除"
			cancelText="我再想想" confirmColor="#E44273" @confirm="confirmDel" @cancel="showDelModal = false;"
			@close="showDelModal=false"></u-modal>
		<u-modal :show="showDelModal2" :showCancelButton="true" closeOnClickOverlay content='确认清空购物车吗?' confirmText="清空"
			cancelText="我再想想" confirmColor="#E44273" @confirm="clearCart" @cancel="showDelModal2=false"
			@close="showDelModal2=false"></u-modal>
		<!-- 空白页 -->
		<view v-if="empty===true" class="empty">
			<u-empty mode="car" text=" ">
				<view class="empty-tips">
					空空如也
					<navigator class="navigator" url="/pages/index/index" open-type="switchTab">随便逛逛>
					</navigator>
				</view>
			</u-empty>
		</view>
		<view v-else style="padding:10rpx;overflow: auto;">
			<!-- 列表 -->
			<view class="cart-list">
				<template v-for="(item, index) in cartList">
					<view class="cart-item" :key="item.id" :class="{'shixiao':item.product.deleted===1}">
						<view class="shixiaoText" v-if="item.product.deleted===1">
							已失效
						</view>
						<view class="checkbox">
							<u-checkbox-group @change="check('item',index)">
								<u-checkbox shape="circle" activeColor="#E44273" :checked="item.checked">
								</u-checkbox>
							</u-checkbox-group>
						</view>
						<view class="rightContent">
							<view class="image-wrapper">
								<u-image :showLoading="true" :src="JSON.parse(item.product.photoPath)[0].url"
									width="230rpx" height="230rpx" radius="8px"></u-image>
							</view>
							<view class="item-right">
								<text class="title u-line-1" style="display: block;">{{item.product.productName}}</text>
								<!-- <text class="attr">{{item.attr_val}}</text> -->
								<view style="margin: 20rpx 0;">
									<template v-if="item.product.productType==4">
										<u-text prefixIcon="rmb-circle" iconStyle="color:#fa436a;font-size:18px;margin-right:5rpx;" :text="item.pointPrice" color="#fa436a"></u-text>
									</template>
									<template v-else>
										<u-text mode="price" :text="item.price" color="#fa436a"></u-text>
									</template>
								</view>
								<u-number-box class="step" :value="item.quantity" :min="1"
									:max="item.product.inventory===-1?9999:item.product.inventory" integer
									@change="numberChange($event,index)" @overlimit="overlimit"></u-number-box>
							</view>
							<u-icon name="close" :color="item.product.deleted===1?'#ffffff':'#909399'" class="del-btn"
								@click="deleteCartItem(index)">
							</u-icon>
						</view>
					</view>
				</template>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<u-checkbox-group @change="check('all')" size="26" style="z-index: 10;position: relative;">
						<u-checkbox shape="circle" activeColor="#E44273" :checked="allChecked">
						</u-checkbox>
					</u-checkbox-group>
					<view class="clear-btn show" @click="showDelModal2 = true">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="t1">合计:</text>
					<view class="t2">
						<u-text mode="price" :text="total" :block="false" color="#fa436a"></u-text>
						<u-text prefixIcon="rmb-circle" iconStyle="color:#fa436a;font-size:18px;margin-right:5rpx;" :text="totalJf" color="#fa436a"></u-text>
					</view>
				</view>
				<u-button type="default" class="confirm-btn" text="去结算" @click="createOrder"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserCart,
		deleteCart,
		editCart
	} from '@/api/cart.js';
	import BindInfo from '@/components/BindInfo.vue'
	export default {
		data() {
			return {
				showDelModal: false,
				showDelModal2: false,
				currentIndex: '',
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				customBar: this.customBar,
				selectedIdList:[],
				totalJf:0
			};
		},
		components: {
			BindInfo
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		methods: {
			getPageData() {
				getUserCart().then(res => {
					let selectedIdList = [];
					this.cartList.forEach(item=>{
						if(item.checked){
							selectedIdList.push(item.id)
						}
					})
					this.selectedIdList = selectedIdList;
					res.data.forEach(item=>{
						if(this.selectedIdList.includes(item.id)){
							item.checked = true
						}else{
							item.checked = false;
						}
					})
					this.cartList = res.data;
					this.calcTotal(); //计算总价
				})
			},
			goDetail() {
				if (!this.leftIcon) {
					return false;
				}
				let id = uni.getStorageSync('productId');
				uni.redirectTo({
					url: '/pages/productDetail/productDetail?id=' + id
				})
			},
			confirmDel() {
				let id = this.cartList[this.currentIndex].id;
				deleteCart({
					idList: [id]
				}).then(res => {
					this.getPageData();
				}).finally(() => {
					this.showDelModal = false;
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.$set(this.cartList[index], 'checked', !this.cartList[index].checked)
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			overlimit(type) {
				console.log(type)
				if (type === 'minus') {
					this.$refs.uToast.show({
						type: 'default',
						position: "bottom",
						message: "该宝贝不能减少了哟~",
					})
				} else {
					this.$refs.uToast.show({
						type: 'default',
						position: "bottom",
						message: "该宝贝不能增加了哟~",
					})
				}
			},
			//数量
			numberChange(data, index) {
				console.log(this.cartList);
				this.$refs.uToast.show({
					type: 'loading',
					title: '正在加载',
					message: "正在加载",
					duration: 1000
				})
				editCart({
					productId:this.cartList[index].productId,
					id: this.cartList[index].id,
					quantity: data.value
				}).then(res => {
					this.getPageData()
				}).finally(() => {

				})
			},
			//删除弹窗
			deleteCartItem(index) {
				this.showDelModal = true;
				this.currentIndex = index
			},
			//清空
			clearCart() {
				let idList = this.cartList.map(item => item.id);
				deleteCart({
					idList
				}).then(res => {
					this.getPageData();
				}).finally(() => {
					this.showDelModal2 = false;
				})

			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				list.forEach(item => {
					if (item.checked) {
						goodsData.push(item)
					}
				})
				if (!goodsData.length) {
					this.$u.toast('您还没有选择产品')
					return false
				}
				this.$store.commit('updateTempCart',goodsData)
				uni.navigateTo({
					url: '/pages/checkout/checkout'
				})
			}
		},
		onShow() {
			this.getPageData()
		},
		onHide() {
			uni.removeStorageSync('productId')
		},
		onPullDownRefresh() {
			this.getPageData()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 140rpx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			.empty-tips {
				display: flex;
				font-size: 14px;
				color: $u-tips-color;

				.navigator {
					color: $price-color;
					margin-left: 10rpx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		align-items: center;
		position: relative;
		padding: 20rpx;
		margin: 0 0 10rpx;
		background-color: #fff;

		&:last-child {
			margin-bottom: 0;
		}

		.rightContent {
			display: flex;
			flex: 1;
		}

		.image-wrapper {
			width: 230rpx;
			height: 230rpx;
			flex-shrink: 0;
			position: relative;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			width: 0;
			overflow: hidden;
			position: relative;
			padding-left: 30rpx;

			.title,
			.price {
				font-size: 14px;
				line-height: 40rpx;
			}

			.attr {
				height: 50rpx;
				line-height: 50rpx;
				font-size: 12px;
				color: $u-tips-color;
			}

			.price {
				height: 50rpx;
				line-height: 50rpx;
				color: $price-color;
			}

			.originPrice {
				margin-left: 10rpx;
				text-decoration: line-through;
				color: $u-light-color;
			}
		}

		.del-btn {
			padding: 4rpx 10rpx;
			font-size: 34rpx;
			height: 50rpx;
			z-index: 1;
			color: #fff;
		}

		&.shixiao {
			position: relative;

			&::after {
				content: '';
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				background-color: rgba(0, 0, 0, .4);
			}
		}

		.shixiaoText {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			white-space: nowrap;
			z-index: 10;
			color: #fff;
		}
	}

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100rpx;
		/* #endif */
		position: fixed;
		left: 50%;
		bottom: 20rpx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 700rpx;
		height: 100rpx;
		transform: translateX(-50%);
		padding: 0 30rpx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, .5);
		border-radius: 16rpx;

		.checkbox {
			height: 52rpx;
			position: relative;

			/* #ifdef MP-WEIXIN */
			.u-checkbox-group {
				position: relative;
				z-index: 100;
			}

			/* #endif */
		}

		.clear-btn {
			position: absolute;
			left: 26rpx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 26px;
			line-height: 26px;
			padding-left: 38rpx;
			color: #fff;
			background: $u-disabled-color;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120rpx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			text-align: right;
			padding-right: 40rpx;
			
			.t1{
				margin-right: 20rpx;
			}
			.t2{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}
			
			.price {
				color: $price-color;
				font-weight: bold;
			}

			.coupon {
				color: $price-color;
			}
		}

		/* #ifndef MP */
		.confirm-btn {
			width: auto;
			border: none;
			padding: 0 38rpx;
			margin: 0;
			border-radius: 100px;
			height: 76rpx;
			line-height: 76rpx;
			background-color: $price-color;
			color: #fff;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}

		/* #endif */

		/* #ifdef MP-WEIXIN */
		button {
			width: auto !important;
			border: none;
			padding: 0 38rpx !important;
			margin: 0;
			border-radius: 100px !important;
			height: 76rpx;
			line-height: 76rpx;
			background-color: $price-color;
			color: #fff;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}

		/* #endif */
	}
</style>
