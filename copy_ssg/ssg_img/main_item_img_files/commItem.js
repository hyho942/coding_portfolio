// 장바구니 Rest
function restCartData(cartObj) {
	var returnStr = "N";

	if ( typeof emergencyItemIds != "undefined" && emergencyItemIds != "" ) {
		if ( cartObj != null && cartObj != "" && cartObj.items.length == 1 && emergencyItemIds.indexOf(cartObj.items[0].itemId) > -1 ) {
			alert("품절된 상품입니다.");
			return false;
		}
	}

	$.ajax({
		url : "/comm/cart.ssg"
		, data : {"json" : JSON.stringify(cartObj)}
		, method : "post"
		, cache : false
		, async : false
	}).done(function(data){
		if ( data != null ) {
			if( data.resCd == '0000' ) {
				if ( data.updCnt > 0 ) {
					returnStr = "U";
				} else {
					returnStr = "Y";
				}

				try {
					// facebook pixel
					if( typeof fbq !== 'undefined' ) {
						var fbqItemIds = [];

						for(i=0; i<cartObj.items.length;i++) {
							if( $.inArray(cartObj.items[i].itemId, fbqItemIds) == -1) {
								fbqItemIds.push(cartObj.items[i].itemId);
							}
						}

						fbq('track', 'AddToCart', {content_type: 'product', content_ids:fbqItemIds});
					}

					// 장바구니 갯수 카운팅
					if( isMobile == true ) {
						$("#cartCnt").text(data.cartCnt);
						$("#cartCnt").parent().show();

						if(isAppHeader == true) {
							location.href = mobileCustomUrl + '://count/cart/' + data.cartCnt;
						}
					} else {
						if ( $("#mbrCartCntSpan",parent.document).length > 0 ) {
							// 퀵뷰용
							$("#mbrCartCntSpan",parent.document).text(data.cartCnt > 99 ? "99+" : data.cartCnt);
							$("#mbrCartCntSpan",parent.document).show();
						} else {
							$("#mbrCartCntSpan").text(data.cartCnt > 99 ? "99+" : data.cartCnt);
							$("#mbrCartCntSpan").show();
						}
					}
				} catch(e){ }
			} else {
				alert(data.resMsg);
			}
		} else {
			alert('잠시후 다시 시도해주세요.');
		}
	}).fail(function(result,status,error){
		try {
			$.ajax({
				type: "GET",
				data : {
					"errParam1" : cartObj + '',
					"errParam2" : JSON.stringify(cartObj),
					"json" : JSON.stringify(cartObj)
				},
				url: "/comm/cartErrLog.ssg",
				async : true,
				cache : false
			});
		} catch(e){ }

		alert('잠시후 다시 시도해주세요.');
	});

	return returnStr;
}

// tv쇼핑 동영상 alert
var isTvVodFirst = true;
function fn_tvVodAlert(){
	if(isTvVodFirst){
		isTvVodFirst = false;
		alert('동영상에 표기된 혜택/가격은\n주문시 다를 수 있습니다.');
	}
}

// 셀러톡 버튼 설명 레이어 팝업 표시 유무
var sellerTalkLayerYn = function(){
	$.cookie('ITEM_VIEW_SELLERTALK_TOOLTIP','Y');
}

// 셀러톡 팝업
var sellerTalkPopup = function(talkId, isMobile){

  var _isMobile = (isMobile !== undefined)? isMobile : settings.isMobile;

  if ( UserInfo.isLoginYn != "Y" ) {

    if( _isMobile ){
      $.cookie('ITEM_VIEW_SELLERTALK_ID', talkId);
      mobileLogin();
    }else{
      login('', function(){
        $.cookie('ITEM_VIEW_SELLERTALK_ID', talkId);
        document.location.reload();
      });
    }
    return;
  }

  // 웹채팅에 상품 유닛 정보 호출
  var sllerTalkParam = {
    url : sellerTalkDataObj.talkUrl + '/api/messages/to-seller/items',
    type : 'POST',
    data : JSON.stringify({
      sellerhomeId : talkId,
      message : {
        itemList : [sellerTalkDataObj]
      }
    }),
    complete : function(){
      talkNavigator.goSellerTalk(talkId, _isMobile);
    }
  };

  talkApiClient.execute(sllerTalkParam);

}
