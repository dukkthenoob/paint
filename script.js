var canvas, ctx,
    tools=[], size=[]

canvas = $(".drawing-canvas");
ctx = canvas[0].getContext('2d');

tools.brush= $(".fa-paint-brush");
tools.eraser=$(".fa-eraser");
tools.pencil =$(".fa-pencil");
tools.eyedropper=$(".fa-eyedropper");

size.small = $("#small");
size.medium = $("#medium");
size.large =$("#large");

var color = $(".color-picker").value;