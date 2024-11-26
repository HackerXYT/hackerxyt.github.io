document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem("houseAuth") === 'ready') {
        getStates1()
        getStates2()
        getStates3()
        getStates4()
        // Call the function to get the currently playing track
        // Function to handle the state change
        if (localStorage.getItem("clientSecret") && !new URLSearchParams(window.location.search).get('code') && !window.location.href.includes('localhost') && !window.location.href.includes('192.168.1.21')) {
            window.location.href = authUrl
        } else {
            getCurrentlyPlayingTrack()
        }
        function handleDeviceToggle(event) {
            const checkbox = event.target;
            const isChecked = checkbox.checked;
            const deviceName = checkbox.nextElementSibling.querySelector('strong').textContent;
            const state = isChecked ? 'online' : 'offline';

            console.log(`Device ${deviceName} is now ${state}`);
            if (deviceName === "Wall Leds") {
                let setIT;
                if (state === 'online') {
                    setIT = "on"
                } else {
                    setIT = "off"
                }
                console.log("Changing State Of Wall Leds")
                changeDev(setIT, deviceName)
            } else if (deviceName === "Bed Leds") {
                let setIT;
                if (state === 'online') {
                    setIT = "on"
                } else {
                    setIT = "off"
                }
                console.log("Changing State Of Wall Leds")
                changeDev(setIT, deviceName)
            } else if (deviceName === "Spotify") {
                //window.open(authUrl);
                window.location.href = authUrl
            } else if (deviceName === "Computer") {

                if (state === 'online') {
                    document.getElementById("air").checked = ""
                    const setiT = "on"
                    const apiUrl = `https://data.evoxs.xyz/house?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&method=poweron`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.status !== "200") {
                                document.getElementById("air").checked = ""
                            } else {
                                document.getElementById("air").checked = "true"
                            }

                        })
                        .catch(error => {
                            console.log('Error fetching weather data:', error);
                        });
                } else {
                    document.getElementById("air").checked = "true"
                    const setiT = "off"
                    const apiUrl = `https://data.evoxs.xyz/house?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&method=shutdown`;

                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.status)
                            document.getElementById("air").checked = ""

                        })
                        .catch(error => {
                            document.getElementById("air").checked = "true"
                            console.log('Error fetching weather data:', error);
                        });
                }
            } else if (deviceName === "Datacenter") {
                document.getElementById("reboot").checked = ""
                let setIT;
                if (state === 'online') {
                    setIT = "on"
                } else {
                    setIT = "off"
                }
                if (setIT === 'off') {
                    console.log("Changing State Of Datacenter")
                    const apiUrl = `https://data.evoxs.xyz/admin?request=reboot&adminUsername=${localStorage.getItem("t50-username")}&adminPass=${atob(localStorage.getItem("t50pswd"))}`;

                    fetch(apiUrl)
                        .then(response => response.text())
                        .then(data => {
                            if (data !== "System is rebooting") {
                                document.getElementById("reboot").checked = "true"
                            } else {
                                document.getElementById("reboot").checked = ""
                                const toreshow2 = setInterval(function () {
                                    console.log(document.getElementById("reboot").checked)
                                    if (document.getElementById("reboot").checked === true) {
                                        clearInterval(toreshow2)
                                    } else {
                                        console.log("Waiting for Datacenter to restart")

                                        getStates4()
                                    }
                                }, 1000)
                            }

                        })
                        .catch(error => {
                            console.log('Error fetching weather data:', error);
                        });
                } else {
                    document.getElementById("reboot").checked = ""
                }

            } else if (deviceName === "Evox") {
                let setIT;
                if (state === 'online') {
                    setIT = "on"
                } else {
                    setIT = "off"
                }
                if (setIT === 'off') {
                    document.getElementById("restart").checked = ""
                    console.log("Changing State Of Datacenter")
                    const apiUrl = `https://data.evoxs.xyz/admin?request=restartDc&adminUsername=${localStorage.getItem("t50-username")}&adminPass=${atob(localStorage.getItem("t50pswd"))}`;

                    fetch(apiUrl)
                        .then(response => response.text())
                        .then(data => {
                            if (data !== "Evox is restarting.") {
                                document.getElementById("restart").checked = ""

                            } else {
                                document.getElementById("restart").checked = ""
                                const toreshow = setInterval(function () {
                                    console.log(document.getElementById("restart").checked)
                                    if (document.getElementById("restart").checked === true) {
                                        clearInterval(toreshow)
                                    } else {
                                        console.log("Waiting for Evox to restart")

                                        getStates4('isRestarting')
                                    }
                                }, 1000)
                            }


                        })
                        .catch(error => {
                            console.log('Error fetching weather data:', error);
                        });
                } else {
                    document.getElementById("restart").checked = ""
                }

            }
            // Add any additional functionality here
        }

        // Select all checkboxes and add event listeners
        const checkboxes = document.querySelectorAll('.appliance input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', handleDeviceToggle);
        });

        fetch(`https://data.evoxs.xyz/house?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&method=authenticate`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(item => {
                if (item.status !== "403") {
                    localStorage.setItem("apiKey", item.apikey)
                    localStorage.setItem("bedID", item.bed)
                    localStorage.setItem("wallID", item.wall)
                    localStorage.setItem("clientId", item.clientId)
                    localStorage.setItem("clientSecret", item.clientSecret)
                    localStorage.setItem("houseAuth", "ready")
                    //setTimeout(function () {
                    //    window.location.reload()
                    //}, 1000)

                } else {
                    //alert("Access Denied")
                    window.location.href = "../../../AuthFailure/"
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    } else {
        alert("Now Authenticating..")
        fetch(`https://data.evoxs.xyz/house?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&method=authenticate`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(item => {
                if (item.status !== "403") {
                    localStorage.setItem("apiKey", item.apikey)
                    localStorage.setItem("bedID", item.bed)
                    localStorage.setItem("wallID", item.wall)
                    localStorage.setItem("clientId", item.clientId)
                    localStorage.setItem("clientSecret", item.clientSecret)
                    localStorage.setItem("houseAuth", "ready")
                    setTimeout(function () {
                        window.location.reload()
                    }, 1000)

                } else {
                    //alert("Access Denied")
                    window.location.href = "../../../AuthFailure/"
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

});

window.addEventListener('load', () => {
    function getCurrentDate() {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const currentDate = new Date();
        const day = currentDate.getDate();
        const monthIndex = currentDate.getMonth();
        const year = currentDate.getFullYear();

        return `${day} ${months[monthIndex]} ${year}`;
    }

    const formattedDate = getCurrentDate();
    document.getElementById("currDate").innerHTML = formattedDate
    const weatherTypeElement = document.getElementById('weatherType');
    const weatherIconElement = document.getElementById('weatherIcon');

    // Function to fetch weather data
    function getWeather() {
        // You can replace 'YOUR_API_KEY' with your actual API key
        const apiKey = '7f6a18c825301e553a8e40a09e617863';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Athens&appid=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const weatherDescription = data.weather[0].main;
                const weatherIcon = data.weather[0].icon;

                // Update HTML elements
                weatherTypeElement.innerHTML = weatherDescription;
                weatherIconElement.innerHTML = `<img style="filter: invert(100%);" src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">`;

                const weatherTemp = data.main.temp
                const celsiusWeather = Number(weatherTemp) - 273.15
                document.getElementById("degrees").innerHTML = `${Math.floor(celsiusWeather)}°<sup>C</sup>`

                const humidity = data.main.humidity
                document.getElementById("humid").innerHTML = `${Math.floor(humidity)}%`

                const clouds = data.clouds.all
                document.getElementById("clouds").innerHTML = `${clouds}`

            })
            .catch(error => {
                console.log('Error fetching weather data:', error);
            });
    }

    // Call the function to get weather data on page load
    getWeather();
});

function changeDev(setIt, dev) {
    let devId;
    if (dev === "Wall Leds") {
        devId = localStorage.getItem("wallID")
    } else if (dev === "Bed Leds") {
        devId = localStorage.getItem("bedID")
    }
    if (dev === "Wall Leds") {
        document.getElementById("lamp").checked = ""
    } else if (dev === "Bed Leds") {
        document.getElementById("router").checked = ""
    }
    const url = 'https://developer-api.govee.com/v1/devices/control';
    const apiKey = localStorage.getItem("apiKey");  // Replace with your Govee API key

    // Device information
    const device = {
        device: devId,  // Replace with your Govee device ID
        model: 'H6141'  // Replace with your Govee device model
    };

    // Define the request payload to turn on the device
    const data = {
        device: device.device,
        model: device.model,
        cmd: {
            name: 'turn',
            value: setIt
        }
    };

    // Make the fetch request to the Govee API
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Govee-API-Key': apiKey
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log(setIt)
            if (data.message === 'Success') {
                console.log('LED device changed', dev);
                if (dev === "Wall Leds") {
                    if (setIt === 'on') {
                        document.getElementById("lamp").checked = "true"
                    } else {
                        document.getElementById("lamp").checked = ""
                    }
                } else if (dev === "Bed Leds") {
                    if (setIt === 'on') {
                        document.getElementById("router").checked = "true"
                    } else {
                        document.getElementById("router").checked = ""
                    }
                }
            } else {
                console.error('Failed to turn on the LED device:', data);
                if (dev === "Wall Leds") {
                    document.getElementById("lamp").checked = ""
                } else if (dev === "Bed Leds") {
                    document.getElementById("router").checked = ""
                } else {
                    console.log("Unknown Device!")
                }
            }
        })
        .catch(error => {
            console.log('Device:', dev); // Log the value of dev
            if (dev === "Wall Leds") {
                document.getElementById("lamp").checked = '';
            } else if (dev === "Bed Leds") {
                document.getElementById("router").checked = '';
            } else {
                console.log("Unknown Device!");
            }
            console.error('Error:', error);
            if (error.toString().includes("Rate")) {
                alert("You have been rate limited")
            }

        });
}

function getStates1() {
    const url = 'https://developer-api.govee.com/v1/devices/state';
    const apiKey = localStorage.getItem("apiKey");  // Replace with your Govee API key
    const device = {
        device: localStorage.getItem("wallID"),  // Replace with your Govee device ID
        model: 'H6141'  // Replace with your Govee device model
    };
    const requestUrl = `${url}?device=${device.device}&model=${device.model}`;
    // Make the fetch request to the Govee API
    fetch(requestUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Govee-API-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                const properties = data.data.properties;
                const powerState = properties.find(property => property.hasOwnProperty('powerState'));
                if (powerState) {
                    console.log('Power State:', powerState.powerState);
                    if (powerState.powerState === "on") {
                        document.getElementById("lamp").checked = "true"
                    } else {
                        //do nothing everything's set
                    }
                } else {
                    console.log('Power state information not found.');
                }
            } else {
                console.error('Failed to fetch device state:', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.toString().includes("Rate")) {
                alert("You have been rate limited")
            }
        });

}

function getStates2() {
    const url = 'https://developer-api.govee.com/v1/devices/state';
    const apiKey = localStorage.getItem("apiKey");  // Replace with your Govee API key
    const device = {
        device: localStorage.getItem("bedID"),  // Replace with your Govee device ID
        model: 'H6141'  // Replace with your Govee device model
    };
    const requestUrl = `${url}?device=${device.device}&model=${device.model}`;
    // Make the fetch request to the Govee API
    fetch(requestUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Govee-API-Key': apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.code === 200) {
                const properties = data.data.properties;
                const powerState = properties.find(property => property.hasOwnProperty('powerState'));
                if (powerState) {
                    console.log('Power State:', powerState.powerState);
                    if (powerState.powerState === "on") {
                        document.getElementById("router").checked = "true"
                    } else {
                        //do nothing everything's set
                    }
                } else {
                    console.log('Power state information not found.');
                }
            } else {
                console.error('Failed to fetch device state:', data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (error.toString().includes("Rate")) {
                alert("You have been rate limited")
            }
        });

}

function getStates3() {
    const apiUrl = `https://data.evoxs.xyz/house?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&method=isOnline`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === "online") {
                document.getElementById("air").checked = "true"
            }

        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
        });
}

function getStates4(isRestarting) {
    const apiUrl = `https://data.evoxs.xyz/cron`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(data => {
            if (data === "Online!") {

                document.getElementById("reboot").checked = "true"
                document.getElementById("restart").checked = "true"
            }

        })
        .catch(error => {
            if (isRestarting) {
                document.getElementById("reboot").checked = "true"
                document.getElementById("restart").checked = ""
            } else {
                document.getElementById("reboot").checked = ""
                document.getElementById("restart").checked = ""
            }
            console.log('Error fetching datacenter data:', error);
        });
}
const client_id = localStorage.getItem("clientId"); // Replace with your client ID
const redirect_uri = 'https://evoxs.xyz/evox-epsilon-beta/Home/dist/'; // Replace with your redirect URI
const scopes = 'user-read-playback-state user-read-currently-playing';
const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;
const serverBaseUrl = 'https://data.evoxs.xyz'; // Replace with your middleware server URL

/**
 * Redirects the user to Spotify login page
 */
function redirectToSpotifyLogin() {
    if(client_id) {
        window.location.href = authUrl;
    }
    
}

/**
 * Exchanges the authorization code for tokens via the middleware server.
 */
async function exchangeCodeForTokens() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (!code) {
        console.log("No code found in URL. Please log in.");
        return false;
    }

    const response = await fetch(`${serverBaseUrl}/api/auth/callback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, redirect_uri }),
    });

    const data = await response.json();

    if (data.success) {
        console.log("Successfully authenticated with Spotify.");
        // Clear the `code` from URL to keep it clean
        window.history.replaceState({}, document.title, window.location.pathname);
        return true;
    } else {
        console.error("Failed to exchange code for tokens:", data.error);
        return false;
    }
}

/**
 * Fetches the currently playing track using the middleware server.
 */
async function getCurrentlyPlayingTrack() {
    const response = await fetch(`${serverBaseUrl}/api/spotify/currently-playing`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-user-id': 'unique-user-id', // Pass a unique user identifier
        },
    });

    if (response.ok) {
        const data = await response.json();
        if (data.item) {
            document.getElementById("fridge").checked = true;
            document.getElementById("songName").innerText = data.item.name;
            document.getElementById("artists").innerText = data.item.artists.map(artist => artist.name).join(', ');
            console.log('Currently playing track:', data.item.name);
        } else {
            document.getElementById("songName").innerText = 'No track playing.';
            document.getElementById("artists").innerText = 'Not available';
            console.log('No track currently playing.');
        }
    } else {
        const errorData = await response.json();
        console.error('Error fetching currently playing track:', errorData.error || response.status);
    }
}

// Main execution logic
(async function main() {
    const isAuthenticated = await exchangeCodeForTokens();
    if (isAuthenticated) {
        // Start fetching currently playing track
        getCurrentlyPlayingTrack();

        // Set up periodic updates every 30 seconds
        setInterval(getCurrentlyPlayingTrack, 30000);
    } else {

        // Redirect to Spotify login if not authenticated
        redirectToSpotifyLogin();
    }
})();



function goBack() {
    sessionStorage.setItem("extRun", 'back')
}

