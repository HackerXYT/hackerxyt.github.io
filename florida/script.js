const checkPermission = () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!");
    }

    if (!('Notification' in window)) {
        throw new Error("No support for notification API");
    }

    if (!('PushManager' in window)) {
        throw new Error("No support for Push API");
    }
}

const registerSW = async () => {
    let email = localStorage.getItem("email");
    if (!email) return alert('Cannot find email');

    const DBOpenRequest = window.indexedDB.open("DataBase", 5);

    DBOpenRequest.onsuccess = (event) => {
        const db = DBOpenRequest.result;

        let transaction = db.transaction("users", "readwrite");
        let objectStore = transaction.objectStore("users");
        const request = objectStore.getAllKeys();
        request.onsuccess = () => {
            if (request.result.length === 0) {
                objectStore.add({ ssl: email });
            } else if (request.result[0] !== email) {
                objectStore.clear();
                objectStore.add({ ssl: email });
            }
        };
    }

    DBOpenRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore("users", { keyPath: "ssl" });
    }

    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        throw new Error("Notification permission not granted");
    }
}

const main = async () => {
    checkPermission();
    await requestNotificationPermission();
    await registerSW();
}

const logout = async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach(registration => {
        registration.unregister();
    });
}

main().catch(console.error);
