(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/myOrder/myOrder"],{291:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(292));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},292:function(e,n,t){"use strict";t.r(n);var o=t(293),r=t(295);for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t(297);var i,a=t(47),c=Object(a["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,null,null,!1,o["components"],i);c.options.__file="pages/set/myOrder/myOrder.vue",n["default"]=c.exports},293:function(e,n,t){"use strict";t.r(n);var o=t(294);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},294:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));try{o={uEmpty:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-empty/u-empty")]).then(t.bind(null,624))},uImage:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-image/u-image")]).then(t.bind(null,480))},uLoadmore:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-loadmore/u-loadmore")]).then(t.bind(null,640))}}}catch(a){if(-1===a.message.indexOf("Cannot find module")||-1===a.message.indexOf(".vue"))throw a;console.error(a.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},u=!1,i=[];r._withStripped=!0},295:function(e,n,t){"use strict";t.r(n);var o=t(296),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},296:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{activeIndex:0,tabList:[{text:"全部"},{text:"待付款"},{text:"待发货"},{text:"待收货"},{text:"待评价"}],productList:[],status:"loadmore",page:0}},methods:{toOrderDetail:function(){e.navigateTo({url:"/pages/set/orderDetail/orderDetail"})},changeTab:function(e){this.activeIndex=e.target.current},tabClick:function(e){this.activeIndex=e},loadData:function(){var e=this;console.log("加载数据"),this.page>=3||(this.status="loading",this.page=++this.page,setTimeout((function(){e.page>=3?e.status="nomore":e.status="loading"}),2e3))}},onLoad:function(){this.productList=this.$json.orderList}};n.default=t}).call(this,t(1)["default"])},297:function(e,n,t){"use strict";t.r(n);var o=t(298),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},298:function(e,n,t){}},[[291,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/set/myOrder/myOrder.js.map