

function floridaStart() {
    document.getElementById("launchFloridaCont").classList.add("active")
    return_to_options('security');navigator('sett_def')
    settings();
    let floridaRest = setInterval(function() {
        if(sessionStorage.getItem("exitFl")) {
            clearInterval(floridaRest)
            document.getElementById("launchFloridaCont").classList.remove("active")
            settings();
            pswd_secure()
            sessionStorage.removeItem("exitFl")
        }
    })
}
