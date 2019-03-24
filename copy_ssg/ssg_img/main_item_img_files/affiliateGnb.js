/**
 * 제휴사 Gnb 스크립트
 */
var isHttp = window.location.protocol.indexOf("https") < 0 ? true : false;
var isCkwhere = getCkwhereCookie();

if (isCkwhere == "shinhan") {
	document.write("<link rel=\"stylesheet\" href=\"https://allthat.shinhancard.com/common/css/partners4.css\"/ >");
	document.write("<script type=\"text/javascript\" src=\"https://allthat.shinhancard.com/common/js/partner3.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"https://allthat.shinhancard.com/alhsec/ALHFW057N/ALHFW057R01.shc?type=A011\"></script>");

} else if (isCkwhere == "shcard") {
	document.write("<link rel=\"stylesheet\" href=\"https://allthat.shinhancard.com/common/css/partners4.css\"/ >");
	document.write("<script type=\"text/javascript\" src=\"https://allthat.shinhancard.com/common/js/partner3.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"https://allthat.shinhancard.com/alhsec/ALHFW057N/ALHFW057R01.shc?type=OP\"></script>");

} else if (isCkwhere == "ssg_shinhan") {
	document.write("<link rel=\"stylesheet\" href=\"https://allthat.shinhancard.com/common/css/partners4.css\"/ >");
	document.write("<script type=\"text/javascript\" src=\"https://allthat.shinhancard.com/common/js/partner3.js\"></script>");
	document.write("<script type=\"text/javascript\" src=\"https://allthat.shinhancard.com/alhsec/ALHFW057N/ALHFW057R01.shc?type=A062\"></script>");

} else if ( isCkwhere == "kbmall" || isCkwhere == "kbcardshop" || isCkwhere == "ssg_kbcard" || isCkwhere == "kbcardshop_happy" || isCkwhere == "kbcardshop_m" ) {
	document.write("<script type=\"text/javascript\" src=\"https://lifes.kbcard.com/cxl/js/pc2018/common/js/partner_gnb_A_UTF.js\"><\/script>");

} else if (isCkwhere == "asiana" || isCkwhere == "asiana_mobile") {
	document.write("<script type=\"text/javascript\" src=\"https://flyasiana.com/C/pc/js/partnerHeader/partnerHeader_utf.js?mn=" + encodeURI('해당 쇼핑몰') + "&amp;code=EMT\"><\/script>");

} else if (isCkwhere == "asianaclub" || isCkwhere == "asianaclub_mobile") {
	document.write("<script type=\"text/javascript\" src=\"https://flyasiana.com/C/pc/js/partnerHeader/partnerHeader_utf.js?mn=" + encodeURI('해당 쇼핑몰') + "&amp;code=SSM\"><\/script>");

} else if (isCkwhere == "hyundaicard" || isCkwhere == "hcard" || isCkwhere == "ssg_hdcard") {
	var hc_header = '';
	hc_header += '<div style="width:100%;height:75px;margin:0;padding:0;font-size:11px;line-height:18px;font-family:돋움;background:#fff;">';
	hc_header += '<div style="position:relative;width:990px;height:40px;margin:0 auto;padding:15px 0 0;">';
	hc_header += '	<a href="http://www.hyundaicard.com" style="vertical-align:top;"><img src="https://www.hyundaicard.com/img/com/logo_header.gif" alt="hyundaicard" style="border:0;"/></a>';
	hc_header += '	<a href="http://mpointmall.hyundaicard.com/plusmall/main.do" style="position:absolute;right:0;top:50%;border:0;text-decoration:none;color:#424242 !important;padding:0;margin:-15px 0 0;">';
	hc_header += '		<span style="display:block;border:1px solid #d5d5d5;line-height:28px;text-align: center;vertical-align: top;padding:0 10px;letter-spacing:-1px;">M포인트 사용/추가적립 가맹점</span>';
	hc_header += '	</a>';
	hc_header += '</div>';
	hc_header += '<div style="width:100%;background:#f0f0f0;height:20px;">';
	hc_header += '	<p style="width:990px;margin:0 auto;line-height:20px;color:#424242;background:#f0f0f0;">M포인트 사용/추가적립 가맹점은 통신판매 중개자로서 상품주문/배송/환불 등 쇼핑몰 관련 의무와 책임은 해당쇼핑몰에 있습니다.</p>';
	hc_header += '</div>';
	hc_header += '</div>';
	document.write(hc_header);

} else if ( isCkwhere == "hanamall" || isCkwhere == "hanaskcard" || isCkwhere == "ssg_hanask" || isCkwhere == "hanacard" || isCkwhere == "ssg_hana" ) {
	document.write("<script type=\"text/javascript\" src=\"https://www.hanacard.co.kr/js/shopping_wa.js\" charset=\"euc-kr\"><\/script>");
}

function getCkwhereCookie() {
	var q = document.cookie;
	var key = "where";
	var value = "";

	var nameOfCookie = key + "=";
	var x = 0;
	while (x <= document.cookie.length) {
		var y = (x + nameOfCookie.length);
		if (document.cookie.substring(x, y) == nameOfCookie) {
			if ((endOfCookie = document.cookie.indexOf(";", y)) == -1) {
				endOfCookie = document.cookie.length;
			}
			value = unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(" ", x) + 1;
		if (x == 0) break;
	}

	var ckwhere_idx = value.indexOf("CK_WHERE=");
	var ckwhere = "";

	if (ckwhere_idx >= 0) {
		ckwhere = value.substr(ckwhere_idx + 9);
		var ckwhere_e_idx = ckwhere.indexOf("&");
		if (ckwhere_e_idx >= 0) {
			ckwhere = ckwhere.substr(0, ckwhere_e_idx);
		}
	}

	return ckwhere;
}
