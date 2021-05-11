let tape = '00010111110 ';

/* q0,0
q1,0,>

q1,0
q0,0,>

q0,1
q0,1,>

q1,1
q1,1,>

q0,_
qAccept,_,- */
function keypressHandler(evt){
    evt.preventDefault();
    if (evt.keyCode == 37)
    {
      motion('<',tape)
    }
    if (evt.keyCode == 39)
    {
      motion('>',tape)
    }
    if (evt.keyCode == 32 && current_char<tape.length-1){
        timer=setInterval(function ()
        {
        iterate();
        }, 500);
    }
    if (evt.keyCode == 82){
        reset()
    }
  }


function motion(direction,stripe){
    
    if (direction == '<' && current_char<stripe.length-1){
        current_char++;
    }
  
    if (direction == '>' && current_char>0){
        current_char--;
    }
    
    drawStripes(current_char,stripe)
}

document.onkeydown = function(evt){keypressHandler(evt)};


function setCharAt(index,chr) {
    
    if(index > tape.length-1) return tape;
    tape = tape.substring(0,index) + chr + tape.substring(index+1);
}

let instructions = {
    'q0': {
        '0' : 
            ['q1','0','>']
        ,
        '1' : 
            ['q0' ,'1' ,'>']
        ,
        ' ' : 
            ['qi' , ' ', null]
        
    },
    'q1' : {
        '0':
            ['q0' , '0','>']
        ,
        '1':
            ['q1' , '1' , '>']
        ,
        
    }
}
let index = 0;
drawSquares(tape)
drawStripes(index,tape)
let state = 'q0';
let current_char = 0;

function reset(){
    current_char = 0;
    drawSquares(tape)
    drawStripes(index,tape)
    state = 'q0';
    
}

//while(state !='qi' && state != 'qReject')

function iterate() {
    
    trans_func = instructions[state][tape[current_char]]
    state = trans_func[0]
    setCharAt(current_char,trans_func[1]);
        if (trans_func[2] == '>'){
        motion('<',tape)
        //current_char = current_char + 1
    }
    if (trans_func[2] == '<'){
        motion('>',tape)
        //current_char = current_char - 1
    }
    console.log(tape.length)
    next_trans_func = instructions[state][tape[current_char]]

    if (tape[current_char] == ' '){
        if (next_trans_func != undefined){
            state = next_trans_func[0]
            clearInterval(timer)
        }
        if (next_trans_func == undefined){
            //a simulating booleant at kell irni majd arra, hogy a state legyen bool
            //ha nincs állapotunk a szalag végére érve, akkor az nem elfogadó állapotot jelent tehát:
            state = 'qReject'
            clearInterval(timer)
        }
        if (state == 'qi'){
            console.log('ACCEPTED')
        }
        else{
            console.log('DENIED')
        }
    }
}  
