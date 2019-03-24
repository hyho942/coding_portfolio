var isMystoreYn = false;
var postionChk = false;
var goCmtPositon = 'N';
var fnTimer = null;

//페이징
function fn_PageNavi(pageInfo, obj, funcName) {

    var currentPage = pageInfo.curPage;
    var startPage = (Math.ceil(currentPage/pageInfo.pageSize)-1) * pageInfo.pageSize + 1;
    var previousScalePage = startPage - 1;
    var pages = [];
    var nextScalePage = 0;
    for (nextScalePage = startPage; nextScalePage < startPage + pageInfo.pageSize; nextScalePage++) {
        if (nextScalePage <= pageInfo.totalPage) {
            pages.push(nextScalePage);
        } else {
            break;
        }
    }

    pageInfo.currentPage = currentPage;
    pageInfo.startPage = startPage;
    pageInfo.pages = pages;
    pageInfo.nextScalePage = nextScalePage;
    pageInfo.previousScalePage = previousScalePage;

    var htmlArr = [];

    if (pageInfo.totalPage > 0) {

    	if(pageInfo.totalPage > 10){
            if (pageInfo.curPage != 1 ) {
                htmlArr.push('<a class="btn_first" href="javascript:;" onclick="' + funcName + '(\'1\')" title="처음"><span class="blind">처음</span></a>');
            }

            if (pageInfo.startPage > 1) {
                htmlArr.push('<a class="btn_prev" href="javascript:;" onclick="' + funcName + '(\'' + pageInfo.previousScalePage + '\')" title="이전"><span class="blind">이전</span></a>');
            }
    	}
        for (var i = 0; i < pageInfo.pages.length; i++) {

            var page = Number(pageInfo.pages[i]);
            if (pageInfo.curPage != page) {
                htmlArr.push('<a href="javascript:;" onclick="' + funcName + '(\'' + page + '\')" >' + page + '</a>');
            }
            if (pageInfo.curPage == page) {
                htmlArr.push('<strong title="현재위치">' + page + '</strong>');
            }
        }

        if(pageInfo.totalPage > 10){
	        if (pageInfo.nextScalePage <= pageInfo.totalPage) {
	            htmlArr.push('<a class="btn_next" href="javascript:;" onclick="' + funcName + '(\'' + pageInfo.nextScalePage + '\')" title="다음"><span class="blind">다음</span></a>');
	        }
	        if (pageInfo.curPage != pageInfo.totalPage ) {
	            htmlArr.push('<a class="btn_last" href="javascript:;" onclick="' + funcName + '(\'' + pageInfo.totalPage + '\')" title="마지막"><span class="blind">끝</span></a>');
	        }
        }
    }

    $(obj).html(htmlArr.join(' '));

    if (pageInfo.totalCount == 0) {
        $(obj).hide();
    }
    else {
        $(obj).show();
    }
}

//내점포만보기
function getPcMyStore() {
	if ( UserInfo.isLoginYn == "N" ) {
		login('', go_CommentTab);
        return;
    }
	
	if(commentMyStorePageProgress == false) {
		$('#cmt_tabarea').toggleClass("disabled");

		if($("#cmt_tabarea").hasClass("disabled") === true) {
			isMystoreYn = true;
			$('#myStoreBtnNm').text('전체보기');
			fn_GoCommentMyStorePage(1);
		} else {
			$('#myStoreBtnNm').text('내점포만보기');
			isMystoreYn = false;
			fn_GoCommentPage(1);
		}
	}
}

//상품평 정렬
function getPcCommentSort(obj) {
	
    var sortCol = $(obj).val();
    
    $("#commentSort").val(sortCol);
    
    if(isMystoreYn == false ) {
    	if($("#commentUitemId").val() == 'all') {
    		fn_GoCommentPage(1);
    	} else {
    		fn_GoCommentOptionPage(1);
    	}
    }
    
}

// 상품평 필터
function getPcCommentFilter(obj, pFilterCol) {
	
	$("#commentFilterCol").val(pFilterCol);
	$("#commentPage").val("1");

	$(obj).parent().addClass("on");
    $(obj).parent().siblings('li').removeClass("on");
	
    if(isMystoreYn == false) {
    	fn_GoCommentPage(1);
    }
}

// 프리미엄 상품평리스트
var commentPremiumPageProgress = false;
function fn_GoCommentPagePremium(pageNo) {
	if(commentPremiumPageProgress) {
		return;
	}
	commentPremiumPageProgress = true;
	
	var url = "/item/ajaxItemCommentPageListPremium.ssg";
    var param = [];

    var itemId = $("#commentItemId").val();
    var siteNo = $("#commentSiteNo").val();
    var dualzSiteNo = $("#commentDualzSiteNo").val();

    param.push({"name":"itemId", "value" :itemId});
    param.push({"name":"siteNo", "value" :siteNo});
    param.push({"name":"page", "value" :pageNo});
    param.push({"name":"dualzSiteNo", "value" :dualzSiteNo});

    $.ajax({
        type: "GET",
        url: url,
        data: param,
        dataType: "json",
        success: function(data) {
        	commentPremiumPageProgress = false;
        	
        	if (data.pageDto.totalCount == 0 || data.pageDto.totalCount == null) {
				$("#prem_comment_navi_area").hide();
				$("#cdtl_cmt_premium").hide();
			} else{
				$('#prem_cm_cnt').text(data.pageDto.totalCount);
				$("#cdtl_prem_cmt_tbody tr").remove();
								
				$('#_PremitemCommentTemplate').tmpl(data).appendTo('#cdtl_prem_cmt_tbody');
				
				// 리액트 로그 prefix 변경
				$('#cdtl_prem_cmt_tbody').find('.clickable').each(function(idx) {
					$(this).attr('data-react-Tarea', $(this).data('reactTarea').replace('vReactPrefix', itemReactPrefix));
				});
								
				fn_PageNavi(data.pageDto, $("#prem_comment_navi_area"), 'fn_GoCommentPagePremium');

				if(data.pageDto.totalCount > 10) {
					$("#prem_comment_navi_area").show();
				} else {
					$("#prem_comment_navi_area").hide();
				}
				
				$("#cdtl_cmt_premium").show();
			}
			
			if(pageNo > 1) {
				var offset = $('#cdtl_cmt_premium').offset().top;
				$(window).scrollTop(offset);
			}
        },
		error: function() {
			commentPremiumPageProgress = false;
			alert('에러');
		}
	});
}

// 상품평 리스트
var commentPageProgress = false;
function fn_GoCommentPage(page) {
	
	if(commentPageProgress) {
		return;
	}
	commentPageProgress = true;
	
	var pFilterVal = $("#commentFilterCol").val();
	var sortCol = $("#commentSort").val();
	var commentItemId = $("#commentItemId").val();
	var commentSiteNo = $("#commentSiteNo").val();
	var commentDualzSiteNo = $("#commentDualzSiteNo").val();
	var checkCnt = 0;
	
	$("#commentPage").val(page);
	var url = "/item/ajaxItemCommentList.ssg";
	var paramData = {itemId:commentItemId, siteNo:commentSiteNo, dualzSiteNo:commentDualzSiteNo, filterCol:pFilterVal, sortCol:sortCol, page:page, pageSize:"10"};

	$.ajax({
		type: "GET",
		url: url,
		data: paramData,
		dataType: "json",
		success: function (data) {
			commentPageProgress = false;
			
			if (pFilterVal == '10') {
				checkCnt = data.totalCnt;
			}
            else if (pFilterVal == '20') {
            	checkCnt = data.imgBeingCnt;
			}
			else if (pFilterVal == '30') {
				checkCnt = data.vodBeingCnt;
			}
			
			$("#cdtl_cmt_tbody tr").remove();
			
			if (checkCnt == 0 || checkCnt == null) {
				var htmlArr = [];
				htmlArr.push('<tr>');
				htmlArr.push('	<td colspan="5">');
				htmlArr.push('		<p class="cdtl_tx_nodata"><span class="cdtl_ico_notice">&nbsp;</span>등록된 상품평이 없습니다.</p>');
				htmlArr.push('	</td>');
				htmlArr.push('</tr>');
				
				$("#cdtl_cmt_tbody").append(htmlArr.join(''));
				$("#comment_navi_area").hide();
				
			} else {
				$('#_itemCommentTemplate').tmpl(data).appendTo('#cdtl_cmt_tbody');
				
				// 리액트 로그 prefix 변경
				$('#cdtl_cmt_tbody').find('.clickable').each(function(idx) {
					$(this).attr('data-react-Tarea', $(this).data('reactTarea').replace('vReactPrefix', itemReactPrefix));
				});
								
				fn_PageNavi(data.pageDto, $("#comment_navi_area"), 'fn_GoCommentPage');
				if( checkCnt >= 50000 ) {
					$('.btn_last').hide();
				} else {
					$('.btn_last').show();
				}
				$("#comment_navi_area").show();
				
				if(page > 1) {
					var offset = $('#comment_list_area').offset().top;
					$(window).scrollTop(offset);
				}
			}
			
			//상품평 리스트 카운팅 다시 셋팅 (프리미엄상품평과 분리해야 하기 때문)
			$("#gCommentTotalCnt").text(formatMoney(data.totalCnt));
			$("#gCommentImgCnt").text(formatMoney(data.imgBeingCnt));
			$("#gCommentVodCnt").text(formatMoney(data.vodBeingCnt));
			
			Waypoint.refreshAll();
			
			//내점포만보기 비로그인 상태에서 로그인 후 상품평 탭 영역으로 셋팅
			if(postionChk == false) {
				goCmtPositon = getUrlParamValue('goCmtPositon');
						
				if(goCmtPositon == 'Y') {
					fnTimer = setInterval(go_CommentHref, 2000);
				}
				postionChk = true;
			}
			
		},
		error: function () {
			//alert("에러");
			commentPageProgress = false;
		}
	});
}

function getUrlParamValue( name ) {
	var results =new RegExp('[\\?&]'+ name +'=([^&#]*)').exec(window.location.href);
	if(!results) {
		return 'N';
	}
	return results[1];
}

//내점포만보기
var commentMyStorePageProgress = false;
function fn_GoCommentMyStorePage(page) {
	if(commentMyStorePageProgress) {
		return;
	}
	
	commentMyStorePageProgress = true;
		
	var commentItemId = $("#commentItemId").val();
	var commentSiteNo = $("#commentSiteNo").val();
	var commentDualzSiteNo = $("#commentDualzSiteNo").val();
	var checkCnt = 0;
	
	$("#commentPage").val(page);
	var url = "/item/ajaxItemCommentMyStoreList.ssg";
	var paramData = {itemId:commentItemId, siteNo:commentSiteNo, dualzSiteNo:commentDualzSiteNo, page:page, pageSize:"10"};

	$.ajax({
		type: "GET",
		url: url,
		data: paramData,
		dataType: "json",
		success: function (data) {
			commentMyStorePageProgress = false;
			
			checkCnt = data.pageDto.totalCount;

			$("#cdtl_cmt_tbody tr").remove();
			
			if (checkCnt == 0 || checkCnt == null) {
				var htmlArr = [];
				htmlArr.push('<tr>');
				htmlArr.push('	<td colspan="5">');
				htmlArr.push('		<p class="cdtl_tx_nodata"><span class="cdtl_ico_notice">&nbsp;</span>등록된 상품평이 없습니다.</p>');
				htmlArr.push('	</td>');
				htmlArr.push('</tr>');
				
				$("#cdtl_cmt_tbody").append(htmlArr.join(''));
				$("#comment_navi_area").hide();
				
			} else {
				$('#_itemCommentTemplate').tmpl(data).appendTo('#cdtl_cmt_tbody');
				
				// 리액트 로그 prefix 변경
				$('#cdtl_cmt_tbody').find('.clickable').each(function(idx) {
					$(this).attr('data-react-Tarea', $(this).data('reactTarea').replace('vReactPrefix', itemReactPrefix));
				});

				fn_PageNavi(data.pageDto, $("#comment_navi_area"), 'fn_GoCommentMyStorePage');
				
				$('.btn_last').hide();
				$("#comment_navi_area").show();
				
				if(page > 1) {
					var offset = $('#comment_list_area').offset().top;
					$(window).scrollTop(offset);
				}
			}
			
			Waypoint.refreshAll();
		},
		error: function () {
			//alert("에러");
			commentMyStorePageProgress = false;
		}
	});
}

//옵션선택
function getPcCommentOptionSort(obj) {
	var sortUitemId = $(obj).val();
	$("#commentUitemId").val(sortUitemId);
	
	if(sortUitemId == 'all') {
		if($("#cmt_tabarea").hasClass("disabled_tab") === true) {
			$('#cmt_tabarea').toggleClass("disabled_tab");
		}
		fn_GoCommentPage(1);
	} else {
		if($("#cmt_tabarea").hasClass("disabled_tab") === false) {
			$('#cmt_tabarea').toggleClass("disabled_tab");
		}
		fn_GoCommentOptionPage(1);
	}
}
//상품평 옵션 selectBox 목록
var commentOptionProgress = false;
function fn_GoCommentOptionList() {
	if(commentOptionProgress) {
		return;
	}
	
	commentOptionProgress = true;
		
	var commentItemId = $("#commentItemId").val();
	var commentSiteNo = $("#commentSiteNo").val();
	var commentDualzSiteNo = $("#commentDualzSiteNo").val();

	var url = "/item/ajaxItemCommentOptionFilter.ssg";
	var paramData = {itemId:commentItemId, siteNo:commentSiteNo, dualzSiteNo:commentDualzSiteNo};

	$.ajax({
		type: "GET",
		url: url,
		data: paramData,
		dataType: "json",
		success: function (data) {
			commentOptionProgress = false;
			if(data.optionYn == 'Y') {
				
				var list = data.pageDto.resultList;
				var htmlArr = [];
				var htmlArr2 = [];
				
				for (var i = 0; i < list.length; i++) {
					htmlArr.push('<option value="'+ list[i]['uitemId'] +'">'+ list[i]['uitemNm'] +'</option>');
					htmlArr2.push('<li data-index="'+ (i+2)+'"><a href="#"><span class="txt">' + list[i]['uitemNm'] +'</span></li>');
				}
				$('#cmt_select_option_list').append(htmlArr.join(''));
				$('#cmt_select_option_list').trigger('sync.dropdown');
				$('#cmt_select_option').show();
			}
		},
		error: function () {
			commentOptionProgress = false;
		}
	});
}

//상품평 옵션 리스트
var commentOptionPageProgress = false;
function fn_GoCommentOptionPage(page) {
	
	if(commentOptionPageProgress) {
		return;
	}
	commentOptionPageProgress = true;
		
	var sortCol = $("#commentSort").val();
	var commentItemId = $("#commentItemId").val();
	var commentSiteNo = $("#commentSiteNo").val();
	var commentUitemId = $("#commentUitemId").val();
	var checkCnt = 0;
	var commentDualzSiteNo = $("#commentDualzSiteNo").val();
	
	$("#commentPage").val(page);
	var url = "/item/ajaxItemCommentOptionList.ssg";
	
	var paramData = {itemId:commentItemId, siteNo:commentSiteNo, sortCol:sortCol, uitemId:commentUitemId, dualzSiteNo:commentDualzSiteNo, page:page, pageSize:"10"};

	$.ajax({
		type: "GET",
		url: url,
		data: paramData,
		dataType: "json",
		success: function (data) {
			commentOptionPageProgress = false;
			
			checkCnt = data.pageDto.totalCount;
			
			$("#cdtl_cmt_tbody tr").remove();
			
			if (checkCnt == 0 || checkCnt == null) {
				var htmlArr = [];
				htmlArr.push('<tr>');
				htmlArr.push('	<td colspan="5">');
				htmlArr.push('		<p class="cdtl_tx_nodata"><span class="cdtl_ico_notice">&nbsp;</span>해당 옵션의 등록된 상품평이 없습니다.</p>');
				htmlArr.push('	</td>');
				htmlArr.push('</tr>');
				
				$("#cdtl_cmt_tbody").append(htmlArr.join(''));
				$("#comment_navi_area").hide();
				
			} else {
				$('#_itemCommentTemplate').tmpl(data).appendTo('#cdtl_cmt_tbody');
				
				// 리액트 로그 prefix 변경
				$('#cdtl_cmt_tbody').find('.clickable').each(function(idx) {
					$(this).attr('data-react-Tarea', $(this).data('reactTarea').replace('vReactPrefix', itemReactPrefix));
				});
								
				fn_PageNavi(data.pageDto, $("#comment_navi_area"), 'fn_GoCommentOptionPage');
				if( checkCnt >= 50000 ) {
					$('.btn_last').hide();
				} else {
					$('.btn_last').show();
				}
				$("#comment_navi_area").show();
				
				if(page > 1) {
					var offset = $('#comment_list_area').offset().top;
					$(window).scrollTop(offset);
				}
			}
			Waypoint.refreshAll();
		},
		error: function () {
			commentOptionPageProgress = false;
		}
	});
}

function go_CommentTab() {
	
	var commentDealItemBoardYn = $("#commentDealItemBoardYn").val();
	if ( typeof commentDealItemBoardYn != "undefined" && commentDealItemBoardYn != "" && commentDealItemBoardYn == 'Y' ) {
		document.location.href = "/item/dealItemView.ssg?itemId=" + resultItemObj.itemId + "&siteNo=" + resultItemObj.siteNo + "&salestrNo=" + resultItemObj.salestrNo + "&goCmtPositon=Y";
	} else {
		document.location.href = "/item/itemView.ssg?itemId=" + resultItemObj.itemId + "&siteNo=" + resultItemObj.siteNo + "&salestrNo=" + resultItemObj.salestrNo + "&goCmtPositon=Y";
	}
	
	return;
}

function go_CommentHref() {
	document.location.href = "#cdtl_ItemComment";
	clearInterval(fnTimer);
	return;
}
