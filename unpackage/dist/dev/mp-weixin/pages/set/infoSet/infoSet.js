(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/set/infoSet/infoSet"],{122:function(n,e,o){},357:function(n,e,o){"use strict";(function(n){o(3);t(o(2));var e=t(o(358));function t(n){return n&&n.__esModule?n:{default:n}}wx.__webpack_require_UNI_MP_PLUGIN__=o,n(e.default)}).call(this,o(0)["createPage"])},358:function(n,e,o){"use strict";o.r(e);var t=o(631),u=o(88);for(var i in u)"default"!==i&&function(n){o.d(e,n,(function(){return u[n]}))}(i);o(632);var r,c=o(1),s=Object(c["a"])(u["default"],t["b"],t["c"],!1,null,"8ac16bfa",null,!1,t["a"],r);s.options.__file="pages/set/infoSet/infoSet.vue",e["default"]=s.exports},631:function(n,e,o){"use strict";var t;o.d(e,"b",(function(){return u})),o.d(e,"c",(function(){return i})),o.d(e,"a",(function(){return t}));try{t={uAvatar:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-avatar/u-avatar")]).then(o.bind(null,602))},uForm:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form/u-form")]).then(o.bind(null,609))},uFormItem:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-form-item/u-form-item")]).then(o.bind(null,610))},uInput:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-input/u-input")]).then(o.bind(null,611))},uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,598))},uButton:function(){return Promise.all([o.e("common/vendor"),o.e("node-modules/uview-ui/components/u-button/u-button")]).then(o.bind(null,600))}}}catch(r){if(-1===r.message.indexOf("Cannot find module")||-1===r.message.indexOf(".vue"))throw r;console.error(r.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var u=function(){var n=this,e=n.$createElement;n._self._c},i=[];u._withStripped=!0},632:function(n,e,o){"use strict";var t=o(122),u=o.n(t);u.a},88:function(n,e,o){"use strict";o.r(e);var t=o(89),u=o.n(t);for(var i in t)"default"!==i&&function(n){o.d(e,n,(function(){return t[n]}))}(i);e["default"]=u.a},89:function(n,e,o){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=o(633),u={data:function(){return{show:!1,form:{nickname:"小鱼人",sex:"女"},sexList:[[{label:"男",id:0},{label:"女",id:1}]]}},methods:{showAction:function(){var e=this;n.showActionSheet({itemList:["男","女"],success:function(n){console.log(n),0===n.tapIndex?e.form.sex="男":1===n.tapIndex&&(e.form.sex="女")},fail:function(n){console.log(n.errMsg)}})},uploadAvatar:function(){var e=this;n.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:function(o){n.showLoading({title:"上传中..."}),t.ossUtils.uploadFile(o).then((function(n){e.$emit("addImg",n)})).catch((function(n){console.log(n)})).finally((function(){n.hideLoading()}))}})},save:function(){}}};e.default=u}).call(this,o(0)["default"])}},[[357,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/set/infoSet/infoSet.js.map