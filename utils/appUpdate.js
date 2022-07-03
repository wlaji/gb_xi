import store from '../store/index.js'
//检测接口
import {
	appInfo
} from '@/api/newApi.js'
//苹果商店app链接
export default function() {
	// 设备系统平台--安卓||ios
	var platform = uni.getSystemInfoSync().platform;
	plus.runtime.getProperty(plus.runtime.appid, (widgetInfo) => {
		if(platform === "android"){
			appInfo({
				versions: widgetInfo.versionCode,
				type: 1
			}).then(res=>{
				let result = res.data[0];
				const url = result[2].content;
				const description = result[3].content;
				const bool = Number(result[4].content);
				const versions = Number(result[1].content);
				store.commit('updateAppInfo',{
					url,
					description,
					bool,
					versions
				})
			})
	
		}else if(platform==='ios'){
			appInfo({
				versions: widgetInfo.versionCode,
				type: 2
			}).then(res => {
				let result = res.data[0];
				const url = result[1].content;
				const description = result[2].content;
				const bool = Number(result[3].content);
				const versions = Number(result[0].content);
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
