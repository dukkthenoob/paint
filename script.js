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
tools.spraypaint = $("#spray-paint");

size.small = $('ul #small');
size.medium = $('ul #medium');
size.large =$('ul #large');;

var brush_color = $(".color-picker"),
    tool_size = 2;

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

updateSize(width, height);

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
var eraser_size = 16;
var brushisActive = true,
    eraserisActive = false,
    sprayIsActive = false;

canvasPosition = canvas[0].getBoundingClientRect();

canvas.mousedown(function(e){
    this.down = true;
    this.X = e.pageX - canvasPosition.left;
    this.Y = e.pageY - canvasPosition.top;
})
.mousemove(function (e) {
    if(this.down){
        ctx.beginPath();
        if (brushisActive) {
			canvas.css('cursor', "url('spray-paint.png')");
            ctx.globalCompositeOperation = "source-over";
			ctx.moveTo(this.X,this.Y);
			ctx.lineCap = "round";
			ctx.lineWidth = tool_size;
			ctx.lineTo(e.pageX - canvasPosition.left,e.pageY - canvasPosition.top);
			ctx.strokeStyle = brush_color.val();
			ctx.stroke();
		}
        else if(eraserisActive){
            ctx.globalCompositeOperation = "destination-out";
            ctx.lineWidth = eraser_size;
            ctx.moveTo(this.X, this.Y);
			ctx.lineTo(e.pageX - canvasPosition.left,e.pageY - canvasPosition.top);
			ctx.stroke();
        }
        ctx.closePath();

        this.X = e.pageX - canvasPosition.left;
        this.Y = e.pageY - canvasPosition.top;
    }

}).mouseup(function () {
    this.down = false;
});

tools.brush.on('click',function(){
    brushisActive = true;
    eraserisActive = false;
});
tools.eraser.on('click',function(){
	eraserisActive = true;
	brushisActive = false;
});
tools.spraypaint.on('click', function () {
    sprayIsActive = true;
    eraserisActive = false;
    brushisActive = false;
});

size.small.on('click', function(){
    tool_size = 2;
    select_brush_size.val(tool_size);
});

size.medium.on('click', function(){
    tool_size = 5;
    select_brush_size.val(tool_size);
});

size.large.on('click', function(){
    tool_size = 16;
    select_brush_size.val(tool_size);
});

var select_brush_size = $('#select_brush_size');
var select_eraser_size = $('#select_eraser_size');

select_eraser_size.on('change',function(){
  var max_val = 100;
  var previous_val;
  if (select_eraser_size.val() > max_val || select_eraser_size.val() <= 0){
    window.alert('Value cannot be greater than '+ max_val + ' or less than 0.');
    previous_val = eraser_size;
    select_eraser_size.val(previous_val);

  }else {
    previous_val = eraser_size;
    eraser_size = select_eraser_size.val();
  }
});

select_brush_size.on('change',function(){
  var max_val = 100;
  var previous_val;
  if (select_brush_size.val() > max_val || select_brush_size.val() <= 0){
    window.alert('Value cannot be greater than '+ max_val + ' or less than 0.');
    previous_val = tool_size;
    select_brush_size.val(previous_val);

  }else {
    previous_val = tool_size;
    tool_size = select_brush_size.val();
  }
});
