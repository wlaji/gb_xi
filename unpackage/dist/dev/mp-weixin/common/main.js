(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{12:function(t,e,n){"use strict";n.r(e);var o=n(13),r=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);e["default"]=r.a},13:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=u(n(2)),r=u(n(120));function u(t){return t&&t.__esModule?t:{default:t}}var a={onLaunch:function(e){var n=t.getStorageSync("token");n&&t.getStorage({key:"userinfo",success:function(t){r.default.commit("login",{token:n,userInfo:t.data})}}),t.getSystemInfo({success:function(t){o.default.prototype.statusBar=t.statusBarHeight;var e=wx.getMenuButtonBoundingClientRect();o.default.prototype.customBar=e.top+e.height+8}})},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};e.default=a}).call(this,n(0)["default"])},132:function(t,e,n){"use strict";(function(t){n(3);var e=i(n(134)),o=i(n(2)),r=i(n(120)),u=i(n(136)),a=i(n(137)),c=i(n(138)),f=n(256);function i(t){return t&&t.__esModule?t:{default:t}}function l(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,o)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?l(Object(n),!0).forEach((function(e){p(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function p(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}wx.__webpack_require_UNI_MP_PLUGIN__=n,o.default.mixin(a.default),o.default.config.productionTip=!1,e.default.mpType="app",o.default.prototype.$store=r.default,o.default.prototype.$json=u.default,o.default.use(f.router),o.default.use(c.default);var d=new o.default(s({},e.default));t(d).$mount()}).call(this,n(0)["createApp"])},134:function(t,e,n){"use strict";n.r(e);var o=n(12);for(var r in o)"default"!==r&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n(135);var u,a,c,f,i=n(1),l=Object(i["a"])(o["default"],u,a,!1,null,null,null,!1,c,f);l.options.__file="App.vue",e["default"]=l.exports},135:function(t,e,n){"use strict";var o=n(14),r=n.n(o);r.a},14:function(t,e,n){}},[[132,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map