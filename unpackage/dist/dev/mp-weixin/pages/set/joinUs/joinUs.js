(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/joinUs/joinUs"],{299:function(e,n,o){"use strict";(function(e){o(5);t(o(3));var n=t(o(300));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o(1)["createPage"])},300:function(e,n,o){"use strict";o.r(n);var t=o(301),r=o(303);for(var u in r)"default"!==u&&function(e){o.d(n,e,(function(){return r[e]}))}(u);o(305);var i,s=o(47),c=Object(s["default"])(r["default"],t["render"],t["staticRenderFns"],!1,null,"48b63cd9",null,!1,t["components"],i);c.options.__file="pages/set/joinUs/joinUs.vue",n["default"]=c.exports},301:function(e,n,o){"use strict";o.r(n);var t=o(302);o.d(n,"render",(function(){return t["render"]})),o.d(n,"staticRenderFns",(function(){return t["staticRenderFns"]})),o.d(n,"recyclableRender",(function(){return t["recyclableRender"]})),o.d(n,"components",(function(){return t["components"]}))},302:function(e,n,o){"use strict";var t;o.r(n),o.d(n,"render",(function(){return r})),o.d(n,"staticRenderFns",(function(){return i})),o.d(n,"recyclableRender",(function(){return u})),o.d(n,"components",(function(){return t}));try{t={uModal:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-modal/u-modal")]).then(o.bind(null,574))},uImage:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-image/u-image")]).then(o.bind(null,492))},uDivider:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-divider/u-divider")]).then(o.bind(null,668))},uParse:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-parse/u-parse")]).then(o.bind(null,676))},uForm:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form/u-form")]).then(o.bind(null,582))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,589))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-input/u-input")]).then(o.bind(null,597))},uButton:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-button/u-button")]).then(o.bind(null,524))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var r=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.showModal=!1},e.e1=function(n){e.showModal=!1})},u=!1,i=[];r._withStripped=!0},303:function(e,n,o){"use strict";o.r(n);var t=o(304),r=o.n(t);for(var u in t)"default"!==u&&function(e){o.d(n,e,(function(){return t[e]}))}(u);n["default"]=r.a},304:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{showModal:!1,loading:!1,form:{phone:""},rules:{name:[{required:!0,message:"请输入您的姓名",trigger:["blur"]}],phone:[{required:!0,message:"请输入手机号",trigger:["blur"]},{validator:function(n,o,t){return e.$u.test.mobile(o)},message:"手机号码不正确",trigger:["blur"]}],wxCode:[{required:!0,message:"请输入微信号",trigger:["blur"]}],email:[{required:!0,message:"请输入邮箱",trigger:["blur"]},{validator:function(n,o,t){return e.$u.test.email(o)},message:"邮箱不正确",trigger:["blur"]}]},content:"<p>线下到店提货服务费补贴20元/套归提货点加盟店所有, 网上下单归属区域所有加盟店平均分配, 服务加盟店者奖励加盟店的收入的20%</p>"}},methods:{toSubmit:function(){var n=this;this.$refs.form1.validate().then((function(){e.$u.toast("表单验证成功"),n.showModal=!0})).catch((function(e){console.log(e)}))},confirm:function(){this.showModal=!1}},onReady:function(){this.$refs.form1.setRules(this.rules)}};n.default=o}).call(this,o(1)["default"])},305:function(e,n,o){"use strict";o.r(n);var t=o(306),r=o.n(t);for(var u in t)"default"!==u&&function(e){o.d(n,e,(function(){return t[e]}))}(u);n["default"]=r.a},306:function(e,n,o){}},[[299,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/set/joinUs/joinUs.js.map