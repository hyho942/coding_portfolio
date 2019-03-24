/**
 * ui.timerManager.js
 * @author 문준석
 * @fileOverview TimerManager 모션 스크립트
 * @requires
 *          - jquery 1.9.1
 * @since 2013.07.16
 * @copyright © 2013 s.com All right reserved
 * @comment 2013-08-14 defalut day 차감 계산됨.
 * @comment 2013-08-15 hour부터 리턴값이 필요할경우 notDay 옵션 추가
 */



/**
 * @class TimerManager
 */
(function($) {


    /**
     * 타이머를 관리하는 클래스 (countdown, countup)
     * @constructor
     * @param {string}   targetContainer 대상 컨테이너 (자식 노드가 있는 부모를 선택해야함)
     * @param {object}           options 초기화 추가옵션
     * @param {string}           options.mode 타이머 모드 설정 (countdown, countup)
     * @param {function|date}    options.startDate 시작시간(date). function은 date를 리턴해야 함
     * @param {function|date}    options.endDate 종료시간(초). function은 sec나 date를 리턴해야 함
     * @param {number}           options.interval 시간간격 (millisecond)
     * @param {function}         options.beforeInit 초기화전 수행
     * @param {function}         options.afterInit 초기화후 수행
     * @param {function}         options.callback 기본적으로 작동할 콜백함수 정의
     */
    var TimerManager = function(targetContainer, options) {
        'use strict';

        var target = $(targetContainer);

        options = jQuery.extend({
            mode: 'countdown',              // countdown, countup
            startDate: new Date(),          // Date
            endDate: new Date(),            // Date
            interval: 1000,                 // 1sec = 1000
            beforeInit: null,
            afterInit: null,
            callback: null,
			notDay: null
        }, options);
        var self = this;

        var startTime, endTime, currentTime;

        startTime = Math.floor(options.startDate / 1000);
        endTime = Math.floor(options.endDate / 1000);
        currentTime = startTime;

        // private methods
        var _init, _defaultAction, _auto;

        _init = function() {
            // trigger beforeInit
            if(options.beforeInit && options.beforeInit instanceof Function) {
                options.beforeInit.apply(self);
            }

            // init vars
            // 시작, 종료시간 세팅
            // 시간에는 Function, Date, Number(sec)에 따라 세팅한다
            if(options.startDate instanceof Function) {
                startTime = options.startDate();

                if(startTime instanceof Date) {
                    startTime = Math.floor(startTime / 1000);
                }
            } else if(options.startDate instanceof Date) {
                startTime = Math.floor(options.startDate / 1000);
            } else {
                startTime = options.startDate;
            }

            if(options.endDate instanceof Function) {
                endTime = options.endDate();

                if(endTime instanceof Date) {
                    endTime = Math.floor(endTime / 1000);
                }
            } else if(options.endDate instanceof Date) {
                endTime = Math.floor(options.endDate / 1000);
            } else {
                endTime = options.endDate;
            }

            // do default action onlyone
            _defaultAction(true);

            // start timer
            _auto.startInterval();

            // trigger afterInit
            if(options.afterInit && options.afterInit instanceof Function) {
                options.afterInit.apply(self);
            }
        };

        _defaultAction = function(isFirst) {
            var nextTime = currentTime;

            if(!isFirst) {
                nextTime = currentTime + (options.interval / 1000);
            }

            // endTime보다 높으면 멈춘다
            if(nextTime > endTime) {
                _auto.stopInterval();
                currentTime = endTime;
            } else {
                currentTime = nextTime;
            }

            // callback 함수 실행
            if(options.callback && options.callback instanceof Function) {
                options.callback.apply(self);
            }
        };

        _auto = {
            intervalObj: null,

            startInterval: function() {
                _auto.intervalObj = setInterval(function() {
                    // 기본 액션을 수행한다
                    _defaultAction();

                }, options.interval);
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
         * 숫자가 10보다 작으면 0을 붙여줌
         * @param {number} num
         * @returns {string}
         * @example 9인 경우 09로 변경해준다
         */
        this.zeroFillLeft = function (num) {
            return num < 10 ? '0' + num : num + '';
        };

        /**
         * 현재 타이머 시간을 가져온다
         * mode가 countdown인 경우 남은 시간만 나오며
         * countup인 경우는 시작시간 이후의 시간이 표시된다
         * day, hour, min, sec는 10보다 작으면 앞숫자에 0을 붙인다
         * @returns {time: '초시간', day:string, hour: string, min: string, sec: string}
         * @example {time: 348923, day:99, hour: 96, min: 55, sec: 23}
         */
        this.getCurrentTimerTime = function() {
            var resultTime;

            if(options.mode == 'countdown') {
                resultTime = endTime - currentTime;
            } else if(options.mode == 'countup') {
                resultTime = currentTime;
            }

            var resultMap = {
                time: resultTime,
				day: '00',
                hour: '00',
                min: '00',
                sec: '00'
            };

			resultMap.day = !options.notDay ? Math.floor(resultTime / 86400) : 0;
            resultMap.hour = Math.floor((resultTime - (resultMap.day * 86400)) / 3600);
            resultMap.min = Math.floor((resultTime - ((resultMap.day * 86400) + (resultMap.hour * 3600))) / 60);
            resultMap.sec = resultTime - (resultMap.day * 86400) - (resultMap.hour * 3600) - (resultMap.min * 60);

			resultMap.day = self.zeroFillLeft(Math.min(resultMap.day, 99));
            resultMap.hour = self.zeroFillLeft(Math.min(resultMap.hour, 99));
            resultMap.min = self.zeroFillLeft(resultMap.min);
            resultMap.sec = self.zeroFillLeft(resultMap.sec);

            return resultMap;
        };

        /**
         * 타이머를 시작한다
         */
        this.start = function() {
            _auto.startInterval();
        };

        /**
         * 타이머를 멈춘다
         */
        this.stop = function() {
            _auto.stopInterval();
        };

        /**
         * 대상 컨테이너를 리턴
         * @returns {jQuery(HTMLElement)}
         */
        this.getTargetContainer = function() {
            return target;
        };

        _init();
    };



    /**
     * TimerManager를 jQuery체인메소드에 등록하여 plug-in 형태로 사용
     * @param options
     * @returns {*}
     */
    $.fn.timerManager = function(options) {
        if (this.length <= 0) {
            return null;
        }

        var maps = [];

        this.each(function(i, v) {
            v.timerManager = new TimerManager(v, options);

            maps.push(v.timerManager);
        });

        this.timerManager = maps;

        return maps;
    };
})(jQuery);
