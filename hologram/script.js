let selected = null;
let info = null;

if (!localStorage.getItem("t50-username") || !localStorage.getItem("t50pswd")) {
    function getep() {
        // Prompt for email
        const username = prompt("Please enter your username:");

        // Check if email is provided
        if (!username) {
            alert("Username is required!");
            return;
        }

        const email = prompt("Please enter your email:");

        // Check if email is provided
        if (!email) {
            alert("Email is required!");
            return;
        }

        // Prompt for password
        const password = prompt("Please enter your password:");

        // Check if password is provided
        if (!password) {
            alert("Password is required!");
            return;
        }

        // Display entered email and password
        alert(`Connecting to Vox..`);
        localStorage.setItem("t50-email", email)
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        localStorage.setItem("t50-username", username)
        window.location.reload()
    }

    getep()

}

fetch(`http://192.168.1.126:4000/images/checkOwnerShip?username=${localStorage.getItem("t50-username")}&password=${atob(localStorage.getItem("t50pswd"))}&email=${localStorage.getItem("t50-email")}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', // Modify this based on your API's requirements
    }
})
    .then(response => response.text())
    .then(data => {
        //console.log(data)
        if (data === "Accepted") {
            console.log("All ok")
        } else {
            alert("far you go..")
            localStorage.clear()
            window.location.reload()

        }

        fetch(`http://192.168.1.126:4000/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${localStorage.getItem("t50-username")}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(profileimage => {
                if (profileimage.indexOf("base64") === -1) {
                    ////console.log("Fixing Base64");
                    profileimage = "data:image/jpeg;base64," + profileimage;
                }
                // Resolve with profile image
                document.getElementById("me").src = profileimage
            })
            .catch(error => {
                console.error("Cannot set src for", username);
                console.error(error);
                reject(error);
            });

    }).catch(error => {
        // Handle errors
        alert(error)
        console.error('Error:', error);
    });


function dbload() {
    fetch(`http://192.168.1.126:4000/images-database?password=${atob(localStorage.getItem("t50pswd"))}&method=getIDs`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
    })
        .then(response => response.json())
        .then(data => {
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

            //setTimeout(function () {
            //    const transparent = document.createElement("div");
            //    transparent.className = "transparent-placeholder";
            //    container.appendChild(transparent);
            //}, 800);
            data.forEach(value => {
                let number = value.match(/\d+/)[0];
                ////console.log("num:", number);

                // Create and append the transparent placeholder


                // Create and append the image element
                const div = document.createElement("div");
                div.className = `image`;
                div.id = `item${number}`;

                const img = document.createElement("img");
                img.alt = `Image ${number}`;
                img.id = `img${number}`;
                img.src = `http://192.168.1.126:4000/images-database?password=${atob(localStorage.getItem("t50pswd"))}&image=${number}&method=access`;
                img.onclick = function () {
                    selected = number
                }

                const vo = document.createElement("vo");
                vo.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z"
                            fill="#fff" />
                    </svg>`
                vo.onclick = function () {
                    alert("Clicked!")
                }

                if (info) {
                    const imageKey = `image${number}.png`;
                    const imageInfo = info[imageKey];

                    if (imageInfo && imageInfo.favorite === true) {
                        vo.style.display = 'block'; // Adjust the display style as needed
                    } else {
                        console.log(`image${number}.png -> ${imageInfo ? imageInfo.favorite : 'undefined'}`);
                    }
                } else {
                    console.error("info is undefined or null", info);
                }


                div.appendChild(img);
                div.appendChild(vo)
                container.appendChild(div);

                function setItemHeight(imgId, itemId) {
                    const img = document.getElementById(imgId);
                    if (img) { // Check if the image element exists
                        img.onload = function () {
                            const height = img.offsetHeight;
                            document.getElementById(itemId).style.height = `${height}px`;
                        };
                    } else {
                        console.error(`Image with id ${imgId} not found.`);
                    }
                }

            });


            if (numberOfValues === 0) {
                console.log("No images loaded");
            }

            ////console.log("Ready");
        })
        .catch(error => {
            // Handle errors
            alert(error);
            console.error('Error:', error);
        });



}
//

function begin() {
    fetch(`http://192.168.1.126:4000/images-database?password=${atob(localStorage.getItem("t50pswd"))}&method=getInfo`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
    })
        .then(response => response.json())
        .then(data => {
            info = data
            dbload()
        }).catch(error => {
            // Handle errors
            alert(error);
            console.error('Error:', error);
        });
    const aloco = ['0', '1', '2', '3', '4', '5']
    aloco.forEach((op) => {
        document.getElementById(`op${op}`).classList.remove("active")
    });
    document.getElementById(`op0`).classList.add("active")
}

begin()

function filter(vv, element) {
    document.getElementById("images-container").innerHTML = `Loading.. <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
              <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
              <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.3s"
                  repeatCount="indefinite"/>
                </path>
              </svg>`
    let what;
    //if (vv) {
    //    what = types[vv]
    //} else {
    //    return;
    //}
    what = element.innerText
    fetch(`http://192.168.1.126:4000/images-database?method=getByType&password=${atob(localStorage.getItem("t50pswd"))}&format=${what}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
    })
        .then(response => response.json())
        .then(data => {
            const aloco = ['0', '1', '2', '3', '4', '5']
            aloco.forEach((op) => {
                document.getElementById(`op${op}`).classList.remove("active")
            });
            element.classList.add("active")
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

            //setTimeout(function () {
            //    const transparent = document.createElement("div");
            //    transparent.className = "transparent-placeholder";
            //    container.appendChild(transparent);
            //}, 800);
            data.forEach(value => {
                let number = value.match(/\d+/)[0];
                ////console.log("num:", number);

                // Create and append the transparent placeholder


                // Create and append the image element
                const div = document.createElement("div");
                div.className = `image`;
                div.id = `item${number}`;

                const img = document.createElement("img");
                img.alt = `Image ${number}`;
                img.id = `img${number}`;
                img.src = `http://192.168.1.126:4000/images-database?password=${atob(localStorage.getItem("t50pswd"))}&image=${number}&method=access`;
                img.onclick = function () {
                    selected = number
                }

                const vo = document.createElement("vo");
                vo.innerHTML = `<svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.993 5.09691C11.0387 4.25883 9.78328 3.75 8.40796 3.75C5.42122 3.75 3 6.1497 3 9.10988C3 10.473 3.50639 11.7242 4.35199 12.67L12 20.25L19.4216 12.8944L19.641 12.6631C20.4866 11.7172 21 10.473 21 9.10988C21 6.1497 18.5788 3.75 15.592 3.75C14.2167 3.75 12.9613 4.25883 12.007 5.09692L12 5.08998L11.993 5.09691ZM12 7.09938L12.0549 7.14755L12.9079 6.30208L12.9968 6.22399C13.6868 5.61806 14.5932 5.25 15.592 5.25C17.763 5.25 19.5 6.99073 19.5 9.10988C19.5 10.0813 19.1385 10.9674 18.5363 11.6481L18.3492 11.8453L12 18.1381L5.44274 11.6391C4.85393 10.9658 4.5 10.0809 4.5 9.10988C4.5 6.99073 6.23699 5.25 8.40796 5.25C9.40675 5.25 10.3132 5.61806 11.0032 6.22398L11.0921 6.30203L11.9452 7.14752L12 7.09938Z"
                            fill="#fff" />
                    </svg>`
                vo.onclick = function () {
                    alert("Clicked!")
                }

                if (info) {
                    const imageKey = `image${number}.png`;
                    const imageInfo = info[imageKey];

                    if (imageInfo && imageInfo.favorite === true) {
                        vo.style.display = 'block'; // Adjust the display style as needed
                    } else {
                        console.log(`image${number}.png -> ${imageInfo ? imageInfo.favorite : 'undefined'}`);
                    }
                } else {
                    console.error("info is undefined or null", info);
                }


                div.appendChild(img);
                div.appendChild(vo)
                container.appendChild(div);

                function setItemHeight(imgId, itemId) {
                    const img = document.getElementById(imgId);
                    if (img) { // Check if the image element exists
                        img.onload = function () {
                            const height = img.offsetHeight;
                            document.getElementById(itemId).style.height = `${height}px`;
                        };
                    } else {
                        console.error(`Image with id ${imgId} not found.`);
                    }
                }

            });


            if (numberOfValues === 0) {
                console.log("No images loaded");
            }
        }).catch(error => {
            // Handle errors
            alert(error);
            console.error('Error:', error);
        });
}
function getRandomValue(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
let types = [];

fetch(`http://192.168.1.126:4000/images-database?method=getTypes&password=${atob(localStorage.getItem("t50pswd"))}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', // Modify this based on your API's requirements
    }
})
    .then(response => response.json())
    .then(data => {
        types = data
        localStorage.setItem("types", JSON.stringify(data))
        loadStories()
    }).catch(error => {
        // Handle errors
        alert(error);
        console.error('Error:', error);
    });



let start = 0
function loadStories() {
    console.log(types)
    types.forEach((type) => {

        fetch(`http://192.168.1.126:4000/images-database?method=getByType&password=${atob(localStorage.getItem("t50pswd"))}&format=${type}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // Modify this based on your API's requirements
            }
        })
            .then(response => response.json())
            .then(data => {

                const iconPfp = getRandomValue(data);
                let number = iconPfp.match(/\d+/)[0];
                start = start + 1;
                document.getElementById(`op${start}`).innerText = `${type}`

                const imageElement = document.getElementById(`u${start}`);
                imageElement.src = `http://192.168.1.126:4000/images-database?password=${atob(localStorage.getItem("t50pswd"))}&image=${number}&method=access`;
                imageElement.style.display = 'flex'
                imageElement.style.opacity = '1'

                imageElement.onload = function () {
                    console.log('Image has fully loaded');
                    // Set the styles to display and make the image fully opaque
                    imageElement.style.display = 'flex';
                    imageElement.style.opacity = '1';
                };

                // In case the image is already cached and `onload` doesn’t fire,
                // you might want to trigger it manually
                if (imageElement.complete) {
                    imageElement.onload();
                }
            }).catch(error => {
                // Handle errors
                alert(error);
                console.error('Error:', error);
            });
    });

}

