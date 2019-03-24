/* IE6 or IE7*/
if(!window.Element){

}else{
	/* Cross Browsing for IE START */
	if(!Element.prototype.addEventListener){
		Element.prototype.addEventListener = function(e,f,s){
			if(!s){}
			e = 'on' + e;
			this.attachEvent(e, f);
		};
	}
	try{
		Event = Event || window.Event;
		Event.prototype.preventDefault = Event.prototype.preventDefault || function () {
		    this.returnValue = false;
		};
		Event.prototype.stopPropagation = Event.prototype.stopPropagation || function() {
		    this.cancelBubble = true;
		};
	}catch(e){}

	/* JSON IE6 or IE7 */
	if(!JSON){
		if(typeof JSON!=='object'){JSON={};}
		(function(){'use strict';function f(n){return n<10?'0'+n:n;}
		if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
		f(this.getUTCMonth()+1)+'-'+
		f(this.getUTCDate())+'T'+
		f(this.getUTCHours())+':'+
		f(this.getUTCMinutes())+':'+
		f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
		var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
		function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
		if(typeof rep==='function'){value=rep.call(holder,key,value);}
		switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
		gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
		v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
		if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==='string'){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
		v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
		if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
		rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
		return str('',{'':value});};}
		if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
		return reviver.call(holder,key,value);}
		text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
		('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
		if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
		throw new SyntaxError('JSON.parse');};}}());
	}

	/* Cross Browsing for IE END */
	/* Trim */
	String.prototype.trim = function(){
	    return this.replace(/(^\s*)|(\s*$)/gi, "");
	};
	/* replaceAll */
	String.prototype.replaceAll = function(target, replacement) {
	    return this.split(target).join(replacement);
	};
	/* commify */
	var commify = function(n){
	    var reg = /(^[+-]?\d+)(\d{3})/;
	    n += '';
	    while (reg.test(n))
	        n = n.replace(reg, '$1' + ',' + '$2');
	    return n;
	};
	/* get cookie */
	var getCookie = function(w){
		var cName = "";
		var pCOOKIES = new Array();
		pCOOKIES = document.cookie.split('; ');
		for(var bb = 0; bb < pCOOKIES.length; bb++){
			var NmeVal  = new Array();
			NmeVal  = pCOOKIES[bb].split('=');
			if(NmeVal[0] == w){
				cName = unescape(NmeVal[1]);
			}
		}
		return cName;
	};
	
	/* get text value */
	var textContentProp = "innerText" in document.body ? "innerText" : "textContent";
	var getTextById = function(id){
		return document.getElementById(id)[textContentProp];
	};
	var getText = function(e){
		return e[textContentProp];
	};
	
	/* class handling */
	var addClassByName = function(el, selector){
		if(el.className){
			el.className += ' ' + selector;
		}else if(el.getAttribute('class')){
			el.setAttribute('class', el.getAttribute('class') + ' ' + selector);
		}
	};
	var removeClassByName = function(el, selector){
		var check = new RegExp("(\\s|^)" + selector + "(\\s|$)");
		if(el.className){
			el.className = el.className.replace(check, " ").trim();
		}else if(el.getAttribute('class')){
			el.setAttribute('class', el.getAttribute('class').replace(check, " ").trim());
		}
	}
	var hasClassByName = function(el, selector){
		var className = " " + selector + " ";
		if(el && el.className){
			if((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1){
				return true;
			}
		}else if(el && el.getAttribute('class')){
			var elemClassName = el.getAttribute("class");
			if((" " + elemClassName + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1){
				return true;
			}
		}
		return false;
	};
	
	/* set cookie */
	var setCookie = function(name, value, expires, path, domain, secure){
		var setExpiration = function(c){
			var today = new Date();
		    var expr = new Date(today.getTime() + c * 24 * 60 * 60 * 1000);
		    return expr.toGMTString();
		};
		var setExpire 		= "";
		var setPath 		= "";
		var setDomain 	= "";
		var setSecure 	= "";
		if(expires){
			setExpire = "expires=" + setExpiration(expires) + "; ";
		}
		if(path){
			setPath = "path=" + path + "; ";
		}
		if(domain){
			setDomain = "domain=" + domain + "; " ;
		}
		if(secure){
			setSecure = "secure; ";
		}
		document.cookie = name + "=" + escape(value) + "; " + setExpire + setPath +  setDomain + setSecure;
	};
	/* call ajax */
	var callAjax = function(param){
		var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	    xmlhttp.onreadystatechange = function() {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	        	param.callback(JSON.parse(xmlhttp.responseText));
	        }
	    };
	    xmlhttp.open("GET", param.url(), true);
	    xmlhttp.send();
	};
    /* call ajax sync */
    var callAjaxSync = function(param){
        var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                param.callback(JSON.parse(xmlhttp.responseText));
            }
        };
        xmlhttp.open("GET", param.url(), false);
        xmlhttp.send();
    };
	/* call jsonp */
	var callJsonp = function(param,v){
		var fnName = 'callback' + Math.floor(Math.random() * 10000000) + '';
		var script = document.createElement("script");
		var url = param.url(v);
		if(url == ''){
			return;
		}else{
			if(v){
				if(url.indexOf('?')>-1){
					url = url + '&callback=' + fnName;
				}else{
					url = url + '?callback=' + fnName;
				}
			}else{
				url = param.url();
				if(url.indexOf('?')>-1){
					url = url + '&callback=' + fnName;
				}else{
					url = url + '?callback=' + fnName;
				}
			}
			script.charset = 'utf-8';
			script.src = url;
			script.type = 'text/javascript';
			script.async = true;
			if(typeof param.callback== 'function'){
				window[fnName] = function(data){
					param.callback(data);
					try{
						delete window[fnName];
					}catch(e){}
					window[fnName] = null;
				};
				window['callback'] = function(data){
					param.callback(data);
					try{
						delete window[fnName];
					}catch(e){}
					window[fnName] = null;
				};
			}
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};
	/* JQuery의 show() 와 동일한 기능 */
	var show = function(elements){
		if(elements){
			elements.style.display = 'block';
		}
	};
	/* JQuery의 hide() 와 동일한 기능 */
	var hide = function(elements){
		if(elements){
			elements.style.display = 'none';
		}
	};
	/* DOM의 자식여부 */
	var childOf = function(c, p){
		if(c.parentNode){
			var node = c.parentNode;
		    while (node != null) {
		        if (node == p) {
		            return true;
		        }
		        node = node.parentNode;
		    }
		    return false;
		}
	};
	/* class function */
	var appendClass = function(id,cls){
		var old = document.getElementById(id).className;
		if(old.indexOf(cls) == -1){
			if(old!=''){
				cls = ' ' + cls;
			}
			document.getElementById(id).className += cls;
		}
	};
	var removeElement = function(element) {
	    element && element.parentNode && element.parentNode.removeChild(element);
	}
	var removeClass = function(id,cls){
		var cn = document.getElementById(id).className;
		var rxp = new RegExp( "\\s?\\b" + cls + "\\b", "g" );
		cn = cn.replace( rxp, '' );
		document.getElementById(id).className = cn;
	};
	var hasClass = function(id,cls){
		var old = document.getElementById(id).className;
		if(old.indexOf(cls)>-1){
			return true;
		}else return false;
	};
	/* shrtc 검색어 직접연결 */
	var shrtc = function(_siteNo,_query,_device){
		var url ='';
		if(_query!=''){
			if(!_device)_device = '10';
			if(shrtc_keyword){
				for(var i=0;i<shrtc_keyword.length;i++){
					var item = shrtc_keyword[i];
					if(item.siteNo == _siteNo && (item.aplTgtMediaCd == '00' || item.aplTgtMediaCd == _device)){
						/* 시간체크 */
						var keywordStdTime = String(item.dispStrtDts).substring(0,8);
						var keywordEndTime = String(item.dispEndDts).substring(0,8);
						var keywordDate = new Date();
						var keyWordToday = keywordDate.getFullYear() +  ("00" + (keywordDate.getMonth() + 1)).slice(-2) + ("00"+keywordDate.getDate()).slice(-2);
						if(keyWordToday >= keywordStdTime &&  keyWordToday <= keywordEndTime){
							var critnSrchwdNm = item.critnSrchwdNm.toLowerCase();
							var query = _query.replaceAll(" ","").toLowerCase();
							if(critnSrchwdNm == query){
								url = item.linkUrl;
							}
							if(critnSrchwdNm.indexOf(",") > -1){
								var srchwdNm = critnSrchwdNm.split(",");
								for(var x=0;x<srchwdNm.length;x++){
									if(query == srchwdNm[x]){
										url =  item.linkUrl;
									}
								}
							}
						}
					}
				}
			}
		}
		return url;
	};
	/* set Element Caret Pos */
	var setCaretPosition = function(elem, caretPos){
	    var range;
	    if (elem.createTextRange) {
	        range = elem.createTextRange();
	        range.move('character', caretPos);
	        range.select();
	    } else {
	        elem.focus();
	        if (elem.selectionStart !== undefined) {
	            elem.setSelectionRange(caretPos, caretPos);
	        }
	    }
	};
	/* 자동완성 공통모듈 */
	/* mdl 에서 공통으로 호출하게되는 각 몰별 UI-SCRIPT Trigger 입니다.
	 *
	 * 필수값
	 * id      : String
	 * sub     : String
	 * ad      : String
	 * mbrkwd  : object
	 * click   : function
	 * enter   : function
	 * up      : function
	 * down    : function
	 * autocmp : function
	 * shrtc   : function
	 * */
	var acTrigger = function(trigger){
		var _id = trigger.id;
		var _o = document.getElementById(_id).value;
		var _obj = document.getElementById(_id);
		var idx = -1;
		var h_idx = 0;
		var check_ac_control = function(){
			if(settings.domain.isHttpFlag){
				var _v = document.getElementById(_id).value;
				var _s = document.getElementById(trigger.sub).value;
				if(_o!=_v && (_v==''||_s!=_v)){
	                if(_v.trim()!=''){
	                	/* 추천상품 */
	                    callJsonp(trigger.autocmp,_v);
	                    /* 자동완성 바로가기 */
	                    callJsonp(trigger.shrtc,_v);
	                    /* 태그 바로가기 */
	                    callJsonp(trigger.recomtag,_v);
	                    /* idx 초기화 */
	                    idx = -1;
	                }else{
	                	trigger.click(idx);
	                }
	            }
				_o = _v;
	            setTimeout(function(){
	                check_ac_control();
	            },200);
			}
		};

		check_ac_control();
		
		document.getElementById(_id).addEventListener('click', function(event){
			if(settings.domain.isHttpFlag){
				trigger.click();
				h_idx = 0;
				idx = -1;
			}
		}, false);
		
		document.getElementById(_id).addEventListener('keydown', function(event){
			var k = -1;
			/* NOT FF */
	        if (navigator.userAgent.search('Firefox') <= -1) {
	            k = event.keyCode;
	        }
	        /* FF */
	        else{
	            k = event.which;
	        }
	        
	        /* 13 enter, 38 up, 40 down */
	        if(k == '13' || k == '37' || k == '38' || k == '39' || k == '40'){
	            /* 키보드 이벤트 처리 */
	            if(k=='13'){
	                idx = trigger.enter(idx);
	                event.stopPropagation();
	        		event.preventDefault();
	        		return false;
	            }else if(k=='38'){
	            	if(settings.domain.isHttpFlag){
	            		var idxs = trigger.up(idx, h_idx);
	            		idx = idxs[0];
	            	}
	            }else if(k=='40'){
	            	if(settings.domain.isHttpFlag){
			            var idxs = trigger.down(idx, h_idx);
			            idx = idxs[0];
	            	}
	            }else if(k == '37'){
		            if(settings.domain.isHttpFlag){
			            var idxs = trigger.left(idx, h_idx);
			            idx = idxs[0];
			            h_idx = idxs[1];
		            }
	            }else if(k == '39'){
		            if(settings.domain.isHttpFlag){
			            var idxs = trigger.right(idx, h_idx);
			            idx = idxs[0];
			            h_idx = idxs[1];
		            }
	            }
	        }
		}, true);
	};
}
