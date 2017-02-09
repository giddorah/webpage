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

    var timerAmPm = hours + ":" + minutes + ":" + seconds + " ";

    if(hours > 11){
        timerAmPm += "PM";
    }
    else {
        timerAmPm += "AM";
    }
    if(seconds == 10) timerAmPm = "korv";
    document.getElementById("timerAmPm").innerHTML = timerAmPm;


}
setInterval(TimeFunction, 1000);