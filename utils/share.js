export default{
    data(){
        return {
           //设置默认的分享参数
           //如果页面不设置share，就触发这个默认的分享
            share:{
                title:'',
                path:'',
                imageUrl:'',
                desc:'',
                content:''
            }
        }
    },
    onShareAppMessage() {
		
    },
	onShareTimeline(){
		
	}
}