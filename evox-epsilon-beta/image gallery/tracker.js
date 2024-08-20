let startTime = performance.now();
let totalTimeSpent = 0;
let lastTimeVisible = startTime;

function updateVisibilityState() {
    if (document.visibilityState === 'visible') {
        // Page becomes visible
        lastTimeVisible = performance.now();
    } else {
        // Page becomes hidden
        const currentTime = performance.now();
        totalTimeSpent += currentTime - lastTimeVisible;
    }
}

function logTimeSpent() {
    // Calculate the time spent when the user leaves the page
    if (document.visibilityState === 'visible') {
        totalTimeSpent += performance.now() - lastTimeVisible;
    }
    console.log(`Total time spent on the page: ${Number(localStorage.getItem("app-Images-track")) + Math.floor(totalTimeSpent / 1000)} seconds`);
    localStorage.setItem("app-Evox-track", `${Number(localStorage.getItem("app-Images-track")) + Math.floor(totalTimeSpent / 1000)}`)
}

// Track visibility changes
document.addEventListener('visibilitychange', updateVisibilityState);

// Log time spent when the page is unloaded
window.addEventListener('beforeunload', logTimeSpent);

// Optionally, log time spent periodically (for example, every 30 seconds)
setInterval(() => {
    if (document.visibilityState === 'visible') {
        totalTimeSpent += performance.now() - lastTimeVisible;
        lastTimeVisible = performance.now();
        //console.log(`Time spent so far: ${Number(localStorage.getItem("app-Evox-track")) + Math.floor(totalTimeSpent / 1000)} seconds`);
        //localStorage.setItem("app-Evox-track", `${Number(localStorage.getItem("app-Evox-track")) + Math.floor(totalTimeSpent / 1000)}`)
    }
}, 1000);
