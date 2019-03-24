// 상품문의 필터
function getPcQnaFilter(obj, pFilterCol) {

	$("#qnaPostngProcStatCd").val(pFilterCol);
	$("#qnaPageNo").val("1");

	$(obj).parent().addClass("on");
	$(obj).parent().siblings('li').removeClass("on");

	fn_GoQnaPage(1);
}

// 상품QnA 팝업
function popupGoQnaReg(postngId, mode, postngProcStatCd, postngCnttTypeCd){
	var qnaItemId = $("#qnaItemId").val();
	var qnaSiteNo = $("#qnaSiteNo").val();
	var qnaSalestrNo = $("#qnaSalestrNo").val();

	if (UserInfo.isLoginYn == "N") {
		login();
		return;
	}

	if (UserInfo.mbrTypeCd == "90") {
		alert("회원에게만 제공되는 서비스입니다.\n회원으로 가입하시면 보다 많은 서비스를 이용하실 수 있습니다.");
		return;
	}

	var url = "/item/itemQnaReg.ssg?itemId=" + qnaItemId + "&siteNo=" + qnaSiteNo + "&regMode=" + mode + "&bbsId=2&postngId=" + postngId + "&salestrNo=" + qnaSalestrNo + "&tlYn=N";
	popupWin(url, "", 551, 750, "yes", "no");
}

// qna 리스트
function fn_GoQnaPage(page) {
	var qnaItemId = $("#qnaItemId").val();
	var qnaSiteNo = $("#qnaSiteNo").val();
	var qnaSalestrNo = $("#qnaSalestrNo").val();
	var qnaDispSiteNo = $("#qnaDispSiteNo").val();
	var qnaPostngProcStatCd = $("#qnaPostngProcStatCd").val();
	var qnaDualzSiteNo = $("#qnaDualzSiteNo").val();

	$("#qnaPageNo").val(page); //상품문의 삭제시 사용할 페이지번호

	var url = "/item/ajaxItemQnaPageList.ssg";
	var paramData = {itemId:qnaItemId, siteNo:qnaSiteNo, salestrNo:qnaSalestrNo, dispSiteNo:qnaDispSiteNo, postngProcStatCd:qnaPostngProcStatCd, dualzSiteNo:qnaDualzSiteNo, page:page, pageSize:"10"};

	$.ajax({
		type: "GET",
		url: url,
		data: paramData,
		dataType: "json",
		success: function (data) {
			//카운팅 셋팅
			$("#qaTotalCntTab").text(formatMoney(data.totalCnt));
			$("#gTitQnaTotalCnt").text(formatMoney(data.totalCnt));
			$("#gFilterQnaTotalCnt").text(formatMoney(data.totalCnt));
			$("#gFilterQnaCmplCnt").text(formatMoney(data.totalAnsstCnt));
			$("#gFilterQnaRdyCnt").text(formatMoney(data.noAnsstCnt));

			var pageDto = data.pageDto;
			$("#cdtl_qna_tbody tr").remove();

			if (pageDto.totalCount == 0) {
				var htmlArr = [];
				htmlArr.push('<tr>');
				htmlArr.push('	<td colspan="5">');
				htmlArr.push('		<p class="cdtl_tx_nodata"><span class="cdtl_ico_notice">&nbsp;</span>등록된 상품문의가 없습니다.</p>');
				htmlArr.push('	</td>');
				htmlArr.push('</tr>');

				$("#cdtl_qna_tbody").append(htmlArr.join(''));
				$("#qna_navi_area").hide();
			} else {
				$('#_itemQnaTemplate').tmpl(data).appendTo('#cdtl_qna_tbody');
				
				// 리액트 로그 prefix 변경
				$('#cdtl_qna_tbody').find('.clickable').each(function(idx) {
					$(this).attr('data-react-Tarea', $(this).data('reactTarea').replace('vReactPrefix', itemReactPrefix));
				});

				$("#comment_navi_area").show();
				fn_PageNavi(data.pageDto, $("#qna_navi_area"), 'fn_GoQnaPage');

				if(page > 1) {
					var offset = $('#qna_list_area').offset().top;
					$(window).scrollTop(offset);
				}
			}
			Waypoint.refreshAll();
		},
		error: function () {
			//alert("에러");
		}
	});
}

// qna 삭제
function deleteQna(obj, bbsId, postngId, postngProcStatCd) {
	if ( UserInfo.isLoginYn == "N" ) {
		login();
		return;
	}

	var param = [];

	param.push({
		"name" : "bbsId",
		"value" : bbsId
	});
	param.push({
		"name" : "postngId",
		"value" : postngId
	});

	var confirmMsg = "삭제하시겠습니까?";

	if(postngProcStatCd == "20") {
		confirmMsg = "정말 삭제하시겠습니까?";
	}

	if ( confirm(confirmMsg) ) {
		$.ajax({
			type : "POST",
			url : "/item/ajaxItemQnaDelete.ssg",
			data : param,
			dataType : "json",
			success : function(data) {
				if (data == 'Y') {
					alert("삭제되었습니다.");
					fn_GoQnaPage($("#qnaPageNo").val());
				} else {
					alert('삭제중 에러가 발생하였습니다.');
				}
			},
			error : function() {
				alert('에러');
			}
		});
	}
}

function fn_goCustomer() {
	window.open("http://" + settings.domain.ssg + "/customer/main.ssg", "_blank");
}