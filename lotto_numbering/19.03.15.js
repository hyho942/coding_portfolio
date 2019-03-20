$(document).ready(function() {
    $(".pop_bt").click(function() {
        // 몇개를 추가할 지

        var gameCount = $(".mdl-textfield__input").val();
        console.log(gameCount);

        if (gameCount > 5) {
            alert("error");
        } else {
            // 해당하는 갯수만큼 로또를 생성
            for (var i = 1; i <= gameCount; i++) {
                var numbers = [];
                while (numbers.length < 6) {
                    var number = Math.floor(Math.random() * 45 + 1);
                    if (numbers.indexOf(number) == -1) {
                        numbers.push(number);
                    }
                }
                numbers.sort(function(a, b) {
                    return a - b;
                });

                // td로 1,2,3,4,5 순서 표시
                // td로 로또번호를 추가
                $(".table-body").append(
                    "<tr>" +
                        "<td>" +
                        i +
                        "</td>" +
                        "<td>" +
                        numbers +
                        "</td>" +
                        "</tr>"
                );
            }
        }
        // 팝업 띄우기
        $(".back_btn").show();
        $(".pop").show();
    });

    $(".close").click(function() {
        $(".pop").hide();
    });
});
