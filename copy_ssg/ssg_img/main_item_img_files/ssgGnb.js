/**
 * jquery.cookie 사용 금지
 */

/**
 * ssgGnbAjx 호출후 실행되야될 펑션 모음
 * @type {jQuery.Deferred}
 */
var deferredObj = new $.Deferred();

function logout(ref, wiselogParamStr) {
	var domain = settings.domain.protocol + settings.domain.domain + settings.domain.context;

	if(settings.UserInfo.mbrTypeCd == '30' ) {
		domain = settings.domain.protocol + settings.domain.sfcDomain + settings.domain.context;
	}

	if( ref ) {
		ref = "?retURL=" + encodeURIComponent(ref);
	} else {
		if( location.hostname.indexOf("pay.") > -1 || location.hostname.indexOf("member.") > -1 ) {
			var retUrl = 'http://' + settings.domain.ssg;
			if(settings.isThehowdy){	//thehowdy
				retUrl = 'http://' + settings.domain.thehowdy;
			} else if(settings.UserInfo.mbrTypeCd == '30'){	//SFC
				retUrl = 'http://' + settings.domain.sfc.ssg;
			}
			ref = "?retURL=" + encodeURIComponent(retUrl);
		} else {
			var retUrl = 'http://' + window.location.hostname;
			ref = "?retURL=" + encodeURIComponent(retUrl);
		}
	}

	var newWiselogParamStr = '';

	if(wiselogParamStr) {
		newWiselogParamStr = '&' + wiselogParamStr;
	}

	location.href = domain + "/member/logout.ssg" + ref + newWiselogParamStr;
}

function fn_joinSite(ref) {
	if( settings.UserInfo.isLoginYn == 'Y' && settings.UserInfo.mbrTypeCd == '90' ) {
		logout(ref);
	} else if ( settings.UserInfo.isLoginYn == 'N' || settings.UserInfo.isLoginYn == '' ) {
		location.href = ref;
	}
}

function goCustomer() {
	var domain = settings.domain.ssg;
	var Nethru_domain = Nethru_getDomain();
	var aplSiteNo = "";

	if( location.href.indexOf("emart.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.emall;
	}else if( location.href.indexOf("traders.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.traders;
	}else if( location.href.indexOf("boots.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.boots;
	}else if( location.href.indexOf("shinsegaemall.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.small;
	}else if( location.href.indexOf("www.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.scom;
	}else if( location.href.indexOf("department.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.sdept;
	}else if( location.href.indexOf("boons.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.boons;
	}else if( location.href.indexOf("tv.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.tv;
	}else if( location.href.indexOf("sivillage.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.sivillage;
	}else if( location.href.indexOf("howdy.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.howdy;
	}else if( location.href.indexOf("starfield.ssg.com") > -1 ) {
		aplSiteNo = settings.siteno.starfield;
	}else{
		aplSiteNo = settings.siteno.scom;
	}

	// 쿠키 저장
	Nethru_SetCookie("infloSiteNo", aplSiteNo, null, "/", Nethru_domain);
	// 고객센터로 이동
	location.href = "http://"+domain+"/customer/main.ssg?aplSiteNo="+aplSiteNo;
}

/**
 * 페이스북 기본 가입자가 장바구니, 바로구매, MYSSG에 접근할 경우
 * 페이스북연동가입 > 정보입력 페이지 (팝업)
 * Example  : popupFormFacebook()
 */
function popupFormFacebook(ref) {
	if (!ref) {
		ref = location.href;
	}

	alert('Facebook을 통한 회원가입 시 약관 동의 및 개인정보 등록을 나중에 입력하기로 선택하셨습니다.\n정상적인 서비스 이용을 위해 나머지 정보를 입력해 주세요. 확인을 누르시면 해당 페이지로 이동합니다.');

	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain + settings.domain.context;
	popupWin(SSL_DOMAIN + "/member/popup/formFacebook.ssg?fcbookJoinRetURL=" + escape(ref), "", 900, 1208, "yes", "no");
}

/**
 * 모바일 페이스북 기본 가입자가 장바구니, 바로구매, MYSSG에 접근할 경우
 * 모바일 페이스북연동가입 > 4정보입력 페이지
 * Example  : mobileFormFacebook()
 */
function mobileFormFacebook(ref, bypass) {
	var ref = ref || location.href;
	var bypass = bypass || '';

	alert('Facebook을 통한 회원가입 시 약관 동의 및 개인정보 등록을 나중에 입력하기로 선택하셨습니다.\n정상적인 서비스 이용을 위해 나머지 정보를 입력해 주세요. 확인을 누르시면 해당 페이지로 이동합니다.');

	var SSL_DOMAIN = settings.domain.protocol + settings.domain.domain + settings.domain.context;
	document.location.href = SSL_DOMAIN + "/member/join/formFacebook.ssg?fcbookJoinRetURL=" + escape(ref) + "&bypass=" + bypass;
}

function initGnb(callBack) {
	var masterDomain = (window.location.hostname.indexOf('local-') > -1 ? "http://" : "https://") + settings.domain.ssg;

	deferredObj.done(function(result){
		if( ! result.isMobile ) {
			initPc(result);
		} else {
			initMobile(result);
		}
	});

	var param = {
		thehowdy : location.hostname.indexOf('thehowdy.ssg.com') > -1 ? 'Y' : 'N'
	};

	$.ajax({
		url: masterDomain + '/comm/ajaxSsgGnb.ssg',
		async: false,
		cache: false,
		data: param,
		dataType: 'jsonp',
		success: function(result) {
			// commEnv의 값을 설정함.
			UserInfo = result.userInfo;
			// settings의 값을 설정함.
			settings.isMobile   = result.isMobile;
			settings.UserInfo   = result.userInfo;
			settings.UserInfo.mbrLoginId2 = $.cookie('MEMBER_ID') == undefined ? '' : $.cookie('MEMBER_ID');
			settings.emSaleStrNo = result.emSaleStrNo;
			settings.emRsvtShppPsblYn = result.emRsvtShppPsblYn;
			settings.emergency = result.emergency;

			deferredObj.resolve(result);

			if(typeof callBack === 'function') {
				callBack(UserInfo);
			}
		}
	});
}

function initPc(result) {
	// 사용자별 인증 정보를 구성함.
	if ( result.userInfo.isLoginYn == "Y" ) {
		var str = result.userInfo.userNm;
		if (result.userInfo.mbrTypeCd == "90") {
			str += "님(비회원)";
			$("#loginBtn").remove();
			$("#joinBtn, #logoutBtn").show();
			$("#logoutBtn").attr("class", "loginYesArea");
		} else if (result.userInfo.emplYn == "Y") {
			str += "님(임직원)";
		} else if (result.userInfo.mbrcoNm != null) {
			str += "님(" + result.userInfo.mbrcoNm.substring(0, 8) + ")";
		} else {
			str += "님";
		}

		if($("#gnbUserInfoArea.gnbUserInfoArea a").length > 0) {
			$("#gnbUserInfoArea.gnbUserInfoArea a").html(str);
		} else {
			$("#gnbUserInfoArea.gnbUserInfoArea").html(str);
		}
		$("#gnbUserInfoArea.gnbUserInfoArea").show();

		if(location.hostname.indexOf("thehowdy.ssg.com") > -1) {
			$("#member_message").show();
		}

		setVvipView('pc', result);

		setMbrProgOrdCnt();
	}

	var mbrCartCnt = Number(result.cartCnt);
	if (!isNaN(mbrCartCnt) && mbrCartCnt > 0) {
		if ($("#cartCntInfoBtn").length > 0) { // thehowdy
			$("#cartCntInfoBtn").find("#cartCnt").text(mbrCartCnt);
			$("#cartCntInfoBtn").show();
		} else if ($("#mbrCartCntSpan").length > 0) {
			$("#mbrCartCntSpan").text(mbrCartCnt > 99 ? "99+" : mbrCartCnt);
			$("#mbrCartCntSpan").show();
		}
	}

	if(settings.emergency.GNB_CART_PREVIEW_PASS !== 'Y') {
		$('#utilCartPreviewGo').on('cartLayerGoOpened', function(){
			var resultHtml = '',
				loadingHtml = '',
				aItemHtml = '',
				mallIconCss = { 6001: 'em', 6002: 'tr', 6003: 'bt', 6004: 'sm', 6009: 'sd', 6100: 'hwd', 6200: 'tv', 6300: 'siv'},
				cartPreLayerObj = $('#utilCartPreviewGo > div.util_cart_layer'),
				numFormatRegex = /(?=(?:\d{3})+$)(?!^)/g,
				maxCount,
				zone = settings.zone == 'prod' ? '' : settings.zone + '-',
				cartType10Count = 0, //일반장바구니 개수
				customFloor = function(value) {
					var digits = Math.pow(10, 2),
						num = Math.floor(value * digits) / digits;
					return num.toFixed(2);
				};

			if(initPc.cartPreviewProgress) {
				return;
			}

			initPc.cartPreviewProgress = true;
			$('#utilCartPreviewGo').addClass('on');

			loadingHtml += '<p class="util_cart_loading"><span class="blind">상품 목록 로딩중입니다.</span></p>';
			loadingHtml += '<dl class="util_cart_total"><dd class="util_cart_totaldsc"><em class="util_cart_pointx2">로딩중 ..</em></dd></dl>';
			cartPreLayerObj.html(loadingHtml);
			$.ajax({
				url: '//' + (zone == 'qa2' ? zone.replace('qa2', 'qa') : zone) + 'oapi.ssg.com/front/cart/gnb.ssg',
				type: 'GET',
				dataType: 'jsonp',
				jsonp: 'callback',
				timeout: 5000,
				success: function(result) {
					if(result.resCd === '0000') {
						if(result.cartGnbItemList.length > 0) {
							maxCount = result.cartGnbItemList.length > 5 ? 5 : result.cartGnbItemList.length;
							resultHtml += '<em class="util_cart_tit">최근 담은 상품 입니다</em>';
							resultHtml += '<ul class="util_cartlst">';
							for(var x = 0; x < maxCount; x++) {
								var aItem = result.cartGnbItemList[x];
								if(aItem.cartTypeCd === '10') {
									cartType10Count++;
								}
								aItemHtml += '<li class="util_cartlst_item">';
								aItemHtml += '    <div class="util_cartlst_thmb">';
								aItemHtml += '        <a href="' + aItem.itemUrl + '" class="clickable" data-react-tarea="몰공통|GNB|상품상세" aria-hidden="true">';
								aItemHtml += '            <img src="' + aItem.itemImgPath + '" onerror="this.onerror=null;this.src=\'' + aItem.noImagePath + '\'" alt="' + aItem.itemNm + '" class="util_cartlst_img">';
								aItemHtml += '        </a>';
								if (aItem.sellPsblYn != 'Y') {
									aItemHtml += '    <span class="util_cartlst_soldout notranslate"><em class="tx_ko">일시품절</em><em class="tx_gl">Sold Out</em></span>';
								}
								aItemHtml += '    </div>';
								aItemHtml += '    <dl class="util_cartlst_infoarea">';
								aItemHtml += '        <dt><a href="' + aItem.itemUrl + '" class="util_cartlst_name notranslate clickable" data-react-tarea="몰공통|GNB|상품상세">' + aItem.itemNm + '</a></dt>';
								aItemHtml += '        <dd class="util_cartlst_mall ' + (mallIconCss[aItem.siteNo] || 'ssg')  + '"><span class="blind">' + (settings.sitenm[aItem.siteNo] || settings.sitenm['6005']) + '</span></dd>';
								aItemHtml += '        <dd class="util_cartlst_info">' + (aItem.rsvtShppYn == 'Y' ? '쓱배송' : '택배배송') + '</dd>';
								aItemHtml += '        <dd class="util_cartlst_info">' + (aItem.ordQty + "").replace(numFormatRegex, ',') + '개</dd>';
								aItemHtml += '        <dd class="util_cartlst_info"><span class="util_cartlst_price"><em class="ssg_price">' + (aItem.ssgPrice + "").replace(numFormatRegex, ',') + '</em><span class="ssg_tx">원</span></span></dd>';
								aItemHtml += '    </dl>';
								aItemHtml += '</li>';
							}
							resultHtml += aItemHtml;
							resultHtml += '</ul>';
							resultHtml += '<a href="javascript:ssgGnb.fn_btnClickCart();" class="util_cart_more clickable" data-react-tarea="몰공통|GNB|장바구니확인">총 ' + result.itemTot + '개 상품 장바구니에서 확인하기</a>';
							resultHtml += '<dl class="util_cart_total">';
							resultHtml += '    <dt class="util_cart_totaltit">장바구니 총금액</dt>';
							resultHtml += '    <dd class="util_cart_totaldsc">';
							resultHtml += '        <span class="util_cart_price"><em class="ssg_price">' + (result.ssgTotAmt + "").replace(numFormatRegex, ',') + '</em><span class="ssg_tx">원</span></span>';
							resultHtml += '    </dd>';
							if(cartType10Count > 0) {
								resultHtml += '    <dt class="util_cart_totaltit">총 배송비</dt>';
								resultHtml += '    <dd class="util_cart_totaldsc">';
								if(result.rsvtCnt > 0 && result.rsvtItemTotShppcstAmt == 0) {
									resultHtml += '    쓱배송 <em class="util_cart_pointx">무료배송</em>';
								} else if(result.rsvtCnt > 0 && result.rsvtItemTotShppcstAmt > 0) {
									resultHtml += '    쓱배송 <span class="util_cart_price"><em class="ssg_price">' + (result.rsvtItemTotShppcstAmt + "").replace(numFormatRegex, ',') + '</em><span class="ssg_tx">원</span></span>';
								}
								if(result.rsvtCnt > 0 && result.deliCnt > 0) {
									resultHtml += '    + ';
								}
								if(result.deliCnt > 0 && result.deliItemTotShppcstAmt == 0) {
									resultHtml += '    택배배송 <em class="util_cart_pointx">무료배송</em>';
								} else if(result.deliCnt > 0 && result.deliItemTotShppcstAmt > 0) {
									resultHtml += '    택배배송 <span class="util_cart_price"><em class="ssg_price">' + (result.deliItemTotShppcstAmt + "").replace(numFormatRegex, ',') + '</em><span class="ssg_tx">원</span></span>';
								}
								resultHtml += '    </dd>';
							}
							resultHtml += '</dl>';
							$(cartPreLayerObj).html(resultHtml);
						} else {
							resultHtml += '<em class="util_cart_empty">장바구니에 담은 상품이 없습니다</em>';
							$(cartPreLayerObj).addClass('ty_empty');
							$(cartPreLayerObj).html(resultHtml);
						}
					}
				}
			}).always(function() {
				initPc.cartPreviewProgress = false;
				if(typeof ssg_react !== 'undefined' && typeof ssg_react.directCall === 'function') {
					ssg_react.directCall({tarea: '몰공통|GNB|레이어_열림'})
				}
			});
		});
	} else {
		$('#utilCartPreviewGo').removeClass('active_preview');
		$('a.util_cart_btnpreview').append($("#mbrCartCntSpan"));
	}

	// 바로S
	if (location.hostname.indexOf("pay.") < 0
			&& location.hostname.indexOf("howdy.ssg.com") < 0
			&& location.hostname.indexOf("thehowdy.ssg.com")) {
		fnGoS();
	}

	// 제휴 채널 팝업
	openB2ePop();
}

function setVvipView(dType, result) {
	try {
		if (result.userInfo.vvipYn != 'Y') return;
		if (dType == 'pc') {
			setTimeout(function() {
				setBirthdayLogo(dType, result);
			}, 200);
		} else if (dType == 'mobile') {
			if (!setBirthdayLogo(dType, result)) {
				if (typeof(setSsgMainVvipBanr) == 'function') {
					setSsgMainVvipBanr();
				}
			}
		}
	} catch (e) {
		var console = window.console || {log:function(){}};
		console.log(e);
	}
}

// GNB 생일 로고/배너 표시
function setBirthdayLogo(dType, result) {
	if (dType == 'pc') {
		if (location.hostname.indexOf("www.ssg.com") < 0 || location.pathname.indexOf("/myssg/") > -1) {
			return false;
		}
	}

	var birthday = result.userInfo.birthday;
	var userNm = result.userInfo.userNm;
	var mbrTypeCd = result.userInfo.mbrTypeCd;

	if (!birthday) { return false; }
	var todayDate = new Date();
	var monDate = new Date(todayDate.getTime());
	monDate.setDate(monDate.getDate() - (todayDate.getDay() == 0 ? 6 : todayDate.getDay() - 1));
	monDate.setHours(0, 0, 0, 0);
	var sunDate = new Date(todayDate.getTime());
	sunDate.setDate(sunDate.getDate() + (todayDate.getDay() == 0 ? 0 : 7 - todayDate.getDay()));
	sunDate.setHours(23, 59, 59, 999);
	var birthDate = new Date(todayDate.getFullYear(), Number(birthday.substring(0, 2))-1, Number(birthday.substring(2, 4)));

	if (monDate.getTime() <= birthDate.getTime() && birthDate.getTime() <= sunDate.getTime()) {

		if (dType == 'pc') {
			var vvipVal = "name_x";
			if ((mbrTypeCd == "10" || mbrTypeCd == "20" || mbrTypeCd == "25" || mbrTypeCd == "30")
				&& userNm && userNm.length < 5) {
				vvipVal = "name_o";
			}
			$('#logoSection').vvipLogo({
				ty: 'bg_birthday',
				vvip: vvipVal,
				msg1: 'HAPPY', msg2: 'BIRTHDAY',
				name: userNm,
				link: 'http://' + settings.domain.ssg
			});
		}

		// SSG/MSSG 메인 생일배너 표시
		if (typeof(setSsgMainBirthDayBanr) == 'function') {
			setSsgMainBirthDayBanr({ name: userNm, month: birthday.substring(0, 2), day: birthday.substring(2, 4) });
			return true;
		}
	}

	return false;
}

// GNB 상단 진행주문수 표시
function setMbrProgOrdCnt() {
	var ajaxUrl = "/comm/ajaxGetMbrProgOrdCnt.ssg";
	if (location.hostname.indexOf("pay.") > -1 || location.hostname.indexOf("member.") > -1) {
		ajaxUrl = "https://" + settings.domain.ssg + ajaxUrl;
	}

	$.ajax({
		url: ajaxUrl,
		dataType: "jsonp",
		success: function(result) {
			if (result && !isNaN(result.mbrProgOrdCnt) && result.mbrProgOrdCnt > 0) {
				$("#mbrProgOrdCntSpan").text(result.mbrProgOrdCnt > 99 ? "99+" : result.mbrProgOrdCnt);
				$("#mbrProgOrdCntSpan").show();
			}
		}
	});
}

function initMobile(result) {
	// 모바일용 공통 정보 셋팅
	if ( result.userInfo.isLoginYn == "Y" ) {
		if(location.hostname.indexOf("thehowdy.ssg.com") > 0) {
			var userNmStr = result.userInfo.userNm;

			if (result.userInfo.mbrTypeCd == "90") {
				userNmStr += "(비회원)님";
			} else if (result.userInfo.emplYn == "Y") {
				userNmStr += "(임직원)님";
			} else if (result.userInfo.mbrcoNm != null) {
				userNmStr += "(" + result.userInfo.mbrcoNm.substring(0, 8) + ")님";
			} else {
				userNmStr += "님";
			}

			var innerHTML = $("#lnb_logoutText").html() + userNmStr;
			$("#lnb_logoutText").html(innerHTML);
			$("#lnb_logoutText").show();
		} else {
			var lnbLoginTxt = result.userInfo.userNm + "님";
			var lnbGradeTxt = "";

			if(result.userInfo.mbrTypeCd != '90') {
				if ( result.userInfo.mbrGrdCd == "50" ) {
					lnbGradeTxt = '<i class="clnb_ic clnb_ic_vip">VIP</i>';
				} else if ( result.userInfo.mbrGrdCd == "40" ) {
					lnbGradeTxt = '<i class="clnb_ic clnb_ic_gold">GOLD</i>';
				} else if ( result.userInfo.mbrGrdCd == "30" ) {
					lnbGradeTxt = '<i class="clnb_ic clnb_ic_silver">SILVER</i>';
				} else if ( result.userInfo.mbrGrdCd == "20" ) {
					lnbGradeTxt = '<i class="clnb_ic clnb_ic_bronze">BRONZE</i>';
				} else if ( result.userInfo.mbrGrdCd == "10" ) {
					lnbGradeTxt = '<i class="clnb_ic clnb_ic_family">FAMILY</i>';
				} else {
					lnbGradeTxt = '<i class="clnb_ic clnb_ic_family">FAMILY</i>';
				}
			}
			$("#lnbUserNm").html(lnbLoginTxt);
			$("#lnbGradeNm").html(lnbGradeTxt);

			setVvipView('mobile', result);
		}
	}

	if(location.hostname.indexOf("thehowdy.ssg.com") > 0) {
		if(typeof(result.cartCnt) == "number" && result.cartCnt > 0){
			var str = result.cartCnt > 99 ? "99+" : result.cartCnt;
			$("#cartCnt").text(str);
			$("#cartCnt").show();
		} else {
			$("#cartCnt").hide();
		}

		$("#gnb_cart_signed_in").show();
		$("#gnb_cart_signed_out").hide();

	} else {
		if(typeof(result.cartCnt) == "number" && result.cartCnt > 0){
			var str = result.cartCnt > 99 ? "+99" : result.cartCnt;
			$("#cartCnt").text(str);
			$("#cartCnt").parents('span.pd_numbx').show();
			// 타이틀 우측영역 에서 장바구니
			$("#topCartCnt").text(str);
		}
	}

	if(typeof isApp !== 'undefined') {
		if(isApp != 'Y' && location.hostname.indexOf("thehowdy.ssg.com") < 0 && location.hostname.indexOf("howdy.ssg.com") < 0) {
			openB2ePop('mobile');
		}
	}
}

// 바로 S 체크 ( 현재 ckwhere가 급증하여 다른 방법을 찾아봐야 할지도 모르겠음 ...)
function fnGoS() {
	var gosHtml = [];
	var isGoS = false;
	var goSCkwhere = ["batang","newbatang","newbatang2","s_gomfav","s_gomfav1","szum_baro","szum_bookmark","naver_com"
					,"nate_ser","daum_nate_br","daum_ser","s_ggdirect","naver_happybuyrus","daum_happybuyrus","nate_happybuyrus"
					,"direct_shinsegae","emart_app_android","emart_app_iOS_pad","emart_app_iOS","dircet_memart","s_ems","ems","mail_off"
					,"mail_hfbanner","mail_wish","mail_emartm","mail_camp","mail_mobile","mail_auto","mail_dep","target"
					,"mail","googletr1","navertr1","daumtr1-1","natetr1","direct_emart","direct_traders","direct_boons"
					,"mobile_app_android","mobile_app_iOS_pad","mobile_app_iOS","direct_mshinsegae","mobile_app"
					,"ems_target","ems_obanjang","ems_crm","ems1","ems","ems_crm_point","ems_crm_repurchase","ggdirect"
					,"e_gomfav","e_gomfav1","tvfavo","tvbaro","tvdir","tvfavo2","e_zum_direct","e_zum_bookmark"
					,"naver2","nate3","natebr","natembr","daum1","cgr","ssg_batang","ssg_gomfa","ssg_gomfamo","zum_direct","zum_bookmark","ssg_com"
					,"ssg_nate_txt","mssg_nate_txt","ssg_daum_direct","mssg_daum_direct","ssg_ggdirect","direct_ssg","ssg_app_Android"
					,"ssg_app_iOS_Pad","ssg_app_iOS","direct_mssg","ssg_mail","ssg_birthday","ssg_grade","ssg_gombaro", "ssgb2e", "outb2e"
					];
	var goSeventPromId = '1100344210';

	for (var i = 0; i < goSCkwhere.length; i++) {
		if (typeof ckwhereVal !== "undefined" && goSCkwhere[i] == ckwhereVal) {
			isGoS = true;
			break;
		}
	}

	gosHtml.push('<a href="javascript:void(0)">바로가기 ');
	gosHtml.push('<span class="ico">');


	// B2E 일때 바로가기 OFF 기능 삭제하였음
	if (!isGoS) {
		gosHtml.push('<img src="' + settings.imgPath + '/common_layout/txt_util_s_off.gif" alt="OFF" />');
	}else{
		gosHtml.push('<img src="' + settings.imgPath + '/common_layout/txt_util_s_on.gif" alt="ON" />');
	}

	gosHtml.push(' </span></a>');
	gosHtml.push('  <div class="util_s_bx">');

	if (isGoS) {
		gosHtml.push('      <img src="' + settings.imgPath + '/common_layout/bx_util_s_v2_on.gif" alt="바로S ON 상태입니다." usemap="#bx_util_s" />');
		gosHtml.push('      <p class="blind">바로 오면 바로 쓸 수 있는 혜택</p>');
		gosHtml.push('      <map name="bx_util_s" id="bx_util_s">');
		gosHtml.push('      <area shape="rect" coords="8,75,225,126" class="clickable" data-react-tarea="몰공통|GNB|바로가기on" href="http://' + settings.domain.ssg + '/event/eventDetail.ssg?promId=' + goSeventPromId + '" alt="바로가기 ON 5% 할인쿠폰 받기" />');
		gosHtml.push('      </map>');
	} else {
		gosHtml.push('      <img src="' + settings.imgPath + '/common_layout/bx_util_s_v2_off.gif" alt="바로S OFF 상태입니다." usemap="#bx_util_s" />');
	}

	gosHtml.push('  </div>');

	$("#go_s").html(gosHtml.join(''));
}

// 제휴채널 통해서 들어왔지만 B2E회원의 경우 제휴혜택 적용 팝업
function openB2ePop(type) {
	var beforeCkwhere = getCookieVal("before_ckval");

	if ( settings.domain.isHttpFlag == true && typeof ckwhereVal !== "undefined" && ckwhereVal != "" && beforeCkwhere != "" &&
			location.hostname.indexOf("pay.") < 0 && settings.UserInfo.isLoginYn == "Y" && ckwhereVal != beforeCkwhere ) {

		var affPopCkwhereCommon = [ "shinhan", "ssg_shinhan", "shcard", "hanamall", "hanaskcard_mail",
									"hanaskcard", "hanacard", "ssg_hanask", "kbmall", "kbcardshop_m",
									"kbcardshop_happy", "kbcardshop", "ssg_kbcard", "lottemall", "s_lottemall",
									"ssg_ltcard", "hyundaicard", "hamall", "hcard", "ssg_hdcard",
									"sconnect", "scardmall", "sscard_sc", "sscard", "sscard_m",
									"ssg_sscard", "citicard_mobile", "citicard_coupon", "citicard", "asiana",
									"asianaclub", "ssg_asiana", "hanafos", "s_hanafos", "ssg_hanafos",
									"cashbagmob" ];
		var affPopCkwherePc		= [ "naver1", "naver", "naver_happy", "mnaver", "s_naver",
									"mssg_naver", "ssg_naver", "m_daumsh", "daumsh", "daum_shop",
									"daum_mobile", "mssg_daum", "ssg_daum", "enuri", "m_enuri",
									"s_enuri", "enuri_happy", "menur", "mssg_enuri", "ssg_enuri",
									"danawa", "danawa1", "s_danawa", "danawa_happy", "mssg_danawa",
									"ssg_danawa", "BB", "bestbuyer_happy", "bestbuyer", "shcard_smart",
									"nhcard", "pointpark_happy", "pointpark_ktf", "pointpark", "ollehhari",
									"megapass", "s_megapass", "olleh", "ssg_megapass", "thiat01",
									"pointbanking", "ssg_thiat", "cashbagmall", "cashmail", "cashbagmall_mail",
									"cashbagmall_banner", "s_cashbagmall", "ssg_cashbag", "ctland", "cland",
									"ssg_ctland" ];
		var affPopCkwhereMobile = [ "hdmail", "hdcoupon", "hanamall_banner", "ssg_hana", "asiana_mobile",
									"asianaclub_mobile", "s_cashbagmob", "ssg_mcashbag" ];

		var checkAffPopCkwhere = [];

		if(type == 'mobile') {
			checkAffPopCkwhere = affPopCkwhereCommon.concat(affPopCkwhereMobile);
		} else {
			checkAffPopCkwhere = affPopCkwhereCommon.concat(affPopCkwherePc);
		}

		for (var idx in checkAffPopCkwhere) {
			if ( checkAffPopCkwhere[idx] == beforeCkwhere && getCookieVal(beforeCkwhere) != "Y") {

				if(type == 'mobile') {
					var b2ePopHtml = [];

					b2ePopHtml.push('<div class="cb_box">');
					b2ePopHtml.push('	<div class="cb_thum" id="com_channel_ban_sub">');
					b2ePopHtml.push('		<a href="javascript:void(0);">');
					b2ePopHtml.push('			<img src="http://static.ssgcdn.com/ui/common/img/popup/pop_b2e.jpg" alt="제휴혜택안내">');
					b2ePopHtml.push('		</a>');
					b2ePopHtml.push('	</div>');
					b2ePopHtml.push('	<div class="cb_list_area">');
					b2ePopHtml.push('		<ul>');
					b2ePopHtml.push('			<li><a href="javascript:openB2ePopClose();" class="cb_today">오늘 하루 보지 않기<span><em class="blind">닫기</em></span></a></li>');
					b2ePopHtml.push('			<li><a href="javascript:openB2ePopClose();" class="cb_close">닫기</a></li>');
					b2ePopHtml.push('		</ul>');
					b2ePopHtml.push('	</div>');
					b2ePopHtml.push('</div>');

					$("#notice_b2e_pop").html(b2ePopHtml.join(''));
				}

				$("#notice_b2e_pop").show();
				return;
			}
		}
	}
}

function openB2ePopClose() {
	var beforeCkwhere = getCookieVal("before_ckval");
	setCookieVal(beforeCkwhere, "Y", 1);
	$("#notice_b2e_pop").html('');
	$("#notice_b2e_pop").hide();
}

function getCookieVal(name){
	var nameOfCookie = name + "=";
	var x = 0;
	var endOfCookie;
	while ( x <= document.cookie.length) {
		var y = (x+nameOfCookie.length);
		if ( document.cookie.substring( x, y ) == nameOfCookie ) {
			if ( (endOfCookie=document.cookie.indexOf( ";", y )) == -1 ) endOfCookie = document.cookie.length;
				return decodeURIComponent( document.cookie.substring( y, endOfCookie ) );
		}
		x = document.cookie.indexOf( " ", x ) + 1;
		if (x == 0) break;
	}
	return "";
}

function setCookieVal(name, value, expire, domain) {
	var endDate = new Date();
	endDate.setDate(endDate.getDate() + expire);
	var cookieStr = name + "=" + encodeURIComponent(value) + "; path=/; expires=" + endDate.toGMTString() + ";";
	if (typeof domain != 'undefined' && domain) {
		cookieStr += ' domain=' + domain + ';';
	}
	document.cookie = cookieStr;
}

function goCmptIdLiveNewsPnshop(relativePathYn){
	$.ajax({
		url: '/comm/ajaxCmptIdLiveNewsPnshop.ssg',
		success: function(result) {
			if(result == ''){
				alert('금일 진행되는 신문광고가 없습니다.');
			}else{
				// SSG 메인에도 노출되는 이슈가 생겨서 절대경로로 변경함. pay, member에서 사용하지 않는 변수 var ssg.domain 사용함.< 다른 부분에서 사용할 경우 에러 >
				if(typeof relativePathYn != "undefined" && relativePathYn == "Y"){ //상품상세에서 진입 시 상대 경로로 유입 -방수인P 요청
					location.href = "/plan/planShop.ssg?planShopId=" + result;
				}else{
					location.href = 'http://'+ ssg.domain.emart + "/plan/planShop.ssg?planShopId=" + result;
				}
			}
		}
	});
}

// INIT
$(function(){
	// CK_WHERE값 전역변수
	var value = getCookieVal("where");
	var ckwhere_idx = value.indexOf("CK_WHERE=");

	if ( ckwhere_idx >=0 ) {
		window.ckwhereVal = value.substr(ckwhere_idx+9);
		var ckwhere_e_idx = ckwhereVal.indexOf("&");
		if ( ckwhere_e_idx >= 0 ) {
			window.ckwhereVal = ckwhereVal.substr(0, ckwhere_e_idx);
		}
	}

	initGnb();

	if(typeof ssg_react !== 'undefined' && typeof ssg_react.init === 'function') {
		ssg_react.init();
	}

	if(typeof ssg_ad !== 'undefined' && typeof ssg_ad.init === 'function') {
		ssg_ad.init();
	}

	deferredObj.done(function() {
		var cstalkOpen = function() {
			var zonePrefix = '';
			if(settings.zone == 'local') {
				zonePrefix = 'dev-';
			} else if(settings.zone != 'prod') {
				zonePrefix = settings.zone + '-';
			}
			var cstalkUrl = 'http://' + zonePrefix + 'talk.ssg.com/webchat?gateType=cs&siteNo=' + (settings.curr_siteno || '6005');
			window.open(cstalkUrl, 'SSGTALK_WEB', 'width=680, height=650, resizable=yes');
		}
		$('._cstalk_open_pc').on('click', function() {
			if(settings.UserInfo.isLoginYn == 'N') {
				var currUrl = document.location.href;
				login('', function() {
					$.cookie('CSTALK_POPUP_OPEN', 'Y', {expires: 1, path: '/', domain: '.ssg.com'});
					//바닥 페이지 리로딩
					var currUrl = document.URL;
					document.location.href = currUrl;
				});
			} else {
				cstalkOpen();
			}
		});

		var cstalkPopupOpen = $.cookie('CSTALK_POPUP_OPEN');
		$.cookie('CSTALK_POPUP_OPEN', null, { path: '/', domain: '.ssg.com' });
		if ( cstalkPopupOpen != null && cstalkPopupOpen == 'Y' ) {
			cstalkOpen();
		}
	});
});
