(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-text/u-text"],{377:function(e,t,n){"use strict";n.r(t);var o=n(378),i=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=i.a},378:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=s(n(284)),i=s(n(249)),u=s(n(250)),l=s(n(251));function s(e){return e&&e.__esModule?e:{default:e}}var r={name:"u--text",mixins:[e.$u.mpMixin,e.$u.mixin,o.default,i.default,u.default,l.default],computed:{valueStyle:function(){var t={textDecoration:this.decoration,fontWeight:this.bold?"bold":"normal",wordWrap:this.wordWrap,fontSize:e.$u.addUnit(this.size)};return!this.type&&(t.color=this.color),this.isNvue&&this.lines&&(t.lines=this.lines),this.lineHeight&&(t.lineHeight=e.$u.addUnit(this.lineHeight)),!this.isNvue&&this.block&&(t.display="block"),e.$u.deepMerge(t,e.$u.addStyle(this.customStyle))},isNvue:function(){var e=!1;return e},isMp:function(){var e=!1;return e=!0,e}},data:function(){return{}},methods:{clickHandler:function(){"phone"===this.mode&&e.$u.test.mobile(this.text)&&e.makePhoneCall({phoneNumber:this.text}),this.$emit("click")}}};t.default=r}).call(this,n(0)["default"])},379:function(e,t,n){},412:function(e,t,n){"use strict";n.r(t);var o=n(447),i=n(377);for(var u in i)"default"!==u&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n(413);var l,s=n(1),r=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"15831087",null,!1,o["a"],l);r.options.__file="node_modules/uview-ui/components/u-text/u-text.vue",t["default"]=r.exports},413:function(e,t,n){"use strict";var o=n(379),i=n.n(o);i.a},447:function(e,t,n){"use strict";var o;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));try{o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,453))},uLink:function(){return Promise.all([n.e("common/vendor"),n.e("node-modules/uview-ui/components/u-link/u-link")]).then(n.bind(null,480))}}}catch(l){if(-1===l.message.indexOf("Cannot find module")||-1===l.message.indexOf(".vue"))throw l;console.error(l.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.show&&"price"===e.mode?e.__get_style([e.valueStyle]):null),o=e.show&&e.prefixIcon?e.$u.addStyle(e.iconStyle):null,i=e.show&&"link"!==e.mode&&e.openType&&e.isMp?e.__get_style([e.valueStyle]):null,u=!e.show||"link"===e.mode||e.openType&&e.isMp?null:e.__get_style([e.valueStyle]),l=e.show&&e.suffixIcon?e.$u.addStyle(e.iconStyle):null;e.$mp.data=Object.assign({},{$root:{s0:n,g0:o,s1:i,s2:u,g1:l}})},u=[];i._withStripped=!0}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-ui/components/u-text/u-text.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-text/u-text-create-component',
    {
        'node-modules/uview-ui/components/u-text/u-text-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('0')['createComponent'](__webpack_require__(412))
        })
    },
    [['node-modules/uview-ui/components/u-text/u-text-create-component']]
]);
