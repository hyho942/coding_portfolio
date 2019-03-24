
function toggleEtcBtnBuy(obj, _otherId){

  var _id = $(obj).attr("id");
  var _checked = $(obj).is(':checked');

  $("#oriCart").show();
  $("#etcCart").hide();
  if ( $("#col_clip") ) {
    $("#col_clip").detach().appendTo($("#oriCart > .cdtl_btn_tbl"));
  }

  $("#frgShppYn").prop('checked', false);
  $("#regularYn").prop('checked', false);

  if(isOptBar){
    $("#_bar_Cart").show();
    $("#_bar_etcCart").hide();

    $("#frgShppYnOpt").prop('checked', false);
    $("#regularYnOpt").prop('checked', false);
  }

  //2. 선택 처리
  if ( _checked ) {

    $('#'+_id).prop('checked', true);
    $('#'+_otherId).prop('checked', true);

    //구매 버튼 교체
    $("#oriCart").hide();
    $("#etcCart").show();

    if(isOptBar){
      $("#_bar_Cart").hide();
      $("#_bar_etcCart").show();
    }

    if ( $("#col_clip") ) {
      $("#col_clip").detach().appendTo($("#etcCart > .cdtl_btn_tbl"));
    }

    if ( _id == "frgShppYn" || _id == "frgShppYnOpt" ) {
      $("#isFrgShppCart").show();
      $("#isPerdcShppCart").hide();

      $("#frgShppYnArea").addClass('checked');
      $("#regularYnArea").removeClass('checked');

      if(isOptBar){
        $("#_bar_isFrgShppCart").show();
        $("#_bar_isPerdcShppCart").hide();

        $("#frgShppYnOptArea").addClass('checked');
        $("#regularYnOptArea").removeClass('checked');
      }
    } else if ( _id == "regularYn" || _id == "regularYnOpt" ) {
      $("#isFrgShppCart").hide();
      $("#isPerdcShppCart").show();

      $("#frgShppYnArea").removeClass('checked');
      $("#regularYnArea").addClass('checked');

      if(isOptBar){
        $("#_bar_isFrgShppCart").hide();
        $("#_bar_isPerdcShppCart").show();

        $("#frgShppYnOptArea").removeClass('checked');
        $("#regularYnOptArea").addClass('checked');
      }
    }
  } else {
    $("#regularYnArea").removeClass('checked');
    $("#frgShppYnArea").removeClass('checked');

    if(isOptBar){
      $("#regularYnOptArea").removeClass('checked');
      $("#frgShppYnOptArea").removeClass('checked');
    }
  }

  shoppingContinue("cart_tooltip");
  shoppingContinue("etc_cart_tooltip");

}

//-------------------------------------------------------------------
// 장바구니
// type         direct: 매장방문, payment: 바로구매, cart:장바구니
// onlyCookie   true이면 주문하지 않고 saveData만 생성해 cookie로 저장한다.
//-------------------------------------------------------------------
function fn_SaveCart(obj, type, bypass, onlyCookie) {
  if ( addCartValidate() ) {
    // 장바구니 유형
    var cartTypeCd = '10'; // 10:국내, 20:해외, 30:정기배송
    if ($('#frgShppYn').prop('checked')) {
      cartTypeCd = '20';
    }else if ($('#regularYn').prop('checked')) {
      cartTypeCd = "30";
    }

    var orderItems = makeOrderItems('cart');

    // 옵션 최소 구매수량 체크
    var orderTotQty = 0;

    for (var i=0; i<orderItems.length; i++) {
      orderTotQty += orderItems[i].ordQty;
    }

    if (orderTotQty < resultItemObj.minOnetOrdPsblQty) {
      alert('최소 주문가능수량은 ' + formatMoney(resultItemObj.minOnetOrdPsblQty) + '개 입니다.');
      return;
    }

    var cartSaveData = {
      cartTypeCd : cartTypeCd, //장바구니유형코드(Cart Type Code) [10:국내, 20:해외, 30:정기배송]
      infloSiteNo : resultItemObj.dispSiteNo, //유입사이트번호(Inflow Site Number)
      items : orderItems
    }

    if( !bypass ){
      if ( settings.UserInfo.isLoginYn != "Y" && ( ( type == 'cart' && cartTypeCd == '30' ) || type != 'cart' ) ) {
        $.data(document.body,"obj", obj);

        if(type == 'payment') {
          login('', go_Payment);
        } else if(type == 'cart') {
          login('', go_Cart);
        } else if(type == 'direct') {
          login('', go_Direct);
        }

        return;
      }
    }

    // 주문하지 않고 주문데이터를 쿠키에 저장하고 끝낸다.
    if (typeof onlyCookie != 'undefined' && onlyCookie == true) {
      $.cookie('orderItems', JSON.stringify(cartSaveData), {expires: 1, path: '/', domain: '.ssg.com'});
      return;
    }

    if (type == 'cart') {// 장바구니
      var cartResultStr = restCartData(cartSaveData);

      if ( cartResultStr == "Y" || cartResultStr == "U" ) {
        var toolTipTextHtml = "";

        // 이미 담은 상품이 있는 경우 문구 변경
        if ( cartResultStr == "U" ) {
          toolTipTextHtml = "상품을 장바구니에 담았습니다.<br />이미 담으신 상품이 있습니다.<br /><strong>장바구니로 이동하시겠습니까?</strong>";
        } else {
          toolTipTextHtml = "선택하신 상품이 장바구니에 담겼습니다.<br /><strong>장바구니로 이동하시겠습니까?</strong>";
        }

        //장바구니유형코드(Cart Type Code) [10:국내, 20:해외, 30:정기배송]
        if(cartSaveData.cartTypeCd == '20' || cartSaveData.cartTypeCd == '30') {
          cartTooltipShow("etc_cart_tooltip", toolTipTextHtml);
        } else {
          cartTooltipShow("cart_tooltip", toolTipTextHtml);
        }
      }
    } else if (type == 'payment') { // 바로구매
      nodcsnOrdder(cartSaveData);
    } else if (type == 'direct') { // 매장방문. 바로구매와 동일함
      nodcsnOrdder(cartSaveData);
    }
  }
}// function fn_SaveCart

//장바구니 담기 전 유효성 체크
function addCartValidate() {
  // 골라담기 상품 체크
  if ( resultItemObj.isChoicePackItem == "Y" ) {
    var chkCnt = 0;
    var sellUnitQty = $("#plnpckSellUnitQty").val();

    $("#choicePackArea").find("input:checkbox[name='item_pickup']:checked").each(function () {
      var id = $(this).attr("id");
      var idx = id.substring(id.lastIndexOf("_") + 1);
      chkCnt = chkCnt + parseInt($("#item_pickup_quantity_" + idx).val());
    });

    if (chkCnt != sellUnitQty) {
      if (chkCnt == 0) {
        alert("옵션 " + sellUnitQty + "개를 선택해주세요.");
      } else {
        alert("옵션 " + (sellUnitQty - chkCnt) + "개를 선택해주세요.");
      }
      return false;
    }
  } else if ( resultItemObj.itemChrctDivCd === 'SW' && resultItemObj.itemSellTypeCd === '20' ) {
    // 식자재몰 상품 체크
    var chkCnt = 0;
    $("#meatChoiceArea").find("input:checkbox[name='item_pickup']:checked").each(function () {
      chkCnt = chkCnt + 1;
    });
    if( chkCnt < 1 ){
      alert("옵션을 선택해주세요.");
      return false;
    }
  } else {
    // 일반 & 옵션상품 체크
    if ($("#cdtl_opt_bx_uitem>div").length < 1) {
      if ( hasOptionList ) {
        if ( $("#ordOpt1") ) {
          if($('#ordOpt1 > option:selected').val() == '0') {
            alert($('#ordOpt1').attr('title') + '을 선택해주세요.');
            return false;
          }
        }
        if ( $("#ordOpt2") ) {
          if($('#ordOpt2 > option:selected').val() == '0') {
            alert($('#ordOpt2').attr('title') + '을 선택해주세요.');
            return false;
          }
        }
        if ( $("#ordOpt3") ) {
          if($('#ordOpt3 > option:selected').val() == '0') {
            alert($('#ordOpt3').attr('title') + '을 선택해주세요.');
            return false;
          }
        }
        if ( $("#ordOpt4") ) {
          if($('#ordOpt4 > option:selected').val() == '0') {
            alert($('#ordOpt4').attr('title') + '을 선택해주세요.');
            return false;
          }
        }
        if ( $("#ordOpt5") ) {
          if($('#ordOpt5 > option:selected').val() == '0') {
            alert($('#ordOpt5').attr('title') + '을 선택해주세요.');
            return false;
          }
        }

      } else {
        alert('상품 옵션을 선택해주세요.');
        return false;
      }//end hasOptionList
    }
  }

  // 주문자 옵션
  var enterOptNm = '';
  var enterPass = true;
  var enterLength = true;
  var enterConfirmPass = true;
  if ( $("#enterOption").length ) {
    $("#enterOption input[type=text]").each(function() {
      if ($(this).val() == '') {
        if ( $(this).is('[data-add_ord_optn_mndty_yn]') && $(this).data('add_ord_optn_mndty_yn') == "Y" ) {
          enterOptNm = $(this).attr('title');
          enterPass = false;
          return false;
        } else {
          enterConfirmPass = false;
        }
      };
      if ($(this).val().length > 30) {
        enterOptNm = $(this).attr('title');
        enterLength = false;
        return false;
      };
    });
  }

  if (!enterPass) {
    alert(enterOptNm + ' 옵션을 입력해주세요.');
    return false;
  };

  // 주문자 입력 선택
  if (!enterConfirmPass) {
    if (!confirm('내용이 입력되지 않은 옵션이 있습니다. 주문을 계속 하시겠습니까?')) {
      return false;
    }
  }

  if (!enterLength) {
    alert(enterOptNm + ' 옵션 내용은 최대 30자 까지 입력 가능합니다.');
    return false;
  };

  // 희망발송일자
  var hopeShppDt = $('#hopShppDt').val();
  if (typeof hopeShppDt != 'undefined' && hopeShppDt == '') {
    alert("희망발송일을 선택하세요.");
    return false;
  }
  if (typeof hopeShppDt != 'undefined' && hopeShppDt == 'holiday') {
    alert("-토,일,공유일은 상품이 발송되지 않습니다.");
    return false;
  }

  return true;
}

//장바구니 데이터 생성
function makeOrderItems(type) {
  var items = [];

  if(resultItemObj.isChoicePackItem == 'Y'){ //골라담기 상품인 경우
    var item = new Object();
    var cmptItems = [];
    var addOrdOptns = [];
    var ordItemInfloList = [];

    item.siteNo = resultItemObj.siteNo;
    item.itemId = resultItemObj.itemId;
    item.uitemId = "00000";
    item.salestrNo = resultItemObj.salestrNo;
    item.ordQty = $("#setItemQty").val();

    if(resultItemObj.hopeShppDdDivCd){
      item.hopeShppDt = $('#hopShppDt').val();
    }

    //골라담기 단품 셋팅
    $("#choicePackArea").find("input:checkbox[name='item_pickup']:checked").each(function() {
      var id = $(this).attr("id");
      var idx = id.substring(id.lastIndexOf("_") + 1);
      var ordQty    = parseInt($("#item_pickup_quantity_" + idx).val());
      var itemId    = $(this).siblings("input[name=itemId]").val();
      var uitemId   = $(this).siblings("input[name=uitemId]").val();

      var cmpt = {
        cmptItemId: itemId,
        cmptUitemId: uitemId,
        cmptOrdQty: ordQty,
        cmptTypeCd: "00"
      };
      cmptItems.push(cmpt);
    });

    // 사은품
    $("#frebieSelectArea>dl").find("[name=frebieData]").each(function(){
      var frebieItem = new Object();
      frebieItem.cmptTypeCd = "40";
      frebieItem.cmptItemId = $(this).data("cmptItemId");
      frebieItem.cmptUitemId = "00000";
      frebieItem.cmptOrdQty = 1;
      cmptItems.push(frebieItem);
    });

    // 추가구성
    $("#cdtl_opt_bx_cmpt>div").each(function(){
      var cmptItem = new Object();
      cmptItem.cmptTypeCd = "50";
      cmptItem.cmptItemId = $(this).data("cmptItemId");
      cmptItem.cmptUitemId = "00000";
      cmptItem.cmptOrdQty = $(this).find("input[type=text]").val();
      cmptItems.push(cmptItem);
    });

    //입력형 옵션
    if ( $("#enterOption").length ) {
      $("#enterOption").find("input[type=text]").each(function(idx){
        if ( $(this).is('[data-add_ord_optn_mndty_yn]') &&
            ( $(this).data('add_ord_optn_mndty_yn') == "Y" ||
                ($(this).data('add_ord_optn_mndty_yn') != "Y" && $(this).val() != '') ) ) {
          var addOrdOptn = new Object();
          addOrdOptn.addOrdOptnSeq = (idx+1);
          addOrdOptn.addOrdOptnCntt = $(this).val();
          addOrdOptns.push(addOrdOptn);
        }
      });
    }

    if ( type == "cart" ) {
      //광고 전환율, 기여매출 집계
      if ( typeof _advertBidId != "undefined" && _advertBidId != "" ) {
        var ordItemInflo = new Object();
        ordItemInflo.ordItemInfloDivCd = "09";
        ordItemInflo.ordItemInfloTgtId = _advertExtensTeryDivCd + _advertBidId;
        ordItemInfloList.push(ordItemInflo);
      }
      item.ordItemInfloList = ordItemInfloList;
    }

    item.cmptItems = cmptItems;
    item.addOrdOptns = addOrdOptns;
    items.push(item);

  } else if ( resultItemObj.itemChrctDivCd === 'SW' && resultItemObj.itemSellTypeCd === '20' ) {
    $("#meatChoiceArea").find("input:checkbox[name='item_pickup']:checked").each(function() {
      var item = new Object();
      var cmptItems = [];
      var addOrdOptns = [];
      var ordItemInfloList = [];

      if ( type == "cart" ) {
        //광고 전환율, 기여매출 집계
        if ( typeof _advertBidId != "undefined" && _advertBidId != "" ) {
          var ordItemInflo = new Object();
          ordItemInflo.ordItemInfloDivCd = "09";
          ordItemInflo.ordItemInfloTgtId = _advertExtensTeryDivCd + _advertBidId;
          ordItemInfloList.push(ordItemInflo);
        }
        item.ordItemInfloList = ordItemInfloList;
      }

      item.siteNo = resultItemObj.siteNo;
      item.itemId = resultItemObj.itemId;
      item.uitemId = $(this).siblings("input[name=uitemId]").val();
      item.salestrNo = $(this).siblings("input[name=salestrNo]").val();
      item.ordQty = '1';
      item.cmptItems = cmptItems;
      item.addOrdOptns = addOrdOptns;
      items.push(item);
    });
  } else { //일반&옵션 상품
    var cmptSkip = new Object();

    $("#cdtl_opt_bx_uitem>div").each(function(idx){
      var item = new Object();
      var cmptItems = [];
      var addOrdOptns = [];
      var frebieSkip = new Object();
      var ordItemInfloList = [];

      item.siteNo = resultItemObj.siteNo;
      item.itemId = resultItemObj.itemId;
      item.uitemId = $(this).data("uitemId");
      item.salestrNo = $(this).data("salestrNo");
      item.ordQty = $(this).find("input[type=text]").val();

      if(resultItemObj.hopeShppDdDivCd){
        item.hopeShppDt = $('#hopShppDt').val();
      }

      // 사은품
      if (frebieSkip[item.salestrNo] != 'Y') {
        $("#frebieSelectArea>dl").find("[name=frebieData]").each(function(){
          if(item.salestrNo == $(this).data("salestrNo")){
            var frebieItem = new Object();
            frebieItem.cmptTypeCd = "40";
            frebieItem.cmptItemId = $(this).data("cmptItemId");
            frebieItem.cmptUitemId = "00000";
            frebieItem.cmptOrdQty = 1;
            cmptItems.push(frebieItem);
          }
        });

        frebieSkip[item.salestrNo] = 'Y';
      }

      // 추가구성
      if (cmptSkip[item.salestrNo] != 'Y') {
        $("#cdtl_opt_bx_cmpt>div").each(function(){
          if(item.salestrNo == $(this).data("salestrNo")){
            var cmptItem = new Object();
            cmptItem.cmptTypeCd = "50";
            cmptItem.cmptItemId = $(this).data("cmptItemId");
            cmptItem.cmptUitemId = "00000";
            cmptItem.cmptOrdQty = $(this).find("input[type=text]").val();
            cmptItems.push(cmptItem);
          }
        });

        cmptSkip[item.salestrNo] = 'Y';
      }

      // 입력형 옵션
      if ( $("#enterOption") ) {
        $("#enterOption").find("input[type=text]").each(function(idx){
          if ( $(this).is('[data-add_ord_optn_mndty_yn]') &&
              ( $(this).data('add_ord_optn_mndty_yn') == "Y" ||
                  ($(this).data('add_ord_optn_mndty_yn') != "Y" && $(this).val() != '') ) ) {
            var addOrdOptn = new Object();
            addOrdOptn.addOrdOptnSeq = (idx+1);
            addOrdOptn.addOrdOptnCntt = $(this).val();
            addOrdOptns.push(addOrdOptn);
          }
        });
      }

      if ( type == "cart" ) {
        //광고 전환율, 기여매출 집계
        if ( typeof _advertBidId != "undefined" && _advertBidId != "" ) {
          var ordItemInflo = new Object();
          ordItemInflo.ordItemInfloDivCd = "09";
          ordItemInflo.ordItemInfloTgtId = _advertExtensTeryDivCd + _advertBidId;
          ordItemInfloList.push(ordItemInflo);
        }
        item.ordItemInfloList = ordItemInfloList;
      }

      item.cmptItems = cmptItems;
      item.addOrdOptns = addOrdOptns;
      items.push(item);

    });
  }

  return items;
}

function go_Payment(){
  var obj = $.data(document.body, "obj");

  initGnb(function(info){
    UserInfo.isLoginYn = 'Y';
    afterLogin(obj, "payment");
  });

}

function go_Cart(){
  var obj = $.data(document.body, "obj");

  initGnb(function(info){
    UserInfo.isLoginYn = 'Y';
    afterLogin(obj, "cart");
  });
}


function go_Direct(){
  var obj = $.data(document.body, "obj");

  initGnb(function(info){
    UserInfo.isLoginYn = 'Y';
    afterLogin(obj, "direct");
  });
}

function afterLogin(obj, type) {
  fn_SaveCart(obj, type, true, true); // 4번째 인자 추가. 주문하지 않고 쿠키에만 저장하고 끝.

  var currUrl = "/item/itemView.ssg?itemId=" + resultItemObj.itemId + "&siteNo=" + resultItemObj.siteNo + "&salestrNo=" + resultItemObj.salestrNo;

  if (typeof type != 'undefined') {
    currUrl = currUrl + "&aflg=" + type;
  }

  if ( typeof _advertBidId != "undefined" && _advertBidId != "" ) {
    currUrl = currUrl + "&advertBidId=" + _advertBidId;
  }

  if ( typeof _advertExtensTeryDivCd != "undefined" && _advertExtensTeryDivCd != "" ) {
    currUrl = currUrl + "&advertExtensTeryDivCd=" + _advertExtensTeryDivCd;
  }

  document.location.href = currUrl;
}

//장바구니 가기
function fn_goCart() {
  if ($('#frgShppYn').prop('checked')) { //해외배송 장바구니
    location.href = payDomain + '/cart/frgShpp.ssg';
  } else if($('#regularYn').prop('checked')){ //정기배송 장바구니
    location.href = payDomain + '/cart/perdcShpp.ssg';
  } else{ //일반 장바구니
    location.href = payDomain + '/cart/dmsShpp.ssg';
  }
}

function afterLoginOrder(type, cartSaveData) {
  if (type == 'cart') {// 장바구니
    var cartResultStr = restCartData(cartSaveData);

    if ( cartResultStr == "Y" || cartResultStr == "U" ) {
      var toolTipTextHtml = "";

      // 이미 담은 상품이 있는 경우 문구 변경
      if ( cartResultStr == "U" ) {
        toolTipTextHtml = "상품을 장바구니에 담았습니다.<br />이미 담으신 상품이 있습니다.<br /><strong>장바구니로 이동하시겠습니까?</strong>";
      } else {
        toolTipTextHtml = "선택하신 상품이 장바구니에 담겼습니다.<br /><strong>장바구니로 이동하시겠습니까?</strong>";
      }

      //장바구니유형코드(Cart Type Code) [10:국내, 20:해외, 30:정기배송]
      if(cartSaveData.cartTypeCd == '20'){
        $("#frgShppYn").trigger("click"); //해외배송 체크처리
        cartTooltipShow("etc_cart_tooltip", toolTipTextHtml);
      }else if(cartSaveData.cartTypeCd == '30'){
        $("#regularYn").trigger("click"); //정기배송 체크처리
        cartTooltipShow("etc_cart_tooltip", toolTipTextHtml);
      }else{
        cartTooltipShow("cart_tooltip", toolTipTextHtml);
      }
    }
  } else if (type == 'payment') { // 바로구매
    nodcsnOrdder(cartSaveData);
  } else if (type == 'direct') { // 매장방문
    nodcsnOrdder(cartSaveData); // 바로구매와 동일함
  };
}

//입고 알림 신청 팝업
function fn_itemNotiReg(pUitemId){
  var itemId = $("#itemId").val();
  var uitemId = '00000';
  if (typeof pUitemId != 'undefined') {
    uitemId = pUitemId;
  }
  var siteNo = $("#siteNo").val();
  var itemRegDivCd = $("#itemRegDivCd").val();
  var salestrNo = $("#salestrNo").val();

  if(itemRegDivCd == '10'){ //온라인 상품인 경우 사이트번호 셋팅
    salestrNo = siteNo;
  }

  if (UserInfo.isLoginYn != 'Y' ) { //로그인 여부 체크
    login('', fn_afterLoginItemNotiReg);
    return;
  }

  var url = 'http://' + settings.domain.ssg + '/myssg/activityMng/itemNotiReg.ssg?itemId='+itemId+'&uitemId='+uitemId+'&siteNo='+siteNo+'&salestrNo='+salestrNo;
  popupWin(url, 'ItemNotiReg', 644, 692, "yes", "no");
}

//로그인 후 입고 알림 신청 팝업 처리
function fn_afterLoginItemNotiReg(){
  //입고 알림 팝업 호출
  UserInfo.isLoginYn = 'Y';
  fn_itemNotiReg();

  //바닥 페이지 리로딩
  var currUrl = document.URL;
  document.location.href = currUrl;
}

//선물하기
function fn_giftService(typeCd, divCd) {
  // 상품정보를 셋팅한다.
  var orderItems = makeOrderItems('gift');

  // 옵션 상품에서 옵션 미선택.
  if( orderItems.length === 0 ){
    var orderItem = {
      siteNo : resultItemObj.siteNo, //사이트번호(Site Number)
      itemId : resultItemObj.itemId, //상품ID(Item Identification)
      uitemId : '00000', //단품ID(Unit Item Identification)
      ordQty : resultItemObj.mltSellQty > 1 ? resultItemObj.mltSellQty : resultItemObj.minOnetOrdPsblQty, //최소 주문수량(Order Quantity)
      salestrNo : resultItemObj.salestrNo, //영업점번호(Sale Store Number) [백화점 상품 일 경우 영업점]
      cmptItems : [],
      addOrdOptns : [],		//입력형 옵션
      hopeShppDt : ''			//희망발송일자(Hope Shipping Date) [배송일 지정 상품 일 경우 사용]
    };
    orderItems.push(orderItem);
  }else{
    // 옵션 최소 구매수량 체크
    var orderTotQty = 0;
    for (var i=0; i<orderItems.length; i++) {
      orderTotQty += orderItems[i].ordQty;
    }
    if (orderTotQty < resultItemObj.minOnetOrdPsblQty) {
      alert('최소 주문가능수량은 ' + formatMoney(resultItemObj.minOnetOrdPsblQty) + '개 입니다.');
      return;
    }
  }

  var reqItem = {
    giftDemndTypeCd : typeCd,
    giftInfloDivCd : divCd,
    infloSiteNo : resultItemObj.dispSiteNo,
    items : orderItems
  };

  // 로그인 체크
  if ( settings.UserInfo.isLoginYn != 'Y' ) {
    $.cookie('giftSaveData', JSON.stringify(reqItem), {expires: 1, path: '/', domain: '.ssg.com'});
    login('', go_Gift);
    return;
  }

  giftService(reqItem);
}

function go_Gift() {
  initGnb(function(info){
    UserInfo.isLoginYn = 'Y';
    afterLoginGift();
  });
}

//재로그인 후 주문하기 실행
function afterLoginGift() {
  var currUrl = document.URL;
  document.location.href =  currUrl + "&aflg=gift";
}

//쇼핑 계속하기
function shoppingContinue(name){
  $(".cdtl_btn_wrap").find("[name=" + name + "]").each(function() {
    $(this).hide();
    $(this).parent().removeClass('on');
  });
}

//장바구니 툴팁 노출
function cartTooltipShow(name, toolTipTextHtml){
  $(".cdtl_btn_wrap").find("[name=" + name + "]").each(function() {
    $(this).find("[name=" + name + "_text]").html(toolTipTextHtml);
    $(this).show();
    $(this).parent().addClass('on');
  });
}