var bankroll = 10; // saves the bankroll, global.
var highscore = 0; // highscore variable, global.

function mainGame() {
    document.getElementById("bankroll").innerText = bankroll; // Writes the contents of bankroll to the site.
    document.getElementById("highscore").innerText = highscore; // Same but highscore
}

function bet() {
    draw(); // Runs the game-mechanics again.
}

function stay() {
    if (bankroll >= highscore)
    { // If bankroll is higher than highscore, saves highscore.
        highscore = bankroll;
        bankroll = 10; // Resets the bankroll
        /*document.cookie = highscore;*/
    }
    else
    { // Resets the bankroll
        bankroll = 10;
        /*readCookie();*/
    }
    mainGame(); // Runs the main mechanics again.
}

function win() { // Win doubles bankroll
    bankroll = bankroll *2;
}

function lose() { // Loss halves the bankroll
    if (bankroll == 1.25)
    { // If bankroll hits 1.25
        bankroll = 0;
        alert("You lost everything.");
        stay(); // Resets the game.
    }
    else
    { // Halves the bankroll
    bankroll = bankroll /2;
    }
}

function draw() { // Does a random number between 1 and 10
    var randomNumber = Math.random()*10;
    randomNumber = randomNumber-randomNumber%1; // Makes the number an integer
    
    if(randomNumber %2 == 0)
    { // If the random number is an even number you win.
        win();
    }
    else
    { // If the random number is an uneven number you lose.
        lose();
    }
    mainGame(); // Runs the main game mechanics
}


/*
function readCookie() {
    highscore = document.cookie;
}
*/
