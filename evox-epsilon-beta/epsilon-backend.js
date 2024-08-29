sessionStorage.removeItem("current_sline")
sessionStorage.removeItem("lastChatInter")
sessionStorage.removeItem("lastChatMessages")
//IP Auth
let ip = "error";
document.addEventListener("DOMContentLoaded", function () {
    fetch('https://jsonip.com/')
        .then(response => response.json())
        .then(geo => {
            console.log("IP Modifications:", localStorage.getItem("IPV4") !== geo.ip)
            if (localStorage.getItem("IPV4") !== geo.ip) {
                localStorage.setItem("IPV4", geo.ip);
                console.log("New IP")
            }

            ip = geo.ip;
            clientVerified()
        })
        .catch(error => {

            ip = localStorage.getItem("IPV4") || "offline"
            console.error("IP Api is offline, ignoring")
            clientVerified()
            console.log('Error:', error);
        });
    setTimeout(function () {
        loadProfile()
    }, 1500)
});

function checkForUpdates() {
    fetch(`https://evoxs.xyz/evox-epsilon-beta/epsilon-backend.js?v=${Math.floor(Math.random() * 100000)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(jsFile => {
            const versionRegex = /const appVersion\s*=\s*'(\d+\.\d+\.\d+)'/;

            // Extract the version number using the regex
            const matche = jsFile.toString().match(versionRegex);

            // Check if a match is found and get the version number
            const version = matche ? matche[1] : null;
            if (version) {
                if (appVersion < version) {
                    $("#updateCheck").html("You are using an older version.")
                    $("#updateCheck").fadeIn('fast')
                } else if (appVersion > version) {
                    $("#updateCheck").html("You are using a debug version.")
                    $("#updateCheck").fadeIn('fast')
                } else if (appVersion === version) {
                    $("#updateCheck").html("Evox is up to date.")
                    $("#updateCheck").fadeIn('fast')
                } else { return; }
                setTimeout(function () {
                    $("#updateCheck").fadeOut('fast')
                }, 5000)
            }
        })
        .catch(error => {
            console.error('Error fetching the JavaScript file:', error);
        });
}


const appVersion = '6.3.0'
function loadAppAbout() {
    document.getElementById("appVersion").innerHTML = appVersion
    try {
        navigator.serviceWorker.getRegistrations().then(function (registrations) {
            if (registrations.length > 0) {
                console.log('Service Worker is registered');

                document.getElementById("swStatus").innerText = 'Registered'
                caches.has('epsilon-cache-v1').then((exists) => {
                    if (exists) {

                        if (navigator.onLine) {
                            document.getElementById("offlinemode-status").innerText = 'Ready'
                        } else {
                            document.getElementById("offlinemode-status").innerText = 'Active'
                        }
                    } else {
                        document.getElementById("offlinemode-status").innerText = 'Unset'
                    }
                }).catch((error) => {

                    document.getElementById("offlinemode-status").innerText = 'Not Supported'
                    console.error('Error checking cache existence:', error);
                });
            } else {
                console.log('No Service Worker is registered');
                document.getElementById("offlinemode-status").innerText = 'Unset'
                document.getElementById("swStatus").innerText = 'Ready'
            }
        }).catch(function (error) {
            console.error('Error fetching service worker registrations:', error);
        });
    } catch (error) {
        console.log("Sw failed")
        document.getElementById("offlinemode-status").innerText = 'Disabled'
        document.getElementById("swStatus").innerText = 'Not Supported'
    }


}

function loadBackground() {
    const gradient = localStorage.getItem("customEpsilonGradient")
    let colorScheme;
    console.log("Grad:", gradient)
    const root = document.documentElement;
    if (gradient === 'purple') {
        console.log("Setting Purple")
        root.style.setProperty('--color-bg1', 'rgba(108, 0, 162, 1)');
        root.style.setProperty('--color-bg2', 'rgba(0, 17, 82, 1)');
        root.style.setProperty('--color1', '76, 0, 162');
        root.style.setProperty('--color2', '0, 82, 139');
        root.style.setProperty('--color3', '0, 160, 176');
        root.style.setProperty('--color4', '103, 93, 98');
        root.style.setProperty('--color5', '17, 19, 26');
        root.style.setProperty('--color-interactive', '140, 100, 255');
    } else if (gradient === 'blue') {
        console.log("Setting Blue")
        root.style.setProperty('--color-bg1', 'rgba(0, 17, 82, 1)');
        root.style.setProperty('--color-bg2', 'rgba(0, 105, 224, 1)');
        root.style.setProperty('--color1', '0, 43, 109');
        root.style.setProperty('--color2', '0, 82, 139');
        root.style.setProperty('--color3', '0, 160, 224');
        root.style.setProperty('--color4', '68, 85, 104');
        root.style.setProperty('--color5', '15, 18, 35');
        root.style.setProperty('--color-interactive', '60, 160, 255');
    } else if (gradient === 'default') {
        console.log("Leaving Default -> Got from storage")
    } else {
        console.log("Leaving Default")
    }

    $("#background").fadeIn("fast")
    $("#bggradient").fadeIn("fast")


}
//IndexedDB
function loadPFPget(username, isCanvas) {
    return new Promise((resolve, reject) => {
        checkUsernameAndGetData(username, function (error, data) {
            if (error) {
                console.error(error);
                reject(error);
            } else {

                if (data !== "None") {
                    // Resolve with data if available
                    console.log(`Retrieved profile picture for user [${username}]`);
                    resolve(data.data);
                    //console.log(`Refreshing picture for ${username}`)
                    if (isCanvas) {
                        return;
                    }
                    return;
                    fetch(`${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(profileimage => {
                            setNetworkStatus('on')
                            if (profileimage.indexOf("base64") === -1) {
                                profileimage = "data:image/jpeg;base64," + profileimage;
                            }
                            if (profileimage !== data.data) {
                                console.log(`Found new picture for user ${username}`)
                                profilesLocal(username, profileimage);
                            } else {
                                console.log(`Client has latest picture for ${username}`)
                            }

                        })
                        .catch(error => {
                            setNetworkStatus('off')
                            console.error("Cannot refresh", username);
                            console.error(error);
                            reject(error);
                        });
                } else {
                    if (isCanvas) {
                        console.warn("Cannot get a canvas from profiles database. Use saveVideoAsBlob(username, videoUrl).")
                        resolve('Canvas Not Found')
                        return;
                    }
                    console.log(`Loaded profile picture for user [${username}]`);
                    fetch(`${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(profileimage => {
                            setNetworkStatus('on')
                            if (profileimage.indexOf("base64") === -1) {
                                profileimage = "data:image/jpeg;base64," + profileimage;
                            }
                            // Resolve with profile image
                            resolve(profileimage);
                            profilesLocal(username, profileimage);
                        })
                        .catch(error => {
                            setNetworkStatus('off')
                            console.error("Cannot set src for", username);
                            console.error(error);
                            reject(error);
                        });
                }
            }
        });
    });
}

function checkUsernameAndGetData(username, getDataCallback) {
    let request = window.indexedDB.open('EvoxSocial');

    request.onerror = function (event) {
        console.log("Database error:", event.target.error);
    };

    request.onsuccess = function (event) {
        // Database has been opened successfully
        let db = event.target.result;

        if (!db.objectStoreNames.contains('Profiles')) {
            // If the 'Profiles' object store doesn't exist, create it
            let version = db.version + 1;
            db.close(); // Close the database to perform the upgrade

            let upgradeRequest = window.indexedDB.open('EvoxSocial', version);

            upgradeRequest.onerror = function (event) {
                console.log("Database upgrade error:", event.target.error);
            };

            upgradeRequest.onupgradeneeded = function (event) {
                // Create the 'Profiles' object store
                let db = event.target.result;
                db.createObjectStore('Profiles', { keyPath: 'username' });
            };

            upgradeRequest.onsuccess = function (event) {
                console.log("Object store 'Profiles' created.");
                // After creating the object store, retry retrieving data
                checkUsernameAndGetData(username, getDataCallback);
            };
        } else {
            // If the 'Profiles' object store exists, proceed with retrieving data
            let transaction = db.transaction(['Profiles'], 'readonly');
            let objectStore = transaction.objectStore('Profiles');
            let getRequest = objectStore.get(username);

            getRequest.onsuccess = function (event) {
                let result = event.target.result;
                if (result) {
                    // Username exists, run the getDataCallback function to retrieve the data
                    getDataCallback(null, result);
                } else {
                    getDataCallback(null, "None");
                    //console.log("Username not found: " + username);
                }
            };

            getRequest.onerror = function (event) {
                console.log("Error checking username:", event.target.error);
            };
        }
    };
}

const DB_NAME = 'EvoxSocial';
const DB_VERSION = 3; // Update this number if you make schema changes

function profilesLocal(username, img) {
    let request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function (event) {
        console.log("Database error:", event.target.error);
    };

    request.onsuccess = function (event) {
        // Database has been opened successfully
        let db = event.target.result;

        // Proceed with adding or updating the user
        let transaction = db.transaction(['Profiles'], 'readwrite');
        let objectStore = transaction.objectStore('Profiles');

        let newUser = { data: img, username: username };
        let putRequest = objectStore.put(newUser); // Use 'put' to replace existing key

        putRequest.onsuccess = function (event) {
            console.log(`Operation [${username}] Profile Picture Succeeded.`);
        };

        putRequest.onerror = function (event) {
            console.log("Error adding or updating user:", event.target.error);
        };
    };

    request.onupgradeneeded = function (event) {
        let db = event.target.result;

        // Create object store if it does not exist
        if (!db.objectStoreNames.contains('Profiles')) {
            let objectStore = db.createObjectStore('Profiles', { keyPath: 'username' });
            objectStore.createIndex('usernameIndex', 'username', { unique: true });
        }
    };
}

function saveVideoAsBlob(username, videoUrl) {
    // Fetch the video data from the URL
    fetch(videoUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob(); // Convert the response to a Blob
        })
        .then(blob => {
            // Store the Blob in IndexedDB
            canvasLocal(username, blob);
        })
        .catch(error => {
            console.error('Error fetching or saving video:', error);
        });
}

function canvasLocal(username, imgBlob) {
    let request = window.indexedDB.open(DB_NAME, DB_VERSION); // Ensure DB_NAME and DB_VERSION are defined
    const identifier = `${username}_canvas`;

    request.onerror = function (event) {
        console.error("Database error:", event.target.error);
    };

    request.onsuccess = function (event) {
        let db = event.target.result;
        let transaction = db.transaction(['Profiles'], 'readwrite');
        let objectStore = transaction.objectStore('Profiles');

        // Ensure the object has the correct key path property
        let newUser = { data: imgBlob, username: identifier };

        console.log("Putting object into the store:", newUser); // Log the object

        let putRequest = objectStore.put(newUser);

        putRequest.onsuccess = function (event) {
            console.log(`Operation [${identifier}] succeeded.`);
        };

        putRequest.onerror = function (event) {
            console.error("Error adding or updating user:", event.target.error);
        };
    };

    request.onupgradeneeded = function (event) {
        let db = event.target.result;

        if (!db.objectStoreNames.contains('Profiles')) {
            // Create the object store with 'identifier' as the keyPath
            let objectStore = db.createObjectStore('Profiles', { keyPath: 'identifier' });
            console.log("Object store 'Profiles' created with keyPath 'identifier'");

            // Optionally, create indices if needed
            objectStore.createIndex('identifierIndex', 'identifier', { unique: true });
        } else {
            console.log("Object store 'Profiles' already exists.");
        }
    };
}



//UI
function attachUi(data, bypassRecommendations, onlyCarousel) {
    if (data === "") {
        console.log("No Friends")
        return;
    } else {
        console.log("User has friends", data)
        if (data.length <= 3 && !bypassRecommendations) {
            attachRecommendations(data)
        }
    }

    const carousel = document.getElementById("securelineCarousel");
    if (!bypassRecommendations) {
        carousel.innerHTML = ''
    }

    if (localStorage.getItem("favorites")) {
        try {
            const favoritesJson = JSON.parse(localStorage.getItem("favorites"))
            if (favoritesJson.length < 5) {
                favoritesJson.forEach((friend) => {
                    appendToCarousel(friend)
                })
                const remainingToAppend = 5 - favoritesJson.length
                let counting = 0;
                data.forEach((friend) => {
                    if (counting === remainingToAppend) {
                        return;
                    }
                    if (favoritesJson.includes(friend)) {
                        return;
                    } else {
                        counting = counting + 1
                        appendToCarousel(friend)
                    }
                })
            }
        } catch (error) {
            let firstFiveValues = data.slice(0, 5);
            firstFiveValues.forEach((friend) => {
                appendToCarousel(friend)
            })
        }
    } else {
        let firstFiveValues = data.slice(0, 5);
        firstFiveValues.forEach((friend) => {
            appendToCarousel(friend)
        })
    }



    function appendToCarousel(friendName) {
        if (friendName === localStorage.getItem("t50-username")) {
            return;
        }
        const slUserDiv = document.createElement("a");
        slUserDiv.id = `carousel-${friendName}`
        slUserDiv.href = `#secureline-${friendName}`
        if (bypassRecommendations) {
            slUserDiv.className = "slUser add";
        } else {
            slUserDiv.className = "slUser";
        }
        if (localStorage.getItem("favorites")) {
            const previous = JSON.parse(localStorage.getItem("favorites"))
            if (previous.includes(friendName)) {
                slUserDiv.onclick = function () {
                    const json = {
                        username: friendName,
                        favorite: true
                    }
                    openChat(json, 'home')
                }
            } else {
                slUserDiv.onclick = function () {
                    const json = {
                        username: friendName,
                        favorite: false
                    }
                    openChat(json, 'home')
                }
            }
        } else {
            slUserDiv.onclick = function () {
                const json = {
                    username: friendName,
                    favorite: false
                }
                openChat(json, 'home')
            }
        }

        const imgElement = document.createElement("img");
        imgElement.className = "slUserPFP";
        imgElement.src = "searching_users.gif";
        if (bypassRecommendations) {
            slUserDiv.innerHTML = slUserDiv.innerHTML + `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
            fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"
                fill="#fff" />
        </svg>`
        }
        loadPFPget(friendName)
            .then(profileImage => {
                imgElement.src = profileImage;
            }).catch(error => {
                setNetworkStatus('off')
                console.error(error);
            });
        slUserDiv.appendChild(imgElement);


        carousel.appendChild(slUserDiv);
    }

    if (onlyCarousel) {
        return;
    }
    //Social Info
    const social = document.getElementById("socialInfo");
    if (bypassRecommendations) {
        return;
    }
    social.innerHTML = ''

    data.sort(() => 0.5 - Math.random());
    let random3Values = data.slice(0, 3);
    random3Values.forEach((friend) => {
        if (friend === localStorage.getItem("t50-username")) {
            return;
        }


        const socialUserDiv = document.createElement('div');
        socialUserDiv.className = 'socialUser';
        socialUserDiv.id = `${friend}_socialHome`
        socialUserDiv.onclick = function () {
            showRemoteFriend(this.id)
        }

        // Create the image element
        const img = document.createElement('img');
        img.className = 'slUserPFP social';
        img.src = 'searching_users.gif';
        loadPFPget(friend)
            .then(profileImage => {
                img.src = profileImage;
            }).catch(error => {
                setNetworkStatus('off')
                console.error(error);
            });

        const p = document.createElement('p');
        p.textContent = friend;

        const span = document.createElement('span');


        fetch(`${srv}/accounts?method=getemailbyusername&username=${friend}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(friend_email => {
                setNetworkStatus('on')
                fetch(`${srv}/accounts?email=${friend_email}&username=${friend}&method=last_login`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(lastLogin => {
                        setNetworkStatus('on')
                        localStorage.setItem(`user-${friend}-lastLogin`, lastLogin)
                        console.log(lastLogin)
                        if (lastLogin !== 'Unknown') {
                            span.textContent = formatTimeDifference(lastLogin);
                        } else {
                            span.style.display = 'none'
                        }

                    }).catch(error => {
                        setNetworkStatus('off')
                        span.style.display = 'none'
                        console.error(error);
                    });

            }).catch(error => {
                setNetworkStatus('off')
                const data = localStorage.getItem(`user-${friend}-lastLogin`)
                if (data) {
                    console.warn("Server connection failed. Trying local")
                    const lastLogin = data
                    if (lastLogin !== 'Unknown') {
                        span.textContent = formatTimeDifference(lastLogin);
                    } else {
                        span.style.display = 'none'
                    }
                } else {
                    console.error('Last Login Failed! Server Offline.', error);
                }
            });
        socialUserDiv.appendChild(img);
        socialUserDiv.appendChild(p);
        socialUserDiv.appendChild(span);
        social.appendChild(socialUserDiv)
    })
}

function attachRecommendations(friends) {
    friends.push(localStorage.getItem("t50-username"))
    console.log('Attaching Recommendations')
    fetch(`${srv}/accounts?method=getAllEvoxUsers`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(allFriends => {

            const excludedValues = friends;

            // Filter out the excluded values
            const filteredFriends = allFriends.filter(friend => !excludedValues.includes(friend));

            // Shuffle the filtered array randomly
            const shuffled = filteredFriends.sort(() => 0.5 - Math.random());

            // Get the first 3 elements from the shuffled array
            const selectedValues = shuffled.slice(0, 3);

            console.log(selectedValues);
            attachUi(selectedValues, 'bypassRecommendations')


        }).catch(error => {
            console.error('attachRecommendations error:', error);
        })
}

//Time Management
function formatTimeDifference(timestamp) {
    // Parse the provided timestamp into a Date object
    const givenDate = new Date(timestamp);
    const now = new Date();

    // Calculate the difference in milliseconds
    const diffMs = now - givenDate;

    // Convert milliseconds into various units
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    // Determine the appropriate format
    if (diffSeconds < 60) {
        return 'less than 1 minute';
    } else if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else {
        return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
    }
}

//Secureline
const inputSecureline = document.getElementById('secureline-input');

// Add event listener for focus event
let staticDevHeight = false;
let stockHeight = null;
inputSecureline.addEventListener('focus', function () {
    $("#favorites-recommended").fadeOut("fast")
    $("#secureline-users").fadeOut("fast", function () {
        if (inputSecureline.value !== "") {
            runSearch(inputSecureline.value)
        }

        console.log('Input field is focused');

        if (staticDevHeight === false) {
            return;
            let currentHeight;
            currentHeight = parseInt(document.getElementById("secureline").style.height)
            if (currentHeight.toString().includes('NaN')) {
                currentHeight = '60%'

            }
            if (!currentHeight.toString().includes("%")) {
                stockHeight = currentHeight + "px"
                const minus15per = currentHeight - (currentHeight * 20 / 100)
                document.getElementById("secureline").style.height = minus15per + "px"
                staticDevHeight = minus15per + "px"
            } else {
                stockHeight = currentHeight
                const minus15per = (parseInt(stockHeight) - 15) + "%"
                document.getElementById("secureline").style.height = minus15per
                staticDevHeight = minus15per
            }

        } else {
            return;
            document.getElementById("secureline").style.height = staticDevHeight
        }
    })

});

window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
});
inputSecureline.addEventListener('blur', function () {

    console.log('Input field is blurred');
    //document.getElementById("secureline").style.height = stockHeight
    $("#secureline-search-users").fadeOut("fast", function () {
        $("#favorites-recommended").fadeIn("fast")
        $("#secureline-users").fadeIn("fast")
    })
});
let previousInput = null;
inputSecureline.addEventListener('input', function (event) {
    const inputValue = event.target.value.toLowerCase(); // Convert input value to lowercase
    if (inputValue === "") {
        //document.getElementById("secureline").style.height = stockHeight
        $("#secureline-search-users").fadeOut("fast", function () {
            $("#favorites-recommended").fadeIn("fast")
            $("#secureline-users").fadeIn("fast")
        })
        return;
    }
    $("#favorites-recommended").fadeOut("fast")
    $("#secureline-users").fadeOut("fast", function () {
        console.log('Input field new input', inputValue);
        previousInput = inputValue;
        runSearch(inputValue)
    })


});


function runSearch(inputValue) {
    if (staticDevHeight.toString().includes("%")) {
        document.getElementById("secureline").style.height = parseInt(staticDevHeight) + 20 + '%'
    } else {
        document.getElementById("secureline").style.height = parseInt(staticDevHeight) + 100 + 'px'
    }


    const friends_a = localStorage.getItem("friends");
    if (friends_a) {
        // Parse the JSON string into an array
        const friends = JSON.parse(friends_a); // ["a", "b", "c"]

        // Find all friends that contain the inputValue as a substring (case-insensitive)
        const matchingFriends = friends.filter(friend =>
            friend.toLowerCase().includes(inputValue)
        );


        if (matchingFriends.length > 0) {
            console.log('Matching friends:', matchingFriends);
            securelineHome(matchingFriends, 'secureline-search-users')
            $("#secureline-search-users").fadeIn("fast")

        } else {
            console.log('No matching friends found.');
            const friendSearch = document.getElementById("secureline-search-users")
            if (!friendSearch.innerHTML.includes("No Friends Found</p>")) {
                $("#secureline-search-users").fadeOut("fast", function () {
                    friendSearch.innerHTML = `<div class="loadingContainer">
                    <p>No Friends Found</p>
                </div>`
                    $("#secureline-search-users").fadeIn("fast")
                })
            }



        }
    } else {
        console.error("Friends are not locally saved!");
    }
}
// Helper function to format date and time
let lastScrollTop = 0; // Variable to keep track of the last scroll position
let isListening = false;

function handleScroll(event) {
    const securelinePopup = document.querySelector('#secureline');
    const elem = event.target;
    const currentScrollTop = elem.scrollTop;

    if (currentScrollTop > 100) {
        //console.log('Scrolled down by more than', 100, 'pixels');

    } else if (currentScrollTop <= 0) {
        //console.log('Back at the top');
        //securelinePopup.style.height = "60%"
    }

    if (currentScrollTop > lastScrollTop) {
        //console.log('Scrolling down');
        securelinePopup.style.height = "80%"
        const viewportHeight = window.innerHeight;

        // Set the height to be at most 80% of the viewport height
        const maxHeight = viewportHeight * 0.8;

        // Calculate the content height
        const contentHeight = securelinePopup.scrollHeight;

        // Adjust the height
        securelinePopup.style.height = Math.min(maxHeight, contentHeight) + 'px';
    } else if (currentScrollTop < lastScrollTop) {
        //console.log('Scrolling up');
    }

    lastScrollTop = currentScrollTop; // Update the last scroll position
}

function addScrollListener(div) {
    div.addEventListener('scroll', handleScroll);
    isListening = true;
}

function removeScrollListener(div) {
    div.removeEventListener('scroll', handleScroll);
    isListening = false;
}

function loadSecurelineHome() {
    fetch(`${srv}/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setNetworkStatus('on')
            localStorage.setItem("friends", JSON.stringify(data)); // Ensure data is stored as a JSON string
            securelineHome(data, 'secureline-users')
        })
        .catch(error => {
            setNetworkStatus('off')
            const data = localStorage.getItem("friends")
            if (data) {
                console.warn("Server connection failed. Trying local")
                securelineHome(JSON.parse(data), 'secureline-users')
            } else {
                console.error('loadSecurelineHome Failed!', error);
            }
        });
}

function reloadFavs() {
    console.log("reloadFavs Triggered")
    $("#favorites-recommended").fadeOut("fast")
    const friends = localStorage.getItem("friends")
    const targetDiv = document.getElementById('favorites-recommended');
    const favorites = localStorage.getItem("favorites")
    targetDiv.innerHTML = ''
    if (favorites) {
        const favorites_j = JSON.parse(favorites)
        if (friends) {
            const jsonFriends = JSON.parse(friends)
            favorites_j.forEach((friend) => {
                const favorites = localStorage.getItem("favorites")
                if (favorites) {
                    const previous = JSON.parse(favorites)
                    if (previous.includes(friend)) {
                        const blockDiv = document.createElement('div');
                        blockDiv.className = 'block';
                        blockDiv.onclick = function () {
                            const json = {
                                username: friend,
                                favorite: true
                            }
                            openChat(json)
                        };

                        // Create the row div
                        const rowDiv = document.createElement('div');
                        rowDiv.className = 'row';

                        // Create the icon div
                        const iconDiv = document.createElement('div');
                        iconDiv.className = 'icon';
                        iconDiv.innerHTML = `<img class="slUserPFP fav-rec" src="searching_users.gif">`;
                        loadPFPget(friend)
                            .then(profileImage => {
                                iconDiv.innerHTML = `<img class="slUserPFP fav-rec" src="${profileImage}">`;
                            }).catch(error => {
                                setNetworkStatus('off')
                                console.error(error);
                            });


                        // Create the column div
                        const columnDiv = document.createElement('div');
                        columnDiv.className = 'column';

                        // Create the paragraph and span elements
                        const paragraph = document.createElement('p');
                        paragraph.textContent = friend;

                        const span = document.createElement('span');
                        if (localStorage.getItem(`${friend}-lastMsg`)) {
                            const lastMsg = localStorage.getItem(`${friend}-lastMsg`)
                            let setItAs = null
                            if (lastMsg.includes("http")) {
                                setItAs = 'Sent a URL'
                                if (lastMsg.includes("You:")) {
                                    setItAs = 'You: Sent a URL'
                                }
                            } else {
                                if (lastMsg.length > 15) {
                                    setItAs = lastMsg.substring(0, 15) + '..'
                                } else {
                                    setItAs = lastMsg
                                }
                            }
                            span.innerHTML = truncateString(setItAs) + `&nbsp;&nbsp;<svg version="1.1" width="10px"
                            height="10px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                            y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                            <path fill="#fff"
                                d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                                <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                                    to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                            </path>
                        </svg>`

                        }

                        fetch(`${srv}/secureline?method=lastMSG&username=${localStorage.getItem("t50-username")}&recipient_username=${friend}&password=${atob(localStorage.getItem("t50pswd"))}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then(lastMsg => {

                                if (lastMsg.includes("http")) {
                                    span.textContent = 'Sent a URL'
                                    if (lastMsg.includes("You:")) {
                                        span.textContent = 'You: Sent a URL'
                                    }
                                } else {
                                    if (lastMsg.length > 15) {
                                        span.textContent = lastMsg.substring(0, 15) + '..'
                                    } else {
                                        span.textContent = lastMsg
                                    }
                                }
                            }).catch(error => {
                                const lastMsg = localStorage.getItem(`${friend}-lastMsg`)
                                if (lastMsg.includes("http")) {
                                    span.textContent = 'Sent a URL'
                                    if (lastMsg.includes("You:")) {
                                        span.textContent = 'You: Sent a URL'
                                    }
                                } else {
                                    if (lastMsg.length > 15) {
                                        span.textContent = lastMsg.substring(0, 15) + '..'
                                    } else {
                                        span.textContent = lastMsg
                                    }
                                }
                            })




                        // Append paragraph and span to the column div
                        columnDiv.appendChild(paragraph);
                        columnDiv.appendChild(span);

                        // Append icon and column to the row div
                        rowDiv.appendChild(iconDiv);
                        rowDiv.appendChild(columnDiv);

                        // Append row to the block div
                        blockDiv.appendChild(rowDiv);

                        // Append block to the target div
                        targetDiv.appendChild(blockDiv);
                        $("#favorites-recommended").fadeIn("fast")
                    } else {
                        return;
                    }
                } else {
                    return;
                }
            })

        }
    }



}

function securelineHome(data, appending) {
    if (data.length === 0) {
        console.log("No Friends");
        return;
    }

    const container = document.getElementById(appending);
    container.innerHTML = '';
    const targetDiv = document.getElementById('favorites-recommended');
    if (appending === 'secureline-users') {
        targetDiv.innerHTML = ''
    }

    const friendPromises = data.map(friend => {
        return new Promise((resolve, reject) => {
            const userDiv = document.createElement('a');
            userDiv.className = 'user';

            userDiv.href = `#secureline-${friend}`;
            userDiv.id = `user-${friend}`;
            userDiv.onclick = function () {
                const json = { username: friend, favorite: JSON.parse(localStorage.getItem("favorites") || "[]").includes(friend) };
                openChat(json)
            };

            const iconDiv = document.createElement('div');
            iconDiv.className = 'icon';
            const img = document.createElement('img');
            img.className = 'slUserPFP social';
            img.src = "searching_users.gif";
            loadPFPget(friend)
                .then(profileImage => {
                    img.src = profileImage;
                    resolve(); // Resolve the promise when the image is loaded
                }).catch(error => {
                    setNetworkStatus('off')
                    console.error(error);
                    resolve(); // Resolve the promise even if there is an error
                });
            iconDiv.appendChild(img);

            const columnDiv = document.createElement('div');
            columnDiv.className = 'column';
            const usernameP = document.createElement('p');
            usernameP.textContent = friend;
            const messageSpan = document.createElement('span');
            messageSpan.textContent = 'Loading Messages..';
            const favorites = localStorage.getItem("favorites")
            if (localStorage.getItem(`${friend}-lastMsg`)) {
                messageSpan.innerHTML = truncateString(localStorage.getItem(`${friend}-lastMsg`), 36) + `&nbsp;&nbsp;<svg version="1.1" width="10px"
                height="10px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#fff"
                    d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                    <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                        to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                </path>
            </svg>`
                if (localStorage.getItem(`${friend}-lastMsg`) === "Chat not created") {
                    userDiv.style.display = 'none'
                }
            }

            fetch(`${srv}/secureline?method=lastMSG&username=${localStorage.getItem("t50-username")}&recipient_username=${friend}&password=${atob(localStorage.getItem("t50pswd"))}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(lastMsg => {
                    setNetworkStatus('on')
                    localStorage.setItem(`${friend}-lastMsg`, lastMsg)
                    userDiv.style.display = null

                    if (lastMsg === 'Chat not created' && appending === "secureline-users") {
                        console.log(`Stopping Spawn For User ${friend}.`)
                        userDiv.remove();
                        return;
                    }

                    if (lastMsg.includes("http")) {
                        messageSpan.textContent = 'Sent a URL'
                        if (lastMsg.includes("You:")) {
                            messageSpan.textContent = 'You: Sent a URL'
                        }
                    } else {
                        messageSpan.textContent = truncateString(lastMsg, 36)
                    }




                    if (appending !== 'secureline-users') {
                        //continue
                        console.log(`Continue appending ${friend}`)
                    } else if (favorites && appending === 'secureline-users') {

                        const previous = JSON.parse(favorites)
                        if (previous.includes(friend)) {
                            console.log(`appending: ${appending} -> user ${friend} favorite -> true`)


                            if (appending === 'secureline-users') {
                                //$("#favorites-recommended").fadeIn("fast")
                            }
                            return;

                        } else {
                            return;
                        }
                    } else {
                        return;
                    }
                    resolve(); // Resolve the promise when the message is loaded
                }).catch(error => {
                    setNetworkStatus('off')
                    const lastMsg = localStorage.getItem(`${friend}-lastMsg`)
                    if (data) {
                        console.warn("Server connection failed. Trying local")
                        //messageSpan.textContent = lastMsg;
                        if (favorites) {
                            const previous = JSON.parse(favorites)
                            if (previous.includes(friend)) {
                                const blockDiv = document.createElement('div');
                                blockDiv.className = 'block';
                                blockDiv.onclick = function () {
                                    const json = {
                                        username: friend,
                                        favorite: true
                                    }
                                    openChat(json)
                                };

                                // Create the row div
                                const rowDiv = document.createElement('div');
                                rowDiv.className = 'row';

                                // Create the icon div
                                const iconDiv = document.createElement('div');
                                iconDiv.className = 'icon';
                                iconDiv.innerHTML = `<img class="slUserPFP fav-rec" src="searching_users.gif">`;
                                loadPFPget(friend)
                                    .then(profileImage => {
                                        iconDiv.innerHTML = `<img class="slUserPFP fav-rec" src="${profileImage}">`;
                                    }).catch(error => {
                                        setNetworkStatus('off')
                                        console.error(error);
                                    });


                                // Create the column div
                                const columnDiv = document.createElement('div');
                                columnDiv.className = 'column';

                                // Create the paragraph and span elements
                                const paragraph = document.createElement('p');
                                paragraph.textContent = friend;

                                const span = document.createElement('span');

                                if (lastMsg.includes("http")) {
                                    span.textContent = 'Sent a URL'
                                    if (lastMsg.includes("You:")) {
                                        span.textContent = 'You: Sent a URL'
                                    }
                                } else {
                                    if (lastMsg.length > 15) {
                                        span.textContent = lastMsg.substring(0, 15) + '..'
                                    } else {
                                        span.textContent = lastMsg
                                    }
                                }


                                // Append paragraph and span to the column div
                                columnDiv.appendChild(paragraph);
                                columnDiv.appendChild(span);

                                // Append icon and column to the row div
                                rowDiv.appendChild(iconDiv);
                                rowDiv.appendChild(columnDiv);

                                // Append row to the block div
                                blockDiv.appendChild(rowDiv);

                                // Append block to the target div
                                targetDiv.appendChild(blockDiv);
                            } else {
                                return;
                            }
                        } else {
                            return;
                        }
                        resolve(); // Resolve the promise when the message is loaded
                    } else {
                        console.error('Secureline Failed!', error);
                    }
                    console.error(error);
                    resolve(); // Resolve the promise even if there is an error
                });

            console.warn(`Reached Default Append ${friend}, Container: ${appending}`)
            columnDiv.appendChild(usernameP);
            columnDiv.appendChild(messageSpan);

            const favoriteDiv = document.createElement('div');
            favoriteDiv.className = 'add-favorite';

            if (favorites) {
                const previous = JSON.parse(favorites)
                if (previous.includes(friend) && appending !== 'secureline-users') {
                    favoriteDiv.setAttribute('data-status', 'fav');
                    favoriteDiv.setAttribute('data-name', friend);
                    favoriteDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#7d7e87"/>
                    </svg>`
                } else {
                    favoriteDiv.setAttribute('data-status', 'default');
                    favoriteDiv.setAttribute('data-name', friend);
                    favoriteDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#7d7e87" stroke-width="1.5"/>
                </svg>`
                }
            } else {
                favoriteDiv.setAttribute('data-status', 'default');
                favoriteDiv.setAttribute('data-name', friend);
                favoriteDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" stroke="#7d7e87" stroke-width="1.5"/>
                </svg>`
            }

            favoriteDiv.onclick = function (event) {
                add_favorite(event, this);
            };

            userDiv.appendChild(iconDiv);
            userDiv.appendChild(columnDiv);
            userDiv.appendChild(favoriteDiv);
            container.appendChild(userDiv);
            if (favorites) {
                const previous = JSON.parse(favorites)
                if (previous.includes(friend) && appending === 'secureline-users') {
                    document.getElementById(`user-${friend}`).remove()
                }
            }
        });
    });

    Promise.all(friendPromises)
        .then(() => {
            // Code to run after all friends are fully processed
            //const container = document.getElementById('favorites-recommended');
            //const blocks = Array.from(container.getElementsByClassName('block'));
            // Reverse the order of these elements
            //const reversedBlocks = blocks.reverse();
            //container.innerHTML = '';
            //reversedBlocks.forEach(block => container.appendChild(block));
            const targetDiv = document.getElementById('favorites-recommended');
            if (appending === 'secureline-users') {
                reloadFavs()
            }

            console.log("All friends have been loaded and displayed.");
            const securelinePopup = document.querySelector('#secureline');

            // Get the viewport height
            const viewportHeight = window.innerHeight;

            // Get any offsets or margins from the viewport height if applicable
            // Adjust these values as needed for your specific layout
            const topOffset = 20; // example value, adjust based on actual layout
            const bottomOffset = 20; // example value, adjust based on actual layout

            // Calculate the available height for the #secureline element
            const availableHeight = viewportHeight - topOffset - bottomOffset;

            // Calculate the maximum height for the element (80% of the viewport height)
            const maxHeight = viewportHeight * 0.8;

            // Calculate the content height
            const contentHeight = securelinePopup.scrollHeight;

            // Determine the new height to set
            const newHeight = Math.min(availableHeight, maxHeight, contentHeight);

            // Set the height if the new height is different from the current height
            const currentHeight = parseFloat(window.getComputedStyle(securelinePopup).height);

            if (newHeight !== currentHeight) {
                securelinePopup.style.height = newHeight + 'px';
            }
            $(`#${appending}`).fadeIn("fast")
            if (appending === 'secureline-users') {
                $("#favorites-recommended").fadeIn("fast")
            }

        })
        .catch(error => {
            setNetworkStatus('off')
            console.error(error);
        });
}

//Evox Default

function formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pad = (num) => num.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = months[date.getMonth()];
    const hours = pad(date.getHours() % 12 || 12);
    const minutes = pad(date.getMinutes());
    const ampm = date.getHours() < 12 ? "AM" : "PM";
    return `${day} ${month} &#x2022; ${hours}:${minutes} ${ampm}`;
}

function processMessage(data, element) {

    const creationDate = new Date(data);
    const todayMonth = new Date().getMonth();
    const creationMonth = creationDate.getMonth();
    const creationDay = creationDate.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (data === "Chat Doesn't Exist") {
        document.getElementById("messages-container").innerHTML = `
        <p style="opacity: 1" class='centered-text'>Chat Hasn't Been Created.
        <button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`;
        document.getElementById("bottomActionsSecureline").classList.add("hidden")
        return;
    }

    console.log("Creation:", data);
    const creationText = `${months[creationMonth]} ${creationDay} - ${months[todayMonth]}`;

    console.log("Getting Existing Chat");
    fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}&password=${atob(localStorage.getItem("t50pswd"))}`)
        .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! Status: ${response.status}`))
        .then(text => {
            setNetworkStatus('on')
            try {
                const data = JSON.parse(text);
                if (!data || !data.messages) throw new Error("Invalid data format");

                const container = document.getElementById("messages-container");
                container.innerHTML = "";

                data.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).forEach(message => {
                    const messageContainer = document.createElement("div");
                    messageContainer.className = "chat-message";

                    const messagePack = document.createElement("div");
                    messagePack.className = message.sender === localStorage.getItem("t50-username") ? "messagePackMe" : "messagePack";

                    const avatar = document.createElement("img");
                    avatar.className = "chat-avatar";
                    //avatar.style.display = 'none'
                    avatar.src = message.sender === localStorage.getItem("t50-username") ? "evox-logo-apple.png" : pfp.src;
                    avatar.alt = message.sender;

                    const content = document.createElement("div");
                    content.className = "message-content";

                    const timestamp = document.createElement("div");
                    timestamp.className = message.sender === localStorage.getItem("t50-username") ? "message-time-me" : "message-time";
                    timestamp.innerHTML = formatDate(new Date(message.timestamp));

                    if (message.content.includes("http") || message.content.includes("https")) {
                        const attachment = document.createElement("div");
                        attachment.className = "attachment";

                        const attachRow = document.createElement("div");
                        attachRow.className = "theRow";

                        const attachIcon = document.createElement("img");
                        attachIcon.src = "./novus/attach.svg";

                        const url = new URL(message.content);
                        const logoUrl = `https://logo.clearbit.com/${url.hostname}`;
                        attachIcon.src = logoUrl;

                        const infoWrap = document.createElement("div");
                        infoWrap.className = "infoWrap";

                        const fileName = message.content.split("/").pop().replace(/\.[^.]+$/, "");
                        const fileType = /\.(pdf|png|jpg|webp|gif|mp4)$/i.exec(message.content)?.[1] || "URL";
                        const fileIcon = fileType === "URL" ? "./novus/attach.svg" : `./novus/${fileType}.svg`;
                        if (fileType === "png" || fileType === "jpg") {
                            attachIcon.src = message.content;
                        } else {
                            attachIcon.src = fileIcon;
                        }


                        const fileTypeInfo = document.createElement("span");
                        fileTypeInfo.innerHTML = `${fileType.toUpperCase()} &#x2022; unkMB`;

                        infoWrap.innerHTML = `<p>${url.hostname}</p>`;
                        infoWrap.appendChild(fileTypeInfo);

                        attachRow.appendChild(attachIcon);
                        attachRow.appendChild(infoWrap);

                        const openButton = document.createElement("img");
                        openButton.src = "./novus/open.svg";
                        openButton.className = "imgBox";
                        openButton.onclick = () => createAndClickHiddenLink(message.content);

                        const downloadButton = document.createElement("img");
                        downloadButton.src = "./novus/download.svg";
                        downloadButton.className = "imgBoxLast";
                        downloadButton.onclick = () => downloadFileDirectly(message.content, fileName);

                        attachRow.appendChild(openButton);
                        attachRow.appendChild(downloadButton);

                        attachment.appendChild(attachRow);
                        content.appendChild(attachment);
                    } else {
                        const name = document.createElement("p");
                        name.className = "nameTopMsg";
                        name.style.display = 'none'
                        name.textContent = message.sender;

                        const msgContent = document.createElement("p");
                        msgContent.className = "msgCont";
                        msgContent.textContent = message.content;

                        content.appendChild(name);
                        content.appendChild(msgContent);
                    }

                    messagePack.appendChild(avatar);
                    messagePack.appendChild(content);
                    messageContainer.appendChild(messagePack);
                    messageContainer.appendChild(timestamp);

                    container.appendChild(messageContainer);
                    const chatdiv = document.getElementById("messages-container");
                    chatdiv.scrollTop = chatdiv.scrollHeight;
                    document.getElementById("bottomActionsSecureline").classList.remove("hidden")
                });
            } catch (error) {
                console.error("Error parsing messages:", error);
            }
        })
        .catch(error => console.error("Fetch error:", error));
}

function isValidSline(json) {
    // Check if the json is an object
    if (typeof json !== 'object' || json === null) {
        return false;
    }

    // Check if the "messages" property exists and is an array
    if (!Array.isArray(json.messages)) {
        return false;
    }

    // Everything is valid
    return true;
}

document.getElementById("message_input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        send_message()
    }
});

let activeChatInterval = null;
function actionReload(whoto, reloadPage) {
    const container = document.getElementById("messages-container");
    //container.innerHTML = `<p class='centered-text'>Loading ${whoto}..</p>`;
    if (!reloadPage) {
        container.innerHTML = `<p id='tempTxt' class='centered-text'><img src="EvoxEPSILON.png"></p>`;
        document.getElementById("tempTxt").style.opacity = '1'
    }

    console.log(`Reloading user's chat with ${whoto}`);
    sessionStorage.setItem("current_sline", whoto);
    const element = {
        "id": whoto
    };
    pfp = document.getElementById(`${whoto}-pfp-secureline`);

    fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${whoto}&password=${atob(localStorage.getItem("t50pswd"))}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(messages => {
            //console.log(whoto, 'messages:\n', messages)

            setNetworkStatus('on')
            try {
                const integrityCheck = JSON.parse(messages);
                if (integrityCheck.messages.length === 0) {
                    document.getElementById("messages-container").innerHTML = `<p id="tempTextNoMsg" class='centered-text'>No messages!</p>`;
                    document.getElementById("tempTextNoMsg").style.opacity = '1'
                    document.getElementById("bottomActionsSecureline").classList.remove("hidden")

                    return;
                } else {
                    console.log("Messages length:", integrityCheck.messages.length)
                }
            } catch (error) {
                console.error("Possible Account Verification Error:", messages, error);
                if (messages === "Chat not created") {
                    document.getElementById("messages-container").innerHTML = `
                    <p style="opacity: 1" class='centered-text'>Chat Hasn't Been Created.
                    <button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`;
                    document.getElementById("bottomActionsSecureline").classList.add("hidden")
                    return;
                }
                return;
            }
            if (sessionStorage.getItem("lastChatMessages") === JSON.stringify(messages)) {
                console.log("No new messages");
                document.getElementById("bottomActionsSecureline").classList.remove("hidden")
                return;
            }
            sessionStorage.setItem("lastChatMessages", JSON.stringify(messages));
            if (messages === "Chat not created") {
                document.getElementById("messages-container").innerHTML = `<p style="opacity: 1" class='centered-text'>Chat Hasn't Been Created.<button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`;
                console.log("Chat Doesn't Exist");
                document.getElementById("bottomActionsSecureline").classList.add("hidden")
                return;
            }
            const jsonData = JSON.parse(messages);

            // Check if jsonData and jsonData.messages are defined before sorting
            if (jsonData && jsonData.messages) {
                const messagesContainer = document.getElementById('messages-container');
                messagesContainer.innerHTML = "";

                // Sort messages by timestamp
                const sortedMessages = jsonData.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                // Create an array of promises to handle URL accessibility checks
                const messagePromises = sortedMessages.map(message => {
                    return new Promise((resolve, reject) => {
                        const messageElement = document.createElement('div');
                        if (message.content.includes("http") || message.content.includes("https")) {
                            const url = new URL(message.content);
                            const logoUrl = `https://logo.clearbit.com/${url.hostname}`;

                            let infoFile = 'URL';
                            let fileSrc = false;
                            const filenameWithoutExtension = message.content.split('/').pop().replace(/\.[^.]+$/, '');
                            if (message.content.includes('.pdf')) {
                                fileSrc = './novus/pdf.svg';
                                infoFile = `PDF &#x2022; unknMB`; //${getFileSize(url)}
                            } else if (message.content.includes('.png')) {
                                fileSrc = message.content;
                                infoFile = `PNG &#x2022; unknMB`;
                            } else if (message.content.includes('.jpg')) {
                                fileSrc = message.content;
                                infoFile = `JPG &#x2022; unknMB`;
                            } else if (message.content.includes('.webp')) {
                                fileSrc = message.content;
                                infoFile = `WEBP &#x2022; unknMB`;
                            } else if (message.content.includes('.gif')) {
                                fileSrc = message.content;
                                infoFile = `GIF &#x2022; unknMB`;
                            } else if (message.content.includes('.mp4')) {
                                fileSrc = './novus/video.svg';
                                infoFile = `MP4 &#x2022; unknMB`;

                            } else if (message.content.includes('chatgpt')) {
                                fileSrc = `https://logo.clearbit.com/openai.com`;
                            } else {
                                infoFile = 'URL';
                            }

                            if (fileSrc !== false) {
                                messageElement.innerHTML = `<img class="urlImg" src="${fileSrc}">
                                <div class="embedCol">
                                    <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                                    <vo>${infoFile}</vo>
                                </div>
                                <img class="imgBox" src="./novus/open.svg" onclick="createAndClickHiddenLink('${message.content}')" style="margin-right: 0px;">`;
                            } else {
                                messageElement.innerHTML = `<img class="urlImg" style="width: 25px;height:25px" src="./novus/attach.svg">
            <div class="embedCol">
                <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                <vo>${infoFile}</vo>
            </div>
            <img class="imgBox" src="./novus/open.svg" onclick="createAndClickHiddenLink('${message.content}')" style="margin-right: 0px;">`;
                            }

                            // Apply appropriate class based on the sender
                            if (message.sender === localStorage.getItem("t50-username")) {
                                messageElement.classList.add('message-me');
                            } else {
                                messageElement.classList.add('message');
                            }
                            messagesContainer.appendChild(messageElement);

                            checkUrlAccessibility(logoUrl)
                                .then(not404 => {
                                    if (not404 === true) {
                                        messageElement.innerHTML = `<img class="urlImg" src="${logoUrl}">
                                        <div class="embedCol">
                                            <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                                            <vo>${infoFile}</vo>
                                        </div>
                                        <img class="imgBox" src="./novus/open.svg" onclick="createAndClickHiddenLink('${message.content}')" style="margin-right: 0px;">`;
                                    } else {
                                        if (fileSrc !== false) {
                                            messageElement.innerHTML = `<img class="urlImg" src="${fileSrc}">
                                            <div class="embedCol">
                                                <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                                                <vo>${infoFile}</vo>
                                            </div>
                                            <img class="imgBox" src="./novus/open.svg" onclick="createAndClickHiddenLink('${message.content}')" style="margin-right: 0px;">`;
                                        } else {
                                            messageElement.innerHTML = `<img class="urlImg" style="width: 25px;height:25px" src="./novus/attach.svg">
                        <div class="embedCol">
                            <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                            <vo>${infoFile}</vo>
                        </div>
                        <img class="imgBox" src="./novus/open.svg" onclick="createAndClickHiddenLink('${message.content}')" style="margin-right: 0px;">`;
                                        }
                                    }

                                    resolve();
                                }).catch(error => {
                                    setNetworkStatus('off')
                                    console.error(error);
                                    resolve(); // Resolve even if there's an error to ensure all messages are processed
                                });
                        } else {
                            // Create a new message element
                            messageElement.textContent = message.content;

                            // Apply appropriate class based on the sender
                            if (message.sender === localStorage.getItem("t50-username")) {
                                messageElement.classList.add('message-me');
                            } else {
                                messageElement.classList.add('message');
                            }

                            // Append the message element to the messages container
                            messagesContainer.appendChild(messageElement);
                            document.getElementById("bottomActionsSecureline").classList.remove("hidden")
                            resolve();
                        }
                    });
                });

                // Wait for all promises to complete
                Promise.all(messagePromises)
                    .then(() => {
                        // Scroll to the bottom of the messages container
                        var contentDiv = document.getElementById('messages-container');
                        contentDiv.scrollTop = contentDiv.scrollHeight;
                        console.log("All messages have been processed and displayed.");

                    })
                    .catch(error => {
                        setNetworkStatus('off')
                        console.error("Error processing messages:", error);
                    });
            } else {
                console.error("JSON data or messages array is undefined.");
            }
        })
        .catch(error => {
            setNetworkStatus('off')
            console.error("Error fetching chat messages:", error);
        });
}

function create_chat() {
    document.getElementById("messages-container").innerHTML = `<p style="opacity: 1" class='centered-text'>Creating Chat
    <svg style="margin-top: 20px" version="1.1" width="35px"
                height="35px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <path fill="#fff"
                    d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                    <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                        to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                </path>
            </svg>
  </p>`
    fetch(`https://data.evoxs.xyz/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${sessionStorage.getItem("current_sline")}&createnew=true&password=${atob(localStorage.getItem("t50pswd"))}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data === "Created") {
                console.log("Chat Created")
                console.log("Reloading")
                actionReload(sessionStorage.getItem("current_sline"))
            } else {
                warn(`Couldn't create chat: ${data}`)
            }
        })
}

function createAndClickHiddenLink(url) {
    // Create a new <a> element
    var link = document.createElement('a');

    // Set the href attribute to the provided URL
    link.href = url;

    // Set target attribute to '_blank' to open in a new tab
    link.target = '_blank';

    // Hide the link using CSS (optional)
    link.style.display = 'none';

    // Append the link to the document body
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the DOM (optional)
    document.body.removeChild(link);
}

async function downloadFileDirectly(url, filename) {
    try {
        // Fetch the file data
        const response = await fetch(url);
        const blob = await response.blob();

        // Create a URL for the file blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up: remove the link and revoke the URL object
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

    } catch (error) {
        console.error('Error downloading file:', error);
        // Handle error as needed
    }
}

async function checkUrlAccessibility(url) {
    try {
        // Make a request to the URL
        const response = await fetch(url, { method: 'HEAD' });

        // Check if the response status is in the range of successful responses
        if (response.ok) {
            //console.log('URL is accessible.');
            return true;
        } else {
            //console.log('URL is not accessible. Status:', response.status);
            return false;
        }
    } catch (error) {
        // Handle any errors that occurred during the fetch
        //console.error('Error checking URL:', error);
        return false;
    }
}

async function getFileSize(url) {
    try {
        const response = await fetch(url);

        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the Content-Length header which provides the file size in bytes
        const contentLength = response.headers.get('Content-Length');

        if (!contentLength) {
            throw new Error('Content-Length header is missing');
        }

        // Convert contentLength to a number
        const fileSizeInBytes = parseInt(contentLength, 10);

        // Convert bytes to megabytes and gigabytes
        const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
        const fileSizeInGB = fileSizeInBytes / (1024 * 1024 * 1024);

        console.log(`File Size: ${fileSizeInBytes} bytes`);
        console.log(`File Size: ${fileSizeInMB.toFixed(2)} MB`);
        console.log(`File Size: ${fileSizeInGB.toFixed(6)} GB`);

        return fileSizeInMB.toFixed(2);
    } catch (error) {
        console.error('Error:', error);
    }
}

function rotateElement() {
    // Get the element by its ID
    const element = document.getElementById('sendSvg');

    // Check if the element exists
    if (element) {
        // Get the current rotation angle
        const currentRotationMatch = element.style.transform.match(/rotate\((\d+)deg\)/);

        // Initialize current rotation to 0 if not set
        let currentRotation = 0;
        if (currentRotationMatch) {
            currentRotation = parseInt(currentRotationMatch[1], 10);
        }

        // Increment the current rotation by 45 degrees
        let newRotation = currentRotation + 410;

        // Apply the new rotation to the element
        element.style.transform = `rotate(${newRotation}deg)`;
    }
    setTimeout(function () {
        if (element) {
            // Get the current rotation angle
            const currentRotationMatch = element.style.transform.match(/rotate\((\d+)deg\)/);

            // Initialize current rotation to 0 if not set
            let currentRotation = 0;
            if (currentRotationMatch) {
                currentRotation = parseInt(currentRotationMatch[1], 10);
            }

            // Increment the current rotation by 45 degrees
            let newRotation = currentRotation - 410;

            // Apply the new rotation to the element
            element.style.transform = `rotate(${newRotation}deg)`;
        }
    }, 900)
}

function send_message() {
    rotateElement()
    sender = localStorage.getItem("t50-username")
    recipient = sessionStorage.getItem("current_sline")
    message = document.getElementById("message_input")
    console.log("Sending message to", recipient)
    if (message.value != "") {
        //if (sessionStorage.getItem("sending") === "true") {
        //    shake_me("message_input")
        //    return;
        //}
        //message.disabled = true
        //sessionStorage.setItem("sending", "true")
        fetch(`https://data.evoxs.xyz/secureline?method=SendMessage&username=${localStorage.getItem("t50-username")}&recipient_username=${recipient}&message=${message.value}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                message.value = ""
                if (data === `Message Sent To ${recipient}`) {
                    console.log("Message Sent")
                    actionReload(recipient, 'reloadPage')
                } else {
                    console.error("Error Sending Message -SLINE ERROR")
                }
            }).catch(error => {
                console.error(error)
            })
    }

}

function truncateString(str, length) {
    // Check if the string length is greater than 51 characters
    if (str.length > length) {
        // Truncate the string to 51 characters and add ".."
        return str.slice(0, length) + "..";
    }
    // If the string is 51 characters or less, return it as is
    return str;
}

//Social
function loadFriendsSocial() {

    fetch(`${srv}/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            setNetworkStatus('on')
            localStorage.setItem("friends", JSON.stringify(data)); // Ensure data is stored as a JSON string
            loadSocial(data)
        })
        .catch(error => {
            setNetworkStatus('off')
            const data = localStorage.getItem("friends")
            if (data) {
                console.warn("Server connection failed. Trying local")
                loadSocial(JSON.parse(data))
            } else {
                console.error('loadFriendsSocial Failed!', error);
            }
        });
    // Create the main user div

}

function loadSocial(data) {
    const socialUsersContainer = document.getElementById('social-users');
    socialUsersContainer.innerHTML = ''
    if (data.length === 0) {
        console.log("No Friends");
        return;
    }

    data.forEach(friend => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user';
        userDiv.onclick = function () {
            showFriend(this)
        }
        const iconDiv = document.createElement('div');
        iconDiv.className = 'icon';

        const img = document.createElement('img');
        img.className = 'slUserPFP social';
        img.src = 'searching_users.gif';
        loadPFPget(friend)
            .then(profileImage => {
                img.src = profileImage;;
            }).catch(error => {
                setNetworkStatus('off')
                console.error(error);
            });
        iconDiv.appendChild(img);

        // Create the column div with username and message
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column';

        const usernameP = document.createElement('p');
        usernameP.textContent = friend;
        columnDiv.appendChild(usernameP);


        // Create the show-user-info div with SVG
        const showUserInfoDiv = document.createElement('div');
        showUserInfoDiv.className = 'show-user-info';
        showUserInfoDiv.id = `showUserInfoDiv-${friend}`
        showUserInfoDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
                <g clip-path="url(#clip0_429_11257)">
                <path d="M14 7L9 12" stroke="#7d7e87" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12L14 17" stroke="#7d7e87" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath>
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>`

        // Append all created elements to the userDiv
        userDiv.appendChild(iconDiv);
        userDiv.appendChild(columnDiv);
        userDiv.appendChild(showUserInfoDiv);

        // Append the userDiv to the target container
        socialUsersContainer.appendChild(userDiv);
    })
}
function isElementOutsideViewport(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.warn("Element with ID '" + elementId + "' not found.");
        return false;
    }

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if the element is outside the viewport
    return rect.bottom < 0 || rect.top > viewportHeight || rect.right < 0 || rect.left > viewportWidth;
}

const popIt = document.getElementById('settings');
const grab = document.getElementById('settings-grab');

let startY, startTop;
const threshold = 10; // Threshold in pixels from the top where dragging upwards is allowed

let settingsGrabCloseTrigger = 694
let hideThreshold = 100
grab.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    startY = touch.clientY;
    startTop = parseInt(window.getComputedStyle(popIt).top, 10);
    document.addEventListener('touchmove', moveDiv);
    document.addEventListener('touchend', stopMoveDiv);
});

function moveDiv(e) {
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;

    // Calculate the new top position
    let newTop = startTop + deltaY;

    console.log(newTop)
    // Restrict movement downwards only
    if (newTop < settingsGrabCloseTrigger) {
        return;
    }
    if (newTop > hideThreshold) {
        hideSettings()
        setTimeout(function () {
            popIt.style.top = '';
        }, 600)
    }
    if (newTop > startTop) {
        popIt.style.top = newTop + 'px';
    } else if (newTop < startTop && startTop >= threshold) {
        // Allow movement upwards only if above threshold
        popIt.style.top = newTop + 'px';
    }
}

function stopMoveDiv() {

    document.removeEventListener('touchmove', moveDiv);
    document.removeEventListener('touchend', stopMoveDiv);

    const elementId = "settings";
    const isOutsideViewport = isElementOutsideViewport(elementId);

    if (isOutsideViewport) {
        console.log("Element with ID '" + elementId + "' is outside the viewport.");

        hideSettings()
        setTimeout(function () {
            popIt.style.top = '';
        }, 500)

    } else {
        console.log("Element with ID '" + elementId + "' is inside the viewport.");
    }
}

function preventDefault(e) {
    e.preventDefault();
}


let scrolling = true
// Disable scroll
function disableScroll() {
    console.log('D1: Old Scrolling:', scrolling)
    window.addEventListener('scroll', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    scrolling = false
    console.log('D1: New Scrolling:', scrolling)
}

// Enable scroll
function enableScroll() {
    console.log('E1: Old Scrolling:', scrolling)
    window.removeEventListener('scroll', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
    scrolling = true
    console.log('E2: New Scrolling:', scrolling)
}

function getOrdinal(number) {
    const suffix = ['th', 'st', 'nd', 'rd'];
    const mod = number % 100;
    return number + (suffix[(mod - 20) % 10] || suffix[mod] || suffix[0]);
}

function getDaysUntilNextBirthday(birthdayString) {
    // Helper function to get the next birthday
    function getNextBirthday(birthdayString) {
        const [day, month, year] = birthdayString.split('/').map(Number);
        const now = new Date();
        const currentYear = now.getFullYear();
        const birthdayThisYear = new Date(currentYear, month - 1, day);

        if (birthdayThisYear < now) {
            // If the birthday has already passed this year, set it to the next year
            birthdayThisYear.setFullYear(currentYear + 1);
        }

        return birthdayThisYear;
    }

    const now = new Date();
    const nextBirthday = getNextBirthday(birthdayString);

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = nextBirthday - now;

    // Convert milliseconds to days
    const millisecondsInADay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil(differenceInMilliseconds / millisecondsInADay);

    return daysLeft;
}

function getRandomSentence(years) {
    // List of playful sentences
    const sentences = [
        `Look at you, ${years} years of awesomeness on Earth! 🌍`,
        `${years} trips around the sun and still shining bright! 🌅`,
        `You've been gracing this planet for ${years} fabulous years! ✨`,
        `Cheers to ${years} years of being an incredible human! 🎖️`,
        `${years} years of making the world a cooler place! 😎`,
        `You've been rocking this Earth for ${years} whole years—way to go! 🚀`,
        `${years} years of spreading your unique sparkle across the globe! 🌟`,
        `${years} years in and still making waves on this planet! 🌊`,
        `Here’s to ${years} years of you being your awesome self! 🎉`,
        `Congratulations on ${years} years of making this world a better place! 🌟`,
        `${years} years of experience and still going strong! 💪`,
        `Cheers to ${years} years of being simply you! 🥂`,
        `Celebrating ${years} years of you just being you! 🥳`,
        `Here’s to ${years} years of living life to the fullest! 🎊`,
        `${years} years in and still making a mark! ✍️`,
        `Congrats on ${years} years—keep doing your thing! 🎈`
    ];
    // Generate a random index to select a sentence
    const randomIndex = Math.floor(Math.random() * sentences.length);

    // Return the randomly selected sentence
    return sentences[randomIndex];
}

function numberToText(number) {
    const ones = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
        'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
        'Eighteen', 'Nineteen'
    ];

    const tens = [
        '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'
    ];

    if (number < 20) {
        return ones[number];
    } else {
        const ten = Math.floor(number / 10);
        const one = number % 10;
        return `${tens[ten]}${one ? ' ' + ones[one] : ''}`;
    }
}

let isProfileLoading = false;
function loadProfile(reload, withoutCanvas) {

    if (isProfileLoading === true) {
        console.log("Profile is already loading. Stopping.")
        return;
    }
    isProfileLoading = true;
    const username = localStorage.getItem("t50-username")
    const email = localStorage.getItem("t50-email")
    if (!withoutCanvas) {
        $("#canvasOption").fadeOut("fast", function () {
            $("#loadingIndicatorSelfCanvas").fadeIn("fast")
        })
    }

    //What will load: Friends count, username, email, last seen, age, birthdate, cryptox, verified
    if (reload) {
        console.warn("Running load profile with reload")
        //reload gracefully
    } else if (withoutCanvas) {
        if(document.getElementById("self-video-forDisplay").src === '') {
            loadProfile()
        } else {
            console.warn("Running load profile withoutCanvas")
        }
       
    } else {
        console.warn("Running load profile normally")
    }

    fetch(`${srv}/social?username=${username}&todo=tags`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("userTags")
            container.innerHTML = ''
            //will return current tags
            if(data.includes('No tags')) {
                return;
            }
            data.forEach((tag) => {
                var div = document.createElement("div");
                div.className = "user-tag";

                // Create the SVG element
                var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                svg.setAttribute("width", "20px");
                svg.setAttribute("height", "20px");
                svg.setAttribute("viewBox", "0 0 24 24");
                svg.setAttribute("fill", "none");

                // Create the path element
                var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", "M10 4L7 20M17 4L14 20M5 8H20M4 16H19");
                path.setAttribute("stroke", "#fff");
                path.setAttribute("stroke-width", "2");
                path.setAttribute("stroke-linecap", "round");

                // Append the path to the svg
                svg.appendChild(path);

                // Append the svg to the div
                div.appendChild(svg);

                // Add the text node "Add Tag"
                div.appendChild(document.createTextNode(tag));

                // Append the div to the element with ID "userTags"
                container.appendChild(div);
            })
        })
        .catch(error => {
            setNetworkStatus('off')
            console.error('Failed to update tags', error)
        });
    // Function to handle the canvas status check
    function checkCanvasStatus() {
        if (withoutCanvas) {
            $("#bggradient").fadeOut("fast");
            document.getElementById("self-video-forDisplay").style.display = '';
            $("#loadingIndicatorSelfCanvas").fadeOut("fast", function () {
                $("#canvasOption").fadeIn("fast")
            })
            return;
        }
        return fetch(`${srv}/canvas/${username}.evox/has`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(canvasStatus => {
                if (canvasStatus === 'true') {
                    document.getElementById("self-video-forDisplay").style.display = '';
                    const ranN = Math.floor(Math.random() * 100000)
                    document.getElementById("self-video-forDisplay").src = `${srv}/canvas/${username}.evox?v=${ranN}`;
                    saveVideoAsBlob(username, `${srv}/canvas/${username}.evox?v=${ranN}`)
                    return new Promise((resolve) => {
                        document.getElementById("self-video-forDisplay").onloadeddata = function () {
                            console.log("Canvas Loaded!");

                            if (reload) {
                                $("#bggradient").fadeOut("fast");
                            } else {
                                document.getElementById("tab-profile").classList.add("animate");
                                document.getElementById("tab-profile").classList.add("active");
                                setTimeout(function () {
                                    if (activeTab !== 'Profile') {
                                        document.getElementById("tab-profile").classList.remove("active");
                                    }
                                    setTimeout(function () {
                                        document.getElementById("tab-profile").classList.remove("animate");
                                    }, 500);
                                }, 1500);
                            }
                            $("#loadingIndicatorSelfCanvas").fadeOut("fast", function () {
                                $("#canvasOption").fadeIn("fast")
                            })
                            resolve(); // Resolve the promise when canvas is loaded
                        };
                    });
                } else {
                    document.getElementById("self-video-forDisplay").src = '';
                    document.getElementById("self-video-forDisplay").style.display = 'none';
                    $("#loadingIndicatorSelfCanvas").fadeOut("fast")
                    return Promise.resolve(); // Resolve immediately if no canvas
                }
            })
            .catch(error => {
                checkUsernameAndGetData(`${username}_canvas`, function (error, data) {
                    if (error) {
                        console.error('canvas err:', error);
                        reject(error);
                    } else {
                        console.log("canvas lc data", data)
                        if (data !== 'None') {
                            const blob = new Blob([data.data], { type: 'video/mp4' });
                            const videoURL = URL.createObjectURL(blob);
                            document.getElementById("self-video-forDisplay").style.display = ''
                            document.getElementById("self-video-forDisplay").src = videoURL
                            document.getElementById("self-video-forDisplay").onloadeddata = function () {
                                console.log("Canvas Loaded!");
                                $("#bggradient").fadeOut("fast")
                                $("#loadingIndicatorSelfCanvas").fadeOut("fast")
                            };
                        } else {
                            console.log("Data is None")
                            $("#loadingIndicatorSelfCanvas").fadeOut("fast")
                            document.getElementById("selfshowErrorCanvas").style.display = '';
                        }
                    }
                });
                console.error(error);
                return Promise.reject(error); // Reject the promise if an error occurs
            });
    }

    // Function to handle profile picture loading
    function loadProfilePicture() {
        return loadPFPget(username)
            .then(profileImage => {
                document.getElementById("self-profile-picture").src = profileImage;
            })
            .catch(error => {
                setNetworkStatus('off');
                console.error(error);
                return Promise.reject(error); // Reject the promise if an error occurs
            });
    }

    // Function to handle friends count
    function loadFriends() {
        return fetch(`${srv}/social?username=${username}&todo=friends`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setNetworkStatus('on');
                localStorage.setItem("friends", JSON.stringify(data));
                document.getElementById("self_friendsCount").innerText = data.length;
            })
            .catch(error => {
                setNetworkStatus('off');
                const data = localStorage.getItem("friends");
                if (data) {
                    console.warn("Server connection failed. Trying local");
                    securelineHome(JSON.parse(data), 'secureline-users');
                } else {
                    console.error('loadSecurelineHome Failed!', error);
                }
                return Promise.reject(error); // Reject the promise if an error occurs
            });
    }

    // Function to handle last login time
    function loadLastLogin() {
        return fetch(`${srv}/accounts?email=${email}&username=${username}&method=last_login`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(last_login => {
                localStorage.setItem("selfLastLogin", last_login);
                const today = new Date().toISOString().split('T')[0];
                const datePart = last_login.split(' ')[0];
                const timePart = last_login.split(' ')[1].slice(0, 5);

                if (datePart === today) {
                    console.log(timePart);
                    document.getElementById("self_lastSeen").innerText = timePart;
                } else {
                    if (last_login !== 'Unknown') {
                        document.getElementById("self_lastSeen").innerText = formatTimeDifference(last_login) + " ago";
                    } else {
                        document.getElementById("self_lastSeen").innerText = 'Unknown';
                    }
                }
            })
            .catch(error => {
                console.log("Self Load Last Login Failed [3]:", error);
                return Promise.reject(error); // Reject the promise if an error occurs
            });
    }

    // Function to handle birthdate and age
    function loadBirthdate() {
        return fetch(`${srv}/accounts?email=${email}&username=${username}&birth=get`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(birthdateString => {
                if (birthdateString) {
                    document.getElementById("self-age-block").style.display = '';
                    document.getElementById("self-birth-block").style.display = '';
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
                    document.getElementById("self-age").innerText = age;
                    document.getElementById("self-birthdate").innerText = birthdateString;
                } else {
                    console.log("No age registered");
                    document.getElementById("self-age-block").style.display = 'none';
                    document.getElementById("self-birth-block").style.display = 'none';
                }
            })
            .catch(error => {
                console.log("Self Load Failed [4]:", error);
                return Promise.reject(error); // Reject the promise if an error occurs
            });
    }

    // Function to handle Cryptox status
    function loadCryptoxStatus() {
        return fetch(`${srv}/cryptox?method=isCryptoxed&username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(isCryptoxed => {
                if (isCryptoxed === 'Enabled') {
                    localStorage.setItem("isSelfCryptoxed", 'true');
                    document.getElementById("self-cryptox").innerText = 'Enabled';
                } else if (isCryptoxed === 'Disabled') {
                    localStorage.setItem("isSelfCryptoxed", 'false');
                    document.getElementById("self-cryptox").innerText = 'Disabled';
                } else {
                    document.getElementById("self-cryptox").innerText = '🤯';
                }

            })
            .catch(error => {
                const isCryptoxed = localStorage.getItem("isSelfCryptoxed");
                if (isCryptoxed === 'true') {
                    document.getElementById("self-cryptox").innerText = 'Enabled';
                } else if (isCryptoxed === 'false') {
                    document.getElementById("self-cryptox").innerText = 'Disabled';
                } else {
                    document.getElementById("self-cryptox").innerText = '🤯';
                    console.log('self isCryptoxed failed to load [5]:', error);
                }
                return Promise.reject(error); // Reject the promise if an error occurs
            });
    }

    // Main function to execute all promises and run code after completion
    function executeAfterAll() {
        document.getElementById("self-profile-username").innerText = username;

        // Use Promise.all to wait for all fetch operations and processing to complete
        Promise.all([
            checkCanvasStatus(),
            loadProfilePicture(),
            loadFriends(),
            loadLastLogin(),
            loadBirthdate(),
            loadCryptoxStatus()
        ]).then(() => {
            // Code to run after all promises are resolved
            console.log("All data loaded successfully");
            isProfileLoading = false;
            // Add any additional code that needs to run after all data is loaded here
        }).catch(error => {
            console.error("An error occurred while loading data:", error);
            // Handle any errors that occurred during the promise execution
        });
    }

    // Call the main function
    executeAfterAll();
}

function setUserCover() {
    const input = document.getElementById('upload-canvas');
    const file = input.files[0];
    document.getElementById("canvasOption").innerHTML = `<svg style="display: inline-flex;
                    align-items: center;
                    vertical-align: middle;" version="1.1"
                    width="25px" height="25px" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
                    style="enable-background:new 0 0 50 50;" xml:space="preserve">
                    <path fill="#fff"
                        d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
                        <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
                            to="360 25 25" dur="0.6s" repeatCount="indefinite" />
                    </path>
                </svg>`
    if (!file) {
        alert('Please select a file.');
        return;
    }

    // Get the file extension
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase(); // Extract and convert to lowercase

    console.log('File Extension:', fileExtension);
    if (fileExtension.includes("mov")) {
        alert("Warning! The file you are uploading is .mov, which may take longer for Evox to process and convert.")
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('method', 'userCoverEpsilon');
    formData.append('username', localStorage.getItem("t50-username"));
    formData.append('password', localStorage.getItem("t50pswd")); // Ensure password is encoded if needed

    const startTime = performance.now(); // Capture the start time before sending the request

    fetch(`${srv}/canvas`, {
        method: 'POST',
        body: formData
    })
        .then(response => {
            const requestReceivedTime = performance.now(); // Time when the response is received
            console.log('Request sent at:', startTime);
            console.log('Response received at:', requestReceivedTime);
            console.log('Time taken to receive response:', requestReceivedTime - startTime, 'ms');
            return response.json(); // Parse the response
        })
        .then(data => {
            console.log('Success:', data);
            isProfileLoading = false;
            loadProfile('reload')
            document.getElementById("canvasOption").innerHTML = `Edit Canvas`
        })
        .catch(error => {
            console.error('Error:', error);
        });



    // Reset the input value to allow selecting the same file again
    input.value = '';
}

function showCanvasInput() {
    document.getElementById('upload-canvas').click();
}

function addTag() {
    // Display a prompt dialog to the user
    let userInput = prompt("Please enter a tag:");

    // Check if the user clicked "Cancel" or entered a value
    if (userInput === null) {
        alert("You canceled the input.");
    } else {
        fetch(`${srv}/social?username=${localStorage.getItem("t50-username")}&todo=addTag&tag=${userInput}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const container = document.getElementById("userTags")
                container.innerHTML = ''
                //will return current tags
                if(data.includes('No tags')) {
                    return;
                }
                data.forEach((tag) => {
                    var div = document.createElement("div");
                    div.className = "user-tag";
    
                    // Create the SVG element
                    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                    svg.setAttribute("width", "20px");
                    svg.setAttribute("height", "20px");
                    svg.setAttribute("viewBox", "0 0 24 24");
                    svg.setAttribute("fill", "none");
    
                    // Create the path element
                    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    path.setAttribute("d", "M10 4L7 20M17 4L14 20M5 8H20M4 16H19");
                    path.setAttribute("stroke", "#fff");
                    path.setAttribute("stroke-width", "2");
                    path.setAttribute("stroke-linecap", "round");
    
                    // Append the path to the svg
                    svg.appendChild(path);
    
                    // Append the svg to the div
                    div.appendChild(svg);
    
                    // Add the text node "Add Tag"
                    div.appendChild(document.createTextNode(tag));
    
                    // Append the div to the element with ID "userTags"
                    container.appendChild(div);
                })
            })
            .catch(error => {
                setNetworkStatus('off')
                console.error('Failed to update tags', error)
            });
    }
}