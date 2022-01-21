
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/productDetail/productDetail","pages/my/my","pages/login/login","pages/productCategory/productCategory","pages/cart/cart","pages/register/register","pages/search/search","pages/productList/productList","pages/checkout/checkout","pages/set/set/set","pages/set/msg/msg","pages/searchResult/searchResult","pages/privacyPolicy/privacyPolicy","pages/userAgreement/userAgreement","pages/set/myOrder/myOrder","pages/set/joinUs/joinUs","pages/set/addressManage/addressManage","pages/set/share/share","pages/set/marketing/marketing","pages/set/team/team","pages/set/history/history","pages/set/collect/collect","pages/set/accountSecurity/accountSecurity","pages/set/paymentSetting/paymentSetting","pages/set/identityAuthentication/identityAuthentication","pages/set/aboutStore/aboutStore","pages/set/infoSet/infoSet","pages/set/editAddress/editAddress","pages/set/jifenManage/jifenManage"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"国本健康商城","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#606266","selectedColor":"#E44273","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/image/home.png","selectedIconPath":"static/image/home_selected.png","text":"首页"},{"pagePath":"pages/productCategory/productCategory","iconPath":"static/image/category.png","selectedIconPath":"static/image/category_selected.png","text":"分类"},{"pagePath":"pages/cart/cart","iconPath":"static/image/cart.png","selectedIconPath":"static/image/cart_selected.png","text":"购物车"},{"pagePath":"pages/my/my","iconPath":"static/image/account.png","selectedIconPath":"static/image/account_selected.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"国本健康商城","compilerVersion":"3.3.5","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"国本健康商城"}},{"path":"/pages/productDetail/productDetail","meta":{},"window":{"navigationBarTitleText":"产品详情","enablePullDownRefresh":false,"titleNView":{"searchInput":{"backgroundColor":"rgba(231, 231, 231,.7)","borderRadius":"16px","placeholder":"请输入搜索关键字","disabled":true,"placeholderColor":"#606266"}}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"个人中心"}},{"path":"/pages/login/login","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/productCategory/productCategory","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"产品分类"}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTitleText":"购物车"}},{"path":"/pages/register/register","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"产品搜索","enablePullDownRefresh":false}},{"path":"/pages/productList/productList","meta":{},"window":{"navigationBarTitleText":"产品列表","enablePullDownRefresh":false}},{"path":"/pages/checkout/checkout","meta":{},"window":{"navigationBarTitleText":"订单结算","enablePullDownRefresh":false}},{"path":"/pages/set/set/set","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/set/msg/msg","meta":{},"window":{"navigationBarTitleText":"我的留言","enablePullDownRefresh":false}},{"path":"/pages/searchResult/searchResult","meta":{},"window":{"navigationStyle":"custom","navigationBarTitleText":"搜索结果","enablePullDownRefresh":false}},{"path":"/pages/privacyPolicy/privacyPolicy","meta":{},"window":{"navigationBarTitleText":"隐私政策","enablePullDownRefresh":false}},{"path":"/pages/userAgreement/userAgreement","meta":{},"window":{"navigationBarTitleText":"用户协议","enablePullDownRefresh":false}},{"path":"/pages/set/myOrder/myOrder","meta":{},"window":{"navigationBarTitleText":"我的订单","enablePullDownRefresh":false}},{"path":"/pages/set/joinUs/joinUs","meta":{},"window":{"navigationBarTitleText":"我要加盟","enablePullDownRefresh":false}},{"path":"/pages/set/addressManage/addressManage","meta":{},"window":{"navigationBarTitleText":"我的收货地址","enablePullDownRefresh":false}},{"path":"/pages/set/share/share","meta":{},"window":{"navigationBarTitleText":"分享","enablePullDownRefresh":false}},{"path":"/pages/set/marketing/marketing","meta":{},"window":{"navigationBarTitleText":"营销业绩","enablePullDownRefresh":false}},{"path":"/pages/set/team/team","meta":{},"window":{"navigationBarTitleText":"团队成员","enablePullDownRefresh":false}},{"path":"/pages/set/history/history","meta":{},"window":{"navigationBarTitleText":"浏览历史","enablePullDownRefresh":false}},{"path":"/pages/set/collect/collect","meta":{},"window":{"navigationBarTitleText":"我的收藏","enablePullDownRefresh":false}},{"path":"/pages/set/accountSecurity/accountSecurity","meta":{},"window":{"navigationBarTitleText":"账户安全","enablePullDownRefresh":false}},{"path":"/pages/set/paymentSetting/paymentSetting","meta":{},"window":{"navigationBarTitleText":"支付设置","enablePullDownRefresh":false}},{"path":"/pages/set/identityAuthentication/identityAuthentication","meta":{},"window":{"navigationBarTitleText":"身份验证","enablePullDownRefresh":false}},{"path":"/pages/set/aboutStore/aboutStore","meta":{},"window":{"navigationBarTitleText":"关于国本商城","enablePullDownRefresh":false}},{"path":"/pages/set/infoSet/infoSet","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/set/editAddress/editAddress","meta":{},"window":{"navigationBarTitleText":"收货地址","enablePullDownRefresh":false}},{"path":"/pages/set/jifenManage/jifenManage","meta":{},"window":{"navigationBarTitleText":"积分管理","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
