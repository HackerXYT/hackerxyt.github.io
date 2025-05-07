let hasBeenRateLimited = false
function handleRateLimit() {
    console.warn("Rate limit hit. Executing fallback logic...");
    if (!hasBeenRateLimited) {
        EvalertNext({
            title: "Προσοχή",
            description: "Έχεις φτάσει το όριο των αιτημάτων.<br>Προσπάθησε ξανά αργότερα.<br><br><i>Αν βλέπεις συχνά αυτό το μήνυμα, ενδέχεται η IP σου να έχει μπλοκαριστεί λόγω ασυνήθιστης δραστηριότητας.<br>Σε αυτή τη περίπτωση, επικοινώνησε άμεσα με τους διαχειριστές.</i>",
            buttons: ["Εντάξει"],
            buttonAction: [],
            addons: []
        });
        hasBeenRateLimited = true
    }
}

let hasBeenBanned = false
function handleBan(htmlContent) {
    if (!hasBeenRateLimited) {
        EvalertNext({
            title: "Έχεις αποκλειστεί",
            description: htmlContent.replace("\n", "<br>"),
            buttons: ["Εντάξει"],
            buttonAction: [],
            addons: []
        });
        hasBeenBanned = true
    }
}

const originalFetch = window.fetch;
window.fetch = async function (input, init = {}) {
    const method = (init.method || 'GET').toUpperCase();

    const response = await originalFetch(input, init);

    if (method === 'GET' && response.status === 429) {
        handleRateLimit();
    }
    if (method === 'GET' && response.status === 403) {

        const clonedResponse = response.clone();
        const text = await clonedResponse.text();
        console.log('Response text:', text);
        handleBan(text);
    }

    return response;
};


function changeLoadingText(msg) {
    const elem = document.getElementById("loading-text-evox")
    if (elem.classList.contains("fade-in-slide-up")) {
        elem.classList.add("fade-out-slide-down")
        setTimeout(function () {
            elem.classList.remove("fade-in-slide-up")
        }, 100)
        setTimeout(function () {
            elem.classList.remove("fade-out-slide-down")
            elem.classList.add("fade-in-slide-up")
            elem.innerText = msg
        }, 200)
    } else {
        elem.innerText = msg
        elem.classList.add("fade-in-slide-up")
    }
}

let isSocialed = false;
let socialSection = 'none'
let socialUsername = 'none'

function saveLastPage(which) {
    const json = {
        lastActive: which,
        timestamp: Date.now()

    }
    if (which === 'home' || which === 'search' || which === 'discover' || which === 'profile') {
        localStorage.setItem('jeanne_persistance', JSON.stringify(json));
    } else {
        console.error("Invalid app name");
    }
}

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
    console.log("Device is IOS")
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
                changeLoadingText('Επιτυχία')
                document.getElementById("loadText").style.opacity = '1'
                setTimeout(function () {
                    document.getElementById("loadText").style.opacity = '0'
                    setTimeout(function () {
                        const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
                        const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
                        document.getElementById("loadText").innerHTML = `Καλωσόρισες,<br>${transformGreekName(matchedNames[0], 0)} ${transformGreekName(matchedNames[0], 1)}`
                        changeLoadingText(`Καλωσόρισες,<br>${transformGreekName(matchedNames[0], 0)} ${transformGreekName(matchedNames[0], 1)}`)
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


function findFullNames(input, removeFoundName) {
    if (!namesData) {
        fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
            .then(response => response.json())
            .then(names => {
                namesData = names
                findFullNames(input)
            }).catch(error => {
                console.error("Jeanne D'arc Database is offline.")
            });
        return;
    }
    let results = [];

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

    if (removeFoundName) {
        results = results.filter(item => item !== foundName);
    }

    return results;
}

let focusedIconsDictionary = {};

function focusOnIcon(el, act, writer, receiver) { //focusOnIcon(this, 'likeBtn', '${post.emri}', '${post.marresi}')
    const work = el.querySelectorAll("svg path");

    // If previously focused, restore original fills
    if (act === 'likeBtn') {
        fetch(`https://arc.evoxs.xyz/?metode=oneway-precryptox&pin=${atob(JSON.parse(localStorage.getItem('jeanDarc_accountData')).pin)}&emri=${foundName}&id=${writer.replace(" ", "-")}:${receiver.replace(" ", "-")}`)
            .then(response => response.json())
            .then(resultCryptox => {
                console.log(resultCryptox)
                //alert(resultCryptox.count)
                if (resultCryptox.count !== 0) {
                    el.querySelector("p").classList.add("pop")
                    setTimeout(function () {
                        el.querySelector("p").classList.remove("pop")
                    }, 450)
                    el.querySelector("p").innerText = resultCryptox.count || '🤯'
                } else {
                    el.querySelector("p").innerHTML = ''
                }

            }).catch(error => {
                console.error("Jeanne D'arc Database is offline.")
                console.log('Error:', error);
            });
    } else if (act === 'likedLikeBtn') {
        console.log(el)
    }
    if (el.dataset.focusKey) {
        const key = el.dataset.focusKey;
        const savedFills = focusedIconsDictionary[key];



        el.style.transition = "transform 0.3s ease";
        el.style.transform = "scale(1.2)";

        setTimeout(() => {
            el.style.transform = "scale(1)";
            if (savedFills) {
                work.forEach((path, index) => {
                    path.style.transition = "fill 0.3s ease";
                    path.style.fill = savedFills[index];
                });
            }
            // Cleanup
            delete focusedIconsDictionary[key];
            delete el.dataset.focusKey;
        }, 200);


        return;
    }



    // First-time focus: store original fills and highlight
    const originalFills = [];
    const randomString = [...Array(15)].map(() => Math.random().toString(36)[2]).join('');
    el.dataset.focusKey = randomString;

    work.forEach((path, index) => {
        originalFills[index] = path.style.fill || path.getAttribute("fill") || "";
        path.style.transition = "fill 0.3s ease";
        path.style.fill = "#dedede";
    });

    el.style.transition = "transform 0.3s ease";
    el.style.transform = "scale(1.2)";

    focusedIconsDictionary[randomString] = originalFills;

    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 200);
}



function uploadFile() {
    document.getElementById('evox-upload-box').click();
}

let uploadedFiles = [];

function processFile(event, type) {
    const input = document.getElementById('evox-upload-box');
    const files = input.files;
    const container = document.getElementById('evox-media-container');

    if (!files.length) return;

    //container.innerHTML = ''; // Clear previous content
    container.style.marginTop = "10px"
    const beforeData = `<div class="media">
                                <div class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div>`
    const afterData = `</div>`
    document.getElementById("floatingDiv").style.width = "89%"

    const account = localStorage.getItem("jeanDarc_accountData")
    if (!account) {
        alert("Account Not Found")
        return;
    }
    const par = JSON.parse(account)
    const pin = par.pin
    const name = par.name

    if (files.length === 1) {
        container.style.paddingRight = "0"
        const file = files[0];

        const randomString = [...Array(15)]
            .map(() => Math.random().toString(36)[2])
            .join('');

        if (file.type.startsWith('image/')) {
            container.innerHTML += `<div id="file-${randomString}" class="media" style="max-width: 100%; max-height: 360px;">
                                <div id="file-media-${randomString}" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div><img src="${URL.createObjectURL(file)}" style="max-width: 100%; max-height: 360px;">${afterData}`;
        } else if (file.type.startsWith('video/')) {
            container.innerHTML += `<div id="file-${randomString}" class="media" style="max-width: 100%; max-height: 360px;">
                                <div id="file-media-${randomString}" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div><video src="${URL.createObjectURL(file)}" style="max-width: 100%; max-height: 360px;" controls autoplay muted loop playsinline></video>${afterData}`;
        } else {
            return;
        }
        const fileType = file.name.split('.').pop();
        console.log('File Type:', fileType);

        const reader = new FileReader();
        reader.onload = function (el) {
            const base64String = el.target.result;

            //console.log(base64String);

            fetch(`https://arc.evoxs.xyz/uploadFile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    method: 'uploadFile',
                    name: name,
                    pin: pin,
                    file: base64String,
                    fileType: fileType
                })
            })
                .then(response => response.json())
                .then(data => {
                    document.getElementById(`file-media-${randomString}`).style.display = 'none'
                    //alert(data.file)
                    uploadedFiles.push({
                        server: data.server,
                        name: data.file,
                        type: data.fileType
                    })
                })
                .catch(error => {
                    console.error("Media upload error:", error);
                    document.getElementById(`file-media-${randomString}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM9.37735 4.66136C10.5204 2.60393 13.4793 2.60393 14.6223 4.66136L21.2233 16.5431C22.3341 18.5427 20.8882 21 18.6008 21H5.39885C3.11139 21 1.66549 18.5427 2.77637 16.5431L9.37735 4.66136Z"
                    fill="#fffb47" />
            </svg>`
                });
        };

        reader.readAsDataURL(file);
    } else {
        container.style.paddingRight = "30%"
        Array.from(files).forEach(file => {
            const randomString = [...Array(15)]
                .map(() => Math.random().toString(36)[2])
                .join('');
            if (file.type.startsWith('image/')) {
                container.innerHTML += `<div id="file-${randomString}" class="media" style="max-width: 100%; max-height: 360px;">
                                <div id="file-media-${randomString}" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div><img src="${URL.createObjectURL(file)}" style="max-width: 100%; max-height: 360px;">${afterData}`;
            } else if (file.type.startsWith('video/')) {
                container.innerHTML += `<div id="file-${randomString}" class="media" style="max-width: 100%; max-height: 360px;">
                                <div id="file-media-${randomString}" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div><video src="${URL.createObjectURL(file)}" style="max-width: 100%; max-height: 360px;" controls autoplay muted loop playsinline></video>${afterData}`;
            } else {
                return;
            }
            const fileType = file.name.split('.').pop();
            console.log('File Type:', fileType);

            const reader = new FileReader();
            reader.onload = function (el) {
                const base64String = el.target.result;

                //console.log(base64String);

                fetch(`https://arc.evoxs.xyz/uploadFile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        method: 'uploadFile',
                        name: name,
                        pin: pin,
                        file: base64String,
                        fileType: fileType
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById(`file-media-${randomString}`).style.display = 'none'
                        uploadedFiles.push({
                            server: data.server,
                            name: data.file,
                            type: data.fileType
                        })
                        //alert(data.file)
                    })
                    .catch(error => {
                        console.error("Media upload error:", error);
                        document.getElementById(`file-media-${randomString}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="42px" height="42px" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M11 13C11 13.5523 11.4477 14 12 14C12.5523 14 13 13.5523 13 13V10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10V13ZM13 15.9888C13 15.4365 12.5523 14.9888 12 14.9888C11.4477 14.9888 11 15.4365 11 15.9888V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V15.9888ZM9.37735 4.66136C10.5204 2.60393 13.4793 2.60393 14.6223 4.66136L21.2233 16.5431C22.3341 18.5427 20.8882 21 18.6008 21H5.39885C3.11139 21 1.66549 18.5427 2.77637 16.5431L9.37735 4.66136Z"
                    fill="#fffb47" />
            </svg>`
                    });
            };

            reader.readAsDataURL(file);
        });
    }

    Array.from(files).forEach(file => {
        console.log(file)

    })
}

function sendFile(e, up) {
    console.log(up === 'upload' && sessionStorage.getItem("current_sline") && localStorage.getItem("t50-username"))
    if (e) {

        setTimeout(function () {
            document.getElementById("secureline-upload-box").click()
        }, 450)
    } else if (up === 'upload' && sessionStorage.getItem("current_sline") && localStorage.getItem("t50-username")) {

        const input = document.getElementById('evox-upload-box');
        const file = input.files[0];

        if (file) {
            // Extract the file type (extension)
            const fileType = file.name.split('.').pop(); // Get the part after the last dot
            console.log('File Type:', fileType);


            const reader = new FileReader();
            reader.onload = function (el) {
                const base64String = el.target.result;

                //console.log(base64String);

                fetch(`https://data.evoxs.xyz/secureline`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        method: 'uploadFile',
                        username: localStorage.getItem("t50-username"),
                        recipient: sessionStorage.getItem("current_sline"),
                        file: base64String,
                        fileType: fileType
                    })
                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data);
                        alert(`Req Complete ${data}`)
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
        console.warn("Secureline instance not found")
    }
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
    //if (navigator.userAgent.toLowerCase().includes('android')) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
    //}
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
    const safeAreaTop = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-top)') || 0);

    if (safeAreaTop === 0) {
        // Do something
        document.querySelector(".notch-hidden").style.display = 'none'
    }

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
    if (window.innerWidth > 768 && localStorage.getItem("devBypass")) {
        //console.log("This is not a mobile device");
        //$("#tasks").fadeOut("fast", function () {
        $("#loginContainer").fadeOut("fast", function () {
            $("#device-warning").fadeIn("fast")
            $("#hexa").fadeOut('fast')
        })

        //})

    } else if (spammingDetected === 'REMOVEFORSTABLE') {
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
                    //changeLoadingText('Αναγνωριστικό έτοιμο')

                    fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
                        .then(response => response.json())
                        .then(names => {
                            namesData = names

                            setTimeout(function () {

                                document.getElementById("loadText").innerText = 'Έγινε σύνδεση'
                                changeLoadingText('Επιτυχία')
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
                            changeLoadingText(`Η σύνδεση απέτυχε.<br>Περιμένετε..`)
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Περιμένετε..`
                            changeLoadingText(`Η σύνδεση απέτυχε.<br>Περιμένετε..`)

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

function informacion(emri) {
    return new Promise((resolve, reject) => {
        const info = informacionDictionary[emri];
        if (info) {
            resolve(info);
        } else {
            reject(new Error("Informacion not found"));
        }
    });
}

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
            document.getElementById(`ps1`).classList.add("active")
            //document.getElementById("ps1").style.width = "10px"
            //document.getElementById("ps1").style.height = "10px"
        } else if (pin.length >= 1 && pin.length <= 3) {
            const id = pin.length + 1
            try {
                document.getElementById(`ps${id}`).classList.add("active")
                //document.getElementById(`ps${id}`).style.width = "10px"
                //document.getElementById(`ps${id}`).style.height = "10px"
            } catch (error) {
                console.error("Error:", error)
            }

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
                                hasLoginFailed = false
                                fetch('allowedUsers.evox')
                                    .then(response => response.json())
                                    .then(status => {
                                        if (!status.includes(foundName)) {
                                            window.location.href = "deny.html"
                                        }
                                    }).catch(error => {
                                        console.log('Error:', error);
                                    });
                                console.log("Access Granted to", foundName)

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
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Περιμένετε..`
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
                                hasLoginFailed = false
                                fetch('allowedUsers.evox')
                                    .then(response => response.json())
                                    .then(status => {
                                        if (!status.includes(foundName)) {
                                            window.location.href = "deny.html"
                                        }
                                    }).catch(error => {
                                        console.log('Error:', error);
                                    });
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
                            document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Περιμένετε..`
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
                                                            document.getElementById("navigation").classList.add("active")
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
                                document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Περιμένετε..`
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
let informacionDictionary = {}
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
            if (foundName.includes("παποστόλ") || foundName.includes("Λιλάντα") || foundName.includes("Γερακιανάκη")) {
                document.getElementById("admin-preview").style.display = null
            }
            //const color = getGender(foundName.split(" ")[0]) === "Male" ? "#298ef2" : "Female"
            if (getGender(removeTonos(foundName.split(" ")[0])) === "Female") {
                document.documentElement.style.setProperty('--color-theme', '#ae6cff');
                document.documentElement.style.setProperty('--color-theme', '#fff');
                document.documentElement.style.setProperty('--color-theme-light', '#bf8bff');
                document.documentElement.style.setProperty('--color-theme-select', '#ae6cff55');

            }
            const process = atob(json.pin)
            //fetch(`https://arc.evoxs.xyz/?metode=getProgress&emri=${foundName}&pin=${process}`)
            //    .then(response => response.json())
            //    .then(complete => {
            //        const progress = complete.progress
            //        document.getElementById("title-progress").innerHTML = complete.title
            //        document.getElementById("desc-progress").innerHTML = complete.desc
            //        console.log("Progress Success!", complete)
            //        document.getElementById("percentage").innerText = progress
            //        document.getElementById("progress-ring").style = `--progress: ${progress.replace("%", "")};`
            //    }).catch(error => {
            //        console.error("Progress error", error)
            //    });
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
                        hasLoginFailed = false
                        fetch('allowedUsers.evox')
                            .then(response => response.json())
                            .then(status => {
                                if (!status.includes(foundName)) {
                                    window.location.href = "deny.html"
                                }
                            }).catch(error => {
                                console.log('Error:', error);
                            });
                        console.log("Access Granted to", foundName)
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
                            fetch(`https://arc.evoxs.xyz/?metode=completeInformacion`)
                                .then(response => response.json())
                                .then(dictionary => {
                                    informacionDictionary = dictionary
                                    setTimeout(function () {
                                        attach()
                                    }, 1000)
                                }).catch(error => {
                                    console.log("informacion failed", error)
                                })

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
                    document.getElementById("loadText").innerHTML = `Η σύνδεση απέτυχε.<br>Περιμένετε..`
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

let myInfo = null
function attach() {
    downloadProfiles()
    if (!sessionStorage.getItem("betaSession")) {
        //return;
        //EvalertNext({
        //    "title": "Καλωσόρισες ξανά 👋",
        //    "description": "Μπορείς πλέον να δημιουργήσεις περίληψη των καταχωρήσεων σου χωρίς να καταλάβεις ποιος έγραψε τι.",
        //    "buttons": ["Συνέχεια"],
        //    "buttonAction": [],
        //    "addons": [
        //        {
        //            "icon": "lock",
        //            "title": "Evox AIT",
        //            "desc": "Παραχωρήθηκε πρόσβαση."
        //        },
        //        {
        //            "icon": "jeanne:logo",
        //            "title": "Jeanne d'Arc",
        //            "desc": "Ο λογαριασμός ενημερώθηκε."
        //        }
        //    ]
        //})
        sessionStorage.setItem("betaSession", 'true')
    }



    if (!sessionStorage.getItem('isNewUser')) {
        document.getElementById("welcmtxt").innerHTML = `Καλώς ήρθες ξανά 👋`
        changeLoadingText(`Καλώς ήρθες ξανά 👋`)
    } else {
        changeLoadingText(`Καλώς ήρθες!`)
    }
    document.getElementById("gradColored").style.opacity = '1'
    if (atob(JSON.parse(localStorage.getItem("jeanDarc_accountData")).pin) === '0000') {
        console.log("Request PIN Change")
        //document.getElementById("notice").classList.add("active")
        document.getElementById("pin-notice").classList.add("active")
        //document.body.style.overflow = "hidden"
        //setTimeout(function () {
        //document.getElementById("app").style.opacity = "0.7"
        //document.getElementById("app").style.transform = "scale(0.97)"
        //}, 500)
        showNotice()

    }
    document.body.style.backgroundColor = '#101010'//'rgb(5,2,16)'
    //return;
    $("#hexa").fadeOut("fast", function () {
        $("#tasks").fadeOut("fast")
        document.getElementById("name-sur-view").innerText = foundName
        const a = foundName.split(' ')[0].replace(/[σς]+$/, '')
        const b = foundName.split(' ')[1].replace(/[σς]+$/, '')
        const f = `${a.endsWith("ο") ? a.slice(0, -1) + "ε" : a} ${b.endsWith("ο") ? b.slice(0, -1) + "ε" : b}`
        //console.log(f.length)
        if (f.length > 1) {

            document.getElementById("emri").innerText = `${transformGreekName(foundName, 0)}`

        } else {
            document.getElementById("emri").innerText = `${transformGreekName(foundName, 0)} ${transformGreekName(foundName, 1)}`
        }



        $("#app").fadeIn("fast")
        document.getElementById("navigation").classList.add("active")

    })

    if (localStorage.getItem("jeanne_persistance")) {
        const persistance = JSON.parse(localStorage.getItem("jeanne_persistance"));
        if (persistance) {
            const open = persistance.lastActive;
            if (open === 'search') {
                openSearch(document.getElementById("search-switch"))
            } else if (open === 'discover') {
                openDiscovery(document.getElementById("discovery-switch"))
            } else if (open === 'profile') {
                openProfile(document.getElementById("profile-switch"))
            }
        }
    }

    spawnRandom()

    informacion(foundName)
        .then(info => {
            myInfo = info
        })

    //seksioni->

}

function scrollOneItemUp(element) {
    document.getElementById(element).scrollIntoView({ behavior: "smooth" });
}


let hasCurrentSixLoaded = true;
async function spawnRandom(redo, frontEndLoading) {
    const lc = localStorage.getItem("jeanDarc_accountData");
    if (!lc) return;

    const pars = JSON.parse(lc);
    const pin = atob(pars.pin);
    hasCurrentSixLoaded = false;
    const j = 6
    let skel = ''
    for (let i = 0; i < j; i++) {
        skel += `<div class="postContainer skel loading" style="padding-bottom: 10px;padding-top: 10px;">
                        <div class="post">
                            <div style="display: flex;flex-direction: row;">
                                <div class="profilePicture">
                                    <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                </div>
                                <div class="postInfo">
                                    <div class="userInfo">
                                        <p class="skeleton"></p>
                                        <span class="skeleton"></span>
                                    </div>
                                    <div class="postContent">
                                       <p class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>`
    }
    if (!redo) {
        document.getElementById("foryou").innerHTML = skel;
    }


    try {
        const response = await fetch(`https://arc.evoxs.xyz/?metode=randomPost&emri=${foundName}&pin=${pin}&id=6`);
        const ranData = await response.text();

        //console.log("randata:", ranData)
        if (ranData !== 'Denied') {
            const data = JSON.parse(ranData);
            let icount = 0
            for (const post of data) {
                icount++

                if (redo) {
                    const children = document.getElementById("foryou").querySelectorAll("div.postContainer"); // Ensure selecting only relevant containers

                    children.forEach((child, index) => {
                        console.log(`Div ${index + 1}:`, child);

                        const userInfo = child.querySelector('.post .postInfo .userInfo p');
                        const mentionInfo = child.querySelector('.post .postInfo .postContent p span');

                        if (userInfo && mentionInfo) { // Ensure elements exist before accessing properties
                            if (userInfo.innerText === post.emri && mentionInfo.innerText === `@${post.marresi}`) {
                                console.log("User:", post.emri, post.marresi, "is already spawned!");
                                return;
                            }
                        } else {
                            console.warn("Missing userInfo or mentionInfo in:", child);
                        }
                    });
                }

                //post.emri .. the refferer
                const profileSrc = await getImage(post.emri); //the image of the person reffered
                const pfp = await getEvoxProfile(post.emri);

                let src = pfp;

                if (profileSrc) {
                    src = profileSrc.imageData;
                }

                //await fetchAndSaveImage(post.emri, pfp);

                const profileReceiver = await getImage(post.marresi); //the image of the person reffered
                const pfp_receiver = await getEvoxProfile(post.marresi);

                let src2 = pfp_receiver;

                if (profileReceiver) {
                    src2 = profileReceiver.imageData;
                }


                //await fetchAndSaveImage(post.marresi, pfp_receiver); evoxnew


                //

                let usersMore = post.fullNames
                let srcs = []
                for (let i = 0; i < 3; i++) {
                    const userId = Math.floor(Math.random() * usersMore.length)
                    const userd = await getImage(usersMore[userId]);
                    const userPfp = await getEvoxProfile(usersMore[userId]);
                    let srcd = userd ? userd.imageData : userPfp
                    usersMore = usersMore.filter(student => student !== usersMore[userId]);
                    srcs.push(srcd)
                }
                //await fetchAndSaveImage(post.marresi, pfp_receiver);
                if (post === data[0]) {
                    const children = document.getElementById("foryou").querySelectorAll("div.postContainer.skel"); // Ensure selecting only relevant containers

                    children.forEach((child, index) => {
                        child.remove()
                    });
                }

                if (document.getElementById("scrollToMe")) {
                    document.getElementById("scrollToMe").id = ""
                }

                const cleaned = post.vleresim.replace(/@(\w+\s\w+)/g, (match, name) => `<vox onclick="extMention('${name}')" class="mention ${getGender(removeTonos(name.split(" ")[0])) === "Female" ? "female" : "male"}">@${name}</vox>`);
                //'Spawning ForYou', post.emri
                const randomString = [...Array(15)]
                    .map(() => Math.random().toString(36)[2])
                    .join('');
                document.getElementById("foryou").innerHTML += `<div ${icount === 1 ? `id="scrollToMe"` : ""} class="postInput" style="margin-bottom:10px;padding-bottom: 0;">
            <div class="profilePicture-in">
                <img src="${src}">
                <div class="line-x"></div>
               <div class="morePfps">
                <img class="small" src="${srcs[0]}" alt="Profile 1">
                <img class="small" src="${srcs[1]}" alt="Profile 2">
                <img class="small" src="${srcs[2]}" alt="Profile 3">
               </div>
                
            </div>
            <div class="input-post">
                <p onclick="extMention('${post.emri}')">${post.emri}<span style="font-size: 11.5px;color: #808080;padding: 0 5px;">${timeAgoInGreek(post.date)}</span></p>
                
                <div class="text-area-cont" style="position: relative;">
                    <p style="color: #fff;font-weight: 100;font-size: 14px;margin-top: 5px;">
                        <vox onclick="extMention('${post.marresi}')" class="mention ${getGender(removeTonos(post.marresi.split(" ")[0])) === "Female" ? "female" : "male"}">@${post.marresi}</vox>
                        ${cleaned}
                    </p>
                </div>
                
                <div class="icons">
                    <div id="${randomString}" onclick="focusOnIcon(this, 'likeBtn', '${post.emri}', '${post.marresi}')" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        ${post.likes ? post.likes.count ? `<p class='pop-text'>${post.likes.count}</p>` : "<p class='pop-text'></p>" : "<p class='pop-text'></p>"}
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 0 24 24"><path d="M12,2a10,10,0,1,0,4.924,18.7l3.76,1.253A1.014,1.014,0,0,0,21,22a1,1,0,0,0,.948-1.316L20.7,16.924A9.988,9.988,0,0,0,12,2Zm6.653,15.121.766,2.3-2.3-.766a.994.994,0,0,0-.851.1,8.02,8.02,0,1,1,2.488-2.488A1,1,0,0,0,18.653,17.121Z"/></svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
</svg>
                    </div>
                    
                </div>
                <div class="addmore">   
                +${post.fullNames.length} επιπλέον ${post.fullNames.length === 1 ? "αναφορά" : "αναφορές"}
                </div>
            </div>
        </div>`

                if (post.likes && post.likes.liked.includes(foundName)) {
                    focusOnIcon(document.getElementById(randomString), 'likedLikeBtn')
                }
                if (icount === 1) {
                    //scrollOneItemUp(document.getElementById("scrollToMe"));
                }

            }
            if (frontEndLoading) {
                isLoading2 = false;
                loadingIndicatorFy.style.opacity = "0";
                loadingIndicatorFy.classList.remove("scaleUp")

            }
            hasCurrentSixLoaded = true;
        } else {
            document.getElementById("foryou").innerHTML = `
                    <div class="postContainer" style="padding-bottom: 10px;padding-top: 10px;">
                        <div class="post">
                            <div class="profilePicture">
                                <img src="../evox-epsilon-beta/epsilon-assets/android-chrome-512x512.png">
                            </div>
                            <div class="postInfo">
                                <div class="userInfo">
                                    <p>Evox</p>
                                    <span>μόλις τώρα</span>
                                </div>
                                <div class="postContent">
                                    <p>
                                    <vox onclick="extMention('${foundName}')" class="mention ${getGender(removeTonos(foundName.split(" ")[0])) === "Female" ? "female" : "male"}">@${foundName}</vox><br>
                                    Δεν μπορείς να δεις τις δημόσιες αναρτήσεις ακόμα, δοκίμασε ξανά σε λίγες μέρες ή ζήτα πρόσβαση από τους διαχειριστές.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>`;
            hasCurrentSixLoaded = true;
        }
    } catch (error) {
        console.error("Jeanne D'arc Database is offline.");
        console.log('Error:', error);
        setTimeout(function () {
            spawnRandom(true)
        }, 400)
        hasCurrentSixLoaded = true;
    }
}



function downloadProfiles() {
    fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
        .then(response => response.json())
        .then(names => {
            namesData = names
            const fullNames = Object.keys(names.names);
            //console.log(fullNames)
            let downloaded = 0
            fullNames.forEach(name => {
                getImage(name, 'DONTMAKENEWAJAX').then(profileSrc => {
                    if (profileSrc) {
                        downloaded++
                    } else {
                        getImage(name).then(profileSrc_0 => {
                            const checkDl = setInterval(function () {
                                getImage(name, 'DONTMAKENEWAJAX').then(profileSrc => {
                                    if (profileSrc) {
                                        downloaded++
                                        clearInterval(checkDl)
                                    }
                                });
                            }, 1500)
                        });

                    }

                });

            })
            let runned = false;
            const intmain = setInterval(function () {
                const all = fullNames.length
                //current = downloaded
                const percentage = Number.parseInt((downloaded * 100) / all)
                //document.getElementById("downloaded").innerHTML = percentage + "%"
                //console.log(percentage)
                if (percentage === 100 && runned === true && !localStorage.getItem("profilesDlOk")) {
                    localStorage.setItem("profilesDlOk", "200")
                    console.warn("All profiles are downloaded")
                    EvalertNext({
                        "title": "Η λήψη ολοκληρώθηκε με επιτυχία",
                        "description": "Τα απαιτούμενα δεδομένα έχουν ληφθεί.<br>Οι λειτουργίες της εφαρμογής θα εκτελούνται πλέον πιο γρήγορα.",
                        "buttons": ["Συνέχεια"],
                        "buttonAction": [],
                        "addons": []
                    })
                    clearInterval(intmain)
                } else if (runned === false && !localStorage.getItem("profilesDlOk")) {
                    EvalertNext({
                        "title": `Γίνεται λήψη δεδομένων.`,
                        "description": "Η εφαρμογή ίσως είναι πιο αργή όσο γίνεται αυτό. Θα ειδοποιηθείς μόλις όλα είναι έτοιμα.",
                        "buttons": ["Εντάξει"],
                        "buttonAction": [],
                        "addons": [
                        ]
                    })
                    runned = true;
                }
            }, 200)


        }).catch(error => {
            console.error("Jeanne D'arc Database is offline.")
            console.log('Error:', error);
        });

}


let foryoudiv = document.getElementById("home");
let loadingIndicatorFy = document.getElementById("loadingIndicator-fy");
let isLoading2 = false; // Prevent multiple triggers

foryoudiv.addEventListener("scroll", function () {
    if (isLoading2) return;

    // Check if user scrolled to the bottom
    if (foryoudiv.scrollTop + foryoudiv.clientHeight >= foryoudiv.scrollHeight - 10) {
        if (hasCurrentSixLoaded === false) {
            console.log("Still loading previous data, aborting new load")
            return;
        }
        isLoading2 = true;
        loadingIndicatorFy.classList.add("scaleUp")
        loadingIndicatorFy.style.opacity = "1";

        setTimeout(() => {
            console.log("triggering more load")
            spawnRandom(true, "loadingActive")

            isLoading2 = false;
            loadingIndicatorFy.style.opacity = "0";
            loadingIndicatorFy.classList.remove("scaleUp")
        }, 1500);
    }
});

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
        document.getElementById(`ps1`).classList.remove('active')
        //document.getElementById("ps1").style.width = "5px"
        //document.getElementById("ps1").style.height = "5px"
    } else if (pin.length >= 1 && pin.length <= 4) {
        document.getElementById(`ps${pin.length}`).classList.remove('active')
        //document.getElementById(`ps${pin.length}`).style.width = "5px"
        //document.getElementById(`ps${pin.length}`).style.height = "5px"
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
function changePin(e, event, newMetode) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    getEvoxProfile(foundName).then(profileSrc => {
        document.getElementById('userPinPfp').src = profileSrc
    });
    if (newMetode) {
        document.getElementById("pin-notice").classList.remove("active")
        setTimeout(function () {
            document.getElementById("pin-notice").style.display = 'none'
        }, 300)
    }
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
                        document.getElementById("mySeksioni").innerText = `${classmatesCount} ${classmatesCount > 1 ? "συμμαθητές" : "συμμαθήτρια"}` //${seksioniData.seksioni}${seksioniData.klasa !== "none" ? seksioniData.klasa : ""}
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
                        return informacion(name)
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
            <p onclick="extMention('${inform.emri}')">${inform.emri}</p>
        </div>
    </div>`;

                                    const tempImage = new Image();
                                    tempImage.src = inform.foto + '?size=minimum';
                                    //fetchAndSaveImage(inform.emri, inform.foto)

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
        //fetchAndSaveImage(inform.emri, usersElems[pickedStudents[activeStudent]].info.foto)
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
                                    //reloadProgress();
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
                                //reloadProgress();
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
                                    //reloadProgress()
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

async function getEvoxProfile(name) {
    if (name === null) { return; }
    //console.log("Getting pfp for", name);
    async function rn() {
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
            //console.log(match)
            if (match) {
                const extracted = match[1];
                socialUsername = extracted;
                if (name === foundName) {
                    document.getElementById("instausername-SELF").innerText = socialUsername
                    document.getElementById("isInstagramed").style.display = null
                }

            } else {
                console.log("No match found");
                if (name === foundName) {
                    document.getElementById("isInstagramed").style.display = 'none'
                }
            }
            localStorage.setItem(`ProfileSrc_${name}`, data)
            //fetchAndSaveImage(name, data)
            return data;
        } else {
            const returning = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${name}_jeanDarc`
            localStorage.setItem(`ProfileSrc_${name}`, `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${name}_jeanDarc`)
            //fetchAndSaveImage(name, returning)
            return returning;  // Return default fallback URL
        }
    }
    try {
        if (localStorage.getItem(`ProfileSrc_${name}`)) {
            return localStorage.getItem(`ProfileSrc_${name}`);
        } else {
            return await rn()
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
                informacion(name)
                    .then(info => {
                        document.getElementById("socialSpawn").innerHTML += `<div class="socialUser">
                <img class="slUserPFP social"
                    src="${info.foto}">
                <p>${info.emri}</p><span>${info.seksioni}${info.klasa !== 'none' ? "'" + info.klasa : ""}</span> <!--->
            </div>`


                    })

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

function closePostCreate(frontend) {
    document.body.style.overflow = null;

    document.getElementById("app").style.transform = null;
    document.getElementById("gradColored").style.opacity = null;
    document.getElementById("gradColored").style.borderRadius = null;
    document.getElementById("gradColored").style.transform = null;
    document.getElementById("app").style.opacity = null;
    document.body.style.backgroundColor = null;
    footer.style.display = 'none'
    function finalize(frn) {

        if (!frn) {
            document.getElementById("createPost").style.transform = '';
            document.getElementById("createPost").classList.remove("active");

        } else {
            document.getElementById("createPost").style.transform = 'translateY(100vh)';
            setTimeout(function () {
                document.getElementById("createPost").classList.remove("active");
                setTimeout(function () {
                    document.getElementById("createPost").style.transform = null;
                }, 200)
            }, 450)
        }
    }
    if (frontend) {
        finalize(true)
    } else {
        setTimeout(function () {
            finalize()
        }, 500);
    }


    document.getElementById("input-textarea").blur()
    document.getElementById("hidden-input").blur()

}

function hideSocial() {
    document.getElementById("social").classList.remove("active")
}

function grabberEvents(id) {
    const notice = document.getElementById(id);
    let startY, currentY, isDragging = false, moved = false;

    // Initialize event listeners for touch/mouse events
    notice.addEventListener("mousedown", startDrag);
    notice.addEventListener("touchstart", startDrag, { passive: true });
    notice.addEventListener("mousemove", drag);
    notice.addEventListener("touchmove", drag, { passive: true });
    notice.addEventListener("mouseup", endDrag);
    notice.addEventListener("touchend", endDrag);

    function startDrag(e) {
        if (notice.scrollTop > 0) {
            // Prevent drag if the user has scrolled down
            return;
        }

        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = true;
        moved = false; // Reset movement flag
        notice.style.transition = "none"; // Disable transitions for smooth dragging
    }

    function drag(e) {
        if (!isDragging) return;

        currentY = e.touches ? e.touches[0].clientY : e.clientY;
        let deltaY = currentY - startY;

        if (Math.abs(deltaY) > 30) {
            moved = true; // Only consider as dragging if movement exceeds 10px
        }

        if (deltaY > 0 && notice.scrollTop === 0) {
            notice.style.transform = `translateY(${deltaY}px)`;
        }
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        notice.style.transition = "transform 0.3s ease";

        if (!moved) {
            // If the user tapped but didn't drag, don't close
            notice.style.transform = ``;
            return;
        }

        if (currentY - startY > 150 && notice.scrollTop === 0) {
            notice.style.transform = `translateY(100vh)`;

            if (id === 'notice') {
                document.body.style.overflow = null;
                document.getElementById("app").style.transform = "";
                document.getElementById("app").style.opacity = "1";
            }

            if (id === 'classChange') {
                document.body.style.overflow = null;
                document.getElementById("app").style.transform = "";
                document.getElementById("app").style.opacity = "1";
                document.getElementById("profilePage").style.transform = "";
                document.getElementById("profilePage").style.opacity = "1";
            }

            if (id === 'createPost') {
                closePostCreate();
            }

            if (id === 'share-profile') {
                document.getElementById("share-profile").classList.remove("active");
            }

            notice.addEventListener("transitionend", () => {
                notice.classList.remove("active");
                notice.style.transform = ``;
            }, { once: true });
        } else {
            notice.style.transform = ``; // Reset if not dismissed
        }
    }
}

grabberEvents("share-profile")

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
        return;
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
            document.getElementById("navigation").classList.add("active")
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
            informacion(part)
                .then(info => {
                    el.innerHTML += `<div onclick="addFromSearch('${info.emri}', this)" class="aStudent fade-in-slide-up ${pickedStudents.includes(info.emri) ? "picked" : ""}">
                    <div class="studentImage">
                        <img src="${info.foto}">
                    </div>
                    <div class="studentInfo">
                        <p onclick="extMention('${info.emri}')">${info.emri}</p>
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
let classmatesCount = 0
let classMates_class = null
async function getRandomClassmates(foundName) {
    try {
        const response = await fetch('https://arc.evoxs.xyz/?metode=merrniEmrat');
        const namesData = await response.json();
        const fullNames = Object.keys(namesData.names);
        let selfClass = null;
        const allUsers = {};
        const classes = {};

        // Fetch information for each user
        await Promise.all(fullNames.map(async name => {
            try {
                const info = await informacion(name);

                if (info.emri !== foundName) {
                    allUsers[info.emri] = info;
                } else {
                    selfClass = `${info.seksioni}${info.klasa}`;
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        }));

        // Organize users into classes
        Object.values(allUsers).forEach(user => {
            const classKey = `${user.seksioni}${user.klasa}`;
            if (!classes[classKey]) {
                classes[classKey] = [];
            }
            classes[classKey].push(user);
        });

        if (!selfClass || !classes[selfClass]) {
            return [];
        }

        classmatesCount = classes[selfClass].length;
        classMates_class = classes

        // Filter users from the same class (excluding self)
        let classUsers = classes[selfClass].filter(user => user.emri !== foundName);

        // Remove users with restricted icons
        classUsers = classUsers.filter(user => !user.foto.includes("data.evoxs.xyz"));

        if (classUsers.length < 3) {
            let fallback = []
            classUsers.forEach(user => {
                fallback.push({
                    name: user.emri,
                    icon: user.foto ? user.foto + '?size=minimum' : 'https://example.com/default-icon.png',
                    class: selfClass
                })
            })
            return fallback;
        }

        // Shuffle and pick 3 random users
        classUsers.sort(() => Math.random() - 0.5);
        const randomUsers = classUsers.slice(0, 3).map(user => ({
            name: user.emri,
            icon: user.foto ? user.foto + '?size=minimum' : 'https://example.com/default-icon.png',
            class: selfClass
        }));

        return randomUsers;
    } catch (error) {
        console.error("Error fetching classmate data:", error);
        return [];
    }
}
function timeAgoInGreek(isoDate) {
    const timeUnits = [
        { name: "δευτ.", plural: "δευτ.", value: 60 },
        { name: "λεπτό", plural: "λεπτά", value: 60 },
        { name: "ώρα", plural: "ώρες", value: 24 },
        { name: "μέρα", plural: "μέρες", value: 7 },
        { name: "εβδ.", plural: "εβδ.", value: 4.35 },
        { name: "μήνα", plural: "μήνες", value: 12 },
        { name: "χρόνος", plural: "χρόνια", value: Infinity }
    ];

    const past = new Date(isoDate);
    const now = new Date();
    let diff = Math.floor((now - past) / 1000); // Difference in seconds

    for (const unit of timeUnits) {
        if (diff < unit.value) {
            const count = Math.floor(diff);
            return `${count} ${count === 1 ? unit.name : unit.plural}`;
        }
        diff /= unit.value;
    }
}

function loadSentByUser() {
    document.getElementById("sentByUser").innerHTML = `<div class="postContainer skel loading" style="padding-bottom: 10px;padding-top: 10px;">
                        <div class="post">
                            <div style="display: flex;flex-direction: row;">
                                <div class="profilePicture">
                                    <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                </div>
                                <div class="postInfo">
                                    <div class="userInfo">
                                        <p class="skeleton"></p>
                                        <span class="skeleton"></span>
                                    </div>
                                    <div class="postContent">
                                       <p class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="postContainer skel loading">
                        <div class="post">
                            <div style="display: flex;flex-direction: row;">
                                <div class="profilePicture">
                                    <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                </div>
                                <div class="postInfo">
                                    <div class="userInfo">
                                        <p class="skeleton"></p>
                                        <span class="skeleton"></span>
                                    </div>
                                    <div class="postContent">
                                        <p class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="postContainer skel loading">
                        <div class="post">
                            <div style="display: flex;flex-direction: row;">
                                <div class="profilePicture">
                                    <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                </div>
                                <div class="postInfo">
                                    <div class="userInfo">
                                        <p class="skeleton"></p>
                                        <span class="skeleton"></span>
                                    </div>
                                    <div class="postContent">
                                        <p class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="postContainer skel loading">
                        <div class="post">
                            <div style="display: flex;flex-direction: row;">
                                <div class="profilePicture">
                                    <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                </div>
                                <div class="postInfo">
                                    <div class="userInfo">
                                        <p class="skeleton"></p>
                                        <span class="skeleton"></span>
                                    </div>
                                    <div class="postContent">
                                        <p class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>`
    const account_data = localStorage.getItem("jeanDarc_accountData")
    if (!account_data) {
        console.error("Llogaria nuk eshte ruajtur ne nivel lokal!?")
        return;
    }


    async function spawnIn(sentbyuser, local) {
        let html = ''
        const profileSrc = await getImage(foundName);
        const pfp = await getEvoxProfile(foundName);

        let src = pfp; // Default to the pfp value from getEvoxProfile
        //console.log('Profile image fetched:', profileSrc);

        if (profileSrc) {
            src = profileSrc.imageData; // If profile image is available, use it.
        }

        //fetchAndSaveImage(foundName, pfp);
        // Assuming getImage and getEvoxProfile are asynchronous functions that return promises.
        Promise.all(
            sentbyuser.map(async (sent) => {
                //console.log("Sent By User:", sent)
                // Wait for both image and profile data to be fetched.
                //const profileSrc = await getImage(sent.marresi);
                //const pfp = await getEvoxProfile(sent.marresi);
                //let src = pfp; // Default to the pfp value from getEvoxProfile
                //console.log('Profile image fetched:', profileSrc);
                //if (profileSrc) {
                //    src = profileSrc.imageData; // If profile image is available, use it.
                //}
                //fetchAndSaveImage(sent.marresi, pfp);
                // Build the HTML for the post.
                const regex = /%img:server\((.*?)\):mediaId\((.*?)\):mediaType\((.*?)\)%/g;
                const postFiles = [];
                let match;
                while ((match = regex.exec(sent.contents.vleresim)) !== null) {
                    postFiles.push({ server: match[1], id: match[2], type: match[3] });
                }
                const cleanText = sent.contents.vleresim.replace(regex, '');
                if (postFiles.length > 0) {
                    //console.log("postFiles:", postFiles);
                    //console.log("cleanText:", cleanText.trim());
                }
                let media = ''
                const acc = JSON.parse(account_data)
                let hasMedia = false
                postFiles.forEach(async (file) => {
                    hasMedia = true
                    media += `<div class="media" style="max-width: 100%; max-height: 360px;">
                                <div style="display:none" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div>
                                <${file.type === 'image' ? "img" : file.type === 'video' ? "video" : "img"} src="${file.server.includes("Jeanne") ? `https://cdn.evoxs.xyz/jeannedarc/${foundName}/${file.id}/all` : `https://arc.evoxs.xyz/?metode=getFile&emri=${foundName}&requestor=${foundName}&pin=${btoa(acc.pin)}&id=${file.id}`}" style="max-width: 100%; max-height: 360px;" ${file.type === 'video' ? "controls autoplay muted loop playsinline" : ""}>${file.type === 'video' ? "</video>" : ""}</div>`
                })

                const cleaned = cleanText.trim().replace(/@(\w+\s\w+)/g, (match, name) => `<vox onclick="extMention('${name}')" class="mention ${getGender(removeTonos(name.split(" ")[0])) === "Female" ? "female" : "male"}">@${name}</vox>`);
                const randomString = [...Array(15)]
                    .map(() => Math.random().toString(36)[2])
                    .join('');
                const setRand = randomString
                const ready = `
            <div class="postContainer" style="padding-bottom: 10px;padding-top: 10px;">
                <div class="post">
                    <div class="profilePicture">
                        <img src="${src}">
                    </div>
                    <div class="postInfo">
                        <div class="userInfo">
                            <p onclick="extMention('${foundName}')">${foundName}</p>
                            <span>${timeAgoInGreek(sent.contents.date)}</span>
                        </div>
                        <div class="postContent" style="height: auto;">
                            <p><vox onclick="extMention('${sent.marresi}')" class="mention ${getGender(removeTonos(sent.marresi.split(" ")[0])) === "Female" ? "female" : "male"}">@${sent.marresi}</vox>
                                ${cleaned.includes("<img")
                        ? cleaned.replace("100px", 'auto').replace("280px", "auto").replace("height:auto;", "height:auto;margin-left: 0;width: 90%;")
                        : cleaned}
                            </p>
                        </div>
                        <div class="mediaContainer"${hasMedia ? "style='margin-top: 10px;'" : ""}>
                        ${media}
                        </div>
                        <div class="icons">
                    <div id="${setRand}" onclick="focusOnIcon(this, 'likeBtn', '${sent.contents.emri}', '${sent.contents.marresi}')" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>${sent.contents.likes ? sent.contents.likes.count ? `<p class='pop-text'>${sent.contents.likes.count}</p>` : "<p class='pop-text'></p>" : "<p class='pop-text'></p>"}
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 0 24 24"><path d="M12,2a10,10,0,1,0,4.924,18.7l3.76,1.253A1.014,1.014,0,0,0,21,22a1,1,0,0,0,.948-1.316L20.7,16.924A9.988,9.988,0,0,0,12,2Zm6.653,15.121.766,2.3-2.3-.766a.994.994,0,0,0-.851.1,8.02,8.02,0,1,1,2.488-2.488A1,1,0,0,0,18.653,17.121Z"/></svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
</svg>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        `;


                // Assuming fetchAndSaveImage is another async function that needs to be called


                // Accumulate the generated HTML to be added later
                return { ready: ready, isLiked: sent.contents.likes && sent.contents.likes.liked.includes(foundName), id: setRand };
            })
        ).then((htmlArray) => {
            // Join all the HTML strings into one large HTML block.
            console.log(htmlArray)
            //const html = htmlArray[htmlArray.length].ready.join('');
            let finalHtml = ''
            htmlArray.forEach((item) => {
                finalHtml += item.ready;
            })
            document.getElementById("sentByUser").innerHTML = finalHtml;
            console.log("All user posts have been rendered!");
            //document.getElementById("sentByUser").innerHTML = html;
            // Do something after everything is done
            if (local === true) {
                loadFresh(true);
            }
            htmlArray.forEach((item) => {
                if (item.isLiked && item.id) {
                    focusOnIcon(document.getElementById(item.id), 'likedLikeBtn')
                }
            })


        });


    }

    function loadFresh(dontSpawn) {
        const pars = JSON.parse(account_data)
        fetch(`https://arc.evoxs.xyz/?metode=userSent&pin=${pars.pin}&emri=${pars.name}`)
            .then(response => response.json())
            .then(sentbyuser => {
                localStorage.setItem("sentByUser", JSON.stringify(sentbyuser))
                if (!dontSpawn) {
                    spawnIn(sentbyuser)
                }




            }).catch(error => {
                console.error(error);
            });
    }

    setTimeout(function () {
        try {
            if (localStorage.getItem("sentByUser")) {
                loadFresh()
                return;
                spawnIn(JSON.parse(localStorage.getItem("sentByUser")), true)
            } else {
                loadFresh()
            }
        } catch (err) {
            localStorage.removeItem("sentByUser")
        }
    }, 800)
}


function openProfile(el) {
    document.getElementById("media").style.display = 'none'
    document.getElementById("carouselItem-1").classList.add("active")
    document.getElementById("carouselItem-2").classList.remove("active")
    document.getElementById("carouselItem-3").classList.remove("active")
    saveLastPage('profile')
    el.classList.add('active')
    el.classList.add("dropToBase")
    el.style.transition = "transform 0.3s ease";
    //el.style.transform = "scale(1.2)";

    setTimeout(() => {
        el.classList.remove("dropToBase")
        //el.style.transform = "scale(1)";
    }, 1300);
    getRandomClassmates(foundName).then(usersJson => {
        document.getElementById("classIcons").innerHTML = '';
        usersJson.forEach(user => {
            getImage(user.name).then(profileSrc => {
                document.getElementById("classIcons").innerHTML += `<img src="${profileSrc.imageData}" alt="${user.name}">`;
            })

        })
        showProfile(null)
    });
    loadSentByUser()
    document.getElementById("home-switch").classList.remove("active")
    document.getElementById("discovery-switch").classList.remove("active")
    document.getElementById("search-switch").classList.remove("active")
    document.getElementById("search-cont-3").style.display = 'none'
    document.getElementById("profile-switch").classList.remove("active")

    el.classList.add('active')
    document.getElementById("bar").classList.remove("ai")
    document.getElementById("home").style.display = 'none'
    document.getElementById("search-discovery").style.display = 'none'
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

function dismissRecommend() {
    const emri = document.getElementById("mention-recommend").getAttribute("data-activate")
    if (emri) {
        recommendedPeopleRej.push(emri)
        document.getElementById("icons-possible").classList.remove("fade-in-slide-up")
        document.getElementById("icons-possible").classList.add("fade-out-slide-down")
        setTimeout(() => {
            document.getElementById("icons-possible").style.display = 'none'
            document.getElementById("icons-possible").classList.remove("fade-out-slide-down")
            document.getElementById("icons-possible").classList.add("fade-in-slide-up")
        }, 300)
    }
}
//document.getE
//input-textarea
let recommendedPeopleRej = [] //the rejected ones
let selectedPeople = []
function setTag(emri, el) {
    const textarea = document.getElementById('input-textarea');
    const match = textarea.value.match(/@(\p{L}+)/u);
    const result = match ? match[1] : "";
    textarea.value = textarea.value.replace(`@${result}`, '')
    document.getElementById("floatingDiv").style.display = 'none'
    document.getElementById("floatingDiv").innerHTML = '';

    selectedPeople.push(emri)
    //document.getElementById("selectedPeople").innerHTML = ''
    //selectedPeople.forEach(user => {
    document.getElementById("selectedPeople").innerHTML += `<div id="tag-${emri}-02" class="postContainer fade-in-slide-up">
                        <div class="post">
                            <div class="profilePicture">
                                <img src="${el.querySelector(".post .profilePicture img").src}">
                            </div>
                            <div class="postInfo" style="flex-direction: row;">
                                <div class="userInfo">
                                    <p>${el.querySelector(".post .postInfo .userInfo p").innerHTML}</p>
                                    <span onclick="removeTag('${emri}')" style="margin-left: auto"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="#808080"/>
</svg></span>
                                </div>
                            </div>
                        </div>
                    </div>`
    //})
}

function setTagEXT(el) {
    const emri = el.getAttribute("data-activate")
    document.getElementById("floatingDiv").style.display = 'none'
    document.getElementById("floatingDiv").innerHTML = '';

    selectedPeople.push(emri)
    //document.getElementById("selectedPeople").innerHTML = ''
    //selectedPeople.forEach(user => {
    getImage(emri).then(profileSrc => {
        document.getElementById("selectedPeople").innerHTML += `<div id="tag-${emri}-02" class="postContainer fade-in-slide-up">
                        <div class="post">
                            <div class="profilePicture">
                                <img src="${profileSrc.imageData}">
                            </div>
                            <div class="postInfo" style="flex-direction: row;">
                                <div class="userInfo">
                                    <p>${emri}</p>
                                    <span onclick="removeTag('${emri}')" style="margin-left: auto"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM8.29289 8.29289C8.68342 7.90237 9.31658 7.90237 9.70711 8.29289L12 10.5858L14.2929 8.29289C14.6834 7.90237 15.3166 7.90237 15.7071 8.29289C16.0976 8.68342 16.0976 9.31658 15.7071 9.70711L13.4142 12L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L12 13.4142L9.70711 15.7071C9.31658 16.0976 8.68342 16.0976 8.29289 15.7071C7.90237 15.3166 7.90237 14.6834 8.29289 14.2929L10.5858 12L8.29289 9.70711C7.90237 9.31658 7.90237 8.68342 8.29289 8.29289Z" fill="#808080"/>
</svg></span>
                                </div>
                            </div>
                        </div>
                    </div>`
    })

    document.getElementById("icons-possible").classList.remove("fade-in-slide-up")
    document.getElementById("icons-possible").classList.add("fade-out-slide-down")
    setTimeout(() => {
        document.getElementById("icons-possible").style.display = 'none'
        document.getElementById("icons-possible").classList.remove("fade-out-slide-down")
        document.getElementById("icons-possible").classList.add("fade-in-slide-up")
    }, 300)


    //})
}

function postNow(el) {
    //Work on dataIn
    dataIn = {}
    if (!el.classList.contains("not-ready")) {
        closePostCreate('frontend')
        document.getElementById("icon-checkmark").style.display = 'none'
        document.getElementById("icon-error").style.display = 'none'
        document.getElementById("icon-spinner").style.display = null;
        document.getElementById("notice-text").innerText = 'Γίνεται μεταφόρτωση..'
        document.getElementById("notice-main").classList.add("active")
        selectedPeople.forEach(person => {
            let files = ''
            uploadedFiles.forEach(file => {
                files += `%img:server(${file.server}):mediaId(${file.name}):mediaType(${file.type})%`
            })
            let tags = ''
            selectedPeople.filter(item => item !== person).forEach(tag => {
                tags += `@${tag} `
            })
            dataIn[person] = `${tags}${document.getElementById("input-textarea").value}${files}`
            dataIn[`${person}-question`] = 'Τι νέο υπάρχει;'
        })
        console.log("PostData:", dataIn)
        const userData = JSON.parse(localStorage.getItem("jeanDarc_accountData"));
        const selectElement = document.getElementById("visibility");
        const selectedValue = selectElement.value;
        console.warn("Selected Visibility:", selectedValue);

        const payload = {
            metode: "vleresimet",
            emri: foundName || userData.name,
            pin: userData.pin,
            parashtresat: JSON.stringify(dataIn),
            visibility: selectedValue,
        };

        fetch("https://arc.evoxs.xyz/saveRatings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(response => response.text())
            .then(data => {
                if (data === "Kontrolloni json!") {
                    document.getElementById("icon-error").style.display = null
                    document.getElementById("icon-checkmark").style.display = 'none';
                    document.getElementById("icon-spinner").style.display = 'none';
                    document.getElementById("notice-text").innerText = 'Τα δεδομένα δεν είναι σωστά δομημένα.'
                    setTimeout(function () {
                        alert("Αποτυχία σύνδεσης με τον διακομιστή. Οι καταχωρήσεις σας αποθηκεύτηκαν στην συσκευή σας. Δοκιμάστε αργότερα ή επανεκκινήστε την εφαρμογή.");
                        document.getElementById("notice-main").classList.remove("active")
                    }, 10000)

                    console.error("JSON error:", data, dataIn);
                } else {
                    const res = JSON.parse(data);
                    console.log("Success", res);
                    document.getElementById("icon-checkmark").style.display = null
                    document.getElementById("icon-spinner").style.display = 'none';
                    document.getElementById("notice-text").innerText = 'Επιτυχία!'
                    setTimeout(function () {
                        document.getElementById("notice-main").classList.remove("active")
                    }, 4000)
                    uploadedFiles = []
                    document.getElementById("evox-media-container").innerHTML = ''

                }
            })
            .catch(error => {
                localStorage.setItem("jeanneBackup", JSON.stringify(dataIn));
                if (!hasLoginFailed) {
                    document.getElementById("icon-error").style.display = null
                    document.getElementById("icon-checkmark").style.display = 'none';
                    document.getElementById("icon-spinner").style.display = 'none';
                    document.getElementById("notice-text").innerText = 'Αποτυχία. Επανεκκινήστε την εφαρμογή.'
                    setTimeout(function () {
                        alert("Αποτυχία σύνδεσης με τον διακομιστή. Οι καταχωρήσεις σας αποθηκεύτηκαν στην συσκευή σας. Δοκιμάστε αργότερα ή επανεκκινήστε την εφαρμογή.");
                        document.getElementById("notice-main").classList.remove("active")
                    }, 10000)

                    //
                }
                console.error("Jeanne D'arc Database is offline.");
                console.log("Error:", error);
            });
    } else {
        alert("Το περιεχόμενο είναι κενό")
    }
}

function removeTag(emri) {
    document.getElementById(`tag-${emri}-02`).remove()
    selectedPeople = selectedPeople.filter(item => item !== emri);
}
document.getElementById('input-textarea').addEventListener('input', function () {
    const textarea = this;

    const wordsArray = this.value.split(" ");
    console.log(wordsArray);
    let possible = []
    wordsArray.forEach(word => {
        const matchedNames = findFullNames(word, 'removeFoundName');
        if (matchedNames) {
            matchedNames.forEach(name => {
                possible.push(name)
            })
        }

    })
    possible = possible.filter(name => !selectedPeople.includes(name));

    //console.log("Possible:", possible)
    if (possible[0] && !selectedPeople.includes(possible[0]) && !recommendedPeopleRej.includes(possible[0])) {
        document.getElementById("icons-possible").style.display = 'flex'
        document.getElementById("tontin-input").innerHTML = getGender(removeTonos(possible[0].split(" ")[0])) === "Male" ? "τον" : "την"
        //document.getElementById("tontin-input-2").innerHTML = getGender(removeTonos((possible[0].split(" ")[0]))) === "Male" ? "τον" : "την"
        document.getElementById("name-input-possible").innerHTML = fixNameCase(possible[0].split(" ")[0])
        document.getElementById("name-input-possible").style.color = getGender(removeTonos(possible[0].split(" ")[0])) === "Female" ? "#ae6cff" : "#298ef2"
        document.getElementById("name-input-possible-2@").innerHTML = "@" + possible[0]
        document.getElementById("name-input-possible-2@").style.color = getGender(removeTonos(possible[0].split(" ")[0])) === "Female" ? "#ae6cff" : "#298ef2"
        document.getElementById("mention-recommend").setAttribute("data-activate", possible[0])
    } else {
        if (document.getElementById("icons-possible").style.display !== 'none') {
            document.getElementById("icons-possible").classList.remove("fade-in-slide-up")
            document.getElementById("icons-possible").classList.add("fade-out-slide-down")
            setTimeout(() => {
                document.getElementById("icons-possible").style.display = 'none'
                document.getElementById("icons-possible").classList.remove("fade-out-slide-down")
                document.getElementById("icons-possible").classList.add("fade-in-slide-up")
            }, 300)
        }

    }

    if (this.value !== '') {
        document.getElementById("postButton").classList.remove("not-ready")
        document.getElementById("profilePicture-small").classList.add("ready")
        document.getElementById("addMore").classList.add("ready")
    } else {
        document.getElementById("profilePicture-small").classList.remove("ready")
        document.getElementById("addMore").classList.remove("ready")
        document.getElementById("postButton").classList.add("not-ready")
    }

    const match = textarea.value.match(/@(\p{L}+)/u);
    const result = match ? match[1] : "";
    const matchedNames = findFullNames(result, 'removeFoundName');

    if (this.value.includes("@") && matchedNames) {
        if (matchedNames.length === 0) { return; }
        floatingDiv.style.display = 'block'; // Show the floating div

        console.log(matchedNames)
        if (matchedNames) {
            function setupPersonalInfo(emri) {
                return new Promise((resolve, reject) => {
                    function rejected() {
                        informacion(emri)
                            .then(found => {
                                const informacion_local = localStorage.getItem("jeanne_informacion");
                                if (informacion_local) {
                                    const lc = JSON.parse(informacion_local);
                                    lc[emri] = found;
                                    localStorage.setItem("jeanne_informacion", JSON.stringify(lc));
                                } else {
                                    const json = { [emri]: found };
                                    localStorage.setItem("jeanne_informacion", JSON.stringify(json));
                                }
                                resolve(found); // Resolve with profile picture
                            })
                    }

                    const informacion_local = localStorage.getItem("jeanne_informacion");
                    if (informacion_local) {
                        const lc = JSON.parse(informacion_local);
                        const found = lc[emri];
                        if (found) {
                            console.log("Using localstorage");
                            resolve(found); // Resolve with profile picture from local storage
                        } else {
                            console.log("Localstorage doesn't include self");
                            rejected();
                        }
                    } else {
                        console.log("Localstorage informacion doesn't exist");
                        rejected();
                    }
                });
            }

            document.getElementById("floatingDiv").innerHTML = '';
            matchedNames.forEach(user => {
                console.log("Found:", user);
                setupPersonalInfo(user)
                    .then((info) => {
                        const existingElement = document.querySelector(`[data-user="${user}"]`);
                        if (existingElement) return; // Prevent duplicates

                        const postContainer = document.createElement("div");
                        postContainer.classList.add("postContainer");
                        postContainer.setAttribute("data-user", user); // Unique identifier
                        postContainer.onclick = function () {
                            setTag(user, this)
                        }

                        const randomString = [...Array(15)]
                            .map(() => Math.random().toString(36)[2])
                            .join('');
                        getImage(user).then(profileSrc => {
                            document.getElementById(randomString).src = profileSrc.imageData;
                        })
                        postContainer.innerHTML = `
                            <div class="post">
                                <div class="profilePicture">
                                    <img id="${randomString}" src="reloading-pfp.gif">
                                </div>
                                <div class="postInfo" style="flex-direction: row;">
                                    <div class="userInfo">
                                        <p>${user}
                                        ${info.seksioni === 'ΚΑΘ' ? '<svg style="margin-left: 5px" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" id="verified" class="icon glyph"><path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" style="fill:#179cf0"/></svg>' : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            `


                        document.getElementById("floatingDiv").appendChild(postContainer);
                    })
                    .catch((error) => {
                        console.error('There was an issue setting up personal info:', error);
                    });
            });

        }

    } else {
        floatingDiv.style.display = 'none';
    }

    // Create a hidden div to mirror the textarea
    let mirrorDiv = document.getElementById("mirror-div");
    if (!mirrorDiv) {
        mirrorDiv = document.createElement("div");
        mirrorDiv.id = "mirror-div";
        document.body.appendChild(mirrorDiv);
    }

    // Apply the same styles as the textarea
    mirrorDiv.style.position = "absolute";
    mirrorDiv.style.visibility = "hidden";
    mirrorDiv.style.whiteSpace = "pre-wrap";
    mirrorDiv.style.wordWrap = "break-word";
    mirrorDiv.style.font = window.getComputedStyle(textarea).font;
    mirrorDiv.style.width = textarea.clientWidth + "px";
    mirrorDiv.style.padding = window.getComputedStyle(textarea).padding;
    mirrorDiv.style.lineHeight = window.getComputedStyle(textarea).lineHeight;

    // Preserve manual and automatic line breaks
    mirrorDiv.innerHTML = textarea.value.replace(/\n/g, "<br>&#8203;") || " ";

    // Measure the height and calculate the number of lines
    const lineHeight = parseFloat(window.getComputedStyle(textarea).lineHeight);
    const lines = Math.round(mirrorDiv.clientHeight / lineHeight);

    //console.log("Total lines (including wraps and manual line breaks):", lines);

    // Adjust textarea height dynamically
    textarea.style.height = (lines * lineHeight) + "px";

    const div = document.getElementById("postInput") // Select the div
    const div_a = document.getElementById("createPost")

    // Check if vertical scroll is needed
    if (div_a.scrollHeight > div_a.clientHeight) {
        console.log("Vertical scrolling is required.");
        div.classList.add("scrolly")
    } else {
        div.classList.remove("scrolly")
    }
});

function openKeyboard() {
    let hiddenInput = document.getElementById("hidden-input");
    let textarea = document.getElementById("input-textarea");

    // Focus hidden input to trigger keyboard
    hiddenInput.focus();

    setTimeout(() => {
        // Transfer text from hidden input to textarea (in case Safari locks input focus)
        hiddenInput.addEventListener("input", () => {
            textarea.value = hiddenInput.value;
            hiddenInput.value = ''
            hiddenInput.blur();
            textarea.focus();
        });

        // Blur hidden input, then focus textarea
        //
    }, 50);
}

const footer = document.querySelector(".popup-footer");

function adjustFooterPosition() {
    if (window.visualViewport) {
        footer.style.bottom = (window.innerHeight - window.visualViewport.height) + "px";
    }
}

function addMore(el) {
    if (el.classList.contains("ready")) {
        document.getElementById("postInput").style.marginBottom = '0'
        document.getElementById("addMore").remove()

        document.getElementById("createPost").innerHTML += `<div class="postInput" id="postInput">
                <div class="profilePicture-in">
                    <img src="${document.getElementById("profilePicture-main").src}">
                    <div class="line-x"></div>
                    <img class="small" src="${document.getElementById("profilePicture-small").src}">
                </div>
                <div class="input-post">
                    <p>${document.getElementById("name-sur").innerText}</p>
                    <div class="text-area-cont" style="position: relative;">

                        <textarea id="input-textarea-2" placeholder="Τι νέο υπάρχει;"></textarea>
                        <div id="floatingDiv-2" class="floating-div fade-in-slide-up">
                            <div class="postContainer">
                                <div class="post">
                                    <div class="profilePicture">
                                        <img src="https://arc.evoxs.xyz/foto/instagram/lilanda_adamidi.evox">
                                    </div>
                                    <div class="postInfo" style="flex-direction: row;">
                                        <div class="userInfo">
                                            <p>Λιλάντα Αδαμίδη
                                                <svg style="margin-left: 5px" xmlns="http://www.w3.org/2000/svg"
                                                    width="20px" height="20px" viewBox="0 0 24 24" id="verified"
                                                    class="icon glyph">
                                                    <path
                                                        d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z"
                                                        style="fill:#179cf0"></path>
                                                </svg>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="mediaContainer" id="evox-media-container-2">

                        </div>
                        
                    </div>
                    <input type="file" style="display: none;" id="evox-upload-box-2" accept="image/*,video/*" multiple onchange="processFile(null, '2')">

                    <div class="icons">
                        <div onclick="uploadFile();focusOnIcon(this)" class="iconA">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                fill="none">
                                <path
                                    d="M2.58078 19.0112L2.56078 19.0312C2.29078 18.4413 2.12078 17.7713 2.05078 17.0312C2.12078 17.7613 2.31078 18.4212 2.58078 19.0112Z"
                                    fill="#808080" />
                                <path
                                    d="M9.00109 10.3811C10.3155 10.3811 11.3811 9.31553 11.3811 8.00109C11.3811 6.68666 10.3155 5.62109 9.00109 5.62109C7.68666 5.62109 6.62109 6.68666 6.62109 8.00109C6.62109 9.31553 7.68666 10.3811 9.00109 10.3811Z"
                                    fill="#808080" />
                                <path
                                    d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.19C2 17.28 2.19 18.23 2.56 19.03C3.42 20.93 5.26 22 7.81 22H16.19C19.83 22 22 19.83 22 16.19V13.9V7.81C22 4.17 19.83 2 16.19 2ZM20.37 12.5C19.59 11.83 18.33 11.83 17.55 12.5L13.39 16.07C12.61 16.74 11.35 16.74 10.57 16.07L10.23 15.79C9.52 15.17 8.39 15.11 7.59 15.65L3.85 18.16C3.63 17.6 3.5 16.95 3.5 16.19V7.81C3.5 4.99 4.99 3.5 7.81 3.5H16.19C19.01 3.5 20.5 4.99 20.5 7.81V12.61L20.37 12.5Z"
                                    fill="#808080" />
                            </svg>
                        </div>
                        <div onclick="focusOnIcon(this)" class="iconA">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M11.2383 2.79888C10.6243 2.88003 9.86602 3.0542 8.7874 3.30311L7.55922 3.58654C6.6482 3.79677 6.02082 3.94252 5.54162 4.10698C5.07899 4.26576 4.81727 4.42228 4.61978 4.61978C4.42228 4.81727 4.26576 5.07899 4.10698 5.54162C3.94252 6.02082 3.79677 6.6482 3.58654 7.55922L3.30311 8.7874C3.0542 9.86602 2.88003 10.6243 2.79888 11.2383C2.71982 11.8365 2.73805 12.2413 2.84358 12.6092C2.94911 12.9772 3.14817 13.3301 3.53226 13.7954C3.92651 14.2731 4.47607 14.8238 5.25882 15.6066L7.08845 17.4362C8.44794 18.7957 9.41533 19.7608 10.247 20.3954C11.0614 21.0167 11.6569 21.25 12.2623 21.25C12.8678 21.25 13.4633 21.0167 14.2776 20.3954C15.1093 19.7608 16.0767 18.7957 17.4362 17.4362C18.7957 16.0767 19.7608 15.1093 20.3954 14.2776C21.0167 13.4633 21.25 12.8678 21.25 12.2623C21.25 11.6569 21.0167 11.0614 20.3954 10.247C19.7608 9.41533 18.7957 8.44794 17.4362 7.08845L15.6066 5.25882C14.8238 4.47607 14.2731 3.92651 13.7954 3.53226C13.3301 3.14817 12.9772 2.94911 12.6092 2.84358C12.2413 2.73805 11.8365 2.71982 11.2383 2.79888ZM11.0418 1.31181C11.7591 1.21701 12.3881 1.21969 13.0227 1.4017C13.6574 1.58372 14.1922 1.91482 14.7502 2.37538C15.2897 2.82061 15.8905 3.4214 16.641 4.17197L18.5368 6.06774C19.8474 7.37835 20.8851 8.41598 21.5879 9.33714C22.311 10.2849 22.75 11.197 22.75 12.2623C22.75 13.3276 22.311 14.2397 21.5879 15.1875C20.8851 16.1087 19.8474 17.1463 18.5368 18.4569L18.4569 18.5368C17.1463 19.8474 16.1087 20.8851 15.1875 21.5879C14.2397 22.311 13.3276 22.75 12.2623 22.75C11.197 22.75 10.2849 22.311 9.33714 21.5879C8.41598 20.8851 7.37833 19.8474 6.06771 18.5368L4.17196 16.641C3.4214 15.8905 2.82061 15.2897 2.37538 14.7502C1.91482 14.1922 1.58372 13.6574 1.4017 13.0227C1.21969 12.3881 1.21701 11.7591 1.31181 11.0418C1.40345 10.3484 1.59451 9.52048 1.83319 8.48622L2.13385 7.18334C2.33302 6.32023 2.49543 5.61639 2.68821 5.05469C2.88955 4.46806 3.14313 3.9751 3.55912 3.55912C3.9751 3.14313 4.46806 2.88955 5.05469 2.68821C5.61639 2.49543 6.32023 2.33302 7.18335 2.13385L8.48622 1.83319C9.52047 1.59451 10.3484 1.40345 11.0418 1.31181ZM9.49094 7.99514C9.00278 7.50699 8.21133 7.50699 7.72317 7.99514C7.23502 8.4833 7.23502 9.27476 7.72317 9.76291C8.21133 10.2511 9.00278 10.2511 9.49094 9.76291C9.97909 9.27476 9.97909 8.4833 9.49094 7.99514ZM6.66251 6.93448C7.73645 5.86054 9.47766 5.86054 10.5516 6.93448C11.6255 8.00843 11.6255 9.74963 10.5516 10.8236C9.47766 11.8975 7.73645 11.8975 6.66251 10.8236C5.58857 9.74963 5.58857 8.00843 6.66251 6.93448ZM19.0511 10.9902C19.344 11.2831 19.344 11.7579 19.0511 12.0508L12.0721 19.0301C11.7792 19.323 11.3043 19.323 11.0114 19.0301C10.7185 18.7372 10.7185 18.2623 11.0114 17.9694L17.9904 10.9902C18.2833 10.6973 18.7582 10.6973 19.0511 10.9902Z"
                                    fill="#808080" />
                            </svg>
                        </div>
                        <div class="iconA">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M11 16L13 8" stroke="#808080" stroke-width="2" stroke-linecap="round" />
                                <path
                                    d="M17 15L19.6961 12.3039V12.3039C19.8639 12.1361 19.8639 11.8639 19.6961 11.6961V11.6961L17 9"
                                    stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M7 9L4.32151 11.6785V11.6785C4.14394 11.8561 4.14394 12.1439 4.32151 12.3215V12.3215L7 15"
                                    stroke="#808080" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div id="selectedPeople-2" class="selectedPeople">

                    </div>
                    <div onclick="addMore(this)" class="addmore" id="addMore">
                        Πρόσθεσε στην καταχώρηση
                    </div>
                </div>
            </div>`
        document.getElementById("profilePicture-small").remove()
    }
}

window.visualViewport.addEventListener("resize", adjustFooterPosition);
window.visualViewport.addEventListener("scroll", adjustFooterPosition);



function createPost(el) {
    document.getElementById("selectedPeople").innerHTML = ''
    selectedPeople = []

    function setupPersonalInfo() {
        return new Promise((resolve, reject) => {
            document.getElementById("name-sur").innerText = foundName;

            function rejected() {
                informacion(foundName)
                    .then(found => {
                        getImage(foundName).then(profileSrc => {
                            document.getElementById("profilePicture-main").src = profileSrc.imageData;
                            document.getElementById("profilePicture-small").src = profileSrc.imageData;
                        })

                        const informacion_local = localStorage.getItem("jeanne_informacion");
                        if (informacion_local) {
                            const lc = JSON.parse(informacion_local);
                            lc[foundName] = found
                            localStorage.setItem("jeanne_informacion", JSON.stringify(lc));
                        } else {
                            const json = { foundName: found }
                            localStorage.setItem("jeanne_informacion", JSON.stringify(json));
                        }
                        resolve();  // Resolving the promise after successful fetch
                    })
                    .catch(error => {
                        console.error("Jeanne D'arc Database is offline:", error);
                        reject(error);  // Rejecting the promise if there is an error
                    });
            }
            const informacion_local = localStorage.getItem("jeanne_informacion");
            if (informacion_local) {
                const lc = JSON.parse(informacion_local);
                const found = lc[foundName];
                if (found) {
                    console.log("Using localstorage")
                    document.getElementById("profilePicture-main").src = found.foto;
                    document.getElementById("profilePicture-small").src = found.foto;
                    resolve();  // Resolving the promise when local data is successfully loaded
                } else {
                    console.log("Localstorage doesn't include self")
                    rejected()
                }

            } else {
                console.log("Localstorage informacion doesn't exist")
                rejected()
            }
        });
    }

    document.getElementById("createPostSvg").querySelector("path").style.fill = "#fff"
    setTimeout(function () {
        setupPersonalInfo()
            .then(() => {
                console.log('Personal info setup successfully');
                document.getElementById("createPost").classList.add("active")
                document.getElementById("app").style.transform = 'scale(0.95)'
                document.getElementById("gradColored").style.opacity = '0.8'
                document.getElementById("gradColored").style.borderRadius = '20px'
                document.getElementById("gradColored").style.transform = 'scale(0.9)'
                document.getElementById("app").style.opacity = '0.8'
                document.body.style.backgroundColor = '#000'
                document.getElementById("createPostSvg").querySelector("path").style.fill = "#efefef93"
                footer.style.display = 'flex'
            })
            .catch((error) => {
                console.error('There was an issue setting up personal info:', error);
            });
    }, 150)




}

function openEditProfile() {
    document.getElementById("editProfile").classList.add("active")
    document.getElementById("app").style.transform = 'scale(0.95)'
    document.getElementById("gradColored").style.borderRadius = '20px'
    document.getElementById("gradColored").style.transform = 'scale(0.9)'
    document.body.style.backgroundColor = '#000'
    fetch(`https://arc.evoxs.xyz/?metode=tags&emri=${foundName}`)
        .then(response => response.json())
        .then(tagsData => {
            document.getElementById("tagsmk").innerHTML = ''
            tagsData.forEach(tag => {
                document.getElementById("tagsmk").innerHTML = `${document.getElementById("tags").innerHTML}<div class="anInfo">
                    ${tag === "Evox" ? `<img src="../oasaResign/evox-logo-dark.png" width="17.5px" height="17.5px">` : "🏛️"}
                    <span>${tag}</span>
                </div>`
            })

        }).catch(error => {
            console.error("Jeanne D'arc Database is offline.")
            console.log('Error:', error);
        });
}

grabberEvents("createPost")
grabberEvents("editProfile")

document.getElementById("search-discovery").addEventListener("scroll", function () {
    if (this.scrollTop > 70) {
        document.getElementById("search-cont-3").style.display = 'block'
    } else {
        document.getElementById("search-cont-3").style.display = 'none'
    }
});
let allUsersDiv = document.getElementById("search-discovery");
let loadingIndicator = document.getElementById("loadingIndicator");
let isLoading = false; // Prevent multiple triggers

allUsersDiv.addEventListener("scroll", function () {
    if (isLoading) return;

    // Check if user scrolled to the bottom
    if (allUsersDiv.scrollTop + allUsersDiv.clientHeight >= allUsersDiv.scrollHeight - 10) {
        isLoading = true;
        loadingIndicator.classList.add("scaleUp")
        loadingIndicator.style.opacity = "1";

        setTimeout(() => {
            loadMoreUsers();
            isLoading = false;
            loadingIndicator.style.opacity = "0";
            loadingIndicator.classList.remove("scaleUp")
        }, 1500);
    }
});



function loadMoreUsers() {
    const ac = localStorage.getItem("jeanDarc_accountData");
    if (!ac) { return; }
    const parsed = JSON.parse(ac)
    fetch(`https://arc.evoxs.xyz/?metode=rekomandimet&emri=${parsed.name}&pin=${atob(parsed.pin)}&loaded=${JSON.stringify(search_loadedUsers)}`)
        .then(response => response.json())
        .then(names => {

            let json = { names: {} }
            names.forEach(name => {
                json.names[name] = {}
            })
            spawnItems(json, 'loadMore', names);


        })
        .catch(error => console.error("Jeanne D'arc Database is offline."));
}



function openDiscovery(el) {
    saveLastPage('discover')
    el.classList.add('active')
    el.style.transition = "transform 0.3s ease";
    el.style.transform = "scale(1.2)";

    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 300);
    el.classList.add('active')
    document.getElementById("bar").classList.add("ai")
    document.getElementById("home-switch").classList.remove("active")
    document.getElementById("profile-switch").classList.remove("active")
    document.getElementById("search-switch").classList.remove("active")
    document.getElementById("search-cont-3").style.display = 'none'
    document.getElementById("home").style.display = 'none'
    document.getElementById("profile").style.display = 'none'
    document.getElementById("search-discovery").style.display = 'none'
    document.getElementById("discover").style.display = 'block'
    let skeleton = ``
    for (let i = 0; i < 6; i++) {
        skeleton += `<div class="aclass skeleton" style="border-radius: 15px;">
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
        if (btoa(greekToGreeklish(foundName)).includes("R3JpZ29yaXM")) {
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
function spawnItems(names, loadMore, oringinal) {

    const fullNames = Object.keys(names.names);
    console.warn("FLNAMS:", names)
    console.log("fn:", fullNames)
    const informacion_local = localStorage.getItem("jeanne_informacion");
    let informacion_2 = {};
    let html = '';
    let count = 0
    let target = oringinal.length
    console.log("spawning")
    let fetchPromises = fullNames.map(name => {
        return new Promise((resolve, reject) => {
            if (search_loadedUsers.includes(name)) {
                console.log("Included name", name, search_loadedUsers);
                resolve(); // Resolve immediately if the name is already included
                return;
            }

            if (name === foundName) {
                resolve(Promise.resolve()); // Resolve if it's the found name
                return;
            }

            async function spawn(info) {
                let src = info.foto;
                try {
                    const profileSrc = await getImage(info.emri); // Wait for getImage to resolve
                    //console.log(profileSrc);
                    if (profileSrc) {
                        src = profileSrc.imageData;
                    } else {
                        src = info.foto
                    }

                    html += `
                    <div class="postContainer" style="padding-bottom: 10px;padding-top: 10px;">
                        <div class="post">
                            <div class="profilePicture">
                                <img src="${src}">
                            </div>
                            <div class="postInfo">
                                <div class="userInfo">
                                    <p onclick="extMention('${info.emri}')">${info.emri} 
                                    ${info.seksioni === 'ΚΑΘ' ? '<svg style="margin-left: 5px" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" id="verified" class="icon glyph"><path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" style="fill:#179cf0"/></svg>' : ''}</p>
                                </div>
                                <div class="postContent">
                                    <p>${info.seksioni}${info.klasa !== 'none' ? info.klasa : ''}</p>
                                </div>
                            </div>
                            <div onclick="showProfileInfo('${info.emri}')" class="showProfileBtn">Προβολή</div>
                        </div>
                    </div>`;
                    //fetchAndSaveImage(info.emri, info.foto); // Store the image locally

                    // Check if count meets target, resolve the promise
                    if (count >= target) {
                        resolve();
                    }

                } catch (error) {
                    console.error("Error fetching image:", error);
                    reject(error); // Reject promise in case of error
                }
            }

            if (informacion_local && informacion_local !== '{}') {
                const localInfo = JSON.parse(informacion_local);
                if (localInfo[name]) {
                    spawn(localInfo[name]);
                } else {
                    console.log("No localInfo name")
                    informacion(name)
                        .then(info => {
                            informacion_2[name] = info;
                            spawn(info);
                        })
                        .catch(error => {
                            console.error("Jeanne D'arc Database is offline:", error);
                            reject(error); // Reject promise if fetch fails
                        });
                }
            } else {
                informacion(name)
                    .then(info => {
                        informacion_2[name] = info;
                        spawn(info);
                    })
                    .catch(error => {
                        console.error("Jeanne D'arc Database is offline:", error);
                        reject(error); // Reject promise if fetch fails
                    });

            }

            count++;
        });
    });


    Promise.all(fetchPromises).then(() => {
        search_loadedUsers = [...search_loadedUsers, ...oringinal]
        //console.log("HTML", html)
        if (html !== '') {
            //console.log("more", loadMore)
            if (loadMore === "searched") {
                console.log("searched!")
                document.getElementById("searchedUsers").innerHTML = html;
                return;
            }
            if (loadMore) {
                document.getElementById("allUsers").innerHTML += html;
            } else {
                document.getElementById("allUsers").innerHTML = html;
            }
        } else {
            console.log("html is empty")
        }
        if (Object.keys(informacion_2).length !== 0) {
            localStorage.setItem("jeanne_informacion", JSON.stringify(informacion_2));
        }
    });
}

let lastActiveSearchUser = null
function switchToSentToUser(el) {
    document.getElementById("carouseli01").classList.remove("active")
    el.classList.add("active")
    document.getElementById("kataxoriseis").style.display = 'none'
    document.getElementById("touser").style.display = 'flex'
    loadSentToUser(lastActiveSearchUser)
}

function switchToHome_Search(el, justfront) {
    document.getElementById("carouseli02").classList.remove("active")
    if (!el) {
        document.getElementById("carouseli01").classList.add("active")
    } else {
        el.classList.add("active")
    }
    document.getElementById("kataxoriseis").style.display = 'flex'
    document.getElementById("touser").style.display = 'none'
    if (!justfront) {
        showProfileInfo(lastActiveSearchUser)
    }

}

function loadSentToUser(emri, redo) {
    const j = 6
    let skel = ''
    for (let i = 0; i < j; i++) {
        skel += `<div class="postContainer skel loading" style="padding-bottom: 10px;padding-top: 10px;">
                            <div class="post">
                                <div style="display: flex;flex-direction: row;">
                                    <div class="profilePicture">
                                        <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                    </div>
                                    <div class="postInfo">
                                        <div class="userInfo">
                                            <p class="skeleton"></p>
                                            <span class="skeleton"></span>
                                        </div>
                                        <div class="postContent">
                                           <p class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>`
    }
    if (!redo) {
        document.getElementById("sentToSelectedUser").innerHTML = skel;
    }

    const account_data_lc = localStorage.getItem("jeanDarc_accountData")
    if (!account_data_lc) {
        console.error("Llogaria nuk eshte ruajtur ne nivel lokal!?")
        return;
    }

    const account_data = JSON.parse(account_data_lc)

    const pars = {
        pin: account_data.pin, //self pin
        emri: foundName,
        name: emri //target user
    }


    async function spawnIn(sentbyuser, local) {
        let html = '';

        // Convert entries into an array of promises using map
        const promises = Object.entries(sentbyuser)
            .filter(([key]) => key !== "Name" && key !== "length")
            .map(async ([key, value]) => {
                const profileSrc = await getImage(key);
                const pfp = await getEvoxProfile(key);
                let src = pfp; // Default to the pfp value from getEvoxProfile

                //console.log('Profile image fetched:', profileSrc);

                if (profileSrc) {
                    src = profileSrc.imageData; // If profile image is available, use it.
                }

                const emri = key; // Assuming 'emri' should be the key (username or name)
                //fetchAndSaveImage(emri, pfp);
                console.log(`${key}: ${value}`);

                const regex = /%img:server\((.*?)\):mediaId\((.*?)\):mediaType\((.*?)\)%/g;
                const postFiles = [];
                let match;
                while ((match = regex.exec(value)) !== null) {
                    postFiles.push({ server: match[1], id: match[2], type: match[3] });
                }
                const cleanText = value.replace(regex, '');
                if (postFiles.length > 0) {
                    console.log("postFiles:", postFiles);
                    console.log("cleanText:", cleanText.trim());
                }
                let media = ''
                const acc = account_data
                let hasMedia = false
                postFiles.forEach(async (file) => {
                    hasMedia = true
                    media += `<div class="media" style="max-width: 100%; max-height: 360px;">
                                <div style="display:none" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div>
                                <${file.type === 'image' ? "img" : file.type === 'video' ? "video" : "img"} src="${file.server.includes("Jeanne") ? `https://cdn.evoxs.xyz/jeannedarc/${key}/${file.id}/all` : `https://arc.evoxs.xyz/?metode=getFile&emri=${key}&requestor=${foundName}&pin=${btoa(acc.pin)}&id=${file.id}`}" style="max-width: 100%; max-height: 360px;" ${file.type === 'video' ? "controls autoplay muted loop playsinline" : ""}>${file.type === 'video' ? "</video>" : ""}</div>`
                })

                const cleaned = cleanText.trim().replace(/@(\w+\s\w+)/g, (match, name) => `<vox onclick="extMention('${name}')" class="mention ${getGender(removeTonos(name.split(" ")[0])) === "Female" ? "female" : "male"}">@${name}</vox>`);

                return `
                    <div class="postContainer" style="padding-bottom: 10px;padding-top: 10px;">
                        <div class="post">
                            <div class="profilePicture">
                                <img src="${src}">
                            </div>
                            <div class="postInfo">
                                <div class="userInfo">
                                    <p onclick="extMention('${key}')">${key}</p>
                                </div>
                                <div class="postContent" style="height: auto;">
                                    <p><vox onclick="extMention('${pars.name}')" class="mention ${getGender(removeTonos(pars.name.split(" ")[0])) === "Female" ? "female" : "male"}">@${pars.name}</vox>
                                        ${cleaned.includes("<img")
                        ? cleaned.replace("100px", 'auto').replace("280px", "auto").replace("height:auto;", "height:auto;margin-left: 0;width: 90%;")
                        : cleaned}
                                    </p>
                                </div>
                                <div class="mediaContainer"${hasMedia ? "style='margin-top: 10px;'" : ""}>
                                ${media}
                                </div>
                                <div class="icons">
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 0 24 24"><path d="M12,2a10,10,0,1,0,4.924,18.7l3.76,1.253A1.014,1.014,0,0,0,21,22a1,1,0,0,0,.948-1.316L20.7,16.924A9.988,9.988,0,0,0,12,2Zm6.653,15.121.766,2.3-2.3-.766a.994.994,0,0,0-.851.1,8.02,8.02,0,1,1,2.488-2.488A1,1,0,0,0,18.653,17.121Z"/></svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
</svg>
                    </div>
                    </div>
                            </div>
                            
                        </div>
                    </div>
                `;
            });

        // Wait for all promises to resolve
        const htmlArray = await Promise.all(promises);
        html = htmlArray.join('');

        console.log("All user posts have been rendered!");

        if (local === true) {
            loadFresh(true);
        }

        document.getElementById("sentToSelectedUser").innerHTML = html;
    }


    function loadFresh(dontSpawn) {
        fetch(`https://arc.evoxs.xyz/?metode=usersTo&pin=${pars.pin}&emri=${pars.emri}&id=${pars.name}`)
            .then(response => response.json())
            .then(sentbyuser => {
                localStorage.setItem(`sentToUser-${emri}`, JSON.stringify(sentbyuser))
                if (!dontSpawn) {
                    spawnIn(sentbyuser)
                }




            }).catch(error => {
                document.getElementById("sentToSelectedUser").innerHTML = `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;text-align: center;margin-top:15px;gap: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" fill="none">
<path d="M5.67139 4.25705L19.7431 18.3287C21.1538 16.6049 22.0001 14.4013 22.0001 12C22.0001 6.47715 17.523 2 12.0001 2C9.59885 2 7.39526 2.84637 5.67139 4.25705Z" fill="#f54248"/>
<path d="M4.25705 5.67126C2.84637 7.39514 2 9.59873 2 12C2 17.5228 6.47715 22 12 22C14.4013 22 16.6049 21.1536 18.3287 19.7429L4.25705 5.67126Z" fill="#f54248"/>
</svg><p style="">Σφάλμα Δικαιωμάτων</p></div>`;
                console.error(error);
            });
    }

    setTimeout(function () {
        try {
            if (localStorage.getItem(`sentToUser-${emri}`)) {
                spawnIn(JSON.parse(localStorage.getItem(`sentToUser-${emri}`)), true)
            } else {
                loadFresh()
            }
        } catch (err) {
            localStorage.removeItem(`sentToUser-${emri}`)
        }
    }, 800)
}

function activateShare(el) {
    if (el.getAttribute("data-active") !== "null") {
        document.getElementById("share-profile").classList.add("active")
        document.getElementById("share-qr").src = `https://arc.evoxs.xyz/qr/${el.getAttribute("data-active")}`
    } else {
        console.warn("No active user")
    }
}
function showProfileInfo(emri) {
    lastActiveSearchUser = emri
    const container = document.getElementById("search-in");
    const prevContainer = document.getElementById("search-discovery")

    document.getElementById("share-start").setAttribute("data-active", `${emri}`)
    document.getElementById("userName-search").innerText = emri
    getRandomClassmates(emri).then(usersJson => {
        document.getElementById("classIcons-search").innerHTML = '';
        usersJson.forEach(user => {
            document.getElementById("classIcons-search").innerHTML += `<img src="${user.icon}" alt="${user.name}">`;
        })
    });
    container.style.display = 'block'
    prevContainer.style.display = 'none'
    document.getElementById("search-cont-3").style.display = 'none'
    async function final() {
        const profileSrc = await getImage(emri); //the image of the person reffered
        const pfp = await getEvoxProfile(emri);

        let src = pfp; // Default to pfp value from getEvoxProfile
        //console.log('Profile image fetched:', profileSrc);

        if (profileSrc) {
            src = profileSrc.imageData; // Use profile image if available
        }
        document.getElementById("darc-user-search-profile").src = src;


        informacion(emri)
            .then(info => {
                const selfClass = `${info.seksioni}${info.klasa}`
                const foto = info.foto;
                document.getElementById("darc-user-search-profile").src = foto
                if (classMates_class) {
                    document.getElementById("seksioni-search").innerText = `${classMates_class[selfClass].length} συμμαθητές`;//${selfClass === `${myInfo.seksioni}${myInfo.klasa}` ? ' ⋅ στην τάξη σου' : ''}
                } else {
                    if (selfClass === `${myInfo.seksioni}${myInfo.klasa}`) {
                        document.getElementById("seksioni-search").innerText = 'Στην τάξη σου';
                    } else {
                        document.getElementById("seksioni-search").innerText = selfClass.replace("none", "");
                    }
                    console.warn("Classmates class not available")
                }


            })
            .catch(error => {
                console.error("Jeanne D'arc Database is offline.");
                console.log('Error:', error);
            });
        //await fetchAndSaveImage(emri, pfp);
    }
    final()
    function loadSentByUser(emri, redo) {
        const j = 6
        let skel = ''
        for (let i = 0; i < j; i++) {
            skel += `<div class="postContainer skel loading" style="padding-bottom: 10px;padding-top: 10px;">
                            <div class="post">
                                <div style="display: flex;flex-direction: row;">
                                    <div class="profilePicture">
                                        <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                    </div>
                                    <div class="postInfo">
                                        <div class="userInfo">
                                            <p class="skeleton"></p>
                                            <span class="skeleton"></span>
                                        </div>
                                        <div class="postContent">
                                           <p class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                            <p style="margin-top: 5px;" class="skeleton"></p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>`
        }
        if (!redo) {
            document.getElementById("sentBySelectedUser").innerHTML = skel;
        }

        const account_data_lc = localStorage.getItem("jeanDarc_accountData")
        if (!account_data_lc) {
            console.error("Llogaria nuk eshte ruajtur ne nivel lokal!?")
            return;
        }

        const account_data = JSON.parse(account_data_lc)

        const pars = {
            pin: account_data.pin, //self pin
            name: emri //target user
        }


        async function spawnIn(sentbyuser, local) {
            let html = ''
            const profileSrc = await getImage(emri);
            const pfp = await getEvoxProfile(emri);

            let src = pfp; // Default to the pfp value from getEvoxProfile
            //console.log('Profile image fetched:', profileSrc);

            if (profileSrc) {
                src = profileSrc.imageData; // If profile image is available, use it.
            }

            //fetchAndSaveImage(emri, pfp);
            // Assuming getImage and getEvoxProfile are asynchronous functions that return promises.
            Promise.all(
                sentbyuser.map(async (sent) => {
                    // Wait for both image and profile data to be fetched.
                    //const profileSrc = await getImage(sent.marresi);
                    //const pfp = await getEvoxProfile(sent.marresi);
                    //let src = pfp; // Default to the pfp value from getEvoxProfile
                    //console.log('Profile image fetched:', profileSrc);
                    //if (profileSrc) {
                    //    src = profileSrc.imageData; // If profile image is available, use it.
                    //}
                    //fetchAndSaveImage(sent.marresi, pfp);
                    // Build the HTML for the post.
                    const regex = /%img:server\((.*?)\):mediaId\((.*?)\):mediaType\((.*?)\)%/g;
                    const postFiles = [];
                    let match;
                    while ((match = regex.exec(sent.contents.vleresim)) !== null) {
                        postFiles.push({ server: match[1], id: match[2], type: match[3] });
                    }
                    const cleanText = sent.contents.vleresim.replace(regex, '');
                    if (postFiles.length > 0) {
                        console.log("postFiles:", postFiles);
                        console.log("cleanText:", cleanText.trim());
                    }
                    let media = ''
                    const acc = account_data
                    let hasMedia = false
                    postFiles.forEach(async (file) => {
                        hasMedia = true
                        media += `<div class="media" style="max-width: 80%; max-height: 360px;">
                                <div style="display:none" class="loadIndicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload">
                                        <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="active-upload"></circle><circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360" class="track-upload"></circle></svg>
                                </div>
                                <${file.type === 'image' ? "img" : file.type === 'video' ? "video" : "img"} src="${file.server.includes("Jeanne") ? `https://cdn.evoxs.xyz/jeannedarc/${emri}/${file.id}/all` : `https://arc.evoxs.xyz/?metode=getFile&emri=${emri}&requestor=${foundName}&pin=${btoa(acc.pin)}&id=${file.id}`}" style="max-width: 100%; max-height: 360px;" ${file.type === 'video' ? "controls autoplay muted loop playsinline" : ""}>${file.type === 'video' ? "</video>" : ""}</div>`
                    })

                    const cleaned = cleanText.trim().replace(/@(\w+\s\w+)/g, (match, name) => `<vox onclick="extMention('${name}')" class="mention ${getGender(removeTonos(name.split(" ")[0])) === "Female" ? "female" : "male"}">@${name}</vox>`);




                    const ready = `
                <div class="postContainer" style="padding-bottom: 10px;padding-top: 10px;">
                    <div class="post">
                        <div class="profilePicture">
                            <img src="${src}">
                        </div>
                        <div class="postInfo">
                            <div class="userInfo">
                                <p onclick="extMention('${emri}')">${emri}</p>
                                <span>${timeAgoInGreek(sent.contents.date)}</span>
                            </div>
                            <div class="postContent" style="height: auto;">
                                <p><vox onclick="extMention('${sent.marresi}')" class="mention ${getGender(removeTonos(sent.marresi.split(" ")[0])) === "Female" ? "female" : "male"}">@${sent.marresi}</vox>
                                    ${cleaned.includes("<img")
                            ? cleaned.replace("100px", 'auto').replace("280px", "auto").replace("height:auto;", "height:auto;margin-left: 0;width: 90%;")
                            : cleaned}
                                </p>
                            </div>
                            <div class="mediaContainer"${hasMedia ? "style='margin-top: 10px;'" : ""}>
                            ${media}
                            </div>
                            <div class="icons">
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 0 24 24"><path d="M12,2a10,10,0,1,0,4.924,18.7l3.76,1.253A1.014,1.014,0,0,0,21,22a1,1,0,0,0,.948-1.316L20.7,16.924A9.988,9.988,0,0,0,12,2Zm6.653,15.121.766,2.3-2.3-.766a.994.994,0,0,0-.851.1,8.02,8.02,0,1,1,2.488-2.488A1,1,0,0,0,18.653,17.121Z"/></svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                            <path d="M10.3009 13.6949L20.102 3.89742M10.5795 14.1355L12.8019 18.5804C13.339 19.6545 13.6075 20.1916 13.9458 20.3356C14.2394 20.4606 14.575 20.4379 14.8492 20.2747C15.1651 20.0866 15.3591 19.5183 15.7472 18.3818L19.9463 6.08434C20.2845 5.09409 20.4535 4.59896 20.3378 4.27142C20.2371 3.98648 20.013 3.76234 19.7281 3.66167C19.4005 3.54595 18.9054 3.71502 17.9151 4.05315L5.61763 8.2523C4.48114 8.64037 3.91289 8.83441 3.72478 9.15032C3.56153 9.42447 3.53891 9.76007 3.66389 10.0536C3.80791 10.3919 4.34498 10.6605 5.41912 11.1975L9.86397 13.42C10.041 13.5085 10.1295 13.5527 10.2061 13.6118C10.2742 13.6643 10.3352 13.7253 10.3876 13.7933C10.4468 13.87 10.491 13.9585 10.5795 14.1355Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div onclick="focusOnIcon(this)" class="iconA">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M5 6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.07989 3 8.2 3H15.8C16.9201 3 17.4802 3 17.908 3.21799C18.2843 3.40973 18.5903 3.71569 18.782 4.09202C19 4.51984 19 5.07989 19 6.2V21L12 16L5 21V6.2Z" stroke="#fff" stroke-width="2" stroke-linejoin="round"/>
</svg>
                    </div>
                    </div>
                        </div>
                    </div>
                </div>
            `;
                    return ready;
                })
            ).then((htmlArray) => {
                // Join all the HTML strings into one large HTML block.
                const html = htmlArray.join('');
                console.log("All user posts have been rendered!");

                // Do something after everything is done
                if (local === true) {
                    loadFresh(true);
                }
                document.getElementById("sentBySelectedUser").innerHTML = html;
            });


        }

        function loadFresh(dontSpawn) {
            fetch(`https://arc.evoxs.xyz/?metode=userSent&pin=${pars.pin}&emri=${pars.name}`)
                .then(response => response.json())
                .then(sentbyuser => {
                    if (sentbyuser.length === 0) {
                        document.getElementById("sentBySelectedUser").innerHTML = `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;text-align: center;margin-top:15px;gap:5px;"><svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" fill="none" style="margin-bottom: 10px;margin-top:10px;">
<path d="M15.4998 5.50067L18.3282 8.3291M13.3254 7.67502L17.4107 3.58969C18.1918 2.80865 19.4581 2.80864 20.2392 3.58969C21.0202 4.37074 21.0202 5.63707 20.2392 6.41812L16.1538 10.5034M3 3L10.5002 10.5002M21 21L13.3286 13.3286M13.3286 13.3286L8.37744 18.2798C7.61579 19.0415 7.23497 19.4223 6.8012 19.7252C6.41618 19.994 6.00093 20.2167 5.56398 20.3887C5.07171 20.5824 4.54375 20.6889 3.48793 20.902L3 21.0004L3.04745 20.6683C3.21536 19.4929 3.29932 18.9052 3.49029 18.3565C3.65975 17.8697 3.89124 17.4067 4.17906 16.979C4.50341 16.497 4.92319 16.0772 5.76274 15.2377L10.5002 10.5002M13.3286 13.3286L10.5002 10.5002" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
</svg><p style="">Ο χρήστης δεν έχει κάνει καμία καταχώρηση.</p></div>`;
                        return;
                    }
                    localStorage.setItem(`sentByUser-${emri}`, JSON.stringify(sentbyuser))
                    if (!dontSpawn) {
                        spawnIn(sentbyuser)
                    }






                }).catch(error => {
                    document.getElementById("sentBySelectedUser").innerHTML = `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center;width:100%;text-align: center;margin-top:15px;gap: 5px;"><svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" fill="none">
<path d="M5.67139 4.25705L19.7431 18.3287C21.1538 16.6049 22.0001 14.4013 22.0001 12C22.0001 6.47715 17.523 2 12.0001 2C9.59885 2 7.39526 2.84637 5.67139 4.25705Z" fill="#f54248"/>
<path d="M4.25705 5.67126C2.84637 7.39514 2 9.59873 2 12C2 17.5228 6.47715 22 12 22C14.4013 22 16.6049 21.1536 18.3287 19.7429L4.25705 5.67126Z" fill="#f54248"/>
</svg><p style="">Σφάλμα Δικαιωμάτων</p></div>`;
                    console.error(error);
                });
        }

        setTimeout(function () {
            try {
                if (localStorage.getItem(`sentByUser-${emri}`)) {
                    spawnIn(JSON.parse(localStorage.getItem(`sentByUser-${emri}`)), true)
                } else {
                    loadFresh()
                }
            } catch (err) {
                localStorage.removeItem(`sentByUser-${emri}`)
            }
        }, 800)
    }
    loadSentByUser(emri)
    switchToHome_Search(null, true)
}

let search_loadedUsers = []
function openSearch(el, inBackground) {
    document.getElementById("search-in").style.display = 'none'
    saveLastPage('search')
    el.classList.add('active')
    el.style.transition = "transform 0.3s ease";
    el.style.transform = "scale(1.2)";

    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 300);
    if (!inBackground) {
        el.classList.add('active');
        document.getElementById("bar").classList.remove("ai")
        document.getElementById("discovery-switch").classList.remove("active");
        document.getElementById("home-switch").classList.remove("active");
        document.getElementById("profile-switch").classList.remove("active");
        document.getElementById("search-discovery").style.display = 'block';

        document.getElementById("home").style.display = 'none';
        document.getElementById("profile").style.display = 'none';
        document.getElementById("discover").style.display = 'none';
    }




    function saveNames(stealth = false) {
        fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
            .then(response => response.json())
            .then(names => {
                if (!stealth) {
                    spawnItems(names);
                }
                localStorage.setItem("jeanne_names_global", JSON.stringify(names));
            })
            .catch(error => console.error("Jeanne D'arc Database is offline."));
    }

    const local = localStorage.getItem("jeanne_names_global");
    if (local) {
        console.log("Names are local");
        //spawnItems(JSON.parse(local));
        //saveNames(true);
    } else {
        console.log("Fresh start");
        document.getElementById("allUsers").innerHTML = `<div style="display:flex;flex-direction:column;width:100%;align-items:center;gap:5px;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload" style="--active-upload: #ffffff;
            --track-upload: #4a4a4a;width: 25px;">
                <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                    class="active-upload"></circle>
                <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                    class="track-upload"></circle>
            </svg><p style="text-align:center;">Γίνεται Φόρτωση..</p></div>`;
        //saveNames();
    }
    const ac = localStorage.getItem("jeanDarc_accountData");
    if (!ac) { return; }
    search_loadedUsers = []
    const parsed = JSON.parse(ac)
    fetch(`https://arc.evoxs.xyz/?metode=rekomandimet&emri=${parsed.name}&pin=${atob(parsed.pin)}`)
        .then(response => response.json())
        .then(names => {
            console.log("spawning items")
            let json = { names: {} }
            names.forEach(name => {
                json.names[name] = {}
            })

            spawnItems(json, null, names);


        })
        .catch(error => {
            document.getElementById("allUsers").innerHTML = `<p style="text-align:center;">Κάτι απέτυχε.</p>`;
            console.error("Jeanne D'arc Database is offline?", error)

        });


    //Stealth meaning -> client will refresh local data without changing the ui

}

function openHome(el) {
    saveLastPage('home')
    el.classList.add('active')
    el.style.transition = "transform 0.3s ease";
    el.style.transform = "scale(1.2)";

    setTimeout(() => {
        el.style.transform = "scale(1)";
    }, 300);
    document.getElementById("bar").classList.remove("ai")
    document.getElementById("discovery-switch").classList.remove("active")
    document.getElementById("profile-switch").classList.remove("active")
    document.getElementById("search-switch").classList.remove("active")
    document.getElementById("search-cont-3").style.display = 'none'

    document.getElementById("home").style.display = 'block'
    document.getElementById("profile").style.display = 'none'
    document.getElementById("search-discovery").style.display = 'none'
    document.getElementById("discover").style.display = 'none'
}

let noticeAction = null
let noticeData = null
function noticeFront(data) {
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
        const addon = data.function.icon === 'JD'
            ? {
                icon: "jeanne:logo",
                title: "Jeanne d'Arc",
                desc: data.function.innerAddonTxt
            }
            : null; // Use null, not empty string

        EvalertNext({
            title: data.title,
            description: data.description,
            buttons: ["Συνέχεια"],
            buttonAction: [
                'noticeFetch(noticeData)'
            ],
            addons: addon ? [addon] : [] // Only add if addon exists
        });

    }

    return;
    document.getElementById("notice-box").style.display = 'flex'
    document.getElementById("notice-title").innerHTML = data.title
    document.getElementById("notice-description").innerHTML = data.description

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
    informacion(foundName)
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

function analyzeUser(e, rej) {
    if (rej) {
        Evalert({
            "title": `Να επιτρέπεται στο "AIT" να έχει πρόσβαση στα δεδομένα σας;`,
            "description": "Το AIT θα μπορεί να διαβάσει και να επεξεργαστεί τα δεδομένα σας.",
            "buttons": ["Να επιτρέπεται", "Να μην επιτρέπεται"],
            "buttonAction": ["analyzeUser(document.getElementById('aitbtn'))"],
            "addons": [],
            "clouds": true,
            "clouds_data": ["SELF", "EVOX"]
        })
        return;
    }
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

function registerSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
                alert(`Service Worker registered with scope: ${registration.scope}`)
            })
            .catch(error => {
                alert(`Service Worker registration failed: ${error}`)
                console.error('Service Worker registration failed:', error);
            });
    }

}

function unregisterSW() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
            registrations.forEach(registration => {
                registration.unregister().then(() => {
                    alert('Service Worker unregistered:', registration); s
                    console.log('Service Worker unregistered:', registration);
                });
            });
        }).catch(error => {
            alert(`Error unregistering Service Worker: ${error}`)
            console.error('Error unregistering Service Worker:', error);
        });
    }

}

function extMention(emri) {
    if (emri === foundName) {
        console.log("Is self user")
        openProfile(document.getElementById("profile-switch"))
        return;
    }
    console.log("Mentioned:", emri)
    openSearch(document.getElementById("search-switch"))
    showProfileInfo(emri)
}

function acceptFlorida() {
    Evalert({
        "title": `Να επιτρέπεται στο "Evox" να σας στέλνει ειδοποιήσεις;`,
        "description": "Οι ειδοποιήσεις μπορεί να περιλαμβάνουν νέες καταχωρήσεις, νέες συνδέσεις και ενημερώσεις ασφαλείας.",
        "buttons": ["Να επιτρέπεται", "Να μην επιτρέπεται"],
        "buttonAction": ["notificationsStart(true)"],
        "addons": [],
        "clouds": true,
        "clouds_data": ["SELF", "EVOX", "Jeanne"]
    })

}

function notificationsStart(ready) {
    if (!ready) {
        acceptFlorida()
        return;
    }
    console.log("Accepted")
    async function subscribeToPush() {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: 'BBoqxxWQqXtAublhzxhuDX5CtQqLFE5OUkGlA9Ezsyae6XYepxyn94FL8y4rR7mF7MH06OBIK9OFX-Z9YDKRtB4'
        });
        console.log("Push Subscription:", JSON.stringify(subscription));

        const account = localStorage.getItem("jeanDarc_accountData")
        if (account) {
            const info = JSON.parse(account)
            const payload = {
                emri: info.name,
                pin: atob(info.pin),
                subscription: subscription
            }
            // Send subscription to your server
            await fetch('https://arc.evoxs.xyz/subscribeFL', {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' }
            });
        }

    }

    async function requestNotificationPermission() {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            alert("Notification permission granted.");
            subscribeToPush();
        } else {
            alert("Notification permission denied.");
        }
    }
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                requestNotificationPermission();
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    }





}

function showNotice() {
    getImage(foundName).then(profileSrc => {
        document.getElementById("cloudsProfile").innerHTML = `<div class="mainIcon"><img id="myProfile-Animt" class="new" src="${profileSrc.imageData}"></div>`;
        document.getElementById("myProfile-Animt").addEventListener('animationend', function () {
            document.getElementById("myProfile-Animt").classList.remove("new")
        });
        getRandomClassmates(foundName).then(usersJson => {
            let count = 0
            usersJson.forEach(user => {
                console.log("Cloud:", user)

                let html;
                getImage(user.name).then(userSrc => {
                    count++
                    console.log("Cloud has image:", userSrc !== null)
                    const randomString = [...Array(15)]
                        .map(() => Math.random().toString(36)[2])
                        .join('');
                    if (count === 1) {
                        html = `<div style="position: absolute;margin-right: 110px;z-index: 998;margin-bottom: 70px;">
                        <img id="${randomString}" class="new" style="width: 60px;height: 60px;border-radius: 50%;" src="${userSrc ? userSrc.imageData : user.icon}">
                    </div>`;
                        document.getElementById("cloudsProfile").innerHTML += html
                    } else if (count === 2) {
                        html = `<div style="position: absolute;margin-right: 110px;z-index: 998;margin-top: 90px;">
                        <img id="${randomString}" class="new" style="width: 50px;height: 50px;border-radius: 50%;" src="${userSrc ? userSrc.imageData : user.icon}">
                    </div>`
                        document.getElementById("cloudsProfile").innerHTML += html
                    } else if (count === 3) {
                        html = `<div style="position: absolute;margin-left: 120px;z-index: 998;margin-bottom: 55px;">
                        <img id="${randomString}" class="new" style="width: 50px;height: 50px;border-radius: 50%;" src="${userSrc ? userSrc.imageData : user.icon}">
                    </div>`
                        document.getElementById("cloudsProfile").innerHTML += html
                    } else if (count === 4) {
                        html = `<div style="position: absolute;margin-left: 110px;z-index: 998;margin-top: 80px;">
                        <img id="${randomString}" class="new" style="width: 40px;height: 40px;border-radius: 50%;" src="${userSrc ? userSrc.imageData : user.icon}">
                    </div>`
                        document.getElementById("cloudsProfile").innerHTML += html
                    } else {
                        return;
                    }
                    document.getElementById(randomString).addEventListener('animationend', function () {
                        document.getElementById(randomString).classList.remove("new")
                    });


                })



            })
        });
        getRandomClassmates(foundName).then(usersJson => {
            let count2 = 0
            usersJson.forEach(user => {

                let html;
                getImage(user.name).then(userSrc => {
                    const randomString = [...Array(15)]
                        .map(() => Math.random().toString(36)[2])
                        .join('');
                    count2++
                    if (count2 === 1) {
                        html = `<div style="position: absolute;margin-left: 110px;z-index: 998;margin-top: 80px;">
                    <img id="${randomString}" class="new" style="width: 40px;height: 40px;border-radius: 50%;" src="${userSrc ? userSrc.imageData : user.icon}">
                </div>`;
                        document.getElementById("cloudsProfile").innerHTML += html
                        document.getElementById(randomString).addEventListener('animationend', function () {
                            document.getElementById(randomString).classList.remove("new")
                        });
                    }
                })
            })

        });
    });


}

function Evalert(message) {
    const exampleMessage = {
        "title": "",
        "description": "",
        "buttons": ["Συνέχεια"],
        "addons": []
    }
    document.getElementById("buttonsEvalert").innerHTML = ''
    const el = document.getElementById("evox-notice")
    document.getElementById("navigation").style.opacity = '0'
    el.querySelector(".popnotice").querySelector('h2').innerHTML = message.title
    el.querySelector(".popnotice").querySelector('p').innerHTML = message.description
    let btnCount = 0
    message.buttons.forEach(button => {

        document.getElementById("buttonsEvalert").innerHTML += `<div
                    onclick="${message.buttonAction[btnCount] ? message.buttonAction[btnCount] + ';evalertclose()' : 'evalertclose()'}">
                    ${button}
                </div>`
        btnCount++
    })
    if (message.addons.length !== 0) {
        console.log("triggering 1")
        document.getElementById("cloudEvoxMain").style.gap = "10px"
        document.getElementById("cloudEvoxMain").innerHTML = ''
    } else {
        console.log("triggering 2")
        document.getElementById("cloudEvoxMain").style.gap = "0"
        document.getElementById("cloudEvoxMain").innerHTML = ''
        document.getElementById("cloudEvoxMain").style.display = 'none'
    }
    message.addons.forEach(add => {
        document.getElementById("cloudEvoxMain").innerHTML += `<div class="actionUnlocked">
                    ${add.icon === 'lock' ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                        fill="none">
                        <path
                            d="M18 2c-2.762 0-5 2.238-5 5v3H4.6c-.88 0-1.6.72-1.6 1.6v7C3 19.92 4.08 21 5.4 21h9.2c1.32 0 2.4-1.08 2.4-2.4v-7c0-.88-.72-1.6-1.6-1.6H15V7c0-1.658 1.342-3 3-3s3 1.342 3 3v3a1 1 0 1 0 2 0V7c0-2.762-2.238-5-5-5Z"
                            fill="#FFF" />
                    </svg>`: add.icon === 'jeanne:logo' ? `<img src="assetView-2.png" style="width: 25px;height: 25px;">` : `<img src="assetView-2.png" style="width: 25px;height: 25px;">`}
                    <div class="actionunlockedtext">
                        <span>${add.title}</span>
                        <desc>${add.desc}</desc>
                    </div>
                </div>`
    })
    if (message.clouds === true) {
        document.getElementById("cloudingNotice").style.display = null;
        document.getElementById("cloudingNotice").style.padding = "10px";
        document.getElementById("cloudingNotice").innerHTML = ''

        message.clouds_data.forEach(cloud => {
            if (cloud === 'SELF' && foundName) {
                getImage(foundName).then(profileSrc => {
                    document.getElementById("cloudingNotice").innerHTML += `<div class="mainIcon">
                    <img src="${profileSrc.imageData}">
                </div>`
                })
            } else if (cloud === 'EVOX') {
                document.getElementById("cloudingNotice").innerHTML += `<div style="position: absolute;margin-right: 110px;z-index: 998;margin-bottom: 70px;">
                     <img style="width: 60px;height: 60px;border-radius: 50%;" src="../evox-epsilon-beta/evox-logo-apple.png">
                </div>`
            } else if (cloud === 'Jeanne') {
                document.getElementById("cloudingNotice").innerHTML += `<div style="position: absolute;margin-left: 120px;z-index: 998;margin-bottom: 55px;">
                     <img style="width: 50px;height: 50px;border-radius: 50%;" src="appLogoV2.png">
                </div>`
            } else {
                getImage(cloud).then(profileSrc => {
                    document.getElementById("cloudingNotice").innerHTML += `<div style="position: absolute;margin-left: 120px;z-index: 998;margin-bottom: 55px;">
                     <img style="width: 50px;height: 50px;border-radius: 50%;" src="${profileSrc.imageData}">
                </div>`
                })
            }


        })

    } else {
        document.getElementById("cloudingNotice").style.padding = '0';
        document.getElementById("cloudingNotice").style.gap = "0"
        document.getElementById("cloudingNotice").innerHTML = ''
        document.getElementById("cloudingNotice").style.display = 'none'
    }
    //document.getElementById("app").style.opacity = "0.1"
    el.classList.add("active")
}

function evalertclose() {
    setTimeout(function () {
        document.getElementById('evox-notice').classList.remove('active');
        //document.getElementById('app').style.opacity = '1'
        document.getElementById("navigation").style.opacity = '1'
    }, 300)
}

function EvalertNext(json) {
    if (document.getElementById("evox-notice").classList.contains("active")) {
        let main = setInterval(function () {
            if (!document.getElementById("evox-notice").classList.contains("active")) {
                Evalert(json)
                clearInterval(main)
            }
        }, 500)
    } else {
        Evalert(json)
    }
}

function showMedia(el) {
    document.getElementById("carouselItem-1").classList.remove("active")
    document.getElementById("carouselItem-2").classList.remove("active")
    document.getElementById("carouselItem-3").classList.remove("active")
    el.classList.add('active')
    document.getElementById("fromMe_Slider").style.display = 'none'
    document.getElementById("media").style.display = 'flex'
    const account_data = localStorage.getItem("jeanDarc_accountData")
    if (!account_data) { return; }
    const pars = JSON.parse(account_data)
    document.getElementById("allMedia").classList.add("centerIt")
    document.getElementById("allMedia").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload" style="width: 25px;--active-upload: #ffffff;
            --track-upload: #4a4a4a;">
                <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                    class="active-upload"></circle>
                <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                    class="track-upload"></circle>
            </svg>
            <p>Γίνεται λήψη των πολυμέσων σου.</p>`
    fetch(`https://arc.evoxs.xyz/?metode=getMedia&emri=${foundName}&pin=${atob(pars.pin)}`)
        .then(response => response.json())
        .then(mediaFiles => {

            const container = document.getElementById("allMedia");
            let cn = 0

            mediaFiles.forEach(media => {
                const img = new Image();

                img.className = 'fade-in-slide-up';
                img.src = `https://cdn.evoxs.xyz/jeannedarc/${foundName}/${media}/1`;

                img.onload = () => {
                    container.appendChild(img);
                    cn++
                    if (cn === 1) {
                        container.innerHTML = ''
                        container.classList.remove("centerIt");
                    }
                };

                img.onclick = function () {
                    window.location.href = `https://cdn.evoxs.xyz/jeannedarc/${foundName}/${media}/all`;
                }

                img.onerror = () => {
                    img.className = 'broken';
                    img.src = 'https://cdn.evoxs.xyz/jeannedarc/404/404.png/1'
                    container.appendChild(img);
                };
            });

            if (mediaFiles.length === 0) {
                document.getElementById("allMedia").innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="40px" height="40px" viewBox="0 0 24 24" data-name="Layer 1"><path d="M19.5,4H10a1,1,0,0,0,0,2H19.5a1,1,0,0,1,1,1v6.76l-1.88-1.88a3,3,0,0,0-1.14-.71,1,1,0,1,0-.64,1.9.82.82,0,0,1,.36.23l3.31,3.29a.66.66,0,0,0,0,.15.83.83,0,0,0,0,.15,1.18,1.18,0,0,0,.13.18.48.48,0,0,0,.09.11.9.9,0,0,0,.2.14.6.6,0,0,0,.11.06.91.91,0,0,0,.37.08,1,1,0,0,0,1-1V7A3,3,0,0,0,19.5,4ZM3.21,2.29A1,1,0,0,0,1.79,3.71L3.18,5.1A3,3,0,0,0,2.5,7V17a3,3,0,0,0,3,3H18.09l1.7,1.71a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42ZM4.5,7a1,1,0,0,1,.12-.46L7.34,9.25a3,3,0,0,0-1,.63L4.5,11.76Zm1,11a1,1,0,0,1-1-1V14.58l3.3-3.29a1,1,0,0,1,1.4,0L15.91,18Z"/></svg>
            <p>Η συλλογή σου είναι άδεια.</p>`
            }




        }).catch(error => {
            console.log('Error:', error);
        });
}

function showFromMe(el) {
    document.getElementById("carouselItem-1").classList.remove("active")
    document.getElementById("carouselItem-2").classList.remove("active")
    document.getElementById("carouselItem-3").classList.remove("active")
    el.classList.add('active')
    document.getElementById("fromMe_Slider").style.display = null
    document.getElementById("media").style.display = 'none'
}

function showMentioned() {
    document.getElementById("foryou-carousel").classList.remove("active")
    document.getElementById("mentioned-carousel").classList.add("active")

    document.getElementById("foryou").style.display = 'none'
    document.getElementById("mentioned").classList.remove("mentioned")

    const lc = localStorage.getItem("jeanDarc_accountData");
    if (!lc) return;

    const pars = JSON.parse(lc);
    const pin = atob(pars.pin);
    hasCurrentSixLoaded = false;
    const j = 6
    let skel = `<p>[EVOX] Not ready yet..</p>`
    for (let i = 0; i < j; i++) {
        skel += `<div class="postContainer skel loading" style="padding-bottom: 10px;padding-top: 10px;">
                        <div class="post">
                            <div style="display: flex;flex-direction: row;">
                                <div class="profilePicture">
                                    <span style="background-color: #4c4c4c;width: 45px;height: 45px;border-radius: 50%;">
                                </div>
                                <div class="postInfo">
                                    <div class="userInfo">
                                        <p class="skeleton"></p>
                                        <span class="skeleton"></span>
                                    </div>
                                    <div class="postContent">
                                       <p class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                        <p style="margin-top: 5px;" class="skeleton"></p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>`
    }
    document.getElementById("mentioned").innerHTML = skel
    //https://arc.evoxs.xyz/?metode=toMe&emri=${foundName}&pin=${process}
}


function searchByInput() {
    const el = document.getElementById("search-box")
    const queryParts = el.value.split(" ");
    let complete = []
    queryParts.forEach(part => {
        if (part.length > 0) {
            const matchedNames = findFullNames(part);
            matchedNames.forEach(name => {
                if (!complete.includes(name)) {
                    complete.push(name)
                }
            })
        }
    })
    document.getElementById("searchedUsers").innerHTML = ``;
    console.warn("Search Results, Cleared:", complete)
    let target = complete.length;
    let workingOn = 0
    console.warn("Lengths:", el.value.length)
    if (complete.length === 0 && el.value.length >= 2) {
        document.getElementById("searchedUsers").innerHTML = `<div id="temp-load-indi-search" style="display:flex;flex-direction:column;width:100%;align-items:center;gap:5px;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="0 0 32 32" version="1.1">
<path d="M30.885 29.115l-10.132-10.132c1.555-1.9 2.497-4.355 2.497-7.029 0-3.092-1.26-5.89-3.294-7.909l-0.001-0.001h-0.002c-2.036-2.040-4.851-3.301-7.961-3.301-6.213 0-11.249 5.036-11.249 11.249 0 3.11 1.262 5.924 3.301 7.961l0 0c2.019 2.036 4.817 3.297 7.91 3.297 2.674 0 5.128-0.942 7.048-2.513l-0.020 0.016 10.132 10.132c0.226 0.226 0.539 0.366 0.884 0.366 0.691 0 1.251-0.56 1.251-1.251 0-0.345-0.14-0.658-0.366-0.884l0 0zM5.813 18.186c-1.583-1.583-2.563-3.771-2.563-6.187 0-4.832 3.917-8.749 8.749-8.749 2.416 0 4.603 0.979 6.187 2.563h0.002c1.583 1.583 2.563 3.77 2.563 6.186s-0.979 4.602-2.561 6.185l0-0-0.004 0.002-0.003 0.004c-1.583 1.582-3.769 2.56-6.183 2.56-2.417 0-4.604-0.98-6.187-2.564l-0-0zM13.768 12l1.944-1.944c0.226-0.226 0.366-0.539 0.366-0.884 0-0.69-0.56-1.25-1.25-1.25-0.345 0-0.658 0.14-0.884 0.366l-1.944 1.944-1.944-1.944c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l1.944 1.944-1.944 1.944c-0.226 0.226-0.366 0.539-0.366 0.884 0 0.69 0.56 1.25 1.25 1.25 0.345 0 0.658-0.14 0.884-0.366v0l1.944-1.944 1.944 1.944c0.226 0.226 0.539 0.366 0.884 0.366 0.69 0 1.25-0.56 1.25-1.25 0-0.345-0.14-0.658-0.366-0.884v0z"/>
</svg><p style="text-align:center;">Δεν βρέθηκαν αποτελέσματα.</p></div>`
        return;
    }
    if (complete.length === 0 && el.value.length === 0 || el.value.length <= 2) {
        console.warn("Triggered hide")
        document.getElementById("allUsers").style.display = null
        document.getElementById("searchedUsers").style.display = 'none';
    } else {

        console.warn("Triggered show")
        document.getElementById("searchedUsers").innerHTML = `<div id="temp-load-indi-search" style="display:flex;flex-direction:column;width:100%;align-items:center;gap:5px;justify-content:center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384" class="loader-upload" style="--active-upload: #ffffff;
            --track-upload: #4a4a4a;width: 25px;">
                <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                    class="active-upload"></circle>
                <circle r="176" cy="192" cx="192" stroke-width="32" fill="transparent" pathLength="360"
                    class="track-upload"></circle>
            </svg><p style="text-align:center;">Γίνεται Αναζήτηση..</p></div>`
        document.getElementById("allUsers").style.display = 'none'
        document.getElementById("searchedUsers").style.display = 'block';
    }
    setTimeout(function () {
        complete.forEach(name => {
            workingOn++
            informacion(name)
                .then(info => {
                    let src = info.foto;
                    try {
                        if (document.getElementById("searchedUsers").innerHTML.includes(name)) {
                            return;
                        }
                        getImage(info.emri).then(profileSrc => {
                            //console.log(profileSrc);
                            if (profileSrc) {
                                src = profileSrc.imageData;
                            } else {
                                src = info.foto
                            }

                            document.getElementById("searchedUsers").innerHTML += `
    <div class="postContainer fade-in-slide-up" style="padding-bottom: 10px;padding-top: 10px;">
        <div class="post">
            <div class="profilePicture">
                <img src="${src}">
            </div>
            <div class="postInfo">
                <div class="userInfo">
                    <p onclick="extMention('${info.emri}')">${info.emri} 
                    ${info.seksioni === 'ΚΑΘ' ? '<svg style="margin-left: 5px" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" id="verified" class="icon glyph"><path d="M21.6,9.84A4.57,4.57,0,0,1,21.18,9,4,4,0,0,1,21,8.07a4.21,4.21,0,0,0-.64-2.16,4.25,4.25,0,0,0-1.87-1.28,4.77,4.77,0,0,1-.85-.43A5.11,5.11,0,0,1,17,3.54a4.2,4.2,0,0,0-1.8-1.4A4.22,4.22,0,0,0,13,2.21a4.24,4.24,0,0,1-1.94,0,4.22,4.22,0,0,0-2.24-.07A4.2,4.2,0,0,0,7,3.54a5.11,5.11,0,0,1-.66.66,4.77,4.77,0,0,1-.85.43A4.25,4.25,0,0,0,3.61,5.91,4.21,4.21,0,0,0,3,8.07,4,4,0,0,1,2.82,9a4.57,4.57,0,0,1-.42.82A4.3,4.3,0,0,0,1.63,12a4.3,4.3,0,0,0,.77,2.16,4,4,0,0,1,.42.82,4.11,4.11,0,0,1,.15.95,4.19,4.19,0,0,0,.64,2.16,4.25,4.25,0,0,0,1.87,1.28,4.77,4.77,0,0,1,.85.43,5.11,5.11,0,0,1,.66.66,4.12,4.12,0,0,0,1.8,1.4,3,3,0,0,0,.87.13A6.66,6.66,0,0,0,11,21.81a4,4,0,0,1,1.94,0,4.33,4.33,0,0,0,2.24.06,4.12,4.12,0,0,0,1.8-1.4,5.11,5.11,0,0,1,.66-.66,4.77,4.77,0,0,1,.85-.43,4.25,4.25,0,0,0,1.87-1.28A4.19,4.19,0,0,0,21,15.94a4.11,4.11,0,0,1,.15-.95,4.57,4.57,0,0,1,.42-.82A4.3,4.3,0,0,0,22.37,12,4.3,4.3,0,0,0,21.6,9.84Zm-4.89.87-5,5a1,1,0,0,1-1.42,0l-3-3a1,1,0,1,1,1.42-1.42L11,13.59l4.29-4.3a1,1,0,0,1,1.42,1.42Z" style="fill:#179cf0"/></svg>' : ''}</p>
                </div>
                <div class="postContent">
                    <p>${info.seksioni}${info.klasa !== 'none' ? info.klasa : ''}</p>
                </div>
            </div>
            <div onclick="showProfileInfo('${info.emri}')" class="showProfileBtn">Προβολή</div>
        </div>
    </div>`;
                            //fetchAndSaveImage(info.emri, info.foto); // Store the image locally

                            // Check if count meets target, resolve the promise
                            if (workingOn >= target) {

                                try {
                                    if (document.getElementById("temp-load-indi-search")) {
                                        document.getElementById("temp-load-indi-search").style.display = 'none'
                                    }
                                } catch (err) {
                                    console.warn(err)
                                }
                            }
                        })




                    } catch (error) {
                        console.error("Error fetching image:", error);
                    }
                })
                .catch(error => {
                    console.error("Jeanne D'arc Database is offline:", error);
                });
        })
    }, 500)

}
document.getElementById("search-box-2").addEventListener("input", () => {
    document.getElementById("search-box").value = document.getElementById("search-box-2").value
    searchByInput()
    document.getElementById("search-box").focus()
})

document.getElementById("search-box").addEventListener("input", () => {
    searchByInput()
    document.getElementById("search-box-2").value = document.getElementById("search-box").value
});

function revertAlphaBackground() {
    document.getElementById("bgGrd").style.display = document.getElementById("bgGrd").style.display === 'none' ? null : 'none'
    document.getElementById("gradColored").style.display = document.getElementById("gradColored").style.display === 'none' ? null : 'none'
}

document.addEventListener("DOMContentLoaded", () => {
    const interBubble = document.querySelector(".interactive");
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener("mousemove", (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});

revertAlphaBackground()

