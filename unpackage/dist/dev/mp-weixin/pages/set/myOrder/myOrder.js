(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/myOrder/myOrder"],{108:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));try{o={uImage:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-image/u-image")]).then(n.bind(null,597))},uLoadmore:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-loadmore/u-loadmore")]).then(n.bind(null,618))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,t=e.$createElement;e._self._c},u=[];r._withStripped=!0},327:function(e,t,n){"use strict";(function(e){n(3);o(n(2));var t=o(n(328));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=n,e(t.default)}).call(this,n(0)["createPage"])},328:function(e,t,n){"use strict";n.r(t);var o=n(108),r=n(58);for(var u in r)"default"!==u&&function(e){n.d(t,e,(function(){return r[e]}))}(u);n(329);var a,i=n(1),s=Object(i["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);s.options.__file="pages/set/myOrder/myOrder.vue",t["default"]=s.exports},329:function(e,t,n){"use strict";var o=n(60),r=n.n(o);r.a},58:function(e,t,n){"use strict";n.r(t);var o=n(59),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},59:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o={data:function(){return{activeIndex:0,tabList:[{text:"全部"},{text:"待付款"},{text:"待发货"},{text:"待收货"},{text:"待评价"}],productList:[],status:"loadmore",page:0}},methods:{changeTab:function(e){this.activeIndex=e},onReachBottom:function(){var e=this;console.log("加载数据"),this.page>=3||(this.status="loading",this.page=++this.page,setTimeout((function(){e.page>=3?e.status="nomore":e.status="loading"}),2e3))}},onLoad:function(){this.productList=this.$json.orderList}};t.default=o},60:function(e,t,n){}},[[327,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/set/myOrder/myOrder.js.map