var ssg_ad = (function(){
    "use strict";
    var trackUrl = "adpay.ssg.com/adpayapi/pay/send.ssg?data=";

    if(typeof settings !== "undefined" && settings.zone !== "prod") {
        var zone = settings.zone;
        if(zone === 'qa2') {
            zone = 'qa';
        } else if(zone === 'local') {
            zone = 'dev';
        }

        trackUrl = "http://" + zone + "-" + trackUrl;
    } else {
        trackUrl = "http://" + trackUrl;
    }

    function callServer(data, infoObj) {
        if(typeof settings !== "undefined") {
            data.mediacd = settings.mediaCd;
            data.siteno = settings.curr_siteno;
        }

        var img = new Image();
        img.src = trackUrl + JSON.stringify(data);

        if(infoObj && infoObj.link) {
            if(infoObj.target === "_blank") {
                window.open(infoObj.link);
            } else {
                img.onerror = function(){
                    location.href = infoObj.link;
                };
            }
        }
    }

    // IE7
    function indexOf(obj, value) {
        for (var i = 0 ; i < obj.length; i++) {
            if (obj[i] == value) {
                return i;
            }
        }

        return -1;
    }

    function processImp(jqueryObj, templ){
        templ.type = "pv";
        templ.globalid = $("[data-globalid]").data("globalid") || "";
        templ.unitinfolist = [];

        jqueryObj.each(function(){
            var list_templ = getUnitInfo($(this));
            if(typeof list_templ !== "undefined") {
                templ.unitinfolist.push(list_templ);
            }
        });

        if(templ.unitinfolist.length > 0) callServer(templ);
    }
    
    function triggerDefaultImp(){
        $("[data-areaid]").filter(function(){
            if($(this).data('impyn') !== 'N') {
                return true;
            }

            return false;
        }).each(function() {
            var templ = {};
            templ.areaid = $(this).data("areaid");
         
            processImp($(this).find(".gate_unit"), templ);
        });
    }

    function triggerHtmlImp(areaid, html){
        var templ = {};
        templ.areaid = areaid;

        processImp($("<div/>").append(html).find(".gate_unit"), templ);
    }

    function getUnitInfo(unit){
        var list_templ;
        var unittype = unit.data("unittype") || "",
            advertacctid = unit.data("advertacctid") || "",
            advertbidid = unit.data("advertbidid") || "",
            adtgtid = unit.data("adtgtid") || "",
            adidx = unit.data("adidx") || "",
            advertbilngtypecd = unit.data("advertbilngtypecd") || "",
            advertkindcd = unit.data("advertkindcd") || "",
            advertextensterydivcd = unit.data("advertextensterydivcd") || "";

        // int -> string
        unittype            += "";
        advertacctid        += "";
        advertbidid         += "";
        adtgtid             += "";
        adidx               += "";
        advertbilngtypecd   += "";
        advertkindcd        += "";
        advertextensterydivcd += "";

        if(advertacctid !== "" && advertbidid !== "" && advertbilngtypecd !== "" && advertkindcd !== "") {
            list_templ = {};
            list_templ.unittype = unittype;
            list_templ.advertacctid = advertacctid;
            list_templ.advertbidid = advertbidid;
            list_templ.adtgtid = adtgtid;
            list_templ.adidx = adidx;
            list_templ.advertbilngtypecd = advertbilngtypecd;
            list_templ.advertkindcd = advertkindcd;
            list_templ.advertextensterydivcd = advertextensterydivcd;
        }

        return list_templ;
    }

    return {
        triggerClick : function(areaid,obj,infoObj){
            callServer(
                {
                    type : "click",
                    globalid: $("[data-globalid]").data("globalid") || "",
                    areaid: areaid,
                    position: infoObj.position || "",
                    unitinfolist :    [
                        {
                            unittype: obj.unittype + "" || "",
                            advertacctid : obj.advertacctid + "" || "",
                            advertbidid : obj.advertbidid + "",
                            adtgtid : obj.adtgtid + "",
                            adidx : obj.adidx + "",
                            advertbilngtypecd : obj.advertbilngtypecd + "",
                            advertkindcd : obj.advertkindcd + "",
                            advertextensterydivcd : (obj.advertextensterydivcd || "") + ""
                        }
                    ]
                }, infoObj
            );
        },
        triggerImp : function(areaid, obj){
            callServer({
                type : "pv",
                globalid: $("[data-globalid]").data("globalid") || "",
                areaid: areaid,
                unitinfolist :    [
                    {
                        unittype: obj.unittype + "" || "",
                        advertacctid : obj.advertacctid + "" || "",
                        advertbidid : obj.advertbidid + "",
                        adtgtid : obj.adtgtid + "",
                        adidx : obj.adidx + "",
                        advertbilngtypecd : obj.advertbilngtypecd + "",
                        advertkindcd : obj.advertkindcd + "",
                        advertextensterydivcd : (obj.advertextensterydivcd || "") + ""
                    }
                ]
            });
        },
        callImp : function(areaid, jqueryObj){
            if(jqueryObj.data("yn") !== "Y") {
                jqueryObj.data("yn", "Y");

                var templ = {};
                templ.areaid = areaid;

                processImp(jqueryObj, templ);
            }
        },
        triggerHtmlImp : function(areaid, html){
            triggerHtmlImp(areaid, html);
        },
        adClick : function (_this, infoObj) {
            
            var parent = $(_this).parents(".gate_unit"),
                areaid = $(_this).parents("[data-areaid]").data("areaid");

            ssg_ad.triggerClick(areaid, getUnitInfo($(parent)), infoObj);
        },
        init : function(){
            if(location.href.indexOf("test_request=Y") == -1) {
                triggerDefaultImp();
            }
        }
    }
})();