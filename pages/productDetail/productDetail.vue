<template>
	<view class="container">
		<view class="carousel-section">
			<u-swiper :list="imgList" keyName="url" :autoplay="false" indicator indicatorMode="dot" height="750rpx"
				radius="0"></u-swiper>
		</view>
		<view class="content">
			<view class="part introduce-section">
				<text class="title">{{productDetailInfo.productName}}</text>
				<view class="price-box">
					<PriceText :productItem="productDetailInfo"></PriceText>
					<!-- <text class="m-price">¥{{productDetailInfo.price}}</text> -->
				</view>
				<view class="bot-row">
					<text>销量: {{productDetailInfo.salesVolume}}</text>
					<text>库存: {{productDetailInfo.inventory === -1?'无限制':productDetailInfo.inventory}}</text>
					<text>浏览量: {{productDetailInfo.viewVolume}}</text>
				</view>
			</view>

			<view class="part c-list">
				<view class="c-row">
					<text class="tit">发货</text>
					<view class="con">
						<text>快递:</text>
						<text v-if="productDetailInfo.postagePrice">￥{{productDetailInfo.postagePrice}}</text>
						<text v-else>免运费</text>
					</view>
				</view>
			</view>

			<!-- 评价 -->
			<view class="eva-section" v-if="productDetailInfo&&productDetailInfo.commentList.length">
				<view class="e-header">
					<text class="tit">评价</text>
					<text>({{productDetailInfo.commentList.length}})</text>
					<text class="tip">查看全部</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<template v-for="(item,index) in productDetailInfo.commentList">
					<view class="eva-box" :key="index" v-if="index<=3">
						<Avatar :src="item.user.headImg" size="40"></Avatar>
						<view class="right">
							<text class="name">{{item.user.nickName}}</text>
							<text class="con">{{item.comments}}</text>
							<view class="bot">
								<text class="time">{{item.createTime}}</text>
							</view>
						</view>
					</view>
				</template>
			</view>

			<view class="detail-desc">
				<view class="d-header">
					<text>图文详情</text>
				</view>
				<view class="d-content">
					<u-parse :content="productDetailInfo.descriptions"></u-parse>
				</view>
			</view>

			<!-- 组合按钮 -->
			<view class="buttonGroup">
				<view class="b1" @click="goHome">
					<u-icon name="home" size="24"></u-icon>
					首页
				</view>
				<view class="b1" @click="goCart">
					<u-icon name="shopping-cart" size="24"></u-icon>
					购物车
				</view>
				<view class="action-btn">
					<u-button class="btn1" type="primary" :customStyle="{backgroundColor: '#FFBC49',
					border: 'none',
					borderRadius:'0',
					borderTopLeftRadius: '20px',
					borderBottomLeftRadius: '20px'}" text="加入购物车" @click="addToCartBefore(1)"></u-button>
					<u-button class="btn2" type="primary" :customStyle="{backgroundColor: '#FE696D',
					border: 'none',
					borderRadius:'0',
					borderTopRightRadius: '20px',
					borderBottomRightRadius: '20px'}" text="立即购买" @click="addToCartBefore(2)"></u-button>
				</view>
			</view>
		</view>
		<u-popup :show="show" mode="bottom" closeable @close="close">
			<view class="popupCon">
				<view class="title">
					<u-image :showLoading="true"
						:src="imgList[0].url"
						width="150rpx" height="150rpx" radius="4px">
					</u-image>
					<PriceText :productItem="productDetailInfo" :quantity="quantity"></PriceText>
				</view>
				<view class="con">
					<u-gap height="1" bgColor="#eee"></u-gap>
					<view class="param-item">
						<view class="label">
							<text style="font-size: 16px;">购买数量</text>
							<text style="color:#909193;margin-left: 10rpx;">{{productDetailInfo.inventory!=0?'有货':'无货'}}</text>
						</view>
						<view class="num">
							<u-number-box v-model="quantity" integer :min="1"
								:max="productDetailInfo.inventory===-1?9999:productDetailInfo.inventory">
							</u-number-box>
						</view>
					</view>
				</view>
				<view class="btn-bottom">
					<u-button type="primary" text="确定" :disabled="productDetailInfo.inventory==0"
						color="linear-gradient(to right, rgb(255, 85, 0), rgb(240, 76, 0))" @click="addToCart">
					</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import Avatar from '@/components/Avatar.vue'
	import PriceText from '@/components/PriceText.vue'
	import {
		getProductInfo
	} from '@/api/product.js'
	import {
		addCart
	} from '@/api/cart.js'
	export default {
		data() {
			return {
				show: false,
				quantity: 1,
				productDetailInfo: '',
				productId: 1,
				imgList: [{
					url:''
				}],
				desc: '',
				btnType:''
			};
		},
		components:{
			PriceText,
			Avatar
		},
		onLoad(options) {
			this.productId = options.id;
			this.getPageData()
		},
		methods: {
			getPageData() {
				//获取产品详情
				getProductInfo({
					id: this.productId
				}).then(res => {
					this.productDetailInfo = res.data;
					this.imgList = JSON.parse(res.data.photoPath)
				})
			},
			goHome() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goCart() {
				uni.setStorageSync('productId', this.productId)
				uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			addToCartBefore(type) {
				this.btnType = type;
				this.show = true;
			},
			addToCart() {
				if(this.btnType===1){
					addCart({
						quantity: this.quantity,
						productId: this.productDetailInfo.id
					}).then(res => {
						this.$u.toast('购物车添加成功!');
						this.show = false;
					})
				}else{
					this.$store.commit('updateTempCart',[Object.assign(this.productDetailInfo,{
						quantity: this.quantity
					})])
					uni.navigateTo({
						url: '/pages/checkout/checkout'
					})
				}
			},
			close() {
				this.show = false
			}
		},
		// #ifndef MP
		onNavigationBarSearchInputClicked: async function(e) {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 160rpx;

		.content {
			padding: 20rpx 10rpx;

			.part {
				background-color: #fff;
				border-radius: 8px;
				padding: 20rpx;
				margin-bottom: 20rpx;
			}

			/* 标题简介 */
			.introduce-section {
				position: relative;

				.title {
					font-size: 32rpx;
					height: 50rpx;
					line-height: 50rpx;
				}

				.price-box {
					display: flex;
					align-items: baseline;
					height: 64rpx;
					padding: 10rpx 0;
					color: $price-color;
				}

				.price {
					font-size: 16px;
				}

				.m-price {
					margin: 0 12rpx;
					text-decoration: line-through;
					font-size: 14px;
					color: $u-tips-color;
				}

				.bot-row {
					display: flex;
					align-items: center;
					height: 50rpx;
					color: $u-tips-color;
					font-size: 12px;

					text {
						flex: 1;
					}
				}
			}

			.c-list {
				padding: 0;

				.c-row {
					display: flex;
					align-items: center;
					position: relative;
					padding: 10px;
					border-bottom: .5px solid #E4E7ED;

					&:last-child {
						border-bottom: none;
					}
				}

				.tit {
					width: 140rpx;
					color: $u-tips-color;
				}

				.fh {
					.top {
						display: flex;
						align-items: center;
						justify-content: space-between;

						.left {
							display: flex;
							align-items: center;
						}

						.right {
							color: $u-tips-color;
						}
					}

					.bm {
						font-size: 12px;
					}
				}

				.con {
					flex: 1;

					.selected-text {
						margin-right: 10rpx;
					}
				}

				.bz-list {
					text {
						display: inline-block;
						margin-right: 10rpx;
					}
				}
			}

			/* 评价 */
			.eva-section {
				display: flex;
				flex-direction: column;
				padding: 20rpx 30rpx;
				background: #fff;
				margin-top: 16rpx;

				.e-header {
					display: flex;
					align-items: center;
					height: 70rpx;
					color: $u-tips-color;

					.tit {
						margin-right: 4rpx;
						color: $u-main-color;
					}

					.tip {
						flex: 1;
						text-align: right;
					}
				}
			}

			.eva-box {
				display: flex;
				padding: 20rpx 0;

				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					padding-left: 26rpx;
					color: $u-tips-color;

					.con {
						padding: 20rpx 0;
						color: $u-main-color;
					}

					.bot {
						display: flex;
						justify-content: space-between;
						font-size: 12px;
					}
				}
			}
		}

		/*  详情 */
		.detail-desc {
			background: #fff;
			margin-top: 16rpx;

			.d-header {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 80rpx;
				position: relative;

				text {
					padding: 0 20rpx;
					background: #fff;
					position: relative;
					z-index: 1;
				}

				&:after {
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translateX(-50%);
					width: 300rpx;
					height: 0;
					content: '';
					border-bottom: 1px solid #ccc;
				}
			}
			
			.d-content{
				padding: 20rpx;
			}
		}

		.carousel-section {}

		.buttonGroup {
			position: fixed;
			left: 20px;
			right: 20px;
			bottom: 15px;
			height: 52px;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(255, 255, 255, 0.9);
			box-shadow: 0 0 10px 0 rgba(0, 0, 0, .35);
			border-radius: 8px;
			padding: 0 10rpx;
			z-index: 100;

			.b1 {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				margin: 0 15rpx;
			}

			.action-btn {
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 20rpx;
			}
		}

		.popupCon {
			display: flex;
			flex-direction: column;
			position: relative;
			height: 1000rpx;
			padding: 0 20rpx;

			.title {
				display: flex;
				padding: 20rpx 0;

				text {
					color: $price-color;
					margin-left: 20rpx;
					font-size: 16px;
				}
			}

			.con {
				overflow: auto;
				flex: 1;
				height: 0;
			}

			.btn-bottom {
				padding: 20rpx 0;
			}

			.param-item {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
			}
		}
	}
</style>
