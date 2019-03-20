$("#typelist").focus();
$(document).ready(function() {
    // 클릭시 리스트 추가
    $("#button-addon2").click(function(e) {
        // e.preventDefault();
        var todotext = $("#typelist").val();
        console.log(todotext);
        // var todotext = $('input[name="listItem"]').val()
        // var typelist = $("#todolist").append('<li class="list-group-item">'+todotext+'</li>');
        var typelist = $("#todolist").append(
            '<div class="input-group mb-3">' +
                '<div class="input-group-prepend">' +
                '<div class="input-group-text">' +
                '<input class="click_check" type="checkbox" aria-label="Checkbox for following text input">' +
                "</div>" +
                "</div>" +
                '<input type="text" class="form-control control_append" aria-label="Text input with checkbox" value="' +
                todotext +
                '">' +
                '<button type="button" class="btn btn-dark">Delete</button>' +
                "</div>"
            // '<li class="list-group-item">'+todotext+'</li>'
        );
        $("#typelist").val("");
        saveTodo();
    });
    // 엔터키, 리스트 추가
    $(typelist).keyup(function(e) {
        if (e.which === 13) {
            var todotext = $("#typelist").val();
            $("#todolist").append(
                '<div class="input-group mb-3">' +
                    '<div class="input-group-prepend">' +
                    '<div class="input-group-text">' +
                    '<input class="click_check" type="checkbox" aria-label="Checkbox for following text input">' +
                    "</div>" +
                    "</div>" +
                    '<input type="text" class="form-control control_append" aria-label="Text input with checkbox" value="' +
                    todotext +
                    '">' +
                    '<button type="button" class="btn btn-dark">Delete</button>' +
                    "</div>"
                // '<li class="list-group-item">'+todotext+'</li>'
            );
            $("#typelist").val("");
            saveTodo();
        }
    });
    $("#todolist").on("click", ".btn-dark", function() {
        $(this)
            .parent()
            .remove();
    });

    $("#todolist").on("click", ".click_check", function() {
        $("input:checked").length();
        console.log("#todolist");
    });

    $(".delAll").click(function() {
        $("input:checked")
            .parent()
            .parent()
            .parent()
            .remove();
        alert("정말 삭제 할까요?");
    });

    // 저장을 필요로 하 클래스, 아이디를 설정하고 값은 "list_item"으로 선언
    var list_item =
        "<ul class='todolists'><class='input-group'><class='input-group-text'><input class='form-control'>";
    // todo_list_contents를 선언하고 local storage를 설정
    todo_list_contents = "todos";

    // Local Storage에 저장할 수 있는 함수를 만들고, Data값을 JSON String 형태로 변환
    function saveTodo() {
        var data = {};
        var todos = $(".input-group .control_append");
        console.log(todos);
        todos.each(function(index) {
            data[index] = [$(this).attr("value"), $(this).hasClass("checked")];
        });
        localStorage.setItem(todo_list_contents, JSON.stringify(data));
    }
    function loadTodo() {
        var todos = localStorage.getItem("todos");
        todos = JSON.parse(todos);
        console.log(todos);
        for (var key in todos) {
            var value = todos[key][0];
            var complete = todos[key][1];
            add_item_append = $(
                '<div class="input-group mb-3">' +
                    '<div class="input-group-prepend">' +
                    '<div class="input-group-text">' +
                    '<input class="click_check" type="checkbox" aria-label="Checkbox for following text input">' +
                    "</div>" +
                    "</div>" +
                    '<input type="text" class="form-control control_append" aria-label="Text input with checkbox" value="">' +
                    '<button type="button" class="btn btn-dark">Delete</button>' +
                    "</div>"
            ).clone();
            add_item_append.find(".control_append").val(value);
            $(".todolists").append(add_item_append);
        }
    }
    // 추가 버튼, 삭제 버튼, 체크 버튼, 리스트 객체 수정
    $(function() {
        loadTodo();
        // 1. 추가해도 기존 리스트 존재
        // 2. 삭제후 삭제 리스트가 로컬에서 삭제

        $(".btn-dark").on("click", function(e) {
            e.preventDefault();

            saveTodo();
        });
        // $("#button-addon2").on("click", function(e) {
        //     e.preventDefault();
        //     $(".input-group")
        //         .get(0)
        //         .saveTodo();
        // });
        // $(".control_append").on("click", function(e) {
        //     e.preventDefault();
        //     saveTodo();
        // });
        // $(".delAll").on("click", function(e) {
        //     e.preventDefault();
        //     $("input:checked")
        //         .parents(".control_append")
        //         .remove();
        //     saveTodo();
        // });
    });
});

// 1.리스트를 선언 => application에 todolist file (스토리지)
// 2. 리스트 값을 문자값으로 변환  => string으로 변환
//          JSON.stringify(contnet);
// 3. todo list 스트링 값을 로컬 스토리지에 저장
//          localStorage.setItem(key, value);
// 4. 이 리스트를 리뉴했을 때 다시 로드
