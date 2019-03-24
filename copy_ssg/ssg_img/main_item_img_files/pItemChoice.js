// 골라담기 - 상품체크
function fn_SetItemCheck(obj) {
	var sellUnitQty = parseInt(resultItemObj.plnpckSellUnitQty);
	var chkCnt = 0;
	var no = $(obj).data("no");

	if( isOptBar ){
		if($(obj).prop("checked")){
			$("#prd_" + no).prop("checked", true);
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").addClass('on');
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").removeClass('disabled');
			
			$("#_bar_prd_" + no).prop("checked", true);
			$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").addClass('on');
			$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").removeClass('disabled');
		}else{
			$("#prd_" + no).prop("checked", false);
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").removeClass('on');
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").addClass('disabled');
			
			$("#_bar_prd_" + no).prop("checked", false);
			$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").removeClass('on');
			$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").addClass('disabled');
		}
	}
	
	$("#choicePackArea input:checkbox[name='item_pickup']:checked").each(function() {
		var idx = $(this).data("no");
		chkCnt = chkCnt + parseInt($("#item_pickup_quantity_" + idx).val());
	});

	var totalCnt = chkCnt;
	
	if($(obj).prop("checked")){
		if($("#choicePackArea input:checkbox[name='item_pickup']:checked").length > sellUnitQty) {
			alert("옵션을 최대 " + sellUnitQty + "개까지 담을 수 있습니다.");
			$("#prd_" + no).prop("checked", false);
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").removeClass('on');
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").addClass('disabled');
			
			if( isOptBar ){
				$("#_bar_prd_" + no).prop("checked", false);
				$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").removeClass('on');
				$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").addClass('disabled');
			}
			return false;
		}

		if(chkCnt > sellUnitQty){
			alert("옵션을 최대 " + sellUnitQty + "개까지 담을 수 있습니다.");
			$("#prd_" + no).prop("checked", false);
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").removeClass('on');
			$("#prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").addClass('disabled');
			
			if( isOptBar ){
				$("#_bar_prd_" + no).prop("checked", false);
				$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("span.custom_chk").removeClass('on');
				$("#_bar_prd_" + no).parents("div.optionDiv").eq(0).find("div.cdtl_amount").addClass('disabled');
			}
			return false;
		}
		
		// 옵션 클립
		id = $(obj).attr("id");
		var uitemId = $("#"+id).siblings("input[name=uitemId]").val();
		var salestrNo = $("#"+id).siblings("input[name=salestrNo]").val();
		if( typeof uitemId != "undefined" && typeof salestrNo != "undefined" ) {
			ItmOp.makeClipInfoByUitem(uitemId, salestrNo, "I");
		}
		
	}else{
		id = $(obj).attr("id");
		idx = id.substring(id.lastIndexOf("_") + 1);
		$("#item_pickup_quantity_" + idx).val("1");
		
		if( isOptBar ){
			$("#_bar_item_pickup_quantity_" + idx).val("1");
		}
		
		// 옵션 클립
		var uitemId = $("#"+id).siblings("input[name=uitemId]").val();
		var salestrNo = $("#"+id).siblings("input[name=salestrNo]").val();
		if( typeof uitemId != "undefined" && typeof salestrNo != "undefined" ) {
			ItmOp.makeClipInfoByUitem(uitemId, salestrNo, "D");
		}
	}

	fn_SetItemCalc();
}

// 골라담기 - 골라담기 수량 체크
function fn_SetItemCalc() {
	var addHtml = "";
	var nCnt = 0;
	var sellUnitQty = resultItemObj.plnpckSellUnitQty;
	var totalCnt = 0;
	var idx = "";

	$("#choicePackArea input:checkbox[name='item_pickup']:checked").each(function() {
		id = $(this).attr("id");
		idx = id.substring(id.lastIndexOf("_") + 1);
		nCnt = nCnt + parseInt($("#item_pickup_quantity_" + idx).val());
	});

	totalCnt = sellUnitQty - nCnt;

	if(nCnt == 0 && totalCnt == sellUnitQty){
		addHtml = '골라담기 상품입니다. <em>'+ sellUnitQty +'</em>개를 선택하세요.';
	}else if(nCnt < sellUnitQty ){
		addHtml = '골라담기 상품입니다. <em>'+ totalCnt +'</em>개를 선택하세요.';
	}else if (nCnt == sellUnitQty) {
		addHtml = '골라담기 상품입니다. <em>'+ sellUnitQty +'</em>개 선택이 완료되었습니다.';
	}
	
	$("#setItemQtyText").html(addHtml);
	
	if( isOptBar ){
		$("#_bar_setItemQtyText").html(addHtml);
	}
}

// 골라담기 - 단품 수량 변경
function fn_SetItemAddQuantity(obj, idx) {
	var $chkBox = $("#prd_" + idx);

	if (!$("#prd_" + idx).prop("checked")) {
		alert("옵션을 먼저 선택해주세요.");
		return false;
	}

	// sellUnitQty -> plnpckSellUnitQty 로 변경 : (sellUnitQty : 해당 기획팩 상품의 판매 개수//plnpckSellUnitQty:기획팩판매단위수량)
	var sellUnitQty = parseInt(resultItemObj.plnpckSellUnitQty);
	var chkCnt = 0;
	var qty = 0;
	var totalCnt = parseInt($("#setItemQty").val());
	var addHtml = "";
	var seq = "";
	var id = "";

	if ($(obj).attr("class") == 'cdtl_b_plus') {
		qty = parseInt($("#item_pickup_quantity_" + idx).val());
		if (qty == null && qty == "") qty = 1;

		$("#choicePackArea input:checkbox[name='item_pickup']:checked").each(function() {
			id = $(this).attr("id");
			seq = id.substring(id.lastIndexOf("_") + 1);
			chkCnt = chkCnt + parseInt($("#item_pickup_quantity_" + seq).val());
		});

		if (chkCnt >= sellUnitQty) {
			alert("옵션을 최대 " + sellUnitQty + "개까지 담을 수 있습니다.");
			return false;
		}

		qty++;
		
	} else if ($(obj).attr("class") == 'cdtl_b_minus') {
		qty = parseInt($("#item_pickup_quantity_" + idx).val());
		if (qty == null && qty == "") qty = 1;
		qty--;

		if (qty < 1) {
			return false;
		}

	}
	
	$("#item_pickup_quantity_" + idx).val(qty);
	
	if( isOptBar ){
		$("#_bar_item_pickup_quantity_" + idx).val(qty);
	}
	
	fn_SetItemCalc();
}

// 골라담기 -  수량 셀렉트 박스 제어
function fn_SelectItemAddQuantity(obj, idx) {
	var $chkBox = $("#prd_" + idx);
	if (!$chkBox.prop("checked")) {
		alert("옵션을 먼저 선택해주세요.");
		obj.val(1);
		return false;
	}

	// sellUnitQty -> plnpckSellUnitQty 로 변경 : (sellUnitQty : 해당 기획팩 상품의 판매 개수//plnpckSellUnitQty:기획팩판매단위수량)
	var sellUnitQty = parseInt(resultItemObj.plnpckSellUnitQty);
	var chkCnt = 0;
	var qty = 0;
	var seq = "";
	var id = "";
	
	qty = obj.val();
	if (typeof qty != 'number') {
		qty = parseInt(qty.replace(/[^0-9]/gi, ''), 10) || 1;
	}
	
	$("#item_pickup_quantity_" + idx).val(qty);
	
	if( isOptBar ){
		$("#_bar_item_pickup_quantity_" + idx).val(qty);
	}

	$("#choicePackArea input:checkbox[name='item_pickup']:checked").each(function() {
		id = $(this).attr("id");
		seq = id.substring(id.lastIndexOf("_") + 1);
		chkCnt = chkCnt + parseInt($("#item_pickup_quantity_" + seq).val());
	});

	if (chkCnt > sellUnitQty) {
		alert("옵션을 최대 " + sellUnitQty + "개까지 담을 수 있습니다.");
		obj.find('option:selected').prop('selected',false);
		$("#item_pickup_quantity_" + idx).val(1);
		
		if( isOptBar ){
			$("#_bar_item_pickup_quantity_" + idx).val(1);
		}
	}
	
	fn_SetItemCalc();
}

// 골라담기 - 상품 수량 변경
function fn_AddSetQty(obj) {
	var qty = 0;
	var uitemId = '00000';

	if (resultItemObj.soldOut == 'Y' || resultItemObj.soldOutPass == 'Y') {
		alert("품절된 상품입니다.");
		return false;
	}

	var idx = "";
	var sellPrc = resultItemObj.bestAmt;
	var maxQty  = Math.min(Math.min(resultItemObj.max1dyOrdPsblQty, resultItemObj.maxOnetOrdPsblQty), resultItemObj.uitemObjMap["00000"].usablInvQty);

	if (sellPrc == '') {
		sellPrc = parseInt(resultItemObj.bestAmt);
	}

	if ($(obj).attr("class") == 'cdtl_b_plus') {
		qty = parseInt($("#setItemQty").val());

		if (qty == null && qty == ""){
			qty = 1;
		}

		if (qty >= maxQty) {
			alert("1회 최대 주문가능수량은 " + maxQty + "개 입니다.");
			return false;
		}

		if (qty >= resultItemObj.usablInvQty) {
			alert("재고보다 많은 수량을 입력하셨습니다.");
			return;
		}

		qty++;
		
	} else if ($(obj).attr("class") == 'cdtl_b_minus') {
		qty = parseInt($("#setItemQty").val());
		if (qty == null && qty == "") qty = 1;
		qty--;

		if (qty < 1) {
			alert("최소 주문 수량은 " + resultItemObj.minOnetOrdPsblQty + "입니다.");
			return false;
		}

		if (qty < resultItemObj.minOnetOrdPsblQty) {
			alert("최소 주문 수량은 " + resultItemObj.minOnetOrdPsblQty + "개 입니다.");
			$(obj).val(resultItemObj.minOnetOrdPsblQty);
			fn_CalcAmt();
			return false;
		}

	}
	
	$("#setItemQty").val(qty);
	
	if( isOptBar ){
		$("#_bar_setItemQty").val(qty);
	}

	fn_CalcAmt();
}


// 골라담기 - 상품 수량 선택 시
function fn_SelectAddSetQty(obj) {
	var qty = obj.val();
	if (typeof qty != 'number') {
		qty = parseInt(qty.replace(/[^0-9]/gi, ''), 10) || 1;
	}
	
	var maxQty  = Math.min(resultItemObj.max1dyOrdPsblQty, resultItemObj.maxOnetOrdPsblQty);

	if (qty >= maxQty) {
		alert("1회 최대 주문가능수량은 " + maxQty + "개 입니다.");
		$("#setItemQty").val(maxQty);
		
		if( isOptBar ){
			$("#_bar_setItemQty").val(maxQty);
		}
		
		return false;
	}

	$("#setItemQty").val(qty);
	
	if( isOptBar ){
		$("#_bar_setItemQty").val(qty);
	}
	
	fn_CalcAmt();
}

// 골라담기 - 가격계산
function fn_CalcAmt() {
	var bestAmt = resultItemObj.bestAmt;
	var qty = $("#setItemQty").val();

	$("#totalPrc").text(formatMoney(Number(bestAmt * qty)));
	
	if( isOptBar ){
		$("#_bar_totalPrc").text(formatMoney(Number(bestAmt * qty)));
	}
}

//골라담기 - 골라담기 수량 초기화
function fn_initQty() {
	$(".cdtl_option_lst>li").each(function() {
		$(this).find("input:checkbox[name='item_pickup']").each(function() {
			$(this).prop('checked',false);
		});
		$(this).find("input:text").each(function(){
			$(this).val(1);
		});
	});
	
	$("#setItemQty").val(resultItemObj.minOnetOrdPsblQty);
}

// 식자재몰 점포옵션
function fn_fdmMeatAddSetQty(obj) {
	var no = $(obj).data("no");

	if( isOptBar ){
		if($(obj).prop("checked")){
			$("#item_select" + no).prop("checked", true);
			$("#item_select" + no).parents("span.custom_chk").eq(0).addClass('on');
			
			$("#_bar_item_select" + no).prop("checked", true);
			$("#_bar_item_select" + no).parents("span.custom_chk").eq(0).addClass('on');
		}else{
			$("#item_select" + no).prop("checked", false);
			$("#item_select" + no).parents("span.custom_chk").eq(0).removeClass('on');
			
			$("#_bar_item_select" + no).prop("checked", false);
			$("#_bar_item_select" + no).parents("span.custom_chk").eq(0).removeClass('on');
		}
	}
	
	var totalPrc = 0;
	
	// 옵션 클립
	id = $(obj).attr("id");
	var uitemId = $("#"+id).siblings("input[name=uitemId]").val();
	var salestrNo = $("#"+id).siblings("input[name=salestrNo]").val();
	if( typeof uitemId != "undefined" && typeof salestrNo != "undefined" ) {
		if($(obj).prop("checked")){
			ItmOp.makeClipInfoByUitem(uitemId, salestrNo, "I");
		} else {
			ItmOp.makeClipInfoByUitem(uitemId, salestrNo, "D");
		}
	}
	
	$("#meatChoiceArea input:checkbox[name='item_pickup']:checked").each(function() {
		var sellprc = $(this).siblings("input[name=sellprc]").val();
		totalPrc = totalPrc + parseInt(sellprc);
	});
	
	if(totalPrc == 0) {
		var itemOptnObj = resultItemObj;
		totalPrc = Number(itemOptnObj.bestAmt * itemOptnObj.minOnetOrdPsblQty);
	}
	
	$("#totalPrc").text(formatMoney(Number(totalPrc)));
	
	if( isOptBar ){
		$("#_bar_totalPrc").text(formatMoney(Number(totalPrc)));
	}
}