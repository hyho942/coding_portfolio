/**
  * 클립 관련
  */
window.console = window.console ? window.console : { log: function() {} };
var doClipLogging = false;
function clipLog(message) {
	if ( doClipLogging ) {
		console.log(message);
	}
}
function clipAlert(message) {
	if ( doClipLogging ) {
		alert(message);
	}
}

// preload
if ( typeof settings.mobilAppNo == 'undefined' ) {
	settings.mobilAppNo = $.cookie('MOBIL_APP_NO');
}
if ( settings.mobilAppNo == null ) {
	settings.mobilAppNo = '';
}

var Clip = {
	// 기본 설정 사항
	property: {
		"pathname": $(location).attr('pathname'),
		"domain": $(location).attr('hostname'),
		"protocol": $(location).attr('protocol') + "//",
		"methodType": 'POST',
		"dataType": 'JSON',
		"cache": false,
		"clipObjList": new Object(),
		"bindingClass": ".clip_wrap, .cm_clip_item, .cm_clip_cnt, .cm_clip_best, .cm_clip_top, .cm_clip_dtl, .cm_clip_cdtl, .cm_clip_part, .cunit_ico_clip, .cm_clip_planshop, .cm_clip_mgz",
		"isNotEmergencyDisabling": true,
		"isLogin" : settings.UserInfo.isLoginYn == 'Y' ? true : false
	},
	getItemDetailObj : function() {
		if ( $('.cm_clip_dtl').length == 1 ) {
			return $('.cm_clip_dtl');
		} else {
			return $('.cm_clip_cdtl'); // for new item deatil of mobile
		}
	},
	attnDivCdNm: {'10':'상품','20':'카테고리','30':'브랜드&공식스토어','40':'기획전','60':'이벤트','80':'컨텐츠'},

	init : function(fnCallbackObj) {
		if ( Clip.isCartPage() ) {
			// pay domain 영역임
			Clip.property.domain = settings.domain.ssg;
			Clip.property.methodType = 'GET';
			Clip.property.dataType = 'JSONP';

			if (  Clip.property.domain.indexOf('qa2') == 0 ) {
				// pay는 qa2 세팅이 안되어 있음
				Clip.property.domain = "qa2-www.ssg.com";
			}
		}

		// S.COM 공통 클립 콜백 UI 관련 오버라이드 할 경우 (웹 <-> 모바일)
		if (typeof fnCallbackObj != 'undefined') {
			Clip.ui.insertClipCallback = fnCallbackObj.insertClipCallback;
			Clip.ui.deleteClipCallback = fnCallbackObj.deleteClipCallback;
			Clip.confirm = fnCallbackObj.confirm;
		}

		// 로그인 체크 루틴 - fake checkMyClip
		if ( Clip.property.isLogin ) {
			Clip.initAfter();
		} else {
			$.ajax({
				url : Clip.property.protocol + Clip.property.domain + '/clip/checkMyClip.ssg',
				type : Clip.property.methodType,
				dataType : Clip.property.dataType,
				async : false,
				success : function(result) {
					if (result.resultCode == 'LOGIN_REQUIRED_FAIL') {
						Clip.property.isLogin = false;
					} else {
						Clip.property.isLogin = true;
					}
					clipLog("Clip.property.isLogin after [" + Clip.property.isLogin + "]");
				}
			}).done(Clip.initAfter);
		}
	},
	initAfter : function() {
		clipLog("Clip.initAfter - start");

		if ( Clip.property.isLogin ) {
			Clip.readyClipBtn();
		}

		Clip.unbindClipClick();
		Clip.bindClipClick();
	},
	makeClipInfo : function(obj) {
		var $obj = $(obj);

		if ( $obj.hasClass('.clip_btn') ) {
			$obj = $obj.parent();
		}

		var clipInfo = {
			attnDivCd       : $obj.find('input[name="attnDivCd"]').val(),
			attnDivDtlCd    : $obj.find('input[name="attnDivDtlCd"]').val(),
			siteNo          : $obj.find('input[name="siteNo"]').val(),
			attnTgtIdnfNo1  : $obj.find('input[name="attnTgtIdnfNo1"]').val(),
			attnTgtIdnfNo2  : $obj.find('input[name="attnTgtIdnfNo2"]').val(),
			uitemId 		: $obj.find('input[name="uitemId"]').length == 1 ? $obj.find('input[name="uitemId"]').val() : '00000',	// MY클립 단일 옵션 삭제용
			uitemIdAndSalestrNo : '',
			sellStatCd      : $obj.find('input[name="sellStatCd"]').val(),
			soldoutYn       : $obj.find('input[name="soldoutYn"]').val(),

			notiTitle       : $obj.find('input[name="notiTitle"]').val(),
			notiImgPath     : $obj.find('input[name="notiImgPath"]').val(),

			// #166160: [클립 데이터 개선] 클립 저장 매체 구분 데이터 추가 요청
			aplTgtMediaCd   : settings.isMobile ? ( settings.mobilAppNo.length > 0 ? '30' : '20' ) : '10',	// D042 - 10:PC, 20:모바일웹, 30:앱
			mobilAppNo      : settings.mobilAppNo
		};

		if ( $obj.find('input[name="uitemIdAndSalestrNo"]').length == 1 ) {
			clipInfo.uitemIdAndSalestrNo = $obj.find('input[name="uitemIdAndSalestrNo"]').val();
		} else if (clipInfo.uitemId != '00000' ) {
			// #305584 상품옵션 1개인 경우, 해당옵션 바로 넘김
			clipInfo.uitemIdAndSalestrNo = clipInfo.uitemId + '+' + clipInfo.attnTgtIdnfNo2;
		} else {
			clipInfo.uitemIdAndSalestrNo = clipInfo.uitemId;
		}

		clipInfo.infloSiteNo = Clip.getInfloSiteNo();

		if ( clipInfo.siteNo == '' ) {
			clipInfo.siteNo = clipInfo.infloSiteNo;
		}

		return clipInfo;
	},
	getInfloSiteNo : function() {

		var infloSiteNo = settings.siteno.clip;

		if ( settings.isMobile && ( Clip.property.pathname.indexOf('/dept/') == 0 || ( $('div#m_gnb').find('h1 > a').length == 1 && $('div#m_gnb').find('h1 > a').attr('href').indexOf('/dept') == 0 ) ) ) {
			infloSiteNo = '6009';
		}

		if ( Clip.property.pathname.indexOf('/cart/') > -1 ) {
			infloSiteNo = '6005';
		}

		if ( Clip.property.domain.indexOf('thehowdy') > -1 ) {
			infloSiteNo = '6101';		// 하우디독립몰용 가상 SITE_NO
		}

		return infloSiteNo;
	},
	isCartPage : function() {
		var isCartPage = false;

		if ( Clip.property.pathname.indexOf('/cart/') == 0 || Clip.property.pathname.indexOf('/m/cart/') == 0 ) {
			isCartPage = true;
		}

		return isCartPage;
	},
	isItemDetail : function() {
		var isItemDetail = false;

		if ( Clip.property.pathname.indexOf('/item/item') == 0 || Clip.property.pathname.indexOf('item') > 0 || Clip.property.pathname.indexOf('Item') > 0 ) {
			isItemDetail = true;
		}

		return isItemDetail;
	},
	isMyClipPage : function() {
		var isMyClipPage = false;

		if ( Clip.property.pathname.indexOf('/myssg/myClip/main.ssg') == 0 && ( $(location).attr('search').indexOf('attnDivCd=10') > 0 || $(location).attr('search').indexOf('attnDivCd') == -1 ) ) {
			isMyClipPage = true;
		}

		return isMyClipPage;
	},
	// myclip domain 설정
	myClipDomain : function(clipInfo) {
		var srcDomain = document.domain;
		var tgtDomain = settings.domain.ssg;

		var url = 'http://' + tgtDomain + '/myssg/myClip/main.ssg?attnDivCd=' + clipInfo.attnDivCd;

		return url;
	},
	clipInnerCallback : {
		fnClipInnerCallback : function(){}
		,
		// 모바일앱 (앱 인터페이스) > 상품상세 - 웹 클립핑 정보를 앱에게 전파하기 위한 인터페이스
		fnAppIfDeclareApp : function(){}
	},
	// 상품 유닛 > 클립버튼 최초 클릭시 컨펌레이어 (PC)
	confirm : {
		curClipInfo : null
		,
		curClipWrapObj : null
		,
		execute : function(clipInfo, clipWrapObj) {
			clipLog("Clip.confirm.execute - start");

			Clip.confirm.curClipInfo = clipInfo;
			Clip.confirm.curClipWrapObj = clipWrapObj;

			var _clipInfo = Clip.confirm.curClipInfo;

			Clip.ui.layerClose();

			var htmlArr = [];

			htmlArr.push('<div id="clipMsgLayer" class="cm_clip_layer cm_clip_layercancel">');
			htmlArr.push('	<div class="dimmed" onclick="Clip.ui.layerClose(); return false;"></div>');
			htmlArr.push('	<div class="cm_layer_area">');
			htmlArr.push('		<a href="#" onclick="Clip.ui.layerClose(); return false;" class="sp_ccp lp_close">레이어 닫기</a>');
			htmlArr.push('		<p class="cm_lp_tit">이미 <span class="point_txt">클립</span>하셨습니다. <br>취소 하시겠습니까?</p>');
			htmlArr.push('		<div class="btn_area">');
			htmlArr.push('			<a href="#" onclick="Clip.confirm.yes(); return false;" class="sp_ccp cm_btn"><span class="blind">확인</span></a>');
			htmlArr.push('			<a href="#" onclick="Clip.confirm.no(); return false;" class="sp_ccp cm_btn2"><span class="blind">닫기</span></a>');
			htmlArr.push('		</div>');
			htmlArr.push('	</div>');
			htmlArr.push('</div>');

			//$('#wrap').append(htmlArr.join(''));

			//Clip.ui.layerPosition();

			Clip.confirm.yes();
		},
		yes : function() {
			var _clipInfo = Clip.confirm.curClipInfo;
			var _clipWrapObj = Clip.confirm.curClipWrapObj;

			Clip.unCliping(_clipInfo, function() {
				Clip.ui.btnStateChange(_clipWrapObj, 'N');

				Clip.clipInnerCallback.fnClipInnerCallback();

				_clipWrapObj.removeClass('working');

				Clip.ui.layerClose();
			});

			return false;
		},
		no : function() {
			var _clipInfo = Clip.confirm.curClipInfo;
			var _clipWrapObj = Clip.confirm.curClipWrapObj;

			Clip.ui.btnStateChange(_clipWrapObj, 'Y');

			_clipWrapObj.removeClass('working');

			Clip.ui.layerClose();

			return false;
		}
	},
	alreadyCheck : function(clipInfo, clipWrapObj, isItemDtlPageClipBtn) {
		clipLog("alreadyCheck - start - isMobile[" + settings.isMobile + "]");

		if ( settings.isMobile ) {
			// 클립 해제 처리
			Clip.unCliping(clipInfo, function() {
				if (isItemDtlPageClipBtn && Clip.ui.itemDtlPage.deleteClipCallback != null) {
					Clip.ui.itemDtlPage.deleteClipCallback(clipWrapObj, clipInfo);
				} else {
					Clip.ui.deleteClipCallback(clipWrapObj, clipInfo);
				}
			});
		} else {
			if (isItemDtlPageClipBtn && Clip.ui.itemDtlPage.confirm != null) {
				Clip.ui.itemDtlPage.confirm.execute(clipInfo, clipWrapObj);
			} else {
				Clip.confirm.execute(clipInfo, clipWrapObj);
			}
		}

		clipWrapObj.removeClass('working');
		return false;
	},
	// 클립 버튼 > 액션 > 클립 등록/해제
	cliping : function(clipWrapObj, clipInfo, afterFunc) {
		clipLog("cliping - start[" + clipInfo + "][" + clipInfo.attnDivCd + "]");

		if ( typeof clipInfo.attnDivCd == 'undefined' || typeof clipInfo.attnTgtIdnfNo1 == 'undefined' ) {
			return false;
		}

		if (clipWrapObj.hasClass('working')) {
			return false;
		} else {
			clipWrapObj.addClass('working');
		}

		// 로그인 상태 체크
		if ( !Clip.property.isLogin ) {
			// #169306 - 로그아웃 상태에서 클립을 하는 경우 로그인 후에 자동으로 클립이 되도록 ITEM_ID를 쿠키에 저장
			$.cookie('CLIP_SAVE_DATA', clipInfo.attnTgtIdnfNo1, {expires: 1, path: '/', domain: '.ssg.com'});
			// #304798 - [클립] 비로그인 클립 발생건수 확인을 위한 코드 삽입
			$.ajax({url: "/comm/ajaxDummyTrackingUrl.ssg?logout_clip"});

			if ( settings.isMobile ) {
				mobileLogin();
			} else if ( $('.ssg-productinfo-layer').length > 0 || $('.screen').length > 0 ) {
				// PC퀵뷰
				login('', Clip.doAfterLoginAction);
			} else {
				login();
			}

			clipWrapObj.removeClass('working');
			return false;
		} else if ( settings.UserInfo.mbrTypeCd == '90' ) {
			alert("회원에게만 제공되는 서비스입니다. 회원으로 가입하시면 보다 많은 서비스를 이용하실 수 있습니다.");
			clipWrapObj.removeClass('working');
			return false;
		}

		// 최초 중복체크 여부
		var isChecked = clipWrapObj.find('input[name="checked"]').val() == "Y";
		// 활성화 / 비활성화 여부
		var isActive = clipWrapObj.hasClass('on') || clipWrapObj.hasClass('clip_red') || clipWrapObj.hasClass('clip_on') || clipWrapObj.hasClass('clip_ani');
		// 상품페이지 > 클립버튼 여부
		var isItemDtlPageClipBtn = clipWrapObj.hasClass('cm_clip_dtl') || clipWrapObj.hasClass('cm_clip_cdtl');

		clipLog("cliping - isChecked[" + isChecked + "]/isActive[" + isActive + "]/isItemDtlPageClipBtn[" + isItemDtlPageClipBtn + "]");

		if ( isChecked && isActive ) {
			return Clip.alreadyCheck(clipInfo, clipWrapObj, isItemDtlPageClipBtn);
		}

		// 중복체크는 반드시 최초 한번은 시행되어야 한다, 중복체크는 등록시 무조건 시행되어야 한다.
		var isMyClip = Clip.checkMyClip(clipInfo) == 'Y' ? true : false; // 나의 클립 조회
		clipWrapObj.find('input[name="checked"]').val('Y');

		if (isMyClip) {
			return Clip.alreadyCheck(clipInfo, clipWrapObj, isItemDtlPageClipBtn);
		}

		var ajaxData = Clip.makeAjaxClipData(clipInfo);
		ajaxData.success = function(responseDto) {
			if (responseDto.resultCode == 'SUCCESS') {
				Clip.ui.insertClipCallback(clipWrapObj, clipInfo, afterFunc);
			} else if (responseDto.resultCode == 'FAIL') {
				alert(responseDto.resultMsg);
			} else if (responseDto.resultCode == 'LOGIN_REQUIRED_FAIL') {
				// #169306 - 로그아웃 상태에서 클립을 하는 경우 로그인 후에 자동으로 클립이 되도록 ITEM_ID를 쿠키에 저장
				$.cookie('CLIP_SAVE_DATA', clipInfo.attnTgtIdnfNo1, {expires: 1, path: '/', domain: '.ssg.com'});

				if ( settings.isMobile ) {
					mobileLogin();
				} else if ( $('.ssg-productinfo-layer').length > 0 || $('.screen').length > 0 ) {
					// PC퀵뷰
					login('', Clip.doAfterLoginAction);
				} else {
					login();
				}
			} else if (responseDto.resultCode == 'EXCEED_CLIP_LIMIT') {
				if ( confirm(responseDto.resultMsg) ) {
					window.location.href = Clip.myClipDomain(clipInfo);
				}
			}
		};
		ajaxData.error = function(e) {
			alert('클립하기중 오류가 발생했습니다. 잠시후 다시 해주세요.');
		};

		// ajax function을 history와 사용하기 위해 분리했으나 jsonp에서 callback 방식으로 동작을 하지 않음 일단 로직을 2중관리
		$.ajax(ajaxData);

		clipWrapObj.removeClass('working');
	},
	makeAjaxClipData : function(clipInfo) {
		var ajaxData = {
			url : Clip.property.protocol + Clip.property.domain + '/clip/insertClip.ssg',
			type : Clip.property.methodType,
			dataType : Clip.property.dataType,
			async : false,
			cache : false,
			data : {
				'attnDivCd'         : clipInfo.attnDivCd,
				'attnDivDtlCd'      : clipInfo.attnDivCd == '10' ? '10' : clipInfo.attnDivDtlCd,
				'siteNo'            : clipInfo.siteNo,
				'attnTgtIdnfNo1'    : clipInfo.attnTgtIdnfNo1,
				'attnTgtIdnfNo2'    : clipInfo.attnTgtIdnfNo2,
				'uitemIdAndSalestrNo' : clipInfo.uitemIdAndSalestrNo,
				'infloSiteNo'       : clipInfo.infloSiteNo,
				'aplTgtMediaCd'     : clipInfo.aplTgtMediaCd,
				'mobilAppNo'        : clipInfo.mobilAppNo
			}
		};

		return ajaxData;
	},
	ajaxCliping : function(clipInfo) {
		var resultDto = null;

		var ajaxData = Clip.makeAjaxClipData(clipInfo);
		ajaxData.success = function(responseDto) {
			resultDto = responseDto;
		};
		ajaxData.error = function(e) {
			alert('클립하기중 오류가 발생했습니다. 잠시후 다시 해주세요.');
		};

		$.ajax(ajaxData);

		return resultDto;
	},
	makeAjaxUnClipData : function(clipInfo) {
		var ajaxData = {
			url : Clip.property.protocol + Clip.property.domain + '/clip/deleteClip.ssg',
			type : Clip.property.methodType,
			dataType : Clip.property.dataType,
			async : false,
			cache : false,
			data : {
				'attnDivCd'         : clipInfo.attnDivCd,
				'attnTgtIdnfNo1'    : clipInfo.attnTgtIdnfNo1,
				'uitemId'			: clipInfo.uitemId == '00000' ? '' : clipInfo.uitemId,
				'infloSiteNo'       : clipInfo.infloSiteNo,
				'uitemIdAndSalestrNo' : clipInfo.uitemIdAndSalestrNo
			}
		};

		return ajaxData;
	},
	ajaxUnCliping : function(clipInfo) {
		var resultDto = null;

		var ajaxData = Clip.makeAjaxUnClipData(clipInfo);
		ajaxData.success = function(responseDto) {
			resultDto = responseDto;
		};
		ajaxData.error = function(e) {
			alert('클립해제중 오류가 발생했습니다. 잠시후 다시 해주세요.');
		};

		$.ajax(ajaxData);

		return resultDto;
	},
	// 클립 버튼 > 액션 > 클립 해제
	unCliping : function(clipInfo, callBackFn) {
		var ajaxData = Clip.makeAjaxUnClipData(clipInfo);
		ajaxData.success = function(responseDto) {
			if (responseDto.resultCode == 'SUCCESS') {
				if ( responseDto.resultMsg != ''  && responseDto.resultMsg.indexOf('옵션상품클립') > 0 ) {
					alert(responseDto.resultMsg);
				}
				callBackFn();
			} else if (responseDto.resultCode == 'FAIL') {
				alert(responseDto.resultMsg);
			} else if (responseDto.resultCode == 'LOGIN_REQUIRED_FAIL') {
				// #169306 - 로그아웃 상태에서 클립을 하는 경우 로그인 후에 자동으로 클립이 되도록 ITEM_ID를 쿠키에 저장
				//$.cookie('CLIP_SAVE_DATA', clipInfo.attnTgtIdnfNo1, {expires: 1, path: '/', domain: '.ssg.com'});
				// 클립해제 액션은 로그아웃->로그인 상태에서 처리되지 않게 하자. layer가 없어져서 사용자가 확인이 불가함

				if ( settings.isMobile ) {
					mobileLogin();
				} else if ( $('.ssg-productinfo-layer').length > 0 || $('.screen').length > 0 ) {
					// PC퀵뷰
					login('', Clip.doAfterLoginAction);
				} else {
					login();
				}
			}
		};
		ajaxData.error = function(e) {
			alert('클립해제중 오류가 발생했습니다. 잠시후 다시 해주세요.');
		};

		// ajax function을 history와 사용하기 위해 분리했으나 jsonp에서 callback 방식으로 동작을 하지 않음 일단 로직을 2중관리
		$.ajax(ajaxData);
	},
	// 클립 버튼 > 상품유닛 클립 버튼을 제외한 모든 클립 버튼 > 레디 이벤트 > 마이클립여부 조회
	checkMyClip : function(clipInfo, targetObj) {
		clipLog("checkMyClip [" + clipInfo.attnDivCd + "][" + clipInfo.attnTgtIdnfNo1 + "]");
		var returnYn = 'N';

		if ( Clip.property.isLogin && clipInfo.attnDivCd && clipInfo.attnTgtIdnfNo1 ) {
			// 로그인 상태에서만 조회하도록
			$.ajax({
				url : Clip.property.protocol + Clip.property.domain + '/clip/checkMyClip.ssg',
				type : Clip.property.methodType,
				dataType : Clip.property.dataType,
				async : ( targetObj ? true : false ),
				data : {
					'attnDivCd'         : clipInfo.attnDivCd,
					'attnTgtIdnfNo1'    : clipInfo.attnTgtIdnfNo1,
					'infloSiteNo'    	: clipInfo.infloSiteNo,
					'uitemIdAndSalestrNo' : clipInfo.uitemIdAndSalestrNo
				},
				success : function(responseDto) {
					clipLog("checkMyClip [" + responseDto.result + "][" +clipInfo.attnDivCd+ "][" +clipInfo.attnTgtIdnfNo1+ "]")
					if (responseDto.resultCode == '0000') {
						returnYn = responseDto.result;
						if ( targetObj ) {
							Clip.readyClipBtnPost(targetObj, clipInfo, returnYn);
						}
					}
				},
				error : function(e) {
					returnYn = 'E';
					if ( targetObj ) {
						Clip.readyClipBtnPost(targetObj, clipInfo, returnYn);
					}
				}
			});
		}

		return returnYn;
	},
	// 상품유닛 클립 버튼에 대한 클립 여부 확인
	checkMyClipMulti : function(arrKeyValue, mapObj, externFunc) {
		if ( Clip.property.isLogin && Clip.property.isNotEmergencyDisabling ) {
			clipLog("arrKeyValue.join["+(arrKeyValue.join("|"))+"]");

			$.ajax({
				url : Clip.property.protocol + Clip.property.domain + '/clip/checkMyClip.ssg',
				type : Clip.property.methodType,
				dataType : Clip.property.dataType,
				async : true,
				data : {
					'itemList' : arrKeyValue.join("|"),
					'infloSiteNo' : Clip.getInfloSiteNo()
				},
				success : function(responseDto) {
					if ( typeof externFunc == 'undefined' ) {
						if ( responseDto.resultCode == '0000' ) {
							var resultList = responseDto.result;

							for (var i=0; i<resultList.length; i++) {
								//clipLog("["+i+"][" + mapObj[resultList[i]].html() + "]");

								Clip.readyClipBtnPost(mapObj[resultList[i]], Clip.makeClipInfo(mapObj[resultList[i]]), 'Y');
							}
						}
					} else {
						externFunc(responseDto, mapObj);
					}
				},
				error : function(request,status,error) {
					clipLog("Clip.checkMyClipMulti error [" + request.status + "][" + request.responseText + "][" + error + "]");
				}
			});
		}
	},
	readyClipBtnMulti : function($objList) {
		clipLog("readyClipBtnMulti target size : " + $objList.size());

		if ( $objList.size() > 0 ) {
			var arrKeyValue = new Array();
			var mapObj = {};

			$objList.each(function() {
				var $thisObj = $(this);
				var clipInfo = Clip.makeClipInfo($thisObj);

				// 유효한 데이터만 처리
				if ( $.isNumeric(clipInfo.attnDivCd) ) {
					var keyValue = clipInfo.attnDivCd + ',' + clipInfo.attnTgtIdnfNo1 + ',' + clipInfo.uitemIdAndSalestrNo;

					arrKeyValue.push(keyValue);
					mapObj[keyValue] = $thisObj;
				}
			});

			if ( arrKeyValue.length > 0 ) {
				if ( Clip.property.dataType == 'JSONP' ) {
					var sliceCount = 100;
					for ( var i=0; i<(Math.floor(arrKeyValue.length/sliceCount)+1); i++ ) {
						var sliceBegin = sliceCount * i, sliceEnd = sliceCount * (i+1);
						Clip.checkMyClipMulti(arrKeyValue.slice(sliceBegin, (sliceEnd < arrKeyValue.length ? sliceEnd : arrKeyValue.length)), mapObj);
					}
				} else {
					Clip.checkMyClipMulti(arrKeyValue, mapObj);
				}
			}
		}
	},
	readyClipBtn : function() {
		// 클립 버튼 > 상품유닛 클립 버튼을 제외한 모든 클립 버튼 > 레디 이벤트
		var $objListAll = $(Clip.property.bindingClass);

		// 상품상세의 경우
		if ( Clip.isItemDetail() ) {
			$objListAll = $.merge($objListAll, Clip.getItemDetailObj());
		}

		Clip.readyClipBtnMulti($objListAll);
	},
	readyClipBtnPost : function(targetObj, clipInfo, checkMyClipResult) {
		if ( checkMyClipResult == 'Y' ) {
			Clip.ui.btnStateChange(targetObj, checkMyClipResult, true);
		}

		if ( typeof targetObj != 'undefined' ) {
			targetObj.find('input[name="checked"]').val('Y');
		}
	},
	// 클립 버튼 > 클릭 이벤트
	bindClipClick : function() {
		$("body").on("click", Clip.property.bindingClass, function(e) {
			//clipLog("bindClipClick - start[" + $(this).html() + "]");
			e.preventDefault();
			e.stopPropagation();

			Clip.ui.layerClose();

			var $thisObj = $(this);

			// 19금상품-성인인증전이면 인증부터 처리함
			if ( $thisObj.find('a[onclick]').length == 0 || $thisObj.find('a[onclick]').attr('onclick').indexOf('Adult') == -1 ) {
				var clipInfo = Clip.makeClipInfo($thisObj);
				Clip.cliping($thisObj, clipInfo);
			}
		});
	},
	// 클립 버튼 > 클립 이벤트 > 언바인드
	unbindClipClick : function() {
		$("body").off('click', Clip.property.bindingClass);
	},
	service : {
		// 클립 > 공통서비스 > 마이클립정보목록 조회 후 반환
		// attnDivCd의 ','구분자를 통해 다중그룹에 대한 조회도 가능함
		getMyClipInfoList : function(attnDivCdsStr) {
			var myClipInfoList = [];

			$.ajax({
				url : '/clip/getMyClipInfoList.ssg',
				type : Clip.property.methodType,
				dataType : Clip.property.dataType,
				data : {attnDivCd : attnDivCdsStr},
				async : false,
				success : function(responseDto) {
					if (responseDto.resultCode == 'SUCCESS') {
						var list = responseDto.result;
						for (var i = 0; i < list.length; i++) {
							myClipInfoList.push(list[i].attnTgtIdnfNo1);
						}

					} else if (responseDto.resultCode == 'FAIL') {
						alert(responseDto.resultMsg);
					}
				},
				error : function(e) { alert($.parseJSON(e.responseText).errorMsg); }
			});

			return myClipInfoList;
		}
	},
	ui : {
		// 클립 액션 > 등록 > 콜백
		insertClipCallback : function(clipWrapObj, clipInfo, afterFunc) {
			clipLog("insertClipCallback [" + clipInfo.attnDivCd + "]/[" + clipInfo.attnTgtIdnfNo1 + "]");

			Clip.ui.layerClose();

			var htmlArr = [];

			switch ( clipInfo.attnDivCd ) {
			case '10' : // 상품
				htmlArr.push('<div id="clipMsgLayer" class="cm_clip_layer cm_clip_layercheck">');
				htmlArr.push('	<div class="dimmed" onclick="Clip.ui.layerClose(); return false;"></div>');
				htmlArr.push('	<div class="cm_layer_area">');
				htmlArr.push('		<a href="#" onclick="Clip.ui.layerClose(); return false;" class="sp_ccp lp_close">레이어 닫기</a>');
				htmlArr.push('		<p class="cm_tit"><span class="sp_ccp ico_clip">&nbsp;</span>클립 되었습니다.</p>');
				htmlArr.push('		<div class="cm_clip_bx">');
				htmlArr.push('			<ul class="cm_clip_info_lst">');
				htmlArr.push('			<li><span class="sp_ccp cm_info">&nbsp;</span><span class="cm_info_txt">추천클립에서<br><em>할인정보</em>를</span></li>');
				htmlArr.push('			<li><span class="sp_ccp cm_info2">&nbsp;</span><span class="cm_info_txt">자주사는 상품은<br><em>단골</em>로 모아서</span>');
				htmlArr.push('			</li>');
				htmlArr.push('			</ul>');
				htmlArr.push('		</div>');
				htmlArr.push('		<div class="cm_clip_bx2">');
				htmlArr.push('			<a href="'+Clip.myClipDomain(clipInfo)+'" class="sp_ccp btn_myclip"><span class="blind">My클립 가기</span></a>');
				htmlArr.push('			<a href="#" onclick="Clip.ui.layerClose(); return false;" class="sp_ccp btn_recomclip"><span class="blind">쇼핑계속하기</span></a>');
				htmlArr.push('		</div>');
				htmlArr.push('	</div>');
				htmlArr.push('</div>');
				break;
			case '20' : // 카테고리
			case '30' : // 브랜드&스토어
				htmlArr.push('<div class="dimmed_common" onclick="javascript:Clip.ui.layerClose();"></div>');
				htmlArr.push('<div id="clipMsgLayer" class="layer_pos w415">');
				htmlArr.push(' 	 <div class="layer_area2 type2">');
				htmlArr.push('		<a href="javascript:Clip.ui.layerClose();" class="lp_close">레이어 닫기</a>');
				htmlArr.push('		<div class="cont_pd">');
				htmlArr.push('			<div class="rbtn_pd">');
				htmlArr.push('				<table border="1" class="v_tbl">');
				htmlArr.push('				<caption><span class="blind">클립 확인</span></caption>');
				htmlArr.push('				<colgroup><col></colgroup>');
				htmlArr.push('				<tbody>');
				htmlArr.push('				<tr>');
				htmlArr.push('					<td>');
				htmlArr.push('						<span class="lp_ab red">' + Clip.attnDivCdNm[clipInfo.attnDivCd] + ' 클립 되었습니다.</span>');
				htmlArr.push('						<span class="lp_tit"><span class="p_tip">' + clipInfo.notiTitle + '</span></span>');
				htmlArr.push('					</td>');
				htmlArr.push('				</tr>');
				htmlArr.push('				</tbody>');
				htmlArr.push('				</table>');
				htmlArr.push('				<div class="btn_abs">');
				htmlArr.push('					<a href="'+Clip.myClipDomain(clipInfo)+'">My 클립</a>');
				htmlArr.push('				</div>');
				htmlArr.push('			</div>');
				htmlArr.push('		</div>');
				htmlArr.push('		<div class="ftip_area">');
				htmlArr.push('			<span class="ico_tip">Tip</span>신상품 및 혜택 정보를 <strong>클립 추천에서 편리하게 확인하세요.</strong>');
				htmlArr.push('		</div>');
				htmlArr.push('	</div>');
				htmlArr.push('</div>');
				break;
			case '40' : // 기획전
			case '60' : // 이벤트
			case '80' : // 컨텐츠
				htmlArr.push('<div class="dimmed_common" onclick="javascript:Clip.ui.layerClose();"></div>');
				htmlArr.push('<div id="clipMsgLayer" class="layer_pos w415">');
				htmlArr.push('	<div class="layer_area2 type3">');
				htmlArr.push('		<a href="javascript:Clip.ui.layerClose();" class="lp_close">레이어 닫기</a>');
				htmlArr.push('		<div class="cont_pd">');
				htmlArr.push('			<div class="rbtn_pd">');
				htmlArr.push('				<table border="1" class="v_tbl">');
				htmlArr.push('				<caption><span class="blind">클립 확인</span></caption>');
				htmlArr.push('				<colgroup><col></colgroup>');
				htmlArr.push('				<tbody>');
				htmlArr.push('				<tr>');
				htmlArr.push('					<td>');
				htmlArr.push('						<span class="lp_ab red">' + Clip.attnDivCdNm[clipInfo.attnDivCd] + ' 클립 되었습니다.</span>');
				htmlArr.push('						<span class="lp_tit"><span class="p_tip">' + clipInfo.notiTitle + '</span></span>');
				htmlArr.push('					</td>');
				htmlArr.push('				</tr>');
				htmlArr.push('				</tbody>');
				htmlArr.push('				</table>');
				htmlArr.push('				<div class="btn_abs">');
				htmlArr.push('					<a href="'+Clip.myClipDomain(clipInfo)+'">My 클립</a>');
				htmlArr.push('				</div>');
				htmlArr.push('			</div>');
				htmlArr.push('		</div>');
				htmlArr.push('	</div>');
				htmlArr.push('</div>');
				break;
			}

			if ( htmlArr.length > 0 ) {
				Clip.ui.btnStateChange(clipWrapObj, 'Y');

				if ( typeof afterFunc == 'undefined' ) {
					// #194852 - 레이어 제거
					//$('#wrap').append(htmlArr.join(''));

					//Clip.ui.layerPosition();
					Clip.clipInnerCallback.fnClipInnerCallback();
				} else {
					afterFunc();
				}
			}
		},
		// 클립 액션 > 해제 > 콜백
		deleteClipCallback : function(clipWrapObj, clipInfo) {
			clipAlert("when this message showing???");
			Clip.ui.layerClose();

			var htmlArr = [];
			htmlArr.push('<div id="clipMsgLayer" class="cm_clip_layer cm_clip_layercancel">');
			htmlArr.push('	<div class="dimmed" onclick="Clip.ui.layerClose(); return false;"></div>');
			htmlArr.push('	<div class="cm_layer_area">');
			htmlArr.push('		<a href="#" onclick="Clip.ui.layerClose(); return false;" class="sp_ccp lp_close">레이어 닫기</a>');
			htmlArr.push('		<p class="cm_lp_tit">이미 <span class="point_txt">클립</span>하셨습니다. <br>취소 하시겠습니까?</p>');
			htmlArr.push('		<div class="btn_area">');
			htmlArr.push('			<a href="#" class="sp_ccp cm_btn"><span class="blind">확인</span></a>');
			htmlArr.push('			<a href="#" onclick="Clip.ui.layerClose(); return false;" class="sp_ccp cm_btn2"><span class="blind">닫기</span></a>');
			htmlArr.push('		</div>');
			htmlArr.push('	</div>');
			htmlArr.push('</div>');

			// #194852 - 레이어 제거
			//$('#wrap').append(htmlArr.join(''));

			//Clip.ui.layerPosition();
			Clip.ui.btnStateChange(clipWrapObj, 'N');
			Clip.clipInnerCallback.fnClipInnerCallback();
		},
		// 레이어 > 닫기
		layerClose : function() {
			$('#clipMsgLayer').remove();
			$('.dimmed_common').remove();
		},
		// 버튼 활성화/비활성화 후에 clip_ani를 clip_on으로 변경 ==> 상품뷰타입 변경시 clip_ani가 적용됨
		_changeClipAniToOn : function() {
			if ( !Clip.isItemDetail() ) {
				$('.clip_ani').addClass('clip_on').removeClass('clip_ani');
			}
		},
		// 버튼 활성화/비활성화
		btnStateChange : function(clipWrapObj, isActiveYn, isCheckFunction) {
			//clipLog("btnStatChange [" + Clip.makeClipInfo($(clipWrapObj)) + "][" + isActiveYn + "]");
			var $wrapObj = $(clipWrapObj);

			var itemId = $wrapObj.find('input[name="attnTgtIdnfNo1"]').val();
			var uitemId = $wrapObj.find('input[name="uitemId"]').length == 1 ? $wrapObj.find('input[name="uitemId"]').val() : '00000';

			// 동일 상품이 한 화면에 여러개가 있는 경우가 있기 때문에 모두 버튼 처리함
			var $target = $('input[name="attnTgtIdnfNo1"][value="' + itemId + '"]').parent();

			// 옵션클립인 경우 삭제는 MY클립에만 있음 - 그런경우 단일 상품만 버튼 처리함
			if ( isActiveYn == 'N' && uitemId != '00000' ) {
				$target = $target.find('input[name="uitemId"][value="' + uitemId + '"]').parent();
			}

			// 장바구니의 경우 옵션별로 장바구니에 담기므로 개별적으로 처리함
			if ( Clip.isCartPage() ) {
				var uitemIdAndSalestrNo = $wrapObj.find('input[name="uitemIdAndSalestrNo"]').length == 1 ? $wrapObj.find('input[name="uitemIdAndSalestrNo"]').val() : '00000';

				$target = $target.find('input[name="uitemIdAndSalestrNo"][value="' + uitemIdAndSalestrNo + '"]').parent();
			} else if ( Clip.isMyClipPage() && typeof isCheckFunction == 'undefined' && uitemId != '00000' ) {
				$target = $target.find('input[name="uitemId"][value="' + uitemId + '"]').parent();
			}

			//clipLog("btnStatChange - itemId[" + itemId + "]");
			if(clipWrapObj.find('.blind').length == 1){
				if ( isActiveYn == 'Y' ) {
					clipWrapObj.find('.blind').html('클립해제');
				} else {
					clipWrapObj.find('.blind').html('클립하기');
				}
			}

			// 클래스 제거
			$target.removeClass('on');
			$target.removeClass('clip_red');
			// for mobile
			if ( settings.isMobile ) {
				$target.addClass('clip_off');
				$target.removeClass('clip_ani');
				$target.removeClass('clip_on');
			}

			//clipLog("btnStatChange - clipbx[" + $target.hasClass('clipbx') + "]/btn_part[" + $target.hasClass('btn_part') + "]/clip_wrap[" + $target.hasClass('clip_wrap') + "]");

			if ( !settings.isMobile && (
				   ( $target.hasClass('bpr_brandclip') || $target.hasClass('clipbx') )
			  || ( $target.hasClass('btn_part') || $target.hasClass('clip_wrap') )
			  )
			) {
				// SSG의 기획전,이벤트,브랜드,카테고리,라이프매거진 클립용
				if ( isActiveYn == 'Y') { // 모바일이 아닌 경우만
					if ( $target.hasClass('cm_clip_special') ) {
						// 전문관 템플릿
						$target.addClass('on');
					} else {
						$target.addClass('clip_red');
					}
				} else {
					// 클립해제
					console.log("111>>>>>");
				}
			} else {
				// 일반 상품유닛용
				if ( isActiveYn == 'Y' ) {
					if ( settings.isMobile ) {
						if ( typeof isCheckFunction == 'undefined' ) {
							if ( $('.cm_clip_part').length > 0 ) {
								// 플로팅바가 있는 상품상세 영영

								$target.each(function() {
									var $eachThis = $(this);

									// event fire가 플로팅이고 each obj가 플로팅
									// 또는 event fire가 상품상세고 each obj가 상품상세
									// 이면 clip_ani 처리 ==> event가 발생한 영역만 clip_ani처리가 되야함
									// 그외는 clip_on 처리
									if ( $eachThis.hasClass('cm_clip_part') == $(clipWrapObj).hasClass('cm_clip_part') ) {
										$eachThis.addClass('clip_ani');

										setTimeout(Clip.ui._changeClipAniToOn, 1000);
									} else {
										$eachThis.addClass('clip_on');
									}
								}); // end each function
							} else {
								// 일반 영역
								if ( settings.mobilAppNo.length > 0 && _clippingFireFromApp ) {
									$target.addClass('clip_on');

									_clippingFireFromApp = false;
								} else {
									$target.addClass('clip_ani');	// cliping action 처리

									setTimeout(Clip.ui._changeClipAniToOn, 1000);
								}
							}
						} else {
							$target.addClass('clip_on');	// checkMyClip 처리
						}
						$target.removeClass('clip_off');
					} else {
						$target.addClass('on');
					}
				} else {
					// 단골해제용 - MY클립에서 클립이 해제되면 단골도 해제함
					var $regularObj = null;
					if ( settings.isMobile ) {
						$regularObj = $(clipWrapObj).siblings('.cm_clip_regular');
					} else {
						$regularObj = $(clipWrapObj).parents('td').find('.cm_clip_regular');
					}

					if ( $regularObj && $regularObj.length > 0 ) {
						$regularObj.removeClass('on');
					}
			   }
			}
		},
		layerPosition : function() {
			$('#wrap > #clipMsgLayer').css({
				left : (($(window).width() - $('#wrap > #clipMsgLayer').outerWidth()) / 2) + ((document.documentElement && document.documentElement.scrollLeft) || document.body.scrollLeft)
				,
				top : (($(window).height() - $('#wrap > #clipMsgLayer').outerHeight()) / 2.5) + ((document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop)
			});
		},
		// 상품상세 > 클립버튼 > 오버라이드 전용 객체
		itemDtlPage : {
			insertClipCallback : null
			,
			deleteClipCallback : null
			,
			confirm : null
		},
		mobile : {
			confirm : {
				curClipInfo : null
				,
				curClipWrapObj : null
				,
				execute : function(clipInfo, clipWrapObj) {
					Clip.ui.layerClose();

					Clip.ui.mobile.confirm.curClipInfo = clipInfo;
					Clip.ui.mobile.confirm.curClipWrapObj = clipWrapObj;

					$('.cm_clip_layer').remove();

					Clip.ui.mobile.insertClipCallback(clipWrapObj, clipInfo);
				},
				yes : function(){
					Clip.unCliping(Clip.ui.mobile.confirm.curClipInfo,function() {
						Clip.ui.mobile.deleteClipCallback(Clip.ui.mobile.confirm.curClipWrapObj, Clip.ui.mobile.confirm.curClipInfo);
					});
					Clip.ui.mobile.confirm.curClipWrapObj.removeClass('working');
					Clip.ui.layerClose();
				},
				no : function (){
					Clip.ui.btnStateChange(Clip.ui.mobile.confirm.curClipWrapObj, 'Y');
					Clip.ui.mobile.confirm.curClipWrapObj.removeClass('working');
					Clip.ui.layerClose();
				}
			},
			insertClipCallback : function(clipWrapObj, clipInfo, afterFunc) {
				Clip.ui.mobile.layerClose();

				var htmlArr = Clip.ui.mobile.insertClipHtmlGen(clipInfo);

				if ( htmlArr.length > 0 ) {
					Clip.ui.btnStateChange(clipWrapObj, 'Y');

					if ( typeof afterFunc == 'undefined' ) {
						// #151185 - 레이어 제거
						//$('body').append(htmlArr.join(''));

						//Clip.ui.mobile.layerOpen();
						Clip.clipInnerCallback.fnClipInnerCallback();
						Clip.clipInnerCallback.fnAppIfDeclareApp();
					} else {
						afterFunc();
					}
				}

				afterClipActionForApp('Y', clipInfo);
			},
			insertClipHtmlGen : function(clipInfo) {
				var htmlArr = [];

				if ( typeof clipInfo != 'undefined' ) {
					switch ( clipInfo.attnDivCd ) {
					case '10' : // 상품
						htmlArr.push('<div id="clipMsgLayer" class="cm_clip_layer cm_clip_layercheck" style="margin: 0px auto; display: none;">');
						htmlArr.push('	<div class="cm_clip_action">');
						htmlArr.push('		<div class="cm_clip_acon">');
						htmlArr.push('			<p class="cm_clip_bx">');
						htmlArr.push('				<span class="cm_clip_txt">클립 되었습니다</span>');
						htmlArr.push('				<span class="cm_clip_txt2">할인정보 알림받고<br>단골상품은 모아보세요!</span>');
						htmlArr.push('			</p>');
						htmlArr.push('		</div>');
						htmlArr.push('	</div>');
						htmlArr.push('	<a href="javascript:Clip.ui.mobile.layerClose();" class="btn_clip_close"><span class="blind">레이어 닫기</span></a>');
						htmlArr.push('</div>');
						break;
					case '20' : // 카테고리
					case '30' : // 브랜드&스토어
						htmlArr.push('<div id="clipMsgLayer" class="clip_asec">');
						htmlArr.push('	<div class="clip_action">');
						htmlArr.push('		<div class="clip_acon">');
						htmlArr.push('			<p>');
						htmlArr.push('				<span class="clip active"></span>');
						htmlArr.push('				<span class="cc_tit">' + Clip.attnDivCdNm[clipInfo.attnDivCd] + ' 클립</span>');
						htmlArr.push('			</p>');
						htmlArr.push('			<p class="clip_subtxt">');
						htmlArr.push('				신상품 및 혜택정보를<br>클립 추천에서 확인하세요');
						htmlArr.push('			</p>');
						htmlArr.push('		</div>');
						htmlArr.push('	</div>');
						htmlArr.push('	<a href="javascript:Clip.ui.mobile.layerClose();" class="btn_clip_tcls"></a>');
						htmlArr.push('</div>');
						break;
					case '40' : // 기획전
					case '60' : // 이벤트
					case '80' : // 컨텐츠
						htmlArr.push('<div id="clipMsgLayer" class="clip_asec type02">');
						htmlArr.push('	<div class="clip_action">');
						htmlArr.push('		<div class="clip_acon">');
						htmlArr.push('			<p>');
						htmlArr.push('				<span class="clip active"></span>');
						htmlArr.push('				<span class="cc_tit">' + Clip.attnDivCdNm[clipInfo.attnDivCd] + ' 클립</span>');
						htmlArr.push('				<span class="cliping">');
						htmlArr.push('					<span class="ctxt"><span class="blind">Clipping</span></span>');
						htmlArr.push('				</span>');
						htmlArr.push('			</p>');
						htmlArr.push('		</div>');
						htmlArr.push('	</div>');
						htmlArr.push('	<a href="javascript:Clip.ui.mobile.layerClose();" class="btn_clip_tcls"></a>');
						htmlArr.push('</div>');
						break;
					}
				}

				return htmlArr;
			},
			deleteClipCallback : function(clipWrapObj, clipInfo) {
				Clip.ui.mobile.layerClose();

				var htmlArr = Clip.ui.mobile.deleteClipHtmlGen(clipInfo);

				if ( htmlArr.length > 0 ) {
					// #151185 - 레이어 제거
					//$('body').append(htmlArr.join(''));

					//Clip.ui.mobile.layerOpen();
					Clip.ui.btnStateChange(clipWrapObj, 'N');
					Clip.clipInnerCallback.fnClipInnerCallback();
					Clip.clipInnerCallback.fnAppIfDeclareApp();
				}

				afterClipActionForApp('N', clipInfo);
			},
			deleteClipHtmlGen : function(clipInfo) {
				var htmlArr = [];

				if ( typeof clipInfo != 'undefined' ) {
					switch ( clipInfo.attnDivCd ) {
					case '10' : // 상품
						htmlArr.push('<div id="clipMsgLayer" class="cm_clip_layer cm_clip_layercancel" style="margin: 0px auto; display: none;">');
						htmlArr.push('	<div class="cm_clip_action">');
						htmlArr.push('		<div class="cm_clip_acon">');
						htmlArr.push('			<p class="cm_clip_bx">');
						htmlArr.push('				<span class="cm_cancel_txt">클립이 <br>취소되었습니다.</span>');
						htmlArr.push('			</p>');
						htmlArr.push('		</div>');
						htmlArr.push('	</div>');
						htmlArr.push('	<a href="javascript:Clip.ui.mobile.layerClose();" class="btn_clip_close"><span class="blind">레이어 닫기</span></a>');
						htmlArr.push('</div>');
						break;
					case '20' : // 카테고리
					case '30' : // 브랜드&스토어
					case '40' : // 기획전
					case '60' : // 이벤트
					case '80' : // 컨텐츠
						htmlArr.push('<div id="clipMsgLayer" class="clip_asec cancle">');
						htmlArr.push('	<div class="clip_action">');
						htmlArr.push('		<div class="clip_acon">');
						htmlArr.push('			<p>');
						htmlArr.push('				<span class="clip disable">');
						htmlArr.push('					<span class="ico_cancle blind">클립 취소</span>');
						htmlArr.push('				</span>');
						htmlArr.push('				<span class="cc_tit">' + Clip.attnDivCdNm[clipInfo.attnDivCd] + '<br>클립취소</span>');
						htmlArr.push('				<span class="cliping">');
						htmlArr.push('					<span class="ctxt"><span class="blind">클립취소</span></span>');
						htmlArr.push('				</span>');
						htmlArr.push('			</p>');
						htmlArr.push('		</div>');
						htmlArr.push('	</div>');
						htmlArr.push('	<a href="javascript:Clip.ui.mobile.layerClose();" class="btn_clip_tcls"></a>');
						htmlArr.push('</div>');
						break;
					}
				}

				return htmlArr;
			},
			// 레이어 > 닫기
			layerClose : function() {
				$('#clipMsgLayer').remove();
			},
			// 레이어 열기
			layerOpen : function() {
				var target = $('#clipMsgLayer');
				   var closeBtn = '.btn_clip_close';

				   target.showModal({
					   useModalMask: false,
					   elCloseBtn: closeBtn
				   });

				   var timer = setTimeout(function () {
					   target.hideModal({hideModalMask: false});
					   clearTimeout(timer);
				   }, 2000);

				   target.find(closeBtn).on('click', function (e) {
					   e.preventDefault();
					   clearTimeout(timer);
				   });
			}
		}
	},
	readyFloatingLayerClipBtn : function() {
		// 모바일 > 상품상세 > floating-layer > 클립버튼에 상품상세 클립버튼정보를 복사하여 주입
		var $_targetWrap = $('.cm_clip_part');

		clipLog("readyFloatingLayerClipBtn - target[" + $_targetWrap.size() + "]");

		if ( $_targetWrap.size() > 0 ) {
			var $_itemDtlClipWrap = Clip.getItemDetailObj();

			clipLog("readyFloatingLayerClipBtn - source[" + $_itemDtlClipWrap.size() + "]");

			$_targetWrap.append('<input type="hidden" name="attnDivCd" value="' + $_itemDtlClipWrap.find('input[name="attnDivCd"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="attnDivDtlCd" value="10">');
			$_targetWrap.append('<input type="hidden" name="siteNo" value="' + $_itemDtlClipWrap.find('input[name="siteNo"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="attnTgtIdnfNo1" value="' + $_itemDtlClipWrap.find('input[name="attnTgtIdnfNo1"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="attnTgtIdnfNo2" value="' + $_itemDtlClipWrap.find('input[name="attnTgtIdnfNo2"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="notiTitle" value="' + $_itemDtlClipWrap.find('input[name="notiTitle"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="notiImgPath" value="' + $_itemDtlClipWrap.find('input[name="notiImgPath"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="checked" value="' + $_itemDtlClipWrap.find('input[name="checked"]').val() + '">');
			$_targetWrap.append('<input type="hidden" name="sellStatCd" value="' + $_itemDtlClipWrap.find('input[name="sellStatCd"]').val() + '">');
		}
	},
	// 각몰별 > 상품상세 > 클립 UI 관련 오버라이드 할 경우 (신세계몰 <-> 신백몰 <-> 이마트몰 <-> 부츠 <-> 트레이더스몰)
	initItemDtlPage : function (fnCallbackObj) {
		//if (typeof fnCallbackObj != 'undefined') {
		// override 불가하도록
		Clip.ui.itemDtlPage.insertClipCallback = fnCallbackObj.insertClipCallback;
		Clip.ui.itemDtlPage.deleteClipCallback = fnCallbackObj.deleteClipCallback;
		Clip.ui.itemDtlPage.confirm = fnCallbackObj.confirm;
		//}
	},
	doAfterLoginAction : function() {
		settings.UserInfo.isLoginYn = 'Y';
		Clip.property.isLogin = true;

		Clip.triggerClipForSaveData();
	},
	triggerClipForSaveData : function() {
		clipLog("triggerClipForSaveData - isLoginYn[" + settings.UserInfo.isLoginYn + "]/CLIP_SAVE_DATA[" + $.cookie('CLIP_SAVE_DATA') + "]");
		if ( Clip.property.isLogin ) {
			// #169306 - 로그아웃 상태에서 클립을 하는 경우 로그인 후에 자동으로 클립이 되도록 ITEM_ID를 쿠키에 저장
			// 저장된 쿠키가 있으면 클립처리함
			var clipSaveData = $.cookie('CLIP_SAVE_DATA');
			$.cookie('CLIP_SAVE_DATA', null, { path: '/', domain: '.ssg.com' });

			if ( clipSaveData != null && clipSaveData != '' ) {
				var $tgtObj = $(Clip.property.bindingClass).has('input[type="hidden"][name="attnTgtIdnfNo1"][value="'+clipSaveData+'"]').eq(0);

				if ( $tgtObj.length == 1 ) {
					if ( settings.isMobile ) {
						// 해당 오브젝크로 스크롤 - 모바일웹 전체
						$("html, body").scrollTop($tgtObj.parent().parent().offset().top-$('.mcom_nav').height()*2)
					}

					var clipInfo = Clip.makeClipInfo($tgtObj);

					if ( Clip.checkMyClip(clipInfo) != 'Y' ) {
						// 클립이 안되어 있는 경우에만 클립처리
						$tgtObj.trigger('click');
					}
				}
			}
		}
	}
};

function ClipInit() {
	if ( settings.isMobile ) {
		// 클립 애니메이션이 느려서 임시 obj 생성함
		if ( $('span.clip_ani').length == 0 ) {
			$('body').append('<span class="blind cm_clip cm_clip_item clip_ani">');
		}

		Clip.init(Clip.ui.mobile);
		Clip.readyFloatingLayerClipBtn();
	} else {
		Clip.init();
	}
}

// 앱상태의 모바일웹에서 클립을 하거나 삭제하는 경우 앱의 클립캐시 데이터가 갱신되지 않아 정합성에 오류가 발생함
// 따라서 앱에서 접속한 웹의 경우 클립 액션이 발생하면 클립 여부와 데이터를 앱으로 전달하도록함
// 나의클립에서 대량으로 삭제되는 경우에는 웹의 클립캐시도 삭제되고 삭제 대상 데이터를 알 수 없으므로 앱의 클립캐시도 reload되도록 처리
function afterClipActionForApp(actionType, clipInfo) {
	if ( settings.mobilAppNo.length > 0 && !Clip.isItemDetail() && !Clip.isCartPage() ) {
		// 상품상세는 제외함 ==> 이미 기존코드가 있음

		var target = mobile.customUrl.prefix + "://status";

		switch ( actionType ) {
		case 'Y' : // insertClip
			target += ( '/clip/Y/' + clipInfo.attnDivCd + '/' + clipInfo.attnTgtIdnfNo1 );
			break;
		case 'N' : // deleteClip
			target += ( '/clip/N/' + clipInfo.attnDivCd + '/' + clipInfo.attnTgtIdnfNo1 );
			break;
		case 'R' : // refresh - massive delete
			target += ( '/clipReload' );
			break;
		default :
			return false;
		}

		clipLog("afterClipActionForApp : target [" + target + "]");
		location.href = target;
	}
}

/////////////////////////////////////////////////////////////////////


if(typeof deferredObj === 'undefined') {
	$(document).ready(function() {
		clipLog('>>>> document.ready');
		Clip.property.isNotEmergencyDisabling =  settings.isMobile ? (typeof settings.emergency.CLIP_MO_PASS === "undefined" || settings.emergency.CLIP_MO_PASS !== 'Y') : (typeof settings.emergency.CLIP_PC_PASS == "undefined" || settings.emergency.CLIP_PC_PASS !== 'Y');
		ClipInit();
		Clip.triggerClipForSaveData();
	});
} else {
	deferredObj.done(function(){
		clipLog('>>>> deferredObj.done');
		Clip.property.isNotEmergencyDisabling =  settings.isMobile ? (typeof settings.emergency.CLIP_MO_PASS === "undefined" || settings.emergency.CLIP_MO_PASS !== 'Y') : (typeof settings.emergency.CLIP_PC_PASS == "undefined" || settings.emergency.CLIP_PC_PASS !== 'Y');
		ClipInit();
		Clip.triggerClipForSaveData();
	});
}


/**
 * 모바일앱 (앱 인터페이스) > 상품상세 - 나의 클립 여부 조회
 */
function appIfCheckMyClipItemYn() {
	var siteNo = Clip.getItemDetailObj().find('input[name="siteNo"]').val();
	var itemId = Clip.getItemDetailObj().find('input[name="attnTgtIdnfNo1"]').val();

	var returnYn = 'N';

	if ( Clip.property.isLogin && Clip.property.isNotEmergencyDisabling ) {
		// 로그인 상태에서만 조회하도록
		$.ajax({
			url : '/clip/checkMyClip.ssg',
			type : Clip.property.methodType,
			dataType : Clip.property.dataType,
			async : false,
			data : {
				'attnDivCd'         : '10',
				'attnTgtIdnfNo1'    : itemId,
				'infloSiteNo'		: Clip.getInfloSiteNo()
			},
			success : function(responseDto) {
				returnYn = responseDto.result;
			},
			error : function(e) {
				returnYn = 'E';
			}
		});
	}

	return returnYn;
}

/**
 * 모바일앱 (앱 인터페이스) > 상품상세 - 클립 버튼 클릭
 */
var _clippingFireFromApp = false;
function appIfTriggerClipBtn() {
	_clippingFireFromApp = true;
	Clip.getItemDetailObj().trigger('click');
}
