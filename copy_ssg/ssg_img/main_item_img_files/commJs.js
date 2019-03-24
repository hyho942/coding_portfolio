/**
 * console 방어 코딩
 */
if (! window.console) {
	window.console = {
		log: function() {},
		dir: function() {},
		warn: function() {},
		error: function() {},
		debug: function() {}
	};
}
/* StartWith 방어 코딩 -> 2015.05.28 */
if(typeof String.prototype.startsWith != 'function'){
	String.prototype.startsWith = function (str){
		return this.indexOf(str) === 0;
	};
}

// 모바일 ajax error code 0 대응
var ajaxCompleteSkip = ["searchKeyWord.ssg", "WNRun.do"];
$.ajaxSetup({
	beforeSend: function(jqXHR, settings) {
		if (typeof settings.error === 'function') {
			var errorfunc = settings.error;
			settings.error = function(jqXHR2, textStatus, errorThrown) {
				if (jqXHR2.status !== 0) errorfunc(jqXHR2, textStatus, errorThrown);
			};
		}
	},
	complete : function(jqXHR, textStatus) {

	}
});

/**
 * app 팝업
 */
function appPopup(url) {
	var customUrl = mobile.customUrl.popup;

	customUrl = customUrl.replace('{URL}','');
	customUrl += encodeURI(url + "&title=SNS공유하기");

	location.href= customUrl;
}

/**
 * app 브라우저 띄우기
 */
function appBroswer(url, type, isNew) {
	var customUrl = mobile.customUrl.popup_out;
	customUrl = customUrl.replace('{URL}',url);

	if(type == 'pc') {
		$.cookie('usePCmode', 'Y', {path: '/', domain: '.ssg.com'});
		// 앱인 경우(특히 아이패드) 앱외부 브라우저로 창이 열리는데 이떄 cookie값이 연동되지 않기 때문에 parameter를 넘겨서 cookie를 재생성함
		if ( url.indexOf("?") == -1 ) {
			url += '?usePCmode=Y';
		} else {
			url += '&usePCmode=Y';
		}
		customUrl = mobile.customUrl.popup_out.replace('{URL}',url);
	} else if (type == 'mo') {
		// 모바일버전보기는 본창에서 처리되므로 cookie 재생성 issue 없음
		$.cookie('usePCmode', 'N', {path: '/', domain: '.ssg.com'});
	}

	if(isApp == 'N') {
		if(isNew == 'Y'){
			window.open(url);
		}else{
			location.href = url;
		}
		return;
	}

	if(type == 'pc' && isPad) {
	// pc 보기 ( 패드만 대응 )
		location.href= customUrl;
	} else if(type =='stack' && isPad){
		url = url.replace(/(\?|\&){1}_mpop=new/gi,'');

		var separator = "&";
		if(url.indexOf("?") == -1) {
			url = url.replace("&","?");
			separator = "?";
		}

		location.href= url + separator + "_mpop=new";
	} else {
		if(type) {
			if(isNew == 'Y'){
				window.open(url);
			}else{
				location.href = url;
			}
		} else {
			location.href= customUrl;
		}
	}
}

/**
 * 모바일 로그인
 * t = 'auth', ''
 */
function mobileLogin(t, ref, cartSaveData){
	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain + settings.domain.context;

	if(t==null || t =='') t = 'agree';
	var type = t || "";

	var retURL = location.protocol + "//" + location.hostname;
	if(ref) {
		if(ref.startsWith('http')) {
			retURL = ref;
		} else {
			retURL = retURL + ref;
		}
	} else {
		retURL = location.href;
	}

	if("cart,payment,direct,gift".indexOf(t) > -1){
		$.cookie('cartSaveData', JSON.stringify(cartSaveData), {expires: 1, path: '/', domain: '.ssg.com'});
	}

	location.href = SSL_DOMAIN + "/member/login.ssg?retURL=" + encodeURIComponent(retURL) + "&t=" + type;
}

/**
 * 성인 로그인 윈도우 열기
 * @param callBack : 로그인후 콜백 함수
 */
function checkAdult(ref){
	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain;

	var retURL = location.protocol + "//" + location.hostname;
	if(ref) {
		if(ref.startsWith('http')) {
			retURL += ("?retURL=" + encodeURIComponent(ref));
		} else {
			retURL += ("?retURL=" + encodeURIComponent(retURL + ref));
		}
	}

	retURL = retURL.replace("#","");

	popupWin(SSL_DOMAIN + "/member/popup/popupCheckAdult.ssg?retURL=" + encodeURIComponent(retURL), "", 600, 670, "yes", "no");
}

/**
 * 모바일 성인 인증
 * @param callBack : 로그인후 콜백 함수
 */
function mobileChkAdult(ref){
	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain + settings.domain.context;

	var retURL = "";
	if(ref) {
		retURL = ref.startsWith('http') ? ref : (location.protocol + "//" + location.hostname + ref);
	} else {
		retURL = location.href;
	}

	if(UserInfo.isLoginYn == 'Y') {
		retURL = SSL_DOMAIN + "/member/checkAdult.ssg?retURL=" + encodeURIComponent(retURL) + "&_mpop=new";
		location.href =retURL;
	} else {
		mobileLogin("auth", retURL);
	}
}


/**
 * 우편번호 찾기 팝업
 */
function openPopupSearchZipcd(retUrl) {
	if(retUrl) {
		retUrl = "?retUrl="+escape(retUrl);
	} else {
		retUrl = "";
	}

	var domain = settings.domain.domain;
	if (retUrl.indexOf('customer.sfcmall.emart.com') != -1) {
		domain = settings.domain.sfc.emartMember;
	} else if (retUrl.indexOf('customer.sfcmall.com') != -1) {
		domain = settings.domain.sfc.member;
	}

	popupWin(settings.domain.protocol + domain + settings.domain.context + '/addr/popup/zipcd.ssg' + retUrl, '우편번호찾기', 500, 700, 'yes', 'no');
}

/**
 * 파일 업로드 객체
 * Example  : FileUpload.addFilePopup('fnCallback', 2, 'Y', 'N')
 * Callback Function : fnCallback(fileUploadedInfo) - 파일업로드 팝업에서 처리 후 돌아올 본페이지(바닥창)에 아규먼트 첫번째에 넣어준 콜백함수명으로 함수 선언, argument 로 fileUploadedInfo 객체를 넘겨줌
 */
var FileUpload = {
	callbackFnNm : null,    // 필수
	limitSize : 2,          // default 2 MB
	imgYn : 'N',                // default 'N'
	videoYn : 'N',          // default 'N'

	/**
	 * 팝업 파일 업로드
	 * @param {String} callbackFnNm 팝업창 파일 업로드 처리 후 부모창에서 실행될 함수명
	 * @param {Number} limitSize 파일의 최대 업로드 가능 크기(단위 MB)를 정의, 기본값 2MB
	 * @param {String} imgYn 이미지형태의 파일만 업로드시 'Y', 그외 'N'
	 * @param {String} videoYn 동영상형태의 파일만 업로드시 'Y', 그외 'N'
	 */
	addFilePopup : function (callbackFnNm, limitSize, imgYn, videoYn) {
		if (callbackFnNm == undefined || callbackFnNm == '') {
			return false;
		} else {
			this.callbackFnNm = callbackFnNm;
		}

		if (limitSize > 0) { this.limitSize = limitSize; }
		if (imgYn == 'Y') { this.imgYn = imgYn; this.videoYn = 'N'; }
		if (videoYn == 'Y') { this.videoYn = videoYn; this.imgYn = 'N'; }

		popupWin('http://' + ssg.domain.ssg + '/comm/popup/fileUploadForm.ssg', '파일업로드', 500, 306, 'no', 'yes');
	}
};

/**
 * 해당 숫자 또는 숫자형 문자를 해당 길이에 맞게 왼쪽으로 '0'문자 삽입하여 반환
 * @Example : padLeft('1', 2)
 * @param a : 대상, 숫자 또는 숫자형 문자
 * @param b : 길이, 숫자 또는 숫자형 문자
 * */
function padLeft(a, b) {
	var l = (a + '').length;
	if (l >= b) {
		return a + '';
	} else {
		var arr = [];
		for (var i = 0; i < b - l ;i++) {
			arr.push('0');
		}
		arr.push(a);
		return arr.join('');
	}
}

/**
	* 인증 호출
	* @param callBack : 인증후 콜백 함수
	* @param type : I = iPing , H = phone
	*/
function certCall(callBack, type, param, forwardUrl){
	$("#certFrame").remove();
	window.certCallBack = callBack;
	var param = param || "";
	var svcCode = $.getUrlVar('svcCode') ? $.getUrlVar('svcCode').replace("#","") : '';
	var referer = document.referrer;

	var obj = {
		url : {
			"I" : settings.domain.context + "/member/auth/iPin.ssg?svcCode=" + svcCode + "&referer=" + referer
			, "H" : settings.domain.context + "/member/auth/phone.ssg?svcCode=" + svcCode + "&referer=" + referer
			, "B" : settings.domain.context + "/member/auth/corp.ssg?svcCode=" + svcCode + "&referer=" + referer
		}
		, retCode : {
			"I" : "23"
			, "H" : "32"
			, "B" :  ""
		}
	};

	var domain = location.protocol + "//" + location.hostname;
	var retURL = domain + settings.domain.context + "/member/auth/certComplete.ssg?type=" + type;

	if(isApp == 'Y'){
		forwardUrl = forwardUrl.replace(/(\?|\&){1}_mpop=new/gi,'');

		if(forwardUrl.indexOf("?") == -1) {
			forwardUrl = forwardUrl.replace("&","?");
		}

		$.cookie('forward_url', forwardUrl, {expires : 1, path: '/', domain : '.ssg.com'});
		$.cookie('backward_url', location.href, {expires : 1, path: '/', domain : '.ssg.com'});

		var param = obj.retCode[type] + retURL + '&forwardUrl=' + escape(forwardUrl) + '&backwardUrl=' + escape(location.href);
		location.href = obj.url[type] + "&param=" + escape(param.replace("#",""));
	} else if(isMobile){
		var paramValue = obj.retCode[type] + retURL;
		window.open(obj.url[type] + "&param=" + escape(paramValue.replace("#","")) , '', 'width=450, height=500, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200' );
	} else {
		var iframe = $("<iframe />").attr({"src": obj.url[type] + param , "id" : "certFrame", "title" : "인증프레임"}).css("display", "none");
		$("body").append(iframe);

		iframe.load(function(){
			document.getElementById("certFrame").contentWindow.openWindow(obj.retCode[type] + retURL);
		});
	}
}

/**
 * 페이스북연동가입 완료 후 콜백페이지에서 호출
 * fcbookJoinMbrConversionCallBack.jsp 에서 호출됨
 * Example  : callbackFbMbrConversionSubmit()
 */
function callbackFbMbrConversionSubmit(simpleMbrId) {
	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain + settings.domain.context;
	var formTagHtmlArr = [];
	formTagHtmlArr.push('<form id="callbackFbMbrConversion" action="' + SSL_DOMAIN + '/member/join/authMbrConversion.ssg" method="post">');
	formTagHtmlArr.push('<input type="hidden" name="simpleMbrId" value="' + simpleMbrId + '">');
	formTagHtmlArr.push('</form>');
	$('body').append(formTagHtmlArr.join(''));
	$('body').find('form#callbackFbMbrConversion').submit();
}

// 장바구니 처리
function go_Payment(){
	var obj = $.data(document.body, "obj");
	formCart(obj, "payment", true);
}

function fnCartQtyChng(tag) {
	var ordQty = $(tag).val();
	$(tag).parent().siblings('.item_info').find("input[name=ordQty]").val(ordQty);
	$(tag).siblings('label').text(ordQty);
}

var frontCommCart = {
		put: function(thisTag, type) {
			var	tag = $(thisTag).next(".disp_cart_data"),
				cartTypeCd = $(tag).data('cartType')+"",
				cartInfloSiteNo = $(tag).data('cartInfloSiteNo')+"",
				cartOrdQty = $(tag).data('cartOrdqty')+"",
				cartData = JSON.parse($(tag).text()),
				cartSaveData = {
					"cartTypeCd" : cartTypeCd, //장바구니유형코드(Cart Type Code) [10:국내, 20:해외, 30:정기배송]
					"infloSiteNo" : cartInfloSiteNo, //유입사이트번호(Inflow Site Number)
					"items" : [ //상품 정보
						{ //상품1
							"siteNo" : cartData.siteNo, //사이트번호(Site Number)
							"itemId" : cartData.itemId, //상품ID(Item Identification)
							"uitemId" : cartData.uitemId, //단품ID(Unit Item Identification)
							"ordQty" : cartOrdQty, //주문수량(Order Quantity)
							"salestrNo" : cartData.salestrNo, //영업점번호(Sale Store Number) [백화점 상품 일 경우 영업점]
							"hopeShppDt" : "", //희망배송일자(Hope Shipping Date), [배송일 지정 상품 일 경우 사용]
							"cartPsblType" : cartData.cartPsblType
						}
					]
				};

			if(settings.UserInfo.isLoginYn == "N" && isApp == "Y") {
				mobileLogin();
				return false;
			}

			if(settings.UserInfo.isLoginYn == "N" && isMobile && cartTypeCd == "30") {
				mobileLogin();
				return false;
			}

			if(cartData.advertBidId != null && cartData.advertBidId != '' && cartData.advertBidId != undefined){
				// 광고상품일 경우 광고ID (advertBidId) 를 JSON에 추가
				var ordItemInfloList = [];
				var ordItemInflo = new Object();
				ordItemInflo.ordItemInfloDivCd = '09';
				ordItemInflo.ordItemInfloTgtId = (cartData.advertExtensTeryDivCd == null ? '' : cartData.advertExtensTeryDivCd) + cartData.advertBidId;
				ordItemInfloList.push(ordItemInflo);
				cartSaveData.items[0].ordItemInfloList = ordItemInfloList;
			}

			if(cartData.goItemDetailYn == "Y" && cartData.cartPsblType == "") {
				if(cartData.dealItemYn == "Y" || (isMobile && cartData.drctPurchYn == "N")) {
					alert(cartData.msgItemDetail);
					location.href = cartData.itemLnkd;
					return false;

				} else if(isMobile && cartData.drctPurchYn == "Y") {
					if(confirm(cartData.msgItemDetail)) {
						nodcsnOrdder(cartSaveData);
					}
					return false;
				} else {
					alert($.i18n.prop('i18n.front.cart.옵션선택.msg'));
					fn_QuickView(cartData.itemId, cartData.siteNo, cartData.salestrNo);
					return false;
				}
			}

			if(settings.UserInfo.isLoginYn == "N" && type != "payment" && cartTypeCd == "30") {
				var cartCallback = function(){
					if (typeof deferredObj != "undefined") {
						deferredObj = new $.Deferred();
					}

					if ( isMobile == false ) {
						$("#loginBtn").hide();
						$("#joinBtn").hide();
						$("#logoutBtn").show();
					}

					initGnb();
					cart(cartSaveData);
					historySsg.reInitHistory();
				};

				login('', cartCallback);
				return false;
			}


			if (type == 'payment') {
				if(settings.UserInfo.isLoginYn == "N" && !isMobile) {
					var cartCallback = function(){
						if (typeof deferredObj != "undefined") {
							deferredObj = new $.Deferred();
						}
						nodcsnOrdder(cartSaveData)
					};
					login('', cartCallback);
					return false;
				}

				nodcsnOrdder(cartSaveData);
			} else {
				cart(cartSaveData);
			}
		}
};

function formCart(tag, type, bypass){

	var formTag;
	var cartTypeCd;

	if( $(tag).hasClass('btn_dcart') || $(tag).hasClass('schd_deil')) {
		formTag = $(tag).parent().siblings(".cm_item").find(".item_info")
		cartTypeCd = "30";
	} else {
		formTag = $(tag).siblings(".item_info");
		cartTypeCd = formTag.find("input[name=cartTypeCd]").val();
	}

	var itemSellTypeCd = formTag.find("input[name=itemSellTypeCd]").val();
	var sellPrc = formTag.find("input[name=sellPrc]").val();
	var itemChrctDivCd = formTag.find("input[name=itemChrctDivCd]").val();
	var exusItemDtlCd = formTag.find("input[name=exusItemDtlCd]").val();
	var hopeShppDdDivCd = formTag.find("input[name=hopeShppDdDivCd]").val();
	var freeGiftOffer = formTag.find("input[name=freeGiftOffer]").val();
	var frebieInclYn = formTag.find("input[name=frebieInclYn]").val();
	var itemOrdOptYn = formTag.find("input[name=itemOrdOptYn]").val();
	var dealItemYn = formTag.find("input[name=dealItemYn]").val();

	var itemId = formTag.find("input[name=itemId]").val();
	var siteNo = formTag.find("input[name=siteNo]").val();
	var uitemId = formTag.find("input[name=uitemId]").val();
	var salestrNo = formTag.find("input[name=salestrNo]").val();
	var advertBidId = formTag.find("input[name=advertBidId]").val();
	var advertExtensTeryDivCd = formTag.find("input[name=advertExtensTeryDivCd]").val();

	var cartSaveData = {
		"cartTypeCd" : cartTypeCd, //장바구니유형코드(Cart Type Code) [10:국내, 20:해외, 30:정기배송]
		"infloSiteNo" : formTag.find("input[name=infloSiteNo]").val(), //유입사이트번호(Inflow Site Number)
		"items" : [ //상품 정보
			{ //상품1
				"siteNo" : siteNo, //사이트번호(Site Number)
				"itemId" : itemId, //상품ID(Item Identification)
				"uitemId" : uitemId, //단품ID(Unit Item Identification)
				"ordQty" : formTag.find("input[name=ordQty]").val(), //주문수량(Order Quantity)
				"salestrNo" : salestrNo, //영업점번호(Sale Store Number) [백화점 상품 일 경우 영업점]
				"hopeShppDt" : "", //희망배송일자(Hope Shipping Date), [배송일 지정 상품 일 경우 사용]
				"frebieInclYn" : frebieInclYn
			}
		]
	};

	//로그인 체크. 마지막에 체크로 요건 옴 => 다시 처음으로 옴.
	if( !bypass && settings.UserInfo.isLoginYn == "N" && isApp == "Y") {
		mobileLogin();
		return false;
	}

	if (!bypass && settings.UserInfo.isLoginYn == "N" && isMobile && cartTypeCd == "30") {
		mobileLogin();
		return false;
	}

	if(advertBidId != '' && advertBidId != null){
		// 광고상품일 경우 광고ID (advertBidId) 를 JSON에 추가
		var ordItemInfloList = [];
		var ordItemInflo = new Object();
		ordItemInflo.ordItemInfloDivCd = '09';
		ordItemInflo.ordItemInfloTgtId = (advertExtensTeryDivCd == null ? '' : advertExtensTeryDivCd) + advertBidId;
		ordItemInfloList.push(ordItemInflo);
		cartSaveData.items[0].ordItemInfloList = ordItemInfloList;
	}

	if(typeof cmptItems != "undefined") {
		cartSaveData.items.cmptItems = cmptItems;
	}

	if(typeof addOrdOptns != "undefined") {
		cartSaveData.items.addOrdOptns = addOrdOptns;
	}

	if(itemOrdOptYn == 'Y' || itemSellTypeCd != '10' || sellPrc == '0' || ( itemChrctDivCd != "" && "40,50,60,80,C0".indexOf(itemChrctDivCd) > -1 ) || exusItemDtlCd == '30' || hopeShppDdDivCd != '') {
		if(isMobile) {
			var check = false;

			if(itemOrdOptYn == 'Y' || itemSellTypeCd != '10'){
				check = true;
				alert("이 상품은 옵션이 있는 상품 입니다.\n상품상세에서 옵션을 선택해주세요.");
			} else if(hopeShppDdDivCd != ''){
				check = true;
				alert("해당 상품은 희망배송일 지정이 필요한 상품입니다.\n상품상세에서 배송일을 선택해주세요");
			} else {
				if(confirm("해당 상품은 바로 구매만 가능합니다.\n바로구매 페이지로 이동하시겠습니까?")){
					nodcsnOrdder(cartSaveData);
					return false;
				}
			}

			if(check){
				var urlPath = '';

				if(dealItemYn == "Y") {
					urlPath = "/item/dealItemView.ssg?itemId=" + itemId + "&siteNo=" + siteNo + "&salestrNo=" + salestrNo + (advertBidId == "" ? '' : ("&advertBidId=" + advertBidId));
				} else {
					urlPath = "/item/itemView.ssg?itemId=" + itemId + "&siteNo=" + siteNo + "&salestrNo=" + salestrNo + (advertBidId == "" ? '' : ("&advertBidId=" + advertBidId));
				}

				// 히스토리에서 장바구니담기시 해당 지정몰로 이동해야함 #170186
				var landingDomain = formTag.find("input[name=landingDomain]").val();

				location.href = (typeof landingDomain == 'undefined' ? '' : 'http://' + landingDomain) + urlPath;
			}
			return false;
		} else {
			if(dealItemYn == "Y") {
				alert("이 상품은 옵션이 있는 상품 입니다.\n상품상세에서 옵션을 선택해주세요.");
				location.href = "/item/dealItemView.ssg?itemId=" + itemId + "&siteNo=" + siteNo + "&salestrNo=" + salestrNo + (advertBidId == "" ? '' : ("&advertBidId=" + advertBidId));
				return false;
			} else {
				alert("옵션 선택이 필요한 상품입니다.");
				fn_QuickView(itemId, siteNo, salestrNo);
				return false;
			}
		}
	}

	if(settings.UserInfo.isLoginYn == "N" && type != "payment" && cartTypeCd == "30") {
		var cartCallback = function(){
			if (typeof deferredObj != "undefined") {
				deferredObj = new $.Deferred();
			}

			if ( isMobile == false ) {
				$("#loginBtn").hide();
				$("#joinBtn").hide();
				$("#logoutBtn").show();
			}

			initGnb();
			cart(cartSaveData);
			historySsg.reInitHistory();
		};

		login('', cartCallback);
		return false;
	}


	if (type == 'payment') {

		if(!bypass && settings.UserInfo.isLoginYn == "N" && !isMobile) {
			$.data(document.body, "obj", tag, type);
			var paymentCallback = function(){go_Payment();};
			login('', paymentCallback);
			return false;
		}

		nodcsnOrdder(cartSaveData);
	} else {
		cart(cartSaveData);
	}
}

function nodcsnOrdder(obj, memberYn){
	var isSuccess = false;

	if ( typeof emergencyItemIds != "undefined" && emergencyItemIds != "" ) {
		if ( obj != null && obj != "" && obj.items.length == 1 && emergencyItemIds.indexOf(obj.items[0].itemId) > -1 ) {
			alert("품절된 상품입니다.");
			return false;
		}
	}

	$.ajax({
		url : "/comm/nodcsnOrdder.ssg"
		, data : {"json" : JSON.stringify(obj)}
		, method : "post"
		, cache : false
		, async : false
	}).done(function(data){
		if (data != null) {
			if( data.resCd == '0000' ) {
				document.location.href = data.resUrl;
			} else {
				alert(data.resMsg);
			}
		} else {
			alert("data is null");
		}
	}).fail(function(result,status,error){
		alert('주문을 완료 할수 없습니다.');
	});

	return isSuccess;
}

function cart(obj, memberYn, itemViewYn) {
	var isSuccess = false;
	var itemViewYn = itemViewYn || 'N';

	if ( typeof emergencyItemIds != "undefined" && emergencyItemIds != "" ) {
		if ( obj != null && obj != "" && obj.items.length == 1 && emergencyItemIds.indexOf(obj.items[0].itemId) > -1 ) {
			alert("품절된 상품입니다.");
			return false;
		}
	}

	$.ajax({
		url : "/comm/cart.ssg"
		, data : {"json" : JSON.stringify(obj)}
		, method : "post"
		, cache : false
		, async : false
	}).done(function(data){
		if (data != null) {
			if(data.resCd == '0000'){
				isSuccess = true;

				if(!isMobile && location.host.indexOf('thehowdy.ssg.com') == -1) {
					$("#mbrCartCntSpan").text(data.cartCnt);
					$("#mbrCartCntSpan").show();
				}

				if( isMobile == true || location.host.indexOf('thehowdy.ssg.com') > -1) {
					$("#cartCnt").text(data.cartCnt);
					$("#cartCnt").parent().show();

					if( isApp == 'Y') {
						location.href = mobile.customUrl.prefix + '://count/cart/' + data.cartCnt;
					}
				}

				if (itemViewYn == 'N') {
					if(obj != null && obj.cartTypeCd == '30') {
                        alert($.i18n.prop('i18n.front.cart.정기배송.ok'));

					} else if(data.resItemList.length == 1 && data.updCnt == 0 && data.resItemList[0].minOnetOrdPsblQty > 1) {
                        alert($.i18n.prop('i18n.front.cart.추가담기.ok', data.resItemList[0].ordQty) + '\n(' + $.i18n.prop('i18n.front.cart.배수판매.msg', data.resItemList[0].minOnetOrdPsblQty) + ')'); 

					} else if(data.resItemList.length == 1 && data.updCnt > 0) {
                        alert($.i18n.prop('i18n.front.cart.한번더.ok', data.resItemList[0].currentQty) + (data.resItemList[0].minOnetOrdPsblQty > 1 ? '\n(' + $.i18n.prop('i18n.front.cart.배수판매.msg', data.resItemList[0].minOnetOrdPsblQty) + ')' : ""));

					} else {
                        alert($.i18n.prop('i18n.front.cart.normal.ok'));
					}
				}
				//facebook pixel
				if(typeof fbq !== 'undefined') {
					fbq('track', 'AddToCart', {content_type: 'product', content_ids:[obj.items[0].itemId]});
				}

			} else {
				alert(data.resMsg);
			}
		} else {
			alert("잠시 후 다시 시도해주세요.");
		}
	}).fail(function(result,status,error){
		try {
			$.ajax({
				type: "GET",
				data : {
					"errParam1" : obj + '',
					"errParam2" : JSON.stringify(obj),
					"json" : JSON.stringify(obj)
				},
				url: "/comm/cartErrLog.ssg",
				async : true,
				cache : false
			});
		} catch(e){ }

		alert('잠시 후 다시 시도해주세요.');
	});

	return isSuccess;
}

function giftService(obj){

	if (UserInfo.isLoginYn === "N") {
		if (isMobile) {
			mobileLogin('gift', '', obj);
		} else {
			login();
		}
		return false;
	}

	$.ajax({
		url : "/gift/ajaxCreateGiftDemnd.ssg"
		, data : JSON.stringify(obj)
		, method : "post"
		, contentType: "application/json"
		, dataType: "json"
	}).done(function(data){
		if (data != null) {
			if(data.resultCode === '0000'){
				if( isMobile === true && isApp === 'Y' ) {
					location.href = data.result.redirectUrl;
				}else{
					location.href = data.result.redirectUrl;
				}
			} else {
				alert(data.resultCode + " : " + data.resultMsg);
			}
		} else {
			alert("처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
		}
	}).fail(function(result,status,error){
		alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
	});

}

/**
 * 브라우저 타이틀변경
 * @param titleStr - 타이틀문자열
 */
function setDocumentTitle(titleStr) {
	if (!titleStr || titleStr == '') { return; }
	document.title = titleStr + ', ' + document.title.split(', ')[1];
}

/**
 * 콤마추가
 */
function getCommaAdd(value){
	value = value+'';
	var num = value.replace(/,/g, "");
	var num_str = num.toString();
	var result = '';

	for(var i=0; i<num_str.length; i++) {
		var tmp = num_str.length-(i+1);
		if(i%3==0 && i!=0) result = ',' + result;
		result = num_str.charAt(tmp) + result ;
	}

	return result;
}

/**
 * 로그인 윈도우 열기
 * Example  : login(t, callBack, arg)
 * t = 'order' , ''
 * @param callBack : 로그인후 콜백 함수
 */
var loginPopup = "";

function login(t, callBack, ref, wiselogParamStr) {
	if(loginPopup && !loginPopup.closed) {
		loginPopup.focus();
		return false;
	}

	if(settings.UserInfo.isLoginYn == "Y") {
		location.reload();
		return false;
	}

	var type = t || '';
	if(!!callBack) {
		window.loginCallBack = callBack;
	} else {
		window.loginCallBack && delete window.loginCallBack;
	}
	var ref = !!ref ? '&ref=' + escape(ref) : '';
	var wiseLogParam = !!wiselogParamStr ? '&' + wiselogParamStr : '';
	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain;
	var originSite = location.protocol + "//" + location.hostname;
	var width = 950;
	var height = 550;

	if (SSL_DOMAIN.indexOf('thehowdy.ssg.com') > -1) {
		width = 500;
		height = 640;
	}

	loginPopup = popupWin(SSL_DOMAIN + "/member/popup/popupLogin.ssg?originSite=" + escape(originSite) + "&t=" + type + ref + wiseLogParam, "", width, height, "yes", "no");
}

// 해쉬를 파싱해서 오브젝트를 반환함.
function parseHash(){
	var obj     = {};
	var hash    = location.hash;

	if(hash.length != 0){
		hash = hash.substring(hash.indexOf("#")+1);
		var arr = hash.split("&");

		for(var i=0 ; i < arr.length ; i++){
			var arr1 = arr[i].split("=");

			if(arr1.length > 1){
				obj[arr1[0]] = arr1[1];
			}else{
				obj[arr1[0]] = "";
			}
		}
	}

	return obj;
}

// 스카이스크래퍼 배송지 변경 팝업
function popupshpplocList(wiselogParamStr) {
	if (UserInfo.isLoginYn != 'Y') {
		login();
		return;
	}
	var url = settings.domain.protocol + settings.domain.domain + "/comm/popup/shpplocList.ssg?";

	if(wiselogParamStr) {
		url += (wiselogParamStr + "&");
	}

	popupWin(url + "callbackUrl=" + encodeURIComponent("http://"+settings.localDomain+"/comm/popup/sslCallback.ssg"), "", 600, 822, "yes", "no");
}

// 배송지 클린징 팝업호출
function popupShppLocClean(origin, type) {
	var url = settings.domain.protocol + settings.domain.domain + '/campn/popup/introNewZipcd.ssg?origin=' + origin + '&type=' + type;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=no,status=yes,resizable=yes,left=470,top=100,width=524,height=560";
	window.open(url, "popupShppLocClean", option);
}

// 비밀번호 변경 캠페인 팝업
function popupPwdChngCamp() {
	var retURL = escape(document.location.href);
	var url = settings.domain.protocol + settings.domain.domain + "/member/popup/popupPwdChngCamp.ssg?retURL=" + retURL;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=no,status=no,resizable=no, left=100, top=100,width=350,height=390";
	window.open(url, "popupPwdChngCamp", option);
}


// 옴니서비스 동의 캠페인 팝업호출
function popupOmniAgreeCamp() {
	var retURL = escape(document.location.href);
	var url = settings.domain.protocol + settings.domain.domain + "/member/popup/popupOmniAgreeCamp.ssg?retURL=" + retURL;
	var option = "toolbar=no,menubar=no,location=no,scrollbars=yes,status=no,resizable=no, left=100, top=100,width=600,height=690";
	window.open(url, "popupOmniAgreeCamp", option);
}

// wiselog 수집용 껍데기 url 호출
function trackingForWiseLog(clickArea){
	$.get("/trackingForWiseLog.ssg?click=" + clickArea);
}

function wiseLog(type, gbn){
	$.get("/crm/" + type + ".ssg?gbn=" + gbn);
}

function fn_arrivalNotiReg(itemId, siteNo, salestrNo) {

	if( UserInfo.isLoginYn != "Y" ) {
		login();
		return;
	}

	var url = 'http://' + settings.domain.ssg + '/myssg/activityMng/itemNotiReg.ssg?itemId='+itemId+'&siteNo='+siteNo+'&salestrNo='+salestrNo;
	popupWin(url, '입고알림', 644, 692, "yes", "no");

}

var SsgPickup = {

		mobile : {
			getStrNm : function(click_tag, itemId) {

				var magicpickTag = $(click_tag).parents('.benefit_lst').find('.magicpick_tt');
				if(magicpickTag.hasClass('on')) {
					$(click_tag).parents('.benefit_lst').addClass('jp_on');
				} else {
					$.ajax({
						url : "/comm/ajaxPickupSalestrNm.ssg",
						data : {
							itemId : itemId
						},
						method : 'get'
					}).done(function(result) {
						var emArray = [];
						if(result.length == 0) {
							emArray[0] = '<em>가능점포가 없습니다.</em>';
						} else {
							for(var x = 0; x < result.length; x++) {
								emArray[x] = '<em>' + result[x] + '</em>';
							}
						}

						magicpickTag.addClass('on');
						magicpickTag.html(emArray.join(', '));
						$(click_tag).parents('.benefit_lst').addClass('jp_on');
					});
				}

			},

			removeStrNm : function(click_tag) {
				$(click_tag).parents('.benefit_lst').removeClass('jp_on');
			}
		},

		pc : {
			getStrNm : function(event, click_tag, itemId) {

				//body click시 layer 닫힘.
				if (event.stopPropagation) {
					event.stopPropagation();
				} else if (window.event) {
					window.event.cancelBubble = true;
				}

				var welTarget = $(click_tag);
				var magicPickLayer = welTarget.parent().find('.magicpick_tip_layer');

				if(welTarget.hasClass('on')) {
					welTarget.trigger('hideMagicpickup');
				} else {

					if(!magicPickLayer.hasClass('on')) {
						$.ajax({
							url : "/comm/ajaxPickupSalestrNm.ssg",
							data : {
								itemId : itemId
							},
							method : 'get'
						}).done(function(result) {
							var emArray = [];
							if(result.length == 0) {
								emArray[0] = '<em>가능점포가 없습니다.</em>';
							} else {
								for(var x = 0; x < result.length; x++) {
									emArray[x] = '<em>' + result[x] + '</em>';
								}
							}

							magicPickLayer.addClass('on');
							magicPickLayer.html(emArray.join(', '));
							welTarget.trigger('showMagicpickup');
						});
					} else {
						welTarget.trigger('showMagicpickup');
					}
				}
			}
		}
};