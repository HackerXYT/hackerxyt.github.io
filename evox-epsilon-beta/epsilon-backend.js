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

            ip = "offline"
            console.error("YOU ARE OFFLINE")
            console.log('Error:', error);
        });
});
//IndexedDB
function loadPFPget(username) {
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
                } else {
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

function profilesLocal(username, img) {
    let request = window.indexedDB.open('EvoxSocial'); // Change the version number to 2

    request.onerror = function (event) {
        console.log("Database error:", event.target.error);
    };

    request.onsuccess = function (event) {
        // Database has been opened successfully
        let db = event.target.result;

        // Proceed with adding the user
        let transaction = db.transaction(['Profiles'], 'readwrite');
        let objectStore = transaction.objectStore('Profiles');

        let newUser = { data: img, username: username };
        let addRequest = objectStore.add(newUser);

        addRequest.onsuccess = function (event) {
            console.log(`Operation [${username}] Profile Picture Succeeded.`);
        };

        addRequest.onerror = function (event) {
            console.log("Error adding user:", event.target.error);
        };
    };

    request.onupgradeneeded = function (event) {
        // If the database does not exist or needs to be updated
        let db = event.target.result;
        let objectStore = db.createObjectStore('Profiles', { keyPath: 'username' });
        objectStore.createIndex('usernameIndex', 'username', { unique: true });
    };
}

//UI
function attachUi(data) {
    if (data === "") {
        console.log("No Friends")
        return;
    }

    const carousel = document.getElementById("securelineCarousel");
    carousel.innerHTML = ''

    let firstFiveValues = data.slice(0, 5);
    firstFiveValues.forEach((friend) => {
        const slUserDiv = document.createElement("div");
        slUserDiv.className = "slUser";
        if (localStorage.getItem("favorites")) {
            const previous = JSON.parse(localStorage.getItem("favorites"))
            if (previous.includes(friend)) {
                slUserDiv.onclick = function () {
                    const json = {
                        username: friend,
                        favorite: true
                    }
                    openChat(json, 'home')
                }
            } else {
                slUserDiv.onclick = function () {
                    const json = {
                        username: friend,
                        favorite: false
                    }
                    openChat(json, 'home')
                }
            }
        } else {
            slUserDiv.onclick = function () {
                const json = {
                    username: friend,
                    favorite: false
                }
                openChat(json, 'home')
            }
        }

        const imgElement = document.createElement("img");
        imgElement.className = "slUserPFP";
        imgElement.src = "searching_users.gif";
        loadPFPget(friend)
            .then(profileImage => {
                imgElement.src = profileImage;
            }).catch(error => {
                setNetworkStatus('off')
                console.error(error);
            });
        slUserDiv.appendChild(imgElement);
        carousel.appendChild(slUserDiv);
    })

    const social = document.getElementById("socialInfo");
    social.innerHTML = ''
    data.sort(() => 0.5 - Math.random());
    let random3Values = data.slice(0, 3);
    random3Values.forEach((friend) => {


        const socialUserDiv = document.createElement('div');
        socialUserDiv.className = 'socialUser';

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
    if (diffHours < 24) {
        if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
        } else {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
        }
    } else if (diffDays < 6) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffDays >= 7) {
        return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
    } else {
        return 'Time difference is too large';
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
            document.getElementById("secureline").style.height = staticDevHeight
        }
    })

});

window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' // Optional: adds smooth scrolling animation
});
inputSecureline.addEventListener('blur', function () {
    console.log('Input field is blurred');
    document.getElementById("secureline").style.height = stockHeight
    $("#secureline-search-users").fadeOut("fast", function () {
        $("#favorites-recommended").fadeIn("fast")
        $("#secureline-users").fadeIn("fast")
    })


});
let previousInput = null;
inputSecureline.addEventListener('input', function (event) {
    const inputValue = event.target.value.toLowerCase(); // Convert input value to lowercase
    if (inputValue === "") {
        document.getElementById("secureline").style.height = stockHeight
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
                        fetch(`${srv}/secureline?method=lastMSG&username=${localStorage.getItem("t50-username")}&recipient_username=${friend}&password=${atob(localStorage.getItem("t50pswd"))}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }
                                return response.text();
                            })
                            .then(lastMsg => {

                                if (lastMsg.length > 15) {
                                    span.textContent = lastMsg.substring(0, 15) + '..'
                                } else {
                                    span.textContent = lastMsg
                                }
                            }).catch(error => {
                                const lastMsg = localStorage.getItem(`${friend}-lastMsg`)
                                if (lastMsg.length > 15) {
                                    span.textContent = lastMsg.substring(0, 15) + '..'
                                } else {
                                    span.textContent = lastMsg
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
            const userDiv = document.createElement('div');
            userDiv.className = 'user';
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


                    if (lastMsg === 'Chat not created' && appending === "secureline-users") {
                        console.log(`Stopping Spawn For User ${friend}.`)
                        userDiv.remove();
                        return;
                    }

                    messageSpan.textContent = lastMsg;
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
                        messageSpan.textContent = lastMsg;
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

                                if (lastMsg.length > 15) {
                                    span.textContent = lastMsg.substring(0, 15) + '..'
                                } else {
                                    span.textContent = lastMsg
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
        <p class='centered-text'>Chat Hasn't Been Created.
        <button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`;
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
                });
            } catch (error) {
                console.error("Error parsing messages:", error);
            }
        })
        .catch(error => console.error("Fetch error:", error));
}

function actionReload(whoto) {
    console.log("Reloading");
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
            setNetworkStatus('on')
            try {
                const integrityCheck = JSON.parse(messages);
            } catch (error) {
                console.error("Possible Account Verification Error:", messages);
                return;
            }
            if (sessionStorage.getItem("lastChatInter") === messages) {
                console.log("No new messages");
                //return;
            }
            sessionStorage.setItem("lastChatInter", messages);
            if (messages === "Chat not created") {
                document.getElementById("messages-container").innerHTML = `<p class='centered-text'>Chat Hasn't Been Created.<button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`;
                console.log("Chat Doesn't Exist");
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

                            checkUrlAccessibility(logoUrl)
                                .then(not404 => {
                                    if (not404 === true) {
                                        messageElement.innerHTML = `<img class="urlImg" src="${logoUrl}">
                                        <div class="embedCol">
                                            <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                                            <vo>${infoFile}</vo>
                                        </div>
                                        <img class="imgBox" src="./novus/open.svg" style="margin-right: 0px;">`;
                                    } else {
                                        if (fileSrc !== false) {
                                            messageElement.innerHTML = `<img class="urlImg" src="${fileSrc}">
                                            <div class="embedCol">
                                                <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                                                <vo>${infoFile}</vo>
                                            </div>
                                            <img class="imgBox" src="./novus/open.svg" style="margin-right: 0px;">`;
                                        } else {
                                            messageElement.innerHTML = `<img class="urlImg" style="width: 25px;height:25px" src="./novus/attach.svg">
                        <div class="embedCol">
                            <span>${url.hostname.match(/(?:www\.)?([a-zA-Z0-9-]+)\./)[1]}</span>
                            <vo>${infoFile}</vo>
                        </div>
                        <img class="imgBox" src="./novus/open.svg" style="margin-right: 0px;">`;
                                        }
                                    }
                                    // Apply appropriate class based on the sender
                                    if (message.sender === localStorage.getItem("t50-username")) {
                                        messageElement.classList.add('message-me');
                                    } else {
                                        messageElement.classList.add('message');
                                    }
                                    messagesContainer.appendChild(messageElement);
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
            console.log('URL is accessible.');
            return true;
        } else {
            console.log('URL is not accessible. Status:', response.status);
            return false;
        }
    } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error checking URL:', error);
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