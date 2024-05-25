const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!")
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API")
    }
}

const registerSW = async () => {
    let email = localStorage.getItem("email");
    if (!email) return (window.location.reload());

    const DBOpenRequest = window.indexedDB.open("DataBase", 1);

    DBOpenRequest.onsuccess = async (event) => {
        const db = DBOpenRequest.result

        let transaction = db.transaction("users", "readwrite");
        let objectStore = transaction.objectStore("users");
        const bla = objectStore.getAllKeys()
        bla.onsuccess = () => {
            if (bla.result.length === 0) {
                console.log(bla.result)
                objectStore.add({
                    ssl: email
                });
            } else if (bla.result[0] !== email) {
                objectStore.clear()
                objectStore.add({
                    ssl: email
                });
            }
        }
    }
    DBOpenRequest.onupgradeneeded = (event) => {
        const db = event.target.result
        db.createObjectStore("users", {
            keyPath: "ssl",
        });
    }
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted")
    }

}

const main = async () => {
    checkPermission()
    await requestNotificationPermission()
    await registerSW()
}

const logout = async () => {
    await navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
            registrations.forEach((registration) => {
                registration.unregister();
            });
        })
}