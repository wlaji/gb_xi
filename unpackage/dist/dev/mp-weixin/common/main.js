(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{12:function(e,t,n){"use strict";n.r(t);var o=n(13),r=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=r.a},13:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=u(n(2)),r=u(n(125));function u(e){return e&&e.__esModule?e:{default:e}}var c={onLaunch:function(t){var n=e.getStorageSync("token");console.log(n),n&&e.getStorage({key:"userInfo",success:function(e){console.log(e),r.default.commit("login",{token:n,userInfo:e.data})}}),e.getSystemInfo({success:function(e){o.default.prototype.statusBar=e.statusBarHeight;var t=wx.getMenuButtonBoundingClientRect();o.default.prototype.customBar=t.top+t.height+8}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=c}).call(this,n(0)["default"])},137:function(e,t,n){"use strict";(function(e){n(3);var t=i(n(139)),o=i(n(2)),r=i(n(125)),u=i(n(141)),c=i(n(142)),a=i(n(143)),f=n(261);function i(e){return e&&e.__esModule?e:{default:e}}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){p(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}wx.__webpack_require_UNI_MP_PLUGIN__=n,o.default.mixin(c.default),o.default.config.productionTip=!1,t.default.mpType="app",o.default.prototype.$store=r.default,o.default.prototype.$json=u.default,o.default.use(f.router),o.default.use(a.default);var d=new o.default(s({},t.default));e(d).$mount()}).call(this,n(0)["createApp"])},139:function(e,t,n){"use strict";n.r(t);var o=n(12);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n(140);var u,c,a,f,i=n(1),l=Object(i["a"])(o["default"],u,c,!1,null,null,null,!1,a,f);l.options.__file="App.vue",t["default"]=l.exports},14:function(e,t,n){},140:function(e,t,n){"use strict";var o=n(14),r=n.n(o);r.a}},[[137,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map