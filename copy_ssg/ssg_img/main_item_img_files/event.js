var Event = {

    moveTermsPage : function(result) {
        var memberDomain = settings.domain.protocol + settings.domain.domain;
        if(settings.isMobile) {
            memberDomain += settings.domain.context;
        }
        if(result.resultCode == '79' || result.resultCode == '88') {
            if(confirm(result.resultMsg.replace(/\\n/g, '\n'))) {
                location.href = memberDomain + "/myssg/myinfoMng/loadForm.ssg";
            }
        } else if(result.resultCode == '78') {
            if(confirm(result.resultMsg.replace(/\\n/g, '\n'))) {
                if(settings.isMobile) {
                    location.href = memberDomain + "/member/popup/popupOmniAgreeCamp.ssg?retURL=" + encodeURIComponent(location.href);
                } else {
                    window.open(memberDomain + "/member/popup/popupOmniAgreeCamp.ssg?retURL="+ encodeURIComponent(location.href), "", "width=600, height=853");
                }
            }
        }
    },
	
	isLogin : function() {
		if (UserInfo.isLoginYn === 'N') {
			if (isMobile) {
				mobileLogin();
			} else {
				login();
			}
			return false;
		}
		return true;
	},
	
	getEventDomain : function() {
		
	    var protocol = window.location.protocol.indexOf("https:") > -1 ? 'https://' : 'http://';
	    var eventHostName = 'event.ssg.com';
	    if(window.location.hostname.indexOf('local-') > -1) {
	    	eventHostName = 'local-event.ssg.com';
	        
	    } else if(window.location.hostname.indexOf('dev-') > -1) {
	    	eventHostName = 'dev-event.ssg.com';
	        
	    } else if(window.location.hostname.indexOf('qa-') > -1) {
	    	eventHostName = 'qa-event.ssg.com';
	        
	    } else if (window.location.hostname.indexOf('stg-') > -1){
	    	eventHostName = 'stg-event.ssg.com';
	    }
	    
	    return protocol + eventHostName;
	},
	
	checkLoginError : function(result) {
		if(result.errorCode == 'AJAX_LOGIN_FAIL' || result.errorMsg == 'AjaxLoginRequired login required') {
			alert('로그인 후 이용가능합니다.');
			location.reload();
			return true;
		} else {
			return false;
		}
	},
	

    send : function(sendType, entryDataType, callUrl, entryData, callback) {
        if (Event.send.progress) {
            return;
        }

        Event.send.progress = true;
        $.ajax({
            url : callUrl,
            type : sendType,
            cache : false,
            data : entryData,
            dataType : entryDataType,

            success : function(result) {
                if (Event.checkLoginError(result)) {
                    return;
                }
                
                if(result.resultCode === "78" || result.resultCode === "79" || result.resultCode === "88") {
                    Event.moveTermsPage(result);
                    return;
                }

                if (typeof callback === 'function') {
                    callback(result);
                } else {
                    alert(result.resultMsg.replace(/\\n/g, '\n'));
                }
            },
            error : function(result) {
                alert($.parseJSON(result.responseText).errorMsg);
            },
            complete : function() {
                Event.send.progress = false;
            }
        });
    },
	
    sendEventServer : function(callUrl, entryData, callback) {
        if (Event.sendEventServer.progress) {
            return;
        }

        callUrl =  Event.getEventDomain() + callUrl;

        Event.sendEventServer.progress = true;
        $.ajax({
            url: callUrl,
            type: 'GET',
            cache: false,
            data: entryData,
            dataType : 'jsonp',
            jsonp	: 'callBack',

            success: function(result) {
                if(Event.checkLoginError(result)) {
                    return;
                }

                if(result.resultCode === "78" || result.resultCode === "79" || result.resultCode === "88") {
                    Event.moveTermsPage(result);
                    return;
                }

                if(typeof callback === 'function') {
                    callback(result);
                } else {
                    alert(result.resultMsg.replace(/\\n/g, '\n'));
                } 
            },
            error: function(result) {
                alert($.parseJSON(result.responseText).errorMsg);
            },
            complete: function(){
                Event.sendEventServer.progress = false;
            }
        });
    },
	
	issueCoupon : function(offerId, offerDtlSeq, callback) {
		return Event.issueCouponWithQty(offerId, offerDtlSeq, 1, callback);
	},

	issueCouponType2 : function(offerId, offerDtlSeq, wantedCpnQty, callback) {
		return Event.issueCouponWithQty(offerId, offerDtlSeq, wantedCpnQty, callback);
	},

	issueCouponWithQty : function(offerId, offerDtlSeq, wantedCpnQty, callback) {
		if(!Event.isLogin()) return;
		
		entryData = {
			offerId: offerId,
			offerDtlSeq: offerDtlSeq,
			wantedCpnQty: wantedCpnQty
		};
		
		Event.sendEventServer('/event/comm/issueCoupon.ssg', entryData, callback);
	},
	
	issueCouponPerDay : function(offerId, offerDtlSeq, callback) {
		return Event.issueCouponPerDayWithQty('',offerId, offerDtlSeq, 1, callback);
	},
	
	issueCouponPerDayByPromId : function(promId, callback) {
		var offerId;
		var offerDtlSeq;
		var wantedCpnQty;
		return Event.issueCouponPerDayWithQty(promId, offerId, offerDtlSeq, wantedCpnQty, callback);
	},
	
	issueCouponPerDayWithQty : function(promId, offerId, offerDtlSeq, wantedCpnQty, callback) {
		if(!Event.isLogin()) return; 

		entryData = {
		    promId: promId,
		    offerId: offerId,
		    offerDtlSeq: offerDtlSeq,
		    wantedCpnQty: wantedCpnQty
		};

		Event.sendEventServer('/event/comm/issueCouponPerDay.ssg', entryData, callback);
	},
	
	getIssuedCpnQty : function(offerId, evntAplCritnStrtDt, evntAplCritnEndDt, callback) {
		if(!Event.isLogin()) return;

		entryData = {
			offerId : offerId,
			evntAplCritnStrtDt : evntAplCritnStrtDt,
			evntAplCritnEndDt : evntAplCritnEndDt
		};
		
		Event.sendEventServer('/event/getIssuedCpnQty.ssg', entryData, callback);
	},

	/**
	 * 일반응모형
	 * @param entryData
	 * @param callback
	 */
	goEntry : function(entryData, callback) {
		if(!Event.isLogin()) return;
		
		if(entryData.constructor === String) {
			entryData = {promId : entryData};
		}		
		
		Event.sendEventServer('/ajax/event/enter/entrytype.ssg', entryData, callback);		
	},
	
	/**
	 * 구매합산(B3), 주문사은(B4)
	 * @param entryData
	 * @param callback
	 */
	goEntryForBysmOrdp : function(entryData, callback) {
		if(!Event.isLogin()) return;
		Event.sendEventServer('/ajax/event/enter/ordtype.ssg', entryData, callback);		
	},

	/**
	 * 영수증 꼬리표형
	 * @param promId
	 * @param randomNo
	 * @param callback
	 */
	goRandomNumberEntry : function(promId, randomNo, callback) {
		if(!Event.isLogin()) return;

		if(randomNo.trim() == '') {
			alert('응모번호를 입력하세요.');
			return;
		}
		
		entryData = {
			promId	  : promId,
			entryRecpNo : randomNo
		};

		Event.send('POST', 'json','/event/entryEventForRcptType.ssg', entryData, callback);
	},

	/**
	 * 프로모션ID 기준 쿠폰 다운로드
	 * @param promId
	 * @param callback
	 */
	downCouponByPromId : function(promId, callback) {
		if(!Event.isLogin()) return;
		
		entryData = {
			promId : promId
		};
		
		Event.sendEventServer('/event/comm/downCouponByPromId.ssg', entryData, callback);
	},

	/**
	 * 맘키즈 쿠폰 다운로드
	 * @param callback
	 */
	downMomKidsCoupon : function(callback) {
		if(!Event.isLogin()) return;
		
		entryData = {
			wantedCpnQty : 30
		};
		
		Event.send('POST', 'json','/event/momKidsCouponIncrease.ssg', entryData, callback);
	},

	/**
	 * 구매합산/주문사은 자동응모형
	 * @param promId
	 * @param callback
	 */
	ordTypeAutoEntry : function(promId, callback) {
		if(!Event.isLogin()) return;
		
		entryData = {
			promId : promId
		};
		
		Event.send('POST', 'json','/event/ordTypeAutoEntry.ssg', entryData, callback);
	},

	/**
	 * 응모번호 입력 후 쿠폰다운
	 * @param promId
	 * @param offerId
	 * @param callback
	 * @returns
	 */
	randomNumCouponAuto : function(promId, offerId, callback) {

		var randomNo = $(':input[name=random_number_input]').val().trim();
		return Event.randomNumCoupon(promId, offerId, randomNo, callback);
	},

	randomNumCoupon : function(promId, offerId, randomNo, callback) {
		if(!Event.isLogin()) return;

		if(isEmpty(randomNo.trim())) {
			alert('응모번호를 입력하세요.');
			return;
		}
		
		entryData = {
			promId	  : promId,
			offerId	 : offerId,
			entryRecpNo : randomNo.trim()
		};

		Event.send('POST', 'json','/event/randomNumCoupon.ssg', entryData, callback);
	},
	/**
	 * 응모번호 입력 후 쿠폰다운  번호 하나당 한명만 다운로드 가능
	 * @param promId
	 * @param offerId
	 * @param callback
	 * @returns
	 */
	randomNumCoupon2 : function(promId, offerId, randomNo, callback) {
		if(!Event.isLogin()) return;

		if(isEmpty(randomNo.trim())) {
			alert('응모번호를 입력하세요.');
			return;
		}
		
		entryData = {
			promId	  : promId,
			offerId	 : offerId,
			entryRecpNo : randomNo.trim(),
			dupRcptCntUseMbrIdYn : 'N'
		};
		
		Event.send('POST', 'json','/event/randomNumCoupon.ssg', entryData, callback);
	},

	getServerTime : function (){
		var ServerTime = "";
		if (Event.getServerTime.progress) {
			return;
		}

		Event.getServerTime.progress = true;

		$.ajax({
			url: '/event/getServerTime.ssg',
			type: 'POST',
			data: {
			},
			dataType: 'json',
			async: false,
			success: function(json) {
				ServerTime = json.result;
				Event.getServerTime.progress = false;
			},
			error: function() {
			}
		});
		return ServerTime;
	},

	/**
	 * 앱 다운로드와 쿠폰 다운 분기처리
	 * @param promId
	 * @param offerId
	 * @param mobilAppSvcNo
	 * @param callback
	 * @returns
	 */
	mobilAppCouponDown : function(offerId, offerDtlSeq, mobilAppSvcNo, callback){
		if(!!mobile.customUrl.scheme){
			Event.issueCoupon(offerId, offerDtlSeq, callback);
		}else{
			var command = 'page_open/self?url=' + fixedEncodeURIComponent(location.href) + '&title=' + fixedEncodeURIComponent($("title").html());
			appCommandExecute(command, mobilAppSvcNo);
		}
		return true;
	},
	
	getEventContents : function(callUrl, entryData, callback){
		$.ajax({
			url: callUrl,
			type: 'POST',
			cache: false,
			data: entryData,
			dataType: 'html',
			success: function(html) {
				callback(html);
			},
			error: function(e) {
				alert('에러' + e);
			}
		});
	},
	
	/**
	 * 댓글 삭제
	 */
	removeEntry : function(seq, callback) {
		if(!Event.isLogin()) return;
		
		if (!confirm("삭제 하시겠습니까?") ){
			return;
		}
		
		entryData = {
			evntEntrySeq: seq
		};

		Event.send('POST', 'json','/event/removeEventEntry.ssg', entryData, callback);
	},
	
	/**
	 * 추천하기
	 */
	recommendEntry : function(entryData, callback) {
		if(!Event.isLogin()) return;
		Event.send('POST', 'json','/event/ajaxRecommendEventEntry.ssg', entryData, callback);
	},
	
	/**
	 * 상품상세 app 혜택 이벤트 팝업 호출
	 */
	openPromEvntPopup : function(pcLinkUrl, mobilLinkUrl, expsrImgUrl) {
		var encodedPcUrl = encodeURIComponent(pcLinkUrl);
		var encodedMobilUrl = encodeURIComponent(mobilLinkUrl);
		var encodedImgUrl = encodeURIComponent(expsrImgUrl);
		window.open("/comm/evnt/promBanr.ssg?wiselog=itemview&pcUrl=" + encodedPcUrl + "&mobilUrl=" + encodedMobilUrl + "&banrImgUrl=" + encodedImgUrl, "_blank", "menubar=no, scrollbars=no, resizable=no, width=298, height=539");
	},
	
	/**
	 * 사은품 유저 정보 팝업 호출
	 */
	openEntryUserInfoPopup : function() {
		if(!Event.isLogin()) return;
		
		if (isMobile) {
			location.href = '/event/entryUserInfo.ssg';
		} else {
			window.open("/event/entryUserInfo.ssg", "_blank", "menubar=no, scrollbars=no, resizable=no, width=600, height=502");
		}
	},
	
	/**
	 * 이벤트 상세 HTML의 AREA 영역중 상품 정보 파싱하여 가격정보 매핑
	 * promId기준으로 데이터 캐시 됨 (필수값)
     * area 태그의 id값을 상품Id로 가져와 데이터 생성함 (html영역 필수값)
     * data-tip-price Attribute에 상품가격정보 넣어 줌 (#,### format)
     */
	eventItemDataMapping : function(promId, callback) {
		
		if(!promId) return;
		
		var itemMapList = $('#content .conent').find('area');
		var itemIds = $(itemMapList).map(function() {
			return $(this).attr('id');
		}).get().join(",");
		
		entryData = {
			promId : promId,
			itemIds : itemIds
		};
		
		Event.sendEventServer('/event/getLeafItemIdsItemList.ssg', entryData, function(result) {
			if(result.resultCode == '00') {
				resultData = result.resultMsg;
				for(var item in resultData) {
					if (resultData.hasOwnProperty(item)) {
						filteredItem = $(itemMapList).filter('#' + resultData[item].itemId);
						if(resultData[item].itemNm) {
							filteredItem.attr('alt' , resultData[item].itemNm);
						}
						if(resultData[item].brandNm) {
							filteredItem.attr('data-tip-title' , resultData[item].brandNm);
						}
						if(resultData[item].price) {
							filteredItem.attr('data-tip-price' , resultData[item].price);
						}
						if(resultData[item].soldOutYn) {
							filteredItem.attr('data-tip-soldout' , resultData[item].soldOutYn);
						}
					}
				}
			}
			
			if(typeof callback === 'function') {
				callback(result);
			}
		});
	},
	
	issueCouponForGrade : function(callback) {
		
		if(!Event.isLogin()) return;
		var entryData = {};
		
		Event.sendEventServer('/event/comm/issueCouponForGrade.ssg', entryData, callback);
	},
	
	issueCouponForFirst : function(callback) {
		if(!Event.isLogin()) return;
		var entryData = {};
		
		Event.sendEventServer('/event/comm/issueCouponForFirst.ssg', entryData, callback);
	}
	
};