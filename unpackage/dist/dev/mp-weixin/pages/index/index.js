(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{175:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(176));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},176:function(e,n,t){"use strict";t.r(n);var o=t(177),i=t(179);for(var r in i)"default"!==r&&function(e){t.d(n,e,(function(){return i[e]}))}(r);t(181);var u,c=t(47),s=Object(c["default"])(i["default"],o["render"],o["staticRenderFns"],!1,null,"57280228",null,!1,o["components"],u);s.options.__file="pages/index/index.vue",n["default"]=s.exports},177:function(e,n,t){"use strict";t.r(n);var o=t(178);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},178:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return i})),t.d(n,"staticRenderFns",(function(){return u})),t.d(n,"recyclableRender",(function(){return r})),t.d(n,"components",(function(){return o}));try{o={uSearch:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-search/u-search")]).then(t.bind(null,466))},uSwiper:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-swiper/u-swiper")]).then(t.bind(null,474))},uScrollList:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-scroll-list/u-scroll-list")]).then(t.bind(null,482))},uImage:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-image/u-image")]).then(t.bind(null,492))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,500))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,n=e.$createElement;e._self._c},r=!1,u=[];i._withStripped=!0},179:function(e,n,t){"use strict";t.r(n);var o=t(180),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},180:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){t.e("components/updateDialog").then(function(){return resolve(t(509))}.bind(null,t)).catch(t.oe)},i={data:function(){return{showModal:!1,timeData:{},carouselList:[],goodsList:[],indicator:!0,list:[{thumb:"/static/temp/c3.png",title:"分类1"},{thumb:"/static/temp/c5.png",title:"分类2"},{thumb:"/static/temp/c6.png",title:"分类3"},{thumb:"/static/temp/c7.png",title:"分类4"},{thumb:"/static/temp/c8.png",title:"分类5"},{thumb:"/static/temp/c3.png",title:"分类6"}]}},components:{updateDialog:o},computed:{isLogin:function(){return this.$store.getters.isLogin}},onLoad:function(){this.carouselList=this.$json.carouselList,this.goodsList=this.$json.goodsList},methods:{toLogin:function(){e.navigateTo({url:"/pages/login/login"})},navToDetailPage:function(){e.navigateTo({url:"/pages/productDetail/productDetail"})},toCategory:function(){e.switchTab({url:"/pages/productCategory/productCategory"})},toSearch:function(){e.navigateTo({url:"/pages/search/search"})},onChange:function(e){this.timeData=e}}};n.default=i}).call(this,t(1)["default"])},181:function(e,n,t){"use strict";t.r(n);var o=t(182),i=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=i.a},182:function(e,n,t){}},[[175,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map