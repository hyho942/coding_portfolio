window.onerror = function(msg, url, lineNo) {
	if ((msg.indexOf('Script error') == 0 && lineNo == 0)
			|| (msg.indexOf('checkDomStatus') != -1 && lineNo == 1)) {
		return false;
	} else if (url) {
		if (url.indexOf('/fbevents.js') != -1) {
			return false;
		}
	}
	
	var xhr = new XMLHttpRequest();
    xhr.open('GET', '/comm/ajaxOnerrorObserver.ssg?msg=' + encodeURIComponent(msg) + '&lineNo=' + encodeURIComponent(lineNo) + '&url=' + encodeURIComponent(url));
    xhr.send();
    return false;
}