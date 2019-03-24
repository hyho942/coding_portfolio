var ssg = ssg || {};
ssg.View = ssg.View || {};
ssg.View.comm = ssg.View.comm || {};
ssg.View.comm.unit = function (htOptions) {
    $.extend(this, htOptions || {});
    this.init();
};

ssg.View.comm.unit.prototype = $.extend({
    init: function(){
        this._assignElements();
        this._attachEventHandlers();
    },
    _assignElements: function(){
        this._welBody = $('body');
    },
    _attachEventHandlers: function(){
        this._welBody.on('focusin mouseenter', '.thmb', $.proxy(this._onMouseenterItem, this));
        this._welBody.on('focusout mouseleave', '.thmb', $.proxy(this._onMouseleaveItem, this));
        this._welBody.on('focusin mouseenter', '.cunit_prod .lens', $.proxy(this._onMouseenterTooltipLens, this));
        this._welBody.on('focusout mouseleave', '.cunit_prod .lens', $.proxy(this._onMouseleaveTooltipLens, this));
        this._welBody.on('mouseenter', '.cunit_prod .cm_tx_lens', $.proxy(this._onMouseenterLensTextLayer, this));
        this._welBody.on('mouseleave', '.cunit_prod .cm_tx_lens', $.proxy(this._onMouseleaveLensTextLayer, this));
    },
    _onMouseenterTooltipLens: function(e){
        var welTarget = $(e.currentTarget),
            welLensTextLayer = welTarget.closest('.thmb').find('.cm_tx_lens');

        welTarget.addClass('on');
        this._showLens(welLensTextLayer);
    },
    _onMouseleaveTooltipLens: function(e){
        var welTarget = $(e.currentTarget),
            welLensTextLayer = welTarget.closest('.thmb').find('.cm_tx_lens');

        welTarget.removeClass('on');
        this._hideLens(welLensTextLayer);
    },
    _onMouseenterLensTextLayer: function(e){
        var welTarget = $(e.currentTarget);
        welTarget.closest('.thmb').find('.exp_area .lens').addClass('on');
        this._bLensOver = true;
    },
    _onMouseleaveLensTextLayer: function(e){
        var welTarget = $(e.currentTarget);
        welTarget.closest('.thmb').find('.exp_area .lens').removeClass('on');
        this._bLensOver = false;
        this._hideLens(welTarget);
    },
    _showLens: function(welLensTextLayer){
        welLensTextLayer.doTimeout('hover', 100, function(){
            welLensTextLayer.show();
        });
    },
    _hideLens: function(welLensTextLayer){
        var oSelf = this;
        welLensTextLayer.doTimeout('hover', 100, function(){
            if (oSelf._bLensOver) {
                welLensTextLayer.show();
            } else {
                welLensTextLayer.hide();
            }
        });
    },
    _onMouseenterItem: function(e){
        var welTarget = $(e.currentTarget),
            welOptions = welTarget.find('.exp_area .opt_bx'),
            sItemId = welTarget.data('itemunitThmbItemid');
        /*
        if (welOptions.length && welTarget.data('loaded') !== true) {
            this._getItemOptionData(sItemId).done(function(data){
                if (data) {
                    welOptions.html(data);
                } else {
                    welOptions.remove();
                }
                welTarget.data('loaded', true);
            }).fail(function(){
                welOptions.html('<span>데이터를 가져오지 못했습니다.</span>');
                welTarget.data('loaded', true);
            });
        }
        */
        welTarget.addClass('thmb_over');
    },
    _onMouseleaveItem: function(e){
        var welTarget = $(e.currentTarget);
        welTarget.removeClass('thmb_over');
    },
    _getItemOptionData: function(sItemId){
        var oSelf = this,
            oDfd = $.Deferred();

        this.emit('getItemOptionData', oDfd.resolve, oDfd.reject, sItemId);
        return oDfd.promise();
    }
}, ssg.Event.emitter);

function fn_LazyImage(){
    $('img.i1:not(.lazy_loaded):not(.lazy_fail), img.i2:not(.lazy_loaded):not(.lazy_fail)')
        .filter(':visible').lazyload({
            threshold: 200,
            effectTime: 300,
            load: function(){
                $(this).addClass('lazy_loaded');
            },
            error: function(){
                $(this).addClass('lazy_fail');
            }
        }).end().filter(':hidden').each(function(){
            var $this = $(this);
            $this.on("load", function() {
                $(this).addClass('lazy_loaded');
            }).one("error", function() {
                var noimg = $(this).attr("data-noimg");
                $(this).attr("src", noimg).addClass('lazy_fail');
            }).attr("src", $this.data("original"));
        });
}

$(function() {
    var welBody = $('body'),
        welMagicPickupTooltip = $('#magicPickupTt');
    //퀵뷰 레이어: 개발쪽에서 제어하는걸로
    /*var oSsgQuickViewLayerPopup = new ssg.View.layerPopup({
        bGlobal  : true,
        sTarget: '.cmqv_btn_view', // 레이어 팝업 보기 버튼
        sClose: '.cmqv_btn_close', // 레이어 팝업 닫기 버튼
        htDefault: {
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8
            },
            css: {
                backgroundColor: "none"
            },
            onOverlayClick: function() {
                oSsgQuickViewLayerPopup.closeLayer();
            } // overlay click 레이어 닫기
        },
        sNamespaceEmit: '.ssgQuickview'
    });

    oSsgQuickViewLayerPopup.on('beforeOpen.ssgQuickview', function(htData) {
        $.a11y.markActiveElement();

        if (htData && htData.replaceHref) {
            $('#ly_cmqv_ifr').prop('src', htData.replaceHref).one('load', function() {
                $.a11y.trap($(this).contents().find('body'), function() {
                    oSsgQuickViewLayerPopup.closeLayer();
                });
            });
        }
    });

    oSsgQuickViewLayerPopup.on('afterClose.ssgQuickview', function(htData) {
        $('#ly_cmqv_ifr').prop('src', '');

        if($.a11y.elFocusedBefore){
            $.a11y.elFocusedBefore.focus();
        }
    });*/

    //img lazy 로딩 적용
    $(window).on("lookup.lazyImage", fn_LazyImage).trigger("lookup.lazyImage");

    //img lazy 로딩 적용(visible)
    /*$('img.i1, img.i2')
        .filter(':visible').lazyload({
            threshold: 200,
            effectTime: 300
        }).end().filter(':hidden').each(function(){
            var $this = $(this);
            $this.attr("src", $this.data("original"));
        });*/

    //상품최적가 툴팁
    welBody.on('mouseenter focusin', '.price-tooltip:not(.tooltipstered)', function() {
        $(this).tooltipster({
            arrow: false,
            delay: 100,
            animationDuration: 150,
            trigger: 'custom',
            triggerOpen: {
                mouseenter: true,
                click: true
            },
            triggerClose: {
                mouseleave: true,
                scroll: true
            },
            interactive: true,
            contentAsHTML: true,
            side: ['bottom'],
            functionInit: function(instance, helper) {
                var content = $(helper.origin).siblings('.price-tooltip-layer').wrapAll("<div/>").parent().html();
                instance.content(content);
            },
            functionReady: function(instance, helper) {
                $(helper.origin).parent().find('.price-tooltip-layer').attr('aria-hidden', false);
                /*$.a11y.elFocusedBefore = helper.origin;
                $.a11y.trap(helper.tooltip, $.proxy(function() {
                }, this));*/
            },
            functionBefore: function(instance, helper) {
                $(helper.origin).parent().addClass('on');
            },
            functionAfter: function(instance, helper) {
                $(helper.origin).parent().removeClass('on');
                $(helper.origin).parent().find('.price-tooltip-layer').attr('aria-hidden', true);
            },
            functionPosition: function(instance, helper, data) {
                var welItem = $(helper.origin).parents('.cunit_price');

                if (!welItem.length) {
                    return;
                }

                data.coord.left = welItem.offset().left;
                data.coord.top -= 5;

                return data;
            }
        }).tooltipster('open');
    });

    welBody.on('focusin', '.price-tooltip.tooltipstered', function() {
        $(this).tooltipster('open');
    }).on('focusout', '.price-tooltip.tooltipstered', function() {
        $(this).tooltipster('close');
    });

    //매직픽업 툴팁
    welBody.on('click', '.btn_magicpick:not(.tooltipstered)', function() {
        $(this).tooltipster({
            arrow: false,
            trigger: 'click',
            interactive: true,
            contentCloning: true,
            contentAsHTML: true,
            side: ['bottom'],
            animationDuration: 150,
            delay: 100,
            functionBefore: function(instance, helper) {
                var $origin = $(helper.origin);

                if ($origin.data('loaded') !== true) {
                    $.ajax({
                        method: 'get',
                        url: $origin.data('api'),
                        data: {
                            itemId: $origin.data('itemId')
                        }
                    }).done(function(result) {
                        var sHtml = result.length ? $.map(result, function(n) {
                            return '<li>' + n + '</li>';
                        }).join('') : '<li>가능점포가 없습니다.</li>';


                        $origin.data('loaded-data', sHtml);
                        $origin.data('loaded', true);
                        instance.content().find('ul').html(sHtml);
                        $(window).trigger('resize');
                    });
                }else{
                    instance.content().find('ul').html($origin.data('loaded-data'));
                }
            },
            functionReady: function(instance, helper) {
                $(helper.origin).addClass('on');
                instance.content().attr('aria-hidden', false);
            },
            functionAfter: function(instance, helper) {
                $(helper.origin).removeClass('on');
                instance.content().find('ul').html('').attr('aria-hidden', true);
            },
            functionPosition: function(instance, helper, data) {
                var welItem = $(helper.origin).parents('li');
                var welCenterItem = $(helper.origin).closest('.cunit_tycenter');

                if (!welItem.length) {
                    return;
                }

                if(!welCenterItem.length){
                    data.coord.left = welItem.offset().left;
                }
                else{
                    data.coord.left = $(helper.origin).parent().offset().left;
                }

                data.coord.top -= 5;

                return data;
            }
        }).tooltipster('open');
    });

    var oSsgViewCommUnit = new ssg.View.comm.unit();
    /*
    oSsgViewCommUnit.on('getItemOptionData', function(resolve, reject, sItemId){
        $.ajax({
            url: '/comm/ajaxItemOptList.ssg',
            data: {
                itemId: sItemId
            },
            type: 'GET',
            success: function(result){
                if(result.length) {
                    var optionHtml = '',
                        resultLength = result.length;

                    for(var x = 0; x < resultLength - 1; x++) {
                        optionHtml += '<span>' + result[x] + '</span><em aria-hidden="true">&middot;</em>';
                    }
                    optionHtml += '<span>' + result[resultLength - 1] + '</span>';
                    resolve(optionHtml);
                } else {
                    resolve();
                }
            },
            error: function(err) {
                reject(err);
            }
        });
    });
    */
});