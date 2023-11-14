"use strict"
$(window).on("load", function() {
    function countDown(){
        var today = new Date();
        var eventDate = new Date("December 12,2022 00:00:00");
        var currentTime = today.getTime();
        var eventTime = eventDate.getTime();
        var remTime = eventTime - currentTime;

        var sec = Math.floor(remTime/1000);
        var min = Math.floor(sec/60);
        var hrs = Math.floor(min/60);
        var days = Math.floor(hrs/24);

        hrs %= 24;
        min %= 60;
        sec %= 60;

        days = (days<10) ? "0"+days : days;
        hrs = (hrs<10) ? "0"+hrs : hrs;
        min = (min<10) ? "0"+min : min;
        sec = (sec<10) ? "0"+sec : sec;

        var elTimeCounter = $('.time-counter');
        var elDays = $('.days', elTimeCounter);
        var elHours = $('.hours', elTimeCounter);
        var elMinutes = $('.minutes', elTimeCounter);
        var elSeconds = $('.seconds', elTimeCounter);

        $('.num', elDays).html(days);
        $('.num', elHours).html(hrs);
        $('.num', elMinutes).html(min);
        $('.num', elSeconds).html(sec);

        setTimeout(countDown, 1000);
    }
    countDown();
});
const lan = "en"
function changelanunready() { 
    if(lan === "en") {
        $("#text").fadeOut(500)
    $("#notifyme").fadeOut(500)
    $("#header").fadeOut(500)
    setTimeout(function() {
        $("#text").html("Ο ιστότοπός μας είναι υπό κατασκευή, πληκτρολογήστε το email σας για να ειδοποιηθείτε όταν ο ιστότοπός μας είναι έτοιμος");
        $("#text").fadeIn(100)
        $("#notifyme").html("Ενημερώστε με");
        $("#notifyme").fadeIn(100)
        $("#header").html("Επιστρέφουμε Σύντομα!");
        $("#header").fadeIn(100)
        const lan = "el"
    }, 490)
    } else if(lan === "el") {
        $("#text").fadeOut(500)
    $("#notifyme").fadeOut(500)
    $("#header").fadeOut(500)
    setTimeout(function() {
        $("#text").html("Our website is currently under construction, type your email to get notified when our site is ready");
        $("#text").fadeIn(100)
        $("#notifyme").html("Notify me");
        $("#notifyme").fadeIn(100)
        $("#header").html("We’ll be back Soon!");
        $("#header").fadeIn(100)
        var lan = "en"
        }, 490)
    } else {
        console.log("no")
    }
    
}