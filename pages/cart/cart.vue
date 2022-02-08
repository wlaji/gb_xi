<template>
	<view class="container" :style="{paddingTop:customBar+'px'}">
		<u-navbar title="购物车" fixed :leftIcon="leftIcon" @leftClick="goDetail"></u-navbar>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showDelModal" :showCancelButton="true" closeOnClickOverlay content='确认删除该宝贝?'
			confirmText="删除" cancelText="我再想想" confirmColor="#E44273" @confirm="confirmDel"
			@cancel="showDelModal = false;" @close="showDelModal=false"></u-modal>
		<u-modal :show="showDelModal2" :showCancelButton="true" closeOnClickOverlay content='确认清空购物车吗?'
			confirmText="清空" cancelText="我再想想" confirmColor="#E44273" @confirm="clearCart" @cancel="showDelModal2=false"
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
					<view class="cart-item" :key="item.id">
						<view class="checkbox">
							<u-checkbox-group @change="check('item',index)">
								<u-checkbox shape="circle" activeColor="#E44273" :checked="item.checked">
								</u-checkbox>
							</u-checkbox-group>
						</view>
						<view class="rightContent">
							<view class="image-wrapper">
								<u-image :showLoading="true" :src="item.image" width="230rpx" height="230rpx"
									radius="8px"></u-image>
							</view>
							<view class="item-right">
								<text class="title u-line-1" style="display: block;">{{item.title}}</text>
								<text class="attr">{{item.attr_val}}</text>
								<view>
									<text class="price">￥{{item.price}}</text>
									<text class="originPrice">￥{{item.price}}</text>
								</view>
								<u-number-box class="step" :value="item.number>item.stock?item.stock:item.number"
									:disableMinus="item.number<=1" :disablePlus="item.number>=item.stock" :min="1"
									:max="item.stock" integer @change="numberChange($event,index)"
									@overlimit="overlimit"></u-number-box>
							</view>
							<u-icon name="close" color="#909399" class="del-btn" @click="deleteCartItem(index)">
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
					<view class="clear-btn" :class="{show: allChecked}" @click="showDelModal2 = true">
						清空
					</view>
				</view>
				<view class="total-box">
					<view>
						合计:<text class="price">¥{{total}}</text>
					</view>
					<text class="coupon">
						共减<text>￥74.35</text> 元
					</text>
				</view>
				<u-button type="default" class="confirm-btn" text="去结算" @click="createOrder"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
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
				customBar:this.customBar,
				leftIcon:''
			};
		},
		onLoad(options) {
			console.log(options)
			this.loadData();
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
		computed: {
			...mapGetters(['isLogin'])
		},
		methods: {
			goDetail(){
				let id = uni.getStorageSync('productId');
				uni.navigateTo({
					url:'/pages/productDetail/productDetail?id='+id
				})
			},
			confirmDel() {
				let index = this.currentIndex;
				let list = this.cartList;
				let row = list[index];
				let id = row.id;
				this.cartList.splice(index, 1);
				this.calcTotal();
				this.showDelModal = false;
			},
			//请求数据
			loadData() {
				let cartList = this.$json.cartList;
				cartList.forEach(item => {
					item.checked = true
				})
				this.cartList = cartList
				this.calcTotal(); //计算总价
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
				console.log(data)
				this.cartList[index].number = data.value;
				this.calcTotal();
			},
			//删除弹窗
			deleteCartItem(index) {
				this.showDelModal = true;
				this.currentIndex = index
			},
			//清空
			clearCart() {
				this.cartList = [];
				this.showDelModal2 = false;
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
						total += item.price * item.number;
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
						goodsData.push({
							attr_val: item.attr_val,
							number: item.number
						})
					}
				})
				uni.navigateTo({
					url:'/pages/orderSettlement/orderSettlement'
				})
			}
		},
		onShow() {
			if(uni.getStorageSync('productId')){
				this.leftIcon = 'arrow-left'
			}else{
				this.leftIcon = ''
			}
		},
		onHide(){
			uni.removeStorageSync('productId')
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
			flex-direction: column;
			text-align: right;
			padding-right: 40rpx;

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
