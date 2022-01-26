<template>
	<view>
		<u-popup :show="showModal" :round="4" mode="center">
			<view class="popupContent">
				<view class="title">
					<text>发现新版本!</text>
				</view>
				<view class="body">
					<rich-text :nodes="appUpdateInfo?appUpdateInfo.description:defaultText"></rich-text>
				</view>
				<view class="footer">
					<view>
						<text @click="confirmUpdate(1)">后台下载</text>
					</view>
					<view class="right">
						<text @click="close">取消</text>
						<text @click="confirmUpdate(2)">更新</text>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showModal2" :round="4" mode="center">
			<view class="popupContent2">
				<view class="title">
					<text>正在下载</text>
				</view>
				<view class="body">
					<u-line-progress :percentage="percentage"></u-line-progress>
				</view>
				<view class="footer">
					<text @click="closeDownload">取消</text>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	const appstoreUrl = 'https://apps.apple.com/us/app/%E9%93%91%E6%96%AF%E5%A4%AB/id1586953224';
	export default {
		name: "updateDialog",
		props: {
			showModal: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				defaultText: '<p>发现了新版本!</p><p>需要更新吗</p>',
				percentage: 0,
				showModal2: false,
			};
		},
		computed: {
			appUpdateInfo() {
				return this.$store.state.appUpdateInfo
			}
		},
		methods: {
			closeDownload() {
				this.downloadTask.abort();
				this.showModal2 = false;
				this.percentage = 0;
			},
			close() {
				this.$emit('update:showModal', false)
			},
			confirmUpdate(type) {
				const {
					platform
				} = uni.$u.sys();
				console.log(platform);
				this.$emit('update:showModal', false);
				if (platform === 'android') {
					if (type === 1) {
						uni.downloadFile({
							url: 'https://rhskieapi.oss-cn-hangzhou.aliyuncs.com/apk/lsf.apk', //仅为示例，并非真实的资源
							success: res => {
								if (res.statusCode === 200) {
									console.log('下载完成')
								}
							},
							fail: err => {
								uni.$u.toast('下载失败');
							}
						});
					} else {
						this.showModal2 = true;
						this.downloadTask = uni.downloadFile({
							url: 'https://rhskieapi.oss-cn-hangzhou.aliyuncs.com/apk/lsf.apk', //仅为示例，并非真实的资源
							success: res => {
								if (res.statusCode === 200) {
									this.showModal2 = false;
									this.percentage = 0;
									console.log('下载完成')
								}
							},
							fail: err => {
								uni.$u.toast('下载失败');
							}
						});
						this.downloadTask.onProgressUpdate((res) => {
							this.percentage = res.progress;
						});
					}
				} else if (platform === 'ios') {
					plus.runtime.openURL(appstoreUrl)
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.popupContent {
		width: 700rpx;
		height: 400rpx;
		padding: 20rpx 30rpx 0;

		.title {
			font-size: 18px;
			font-weight: 700;
			height: 80rpx;
			line-height: 80rpx;
		}

		.body {
			overflow: auto;
			height: 220rpx;
			color: $u-tips-color;
		}

		.footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 80rpx;
			color: $u-primary;

			.right text {
				display: inline-block;
				margin-left: 60rpx;
			}
		}
	}

	.popupContent2 {
		width: 700rpx;
		padding: 20rpx 30rpx 0;

		.title {
			font-size: 18px;
			font-weight: 700;
			height: 80rpx;
			line-height: 80rpx;
		}

		.footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 80rpx;
			color: #27AFA3;
		}

	}
</style>
