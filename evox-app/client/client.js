
const publicVapidKey = "BLZ54ubDwvVJ07Kw6CsC-ovaSYtaH2XtL478aohUhBZ9KxqC5p6yVRXGNdelHO6YJFpGQdkvdzmgJ7zR6IwxY40";

if('serviceWorker' in navigator) {
    registerServiceWorker().catch(console.log)
}

async function registerServiceWorker() {
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/client/'
    });

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
    });

    await fetch("https://webpush.memeguy21.repl.co/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
            "Content-Type": "application/json",
        }
    })
}