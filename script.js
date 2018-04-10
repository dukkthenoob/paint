var canvas, 
    ctx;

var size=[],
    tools=[];

var canvasWidth = $('#canvas-width');
var canvasHeight = $('#canvas-height');
var clearCanvas = $('#clear-canvas');

canvas = $(".drawing-canvas");
ctx = canvas[0].getContext('2d');

tools.brush= $("#brush");
tools.pencil =$("#pencil");
tools.eraser=$("#eraser");
tools.eyedropper = $("#eye-dropper");

size.small = $("#small");
size.medium = $("#medium");
size.large =$("#large");

var color = $(".color-picker");

addAllHandlers(tools,'tool-active');
addAllHandlers(size,'size-active');

function addAllHandlers(arr,className){
    for (var item in arr){
        arr[item].on('mousedown',function(){
            $(this).addClass(className);
            $(this).siblings().removeClass(className);
        });
    }
}

clearCanvas.on('click',function(canvas){
    
    canvas.width = canvas.width;
    console.log('resized');
});

var canvasPosition;

$ (function(){
    canvasPosition = canvas[0].getBoundingClientRect();
});


var radius = 10;

var setRadius = function(newRadius){
    radius= newRadius;
    ctx.lineWidth = radius * 2;
}

size.small.on('click', function(){
    setRadius(1);
});

size.medium.on('click', function(){
    setRadius(5);
});

size.large.on('click', function(){
    setRadius(16);
});

setRadius(1);

var down = false;

var draw = function(e){

    if(down){
        ctx.lineTo(e.clientX - canvasPosition.left,e.clientY - canvasPosition.top);
        ctx.lineCap = "round";
        ctx.strokeStyle = color.val();
        ctx.stroke();
    }
    
}

var mouseDown = 0;
window.onmousedown = function() { 
  ++mouseDown;
}
window.onmouseup = function() {
  --mouseDown;
}

canvas.mousedown(function(e){
    down = true;
    draw(e);
}).mouseover(function(e){
    if(mouseDown) {
      down = true;
    }
    ctx.beginPath();
    draw(e);
}).mouseout(function(e){
    down =false;
    ctx.beginPath();
}).mousemove(draw).mouseup(function(){
    down =false;
    ctx.beginPath();
});


