



//Declarations
var x1,y1,x2,y2;
var sh="rectangle";
var rectShape={
point1:{
  x: 0,
  y: 0
},
point2:{
  x: 0,
  y: 0
},
width: 0,
height: 0
}

var circleShape={
point1:{
  x: 0,
  y: 0
},
radius: 0,

}
console.log(rectShape.point1.x);
//to know the coordinates when mouseDown
function knowCord1(event) {
x1 = event.clientX;
y1 = event.clientY;
var coords = "X coords: " + x1 + ", Y coords: " + y1;
console.log(coords);
}
//to know the coordinates when mouseUp
function knowCord2(event) {
x2 = event.clientX;
y2 = event.clientY;
var coords = "X coords: " + x2 + ", Y coords: " + y2;
console.log(coords);
}

//init() function
function init() {
canvas = document.getElementById('my-canvas');
ctx = canvas.getContext("2d");
w = canvas.width;
h = canvas.height;
origami('#my-canvas')
.background('lightblue')
.draw()

//Event listener
console.log("hi")
canvas.addEventListener("mousemove", function (e) {
  findxy('move', e)
}, false);
canvas.addEventListener("mousedown", function (e) {
  findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
  findxy('up', e)
}, false);
canvas.addEventListener("mouseout", function (e) {
  findxy('out', e)
}, false);
}


function draw() {

var pointX = (x1- canvas.offsetLeft);
var pointY = ( y1- canvas.offsetTop);

// console.log(canvas.offsetLeft + " " +canvas.offsetTop);
//draw Circle
if(sh == "circle"){
  var a = Math.abs(x2-x1);
  var b = Math.abs(y2-y1); 
  var radius = Math.sqrt(Math.pow(a,2), Math.pow(b,2));
  var angleDeg = Math.atan2((y2 - y1), (x2 - x1)) * 180 / Math.PI;
  
  origami('#my-canvas')
   .arc(pointX, pointY, radius, {
      background: '#E40068',
      border: '1px solid #FFFFFF'
  },0, 2*Math.PI)  
  .draw();
  
  // asigning all var for future use
  circleShape.point1.x = pointX;
  circleShape.point1.y = pointY;
  circleShape.radius = radius;
  
  console.log("circle drawn." + (x1- canvas.offsetLeft) + " " + (y1- canvas.offsetTop) + " " + (x2- canvas.offsetLeft) +
              " " + (y2- canvas.offsetTop) );
}
//draw Rectangle
if(sh == "rectangle"){
  var width=Math.abs(( x2- canvas.offsetLeft) - pointX);
  var height=Math.abs(( y2- canvas.offsetTop) - pointY); 
 /* if(x2<x1){
    pointX=x2;
    pointY=y2;
  }*/
  origami('#my-canvas')
    .rect(pointX, pointY, width, height, {
    background: 'blue',
    border: '1px solid #FFFFFF'
  }).draw();
  
  
  //assigning var for future use
  rectShape.point1.x = pointX;
  rectShape.point1.y = pointY;
  rectShape.point2.x = x2 - canvas.offsetLeft;
  rectShape.point2.y = y2 - canvas.offsetTop;
  rectShape.width = width;
  rectShape.height = height;
  
  console.log("rectangle drawn."+ (x1- canvas.offsetLeft) + " " + (y1- canvas.offsetTop) + " " + (x2- canvas.offsetLeft) +
              " " + (y2- canvas.offsetTop)  );
}

}
//
function findxy(res, e) {
if (res == 'up') {
  draw();
  flag = false;
}

}

//to know which shape you want to draw
function shape(obj){
switch(obj.id){
  case "rect":
    sh="rectangle";
    break;
  case "cir":
    sh="circle";
    break;  
             }
console.log(sh);
}

//create tiles
function tiles(){
  console.log( circleShape.radius + " " + rectShape.width)
  if( circleShape.radius == 0 || rectShape.width == 0 ){

    alert(" Be sure you are created rectangle and circle Both!!! ");
    return ;
  }
  var unit=4;
  console.log( rectShape.point1.x + " " + rectShape.point1.y+" " + rectShape.width+ " " + rectShape.height);
  for(var i = rectShape.point1.x ; i + unit  <= rectShape.point2.x ; i += unit){
    for(var j = rectShape.point1.y ; j + unit  <= rectShape.point2.y; j += unit){
      origami('#my-canvas')
        .rect(i, j, unit, unit, {
        background: 'blue',
        border: '1px solid #FFFFFF'
      }).draw();
      //console.log( i + " " + j);
    }
  }
  origami('#my-canvas')
  .arc(circleShape.point1.x, circleShape.point1.y, circleShape.radius, {
     background: '#E40068',
     border: '1px solid #FFFFFF'
  },0, 2*Math.PI)  
  .draw();
}
