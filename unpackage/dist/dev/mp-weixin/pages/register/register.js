(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{223:function(e,n,o){"use strict";(function(e){o(5);t(o(3));var n=t(o(224));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o(1)["createPage"])},224:function(e,n,o){"use strict";o.r(n);var t=o(225),u=o(227);for(var r in u)"default"!==r&&function(e){o.d(n,e,(function(){return u[e]}))}(r);o(229);var i,c=o(47),s=Object(c["default"])(u["default"],t["render"],t["staticRenderFns"],!1,null,"891c2434",null,!1,t["components"],i);s.options.__file="pages/register/register.vue",n["default"]=s.exports},225:function(e,n,o){"use strict";o.r(n);var t=o(226);o.d(n,"render",(function(){return t["render"]})),o.d(n,"staticRenderFns",(function(){return t["staticRenderFns"]})),o.d(n,"recyclableRender",(function(){return t["recyclableRender"]})),o.d(n,"components",(function(){return t["components"]}))},226:function(e,n,o){"use strict";var t;o.r(n),o.d(n,"render",(function(){return u})),o.d(n,"staticRenderFns",(function(){return i})),o.d(n,"recyclableRender",(function(){return r})),o.d(n,"components",(function(){return t}));try{t={uModal:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-modal/u-modal")]).then(o.bind(null,562))},uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,488))},uForm:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form/u-form")]).then(o.bind(null,570))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,577))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-input/u-input")]).then(o.bind(null,585))},uCode:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-code/u-code")]).then(o.bind(null,593))},uButton:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-button/u-button")]).then(o.bind(null,512))},uCheckboxGroup:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-checkbox-group/u-checkbox-group")]).then(o.bind(null,601))},uCheckbox:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-checkbox/u-checkbox")]).then(o.bind(null,609))}}}catch(c){if(-1===c.message.indexOf("Cannot find module")||-1===c.message.indexOf(".vue"))throw c;console.error(c.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.showModal=!1},e.e1=function(n){e.showModal=!1})},r=!1,i=[];u._withStripped=!0},227:function(e,n,o){"use strict";o.r(n);var t=o(228),u=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,(function(){return t[e]}))}(r);n["default"]=u.a},228:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=u(o(72));o(10);function u(e){return e&&e.__esModule?e:{default:e}}function r(e,n,o,t,u,r,i){try{var c=e[r](i),s=c.value}catch(d){return void o(d)}c.done?n(s):Promise.resolve(s).then(t,u)}function i(e){return function(){var n=this,o=arguments;return new Promise((function(t,u){var i=e.apply(n,o);function c(e){r(i,t,u,c,s,"next",e)}function s(e){r(i,t,u,c,s,"throw",e)}c(void 0)}))}}var c={data:function(){return{beforeStatus:"",showModal:!1,checked:!1,tips:"",loading:!1,form:{phone:"",code:"",yqcode:""},rules:{phone:[{required:!0,message:"请输入手机号",trigger:["blur"]},{validator:function(n,o,t){return e.$u.test.mobile(o)},message:"手机号码不正确",trigger:["blur"]}],code:[{required:!0,message:"请输入验证码",trigger:["blur"]},{validator:function(n,o,t){return e.$u.test.code(o,6)},message:"验证码格式不正确",trigger:["blur"]}]}}},onLoad:function(){},methods:{confirmChecked:function(){this.checked=!0,this.showModal=!1,console.log(this.checked),"getCode"===this.beforeStatus?this.getCode():"toRegister"===this.beforeStatus&&this.toRegister()},getPhoneNumber:function(n){if(this.checked){var o=n.detail.iv,u=n.detail.encryptedData;if(!u)return!1;e.login({provider:"weixin",success:function(){var e=i(t.default.mark((function e(n){return t.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log({code:n.code,encrypData:u,ivData:o});case 1:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()})}else this.showModal=!0},changeStatus:function(e){this.checked=!this.checked},navBack:function(){e.navigateBack()},toRegister:function(){var n=this;if(!this.checked)return this.showModal=!0,void(this.beforeStatus="toRegister");this.$refs.form1.validate().then((function(){e.$u.toast("表单验证成功"),n.loading=!0,setTimeout((function(){n.loading=!1,e.switchTab({url:"/pages/index/index"})}),1e3)})).catch((function(e){console.log(e)}))},toLogin:function(){e.navigateTo({url:"/pages/login/login"})},codeChange:function(e){this.tips=e},getCode:function(){var n=this;if(!this.checked)return this.showModal=!0,void(this.beforeStatus="getCode");this.$refs.uCode.canGetCode?(e.showLoading({title:"正在获取验证码"}),setTimeout((function(){e.hideLoading(),e.$u.toast("验证码已发送"),n.$refs.uCode.start()}),2e3)):e.$u.toast("倒计时结束后再发送")}}};n.default=c}).call(this,o(1)["default"])},229:function(e,n,o){"use strict";o.r(n);var t=o(230),u=o.n(t);for(var r in t)"default"!==r&&function(e){o.d(n,e,(function(){return t[e]}))}(r);n["default"]=u.a},230:function(e,n,o){}},[[223,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/register/register.js.map