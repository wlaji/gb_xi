//检测接口
import {
	checkForUpdates
} from '@/api/public.js'
//苹果商店app链接
const appstoreUrl = 'https://apps.apple.com/us/app/%E9%93%91%E6%96%AF%E5%A4%AB/id1586953224';
export default function(showInfo = 1) {
	// 设备系统平台--安卓||ios
	var platform = uni.getSystemInfoSync().platform;
	plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
		console.log(widgetInfo)
		checkForUpdates({
			versions: widgetInfo.versionCode,
			platform: 'system_url'
		}).then(result => {
			console.log('检查跟新返回-》', result)
			const newUrl = result.data.url
			const description = result.data.description
			const bool = parseInt(result.data.bool)
			if (newUrl) {
				uni.showModal({
					title: '提示',
					content: description,
					confirmText: '更新',
					success: function(res) {
						if (res.confirm) {
							if (platform === "android") {
								uni.downloadFile({
									url: newUrl,
									success: (downloadResult) => {
										console.log(downloadResult)
										if (downloadResult
											.statusCode === 200
										) {
											plus.runtime.install(
												downloadResult
												.tempFilePath, {
													force: false
												},
												function() {
													plus.runtime.restart();
												},
												function(e) {
													console.error(e);
													uni.showToast({
														title: '安装失败',
														icon: 'error'
													});
												});
										} else {
											uni.showToast({
												title: '更新失败',
												icon: 'error'
											});
										}
									}
								});
							} else {
								plus.runtime.openURL(appstoreUrl)
								// itms-apps://itunes.apple.com/cn/app/qq/id123456789?mt=8
								// itms-apps://itunes.apple.com/cn/app/+app名字+/id+appleID+?mt=8
							}
						} else {
							if (bool) {
								 plus.runtime.quit(); // 退出应用
							}else {
								getApp().globalData.simpleCache.put("noShowUpdateDialog",
									"1", 300);
							}
						}
					}
				});
			} else {
				if (showInfo) {
					uni.showModal({
						title: '提示',
						content: '已经是最新版本了~',
						confirmText: '知道了',
						success() {

						}
					})
				}
			}
		})
	});
}

