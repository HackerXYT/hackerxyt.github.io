

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

let checkChange;
setInterval(function () {
    if (foundName && foundName !== checkChange) {
        checkChange = foundName
        getEvoxProfile(foundName).then(profileSrc => {
            document.getElementById('userPinPfp').src = profileSrc
        });
        console.log("Loading Profile Picture For User:", foundName)
    }
}, 1000)
function returnFromMultimatch() {
    const multimatchElement = document.getElementById("multimatch");
    const topImgElement = document.getElementById("topImg");
    const loginSectionElement = document.getElementById("loginSection");
    const loginButtonElement = document.getElementById("loginButton");

    // Step 1: Remove the active class from multimatch
    multimatchElement.classList.remove("active");

    // Step 2: Start fading out the top image and login section
    loginSectionElement.style.opacity = '0';
    document.getElementById("evoxContainer").classList.add("active")

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
    //const video = document.getElementById("video");
    //video.play()
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

    //video.play()
    document.getElementById("accessButton").innerHTML = loadingHTML
    const searchInput = document.getElementById('nameInput').value.replace(/\s+/g, '');
    const matchedNames = findFullNames(searchInput);
    //console.log(matchedNames);
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
                    $("#hexa").fadeOut("fast")
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
                            const ranId = Math.floor(Math.random() * 909999) + 1
                            document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
                                        <div onclick="selectCustom('${name}')" class="socialUser"><img id="${ranId}" class="slUserPFP social"
                src="reloading-pfp.gif">
            <p>${name}</p><span>></span>
        </div>`
                            getEvoxProfile(name).then(profileSrc => {
                                document.getElementById(ranId).src = profileSrc
                            });

                            if (count === matchedNames.length) {
                                document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
                                            <div class="centerLogin">
        <button onclick="returnFromMultimatch()" class="welcomeButton">Πίσω</button>
    </div>`
                            }

                        });
                        setTimeout(function () {
                            //document.getElementById("topImg").style.display = 'none'
                            //document.getElementById("loginSection").style.display = 'none'
                            $("#loginContainer").fadeOut("fast", function () {
                                $("#multimatch").fadeIn("fast")
                                $("#tasks").fadeOut("fast")
                                $("#hexa").fadeOut("fast")
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
                    $("#hexa").fadeOut("fast")
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
                                                $("#hexa").fadeIn("fast")
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
            //console.log(input.length)
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

function continueToLogin(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    $("#case1").fadeOut("fast", function () {
        document.getElementById("evoxContainer").style.height = '55%'
        $("#loginForm").fadeIn("fast")
    })
}



let namesData = null
let ip = null
document.addEventListener("DOMContentLoaded", function () {
    //$("#tasks").fadeOut("fast", function () {
    //    $("#loginContainer").fadeOut("fast", function () {
    //        $("#lock").fadeIn("fast")
    //    })
    //}) testing
    let countElems = 0
    document.querySelectorAll('.moving-elements div').forEach(interactive => {
        setTimeout(function () {
            interactive.style.opacity = '1'
        }, countElems * 200)
        countElems++
    })
    document.querySelectorAll('.pin-pad button').forEach(button => {
        button.addEventListener('touchstart', () => {
            button.classList.add('active');
        });

        button.addEventListener('touchend', () => {
            setTimeout(function () {
                button.classList.remove('active');
            }, 100)

        });
    });
    if (window.innerWidth > 768) {
        //console.log("This is not a mobile device");
        //$("#tasks").fadeOut("fast", function () {
        $("#loginContainer").fadeOut("fast", function () {
            $("#device-warning").fadeIn("fast")
            $("#hexa").fadeOut('fast')
        })

        //})

    } else if (spammingDetected) {
        //$("#tasks").fadeOut("fast", function () {
        $("#loginContainer").fadeOut("fast", function () {
            $("#hexa").fadeOut('fast')
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

        //})
    } else {

        if (localStorage.getItem("jeanDarc_accountData")) {
            autoLogin()
        } else {
            stopPull = true
            //const video = document.getElementById("video");
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(geo => {
                    console.log("IP:", geo.ip)
                    ip = geo.ip
                    document.getElementById("loadText").innerText = 'Αναγνωριστικό έτοιμο'

                    fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
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
                                        //setTimeout(function () {
                                        //    //$("#tasks").fadeOut("fast")
                                        //}, 550)
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
                            console.error("Jeanne D'arc Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                            //$("#tasks").fadeIn("fast")
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
        //$("#tasks").fadeIn("fast", function () {
        document.getElementById("setupPage").style.display = ''
        document.getElementById("newUser").style.display = 'none'
        document.getElementById("case1").style.display = ''
        setTimeout(function () {
            document.getElementById("evoxContainer").classList.add("active")
            //document.getElementById("bgGrd").style.transform = 'scale(0.95)'
        }, 1000)
        //})
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
let toVerify;
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
                    fetch(`https://arc.evoxs.xyz/?metode=pin&pin=${pin}&emri=${foundName}`)
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
                                        sessionStorage.setItem("isNewUser", 'true')
                                        stopPull = null
                                        $("#tasks").fadeIn("fast")
                                        $("#hexa").fadeOut("fast")

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
                            console.error("Jeanne D'arc Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                            $("#tasks").fadeIn("fast")
                            $("#hexa").fadeOut("fast")
                            console.log('Error:', error);
                        });

                }, 900)
            } else if (pinAction === 'old') {
                setTimeout(function () {
                    fetch(`https://arc.evoxs.xyz/?metode=pin&pin=${pin}&emri=${foundName}`)
                        .then(response => response.text())
                        .then(status => {
                            if (status === 'Granted') {
                                console.log("Success")

                                proccessingPIN = false
                                //console.log("Correct")
                                $("#PINload").fadeOut("fast", function () {
                                    document.getElementById("pinText").innerHTML = 'Επιτυχία'
                                    //pinAction = 'new'
                                    pinAction = 'new'


                                    $("#PINdots").fadeIn("fast")
                                    $("#lock").fadeIn("fast")
                                    setTimeout(function () {
                                        deletePIN()
                                        deletePIN()
                                        deletePIN()
                                        deletePIN()
                                        document.getElementById("pinText").innerHTML = 'Εισάγετε το νέο σας PIN'
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
                            console.error("Jeanne D'arc Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                            $("#tasks").fadeIn("fast")
                            $("#hexa").fadeOut("fast")
                            console.log('Error:', error);
                        });

                }, 500)
            } else if (pinAction === 'verify') {
                setTimeout(function () {
                    if (toVerify === pin) {
                        fetch(`https://arc.evoxs.xyz/?metode=pinChange&pin=${atob(JSON.parse(localStorage.getItem('jeanDarc_accountData')).pin)}&emri=${foundName}&pinNew=${pin}`)
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
                                            $("#tasks").fadeOut("fast")
                                            pinAction = null

                                            setTimeout(function () {
                                                document.getElementById("loadText").style.opacity = '0'
                                                setTimeout(function () {

                                                    document.getElementById("loadText").innerText = 'Το PIN ανανεώθηκε με επιτυχία'
                                                    $("#hexa").fadeOut("fast")
                                                    $("#tasks").fadeIn("fast", function () {
                                                        setTimeout(function () {
                                                            $("#tasks").fadeOut("fast")
                                                            $("#app").fadeIn("fast")
                                                        }, 1200)
                                                    })
                                                    document.getElementById("loadText").style.opacity = '1'
                                                }, 300)
                                                //$("#loadText").fadeOut("fast", function () {
                                                //    document.getElementById("loadText").innerHTML = 'Το PIN ανανεώθηκε με επιτυχία'
                                                //    $("#loadText").fadeIn("fast")
                                                //
                                                //    setTimeout(function () {
                                                //        $("#tasks").fadeOut("fast")
                                                //        $("#app").fadeIn("fast")
                                                //    }, 1200)
                                                //})
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
                                console.error("Jeanne D'arc Database is offline.")
                                document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                                $("#tasks").fadeIn("fast")
                                $("#hexa").fadeOut("fast")
                                console.log('Error:', error);
                            });
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
                        pinAction = 'new'
                        toVerify = null
                        document.getElementById("pinText").innerHTML = 'Εισάγετε το νέο σας PIN'
                    }
                }, 500)

            } else if (pinAction === 'new') {
                toVerify = pin
                setTimeout(function () {

                    console.log("Success")

                    proccessingPIN = false
                    $("#PINload").fadeOut("fast", function () {
                        document.getElementById("pinText").innerHTML = 'Επιβεβαιώστε το νέο σας PIN'
                        //pinAction = 'new'
                        pinAction = 'verify'



                        $("#PINdots").fadeIn("fast")
                        $("#lock").fadeIn("fast")
                        setTimeout(function () {
                            deletePIN()
                            deletePIN()
                            deletePIN()
                            deletePIN()
                        }, 500)

                    })




                }, 500)

            }

        }
    }
    // else {    
    // Complete here    
    //    //console.log("Pin Final:", pin)
    //}
}

let retryInt;
function autoLogin() {
    const val = localStorage.getItem("jeanDarc_accountData")
    if (val) {
        document.getElementById("topImg").style.opacity = '0'
        //$("#tasks").fadeOut("fast", function () {
        $("#loginContainer").fadeOut("fast", function () {
            document.getElementById("loginContainer").style.display = 'none'
            //$("#lock").fadeIn("fast")
            const json = JSON.parse(val)
            foundName = json.name
            const process = atob(json.pin)
            fetch(`https://arc.evoxs.xyz/?metode=pin&pin=${process}&emri=${foundName}`)
                .then(response => response.text())
                .then(status => {
                    try {
                        clearInterval(retryInt)
                    } catch (error) {
                        console.log("Ignoring undefined interval")
                    }

                    //alert(status)
                    if (status === 'Granted') {
                        console.log("Success")
                        document.getElementById("selfPfp").src = 'reloading-pfp.gif'
                        getEvoxProfile(foundName).then(profileSrc => {
                            console.log(profileSrc)
                            document.getElementById("selfPfp").src = profileSrc
                            document.getElementById("navbarpfp").src = profileSrc
                        });

                        const accData = {
                            "name": foundName,
                            "pin": btoa(process),
                            "latestIp": ip
                        }
                        localStorage.setItem("jeanDarc_accountData", JSON.stringify(accData))
                        document.getElementById("loadText").style.opacity = '0'
                        setTimeout(function () {

                            document.getElementById("loadText").innerText = 'Επιτυχία'
                            //$("#tasks").fadeIn("fast", function () {
                            setTimeout(function () {
                                attach()
                            }, 1200)
                            //})
                            document.getElementById("loadText").style.opacity = '1'
                        }, 300)
                        //$("#tasks").fadeOut("fast")



                        sessionStorage.setItem("remUnlocked", "true")



                    } else {
                        document.getElementById("topImg").style.opacity = '0'
                        //$("#tasks").fadeOut("fast", function () {
                        $("#loginContainer").fadeOut("fast", function () {
                            document.getElementById("loginContainer").style.display = 'none'
                            $("#multimatch").fadeOut("fast", function () {
                                $("#lock").fadeIn("fast")
                            })
                        })

                        //})
                    }
                }).catch(error => {
                    console.error("Jeanne D'arc Database is offline.")
                    document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                    $("#tasks").fadeIn("fast")
                    $("#hexa").fadeOut("fast")
                    //alert("a")
                    retryInt = setInterval(function () {
                        fetch(`https://arc.evoxs.xyz/?metode=pin&pin=${process}&emri=${foundName}`)
                            .then(response => response.text())
                            .then(status => {
                                clearInterval(retryInt)
                                autoLogin()
                            }).catch(error => {
                                console.log("Still Offline")
                            })
                        //autoLogin()
                    }, 1000)
                    console.log('Error:', error);
                });
            getEvoxProfile(foundName).then(profileSrc => {
                document.getElementById('userPinPfp').src = profileSrc
            });
        })

        //})


    } else {
        console.error("AutoLogin Failed")
    }
}

function attach() {
    document.getElementById("gradColored").style.opacity = '1'
    if (atob(JSON.parse(localStorage.getItem("jeanDarc_accountData")).pin) === '0000') {
        console.log("Request PIN Change")
        document.getElementById("notice").classList.add("active")
        document.body.style.overflow = "hidden"
        setTimeout(function () {
            document.getElementById("app").style.transform = "scale(0.95)"
        }, 500)

    }
    document.body.style.backgroundColor = 'rgb(5,2,16)'
    $("#hexa").fadeOut("fast", function () {
        $("#tasks").fadeOut("fast")

        const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
        const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
        const f = `${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a} ${b.endsWith("ο") ? b.slice(0, -1) + "ε" : b}`
        console.log(f.length)
        if (f.length > 1) {

            document.getElementById("emri").innerText = `${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a}`
        } else {
            document.getElementById("emri").innerText = f
        }

        if (!sessionStorage.getItem('isNewUser')) {
            document.getElementById("welcmtxt").innerHTML = `Καλώς ήρθες ξανά 👋`
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
function changePin(e, event) {
    event.preventDefault();
    event.stopPropagation();
    getEvoxProfile(foundName).then(profileSrc => {
        document.getElementById('userPinPfp').src = profileSrc
    });
    e.innerHTML = loadingHTML
    $("#PINdots").fadeIn("fast")
    deletePIN()
    deletePIN()
    deletePIN()
    deletePIN()
    $("#app").fadeOut("fast", function () {

        setTimeout(function () {
            document.getElementById("notice").style.transform = 'translateY(100vh)'
            document.getElementById("pinText").innerHTML = 'Εισάγετε το παλιό σας PIN'
            pinAction = 'old'
            $("#lock").fadeIn("fast")
        }, 500)
    })

}

function showProfile(e) {
    document.body.style.overflow = 'hidden'
    stopPull = true
    const img = e.querySelector('img')
    img.style.transform = "scale(0.9)"

    setTimeout(function () {
        img.style.transform = ""
        document.getElementById("darc-user-self-profile").src = 'reloading-pfp.gif'
        getEvoxProfile(foundName).then(profileSrc => {
            document.getElementById("darc-user-self-profile").src = profileSrc
        });
        document.getElementById("userName").innerText = foundName
        //document.getElementById("seksioni").innerText = "?"
        fetch(`https://arc.evoxs.xyz/?metode=klasaMerr&emri=${foundName}`)
            .then(response => response.text())
            .then(seksioniData => {
                if (seksioniData !== "Nuk u gjet") {
                    seksioniData = JSON.parse(seksioniData)
                    //document.getElementById("seksioni").innerText = `${data.seksioni}'${data.klasa}`
                }
                fetch(`https://arc.evoxs.xyz/?metode=tags&emri=${foundName}`)
                    .then(response => response.json())
                    .then(tagsData => {
                        document.getElementById("tags").innerHTML = ''
                        document.getElementById("tags").innerHTML = `<div class="anInfo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14C7.01472 14 5 11.9853 5 9.5Z"
                            fill="#fff" />
                        <path
                            d="M14.3675 12.0632C14.322 12.1494 14.3413 12.2569 14.4196 12.3149C15.0012 12.7454 15.7209 13 16.5 13C18.433 13 20 11.433 20 9.5C20 7.567 18.433 6 16.5 6C15.7209 6 15.0012 6.2546 14.4196 6.68513C14.3413 6.74313 14.322 6.85058 14.3675 6.93679C14.7714 7.70219 15 8.5744 15 9.5C15 10.4256 14.7714 11.2978 14.3675 12.0632Z"
                            fill="#fff" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M4.64115 15.6993C5.87351 15.1644 7.49045 15 9.49995 15C11.5112 15 13.1293 15.1647 14.3621 15.7008C15.705 16.2847 16.5212 17.2793 16.949 18.6836C17.1495 19.3418 16.6551 20 15.9738 20H3.02801C2.34589 20 1.85045 19.3408 2.05157 18.6814C2.47994 17.2769 3.29738 16.2826 4.64115 15.6993Z"
                            fill="#fff" />
                        <path
                            d="M14.8185 14.0364C14.4045 14.0621 14.3802 14.6183 14.7606 14.7837V14.7837C15.803 15.237 16.5879 15.9043 17.1508 16.756C17.6127 17.4549 18.33 18 19.1677 18H20.9483C21.6555 18 22.1715 17.2973 21.9227 16.6108C21.9084 16.5713 21.8935 16.5321 21.8781 16.4932C21.5357 15.6286 20.9488 14.9921 20.0798 14.5864C19.2639 14.2055 18.2425 14.0483 17.0392 14.0008L17.0194 14H16.9997C16.2909 14 15.5506 13.9909 14.8185 14.0364Z"
                            fill="#fff" />
                    </svg>
                    <span id="seksioni">${seksioniData.seksioni}'${seksioniData.klasa}</span>
                </div>`
                        tagsData.forEach(tag => {
                            document.getElementById("tags").innerHTML = `${document.getElementById("tags").innerHTML}<div class="anInfo">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.48 5.85869C21.4164 5.41415 21.0645 5.06646 20.6191 5.00848C20.49 4.99139 20.3611 4.97172 20.2324 4.95147C20.0833 4.92802 19.8977 4.89737 19.6863 4.85942C19.5451 4.83409 19.3922 4.80551 19.2311 4.77365C18.4146 4.61227 17.4279 4.37565 16.636 4.06798C15.2035 3.51144 13.8156 2.82416 12.4535 2.11397C12.1538 1.9573 11.7893 1.96544 11.4954 2.13101C10.2139 2.84808 8.89722 3.53579 7.52747 4.06798C6.74195 4.37311 5.71534 4.60971 4.85035 4.77177C4.42493 4.85148 4.05189 4.91076 3.78577 4.95002C3.64722 4.97047 3.50855 4.99028 3.36964 5.00738C2.92054 5.06184 2.56397 5.41092 2.50001 5.85869C1.97803 9.51317 2.39197 12.8028 3.91444 15.5689C5.43983 18.3407 8.01758 20.4762 11.6159 21.9275C11.739 21.9772 11.8696 22.0014 12 22.0001C12.1237 21.9988 12.2472 21.9746 12.364 21.9275C15.9624 20.4762 18.54 18.3407 20.0656 15.5689C21.5879 12.8029 22.0021 9.51317 21.48 5.85869ZM8.00001 10.0001C8.00001 7.79092 9.79087 6.00006 12 6.00006C14.2091 6.00006 16 7.79092 16 10.0001C16 12.2092 14.2091 14.0001 12 14.0001C9.79087 14.0001 8.00001 12.2092 8.00001 10.0001ZM8.39716 17.4814C9.14334 17.1585 10.2655 17.0001 12 17.0001C13.7753 17.0001 14.9078 17.1543 15.6538 17.4801C16.16 17.7011 16.7494 17.47 16.9705 16.9639C17.1915 16.4578 16.9604 15.8683 16.4543 15.6472C15.3044 15.145 13.8147 15.0001 12 15.0001C10.2123 15.0001 8.74384 15.1522 7.60286 15.6459C7.096 15.8652 6.86291 16.4539 7.08225 16.9608C7.30159 17.4677 7.8903 17.7007 8.39716 17.4814Z" fill="#fff"/>
<path d="M12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8Z" fill="#fff"/>
</svg>
                    <span>${tag}</span>
                </div>`
                        })

                    }).catch(error => {
                        console.error("Jeanne D'arc Database is offline.")
                        console.log('Error:', error);
                    });
            }).catch(error => {
                console.error("Jeanne D'arc Database is offline.")
                console.log('Error:', error);
            });

        document.getElementById("profilePage").classList.add("active")
    }, 100)

}

function goBackFromProfile(e) {
    document.body.style.overflow = null
    stopPull = null;
    e.style.transform = "scale(0.9)"
    setTimeout(function () {
        e.style.transform = "scale(1)"
        document.getElementById("profilePage").classList.remove("active")
    }, 100)

}

function clickCard(e) {
    e.style.transform = "scale(0.99)"
    setTimeout(function () {
        e.style.transform = "scale(1)"
    }, 200)
}

function actionClick(event, e) {
    event.preventDefault(); // Prevent default behavior
    event.stopPropagation(); // Stop the event from bubbling up to parent elements

    const svgElement = e.querySelector('svg');
    if (svgElement) {
        svgElement.style.transform = 'rotate(360deg)'
        setTimeout(function () {
            svgElement.style.transform = 'rotate(0deg)'
            e.classList.toggle("active")
        }, 500)
    } else {
        console.log("No SVG found in this div.");
    }
}

let startProg = 10;

function testCard(e) {
    e.style.transform = 'scale(0.99)';
    setTimeout(function () {
        // Increment the progress
        let targetProg = startProg + 10;

        if (targetProg >= 100) {
            targetProg = 0;
        }

        // Animate the number change
        animateNumberChange(e, targetProg);

        // Update the progress-ring style
        const elm = e.querySelector('div.progress-ring');
        elm.style = `--progress: ${targetProg};`;

        // Reset scale
        e.style.transform = 'scale(1)';

        // Update the startProg for the next cycle
        startProg = targetProg;

    }, 200);
}

function animateNumberChange(element, targetValue) {
    const txt = element.querySelector('div.progress-ring div.percentage');
    const currentValue = parseInt(txt.innerText) || 0; // Default to 0 if the text is empty
    const duration = 500; // Duration of the animation in ms
    const steps = 40; // Number of steps for the animation (controls how smooth the animation is)
    const increment = (targetValue - currentValue) / steps;

    let count = 0;

    function update() {
        count++;
        const newValue = currentValue + increment * count;
        txt.innerText = Math.round(newValue) + "%";

        if (count < steps) {
            requestAnimationFrame(update);
        } else {
            txt.innerText = targetValue + "%"; // Ensure it ends exactly at the target value
        }
    }

    update();
}

let isSocialed = false;
let socialSection = 'none'
let socialUsername = 'none'
async function getEvoxProfile(name) {
    //console.log("Getting pfp for", name);

    try {
        const response = await fetch(`https://arc.evoxs.xyz/?metode=fotoMerrni&emri=${name}`);
        const data = await response.text();

        //console.log(data);
        if (data !== 'null') {
            if (name === foundName) {
                isSocialed = true
                if (data.includes("instagram")) {
                    socialSection = 'instagram'
                    $("#instagramedProfile").fadeIn("fast")
                } else {
                    socialSection = 'facebook'
                }
            }
            const regex = /\/([^\/]+)\.evox$/;
            const match = data.match(regex);
            if (match) {
                const extracted = match[1];
                socialUsername = extracted;
            } else {
                console.log("No match found");
            }
            return data;
        } else {
            return `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${name}_jeanDarc`;  // Return default fallback URL
        }
    } catch (error) {
        console.error("Jeanne D'arc Database is offline.");
        console.log('Error:', error);
        return null;
    }
}


function openInstagram() {
    if (isSocialed && socialSection === 'instagram' && socialUsername) {
        window.open(`https://instagram.com/${socialUsername}`, '_blank');
    }
}

function showSocial() {
    document.getElementById("social").classList.add("active")
    fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
        .then(response => response.json())
        .then(names => {
            namesData = names
            const fullNames = Object.keys(names.names);
            //console.log(fullNames)
            document.getElementById("socialSpawn").innerHTML = ''
            fullNames.forEach(name => {
                fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${name}`)
                    .then(response => response.json())
                    .then(info => {
                        document.getElementById("socialSpawn").innerHTML += `<div class="socialUser">
                <img class="slUserPFP social"
                    src="${info.foto}">
                <p>${info.emri}</p><span>${info.seksioni}'${info.klasa}</span>
            </div>`

                    }).catch(error => {
                        console.error("Jeanne D'arc Database is offline.")
                        console.log('Error:', error);
                    });

            })


        }).catch(error => {
            console.error("Jeanne D'arc Database is offline.")
            console.log('Error:', error);
        });
}

function hideSocial() {
    document.getElementById("social").classList.remove("active")
}

function grabberEvents(id) {

    const notice = document.getElementById(id);
    let startY, currentY, isDragging = false;

    // Initialize event listeners for touch/mouse events
    notice.addEventListener("mousedown", startDrag);
    notice.addEventListener("touchstart", startDrag);
    notice.addEventListener("mousemove", drag);
    notice.addEventListener("touchmove", drag);
    notice.addEventListener("mouseup", endDrag);
    notice.addEventListener("touchend", endDrag);

    function startDrag(e) {
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = true;
        notice.style.transition = "none";  // Disable transitions for smoother dragging
    }

    function drag(e) {
        if (!isDragging) return;

        currentY = e.touches ? e.touches[0].clientY : e.clientY;
        let deltaY = currentY - startY;

        if (deltaY > 0) {  // Only allow downward dragging
            notice.style.transform = `translateY(${deltaY}px)`;
        }
    }

    function endDrag() {
        isDragging = false;
        notice.style.transition = "transform 0.3s ease";  // Add smooth return or dismiss transition

        if (currentY - startY > 150) {
            notice.style.transform = `translateY(100vh)`;

            if (id === 'notice') {
                document.body.style.overflow = null
                document.getElementById("app").style.transform = ""
            }
            notice.addEventListener("transitionend", () => {
                notice.classList.remove("active");
                notice.style.transform = ``;

            }, { once: true });
        } else {
            notice.style.transform = ``;  // Reset if not dismissed
        }
    }
}
grabberEvents("notice")

function grabberEventsNoDismiss(id) {

    const notice = document.getElementById(id);
    let startY, currentY, isDragging = false;

    // Initialize event listeners for touch/mouse events
    notice.addEventListener("mousedown", startDrag);
    notice.addEventListener("touchstart", startDrag);
    notice.addEventListener("mousemove", drag);
    notice.addEventListener("touchmove", drag);
    notice.addEventListener("mouseup", endDrag);
    notice.addEventListener("touchend", endDrag);

    function startDrag(e) {
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = true;
        notice.style.transition = "height 1s ease-in-out";  // Disable transitions for smoother dragging
    }

    function drag(e) {
        if (!isDragging) return;

        currentY = e.touches ? e.touches[0].clientY : e.clientY;
        let deltaY = currentY - startY;

        if (deltaY > 0) {  // Only allow downward dragging
            notice.style.transform = `translateY(${deltaY}px)`;
        }
    }

    function endDrag() {
        isDragging = false;
        notice.style.transition = "transform 0.4s ease-in-out, height 1s ease-in-out";  // Add smooth return or dismiss transition
        notice.style.transform = ``;

        //if (currentY - startY > 150) {
        //    notice.style.transform = `translateY(100vh)`;
        //
        //    notice.addEventListener("transitionend", () => {
        //        notice.classList.remove("active");
        //        notice.style.transform = ``;
        //        if (id === 'notice') {
        //            document.body.style.overflow = ""
        //            document.getElementById("app").style.transform = ""
        //        }
        //    }, { once: true });
        //} else {
        //    notice.style.transform = ``;  // Reset if not dismissed
        //}
    }
}

grabberEventsNoDismiss("evoxContainer")

function reDoPinChange() {
    document.getElementById("app").style.transform = "scale(0.95)"
    document.body.style.overflow = "hidden"
    document.getElementById('notice').classList.toggle('active');
    document.getElementById("profilePage").classList.remove("active")
}

let stopPull = null;
let lastScrollY = window.scrollY; // Store the last known scroll position
const pullThreshold = -120; // Maximum pull distance
const debugReload = document.getElementById("debugReload");

// Scroll event listener
window.addEventListener("scroll", (event) => {
    const currentScrollY = window.scrollY;
    //if (currentScrollY < 0 && !stopPull || !document.getElementById("notice").classList.contains('active') && currentScrollY < 0) {
    //    const pullDistance = Math.abs(currentScrollY); // Get pull distance (positive value)
    //    const lines = document.querySelectorAll('.debugReload svg g g path');
    //
    //    if (lines.length > 0) {
    //        const totalPaths = lines.length;
    //
    //        // Calculate the percentage of paths to fill
    //        const fillPercentage = Math.min(pullDistance / Math.abs(pullThreshold), 1);
    //        const pathsToFill = Math.floor(fillPercentage * totalPaths);
    //
    //        // Fill paths with white progressively
    //        lines.forEach((line, index) => {
    //            if (index < pathsToFill) {
    //                line.setAttribute("fill", "#fff"); // Fill color
    //            } else {
    //                line.setAttribute("fill", "none"); // Reset others to default
    //            }
    //        });
    //
    //        // Optional: Visual feedback for the pull
    //        debugReload.style.top = `${Math.min(pullDistance, 50)}px`;
    //    }
    //}

    //const paths = document.querySelectorAll('.debugReload svg g g path');
    //
    //const allWhite = Array.from(paths).every(path => path.getAttribute('fill') === '#fff');
    //
    //if (allWhite) {
    //    //alert('All of them are filled with white');
    //    window.location.reload()
    //}


    // Update the last known scroll position
    //lastScrollY = currentScrollY;
});

//window.addEventListener('scroll', manageScroll, { passive: false });
//
//function manageScroll(event) {
//    if(stopPull) {
//        event.preventDefault();
//        event.stopPropagation();
//        alert("stopping")
//        return false;
//
//    }
//
//}