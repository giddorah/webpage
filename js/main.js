function TimeFunction()
{
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    if(minutes < 10)
    {
        minutes = "0" + minutes;
    }

    if(seconds < 10)
    {
        seconds = "0" + seconds;
    }

    var timerAmPm = hours + ":" + minutes + ":" + seconds + " ";

    if(hours > 11){
        timerAmPm += "PM";
    }
    else {
        timerAmPm += "AM";
    }
    if(seconds == 10) timerAmPm = "korv o bröd";
    timerAmPm += "   " + DateGetter();
    document.getElementById("timerAmPm").innerHTML = timerAmPm;
}
setInterval(TimeFunction, 1000);

function DateGetter(){
    var date = new Date();
    dayOfTheMonth = date.getDate();
    month = date.getMonth()+1;
    year = date.getFullYear();
    var stringDate = " " + year + "/" + month + "/" + dayOfTheMonth;
    return stringDate;
}