<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<u-icon class="back-btn" name="arrow-leftward" size="40rpx" color="#333" bold @click="navBack"></u-icon>
		<view class="right-top-sign"></view>
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎回来！
			</view>
			<view class="input-content">

			</view>
			<button class="confirm-btn" @click="toLogin" :disabled="logining">登录</button>
			<view class="forget-section">
				忘记密码?
			</view>
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				mobile: '',
				password: '',
				logining: false
			}
		},
		onLoad() {

		},
		methods: {
			...mapMutations(['login']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				this.$api.msg('去注册');
			},
			async toLogin() {
				this.logining = true;
				const {
					mobile,
					password
				} = this;
				/* 数据验证模块
				if(!this.$api.match({
					mobile,
					password
				})){
					this.logining = false;
					return;
				}
				*/
				const sendData = {
					mobile,
					password
				};
				const result = await this.$api.json('userInfo');
				if (result.status === 1) {
					this.login(result.data);
					uni.navigateBack();
				} else {
					this.$api.msg(result.msg);
					this.logining = false;
				}
			}
		},

	}
</script>

<style lang='scss'>
	page {
		height: 100%;
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #fff;
		box-sizing: border-box;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40rpx;
	}

	.back-btn {
		position: absolute;
		left: 40rpx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40rpx;
	}

	.left-top-sign {
		font-size: 60px;
		color: #f8f8f8;
		position: relative;
		left: -16rpx;
	}

	.right-top-sign {
		position: absolute;
		top: 80rpx;
		right: -30rpx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400rpx;
			height: 80rpx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198rpx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270rpx;
		bottom: -320rpx;
		border: 100rpx solid #d0d1fd;
		border-radius: 50%;
		padding: 180rpx;
	}

	.welcome {
		position: relative;
		left: 50rpx;
		top: -90rpx;
		font-size: 46rpx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60rpx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30rpx;
		height: 120rpx;
		border-radius: 4px;
		margin-bottom: 50rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50rpx;
			line-height: 56rpx;
		}

		input {
			height: 60rpx;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630rpx;
		height: 76rpx;
		line-height: 76rpx;
		border-radius: 50px;
		margin-top: 70rpx;
		color: #fff;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		text-align: center;
		margin-top: 40rpx;
		color: $u-primary;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50rpx;
		width: 100%;
		text-align: center;
		font-size:12px;
		color:$u-tips-color;
		text {
			margin-left: 10rpx;
			color: $u-primary;
		}
	}
</style>
