var bankroll = 10;
var highscore = 0;

function mainGame() {
    document.getElementById("bankroll").innerText = bankroll;
    document.getElementById("highscore").innerText = highscore;
}

function bet() {
    draw();
}

function stay() {
    if (bankroll >= highscore)
    {
        highscore = bankroll;
        bankroll = 10;
        /*document.cookie = highscore;*/
    }
    else
    {
        bankroll = 10;
        /*readCookie();*/
    }
    mainGame();
}

function win() {
    bankroll = bankroll *2;
}

function lose() {
    bankroll = bankroll /2;
}

function draw() {
    var randomNumber = Math.random()*10;
    randomNumber = randomNumber-randomNumber%1;
    
    if(randomNumber %2 == 0)
    {
        win();
    }
    else
    {
        lose();
    }
    mainGame();
}


/*
function readCookie() {
    highscore = document.cookie;
}
*/