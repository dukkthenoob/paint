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

size.small = $('ul #small');
size.medium = $('ul #medium');
size.large =$('ul #large');;

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
	
var small_Size = $('ul #small');
var medium_Size = $('ul #medium');
var large_Size= $('ul #large');

updateSize(width,height);

window.addEventListener('resize', function(){
    var image = ctx.getImageData(0,0,canvas[0].width,canvas[0].height)
    width = window.innerWidth,
    height = window.innerHeight;
    canvas[0].width = width;
    canvas[0].height = height;
	
    if (medium_Size.hasClass('size-active')){
		setRadius(5);
	}else if(large_Size.hasClass('size-active')){
		setRadius(16);
	}
	
    ctx.putImageData(image,0,0);
    updateSize(width,height);
});

var canvasPosition;
var brushisActive = true;
var eraserisActive = false;
canvasPosition = canvas[0].getBoundingClientRect();

canvas.mousedown(function(e){
    this.down = true;
    this.X = e.pageX - canvasPosition.left;
    this.Y = e.pageY - canvasPosition.top;
});
canvas.mousemove(function(e){
    if(this.down){
        ctx.beginPath();
		if(brushisActive){
			ctx.moveTo(this.X,this.Y);
			ctx.lineCap = "round";
			ctx.lineTo(e.pageX - canvasPosition.left,e.pageY - canvasPosition.top);
			ctx.strokeStyle = color.val();
			ctx.stroke();
		}
        else if(eraserisActive){
			ctx.beginPath();
			ctx.moveTo(this.X,this.Y);
			ctx.lineCap = "round";
			ctx.lineTo(e.pageX - canvasPosition.left,e.pageY - canvasPosition.top);
			ctx.stroke();
		}
        ctx.closePath();

        this.X = e.pageX - canvasPosition.left;
        this.Y = e.pageY - canvasPosition.top;
    }
	
tools.brush.on('click',function(){
	brushisActive = true;
});
tools.eraser.on('click',function(){
	ctx.strokeStyle = canvas.css('background-color').value;
	eraserisActive = true;
	brushisActive = false;
});
	
}).mouseup(function(){
    this.down= false;
});

var setRadius = function(thickness){
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
