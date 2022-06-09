<template>
	<view class="container">
		<template v-if="loadStatus">
			<u-loading-page :loading="loadStatus"></u-loading-page>
		</template>
		<template v-else>
			<template v-if="!wlData">
				<u-empty mode="data" text="没有查询到物流信息"></u-empty>
			</template>
			<template v-else>
				<view class="topBar">
					<view class="left">
						<u-image :src="wlData.logo" width="30px" height="30px" radius="50%"></u-image>
						<text style="margin-left: 10rpx;">{{wlData.expTextName}}</text>
						<text style="margin-left: 10rpx;">{{wlData.mailNo}}</text>
					</view>
					<view class="right">
						<text style="color:#666" @click="copy(wlData.mailNo)">复制</text>
					</view>
				</view>
				<u-steps current="0" direction="column">
					<u-steps-item :title="item.context" :desc="item.time" v-for="item in wlData.data"></u-steps-item>
				</u-steps>
			</template>
		</template>
	</view>
</template>

<script>
	import {
		getExpressData
	} from '@/api/public.js'
	export default {
		data() {
			return {
				expressNum: '',
				phone: '',
				wlData: '',
				loadStatus:true,
			};
		},
		methods: {
			getData() {
				getExpressData({
					expressNum: this.expressNum,
					phone: this.phone
				}).then(res => {
					this.wlData = res.data;
				}).finally(()=>{
					this.loadStatus = false;
				})
			},
			copy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.$u.toast('复制成功');
					},
					fail(err) {
						console.log(err)
					}
				});
			}
		},
		onLoad(options) {
			this.expressNum = options.expressNum
			this.phone = options.phone;
			this.$nextTick(() => {
				this.getData()
			})
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20rpx;
		background-color: #ffffff;
		border-radius: 10px;

		.topBar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			background-color: #fff;

			.left {
				display: flex;
				align-items: center;
			}
		}
	}
</style>
