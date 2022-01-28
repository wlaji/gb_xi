import permision from "@/js_sdk/wa-permission/permission.js"
import amap from './amap-wx.130.js'
export function authorizationGetLocation() {
	return new Promise(async (resolve, reject) => {
		// #ifdef APP-PLUS
		if (permision.checkSystemEnableLocation()) {
			let platform = uni.getSystemInfoSync().platform,
				result = 1;
			if (platform === 'android') {
				result = await permision.requestAndroidPermission('android.permission.ACCESS_FINE_LOCATION')
			} else if (platform === 'ios') {
				result = await permision.judgeIosPermission("location")
			}
			if (result == 1) {
				resolve()
			} else {
				uni.showModal({
					title: '提示',
					content: 'APP没有获取位置的权限, 是否去开启',
					success: res => {
						if (res.confirm) {
							permision.gotoAppPermissionSetting();
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
					fail(err) {
						reject(err)
					}
				})
			}
		} else {
			uni.showModal({
				title: '提示',
				content: '系统定位权限未开启,请先开启手机定位',
				showCancel: false,
				confirmText: '知道了'
			})
		}
		// #endif
		// #ifdef MP-WEIXIN
		let that = this;
		uni.authorize({
			scope: 'scope.userLocation',
			success() { //1.1 允许授权
				resolve()
			},
			fail(e) { //1.2 拒绝授权
				uni.showModal({
					title: '提示',
					content: '小程序没有获取位置的权限, 是否去开启',
					success: res => {
						if (res.confirm) {
							uni.openSetting()
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			}
		})
		// #endif
	})
}
