import store from '../store/index.js'
//检测接口
import {
	checkForUpdates
} from '@/api/index.js'
//苹果商店app链接
export default function() {
	// 设备系统平台--安卓||ios
	var platform = uni.getSystemInfoSync().platform;
	plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
		console.log(widgetInfo);
		if(platform === "android"){
			checkForUpdates({
				versions: widgetInfo.versionCode,
				platform: 'android'
			}).then(result => {
				console.log('检查跟新返回-》', result)
				const url = result.data.url;
				const description = result.data.description;
				const bool = parseInt(result.data.bool);
				const versions = result.data.versions;
				store.commit('updateAppInfo',{
					url,
					description,
					bool,
					versions
				})
			}).catch(err=>{
				console.log(err)
			})
		}else if(platform==='ios'){
			checkForUpdates({
				versions: widgetInfo.versionCode,
				platform: 'ios'
			}).then(result => {
				console.log('检查跟新返回-》', result)
				const url = result.data.url;
				const description = result.data.description;
				const bool = parseInt(result.data.bool);
				const versions = result.data.versions;
				store.commit('updateAppInfo',{
					url,
					description,
					bool,
					versions
				})
			}).catch(err=>{
				console.log(err)
			})
		}
	});
}
