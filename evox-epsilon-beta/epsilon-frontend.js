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

let showTime = 0; //miliseconds
function warn(message) {
    const oldhtml = document.getElementById("notification-span").innerHTML
    var notification = document.getElementById('notification');
    if (notification.className.includes("show")) {
        console.log("Notification Is Shown")
        if (showTime !== 0) {
            const waitTime = 2500 - showTime
            setTimeout(function () {
                notification.classList.remove('show');
                setTimeout(function () {
                    document.getElementById("notification-span").innerHTML = message
                    notification.classList.add('show');
                    setTimeout(function () {
                        notification.classList.remove('show');
                    }, 2500);
                }, 500)

            }, waitTime)
        }
    } else {
        document.getElementById("notification-span").innerHTML = message
        notification.classList.add('show');
        const saveShowTime = setInterval(function () {
            showTime = showTime + 1
        }, 1)
        setTimeout(function () {
            notification.classList.remove('show');
            clearInterval(saveShowTime)
            showTime = 0
        }, 2500);
    }
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
            //$("#bggradient").fadeIn("slow")
            loadBackground()
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
                    //$("#bggradient").fadeIn("slow")
                    loadBackground()
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
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/evox-epsilon-beta/epsilon-serviceWorker.js').then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
                    // Listen for updates to the service worker
                    registration.onupdatefound = () => {
                        const installingWorker = registration.installing;
        
                        installingWorker.onstatechange = () => {
                            if (installingWorker.state === 'installed') {
                                if (navigator.serviceWorker.controller) {
                                    // New update available
                                    warn('An update is available.<br>Update in settings.');
        
                                    //if (confirm('New version available. Refresh to update?')) {
                                    //    window.location.reload();
                                    //}
                                } else {
                                    // Content is cached for offline use
                                    console.log('Content is cached for offline use.');
                                }
                            }
                        };
                    };
        
                }).catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                    warn('ServiceWorker registration failed: ', error)
                });
            }
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
    setTimeout(function () {
        document.getElementById("secureline-input").value = ''
        const animate = document.getElementById("rocketIcon")
        animate.style.transform = ''
    }, 500)

}
function showChats() {
    loadSecurelineHome()
    const animate = document.getElementById("rocketIcon")
    animate.style.transform = 'rotate(45deg)'
    setTimeout(function () {
        const oldHtml = animate.innerHTML
        animate.innerHTML = `<path fill-rule="evenodd" clip-rule="evenodd" d="M15.5023 14.3674L20.5319 9.35289C21.2563 8.63072 21.6185 8.26963 21.8092 7.81046C22 7.3513 22 6.84065 22 5.81937V5.33146C22 3.76099 22 2.97576 21.5106 2.48788C21.0213 2 20.2337 2 18.6585 2H18.1691C17.1447 2 16.6325 2 16.172 2.19019C15.7114 2.38039 15.3493 2.74147 14.6249 3.46364L9.59522 8.47817C8.74882 9.32202 8.224 9.84526 8.02078 10.3506C7.95657 10.5103 7.92446 10.6682 7.92446 10.8339C7.92446 11.5238 8.48138 12.0791 9.59522 13.1896L9.74492 13.3388L11.4985 11.5591C11.7486 11.3053 12.1571 11.3022 12.4109 11.5523C12.6647 11.8024 12.6678 12.2109 12.4177 12.4647L10.6587 14.2499L10.7766 14.3674C11.8905 15.4779 12.4474 16.0331 13.1394 16.0331C13.2924 16.0331 13.4387 16.006 13.5858 15.9518C14.1048 15.7607 14.6345 15.2325 15.5023 14.3674ZM17.8652 8.47854C17.2127 9.12904 16.1548 9.12904 15.5024 8.47854C14.8499 7.82803 14.8499 6.77335 15.5024 6.12284C16.1548 5.47233 17.2127 5.47233 17.8652 6.12284C18.5177 6.77335 18.5177 7.82803 17.8652 8.47854Z" fill="#dbdde3"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.77409 12.4814C3.07033 12.778 3.07004 13.2586 2.77343 13.5548L2.61779 13.7103C2.48483 13.8431 2.48483 14.058 2.61779 14.1908C2.75125 14.3241 2.96801 14.3241 3.10147 14.1908L4.8136 12.4807C5.1102 12.1845 5.59079 12.1848 5.88704 12.4814C6.18328 12.778 6.18298 13.2586 5.88638 13.5548L4.17426 15.2648C3.4481 15.9901 2.27116 15.9901 1.545 15.2648C0.818334 14.5391 0.818333 13.362 1.545 12.6362L1.70065 12.4807C1.99725 12.1845 2.47784 12.1848 2.77409 12.4814ZM7.29719 16.696C7.5903 16.9957 7.58495 17.4762 7.28525 17.7693L5.55508 19.4614C5.25538 19.7545 4.77481 19.7491 4.48171 19.4494C4.1886 19.1497 4.19395 18.6692 4.49365 18.3761L6.22382 16.684C6.52352 16.3909 7.00409 16.3963 7.29719 16.696ZM11.4811 18.118C11.7774 18.4146 11.7771 18.8952 11.4805 19.1915L9.76834 20.9015C9.63539 21.0343 9.63539 21.2492 9.76834 21.382C9.9018 21.5153 10.1186 21.5153 10.252 21.382L10.4077 21.2265C10.7043 20.9303 11.1849 20.9306 11.4811 21.2272C11.7774 21.5238 11.7771 22.0044 11.4805 22.3006L11.3248 22.4561C10.5987 23.1813 9.42171 23.1813 8.69556 22.4561C7.96889 21.7303 7.96889 20.5532 8.69556 19.8274L10.4077 18.1174C10.7043 17.8211 11.1849 17.8214 11.4811 18.118Z" fill="#dbdde3"/>
<g opacity="0.5">
<path d="M10.8461 5.40925L8.65837 7.59037C8.25624 7.99126 7.88737 8.35901 7.59606 8.69145C7.40899 8.90494 7.22204 9.13861 7.06368 9.39679L7.04237 9.37554C7.00191 9.3352 6.98165 9.31501 6.96133 9.29529C6.58108 8.92635 6.1338 8.63301 5.64342 8.43097C5.61722 8.42018 5.59062 8.40964 5.53743 8.38856L5.2117 8.25949C4.77043 8.08464 4.65283 7.51659 4.9886 7.18184C5.95224 6.22112 7.10923 5.06765 7.6676 4.83597C8.16004 4.63166 8.692 4.56368 9.20505 4.6395C9.67514 4.70897 10.1198 4.95043 10.8461 5.40925Z" fill="#dbdde3"/>
<path d="M14.5816 16.8934C14.7579 17.0723 14.8749 17.1987 14.9808 17.3337C15.1204 17.5119 15.2453 17.7012 15.3542 17.8996C15.4767 18.123 15.5718 18.3616 15.7621 18.8389C15.9169 19.2274 16.4315 19.3301 16.7303 19.0322L16.8026 18.9601C17.7662 17.9993 18.9232 16.8458 19.1556 16.2891C19.3605 15.7982 19.4287 15.2678 19.3526 14.7563C19.283 14.2877 19.0408 13.8444 18.5807 13.1205L16.3857 15.3089C15.9745 15.7189 15.5974 16.0949 15.2564 16.3894C15.052 16.5659 14.8284 16.7423 14.5816 16.8934Z" fill="#dbdde3"/>
</g>
<g opacity="0.5">
<path d="M7.68621 14.5633C7.98263 14.2669 7.98263 13.7863 7.68621 13.4899C7.38979 13.1935 6.90919 13.1935 6.61277 13.4899L4.47036 15.6323C4.17394 15.9287 4.17394 16.4093 4.47036 16.7057C4.76679 17.0021 5.24738 17.0021 5.5438 16.7057L7.68621 14.5633Z" fill="#dbdde3"/>
<path d="M10.4954 17.369C10.7918 17.0726 10.7918 16.592 10.4954 16.2956C10.1989 15.9992 9.71835 15.9992 9.42193 16.2956L7.29417 18.4233C6.99774 18.7198 6.99774 19.2003 7.29417 19.4968C7.59059 19.7932 8.07118 19.7932 8.36761 19.4968L10.4954 17.369Z" fill="#dbdde3"/>
</g>`
        animate.style.marginLeft = "250px"
        setTimeout(function () {
            const securelinePopup = document.querySelector('#secureline');
            addScrollListener(securelinePopup)
            const popup = document.getElementById("secureline")
            popup.classList.add("active")
            document.getElementById("secureline-back").style.display = 'flex'
            setTimeout(function () {
                document.getElementById("secureline-back").style.opacity = '1'
                animate.innerHTML = oldHtml
                animate.style.marginLeft = "0"
            }, 200)
            $("#container").fadeOut("fast")
        }, 200)

    }, 200)

    setTimeout(function () {
        return;

    }, 200)

}

function add_favorite(event, element, customColor, customDimen) {
    event.stopPropagation();
    const color = customColor ? customColor : '#7d7e87';
    const height_width = customDimen ? customDimen : '30px';
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
            element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${height_width}" height="${height_width}" viewBox="0 0 24 24" fill="none">
                            <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="${color}"/>
                            </svg>`
            element.style.transform = 'scale(1)'
        }, 200)
        document.getElementById(`user-${element.getAttribute("data-name")}`).remove()

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
            element.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="${height_width}" height="${height_width}" viewBox="0 0 24 24" fill="none">
                        <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="${color}" stroke-width="1.5"/>
                        </svg>`
            element.style.transform = 'scale(1)'
        }, 200)
        loadSecurelineHome()

    }
    reloadFavs()

    //$("#secureline-users").fadeOut("fast")
    //$("#favorites-recommended").fadeOut("fast")

}

function openChat(data, location) {
    console.log('Chat opened');

    const username = data.username
    const isFavorite = data.favorite//true-false
    document.getElementById("favStatInChat").setAttribute("data-name", username)
    if (isFavorite === true) {
        document.getElementById("favStatInChat").setAttribute("data-status", 'fav')
        document.getElementById("favStatInChat").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#fff"/>
                            </svg>`
    } else {
        document.getElementById("favStatInChat").setAttribute("data-status", 'default')
        document.getElementById("favStatInChat").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#fff" stroke-width="1.5"/>
                                </svg>`
    }
    if (location === 'home') {
        console.log("Location: home")

        $("#container").fadeOut("fast")
        $("#messenger").fadeIn("fast")
    } else {
        console.log("Location: friends")
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
    actionReload(username)
    console.warn("Running Secureline For", username)
    setTimeout(function () {
        document.getElementById("secureline-input").value = ''
    }, 500)


}

function showSocial(el) {
    el.style.transform = 'scale(0.96)'
    const socialPopup = document.getElementById("social")
    socialPopup.classList.add("active")

    setTimeout(function () {
        //workingElem.style.transform = 'rotate(0deg)'
        el.style.transform = 'scale(1)'
        $("#container").fadeOut("fast")
        document.getElementById("social-back").style.display = 'flex'
        setTimeout(function () {
            document.getElementById("social-back").style.opacity = '1'
        }, 200)
        loadFriendsSocial()
        setTimeout(function () {
            document.getElementById("bottomActionsSocial").classList.add("visible")
        }, 150)
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

function showFriend(element) {
    document.getElementById("userProfile-back").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("userProfile-back").style.opacity = '1'
    }, 200)
    const pElement = element.querySelector('.column p');
    const friend = pElement.textContent;
    const defaultArrow = document.getElementById(`showUserInfoDiv-${friend}`).innerHTML
    document.getElementById(`showUserInfoDiv-${friend}`).innerHTML = `<svg version="1.1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
            style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <path fill="#fff"
                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                    to="360 25 25" dur="0.6s" repeatCount="indefinite" />
            </path>
        </svg>`
    console.log("Default arrow", defaultArrow)
    console.log('Launching:', friend);//
    document.getElementById("user-profile-picture").src = 'searching_users.gif'
    loadPFPget(friend)
        .then(profileImage => {
            document.getElementById("user-profile-picture").src = profileImage
        }).catch(error => {
            setNetworkStatus('off')
            console.error(error);
        });
    document.getElementById("user-profile-username").innerText = friend
    fetch(`${srv}/cryptox?method=isCryptoxed&username=${friend}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(isCryptoxed => {
            if (isCryptoxed === 'Enabled') {
                document.getElementById("user-cryptox").innerText = 'Enabled'
            } else if (isCryptoxed === 'Disabled') {
                document.getElementById("user-cryptox").innerText = 'Disabled'
            } else {
                document.getElementById("user-cryptox").innerText = '🤯'
            }
        }).catch(error => {
            console.log('userFriends failed to load:', error)
        })
    fetch(`${srv}/social?username=${friend}&todo=friends`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(userFriends => {
            if (userFriends !== '') {
                const userJsonFriends = JSON.parse(userFriends)
                console.log(`${friend} friends length: ${userJsonFriends.length}`)
                if (userJsonFriends.length === 1) {
                    document.getElementById("friendsCount").innerHTML = `${userJsonFriends.length} <span>Friend</span>`
                } else {
                    document.getElementById("friendsCount").innerHTML = `${userJsonFriends.length} <span>Friends</span>`
                }

            } else {
                document.getElementById("friendsCount").innerHTML = `0 <span>Friends</span>`
            }

        }).catch(error => {
            console.log('userFriends failed to load:', error)
        })
    fetch(`${srv}/accounts?method=getemailbyusername&username=${friend}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(friend_email => {
            fetch(`${srv}/accounts?email=${friend_email}&username=${friend}&method=last_login`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(last_login => {
                    if (last_login !== 'Unknown') {
                        document.getElementById("user-lastSeen").innerText = formatTimeDifference(last_login)
                    } else {
                        document.getElementById("user-lastSeen").innerText = 'Unknown'
                    }

                }).catch(error => {
                    console.log("User Load Last Login Failed [3]:", error)
                })
            fetch(`${srv}/accounts?email=${friend_email}&username=${friend}&birth=get`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(birthdateString => {
                    if (birthdateString) {
                        document.getElementById("user-age-block").style.display = ''
                        document.getElementById("user-birth-block").style.display = ''
                        let parts = birthdateString.split('/');
                        let day = parseInt(parts[0]);
                        let month = parseInt(parts[1]) - 1; // Months are zero-based in JavaScript
                        let year = parseInt(parts[2]);
                        let birthdate = new Date(year, month, day);
                        let today = new Date();
                        let age = today.getFullYear() - birthdate.getFullYear();
                        let monthDiff = today.getMonth() - birthdate.getMonth();
                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
                            age--;
                        }

                        console.log("Age: " + age);
                        document.getElementById("user-age").innerText = age
                        document.getElementById("user-birthdate").innerText = birthdateString
                    } else {
                        console.log("No age registered")
                        document.getElementById("user-age-block").style.display = 'none'
                        document.getElementById("user-birth-block").style.display = 'none'
                    }
                    document.getElementById("user-profile").classList.add('active')
                    const socialPopup = document.getElementById("social")
                    socialPopup.classList.remove("active")
                    document.getElementById("social-back").style.opacity = '0'
                    setTimeout(function () {
                        document.getElementById("social-back").style.display = 'none'
                    }, 200)
                    document.getElementById("bottomActionsSocial").classList.remove("visible")
                    $("#bggradient").fadeOut("fast")
                    setTimeout(() => {
                        document.getElementById(`showUserInfoDiv-${friend}`).innerHTML = defaultArrow
                    }, 250);

                }).catch(error => {
                    console.log("User Load Failed [2]:", error)
                })
        }).catch(error => {
            console.log("User load failed [1]:", error)
        })

    document.getElementById("loadingIndicatorProfile").style.display = ''
    document.getElementById("user-video-forDisplay").src = ''
    document.getElementById("user-video-forDisplay").style.display = 'none'
    fetch(`${srv}/profiles?name=${friend}&authorize=cover`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(coverIMG => {
            if (coverIMG !== "None") {

                document.getElementById("user-video-forDisplay").style.display = ''
                document.getElementById("user-video-forDisplay").src = coverIMG
                document.getElementById("loadingIndicatorProfile").style.display = 'none'
            } else {
                document.getElementById("user-video-forDisplay").src = ''
                document.getElementById("user-video-forDisplay").style.display = 'none'
                document.getElementById("loadingIndicatorProfile").style.display = 'none'
            }

        }).catch(error => {
            console.error(error);
        })



}

function hideUserProfile() {
    //$("#bggradient").fadeIn("slow")
    loadBackground()
    document.getElementById("userProfile-back").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("userProfile-back").style.display = 'none'
    }, 200)
    document.getElementById("user-profile").classList.remove('active')
    const socialPopup = document.getElementById("social")
    socialPopup.classList.add("active")
    document.getElementById("social-back").style.display = 'flex'
    setTimeout(function () {
        document.getElementById("social-back").style.opacity = '1'
    }, 200)
    document.getElementById("bottomActionsSocial").classList.add("visible")
}

function clickNanimate(part) {
    const menu_manage = document.getElementById("menu-manage")
    const menu_discover = document.getElementById("menu-discover")
    if (part === 'manage') {
        const workingElem = document.getElementById("manage-svg")
        workingElem.style.transform = 'scale(1.2)'
        setTimeout(function () {
            workingElem.style.transform = 'scale(1)'
        }, 150)
        menu_discover.classList.remove("active")
        menu_manage.classList.add("active")
    } else if (part === 'discover') {
        const workingElem = document.getElementById("discover-svg")
        workingElem.style.transform = 'rotate(180deg) scale(1.2)'
        setTimeout(function () {
            workingElem.style.transform = 'rotate(0deg) scale(1)'
        }, 250)
        menu_discover.classList.add("active")
        menu_manage.classList.remove("active")
    }
}

function bottomButtonPress(which, el) {
    //'library', 'addapp'
    if (which === 'library') {
        //const workingElem = document.getElementById("pressAnimationLibrary")
        el.style.transform = 'scale(0.96)'
        setTimeout(function () {
            el.style.transform = 'scale(1)'
            setTimeout(function () {
                openPanel(which)
            }, 150)
        }, 200)
        //
    } else if (which === 'addapp') {
        //const workingElem = document.getElementById("pressAnimationAddapp")
        //workingElem.style.transform = 'rotate(180deg)'
        el.style.transform = 'scale(0.96)'
        setTimeout(function () {
            //workingElem.style.transform = 'rotate(0deg)'
            el.style.transform = 'scale(1)'
            setTimeout(function () {
                openPanel(which)
            }, 150)
        }, 200)
    }
}

function openPanel(which) {
    //accept library and addapp as values
}

function backgroundSwitch(colorScheme) { //purple, blue, default
    const root = document.documentElement;
    $("#background").fadeOut("fast", function () {
        switch (colorScheme) {
            case "purple":

                root.style.setProperty('--color-bg1', 'rgba(108, 0, 162, 1)');
                root.style.setProperty('--color-bg2', 'rgba(0, 17, 82, 1)');
                root.style.setProperty('--color1', '76, 0, 162');
                root.style.setProperty('--color2', '0, 82, 139');
                root.style.setProperty('--color3', '0, 160, 176');
                root.style.setProperty('--color4', '103, 93, 98');
                root.style.setProperty('--color5', '17, 19, 26');
                root.style.setProperty('--color-interactive', '140, 100, 255');
                $("#background").fadeIn("fast")
                break;
            case "blue":
                root.style.setProperty('--color-bg1', 'rgba(0, 17, 82, 1)');
                root.style.setProperty('--color-bg2', 'rgba(0, 105, 224, 1)');
                root.style.setProperty('--color1', '0, 43, 109');
                root.style.setProperty('--color2', '0, 82, 139');
                root.style.setProperty('--color3', '0, 160, 224');
                root.style.setProperty('--color4', '68, 85, 104');
                root.style.setProperty('--color5', '15, 18, 35');
                root.style.setProperty('--color-interactive', '60, 160, 255');
                $("#background").fadeIn("fast")
                break;
            case "default":
                root.style.setProperty('--color-bg1', 'rgba(76, 0, 162, 0)');
                root.style.setProperty('--color-bg2', 'rgba(0, 82, 59, 0)');
                root.style.setProperty('--color1', '9, 43, 109');
                root.style.setProperty('--color2', '0, 105, 224');
                root.style.setProperty('--color3', '76, 223, 229');
                root.style.setProperty('--color4', '103, 93, 98');
                root.style.setProperty('--color5', '17, 19, 26');
                root.style.setProperty('--color-interactive', '140, 100, 255');
                $("#background").fadeIn("fast")
                break;
            default:
                console.error("Unknown color scheme: " + colorScheme);
                break;

        }
    })

}

function settingsOpen(panel) {
    //panel -> security or epsilon

    //hiding previous may shown divs
    document.getElementById("settings-personal").style.display = 'none'
    document.getElementById("settings-customize").style.display = 'none'
    document.getElementById("settings-about").style.display = 'none'
    if (document.getElementById("changeBackgroundSlider").classList.contains("expanded")) {
        changeBackgroundSlider(document.getElementById("changeBackgroundSlider"))
    }

    //reset heights
    document.getElementById("settings").style.height = '235px'
    settingsGrabCloseTrigger = 694
    hideThreshold = 100
    if (panel === 'security') {
        document.getElementById("accountSettingsIcon").style.transform = 'rotate(40deg)'
        setTimeout(function () {
            document.getElementById("accountSettingsIcon").style.transform = 'rotate(0deg)'
        }, 200)
        setTimeout(function () {
            document.getElementById("settings-security").style.display = ''
            document.getElementById("settings-epsilon").style.display = 'none'
            document.getElementById("gatewayExploreScroll").style.transform = 'scale(0.97)'
            document.getElementById("gatewayExploreScroll").style.filter = 'blur(5px)'
            document.body.style.overflow = 'hidden'
            if (scrolling === true) {
                console.log("Disabling Scrolling")
                disableScroll()
            }

            document.getElementById("gatewayActions").classList.add("top")
            const popup = document.getElementById("settings")
            popup.classList.add("active")
        }, 400)
    } else if (panel === 'epsilon') {
        document.getElementById("epsilonSettingsIcon").style.transform = 'scale(0.8)'
        setTimeout(function () {
            document.getElementById("epsilonSettingsIcon").style.transform = 'scale(1.2)'
        }, 200)
        setTimeout(function () {

            document.getElementById("settings-security").style.display = 'none'
            document.getElementById("settings-epsilon").style.display = ''
            document.getElementById("gatewayExploreScroll").style.transform = 'scale(0.97)'
            document.getElementById("gatewayExploreScroll").style.filter = 'blur(5px)'
            document.body.style.overflow = 'hidden'
            if (scrolling === true) {
                console.log("Disabling Scrolling")
                disableScroll()
            }
            document.getElementById("gatewayActions").classList.add("top")
            const popup = document.getElementById("settings")
            popup.classList.add("active")
        }, 400)

    }
}

function hideSettings() {
    document.getElementById("gatewayExploreScroll").style.transform = ''
    document.getElementById("gatewayExploreScroll").style.filter = ''
    const popup = document.getElementById("settings")
    document.getElementById("gatewayActions").classList.remove("top")
    popup.classList.remove("active")

    if (scrolling === false) {
        console.log("Enabling Scrolling")
        enableScroll()
    }
    setTimeout(function () {
        document.body.style.overflow = ''
    }, 500)
}

function attachSettingsData(data, container) {// data -> personal, security, cypher
    setTimeout(function () {//set to allow the user to view the onhover effect
        if (data) {
            if (document.getElementById(`settings-${data}`)) {
                let hiding = null
                if (container === 1) {
                    hiding = "#settings-security"
                } else if (container === 2) {
                    hiding = "#settings-epsilon"
                } else {
                    warn(`Cannot attach ${data} on settings.<br>Error Code: EBETAMISS_CONT`)
                    return;
                }
                $(hiding).fadeOut("fast", function () {
                    $(`#settings-${data}`).fadeIn("fast")
                })

                if (data === 'customize') {
                    settingsGrabCloseTrigger = 726
                    document.getElementById("settings").style.height = '200px'
                }
                if (data === 'about') {
                    loadAppAbout()
                    settingsGrabCloseTrigger = 520
                    hideThreshold = 618
                    document.getElementById("settings").style.height = '435px'
                    
                }
            } else {
                console.log("EBETA404")
                warn(`Cannot attach ${data} on settings.<br>Error Code: EBETA404`)
            }

        }
    }, 100)

}

let openSlider = false
function changeBackgroundSlider(elem) {
    const gradient = localStorage.getItem("customEpsilonGradient")
    if (gradient) {
        document.getElementById(`grad-${gradient}`).classList.add('current')
    } else {
        document.getElementById(`grad-default`).classList.add('current')
    }


    elem.classList.toggle('expanded');

    if (openSlider) {
        openSlider = false
        document.getElementById("backgroundOpenSlider").style.transform = 'rotate(90deg)';
        document.getElementById("settings").style.height = '200px';
    } else {
        openSlider = true
        document.getElementById("backgroundOpenSlider").style.transform = 'rotate(270deg)';
        document.getElementById("settings").style.height = '280px';
    }
    //$("#bgBox").fadeIn("fast");  // Show the bgBox with fade-in effect
}

function changeBackground(event, background) {
    event.stopPropagation();
    document.getElementById(`grad-default`).classList.remove('current')
    document.getElementById(`grad-blue`).classList.remove('current')
    document.getElementById(`grad-purple`).classList.remove('current')

    console.log("Stopped Slider Toggle", background)
    document.getElementById(`grad-${background}`).classList.add('current')
    backgroundSwitch(background) //purple, blue, default
    localStorage.setItem('customEpsilonGradient', background)
}

function updateServiceWorkerCache() {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            action: 'UPDATE_CACHE'
        });
    } else {
        console.log('No active service worker found.');
    }
}

function updateServiceWorkerCacheAndReload() {
    try {
        updateServiceWorkerCache()
    } catch (error) {
        warn("Service Worker Update Failed.<br>Evox Is Reloading..")

    }

    setTimeout(function () {
        window.location.reload()
    }, 500)
}


let activeTab = 'Explore'
function enableTab(element) {
    const old = activeTab
    document.getElementById(`tab-${activeTab.toLowerCase()}`).classList.remove("active")
    if (element.innerHTML.includes("Ask") && !element.classList.contains("active")) {
        activeTab = 'Ask'
        element.classList.add("active")
        setTimeout(function () {
            updateServiceWorkerCacheAndReload()
        }, 500)
    } else if (element.innerHTML.includes("Explore") && !element.classList.contains("active")) {
        activeTab = 'Explore'
        element.classList.add("active")
    } else if (element.innerHTML.includes("Profile") && !element.classList.contains("active")) {
        activeTab = 'Profile'
        element.classList.add("active")
    } else {
        console.log("Nothing found")
        return;
    }
    console.log(`Hit. Changed From ${old} to ${activeTab}`)

}