
$(function(){
    var size = $("#sizes");
    var tools = $(".tool-bar").children().children();

    size.on("click",function(e){
        var target = $(e.target);
        if (target.is("li")){
            target.addClass("size-active").siblings().removeClass("size-active");
        }
    });

    tools.on("click",function(e){
        var target = $(e.target);
        if(target.is("i")){
            target.addClass("tool-active").siblings().removeClass("tool-active");
        }
    });

});