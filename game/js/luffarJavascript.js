var player = "X";
var whoIsThePlayer ="New Game";
var playerXWins = 0;
var playerOWins = 0;
var xWIN = "";
var oWIN = "";
var counter = 0;
var node1 = "?";
var node2 = "?";
var node3 = "?";
var node4 = "?";
var node5 = "?";
var node6 = "?";
var node7 = "?";
var node8 = "?";
var node9 = "?";
function resetGame()
{
counter = 0;
  node1 = "?";
  node2 = "?";
  node3 = "?";
  node4 = "?";
  node5 = "?";
  node6 = "?";
  node7 = "?";
  node8 = "?";
  node9 = "?";
status1.innerHTML = myColorFunction(node1);
status2.innerHTML = myColorFunction(node2);
status3.innerHTML = myColorFunction(node3);
status4.innerHTML = myColorFunction(node4);
status5.innerHTML = myColorFunction(node5);
status6.innerHTML = myColorFunction(node6);
status7.innerHTML = myColorFunction(node7);
status8.innerHTML = myColorFunction(node8);
status9.innerHTML = myColorFunction(node9);
status10.innerHTML = myColorFunction(whoIsThePlayer);
}
function pick(choice){
   
   


var status1 = document.getElementById("status1");
var status2 = document.getElementById("status2");
var status3 = document.getElementById("status3");
var status4 = document.getElementById("status4");
var status5 = document.getElementById("status5");
var status6 = document.getElementById("status6");
var status7 = document.getElementById("status7");
var status8 = document.getElementById("status8");
var status9 = document.getElementById("status9");
var status10 = document.getElementById("status10");
var status11 = document.getElementById("status11");
var status12 = document.getElementById("status12");




if(choice == 1 && node1 != "X" && node1 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node1 = player;
counter++;

}
else if(choice == 2 && node2 != "X" && node2 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node2 = player;
counter++;

}
else if(choice == 3 && node3 != "X" && node3 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node3 = player;
counter++;

}
else if(choice == 4 && node4 != "X" && node4 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node4 = player;
counter++;

}
else if(choice == 5 && node5 != "X" && node5 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node5 = player;
counter++;

}
else if(choice == 6 && node6 != "X" && node6 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node6 = player;
counter++;

}
else if(choice == 7 && node7 != "X" && node7 != "O"){
    whoIsThePlayer = "Turn: " + player;
     if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node7 = player;
counter++;

}
else if(choice == 8 && node8 != "X" && node8 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node8 = player;
counter++;

}
else if(choice == 9 && node9 != "X" && node9 != "O"){
    whoIsThePlayer = "Turn: " + player;
        if(player == "X")
{
    player = "O";
}
else if(player == "O")
{
    player = "X";
}
node9 = player;
counter++;

}

status1.innerHTML = myColorFunction(node1);
status2.innerHTML = myColorFunction(node2);
status3.innerHTML = myColorFunction(node3);
status4.innerHTML = myColorFunction(node4);
status5.innerHTML = myColorFunction(node5);
status6.innerHTML = myColorFunction(node6);
status7.innerHTML = myColorFunction(node7);
status8.innerHTML = myColorFunction(node8);
status9.innerHTML = myColorFunction(node9);
status10.innerHTML = myColorFunction(whoIsThePlayer);
status11.innerHTML = myColorFunction(oWIN);
status12.innerHTML = myColorFunction(xWIN);


checkIfWin();

}
function checkIfWin(){
if(node1 == "X" && node2 == "X" && node3 == "X" || node4 == "X" && node5 == "X" && node6 == "X" ||
node7 == "X" && node8 == "X" && node9 == "X" || node1 == "X" && node4 == "X" && node7 == "X" ||
 node2 == "X" && node5 == "X" && node8 == "X"|| node3 == "X" && node6 == "X" && node9 == "X" ||
node1 == "X" && node5 == "X" &&  node9 == "X"|| node3 == "X" && node5 == "X" && node7 == "X"){
    window.alert("Player: " + player + " wins!");
    playerXWins++;
     
    xWIN = "Wins by X: " + playerXWins;
    resetGame();
}
if(node1 == "O" && node2 == "O" && node3 == "O" || node4 == "O" && node5 == "O" && node6 == "O" ||
node7 == "O" && node8 == "O" && node9 == "O" || node1 == "O" && node4 == "O" && node7 == "O" ||
 node2 == "O" && node5 == "O" && node8 == "O"|| node3 == "O" && node6 == "O" && node9 == "O" ||
node1 == "O" && node5 == "O" &&  node9 == "O"|| node3 == "O" && node5 == "O" && node7 == "O"){
    window.alert("Player: " + player + " wins!");
    playerOWins++;
    oWIN = "Wins by O: " + playerOWins;
    resetGame();
}

else if(counter == 9)
{
    window.alert("DRAW!");
     resetGame();
}

}

function myColorFunction(word) {
    var colors = ["darkred", "orange", "yellow", "green", "blue", "purple" ];

    var styler = "";
    if(word.length == 1)
    {
    var korv = Math.floor((Math.random() * 6) + 1);
    styler +=  word.fontcolor(colors[korv]);
    return styler;
    }
   else{

   
for (var i = 0; i < word.length; i++)
{
    styler += word[i].fontcolor(colors[i - (colors.length * Math.floor(i / colors.length))]) // It does stuff
}
  word = styler;
            
      return word;
    
    }

    }