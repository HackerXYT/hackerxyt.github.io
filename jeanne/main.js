

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

function cardProgress() {
    fetch('https://arc.evoxs.xyz/?metode=progresin')
        .then(response => response.json())
        .then(progress_global => {
            const progress = progress_global.global
            const percentage = Number.parseInt(100 * progress.have_participated / progress.total_users)
            document.getElementById("yb-prog").style.width = percentage + "%"

        }).catch(error => {
            console.log('Error:', error);
        });
}


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
    if (foundName && foundName !== checkChange && localStorage.getItem("jeanDarc_accountData") && !hasLoginFailed) {
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
                        document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${transformGreekName(matchedNames[0], 0)} ${transformGreekName(matchedNames[0], 1)}`
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
                                    document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${transformGreekName(matchedNames[0], 0)} ${transformGreekName(matchedNames[0], 1)}`
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
                if (foundName) {
                    getEvoxProfile(foundName).then(profileSrc => {
                        document.getElementById('userPinPfp').src = profileSrc
                    });
                }

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
                                document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${transformGreekName(matchedNames[0], 0)} ${transformGreekName(matchedNames[0], 1)}`
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

    for (const [fullName, nameVariations] of Object.entries(namesData.names)) {
        const normalizedInput = input.toLowerCase().replace(/\s+/g, '');
        const normalizedFullName = fullName.toLowerCase().replace(/\s+/g, '');

        // Check for direct match with full name
        if (normalizedFullName === normalizedInput) {
            results.push(fullName);
            continue;
        }

        // Check if input matches any variation (case insensitive)
        if (nameVariations.some(variation => variation.toLowerCase() === normalizedInput)) {
            results.push(fullName);
            continue;
        }

        // Check if input is part of name variations (substring match)
        if (nameVariations.some(variation => variation.toLowerCase().includes(normalizedInput))) {
            if (input.length > 2) {
                results.push(fullName);
            }
        }

        // Check if input is part of the full name (substring match)
        if (fullName.toLowerCase().includes(input.toLowerCase()) && input.length > 2) {
            results.push(fullName);
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
function hideElementOnAndroid(elementId) {
    if (navigator.userAgent.toLowerCase().includes('android')) {
        const element = document.getElementById(elementId);
        if (element) {
            element.style.display = 'none';
        }
    }
}

function connectWithIp() {
    if (ipLog) {
        document.getElementById("loadText").innerText = 'Επεξεργασία..'
        $("#tasks").fadeIn("fast")
        goBackToMain()
        setTimeout(function () {
            nameLogin()
            document.getElementById("voxName").value = ipLog

            setTimeout(function () {
                searchByNameComplete()
            }, 600)
        }, 600)

    }
}

let ipLog;

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
    hideElementOnAndroid('gradColored');
    hideElementOnAndroid('bgGrd');
    if (window.innerWidth > 768 && !localStorage.getItem("devBypass")) {
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

                            try {
                                if (names.matchedAccounts) {
                                    if (names.matchedAccounts.length > 0) {
                                        //runIdentifier
                                        ipLog = names.matchedAccounts[0]
                                        getEvoxProfile(names.matchedAccounts[0]).then(profileSrc => {
                                            document.getElementById('matchedPfp').src = profileSrc
                                        });
                                        document.getElementById("longAgo").innerText = timeAgo(names.ZeroLastLogin)
                                        document.getElementById("nameIp").innerText = names.matchedAccounts[0]

                                        $("#appInfo").fadeOut("fast")
                                        $("#textDialog").fadeOut("fast", function () {
                                            const boxUp = document.getElementById("boxUp");
                                            const currentHeight = boxUp.offsetHeight + 'px';
                                            boxUpDefaultHeight = currentHeight
                                            boxUp.style.transition = 'height 1s';
                                            boxUp.style.height = currentHeight;
                                            setTimeout(() => {
                                                boxUp.style.height = '300px';
                                            }, 10);
                                            $('#boxUp').children().not('#helpMe, .loginByName').fadeOut(function () {
                                                $("#loginByIp").fadeIn("fast")
                                            });

                                        })
                                    }
                                }
                            } catch (error) {
                                console.error("Ip Login Failed")
                            }

                        }).catch(error => {
                            console.error("Jeanne D'arc Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                            $("#tasks").fadeIn("fast")
                            $("#hexa").fadeOut("fast")
                            document.getElementById("typewriter").style.display = 'none'
                            document.getElementById("spinnerApple").style.display = null
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
                            } else if (status === 'Denied') {
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
                            } else {
                                console.warn("Server Responded With Failure!", status)
                                proccessingPIN = false
                                $("#PINload").fadeOut("fast", function () {
                                    document.body.style.touchAction = '';
                                    $("#lock").fadeOut("fast", function () {
                                        document.getElementById("loadText").innerHTML = `Διόρθωση σφαλμάτων..`
                                        $("#tasks").fadeIn("fast")
                                        $("#hexa").fadeOut("fast")
                                        setTimeout(function () {
                                            localStorage.clear()
                                            sessionStorage.clear()
                                            setTimeout(function () {
                                                window.location.reload()
                                            }, 500)
                                        }, 2000)
                                    })
                                })
                            }
                        }).catch(error => {
                            console.error("Jeanne D'arc Database is offline.")
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                            $("#tasks").fadeIn("fast")
                            $("#hexa").fadeOut("fast")
                            document.getElementById("typewriter").style.display = 'none'
                            document.getElementById("spinnerApple").style.display = null
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
                            document.getElementById("typewriter").style.display = 'none'
                            document.getElementById("spinnerApple").style.display = null
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
                                document.getElementById("typewriter").style.display = 'none'
                                document.getElementById("spinnerApple").style.display = null
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

function reloadProgress() {
    const val = localStorage.getItem("jeanDarc_accountData")
    if (val) {
        const json = JSON.parse(val)
        const process = atob(json.pin)
        fetch(`https://arc.evoxs.xyz/?metode=getProgress&emri=${foundName}&pin=${process}`)
            .then(response => response.json())
            .then(complete => {
                const progress = complete.progress
                document.getElementById("title-progress").innerHTML = complete.title
                document.getElementById("desc-progress").innerHTML = complete.desc
                console.log("Progress Success!")
                document.getElementById("percentage").innerText = progress
                document.getElementById("progress-ring").style = `--progress: ${progress.replace("%", "")};`
            }).catch(error => {
                console.error("Progress error", error)
            });
    }

}
let retryInt;
let hasLoginFailed = false;
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
            //if (foundName.includes("παποστόλ") || foundName.includes("Λιλάντα") || foundName.includes("Γερακιανάκη")) {
            //    document.getElementById("admin-preview").style.display = null
            //}
            //const color = getGender(foundName.split(" ")[0]) === "Male" ? "#298ef2" : "Female"
            if (getGender(removeTonos(foundName.split(" ")[0])) === "Female") {
                document.documentElement.style.setProperty('--color-theme', '#ae6cff');
                document.documentElement.style.setProperty('--color-theme-light', '#bf8bff');
                document.documentElement.style.setProperty('--color-theme-select', '#ae6cff55');

            }
            const process = atob(json.pin)
            fetch(`https://arc.evoxs.xyz/?metode=getProgress&emri=${foundName}&pin=${process}`)
                .then(response => response.json())
                .then(complete => {
                    const progress = complete.progress
                    document.getElementById("title-progress").innerHTML = complete.title
                    document.getElementById("desc-progress").innerHTML = complete.desc
                    console.log("Progress Success!", complete)
                    document.getElementById("percentage").innerText = progress
                    document.getElementById("progress-ring").style = `--progress: ${progress.replace("%", "")};`
                }).catch(error => {
                    console.error("Progress error", error)
                });
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
                        hasLoginFailed = true
                        document.getElementById("topImg").style.opacity = '0'
                        //$("#tasks").fadeOut("fast", function () {
                        $("#loginContainer").fadeOut("fast", function () {
                            document.getElementById("loginContainer").style.display = 'none'
                            $("#multimatch").fadeOut("fast", function () {
                                $("#lock").fadeIn("fast")
                            })
                        })
                        document.getElementById("nameForMultiple").innerText = foundName
                        document.getElementById("nameForMultiple").style.display = 'flex'
                        getEvoxProfile(foundName).then(profileSrc => {
                            document.getElementById('userPinPfp').style.display = ''
                            if (profileSrc.includes("Kodi i gabimit:")) {
                                document.getElementById('userPinPfp').src = "snap.png"
                                document.getElementById("nameForMultiple").innerText += '?'
                            } else {
                                document.getElementById('userPinPfp').src = profileSrc
                            }

                        });
                        //})
                    }

                }).catch(error => {
                    console.error("Jeanne D'arc Database is offline.")
                    document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Γίνεται επανασύνδεση..`
                    $("#tasks").fadeIn("fast")
                    $("#hexa").fadeOut("fast")
                    document.getElementById("typewriter").style.display = 'none'
                    document.getElementById("spinnerApple").style.display = null
                    //alert("a")
                    retryInt = setInterval(function () {
                        fetch(`https://arc.evoxs.xyz/?metode=pin&pin=${process}&emri=${foundName}`)
                            .then(response => response.text())
                            .then(status => {
                                clearInterval(retryInt)
                                autoLogin()
                                document.getElementById("typewriter").style.display = null
                                document.getElementById("spinnerApple").style.display = 'none'
                            }).catch(error => {
                                console.log("Still Offline")
                            })
                        //autoLogin()
                    }, 1000)
                    console.log('Error:', error);
                });
            fetch(`https://arc.evoxs.xyz/?metode=warns&pin=${btoa(process)}&emri=${foundName}`)
                .then(response => response.json())
                .then(notice => {
                    if (notice.id !== '-1') {
                        noticeFront(notice)
                    }
                }).catch(error => {
                    console.error("Offline?")
                })
            cardProgress()

        })
        if (foundName) {
            getEvoxProfile(foundName).then(profileSrc => {
                document.getElementById('userPinPfp').src = profileSrc
            });
        }

        //})

        //if (localStorage.getItem("jeanneBackup")) {
        //    const backup = JSON.parse(localStorage.getItem("jeanneBackup"))
        //    dataIn = backup
        //    saveRatings()
        //    localStorage.removeItem("jeanneBackup")
        //}



    } else {
        console.error("AutoLogin Failed")
    }
}

function transformGreekName(name, num) {
    const firstName = name.split(' ')[num].replace(/[σς]+$/, ''); // Remove trailing σ/ς

    let transformedName = firstName;

    if (firstName.endsWith("ος")) {
        transformedName = firstName.slice(0, -2) + "ε";
    } else if (firstName.endsWith("ης")) {
        transformedName = firstName.slice(0, -2) + "η";
    } else if (firstName.endsWith("ας")) {
        transformedName = firstName.slice(0, -2) + "α";
    } else if (firstName.endsWith("ες")) {
        transformedName = firstName.slice(0, -2) + "ε";
    }

    return transformedName;
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

            document.getElementById("emri").innerText = `${transformGreekName(foundName, 0)}`
        } else {
            document.getElementById("emri").innerText = `${transformGreekName(foundName, 0)} ${transformGreekName(foundName, 1)}`
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

function changePinRedo() {

    document.getElementById("profilePage").classList.remove("active")
    changePin()
}

let pinAction = null;
function changePin(e, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    getEvoxProfile(foundName).then(profileSrc => {
        document.getElementById('userPinPfp').src = profileSrc
    });
    if (e) {
        e.innerHTML = loadingHTML
    }

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
    let img = 'no'
    if (e) {
        img = e.querySelector('img')
        img.style.transform = "scale(0.9)"
        openProfile(document.getElementById("profile-switch"))
    }




    setTimeout(function () {
        if (img !== 'no') {
            img.style.transform = ""
        }

        document.getElementById("darc-user-self-profile").src = 'reloading-pfp.gif'
        getEvoxProfile(foundName).then(profileSrc => {
            if (profileSrc.includes("data.evoxs.xyz")) { document.getElementById("instagramedProfile").style.display = 'none' } else { document.getElementById("instagramedProfile").style.display = null }
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
                    <span id="seksioni">${seksioniData.seksioni}${seksioniData.klasa !== "none" ? seksioniData.klasa : ""}</span>
                </div>`
                        tagsData.forEach(tag => {
                            document.getElementById("tags").innerHTML = `${document.getElementById("tags").innerHTML}<div class="anInfo">
                    ${tag === "Evox" ? `<img src="../oasaResign/evox-logo-dark.png" width="17.5px" height="17.5px">` : "🏛️"}
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
        //if (img !== 'no') {
        //    document.getElementById("profilePage").classList.add("active")
        //}
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
let marresit = [];
let marresit_more;
let marresi_fix = {}
function activateYearbook() {
    allUsers = {}
    classes = {}
    usersElems = {}
    marresit_more = []
    marresi_fix = {}
    $("#app").fadeOut("fast", function () {
        document.getElementById("loadText").innerHTML = 'Φόρτωση..'
        $("#tasks").fadeIn("fast", function () {
            fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
                .then(response => response.json())
                .then(names => {
                    namesData = names
                    const fullNames = Object.keys(names.names);
                    document.getElementById("spawnPeople").innerHTML = `<div id="temp-name-loader" class="loading-spinner fade-in-slide-up"></div>`;
                    let selfClass = null
                    let waitMore = false
                    const fetchPromises = fullNames.map(name => {
                        return fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${name}`)
                            .then(response => response.json())
                            .then(info => {
                                if (info.emri !== foundName) {
                                    allUsers[info.emri] = info;
                                } else {
                                    selfClass = `${info.seksioni}${info.klasa}`
                                }
                                if (info.has_participated && info.has_participated === 'true') {
                                    waitMore = true
                                }

                            })
                            .catch(error => {
                                console.error("Jeanne D'arc Database is offline.");
                                console.log('Error:', error);
                            });
                    });

                    Promise.all(fetchPromises)
                        .then(() => {
                            document.getElementById("temp-name-loader").style.display = 'none'
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
                                if (!document.getElementById("spawnPeople").innerText.includes(key) && key !== "ΚΑΘnone") {
                                    const toFind = key.match(/[Α-Ω]+|\d+/g);
                                    document.getElementById("spawnPeople").innerHTML += `<div class="spawnPeople" id="${key}-cont">
                                    <p style="text-align: left">${toFind[0]}${toFind[1] ? "'" + toFind[1] : ""}</p></div>` //${key.includes("ΚΑΘ") ? " style='display: none'" : ""}
                                }
                                console.log(key, aclass)




                                // key -> class, user -> data
                                if (key === selfClass && key !== "ΚΑΘnone") {

                                    document.getElementById(`${key}-cont`).classList.add("upup")
                                    document.getElementById(`${key}-cont`).innerText = 'Στην τάξη σου'
                                    //classes[`${user.seksioni}${user.klasa}`].push(user);
                                } else if (selfClass === "ΚΑΘnone" && !document.getElementById("spawnPeople").innerHTML.includes(`<p>⚠️ Προσοχή!`)) {
                                    document.getElementById("spawnPeople").innerHTML = `<p>⚠️ Προσοχή!<br>Οι χρήστες της τάξης σας είναι κρυμμένοι.</p>${document.getElementById("spawnPeople").innerHTML}`
                                }

                                Object.entries(aclass).forEach(([nameEach, inform]) => {
                                    if (inform.emri === foundName || key === "ΚΑΘnone") { return; }
                                    const ranId = Math.floor(Math.random() * 909999) + 1;
                                    usersElems[inform.emri] = { ranId: ranId, info: inform };

                                    document.getElementById(`${key}-cont`).innerHTML += `
    <div id="user-${ranId}" class="aStudent fade-in-slide-up" onclick="pickStudent('${inform.emri}', this)">
        <div class="studentImage">
            <img alt="Αποτυχία" src="user.gif">
        </div>
        <div class="studentInfo">
            <p>${inform.emri}</p>
        </div>
    </div>`;

                                    const tempImage = new Image();
                                    tempImage.src = inform.foto + '?size=minimum';

                                    console.log('Attempting to load:', tempImage.src);

                                    tempImage.onload = () => {
                                        console.log('Image loaded');
                                        const imgElement = document.getElementById(`user-${ranId}`).querySelector('.studentImage img');
                                        console.log(tempImage.src)
                                        imgElement.src = tempImage.src;
                                        imgElement.style.visibility = 'visible'; // Make the image visible after it's loaded
                                    };

                                    tempImage.onerror = () => {
                                        console.log('Image load failed');
                                        const imgElement = document.getElementById(`user-${ranId}`).querySelector('.studentImage img');
                                        imgElement.src = 'snap.png';
                                        imgElement.style.visibility = 'visible'; // Make the image visible even if it failed to load
                                    };

                                })




                                // Load actual image


                                function readyToShow() {
                                    $("#tasks").fadeOut("fast", function () {
                                        document.getElementById("yearbook-container").style.display = 'block'
                                        document.getElementById("yearbook-container").style.opacity = '1'
                                    })
                                }
                                if (waitMore === false) {
                                    readyToShow()
                                } else {
                                    const account_data = localStorage.getItem("jeanDarc_accountData")
                                    if (!account_data) {
                                        console.error("Llogaria nuk eshte ruajtur ne nivel lokal!?")
                                        readyToShow()
                                        return;
                                    }
                                    const pars = JSON.parse(account_data)
                                    fetch(`https://arc.evoxs.xyz/?metode=userSent&pin=${pars.pin}&emri=${pars.name}`)
                                        .then(response => response.json())
                                        .then(sent => {
                                            console.log(marresit_more)
                                            marresit_more = sent;
                                            const processNames = (sent) => {
                                                return new Promise((resolve) => {
                                                    marresit = []
                                                    sent.forEach(name => {
                                                        marresit.push(name.marresi);
                                                    });
                                                    resolve(marresit);
                                                });
                                            };

                                            processNames(sent).then(result => {
                                                console.log(result);

                                                result.forEach(name_el => {
                                                    try {
                                                        console.log(name_el)
                                                        const workOn = usersElems[name_el].ranId
                                                        document.getElementById(`user-${workOn}`).classList.add("seen")
                                                        //document.getElementById(`user-${workOn}`).classList.add("goupup")
                                                        document.getElementById(`user-${workOn}`).setAttribute("evox-c", "require-resee")
                                                    } catch (error) {
                                                        if (!document.getElementById("error-cont")) {
                                                            document.getElementById("spawnPeople").innerHTML += `<div class="spawnPeople upup2" id="error-cont">Σφάλματα που βρέθηκαν</div>`
                                                        }
                                                        Object.entries(marresit_more).forEach(([key, value]) => {
                                                            console.log("Out:", key, name_el, value)
                                                            if (value.marresi === name_el && !document.getElementById("error-cont").innerHTML.includes(`user-${name_el.replace(' ', '_')}`)) {
                                                                console.log("Inside:", value)
                                                                marresi_fix[name_el] = value
                                                                document.getElementById("error-cont").innerHTML += `<div id="user-${name_el.replace(' ', '_')}" class="aStudent fade-in-slide-up seen" onclick="pickStudent('${name_el}', this, 'maressi')" evox-c="require-resee">
                                                                <div class="studentImage">
                                                                    <img alt="Αποτυχία" src="snap.png" style="visibility: visible;">
                                                                </div>
                                                                <div class="studentInfo">
                                                                    <p>${name_el}</p>
                                                                </div>
                                                            </div>`
                                                            } else {
                                                                console.log("Already inside")
                                                            }
                                                        })



                                                        //document.getElementById("spawnPeople").innerHTML = `${document.getElementById("spawnPeople").innerHTML}`
                                                        //alert(`Βρέθηκε σφάλμα κατά την επεξεργασία των δεδομένων του χρήστη: ${name_el}\nΕπικοινωνήστε άμεσα με τους διαχειρηστές.`)

                                                    }

                                                })

                                            });
                                            readyToShow()

                                        })
                                        .catch(error => {
                                            console.error("Jeanne D'arc Database is offline.");
                                            console.log('Error:', error);
                                        });
                                }



                            });
                        });




                }).catch(error => {
                    console.error("Jeanne D'arc Database is offline.")
                    console.log('Error:', error);
                    document.getElementById("loadText").innerHTML = 'Αποτυχία.'
                    document.getElementById("yearbook-container").style.display = 'block'
                    document.getElementById("yearbook-container").style.opacity = '1'
                    goBackFromBook()
                    setTimeout(function () {
                        $("#tasks").fadeOut("fast")
                    }, 1000)
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

function addFromSearch(emri, el) {
    if (!pickedStudents.includes(emri)) {
        const id = usersElems[emri].ranId
        console.log("user id", id)
        el.classList.add("picked")
        pickStudent(emri, document.getElementById(`user-${id}`))
    } else {
        el.classList.remove("picked")
        pickedStudents = pickedStudents.filter(student => student !== emri);
        document.getElementById("count-picked").innerHTML = pickedStudents.length
        if (pickedStudents.length > 0) {
            document.getElementById("count-picked").style.opacity = '1'
            $("#buttonStartCont").fadeIn("fast")
        } else {
            document.getElementById("count-picked").style.opacity = '0'
            $("#buttonStartCont").fadeOut("fast")
        }
    }
}

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
    "Τι σου αρέσει πιο πολύ στην προσωπικότητα {callout-τουτης} {name}?",
    "Πώς έχεις βοηθήσει εσύ {callout} {name} να εξελιχθεί ή να μάθει κάτι νέο?", //New
    "Ποιες προσωπικές αξίες πιστεύεις ότι έχει {callout-οη} {name}?",
    "Πώς σου φαίνεται ο τρόπος που επικοινωνεί {callout-οη} {name} με τους άλλους στην τάξη?"
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
    document.getElementById("message").placeholder = generated
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
    try {
        document.getElementById("currentName").innerText = pickedStudents[activeStudent]
        document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
        document.getElementById("currentPic").src = usersElems[pickedStudents[activeStudent]].info.foto
        document.getElementById("message").value = ''
        reloadGenerate()
        if (marresit && marresit.includes(pickedStudents[activeStudent]) && marresit_more) {
            const searchValue = pickedStudents[activeStudent];
            const result = marresit_more.find(item => item.marresi === searchValue);
            if (result) {
                document.getElementById("message").value = result.contents.vleresim
            }
        }
        document.getElementById("contCurre").style.display = null;
        document.getElementById("noError").style.display = null
        document.getElementById("unicode_error").style.display = 'none'
    } catch (error) {
        //Marresi
        document.getElementById("contCurre").style.display = 'none'
        console.warn("Error:", error);
        document.getElementById("currentName").innerText = marresi_fix[pickedStudents[activeStudent]].marresi
        document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
        document.getElementById("currentPic").src = 'snap.png'//pickedStudents[pickedStudents[activeStudent]].info.foto
        document.getElementById("message").value = marresi_fix[pickedStudents[activeStudent]].contents.vleresim
        reloadGenerate()
        document.getElementById("noError").style.display = 'none'
        document.getElementById("unicode_error").style.display = null
    }


    //testPick()

    //yearbook-screen-2

}

document.getElementById("message").addEventListener("input", function (event) {
    let invalidChars = /["\\]/g; // Double quotes (") and backslashes (\)
    let textarea = event.target;
    let originalText = textarea.value;
    let cleanedText = originalText.replace(invalidChars, '');

    textarea.value = cleanedText;
});

function saveRatings() {
    $("#yearbook-screen-2").fadeOut("fast", function () {
        document.getElementById("loadText").innerText = 'Αποθήκευση αλλαγών..';
        $("#tasks").fadeIn("fast");

        const userData = JSON.parse(localStorage.getItem("jeanDarc_accountData"));
        const payload = {
            metode: "vleresimet",
            emri: foundName || userData.name,
            pin: userData.pin,
            parashtresat: JSON.stringify(dataIn),
        };

        fetch("https://arc.evoxs.xyz/saveRatings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(response => response.text())
            .then(data => {
                if (data === "Kontrolloni json!") {
                    console.error("JSON error:", data, dataIn);
                } else {
                    const res = JSON.parse(data);
                    console.log("Success", res);
                    $("#tasks").fadeOut("fast", function () {
                        document.getElementById("loadText").innerText = 'Οι αλλαγές σας αποθηκεύτηκαν!';
                        $("#tasks").fadeIn("fast");
                        setTimeout(() => {
                            setTimeout(() => {
                                goBackFromBook();
                                document.getElementById("yearbook-container").style.display = 'none';
                                document.getElementById("yearbook-screen-2").style.display = 'none';
                                document.getElementById("yearbook-screen-2").style.opacity = '0';
                                setTimeout(() => {
                                    reloadProgress();
                                    $("#tasks").fadeOut("fast");
                                }, 200);
                            }, 200);
                        }, 2000);
                    });
                }
            })
            .catch(error => {
                localStorage.setItem("jeanneBackup", JSON.stringify(dataIn));
                if (!hasLoginFailed) {
                    alert("Αποτυχία Σύνδεσης Με Τον Διακομιστή. Οι καταχωρήσεις σας αποθηκεύτηκαν στην συσκευή σας. Δοκιμάστε αργότερα");
                }
                $("#tasks").fadeOut("fast", function () {
                    document.getElementById("loadText").innerHTML = `Τα τοπικά δεδομένα είναι έτοιμα.<br>Ξανασυνδεθείτε αργότερα.`;
                    $("#tasks").fadeIn("fast");
                    setTimeout(() => {
                        setTimeout(() => {
                            goBackFromBook();
                            document.getElementById("yearbook-container").style.display = 'none';
                            document.getElementById("yearbook-screen-2").style.display = 'none';
                            document.getElementById("yearbook-screen-2").style.opacity = '0';
                            setTimeout(() => {
                                reloadProgress();
                                $("#tasks").fadeOut("fast");
                            }, 200);
                        }, 200);
                    }, 5000);
                });
                console.error("Jeanne D'arc Database is offline.");
                console.log("Error:", error);
            });
    });
}

function saveRatingsOld() {
    $("#yearbook-screen-2").fadeOut("fast", function () {
        document.getElementById("loadText").innerText = 'Αποθήκευση αλλαγών..'
        $("#tasks").fadeIn("fast")

        const userData = JSON.parse(localStorage.getItem("jeanDarc_accountData"))
        fetch(`https://arc.evoxs.xyz/?metode=vleresimet&emri=${foundName || userData.name}&pin=${userData.pin}&parashtresat=${JSON.stringify(dataIn)}`) //base64Pin
            .then(response => response.text())
            .then(data => {
                if (data === 'Kontrolloni json!') {
                    console.error("JSON error:", data, dataIn)
                } else {
                    const res = JSON.parse(data)
                    console.log("Success", res)
                    $("#tasks").fadeOut("fast", function () {
                        document.getElementById("loadText").innerText = 'Οι αλλαγές σας αποθηκεύτηκαν!'
                        $("#tasks").fadeIn("fast")
                        setTimeout(function () {
                            setTimeout(function () {
                                goBackFromBook()

                                document.getElementById("yearbook-container").style.display = 'none'
                                document.getElementById("yearbook-screen-2").style.display = 'none'
                                document.getElementById("yearbook-screen-2").style.opacity = '0'
                                setTimeout(function () {
                                    reloadProgress()
                                    $("#tasks").fadeOut("fast")
                                }, 200)
                            }, 200)

                        }, 2000)
                    })


                }


            }).catch(error => {
                localStorage.setItem("jeanneBackup", JSON.stringify(dataIn))
                alert("Αποτυχία Σύνδεσης Με Τον Διακομιστή. Οι καταχωρήσεις σας αποθηκεύτηκαν στην συσκευή σας. Δοκιμάστε αργότερα")
                console.error("Jeanne D'arc Database is offline.")
                console.log('Error:', error);
            });
    })
}
let dataIn = {}
function continueCurrent() {
    if (document.getElementById("message").value === '') { return; }
    console.log(pickedStudents.length, activeStudent)
    try {
        if (pickedStudents.length === activeStudent + 1) {
            dataIn[document.getElementById("currentName").innerText] = document.getElementById("message").value
            saveRatings()
            return;
        }
        activeStudent++
        dataIn[document.getElementById("currentName").innerText] = document.getElementById("message").value
        $("#centerContent-rate").fadeOut("fast", function () {
            try {
                document.getElementById("currentPic").src = 'reloading-pfp.gif'
                document.getElementById("message").value = ""
                document.getElementById("currentName").innerText = pickedStudents[activeStudent]
                document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`

                const studentKey = pickedStudents[activeStudent];
                if (!usersElems[studentKey]) {
                    console.warn(`User data not found for: ${studentKey}`);
                    document.getElementById("currentPic").src = 'snap.png';
                    document.getElementById("contCurre").style.display = 'none'
                    document.getElementById("currentName").innerText = marresi_fix[pickedStudents[activeStudent]].marresi
                    document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
                    document.getElementById("currentPic").src = 'snap.png'//pickedStudents[pickedStudents[activeStudent]].info.foto
                    document.getElementById("message").value = marresi_fix[pickedStudents[activeStudent]].contents.vleresim
                    reloadGenerate()
                    setTimeout(function () {
                        $("#centerContent-rate").fadeIn("fast")
                    }, 300)
                    document.getElementById("noError").style.display = 'none'
                    document.getElementById("unicode_error").style.display = null;
                    return;
                }

                document.getElementById("noError").style.display = null
                document.getElementById("unicode_error").style.display = 'none'

                document.getElementById("currentPic").src = usersElems[studentKey].info.foto
                reloadGenerate()
                setTimeout(function () {
                    $("#centerContent-rate").fadeIn("fast")
                }, 300)

                if (marresit && marresit.includes(studentKey) && marresit_more) {
                    const result = marresit_more.find(item => item.marresi === studentKey);
                    if (result) {
                        document.getElementById("message").value = result.contents.vleresim;
                    }
                }
                document.getElementById("contCurre").style.display = null;
            } catch (error) {
                console.warn("Caught error inside fadeOut callback:", error);
            }
        });
    } catch (error) {
        //Marresi
        $("#centerContent-rate").fadeOut("fast", function () {
            document.getElementById("contCurre").style.display = 'none'
            console.warn("Error:", error);
            document.getElementById("currentName").innerText = marresi_fix[pickedStudents[activeStudent]].marresi
            document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
            document.getElementById("currentPic").src = 'snap.png'//pickedStudents[pickedStudents[activeStudent]].info.foto
            document.getElementById("message").value = marresi_fix[pickedStudents[activeStudent]].contents.vleresim
            reloadGenerate()
            setTimeout(function () {
                $("#centerContent-rate").fadeIn("fast")
            }, 300)
        })
        document.getElementById("noError").style.display = 'none'
        document.getElementById("unicode_error").style.display = null
    }
}

function skipCurrentRate() {
    if (pickedStudents.length === activeStudent + 1) {
        saveRatings()
        return;
    }
    activeStudent++
    $("#centerContent-rate").fadeOut("fast", function () {
        try {
            document.getElementById("currentPic").src = 'reloading-pfp.gif'
            document.getElementById("message").value = ""
            document.getElementById("currentName").innerText = pickedStudents[activeStudent]
            document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`

            const studentKey = pickedStudents[activeStudent];
            if (!usersElems[studentKey]) {
                console.warn(`User data not found for: ${studentKey}`);
                document.getElementById("currentPic").src = 'snap.png';
                document.getElementById("contCurre").style.display = 'none'
                document.getElementById("currentName").innerText = marresi_fix[pickedStudents[activeStudent]].marresi
                document.getElementById("currentCount").innerText = `${activeStudent + 1}/${pickedStudents.length}`
                document.getElementById("currentPic").src = 'snap.png'//pickedStudents[pickedStudents[activeStudent]].info.foto
                document.getElementById("message").value = marresi_fix[pickedStudents[activeStudent]].contents.vleresim
                reloadGenerate()
                setTimeout(function () {
                    $("#centerContent-rate").fadeIn("fast")
                }, 300)
                document.getElementById("noError").style.display = 'none'
                document.getElementById("unicode_error").style.display = null;
                return;
            }

            document.getElementById("noError").style.display = null
            document.getElementById("unicode_error").style.display = 'none'

            document.getElementById("currentPic").src = usersElems[studentKey].info.foto
            reloadGenerate()
            setTimeout(function () {
                $("#centerContent-rate").fadeIn("fast")
            }, 300)

            if (marresit && marresit.includes(studentKey) && marresit_more) {
                const result = marresit_more.find(item => item.marresi === studentKey);
                if (result) {
                    document.getElementById("message").value = result.contents.vleresim;
                }
            }
            document.getElementById("contCurre").style.display = null;
        } catch (error) {
            console.warn("Caught error inside fadeOut callback:", error);
        }
    });

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
    const currentValue = parseInt(txt.innerText) || 0;
    const duration = 500;
    const steps = 40; // (controls how smooth the animation is)
    const increment = (targetValue - currentValue) / steps;

    let count = 0;

    function update() {
        count++;
        const newValue = currentValue + increment * count;
        txt.innerText = Math.round(newValue) + "%";

        if (count < steps) {
            requestAnimationFrame(update);
        } else {
            txt.innerText = targetValue + "%";
        }
    }

    update();
}

let isSocialed = false;
let socialSection = 'none'
let socialUsername = 'none'
async function getEvoxProfile(name) {
    if (name === null) { return; }
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
            console.log(match)
            if (match) {
                const extracted = match[1];
                socialUsername = extracted;
                document.getElementById("instausername-SELF").innerText = socialUsername
                document.getElementById("isInstagramed").style.display = null
            } else {
                console.log("No match found");
                document.getElementById("isInstagramed").style.display = 'none'
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
                <p>${info.emri}</p><span>${info.seksioni}${info.klasa !== 'none' ? "'" + info.klasa : ""}</span> <!--->
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

            if (id === 'classChange') {
                document.body.style.overflow = null
                document.getElementById("app").style.transform = ""
                document.getElementById("app").style.opacity = "1"
                document.getElementById("profilePage").style.transform = ""
                document.getElementById("profilePage").style.opacity = "1"
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
    if (hasLoginFailed) {
        //localStorage.clear()
        //sessionStorage.clear()
        //setTimeout(function () {
        //    window.location.reload()
        //}, 500)
        //return;
    }
    if (!localStorage.getItem("jeanDarc_accountData")) {
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
    } else {
        deletePIN()
        deletePIN()
        deletePIN()
        deletePIN()
        $("#lock").fadeOut("fast", function () {
            $("#app").fadeIn("fast")
            document.body.style.overflow = null
            document.getElementById("app").style.transform = ""
            document.getElementById("app").style.opacity = "1"
            setTimeout(function () { document.getElementById("app").style.opacity = "1" }, 500)
        })
    }

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
        $('#boxUp').children().not('.loginByName, #helpMe, #loginByIp').fadeOut(function () {
            $("#loginByName").fadeIn("fast")
        });

    })


}

function help() {
    document.getElementById("topLeftBack").classList.add("active")
    $("#appInfo").fadeOut("fast")
    $("#textDialog").fadeOut("fast", function () {
        const boxUp = document.getElementById("boxUp");
        const currentHeight = boxUp.offsetHeight + 'px';
        boxUpDefaultHeight = currentHeight
        boxUp.style.transition = 'height 1s'; // Adjust the duration as needed
        boxUp.style.height = currentHeight;
        setTimeout(() => {
            boxUp.style.height = '260px';
        }, 10);
        $('#boxUp').children().not('#helpMe, .loginByName, #loginByIp').fadeOut(function () {
            $("#helpMe").fadeIn("fast")
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
        $("#helpMe").fadeOut("fast")
        $("#loginByIp").fadeOut("fast", function () {
            $("#loginByName").fadeOut("fast", function () {
                $('#boxUp').children().not('.loginByName, #helpMe, #loginByIp').fadeIn(function () {
                    $("#textDialog").fadeIn("fast", function () {
                        $("#appInfo").fadeIn("fast")

                    })
                });
            })
        })

    }
}

function getHelpSend() {
    fetch(`https://arc.evoxs.xyz/?metode=needHelp&emri=${document.getElementById("getHelpInput").value}`)
        .then(response => response.text())
        .then(text => {
            document.getElementById("getHelpInput").value = ''
            goBackToMain()

        }).catch(error => {

        });
}

function goBackFromHelp() {
    document.getElementById("topLeftBackHelp").classList.remove("active")
    //
    if (boxUpDefaultHeight) {
        const boxUp = document.getElementById("boxUp");
        boxUp.style.transition = 'height 1s'; // Adjust the duration as needed

        setTimeout(() => {
            boxUp.style.height = boxUpDefaultHeight;
        }, 10);
        $("#topLeftBack").fadeOut("fast")
        $("#helpMe").fadeOut("fast", function () {
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
            document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${transformGreekName(matchedNames[0], 0)} ${transformGreekName(matchedNames[0], 1)}`
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
        if (part === foundName && matchedNames.length === 1) {
            el.innerHTML += 'Δεν μπορείτε να γράψετε για τον εαυτό σας'
            return;
        }
        if (!spawnedSearches.includes(part)) {
            //spawnedSearches.push(part)
            fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${part}`)
                .then(response => response.json())
                .then(info => {
                    el.innerHTML += `<div onclick="addFromSearch('${info.emri}', this)" class="aStudent fade-in-slide-up ${pickedStudents.includes(info.emri) ? "picked" : ""}">
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
    if (matchedNames.length === 0) {
        el.innerHTML += 'Δεν βρέθηκαν αντιστοιχίες'
    }
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
    if (toPin) {
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
                            document.getElementById("selfPfp").src = base64String
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

function moreOptions(el) {
    return;
    const active = usersElems[pickedStudents[activeStudent]].info.emri
    document.getElementById("where").innerText = `${getGender(active) === "Male" ? "στον" : "στην"} ${fixNameCase(active.split(" ")[0])}`
    el.style.height = "130px"
    document.getElementById("hidden-options").style.display = 'flex'
}

//function pickAvail(what) {
//    if(what === 'user+teach') {
//    }
//}

function startEvoxLogin() {
    window.location.href = '../evox-epsilon-beta/?metode=jeandarc'
}

function updateProgress(percentage) {
    const circle = document.querySelector('.circle-fill');
    const maxStroke = 188; // The full circumference of the circle
    const offset = maxStroke - (maxStroke * percentage) / 100;

    circle.style.strokeDashoffset = offset;
}

function openProfile(el) {
    showProfile(null)
    document.getElementById("home-switch").classList.remove("active")
    document.getElementById("discovery-switch").classList.remove("active")
    el.classList.add('active')
    document.getElementById("home").style.display = 'none'
    document.getElementById("discover").style.display = 'none'
    document.getElementById("profile").style.display = 'block'

}

function greekToGreeklish(text) {
    const map = {
        'Α': 'A', 'Β': 'V', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Ζ': 'Z', 'Η': 'I', 'Θ': 'Th',
        'Ι': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'X', 'Ο': 'O', 'Π': 'P',
        'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Φ': 'F', 'Χ': 'Ch', 'Ψ': 'Ps', 'Ω': 'O',
        'ά': 'a', 'έ': 'e', 'ή': 'i', 'ί': 'i', 'ό': 'o', 'ύ': 'y', 'ώ': 'o', 'ς': 's',
        'α': 'a', 'β': 'v', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'ζ': 'z', 'η': 'i', 'θ': 'th',
        'ι': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'x', 'ο': 'o', 'π': 'p',
        'ρ': 'r', 'σ': 's', 'τ': 't', 'υ': 'y', 'φ': 'f', 'χ': 'ch', 'ψ': 'ps', 'ω': 'o'
    };
    return text.split('').map(char => map[char] || char).join('');
}

function openDiscovery(el) {
    el.classList.add('active')
    document.getElementById("home-switch").classList.remove("active")
    document.getElementById("profile-switch").classList.remove("active")
    document.getElementById("home").style.display = 'none'
    document.getElementById("profile").style.display = 'none'
    document.getElementById("discover").style.display = 'block'
    let skeleton = ``
    for (let i = 0; i < 6; i++) {
        skeleton += `<div class="aclass skeleton">
                    <div class="left">
                        &nbsp;
                        <p>&nbsp;<vox class="smallto">&nbsp;</vox>
                        </p>
                    </div>
                    <div class="right">
                        &nbsp;
                    </div>
                </div>`
    }
    try {
        console.log(greekToGreeklish(foundName))
        if(btoa(greekToGreeklish(foundName)).includes("R3JpZ29yaXM")) {
            document.getElementById("done").style.display = null
        }
    } catch (e) {
        console.log(e)
    }
    
    document.getElementById("classes").innerHTML = skeleton
    fetch('https://arc.evoxs.xyz/?metode=progresin')
        .then(response => response.json())
        .then(progress_global => {
            const progress = progress_global.global
            document.getElementById("countDone").innerHTML = progress.have_participated
            document.getElementById("countFull").innerHTML = progress.total_users
            document.getElementById("countLeft").innerHTML = progress.total_users - progress.have_participated
            const percentage = Number.parseInt(100 * progress.have_participated / progress.total_users)
            document.getElementById("isDone").innerHTML = percentage + "%"
            updateProgress(percentage);
            const progress_class = progress_global.byclass
            document.getElementById("classes").innerHTML = ''
            Object.entries(progress_class.class_counts).forEach(([key, value]) => {
                if (key === 'ΚΑΘ') { return; }
                document.getElementById("classes").innerHTML += `<div class="aclass">
                    <div class="left">
                    ${key === "ΓΥΓ" ? "Υγείας" : key.includes("ΓΑΝΘ1") ? "Θεωρητ. 1" : key === 'ΓΟΠ1' ? "Οικον. 1" : key === 'ΓΟΠ2' ? "Οικον. 2" : key === "ΓΑΝΘ2" ? "Θεωρητ. 2" : key === "ΓΘΤ" ? "Θετικών" : key}
                    <p>${value.have_participated}<vox class="smallto">/${value.total}</vox></p>
                    </div>
                    <div class="right">
                        ${key === 'ΓΥΓ' ? `<svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" width="25px" height="25px" viewBox="0 0 32 32" version="1.1">
<title>health</title>
<path d="M29.125 10.375h-7.5v-7.5c0-1.036-0.839-1.875-1.875-1.875h-7.5c-1.036 0-1.875 0.84-1.875 1.875v7.5h-7.5c-1.036 0-1.875 0.84-1.875 1.875v7.5c0 1.036 0.84 1.875 1.875 1.875h7.5v7.5c0 1.036 0.84 1.875 1.875 1.875h7.5c1.036 0 1.875-0.84 1.875-1.875v-7.5h7.5c1.035 0 1.875-0.839 1.875-1.875v-7.5c0-1.036-0.84-1.875-1.875-1.875z"/>
</svg>`: key.includes('ΓΑΝΘ') ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
<polygon style="fill:#B4B4B4;" points="435.298,32.603 256,32.603 235.102,272.301 256,512 435.298,512 "/>
<rect x="76.706" y="32.601" style="fill:#E0E0E0;" width="179.294" height="479.399"/>
<g>
	<rect x="150.183" y="103.424" style="fill:#707070;" width="211.634" height="31.347"/>
	<rect x="150.674" y="161.061" style="fill:#707070;" width="31.347" height="308.987"/>
	<rect x="240.327" y="161.061" style="fill:#707070;" width="31.347" height="308.987"/>
	<rect x="329.979" y="161.061" style="fill:#707070;" width="31.347" height="308.987"/>
</g>
<polygon style="fill:#424242;" points="446.794,0 256,0 235.102,32.603 256,65.206 446.794,65.206 "/>
<rect x="65.202" style="fill:#707070;" width="190.798" height="65.202"/>
<path style="fill:#B4B4B4;" d="M65.206,0L44.308,65.206l20.898,65.206c36.012,0,65.206-29.193,65.206-65.206  C130.411,29.193,101.217,0,65.206,0z"/>
<path style="fill:#E0E0E0;" d="M0,65.206c0,36.012,29.193,65.206,65.206,65.206V0C29.193,0,0,29.193,0,65.206z"/>
<path style="fill:#424242;" d="M65.206,40.774L54.757,65.206l10.449,24.432c13.493,0,24.432-10.938,24.432-24.432  C89.637,51.712,78.699,40.774,65.206,40.774z"/>
<path style="fill:#707070;" d="M40.774,65.206c0,13.493,10.938,24.432,24.432,24.432V40.774  C51.712,40.774,40.774,51.712,40.774,65.206z"/>
<path style="fill:#B4B4B4;" d="M446.794,0l-20.898,65.206l20.898,65.206c36.012,0,65.206-29.193,65.206-65.206S482.807,0,446.794,0z  "/>
<path style="fill:#E0E0E0;" d="M381.589,65.206c0,36.012,29.193,65.206,65.206,65.206V0C410.783,0,381.589,29.193,381.589,65.206z"/>
<path style="fill:#424242;" d="M446.794,40.774l-10.449,24.432l10.449,24.432c13.493,0,24.432-10.938,24.432-24.432  S460.288,40.774,446.794,40.774z"/>
<path style="fill:#707070;" d="M422.363,65.206c0,13.493,10.938,24.432,24.432,24.432V40.774  C433.301,40.774,422.363,51.712,422.363,65.206z"/>
</svg>`: key.includes("ΓΟΠ") ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM10.6158 9.5C11.0535 8.71823 11.8025 8 12.7498 8C13.284 8 13.819 8.23239 14.2923 8.70646C14.6824 9.09734 15.3156 9.09792 15.7065 8.70775C16.0973 8.31758 16.0979 7.68442 15.7077 7.29354C14.9274 6.51179 13.9042 6 12.7498 6C11.3289 6 10.1189 6.77025 9.29826 7.86449C8.93769 8.34528 8.64329 8.89783 8.42654 9.5H8C7.44772 9.5 7 9.94772 7 10.5C7 10.9581 7.30804 11.3443 7.72828 11.4626C7.82228 11.4891 7.91867 11.5 8.01613 11.5C7.99473 11.8304 7.99473 12.1696 8.01613 12.5C7.91867 12.5 7.82228 12.5109 7.72828 12.5374C7.30804 12.6557 7 13.0419 7 13.5C7 14.0523 7.44772 14.5 8 14.5H8.42654C8.64329 15.1022 8.93769 15.6547 9.29826 16.1355C10.1189 17.2298 11.3289 18 12.7498 18C13.9042 18 14.9274 17.4882 15.7077 16.7065C16.0979 16.3156 16.0973 15.6824 15.7065 15.2923C15.3156 14.9021 14.6824 14.9027 14.2923 15.2935C13.819 15.7676 13.284 16 12.7498 16C11.8025 16 11.0535 15.2818 10.6158 14.5H12C12.5523 14.5 13 14.0523 13 13.5C13 12.9477 12.5523 12.5 12 12.5H10.0217C9.99312 12.1735 9.99312 11.8265 10.0217 11.5H13C13.5523 11.5 14 11.0523 14 10.5C14 9.94772 13.5523 9.5 13 9.5H10.6158Z" fill="#fff"/>
</svg>` : key.includes("ΓΘΤ") ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M857.7 583.1c-6.7-11.8-21.8-15.8-33.5-9-11.8 6.7-15.8 21.8-9.1 33.5 66.6 115.9 83.4 212.6 43.8 252.2-75.7 75.8-311.6-54.5-476-218.9-41.5-41.5-78.8-84.7-111.3-127.9 33.4-45.1 71.3-89.2 111.3-129.2C547.2 219.5 783.1 89.3 858.9 165c30.9 30.9 27.7 97.6-8.9 183-40.1 93.6-114.7 197.7-210 293-22.3 22.3-45.4 43.8-68.7 63.8-10.3 8.8-11.4 24.4-2.6 34.6 8.9 10.3 24.4 11.4 34.6 2.6 24.2-20.8 48.2-43.2 71.4-66.3 99.6-99.6 177.9-209.1 220.4-308.3 45.6-106.3 45-190.5-1.5-237C802 38.8 562.4 135 348.2 349.3c-39.9 39.9-75.7 80.7-107 121.2-28.1-41.7-51.4-83-68.3-122.4-36.6-85.3-39.8-152-8.9-183 39.6-39.6 136.1-22.9 252 43.6 11.7 6.7 26.8 2.7 33.5-9.1 6.7-11.8 2.7-26.8-9.1-33.5-140-80.3-253.4-93.4-311.1-35.7-46.6 46.6-47.1 130.7-1.5 237 20 46.8 48.2 95.8 82.6 145C97.5 674.2 60.7 825.9 129.3 894.5c23.8 23.8 57 35.5 97.6 35.5 58.7 0 132.9-24.6 216.5-73 11.7-6.8 15.7-21.8 8.9-33.6-6.8-11.7-21.8-15.7-33.6-8.9-117.1 68-214.7 85.3-254.7 45.3-51.6-51.6-7.5-177.6 77.8-304.7 31.6 40.9 67.3 81.5 106.3 120.5 99.6 99.6 209.1 177.8 308.4 220.4 52.5 22.5 99.7 33.8 139.6 33.8 40.8 0 73.9-11.8 97.5-35.3 57.7-57.7 44.6-171.2-35.9-311.4zM511.5 430.5c-45.2 0-81.9 36.7-81.9 81.9s36.7 81.9 81.9 81.9 81.9-36.7 81.9-81.9c-0.1-45.2-36.7-81.9-81.9-81.9z" fill="#FFF"/></svg>` : "error"}
                    </div>
                </div>`
                console.log(`Class: ${key}, Total: ${value.total}, Participated: ${value.have_participated}`);
            });
        }).catch(error => {
            console.log('Error:', error);
        });



    const toUser = document.getElementById("toyou")
    toUser.style.display = 'none'
    //document.getElementById("main-block").style.display = 'none'
    document.getElementById("sum").style.display = 'none'
    const val = localStorage.getItem("jeanDarc_accountData")
    if (val) {
        const json = JSON.parse(val)
        const process = atob(json.pin)
        try {
            //document.getElementById("sum").style = null
            fetch(`https://arc.evoxs.xyz/?metode=AITreload&emri=${foundName}&pin=${process}`)
                .then(response => response.json())
                .then(aitInfo => {
                    //if (aitInfo.message === 'U gjeten listime te reja') {
                    //    if (localStorage.getItem("Jeanne_lastAit_summary")) {
                    //        //document.getElementById("summaryTxt").innerHTML = `Έχεις ${aitInfo.new_count === 1 ? "1 νέα καταχώρηση" : `${aitInfo.new_count} νέες καταχωρήσεις`}.<br>Η προηγούμενη περίληψη δεν ισχύει.`
                    //        $("#summaryTxt").fadeIn("fast")
                    //    }
                    //} else {
                    //    if (localStorage.getItem("Jeanne_lastAit_summary")) {
                    //        //document.getElementById("summaryTxt").innerHTML = localStorage.getItem("Jeanne_lastAit_summary")
                    //        $("#summaryTxt").fadeIn("fast")
                    //    }
                    //}

                    if (aitInfo.message === 'U gjeten listime te reja' || aitInfo.message === 'Asnje lajm') {
                        document.getElementById("thFY").style.display = null;
                        fetch(`https://arc.evoxs.xyz/?metode=isAITavailable`)
                            .then(response => response.text())
                            .then(AIT_STAT => {
                                if (AIT_STAT === 'false') {
                                    document.getElementById("sum").style.display = null
                                    document.getElementById("summaryTxt").classList.add("warnTxt")
                                    document.getElementById("summaryTxt").innerHTML = `Η περίληψη AI έχει απενεργοποιηθεί από τους διαχειριστές.`
                                    document.getElementById("aitbtn").style.display = 'none'
                                    $("#summaryTxt").fadeIn("fast")
                                } else {
                                    try {
                                        document.getElementById("summaryTxt").classList.remove("warnTxt")
                                    } catch (err) {
                                        console.warn("summary txt didnt have warn class")
                                    }
                                    document.getElementById("aitbtn").style.display = null
                                    document.getElementById("sum").style.display = null
                                    if (aitInfo.message === 'U gjeten listime te reja') {
                                        if (localStorage.getItem("Jeanne_lastAit_summary")) {
                                            document.getElementById("summaryTxt").innerHTML = `Έχεις ${aitInfo.new_count === 1 ? "1 νέα καταχώρηση" : `${aitInfo.new_count} νέες καταχωρήσεις`}.<br>Η προηγούμενη περίληψη δεν ισχύει.`
                                            $("#summaryTxt").fadeIn("fast")
                                        }
                                    } else {
                                        if (localStorage.getItem("Jeanne_lastAit_summary")) {
                                            document.getElementById("summaryTxt").innerHTML = localStorage.getItem("Jeanne_lastAit_summary")
                                            $("#summaryTxt").fadeIn("fast")
                                        }
                                    }
                                }

                            }).catch(error => {
                                console.error("Progress error", error)
                            });
                    } else {
                        document.getElementById("sum").style.display = 'none'
                        document.getElementById("thFY").style.display = 'none'
                        
                    }

                }).catch(error => {
                    console.error("Progress error", error)
                });

        } catch (error) {
            console.warn("err", error)
        }
        fetch(`https://arc.evoxs.xyz/?metode=toMe&emri=${foundName}&pin=${process}`)
            .then(response => response.json())
            .then(complete => {
                if (localStorage.getItem("toMe") || sessionStorage.getItem("keepTrendUp")) {
                    if (complete.total > localStorage.getItem("toMe") || sessionStorage.getItem("keepTrendUp")) {
                        sessionStorage.setItem("keepTrendUp", 'true')
                        document.getElementById("rightToMe").style.display = null
                    } else {
                        if (!sessionStorage.getItem("keepTrendUp")) {
                            document.getElementById("rightToMe").style.display = 'none'
                        }
                    }
                }
                if (complete.total !== 0) {
                    //document.getElementById("sum").style.display = null
                    document.getElementById("toMe").innerHTML = `${complete.total}<vox class="smallto">&nbsp;${complete.total === 1 ? "καταχώρηση" : "καταχωρήσεις"}`
                    //toUser.querySelector(".right").innerHTML = `${complete.total} ${complete.total === 1 ? "καταχώρηση" : "καταχωρήσεις"}`
                } else {
                    document.getElementById("toMe").innerHTML = `0<vox class="smallto">&nbsp;καταχωρήσεις`
                }
                localStorage.setItem("toMe", complete.total)

            }).catch(error => {
                console.error("Progress error", error)
            });
        fetch(`https://arc.evoxs.xyz/?metode=fromMe&emri=${foundName}&pin=${process}`)
            .then(response => response.json())
            .then(complete => {
                if (complete.total !== 0) {

                    document.getElementById("fromMe").innerHTML = `${complete.total}<vox class="smallto">&nbsp;${complete.total === 1 ? "καταχώρηση" : "καταχωρήσεις"}`
                    //toUser.querySelector(".right").innerHTML = `${complete.total} ${complete.total === 1 ? "καταχώρηση" : "καταχωρήσεις"}`
                } else {
                    document.getElementById("fromMe").innerHTML = `0<vox class="smallto">&nbsp;καταχωρήσεις`
                }

            }).catch(error => {
                console.error("Progress error", error)
            });

    }

}

function openHome(el) {
    el.classList.add('active')
    document.getElementById("discovery-switch").classList.remove("active")
    document.getElementById("profile-switch").classList.remove("active")
    document.getElementById("home").style.display = 'block'
    document.getElementById("profile").style.display = 'none'
    document.getElementById("discover").style.display = 'none'
}

let noticeAction = null
let noticeData = null
function noticeFront(data) {
    document.getElementById("notice-box").style.display = 'flex'
    document.getElementById("notice-title").innerHTML = data.title
    document.getElementById("notice-description").innerHTML = data.description
    if (data.function.name === 'fetch' && data.function.url) {
        const account_data = localStorage.getItem("jeanDarc_accountData")
        if (!account_data) {
            console.error("Llogaria nuk eshte ruajtur ne nivel lokal!?")
            return;
        }
        const pars = JSON.parse(account_data)
        let finalUrl = `${data.function.url.replace("{emri}", foundName).replace("{base64Pin}", pars.pin).replace("{dataId}", data.id)}`
        //console.log(finalUrl)
        noticeAction = 'fetch'
        noticeData = finalUrl
    }
}

function noticeFetch(url) {
    fetch(url)
        .then(response => response.json())
        .then(result => {
            if (result.message === 'Complete') {
                document.getElementById("notice-box").style.display = 'none'
            }
        }).catch(error => {
            console.log('Error:', error);
        });
}

function runNoticeAction() {
    setTimeout(function () {
        noticeAction === "fetch" ? noticeFetch(noticeData) : console.warn("Couldn't remove warn")
    }, 400)

}

grabberEvents("classChange")

function changeClass() {
    document.getElementById("app").style.transform = "scale(0.95)"
    document.getElementById("app").style.opacity = "0"
    document.getElementById("profilePage").style.transform = "scale(0.95)"
    document.getElementById("profilePage").style.opacity = "0.7"
    document.body.style.overflow = "hidden"
    document.getElementById("classChange").classList.add("active")
    document.getElementById("spawnClasses").innerHTML = `<div class="loading-spinner"></div>`
    fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${foundName}`)
        .then(response => response.json())
        .then(info => {
            document.getElementById("spawnClasses").innerHTML = ''
            const selfClass = `${info.seksioni}${info.klasa}`
            console.log("User's class", selfClass)
            fetch('https://arc.evoxs.xyz/?metode=progresin')
                .then(response => response.json())
                .then(progress_global => {
                    const progress = progress_global.global
                    const percentage = Number.parseInt(100 * progress.have_participated / progress.total_users)
                    document.getElementById("isDone").innerHTML = percentage + "%"
                    updateProgress(percentage);
                    const progress_class = progress_global.byclass
                    document.getElementById("classes").innerHTML = ''
                    let classes = []
                    Object.entries(progress_class.class_counts).forEach(([key, value]) => {
                        if (key === 'ΚΑΘ') { return; }
                        classes.push({ name: key, count: value.total })
                        console.log(`Class: ${key}, Total: ${value.total}, Participated: ${value.have_participated}`);
                    });
                    classes.forEach(klasa => {
                        console.log(klasa)
                        const isClass = selfClass.replace("none", "") === klasa.name
                        const key = klasa.name
                        document.getElementById("spawnClasses").innerHTML += `<div ${!isClass ? `onclick='switchClass("${klasa.name}", event)'` : ""} class="aStudent cntfix${isClass ? " picked" : ""}">
                        <p>${key === "ΓΥΓ" ? "Υγείας" : key.includes("ΓΑΝΘ1") ? "Θεωρητ. 1" : key === 'ΓΟΠ1' ? "Οικον. 1" : key === 'ΓΟΠ2' ? "Οικον. 2" : key === "ΓΑΝΘ2" ? "Θεωρητ. 2" : key === "ΓΘΤ" ? "Θετικών" : key}</p>
                        <span style="margin-left: auto;">${klasa.count} άτομα</span>
                    </div>`
                    })
                }).catch(error => {
                    console.log('Error:', error);
                });
        })
        .catch(error => {
            console.error("Jeanne D'arc Database is offline.");
            console.log('Error:', error);
        });

}

function switchClass(to, ev) {
    ev.preventDefault();
    ev.stopPropagation();
    const val = localStorage.getItem("jeanDarc_accountData")
    if (val) {
        const json = JSON.parse(val)
        const process = atob(json.pin)
        fetch(`https://arc.evoxs.xyz/?metode=ndryshimKlasa&emri=${foundName}&pin=${process}&id=${to}`)
            .then(response => response.text())
            .then(complete => {
                changeClass()
                showProfile(document.getElementById("pfpContHome"))
            }).catch(error => {
                console.error("Progress error", error)
            });
    }
}

function timeAgo(isoString) {
    const now = new Date();
    const past = new Date(isoString);
    const diff = Math.floor((now - past) / 1000);

    const units = [
        { max: 60, value: 1, name: ['δευτερόλεπτο', 'δευτερόλεπτα'] },
        { max: 3600, value: 60, name: ['λεπτό', 'λεπτά'] },
        { max: 86400, value: 3600, name: ['ώρα', 'ώρες'] },
        { max: 604800, value: 86400, name: ['ημέρα', 'ημέρες'] },
        { max: 2419200, value: 604800, name: ['εβδομάδα', 'εβδομάδες'] },
        { max: 29030400, value: 2419200, name: ['μήνα', 'μήνες'] },
        { max: Infinity, value: 29030400, name: ['χρόνο', 'χρόνια'] }
    ];

    for (const unit of units) {
        if (diff < unit.max) {
            const count = Math.floor(diff / unit.value);
            return count <= 1
                ? `πριν ${count || 1} ${unit.name[0]}`
                : `πριν ${count} ${unit.name[1]}`;
        }
    }
}

function analyzeUser(e) {
    $("#summaryTxt").fadeOut("fast")
    e.blur()
    setTimeout(function () {
        const btn = e;
        btn.style.pointerEvents = 'none';
        setTimeout(() => {
            btn.style.pointerEvents = '';
        }, 10);
    }, 400)
    setTimeout(function () {
        document.getElementById("aitext").classList.add('btn-shine')
        document.getElementById("aitext").innerText = 'Σύνδεση..'
        const val = localStorage.getItem("jeanDarc_accountData")
        if (val) {
            const json = JSON.parse(val)
            const process = atob(json.pin)
            document.getElementById("aitext").innerText = 'Επεξεργασία..'
            fetch(`https://arc.evoxs.xyz/?metode=AIT&emri=${foundName}&pin=${process}`)
                .then(response => response.json())
                .then(complete => {
                    if (complete.error) {
                        document.getElementById("aitext").classList.remove('btn-shine')
                        document.getElementById("aitext").innerText = 'Αποτυχία'
                    } else if (complete.response) {
                        try {
                            setTimeout(function () {
                                let find = complete.response

                                if (find === 'Access Denied') {
                                    document.getElementById("summaryTxt").innerText = 'Απενεργοποιημένο για τώρα'
                                    document.getElementById("aitext").innerText = 'Αποτυχία'
                                } else if (find === 'AIT is currently sleeping') {
                                    document.getElementById("summaryTxt").innerHTML = 'Το όριο περιλήψεων έχει εξαντληθεί.<br>Δοκιμάστε ξανά αύριο.'
                                    document.getElementById("aitext").innerText = 'Αποτυχία'
                                } else if (find === '0 Entries') {
                                    document.getElementById("summaryTxt").innerText = 'Δεν έχεις καμία καταχώρηση'
                                    document.getElementById("aitext").innerText = 'Επανάληψη'
                                } else {
                                    //Success
                                    //find = find.replace(/�/g, '<span class="img-replacement"></span>')
                                    document.getElementById("summaryTxt").innerHTML = find
                                    document.getElementById("aitext").innerText = 'Επανάληψη'
                                    localStorage.setItem("Jeanne_lastAit_summary", find)
                                    localStorage.setItem("Jeanne_lastAit_countIn", localStorage.getItem("toMe"))
                                }
                                $("#summaryTxt").fadeIn("fast")

                                document.getElementById("aitext").classList.remove('btn-shine')
                            }, 700)
                        } catch (error) {
                            console.error(error)
                            document.getElementById("aitext").classList.remove('btn-shine')
                            document.getElementById("aitext").innerText = 'Αποτυχία'
                        }


                    }
                }).catch(error => {
                    console.error("Progress error", error)
                    document.getElementById("aitext").classList.remove('btn-shine')
                    document.getElementById("aitext").innerText = 'Αποτυχία'
                });
        }
    }, 250)


}

function checkForLocal() {
    const lc = localStorage.getItem("jeanneBackup")
    if (lc) {
        if (confirm("Βρέθηκαν αντίγραφα ασφαλείας της επετηρίδας. Θέλετε να τα επαναφέρετε;")) {
            console.log("OK pressed");
            const json = JSON.parse(lc)
            let start = 'Θα επαναφερθούν τα ακόλουθα δεδομένα:\n'
            Object.entries(json).forEach(([key, user]) => {
                // key -> emri, user -> data
                if (!key.includes("question")) {
                    start += `${key}: ${user}\n`
                }


            });
            alert(start)
            const backup = JSON.parse(localStorage.getItem("jeanneBackup"))
            dataIn = backup
            saveRatings()
        } else {
            console.log("Cancel pressed");
        }
    } else {
        alert("Δεν βρέθηκαν αντίγραφα ασφαλείας της επετηρίδας.")
    }
}