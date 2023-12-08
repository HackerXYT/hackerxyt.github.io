function fadeError(method) {
    var targetColor = "rgb(255, 99, 71)";
    var fadeDuration = 2000;
    let element;
    if(method == "1") {
        element = document.getElementById("username");
        element.style.backgroundColor = targetColor;
    } else if(method == "2") {
        element = document.getElementById("password");
        element.style.backgroundColor = targetColor;
    } else if(method == "3") {
        element = document.getElementById("email");
        element.style.backgroundColor = targetColor;
    } else if(method == "4") {
        element1 = document.getElementById("username");
        element1.style.backgroundColor = targetColor;
        element2 = document.getElementById("password");
        element2.style.backgroundColor = targetColor;
        element3 = document.getElementById("email");
        element3.style.backgroundColor = targetColor;
        setTimeout(function () {
            element1.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
            element2.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
            element3.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
        }, 2000)
        return;
    }
    setTimeout(function (){
        element.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
    }, 2000)
}

function enable() {
    setTimeout(function (){
        $( "#register" ).fadeIn( "slow", function() {})
        document.getElementById("submit").disabled = false;
        document.getElementById("submit").innerHTML = `Register`
    },500)
}

function isValidUsername(username) {
    // Usernames can contain alphanumeric characters and underscores
    var regex = /^[a-zA-Z0-9_]+$/;
    return regex.test(username);
}
function isValidEmail(email) {
    // Simple email validation using regular expression
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
function isValidPassword(password) {
    // Passwords must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit
    var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regex.test(password);
}

function goto_register() {
    $( "#container" ).fadeOut( "slow", function() {
        $( "#bottom-logo" ).fadeOut( "slow", function() {
            $( "#register" ).fadeOut( "slow", function() {
            window.location.href = "../Login/index.html"
        })
        })
        })
}