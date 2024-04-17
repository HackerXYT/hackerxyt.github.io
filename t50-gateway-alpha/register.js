$(document).ready(setup())

function setup() {
    $("#container").fadeIn("slow", function () {
        $("#loading-bar").fadeOut("slow")
    })
}

var input = document.getElementById("password");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keypress", function (event) {
    // Check if the key pressed is Enter (key code 13)
    if (event.keyCode === 13) {
        const email = document.getElementById("email").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        register(username, email, password)
        event.preventDefault();
    }
});

function prepare() {
    const email = document.getElementById("email").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    register(username, email, password)
}

function register(username, email, password) {
    fetch('http://192.168.1.21:4000/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data === "Welcome Abroad") {
                var base64email = btoa(email);
                var base64username = btoa(username);
                console.log("Accepted!")
                $("#container").fadeOut("fast", function () {
                    $("#2fa").fadeIn("fast")
                })
                const url = `http://192.168.1.21:4000/accounts?email=${email}&password=${password}&ip=0`;

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(data => {
                        if(data.includes("Do 2FA")) {
                            console.log("Smooth")
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });

            }
            else if (data === "Account Exists. Retry") {
                window.location.href = `identify.html?email=${btoa(email)}&phPS=${btoa(password)}&phUS=${btoa(username)}`
                document.getElementById("info_text").innerHTML = "Email Is Linked To Another Account!"
                document.getElementById("info_text").style.display = "block"
                document.getElementById("info_text").style.color = "rgb(196, 0, 0)"//yellow
                setTimeout(function () {
                    document.getElementById("info_text").style.display = "none"
                }, 3500)
            }
        })
        .catch(error => {
            console.error(error);
        });
}


document.getElementById("dig1").addEventListener("input", function () {
    if (document.getElementById("dig1").value !== "") {
        document.getElementById("dig2").focus()
    } else {
        console.log("2FA Possibly Empty")
    }

});

document.getElementById("dig2").addEventListener("input", function () {
    if (document.getElementById("dig2").value !== "") {
        document.getElementById("dig3").focus()
    }
});
document.getElementById("dig3").addEventListener("input", function () {
    if (document.getElementById("dig3").value !== "") {
        document.getElementById("dig4").focus()
    }
});
document.getElementById("dig4").addEventListener("input", function () {
    if (document.getElementById("dig4").value !== "") {
        document.getElementById("dig5").focus()
    }
});
document.getElementById("dig5").addEventListener("input", function () {
    if (document.getElementById("dig5").value !== "") {
        document.getElementById("dig6").focus()
    }
});

document.getElementById("dig2").addEventListener("keydown", function backspaceFunction(event) {
    if (event.key === "Backspace") {
        console.log("Backspace pressed");
        if (document.getElementById("dig2").value === "") {
            document.getElementById("dig1").focus()
        }
    }
});

document.getElementById("dig3").addEventListener("keydown", function backspaceFunction(event) {
    if (event.key === "Backspace") {
        console.log("Backspace pressed");
        if (document.getElementById("dig3").value === "") {
            document.getElementById("dig2").focus()
        }
    }
});

document.getElementById("dig4").addEventListener("keydown", function backspaceFunction(event) {
    if (event.key === "Backspace") {
        console.log("Backspace pressed");
        if (document.getElementById("dig4").value === "") {
            document.getElementById("dig3").focus()
        }
    }
});

document.getElementById("dig5").addEventListener("keydown", function backspaceFunction(event) {
    if (event.key === "Backspace") {
        console.log("Backspace pressed");
        if (document.getElementById("dig5").value === "") {
            document.getElementById("dig4").focus()
        }
    }
});
document.getElementById("dig6").addEventListener("keydown", function backspaceFunction(event) {
    if (event.key === "Backspace") {
        console.log("Backspace pressed");
        if (document.getElementById("dig6").value === "") {
            document.getElementById("dig5").focus()
        }
    }
});


function verifycode() {
    let info = sessionStorage.getItem("ACCOUNT_DATA")
    const account = JSON.parse(info)
    let email = account.email
    let username = account.username
    let password = account.password
    $("#info_text2").fadeOut("fast")
    //let code = document.getElementById("ver_code").value
    let dig1 = document.getElementById("dig1").value
    let dig2 = document.getElementById("dig2").value
    let dig3 = document.getElementById("dig3").value
    let dig4 = document.getElementById("dig4").value
    let dig5 = document.getElementById("dig5").value
    let dig6 = document.getElementById("dig6").value
    let code = `${dig1}${dig2}${dig3}${dig4}${dig5}${dig6}`
    console.log("Just to verify:\n", email, username, password, code)
    fetch(`http://192.168.1.21:4000/authip?method=add&email=${email}&username=${username}&password=${password}&code=${code}&ip=0`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data === "Complete") {
                var wind = new URL(window.location.href);
                $("#2fa").fadeOut("slow")
                console.log("All Done")
                if (sessionStorage.getItem("clearafter")) {
                    localStorage.clear()
                }

                localStorage.setItem("t50pswd", `${btoa(password)}`)
                sessionStorage.removeItem("ACCOUNT_DATA")
                sessionStorage.setItem("2FA_READY", "true")
                localStorage.setItem("t50-email", email)
                if (!sessionStorage.getItem("autolg_off")) {
                    localStorage.setItem("t50-autologin", true)
                } else {
                    localStorage.setItem("t50-autologin", false)
                }
                localStorage.setItem("t50-username", username)
                sessionStorage.setItem("loaded", true)
                sessionStorage.setItem("loggedin", email)
                sessionStorage.setItem("loggedinpswd", btoa(password))
                localStorage.setItem("2fa_status", "On")
                setup()
            } else if (data === "Exists") {
                console.log("IP Ready")
                localStorage.setItem("t50pswd", `${btoa(password)}`)
                sessionStorage.removeItem("ACCOUNT_DATA")
                sessionStorage.setItem("2FA_READY", "true")
                localStorage.setItem("t50-email", email)
                if (!sessionStorage.getItem("autolg_off")) {
                    localStorage.setItem("t50-autologin", true)
                } else {
                    localStorage.setItem("t50-autologin", false)
                }
                localStorage.setItem("t50-username", username)
                sessionStorage.setItem("loaded", true)
                sessionStorage.setItem("loggedin", email)
                sessionStorage.setItem("loggedinpswd", btoa(password))
                localStorage.setItem("2fa_status", "On")
                setup()
            } else if (data === "Wrong Code") {
                $("#info_text2").fadeIn("fast")
                document.getElementById("info_text2").innerHTML = "Wrong Code!"
            } else {
                console.error("Client ip is strange")
            }
            //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
        }).catch(error => {
            console.error('Fetch error:', error);
        });
}