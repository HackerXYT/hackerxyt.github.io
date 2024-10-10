
document.addEventListener('DOMContentLoaded', () => {
    console.log("[EE] Event Listener Registered");
    setTimeout(function() {
        $("#1a").fadeIn("350", function() {
            $("#2a").fadeIn("350", function() {
                $("#3a").fadeIn("350", function() {
                    $("#4a").fadeIn("350", function() {
                        $("#5a").fadeIn("350", function() {
                            $("#6a").fadeIn("350", function() {
                                setTimeout(function() {
                                    //$("#cms").fadeOut("fast")
                                    document.getElementById("ca").classList.add("w")
                                }, 200)
                            })
                        })
                    })
                })
            })
        })
    }, 2200)
    
})