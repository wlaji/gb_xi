(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productCategory/productCategory"],{27:function(e,t,n){"use strict";n.r(t);var o=n(28),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},28:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{currentIndex:0,slist:[],flist:[],carouselList:[]}},onLoad:function(){this.flist=this.$json.productList,this.slist=this.flist[this.currentIndex].children,this.carouselList=this.$json.carouselList},methods:{toProductList:function(){e.navigateTo({url:"/pages/productList/productList"})},toSearch:function(){e.navigateTo({url:"/pages/search/search"})},tabtap:function(e,t){this.currentIndex=t,this.slist=this.flist[this.currentIndex].children}}};t.default=n}).call(this,n(0)["default"])},29:function(e,t,n){},290:function(e,t,n){"use strict";(function(e){n(3);o(n(2));var t=o(n(291));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(0)["createPage"])},291:function(e,t,n){"use strict";n.r(t);var o=n(92),r=n(27);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n(292);var i,s=n(1),c=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"e6ad25bc",null,!1,o["a"],i);c.options.__file="pages/productCategory/productCategory.vue",t["default"]=c.exports},292:function(e,t,n){"use strict";var o=n(29),r=n.n(o);r.a},92:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));try{o={uSearch:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-search/u-search")]).then(n.bind(null,570))},uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,571))},uImage:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-image/u-image")]).then(n.bind(null,573))}}}catch(i){if(-1===i.message.indexOf("Cannot find module")||-1===i.message.indexOf(".vue"))throw i;console.error(i.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},u=[];r._withStripped=!0}},[[290,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productCategory/productCategory.js.map