(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productList/productList"],{239:function(e,n,o){"use strict";(function(e){o(5);t(o(3));var n=t(o(240));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o(1)["createPage"])},240:function(e,n,o){"use strict";o.r(n);var t=o(241),u=o(243);for(var r in u)"default"!==r&&function(e){o.d(n,e,(function(){return u[e]}))}(r);o(245);var i,c=o(47),a=Object(c["default"])(u["default"],t["render"],t["staticRenderFns"],!1,null,"1f293d3c",null,!1,t["components"],i);a.options.__file="pages/productList/productList.vue",n["default"]=a.exports},241:function(e,n,o){"use strict";o.r(n);var t=o(242);o.d(n,"render",(function(){return t["render"]})),o.d(n,"staticRenderFns",(function(){return t["staticRenderFns"]})),o.d(n,"recyclableRender",(function(){return t["recyclableRender"]})),o.d(n,"components",(function(){return t["components"]}))},242:function(e,n,o){"use strict";var t;o.r(n),o.d(n,"render",(function(){return u})),o.d(n,"staticRenderFns",(function(){return i})),o.d(n,"recyclableRender",(function(){return r})),o.d(n,"components",(function(){return t}));try{t={uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,508))},uLine:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-line/u-line")]).then(o.bind(null,524))},uImage:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-image/u-image")]).then(o.bind(null,500))},uLoadmore:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-loadmore/u-loadmore")]).then(o.bind(null,667))},uPopup:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-popup/u-popup")]).then(o.bind(null,675))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,n=e.$createElement,o=(e._self._c,{color:1===e.priceType?"#fa436a":"#303133"}),t={color:2===e.priceType?"#fa436a":"#303133"};e._isMounted||(e.e0=function(n){e.showDialog=!0},e.e1=function(n){e.showDialog=!1}),e.$mp.data=Object.assign({},{$root:{a0:o,a1:t}})},r=!1,i=[];u._withStripped=!0},243:function(e,n,o){"use strict";o.r(n);var t=o(244),u=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,(function(){return t[e]}))}(r);n["default"]=u.a},244:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{status:"loadmore",showDialog:!1,priceType:0,activeIndex:0,list1:[{name:"综合排序"},{name:"销量优先"},{name:"价格"}],productList:[{url:"",des:"",num:10,price:"240"}],page:0}},methods:{navToDetailPage:function(){e.navigateTo({url:"/pages/productDetail/productDetail"})},changeTab:function(e){console.log(e),this.activeIndex=e,0===e||1===e?this.priceType=0:2===e&&(1===this.priceType?this.priceType=2:this.priceType=1)},onReachBottom:function(){var e=this;this.page>=3||(this.status="loading",this.page=++this.page,setTimeout((function(){e.page>=3?e.status="nomore":e.status="loading"}),2e3))}},onLoad:function(){this.productList=this.$json.goodsList}};n.default=o}).call(this,o(1)["default"])},245:function(e,n,o){"use strict";o.r(n);var t=o(246),u=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,(function(){return t[e]}))}(r);n["default"]=u.a},246:function(e,n,o){}},[[239,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productList/productList.js.map