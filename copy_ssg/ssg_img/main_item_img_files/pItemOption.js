/** 상품 옵션 패키지 */
var ItmOp = {

	/* 패키지 초기화 */
	init : function(opt) {
		if (typeof(opt.initSelEvtFn) === "function") {
			ItmOp.initSelEvtFn = opt.initSelEvtFn;
		}

		var itemOptnObj = resultItemObj;

		if (itemOptnObj.itemSellTypeCd == "20") { //옵션 셀렉트 박스 초기화
			var itemOptHtml = ItmOp.getItemOptnUitemHtml(itemOptnObj);
			$("#_ordOpt_area").html(itemOptHtml[0]);
			
			if(isOptBar){
				$("#_bar_ordOpt_area").html(itemOptHtml[1]);
			}
			
			_generateDropbox();
		}else{ //단품 상품
			var uitemOptnResultHtml = "";
			var uitemObj = itemOptnObj.uitemObjMap["00000"];

			if (itemOptnObj.salestrFlag == "Y" && uitemObj.usablInvQty < 1 && uitemObj.salestrStock == true){ //재고통합 && 타지점에만 재고 존재 시
				var otherUitemObj = ItmOp.getOtherSalestrUitemObj(itemOptnObj, "00000", "N");
				otherUitemObj.addFlag = "Y";

				//진입한 지점 사은품 & 추가구성품 삭제
				$("#_frebie_area_" + uitemObj.salestrNo).remove();
				$("#_cmpt_area_" + uitemObj.salestrNo).remove();

				uitemOptnResultHtml = ItmOp.getItemOneResultHtml(itemOptnObj, otherUitemObj, 'N');
			}else {
				uitemOptnResultHtml = ItmOp.getItemOneResultHtml(itemOptnObj);
			}

			$("#cdtl_opt_bx_uitem").append(uitemOptnResultHtml[0]);
			
			if(isOptBar){
				$("#_bar_cdtl_opt_bx_uitem").append(uitemOptnResultHtml[1]);
			}
		}

		ItmOp.getTotalPrc();
	},

	/* 해당 element 영역의 셀렉트박스 이벤트 초기화 */
	initSelEvtFn : function(el) {},

	///// 옵션(UITEM) 파트 /////

	/* 옵션 HTML 구성 */
	getItemOptnUitemHtml : function(itemOptnObj) {
		var htmlStr = '';
		var htmlStr2 = '';
		
		for (var depth=1; depth<=itemOptnObj.uitemOptnDepth; depth++) {
			var disableStr = '';
			if(depth != 1){ //하위 옵션 disabled 처리
				disableStr = 'disabled';
			}

			// 옵션타입명 배열
			var optnTypeNm = itemOptnObj.uitemOptnTypeArr[depth];
			var optnHtml = ItmOp.getItemOptnUitemOptionHtml(itemOptnObj, depth);

			htmlStr += '<dl class="cdtl_dl cdtl_opt_group">';
			htmlStr += '	<dt>' + optnTypeNm.name + '</dt>';
			htmlStr += '	<dd>';
			htmlStr += '<select id="ordOpt' + depth + '" data-opt-depth="' + depth + '" data-target="#_ordOpt_area" data-template="#_dropdown" class="_dropdown" title="' + optnTypeNm.name + '" onchange="ItmOp.changeUitemIptn(this);" '+ disableStr + '>';
			htmlStr += optnHtml[0];
			htmlStr += '</select>';
			htmlStr += '	</dd>';
			htmlStr += '</dl>';
			
			htmlStr2 += '<select id="_bar_ordOpt' + depth + '" data-opt-depth="' + depth + '" data-target="#_bar_ordOpt_area" data-template="#_dropdown" class="_dropdown" title="' + optnTypeNm.name + '" onchange="ItmOp.changeUitemIptn(this);" '+ disableStr + '>';
			htmlStr2 += optnHtml[1];
			htmlStr2 += '</select>';
		}  // ~for

		return [htmlStr, htmlStr2];
	},
	
	/* depth별 옵션정보 리스트 조회 */
	getUitmOptnObjArr : function(itemOptnObj, depth, paramOptnNmArr) {

		var uitemOptnObjArr = [];
		var temp4UniqueArr = [];  // 중복제거를 위한 임시 배열

		for (var i=0; i<itemOptnObj.uitemObjList.length; i++) {
			var uitemObj = itemOptnObj.uitemObjList[i];

			if (uitemObj.uitemId == "00000") { continue; }

			// 선택된 옵션에 맞는 옵션 매칭
			var isMatch = true;
			for (var j=0; paramOptnNmArr && j<paramOptnNmArr.length; j++) {
				if (paramOptnNmArr[j] != uitemObj["uitemOptnNm" + (j+1)]) {
					isMatch = false;
				}
			}

			if (!isMatch) {
				continue;
			}

			// 옵션명
			var uitemOptnNm = uitemObj["uitemOptnNm" + depth];

			// 마지막 옵션인 경우 uitem 정보 연결
			if (depth == itemOptnObj.uitemOptnDepth) {
				uitemOptnObjArr.push({ name: uitemOptnNm, isReal: true, uitem: uitemObj });
			} else {
				// 유니크한 옵션명을 조회
				if ($.inArray(uitemOptnNm, temp4UniqueArr) === -1) {

					// 전체 품절여부를 위한 옵션명 배열
					var paramOptnNmPlusArr = [];
					for (var j=0; paramOptnNmArr && j<paramOptnNmArr.length; j++) {
						paramOptnNmPlusArr.push(paramOptnNmArr[j]);
					}
					paramOptnNmPlusArr.push(uitemOptnNm);
					var allSoldoutYn = ItmOp.getAllSoldoutYn(itemOptnObj, paramOptnNmPlusArr);  // 전체 품절여부

					uitemOptnObjArr.push({ name: uitemOptnNm, isReal: false, uitem: null, allSoldoutYn: allSoldoutYn });
					temp4UniqueArr.push(uitemOptnNm);
				}
			}

		}  // ~for
		return uitemOptnObjArr;
	},

	/* 옵션(uitem) 전체 품절여부 Y/N */
	getAllSoldoutYn : function(itemOptnObj, paramOptnNmArr) {

		for (var i=0; i<itemOptnObj.uitemObjList.length; i++) {
			var uitemObj = itemOptnObj.uitemObjList[i];

			// 선택된 옵션에 맞는 옵션 매칭
			var isMatch = true;
			for (var j=0; paramOptnNmArr && j<paramOptnNmArr.length; j++) {
				if (paramOptnNmArr[j] != uitemObj["uitemOptnNm" + (j+1)]) {
					isMatch = false;
				}
			}

			if (!isMatch) {
				continue;
			}

			// 품절이 아닌 옵션이 포함되어 있는경우 N
			if (!uitemObj.isSoldout) {
				return "N";
			}
		}  // ~for

		// 모두 품절
		return "Y";
	},

	/* 옵션(uitem) HTML option 요소 구성 */
	getItemOptnUitemOptionHtml : function(itemOptnObj, depth, isOptionSelectInit) {
		var htmlStr = '';
		var htmlStr2 = '';
		
		htmlStr += '<option value="">선택하세요.</option>';
		htmlStr2 += '<option value="">' + itemOptnObj.uitemOptnTypeArr[depth].name +' 선택하세요.</option>';

		// 초기화인 경우 선택하세요만 생성
		if (isOptionSelectInit) {
			return [htmlStr, htmlStr2];
		}

		// 선택된 상위 옵션값 배열
		var paramOptnNmArr = [];

		if (depth > 1) {
			for (var i=1; i<depth; i++) {
				var $optItemSelect = $("#ordOpt" + i);
				paramOptnNmArr.push($optItemSelect.val());
			}
		}

		// 옵션 목록 조회
		var optnObjArr = ItmOp.getUitmOptnObjArr(itemOptnObj, depth, paramOptnNmArr);
		for (var i=0; i<optnObjArr.length; i++) {
			// 마지막 옵션인 경우 isReal="Y"
			if (optnObjArr[i].isReal) {
				var uitemObj = optnObjArr[i].uitem;

				var optionName = optnObjArr[i].name;
				var soldoutAttr = "";
				var priceAttr = "";
				var itemNotiRegUrl = "javascript:fn_itemNotiReg(\""+ uitemObj.uitemId + "\");";

				if (uitemObj.isSoldout) {
					soldoutAttr = " disabled";
					if(itemOptnObj.alarmItemCd !== 'N' && uitemObj.uitemAlarmYn === 'Y'){
						soldoutAttr += " data-soldout=\"Y\" data-soldout-link=" + itemNotiRegUrl;
					}
					optionName = optionName + "(품절)";
				}
				// 옵션다가시 금액표시
				if (itemOptnObj.uitemSamePrcYn == "N") {
					priceAttr += "  data-price=\"" + formatMoney(uitemObj.bestAmt) +"\"";
				}
				if (itemOptnObj.invMngYn == "Y" && itemOptnObj.invQtyMarkgYn == "Y") {
					var invQty = uitemObj.displInvQty;
					if(uitemObj.salestrStock){
						for(var k=0 ; k < itemOptnObj.salestrUitemList.length ; k++){
							var otherUitem = itemOptnObj.salestrUitemList[k];
							if(otherUitem.uitemId == uitemObj.uitemId){
								invQty = Number(invQty) + Number(otherUitem.displInvQty);
							}
						}
					}
					if(!uitemObj.isSoldout){ //품절인경우엔 남은 수량 미노출
						optionName += ' (남은수량 ' + formatMoney(invQty) + '개)';
					}
				}

				htmlStr += '<option data-is-real="Y" data-uitem-id="' + uitemObj.uitemId + '" value="' + optnObjArr[i].name + '" ' + soldoutAttr + ' ' + priceAttr + '>' + optionName + '</option>';
				htmlStr2 += '<option data-is-real="Y" data-uitem-id="' + uitemObj.uitemId + '" value="' + optnObjArr[i].name + '" ' + soldoutAttr + ' ' + priceAttr + '>' + optionName + '</option>';
			} else {
				var optionName = optnObjArr[i].name;
				var soldoutAttr = "";
				var itemNotiRegUrl ="javascript:fn_itemNotiReg();";

				if (optnObjArr[i].allSoldoutYn == "Y") {
					soldoutAttr = " disabled";
					if(itemOptnObj.alarmItemCd !== 'N'){
						soldoutAttr += " data-soldout=\"Y\" data-soldout-link="  + itemNotiRegUrl;
					}
					optionName = optionName + "(품절)";
				}

				htmlStr += '<option value="' + optnObjArr[i].name + '" ' + soldoutAttr + '>' + optionName + '</option>';
				htmlStr2 += '<option value="' + optnObjArr[i].name + '" ' + soldoutAttr + '>' + optionName + '</option>';
			}
		}

		return [htmlStr, htmlStr2];
	},

	/* 단품옵션 변경시 이벤트 */
	changeUitemIptn : function(selectEl) {
		var $cmOptionDiv = $("div.cdtl_opt_bx");
		var itemOptnObj = resultItemObj;

		// 선택된 엘리먼트
		var $optItemDiv = $(selectEl);
		var selectedDepth = Number($optItemDiv.data("optDepth"));
		var selectedValue = $optItemDiv.val();
		
		// 옵션 선택 동기화
		if(isOptBar){
			$('#_bar_ordOpt' + selectedDepth).val(selectedValue).trigger('sync.dropdown');
			$('#ordOpt' + selectedDepth).val(selectedValue).trigger('sync.dropdown');
		}

		// 옵션 depth가 더 있다면
		if (selectedDepth < itemOptnObj.uitemOptnDepth) {

			// 하위 옵션 초기화
			for (var i=(selectedDepth + 1); i<=itemOptnObj.uitemOptnDepth; i++) {
				var optnInitHtml = ItmOp.getItemOptnUitemOptionHtml(itemOptnObj, i, true);
				$("#ordOpt" + i).html(optnInitHtml[0]);
				$("#ordOpt" + i).trigger('sync.dropdown');
				$("#ordOpt" + i).dropdown('disable');
				
				if(isOptBar){
					$("#_bar_ordOpt" + i).html(optnInitHtml[1]);
					$("#_bar_ordOpt" + i).trigger('sync.dropdown');
					$("#_bar_ordOpt" + i).dropdown('disable');
				}
			}
			
			// 다음 단계의 옵션 생성
			var optnMoreHtml = ItmOp.getItemOptnUitemOptionHtml(itemOptnObj, selectedDepth + 1);
			$("#ordOpt"  + (selectedDepth + 1)).html(optnMoreHtml[0]);
			$("#ordOpt"  + (selectedDepth + 1)).trigger('sync.dropdown');
			$("#ordOpt"  + (selectedDepth + 1)).dropdown('enable');
			
			if(isOptBar){
				$("#_bar_ordOpt"  + (selectedDepth + 1)).html(optnMoreHtml[1]);
				$("#_bar_ordOpt"  + (selectedDepth + 1)).trigger('sync.dropdown');
				$("#_bar_ordOpt"  + (selectedDepth + 1)).dropdown('enable');
			}
									
		} else if (selectedDepth == itemOptnObj.uitemOptnDepth) {
			var uitemId = $(selectEl).find("option:selected").data("uitemId");

			if (!uitemId) {
				return false;
			}

			// 옵션(리스트) : uitem_result
			var isDupl = false;
			$cmOptionDiv.find("div.selecedItem").filter(function() {
				return $(this).data("optnType") == "uitem_result";
			}).each(function(idx) {
				if ($(this).data("uitemId") == uitemId) {
					isDupl = true;
					return false;
				}
			});

			if (isDupl) {
				alert("동일한 옵션 상품이 이미 선택되어 있습니다.");
				$(selectEl).val("").trigger("select");
												
				// 옵션 선택 동기화
				if(isOptBar){
					$('#_bar_ordOpt' + selectedDepth).val("").trigger('sync.dropdown');
					$('#ordOpt' + selectedDepth).val("").trigger('sync.dropdown');
				}
				
				return false;
			}

			// 최대 구매 가능 수량 체크
			var maxQty = itemOptnObj.maxOnetOrdPsblQty;
			var optQty = 0;
			$("#cdtl_opt_bx_uitem input").each(function(idx) {
				optQty = Number(optQty) + Number($(this).val());
			});

			if(optQty >=  maxQty){
				alert('1회 최대 주문가능수량은 ' + formatMoney(maxQty) + '개 입니다.');
				$(selectEl).val("").trigger("select");
				
				// 옵션 선택 동기화
				if(isOptBar){
					$('#_bar_ordOpt' + selectedDepth).val("").trigger('sync.dropdown');
					$('#ordOpt' + selectedDepth).val("").trigger('sync.dropdown');
				}
				
				return false;
			}

			var uitemObj = itemOptnObj.uitemObjMap[uitemId];
			if (itemOptnObj.salestrFlag == "Y" && uitemObj.usablInvQty < 1 && uitemObj.salestrStock == true){ //재고통합 && 타지점에만 재고 존재 시
				return ItmOp.getOtherSalestrItemInfo(selectEl, itemOptnObj, uitemId, uitemObj.salestrNm);
			}

			// 옵션 선택영역 생성
			var uitemOptnResultHtml  = ItmOp.getUitemOptnResultHtml(itemOptnObj, uitemId, null);

			if($("#cdtl_opt_bx_uitem>div").length > 0){
				$("#cdtl_opt_bx_uitem>div:last").after(uitemOptnResultHtml[0]);
			}else{
				$("#cdtl_opt_bx_uitem").append(uitemOptnResultHtml[0]);
			}
			
			if(isOptBar){
				if($("#_bar_cdtl_opt_bx_uitem>div").length > 0){
					$("#_bar_cdtl_opt_bx_uitem>div:last").after(uitemOptnResultHtml[1]);
				}else{
					$("#_bar_cdtl_opt_bx_uitem").append(uitemOptnResultHtml[1]);
				}
			}

			ItmOp.getTotalPrc();
		}
	},

	///// 추가구성상품 파트 /////

	/* 추가구성상품 변경시 이벤트 */
	changeCmptItemSelect : function(selectEl) {
		var $cmOptionDiv =  $("div.cdtl_opt_bx");
		var itemOptnObj = resultItemObj;
		var cmptItemId = $(selectEl).val();
		var cmptSalestrNo = $(selectEl).parents("dl.cdtl_opt_prize").eq(0).data("salestrNo");
		var cmptSalestrNm = $(selectEl).parents("dl.cdtl_opt_prize").eq(0).data("salestrNm");
		var selectName = $(selectEl).attr("name");
		
		// 옵션 선택 동기화
		if(isOptBar){
			$('#cmptSelectArea').find('select[name=' + selectName + ']').val(cmptItemId).trigger('sync.dropdown');
			$('#_bar_cmptSelectArea').find('select[name=' + selectName + ']').val(cmptItemId).trigger('sync.dropdown');
		}
		
		if (!cmptItemId || '0' === cmptItemId) {
			return false;
		}

		// 선택된 옵션이 있는지 체크
		var optionExists = false;

		$("#cdtl_opt_bx_uitem>div").each(function(idx) {
			if($(this).data("salestrNo") == cmptSalestrNo){
				optionExists = true;
				return false;
			}
		});

		if ( optionExists == false ) {
			var alertMsg = '상품 옵션을 먼저 선택해주세요.';
			if(itemOptnObj.itemRegDivCd == "30"){
				alertMsg = "[" + cmptSalestrNm + "]" + alertMsg;
			}
			alert(alertMsg);
			$(selectEl).val("").trigger("select");
						
			// 옵션 선택 동기화
			if(isOptBar){
				$('#cmptSelectArea').find('select[name=' + selectName + ']').val("").trigger('sync.dropdown');
				$('#_bar_cmptSelectArea').find('select[name=' + selectName + ']').val("").trigger('sync.dropdown');
			}
			return false;
		}

		// 추가구성상품 : cmptitem_result
		var isDupl = false;
		$cmOptionDiv.find("div.selecedItem").filter(function() {
			return $(this).data("optnType") == "cmptitem_result";
		}).each(function(idx) {
			if ($(this).data("cmptItemId") == cmptItemId) {
				isDupl = true;
				return false;
			}
		});

		if (isDupl) {
			alert("동일한 추가구성 상품이 이미 선택되어 있습니다.");
			$(selectEl).val("").trigger("select");
			
			// 옵션 선택 동기화
			if(isOptBar){
				$('#cmptSelectArea').find('select[name=' + selectName + ']').val("").trigger('sync.dropdown');
				$('#_bar_cmptSelectArea').find('select[name=' + selectName + ']').val("").trigger('sync.dropdown');
			}
			return false;
		}

		// 추가구성상품 선택영역 생성
		var resultHtml = ItmOp.getCmptItemResultHtml(itemOptnObj, cmptItemId, null, cmptSalestrNo);

		if($("#cdtl_opt_bx_cmpt>div").length > 0){
			$("#cdtl_opt_bx_cmpt>div:last").after(resultHtml[0]);
		}else{
			$("#cdtl_opt_bx_cmpt").append(resultHtml[0]);
		}
		
		if(isOptBar){
			if($("#_bar_cdtl_opt_bx_cmpt>div").length > 0){
				$("#_bar_cdtl_opt_bx_cmpt>div:last").after(resultHtml[1]);
			}else{
				$("#_bar_cdtl_opt_bx_cmpt").append(resultHtml[1]);
			}
		}

		ItmOp.getTotalPrc();

		$cmOptionDiv.find("select").each(function(){
			$(this).trigger('sync.dropdown');
		});
	
	},

	///// 옵션선택 결과 파트 /////

	/* 옵션 선택결과 HTML 구성 */
	getUitemOptnResultHtml : function(itemOptnObj, uitemId, itemQty, pUitemObj) {
		// 단품정보
		var uitemObj;

		if(typeof pUitemObj != "undefined"){ //재고통합 - 타지점 옵션 추가 시
			uitemObj = pUitemObj;

			// 타지점 옵션의 재고수량 조정
			if (uitemObj.usablInvQty > resultItemObj.maxOnetOrdPsblQty) {
				uitemObj.usablInvQty = resultItemObj.maxOnetOrdPsblQty;
			}
			if (uitemObj.usablInvQty > resultItemObj.max1dyOrdPsblQty) {
				uitemObj.usablInvQty = resultItemObj.max1dyOrdPsblQty;
			}
		}else{
			uitemObj = itemOptnObj.uitemObjMap[uitemId];
		}

		var minQty = 1;
		if (minQty < itemOptnObj.mltSellQty) {
			minQty = itemOptnObj.mltSellQty;
		}

		// 배수판매수량
		var mltSellQty = 1;
		if (mltSellQty < itemOptnObj.mltSellQty) {
			mltSellQty = itemOptnObj.mltSellQty;
		}

		// 블랙/ XL / 선택옵션명1 / 선택옵션명2 / (남은수량 : 10개)
    var optSalestrTx = "";
		var optTx = "";
		if(itemOptnObj.salestrFlag == "Y" && resultItemObj.dptsNostrItemYn != "Y"){
      optSalestrTx += "[" + uitemObj.salestrNm + "] ";
		}
		if (pickupSalestrYn(uitemObj.salestrNo) == "Y") {
      optSalestrTx += "[매직픽업가능] ";
		}
		for (var depth=1; depth<=itemOptnObj.uitemOptnDepth; depth++) {
			if(depth != 1){
				optTx +=  " / ";
			}
			optTx += uitemObj["uitemOptnTypeNm" + depth] + " : ";
			optTx += uitemObj["uitemOptnNm" + depth];
		}
		if(itemOptnObj.invMngYn == 'Y' && itemOptnObj.itemSellTypeCd == '10' && itemOptnObj.invQtyMarkgYn == 'Y'){
			optTx += " (남은수량 : " + uitemObj.displInvQty + "개) ";
		}

		// 선택된 수량
		var selectedQty = minQty;
		if (itemQty) {
			selectedQty = itemQty;
		}

		// 재고통합 상품은 수량 입력 불가 처리
		var readonlyStr = "";
		if(resultItemObj.salestrFlag == 'Y'){
			readonlyStr = "readonly";
		}
		
		// 옵션 클립
		ItmOp.makeClipInfoByUitem(uitemId, uitemObj.salestrNo, "I");

		var htmlStr = '';
		htmlStr += '<div class="cdtl_opt_item selecedItem" data-optn-type="uitem_result" data-uitem-id="' + uitemId + '" data-salestr-no="' + uitemObj.salestrNo + '" data-salestr-nm="' + uitemObj.salestrNm + '">';
		htmlStr += '	<dl>';
		htmlStr += '		<dt><strong class="notranslate">' + optSalestrTx + '</strong> ' + optTx + '</dt>';
		htmlStr += '		<dd class="cdtl_art_l">';
		htmlStr += '			<div class="cdtl_amount">';
		htmlStr += '				<a href="javascript:void(0);" class="cdtl_b_minus" onclick="ItmOp.changeOrdQty(this, ' + -mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">빼기</span></a>';
		htmlStr += '				<span class="cdtl_inpbx"><input type="text" id="cdtl_item_amount' + uitemId + '" title="수량입력" value="' + selectedQty + '" ' + readonlyStr + ' onchange="ItmOp.changeOrdQty(this, 0, ' + minQty + ', ' + uitemObj.usablInvQty + ');"></span>';
		htmlStr += '				<a href="javascript:void(0);" class="cdtl_b_plus" onclick="ItmOp.changeOrdQty(this, ' + mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">더하기</span></a>';
		htmlStr += '			</div>';
		htmlStr += '		</dd>';
		htmlStr += '		<dd class="cdtl_art_r">';
		htmlStr += '			<span class="price notranslate"><em class="ssg_price" data-prc="' + uitemObj.bestAmt + '">' + formatMoney(uitemObj.bestAmt * selectedQty) + '</em><span class="ssg_tx">원</span></span>';
		htmlStr += '			<a href="javascript:void(0);" class="cdtl_item_del" onclick="ItmOp.deleteOptnResult(this);"><span class="sp_cdtl cdtl_delete"><span class="blind">삭제</span></span></a>';
		htmlStr += '		</dd>';
		htmlStr += '	</dl>';
		htmlStr += '</div>';
		
		var htmlStr2 = '';
		htmlStr2 += '<div class="dob_opt_item selecedItem" data-optn-type="uitem_result" data-uitem-id="' + uitemId + '" data-salestr-no="' + uitemObj.salestrNo + '" data-salestr-nm="' + uitemObj.salestrNm + '">';
		htmlStr2 += '	<dl class="opt_dl">';
		htmlStr2 += '		<dt class="opt_dt">' + optTx + '</dt>';
		htmlStr2 += '		<dd class="cdtl_art_l">';
		htmlStr2 += '			<div class="cdtl_amount">';
		htmlStr2 += '				<a href="javascript:void(0);" class="cdtl_b_minus" onclick="ItmOp.changeOrdQty(this, ' + -mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">빼기</span></a>';
		htmlStr2 += '				<span class="cdtl_inpbx"><input type="text" id="cdtl_item_amount' + uitemId + '" title="수량입력" value="' + selectedQty + '" ' + readonlyStr + ' onchange="ItmOp.changeOrdQty(this, 0, ' + minQty + ', ' + uitemObj.usablInvQty + ');"></span>';
		htmlStr2 += '				<a href="javascript:void(0);" class="cdtl_b_plus" onclick="ItmOp.changeOrdQty(this, ' + mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">더하기</span></a>';
		htmlStr2 += '			</div>';
		htmlStr2 += '		</dd>';
		htmlStr2 += '		<dd class="cdtl_art_r">';
		htmlStr2 += '			<span class="price notranslate"><em class="ssg_price" data-prc="' + uitemObj.bestAmt + '">' + formatMoney(uitemObj.bestAmt * selectedQty) + '</em><span class="ssg_tx">원</span></span>';
		htmlStr2 += '			<a href="javascript:void(0);" class="cdtl_item_del" onclick="ItmOp.deleteOptnResult(this);"><span class="sp_cdtl cdtl_delete"><span class="blind">삭제</span></span></a>';
		htmlStr2 += '		</dd>';
		htmlStr2 += '	</dl>';
		htmlStr2 += '</div>';
		return [htmlStr, htmlStr2] ;
	},

	/* 추가구성상품 선택결과 HTML 구성 */
	getCmptItemResultHtml : function(itemOptnObj, cmptItemId, itemQty, salestrNo) {

		// 단품정보
		var cmptItemObj;
		if(itemOptnObj.salestrNo != salestrNo){ //재고통합 - 타지점 추가구성품
			for (var x=0; x<itemOptnObj.salestrCmptList.length; x++) {
				var salestrCmptItemObj = itemOptnObj.salestrCmptList[x];
				if(cmptItemId == salestrCmptItemObj.cmptId && salestrNo == salestrCmptItemObj.salestrNo){
					cmptItemObj = salestrCmptItemObj;
				}
			}
		}else{
			cmptItemObj = itemOptnObj.cmptItemObjMap[cmptItemId];
		}
		
		var minQty = 1;
		if (minQty < cmptItemObj.minOnetOrdPsblQty) {
			minQty = cmptItemObj.minOnetOrdPsblQty;
		}

		var maxQty = cmptItemObj.usablInvQty;
		if (maxQty > cmptItemObj.maxOnetOrdPsblQty) {
			maxQty = cmptItemObj.maxOnetOrdPsblQty;
		}

		// 선택된 수량
		var selectedQty = minQty;
		if (itemQty) {
			selectedQty = itemQty;
		}

		// (ex) [추가상품] 옵션명
		var optTx = "";
		if(itemOptnObj.salestrFlag == "Y"){
			optTx += "[" + cmptItemObj.salestrNm + "] ";
		}
		optTx += cmptItemObj.cmptNm;

		var htmlStr = '';
		htmlStr += '<div class="cdtl_opt_item selecedItem" data-optn-type="cmptitem_result" data-cmpt-item-id="' + cmptItemId + '" data-salestr-no="' + cmptItemObj.salestrNo + '" >';
		htmlStr += '	<dl>';
		htmlStr += '		<dt><span class="cdtl_ico">&nbsp;</span><strong>[추가구성품]</strong> ' + optTx + '</dt>';
		htmlStr += '		<dd class="cdtl_art_l">';
		htmlStr += '			<div class="cdtl_amount">';
		htmlStr += '				<a href="javascript:void(0);" class="cdtl_b_minus" onclick="ItmOp.changeOrdQty(this, -1, ' + minQty + ', ' + maxQty + ');"><span class="blind">빼기</span></a>';
		htmlStr += '				<span class="cdtl_inpbx"><input type="text" id="cdtl_item_amount' + cmptItemId + '" title="수량입력" value="' + selectedQty + '" onchange="ItmOp.changeOrdQty(this, 0, ' + minQty + ', ' + maxQty + ');"></span>';
		htmlStr += '				<a href="javascript:void(0);" class="cdtl_b_plus" onclick="ItmOp.changeOrdQty(this, 1, ' + minQty + ', ' + maxQty + ');"><span class="blind">더하기</span></a>';
		htmlStr += '			</div>';
		htmlStr += '		</dd>';
		htmlStr += '		<dd class="cdtl_art_r">';
		htmlStr += '			<span class="price notranslate"><em class="ssg_price" data-prc="' + cmptItemObj.bestAmt + '">' + formatMoney(cmptItemObj.bestAmt * selectedQty) + '</em><span class="ssg_tx">원</span></span>';
		htmlStr += '			<a href="javascript:void(0);" class="cdtl_item_del" onclick="ItmOp.deleteOptnResult(this);"><span class="sp_cdtl cdtl_delete"><span class="blind">삭제</span></span></a>';
		htmlStr += '		</dd>';
		htmlStr += '	</dl>';
		htmlStr += '</div>';
		
		var htmlStr2 = '';
		htmlStr2 += '<div class="dob_opt_item selecedItem" data-optn-type="cmptitem_result" data-cmpt-item-id="' + cmptItemId + '" data-salestr-no="' + cmptItemObj.salestrNo + '" >';
		htmlStr2 += '	<dl class="opt_dl">';
		htmlStr2 += '		<dt class="opt_dt">[추가구성품] ' + optTx + '</dt>';
		htmlStr2 += '		<dd class="cdtl_art_l">';
		htmlStr2 += '			<div class="cdtl_amount">';
		htmlStr2 += '				<a href="javascript:void(0);" class="cdtl_b_minus" onclick="ItmOp.changeOrdQty(this, -1, ' + minQty + ', ' + maxQty + ');"><span class="blind">빼기</span></a>';
		htmlStr2 += '				<span class="cdtl_inpbx"><input type="text" id="cdtl_item_amount' + cmptItemId + '" title="수량입력" value="' + selectedQty + '" onchange="ItmOp.changeOrdQty(this, 0, ' + minQty + ', ' + maxQty + ');"></span>';
		htmlStr2 += '				<a href="javascript:void(0);" class="cdtl_b_plus" onclick="ItmOp.changeOrdQty(this, 1, ' + minQty + ', ' + maxQty + ');"><span class="blind">더하기</span></a>';
		htmlStr2 += '			</div>';
		htmlStr2 += '		</dd>';
		htmlStr2 += '		<dd class="cdtl_art_r">';
		htmlStr2 += '			<span class="price notranslate"><em class="ssg_price" data-prc="' + cmptItemObj.bestAmt + '">' + formatMoney(cmptItemObj.bestAmt * selectedQty) + '</em><span class="ssg_tx">원</span></span>';
		htmlStr2 += '			<a href="javascript:void(0);" class="cdtl_item_del" onclick="ItmOp.deleteOptnResult(this);"><span class="sp_cdtl cdtl_delete"><span class="blind">삭제</span></span></a>';
		htmlStr2 += '		</dd>';
		htmlStr2 += '	</dl>';
		htmlStr2 += '</div>';
		
		return [htmlStr, htmlStr2];
	},

	/* 단품인 경우 수량선택 HTML 구성 */
	getItemOneResultHtml : function(itemOptnObj, pUitemObj, delYn) {

		// 단품정보
		var uitemObj;

		if(typeof pUitemObj != "undefined"){ //재고통합 - 타지점 상품 존재 시
			uitemObj = pUitemObj;
		}else{
			uitemObj = itemOptnObj.uitemObjMap["00000"];
		}

		var minQty = 1;
		if (minQty < itemOptnObj.minOnetOrdPsblQty) {
			minQty = itemOptnObj.minOnetOrdPsblQty;
		}

		var mltSellQty = 1;
		if (mltSellQty < itemOptnObj.mltSellQty) {
			mltSellQty = itemOptnObj.mltSellQty;
		}

		if (minQty < mltSellQty) {
			minQty = mltSellQty;
		}

		// 상품명 (남은수량 : 10개)
		var optSalestrTx = "";
		var optTx = "";
		if(itemOptnObj.salestrFlag == "Y" && resultItemObj.dptsNostrItemYn != "Y"){
      optSalestrTx += "[" + uitemObj.salestrNm + "] ";
		}
		if(itemOptnObj.pickuItemYn == "Y"){
      optSalestrTx += "[매직픽업가능]";
		}
		optTx += itemOptnObj.itemNm;
		if(itemOptnObj.invMngYn == 'Y' && itemOptnObj.invQtyMarkgYn == 'Y'){
			if(uitemObj.salestrNo == resultItemObj.salestrNo){ // 진입한 영업점만 남은 수량 표기
				if(resultItemObj.salestrFlag == 'Y'){  //재고통합 상품은 타지점 재고까지 합쳐서 표기
					var allInvQty = uitemObj.displInvQty;
					for (var x=0; x<itemOptnObj.salestrUitemList.length; x++) {
						var salestrUitemObj = itemOptnObj.salestrUitemList[x];
						if(uitemObj.uitemId == salestrUitemObj.uitemId && salestrUitemObj.usablInvQty > 0){
							allInvQty = Number(allInvQty) + Number(salestrUitemObj.displInvQty);
						}
					}
					optTx += " (남은수량 : " + allInvQty + "개) ";
				}else{
					optTx += " (남은수량 : " + uitemObj.displInvQty + "개) ";
				}
			}
		}

		// 재고통합 상품은 수량 입력 불가 처리
		var readonlyStr = "";
		if(resultItemObj.salestrFlag == 'Y'){
			readonlyStr = "readonly";
		}

		var htmlStr = '';
		htmlStr += '<div class="cdtl_opt_item selecedItem" id="item_00000_' + uitemObj.salestrNo + '" name="item_00000_' + uitemObj.salestrNo + '" data-optn-type="oneitem_result" data-uitem-id="00000" data-salestr-no="' + uitemObj.salestrNo + '" data-salestr-nm="' + uitemObj.salestrNm + '">';
		htmlStr += '	<dl>';
		htmlStr += '		<dt><strong class="notranslate">' + optSalestrTx + '</strong> ' + optTx + '</dt>';
		htmlStr += '		<dd class="cdtl_art_l">';
		htmlStr += '			<div class="cdtl_amount">';
		htmlStr += '				<a href="javascript:void(0);" class="cdtl_b_minus" onclick="ItmOp.changeOrdQty(this, ' + -mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">빼기</span></a>';
		htmlStr += '				<span class="cdtl_inpbx"><input type="text" id="cdtl_item_amount1" title="수량입력" value="' + minQty + '" ' + readonlyStr + ' onchange="ItmOp.changeOrdQty(this, 0, ' + minQty + ', ' + uitemObj.usablInvQty + ');"></span>';
		htmlStr += '				<a href="javascript:void(0);" class="cdtl_b_plus" onclick="ItmOp.changeOrdQty(this, ' + mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">더하기</span></a>';
		htmlStr += '			</div>';
		htmlStr += '		</dd>';
		htmlStr += '		<dd class="cdtl_art_r">';
		htmlStr += '			<span class="price notranslate"><em class="ssg_price" data-prc="' + uitemObj.bestAmt + '">' + formatMoney(uitemObj.bestAmt * minQty) + '</em><span class="ssg_tx">원</span></span>';
		if(typeof pUitemObj != "undefined" && delYn == 'Y'){ //재고통합 - 타지점 상품 추가 시 삭제 버튼 추가
			htmlStr += '			<a href="javascript:void(0);" class="cdtl_item_del" onclick="ItmOp.deleteOptnResult(this);"><span class="sp_cdtl cdtl_delete"><span class="blind">삭제</span></span></a>';
		}
		htmlStr += '		</dd>';
		htmlStr += '	</dl>';
		htmlStr += '</div>';
		
		var htmlStr2 = '';
		htmlStr2 += '<div class="dob_opt_item selecedItem" id="_bar_item_00000_' + uitemObj.salestrNo + '" name="item_00000_' + uitemObj.salestrNo + '" data-optn-type="oneitem_result" data-uitem-id="00000" data-salestr-no="' + uitemObj.salestrNo + '" data-salestr-nm="' + uitemObj.salestrNm + '">';
		htmlStr2 += '	<dl class="opt_dl">';
		htmlStr2 += '		<dt class="opt_dt">' + optTx + '</dt>';
		htmlStr2 += '		<dd class="cdtl_art_l">';
		htmlStr2 += '			<div class="cdtl_amount">';
		htmlStr2 += '				<a href="javascript:void(0);" class="cdtl_b_minus" onclick="ItmOp.changeOrdQty(this, ' + -mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">빼기</span></a>';
		htmlStr2 += '				<span class="cdtl_inpbx"><input type="text" id="cdtl_item_amount1" title="수량입력" value="' + minQty + '" ' + readonlyStr + ' onchange="ItmOp.changeOrdQty(this, 0, ' + minQty + ', ' + uitemObj.usablInvQty + ');"></span>';
		htmlStr2 += '				<a href="javascript:void(0);" class="cdtl_b_plus" onclick="ItmOp.changeOrdQty(this, ' + mltSellQty + ', ' + minQty + ', ' + uitemObj.usablInvQty + ');"><span class="blind">더하기</span></a>';
		htmlStr2 += '			</div>';
		htmlStr2 += '		</dd>';
		htmlStr2 += '		<dd class="cdtl_art_r">';
		htmlStr2 += '			<span class="price notranslate"><em class="ssg_price" data-prc="' + uitemObj.bestAmt + '">' + formatMoney(uitemObj.bestAmt * minQty) + '</em><span class="ssg_tx">원</span></span>';
		if(typeof pUitemObj != "undefined" && delYn == 'Y'){ //재고통합 - 타지점 상품 추가 시 삭제 버튼 추가
			htmlStr2 += '			<a href="javascript:void(0);" class="cdtl_item_del" onclick="ItmOp.deleteOptnResult(this);"><span class="sp_cdtl cdtl_delete"><span class="blind">삭제</span></span></a>';
		}
		htmlStr2 += '		</dd>';
		htmlStr2 += '	</dl>';
		htmlStr2 += '</div>';
		
		return [htmlStr, htmlStr2] ;
	},

	/* 주문수량 변경 */
	changeOrdQty : function(aEl, changeQty, minQty, maxQty) {

		// 부모 div.opt_item 엘리먼트
		var $optItemResultDiv = $(aEl).parents("div.selecedItem").eq(0);
		var $selectEl = $optItemResultDiv.find("input");
		var optnType = $optItemResultDiv.data("optnType");
		var uitemId = $optItemResultDiv.data("uitemId");
		var salestrNo = $optItemResultDiv.data("salestrNo");
		var cmptItemId = "";
		if(optnType == "cmptitem_result"){
			cmptItemId = $optItemResultDiv.data("cmptItemId");
		}
		
		var asisQty = Math.floor(Number($selectEl.val()));
		var tobeQty = asisQty + changeQty;

		var passYn = "N"; //

		// 일반 상품만 아래 수량 체크
		if($(aEl).parents("div.selecedItem").data("optnType") != "cmptitem_result"){
			// 배수판매 상품 체크
			if ( resultItemObj.mltSellQty > 1 ) {
				var inputMltQty = asisQty%resultItemObj.mltSellQty;

				if ( inputMltQty != 0 ) {
					alert('해당 상품의 수량은 ' + formatMoney(resultItemObj.mltSellQty) + '의 배수만 입력 가능 합니다.');
					tobeQty = resultItemObj.mltSellQty;
					passYn = "Y";
				}
			}

			// 수량 증가 또는 직접 입력인 경우는 전체 선택된 옵션 상품의 1회 최대 구매 가능 수량 체크
			if(passYn !== 'Y' && changeQty >= 0){
				var optQty = 0;
				$("#cdtl_opt_bx_uitem input").each(function(idx) {
					optQty = Number(optQty) + Number($(this).val());
				});

				// changeQty >  0 : 수량 증가 또는 감소 버튼을 클릭한 것이므로, optQty 값이 수량 변동 전의 값과의 합이므로, >= 비교를 해야 한다.
				// changeQty == 0 : 수량 input box에 직접 입력으로써, optQty 값이 입력된 후의 값과의 합이므로, > 비교를 해야 한다.
				var maxOnetQty  = Math.min(resultItemObj.max1dyOrdPsblQty, resultItemObj.maxOnetOrdPsblQty);
				if( (changeQty > 0 && optQty >= resultItemObj.maxOnetOrdPsblQty) || (changeQty === 0 && optQty > resultItemObj.maxOnetOrdPsblQty) ){
					alert('최대 주문가능수량은 ' + formatMoney(maxOnetQty) + '개 입니다.');
					if (changeQty == 0) { //직접 입력하는 경우
						if( optnType === 'uitem_result') {
							// 배수판매 상품을 고려한 mltSellQty 값 입력.
							// 배수판매가 아닌 상품은 mltSellQty 값이 1.
							tobeQty = resultItemObj.mltSellQty;
						}else{
							tobeQty = minQty;
						}
					}else{ // 수량 증가 버튼 클릭 시
						tobeQty = asisQty;
					}
					passYn = "Y";
				}
			}
		}

		if (passYn !== 'Y' && (!($.isNumeric(tobeQty)) || tobeQty < minQty)) {
			if(minQty > 1){
				alert("최소 주문 가능 수량은 " + minQty + "개 입니다.");
			}
			tobeQty = minQty;
			passYn = "Y";
		} else if (passYn !== 'Y' && (tobeQty > maxQty)) {
			var itemOptnObj = resultItemObj;
			var uitemId = $optItemResultDiv.data("uitemId");
			var salestrNm = $optItemResultDiv.data("salestrNm");
			var optnType = $optItemResultDiv.data("optnType");

			if (optnType != "cmptitem_result" && itemOptnObj.salestrFlag == "Y" && itemOptnObj.uitemObjMap[uitemId].salestrStock == true){ //재고통합 && 타지점 재고 존재 시
				return ItmOp.getOtherSalestrItemInfo(aEl, itemOptnObj, uitemId, salestrNm);
			}

			alert("최대 주문 가능 수량은 " + maxQty + "개 입니다.");
			tobeQty = maxQty;
			passYn = "Y";
		}

		var $priceEl = $optItemResultDiv.find("em.ssg_price");
		var prc = formatMoney(Number(tobeQty) * $priceEl.data("prc"));

		$(".selecedItem").each(function(){
			if(optnType == "cmptitem_result"){
				if($(this).data("optnType") == optnType && $(this).data("cmptItemId") == cmptItemId & $(this).data("uitemId") == uitemId & $(this).data("salestrNo") == salestrNo){
					$(this).find("input").val(tobeQty);
					$(this).find("em.ssg_price").text(prc);
				}
			}else{
				if($(this).data("optnType") == optnType && $(this).data("uitemId") == uitemId & $(this).data("salestrNo") == salestrNo){
					$(this).find("input").val(tobeQty);
					$(this).find("em.ssg_price").text(prc);
				}
			}
		});

		ItmOp.getTotalPrc();
	},

	/* 선택한 옵션 삭제 */
	deleteOptnResult : function(aEl) {
		var $optItemResultDiv = $(aEl).parents("div.selecedItem").eq(0);

		var itemOptnObj = resultItemObj;
		var optnType = $optItemResultDiv.data("optnType");
		var salestrNo = $optItemResultDiv.data("salestrNo");
		var uitemId = $optItemResultDiv.data("uitemId");
		var cmptItemId = $optItemResultDiv.data("cmptItemId");

		if((optnType ==  "uitem_result" || optnType ==  "oneitem_result")){
			var optCntbySalestr = 0; //동일 지점 옵션 개수
			$("#cdtl_opt_bx_uitem>div").filter(function() {
				return $(this).data("salestrNo") == salestrNo;
			}).each(function(idx) {
				optCntbySalestr++;
			});

			if(salestrNo != itemOptnObj.salestrNo){ //재고 통합인 경우
				var otherUitemObj = ItmOp.getOtherSalestrUitemObj(itemOptnObj, uitemId, "Y", salestrNo);
				otherUitemObj.addFlag = "N";

				var cnt = 0;
				$($("#cdtl_opt_bx_uitem>div").get().reverse()).filter(function() { //동일 옵션의 타지점 옵션은 삭제 버튼 노출 처리
					return $(this).data("uitemId") == otherUitemObj.uitemId  && $(this).data("salestrNo") != otherUitemObj.salestrNo;
				}).each(function(idx) {
					if(cnt == 0){ //최근 선택한 옵션에만 적용
						$(this).find("a.cdtl_item_del").show();
						$(this).removeClass("salestrEnd");
						cnt++;
					}
				});
				
				if( isOptBar ){
					var cnt = 0;
					$($("#_bar_cdtl_opt_bx_uitem>div").get().reverse()).filter(function() { //동일 옵션의 타지점 옵션은 삭제 버튼 노출 처리
						return $(this).data("uitemId") == otherUitemObj.uitemId  && $(this).data("salestrNo") != otherUitemObj.salestrNo;
					}).each(function(idx) {
						if(cnt == 0){ //최근 선택한 옵션에만 적용
							$(this).find("a.cdtl_item_del").show();
							$(this).removeClass("salestrEnd");
							cnt++;
						}
					});
				}
				
				if( optCntbySalestr == 1){ //모든 옵션 삭제 시
					$("#_frebie_area_" + otherUitemObj.salestrNo).remove();
					$("#_cmpt_area_" + otherUitemObj.salestrNo).remove();

					if($("#frebieSelectArea").find("p[name='frebieData']").length < 1){ //사은품 미존재 시
						$("#frebieSelectArea").hide();
					}

					$("#cdtl_opt_bx_cmpt .selecedItem").filter(function() {
						return $(this).data("salestrNo") == otherUitemObj.salestrNo;
					}).each(function() {
						$(this).remove();
					});

					if($('#cmptSelectArea select').length <1){ //추가구성상품이 없는 경우 추가구성상품 선택 영역 히든 처리
						$('#cmptSelectArea').hide();
					}

					if($("#frebieSelectArea").css("display") == "none" && $("#cmptSelectArea").css("display") == "none"){ //사은품과 추가구성이 없는 경우 안내 문구 미노출 처리
						$('#cmptNoti').hide();
					}
					
					if(isOptBar){
						$("#_bar_frebie_area_" + otherUitemObj.salestrNo).remove();
						$("#_bar_cmpt_area_" + otherUitemObj.salestrNo).remove();

						if($("#_bar_frebieSelectArea").find("p[name='frebieData']").length < 1){ //사은품 미존재 시
							$("#_bar_frebieSelectArea").hide();
						}

						$("#_bar_cdtl_opt_bx_cmpt .selecedItem").filter(function() {
							return $(this).data("salestrNo") == otherUitemObj.salestrNo;
						}).each(function() {
							$(this).remove();
						});

						if($('#_bar_cmptSelectArea select').length <1){ //추가구성상품이 없는 경우 추가구성상품 선택 영역 히든 처리
							$('#_bar_cmptSelectArea').hide();
						}

						if($("#_bar_frebieSelectArea").css("display") == "none" && $("#_bar_cmptSelectArea").css("display") == "none"){ //사은품과 추가구성이 없는 경우 안내 문구 미노출 처리
							$('#_bar_cmptNoti').hide();
						}
					}
				}

			}else{ //일반 옵션
				if( optCntbySalestr == 1){ //모든 옵션 삭제 시
					$("#cdtl_opt_bx_cmpt .selecedItem").filter(function() {
						return $(this).data("salestrNo") == salestrNo;
					}).each(function() {
						$(this).remove();
					});
					
					$("#cmptSelectArea select").each(function(idx) {
						$(this).find("option:first").prop("selected", true);
						$(this).trigger('change');
						$(this).trigger('sync.dropdown');
					});
					
					if(isOptBar){
						$("#_bar_cdtl_opt_bx_cmpt .selecedItem").filter(function() {
							return $(this).data("salestrNo") == salestrNo;
						}).each(function() {
							$(this).remove();
						});
						
						$("#_bar_cmptSelectArea select").each(function(idx) {
							$(this).find("option:first").prop("selected", true);
							$(this).trigger('change');
							$(this).trigger('sync.dropdown');
						});
					}
				}
			}
			
			if($("#cdtl_opt_bx_uitem>div").length == 1){ // 모든 옵션 삭제 시 셀렉트 박스 초기화
				ItmOp.initSelectBox(optnType, salestrNo, cmptItemId);
			}
			
			// 옵션 클립
			ItmOp.makeClipInfoByUitem(uitemId, salestrNo, "D");

		}else{ //추가구성 상품
			ItmOp.initSelectBox(optnType, salestrNo, cmptItemId);
		}
		
		$(".selecedItem").each(function(){
			if(optnType == "cmptitem_result"){
				if($(this).data("optnType") == optnType && $(this).data("cmptItemId") == cmptItemId & $(this).data("uitemId") == uitemId & $(this).data("salestrNo") == salestrNo){
					$(this).remove();
				}
			}else{
				if($(this).data("optnType") == optnType && $(this).data("uitemId") == uitemId & $(this).data("salestrNo") == salestrNo){
					$(this).remove();
				}
			}
		});
		ItmOp.getTotalPrc();
	},

	initSelectBox : function(optnType, salestrNo, cmptItemId) {
		if(optnType == "uitem_result"){
			$("#_ordOpt_area select").each(function(idx) {
				if(idx != 0){ // 하위 옵션 disabled 처리
					$(this).attr("disabled", true);
				}
				$(this).find("option:first").each(function(){ //초기화 처리
					$(this).prop("selected", true);
					$(this).parents("select").eq(0).trigger('change');
				});
				$(this).trigger('sync.dropdown');
			});
			
			if(isOptBar){
				$("#_bar_ordOpt_area select").each(function(idx) {
					if(idx != 0){ // 하위 옵션 disabled 처리
						$(this).attr("disabled", true);
					}
					$(this).find("option:first").each(function(){ //초기화 처리
						$(this).prop("selected", true);
						$(this).parents("select").eq(0).trigger('change');
					});
					$(this).trigger('sync.dropdown');
				});
			}
		}else if(optnType == "cmptitem_result"){
			$("#cmptSelectArea").find("select").each(function() {
				var selectId = $(this).val();
				if ( $.inArray(cmptItemId, selectId) > -1 ) {
					$(this).find("option:first").prop("selected", true);
					$(this).find("option:first").parents("select").eq(0).trigger('change');
				}
				$(this).trigger('sync.dropdown');
			});
			
			if(isOptBar){
				$("#_bar_cmptSelectArea").find("select").each(function() {
					var selectId = $(this).val();
					if ( $.inArray(cmptItemId, selectId) > -1 ) {
						$(this).find("option:first").prop("selected", true);
						$(this).find("option:first").parents("select").eq(0).trigger('change');
					}
					$(this).trigger('sync.dropdown');
				});
			}
		}
	},

	/* 옵션영역 div 엘리먼트 리스트 반환 */
	getOptionDivList : function($cachedOptionDiv, optnType) {
		return $cachedOptionDiv.filter(function() {
			return $(this).data("optnType") == optnType;
		});
	},

	/* 합계 가격 계산*/
	getTotalPrc : function(){
		var totalPrc = 0;
		$(".cdtl_opt_bx .selecedItem").each(function(){
			var prc =  Number($(this).find("em.ssg_price").data("prc"));
			var qty = Number($(this).find("input").val());
			totalPrc += prc * qty;
		});

		if(totalPrc == 0){
			var itemOptnObj = resultItemObj;
			totalPrc = Number(itemOptnObj.bestAmt * itemOptnObj.minOnetOrdPsblQty);
		}

		var vTotalPrc = formatMoney(Number(totalPrc));

		if(resultItemObj.isI18n){
		  var vRate = resultItemObj.exchangeRate;
		  var precision = Math.pow(10, vRate.toString().split('.')[1].length);

		  // 부동소수점 연산 오류 방지를 위해 precision으로 정수 변환 후 계산
		  var vLangTotalPrc = formatMoney((Math.floor( ( totalPrc * (resultItemObj.exchangeRate * precision) / precision ) * 100 ) / 100).toFixed(2));

		  $("#totalPrc").text(vLangTotalPrc);
		  $("#totalOriginPrc").text('￦' + vTotalPrc);
	
		  if(isOptBar){
			$("#_bar_totalPrc").text(vLangTotalPrc);
			$("#_bar_totalOriginPrc").text('￦' + vTotalPrc);
			$(window).trigger('resize');
		  }
		}else{
		  $("#totalPrc").text(vTotalPrc);
	
		  if(isOptBar){
			$("#_bar_totalPrc").text(vTotalPrc);
			$(window).trigger('resize');
		  }
		}
	},

	/* 재고통합 - 타지점 상품 정보 추가*/
	getOtherSalestrItemInfo : function (selectEl, itemOptnObj, uitemId, salestrNm){
		var otherUitemObj = ItmOp.getOtherSalestrUitemObj(itemOptnObj, uitemId, "N");

		//타지점 상품이 없거나 이미 추가된 영업점인 경우
		if(typeof otherUitemObj == "undefined" || $(selectEl).parents("div.selecedItem").eq(0).hasClass('salestrEnd')){
			alert("선택하신 점포의 재고보다 많은 수량을 입력 하셨습니다.");
			return false;
		}

		var uitemResultHtml = "";

		if(ItmOp.confirmOtherSalestr(salestrNm)){
			otherUitemObj.addFlag = "Y";
			if(itemOptnObj.itemSellTypeCd == "20"){
				uitemResultHtml = ItmOp.getUitemOptnResultHtml(itemOptnObj, uitemId, null, otherUitemObj);
			}else{
				uitemResultHtml = ItmOp.getItemOneResultHtml(itemOptnObj, otherUitemObj, 'Y');
			}

			var cnt = 0;
			if($("#cdtl_opt_bx_uitem>div").length > 0){
				$($("#cdtl_opt_bx_uitem>div").get().reverse()).filter(function() { //동일 옵션의 타지점 옵션은 삭제 버튼 숨김 처리
					return $(this).data("uitemId") == otherUitemObj.uitemId;
				}).each(function(idx) {
					if(cnt == 0){ //최근 선택한 옵션에만 적용
						$(this).find("a.cdtl_item_del").hide();
						$(this).addClass("salestrEnd");
						$(this).after(uitemResultHtml[0]);
						cnt++;
					}
				});

				if(cnt == 0){
					$("#cdtl_opt_bx_uitem").append(uitemResultHtml[0]);
				}
			}else{
				$("#cdtl_opt_bx_uitem").append(uitemResultHtml[0]);
			}
			
			if(isOptBar){
				cnt = 0;
				if($("#_bar_cdtl_opt_bx_uitem>div").length > 0){
					$($("#_bar_cdtl_opt_bx_uitem>div").get().reverse()).filter(function() { //동일 옵션의 타지점 옵션은 삭제 버튼 숨김 처리
						return $(this).data("uitemId") == otherUitemObj.uitemId;
					}).each(function(idx) {
						if(cnt == 0){ //최근 선택한 옵션에만 적용
							$(this).find("a.cdtl_item_del").hide();
							$(this).addClass("salestrEnd");
							$(this).after(uitemResultHtml[1]);
							cnt++;
						}
					});

					if(cnt == 0){
						$("#_bar_cdtl_opt_bx_uitem").append(uitemResultHtml[1]);
					}
				}else{
					$("#_bar_cdtl_opt_bx_uitem").append(uitemResultHtml[1]);
				}
			}

			// 타지점 상은품, 추가구성상품 추가 - 타지점 사은품 및 추가구성품 선택 영역은 한번만 추가되어야한다.
			if($("#_frebie_area_" + otherUitemObj.salestrNo).length === 0 && $("#_cmpt_area_" + otherUitemObj.salestrNo).length === 0){
				ItmOp.getOtherFrebieCmptHtml(itemOptnObj, otherUitemObj.salestrNo, otherUitemObj.salestrNm);
			}

			ItmOp.getTotalPrc();
		}

		var $cmOptionDiv = $("div.cdtl_opt_bx");
		$cmOptionDiv.find("select").each(function(){
			$(this).trigger('sync.dropdown');
		});

	},

	/* 재고통합 - 타지점 옵션 조회 */
	getOtherSalestrUitemObj : function (itemOptnObj, uitemId, addFlag, salestrNo){
		for (var x=0; x<itemOptnObj.salestrUitemList.length; x++) {
			var salestrUitemObj = itemOptnObj.salestrUitemList[x];
			if(typeof salestrNo != "undefined"){ //영업점이 전달 되는 경우 해당점 객체 리턴
				if(salestrUitemObj.salestrNo == salestrNo && uitemId == salestrUitemObj.uitemId && salestrUitemObj.usablInvQty > 0){
					return salestrUitemObj;
				}
			}else if(uitemId == salestrUitemObj.uitemId && salestrUitemObj.usablInvQty > 0 && salestrUitemObj.addFlag == addFlag){
				return salestrUitemObj;
			}
		}
	},

	/* 재고통합 - 타지점 옵션 추가 컨펌 */
	confirmOtherSalestr : function (salestrNm) {
		if (confirm("[" + salestrNm + "] 상품이 품절되어 다른점포 상품으로 대체됩니다.\n선택 하시겠습니까 ?\n※ 점포별로 가격 및 프로모션이 상이 할 수 있습니다.")) {
			return true;
		} else {
			return false;
		}
	},

	/* 재고통합 - 타지점 사은품&추가구성 상품 구성*/
	getOtherFrebieCmptHtml : function (itemOptnObj, salestrNo, salestrNm) {
		var addCnt = 0;
		// 사은품 추가
		var otherFrebie;
		for(var i = 0; i < itemOptnObj.salestrFrebieList.length; i++){
			if(itemOptnObj.salestrFrebieList[i].salestrNo == salestrNo){
				otherFrebie = itemOptnObj.salestrFrebieList[i];
				break;
			}
		}

		if(typeof otherFrebie != "undefined"){
			var htmlStr = '';
			htmlStr += '<p id="_frebie_area_' + otherFrebie.salestrNo + '" class="cdtl_txt_info" name="frebieData" data-salestr-no="' + otherFrebie.salestrNo + '" data-cmpt-item-id="' + otherFrebie.frebieId + '" ><em>[' + salestrNm + ']</em> ' + otherFrebie.frebieNm +'</p>';
			$('#frebieSelectArea').find('dd').append(htmlStr);
			$('#frebieSelectArea').show();
						
			if(isOptBar){
				var htmlStr2 = '';
				htmlStr2 += '<dd id="_bar_frebie_area_' + otherFrebie.salestrNo + '" class="cdtl_txt_info" name="frebieData" data-salestr-no="' + otherFrebie.salestrNo + '" data-cmpt-item-id="' + otherFrebie.frebieId + '" >[' + salestrNm + ']<em class="em_txt"> ' + otherFrebie.frebieNm +'</em></dd>';
				$('#_bar_frebieSelectArea').find('dt').after(htmlStr2);
				$('#_bar_frebieSelectArea').show();
			}
			
			addCnt++;
		}

		// 추가구성품 추가
		var otherCmptList = [];
		for(var i = 0; i < itemOptnObj.salestrCmptList.length; i++){
			if(itemOptnObj.salestrCmptList[i].salestrNo == salestrNo){
				otherCmptList.push(itemOptnObj.salestrCmptList[i]);
			}
		}

		if(otherCmptList.length > 0){
			// 구성상품 groupping : { keyArr: [키배열], cmptObj: { 키: [구성상품배열] } }
			var cmptGroupObj = { keyArr: [], cmptObj: {} };
			for (var i=0; i<otherCmptList.length; i++) {
				var cmptItemObj = otherCmptList[i];
				if (!cmptGroupObj.cmptObj[cmptItemObj.grpNm]) {
					cmptGroupObj.cmptObj[cmptItemObj.grpNm] = [];
					cmptGroupObj.keyArr.push(cmptItemObj.grpNm);
				}
				cmptGroupObj.cmptObj[cmptItemObj.grpNm].push(cmptItemObj);
			}

			var htmlStr = '';
			var htmlStr2 = '';
			
			for (var i=0; i<cmptGroupObj.keyArr.length; i++) {
				var cmptItemArr = cmptGroupObj.cmptObj[cmptGroupObj.keyArr[i]];

				// 그룹의 구성상품이 전체 품절일 경우 비노출
				var isAllSoldoutGroup = true;
				for (var j=0; j<cmptItemArr.length; j++) {
					var cmptItemObj = cmptItemArr[j];
					if (!cmptItemObj.isSoldout) {
						isAllSoldoutGroup = false;
						break;
					}
				}
				if (isAllSoldoutGroup) {
					continue;
				}

				htmlStr += '<dl class="cdtl_dl cdtl_opt_prize"  id="_cmpt_area_' + salestrNo+ '" data-optn-type="cmptItem" data-salestr-no="' + salestrNo+ '" data-salestr-nm="' + salestrNm+ '">';
				htmlStr += '	<dt>';
				htmlStr += '		<span class="blind">[' + salestrNm + '] ' + cmptItemArr[0].grpNm + '</span>';
				htmlStr += '	</dt>';
				htmlStr += '	<dd>';
				htmlStr += '		<select id="cmpt_' + salestrNo+ '_' + i + '" name="cmpt_' + salestrNo + '_' + i + '" data-target="#_cmpt_area_' + salestrNo + '"  data-template="#_dropdown" class="_dropdown" title="본점 그룹명 선택" onchange="ItmOp.changeCmptItemSelect(this);" style="display:none">';
				htmlStr += '			<option value="">[' + salestrNm + '] ' +  cmptItemArr[0].grpNm +'</option>';
				
				htmlStr2 += '<dl class="dob_option cdtl_opt_prize"  id="_bar_cmpt_area_' + salestrNo+ '" data-optn-type="cmptItem" data-salestr-no="' + salestrNo+ '" data-salestr-nm="' + salestrNm+ '">';
				htmlStr2 += '	<dt>';
				htmlStr2 += '		<span class="blind">[' + salestrNm + '] ' + cmptItemArr[0].grpNm + '</span>';
				htmlStr2 += '	</dt>';
				htmlStr2 += '	<dd>';
				htmlStr2 += '		<select id="_bar_cmpt_' + salestrNo+ '_' + i + '" name="cmpt_' + salestrNo + '_' + i + '" data-target="#_bar_cmpt_area_' + salestrNo + '" data-template="#_dropdown" class="_dropdown" title="본점 그룹명 선택" title="' + cmptItemArr[0].grpNm + '" onchange="ItmOp.changeCmptItemSelect(this);" style="display:none">';
				htmlStr2 += '			<option value="">[' + salestrNm + '] ' +  cmptItemArr[0].grpNm +'</option>';

				var soldoutOptionHtml = "";
				for (var j=0; j<cmptItemArr.length; j++) {
					var cmptItemObj = cmptItemArr[j];

					var optionName = "[" + salestrNm + "] " + cmptItemObj.cmptNm;
					var priceAttr =  "  data-price=\"" + formatMoney(cmptItemObj.bestAmt) +"\"";

					if (cmptItemObj.isSoldout) {
						soldoutOptionHtml += '<option value="' + cmptItemObj.cmptId + '" disabled data-soldout="Y" ' + priceAttr + '>' + optionName + '(품절) </option>';
					} else {
						htmlStr += '        <option value="' + cmptItemObj.cmptId + '"  ' + priceAttr + '>' + optionName + '</option>';  // 상품명 / (가격)
						htmlStr2 += '        <option value="' + cmptItemObj.cmptId + '"  ' + priceAttr + '>' + optionName + '</option>';  // 상품명 / (가격)
					}
				}
				// 품절상품은 하단정렬
				htmlStr += soldoutOptionHtml;
				htmlStr2 += soldoutOptionHtml;

				htmlStr += '    </select>';
				htmlStr2 += '    </select>';
			}

			htmlStr += '	</dd>';
			htmlStr += '</dl>';
			
			htmlStr2 += '	</dd>';
			htmlStr2 += '</dl>';

			$('#cmptSelectArea').find('dl:last').after(htmlStr);
			$('#cmptSelectArea').show();
			
			if(isOptBar){
				$('#_bar_cmptSelectArea').find('dl:last').after(htmlStr2);
				$('#_bar_cmptSelectArea').show();
			}
			_generateDropbox();
			addCnt++;
		}

		if(addCnt > 0){ //사은품,추가구성품 안내 문구 노출
			$('#cmptNoti').show();
			
			if(isOptBar){
				$('#_bar_cmptNoti').show();
			}
		}
	},
	
	/* 옵션클립 */
	makeClipInfoByUitem : function (uitemId, salestrNo, type) {
		if ( $("#col_clip").length ) {
			var clipValue = uitemId + "+" + salestrNo + "";
			var uitemIdAndSalestrNo = $("input[name='uitemIdAndSalestrNo']").eq(0).val();
			
			if ( typeof uitemIdAndSalestrNo != 'undefined' ) {
				if ( type == "I" && uitemId != "00000" ) {
					if ( uitemIdAndSalestrNo == "00000" ) {
						uitemIdAndSalestrNo = "";
					}
					
					if ( uitemIdAndSalestrNo.indexOf(uitemId) < 0 && uitemIdAndSalestrNo.indexOf(uitemId) < 0 && uitemIdAndSalestrNo.indexOf(clipValue) < 0 ) {
						var arr = uitemIdAndSalestrNo != "" ? uitemIdAndSalestrNo.split(",") : [];
						arr.push(clipValue);
						uitemIdAndSalestrNo = arr.join(",");
					}
					
				} else if ( type == "D" && uitemId != "00000" ) {
					var arr = uitemIdAndSalestrNo != "" ? uitemIdAndSalestrNo.split(",") : [];
					arr = $.grep(arr, function(value) {
						return value != clipValue;
					});
					uitemIdAndSalestrNo = arr.join(",");
				}
				
				if ( uitemIdAndSalestrNo == "" ) {
					uitemIdAndSalestrNo = "00000";
				}
				
				$("input[name='uitemIdAndSalestrNo']").eq(0).val(uitemIdAndSalestrNo);
				
				if(isOptBar){
					if($("input[name='uitemIdAndSalestrNo']").length > 1){
						$("input[name='uitemIdAndSalestrNo']").eq(1).val(uitemIdAndSalestrNo);
					}
				}
			}
		}
	}
	
};