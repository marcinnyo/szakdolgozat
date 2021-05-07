let stripe = '110000001 ';

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



function setCharAt(index,chr) {
    
    if(index > stripe.length-1) return stripe;
    stripe = stripe.substring(0,index) + chr + stripe.substring(index+1);
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
    }
}
let state = 'q0';
let simulating = true
let current_char = 0;
 while (simulating) {
    
    console.log(current_char)
    trans_func = instructions[state][stripe[current_char]]
    state = trans_func[0]
    setCharAt(current_char,trans_func[1]);
    if (trans_func[2] == '>'){
        current_char = current_char + 1

    }
    if (trans_func[2] == '<'){
        current_char = current_char - 1
           
    }
    next_trans_func = instructions[state][stripe[current_char]]

    if (stripe[current_char] == ' '){
        
        
        if (next_trans_func != undefined){
            state = next_trans_func[0]
            simulating = false
        }
        
    }
}  

if (state == 'qi'){
    console.log('ACCEPTED')
}
else{
    console.log('DENIED')
}


/* for (let i = 0; i<stripe.length; ++i){
    console.log(i)
    if ( state == 'q0' && stripe[i] == 0 && i != stripe.length)
    {
        state = 'q1'
        setCharAt(i,'0');
        console.log('haho0')

    }
    if ( state == 'q1' && stripe[i] == '0' )
    {
        state = 'q0'
        setCharAt(i,'0');
        console.log('haho1')
    }
    if ( state == 'q0' && stripe[i] == '1' && i != stripe.length)
    {
        state = 'q0'
        setCharAt(i,'1');
        console.log('haho2')
    }
    if ( state == 'q1' && stripe[i] == '1' )
    {

        state = 'q1'
        setCharAt(i,'1');
        console.log('haho3')
    }   
        
    if ( state == 'q0'  && i == stripe.length-1 )
    {
        state = 'qi'
        console.log('haho4')
    }

} */
