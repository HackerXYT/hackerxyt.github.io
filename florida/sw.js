const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

const saveSubscription = async (subscription, email) => {
    const response = await fetch("https://data.evoxs.xyz", {
        method: 'post',
        headers: { 'Content-type': "application/json" },
        body: JSON.stringify({
            sub: subscription,
            em: email
        })
    })
    return response.json()
}

self.addEventListener("activate", async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("BOJrYB21uZozXIKOSHpNWx55nzJvpX8RsJEnWKuxr72V3qQxIGBBZgSjwpLGY7IMj663CwOEloRseo5bd7Da8BQ")
    })
    let open = indexedDB.open("DataBase", 1)
    open.onsuccess = async function (event) {
        let db = open.result
        let transaction = db.transaction("users", "readwrite");
        let objectStore = transaction.objectStore("users");
        let keys = objectStore.getAllKeys()

        keys.onsuccess = async () => {
            let em = keys.result[0];
            const response = await saveSubscription(subscription, em)
            console.log(response)
        }
    }
})

self.addEventListener("push", e => {
    let name = "Wohoo!!";
    let options = {
        body: e.data.text(),
        silent: true
    };
    self.registration.showNotification(name, options);
})

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow("https://evoxs.xyz/")
    );
})

