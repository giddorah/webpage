var bankroll = 10;

function mainGame() {
    document.getElementById("bankroll").innerText = bankroll;
}

function bet() {
    draw();
}

function stay() {

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