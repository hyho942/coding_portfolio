/*
* jQuery BlockUI; v20141123
* http://jquery.malsup.com/block/
* Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
*/
(function(){"use strict";function e(e){function o(o,i){var s,h,k=o==window,v=i&&void 0!==i.message?i.message:void 0;if(i=e.extend({},e.blockUI.defaults,i||{}),!i.ignoreIfBlocked||!e(o).data("blockUI.isBlocked")){if(i.overlayCSS=e.extend({},e.blockUI.defaults.overlayCSS,i.overlayCSS||{}),s=e.extend({},e.blockUI.defaults.css,i.css||{}),i.onOverlayClick&&(i.overlayCSS.cursor="pointer"),h=e.extend({},e.blockUI.defaults.themedCSS,i.themedCSS||{}),v=void 0===v?i.message:v,k&&b&&t(window,{fadeOut:0}),v&&"string"!=typeof v&&(v.parentNode||v.jquery)){var y=v.jquery?v[0]:v,m={};e(o).data("blockUI.history",m),m.el=y,m.parent=y.parentNode,m.display=y.style.display,m.position=y.style.position,m.parent&&m.parent.removeChild(y)}e(o).data("blockUI.onUnblock",i.onUnblock);var g,I,w,U,x=i.baseZ;g=r||i.forceIframe?e('<iframe class="blockUI" style="z-index:'+x++ +';display:none;border:none;margin:0;padding:0;position:absolute;width:100%;height:100%;top:0;left:0" src="'+i.iframeSrc+'"></iframe>'):e('<div class="blockUI" style="display:none"></div>'),I=i.theme?e('<div class="blockUI blockOverlay ui-widget-overlay" style="z-index:'+x++ +';display:none"></div>'):e('<div class="blockUI blockOverlay" style="z-index:'+x++ +';display:none;border:none;margin:0;padding:0;width:100%;height:100%;top:0;left:0"></div>'),i.theme&&k?(U='<div class="blockUI '+i.blockMsgClass+' blockPage ui-dialog ui-widget ui-corner-all" style="z-index:'+(x+10)+';display:none;position:fixed">',i.title&&(U+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(i.title||"&nbsp;")+"</div>"),U+='<div class="ui-widget-content ui-dialog-content"></div>',U+="</div>"):i.theme?(U='<div class="blockUI '+i.blockMsgClass+' blockElement ui-dialog ui-widget ui-corner-all" style="z-index:'+(x+10)+';display:none;position:absolute">',i.title&&(U+='<div class="ui-widget-header ui-dialog-titlebar ui-corner-all blockTitle">'+(i.title||"&nbsp;")+"</div>"),U+='<div class="ui-widget-content ui-dialog-content"></div>',U+="</div>"):U=k?'<div class="blockUI '+i.blockMsgClass+' blockPage" style="z-index:'+(x+10)+';display:none;position:fixed"></div>':'<div class="blockUI '+i.blockMsgClass+' blockElement" style="z-index:'+(x+10)+';display:none;position:absolute"></div>',w=e(U),v&&(i.theme?(w.css(h),w.addClass("ui-widget-content")):w.css(s)),i.theme||I.css(i.overlayCSS),I.css("position",k?"fixed":"absolute"),(r||i.forceIframe)&&g.css("opacity",0);var C=[g,I,w],S=k?e("body"):e(o);e.each(C,function(){this.appendTo(S)}),i.theme&&i.draggable&&e.fn.draggable&&w.draggable({handle:".ui-dialog-titlebar",cancel:"li"});var O=f&&(!e.support.boxModel||e("object,embed",k?null:o).length>0);if(u||O){if(k&&i.allowBodyStretch&&e.support.boxModel&&e("html,body").css("height","100%"),(u||!e.support.boxModel)&&!k)var E=d(o,"borderTopWidth"),T=d(o,"borderLeftWidth"),M=E?"(0 - "+E+")":0,B=T?"(0 - "+T+")":0;e.each(C,function(e,o){var t=o[0].style;if(t.position="absolute",2>e)k?t.setExpression("height","Math.max(document.body.scrollHeight, document.body.offsetHeight) - (jQuery.support.boxModel?0:"+i.quirksmodeOffsetHack+') + "px"'):t.setExpression("height",'this.parentNode.offsetHeight + "px"'),k?t.setExpression("width",'jQuery.support.boxModel && document.documentElement.clientWidth || document.body.clientWidth + "px"'):t.setExpression("width",'this.parentNode.offsetWidth + "px"'),B&&t.setExpression("left",B),M&&t.setExpression("top",M);else if(i.centerY)k&&t.setExpression("top",'(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"'),t.marginTop=0;else if(!i.centerY&&k){var n=i.css&&i.css.top?parseInt(i.css.top,10):0,s="((document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "+n+') + "px"';t.setExpression("top",s)}})}if(v&&(i.theme?w.find(".ui-widget-content").append(v):w.append(v),(v.jquery||v.nodeType)&&e(v).show()),(r||i.forceIframe)&&i.showOverlay&&g.show(),i.fadeIn){var j=i.onBlock?i.onBlock:c,H=i.showOverlay&&!v?j:c,z=v?j:c;i.showOverlay&&I._fadeIn(i.fadeIn,H),v&&w._fadeIn(i.fadeIn,z)}else i.showOverlay&&I.show(),v&&w.show(),i.onBlock&&i.onBlock.bind(w)();if(n(1,o,i),k?(b=w[0],p=e(i.focusableElements,b),i.focusInput&&setTimeout(l,20)):a(w[0],i.centerX,i.centerY),i.timeout){var W=setTimeout(function(){k?e.unblockUI(i):e(o).unblock(i)},i.timeout);e(o).data("blockUI.timeout",W)}}}function t(o,t){var s,l=o==window,a=e(o),d=a.data("blockUI.history"),c=a.data("blockUI.timeout");c&&(clearTimeout(c),a.removeData("blockUI.timeout")),t=e.extend({},e.blockUI.defaults,t||{}),n(0,o,t),null===t.onUnblock&&(t.onUnblock=a.data("blockUI.onUnblock"),a.removeData("blockUI.onUnblock"));var r;r=l?e("body").children().filter(".blockUI").add("body > .blockUI"):a.find(">.blockUI"),t.cursorReset&&(r.length>1&&(r[1].style.cursor=t.cursorReset),r.length>2&&(r[2].style.cursor=t.cursorReset)),l&&(b=p=null),t.fadeOut?(s=r.length,r.stop().fadeOut(t.fadeOut,function(){0===--s&&i(r,d,t,o)})):i(r,d,t,o)}function i(o,t,i,n){var s=e(n);if(!s.data("blockUI.isBlocked")){o.each(function(){this.parentNode&&this.parentNode.removeChild(this)}),t&&t.el&&(t.el.style.display=t.display,t.el.style.position=t.position,t.el.style.cursor="default",t.el.removeAttribute("tabindex"),t.parent&&t.parent.appendChild(t.el),s.removeData("blockUI.history")),s.data("blockUI.static")&&s.css("position","static"),"function"==typeof i.onUnblock&&i.onUnblock(n,i);var l=e(document.body),a=l.width(),d=l[0].style.width;l.width(a-1).width(a),l[0].style.width=d}}function n(o,t,i){var n=t==window,l=e(t);if((o||(!n||b)&&(n||l.data("blockUI.isBlocked")))&&(l.data("blockUI.isBlocked",o),n&&i.bindEvents&&(!o||i.showOverlay))){var a="mousedown mouseup keydown keypress keyup touchstart touchend touchmove";o?e(document).bind(a,i,s):e(document).unbind(a,s)}}function s(o){if("keydown"===o.type&&o.keyCode&&9==o.keyCode&&b&&o.data.constrainTabKey){var t=p,i=!o.shiftKey&&o.target===t[t.length-1],n=o.shiftKey&&o.target===t[0];if(i||n)return setTimeout(function(){l(n)},10),!1}var s=o.data,a=e(o.target);return a.hasClass("blockOverlay")&&s.onOverlayClick&&s.onOverlayClick(o),a.parents("div."+s.blockMsgClass).length>0?!0:0===a.parents().children().filter("div.blockUI").length}function l(e){if(p){var o=p[e===!0?p.length-1:0];o&&o.focus()}}function a(e,o,t){var i=e.parentNode,n=e.style,s=(i.offsetWidth-e.offsetWidth)/2-d(i,"borderLeftWidth"),l=(i.offsetHeight-e.offsetHeight)/2-d(i,"borderTopWidth");o&&(n.left=s>0?s+"px":"0"),t&&(n.top=l>0?l+"px":"0")}function d(o,t){return parseInt(e.css(o,t),10)||0}e.fn._fadeIn=e.fn.fadeIn;var c=e.noop||function(){},r=/MSIE/.test(navigator.userAgent),u=/MSIE 6.0/.test(navigator.userAgent)&&!/MSIE 8.0/.test(navigator.userAgent);document.documentMode||0;var f=e.isFunction(document.createElement("div").style.setExpression);e.blockUI=function(e){o(window,e)},e.unblockUI=function(e){t(window,e)},e.growlUI=function(o,t,i,n){var s=e('<div class="growlUI"></div>');o&&s.append("<h1>"+o+"</h1>"),t&&s.append("<h2>"+t+"</h2>"),void 0===i&&(i=3e3);var l=function(o){o=o||{},e.blockUI({message:s,fadeIn:o.fadeIn!==void 0?o.fadeIn:700,fadeOut:o.fadeOut!==void 0?o.fadeOut:1e3,timeout:o.timeout!==void 0?o.timeout:i,centerY:!1,showOverlay:!1,onUnblock:n,css:e.blockUI.defaults.growlCSS})};l(),s.css("opacity"),s.mouseover(function(){l({fadeIn:0,timeout:3e4});var o=e(".blockMsg");o.stop(),o.fadeTo(300,1)}).mouseout(function(){e(".blockMsg").fadeOut(1e3)})},e.fn.block=function(t){if(this[0]===window)return e.blockUI(t),this;var i=e.extend({},e.blockUI.defaults,t||{});return this.each(function(){var o=e(this);i.ignoreIfBlocked&&o.data("blockUI.isBlocked")||o.unblock({fadeOut:0})}),this.each(function(){"static"==e.css(this,"position")&&(this.style.position="relative",e(this).data("blockUI.static",!0)),this.style.zoom=1,o(this,t)})},e.fn.unblock=function(o){return this[0]===window?(e.unblockUI(o),this):this.each(function(){t(this,o)})},e.blockUI.version=2.7,e.blockUI.defaults={message:"<h1>Please wait...</h1>",title:null,draggable:!0,theme:!1,css:{padding:0,margin:0,width:"30%",top:"40%",left:"35%",textAlign:"center",color:"#000",border:"3px solid #aaa",backgroundColor:"#fff",cursor:"wait"},themedCSS:{width:"30%",top:"40%",left:"35%"},overlayCSS:{backgroundColor:"#000",opacity:.6,cursor:"wait"},cursorReset:"default",growlCSS:{width:"350px",top:"10px",left:"",right:"10px",border:"none",padding:"5px",opacity:.6,cursor:"default",color:"#fff",backgroundColor:"#000","-webkit-border-radius":"10px","-moz-border-radius":"10px","border-radius":"10px"},iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank",forceIframe:!1,baseZ:1e3,centerX:!0,centerY:!0,allowBodyStretch:!0,bindEvents:!0,constrainTabKey:!0,fadeIn:200,fadeOut:400,timeout:0,showOverlay:!0,focusInput:!0,focusableElements:":input:enabled:visible",onBlock:null,onUnblock:null,onOverlayClick:null,quirksmodeOffsetHack:4,blockMsgClass:"blockMsg",ignoreIfBlocked:!1};var b=null,p=[]}"function"==typeof define&&define.amd&&define.amd.jQuery?define(["jquery"],e):e(jQuery)})();
//smartresize
(function(a){var d=a.event,b,c;b=d.special.smartresize={setup:function(){a(this).on("resize",b.handler)},teardown:function(){a(this).off("resize",b.handler)},handler:function(a,f){var g=this,h=arguments,e=function(){a.type="smartresize";d.dispatch.apply(g,h)};c&&clearTimeout(c);f?e():c=setTimeout(e,b.threshold)},threshold:150}})(jQuery);

var ssg = ssg || {};
ssg.Event = ssg.Event || {};
ssg.Event.emitter={subscribers:{},on:function(s,t,i){this.subscribers[s]=this.subscribers[s]||[],this.subscribers[s].push({callback:t,context:i})},off:function(s,t,i){var r,c,e=this.subscribers[s];if(e)for(r=e.length-1;r>=0;){if(c=e[r],c.callback===t&&(!i||c.context===i)){e.splice(r,1);break}r--}},emit:function(s){var t,i=this.subscribers[s],r=0,c=Array.prototype.slice.call(arguments,1);if(i)for(;r<i.length;)t=i[r],t.callback.apply(t.context||this,c),r++}};

ssg.View = ssg.View || {};
ssg.View.layerPopup = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.layerPopup.prototype = $.extend({
    bGlobal: false,
    bEnableBlock: true,
    sTarget: '.btn_open',
    sClose: '.btn_close',
    currentTarget: null,
    htDefault: {},
    sNamespaceEmit: '.openLayer',
    init: function() {
        this._assignElements();
        this._attachEventHandlers();
        this._blockUIDefaultSet();
    },
    _assignElements: function () {
        this._welWin = $(window);
        this._welDoc = $(document.body);
        this._welWrap = $('#wrap');
        this._welTarget = $(this.sTarget);
    },
    _attachEventHandlers: function () {
        if(this.bGlobal){
            this._welDoc.on('click', this.sTarget, $.proxy(this._onClickOpenLayer, this));
        } else {
            this._welTarget.on('click', $.proxy(this._onClickOpenLayer, this));
        }
    },
    _blockUIDefaultSet: function(){
        if(typeof $.blockUI !== 'undefined') {
            $.blockUI.defaults.css = { backgroundColor: '#fff' };
            $.blockUI.defaults.overlayCSS = { cursor: 'default' };
            $.blockUI.defaults.baseZ = 3000;
            $.blockUI.defaults.fadeIn = 0;
            $.blockUI.defaults.fadeOut = 0;
            $.blockUI.defaults.constrainTabKey = false;
            $.blockUI.defaults.focusInput = false;
        }
    },
    _onClickOpenLayer: function(e){
        e.preventDefault();
        var welTarget = $(e.currentTarget),
            sTargetId = welTarget.data('layer-target') || welTarget.prop('hash');

        this.currentTarget = welTarget;
        this.showByTarget(sTargetId);
    },
    _openLayer: function() {
        var oSelf = this;

        if(this.currentTarget){
            this.emit('beforeOpen' + this.sNamespaceEmit, this.currentTarget.data());
        } else {
            this.emit('beforeOpen' + this.sNamespaceEmit);
        }

        if(this.bEnableBlock){
            $.blockUI($.extend(true, this.htDefault, {
                message: this._welContentLayer,
                css: this._setLayerPosition(),
                onBlock: this._onShowBlock(),
                onUnblock: function(){ oSelf._onHideBlock(); }
            }));
        }

        this._welContentLayer.attr({ 'role': 'dialog', 'tabIndex': 0 }).focus();
    },
    _onKeydownFocusCycle: function(e){
        var sKeyCode = e.sKeyCode || e.which,
            bTabKey = sKeyCode === 9,
            welFocusElem = null,
            nTotalFocusElem = 0,
            nCurrentFocus = null,
            nLastFocus = null;

        if (bTabKey) {
            welFocusElem = this._welContentLayer.parent().find('*').filter('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]');
            nCurrentFocus = welFocusElem.index($(':focus'));
            nTotalFocusElem = welFocusElem.length;

            if (nTotalFocusElem) {
                nLastFocus = nTotalFocusElem - 1;
                if (e.shiftKey) {
                    //Back tab
                    if (nCurrentFocus === 0) {
                        welFocusElem.get(nLastFocus).focus();
                        e.preventDefault();
                    }
                } else {
                    //Forward tab
                    if (nCurrentFocus === nLastFocus) {
                        this._welContentLayer.focus();
                        e.preventDefault();
                    }
                }
            } else {
                this._welContentLayer.focus();
                e.preventDefault();
            }
        }
    },
    _onKeydownCloseLayer: function(e){
        var sKeyCode = e.sKeyCode || e.which,
            bEscKey = sKeyCode === 27;

        if (bEscKey) {
            this.closeLayer();
        }
    },
    _onShowBlock: function(){
        this._welContentLayer.on('click.layerClose', this.sClose, $.proxy(this._onClickCloseLayer, this));
        this._welContentLayer.on('keydown.layerFocusCycle', $.proxy(this._onKeydownFocusCycle, this));
        this._welContentLayer.on('keydown.layerCloseEsc', $.proxy(this._onKeydownCloseLayer , this));
        this._welWin.on('smartresize.layerResize', $.proxy(this._onResizeLayerpopup, this));
        this._welWrap.attr('aria-hidden', 'true');
        this._welContentLayer.removeAttr('aria-hidden');

        if(this.currentTarget){
            this.emit('afterOpen' + this.sNamespaceEmit, this.currentTarget.data());
        } else {
            this.emit('afterOpen' + this.sNamespaceEmit);
        }
    },
    _onHideBlock: function(){
        this.emit('afterClose' + this.sNamespaceEmit);
        this._welContentLayer.off('click.layerClose');
        this._welContentLayer.off('keydown.layerFocusCycle');
        this._welDoc.off('keydown.layerCloseEsc');
        this._welWin.off('smartresize.layerResize');
        this._welWrap.removeAttr('aria-hidden');
        this._welContentLayer.attr('aria-hidden', 'true');
        if (this._bFixed) {
            this._welDoc.css('overflow', '');
        }
    },
    _onClickCloseLayer: function(e) {
        e.preventDefault();
        this.closeLayer();
    },
    _onResizeLayerpopup: function() {
        this._welContentLayer.parent('.blockMsg').css(this._setLayerPosition());
    },
    _setLayerPosition: function() {
        this._bFixed = this._welWin.height() > this._welContentLayer.height();

        if (this._bFixed) {
            this._welDoc.css('overflow', 'hidden');
        } else {
            this._welDoc.css('overflow', '');
        }

        return {
            'position': this._bFixed ? 'fixed' : 'absolute',
            'top'     : this._getPosTop() + 'px',
            'left'    : this._getPosLeft() + 'px'
        };
    },
    _getPosTop: function() {
        var nWinHeight = this._welWin.height(),
            nTargetHeight = this._welContentLayer.outerHeight();

        if (this._bFixed) {
            return Math.max(nWinHeight / 2 - nTargetHeight / 2, 0);
        }
        return this._welWin.scrollTop() + Math.max(nWinHeight - nTargetHeight, 0) / 2;
    },
    _getPosLeft: function() {
        return this._welWin.scrollLeft() + Math.max(this._welWin.width() - this._welContentLayer.width(), 0) / 2;
    },
    showByTarget: function(sTargetId){
        this._welContentLayer = $(sTargetId);

        if (this._welContentLayer.length) {
            this._openLayer();
        }
    },
    closeLayer: function() {
        this.emit('beforeClose' + this.sNamespaceEmit);

        if(this.bEnableBlock){
            $.unblockUI();
            if (!$.isEmptyObject(this.currentTarget)) {
                this.currentTarget.focus();
                this.currentTarget = null;
            }
        }
    },
    enable: function(){
        this.bEnableBlock = true;
    },
    disable: function(){
        this.bEnableBlock = false;
    }
}, ssg.Event.emitter);

$(function(){
    //only ssg :대체상품 레이어 내 가격정보 레이어 출력
    //emart,traders: using ui-base
    $('#lyChange')
        .off('mouseenter focusin', 'a.help_sale_info')
        .on('mouseenter focusin', 'a.help_sale_info', function(e) {
            e.preventDefault();

            var trigger = $(this);
            trigger.off('mouseleave focusout');
            trigger.on('mouseleave focusout',function(){
                trigger.removeClass('active');
                target.removeClass('active');
                $('#wrap > .price_date').remove();
            });

            var target = trigger.data('original-target') || trigger.nextAll('.price_date');

            if(target.length <= 0){
               return;
            }

            if(!trigger.is('.active')) {
                $('.help_sale_info').removeClass('active');
                $('.price_date.active').removeClass('active');
                $('#wrap > .price_date').remove();
                target.removeAttr('style');
                trigger.addClass('active');
                target.addClass('active');
                trigger.data('original-target', target);
                target.data('original-offset-top', target.data('original-offset-top') || target.offset().top);
                target.data('original-offset-left', target.data('original-offset-left') || target.offset().left);

                target.clone().css({
                    position : 'absolute',
                    top: target.offset().top,
                    left: target.offset().left,
                    marginLeft : 0,
                    zIndex: 3012
                }).appendTo('#wrap');
                target.hide();
            } else {
                trigger.removeClass('active');
                target.removeClass('active');
                $('#wrap > .price_date').remove();
            }
        });
});