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
