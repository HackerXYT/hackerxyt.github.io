const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
const subsj = {}

const email4 = "email@gmail.com"

fetch("https://data.evoxs.xyz/save-subscription", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // You may need to include other headers as needed
    },
    body: JSON.stringify({
        subscription: subsj,
        email: email4
    })
})
.then(response => {
    // Handle response here
})
.catch(error => {
    console.error('Error:', error);
});

const saveSubscription = async (subscription, email) => {
    console.log("Subscription: ", subscription);
    console.log("Email: ", email);
    
    const response = await fetch("https://data.evoxs.xyz/save-subscription", {
        mode: 'no-cors',
        method: 'POST',
        headers: { 'Content-Type': "application/json" },
        body: JSON.stringify({
            sub: subscription,
            em: email
        })
    });
    return response.text();
}

self.addEventListener("activate", (event) => {
    event.waitUntil(register());
});

async function register() {
    try {
        const subscription = await self.registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BOJrYB21uZozXIKOSHpNWx55nzJvpX8RsJEnWKuxr72V3qQxIGBBZgSjwpLGY7IMj663CwOEloRseo5bd7Da8BQ")
        });

        const openRequest = indexedDB.open("DataBase", 6);
        openRequest.onsuccess = async (event) => {
            const db = openRequest.result;
            const transaction = db.transaction("users", "readwrite");
            const objectStore = transaction.objectStore("users");
            const keysRequest = objectStore.getAllKeys();

            keysRequest.onsuccess = async () => {
                const email = keysRequest.result[0];
                if (email) {
                    console.log("Email from DB: ", email);
                    const response = await saveSubscription(subscription, email);
                    console.log(response);
                } else {
                    console.error("No email found in IndexedDB");
                }
            };

            keysRequest.onerror = () => {
                console.error("Failed to retrieve keys from IndexedDB");
            };
        }

        openRequest.onerror = () => {
            console.error("Failed to open IndexedDB");
        }
    } catch (error) {
        console.error("Failed to register push subscription", error);
    }
}

self.addEventListener("push", (event) => {
    const options = {
        body: event.data.text(),
        silent: true
    };
    self.registration.showNotification("Wohoo!!", options);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow("https://evoxs.xyz/"));
});
