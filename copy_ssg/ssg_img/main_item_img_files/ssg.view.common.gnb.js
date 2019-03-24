var ssg = ssg || {};
ssg.Model = ssg.Model || {};
ssg.View = ssg.View || {};
ssg.Event = ssg.Event || {};
ssg.Event.emitter={subscribers:{},on:function(e,t,n){this.subscribers[e]=this.subscribers[e]||[];this.subscribers[e].push({callback:t,context:n})},off:function(e,t,n){var r,i=this.subscribers[e],s;if(i){r=i.length-1;while(r>=0){s=i[r];if(s.callback===t&&(!n||s.context===n)){i.splice(r,1);break}r--}}},emit:function(e){var t=this.subscribers[e],n=0,r=Array.prototype.slice.call(arguments,1),i;if(t){while(n<t.length){i=t[n];i.callback.apply(i.context||this,r);n++}}}};

ssg.Model.mallCategory = function(htOptions){
    $.extend(this, htOptions || {});
};
ssg.Model.mallCategory.prototype = {
    sUrl: null,
    sMallCode: null,
    htData: {'L': []},
    getCategoryInfo: function(){
        var oSelf = this;

        if(this.sUrl === null){
            return;
        }

        return $.ajax({
            type: 'get',
            url: this.sUrl,
            async: false,
            dataType: 'script',
            cache: true
        }).then(function(){
            oSelf.htData = ctgAll;
            return ctgAll || [];
        });
    },
    getCtgDataByMallCode: function(sMallCode) {
        var aSubInfo = $.grep(this.htData, function(value, i) {
            return value.S === sMallCode;
        });
        return aSubInfo[0] || [];
    }
};

ssg.View.navigation = function(htOptions){
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.navigation.prototype = $.extend({
    htSsgData: null,
    init: function(){
        this._assignElements();
        this._attachEventHandlers();
        this._setDataSubMenu();
    },
    _assignElements: function(){
        this._welNavWrap = $('.common_nav_bar');
        this._welNavMain = this._welNavWrap.find('.common_nav_menu');
        this._welNavTopMenu = this._welNavMain.find('.nav_top_mn');
        this._welAsideBar = $('#_cmskyCard, #sky_scraper');
        $('#_tmplNavigation').template('tmplNavigation');
    },
    _attachEventHandlers: function(){
        this._welNavTopMenu.on('mouseenter', $.proxy(this._onMouseenterTopMenu, this));
        this._welNavTopMenu.on('mouseleave', $.proxy(this._onMouseleaveTopMenu, this));
        this._welNavTopMenu.on('click', '.nav_top_lnk', $.proxy(this._onClickNavTopLink, this));
    },
    _setDataSubMenu: function(){
        var oSelf = this;
        this._welNavTopMenu.each(function() {
            var welTarget = $(this);
            var aSubCtg = oSelf._getCtgDataBySubCode(welTarget.data('ctgCode'), oSelf.htSsgData.L.D) || {'N':'', 'L':[]};
            welTarget.data('ctgData', aSubCtg.L);
        });
    },
    _onMouseenterTopMenu: function(e){
        var welTarget = $(e.currentTarget);
        this._bMouseOver = true;
        this._showNavSubMenu(welTarget);
    },
    _onMouseleaveTopMenu: function(e){
        this._bMouseOver = false;
        this._hideNavSubMenu();
    },
    _onClickNavTopLink: function(e){
        e.preventDefault();
        var welTarget = $(e.currentTarget);
        var welTargetList = welTarget.parent();

        if (this._bMouseOver) {
            return;
        }

        if (welTargetList.hasClass('on')) {
            this._hideNavSubMenu();
            welTarget.attr('aria-expanded', 'false');
        } else {
            this._hideNavSubMenu();
            this._showNavSubMenu(welTargetList);
            welTarget.attr('aria-expanded', 'true');
            welTargetList.siblings().find('.nav_top_lnk').attr('aria-expanded', 'false');
        }
    },
    _onKeydownA11y: function(e){
        var sKeyCode = e.sKeyCode || e.which;
        var bTabKey = sKeyCode === 9 || sKeyCode === 'Tab';
        var bEscKey = sKeyCode === 27 || sKeyCode === 'Escape';

        if (bEscKey) {
            this._hideNavSubMenu();
        }
        if (bTabKey) {
            this._bMouseOver = false;
        }
    },
    _showNavSubMenu: function(welCurrent){
        var bAppend = (welCurrent.data('append') === 'complete') ? true : false;
        var aSubCtg = null;

        welCurrent.addClass('on').siblings().removeClass('on');
        welCurrent.find('.nav_sub_area').attr('aria-hidden', 'false').end().siblings().find('.nav_sub_area').attr('aria-hidden', 'true');
        welCurrent.one('clickoutside.topNav', $.proxy(this._hideNavSubMenu, this));
        welCurrent.on('keydown.a11y', $.proxy(this._onKeydownA11y, this));
        this._welAsideBar.addClass('off');

        if (bAppend) {
            return;
        }

        aSubCtg = welCurrent.data('ctgData');

        if (typeof aSubCtg !== 'undefined') {
            this._renderSubCategory(welCurrent, aSubCtg);
        }
    },
    _hideNavSubMenu: function(e){
        var welCurrent = this._welNavTopMenu.filter('.on');

        welCurrent.find('.nav_sub_area').attr('aria-hidden', 'true');
        welCurrent.removeClass('on').off('clickoutside.topNav keydown.a11y');
        this._welAsideBar.removeClass('off');
    },
    _getCtgDataBySubCode: function(sCode, aData) {
        var aSubCtgList = $.grep(aData, function(value, i) {
            return value.N.toLowerCase() === sCode.replace(/&/g, '&amp;');
        });
        return aSubCtgList[0] || null;
    },
    _renderSubCategory: function(welCurrent, aSubCtg){
        var welSubInner = welCurrent.find('.nav_sub_inner');
        var welSubColGroup = null;
        var nSubCtgSize = aSubCtg.length;
        var bSubBanner = (nSubCtgSize < 5) ? true : false;

        if (!nSubCtgSize) {
            welCurrent.data('append', 'complete');
            return;
        }

        $.tmpl('tmplNavigation', {
            data: aSubCtg,
            bSubBanner: bSubBanner
        }).appendTo(welSubInner);

        welCurrent.data('append', 'complete').removeData('ctgData');
        welSubColGroup = welSubInner.find('.nav_sub_colgroup');
        this._gridLayout(welSubColGroup);
    },
    _gridLayout: function(welSubColGroup){
        var welSubList =  welSubColGroup.find('.nav_sub_lst');
        var nSubCount = welSubList.length;
        var nListWidth = welSubColGroup.width() / welSubList.eq(0).width();
        var nMaxCol = 6;
        var nCol = Math.min(nMaxCol, Math.round(nListWidth)) || 1;
        var aColumns = null;
        var buildColumn = function(nCol){
            var cols = [];
            while (nCol--) {
                var wrap = $('<div class="nav_sub_col" />').css({'float':'left','height':'auto'});
                welSubColGroup.append(wrap);
                cols.push(wrap);
            }
            return cols;
        };
        var getShortest = function() {
            var shortest = aColumns[0];
            for (var i = aColumns.length; i--;) {
                if (aColumns[i].height() <= shortest.height()) {
                    shortest = aColumns[i];
                }
            }
            return shortest;
        };

        welSubColGroup.empty();

        if (nSubCount < nCol) {
            nCol = nSubCount;
        }

        aColumns = buildColumn(nCol);

        welSubList.each(function(){
            var welTarget = $(this);
            getShortest().append(welTarget);
        });

        welSubColGroup.css('width', 'auto').find('.nav_sub_col').removeAttr('style');
    }
}, ssg.Event.emitter);


ssg.View.totalCategory = function(htOptions){
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.totalCategory.prototype = $.extend({
    _nDefaultWidth: 0,
    _nMaxLevel: 5,
    _bMouseOver: false,
    _oCurrent: {
        elem: null,
        level: 0
    },
    init: function(){
        this._assignElements();
        this._attachEventHandlers();
    },
    _initVar: function(){
        if (!this._nDefaultWidth) {
           this._nDefaultWidth = this._welCtgMallList.width();
        }
    },
    _assignElements: function(){
        this._welCtgAll = $('.common_nav_all');
        this._welCtgLayer = this._welCtgAll.find('.ctg_total_wrap');
        this._welCtgTotal = this._welCtgLayer.find('.ctg_total');
        this._welCtgMallList = this._welCtgLayer.find('.ctg_mall_lst');
        this._welCtgOpenBtn = this._welCtgAll.find('.ctg_open_btn');
        this._welAsideBar = $('#_cmskyCard, #sky_scraper');
    },
    _attachEventHandlers: function(){
        this._welCtgOpenBtn.on('click', $.proxy(this._onClickToggleCategory, this));
        this._welCtgMallList.on('click', '.ctg_sub_lnk', $.proxy(this._onClickSubCategoryLink, this));
        this._welCtgMallList.menuAim({
            rowSelector: '.ctg_top_mn',
            activate: $.proxy(this._activeSubMenu, this),
            enter: $.proxy(this._enterSubMenu, this),
            exitMenu: function(){ return true; }
        }).find('.ctg_top_mn').off('click');
    },
    _activeSubMenu: function(elem){
        var welTarget = $(elem);
        this._showSubMenu(welTarget);
    },
    _enterSubMenu: function(){
        this._bMouseOver = true;
        this._welCtgMallList.find('.ctg_a11y_btn').hide();
    },
    _onClickToggleCategory: function(e){
        var welTarget = $(e.currentTarget);

        if (welTarget.hasClass('on')) {
            this._closeTotalCtgLayer();
        } else {
            this._openTotalCtgLayer();
        }
    },
    _onClickSubCategoryLink: function(e){
        e.preventDefault();
        var welTarget = $(e.currentTarget);
        var sMallCode = this._getCurrentMallCode();
        var sCtgCode = welTarget.data('ctgCode').toString();

        this.emit('clickCategoryLink', sMallCode, sCtgCode);
    },
    _openTotalCtgLayer: function(){
        this._welAsideBar.addClass('off');
        this._welCtgOpenBtn.addClass('on').attr('aria-expanded', 'true').find('.blind').text('통합 카테고리 닫기');
        this._welCtgLayer.show().attr('aria-hidden', 'false');
        this._initVar();
        this._welCtgAll.one('clickoutside.ctgAll', $.proxy(this._closeTotalCtgLayer, this));
        this._welCtgAll.on('keydown.a11y', $.proxy(this._onKeydownA11y, this));
        this._welCtgMallList.on('click.a11y', '.ctg_a11y_btn', $.proxy(this._onClickA11yBtn, this));
        this._welCtgMallList.on('focusin.a11y', '.ctg_top_mn, .ctg_sub_mn', $.proxy(this._onFocusinA11yList, this));
        this._showSubMenu(this._welCtgMallList.find('.ctg_top_mn').first());
    },
    _closeTotalCtgLayer: function(){
        this._welAsideBar.removeClass('off');
        this._welCtgOpenBtn.removeClass('on').attr('aria-expanded', 'false').find('.blind').text('통합 카테고리 보기');
        this._welCtgLayer.hide().attr('aria-hidden', 'true');
        this._welCtgAll.off('clickoutside.ctgAll keydown.a11y');
        this._welCtgMallList.off('click.a11y focusin.a11y');
        this._welCtgMallList.find('li.on').removeClass('on').find('>.ctg_a11y_btn').removeClass('on').attr('aria-expanded', 'false').hide();
    },
    _onClickA11yBtn: function(e){
        var welTarget = $(e.currentTarget);
        var welCurrnetMenu = welTarget.parent();

        if (welTarget.hasClass('on')) {
            this._hideSubMenu(welCurrnetMenu);
        } else {
            this._showSubMenu(welCurrnetMenu);
        }
    },
    _onFocusinA11yList: function(e){
        var welTarget = $(e.currentTarget);

        if (this._bMouseOver) {
            return;
        }
        welTarget.find('>.ctg_a11y_btn').show();
        welTarget.siblings(':not(.on)').find('>.ctg_a11y_btn').hide();
        welTarget.siblings().find('li:not(.on) .ctg_a11y_btn').hide();
    },
    _onKeydownA11y: function(e){
        var sKeyCode = e.sKeyCode || e.which;
        var bTabKey = sKeyCode === 9 || sKeyCode === 'Tab';
        var bEscKey = sKeyCode === 27 || sKeyCode === 'Escape';
        var aActiveMenu = null;
        var nActive = 0;
        var welCurrentMenu = null;

        if (bEscKey) {
            aActiveMenu = this._welCtgMallList.find('li.on');
            nActive = aActiveMenu.length;
            if (nActive) {
                welCurrentMenu = $(aActiveMenu.get(nActive - 1));
                this._hideSubMenu(welCurrentMenu);
                welCurrentMenu.find('li:not(.on) .ctg_a11y_btn').hide();
                welCurrentMenu.find('>a').focus();
            } else {
                this._closeTotalCtgLayer();
            }
        }

        if (bTabKey) {
            this._bMouseOver = false;
        }
    },
    _showSubMenu: function(welCurrent){
        var bAppend = (welCurrent.data('append') === 'complete') ? true : false;
        var nLevel = welCurrent.data('ctgLevel');
        var welSubColumn = welCurrent.closest('.ctg_sub_col');

        this._oCurrent.elem = welCurrent;
        this._oCurrent.level = nLevel;

        if (welSubColumn.length) {
            welSubColumn.siblings().find('li.on').removeClass('on');
        }

        welCurrent.addClass('on').siblings().removeClass('on').find('li.on').removeClass('on');
        welCurrent.find('>.ctg_a11y_btn').addClass('on').attr('aria-expanded', 'true');
        welCurrent.siblings().find('.ctg_a11y_btn').removeClass('on').attr('aria-expanded', 'false').hide();
        this._updateSubMenu();
    },
    _hideSubMenu: function(welCurrent){
        welCurrent.removeClass('on');
        welCurrent.find('.ctg_a11y_btn').removeClass('on').attr('aria-expanded', 'false');
        this._updateCtgLayerWidth();
    },
    _updateSubMenu: function(){
        var welCurrent = this._oCurrent.elem;
        var nLevel = this._oCurrent.level;
        var bAppend = (welCurrent.data('append') === 'complete') ? true : false;
        var aCtgData = null;

        if (bAppend) {
            this._updateCtgLayerWidth();
            return;
        }

        if (nLevel === 1) {
            this.emit('mallSubCategoryMenu', welCurrent.data('ctgCode').toString());
            return;
        }

        aCtgData = welCurrent.data('ctgData');

        if (typeof aCtgData !== 'undefined' && nLevel < this._nMaxLevel) {
            this._renderSubMenu(this._getCtgDataByType10(aCtgData));
        } else {
            this._updateCtgLayerWidth();
        }
    },
    _getTotalWidth: function(){
        var nWidth = 0;

        this._welCtgMallList.find('.ctg_sub_area:visible').each(function(i){
            var welTarget = $(this);

            if (welTarget.hasClass('ctg_sub_colgroup')) {
                var welSubCol = welTarget.find('>.ctg_sub_col');
                if (welSubCol.length > 1) {
                    var nColumnWidth = 0;
                    welSubCol.each(function(i){
                        nColumnWidth += parseInt($(this).outerWidth(), 10);
                    });
                    welTarget.width(nColumnWidth);
                }
            }

            if (welTarget.hasClass('ctg_sub_context')) {
                return;
            }
            nWidth += parseInt(welTarget.outerWidth(), 10);
        });
        return nWidth;
    },
    _updateCtgLayerWidth: function(){
        this._welCtgTotal.css('width', this._nDefaultWidth + this._getTotalWidth() + 'px');
    },
    _getCurrentMallCode: function(){
        return this._welCtgMallList.find('.ctg_top_mn.on').data('ctgCode').toString();
    },
    _getCtgDataByType10: function(aData){
        return $.grep(aData, function(value, i) {
            return (value.CTG_TYPE === '10');
        });
    },
    _chunkCtgData: function(aData, nChunk){
        var i = 0;
        var nDataSize = aData.length;
        var aTemp = [];

        for (i = 0; i < nDataSize; i += nChunk) {
            aTemp.push(aData.slice(i, i + nChunk));
        }
        return aTemp;
    },
    _attachEventSubMenu: function(welCurrent){
        welCurrent.find('.ctg_sub_lst').menuAim({
            rowSelector: '.ctg_sub_mn',
            activate: $.proxy(this._activeSubMenu, this),
            enter: $.proxy(this._enterSubMenu, this),
            exitMenu: function(){ return true; }
        }).find('.ctg_sub_mn').off('click');
    },
    _renderSubMenu: function(aCtgData){
        var welCurrent = this._oCurrent.elem;
        var nNextLevel = this._oCurrent.level + 1;
        var nCtgDataSize = aCtgData.length;
        var aSubMenuData = null;
        var oSubMenuTmpl = null;
        var sTmplId = '#_tmplTotalCategory';
        var nColumn = 18;
        var nMaxColumn = nColumn * 2;
        var bViewSub = (nNextLevel < this._nMaxLevel) ? true : false;
        var bContextMenu = (nNextLevel === this._nMaxLevel) ? true : false;

        if (!nCtgDataSize) {
            welCurrent.data('append', 'complete');
            return;
        }

        if (nCtgDataSize >= nColumn) {
            if (nCtgDataSize > nMaxColumn) {
                aCtgData.length = nMaxColumn;
            }
            sTmplId = '#_tmplTotalCategory-column';
            aSubMenuData = this._chunkCtgData(aCtgData, nColumn);
            bContextMenu = welCurrent.closest('.ctg_sub_colgroup').length ? true : false;
        } else {
            aSubMenuData = aCtgData;
        }

        oSubMenuTmpl = $(sTmplId).tmpl({
            data: aSubMenuData,
            nLevel: nNextLevel,
            contextMenu: bContextMenu
        });

        if (bViewSub) {
            oSubMenuTmpl.find('.ctg_sub_mn').each(function(i) {
                var welTarget = $(this);
                var aSubData = aCtgData[i].L;
                var hasSubMenu = aSubData.length;
                var sViewMenuBtn = '<button role="menuitem" aria-haspopup="true" aria-expanded="false" class="ctg_a11y_btn" type="button"><span class="blind">하위메뉴 (' + hasSubMenu + '개)</span></button>';
                if (hasSubMenu) {
                    welTarget.addClass('ctg_sub_child').data('ctgData', aSubData).append(sViewMenuBtn);
                }
            });
        }

        oSubMenuTmpl.appendTo(welCurrent);
        welCurrent.data('append', 'complete').removeData('ctgData').addClass(function(){ return bContextMenu ? 'ctg_context_mn' : ''; });
        this._updateCtgLayerWidth();
        this._attachEventSubMenu(welCurrent);
    },
    render: function(htMallData){
        var sMallCode = this._getCurrentMallCode();
        var aMallData = htMallData.L.D;

        //부츠(6003), 하우디(6100), TV쇼핑(6200), S.I빌리지(6300) json 구조가 다름
        if (sMallCode === '6003' || sMallCode === '6100' || sMallCode === '6200' || sMallCode === '6300') {
            aMallData = aMallData[0].L;
        }

        this._renderSubMenu(aMallData);
    }
}, ssg.Event.emitter);