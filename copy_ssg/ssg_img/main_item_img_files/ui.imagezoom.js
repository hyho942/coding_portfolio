;(function ( $, window, document, undefined ) {
    "use strict";

    var pluginName = 'imgzoom',
        defaults = {
            position: 'right', //inner, top, bottom, left, right
            zoomWidth: 480,
            zoomHeight: 480,
            xOffset: 0,
            yOffset: 0,
            lens: true,
            magnify: 2
    };

    function Plugin ( element, options ) {
        this.elem = element;
        this.$elem = $(element);
        this.options = $.extend( {}, defaults, options );
        this._nImg = {w: 0, h: 0, top: 0, left: 0};
        this._nLens = {width: 0, height: 0};
        this._nScale = {x: 0, y: 0};
        this._bStart = false;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function() {
            this._assignElements();
            this._attachEventHandlers();
        },
        _initVars: function() {
            this._welZoomWrap = $('#zoomWrap');
            this._welZoomWindow = this._welZoomWrap.find('.zoomWindow');
            this._welZoomTarget = this._welZoomWrap.find('.zoomTarget');
            this._welZoomLens = this._welZoomWrap.find('.zoomLens');
        },
        _initializeImageLoad: function(url) {
            var loadImage = function(deferred) {
                var image = new Image();

                function unbindEvents() {
                    // Ensures the event callbacks only get called once.
                    image.onload = null;
                    image.onerror = null;
                    image.onabort = null;
                }
                function loaded() {
                    unbindEvents();
                    deferred.resolve(image);
                }
                function errored() {
                    unbindEvents();
                    deferred.reject(image);
                }

                image.onload = loaded;
                image.onerror = errored; // URL returns 404, etc
                image.onabort = errored; // IE may call this if user clicks "Stop"
                // Setting the src property begins loading the image.
                image.src = url;
            };
            return $.Deferred(loadImage).promise();
        },
        _createZoomElements: function() {
            var welLens = $('<div />').addClass('zoomLens'),
                welMoveArea = $('<div />').addClass('zoomTarget').append(welLens),
                welView = $('<div />').addClass((this.options.position === 'inner' && 'zoomWindow inner') || 'zoomWindow'),
                welZoomWrap = $('<div id="zoomWrap" />').addClass('zoomWrap').append(welView, welMoveArea);

            this._welBody.append(welZoomWrap);
        },
        _assignElements: function() {
            this._welWin = $(window);
            this._welBody = $('body');
            this._welTargetImg = this.$elem.find('img');
        },
        _attachEventHandlers: function(){
            this._welTargetImg.on('mousemove', $.proxy(this._onMousemoveTargetImage, this));
        },
        _onMousemoveTargetImage: function(){
            this._welTargetImg.off('mousemove', $.proxy(this._onMousemoveTargetImage, this));
            this._startZoom();
            this._welTargetImg.on('mouseenter', $.proxy(this._onMouseenterTargetImage, this));
        },
        _onMouseenterTargetImage: function() {
            if (!this._bStart) {
                this._startZoom();
            }
        },
        _startZoom: function(){
            var elemZoomWrap = $('#zoomWrap'),
                sTargetLargeImg = this._getZoomLargeImgSrc(this._welTargetImg),
                sActiveLargeImg = elemZoomWrap.find('.zoomWindow img').attr('src');

            this._bStart = true;

            if (!elemZoomWrap.length) {
                this._createZoomElements();
            }

            if (sTargetLargeImg === sActiveLargeImg) {
                this._updateZoomPosition();
                this._welZoomWrap.show();
                this._imgZoomAttachEvents();
            } else {
                this._imgZoomComponents(sTargetLargeImg);
            }
        },
        _endZoom: function() {
            this._imgZoomDetachEvents();
            this._welZoomWrap.hide();
            this._welZoomWindow.hide();
            this._welZoomLens.hide();
            this._bStart = false;
        },
        _imgZoomAttachEvents: function() {
            this._welZoomTarget.on('mousemove',  $.proxy(this._onMousemoveZoomTarget, this));
            this._welZoomTarget.on('mouseleave', $.proxy(this._onMouseleaveZoomTarget, this));
        },
        _imgZoomDetachEvents: function(){
            this._welZoomTarget.off('mousemove',  $.proxy(this._onMousemoveZoomTarget, this));
            this._welZoomTarget.off('mouseleave', $.proxy(this._onMouseleaveZoomTarget, this));
        },
        _onMouseleaveZoomTarget: function() {
            this._endZoom();
        },
        _onMousemoveZoomTarget: function(e) {
            var nMouseX = e.pageX,
                nMouseY = e.pageY;

            this._movingLensPosition(nMouseX, nMouseY);

            if (this._welZoomWindow.is(':hidden')) {
                this._welZoomWindow.show();
                if (this.options.lens) {
                    this._welZoomLens.show();
                }
            }
        },
        _getDimensionsTargetImg: function() {
            this._nImg.w = this._welTargetImg.width();
            this._nImg.h = this._welTargetImg.height();
            this._nImg.top = this._welTargetImg.offset().top;
            this._nImg.left = this._welTargetImg.offset().left;
            //this._nImg.ow = this._welTargetImg.outerWidth();
            //this._nImg.oh = this._welTargetImg.outerHeight();
            //this._nImg.bottom = this._nImg.h + this._nImg.top;
            //this._nImg.right = this._nImg.w + this._nImg.left;
        },
        _getZoomLargeImgSrc: function(welTarget){
            var nImgWidth = new RegExp('_' + this._welTargetImg.width(),'gi');
            return welTarget.attr('src').replace(nImgWidth, '_1200');
        },
        _zoomWindowPosition: function() {
            var oPosition = {
                'inner': {
                    top: 0, left: 0
                },
                'top': {
                    top: 0 - (this.options.zoomHeight - this.options.yOffset),
                    left: this.options.xOffset
                },
                'bottom': {
                    top: this.options.zoomHeight - this.options.yOffset,
                    left: this.options.xOffset
                },
                'left': {
                    top: this.options.yOffset,
                    left: 0 - (this.options.zoomWidth - this.options.xOffset)
                },
                'right': {
                    top: this.options.yOffset,
                    left: this._nImg.w + this.options.xOffset
                }
            };
            return ( oPosition[this.options.position] || oPosition['right'] );
        },
        _defaultZoomElementSet: function() {
            if (this.options.position === 'inner') {
                this.options.lens = false;
                this.options.zoomWidth = this._nImg.w;
                this.options.zoomHeight = this._nImg.h;
            }

            this._welZoomWindow.css({
                top : this._zoomWindowPosition().top + 'px',
                left: this._zoomWindowPosition().left + 'px'
            });

            this._welZoomTarget.css({
                width : this._nImg.w + 'px',
                height: this._nImg.h + 'px'
            });

            this._welZoomWrap.css({
                top   : this._nImg.top + 'px',
                left  : this._nImg.left + 'px',
                width : this._nImg.w + 'px',
                height: this._nImg.h + 'px'
            });
        },
        _updateZoomPosition: function() {
            this._getDimensionsTargetImg();
            this._defaultZoomElementSet();
        },
        _imgZoomComponents: function(sTargetLargeImg) {
            var oSelf = this;

            this._initVars();
            this._updateZoomPosition();

            this._initializeImageLoad(sTargetLargeImg).done(function(image) {
                oSelf._onZoomImageLoad(image);
            }).fail(function(image) {
                $(image).attr('src', oSelf._welTargetImg.attr('src'));
                oSelf._onZoomImageLoad(image);
            });
        },
        _onZoomImageLoad: function(image) {
            var welTarget = $(image),
                nMagnify = (image.width >= 1200) ? 1 : this.options.magnify;

            welTarget.css({
                width: image.width * nMagnify + 'px',
                height: image.height * nMagnify + 'px'
            });

            this._nScale.x = (welTarget.width() / this._nImg.w);
            this._nScale.y = (welTarget.height() / this._nImg.h);

            this._welZoomWindow.html(welTarget);
            this._setZoomWindowSize();
            this._welZoomWrap.show();
            this._imgZoomAttachEvents();
        },
        _getElementBorder: function(welTarget){
            return parseInt(welTarget.outerWidth() - welTarget.innerWidth(), 10);
        },
        _setZoomWindowSize: function(){
            var nBorder = this._getElementBorder(this._welZoomWindow),
                nWidth = this.options.zoomWidth - nBorder,
                nHeight = this.options.zoomHeight - nBorder;

            this._welZoomWindow.css({
                width : nWidth + 'px',
                height: nHeight + 'px'
            });

            this._setZoomLensSize(nWidth, nHeight);
        },
        _setZoomLensSize: function(nWidth, nHeight){
            this._nLens.width = this._getLensWidth(nWidth);
            this._nLens.height = this._getLensHeight(nHeight);

            this._welZoomLens.css({
                width: this._nLens.width + 'px',
                height: this._nLens.height + 'px'
            });
        },
        _getLensWidth: function(nWidth) {
            var nLensWidth = parseInt(nWidth / this._nScale.x, 10);
            return (nLensWidth > this._nImg.w) ? this._nImg.w : nLensWidth;
        },
        _getLensHeight: function(nHeight) {
            var nLensHeight = parseInt(nHeight / this._nScale.y, 10);
            return (nLensHeight > this._nImg.h) ? this._nImg.h : nLensHeight;
        },
        _lensLimitArea: function(nLensPos, nLimit) {
            if (nLensPos < 0) {
                return Math.max(nLensPos, 0);
            }
            return Math.min(nLensPos, nLimit - this._getElementBorder(this._welZoomLens));
        },
        _movingLensPosition: function(nMouseX, nMouseY) {
            var nLensX = nMouseX - this._nImg.left - (this._nLens.width / 2),
                nLensY = nMouseY - this._nImg.top - (this._nLens.height / 2),
                nLimitX = this._nImg.w - this._nLens.width,
                nLimitY = this._nImg.h - this._nLens.height;

            nLensX = this._lensLimitArea(nLensX, nLimitX);
            nLensY = this._lensLimitArea(nLensY, nLimitY);

            if (this.options.lens) {
                this._welZoomLens.css({ left: nLensX + 'px', top: nLensY + 'px' });
            }

            this._movingZoomImgPosition(nLensX, nLensY);
        },
        _movingZoomImgPosition: function(nLensX, nLensY) {
            var welZoomImg = this._welZoomWindow.find('img'),
                nImgX = parseInt( -(this._nScale.x * nLensX), 10 ),
                nImgY = parseInt( -(this._nScale.y * nLensY), 10),
                nLimitX = this._welZoomWindow.width() - welZoomImg.width(),
                nLimitY = this._welZoomWindow.height() - welZoomImg.height();

            nImgX = Math.max(nImgX, nLimitX);
            nImgY = Math.max(nImgY, nLimitY);

            welZoomImg.css({ position: 'relative', left: nImgX + 'px', top: nImgY + 'px' });
        }
    });

    $.fn[ pluginName ] = function ( options ) {
        return this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                    $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });
    };
})( jQuery, window, document );