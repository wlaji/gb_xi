import permision from "@/js_sdk/wa-permission/permission.js";
export const getCookie = (key) => {
	return uni.getStorageSync(key)
}

export const setCookie = (key, value) => {
	return uni.setStorageSync(key, value)
}

export const removeCookie = (key) => {
	return uni.removeStorageSync(key)
}


export const saveHeadImgFile = (base64, quality = 1) => {
	const bitmap = new plus.nativeObj.Bitmap("test");
	return new Promise((resolve, reject) => {
		// 从本地加载Bitmap图片
		bitmap.loadBase64Data(base64, function() {
			const url = "_doc/" + getTimeStamps() + ".png"; // url为时间戳命名方式
			bitmap.save(url, {
				overwrite: true, // 是否覆盖
				quality: quality // 图片清晰度
			}, (i) => {
				uni.saveImageToPhotosAlbum({
					filePath: url,
					success: function() {
						bitmap.clear()
						resolve({
							code: 0,
							msg: '保存成功',
							filePath: url
						});
					}
				});
			}, (e) => {
				bitmap.clear()
				reject('保存图片失败：' + JSON.stringify(e));
			});
		}, (e) => {
			bitmap.clear()
			reject('加载图片失败：' + JSON.stringify(e));
		});
	})
}

export const getLocation = async (cb) => {
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
			uni.chooseLocation({
				success: function(res) {
					cb({
						code: 200,
						msg: '',
						data: res
					})
				}
			});
		} else {
			cb({
				code: 401,
				msg: 'App没有获取位置的权限, 是否去开启',
				data: null
			})
		}
	} else {
		cb({
			code: 401,
			msg: '系统定位权限未开启,请先开启手机定位',
			data: null
		})
	}
	// #endif
	// #ifdef MP-WEIXIN
	let that = this;
	uni.authorize({
		scope: 'scope.userLocation',
		success() { //1.1 允许授权
			uni.chooseLocation({
				success: function(res) {
					cb({
						code: 200,
						msg: '',
						data: res
					})
				}
			});
		},
		fail(e) { //1.2 拒绝授权
			cb({
				code: 401,
				msg: '程序没有获取位置的权限, 是否去开启',
				data: null
			})
		}
	})
	// #endif
}
