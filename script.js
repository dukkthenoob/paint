var canvas, ctx, 
    strokes=[], tools=[], size=[], points=[],
    currentStroke=null;

canvas = $(".drawing-canvas");
ctx = canvas[0].getContext('2d');

tools.brush= $(".fa-paint-brush");
tools.eraser=$(".fa-eraser");
tools.pencil =$(".fa-pencil");
tools.eyedropper=$(".fa-eyedropper");

var color = $(".color-picker");

tools = {
    x:0,
    y:0,
    color: color.value,
    down: false,
}

size.small = $("#small");
size.medium = $("#medium");
size.large =$("#large");
