if (!localStorage.getItem("t50-username")) {

    function getEmailAndPassword() {
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
        alert(`Connecting to Evox..`);
        localStorage.setItem("t50-email", email)
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        localStorage.setItem("t50-username", username)
        window.location.reload()
    }

    getEmailAndPassword()
} else {
    fetch(`https://data.evoxs.xyz/accounts?email=${localStorage.getItem("t50-email")}&username=${localStorage.getItem("t50-username")}&password=${atob(localStorage.getItem("t50pswd"))}&ip=2&autologin=true`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
    })
        .then(response => response.text())
        .then(data => {
            //console.log(data)
            if (data.includes('Credentials Correct')) {
                console.log("ALLoK")
            } else {
                localStorage.removeItem("t50pswd")
                window.location.reload()
            }


        }).catch(error => {
            // Handle errors
            alert(error)
            console.error('Error:', error);
        });
}

function getOS() {
    const userAgent = navigator.userAgent;
    let operatingSystem = 'Unknown';

    if (userAgent.includes('Windows NT')) {
        operatingSystem = 'Windows';
    } else if (userAgent.includes('Mac OS')) {
        operatingSystem = 'macOS';
    } else if (userAgent.includes('Linux')) {
        operatingSystem = 'Linux';
    } else if (userAgent.includes('Android')) {
        operatingSystem = 'Android';
    } else if (userAgent.includes('iOS')) {
        operatingSystem = 'iOS';
    }

    return operatingSystem;
}

function getOSVersion() {
    const userAgent = navigator.userAgent;
    let osVersion = 'Unknown';

    if (userAgent.includes('Windows NT')) {
        osVersion = userAgent.split('Windows NT ')[1].split(';')[0];
    } else if (userAgent.includes('Mac OS')) {
        osVersion = userAgent.split('Mac OS ')[1].split(')')[0];
    } else if (userAgent.includes('Linux')) {
        osVersion = 'Linux'; // Linux doesn't typically have a version string in userAgent
    } else if (userAgent.includes('Android')) {
        osVersion = userAgent.split('Android ')[1].split(';')[0];
    } else if (userAgent.includes('iPhone OS')) {
        osVersion = userAgent.split('iPhone OS ')[1].split(' ')[0].replace(/_/g, '.');
    } else if (userAgent.includes('iPad OS')) {
        osVersion = userAgent.split('iPad OS ')[1].split(' ')[0].replace(/_/g, '.');
    }

    return osVersion;
}

// Example usage:
const os = getOS();
const osVersion = getOSVersion();

console.log('Operating System:', os);
console.log('Operating System Version:', osVersion);

if (localStorage.getItem("extV")) {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/sw.js')
            .then(function (swReg) {
                console.log('Service Worker is registered', swReg);

                // Request permission for notifications
                return swReg.pushManager.getSubscription()
                    .then(function (subscription) {
                        if (!subscription) {
                            return swReg.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array('BA15u7YIY1VPm9ulrTmaG_dTL1tJj59pso6K46lc2i45u-r1bmdl1t6KOrHxMmzyn8ZDQelik0mGn_blW9gAhg4')
                            });
                        }
                        return subscription;
                    });
            })
            .then(function (subscription) {
                console.log('User is subscribed:', subscription);
                document.getElementById("notsubbed").style.display = "none"
                document.getElementById("buttons").style.display = "none"
                document.getElementById("subbed").style.display = ""
                document.getElementById("spanUsername").innerHTML = localStorage.getItem("t50-username")
                document.getElementById("deviceId").innerHTML = localStorage.getItem("extV")
            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
    }
}


function start() {
    console.log("Working")
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/sw.js')
            .then(function (swReg) {
                console.log('Service Worker is registered', swReg);

                // Request permission for notifications
                return swReg.pushManager.getSubscription()
                    .then(function (subscription) {
                        if (!subscription) {
                            return swReg.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: urlBase64ToUint8Array('BA15u7YIY1VPm9ulrTmaG_dTL1tJj59pso6K46lc2i45u-r1bmdl1t6KOrHxMmzyn8ZDQelik0mGn_blW9gAhg4')
                            });
                        }
                        return subscription;
                    });
            })
            .then(function (subscription) {
                console.log('User is subscribed:', subscription);

                if (!localStorage.getItem("extV")) {
                    const url = `https://data.evoxs.xyz/floridaV?getWhat=anId&forUser=${localStorage.getItem("t50-username")}&os1=${os}&osVersion=${osVersion}`;
                    fetch(url)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                        .then(data => {
                            localStorage.setItem("extV", data)
                            console.log('Fetched data:', data);
                            const evoxJson = {
                                'subscription': subscription,
                                'username': localStorage.getItem("t50-username"),
                                'email': localStorage.getItem("t50-email"),
                                'id': data
                            }
                            document.getElementById("notsubbed").style.display = "none"
                            document.getElementById("buttons").style.display = "none"
                            document.getElementById("subbed").style.display = ""
                            document.getElementById("spanUsername").innerHTML = localStorage.getItem("t50-username")
                            document.getElementById("deviceId").innerHTML = data
                            // Send subscription to server
                            fetch('https://florida.evoxs.xyz/subscribe', {
                                method: 'POST',
                                body: JSON.stringify(evoxJson),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                        })
                        .catch(error => {
                            console.error('Fetch error:', error);
                        });
                } else {
                    console.log("Id exists", localStorage.getItem("extV"));
                }

            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
    }
}

function unsubscribeUser() {
    navigator.serviceWorker.ready.then(function (registration) {
        // Get the existing subscription
        registration.pushManager.getSubscription().then(function (subscription) {
            if (subscription) {
                // Unsubscribe the user
                subscription.unsubscribe().then(function (successful) {
                    console.log('Unsubscription successful:', successful);
                    // Send a request to your server to remove the subscription
                    const evoxJson = {
                        'subscription': { subscription },
                        'username': localStorage.getItem("t50-username"),
                        'email': localStorage.getItem("t50-email"),
                        'id': localStorage.getItem("extV")
                    }
                    fetch('https://florida.evoxs.xyz/unsubscribe', {
                        method: 'POST',
                        body: JSON.stringify(evoxJson),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(function (response) {
                        if (response.ok) {
                            console.log('Subscription removed from server.');
                            document.getElementById("notsubbed").style.display = ""
                            document.getElementById("buttons").style.display = ""
                            document.getElementById("subbed").style.display = "none"
                            localStorage.removeItem("extV")
                        } else {
                            console.error('Failed to remove subscription from server.');
                        }
                    }).catch(function (error) {
                        console.error('Error sending unsubscribe request to server:', error);
                    });
                }).catch(function (error) {
                    console.error('Failed to unsubscribe the user:', error);
                });
            } else {
                console.error('No subscription found.');
            }
        }).catch(function (error) {
            console.error('Error retrieving subscription:', error);
        });
    }).catch(function (error) {
        console.error('Service worker registration error:', error);
    });
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

function openSetup() {
    document.getElementById("recentsTab").classList.remove("active")
    document.getElementById("setupTab").classList.add("active")
    document.getElementById("intro").style.display = ""
    document.getElementById("recents").style.display = "none"
}

function openRecents() {
    document.getElementById("recentsTab").classList.add("active")
    document.getElementById("setupTab").classList.remove("active")
    document.getElementById("intro").style.display = "none"
    document.getElementById("buttons").style.display = "none"
    document.getElementById("recents").style.display = ""
    fetch('https://florida.evoxs.xyz/recents', {
        method: 'POST',
        body: JSON.stringify({
            'deviceId': localStorage.getItem("extV"),
            'username': localStorage.getItem("t50-username")
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is JSON
    }).then(function (data) {
        // Assuming 'value' is a key in the response JSON
        if(!data) {
            return;
        }
        const final = JSON.parse(data.value)
        console.log(final)
        console.log(final.username)
        document.getElementById('recents').innerHTML = ""
        final.notifications.forEach(notif => {
            console.log(notif)
            const payload = JSON.parse(notif.payload)
            let theNoti = document.getElementById('recents');

            // Create a new div element
            let newDiv = document.createElement('div');
            newDiv.className = 'notification';

            // Create h4 and p elements
            let h4 = document.createElement('h4');
            h4.textContent = payload.title;

            let p = document.createElement('p');
            p.textContent = payload.body;

            // Append h4 and p to the new div
            newDiv.appendChild(h4);
            newDiv.appendChild(p);

            // Append the new div to the element with id "theNoti"
            theNoti.appendChild(newDiv);
        });
        // Now you can use 'value' as needed

        // Send JSON response with 'value' and status 200
    }).catch(function (error) {
        console.error('Error reading recents:', error);
    });
}

function goBack() {
    sessionStorage.setItem("exitFl", true)
}