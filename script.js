var canvas, 
    ctx;

var size=[],
    tools=[];


var clearCanvas = $('#clear-canvas');

canvas = $(".drawing-canvas");
ctx = canvas[0].getContext('2d');

var input_canvasWidth = $('#canvas-width'),
    input_canvasHeight = $('#canvas-height');

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

clearCanvas.click(function(canvas){
    var ctxCanvasWidth = ctx.canvas.width,
        ctxCanvasHeight = ctx.canvas.height;

    ctx.clearRect(0,0,ctxCanvasWidth,ctxCanvasHeight);

});

function updateSize(width,height){
    input_canvasHeight.val(height);
    input_canvasWidth.val(width);
}

var width = window.innerWidth,
    height = window.innerHeight;

canvas[0].width = width;
canvas[0].height = height;

var canvasWidth = canvas[0].width,
    canvasHeight = canvas[0].height;

updateSize(width,height);

window.addEventListener('resize', function(){
    var image = ctx.getImageData(0,0,canvas[0].width,canvas[0].height)
    width = window.innerWidth,
    height = window.innerHeight;
    canvas[0].width = width;
    canvas[0].height = height;
    
    ctx.putImageData(image,0,0);
    updateSize(width,height);
});

var canvasPosition;

canvasPosition = canvas[0].getBoundingClientRect();

canvas.mousedown(function(e){
    this.down = true;
    this.X = e.pageX - canvasPosition.left;
    this.Y = e.pageY - canvasPosition.top;
});

canvas.mousemove(function(e){
    if(this.down){
        ctx.beginPath();
        ctx.moveTo(this.X,this.Y);
        ctx.lineCap = "round";
        setRadius()
        ctx.lineTo(e.pageX - canvasPosition.left,e.pageY - canvasPosition.top);
        ctx.strokeStyle = color.val();
        ctx.stroke();
        ctx.closePath();

        this.X = e.pageX - canvasPosition.left;
        this.Y = e.pageY - canvasPosition.top;
    }   
}).mouseup(function(){
    this.down= false;
});

var currentRadius= function(radVal){
    return radVal;
}

var setRadius = function(thickness){
    currentRadius(thickness);
    ctx.lineWidth = thickness;
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
