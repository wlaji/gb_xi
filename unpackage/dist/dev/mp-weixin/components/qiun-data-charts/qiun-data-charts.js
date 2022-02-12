(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/qiun-data-charts/qiun-data-charts"],{708:function(t,e,i){"use strict";i.r(e);var a=i(709),o=i(711);for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i(717);var r,s=i(47),c=Object(s["default"])(o["default"],a["render"],a["staticRenderFns"],!1,null,"f10dbef8",null,!1,a["components"],r);c.options.__file="components/qiun-data-charts/qiun-data-charts.vue",e["default"]=c.exports},709:function(t,e,i){"use strict";i.r(e);var a=i(710);i.d(e,"render",(function(){return a["render"]})),i.d(e,"staticRenderFns",(function(){return a["staticRenderFns"]})),i.d(e,"recyclableRender",(function(){return a["recyclableRender"]})),i.d(e,"components",(function(){return a["components"]}))},710:function(t,e,i){"use strict";var a;i.r(e),i.d(e,"render",(function(){return o})),i.d(e,"staticRenderFns",(function(){return r})),i.d(e,"recyclableRender",(function(){return n})),i.d(e,"components",(function(){return a}));try{a={qiunLoading:function(){return i.e("components/qiun-loading/qiun-loading").then(i.bind(null,832))},qiunError:function(){return i.e("components/qiun-error/qiun-error").then(i.bind(null,837))}}}catch(s){if(-1===s.message.indexOf("Cannot find module")||-1===s.message.indexOf(".vue"))throw s;console.error(s.message),console.error("1. 排查组件名称拼写是否正确"),console.error("2. 排查组件是否符合 easycom 规范，文档：https://uniapp.dcloud.net.cn/collocation/pages?id=easycom"),console.error("3. 若组件不符合 easycom 规范，需手动引入，并在 components 中注册该组件")}var o=function(){var t=this,e=t.$createElement;t._self._c},n=!1,r=[];o._withStripped=!0},711:function(t,e,i){"use strict";i.r(e);var a=i(712),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},712:function(t,e,i){"use strict";(function(t,a){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=r(i(715)),n=r(i(716));function r(t){return t&&t.__esModule?t:{default:t}}function s(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length,i=new Array(e>1?e-1:0),a=1;a<e;a++)i[a-1]=arguments[a];for(var o in i)for(var n in i[o])i[o].hasOwnProperty(n)&&(t[n]=i[o][n]&&"object"===typeof i[o][n]?s(Array.isArray(i[o][n])?[]:{},t[n],i[o][n]):i[o][n]);return t}function c(t,e){for(var i in t)"object"===typeof t[i]?c(t[i],e):"format"===i&&"string"===typeof t[i]&&(t["formatter"]=e[t[i]]?e[t[i]]:void 0);return t}function l(t){var e="-",i=t.getFullYear(),a=t.getMonth()+1,o=t.getDate();a>=1&&a<=9&&(a="0"+a),o>=0&&o<=9&&(o="0"+o);var n=i+e+a+e+o;return n}var h=null,u={name:"qiun-data-charts",mixins:[t.mixinDatacom],props:{type:{type:String,default:null},canvasId:{type:String,default:"uchartsid"},canvas2d:{type:Boolean,default:!1},background:{type:String,default:"none"},animation:{type:Boolean,default:!0},chartData:{type:Object,default:function(){return{categories:[],series:[]}}},opts:{type:Object,default:function(){return{}}},eopts:{type:Object,default:function(){return{}}},loadingType:{type:Number,default:2},errorShow:{type:Boolean,default:!0},errorMessage:{type:String,default:null},inScrollView:{type:Boolean,default:!1},reshow:{type:Boolean,default:!1},reload:{type:Boolean,default:!1},disableScroll:{type:Boolean,default:!1},ontap:{type:Boolean,default:!0},ontouch:{type:Boolean,default:!1},onmouse:{type:Boolean,default:!0},onmovetip:{type:Boolean,default:!1},echartsH5:{type:Boolean,default:!1},echartsApp:{type:Boolean,default:!1},tooltipShow:{type:Boolean,default:!0},tooltipFormat:{type:String,default:void 0},tooltipCustom:{default:void 0},startDate:{type:String,default:void 0},endDate:{type:String,default:void 0},textEnum:{type:Array,default:function(){return[]}},groupEnum:{type:Array,default:function(){return[]}},pageScrollTop:{type:Number,default:0},directory:{type:String,default:"/"}},data:function(){return{cid:"uchartsid",inWx:!1,inAli:!1,inTt:!1,inBd:!1,inH5:!1,inApp:!1,type2d:!0,disScroll:!1,pixel:1,cWidth:375,cHeight:250,showchart:!1,echarts:!1,echartsResize:!1,uchartsOpts:{},echartsOpts:{},drawData:{},lastDrawTime:null}},created:function(){if(this.cid=this.canvasId,"uchartsid"==this.canvasId||""==this.canvasId){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=t.length,i="",o=0;o<32;o++)i+=t.charAt(Math.floor(Math.random()*e));this.cid=i}this.inWx=!0,!1===this.canvas2d?this.type2d=!1:(this.pixel=a.getSystemInfoSync().pixelRatio,"uchartsid"!==this.canvasId&&""!=this.canvasId||console.log("[uCharts]:开启canvas2d模式，必须指定canvasId，否则会出现偶尔获取不到dom节点的问题！")),this.disScroll=this.disableScroll},mounted:function(){var t=this;this.$nextTick((function(){t.beforeInit()})),a.onWindowResize((function(e){if(1!=t.mixinDatacomLoading){var i=t.mixinDatacomErrorMessage;null!==i&&"null"!==i&&""!==i||setTimeout((function(){t.echarts?t.echartsResize=!t.echartsResize:t.resizeHandler()}),200)}}))},destroyed:function(){!0===this.echarts?(delete cfe.option[this.cid],delete cfe.instance[this.cid]):(delete n.default.option[this.cid],delete n.default.instance[this.cid]),a.offWindowResize((function(){}))},watch:{chartDataProps:{handler:function(t,e){"object"===typeof t?JSON.stringify(t)!==JSON.stringify(e)&&(t.series&&t.series.length>0?this.beforeInit():(this.mixinDatacomLoading=!0,this.showchart=!1,this.mixinDatacomErrorMessage=null)):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：chartData数据类型错误")},immediate:!1,deep:!0},localdata:{handler:function(t,e){JSON.stringify(t)!==JSON.stringify(e)&&(t.length>0?this.beforeInit():(this.mixinDatacomLoading=!0,this.showchart=!1,this.mixinDatacomErrorMessage=null))},immediate:!1,deep:!0},optsProps:{handler:function(t,e){"object"===typeof t?JSON.stringify(t)!==JSON.stringify(e)&&!1===this.echarts&&this.checkData(this.drawData):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：opts数据类型错误")},immediate:!1,deep:!0},eoptsProps:{handler:function(t,e){"object"===typeof t?JSON.stringify(t)!==JSON.stringify(e)&&!0===this.echarts&&this.checkData(this.drawData):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：eopts数据类型错误")},immediate:!1,deep:!0},reshow:function(t,e){var i=this;!0===t&&!1===this.mixinDatacomLoading&&setTimeout((function(){i.showchart=!0,i.mixinDatacomErrorMessage=null,i.echartsResize=!i.echartsResize,i.checkData(i.drawData)}),200)},reload:function(t,e){!0===t&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,this.reloading())},mixinDatacomErrorMessage:function(t,e){t&&(this.emitMsg({name:"error",params:{type:"error",errorShow:this.errorShow,msg:t,id:this.cid}}),this.errorShow&&console.log("[秋云图表组件]"+t))},errorMessage:function(t,e){t&&this.errorShow&&null!==t&&"null"!==t&&""!==t?(this.showchart=!1,this.mixinDatacomLoading=!1,this.mixinDatacomErrorMessage=t):(this.showchart=!1,this.mixinDatacomErrorMessage=null,this.reloading())}},computed:{optsProps:function(){return JSON.parse(JSON.stringify(this.opts))},eoptsProps:function(){return JSON.parse(JSON.stringify(this.eopts))},chartDataProps:function(){return JSON.parse(JSON.stringify(this.chartData))}},methods:{beforeInit:function(){this.mixinDatacomErrorMessage=null,"object"===typeof this.chartData&&null!=this.chartData&&void 0!==this.chartData.series&&this.chartData.series.length>0?(this.mixinDatacomLoading=!0,this.drawData=s({},this.chartData),this.checkData(this.chartData)):this.localdata.length>0?(this.mixinDatacomLoading=!0,this.localdataInit(this.localdata)):""!==this.collection?(this.mixinDatacomLoading=!1,this.getCloudData()):this.mixinDatacomLoading=!0},localdataInit:function(t){if(this.groupEnum.length>0)for(var e=0;e<t.length;e++)for(var i=0;i<this.groupEnum.length;i++)t[e].group===this.groupEnum[i].value&&(t[e].group=this.groupEnum[i].text);if(this.textEnum.length>0)for(var a=0;a<t.length;a++)for(var o=0;o<this.textEnum.length;o++)t[a].text===this.textEnum[o].value&&(t[a].text=this.textEnum[o].text);var r=!1,c={categories:[],series:[]},h=[],u=[];if(r=!0===this.echarts?cfe.categories.includes(this.type):n.default.categories.includes(this.type),!0===r){if(this.chartData&&this.chartData.categories&&this.chartData.categories.length>0)h=this.chartData.categories;else if(this.startDate&&this.endDate){var d=new Date(this.startDate),f=new Date(this.endDate);while(d<=f)h.push(l(d)),d=d.setDate(d.getDate()+1),d=new Date(d)}else{var p={};t.map((function(t,e){void 0==t.text||p[t.text]||(h.push(t.text),p[t.text]=!0)}))}c.categories=h}var m={};if(t.map((function(t,e){void 0==t.group||m[t.group]||(u.push({name:t.group,data:[]}),m[t.group]=!0)})),0==u.length)if(u=[{name:"默认分组",data:[]}],!0===r)for(var g=0;g<h.length;g++){for(var x=0,y=0;y<t.length;y++)t[y].text==h[g]&&(x=t[y].value);u[0].data.push(x)}else for(var v=0;v<t.length;v++)u[0].data.push({name:t[v].text,value:t[v].value});else for(var D=0;D<u.length;D++)if(h.length>0)for(var w=0;w<h.length;w++){for(var S=0,T=0;T<t.length;T++)u[D].name==t[T].group&&t[T].text==h[w]&&(S=t[T].value);u[D].data.push(S)}else for(var b=0;b<t.length;b++)u[D].name==t[b].group&&u[D].data.push(t[b].value);c.series=u,this.drawData=s({},c),this.checkData(c)},reloading:function(){this.showchart=!1,this.mixinDatacomErrorMessage=null,""!==this.collection?(this.mixinDatacomLoading=!1,this.onMixinDatacomPropsChange(!0)):this.beforeInit()},checkData:function(t){var e=this,i=this.cid;!0===this.echarts?(this.type&&cfe.type.includes(this.type)?cfe.option[i]=s({},cfe[this.type],this.eopts):cfe.option[i]=s({},this.eopts),cfe.option[i].id=i):this.type&&n.default.type.includes(this.type)?(n.default.option[i]=s({},n.default[this.type],this.opts),n.default.option[i].canvasId=i):(this.mixinDatacomLoading=!1,this.showchart=!1,this.mixinDatacomErrorMessage="参数错误：props参数中type类型不正确");var a=s({},t);if(void 0!==a.series&&a.series.length>0)if(this.mixinDatacomErrorMessage=null,!0===this.echarts){cfe.option[i].xAxis&&cfe.option[i].xAxis.type&&"category"===cfe.option[i].xAxis.type&&(cfe.option[i].xAxis.data=a.categories),cfe.option[i].yAxis&&cfe.option[i].yAxis.type&&"category"===cfe.option[i].yAxis.type&&(cfe.option[i].yAxis.data=a.categories),cfe.option[i].series=[];for(var o=0;o<a.series.length;o++){cfe.option[i].seriesTemplate=cfe.option[i].seriesTemplate?cfe.option[i].seriesTemplate:{};var r=s({},cfe.option[i].seriesTemplate,a.series[o]);cfe.option[i].series.push(r)}this.$nextTick((function(){e.init()}))}else n.default.option[i].categories=a.categories,n.default.option[i].series=a.series,this.$nextTick((function(){e.init()}))},resizeHandler:function(){var t=this,e=Date.now(),i=this.lastDrawTime?this.lastDrawTime:e-3e3,o=e-i;if(!(o<1e3))a.createSelectorQuery().in(this).select("#ChartBoxId"+this.cid).boundingClientRect((function(e){t.showchart=!0,e.width>0&&e.height>0&&(e.width===t.cWidth&&e.height===t.cHeight||t.checkData(t.drawData))})).exec()},getCloudData:function(){var t=this;1!=this.mixinDatacomLoading&&(this.mixinDatacomLoading=!0,this.mixinDatacomGet().then((function(e){t.mixinDatacomResData=e.result.data,t.localdataInit(t.mixinDatacomResData)})).catch((function(e){t.mixinDatacomLoading=!1,t.showchart=!1,t.mixinDatacomErrorMessage="请求错误："+e})))},onMixinDatacomPropsChange:function(t,e){1==t&&""!==this.collection&&(this.showchart=!1,this.mixinDatacomErrorMessage=null,this._clearChart(),this.getCloudData())},_clearChart:function(){var t=this.cid;if(!0!==this.echrts){var e=a.createCanvasContext(t,this);e.clearRect(0,0,this.cWidth,this.cHeight),e.draw()}},init:function(){var t=this,e=this.cid;a.createSelectorQuery().in(this).select("#ChartBoxId"+e).boundingClientRect((function(i){i.width>0&&i.height>0?(t.lastDrawTime=Date.now(),t.cWidth=i.width,t.cHeight=i.height,!0!==t.echarts&&(n.default.option[e].background="none"==t.background?"#FFFFFF":t.background,n.default.option[e].canvas2d=t.type2d,n.default.option[e].pixelRatio=t.pixel,n.default.option[e].animation=t.animation,n.default.option[e].width=i.width*t.pixel,n.default.option[e].height=i.height*t.pixel,n.default.option[e].ontap=t.ontap,n.default.option[e].ontouch=t.ontouch,n.default.option[e].onmouse=t.onmouse,n.default.option[e].onmovetip=t.onmovetip,n.default.option[e].tooltipShow=t.tooltipShow,n.default.option[e].tooltipFormat=t.tooltipFormat,n.default.option[e].tooltipCustom=t.tooltipCustom,n.default.option[e].inScrollView=t.inScrollView,n.default.option[e].lastDrawTime=t.lastDrawTime),t.inH5||t.inApp?1==t.echarts?(t.mixinDatacomLoading=!1,t.showchart=!0,cfe.option[e].ontap=t.ontap,cfe.option[e].onmouse=t.onmouse,cfe.option[e].tooltipShow=t.tooltipShow,cfe.option[e].tooltipFormat=t.tooltipFormat,cfe.option[e].tooltipCustom=t.tooltipCustom,cfe.option[e].lastDrawTime=t.lastDrawTime,cfe.option[e].rotateLock=cfe.option[e].rotate,t.echartsOpts=s({},cfe.option[e])):(n.default.option[e].rotateLock=n.default.option[e].rotate,t.mixinDatacomLoading=!1,t.showchart=!0,t.uchartsOpts=s({},n.default.option[e])):(n.default.option[e]=c(n.default.option[e],n.default.formatter),t.mixinDatacomErrorMessage=null,t.mixinDatacomLoading=!1,t.showchart=!0,t.$nextTick((function(){if(!0===t.type2d){var o=a.createSelectorQuery().in(t);o.select("#"+e).fields({node:!0,size:!0}).exec((function(a){if(a[0]){var o=a[0].node,r=o.getContext("2d");n.default.option[e].context=r,o.width=i.width*t.pixel,o.height=i.height*t.pixel,o._width=i.width*t.pixel,o._height=i.height*t.pixel,n.default.option[e].rotateLock=n.default.option[e].rotate,t._newChart(e)}else t.showchart=!1,t.mixinDatacomErrorMessage="参数错误：开启2d模式后，未获取到dom节点，canvas-id:"+e}))}else t.inAli&&(n.default.option[e].rotateLock=n.default.option[e].rotate),n.default.option[e].context=a.createCanvasContext(e,t),t._newChart(e)})))):(t.mixinDatacomLoading=!1,t.showchart=!1,1==t.reshow&&(t.mixinDatacomErrorMessage="布局错误：未获取到父元素宽高尺寸！canvas-id:"+e))})).exec()},saveImage:function(){a.canvasToTempFilePath({canvasId:this.cid,success:function(t){a.saveImageToPhotosAlbum({filePath:t.tempFilePath,success:function(){a.showToast({title:"保存成功",duration:2e3})}})}},this)},_newChart:function(t){var e=this;1!=this.mixinDatacomLoading&&(this.showchart=!0,n.default.instance[t]=new o.default(n.default.option[t]),n.default.instance[t].addEventListener("renderComplete",(function(){e.emitMsg({name:"complete",params:{type:"complete",complete:!0,id:t}}),n.default.instance[t].delEventListener("renderComplete")})),n.default.instance[t].addEventListener("scrollLeft",(function(){e.emitMsg({name:"scrollLeft",params:{type:"scrollLeft",scrollLeft:!0,id:t}})})),n.default.instance[t].addEventListener("scrollRight",(function(){e.emitMsg({name:"scrollRight",params:{type:"scrollRight",scrollRight:!0,id:t}})})))},_tooltipDefault:function(t,e,i,a){if(e){var o=t.data;return"object"===typeof t.data&&(o=t.data.value),e+" "+t.name+":"+o}return void 0!==t.properties?t.properties.name:t.name+":"+t.data},_showTooltip:function(t){var e=this,i=this.cid,a=n.default.option[i].tooltipCustom;if(a&&void 0!==a&&null!==a){var o=void 0;a.x>=0&&a.y>=0&&(o={x:a.x,y:a.y+10}),n.default.instance[i].showToolTip(t,{index:a.index,offset:o,textList:a.textList,formatter:function(t,a,o,r){return"string"===typeof n.default.option[i].tooltipFormat&&n.default.formatter[n.default.option[i].tooltipFormat]?n.default.formatter[n.default.option[i].tooltipFormat](t,a,o,r):e._tooltipDefault(t,a,o,r)}})}else n.default.instance[i].showToolTip(t,{formatter:function(t,a,o,r){return"string"===typeof n.default.option[i].tooltipFormat&&n.default.formatter[n.default.option[i].tooltipFormat]?n.default.formatter[n.default.option[i].tooltipFormat](t,a,o,r):e._tooltipDefault(t,a,o,r)}})},_tap:function(t,e){var i=this,o=this.cid,r=null,s=null;if(!0===this.inScrollView||this.inAli)a.createSelectorQuery().in(this).select("#ChartBoxId"+o).boundingClientRect((function(a){t.changedTouches=[],i.inAli?t.changedTouches.unshift({x:t.detail.pageX-a.left,y:t.detail.pageY-a.top}):t.changedTouches.unshift({x:t.detail.x-a.left,y:t.detail.y-a.top-i.pageScrollTop}),e?!0===i.tooltipShow&&i._showTooltip(t):(r=n.default.instance[o].getCurrentDataIndex(t),s=n.default.instance[o].getLegendDataIndex(t),n.default.instance[o].touchLegend(t),!0===i.tooltipShow&&i._showTooltip(t),i.emitMsg({name:"getIndex",params:{type:"getIndex",event:{x:t.detail.x-a.left,y:t.detail.y-a.top},currentIndex:r,legendIndex:s,id:o}}))})).exec();else e?!0===this.tooltipShow&&this._showTooltip(t):(t.changedTouches=[],t.changedTouches.unshift({x:t.detail.x-t.currentTarget.offsetLeft,y:t.detail.y-t.currentTarget.offsetTop}),r=n.default.instance[o].getCurrentDataIndex(t),s=n.default.instance[o].getLegendDataIndex(t),n.default.instance[o].touchLegend(t),!0===this.tooltipShow&&this._showTooltip(t),this.emitMsg({name:"getIndex",params:{type:"getIndex",event:{x:t.detail.x,y:t.detail.y-t.currentTarget.offsetTop},currentIndex:r,legendIndex:s,id:o}}))},_touchStart:function(t){var e=this.cid;h=Date.now(),!0===n.default.option[e].enableScroll&&n.default.instance[e].scrollStart(t),this.emitMsg({name:"getTouchStart",params:{type:"touchStart",event:t.changedTouches[0],id:e}})},_touchMove:function(t){var e=this.cid,i=Date.now(),a=i-h;a<Math.floor(1e3/60)||(h=i,!0===n.default.option[e].enableScroll&&n.default.instance[e].scroll(t),this.emitMsg({name:"getTouchMove",params:{type:"touchMove",event:t.changedTouches[0],id:e}}),!0===this.ontap&&!1===n.default.option[e].enableScroll&&!0===this.onmovetip&&this._tap(t,!0))},_touchEnd:function(t){var e=this.cid;!0===n.default.option[e].enableScroll&&n.default.instance[e].scrollEnd(t),this.emitMsg({name:"getTouchEnd",params:{type:"touchEnd",event:t.changedTouches[0],id:e}}),!0===this.ontap&&!1===n.default.option[e].enableScroll&&!0===this.onmovetip&&this._tap(t,!0)},_error:function(t){this.mixinDatacomErrorMessage=t.detail.errMsg},emitMsg:function(t){this.$emit(t.name,t.params)},getRenderType:function(){!0===this.echarts&&!1===this.mixinDatacomLoading&&this.beforeInit()},toJSON:function(){return this}}};e.default=u}).call(this,i(713)["default"],i(1)["default"])},717:function(t,e,i){"use strict";i.r(e);var a=i(718),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},718:function(t,e,i){}}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/qiun-data-charts/qiun-data-charts.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/qiun-data-charts/qiun-data-charts-create-component',
    {
        'components/qiun-data-charts/qiun-data-charts-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(708))
        })
    },
    [['components/qiun-data-charts/qiun-data-charts-create-component']]
]);
