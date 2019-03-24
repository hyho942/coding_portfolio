/**
 * Kakao Javascript SDK for Kakao Open Platform Service - v1.23.1
 *
 * Copyright 2017 Kakao Corp.
 *
 *
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *
 *
 * OSS Notice | KakaoSDK-Javascript
 *
 * This application is Copyright © Kakao Corp. All rights reserved.
 * The following sets forth attribution notices for third party software that may be contained in this application.
 * If you have any questions or concerns, please contact us at opensource@kakaocorp.com
 *
 *
 *  crypto-js
 *
 * https://github.com/brix/crypto-js
 *
 * Copyright 2009-2013 Jeff Mott
 * Copyright 2013-2016 Evan Vosberg
 *
 * MIT License
 *
 *
 *  easyXDM
 *
 * https://github.com/oyvindkinsey/easyXDM/
 *
 * Copyright 2009-2011 Øyvind Sean Kinsey, oyvind@kinsey.no
 *
 * MIT License
 *
 *
 *  ES6-Promise
 *
 * https://github.com/stefanpenner/es6-promise
 *
 * Copyright 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 *
 * MIT License
 *
 *
 *  Underscore
 *
 * https://github.com/jashkenas/underscore
 *
 * Copyright 2009-2017 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 *
 * MIT License
 *
 *
 *  Web2App Library
 *
 * https://github.com/kakao/web2app
 *
 * Copyright 2015 Kakao Corp. http://www.kakaocorp.com
 *
 * MIT License
 *
 *
 * ``````````
 * MIT License
 *
 * Copyright (c) <year> <copyright holders>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ``````````
 */
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){if("object"===("undefined"==typeof exports?"undefined":_typeof(exports))&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.Kakao=e()}}(function(){var e;return function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(o)return o(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return i(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(e,t){function n(){throw new Error("setTimeout has not been defined")}function r(){throw new Error("clearTimeout has not been defined")}function i(e){if(l===setTimeout)return setTimeout(e,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(e,0);try{return l(e,0)}catch(t){try{return l.call(null,e,0)}catch(t){return l.call(this,e,0)}}}function o(e){if(p===clearTimeout)return clearTimeout(e);if((p===r||!p)&&clearTimeout)return p=clearTimeout,clearTimeout(e);try{return p(e)}catch(t){try{return p.call(null,e)}catch(t){return p.call(this,e)}}}function a(){h&&f&&(h=!1,f.length?m=f.concat(m):g=-1,m.length&&s())}function s(){if(!h){var e=i(a);h=!0;for(var t=m.length;t;){for(f=m,m=[];++g<t;)f&&f[g].run();g=-1,t=m.length}f=null,h=!1,o(e)}}function c(e,t){this.fun=e,this.array=t}function u(){}var l,p,d=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(e){l=n}try{p="function"==typeof clearTimeout?clearTimeout:r}catch(e){p=r}}();var f,m=[],h=!1,g=-1;d.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];m.push(new c(e,t)),1!==m.length||h||i(s)},c.prototype.run=function(){this.fun.apply(null,this.array)},d.title="browser",d.browser=!0,d.env={},d.argv=[],d.version="",d.versions={},d.on=u,d.addListener=u,d.once=u,d.off=u,d.removeListener=u,d.removeAllListeners=u,d.emit=u,d.binding=function(){throw new Error("process.binding is not supported")},d.cwd=function(){return"/"},d.chdir=function(){throw new Error("process.chdir is not supported")},d.umask=function(){return 0}},{}],2:[function(e,t){t.exports=function(){function t(){return"Bearer "+r.getAccessToken()}function n(){return"KakaoAK "+r.getAppKey()}var r=e("./auth.js");return{accessToken:t,appKey:n,tokenOrKey:r.getAccessToken()?t:n}}()},{"./auth.js":4}],3:[function(e,t){t.exports=function(){function t(){return a||(a=u.guardCreateEasyXDM(function(){return new s.Rpc({remote:u.URL.apiRemote},{remote:{request:{}}})})),a}function n(e){return"/v1/api/story/upload/multi"===e||"/v2/api/talk/message/image/upload"===e}function r(e){if(!c.isString(e))return!1;if(0===e.length||e.length>2048)throw new u.KakaoError("content length should be between 0 and 2048");return!0}function i(e){return c.isArray(e)?c.every(e,function(e){if(!c.isString(e))return!1;if(c.isURL(e))throw new u.KakaoError("url in image_url_list should be a kage url, obtained from '/v1/api/story/upload/multi'.");return!0}):!1}var o={};e("../vendor/es6-promise.js");var a,s=e("../vendor/easyXDM.js"),c=e("./util.js"),u=e("./common.js"),l=e("./api.authType");o.request=function(e){function r(){var t={};c.each(e.data,function(e,n){t[n]=c.isString(e)?e:JSON.stringify(e)});var r={url:a,method:f.api[a].method,headers:{KA:u.KAKAO_AGENT},data:t},o=f.api[a].authType||l.accessToken;return r.headers.Authorization=o(),new Promise(function(t,o){if(n(a)){if(!e.files&&!e.data.file)throw new u.KakaoError("'files' parameter should be set for "+a);i(e.files||e.data.file).then(function(e){r.file=e,t(r)},function(e){o(e)})}else t(r)})}function i(e){return new Promise(function(t,n){var r=c.map(e,function(e){return u.serializeFile(e).then(function(t){return{name:e.name,type:e.type,str:t}})});Promise.all(r).then(function(e){t({paramName:"file",data:e})},function(e){n(e)})})}function o(e){try{u.logDebug(e);var t=e.message;return JSON.parse(t.responseText)}catch(n){return{code:-777,msg:"Unknown error"}}}e=u.processRules(e,f.request,"API.request");var a=e.url,s=f.api[a].data;return s&&(e.data=u.processRules(e.data,f.api[a].data,"API.request - "+a)),new Promise(function(n,i){r().then(function(r){t().request(r,function(t){e.success(t),e.always(t),n(t)},function(t){var n=o(t);e.fail(n),e.always(n),i(n)})},function(e){i(e)})})},o.createAPIAlias=function(e){return function(t){return t=t||{},c.defaults(t,e),o.request(t)}};var p={permission:c.isOneOf(["A","F","M"]),enable_share:c.isBoolean,android_exec_param:c.isString,ios_exec_param:c.isString,android_market_param:c.isString,ios_market_param:c.isString},d={secure_resource:c.isBoolean},f={request:{required:{url:function(e){return c.isOneOf(c.keys(f.api))(e)}},optional:{data:c.isObject,files:function(e){return c.passesOneOf([c.isArray,c.isFileList])(e)&&c.every(e,c.passesOneOf([c.isFile,c.isBlob]))},file:c.isFile,success:c.isFunction,fail:c.isFunction,always:c.isFunction},defaults:{data:{},success:c.emptyFunc,fail:c.emptyFunc,always:c.emptyFunc}},api:{"/v1/user/signup":{method:"post",data:{optional:{properties:c.isObject}}},"/v1/user/unlink":{method:"post"},"/v1/user/me":{method:"post",data:{optional:c.extend({propertyKeys:c.isArray},d)}},"/v2/user/me":{method:"get",data:{optional:c.extend({property_keys:c.isArray},d)}},"/v1/user/logout":{method:"post",data:{}},"/v1/user/update_profile":{method:"post",data:{required:{properties:c.isObject}}},"/v1/api/talk/profile":{method:"get",data:{optional:d}},"/v1/api/talk/memo/send":{method:"post",data:{required:{template_id:c.passesOneOf([c.isNumber,c.isString])},optional:{args:c.isString}}},"/v2/api/talk/memo/send":{method:"post",data:{required:{template_id:c.isNumber},optional:{args:c.isString}}},"/v2/api/talk/memo/scrap/send":{method:"post",data:{required:{request_url:c.isString},optional:{template_id:c.isNumber,template_args:c.isObject}}},"/v2/api/talk/memo/default/send":{method:"post",data:{required:{template_object:c.isObject}}},"/v1/api/story/profile":{method:"get",data:{optional:d}},"/v1/api/story/isstoryuser":{method:"get"},"/v1/api/story/mystory":{method:"get",data:{required:{id:c.isString}}},"/v1/api/story/mystories":{method:"get",data:{optional:{last_id:c.isString}}},"/v1/api/story/linkinfo":{method:"get",data:{required:{url:c.isString}}},"/v1/api/story/post/note":{method:"post",data:{required:{content:r},optional:p}},"/v1/api/story/post/photo":{method:"post",data:{required:{image_url_list:i},optional:c.extend({content:r},p)}},"/v1/api/story/post/link":{method:"post",data:{required:{link_info:c.isObject},optional:c.extend({content:r},p)}},"/v1/api/story/upload/multi":{method:"post",data:{}},"/v1/emoticon/my_items":{method:"get",data:{},authType:l.appKey},"/v1/emoticon/item_resources":{method:"get",data:{required:{id:c.isString}},authType:l.appKey},"/v1/api/story/delete/mystory":{method:"delete",data:{required:{id:c.isString}}},"/v2/emoticon/items":{method:"get",authType:l.tokenOrKey},"/v2/emoticon/item":{method:"get",data:{required:{id:c.passesOneOf([c.isNumber,c.isString])}},authType:l.tokenOrKey},"/v2/emoticon/item_resources":{method:"get",authType:l.tokenOrKey},"/v2/emoticon/item_resource":{method:"get",data:{required:{id:c.passesOneOf([c.isNumber,c.isString])}},authType:l.tokenOrKey},"/v1/s2/publish":{method:"post",data:{required:{timestamp:c.isNumber,from:c.isString,to:c.isString,action:c.isString},defaults:function(){return{timestamp:(new Date).getTime()}},optional:{props:c.isObject},after:function(e){if(JSON.stringify(e).length>9e4)throw new u.KakaoError("Event's length is over 90000 bytes.")}},authType:l.appKey},"/v2/api/kakaolink/talk/template/validate":{method:"get",data:{required:{link_ver:c.isString,template_id:c.isNumber},optional:{template_args:c.isObject}},authType:l.appKey},"/v2/api/kakaolink/talk/template/scrap":{method:"get",data:{required:{link_ver:c.isString,request_url:c.isString},optional:{template_id:c.isNumber,template_args:c.isObject}},authType:l.appKey},"/v2/api/kakaolink/talk/template/default":{method:"get",data:{required:{link_ver:c.isString,template_object:c.isObject}},authType:l.appKey},"/v1/user/access_token_info":{method:"get",data:{}},"/v2/api/talk/message/image/upload":{method:"post",data:{required:{file:c.isObject}},authType:l.appKey},"/v2/api/talk/message/image/delete":{method:"delete",data:{required:{image_url:c.isString}},authType:l.appKey},"/v2/api/talk/message/image/scrap":{method:"post",data:{required:{image_url:c.isString}},authType:l.appKey},"/v1/friends":{method:"get",data:{optional:c.extend({offset:c.isNumber,limit:c.isNumber,order:c.isString},d)}}}};return o.cleanup=function(){a&&(a.destroy(),a=null)},o}()},{"../vendor/easyXDM.js":22,"../vendor/es6-promise.js":23,"./api.authType":2,"./common.js":8,"./util.js":19}],4:[function(e,t){t.exports=function(){function t(e,t){function n(){var n=_.extend({redirect_uri:"kakaojs",response_type:"code",state:t,ka:S.KAKAO_AGENT,origin:window.location.origin,disable_approval_window:"true"},p(e));return S.URL.authorize+"?"+_.buildQueryString(n)}return n()}function n(){L&&L.close&&L.close()}function r(e,t){if(!U){if(U=a({},function(t){t.status?"ok"==t.status&&(n(),O.stop(),U.getAccessToken(t.code,S.RUNTIME.appKey,S.URL.talkLoginRedirectUri,e.approvalType)):c(t,e)}),S.UA.os.android){var r;!function(){var n=function i(t){if(/\.kakao\.com$/.test(t.origin)&&t.data&&t.data.substring(0,r.length)===r){var n=t.data.split(" ");if("postResponse"===n[1]){var o=JSON.parse(decodeURIComponent(n[2]));c(o,e),_.removeEvent(window,"message",i),U=null}else"browser_fallback_url_data"===n[1]&&L.postMessage([r,"browser_fallback_url_data",encodeURIComponent(S.KAKAO_AGENT),location.host].join(" "),S.URL.authDomain)}};_.addEvent(window,"message",n),r="postProxy"+t,E.push(function(){_.removeEvent(window,"message",n)})}()}E.push(function(){U.destroy(),U=null})}var o=i(e,t),s=p(e);L=x.login(t,o,s),O.start(function(){t&&U.getCode(t,S.RUNTIME.appKey)},function(){c({error:"timeout",description:"Account login timed out. Please log in again.",error_description:"Account login timed out. Please log in again."},e),S.windowOpen(o,j,I)}),O.setStopCondition(function(){return x.hasWebLoginWindow()})}function i(e,t){function n(){var n=_.extend({redirect_uri:"kakaojs",response_type:"code",state:t,proxy:"easyXDM_Kakao_"+K.channel+"_provider",ka:S.KAKAO_AGENT,origin:window.location.origin},p(e));return S.URL.authorize+"?"+_.buildQueryString(n)}return K||(K=a({},function(e){O.stop();var t=s(e,F);c(e,t)}),E.push(function(){K.destroy(),K=null})),F[t]=e,n()}function o(e){function t(n){if(/\.kakao\.com$/.test(n.origin)&&n.data){var r=n.data.split(" ");if("postResponse"===r[1]){var i=JSON.parse(decodeURIComponent(r[2]));c(i,e),_.removeEvent(window,"message",t)}}E.push(function(){_.removeEvent(window,"message",t)})}_.addEvent(window,"message",t)}function a(e,t){return _.extend(e,{remote:S.URL.loginWidget,channel:_.getRandomString()}),S.guardCreateEasyXDM(function(){var n=new w.Rpc(e,{local:{postResponse:t,getKakaoAgent:function(){return S.KAKAO_AGENT}},remote:{getCode:{},getAccessToken:{},setClient:{},setStateToken:{},deleteAuthCookie:{}}});return n.channel=e.channel,n})}function s(e,t){if(!_.has(t,e.stateToken))throw new S.KakaoError("security error: #CST2");var n=t[e.stateToken];return delete t[e.stateToken],delete e.stateToken,n}function c(e,t){e.error?u(e):(k.setAccessToken(e.access_token,t.persistAccessToken),T.dispatch("LOGIN")),l(e,t)}function u(e){var t="access_denied";e.error!=t&&k.setAccessToken(null)}function l(e,t){S.logDebug(e),e.error?(t.fail(e),t.always(e)):(t.success(e),t.always(e))}function p(e){var t={client_id:S.RUNTIME.appKey};return e.approvalType&&(t.approval_type=e.approvalType),e.scope&&(t.scope=e.scope),t}function d(e,t){var n=v(t,S.RUNTIME.appKey);_.localStorage.setItem(e,n)}function f(e){var t=_.localStorage.getItem(e);return t?y(t,S.RUNTIME.appKey):null}function m(e){_.localStorage.removeItem(e)}function h(){return q.accessTokenKey||(q.accessTokenKey="kakao_"+g("kat"+S.RUNTIME.appKey)),q.accessTokenKey}function g(e){var t=b.MD5(e);return t.toString()}function v(e,t){var n=b.AES.encrypt(e,t);return n.toString()}function y(e,t){var n=b.AES.decrypt(e,t);return n.toString(b.enc.Utf8)}var k={},w=e("../vendor/easyXDM.js"),b=e("../vendor/CryptoJS.js"),_=e("./util.js"),S=e("./common.js"),x=e("./auth.withTalk.js"),O=e("./auth.withTalk.poller.js"),T=e("./common/everntObserver"),A=e("./webviewchecker.js")(),E=[],j="_blank",R="kakaostory_channel_select",I="width=380, height=520, scrollbars=yes";k.createLoginButton=function(e){function t(e){if(e.stateToken!==o)throw new S.KakaoError("security error: #CST");return delete e.stateToken,e}function n(){o=_.getRandomString(),s.setStateToken(o)}function r(){var t=p(e);s.setClient(e.lang,e.size,t,function(e){var t=i.getElementsByTagName("iframe")[0];t.style.width=e.width+"px",t.style.height=e.height+"px"})}e=S.processRules(e,D.createLoginButton,"Auth.createLoginButton");var i=_.getElement(e.container);if(!i)throw new S.KakaoError("container is required for Kakao login button: pass in element or id");var o="",s=a({container:i},function(r){t(r),c(r,e),n()});n(),r(),E.push(function(){s.destroy(),s=null})};var F={};k.login=function(e){e=S.processRules(e,D.login,"Auth.login");var t=_.getRandomString()+_.getRandomString();if(x.isSupport()&&e.throughTalk)r(e,t);else{S.UA.browser.msie&&parseInt(S.UA.browser.version.major)<=9||o(e,t);var n=i(e,t);S.windowOpen(n,j,I)}T.dispatch("LOGIN_START")},k.autoLogin=function(e){if(A.isIOSKakaoTalkWebView()||A.isAndroidKakaoTalkWebView()){e=S.processRules(e,D.autoLogin,"Auth.autoLogin");var n=_.getRandomString()+_.getRandomString();o(e,n),S.windowOpen(t(e,n),j,I)}else{var r={error:"disable_approval_window",error_description:"Auto-login is only supported by KakaoTalk InAppBrowser.",stateToken:""};l(r,e)}};var U,L,K,B,N={};k.selectStoryChannel=function(e){function t(){var t=_.extend({state:n,proxy:"easyXDM_Kakao_"+B.channel+"_provider",token:e.extendedToken||""},p(e));return S.URL.storyChannel+"?"+_.buildQueryString(t)}e=S.processRules(e,D.selectStoryChannel,"Auth.selectStoryChannel"),B||(B=a({},function(e){var t=s(e,N);l(e,t)}),E.push(function(){B.destroy(),B=null}));var n=_.getRandomString();N[n]=e,window.open(t(),R,I)};var C={success:_.emptyFunc,fail:_.emptyFunc,always:_.emptyFunc},M=_.extend({throughTalk:!0,persistAccessToken:!0,persistRefreshToken:!1},C),P={success:_.isFunction,fail:_.isFunction,always:_.isFunction,persistAccessToken:_.isBoolean,persistRefreshToken:_.isBoolean,approvalType:_.isOneOf(["project"]),scope:_.isString,throughTalk:_.isBoolean},D={createLoginButton:{required:{container:_.passesOneOf([_.isElement,_.isString])},optional:_.extend({lang:_.isOneOf(["en","kr"]),size:_.isOneOf(["small","medium","large"])},P),defaults:_.extend({lang:"kr",size:"medium"},M)},login:{optional:P,defaults:M},autoLogin:{optional:{success:_.isFunction,fail:_.isFunction,always:_.isFunction}},selectStoryChannel:{optional:{extendedToken:_.isString,success:_.isFunction,fail:_.isFunction,always:_.isFunction},defaults:C}};k.logout=function(e){e=e||_.emptyFunc,S.validate(e,_.isFunction,"Auth.logout"),Kakao.API.request({url:"/v1/user/logout",always:function(){k.setAccessToken(null),T.dispatch("LOGOUT"),e(!0)}})},k.loginForm=function(e){e=S.processRules(e,D.login,"Auth.loginForm");var t=_.getRandomString()+_.getRandomString(),n=S.URL.loginForm+"?continue="+encodeURIComponent(i(e,t));S.windowOpen(n,j,I)},k.setAccessToken=function(e,t){S.RUNTIME.accessToken=e,null===e||t===!1?m(h()):d(h(),e)},k.setRefreshToken=function(){console.log("unsupported operation: setRefreshToken()")},k.getAccessToken=function(){return S.RUNTIME.accessToken||(S.RUNTIME.accessToken=f(h())),S.RUNTIME.accessToken},k.getRefreshToken=function(){return console.log("unsupported operation: getRefreshToken()"),""};var q={};return k.getAppKey=function(){return S.RUNTIME.appKey},k.getStatus=function(e){S.validate(e,_.isFunction,"Auth.getStatus"),k.getAccessToken()?Kakao.API.request({url:"/v1/user/me",success:function(t){e({status:"connected",user:t})},fail:function(){e({status:"not_connected"})}}):e({status:"not_connected"})},k.getStatusInfo=function(e){S.validate(e,_.isFunction,"Auth.getConnectionInfo"),k.getAccessToken()?Kakao.API.request({url:"/v2/user/me",success:function(t){e({status:"connected",user:t})},fail:function(){e({status:"not_connected"})}}):e({status:"not_connected"})},k.cleanup=function(){_.each(E,function(e){e()}),E.length=0},k}()},{"../vendor/CryptoJS.js":21,"../vendor/easyXDM.js":22,"./auth.withTalk.js":5,"./auth.withTalk.poller.js":6,"./common.js":8,"./common/everntObserver":10,"./util.js":19,"./webviewchecker.js":20}],5:[function(e,t){t.exports=function(){function t(e,t){return t.state=e,[i.URL.talkLoginScheme,"?","client_id="+i.RUNTIME.appKey,"&","redirect_uri="+encodeURIComponent(i.URL.talkLoginRedirectUri),"&","params="+encodeURIComponent(JSON.stringify(t))].join("")}function n(e,t,n){return["intent:#Intent","action=com.kakao.talk.intent.action.CAPRI_LOGGED_IN_ACTIVITY","launchFlags=0x14008000","S.com.kakao.sdk.talk.appKey="+i.RUNTIME.appKey,"S.com.kakao.sdk.talk.redirectUri="+i.URL.talkLoginRedirectUri,"S.com.kakao.sdk.talk.state="+e,"S.com.kakao.sdk.talk.extraparams="+encodeURIComponent(JSON.stringify(n)),"S.browser_fallback_url="+encodeURIComponent(t),"end;"].join(";")}var r,i=e("./common.js"),o="_blank",a="width=380, height=520, scrollbars=yes",s=/Version\/4.0/i.test(i.UA.ua)||/; wv\)/i.test(i.UA.ua),c=/naver\(inapp|fb_iab|daumapps/g.test(i.UA.ua);return{isSupport:function(){var e=9,t=30;return i.UA.os.ios?/safari/.test(i.UA.ua)&&!/FxiOS/i.test(i.UA.ua)&&!/CriOS/i.test(i.UA.ua)&&i.UA.browser.version.major>=e:i.UA.os.android?i.UA.browser.chrome&&!/opr\//i.test(i.UA.ua)&&i.UA.browser.version.major>=t&&(!s||s&&c):!1},login:function(e,c,u){function l(){var e=40;return i.UA.browser.version.major>e}function p(){setTimeout(function(){r&&r.location&&(r.location.href=c)},10)}if(this.isSupport()){if(i.UA.os.ios){var d=t(e,u);r=i.windowOpen(i.URL.universalKakaoLink+encodeURIComponent(d)+"&web="+encodeURIComponent(c),o,a)}else if(i.UA.os.android){var f=n(e,c,u);l()&&!s?r=i.windowOpen(f,o,a):(r=i.windowOpen("",o,a),r&&(r.addEventListener("unload",p),r.location.href=f))}return r}},hasWebLoginWindow:function(){try{return r&&r.location&&"about:blank"!=r.location.href?i.UA.os.android?!!r.location.href:!0:!1}catch(e){return!0}}}}()},{"./common.js":8}],6:[function(e,t){t.exports=function(){function e(){return c()?(t(),void 0):(++r>o?(t(),a()):s(),void 0)}function t(){clearInterval(n)}var n,r=0,i=1e3,o=600,a=function(){},s=function(){},c=function(){return!1};return{start:function(o,c){r=0,"function"==typeof o&&(s=o),"function"==typeof c&&(a=c),n&&t(),n=setInterval(e,i)},stop:function(){t()},setStopCondition:function(e){"function"==typeof e&&(c=e)}}}()},{}],7:[function(e,t){t.exports=function(){var t=e("../vendor/userAgent.js");return{getOrigin:function(){return location.protocol+"//"+location.hostname+(location.port?":"+location.port:"")},getNavigator:function(){return navigator},getUA:function(){return t()}}}()},{"../vendor/userAgent.js":24}],8:[function(e,t){t.exports=function(){var t={},n=e("./util.js"),r=e("./browserProxy.js"),i=r.getOrigin();t.VERSION="1.23.1",t.KAKAO_AGENT="sdk/"+t.VERSION+" os/javascript lang/"+(r.getNavigator().userLanguage||r.getNavigator().language)+" device/"+r.getNavigator().platform.replace(/ /g,"_")+" origin/"+encodeURIComponent(i),t.URL={authorize:"https://kauth.kakao.com/oauth/authorize",loginWidget:"https://kauth.kakao.com/public/widget/login/kakaoLoginWidget.html",apiRemote:"https://kapi.kakao.com/cors/",storyChannel:"https://kauth.kakao.com/story/select_channel",storyShare:"https://story.kakao.com/s/share",channelFollow:"https://story.kakao.com/s/follow",storyIcon:"//dev.kakao.com/sdk/js/resources/story/icon_small.png",universalKakaoLink:"https://talk-apps.kakao.com/scheme/",talkLoginScheme:"kakaokompassauth://authorize",talkLoginRedirectUri:"https://kapi.kakao.com/cors/afterlogin.html",authDomain:"https://kauth.kakao.com",navi:"kakaonavi-sdk://navigate",naviShare:"kakaonavi-sdk://sharePoi",naviWeb:"https://kakaonavi-wguide.kakao.com/openapi",loginForm:"https://accounts.kakao.com/login",sharerDomain:"https://sharer.kakao.com",stat:"https://apps.kakao.com/sdk/js"},t.RUNTIME={appKey:"",accessToken:""},t.DUMMY_KEY="YOUR APP KEY",t.UA=r.getUA();var o=function(e){Error.prototype.constructor.apply(this,arguments),this.name="KakaoError",this.message=e};return o.prototype=new Error,t.KakaoError=o,t.isDebug=function(){return!1},t.logDebug=function(e){t.isDebug()&&window.console&&console.log(JSON.stringify(e))},t.validate=function(e,t,n){if(t(e)!==!0)throw new o("Illegal argument for "+n)},t.processRules=function(e,r,i){e=e||{},r.before&&r.before(e),n.isFunction(r.defaults)?n.defaults(e,r.defaults(e)):n.defaults(e,r.defaults);var a=r.required||{},s=n.difference(n.keys(a),n.keys(e));if(s.length)throw new o("Missing required keys: "+s.join(",")+" at "+i);var c=r.optional||{},u=n.extend({},a,c),l=n.difference(n.keys(e),n.keys(u));if(l.length)throw new o("Invalid parameter keys: "+l.join(",")+" at "+i);return n.each(e,function(e,n){var r=u[n];t.validate(e,r,'"'+n+'" in '+i)}),r.after&&r.after(e),e},t.getInstallUrl=function(e,n){if(t.UA.os.android){var r={appkey:t.RUNTIME.appKey,KA:t.KAKAO_AGENT};return"market://details?id="+e+"&referrer="+JSON.stringify(r)}return t.UA.os.ios?"https://itunes.apple.com/app/id"+n:location.href},t.isRetinaDisplay=function(){var e="(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)";return window.devicePixelRatio>1?!0:window.matchMedia&&window.matchMedia(e).matches?!0:!1},t.createHiddenIframe=function(e,t){var n=document.getElementById(e);return null!==n&&n.parentNode.removeChild(n),n=document.createElement("iframe"),n.id=e,n.style.border="none",n.style.display="none",n.style.width="0px",n.style.height="0px",n.src=t,n},t.guardCreateEasyXDM=function(e){try{return e()}catch(t){throw t instanceof TypeError?new o("kakao.js should be loaded from a web server"):new o("EasyXDM -"+t.message)}},t.serializeFile=function(e){return new Promise(function(t,r){"undefined"==typeof FileReader&&r(new o("File API is not supported for this browser."));var i=new FileReader;i.onload=function(e){try{t(n.arrayBufferToString(e.target.result))}catch(e){r(e)}},i.onerror=function(){r(new o("Cannot read file: "+e.name))},i.readAsArrayBuffer(e)})},t.popupWindows={},t.windowOpen=function(e,n,r){var i=t.popupWindows[n];return i&&i.close&&!i.closed&&i.close(),t.popupWindows[n]=window.open(e,n,r),t.popupWindows[n]},t}()},{"./browserProxy.js":7,"./util.js":19}],9:[function(e,t){t.exports=function(){var e=function(e){Error.prototype.constructor.apply(this,arguments),this.name="KakaoError",this.message=e};return e.prototype=new Error,e}()},{}],10:[function(e,t){t.exports=function(){var t=e("../util"),n={};return{subscribe:function(e,t){n[e]||(n[e]=[]),n[e].push(t)},unsubscribe:function(e,t){for(var r=n[e],i=0;i<l.length;i++)if(r[m]===t){r.splice(m,1);break}},dispatch:function(e){var r=n[e];r&&r.length&&t.each(r,function(e){e()})}}}()},{"../util":19}],11:[function(e,t){t.exports=function(t,n,r){var i=e("../util.js"),o=e("./KakaoError"),a=e("./validate");t=t||{},n.before&&n.before(t),i.isFunction(n.defaults)?i.defaults(t,n.defaults(t)):i.defaults(t,n.defaults);var s=n.required||{},c=i.difference(i.keys(s),i.keys(t));if(c.length)throw new o("Missing required keys: "+c.join(",")+" at "+r);var u=n.optional||{},l=i.extend({},s,u),p=i.difference(i.keys(t),i.keys(l));if(p.length)throw new o("Invalid parameter keys: "+p.join(",")+" at "+r);return i.each(t,function(e,t){var n=l[t];a(e,n,'"'+t+'" in '+r)}),n.after&&n.after(t),t}},{"../util.js":19,"./KakaoError":9,"./validate":12}],12:[function(e,t){t.exports=function(t,n,r){var i=e("./KakaoError");if(n(t)!==!0)throw new i("Illegal argument for "+r)}},{"./KakaoError":9}],13:[function(e,t){t.exports=function(){var t={},n=e("./util.js"),r=e("./api.js"),i=(e("./common/everntObserver"),[]);return t.getMyItems=r.createAPIAlias({url:"/v1/emoticon/my_items"}),t.getItemResources=r.createAPIAlias({url:"/v1/emoticon/item_resources",data:{}}),t.cleanup=function(){n.each(i,function(e){e()}),i.length=0},t}()},{"./api.js":3,"./common/everntObserver":10,"./util.js":19}],14:[function(e,t){t.exports=function(){function t(e,t,n){var r=g.getElement(t.container);if(!r)throw new y.KakaoError("container is required for KakaoTalk Link: pass in element or id");var o=function(r){return r.preventDefault(),r.stopPropagation(),i(e,t,n),!1};g.addEvent(r,"click",o),j.push(function(){g.removeEvent(r,"click",o)})}function n(e,t,n,r){var i=y.windowOpen("",n,t),o=document.createElement("form");o.setAttribute("method","post"),o.setAttribute("action",e),o.setAttribute("target",n),o.setAttribute("style","display:none");for(var a in r)if(r.hasOwnProperty(a)){var s=document.createElement("input");s.type="hidden",s.name=a,s.value=g.isString(r[a])?r[a]:JSON.stringify(r[a]),o.appendChild(s)}return document.body.appendChild(o),o.submit(),document.body.removeChild(o),i.focus(),i}function r(e,t){function r(t){"sent"===t.data&&t.origin===y.URL.sharerDomain&&e.callback()}var i;switch(t){case"custom":i=T(e);break;case"default":i=O(e);break;case"scrap":i=A(e);break;default:throw new y.KakaoError("type is required for KakaoTalk Link")}var o,a={app_key:y.RUNTIME.appKey,validation_action:t,validation_params:JSON.stringify(i),ka:y.KAKAO_AGENT},s=y.URL.sharerDomain+"/talk/friends/picker/easylink?app_key="+a.app_key+"&ka="+encodeURIComponent(a.ka)+"&validation_action="+a.validation_action+"&validation_params="+encodeURIComponent(a.validation_params),c="kakao_link_web_sharer",u="location=no,resizable=no,status=no,scrollbars=no,width=460,height=608";s.length<2084?(o=y.windowOpen(s,c,u),o.focus()):o=n(y.URL.sharerDomain+"/talk/friends/picker/link",u,c,a);var l=setInterval(function(){o.closed&&(clearInterval(l),g.removeEvent(window,"message",r))},1e3);g.addEvent(window,"message",r),j.push(function(){g.removeEvent(window,"message",r)})}function i(e,t,n){return _.os.android&&((new Image).src=y.URL.stat),"mobile"!=_.platform&&r(t,n),e(t).then(function(e){var n=new x;n.extras=g.extend(n.extras,t.extras),n.template_json=e.template_msg,n.template_args=e.template_args,n.template_id=e.template_id;var r=F+"://send?"+g.buildQueryString(n);if(r.length>1e4)throw new y.KakaoError("Failed to send message because it exceeds the message size limit. Please contact the app administrator.");"mobile"==_.platform&&d(r,t.fail,t.installTalk);var i={template_msg:e.template_msg||{},warning_msg:e.warning_msg||{},argument_msg:e.argument_msg||{}};return t.success(i),i},function(e){t.fail(e)})}function o(e){return v.request({url:"/v2/api/talk/message/image/upload",data:{file:e.file}})}function a(e){return v.request({url:"/v2/api/talk/message/image/delete",data:{image_url:e.imageUrl}})}function s(e){return v.request({url:"/v2/api/talk/message/image/scrap",data:{image_url:e.imageUrl}})}function c(e,t){var n=new S;return n.forwardable=e.forwardable,n.extras=g.extend(n.extras,e.extras),g.each(e,function(e,r){var i=b.create(e,r,t);i&&n.objs.push(i)}),F+"://send?"+g.buildQueryString(n)}function u(e){return v.request({url:"/v2/api/kakaolink/talk/template/validate",data:T(e)})}function l(e){return v.request({url:"/v2/api/kakaolink/talk/template/scrap",data:A(e)})}function p(e){return v.request({url:"/v2/api/kakaolink/talk/template/default",data:O(e)})}function d(e,t,n){var r={urlScheme:e,intentURI:"intent:"+e+"#Intent;package=com.kakao.talk;launchFlags=0x14008000;end;",appName:"KakaoTalk",storeURL:y.getInstallUrl(f,m),onUnsupportedEnvironment:function(){t(e)}};(!n||w.isIOSKakaoTalkWebView()||w.isAndroidWebView())&&(r.onAppMissing=g.emptyFunc),w.isIOSKakaoTalkWebView()&&(r.universalLink=void 0);try{k(r)}catch(i){console.log(i)}}var f="com.kakao.talk",m="362057947",h={},g=e("./util.js"),v=e("./api.js"),y=e("./common.js"),k=e("../vendor/web2app.js"),w=e("./webviewchecker.js")(),b=e("./link.obj.js"),_=e("../vendor/userAgent.js")(),S=function(){this.appkey=y.RUNTIME.appKey,this.appver="1.0",this.apiver="3.0",this.linkver="3.5",this.extras={KA:y.KAKAO_AGENT},this.objs=[]},x=function(){this.appkey=y.RUNTIME.appKey,this.appver="1.0",this.linkver="4.0",this.template_json={},this.template_args={},this.template_id="",this.extras={KA:y.KAKAO_AGENT}},O=function(e){var t={};return t.object_type=e.objectType,t.button_title=e.buttonTitle||"",g.each(e,function(e,n){var r=b.create(e,n,"defaultObject");t&&(t[n]=r)}),"list"==t.object_type&&(t.header_title=e.headerTitle||"",e.headerImageUrl&&(t.header_image_url=e.headerImageUrl),e.headerImageWidth&&(t.header_image_width=e.headerImageWidth),e.headerImageHeight&&(t.header_image_height=e.headerImageHeight),t.header_link=t.headerLink||{},delete t.headerLink),"location"==t.object_type&&(t.address=e.address||"",t.address_title=e.addressTitle||""),"text"==t.object_type&&(t.text=e.text||""),{link_ver:"4.0",template_object:t}},T=function(e){return{link_ver:"4.0",template_id:e.templateId,template_args:e.templateArgs}},A=function(e){var t={link_ver:"4.0",request_url:e.requestUrl};return e.templateId&&(t.template_id=e.templateId),e.templateArgs&&(t.template_args=e.templateArgs),t},E={custom:"custom",defaultType:"default",scrap:"scrap"},j=[];h.createTalkLink=h.createTalkLinkButton=function(e){e=y.processRules(e,I.createTalkLink,"Link.createTalkLink");var t=g.getElement(e.container);if(!t)throw new y.KakaoError("container is required for KakaoTalk Link: pass in element or id");var n=function(){var t=c(e,"Link.createTalkLink");d(t,e.fail,e.installTalk)};g.addEvent(t,"click",n),j.push(function(){g.removeEvent(t,"click",n)})},h.sendTalkLink=function(e){e=y.processRules(e,I.talkLink,"Link.sendTalkLink");var t=c(e,"Link.sendTalkLink");d(t,e.fail,e.installTalk)},h.createCustom=h.createCustomButton=function(e){e=y.processRules(e,I.createCustom,"Link.createCustom"),t(u,e,E.custom)},h.createScrap=h.createScrapButton=function(e){e=y.processRules(e,I.createScrap,"Link.createScrap"),t(l,e,E.scrap)},h.createDefault=h.createDefaultButton=function(e){e="list"==e.objectType?y.processRules(e,I.createDefaultList,"Link.createDefaultList"):"location"==e.objectType?y.processRules(e,I.createDefaultLocation,"Link.createDefaultLocation"):"commerce"==e.objectType?y.processRules(e,I.createDefaultCommerce,"Link.createDefaultCommerce"):"text"==e.objectType?y.processRules(e,I.createDefaultText,"Link.createDefaultText"):y.processRules(e,I.createDefaultFeed,"Link.createDefaultFeed"),t(p,e,E.defaultType)},h.sendCustom=function(e){var e=y.processRules(e,I.custom,"Link.sendCustomTemplate");return i(u,e,E.custom)},h.sendScrap=function(e){var e=y.processRules(e,I.scrap,"Link.sendScrap");return i(l,e,E.scrap)},h.sendDefault=function(e){if(!e.objectType)throw new y.KakaoError("objectType is required for KakaoTalk Link");var e=y.processRules(e,I[e.objectType],"Link.sendDefault");return i(p,e,E.defaultType)},h.uploadImage=function(e){return e=y.processRules(e,I.uploadImage,"Link.uploadImage"),o(e)},h.deleteImage=function(e){return e=y.processRules(e,I.deleteImage,"Link.deleteImage"),a(e)},h.scrapImage=function(e){return e=y.processRules(e,I.scrapImage,"Link.scrapImage"),s(e)};var R=["feed","list","location","commerce","text"],I={talkLink:{optional:{label:g.passesOneOf([g.isString,g.isObject]),image:g.isObject,webImage:g.isObject,webButton:g.isObject,webLink:g.isObject,appButton:g.isObject,appLink:g.isObject,horizontalButton:g.isArray,fail:g.isFunction,installTalk:g.isBoolean,forwardable:g.isBoolean,extras:g.isObject},before:function(e){g.isString(e.label)&&(e.label={text:e.label})
},defaults:{installTalk:!0,forwardable:!1,fail:g.emptyFunc}},custom:{required:{templateId:g.isNumber},optional:{templateArgs:g.isObject,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{templateArgs:{},installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},scrap:{required:{requestUrl:g.isString},optional:{templateId:g.isNumber,templateArgs:g.isObject,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{templateArgs:{},installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},feed:{required:{objectType:g.isOneOf(R),content:g.isObject},optional:{social:g.isObject,buttonTitle:g.isString,buttons:g.isArray,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},commerce:{required:{objectType:g.isOneOf(R),content:g.isObject,commerce:g.isObject},optional:{buttonTitle:g.isString,buttons:g.isArray,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},list:{required:{objectType:g.isOneOf(R),headerTitle:g.isString,headerLink:g.isObject,contents:g.isArray},optional:{buttonTitle:g.isString,buttons:g.isArray,headerImageUrl:g.isString,headerImageWidth:g.isNumber,headerImageHeight:g.isNumber,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},location:{required:{objectType:g.isOneOf(R),content:g.isObject,address:g.isString},optional:{addressTitle:g.isString,social:g.isObject,buttonTitle:g.isString,buttons:g.isArray,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},text:{required:{objectType:g.isOneOf(R),text:g.isString,link:g.isObject},optional:{buttonTitle:g.isString,buttons:g.isArray,installTalk:g.isBoolean,fail:g.isFunction,always:g.isFunction,success:g.isFunction,extras:g.isObject,callback:g.isFunction},defaults:{installTalk:!1,fail:g.emptyFunc,always:g.emptyFunc,success:g.emptyFunc,callback:g.emptyFunc}},uploadImage:{required:{file:g.isObject},optional:{always:g.isFunction,success:g.isFunction},defaults:{always:g.emptyFunc,success:g.emptyFunc}},deleteImage:{required:{imageUrl:g.isString},optional:{always:g.isFunction,success:g.isFunction},defaults:{always:g.emptyFunc,success:g.emptyFunc}},scrapImage:{required:{imageUrl:g.isString},optional:{always:g.isFunction,success:g.isFunction},defaults:{always:g.emptyFunc,success:g.emptyFunc}}};I.createTalkLink=g.extend({required:{container:g.passesOneOf([g.isElement,g.isString])}},I.talkLink),I.createCustom=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.custom.required)},I.custom),I.createScrap=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.scrap.required)},I.scrap),I.createDefaultFeed=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.feed.required)},I.feed),I.createDefaultList=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.list.required)},I.list),I.createDefaultLocation=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.location.required)},I.location),I.createDefaultCommerce=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.commerce.required)},I.commerce),I.createDefaultText=g.defaults({required:g.extend({container:g.passesOneOf([g.isElement,g.isString])},I.text.required)},I.text);var F=function(){var e="release";return!y.UA.os.ios||"alpha"!==e&&"sandbox"!==e?"kakaolink":"alphalink"}();return h.cleanup=function(){g.each(j,function(e){e()}),j.length=0},h}()},{"../vendor/userAgent.js":24,"../vendor/web2app.js":25,"./api.js":3,"./common.js":8,"./link.obj.js":15,"./util.js":19,"./webviewchecker.js":20}],15:[function(e,t){t.exports=function(){function t(e){var t=parseInt(e,10);if(isNaN(t)||80>t)throw new b("Illegal argument for image: width/height should be a number larger than 80");return!0}function n(e){e.width=parseInt(e.width,10),e.height=parseInt(e.height,10)}function r(e){var t=w.keys(e)[0];return"webButton"===t?_(e.webButton,O[t],"parameter webButton in Link.createTalkLink"):_(e.appButton,O[t],"parameter appButton in Link.createTalkLink"),!0}function i(e){var t=w.keys(e[0]),n=w.keys(e[1]),r=e[0][t],i=e[1][n];return{objtype:"horizontal",subs:[{objtype:"button",text:r.text,action:u(r.type,r)},{objtype:"button",text:i.text,action:u(i.type,i)}],disptype:"both"}}function o(e){return{objtype:"label",text:e.text,disptype:e.displayType}}function a(e,t){return{objtype:"image",src:t.src,width:t.width,height:t.height,action:u(e,t),disptype:t.displayType}}function s(e,t){return{objtype:"button",text:t.text,action:u(e,t),disptype:t.displayType}}function c(e,t){return{objtype:"link",text:t.text,action:u(e,t),disptype:t.displayType}}function u(e,t){function n(){function e(e){return e.indexOf("://")>-1?e:"http://"+e}return{type:t.type,url:t.url?e(t.url):void 0,auth:t.auth}}function r(){function e(e,t){var n={android:{os:"android"},iphone:{os:"ios",devicetype:"phone"},ipad:{os:"ios",devicetype:"pad"}};e&&(e=_(e,T,"execParams in Kakao.Link")),t&&(t=_(t,T,"marketParams in Kakao.Link"));var r=[];return w.each(n,function(n,i){var o=w.extend({},n);e&&e[i]&&(o.execparam=w.buildQueryString(e[i],!1)),t&&t[i]&&(o.marketparam=w.buildQueryString(t[i],!1)),(o.execparam||o.marketparam)&&r.push(o)}),r}return{type:"app",url:t.webUrl,actioninfo:e(t.execParams,t.marketParams)}}switch(e){case"web":return n();case"app":return r();default:return void 0}}function l(e){return{title:e.title,link:h(e.link)}}function p(e){return w.map(e,function(e){return{title:e.title,link:h(e.link)}})}function d(e){return{like_count:e.likeCount,comment_count:e.commentCount,shared_count:e.sharedCount,view_count:e.viewCount,subscriber_count:e.subscriberCount}}function f(e){return{title:e.title,image_url:e.imageUrl,link:h(e.link),image_width:e.imageWidth,image_height:e.imageHeight,description:e.description}}function m(e){if(e.length<2)throw new b("Illegal argument for contents: min count(2)");return w.map(e,function(e){return{title:e.title,image_url:e.imageUrl,link:h(e.link),image_width:e.imageWidth,image_height:e.imageHeight,description:e.description}})}function h(e){return{web_url:e.webUrl,mobile_web_url:e.mobileWebUrl,android_execution_params:e.androidExecParams,ios_execution_params:e.iosExecParams}}function g(e){return{regular_price:e.regularPrice,discount_price:e.discountPrice,discount_rate:e.discountRate,fixed_discount_price:e.fixedDiscountPrice}}function v(e){return _(e,O.content,"parameter content in Link.sendDefault"),!0}function y(e){return _(e,O.link,"parameter link in Link.sendDefault"),!0}function k(e){return _(e,O.button,"parameter button in Link.sendDefault"),!0}var w=e("./util.js"),b=e("./common/KakaoError"),_=e("./common/ruleProcess"),S={WEB:"web",INWEB:"inweb",APP:"app"},x={displayType:w.isOneOf(["both","sender","receiver"])},O={label:{required:{text:w.isString},optional:x,builder:o},image:{required:{src:w.isString,width:t,height:t},optional:x,before:n,builder:w.partial(a,null)},webImage:{required:{src:w.isString,width:t,height:t},optional:w.extend({url:w.isString,auth:w.isBoolean,type:w.isOneOf([S.WEB,S.INWEB])},x),defaults:{type:S.WEB},before:n,builder:w.partial(a,"web")},webButton:{optional:w.extend({text:w.isString,url:w.isString,auth:w.isBoolean,type:w.isOneOf(["web","inweb"])},x),defaults:{type:"web"},builder:w.partial(s,"web")},appButton:{optional:w.extend({text:w.isString,webUrl:w.isString,execParams:w.isObject,marketParams:w.isObject,type:w.isString},x),defaults:{type:"app"},builder:w.partial(s,"app")},webLink:{required:{text:w.isString},optional:w.extend({url:w.isString,auth:w.isBoolean,type:w.isOneOf(["web","inweb"])},x),defaults:{type:"web"},builder:w.partial(c,"web")},appLink:{required:{text:w.isString},optional:w.extend({webUrl:w.isString,execParams:w.isObject,marketParams:w.isObject},x),builder:w.partial(c,"app")},horizontalButton:{required:{0:r,1:r},builder:i},content:{required:{title:w.isString,imageUrl:w.isString,link:y},optional:{imageWidth:w.isNumber,imageHeight:w.isNumber,description:w.isString},builder:f},contents:{optional:{0:v,1:v,2:v},builder:m},commerce:{required:{regularPrice:w.isNumber},optional:{discountPrice:w.isNumber,discountRate:w.isNumber,fixedDiscountPrice:w.isNumber},builder:g},social:{optional:{likeCount:w.isNumber,commentCount:w.isNumber,sharedCount:w.isNumber,viewCount:w.isNumber,subscriberCount:w.isNumber},builder:d},button:{required:{title:w.isString,link:y},builder:l},buttons:{optional:{0:k,1:k},builder:p},headerLink:{optional:{webUrl:w.isString,mobileWebUrl:w.isString,androidExecParams:w.isString,iosExecParams:w.isString},builder:h},link:{optional:{webUrl:w.isString,mobileWebUrl:w.isString,androidExecParams:w.isString,iosExecParams:w.isString},builder:h}},T={optional:{iphone:w.isObject,ipad:w.isObject,android:w.isObject}};return{create:function(e,t,n){var r=O[t];return r?(e=_(e,r,"parameter '"+t+"' in "+(n||"Link")),r.builder(e)):void 0}}}()},{"./common/KakaoError":9,"./common/ruleProcess":11,"./util.js":19}],16:[function(e,t){t.exports=function(t){t.Kakao=t.Kakao||{};var n=t.Kakao,r=e("./util.js"),i=e("./common.js");return n.VERSION=i.VERSION,n.Story=e("./story.js"),n.init=function(t){if(i.RUNTIME.appKey)throw new i.KakaoError("Kakao.init: Already initialized.");if(!r.isString(t)||t===i.DUMMY_KEY)throw new i.KakaoError("Kakao.init: App key must be provided");i.RUNTIME.appKey=t,n.Auth=e("./auth.js"),n.API=e("./api.js"),n.Link=e("./link.js"),n.Emoticon=e("./emoticon.js"),n.Navi=e("./navi.js")},n.cleanup=function(){n.Auth&&n.Auth.cleanup(),n.API&&n.API.cleanup(),n.Link&&n.Link.cleanup(),n.Story&&n.Story.cleanup(),n.Emoticon&&n.Emoticon.cleanup(),r.nullify(i.RUNTIME)},window.kakaoAsyncInit&&window.kakaoAsyncInit(),n}(window)},{"./api.js":3,"./auth.js":4,"./common.js":8,"./emoticon.js":13,"./link.js":14,"./navi.js":17,"./story.js":18,"./util.js":19}],17:[function(e,t){t.exports=function(){function t(e){var t=new u;return t.param={destination:l.spot.destinationBuilder(e),option:"{}"===JSON.stringify(l.spot.optionBuilder(e))?void 0:l.spot.optionBuilder(e),via_list:e.viaPoints},i.URL.navi+"?"+r.buildQueryString(t)}function n(e){var t=new u;return t.param={destination:p.spot.destinationBuilder(e),option:"{}"===JSON.stringify(p.spot.optionBuilder(e))?void 0:p.spot.optionBuilder(e)},t.scheme_type="sharePoi",i.URL.naviShare+"?"+r.buildQueryString(t)}var r=e("./util.js"),i=e("./common"),o=e("./common/ruleProcess"),a=e("../vendor/web2app.js"),s="com.locnall.KimGiSa",c={};c.start=function(e){e=o(e,l.spot);var n=t(e),r=encodeURIComponent(n.replace(i.URL.navi,i.URL.naviWeb));a({urlScheme:n,intentURI:"intent:"+n+"#Intent;package="+s+";S.browser_fallback_url="+r+";end;",storeURL:n.replace(i.URL.navi,i.URL.naviWeb),universalLink:n.replace(i.URL.navi,i.URL.naviWeb)})},c.share=function(e){e=o(e,p.spot);var t=n(e),r=encodeURIComponent(t.replace(i.URL.naviShare,i.URL.naviWeb));a({urlScheme:t,intentURI:"intent:"+t+"#Intent;package="+s+";S.browser_fallback_url="+r+";end;",storeURL:t.replace(i.URL.naviShare,i.URL.naviWeb),universalLink:t.replace(i.URL.naviShare,i.URL.naviWeb)})};var u=function(){this.appkey=i.RUNTIME.appKey,this.apiver="1.0",this.extras={KA:i.KAKAO_AGENT}},l={spot:{required:{name:r.isString,x:r.isNumber,y:r.isNumber},optional:{coordType:r.isOneOf(["wgs84","katec"]),vehicleType:r.isOneOf([1,2,3,4,5,6,7]),rpOption:r.isOneOf([1,2,3,4,5,6,8,100]),routeInfo:r.isBoolean,sX:r.isNumber,sY:r.isNumber,sAngle:r.isNumber,returnUri:r.isString,rpflag:r.isString,cid:r.isString,guideId:r.isNumber,viaPoints:function(e){if(!r.isArray(e))return!1;if(e.length>3)throw new Error("via points should not be exceed 3");return r.each(e,function(e){return o(e,l.viaPoint)}),!0}},destinationBuilder:function(e){return{name:e.name,x:e.x,y:e.y,rpflag:e.rpflag,cid:e.cid,guide_id:e.guideId}},optionBuilder:function(e){return{coord_type:e.coordType,vehicle_type:e.vehicleType,rpoption:e.rpOption,route_info:e.routeInfo,s_x:e.sX,s_y:e.sY,s_angle:e.sAngle,return_uri:e.returnUri}}},viaPoint:{required:{name:r.isString,x:r.isNumber,y:r.isNumber},optional:{rpflag:r.isString,cid:r.isString}}},p={spot:{required:{name:r.isString,x:r.isNumber,y:r.isNumber},optional:{coordType:r.isOneOf(["wgs84","katec"]),rpflag:r.isString,cid:r.isString,guideId:r.isNumber},destinationBuilder:function(e){return{name:e.name,x:e.x,y:e.y,rpflag:e.rpflag,cid:e.cid,guide_id:e.guideId}},optionBuilder:function(e){return{coord_type:e.coordType}}}};return c}()},{"../vendor/web2app.js":25,"./common":8,"./common/ruleProcess":11,"./util.js":19}],18:[function(e,t){t.exports=function(){function t(e,t){var n={url:e};return t&&(n.text=t),a.extend(n,i()),s.URL.storyShare+"?"+a.buildQueryString(n)}function n(e,t,n,r){var o={post:e,appver:s.VERSION,appid:t,apiver:"1.0",appname:n};return r&&(o.urlinfo=r),a.extend(o,i()),"storylink://posting?"+a.buildQueryString(o)}function r(e,t){var n={id:e.id,type:e.type,hideFollower:!e.showFollowerCount,frameId:t};return a.extend(n,i()),s.URL.channelFollow+"?"+a.buildQueryString(n)}function i(){var e={kakao_agent:s.KAKAO_AGENT};return s.RUNTIME.appKey&&(e.app_key=s.RUNTIME.appKey),e}var o={},a=e("./util.js"),s=e("./common.js"),c=e("../vendor/web2app.js"),u="kakaostory_social_plugin",l="width=670, height=471",p=[];o.createShareButton=function(e){e=s.processRules(e,f.createShareButton,"Story.createShareButton");var n=a.getElement(e.container);if(!n)throw new s.KakaoError("container is required for KakaoStory share button: pass in element or id");var r=document.createElement("a"),i=document.createElement("img");r.appendChild(i);var o=t(e.url,e.text);r.setAttribute("href",o),r.setAttribute("target","_blank");var c=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1,s.windowOpen(o,u,l)};a.addEvent(r,"click",c);var d=function(){a.removeEvent(r,"click",c),n.removeChild(r)};p.push(d),i.onload=function(e){var t,o;n.appendChild(r),s.UA.browser.msie&&parseInt(s.UA.browser.version.major)<=10?(t=i.width,o=i.height):(t=e.target.width,o=e.target.height),i.width=t,i.height=o},i.src=s.URL.storyIcon},o.share=function(e){e=s.processRules(e,f.share,"Story.share");var n=t(e.url,e.text);s.windowOpen(n,u,l)},o.open=function(e){e=s.processRules(e,f.open,"Story.open");var t,r,i=(e.text?e.text+"\n":"")+(e.url||""),o=location.hostname||"";e.urlInfo&&(t=s.processRules(e.urlInfo,f.openUrlInfo,"Story.open"),r=t.name||"");var a=n(i,o,r||o,JSON.stringify(t)),u={urlScheme:a,intentURI:"intent:"+a+"#Intent;package=com.kakao.story;end;",appname:"KakaoStory",storeURL:s.getInstallUrl("com.kakao.story","486244601"),onUnsupportedEnvironment:function(){e.fail&&e.fail()}};c(u)};var d=0;o.createFollowButton=function(e){e=s.processRules(e,f.createFollowButton,"Story.createFollowButton");var t=a.getElement(e.container);if(!t)throw new s.KakaoError("container is required for KakaoStory follow button: pass in element or id");var n=document.createElement("iframe"),i=d++;n.src=r(e,i),n.setAttribute("frameborder","0"),n.setAttribute("marginwidth","0"),n.setAttribute("marginheight","0"),n.setAttribute("scrolling","no");var o=e.showFollowerCount&&"horizontal"===e.type?85:59,c=e.showFollowerCount&&"vertical"===e.type?46:20;n.style.width=o+"px",n.style.height=c+"px";var u=function(e){if(e.data&&/\.kakao\.com$/.test(e.origin)){var t=e.data.split(","),r=parseInt(t[0],10),a=parseInt(t[1],10),s=parseInt(t[2],10);if(r!==i)return;o!==a&&(o=a,n.style.width=a+"px"),c!==s&&(c=s,n.style.height=s+"px")}};t.appendChild(n),a.addEvent(window,"message",u);var l=function(){a.removeEvent(window,"message",u),t.removeChild(n)};p.push(l)};var f={createShareButton:{required:{container:a.passesOneOf([a.isElement,a.isString])},optional:{url:a.isString,text:a.isString},defaults:function(e){var t=a.getElement(e.container);return t?{url:t.getAttribute("data-url")||location.href}:null}},share:{optional:{url:a.isString,text:a.isString},defaults:{url:location.href}},open:{optional:{url:a.isString,text:a.isString,urlInfo:a.isObject},defaults:{url:location.href}},openUrlInfo:{required:{title:a.isString},optional:{desc:a.isString,name:a.isString,images:a.isArray,imageurl:a.isArray,type:a.isString},defaults:{type:"website"},before:function(e){e.images&&(e.imageurl=e.images,delete e.images)}},createFollowButton:{required:{container:a.passesOneOf([a.isElement,a.isString]),id:a.isString},optional:{type:a.isOneOf(["horizontal","vertical"]),showFollowerCount:a.isBoolean},defaults:function(e){var t=a.getElement(e.container);if(t){var n={type:t.getAttribute("data-type")||"horizontal",showFollowerCount:"false"!==t.getAttribute("data-show-follower-count")},r=t.getAttribute("data-id");return r&&(n.id=r),n}return null},after:function(e){"@"!==e.id.substr(0,1)&&(e.id="@"+e.id)}}};return o.cleanup=function(){a.each(p,function(e){e()}),p.length=0},o}()},{"../vendor/web2app.js":25,"./common.js":8,"./util.js":19}],19:[function(e,t){/*!
	 * underscore
	 * https://github.com/jashkenas/underscore
	 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * MIT License
	 */
t.exports=function(){var e={},t={},n=Array.prototype,r=Object.prototype,i=n.slice,o=n.concat,a=r.toString,s=r.hasOwnProperty,c=n.forEach,u=n.map,l=n.filter,p=n.every,d=n.some,f=n.indexOf,m=Array.isArray,h=Object.keys,g=e.each=function(n,r,i){if(null==n)return n;if(c&&n.forEach===c)n.forEach(r,i);else if(n.length===+n.length){for(var o=0,a=n.length;a>o;o++)if(r.call(i,n[o],o,n)===t)return}else for(var s=e.keys(n),o=0,a=s.length;a>o;o++)if(r.call(i,n[s[o]],s[o],n)===t)return;return n};e.map=function(e,t,n){var r=[];return null==e?r:u&&e.map===u?e.map(t,n):(g(e,function(e,i,o){r.push(t.call(n,e,i,o))}),r)},e.filter=function(e,t,n){var r=[];return null==e?r:l&&e.filter===l?e.filter(t,n):(g(e,function(e,i,o){t.call(n,e,i,o)&&r.push(e)}),r)},e.every=function(n,r,i){r||(r=e.identity);var o=!0;return null==n?o:p&&n.every===p?n.every(r,i):(g(n,function(e,n,a){return(o=o&&r.call(i,e,n,a))?void 0:t}),!!o)};var v=e.any=function(n,r,i){r||(r=e.identity);var o=!1;return null==n?o:d&&n.some===d?n.some(r,i):(g(n,function(e,n,a){return o||(o=r.call(i,e,n,a))?t:void 0}),!!o)};return e.contains=function(e,t){return null==e?!1:f&&e.indexOf===f?-1!=e.indexOf(t):v(e,function(e){return e===t})},e.difference=function(t){var r=o.apply(n,i.call(arguments,1));return e.filter(t,function(t){return!e.contains(r,t)})},e.partial=function(t){var n=i.call(arguments,1);return function(){for(var r=0,i=n.slice(),o=0,a=i.length;a>o;o++)i[o]===e&&(i[o]=arguments[r++]);for(;r<arguments.length;)i.push(arguments[r++]);return t.apply(this,i)}},e.after=function(e,t){return function(){return--e<1?t.apply(this,arguments):void 0}},e.keys=function(t){if(!e.isObject(t))return[];if(h)return h(t);var n=[];for(var r in t)e.has(t,r)&&n.push(r);return n},e.extend=function(e){return g(i.call(arguments,1),function(t){if(t)for(var n in t)e[n]=t[n]}),e},e.defaults=function(e){return g(i.call(arguments,1),function(t){if(t)for(var n in t)void 0===e[n]&&(e[n]=t[n])}),e},e.isElement=function(e){return!(!e||1!==e.nodeType)},e.isArray=m||function(e){return"[object Array]"==a.call(e)},e.isObject=function(e){return e===Object(e)},g(["Arguments","Function","String","Number","Date","RegExp","Blob","File","FileList"],function(t){e["is"+t]=function(e){return a.call(e)=="[object "+t+"]"}}),e.isBoolean=function(e){return e===!0||e===!1||"[object Boolean]"==a.call(e)},e.has=function(e,t){return s.call(e,t)},e.identity=function(e){return e},e.emptyFunc=function(){},e.getElement=function(t){return e.isElement(t)?t:e.isString(t)?document.querySelector(t):null},e.addEvent=function(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)},e.removeEvent=function(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)},e.buildQueryString=function(t,n){var r=[];for(var i in t)if(t.hasOwnProperty(i)){var o=t[i];e.isObject(o)&&(o=JSON.stringify(o));var a=n===!1?i:encodeURIComponent(i),s=n===!1?o:encodeURIComponent(o);r.push(a+"="+s)}return r.join("&")},e.getRandomString=function(){return Math.random().toString(36).slice(2)},e.nullify=function(t){e.each(t,function(e,n){t[n]=null})},e.isOneOf=function(t){return e.partial(e.contains,t)},e.passesOneOf=function(t){if(!e.isArray(t))throw new Error("validators should be an Array");return function(n){return e.any(t,function(e){return e(n)})}},e.isURL=function(e){var t=/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;return t.test(e)},e.arrayBufferToString=function(e){var t,n,r,i="",o=new Uint8Array(e),a=o.length,s=Math.pow(2,16);for(t=0;a>t;t+=s)n=Math.min(s,a-t),r=o.subarray(t,t+n),i+=String.fromCharCode.apply(null,r);return i},e.localStorage=function(){var e={_data:{},setItem:function(e,t){return this._data[e]=String(t)},getItem:function(e){return this._data.hasOwnProperty(e)?this._data[e]:null},removeItem:function(e){return delete this._data[e]},clear:function(){return this._data={}}};try{return"localStorage"in window?(window.localStorage.setItem("store",""),window.localStorage.removeItem("store"),window.localStorage):e}catch(t){return e}}(),e}()},{}],20:[function(e,t){t.exports=function(){function t(){return/Version\/\d+\.\d+/i.test(i.ua)&&(/Chrome\/\d+\.\d+\.\d+\.\d+ Mobile/i.test(i.ua)||/; wv\)/i.test(i.ua))}function n(){return 4==i.os.version.major&&i.os.version.minor<4&&/Version\/\d+.\d+|/i.test(i.ua)}function r(){return 2==i.os.version.major&&/Version\/\d+.\d+|/i.test(i.ua)}var i=e("../vendor/userAgent.js")();return{isAndroidWebView:function(){return i.os.android&&(r()||n()||t())},isIOSKakaoTalkWebView:function(){return i.os.ios&&/KAKAOTALK/i.test(i.ua)},isAndroidKakaoTalkWebView:function(){return i.os.android&&/KAKAOTALK/i.test(i.ua)}}}},{"../vendor/userAgent.js":24}],21:[function(e,t){t.exports=function(){var e=e||function(e,t){var n={},r=n.lib={},i=function(){},o=r.Base={extend:function(e){i.prototype=this;var t=new i;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},a=r.WordArray=o.extend({init:function(e,n){e=this.words=e||[],this.sigBytes=n!=t?n:4*e.length},toString:function(e){return(e||c).stringify(this)},concat:function(e){var t=this.words,n=e.words,r=this.sigBytes;if(e=e.sigBytes,this.clamp(),r%4)for(var i=0;e>i;i++)t[r+i>>>2]|=(n[i>>>2]>>>24-8*(i%4)&255)<<24-8*((r+i)%4);else if(65535<n.length)for(i=0;e>i;i+=4)t[r+i>>>2]=n[i>>>2];else t.push.apply(t,n);return this.sigBytes+=e,this},clamp:function(){var t=this.words,n=this.sigBytes;t[n>>>2]&=4294967295<<32-8*(n%4),t.length=e.ceil(n/4)},clone:function(){var e=o.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var n=[],r=0;t>r;r+=4)n.push(4294967296*e.random()|0);return new a.init(n,t)}}),s=n.enc={},c=s.Hex={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;e>r;r++){var i=t[r>>>2]>>>24-8*(r%4)&255;n.push((i>>>4).toString(16)),n.push((15&i).toString(16))}return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;t>r;r+=2)n[r>>>3]|=parseInt(e.substr(r,2),16)<<24-4*(r%8);return new a.init(n,t/2)}},u=s.Latin1={stringify:function(e){var t=e.words;e=e.sigBytes;for(var n=[],r=0;e>r;r++)n.push(String.fromCharCode(t[r>>>2]>>>24-8*(r%4)&255));return n.join("")},parse:function(e){for(var t=e.length,n=[],r=0;t>r;r++)n[r>>>2]|=(255&e.charCodeAt(r))<<24-8*(r%4);return new a.init(n,t)}},l=s.Utf8={stringify:function(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(t){throw Error("Malformed UTF-8 data")}},parse:function(e){return u.parse(unescape(encodeURIComponent(e)))}},p=r.BufferedBlockAlgorithm=o.extend({reset:function(){this._data=new a.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=l.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var n=this._data,r=n.words,i=n.sigBytes,o=this.blockSize,s=i/(4*o),s=t?e.ceil(s):e.max((0|s)-this._minBufferSize,0);if(t=s*o,i=e.min(4*t,i),t){for(var c=0;t>c;c+=o)this._doProcessBlock(r,c);c=r.splice(0,t),n.sigBytes-=i}return new a.init(c,i)},clone:function(){var e=o.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});r.Hasher=p.extend({cfg:o.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){p.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,n){return new e.init(n).finalize(t)}},_createHmacHelper:function(e){return function(t,n){return new d.HMAC.init(e,n).finalize(t)}}});var d=n.algo={};return n}(Math);return function(){var t=e,n=t.lib.WordArray;t.enc.Base64={stringify:function(e){var t=e.words,n=e.sigBytes,r=this._map;e.clamp(),e=[];for(var i=0;n>i;i+=3)for(var o=(t[i>>>2]>>>24-8*(i%4)&255)<<16|(t[i+1>>>2]>>>24-8*((i+1)%4)&255)<<8|t[i+2>>>2]>>>24-8*((i+2)%4)&255,a=0;4>a&&n>i+.75*a;a++)e.push(r.charAt(o>>>6*(3-a)&63));if(t=r.charAt(64))for(;e.length%4;)e.push(t);return e.join("")},parse:function(e){var t=e.length,r=this._map,i=r.charAt(64);i&&(i=e.indexOf(i),-1!=i&&(t=i));for(var i=[],o=0,a=0;t>a;a++)if(a%4){var s=r.indexOf(e.charAt(a-1))<<2*(a%4),c=r.indexOf(e.charAt(a))>>>6-2*(a%4);i[o>>>2]|=(s|c)<<24-8*(o%4),o++}return n.create(i,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(t){function n(e,t,n,r,i,o,a){return e=e+(t&n|~t&r)+i+a,(e<<o|e>>>32-o)+t}function r(e,t,n,r,i,o,a){return e=e+(t&r|n&~r)+i+a,(e<<o|e>>>32-o)+t}function i(e,t,n,r,i,o,a){return e=e+(t^n^r)+i+a,(e<<o|e>>>32-o)+t}function o(e,t,n,r,i,o,a){return e=e+(n^(t|~r))+i+a,(e<<o|e>>>32-o)+t}for(var a=e,s=a.lib,c=s.WordArray,u=s.Hasher,s=a.algo,l=[],p=0;64>p;p++)l[p]=4294967296*t.abs(t.sin(p+1))|0;s=s.MD5=u.extend({_doReset:function(){this._hash=new c.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,t){for(var a=0;16>a;a++){var s=t+a,c=e[s];e[s]=16711935&(c<<8|c>>>24)|4278255360&(c<<24|c>>>8)}var a=this._hash.words,s=e[t+0],c=e[t+1],u=e[t+2],p=e[t+3],d=e[t+4],f=e[t+5],m=e[t+6],h=e[t+7],g=e[t+8],v=e[t+9],y=e[t+10],k=e[t+11],w=e[t+12],b=e[t+13],_=e[t+14],S=e[t+15],x=a[0],O=a[1],T=a[2],A=a[3],x=n(x,O,T,A,s,7,l[0]),A=n(A,x,O,T,c,12,l[1]),T=n(T,A,x,O,u,17,l[2]),O=n(O,T,A,x,p,22,l[3]),x=n(x,O,T,A,d,7,l[4]),A=n(A,x,O,T,f,12,l[5]),T=n(T,A,x,O,m,17,l[6]),O=n(O,T,A,x,h,22,l[7]),x=n(x,O,T,A,g,7,l[8]),A=n(A,x,O,T,v,12,l[9]),T=n(T,A,x,O,y,17,l[10]),O=n(O,T,A,x,k,22,l[11]),x=n(x,O,T,A,w,7,l[12]),A=n(A,x,O,T,b,12,l[13]),T=n(T,A,x,O,_,17,l[14]),O=n(O,T,A,x,S,22,l[15]),x=r(x,O,T,A,c,5,l[16]),A=r(A,x,O,T,m,9,l[17]),T=r(T,A,x,O,k,14,l[18]),O=r(O,T,A,x,s,20,l[19]),x=r(x,O,T,A,f,5,l[20]),A=r(A,x,O,T,y,9,l[21]),T=r(T,A,x,O,S,14,l[22]),O=r(O,T,A,x,d,20,l[23]),x=r(x,O,T,A,v,5,l[24]),A=r(A,x,O,T,_,9,l[25]),T=r(T,A,x,O,p,14,l[26]),O=r(O,T,A,x,g,20,l[27]),x=r(x,O,T,A,b,5,l[28]),A=r(A,x,O,T,u,9,l[29]),T=r(T,A,x,O,h,14,l[30]),O=r(O,T,A,x,w,20,l[31]),x=i(x,O,T,A,f,4,l[32]),A=i(A,x,O,T,g,11,l[33]),T=i(T,A,x,O,k,16,l[34]),O=i(O,T,A,x,_,23,l[35]),x=i(x,O,T,A,c,4,l[36]),A=i(A,x,O,T,d,11,l[37]),T=i(T,A,x,O,h,16,l[38]),O=i(O,T,A,x,y,23,l[39]),x=i(x,O,T,A,b,4,l[40]),A=i(A,x,O,T,s,11,l[41]),T=i(T,A,x,O,p,16,l[42]),O=i(O,T,A,x,m,23,l[43]),x=i(x,O,T,A,v,4,l[44]),A=i(A,x,O,T,w,11,l[45]),T=i(T,A,x,O,S,16,l[46]),O=i(O,T,A,x,u,23,l[47]),x=o(x,O,T,A,s,6,l[48]),A=o(A,x,O,T,h,10,l[49]),T=o(T,A,x,O,_,15,l[50]),O=o(O,T,A,x,f,21,l[51]),x=o(x,O,T,A,w,6,l[52]),A=o(A,x,O,T,p,10,l[53]),T=o(T,A,x,O,y,15,l[54]),O=o(O,T,A,x,c,21,l[55]),x=o(x,O,T,A,g,6,l[56]),A=o(A,x,O,T,S,10,l[57]),T=o(T,A,x,O,m,15,l[58]),O=o(O,T,A,x,b,21,l[59]),x=o(x,O,T,A,d,6,l[60]),A=o(A,x,O,T,k,10,l[61]),T=o(T,A,x,O,u,15,l[62]),O=o(O,T,A,x,v,21,l[63]);a[0]=a[0]+x|0,a[1]=a[1]+O|0,a[2]=a[2]+T|0,a[3]=a[3]+A|0},_doFinalize:function(){var e=this._data,n=e.words,r=8*this._nDataBytes,i=8*e.sigBytes;n[i>>>5]|=128<<24-i%32;var o=t.floor(r/4294967296);for(n[(i+64>>>9<<4)+15]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),n[(i+64>>>9<<4)+14]=16711935&(r<<8|r>>>24)|4278255360&(r<<24|r>>>8),e.sigBytes=4*(n.length+1),this._process(),e=this._hash,n=e.words,r=0;4>r;r++)i=n[r],n[r]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8);return e},clone:function(){var e=u.clone.call(this);return e._hash=this._hash.clone(),e}}),a.MD5=u._createHelper(s),a.HmacMD5=u._createHmacHelper(s)}(Math),function(){var t=e,n=t.lib,r=n.Base,i=n.WordArray,n=t.algo,o=n.EvpKDF=r.extend({cfg:r.extend({keySize:4,hasher:n.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var n=this.cfg,r=n.hasher.create(),o=i.create(),a=o.words,s=n.keySize,n=n.iterations;a.length<s;){c&&r.update(c);var c=r.update(e).finalize(t);r.reset();for(var u=1;n>u;u++)c=r.finalize(c),r.reset();o.concat(c)}return o.sigBytes=4*s,o}});t.EvpKDF=function(e,t,n){return o.create(n).compute(e,t)}}(),e.lib.Cipher||function(t){var n=e,r=n.lib,i=r.Base,o=r.WordArray,a=r.BufferedBlockAlgorithm,s=n.enc.Base64,c=n.algo.EvpKDF,u=r.Cipher=a.extend({cfg:i.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,n){this.cfg=this.cfg.extend(n),this._xformMode=e,this._key=t,this.reset()},reset:function(){a.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(t,n,r){return("string"==typeof n?h:m).encrypt(e,t,n,r)},decrypt:function(t,n,r){return("string"==typeof n?h:m).decrypt(e,t,n,r)}}}});r.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l=n.mode={},p=function(e,n,r){var i=this._iv;i?this._iv=t:i=this._prevBlock;for(var o=0;r>o;o++)e[n+o]^=i[o]},d=(r.BlockCipherMode=i.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}})).extend();d.Encryptor=d.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize;p.call(this,e,t,r),n.encryptBlock(e,t),this._prevBlock=e.slice(t,t+r)}}),d.Decryptor=d.extend({processBlock:function(e,t){var n=this._cipher,r=n.blockSize,i=e.slice(t,t+r);n.decryptBlock(e,t),p.call(this,e,t,r),this._prevBlock=i}}),l=l.CBC=d,d=(n.pad={}).Pkcs7={pad:function(e,t){for(var n=4*t,n=n-e.sigBytes%n,r=n<<24|n<<16|n<<8|n,i=[],a=0;n>a;a+=4)i.push(r);n=o.create(i,n),e.concat(n)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},r.BlockCipher=u.extend({cfg:u.cfg.extend({mode:l,padding:d}),reset:function(){u.reset.call(this);var e=this.cfg,t=e.iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var n=e.createEncryptor;else n=e.createDecryptor,this._minBufferSize=1;this._mode=n.call(e,this,t&&t.words)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else t=this._process(!0),e.unpad(t);return t},blockSize:4});var f=r.CipherParams=i.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),l=(n.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext;return e=e.salt,(e?o.create([1398893684,1701076831]).concat(e).concat(t):t).toString(s)},parse:function(e){e=s.parse(e);var t=e.words;if(1398893684==t[0]&&1701076831==t[1]){var n=o.create(t.slice(2,4));t.splice(0,4),e.sigBytes-=16}return f.create({ciphertext:e,salt:n})}},m=r.SerializableCipher=i.extend({cfg:i.extend({format:l}),encrypt:function(e,t,n,r){r=this.cfg.extend(r);var i=e.createEncryptor(n,r);return t=i.finalize(t),i=i.cfg,f.create({ciphertext:t,key:n,iv:i.iv,algorithm:e,mode:i.mode,padding:i.padding,blockSize:e.blockSize,formatter:r.format})},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),e.createDecryptor(n,r).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),n=(n.kdf={}).OpenSSL={execute:function(e,t,n,r){return r||(r=o.random(8)),e=c.create({keySize:t+n}).compute(e,r),n=o.create(e.words.slice(t),4*n),e.sigBytes=4*t,f.create({key:e,iv:n,salt:r})}},h=r.PasswordBasedCipher=m.extend({cfg:m.cfg.extend({kdf:n}),encrypt:function(e,t,n,r){return r=this.cfg.extend(r),n=r.kdf.execute(n,e.keySize,e.ivSize),r.iv=n.iv,e=m.encrypt.call(this,e,t,n.key,r),e.mixIn(n),e},decrypt:function(e,t,n,r){return r=this.cfg.extend(r),t=this._parse(t,r.format),n=r.kdf.execute(n,e.keySize,e.ivSize,t.salt),r.iv=n.iv,m.decrypt.call(this,e,t,n.key,r)}})}(),function(){for(var t=e,n=t.lib.BlockCipher,r=t.algo,i=[],o=[],a=[],s=[],c=[],u=[],l=[],p=[],d=[],f=[],m=[],h=0;256>h;h++)m[h]=128>h?h<<1:h<<1^283;for(var g=0,v=0,h=0;256>h;h++){var y=v^v<<1^v<<2^v<<3^v<<4,y=y>>>8^255&y^99;i[g]=y,o[y]=g;var k=m[g],w=m[k],b=m[w],_=257*m[y]^16843008*y;a[g]=_<<24|_>>>8,s[g]=_<<16|_>>>16,c[g]=_<<8|_>>>24,u[g]=_,_=16843009*b^65537*w^257*k^16843008*g,l[y]=_<<24|_>>>8,p[y]=_<<16|_>>>16,d[y]=_<<8|_>>>24,f[y]=_,g?(g=k^m[m[m[b^k]]],v^=m[m[v]]):g=v=1}var S=[0,1,2,4,8,16,32,64,128,27,54],r=r.AES=n.extend({_doReset:function(){for(var e=this._key,t=e.words,n=e.sigBytes/4,e=4*((this._nRounds=n+6)+1),r=this._keySchedule=[],o=0;e>o;o++)if(n>o)r[o]=t[o];else{var a=r[o-1];o%n?n>6&&4==o%n&&(a=i[a>>>24]<<24|i[a>>>16&255]<<16|i[a>>>8&255]<<8|i[255&a]):(a=a<<8|a>>>24,a=i[a>>>24]<<24|i[a>>>16&255]<<16|i[a>>>8&255]<<8|i[255&a],a^=S[o/n|0]<<24),r[o]=r[o-n]^a}for(t=this._invKeySchedule=[],n=0;e>n;n++)o=e-n,a=n%4?r[o]:r[o-4],t[n]=4>n||4>=o?a:l[i[a>>>24]]^p[i[a>>>16&255]]^d[i[a>>>8&255]]^f[i[255&a]]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,a,s,c,u,i)},decryptBlock:function(e,t){var n=e[t+1];e[t+1]=e[t+3],e[t+3]=n,this._doCryptBlock(e,t,this._invKeySchedule,l,p,d,f,o),n=e[t+1],e[t+1]=e[t+3],e[t+3]=n},_doCryptBlock:function(e,t,n,r,i,o,a,s){for(var c=this._nRounds,u=e[t]^n[0],l=e[t+1]^n[1],p=e[t+2]^n[2],d=e[t+3]^n[3],f=4,m=1;c>m;m++)var h=r[u>>>24]^i[l>>>16&255]^o[p>>>8&255]^a[255&d]^n[f++],g=r[l>>>24]^i[p>>>16&255]^o[d>>>8&255]^a[255&u]^n[f++],v=r[p>>>24]^i[d>>>16&255]^o[u>>>8&255]^a[255&l]^n[f++],d=r[d>>>24]^i[u>>>16&255]^o[l>>>8&255]^a[255&p]^n[f++],u=h,l=g,p=v;h=(s[u>>>24]<<24|s[l>>>16&255]<<16|s[p>>>8&255]<<8|s[255&d])^n[f++],g=(s[l>>>24]<<24|s[p>>>16&255]<<16|s[d>>>8&255]<<8|s[255&u])^n[f++],v=(s[p>>>24]<<24|s[d>>>16&255]<<16|s[u>>>8&255]<<8|s[255&l])^n[f++],d=(s[d>>>24]<<24|s[u>>>16&255]<<16|s[l>>>8&255]<<8|s[255&p])^n[f++],e[t]=h,e[t+1]=g,e[t+2]=v,e[t+3]=d},keySize:8});t.AES=n._createHelper(r)}(),e}()},{}],22:[function(e,t){t.exports=function(){return function(e,t,n,r,i,o){function a(e,t){var n=_typeof(e[t]);return"function"==n||!("object"!=n||!e[t])||"unknown"==n}function s(e,t){return!("object"!=_typeof(e[t])||!e[t])}function c(e){return"[object Array]"===Object.prototype.toString.call(e)}function u(){var e="Shockwave Flash",t="application/x-shockwave-flash";if(!k(navigator.plugins)&&"object"==_typeof(navigator.plugins[e])){var n=navigator.plugins[e].description;n&&!k(navigator.mimeTypes)&&navigator.mimeTypes[t]&&navigator.mimeTypes[t].enabledPlugin&&(E=n.match(/\d+/g))}if(!E){var r;try{r=new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),E=Array.prototype.slice.call(r.GetVariable("$version").match(/(\d+),(\d+),(\d+),(\d+)/),1),r=null}catch(i){}}if(!E)return!1;var o=parseInt(E[0],10),a=parseInt(E[1],10);return j=o>9&&a>0,!0}function l(){if(!W){W=!0;for(var e=0;e<H.length;e++)H[e]();H.length=0}}function p(e,t){return W?(e.call(t),void 0):(H.push(function(){e.call(t)}),void 0)}function d(){var e=parent;if(""!==C)for(var t=0,n=C.split(".");t<n.length;t++)e=e[n[t]];return e.easyXDM}function f(t){return e.easyXDM=P,C=t,C&&(D="easyXDM_"+C.replace(".","_")+"_"),M}function m(e){return e.match(K)[3]}function h(e){return e.match(K)[4]||""}function g(e){var t=e.toLowerCase().match(K),n=t[2],r=t[3],i=t[4]||"";return("http:"==n&&":80"==i||"https:"==n&&":443"==i)&&(i=""),n+"//"+r+i}function v(e){if(e=e.replace(N,"$1/"),!e.match(/^(http||https):\/\//)){var t="/"===e.substring(0,1)?"":n.pathname;"/"!==t.substring(t.length-1)&&(t=t.substring(0,t.lastIndexOf("/")+1)),e=n.protocol+"//"+n.host+t+e}for(;B.test(e);)e=e.replace(B,"");return e}function y(e,t){var n="",r=e.indexOf("#");-1!==r&&(n=e.substring(r),e=e.substring(0,r));var i=[];for(var a in t)t.hasOwnProperty(a)&&i.push(a+"="+o(t[a]));return e+(q?"#":-1==e.indexOf("?")?"?":"&")+i.join("&")+n}function k(e){return"undefined"==typeof e}function w(e,t,n){var r;for(var i in t)t.hasOwnProperty(i)&&(i in e?(r=t[i],"object"===("undefined"==typeof r?"undefined":_typeof(r))?w(e[i],r,n):n||(e[i]=t[i])):e[i]=t[i]);return e}function b(){var e=t.body.appendChild(t.createElement("form")),n=e.appendChild(t.createElement("input"));n.name=D+"TEST"+U,A=n!==e.elements[n.name],t.body.removeChild(e)}function _(e){k(A)&&b();var n;A?n=t.createElement('<iframe name="'+e.props.name+'"/>'):(n=t.createElement("IFRAME"),n.name=e.props.name),n.id=n.name=e.props.name,delete e.props.name,"string"==typeof e.container&&(e.container=t.getElementById(e.container)),e.container||(w(n.style,{position:"absolute",top:"-2000px",left:"0px"}),e.container=t.body);var r=e.props.src;if(e.props.src="javascript:false",w(n,e.props),n.border=n.frameBorder=0,n.allowTransparency=!0,e.container.appendChild(n),e.onLoad&&R(n,"load",e.onLoad),e.usePost){var i,o=e.container.appendChild(t.createElement("form"));if(o.target=n.name,o.action=r,o.method="POST","object"===_typeof(e.usePost))for(var a in e.usePost)e.usePost.hasOwnProperty(a)&&(A?i=t.createElement('<input name="'+a+'"/>'):(i=t.createElement("INPUT"),i.name=a),i.value=e.usePost[a],o.appendChild(i));o.submit(),o.parentNode.removeChild(o)}else n.src=r;return e.props.src=r,n}function S(e,t){"string"==typeof e&&(e=[e]);for(var n,r=e.length;r--;)if(n=e[r],n=new RegExp("^"==n.substr(0,1)?n:"^"+n.replace(/(\*)/g,".$1").replace(/\?/g,".")+"$"),n.test(t))return!0;return!1}function x(r){var i,o=r.protocol;if(r.isHost=r.isHost||k(X.xdm_p),q=r.hash||!1,r.props||(r.props={}),r.isHost)r.remote=v(r.remote),r.channel=r.channel||"default"+U++,r.secret=Math.random().toString(16).substring(2),k(o)&&(o=g(n.href)==g(r.remote)?"4":a(e,"postMessage")||a(t,"postMessage")?"1":r.swf&&a(e,"ActiveXObject")&&u()?"6":"Gecko"===navigator.product&&"frameElement"in e&&-1==navigator.userAgent.indexOf("WebKit")?"5":r.remoteHelper?"2":"0");else if(r.channel=X.xdm_c.replace(/["'<>\\]/g,""),r.secret=X.xdm_s,r.remote=X.xdm_e.replace(/["'<>\\]/g,""),o=X.xdm_p,r.acl&&!S(r.acl,r.remote))throw new Error("Access denied for "+r.remote);switch(r.protocol=o,o){case"0":if(w(r,{interval:100,delay:2e3,useResize:!0,useParent:!1,usePolling:!1},!0),r.isHost){if(!r.local){for(var s,c=n.protocol+"//"+n.host,l=t.body.getElementsByTagName("img"),p=l.length;p--;)if(s=l[p],s.src.substring(0,c.length)===c){r.local=s.src;break}r.local||(r.local=e)}var d={xdm_c:r.channel,xdm_p:0};r.local===e?(r.usePolling=!0,r.useParent=!0,r.local=n.protocol+"//"+n.host+n.pathname+n.search,d.xdm_e=r.local,d.xdm_pa=1):d.xdm_e=v(r.local),r.container&&(r.useResize=!1,d.xdm_po=1),r.remote=y(r.remote,d)}else w(r,{channel:X.xdm_c,remote:X.xdm_e,useParent:!k(X.xdm_pa),usePolling:!k(X.xdm_po),useResize:r.useParent?!1:r.useResize});i=[new M.stack.HashTransport(r),new M.stack.ReliableBehavior({}),new M.stack.QueueBehavior({encode:!0,maxLength:4e3-r.remote.length}),new M.stack.VerifyBehavior({initiate:r.isHost})];break;case"1":i=[new M.stack.PostMessageTransport(r)];break;case"2":r.isHost&&(r.remoteHelper=v(r.remoteHelper)),i=[new M.stack.NameTransport(r),new M.stack.QueueBehavior,new M.stack.VerifyBehavior({initiate:r.isHost})];break;case"3":i=[new M.stack.NixTransport(r)];break;case"4":i=[new M.stack.SameOriginTransport(r)];break;case"5":i=[new M.stack.FrameElementTransport(r)];break;case"6":E||u(),i=[new M.stack.FlashTransport(r)]}return i.push(new M.stack.QueueBehavior({lazy:r.lazy,remove:!0})),i}function O(e){for(var t,n={incoming:function(e,t){this.up.incoming(e,t)},outgoing:function(e,t){this.down.outgoing(e,t)},callback:function(e){this.up.callback(e)},init:function(){this.down.init()},destroy:function(){this.down.destroy()}},r=0,i=e.length;i>r;r++)t=e[r],w(t,n,!0),0!==r&&(t.down=e[r-1]),r!==i-1&&(t.up=e[r+1]);return t}function T(e){e.up.down=e.down,e.down.up=e.up,e.up=e.down=null}var A,E,j,R,I,F=this,U=Math.floor(1e4*Math.random()),L=Function.prototype,K=/^((http.?:)\/\/([^:\/\s]+)(:\d+)*)/,B=/[\-\w]+\/\.\.\//,N=/([^:])\/\//g,C="",M={},P=e.easyXDM,D="easyXDM_",q=!1;if(a(e,"addEventListener"))R=function(e,t,n){e.addEventListener(t,n,!1)},I=function(e,t,n){e.removeEventListener(t,n,!1)};else{if(!a(e,"attachEvent"))throw new Error("Browser not supported");R=function(e,t,n){e.attachEvent("on"+t,n)},I=function(e,t,n){e.detachEvent("on"+t,n)}}var z,W=!1,H=[];if("readyState"in t?(z=t.readyState,W="complete"==z||~navigator.userAgent.indexOf("AppleWebKit/")&&("loaded"==z||"interactive"==z)):W=!!t.body,!W){if(a(e,"addEventListener"))R(t,"DOMContentLoaded",l);else if(R(t,"readystatechange",function(){"complete"==t.readyState&&l()}),t.documentElement.doScroll&&e===top){var J=function G(){if(!W){try{t.documentElement.doScroll("left")}catch(e){return r(G,1),void 0}l()}};J()}R(e,"load",l)}var X=function(e){e=e.substring(1).split("&");for(var t,n={},r=e.length;r--;)t=e[r].split("="),n[t[0]]=i(t[1]);return n}(/xdm_e=/.test(n.search)?n.search:n.hash),V=function(){var e={},t={a:[1,2,3]},n='{"a":[1,2,3]}';return"undefined"!=typeof JSON&&"function"==typeof JSON.stringify&&JSON.stringify(t).replace(/\s/g,"")===n?JSON:(Object.toJSON&&Object.toJSON(t).replace(/\s/g,"")===n&&(e.stringify=Object.toJSON),"function"==typeof String.prototype.evalJSON&&(t=n.evalJSON(),t.a&&3===t.a.length&&3===t.a[2]&&(e.parse=function(e){return e.evalJSON()})),e.stringify&&e.parse?(V=function(){return e},e):null)};w(M,{version:"2.4.19.3",query:X,stack:{},apply:w,getJSONObject:V,whenReady:p,noConflict:f}),M.DomHelper={on:R,un:I,requiresJSON:function(n){s(e,"JSON")||t.write('<script type="text/javascript" src="'+n+'"></script>')}},function(){var e={};M.Fn={set:function(t,n){e[t]=n},get:function(t,n){if(e.hasOwnProperty(t)){var r=e[t];return n&&delete e[t],r}}}}(),M.Socket=function(e){var t=O(x(e).concat([{incoming:function(t,n){e.onMessage(t,n)},callback:function(t){e.onReady&&e.onReady(t)}}])),n=g(e.remote);this.origin=g(e.remote),this.destroy=function(){t.destroy()},this.postMessage=function(e){t.outgoing(e,n)},t.init()},M.Rpc=function(e,t){if(t.local)for(var n in t.local)if(t.local.hasOwnProperty(n)){var r=t.local[n];"function"==typeof r&&(t.local[n]={method:r})}var i=O(x(e).concat([new M.stack.RpcBehavior(this,t),{callback:function(t){e.onReady&&e.onReady(t)}}]));this.origin=g(e.remote),this.destroy=function(){i.destroy()},i.init()},M.stack.SameOriginTransport=function(e){var t,i,o,a;return t={outgoing:function(e,t,n){o(e),n&&n()},destroy:function(){i&&(i.parentNode.removeChild(i),i=null)},onDOMReady:function(){a=g(e.remote),e.isHost?(w(e.props,{src:y(e.remote,{xdm_e:n.protocol+"//"+n.host+n.pathname,xdm_c:e.channel,xdm_p:4}),name:D+e.channel+"_provider"}),i=_(e),M.Fn.set(e.channel,function(e){return o=e,r(function(){t.up.callback(!0)},0),function(e){t.up.incoming(e,a)}})):(o=d().Fn.get(e.channel,!0)(function(e){t.up.incoming(e,a)}),r(function(){t.up.callback(!0)},0))},init:function(){p(t.onDOMReady,t)}}},M.stack.FlashTransport=function(e){function i(e){r(function(){s.up.incoming(e,u)},0)}function a(n){var r=e.swf+"?host="+e.isHost,i="easyXDM_swf_"+Math.floor(1e4*Math.random());M.Fn.set("flash_loaded"+n.replace(/[\-.]/g,"_"),function(){M.stack.FlashTransport[n].swf=l=d.firstChild;for(var e=M.stack.FlashTransport[n].queue,t=0;t<e.length;t++)e[t]();e.length=0}),e.swfContainer?d="string"==typeof e.swfContainer?t.getElementById(e.swfContainer):e.swfContainer:(d=t.createElement("div"),w(d.style,j&&e.swfNoThrottle?{height:"20px",width:"20px",position:"fixed",right:0,top:0}:{height:"1px",width:"1px",position:"absolute",overflow:"hidden",right:0,top:0}),t.body.appendChild(d));var a="callback=flash_loaded"+o(n.replace(/[\-.]/g,"_"))+"&proto="+F.location.protocol+"&domain="+o(m(F.location.href))+"&port="+o(h(F.location.href))+"&ns="+o(C);d.innerHTML="<object height='20' width='20' type='application/x-shockwave-flash' id='"+i+"' data='"+r+"'><param name='allowScriptAccess' value='always'></param><param name='wmode' value='transparent'><param name='movie' value='"+r+"'></param><param name='flashvars' value='"+a+"'></param><embed type='application/x-shockwave-flash' FlashVars='"+a+"' allowScriptAccess='always' wmode='transparent' src='"+r+"' height='1' width='1'></embed></object>"}var s,c,u,l,d;return s={outgoing:function(t,n,r){l.postMessage(e.channel,t.toString()),r&&r()},destroy:function(){try{l.destroyChannel(e.channel)}catch(t){}l=null,c&&(c.parentNode.removeChild(c),c=null)},onDOMReady:function(){u=e.remote,M.Fn.set("flash_"+e.channel+"_init",function(){r(function(){s.up.callback(!0)})}),M.Fn.set("flash_"+e.channel+"_onMessage",i),e.swf=v(e.swf);var t=m(e.swf),o=function(){M.stack.FlashTransport[t].init=!0,l=M.stack.FlashTransport[t].swf,l.createChannel(e.channel,e.secret,g(e.remote),e.isHost),e.isHost&&(j&&e.swfNoThrottle&&w(e.props,{position:"fixed",right:0,top:0,height:"20px",width:"20px"}),w(e.props,{src:y(e.remote,{xdm_e:g(n.href),xdm_c:e.channel,xdm_p:6,xdm_s:e.secret}),name:D+e.channel+"_provider"}),c=_(e))};M.stack.FlashTransport[t]&&M.stack.FlashTransport[t].init?o():M.stack.FlashTransport[t]?M.stack.FlashTransport[t].queue.push(o):(M.stack.FlashTransport[t]={queue:[o]},a(t))},init:function(){p(s.onDOMReady,s)}}},M.stack.PostMessageTransport=function(t){function i(e){if(e.origin)return g(e.origin);if(e.uri)return g(e.uri);if(e.domain)return n.protocol+"//"+e.domain;throw"Unable to retrieve the origin of the event"}function o(e){var n=i(e);n==u&&e.data.substring(0,t.channel.length+1)==t.channel+" "&&a.up.incoming(e.data.substring(t.channel.length+1),n)}var a,s,c,u;return a={outgoing:function(e,n,r){c.postMessage(t.channel+" "+e,n||u),r&&r()},destroy:function(){I(e,"message",o),s&&(c=null,s.parentNode.removeChild(s),s=null)},onDOMReady:function(){if(u=g(t.remote),t.isHost){var i=function l(n){n.data==t.channel+"-ready"&&(c="postMessage"in s.contentWindow?s.contentWindow:s.contentWindow.document,I(e,"message",l),R(e,"message",o),r(function(){a.up.callback(!0)},0))};R(e,"message",i),w(t.props,{src:y(t.remote,{xdm_e:g(n.href),xdm_c:t.channel,xdm_p:1}),name:D+t.channel+"_provider"}),s=_(t)}else R(e,"message",o),c="postMessage"in e.parent?e.parent:e.parent.document,c.postMessage(t.channel+"-ready",u),r(function(){a.up.callback(!0)},0)},init:function(){p(a.onDOMReady,a)}}},M.stack.FrameElementTransport=function(i){var o,a,s,c;return o={outgoing:function(e,t,n){s.call(this,e),n&&n()},destroy:function(){a&&(a.parentNode.removeChild(a),a=null)},onDOMReady:function(){c=g(i.remote),i.isHost?(w(i.props,{src:y(i.remote,{xdm_e:g(n.href),xdm_c:i.channel,xdm_p:5}),name:D+i.channel+"_provider"}),a=_(i),a.fn=function(e){return delete a.fn,s=e,r(function(){o.up.callback(!0)},0),function(e){o.up.incoming(e,c)}}):(t.referrer&&g(t.referrer)!=X.xdm_e&&(e.top.location=X.xdm_e),s=e.frameElement.fn(function(e){o.up.incoming(e,c)}),o.up.callback(!0))},init:function(){p(o.onDOMReady,o)}}},M.stack.NameTransport=function(e){function t(t){var n=e.remoteHelper+(s?"#_3":"#_2")+e.channel;c.contentWindow.sendMessage(t,n)}function n(){s?2!==++l&&s||a.up.callback(!0):(t("ready"),a.up.callback(!0))}function i(e){a.up.incoming(e,f)}function o(){d&&r(function(){d(!0)},0)}var a,s,c,u,l,d,f,m;return a={outgoing:function(e,n,r){d=r,t(e)},destroy:function(){c.parentNode.removeChild(c),c=null,s&&(u.parentNode.removeChild(u),u=null)},onDOMReady:function(){s=e.isHost,l=0,f=g(e.remote),e.local=v(e.local),s?(M.Fn.set(e.channel,function(t){s&&"ready"===t&&(M.Fn.set(e.channel,i),n())}),m=y(e.remote,{xdm_e:e.local,xdm_c:e.channel,xdm_p:2}),w(e.props,{src:m+"#"+e.channel,name:D+e.channel+"_provider"}),u=_(e)):(e.remoteHelper=e.remote,M.Fn.set(e.channel,i));var t=function a(){var t=c||this;I(t,"load",a),M.Fn.set(e.channel+"_load",o),function i(){"function"==typeof t.contentWindow.sendMessage?n():r(i,50)}()};c=_({props:{src:e.local+"#_4"+e.channel},onLoad:t})},init:function(){p(a.onDOMReady,a)}}},M.stack.HashTransport=function(t){function n(e){if(h){var n=t.remote+"#"+f++ +"_"+e;(c||!v?h.contentWindow:h).location=n}}function i(e){d=e,s.up.incoming(d.substring(d.indexOf("_")+1),y)}function o(){if(m){var e=m.location.href,t="",n=e.indexOf("#");-1!=n&&(t=e.substring(n)),t&&t!=d&&i(t)}}function a(){u=setInterval(o,l)}var s,c,u,l,d,f,m,h,v,y;return s={outgoing:function(e){n(e)
},destroy:function(){e.clearInterval(u),(c||!v)&&h.parentNode.removeChild(h),h=null},onDOMReady:function(){if(c=t.isHost,l=t.interval,d="#"+t.channel,f=0,v=t.useParent,y=g(t.remote),c){if(w(t.props,{src:t.remote,name:D+t.channel+"_provider"}),v)t.onLoad=function(){m=e,a(),s.up.callback(!0)};else{var n=0,i=t.delay/50;!function o(){if(++n>i)throw new Error("Unable to reference listenerwindow");try{m=h.contentWindow.frames[D+t.channel+"_consumer"]}catch(e){}m?(a(),s.up.callback(!0)):r(o,50)}()}h=_(t)}else m=e,a(),v?(h=parent,s.up.callback(!0)):(w(t,{props:{src:t.remote+"#"+t.channel+new Date,name:D+t.channel+"_consumer"},onLoad:function(){s.up.callback(!0)}}),h=_(t))},init:function(){p(s.onDOMReady,s)}}},M.stack.ReliableBehavior=function(){var e,t,n=0,r=0,i="";return e={incoming:function(o,a){var s=o.indexOf("_"),c=o.substring(0,s).split(",");o=o.substring(s+1),c[0]==n&&(i="",t&&t(!0)),o.length>0&&(e.down.outgoing(c[1]+","+n+"_"+i,a),r!=c[1]&&(r=c[1],e.up.incoming(o,a)))},outgoing:function(o,a,s){i=o,t=s,e.down.outgoing(r+","+ ++n+"_"+o,a)}}},M.stack.QueueBehavior=function(e){function t(){if(e.remove&&0===s.length)return T(n),void 0;if(!c&&0!==s.length&&!a){c=!0;var i=s.shift();n.down.outgoing(i.data,i.origin,function(e){c=!1,i.callback&&r(function(){i.callback(e)},0),t()})}}var n,a,s=[],c=!0,u="",l=0,p=!1,d=!1;return n={init:function(){k(e)&&(e={}),e.maxLength&&(l=e.maxLength,d=!0),e.lazy?p=!0:n.down.init()},callback:function(e){c=!1;var r=n.up;t(),r.callback(e)},incoming:function(t,r){if(d){var o=t.indexOf("_"),a=parseInt(t.substring(0,o),10);u+=t.substring(o+1),0===a&&(e.encode&&(u=i(u)),n.up.incoming(u,r),u="")}else n.up.incoming(t,r)},outgoing:function(r,i,a){e.encode&&(r=o(r));var c,u=[];if(d){for(;0!==r.length;)c=r.substring(0,l),r=r.substring(c.length),u.push(c);for(;c=u.shift();)s.push({data:u.length+"_"+c,origin:i,callback:0===u.length?a:null})}else s.push({data:r,origin:i,callback:a});p?n.down.init():t()},destroy:function(){a=!0,n.down.destroy()}}},M.stack.VerifyBehavior=function(e){function t(){r=Math.random().toString(16).substring(2),n.down.outgoing(r)}var n,r,i;return n={incoming:function(o,a){var s=o.indexOf("_");-1===s?o===r?n.up.callback(!0):i||(i=o,e.initiate||t(),n.down.outgoing(o)):o.substring(0,s)===i&&n.up.incoming(o.substring(s+1),a)},outgoing:function(e,t,i){n.down.outgoing(r+"_"+e,t,i)},callback:function(){e.initiate&&t()}}},M.stack.RpcBehavior=function(e,t){function n(e){e.jsonrpc="2.0",o.down.outgoing(a.stringify(e))}function r(e,t){var r=Array.prototype.slice;return function(){var i,o=arguments.length,a={method:t};o>0&&"function"==typeof arguments[o-1]?(o>1&&"function"==typeof arguments[o-2]?(i={success:arguments[o-2],error:arguments[o-1]},a.params=r.call(arguments,0,o-2)):(i={success:arguments[o-1]},a.params=r.call(arguments,0,o-1)),u[""+ ++s]=i,a.id=s):a.params=r.call(arguments,0),e.namedParams&&1===a.params.length&&(a.params=a.params[0]),n(a)}}function i(e,t,r,i){if(!r)return t&&n({id:t,error:{code:-32601,message:"Procedure not found."}}),void 0;var o,a;t?(o=function(e){o=L,n({id:t,result:e})},a=function(e,r){a=L;var i={id:t,error:{code:-32099,message:e}};r&&(i.error.data=r),n(i)}):o=a=L,c(i)||(i=[i]);try{var s=r.method.apply(r.scope,i.concat([o,a]));k(s)||o(s)}catch(u){a(u.message)}}var o,a=t.serializer||V(),s=0,u={};return o={incoming:function(e){var r=a.parse(e);if(r.method)t.handle?t.handle(r,n):i(r.method,r.id,t.local[r.method],r.params);else{var o=u[r.id];r.error?o.error&&o.error(r.error):o.success&&o.success(r.result),delete u[r.id]}},init:function(){if(t.remote)for(var n in t.remote)t.remote.hasOwnProperty(n)&&(e[n]=r(t.remote[n],n));o.down.init()},destroy:function(){for(var n in t.remote)t.remote.hasOwnProperty(n)&&e.hasOwnProperty(n)&&delete e[n];o.down.destroy()}}},F.easyXDM=M}(window,document,location,window.setTimeout,decodeURIComponent,encodeURIComponent),easyXDM.noConflict("Kakao")}()},{}],23:[function(t,n){(function(r,i){(function(){"use strict";function o(e){return"function"==typeof e||"object"===("undefined"==typeof e?"undefined":_typeof(e))&&null!==e}function a(e){return"function"==typeof e}function s(e){return"object"===("undefined"==typeof e?"undefined":_typeof(e))&&null!==e}function c(e,t){et[X]=e,et[X+1]=t,X+=2,2===X&&H()}function u(){var e=r.nextTick,t=r.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);return Array.isArray(t)&&"0"===t[1]&&"10"===t[2]&&(e=setImmediate),function(){e(m)}}function l(){return function(){W(m)}}function p(){var e=0,t=new Y(m),n=document.createTextNode("");return t.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function d(){var e=new MessageChannel;return e.port1.onmessage=m,function(){e.port2.postMessage(0)}}function f(){return function(){setTimeout(m,1)}}function m(){for(var e=0;X>e;e+=2){var t=et[e],n=et[e+1];t(n),et[e]=void 0,et[e+1]=void 0}X=0}function h(){try{var e=t,n=e("vertx");return W=n.runOnLoop||n.runOnContext,l()}catch(r){return f()}}function g(){}function v(){return new TypeError("You cannot resolve a promise with itself")}function y(){return new TypeError("A promises callback cannot return that same promise.")}function k(e){try{return e.then}catch(t){return it.error=t,it}}function w(e,t,n,r){try{e.call(t,n,r)}catch(i){return i}}function b(e,t,n){V(function(e){var r=!1,i=w(n,t,function(n){r||(r=!0,t!==n?x(e,n):T(e,n))},function(t){r||(r=!0,A(e,t))},"Settle: "+(e._label||" unknown promise"));!r&&i&&(r=!0,A(e,i))},e)}function _(e,t){t._state===nt?T(e,t._result):t._state===rt?A(e,t._result):E(t,void 0,function(t){x(e,t)},function(t){A(e,t)})}function S(e,t){if(t.constructor===e.constructor)_(e,t);else{var n=k(t);n===it?A(e,it.error):void 0===n?T(e,t):a(n)?b(e,t,n):T(e,t)}}function x(e,t){e===t?A(e,v()):o(t)?S(e,t):T(e,t)}function O(e){e._onerror&&e._onerror(e._result),j(e)}function T(e,t){e._state===tt&&(e._result=t,e._state=nt,0!==e._subscribers.length&&V(j,e))}function A(e,t){e._state===tt&&(e._state=rt,e._result=t,V(O,e))}function E(e,t,n,r){var i=e._subscribers,o=i.length;e._onerror=null,i[o]=t,i[o+nt]=n,i[o+rt]=r,0===o&&e._state&&V(j,e)}function j(e){var t=e._subscribers,n=e._state;if(0!==t.length){for(var r,i,o=e._result,a=0;a<t.length;a+=3)r=t[a],i=t[a+n],r?F(n,r,i,o):i(o);e._subscribers.length=0}}function R(){this.error=null}function I(e,t){try{return e(t)}catch(n){return ot.error=n,ot}}function F(e,t,n,r){var i,o,s,c,u=a(n);if(u){if(i=I(n,r),i===ot?(c=!0,o=i.error,i=null):s=!0,t===i)return A(t,y()),void 0}else i=r,s=!0;t._state!==tt||(u&&s?x(t,i):c?A(t,o):e===nt?T(t,i):e===rt&&A(t,i))}function U(e,t){try{t(function(t){x(e,t)},function(t){A(e,t)})}catch(n){A(e,n)}}function L(e,t){var n=this;n._instanceConstructor=e,n.promise=new e(g),n._validateInput(t)?(n._input=t,n.length=t.length,n._remaining=t.length,n._init(),0===n.length?T(n.promise,n._result):(n.length=n.length||0,n._enumerate(),0===n._remaining&&T(n.promise,n._result))):A(n.promise,n._validationError())}function K(e){return new at(this,e).promise}function B(e){function t(e){x(i,e)}function n(e){A(i,e)}var r=this,i=new r(g);if(!J(e))return A(i,new TypeError("You must pass an array to race.")),i;for(var o=e.length,a=0;i._state===tt&&o>a;a++)E(r.resolve(e[a]),void 0,t,n);return i}function N(e){var t=this;if(e&&"object"===("undefined"==typeof e?"undefined":_typeof(e))&&e.constructor===t)return e;var n=new t(g);return x(n,e),n}function C(e){var t=this,n=new t(g);return A(n,e),n}function M(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function P(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}function D(e){this._id=pt++,this._state=void 0,this._result=void 0,this._subscribers=[],g!==e&&(a(e)||M(),this instanceof D||P(),U(this,e))}function q(){var e;if("undefined"!=typeof i)e=i;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(t){throw new Error("polyfill failed because global object is unavailable in this environment")}var n=e.Promise;(!n||"[object Promise]"!==Object.prototype.toString.call(n.resolve())||n.cast)&&(e.Promise=dt)}var z;z=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)};var W,H,J=z,X=0,V=({}.toString,c),G="undefined"!=typeof window?window:void 0,Q=G||{},Y=Q.MutationObserver||Q.WebKitMutationObserver,$="undefined"!=typeof r&&"[object process]"==={}.toString.call(r),Z="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel,et=new Array(1e3);H=$?u():Y?p():Z?d():void 0===G&&"function"==typeof t?h():f();var tt=void 0,nt=1,rt=2,it=new R,ot=new R;L.prototype._validateInput=function(e){return J(e)},L.prototype._validationError=function(){return new Error("Array Methods must be provided an Array")},L.prototype._init=function(){this._result=new Array(this.length)};var at=L;L.prototype._enumerate=function(){for(var e=this,t=e.length,n=e.promise,r=e._input,i=0;n._state===tt&&t>i;i++)e._eachEntry(r[i],i)},L.prototype._eachEntry=function(e,t){var n=this,r=n._instanceConstructor;s(e)?e.constructor===r&&e._state!==tt?(e._onerror=null,n._settledAt(e._state,t,e._result)):n._willSettleAt(r.resolve(e),t):(n._remaining--,n._result[t]=e)},L.prototype._settledAt=function(e,t,n){var r=this,i=r.promise;i._state===tt&&(r._remaining--,e===rt?A(i,n):r._result[t]=n),0===r._remaining&&T(i,r._result)},L.prototype._willSettleAt=function(e,t){var n=this;E(e,void 0,function(e){n._settledAt(nt,t,e)},function(e){n._settledAt(rt,t,e)})};var st=K,ct=B,ut=N,lt=C,pt=0,dt=D;D.all=st,D.race=ct,D.resolve=ut,D.reject=lt,D.prototype={constructor:D,then:function(e,t){var n=this,r=n._state;if(r===nt&&!e||r===rt&&!t)return this;var i=new this.constructor(g),o=n._result;if(r){var a=arguments[r-1];V(function(){F(r,i,a,o)})}else E(n,i,e,t);return i},"catch":function(e){return this.then(null,e)}};var ft=q,mt={Promise:dt,polyfill:ft};"function"==typeof e&&e.amd?e(function(){return mt}):"undefined"!=typeof n&&n.exports?n.exports=mt:"undefined"!=typeof this&&(this.ES6Promise=mt),ft()}).call(this)}).call(this,t("_process"),"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{_process:1}],24:[function(e,t){t.exports=function(){var e=function(e){function t(e){var t={},r=/(dolfin)[ \/]([\w.]+)/.exec(e)||/(edge)[ \/]([\w.]+)/.exec(e)||/(chrome)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(webkit)(?:.*version)?[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(e)||["","unknown"];return"webkit"===r[1]?r=/(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(e)||/(android)[ \/]([\w._\-]+);/.exec(e)||[r[0],"safari",r[2]]:"mozilla"===r[1]?r[1]=/trident/.test(e)?"msie":"firefox":"edge"===r[1]?r[1]="spartan":/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(e)&&(r[1]="polaris"),t[r[1]]=!0,t.name=r[1],t.version=n(r[2]),t}function n(e){var t={},n=e?e.split(/\.|-|_/):["0","0","0"];return t.info=n.join("."),t.major=n[0]||"0",t.minor=n[1]||"0",t.patch=n[2]||"0",t}function r(e){return i(e)?"pc":o(e)?"tablet":a(e)?"mobile":""}function i(e){return e.match(/linux|windows (nt|98)|macintosh/)&&!e.match(/android|mobile|polaris|lgtelecom|uzard|natebrowser|ktf;|skt;/)?!0:!1}function o(e){return e.match(/ipad/)||e.match(/android/)&&!e.match(/mobi|mini|fennec/)?!0:!1}function a(e){return e.match(/ip(hone|od)|android.+mobile|windows (ce|phone)|blackberry|bb10|symbian|webos|firefox.+fennec|opera m(ob|in)i|polaris|iemobile|lgtelecom|nokia|sonyericsson|dolfin|uzard|natebrowser|ktf;|skt;/)?!0:!1}function s(e){var t={},r=/(iphone|ipad|ipod)[\S\s]*os ([\w._\-]+) like/.exec(e)||/(android)[ \/]([\w._\-]+);/.exec(e)||(/android/.test(e)?["","android","0.0.0"]:!1)||(/polaris|natebrowser|([010|011|016|017|018|019]{3}\d{3,4}\d{4}$)/.test(e)?["","polaris","0.0.0"]:!1)||/(windows)(?: nt | phone(?: os){0,1} | )([\w._\-]+)/.exec(e)||(/(windows)/.test(e)?["","windows","0.0.0"]:!1)||/(mac) os x ([\w._\-]+)/.exec(e)||(/(linux)/.test(e)?["","linux","0.0.0"]:!1)||(/webos/.test(e)?["","webos","0.0.0"]:!1)||/(bada)[ \/]([\w._\-]+)/.exec(e)||(/bada/.test(e)?["","bada","0.0.0"]:!1)||(/(rim|blackberry|bb10)/.test(e)?["","blackberry","0.0.0"]:!1)||["","unknown","0.0.0"];return"iphone"===r[1]||"ipad"===r[1]||"ipod"===r[1]?r[1]="ios":"windows"===r[1]&&"98"===r[2]&&(r[2]="0.98.0"),t[r[1]]=!0,t.name=r[1],t.version=n(r[2]),t}function c(e){var t={},r=/(crios)[ \/]([\w.]+)/.exec(e)||/(daumapps)[ \/]([\w.]+)/.exec(e)||["",""];return r[1]?(t.isApp=!0,t.name=r[1],t.version=n(r[2])):t.isApp=!1,t}return e=(e||window.navigator.userAgent).toString().toLowerCase(),{ua:e,browser:t(e),platform:r(e),os:s(e),app:c(e)}};return e}()},{}],25:[function(e,t){t.exports=function(){function t(e){window.location.href=e}function n(e){var n="function"==typeof e.willInvokeApp?e.willInvokeApp:function(){},o="function"==typeof e.onAppMissing?e.onAppMissing:t,c="function"==typeof e.onUnsupportedEnvironment?e.onUnsupportedEnvironment:function(){};n(),w.android?r()&&e.intentURI&&!e.useUrlScheme?a(e.intentURI):e.storeURL&&i(e.urlScheme,e.storeURL,o):w.ios&&e.storeURL?s(e.urlScheme,e.storeURL,o,e.universalLink):setTimeout(function(){c()},100)}function r(){var e=k.browser.chrome&&+k.browser.version.major>=25,t=new RegExp(b.join("|"),"i"),n=new RegExp(_.join("|"),"i");return e&&!t.test(k.ua)||n.test(k.ua)}function i(e,t,n){o(v,t,n),d(e)}function o(e,t,n){var r=(new Date).getTime();return setTimeout(function(){var i=(new Date).getTime();l()&&e+y>i-r&&n(t)},e)}function a(e){function t(){top.location.href=e}k.browser.chrome?t():setTimeout(t,100)}function s(e,t,n,r){var i=o(g,t,n);parseInt(k.os.version.major,10)<8?c(i):u(i),m()?(void 0===r?r=e:clearTimeout(i),p(r)):d(e)}function c(e){window.addEventListener("pagehide",function t(){l()&&(clearTimeout(e),window.removeEventListener("pagehide",t))})}function u(e){document.addEventListener("visibilitychange",function t(){l()&&(clearTimeout(e),document.removeEventListener("visibilitychange",t))})}function l(){for(var e=["hidden","webkitHidden"],t=0,n=e.length;n>t;t++)if("undefined"!=typeof document[e[t]])return!document[e[t]];return!0}function p(e){window.top.location.replace(e)}function d(e){setTimeout(function(){var t=f("appLauncher");t.src=e},100)}function f(e){var t=document.createElement("iframe");return t.id=e,t.style.border="none",t.style.width="0",t.style.height="0",t.style.display="none",t.style.overflow="hidden",document.body.appendChild(t),t}function m(){return parseInt(k.os.version.major,10)>8&&k.os.ios}var h=e("./userAgent.js"),g=2e3,v=300,y=100,k=h(),w=k.os,b=["firefox","opr/"],_=["KAKAOTALK"];return n}()},{"./userAgent.js":24}]},{},[16])(16)});

function contains(array, obj) {
	for(var i in array) {
		if(array[i] === obj) return true;
	}

	return false;
}

var snsDeferredObj;

var isNewApp = contains(['51','52','53','54'] ,settings.mobilAppNo);

var kakakoKey = settings.key.kakao.mssgmall;
if(isApp === 'Y') {
	if (contains(['1','2','3','4','5','28','38'],settings.mobilAppNo)) {
		kakakoKey = settings.key.kakao.memall;
	} else if (contains(['17','18','19','20','21','30','40','22','23','24'],settings.mobilAppNo)) {
		kakakoKey = settings.key.kakao.msmall;
	} else if (contains(['42','43','44','45','46','47','48'], settings.mobilAppNo)) {
		kakakoKey = settings.key.kakao.mtraders;
	} else if (contains(['55','56','57','58'], settings.mobilAppNo)) {
		kakakoKey = settings.key.kakao.mboons;
	}
}
if(isNewApp) {
	kakakoKey = settings.key.kakao.shopat;
}

Kakao.init(kakakoKey);

var SNS_SHARE_CODE = {
	LOCATION: {
		"ITEM_VIEW": "01",     //상품상세
		"ITEM_COMMENT": "02",     //상품평
		"EVENT": "03",     //이벤트
		"LIFE_MAGAZINE": "04",     //라이프매거진
		"PLANSHOP": "05",     //기획전
		"SSG_SPECIAL_PRICE": "06",     //SSG 오반장&해바
		"EXPRESS": "07",     //늘사던거
		"DELIVERY": "08",     //정기배송
		"OBANJANG": "09",     //오반장
		"FIVE_SHOPPING": "10",     //5분장보기
		"WORLD_CUISINE": "11",     //월드퀴진
		"OUTDOOR": "12",     //아웃도어
		"WORLD_SHIPPING": "13",     //해외배송
		"JAJU": "14",     //자주
		"PEACOCK": "15",     //피코크
		"BEST": "17",     //베스트
		"GIFT_CERTIFICATE": "18",     //신세계상품권
		"BEEF_CHOICE": "19",     //한우골라담기
		"GIFT_SHOP": "20",     //명절매장
		"HAPPY_PICK": "21",     //골라담기
		"SALE": "22",     //세일중
		"FRESH_MEAT": "23",     //온라인정육점
		"FRESH_REGION": "24",     //지역특산품
		"OWN_BRAND": "25",     //독자브랜드
		"PIZZA": "26",     //이마트피자
		"CPN_GIFT": "27",     //쿠폰선물하기
		"ORGANIC": "28",      //유기농
		"MY_GIFT":"29",     //내가받고싶은 선물
		"MAGAZINE": "04",	//매거진 공통용 코드
		"INVENT" : "05", 	//생활의 발명 (이몰 기획전)공통용 코드
		"RECIPE" : "10",	//오늘의 E요리용 코드
	},
	TOOL: {
		"FACE_BOOK": "fb",
		"TWITTER": "tw",
		"KAKAO_TALK": "kt",
		"KAKAO_STORY": "ks",
		"PINTEREST": "pt",
		"SMS": "sms",
		"SSGTALK" : "ssgtalk"
	}
};

var SNS_CKWHERE_CODE = {
	SMALL: {
		'fb': 'facebook',
		'twit': 'twitter',
		'kakao': 'kakaotalk',
		'kakaoStory': 'kakaoStory',
		'sUrl': 'shinsegae_url',
		'pinterest': 'shinsegae_pinterest'
	},
	SSG: {
		'fb': 'ssg_face',
		'twit': 'ssg_twit',
		'kakao': 'ssg_kakao',
		'kakaoStory': 'ssg_kakaoStory',
		'sUrl': 'ssg_url',
		'pinterest': 'ssg_pinterest'
	},
	EMALL: {
		'fb': 'emart_face',
		'twit': 'emart_twit',
		'kakao': 'emart_kakao',
		'kakaoStory': 'emart_kakaoStory',
		'sUrl': 'emart_url',
		'pinterest': 'emart_pinterest'
	}
};

var DEFAULT_IMAGE = {
	SSG: 'http://static.ssgcdn.com/ui/common/img/sns/ssg.png',
	SMALL: 'http://static.ssgcdn.com/ui/common/img/sns/sm.png',
	EMALL: 'http://static.ssgcdn.com/ui/common/img/sns/em.png',
	DEPT: 'http://static.ssgcdn.com/ui/common/img/sns/sd.png',
	TR : 'http://static.ssgcdn.com/ui/common/img/sns/tr.png',
	BT : 'http://static.ssgcdn.com/ui/common/img/sns/bt.png',
	HWD : 'http://static.ssgcdn.com/ui/common/img/sns/hwd.png',
	TV : 'http://static.ssgcdn.com/ui/common/img/sns/tv.png',
	SI : 'http://static.ssgcdn.com/ui/common/img/sns/siv.png'
}

function checkImage(src) {
	var chekcImage = false;
	snsDeferredObj = new $.Deferred();

	if (src) {
		$.ajax({
			url: src
			, timeout: 3000
			, success: function (res, status, xhr) {
				var ct = xhr.getResponseHeader("content-type") || "";

				if (ct.indexOf("image") > -1) {
					chekcImage = src;
				}
			}
			, complete: function () {
				snsDeferredObj.resolve(chekcImage);
			}
		})
	} else {
		snsDeferredObj.resolve(chekcImage);
	}
}

function getDefaultImage() {
	var url = "";

	if(isApp === 'Y'){
		url = DEFAULT_IMAGE.SSG;
		if (contains(['1','2','3','4','5','28','38'],settings.mobilAppNo)) {
			url = DEFAULT_IMAGE.EMALL;
		} else if (contains(['17','18','19','20','21','30','40','22','23','24'],settings.mobilAppNo)) {
			url = DEFAULT_IMAGE.SMALL;
		} else if (contains(['42', '43', '44', '45', '46', '47', '48'], settings.mobilAppNo)) {
			url = DEFAULT_IMAGE.TR;
		} else if (contains(['61', '62', '63', '64'], settings.mobilAppNo)) {
			url = DEFAULT_IMAGE.BT;
		}
	} else {
		if (settings.siteno.clip == '6004') {
			url = DEFAULT_IMAGE.SMALL;
		} else if (settings.siteno.clip == '6009') {
			url = DEFAULT_IMAGE.DEPT;
		} else if (settings.siteno.clip == '6001') {
			url = DEFAULT_IMAGE.EMALL;
		} else if (settings.siteno.clip == '6002') {
			url = DEFAULT_IMAGE.TR;
		} else if (settings.siteno.clip == '6003') {
			url = DEFAULT_IMAGE.BT;
		} else if (settings.siteno.clip == '6100'){
			url = DEFAULT_IMAGE.HWD;
		} else if (settings.siteno.clip == '6200'){
			url = DEFAULT_IMAGE.TV;
		} else if (settings.siteno.clip == '6300'){
			url = DEFAULT_IMAGE.SI;
		} else {
			url = DEFAULT_IMAGE.SSG;
		}
	}
	return url;
}

function unescapeXml(str) {
	str = str.replace(/&amp;/g, "&");
	str = str.replace(/&lt;/g, "<");
	str = str.replace(/&gt;/g, ">");
	str = str.replace(/&apos;/g, "'");
	str = str.replace(/&quot;/g, "\"");
	str = str.replace(/&#039;/g, "'");
	return str;
}

function facebook_share_new(title, summary, image, snsCreateInfo, shareUrl, gbn) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.FACE_BOOK);
	}

	var host = location.host;
	var url = "http://" + host + "/snsGateway.ssg?";
	checkImage(image);

	var popupWin;
	if (isApp !== 'Y') {
		var w = 626;
		var h = 436;
		var obj = getCenter(w, h);
		popupWin = window.open('', '', 'toolbar=0, status=0, width=' + w + ', height=' + h + ', top=' + obj.top + ',left=' + obj.left);
	}

	$.when(snsDeferredObj).then(function (image) {
		image = image || getDefaultImage();

		var fbUrl = "";
		if (isMobile) {
			shareUrl = addAppCheckUrl(shareUrl);
			fbUrl = 'http://m.facebook.com/sharer.php?';
		} else {
			fbUrl = 'http://www.facebook.com/sharer.php?';
		}

		var linkUrl = getCkwhereUrl(shareUrl, 'fb');

		var arr = [];
		summary = summary.substring(0, 100);
		summary = unescapeXml(summary);

		arr.push("url=" + encodeURIComponent(linkUrl));
		arr.push("img=" + encodeURIComponent(image));
		arr.push("title=" + encodeURIComponent(title));
		arr.push("summary=" + encodeURIComponent(summary));

		url += arr.join("&");
		var param = encodeURIComponent(url);

		if (isApp === 'Y') {
			param = encodeURIComponent(param);
		}

		fbUrl += ('u=' + param);

		createSnsClickInfo('92', snsCreateInfo);

		if (isApp === 'Y') {
			appPopup(fbUrl);
		} else {
			if (popupWin) popupWin.location.href = fbUrl;
		}
	})

	return popupWin ? true : false;
}

/*
 * TODO : 핀터레스트 공유하기 제거에 따라 shareJs 기능 삭제 예정
 */
function pinterest_share_new(title, summary, image, shareUrl, gbn) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.PINTEREST);
	}

	if (gbn == 'ITEM_VIEW') {
		image = image.replace("_240.jpg", "_500.jpg");
	}

	var url = "https://www.pinterest.com/pin/create/button/?";
	checkImage(image);

	var popupWin;
	if (isApp !== 'Y') {
		var w = 626;
		var h = 436;
		var obj = getCenter(w, h);
		popupWin = window.open('', '', 'toolbar=0, status=0, width=' + w + ', height=' + h + ', top=' + obj.top + ',left=' + obj.left);
	}

	$.when(snsDeferredObj).then(function (image) {

		image = image || getDefaultImage();

		var linkUrl = getCkwhereUrl(shareUrl, 'pinterest');

		var arr = [];
		var status = summary + ' ' + title;
		status = status.substring(0, 100);
		status = unescapeXml(status);

		arr.push("url=" + encodeURIComponent(linkUrl));
		arr.push("media=" + encodeURIComponent(image));
		arr.push("description=" + encodeURIComponent(status));

		var param = arr.join("&");

		if (isApp === 'Y') {
			param = encodeURIComponent(param);
		}

		url += param;

		if (isApp === 'Y') {
			appPopup(url);
		} else {
			if (popupWin) popupWin.location.href = url;
		}
	})

	return popupWin ? true : false;
}

function twitter_share_new(title, summary, snsCreateInfo, shareUrl, gbn) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.TWITTER);
	}

	var url = 'http://twitter.com/share?';

	if( isMobile ) {
		shareUrl = addAppCheckUrl(shareUrl);
	}

	var linkUrl = getUrl_new(getCkwhereUrl(shareUrl, 'twit'));

	var status = title + ' ' + summary;

	var arr = [];
	status = status.substring(0, 100);
	status = unescapeXml(status);

	arr.push("url=" + encodeURIComponent(linkUrl));
	arr.push("text=" + encodeURIComponent(status));
	var param = arr.join("&");

	url += param;

	createSnsClickInfo('91', snsCreateInfo);

	if (isApp === 'Y') {
		appBroswer(url);
	} else {
		var w = 626;
		var h = 436;
		var obj = getCenter(w, h);
		var popupWin = window.open(url, '', 'toolbar=0, status=0, width=' + w + ', height=' + h + ', top=' + obj.top + ',left=' + obj.left);
		return popupWin ? true : false;
	}
}

function kakaoTalk_origin(appname, msg, url, gbn) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.KAKAO_TALK);
	}

	var ref = getUrl_new(getCkwhereUrl(url, 'kakao'));
	Kakao.Link.sendTalkLink({
		label: "[" + appname + "]\r\n" + msg,
		webLink: {
			text: ref,
			url: ref
		}
	});
}

function kakaoTalk_new(appname, msg, img, url, gbn, callback) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.KAKAO_TALK);
	}

	if (gbn == 'ITEM_VIEW') {
		img = img.replace("_240.jpg", "_500.jpg");
	}

	var ref = getUrl_new(getCkwhereUrl(url, 'kakao'));

	checkImage(img);

	$.when(snsDeferredObj).then(function (img) {
		img = img || getDefaultImage();

		var image = new Image();
		image.src = img;

		msg = unescapeXml(msg);
		image.onload = function () {
			var param =  {
					objectType: 'feed',
					content: {
						title:  appname + "\r\n" + msg,
						imageUrl: img,
						link: {
							mobileWebUrl: ref,
							webUrl : ref,
							androidExecParams: 'act=open_url&target=self&url=' + encodeURIComponent(url) + '&where=kakao', //안드로이드는 where파라미터를 ckwhere로 사용함.
							iosExecParams: 'act=open_url&target=self&url=' + encodeURIComponent(url) + '&ckwhere=kakao'
						},
						imageWidth: this.width,
						imageHeight: this.height
					},
					buttons: [
						{
							title: '웹으로 보기',
							link: {
								mobileWebUrl: ref,
								webUrl : ref
							}
						},
						{
							title: '앱으로 보기',
							link: {
								androidExecParams: 'act=open_url&target=self&url=' + encodeURIComponent(url) + '&where=kakao', //안드로이드는 where파라미터를 ckwhere로 사용함.
								iosExecParams: 'act=open_url&target=self&url=' + encodeURIComponent(url) + '&ckwhere=kakao'
							}
						}
					],
					installTalk: true
				}

			if (settings.UserInfo.mbrTypeCd == '81' || location.hostname.indexOf("thehowdy") > 0 ) {
				delete param.content.link.androidExecParams;
				delete param.content.link.iosExecParams;
				param.buttons.splice(1, 1);
			}

			if(typeof callback == "function") {
				param.callback = callback;
			}

			Kakao.Link.sendDefault(param);
		}
	});
}

/*
 * TODO : 카카오스토리 공유하기 제거에 따라 shareJs 기능 삭제 예정
 */
function kakaoStory_new(title, summary, image, shareUrl, gbn) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.KAKAO_STORY);
	}

	var host = location.host;
	var url = "http://" + host + "/snsGateway.ssg?";

	checkImage(image);
	var popupWin;

	if (isApp !== 'Y') {
		var w = 530;
		var h = 480;
		var obj = getCenter(w, h);
		popupWin = window.open('', '', 'toolbar=0, status=0, width=' + w + ', height=' + h + ', top=' + obj.top + ',left=' + obj.left);
	}

	$.when(snsDeferredObj).then(function (image) {
		image = image || getDefaultImage();

		var kakaoUrl = "https://story.kakao.com/share?";

		var linkUrl = getUrl_new(getCkwhereUrl(shareUrl, 'kakaoStory'));

		title = title.substring(0, 100);
		title = unescapeXml(title);
		title = title.replace(/&(amp;)?/ig, ""); // 카스인경우 &amp; 등록시 글자 짤림

		var arr = [];
		arr.push("url=" + encodeURIComponent(linkUrl));
		arr.push("img=" + encodeURIComponent(image));
		arr.push("title=" + encodeURIComponent(title));
		arr.push("summary=" + encodeURIComponent(summary));

		url += arr.join("&");
		var param = encodeURIComponent(url);

		if (isApp === 'Y') {
			param = encodeURIComponent(param);
		}
		kakaoUrl += ('url=' + param);

		if (isApp === 'Y') {
			appPopup(kakaoUrl);
		} else {
			if (popupWin) popupWin.location.href = kakaoUrl;
		}
	})

	return popupWin ? true : false;
}

function smsShare(title, summary, image, shareUrl, gbn) {
	if (gbn) {
		wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.SMS);
	}

	//문자 위에 SSG.COM이 올 경우 IOS에서 파싱을 안해줌
	summary = summary.toUpperCase().replace("SSG.COM", "SSG");

	var desc = summary + title + ",";

	desc = unescapeXml(desc);
	desc.replace('&',''); //문자보내기인경우도 & 삭제

	if( isMobile ) {
		shareUrl = addAppCheckUrl(shareUrl);
	}

	var snsGateway = "http://" + document.domain + "/snsGateway.ssg";

	shareUrl = snsGateway + "?url=" + encodeURIComponent(shareUrl) + "&img=" + encodeURIComponent(image) + "&title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(summary);
	shareUrl = getUrl_new(shareUrl);

	//네이티브, 모웹별 분기 처리
	if (settings.UserInfo.mbrTypeCd != '81' && isApp === 'Y') {
		location.href = mobile.customUrl.prefix + "://sms_send/" + encodeURIComponent(desc) + "/" + encodeURIComponent(shareUrl);
	} else if (isIOS && isApp == "N") {
		location.href = "sms:?&body=" + desc + shareUrl;
	} else if (!isIOS && isApp == "N"){
		location.href = "sms://?body=" + desc + shareUrl;
	} else {
		return false;
	}
}

function getUrl_new(url, type) {
	var shortUrl = "";

	if (type === 'direct') {
		url = getCkwhereUrl(url, 'sUrl');
	}

	$.ajax({
		url: "/get/shortUrl.ssg",
		data: {
			url: url
		},
		async: false
	}).done(function (result) {
		if (result.resultCode === 'SUCCESS') {
			if (settings.UserInfo.mbrTypeCd != '81' && (isApp === 'Y' && type === 'direct')) {
				shortUrl = mobile.customUrl.prefix + "://clipboard/URLCopy/" + encodeURIComponent(result.result);
			} else {
				shortUrl = result.result;
			}
		} else {
			alert(result.resultMsg);
		}
	});

	return shortUrl;
}

function getCkwhereUrl(url, type) {
	// 하우디는 임시로 CkWhere 관련 parameter 없이 처리
	if (settings.siteno.clip == '6100' || settings.siteno.clip == '6200' || settings.siteno.clip == '6300'){
		return url;
	}

	var ckwhere = isMobile ? "mobile_" : "";

	if (settings.siteno.clip == '6004' || settings.siteno.clip == '6009') {
		ckwhere += SNS_CKWHERE_CODE.SMALL[type];
	} else if (settings.siteno.clip == '6005') {
		if(isMobile && isNewApp) {
			ckwhere += "sa_";
		}

		ckwhere += SNS_CKWHERE_CODE.SSG[type];
	} else if (settings.siteno.clip == '6001' || settings.siteno.clip == '6002' || settings.siteno.clip == '6003') {
		ckwhere += SNS_CKWHERE_CODE.EMALL[type];
	}

	var separator = url.indexOf('?') > -1 ? '&' : '?';
	return url + separator + "ckwhere=" + ckwhere;
}

function wiselogSnsShare(gbn) {
	$.get("/crm/snsShare.ssg?gbn=" + gbn);
}

function getCenter(w, h) {
	var obj = {
		left: "",
		top: ""
	};

	var dualScreenLeft = window.screenLeft || screen.left;
	var dualScreenTop = window.screenTop || screen.top;
	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
	obj.left = ((width / 2) - (w / 2)) + dualScreenLeft - 20;
	obj.top = ((height / 2) - (h / 2)) + dualScreenTop + 30;

	return obj;
}


/* SNS 클릭 정보를 저장함.
- attnDivDtlCd : 관심상세구분코드 : SNS 유형
 */
function createSnsClickInfo(attnDivDtlCd, snsCreateInfo) {
	if (typeof(snsCreateInfo) === 'object' && snsCreateInfo.itemId) {
		var addInfo = snsCreateInfo.addInfo || '';

		$.ajax({
			url: '/clip/insertClip.ssg',
			type: 'POST',
			dataType: 'json',
			data: {
				'attnDivCd': '90',
				'attnDivDtlCd': attnDivDtlCd,
				'siteNo': settings.siteno.clip,
				'attnTgtIdnfNo1': snsCreateInfo.itemId,
				'attnTgtIdnfNo2': addInfo
			}
		});
	}
}

function snsUrl_new(title, summary, image, shareUrl, gbn, target) {
	var $snsContent = $(target).parents('.cm_sns').parent();

	if(isMobile){
		var snsGateway = "http://" + document.domain + "/snsGateway.ssg";
		shareUrl = snsGateway + "?url=" + encodeURIComponent(shareUrl) + "&img=" + encodeURIComponent(image) + "&title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(summary);
	}

	var $txtShortUrl = $snsContent.find('.cm_url_txt').find('input');
	var urlValue = $txtShortUrl.val();
	if (urlValue == '') {
		urlValue = getUrl_new(shareUrl, 'direct');
		$txtShortUrl.val(urlValue);
	}

	if (settings.UserInfo.mbrTypeCd != '81' && isApp == 'Y') {
		location.href = urlValue;
	} else {
		$snsContent.find('.url_show').toggle();
	}
}

function url_copy(title, summary, image, shareUrl, gbn, target){
	if(!document.queryCommandSupported("copy")){
		alert("현재 브라우저에서 URL 복사를 지원하지 않습니다.");
		return false;
	}

	if(isMobile){
		var snsGateway = "http://" + document.domain + "/snsGateway.ssg";
		shareUrl = snsGateway + "?url=" + encodeURIComponent(shareUrl) + "&img=" + encodeURIComponent(image) + "&title=" + encodeURIComponent(title) + "&summary=" + encodeURIComponent(summary);
	}

	var urlValue = getUrl_new(shareUrl, 'direct');
	var tempInput = document.createElement("input");
	tempInput.style = "position: absolute; left: -1000px; top: -1000px";
	tempInput.value = urlValue;
	document.body.appendChild(tempInput);
	tempInput.select();

	try{
		document.execCommand("copy");
		document.body.removeChild(tempInput);
		alert("URL이 복사되었습니다.");
	} catch (err) {
		console.log("복사 실패");
	}
}


// 모웹에서 네이티브 공유하기 띄우는 커스텀 URL 호출
function snsShareToApp(tgt){

	var oShareData = tgt.data();

	var customUrl = "ssg://share/open?";
	var title = "title=";
	var siteNo = "siteNo=" + '${webSiteNo}';
	var siteNm = "siteNm=" + '${snsDefaultNm}';
	var imgUrl = "imgUrl=";
	var url = "url=";

	if(oShareData){
		title = title + oShareData.snsTitle;
		imgUrl = imgUrl + oShareData.snsImg;
		url = url + oShareData.snsUrl;
	} else {
		alert("공유하기시 정보 전송 에러");
		return false;
	}

	location.href = customUrl + title + "&" + siteNo + "&" + siteNm + "&" + imgUrl + "&" + url;
}

var isIOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

var sharer = {
	shareToKakaotalk: function(shareData) {
		/* shareData
		 * 	- url
		 * 	- label
		 * 	- image
		 *  - defaultImage
		 * 	- gbn
		 */

		if(shareData.gbn) {
			wiselogSnsShare(SNS_SHARE_CODE.LOCATION[shareData.gbn] + "_" + SNS_SHARE_CODE.TOOL.KAKAO_TALK);
		}

		shareData.label = unescapeXml(shareData.label);
		shareData.url = getUrl_new(getCkwhereUrl(shareData.url, 'kakao'));

		var ssg_exec_param = {
			act: 'open_url',
			target: 'self',
			url: shareData.url,
			where: 'kakao'
		};
		var ssg_market_param = {
			act: 'open_url',
			target: 'self',
			url: shareData.url,
			where: 'market'
		};

		var image = new Image();
		image.src = shareData.image;
		image.onload = function () {
			var opt =  {
				label: shareData.label,
				image: {
					src: shareData.image,
					width: this.width,
					height: this.height
				},
				webLink: {
					text: "웹브라우저로 바로 확인",
					url: shareData.url
				},
				appButton: {
					execParams: {
						iphone: ssg_exec_param,
						ipad: ssg_exec_param,
						android: ssg_exec_param
					},
					marketParams: {
						iphone: ssg_market_param,
						ipad: ssg_market_param,
						android: ssg_market_param
					}
				}
			}

			if (settings.isSfc || settings.UserInfo.mbrTypeCd == '81') {
				delete opt.appButton;
			}

			Kakao.Link.sendTalkLink(opt);
		}
	},
	shareToFacebook: function(shareData) {
		/* shareData
		 * 	- url
		 * 	- title
		 * 	- image
		 * 	- summary
		 * 	- snsCreateInfo
		 * 	- gbn
		 */

		if(shareData.gbn) {
			wiselogSnsShare(SNS_SHARE_CODE.LOCATION[shareData.gbn] + "_" + SNS_SHARE_CODE.TOOL.FACE_BOOK);
		}
		if(shareData.snsCreateInfo) {
			createSnsClickInfo('92', shareData.snsCreateInfo);
		}

		if(shareData.summary && shareData.summary.length > 0) {
			shareData.summary = unescapeXml(shareData.summary.substring(0, 100));
		}

		var host = location.host.replace('stg-', '').replace('qa-', '').replace('dev-', '').replace('local-', '');
		var shareUrl = 'http://' + host + '/snsGateway.ssg';
		shareUrl += ('?url=' + encodeURIComponent(shareData.url));
		shareUrl += ("&img=" + encodeURIComponent(shareData.image));
		shareUrl += ("&title=" + encodeURIComponent(shareData.title));
		shareUrl += ("&summary=" + encodeURIComponent(shareData.summary));
		shareUrl = getCkwhereUrl(shareUrl, 'fb');

		var fbUrl = null;
		if (isMobile) {
			fbUrl = 'https://m.facebook.com/sharer.php?';
		} else {
			fbUrl = 'https://www.facebook.com/sharer.php?';
		}
		fbUrl += ('u=' + encodeURIComponent(shareUrl));

		var popupWin;
		if (isApp === 'Y') {
			appPopup(encodeURIComponent(fbUrl));
		} else {
			popupWin = popupCenter(626, 436);
			popupWin.location.href = fbUrl;
		}

		result = popupWin ? true : false;
	},
	shareToSms: function(shareData) {
		/* shareData
		 * 	- url
		 * 	- message
		 * 	- gbn
		 */

		if (shareData.gbn) {
			wiselogSnsShare(SNS_SHARE_CODE.LOCATION[shareData.gbn] + "_" + SNS_SHARE_CODE.TOOL.SMS);
		}

		shareData.url = getUrl_new(shareData.url);
		shareData.message = unescapeXml(shareData.message).replace('&',''); //문자보내기인경우도 & 삭제

		if (settings.UserInfo.mbrTypeCd != '81' && isApp === 'Y') {
			location.href = mobile.customUrl.prefix + '://sms_send/' + encodeURIComponent(shareData.message) + '/' + encodeURIComponent(shareData.url);
		} else {
			location.href = 'sms://?body=' + encodeURIComponent(shareData.message + '\r\n\r\n' + shareData.url);
		}
	},
	shareToSSGTalk : function(shareApi, shareData, gbn, returnUrl) {

		if (gbn) {
			wiselogSnsShare(SNS_SHARE_CODE.LOCATION[gbn] + "_" + SNS_SHARE_CODE.TOOL.SSGTALK);
		}

		$.ajax({
			type: "POST",
			url: "/ssgtalk/share.ssg",
			data : {
						shareApi : shareApi,
						shareData : JSON.stringify(shareData)
				},
			dataType : "json",
			success : function(result){
				setTimeout(function() {
					location.href = returnUrl;
				}, 2000);

				location.href = mobile.customUrl.prefix + "://status/open_chat_channel?channelUrl=" + result.result.channelUrl;
			},
			error: function(xhr, status, error){
				alert(error);
			}
		});
	}
};

var share_image = {
	_defaults: {
		SSG: 'http://static.ssgcdn.com/ui/common/img/sns/ssg.png',
		SMALL: 'http://static.ssgcdn.com/ui/common/img/sns/sm.png',
		EMALL: 'http://static.ssgcdn.com/ui/common/img/sns/em.png',
		DEPT: 'http://static.ssgcdn.com/ui/common/img/sns/sd.png',
		TR : 'http://static.ssgcdn.com/ui/common/img/sns/tr.png',
		BT : 'http://static.ssgcdn.com/ui/common/img/sns/bt.png',
		HWD : 'http://static.ssgcdn.com/ui/common/img/sns/hwd.png',
		TV : 'http://static.ssgcdn.com/ui/common/img/sns/tv.png',
		SI : 'http://static.ssgcdn.com/ui/common/img/sns/siv.png'
	},
	getDefault: function(size) {
		var defaultImage = '';

		if(isApp === 'Y') {
			defaultImage = share_image._defaults.SSG;
			if ($.inArray(settings.mobilAppNo, ['1','2','3','4','5','28','38','42','43','44','45','46','47','48','55','56','57','58']) >= 0) {
				defaultImage = share_image._defaults.EMALL;
			} else if ($.inArray(settings.mobilAppNo, ['17','18','19','20','21','30','40','22','23','24']) >= 0) {
				defaultImage = share_image._defaults.SMALL;
			} else if ($.inArray(settings.mobilAppNo, ['42','43','44','45','46','47','48']) >= 0){
				defaultImage = share_image._defaults.TR;
			} else if ($.inArray(settings.mobilAppNo, ['61', '62', '63', '64']) >= 0){
				defaultImage = share_image._defaults.BT;
			}
		} else {
			if (settings.siteno.clip == '6004') {
				defaultImage = share_image._defaults.SMALL;
			} else if (settings.siteno.clip == '6009') {
				defaultImage = share_image._defaults.DEPT;
			} else if (settings.siteno.clip == '6001') {
				defaultImage = share_image._defaults.EMALL;
			} else if (settings.siteno.clip == '6002') {
				defaultImage = share_image._defaults.TR;
			} else if (settings.siteno.clip == '6003') {
				defaultImage = share_image._defaults.BT;
			} else if (settings.siteno.clip == '6100') {
				defaultImage = share_image._defaults.HWD;
			} else if (settings.siteno.clip == '6200') {
				defaultImage = share_image._defaults.TV;
			} else if (settings.siteno.clip == '6300') {
				defaultImage = share_image._defaults.SI;
			} else {
				defaultImage = share_image._defaults.SSG;
			}
		}
		return defaultImage.replace('{size}', size);
	},
	checkImage: function(imageUrl) {
		var isValid = false;
		if (imageUrl) {
			$.ajax({
				url: imageUrl,
				timeout: 3000,
				async: false,
				success: function (res, status, xhr) {
					isValid = (xhr.getResponseHeader('content-type') || '').indexOf('image') > -1
				}
			});
		}
		return isValid;
	},
	defaultImage: function(imageUrl, defaultImage) {
		if(!defaultImage) {
			return imageUrl;
		}

		if(share_image.checkImage(imageUrl)) {
			return imageUrl;
		} else {
			if($.isFunction(defaultImage)) {
				return defaultImage(imageUrl);
			} else {
				return defaultImage;
			}
		}
	},
	defaultImage2: function(imageUrl, imageForValid, imageForInvalid) {
		if(imageForValid == undefined || imageForInvalid == undefined) {
			return imageUrl;
		}

		if(share_image.checkImage(imageUrl)) {
			if($.isFunction(imageForValid)) {
				return imageForValid(imageUrl);
			} else {
				return imageForValid;
			}
		} else {
			if($.isFunction(imageForInvalid)) {
				return imageForInvalid(imageUrl);
			} else {
				return imageForInvalid;
			}
		}
	}
};

function popupCenter(w, h) {
	var dualScreenLeft = window.screenLeft || screen.left;
	var dualScreenTop = window.screenTop || screen.top;

	var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
	var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

	var top = ((height / 2) - (h / 2)) + dualScreenTop + 30;
	var left = ((width / 2) - (w / 2)) + dualScreenLeft - 20;

	return window.open('', '', 'toolbar=0, status=0, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

// 앱설치 화면으로 이동하기 위한 url 추가 생성
function addAppCheckUrl(shareUrl) {
	if ( location.hostname.indexOf("thehowdy") < 0 ) {
		var separator = shareUrl.indexOf('?') > -1 ? '&' : '?';
		shareUrl += separator + "gateYn=Y&store=N&mobilAppSvcNo=3";
	}

	return shareUrl;
}