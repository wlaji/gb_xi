(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/login"],{107:function(e,n,o){"use strict";var t;o.d(n,"b",(function(){return u})),o.d(n,"c",(function(){return i})),o.d(n,"a",(function(){return t}));try{t={uModal:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-modal/u-modal")]).then(o.bind(null,632))},uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,624))},uForm:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form/u-form")]).then(o.bind(null,633))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,634))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-input/u-input")]).then(o.bind(null,635))},uCode:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-code/u-code")]).then(o.bind(null,636))},uButton:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-button/u-button")]).then(o.bind(null,626))},uCheckboxGroup:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-checkbox-group/u-checkbox-group")]).then(o.bind(null,637))},uCheckbox:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-checkbox/u-checkbox")]).then(o.bind(null,638))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.showModal=!1},e.e1=function(n){e.showModal=!1})},i=[];u._withStripped=!0},24:function(e,n,o){"use strict";o.r(n);var t=o(25),u=o.n(t);for(var i in t)"default"!==i&&function(e){o.d(n,e,(function(){return t[e]}))}(i);n["default"]=u.a},25:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=u(o(5));o(8);function u(e){return e&&e.__esModule?e:{default:e}}function i(e,n,o,t,u,i,r){try{var c=e[i](r),s=c.value}catch(a){return void o(a)}c.done?n(s):Promise.resolve(s).then(t,u)}function r(e){return function(){var n=this,o=arguments;return new Promise((function(t,u){var r=e.apply(n,o);function c(e){i(r,t,u,c,s,"next",e)}function s(e){i(r,t,u,c,s,"throw",e)}c(void 0)}))}}var c={data:function(){return{beforeStatus:"",showModal:!1,tips:"",loading:!1,form:{phone:"",code:""},checked:!1,rules:{phone:[{required:!0,message:"请输入手机号",trigger:["blur"]},{validator:function(n,o,t){return e.$u.test.mobile(o)},message:"手机号码不正确",trigger:["blur"]}],code:[{required:!0,message:"请输入验证码",trigger:["blur"]},{validator:function(n,o,t){return e.$u.test.code(o,6)},message:"验证码格式不正确",trigger:["blur"]}]}}},onLoad:function(){},onReady:function(){this.$refs.form1.setRules(this.rules)},methods:{confirmChecked:function(){this.checked=!0,this.showModal=!1,console.log(this.checked),"getCode"===this.beforeStatus?this.getCode():"toLogin"===this.beforeStatus&&this.toLogin()},getPhoneNumber:function(n){if(this.checked){var o=n.detail.iv,u=n.detail.encryptedData;if(!u)return!1;e.login({provider:"weixin",success:function(){var e=r(t.default.mark((function e(n){return t.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:console.log({code:n.code,encrypData:u,ivData:o});case 1:case"end":return e.stop()}}),e)})));function n(n){return e.apply(this,arguments)}return n}()})}else this.showModal=!0},changeStatus:function(e){this.checked=!this.checked},navBack:function(){e.navigateBack()},toRegist:function(){e.navigateTo({url:"/pages/register/register"})},toLogin:function(){var n=this;if(!this.checked)return this.showModal=!0,void(this.beforeStatus="toLogin");this.$refs.form1.validate().then((function(){e.$u.toast("表单验证成功"),n.loading=!0,setTimeout((function(){n.loading=!1;var o={userInfo:n.form,token:"111111111"};n.$store.commit("login",o),e.switchTab({url:"/pages/index/index"})}),1e3)})).catch((function(e){console.log(e)}))},codeChange:function(e){this.tips=e},getCode:function(){var n=this;if(!this.checked)return this.showModal=!0,void(this.beforeStatus="getCode");this.$refs.uCode.canGetCode?(e.showLoading({title:"正在获取验证码"}),setTimeout((function(){e.hideLoading(),e.$u.toast("验证码已发送"),n.$refs.uCode.start()}),2e3)):e.$u.toast("倒计时结束后再发送")}}};n.default=c}).call(this,o(0)["default"])},26:function(e,n,o){},307:function(e,n,o){"use strict";(function(e){o(3);t(o(2));var n=t(o(308));function t(e){return e&&e.__esModule?e:{default:e}}wx.__webpack_require_UNI_MP_PLUGIN__=o,e(n.default)}).call(this,o(0)["createPage"])},308:function(e,n,o){"use strict";o.r(n);var t=o(107),u=o(24);for(var i in u)"default"!==i&&function(e){o.d(n,e,(function(){return u[e]}))}(i);o(309);var r,c=o(1),s=Object(c["a"])(u["default"],t["b"],t["c"],!1,null,"b237504c",null,!1,t["a"],r);s.options.__file="pages/login/login.vue",n["default"]=s.exports},309:function(e,n,o){"use strict";var t=o(26),u=o.n(t);u.a}},[[307,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map