//Not yet implemented
//Should connect to server auto function (auto update from dev pc when running in debug)
const y = "running"
const n = "off"

debug = n
ip = ""

if (debug === y) {
    setTimeout(function () {
        if(sessionStorage.getItem(debug) !== "on") {
            document.getElementById("t50_updating").style.display = "block"
        }
    }, 1500)
}

function change_client() {
    pingIPs();
}

function checkServer(ip, port, callback) {
    $.ajax({
        url: 'http://' + ip + ':' + port,
        type: 'HEAD',
        timeout: 1000, // Set a timeout for the request (1 second in this example)
        success: function () {
            // Server is reachable
            callback(true);
        },
        error: function () {
            // Server is not reachable
            callback(false);
        }
    });
}

// Function to iterate through the IPs and perform the check
function pingIPs() {
    for (let i = 2; i <= 22; i++) {
        let ip = '192.168.1.' + i;
        let port = 8080;

        checkServer(ip, port, function (isReachable) {
            if (!isReachable) {
                // Redirect to the IP that is not reachable
                $("#t50_updating").fadeOut("slow")
                window.location.href = 'http://' + ip + ':' + port;
            }
        });
    }
}

function checkpingIPs() {
    for (let i = 2; i <= 22; i++) {
        let ip = '192.168.1.' + i;
        let port = 8080;

        checkServer(ip, port, function (isReachable) {
            if (!isReachable) {
                if(window.location.href.includes('http://' + ip + ':' + port)) {
                    console.log("Currently Connected To Debug Server")
                    sessionStorage.setItem("debug", "on")
                    document.getElementById("t50_updating").style.display = "none"
                } else {
                    //Not yet implemented
                }
            }
        });
    }
}

setTimeout(function () {
    console.log("Would Normally Ping Local IP's. Function Is Disabled")
    //checkpingIPs()
}, 1500)
