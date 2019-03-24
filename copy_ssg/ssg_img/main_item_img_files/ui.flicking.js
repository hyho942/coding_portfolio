/**
 * ui.flicking.js
 * @author 이동섭
 * @fileOverview 슬라이드 모션 스크립트
 * @requires
 *          - jquery 1.9.1
 * @since 2013.07.23
 * @copyright © 2013 s.com All right reserved
 */



/**
 * flicking 객체
 * @constructor
 * @param {object}     options 슬라이드 제어 옵션
 * @param {string}     options.viewportSelector 슬라이드 영역을 제한할 선택자
 * @param {boolean}    options.loop 무한 롤링 설정
 * @param {boolean}    options.auto 슬라이드 자동 롤링(활성화 된 경우 자동이동시 마우스가 영역이 올라온 경우 잠시 멈추는 기능 작동)
 * @param {number}     options.autoDelayTime 자동이동시 다음 이동까지 대기하는 시간(millisecond), 1초는 1000
 * @param {number}     options.speed 아이템이 슬라이드되는 속도
 * @param {number}     options.itemGroup 지정한 수만큼의 아이템을 한번에 넘길수 있는 옵션
 * @param {number}     options.startElement 로드시 시작할 요소번호
 * @param {string}     options.prevSelector 이전(-1)버튼 선택자
 * @param {string}     options.nextSelector 다음(+1)버튼 선택자
 * @param {string}     options.pageNav 페이징 앵커요소 선택자
 * @param {boolean}    options.isRandom 시작할 요소를 무작위로 정함. 이때 startElement는 무시됨
 * @param {function}   options.beforeInit 초기화전 수행
 * @param {function}   options.afterInit 초기화후 수행
 * @param {function}   options.afterMotion 모션종료후 수행
 * @param {string}     options.direction 슬라이드 방향을 설정 (left | top)
 * @param {string}     _this 대상 컨테이너 (자식 노드가 있는 부모를 선택해야함)
 * @param {string}     autoStart 자동으로 이동하는 타이머 작동 (prev|next)
 * @param {}           autoStop 자동으로 이동하는 타이머 정지
 */
var noneStopTimerTmpval;
$.fn.flicking = function(opt){
    var _this = $(this);

    if(!opt) {
        opt={};
    }
    var btnWrapper = '.direction';
    var pagination = '.pagination';

    _this.each(function(){
		var viewportChk=0,
            tmpView = false;
		if(!$(this).get(0)){return false;}
		if(!$(this).is('div') || !$(this).find(pagination).is('div') && !$(this).find(btnWrapper).is('div')){ return false;}
        var _this = $(this),
            _itemsWrap = _this.find('ul:eq(0)'),
            _itemsSelector = 'ul:eq(0) > li',
            tag = 'li',
            _items = _this.find(_itemsSelector);
		if(_this.css('display') =="none"){
			_this.show();
			tmpView = true;
		}
        if(_this.find(btnWrapper).is('div') && _this.find(btnWrapper).parent().children().eq(0).is('div.list_rela')){
            _this.find(btnWrapper).parent().children().eq(0).css({
                'position':'relative',
                'overflow':'hidden'
            });
			viewportChk = 1;
        }
        var _pos = [];
        var _start = [];
        var _startX = 0;
        var timerID,
            playLog = {count : 0, stack:false},
            ctrlAttr = null,
            ctrlAttrStr = null,
            options = {
                len : _items.length,
				oldItemW:_items.eq(0).width(),
                itemW: _items.eq(0).outerWidth(true),
                itemH: _items.eq(0).outerHeight(true),
                lineH : null,
                opts:{
                    viewPort : (opt.viewportSelector) ? _this.find(opt.viewportSelector) : _this,
					remove : false,
					removeItem : _this.find('div.direction'),
                    autoPlay : false,
                    loop: true,
                    speed : (typeof opt.speed == "number") ? opt.speed : 400,
                    timer : 3000, //auto rolling timer
                    itemGroup : 1,
                    startElement: 1,
                    prev : opt.prevSelector ? _this.find(opt.prevSelector) : _this.find('div.direction > .prev'),
                    next : opt.nextSelector ? _this.find(opt.nextSelector) : _this.find('div.direction > .next'),
                    isRandom: false,
                    beforeInit: null,
                    afterInit: null,
                    beforeMotion : null,
                    pageNavi:opt.pageNavi = opt.pageNavi ? opt.pageNavi : '.pagination > span',
                    countViewer :null,
					RWD: false,
					slidePagingSelector : null,
					moreCall : null
                },
                binding:true,
                pause:false,
                direction : opt.direction || null,
                pageNavi:{
                    arrowBtn:null,
                    pageCircle:null
                },
                activeClass:'active'
            },
            viewLen = null,
            slideFx = 1,
            groupingMove=false,
            moveItemEa=1,
			bindingCancel = false,
			autoPlayDirection = false,//자동롤링으로 슬라이드 모션이 진행되었을경우 포커스 활성화를 막기위한 변수
            disableClass;

			$.extend(options.opts , opt);
			disableClass = (options.loop) ? '' : 'disable';
        /*************************************************************************
         객체가 슬라이드 할정도가 안되는 경우의 비활성은 init()에서 처리하고 이후 체크하지않음.
         스크립트로드 후 객체 수량을 늘릴경우에 대한 부분 고려안했음.
         **************************************************************************/
		var timerx, utilFn;

		/**
         * 자동 롤링 정지 함수
         */
        var autoStop = function(){
            autoPlayDirection = false;
            if(options.opts.timer){
                window.clearInterval(timerID);
            }
        };
        //auto play function
        /**
         * 자동 롤링 시작 함수
         * @param {string}    슬라이드 방향 (prev | next)
         */
        var autoStart = function(direction){
            if(timerID){
                autoStop();
            }
            if (options.opts.timer) {
                timerID = window.setInterval(function() {
                    autoPlayDirection = true;
                    if(!direction || direction == 'next'){
                        utilFn.goSlide(1);
                    }else{
                        utilFn.goSlide(-1);
                    }
                },options.opts.timer);
            }
        };

        utilFn = {
            init:function(){
				options.len = _items.length;
                // trigger beforeInit
                if(options.opts.beforeInit && options.opts.beforeInit instanceof Function) {
                    options.opts.beforeInit.apply(_this);
                }
                /**
                 * css속성명을 camelCase로 변경해주는 함수
                 * @param {string}    사용자가 입력한 css 속성명
                 * @returns {string}  jquery가 인식 가능한 css 속성명
                 */
                var cssMatch = function(cssAttr){
                    var origName=jQuery.camelCase(cssAttr),
                        name=jQuery.cssProps[origName]||origName;
                    return name;
                };
                //direction 설정에 따라, 컨트롤에 필요한 css속성과 값이 변수에 담긴채 animate에서도 사용하기위해 객체로 보관
                if(!options.direction || options.direction == "left"){
                    ctrlAttr = {'marginLeft':null};
                    for (var i in ctrlAttr){
                        ctrlAttrStr = cssMatch(i);
                    }
                    options.lineH = options.itemW;
                    viewLen = options.opts.viewPort.width()/options.lineH;
					if(viewLen+''.indexOf('.') > -1){
						viewLen = Math.round(viewLen);
					}

                    if(options.opts.itemGroup > 1){
                        if(viewLen%options.opts.itemGroup == 0){
                            options.itemW = options.itemW * options.opts.itemGroup;
                            options.lineH = options.itemW;
                        }else{
                            options.opts.itemGroup = 1;
                        }
                    }
                }else{
                    ctrlAttr = {'marginTop':null};
                    for (var j in ctrlAttr){
                        ctrlAttrStr = cssMatch(j);
                    }
                    options.lineH = options.itemH;
                    viewLen = options.opts.viewPort.height()/options.lineH;
                    if(options.opts.itemGroup > 1){
                        if(viewLen%options.opts.itemGroup == 0){
                            options.itemH = options.itemH * options.opts.itemGroup;
                            options.lineH = options.itemH;
                        }
                    }

                }
                //아이템 순서가 뒤바껴도 초기 배열 상태로 index를 찾기위해 초기 배열값을 _idx 속성에 저장
                _items.each(function(idx){
                    $(this).attr('_idx',idx);
                    /* fixed code ing
                     _pos[i] = options.lineH * idx - options.lineH;
                     _start[i] = _pos[idx];
                     _items.eq(idx).css({
                     "float" : "none",
                     "display" : "block",
                     "position" : "absolute",
                     "top" : "0",
                     "left" : _pos[idx],
                     "width" : options.lineH
                     });
                     */
                });

                //paging type check
                if(_this.find(btnWrapper).get(0)){
                    options.pageNavi.arrowBtn = _this.find(btnWrapper);
                }
				var tmp = (options.len * options.lineH);
                if(options.len <= 1){
					if(options.opts.remove){
						options.opts.removeItem.hide();
					};
					if(options.direction != 'top'){
						_itemsWrap.css('width',tmp*3);
						_items.css({
							'float':'left',
							'width':options.oldItemW
						});
					}
					bindingCancel = true;
				}
                if(_this.find(opt.pageNavi).get(0)){
                    if(_this.find(opt.pageNavi).length+1 > options.len){// 슬라이드 아이템보다 많다면,
                        /* pagenavi 갯수와 슬라이드 아이템 갯수 싱크 */
						if(options.len -2 < 0){
							_this.find(opt.pageNavi).remove('span');
						}
                        _this.find(opt.pageNavi).eq(options.len-2).nextAll().remove();
                    }else if(_this.find(opt.pageNavi).length < options.len){
						var pageLen = options.len-_this.find(opt.pageNavi).length;
						var itemLen = _this.find(opt.pageNavi).length;
						for(var k=itemLen+2; k<pageLen+options.len; k++){//부족한 만큼 생성
							$('<span class="dot"><span class="blind">'+k+'</span></span>').appendTo(_this.find(opt.pageNavi).parent());
						}
						_this.find(opt.pageNavi).eq(options.len-2).nextAll().remove();

					}
					/*if(opt.pageNavi.indexOf('ssg_tab') != -1){
						options.opts.loop = false;
					}*/
                    options.pageNavi.pageCircle = _this.find(options.opts.pageNavi);
                }

                if(options.pageNavi.arrowBtn && !options.opts.loop && playLog.count == 0 && playLog.count < (viewLen-1)){
                    options.opts.prev.unbind('click',utilFn.goSlide).addClass(disableClass);
                }
                /* 슬라이드 기능적용 할 필요가 없는 경우 */
                if(options.pageNavi.arrowBtn && options.pageNavi.arrowBtn.is('div') && viewLen >= options.len){
					options.opts.prev.unbind('click',utilFn.goSlide).addClass('disable');
					if(options.opts.ajaxMoreCall && options.opts.ajaxMoreCall instanceof Function) {
						options.len = viewLen;
						options.opts.next.bind('click',utilFn.moreCallFn);
					}else{
						options.opts.next.unbind('click',utilFn.goSlide).addClass('disable');
						_this.find(pagination).addClass('disable');
						slideFx = false;
						return false;
					}
                }else{
                    var isRandomVal = Math.round(Math.random()*(options.len-1));
                    utilFn.setCurrentItem((options.opts.isRandom) ? isRandomVal : options.opts.startElement-1);
                    playLog.count = (options.opts.isRandom) ? isRandomVal : options.opts.startElement-1;
                }
                if(options.pageNavi.pageCircle){
                    utilFn.pageNaviActive();
                }
                //자동롤링 옵션이 설정된경우 컨테이너에 마우스가 올라가거나 나갈경우 자동롤링을 시작하거나 멈추는 이벤트 바인딩
                if(options.opts.autoPlay){
                    _this.bind({
                        'mouseover focusin':function(){
							autoStop();
						},
                        'mouseout focusout':function(){
                            autoStart();
                            utilFn.autoPlayDirConfig();
                        }
                    });
                }
                // trigger afterInit
                if(options.opts.afterInit && options.opts.afterInit instanceof Function) {
                    options.opts.afterInit.apply(_this);
                }


				if(options.direction != 'top'){
					_itemsWrap.css('width',tmp*3);
					_items.css({
						'float':'left',
						'width':options.oldItemW
					});
				}
				_items.each(function(){
					if(!$(this).is('.active')) {
                        $(this).hide();
                    }
				});
				if(!viewportChk){
                    options.opts.viewPort.css('overflow','hidden');
                }
				if(tmpView){ _this.css('display','');}
            },
            /**
             * 지정한 방향 요소에 맞게 animate에 전달될값을 처리
             * @param {number}    슬라이드 방향 (-1 | 1)
             * @returns {boolean} false
             */
            goSlide:function(direction){
                var item = $(this);
                if(options.pageNavi.arrowBtn){
                    if(typeof direction != 'number' && item.is('.prev') || item.is(opt.prevSelector)){
                        direction = -1;
                    }else if(typeof direction != 'number' && item.is('.next') ||  item.is(opt.nextSelector)){
                        direction = 1;
                    }
					//alert(item.is(opt.prevSelector))
                    options.opts.prev.unbind('click',utilFn.goSlide);
                    options.opts.next.unbind('click',utilFn.goSlide);
                }
                options.binding = false;
                moveItemEa = Math.abs(direction);

                if(moveItemEa > 1){
                    groupingMove = true;
                }
                _itemsSelector = 'ul:eq(0) > li';
                if(typeof direction == 'number' && direction < 0){ //prev btn
                    playLog.count = playLog.count+direction-(options.opts.itemGroup-1);
                    _itemsSelector = (options.opts.loop) ? _itemsSelector+':last' : _itemsSelector;
                    if(!groupingMove){
                        utilFn.animate(_this.find(_itemsSelector),+options.lineH,direction);
                    }else{
                        utilFn.groupingMove(direction);
                    }
                }else{ //next btn
                    playLog.count = playLog.count+direction+(options.opts.itemGroup-1);

                    _itemsSelector = (options.opts.loop) ? _itemsSelector+':eq(0)' : _itemsSelector;
                    if(!groupingMove){
                        utilFn.animate(_this.find(_itemsSelector),-options.lineH,direction);
                    }else{
                        utilFn.groupingMove(direction);
                    }
                }

                if(playLog.count > options.len-1){
                    playLog.count = 0;
                }
                if(playLog.count < 0){
                    playLog.count = options.len-1;
                }

                if(options.opts.countViewer){
                    utilFn.countView();
                }

                return false;
            },

            /*
            // contents 첫 부분에 focus가 이동하게 하는 기능 삭제

            focusObjFindTrigger:function(obj){
                if(obj.type){
                    obj = _itemsWrap.find('> .active :focusable').eq(0);
                }
				if(!autoPlayDirection){//자동롤링으로 슬라이드 모션이 진행되지 않은 경우에만 포커스적용
					obj.focus();
				}
            },
            */
            activeItem:function(d){
                var beItem = (_itemsWrap.find('> .active').get(0)) ? _itemsWrap.find('> .active').index() : 0;
                if(!options.opts.loop){
                    _itemsWrap.find('> .active').hide().removeClass('active');
                    _itemsWrap.find('> li').eq(playLog.count).addClass('active');
                }else{
                    _itemsWrap.find('> .active').removeClass('active');
                    _itemsWrap.find('> li').eq(0).addClass('active');
                }
				_itemsWrap.find('> '+tag+':not(.active)').hide();

                // contents 첫 부분에 focus가 이동하게 하는 기능 삭제
                // utilFn.focusObjFindTrigger(_itemsWrap.find('> .active :focusable').eq(0));
            },
            /**
             * 지정한 방향으로 아이템을 두개이상 이동시킬때 호출되는 함수
             한번에 이동될 거리를 재계산
             * @param {number}    슬라이드 방향 (-1 | 1)
             */
            groupingMove:function(direction){
                groupingMove = false;
                var tmpVal = options.lineH;
                options.lineH = options.lineH * direction;
                if(direction < 0){
                    utilFn.animate(_this.find(_itemsSelector),+Math.abs(options.lineH),direction);
                }else{
                    utilFn.animate(_this.find(_itemsSelector),-options.lineH,direction);
                }
                options.lineH = tmpVal;
            },
            /**
             * 슬라이드 모션 처리 함수
             * @param {object}    무한 롤링일경우 복사될 객체 jQuery(HTMLElement)
             * @param {number}    이동할 거리
             * @param {number}    슬라이드 방향 (-1 | 1)
             */
            animate:function(obj,movePos,direction){

                if(options.opts.loop){//무한 type이라면
                    if(direction < 0){ //prev
                        _itemsWrap.css(ctrlAttrStr,-movePos);
                        for(var i=0; i<moveItemEa; i++ ){
                            _itemsWrap.find("> "+tag).eq(options.len-1).show().clone().prependTo(_itemsWrap);
                        }
                    }else{ //next
                        for(var j=0; j<moveItemEa; j++ ){
                            _itemsWrap.find("> "+tag).eq(j).show().clone().appendTo(_itemsWrap);
                        }
						_itemsWrap.find("> "+tag).show();
                    }
                    for (var k in ctrlAttr){
                        ctrlAttr[k] = (movePos > 0) ? 0 : movePos;
                    }
                }else{
                    if(direction < 0){ //prev
                        _itemsWrap.css(ctrlAttrStr,-movePos);
                    }
					_itemsWrap.find("> "+tag+'.active').next().show();
					_itemsWrap.find("> "+tag).eq(playLog.count).show();
                    var _leftVal = parseInt(_itemsWrap.css(ctrlAttrStr), 10);
                    for (var n in ctrlAttr){
                        ctrlAttr[n] = _leftVal+movePos;
                    }
                }
				//기능을 공유하는 오브젝트 설정
				if(options.opts.slidePagingSelector){
					utilFn.slidePaging(direction);
				}
                _itemsWrap.stop().animate(ctrlAttr, options.opts.speed, function(){
                    if(options.opts.loop){
                        for(var i=0; i<moveItemEa; i++ ){
                            _this.find(_itemsSelector).remove();
                        }
                        if(direction > 0){ _itemsWrap.css(ctrlAttrStr,0);}
                    }else{
                        _itemsWrap.css(ctrlAttrStr,0);
                    }
                    utilFn.autoPlayDirConfig();
                    utilFn.btnActive();

                    options.binding = true;
                    if(options.pageNavi.pageCircle){
                        utilFn.pageNaviActive();
                    }
                    playLog.stack = 1;
                    // trigger beforeMotion
                    if(options.opts.beforeMotion && options.opts.beforeMotion instanceof Function) {
                        options.opts.beforeMotion.apply(_this);
                    }
                    utilFn.activeItem(direction);
                    utilFn.pageNavi();
                });
            },
            /**
             * 페이징카운터 출력함수 (current page number / total page number)
             */
            countView:function(){
                _this.find(options.opts.countViewer).text((playLog.count+1)+'/'+options.len);
            },
            /**
             * 자동 롤링시 방향 컨트롤 함수
             */
            autoPlayDirConfig:function(){
                if(options.opts.autoPlay){
                    if(!options.opts.loop){
                        if(!playLog.stack){
                            autoStart();
                        }else{
                            if(playLog.count == (options.len-viewLen) && playLog.count > 0){
                                autoStart('prev');
                            }
                            if(playLog.count == 0){
                                autoStart('next');
                            }
                        }
                    }
                }
            },
			moreCallFn:function(e){
				options.opts.ajaxMoreCall(_itemsWrap);
				_items = _itemsWrap.find(' > li');
				options.len = _items.length;
				utilFn.resizeInit();
				options.opts.next.unbind('click',utilFn.moreCallFn);
				utilFn.btnActive();
				options.opts.next.trigger('click');
				return false;
			},
            /**
             * 모션 종료후 버튼 이벤트 바인딩 및 해제, 비활성 클래스 적용함수
             */
            btnActive:function(){
                if(options.pageNavi.arrowBtn && slideFx){
                    if(playLog.count == 0 && playLog.count <= (viewLen-1)){ //처음일경우
                        if(options.opts.loop){
                            options.opts.prev.bind('click',utilFn.goSlide).removeClass(disableClass);
                        }else{
                            options.opts.prev.unbind('click',utilFn.goSlide).addClass(disableClass);
                        }
                    }else{//그외 prev 에 대한 활성화
                        options.opts.prev.bind('click',utilFn.goSlide).removeClass(disableClass);
                    }
                    if(playLog.count == (options.len-viewLen) && playLog.count > 0){ //마지막일경우.
                        if(options.opts.loop){
                            options.opts.next.bind('click',utilFn.goSlide).removeClass(disableClass);
                        }else{
							//console.log('마지막')
							if(options.opts.ajaxMoreCall && options.opts.ajaxMoreCall instanceof Function) {
								options.opts.next.unbind('click',utilFn.moreCallFn);
								options.opts.next.bind('click',utilFn.moreCallFn);
								options.opts.next.unbind('click',utilFn.goSlide);
							}else{
								options.opts.next.unbind('click',utilFn.goSlide).addClass(disableClass);
							}
                        }
                    }else{//그외 next 에 대한 활성화
						if(options.opts.ajaxMoreCall && options.opts.ajaxMoreCall instanceof Function) {
							options.opts.next.unbind('click',utilFn.moreCallFn);
							//console.log('슬라이드할 아이템이 존재할경우');
							options.opts.next.bind('click',utilFn.goSlide);
						}else{
							options.opts.next.bind('click',utilFn.goSlide).removeClass(disableClass);
						}

                    }
                }
            },
            /**
             * 지정한 번호의 요소를 활성화 시키는 함수
             * @param {number}    요소번호
             */
            setCurrentItem: function(pNum){
                if(!playLog.stack){ //처음이라면
                    if(options.opts.loop){ //무한일경우 아이템 순서 재배치
                        var moveItem = this.Idxfind(pNum);

                        moveItem.prependTo(_itemsWrap);
                        var Sumcos=pNum;
                        for(var i=pNum; i<options.len-1+pNum; i++){
                            Sumcos--;
                            if(Sumcos < 0){Sumcos=options.len-1;}

                            moveItem = this.Idxfind(Sumcos);
                            moveItem.insertAfter(_itemsWrap.find('> '+tag+':eq(0)'));
                        }
						_itemsWrap.find('> li').removeClass('active').hide();
						_itemsWrap.find('> li').eq(0).show().addClass('active');
                    }else{
						_itemsWrap.find('> li').removeClass('active').hide();
						_itemsWrap.find('> li').eq(pNum).show().addClass('active');
                    }
                }
            },
            Idxfind : function(_idx){
                var rtObj;
                _items.each(function(){
                    var item = $(this);
                    if(item.attr('_idx') == _idx){
                        rtObj = item;
                        return false;
                    }
                });
                return rtObj;
            },
            /**
             * 페이징 활성화 클래스 제어 함수
             */
            pageNaviActive:function(){
                var oldNum = _this.find(opt.pageNavi).parent().find('strong').text();

                _this.find(options.opts.pageNavi).parent().find('strong').after($('<span class="dot"><span class="blind">'+oldNum+'</span></span>'));
                _this.find(options.opts.pageNavi).parent().find('strong').remove();

                var currentNum = playLog.count+1;

                if(playLog.count > options.len-1){
                    playLog.count = 0;
                }
                if(playLog.count < 0){
                    playLog.count = options.len-1;
                }

                _this.find(options.opts.pageNavi).eq(playLog.count).after($('<strong title="현재위치" class="dot_on"><span class="blind">'+currentNum+'</span></strong>'));
                _this.find(options.opts.pageNavi).eq(playLog.count).remove();
            },
            /**
             * 페이징 click, mouseover, focus시 이벤트 기능적용 함수
             */
            pageNavi:function(){
                if(options.pageNavi.pageCircle){
                    _this.find(options.opts.pageNavi)
                        .off()
                        .on('click', $.proxy(this.pageNaviFn, this));
                }
            },
            pageNaviFn: function(e){
                var item = $(e.currentTarget);
                var pNum;
                var currentIdx = playLog.count;
                var afterIdx = parseInt(item.text(), 10)-1;

                autoStop();

                if(options.binding){
                    if(currentIdx != afterIdx && currentIdx > afterIdx){//prev
                        utilFn.goSlide(-currentIdx+afterIdx);
                    }else if(currentIdx != afterIdx && currentIdx < afterIdx){ //next
                        utilFn.goSlide(afterIdx-currentIdx);
                    }
                }

                return false;
            },
			resizeInit:function(){
				if(options.direction != 'top'){
					_itemsWrap.removeAttr('style');
					_items = _itemsWrap.find(' > li');
					_items.removeAttr('style');

					var tmp = _items.eq(0).outerWidth(true);
					options.lineH = tmp;
					_items.css({
						'float':'left',
						'width':options.lineH
					});
					options.itemW = tmp;
					_itemsWrap.css('width',options.len * options.lineH *3);

					options.opts.viewPort.css('overflow','hidden');

					_items.each(function(){
						if(!$(this).is('.active')) {
                            $(this).hide();
                        }
					});
					var cssMatch = function(cssAttr){
						var origName=jQuery.camelCase(cssAttr),
							name=jQuery.cssProps[origName]||origName;
						return name;
					};
					if(!options.direction || options.direction == "left"){
						ctrlAttr = {'marginLeft':null};
						for (var i in ctrlAttr){
							ctrlAttrStr = cssMatch(i);
						}
						options.lineH = options.itemW;
						viewLen = options.opts.viewPort.width()/options.lineH;
						if(viewLen+''.indexOf('.') > -1){
							viewLen = Math.round(viewLen);
						}

						if(options.opts.itemGroup > 1){
							if(viewLen%options.opts.itemGroup == 0){
								options.itemW = options.itemW * options.opts.itemGroup;
								options.lineH = options.itemW;
							}else{
								options.opts.itemGroup = 1;
							}
						}
					}else{
						ctrlAttr = {'marginTop':null};
						for (var j in ctrlAttr){
							ctrlAttrStr = cssMatch(j);
						}
						options.lineH = options.itemH;
						viewLen = options.opts.viewPort.height()/options.lineH;
						if(options.opts.itemGroup > 1){
							if(viewLen%options.opts.itemGroup == 0){
								options.itemH = options.itemH * options.opts.itemGroup;
								options.lineH = options.itemH;
							}
						}

					}
				}
			},
			slidePaging : function(direction){
				var wraper = $(options.opts.slidePagingSelector);
				var groupObjWrap = $(options.opts.slidePagingSelector + ' ul:eq(0)');
				var groupObjitems = groupObjWrap.find('> li.active > ul > li');
				var _idx = parseInt(_this.find('li.active').attr('_idx'), 10);
				var Idx = _idx%groupObjitems.length;
				groupObjWrap.find('> li > ul > li').removeClass('selected');
				if(direction < 0){
					if(_idx == 0){
						Idx = 0;
					}
					groupObjitems.eq(Idx-1).addClass('selected');
				}else{
					groupObjitems.eq(Idx+1).addClass('selected');
				}
				if(Idx+direction < 0){
					if(direction < 0){
						$(options.opts.slidePagingSelector).find('.direction a:eq(0)').trigger('click');
						wraper.queue(function(){
							groupObjWrap.find('> li:eq(0)').find(' > ul > li').eq(groupObjitems.length-1).addClass('selected');
							wraper.clearQueue();
						});
					}
				}else if((Idx+direction)%groupObjitems.length == 0) {
					if(direction > 0){
						$(options.opts.slidePagingSelector).find('.direction a:eq(1)').trigger('click');
						wraper.queue(function(){
							groupObjWrap.find('> li:eq(0)').next().find('> ul > li').eq(0).addClass('selected');
							wraper.clearQueue();
						});
					}
				}
			}
        };
        //초기화 셋팅
        utilFn.init();
		//RWD옵션이 true인경우 init 실행.
		if(options.opts.RWD){
			$(window).resize(function(){
				utilFn.resizeInit();
			});
		}

		if(bindingCancel){ return false;}
        //카운터를 출력하는 부분이 존재한다면 카운터 출력 함수 호출
        if(options.opts.countViewer){
            utilFn.countView();
        }
        //페이징이 존재한다면 페이징 기능적용 함수 호출
        utilFn.pageNavi();
        //무한롤링 옵션이 활성화 되어있다면 버튼이 비활성화 될 필요가 없으므로 click 이벤트 바인딩
        if(options.opts.loop){
            options.opts.prev.bind('click',utilFn.goSlide);
            options.opts.next.bind('click',utilFn.goSlide);
        }
        //무한롤링 옵션이 비활성화 상태이고 prev next 버튼들이 존재한다면 버튼 제어 함수 호출
        if(options.opts.prev.get(0) && options.opts.next.get(0) && !options.opts.loop){
            utilFn.btnActive();
        }

        //자동 롤링 시작

        if(options.opts.autoPlay){
            autoStart('next');
        }
    });
};
