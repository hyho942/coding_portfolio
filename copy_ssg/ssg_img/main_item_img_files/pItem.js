/* 상품 데이터 초기화 */
function initItemData() {
	if(resultItemObj.salestrList.length > 0 && resultItemObj.minOnetOrdPsblQty == 1){ //재고통합 상품
		resultItemObj.salestrFlag = "Y";
	}

	// 상품옵션 데이터 가공
	if (resultItemObj.uitemObjList) {
		for (var i=0; i<resultItemObj.uitemObjList.length; i++) {
			var uitemObj = resultItemObj.uitemObjList[i];

			// 재고수량 조정
			// 최대 구매수량이 존재하는 경우 재고와 비교
			if (uitemObj.usablInvQty > resultItemObj.maxOnetOrdPsblQty) {
				uitemObj.usablInvQty = resultItemObj.maxOnetOrdPsblQty;
			}
			if (uitemObj.usablInvQty > resultItemObj.max1dyOrdPsblQty) {
				uitemObj.usablInvQty = resultItemObj.max1dyOrdPsblQty;
			}

			// 배수판매 재고값 조정
			if (resultItemObj.mltSellQty > 1 && uitemObj.usablInvQty%resultItemObj.mltSellQty != 0) {
				uitemObj.usablInvQty -= uitemObj.usablInvQty%resultItemObj.mltSellQty;
			}

			// 품절여부
			uitemObj.isSoldout = false;
			if (uitemObj.usablInvQty < 1) {
				uitemObj.isSoldout = true;
			}

			// 통합재고 - 타지점 재고 존재 여부 체크
			if(resultItemObj.salestrFlag == "Y"){
				for (var x=0; x<resultItemObj.salestrUitemList.length; x++) {
					var salestrUitemObj = resultItemObj.salestrUitemList[x];

					if(uitemObj.uitemId == salestrUitemObj.uitemId && salestrUitemObj.usablInvQty > 0){
						uitemObj.salestrStock =true;

						if(uitemObj.usablInvQty < 1){ //타지점 재고가 존재 하므로 품절로 보이지 않게 처리
							uitemObj.isSoldout = false;
						}
					}
				}
			}

			resultItemObj.uitemObjMap[uitemObj.uitemId] = uitemObj;

			// 단품 데이터는 위까지 세팅
			if (uitemObj.uitemId == "00000") {
				continue;
			}

			// 옵션타입명, 옵션 depth 확인
			if (resultItemObj.uitemOptnCnt == 0) {
				resultItemObj.uitemOptnTypeArr.push({ depth: 0, name: "" });  // 배열 0번째는 빈값
				for (var j=1; j<=5; j++) {
					var optnTypeNm = uitemObj["uitemOptnTypeNm" + j];
					if (optnTypeNm) {
						resultItemObj.uitemOptnTypeArr.push({ depth: j, name: optnTypeNm });
						resultItemObj.uitemOptnDepth++;
					}
				}
			}

			resultItemObj.uitemOptnCnt++;

		}  // ~for
	}

	// 추가구성상품 데이터 가공
	if (resultItemObj.cmptItemList) {
		var isAllSoldoutCmptItem = true;
		for (var i=0; i<resultItemObj.cmptItemList.length; i++) {
			var cmptItemObj = resultItemObj.cmptItemList[i];

			// 재고수량 조정
			// 최대 구매수량이 존재하는 경우 재고와 비교
			if (cmptItemObj.usablInvQty > cmptItemObj.maxOnetOrdPsblQty) {
				cmptItemObj.usablInvQty = cmptItemObj.maxOnetOrdPsblQty;
			}

			// 품절여부
			cmptItemObj.isSoldout = false;
			if (cmptItemObj.usablInvQty < 1) {
				cmptItemObj.isSoldout = true;
			} else {
				isAllSoldoutCmptItem = false;
			}
			resultItemObj.cmptItemObjMap[cmptItemObj.cmptId] = cmptItemObj;
		}
		if (isAllSoldoutCmptItem) { // 전체 품절인경우 추가구성상품 선택영역 표시하지 않음
			resultItemObj.cmptItemList = [];
		}
	}
}

function formatMoney(input) {
	var num = input;
	if (num < 0) {
		num *= -1;
		var minus = true;
	}else{
		var minus = false;
	}
	var dotPos = (num+"").split(".");
	var dotU = dotPos[0];
	var dotD = dotPos[1];
	var commaFlag = dotU.length%3;
	if(commaFlag) {
		var out = dotU.substring(0, commaFlag);
		if (dotU.length > 3) out += ",";
	}
	else var out = "";
	for (var i=commaFlag; i < dotU.length; i+=3) {
		out += dotU.substring(i, i+3);
		if( i < dotU.length-3) out += ",";
	}
	if(minus) out = "-" + out;
	if(dotD) return out + "." + dotD;
	else return out;
}

//매직픽업 영업점인지 여부
function pickupSalestrYn(salestrNo) {
	if (typeof salestrListArr != "undefined") {
		for ( var i in salestrListArr) {
			var salestr = salestrListArr[i];
			if (salestr.salestrNo == salestrNo) {
				return salestr.pickuItemYn;
			}
		}
	}

	if (salestrNo == resultItemObj.salestrNo) { //진입한 지점은 salestrListArr에 존재하지 않으므로 별도 체크 필요하다.
		return resultItemObj.pickuItemYn;
	}
}

/**
 * default 옵션 선택 관련 함수
 */
var defaultOpt = {
	allOptNm : [],
	//유효옵션 개수 조회
	getValidCnt : function() {
		var validCnt = 0;

		for ( var i in resultItemObj.uitemObjList ) {
			var vUitem = resultItemObj.uitemObjList [i];

			if ((resultItemObj.invMngYn == 'Y' && vUitem.uitemId != '00000' && vUitem.usablInvQty > 0) || (resultItemObj.invMngYn != 'Y' && vUitem.uitemId != '00000')) {
				validCnt++;
				this.allOptNm = [vUitem.uitemOptnNm1, vUitem.uitemOptnNm2, vUitem.uitemOptnNm3, vUitem.uitemOptnNm4];
			}
		}

		return validCnt;
	},
	//옵션 선택 처리 - 옵션 선택 영역에 옵션이 선택된걸로 보여지게 처리
	dispOpt : function() {
		var allOptNm = this.allOptNm;
		$("select#ordOpt1 option").each(function(idx) {
			if ( $.inArray($(this).val(), allOptNm) > -1 ) {
				$(this).prop("selected", true);
				$(this).parents("select#ordOpt1").find("cdtl_opt_select").addClass('selected').find("cdtl_opt_txt").text($(this).val());
			}
		});
	},
	//옵션 선택 프로세스
	exec : function() {
		if (this.getValidCnt() == 1) { //유효 옵션 개수가 1개인 경우 default 선택 처리
			this.dispOpt(); //옵션 선택 처리
			$("select#ordOpt1").trigger('change');
			$("select#ordOpt1").trigger('sync.dropdown');
		}
	}
}

//EP 실시간 상품 가격 연동 데이터 생성
function createEpSellPrc(){
	var itemId = $("#itemId").val();
	var ckwhere = $("#ckwhere").val();
	var epSellPrc = Number($("#epSellPrc").val());

	if(epSellPrc > 0){
		//AJAX EP 상품 가격 생성
		$.ajax({
			type: "GET",
			url: "/item/ajaxInsertEpSellPrc.ssg",
			data: { itemId : itemId, ckwhere : ckwhere, epSellPrc : epSellPrc},
			dataType: "json",
			success: function(data) {
				//alert(data);
			},
			error: function() {
				//alert('에러');
			}
		});
	}
}

// 예약가능시간 팝업
function fn_PopupItemShppOrdDgr(siteNo) {
	if ( settings.UserInfo.isLoginYn != 'Y' ) {
		login();
		return;
	}

	var url = "/comm/popup/popupReserve.ssg?siteNo=" + siteNo;
	popupWin(url, "", 860, 724, "yes", "no");
}

// 배송지 변경 팝업
function fn_ModMyShppLoc() {
	if ( settings.UserInfo.isLoginYn != 'Y' ) {
		login();
		return;
	}

	var url = settings.domain.protocol + settings.domain.domain + "/comm/popup/shpplocList.ssg";
	popupWin(url + "?callbackUrl=" + encodeURIComponent(location.href), "", 750, 822, "yes", "no");
}

// 상품 오류사항 신고 팝업 호출
function fn_PopupItemError(w, h) {
	var itemId = $("#itemId").val();

	if ( settings.UserInfo.isLoginYn != 'Y' ) {
		login();
		return;
	}

	var url = "/comm/popup/popupReport.ssg?itemId=" + itemId;
	popupWin(url, "", w, h, "yes", "no");
}

function fn_CouponDown(offerId, offerDtlSeq, siteNo, chnlId) {

	if ( settings.UserInfo.isLoginYn != 'Y' ) {
		login();
		return;
	}

	var param = {
		offerId : offerId,
		offerDtlSeq : offerDtlSeq,
		siteNo : siteNo,
		chlnId : chnlId
	};

	$.ajax({
		type : "POST",
		url : "/item/ajaxPItemPopupCoupon.ssg",
		data : param,
		dataType : "json",
		success : function(data) {

			if (data.offerDto.usePsblPerdTypeCd == '10' && data.offerDto.usePsblDateDownYn == 'N') {
				alert('쿠폰 다운로드 행사가 종료 되었습니다.');
				return false;
			}

			if (data.offerDto.usePsblDaywDownYn == 'N') {
				alert('쿠폰 다운로드가 가능한 요일이 아닙니다.');
				return false;
			}

			if ($.isNumeric(data.offerDto.cpnEapsnIssueLimitQty)) {
				if (data.offerDto.usePsblUnlimitedYn != 'Y' && (data.offerDto.cpnEapsnIssueLimitQty - data.memberCouponCnt) <= 0) {
					alert('쿠폰 발급 횟수가 초과 되었습니다.');
					return false;
				}
			}

			// 쿠폰 발급 공통
			Event.issueCouponWithQty(data.offerDto.offerId, data.offerDto.offerDtlSeq, 1); // 콜백없음.
		},
		error : function() {
			alert('통신 중 오류가 발생하였습니다.');
			return;
		}
	});
}

function getMidItemListWithAdItem() {
	var adUrl = "addp.ssg.com/addpapi/dp/cpcExtensDispCall.ssg";

	if(typeof settings !== "undefined" && settings.zone !== "prod") {
		var zone = settings.zone;
		if(zone === 'qa2'){
			zone = 'qa'
		}else if(zone === 'local'){
			zone = 'dev'
		};
		adUrl = "http://" + zone + "-" + adUrl;
	} else {
		adUrl = "http://" + adUrl;
	}

	$.ajax({
		type : "GET",
		url : adUrl,
		data: {
			advertKindCd : '20',
			siteNo : resultItemObj.dispSiteNo,
			itemId : resultItemObj.itemId,
			stdCtgId : resultItemObj.stdCtgId,
			advertExtensTeryDivCd : '40',
			salestrLst : resultItemObj.salestrNo
		},
		dataType : "json",
		timeout: 300
	}).done(function(data){
		getMidItemList(data);
	}).fail(function(){
		getMidItemList();
	});
}

function getMidItemList(data) {
	var paramDispCtgLclsId = _dispCtgLclsId;
	var paramDispCtgMclsId = _dispCtgMclsId;

	var _adItemId;
	var _advertBidId;
	var _advertAcctId;
	var _advertBilngTypeCd;
	var _advertKindCd;
	var _advertExtensTeryDivCd;

	//광고 상품 데이터 존재 시
	if (typeof data != "undefined" && data != null && data.res_code == 200 && data.advertDispTgtCnt > 0 && data.dispTgtAccumDtoList != null){
		_adItemId = data.dispTgtAccumDtoList[0].itemId;
		_advertBidId = data.dispTgtAccumDtoList[0].advertBidId;
		_advertAcctId = data.dispTgtAccumDtoList[0].advertAcctId;
		_advertBilngTypeCd = data.dispTgtAccumDtoList[0].advertBilngTypeCd;
		_advertKindCd = data.dispTgtAccumDtoList[0].advertKindCd;
		_advertExtensTeryDivCd = data.dispTgtAccumDtoList[0].advertExtensTeryDivCd;
	}

	//카테고리 베스트 & 연관상품
	$.ajax({
		type: "GET",
		url: "/item/ajaxPItemViewMid.ssg",
		data: { itemId : resultItemObj.itemId,
					siteNo : resultItemObj.siteNo,
					sellprc : resultItemObj.sellprc,
					brandId : resultItemObj.brandId,
					brandNm : resultItemObj.brandNm,
					stdCtgId : resultItemObj.stdCtgId,
					itemRegDivCd : resultItemObj.itemRegDivCd,
					etcBrandYn : resultItemObj.etcBrandYn,
					dispSiteNo : resultItemObj.dispSiteNo,
					dispCtgId: resultItemObj.ctgId,
					dispCtgLclsId :  paramDispCtgLclsId,
					dispCtgMclsId : paramDispCtgMclsId,
					grpAddrId: resultItemObj.grpAddrId,
					shppcstId: resultItemObj.shppcstId,
					splVenId: resultItemObj.splVenId,
					lrnkSplVenId: resultItemObj.lrnkSplVenId,
					mainGiftShopPeriod: resultItemObj.mainGiftShopPeriod,
					adItemId : _adItemId,
					advertBidId : _advertBidId,
					advertAcctId : _advertAcctId,
					advertBilngTypeCd : _advertBilngTypeCd,
					advertKindCd : _advertBilngTypeCd,
					advertExtensTeryDivCd : _advertExtensTeryDivCd
		},
		dataType: "html",
		success: function(data) {
			// 베스트 영역 조회
			if ( $("#item_best_div").append($("<div>"+data+"</div>").find("#mid_best_item").html())) {
				$('#item_best_div').find('.together_goods>ul').filter(function(){
					return $(this).find('>li').length > 1;
				}).bxSlider({
					pager : false,
			        prevText: '<span class="blind">이전 목록보기</span>',
			        nextText: '<span class="blind">다음 목록보기</span>'
				});

				// 광고 pv 추가
				ssg_ad.triggerHtmlImp("item_view",data);
			}

			// 레시피 조회
			if ( resultItemObj.dispSiteNo == '6001' ) {
				$("#item_recipe_div").append($("<div>"+data+"</div>").find("#mid_recipe_item").html())
			}

			// 점포 행사 그대로
			if ( (resultItemObj.dispSiteNo == '6005' || resultItemObj.dispSiteNo == '6001') && resultItemObj.itemRegDivCd == '20' ) {
				// 점포 행사 그대로 (최대 5개) 이마트 점포상품
				if ( $("#newspaper_shop_div").append($("<div>"+data+"</div>").find("#mid_newspaper_shop_item").html()) ) {
					$('#newspaper_shop_div').find('.together_goods>ul').filter(function(){
						return $(this).find('>li').length > 1;
					}).bxSlider({
						pager : false,
				        prevText: '<span class="blind">이전 목록보기</span>',
				        nextText: '<span class="blind">다음 목록보기</span>'
					});
				}
			}

			if ($("#brand_best_div").append($("<div>"+data+"</div>").find("#mid_brand_item").html()) ) {
				$('#brand_best_div').find('.together_goods>ul').filter(function(){
					return $(this).find('>li').length > 1;
				}).bxSlider({
					pager : false,
			        prevText: '<span class="blind">이전 목록보기</span>',
			        nextText: '<span class="blind">다음 목록보기</span>'
				});
			}

			// 명절 본매장 영역 조회
			if ( $("#main_gift_div").append($("<div>"+data+"</div>").find("#mid_main_gift").html())) {
				$('#main_gift_div').find('.together_goods>ul').filter(function(){
					return $(this).find('>li').length > 1;
				}).bxSlider({
					pager : false,
			        prevText: '<span class="blind">이전 목록보기</span>',
			        nextText: '<span class="blind">다음 목록보기</span>'
				});
			}
		},
		error: function() {
			//alert("에러");
		}
	});
}

function aflgProcess(aflg) {
	if ( aflg == 'payment' || aflg == 'cart' || aflg == 'direct' ) {
		var orderItemsStr = $.cookie('orderItems');

		if (orderItemsStr != null) {
			var orderItems = $.parseJSON(orderItemsStr); // 저장된 상품구성정보 복원
			$.cookie('orderItems', null, { path: '/', domain: '.ssg.com' }); // 삭제

			try {
				if ( orderItems != null && orderItems != "" && orderItems.items.length > 0 && orderItems.items[0].itemId == resultItemObj.itemId ) {
					afterLoginOrder(aflg, orderItems);
				}
			} catch(err) {};
		}

	} else if(aflg == 'gift'){
		var giftSaveStr = $.cookie('giftSaveData');

		if (giftSaveStr != null) {
			var giftSaveData = $.parseJSON(giftSaveStr);
			$.cookie('giftSaveData', null, { path: '/', domain: '.ssg.com' }); // 삭제

			try {
				if ( giftSaveStr != null && giftSaveStr != "" ) {
					giftService(giftSaveData);
				}
			} catch(err) {};
		}
	}
}

function removeTmpBox() {
	if ( $('#ordOpt1_tmp_box').length > 0 ) {
		$('#ordOpt1_tmp_box').remove();
	}
	if ( $('#ordOpt2_tmp_box').length > 0 ) {
		$('#ordOpt2_tmp_box').remove();
	}
	if ( $('#ordOpt3_tmp_box').length > 0 ) {
		$('#ordOpt3_tmp_box').remove();
	}
	if ( $('#ordOpt4_tmp_box').length > 0 ) {
		$('#ordOpt4_tmp_box').remove();
	}
	if ( $('#ordOpt5_tmp_box').length > 0 ) {
		$('#ordOpt5_tmp_box').remove();
	}
	for ( i = 0; i < resultItemObj.cmptItemList.length; i++ ) {
		id = 'cmpt' + (i+1) + '_tmp_box';
		if ( $('#'+id).length > 0 ) {
			$('#'+id).remove();
		}
	}
}

function changeHopShppDt(obj) {
	var nVal = $(obj).val();

	$('#hopShppDt').val(nVal).trigger('sync.dropdown');
	$('#_bar_hopShppDt').val(nVal).trigger('sync.dropdown');
}

function tabWayPoint(){
    // 탭 메뉴 ajax 대응
    var welDetailContWrap = $('#_cdtl_dtlcont_wrap'),
        welTabNavArea = welDetailContWrap.find('.cdtl_tab'),
        welTabNavMenus = welTabNavArea.find('li'),
        welTabContWrap = welDetailContWrap.find('.cdtl_tabcont_wrap'),
        welTabContents = welTabContWrap.find('.cdtl_tabcont'),
        nTabHeight = welTabNavArea.height();

    welTabContents.waypoint(function(direction) {
        if (direction === 'down') {
            var  nActive = welTabContents.index($(this.element));
            welTabNavMenus.eq(nActive).addClass('on').siblings().removeClass('on');
        }
    }, {
        offset: function() { return nTabHeight; }
    });

    welTabContents.waypoint(function(direction) {
        if (direction === 'up') {
            var  nActive = welTabContents.index($(this.element));
            welTabNavMenus.eq(nActive).addClass('on').siblings().removeClass('on');
        }
    }, {
        offset: function() { return -(this.element.clientHeight - nTabHeight); }
    });
}

$(function(){
	// 퀵뷰 레이어 팝업 설정
	if ( $.isFunction(ssg.View.layerPopup) ) {
		if ( param.quickViewBtn != 'undefined' && param.quickViewBtn != '' && param.quickViewBtn == 'Y' ) {
			var ttobj = "<div><a href='#none' class='cmqv_btn_view' data-layer-target='#ly_cmqv' data-replace-href=" + "'/item/popup/quickItemView.ssg?itemId=" + resultItemObj.itemId + "&amp;siteNo=" + resultItemObj.siteNo + "&amp;salestrNo=" + resultItemObj.salestrNo + "' data-info='" + resultItemObj.itemId + "'><span>간편보기</span></a><div>";
			if ( $('#itemForm').length > 0 ) {
				$('#itemForm').before(ttobj);
			}
		}
	}

	if(resultItemObj.dispSiteNo != '6004' || resultItemObj.dispSiteNo != '6009'){
		//오늘의 반값 장보기 오반장(일)
		$("#TimeSvc1").countdown({
			endDate: new Date(obanJangDispEndDts[0],obanJangDispEndDts[1],obanJangDispEndDts[2],obanJangDispEndDts[3],obanJangDispEndDts[4],obanJangDispEndDts[5])
		});
	}
	//HAPPY BUYRUS(시간)
	$("#TimeSvc2").countdown({
		endDate: new Date(happyVirusDispEndDts[0],happyVirusDispEndDts[1],happyVirusDispEndDts[2],happyVirusDispEndDts[3],happyVirusDispEndDts[4],happyVirusDispEndDts[5])
	});

	//상품 데이터 초기화
	initItemData();

	//임시 옵션, 추가구성상품 셀렉트 박스 삭제
	removeTmpBox();

	// 상품 유형 별 초기화 처리
	if(resultItemObj.isChoicePackItem === 'Y'){
		fn_initQty();
		fn_CalcAmt();
	}else{
		ItmOp.init({
			initSelEvtFn: function($el) {
			}
		});
	}

	// 옵션 상품이고, 유효한 옵션 상품이 하나인 경우 default 선택 처리
	// [#334848] [상품상세] 선택가능한 옵션 1개인 경우 자동 선택 기능 삭제.. 추후 관련 로직 삭제 필요
	if( resultItemObj.itemSellTypeCd == '20' && $("#_ordOpt_area").find("select").length == 1){
		//defaultOpt.exec();
	}

	// 옵션이 순차적으로 선택되지 않은 경우 openFail.dropdown 이벤트 발생
	$('#_ordOpt_area select').on('openFail.dropdown', function(){
		alert("옵션을 순서대로 선택해 주세요.");
	});

	// [옵션바] 옵션이 순차적으로 선택되지 않은 경우 openFail.dropdown 이벤트 발생
	$('#_bar_ordOpt_area select').on('openFail.dropdown', function(){
		alert("옵션을 순서대로 선택해 주세요.");
	});

	var aflg = param.aflg;
	if ( aflg != 'undefined' && aflg != '' ) {
		aflgProcess(aflg);
	}

	if (typeof emergencyPcItemDtlFlag === 'undefined' || emergencyPcItemDtlFlag !== 'Y') {
		createEpSellPrc(); //EP 실시간 상품 가격 연동 데이터 생성

		if ( _adItemDispYn == 'Y' ){
			getMidItemListWithAdItem();
		}else {
			getMidItemList(); //연관상품 & 카테고리 베스트 & 점포행사 더보기 & MD 추천 상품 & 브랜드 베스트
		}
	}

	//프리미엄 상품평 호출
	fn_GoCommentPagePremium(1);
	//상품평 리스트 호출
	fn_GoCommentPage(1);
	if(resultItemObj.itemRegDivCd != '20') {
		//상품문의 리스트 호출
		fn_GoQnaPage(1);
	}

	if ( isRepRelayItemList ) {
		if ( $("#cdtl_recommend_better") ) {
			$('#cdtl_recommend_better').find('.together_goods>ul').filter(function(){
				return $(this).find('>li').length > 1;
			}).bxSlider({
				pager : false,
		        prevText: '<span class="blind">이전 목록보기</span>',
		        nextText: '<span class="blind">다음 목록보기</span>'
			});
		}
	}

	if ( isOneFreeItemList ) {
		if ( $("#cdtl_recommend_onefree") ) {
			$('#cdtl_recommend_onefree').find('.together_goods>ul').filter(function(){
				return $(this).find('>li').length > 1;
			}).bxSlider({
				pager : false,
		        prevText: '<span class="blind">이전 목록보기</span>',
		        nextText: '<span class="blind">다음 목록보기</span>'
			});
		}
	}

	// 우육, 돈육 일 때, 정보
	if( resultItemObj.fdmLvstkprId !== '' && (resultItemObj.itemChrctDtlCd === 'S1' || resultItemObj.itemChrctDtlCd === 'S2') ) {
		var fdmMeatTraceCnt = 0;

		var fdmMeatiFrame = '';
		if( resultItemObj.itemChrctDtlCd === 'S1' ){
			fdmMeatiFrame = "<iframe id='beef_trace' frameborder='0' scrolling='no' style='overflow:auto;width:100%;height:980px;margin:0;padding:0;border:none;'></iframe>";
		}else if( resultItemObj.itemChrctDtlCd === 'S2' ){
			fdmMeatiFrame = "<iframe id='beef_trace' frameborder='0' scrolling='no' style='overflow:auto;width:100%;height:1060px;margin:0;padding:0;border:none;'></iframe>";
		}

		$(fdmMeatiFrame)
			.appendTo('#fdmMeatTrace')
			.attr('src', 'http://aunit.mtrace.go.kr/0.board/cattlePigSearch.jsp?searchNo='+resultItemObj.fdmLvstkprId)
			.load(function () {
					// iFrame src 사이트가 윈도우창 리사이징으로 인해 load가 2번 호출
					if (fdmMeatTraceCnt === 1) {
						$('#fdmMeatTrace').show();
					} else {
						fdmMeatTraceCnt++;
						// 만약, 해당 영역이 show() 되지 않을 때 일정 시간 이후 show()
						setTimeout(function(){
							if( $('#fdmMeatTrace').is($('#fdmMeatTrace').hide()) ) {
								$('#fdmMeatTrace').show();
							}
						}, 8000);

					}
				}
			);
	}

    // 선물서비스 클릭
    var oGiftTooltip = function () {
        var welGiftTooltip = $('#giftTooltipArea');
            welGiftBtn = welGiftTooltip.find('.cdtl_btn_gift');

        function _attachEventHandlers() {
            welGiftTooltip.on('mouseleave',function(e){
                $(e.currentTarget).removeClass('on');
            });

            welGiftBtn.on('click',function(e){
                e.preventDefault();
                $(e.currentTarget).parent().toggleClass('on');
            });
        }
        return {
            init: _attachEventHandlers
        };
    }();

    oGiftTooltip.init(); // 선물서비스 tooltip

    //입력형 옵션 동기화
    $("input[name='ordOptn']").on('change keyup', function () {
    	var no = $(this).data("no");
    	var nVal = $(this).val();

    	if($(this).attr("id") == "input_option" + no){
    		$("#_bar_input_option" + no).val(nVal);
    	}else{
    		$("#input_option" + no).val(nVal);
    	}
    });

    $("button.cdtl_btn_iptclr").on('click', function(){
    	var no = $(this).data("no");

    	$("#input_option" + no).val('');
    	$("#_bar_input_option" + no).val('');
    });

    // 상품상세 셀러톡 버튼 레이어 팝업
    if( $('#itemViewSellerTalkLayerBtn').length > 0 || $('#itemViewSellerTalkLayerOpt').length > 0 ){
      var itemViewSellerTalkYn = $.cookie('ITEM_VIEW_SELLERTALK_TOOLTIP');
      if( itemViewSellerTalkYn !== 'Y' ){
        $('#itemViewSellerTalkLayerBtn').addClass('on');
        $('#itemViewSellerTalkLayerOpt').addClass('on');
      }
    }

    // 스카이 스크래퍼 셀러톡 노출 여부
    if(resultItemObj.sellerTalkIdList.length > 0){
      var singleTarget = ( resultItemObj.directSellerTalkId.length > 0 ) ? true : false;
      skyTalkHandler.createItemSellerTalk(resultItemObj.sellerTalkIdList[0].talkId, resultItemObj.itemImgUrl, singleTarget);
    }

    setTimeout(tabWayPoint, 1000);
});

