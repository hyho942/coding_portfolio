/**
 * ui.ssg.js
 * @author shinsegae it dev team
 * @fileOverview
       Gnb, Lnb, skyscraper, footer
 * @requires
 *          - jquery 1.9.1
 * @since 2013.09.16
 * @copyright © 2013 s.com All right reserved
 * @modify          2013-11-04 10:20
 * @history         2017-04-04 13:20 add tmpl, clickout, doTimeout, tooltip, dropdown, tabs, waypoints, sticky, clearInput, customInput
 */
//jQuery Templates Plugin 1.0.0pre
('undefined' === typeof $.fn.template) && !(function(a){var r=a.fn.domManip,d="_tmplitem",q=/^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,b={},f={},e,p={key:0,data:{}},i=0,c=0,l=[];function g(g,d,h,e){var c={data:e||(e===0||e===false)?e:d?d.data:{},_wrap:d?d._wrap:null,tmpl:null,parent:d||null,nodes:[],calls:u,nest:w,wrap:x,html:v,update:t};g&&a.extend(c,g,{nodes:[],parent:d});if(h){c.tmpl=h;c._ctnt=c._ctnt||c.tmpl(a,c);c.key=++i;(l.length?f:b)[i]=c}return c}a.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(f,d){a.fn[f]=function(n){var g=[],i=a(n),k,h,m,l,j=this.length===1&&this[0].parentNode;e=b||{};if(j&&j.nodeType===11&&j.childNodes.length===1&&i.length===1){i[d](this[0]);g=this}else{for(h=0,m=i.length;h<m;h++){c=h;k=(h>0?this.clone(true):this).get();a(i[h])[d](k);g=g.concat(k)}c=0;g=this.pushStack(g,f,i.selector)}l=e;e=null;a.tmpl.complete(l);return g}});a.fn.extend({tmpl:function(d,c,b){return a.tmpl(this[0],d,c,b)},tmplItem:function(){return a.tmplItem(this[0])},template:function(b){return a.template(b,this[0])},domManip:function(d,m,k){if(d[0]&&a.isArray(d[0])){var g=a.makeArray(arguments),h=d[0],j=h.length,i=0,f;while(i<j&&!(f=a.data(h[i++],"tmplItem")));if(f&&c)g[2]=function(b){a.tmpl.afterManip(this,b,k)};r.apply(this,g)}else r.apply(this,arguments);c=0;!e&&a.tmpl.complete(b);return this}});a.extend({tmpl:function(d,h,e,c){var i,k=!c;if(k){c=p;d=a.template[d]||a.template(null,d);f={}}else if(!d){d=c.tmpl;b[c.key]=c;c.nodes=[];c.wrapped&&n(c,c.wrapped);return a(j(c,null,c.tmpl(a,c)))}if(!d)return[];if(typeof h==="function")h=h.call(c||{});e&&e.wrapped&&n(e,e.wrapped);i=a.isArray(h)?a.map(h,function(a){return a?g(e,c,d,a):null}):[g(e,c,d,h)];return k?a(j(c,null,i)):i},tmplItem:function(b){var c;if(b instanceof a)b=b[0];while(b&&b.nodeType===1&&!(c=a.data(b,"tmplItem"))&&(b=b.parentNode));return c||p},template:function(c,b){if(b){if(typeof b==="string")b=o(b);else if(b instanceof a)b=b[0]||{};if(b.nodeType)b=a.data(b,"tmpl")||a.data(b,"tmpl",o(b.innerHTML));return typeof c==="string"?(a.template[c]=b):b}return c?typeof c!=="string"?a.template(null,c):a.template[c]||a.template(null,q.test(c)?c:a(c)):null},encode:function(a){return(""+a).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")}});a.extend(a.tmpl,{tag:{tmpl:{_default:{$2:"null"},open:"if($notnull_1){__=__.concat($item.nest($1,$2));}"},wrap:{_default:{$2:"null"},open:"$item.calls(__,$1,$2);__=[];",close:"call=$item.calls();__=call._.concat($item.wrap(call,__));"},each:{_default:{$2:"$index, $value"},open:"if($notnull_1){$.each($1a,function($2){with(this){",close:"}});}"},"if":{open:"if(($notnull_1) && $1a){",close:"}"},"else":{_default:{$1:"true"},open:"}else if(($notnull_1) && $1a){"},html:{open:"if($notnull_1){__.push($1a);}"},"=":{_default:{$1:"$data"},open:"if($notnull_1){__.push($.encode($1a));}"},"!":{open:""}},complete:function(){b={}},afterManip:function(f,b,d){var e=b.nodeType===11?a.makeArray(b.childNodes):b.nodeType===1?[b]:[];d.call(f,b);m(e);c++}});function j(e,g,f){var b,c=f?a.map(f,function(a){return typeof a==="string"?e.key?a.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g,"$1 "+d+'="'+e.key+'" $2'):a:j(a,e,a._ctnt)}):e;if(g)return c;c=c.join("");c.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/,function(f,c,e,d){b=a(e).get();m(b);if(c)b=k(c).concat(b);if(d)b=b.concat(k(d))});return b?b:k(c)}function k(c){var b=document.createElement("div");b.innerHTML=c;return a.makeArray(b.childNodes)}function o(b){return new Function("jQuery","$item","var $=jQuery,call,__=[],$data=$item.data;with($data){__.push('"+a.trim(b).replace(/([\\'])/g,"\\$1").replace(/[\r\t\n]/g," ").replace(/\$\{([^\}]*)\}/g,"{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,function(m,l,k,g,b,c,d){var j=a.tmpl.tag[k],i,e,f;if(!j)throw"Unknown template tag: "+k;i=j._default||[];if(c&&!/\w$/.test(b)){b+=c;c=""}if(b){b=h(b);d=d?","+h(d)+")":c?")":"";e=c?b.indexOf(".")>-1?b+h(c):"("+b+").call($item"+d:b;f=c?e:"(typeof("+b+")==='function'?("+b+").call($item):("+b+"))"}else f=e=i.$1||"null";g=h(g);return"');"+j[l?"close":"open"].split("$notnull_1").join(b?"typeof("+b+")!=='undefined' && ("+b+")!=null":"true").split("$1a").join(f).split("$1").join(e).split("$2").join(g||i.$2||"")+"__.push('"})+"');}return __;")}function n(c,b){c._wrap=j(c,true,a.isArray(b)?b:[q.test(b)?b:a(b).html()]).join("")}function h(a){return a?a.replace(/\\'/g,"'").replace(/\\\\/g,"\\"):null}function s(b){var a=document.createElement("div");a.appendChild(b.cloneNode(true));return a.innerHTML}function m(o){var n="_"+c,k,j,l={},e,p,h;for(e=0,p=o.length;e<p;e++){if((k=o[e]).nodeType!==1)continue;j=k.getElementsByTagName("*");for(h=j.length-1;h>=0;h--)m(j[h]);m(k)}function m(j){var p,h=j,k,e,m;if(m=j.getAttribute(d)){while(h.parentNode&&(h=h.parentNode).nodeType===1&&!(p=h.getAttribute(d)));if(p!==m){h=h.parentNode?h.nodeType===11?0:h.getAttribute(d)||0:0;if(!(e=b[m])){e=f[m];e=g(e,b[h]||f[h]);e.key=++i;b[i]=e}c&&o(m)}j.removeAttribute(d)}else if(c&&(e=a.data(j,"tmplItem"))){o(e.key);b[e.key]=e;h=a.data(j.parentNode,"tmplItem");h=h?h.key:0}if(e){k=e;while(k&&k.key!=h){k.nodes.push(j);k=k.parent}delete e._ctnt;delete e._wrap;a.data(j,"tmplItem",e)}function o(a){a=a+n;e=l[a]=l[a]||g(e,b[e.parent.key+n]||e.parent)}}}function u(a,d,c,b){if(!a)return l.pop();l.push({_:a,tmpl:d,item:this,data:c,options:b})}function w(d,c,b){return a.tmpl(a.template(d),c,b,this)}function x(b,d){var c=b.options||{};c.wrapped=d;return a.tmpl(a.template(b.tmpl),b.data,c,b.item)}function v(d,c){var b=this._wrap;return a.map(a(a.isArray(b)?b.join(""):b).filter(d||"*"),function(a){return c?a.innerText||a.textContent:a.outerHTML||s(a)})}function t(){var b=this.nodes;a.tmpl(null,null,null,this).insertBefore(b[0]);a(b).remove()}})(jQuery);
//clickout
(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
//doTimeout
(function($){var a={},c="doTimeout",d=Array.prototype.slice;$[c]=function(){return b.apply(window,[0].concat(d.call(arguments)))};$.fn[c]=function(){var f=d.call(arguments),e=b.apply(this,[c+f[0]].concat(f));return typeof f[0]==="number"||typeof f[1]==="number"?this:e};function b(l){var m=this,h,k={},g=l?$.fn:$,n=arguments,i=4,f=n[1],j=n[2],p=n[3];if(typeof f!=="string"){i--;f=l=0;j=n[1];p=n[2]}if(l){h=m.eq(0);h.data(l,k=h.data(l)||{})}else{if(f){k=a[f]||(a[f]={})}}k.id&&clearTimeout(k.id);delete k.id;function e(){if(l){h.removeData(l)}else{if(f){delete a[f]}}}function o(){k.id=setTimeout(function(){k.fn()},j)}if(p){k.fn=function(q){if(typeof p==="string"){p=g[p]}p.apply(m,d.call(n,i))===true&&!q?o():e()};o()}else{if(k.fn){j===undefined?e():k.fn(j===false);return true}else{e()}}}})(jQuery);
//jquery.tooltip
!function($,window,document,undefined){var pluginName="tooltip",Plugin=function(elem,options){if(this.elem=elem,this.$elem=$(elem),this.options=options,this.metadata=this.$elem.data(pluginName.toLowerCase()+"-options"),window.JSON||(window.JSON={parse:function(sJSON){return eval("("+sJSON+")")}}),"string"==typeof this.metadata){var rxData=this.metadata.replace(/\'/gi,'"');this.metadata=JSON.parse(rxData)}this.init()};Plugin.prototype={defaults:{contents:".ssg-tooltip-layer",trigger:"hover",position:!1,follow:!1,direction:"right",align:"top",top:0,left:0,right:0,bottom:0,activeClass:"on",close:".ssg-tooltip-close",onBeforeShow:$.noop,onShow:$.noop,onHide:$.noop},init:function(){this.config=$.extend({},this.defaults,this.options,this.metadata),this._assignElements(),this._attachEventHandlers()},_assignElements:function(){this._welTooltipWrap=this.$elem.parent(),this._welTooltipLayer=this.$elem.next(this.config.contents)||$(this.$elem.prop("hash")),this._welTooltipClose=this._welTooltipLayer.find(this.config.close)},_attachEventHandlers:function(){switch(this.$elem.on("click.tooltip",$.proxy(this._onClickTooltip,this)),this.config.trigger){case"click":this._welTooltipClose.length&&this._welTooltipClose.on("click.tooltip",$.proxy(this._onClickTooltipClose,this));break;default:this.config.follow?(this.$elem.on("mouseenter.tooltip mousemove.tooltip",$.proxy(this._onMousemoveTooltip,this)),this.$elem.on("mouseleave.tooltip",$.proxy(this._hideTooltip,this))):(this._welTooltipWrap.on("mouseenter.tooltip focusin.tooltip",$.proxy(this._onMouseenterTooltipOpen,this)),this._welTooltipWrap.on("mouseleave.tooltip focusout.tooltip",$.proxy(this._onMouseleaveTooltipClose,this)))}},_onClickTooltip:function(t){t.preventDefault(),"click"===this.config.trigger&&(this._welTooltipLayer.is(":hidden")?this._onClickOutsideTooltipShow():this._onClickOutsideTooltipHide())},_onClickTooltipClose:function(t){t.preventDefault(),this._onClickOutsideTooltipHide(),this.$elem.focus()},_onClickOutsideTooltipShow:function(){this._showTooltip(),this._welTooltipWrap.on("clickoutside.tooltip",$.proxy(this._onClickOutsideTooltipHide,this))},_onClickOutsideTooltipHide:function(){this._hideTooltip(),this._welTooltipWrap.off("clickoutside.tooltip")},_onMouseenterTooltipOpen:function(t){this._welTooltipLayer.doTimeout("hover",100,$.proxy(this._showTooltip,this))},_onMouseleaveTooltipClose:function(){this._welTooltipLayer.doTimeout("hover",100,$.proxy(this._hideTooltip,this))},_onMousemoveTooltip:function(t){this._showTooltip(t)},_showTooltip:function(t){this.config.position&&this._setTooltipPosition(t),$.isFunction(this.config.onBeforeShow)&&this.config.onBeforeShow(this.$elem,this.elem,this),this._welTooltipLayer.parent().addClass(this.config.activeClass).end().show(),$.isFunction(this.config.onShow)&&this.config.onShow(this.$elem,this.elem,this)},_hideTooltip:function(){this._welTooltipLayer.parent().removeClass(this.config.activeClass).end().hide(),$.isFunction(this.config.onHide)&&this.config.onHide(this.$elem,this.elem,this)},_setTooltipPosition:function(t){var i=0,o=parseInt(this.$elem.css("margin-left"),10)||0,e=o,s=0;this.config.follow&&(i=this.$elem.offset(),e=parseInt(t.pageX-i.left+o,10),s=parseInt(t.pageY-i.top,10)),this._welTooltipLayer.css(this._getPosition(e,s))},_getPosition:function(t,i){return this._htTarget={width:this.$elem.outerWidth(),height:this.$elem.outerHeight()},this._htTooltipLayer={width:this._welTooltipLayer.outerWidth(!0),height:this._welTooltipLayer.outerHeight(!0)},this._tooltipDirection(t,i)},_tooltipDirection:function(t,i){var o=0,e=0,s="left"===this.config.direction||"right"===this.config.direction,n="top"===this.config.direction||"bottom"===this.config.direction;switch(this.config.follow&&(this.config.top=this.config.top||5,this.config.bottom=this.config.bottom||25,this.config.left=this.config.left||10,this.config.right=this.config.right||20),this.config.direction){case"top":o=i-this._htTooltipLayer.height-this.config.top;break;case"bottom":o=this.config.follow?i+this.config.bottom:i+this._htTarget.height+this.config.bottom;break;case"right":e=this.config.follow?t+this.config.right:t+this._htTarget.width+this.config.right;break;default:e=t-this._htTooltipLayer.width-this.config.left}return s&&(o=this._verticalAlign(i)),n&&(e=this._horizonAlign(t)),{top:o,left:e}},_horizonAlign:function(t){var i={left:t+this.config.right,right:t-(this._htTooltipLayer.width-this._htTarget.width)-this.config.left,center:t-(this._htTooltipLayer.width-this._htTarget.width)/2};return this.config.follow&&(i.right=t-this._htTooltipLayer.width-this.config.left,i.center=t-this._htTooltipLayer.width/2),i[this.config.align]},_verticalAlign:function(t){var i={top:t+this.config.top,bottom:t-(this._htTooltipLayer.height-this._htTarget.height)-this.config.bottom,middle:t-(this._htTooltipLayer.height-this._htTarget.height)/2};return i[this.config.align]},option:function(t,i){if(i)this.config[t]=i;else if(t)return this.config[t]}},Plugin.defaults=Plugin.prototype.defaults,$.fn[pluginName]=function(t){var i=arguments;if(t===undefined||"object"==typeof t)return this.each(function(){$.data(this,"plugin_"+pluginName)||$.data(this,"plugin_"+pluginName,new Plugin(this,t))});if("string"==typeof t&&"_"!==t[0]&&"init"!==t){var o;return this.each(function(){var e=$.data(this,"plugin_"+pluginName);e instanceof Plugin&&"function"==typeof e[t]&&(o=e[t].apply(e,Array.prototype.slice.call(i,1)))}),o!==undefined?o:this}}}(window.jQuery||window.Zepto,window,document);
//jquery.dropdown
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e="dropdown",i={originalHidden:!1,printPlaceHolder:!0,targetArea:t(),selectSuffix:"-selected",listSuffix:"-list",items:"ul",item:"li",onChanged:t.noop,onInit:t.noop,onDestroy:t.noop,onRefreshed:t.noop},s=function(){function s(s,n){this.el=s,this.wel=t(this.el),this.options=t.extend({},i,n),this._defaults=i,this._name=e,this.init()}return s.prototype={option:function(t,e){return e?void(this.options[t]=e):this.options[t]},hook:function(t){void 0!==this.options[t]&&this.options[t].call(this)},init:function(){this.options.originalHidden&&this.wel.hide(),this._create(),this.hook("onInit")},_create:function(){this.wel.is("select")&&(this._sTemplate=this.wel.data("template"),this._cacheTempalte(),this._makeData(),this._assignElement(),this._appendElements(),this._checkHiddenElements(),this._attachEventHandlers())},_cacheTempalte:function(){t(this.wel.data("template")).template(this._sTemplate+"tpl"),t(this.wel.data("template")+this.options.selectSuffix).template(this._sTemplate+"tplSelected"),t(this.wel.data("template")+this.options.listSuffix).template(this._sTemplate+"tplList")},_makeData:function(){var e=this;this.selectData={placeholder:null,selected:null,items:[]},this.selectedIndex=0,t.each(this.wel.find("option"),function(i,s){var n=t(s),o={value:n.attr("value"),label:n.text(),selected:n.is(":selected")},l=n.data();t.each(l,function(t,e){o[t]=e}),n.is(":selected")&&(e.selectData.selected=o,e.selectedIndex=i),0==i&&(e.selectData.placeholder=o.label),e.selectData.items.push(o)})},_assignElement:function(){this.welTargetSelect=t(this.wel.data("target")),this.$select=t.tmpl(this._sTemplate+"tplSelected",this.selectData.selected),this.$selectWrap=t.tmpl(this._sTemplate+"tpl",this.selectData)},_checkHiddenElements:function(){"T"===this.wel.data("hidden")&&this.$selectWrap.hide(0)},_appendElements:function(){this.options.targetArea.length?this.$selectWrap.appendTo(this.options.targetArea):this.wel.after(this.$selectWrap)},_removeElements:function(){this.$select.remove(),this.$selectWrap.remove()},_attachEventHandlers:function(){this.wel.on("change."+e,t.proxy(this._onChangeSelect,this)),this.$selectWrap.on("click."+e,this.options.item,t.proxy(this._onClickItem,this)),this.$selectWrap.on("click."+e,"li.disabled a",function(t){t.preventDefault()}),this.$selectWrap.on("click."+e,"._drop_select",t.proxy(this._onClickSelect,this)),this.wel.on("refreshList."+e,t.proxy(this._onRefreshList,this)),this.wel.on("refreshLabel."+e,t.proxy(this._onRefreshLabel,this)),this.wel.on("sync."+e,t.proxy(this._onSync,this)),this.wel.on("close."+e,t.proxy(this._onClose,this)),this.wel.on("open."+e,t.proxy(this._onOpen,this)),this.wel.on("destroy."+e,t.proxy(this._onDestroy,this))},_onChangeSelect:function(e){this._chooseItemByIdx(t(e.currentTarget).find("option:selected").index())},_onSync:function(){this._makeData(),this._renderSelect(),this._renderList(),this.hook("onSync")},_onOpen:function(){this.hook("onOpen")},_onClose:function(){this.hook("onClose")},_onDestroy:function(){this.destroy(),this.hook("onDestroy")},_onClickSelect:function(t){t.preventDefault(),this.hook("onClickSelect")},_onClickItem:function(t){t.preventDefault(),this._chooseItem(t.currentTarget)},_chooseItemByIdx:function(t){var e=this.selectData.items[t]||"";this._printSelect(e.label),this.selectedIndex=t,this.wel.val(e.value)},_printSelect:function(t){},_renderSelect:function(){t.tmpl(this._sTemplate+"tplSelected",this.selectData.selected).appendTo(this.$selectWrap.find("._drop_select").empty())},_renderList:function(){t.tmpl(this._sTemplate+"tplList",{items:this.selectData.items}).appendTo(this.$selectWrap.find("._drop_list").empty())},_chooseItem:function(e){var i=t(e).data("index"),s=this.selectData.items[i];this.selectedIndex=i,this.wel.val(s.value),this.hook("onChanged")},show:function(){this.$selectWrap.show(0)},hide:function(){this.$selectWrap.hide(0)},destroy:function(){this._removeElements(),t.data(this.el,"plugin_"+e)&&t.data(this.el,"plugin_"+e,null)}},s}();t.fn[e]=function(i){var n=arguments;if(void 0===i||"object"==typeof i)return this.each(function(){t.data(this,"plugin_"+e)||t.data(this,"plugin_"+e,new s(this,i))});if("string"==typeof i&&"_"!==i[0]&&"init"!==i){var o;return this.each(function(){var l=t.data(this,"plugin_"+e);l instanceof s&&"function"==typeof l[i]?o=l[i].apply(l,Array.prototype.slice.call(n,1)):t.error("Method "+i+" does not exist"),"destroy"===i&&t.data(this,"plugin_"+e,null)}),void 0!==o?o:this}}});
//jquery.tabs
!function(n){jQuery.fn.tabs=function(e){var a={sActiveClass:"on",elTabBtn:">li",elTabPanel:">div>div",elFilter:"a",nDefaultIndex:0,fnChange:null},i=n.extend({},a,e);return this.each(function(){var e=n(this),a=e.find(i.elTabBtn),t=e.find(i.elTabPanel),l=i.sActiveClass;a.on("click",i.elFilter,function(e){e.preventDefault();var s=n(this),r=a.index(s.parent());return s.parent().hasClass(l)?!1:(s.parent().addClass(l).siblings().removeClass(l),t.hide().eq(r).show(),void(n.isFunction(i.fnChange)&&i.fnChange.call(this,t.eq(r))))})})}}(jQuery);
//waypoints
!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();
//sticky
!function(){"use strict";function t(s){this.options=e.extend({},i.defaults,t.defaults,s),this.element=this.options.element,this.$element=e(this.element),this.createWrapper(),this.createWaypoint()}var e=window.jQuery,i=window.Waypoint;t.prototype.createWaypoint=function(){var t=this.options.handler;this.waypoint=new i(e.extend({},this.options,{element:this.wrapper,handler:e.proxy(function(e){var i=this.options.direction.indexOf(e)>-1,s=i?this.$element.outerHeight(!0):"";this.$wrapper.height(s),this.$element.toggleClass(this.options.stuckClass,i),t&&t.call(this,e)},this)}))},t.prototype.createWrapper=function(){this.options.wrapper&&this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},t.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass),this.options.wrapper&&this.$element.unwrap())},t.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},i.Sticky=t}();
//jquery.clearInput(placeholder)
!function(t,e,n,i){function s(e,n){this.element=e,this.$element=t(e),this.options=t.extend({},o,n),this._defaults=o,this._name=l,this.init()}t.support.placeholder=function(){var t=n.createElement("input");return"placeholder"in t}();var l="clearInput",o={returnFocus:!0};s.prototype={init:function(){this.attachEventHandlers()},attachEventHandlers:function(){this.$element.on("focus",t.proxy(this._onFocusInput,this)),this.$element.on("keyup",t.proxy(this._onKeyUpInput,this)),this.$element.next("button").on("click",t.proxy(this._onClickClearBtn,this))},_onFocusInput:function(){t.support.placeholder?this.$element.parent().toggleClass("on",this.$element.val().length>=1):this.$element.parent().toggleClass("on",this.$element.val()!==this.$element.attr("placeholder")&&this.$element.val().length>=1)},_onKeyUpInput:function(){this.$element.parent().toggleClass("on",this.$element.val().length>=1)},_onClickClearBtn:function(){this.$element.val(""),this.$element.parent().removeClass("on"),this.options.returnFocus===!0&&this.$element.focus()},hasText:function(){return this.$element.val().replace(/^\s+|\s+$/g,"").length>0}},t.fn[l]=function(e){return this.each(function(){t.data(this,"plugin_"+l)||t.data(this,"plugin_"+l,new s(this,e))})}}(jQuery,window,document);
//jquery.customInput
!function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){"use strict";var e="customInput",i={templatVar:"ssgCustomTmpl",template:'<span class="custom_{{= type}} {{if checked}} on{{/if}}"><label for="{{= id}}">{{= label}}</label></span>',prefix:".custom_",radioSuffix:"rdo",checkSuffix:"chk",checkedClass:"on",disabledClass:"disabled",onChanged:t.noop,onInit:t.noop,onDestroy:t.noop},s=function(){function s(s,o){this.el=s,this.wel=t(this.el),this.options=t.extend({},i,o,this.wel.data()),this._defaults=i,this._name=e,this.init()}return s.prototype={option:function(t,e){return e?void(this.options[t]=e):this.options[t]},hook:function(t){void 0!==this.options[t]&&this.options[t].call(this)},init:function(){this._create(),this.hook("onInit")},_create:function(){this.wel.is("[type=checkbox],[type=radio]")&&(this._cacheTempalte(),this._makeData(),this._assignElement(),this._wrapElement(),this._attachEventHandlers())},_cacheTempalte:function(){this.options.template&&t.template(this.options.templatVar,this.options.template)},_makeData:function(){this.sType=this.wel.is("[type=checkbox]")?this.options.checkSuffix:this.options.radioSuffix,this.checkData=t.extend({type:this.sType,id:this.wel.attr("id"),checked:this.wel.is(":checked")},this.wel.data()),this.customSelector=this.options.prefix+this.sType},_assignElement:function(){this.$checkWrap=t.tmpl(this.options.templatVar,this.checkData)},_wrapElement:function(){this.$checkWrap.insertBefore(this.wel).prepend(this.wel)},_removeElements:function(){this.wel.insertBefore(this.$checkWrap),this.$checkWrap.remove()},_attachEventHandlers:function(){this.wel.on("change."+e,t.proxy(this._onChange,this))},_detachEventHandlers:function(){this.wel.off("change."+e,t.proxy(this._onChange,this))},_onChange:function(t){this.checkData.checked=this.wel.is(":checked"),this.$checkWrap.toggleClass(this.options.checkedClass,this.checkData.checked),this.wel.is(":checked")&&this.wel.is(":radio")&&this._checkRadio(),this.hook("onChanged")},_checkRadio:function(){var e=t("input[name="+this.wel.attr("name")+"]");e.not(this.wel).parents(this.customSelector).removeClass(this.options.checkedClass)},_onDestroy:function(){this.destroy(),this.hook("onDestroy")},check:function(){this.wel.prop("checked",!0).attr("checked",!0).parent(this.customSelector).addClass(this.options.checkedClass)},uncheck:function(){this.wel.prop("checked",!1).attr("checked",!1).parent(this.customSelector).removeClass(this.options.checkedClass)},enable:function(){this.wel.removeAttr("disabled").parent(this.customSelector).removeClass(this.options.disabledClass)},disable:function(){this.wel.attr("disabled","disabled").parent(this.customSelector).addClass(this.options.disabledClass)},destroy:function(){this._removeElements(),t.data(this.el,"plugin_"+e)&&t.data(this.el,"plugin_"+e,null)}},s}();t.fn[e]=function(i){var o=arguments;if(void 0===i||"object"==typeof i)return this.each(function(){t.data(this,"plugin_"+e)||t.data(this,"plugin_"+e,new s(this,i))});if("string"==typeof i&&"_"!==i[0]&&"init"!==i){var n;return this.each(function(){var h=t.data(this,"plugin_"+e);h instanceof s&&"function"==typeof h[i]?n=h[i].apply(h,Array.prototype.slice.call(o,1)):t.error("Method "+i+" does not exist"),"destroy"===i&&t.data(this,"plugin_"+e,null)}),void 0!==n?n:this}}});
//scrollreachbottom
!function(l){l.scrollgap=0,l.event.special.scrollreachbottom={setup:function(t,o){t&&t.gap&&(l.scrollgap=t.gap),l(this).on("scroll",l.event.special.scrollreachbottom.handler)},teardown:function(t){l(this).off("scroll",l.event.special.scrollreachbottom.handler)},handler:function(t){var o=this;l(this).scrollTop()+l(this).height()>=l(document).height()-l.scrollgap&&(t.type="scrollreachbottom",l.event.dispatch.call(o,t))}}}(jQuery);
//스페셜 이벤트/mousestop
!function(t){function e(){var e=this,o=t(this).data("mousestop");this.movement=!0,o.timeToStop&&(this.timeToStopTimer=window.setTimeout(function(){e.movement=!1,window.clearTimeout(e.timer)},o.timeToStop))}function o(){window.clearTimeout(this.timer),window.clearTimeout(this.timeToStopTimer)}function i(){var e=t(this),o=e.data("mousestop");this.movement&&(window.clearTimeout(this.timer),this.timer=window.setTimeout(function(){e.trigger("mousestop")},o.delay))}function s(e){return t.isNumeric(e)?e={delay:e}:"object"!=typeof e&&(e={}),t.extend({},t.fn.mousestop.defaults,e)}t.event.special.mousestop={setup:function(n){t(this).data("mousestop",s(n)).bind("mouseenter.mousestop",e).bind("mouseleave.mousestop",o).bind("mousemove.mousestop",i)},teardown:function(){t(this).removeData("mousestop").unbind(".mousestop")}},t.fn.mousestop=function(t,e){return"function"==typeof t&&(e=t),arguments.length>0?this.bind("mousestop",s(t),e):this.trigger("mousestop")},t.fn.mousestop.defaults={delay:300,timeToStop:null}}(jQuery);
// add replaceAll
String.prototype.replaceAll||(String.prototype.replaceAll=function(t,r){return this.split(t).join(r)});
// easing 플로팅배너
jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(e,t,n,r,i){return jQuery.easing[jQuery.easing.def](e,t,n,r,i)},easeInQuad:function(e,t,n,r,i){return r*(t/=i)*t+n},easeOutQuad:function(e,t,n,r,i){return-r*(t/=i)*(t-2)+n},easeInOutQuad:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t+n;return-r/2*(--t*(t-2)-1)+n},easeInCubic:function(e,t,n,r,i){return r*(t/=i)*t*t+n},easeOutCubic:function(e,t,n,r,i){return r*((t=t/i-1)*t*t+1)+n},easeInOutCubic:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t+n;return r/2*((t-=2)*t*t+2)+n},easeInQuart:function(e,t,n,r,i){return r*(t/=i)*t*t*t+n},easeOutQuart:function(e,t,n,r,i){return-r*((t=t/i-1)*t*t*t-1)+n},easeInOutQuart:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t+n;return-r/2*((t-=2)*t*t*t-2)+n},easeInQuint:function(e,t,n,r,i){return r*(t/=i)*t*t*t*t+n},easeOutQuint:function(e,t,n,r,i){return r*((t=t/i-1)*t*t*t*t+1)+n},easeInOutQuint:function(e,t,n,r,i){if((t/=i/2)<1)return r/2*t*t*t*t*t+n;return r/2*((t-=2)*t*t*t*t+2)+n},easeInSine:function(e,t,n,r,i){return-r*Math.cos(t/i*(Math.PI/2))+r+n},easeOutSine:function(e,t,n,r,i){return r*Math.sin(t/i*(Math.PI/2))+n},easeInOutSine:function(e,t,n,r,i){return-r/2*(Math.cos(Math.PI*t/i)-1)+n},easeInExpo:function(e,t,n,r,i){return t==0?n:r*Math.pow(2,10*(t/i-1))+n},easeOutExpo:function(e,t,n,r,i){return t==i?n+r:r*(-Math.pow(2,-10*t/i)+1)+n},easeInOutExpo:function(e,t,n,r,i){if(t==0)return n;if(t==i)return n+r;if((t/=i/2)<1)return r/2*Math.pow(2,10*(t-1))+n;return r/2*(-Math.pow(2,-10*--t)+2)+n},easeInCirc:function(e,t,n,r,i){return-r*(Math.sqrt(1-(t/=i)*t)-1)+n},easeOutCirc:function(e,t,n,r,i){return r*Math.sqrt(1-(t=t/i-1)*t)+n},easeInOutCirc:function(e,t,n,r,i){if((t/=i/2)<1)return-r/2*(Math.sqrt(1-t*t)-1)+n;return r/2*(Math.sqrt(1-(t-=2)*t)+1)+n},easeInElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return-(u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o))+n},easeOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i)==1)return n+r;if(!o)o=i*.3;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);return u*Math.pow(2,-10*t)*Math.sin((t*i-s)*2*Math.PI/o)+r+n},easeInOutElastic:function(e,t,n,r,i){var s=1.70158;var o=0;var u=r;if(t==0)return n;if((t/=i/2)==2)return n+r;if(!o)o=i*.3*1.5;if(u<Math.abs(r)){u=r;var s=o/4}else var s=o/(2*Math.PI)*Math.asin(r/u);if(t<1)return-.5*u*Math.pow(2,10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)+n;return u*Math.pow(2,-10*(t-=1))*Math.sin((t*i-s)*2*Math.PI/o)*.5+r+n},easeInBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*(t/=i)*t*((s+1)*t-s)+n},easeOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;return r*((t=t/i-1)*t*((s+1)*t+s)+1)+n},easeInOutBack:function(e,t,n,r,i,s){if(s==undefined)s=1.70158;if((t/=i/2)<1)return r/2*t*t*(((s*=1.525)+1)*t-s)+n;return r/2*((t-=2)*t*(((s*=1.525)+1)*t+s)+2)+n},easeInBounce:function(e,t,n,r,i){return r-jQuery.easing.easeOutBounce(e,i-t,0,r,i)+n},easeOutBounce:function(e,t,n,r,i){if((t/=i)<1/2.75){return r*7.5625*t*t+n}else if(t<2/2.75){return r*(7.5625*(t-=1.5/2.75)*t+.75)+n}else if(t<2.5/2.75){return r*(7.5625*(t-=2.25/2.75)*t+.9375)+n}else{return r*(7.5625*(t-=2.625/2.75)*t+.984375)+n}},easeInOutBounce:function(e,t,n,r,i){if(t<i/2)return jQuery.easing.easeInBounce(e,t*2,0,r,i)*.5+n;return jQuery.easing.easeOutBounce(e,t*2-i,0,r,i)*.5+r*.5+n}});
//placeholder:later
// Browser & OS version check
var DUI={};DUI.check={browser:function(){var i=navigator.userAgent,a={ie6:i.match(/msie 6.0/i),ie7:i.match(/msie 7.0/i),ie8:i.match(/msie 8.0/i),ie9:i.match(/msie 9.0/i),ie10:i.match(/msie 10.0/i),ie11:i.match(/rv:11.0/i),edge:i.match(/edge/i),chrome:i.match(/chrome/i),safari:i.match(/safari/i),firefox:i.match(/firefox/i),opera:i.match(/opera/i)};for(prop in a)if(a[prop])return prop}(),os:function(){var i=navigator.userAgent,a={xp:i.match(/NT 5.1/i),vista:i.match(/NT 6.0/i),win7:i.match(/NT 6.1/i),win8:i.match(/NT 6.2/i),"win8.1":i.match(/NT 6.3/i),win10:i.match(/NT 6.4/i)};for(prop in a)if(a[prop])return prop}()};
// jquery.a11y
!function(e){function t(e){for(var t=e.css("visibility");"inherit"===t;)e=e.parent(),t=e.css("visibility");return"hidden"!==t}function a(t){if(9==t.which){var a=e.a11y.elTrap.find("*"),n=a.filter(":focusable"),r=jQuery(":focus"),o=n.length,i=n.index(r);t.shiftKey?0==i&&(n.get(o-1).focus(),t.preventDefault()):i==o-1&&(n.get(0).focus(),t.preventDefault())}}function n(t){var n=t.which||t.keyCode;n===f&&(t.preventDefault(),e.a11y.elTrap.trigger(e.Event("trap.esc")),i()),n===l&&a(t)}function r(){var t=e.a11y.elTrap.find("*");t.filter(":focusable").first().focus()}function o(){e.a11y.elTrap.on("keydown",e.proxy(n,this))}function i(){e.a11y.elTrap.off("keydown",e.proxy(n,this))}e.a11y=e.a11y||{},e.a11y.elFocusedBefore=null,e.a11y.elTrap=null,e.a11y.focusable=function(a,n){var r,o,i,l,f,s=a.nodeName.toLowerCase();return"area"===s?(r=a.parentNode,o=r.name,a.href&&o&&"map"===r.nodeName.toLowerCase()?(i=e("img[usemap='#"+o+"']"),i.length>0&&i.is(":visible")):!1):(/^(input|select|textarea|button|object)$/.test(s)?(l=!a.disabled,l&&(f=e(a).closest("fieldset")[0],f&&(l=!f.disabled))):l="a"===s?a.href||n:n,l&&e(a).is(":visible")&&t(e(a)))},e.extend(e.expr[":"],{focusable:function(t){return e.a11y.focusable(t,null!=e.attr(t,"tabindex"))}});var l=9,f=27;e.extend(e.a11y,{trap:function(t,a){var n=e(t);n.length?(e.a11y.elTrap=n,r(),o(),e.a11y.elTrap.one("trap.esc",function(){a&&a(),e.a11y.elFocusedBefore&&e.a11y.elFocusedBefore.focus()})):e.error("Element does not exist")},markActiveElement:function(){e.a11y.elFocusedBefore=document.activeElement}})}(jQuery);
// tooltipster v4.2.5
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof exports?module.exports=b(require("jquery")):b(jQuery)}(this,function(a){function b(a){this.$container,this.constraints=null,this.__$tooltip,this.__init(a)}function c(b,c){var d=!0;return a.each(b,function(a,e){return void 0===c[a]||b[a]!==c[a]?(d=!1,!1):void 0}),d}function d(b){var c=b.attr("id"),d=c?h.window.document.getElementById(c):null;return d?d===b[0]:a.contains(h.window.document.body,b[0])}function e(){if(!g)return!1;var a=g.document.body||g.document.documentElement,b=a.style,c="transition",d=["Moz","Webkit","Khtml","O","ms"];if("string"==typeof b[c])return!0;c=c.charAt(0).toUpperCase()+c.substr(1);for(var e=0;e<d.length;e++)if("string"==typeof b[d[e]+c])return!0;return!1}var f={animation:"fade",animationDuration:350,content:null,contentAsHTML:!1,contentCloning:!1,debug:!0,delay:300,delayTouch:[300,500],functionInit:null,functionBefore:null,functionReady:null,functionAfter:null,functionFormat:null,IEmin:6,interactive:!1,multiple:!1,parent:null,plugins:["sideTip"],repositionOnScroll:!1,restoration:"none",selfDestruction:!0,theme:[],timer:0,trackerInterval:500,trackOrigin:!1,trackTooltip:!1,trigger:"hover",triggerClose:{click:!1,mouseleave:!1,originClick:!1,scroll:!1,tap:!1,touchleave:!1},triggerOpen:{click:!1,mouseenter:!1,tap:!1,touchstart:!1},updateAnimation:"rotate",zIndex:9999999},g="undefined"!=typeof window?window:null,h={hasTouchCapability:!(!g||!("ontouchstart"in g||g.DocumentTouch&&g.document instanceof g.DocumentTouch||g.navigator.maxTouchPoints)),hasTransitions:e(),IE:!1,semVer:"4.2.5",window:g},i=function(){this.__$emitterPrivate=a({}),this.__$emitterPublic=a({}),this.__instancesLatestArr=[],this.__plugins={},this._env=h};i.prototype={__bridge:function(b,c,d){if(!c[d]){var e=function(){};e.prototype=b;var g=new e;g.__init&&g.__init(c),a.each(b,function(a,b){0!=a.indexOf("__")&&(c[a]?f.debug&&console.log("The "+a+" method of the "+d+" plugin conflicts with another plugin or native methods"):(c[a]=function(){return g[a].apply(g,Array.prototype.slice.apply(arguments))},c[a].bridged=g))}),c[d]=g}return this},__setWindow:function(a){return h.window=a,this},_getRuler:function(a){return new b(a)},_off:function(){return this.__$emitterPrivate.off.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_on:function(){return this.__$emitterPrivate.on.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_one:function(){return this.__$emitterPrivate.one.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_plugin:function(b){var c=this;if("string"==typeof b){var d=b,e=null;return d.indexOf(".")>0?e=c.__plugins[d]:a.each(c.__plugins,function(a,b){return b.name.substring(b.name.length-d.length-1)=="."+d?(e=b,!1):void 0}),e}if(b.name.indexOf(".")<0)throw new Error("Plugins must be namespaced");return c.__plugins[b.name]=b,b.core&&c.__bridge(b.core,c,b.name),this},_trigger:function(){var a=Array.prototype.slice.apply(arguments);return"string"==typeof a[0]&&(a[0]={type:a[0]}),this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate,a),this.__$emitterPublic.trigger.apply(this.__$emitterPublic,a),this},instances:function(b){var c=[],d=b||".tooltipstered";return a(d).each(function(){var b=a(this),d=b.data("tooltipster-ns");d&&a.each(d,function(a,d){c.push(b.data(d))})}),c},instancesLatest:function(){return this.__instancesLatestArr},off:function(){return this.__$emitterPublic.off.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},on:function(){return this.__$emitterPublic.on.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},one:function(){return this.__$emitterPublic.one.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},origins:function(b){var c=b?b+" ":"";return a(c+".tooltipstered").toArray()},setDefaults:function(b){return a.extend(f,b),this},triggerHandler:function(){return this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this}},a.tooltipster=new i,a.Tooltipster=function(b,c){this.__callbacks={close:[],open:[]},this.__closingTime,this.__Content,this.__contentBcr,this.__destroyed=!1,this.__$emitterPrivate=a({}),this.__$emitterPublic=a({}),this.__enabled=!0,this.__garbageCollector,this.__Geometry,this.__lastPosition,this.__namespace="tooltipster-"+Math.round(1e6*Math.random()),this.__options,this.__$originParents,this.__pointerIsOverOrigin=!1,this.__previousThemes=[],this.__state="closed",this.__timeouts={close:[],open:null},this.__touchEvents=[],this.__tracker=null,this._$origin,this._$tooltip,this.__init(b,c)},a.Tooltipster.prototype={__init:function(b,c){var d=this;if(d._$origin=a(b),d.__options=a.extend(!0,{},f,c),d.__optionsFormat(),!h.IE||h.IE>=d.__options.IEmin){var e=null;if(void 0===d._$origin.data("tooltipster-initialTitle")&&(e=d._$origin.attr("title"),void 0===e&&(e=null),d._$origin.data("tooltipster-initialTitle",e)),null!==d.__options.content)d.__contentSet(d.__options.content);else{var g,i=d._$origin.attr("data-tooltip-content");i&&(g=a(i)),g&&g[0]?d.__contentSet(g.first()):d.__contentSet(e)}d._$origin.removeAttr("title").addClass("tooltipstered"),d.__prepareOrigin(),d.__prepareGC(),a.each(d.__options.plugins,function(a,b){d._plug(b)}),h.hasTouchCapability&&a(h.window.document.body).on("touchmove."+d.__namespace+"-triggerOpen",function(a){d._touchRecordEvent(a)}),d._on("created",function(){d.__prepareTooltip()})._on("repositioned",function(a){d.__lastPosition=a.position})}else d.__options.disabled=!0},__contentInsert:function(){var a=this,b=a._$tooltip.find(".tooltipster-content"),c=a.__Content,d=function(a){c=a};return a._trigger({type:"format",content:a.__Content,format:d}),a.__options.functionFormat&&(c=a.__options.functionFormat.call(a,a,{origin:a._$origin[0]},a.__Content)),"string"!=typeof c||a.__options.contentAsHTML?b.empty().append(c):b.text(c),a},__contentSet:function(b){return b instanceof a&&this.__options.contentCloning&&(b=b.clone(!0)),this.__Content=b,this._trigger({type:"updated",content:b}),this},__destroyError:function(){throw new Error("This tooltip has been destroyed and cannot execute your method call.")},__geometry:function(){var b=this,c=b._$origin,d=b._$origin.is("area");if(d){var e=b._$origin.parent().attr("name");c=a('img[usemap="#'+e+'"]')}var f=c[0].getBoundingClientRect(),g=a(h.window.document),i=a(h.window),j=c,k={available:{document:null,window:null},document:{size:{height:g.height(),width:g.width()}},window:{scroll:{left:h.window.scrollX||h.window.document.documentElement.scrollLeft,top:h.window.scrollY||h.window.document.documentElement.scrollTop},size:{height:i.height(),width:i.width()}},origin:{fixedLineage:!1,offset:{},size:{height:f.bottom-f.top,width:f.right-f.left},usemapImage:d?c[0]:null,windowOffset:{bottom:f.bottom,left:f.left,right:f.right,top:f.top}}};if(d){var l=b._$origin.attr("shape"),m=b._$origin.attr("coords");if(m&&(m=m.split(","),a.map(m,function(a,b){m[b]=parseInt(a)})),"default"!=l)switch(l){case"circle":var n=m[0],o=m[1],p=m[2],q=o-p,r=n-p;k.origin.size.height=2*p,k.origin.size.width=k.origin.size.height,k.origin.windowOffset.left+=r,k.origin.windowOffset.top+=q;break;case"rect":var s=m[0],t=m[1],u=m[2],v=m[3];k.origin.size.height=v-t,k.origin.size.width=u-s,k.origin.windowOffset.left+=s,k.origin.windowOffset.top+=t;break;case"poly":for(var w=0,x=0,y=0,z=0,A="even",B=0;B<m.length;B++){var C=m[B];"even"==A?(C>y&&(y=C,0===B&&(w=y)),w>C&&(w=C),A="odd"):(C>z&&(z=C,1==B&&(x=z)),x>C&&(x=C),A="even")}k.origin.size.height=z-x,k.origin.size.width=y-w,k.origin.windowOffset.left+=w,k.origin.windowOffset.top+=x}}var D=function(a){k.origin.size.height=a.height,k.origin.windowOffset.left=a.left,k.origin.windowOffset.top=a.top,k.origin.size.width=a.width};for(b._trigger({type:"geometry",edit:D,geometry:{height:k.origin.size.height,left:k.origin.windowOffset.left,top:k.origin.windowOffset.top,width:k.origin.size.width}}),k.origin.windowOffset.right=k.origin.windowOffset.left+k.origin.size.width,k.origin.windowOffset.bottom=k.origin.windowOffset.top+k.origin.size.height,k.origin.offset.left=k.origin.windowOffset.left+k.window.scroll.left,k.origin.offset.top=k.origin.windowOffset.top+k.window.scroll.top,k.origin.offset.bottom=k.origin.offset.top+k.origin.size.height,k.origin.offset.right=k.origin.offset.left+k.origin.size.width,k.available.document={bottom:{height:k.document.size.height-k.origin.offset.bottom,width:k.document.size.width},left:{height:k.document.size.height,width:k.origin.offset.left},right:{height:k.document.size.height,width:k.document.size.width-k.origin.offset.right},top:{height:k.origin.offset.top,width:k.document.size.width}},k.available.window={bottom:{height:Math.max(k.window.size.height-Math.max(k.origin.windowOffset.bottom,0),0),width:k.window.size.width},left:{height:k.window.size.height,width:Math.max(k.origin.windowOffset.left,0)},right:{height:k.window.size.height,width:Math.max(k.window.size.width-Math.max(k.origin.windowOffset.right,0),0)},top:{height:Math.max(k.origin.windowOffset.top,0),width:k.window.size.width}};"html"!=j[0].tagName.toLowerCase();){if("fixed"==j.css("position")){k.origin.fixedLineage=!0;break}j=j.parent()}return k},__optionsFormat:function(){return"number"==typeof this.__options.animationDuration&&(this.__options.animationDuration=[this.__options.animationDuration,this.__options.animationDuration]),"number"==typeof this.__options.delay&&(this.__options.delay=[this.__options.delay,this.__options.delay]),"number"==typeof this.__options.delayTouch&&(this.__options.delayTouch=[this.__options.delayTouch,this.__options.delayTouch]),"string"==typeof this.__options.theme&&(this.__options.theme=[this.__options.theme]),null===this.__options.parent?this.__options.parent=a(h.window.document.body):"string"==typeof this.__options.parent&&(this.__options.parent=a(this.__options.parent)),"hover"==this.__options.trigger?(this.__options.triggerOpen={mouseenter:!0,touchstart:!0},this.__options.triggerClose={mouseleave:!0,originClick:!0,touchleave:!0}):"click"==this.__options.trigger&&(this.__options.triggerOpen={click:!0,tap:!0},this.__options.triggerClose={click:!0,tap:!0}),this._trigger("options"),this},__prepareGC:function(){var b=this;return b.__options.selfDestruction?b.__garbageCollector=setInterval(function(){var c=(new Date).getTime();b.__touchEvents=a.grep(b.__touchEvents,function(a,b){return c-a.time>6e4}),d(b._$origin)||b.close(function(){b.destroy()})},2e4):clearInterval(b.__garbageCollector),b},__prepareOrigin:function(){var a=this;if(a._$origin.off("."+a.__namespace+"-triggerOpen"),h.hasTouchCapability&&a._$origin.on("touchstart."+a.__namespace+"-triggerOpen touchend."+a.__namespace+"-triggerOpen touchcancel."+a.__namespace+"-triggerOpen",function(b){a._touchRecordEvent(b)}),a.__options.triggerOpen.click||a.__options.triggerOpen.tap&&h.hasTouchCapability){var b="";a.__options.triggerOpen.click&&(b+="click."+a.__namespace+"-triggerOpen "),a.__options.triggerOpen.tap&&h.hasTouchCapability&&(b+="touchend."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){a._touchIsMeaningfulEvent(b)&&a._open(b)})}if(a.__options.triggerOpen.mouseenter||a.__options.triggerOpen.touchstart&&h.hasTouchCapability){var b="";a.__options.triggerOpen.mouseenter&&(b+="mouseenter."+a.__namespace+"-triggerOpen "),a.__options.triggerOpen.touchstart&&h.hasTouchCapability&&(b+="touchstart."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){!a._touchIsTouchEvent(b)&&a._touchIsEmulatedEvent(b)||(a.__pointerIsOverOrigin=!0,a._openShortly(b))})}if(a.__options.triggerClose.mouseleave||a.__options.triggerClose.touchleave&&h.hasTouchCapability){var b="";a.__options.triggerClose.mouseleave&&(b+="mouseleave."+a.__namespace+"-triggerOpen "),a.__options.triggerClose.touchleave&&h.hasTouchCapability&&(b+="touchend."+a.__namespace+"-triggerOpen touchcancel."+a.__namespace+"-triggerOpen"),a._$origin.on(b,function(b){a._touchIsMeaningfulEvent(b)&&(a.__pointerIsOverOrigin=!1)})}return a},__prepareTooltip:function(){var b=this,c=b.__options.interactive?"auto":"";return b._$tooltip.attr("id",b.__namespace).css({"pointer-events":c,zIndex:b.__options.zIndex}),a.each(b.__previousThemes,function(a,c){b._$tooltip.removeClass(c)}),a.each(b.__options.theme,function(a,c){b._$tooltip.addClass(c)}),b.__previousThemes=a.merge([],b.__options.theme),b},__scrollHandler:function(b){var c=this;if(c.__options.triggerClose.scroll)c._close(b);else if(d(c._$origin)&&d(c._$tooltip)){var e=null;if(b.target===h.window.document)c.__Geometry.origin.fixedLineage||c.__options.repositionOnScroll&&c.reposition(b);else{e=c.__geometry();var f=!1;if("fixed"!=c._$origin.css("position")&&c.__$originParents.each(function(b,c){var d=a(c),g=d.css("overflow-x"),h=d.css("overflow-y");if("visible"!=g||"visible"!=h){var i=c.getBoundingClientRect();if("visible"!=g&&(e.origin.windowOffset.left<i.left||e.origin.windowOffset.right>i.right))return f=!0,!1;if("visible"!=h&&(e.origin.windowOffset.top<i.top||e.origin.windowOffset.bottom>i.bottom))return f=!0,!1}return"fixed"==d.css("position")?!1:void 0}),f)c._$tooltip.css("visibility","hidden");else if(c._$tooltip.css("visibility","visible"),c.__options.repositionOnScroll)c.reposition(b);else{var g=e.origin.offset.left-c.__Geometry.origin.offset.left,i=e.origin.offset.top-c.__Geometry.origin.offset.top;c._$tooltip.css({left:c.__lastPosition.coord.left+g,top:c.__lastPosition.coord.top+i})}}c._trigger({type:"scroll",event:b,geo:e})}return c},__stateSet:function(a){return this.__state=a,this._trigger({type:"state",state:a}),this},__timeoutsClear:function(){return clearTimeout(this.__timeouts.open),this.__timeouts.open=null,a.each(this.__timeouts.close,function(a,b){clearTimeout(b)}),this.__timeouts.close=[],this},__trackerStart:function(){var a=this,b=a._$tooltip.find(".tooltipster-content");return a.__options.trackTooltip&&(a.__contentBcr=b[0].getBoundingClientRect()),a.__tracker=setInterval(function(){if(d(a._$origin)&&d(a._$tooltip)){if(a.__options.trackOrigin){var e=a.__geometry(),f=!1;c(e.origin.size,a.__Geometry.origin.size)&&(a.__Geometry.origin.fixedLineage?c(e.origin.windowOffset,a.__Geometry.origin.windowOffset)&&(f=!0):c(e.origin.offset,a.__Geometry.origin.offset)&&(f=!0)),f||(a.__options.triggerClose.mouseleave?a._close():a.reposition())}if(a.__options.trackTooltip){var g=b[0].getBoundingClientRect();g.height===a.__contentBcr.height&&g.width===a.__contentBcr.width||(a.reposition(),a.__contentBcr=g)}}else a._close()},a.__options.trackerInterval),a},_close:function(b,c,d){var e=this,f=!0;if(e._trigger({type:"close",event:b,stop:function(){f=!1}}),f||d){c&&e.__callbacks.close.push(c),e.__callbacks.open=[],e.__timeoutsClear();var g=function(){a.each(e.__callbacks.close,function(a,c){c.call(e,e,{event:b,origin:e._$origin[0]})}),e.__callbacks.close=[]};if("closed"!=e.__state){var i=!0,j=new Date,k=j.getTime(),l=k+e.__options.animationDuration[1];if("disappearing"==e.__state&&l>e.__closingTime&&e.__options.animationDuration[1]>0&&(i=!1),i){e.__closingTime=l,"disappearing"!=e.__state&&e.__stateSet("disappearing");var m=function(){clearInterval(e.__tracker),e._trigger({type:"closing",event:b}),e._$tooltip.off("."+e.__namespace+"-triggerClose").removeClass("tooltipster-dying"),a(h.window).off("."+e.__namespace+"-triggerClose"),e.__$originParents.each(function(b,c){a(c).off("scroll."+e.__namespace+"-triggerClose")}),e.__$originParents=null,a(h.window.document.body).off("."+e.__namespace+"-triggerClose"),e._$origin.off("."+e.__namespace+"-triggerClose"),e._off("dismissable"),e.__stateSet("closed"),e._trigger({type:"after",event:b}),e.__options.functionAfter&&e.__options.functionAfter.call(e,e,{event:b,origin:e._$origin[0]}),g()};h.hasTransitions?(e._$tooltip.css({"-moz-animation-duration":e.__options.animationDuration[1]+"ms","-ms-animation-duration":e.__options.animationDuration[1]+"ms","-o-animation-duration":e.__options.animationDuration[1]+"ms","-webkit-animation-duration":e.__options.animationDuration[1]+"ms","animation-duration":e.__options.animationDuration[1]+"ms","transition-duration":e.__options.animationDuration[1]+"ms"}),e._$tooltip.clearQueue().removeClass("tooltipster-show").addClass("tooltipster-dying"),e.__options.animationDuration[1]>0&&e._$tooltip.delay(e.__options.animationDuration[1]),e._$tooltip.queue(m)):e._$tooltip.stop().fadeOut(e.__options.animationDuration[1],m)}}else g()}return e},_off:function(){return this.__$emitterPrivate.off.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_on:function(){return this.__$emitterPrivate.on.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_one:function(){return this.__$emitterPrivate.one.apply(this.__$emitterPrivate,Array.prototype.slice.apply(arguments)),this},_open:function(b,c){var e=this;if(!e.__destroying&&d(e._$origin)&&e.__enabled){var f=!0;if("closed"==e.__state&&(e._trigger({type:"before",event:b,stop:function(){f=!1}}),f&&e.__options.functionBefore&&(f=e.__options.functionBefore.call(e,e,{event:b,origin:e._$origin[0]}))),f!==!1&&null!==e.__Content){c&&e.__callbacks.open.push(c),e.__callbacks.close=[],e.__timeoutsClear();var g,i=function(){"stable"!=e.__state&&e.__stateSet("stable"),a.each(e.__callbacks.open,function(a,b){b.call(e,e,{origin:e._$origin[0],tooltip:e._$tooltip[0]})}),e.__callbacks.open=[]};if("closed"!==e.__state)g=0,"disappearing"===e.__state?(e.__stateSet("appearing"),h.hasTransitions?(e._$tooltip.clearQueue().removeClass("tooltipster-dying").addClass("tooltipster-show"),e.__options.animationDuration[0]>0&&e._$tooltip.delay(e.__options.animationDuration[0]),e._$tooltip.queue(i)):e._$tooltip.stop().fadeIn(i)):"stable"==e.__state&&i();else{if(e.__stateSet("appearing"),g=e.__options.animationDuration[0],e.__contentInsert(),e.reposition(b,!0),h.hasTransitions?(e._$tooltip.addClass("tooltipster-"+e.__options.animation).addClass("tooltipster-initial").css({"-moz-animation-duration":e.__options.animationDuration[0]+"ms","-ms-animation-duration":e.__options.animationDuration[0]+"ms","-o-animation-duration":e.__options.animationDuration[0]+"ms","-webkit-animation-duration":e.__options.animationDuration[0]+"ms","animation-duration":e.__options.animationDuration[0]+"ms","transition-duration":e.__options.animationDuration[0]+"ms"}),setTimeout(function(){"closed"!=e.__state&&(e._$tooltip.addClass("tooltipster-show").removeClass("tooltipster-initial"),e.__options.animationDuration[0]>0&&e._$tooltip.delay(e.__options.animationDuration[0]),e._$tooltip.queue(i))},0)):e._$tooltip.css("display","none").fadeIn(e.__options.animationDuration[0],i),e.__trackerStart(),a(h.window).on("resize."+e.__namespace+"-triggerClose",function(b){var c=a(document.activeElement);(c.is("input")||c.is("textarea"))&&a.contains(e._$tooltip[0],c[0])||e.reposition(b)}).on("scroll."+e.__namespace+"-triggerClose",function(a){e.__scrollHandler(a)}),e.__$originParents=e._$origin.parents(),e.__$originParents.each(function(b,c){a(c).on("scroll."+e.__namespace+"-triggerClose",function(a){e.__scrollHandler(a)})}),e.__options.triggerClose.mouseleave||e.__options.triggerClose.touchleave&&h.hasTouchCapability){e._on("dismissable",function(a){a.dismissable?a.delay?(m=setTimeout(function(){e._close(a.event)},a.delay),e.__timeouts.close.push(m)):e._close(a):clearTimeout(m)});var j=e._$origin,k="",l="",m=null;e.__options.interactive&&(j=j.add(e._$tooltip)),e.__options.triggerClose.mouseleave&&(k+="mouseenter."+e.__namespace+"-triggerClose ",l+="mouseleave."+e.__namespace+"-triggerClose "),e.__options.triggerClose.touchleave&&h.hasTouchCapability&&(k+="touchstart."+e.__namespace+"-triggerClose",l+="touchend."+e.__namespace+"-triggerClose touchcancel."+e.__namespace+"-triggerClose"),j.on(l,function(a){if(e._touchIsTouchEvent(a)||!e._touchIsEmulatedEvent(a)){var b="mouseleave"==a.type?e.__options.delay:e.__options.delayTouch;e._trigger({delay:b[1],dismissable:!0,event:a,type:"dismissable"})}}).on(k,function(a){!e._touchIsTouchEvent(a)&&e._touchIsEmulatedEvent(a)||e._trigger({dismissable:!1,event:a,type:"dismissable"})})}e.__options.triggerClose.originClick&&e._$origin.on("click."+e.__namespace+"-triggerClose",function(a){e._touchIsTouchEvent(a)||e._touchIsEmulatedEvent(a)||e._close(a)}),(e.__options.triggerClose.click||e.__options.triggerClose.tap&&h.hasTouchCapability)&&setTimeout(function(){if("closed"!=e.__state){var b="",c=a(h.window.document.body);e.__options.triggerClose.click&&(b+="click."+e.__namespace+"-triggerClose "),e.__options.triggerClose.tap&&h.hasTouchCapability&&(b+="touchend."+e.__namespace+"-triggerClose"),c.on(b,function(b){e._touchIsMeaningfulEvent(b)&&(e._touchRecordEvent(b),e.__options.interactive&&a.contains(e._$tooltip[0],b.target)||e._close(b))}),e.__options.triggerClose.tap&&h.hasTouchCapability&&c.on("touchstart."+e.__namespace+"-triggerClose",function(a){e._touchRecordEvent(a)})}},0),e._trigger("ready"),e.__options.functionReady&&e.__options.functionReady.call(e,e,{origin:e._$origin[0],tooltip:e._$tooltip[0]})}if(e.__options.timer>0){var m=setTimeout(function(){e._close()},e.__options.timer+g);e.__timeouts.close.push(m)}}}return e},_openShortly:function(a){var b=this,c=!0;if("stable"!=b.__state&&"appearing"!=b.__state&&!b.__timeouts.open&&(b._trigger({type:"start",event:a,stop:function(){c=!1}}),c)){var d=0==a.type.indexOf("touch")?b.__options.delayTouch:b.__options.delay;d[0]?b.__timeouts.open=setTimeout(function(){b.__timeouts.open=null,b.__pointerIsOverOrigin&&b._touchIsMeaningfulEvent(a)?(b._trigger("startend"),b._open(a)):b._trigger("startcancel")},d[0]):(b._trigger("startend"),b._open(a))}return b},_optionsExtract:function(b,c){var d=this,e=a.extend(!0,{},c),f=d.__options[b];return f||(f={},a.each(c,function(a,b){var c=d.__options[a];void 0!==c&&(f[a]=c)})),a.each(e,function(b,c){void 0!==f[b]&&("object"!=typeof c||c instanceof Array||null==c||"object"!=typeof f[b]||f[b]instanceof Array||null==f[b]?e[b]=f[b]:a.extend(e[b],f[b]))}),e},_plug:function(b){var c=a.tooltipster._plugin(b);if(!c)throw new Error('The "'+b+'" plugin is not defined');return c.instance&&a.tooltipster.__bridge(c.instance,this,c.name),this},_touchIsEmulatedEvent:function(a){for(var b=!1,c=(new Date).getTime(),d=this.__touchEvents.length-1;d>=0;d--){var e=this.__touchEvents[d];if(!(c-e.time<500))break;e.target===a.target&&(b=!0)}return b},_touchIsMeaningfulEvent:function(a){return this._touchIsTouchEvent(a)&&!this._touchSwiped(a.target)||!this._touchIsTouchEvent(a)&&!this._touchIsEmulatedEvent(a)},_touchIsTouchEvent:function(a){return 0==a.type.indexOf("touch")},_touchRecordEvent:function(a){return this._touchIsTouchEvent(a)&&(a.time=(new Date).getTime(),this.__touchEvents.push(a)),this},_touchSwiped:function(a){for(var b=!1,c=this.__touchEvents.length-1;c>=0;c--){var d=this.__touchEvents[c];if("touchmove"==d.type){b=!0;break}if("touchstart"==d.type&&a===d.target)break}return b},_trigger:function(){var b=Array.prototype.slice.apply(arguments);return"string"==typeof b[0]&&(b[0]={type:b[0]}),b[0].instance=this,b[0].origin=this._$origin?this._$origin[0]:null,b[0].tooltip=this._$tooltip?this._$tooltip[0]:null,this.__$emitterPrivate.trigger.apply(this.__$emitterPrivate,b),a.tooltipster._trigger.apply(a.tooltipster,b),this.__$emitterPublic.trigger.apply(this.__$emitterPublic,b),this},_unplug:function(b){var c=this;if(c[b]){var d=a.tooltipster._plugin(b);d.instance&&a.each(d.instance,function(a,d){c[a]&&c[a].bridged===c[b]&&delete c[a]}),c[b].__destroy&&c[b].__destroy(),delete c[b]}return c},close:function(a){return this.__destroyed?this.__destroyError():this._close(null,a),this},content:function(a){var b=this;if(void 0===a)return b.__Content;if(b.__destroyed)b.__destroyError();else if(b.__contentSet(a),null!==b.__Content){if("closed"!==b.__state&&(b.__contentInsert(),b.reposition(),b.__options.updateAnimation))if(h.hasTransitions){var c=b.__options.updateAnimation;b._$tooltip.addClass("tooltipster-update-"+c),setTimeout(function(){"closed"!=b.__state&&b._$tooltip.removeClass("tooltipster-update-"+c)},1e3)}else b._$tooltip.fadeTo(200,.5,function(){"closed"!=b.__state&&b._$tooltip.fadeTo(200,1)})}else b._close();return b},destroy:function(){var b=this;if(b.__destroyed)b.__destroyError();else{"closed"!=b.__state?b.option("animationDuration",0)._close(null,null,!0):b.__timeoutsClear(),b._trigger("destroy"),b.__destroyed=!0,b._$origin.removeData(b.__namespace).off("."+b.__namespace+"-triggerOpen"),a(h.window.document.body).off("."+b.__namespace+"-triggerOpen");var c=b._$origin.data("tooltipster-ns");if(c)if(1===c.length){var d=null;"previous"==b.__options.restoration?d=b._$origin.data("tooltipster-initialTitle"):"current"==b.__options.restoration&&(d="string"==typeof b.__Content?b.__Content:a("<div></div>").append(b.__Content).html()),d&&b._$origin.attr("title",d),b._$origin.removeClass("tooltipstered"),b._$origin.removeData("tooltipster-ns").removeData("tooltipster-initialTitle")}else c=a.grep(c,function(a,c){return a!==b.__namespace}),b._$origin.data("tooltipster-ns",c);b._trigger("destroyed"),b._off(),b.off(),b.__Content=null,b.__$emitterPrivate=null,b.__$emitterPublic=null,b.__options.parent=null,b._$origin=null,b._$tooltip=null,a.tooltipster.__instancesLatestArr=a.grep(a.tooltipster.__instancesLatestArr,function(a,c){return b!==a}),clearInterval(b.__garbageCollector)}return b},disable:function(){return this.__destroyed?(this.__destroyError(),this):(this._close(),this.__enabled=!1,this)},elementOrigin:function(){return this.__destroyed?void this.__destroyError():this._$origin[0]},elementTooltip:function(){return this._$tooltip?this._$tooltip[0]:null},enable:function(){return this.__enabled=!0,this},hide:function(a){return this.close(a)},instance:function(){return this},off:function(){return this.__destroyed||this.__$emitterPublic.off.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},on:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.on.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},one:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.one.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this},open:function(a){return this.__destroyed?this.__destroyError():this._open(null,a),this},option:function(b,c){return void 0===c?this.__options[b]:(this.__destroyed?this.__destroyError():(this.__options[b]=c,this.__optionsFormat(),a.inArray(b,["trigger","triggerClose","triggerOpen"])>=0&&this.__prepareOrigin(),"selfDestruction"===b&&this.__prepareGC()),this)},reposition:function(a,b){var c=this;return c.__destroyed?c.__destroyError():"closed"!=c.__state&&d(c._$origin)&&(b||d(c._$tooltip))&&(b||c._$tooltip.detach(),c.__Geometry=c.__geometry(),c._trigger({type:"reposition",event:a,helper:{geo:c.__Geometry}})),c},show:function(a){return this.open(a)},status:function(){return{destroyed:this.__destroyed,enabled:this.__enabled,open:"closed"!==this.__state,state:this.__state}},triggerHandler:function(){return this.__destroyed?this.__destroyError():this.__$emitterPublic.triggerHandler.apply(this.__$emitterPublic,Array.prototype.slice.apply(arguments)),this}},a.fn.tooltipster=function(){var b=Array.prototype.slice.apply(arguments),c="You are using a single HTML element as content for several tooltips. You probably want to set the contentCloning option to TRUE.";if(0===this.length)return this;if("string"==typeof b[0]){var d="#*$~&";return this.each(function(){var e=a(this).data("tooltipster-ns"),f=e?a(this).data(e[0]):null;if(!f)throw new Error("You called Tooltipster's \""+b[0]+'" method on an uninitialized element');if("function"!=typeof f[b[0]])throw new Error('Unknown method "'+b[0]+'"');this.length>1&&"content"==b[0]&&(b[1]instanceof a||"object"==typeof b[1]&&null!=b[1]&&b[1].tagName)&&!f.__options.contentCloning&&f.__options.debug&&console.log(c);var g=f[b[0]](b[1],b[2]);return g!==f||"instance"===b[0]?(d=g,!1):void 0}),"#*$~&"!==d?d:this}a.tooltipster.__instancesLatestArr=[];var e=b[0]&&void 0!==b[0].multiple,g=e&&b[0].multiple||!e&&f.multiple,h=b[0]&&void 0!==b[0].content,i=h&&b[0].content||!h&&f.content,j=b[0]&&void 0!==b[0].contentCloning,k=j&&b[0].contentCloning||!j&&f.contentCloning,l=b[0]&&void 0!==b[0].debug,m=l&&b[0].debug||!l&&f.debug;return this.length>1&&(i instanceof a||"object"==typeof i&&null!=i&&i.tagName)&&!k&&m&&console.log(c),this.each(function(){var c=!1,d=a(this),e=d.data("tooltipster-ns"),f=null;e?g?c=!0:m&&(console.log("Tooltipster: one or more tooltips are already attached to the element below. Ignoring."),console.log(this)):c=!0,c&&(f=new a.Tooltipster(this,b[0]),e||(e=[]),e.push(f.__namespace),d.data("tooltipster-ns",e),d.data(f.__namespace,f),f.__options.functionInit&&f.__options.functionInit.call(f,f,{origin:this}),f._trigger("init")),a.tooltipster.__instancesLatestArr.push(f)}),this},b.prototype={__init:function(b){this.__$tooltip=b,this.__$tooltip.css({left:0,overflow:"hidden",position:"absolute",top:0}).find(".tooltipster-content").css("overflow","auto"),this.$container=a('<div class="tooltipster-ruler"></div>').append(this.__$tooltip).appendTo(h.window.document.body)},__forceRedraw:function(){var a=this.__$tooltip.parent();this.__$tooltip.detach(),this.__$tooltip.appendTo(a)},constrain:function(a,b){return this.constraints={width:a,height:b},this.__$tooltip.css({display:"block",height:"",overflow:"auto",width:a}),this},destroy:function(){this.__$tooltip.detach().find(".tooltipster-content").css({display:"",overflow:""}),this.$container.remove()},free:function(){return this.constraints=null,this.__$tooltip.css({display:"",height:"",overflow:"visible",width:""}),this},measure:function(){this.__forceRedraw();var a=this.__$tooltip[0].getBoundingClientRect(),b={size:{height:a.height||a.bottom-a.top,width:a.width||a.right-a.left}};if(this.constraints){var c=this.__$tooltip.find(".tooltipster-content"),d=this.__$tooltip.outerHeight(),e=c[0].getBoundingClientRect(),f={height:d<=this.constraints.height,width:a.width<=this.constraints.width&&e.width>=c[0].scrollWidth-1};b.fits=f.height&&f.width}return h.IE&&h.IE<=11&&b.size.width!==h.window.document.documentElement.clientWidth&&(b.size.width=Math.ceil(b.size.width)+1),b}};var j=navigator.userAgent.toLowerCase();-1!=j.indexOf("msie")?h.IE=parseInt(j.split("msie")[1]):-1!==j.toLowerCase().indexOf("trident")&&-1!==j.indexOf(" rv:11")?h.IE=11:-1!=j.toLowerCase().indexOf("edge/")&&(h.IE=parseInt(j.toLowerCase().split("edge/")[1]));var k="tooltipster.sideTip";return a.tooltipster._plugin({name:k,instance:{__defaults:function(){return{arrow:!0,distance:6,functionPosition:null,maxWidth:null,minIntersection:16,minWidth:0,position:null,side:"top",viewportAware:!0}},__init:function(a){var b=this;b.__instance=a,b.__namespace="tooltipster-sideTip-"+Math.round(1e6*Math.random()),b.__previousState="closed",b.__options,b.__optionsFormat(),b.__instance._on("state."+b.__namespace,function(a){"closed"==a.state?b.__close():"appearing"==a.state&&"closed"==b.__previousState&&b.__create(),b.__previousState=a.state}),b.__instance._on("options."+b.__namespace,function(){b.__optionsFormat()}),b.__instance._on("reposition."+b.__namespace,function(a){b.__reposition(a.event,a.helper)})},__close:function(){this.__instance.content()instanceof a&&this.__instance.content().detach(),this.__instance._$tooltip.remove(),this.__instance._$tooltip=null},__create:function(){var b=a('<div class="tooltipster-base tooltipster-sidetip"><div class="tooltipster-box"><div class="tooltipster-content"></div></div><div class="tooltipster-arrow"><div class="tooltipster-arrow-uncropped"><div class="tooltipster-arrow-border"></div><div class="tooltipster-arrow-background"></div></div></div></div>');this.__options.arrow||b.find(".tooltipster-box").css("margin",0).end().find(".tooltipster-arrow").hide(),this.__options.minWidth&&b.css("min-width",this.__options.minWidth+"px"),this.__options.maxWidth&&b.css("max-width",this.__options.maxWidth+"px"),this.__instance._$tooltip=b,this.__instance._trigger("created")},__destroy:function(){this.__instance._off("."+self.__namespace)},__optionsFormat:function(){var b=this;if(b.__options=b.__instance._optionsExtract(k,b.__defaults()),b.__options.position&&(b.__options.side=b.__options.position),"object"!=typeof b.__options.distance&&(b.__options.distance=[b.__options.distance]),b.__options.distance.length<4&&(void 0===b.__options.distance[1]&&(b.__options.distance[1]=b.__options.distance[0]),void 0===b.__options.distance[2]&&(b.__options.distance[2]=b.__options.distance[0]),void 0===b.__options.distance[3]&&(b.__options.distance[3]=b.__options.distance[1]),b.__options.distance={top:b.__options.distance[0],right:b.__options.distance[1],bottom:b.__options.distance[2],left:b.__options.distance[3]}),"string"==typeof b.__options.side){var c={top:"bottom",right:"left",bottom:"top",left:"right"};b.__options.side=[b.__options.side,c[b.__options.side]],"left"==b.__options.side[0]||"right"==b.__options.side[0]?b.__options.side.push("top","bottom"):b.__options.side.push("right","left")}6===a.tooltipster._env.IE&&b.__options.arrow!==!0&&(b.__options.arrow=!1)},__reposition:function(b,c){var d,e=this,f=e.__targetFind(c),g=[];e.__instance._$tooltip.detach();var h=e.__instance._$tooltip.clone(),i=a.tooltipster._getRuler(h),j=!1,k=e.__instance.option("animation");switch(k&&h.removeClass("tooltipster-"+k),a.each(["window","document"],function(d,k){var l=null;if(e.__instance._trigger({container:k,helper:c,satisfied:j,takeTest:function(a){l=a},results:g,type:"positionTest"}),1==l||0!=l&&0==j&&("window"!=k||e.__options.viewportAware))for(var d=0;d<e.__options.side.length;d++){var m={horizontal:0,vertical:0},n=e.__options.side[d];"top"==n||"bottom"==n?m.vertical=e.__options.distance[n]:m.horizontal=e.__options.distance[n],e.__sideChange(h,n),a.each(["natural","constrained"],function(a,d){if(l=null,e.__instance._trigger({container:k,event:b,helper:c,mode:d,results:g,satisfied:j,side:n,takeTest:function(a){l=a},type:"positionTest"}),1==l||0!=l&&0==j){var h={container:k,distance:m,fits:null,mode:d,outerSize:null,side:n,size:null,target:f[n],whole:null},o="natural"==d?i.free():i.constrain(c.geo.available[k][n].width-m.horizontal,c.geo.available[k][n].height-m.vertical),p=o.measure();if(h.size=p.size,h.outerSize={height:p.size.height+m.vertical,width:p.size.width+m.horizontal},"natural"==d?c.geo.available[k][n].width>=h.outerSize.width&&c.geo.available[k][n].height>=h.outerSize.height?h.fits=!0:h.fits=!1:h.fits=p.fits,"window"==k&&(h.fits?"top"==n||"bottom"==n?h.whole=c.geo.origin.windowOffset.right>=e.__options.minIntersection&&c.geo.window.size.width-c.geo.origin.windowOffset.left>=e.__options.minIntersection:h.whole=c.geo.origin.windowOffset.bottom>=e.__options.minIntersection&&c.geo.window.size.height-c.geo.origin.windowOffset.top>=e.__options.minIntersection:h.whole=!1),g.push(h),h.whole)j=!0;else if("natural"==h.mode&&(h.fits||h.size.width<=c.geo.available[k][n].width))return!1}})}}),e.__instance._trigger({edit:function(a){g=a},event:b,helper:c,results:g,type:"positionTested"}),g.sort(function(a,b){if(a.whole&&!b.whole)return-1;if(!a.whole&&b.whole)return 1;if(a.whole&&b.whole){var c=e.__options.side.indexOf(a.side),d=e.__options.side.indexOf(b.side);return d>c?-1:c>d?1:"natural"==a.mode?-1:1}if(a.fits&&!b.fits)return-1;if(!a.fits&&b.fits)return 1;if(a.fits&&b.fits){var c=e.__options.side.indexOf(a.side),d=e.__options.side.indexOf(b.side);return d>c?-1:c>d?1:"natural"==a.mode?-1:1}return"document"==a.container&&"bottom"==a.side&&"natural"==a.mode?-1:1}),d=g[0],d.coord={},d.side){case"left":case"right":d.coord.top=Math.floor(d.target-d.size.height/2);break;case"bottom":case"top":d.coord.left=Math.floor(d.target-d.size.width/2)}switch(d.side){case"left":d.coord.left=c.geo.origin.windowOffset.left-d.outerSize.width;break;case"right":d.coord.left=c.geo.origin.windowOffset.right+d.distance.horizontal;break;case"top":d.coord.top=c.geo.origin.windowOffset.top-d.outerSize.height;break;case"bottom":d.coord.top=c.geo.origin.windowOffset.bottom+d.distance.vertical}"window"==d.container?"top"==d.side||"bottom"==d.side?d.coord.left<0?c.geo.origin.windowOffset.right-this.__options.minIntersection>=0?d.coord.left=0:d.coord.left=c.geo.origin.windowOffset.right-this.__options.minIntersection-1:d.coord.left>c.geo.window.size.width-d.size.width&&(c.geo.origin.windowOffset.left+this.__options.minIntersection<=c.geo.window.size.width?d.coord.left=c.geo.window.size.width-d.size.width:d.coord.left=c.geo.origin.windowOffset.left+this.__options.minIntersection+1-d.size.width):d.coord.top<0?c.geo.origin.windowOffset.bottom-this.__options.minIntersection>=0?d.coord.top=0:d.coord.top=c.geo.origin.windowOffset.bottom-this.__options.minIntersection-1:d.coord.top>c.geo.window.size.height-d.size.height&&(c.geo.origin.windowOffset.top+this.__options.minIntersection<=c.geo.window.size.height?d.coord.top=c.geo.window.size.height-d.size.height:d.coord.top=c.geo.origin.windowOffset.top+this.__options.minIntersection+1-d.size.height):(d.coord.left>c.geo.window.size.width-d.size.width&&(d.coord.left=c.geo.window.size.width-d.size.width),d.coord.left<0&&(d.coord.left=0)),e.__sideChange(h,d.side),c.tooltipClone=h[0],c.tooltipParent=e.__instance.option("parent").parent[0],c.mode=d.mode,c.whole=d.whole,c.origin=e.__instance._$origin[0],c.tooltip=e.__instance._$tooltip[0],delete d.container,delete d.fits,delete d.mode,delete d.outerSize,delete d.whole,d.distance=d.distance.horizontal||d.distance.vertical;var l=a.extend(!0,{},d);if(e.__instance._trigger({edit:function(a){d=a},event:b,helper:c,position:l,type:"position"}),e.__options.functionPosition){var m=e.__options.functionPosition.call(e,e.__instance,c,l);m&&(d=m)}i.destroy();var n,o;"top"==d.side||"bottom"==d.side?(n={prop:"left",val:d.target-d.coord.left},o=d.size.width-this.__options.minIntersection):(n={prop:"top",val:d.target-d.coord.top},o=d.size.height-this.__options.minIntersection),n.val<this.__options.minIntersection?n.val=this.__options.minIntersection:n.val>o&&(n.val=o);var p;p=c.geo.origin.fixedLineage?c.geo.origin.windowOffset:{left:c.geo.origin.windowOffset.left+c.geo.window.scroll.left,top:c.geo.origin.windowOffset.top+c.geo.window.scroll.top},d.coord={left:p.left+(d.coord.left-c.geo.origin.windowOffset.left),top:p.top+(d.coord.top-c.geo.origin.windowOffset.top)},e.__sideChange(e.__instance._$tooltip,d.side),c.geo.origin.fixedLineage?e.__instance._$tooltip.css("position","fixed"):e.__instance._$tooltip.css("position",""),e.__instance._$tooltip.css({left:d.coord.left,top:d.coord.top,height:d.size.height,width:d.size.width}).find(".tooltipster-arrow").css({left:"",top:""}).css(n.prop,n.val),e.__instance._$tooltip.appendTo(e.__instance.option("parent")),e.__instance._trigger({type:"repositioned",event:b,position:d})},__sideChange:function(a,b){a.removeClass("tooltipster-bottom").removeClass("tooltipster-left").removeClass("tooltipster-right").removeClass("tooltipster-top").addClass("tooltipster-"+b)},__targetFind:function(a){var b={},c=this.__instance._$origin[0].getClientRects();if(c.length>1){var d=this.__instance._$origin.css("opacity");1==d&&(this.__instance._$origin.css("opacity",.99),c=this.__instance._$origin[0].getClientRects(),this.__instance._$origin.css("opacity",1))}if(c.length<2)b.top=Math.floor(a.geo.origin.windowOffset.left+a.geo.origin.size.width/2),b.bottom=b.top,b.left=Math.floor(a.geo.origin.windowOffset.top+a.geo.origin.size.height/2),b.right=b.left;else{var e=c[0];b.top=Math.floor(e.left+(e.right-e.left)/2),e=c.length>2?c[Math.ceil(c.length/2)-1]:c[0],b.right=Math.floor(e.top+(e.bottom-e.top)/2),e=c[c.length-1],b.bottom=Math.floor(e.left+(e.right-e.left)/2),e=c.length>2?c[Math.ceil((c.length+1)/2)-1]:c[c.length-1],b.left=Math.floor(e.top+(e.bottom-e.top)/2)}return b}}}),a});
// Lazy Load v1.9.1
!function(e,t,r,o){var n=e(t);e.fn.lazyload=function(i){function a(){var t=0;l.each(function(){var r=e(this);if(!h.skip_invisible||r.is(":visible"))if(e.abovethetop(this,h)||e.leftofbegin(this,h));else if(e.belowthefold(this,h)||e.rightoffold(this,h)){if(++t>h.failure_limit)return!1}else r.trigger("appear"),t=0})}var f,l=this,h={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:t,data_attribute:"original",data_noimg:"noimg",skip_invisible:!0,appear:null,load:null,error:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return i&&(o!==i.failurelimit&&(i.failure_limit=i.failurelimit,delete i.failurelimit),o!==i.effectspeed&&(i.effect_speed=i.effectspeed,delete i.effectspeed),e.extend(h,i)),f=h.container===o||h.container===t?n:e(h.container),0===h.event.indexOf("scroll")&&f.bind(h.event,function(){return a()}),this.each(function(){var t=this,r=e(t);t.loaded=!1,(r.attr("src")===o||r.attr("src")===!1)&&r.is("img")&&r.attr("src",h.placeholder),r.one("appear",function(){if(!this.loaded){if(h.appear){var o=l.length;h.appear.call(t,o,h)}e("<img />").bind("load",function(){var o=r.attr("data-"+h.data_attribute);r.hide(),r.is("img")?r.attr("src",o):r.css("background-image","url('"+o+"')"),r[h.effect](h.effect_speed),t.loaded=!0;var n=e.grep(l,function(e){return!e.loaded});if(l=e(n),h.load){var i=l.length;h.load.call(t,i,h)}}).one("error",function(){var e=r.attr("data-"+h.data_noimg);if(r.attr("src",e),h.error){var o=l.length;h.error.call(t,o,h)}}).attr("src",r.attr("data-"+h.data_attribute))}}),0!==h.event.indexOf("scroll")&&r.bind(h.event,function(){t.loaded||r.trigger("appear")})}),n.bind("resize",function(){a()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&n.bind("pageshow",function(t){t.originalEvent&&t.originalEvent.persisted&&l.each(function(){e(this).trigger("appear")})}),e(r).ready(function(){a()}),this},e.belowthefold=function(r,i){var a;return a=i.container===o||i.container===t?(t.innerHeight?t.innerHeight:n.height())+n.scrollTop():e(i.container).offset().top+e(i.container).height(),a<=e(r).offset().top-i.threshold},e.rightoffold=function(r,i){var a;return a=i.container===o||i.container===t?n.width()+n.scrollLeft():e(i.container).offset().left+e(i.container).width(),a<=e(r).offset().left-i.threshold},e.abovethetop=function(r,i){var a;return a=i.container===o||i.container===t?n.scrollTop():e(i.container).offset().top,a>=e(r).offset().top+i.threshold+e(r).height()},e.leftofbegin=function(r,i){var a;return a=i.container===o||i.container===t?n.scrollLeft():e(i.container).offset().left,a>=e(r).offset().left+i.threshold+e(r).width()},e.inviewport=function(t,r){return!(e.rightoffold(t,r)||e.leftofbegin(t,r)||e.belowthefold(t,r)||e.abovethetop(t,r))},e.extend(e.expr[":"],{"below-the-fold":function(t){return e.belowthefold(t,{threshold:0})},"above-the-top":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-screen":function(t){return e.rightoffold(t,{threshold:0})},"left-of-screen":function(t){return!e.rightoffold(t,{threshold:0})},"in-viewport":function(t){return e.inviewport(t,{threshold:0})},"above-the-fold":function(t){return!e.belowthefold(t,{threshold:0})},"right-of-fold":function(t){return e.rightoffold(t,{threshold:0})},"left-of-fold":function(t){return!e.rightoffold(t,{threshold:0})}})}(jQuery,window,document);
// BxSlider v4.1.1.1
('undefined' === typeof $.fn.bxSlider) && !function(t){var e={},s={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4e3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){}};t.fn.bxSlider=function(n){if(0==this.length)return this;if(this.length>1)return this.each(function(){t(this).bxSlider(n)}),this;var o={},r=this;e.el=this;var a=t(window).width(),l=t(window).height(),d=function(){o.settings=t.extend({},s,n),o.settings.slideWidth=parseInt(o.settings.slideWidth),o.children=r.children(o.settings.slideSelector),o.children.length<o.settings.minSlides&&(o.settings.minSlides=o.children.length),o.children.length<o.settings.maxSlides&&(o.settings.maxSlides=o.children.length),o.settings.randomStart&&(o.settings.startSlide=Math.floor(Math.random()*o.children.length)),o.active={index:o.settings.startSlide},o.carousel=o.settings.minSlides>1||o.settings.maxSlides>1,o.carousel&&(o.settings.preloadImages="all"),o.minThreshold=o.settings.minSlides*o.settings.slideWidth+(o.settings.minSlides-1)*o.settings.slideMargin,o.maxThreshold=o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin,o.working=!1,o.controls={},o.interval=null,o.animProp="vertical"==o.settings.mode?"top":"left",o.usingCSS=o.settings.useCSS&&"fade"!=o.settings.mode&&function(){var t=document.createElement("div"),e=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var i in e)if(void 0!==t.style[e[i]])return o.cssPrefix=e[i].replace("Perspective","").toLowerCase(),o.animProp="-"+o.cssPrefix+"-transform",!0;return!1}(),"vertical"==o.settings.mode&&(o.settings.maxSlides=o.settings.minSlides),r.data("origStyle",r.attr("style")),r.children(o.settings.slideSelector).each(function(){t(this).data("origStyle",t(this).attr("style"))}),c()},c=function(){r.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>'),o.viewport=r.parent(),o.loader=t('<div class="bx-loading" />'),o.viewport.prepend(o.loader),r.css({width:"horizontal"==o.settings.mode?100*o.children.length+215+"%":"auto",position:"relative"}),o.usingCSS&&o.settings.easing?r.css("-"+o.cssPrefix+"-transition-timing-function",o.settings.easing):o.settings.easing||(o.settings.easing="swing");f();o.viewport.css({width:"100%",overflow:"hidden",position:"relative"}),o.viewport.parent().css({maxWidth:p()}),o.settings.pager||o.viewport.parent().css({margin:"0 auto 0px"}),o.children.css({"float":"horizontal"==o.settings.mode?"left":"none",listStyle:"none",position:"relative"}),o.children.css("width",u()),"horizontal"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginRight",o.settings.slideMargin),"vertical"==o.settings.mode&&o.settings.slideMargin>0&&o.children.css("marginBottom",o.settings.slideMargin),"fade"==o.settings.mode&&(o.children.css({position:"absolute",zIndex:0,display:"none"}),o.children.eq(o.settings.startSlide).css({zIndex:50,display:"block"})),o.controls.el=t('<div class="bx-controls" />'),o.settings.captions&&P(),o.active.last=o.settings.startSlide==x()-1,o.settings.video&&r.fitVids();var e=o.children.eq(o.settings.startSlide);"all"==o.settings.preloadImages&&(e=o.children),o.settings.ticker?o.settings.pager=!1:(o.settings.pager&&T(),o.settings.controls&&C(),o.settings.auto&&o.settings.autoControls&&E(),(o.settings.controls||o.settings.autoControls||o.settings.pager)&&o.viewport.after(o.controls.el)),g(e,h)},g=function(e,i){var s=e.find("img, iframe").length;if(0==s)return void i();var n=0;e.find("img, iframe").each(function(){t(this).one("load",function(){++n==s&&i()}).each(function(){this.complete&&t(this).load()})})},h=function(){if(o.settings.infiniteLoop&&"fade"!=o.settings.mode&&!o.settings.ticker){var e="vertical"==o.settings.mode?o.settings.minSlides:o.settings.maxSlides,i=o.children.slice(0,e).clone().addClass("bx-clone"),s=o.children.slice(-e).clone().addClass("bx-clone");r.append(i).prepend(s)}o.loader.remove(),S(),"vertical"==o.settings.mode&&(o.settings.adaptiveHeight=!0),o.viewport.height(v()),r.redrawSlider(),o.settings.onSliderLoad(o,o.active.index),o.initialized=!0,o.settings.responsive&&t(window).bind("resize",B),o.settings.auto&&o.settings.autoStart&&o.children.length>1&&H(),o.settings.ticker&&L(),o.settings.pager&&I(o.settings.startSlide),o.settings.controls&&W(),o.settings.touchEnabled&&!o.settings.ticker&&O()},v=function(){var e=0,s=t();if("vertical"==o.settings.mode||o.settings.adaptiveHeight)if(o.carousel){var n=1==o.settings.moveSlides?o.active.index:o.active.index*m();for(s=o.children.eq(n),i=1;i<=o.settings.maxSlides-1;i++)s=s.add(n+i>=o.children.length?o.children.eq(i-1):o.children.eq(n+i))}else s=o.children.eq(o.active.index);else s=o.children;return"vertical"==o.settings.mode?(s.each(function(){e+=t(this).outerHeight()}),o.settings.slideMargin>0&&(e+=o.settings.slideMargin*(o.settings.minSlides-1))):e=Math.max.apply(Math,s.map(function(){return t(this).outerHeight(!1)}).get()),e},p=function(){var t="100%";return o.settings.slideWidth>0&&(t="horizontal"==o.settings.mode?o.settings.maxSlides*o.settings.slideWidth+(o.settings.maxSlides-1)*o.settings.slideMargin:o.settings.slideWidth),t},u=function(){var t=o.settings.slideWidth,e=o.viewport.width();return 0==o.settings.slideWidth||o.settings.slideWidth>e&&!o.carousel||"vertical"==o.settings.mode?t=e:o.settings.maxSlides>1&&"horizontal"==o.settings.mode&&(e>o.maxThreshold||e<o.minThreshold&&(t=(e-o.settings.slideMargin*(o.settings.minSlides-1))/o.settings.minSlides)),t},f=function(){var t=1;if("horizontal"==o.settings.mode&&o.settings.slideWidth>0)if(o.viewport.width()<o.minThreshold)t=o.settings.minSlides;else if(o.viewport.width()>o.maxThreshold)t=o.settings.maxSlides;else{var e=o.children.first().width();t=Math.floor(o.viewport.width()/e)}else"vertical"==o.settings.mode&&(t=o.settings.minSlides);return t},x=function(){var t=0;if(o.settings.moveSlides>0)if(o.settings.infiniteLoop)t=Math.ceil(o.children.length/m());else for(var e=0,i=0;e<o.children.length;)++t,e=i+f(),i+=o.settings.moveSlides<=f()?o.settings.moveSlides:f();else t=Math.ceil(o.children.length/f());return t},m=function(){return o.settings.moveSlides>0&&o.settings.moveSlides<=f()?o.settings.moveSlides:f()},S=function(){if(o.children.length>o.settings.maxSlides&&o.active.last&&!o.settings.infiniteLoop){if("horizontal"==o.settings.mode){var t=o.children.last(),e=t.position();b(-(e.left-(o.viewport.width()-t.width())),"reset",0)}else if("vertical"==o.settings.mode){var i=o.children.length-o.settings.minSlides,e=o.children.eq(i).position();b(-e.top,"reset",0)}}else{var e=o.children.eq(o.active.index*m()).position();o.active.index==x()-1&&(o.active.last=!0),void 0!=e&&("horizontal"==o.settings.mode?b(-e.left,"reset",0):"vertical"==o.settings.mode&&b(-e.top,"reset",0))}},b=function(t,e,i,s){if(o.usingCSS){var n="vertical"==o.settings.mode?"translate3d(0, "+t+"px, 0)":"translate3d("+t+"px, 0, 0)";r.css("-"+o.cssPrefix+"-transition-duration",i/1e3+"s"),"slide"==e?(r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),D()})):"reset"==e?r.css(o.animProp,n):"ticker"==e&&(r.css("-"+o.cssPrefix+"-transition-timing-function","linear"),r.css(o.animProp,n),r.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){r.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"),b(s.resetValue,"reset",0),N()}))}else{var a={};a[o.animProp]=t,"slide"==e?r.animate(a,i,o.settings.easing,function(){D()}):"reset"==e?r.css(o.animProp,t):"ticker"==e&&r.animate(a,speed,"linear",function(){b(s.resetValue,"reset",0),N()})}},w=function(){for(var e="",i=x(),s=0;i>s;s++){var n="";o.settings.buildPager&&t.isFunction(o.settings.buildPager)?(n=o.settings.buildPager(s),o.pagerEl.addClass("bx-custom-pager")):(n=s+1,o.pagerEl.addClass("bx-default-pager")),e+='<div class="bx-pager-item"><a href="" data-slide-index="'+s+'" class="bx-pager-link">'+n+"</a></div>"}o.pagerEl.html(e)},T=function(){o.settings.pagerCustom?o.pagerEl=t(o.settings.pagerCustom):(o.pagerEl=t('<div class="bx-pager" />'),o.settings.pagerSelector?t(o.settings.pagerSelector).html(o.pagerEl):o.controls.el.addClass("bx-has-pager").append(o.pagerEl),w()),o.pagerEl.on("click","a",q)},C=function(){o.controls.next=t('<a class="bx-next" href="">'+o.settings.nextText+"</a>"),o.controls.prev=t('<a class="bx-prev" href="">'+o.settings.prevText+"</a>"),o.controls.next.bind("click",y),o.controls.prev.bind("click",z),o.settings.nextSelector&&t(o.settings.nextSelector).append(o.controls.next),o.settings.prevSelector&&t(o.settings.prevSelector).append(o.controls.prev),o.settings.nextSelector||o.settings.prevSelector||(o.controls.directionEl=t('<div class="bx-controls-direction" />'),o.controls.directionEl.append(o.controls.prev).append(o.controls.next),o.controls.el.addClass("bx-has-controls-direction").append(o.controls.directionEl))},E=function(){o.controls.start=t('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+o.settings.startText+"</a></div>"),o.controls.stop=t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+o.settings.stopText+"</a></div>"),o.controls.autoEl=t('<div class="bx-controls-auto" />'),o.controls.autoEl.on("click",".bx-start",M),o.controls.autoEl.on("click",".bx-stop",k),o.settings.autoControlsCombine?o.controls.autoEl.append(o.controls.start):o.controls.autoEl.append(o.controls.start).append(o.controls.stop),o.settings.autoControlsSelector?t(o.settings.autoControlsSelector).html(o.controls.autoEl):o.controls.el.addClass("bx-has-controls-auto").append(o.controls.autoEl),A(o.settings.autoStart?"stop":"start")},P=function(){o.children.each(function(){var e=t(this).find("img:first").attr("title");void 0!=e&&(""+e).length&&t(this).append('<div class="bx-caption"><span>'+e+"</span></div>")})},y=function(t){o.settings.auto&&r.stopAuto(),r.goToNextSlide(),t.preventDefault()},z=function(t){o.settings.auto&&r.stopAuto(),r.goToPrevSlide(),t.preventDefault()},M=function(t){r.startAuto(),t.preventDefault()},k=function(t){r.stopAuto(),t.preventDefault()},q=function(e){o.settings.auto&&r.stopAuto();var i=t(e.currentTarget);if(void 0!==i.attr("data-slide-index")){var s=parseInt(i.attr("data-slide-index"));s!=o.active.index&&r.goToSlide(s),e.preventDefault()}},I=function(e){var i=o.children.length;return"short"==o.settings.pagerType?(o.settings.maxSlides>1&&(i=Math.ceil(o.children.length/o.settings.maxSlides)),void o.pagerEl.html(e+1+o.settings.pagerShortSeparator+i)):(o.pagerEl.find("a").removeClass("active"),void o.pagerEl.each(function(i,s){t(s).find("a").eq(e).addClass("active")}))},D=function(){if(o.settings.infiniteLoop){var t="";0==o.active.index?t=o.children.eq(0).position():o.active.index==x()-1&&o.carousel?t=o.children.eq((x()-1)*m()).position():o.active.index==o.children.length-1&&(t=o.children.eq(o.children.length-1).position()),t&&("horizontal"==o.settings.mode?b(-t.left,"reset",0):"vertical"==o.settings.mode&&b(-t.top,"reset",0))}o.working=!1,o.settings.onSlideAfter(o.children.eq(o.active.index),o.oldIndex,o.active.index)},A=function(t){o.settings.autoControlsCombine?o.controls.autoEl.html(o.controls[t]):(o.controls.autoEl.find("a").removeClass("active"),o.controls.autoEl.find("a:not(.bx-"+t+")").addClass("active"))},W=function(){1==x()?(o.controls.prev.addClass("disabled"),o.controls.next.addClass("disabled")):!o.settings.infiniteLoop&&o.settings.hideControlOnEnd&&(0==o.active.index?(o.controls.prev.addClass("disabled"),o.controls.next.removeClass("disabled")):o.active.index==x()-1?(o.controls.next.addClass("disabled"),o.controls.prev.removeClass("disabled")):(o.controls.prev.removeClass("disabled"),o.controls.next.removeClass("disabled")))},H=function(){if(o.settings.autoDelay>0){setTimeout(r.startAuto,o.settings.autoDelay)}else r.startAuto();o.settings.autoHover&&r.hover(function(){o.interval&&(r.stopAuto(!0),o.autoPaused=!0)},function(){o.autoPaused&&(r.startAuto(!0),o.autoPaused=null)})},L=function(){var e=0;if("next"==o.settings.autoDirection)r.append(o.children.clone().addClass("bx-clone"));else{r.prepend(o.children.clone().addClass("bx-clone"));var i=o.children.first().position();e="horizontal"==o.settings.mode?-i.left:-i.top}b(e,"reset",0),o.settings.pager=!1,o.settings.controls=!1,o.settings.autoControls=!1,o.settings.tickerHover&&!o.usingCSS&&o.viewport.hover(function(){r.stop()},function(){var e=0;o.children.each(function(){e+="horizontal"==o.settings.mode?t(this).outerWidth(!0):t(this).outerHeight(!0)});var i=o.settings.speed/e,s="horizontal"==o.settings.mode?"left":"top",n=i*(e-Math.abs(parseInt(r.css(s))));N(n)}),N()},N=function(t){speed=t?t:o.settings.speed;var e={left:0,top:0},i={left:0,top:0};"next"==o.settings.autoDirection?e=r.find(".bx-clone").first().position():i=o.children.first().position();var s="horizontal"==o.settings.mode?-e.left:-e.top,n="horizontal"==o.settings.mode?-i.left:-i.top,a={resetValue:n};b(s,"ticker",speed,a)},O=function(){o.touch={start:{x:0,y:0},end:{x:0,y:0}},o.viewport.bind("touchstart",X)},X=function(t){if(o.working)t.preventDefault();else{o.touch.originalPos=r.position();var e=t.originalEvent;o.touch.start.x=e.changedTouches[0].pageX,o.touch.start.y=e.changedTouches[0].pageY,o.viewport.bind("touchmove",Y),o.viewport.bind("touchend",V)}},Y=function(t){var e=t.originalEvent,i=Math.abs(e.changedTouches[0].pageX-o.touch.start.x),s=Math.abs(e.changedTouches[0].pageY-o.touch.start.y);if(3*i>s&&o.settings.preventDefaultSwipeX?t.preventDefault():3*s>i&&o.settings.preventDefaultSwipeY&&t.preventDefault(),"fade"!=o.settings.mode&&o.settings.oneToOneTouch){var n=0;if("horizontal"==o.settings.mode){var r=e.changedTouches[0].pageX-o.touch.start.x;n=o.touch.originalPos.left+r}else{var r=e.changedTouches[0].pageY-o.touch.start.y;n=o.touch.originalPos.top+r}b(n,"reset",0)}},V=function(t){o.viewport.unbind("touchmove",Y);var e=t.originalEvent,i=0;if(o.touch.end.x=e.changedTouches[0].pageX,o.touch.end.y=e.changedTouches[0].pageY,"fade"==o.settings.mode){var s=Math.abs(o.touch.start.x-o.touch.end.x);s>=o.settings.swipeThreshold&&(o.touch.start.x>o.touch.end.x?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto())}else{var s=0;"horizontal"==o.settings.mode?(s=o.touch.end.x-o.touch.start.x,i=o.touch.originalPos.left):(s=o.touch.end.y-o.touch.start.y,i=o.touch.originalPos.top),!o.settings.infiniteLoop&&(0==o.active.index&&s>0||o.active.last&&0>s)?b(i,"reset",200):Math.abs(s)>=o.settings.swipeThreshold?(0>s?r.goToNextSlide():r.goToPrevSlide(),r.stopAuto()):b(i,"reset",200)}o.viewport.unbind("touchend",V)},B=function(){if(o.initialized){var e=t(window).width(),i=t(window).height();(a!=e||l!=i)&&(a=e,l=i,r.redrawSlider())}};return r.goToSlide=function(e,i){if(!o.working&&o.active.index!=e)if(o.working=!0,o.oldIndex=o.active.index,o.active.index=0>e?x()-1:e>=x()?0:e,o.settings.onSlideBefore(o.children.eq(o.active.index),o.oldIndex,o.active.index),"next"==i?o.settings.onSlideNext(o.children.eq(o.active.index),o.oldIndex,o.active.index):"prev"==i&&o.settings.onSlidePrev(o.children.eq(o.active.index),o.oldIndex,o.active.index),o.active.last=o.active.index>=x()-1,o.settings.pager&&I(o.active.index),o.settings.controls&&W(),"fade"==o.settings.mode)o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed),o.children.filter(":visible").fadeOut(o.settings.speed).css({zIndex:0}),o.children.eq(o.active.index).css("zIndex",51).fadeIn(o.settings.speed,function(){t(this).css("zIndex",50),D()});else{o.settings.adaptiveHeight&&o.viewport.height()!=v()&&o.viewport.animate({height:v()},o.settings.adaptiveHeightSpeed);var s=0,n={left:0,top:0};if(!o.settings.infiniteLoop&&o.carousel&&o.active.last)if("horizontal"==o.settings.mode){var a=o.children.eq(o.children.length-1);n=a.position(),s=o.viewport.width()-a.outerWidth()}else{var l=o.children.length-o.settings.minSlides;n=o.children.eq(l).position()}else if(o.carousel&&o.active.last&&"prev"==i){var d=1==o.settings.moveSlides?o.settings.maxSlides-m():(x()-1)*m()-(o.children.length-o.settings.maxSlides),a=r.children(".bx-clone").eq(d);n=a.position()}else if("next"==i&&0==o.active.index)n=r.find("> .bx-clone").eq(o.settings.maxSlides).position(),o.active.last=!1;else if(e>=0){var c=e*m();n=o.children.eq(c).position()}if("undefined"!=typeof n){var g="horizontal"==o.settings.mode?-(n.left-s):-n.top;b(g,"slide",o.settings.speed)}}},r.goToNextSlide=function(){if(o.settings.infiniteLoop||!o.active.last){var t=parseInt(o.active.index)+1;r.goToSlide(t,"next")}},r.goToPrevSlide=function(){if(o.settings.infiniteLoop||0!=o.active.index){var t=parseInt(o.active.index)-1;r.goToSlide(t,"prev")}},r.startAuto=function(t){o.interval||(o.interval=setInterval(function(){"next"==o.settings.autoDirection?r.goToNextSlide():r.goToPrevSlide()},o.settings.pause),o.settings.autoControls&&1!=t&&A("stop"))},r.stopAuto=function(t){o.interval&&(clearInterval(o.interval),o.interval=null,o.settings.autoControls&&1!=t&&A("start"))},r.getCurrentSlide=function(){return o.active.index},r.getSlideCount=function(){return o.children.length},r.redrawSlider=function(){o.children.add(r.find(".bx-clone")).outerWidth(u()),o.viewport.css("height",v()),o.settings.ticker||S(),o.active.last&&(o.active.index=x()-1),o.active.index>=x()&&(o.active.last=!0),o.settings.pager&&!o.settings.pagerCustom&&(w(),I(o.active.index))},r.destroySlider=function(){o.initialized&&(o.initialized=!1,t(".bx-clone",this).remove(),o.children.each(function(){void 0!=t(this).data("origStyle")?t(this).attr("style",t(this).data("origStyle")):t(this).removeAttr("style")}),void 0!=t(this).data("origStyle")?this.attr("style",t(this).data("origStyle")):t(this).removeAttr("style"),t(this).unwrap().unwrap(),o.controls.el&&o.controls.el.remove(),o.controls.next&&o.controls.next.remove(),o.controls.prev&&o.controls.prev.remove(),o.pagerEl&&o.pagerEl.remove(),t(".bx-caption",this).remove(),o.controls.autoEl&&o.controls.autoEl.remove(),clearInterval(o.interval),o.settings.responsive&&t(window).unbind("resize",B))},r.reloadSlider=function(t){void 0!=t&&(n=t),r.destroySlider(),d()},d(),this}}(jQuery);

/*
* on-key event fix for FF on Korean input
* fires 'keyup' event when contents of input form change
* requires jQuery 1.2.x
* example: var watchInput = keyFix(inputId);
* author: Hoya, hoya@betastudios.net http://hoya.tistory.com
*/
var beta, _beta;
if (typeof(beta) == "undefined") {
    _beta = beta = {};
}

if (typeof(_beta.fix) == "undefined"){
    _beta.fix = {};
}else{
    //console.log("keyfix is already set!");
}
if(typeof(window.beta.instances) == "undefined") {
    window.beta.instances = [];
}

_beta.fix = function(targetId)
{
    // this fix is only for mozilla browsers
    if (navigator.userAgent.search('Firefox') <= -1) {
        return false;
    }

    var thisClass = this;
    this.keyEventCheck = null;
    this.db = null;
    this.targetId = targetId;
    window.beta.instances[this.targetId] = this;

    var focusFunc = function()
    {
        if(!thisClass.keyEventCheck) {
            thisClass.watchInput();
        }
    };

    var blurFunc = function()
    {
        if(thisClass.keyEventCheck) {
            window.clearInterval(thisClass.keyEventCheck);
            thisClass.keyEventCheck = null;
        }
    };

    $("#" + this.targetId).bind("focus", focusFunc);
    $("#" + this.targetId).bind("blur", blurFunc);
};

_beta.fix.prototype.watchInput = function()
{
    if(this.db != $("#" + this.targetId).val())
    {
        // trigger event
        $("#" + this.targetId).trigger('keyup');
    }
    this.db = $("#" + this.targetId).val();

    if(this.keyEventCheck) {
        window.clearInterval(this.keyEventCheck);
    }
    this.keyEventCheck = window.setInterval("window.beta.instances['" + this.targetId + "'].watchInput()", 100);
};

/**
 * ui.byteCounter.js
 * @author shinsegae it dev team
 * @fileOverview 입력폼내의 글자수를 체크하여 입력된만큼의 byte를 출력하고 컷팅하는 함수
 * @requires
 *          - jquery 1.9.1
 * @since 2013.08.26
 * @copyright © 2013 s.com All right reserved
 * ChkByte 객체
 * @constructor
 * @param {object}     setting 제어 옵션
 * @param {function}   setting.beforeInit 초기화전 수행
 * @param {function}   setting.currentByte 호출시 현재 입력된 byteSize 와 최대 byte값을 보관하는 maxLen를 리턴함
 * @param {number}     setting.maxLen 최대 바이트
 * @param {number}     setting.bytesize 입력된 byte 크기
 * @param {number}     setting.strlen 입력된 글자 길이
 */

$.fn.ChkByte = function(opt){ //object is textarea n counter wrapper
    var _container = $(this);

    if(!opt) {
        opt={};
    }

    var setting = {
        beforeInit : null,
        maxLen : 1000,
        bytesize : 0,
        strlen : 0,
        onechar:0,
        currentByte:null
    };
    _container.each(function(){
        var _this = $(this);
        var _orgThis = this;
        var objname = _this.find(opt.element).get(0);
        var objstr;
        var objstrlen;
        var opts;

        var options = {
            init:function(){
                //초기화 콜백 함수
                if(opts.beforeInit && opts.beforeInit instanceof Function) {
                    opts.beforeInit.apply(_this);
                }
            },
            dataClear:function(){
                opts = $.extend({}, setting , opt);//객체와 변수에 누적된 값들을 초기화
                $.fn.extend(_orgThis, opts);
                objstr = objname.value;
                objstrlen = objstr.length;
            },
            action:function(){
                options.dataClear();

                /*global escape: true */
                for(var i=0; i< objstrlen; i++) {
                    opts.onechar = objstr.charAt(i);
                    if (escape(opts.onechar).length > 4) {
                        opts.bytesize += 2;
                    } else {
                        opts.bytesize++;
                    }
                    if(opts.bytesize <= opts.maxlen)  {
                        opts.strlen ++;
                    }
                }
                if(opts.bytesize > opts.maxlen-1) {
                    var objstr2;
                    objstr2 = objstr.substr(0, opts.strlen);

                    //byte카운터 꽉찼을경우 콜백 함수
                    if(opts.byteFull && opts.byteFull instanceof Function) {
                        _orgThis.byteFull(options.getByte());
                    }
                    objname.value = objstr2;
                }else{
                    //byte카운터 콜백 함수
                    if(opts.currentByte && opts.currentByte instanceof Function) {
                        _orgThis.currentByte(options.getByte());
                    }
                }
                objname.focus();
            },
            getByte : function(){
                return {
                    bytesize : opts.bytesize,
                    maxLen : opts.maxLen
                };
            }
        };
        $(objname).bind({
            'keyup':function(){
                options.action();
            }
        });
    });
};

//유틸 - 딜레이
var util = ( function( window, undefined ) {
    function wait(timeout){
        var deferred = $.Deferred();
        setTimeout(deferred.resolve, timeout);
        return deferred.promise();
    }
    return {
        wait : wait
    };
} )( window );

//common GNB
var gnbPleaseComment = function(){
     var plzCommentArea = function (options) {
        var obj = options.selector;
        var btn = options.btn;

        function getUserInfo() {

            if(typeof window.UserInfo === 'undefined') {
                window.UserInfo = {};
            }

            return window.UserInfo;
        }

        //byte check
        $(obj).not('.ui_js_on').each(function () {
            var obj = $(this);
            var focusChk = 0;
            obj.parent().find(btn).hide();
            //로그인 전이라면 2013-10-17
            var loginOk = false;

            var UserInfo = getUserInfo();

            if(UserInfo.isLoginYn == "Y"){ //로그인된상태
                loginOk = true;
            }

            if(loginOk){
                obj.addClass('ui_js_on');

                //2013-10-10 add
                $('#header').off('click');
                $('#header').off('focusin');
                $('#header').off('focusout');
                $('#header').off('keyup');
                $('#header').off('paste');

                $('#header').on('click focusin focusout keyup paste mouseenter mouseleave',options.selector + ' textarea',function(e){
                    var val;
                    var eq;
                    if(e.type =="click"){
                        val = $(this).find('textarea').val();
                        $(this).next('.comment_txt').hide();
                        $(this).css('height', '48px');
                        $(this).parent().addClass('active');
                        $(this).parent().find(btn).show();
                    }
                    if(e.type =="focusin"){
                        val = $(this).val();
                        $(this).next('.comment_txt').hide();
                        $(this).css('height', '48px');
                        $(this).parent().addClass('active');
                        $(this).parents(options.selector).addClass('active');
                        $(this).parent().find(btn).show();
                    }
                    if(e.type =="focusout"){
                        if(focusChk){return false;}
                        val = $.trim($(this).val());
                        if (val === "") {
                           if($(this).attr('_value')){
                                $(this).val($(this).attr('_value'));
                                $(this).parents(options.selector).find(btn).hide();
                                $(this).parents(options.selector).removeClass('active');
                                $(this).parent().removeClass('active');
                            }else{
                                $(this).val('');
                                $(this).css('height', '16px');
                                $(this).next('.comment_txt').show();
                                $(this).parents(options.selector).find(btn).hide();
                                $(this).parents(options.selector).removeClass('active');
                                $(this).parent().removeClass('active');
                                $(this).parents(options.selector).find('.byte').find('em').text('0').css('color', '#747474');
                            }
                        }
                    }
                    if(e.type =="keyup"){
                        eq = obj.find('textarea').index(this);
                        var str_len =  $(this).val().length;
                            var cbyte = 0;
                            var strlen = 0;
                            var objstr;
                            for (var i = 0; i < str_len; i++) {
                                var is_one_char = $(this).val().charAt(i);
                                if (escape(is_one_char).length > 4) {
                                    cbyte += 2; //한글이면 2를 더한다
                                } else {
                                    cbyte++;    //한글아니면 1을 다한다
                                }
                                if(cbyte <= 1000)  {
                                    strlen ++;
                                }
                            }
                            //if (cbyte == 1001) cbyte = 1000;
                            if (cbyte > 1000) {
                                objstr = $(this).val().substr(0, strlen);
                                alert("최소 1자(1byte) ~  최대500자(1000byte) 이내로 입력해 주세요.");
                                $(this).val(objstr);
                                $(this).parents(options.selector).find('.byte:eq(' + eq + ')').find('em').text(cbyte).css('color','red');
                                return;
                            } else {
                                $(this).parents(options.selector).find('.byte:eq(' + eq + ')').find('em').text(cbyte).css('color', '#747474');
                            }
                    }
                    if(e.type =="mouseenter"){
                        $(this).parents(options.selector).addClass('lst_over');
                    }
                    if(e.type =="mouseleave"){
                        $(this).parents(options.selector).removeClass('lst_over');
                    }
                    //2013-10-10 add
                    if($(this).parents(options.selector).find(btn + ' a').last().get(0)){
                        var _cancelVar = $(this);
                        $(this).parents(options.selector).find(btn + ' a').last().click(function(){
                            if(_cancelVar.attr('_value')){
                                _cancelVar.val($(this).attr('_value'));
                            }else{
                                _cancelVar.val('');

                                _cancelVar.next('.comment_txt').show();
                            }
                            _cancelVar.css('height', '16px');
                            _cancelVar.parents(options.selector).find(btn).hide();
                            _cancelVar.parents(options.selector).removeClass('active');
                            _cancelVar.parent().removeClass('active');
                            _cancelVar.parents(options.selector).find('.byte:eq(' + eq + ')').find('em').text(0).css('color', '#747474');
                            _cancelVar.get(0).blur();
                            $(this).focus();
                        });
                    }
                });
            }
        });
    };
    plzCommentArea({
        selector: '#header .header_util .util_plsc',
        btn: '.util_plsbt'
    });
};
var ajaxpleaseCommentToolTip = function(e){
    var _wrap = $('#header');

    var uiActive = 'active';
    var bodyEl = (document.body)? document.body : document.documentElement;
    var obj = _wrap.find('.ui_tooltip').eq(0);
    var target = obj.attr('href');
    var openUp = obj.hasClass(uiActive);
    _wrap.find('.tooltip_box').eq(0).removeClass(uiActive);
    var position = obj.position();
    var closeBtn = $(target).find('.tooltip_close');

    function allClose(){
        $('.ui_tooltip').removeClass(uiActive);
        $('.ui_tooltip').each(function(){
            $($(this).attr('href')).hide();
        });
    }

    function tmpBind(){
        obj.removeClass(uiActive);
        $(target).removeClass(uiActive);
        $(target).hide();
        $(bodyEl).unbind('click',tmpBind);
    }

    if (!openUp) {
        allClose();
        $(bodyEl).unbind('click',tmpBind);
        $(bodyEl).bind('click',tmpBind);
        obj.addClass(uiActive);
        $(target).addClass(uiActive);
        $(target).show();
    } else {
        $(bodyEl).unbind('click',tmpBind);
        obj.removeClass(uiActive);
        $(target).removeClass(uiActive);
        $(target).hide();
    }

    $(closeBtn).unbind();
    $(closeBtn).click(function (e) {
        e.preventDefault();
        $(bodyEl).unbind('click',tmpBind);
        $(target).hide();
        $(target).removeClass(uiActive);
        obj.removeClass(uiActive);
    });
    $(target).click(function(e){
        e.stopPropagation();
    });
};
var commonGnbTab = function(){
    var _wrap = $('#header');
    var _gnb = _wrap.find('.gnb');
    var uiActive = 'active';
    var uiContent = "content";
    var bodyEl = (document.body)? document.body : document.documentElement;

    _gnb.find('li > a').bind('mouseenter mouseleave focusin focusout',function(e){
        if(e.type =="mouseenter" || e.type =="focusin"){
            $(this).parent().addClass('lst_over');
        }
        if(e.type =="mouseleave" || e.type =="focusout"){
            $(this).parent().removeClass('lst_over');
        }
    });

    _wrap.find('.ui_tooltip:not(:eq(0))').click(function (e) {
        e.preventDefault();
        var obj = this;
        var target = $(this).attr('href');
        var openUp = $(this).hasClass(uiActive);
        _wrap.find('.tooltip_box').removeClass(uiActive);
        var position = $(this).position();
        var closeBtn = $(target).find('.tooltip_close');
        function allClose(){
            $('.ui_tooltip').removeClass(uiActive);
            $('.ui_tooltip').each(function(){
                $($(this).attr('href')).hide();
            });
        }
        function tmpBind(){
            $(obj).removeClass(uiActive);
            $(target).removeClass(uiActive);
            $(target).hide();
            $(bodyEl).unbind('click',tmpBind);
        }

        if (!openUp) {
            allClose();
            $(bodyEl).unbind('click',tmpBind);
            $(bodyEl).bind('click',tmpBind);
            $(obj).addClass(uiActive);
            $(target).addClass(uiActive);
            $(target).show();
        } else {
            $(bodyEl).unbind('click',tmpBind);
            $(obj).removeClass(uiActive);
            $(target).removeClass(uiActive);
            $(target).hide();
        }
        e.stopPropagation();

        $(closeBtn).unbind();
        $(closeBtn).click(function (e) {
            e.preventDefault();
            $(bodyEl).unbind('click',tmpBind);
            $(target).hide();
            $(target).removeClass(uiActive);
            $(obj).removeClass(uiActive);
        });
        $(target).click(function(e){
            e.stopPropagation();
        });
    });


    //자주찾은 검색어 토글레이어
    _wrap.find('.ui_toggle.ui_hover').hover(function (e) {
        var obj = this;
        var target = $(this).attr('href');
        $(obj).hover(function () {
            $(this).addClass(uiActive);
            $(target).addClass(uiActive);
        }, function () {
            $(this).removeClass(uiActive);
            $(target).removeClass(uiActive);
        });
        $(obj).click(function (e) {
            e.preventDefault();
        });
        $(obj).focusin(function () {
            $(this).addClass(uiActive);
            $(target).addClass(uiActive);
        }).focusout(function () {
            $(this).removeClass(uiActive);
            $(target).removeClass(uiActive);
        });
    });
};
/* LNB
 * @requires
            - jquery.menu-aim.js
*/
$.fn.menu = function(htOptions) {
    var defaults = {
        "activeClass" : "on",
        "rowSelector": "> li",
        "activate": function(elSubMenu) {
            $(elSubMenu).addClass(this.activeClass);
            /* scom lnb 1depth 서브레이어 위치조정*/
            var item = $(elSubMenu);
            if(item.parent().parent().is('div.category_aside')){
                var lineH = item.height();
                var idx = item.index()+1;
                var Pos = (lineH * idx) + item.find('> ul').height();
                if(Pos > 360){
                    var posTo = 360 - Pos-2;
                    item.find('> ul').css({
                        'top':posTo
                    });
                }
                if(item.find('> ul').height() > 540){
                    var pstTop = 360 - (lineH*idx) - 460;
                    item.find('> ul').css({
                        'top':pstTop
                    });
                }
            }
        },
        "deactivate" : function(elSubMenu){
            $(elSubMenu).removeClass(this.activeClass);
        },
        "exitMenu" : function(elMenu){
            var sFilterClass = this.activeClass;
            $(elMenu).find("li").filter(function() {
                return $(this).hasClass(sFilterClass);
            }).removeClass(sFilterClass);

            return true;
        }

    }, settings = $.extend({}, defaults, htOptions);

    var sActiveClass = settings.activeClass;

    var _addFocusEvents = function(welMenu){
        welMenu
            .on("focusin", "li", function() {
            	$(this).addClass(sActiveClass).siblings().removeClass(sActiveClass);
            });
    };

    return this.each(function() {
        $(this).menuAim(settings);
        _addFocusEvents($(this));
    });
};

//skyscraper 위치제어 공통모듈
$.fn.skyscraper = function(opt){
    var _this = $(this);
    if(!_this.get(0)) { return false;}
    var pos = 0;
    var setting;
    var options;
    var sfooter = $('.common_footer');
    var prevpst = _this.position().top;
    var wrapperPosition = {};
    var wrapperHeight = 0;
    var utils = {
        isSet : function(opt){
            setting = {
                beforeInit : null,
                afterInit : null,
                interval : 40,
                topPosition : parseInt(_this.css('top'),10),
                startPos : 0,
                endPosTarget : sfooter
            };
            $.extend(setting, opt);
            options = $.extend(utils, setting);
            this.init();
        },
        init : function(){
            if(options.beforeInit && options.beforeInit instanceof Function) {
                options.beforeInit.apply(_this);
            }
            if(!options.startPos){
                options.startPos = options.topPosition;
            }

            // skyscraper 높이 계산
            // 최상단 x버튼 부터 최하단 Top버튼까지
            /*wrapperPosition = {
                top: _this.find('.btn_sky_mini').position().top,
                bottom: _this.find('.sky_top > a').position().top + _this.find('.sky_top > a').outerHeight()
            };*/

            wrapperHeight = _this.height();

            // 위치 제어
            this.positionFix();
            // 저해상도 대응
            if($(window).width() <= 1550){
            	_this.addClass('sky_mini');
            }
            $(window).resize(function () {
                utils.positionFix();
                utils.setSkyMini();
            });
            $(window).scroll(function () {
                utils.positionFix();
            });

            if(options.afterInit && options.afterInit instanceof Function) {
                opt.afterInit(_this);
            }
        },

        /* 스카이스크래퍼 위치 제어 함수 */
        positionFix : function(){
            if(_this.is('#sky_scraper')){ //position right control
                if($(window).width() <= 1550){
                    _this.addClass('low_width');
                }else{
                    _this.removeClass('low_width');
                }
            }

            if ($(window).scrollTop() > utils.startPos){
                //_this.css({position:'fixed',top:$(window).scrollTop() - utils.startPos + utils.topPosition});
                _this.css({position:'fixed',top:'30px'});

                var footHeight = utils.endPosTarget.outerHeight();
                var sct = (document.body.scrollTop) ? document.body.scrollTop : document.documentElement.scrollTop;
                var sch = document.documentElement.scrollHeight;
                var rtnChk = sch - sct - footHeight;
                wrapperHeight = _this.height();
                if (wrapperHeight > rtnChk) {
                    _this.css('top', '-' + (wrapperHeight - rtnChk) + 'px');
                } else {
                    utils.endPosTarget.css('top','30px');
                }
            } else {
                if ($(window).scrollTop() == 0){
                    $('#floatWrap3 .bn_fix_s').hide();
                    $('#floatWrap4 .bn_fix_s').hide();
                }else{
                    $('#floatWrap3 .bn_fix_s').show();
                    $('#floatWrap4 .bn_fix_s').show();
                }
                _this.css({position:'absolute',top:prevpst});
            }
        },
        setSkyMini : function(){
            if(_this.is('#sky_scraper')){
            	if($.cookie('skyscraper')=='mini'){
            		return false;
            	}
            	else{
	                if($(window).width() <= 1550){
	                	if(_this.hasClass('active')){
	            			_this.find('.sky_btn_area button').trigger('click');
	            		}
	                    _this.addClass('sky_mini');
	                }
	               	else{
	               		if(_this.hasClass('sky_mini')){
	            			_this.find('#_history_min').trigger('click');
	            		}
	               	}
            	}
            }
        }
    };
    utils.isSet(opt);

    return _this;
};

//scom skyscraper 추가 필요 기능
var viewport, itemWraper, _eventCount, options;
var skyScraperExpModule = {
    isSet : function(opt,_this){
        var extOptions = {
            beforeInit : null,
            afterInit : null,
            slideULSelector :  null,
            slideViewport : {
                Selector : null
            }
        };
        options = $.extend(extOptions, opt);
        this.init(_this);
    },
    init: function(_this){
        viewport = _this.find(options.slideViewport.Selector);
        itemWraper = _this.find(options.slideULSelector);
        _eventCount = 0;
        this.selectList(_this);//카테고리별 sorting 및 counting
        this.listHover();//list hover class apply
        if(itemWraper){
            this.slideUtil.slideApply(_this);
        }
        this.openClose(_this);//펼치기n접기 버튼 기능 적용
        if($.cookie('skyscraper')=='mini'){
            _this.addClass('sky_mini');
        }
        $('#wrap').after('<div id="sr_ly" />');
    },
    /* selectbox sorting */
    selectList : function(_this){
        var select = $('#select_option01');
        var len = itemWraper.find('> li:not(.history_txt)').length;
        _this.find('strong.num').eq(0).text(len);

        if(len == 0){
            $('<li class="history_txt"><p class="history_txt">“최근 본 쇼핑<br />정보가<br />없습니다.”</p></li>').appendTo(itemWraper);
        }

        var _init = function(){
            len = itemWraper.find('> li:not(.history_txt)').length;
            itemWraper.show();
            itemWraper.find('> li').show();

            _this.find('li.history_txt').remove();
        };
        select.bind('change',function(){
            var _val = $(this).find('option:selected').val();
            var _cateSelector = null;
            _init();
            /*
                상품      type_product
                검색      type_search
                기획전    type_exhibition
                이벤트    type_event
                카테고리  type_category
                브랜드    type_brand
            */
            switch(_val){
                case '전체':
                    _val = "쇼핑";
                    _cateSelector = 0;
                    break;
                case '상품':
                    _cateSelector = '.type_product';
                    break;
                case '검색':
                    _cateSelector = '.type_search';
                    break;
                case '기획전':
                    _cateSelector = '.type_exhibition';
                    break;
                case '이벤트':
                    _cateSelector = '.type_event';
                    break;
                case '카테고리':
                    _cateSelector = '.type_category';
                    break;
                case '브랜드':
                    _cateSelector = '.type_brand';
                    break;
                case '매장':
                    _cateSelector = '.type_store';
                    break;
            }
            if(_cateSelector){
                itemWraper.find('> li').not(_cateSelector).hide();
                len = itemWraper.find(_cateSelector).length;
            }
            _this.find('strong.num').eq(0).text(len);
            if(!len){
                $('<li class="history_txt"><p class="history_txt">“최근 본 <span>' + _val + '정보</span>가 없습니다.”</p></li>').appendTo(itemWraper);
            }
        });
    },
    //img hover Class
    listHover : function(){
        itemWraper.on('mouseenter mouseleave','> li:not(.type_product) .history_cont', function(e){
            var item = $(this).parent('li');
            if (e.type=='mouseenter'){
                item.addClass('hishover');
            }else if(e.type=='mouseleave'){
                item.removeClass('hishover');
            }
        });

        itemWraper.on('mouseenter','> li.type_product div.sky_thumbnail', function(e){
            var item = $(this);
            if(e.type == "mouseenter"){
                lySkyProduct(item);
            }
        });
    },
    /* 내부 슬라이드 관련 함수 */
    slideUtil : {
        /* 펼침 접힘에 따른 스타일 적용 or 해제 함수 */
        _viewChgInit : function(){
            var _this = $('div#sky_scraper');
            if(_this.is('.active')){
                viewport.css({
                    'overflow':'hidden'/*,
                    'height':299,
                    'marginTop':23*/
                });
                itemWraper.css({
                    'marginTop':0,
                    'height':'auto'
                });
                _this.get(0).btnControl();
            }else{
                viewport.removeAttr('style');
                itemWraper.removeAttr('style');
            }
            //_eventCount = 0;
        },
        /* 슬라이드 기능 적용 */
        slideApply : function(_this){
            var items = itemWraper.find('> li');
            var btnWraper = _this.find('.sky_direction');
            var chkTarget = null;
            var speed = 400,
            maxMileStone = 0,
            itemWraperH = 0,
            mileStone = viewport.height(), //기본 이동거리
            movePosArray = [0],
            moveNextElem = [],
            moveH = 0;
            var _init = function(){
                //이동할수있는 최대거리 값 산출
                items.each(function(){
                    var item = $(this);
                    itemWraperH += item.outerHeight(true);
                });
                maxMileStone = itemWraperH - viewport.height();
                //펼침 접힘 상태에 따른 슬라이드 관련 스타일 적용 및 해제
                if(!_this.is('.active')){
                    viewport.css({
                        'overflow':'hidden'/*,
                        'height':299,
                        'marginTop':23*/
                    });
                    itemWraper.css({
                        'marginTop':0,
                        'height':'auto'
                    });
                }else{
                    viewport.removeAttr('style');
                    itemWraper.removeAttr('style');
                }
                items.eq(0).addClass('chk_target');
                btnWraper.find('.prev').unbind();
                btnWraper.find('.next').unbind();

                /* 펼침접힘에 따라 버튼이벤트 reset 를 위한 commonUtil 객체 상속 */
                var orgThis = _this.get(0);
                $.fn.extend(orgThis,commonUtil);
                orgThis.btnControl();

                initVerticalScroll();

                itemWraper.on('refresh.scroll', function(){
                    mileStoneInit();
                    orgThis.btnControl();
                });

                itemWraper.on('reset.scrollBeforeClose', function(){
                    calculateEventCount();
                });

                itemWraper.on('reset.scrollClose', function(){
                    itemWraper.stop().animate({
                        'marginTop':-movePosArray[_eventCount]
                    },0,function(){
                        commonUtil.btnControl();
                    });
                });

                itemWraper.on('reset.scrollOpen', function(e, nScrollTop){
                    if ( typeof moveNextElem[_eventCount] != 'undefined' ) {
                        itemWraper.scrollTop(moveNextElem[_eventCount].position().top);
                    }
                });
            };
            /* list item 갯수에 따라 이동거리 재계산 */
            var mileStoneInit = function(){
                items = itemWraper.find('> li');
                chkTarget = itemWraper.find('li.chk_target');
                itemWraperH = 0;
                items.each(function(){
                    var item = $(this);
                    itemWraperH += item.outerHeight(true);
                });
                maxMileStone = itemWraperH - viewport.height();
                return itemWraperH;
            };
            /* 이동할거리를 계산해주는 함수 */
            var getMileStone = function(){
                mileStoneInit();
                var startPos = chkTarget.position().top;
                items.each(function(idx){
                    var item = $(this);
                    var itemPos = item.position().top;
                    if(mileStone+startPos > itemPos && mileStone+startPos > itemPos + item.outerHeight(true)){
                        moveH = itemPos + item.outerHeight(true);
                        if(maxMileStone < moveH){
                            moveH = moveH + (maxMileStone - moveH);
                        }else{
                            items.removeClass('chk_target');
                            item.next().addClass('chk_target');
                        }
                    }else{
                        return false;
                    }
                });
                return moveH;
            };

            var initVerticalScroll = function(){
                mileStoneInit();
                var aTempMovePosArray = [0],
                    nMoveDistance = 0;

                items.each(function(idx){
                    var item = $(this),
                        itemPos = item.position().top,
                        itemHeight = item.outerHeight(true),
                        startPos = aTempMovePosArray[aTempMovePosArray.length-1];

                    if(idx===0){
                        moveNextElem.push(item);
                    }

                    if(mileStone + startPos > itemPos && mileStone + startPos < itemPos + item.outerHeight(true)){
                        nMoveDistance = itemPos;

                        if(maxMileStone < nMoveDistance){
                            nMoveDistance = maxMileStone;
                        }

                        aTempMovePosArray.push(nMoveDistance);
                        moveNextElem.push(item);
                    }
                });

                movePosArray = aTempMovePosArray;
            };

            var calculateEventCount = function(){
                var scrollTop = itemWraper.scrollTop(),
                    scrollBottom = scrollTop + itemWraper.height(),
                    inViewIdx = -1,
                    inViewitems =  $.grep( moveNextElem, function( elem, i ) {
                        var item = $(elem);
                        var itemTop = item.position().top;
                        var itemBottom = itemTop + item.outerHeight(true);

                        return itemBottom+scrollTop > scrollTop && itemTop+scrollTop < scrollBottom;
                    });

                if(inViewitems.length){
                    inViewIdx = $.inArray(inViewitems[0], moveNextElem);
                    if(inViewIdx !== -1){
                        _eventCount = inViewIdx;
                    }
                }
            };

            /* 슬라이드 prev 버튼 클릭시 적용될 함수 */
            var prevBtnEvnt  = function(){
                _eventCount--;
                var moveTo = movePosArray[_eventCount];
                btnWraper.find('.prev').unbind('click',prevBtnEvnt);
                itemWraper.stop().animate({
                    'marginTop':-moveTo
                },speed,function(){
                    commonUtil.btnControl();
                });
            };

            /* 슬라이드 next 버튼 클릭시 적용될 함수 */
            var nextBtnEvnt  = function(){
                var moveTo;
                _eventCount++;
                if(!movePosArray[_eventCount]){
                    moveTo = getMileStone();
                    //prev에서 사용할 위치 좌표 배열 생성
                    movePosArray[_eventCount] = moveTo;
                }else{
                    moveTo = movePosArray[_eventCount];
                }
                btnWraper.find('.next').unbind('click',nextBtnEvnt);
                itemWraper.stop().animate({
                    'marginTop':-moveTo
                },speed,function(){
                    commonUtil.btnControl();
                    commonUtil.checkReachToBottom();
                });
            };

            /* 외부에서 호출가능한 함수 */
            var commonUtil = {
                /* 슬라이딩 버튼 컨트롤 함수 */
                btnControl : function(){
                    var ulStats = Math.abs(parseInt(itemWraper.css('marginTop'),10));
                    btnWraper.find('.prev').unbind('click');
                    btnWraper.find('.next').unbind('click');
                    btnWraper.find('.prev').bind('click',prevBtnEvnt).removeClass('disable');
                    btnWraper.find('.next').bind('click',nextBtnEvnt).removeClass('disable');
                    if(ulStats == 0){
                        btnWraper.find('.prev').unbind('click',prevBtnEvnt).addClass('disable');
                    }
                    if(maxMileStone == ulStats){
                        btnWraper.find('.next').unbind('click',nextBtnEvnt).addClass('disable');
                    }
                    var ulHeight = mileStoneInit();
                    if(ulHeight < viewport.height()){
                        btnWraper.find('.prev').unbind('click',prevBtnEvnt).addClass('disable');
                        btnWraper.find('.next').unbind('click',nextBtnEvnt).addClass('disable');
                    }
                },
                checkReachToBottom : function(){
                    var ulStats = Math.abs(parseInt(itemWraper.css('marginTop'),10));

                    if(maxMileStone == ulStats){
                        itemWraper.trigger('reachTo.bottom');
                    }
                }
            };
            _init();
        }
    },

    /* 스카이스크래퍼 펼침 접힘버튼 기능적용 함수 */
    openClose : function(_this){
        var bodyEl = (document.body)? document.body : document.documentElement;
        _this.click(function(e){
            e.stopPropagation();
        });
        function tmpBind(){
            //리스트영역 슬라이드 style 적용 or 해제 함수
            itemWraper.trigger('reset.scrollBeforeClose');
            if(itemWraper){skyScraperExpModule.slideUtil._viewChgInit(); _this.get(0).btnControl();}
            _this.find('li.history_txt').remove();
            _this.removeClass('active');
            _this.find('.sky_btn_area button').parent().removeClass('active');
            _this.find('.sky_btn_area button').text('최근 본 쇼핑정보 펼치기');

            //selectbox and list init
            $('#select_option01 option:eq(0)').attr('selected','selected');
            $('#select_option01').val($('#select_option01 option:eq(0)').val());
            if(itemWraper.find('> li:not(.history_txt)').length){
                itemWraper.find('> li').show();
            }else{
                $('<li class="history_txt"><p class="history_txt">“최근 본 쇼핑<br />정보가<br />없습니다.”</p></li>').appendTo(itemWraper);
            }
            _this.find('strong.num').eq(0).text(itemWraper.find('> li:not(.history_txt)').length);
            $(bodyEl).unbind('click',tmpBind);
            itemWraper.trigger('reset.scrollClose');
        }

        _this.find('.sky_btn_area button').click(function(){
            var welArea = $(this).parent();
            var nScrollTop = welArea.hasClass('active') ? itemWraper.scrollTop() : Math.abs(parseInt(itemWraper.css('marginTop'),10));

            if(welArea.hasClass('active')){
                itemWraper.trigger('reset.scrollBeforeClose');
            }

            //itemWraper.scrollTop(0);
            //리스트영역 슬라이드 style 적용 or 해제 함수
            if(itemWraper){skyScraperExpModule.slideUtil._viewChgInit();}
            _this.find('li.history_txt').remove();
            if(_this.is('.active')){
                _this.removeClass('active');
                $(this).parent().removeClass('active');
                $(this).text('최근 본 쇼핑정보 펼치기');

                //selectbox and list init
                $('#select_option01 option:eq(0)').attr('selected','selected');
                $('#select_option01').val($('#select_option01 option:eq(0)').val());
                if(itemWraper.find('> li:not(.history_txt)').length){
                    itemWraper.find('> li').show();
                }else{
                    $('<li class="history_txt"><p class="history_txt">“최근 본 쇼핑<br />정보가<br />없습니다.”</p></li>').appendTo(itemWraper);
                }
                _this.find('strong.num').eq(0).text(itemWraper.find('> li:not(.history_txt)').length);

                $(bodyEl).unbind('click',tmpBind);
                itemWraper.trigger('reset.scrollClose');
            }else{
                _this.addClass('active');
                $(this).parent().addClass('active');
                $(this).text('최근 본 쇼핑정보 접기');
                $(bodyEl).bind('click',tmpBind);
                if(itemWraper.find('> li:not(.history_txt)').length == 0){
                    $('<li class="history_txt"><p class="history_txt">“최근 본 <span>쇼핑정보</span>가 없습니다.”</p></li>').appendTo(itemWraper);
                }

                itemWraper.trigger('reset.scrollOpen');
            }
        });

        var acceptableHostNames = ['ssg.com', 'emart.com', 'sfcmall.com'];
        var topLevelHostName = location.hostname;

        $.each(acceptableHostNames, function() {
            if(location.hostname.indexOf(this.toString()) > -1) {
                topLevelHostName = this.toString();
            }
        });

        _this.find('#_history_min').click(function(e) {
            _this.removeClass('active');
            if(_this.hasClass('sky_mini')){
            	$.cookie('skyscraper','', {domain:topLevelHostName});
                _this.removeClass('sky_mini');
                viewport.css({
                    'overflow':'hidden'
                });
                itemWraper.css({
                    'marginTop':0,
                    'height':'auto'
                });
                _this.get(0).btnControl();
                $(bodyEl).unbind('click',tmpBind);
            }
            else{
            	$.cookie('skyscraper','mini', {domain:topLevelHostName});
                _this.addClass('sky_mini');
                $(bodyEl).bind('click',tmpBind);
            }
        });
    }
};

// [s]스카이스크래퍼 마우스 오버시 액션
// var ssTop = parseInt($('#sky_scraper').css('top'),10);
var $srTarge;
var $srThisis;
function winSize(){
    if($(window).width() <= 1550){
        $srTarge.addClass('low_width');
    }else{
        $srTarge.removeClass('low_width');
    };
    $srTarge.css({
        'position' : 'absolute',
        'top' : $srThisis.offset().top - 7
    });
    // if($(window).scrollTop() > ssTop){
    //     $srTarge.css({
    //         'position' : 'fixed',
    //         'top' : $srThisis.offset().top - $('#sky_scraper').offset().top + 23
    //     });
    // }else{
    //     $srTarge.css({
    //         'position' : 'absolute',
    //         'top' : $srThisis.offset().top - 7
    //     });
    // };
};

function lySkyProduct(el){
    if(!$('#sky_scraper').hasClass('active')){
        $srThisis = el;
        $srTarge = $('#sr_ly');
        var $sr_htmlis = $srThisis.parent('.history_cont');
        $srTarge.html($sr_htmlis[0].outerHTML);
        $srTarge.show();
        if($sr_htmlis.parent('li').hasClass('adult')){
            $srTarge.find('.history_cont').addClass('adult');
        };
        winSize();
        $(window).scroll(function(){
            $srTarge.hide();
        });
        $srTarge.on('mouseleave', function(){
            $srTarge.hide();
        });
    };
}
// [s]스카이스크래퍼 마우스 오버시 액션

// skySsgtalk
var skySsgtalk = function () {
    var welSkySsgtalk,
    	welBtnsellerDtl;

    function init(){
    	welSkySsgtalk = $('#sky_ssgtalk');
    	welBtnsellerDtl = $('.cmfloating_btnseller_dtl');
    	attachEventHandlers();
    }

    function attachEventHandlers() {
        welSkySsgtalk.on('mouseenter', '.cmfloating_btnarea', function(e) {
            $(this).addClass('on');
        }).on('mouseleave', '.cmfloating_btnarea', function(e) {
            $(this).removeClass('on');
        });
    }

    function showSellerDtl(){
    	if(welBtnsellerDtl.length > 0){
        	welBtnsellerDtl.addClass('on');

        	if(!(welBtnsellerDtl.hasClass('is_timer'))){
				welBtnsellerDtl.addClass('is_timer');
				util.wait(2000).done(function(){
			        welBtnsellerDtl.removeClass('on');
			        welBtnsellerDtl.removeClass('is_timer');
			    });
			}
        }
    }

    function onPush(welTarget){
    	$(welTarget).addClass('push on');

    	if(!($(welTarget).hasClass('is_timer'))){
			$(welTarget).addClass('is_timer');
			util.wait(2000).done(function(){
		        $(welTarget).removeClass('on');
		        $(welTarget).removeClass('is_timer');
		    });
		}
    }

    function offPush(welTarget){
    	$(welTarget).removeClass('push on');
    }

    return {
        init: init,
        onPush : onPush,
        offPush : offPush,
        showSellerDtl : showSellerDtl
    };
}();


// 장바구니 미리보기 토글
var utilCartPreviewLayer = function() {
    var welCartPreview = $('#utilCartPreview');
    var welCartPreviewBtn = welCartPreview.find('.util_cart_btn');
    var welCartPreviewLayer = welCartPreview.find('.util_cart_layer');
    var oTimerout = null;

    function attachEventHandlers() {
        welCartPreview.on('mouseenter', function(e) {
            if(!welCartPreviewLayer.is(':visible')) {
                openCartLayer();
            }
        }).on('mouseleave', function(e) {
            closeCartLayer();
        }).on('focusin', function(e) {
            window.clearTimeout(oTimerout);
            oTimerout = null;
        }).on('focusout', function(e) {
            if(welCartPreviewLayer.is(':visible')) {
                oTimerout = window.setTimeout(function() {
                    closeCartLayer();
                }, 150);
            }
        });
        welCartPreviewBtn.on('click', function(e) {
            if(!welCartPreviewLayer.is(':visible')) {
                openCartLayer();
            } else {
                closeCartLayer();
            }
        });
    }

    function openCartLayer() {
        if(welCartPreview.hasClass('active_preview')) {
            welCartPreview.addClass('on').trigger('cartLayerOpened');
        }
    }

    function closeCartLayer() {
        if(welCartPreview.hasClass('active_preview')) {
            welCartPreview.removeClass('on');
        }
    }

    return {
        init: attachEventHandlers
    }
}();

// 장바구니 미리보기 토글
var utilCartPreviewGoLayer = function() {
    var welCartPreview = $('#utilCartPreviewGo');
    var welCartPreviewLayer = welCartPreview.find('.util_cart_layer');
    var oTimerout = null;

    function attachEventHandlers() {
        welCartPreview.on('mouseenter', function(e) {
            if(!welCartPreviewLayer.is(':visible')) {
                openCartLayer();
            }
        }).on('mouseleave', function(e) {
            closeCartLayer();
        }).on('focusin', function(e) {
            window.clearTimeout(oTimerout);
            oTimerout = null;
            if(!welCartPreviewLayer.is(':visible')) {
                openCartLayer();
            }
        }).on('focusout', function(e) {
            if(welCartPreviewLayer.is(':visible')) {
                oTimerout = window.setTimeout(function() {
                    closeCartLayer();
                }, 150);
            }
        });
    }

    function openCartLayer() {
        if(welCartPreview.hasClass('active_preview')) {
            welCartPreview.trigger('cartLayerGoOpened');
        }
    }

    function closeCartLayer() {
        if(welCartPreview.hasClass('active_preview')) {
            welCartPreview.removeClass('on');
        }
    }

    return {
        init: attachEventHandlers
    };
}();

// 다국어 변경 토글
var utilLangSelect = function() {
    var welLangSelect = $('#utilLangSelect');
    var welLangSelectLayer = welLangSelect.find('.util_lang_layer');
    var oTimerout = null;

    function attachEventHandlers() {
        welLangSelect.on('mouseenter', function(e) {
            openLangSelectLayer();
        }).on('mouseleave', function(e) {
            closeLangSelectLayer();
        }).on('focusin', function(e) {
            window.clearTimeout(oTimerout);
            oTimerout = null;
            if(!welLangSelectLayer.is(':visible')) {
                openLangSelectLayer();
            }
        }).on('focusout', function(e) {
            if(welLangSelectLayer.is(':visible')) {
                oTimerout = window.setTimeout(function() {
                    closeLangSelectLayer();
                }, 150);
            }
        });

        welLangSelectLayer.on('click', '.util_lang_btnsel', function(e) {
            e.preventDefault();
            var sDataLang = $(this).find("em:visible").data('lang');
			welLangSelect.trigger('changeTranslatedGnb',sDataLang);
			closeLangSelectLayer();
        });
    }

    function openLangSelectLayer() {
        welLangSelect.addClass('on');
    }

    function closeLangSelectLayer() {
        welLangSelect.removeClass('on');
    }

    return {
        init: attachEventHandlers
    };
}();

//MYSSG 레이어 토글
var utilMyssgMenu = function () {
    var welMyssgMuen = $('#utilMyssg'),
        welMyssgMenuList = $('#utilMyssgLst'),
        oTimerout = null;

    function attachEventHandlers() {
        welMyssgMuen.on('mouseenter', function(e) {
            $(this).addClass('on');
        }).on('mouseleave', function(e) {
            $(this).removeClass('on');

        }).on('focusin', function(e) {
            window.clearTimeout(oTimerout);
            oTimerout = null;
            $(this).addClass('on');
        }).on('focusout', function(e) {
            if (welMyssgMenuList.is(':visible')) {
                oTimerout = window.setTimeout(function() {
                    welMyssgMuen.removeClass('on');
                }, 150);
            }
        });
    }
    return {
        init: attachEventHandlers
    };
}();

utilMyssgMenu.init();

//footer
var footerFamilySite = function(){
    $('body').on('click', '.common_footer .ui_toggle', function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var welTarget = $(this);
    	var welFamilySite = $(welTarget.attr('href'));

    	if (welTarget.hasClass('active')) {
    		welTarget.removeClass('active');
    		welFamilySite.removeClass('active').off('clickoutside.familySite');
    	} else {
    		welTarget.addClass('active');
    		welFamilySite.addClass('active').one('clickoutside.familySite', function(){
	        	welTarget.removeClass('active');
	        	welFamilySite.removeClass('active');
	        });
    	}
    });
};

//clip 추천 설정 팝업
$('#clip_product_bx .btn_setting').click(function(){
    var target = $($(this).attr('href'));
    target.click(function(e){
        e.stopPropagation();
    });
    target.show();
    target.find('.btn_close').click(function(){
        target.hide();
    });
});

//css :hover 클래스 제거관련 추가코드
$('.common_search_word').on('mouseenter mouseleave focusin focusout','.recent_search > li',function(e){
    if(e.type == "mouseenter" || e.type == "focusin"){
        $(this).addClass('lst_over').siblings('li').removeClass('lst_over');
    }
    if(e.type == "mouseleave" || e.type == "focusout"){
        $(this).removeClass('lst_over');
    }
});

//간편보기
var _productQuickReveal = _productQuickReveal || null,
    productQuickViewPresenter = new function (){
        var _createModalMask = function () {
            var mask = $('<div class="ssg-modal-mask">');
            mask.insertBefore('#container');
        };

        var _showProductInfoLayer = function (doc) {
            var lywrap = $('<div class="ssg-productinfo-layer">').css({
                'position': 'absolute',
                'text-align': 'center',
                'z-index': 100001
            });

            lywrap.append(doc);
            util.wait(100).done(function(){
                _resetPosition();
            });
            lywrap.insertBefore('#container');
        };

        var _hideProductInfoLayer = function () {
            $('.ssg-productinfo-layer').remove();
            $('.ssg-modal-mask').remove();
        };

        var _resetPosition = function () {
            var pop = $('.ssg-productinfo-layer .layer_pop');
            var pop_top = $(window).scrollTop();

            if (pop.outerHeight() < $(window).height()) {
                pop_top = Math.max($(window).scrollTop() + $(window).height() / 2 - pop.outerHeight() / 2, 0);
            }

            $('.ssg-productinfo-layer').css({
                'top': pop_top
            });

        };

        var _assignEvents = function(){
            $('body').on('click', function (e) {
                var container = $('.ssg-productinfo-layer .layer_pop, .layer_pos');
                var button = $('.ssg-productinfo-layer button.btn.close');

                if ($(e.target).is(button) || button.has(e.target).length > 0) {
                    _hideProductInfoLayer();
                } else if ($(e.target).is(container) || container.has(e.target).length > 0 || $('body').has(e.target).length <= 0) {

                } else {
                    _hideProductInfoLayer();
                }
            });

            $(window).on('resize', function (e) {
                _resetPosition();
            });
        };

        var _render = function(result){
            _createModalMask();
            _showProductInfoLayer(result);

            return this;
        };

        var _init = function(result){
            _createModalMask();
            _assignEvents();
            _showProductInfoLayer(result);

            return this;
        };

    return {
        render: _render,
        init: _init
    };
}();
//탑값만 계산
var productQuickView = function (url, itemId, siteNo, salestrNo) {
    var _requestProductInfo = function () {
        return $.ajax({
            url: url,
            data: {
                itemId: itemId,
                siteNo: siteNo,
                salestrNo: salestrNo
            },
            dataType: 'html'
        });
    };

    _requestProductInfo().done(function(result){
        if(_productQuickReveal){
            _productQuickReveal.render(result);
        }else{
            _productQuickReveal = productQuickViewPresenter.init(result);
        }

        if (typeof Clip !== 'undefined') {
            Clip.readyClipBtn && Clip.readyClipBtn();
        }
    }).fail(function(){
        alert('error');
    });
};

//바로S 토글
$('#go_s').on('mouseenter focusin', function(e){
    $(this).addClass('hover');
}).on('mouseleave', function(e){
    $(this).removeClass('hover');
}).on('focusout', '.util_s_bx', function(e){
    $(this).parent().removeClass('hover');
});

var ssg = ssg || {};ssg.View = ssg.View || {};ssg.Event = ssg.Event || {};
ssg.Event.emitter={subscribers:{},on:function(e,t,n){this.subscribers[e]=this.subscribers[e]||[];this.subscribers[e].push({callback:t,context:n})},off:function(e,t,n){var r,i=this.subscribers[e],s;if(i){r=i.length-1;while(r>=0){s=i[r];if(s.callback===t&&(!n||s.context===n)){i.splice(r,1);break}r--}}},emit:function(e){var t=this.subscribers[e],n=0,r=Array.prototype.slice.call(arguments,1),i;if(t){while(n<t.length){i=t[n];i.callback.apply(i.context||this,r);n++}}}};

ssg.View.FloatBaner1=function(e){$.extend(this,e||{});this.init()};ssg.View.FloatBaner1.prototype=$.extend({_nShowTime:5e3,_nIntroTime:2e3,_nAnimateTime:500,_nSmallWidth:101,_nBigWidth:355,_fnEventTime:null,_fnIntroTime:null,init:function(){this._assignElements();this._attachEventHandlers()},_assignElements:function(){this._welFloatBaner1Wrap=$("#floatWrap");this._welFloatBaner1=$("#floatTy1");this._welFloatBaner1BigBanner=this._welFloatBaner1.find(".bn_fix_b");this._welFloatBaner1SmallBanner=this._welFloatBaner1.find(".bn_fix_s");this._welFloatBaner1BigBannerClose=$("#floatTy1_close")},_attachEventHandlers:function(){this._welFloatBaner1BigBannerClose.on("click",$.proxy(this._onCloseBigBannerArea,this))},_onCloseBigBannerArea:function(){this._stopEventTimer();this._changeBigToSmallArea();$.cookie("floating_ty1","T",{expires:1,path:"/"})},_showFloatBaner1Area:function(){this._welFloatBaner1Wrap.show()},_hideFloatBaner1Area:function(){this._welFloatBaner1Wrap.hide()},_showBigBannerArea:function(){this._welFloatBaner1BigBanner.show().siblings().hide();this._nBigBannerWidth=this._welFloatBaner1SmallBanner.find(">img").width()},_hideBigBannerArea:function(){this._welFloatBaner1BigBanner.hide()},_showSmallBannerArea:function(){this._welFloatBaner1SmallBanner.show().siblings().hide();this._welFloatBaner1Wrap.css("zIndex",499)},_hideSmallBannerArea:function(){this._welFloatBaner1SmallBanner.hide()},_initBigBannerWidth:function(e){this._welFloatBaner1BigBanner.find(">img").width(e)},_initSmallBannerWidth:function(e){this._welFloatBaner1SmallBanner.find("img").width(e)},_changeBigToSmallArea:function(){var e=this;this._welFloatBaner1BigBanner.find(">img").animate({width:this._nSmallWidth},this._nAnimateTime,function(){e._hideBigBannerArea();e._initSmallBannerWidth(e._nSmallWidth);e._showSmallBannerArea();e.emit("visited")})},_startIntroBanner:function(){var e=this;this._welFloatBaner1BigBanner.find(">img").animate({width:this._nBigWidth},this._nAnimateTime,"easeOutBack",function(){e._startEventTimer()})},_startEventTimer:function(){this._fnEventTime=window.setTimeout($.proxy(this._changeBigToSmallArea,this),this._nShowTime)},_startIntroTimer:function(){this._fnIntroTime=window.setTimeout($.proxy(this._startIntroBanner,this),this._nIntroTime)},_stopEventTimer:function(){if(this._fnEventTime){window.clearTimeout($.proxy(this._fnEventTime,this));this._fnEventTime=null}},_stopIntroTimer:function(){if(this._fnIntroTime){window.clearTimeout($.proxy(this._fnIntroTime,this));this._fnIntroTime=null}},startIntro:function(){this._showFloatBaner1Area();this._initBigBannerWidth(this._nSmallWidth);this._showBigBannerArea();this._startIntroTimer()},showSmallBanner:function(){this._showFloatBaner1Area();this._showSmallBannerArea()}},ssg.Event.emitter)

ssg.View.FloatBaner2=function(e){$.extend(this,e||{});this.init()};ssg.View.FloatBaner2.prototype=$.extend({_nShowTime:5e3,_nAnimateTime:700,_nSmallWidth:101,_nBigWidth:1020,_fnEventTime:null,_fnIntroTime:null,init:function(){this._assignElements();this._attachEventHandlers()},_assignElements:function(){this._welFloatBaner2Wrap=$("#floatWrap2");this._welFloatBaner2=$("#floatTy2");this._welFloatBaner2BigBanner=this._welFloatBaner2.find(".bn_fix_b");this._welFloatBaner2SmallBanner=this._welFloatBaner2.find(".bn_fix_s");this._welFloatBaner2BigBannerClose=$("#floatTy2_close")},_attachEventHandlers:function(){this._welFloatBaner2BigBannerClose.on("click",$.proxy(this._onCloseBigBannerArea,this))},_onCloseBigBannerArea:function(){this._stopEventTimer();this._changeBigToSmallArea();$.cookie("floating_ty2","T",{expires:1,path:"/",domain:"ssg.com"})},_showFloatBaner2Area:function(){this._welFloatBaner2Wrap.show()},_hideFloatBaner2Area:function(){this._welFloatBaner2Wrap.hide()},_showBigBannerArea:function(){this._welFloatBaner2SmallBanner.hide();this._nBigBannerWidth=this._welFloatBaner2SmallBanner.find(">img").width()},_hideBigBannerArea:function(){this._welFloatBaner2BigBanner.hide()},_showSmallBannerArea:function(){this._welFloatBaner2SmallBanner.show().siblings().hide();this._welFloatBaner2Wrap.css("zIndex",499)},_hideSmallBannerArea:function(){this._welFloatBaner2SmallBanner.hide()},_initBigBannerWidth:function(e){this._welFloatBaner2BigBanner.find(">img").width(e)},_initSmallBannerWidth:function(e){this._welFloatBaner2SmallBanner.find("img").width(e)},_changeBigToSmallArea:function(){var e=this;this._welFloatBaner2BigBanner.find(">img").animate({width:this._nSmallWidth,marginRight:-130},this._nAnimateTime,"easeOutBack",function(){e._hideBigBannerArea();e._initSmallBannerWidth(e._nSmallWidth);e._showSmallBannerArea();e.emit("visited")})},_startIntroBanner:function(){var e=this;this._welFloatBaner2BigBanner.find(">img").animate({width:this._nBigWidth},this._nAnimateTime,"easeOutBack",function(){e._hideSmallBannerArea();e._showBigBannerArea();e._startEventTimer()})},_startEventTimer:function(){this._fnEventTime=window.setTimeout($.proxy(this._changeBigToSmallArea,this),this._nShowTime)},_stopEventTimer:function(){if(this._fnEventTime){window.clearTimeout($.proxy(this._fnEventTime,this));this._fnEventTime=null}},_startIntroTimer:function(){this._fnIntroTime=window.setTimeout($.proxy(this._startIntroBanner,this),this._nIntroTime)},_stopIntroTimer:function(){if(this._fnIntroTime){window.clearTimeout($.proxy(this._fnIntroTime,this));this._fnIntroTime=null}},startIntro:function(){this._showFloatBaner2Area();this._showBigBannerArea();this._startIntroTimer()},showSmallBanner:function(){this._showFloatBaner2Area();this._showSmallBannerArea()},showSmallBanner2:function(){this._showFloatBaner2Area();this._showBigBannerArea();this._startIntroTimer()}},ssg.Event.emitter)

ssg.View.FloatBaner3 = function (e) {
    $.extend(this, e || {});
    this.init();
};
ssg.View.FloatBaner3.prototype = $.extend({
    _nShowTime: 5e3,
    _nIntroTime: 2000,
    _nAnimateTime: 500,
    _nSmallWidth: 82,
    _nBigWidth: 800,
    _fnEventTime: null,
    _fnIntroTime: null,
    init: function () {
        this._assignElements();
        this._attachEventHandlers();
    },
    _assignElements: function () {
        this._welFloatBaner3Wrap = $("#floatWrap3");
        this._welFloatBaner3 = $("#floatTy3");
        this._welFloatBaner3BigBanner = this._welFloatBaner3.find(".bn_fix_b");
        this._welFloatBaner3SmallBanner = this._welFloatBaner3.find(".bn_fix_s");
        this._welFloatBaner3BigBannerClose = $("#floatTy3_close");
    },
    _attachEventHandlers: function () {
        this._welFloatBaner3BigBannerClose.on("click", $.proxy(this._onCloseBigBannerArea, this));
    },
    _onCloseBigBannerArea: function () {
        this._stopEventTimer();
        this._changeBigToSmallArea();
        $.cookie('floating_ty3', 'T', {expires: 1, path: '/'});
    },
    _showFloatBaner3Area: function () {
        this._welFloatBaner3Wrap.show();
    },
    _hideFloatBaner3Area: function () {
        this._welFloatBaner3Wrap.hide();
    },
    _showBigBannerArea: function () {
        this._welFloatBaner3BigBanner.show().siblings().hide();
        this._nBigBannerWidth = this._welFloatBaner3SmallBanner.find(">img").width();
    },
    _hideBigBannerArea: function () {
        this._welFloatBaner3BigBanner.hide();
    },
    _showSmallBannerArea: function () {
        this._welFloatBaner3SmallBanner.show().siblings().hide();
        if ($(window).scrollTop() == 0){
            $('#floatWrap3 .bn_fix_s').hide();
        }else{
            $('#floatWrap3 .bn_fix_s').show();
        }
    },
    _hideSmallBannerArea: function () {
        this._welFloatBaner3SmallBanner.hide();
    },
    _initBigBannerWidth: function (e) {
        this._welFloatBaner3BigBanner.find(">img").width(e);
    },
    _initSmallBannerWidth: function (e) {
        this._welFloatBaner3SmallBanner.find("img").width(e);
    },
    _changeBigToSmallArea: function () {
        var e = this;
        this._welFloatBaner3BigBanner.find(">img").animate({
            width: this._nSmallWidth
        }, this._nAnimateTime, function () {
            e._hideBigBannerArea();
            e._initSmallBannerWidth(e._nSmallWidth);
            e._showSmallBannerArea();
            e.emit("visited");
        });
    },
    _startIntroBanner: function () {
        var e = this;
        this._welFloatBaner3BigBanner.find(">img").animate({
            width: this._nBigWidth
        }, this._nAnimateTime, "easeOutBack", function () {
            e._startEventTimer();
        });
    },
    _startEventTimer: function () {
        this._fnEventTime = window.setTimeout($.proxy(this._changeBigToSmallArea, this), this._nShowTime);
    },
    _startIntroTimer: function () {
        this._fnIntroTime = window.setTimeout($.proxy(this._startIntroBanner, this), this._nIntroTime);
    },
    _stopEventTimer: function () {
        if (this._fnEventTime) {
            window.clearTimeout($.proxy(this._fnEventTime, this));
            this._fnEventTime = null;
        }
    },
    _stopIntroTimer: function () {
        if (this._fnIntroTime) {
            window.clearTimeout($.proxy(this._fnIntroTime, this));
            this._fnIntroTime = null;
        }
    },
    startIntro: function () {
        this._showFloatBaner3Area();
        this._initBigBannerWidth(this._nSmallWidth);
        this._showBigBannerArea();
        this._startIntroTimer();
    },
    showSmallBanner: function () {
        this._showFloatBaner3Area();
        this._showSmallBannerArea();
    },
    showBigBanner: function () {
        //this._showFloatBaner3Area();
        this._initBigBannerWidth(this._nBigWidth);
        this._showBigBannerArea();
        this._welFloatBaner3Wrap.on('clickoutside.floatBaner3', $.proxy(this._onClickOutside, this));
        //this._startIntroTimer()
    },
    _onClickOutside: function(){
        this._onCloseBigBannerArea();
        this._welFloatBaner3Wrap.off('clickoutside.floatBaner3');
    }
}, ssg.Event.emitter);

function floatBannerStart(){
    var oSsgViewFloatBaner1Event = new ssg.View.FloatBaner1();
    //최초 방문해서 인트로 화면을 본후
    oSsgViewFloatBaner1Event.on('visited', function(){
        //set cookie 사이트별
        $.cookie('floating_ty1', 'T', {expires: 1, path: '/'});
    });
    //방문한 기록이 있는 경우
    if($.cookie('floating_ty1') == 'T'){
        oSsgViewFloatBaner1Event.showSmallBanner();
    //방문한 기록이 없는 경우
    }else{
        oSsgViewFloatBaner1Event.startIntro();
    }
}
function floatBanner2Start(){
    var oSsgViewFloatBaner2Event = new ssg.View.FloatBaner2();
    //최초 방문해서 인트로 화면을 본후
    oSsgViewFloatBaner2Event.on('visited', function(){
        //set cookie 전체사이트
        $.cookie('floating_ty2', 'T', {expires: 1, path: '/',domain:'ssg.com'});
    });
    //방문한 기록이 있는 경우
    if($.cookie('floating_ty2') == 'T'){
        oSsgViewFloatBaner2Event.showSmallBanner();
    //방문한 기록이 없는 경우
    }else{
        oSsgViewFloatBaner2Event.startIntro();
    }
}
function floatBanner3Start(){
    var oSsgViewFloatBaner3Event = new ssg.View.FloatBaner3();
    //최초 방문해서 인트로 화면을 본후
    oSsgViewFloatBaner3Event.on('visited', function(){
        //set cookie 사이트별
        $.cookie('floating_ty3', 'T', {expires: 1, path: '/'});
    });
    //방문한 기록이 있는 경우
    if($.cookie('floating_ty3') == 'T'){
        oSsgViewFloatBaner3Event.showSmallBanner();
    //방문한 기록이 없는 경우
    }else{
        oSsgViewFloatBaner3Event.startIntro();
    }
}

ssg.View.cmskyCard = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};

ssg.View.cmskyCard.prototype = $.extend({
    init: function () {
        this._assignElements();
        this._attachEventHandlers();
    },
    _assignElements: function () {
        this._welBtnArea = $('#_cmskyCard');
    },
    _attachEventHandlers: function () {
        this._welBtnArea.on('click', '.cmsky_card_btnview', $.proxy(this._onClickToggle, this));
    },
    _onClickToggle: function(e){
        e.preventDefault();
        var welBtn = $(e.currentTarget),
            welBtnArea = welBtn.closest('.cmsky_card');

        welBtnArea.toggleClass('on');
        if(welBtn.is('[aria-expanded]')){
            welBtn.attr('aria-expanded', (welBtn.attr('aria-expanded') == "false" ? true : false));
        }
    }
}, ssg.Event.emitter);

$(function(){
    //툴팁레이어
    $('.ssg-tooltip').tooltip();

    $("#skyScraperTopBtn").on('click', function(e){
        e.preventDefault();
        $('html, body').stop().animate({scrollTop: 0}, 100);
    });

    //광고 툴팁
    $('body').on('mouseenter focusin', '.tt_adinfo_n', function(e){
        var welTarget = $(e.currentTarget),
            welTooltipLayer = welTarget.find('.tt_adinfo_layer');

        welTooltipLayer.doTimeout('hover', 100, function(){
            welTarget.addClass('on').end().show();
        });
    }).on('mouseleave focusout', '.tt_adinfo_n', function(e){
        var welTarget = $(e.currentTarget),
            welTooltipLayer = welTarget.find('.tt_adinfo_layer');

        welTooltipLayer.doTimeout('hover', 100, function(){
            welTarget.removeClass('on').end().hide();
        });
    }).on('click', '.btn_tt_adinfo', function(e){ e.preventDefault(); });

    //우르르 툴팁
    $('body').on('mouseenter focusin', '.tt_urr_n', function(e){
        var welTarget = $(e.currentTarget),
            welTooltipLayer = welTarget.find('.tt_urrinfo_layer');

        welTooltipLayer.doTimeout('hover', 100, function(){
            welTarget.addClass('on').end().show();
        });
    }).on('mouseleave focusout', '.tt_urr_n', function(e){
        var welTarget = $(e.currentTarget),
            welTooltipLayer = welTarget.find('.tt_urrinfo_layer');

        welTooltipLayer.doTimeout('hover', 100, function(){
            welTarget.removeClass('on').end().hide();
        });
    }).on('click', '.btn_tt_urrinfo', function(e){ e.preventDefault(); });

    //매직픽업 툴팁
    var oMagicPickupTooltip = (function(){
        var welBody = $('body'),
            welMagicpickLayer = $('#toolTipMagic');

        var createTipLayer = function(welTooltip){
            welTargetLayer = welTooltip.next('.magicpick_tip_layer').html(),
            sContent = $('<div class="tl_magicpick_lst">').html(welTargetLayer),
            nPosition = welTooltip.offset();

            if(!welMagicpickLayer.length){
                welMagicpickLayer = $('<div id="toolTipMagic" class="tl_magicpick" />').appendTo('body');
            }

            welMagicpickLayer.css({
                'left': nPosition.left,
                'top': nPosition.top + 27
            }).html(sContent);
        };

        var showTipLayer = function(welTooltip){
            var welTargetLayer = welTooltip.next('.magicpick_tip_layer'),
                nWidth = welTargetLayer.width(),
                nMaxrWidth = welTargetLayer.css('maxWidth').replace('px','');

            if (nWidth >= nMaxrWidth){
                welMagicpickLayer.find('.tl_magicpick_lst').css({
                    'whiteSpace': 'normal',
                    'width': nMaxrWidth
                });
            }

            welMagicpickLayer.addClass('on');
        };

        var hideTipLayer = function(){
            welBody.find('.btn_magicpick').removeClass('on');
        };

        var onOutsideTooltipHide = function(){
            hideTipLayer();
            welMagicpickLayer.removeClass('on').off('clickoutside.magicpickup');
        };

        var initTooltip = function(){
            welBody.on('showMagicpickup', '.btn_magicpick', function(e){
                var welTarget = $(e.currentTarget);

                hideTipLayer();
                createTipLayer(welTarget);
                showTipLayer(welTarget);
                welTarget.addClass('on');
                welMagicpickLayer.on('clickoutside.magicpickup', onOutsideTooltipHide);
            });

            welBody.on('hideMagicpickup', '.btn_magicpick', function(e){
                onOutsideTooltipHide();
            });
        };

        return {
            init: initTooltip
        };
    }());

    oMagicPickupTooltip.init();

    // 338897 배포 후 삭제 (s)
    var oSsgViewCommTopBanner = function () {
        function init() {
        	var welTopBanner = $('#_commonTopBanner'),
	            welPreview = welTopBanner.find('.gnb_bnr_s'),
	            welRemove = welPreview.find('.gnb_btn_today'),
	            welDetail = welTopBanner.find('.gnb_bnr_b'),
	            welClose = welDetail.find('.gnb_bnr_clse'),
	            welVideoArea = $('#tvPromoMov'),
	            sVideoSrc = welTopBanner.data('videoSrc'),
	            bVideo = welVideoArea.length && (typeof sVideoSrc != 'undefined'),
	            htCookieData = {
	                key  : welTopBanner.data('cookie'),
	                value: new Date().getDate(),
	                opts : {expires: 1, path: '/'}
	            };

            if (parseInt($.cookie(htCookieData.key), 10) !== htCookieData.value){
                welTopBanner.show();
            }

            welRemove.on('click',function(){
                welPreview.slideUp();
                $.cookie(htCookieData.key, htCookieData.value, htCookieData.opts);
            });

            welPreview.on('click', 'a', function(){
                if(welDetail.length){
                    welPreview.slideUp(300);
                    welDetail.slideDown(800, 'easeOutBounce', function(){
                        if (bVideo) {
                            welVideoArea.attr('src', sVideoSrc);
                        }
                        welClose.focus();
                    });
                }
            });

            welClose.on('click', function(){
                if (bVideo) {
                    welVideoArea.attr('src', 'http://static.ssgcdn.com/ui/common/ssg_blank.html');
                }
                welDetail.slideUp(500, function(){
                    welPreview.slideDown(300);
                });
            });
        }

        return {
            init: init
        };
    }();

    //공통 상단 띠배너 
    if($('#_commonTopBanner').length>0 && !$('#_commonTopBanner').hasClass('_commonTopBannerV2')){
    	oSsgViewCommTopBanner.init();
    }
    // 338897 배포 후 삭제 (e)

    var oSsgViewIeTopBanner = function () {
        var welTopBanner = $('#_ieTopBanner'),
            welPreview = welTopBanner.find('.gnb_bnr_s'),
            welRemove = welPreview.find('.gnb_btn_today'),
            htCookieData = {
                key  : welTopBanner.data('cookie'),
                value: new Date().getDate(),
                opts : {expires: 1, path: '/', domain: 'ssg.com'}
            };

        function init() {
            if (parseInt($.cookie(htCookieData.key), 10) !== htCookieData.value){
                if(DUI.check.browser == 'ie6' || DUI.check.browser == 'ie7' || DUI.check.browser == 'ie8') {
                    welTopBanner.show();
                    if (DUI.check.os == 'xp'){
                        $('#checkXp').show();
                    }else{
                        $('#checkUpgrade').show();
                    }
                    if($('#_commonTopBanner').length){
                        $('#_commonTopBanner').hide();
                    }
                }else{
                    welTopBanner.hide();
                }
            }

            welRemove.on('click',function(){
                welPreview.slideUp();
                $.cookie(htCookieData.key, htCookieData.value, htCookieData.opts);
            });
        }

        return {
            init: init
        };
    }();

    // ie 업그레이드 캠페인 띠배너
    if($('#_ieTopBanner').length){
        oSsgViewIeTopBanner.init();
    }

    var oSsgViewFloatBaner3Event = new ssg.View.FloatBaner3();

    //$.fn.mousestop.defaults.delay = 300;
    $("#floatTy3 .bn_fix_s").on('mousestop', function(){
        oSsgViewFloatBaner3Event.showBigBanner();
    });

    // GNB TAB
    if($('#header').hasClass('common_header_wide')){
    	$('#gnbTab').on('mouseover focusin','a',function(){
    	    $(this).parent().addClass($(this).data('mall-name')+'_over');
    	}).on('mouseout focusout','a',function(){
    	    $(this).parent().removeClass($(this).data('mall-name')+'_over');
    	});
    }
    else{
	    $('#gnbTab').on('mouseover focusin','a',function(){
	        $(this).parent().addClass($(this).attr('class')+'_over');
	    }).on('mouseout focusout','a',function(){
	        $(this).parent().removeClass($(this).attr('class')+'_over');
	    });
    }

    if($('#_cmskyCard').length > 0) {
        var oSsgViewCmskyCard = new ssg.View.cmskyCard();
    }

    //skySsgtalk
    if($('#sky_ssgtalk').length > 0) {
		skySsgtalk.init();
	}

	if($('#utilCartPreview').length > 0) {
		utilCartPreviewLayer.init();
	}

	if($('#utilCartPreviewGo').length > 0) {
		utilCartPreviewGoLayer.init();
	}

	if($('#utilLangSelect').length > 0) {
		utilLangSelect.init();
	}

	var oSsgTrendRanking = function(){
		var oSlideKwd = null;
		var nRankList = 10;
		var welTrendRank = $('#cmjumpRank');
		var welTrendRankList  = welTrendRank.find('.cmjump_rank_lst');
		var welTrendRankLayer = $('.cmjump_lyr');
		var welTrendRankFrame = $('#ly_cmjump_ifr');

		function initialize(){
		    oSlideKwd = welTrendRankList.filter(function(){
		        return $(this).children('li').length > 1;
		    }).bxSlider({
		        mode: 'vertical',
		        auto: true,
		        pause: 3000,
		        pager: false,
		        controls: false,
		        onSlideBefore: function(){

		        },
		        onSlideAfter: function(){

		        }
		    });

		    welTrendRankList.on('click', '.cmjump_rank_link', function(e){
		    	e.preventDefault();

		    	var welTarget = $(this);
		    	var nRank = parseInt(welTarget.find('.cmjump_rank_num').text(), 10);
                var nTabPage = Math.floor(nRank / nRankList);
                var welIframeSrc = $(this).data('iframeSrc');

		    	if (welTrendRankLayer.is(':visible')) {
		    		return;
		    	}

                oSlideKwd.stopAuto();

	            welTrendRankFrame.prop('src', welIframeSrc).on('load', function(){
                    try{
                        var welFrameContents = welTrendRankFrame.contents();
                        var welFrameTab = welFrameContents.find('.cmjump_ranktab');
                        var welFrameTabPanel = welFrameContents.find('.cmjump_ranktab_panel').eq(nTabPage);
    
                        welFrameTab.find('li').eq(nTabPage).addClass('on').siblings().removeClass('on');
                        welFrameContents.find('.cmjump_ranktab_panel .cmjump_rank_item').eq(nRank - 1).addClass('on').siblings().removeClass('on');
                        welFrameTabPanel.show().siblings().hide();
                        welTrendRankLayer.show().one('clickoutside', function(){
                            closeTrendLayer();
                        });
                        updateBxIframe();
                        
                    }
                    catch(err){
                        welTrendRankLayer.show().one('clickoutside', function(){
                            closeTrendLayer();
                        });
                    }
	            });
            });

            // destroy and update bxSlider in iframe
            function updateBxIframe(){
                welTrendRankFrame.get(0).contentWindow.ssgTrendKwd.update();
            }

		    welTrendRankLayer.on('click', '.cmjump_lyr_close', function(e){
		    	e.preventDefault();
		    	closeTrendLayer();
		    });
		}

		function closeTrendLayer(){
			welTrendRankLayer.hide().off('clickoutside');
			oSlideKwd.startAuto();
		}

	    return {
	        init: initialize,
	    };
	}();

	if ($('#cmjumpRank').length) {
		oSsgTrendRanking.init();
	}
});