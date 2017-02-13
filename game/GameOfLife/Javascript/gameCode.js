var width = 54;
var height = 21;
var halfway = height*width/2;
if(height%2==0) 
    halfway+=(width/2);
if(2*halfway%2!=0)
     halfway -= 0.5;
// var width = 5;
// var height = 5;
var count = new Array(width*height);
var allPrevious = new Array(new Array(1), new Array(width*height));
var previouses = 1;
var speed = 450;
var userSpeed = 6;
var started = false;
var generations = 0;

for (var i = 0; i<count.length; i++){
    count[i] = 0;
    allPrevious[0][i] = 0;
}

function fieldSetup(){
    document.getElementById("speed").innerHTML = "speed: " + userSpeed;
    document.getElementById("width").value = width;
    document.getElementById("height").value = height;
    changeButtons();
    var element = '<div class="table">';
    for(var i = 0; i<height; i++){
        element += '<div class="row">';
        for(var j = 0; j<width;j++) {
                element += '<div class="cell" id="button'
                element += j+1+(width*i);
                element += '"></div>';
        }
        element += '</div>';
    }
    element += '</div';
    document.getElementById("field").innerHTML = element;
}

function changeSize(){
    width = parseInt(document.getElementById("width").value);
    if(width > 54) width = 54;
    height = parseInt(document.getElementById("height").value);
    if(height > 21) height = 21;
    halfway = height*width/2;
    if(height%2==0) 
        halfway+=(width/2);
    if(2*halfway%2!=0)
         halfway += 0.5;
    count = new Array(width*height);
    document.getElementById("generation").innerHTML = "generation: " + generations;
    fieldSetup();
    buttonSetup();
    clearAll();
}

function buttonSetup(){
    for(i = 0; i<count.length; i++){
        var element = '<input type="button" class="button" id="';
        element += i+1; 
        element +='" style= "color:lightgray" onclick="setColor(';
        element += i+1;
        element += ')">';
        var id = "button"+(i+1);
        document.getElementById(id).innerHTML = element;
    }    
}

function setColor(buttonNumber){
    var element = document.getElementById(buttonNumber);
    if (count[buttonNumber-1] == 1){
        element.style.backgroundColor = "lightgray";   
        count[buttonNumber-1]=0;    
    }
    else{
        element.style.backgroundColor = "black";
        count[buttonNumber-1]=1; 
    }
}

function nextMove(){
    var isEqual = true;
    for(var i = 0; i<count.length;i++){
        if(count[i] != allPrevious[allPrevious.length-previouses][i])
            isEqual = false;
    }
    if(!isEqual){
        document.getElementById("generation").innerHTML = "generation: " + ++generations;
        console.log(generations);
        var temp = new Array(count.length);
        var neighbours;
        allPrevious[allPrevious.length] = new Array(0);
        for(i=0;i<count.length; i++){
            temp[i] = count[i];
            allPrevious[allPrevious.length-previouses][i] = count[i];
            neighbours = 0;

            // if(i == 0) neighbours = count[i+1]+count[i+5]+count[i+6];
            // else if(i == 4) neighbours = count[i-1]+count[i+4]+count[i+5];
            // else if(i == 20) neighbours = count[i-5]+count[i-4]+count[i+1];
            // else if(i == 24) neighbours = count[i-6]+count[i-5]+count[i-1];
            // else if(i < 5) neighbours = count[i-1]+count[i+1]+count[i+4]+count[i+5]+count[i+6];
            // else if(i > 20) neighbours = count[i-6]+count[i-5]+count[i-4]+count[i-1]+count[i+1];
            // else if(i%5==0) neighbours = count[i-5]+count[i-4]+count[i+1]+count[i+5]+count[i+6];
            // else if(i%5==4) neighbours = count[i-6]+count[i-5]+count[i-1]+count[i+4]+count[i+5];
            // else neighbours = count[i-6]+count[i-5]+count[i-4]+count[i-1]+count[i+1]+count[i+4]+count[i+5]+count[i+6];

            if(i == 0) 
                neighbours = count[i+1]+count[i+width]+count[i+width+1];
            else if(i == width-1) 
                neighbours = count[i-1]+count[i+width-1]+count[i+width];
            else if(i == height*width-width) 
                neighbours = count[i-width]+count[i-width+1]+count[i+1];
            else if(i == height*width-1) 
                neighbours = count[i-width-1]+count[i-width]+count[i-1];
            else if(i < width) 
                neighbours = count[i-1]+count[i+1]+count[i+width-1]+count[i+width]+count[i+width+1];
            else if(i > height*width-width) 
                neighbours = count[i-width-1]+count[i-width]+count[i-width+1]+count[i-1]+count[i+1];
            else if(i%width==0) 
                neighbours = count[i-width]+count[i-width+1]+count[i+1]+count[i+width]+count[i+width+1];
            else if(i%width==width-1) 
                neighbours = count[i-width-1]+count[i-width]+count[i-1]+count[i+width-1]+count[i+width];
            else 
                neighbours = count[i-width-1]+count[i-width]+count[i-width+1]+count[i-1]+count[i+1]+count[i+width-1]+count[i+width]+count[i+width+1];

            // if(i % width != 0) {
            //     neighbours += count[i-1];
            //     if(i > width)
            //         neighbours += count[i-width-1];
            //     if(i <= (height-1)*width) 
            //         neighbours += count[i+width-1];
            // }
            // if(i % width != width-1) {
            //     neighbours += count[i+1];
            //     if(i >= width)
            //         neighbours += count[i-width+1];
            //     if(i < (height-1)*width) 
            //         neighbours += count[i+width+1];
            // }
            // if(i >= width)
            //     neighbours += count[i-width];
            // if(i < (height-1)*width) 
            //     neighbours += count[i+width];

            if(neighbours == 3){
                temp[i] = 1;
            }
            else if(!(temp[i] == 1 && neighbours == 2)){
                temp[i] = 0;
            } 
        }

        for(i=0;i<count.length; i++){
            if(temp[i] != count[i]) 
            {
                setColor(i+1);
            }
        }
    }
}

function lastMove(){
    --generations;
    if(generations < 0) generations = 0;
    document.getElementById("generation").innerHTML = "generation: " + generations;
    for(i=0;i<count.length; i++){
        if(allPrevious[allPrevious.length-previouses][i] != count[i]) {
            setColor(i+1);
        }
    }
    previouses++;
    if(previouses == allPrevious.length)
        clearAll();
}

function start(){
    started = !started;
    changeButtons();
    if(started) var id = setInterval(frame, speed);
    function frame() {
        if(started)nextMove();
        else clearInterval(id);
    }
}

function changeButtons(){
    var starter = document.getElementsByClassName("startButton");
    if(started) starter[0].setAttribute("value", "Stop");
    else starter[0].setAttribute("value", "Start");
    
    for(i=1;i<=6;i++){
        var name = "Disable"+i;
        var elements = document.getElementById(name);
        if(started)
            elements.setAttribute('disabled', 'disabled');   
        else
            elements.removeAttribute('disabled', 'disabled');        
    }
}

function faster(){
    if(speed>1050)speed-=500;
    else speed-=150;
    if(speed < 0) speed = 0;
    if(userSpeed < 9) {
        userSpeed++;
        document.getElementById("speed").innerHTML = "speed: " + userSpeed;
    }
    console.log("faster " + speed);
}

function slower(){
    if(speed>=1050)speed+=500;
    else speed+=150;
    if(userSpeed > 1) {
        userSpeed--;
        document.getElementById("speed").innerHTML = "speed: " + userSpeed;        
    }
    else speed -= 500;
    console.log("slower " + speed);
}

function inverse(){
    for(i = 0; i < count.length; i++){
        setColor(i+1);
    }
}

function clearAll(){
    for(i = 0; i < count.length; i++){
            count[i]=1
            setColor(i+1)
    }
            allPrevious = new Array(new Array(1), new Array(width*height));
            previouses = 1;
            generations = 0
            document.getElementById("generation").innerHTML = "generation: " + generations;
}

function preset1(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i == halfway-width-2 || i == halfway-width-1 || i == halfway-width 
        || i == halfway-3 || i == halfway+1 
        || i == halfway+width-2 || i == halfway+width-1 || i == halfway+width)
            count[i] = 0;
        else 
            count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset2(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i == halfway-width-3 || i == halfway-width-2 || i == halfway-width-1 || i == halfway-width || i == halfway-width+1 
        || i == halfway-3 || i == halfway+1 
        || i == halfway+width-3 || i == halfway+width-2 || i == halfway+width || i == halfway+width+1 
        || i == halfway+2*width-1)
            count[i] = 0;
        else 
            count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset3(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i == halfway-3 || i == halfway-2
        || i == halfway+width-2 || i == halfway+width-1 
        || i == halfway+2*width-3)
            count[i] = 0;
        else 
            count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset4(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i == halfway-6*width-6 || i == halfway-6*width-5 || i == halfway-6*width-2 || i == halfway-6*width-1 || i == halfway-6*width || i == halfway-6*width+3 || i == halfway-6*width+4 
        || i == halfway-5*width-7 || i == halfway-5*width-6 || i == halfway-5*width-3 || i == halfway-5*width-2 || i == halfway-5*width || i == halfway-5*width+1 || i == halfway-5*width+4 || i == halfway-5*width+5
        || i == halfway-4*width-7 || i == halfway-4*width-4 || i == halfway-4*width-3 || i == halfway-4*width-2 || i == halfway-4*width-1 || i == halfway-4*width || i == halfway-4*width+1 || i == halfway-4*width+2 || i == halfway-4*width+5
        || i == halfway-3*width-5 || i == halfway-3*width-4 || i == halfway-3*width-3 || i == halfway-3*width+1 || i == halfway-3*width+2 || i == halfway-3*width+3
        || i == halfway-2*width-6 || i == halfway-2*width-5 || i == halfway-2*width-4 || i == halfway-2*width+2 || i == halfway-2*width+3 || i == halfway-2*width+4
        || i == halfway-width-7 || i == halfway-width-6 || i == halfway-width-5 || i == halfway-width-1 || i == halfway-width+3 || i == halfway-width+4 || i == halfway-width+5
        || i == halfway-7 || i == halfway-5 || i == halfway-2 || i == halfway || i == halfway+3 || i == halfway+5
        || i == halfway+width-7 || i == halfway+width-6 || i == halfway+width-5 || i == halfway+width-1 || i == halfway+width+3 || i == halfway+width+4 || i == halfway+width+5
        || i == halfway+2*width-6 || i == halfway+2*width-5 || i == halfway+2*width-4 || i ==  halfway+2*width+2 || i == halfway+2*width+3 || i == halfway+2*width+4
        || i == halfway+3*width-5 || i == halfway+3*width-4 || i == halfway+3*width-3 || i == halfway+3*width+1 || i == halfway+3*width+2 || i == halfway+3*width+3
        || i == halfway+4*width-7 || i == halfway+4*width-4 || i == halfway+4*width-3 || i == halfway+4*width-2 || i == halfway+4*width-1 || i == halfway+4*width || i == halfway+4*width+1 || i == halfway+4*width+2 || i == halfway+4*width+5
        || i == halfway+5*width-7 || i == halfway+5*width-6 || i == halfway+5*width-3 || i == halfway+5*width-2 || i == halfway+5*width || i == halfway+5*width+1 || i == halfway+5*width+4 || i == halfway+5*width+5
        || i == halfway+6*width-6 || i == halfway+6*width-5 || i == halfway+6*width-2 || i == halfway+6*width-1 || i == halfway+6*width || i == halfway+6*width+3 || i == halfway+6*width+4 
        )
            count[i] = 0;
        else 
            count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset5(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(width%2==0 &&
        (i == halfway-2*width-width/2+1 || i == halfway-2*width-width/2+2 || i == halfway-2*width-width/2+3 || i == halfway-2*width-width/2+4 
        || i == halfway-width-width/2 || i == halfway-width-width/2+4 
        || i == halfway-width/2+4
        || i == halfway+width-width/2 || i == halfway+width-width/2+3))
            count[i] = 0;
        
        else if(i == halfway-2*width-width/2+0.5 || i == halfway-2*width-width/2+1.5 || i == halfway-2*width-width/2+2.5 || i == halfway-2*width-width/2+3.5 
        || i == halfway-width-width/2-0.5 || i == halfway-width-width/2+3.5
        || i == halfway-width/2+3.5
        || i == halfway+width-width/2-0.5 || i == halfway+width-width/2+2.5)
            count[i] = 0;
        else
           count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset6(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i == halfway-5 || i == halfway-4 || i == halfway-3 || i == halfway-2 || i == halfway-1 || i == halfway || i == halfway+1 || i == halfway+2 || i == halfway+3 || i == halfway+4)
        count[i] = 0;
        else 
            count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset7(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i == halfway-2*width-3 || i == halfway-2*width-2 || i == halfway-2*width || i == halfway-2*width+1
        || i == halfway-width-3 || i == halfway-width-2 || i == halfway-width || i == halfway-width+1 
        || i == halfway-2 || i == halfway 
        || i == halfway+width-4 || i == halfway+width-2 || i == halfway+width || i == halfway+width+2 
        || i == halfway+2*width-4 || i == halfway+2*width-2 || i == halfway+2*width || i == halfway+2*width+2 
        || i == halfway+3*width-4 || i == halfway+3*width-3 || i == halfway+3*width+1 || i == halfway+3*width+2)
        count[i] = 0;
    else 
        count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}

function preset8(){
    clearAll();
    for (var i = 0; i<count.length; i++){
        if(i ==  halfway-7*width+5 || i == halfway-7*width+6 || i == halfway-7*width+16 || i == halfway-7*width+17 
        || i == halfway-6*width+4 || i == halfway-6*width+6 || i == halfway-6*width+16 || i == halfway-6*width+17 
        || i == halfway-5*width-18 || i == halfway-5*width-17 || i == halfway-5*width-9 || i == halfway-5*width-8 || i == halfway-5*width+4 || i == halfway-5*width+5 
        || i == halfway-4*width-18 || i == halfway-4*width-17 || i == halfway-4*width-10 || i == halfway-4*width-8 
        || i == halfway-3*width-10 || i == halfway-3*width-9 || i == halfway-3*width-2 || i == halfway-3*width-1 
        || i == halfway-2*width-2 || i == halfway-2*width 
        || i == halfway-width-2 
        || i == halfway+17 || i == halfway+18 
        || i == halfway+width+17 || i == halfway+width+19 
        || i == halfway+2*width+17


        || i == halfway+5*width+6 || i == halfway+5*width+7 || i == halfway+5*width+8 
        || i == halfway+6*width+6 
        || i == halfway+7*width+7)
        count[i] = 0;
    else 
        count[i] = 1;
    }
    for(var i=0;i<count.length; i++){
        setColor(i+1);
    }
}
