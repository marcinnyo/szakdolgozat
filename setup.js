let tileSize=60;
let borderSize=2;

let mainBorderSize=20;
let borderColor="#000000";
let has1PixBorder=true;
let canvas = document.getElementById("Turing_Canvas");
let ctx = canvas.getContext("2d");




function keypressHandler(evt){
  evt.preventDefault();
  if (evt.keyCode == 37)
  {
    motion(1)
  }
  if (evt.keyCode == 39)
  {
    motion(2)
  }
}
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


let stripee = '011110101010'
let j;
drawBorder()
function drawSquares(){
  for (let i=1; i<18; i++){
    drawSquare(i)
  }
}
function drawStripes(index, stripe){
  
  //j0obboldal
  if (index>=0){
    for (let i=9; i<18; i++){
      drawSquare(i);
      if (index+i-9<stripe.length){
        drawStripe(i, stripe[i-9+index])
      }
    }
  }
  
  //baloldal
  if (index <= stripe.length){
    for (let i=8; i>0; i--){
      drawSquare(i);
      if(i-8+index>0){
        drawStripe(i, stripe[i-8+index-1])
      }
    }
  }
}

let index = 0;
drawSquares(stripee)
drawStripes(index,stripee)
function motion(direction){
    
    if (direction == 1){
      index++;
    }
  
    if (direction == 2){
      index--;
    }
    
    drawStripes(index,stripee)
  
}

document.onkeydown = function(evt){keypressHandler(evt)};




