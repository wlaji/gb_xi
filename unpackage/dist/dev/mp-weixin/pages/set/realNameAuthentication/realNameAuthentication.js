(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/realNameAuthentication/realNameAuthentication"],{406:function(e,n,t){"use strict";(function(e){t(5);o(t(3));var n=o(t(407));function o(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=t,e(n.default)}).call(this,t(1)["createPage"])},407:function(e,n,t){"use strict";t.r(n);var o=t(408),r=t(410);for(var u in r)"default"!==u&&function(e){t.d(n,e,(function(){return r[e]}))}(u);t(412);var i,c=t(47),a=Object(c["default"])(r["default"],o["render"],o["staticRenderFns"],!1,null,"9dbdd28e",null,!1,o["components"],i);a.options.__file="pages/set/realNameAuthentication/realNameAuthentication.vue",n["default"]=a.exports},408:function(e,n,t){"use strict";t.r(n);var o=t(409);t.d(n,"render",(function(){return o["render"]})),t.d(n,"staticRenderFns",(function(){return o["staticRenderFns"]})),t.d(n,"recyclableRender",(function(){return o["recyclableRender"]})),t.d(n,"components",(function(){return o["components"]}))},409:function(e,n,t){"use strict";var o;t.r(n),t.d(n,"render",(function(){return r})),t.d(n,"staticRenderFns",(function(){return i})),t.d(n,"recyclableRender",(function(){return u})),t.d(n,"components",(function(){return o}));try{o={uForm:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-form/u-form")]).then(t.bind(null,570))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,577))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,585))},uButton:function(){return Promise.all([t.e("common/vendor"),t.e("node-modules/uview-ui/components/u-button/u-button")]).then(t.bind(null,512))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c},u=!1,i=[];r._withStripped=!0},410:function(e,n,t){"use strict";t.r(n);var o=t(411),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},411:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{loading:!1,form:{name:"",idCard:""},rules:{name:{required:!0,message:"请输入姓名",trigger:["blur"]},idCard:[{required:!0,message:"请输入身份证号码",trigger:["blur"]},{validator:function(n,t,o){return e.$u.test.idCard(t)},message:"身份证号码不正确",trigger:["blur"]}]}}},methods:{submit:function(){var n=this;this.$refs.form.validate().then((function(){e.$u.toast("表单验证成功"),n.loading=!0,setTimeout((function(){n.loading=!1}),1e3)})).catch((function(e){console.log(e)}))}},onLoad:function(){},onReady:function(){this.$refs.form.setRules(this.rules)}};n.default=t}).call(this,t(1)["default"])},412:function(e,n,t){"use strict";t.r(n);var o=t(413),r=t.n(o);for(var u in o)"default"!==u&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=r.a},413:function(e,n,t){}},[[406,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/set/realNameAuthentication/realNameAuthentication.js.map