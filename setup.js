

let tileSize=60;
let borderSize=2;
let mainBorderSize=20;
let borderColor="#000000";
let canvas = document.getElementById("Turing_Canvas");
let ctx = canvas.getContext("2d");
let timer = null;
//===============================================================
//==============================================================
//===============================================================
canvas.width = 1280
canvas.height = 300;

function drawCanvas(){
  ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
  drawBorder()
  function drawSquares(){
    for (let i=1; i<18; i++){
      drawSquare(i)
    }
  }
  var path=new Path2D();
  path.moveTo((canvas.width/2)+50,canvas.height/2+50);
  path.lineTo((canvas.width/2),(canvas.height/2));
  path.lineTo((canvas.width/2)-50,canvas.height/2+50);

  path.moveTo((canvas.width/2)-50,canvas.height/2-50);
  path.lineTo((canvas.width/2),(canvas.height/2));
  path.lineTo((canvas.width/2)+50,canvas.height/2-50);
  ctx.fill(path);
}

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
  if (char == "_"){
    ctx.fillText("_", squareX(x)+mainBorderSize, canvas.height/2+mainBorderSize/2);
  }else{
    ctx.fillText(char, squareX(x)+mainBorderSize, canvas.height/2+mainBorderSize/2);
  }
  
}


function drawSquares(){
  for (let i=1; i<18; i++){
    drawSquare(i)
  }
}

//////========================////////===============//////=================/////===========================//////////=


function drawStripes(index, stripe){
  
  //olvasofejtol eso jobboldal kirajzolasa
  if (index>=0){
    for (let i=9; i<18; i++){
      drawSquare(i);
      if (index+i-9<stripe.length){
        drawStripe(i, stripe[i-9+index])
      }
    }
  }
  
  //olfasofejtol balra
  if (index <= stripe.length){
    for (let i=8; i>0; i--){
      drawSquare(i);
      if(i-8+index>0){
        drawStripe(i, stripe[i-8+index-1])
      }
    }
  }
}


function Accepted(){

  ctx.font = "30px Verdana";
  ctx.fillStyle = "green"
  ctx.fillText("Accepted", canvas.width-200, canvas.height/2-50);

}


function Denied(){
  ctx.font = "30px Verdana";
  ctx.fillStyle = "red"
  ctx.fillText("Denied", canvas.width-200, canvas.height/2-50);
}



function drawState(state){

  ctx.font = "30px Verdana";
  ctx.fillStyle = borderColor
  ctx.fillText("Current state: " + state, 50, canvas.height/2-50)

}

drawCanvas()

