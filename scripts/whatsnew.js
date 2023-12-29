if (/Mobi/.test(navigator.userAgent)) {
    // The user is on a mobile device
    setTimeout(function() {
        if(localStorage.getItem("news_seen") !== "true") {
            $("#loaderframe").fadeOut("fast");
            $("#chatvia_full").fadeOut("fast");
            $("#rounded-container").fadeIn("slow")
        }
      }, 2000)  
}

function show_news() {
    $("#loaderframe").fadeOut("fast");
    $("#chatvia_full").fadeOut("fast");
    $("#rounded-container").fadeIn("slow")
}
function close_news() {
    localStorage.setItem("news_seen", true)
    console.log("Closing News Tab")
    $("#chatvia_full").fadeIn("slow");
    $("#rounded-container").fadeOut("fast")
}