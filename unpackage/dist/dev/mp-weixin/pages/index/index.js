(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{14:function(e,t,n){"use strict";n.r(t);var o=n(15),i=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=i.a},15:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{timeData:{},carouselList:[],goodsList:[],indicator:!0,list:[{thumb:"/static/temp/c3.png",title:"分类1"},{thumb:"/static/temp/c5.png",title:"分类2"},{thumb:"/static/temp/c6.png",title:"分类3"},{thumb:"/static/temp/c7.png",title:"分类4"},{thumb:"/static/temp/c8.png",title:"分类5"},{thumb:"/static/temp/c3.png",title:"分类6"}]}},onLoad:function(){console.log(this.$json),this.carouselList=this.$json.carouselList,this.goodsList=this.$json.goodsList},methods:{navToDetailPage:function(){e.navigateTo({url:"/pages/productDetail/productDetail"})},toCategory:function(){e.switchTab({url:"/pages/productCategory/productCategory"})},toSearch:function(){e.navigateTo({url:"/pages/search/search"})},onChange:function(e){this.timeData=e}},onShareAppMessage:function(){}};t.default=n}).call(this,n(0)["default"])},16:function(e,t,n){},197:function(e,t,n){"use strict";(function(e){n(3);o(n(2));var t=o(n(198));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(0)["createPage"])},198:function(e,t,n){"use strict";n.r(t);var o=n(45),i=n(14);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n(199);var c,r=n(1),s=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"57280228",null,!1,o["a"],c);s.options.__file="pages/index/index.vue",t["default"]=s.exports},199:function(e,t,n){"use strict";var o=n(16),i=n.n(o);i.a},45:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));try{o={uSearch:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-search/u-search")]).then(n.bind(null,449))},uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,450))},uScrollList:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-scroll-list/u-scroll-list")]).then(n.bind(null,451))},uImage:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-image/u-image")]).then(n.bind(null,452))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,453))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement;e._self._c},u=[];i._withStripped=!0}},[[197,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map