(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productList/productList"],{256:function(e,o,n){"use strict";(function(e){n(3);t(n(2));var o=t(n(257));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n(0)["createPage"])},257:function(e,o,n){"use strict";n.r(o);var t=n(65),u=n(39);for(var i in u)"default"!==i&&function(e){n.d(o,e,(function(){return u[e]}))}(i);n(258);var r,a=n(1),c=Object(a["a"])(u["default"],t["b"],t["c"],!1,null,"1f293d3c",null,!1,t["a"],r);c.options.__file="pages/productList/productList.vue",o["default"]=c.exports},258:function(e,o,n){"use strict";var t=n(41),u=n.n(t);u.a},39:function(e,o,n){"use strict";n.r(o);var t=n(40),u=n.n(t);for(var i in t)"default"!==i&&function(e){n.d(o,e,(function(){return t[e]}))}(i);o["default"]=u.a},40:function(e,o,n){"use strict";(function(e){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n={data:function(){return{status:"loadmore",showDialog:!1,priceType:0,activeIndex:0,list1:[{name:"综合排序"},{name:"销量优先"},{name:"价格"}],productList:[{url:"",des:"",num:10,price:"240"}],page:0}},methods:{navToDetailPage:function(){e.navigateTo({url:"/pages/productDetail/productDetail"})},changeTab:function(e){console.log(e),this.activeIndex=e,0===e||1===e?this.priceType=0:2===e&&(1===this.priceType?this.priceType=2:this.priceType=1)},onReachBottom:function(){var e=this;console.log(321321),this.page>=3||(this.status="loading",this.page=++this.page,setTimeout((function(){e.page>=3?e.status="nomore":e.status="loading"}),2e3))}},onLoad:function(){this.productList=this.$json.goodsList}};o.default=n}).call(this,n(0)["default"])},41:function(e,o,n){},65:function(e,o,n){"use strict";var t;n.d(o,"b",(function(){return u})),n.d(o,"c",(function(){return i})),n.d(o,"a",(function(){return t}));try{t={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,497))},uLine:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-line/u-line")]).then(n.bind(null,498))},uImage:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-image/u-image")]).then(n.bind(null,496))},uLoadmore:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore")]).then(n.bind(null,517))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,518))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,o=e.$createElement,n=(e._self._c,{color:1===e.priceType?"#fa436a":"#303133"}),t={color:2===e.priceType?"#fa436a":"#303133"};e._isMounted||(e.e0=function(o){e.showDialog=!0},e.e1=function(o){e.showDialog=!1}),e.$mp.data=Object.assign({},{$root:{a0:n,a1:t}})},i=[];u._withStripped=!0}},[[256,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productList/productList.js.map