(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/uview-ui/components/u-code/u-code"],{467:function(e,t,n){"use strict";n.r(t);var i=n(468),u=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=u.a},468:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(n(395));function u(e){return e&&e.__esModule?e:{default:e}}var s={name:"u-code",mixins:[e.$u.mpMixin,e.$u.mixin,i.default],data:function(){return{secNum:this.seconds,timer:null,canGetCode:!0}},mounted:function(){this.checkKeepRunning()},watch:{seconds:{immediate:!0,handler:function(e){this.secNum=e}}},methods:{checkKeepRunning:function(){var t=Number(e.getStorageSync(this.uniqueKey+"_$uCountDownTimestamp"));if(!t)return this.changeEvent(this.startText);var n=Math.floor(+new Date/1e3);this.keepRunning&&t&&t>n?(this.secNum=t-n,e.removeStorageSync(this.uniqueKey+"_$uCountDownTimestamp"),this.start()):this.changeEvent(this.startText)},start:function(){var e=this;this.timer&&(clearInterval(this.timer),this.timer=null),this.$emit("start"),this.canGetCode=!1,this.changeEvent(this.changeText.replace(/x|X/,this.secNum)),this.setTimeToStorage(),this.timer=setInterval((function(){--e.secNum?e.changeEvent(e.changeText.replace(/x|X/,e.secNum)):(clearInterval(e.timer),e.timer=null,e.changeEvent(e.endText),e.secNum=e.seconds,e.$emit("end"),e.canGetCode=!0)}),1e3)},reset:function(){this.canGetCode=!0,clearInterval(this.timer),this.secNum=this.seconds,this.changeEvent(this.endText)},changeEvent:function(e){this.$emit("change",e)},setTimeToStorage:function(){if(this.keepRunning&&this.timer&&this.secNum>0&&this.secNum<=this.seconds){var t=Math.floor(+new Date/1e3);e.setStorage({key:this.uniqueKey+"_$uCountDownTimestamp",data:t+Number(this.secNum)})}}},beforeDestroy:function(){this.setTimeToStorage(),clearTimeout(this.timer),this.timer=null}};t.default=s}).call(this,n(0)["default"])},469:function(e,t,n){},543:function(e,t,n){"use strict";var i=n(469),u=n.n(i);u.a},582:function(e,t,n){"use strict";var i;n.d(t,"b",(function(){return u})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var u=function(){var e=this,t=e.$createElement;e._self._c},s=[];u._withStripped=!0},620:function(e,t,n){"use strict";n.r(t);var i=n(582),u=n(467);for(var s in u)"default"!==s&&function(e){n.d(t,e,(function(){return u[e]}))}(s);n(543);var c,a=n(1),o=Object(a["a"])(u["default"],i["b"],i["c"],!1,null,"39e88ef2",null,!1,i["a"],c);o.options.__file="node_modules/uview-ui/components/u-code/u-code.vue",t["default"]=o.exports}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-ui/components/u-code/u-code.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/uview-ui/components/u-code/u-code-create-component',
    {
        'node-modules/uview-ui/components/u-code/u-code-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('0')['createComponent'](__webpack_require__(620))
        })
    },
    [['node-modules/uview-ui/components/u-code/u-code-create-component']]
]);
