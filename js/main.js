function TimeFunction()
{
    // Skapar curent time som hämtar aktuellt datum.
    //Gör sedan variabler för timmar, minuter och sekunder.
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

//If satser för att lägga till en nolla om minuterna eller sekunderna är under 10 vilket gör att klockan inte hela tiden ändrar storlek.
    if(minutes < 10)
    {
        minutes = "0" + minutes;
    }

    if(seconds < 10)
    {
        seconds = "0" + seconds;
    }
     // Variabel för formateringen utav klockan.
    var timerAmPm = hours + ":" + minutes + ":" + seconds + " ";
    //If satser för att ändra om PM eller AM ska visas beroende på variabeln hours.
    if(hours > 11){
        timerAmPm += "PM";
    }
    else {
        timerAmPm += "AM";
    }
    if(seconds == 10) timerAmPm = "korv o bröd";
    //Vi lägger först till ett mellanrum och sedan hämtar vi en sträng från våran DateGetter funktion.
    timerAmPm += "   " + DateGetter();
    //Vi gör sedan så att man i html kan komma åt variabeln genom id:et "timerAmPM".
    document.getElementById("timerAmPm").innerHTML = timerAmPm;
}
// Kör funktionen TimeFunction varje sekund för att uppdatera klockan.
setInterval(TimeFunction, 1000);

function DateGetter(){
    //Hämtar först datum, vi plussar på 1 på month variabeln för att getMonth() retuneras 0-11 istället för 1-12
    // vilket är det vi vill visa för användaren.
    var date = new Date();
    var dayOfTheMonth = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    // Formetering utav strängen.
    var stringDate = " " + year + "/" + month + "/" + dayOfTheMonth;
    return stringDate;
}