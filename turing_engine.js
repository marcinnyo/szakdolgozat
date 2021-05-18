let tape = '___1___';

function removeActive(){
    var current = document.getElementsByClassName("active");
    if (current.length != 0){
        current[0].classList.remove('active');
    }
}

let btnContainer = document.getElementsByClassName("button-outer")
btnContainer[0].addEventListener('click', function(){
    removeActive()
});

for (let i = 1; i < btnContainer.length; i++) {
 
    btnContainer[i].addEventListener("click", function(){
        removeActive()
        this.classList.add("active");
      
    });
}

function fillup(){
    ////<validation>



    ///</validation>
    let value = document.getElementById("szalaginput").value
    if (value != ''){
        tape = '___' + document.getElementById("szalaginput").value + '___'
        original_tape = tape
        reset()
        document.getElementById("szalaginput").value  = ''
    }
    
}
let original_tape = "___1___"
let start_string = 3;
drawSquares(tape)
drawStripes(start_string,tape)
let state = 'q0';
let accept;
let current_char = 3;


let instructions; 
let all_data;
console.log(all_data)
function compile(){
    ////<validation>
    let read_state = null;
    let read_char = null;
    let scannable = true;
    
    let data = {
        "name": null,
        "initial": null,
        "accept": null
    }

    let transition_functions = {}

    ///</validation>
    let text = document.getElementById("text").value
    let lines = text.split("\n")

    for (let line of lines){
        if (line[0] == '/' && line[1] == '/') { /////comment
            continue
        }
        
        else if (/\s*[\w]+\s*:\s*[\w]+\s*/.test(line)){
            let words = line.split(":");
            data[words[0].trim()] = words[1].trim()
            console.log('ejjjj')
        }


        else if (/^\s*[\w]+\s*,\s*[\w]+\s*$/.test(line)){
            if (read_state!=null && read_char!=null){
                console.log('error')////ERROR
                transition_functions=null
                break
            }
            else if (read_state==null && read_char==null){
                let words = line.split(",");
                read_state = words[0].trim()
                read_char = words[1].trim()
            }
            
        }
        else if (/^\s*[\w]+\s*,\s*[\w]+\s*,\s*[<|>|-]+\s*$/.test(line)){
            let words = line.split(",");
            words = words.map(s => s.trim());
            if (read_state!=null && read_char!=null && words.length==3 && !transition_functions.hasOwnProperty(read_state)){
                console.log('333')
                transition_functions[read_state] = {}
                transition_functions[read_state][read_char] = words
                read_state = null
                read_char = null;
            }
            else if (read_state!=null && read_char!=null && words.length==3 && transition_functions.hasOwnProperty(read_state)){               
                transition_functions[read_state][read_char] = words
                read_state = null
                read_char = null;
            }
            else{
                console.log('error')
                ////HIBA
                transition_functions=null

                break
            }
            
        }
        
    }

    if (data["initial"] == null || data["accept"] == null || transition_functions == null){
        //console.log("hiba, a kezdo, vagy vegallapot nincs megadva")///HIBA
        let error = document.getElementById("error")
        error.style.display = "block"
        data = null
        return 
    }
    
    [...document.getElementsByClassName('button-outer')].map(el => el.style.pointerEvents = "auto")
    document.getElementById("szalagbutton").style.pointerEvents = "auto"

    data["instructions"] = transition_functions

    state = data["initial"]
    accept = data["accept"]
    drawState(state)
    all_data = data
}


let inmotion = false;
function start(){
    if (!inmotion){
        inmotion = true;
        timer=setInterval(function ()
        {
        iterate();
        }, 500);
    }   
}
function pause(){
    //console.log(btnContainer[0].querySelectorAll('div'))
    clearInterval(timer)
    inmotion = false;
}



function motion(direction,stripe){
    

    if (direction == '>' && current_char<stripe.length-1){
        current_char++;
    }
  
    if (direction == '<' && current_char>0){
        current_char--;
    }
    drawStripes(current_char,tape)
}



function setCharAt(index,chr) {
    
    if(index > tape.length-1) return tape;

    

    else if (tape[index] == "_" && index>=start_string && chr != "_"){
        tape = tape.substring(0,index) + chr + "___";
    }
    else if (tape[index] == "_"  && index<start_string){
        

        if (chr != '_'){
            current_char++   
            tape = "___" + chr + tape.substring(index+1,tape.length);
        }
        
    }
    else if(tape[index] != "_"  && chr == "_"){
        
        if(index<=start_string){
            
            tape = "___"  + tape.substring(index+1,tape.length);
            current_char = 2;
            console.log('nem szabadna'+current_char)
        }
        else{
            tape = tape.substring(0,index) + "___";
        }
        
    }
    else{
        console.log('4')

        tape = tape.substring(0,index) + chr + tape.substring(index+1);
    }

    
    
    console.log(tape[current_char] + 'asd')
}




function reset(){
    tape = original_tape
    start_string = 3
    inmotion = false;
    clearInterval(timer)
    current_char = 3;
    drawCanvas()
    drawSquares(tape)
    drawStripes(start_string,tape)
    state = all_data["initial"];
}


function iterate() {

    trans_func = all_data["instructions"][state][tape[current_char]]
    
    if (trans_func != undefined){
        drawCanvas()
        drawState(state)
       
        state = trans_func[0]
        setCharAt(current_char,trans_func[1],tape);

        if (state == 'qi' || state == accept){
            removeActive()
            clearInterval(timer)
            console.log('ACCEPTED')
            motion(trans_func[2],tape)
            Accepted()
            return
        }
        if (trans_func[2] == '-'){
            removeActive()
            clearInterval(timer)
            console.log('DENIED')
            motion(trans_func[2],tape)
            Denied()
            return
        }
        
        motion(trans_func[2],tape)

        
    
    }
    if (trans_func == undefined){
        //a simulating booleant at kell irni majd arra, hogy a state legyen bool
        //ha nincs állapotunk a szalag végére érve, akkor az nem elfogadó állapotot jelent tehát:
        //state = 'qReject'
        Denied()
        removeActive()
        clearInterval(timer)
        console.log('DENIED')
        return

    }
    
}  



