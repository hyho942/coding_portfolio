//mutationobserver-shim v0.3.2 (github.com/megawac/MutationObserver.js)
//Authors: Graeme Yeates (github.com/megawac)
window.MutationObserver=window.MutationObserver||function(w){function v(a){this.i=[];this.m=a}function I(a){(function c(){var d=a.takeRecords();d.length&&a.m(d,a);a.h=setTimeout(c,v._period)})()}function p(a){var b={type:null,target:null,addedNodes:[],removedNodes:[],previousSibling:null,nextSibling:null,attributeName:null,attributeNamespace:null,oldValue:null},c;for(c in a)b[c]!==w&&a[c]!==w&&(b[c]=a[c]);return b}function J(a,b){var c=C(a,b);return function(d){var f=d.length,n;b.a&&3===a.nodeType&&
a.nodeValue!==c.a&&d.push(new p({type:"characterData",target:a,oldValue:c.a}));b.b&&c.b&&A(d,a,c.b,b.f);if(b.c||b.g)n=K(d,a,c,b);if(n||d.length!==f)c=C(a,b)}}function L(a,b){return b.value}function M(a,b){return"style"!==b.name?b.value:a.style.cssText}function A(a,b,c,d){for(var f={},n=b.attributes,k,g,x=n.length;x--;)k=n[x],g=k.name,d&&d[g]===w||(D(b,k)!==c[g]&&a.push(p({type:"attributes",target:b,attributeName:g,oldValue:c[g],attributeNamespace:k.namespaceURI})),f[g]=!0);for(g in c)f[g]||a.push(p({target:b,
type:"attributes",attributeName:g,oldValue:c[g]}))}function K(a,b,c,d){function f(b,c,f,k,y){var g=b.length-1;y=-~((g-y)/2);for(var h,l,e;e=b.pop();)h=f[e.j],l=k[e.l],d.c&&y&&Math.abs(e.j-e.l)>=g&&(a.push(p({type:"childList",target:c,addedNodes:[h],removedNodes:[h],nextSibling:h.nextSibling,previousSibling:h.previousSibling})),y--),d.b&&l.b&&A(a,h,l.b,d.f),d.a&&3===h.nodeType&&h.nodeValue!==l.a&&a.push(p({type:"characterData",target:h,oldValue:l.a})),d.g&&n(h,l)}function n(b,c){for(var g=b.childNodes,
q=c.c,x=g.length,v=q?q.length:0,h,l,e,m,t,z=0,u=0,r=0;u<x||r<v;)m=g[u],t=(e=q[r])&&e.node,m===t?(d.b&&e.b&&A(a,m,e.b,d.f),d.a&&e.a!==w&&m.nodeValue!==e.a&&a.push(p({type:"characterData",target:m,oldValue:e.a})),l&&f(l,b,g,q,z),d.g&&(m.childNodes.length||e.c&&e.c.length)&&n(m,e),u++,r++):(k=!0,h||(h={},l=[]),m&&(h[e=E(m)]||(h[e]=!0,-1===(e=F(q,m,r,"node"))?d.c&&(a.push(p({type:"childList",target:b,addedNodes:[m],nextSibling:m.nextSibling,previousSibling:m.previousSibling})),z++):l.push({j:u,l:e})),
u++),t&&t!==g[u]&&(h[e=E(t)]||(h[e]=!0,-1===(e=F(g,t,u))?d.c&&(a.push(p({type:"childList",target:c.node,removedNodes:[t],nextSibling:q[r+1],previousSibling:q[r-1]})),z--):l.push({j:e,l:r})),r++));l&&f(l,b,g,q,z)}var k;n(b,c);return k}function C(a,b){var c=!0;return function f(a){var k={node:a};!b.a||3!==a.nodeType&&8!==a.nodeType?(b.b&&c&&1===a.nodeType&&(k.b=G(a.attributes,function(c,f){if(!b.f||b.f[f.name])c[f.name]=D(a,f);return c})),c&&(b.c||b.a||b.b&&b.g)&&(k.c=N(a.childNodes,f)),c=b.g):k.a=
a.nodeValue;return k}(a)}function E(a){try{return a.id||(a.mo_id=a.mo_id||H++)}catch(b){try{return a.nodeValue}catch(c){return H++}}}function N(a,b){for(var c=[],d=0;d<a.length;d++)c[d]=b(a[d],d,a);return c}function G(a,b){for(var c={},d=0;d<a.length;d++)c=b(c,a[d],d,a);return c}function F(a,b,c,d){for(;c<a.length;c++)if((d?a[c][d]:a[c])===b)return c;return-1}v._period=30;v.prototype={observe:function(a,b){for(var c={b:!!(b.attributes||b.attributeFilter||b.attributeOldValue),c:!!b.childList,g:!!b.subtree,
a:!(!b.characterData&&!b.characterDataOldValue)},d=this.i,f=0;f<d.length;f++)d[f].s===a&&d.splice(f,1);b.attributeFilter&&(c.f=G(b.attributeFilter,function(a,b){a[b]=!0;return a}));d.push({s:a,o:J(a,c)});this.h||I(this)},takeRecords:function(){for(var a=[],b=this.i,c=0;c<b.length;c++)b[c].o(a);return a},disconnect:function(){this.i=[];clearTimeout(this.h);this.h=null}};var B=document.createElement("i");B.style.top=0;var D=(B="null"!=B.attributes.style.value)?L:M,H=1;return v}(void 0);
//jquery.i18n.properties 1.2.7
!function($){$.i18n={},$.i18n.map={};var debug=function(e){window.console&&console.log("i18n::"+e)};function callbackIfComplete(e){e.debug&&(debug("callbackIfComplete()"),debug("totalFiles: "+e.totalFiles),debug("filesLoaded: "+e.filesLoaded)),e.async&&e.filesLoaded===e.totalFiles&&e.callback&&e.callback()}function loadAndParseFiles(e,a){a.debug&&debug("loadAndParseFiles"),null!==e&&0<e.length?loadAndParseFile(e[0],a,function(){e.shift(),loadAndParseFiles(e,a)}):callbackIfComplete(a)}function loadAndParseFile(s,t,r){t.debug&&(debug("loadAndParseFile('"+s+"')"),debug("totalFiles: "+t.totalFiles),debug("filesLoaded: "+t.filesLoaded)),null!=s&&$.ajax({url:s,async:t.async,cache:t.cache,dataType:"text",success:function(e,a){t.debug&&(debug("Succeeded in downloading "+s+"."),debug(e)),parseData(e,t),r()},error:function(e,a,n){t.debug&&debug("Failed to download or parse "+s+". errorThrown: "+n),404===e.status&&(t.totalFiles-=1),r()}})}function parseData(data,settings){for(var parsed="",lines=data.split(/\n/),regPlaceHolder=/(\{\d+})/g,regRepPlaceHolder=/\{(\d+)}/g,unicodeRE=/(\\u.{4})/gi,i=0,j=lines.length;i<j;i++){var line=lines[i];if(line=line.trim(),0<line.length&&"#"!=line.match("^#")){var pair=line.split("=");if(0<pair.length){for(var name=decodeURI(pair[0]).trim(),value=1==pair.length?"":pair[1];-1!=value.search(/\\$/);)value=value.substring(0,value.length-1),value+=lines[++i].trimRight();for(var s=2;s<pair.length;s++)value+="="+pair[s];if(value=value.trim(),"map"==settings.mode||"both"==settings.mode){var unicodeMatches=value.match(unicodeRE);unicodeMatches&&unicodeMatches.forEach(function(e){value=value.replace(e,unescapeUnicode(e))}),settings.namespace?$.i18n.map[settings.namespace][name]=value:$.i18n.map[name]=value}if("vars"==settings.mode||"both"==settings.mode)if(value=value.replace(/"/g,'\\"'),checkKeyNamespace(name),regPlaceHolder.test(value)){var parts=value.split(regPlaceHolder),first=!0,fnArgs="",usedArgs=[];parts.forEach(function(e){!regPlaceHolder.test(e)||0!==usedArgs.length&&-1!=usedArgs.indexOf(e)||(first||(fnArgs+=","),fnArgs+=e.replace(regRepPlaceHolder,"v$1"),usedArgs.push(e),first=!1)}),parsed+=name+"=function("+fnArgs+"){";var fnExpr='"'+value.replace(regRepPlaceHolder,'"+v$1+"')+'"';parsed+="return "+fnExpr+";};"}else parsed+=name+'="'+value+'";'}}}eval(parsed),settings.filesLoaded+=1}function checkKeyNamespace(key){var regDot=/\./;if(regDot.test(key))for(var fullname="",names=key.split(/\./),i=0,j=names.length;i<j;i++){var name=names[i];0<i&&(fullname+="."),fullname+=name,eval("typeof "+fullname+' == "undefined"')&&eval(fullname+"={};")}}function unescapeUnicode(e){var a=[],n=parseInt(e.substr(2),16);return 0<=n&&n<Math.pow(2,16)&&a.push(n),a.reduce(function(e,a){return e+String.fromCharCode(a)},"")}$.i18n.properties=function(l){(l=$.extend({name:"Messages",language:"",path:"",namespace:null,mode:"vars",cache:!1,debug:!1,encoding:"UTF-8",async:!1,callback:null},l)).namespace&&"string"==typeof l.namespace&&(l.namespace.match(/^[a-z]*$/)?$.i18n.map[l.namespace]={}:(debug("Namespaces can only be lower case letters, a - z"),l.namespace=null)),l.path.match(/\/$/)||(l.path+="/"),l.language=this.normaliseLanguageCode(l);var e=l.name&&l.name.constructor===Array?l.name:[l.name];l.totalFiles=2*e.length+(5<=l.language.length?e.length:0),l.debug&&debug("totalFiles: "+l.totalFiles),l.filesLoaded=0,e.forEach(function(e){var a,n,s;a=l.path+e+".properties";var t=l.language.substring(0,2);if(n=l.path+e+"_"+t+".properties",5<=l.language.length){var r=l.language.substring(0,5);s=[a,n,l.path+e+"_"+r+".properties"]}else s=[a,n];loadAndParseFiles(s,l)}),l.callback&&!l.async&&l.callback()},$.i18n.prop=function(e){var a,n,s=[].slice.call(arguments);if(2==s.length)if($.isArray(s[1]))a=s[1];else if("object"==typeof s[1]){n=s[1].namespace;var t=s[1].replacements;s.splice(-1,1),t&&Array.prototype.push.apply(s,t)}var r,l=n?$.i18n.map[n][e]:$.i18n.map[e];if(null===l)return"["+(n?n+"#"+e:e)+"]";if("string"==typeof l){for(r=0;-1!=(r=l.indexOf("\\",r));)l="t"==l.charAt(r+1)?l.substring(0,r)+"\t"+l.substring(2+r++):"r"==l.charAt(r+1)?l.substring(0,r)+"\r"+l.substring(2+r++):"n"==l.charAt(r+1)?l.substring(0,r)+"\n"+l.substring(2+r++):"f"==l.charAt(r+1)?l.substring(0,r)+"\f"+l.substring(2+r++):"\\"==l.charAt(r+1)?l.substring(0,r)+"\\"+l.substring(2+r++):l.substring(0,r)+l.substring(r+1);var i,u,g=[];for(r=0;r<l.length;)if("'"==l.charAt(r))if(r==l.length-1)l=l.substring(0,r);else if("'"==l.charAt(r+1))l=l.substring(0,r)+l.substring(++r);else{for(i=r+2;-1!=(i=l.indexOf("'",i));){if(i==l.length-1||"'"!=l.charAt(i+1)){l=l.substring(0,r)+l.substring(r+1,i)+l.substring(i+1),r=i-1;break}l=l.substring(0,i)+l.substring(++i)}-1==i&&(l=l.substring(0,r)+l.substring(r+1))}else if("{"==l.charAt(r))if(-1==(i=l.indexOf("}",r+1)))r++;else if(u=parseInt(l.substring(r+1,i)),!isNaN(u)&&0<=u){var o=l.substring(0,r);""!==o&&g.push(o),g.push(u),r=0,l=l.substring(i+1)}else r=i+1;else r++;""!==l&&g.push(l),l=g,n?$.i18n.map[settings.namespace][e]=g:$.i18n.map[e]=g}if(0===l.length)return"";if(1==l.length&&"string"==typeof l[0])return l[0];var c="";for(r=0,i=l.length;r<i;r++)"string"==typeof l[r]?c+=l[r]:a&&l[r]<a.length?c+=a[l[r]]:!a&&l[r]+1<s.length?c+=s[l[r]+1]:c+="{"+l[r]+"}";return c},$.i18n.normaliseLanguageCode=function(e){var a=e.language;return(!a||a.length<2)&&(e.debug&&debug("No language supplied. Pulling it from the browser ..."),a=navigator.languages&&0<navigator.languages.length?navigator.languages[0]:navigator.language||navigator.userLanguage||"en",e.debug&&debug("Language from browser: "+a)),3<(a=(a=a.toLowerCase()).replace(/-/,"_")).length&&(a=a.substring(0,3)+a.substring(3).toUpperCase()),a}}(jQuery);

var ssg = ssg || {};
ssg.View = ssg.View || {};
ssg.Event = ssg.Event || {};
ssg.Event.emitter={subscribers:{},on:function(e,t,n){this.subscribers[e]=this.subscribers[e]||[];this.subscribers[e].push({callback:t,context:n})},off:function(e,t,n){var r,i=this.subscribers[e],s;if(i){r=i.length-1;while(r>=0){s=i[r];if(s.callback===t&&(!n||s.context===n)){i.splice(r,1);break}r--}}},emit:function(e){var t=this.subscribers[e],n=0,r=Array.prototype.slice.call(arguments,1),i;if(t){while(n<t.length){i=t[n];i.callback.apply(i.context||this,r);n++}}}};

ssg.View.translate = function(htOptions){
    $.extend(this, htOptions || {});
    this.init();
};
ssg.View.translate.prototype = $.extend({
    _htConfig: {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true,
        attributeOldValue: true,
        characterDataOldValue: true
    },
    i18nConfig: null,
    _oStorage: window.sessionStorage,
    init: function(){
        this._initTranslate();
        this._assignElements();
        this._attachEventHandlers();
    },
    _initTranslate: function(){
        if ($.cookie('ssglocale') === 'ko_KR') {
             this._deleteReloaded();
        } else {
            this._setReloaded();
        }

        if (!$('#transObserver').length) {
            $('body').append('<span id="transObserver" class="blind" style="position:fixed;top:0px" data-default-txt="언어 번역">언어 번역</span>');
        }
        this._startObserver();
        this._i18nSetting();
    },
    _i18nSetting: function(){
        if (this.i18nConfig) {
            $.i18n.properties(this.i18nConfig);
        }
    },
    _startObserver: function(){
        var observer = new MutationObserver($.proxy(this._onTranslateObserver, this));
        /*
        observer.observe(document.getElementsByTagName('html')[0], {
            attributes: true,
            // characterData: true,
            // childList: true,
            // subtree: true,
            attributeOldValue: true
            //characterDataOldValue: true
        });
        */
        observer.observe(document.getElementById('transObserver'), {childList: true});

        $('[placeholder]:not(.translated)').each(function(){
            var welTarget = $(this);
            var sText = welTarget.attr('placeholder');

            welTarget.after('<span class="trans_placeholder blind" data-default-txt="'+ sText +'">'+ sText +'</span>').addClass('translated');
            observer.observe(welTarget.next('.trans_placeholder').get(0), {childList: true});
        });
    },
    _assignElements: function(){
        this._welGoogleTranslate = $('#google_translate_element');
        this._welLangeugeSelect = $('#utilLangSelect .util_lang_layer');
    },
    _attachEventHandlers: function() {
        //this._welGoogleTranslate.on('change', '.goog-te-combo', $.proxy(this._onSelectTranslate, this));
        this._welLangeugeSelect.on('click', '.util_lang_btnsel', $.proxy(this._onClickLangeugeSelect, this));
    },
    _onClickLangeugeSelect: function(){
        this._setReloaded();
    },
    _onTranslateObserver: function(mutations){
        var oSelf = this;
        var newValue = '';
        var oldValue = '';
        var isChanging = false;

        $.each(mutations, function(i, mutation){
            // if (isChanging) {
            //     return;
            // }

            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                newValue = mutation.target.innerText;
                oldValue = mutation.target.getAttribute('data-default-txt');

                if (newValue !== oldValue) {
                    isChanging = true;
                    oSelf._changeLangeuge(mutation.target);

                } else if (newValue == oldValue) {
                    if (document.documentElement.lang === 'ko') {
                        if (!oSelf._oStorage.getItem('reloaded')) {
                            isChanging = true;
                            oSelf._changeLangeuge(mutation.target);
                        }
                    }
                }
            }
        });

        /*
        $.each(mutations, function(i, mutation){
            if (isChanging) {
                return false;
            }

            if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
                isChanging = true;

                console.log('newValue::', mutation.target.lang);
                console.log('oldValue::', mutation.oldValue);

                if (mutation.target.lang === 'auto') {
                    mutation.target.lang = 'ko';
                }

                if (mutation.target.lang !== mutation.oldValue) {
                    oSelf._updateTranslate(mutation.target.lang);
                }

                // if (mutation.target.lang === 'ko' && oSelf._oStorage.getItem('reloaded')) {
                //     return;
                // }
            }

            if (mutation.type === 'childList' && mutation.addedNodes.length) {
                newValue = mutation.target.innerText;
                oldValue = mutation.target.getAttribute('data-default-txt');
                if (newValue !== oldValue) {
                    oSelf._updatePlaceholder(mutation.target);
                }
            }
        });
        */
    },
    _changeLangeuge: function(elem){
        var oSelf = this;
        var welTarget = $(elem);

        if (elem.id === 'transObserver') {
            this._updateTranslate(document.documentElement.lang);
        }

        if (welTarget.hasClass('trans_placeholder')) {
            welTarget.prev('[placeholder].translated').get(0).placeholder = elem.innerText;
        }
    },
    _updateTranslate: function(sLang){
        var oSelf = this;

        switch(sLang) {
            case 'ko':
                sLang = 'ko_KR';
                break;
            case 'en':
                sLang = 'en_US';
                break;
            case 'zh-CN':
                sLang = 'zh_CN';
                break;
            default:
                sLang = 'ko_KR';
        }

        if (!this._oStorage.getItem('reloaded')) {
            this._setReloaded();
            this.emit('reloadTranslated', sLang);
            return false;
        }

        this.emit('changeTranslated', sLang);
        this._updateImgLang(sLang);
        setTimeout(function(){
            oSelf._deleteReloaded();
        }, 450);
    },
    _updateImgLang: function(sLang){
        $('.trans_img').each(function(){
            var welTarget = $(this);
            var sImgSrc = welTarget.get(0).getAttribute('data-img-' + sLang) || welTarget.get(0).getAttribute('data-img-ko');
            welTarget.attr({ src: sImgSrc });
        });
    },
    _setReloaded: function(){
        this._oStorage.setItem('reloaded', 'true');
    },
    _deleteReloaded: function(){
        this._oStorage.removeItem('reloaded');
    }
}, ssg.Event.emitter);