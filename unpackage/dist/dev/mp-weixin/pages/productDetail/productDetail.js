(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/productDetail/productDetail"],{183:function(t,n,e){"use strict";(function(t){e(5);o(e(3));var n=o(e(184));function o(t){return t&&t.__esModule?t:{default:t}}wx.__webpack_require_UNI_MP_PLUGIN__=e,t(n.default)}).call(this,e(1)["createPage"])},184:function(t,n,e){"use strict";e.r(n);var o=e(185),r=e(187);for(var i in r)"default"!==i&&function(t){e.d(n,t,(function(){return r[t]}))}(i);e(189);var u,c=e(47),d=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"653d9208",null,!1,o["components"],u);d.options.__file="pages/productDetail/productDetail.vue",n["default"]=d.exports},185:function(t,n,e){"use strict";e.r(n);var o=e(186);e.d(n,"render",(function(){return o["render"]})),e.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),e.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),e.d(n,"components",(function(){return o["components"]}))},186:function(t,n,e){"use strict";var o;e.r(n),e.d(n,"render",(function(){return r})),e.d(n,"staticRenderFns",(function(){return u})),e.d(n,"recyclableRender",(function(){return i})),e.d(n,"components",(function(){return o}));try{o={uSwiper:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-swiper/u-swiper")]).then(e.bind(null,482))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,508))},uImage:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-image/u-image")]).then(e.bind(null,500))},uButton:function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/uview-ui/components/u-button/u-button")]).then(e.bind(null,532))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var t=this,n=t.$createElement;t._self._c},i=!1,u=[];r._withStripped=!0},187:function(t,n,e){"use strict";e.r(n);var o=e(188),r=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=r.a},188:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=e(980),r={data:function(){return{productDetailInfo:"",productId:1,imgList:[{src:"https://gd3.alicdn.com/imgextra/i3/0/O1CN01IiyFQI1UGShoFKt1O_!!0-item_pic.jpg_400x400.jpg"},{src:"https://gd3.alicdn.com/imgextra/i3/TB1RPFPPFXXXXcNXpXXXXXXXXXX_!!0-item_pic.jpg_400x400.jpg"},{src:"https://gd2.alicdn.com/imgextra/i2/38832490/O1CN01IYq7gu1UGShvbEFnd_!!38832490.jpg_400x400.jpg"}],desc:'\n\t\t\t\t<div style="width:100%">\n\t\t\t\t\t<img style="width:100%;display:block;object-fit:cover" src="/static/image/5.jpg" />\n\t\t\t\t</div>\n\t\t\t'}},onLoad:function(t){this.productId=t.id,this.getPageData()},methods:{getPageData:function(){var t=this;(0,o.getProductInfo)({id:this.productId}).then((function(n){t.productDetailInfo=n.data}))},goHome:function(){t.switchTab({url:"/pages/index/index"})},goCart:function(){t.setStorageSync("productId",this.productId),t.switchTab({url:"/pages/cart/cart"})},collect:function(){}}};n.default=r}).call(this,e(1)["default"])},189:function(t,n,e){"use strict";e.r(n);var o=e(190),r=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);n["default"]=r.a},190:function(t,n,e){}},[[183,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productDetail/productDetail.js.map