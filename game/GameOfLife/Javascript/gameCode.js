// Här skapas variablerna för storleken av fältet
var width = 54;
var height = 21;
// variablen halfway används av presets som utgångspunkt för var den ska placera ut rutor.
// Den har skydd så att den alltid utgår fron mitten av skärmen och alltid är heltal.
var halfway = height*width/2;
if(height%2==0) 
    halfway+=(width/2);
if(2*halfway%2!=0)
     halfway -= 0.5;
// var width = 5;
// var height = 5;
var mouseWidth = 1;
var mouseHeight = 1;
// Arrayn count håller reda på värdena av alla rutor
var count = new Array(width*height);

// Håller reda på  alla tidigare genererationer
var allPrevious = new Array(new Array(1), new Array(width*height));
var previouses = 1;

// hastigheten spelet körs när man trycker start
var speed = 450;

// hastigheten som vissas
var userSpeed = 6;

var started = false;
var generations = 0;

for (var i = 0; i<count.length; i++){
    count[i] = 0;
    allPrevious[0][i] = 0;
}

//här skapas spelfältet
function fieldSetup(){
    document.getElementById("speed").innerHTML = "speed: " + userSpeed;
    document.getElementById("width").value = width;
    document.getElementById("height").value = height;
    document.getElementById("MouseWidth").value = mouseWidth;
    document.getElementById("MouseHeight").value = mouseHeight;
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

// här skapas rutorna i spelfältet
function buttonSetup(){
    for(i = 0; i<count.length; i++){
        var element = '<input type="button" class="button" id="';
        element += i+1; 
        element +='" style= "color:lightgray" onclick="buttonPress(';
        element += i+1;
        element += ')">';
        var id = "button"+(i+1);
        document.getElementById(id).innerHTML = element;
    }    
}

// ändrar storleken på spelfältet
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

function setMouseSize(){
    mouseWidth = parseInt(document.getElementById("MouseWidth").value);
    mouseHeight = parseInt(document.getElementById("MouseHeight").value);
}

function buttonPress(buttonNumber){
    var currentButton = buttonNumber-2;
    var tempWidth = mouseWidth;
    for(var i = 0; i<mouseHeight; i++){
        for(var j = 0; j<tempWidth; j++){
            currentButton++;
            setColor(currentButton+1);
            if(currentButton%width==width-1) {
                tempWidth = j+1; 
            }
        }      
        currentButton += width-tempWidth;
        if (currentButton>=height*width) i = mouseHeight;
    }
}

// här ändras färgen i rutorna
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


// Här görs varje "steg" när man trycker framåt eller startar spelet.
// Den ska inte göra något om det inte varit någon förändring
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

// Om man går tillbaka ett steg till ett tidigare skede.
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

// start funktionen
function start(){
    started = !started;
    changeButtons();
    if(started) var id = setInterval(frame, speed);
    function frame() {
        if(started)nextMove();
        else clearInterval(id);
    }
}

// det som sköter att knapparna inaktiveras när man startar.
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

// höjer hastigheten
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

// sänker hastigheten
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

// inverterar alla rutor, används ej
function inverse(){
    for(i = 0; i < count.length; i++){
        setColor(i+1);
    }
}

// Tömmer fältet och återställer allt
function clearAll(){
    for(var i = 0; i < count.length; i++){
            count[i]=1
            setColor(i+1)           
    }
            allPrevious = new Array(new Array(1), new Array(width*height));
            previouses = 1;
            generations = 0
            document.getElementById("generation").innerHTML = "generation: " + generations;
}

// Alla förinställda fält positioner
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
