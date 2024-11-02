

const disableScroll = (e) => {
    // For wheel events
    if (e.deltaY !== 0) {
        // Allow vertical scroll, prevent horizontal scroll
        e.preventDefault();
    }
};

// For touch events, we prevent default only if the touch movement is horizontal
const touchMoveHandler = (e) => {
    const touch = e.touches[0];
    const startX = touch.clientX;
    const startY = touch.clientY;

    const moveHandler = (e) => {
        const moveX = e.touches[0].clientX - startX;
        const moveY = e.touches[0].clientY - startY;

        if (Math.abs(moveX) > Math.abs(moveY)) {
            e.preventDefault(); // Prevent horizontal movement
        }
    };

    window.addEventListener('touchmove', moveHandler, { passive: false });

    // Remove the event listener when the touch ends
    window.addEventListener('touchend', () => {
        window.removeEventListener('touchmove', moveHandler);
    }, { once: true });
};

// Attach the event listeners
window.addEventListener('wheel', disableScroll, { passive: false });
window.addEventListener('touchstart', touchMoveHandler, { passive: false });


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
                                    $("#lock").fadeIn("fast")
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
    video.playbackRate = 1;
    if (document.getElementById('nameInput').value === '') {
        shake_me('nameInput')
        return;
    }
    document.getElementById("loginSection").classList.remove('active')
    document.getElementById("loginButton").style.opacity = '0'
    setTimeout(function () {
        document.getElementById("topImg").style.opacity = '1'
        setTimeout(function () {

            document.getElementById("loadText").innerText = 'Αναζήτηση..'
            $("#tasks").fadeIn("fast")
            video.play()
            const searchInput = document.getElementById('nameInput').value; // Replace with any input you want to test
            const matchedNames = findFullNames(searchInput);
            console.log(matchedNames);
            setTimeout(() => {
                if (matchedNames.length === 0) {
                    document.getElementById("loadText").style.opacity = '0'
                    setTimeout(function () {
                        document.getElementById("loadText").innerText = 'Δεν βρέθηκαν αντιστοιχίες'
                        document.getElementById("loadText").style.opacity = '1'
                    }, 340)

                    $("#tasks").fadeIn("fast")
                    setTimeout(function () {
                        setTimeout(function () {
                            $("#tasks").fadeOut("fast")
                        }, 550)
                        document.getElementById("loginSection").classList.add('active')
                        document.getElementById("loginButton").style.opacity = '1'
                    }, 1000)
                } else {
                    if (matchedNames.length > 1) {
                        const video = document.getElementById("video");
                        video.play();
                        document.getElementById("loadText").style.opacity = '0'
                        setTimeout(function () {
                            document.getElementById("loadText").innerHTML = `Πολλαπλές αντιστοιχίες`
                            document.getElementById("loadText").style.opacity = '1'
                            document.getElementById("loginButton").style.display = 'none'
                            setTimeout(function () {
                                //document.getElementById("loadText").style.opacity = '0'
                                setTimeout(function () {
                                    $("#tasks").fadeOut("fast")
                                }, 550)
                                setTimeout(function () {
                                    document.getElementById("topImg").style.opacity = '0'
                                    document.getElementById("multimatch").innerHTML = `<p>Επιλέξτε ένα από τα παρακάτω ονόματα:</p>`
                                    let count = 0
                                    matchedNames.forEach(name => {
                                        count++
                                        const firstChar = (str) => str.split(' ')[1]?.charAt(0) || null;
                                        document.getElementById("multimatch").innerHTML = `${document.getElementById("multimatch").innerHTML}
                                        <div onclick="selectCustom('${name}')" class="socialUser"><img class="slUserPFP social"
                src="https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${firstChar(name)}">
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
                                        document.getElementById("topImg").style.display = 'none'
                                        document.getElementById("loginSection").style.display = 'none'
                                        document.getElementById("multimatch").classList.add("active")
                                    }, 500)

                                    //document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${matchedNames[0].split(' ')[0].replace(/[σς]+$/, '')}`
                                    //document.getElementById("loadText").style.opacity = '1'
                                    //setTimeout(function () {
                                    //    
                                    //}, 1200)
                                }, 340)
                            }, 900)
                        }, 340)
                    } else {
                        foundName = matchedNames[0]
                        document.getElementById("loadText").style.opacity = '0'
                        setTimeout(function () {
                            document.getElementById("loadText").innerHTML = `Επιτυχία`
                            document.getElementById("loadText").style.opacity = '1'
                            setTimeout(function () {
                                document.getElementById("loadText").style.opacity = '0'
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
                                                $("#lock").fadeIn("fast")
                                            })

                                        })
                                    }, 2500)
                                }, 340)
                            }, 900)
                        }, 340)
                    }


                }
            }, 500);

        }, 100)

    }, 500)

}


function findFullNames(input) {
    const results = [];
    const variations = Object.values(namesData.names).flat();

    for (const [fullName, nameVariations] of Object.entries(namesData.names)) {
        // Check if the input matches any of the name variations (case insensitive)
        if (nameVariations.some(variation => variation.toLowerCase() === input.toLowerCase())) {
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


let namesData = null
let ip = null
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("jeanDarc_accountData")) {
        autoLogin()
    } else {
        const video = document.getElementById("video");
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
                                document.getElementById("topImg").style.opacity = '1'
                                setTimeout(function () {
                                    document.getElementById("loginContainer").style.opacity = '1'
                                    document.getElementById("loginSection").classList.add('active')
                                    setTimeout(function () {
                                        $("#tasks").fadeOut("fast")
                                    }, 550)
                                    video.play()
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
                        console.log('Error:', error);
                    });




            })
            .catch(error => {
                console.error("IP Api is offline, ignoring")
                console.log('Error:', error);
            });
    }


});

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
                                    document.getElementById("loadText").innerHTML = `Έχετε συνδεθεί.`
                                    const accData = {
                                        "name": foundName,
                                        "pin": btoa(pin),
                                        "latestIp": ip
                                    }
                                    localStorage.setItem("jeanDarc_accountData", JSON.stringify(accData))
                                    $("#tasks").fadeIn("fast")

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
                        console.log('Error:', error);
                    });

            }, 900)
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
                                    $("#lock").fadeIn("fast")
                                })

                            })
                        }
                    }).catch(error => {
                        console.error("Evox Database is offline.")
                        console.log('Error:', error);
                    });
            })

        })


    } else {
        console.error("AutoLogin Failed")
    }
}

function attach() {
    $("#tasks").fadeOut("fast", function () {
        const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
        const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
        const f = `${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a} ${b.endsWith("ο") ? b.slice(0, -1) + "ε" : b}`
        console.log(f.length)
        if(f.length > 1) {
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