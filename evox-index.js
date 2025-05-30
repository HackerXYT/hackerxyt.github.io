const username = localStorage.getItem("t50-username")
const email = localStorage.getItem("t50-email")
const password = localStorage.getItem("t50pswd")

if (username && email && password) {
    fetch(`https://data.evoxs.xyz/accounts?email=${email}&password=${atob(password)}&autologin=true&ip=null`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data.includes("Credentials Correct")) {
                //200
                document.getElementById("head1").style.display = 'none'
                document.getElementById("head2").style.display = null
                fetch(`https://data.evoxs.xyz/accounts?method=getFirstName&username=${username}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(name => {
                        if (name !== 'Unknown') {
                            document.getElementById("name").innerText = name
                        } else {
                            document.getElementById("name").innerText = username
                        }
                        document.getElementById("me").src = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${username}`;
                    }).catch(error => {
                        console.error('Server Connection Failed!', error)
                    })
                document.getElementById("headerText").innerText = `Welcome back, ${username}!`
            } else if (data.includes("IP Not Verified")) {
                //IP Unk
                document.getElementById("head1").style.display = 'none'
                document.getElementById("head2").style.display = null
                fetch(`https://data.evoxs.xyz/accounts?method=getFirstName&username=${username}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(name => {
                        if (name !== 'Unknown') {
                            document.getElementById("name").innerText = name
                        } else {
                            document.getElementById("name").innerText = username
                        }
                        document.getElementById("me").src = `https://data.evoxs.xyz/profiles?authorize=imagePfp&name=${username}`;
                    }).catch(error => {
                        console.error('Server Connection Failed!', error)
                    })
                document.getElementById("headerText").innerText = `Welcome back, ${username}!`
            } else {
                //Incorrect
            }
        }).catch(error => {
            console.error('Server Connection Failed!', error)
        })
}


let isSecure = null
const localSrv = 'http://192.168.1.126:4000'

function localAvailable() {
    const localE = document.getElementById("infoTxt")
    const srvStat = localStorage.getItem("currentSrv")
    if (srvStat) {
        if (srvStat.includes(localSrv)) {
            localE.innerHTML = `Your connection is not secure!<br>You are connected to local servers.`
            document.getElementById("child1").innerText = 'Revert'
            return;
        }
    }
    localE.innerHTML = `Your connection is not secure!<br>Local connections are available.`
}
if (window.location.href.includes("https")) {
    isSecure = true
} else {
    isSecure = false
    fetch(`${localSrv}/cron`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data === 'Online!') {
                localAvailable()

            }
            document.getElementById("warning").classList.add("active")

        }).catch(error => {
            console.error('Server Connection Failed!')
            redirect()
        })
}

function redirect(e) {
    if (e) {
        e.innerText = 'Connecting..'
        setTimeout(function () {
            let result = window.location.href.replace(/http/g, "https");
            window.location.href = result
            e.innerText = 'Redirect'
        }, 500)
    } else {
        let result = window.location.href.replace(/http/g, "https");
        window.location.href = result
    }


}

function dismiss(e) {
    e.style.transform = 'rotate(180deg)'
    setTimeout(function () {
        document.getElementById("warning").classList.remove("active")
    }, 100)
    setTimeout(function () {

        e.style.transform = ''
    }, 350)

}

function switchSrv(e) {
    e.innerText = 'Switching..'
    const srvStat = localStorage.getItem("currentSrv")
    if (srvStat) {
        if (srvStat.includes(localSrv)) {
            document.getElementById("child2").style.opacity = "0.5"
            document.getElementById("child2").style.pointerEvents = "none"
            localStorage.setItem("currentSrv", 'https://data.evoxs.xyz')
            setTimeout(function () {
                e.innerText = 'Success'
                document.getElementById("child2").style.opacity = null
                document.getElementById("child2").style.pointerEvents = null
                localAvailable()
                setTimeout(function () {
                    e.innerText = 'Switch'
                }, 1500)
            }, 750)
            return;
        }
    }
    document.getElementById("child2").style.opacity = "0.5"
    document.getElementById("child2").style.pointerEvents = "none"
    localStorage.setItem("currentSrv", localSrv)
    setTimeout(function () {
        e.innerText = 'Success'
        document.getElementById("child2").style.opacity = null
        document.getElementById("child2").style.pointerEvents = null
        localAvailable()
        setTimeout(function () {
            e.innerText = 'Revert'
        }, 1500)

    }, 750)
}

function isPWA() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

if (isPWA()) {
    console.log("This page is a PWA.");
} else {
    console.log("This page is not a PWA.");
}