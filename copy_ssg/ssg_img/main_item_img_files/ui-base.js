/**
 * ui-base.js
 * @author 한햇빛
 * @fileOverview UI 공통기능
 * @requires
 *          - jquery 1.9.1
 * @since 2013.07.18
 */



var UIBase = {
    uiClass: 'ssg',           // script default class    : 스크립트가 적용될 클래스 시작명
    uiWrappingId: 'wrap',    // all wrapping element id  : 컨텐츠 wrapping 엘리먼트의 ID
    uiActive: 'active',       // script active class     : active된 클래스명
    uiSplit: "_",             // script class split sign : 클래스명 구분자( ex : _ , - )
    uiControlArray: [],
    uiContent: 'content',     // script content class
    uiActionBase: ['toggle', 'tab', 'dim', 'tooltip'],
    uiDimLayer: {             // dimed 레이어 기본 설정옵션
        bgcolor: "#000",      // 배경색
        opacity: 0.6,         // 투명도
        dimZindex: 100,        // z-index
        dimLayerZindex: 1000,  // dimed위에 올라갈 실제 컨텐츠 div의 z-index
        orinHeight: 0
    },
    tooltipZ: 200,
    ie7Call: function(){return true;},
    targetLayer: '',

    /**
     * IE7에서는 a[href]에 #asdf와 같이 해쉬로만 작성하였더라도
     * ajax를 통해 레이어에 동적으로 데이터를 작성해 넣은 경우
     * location.href + #asdf 형태로 href attribute가 변경되는 이슈가 있어
     * 이와 함께 다른 여러이슈를 해결하기 위한 필터링 함수임
     * @param a <a> 태그
     * @private
     */
    _getFilteredHref: function(a) {
        var href = $(a).attr('href');

        if(!href) {
            href = '#';
        }

        if(href.indexOf('#') <= -1) {
            href = '#';
        }

        if(navigator.userAgent.indexOf('MSIE 7') > 0) {
            href = href.replace(location.href.replace(location.hash, ''), '');
        }

        return href;
    },

    /**
     * href hash 가 대상인 jQuery object를 가져옴
     * @param a <a> 태그
     * @private
     */
    _getTargetFromHref: function(a) {
        return $(this._getFilteredHref(a));
    },

    /**
    * ssg_toggle, tab, dim, tooltip 기능을 하는 이벤트 바인딩
    */
    _binding: function () {

        $('body')

        /**
        * 기본, 툴팁 토글 기능 (click)
        */
            .on('click', '.ssg_toggle, .ssg_tooltip', function (e) {
                var self = $(this);

                // hover action인 경우
                if (self.hasClass('ssg_hover')) {
                    if (UIBase._getFilteredHref(self).indexOf('#') != -1) {
                        e.preventDefault();
                    }
                }

                // click action인 경우
                else {
                    e.preventDefault();

                    var targetLayer = UIBase._getTargetFromHref(self);

                    if (targetLayer.length <= 0) {
                        return false;
                    }

                    if (self.hasClass(UIBase.uiActive)) {
                        self.removeClass(UIBase.uiActive);
                        targetLayer.removeClass(UIBase.uiActive);

                        if (self.is('.ssg_tooltip')) {
                            targetLayer.hide();
                        }

                        return;
                    } else {
                        self.addClass(UIBase.uiActive);
                        targetLayer.addClass(UIBase.uiActive);

                        if (self.is('.ssg_tooltip')) {
                            targetLayer.show();
                        }

                        targetLayer.find('.ssg-toggle-close, .tooltip_close').one('click', function (e) {
                            e.preventDefault();

                            self.removeClass(UIBase.uiActive);
                            targetLayer.removeClass(UIBase.uiActive);

                            if (self.is('.ssg_tooltip')) {
                                targetLayer.hide();
                            }
                        });
                    }

                    var globalToggleOff = function (e) {
                        var isPass = self.is(e.target) || self.has(e.target).length > 0;

                        if (isPass) {
                            return;
                        }

                        isPass = $(e.target).is(targetLayer)
                            || targetLayer.has(e.target).length > 0
                            || targetLayer.is(UIBase._getTargetFromHref(e.target));

                        if (!isPass) {
                            self.removeClass(UIBase.uiActive);
                            targetLayer.removeClass(UIBase.uiActive);

                            if (self.is('.ssg_tooltip')) {
                                targetLayer.hide();
                            }
                        } else {
                            $('body').one('click', globalToggleOff);
                        }
                    };

                    if (!self.is('.ssg_standalone')) {
                        $('body').one('click', globalToggleOff);
                    }
                }
            })

        /**
        * 기본, 툴팁 토글 기능 (hover)
        */
            .on('mouseenter focusin', '.ssg_toggle.ssg_hover, .ssg_tooltip.ssg_hover', function (e) {
                var self = $(this);
                var targetLayer = UIBase._getTargetFromHref(self);

                if (targetLayer.length <= 0) {
                    return false;
                }

                self.addClass(UIBase.uiActive)
                    .one('mouseleave focusout', function (e) {
                        var hideTargetLayer = function (e) {
                            self.removeClass(UIBase.uiActive);
                            targetLayer.removeClass(UIBase.uiActive);

                            if (self.is('.ssg_tooltip')) {
                                targetLayer.hide();
                            }
                        };

                        if (self.is('.ssg_standalone')) {
                            if (UIBase._getFilteredHref(self) == '#' + e.relatedTarget.id) {
                                targetLayer.one('mouseleave focusout', function (e) {
                                    hideTargetLayer();
                                });
                            } else {
                                hideTargetLayer();
                            }
                        } else {
                            hideTargetLayer();
                        }
                    });

                targetLayer.addClass(UIBase.uiActive);

                if (self.is('.ssg_tooltip')) {
                    targetLayer.show();
                }
            })

        /**
        * 탭 기능 (click)
        */
            .on('click', '.ssg_tab li:not(.no_data)', function (e) {
                var self = $(this);
                var target = UIBase._getFilteredHref(self.find('a'));

                if (self.hasClass('ssg_hover')) {
                    if (target.indexOf('#') != -1) {
                        e.preventDefault();
                    }

                    return;
                }

                if (target.indexOf('#') != -1 && target.indexOf('#') == 0) {
                    e.preventDefault();
                }

                self.addClass(UIBase.uiActive).siblings('li').removeClass(UIBase.uiActive);
                $(target).addClass(UIBase.uiActive).siblings('.' + UIBase.uiContent).removeClass(UIBase.uiActive);
            })

        /**
        * 탭 기능 (hover)
        */
            .on('mouseenter focusin', '.ssg_tab.ssg_hover li', function (e) {
                e.preventDefault();

                var self = $(this);
                var target = UIBase._getFilteredHref(self.find('a'));

                if (target.indexOf('#') != -1) {
                    $(this).addClass(UIBase.uiActive).siblings('li').removeClass(UIBase.uiActive);
                    $(target).addClass(UIBase.uiActive).siblings('.' + UIBase.uiContent).removeClass(UIBase.uiActive);
                }
            })

        /**
        * 딤드 레이어 기능 (click)
        */
            .on('click', '.ssg_dim', function (e) {
                e.preventDefault();

                var bgcolor = UIBase.uiDimLayer.bgcolor;
                var opacity = UIBase.uiDimLayer.opacity;
                var zindex = UIBase.uiDimLayer.dimZindex;
                var lzindex = UIBase.uiDimLayer.dimLayerZindex;
                var self = $(this);
                var target = UIBase._getFilteredHref(self);
                var targetLayer = $(target);
                var copyobj = targetLayer;

                targetLayer.remove();
                $('#' + UIBase.uiWrappingId).after(copyobj);
                var fixable = "absolute";

                if (self.is('ssg_fixable')) {
                    fixable = "fixed";
                }

                var h = targetLayer.height();
                var dh = $(document).height();
                UIBase.uiDimLayer.orinHeight = dh;
                if (dh <= h) {
                    $('#' + UIBase.uiWrappingId).css('height', h + 300);
                }
                UIBase.targetLayer = target;

                targetLayer.css({ 'display': 'block', 'z-index': lzindex });
                targetLayer.css('position', fixable);
                var w = $(window).width() / 2 - $(target).width() / 2;
                targetLayer.css('margin-left', w);
                //                targetLayer.toggleClass(UIBase.uiActive);
                //                self.toggleClass(UIBase.uiActive);

                // createElement가 동작속도가 더 빠름..
                // div 엘리먼트를 생성하여 UIBase.uiWrappingId 에 append 시킨다.
                var dim = document.createElement('div');

                dim.style.backgroundColor = bgcolor;
                dim.style.position = "absolute";
                dim.style.top = 0;
                dim.style.left = 0;
                dim.style.width = $(document).width() + 'px';
                dim.style.height = $(document).height() + 'px';
                dim.style.zIndex = zindex;
                dim.style.opacity = opacity;
                dim.style.filter = "alpha(opacity=" + (opacity * 100) + ")";
                dim.style.display = "block";
                dim.id = UIBase.uiClass + "-use-global-layer";

                $('#' + UIBase.uiWrappingId).after(dim);

                $(window).bind('resize', UIBase._resize);
                targetLayer.find('.ssg_close').focus();

                targetLayer.find('.ssg_close').on('click', function (e) {
                    e.preventDefault();
                    //dimmed close event
                    targetLayer.css({ 'display': 'none', 'z-index': 0 });
                    $(window).unbind('resize', UIBase._resize);
                    $('#' + UIBase.uiClass + '-use-global-layer').remove();
                    $('#' + UIBase.uiWrappingId).css('height', UIBase.uiDimLayer.orinHeight);
                    self.focus();
                });
            });
    },

    /* 문서 로드후 tooltip evt 바인딩 필요시
    * UIBase._ajaxTooltipClick(onSelector)
    ex ) UIBase._ajaxTooltipClick('.sosial_recomen')

    */
    _ajaxTooltipClick: function (dgateObj) {
        var dgate = $(dgateObj);
        var objSelector = '.' + UIBase.uiClass + UIBase.uiSplit + UIBase.uiActionBase[3];
        var bodyEl = (document.body) ? document.body : document.documentElement;

        dgate.on('click', objSelector, function (e) {
            e.preventDefault();
            var obj = this;
            var target = UIBase._getFilteredHref(obj);
            var openUp = $(this).hasClass(UIBase.uiActive);
            $('.tooltip_box').removeClass(UIBase.uiActive);
            var position = $(this).position();
            var closeBtn = dgate.find(target).find('.tooltip_close');

            function tmpBind() {
                $(obj).removeClass(UIBase.uiActive);
                $(target).removeClass(UIBase.uiActive);
                $(target).hide();
                $(bodyEl).unbind('click', tmpBind);
            }

            if (!openUp) {
                $(bodyEl).bind('click', tmpBind);
                $(obj).addClass(UIBase.uiActive);
                $(target).addClass(UIBase.uiActive);
                $(target).show();
            } else {
                $(bodyEl).unbind('click', tmpBind);
                $(obj).removeClass(UIBase.uiActive);
                $(target).removeClass(UIBase.uiActive);
                $(target).hide();
            }
            e.stopPropagation();
            $(closeBtn).unbind();
            $(closeBtn).click(function (e) {
                e.preventDefault();
                $(bodyEl).unbind('click', tmpBind);
                $(target).hide();
                $(target).removeClass(UIBase.uiActive);
                $(obj).removeClass(UIBase.uiActive);
            });
            $(target).click(function (e) {
                e.stopPropagation();
            });
        });
    },
    /**
    * 문서 로딩시 레이아웃에 자동으로 적용되어야 할 항목들
    * @private
    */

    _resize: function () {
        var w = $(window).width();
        var h = $(document).height();
        $('#' + UIBase.uiClass + '-use-global-layer').css({ 'width': w, 'height': h });
        w = $(window).width() / 2 - $(UIBase.targetLayer).width() / 2;
        $(UIBase.targetLayer).css('margin-left', w + 'px');
    },

    _init: function () {
        UIBase._binding();
    }
};

//common Location subDepth layer
var commonLocation = function(){
    var focusChk = 0;
    $('#container').on('mouseenter focusin', 'div#location div.lo_depth_01 > a.lo_menu.lo_arr' ,function(e) {
        e.preventDefault();
        var trigger = $(this);
        var TimerId;
        focusChk = 1;
        var thisSelector = 'div#location div.lo_depth_01 > a.lo_menu.lo_arr';
        var target = trigger.data('original-target') || trigger.next();

        trigger.off('mouseleave focusout');
        trigger.on('mouseleave focusout',function(){
            focusChk = 0;
            clearTimeout(TimerId);
            TimerId = window.setTimeout(function(){
                if(!focusChk){
                    trigger.removeClass('active');
                    target.removeClass('active');
                }
            },100);
        });

        $(thisSelector).removeClass('active');
        $('div#location div.lo_depth_01 > div.lo_depth_02').removeClass('active');

        target.removeAttr('style');
        trigger.addClass('active');
        target.addClass('active');
        target.find('a').bind({
            'mouseenter focusin': function(){
                focusChk = 1;
                $(this).addClass('lst_over');
            },
            'mouseleave focusout':function(){
                focusChk = 0;
                clearTimeout(TimerId);
                $(this).removeClass('lst_over');
                TimerId = window.setTimeout(function(){
                    if(!focusChk){
                        trigger.removeClass('active');
                        target.removeClass('active');
                    }
                },100);
            }
        });
    });
};



var commonCollection = function() {
    /* common collection */
    // collection common list box border UL구조용
    if (!$('#discount_collect').length) {
        $('#content').on('mouseenter mouseleave focusin','.list_style1 > li , .item_list > li', function(e){
            if(e.type == "mouseenter"){
                $(this).addClass('lst_over').siblings('li').removeClass('lst_over');
            }
            if(e.type == "mouseleave"){
                $(this).removeClass('lst_over');
            }
            if(e.type == "focusin"){
                $(this).addClass('lst_over').siblings('li').removeClass('lst_over');
            }
        });
    }

    // collection common list box border table구조용
    $('#content').on('mouseenter mouseleave focusin','div.table_itemlist > table > tbody > tr > td:not(.odd_item_view)', function(e){
        if(e.type == "mouseenter"){
            $(this).addClass('lst_over').siblings('td:not(.odd_item_view)').removeClass('lst_over');
        }
        if(e.type == "mouseleave"){
            $(this).removeClass('lst_over');
        }
        if(e.type == "focusin"){
            $(this).addClass('lst_over').siblings('td:not(.odd_item_view)').removeClass('lst_over');
        }
    });

    //common collection 가격정보 레이어 출력
    $('#content').on('mouseenter focusin', 'a.help_sale_info' ,function(e) {
        e.preventDefault();

        var trigger = $(this);
        var TimerId;
        var focusChk = 0;
        var target = trigger.data('original-target') || trigger.nextAll('.price_date');

        trigger.off('mouseleave focusout');
        trigger.on('mouseleave focusout',function(){
            focusChk = 0;
            clearTimeout(TimerId);
            TimerId = window.setTimeout(function(){
                if(!focusChk){
                    trigger.removeClass('active');
                    target.removeClass('active');
                    $('#wrap > .price_date').remove();
                }
            },100);

        });

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
                top: ($('#_commonTopBanner').is(':visible') && $('#_commonTopBanner .gnb_bnr_s').css('display') == 'block') ? target.offset().top-100 : target.offset().top,
                left: target.offset().left,
                marginLeft : 0,
                marginTop : - target.parent().find('.unit_price').height(),
                zIndex: 999
            }).appendTo('#wrap').bind({
                'mouseenter': function(){
                    focusChk = 1;
                },
                'mouseleave':function(){
                    focusChk = 0;
                    trigger.removeClass('active');
                    target.removeClass('active');
                    $('#wrap > .price_date').remove();
                }
            });
            target.hide();
        } else {
            trigger.removeClass('active');
            target.removeClass('active');
            $('#wrap > .price_date').remove();
        }
    });

    //상품 목록 테이블 컬렉션 다른 점포 보기
    var keywordBest = $('div.table_itemlist tr > td:not(:only-child)').parent();

    if(keywordBest.length > 0) {
        keywordBest.flip({
            triggerEvent: 'mouseover, focusin',
            autoMapping: true,
            //activeClass: 'lst_over',
            beforeInit: function() {
                var self = this;

                self.getTargetList().children().each(function(i, v) {
                    var currentElement = $(v);

                    // 다른점포 상품보기 버튼
                    currentElement.find('.show_all_store a').on('click', function(e) {
                        e.preventDefault();

                        var trigger = $(this);
                        if(trigger.is('.active')){
                            trigger.removeClass('active');
                        }else{
                            keywordBest.find('.show_all_store a').removeClass('active');
                            trigger.addClass('active');
                        }
                        currentElement.addClass('lst_over').siblings().removeClass('lst_over');

                        // 다른점포 상품 목록 보이기 시작
                        var allProductsTarget = self.getTargetList().next().find('.item_view_wrap');
                        allProductsTarget.show();

                        // 첫번째 요소에 포커싱
                        allProductsTarget.find('a').eq(0).focus();

                        // arrow 포지션 변경
                        allProductsTarget.find('.ico_arow').css({
                            left: currentElement.index() * currentElement.width() + currentElement.width() / 2 -  allProductsTarget.find('.ico_arow').width()/2
                        });

                        // close button
                        allProductsTarget.find('button.btn').on('click', function(e) {
                            e.preventDefault();
                            allProductsTarget.hide();
                        });

                    });
                });
            }
        });
    }
};
/**
 * placeholder 미지원브라우저 지원함수
 * @see http://github.com/NV/placeholder.js
 * Limitations : placeholder.js doesn't work with <input type='password'> in IE (at least in IE ≤ 9).
 */
$.fn.textPlaceholder = function () {
    return this.each(function(){
        var that = this;
        if (that.placeholder && 'placeholder' in document.createElement(that.tagName)) {
            return;
        }
        var placeholder = (that.getAttribute('placeholder')) ? that.getAttribute('placeholder') : $(that).attr('placeholder');
        var input = jQuery(that);

        if (that.value === '' || that.value == placeholder) {
            input.addClass('text-placeholder');
            that.value = placeholder;
        }
        input.focus(function(){
            if (input.hasClass('text-placeholder')) {
                this.value = '';
                input.removeClass('text-placeholder');
            }
        });
        input.blur(function(){
            if (this.value === '') {
                input.addClass('text-placeholder');
                this.value = placeholder;
            } else {
                input.removeClass('text-placeholder');
            }
        });

        if(that.form) {
            jQuery(that.form).submit(function(){
                if (input.hasClass('text-placeholder')) {
                    that.value = '';
                }
            });
        }
    });
};

/**
 * input type="password" placeholder를 지원하기 위한 용도
 */
var pwPlaceholder = function () {
    $('body').on('focusin', 'input.placeholder, textarea.placeholder', function (e) {

        $(this).removeClass('placeholder');

        $(this).on('change', function (e) {
            if (this.value === '') {
                $(this).addClass('placeholder');
            } else {
                $(this).removeClass('placeholder');
            }
        });
    });
};


/**
 * :hover 클래스 제거로 인해 script로 해당 기능을 구현
 */
var TabStyleToggle = function() {

    //css :hover 클래스 제거관련 추가코드
    $('body').on('mouseenter focusin', '.tab_style.large li', function(e) {
        $(this).addClass('lst_over').siblings('li').removeClass('lst_over');

        $(this).one('mouseleave focusout', function(e) {
            $(this).removeClass('lst_over');
        });
    });
    //css :hover 클래스 제거관련 추가코드
    $('body').on('mouseenter focusin', '.tab.large li', function(e) {
        $(this).addClass('lst_over').siblings('li').removeClass('lst_over');

        $(this).one('mouseleave focusout', function(e) {
            $(this).removeClass('lst_over');
        });
    });
};



/**
 * ui-base main
 */
(function () {

    // 공통 ui 액션 초기화
    UIBase._init();

    // GNBCategory 초기화
    if (typeof commonGnbTab != 'undefined') {
        commonGnbTab();
    }

    /*
    //lnb
    if(typeof $.fn.menu != 'undefined'){
        $('#aside').children('.category_aside').children('ul').add($('#aside').children('ul'))
            .menu({'activeClass' : 'active'});
    }
    */

    //footer
    if (typeof footerFamilySite != 'undefined') {
        footerFamilySite();
    }

    // 공통 collection
    commonCollection();

    //공통 location
    commonLocation();

    //scom 카테고리 네비게이션
    //commonCateNavi();

    pwPlaceholder();

    if (typeof gnbPleaseComment != 'undefined') {
        gnbPleaseComment();
    }

    //css :hover 클래스 제거관련 추가코드
    TabStyleToggle();

	/* VVIP LOGO */
	$.fn.vvipLogo = function( options ) {
		var elLogoWrap = $(this);
		var opts = $.extend({
			ty:'bg1',
			vvip:'name_o',
			msg1:'HAPPY',
			msg2:'BIRTHDAY',
			name:'SSG',
			link:'http://www.ssg.com'
		}, options );
		if(DUI.check.browser == 'ie7' || DUI.check.browser == 'ie8' || DUI.check.browser == 'ie9') {
			elLogoWrap.addClass('ie');
		}
		var elLogoHtml = [
		'<div class="vvip_logo">',
			'<a href="'+opts.link+'">',
				'<div class="'+opts.vvip+'">',
					'<span class="msg">'+opts.msg1+' <br />'+opts.msg2+'</span>',
					'<span class="name">'+opts.name+' 님</span>',
				'</div>',
				'<span class="'+opts.ty+'">&nbsp;</span>',
			'</a>',
		'</div>'
		].join('');
		elLogoWrap.html(elLogoHtml);
	};

    if($('input[placeholder]').length > 0){
        $('input[placeholder]').textPlaceholder();
    }
})();