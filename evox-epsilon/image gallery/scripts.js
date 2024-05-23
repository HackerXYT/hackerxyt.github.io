if (!localStorage.getItem("t50pswd")) {
    console.log("Operations will fail.")
}
function notice(message) {
    const oldhtml = document.getElementById("notification").innerHTML
    var notification = document.getElementById('notification');
    if (notification.className.includes("show")) {
        console.log("Notification Is Shown")
        notification.classList.remove('show');
        setTimeout(function () {
            document.getElementById("notification").innerHTML = message
            notification.classList.add('show');
            setTimeout(function () {
                notification.classList.remove('show');
            }, 2500);
        }, 500)
    } else {
        document.getElementById("notification").innerHTML = message
        notification.classList.add('show');
        setTimeout(function () {
            notification.classList.remove('show');
        }, 2500);
    }
}
document.addEventListener('DOMContentLoaded', function () {

    if (localStorage.getItem("t50-username")) {
        //check username
        fetch(`https://data.evoxs.xyz/images/checkOwnerShip?username=${localStorage.getItem("t50-username")}&password=${atob(localStorage.getItem("t50pswd"))}&email=${localStorage.getItem("t50-email")}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Modify this based on your API's requirements
            }
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                if (data === "Accepted") {
                    //continue
                    const items = document.querySelectorAll('.item');
                    items.forEach(item => {
                        item.addEventListener('click', () => {
                            item.classList.toggle('active');
                        });
                    });
                    loadGL()
                    //function setItemHeight(imgId, itemId) {
                    //    const img = document.getElementById(imgId);
                    //    img.onload = function () {
                    //        const height = img.offsetHeight;
                    //        document.getElementById(itemId).style.height = height + "px";
                    //    };
                    //}
                    //
                    //if(localStorage.getItem("numOfVal")) {
                    //    for (let i = 1; i <= Number(localStorage.getItem("numOfVal")); i++) {
                    //        setItemHeight(`img${i}`, `item${i}`);
                    //    }
                    //} else {
                    //    for (let i = 1; i <= 6; i++) {
                    //        setItemHeight(`img${i}`, `item${i}`);
                    //    }
                    //}


                    //document.getElementById("navbar").classList.add("active")
                    const targetElement = document.querySelector('.container');

                    // Create a new ResizeObserver
                    const resizeObserver = new ResizeObserver(entries => {
                        for (let entry of entries) {
                            // Check if the maximum width or height of the element has changed
                            if (entry.contentRect.width !== entry.contentRect.height) {
                                // Run your code here when max-width or max-height changes
                                console.log('Max-width or max-height changed!');
                                function setItemHeight(imgId, itemId) {
                                    const img = document.getElementById(imgId);
                                    try {
                                        img.onload = function () {
                                            const height = img.offsetHeight;
                                            try {
                                                document.getElementById(itemId).style.height = `${height}px`;
                                            } catch {
                                                console.log("Not fully loaded")
                                            }

                                        };
                                    } catch {
                                        console.log("Not fully loaded")
                                    }
                                }

                                if (localStorage.getItem("numOfVal")) {
                                    console.log("Local NUM")
                                    for (let i = 1; i <= Number(localStorage.getItem("numOfVal")); i++) {
                                        setItemHeight(`img${i}`, `item${i}`);
                                    }
                                } else {
                                    console.log("Def NUM")
                                    for (let i = 1; i <= 6; i++) {
                                        setItemHeight(`img${i}`, `item${i}`);
                                    }
                                }

                                document.getElementById("navbar").classList.remove("active")
                                setTimeout(function () {
                                    document.getElementById("navbar").classList.add("active")
                                }, 500)
                                // You can add your custom code logic here
                            }
                        }
                    });

                    // Start observing the target element
                    resizeObserver.observe(targetElement);
                } else {
                    document.getElementById("blocktext").innerHTML = data
                    try {
                        document.getElementById("navbar").style.display = "none"
                        $("#images-container").fadeOut("fast")
                    } catch {
                        document.getElementById("navbar").style.display = "none"
                        document.getElementById("images-container").style.display = "none"
                    }
                    document.getElementById("blocked").style.display = "flex"

                }

                loadPFPget(localStorage.getItem("t50-username"))
                    .then(image => {
                        document.getElementById("usr-img").src = image
                        document.getElementById("profile-pfp").src = image
                        document.getElementById("usr-name").innerHTML = localStorage.getItem("t50-username")
                        document.getElementById("usr-email").innerHTML = localStorage.getItem("t50-email")
                    })

            }).catch(error => {
                // Handle errors
                alert(error)
                console.error('Error:', error);
            });
    } else {
        document.getElementById("blocktext").innerHTML = "You haven't logged in yet."
        try {
            document.getElementById("navbar").style.display = "none"
            $("#images-container").fadeOut("fast")
        } catch {
            document.getElementById("navbar").style.display = "none"
            document.getElementById("images-container").style.display = "none"
        }
        $("#blocked").fadeIn("fast")
        return;
    }

});




function calculateImageSize(base64String) {
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    const binaryData = atob(base64WithoutPrefix);
    const fileSizeInMB = binaryData.length / (1024 * 1024);
    return fileSizeInMB;
}

function calculateTotalSize(base64Array) {
    let totalSize = 0;
    base64Array.forEach(base64Image => {
        totalSize += calculateImageSize(base64Image);
    });
    return totalSize;
}

function createElements(values) {
    const container = document.getElementById("images-container");
    container.innerHTML = ""
    setTimeout(function () {
        const transparent = document.createElement("div")
        transparent.className = "transparent-placeholder"
        container.appendChild(transparent)
    }, 500)
    values.forEach((value, index) => {
        //div.className = 'image-wrapper';

        //<div id="item1" class="item"><img id="img1" src="https://i.pinimg.com/236x/9c/29/61/9c29613d25710ab7643fbb45cb5b022f.jpg" alt="Image 1"></div>

        // Create an <a> element
        const div = document.createElement("div")
        div.className = `item`
        div.id = `item${index + 1}`


        const img = document.createElement("img")
        img.alt = `Image ${index + 1}`
        img.id = `img${index + 1}`
        img.src = value
        img.onclick = function () {
            fullscreen(this)
        }

        div.appendChild(img)
        container.appendChild(div)

    });

    console.log("Ready")
    //document.getElementById("images-container").style.opacity = "1"

}
let loaded = false
function fadeLoad() {
    $("#images-container").fadeOut(1000, function () {
        $("#images-container").fadeIn(1000)
        if (!loaded) {
            fadeLoad()
        }
    })
}

function loadGL() {
    $("#nav-galer").html(`<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
    <path
        d="M22 13.4375C22 17.2087 22 19.0944 20.8284 20.2659C19.6569 21.4375 17.7712 21.4375 14 21.4375H10C6.22876 21.4375 4.34315 21.4375 3.17157 20.2659C2 19.0944 2 17.2087 2 13.4375C2 9.66626 2 7.78065 3.17157 6.60907C4.34315 5.4375 6.22876 5.4375 10 5.4375H14C17.7712 5.4375 19.6569 5.4375 20.8284 6.60907C21.4921 7.27271 21.7798 8.16545 21.9045 9.50024"
        stroke="#ccc" stroke-width="1.5" stroke-linecap="round" />
    <path
        d="M3.98779 6C4.10022 5.06898 4.33494 4.42559 4.82498 3.93726C5.76553 3 7.27932 3 10.3069 3H13.5181C16.5457 3 18.0595 3 19 3.93726C19.4901 4.42559 19.7248 5.06898 19.8372 6"
        stroke="#ccc" stroke-width="1.5" />
    <circle cx="17.5" cy="9.9375" r="1.5" stroke="#ccc" stroke-width="1.5" />
    <path
        d="M2 13.9376L3.75159 12.405C4.66286 11.6077 6.03628 11.6534 6.89249 12.5096L11.1822 16.7993C11.8694 17.4866 12.9512 17.5803 13.7464 17.0214L14.0446 16.8119C15.1888 16.0077 16.7369 16.1009 17.7765 17.0365L21 19.9376"
        stroke="#ccc" stroke-width="1.5" stroke-linecap="round" />
</svg>`)
    $("#nav-db").html(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#787676"
version="1.1" id="Capa_1" width="30px" height="30px" viewBox="0 0 382.333 382.333"
xml:space="preserve">
<g>
    <path
        d="M382.322,210.354l-72.351-26.699V105.2l-35.597-14.02l-0.023-39.481l-83.176-30.766l-83.196,30.43l-0.003,39.818   l-35.597,14.02v78.449L0,210.053V317.89l83.199,31.905l47.447-18.195l60.53,29.8l60.522-29.796l47.436,18.19l83.199-31.905   L382.322,210.354z M191.176,37.222l58.991,21.549l-58.991,22.621L132.184,58.77L191.176,37.222z M24.207,217.535l58.992-21.549   l58.991,21.549l-58.992,22.623L24.207,217.535z M191.176,337.993l-33.804-16.643l9.026-3.461l-0.004-107.784l-73.013-26.689   v-63.917l14.597-5.749v45.375l83.198,31.906l83.199-31.906V113.75l14.597,5.749v63.911l-73.03,26.712l-0.006,107.768l9.036,3.466   L191.176,337.993z M240.144,217.535l58.992-21.549l58.991,21.549l-58.992,22.623L240.144,217.535z" />
</g>
</svg>`)
    $("#images-container").html(`<div class="item"><img src="ph.png" alt="Image 1"></div>
<div class="item"><img src="ph.png" alt="Image 2"></div>
<div class="item"><img src="ph.png" alt="Image 3"></div>
<div class="item"><img src="ph.png" alt="Image 4"></div>
<div class="item"><img src="ph.png" alt="Image 5"></div>
<div class="item"><img src="ph.png" alt="Image 6"></div>
<div class="transparent-placeholder"></div>`)
    loaded = false
    fadeLoad()



    fetch(`https://data.evoxs.xyz/images-gallery/?password=${atob(localStorage.getItem("t50pswd"))}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data === "Access Denied") {
                alert("Denied")
                return;
            }
            loaded = true

            setTimeout(function () {
                console.log('Response:', data);
                let jsonData = JSON.parse(data)
                const numberOfValues = Object.keys(jsonData).length;
                console.log(numberOfValues)
                // Decode each value and store them in an array
                const decodedValues = Object.values(jsonData).map(value => atob(value));
                const totalSizeInMB = calculateTotalSize(decodedValues);
                console.log(`Total gallery image size: ${totalSizeInMB.toFixed(2)} MB`);
                //document.getElementById("size-img").innerHTML = `${totalSizeInMB.toFixed(2)}MB`
                console.log(decodedValues)
                // Call the createElements function with the decoded values
                createElements(decodedValues);
                $("#loadedimg").html(numberOfValues)
                console.log("Loaded:", numberOfValues, "images")

                function setItemHeight(imgId, itemId) {
                    const img = document.getElementById(imgId);
                    img.onload = function () {
                        const height = img.offsetHeight;
                        document.getElementById(itemId).style.height = `${height}px`;

                    };
                }

                localStorage.setItem("numOfVal", numberOfValues)
                for (let i = 1; i <= Number(numberOfValues); i++) {
                    setItemHeight(`img${i}`, `item${i}`);
                }
                document.getElementById("navbar").classList.add("active")
                if (numberOfValues == null) {
                    console.log("No images loaded")

                }


            }, 500)
            //$("#images-container").fadeIn(1000)
            // Handle the response data

        })
        .catch(error => {
            // Handle errors
            alert(error)
            console.error('Error:', error);
        });
}

function dbload() {
    $("#nav-galer").html(`<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none">
    <path
        d="M22 13.4375C22 17.2087 22 19.0944 20.8284 20.2659C19.6569 21.4375 17.7712 21.4375 14 21.4375H10C6.22876 21.4375 4.34315 21.4375 3.17157 20.2659C2 19.0944 2 17.2087 2 13.4375C2 9.66626 2 7.78065 3.17157 6.60907C4.34315 5.4375 6.22876 5.4375 10 5.4375H14C17.7712 5.4375 19.6569 5.4375 20.8284 6.60907C21.4921 7.27271 21.7798 8.16545 21.9045 9.50024"
        stroke="#787676" stroke-width="1.5" stroke-linecap="round" />
    <path
        d="M3.98779 6C4.10022 5.06898 4.33494 4.42559 4.82498 3.93726C5.76553 3 7.27932 3 10.3069 3H13.5181C16.5457 3 18.0595 3 19 3.93726C19.4901 4.42559 19.7248 5.06898 19.8372 6"
        stroke="#787676" stroke-width="1.5" />
    <circle cx="17.5" cy="9.9375" r="1.5" stroke="#787676" stroke-width="1.5" />
    <path
        d="M2 13.9376L3.75159 12.405C4.66286 11.6077 6.03628 11.6534 6.89249 12.5096L11.1822 16.7993C11.8694 17.4866 12.9512 17.5803 13.7464 17.0214L14.0446 16.8119C15.1888 16.0077 16.7369 16.1009 17.7765 17.0365L21 19.9376"
        stroke="#787676" stroke-width="1.5" stroke-linecap="round" />
</svg>`)
    $("#nav-db").html(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ccc"
version="1.1" id="Capa_1" width="30px" height="30px" viewBox="0 0 382.333 382.333"
xml:space="preserve">
<g>
    <path
        d="M382.322,210.354l-72.351-26.699V105.2l-35.597-14.02l-0.023-39.481l-83.176-30.766l-83.196,30.43l-0.003,39.818   l-35.597,14.02v78.449L0,210.053V317.89l83.199,31.905l47.447-18.195l60.53,29.8l60.522-29.796l47.436,18.19l83.199-31.905   L382.322,210.354z M191.176,37.222l58.991,21.549l-58.991,22.621L132.184,58.77L191.176,37.222z M24.207,217.535l58.992-21.549   l58.991,21.549l-58.992,22.623L24.207,217.535z M191.176,337.993l-33.804-16.643l9.026-3.461l-0.004-107.784l-73.013-26.689   v-63.917l14.597-5.749v45.375l83.198,31.906l83.199-31.906V113.75l14.597,5.749v63.911l-73.03,26.712l-0.006,107.768l9.036,3.466   L191.176,337.993z M240.144,217.535l58.992-21.549l58.991,21.549l-58.992,22.623L240.144,217.535z" />
</g>
</svg>`)
    $("#images-container").html(`<div id="item1" class="item"><img id="img1" src="ph.png" alt="Image 1"></div>
<div id="item2" class="item"><img id="img2" src="ph.png" alt="Image 2"></div>
<div id="item3" class="item"><img id="img3" src="ph.png" alt="Image 3"></div>
<div id="item4" class="item"><img id="img4" src="ph.png" alt="Image 4"></div>
<div id="item3" class="item"><img id="img5" src="ph.png" alt="Image 5"></div>
<div id="item4" class="item"><img id="img6" src="ph.png" alt="Image 6"></div>
<div class="transparent-placeholder"></div>`)
    loaded = false
    fadeLoad()
    fetch(`https://data.evoxs.xyz/images-database?password=${atob(localStorage.getItem("t50pswd"))}&method=getIDs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
    })
        .then(response => response.json())
        .then(data => {
            loaded = true;
            const numberOfValues = data.length;
            //const numberOfValues = 50

            data.sort((a, b) => {
                // Extract the numeric part of the filenames
                let numA = parseInt(a.match(/\d+/)[0]);
                let numB = parseInt(b.match(/\d+/)[0]);

                // Compare the numeric parts
                return numA - numB;
            });

            const container = document.getElementById("images-container");
            container.innerHTML = ""; // Clear the container once before the loop

            setTimeout(function () {
                const transparent = document.createElement("div");
                transparent.className = "transparent-placeholder";
                container.appendChild(transparent);
            }, 800);
            data.forEach(value => {
                let number = value.match(/\d+/)[0];
                console.log("num:", number);

                // Create and append the transparent placeholder


                // Create and append the image element
                const div = document.createElement("div");
                div.className = `item`;
                div.id = `item${number}`;

                const img = document.createElement("img");
                img.alt = `Image ${number}`;
                img.id = `img${number}`;
                img.src = `https://data.evoxs.xyz/images-database?password=${atob(localStorage.getItem("t50pswd"))}&image=${number}&method=access`;
                img.onclick = function () {
                    fullscreen(this)
                }

                div.appendChild(img);
                container.appendChild(div);

                function setItemHeight(imgId, itemId) {
                    const img = document.getElementById(imgId);
                    if (img) { // Check if the image element exists
                        img.onload = function () {
                            const height = img.offsetHeight;
                            document.getElementById(itemId).style.height = `${height}px`;
                            notice(`Image ${imgId} loaded.`)
                        };
                    } else {
                        console.error(`Image with id ${imgId} not found.`);
                    }
                }

                setItemHeight(`img${number}`, `item${number}`);
            });

            $("#loadedimg").html(numberOfValues);
            localStorage.setItem("numOfVal", numberOfValues);

            document.getElementById("navbar").classList.add("active");

            if (numberOfValues === 0) {
                console.log("No images loaded");
            }

            console.log("Ready");
        })
        .catch(error => {
            // Handle errors
            alert(error);
            console.error('Error:', error);
        });



}

function connection() {
    document.getElementById("connection").classList.add("active")
}

function checkUsernameAndGetData(username, getDataCallback) {
    let request = window.indexedDB.open('EvoxSocial'); // Change version number to 2

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
                    console.log("Username not found: " + username);
                }
            };

            getRequest.onerror = function (event) {
                console.log("Error checking username:", event.target.error);
            };
        }
    };
}



function loadPFPget(username) {
    return new Promise((resolve, reject) => {
        checkUsernameAndGetData(username, function (error, data) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log("Retrieved data:", data);
                if (data !== "None") {
                    console.log("Loading from localDB");
                    // Resolve with data if available
                    resolve(data.data);
                } else {
                    console.log("Loading from server");
                    fetch(`https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(profileimage => {
                            if (profileimage.indexOf("base64") === -1) {
                                console.log("Fixing Base64");
                                profileimage = "data:image/jpeg;base64," + profileimage;
                            }
                            // Resolve with profile image
                            resolve(profileimage);
                            profilesLocal(username, profileimage);
                        })
                        .catch(error => {
                            console.error("Cannot set src for", username);
                            console.error(error);
                            reject(error);
                        });
                }
            }
        });
    });
}



function goback() {
    sessionStorage.setItem("extRun", 'back')
}

function upldb() {
    document.getElementById("imageFileInput").click()
}

function encodeImageToBase64() {
    const input = document.getElementById('imageFileInput');
    const file = input.files[0];

    const reader = new FileReader();
    reader.onload = () => {
        const base64Text = reader.result.split(',')[1];
        base64Temp = base64Text

        let final = `data:image/png;base64,${base64Text}`
        //var nextImageNumber = getNextImageNumber();
        //var newImageKey = "image" + nextImageNumber;
        // Set the new value in local storage
        //localStorage.setItem(newImageKey, btoa(final));
        //console.log("New image key:", newImageKey);
        var password = atob(localStorage.getItem('t50pswd'));

        console.log("Private DB")
        const totalSizeInMB = calculateImageSize(final);
        if (totalSizeInMB.toFixed(2) > 3.5) {
            alert(`File Is Large And May Fail Uploading (${totalSizeInMB.toFixed(2)}MB). Continue?`);
        } else {
            alert(`Size Is ${totalSizeInMB.toFixed(2)}MB. Continue?`);
        }

        const postData = {
            image: final,
            password: password,
            method: "upload"
        };
        let api = "https://data.evoxs.xyz/images-database"
        fetch(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Modify this based on your API's requirements
            },
            body: JSON.stringify(postData), // Convert FormData to JSON
        })
            .then(response => response.text())
            .then(data => {
                // Handle the response data
                console.log('Response:', data);
                //dbload()

            })
            .catch(error => {
                alert(error)
                // Handle errors
                console.error('Error:', error);
            });
    };

    reader.readAsDataURL(file);
}

function fullscreen(elem) {
    const imgSrc = elem.src
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = imgSrc;
    fullscreenContainer.classList.add('active');
    document.getElementById('imgid').innerHTML = elem.id;
    document.getElementById('downld').innerHTML = `<a href="${imgSrc}" download="image${elem.id}.png" class="apple-button" >Download</a>`;
}

function hidefull() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.classList.remove('active');
}

function abort() {
    window.location.href = "../index.html"
}

const swipeAreaProfile = document.getElementById('images-container');

let touchstartXProfile = 0;
let touchendXProfile = 0;
let touchstartYProfile = 0;
let touchendYProfile = 0;


let pressed = 0
function handleGestureProfile() {
  const distanceX = touchendXProfile - touchstartXProfile;
  const distanceY = touchendYProfile - touchstartYProfile;

  if (Math.abs(distanceX) > Math.abs(distanceY)) {
    // Horizontal swipe
    if (distanceX > 50) { // Left-to-right swipe
      console.log('Swiped from left to right');
      // Run your desired function for left-to-right swipe here
      loadGL();
      if(pressed > 2) {
        connection()
      }
      setTimeout(function() {
        pressed = 0
      }, 2500)
      pressed = pressed + 1
      console.log("Pressed:", pressed, "times")
    } else if (distanceX < -50) { // Right-to-left swipe
      console.log('Swiped from right to left');
      // Run your desired function for right-to-left swipe here
      dbload();
    }
  } else {
    // Vertical swipe
    if (distanceY > 50) { // Top-to-bottom swipe
      console.log('Swiped from top to bottom');
      // Run your desired function for top-to-bottom swipe here
    } else if (distanceY < -50) { // Bottom-to-top swipe (Swipe up)
      console.log('Swiped from bottom to top');
      // Run your desired function for bottom-to-top swipe here
      //handleSwipeUp();
    }
  }
}

swipeAreaProfile.addEventListener('touchstart', (event) => {
  touchstartXProfile = event.changedTouches[0].screenX;
  touchstartYProfile = event.changedTouches[0].screenY;
});

swipeAreaProfile.addEventListener('touchend', (event) => {
  touchendXProfile = event.changedTouches[0].screenX;
  touchendYProfile = event.changedTouches[0].screenY;
  handleGestureProfile();
});

function handleSwipeUp() {
  
  console.log('Handling swipe up action');
  // Example function for swipe up
}