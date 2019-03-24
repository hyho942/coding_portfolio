/**
 * ui.flip.js
 * @author 문준석
 * @fileOverview Flip 모션 스크립트
 * @requires
 *          - jquery 1.9.1
 * @since 2013.07.11
 * @copyright © 2013 s.com All right reserved
 */



/**
 * @class Flip
 */
(function($) {

    /**
     * Flip 객체
     * @constructor
     * @param {string}   targetContainer 대상 컨테이너 (자식 노드가 있는 부모를 선택해야함)
     * @param {object}   options 초기화 추가옵션
     * @param {string}   options.childrenSelector 자식 선택자
     * @param {string}   options.prevSelector 이전(-1)버튼 선택자
     * @param {string}   options.nextSelector 다음(+1)버튼 선택자
     * @param {string}   options.triggerEvent (require: automapping) 작동할 이벤트명, 다수 선택시 ','로 이음 (ex: click, mouseover)
     * @param {function} options.defaultCallback 기본적으로 작동할 콜백함수 정의
     * @param {function} options.customShowElement 요소를 표시하는 로직을 커스터마이징하는 함수
     * @param {number}   options.startElement 로드시 시작할 요소번호
     * @param {boolean}  options.autoMapping targetContainer의 자식들을 자동으로 선택하여 flip로직을 작동하게 함
     * @param {boolean}  options.autoStart 자동으로 이동하는 타이머 작동
     * @param {string}   options.autoDirection 자동이동시 움직일 방향 (prev|next)
     * @param {boolean}  options.autoHoverPause 자동이동시 마우스가 영역이 올라온 경우 잠시 멈추는 기능
     * @param {number}   options.autoDelayTime 자동이동시 다음 이동까지 대기하는 시간(millisecond), 1초는 1000
     * @param {function} options.beforeInit 초기화전 수행
     * @param {function} options.afterInit 초기화후 수행
     * @param {boolean}  options.isRandom 시작할 요소를 무작위로 정함. 이때 startElement는 무시됨
     * @param {string}   options.activeClass element가 활성화되었을때 주어질 css 클래스명 (기본: on), 주어지지 않는 경우 show/hide처리함
     * @param {boolean}  options.isPreventDefault click이벤트가 주어진 경우 event.preventDefault()를 통해 기본동작이 작동하지 않도록 할지 여부
     */
    var Flip = function(targetContainer, options) {
        'use strict';

        // Flip.defaultOptions을 먼저 참조함
        var defaultOptions = $.extend({
            childrenSelector: null,
            prevSelector: null,
            nextSelector: null,
            triggerEvent: 'click',
            defaultCallback: null,
            customShowElement: null,
            startElement: 1,
            autoMapping: false,
            autoStart: false,
            autoDirection: 'next',
            autoHoverPause: true,
            autoDelayTime: 4000,
            beforeInit: null,
            afterInit: null,
            isRandom: false,
            activeClass: 'on',
            isPreventDefault: false
        }, Flip.defaultOptions);

        // defaultOptions이 참조된 후 사용자 정의 옵션을 합침
        options = $.extend(defaultOptions, options);

        var targetList = $(targetContainer);
        var targetElements = $(targetList).children(options.childrenSelector);

        var self = this;

        var currentElement = options.startElement;
        var totalCount = targetElements.size();
        var triggeredEventName = 'definition';

        // private methods
        var _init, _auto;

        _init = function() {
            // trigger beforeInit
            if(options.beforeInit && options.beforeInit instanceof Function) {
                options.beforeInit.apply(self);
            }

            // add default css class
            if(options.activeClass) {
                if(self.getTargetElements().length <= 1) {
                    self.getTargetList().addClass('onlyone');
                }

                self.setCurrentElementNo(self.getTargetElements().index(self.getTargetElements().filter('.' + options.activeClass)) + 1);
            }

            // bind auto flip
            if(options.autoStart) {
                _auto.startInterval();
                _auto.bindEvents();
            }

            // bind click to prev/next selector
            var triggerEventName = $.map(options.triggerEvent.split(','), function(v) { return $.trim(v) + '.flip'; }).join(' ');

            if(options.prevSelector) {
                $(options.prevSelector).bind('click.flip', function(e) {
                    e.preventDefault();
                    self.prev();
                });
            }

            if(options.nextSelector) {
                $(options.nextSelector).bind('click.flip', function(e) {
                    e.preventDefault();
                    self.next();
                });
            }

            // auto map children
            if(options.autoMapping) {
                targetElements.each(function(i, v) {
                    $(this).bind(triggerEventName, function(e) {
                        if(options.isPreventDefault) {
                            e.preventDefault();
                        }

                        triggeredEventName = 'auto mapped event triggered';
                        self.showElement(i + 1);
                    });
                });
            }

            // show random
            if(options.isRandom) {
                self.setCurrentElementNo(Math.floor(Math.random() * totalCount) + 1);
            }

            // show currentElement
            self.showElement(self.getCurrentElementNo());

            // trigger afterInit
            if(options.afterInit && options.afterInit instanceof Function) {
                options.afterInit.apply(self);
            }
        };

        _auto = {
            intervalObj: null,
            mouseOverStatus: 'leave',

            bindEvents: function() {
                targetList
                    .bind('mouseenter.flip', _auto.enterEvent)
                    .bind('mouseleave.flip blur.flip', _auto.leaveEvent);

                targetElements.find('a')
                    .bind('focus.flip', _auto.enterEvent)
                    .bind('blur.flip', _auto.leaveEvent);
            },

            enterEvent: function(e) {
                if(_auto.mouseOverStatus == 'over') {
                    return;
                }

                _auto.mouseOverStatus = 'over';
                _auto.stopInterval();
            },

            leaveEvent: function(e) {
                if(_auto.mouseOverStatus == 'leave') {
                    return;
                }

                _auto.mouseOverStatus = 'leave';
                _auto.startInterval();
            },

            startInterval: function() {
                _auto.intervalObj = setInterval(function() {
                    if(options.autoDirection == 'prev') {
                        self.prev();
                    } else if(options.autoDirection == 'next') {
                        self.next();
                    }
                }, options.autoDelayTime);
            },

            stopInterval: function() {
                clearInterval(_auto.intervalObj);
            },

            resetInterval: function() {
                _auto.stopInterval();
                _auto.startInterval();
            }
        };

        /**
         * 대상 컨테이너를 리턴
         * @returns {jQuery(HTMLElement)}
         */
        this.getTargetList = function() {
            return targetList;
        };

        /**
         * 대상 컨테이너 자식요소들을 리턴
         * @returns {jQuery(HTMLElement)}
         */
        this.getTargetElements = function() {
            return targetElements;
        };

        /**
         * 현재 활성화할 요소 번호를 지정
         * @param {number} no
         */
        this.setCurrentElementNo = function(no) {
            currentElement = no || 1;
        };

        /**
         * 현재 활성화된 요소 번호를 가져옴 (1부터 시작)
         * @returns {number}
         */
        this.getCurrentElementNo = function() {
            return currentElement;
        };

        /**
         * 현재 발동한 이벤트의 이름을 리턴
         * @returns {string}
         */
        this.getTriggeredEventName = function() {
            return triggeredEventName;
        };

        /**
         * 추가옵션 object를 리턴
         * @returns {object}
         */
        this.getOptions = function() {
            return options;
        };

        /**
         * 다음 요소로 이동
         * @param {function} callback
         * @returns {boolean} false
         */
        this.prev = function (callback) {
            triggeredEventName = 'prev';

            var step = step || 1;
            var element;

            if (currentElement == 1) {
                element = totalCount;
            } else {
                element = currentElement - step;
            }

            self.showElement(element, callback);

            return false;
        };

        /**
         * 이전 요소로 이동
         * @param {function} callback
         * @returns {boolean} false
         */
        this.next = function (callback) {
            triggeredEventName = 'next';

            var step = step || 1;
            var element;

            if (currentElement == totalCount) {
                element = 1;
            } else {
                element = currentElement + step;
            }

            self.showElement(element, callback);

            return false;
        };

        /**
         * 지정한 번호의 요소를 show
         * @param {number}   element 나타낼 요소의 현재 번호
         * @param {function} callback
         * @returns {boolean} false
         */
        this.showElement = function (element, callback) {
            callback = callback || options.defaultCallback;

            // bug
            // if(options.autoStart && options.autoHoverPause && auto.mouseOverStatus == 'leave') {
            //   auto.resetInterval();
            // }

            if(options.customShowElement && options.customShowElement instanceof Function) {
                options.customShowElement.apply(self, [element || 1, callback]);
                currentElement = element || 1;

                return false;
            } else {
                currentElement = element || 1;
            }

            if(options.activeClass) {
                self.getTargetElements().eq(currentElement - 1).addClass(options.activeClass).siblings(options.childrenSelector).removeClass(options.activeClass);
            } else {
                self.getTargetElements().eq(currentElement - 1).show().siblings(options.childrenSelector).hide();
            }

            if(callback && callback instanceof Function) {
                callback.apply(self);
            }

            return false;
        };

        _init();

        Flip.action.push(this);
    };

    /**
     * Flip 객체 저장
     * @type {Array}
     */
    Flip.action = [];

    /**
     * Flip의 기본 options 설정을 변경함
     * @param options
     */
    Flip.setDefaultOptions = function(options) {
        Flip.defaultOptions = options;
    };

    /**
     * 전역 객체에 저장하여 액세스 가능케함
     */
    window.Flip = Flip;


    /**
     * Flip을 jQuery체인메소드에 등록하여 plug-in 형태로 사용
     * @param options
     * @returns {*}
     */
    $.fn.flip = function(options) {
        if (this.length <= 0) {
            return null;
        }

        var maps = [];

        this.each(function(i, v) {
            v.flip = new Flip(v, options);

            maps.push(v.flip);
        });

        this.flip = maps;

        return maps;
    };
})(jQuery);
