

//const disableScroll = (e) => {
//    // For wheel events
//    if (e.deltaY !== 0) {
//        // Allow vertical scroll, prevent horizontal scroll
//        e.preventDefault();
//    }
//};

// For touch events, we prevent default only if the touch movement is horizontal
//const touchMoveHandler = (e) => {
//    const touch = e.touches[0];
//    const startX = touch.clientX;
//    const startY = touch.clientY;
//
//    const moveHandler = (e) => {
//        const moveX = e.touches[0].clientX - startX;
//        const moveY = e.touches[0].clientY - startY;
//
//        if (Math.abs(moveX) > Math.abs(moveY)) {
//            e.preventDefault(); // Prevent horizontal movement
//        }
//    };
//
//    window.addEventListener('touchmove', moveHandler, { passive: false });
//
//    // Remove the event listener when the touch ends
//    window.addEventListener('touchend', () => {
//        window.removeEventListener('touchmove', moveHandler);
//    }, { once: true });
//};
//
//// Attach the event listeners
//window.addEventListener('wheel', disableScroll, { passive: false });
//window.addEventListener('touchstart', touchMoveHandler, { passive: false });


function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

let foundName = null;
function returnFromMultimatch() {
    const multimatchElement = document.getElementById("multimatch");
    const topImgElement = document.getElementById("topImg");
    const loginSectionElement = document.getElementById("loginSection");
    const loginButtonElement = document.getElementById("loginButton");

    // Step 1: Remove the active class from multimatch
    multimatchElement.classList.remove("active");

    // Step 2: Start fading out the top image and login section
    topImgElement.style.opacity = '0';
    loginSectionElement.style.opacity = '0';

    // Step 3: Wait for the fade out to finish before changing display properties
    setTimeout(function () {
        topImgElement.style.display = null; // Hide after fade out
        loginSectionElement.style.display = 'block'; // Show the login section
        loginSectionElement.classList.add('active'); // Add active class to login section

        // Step 4: Fade in the login section and button
        loginSectionElement.style.opacity = '1'; // Fade in login section

        // Handle login button
        topImgElement.style.opacity = '1'
        loginButtonElement.style.opacity = '0';
        loginButtonElement.style.display = 'block'; // Ensure it's displayed
        setTimeout(() => {
            loginButtonElement.style.opacity = '1'; // Fade in login button
        }, 50); // Short delay to ensure the element is visible before fading in
    }, 500); // Match this duration with your CSS transition duration
}

function selectCustom(name) {
    foundName = name
    const video = document.getElementById("video");
    video.play()
    document.getElementById("loadText").innerHTML = ``
    $("#tasks").fadeIn("fast")
    document.getElementById("multimatch").classList.remove('active')
    document.getElementById("loginButton").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("topImg").style.display = null
        document.getElementById("topImg").style.opacity = '1'
        setTimeout(function () {
            document.getElementById("loadText").style.display = null
            document.getElementById("loadText").style.opacity = '0'
            setTimeout(function () {
                document.getElementById("loadText").innerHTML = `Επιτυχία`
                document.getElementById("loadText").style.opacity = '1'
                setTimeout(function () {
                    document.getElementById("loadText").style.opacity = '0'
                    setTimeout(function () {
                        const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
                        const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
                        document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a} ${b.endsWith("ο") ? b.slice(0, -1) + "ε" : b}`
                        document.getElementById("loadText").style.opacity = '1'
                        setTimeout(function () {
                            document.getElementById("topImg").style.opacity = '0'
                            $("#tasks").fadeOut("fast", function () {
                                $("#loginContainer").fadeOut("fast", function () {
                                    document.getElementById("loginContainer").style.display = 'none'
                                    $("#multimatch").fadeOut("fast", function () {
                                        $("#lock").fadeIn("fast")
                                    })
                                })

                            })

                        }, 2500)
                    }, 340)
                }, 900)
            }, 340)


        }, 500);

    }, 100)
}


function find() {
    //video.playbackRate = 1;
    if (document.getElementById('nameInput').value === '') {
        //shake_me('nameInput')
        return;
    }
    //document.getElementById("evoxContainer").classList.remove('active')
    //document.getElementById("loginButton").style.opacity = '0'
    // document.getElementById("topImg").style.opacity = '1'

    //document.getElementById("loadText").innerText = 'Αναζήτηση..'
    //$("#tasks").fadeIn("fast")
    //video.play()
    document.getElementById("accessButton").innerHTML = loadingHTML
    const searchInput = document.getElementById('nameInput').value;
    const matchedNames = findFullNames(searchInput);
    console.log(matchedNames);
    setTimeout(() => {
        if (matchedNames.length === 0) {
            //document.getElementById("loadText").style.opacity = '0'
            setTimeout(function () {
                //document.getElementById("loadText").innerText = 'Δεν βρέθηκαν αντιστοιχίες'
                //document.getElementById("loadText").style.opacity = '1'
                //document.getElementById("accessButton").innerHTML = 'Δεν βρέθηκαν αντιστοιχίες'

                $("#matchNotFound").fadeIn("fast", function () {
                    setTimeout(function () {
                        $("#matchNotFound").fadeOut("fast")
                    }, 2000)
                })
                document.getElementById("accessButton").innerHTML = 'Σύνδεση'
            }, 340)
        } else {
            if (matchedNames.length > 1) {
                document.getElementById("accessButton").innerHTML = `Βρέθηκε εμπόδιο`
                setTimeout(function () {

                    document.getElementById("evoxContainer").classList.remove("active")
                    $("#tasks").fadeIn("fast")
                    document.getElementById("loadText").innerHTML = ''
                    //document.getElementById("loadText").innerHTML = `Πολλαπλές αντιστοιχίες`
                    //document.getElementById("loadText").style.opacity = '1'
                    //document.getElementById("loginButton").style.display = 'none'
                    setTimeout(function () {
                        //document.getElementById("topImg").style.opacity = '0'
                        document.getElementById("multimatch").innerHTML = `<h1>Βρέθηκαν πολλαπλές αντιστοιχίες με το ίδιο όνομα</h1><br><p>Επίλεξε ένα από τα παρακάτω ονόματα:</p>`
                        let count = 0

                        matchedNames.forEach(name => {
                            count++
                            const firstChar = (str) => str.split(' ')[1]?.charAt(0) || null;
                            document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
                                        <div onclick="selectCustom('${name}')" class="socialUser"><img class="slUserPFP social"
                src="https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${foundName}_jeanDarc">
            <p>${name}</p><span>></span>
        </div>`
                            if (count === matchedNames.length) {
                                document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
                                            <div class="centerLogin">
        <div onclick="returnFromMultimatch()" class="loginButton">Ακύρωση</div>
    </div>`
                            }

                        });
                        setTimeout(function () {
                            //document.getElementById("topImg").style.display = 'none'
                            //document.getElementById("loginSection").style.display = 'none'
                            $("#loginContainer").fadeOut("fast", function () {
                                $("#multimatch").fadeIn("fast")
                                $("#tasks").fadeOut("fast")
                                document.getElementById("multimatch").classList.add("active")
                            })

                        }, 500)

                        //document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${matchedNames[0].split(' ')[0].replace(/[σς]+$/, '')}`
                        //document.getElementById("loadText").style.opacity = '1'
                        //setTimeout(function () {
                        //    
                        //}, 1200)
                    }, 340)
                }, 340)
            } else {
                foundName = matchedNames[0]
                //document.getElementById("loadText").style.opacity = '0'
                setTimeout(function () {
                    //document.getElementById("loadText").innerHTML = `Επιτυχία`
                    document.getElementById("accessButton").innerHTML = `Επιτυχία`
                    document.getElementById("loadText").style.opacity = '1'
                    document.getElementById("evoxContainer").classList.remove("active")
                    $("#tasks").fadeIn("fast", function () {
                        setTimeout(function () {
                            //document.getElementById("loadText").style.opacity = '0'
                            setTimeout(function () { //
                                const a = matchedNames[0].split(' ')[0].replace(/[σς]+$/, '')
                                const b = matchedNames[0].split(' ')[1].replace(/[σς]+$/, '')
                                document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a} ${b.endsWith("ο") ? b.slice(0, -1) + "ε" : b}`
                                document.getElementById("loadText").style.opacity = '1'
                                setTimeout(function () {
                                    document.getElementById("topImg").style.opacity = '0'
                                    $("#tasks").fadeOut("fast", function () {
                                        $("#loginContainer").fadeOut("fast", function () {
                                            document.getElementById("loginContainer").style.display = 'none'
                                            $("#multimatch").fadeOut("fast", function () {
                                                $("#lock").fadeIn("fast")
                                            })
                                        })

                                    })
                                }, 2500)
                            }, 340)
                        }, 900)
                    })


                }, 340)
            }


        }
    }, 100);

}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}


function findFullNames(input) {
    const results = [];
    const variations = Object.values(namesData.names).flat();

    for (const [fullName, nameVariations] of Object.entries(namesData.names)) {
        // Check if the input matches any of the name variations (case insensitive)
        if (nameVariations.some(variation => variation.toLowerCase() === input.toLowerCase())) {
            results.push(fullName);
        } else {
            console.log(input.length)
            if (JSON.stringify(nameVariations).includes(input) || JSON.stringify(nameVariations).includes(input.toLowerCase()) || JSON.stringify(nameVariations).includes(capitalizeFirstLetter(input))) {
                if (input.length > 2) {
                    console.log("Found included")
                    results.push(fullName);
                }

            }
        }
    }

    return results;
}

function storiesSpawned() {
    document.querySelectorAll('.app .stories .story').forEach(story => {
        const color1 = getRandomColor();
        const color2 = getRandomColor();
        story.style.background = `linear-gradient(to right top, ${color1}, ${color2})`;
    });
}

const reloadThreshold = 2;
const timeWindow = 5000;

let reloadCount = sessionStorage.getItem('reloadCount') ? parseInt(sessionStorage.getItem('reloadCount')) : 0;
let lastReloadTime = sessionStorage.getItem('lastReloadTime') ? parseInt(sessionStorage.getItem('lastReloadTime')) : Date.now();
let spammingDetected = sessionStorage.getItem('spammingDetected') === 'true';

if (spammingDetected) {
    //alert("Spamming reload was already detected earlier.");
} else {
    window.onbeforeunload = function () {
        const currentTime = Date.now();

        if (currentTime - lastReloadTime < timeWindow) {
            reloadCount++;
        } else {
            reloadCount = 1;
        }

        sessionStorage.setItem('reloadCount', reloadCount);
        sessionStorage.setItem('lastReloadTime', currentTime);

        if (reloadCount > reloadThreshold) {
            console.log("Spamming reload detected!");
            sessionStorage.setItem('spammingDetected', 'true');
            //return false;
        }

        return undefined;
    };
}

function continueToLogin() {
    $("#case1").fadeOut("fast", function () {
        document.getElementById("evoxContainer").style.height = '420px'
        $("#loginForm").fadeIn("fast")
    })
}



let namesData = null
let ip = null
document.addEventListener("DOMContentLoaded", function () {
    if (window.innerWidth > 768) {
        //console.log("This is not a mobile device");
        $("#tasks").fadeOut("fast", function () {
            $("#loginContainer").fadeOut("fast", function () {
                $("#device-warning").fadeIn("fast")
            })

        })

    } else if (spammingDetected) {
        $("#tasks").fadeOut("fast", function () {
            $("#loginContainer").fadeOut("fast", function () {
                $("#spamStop").fadeIn("fast")
                let stopTime = 10
                if (sessionStorage.getItem("countdown")) {
                    const nn = Number(sessionStorage.getItem("countdown"))

                    sessionStorage.setItem("countdown", Math.floor(nn + 50 / 100 * nn))
                    stopTime = Math.floor(nn + 50 / 100 * nn)
                }
                sessionStorage.setItem("countdown", stopTime)
                document.getElementById("countdown").innerText = stopTime
                setInterval(function () {
                    const num = Number(document.getElementById("countdown").innerText) - 1
                    document.getElementById("countdown").innerText = num
                    sessionStorage.setItem("countdown", num)
                    if (num < 1) {
                        sessionStorage.removeItem('spammingDetected')
                        sessionStorage.removeItem("countdown")
                        window.location.reload()
                    }
                }, 1000)
            })

        })
    } else {

        if (localStorage.getItem("jeanDarc_accountData")) {
            autoLogin()
        } else {
            //const video = document.getElementById("video");
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(geo => {
                    console.log("IP:", geo.ip)
                    ip = geo.ip
                    document.getElementById("loadText").innerText = 'Αναγνωριστικό έτοιμο'

                    fetch('https://data.evoxs.xyz/jeandarc?metode=merrniEmrat')
                        .then(response => response.json())
                        .then(names => {
                            namesData = names
                            setTimeout(function () {

                                document.getElementById("loadText").innerText = 'Έγινε σύνδεση'
                                setTimeout(function () {
                                    document.getElementById("setupPage").style.display = ''
                                    //document.getElementById("topImg").style.opacity = '1'
                                    setTimeout(function () {
                                        //document.getElementById("loginContainer").style.opacity = '1'
                                        //document.getElementById("loginSection").classList.add('active')
                                        //document.getElementById("bgGrd").style.transform = 'scale(0.95)'
                                        document.getElementById("evoxContainer").classList.add("active")
                                        setTimeout(function () {
                                            $("#tasks").fadeOut("fast")
                                        }, 550)
                                        //video.play()
                                        setTimeout(function () {
                                            //let playbackRate = 1.0;
                                            //
                                            //const slowDown = setInterval(() => {
                                            //    playbackRate -= 0.1; // Gradually decrease the speed
                                            //    if (playbackRate <= 0.1) {
                                            //        clearInterval(slowDown);
                                            //        video.pause(); // Pause when playbackRate is near zero
                                            //        video.playbackRate = 1.0; // Reset speed for next play
                                            //    } else {
                                            //        video.playbackRate = playbackRate;
                                            //    }
                                            //}, 50);
                                        }, 2650)
                                    }, 100)

                                }, 500)
                            }, 500)



                        }).catch(error => {
                            console.error("Evox Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Δοκιμάστε αργότερα`
                            console.log('Error:', error);
                        });




                })
                .catch(error => {
                    console.error("IP Api is offline, ignoring")
                    console.log('Error:', error);
                });
        }
    }



});

const loadingHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" width="25px"
                height="25px" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#dedede"
                    d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                    <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                        to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                </path>
            </svg>`
function startSetup(e) {
    e.innerHTML = loadingHTML
    //document.getElementById("bgGrd").style.transform = ''
    document.getElementById("evoxContainer").classList.remove("active")
    document.getElementById("loadText").innerText = 'Περιμένετε..'
    setTimeout(function () {
        $("#tasks").fadeIn("fast", function () {
            document.getElementById("setupPage").style.display = ''
            document.getElementById("newUser").style.display = 'none'
            document.getElementById("case1").style.display = ''
            setTimeout(function () {
                document.getElementById("evoxContainer").classList.add("active")
                //document.getElementById("bgGrd").style.transform = 'scale(0.95)'
            }, 1000)
        })
    }, 550)
}

document.getElementById('nameInput').addEventListener('focus', function () {
    video.playbackRate = 1.5; // Ensure normal speed on play
    video.play();


});

document.getElementById('nameInput').addEventListener('blur', function () {
    video.playbackRate = 1.0;
    //let playbackRate = 1.0;
    //
    //const slowDown = setInterval(() => {
    //    playbackRate -= 0.1; // Gradually decrease the speed
    //    if (playbackRate <= 0.1) {
    //        clearInterval(slowDown);
    //        video.pause(); // Pause when playbackRate is near zero
    //        video.playbackRate = 1.0; // Reset speed for next play
    //    } else {
    //        video.playbackRate = playbackRate;
    //    }
    //}, 50);


});

document.getElementById('nameInput').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        find()
    }
})



let pin = "";
let proccessingPIN = false
function clickPIN(element) {
    let number = element.innerHTML
    console.log(number)

    if (pin.length <= 3) {
        if (pin.length == 0) {
            document.getElementById("ps1").style.width = "10px"
            document.getElementById("ps1").style.height = "10px"
        } else if (pin.length == 1) {
            document.getElementById("ps2").style.width = "10px"
            document.getElementById("ps2").style.height = "10px"
        } else if (pin.length == 2) {
            document.getElementById("ps3").style.width = "10px"
            document.getElementById("ps3").style.height = "10px"
        } else if (pin.length == 3) {
            document.getElementById("ps4").style.width = "10px"
            document.getElementById("ps4").style.height = "10px"
        }
        //not full
        pin = `${pin}${number}`
        //console.log("Pin Got:", pin)
        if (pin.length == 4) {
            proccessingPIN = true
            $("#PINdots").fadeOut("fast", function () {
                $("#PINload").fadeIn("fast")
            })
            if (pinAction === null) {
                setTimeout(function () {
                    fetch(`https://data.evoxs.xyz/jeandarc?metode=pin&pin=${pin}&emri=${foundName}`)
                        .then(response => response.text())
                        .then(status => {
                            if (status === 'Granted') {
                                console.log("Success")

                                proccessingPIN = false
                                //console.log("Correct")
                                $("#PINload").fadeOut("fast", function () {
                                    //document.body.style.overflow = 'auto';
                                    document.body.style.touchAction = '';
                                    $("#lock").fadeOut("fast", function () {
                                        document.getElementById("loadText").innerHTML = `Περιμένετε..`
                                        const accData = {
                                            "name": foundName,
                                            "pin": btoa(pin),
                                            "latestIp": ip
                                        }
                                        localStorage.setItem("jeanDarc_accountData", JSON.stringify(accData))
                                        $("#tasks").fadeIn("fast")

                                        autoLogin()

                                    })
                                    //if (localStorage.getItem("remPIN") === "true") {
                                    sessionStorage.setItem("remUnlocked", "true")
                                    //}
                                })
                            } else {

                                proccessingPIN = false
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                $("#PINload").fadeOut("fast", function () {
                                    $("#PINdots").fadeIn("fast", function () {
                                        shake_me("pin-input")
                                    })
                                })
                            }
                        }).catch(error => {
                            console.error("Evox Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Δοκιμάστε αργότερα`
                            console.log('Error:', error);
                        });

                }, 900)
            } else if (pinAction === 'old') {
                setTimeout(function () {
                    fetch(`https://data.evoxs.xyz/jeandarc?metode=pin&pin=${pin}&emri=${foundName}`)
                        .then(response => response.text())
                        .then(status => {
                            if (status === 'Granted') {
                                console.log("Success")

                                proccessingPIN = false
                                //console.log("Correct")
                                $("#PINload").fadeOut("fast", function () {
                                    document.getElementById("pinText").innerHTML = 'Επιτυχία'
                                    pinAction = 'new'
                                    $("#PINdots").fadeIn("fast")
                                    $("#lock").fadeIn("fast")
                                    setTimeout(function () {
                                        deletePIN()
                                        deletePIN()
                                        deletePIN()
                                        deletePIN()
                                        document.getElementById("pinText").innerHTML = 'Εισάγετε το νέο PIN'
                                    }, 500)

                                })
                            } else {

                                proccessingPIN = false
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                $("#PINload").fadeOut("fast", function () {
                                    $("#PINdots").fadeIn("fast", function () {
                                        shake_me("pin-input")
                                    })
                                })
                            }
                        }).catch(error => {
                            console.error("Evox Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Δοκιμάστε αργότερα`
                            console.log('Error:', error);
                        });

                }, 500)
            } else if (pinAction === 'new') {
                setTimeout(function () {
                    fetch(`https://data.evoxs.xyz/jeandarc?metode=pinChange&pin=${atob(JSON.parse(localStorage.getItem('jeanDarc_accountData')).pin)}&emri=${foundName}&pinNew=${pin}`)
                        .then(response => response.text())
                        .then(status => {
                            if (status === 'Complete') {
                                console.log("Success")

                                proccessingPIN = false
                                //console.log("Correct")
                                $("#PINload").fadeOut("fast", function () {
                                    //document.body.style.overflow = 'auto';
                                    document.body.style.touchAction = '';
                                    $("#lock").fadeOut("fast", function () {
                                        document.getElementById("loadText").innerHTML = `Περιμένετε..`
                                        const accData = {
                                            "name": foundName,
                                            "pin": btoa(pin),
                                            "latestIp": ip
                                        }
                                        localStorage.setItem("jeanDarc_accountData", JSON.stringify(accData))
                                        $("#tasks").fadeIn("fast")
                                        pinAction = null

                                        setTimeout(function () {
                                            $("#loadText").fadeOut("fast", function () {
                                                document.getElementById("loadText").innerHTML = 'Το PIN ανανεώθηκε με επιτυχία'
                                                $("#loadText").fadeIn("fast")

                                                setTimeout(function () {
                                                    $("#tasks").fadeOut("fast")
                                                    $("#app").fadeIn("fast")
                                                }, 1200)
                                            })
                                        }, 500)


                                    })
                                    //if (localStorage.getItem("remPIN") === "true") {
                                    sessionStorage.setItem("remUnlocked", "true")
                                    //}
                                })
                            } else {

                                proccessingPIN = false
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                $("#PINload").fadeOut("fast", function () {
                                    $("#PINdots").fadeIn("fast", function () {
                                        shake_me("pin-input")
                                    })
                                })
                            }
                        }).catch(error => {
                            console.error("Evox Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Δοκιμάστε αργότερα`
                            console.log('Error:', error);
                        });

                }, 500)
            }

        }
    }
    // else {    
    // Complete here    
    //    //console.log("Pin Final:", pin)
    //}
}


function autoLogin() {
    const val = localStorage.getItem("jeanDarc_accountData")
    if (val) {
        document.getElementById("topImg").style.opacity = '0'
        $("#tasks").fadeOut("fast", function () {
            $("#loginContainer").fadeOut("fast", function () {
                document.getElementById("loginContainer").style.display = 'none'
                //$("#lock").fadeIn("fast")
                const json = JSON.parse(val)
                foundName = json.name
                const process = atob(json.pin)
                fetch(`https://data.evoxs.xyz/jeandarc?metode=pin&pin=${process}&emri=${foundName}`)
                    .then(response => response.text())
                    .then(status => {
                        //alert(status)
                        if (status === 'Granted') {
                            console.log("Success")
                            document.getElementById("selfPfp").src = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${foundName}_jeanDarc`

                            const accData = {
                                "name": foundName,
                                "pin": btoa(process),
                                "latestIp": ip
                            }
                            localStorage.setItem("jeanDarc_accountData", JSON.stringify(accData))
                            $("#tasks").fadeIn("fast")
                            document.getElementById("loadText").innerText = 'Επιτυχία'
                            sessionStorage.setItem("remUnlocked", "true")

                            setTimeout(function () {
                                attach()
                            }, 1200)

                        } else {
                            document.getElementById("topImg").style.opacity = '0'
                            $("#tasks").fadeOut("fast", function () {
                                $("#loginContainer").fadeOut("fast", function () {
                                    document.getElementById("loginContainer").style.display = 'none'

                                    $("#multimatch").fadeOut("fast", function () {
                                        $("#lock").fadeIn("fast")
                                    })
                                })

                            })
                        }
                    }).catch(error => {
                        console.error("Evox Database is offline.")
                        document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Δοκιμάστε αργότερα`
                        console.log('Error:', error);
                    });
            })

        })


    } else {
        console.error("AutoLogin Failed")
    }
}

function attach() {
    if (atob(JSON.parse(localStorage.getItem("jeanDarc_accountData")).pin) === '0000') {
        console.log("Request PIN Change")
        document.getElementById("notice").classList.add("active")
    }
    $("#tasks").fadeOut("fast", function () {
        const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
        const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
        const f = `${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a} ${b.endsWith("ο") ? b.slice(0, -1) + "ε" : b}`
        console.log(f.length)
        if (f.length > 1) {
            document.getElementById("emri").innerText = `${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a}`
        } else {
            document.getElementById("emri").innerText = f
        }

        $("#app").fadeIn("fast")

    })
}

function shake_me(what) {
    document.getElementById(`${what}`).classList.add('shake');
    setTimeout(function () {
        document.getElementById(`${what}`).classList.remove('shake');
    }, 500);
}


function deletePIN() {
    if (proccessingPIN === true) {
        shake_me("pin-input")
        return;
    }
    if (pin.length == 0) {
        document.getElementById("ps1").style.width = "5px"
        document.getElementById("ps1").style.height = "5px"
    } else if (pin.length == 1) {
        document.getElementById("ps1").style.width = "5px"
        document.getElementById("ps1").style.height = "5px"
    } else if (pin.length == 2) {
        document.getElementById("ps2").style.width = "5px"
        document.getElementById("ps2").style.height = "5px"
    } else if (pin.length == 3) {
        document.getElementById("ps3").style.width = "5px"
        document.getElementById("ps3").style.height = "5px"
    } else if (pin.length == 4) {
        document.getElementById("ps4").style.width = "5px"
        document.getElementById("ps4").style.height = "5px"
    }

    pin = pin.slice(0, -1);
    //console.log("Removed last", pin)
}

function reset(e) {
    //const svgElement = e.querySelector('svg');

    //if (svgElement) {
    //    svgElement.style.transform = 'rotate(360deg)'
        setTimeout(function () {
            localStorage.removeItem("jeanDarc_accountData")
            window.location.reload()
        }, 600)
    //} else {
    //    console.log("No SVG found in this div.");
    //}
}

function dismissPINChange() {
    document.getElementById("notice").classList.remove("active")
}

let pinAction = null;
function changePin(e) {
    e.innerHTML = loadingHTML
    $("#PINdots").fadeIn("fast")
    deletePIN()
    deletePIN()
    deletePIN()
    deletePIN()
    $("#app").fadeOut("fast", function () {
        document.getElementById("notice").classList.remove("active")
        setTimeout(function () {

            document.getElementById("pinText").innerHTML = 'Εισάγετε το παλιό σας PIN'
            pinAction = 'old'
            $("#lock").fadeIn("fast")
        }, 500)
    })

}

function showProfile() {
    
    document.getElementById("darc-user-self-profile").src = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${foundName}_jeanDarc`
    document.getElementById("userName").innerText = foundName
    document.getElementById("profilePage").classList.add("active")
}

function goBackFromProfile() {
    document.getElementById("profilePage").classList.remove("active")
}