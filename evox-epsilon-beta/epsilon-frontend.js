if (localStorage.getItem("currentSrv")) {
    srv = localStorage.getItem("currentSrv")
} else {
    localStorage.setItem("currentSrv", "https://data.evoxs.xyz")
    srv = "https://data.evoxs.xyz"
}

function setNetworkStatus(what) {
    if (what === "on") {
        $("#offlineStatus").fadeOut("fast")
        $("#onlineStatus").fadeIn("fast")
    } else if (what === "off") {
        $("#onlineStatus").fadeOut("fast")
        $("#offlineStatus").fadeIn("fast")
    }
}

function warn(message) {
    const oldhtml = document.getElementById("notification-span").innerHTML
    var notification = document.getElementById('notification');
    if (notification.className.includes("show")) {
        console.log("Notification Is Shown")
        notification.classList.remove('show');
        setTimeout(function () {
            document.getElementById("notification-span").innerHTML = message
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.remove('show');
            }, 2500);
        }, 500)
    } else {
        document.getElementById("notification-span").innerHTML = message
        notification.classList.add('show');
        setTimeout(function () {
            notification.classList.remove('show');
        }, 2500);
    }
    setTimeout(function () {
        document.getElementById("notification-span").innerHTML = oldhtml
    }, 3000)
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("[EE] Event Listener Registered");

    // Event listener for scroll events on the window
    window.addEventListener("scroll", () => {
        // Get the scroll position of the document
        const scrollPosition = window.scrollY || window.pageYOffset;

        //console.log('Scroll position:', scrollPosition);

        // Check if the scroll position is at the top
        if (scrollPosition === 0) {
            //console.log('User has scrolled back to the top.');
            document.getElementById("gatewayActions").classList.remove('back')
        } else {
            //console.log('User is scrolling down.');
            if (scrollPosition >= 22) {
                document.getElementById("gatewayActions").classList.add('back')
            } else {
                document.getElementById("gatewayActions").classList.remove('back')
            }
        }
    });
});

//if (!window.location.href.includes("https")) {
//    if (window.location.href.includes("192")) {
//        if (!srv.includes("40:")) {
//            alert("Welcome to Dev Mode, Switching to local bridge")
//            localStorage.setItem("currentSrv", "http://192.168.1.40:4000")
//            srv = "http://192.168.1.40:4000"
//        }
//    }
//}
//Removing to make debug better


function restart() {
    window.location.reload()
}
function clientVerified() {
    if (ip !== 'error') {
        const username = localStorage.getItem("t50-username")
        const email = localStorage.getItem("t50-email")
        const password = atob(localStorage.getItem("t50pswd"))
        if (username && email && password) {
            console.log("Returning User.")
            $("#bggradient").fadeIn("slow")
            fetch(`${srv}/accounts?email=${email}&password=${password}&autologin=true&ip=${ip}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    setNetworkStatus('on')
                    if (data.includes("Credentials Correct")) {
                        verificationComplete()
                    } else if (data.includes("IP Not Verified")) {
                        console.log("Account Verified But IP is Unknown")
                        fetch(`${srv}/authip?method=Eforceadd&email=${email}&username=${username}&password=${password}&ip=${ip}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then(data => {
                                setNetworkStatus('on')
                                if (data === "Complete") {
                                    verificationComplete()
                                } else if (data === "Exists") {
                                    verificationComplete()
                                } else {
                                    notice(`Authorization IP Ops Failed`)
                                }
                            }).catch(error => {
                                setNetworkStatus('off')
                                console.error('Fetch error:', error);
                            });
                    } else {
                        console.log("Credentials Incorrect. Resetting")
                        localStorage.removeItem("t50-email")
                        localStorage.removeItem("t50pswd")
                        localStorage.removeItem("t50-username")
                        clientVerified()
                    }
                }).catch(error => {
                    setNetworkStatus('off')
                    warn("Server Connection Failed. Running Offline")
                    verificationComplete()


                    console.error('Server Connection Failed!', error)
                })
        } else {
            console.log("New User.")

            fetch(`${srv}/accounts`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    setNetworkStatus('on')
                    //data is not used, a simple response is fine
                    console.log('%c' + "Server Online!", `color: green; font-size: 16px; font-weight: normal;`)
                    $("#bggradient").fadeIn("slow")
                    $("#loading-text").fadeOut("fast")

                    $("#connectionContainer").fadeIn("slow", function () {
                        document.getElementById("epsilonLogoLogin").style.top = "18%"
                        document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
                        document.getElementById("headerVox").classList.add('active')
                        setTimeout(function () {
                            document.getElementById("optionsVox").classList.add('active')
                        }, 100)
                    })
                })
                .catch(error => {
                    setNetworkStatus('off')
                    notice("Oh Snap! Evox Is Offline.<br>Please Retry Later.")

                    console.error('Fetch error:', error);
                });

        }

    } else {
        notice("IP Verification Failed!")
    }
}


var welcomeToEvox = new Howl({
    src: ['./welcomeToEvox.mp3'],
    volume: 1
});

var successLogin = new Howl({
    src: ['./success.mp3'],
    volume: 1
});

var startup = new Howl({
    src: ['./startup.mp3'],
    volume: 1
});


function beginLogin() {
    startup.play()
    document.getElementById("epsilonLogoLogin").style.top = "200px"
    document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"

    document.getElementById("headerVox").classList.remove('active')
    document.getElementById("optionsVox").classList.remove('active')
    setTimeout(function () {
        document.getElementById("formLogin").style.display = 'flex'
        setTimeout(function () {

            document.getElementById("formLogin").classList.add('active')
            //document.getElementById("formLogin").style.paddingBottom = "100px"
        }, 50)
    }, 920)


    //setTimeout(function() {
    //  $("#createVox").fadeOut("fast")
    //  $("#loginVox").fadeOut("fast")
    //  $("#trademarkVox").fadeOut("fast")
    //}, 1000)

    //setTimeout(function () {
    //  document.getElementById("optionsVox").classList.add('active')
    //}, 100)


}

function returnToLoginMenu() {
    document.getElementById("formLogin").classList.remove('active')
    setTimeout(function () {
        document.getElementById("formLogin").style.display = 'none'
        setTimeout(function () {
            document.getElementById("epsilonLogoLogin").style.top = "18%"
            document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
            document.getElementById("headerVox").classList.add('active')
            setTimeout(function () {
                document.getElementById("optionsVox").classList.add('active')
            }, 100)

        }, 50)
    }, 920)
}

const voxPasswordInput = document.getElementById('voxPassword');
const voxEmailInput = document.getElementById('voxEmail');
const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
  <path d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
const lockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                              viewBox="0 0 24 24" fill="none">
                              <path
                                  d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                                  stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>`
const eyeShown = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
  <path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
let iconState = 'default'
// Add an event listener for the 'input' event
voxPasswordInput.addEventListener('input', function (event) {
    //console.log('Typed value:', event.target.value);
    if (event.target.value !== "") {
        if (iconState === 'eye') {
            return;
        }
        if (isPswdShown === true) {
            iconState = 'eye'
            document.getElementById("eyeIcon").style.opacity = "0"
            setTimeout(function () {
                document.getElementById("eyeIcon").innerHTML = eyeShown
                document.getElementById("eyeIcon").style.opacity = "1"
            }, 400)
        } else {
            iconState = 'eye'
            document.getElementById("eyeIcon").style.opacity = "0"
            setTimeout(function () {
                document.getElementById("eyeIcon").innerHTML = eyeIcon
                document.getElementById("eyeIcon").style.opacity = "1"
            }, 400)
        }

    } else {
        iconState = 'default'
        document.getElementById("eyeIcon").style.opacity = "0"
        setTimeout(function () {
            document.getElementById("eyeIcon").innerHTML = lockIcon
            document.getElementById("eyeIcon").style.opacity = "1"
        }, 400)
    }
});

voxEmailInput.addEventListener('input', function (event) {
    //console.log('Typed value:', event.target.value);
    if (event.target.value === "") {
        document.getElementById("welcomeText").style.opacity = "0"
        setTimeout(function () {
            document.getElementById("welcomeText").innerHTML = `Login`
            document.getElementById("welcomeText").style.opacity = "1"
        }, 400)
    }
});

let isPswdShown = false

function showPasswd() {
    if (iconState === 'eye' && !isPswdShown) {
        document.getElementById("eyeIcon").style.opacity = "0"
        setTimeout(function () {
            document.getElementById("eyeIcon").innerHTML = eyeShown
            document.getElementById("eyeIcon").style.opacity = "1"
        }, 400)
        voxPasswordInput.type = 'text'
        isPswdShown = true
    } else if (isPswdShown) {
        document.getElementById("eyeIcon").style.opacity = "0"
        setTimeout(function () {
            document.getElementById("eyeIcon").innerHTML = eyeIcon
            document.getElementById("eyeIcon").style.opacity = "1"
        }, 400)
        voxPasswordInput.type = 'password'
        isPswdShown = false
    }
}

voxEmailInput.addEventListener('blur', function () {
    console.log('Input has lost focus.');
    document.getElementById("emailIcon").style.opacity = "0"
    setTimeout(function () {
        document.getElementById("emailIcon").innerHTML = `
          <svg version="1.1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
              <path fill="#fff"
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                  <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                      to="360 25 25" dur="0.6s" repeatCount="indefinite" />
              </path>
          </svg>
      `
        document.getElementById("emailIcon").style.opacity = "1"
        fetch(`${srv}/accounts?method=getUserbyEmail&email=${document.getElementById('voxEmail').value}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(matchedUser => {
                setNetworkStatus('on')
                if (matchedUser !== "Account Not Found" && !matchedUser.includes("Something Went Wrong")) {
                    document.getElementById("emailIcon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                              viewBox="0 0 24 24" fill="none">
                              <g id="style=stroke">
                                  <g>
                                      <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                                          d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
                                          fill="#fff" />
                                      <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                                          d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
                                          fill="#fff" />
                                  </g>
                              </g>
                          </svg>`
                    document.getElementById("welcomeText").style.opacity = "0"
                    setTimeout(function () {
                        document.getElementById("welcomeText").innerHTML = `Hello, ${matchedUser}`
                        document.getElementById("welcomeText").style.opacity = "1"
                    }, 400)
                } else {
                    if (document.getElementById("welcomeText").innerHTML.includes('Hello')) {
                        document.getElementById("welcomeText").style.opacity = "0"
                        setTimeout(function () {
                            document.getElementById("welcomeText").innerHTML = `Login`
                            document.getElementById("welcomeText").style.opacity = "1"
                        }, 400)
                    }
                    document.getElementById("emailIcon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                              viewBox="0 0 24 24" fill="none">
                              <g id="style=stroke">
                                  <g>
                                      <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                                          d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
                                          fill="#fff" />
                                      <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                                          d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
                                          fill="#fff" />
                                  </g>
                              </g>
                          </svg>`
                }

            }).catch(error => {
                setNetworkStatus('off')
                console.error(error);
            });
    }, 400)

});

function startLogin() {
    document.getElementById("beginLoginBtn").innerHTML = `<svg version="1.1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
              y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
              <path fill="#fff"
                  d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                  <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                      to="360 25 25" dur="0.6s" repeatCount="indefinite" />
              </path>
          </svg>`
    const email = document.getElementById('voxEmail').value
    const password = document.getElementById('voxPassword').value
    if (email !== '' && password !== '') {
        console.log("Front Accepted")

        const url = `${srv}/accounts?email=${email}&password=${password}&ip=${localStorage.getItem("IPV4")}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                setNetworkStatus('on')
                document.getElementById("beginLoginBtn").innerHTML = `Login`

                var wind = new URL(window.location.href);
                var ext = wind.searchParams.get("id");
                console.log(data);
                if (data.includes("Do 2FA")) {
                    if (data.includes("Email")) {
                        var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

                        // Extract email using match() method
                        email = data.match(emailRegex);
                        console.log("Ext Email:", email)
                    }
                    localStorage.getItem("2FA_READY", "false")
                    const credentialsString = data;
                    const match = credentialsString.match(/Username:(\w+)/);

                    const username = match && match[1];
                    const jsondata = {
                        "username": username,
                        "email": email,
                        "password": password
                    }
                    sessionStorage.setItem("ACCOUNT_DATA", JSON.stringify(jsondata))
                    welcomeToEvox.play()

                    document.getElementById("formLogin").classList.remove('active')
                    setTimeout(function () {
                        document.getElementById("formLogin").style.display = 'none'
                        document.getElementById("form2FA").style.display = 'flex'
                        setTimeout(function () {
                            document.getElementById("epsilonLogoLogin").style.top = "50%"
                            document.getElementById("epsilonLogoLogin").style.transform = "translate(-50%, -50%)"
                            document.getElementById("form2FA").classList.add('active')

                        }, 50)
                    }, 920)
                    //$("#EvoxMerge").fadeOut("fast")
                    //$("#container").fadeOut("slow")
                    //$("#2fa").fadeIn("slow")
                    return;
                }
                if (data.includes("Credentials Correct")) {
                    successLogin.play()
                    if (data.includes("Email")) {
                        var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

                        // Extract email using match() method
                        email = data.match(emailRegex);
                        console.log("Ext Email:", email)
                    }
                    if (sessionStorage.getItem("clearafter")) {
                        localStorage.clear()
                    }

                    if (ext) {
                        fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then(data => {
                                setNetworkStatus('on')
                                if (data === "Complete") {
                                    //window.close()
                                    window.location.href = "ext-ready.html"
                                }
                                return;

                            }).catch(error => {
                                setNetworkStatus('off')
                                console.error('Fetch error:', error);
                            });
                        //send to dc that id matches to acc email
                    }
                    console.log("Welcome Abroad")
                    localStorage.setItem("2fa_status", "On")
                    localStorage.setItem("t50pswd", `${btoa(password)}`)
                    const credentialsString = data;
                    const match = credentialsString.match(/Username:(\w+)/);
                    const username = match && match[1];
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
                    if (localStorage.getItem("restart-for-florida")) {
                        console.log("Florida Override!")
                        localStorage.removeItem("restart-for-florida")
                        localStorage.setItem("t50-autologin", true)
                        localStorage.setItem("remove-autolg", true)
                        restart()
                        return;
                    }
                    returnToLoginMenu()
                    setTimeout(function () {
                        $("#connectionContainer").fadeOut("fast")
                        verificationComplete()
                    }, 1000)

                    //FloridaRun()
                } else if (data === "Credentials Incorrect") {
                    shake_me("voxPassword")
                    //fadeError("2")
                    console.log("Wrong Email/Password")
                    email = ""
                    password = ""
                } else if (data === "Account Doesn't Exist") {
                    if (email === "" || password === "") {

                    } else {
                        shake_me("voxEmail")
                    }

                    console.log("Doesn't Exist")
                    email = ""
                } else if (data === "Disabled") {

                    alert("Your account has been disabled by Evox. Please contact admins.")
                    shake_me("voxEmail")
                    //fadeError("1")
                    //document.getElementById("email").value = ""
                    //document.getElementById("password").value = ""
                }
            })
            .catch(error => {
                setNetworkStatus('off')
                document.getElementById("beginLoginBtn").innerHTML = `Login Failed`
                console.error('Fetch error:', error);
            });
    } else {
        document.getElementById("beginLoginBtn").innerHTML = `Login`
    }
}

const emailElemInput = document.getElementById('voxEmail');

// Add an event listener for the 'keydown' event
emailElemInput.addEventListener('keydown', function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
        // Your code to execute when Enter is pressed
        console.log('Enter key was pressed!');
        document.getElementById('voxPassword').focus();
    }
});
document.getElementById('voxPassword').addEventListener('keydown', function (event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.key === 'Enter') {
        // Your code to execute when Enter is pressed
        console.log('Enter key was pressed! [PASS]');
        startLogin()
    }
});

function on2FAComplete() {
    const num1 = document.getElementById("2faIn1").value
    const num2 = document.getElementById("2faIn2").value
    const num3 = document.getElementById("2faIn3").value
    const num4 = document.getElementById("2faIn4").value
    const num5 = document.getElementById("2faIn5").value
    const num6 = document.getElementById("2faIn6").value
    const otp_2fa = num1 + num2 + num3 + num4 + num5 + num6


    let info = sessionStorage.getItem("ACCOUNT_DATA")
    const account = JSON.parse(info)
    let email = account.email
    let username = account.username
    let password = account.password
    let code = otp_2fa
    //let dig1 = document.getElementById("dig1").value
    //let dig2 = document.getElementById("dig2").value
    //let dig3 = document.getElementById("dig3").value
    //let dig4 = document.getElementById("dig4").value
    //let dig5 = document.getElementById("dig5").value
    //let dig6 = document.getElementById("dig6").value
    //let code = `${dig1}${dig2}${dig3}${dig4}${dig5}${dig6}`
    //console.log("Just to verify:\n", email, username, password, code)
    document.getElementById("form2FA").style.paddingBottom = '0'
    fetch(`${srv}/authip?method=Eadd&email=${email}&username=${username}&password=${password}&code=${code}&ip=${localStorage.getItem("IPV4")}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            setNetworkStatus('on')
            if (data === "Complete") {
                successLogin.play()
                var wind = new URL(window.location.href);
                var ext = wind.searchParams.get("id");
                if (ext) {
                    fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(data => {
                            setNetworkStatus('on')
                            if (data === "Complete") {
                                //window.close()
                                window.location.href = "ext-ready.html"
                            }
                            return;

                        }).catch(error => {
                            setNetworkStatus('off')
                            console.error('Fetch error:', error);
                        });
                    //send to dc that id matches to acc email
                }
                //$("#2fa").fadeOut("slow")

                document.getElementById("form2FA").classList.remove('active')
                setTimeout(function () {
                    document.getElementById("form2FA").style.display = 'none'
                    setTimeout(function () {
                        document.getElementById("epsilonLogoLogin").style.top = "18%"
                        document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
                    }, 50)
                }, 920)

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
                $("#connectionContainer").fadeOut("fast")
                verificationComplete()
            } else if (data === "Exists") {
                successLogin.play()
                document.getElementById("form2FA").classList.remove('active')
                setTimeout(function () {
                    document.getElementById("form2FA").style.display = 'none'
                    setTimeout(function () {
                        document.getElementById("epsilonLogoLogin").style.top = "18%"
                        document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
                    }, 50)
                }, 920)
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
                $("#connectionContainer").fadeOut("fast")
                verificationComplete()
            } else if (data === "Wrong Code") {
                shake_me("ver_code")
                document.getElementById("form2FA").style.paddingBottom = '50px'
                document.getElementById("2faIn1").value = ""
                document.getElementById("2faIn2").value = ""
                document.getElementById("2faIn3").value = ""
                document.getElementById("2faIn4").value = ""
                document.getElementById("2faIn5").value = ""
                document.getElementById("2faIn6").value = ""
                document.getElementById("2faIn1").focus()
            } else {
                console.error("Client ip is strange")
            }
            //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
        }).catch(error => {
            setNetworkStatus('off')
            console.error('Fetch error:', error);
        });
}

document.querySelectorAll('.boxPut input').forEach((input, index, inputs) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length === 1) {
            if (index < inputs.length - 1) {
                inputs[index + 1].focus();
            } else {
                // Check if all inputs are filled
                if ([...inputs].every(input => input.value.length === 1)) {
                    on2FAComplete();
                }
            }
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
            inputs[index - 1].focus();
        }
    });
});

function returnToLoginMenuBy2fa() {
    document.getElementById("form2FA").classList.remove('active')
    setTimeout(function () {
        document.getElementById("form2FA").style.display = 'none'
        setTimeout(function () {
            document.getElementById("epsilonLogoLogin").style.top = "18%"
            document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
            returnToLoginMenu()
        }, 50)
    }, 920)
}

const stockApps = ['tasco', 'oasa', 'deluxe'];
function verificationComplete() {
    $("#connectionContainer").fadeOut("fast")

    const appsElement = document.getElementById('apps');
    appsElement.innerHTML = ''
    stockApps.forEach((app) => {
        const evoxAppDiv = document.createElement('div');
        evoxAppDiv.className = 'evoxApp';
        evoxAppDiv.onclick = function () {
            showApp(app)
        }
        const imgElement = document.createElement('img');
        imgElement.src = `./posters/${app}.png`;
        evoxAppDiv.appendChild(imgElement);
        appsElement.appendChild(evoxAppDiv);
    })

    fetch(`${srv}/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setNetworkStatus('on')
            localStorage.setItem("friends", JSON.stringify(data))
            attachUi(data)
        })
        .catch(error => {
            setNetworkStatus('off')
            const data = localStorage.getItem("friends")
            if (data) {
                console.warn("Server connection failed. Trying local")
                attachUi(JSON.parse(data))
            } else {
                console.error('Carousel Failed!', error);
            }

        });
    $("#loading-text").fadeOut("fast")
    document.getElementById("gateway").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("gateway").style.opacity = '1'
    }, 50)

}


function hideChats() {
    const securelinePopup = document.querySelector('#secureline');
    removeScrollListener(securelinePopup)
    securelinePopup.classList.remove("active")

    document.getElementById("secureline-back").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("secureline-back").style.display = 'none'
    }, 200)
    $("#container").fadeIn("fast")
    setTimeout(function () {
        securelinePopup.scrollTop = 0;
        securelinePopup.style.height = "60%"
    }, 500)

}
function showChats() {
    const securelinePopup = document.querySelector('#secureline');
    addScrollListener(securelinePopup)

    loadSecurelineHome()
    const popup = document.getElementById("secureline")
    popup.classList.add("active")
    document.getElementById("secureline-back").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("secureline-back").style.opacity = '1'
    }, 200)
    $("#container").fadeOut("fast")
}

function add_favorite(event, element) {
    event.stopPropagation();
    const status = element.getAttribute("data-status")
    if (status === "default") {
        if (localStorage.getItem("favorites")) {
            const previous = JSON.parse(localStorage.getItem("favorites"))
            console.log(previous)
            previous.push(element.getAttribute("data-name"))
            localStorage.setItem('favorites', JSON.stringify(previous))
        } else {
            const json = [element.getAttribute("data-name")]
            localStorage.setItem('favorites', JSON.stringify(json))
        }
        element.setAttribute("data-status", 'fav')
        element.style.transform = 'scale(1.2)'
        setTimeout(function () {
            element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                            <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#7d7e87"/>
                            </svg>`
            element.style.transform = 'scale(1)'
        }, 200)

    } else {
        if (localStorage.getItem("favorites")) {
            const previous = JSON.parse(localStorage.getItem("favorites"))
            console.log(previous)
            previous.pop(element.getAttribute("data-name"))
            localStorage.setItem('favorites', JSON.stringify(previous))
        }
        element.setAttribute("data-status", 'default')
        element.style.transform = 'scale(1.2)'
        setTimeout(function () {
            element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#7d7e87" stroke-width="1.5"/>
                        </svg>`
            element.style.transform = 'scale(1)'
        }, 200)
    }
    loadSecurelineHome()
    $("#secureline-users").fadeOut("fast")
    $("#favorites-recommended").fadeOut("fast")

}

function openChat(data, location) {
    console.log('Chat opened');
    const username = data.username
    const isFavorite = data.favorite//true-false
    if (location === 'home') {
        $("#container").fadeOut("fast")
        $("#messenger").fadeIn("fast")
    } else {
        const securelinePopup = document.querySelector('#secureline');
        removeScrollListener(securelinePopup)
        securelinePopup.classList.remove("active")

        setTimeout(function () {
            securelinePopup.scrollTop = 0;
            securelinePopup.style.height = "60%"
        }, 500)
        document.getElementById("secureline-back").style.opacity = '0'
        setTimeout(function () {
            document.getElementById("secureline-back").style.display = 'none'
        }, 200)

        $("#messenger").fadeIn("fast")

    }
    document.getElementById("secureline-username").innerText = username
    actionReload(username)
    console.warn("Running Secureline For", username)
    document.getElementById("goBackMessenger").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("goBackMessenger").style.opacity = '1'
    }, 200)

    loadPFPget(username)
        .then(profileImage => {
            document.getElementById("secureline-pfp").src = profileImage;
        }).catch(error => {
            setNetworkStatus('off')
            console.error(error);
        });
}

function showSocial() {
    const socialPopup = document.getElementById("social")
    socialPopup.classList.add("active")

    $("#container").fadeOut("fast")
    document.getElementById("social-back").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("social-back").style.opacity = '1'
    }, 200)
    loadFriendsSocial()
    setTimeout(function () {
        document.getElementById("bottomActionsSocial").classList.add("visible")
    }, 200)
}

function hideSocial() {
    const socialPopup = document.getElementById("social")
    socialPopup.classList.remove("active")
    document.getElementById("social-back").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("social-back").style.display = 'none'
    }, 200)
    $("#container").fadeIn("fast")
    document.getElementById("bottomActionsSocial").classList.remove("visible")
    setTimeout(function () {
        socialPopup.scrollTop = 0;
        socialPopup.style.height = "60%"
    }, 500)
}

function setFullHeight() {
    const securelineMessages = document.querySelector('.secureline-messages');
    securelineMessages.style.height = `${window.innerHeight}px`;
}

window.addEventListener('load', setFullHeight);
window.addEventListener('resize', setFullHeight);

function goBackMessenger() {
    const popup = document.getElementById("secureline")
    popup.classList.add("active")
    document.getElementById("goBackMessenger").classList.remove("visible")

    document.getElementById("goBackMessenger").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("goBackMessenger").style.display = 'none'
    }, 200)
    $("#messenger").fadeOut('fast')

    const securelinePopup = document.querySelector('#secureline');
    addScrollListener(securelinePopup)

    loadSecurelineHome()

    document.getElementById("secureline-back").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("secureline-back").style.opacity = '1'
    }, 200)
}