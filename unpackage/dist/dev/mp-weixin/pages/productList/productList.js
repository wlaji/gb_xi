(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productList/productList"],{100:function(e,n,o){"use strict";var t;o.d(n,"b",(function(){return u})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return t}));try{t={uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,583))},uLine:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-line/u-line")]).then(o.bind(null,584))},uImage:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-image/u-image")]).then(o.bind(null,582))},uLoadmore:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-loadmore/u-loadmore")]).then(o.bind(null,603))},uPopup:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-popup/u-popup")]).then(o.bind(null,604))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,n=e.$createElement,o=(e._self._c,{color:1===e.priceType?"#fa436a":"#303133"}),t={color:2===e.priceType?"#fa436a":"#303133"};e._isMounted||(e.e0=function(n){e.showDialog=!0},e.e1=function(n){e.showDialog=!1}),e.$mp.data=Object.assign({},{$root:{a0:o,a1:t}})},i=[];u._withStripped=!0},307:function(e,n,o){"use strict";(function(e){o(3);t(o(2));var n=t(o(308));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o(0)["createPage"])},308:function(e,n,o){"use strict";o.r(n);var t=o(100),u=o(39);for(var i in u)"default"!==i&&function(e){o.d(n,e,(function(){return u[e]}))}(i);o(309);var r,a=o(1),c=Object(a["a"])(u["default"],t["b"],t["c"],!1,null,"1f293d3c",null,!1,t["a"],r);c.options.__file="pages/productList/productList.vue",n["default"]=c.exports},309:function(e,n,o){"use strict";var t=o(41),u=o.n(t);u.a},39:function(e,n,o){"use strict";o.r(n);var t=o(40),u=o.n(t);for(var i in t)"default"!==i&&function(e){o.d(n,e,(function(){return t[e]}))}(i);n["default"]=u.a},40:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{status:"loadmore",showDialog:!1,priceType:0,activeIndex:0,list1:[{name:"综合排序"},{name:"销量优先"},{name:"价格"}],productList:[{url:"",des:"",num:10,price:"240"}],page:0}},methods:{navToDetailPage:function(){e.navigateTo({url:"/pages/productDetail/productDetail"})},changeTab:function(e){console.log(e),this.activeIndex=e,0===e||1===e?this.priceType=0:2===e&&(1===this.priceType?this.priceType=2:this.priceType=1)},onReachBottom:function(){var e=this;this.page>=3||(this.status="loading",this.page=++this.page,setTimeout((function(){e.page>=3?e.status="nomore":e.status="loading"}),2e3))}},onLoad:function(){this.productList=this.$json.goodsList}};n.default=o}).call(this,o(0)["default"])},41:function(e,n,o){}},[[307,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productList/productList.js.map