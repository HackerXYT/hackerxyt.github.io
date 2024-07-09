

function floridaStart() {
    console.log("Registering Service Worker")
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.register('/sw.js')
        .then(function(swReg) {
            console.log('Service Worker is registered', swReg);
    
            // Request permission for notifications
            return swReg.pushManager.getSubscription()
            .then(function(subscription) {
                console.log("Subscribing")
                if (!subscription) {
                    return swReg.pushManager.subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: urlBase64ToUint8Array('BA15u7YIY1VPm9ulrTmaG_dTL1tJj59pso6K46lc2i45u-r1bmdl1t6KOrHxMmzyn8ZDQelik0mGn_blW9gAhg4')
                    });
                }
                return subscription;
            });
        })
        .then(function(subscription) {
            console.log('User is subscribed:', subscription);
            document.getElementById("flrStat").innerHTML = "Ready"
            const evoxJson = {
                'subscription': subscription,
                'username': localStorage.getItem("t50-username"),
                'email': localStorage.getItem("t50-email")
            }
            // Send subscription to server
            fetch('https://florida.evoxs.xyz/subscribe', {
                method: 'POST',
                body: JSON.stringify(evoxJson),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        })
        .catch(function(error) {
            console.error('Service Worker Error', error);
        });
    } else {
        console.log("Service Worker Is Not Supported")
    }
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
