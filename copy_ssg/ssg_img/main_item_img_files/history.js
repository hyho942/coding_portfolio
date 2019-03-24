/**
 * 히스토리 관련 공통 스크립트
 *  - resource.front
 */

var historySsgDomainObj = ssg.domain;
var historySsg = {
	skyscaper : null
	,
	initHistory : function() {
    	historySsg.reInitHistoryAction = false;
        historySsg.createHistory();
	},
	reInitHistoryAction : false
	,
	reInitHistory : function() {
		if ( $("ul.history_list").size() == 1 && !settings.isMobile ) {
			historySsg.reInitHistoryAction = true;
			historySsg.createHistory();
		}
	},
	property : {
		"isNotEmergencyDisabling": true,
		"historyCntPerPage" : 50,
		"historyCntMax" : 100
	},
	// 타입별 URL정보
	pageUrl : {
		item    : "/item/itemView.ssg",
		dealItem : "/item/dealItemView.ssg",
		ctg     : "/disp/category.ssg",
		plan    : "/plan/planShop.ssg",
        wow     : "/plan/wow.ssg",
        derby   : "/plan/derby.ssg",
        star   : "/plan/starBrand.ssg",
        life   : "/contents/lifeMagazine.ssg",
        recipe : "/recipe/recipe/detail.ssg",	// 레시피 미정
        shop   : "/plan/shopAttack.ssg",
        brand   : "/disp/brandShop.ssg",	// BN MO 동일
        brand_sm_mo : "/disp/brandMain.ssg",
        store	: "/store/specialShop.ssg",	// 스타필드매장
        event   : "/event/eventDetail.ssg",
        search	: "/search.ssg"
	},

    // 사이트별 정보
    siteInfo : {
        "6001" : {
            name        : "이마트몰",
            iconClass   : "emart",
            iconClassMo : "em",
            domain      : historySsgDomainObj.emart
        },
        "6002" : {
            name        : "트레이더스",
            iconClass   : "traders",
            iconClassMo : "tr",
            domain      : historySsgDomainObj.traders
        },
        "6003" : {
            name        : "부츠",
            iconClass   : "boots",
            iconClassMo : "bt",
            domain      : historySsgDomainObj.boots
        },
        "6004" : {
            name        : "신세계몰",
            iconClass   : "ssgmall",
            iconClassMo : "sm",
            domain      : historySsgDomainObj.small
        },
        "6005" : {
            name        : "SSG.COM",
            iconClass   : "ssg",
            iconClassMo : "ssg",
            domain      : historySsgDomainObj.ssg
        },
        "6009" : {
            name        : "신세계백화점",
            iconClass   : "sd",
            iconClassMo : "sd",
            domain      : historySsgDomainObj.sdept
        },
        "6100" : {
            name        : "하우디",
            iconClass   : "hwd",
            iconClassMo : "hwd",
            domain      : historySsgDomainObj.howdy
        },
        "6200" : {
            name        : "신세계TV쇼핑",
            iconClass   : "tv",
            iconClassMo : "tv",
            domain      : historySsgDomainObj.tv
        },
        "6300" : {
            name        : "S.I.VILLAGE",
            iconClass   : "si",
            iconClassMo : "si",
            domain      : historySsgDomainObj.sivillage
        },
        "6400" : {
            name        : "STARFIELD",
            iconClass   : "sf",
            iconClassMo : "sf",
            domain      : historySsgDomainObj.starfield
        }
    },

    setToday : function(val) {
        var dateTime = val.split(" ");
        var date = dateTime[0].split(".");
        var time = dateTime[1].split(":");
        this.today = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
    },

    getToday : function() {
        return this.today;
    },

    // 히스토리 전체삭제
    deleteHistoryAll : function() {
    	if (confirm("전체 최근 본 쇼핑정보를 삭제하시겠습니까?")) {
    		$('.cmhistory_loading').show();
	    	$.ajax({
	            url : "/comm/ajaxDeleteHistoryAll.ssg",
	            cache : false,
	            dataType : "json",
	            data : { 'srchDivCd' : settings.isMobile ? '' : $('.sky_haeder > select').find('option:selected').attr('data-srchDivCd') },
	            success : function(data) {
	            	if (data.resultCode == '0000') {
	            		// 성공
	            		historySsg.renderAfterDeleteAll();
	            	} else {
	            		// 실패
	            		alert("최근 본 쇼핑정보 전체삭제 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.");
	            	}
	            },
	            error : function(e) {
	            	alert("최근 본 쇼핑정보 전체삭제 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.");
	            },
	            complete : function() {
	            	$('.cmhistory_loading').hide();
	            }
	        });
    	}
    },

    renderAfterDeleteAll : function() {
		if (settings.isMobile) {
            $("#_cmhistory_scroll .cmhistory_lst > li").remove();
            $('.cmhistory_nodata').show();
            historySsg.refreshHistoryScroll();            
		} else {
			// for pc
			$("ul.history_list > li").remove();
			$("ul.history_list").html("<li class=\"history_txt\"><p class=\"history_txt\">\“<span>최근 본 쇼핑정보</span>가 없습니다.<br>최근 본 쇼핑정보를 만들어주세요.\”</p></li>");
			$('.sky_haeder strong.num').text("0");

			if ( $('.sky_haeder > select').val() != '' ) {
				// 선택한 항목이 있다면
				$('.sky_haeder > select').val('');
			}
		}
    },

    deleteAction : function(srchSeq) {
    	$liObj = $('li[id="history_'+srchSeq+'"]');

		var historyData = {
			srchSeq			: $liObj.find('input[name="srchSeq"]').val(),
			srchDivCd		: $liObj.find('input[name="srchDivCd"]').val(),
			siteNo  		: $liObj.find('input[name="siteNo"]').val(),
			srchTgtIdnfNo1  : $liObj.find('input[name="srchTgtIdnfNo1"]').val(),
			srchTgtIdnfNo2	: $liObj.find('input[name="srchTgtIdnfNo2"]').val(),
			srchwdDtlc		: $liObj.find('input[name="srchwdDtlc"]').val()
        };

		historySsg.deleteHistory(historyData);
    },

    // 히스토리 삭제
    deleteHistory : function(historyData) {
    	$.ajax({
            url : "/comm/ajaxDeleteHistory.ssg",
            cache : false,
            dataType : "json",
            data : historyData,
            success : function(data) {
            	if (data.resultCode == '0000') {
            		var liObj = settings.isMobile ? $("#_cmhistory_scroll .cmhistory_lst > li") : $("ul.history_list > li");
            		var cntObj = $('.sky_haeder strong.num');

            		// 삭제전 사이즈
            		var liSize = liObj.length;

            		// 성공
            		$('li[id="history_'+historyData.srchSeq+'"]').remove();
            		liSize--;

            		if ( !settings.isMobile ) {
            			$('#sr_ly').hide();
            		}

            		if ( liSize < 1 ) {
            			liSize = 0;
            			historySsg.renderAfterDeleteAll();
            		} else {
	            		// 삭제후 사이즈
            			if (!settings.isMobile) {
            				cntObj.text(liSize);
            			}
            		}
            	} else {
            		// 실패
            		alert("최근 본 쇼핑정보 삭제 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.");
            	}
            },
            error : function(e) {
            	alert("최근 본 쇼핑정보 삭제 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.");
            }
        });
    },
    
    // 히스토리 여러건 삭제
    deleteHistoryMulti: function() {
    	var delTgtHistArr = new Array();
    	var liObjArr = new Array();
    	
    	$('#_cmhistory_scroll').find('input[name=cmhistory_chk]:checked').each(function() {
    		var $liObj = $('#history_' + $(this).val());
    		var historyData = {
    				srchSeq			: $liObj.find('input[name="srchSeq"]').val(),
    				srchDivCd		: $liObj.find('input[name="srchDivCd"]').val(),
    				siteNo  		: $liObj.find('input[name="siteNo"]').val(),
    				srchTgtIdnfNo1  : $liObj.find('input[name="srchTgtIdnfNo1"]').val(),
    				srchTgtIdnfNo2	: $liObj.find('input[name="srchTgtIdnfNo2"]').val(),
    				srchwdDtlc		: $liObj.find('input[name="srchwdDtlc"]').val()
    	        };
    		delTgtHistArr.push(historyData);
    		liObjArr.push($liObj);
    	});
    	
		if (delTgtHistArr.length == 0) {
			alert('삭제할 쇼핑정보를 선택해주세요.');
			return;
		}
		
		$('.cmhistory_loading').show();
		$.ajax({
            url : "/comm/ajaxDeleteHistoryMulti.ssg",
            method: 'post',
            cache : false,
            dataType : "json",
            contentType : 'application/json',
            data : JSON.stringify(delTgtHistArr),
            success : function(data) {
            	if (data.resultCode == '0000') {
            		$.each(liObjArr, function(idx, obj) {
            			$(obj).remove();
            		});
            		historySsg.refreshHistoryScroll();
            	} else {
            		alert("최근 본 쇼핑정보 삭제 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.");
            	}
            },
            error : function(e) {
            	alert("최근 본 쇼핑정보 삭제 중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.");
            },
            complete : function() {
            	$('.cmhistory_loading').hide();
            }
        });
    },
    
    makeSalestrNm : function(shppSalestrNm) {
    	var salestrNm = shppSalestrNm;
    	var strIdx = salestrNm.indexOf('NE.O');

    	if ( strIdx > -1 ) {
    		salestrNm = 'emart ' + salestrNm.substring(strIdx, strIdx+8);
    	}
    	
    	return salestrNm;
    },

    // 현재 사용자의 히스토리 정보를 획득함
    createHistory : function() {
    	var data = {};

    	// object가 존재하면 data set
    	if (!(typeof historyInfoDto === 'undefined') && historyInfoDto != null) {
       		data = historyInfoDto;
       		historyInfoDto = null; // 재등록 방지
       		data.infloSiteNo = Clip.getInfloSiteNo();
       		if (data.infloSiteNo == '6101') {
       			data = {}; // thethowdy는 히스토리 생성안함
       		}
    	}
    	
    	if (settings.isMobile) {
    		// 모바일 검색구분코드 필터링
    		data.srchDivCds = $('.cmhistory_sort > li.on').map(function() {
	    			return $(this).data('srchDivCd');
	    		}).get().join(',');
    		
    		$('.cmhistory_loading').show();
    	}

		if ( historySsg.property.isNotEmergencyDisabling ) {
	        $.ajax({
	            url : "/comm/ajaxHistoryList.ssg",
	            cache : false,
	            dataType : "json",
	            data : data,
	            success : function(data) {
	            	var length = data.historyList.length;
	            	
	            	historySsg.setToday(data.today);

	            	if ( settings.isMobile ) {
	            		// for MO web
		                historySsg.makeHistoryHtmlMo(data.historyList, data.adultYn);
	            	} else if ( $("ul.history_list").size() == 1 ) {	// PC의 경우 우측 스카이스크레퍼가 있는 경우만 rendering
	            		// for PC
                        $('.sky_haeder strong.num').text("0");
                        historySsg.makeHistoryHtmlPC(data.historyList, data.adultYn);
                        
                        // #261746 - [쓱배송 살남자] 동영상 배너 스카이스크래퍼 적용 2017110 <= X < 20180301 on ssg/emart/traders/boots
						var currDateObj = new Date();
                        var currDate = currDateObj.getFullYear() + (currDateObj.getMonth() < 9 ? '0' : '') + (currDateObj.getMonth() + 1) + (currDateObj.getDay() < 10 ? '0' : '') + currDateObj.getDay()
                        var showSalNamLink = ( 20171030 <= parseInt(currDate) && parseInt(currDate) < 20180301 && (data.currSiteNo == '6005' || data.currSiteNo == '6001' || data.currSiteNo == '6002' || data.currSiteNo == '6003') );
                        var $showSalNamDiv = $('.sky_deliv_btnarea.ty_image');
						
                        if ( typeof data.currLoginYn == 'undefined' || data.currLoginYn == 'N' ) {
                        	// logout
                        	$('#_skyBefore').show();
                        	
                        	if ( showSalNamLink ) {
                        		$showSalNamDiv.show();
                        	}
                        } else if ( data.currLoginYn == 'Y' ) {
                        	// login
                        	var skyObj = $('#_skyAfter');
                        	
                        	skyObj.show();
                        	
                        	if ( data.currSiteNo == '6005' ) {
                        		// SSG에서 택배권역인 경우 아무것도 노출 하지 않음
                        		if ( data.salestrInfo.shppAreaType == '2' ) {
                        			// 이몰/부츠 쓱배송
                        			skyObj.find('.sky_deliv_tit').show();
                        			skyObj.find('.sky_deliv_lst').show();
                        			
                        			var skyEmPart = skyObj.find('#forEm');
                        			
                        			skyEmPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfo.shppSalestrNm));
    			                	skyEmPart.find('.sky_deliv_msg > a').html(data.salestrInfo.shppAreaDateMsg + data.salestrInfo.shppAreaDeliMsg2.replace(':00','시') + '<span class="ico_arr"></span>');
    			                	skyEmPart.show();
    			                	
    	                        	if ( showSalNamLink ) {
    	                        		$showSalNamDiv.show();
    	                        	}
                        		}
                        		
                        		if ( data.salestrInfoForTraders.shppAreaType == '2' ) {
                        			// 트레이더스 쓱배송
                        			skyObj.find('.sky_deliv_tit').show();
                        			skyObj.find('.sky_deliv_lst').show();   
                        			
                        			var skyTrPart = skyObj.find('#forTr');
                        			
                        			skyTrPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfoForTraders.shppSalestrNm.replace('TRADERS','').trim()));
									
									var traderMsg = '';
									
									if ( data.salestrInfoForTraders.shppAreaDateMsg == '' ) {
										traderMsg = data.salestrInfoForTraders.shppAreaDeliMsg;
									} else {
										traderMsg = data.salestrInfoForTraders.shppAreaDateMsg + data.salestrInfoForTraders.shppAreaDeliMsg2.replace(':00','시');
									}
									
                        			skyTrPart.find('.sky_deliv_msg > a').html(traderMsg + '<span class="ico_arr"></span>');
                        			skyTrPart.show();
                        			
                                	if ( showSalNamLink ) {
                                		$showSalNamDiv.show();
                                	}
                        		}
                        	} else if ( data.currSiteNo == '6001' ) {
                        		if ( data.salestrInfo.shppAreaType == '1' ) {
                        			// 점포택배
                        			var skyEmPart = skyObj.find('#forEmTakDev');
                        			
                        			skyEmPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfo.shppSalestrNm));
                        			
                        			skyEmPart.show();
                        		} else if ( data.salestrInfo.shppAreaType == '2' ) {
                        			// 이몰쓱배송
                        			var skyEmPart = skyObj.find('#forEmSsgDev');
                        			
                        			skyEmPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfo.shppSalestrNm));
    			                	skyEmPart.find('.sky_deliv_msg > a').html(data.salestrInfo.shppAreaDateMsg + data.salestrInfo.shppAreaDeliMsg2.replace(':00','시') + '<span class="ico_arr"></span>');
    			                	skyEmPart.show();
    			                	
    	                        	if ( showSalNamLink ) {
    	                        		$showSalNamDiv.show();
    	                        	}
                        		}                        		
                        	} else if ( data.currSiteNo == '6004' || data.currSiteNo == '6009' ) {
                        		// do nothing - 쓱배송 holding
                        	} else if ( data.currSiteNo == '6002' ) {
                        		if ( data.salestrInfoForTraders.shppAreaType == '1' ) {
                        			// 점포택배
                        			var skyTrPart = skyObj.find('#forTrTakDev');
                        			
                        			skyTrPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfoForTraders.shppSalestrNm.replace('TRADERS','').trim()));
                        			
                        			skyTrPart.show();                        			
                        		} else if ( data.salestrInfoForTraders.shppAreaType == '2' ) {
                        			// 트레이더스 쓱배송
                        			var skyTrPart = skyObj.find('#forTrSsgDev');
                        			
                        			skyTrPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfoForTraders.shppSalestrNm.replace('TRADERS','').trim()));
									
									var traderMsg = '';
									
									if ( data.salestrInfoForTraders.shppAreaDateMsg == '' ) {
										traderMsg = data.salestrInfoForTraders.shppAreaDeliMsg;
									} else {
										traderMsg = data.salestrInfoForTraders.shppAreaDateMsg + data.salestrInfoForTraders.shppAreaDeliMsg2.replace(':00','시');
									}
									
                        			skyTrPart.find('.sky_deliv_msg > a').html(traderMsg + '<span class="ico_arr"></span>');
                        			skyTrPart.show(); 
                        			
                                	if ( showSalNamLink ) {
                                		$showSalNamDiv.show();
                                	}
                        		}                        		
                        	} else if ( data.currSiteNo == '6003' ) {
                        		if ( data.salestrInfoForBoots.shppAreaType == '1' ) {
                        			// 점포택배
                        			var skyEmPart = skyObj.find('#forEmTakDev');
                        			
                        			skyEmPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfoForBoots.shppSalestrNm));
                        			
                        			skyEmPart.show();
                        		} else if ( data.salestrInfoForBoots.shppAreaType == '2' ) {
                        			// 부츠쓱배송
                        			var skyEmPart = skyObj.find('#forEmSsgDev');
                        			
                        			skyEmPart.find('.sky_deliv_place').html(historySsg.makeSalestrNm(data.salestrInfoForBoots.shppSalestrNm));
    			                	skyEmPart.find('.sky_deliv_msg > a').html(data.salestrInfoForBoots.shppAreaDateMsg + data.salestrInfoForBoots.shppAreaDeliMsg2.replace(':00','시') + '<span class="ico_arr"></span>');
    			                	skyEmPart.show();
    			                	
    	                        	if ( showSalNamLink ) {
    	                        		$showSalNamDiv.show();
    	                        	}
                        		}                       		
                        	}
                        } // end after login process
		                
		                if ( historySsg.reInitHistoryAction ) {
		                	skyScraperExpModule.slideUtil.slideApply(historySsg.skyscaper);
		                } else {
		                	historySsg.initSkyscraper();
		                }
	            	}
	            }
		    });
		} else {
			if ( !settings.isMobile ) {
				historySsg.initSkyscraper();
			}
		}
    },

    getLinkUrl : function(history, siteInfo) {
        var a = /\+/g, e = function (s) { return encodeURIComponent(s.replace(a, " ")); };

        var url = "http://" + siteInfo.domain;

        switch ( history.srchDivCd ) {
        case '10' :		// item
        	if ( history.dealItemYn == 'Y' ) {
        		url += (historySsg.pageUrl.dealItem + "?itemId=" + history.srchTgtIdnfNo1);
        	} else {
        		url += (historySsg.pageUrl.item + "?itemId=" + history.srchTgtIdnfNo1);
        	}

        	// #172873 - 모든 상품에 siteNo와 salestrNo를 추가
       		url += ("&siteNo="+ history.siteNo + "&salestrNo=" + history.salestrNo);

        	// #108459 - 상품의 경우 트래킹코드를 추가함
        	url += ('&tarea=history_' + settings.siteno.clip);
        	break;
        case '20' :		// category
       		url += (historySsg.pageUrl.ctg + "?ctgId=" + history.srchTgtIdnfNo1);
        	break;
        case '30' :		// planshop
        	url += (historySsg.pageUrl.plan + "?dispCmptId=" + history.srchTgtIdnfNo1);
        	break;
        case '32' :		// wow
        	url += (historySsg.pageUrl.wow + "?dispCmptId=" + history.srchTgtIdnfNo1);
        	break;
        case '35' :		// derby
        	url += (historySsg.pageUrl.derby);
        	break;
        case '36' :		// starbrand
        	url += (historySsg.pageUrl.star + "?dispCmptId=" + history.srchTgtIdnfNo1);
        	break;
        case '37' :		// life magazine
        	url += (historySsg.pageUrl.life + "?dispCmptId=" + history.srchTgtIdnfNo1);
        	break;
        case '38' :		// shop attack
        	url += (historySsg.pageUrl.shop + "?dispCmptId=" + history.srchTgtIdnfNo1);
        	break;
        case '39' :		// recipe
        	url += (historySsg.pageUrl.shop + "?dispCmptId=" + history.srchTgtIdnfNo1);
        	break;        	
        case '40' :		// brand
        	if ( settings.isMobile ) {
        		if ( history.siteNo == '6004' ) {
        			url += ('/mall' + historySsg.pageUrl.brand_sm_mo);
        		} else if ( history.siteNo == '6009' ) {
        			url += ('/dept' + historySsg.pageUrl.brand_sm_mo);
        		} else {
        			url += historySsg.pageUrl.brand;
        		}
        	} else {
        		url += historySsg.pageUrl.brand;
        	}
        	
    		url += ("?brandId=" + history.srchTgtIdnfNo1);

        	break;
        case '41' :		// 스타필드매장
        	url += (historySsg.pageUrl.store + "?shpgMgzId=" + history.srchTgtIdnfNo1 + "&strId=" + history.salestrNo);
        	break;
        case '50' :		// event
        	if ( !settings.isMobile ) {
        		if ( history.siteNo == '6002' ) {
	        		// PC 트레이더스의 경우 이벤스 상세 페이지가 없으므로 emart로 돌림
	        		url = "http://" + historySsg.siteInfo['6001'].domain;
        		}
        	}

        	url += (historySsg.pageUrl.event + "?promId=" + history.srchTgtIdnfNo1);
        	break;
        case '60' :		// search
        	// 신몰/신백 모바일만 prepath 있음
        	if ( settings.isMobile ) {
        		if ( history.siteNo == '6004' ) {
        			url += '/mall';
        		} else if ( history.siteNo == '6009' ) {
        			url += '/dept';
        		}
        	}

        	url += (historySsg.pageUrl.search + "?query=" + e(history.srchwdDtlc));

        	// PC tr/bn 추가 파라메터
        	if ( !settings.isMobile && ( history.siteNo == '6002' ) ) {
        		url += ("&filterSiteNo=" + history.siteNo);
        	}
        	break;
        default :
        	url = '';
        	break;
        }

        return url;
    },

    initSkyscraper : function() {
		// skyscaper handler
        if (typeof $.fn.skyscraper != 'undefined') {
            historySsg.skyscaper = $('#sky_scraper').skyscraper({
                afterInit : function(_this){
                    //추가 기능 호출
                    skyScraperExpModule.isSet({
                        slideULSelector : 'ul.history_list',
                        slideViewport:{
                            Selector : '.sky_content'
                        }
                    }, _this);
                }
            });
        };
    },

    jsonDataCheck : function(jsonValue, defaultValue) {
    	if ( jsonValue == null || jsonValue == 'null' ) {
    		return ( typeof defaultValue == 'undefined' ? '' : defaultValue );
    	} else {
    		return jsonValue;
    	}
    },

    makeHistoryInfo : function(hData) {
    	var html = [];
    	html.push("        <input type='hidden' name='srchSeq' value='"+hData.srchSeq+"'/>");
    	html.push("        <input type='hidden' name='srchDivCd' value='"+hData.srchDivCd+"'/>");
    	html.push("        <input type='hidden' name='siteNo' value='"+hData.siteNo+"'/>");
    	html.push("        <input type='hidden' name='srchTgtIdnfNo1' value='"+hData.srchTgtIdnfNo1+"'/>");
    	html.push("        <input type='hidden' name='srchTgtIdnfNo2' value='"+hData.srchTgtIdnfNo2+"'/>");
    	html.push("        <input type='hidden' name='srchwdDtlc' value='"+hData.srchwdDtlc+"'/>");
    	return html.join("");
    },

    makeHistoryHtmlPC : function(historyList, adultYn) {
        var length = historyList.length;
        var html = [];

        for (var i = 0 ; i < length; i++) {
            var h = historyList[i];
            if(h.title1 == null){
            	h.title1 = "";
            }
            
            var url = "";

            var iconClass = "";
            var iconName = "";
            var siteNo = ( h.srchDivCd == "10" ? h.infloSiteNo : h.siteNo );
            var siteInfo = this.siteInfo[siteNo];

            if (siteInfo != null) {
                iconClass = $.trim("icon_mall " + siteInfo.iconClass);
                iconName = siteInfo.name;
                url = this.getLinkUrl(h, siteInfo);

                switch(h.srchDivCd) {
                case "10" : // 상품
                	var brandNm = (h.title1 != '' && h.title1 != null && h.title1 != 'null' && h.title1 != '기타' && (h.siteNo == '6004' || h.siteNo == '6009' || h.siteNo == '6003') ? '['+h.title1+'] ' : '');
                	var itemNm = h.title2;

                    html.push("<li class='type_product"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                    html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                    html.push("    <div class='history_cont'>");
                    if (h.adultItemTypeCd == '10' && adultYn == 'N') {
                        html.push("        <div class='sky_thumbnail adult_only'>");
                        html.push("            <a href='" + url + "'>");
                        html.push("                <span class='blind'>19세 이상 구매가능</span>");
                        html.push("                <span class='img_hover'></span>");
                        html.push("            </a>");
                        html.push("        </div>");
                    } else {
                        html.push("        <div class='sky_thumbnail'>");
                        html.push("            <a href='" + url + "'>");
                        html.push("                <img src='" + getItemImgPath(h.srchTgtIdnfNo1, '50') + "' onerror=\"this.onerror=null;this.src='" + getItemNoImgPath('50') + "'\" alt='" + replaceSpecial(itemNm) + "'>");
                        html.push("                <span class='img_hover'></span>");
                        html.push("            </a>");
                        html.push("        </div>");
                    }
                    html.push("        <p class='txt blind_txt'>");
                    html.push('            <a href="' + url + '" class="notranslate">');
                    html.push('                <span class="brand">');
                    html.push('                    <em class="tx_ko">' + brandNm + '</em>');
                    html.push('                    <em class="tx_gl">' + brandNm + '</em>');
                    html.push('                </span>');
                    html.push('                <em class="tx_ko">' + itemNm + '</em>');
                    html.push('                <em class="tx_en">' + itemNm + '</em>');
                    html.push('                <em class="tx_zh">' + itemNm + '</em>');
                    html.push('            </a>');
                    if (!equalSell(h.sellPrc, h.dcSellPrc) && h.uItemSamePrcYn != 'N' && h.dealItemYn != 'Y') { // 최적가와 판매가가 같지 않을 경우 판매가 노출
                        html.push("            <del><strong class='blind'>판매가 : </strong><em class='ssg_price'>" + numberFormat(h.sellPrc) + "</em><span class='ssg_tx'>원</span></del>");
                    }
                    html.push("            <span class='applied'><strong class='blind'>할인적용가 : </strong><em class='ssg_price'>" + numberFormat(h.dcSellPrc) + "</em><span class='ssg_tx'>원" + (h.uItemSamePrcYn == 'N' ? '~' : '') + "</span></span>");
                    html.push("        </p>");
                    html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                    html.push("        </button>");
                    html.push(historySsg.makeHistoryInfo(h));
                    html.push("    </div>");
                    html.push("</li>");
                    break;
                    
                case "20" : // 카테고리
                    html.push("<li class='type_category"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                    html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                    html.push("    <div class='history_cont'>");
                    html.push("        <p class='txt'><a href='" + url + "' class='notranslate'>" + (h.title2 != "" ? "<span class='blind_txt'>" + h.title2.replace(/&amp;/gi, '&').replace(/&gt;/gi, '>') + "</span>" : "") + h.title1 + "</a></p>");
                    html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                    html.push("        </button>");
                    html.push(historySsg.makeHistoryInfo(h));
                    html.push("    </div>");
                    html.push("</li>");
                    break;
                    
                case "30" :     // 기획전
                case "32" :     // 와우2
                case "35" :     // 더비
                case "36" :     // 스타브랜드
                    html.push("<li class='type_exhibition"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                    html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                    html.push("    <div class='history_cont'>");
                    html.push("        <p class='txt'>");
                    html.push("            <a href='"+url+"'><span class='em blind_txt'>[기획전]</span> " + h.title1 + "</a>");
                    if (isEnd(h.title3)) {
                        html.push('<span class="event_end">종료</span>');
                    }
                    html.push("        </p>");
                    html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                    html.push("        </button>");
                    html.push(historySsg.makeHistoryInfo(h));
                    html.push("    </div>");
                    html.push("</li>");
                    break;
                
                case "40" : // 브랜드
                    html.push("<li class='type_brand"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                    html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                    html.push("    <div class='history_cont'>");
                    html.push("        <p class='txt'>");
                   	html.push("            <a href='" + url + "'><span class='em blind_txt'>[브랜드]</span> <span class='notranslate'>" + h.title1 + "</span></a>");
                    html.push("        </p>");
                    html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                    html.push("        </button>");
                    html.push(historySsg.makeHistoryInfo(h));
                    html.push("    </div>");
                    html.push("</li>");
                    break;
                    
                case "41" : // 스타필드
                	html.push("<li class='type_store"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                	html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                	html.push("    <div class='history_cont'>");
                	html.push("        <p class='txt'>");
                	html.push("            <a href='" + url + "'><span class='em blind_txt'>[매장]</span> " + h.title1 + "</a>");
                	html.push("        </p>");
                	html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                	html.push("        </button>");
                	html.push(historySsg.makeHistoryInfo(h));
                	html.push("    </div>");
                	html.push("</li>");
                    break;
                    
                case "50" : // 이벤트
                    html.push("<li class='type_event"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                    html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                    html.push("    <div class='history_cont'>");
                    html.push("        <p class='txt'>");
                    if (isEnd(h.title3)) {
                    	html.push("            <a href='javascript:alert(\"종료된 이벤트입니다.\");'><span class='em blind_txt'>[이벤트]&nbsp;</span>" + h.title1 + "</a><span class='event_end'>종료</span>");
                    } else {
                    	html.push("            <a href='" + url + "'><span class='em blind_txt'>[이벤트]</span> " + h.title1 + "</a>");
                    }
                    html.push("            <span class='date blind_txt'>" + getStartEndDt(getDateTime(h.title2, 0), getDateTime(h.title3, 0), " - ") + "</span>");
                    html.push("        </p>");
                    html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                    html.push("        </button>");
                    html.push(historySsg.makeHistoryInfo(h));
                    html.push("    </div>");
                    html.push("</li>");
                    break;
                    
                case "60" : // 검색어
                    html.push("<li class='type_search"+ (i==0 ? " chk_target" : "") +"' id='history_"+h.srchSeq+"'>");
                    html.push("    <span class='" + iconClass + "'>" + iconName + "</span>");
                    html.push("    <div class='history_cont'>");
                    html.push("        <p class='txt'><a href='" + url + "'><span class='search_txt'>[검색]</span> <span class='notranslate'>" + h.srchwdDtlc + "</span></a></p>");
                    html.push("        <button class=\"btn_history_del\" onclick=\"javascript:historySsg.deleteAction('"+h.srchSeq+"');\"><span class=\"blind\">최근 본 쇼핑정보 제거</span>");
                    html.push("        </button>");
                    html.push(historySsg.makeHistoryInfo(h));
                    html.push("    </div>");
                    html.push("</li>");
                    break;
                }
            }
        }
		
        if (html.length > 0) {
			if ( historySsg.reInitHistoryAction )  {
				$('ul.history_list').html('');
			}
			
            $("ul.history_list").html($("ul.history_list").html() + html.join(""));
            html = [];
            
            $('.sky_haeder > h3 > .num').text($('.history_list > li').length);
        }
    },

    makeClipInfoHtml : function(hData) {
    	var attnDivCd = '';
    	var attnDivDtlCd = '';
    	var srchDivNm = '';

    	switch(hData.srchDivCd) {
	    case "10" :     // 상품 - 전몰
	    	attnDivCd = '10';
	    	attnDivDtlCd = '10';	// 10:일반, 20:단골
	    	srchDivNm = '상품';
	    	break;
	    case "20" :     // 카테고리 - 전몰 #228529
    		attnDivCd = '20';
    		srchDivNm = '카테고리';
	    	break;
	    case "30" :     // 기획전 - 전몰
	    	srchDivNm = '기획전';
	    case "32" :     // 잇아이템
	    	srchDivNm = '기획전';
	    //case "35" :     // 더비
	    case "36" :     // 스타브랜드
	    	srchDivNm = '기획전';
	    case "38" :     // 매장습격
	    	attnDivCd = '40';
	    	srchDivNm = '기획전';
	    	break;
	    case "39" :     // 레시피
	    	attnDivCd = '80';
	    	attnDivDtlCd = '82';
	    	srchDivNm = '레시피';
	    	break;	    	
	   	case "40" :     // 브랜드 - 이마트/트레이더스
	   		if ( hData.siteNo != '6002' ) {
	   			attnDivCd = '30';
	   			attnDivDtlCd = '30';
	   		} 
	   		srchDivNm = '브랜드';
	    	break;
	   	case "50" :     // 이벤트 - 전몰 3/16 이후
	   		attnDivCd = '60'; // 전몰 3/16 이후
	   		srchDivNm = '이벤트'
	    	break;
	    case "37" :     // 라이프매거진
	   		attnDivCd = '80';
	   		attnDivDtlCd = '80';
	   		srchDivNm = '라이프매거진'
	    	break;
    	}

    	var html = [];
    	if (attnDivCd) {
    		html.push('<div class="cmhistory_bt_area">');
    		html.push('    <span class="cm_clip_cmhistory clip_off">');
    		html.push('        <a href="#" class="sel_clip" class="clickable" data-react-tarea="최근본|목록_' + srchDivNm + '|클립|' + hData.title1 + '"><span class="blind" data-clipid="' + attnDivCd + ',' + hData.srchTgtIdnfNo1 + '">클립하기</span></a>');
        	html.push('        <input type="hidden" name="attnDivCd" value="' + attnDivCd + '" />');
        	html.push('        <input type="hidden" name="attnDivDtlCd" value="' + attnDivDtlCd + '" />');
        	html.push('        <input type="hidden" name="siteNo" value="' + hData.siteNo + '" />');
        	html.push('        <input type="hidden" name="attnTgtIdnfNo1" value="' + hData.srchTgtIdnfNo1 + '" />');
        	html.push('        <input type="hidden" name="attnTgtIdnfNo2" value="' + (attnDivCd == '10' ? hData.salestrNo : hData.siteNo) + '" />');
        	html.push('        <input type="hidden" name="infloSiteNo" value="' + hData.siteNo + '" />');
    		html.push('    </span>');
    		html.push('</div>');
    	}
    	return html.join("");
    },

    bindCliping : function() {
    	// clip on/off process
    	if (settings.isMobile) {
    		var arrKeyValue = new Array();
            var mapObj = {};

    		$('#_cmhistory_scroll .cm_clip_cmhistory').each(function() {
    			var $this = $(this);
    	        var clipInfo = historySsg.makeClipInfoData($this);
    			var keyValue = clipInfo.attnDivCd + ',' + clipInfo.attnTgtIdnfNo1;
                arrKeyValue.push(keyValue);
                mapObj[keyValue] = $this;
    		});

            if (arrKeyValue.length > 0) {
                Clip.checkMyClipMulti(arrKeyValue, mapObj, historySsg.markingClipInfo);
            }
    	}

    	// click event
    	if (settings.isMobile) {
    		$('#_cmhistory_scroll .cm_clip_cmhistory').on('click', function() {
    			var $this = $(this);
    			if ($this.hasClass('working')) { // 처리중
    				return;
    			} else {
    				$this.addClass('working');

    				var clipInfo = historySsg.makeClipInfoData($this);
    				var responseDto = null;

    				if ($this.hasClass('clip_off')) {
    					responseDto = Clip.ajaxCliping(clipInfo);
    					historySsg.afterActionCliping(responseDto, clipInfo.attnDivCd + ',' + clipInfo.attnTgtIdnfNo1, true, clipInfo);
    				} else {
    					responseDto = Clip.ajaxUnCliping(clipInfo);
    					historySsg.afterActionCliping(responseDto, clipInfo.attnDivCd + "," + clipInfo.attnTgtIdnfNo1, false, clipInfo);
    				}
    			}

    			$this.removeClass('working');
    		});
    	}
    },

    makeClipInfoData : function(tgtObj) {
    	var clipInfo = { };

    	tgtObj.children('input').each(function() {
			var $thisInput = $(this);
			clipInfo[$thisInput.attr('name')] = $thisInput.val();
		});

		return clipInfo;
    },

    markingClipInfo : function(responseDto, mapObj) {
    	var resultList = responseDto.result;

		for (var i=0; i<resultList.length; i++) {
			historySsg.markingClipRender(resultList[i], true);
		}
    },

    afterActionCliping : function(responseDto, clipid, doClip, clipInfo) {
    	if ( responseDto != null ) {
	    	if (responseDto.resultCode == 'SUCCESS') {
	    		historySsg.markingClipRender(clipid, doClip, clipInfo);
	        } else if (responseDto.resultCode == 'LOGIN_REQUIRED_FAIL') {
	        	mobileLogin();
	        } else if ( doClip && responseDto.resultCode == 'EXCEED_CLIP_LIMIT') {
	        	if ( confirm(responseDto.resultMsg) ) {
	        		window.location.href = Clip.myClipDomain(clipInfo);
	        	}
	        } else {
	        	alert((doClip ? "클립하기중" : "클립해제중") + " 오류가 발생했습니다. 잠시후 다시 해주세요.");
	        }
    	}
    },

    markingClipRender : function(clipid, doOn, clipInfo) {
    	$('#_cmhistory_scroll .cm_clip_cmhistory').filter(function(idx) {
    			return $(this).find('span[data-clipid="' + clipid + '"]').length > 0;
	    	}).each(function() {
	    		var $this = $(this);
		    	if (doOn) {
		    		$this.removeClass('clip_off');
		    		$this.addClass('clip_on');
				} else {
					$this.removeClass('clip_on');
					$this.addClass('clip_off');
				}
	    	});
    },

    makeHistoryHtmlMo : function(historyList, adultYn) {
        var length = historyList.length;
        var html = [];
        var lastItemImg = '';

        for (var i = 0 ; i < length; i++) {
            var h = historyList[i];
            
            if (h.title1 == null) {
            	h.title1 = '';
            }

            var siteNo = (h.srchDivCd == "10" ? h.infloSiteNo : h.siteNo);
            var siteInfo = this.siteInfo[siteNo];

            if (siteInfo != null) {
                var url = this.getLinkUrl(h, siteInfo);

                switch(h.srchDivCd) {
                case '10' : // 상품
                	
                	if (lastItemImg == '') {
                		if (h.adultItemTypeCd == '10' && adultYn == 'N') {
                			lastItemImg = ssg.trans + "?src=/ui/ssg/img/common/Img_adult_500x500.png&w=120&h=120";
                		} else {
                			lastItemImg = getItemImgPath(h.srchTgtIdnfNo1, '120');
                		}
                	}
                	var itemTitle = (h.title1 != '' && h.title1 != null && h.title1 != 'null' && h.title1 != '기타' && (h.siteNo == '6004' || h.siteNo == '6009' || h.siteNo == '6003') ? '['+h.title1+'] ' : '') + h.title2;

                    html.push('<li class="cmhistory_type_product" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">상품 ' + itemTitle + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_상품|클릭|' + itemTitle + '">');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + itemTitle + '</span>');
	                html.push('                        <span class="cmhistory_tx_price"><em class="ssg_price">' + numberFormat(h.dcSellPrc) + '</em><span class="ssg_tx">원' + (h.uItemSamePrcYn == 'N' ? '~' : '') + '</span></span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_thmb">');
	                if (h.adultItemTypeCd == '10' && adultYn == 'N') {
	                	html.push('                        <div class="cmhistory_thmb"><img src="' + ssg.trans + '?src=/ui/ssg/img/common/Img_adult_500x500.png&w=120&h=120" onerror="this.onerror=null;this.src=\'' + getItemNoImgPath('70') + '\'" alt="19세 이상 구매가능"></div>');
	                } else {
	                	html.push('                        <div class="cmhistory_thmb"><img src="' + getItemImgPath(h.srchTgtIdnfNo1, '120') + '" onerror="this.onerror=null;this.src=\'' + getItemNoImgPath('120') + '\'" alt="' + replaceSpecial(itemTitle) + '"></div>');
	                }
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_add">');
	                html.push('                <div class="cmhistory_bt_area">');
	                html.push('                    <button type="button" class="cmhistory_bt_cart" onclick="frontCommCart.put(this, \'\');" class="clickable" data-react-tarea="최근본|목록_상품|장바구니|' + itemTitle + '"><i class="sp_cmhistory_ic cmhistory_ic_cart"><span class="blind">장바구니 담기</span></i></button>');
	                html.push('                    <span style="display:none" class="disp_cart_data" data-cart-type="10" data-cart-inflo-site-no="' + h.infloSiteNo + '" data-cart-ordqty="' + h.itemUnitMap.minOnetOrdPsblQty + '">' + h.itemUnitMap.jsonOfCartData + '</span>');
	                html.push('                </div>');
	                html.push(historySsg.makeClipInfoHtml(h));
	                html.push('            </div>');
	                html.push('        </div>');
	                html.push('    </div>');
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');
                	break;
                	
                case '20' : // 카테고리
                	html.push('<li class="cmhistory_type_category" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">카테고리 ' + h.title1 + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_카테고리|클릭|' + h.title1 + '">');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + h.title1 + '</span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_ico">');
	                html.push('                        <strong>카테고리</strong>');
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');
	                html.push('        </div>');
	                html.push('    </div>'); 
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');
                	break;
                	
                case '30' : // 기획전
            	case '32' : // 와우2
            	case '35' : // 더비
            	case '36' : // 스타브랜드
            	case '37' : // 라이프메거진
            	case '38' : // 매장습격
                    html.push('<li class="cmhistory_type_exhibition" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">기획전 ' + h.title1 + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_기획전|클릭|' + h.title1 + '">');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + h.title1 + '</span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_ico">');
	                html.push('                        <strong>기획전</strong>');
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');
	                html.push('        </div>');
	                html.push('    </div>');
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');
                	break;
                	
               	case '40' : // 브랜드
                    html.push('<li class="cmhistory_type_brand" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">브랜드 ' + h.title1 + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_브랜드|클릭|' + h.title1 + '">');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + h.title1 + '</span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_ico">');
	                html.push('                        <strong>브랜드</strong>');
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_add">');
	                html.push(historySsg.makeClipInfoHtml(h));
	                html.push('            </div>');
	                html.push('        </div>');
	                html.push('    </div>');
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');
                	break;
                	
               	case '41' : // 스타필드
                    html.push('<li class="cmhistory_type_store" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">매장 ' + h.title1 + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_스타필드|클릭|' + h.title1 + '">');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + h.title1 + '</span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_ico">');
	                html.push('                        <strong>매장</strong>');
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');                                 
	                html.push('        </div>');
	                html.push('    </div>');
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');
                	break;
                	
               	case '50' : // 이벤트
                    html.push('<li class="cmhistory_type_event" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">이벤트 ' + h.title1 + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                if (isEnd(h.title3)) {
	                	html.push('                <a href="javascript:alert(\'종료된 이벤트입니다.\');">');
	                } else {
	                	html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_이벤트|클릭|' + h.title1 + '">');
	                }
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + h.title1 + '</span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_ico">');
	                html.push('                        <strong>이벤트</strong>');
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');
	                html.push('        </div>');
	                html.push('    </div>');  
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');
                	break;
                	
               	case '60' :     // 검색어에 대한 처리
                    html.push('<li class="cmhistory_type_search" id="history_' + h.srchSeq + '">');
	                html.push('    <div class="cmhistory_unit">');
	                html.push('        <div class="cmhistory_unit_in">');
	                html.push('            <div class="cmhistory_cell cmhistory_h_mall">');
	                html.push('                <div class="cmhistory_mall_ic"><span class="sp_cmhistory_mall ' + siteInfo.iconClassMo + '"><span class="blind">' + siteInfo.name + '</span></span></div>');
	                html.push('                <div class="cmhistory_mall_chk">');
	                html.push('                    <span class="cmhistory_inp_chk">');
	                html.push('                        <input type="checkbox" name="cmhistory_chk" id="cmhistory_chk' + i + '" value="' + h.srchSeq + '">');
	                html.push('                        <label for="cmhistory_chk' + i + '" class="blind">검색어 ' + h.srchwdDtlc + '</label>');
	                html.push('                    </span>');
	                html.push('                </div>');
	                html.push('            </div>');
	                html.push('            <div class="cmhistory_cell cmhistory_h_link">');
	                html.push('                <a href="' + url + '" class="clickable" data-react-tarea="최근본|목록_검색|클릭|' + h.srchwdDtlc + '">');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_txt">');
	                html.push('                        <span class="cmhistory_tx">' + h.srchwdDtlc + '</span>');
	                html.push('                    </div>');
	                html.push('                    <div class="cmhistory_cell cmhistory_h_ico">');
	                html.push('                        <strong>검색어</strong>');
	                html.push('                    </div>');
	                html.push('                </a>');
	                html.push('            </div>');
	                html.push('        </div>');
	                html.push('    </div>');
	                html.push(historySsg.makeHistoryInfo(h));
	                html.push('</li>');          		
                	break;
                }
            }
        } // ~for(historyList)
        
        $('.cmhistory_loading').hide();

        if (html.length > 0) {
        	if (lastItemImg && !$('.cmfloating_thmbhistory').attr('src')) {
        		$('.cmfloating_thmbhistory').attr('src', lastItemImg);
        		$('.cmfloating_icohistory, .cmfloating_thmbhistory').toggle();
        	}
            $('#_cmhistory_wrap .cmhistory_nodata').hide();
            $("#_cmhistory_scroll .cmhistory_lst").html(html.join(''));

            historySsg.bindCliping();
        } else {
        	$("#_cmhistory_scroll .cmhistory_lst").empty();
        	$('#_cmhistory_wrap .cmhistory_nodata').show();
        }
        
        historySsg.refreshHistoryScroll();
    },
    
    refreshHistoryScroll : function() {
    	if (_oSSGViewHistory) {
    		_oSSGViewHistory.refreshScroll();
    	}
    },
    
    //쓱-배송 가능지역 찾기
    fn_shppInfo : function() {
    	var url = settings.domain.protocol + settings.domain.domain + '/addr/popup/zipcdShppInfo.ssg';
    	popupWin(url + "?callbackUrl=" + encodeURIComponent(location.href), "", 500, 900, "yes", "no");
    }
};

function equalSell(sellPrc, dcSellPrc) {
    if (sellPrc == null || dcSellPrc == null) {
        return false;
    }

    return sellPrc == dcSellPrc;
}

var specials = { "&" : "&amp;", "<" : "&lt;", ">" : "&gt;", '"' : '&quot;', "'" : '&#39;', "/" : '&#x2F;' };
function replaceSpecial(str) {
	if ( str != null && str != '' ) {
	    return str.replace(/[&<>"'\/]/g, function (s) {
	        return specials[s];
	    });
	}
}

// 행사 종료 기간 체크
function isEnd(val) {
    if (val == null) return true;

    var nowDate = new Date();
    var endString = "KST "+nowDate.getFullYear();

    var endDate = null;

    if ( val.length > 19 && val.lastIndexOf(endString) > -1 ) {
    	// other date format String - ex) Wed Aug 27 00:00:00 KST 2014

    	endDate = new Date(val.substr(0,11) + nowDate.getFullYear() + val.substr(10,10) + "GMT+0900");
    } else {
	    var date = getDateTime(val, 0).split(".");
	    var time = getDateTime(val, 1).split(":");

	    if (date == "" || time == "") return true;

	    endDate = new Date(date[0], date[1] - 1, date[2], time[0], time[1], time[2]);
    }

    return historySsg.getToday() > endDate;
}

// 숫자 3자리마다 콤마
function numberFormat(val) {
    var reg = /(^[+-]?\d+)(\d{3})/;
    val += ''; // 숫자를 문자열로 변환

    while (reg.test(val)) {
        val = val.replace(reg, '$1' + ',' + '$2');
    }

    return val;
}

function getStartEndDt(startDt, endDt, delim) {
	var todate = new Date();
	
	if (startDt != "" && endDt != "") {
		return startDt + delim + (endDt.indexOf('9999.') > -1 ? (todate.getFullYear() + 1) + endDt.substring(4) : endDt);
	} else if ( startDt != "" ) {
		return startDt;
	} else {// if ( endDt != "" )
		return endDt.indexOf('9999.') > -1 ? (todate.getFullYear() + 1) + endDt.substring(4) : endDt;
	}
}

function getDateTime(val, index) {
    if (val == null) {
        return "";
    }

    var dateTime = val.split(" ");

    if (dateTime == null || dateTime.length != 2) {
        return "";
    }

    return dateTime[index];
}

function historyShppOrdDgr(siteNo) {
	if ( UserInfo.isLoginYn == 'N' ) {
        login();
        return;
    }

    var url = "http://" + historySsgDomainObj.ssg + "/comm/popup/popupReserve.ssg?siteNo=" + siteNo;

    popupWin(url, "배송가능 회차조회", 810, 724, "yes", "no");
}

function historyTrackingSkyscraperExp(param) {
	$.ajax({
        url : "/comm/ajaxHistoryTracking.ssg?area=" + param,
        cache : false,
        dataType : "json"
    });
}

// 단골점포 설정팝업
function popupFavStore() {
	var url = "http://" + historySsgDomainObj.emart + "/search/searchStoreList.ssg";

	popupWin(url, "단골점포 관리", 800, 770, "yes", "no");
}


/////////////////////////////////////////////////////////////////////

var _oSSGViewHistory;

var ssgHistoryInitFn = function() {
	// thehowdy 독립몰, member에서 히스토리 사용 안함
	if ($(location).attr('hostname').indexOf('thehowdy') == -1 	
			&& $(location).attr('hostname').indexOf('member.ssg.com') == -1) {
		historySsg.property.isNotEmergencyDisabling = settings.isMobile ? (typeof settings.emergency.HISTORY_MO_PASS === "undefined" || settings.emergency.HISTORY_MO_PASS !== 'Y') : (typeof settings.emergency.HISTORY_PC_PASS == "undefined" || settings.emergency.HISTORY_PC_PASS !== 'Y');

		if (settings.isMobile) {
			_oSSGViewHistory = new ssg.View.history(); // ssg.view.layout
			
			// 히스토리 필터
			$('.cmhistory_sort').on('click', 'button', function(e) {
				e.preventDefault();
				historySsg.initHistory();
			});
		}
		
		historySsg.initHistory();
	}
}

if (typeof deferredObj === 'undefined') {
	$(document).ready(ssgHistoryInitFn);
} else {
    deferredObj.done(ssgHistoryInitFn);
}
