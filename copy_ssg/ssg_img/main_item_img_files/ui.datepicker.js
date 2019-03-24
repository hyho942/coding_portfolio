/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * ========================================================= */


/**
 * ui.datepicker.js
 * @author 한햇빛
 * @modify List
 * @fileOverview datepicker 플러그인
 * @requires
 *          - jquery 1.9.1
 * @since 2013.07.22
 * options add 2013.10.21
    @param {object}     options.targetElement 달력이 출력될 영역 지정 (jquery object)
    @param {boolean}    options.noHide 달력이 항상 노출되야할 경우 true
 */


(function( $ ) {

    var DPGlobal = {
        modes: [
            {
                clsName: 'days',
                navFnc: 'Month',
                navStep: 1
            },
            {
                clsName: 'months',
                navFnc: 'FullYear',
                navStep: 1
            },
            {
                clsName: 'years',
                navFnc: 'FullYear',
                navStep: 10
            }],
        dates:{
            days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
            daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
            months: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
            monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        },
        isLeapYear: function (year) {
            return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
        },
        getDaysInMonth: function (year, month) {
            return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },
        parseFormat: function(format){
            var separator = format.match(/[.\/\-\s].*?/),
                parts = format.split(/\W+/);
            if (!separator || !parts || parts.length === 0){
                throw new Error("Invalid date format.");
            }
            return {separator: separator, parts: parts};
        },
        parseDate: function(date, format) {
            var parts = date.split(format.separator),
                val;

            date = new Date();
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            if (parts.length === format.parts.length) {
                var year = date.getFullYear(), day = date.getDate(), month = date.getMonth();
                for (var i=0, cnt = format.parts.length; i < cnt; i++) {
                    val = parseInt(parts[i], 10)||1;
                    switch(format.parts[i]) {
                        case 'dd':
                        case 'd':
                            day = val;
                            date.setDate(val);
                            break;
                        case 'mm':
                        case 'm':
                            month = val - 1;
                            date.setMonth(val - 1);
                            break;
                        case 'yy':
                            year = 2000 + val;
                            date.setFullYear(2000 + val);
                            break;
                        case 'yyyy':
                            year = val;
                            date.setFullYear(val);
                            break;
                    }
                }
                date = new Date(year, month, day, 0 ,0 ,0);
            }
            return date;
        },
        formatDate: function(date, format){
            var val = {
                d: date.getDate(),
                m: date.getMonth() + 1,
                yy: date.getFullYear().toString().substring(2),
                yyyy: date.getFullYear()
            };
            val.dd = (val.d < 10 ? '0' : '') + val.d;
            val.mm = (val.m < 10 ? '0' : '') + val.m;
            date = [];
            for (var i=0, cnt = format.parts.length; i < cnt; i++) {
                date.push(val[format.parts[i]]);
            }
            return date.join(format.separator);
        },
        headTemplate: '<thead>'+
            '<tr>'+
            '<th class="prev_year"><a href="javascript:void(0)">이전년도<span class="ir prev_year"></span></a></th>' +
            '<th class="prev_month"><a href="javascript:void(0)">이전달<span class="ir prev_month"></span></a></th>' +
            '<th colspan="3" class="switch month this"></th>' +
            '<th class="next_month"><a href="javascript:void(0)">다음달<span class="ir next_month"></span></a></th>' +
            '<th class="next_year"><a href="javascript:void(0)">다음년도<span class="ir next_year"></span></a></th>' +
            '</tr>'+
            '</thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        captionTemplate: '<caption><span class="blind">날짜선택 달력레이어</span></caption>'
    };

    DPGlobal.template = '<div class="datepicker dropdown-menu" style="display:none;position:absolute;z-index:9999;" >' +
        '<div class="datepicker-days calendar small">'+
        '<table class=" table-condensed">'+
        DPGlobal.captionTemplate+
        DPGlobal.headTemplate+
        '<tbody></tbody>'+
        '</table>'+
        '</div>'+
        '<div class="datepicker-months">'+
        '<table class="table-condensed">'+
        DPGlobal.captionTemplate+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        '</table>'+
        '</div>'+
        '<div class="datepicker-years">'+
        '<table class="table-condensed">'+
        DPGlobal.captionTemplate+
        DPGlobal.headTemplate+
        DPGlobal.contTemplate+
        '</table>'+
        '</div>'+
        '</div>';



    // Picker object
    var Datepicker = function(element, options){
        this.element = $(element);

        this.todayCheck = options.todayCheck;
        this.targetElement = options.targetElement;
        this.noHide = options.noHide;
        /**
            getAgoDate() : 오늘날짜 yyyy-mm-dd 형식 반환함수
        */
        this.getAgoDate = function (yyyy, mm, dd) {
            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth();
            var day = today.getDate();

            var resultDate = new Date(yyyy + year, month + mm, day + dd);
            year = resultDate.getFullYear();
            month = resultDate.getMonth() + 1;
            day = resultDate.getDate();

            if (month < 10) {
                month = "0" + month;
            }

            if (day < 10) {
                day = "0" + day;
            }

            return year + "-" + month + "-" + day;
        };

        if (this.todayCheck == true) {
            this.selDay = this.getAgoDate(0, 0, 0);
        }
        this.format = DPGlobal.parseFormat('yyyy-mm-dd');
        this.picker = $(DPGlobal.template)
                            .appendTo((this.targetElement)? this.targetElement : this.element)
                            .on({
                                click: $.proxy(this.click, this)
                                //,
                                //mousedown: $.proxy(this.mousedown, this)
                            });
        if(this.noHide){
            this.picker.css({
                'display':'block',
                'position':'static'
            });
        }
        this.isInput = this.element.is('input');
        this.component = this.element.is('.datepicker_panel') ? this.element.find('.add-on') : false;

        if (this.isInput) {
            this.element.on({
                focus: $.proxy(this.show, this),
                keyup: $.proxy(this.update, this)
            });
        } else {
            if (this.component){
                this.component.on('click', $.proxy(this.show, this));
            } else {
                this.element.on('click', $.proxy(this.show, this));
            }
        }

        this.minViewMode = options.minViewMode||this.element.data('date-minviewmode')||0;
        if (typeof this.minViewMode === 'string') {
            switch (this.minViewMode) {
                case 'months':
                    this.minViewMode = 1;
                    break;
                case 'years':
                    this.minViewMode = 2;
                    break;
                default:
                    this.minViewMode = 0;
                    break;
            }
        }
        this.viewMode = options.viewMode||this.element.data('date-viewmode')||0;
        if (typeof this.viewMode === 'string') {
            switch (this.viewMode) {
                case 'months':
                    this.viewMode = 1;
                    break;
                case 'years':
                    this.viewMode = 2;
                    break;
                default:
                    this.viewMode = 0;
                    break;
            }
        }
        this.startViewMode = this.viewMode;
        this.weekStart = options.weekStart||this.element.data('date-weekstart')||0;
        this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
        this.onRender = options.onRender;
        this.fillDow();
        this.fillMonths();
        this.update();
        this.showMode();
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        show: function (e) {
            this.picker.show();
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
            this.place();
            $(this.picker).find('th:eq(0) > a').focus();

            //this.picker.focus();
            $(window).on('resize', $.proxy(this.place, this));
            if (e ) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (!this.isInput) {
            }
            var that = this;
            $(document).on('mousedown', function(ev){
                if ($(ev.target).closest('.datepicker').length == 0) {
                    if(!this.noHide){
                        that.hide();
                    }
                }
            });
            this.element.trigger({
                type: 'show',
                date: this.date
            });
        },
        hide: function(){
            this.picker.hide();
            $(window).off('resize', this.place);
            this.viewMode = this.startViewMode;
            this.showMode();
            if (!this.isInput) {
                $(document).off('mousedown', this.hide);
            }
            //this.set();
            this.element.trigger({
                type: 'hide',
                date: this.date
            });
        },

        set: function() {
            var formated = DPGlobal.formatDate(this.date, this.format);
            if (!this.isInput) {
                if (this.component) {
                    this.element.find('input').prop('value', formated);
                    //this.element.find('input').focus();
                }
                this.element.data('date', formated);
                //this.element.focus();
            } else {
                this.element.prop('value', formated);
               // this.element.focus();
            }
        },

        setValue: function(newDate) {
            if (typeof newDate === 'string') {
                this.date = DPGlobal.parseDate(newDate, this.format);
            } else {
                this.date = new Date(newDate);
            }
            this.set();
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill();
        },

        place: function(){
            var offset = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({
                /*
                top: offset.top - this.height * 5 - 3,
                left: offset.left - this.width/2
                */
            });
        },

        update: function(newDate){
            this.date = DPGlobal.parseDate(
                typeof newDate === 'string' ? newDate : (this.isInput ? this.element.prop('value') : this.element.data('date')),
                this.format
            );
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
            this.fill();
        },

        fillDow: function(){
            var dowCnt = this.weekStart;
            var html = '<tr>';
            while (dowCnt < this.weekStart + 7) {
                html += '<th class="dow">'+DPGlobal.dates.daysMin[(dowCnt++)%7]+'</th>';
            }
            html += '</tr>';
            this.picker.find('.datepicker-days thead').append(html);
        },

        fillMonths: function(){
            var html = '';
            var i = 0;
            while (i < 12) {
                html += '<span class="month">'+DPGlobal.dates.monthsShort[i++]+'</span>';
            }
            this.picker.find('.datepicker-months td').append(html);
        },

        fill: function() {
            var d = new Date(this.viewDate),
                year = d.getFullYear(),
                month = d.getMonth(),
                currentDate = this.date.valueOf();

            var daySplit, selectDay;
            if (this.selDay != undefined) {
                daySplit = this.selDay.split('-');
                if (daySplit.length == 3) {
                    if (year == daySplit[0]) {
                        selectDay = new Date(daySplit[0], daySplit[1] - 1, 28, 0, 0, 0, 0);
                        selectDay = selectDay.valueOf();
                    }
                }
            }


            this.picker.find('.datepicker-days th:eq(2)')
                        .text(year + '.' + DPGlobal.dates.months[month]);
            var prevMonth = new Date(year, month-1, 28,0,0,0,0),
                day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());


            prevMonth.setDate(day);
            prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7)%7);
            var nextMonth = new Date(prevMonth);
            nextMonth.setDate(nextMonth.getDate() + 42);
            nextMonth = nextMonth.valueOf();
            var html = [];
            var clsName,
                prevY,
                prevM;

            while(prevMonth.valueOf() < nextMonth) {
                if (prevMonth.getDay() === this.weekStart) {
                    html.push('<tr>');
                }
                clsName = this.onRender(prevMonth);
                prevY = prevMonth.getFullYear();
                prevM = prevMonth.getMonth();
                var style = "block";
                if ((prevM < month &&  prevY === year) ||  prevY < year) {
                    clsName += ' old';
                    style = "none";
                }
                else if ((prevM > month && prevY === year) || prevY > year) {
                    clsName += ' new';
                    style = "none";
                }
                if (prevMonth.valueOf() === currentDate) {
                    clsName += ' active';
                }

                if (style == "block") {
                    if (selectDay != undefined && daySplit[2] != undefined) {
                        if (daySplit[2] == prevMonth.getDate() && daySplit[1] == prevMonth.getMonth()+1 && daySplit[0] == prevMonth.getFullYear()) {
                            html.push('<td class="day' + clsName + '"><a href="javascript:void(0);"><strong title="오늘">' + prevMonth.getDate() + '</strong></a></td>');
                        } else {
                            html.push('<td class="day' + clsName + '"><a href="javascript:void(0);">' + prevMonth.getDate() + '</a></td>');
                        }
                    } else {
                        html.push('<td class="day' + clsName + '"><a href="javascript:void(0);">' + prevMonth.getDate() + '</a></td>');
                    }
                } else {
                    html.push('<td class="day"></td>');
                }
                if (prevMonth.getDay() === this.weekEnd) {
                    html.push('</tr>');
                }
                prevMonth.setDate(prevMonth.getDate() + 1);

            }
            this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
            var currentYear = this.date.getFullYear();

            var months = this.picker.find('.datepicker-months')
                        .find('th:eq(2)')
                            .text(year)
                            .end()
                        .find('span').removeClass('active');
            if (currentYear === year) {
                months.eq(this.date.getMonth()).addClass('active');
            }

            html = '';
            year = parseInt(year / 10, 10) * 10;
            var yearCont = this.picker.find('.datepicker-years')
                                .find('th:eq(2)')
                                    .text(year + '-' + (year + 9))
                                    .end()
                                .find('td');
            year -= 1;
            for (var i = -1; i < 11; i++) {
                html += '<span class="year'+(i === -1 || i === 10 ? ' old' : '')+(currentYear === year ? ' active' : '')+'">'+year+'</span>';
                year += 1;
            }
            yearCont.html(html);
            var ii = 0;
            this.picker.find('.datepicker-days tbody tr:eq(0) td').each(function () {
                var val = $(this).text();
                if (val == "") {
                    ii++;
                }
            });
            if (ii == 7) {
                this.picker.find('.datepicker-days tbody tr:eq(0)').remove();
            }

            var cnt = this.picker.find('.datepicker-days tbody tr').length;
            if (cnt >= 6 && this.picker.find('.datepicker-days tbody tr:eq(5) td').text() =="" ) {
                this.picker.find('.datepicker-days tbody tr:eq(5) td').remove();

            }



            ii = 0;
            this.picker.find('.datepicker-days tbody tr td').each(function () {
                if (ii % 7 == 0) {
                    $(this).addClass('sunday');
                }
                if (ii % 7 == 6) {
                    $(this).addClass('saturday');
                }
                ii++;
            });
        },

        click: function(e) {
            e.stopPropagation();
            e.preventDefault();
            var target = $(e.target).closest('span, td, th');
            var step;

            if (target.length === 1) {
                switch(target[0].nodeName.toLowerCase()) {
                    case 'th':
                    case 'span':
                        switch(target[0].className) {
                            case 'switch':
                                this.showMode(1);
                                break;
                            case 'prev_month':
                            case 'next_month':
                                this.viewDate['set'+DPGlobal.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get'+DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                                    DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev_month' ? -1 : 1)
                                );
                                this.fill();
                                //this.set();
                                break;
                            case 'prev_year':
                            case 'next_year':
                                step = DPGlobal.modes[this.viewMode].navStep * 12;
                                this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                                    step * (target[0].className === 'prev_year' ? -1 : 1)
                                );
                                this.fill();
                                //this.set();
                                break;
                            case 'ir prev_month':
                            case 'ir next_month':
                                this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                                    DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'ir prev_month' ? -1 : 1)
                                );
                                this.fill();
                                //this.set();
                                break;
                            case 'ir prev_year':
                            case 'ir next_year':
                                step = DPGlobal.modes[this.viewMode].navStep * 12;
                                this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(
                                    this.viewDate,
                                    this.viewDate['get' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) +
                                    step * (target[0].className === 'ir prev_year' ? -1 : 1)
                                );
                                this.fill();
                                //this.set();
                                break;

                        }
                        break;
                        /*
                        case 'span':
                        if (target.is('.month')) {
                            var month = target.parent().find('span').index(target);
                            this.viewDate.setMonth(month);
                        } else {
                            var year = parseInt(target.text(), 10)||0;
                            this.viewDate.setFullYear(year);
                        }
                        if (this.viewMode !== 0) {
                            this.date = new Date(this.viewDate);
                            this.element.trigger({
                                type: 'changeDate',
                                date: this.date,
                                viewMode: DPGlobal.modes[this.viewMode].clsName
                            });
                        }
                        this.showMode(-1);
                        this.fill();
                        this.set();
                        break;
                        */
                    case 'td':
                        if (target.is('.day') && !target.is('.disabled')) {
                            var day = parseInt(target.text(), 10)||1;
                            var month = this.viewDate.getMonth();
                            if (target.is('.old')) {
                                month -= 1;
                            } else if (target.is('.new')) {
                                month += 1;
                            }
                            /*
                            else if (target.is('.selday')) {
                                return false;
                                break;
                            }
                            */
                            else {
                                if(!this.noHide){
                                    this.picker.hide();
                                    $(this.component).focus();
                                }
                            }


                                var year = this.viewDate.getFullYear();
                                this.date = new Date(year, month, day, 0, 0, 0, 0);
                                this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
                                this.fill();
                                this.set();
                                this.element.trigger({
                                    type: 'changeDate',
                                    date: this.date,
                                    viewMode: DPGlobal.modes[this.viewMode].clsName
                                });
                            }
                        break;
                }
            }
        },

        mousedown: function(e){
            e.stopPropagation();
            e.preventDefault();
        },

        showMode: function(dir) {
            if (dir) {
                this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
            }
            this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
        }
    };

    $.fn.datepicker = function ( option, val ) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('datepicker'),
                options = typeof option === 'object' && option;
            if (!data) {
                $this.data('datepicker', (data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults,options))));
            }
            if (typeof option === 'string') {
                data[option](val);
            }
        });
    };

    $.fn.datepicker.defaults = {
        onRender: function(date) {
            return '';
        }
    };
    $.fn.datepicker.Constructor = Datepicker;

})(window.jQuery);