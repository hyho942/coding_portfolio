var ssg_react = (function(){
    "use strict";
    
    function isSync(link) {
        if(link && link.startsWith("#") == false && link.indexOf("javascript:void(0)") < 0 && link.indexOf("javascript:;") < 0) {
            return true;
        } else {
            return false;
        }
    }
    
    function call(param) {
        if(param && param.tarea) {
            $.ajax({
                type: "GET",
                url: "/comm/ajaxReact.ssg",
                data: {
                    tarea : param.tarea
                },
                async: param.async === undefined ? true : param.async
            }).always(function() {
                if(param.callbackUrl) {
                    location.href = param.callbackUrl;
                }
            });
        }
    }

    function bindReactClick() {
        
        var bindClick = function() {
            $(".react-area").off("click.sa.react");
            $(".react-area").on("click.sa.react", ".clickable[data-react-tarea]", function(){
                
                var param = {tarea: $(this).attr("data-react-tarea")},
                    target_link = $(this).attr("href"),
                    target_onclick = $(this).attr("onclick");
                
                if(target_onclick || isSync(target_link)) {
                    param.async = false; 
                }

                call(param);
            });
        }
        
        var bindSelectable = function() {
            $(".react-area").off("change.sa.react");
            $(".react-area").on("change.sa.react", ".selectable", function() {
                
                var param = {
                    tarea: $(this).find("option:selected").attr("data-react-tarea")
                };
                
                call(param);
            });
        }
        
        var bindSelectableTmpl = function() {
            var selectBoxArr = document.querySelectorAll('.react-area select.selectable-tmpl'),
                selectBoxLen = selectBoxArr.length,
                baseOnChangeFunc;
            for (var x = 0; x < selectBoxLen; x++) {
                baseOnChangeFunc = selectBoxArr[x].onchange;
                if(typeof baseOnChangeFunc === 'function' && $(selectBoxArr[x]).data('selectableTmplReactFunc') !== 'Y') {
                    $(selectBoxArr[x]).data('selectableTmplReactFunc', 'Y');
                    selectBoxArr[x].onchange = (function(func) {
                        return function () {
                            var reactAreaVal = this.options[this.selectedIndex].getAttribute('data-react-tarea');
                            call({tarea: reactAreaVal});    
                            func.call(this);
                        }
                    })(baseOnChangeFunc);
                }
            }
        }
        
        bindClick();
        bindSelectable();
        bindSelectableTmpl();
    }


    return {
        init : function() {
            bindReactClick();
        },
        directCall : function(param) {
            call(param);
        }
    }
})();