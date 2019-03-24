// 최근검색어 글로벌 저장용
var globalSsgMbrList = [];

if(document.getElementById('ssg-query')){
    try{
        /* 검색창 광고영역 */
        if(settings.domain.isHttpFlag){
            if(srch_Ad_keyword && document.getElementById('ssg-query').value == ''){
                var dt  = new Date();
                var today = dt.getFullYear() +  ("00" + (dt.getMonth() + 1)).slice(-2) + ("00"+dt.getDate()).slice(-2) + ("00"+dt.getHours()).slice(-2) + ("00"+dt.getMinutes()).slice(-2);

                var ads = _.filter(srch_Ad_keyword, function(ad){
                    return ad.siteNo=='6005' && (today >= String(ad.dispStrtDts) && today <= String(ad.dispEndDts));
                });

                if(ads){
                    var rand = Math.floor((Math.random() * ((ads.length-1) - 0 + 1)) + 0);
                    if(rand>-1){
                        document.getElementById('ssg-query').value		  = ads[rand].banrDesc;
                        document.getElementById('ssgQueryBanrTarget').value  = ads[rand].banrDesc;
                        document.getElementById('ssgQueryBanrUrl').value = ads[rand].lnkdUrl;
                        document.getElementById('ssg-query').style.background = "";

                        /* set input background img */
                        var srchAdKeyType = ads[rand].banrTypeCd;
                        var imgAdKeyword = ads[rand].imgFileNm;

                        if(imgAdKeyword != null && srchAdKeyType == '20'){
                            imgAdKeyword = settings.cdn.cdnDomain + imgAdKeyword;
                            document.getElementById('ssg-query').value = "";
                            document.getElementById('ssg-query').style.background = "url('"+imgAdKeyword+"') 0 50% no-repeat";
                            document.getElementById('ssgQueryBanrTarget').value = "url('"+imgAdKeyword+"') 0 50% no-repeat";
                        }
                    }
                }
            }
        }
    }catch(e){}

    /* body에 다른 부분 선택했을 경우 창 닫기 script */
    var _body = document.getElementsByTagName('body');
    _body[0].addEventListener('mousedown',function(event){
        var tgt;
        if(!event.target){
            tgt = event.srcElement;
        }else tgt = event.target;
        if(!childOf(tgt, document.getElementById('ssg-common_search_word')) && !childOf(tgt, document.getElementById('search_query'))){
            hide(document.getElementById('ssg-common_search_word'));
        }
        if(!childOf(tgt, document.getElementById('ssg_searching_select'))){
            hide(document.getElementById('ssg_toggle_option'));
        }
    },false);

    /* 검색버튼 */
    if(document.getElementById('ssg-query-btn')){
        document.getElementById('ssg-query-btn').addEventListener('click',function(event){
            ssgTrigger.enter(-1);
        }, false);
    }

    /* 광고영역 */
    try{
        if(settings.domain.isHttpFlag){
            if(srch_rcmd_keyword){
                var dt  = new Date();
                var today = dt.getFullYear() + '.' +  ("00" + (dt.getMonth() + 1)).slice(-2) + '.' + ("00"+dt.getDate()).slice(-2);
                /* lo-dash 의 filter function 사용함 -> 조건에 만족되는 collection list return */
                var pop_words = _.filter(srch_rcmd_keyword, function(rcmd){
                    return rcmd.siteNo == '6005';
                });
                if(pop_words){
                    var iHtml = '';
                    var logParam = '&src_area=layerbesttag';
                    for(var r=0;r<pop_words.length;r++){
                        var word = pop_words[r];
                        var link = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#' + word.tagNm) + logParam;
                        iHtml += '<li><a href="' + link + '"><span class="arr_num">' + (r+1) + '.</span><span class="text">' + '#' + word.tagNm + '</span></a></li>';
                    }
                    if(iHtml!=''){
                        document.getElementById('ul_rcmd_tag').innerHTML = iHtml;
                    }
                    var date_tag = document.createElement('p');
                    date_tag.setAttribute('class', 'date');
                    date_tag.innerHTML = today + '기준';
                    document.getElementById('div_rcmd_tag').appendChild(date_tag);
                }
            }
            if(srch_rcmdCorner_keyword){
                /* lo-dash 의 filter function 사용함 -> 조건에 만족되는 collection list return */
                var rcmd_corners = _.filter(srch_rcmdCorner_keyword, function(rcmdCorner){
                    return rcmdCorner.siteNo == '6005';
                });
                if(rcmd_corners!=undefined){
                    var logParam = '&src_area=layerrecomtag';
                    for(var c=0;c<rcmd_corners.length;c++){
                        var corner = rcmd_corners[c];
                        var title_text = corner.titleNm;
                        var tagKeywds = corner.tagKeywd;
                        var title = document.createElement('div');
                        title.setAttribute('class', 'tit');
                        title.innerHTML = '<strong><em>' + '#_</em>' + title_text +'</strong>';
                        var rcmd_div = document.createElement('div');
                        var iHtml = '<ul>';
                        rcmd_div.setAttribute('class', 'recomm_lst');
                        if(tagKeywds && tagKeywds.length>0){
                            for(var k=0;k<tagKeywds.length;k++){
                                var link = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#' + tagKeywds[k]) + logParam;
                                iHtml += '<li><a href="' + link + '">' + '#' + tagKeywds[k] + '</a></li>';
                            }
                        }
                        iHtml += '</ul>';
                        rcmd_div.innerHTML = iHtml;
                        document.getElementById('div_rcmd_corner').appendChild(title);
                        document.getElementById('div_rcmd_corner').appendChild(rcmd_div);
                    }
                }
            }
        }
    }catch(e){}

    /* 통합검색 select box click */
    if(document.getElementById('ssg_toggle_select')){
        document.getElementById('ssg_toggle_select').addEventListener('click', function(event){
            event.preventDefault();
            if(hasClass('ssg_toggle_select','active')){
                removeClass('ssg_toggle_select','active');
                removeClass('ssg_toggle_option','active');
                hide(document.getElementById('ssg_toggle_option'));
            }else{
                appendClass('ssg_toggle_select','active');
                appendClass('ssg_toggle_option','active');
                show(document.getElementById('ssg_toggle_option'));
            }
        }, false);
    }
    /* 통합검색 option click */
    if(document.getElementById('ssg_toggle_option')){
        var li = document.getElementById('ssg_toggle_option').childNodes;
        for(var i=0;i<li.length;i++) {
            var obj = li[i].childNodes[0];
            if(obj){
                obj.addEventListener('click',function(event){
                    event.preventDefault();
                    var tgt = event.target||event.srcElement;
                    var tName = tgt.name;
                    if(tName=='all')tName = '';
                    document.getElementById('ssgFilterSiteNo').value = tName;
                    document.getElementById('ssg_toggle_select').innerText = tgt.innerText;
                    removeClass('ssg_toggle_select','active');
                    removeClass('ssg_toggle_option','active');
                    hide(document.getElementById('ssg_toggle_option'));
                },false);
            }
        }
    }

    /* 태그검색창은 http만 */
    if(settings.domain.isHttpFlag){
        /* 통합검색 hover Event */
        if(document.getElementById('ssg-query')){
            /* Focus */
            document.getElementById('ssg-query').addEventListener('focus',function(event){
                document.getElementById('ssg-query').style.background = '';
            },false);
            /* Blur */
            document.getElementById('ssg-query').addEventListener('blur',function(event){
                if((document.getElementById('ssg-query').value).trim()==''){
                    /* TEXT 일때와 BANR 타입일때 분기 */
                    var val = document.getElementById('ssgQueryBanrTarget').value;
                    if(val.indexOf(settings.cdn.cdnDomain)>-1){
                        document.getElementById('ssg-query').style.background = document.getElementById('ssgQueryBanrTarget').value;
                    }else{
                        document.getElementById('ssg-query').value = document.getElementById('ssgQueryBanrTarget').value;
                    }
                }
            },false);
        }

        /* 태그전용검색창 관련 */
        if(document.getElementById('search_hash')){
            /* Click */
            document.getElementById('search_hash').addEventListener('click', function(){
                if(document.getElementById('ssg_hash_query')){
                    document.getElementById('ssg_hash_query').value = '';
                }
                if(document.getElementById('ssg_hash_query_sub')){
                    document.getElementById('ssg_hash_query_sub').value = '';
                }
                if(document.getElementById('ssg-query')){
                    document.getElementById('ssg-query').value = '';
                }

                hide(document.getElementById('search_query'));
                hide(document.getElementById('ssg-common_search_word'));
                show(document.getElementById('search_hash_box'));
                show(document.getElementById('search_hash_area'));
                ssg_hash_trigger.watch();
                document.getElementById('ssg_hash_query').focus();
            }, false);
        }
        /* 검색창 클릭시 */
        if(document.getElementById('ssg_hash_query')){
            document.getElementById('ssg_hash_query').addEventListener('click', function(){
                if(document.getElementById('ssg_hash_query').value != '' && document.getElementById('ssg-auto_list').childNodes.length>0){
                    show(document.getElementById('ssg-common_search_word'));
                }else{
                    show(document.getElementById('search_hash_area'));
                }
            }, false);
        }
        /* 일반검색창 전환 */
        if(document.getElementById('hash_search_hash')){
            /* Click */
            document.getElementById('hash_search_hash').addEventListener('click', function(){
                try{
                    if(hasClassByName(document.getElementById('search_hash_box'), 'search_inp_tx')){
                        removeClassByName(document.getElementById('search_hash_box'), 'search_inp_tx');
                    }
                }catch(e){}
                show(document.getElementById('search_query'));
                hide(document.getElementById('search_hash_box'));
                hide(document.getElementById('search_hash_area'));
                ssg_hash_trigger.unwatch(ssg_hash_trigger.properties.tid);
                document.getElementById('ssg-auto_list').innerHTML = '';
            }, false);
        }
        if(document.getElementById('btn_key_hash')){
            /* Click */
            document.getElementById('btn_key_hash').addEventListener('click', function(){
                try{
                    if(hasClassByName(document.getElementById('search_hash_box'), 'search_inp_tx')){
                        removeClassByName(document.getElementById('search_hash_box'), 'search_inp_tx');
                    }
                }catch(e){}
                show(document.getElementById('search_query'));
                hide(document.getElementById('search_hash_box'));
                hide(document.getElementById('search_hash_area'));
                ssg_hash_trigger.unwatch(ssg_hash_trigger.properties.tid);
                document.getElementById('ssg-auto_list').innerHTML = '';
            }, false);
        }

        /* 태그검색창 검색버튼 */
        if(document.getElementById('hash_search_btn')){
            /* Click */
            document.getElementById('hash_search_btn').addEventListener('click', function(){
                var q = document.getElementById('ssg_hash_query').value;
                if(q.trim() != ''){
                    var logParam = '&src_area=recomhashtag';
                    document.location.href = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#' + q)+logParam;
                }else{
                    alert("검색어를 입력하세요.");
                }
                event.stopPropagation();
                event.preventDefault();
                return false;
            }, false);
        }

        /* 태그 검색창 키보드 이벤트 */
        document.getElementById('ssg_hash_query').addEventListener('keydown', function(event){
            var k = -1;
            /* NOT FF */
            if (navigator.userAgent.search('Firefox') <= -1) {
                k = event.keyCode;
            }
            /* FF */
            else{
                k = event.which;
            }
            /* 13 enter, 38 up, 40 down */
            if(k == '13' || k == '37' || k == '38' || k == '39' || k == '40'){
                if(k=='13'){
                    event.stopPropagation();
                    event.preventDefault();
                    var q = document.getElementById('ssg_hash_query').value;
                    if(q.trim() != ''){
                        var filterSiteNo = document.getElementById('ssgFilterSiteNo').value;
                        var logParam = '';
                        if(filterSiteNo!='' && filterSiteNo!='undefined' && filterSiteNo!='0'){
                            document.location.href = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#' + q)+'&filterSiteNo='+filterSiteNo+logParam;
                        }else{
                            document.location.href = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#' + q)+logParam;
                        }
                    }else{
                        alert("검색어를 입력하세요.");
                    }
                    return false;
                }else if(k=='38'){
                    if(settings.domain.isHttpFlag){
                        var idx = ssg_hash_trigger.properties.idx;
                        var li = document.getElementById('ssg-auto_list').childNodes;
                        if(idx>0){
                            idx--;
                        }else if(idx==0){
                            idx = li.length-1;
                        }
                        if(li && li.length > idx){
                            for(var i=0;i<li.length;i++){
                                if(i == idx){
                                    li[i].setAttribute('class', 'on');
                                    var title = li[i].childNodes[0].childNodes[0].getAttribute('title');
                                    document.getElementById('ssg_hash_query').value = title;
                                    document.getElementById('ssg_hash_query_sub').value = title;
                                }else{
                                    li[i].setAttribute('class', '');
                                }
                            }
                        }
                        ssg_hash_trigger.properties.idx = idx;
                    }
                }else if(k=='40'){
                    if(settings.domain.isHttpFlag){
                        var idx = ssg_hash_trigger.properties.idx;
                        var li = document.getElementById('ssg-auto_list').childNodes;
                        if(idx<li.length-1){
                            idx++;
                        }else{
                            idx = 0;
                        }
                        if(li && li.length > idx){
                            for(var i=0;i<li.length;i++){
                                if(i == idx){
                                    li[i].setAttribute('class', 'on');
                                    var title = li[i].childNodes[0].childNodes[0].getAttribute('title');
                                    document.getElementById('ssg_hash_query').value = title;
                                    document.getElementById('ssg_hash_query_sub').value = title;
                                }else{
                                    li[i].setAttribute('class', '');
                                }
                            }
                        }
                        ssg_hash_trigger.properties.idx = idx;
                    }
                }
            }
        }, false);

        var ssg_hash_trigger = {
            properties : {
                tid : '',
                idx : -1
            },
            recomtag : {
                query : "",
                url : function(v){
                    this.query = (v || "").toLowerCase();
                    return 'http://'+settings.domain.advertise+'/WNRun.do?' + 'datatype=jsonp'+ '&convert=fw'+ '&target=tag-ssg' + '&query=' + encodeURIComponent(this.query);
                },
                callback : function(data){
                    var acHtml = '';
                    var acsrchwd	 = document.getElementById('ssg-auto_list');
                    var logParam = '&src_area=recomhashtag';
                    if(data.result && data.result[0]){
                        var items = data.result[0].items;
                        var sortedItems = [];
                        var tempItems = [];

                        for(var j=0;j<globalSsgMbrList.length;j++) {
                            if(globalSsgMbrList[j].srchwdDtlc.indexOf("#") == 0 && globalSsgMbrList[j].srchwdDtlc.indexOf(this.query) > -1 && globalSsgMbrList[j].siteNo == '6005') {
                                var item = {
                                    hkeyword : globalSsgMbrList[j].srchwdDtlc.replace("#","").replace(this.query, "<strong>" + this.query + "</strong>")
                                    , keyword : globalSsgMbrList[j].srchwdDtlc.replace("#","")
                                    , regDt : globalSsgMbrList[j].regDt
                                };

                                sortedItems.push(item);
                            }
                        }

                        for(var i=0;i<items.length;i++) {
                            var duplicateArr = _.filter(sortedItems, function(obj){
                                return items[i].keyword == obj.keyword;
                            });

                            if(duplicateArr.length == 0) {
                                tempItems.push(items[i]);
                            }
                        }

                        sortedItems = sortedItems.concat(tempItems);

                        var query = '';
                        ssg_hash_trigger.properties.idx = -1;

                        for (var d = 0; d < sortedItems.length; d++) {
                            var item = sortedItems[d];
                            var keyword = item.keyword;
                            var regDt = item.regDt;

                            var hkeyword = item.hkeyword;

                            if(item.count) {
                                hkeyword = item.hkeyword.replace('<font style=\'font-size:12px\'>', '').replaceAll('<font style=\'color:#FF5B59\'>', '<strong>').replaceAll('</font>', '</strong>').replace(/<\/strong>$/, '');
                            }
                            acHtml += '<li>'+'<a href="http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#' + keyword)+ logParam + '" ><span title="'+keyword+'">'+'#' + hkeyword+'<em class="word_date">'+ (regDt || "" ) + '</em></span></a></li>';
                        }
                        acsrchwd.innerHTML = acHtml;
                        hide(document.getElementById('search_hash_area'));
                        hide(document.getElementById('ssg-mbr-wrap-area'));
                        if(document.getElementById('ssg-tag_list')){
                            hide(document.getElementById('ssg-tag_list'));
                        }
                        show(document.getElementById('ssg-auto_list'));
                        show(document.getElementById('ssg-auto_word'));
                        show(document.getElementById('ssg-common_search_word'));
                    }else{
                        acsrchwd.innerHTML = acHtml;
                        hide(document.getElementById('search_hash_area'));
                        hide(document.getElementById('ssg-mbr-wrap-area'));
                        if(document.getElementById('ssg-tag_list')){
                            hide(document.getElementById('ssg-tag_list'));
                        }
                        show(document.getElementById('ssg-auto_list'));
                        show(document.getElementById('ssg-auto_word'));
                        show(document.getElementById('ssg-common_search_word'));
                    }
                }
            },
            watch : function(){
                var _v = document.getElementById('ssg_hash_query').value;
                var _s = document.getElementById('ssg_hash_query_sub').value;
                if(_v.trim() != _s.trim()){
                    if(_v.trim()!=''){
                        try{
                            if(!hasClassByName(document.getElementById('search_hash_box'), 'search_inp_tx')){
                                addClassByName(document.getElementById('search_hash_box'), 'search_inp_tx');
                            }
                        }catch(e){}
                        document.getElementById('ssg_hash_query_sub').value = document.getElementById('ssg_hash_query').value;
                        callJsonp(ssg_hash_trigger.recomtag, _v);
                    }else{
                        try{
                            if(hasClassByName(document.getElementById('search_hash_box'), 'search_inp_tx')){
                                removeClassByName(document.getElementById('search_hash_box'), 'search_inp_tx');
                            }
                        }catch(e){}
                        document.getElementById('ssg-auto_list').innerHTML = '';
                        hide(document.getElementById('search_query'));
                        hide(document.getElementById('ssg-common_search_word'));
                        show(document.getElementById('search_hash_box'));
                        show(document.getElementById('search_hash_area'));
                    }
                }
                ssg_hash_trigger.properties.tid = setTimeout(function(){
                    ssg_hash_trigger.watch();
                },400);
            },
            unwatch : function(tid){
                clearTimeout(tid);
            }
        }
    }

    var ssgTrigger = {
        id   : 'ssg-query',
        sub  : 'ssgQuerySub',
        ad   : 'ssgQueryBanrTarget',
        tagSize : 0,
        isFirst :  true,
        /* 최근검색어, 자주찾은 검색어 영역 */
        mbrkwd : {
            url : function(){return 'http://'+settings.domain.ssg+'/searchKeyWordJsonp.ssg';},
            callback : function(data){
                /* 태그검색창 전환으로 검색어가 지워졌을 경우 방어처리 */
                var disp = document.getElementById('search_hash_area').style.display;
                if(disp != 'none'){
                    return;
                }
                /* 자주찾은 검색어 영역 보이기 */
                show(document.getElementById('ssg-common_search_word'));
                show(document.getElementById('ssg-mbr-wrap-area'));
                hide(document.getElementById('ssg-auto_word'));
                var mbrTgt = document.getElementById('ssg-recent_search');
                var frqTgt = document.getElementById('ssg-often_search');
                var loginYn = data.loginYn;
                var mbrList = data.mbrKeyWordList;
                var frqList = data.myFreqKeywordList;
                var idx = 0;

                /* 영역 초기화 */
                mbrTgt.innerHTML = '';
                frqTgt.innerHTML = '';

                /* 와이즈로그 파라미터 */
                var lateLogParam = '&src_area=late';
                var feqLogParam = '&src_area=freq';

                globalSsgMbrList = data.mbrKeyWordList;
              
                /* 최근 검색어 영역 시작 */
                /* 최근 검색어가 존재할 경우에는 최근검색어를 보여준다. */
                if(mbrList && mbrList.length > 0){
                    var size = mbrList.length > 10 ? 10 : mbrList.length;

                    for(var j=0;j<size;j++){
                        var mbr = mbrList[j];
                        var linkUrl = '';
                        var title = '';
                        if(mbr.siteNo == '6005'){
                            title = mbr.srchwdDtlc;
                            linkUrl = 'http://' + settings.domain.ssg+'/search.ssg?target=all&query=' + encodeURIComponent(mbr.srchwdDtlc)+lateLogParam;
                            var acHtml = '<li><a title="'+mbr.srchwdDtlc+'" href="'+linkUrl+'"><span title="'+title+'">'+title+'</span></a><button type="button" onclick="javascript:ssgTrigger.mbrDel(event,'+mbr.srchSeq+')" class="btn_del">삭제</button></li>';
                            mbrTgt.innerHTML = mbrTgt.innerHTML + acHtml;
                            idx++;
                        }
                    }
                }
                /* 최근검색어가 없는 경우 검사 */
                if(!mbrList || mbrList==null || mbrList.length<1 || idx <1){
                    show(document.getElementById('ssg-late_nodate'));
                    hide(document.getElementById('ssg-btn_late_clear'));
                }

                /* 자주 찾은 검색어 영역 시작 */
                if(frqList && frqList.length>0){
                    var idx = 0;
                    for(var x=0;x<frqList.length;x++){
                        if(idx <= 10){
                            var frq = frqList[x];
                            var linkUrl = '';
                            var title = '';
                            var frqHtml = '';
                            if(frq.siteNo == '6005'){
                                title = frq.srchwdDtlc;
                                linkUrl = settings.domain.ssg+'/search.ssg?query=' + encodeURIComponent(frq.srchwdDtlc)+feqLogParam;
                                frqHtml = '<li><a href="http://'+linkUrl+'">'+title+'</a><span class="num">'+commify(frq.srchCnt)+'회</span></li>';
                                frqTgt.innerHTML = frqTgt.innerHTML + frqHtml;
                                idx++;
                            }
                        }
                    }
                }
                /* 자주 찾은 검색어가 없는 경우 검사 */
                if(!frqList || frqList==null || frqList.length<1){
                    if(loginYn!='Y'){
                        show(document.getElementById('ssg-login_nodate'));
                        hide(document.getElementById('ssg-btn_often_clear'));
                        frqTgt.innerHTML = '';
                    }else{
                        show(document.getElementById('ssg-often_nodate'));
                        hide(document.getElementById('ssg-btn_often_clear'));
                        frqTgt.innerHTML = '';
                    }
                }
            }
        },
        /* 검색어 삭제 관련작업 */
        btnHandle : function(e, obj){
            e.preventDefault();
            var type = obj.getAttribute("data-value");
            var param = {
                url : function(){ return 'http://'+settings.domain.ssg+'/searchKeyWordDeleteSiteJsonp.ssg?siteNo=6005&type=' + type; },
                callback : function(){
                    callJsonp(ssgTrigger.mbrkwd);
                }
            };
            callJsonp(param);
        },
        /* 삭제버튼 */
        mbrDel : function(e,s){
            e.preventDefault();
            var param = {
                url : function(){ return 'http://'+settings.domain.ssg+'/searchKeyWordDeleteJsonp.ssg?srchSeq='+s; },
                callback : function(data){
                    callJsonp(ssgTrigger.mbrkwd);
                }
            };
            callJsonp(param);
        },
        /* 마우스 클릭 이벤트 */
        click : function(idx){
            var q = document.getElementById(ssgTrigger.id).value;
            var a = document.getElementById(ssgTrigger.ad).value;
            if(a.trim()!=''){
                document.getElementById(ssgTrigger.id).value = '';
                document.getElementById(ssgTrigger.ad).value = '';
                q = '';
            }
            /* filterSite optioin 이 열려있는 경우 */
            if(hasClass('ssg_toggle_select','active')){
                removeClass('ssg_toggle_select','active');
                removeClass('ssg_toggle_option','active');
                hide(document.getElementById('ssg_toggle_option'));
            }

            if(this.isFirst) {
                this.isFirst = false;
                this.setGloblaMbrList();
            }

            if(q.trim()!=''){
                /* 추천검색어 결과가 존재할때만 다시 켜도록 한다. */
                if(document.getElementById('ssg-auto_list').childNodes.length>0){
                    var disp = document.getElementById('ssg-auto_word').style.display;
                    if(disp!='none'){
                        show(document.getElementById('ssg-common_search_word'));
                        show(document.getElementById('ssg-auto_word'));
                        hide(document.getElementById('ssg-mbr-wrap-area'));
                    }else{
                        show(document.getElementById('ssg-mbr-wrap-area'));
                        hide(document.getElementById('ssg-auto_word'));
                    }
                }else{
                    var disp = document.getElementById('ssg-shrtc_target').style.display;
                    if(disp!='none'){
                        callJsonp(ssgTrigger.autocmp, q);
                    }
                }
            }else{
                callJsonp(ssgTrigger.mbrkwd);
            }
            return -1;
        },
        /* 현재 보이고 있는 혹은 살아있는 검색창 영역을 리턴한다. */
        getLiveTarget : function(){
            if(document.getElementById('ssg-auto_word').style.display != 'none'){
                return 'ssg-auto_list';
            }else if(document.getElementById('ssg-mbr-wrap-area').style.display != 'none'){
                return 'ssg-mbr-wrap-area';
            }
        },
        /* 현재 선택된 div 영역을 리턴한다. */
        getSelectedTarget : function(){
            var recents = document.getElementById('ssg-recent_search').childNodes;
            var oftens = document.getElementById('ssg-often_search').childNodes;
            if(recents.length > 0){
                for(var i=0;i<recents.length;i++) {
                    if(recents[i].getAttribute('class') == 'on'){
                        return 'ssg-recent_search';
                        break;
                    }
                }
            }
            if(oftens.length > 0){
                for(var i=0;i<oftens.length;i++) {
                    if(oftens[i].getAttribute('class') == 'on'){
                        return 'ssg-often_search';
                        break;
                    }
                }
            }
        },
        getLiveElement : function(idx, h_idx){
            /* 현재 살아있는 suggest를 찾는다. */
            var li = document.getElementById(ssgTrigger.getLiveTarget()).childNodes;
            var liveTgt = ssgTrigger.getLiveTarget();
            /* 현재 살아있는 suggest 가 최근검색어/자주찾은 검색어 일때 */
            if(liveTgt == 'ssg-mbr-wrap-area'){
                if(h_idx == 0){
                    li = document.getElementById('ssg-recent_search').childNodes;
                }else if(h_idx == 1){
                    li = document.getElementById('ssg-often_search').childNodes;
                }
            } else if(liveTgt == 'ssg-auto_list' && document.getElementById('ssg-tag_list')){
                var tagSize = document.getElementById('ssg-tag_list').childNodes.length;
                var tempLi = [];
                if(li.length > 0 && tagSize > 0) {
                    for(var i=0;i<li.length-tagSize;i++) {
                        tempLi.push(li[i]);
                    }
                    li = tempLi;
                }
            }

            return li;
        },
        setLiveElement : function(li, idx, h_idx){
            var liveTgt = ssgTrigger.getLiveTarget();
            /* 최근검색어 / 자주찾은검색어는 반대편을 모두 지워주는 액션을 추가한다. */
            if(liveTgt == 'ssg-mbr-wrap-area'){
                if(h_idx == 0){
                    var oppo_li = document.getElementById('ssg-often_search').childNodes;
                    for(var i=0;i<oppo_li.length;i++) {
                        oppo_li[i].setAttribute('class', '');
                    }
                }else if(h_idx == 1){
                    var oppo_li = document.getElementById('ssg-recent_search').childNodes;
                    for(var i=0;i<oppo_li.length;i++) {
                        oppo_li[i].setAttribute('class', '');
                    }
                }
            }

            for(var i=0;i<li.length;i++) {
                if(h_idx==0){
                    if(idx == i){
                        li[i].setAttribute('class', 'on');
                        var nodeLen = li[i].childNodes[0].childNodes.length;
                        var title = li[i].childNodes[0].childNodes[0].getAttribute('title');
                        if(nodeLen >1){
                            title = li[i].childNodes[0].childNodes[1].getAttribute('title');
                        }
                        document.getElementById('ssgQuerySub').value = title;
                        document.getElementById(ssgTrigger.id).value = title;
                        if(li[i].childNodes.length > 1){
                            li[i].childNodes[1].style.display = 'block';
                            appendClass("ssg-auto_word", "ad_showing");
                        }
                    }else{
                        li[i].setAttribute('class', '');
                        if(li[i].childNodes.length > 1){
                            li[i].childNodes[1].style.display = 'none';
                            removeClass("ssg-auto_word", "ad_showing");
                        }
                    }
                }else{
                    if(idx == i){
                        li[i].setAttribute('class', 'on');
                        var title = li[i].childNodes[0].innerText;
                        document.getElementById('ssgQuerySub').value = title;
                        document.getElementById(ssgTrigger.id).value = title;
                        if(li[i].childNodes.length > 1){
                            li[i].childNodes[1].style.display = 'block';
                        }
                    }else{
                        li[i].setAttribute('class', '');
                        if(li[i].childNodes.length > 1){
                            li[i].childNodes[1].style.display = 'none';
                        }
                    }
                }
            }
            return [idx, h_idx];
        },
        getVerticalIndex : function(idx, h_idx){
            var liveTgt = ssgTrigger.getLiveTarget();
            /* 현재 살아있는 suggest 가 최근검색어/자주찾은 검색어 일때 */
            if(liveTgt == 'ssg-mbr-wrap-area'){
                var tgt_length = document.getElementById('ssg-recent_search').childNodes.length-1;
                /* 이동 대상이 자주찾은 검색어 */
                if(h_idx == 1){
                    tgt_length = document.getElementById('ssg-often_search').childNodes.length-1;
                }
                if(idx > tgt_length){
                    idx = tgt_length;
                }
            }
            return idx;
        },
        /* 키보드 이벤트 엔터키 */
        enter : function(idx){
            var q = document.getElementById(ssgTrigger.id).value;
            var a = document.getElementById(ssgTrigger.ad).value;
            /* 좌측 : 텍스트 배너가 존재하는 케이스  */
            /* 우측 : 이미지 배너가 존재하는 케이스  */
            if((a.trim()!='' && a == q) || ((document.getElementById('ssg-query').style.background).indexOf(settings.cdn.cdnDomain)>-1)){
                document.location.href = document.getElementById('ssgQueryBanrUrl').value;
            }else{
                if(q.trim()!=''){
                    var url = shrtc('6005',q,'10');
                    if(url!=""){
                        window.open(url);
                        return false;
                    }else{
                        var div = ssgTrigger.getLiveTarget();
                        var filterSiteNo = document.getElementById('ssgFilterSiteNo').value;
                        var logParam ='';
                        if(settings.domain.isHttpFlag){
                            if(div == 'ssg-mbr-wrap-area'){ //최근,자주찾은 검색어
                                var ul = ssgTrigger.getSelectedTarget();
                                if(ul =='ssg-recent_search'){//최근검색어
                                    logParam ='&src_area=late';
                                }else if(ul =='ssg-often_search'){
                                    logParam ='&src_area=freq';
                                }
                            }else if(div =='ssg-auto_list'){
                                var li = document.getElementById(ssgTrigger.getLiveTarget()).childNodes;
                                for(var i=0;i<li.length;i++) {
                                    if(li[i].getAttribute('class') == 'on'){
                                        logParam ='&src_area=recom';
                                        break;
                                    }
                                }
                            }
                        }

                        if(filterSiteNo!='' && filterSiteNo!='undefined' && filterSiteNo!='0'){
                            document.location.href = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent(q)+'&filterSiteNo='+filterSiteNo+logParam;
                        }else{
                            document.location.href = 'http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent(q)+logParam;
                        }
                    }
                    return idx;
                }else{
                    alert("검색어를 입력하세요.");
                    return false;
                }

            }
        },
        /* 키보드 이벤트 상승 */
        up	: function(idx, h_idx){
            var li = ssgTrigger.getLiveElement(idx, h_idx);
            if(idx>0){
                idx--;
            }else if(idx==0){
                idx = li.length-1;
            }
            return ssgTrigger.setLiveElement(li, idx, h_idx);
        },
        /* 키보드 이벤트 하강 */
        down  : function(idx, h_idx){
            var li = ssgTrigger.getLiveElement(idx, h_idx);

            if(idx<li.length-1){
                idx++;
            }else{
                idx = 0;
            }
            return ssgTrigger.setLiveElement(li, idx, h_idx);
        },
        /* 키보드 이벤트 우측
         *  0 Left
         *  1 Right
         * */
        left : function(idx, h_idx){
            /* 최근검색어/자주찾은 검색어가 모두 있을때에만 이벤트가 실행되고 그 외에는 실행되지 않음 */
            if(ssgTrigger.getLiveTarget() == 'ssg-mbr-wrap-area'){
                var a_len = document.getElementById('ssg-recent_search').childNodes.length;
                var b_len = document.getElementById('ssg-often_search').childNodes.length;
                if(a_len > 0 && b_len > 0){
                    h_idx = 0;
                    idx = ssgTrigger.getVerticalIndex(idx, h_idx);
                    var li = ssgTrigger.getLiveElement(idx, h_idx);
                    return ssgTrigger.setLiveElement(li, idx, h_idx);
                }
            }
            return [idx, h_idx];
        },
        /* 키보드 이벤트 좌측 */
        right : function(idx, h_idx){
            /* 최근검색어/자주찾은 검색어가 모두 있을때에만 이벤트가 실행되고 그 외에는 실행되지 않음 */
            if(ssgTrigger.getLiveTarget() == 'ssg-mbr-wrap-area'){
                var a_len = document.getElementById('ssg-recent_search').childNodes.length;
                var b_len = document.getElementById('ssg-often_search').childNodes.length;
                if(a_len > 0 && b_len > 0){
                    h_idx = 1;
                    idx = ssgTrigger.getVerticalIndex(idx, h_idx);
                    var li = ssgTrigger.getLiveElement(idx, h_idx);
                    return ssgTrigger.setLiveElement(li, idx, h_idx);
                }
            }
            return [idx, h_idx];
        },
        /* 자동완성 광고 영역 */
        advertise : {
            query : "",
            url : function(v){
                this.query = (v || "").toLowerCase();
                return 'http://'+settings.domain.advertise+'/WNRun.do?' + 'datatype=jsonp'+ '&convert=fw'+ '&target=ad-ssg' + '&query=' + encodeURIComponent(this.query);
            },
            callback : function(data){
                if(data.result && data.result[0]){
                    var items = data.result[0].items;
                    if(items.length>0){
                        var tgtLi	 = document.getElementById('ssg-auto_list').childNodes;
                        if(tgtLi && tgtLi.length>0){
                            var isFirstAd = true;
                            for(var l=0;l<tgtLi.length;l++){
                                var li = tgtLi[l];
                                var title = li.childNodes[0].childNodes[0].getAttribute('title');
                                for(var a=0;a<items.length;a++){
                                    var item = items[a];
                                    var linkname = item.linkname;
                                    var itemid = '';
                                    var itemname = '';
                                    var sellprc = '';
                                    if(linkname.indexOf(';')>-1){
                                        var objs 	= linkname.split(';');
                                        itemid 		= objs[0];
                                        itemname 	= objs[1];
                                        sellprc 	= commify(objs[2]);
                                    }
                                    var linkurl = item.linkurl;
                                    var keyword = item.keyword;
                                    if(keyword == title){
                                        li.setAttribute('class', 'ssg-ad_keyword');
                                        li.childNodes[0].setAttribute('class', 'match');
                                        var ad_div = document.createElement('div');
                                        ad_div.setAttribute('class', 'ad');
                                        var trans = "this.onerror=null;this.src=\'" + settings.cdn.trans +"?src=/ui/ssg/img/common/img_ready_500x500.jpg&w=202&h=202\'";
                                        var adHtml = '';
                                        adHtml += '	<div class="ad_thmb">';
                                        adHtml += '		<a href="http://'+ settings.domain.ssg + '/item/itemView.ssg?itemId=' + itemid +'&src_area=layerad" class="link"><img src="'+ settings.cdn.itemPath + linkurl +'" alt="" onerror="' +trans +'"></a>';
                                        adHtml += '			<div class="tt_adinfo_n">';
                                        adHtml += '			<a href="#" class="btn_tt_adinfo">광고</a>';
                                        adHtml += '				<div class="tt_adinfo_layer">';
                                        adHtml += '					<span class="bg_adinfo">&nbsp;</span>검색어와 관련된 상품으로<br>입찰가순으로 전시됩니다. ';
                                        adHtml += '				</div>';
                                        adHtml += '			</div>';
                                        adHtml += '	</div>';
                                        adHtml += '	<div class="ad_detail">';
                                        adHtml += '		<a href="http://'+ settings.domain.ssg + '/item/itemView.ssg?itemId=' + itemid +'&src_area=layerad" class="link">';
                                        adHtml += '			<span class="tx">'+itemname+'</span>';
                                        adHtml += '			<span class="price"><em>'+sellprc+'</em>원</span>';
                                        adHtml += '		</a>';
                                        adHtml += '	</div>';
                                        ad_div.innerHTML = adHtml;
                                        if(isFirstAd){
                                            appendClass("ssg-auto_word", "ad_showing");
                                            ad_div.style.display = 'block';
                                            isFirstAd = false;
                                        }
                                        li.appendChild(ad_div);
                                    }
                                }
                            }
                            /* 광고가 존재하는 경우 event를 새로 bind 할 필요가 있음 */
                            var li = document.getElementById('ssg-auto_list').childNodes;

                            // 광고 상품 순서 변경
                            var liArr = [];

                            for(var i=0;i<li.length;i++) {
                                liArr.push(li[i].cloneNode(true));
                            }

                            liArr = _.sortBy(liArr, function(o) {
                                return o.getAttribute('class') == 'ssg-recent_keyword' ? 1 : o.getAttribute('class') == 'ssg-ad_keyword' ? 2 : 3;
                            });

                            document.getElementById('ssg-auto_list').innerHTML = '';

                            for(var i=0;i<liArr.length;i++) {
                                document.getElementById('ssg-auto_list').appendChild(liArr[i]);
                            }

                            li = document.getElementById('ssg-auto_list').childNodes;

                            for(var i=0;i<li.length;i++) {
                                if(li[i].childNodes.length>1){
                                    li[i].onmouseover  = function(){
                                        appendClass("ssg-auto_word", "ad_showing");
                                        this.childNodes[1].style.display = 'block';
                                    };
                                }else{
                                    li[i].onmouseover  = function(){
                                        removeClass("ssg-auto_word", "ad_showing");

                                        var li = document.getElementById('ssg-auto_list').childNodes;
                                        for(var j=0;j<li.length;j++){
                                            if(li[j].childNodes.length>1){
                                                li[j].childNodes[1].style.display = 'none';
                                            }
                                        }
                                    };
                                }
                            }
                        }
                    }
                } else {
                    removeClass("ssg-auto_word", "ad_showing");
                }
            }
        },
        /* 자동완성 추천검색어 영역 */
        autocmp : {
            query : "",
            url : function(v){
                this.query = (v || "").toLowerCase();
                return 'http://'+settings.domain.ssgac+'/WNRun.do?' + 'datatype=jsonp'+ '&convert=fw'+ '&target=common-total' + '&query=' + encodeURIComponent(this.query);
            },
            callback : function(data){
                /* 자동완성 영역 추천검색어 준비 */
                var acsrchwd	 = document.getElementById('ssg-auto_list');
                acsrchwd.innerHTML = '';

                var logParam = '&src_area=recom';
                if(data.result && data.result[0]){
                    show(document.getElementById('ssg-common_search_word'));
                    show(document.getElementById('ssg-auto_word'));
                    show(document.getElementById('ssg-auto_list'));
                    hide(document.getElementById('ssg-mbr-wrap-area'));
                    var items = data.result[0].items;

                    var word_htmls = '';
                    var sortedItems = [];
                    var tempItems = [];

                    for(var j=0;j<globalSsgMbrList.length;j++) {
                        if(globalSsgMbrList[j].srchwdDtlc.indexOf("#") != 0 && globalSsgMbrList[j].srchwdDtlc.indexOf(this.query) > -1 && globalSsgMbrList[j].siteNo == '6005') {
                            var item = {
                                hkeyword : globalSsgMbrList[j].srchwdDtlc.replace(this.query, "<strong>" + this.query + "</strong>")
                                , keyword : globalSsgMbrList[j].srchwdDtlc
                                , regDt : globalSsgMbrList[j].regDt
                            };

                            sortedItems.push(item);
                        }
                    }

                    for(var i=0;i<items.length;i++) {
                        var duplicateArr = _.filter(sortedItems, function(obj){
                            return items[i].keyword == obj.keyword;
                        });

                        if(duplicateArr.length == 0) {
                            tempItems.push(items[i]);
                        }
                    }

                    sortedItems = sortedItems.concat(tempItems);

                    for(var k=0;k<sortedItems.length;k++){
                        if(k>=10){
                            break;
                        }

                        var item = sortedItems[k];
                        var keyword = item.keyword;
                        var regDt = item.regDt;
                        var hkeyword = item.hkeyword;
                        var isRecentKeyword = false;

                        if(item.count) {
                            hkeyword = item.hkeyword.replace('<font style=\'font-size:12px\'>', '').replaceAll('<font style=\'color:#FF5B59\'>', '<strong>').replaceAll('</font>', '</strong>').replace(/<\/strong>$/, '');
                        } else {
                            isRecentKeyword = true;
                        }
                        word_htmls += '<li' + (isRecentKeyword ? ' class="ssg-recent_keyword"' :'') +'>'+'<a href="http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent(keyword)+ logParam + '" ><span title="'+keyword+'">'+hkeyword+ '<em class="word_date">'+ (regDt || "" ) + '</em></span></a></li>';
                    }

                    if(word_htmls.trim()!=''){
                        acsrchwd.innerHTML = word_htmls + acsrchwd.innerHTML;
                    }

                    if(document.getElementById(ssgTrigger.id).value) {
                        callJsonp(ssgTrigger.advertise, document.getElementById(ssgTrigger.id).value);
                    }
                }else{
                    hide(document.getElementById('ssg-auto_word'));
                }
            }
        },
        /* 자동완성 추천태그 영역 */
        recomtag : {
            query : "",
            url : function(v){
                this.query = (v || "").toLowerCase();
                return 'http://'+settings.domain.advertise+'/WNRun.do?' + 'datatype=jsonp'+ '&convert=fw'+ '&target=tag-ssg' + '&query=' + encodeURIComponent(this.query);
            },
            callback : function(data){
                var ul = document.getElementById('ssg-tag_list');
                if(ul) {
                    ul.outerHTML = '';
                }

                ul = document.createElement('ul');
                ul.setAttribute("class", "tag_list");
                ul.setAttribute("id", "ssg-tag_list");

                if(data.result && data.result[0]){
                    var items = data.result[0].items;
                    var tag_htmls = '';

                    var sortedItems = [];
                    var tempItems = [];

                    for(var j=0;j<globalSsgMbrList.length;j++) {
                        if(globalSsgMbrList[j].srchwdDtlc.indexOf("#") == 0 && globalSsgMbrList[j].srchwdDtlc.indexOf(this.query) > -1 && globalSsgMbrList[j].siteNo == '6005') {
                            var item = {
                                hkeyword : globalSsgMbrList[j].srchwdDtlc.replace("#","").replace(this.query, "<strong>" + this.query + "</strong>")
                                , keyword : globalSsgMbrList[j].srchwdDtlc.replace("#","")
                                , regDt : globalSsgMbrList[j].regDt
                            };

                            sortedItems.push(item);
                        }
                    }

                    for(var i=0;i<items.length;i++) {
                        var duplicateArr = _.filter(sortedItems, function(obj){
                            return items[i].keyword == obj.keyword;
                        });

                        if(duplicateArr.length == 0) {
                            tempItems.push(items[i]);
                        }
                    }

                    sortedItems = sortedItems.concat(tempItems);

                    for(var t=0;t<sortedItems.length;t++){
                        if(t>=4){
                            break;
                        }
                        var item = sortedItems[t];
                        var keyword = item.keyword;
                        var regDt = item.regDt;

                        var hkeyword = item.hkeyword;

                        if(item.count) {
                            hkeyword = item.hkeyword.replace('<font style=\'font-size:12px\'>', '').replaceAll('<font style=\'color:#FF5B59\'>', '<strong>').replaceAll('</font>', '</strong>').replace(/<\/strong>$/, '');
                        }
                        tag_htmls += '<li><a href="http://'+settings.domain.ssg+'/search.ssg?target=all&query='+encodeURIComponent('#'+keyword)+'&srch_area=recomtag"><span title="'+keyword+'">#'+hkeyword+'<em class="word_date">'+ (regDt || "" ) + '</em></span></a></li>';
                    }

                    if(tag_htmls.trim()!=''){
                        ul.innerHTML += tag_htmls;
                    }

                    if(document.getElementById("ssg-word_list")) {
                        document.getElementById("ssg-word_list").insertAdjacentElement("afterend", ul);
                    }
                }
            }
        },
        /* 자동완성 바로가기 영역 */
        shrtc : {
            query : "",
            url : function(v){
                this.query = (v || "").toLowerCase();
                return 'http://'+settings.domain.ssgshrt+'/WNRun.do?' + 'datatype=jsonp'+ '&convert=fw'+ '&target=pc-shortcut-total' + '&query=' + encodeURIComponent(this.query);
            },
            callback : function(data){
                var shrtc = document.getElementById('ssg-shrtc_target');
                shrtc.innerHTML = '';
                var shortcutHtml = '';
                if(data.result && data.result[0]){
                    var items = data.result[0].items;
                    if(items.length>0){
                        var itemIdx = 0;

                        var shrtcObj = _.filter(items, function(obj){
                            return obj.banrurl=='' && ( obj.mediacd=='' || obj.mediacd=='00' || obj.mediacd == '10');
                        });

                        if(shrtcObj && shrtcObj.length>0){
                            show(document.getElementById('ssg-auto_word'));
                            show(shrtc);
                            var li = document.getElementById('ssg-auto_list').childNodes;
                            if(li.length < 1){
                                hide(document.getElementById('ssg-auto_list'));
                            }else{
                                show(document.getElementById('ssg-auto_list'));
                            }
                            for(var j=0;j<shrtcObj.length;j++){
                                var item = shrtcObj[j];
                                var symbol = item.linkurl.indexOf("?") > -1 ? "&" : "?";
                                shortcutHtml = "<a href='"+item.linkurl+symbol+"src_area=ssgshortcut'><strong>"+item.linkname+"</strong></a>";
                                if(itemIdx<1)shrtc.innerHTML = shrtc.innerHTML + shortcutHtml;
                                itemIdx++;
                            }
                        }else{
                            hide(shrtc);
                        }
                    }else{
                        hide(shrtc);
                    }
                }else{
                    hide(shrtc);
                }
            }
        },
        setGloblaMbrList : function(){
            // 최근찾은 검색어 미리 가져오기
            var param = {
                url : function(){return '/searchKeyWord.ssg?siteNo=6005';},
                callback : function(data){
                    globalSsgMbrList = data.mbrKeyWordList;
                }
            };

            callAjaxSync(param);
        }
    };

    acTrigger(ssgTrigger);
}
