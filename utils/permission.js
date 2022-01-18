import permision from "@/js_sdk/wa-permission/permission.js"

const requestAndroidPermission = async function(permisionID) {
	var result = await permision.requestAndroidPermission(permisionID);
	return result;
}

const judgeIosPermission = function(permisionID) {
	return permision.judgeIosPermission(permisionID);
}

//打开当前App的权限设置界面。可用于引导用户赋权
const gotoAppPermissionSetting = function() {
	permision.gotoAppPermissionSetting()
}

//获取当前手机是否开启或关闭了定位服务
const checkSystemEnableLocation = function(){
	return permision.checkSystemEnableLocation()
}

export default {
	requestAndroidPermission,
	judgeIosPermission,
	gotoAppPermissionSetting,
	checkSystemEnableLocation
}