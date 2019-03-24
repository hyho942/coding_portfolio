//쿠키 가져오기
function getCookie(cName) {
     cName = cName + '=';
     var cookieData = document.cookie;
     var start = cookieData.indexOf(cName);
     var cValue = '';
     if(start != -1){
          start += cName.length;
          var end = cookieData.indexOf(';', start);
          if(end == -1)end = cookieData.length;
          cValue = cookieData.substring(start, end);
     }
     return unescape(cValue);
}

//레이어팝업 호출
$(function(){

	if(isApp == 'Y') {
		return;
	}

	var cookieWhere = getCookie("where");
	var chnlPopupCookieNm = "popupItemChnl_";
	
	if(cookieWhere.indexOf("CHNL_ID") > -1) {
		chnlPopupCookieNm += cookieWhere.substring(cookieWhere.indexOf("CHNL_ID")+8, cookieWhere.indexOf("CHNL_ID")+18);
	}
	
	if(getCookie(chnlPopupCookieNm) != 'Y') {
		getLayerPopup();
	}
});

function getLayerPopup() {
	if (typeof emergencyDisablingChnlPopupForPC == "undefined" || emergencyDisablingChnlPopupForPC != true) {
		$.ajax({
			type     : 'GET',
			url      : '/comm/chnlPopupCheckAjax.ssg',
			dataType : 'json',
			success  : function(result) {
	            if(result.resultCode == 'SUCCESS') {
	            	window.open("/comm/chnlPopup.ssg", "popupItemChnl", "width=284, height=401, top=30, left=30");
	            }
			},
			error    : function(err) {
				console.log(err);
			}
		});
	}
}