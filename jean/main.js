

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

function isIOS() {
    //alert(navigator.userAgent)
    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

if (isIOS()) {
    console.log(isIOS())
    document.getElementById("gradColored").style.opacity = '1'
}

function getRandomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

let foundName = null;

let checkChange;
setInterval(function () {
    if (foundName && foundName !== checkChange && localStorage.getItem("jeanDarc_accountData")) {
        checkChange = foundName
        getEvoxProfile(foundName).then(profileSrc => {
            document.getElementById('userPinPfp').src = profileSrc
        });
        console.log("Loading Profile Picture For User:", foundName)
    }
}, 6000)
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
    //const searchInput = document.getElementById('nameInput').value.replace(/\s+/g, '');
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
                document.getElementById("pinText").style.marginBottom = null
                document.getElementById("accessButton").innerHTML = `Επιτυχία`
                setTimeout(function () {
                    let count = 0
                    const karuseliCont = document.getElementById("karuseli")
                    karuseliCont.style.display = null
                    document.getElementById("userPinPfp").style.display = 'none'
                    karuseliCont.innerHTML = ''
                    matchedNames.forEach(name => {
                        count++
                        const firstChar = (str) => str.split(' ')[1]?.charAt(0) || null;
                        const ranId = Math.floor(Math.random() * 909999) + 1
                        if (count === 1) {
                            karuseliCont.innerHTML = `${karuseliCont.innerHTML}<img onclick="pickasCurrent('${name}')" class="fytyre zgjedhur" src="reloading-pfp.gif" alt="Fytyrë ${count}" id="${ranId}">`
                        } else {
                            karuseliCont.innerHTML = `${karuseliCont.innerHTML}<img onclick="pickasCurrent('${name}')" class="fytyre" src="reloading-pfp.gif" alt="Fytyrë ${count}" id="${ranId}">`
                        }

                        //document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
                        //<div onclick="selectCustom('${name}')" class="socialUser"><img id="${ranId}" class="slUserPFP social"
                        getEvoxProfile(name).then(profileSrc => {
                            document.getElementById(ranId).src = profileSrc
                        });

                        if (count === matchedNames.length) {
                            const karuseli = document.querySelectorAll('.fytyre');
                            function positionImages() {
                                const zgjedhurIndex = Array.from(karuseli).findIndex(el => el.classList.contains('zgjedhur'));

                                karuseli.forEach((el, i) => {
                                    const position = i - zgjedhurIndex; // Calculate relative position
                                    el.style.transform = `translateX(${position * 70}px)`; // Adjust distance
                                });
                            }

                            // Initialize positions at load
                            positionImages();

                            // Add event listeners for clicks
                            karuseli.forEach((fytyre, index) => {
                                fytyre.addEventListener('click', () => {
                                    document.querySelector('.zgjedhur').classList.remove('zgjedhur');
                                    fytyre.classList.add('zgjedhur');
                                    positionImages(); // Recalculate positions
                                });
                            });
                        }
                    });

                    document.getElementById("loadText").innerHTML = `Η αυτόματη σύνδεση απέτυχε`
                    setTimeout(function () {
                        $("#hexa").fadeOut("fast")
                        document.getElementById("evoxContainer").classList.remove("active")

                        $("#tasks").fadeIn("fast", function () {

                            document.getElementById("loadText").style.opacity = '1'


                            setTimeout(function () {
                                //document.getElementById("loadText").style.opacity = '0'
                                setTimeout(function () { //
                                    const a = matchedNames[0].split(' ')[0].replace(/[σς]+$/, '')
                                    const b = matchedNames[0].split(' ')[1].replace(/[σς]+$/, '')
                                    $("#tasks").fadeOut("fast", function () {
                                        document.getElementById("loadText").style.opacity = '0'
                                        document.getElementById("taskLoading").style.display = 'none'
                                        document.getElementById("tempLoader").style.display = 'flex'
                                        document.getElementById("loadText").innerHTML = `Επιλέξτε τον λογαριασμό σας`

                                        $("#tasks").fadeIn("fast", function () {
                                            document.getElementById("loadText").style.opacity = '1'
                                            setTimeout(function () {
                                                document.getElementById("topImg").style.opacity = '0'
                                                $("#tasks").fadeOut("fast", function () {
                                                    document.getElementById("tempLoader").style.display = 'none'
                                                    document.getElementById("taskLoading").style.display = null
                                                    $("#loginContainer").fadeOut("fast", function () {
                                                        document.getElementById("loginContainer").style.display = 'none'
                                                        $("#multimatch").fadeOut("fast", function () {
                                                            document.getElementById("nameForMultiple").innerText = matchedNames[0]
                                                            document.getElementById("nameForMultiple").style.display = 'flex'
                                                            $("#lock").fadeIn("fast")
                                                            $("#hexa").fadeOut("fast")
                                                        })
                                                    })

                                                })
                                            }, 1500)
                                        })
                                    })

                                }, 340)
                            }, 900)
                        })



                    }, 340)

                    return;
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
                                                    document.getElementById("nameForMultiple").style.display = 'none'
                                                    $("#lock").fadeIn("fast")
                                                    $("#hexa").fadeOut("fast")
                                                })
                                            })

                                        })
                                    }, 2500)
                                }, 340)
                            }, 900)
                        })


                    }, 340)

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
                document.getElementById("loadText").innerHTML = ''
                foundName = matchedNames[0]
                const karuseliCont = document.getElementById("karuseli")
                karuseliCont.style.display = 'none'
                document.getElementById("userPinPfp").style.display = null
                document.getElementById("nameForMultiple").style.display = 'none'
                getEvoxProfile(foundName).then(profileSrc => {
                    document.getElementById('userPinPfp').src = profileSrc
                });
                document.getElementById("pinText").style.marginBottom = '25px'
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
                                                $("#hexa").fadeOut("fast")
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

function findFirstMatch(name) {
    const searchInput = name.replace(/\s+/g, '');
    const matchedNames = findFullNames(searchInput);

    if (matchedNames.length > 0) {
        return matchedNames[0]; // Return the first match
    } else {
        return null; // Return null if no match is found
    }
}

function pickasCurrent(name) {
    foundName = name
    document.getElementById("nameForMultiple").innerText = foundName
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
    if (window.innerWidth > 768 && !localStorage.getItem("devBypass")) {
        //console.log("This is not a mobile device");
        //$("#tasks").fadeOut("fast", function () {
        $("#loginContainer").fadeOut("fast", function () {
            $("#device-warning").fadeIn("fast")
            $("#hexa").fadeOut('fast')
        })

        //})

    } else if (spammingDetected && !localStorage.getItem("devBypass")) { //REMOVE THIS LINE TO ENABLE SPAM DETECTION
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
                                        document.getElementById("loginContainer").style.opacity = '1'
                                        document.getElementById("loginSection").classList.add('active')
                                        document.getElementById("bgGrd").style.transform = 'scale(0.97)'
                                        //document.getElementById("evoxContainer").classList.add("active")
                                        setTimeout(function () {
                                            //$("#tasks").fadeOut("fast")
                                        }, 550)
                                        //video.play()
                                        setTimeout(function () {
                                            $("#hexa").fadeOut("fast")
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
                                        }, 350)
                                    }, 100)

                                }, 500)
                            }, 500)



                        }).catch(error => {
                            console.error("Jeanne D'arc Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                            $("#tasks").fadeIn("fast")
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
            //document.getElementById("bgGrd").style.transform = 'scale(0.97)'
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
                                                            document.body.style.overflow = null
                                                            document.getElementById("app").style.transform = ""
                                                            document.getElementById("app").style.opacity = "1"
                                                            setTimeout(function () { document.getElementById("app").style.opacity = "1" }, 500)

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

        })
        getEvoxProfile(foundName).then(profileSrc => {
            document.getElementById('userPinPfp').src = profileSrc
        });
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
        //setTimeout(function () {
        document.getElementById("app").style.opacity = "0.7"
        document.getElementById("app").style.transform = "scale(0.97)"
        //}, 500)

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
            if(profileSrc.includes("data.evoxs.xyz")) {document.getElementById("instagramedProfile").style.display = 'none'} else {document.getElementById("instagramedProfile").style.display = null}
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
                    🏫
                    <span id="seksioni">${seksioniData.seksioni}${seksioniData.klasa}</span>
                </div>`
                        tagsData.forEach(tag => {
                            document.getElementById("tags").innerHTML = `${document.getElementById("tags").innerHTML}<div class="anInfo">
                    🏛️
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
        if (e.getAttribute('data-evox') === 'yearbook') {
            activateYearbook()
        }
    }, 200)

}
let allUsers = {}
let classes = {}
let usersElems = {}
function activateYearbook() {
    allUsers = {}
    classes = {}
    usersElems = {}
    $("#app").fadeOut("fast", function () {
        document.getElementById("loadText").innerHTML = 'Φόρτωση..'
        $("#tasks").fadeIn("fast", function () {
            fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
                .then(response => response.json())
                .then(names => {
                    namesData = names
                    const fullNames = Object.keys(names.names);
                    document.getElementById("spawnPeople").innerHTML = '';
                    let selfClass = null
                    const fetchPromises = fullNames.map(name => {
                        return fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${name}`)
                            .then(response => response.json())
                            .then(info => {
                                if (info.emri !== foundName) {
                                    allUsers[info.emri] = info;
                                } else {
                                    selfClass = `${info.seksioni}${info.klasa}`
                                }

                            })
                            .catch(error => {
                                console.error("Jeanne D'arc Database is offline.");
                                console.log('Error:', error);
                            });
                    });

                    Promise.all(fetchPromises)
                        .then(() => {
                            Object.entries(allUsers).forEach(([key, user]) => {
                                // key -> emri, user -> data
                                if (classes[`${user.seksioni}${user.klasa}`]) {
                                    classes[`${user.seksioni}${user.klasa}`].push(user);
                                } else {
                                    classes[`${user.seksioni}${user.klasa}`] = [user];
                                }
                            });

                            console.log(classes);

                            Object.entries(classes).forEach(([key, aclass]) => {
                                if (!document.getElementById("spawnPeople").innerText.includes(key)) {
                                    const toFind = key.match(/[Α-Ω]+|\d+/g);
                                    document.getElementById("spawnPeople").innerHTML += `<div class="spawnPeople" id="${key}-cont">
                                    <p style="text-align: left">${toFind[0]}${toFind[1] ? "'"+toFind[1] : ""}</p></div>` //${key.includes("ΚΑΘ") ? " style='display: none'" : ""}
                                }
                                console.log(key, aclass)




                                // key -> class, user -> data
                                if (key === selfClass) {

                                    document.getElementById(`${key}-cont`).classList.add("upup")
                                    document.getElementById(`${key}-cont`).innerText = 'Στην τάξη σου'
                                    //classes[`${user.seksioni}${user.klasa}`].push(user);
                                }

                                Object.entries(aclass).forEach(([nameEach, inform]) => {
                                    if (inform.emri === foundName) { return; }
                                    const ranId = Math.floor(Math.random() * 909999) + 1
                                    usersElems[inform.emri] = { ranId: ranId, info: inform }
                                    document.getElementById(`${key}-cont`).innerHTML += `<div id="user-${ranId}" class="aStudent fade-in-slide-up" onclick="pickStudent('${inform.emri}', this)">
                                    <div class="studentImage">
                                        <img alt="Αποτυχία" src="${inform.foto}">
                                    </div>
                                    <div class="studentInfo">
                                        <p>${inform.emri}</p>
                                    </div>
                                </div>`
                                })

                            });
                        });




                }).catch(error => {
                    console.error("Jeanne D'arc Database is offline.")
                    console.log('Error:', error);
                });

            //const a = foundName.split(" ")[0]
            const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
            const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
            //document.getElementById("loadText").innerHTML = `Ας ξεκινήσουμε,<br>${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a}`
            document.getElementById("loadText").innerHTML = `Περιμένετε..`
            document.getElementById("loadText").style.opacity = '1'
            //$("#gradColored").fadeOut("fast", function () {
            //    //$("#static").fadeIn("fast")
            //    document.getElementById("static").style.opacity = '1'
            //})

            setTimeout(function () {
                $("#tasks").fadeOut("fast", function () {
                    document.getElementById("yearbook-container").style.display = 'block'
                    document.getElementById("yearbook-container").style.opacity = '1'

                    //const emojiCont = document.querySelector('.emoji-cont');
                    //const emotions = [
                    //    "😃", "😢", "😡", "😱", "😍", "🤔", "😂", "😐", 
                    //    "😎", "🥳", "😴", "🥺", "🤩", "🙄", "😜", "🤗", 
                    //    "😅", "😌", "😶", "😇", "😈", "😬", "🥰", "😤", 
                    //    "😓", "🤯", "🫣", "😖"
                    //  ]
                    //  ;
                    //let index = 0;
                    //function changeEmoji() {
                    //    emojiCont.classList.remove('active');
                    //    setTimeout(() => {
                    //        emojiCont.textContent = emotions[index];
                    //        emojiCont.classList.add('active');
                    //        index = (index + 1) % emotions.length;
                    //    }, 500);
                    //}
                    //setInterval(changeEmoji, 2000);
                    //changeEmoji();
                    const emojiCont = document.querySelector('.emoji-cont');
                    emojiCont.classList.add('active');



                })
            }, 1000)
        })
    })

}
function goBackFromBook() {
    pickedStudents = []
    document.getElementById("static").style.opacity = '0'
    setTimeout(function () {
        $("#gradColored").fadeIn("fast")
    }, 500)


    document.getElementById("yearbook-container").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("yearbook-container").style.display = 'none'
    }, 500)
    $("#app").fadeIn("fast", function () { })
    document.getElementById("count-picked").style.opacity = '0'
    $("#buttonStartCont").fadeOut("fast")
}

function goBackFromRate() {

    document.getElementById("yearbook-screen-2").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("yearbook-container").style.display = 'block'
        document.getElementById("yearbook-container").style.opacity = '1'
        document.getElementById("yearbook-screen-2").style.display = 'none'
        document.getElementById("count-picked").style.opacity = '1'
        $("#buttonStartCont").fadeIn("fast")
    }, 500)




}

let pickedStudents = []

function pickStudent(name, e) {
    if (e.classList.contains("picked")) {
        e.classList.remove("picked")
        pickedStudents = pickedStudents.filter(student => student !== name);
        document.getElementById("count-picked").innerHTML = pickedStudents.length
    } else {
        e.classList.add("picked")
        pickedStudents.push(name)
        document.getElementById("count-picked").innerHTML = pickedStudents.length
    }
    if (pickedStudents.length > 0) {
        document.getElementById("count-picked").style.opacity = '1'
        $("#buttonStartCont").fadeIn("fast")
    } else {
        document.getElementById("count-picked").style.opacity = '0'
        $("#buttonStartCont").fadeOut("fast")
    }


}
function fixNameCase(name) {
    const nameEndings = {
        'ης': 'η',
        'ος': 'ο',
        'ά': 'ά',
        'ι': 'ι',
        'ς': 'η',
        'ας': 'α'
    };

    if (name === 'Αίαντας') {
        return 'Αίαντα';
    }
    if (name === 'Ηλίας') {
        return 'Ηλία';
    }

    name = name.toLowerCase();

    for (let ending in nameEndings) {
        if (name.endsWith(ending)) {
            name = name.slice(0, -ending.length) + nameEndings[ending];
            break;
        }
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
}


function getGender(name) {
    const girlEndings = ['α', 'η', 'ώ', 'ί', 'ύ'];
    const boyEndings = ['ς', 'ος', 'ης', 'ους'];
    name = name.toLowerCase();
    for (let ending of girlEndings) {
        if (name.endsWith(ending)) {
            return 'Female';
        }
    }
    for (let ending of boyEndings) {
        if (name.endsWith(ending)) {
            return 'Male';
        }
    }

    return 'Unknown';
}

const phrases = [
    "Πώς σου φάνηκε ο τελευταίος χρόνος με {callout} {name}?",
    "Ποιες στιγμές από την τάξη σου θα θυμάσαι πάντα με {callout} {name}?",
    "Ποιες είναι οι πιο αστείες αναμνήσεις σου με {callout} {name}?",
    "Πώς σε έχει βοηθήσει {callout-οη} {name} στην τάξη ή έξω από αυτήν?",
    "Ποιες αξέχαστες στιγμές πέρασες με {callout} {name} στο σχολείο?",
    "Ποιο είναι το αγαπημένο σου χαρακτηριστικό {callout-τουτης} {name}?",
    "Ποιες δραστηριότητες κάνατε μαζί με {callout} {name} που σου έμειναν αξέχαστες?",
    "Πες μας κάτι που δεν ξέρουμε για {callout} {name}!",
    "Ποιες είναι οι πιο εμπνευσμένες ιδέες που μοιράστηκε μαζί σου {callout-οη} {name}?",
    "Πώς βοηθάει {callout-οη} {name} τους άλλους μαθητές στην τάξη?",
    "Ποιες ήταν οι πιο ενδιαφέρουσες συζητήσεις που είχες με {callout} {name}?",
    "Αν έπρεπε να χαρακτηρίσεις {callout} {name} με 5 λέξεις, ποιες θα ήταν αυτές?",
    "Ποιες στιγμές του σχολείου με {callout} {name} θεωρείς τις πιο σημαντικές για σένα?",
    "Τι σου αρέσει πιο πολύ στην προσωπικότητα {callout-τουτης} {name}?"
]

function reloadGenerate() {

    const studentName = pickedStudents[activeStudent].split(" ")[0]
    let generated = phrases[Math.floor(Math.random() * phrases.length)]
        .replace("{name}", studentName)
        .replace("{callout}", getGender(studentName) === "Male" ? "τον" : "την")
        .replace("{callout-τουτης}", getGender(studentName) === "Male" ? "του" : "της")
        .replace("{callout-οη}", getGender(studentName) === "Male" ? "ο" : "η");

    if (generated.includes(`τον ${studentName}`) || generated.includes(`την ${studentName}`)) {
        console.log("includes tontin");
        generated = generated.replace(studentName, fixNameCase(studentName));
    }
    dataIn[`${pickedStudents[activeStudent]}-question`] = generated
    document.getElementById("message").placeholder = `πχ: ` + generated
    console.log(generated)
}
let activeStudent = 0
function startYbRate(e, event) {
    activeStudent = 0
    if (pickedStudents.length === 0) { return; }

    event.preventDefault();
    event.stopPropagation();
    e.innerHTML = loadingHTML
    document.getElementById("yearbook-container").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("yearbook-container").style.display = 'none'
        document.getElementById("yearbook-screen-2").style.display = 'block'
        document.getElementById("yearbook-screen-2").style.opacity = '1'
        document.getElementById("count-picked").style.opacity = '0'
        $("#buttonStartCont").fadeOut("fast")
        setTimeout(function () {
            e.innerHTML = 'Συνέχεια'
        }, 800)
    }, 500)
    document.getElementById("currentName").innerText = pickedStudents[activeStudent]
    document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
    document.getElementById("currentPic").src = usersElems[pickedStudents[activeStudent]].info.foto
    reloadGenerate()

    //testPick()

    //yearbook-screen-2

}

function saveRatings() {
    const userData = JSON.parse(localStorage.getItem("jeanDarc_accountData"))
    fetch(`https://arc.evoxs.xyz/?metode=vleresimet&emri=${foundName || userData.name}&pin=${userData.pin}&parashtresat=${JSON.stringify(dataIn)}`) //base64Pin
        .then(response => response.text())
        .then(data => {
            if (data === 'Kontrolloni json!') {
                console.error("JSON error:", data, dataIn)
            } else {
                const res = JSON.parse(data)
                console.log("Success", res)
            }


        }).catch(error => {
            console.error("Jeanne D'arc Database is offline.")
            console.log('Error:', error);
        });
}
let dataIn = {}
function continueCurrent() {
    if (document.getElementById("message").value === '') { return; }
    console.log(pickedStudents.length, activeStudent)
    if (pickedStudents.length === activeStudent + 1) {
        dataIn[document.getElementById("currentName").innerText] = document.getElementById("message").value
        saveRatings()
        return;
    }
    activeStudent++
    dataIn[document.getElementById("currentName").innerText] = document.getElementById("message").value
    $("#centerContent-rate").fadeOut("fast", function () {
        document.getElementById("currentPic").src = 'reloading-pfp.gif'
        document.getElementById("message").value = ""
        document.getElementById("currentName").innerText = pickedStudents[activeStudent]
        document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
        document.getElementById("currentPic").src = usersElems[pickedStudents[activeStudent]].info.foto
        reloadGenerate()
        setTimeout(function () {
            $("#centerContent-rate").fadeIn("fast")
        }, 300)

    })
}

function skipCurrentRate() {
    if (pickedStudents.length === activeStudent + 1) {
        saveRatings()
        return;
    }
    activeStudent++
    $("#centerContent-rate").fadeOut("fast", function () {
        document.getElementById("currentPic").src = 'reloading-pfp.gif'
        document.getElementById("message").value = ""
        document.getElementById("currentName").innerText = pickedStudents[activeStudent]
        document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
        document.getElementById("currentPic").src = usersElems[pickedStudents[activeStudent]].info.foto
        reloadGenerate()
        setTimeout(function () {
            $("#centerContent-rate").fadeIn("fast")
        }, 300)

    })
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
                document.getElementById("instausername-SELF").innerText = socialUsername
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
function merrniEmrat() {
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
                <p>${info.emri}</p><span>${info.seksioni}${info.klasa !== 'none' ? "'"+info.klasa : ""}</span> <!--->
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
function showSocial() {
    merrniEmrat()
    document.getElementById("social").classList.add("active")

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
                document.getElementById("app").style.opacity = "1"
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
    document.getElementById("app").style.transform = "scale(0.97)"
    document.getElementById("app").style.opacity = "0.7"
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

function toggleDev() {
    const current = document.getElementById('devActions').style.display
    if (current === 'none') {
        document.getElementById('devActions').style.display = 'flex'
    } else {
        document.getElementById('devActions').style.display = 'none'
    }
}


function goBackToLogin() {
    $("#lock").fadeOut("fast", function () {
        //document.getElementById("accessButton").innerText = "Σύνδεση"
        input.value = ''
        mirrorText.textContent = '';
        input.style.width = null;
        $("#loginContainer").fadeIn("fast", function () {
        })
        //document.getElementById("evoxContainer").classList.add("active")
        document.getElementById("welcome").classList.remove("fade-out-slide-down")
    })

    deletePIN()
    deletePIN()
    deletePIN()
    deletePIN()
}

function getDeviceInfo() {
    const userAgent = navigator.userAgent;

    let deviceType = "Unknown";
    let model = "Unknown";
    let osVersion = "Unknown";

    // Detect device type
    if (/Mobile|iPhone|Android/.test(userAgent)) {
        deviceType = "Κινητή";
    } else if (/Tablet|iPad/.test(userAgent)) {
        deviceType = "Τάμπλετ";
    } else if (/Mac|Windows|Linux|X11/.test(userAgent)) {
        deviceType = "Υπολογιστής";
    }

    // Detect model (basic parsing)
    if (/iPhone/.test(userAgent)) {
        model = "iPhone";
    } else if (/iPad/.test(userAgent)) {
        model = "iPad";
    } else if (/Android/.test(userAgent)) {
        const androidMatch = userAgent.match(/Android\s([\d.]+)/);
        model = "Android Device";
        osVersion = androidMatch ? androidMatch[1] : osVersion;
    } else if (/Mac/.test(userAgent)) {
        model = "Mac";
    } else if (/Windows/.test(userAgent)) {
        model = "Windows PC";
    }

    // Detect OS version (basic parsing)
    if (/iPhone|iPad/.test(userAgent)) {
        const iosMatch = userAgent.match(/OS (\d+_\d+)/);
        osVersion = iosMatch ? iosMatch[1].replace("_", ".") : osVersion;
    } else if (/Windows/.test(userAgent)) {
        const windowsMatch = userAgent.match(/Windows NT (\d+\.\d+)/);
        osVersion = windowsMatch ? windowsMatch[1] : osVersion;
    } else if (/Mac/.test(userAgent)) {
        const macMatch = userAgent.match(/Mac OS X (\d+_\d+)/);
        osVersion = macMatch ? macMatch[1].replace("_", ".") : osVersion;
    }

    // Return as JSON object
    return {
        deviceType,
        model,
        osVersion,
    };
}


function showAppInfo() {
    const device = getDeviceInfo()
    document.getElementById("deviceInfo").innerHTML = `${device.deviceType} - ${device.model} - ${device.osVersion}`;
    document.getElementById("ipIdent").innerText = ip
    $("#welcome").fadeOut("fast", function () {
        document.getElementById("infoContainer").classList.add("active")
    })

}

function hideAppInfo() {
    document.getElementById("infoContainer").classList.remove("active")
    $("#welcome").fadeIn("fast")
}

let boxUpDefaultHeight;
function nameLogin() {
    document.getElementById("topLeftBack").classList.add("active")
    $("#appInfo").fadeOut("fast")
    $("#textDialog").fadeOut("fast", function () {
        const boxUp = document.getElementById("boxUp");
        const currentHeight = boxUp.offsetHeight + 'px';
        boxUpDefaultHeight = currentHeight
        boxUp.style.transition = 'height 1s'; // Adjust the duration as needed
        boxUp.style.height = currentHeight;
        setTimeout(() => {
            boxUp.style.height = '250px';
        }, 10);
        $('#boxUp').children().not('.loginByName').fadeOut(function () {
            $("#loginByName").fadeIn("fast")
        });

    })


}

function goBackToMain() {
    document.getElementById("topLeftBack").classList.remove("active")
    //
    if (boxUpDefaultHeight) {
        const boxUp = document.getElementById("boxUp");
        boxUp.style.transition = 'height 1s'; // Adjust the duration as needed

        setTimeout(() => {
            boxUp.style.height = boxUpDefaultHeight;
        }, 10);
        $("#loginByName").fadeOut("fast", function () {
            $('#boxUp').children().not('.loginByName').fadeIn(function () {
                $("#textDialog").fadeIn("fast", function () {
                    $("#appInfo").fadeIn("fast")

                })
            });
        })

    }
}
const input = document.getElementById('voxName');
const mirrorText = document.querySelector('.mirror-text');

function calculateTextWidth(text) {
    const span = document.createElement('span');
    span.style.fontSize = '16px';  // Set font size to 16px
    span.style.visibility = 'hidden'; // Hide the span element
    span.style.position = 'absolute'; // Position it off-screen
    span.textContent = text;

    document.body.appendChild(span); // Append span to the body to calculate width
    const width = span.offsetWidth;  // Get the width of the text
    document.body.removeChild(span); // Remove the span after calculation
    console.log(width)
    return width;
}

function removeTonos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

let previousWidth = null;
function searchByName() {
    const input = document.getElementById("voxName");
    const query = input.value;
    const firstMatch = findFirstMatch(query); // Assuming this function returns a valid match
    const mirrorText = document.querySelector('.mirror-text');
    const queryParts = query.split(" ");
    const firstName = queryParts[0];
    const lastName = queryParts[1] || "";  // In case the query only has the first name

    //input.style.width = 'auto';  // Reset width to calculate properly

    if (firstMatch) {
        const fullNameParts = firstMatch.split(" ");
        const matchFirstName = fullNameParts[0];
        const matchLastName = fullNameParts[1] || "";

        let remainingText = firstMatch;

        // Check if the first name part matches
        if (matchFirstName.toLowerCase().includes(firstName.toLowerCase()) && firstName.toLowerCase() !== matchFirstName.toLowerCase()) {
            if (!matchFirstName.includes(query)) {
                remainingText = ` ${matchFirstName.replace(query, '')}?`;  // If the typed first name is different from the match
            } else {
                remainingText = `${matchFirstName.replace(query, '')}?`;  // If the typed first name is different from the match
            }

        }
        // Check if the last name part matches
        else if (matchLastName.toLowerCase().includes(lastName.toLowerCase()) && lastName.toLowerCase() !== matchLastName.toLowerCase()) {
            if (!matchLastName.includes(query)) {
                remainingText = ` ${matchLastName.replace(query, '')}?`;
            } else {
                remainingText = `${matchLastName.replace(query, '')}?`;
            }
            // If the typed last name is different from the match
        }
        else {
            // Otherwise, remove the typed part (first or last name)
            if (firstMatch.toLowerCase().startsWith(firstName.toLowerCase())) {
                remainingText = firstMatch.replace(firstName, '').trim();  // Remove first name if typed first
            } else if (firstMatch.toLowerCase().endsWith(lastName.toLowerCase())) {
                remainingText = firstMatch.replace(lastName, '').trim();  // Remove last name if typed last
            }
        }

        mirrorText.textContent = remainingText;

        if (query.length <= 2) {
            input.style.width = previousWidth
            return;
        }
        previousWidth = input.style.width
        // Set input width based on mirrored text width, with padding and a max-width constraint
        input.style.width = `${calculateTextWidth(query) + 10}px`;

        // Apply a maximum width to prevent the input from becoming too large
        const maxWidth = 400;  // Adjust max-width as needed
        if (input.offsetWidth > maxWidth) {
            input.style.width = `${maxWidth}px`;
        }

    }

    // Handle empty input to set minimum width
    if (input.value.length < 1) {
        mirrorText.textContent = '';
        input.style.width = null;  // Set to minimum width to avoid disappearing input
    }
}

document.getElementById('voxName').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        searchByNameComplete()
    }
})

function searchByNameComplete() {
    const searchInput = document.getElementById('voxName').value.replace(/\s+/g, '');
    const matchedNames = findFullNames(searchInput);
    if (matchedNames.length === 1) {
        document.getElementById("welcome").classList.add("fade-out-slide-down")
        foundName = matchedNames[0]
        const karuseliCont = document.getElementById("karuseli")
        karuseliCont.style.display = 'none'
        document.getElementById("userPinPfp").style.display = null
        document.getElementById("nameForMultiple").style.display = 'none'
        getEvoxProfile(foundName).then(profileSrc => {
            document.getElementById('userPinPfp').src = profileSrc
        });
        document.getElementById("pinText").style.marginBottom = '25px'
        //document.getElementById("loadText").style.opacity = '0'
        //setTimeout(function () {
        document.getElementById("loadText").innerHTML = `Επιτυχία`
        document.getElementById("accessButton").innerHTML = `Επιτυχία`
        document.getElementById("loadText").style.opacity = '1'
        document.getElementById("evoxContainer").classList.remove("active")
        $("#hexa").fadeOut("fast")
        $("#tasks").fadeIn("fast", function () {
            //setTimeout(function () {
            //document.getElementById("loadText").style.opacity = '0'
            //setTimeout(function () { //
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
                            $("#hexa").fadeOut("fast")
                        })
                    })

                })
            }, 1000)
            //}, 340)
            //}, 900)
        })


        //}, 340)
    } else if (matchedNames.length > 1) {
        document.getElementById("pinText").style.marginBottom = null
        document.getElementById("welcome").classList.add("fade-out-slide-down")
        //document.getElementById("accessButton").innerHTML = `Επιτυχία`
        let count = 0
        const karuseliCont = document.getElementById("karuseli")
        karuseliCont.style.display = null
        document.getElementById("userPinPfp").style.display = 'none'
        karuseliCont.innerHTML = ''
        pickasCurrent(matchedNames[0])
        matchedNames.forEach(name => {
            count++
            const firstChar = (str) => str.split(' ')[1]?.charAt(0) || null;
            const ranId = Math.floor(Math.random() * 909999) + 1
            if (count === 1) {
                karuseliCont.innerHTML = `${karuseliCont.innerHTML}<img onclick="pickasCurrent('${name}')" class="fytyre zgjedhur" src="reloading-pfp.gif" alt="Fytyrë ${count}" id="${ranId}">`
            } else {
                karuseliCont.innerHTML = `${karuseliCont.innerHTML}<img onclick="pickasCurrent('${name}')" class="fytyre" src="reloading-pfp.gif" alt="Fytyrë ${count}" id="${ranId}">`
            }

            //document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
            //<div onclick="selectCustom('${name}')" class="socialUser"><img id="${ranId}" class="slUserPFP social"
            getEvoxProfile(name).then(profileSrc => {
                document.getElementById(ranId).src = profileSrc
            });

            if (count === matchedNames.length) {
                const karuseli = document.querySelectorAll('.fytyre');
                function positionImages() {
                    const zgjedhurIndex = Array.from(karuseli).findIndex(el => el.classList.contains('zgjedhur'));

                    karuseli.forEach((el, i) => {
                        const position = i - zgjedhurIndex; // Calculate relative position
                        el.style.transform = `translateX(${position * 70}px)`; // Adjust distance
                    });
                }

                // Initialize positions at load
                positionImages();

                // Add event listeners for clicks
                karuseli.forEach((fytyre, index) => {
                    fytyre.addEventListener('click', () => {
                        document.querySelector('.zgjedhur').classList.remove('zgjedhur');
                        fytyre.classList.add('zgjedhur');
                        positionImages(); // Recalculate positions
                    });
                });
            }
        });

        document.getElementById("loadText").innerHTML = `Η αυτόματη σύνδεση απέτυχε`
        setTimeout(function () {
            $("#hexa").fadeOut("fast")
            document.getElementById("evoxContainer").classList.remove("active")

            //$("#tasks").fadeIn("fast", function () {

            //document.getElementById("loadText").style.opacity = '1'


            //setTimeout(function () {
            //document.getElementById("loadText").style.opacity = '0'
            //    setTimeout(function () { //
            const a = matchedNames[0].split(' ')[0].replace(/[σς]+$/, '')
            const b = matchedNames[0].split(' ')[1].replace(/[σς]+$/, '')
            $("#tasks").fadeOut("fast", function () {
                document.getElementById("loadText").style.opacity = '0'
                document.getElementById("taskLoading").style.display = 'none'
                document.getElementById("tempLoader").style.display = 'flex'
                document.getElementById("loadText").innerHTML = `Επιλέξτε τον λογαριασμό σας`

                $("#tasks").fadeIn("fast", function () {
                    document.getElementById("loadText").style.opacity = '1'
                    setTimeout(function () {
                        document.getElementById("topImg").style.opacity = '0'
                        $("#tasks").fadeOut("fast", function () {
                            document.getElementById("tempLoader").style.display = 'none'
                            document.getElementById("taskLoading").style.display = null
                            $("#loginContainer").fadeOut("fast", function () {
                                document.getElementById("loginContainer").style.display = 'none'
                                $("#multimatch").fadeOut("fast", function () {
                                    document.getElementById("nameForMultiple").innerText = matchedNames[0]
                                    document.getElementById("nameForMultiple").style.display = 'flex'
                                    $("#lock").fadeIn("fast")
                                    $("#hexa").fadeOut("fast")
                                })
                            })

                        })
                    }, 1500)
                })
            })

            //    }, 340)
            //}, 900)
            //})



        }, 340)
    } else {
        alert("Δεν βρέθηκαν αντιστοιχίες")
    }
}


const doubleInput = document.getElementById('yb-input');
const mirrorTextYb = document.querySelector('.mirror-text.xy');


let previousWidthYb = null;
let spawnedSearches = []
function YbsearchByName() {
    const input = document.getElementById("yb-input");
    const query = input.value;
    const firstMatch = findFirstMatch(query); // Assuming this function returns a valid match
    const mirrorTextYb = document.querySelector('.mirror-text.xy');
    const queryParts = query.split(" ");
    const el = document.getElementById(`searchPeople`);

    const matchedNames = findFullNames(query);
    console.log("quer", query)
    el.innerHTML = ''
    //spawnedSearches = []
    matchedNames.forEach((part, index) => {
        console.log('matches', matchedNames);
        // Ensure that part exists in usersElems
        console.log(`Will search for usersElems['${part}']`, index)
        //if (usersElems[`'${part}'`]) {
        //console.log(document.getElementById(`searchPeople`).innerHTML, part, el.innerHTML.includes(part))
        console.log(spawnedSearches, part)
        if (!spawnedSearches.includes(part)) {
            //spawnedSearches.push(part)
            fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${part}`)
                .then(response => response.json())
                .then(info => {
                    el.innerHTML += `<div class="aStudent fade-in-slide-up">
                    <div class="studentImage">
                        <img src="${info.foto}">
                    </div>
                    <div class="studentInfo">
                        <p>${info.emri}</p>
                    </div>
                  </div>`;

                }).catch(error => {
                    el.innerHTML += `<div class="aStudent fade-in-slide-up">
                            <div class="studentImage">
                                <img src="snap.png">
                            </div>
                            <div class="studentInfo">
                                <p>${part}</p>
                            </div>
                          </div>`;
                });
        }
        //const inform = usersElems[part].info;


        //} else {
        //console.log(`No info found for ${part}`);
        //}
        setTimeout(function () {
            const div = document.getElementById('searchPeople');
            const seen = new Set();

            Array.from(div.children).forEach(child => {
                if (seen.has(child.textContent)) {
                    child.remove();
                } else {
                    seen.add(child.textContent);
                }
            });
        }, 200)

    });
    const firstName = queryParts[0];
    const lastName = queryParts[1] || "";  // In case the query only has the first name

    //input.style.width = 'auto';  // Reset width to calculate properly

    if (firstMatch) {
        const fullNameParts = firstMatch.split(" ");
        const matchFirstName = fullNameParts[0];
        const matchLastName = fullNameParts[1] || "";

        let remainingText = firstMatch;

        // Check if the first name part matches
        if (matchFirstName.toLowerCase().includes(firstName.toLowerCase()) && firstName.toLowerCase() !== matchFirstName.toLowerCase()) {
            if (!matchFirstName.includes(query)) {
                remainingText = ` ${matchFirstName.replace(query, '')}?`;  // If the typed first name is different from the match
            } else {
                remainingText = `${matchFirstName.replace(query, '')}?`;  // If the typed first name is different from the match
            }

        }
        // Check if the last name part matches
        else if (matchLastName.toLowerCase().includes(lastName.toLowerCase()) && lastName.toLowerCase() !== matchLastName.toLowerCase()) {
            if (!matchLastName.includes(query)) {
                remainingText = ` ${matchLastName.replace(query, '')}?`;
            } else {
                remainingText = `${matchLastName.replace(query, '')}?`;
            }
            // If the typed last name is different from the match
        }
        else {
            // Otherwise, remove the typed part (first or last name)
            if (firstMatch.toLowerCase().startsWith(firstName.toLowerCase())) {
                remainingText = firstMatch.replace(firstName, '').trim();  // Remove first name if typed first
            } else if (firstMatch.toLowerCase().endsWith(lastName.toLowerCase())) {
                remainingText = firstMatch.replace(lastName, '').trim();  // Remove last name if typed last
            }
        }

        mirrorTextYb.textContent = remainingText;

        if (query.length <= 2) {
            input.style.width = previousWidthYb
            return;
        }
        previousWidthYb = input.style.width
        // Set input width based on mirrored text width, with padding and a max-width constraint
        input.style.width = `${calculateTextWidth(query) + 10}px`;

        // Apply a maximum width to prevent the input from becoming too large
        const maxWidth = 400;  // Adjust max-width as needed
        if (input.offsetWidth > maxWidth) {
            input.style.width = `${maxWidth}px`;
        }

    }

    // Handle empty input to set minimum width
    if (input.value.length < 1) {
        mirrorTextYb.textContent = '';
        input.style.width = null;  // Set to minimum width to avoid disappearing input
        $("#searchPeople").fadeOut("fast", function () {
            $("#spawnPeople").fadeIn('fast')
        })
    } else {
        $("#spawnPeople").fadeOut("fast", function () {
            $("#searchPeople").fadeIn('fast')
        })
    }

}

document.getElementById('yb-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        //searchByNameComplete()
    }
})

function testPick() {
    let matchedNames = ["Λιλάντα Αδαμίδη", "Γιάννης Καπράλος"]
    let count = 0
    const karuseliCont = document.getElementById("karuseli-2")
    karuseliCont.style.display = null
    document.getElementById("userPinPfp").style.display = 'none'
    karuseliCont.innerHTML = ''
    matchedNames.forEach(name => {
        count++
        const firstChar = (str) => str.split(' ')[1]?.charAt(0) || null;
        const ranId = Math.floor(Math.random() * 909999) + 1
        if (count === 1) {
            karuseliCont.innerHTML = `${karuseliCont.innerHTML}<img onclick="pickName('${name}', '${ranId}')" class="fytyre zgjedhur" src="reloading-pfp.gif" alt="Fytyrë ${count}" id="${ranId}">`
        } else {
            karuseliCont.innerHTML = `${karuseliCont.innerHTML}<img onclick="pickName('${name}', '${ranId}')" class="fytyre" src="reloading-pfp.gif" alt="Fytyrë ${count}" id="${ranId}">`
        }

        //document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
        //<div onclick="selectCustom('${name}')" class="socialUser"><img id="${ranId}" class="slUserPFP social"
        getEvoxProfile(name).then(profileSrc => {
            document.getElementById(ranId).src = profileSrc
        });

        if (count === matchedNames.length) {
            const karuseli = document.querySelectorAll('.fytyre');
            function positionImages() {
                const zgjedhurIndex = Array.from(karuseli).findIndex(el => el.classList.contains('zgjedhur'));

                karuseli.forEach((el, i) => {
                    const position = i - zgjedhurIndex; // Calculate relative position
                    el.style.transform = `translateX(${position * 70}px)`; // Adjust distance
                });
            }

            // Initialize positions at load
            positionImages();

            // Add event listeners for clicks
            karuseli.forEach((fytyre, index) => {
                fytyre.addEventListener('click', () => {
                    document.querySelector('.zgjedhur').classList.remove('zgjedhur');
                    fytyre.classList.add('zgjedhur');
                    positionImages(); // Recalculate positions
                });
            });
        }
    });
    document.querySelectorAll("#karuseli-2 img")[0].click();

}

function pickName(name, id) {
    document.getElementById("selected-st").innerText = name

}

function changePfp() {
    document.getElementById('upload-box').click();    
}

function handleFileSelect() {
    const toPin = localStorage.getItem("jeanDarc_accountData")
    if(toPin) {
        const pars = JSON.parse(toPin)
        const input = document.getElementById('upload-box');
        const file = input.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64String = e.target.result;
                // Now you have the base64 representation of the selected image
                //console.log(base64String);
                document.getElementById("darc-user-self-profile").src = "./reloading-pfp.gif"
                fetch(`https://data.evoxs.xyz/profiles`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: pars.name,
                        pin: atob(pars.pin),
                        jd: true,
                        pfp: base64String
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data);
                        if (data === "done [JEANBRIDGE]") {
                            document.getElementById("instagramedProfile").style.display = 'none'
                            document.getElementById("darc-user-self-profile").src = base64String
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });
            };
            reader.readAsDataURL(file);
        }

        // Reset the input value to allow selecting the same file again
        input.value = '';
    } else {
        alert("Δεν έχετε συνδεθεί")
    }
}