export default{
    data(){
        return {
           //设置默认的分享参数
           //如果页面不设置share，就触发这个默认的分享
            share:{
                title:'铑斯夫三元催化报价小程序',
                path:'/pages/login/login',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
    onShareAppMessage(res) {
		const userInfo = uni.getStorageSync('userInfo')
		if(userInfo){
			this.share.path = `${this.share.path}?status=3&recommendCode=${userInfo.recommendCode}`
		}
        return {
            title:this.share.title,
            path:this.share.path,
            imageUrl:this.share.imageUrl,
            desc:this.share.desc,
            content:this.share.content,
            success(res){
                uni.showToast({
                    title:'分享成功'
                })
            },
            fail(res){
                uni.showToast({
                    title:'分享失败',
                    icon:'none'
                })
            }
        }
    },
	onShareTimeline(){
		
	}
}