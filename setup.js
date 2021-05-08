var tileSize=60;
var borderSize=2;

var mainBorderSize=20;
var borderColor="#000000";
var has1PixBorder=true;


var canvas = document.getElementById("Turing_Canvas");
var colors=["#666666", "#15630f", "#0f3a63", "#560f63", "#63310f", "#a70404", "#ba6d00", "#000000", "#473f3f", "#056a5f"];
var ctx = canvas.getContext("2d");
var arr1, arr2, color;
var x, y;
var maxx, maxy;
var score=0;
var borderColor="#000000";
var fixedSeq=false;

//===============================================================
//==============================================================
//===============================================================
canvas.width = 1280
canvas.height = 300;
function drawBorder()
{
  ctx.fillStyle = borderColor;
  ctx.fillRect(0,0,canvas.width,mainBorderSize);
  ctx.fillRect(0,0,mainBorderSize,canvas.height);
  ctx.fillRect(0,canvas.height-mainBorderSize,canvas.width,mainBorderSize);
  ctx.fillRect(canvas.width-mainBorderSize,0,mainBorderSize,canvas.height);
}

const squareX = (x) => {
  return mainBorderSize*3.5+tileSize*x
}
const squareY = () => {
  console.log('canvas.height/2-tileSize/2')
  return canvas.height/2-tileSize/2
}

function drawSquare(x){
        ctx.fillStyle = "#473f3f";
        ctx.fillRect(squareX(x)+borderSize,squareY()+borderSize,tileSize-borderSize*2,tileSize-borderSize*2)
        /*========*/
        ctx.fillRect(squareX(x)+borderSize,squareY()+borderSize,1,tileSize-borderSize*2);
        ctx.fillRect(squareX(x)+borderSize,squareY()+borderSize,tileSize-borderSize*2,1);
        ctx.fillRect(squareX(x)+borderSize,squareY()-borderSize*2+tileSize+1,tileSize-borderSize*2,1);
        ctx.fillRect(squareX(x)-borderSize*2+tileSize+1,squareY()+borderSize,1,tileSize-borderSize*2);
}
function drawStripe(x, char){
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "30px Arial";
  ctx.fillText(char, squareX(x)+mainBorderSize, canvas.height/2+mainBorderSize/2);
}


let stripee = '01110 '
let j;
drawBorder()
function drawSquares(){
  for (let i=1; i<18; i++){
    drawSquare(i)
  }
}
function drawStripes(index, stripe){

  //jobboldal
  for (let i=9; i<18; i++){
    if (index+i-9<stripe.length){
      drawStripe(i, stripe[i-9+index])
    }
  }
  //baloldal
  for (let i=index-1; i>0; i--){

    drawStripe()

  }
}
drawSquares(stripee)
drawStripes(0,stripee)



