/**
 * @author 133987(1981_khj@emart.com, 1981_khj@naver.com)
 * @desc http://svn.ssgadm.com/ssgui/01.ssg/pcweb/trunk/product/SG-product-A-001-01_renew.html
 */

//tabs
!function(n){jQuery.fn.tabs=function(e){var a={sActiveClass:"on",elTabBtn:">li",elTabPanel:">div>div",elFilter:"a",nDefaultIndex:0,fnChange:null},i=n.extend({},a,e);return this.each(function(){var e=n(this),a=e.find(i.elTabBtn),t=e.find(i.elTabPanel),l=i.sActiveClass;a.on("click",i.elFilter,function(e){e.preventDefault();var s=n(this),r=a.index(s.parent());return s.parent().hasClass(l)?!1:(s.parent().addClass(l).siblings().removeClass(l),t.hide().eq(r).show(),void(n.isFunction(i.fnChange)&&i.fnChange.call(this,t.eq(r))))})})}}(jQuery);
//waypoints
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
//sticky
!function(){"use strict";function t(s){this.options=e.extend({},i.defaults,t.defaults,s),this.element=this.options.element,this.$element=e(this.element),this.createWrapper(),this.createWaypoint()}var e=window.jQuery,i=window.Waypoint;t.prototype.createWaypoint=function(){var t=this.options.handler;this.waypoint=new i(e.extend({},this.options,{element:this.wrapper,handler:e.proxy(function(e){var i=this.options.direction.indexOf(e)>-1,s=i?this.$element.outerHeight(!0):"";this.$wrapper.height(s),this.$element.toggleClass(this.options.stuckClass,i),t&&t.call(this,e)},this)}))},t.prototype.createWrapper=function(){this.options.wrapper&&this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},t.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass),this.options.wrapper&&this.$element.unwrap())},t.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},i.Sticky=t}();
//dropbox
!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){"use strict";var t="dropdown",s={originalHidden:!1,printPlaceHolder:!0,targetArea:e(),disableClass:"disabled",selectSuffix:"-selected",listSuffix:"-list",items:"ul",item:"li",onChanged:e.noop,onInit:e.noop,onDestroy:e.noop,onRefreshed:e.noop},i=function(){function i(i,n){this.el=i,this.wel=e(this.el),this.options=e.extend({},s,n),this._defaults=s,this._name=t,this.init()}return i.prototype={option:function(e,t){return t?void(this.options[e]=t):this.options[e]},hook:function(e){void 0!==this.options[e]&&this.options[e].call(this)},init:function(){this.options.originalHidden&&this.wel.hide(),this._create(),this.hook("onInit")},_create:function(){this.wel.is("select")&&(this._sTemplate=this.wel.data("template"),this._cacheTempalte(),this._checkSelected(),this._makeData(),this._assignElement(),this._appendElements(),this._checkDisabled(),this._checkHiddenElements(),this._attachEventHandlers())},_cacheTempalte:function(){e(this.wel.data("template")).template(this._sTemplate+"tpl"),e(this.wel.data("template")+this.options.selectSuffix).template(this._sTemplate+"tplSelected"),e(this.wel.data("template")+this.options.listSuffix).template(this._sTemplate+"tplList")},_checkSelected:function(){-1===this.wel.prop("selectedIndex")&&this.wel.prop("selectedIndex",0)},_makeData:function(){var t=this;this.selectData={placeholder:null,selected:null,items:[]},this.selectedIndex=0,e.each(this.wel.find("option"),function(s,i){var n=e(i),l={value:n.attr("value"),label:n.text(),selected:n.is(":selected"),disabled:n.is(":disabled")},o=n.data();e.each(o,function(e,t){l[e]=t}),n.is(":selected")&&(t.selectData.selected=l,t.selectedIndex=s),0==s&&(t.selectData.placeholder=l.label),t.selectData.items.push(l)})},_assignElement:function(){this.welTargetSelect=e(this.wel.data("target")),this.$select=e.tmpl(this._sTemplate+"tplSelected",this.selectData.selected),this.$selectWrap=e.tmpl(this._sTemplate+"tpl",this.selectData)},_checkHiddenElements:function(){"T"===this.wel.data("hidden")&&this.$selectWrap.hide(0)},_checkDisabled:function(){this._isDisabled()&&this.$select.addClass(this.options.disableClass)},_appendElements:function(){this.options.targetArea.length?this.$selectWrap.appendTo(this.options.targetArea):this.wel.after(this.$selectWrap)},_removeElements:function(){this.$select.remove(),this.$selectWrap.remove()},_attachEventHandlers:function(){this.wel.on("change."+t,e.proxy(this._onChangeSelect,this)),this.$selectWrap.on("click."+t,this.options.item,e.proxy(this._onClickItem,this)),this.$selectWrap.on("click."+t,'li.disabled a[href="#"]',function(e){e.preventDefault()}),this.$selectWrap.on("click."+t,'li.stock a[href="#"]',function(e){e.preventDefault()}),this.$selectWrap.on("click."+t,"._drop_select",e.proxy(this._onClickSelect,this)),this.wel.on("refreshList."+t,e.proxy(this._onRefreshList,this)),this.wel.on("refreshLabel."+t,e.proxy(this._onRefreshLabel,this)),this.wel.on("sync."+t,e.proxy(this._onSync,this)),this.wel.on("close."+t,e.proxy(this._onClose,this)),this.wel.on("open."+t,e.proxy(this._onOpen,this)),this.wel.on("destroy."+t,e.proxy(this._onDestroy,this))},_onChangeSelect:function(t){this._chooseItemByIdx(e(t.currentTarget).find("option:selected").index())},_onSync:function(){this._makeData(),this._renderSelect(),this._renderList(),this._checkDisabled(),this.hook("onSync")},_onOpen:function(){this.hook("onOpen")},_onClose:function(){this.hook("onClose")},_onDestroy:function(){this.destroy(),this.hook("onDestroy")},_onClickSelect:function(e){e.preventDefault(),this.$select.hasClass(this.options.disableClass)?this.wel.trigger("openFail."+t):this.hook("onClickSelect")},_onClickItem:function(e){e.preventDefault(),this._chooseItem(e.currentTarget)},_chooseItemByIdx:function(e){var t=this.selectData.items[e]||"";this._printSelect(t.label),this.selectedIndex=e,this.wel.val(t.value)},_printSelect:function(e){},_renderSelect:function(){e.tmpl(this._sTemplate+"tplSelected",this.selectData.selected).appendTo(this.$selectWrap.find("._drop_select").empty())},_renderList:function(){e.tmpl(this._sTemplate+"tplList",{items:this.selectData.items}).appendTo(this.$selectWrap.find("._drop_list").empty())},_chooseItem:function(t){var s=e(t).data("index"),i=this.selectData.items[s];this.selectedIndex=s,this.wel.val(i.value),this.hook("onChanged")},_isDisabled:function(){return this.wel[0].disabled},show:function(){this.$selectWrap.show(0)},hide:function(){this.$selectWrap.hide(0)},enable:function(){this.wel.prop("disabled",!1),this.$select.removeClass(this.options.disableClass)},disable:function(){this.wel.prop("disabled",!0),this.$select.addClass(this.options.disableClass)},destroy:function(){this._removeElements(),e.data(this.el,"plugin_"+t)&&e.data(this.el,"plugin_"+t,null)}},i}();e.fn[t]=function(s){var n=arguments;if(void 0===s||"object"==typeof s)return this.each(function(){e.data(this,"plugin_"+t)||e.data(this,"plugin_"+t,new i(this,s))});if("string"==typeof s&&"_"!==s[0]&&"init"!==s){var l;return this.each(function(){var o=e.data(this,"plugin_"+t);o instanceof i&&"function"==typeof o[s]?l=o[s].apply(o,Array.prototype.slice.call(n,1)):e.error("Method "+s+" does not exist"),"destroy"===s&&e.data(this,"plugin_"+t,null)}),void 0!==l?l:this}}});
//throttle
!function(n,t){"$:nomunge";var u,e=n.jQuery||n.Cowboy||(n.Cowboy={});e.throttle=u=function(n,u,o,i){function r(){function e(){c=+new Date,o.apply(f,d)}function r(){a=t}var f=this,g=+new Date-c,d=arguments;i&&!a&&e(),a&&clearTimeout(a),i===t&&g>n?e():u!==!0&&(a=setTimeout(i?r:e,i===t?n-g:n))}var a,c=0;return"boolean"!=typeof u&&(i=o,o=u,u=t),e.guid&&(r.guid=o.guid=o.guid||e.guid++),r},e.debounce=function(n,e,o){return o===t?u(n,e,!1):u(n,o,e!==!1)}}(this);
//Object.keys(obj)
Object.keys||(Object.keys=function(){"use strict";var t=Object.prototype.hasOwnProperty,r=!{toString:null}.propertyIsEnumerable("toString"),e=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],o=e.length;return function(n){if("object"!=typeof n&&("function"!=typeof n||null===n))throw new TypeError("Object.keys called on non-object");var c,l,p=[];for(c in n)t.call(n,c)&&p.push(c);if(r)for(l=0;o>l;l++)t.call(n,e[l])&&p.push(e[l]);return p}}());
//clickout
(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
//ssgPlayer
!function(t,i,e,s){"use strict";function o(i,e){this.element=i,this.settings=t.extend({},n,e),this._defaults=n,this._name=l,this.init()}var l="ssgPlayer",n={propertyName:"value",flowSrc:{src:"http://ucc.ssgcdn.com/player/flowplayer.commercial-3.2.18.swf",wmode:"transparent"},flowOptions:{keys:["#$6d4bb9ac8473f0a6744","#$8a86fe24ebc08c5b7ab","#$5b46f6b682c23ca3dde","#$38859356887beba2e6c"],plugins:{pseudo:{url:"http://ucc.ssgcdn.com/player/flowplayer.pseudostreaming-3.2.13.swf"},controls:{opacity:0,backgroundColor:"rgba(0, 0, 0, 0.5)"}},canvas:{backgroundColor:"#ffffff"},play:{url:"http://static.ssgcdn.com/ui/ssg/img/common/btn_movplay_b.png",width:89,height:89,replayLabel:null},buffering:!1,clip:{provider:"pseudo"},playlist:[{url:"",scaling:"orig"},{url:"",scaling:"orig",autoPlay:!1,controls:{opacity:1}}]}};t.extend(o.prototype,{bPosterClick:!1,init:function(){this._assignElements(),this._attachEventHandlers()},_assignElements:function(){this.welement=t(this.element),this.welPoster=this.welement.find(".thmb_mov"),this.welPosterImg=this.welPoster.find("img.movie_thumb"),this.welVideoView=this.welement.find(".cdtl_videoview"),this.welVideoBox=this.welVideoView.find(".videobox")},_attachEventHandlers:function(){var t=this;this.welPoster.on("click","button",function(){t.bPosterClick=!0,t.welPoster.hide(),t._oPlayer?(t._oPlayer.show(),t._oPlayer.play(1),t.revealVideoViewStyle()):t.makeFlowPlayer()})},concealVideoViewStyle:function(){this.welVideoView.css({visibility:"",zIndex:""})},revealVideoViewStyle:function(){this.welVideoView.css({visibility:"visible",zIndex:"1"})},makeFlowPlayer:function(){var t=this;this.settings.flowOptions.playlist[0].url=this.welPosterImg.attr("src"),this.settings.flowOptions.playlist[1].url=this.welPoster.find("button").data("videoSrc"),this.settings.flowOptions.onLoad=function(){t.bPosterClick&&(this.play(1),t.bPosterClick=!1)},this.settings.flowOptions.playlist[1].onFinish=function(){this.close(),this.play(0)},this.revealVideoViewStyle(),this._oPlayer=flowplayer(this.welVideoBox.get(0),this.settings.flowSrc,this.settings.flowOptions)},stop:function(){this._oPlayer&&this._oPlayer.isPlaying()&&(this._oPlayer.pause(),this._oPlayer.close(),this._oPlayer.play(0))},reset:function(){this._oPlayer&&(this._oPlayer.play(1),this._oPlayer.unload()),this.concealVideoViewStyle(),this.welPoster.show()}}),t.fn[l]=function(i,e){return this.each(function(){t.data(this,"plugin_"+l)?t.isFunction(o.prototype[i])&&t.data(this,"plugin_"+l)[i](e):t.data(this,"plugin_"+l,new o(this,i))})}}(jQuery,window,document);
//clearInput
!function(t,e,n,i){function s(e,n){this.element=e,this.$element=t(e),this.options=t.extend({},o,n),this._defaults=o,this._name=l,this.init()}t.support.placeholder=function(){var t=n.createElement("input");return"placeholder"in t}();var l="clearInput",o={returnFocus:!0};s.prototype={init:function(){this.attachEventHandlers()},attachEventHandlers:function(){this.$element.on("focus",t.proxy(this._onFocusInput,this)),this.$element.on("keyup",t.proxy(this._onKeyUpInput,this)),this.$element.next("button").on("click",t.proxy(this._onClickClearBtn,this))},_onFocusInput:function(){t.support.placeholder?this.$element.parent().toggleClass("on",this.$element.val().length>=1):this.$element.parent().toggleClass("on",this.$element.val()!==this.$element.attr("placeholder")&&this.$element.val().length>=1)},_onKeyUpInput:function(){this.$element.parent().toggleClass("on",this.$element.val().length>=1)},_onClickClearBtn:function(){this.$element.val(""),this.$element.parent().removeClass("on"),this.options.returnFocus===!0&&this.$element.focus()},hasText:function(){return this.$element.val().replace(/^\s+|\s+$/g,"").length>0}},t.fn[l]=function(e){return this.each(function(){t.data(this,"plugin_"+l)||t.data(this,"plugin_"+l,new s(this,e))})}}(jQuery,window,document);
;(function ( $, window, document, undefined ) {
    $.fn.countdown = function(htOptions) {
        var defaults = {
            callback: function () {
                var oDateTime = this.getCurrentTimerTime(),
                    oPrintTime = this.getTargetContainer().html(),
                    nD = parseInt(oDateTime.day, 10),
                    nHH = parseInt(oDateTime.hour, 10),
                    nMM = parseInt(oDateTime.min, 10),
                    sDateTime = "";

                sDateTime = (nD > 0)? "<em>" + nD + "</em>일 남음" : "<em>" + nHH + "</em>시간 <em>" + nMM + "</em>분 남음";

                if(oPrintTime !== sDateTime){
                    this.getTargetContainer().html(sDateTime);
                }

                if(nD > 0){
                    this.stop();
                }
            }
        }, settings = $.extend({}, defaults, htOptions);

        return this.each(function() {
            $(this).timerManager(settings);
        });
    };
})( jQuery, window, document );

var ssg = ssg || {};
ssg.View = ssg.View || {};
ssg.View.detail = ssg.View.detail || {};

ssg.View.detail.goodsMainImage = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.detail.goodsMainImage.prototype = {
    _bVideo: false,
    _sVideoThumbSrc: '',
    _sVideoSrc: '',
    _htSlider: {
        slideWidth: 394,
        minSlides: 1,
        maxSlides: 1,
        moveSlides: 1,
        pager: false,
        controls: false
    },
    _htFlowSrc: {
        src  : 'http://ucc.ssgcdn.com/player/flowplayer.commercial-3.2.18.swf',
        wmode: 'transparent'
    },
    _htFlowOptions: {
        keys: ['#$6d4bb9ac8473f0a6744', '#$8a86fe24ebc08c5b7ab','#$5b46f6b682c23ca3dde', '#$38859356887beba2e6c'],
        plugins: {
            pseudo: {
                url: 'http://ucc.ssgcdn.com/player/flowplayer.pseudostreaming-3.2.13.swf'
            },
            controls: {
                opacity: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        canvas: {
            backgroundColor: '#ffffff'
        },
        play: {
            url: 'http://static.ssgcdn.com/ui/ssg/img/common/btn_movplay_b2.png',
            width: 75,
            height: 75,
            replayLabel: null
        },
        buffering: false,
        clip: {
            provider: 'pseudo'
        },
        playlist: [
            {
                url: '',
                scaling: 'orig'
            },
            {
                url: '',
                scaling: 'orig',
                autoPlay: false,
                controls: {
                    opacity: 1
                }
            }
        ]
    },
    init: function() {
        this._assignElements();
        this._assignComponents();
        this._attachEventHandlers();

        if (this._bVideo) {
            this._ininVars();
            this._assignVideoComonents();
            this._showVideo();
        }
    },
    _ininVars: function() {
        this._welVideoTarget = $('#videoTarget');
        this._sVideoThumbSrc = this._welVideoTarget.find('.movie_thumb').attr('src').replace(/\_84/gi, '_600');

        if (!/^(http|https|ftp)/.test(this._sVideoThumbSrc)) {
            this._sVideoThumbSrc = 'http:' + this._sVideoThumbSrc;
        }

        if (/img_ready_500x500/.test(this._sVideoThumbSrc)) {
            this._sVideoThumbSrc = 'http://img.ssgcdn.com/ui/ssg/img/common/img_ready_500x500.gif';
        }

        this._sVideoSrc = this._welVideoTarget.data('videoSrc');
        this._welVideoTarget.on('click', $.proxy(this._onClickVideoTarget, this));
    },
    _assignElements: function() {
        this._welGoodsDetail = $('.cdtl_cm_detail');
        this._welGoodsThumbnail = this._welGoodsDetail.find('.cdtl_pager');
        this._welGoodsThumbList = this._welGoodsThumbnail.find('.cdtl_pager_lst > li');
        this._welGoodsBenefits = this._welGoodsDetail.find('.cdtl_item_benefits, .cdtl_item_image .deiv_bdg');
        this._welGoodsImg = $('#mainImg');
        this._welGoodsVideo = $('#videoView');
        this._bVideo = this._welGoodsVideo.length ? true : false;
    },
    _assignComponents: function() {
        if (this._welGoodsThumbList.length > 1) {
            this._oSlider = this._welGoodsThumbnail.find('.cdtl_pager_lst').bxSlider($.extend({}, this._htSlider, {
                onSliderLoad: $.proxy(this._onSliderLoad, this)
            }));
        } else {
            this._closeVideoFocus(0);
        }
    },
    _attachEventHandlers: function() {
        this._welGoodsThumbnail.on('click', '.lst_thmb>li>a', $.proxy(this._onClickItemThumbList, this));
        this._welGoodsThumbnail.on('click', '.btn_prev', $.proxy(this._onClickPrev, this));
        this._welGoodsThumbnail.on('click', '.btn_next', $.proxy(this._onClickNext, this));
    },
    _closeVideoFocus: function(nIndex) {
        if (this._bVideo) {
            this._welGoodsThumbnail.find('.cdtl_pager_lst > li:eq(' + nIndex + ') .active a').focus();
        }
    },
    _onSliderLoad: function() {
        this._closeVideoFocus(1);
    },
    _onClickVideoTarget: function(e) {
        e.preventDefault();

        if (!this._welGoodsVideo.hasClass('on')) {
            this._hideImageZoom();
            this._showVideo();
        }
    },
    _onClickPrev: function(e) {
        e.preventDefault();

        if(this._oSlider){
            this._oSlider.goToPrevSlide();
        }
    },
    _onClickNext: function(e) {
        e.preventDefault();

        if(this._oSlider){
            this._oSlider.goToNextSlide();
        }
    },
    _assignVideoComonents: function() {
        this._htFlowOptions.onLoad = function() {
            this.mute();
            this.play(1);
        };
        this._htFlowOptions.playlist[0].url = this._sVideoThumbSrc;
        this._htFlowOptions.playlist[1].url = this._sVideoSrc;
        this._htFlowOptions.playlist[1].onFinish = function() {
            this.close();
            this.play(0);
        };

        this._oPlayer = flowplayer('videoBox', this._htFlowSrc, this._htFlowOptions);
    },
    _showVideo: function() {
        this._welGoodsVideo.addClass('on').css({
            'visibility': 'visible',
            'zIndex': '1'
        });
        this._welGoodsBenefits.hide();
        this._oPlayer.show();
        this._playVideo();
    },
    _hideVideo: function() {
        this._oPlayer.hide();
        this._welGoodsBenefits.show();
        this._welGoodsVideo.removeClass('on').css({
            'visibility': 'hidden',
            'zIndex': '-1'
        });
    },
    _playVideo: function() {
        if (this._oPlayer.isPaused()) {
            this._oPlayer.resume();
        } else {
            this._oPlayer.play(1);
        }
    },
    _pauseVideo: function() {
        if (this._oPlayer.isPlaying()) {
            this._oPlayer.pause();
        }
    },
    _hideImageZoom:function() {
        $('#zoomWrap').hide();
    },
    _onClickItemThumbList: function(e) {
        e.preventDefault();

       var oSelf = this,
            welTarget = $(e.currentTarget),
            welZoomThumbImg = welTarget.find('.zoom_thumb'),
            sTargetImgSrc = welZoomThumbImg.attr('src'),
            sMainImgSrc = sTargetImgSrc.replace(/\_84/gi, '_600').replace(/\w=84&h=84/gi, 'w=600&h=600'),
            sBigImgSrc = sTargetImgSrc.replace(/\_84/gi, '_1200'),
            bShopatImg = welTarget.hasClass('img_shopat'),
            nWidth = 600;

        // 샤벳 이미지
        if(bShopatImg){
            sMainImgSrc = sTargetImgSrc.replace(/\w=84&h=84/gi, 'w=600&h=600');
            this._welGoodsDetail.find('.cdtl_bdg_shopat').show();
        } else {
            this._welGoodsDetail.find('.cdtl_bdg_shopat').hide();
        }

        // change active list
        this._welGoodsThumbnail.find('.lst_thmb>li').filter('.active').removeClass('active');
        welTarget.parent().addClass('active');

        // change main image
        $.imgpreload([sMainImgSrc, sBigImgSrc], $.proxy(function(){
            this._welGoodsImg.attr({
                'width': nWidth,
                'src': sMainImgSrc
            });
        }, this));

        if (this._bVideo && this._welGoodsVideo.hasClass('on')) {
            this._pauseVideo();
            this._hideVideo();
        }

        // 전문관 컬러 옵션 슬라이드
        if (this._oSlider && typeof welTarget.data('slide') !== 'undefined') {
            var nSlidePage = parseInt(welTarget.data('slide'), 10);
            if (this._oSlider.getCurrentSlide() !== nSlidePage) {
                this._oSlider.goToSlide(nSlidePage);
            }
        }
    }
};

ssg.View.detail.imagezoom = function() {
    this.init();
};
ssg.View.detail.imagezoom.prototype = {
    init: function(){
        this._assignElements();
        this._assignComonents();
    },
    _assignElements: function(){
        this._welImgZoom = $('.imgzoom');
    },
    _assignComonents: function(){
        this._welImgZoom.imgzoom({
            position: 'right',
            zoomWidth: 588,
            zoomHeight: 588,
            xOffset: 92,
            yOffset: 0
        });
    }
};

ssg.View.detail.stickyTabs = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.detail.stickyTabs.prototype = {
    _nTabHeight: 0,
    init: function(){
        this._assignElements();
        this._attachEventHandlers();
        this._initVars();
        this._setOptionBarSelectPos();
    },
    _initVars: function(){
        this._nTabHeight = this._welTabNavArea.outerHeight(true);
        this._nOptionSelectHeight = this._welOptionSelect.outerHeight(true);
        this._nOptionBottomHeight = this._welOptionBottom.outerHeight(true);
        this._nSidebarTop = this._welSidebar.offset().top;
    },
    _assignElements: function(){
        this._window = $(window);
        this._welHtml = $('html');
        this._welDetailContWrap = $('#_cdtl_dtlcont_wrap');
        this._welTabFixed = this._welDetailContWrap.find('.cdtl_tab_fixed');
        this._welTabNavArea = this._welDetailContWrap.find('.cdtl_tab');
        this._welTabNavMenus = this._welTabNavArea.find('li');
        this._welTabContWrap = this._welDetailContWrap.find('.cdtl_tabcont_wrap');
        this._welDetailIframe = $('#cdtlIframe');

        this._welSidebar = this._welDetailContWrap.find('.cdtl_fixed');
        this._welChoiceLayer = $('.chd_ly_view');
        this._welChoiceLayerWrap = this._welChoiceLayer.find('.chd_ly_wrap');
        this._welChoiceLayerTitle = this._welChoiceLayerWrap.find('.chd_ly_tit');

        this._welSidebarOptionBar = $("#_dtl_opt_bar");
        this._welOptionSelect = this._welSidebarOptionBar.find('.dob_opt_wrap');
        this._welOptionPrint = this._welSidebarOptionBar.find('.dob_opt_bx');
        this._welOptionBottom = this._welSidebarOptionBar.find('.dob_btm');
    },
    _attachEventHandlers: function(){
        this._welTabNavMenus.on('click', 'a', $.proxy(this._onClickTabNavMenu, this));
        //this._welTabContWrap.on('enable', '.cdtl_tabcont', $.proxy(this._onEnableNavPanels, this));
        this._window.on('scroll', $.proxy(this._onScrollWindow, this)).trigger('scroll');
        this._window.on('resize', $.debounce( 250, $.proxy(this._onResizeWindow, this)));
    },
    _setOptionBarSelectPos: function(){
        var nTargetHeight = 0,
            nHeight = 0,
            nTop = 0;

        this._welOptionSelect.find('.cdtl_opt').each(function(index){
            var welTarget = $(this),
                welOptSelect = welTarget.find('.cdtl_opt_select'),
                welOptList = welTarget.find('.cdtl_scroll');

            nHeight = welOptSelect.outerHeight();

            if (index > 0) {
                nTargetHeight += welTarget.outerHeight();
                nTop = nTargetHeight + nHeight;
            } else {
                nTop = welOptSelect.position().top + nHeight;
            }
            welOptList.css('top', nTop + 'px');
        });
    },
    _onClickTabNavMenu: function(e){
        e.preventDefault();

        var welTarget = $(e.currentTarget).parent(),
            nActive = this._welTabNavMenus.index(welTarget),
            welTargetTabCont = this._welTabContWrap.find('.cdtl_tabcont').eq(nActive),
            nTop = parseInt(welTargetTabCont.offset().top - this._nTabHeight, 10);
        //this._welTabNavMenus.eq(nActive).addClass('on').siblings().removeClass('on');
        $('html, body').animate({scrollTop: nTop + 2}, 10);
        welTargetTabCont.attr('tabindex', '-1').focus().siblings('.cdtl_tabcont').removeAttr('tabindex');
    },
    /*
    _onEnableNavPanels: function(e) {
        var welTarget = $(e.currentTarget),
            nActive = this._welTabContWrap.find('.cdtl_tabcont').index(welTarget);

        this._welTabNavMenus.eq(nActive).addClass('on').siblings().removeClass('on');
    },
    */
    _onResizeWindow: function(){
        this.refresh();
        this._updateFixedBar();

        if(this._welChoiceLayer.is(':visible')) {
            this._fitHeightOnLayer();
        } else {
            this._fitHeight();
        }
    },
    _fitHeightOnLayer: function(){
    	this._welOptionPrint.height(this._getHeightOnLayer());
    },
    _fitHeight: function(){
       this._welOptionPrint.height(this._getHeight());
    },
    _getHeightOnLayer: function(){
        return this._welChoiceLayerWrap.height() - this._welChoiceLayerTitle.outerHeight(true) - this._welOptionSelect.outerHeight(true) - this._welOptionBottom.outerHeight(true);
    },
    _getHeight: function(){
    	var nHeight = this._window.height() - this._welOptionSelect.outerHeight(true) - this._welOptionBottom.outerHeight(true);
        return this._welHtml.hasClass('translated-ltr') ? nHeight - 40 : nHeight;
    },
    _onScrollWindow: function(){
        this._updateFixedBar();
        this._fitHeight();
    },
    _updateFixedBar: function(){
        var nScrollTop = this._window.scrollTop(),
            nTabNavTop = parseInt(this._welDetailContWrap.offset().top, 10),
            nSidebarBottom = nScrollTop + this._welSidebar.outerHeight(),
            nTabContBottom = nTabNavTop + this._welDetailContWrap.outerHeight();
            nScrollLeft = this._window.scrollLeft();

        if (nScrollTop >= nTabNavTop && nSidebarBottom < nTabContBottom){
            //fixed
            this._welDetailContWrap.removeClass('stuck_bottom').addClass('stuck');
            this._welTabFixed.css('marginLeft',- nScrollLeft);
            this._welSidebar.css('marginLeft',- nScrollLeft);
        } else if(nScrollTop < nTabNavTop) {
            //top
            this._welDetailContWrap.removeClass('stuck stuck_bottom');
            this._welTabFixed.css({'top': 0});
            this._welSidebar.css('marginLeft',0);
        } else {
            //bottom
            this._welDetailContWrap.addClass('stuck stuck_bottom');

            if (nScrollTop > nTabContBottom) {
                this._welDetailContWrap.removeClass('stuck');
            }
            this._welTabFixed.css('marginLeft',0);
            this._welSidebar.css('marginLeft',0);
        }
        if (this._welDetailContWrap.hasClass('stuck stuck_bottom') == true){
			this._welTabFixed.css('marginLeft',- nScrollLeft);
		}
    },
    refresh: function(){
        Waypoint && Waypoint.refreshAll();
    }
};

ssg.View.detail.productInfoTab = function() {
    this.init();
};
ssg.View.detail.productInfoTab.prototype = {
    init: function() {
        this._assignElements();
        this._attachEventHandlers();
        this._checkLimitScrolling();
    },
    _assignElements: function() {
        this._welInfoArea = $('.cdtl_detail_info');
        this._welVariousTab = this._welInfoArea.find('.info_lst');
        this._welVariousTabList = this._welVariousTab.find('>ul>li');
        this._welVariousTabTitle = this._welVariousTabList.find('a.info_lst_tit');
        this._welCardTab = this._welVariousTabList.find('.card_tab');
        this._welCardTabList = this._welCardTab.find('.tab_lst>a');
    },
    _attachEventHandlers: function() {
        this._welVariousTabTitle.on('click', $.proxy(this._onClickVariousTabTitle, this));
        this._welCardTabList.on('click', $.proxy(this._onClickCardTabList, this));
    },
    _checkLimitScrolling: function() {
        var welScrollTarget = this._welVariousTabList.filter('.on').find('.scroll_area .viewport'),
            bScroll = welScrollTarget.get(0).scrollHeight > welScrollTarget.get(0).clientHeight;

        if (bScroll && !welScrollTarget.hasClass('onScroll')) {
            welScrollTarget.addClass('onScroll').on('mousewheel DOMMouseScroll', function (e) {
                var e0 = e.originalEvent, delta = e0.wheelDelta || -e0.detail;
                this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
                e.preventDefault();
            });

            return welScrollTarget;
        }
    },
    _onClickVariousTabTitle: function(e){
        e.preventDefault();
        $(e.currentTarget).parent().addClass('on').siblings().removeClass('on');
        this._checkLimitScrolling();
    },
    _onClickCardTabList: function(e){
        e.preventDefault();
        var welTarget = $(e.currentTarget);
        welTarget.addClass('on').siblings().removeClass('on');
        welTarget.parent().next('.tab_contents').find('>div').eq(welTarget.index()).show().siblings().hide();
        this._checkLimitScrolling();
    }
};

ssg.View.detail.hotdealLayer = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.detail.hotdealLayer.prototype = $.extend({
    _nActiveIdx: null,
    _nTotalThumb: null,
    init: function () {
        this._assignElements();
        this._attachEventHandlers();
        this._initVar();
    },
    _assignElements: function () {
        this._welHtml = $('html');
        this._welBody = $('body');
        this._welWrap = $('#wrap');
        this._welContent = $('#_cdtl_dtlcont_wrap');
        this._welContentOptionBar = $("#_dtl_opt_bar");
        this._welChoiceItemList = this._welContent.find('.chd_lst_choice>ul>li');

        this._welChoiceLayer = $('#_chd_ly_detail');
        this._welChoiceLayerTitleArea = this._welChoiceLayer.find('.chd_ly_tit');
        this._welChoiceLayerScrollArea = this._welChoiceLayer.find('.chd_scroll');
        this._welChoiceLayerRight = this._welChoiceLayer.find('.chd_ly_rgt');
    },
    _attachEventHandlers: function () {
        this._welChoiceItemList.on('mouseenter', $.proxy(this._onMouseenterItemList, this));
        this._welChoiceItemList.on('mouseleave', $.proxy(this._onMouseleaveItemList, this));

        this._welChoiceItemList.on('click', '.open_detail_view', $.proxy(this._onClickOpenViewItem, this));
        this._welChoiceItemList.on('click', '.sel_item_option', $.proxy(this._onClickSelectItem, this));

        this._welChoiceLayer.on('click', '.btn_close', $.proxy(this._onClickCloseViewItem, this));
        this._welChoiceLayer.on('click', '.btn_prev', $.proxy(this._onClickChoiceLayerPrevBtn, this));
        this._welChoiceLayer.on('click', '.btn_next', $.proxy(this._onClickChoiceLayerNextBtn, this));
    },
    _initVar: function(){
        this._nTotalThumb = this._welChoiceItemList.length;
    },
    _onMouseenterItemList: function(e){
        var welTarget = $(e.currentTarget);
        var bSoldout = welTarget.find('.chd_soldout').length;

        if (!bSoldout) {
            welTarget.addClass('on').siblings().removeClass('on');
        }
    },
    _onMouseleaveItemList: function(e){
        var welTarget = $(e.currentTarget);
        welTarget.removeClass('on');
    },
    _onClickSelectItem: function(e){
        e.preventDefault();
        e.stopPropagation();

        var welTarget = $(e.currentTarget),
            welTargetLi = welTarget.closest('.item'),
            sTargetOption = welTargetLi.data('dealOption');

        this.emit('hotdeal.itemSelect', sTargetOption);
    },
    _onClickOpenViewItem: function(e){
        e.preventDefault();
        var welTarget = $(e.currentTarget),
            welTargetLi = welTarget.closest('.item'),
            sTargetOption = welTargetLi.data('dealOption'),
            sTargetLink = welTarget.attr('href');

        this._nActiveIdx = this._welChoiceItemList.index(welTargetLi);
        this._moveOptionToLayer();
        this._moveLayerToBody();
        this._showLayer();

        $(window).trigger('resize');
        this.emit('hotdeal.selectOption', sTargetOption);
    },
    _onClickCloseViewItem: function(e){
        e.preventDefault();

        this._moveLayerToOption();
        this._hideLayer();
        $(window).trigger('resize');
    },
    _onClickChoiceLayerPrevBtn: function(e){
        e.preventDefault();
        var sTargetOption = '';

        if(this._nActiveIdx === 0){
            this._nActiveIdx = this._nTotalThumb - 1;
        }else{
            --this._nActiveIdx;
        }

        sTargetOption = this._welChoiceItemList.eq(this._nActiveIdx).data('dealOption');
        this.emit('hotdeal.selectOption', sTargetOption);
    },
    _onClickChoiceLayerNextBtn: function(e){
        e.preventDefault();
        var sTargetOption = '';

        if(this._nActiveIdx == this._nTotalThumb - 1){
            this._nActiveIdx = 0;
        }else{
            ++this._nActiveIdx;
        }

        sTargetOption = this._welChoiceItemList.eq(this._nActiveIdx).data('dealOption');
        this.emit('hotdeal.selectOption', sTargetOption);
    },
    _moveLayerToBody: function(){
        if(!this._welBody.is(this._welChoiceLayer.parent())){
            this._welWrap.after(this._welChoiceLayer);
        }
    },
    _showLayer: function(){
        this._welHtml.css('overflow', 'hidden');
        this._welBody.css('overflow', 'hidden');

        return this._welChoiceLayer.show(0).promise();
    },
    _hideLayer: function(){
        this._welHtml.css('overflow', '');
        this._welBody.css('overflow', '');

        return this._welChoiceLayer.hide(0).promise();
    },
    _moveOptionToLayer: function(){
        this._welChoiceLayerRight.html(this._welContentOptionBar);
    },
    _moveLayerToOption: function(){
        this._welContent.find('.cdtl_fixed').append(this._welContentOptionBar);
    },
    changeLayerDetailByIndex: function(nIdx){
        this._nActiveIdx = nIdx;
    }
}, ssg.Event.emitter);

var _generateDropbox = function(){
  //$('._dropdown').val('0').dropdown({
    $('._dropdown').dropdown({
        originalHidden: true,
        //item: 'li:not(.disabled)',
        item: 'li:not(.disabled, .stock)',
        onClickSelect: function(){
            //viewport check and focus element
            var nFocusTop = 0;
            var nFocusBottom = 0;
            var $this = null;
            this.$selectWrap.toggleClass('on').delay(50).queue(function(){
                $this = $(this);

                if($this.hasClass('on')){
                    var welSelectWrapScroll = $this.find('.dob_scroll'),
                        welSelectSiblings = $this.siblings('.dob_opt').filter('.on'),
                        welSelectedItem = welSelectWrapScroll.find('li.selected'),
                        welPrevItems = welSelectedItem.prevAll();
                        nViewTop = welSelectWrapScroll.scrollTop(),
                        nViewBottom = nViewTop + welSelectWrapScroll.height();

                    //hide siblings
                    if(welSelectSiblings.length){
                        welSelectSiblings.removeClass('on');
                    }

                    if(welPrevItems.length){
                        welPrevItems.each(function(){
                           nFocusTop += $(this).height();
                        });

                        nFocusBottom = nFocusTop + welSelectedItem.height();
                    }

                    if(nViewTop > nFocusTop || nFocusBottom > nViewBottom){
                        welSelectWrapScroll.scrollTop(nFocusTop);
                    }

                    $this.one('clickoutside.option', function(){
                        $this.removeClass('on');
                    });
                }else{
                    $this.off('clickoutside.option');
                }

                $(this).dequeue();
            });
        },
        onChanged: function(){
            //for dev
            $.isFunction(this.el.onchange) && this.el.onchange();
            //oSsgViewHotDealSticky.refresh();
            //this.$selectWrap.find('._drop_thumb').toggleClass('chd_default', this.wel.val()==0);

            //for ui test
            $(this.el).trigger('close.dropdown');
            $(this.el).trigger('sync.dropdown');
        },
        onClose: function(){
            //event: close.dropbox
            this.$selectWrap.removeClass('on');
            this.$selectWrap.off('clickoutside.option');
        },
        onInit: function(){
            //this.$selectWrap.find('._drop_thumb').toggleClass('chd_default', this.wel.val()==0);
        },
        onSync: function(){
            //this.$selectWrap.find('._drop_thumb').toggleClass('chd_default', this.wel.val()==0);
        }
    });
};

var sdeptDetailRealsizeTab = {
    init: function () {
        this._assignElements();
        this._attachEventHandlers();
    },
    _assignElements: function () {
        this.welRealSizeTab = $('.real_view .view_tab');
    },
    _attachEventHandlers: function () {
        this.welRealSizeTab.on('click', '.lst_view li a', $.proxy(this._onClickSizeTab, this));
    },
    _onClickSizeTab: function (e) {
        e.preventDefault();
        var welTarget = $(e.currentTarget);
        this._currentTargetActive(welTarget);
        this._changeViewImage(welTarget);
    },
    _currentTargetActive: function (welTarget) {
        welTarget.parent().addClass('on').siblings().removeClass('on');
    },
    _changeViewImage: function (welTarget) {
        var welTargetImg = welTarget.next().find('img'),
            welViewImg = welTarget.parents('.view_tab').find('.view_basic>img'),
            sNewImgSrc = welTargetImg.attr('src'),
            sNewImgAlt = welTargetImg.attr('alt');

        welViewImg.attr({src: sNewImgSrc, alt: sNewImgAlt});
    }
};

var small = small || {};
small.View = small.View || {};
small.View.detail = small.View.detail || {};

small.View.detail.goodsMainImage = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};
small.View.detail.goodsMainImage.prototype = {
    _bVideo: false,
    _sVideoThumbSrc: '',
    _sVideoSrc: '',
    _htFlowSrc: {
        src  : 'http://ucc.ssgcdn.com/player/flowplayer.commercial-3.2.18.swf',
        wmode: 'transparent'
    },
    _htFlowOptions: {
        keys: ['#$6d4bb9ac8473f0a6744', '#$8a86fe24ebc08c5b7ab','#$5b46f6b682c23ca3dde', '#$38859356887beba2e6c'],
        plugins: {
            pseudo: {
                url: 'http://ucc.ssgcdn.com/player/flowplayer.pseudostreaming-3.2.13.swf'
            },
            controls: {
                opacity: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }
        },
        canvas: {
            backgroundColor: '#ffffff'
        },
        play: {
            url: 'http://static.ssgcdn.com/ui/ssg/img/common/btn_movplay_b2.png',
            width: 75,
            height: 75,
            replayLabel: null
        },
        buffering: false,
        clip: {
            provider: 'pseudo'
        },
        playlist: [
            {
                url: '',
                scaling: 'orig'
            },
            {
                url: '',
                scaling: 'orig',
                autoPlay: false,
                controls: {
                    opacity: 1
                }
            }
        ]
    },
    init: function () {
        this._assignElements();
        this._attachEventHandlers();
        this._checkSlideNavShowHide();

        if (this._bVideo) {
            this._ininVars();
            this._assignVideoComonents();
            this._showVideo();
            this._welGoodsThumbList.eq(0).find('.pr_thumb a').focus();
        }
    },
    _ininVars: function() {
        this._welVideoTarget = $('#videoTarget');
        this._sVideoThumbSrc = this._welVideoTarget.find('.movie_thumb').attr('src').replace(/\_84/gi, '_600');

        if (!/^(http|https|ftp)/.test(this._sVideoThumbSrc)) {
            this._sVideoThumbSrc = 'http:' + this._sVideoThumbSrc;
        }

        if (/img_ready_500x500/.test(this._sVideoThumbSrc)) {
            this._sVideoThumbSrc = 'http://img.ssgcdn.com/ui/ssg/img/common/img_ready_500x500.gif';
        }

        this._sVideoSrc = this._welVideoTarget.data('videoSrc');
        this._welVideoTarget.on('click', $.proxy(this._onClickVideoTarget, this));
    },
    _assignElements: function () {
        this._welGoodsImgWrap = $('#pr_imgwrap');
        this._welGoodsThumbnail = this._welGoodsImgWrap.find('.pr_allset');
        this._welGoodsThumbList = this._welGoodsThumbnail.find('.pr_imglist > li');
        this._welGoodsVideo = $('#videoView');
        this._bVideo = this._welGoodsVideo.length ? true : false;
    },
    _attachEventHandlers: function () {
        this._welGoodsThumbnail.on('click', '.pr_thumb>a', $.proxy(this._onClickGoodsThumbnail, this));
        this._welGoodsThumbnail.on('click', '.pr_prev', $.proxy(this._onClickPrevSlide, this));
        this._welGoodsThumbnail.on('click', '.pr_next', $.proxy(this._onClickNextSlide, this));
    },
    _checkSlideNavShowHide: function() {
        if (this._welGoodsThumbList.length > 1) {
            this._welGoodsThumbnail.find('.pr_prev').show();
            this._welGoodsThumbnail.find('.pr_next').show();
        } else {
            this._welGoodsThumbnail.find('.pr_prev').hide();
            this._welGoodsThumbnail.find('.pr_next').hide();
        }
    },
    _onClickVideoTarget: function(e) {
        e.preventDefault();

        if (!this._welGoodsVideo.hasClass('on')) {
            this._hideImageZoom();
            this._showVideo();
        }
    },
    _assignVideoComonents: function() {
        this._htFlowOptions.onLoad = function() {
            this.mute();
            this.play(1);
        };
        this._htFlowOptions.playlist[0].url = this._sVideoThumbSrc;
        this._htFlowOptions.playlist[1].url = this._sVideoSrc;
        this._htFlowOptions.playlist[1].onFinish = function() {
            this.close();
            this.play(0);
        };

        this._oPlayer = flowplayer('videoBox', this._htFlowSrc, this._htFlowOptions);
    },
    _showVideo: function() {
        this._welGoodsVideo.addClass('on').css({
            'visibility': 'visible',
            'zIndex': '30'
        });
        this._oPlayer.show();
        this._playVideo();
    },
    _hideVideo: function() {
        this._oPlayer.hide();
        this._welGoodsVideo.removeClass('on').css({
            'visibility': 'hidden',
            'zIndex': '-1'
        });
    },
    _playVideo: function() {
        if (this._oPlayer.isPaused()) {
            this._oPlayer.resume();
        } else {
            this._oPlayer.play(1);
        }
    },
    _pauseVideo: function() {
        if (this._oPlayer.isPlaying()) {
            this._oPlayer.pause();
        }
    },
    _hideImageZoom: function() {
        $('#zoomWrap').hide();
    },
    _onClickGoodsThumbnail: function(e) {
        e.preventDefault();
        var welViewSlide = $(e.currentTarget).closest('li');
        this._moveSlide(welViewSlide);
    },
    _getCurrentSlide: function() {
        return this._welGoodsThumbList.filter('.on');
    },
    _onClickPrevSlide: function(e) {
        e.preventDefault();
        var welPrevSlide = this._getCurrentSlide().prev(),
            welViewSlide = this._getAfterSlide(welPrevSlide, true);

        this._moveSlide(welViewSlide);
    },
    _onClickNextSlide: function(e) {
        e.preventDefault();
        var welNextSlide = this._getCurrentSlide().next(),
            welViewSlide = this._getAfterSlide(welNextSlide, false);

        this._moveSlide(welViewSlide);
    },
    _moveSlide: function(welViewSlide) {
        this._showCurrentSlide(welViewSlide);
    },
    _getAfterSlide: function(welTargetSlide, bPrev) {
        if(welTargetSlide.length) {
            return welTargetSlide;
        }
        return bPrev ? this._welGoodsThumbList.last() : this._welGoodsThumbList.first();
    },
    _showCurrentSlide: function(welCurrentSlide) {
        this._hideImageZoom();

        if (this._bVideo && this._welGoodsVideo.hasClass('on')) {
            this._pauseVideo();
            this._hideVideo();
        }
        welCurrentSlide.addClass('on').siblings().removeClass('on');
    }
};

small.View.detail.imagezoom = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};
small.View.detail.imagezoom.prototype = {
    _aImgPreload: [],
    init : function(){
        this._assignElements();
        //make initial data
        this._initImageZoomList();
        //attach event handler
        this._attachEventHandlers();
        //image load with active thumbnail
        this._activateImageZoom();
    },
    _assignElements : function(){
        this._welGoodsImgWrap  = $('#pr_imgwrap');
        this._welGoodsSlide = this._welGoodsImgWrap.find('.pr_imglist');
        this._welGoodsThumbnail = this._welGoodsImgWrap.find('.pr_thumb a');
        this._welSlideNav = this._welGoodsImgWrap.find('.pr_img_set');
        this._welSlidePrev = this._welSlideNav.find('.pr_prev button');
        this._welSlideNext = this._welSlideNav.find('.pr_next button');
    },
    _attachEventHandlers : function(){
        this._welGoodsThumbnail.on('click', $.proxy(this._activateImageZoom, this));
        this._welSlidePrev.on('click', $.proxy(this._activateImageZoom, this));
        this._welSlideNext.on('click', $.proxy(this._activateImageZoom, this));
    },
    _initImageZoomList : function(){
        this._aImgPreload = this._welGoodsSlide.find('.pr_thumb .zoom_thumb').map(function(i){
            var $this = $(this);
            return{
                index: i,
                big: $this.attr('src').replace(/\_50/gi, '_1200'),
                preload: false
            };
        });
    },
    _getLargeImgSrc : function(welTarget){
        return $.map(welTarget, function(elem) {
            var sImgSrc = $(elem).attr('src').replace(/\_50/gi, '_1200');
            return sImgSrc;
        });
    },
    _getIndexBySrc : function(sTargetSrc){
        var nIdx = null;
        var aTargetSrc = $.each(this._aImgPreload, function( i, val) {
            if(val.big == sTargetSrc){
                nIdx = i;
                return;
            }
        });
        return nIdx;
    },
    _activateImageZoom: function() {
        var oSelf = this,
            welActiveTarget = this._welGoodsSlide.find('.on .pr_thumb .zoom_thumb'),
            aImgSrc = this._getLargeImgSrc(welActiveTarget);

        //filter true and don't call preload
        //aImgPreload
        var aFilterImgSrc = $.map( aImgSrc, function( val, i ) {
            var aTargetSrc = $.grep(oSelf._aImgPreload, function( n, j ) {
                return n.big == val;
            });

            if(aTargetSrc.length && !aTargetSrc[0].preload){
                return val;
            }
        });

        if(aFilterImgSrc.length){
            $.imgpreload(aFilterImgSrc, {
                each: function(){
                    var nTargetIndex = oSelf._getIndexBySrc($(this).attr('src'));

                    if(nTargetIndex !== null){
                        oSelf._aImgPreload[nTargetIndex].preload = true;
                        $('.imgzoom').eq(nTargetIndex).imgzoom({
                            position: 'inner'
                        });
                    }
                }
            });
        }
    }
};

$(function(){
    var welBody = $('body');
    var welGoodsDetail = $('.cdtl_cm_detail');
    var oSsgViewDetailGoodsMainImage = null;
    var oSsgViewDetailImageZoom = null;
    var oSmallViewDetailGoodsMainImage = null;
    var oSmallViewDetailImageZoom = null;
    var oSsgViewDetailStickyTabs = null;
    var oSsgViewDetailProductInfoTab = null;

    //옵션 스타일 셀렉트 박스
    _generateDropbox();

    if ($('#_cdtl_dtlcont_wrap').length) {
        oSsgViewDetailStickyTabs = new ssg.View.detail.stickyTabs();
    }

    if($('.cdtl_detail_info').length){
        oSsgViewDetailProductInfoTab = new ssg.View.detail.productInfoTab();
    }

    if(welGoodsDetail.hasClass('ty_sm')){
        //ShinsegaeMall
        oSmallViewDetailGoodsMainImage = new small.View.detail.goodsMainImage();
        oSmallViewDetailImageZoom = new small.View.detail.imagezoom();
    }else{
        //SSG&Emart&Boons&Traders
        oSsgViewDetailGoodsMainImage = new ssg.View.detail.goodsMainImage();
        oSsgViewDetailImageZoom = new ssg.View.detail.imagezoom();
    }

    //골라담기 체크박스 이전버전
    var welCheckArea = $('.cdtl_chk_area');
    welCheckArea.on('change', 'input:checkbox', function(){
        var $this = $(this),
        welTargetCheckArea = $this.parents('.cdtl_chk_area');
        welTargetCheckArea.toggleClass( 'checked', $this.is(":checked") );
    });

    //골라담기 체크박스
    var welCheckCustom = $('.custom_chk');
    welCheckCustom.on('change', 'input:checkbox', function(){
        var $this = $(this),
        welTargetCheckCustom = $this.parent('.custom_chk')
        welTargetCheckCustom.toggleClass( 'on', $this.is(":checked") );
        welTargetCheckCustom.next('.cdtl_amount').toggleClass( 'disabled', !$this.is(":checked") );
    });

    $('#_ifr_html').on('load', function(){
        if($(this).is(":visible")){
            Waypoint && Waypoint.refreshAll();
        }
    });

    //툴팁레이어
    $('.ssg-tooltip').tooltip();

    //무이자 할부, 카드사 확인 탭
    $('.cdtl_ly_tabwrap').tabs({
        'sActiveClass' : 'on',
        'elTabBtn' : '.cdtl_ly_tab>li',
        'elTabPanel' : '.cdtl_ly_tabcont',
        'fnChange' : function(welPanel){
            if($(this).is('[role="tab"]')){ // 방어코딩 - role tab 속성이 있을때만 동작
                $(this).attr('aria-selected','true').parent().siblings().children().attr('aria-selected','false');
            }
        }
    });

    //다른지점 상품더보기 slider
    $('.cdtl_store_sel>ul').filter(function(){
        return $(this).find('>li').length > 3;
    }).bxSlider({
        infiniteLoop: false,
        adaptiveHeight: true,
        slideWidth: 141,
        minSlides: 3,
        maxSlides: 3,
        moveSlides: 1,
        responsive: false,
        pager: false,
        prevText: '<span class="blind">이전 목록보기</span>',
        nextText: '<span class="blind">다음 목록보기</span>'
    });

    //탭 상단 slider
    $('.together_goods>ul').filter(function(){
        return $(this).find('>li').length > 1;
    }).find('img.i1, img.i2').each(function(){
        var $this = $(this);
        $this.attr('src', $this.data('original')).addClass('lazy_loaded').one('error', function() {
            var noimg = $(this).attr('data-noimg');
            $(this).attr('src', noimg).addClass('lazy_fail');
        });
    }).end().bxSlider({
        pager : false,
        prevText: '<span class="blind">이전 목록보기</span>',
        nextText: '<span class="blind">다음 목록보기</span>'
    });

    //상품상세정보 실측정보
    if ($('.real_view').length > 0) {
        sdeptDetailRealsizeTab.init();
    }

    //고객상품평 slider
    $('.cdtl_photo_bx>ul').filter(function(){
        return $(this).is(':visible') && $(this).find('>li').length > 1;
    }).bxSlider({
        slideWidth: 450,
        responsive: false,
        pager: true,
        pagerType : 'short',
        prevText: '<span class="blind">이전 목록보기</span>',
        nextText: '<span class="blind">다음 목록보기</span>'
    });

    //고객상품평 flowplayer
    $('.cdtl_video_bx').filter(function(){return $(this).is(":visible");}).ssgPlayer();

    //고객상품평 table
    $('.cdtl_tabcont_wrap').on('click','.cdtl_cmt_tbl .desc_txt .in a',function(e){
        e.preventDefault();
        var welTabHeader = $(this).parents('tr'),
            welTabPanel = welTabHeader.next('tr.cdtl_cmt_view'),
            welTabSiblingsPanel = welTabPanel.siblings('tr'),
            welTabPanelBxSlider = welTabPanel.find('.cdtl_photo_bx>ul'),
            welTabPanelFlowPlayer = welTabPanel.find('.cdtl_video_bx');

        welTabPanel.toggleClass('on').siblings('tr.cdtl_cmt_view').removeClass('on');

        if(welTabPanel.hasClass('on')){
            welTabPanelBxSlider.length && welTabPanelBxSlider.filter(function(){
                return $(this).find('>li').length > 1;
            }).bxSlider({
                slideWidth: 450,
                responsive: false,
                pager: true,
                pagerType : 'short',
                prevText: '<span class="blind">이전 목록보기</span>',
                nextText: '<span class="blind">다음 목록보기</span>'
            });

            welTabPanelFlowPlayer.length && welTabPanelFlowPlayer.ssgPlayer();
        }else{
            welTabPanelFlowPlayer.length && welTabPanelFlowPlayer.ssgPlayer('stop');
        }

        welTabSiblingsPanel.find('.cdtl_video_bx').filter(function(){
            return $.data(this, "plugin_ssgPlayer");
        }).ssgPlayer('stop');

        Waypoint && Waypoint.refreshAll();
        $(window).trigger('scroll');
    });

    //클리어 인풋
    $('input.clearable').clearInput();
});