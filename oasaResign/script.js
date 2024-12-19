
sessionStorage.setItem("currentBuild", currentBuild)
let currentBus;
let fullLine = null
let activeBusPage = null;
let activeBusNamePage = null

let activeStop = {
    "name": null,
    "code": null
}
fetch(`../oasaBuild.evox`)
    .then(response => response.json())
    .then(data => {
        if (data.buildNumber > currentBuild) {
            $("#updateAvailable").fadeIn("fast")
        }

    })
    .catch(error => {
        console.error("Failed to check for updates")
    })

function doodle() {
    if (navigator.onLine) {
        const prev = localStorage.getItem('previousRan')
        const ran = Math.floor(Math.random() * 13) + 1
        if (prev === ran) {
            const ran2 = Math.floor(Math.random() * 13) + 1
            document.getElementById("logo").src = `./illu/${ran2}.png`
            localStorage.setItem("previousRan", ran2)
        } else {
            document.getElementById("logo").src = `./illu/${ran}.png`
            localStorage.setItem("previousRan", ran)
        }
    }
}

if (!localStorage.getItem("disableDoodle")) {

    doodle()
} else {
    document.getElementById("doodleStat").innerText = 'Ανενεργό'
}

function setThemeColors(hex) {
    // Remove existing theme-color meta tags
    document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.remove());

    // Create and append meta tag for light theme
    const lightMeta = document.createElement('meta');
    lightMeta.name = 'theme-color';
    lightMeta.content = hex; // Adjust for light theme
    lightMeta.media = '(prefers-color-scheme: light)';
    document.head.appendChild(lightMeta);

    // Create and append meta tag for dark theme
    const darkMeta = document.createElement('meta');
    darkMeta.name = 'theme-color';
    darkMeta.content = hex; // Adjust for dark theme
    darkMeta.media = '(prefers-color-scheme: dark)';
    document.head.appendChild(darkMeta);
}

function toggleDoodle() {
    const lcl = localStorage.getItem("disableDoodle")
    if (lcl) { //disabled, enable it
        localStorage.removeItem("disableDoodle")
        doodle()
        console.log("disabled, enabling doodle")
        document.getElementById("doodleStat").innerText = 'Ενεργό'
    } else { //enabled

        localStorage.setItem("disableDoodle", 'yes')
        document.getElementById("logo").src = 'doodle.png'
        console.log("enabled. disabling doodle")
        document.getElementById("doodleStat").innerText = 'Ανενεργό'
    }
}
if (sessionStorage.getItem("pfp") && sessionStorage.getItem("pfp").includes('<!DOCTYPE html>')) {
    console.log(`PFP: DOCTYPE 404`)
    sessionStorage.removeItem("pfp")
}
if (sessionStorage.getItem("updateSuccess")) {
    //document.getElementById("updatemanual").innerHTML = `<span style="color: green">updated!</span>`
    //sessionStorage.removeItem("updateSuccess")
    //setTimeout(function () {
    //    document.getElementById("updatemanual").innerHTML = `update`
    //}, 1500)

}

let srv = localStorage.getItem("currentSrv") || 'https://data.evoxs.xyz'
const timetableDiv = document.getElementById('timetable');

var offlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 16 16">
                                <path d="m 13 1 c -0.554688 0 -1 0.445312 -1 1 v 7.269531 c 0.148438 0.089844 0.289062 0.191407 0.414062 0.316407 l 0.414063 0.414062 h 0.34375 l 0.414063 -0.414062 c 0.375 -0.375 0.882812 -0.585938 1.414062 -0.585938 v -7 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 9 c 0 0.554688 0.445312 1 1 1 h 0.007812 c 0 -0.515625 0.191407 -1.027344 0.578126 -1.414062 l 0.414062 -0.414063 v -0.34375 l -0.414062 -0.414063 c -0.773438 -0.773437 -0.773438 -2.054687 0 -2.828124 c 0.375 -0.375 0.882812 -0.585938 1.414062 -0.585938 v -4 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 6 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -6 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 3 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -3 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" fill="#fff" />
                                <path d="m 11 10 c -0.265625 0 -0.519531 0.105469 -0.707031 0.292969 c -0.390625 0.390625 -0.390625 1.023437 0 1.414062 l 1.292969 1.292969 l -1.292969 1.292969 c -0.390625 0.390625 -0.390625 1.023437 0 1.414062 s 1.023437 0.390625 1.414062 0 l 1.292969 -1.292969 l 1.292969 1.292969 c 0.390625 0.390625 1.023437 0.390625 1.414062 0 s 0.390625 -1.023437 0 -1.414062 l -1.292969 -1.292969 l 1.292969 -1.292969 c 0.390625 -0.390625 0.390625 -1.023437 0 -1.414062 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 s -0.519531 0.105469 -0.707031 0.292969 l -1.292969 1.292969 l -1.292969 -1.292969 c -0.1875 -0.1875 -0.441406 -0.292969 -0.707031 -0.292969 z m 0 0" fill="#f00" />
                            </svg>`
var onlineSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="15px" height="15px" viewBox="0 0 16 16">
                                <path d="m 13 1 c -0.554688 0 -1 0.445312 -1 1 v 12 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -12 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 9 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -9 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 6 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -6 c 0 -0.554688 -0.445312 -1 -1 -1 z m -4 3 c -0.554688 0 -1 0.445312 -1 1 v 3 c 0 0.554688 0.445312 1 1 1 h 1 c 0.554688 0 1 -0.445312 1 -1 v -3 c 0 -0.554688 -0.445312 -1 -1 -1 z m 0 0" fill="#fff" />
                            </svg>`

const dictionary = {
    "16": "1076",
    "831": "874",
    "828": "1400",
    "049": "819",
    "904": "1015",
    "420": "1164"
}

let count1;
let count2;

//return;
//console.log("Not Stopped")


// Disable scroll on touch devices
function preventDefault(e) {
    e.preventDefault();
}

// Disable scroll
function disableScroll() {
    window.addEventListener('scroll', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
}

// Enable scroll
function enableScroll() {
    window.removeEventListener('scroll', preventDefault, { passive: false });
    window.removeEventListener('touchmove', preventDefault, { passive: false });
}

// Function to format time
function formatTime2(dateString) {
    // Create a new Date object from the dateString
    var date = new Date(dateString);

    // Extract hours and minutes
    var hours = date.getHours();
    var minutes = date.getMinutes();

    // Format hours and minutes to always be two digits
    if (hours < 10) {
        hours = '0' + hours;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    // Combine hours and minutes into a formatted string
    return hours + ':' + minutes;
}

function errorIconTime() {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 23 || currentHour < 6) {
        return 'zzz.png';
    } else {
        return 'snap.png';
    }
}

function getBus(num) {
    console.log("Get Bus NUM", num)
    const dict = JSON.stringify(dictionary)
    if (dict.includes(num)) {
        const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${dictionary[`${num}`]}&keyOrigin=evoxEpsilon`);
        if (localStorage.getItem(`${num}_Timetable`)) {
            var rawData = localStorage.getItem(num + '_Timetable');

            if (rawData) {
                var data = JSON.parse(rawData);

                if (data && data.go) {
                    var times = [];

                    for (var i = 0; i < data.go.length; i++) {
                        var item = data.go[i];
                        //console.log("sde_start1:", item.sde_start1); // Debug log
                        times.push(formatTime(item.sde_start1));
                    }

                    //console.log("Formatted times:", times); // Debug log

                    const nextBusTime = getNextBusTime(times);

                    if (nextBusTime) {
                        localStorage.setItem(`${num}_Times`, JSON.stringify(times))
                        displayRemainingTimeLC(nextBusTime);
                    } else {
                        console.log("nextBusTime Unavailable For", num)
                        document.getElementById(`remain${num}`).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`
                        console.log("<span style='color: yellow'>nextBusTime possible upcoming crash. check if GR time is 11:50PM-12:05AM!</span>")
                        const theLcBackup = JSON.parse(localStorage.getItem(`${num}_Timetable`))
                        var timesLC = theLcBackup.go.map(item => {
                            //console.log("sde_start1:", item.sde_start1); // Debug log
                            return formatTime(item.sde_start1);
                        });
                        const nextBusTime = getNextBusTime(timesLC);
                        displayRemainingTimeLC(nextBusTime, 'noLoadIndicator')
                    }
                    console.log(`Preloaded ${num} from storage`)
                    //console.log(times);
                }
            } else {
                console.error('Error getting localstorage data')
            }

        } else {
            console.error('Error getting localstorage data')
        }

        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
            .then(response => response.json())
            .then(data => {
                console.log("The data:", data)
                if (!data.come && !data.go) {
                    console.log(data)
                    return;
                } else {
                    console.log("Come and go for ", num, "\n", data)
                }
                document.getElementById("netStats").innerHTML = onlineSvg
                console.log("Success", dictionary[`${num}`], '||', num)

                var times = data.go.map(item => {
                    //console.log("sde_start1:", item.sde_start1); // Debug log
                    return formatTime(item.sde_start1);
                });

                //console.log("Formatted times:", times); // Debug log

                const nextBusTime = getNextBusTime(times);

                if (nextBusTime) {
                    localStorage.setItem(`${num}_Timetable`, JSON.stringify(data));
                    localStorage.setItem(`${num}_Times`, JSON.stringify(times));
                    displayRemainingTime(nextBusTime);
                } else {
                    //displayRemainingTimeLC('00:21');
                    console.log("nextBusTime Unavailable For", num)
                    document.getElementById(`remain${num}`).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`
                    console.log("<span style='color: yellow'>nextBusTime possible upcoming crash. check if GR time is 11:50PM-12:05AM!</span>")

                    const theLcBackup = JSON.parse(localStorage.getItem(`${num}_Timetable`))
                    var timesLC = theLcBackup.go.map(item => {
                        //console.log("sde_start1:", item.sde_start1); // Debug log
                        return formatTime(item.sde_start1);
                    });
                    const nextBusTime = getNextBusTime(timesLC);
                    displayRemainingTimeLC(nextBusTime, 'noLoadIndicator')
                }
            })
            .catch(error => {
                document.getElementById("netStats").innerHTML = offlineSvg
                if (localStorage.getItem(`${num}_Timetable`)) {
                    const data = JSON.parse(localStorage.getItem(`${num}_Timetable`));
                    var times = data.go.map(item => {
                        //console.log("sde_start1:", item.sde_start1); // Debug log
                        return formatTime(item.sde_start1);
                    });

                    //console.log("Formatted times:", times); // Debug log

                    const nextBusTime = getNextBusTime(times);

                    if (nextBusTime) {
                        console.log(`Next bus time available for ${num}, JSON:\n${nextBusTime}`)
                        localStorage.setItem(`${num}_Times`, JSON.stringify(times));
                        displayRemainingTime(nextBusTime);
                    } else {
                        //displayRemainingTimeLC('00:21');
                        console.log("nextBusTime Unavailable For", num)
                        document.getElementById(`remain${num}`).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`
                        const theLcBackup = JSON.parse(localStorage.getItem(`${num}_Timetable`))
                        var timesLC = theLcBackup.go.map(item => {
                            //console.log("sde_start1:", item.sde_start1); // Debug log
                            return formatTime(item.sde_start1);
                        });
                        const nextBusTime = getNextBusTime(timesLC);
                        displayRemainingTimeLC(nextBusTime, 'noLoadIndicator')
                    }
                    console.log('Loaded from storage');
                } else {
                    console.error('Error fetching data:', error);
                }
            });

        function formatTime(dateTimeString) {
            if (!dateTimeString) {
                console.error("Invalid dateTimeString:", dateTimeString);
                return "Invalid";
            }

            const parts = dateTimeString.split(' ');
            if (parts.length !== 2) {
                console.error("Invalid dateTimeString format:", dateTimeString);
                return "Invalid";
            }

            const timePart = parts[1]; // "HH:MM:SS"
            const timeParts = timePart.split(':');
            if (timeParts.length !== 3) {
                console.error("Invalid time format:", timePart);
                return "Invalid";
            }

            const hours = timeParts[0];
            const minutes = timeParts[1];

            if (hours.length !== 2 || minutes.length !== 2) {
                console.error("Invalid time components:", hours, minutes);
                return "Invalid";
            }

            return `${hours}:${minutes}`;
        }

        function displayTimes(times) {
            let htmlContent = '';
            let count = 0;

            times.forEach(time => {
                if (count > 0 && count % 4 === 0) {
                    htmlContent += '<br>';
                }
                htmlContent += `${time}&emsp;`;
                count++;
            });

            timetableDiv.innerHTML = htmlContent;
        }

        function getNextBusTime(times) {
            //console.log("getting times", times);
            const currentTime = new Date();
            const currentHour = currentTime.getHours();
            const currentMinutes = currentTime.getMinutes();

            for (let time of times) {
                const [hour, minutes] = time.split(':').map(Number);
                if (hour > currentHour || (hour === currentHour && minutes > currentMinutes)) {
                    return { hour, minutes };
                }
            }
            return null;
        }

        function displayRemainingTime(nextBusTime) {
            console.log("Running", JSON.stringify(nextBusTime), "for", num);
            const currentTime = new Date();
            const nextBusDate = new Date();
            nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

            const remainingTimeMs = nextBusDate - currentTime;
            const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
            const remainingHours = Math.floor(remainingMinutes / 60);
            const displayMinutes = remainingMinutes % 60;

            const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
            document.getElementById(`remain${num}`).innerText = `Επόμενο: ${remainingTimeText}`;
        }

        function displayRemainingTimeLC(nextBusTime, noLoadIndicator) {
            if (!nextBusTime || typeof nextBusTime.hour !== 'number' || typeof nextBusTime.minutes !== 'number') {
                console.error('Invalid nextBusTime:', nextBusTime);
                return;
            }

            console.log("Running", JSON.stringify(nextBusTime), "for", num, 'on displayRemainingTimeLC');

            const currentTime = new Date();
            const nextBusDate = new Date();
            nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

            const remainingTimeMs = nextBusDate - currentTime;
            const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
            const remainingHours = Math.floor(remainingMinutes / 60);
            const displayMinutes = remainingMinutes % 60;

            const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
            if (noLoadIndicator) {
                document.getElementById(`remain${num}`).innerHTML = `Επόμενο: ${remainingTimeText}`;
            } else {
                document.getElementById(`remain${num}`).innerHTML = `Επόμενο: ${remainingTimeText}
              <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
              <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
              <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.3s"
                  repeatCount="indefinite"/>
                </path>
              </svg>
            `;
            }
        }

    } else {
        console.warn(`${num} not inside ${dictionary}, \n ${dict.includes(num)}`);
    }
}

getBus('16')
getBus('831')
getBus('828')
getBus('049')
getBus('904')
getBus('420')

let howManyShowed = null
let isCustom = false
function loadMore() {
    if (isCustom === true) {
        const theBus = currentBus
        const show = howManyShowed + 5
        showInfoCSTM(theBus, null, show)

    } else {
        const theBus = currentBus
        const show = howManyShowed + 5
        showInfo(theBus, null, show)
        const div = document.getElementById("popIt");
        div.scrollTop = div.scrollHeight;
    }


}

let currentInt;
function showInfo(bus, isInt, more) {
    currentBus = bus
    howManyShowed = more ?? 7
    document.getElementById("904live1").style.display = 'none'
    disableOverflow()
    document.getElementById("phone").classList.add('out')
    document.getElementById("main-wrapper").style.overflow = 'hidden'
    if (!document.getElementById("popIt").classList.contains("active") && isInt) {
        console.log(`Resolved Interval Bug [info: busReq: ${bus}, stoppedBy: classList]`)
        return;
    }
    if (sessionStorage.getItem("currentWatch") !== bus && isInt) {
        console.log(`Resolved Interval Bug [info: busReq: ${bus}, stoppedBy: currentWatch]`)
        return;
    }
    document.getElementById("popIt").classList.add("active")
    document.getElementById("whatBus").innerHTML = bus
    document.getElementById("16defTime").style.display = "none"
    document.getElementById("16gounTime").style.display = "none"
    document.getElementById("049live1").style.display = "none"
    document.getElementById("049live2").style.display = "none"
    document.getElementById("831live1").style.display = "none"
    sessionStorage.setItem("currentWatch", bus)
    const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400254&keyOrigin=evoxEpsilon`);
    const targetUrlKeranhs = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400110&keyOrigin=evoxEpsilon`);
    const targetUrlDhm = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400506&keyOrigin=evoxEpsilon`);
    const targetUrlKor = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400004&keyOrigin=evoxEpsilon`);
    const targetUrlGoun = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400452&keyOrigin=evoxEpsilon`);
    const targetUrlEthn831 = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400451&keyOrigin=evoxEpsilon`);

    document.getElementById("evoxBased").innerHTML = ""
    if (bus === "16") {
        document.getElementById("based").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        document.getElementById("basedGoun").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        document.getElementById("16defTime").style.display = ""
        document.getElementById("16gounTime").style.display = ""
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        console.log("Preworked [remains]:", bus, times)
        const remains = getNextBusesPanagitsa(times, more)
        console.log("Bus Remains:", bus, remains)

        //Previous Bus Time Code
        const previous = getPreviousBuses(times)
        console.log('Previous Bus Times [remains]:', bus, previous)
        var previousTimeBox = document.createElement('div');
        previousTimeBox.className = 'timeBox past';

        if (previous[0]) {
            const value = previous[0].time;
            const currentTime = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
            const result = diffInMinutes < 90 ? 'Σε κίνηση' : 'Περασμένο';
            var textNode = document.createTextNode(result);
            previousTimeBox.appendChild(textNode);
            var span = document.createElement('span');
            span.innerHTML = `<vox style="text-decoration: line-through;">${previous[0].time}</vox><br><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>`;
            previousTimeBox.appendChild(span);
            document.getElementById("evoxBased").appendChild(previousTimeBox);
        }

        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';
            timeBox.onclick = function () {
                handleTimeBoxClick(this)
            }

            // Create the text node for the Greek text 'Παναγίτσα'
            var textNode = document.createTextNode('Παναγίτσα');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.innerHTML = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);

            if (localStorage.getItem("extVOASA")) {
                span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                var optDiv = document.createElement('div');
                optDiv.style.display = 'none'
                optDiv.style.height = 'auto'
                timeBox.appendChild(optDiv);
            }

            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);
        })
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrlGoun}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("netStats").innerHTML = onlineSvg

                const result = data.find(item => item.route_code === "2079");
                const btime2 = result ? result.btime2 : null;
                if (btime2) {
                    document.getElementById("basedGoun").innerHTML = `${btime2} λεπτά`
                    if (btime2 === 1) {
                        document.getElementById("basedGoun").innerHTML = `${btime2} λεπτό`
                    }
                } else {
                    document.getElementById("basedGoun").innerHTML = `Κανένα`
                }

            })
            .catch(error => {
                document.getElementById("basedGoun").innerHTML = `<img src="snap.png" width="25px">`
                document.getElementById("netStats").innerHTML = offlineSvg
                console.log("an error occured.")
            })
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("netStats").innerHTML = onlineSvg

                if (data) {
                    document.getElementById("based").innerHTML = `${data[0].btime2} λεπτά`
                    if (data[0].btime2 === 1) {
                        document.getElementById("based").innerHTML = `${data[0].btime2} λεπτό`
                    }
                } else {
                    document.getElementById("based").innerHTML = `Κανένα`
                }

            })
            .catch(error => {
                document.getElementById("netStats").innerHTML = offlineSvg
                console.log('Loading From Storage')
                document.getElementById("evoxBased").innerHTML = ""
                if (bus === "16") {
                    const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
                    const remains = getNextBusesPanagitsa(times, more)
                    console.log(remains)
                    document.getElementById("based").innerHTML = `<img src="snap.png" width="25px">`
                    document.getElementById("16defTime").style.display = ""
                    document.getElementById("16gounTime").style.display = ""
                    remains.forEach(function (remainTime) {
                        // Create the main div element with the class 'timeBox'
                        var timeBox = document.createElement('div');
                        timeBox.className = 'timeBox';
                        timeBox.onclick = function () {
                            handleTimeBoxClick(this)
                        }

                        // Create the text node for the Greek text 'Παναγίτσα'
                        var textNode = document.createTextNode('Παναγίτσα');

                        // Append the text node to the main div element
                        timeBox.appendChild(textNode);

                        // Create the span element and set its content to '10m'
                        var span = document.createElement('span');
                        span.innerHTML = remainTime;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);
                        if (localStorage.getItem("extVOASA")) {
                            span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                            var optDiv = document.createElement('div');
                            optDiv.style.display = 'none'
                            optDiv.style.height = 'auto'
                            timeBox.appendChild(optDiv);
                        }

                        // Optionally, append the timeBox to the body or another element in the DOM
                        document.getElementById("evoxBased").appendChild(timeBox);
                    })
                } else if (bus === "049") {
                    console.log("Is Daku: true [OFF]")
                    document.getElementById("based049").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
                    document.getElementById("based049").innerHTML = `<img src="snap.png" width="25px">`
                    document.getElementById("based049Dhm").innerHTML = document.getElementById("based049").innerHTML
                    document.getElementById("049live1").style.display = ""
                    const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
                    const remains = getNextBuses(times, more)

                    console.log(remains)
                    remains.forEach(function (remainTime) {
                        // Create the main div element with the class 'timeBox'
                        var timeBox = document.createElement('div');
                        timeBox.className = 'timeBox';
                        timeBox.onclick = function () {
                            handleTimeBoxClick(this)
                        }

                        var textNode = document.createTextNode('Πειραιάς');

                        // Append the text node to the main div element
                        timeBox.appendChild(textNode);

                        // Create the span element and set its content to '10m'
                        var span = document.createElement('span');
                        span.innerHTML = remainTime;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);
                        if (localStorage.getItem("extVOASA")) {
                            span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                            var optDiv = document.createElement('div');
                            optDiv.style.display = 'none'
                            optDiv.style.height = 'auto'
                            timeBox.appendChild(optDiv);
                        }

                        // Optionally, append the timeBox to the body or another element in the DOM
                        document.getElementById("evoxBased").appendChild(timeBox);


                    })
                } else {
                    console.log("VV:", bus)
                    document.getElementById("16defTime").style.display = "none"
                    document.getElementById("16gounTime").style.display = "none"
                    const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
                    const remains = getNextBuses(times, more)
                    console.log(remains)
                    remains.forEach(function (remainTime) {
                        // Create the main div element with the class 'timeBox'
                        var timeBox = document.createElement('div');
                        timeBox.className = 'timeBox';
                        timeBox.onclick = function () {
                            handleTimeBoxClick(this)
                        }

                        var textNode = document.createTextNode('Transition');

                        // Append the text node to the main div element
                        timeBox.appendChild(textNode);

                        // Create the span element and set its content to '10m'
                        var span = document.createElement('span');
                        span.innerHTML = remainTime;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);
                        if (localStorage.getItem("extVOASA")) {
                            span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                            var optDiv = document.createElement('div');
                            optDiv.style.display = 'none'
                            optDiv.style.height = 'auto'
                            timeBox.appendChild(optDiv);
                        }

                        // Optionally, append the timeBox to the body or another element in the DOM
                        document.getElementById("evoxBased").appendChild(timeBox);


                    })
                }
                let countThis1 = 25;
                count1 = setInterval(function () {
                    countThis1 = countThis1 - 1
                    if (countThis1 === -1) {
                        countThis1 = 24
                        console.log("Interval Countdown:", 24)
                    }
                    console.log("Interval Countdown:", countThis1)
                }, 1000)
                currentInt =

                    (function () {
                        showInfo(bus, 'interval')
                    }, 25000)

            });
    } else if (bus === "049") {
        console.log("Is Daku: true")
        document.getElementById("based049").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        document.getElementById("based049Dhm").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrlKeranhs}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("netStats").innerHTML = onlineSvg
                if (data) {
                    document.getElementById("based049").innerHTML = `${data[0].btime2} λεπτά`
                    if (data[0].btime2 === 1) {
                        document.getElementById("based049").innerHTML = `${data[0].btime2} λεπτό`
                    }
                } else {
                    document.getElementById("based049").innerHTML = `Κανένα`
                }

            })
            .catch(error => {
                document.getElementById("netStats").innerHTML = offlineSvg
                document.getElementById("based049").innerHTML = `<img src="snap.png" width="25px">`
                document.getElementById("049live1").style.display = ""
            })
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrlDhm}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("netStats").innerHTML = onlineSvg
                if (data) {
                    try {
                        const result = data.find(obj => obj.route_code === "2995");//{"route_code": "3086","route_id": "04","route_descr": "ΟΜΟΝΟΙΑ - ΠΕΙΡΑΙΑΣ","route_active": "1","route_descr_eng": "OMONOIA - PEIRAIAS"}
                        document.getElementById("based049Dhm").innerHTML = `${result.btime2} λεπτά`
                        if (result.btime2 === 1) {
                            document.getElementById("based049Dhm").innerHTML = `${result.btime2} λεπτό`
                        }
                    } catch (error) {
                        document.getElementById("based049Dhm").innerHTML = `Κανένα`
                    }

                } else {
                    document.getElementById("based049Dhm").innerHTML = `Κανένα`
                }

            })
            .catch(error => {
                document.getElementById("netStats").innerHTML = offlineSvg
                console.log("Dhmotiko theatro live error", error)
                document.getElementById("based049Dhm").innerHTML = `<img src="snap.png" width="25px">`
                document.getElementById("049live2").style.display = ""
            })
        document.getElementById("049live1").style.display = ""
        document.getElementById("049live2").style.display = ""
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        const remains = getNextBuses(times, more)
        console.log("Preworked [remains]:", bus, times)

        //Previous Bus Time Code
        const previous = getPreviousBuses(times)
        console.log('Previous Bus Times [remains]:', bus, previous)
        var previousTimeBox = document.createElement('div');
        previousTimeBox.className = 'timeBox past';

        if (previous[0]) {
            const value = previous[0].time;
            const currentTime = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
            const result = diffInMinutes < 90 ? 'Σε κίνηση' : 'Περασμένο';
            var textNode = document.createTextNode(result);
            previousTimeBox.appendChild(textNode);
            var span = document.createElement('span');
            span.innerHTML = `<vox style="text-decoration: line-through;">${previous[0].time}</vox><br><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>`;
            previousTimeBox.appendChild(span);
            document.getElementById("evoxBased").appendChild(previousTimeBox);
        }


        console.log('Previous Bus Times [remains]:', bus, previous)
        console.log("Bus Remains:", bus, remains)
        console.log(remains)
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';
            timeBox.onclick = function () {
                handleTimeBoxClick(this)
            }
            timeBox.onclick = function () {
                handleTimeBoxClick(this)
            }

            var textNode = document.createTextNode('Πειραιάς');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.innerHTML = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            if (localStorage.getItem("extVOASA")) {
                span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                var optDiv = document.createElement('div');
                optDiv.style.display = 'none'
                optDiv.style.height = 'auto'
                timeBox.appendChild(optDiv);
            }

            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);


        })
    } else if (bus === "904") {
        console.log("Is 14: true")
        document.getElementById("based904").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrlKor}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("netStats").innerHTML = onlineSvg
                if (data) {
                    try {
                        const result = data.find(obj => obj.route_code === "5158");
                        document.getElementById("based904").innerHTML = `${result.btime2} λεπτά`
                        if (result.btime2 === 1) {
                            document.getElementById("based904").innerHTML = `${result.btime2} λεπτό`
                        }
                    } catch (error) {
                        document.getElementById("based904").innerHTML = `Κανένα`
                    }

                } else {
                    document.getElementById("based904").innerHTML = `Κανένα`
                }

            })
            .catch(error => {
                document.getElementById("netStats").innerHTML = offlineSvg
                console.log("Korai live error", error)
                document.getElementById("based904").innerHTML = `<img src="snap.png" width="25px">`
                document.getElementById("904live1").style.display = ""
            })
        document.getElementById("904live1").style.display = ""
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        const remains = getNextBuses(times, more)
        console.log("KOAGUN", times)
        console.log(remains)
        //Previous Bus Time Code
        const previous = getPreviousBuses(times)
        console.log('Previous Bus Times [remains]:', bus, previous)
        var previousTimeBox = document.createElement('div');
        previousTimeBox.className = 'timeBox past';

        if (previous[0]) {
            const value = previous[0].time;
            const currentTime = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
            const result = diffInMinutes < 90 ? 'Σε κίνηση' : 'Περασμένο';
            var textNode = document.createTextNode(result);
            previousTimeBox.appendChild(textNode);
            var span = document.createElement('span');
            span.innerHTML = `<vox style="text-decoration: line-through;">${previous[0].time}</vox><br><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>`;
            previousTimeBox.appendChild(span);
            document.getElementById("evoxBased").appendChild(previousTimeBox);
        }
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';
            timeBox.onclick = function () {
                handleTimeBoxClick(this)
            }

            var textNode = document.createTextNode('Καραϊσκάκη');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.innerHTML = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            timeBox.style.fontSize = "16px";

            if (localStorage.getItem("extVOASA")) {
                span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                var optDiv = document.createElement('div');
                optDiv.style.display = 'none'
                optDiv.style.height = 'auto'
                timeBox.appendChild(optDiv);
            }
            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);


        })
    } else if (bus === "831") {
        document.getElementById("based831Ethn").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrlEthn831}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("netStats").innerHTML = onlineSvg
                if (data) {
                    try {
                        const result = data.find(obj => obj.route_code === "1886");
                        document.getElementById("based831Ethn").innerHTML = `${result.btime2} λεπτά`
                        if (result.btime2 === 1) {
                            document.getElementById("based831Ethn").innerHTML = `${result.btime2} λεπτό`
                        }
                    } catch (error) {
                        document.getElementById("based831Ethn").innerHTML = `Κανένα`
                    }

                } else {
                    document.getElementById("based831Ethn").innerHTML = `Κανένα`
                }

            })
            .catch(error => {
                document.getElementById("netStats").innerHTML = offlineSvg
                console.log("Ethnikis live error", error)
                document.getElementById("based831Ethn").innerHTML = `<img src="snap.png" width="25px">`
                document.getElementById("based831Ethn").style.display = ""
            })
        document.getElementById("831live1").style.display = ""
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        const remains = getNextBuses(times, more)
        console.log(remains)
        //Previous Bus Time Code
        const previous = getPreviousBuses(times)
        console.log('Previous Bus Times [remains]:', bus, previous)
        var previousTimeBox = document.createElement('div');
        previousTimeBox.className = 'timeBox past';

        if (previous[0]) {
            const value = previous[0].time;
            const currentTime = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
            const result = diffInMinutes < 90 ? 'Σε κίνηση' : 'Περασμένο';
            var textNode = document.createTextNode(result);
            previousTimeBox.appendChild(textNode);
            var span = document.createElement('span');
            span.innerHTML = `<vox style="text-decoration: line-through;">${previous[0].time}</vox><br><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>`;
            previousTimeBox.appendChild(span);
            document.getElementById("evoxBased").appendChild(previousTimeBox);
        }
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';
            timeBox.onclick = function () {
                handleTimeBoxClick(this)
            }

            var textNode = document.createTextNode('Πειραιάς');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.innerHTML = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            timeBox.style.fontSize = "16px";

            if (localStorage.getItem("extVOASA")) {
                span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                var optDiv = document.createElement('div');
                optDiv.style.display = 'none'
                optDiv.style.height = 'auto'
                timeBox.appendChild(optDiv);
            }
            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);


        })
    } else {
        document.getElementById("16defTime").style.display = "none"
        document.getElementById("16gounTime").style.display = "none"
        document.getElementById("049live1").style.display = "none"
        document.getElementById("049live2").style.display = "none"
        document.getElementById("831live1").style.display = "none"
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        const remains = getNextBuses(times, more)
        console.log(remains)
        //Previous Bus Time Code
        const previous = getPreviousBuses(times)
        console.log('Previous Bus Times [remains]:', bus, previous)
        var previousTimeBox = document.createElement('div');
        previousTimeBox.className = 'timeBox past';

        if (previous[0]) {
            const value = previous[0].time;
            const currentTime = new Date();
            const [hours, minutes] = value.split(':').map(Number);
            const targetTime = new Date();
            targetTime.setHours(hours, minutes, 0, 0);
            const diffInMinutes = (currentTime - targetTime) / (1000 * 60);
            const result = diffInMinutes < 90 ? 'Σε κίνηση' : 'Περασμένο';
            var textNode = document.createTextNode(result);
            previousTimeBox.appendChild(textNode);
            var span = document.createElement('span');
            span.innerHTML = `<vox style="text-decoration: line-through;">${previous[0].time}</vox><br><span style='font-size: 0.9rem;margin-top:4px;'>${previous[0].formatted}</span>`;
            previousTimeBox.appendChild(span);
            document.getElementById("evoxBased").appendChild(previousTimeBox);
        }
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';
            timeBox.onclick = function () {
                handleTimeBoxClick(this)
            }

            let textNode;
            if (bus === "420") {
                textNode = document.createTextNode('Πειραιάς');
            } else if (bus === "831") {
                textNode = document.createTextNode('Πειραιάς');
            } else if (bus === "828") {
                textNode = document.createTextNode('Πειραιάς');
            } else {
                textNode = document.createTextNode('Transition');
            }

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.innerHTML = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            if (localStorage.getItem("extVOASA")) {
                span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                var optDiv = document.createElement('div');
                optDiv.style.display = 'none'
                optDiv.style.height = 'auto'
                timeBox.appendChild(optDiv);
            }

            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);
        })
    }
    let countThis2 = 25;
    count2 = setInterval(function () {
        countThis2 = countThis2 - 1
        if (countThis2 === -1) {
            countThis2 = 25
            console.log("Interval Countdown:", '25')
        }
        console.log("Interval Countdown:", countThis2)
    }, 1000)
    currentInt = setInterval(function () {
        showInfo(bus, 'interval')
    }, 25000)


}

function getPreviousBuses(times, more) {
    const countToLoad = more || 7; // Default to 7 if `more` is not provided

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

    const busTimes = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
        const diff = currentTime - busTime; // Difference in minutes (negative for future buses, positive for past buses)

        return {
            time,
            isPast: busTime < currentTime, // Mark as past if bus time is earlier than current time
            remainingTime: diff // Positive for past buses
        };
    });

    // Filter only past buses
    const pastBuses = busTimes.filter(bus => bus.isPast);

    // Sort past buses in descending order (most recent past buses first)
    pastBuses.sort((a, b) => a.remainingTime - b.remainingTime);

    // Take the last `countToLoad` past buses
    const previousBuses = pastBuses.slice(0, countToLoad).map(bus => {
        const diff = bus.remainingTime; // Use positive remaining time for formatting
        let formattedRemainingTime;

        if (diff >= 60) {
            let hours = Math.floor(diff / 60);
            let remainingMinutes = diff % 60;

            if (remainingMinutes === 0) {
                formattedRemainingTime = hours === 1
                    ? `πριν ${hours} ώρα`
                    : `πριν ${hours} ώρες`;
            } else {
                formattedRemainingTime = hours === 1
                    ? `πριν ${hours} ώρα ${remainingMinutes} λεπτά`
                    : `πριν ${hours} ώρες ${remainingMinutes} λεπτά`;
            }
        } else {
            formattedRemainingTime = `πριν ${diff} λεπτά`;
        }

        return { time: bus.time, formatted: formattedRemainingTime }
        //`${bus.time}`;// - ${formattedRemainingTime}
    });

    return previousBuses;
}




function getNextBuses(times, more) {

    let countToLoad = null
    if (more) {
        countToLoad = more
    } else {
        countToLoad = 7
    }
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

    const busTimes = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
        const diff = busTime - currentTime;
        return {
            time,
            remainingTime: diff >= 0 ? diff : diff + 24 * 60 // Adjust for next day if time is negative
        };
    });

    // Separate future and past bus times
    const futureBuses = busTimes.filter(bus => bus.remainingTime >= 0);
    const pastBuses = busTimes.filter(bus => bus.remainingTime < 0);

    // Sort future buses by remaining time
    futureBuses.sort((a, b) => a.remainingTime - b.remainingTime);

    // Find the nearest previous bus time
    let nearestPreviousBus = null;
    if (pastBuses.length > 0) {
        pastBuses.sort((a, b) => b.remainingTime - a.remainingTime); // Sort past buses in descending order
        nearestPreviousBus = pastBuses[0]; // Nearest previous bus (largest negative remaining time)
    }

    // Convert remaining times to the desired format for future buses


    const nextBuses = futureBuses.slice(0, countToLoad).map((bus) => {
        const diff = bus.remainingTime;
        let formattedRemainingTime;

        if (diff > 60) {
            let hours = Math.floor(diff / 60);
            let remainingMinutes = diff % 60;
            if (hours >= 1) {
                formattedRemainingTime = hours === 1
                    ? `${hours} ώρα`
                    : `${hours} ώρες`;
                return `${bus.time} ~ ${formattedRemainingTime}`;
            } else {
                formattedRemainingTime = hours === 1
                    ? `${hours} ώρα, ${remainingMinutes} λεπτά`
                    : `${hours} ώρες, ${remainingMinutes} λεπτά`;
                return `${bus.time} - ${formattedRemainingTime}`;
            }


        } else {
            formattedRemainingTime = `${diff} λεπτά`;
            return `${bus.time} - ${formattedRemainingTime}`;
        }


    });

    // If there's a nearest previous bus, format it and prepend to nextBuses
    if (nearestPreviousBus) {
        const previousDiff = Math.abs(nearestPreviousBus.remainingTime); // Use absolute value for formatting
        const previousFormattedTime = `${nearestPreviousBus.time} - πρίν ${previousDiff} λεπτά`;
        nextBuses.unshift(previousFormattedTime);
    }

    // Log the original bus times
    busTimes.slice(0, 5).forEach(bus => {
        console.log(`Scheduled time: ${bus.time}`);
    });

    return nextBuses; // Return the next buses including the previous one
}


function getNextBusesPanagitsa(times, more) {
    let countToLoad = null
    if (more) {
        countToLoad = more
    } else {
        countToLoad = 7
    }
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

    const busTimes = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
        const diff = busTime - currentTime;
        return {
            time,
            remainingTime: diff >= 0 ? diff : diff + 24 * 60 // Adjust for next day if time is negative
        };
    }).filter(bus => bus.remainingTime >= 0); // Only keep times that are in the future

    busTimes.sort((a, b) => a.remainingTime - b.remainingTime); // Sort the times in ascending order
    let recon2 = false
    // Convert remaining times to the desired format
    const nextBuses = busTimes.slice(0, countToLoad).map((bus, index) => {

        const diff = bus.remainingTime;
        let formattedRemainingTime;
        if (diff > 60) {
            let hours = Math.floor(diff / 60);
            let remainingMinutes = diff % 60;
            if (hours === 1) {
                formattedRemainingTime = `${hours} ώρα, ${remainingMinutes + 4} λεπτά`;
            } else {
                formattedRemainingTime = `${hours} ώρες, ${remainingMinutes + 4} λεπτά`;
            }
            if (hours >= 1) {
                recon2 = true
            }
        } else {
            formattedRemainingTime = `${diff + 4} λεπτά`;
        }

        if (recon2) {
            return `${bus.time}`;
        } else {
            return `${bus.time} - ${formattedRemainingTime}`;
        }
    });

    // Log the original bus times
    busTimes.slice(0, 5).forEach(bus => {
        console.log(`Scheduled time: ${bus.time}`);
    });

    return nextBuses; // Return the next 5 buses
}

function goBack() {
    document.getElementById("showMore").style.display = null
    howManyShowed = null
    document.getElementById("phone").classList.remove('out')
    setThemeColors(stockStatusBC)
    document.getElementById("Businfo").innerHTML = `⛳`
    document.getElementById("Businfo").style.opacity = '0'
    enableOverflow()
    //document.getElementById("main-wrapper").style.overflow = 'auto'
    document.getElementById("904live1").style.display = 'none'
    document.getElementById("popIt").classList.remove("active")
    sessionStorage.removeItem("currentWatch")
    try {
        console.log("Base Interval Cleared")
        clearInterval(currentInt)
    } catch (error) {
        console.warn("Interval Not Cleared!", error)
    }
    try {
        console.log("Countdown 1 Interval Cleared")
        clearInterval(count1)
    } catch (error) {
        console.warn("Interval For Countdown 1 Not Cleared!", error)
    }
    try {
        console.log("Countdown 2 Interval Cleared")
        clearInterval(count2)
    } catch (error) {
        console.warn("Interval For Countdown 2 Not Cleared!", error)
    }

}

//fetch(`https://data.evoxs.xyz?externalApp=oasa&getWhat=html`)
//    .then(response => response.text())
//    .then(htmlData => {
//        if (htmlData === document.getElementById("EvoxBasedHTML").innerHTML) {
//            console.log("UPDATED TO LATEST!")
//        } else {
//            console.log("Updating..")
//            localStorage.setItem("htmlData", htmlData)
//            document.getElementById("EvoxBasedHTML").innerHTML = htmlData
//        }
//
//    })
//    .catch(error => {
//        console.error("Failed to update", error)
//    })

function sendToNote() {
    const targetUrl = encodeURIComponent(`https://data.evoxs.xyz/tasco?method=deluxeEdit&noteCont=${document.getElementById("theDebug")}&noteTitle=New%20Note&username=llamaTester&noteId=4ZxQ31OEKp`);
    fetch(`https://data.evoxs.xyz/tasco?method=deluxeEdit&noteCont=${document.getElementById("theDebug").innerText}&noteTitle=New%20Note&username=llamaTester&noteId=4ZxQ31OEKp`)
        .then(response => response.text())
        .then(responseData => {
            document.getElementById("netStats").innerHTML = onlineSvg
            console.log(responseData)

        })
        .catch(error => {
            document.getElementById("netStats").innerHTML = offlineSvg
            console.error("Failed to update", error)
        })
}

function changeDebug() {
    if (localStorage.getItem("showDebug")) {
        localStorage.removeItem("showDebug")
        document.getElementById('debug').style.display = 'none'
        disableScroll();
    } else {
        localStorage.setItem("showDebug", true)
        document.getElementById('debug').style.display = ''
        enableScroll()
        //document.documentElement.style.overflow = '';
    }
}

if (!localStorage.getItem("showDebug")) {
    document.getElementById('debug').style.display = 'none'
    //document.documentElement.style.overflow = 'hidden';
} else {
    enableScroll()
    document.getElementById('debug').style.display = ''
}

document.addEventListener("DOMContentLoaded", function () {
    setInterval(function () {
        console.log("Reloading Home Screen's Countdowns.")
        getBus('16')
        getBus('831')
        getBus('828')
        getBus('049')
        getBus('904')
        getBus('420')
    }, 25000)
    if (localStorage.getItem("t50-username")) {
        sessionStorage.setItem("privileges", "florida")
        document.getElementById("profilePic").src = `reloading-pfp.gif`;
        if (localStorage.getItem("oasa-name")) {
            console.log("Running autostart placeholders func")
            const theVal = JSON.parse(localStorage.getItem("oasa-name"))
            if (theVal.first) {
                document.getElementById('profileEmail').innerText = theVal.first
            }
            if (theVal.last) {
                if (theVal.first) {
                    document.getElementById("profileEmail").innerText = `${theVal.first} ${theVal.last}`
                } else {
                    document.getElementById("profileEmail").innerText = localStorage.getItem("t50-username")
                }
            }


            document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
            if (!theVal.first && !theVal.last) {
                console.log("both first and last are null")
                document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
                document.getElementById('profileEmail').innerText = localStorage.getItem("t50-email")
            }
        } else {
            console.log("No full name given")
            document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
            document.getElementById('profileEmail').innerText = localStorage.getItem("t50-email")
        }


        if (sessionStorage.getItem("pfp") && sessionStorage.getItem("pfp") !== "2") {
            document.getElementById("profilePic").src = sessionStorage.getItem("pfp");
        } else {
            const url = `${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${localStorage.getItem("t50-username")}`;
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    if (data.includes("<!DOCTYPE html>")) {
                        document.getElementById("profilePic").src = `snap.png`;
                        return;
                    }
                    if (data.indexOf("base64") === -1) {
                        // If it doesn't contain "base64", add the prefix
                        data = "data:image/jpeg;base64," + data;
                    }
                    document.getElementById("profilePic").src = `${data}`;
                    sessionStorage.setItem("pfp", data)
                })
                .catch(error => {
                    document.getElementById("profilePic").src = `snap.png`;
                    console.error(error);
                });
        }

    }
})

console.log("stopped")
const popIt = document.getElementById('popIt');
const grab = document.getElementById('grab');

let startY, startTop;
const threshold = 10; // Threshold in pixels from the top where dragging upwards is allowed

grab.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    startY = touch.clientY;
    startTop = parseInt(window.getComputedStyle(popIt).top, 10);
    document.addEventListener('touchmove', moveDiv);
    document.addEventListener('touchend', stopMoveDiv);
});

function moveDiv(e) {
    const touch = e.touches[0];
    const deltaY = touch.clientY - startY;

    // Calculate the new top position
    let newTop = startTop + deltaY;

    // Restrict movement downwards only
    if (informed === "waiting") {
        informed = 'done'
        document.getElementById("grab").style.backgroundColor = "#333"
    }
    if (newTop < 40) {
        return;
    }
    if (newTop > 100) {
        goBack()
        setTimeout(function () {
            popIt.style.top = '';
        }, 500)
    }
    if (newTop > startTop) {
        popIt.style.top = newTop + 'px';
    } else if (newTop < startTop && startTop >= threshold) {
        // Allow movement upwards only if above threshold
        popIt.style.top = newTop + 'px';
    }
}

function stopMoveDiv() {

    document.removeEventListener('touchmove', moveDiv);
    document.removeEventListener('touchend', stopMoveDiv);

    const elementId = "popIt";
    const isOutsideViewport = isElementOutsideViewport(elementId);

    if (isOutsideViewport) {
        console.log("Element with ID '" + elementId + "' is outside the viewport.");

        goBack()
        setTimeout(function () {
            popIt.style.top = '';
        }, 500)

    } else {
        console.log("Element with ID '" + elementId + "' is inside the viewport.");
    }
}

function isElementOutsideViewport(elementId) {
    const element = document.getElementById(elementId);

    if (!element) {
        console.warn("Element with ID '" + elementId + "' not found.");
        return false;
    }

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Check if the element is outside the viewport
    return rect.bottom < 0 || rect.top > viewportHeight || rect.right < 0 || rect.left > viewportWidth;
}


let informed = 'unready';
function inform() {
    informed = 'waiting'
    document.getElementById("grab").style.backgroundColor = "#ff0000"
    setTimeout(function () {
        document.getElementById("grab").style.backgroundColor = "#333"
    }, 1100)
    const grabint = setInterval(function () {
        console.log("Info Interval")
        if (informed === "unready" || informed === 'waiting') {
            console.log("running default")
            document.getElementById("grab").style.backgroundColor = "#ff0000"
            setTimeout(function () {
                document.getElementById("grab").style.backgroundColor = "#333"
            }, 1100)
        } else {
            console.log("bypassing")
            clearInterval(grabint)
            return;
        }

    }, 2100)
}

function disableOverflow() {
    //document.documentElement.style.overflow = 'hidden';
}

function enableOverflow() {
    //document.documentElement.style.overflow = '';
}

function florida() {
    disableScroll()
    document.getElementById("phone").classList.add('out')
    document.getElementById("floridaCont").classList.add("active")
    document.getElementById("main-wrapper").style.overflow = 'hidden'
    loadActive()
}

function loadActive() {
    if (!localStorage.getItem("t50-username")) {
        console.log("<span style='color: red'>Cancelled active schedo check due to lcstorage username being null!</span>")
        return;
    }
    fetch(`https://florida.evoxs.xyz/activeSchedo?username=${localStorage.getItem("t50-username")}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.schedo.length === 0 && data.infinite.length === 0) {
                console.log("No Active Schedos")
                const container = document.getElementById("pendingContainer")
                container.innerHTML = ''
                document.getElementById("pendingNotifications").style.display = 'none'
            } else {
                document.getElementById("pendingNotifications").style.display = ''
                console.log("Active schedos found")
                const filteredData = data.schedo.filter(item => item.id === localStorage.getItem("extVOASA"));
                console.log("data ready")
                console.log(filteredData)
                const container = document.getElementById("pendingContainer")
                container.innerHTML = ''

                const filteredDataInfinite = data.infinite.filter(item => item.notificationId === localStorage.getItem("extVOASA"));
                if (filteredData.length === 0 && filteredDataInfinite.length === 0) {
                    document.getElementById("pendingNotifications").style.display = 'none'
                    return;
                }
                filteredDataInfinite.forEach(schedoInfinite => {
                    const pendingDiv = document.createElement('div');
                    pendingDiv.className = 'pending infinite';

                    const heading = document.createElement('h2');
                    heading.textContent = schedoInfinite.bus;

                    const span = document.createElement('span');
                    if (schedoInfinite.notificationType === '2minutes') {
                        span.innerHTML = `2' πριν την άφιξη στην στάση: <voi>${capitalizeWords(schedoInfinite.station)}</voi>`;
                    } else if (schedoInfinite.notificationType === 'countDownBegin') {
                        span.innerHTML = `Αρχή αντίστροφης μέτρησης στην στάση: <voi>${capitalizeWords(schedoInfinite.station)}</voi>`;
                    } else {
                        span.textContent = `Σφάλμα! [${schedoInfinite.notificationType}]`;
                    }
                    const buttonContainer = document.createElement('div');
                    buttonContainer.style.marginLeft = 'auto';
                    buttonContainer.style.marginRight = '10px';

                    pendingDiv.appendChild(heading);
                    pendingDiv.appendChild(span);
                    pendingDiv.appendChild(buttonContainer);

                    container.appendChild(pendingDiv);
                })
                filteredData.forEach(schedoNotification => {
                    const pendingDiv = document.createElement('div');
                    pendingDiv.className = 'pending';

                    const heading = document.createElement('h2');
                    heading.textContent = schedoNotification.bus;

                    const span = document.createElement('span');
                    if (schedoNotification.type === 'transition') {
                        span.textContent = `Αφετηρία: ${schedoNotification.time}`;
                    } else {
                        span.textContent = `Σφάλμα! [${schedoNotification.type}]`;
                    }
                    const buttonContainer = document.createElement('div');
                    buttonContainer.style.marginLeft = 'auto';
                    buttonContainer.style.marginRight = '10px';

                    const button = document.createElement('button');
                    button.className = 'declineButton';
                    button.textContent = 'Ακύρωση';
                    button.onclick = function () {
                        const valueToDelete = schedoNotification
                        console.log("Will delete", valueToDelete)
                        const timeNode = `${valueToDelete.date}/${valueToDelete.time}`
                        const bus = valueToDelete.bus
                        const id = valueToDelete.id
                        const evoxJson2 = {
                            'username': localStorage.getItem("t50-username"),
                            'timenode': timeNode,
                            'bus': bus,
                            'deviceId': id
                        }
                        console.log("now pinging")
                        fetch('https://florida.evoxs.xyz/deleteByNode', {
                            method: 'POST',
                            body: JSON.stringify(evoxJson2),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }).then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.text();
                        })
                            .then(data => {
                                loadActive()
                                console.log(data)
                            }).catch(error => {
                                document.getElementById("registerBt").innerHTML = `Failed`
                                console.error('Fetch error:', error);
                            });

                    }

                    buttonContainer.appendChild(button);
                    pendingDiv.appendChild(heading);
                    pendingDiv.appendChild(span);
                    pendingDiv.appendChild(buttonContainer);

                    container.appendChild(pendingDiv);

                })

            }

        })
        .catch(error => {
            console.error("Failed to check for updates")
        })
}

const floridaPop = document.getElementById('floridaCont');
const grabFlorida = document.getElementById('grabFlorida');

let fl_startY, fl_startTop;
const fl_threshold = 10; // Threshold in pixels from the top where dragging upwards is allowed

grabFlorida.addEventListener('touchstart', function (e) {
    const touch = e.touches[0];
    fl_startY = touch.clientY;
    fl_startTop = parseInt(window.getComputedStyle(floridaCont).top, 10);
    document.addEventListener('touchmove', fl_moveDiv);
    document.addEventListener('touchend', fl_stopMoveDiv);
});

function fl_moveDiv(e) {
    const touch = e.touches[0];
    const deltaY = touch.clientY - fl_startY;

    // Calculate the new top position
    let newTop = fl_startTop + deltaY;

    // Restrict movement downwards only
    if (newTop < 40) {
        return;
    }
    if (newTop > 120) {
        //document.getElementById("main-wrapper").style.overflow = 'auto'
        document.getElementById("floridaCont").classList.remove("active")

        document.getElementById("phone").classList.remove('out')
        setThemeColors(stockStatusBC)
        setTimeout(function () {
            document.getElementById("main-wrapper").style.overflow = null
            floridaCont.style.top = '';
            enableScroll()
        }, 500)
    }
    if (newTop > fl_startTop) {
        floridaCont.style.top = newTop + 'px';
    } else if (newTop < fl_startTop && fl_startTop >= fl_threshold) {
        // Allow movement upwards only if above threshold
        floridaCont.style.top = newTop + 'px';
    }
}

function fl_stopMoveDiv() {

    document.removeEventListener('touchmove', fl_moveDiv);
    document.removeEventListener('touchend', fl_stopMoveDiv);

    const elementId = "floridaCont";
    const isOutsideViewport = isElementOutsideViewport(elementId);

    if (isOutsideViewport) {
        console.log("Element with ID '" + elementId + "' is outside the viewport.");

        //document.getElementById("main-wrapper").style.overflow = 'auto'
        document.getElementById("floridaCont").classList.remove("active")
        document.getElementById("phone").classList.remove('out')
        setThemeColors(stockStatusBC)
        setTimeout(function () {
            document.getElementById("main-wrapper").style.overflow = null
            floridaCont.style.top = '';
        }, 500)

    } else {
        console.log("Element with ID '" + elementId + "' is inside the viewport.");
    }
}

//console.log("Debug Active!")
//florida()

function setup_begin() {
    console.log("Running setup begin")
    if (localStorage.getItem("extVOASA")) {
        console.log("Florida already attached!")
        return;
    }
    console.log("Attaching Florida..")
    if ('serviceWorker' in navigator) {
        console.log("Service Worker Located")
        setTimeout(function () {

            document.getElementById("floridaCont").classList.remove("active")
            document.getElementById("phone").classList.remove('out')
            setThemeColors(stockStatusBC)
            setTimeout(function () {
                document.getElementById("floridaCont").style.backgroundColor = `#242426`
                $("#homePage").fadeOut("fast", function () {
                    document.getElementById("floridaCont").classList.add("active")
                    document.getElementById("phone").classList.add('out')
                    floridaCont.style.top = '';

                    $("#setupPage").fadeIn("fast", function () {
                        if (sessionStorage.getItem("privileges") === "florida") {
                            console.log("Is upper user")
                            //case1
                            $("#case1").fadeIn("fast", function () {

                            })
                        } else {
                            console.log("Is anon user")
                            //case2
                            $("#case2").fadeIn("fast", function () {

                            })
                        }
                    })
                })

            }, 550)

        }, 400)
    } else {
        console.warn("Browser doesnt support Florida")
        let clientType;
        let isApple;
        let isWindows;
        let isAndroid;
        if (os.includes("macOS")) {
            isApple = true
            isWindows = false
            if (window.navigator.standalone) {
                // The website is running as a PWA (fullscreen iOS bookmark)
                console.log('Running as PWA');
                clientType = 'PWA'

                //document.getElementById("errorLog").innerHTML = `PWA`
            } else {
                // The website is running in the default Safari browser
                console.log('Running in Safari');
                clientType = 'Safari'
                //document.getElementById("errorLog").innerHTML = `Safari`
                //document.getElementById("errorLog").innerHTML = `serviceWorker: ${'serviceWorker' in navigator}<br>PushManager: ${'PushManager' in window}`
            }
        } else if (os.includes("Windows")) {
            isApple = false
            isWindows = true
            document.getElementById("resolveErrors").style.display = "none"
        } else {
            isApple = false
            isAndroid = true
            isWindows = false
            document.getElementById("resolveErrors").style.display = "none"
        }




        setTimeout(function () {

            document.getElementById("floridaCont").classList.remove("active")
            document.getElementById("phone").classList.remove('out')
            setThemeColors(stockStatusBC)
            setTimeout(function () {
                document.getElementById("floridaCont").style.backgroundColor = `#242426`
                $("#homePage").fadeOut("fast", function () {
                    document.getElementById("floridaCont").classList.add("active")
                    document.getElementById("phone").classList.add('out')
                    floridaCont.style.top = '';

                    $("#setupPage").fadeIn("fast", function () {
                        $("#informError").fadeIn("fast", function () {


                            if (isApple) {
                                if (clientType === 'Safari') {
                                    if (!window.location.href.includes("https")) {
                                        document.getElementById("IOS2").style.display = ""
                                    } else {
                                        document.getElementById("IOS1").style.display = ""
                                    }

                                } else if (clientType === "PWA") {
                                    if (!window.location.href.includes("https")) {
                                        document.getElementById("IOS2").style.display = ""
                                    }
                                }
                            } else {
                                if (!window.location.href.includes("https")) {
                                    document.getElementById("IOS2").style.display = ""
                                }
                                //document.getElementById("resolveErrors").style.display = "none"
                            }
                        })
                        //if (sessionStorage.getItem("privileges") === "florida") {
                        //    console.log("Is upper user")
                        //    //case1
                        //    
                        //} else {
                        //    console.log("Is anon user")
                        //    //case2
                        //    $("#case2").fadeIn("fast", function () {
                        //
                        //    })
                        //}
                    })
                })

            }, 550)

        }, 400)
    }

}

function OASAsettings() {
    document.getElementById("settingsBuild").innerText = currentBuild
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            // Get the URL of the active service worker's script
            const activeWorkerUrl = registration.active.scriptURL;

            // Define the expected service worker file name
            const expectedWorkerFile = '/sw.js'; // Replace with your expected file name

            // Check if the active service worker matches the expected file
            if (activeWorkerUrl.endsWith(expectedWorkerFile)) {
                console.log('The service worker is registered with the expected file:', expectedWorkerFile);
                document.getElementById("swregist").innerText = 'Ενεργές'
            } else {
                console.log('The service worker is registered with a different file:', activeWorkerUrl);
                document.getElementById("swregist").innerText = 'Άγνωστο'
            }
        }).catch((error) => {
            console.error('Error checking service worker registration:', error);
            document.getElementById("swregist").innerText = 'Ανενεργές'
        });
    } else {
        console.log('Service Worker API not supported in this browser.');
        document.getElementById("swregist").innerText = 'Ανενεργές'
    }
    $("#homePage").fadeOut("fast", function () {
        document.getElementById("floridaCont").classList.add("active")
        document.getElementById("phone").classList.add('out')
        floridaCont.style.top = '';
    })
    document.getElementById("settings").classList.add('active')
}

function returnFromSettings() {
    $("#homePage").fadeIn("fast")
    document.getElementById("floridaCont").style.overflow = "hidden"
    document.getElementById('settings').classList.remove('active')

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
//alert(`OS: ${os}, Version: ${osVersion}`)

if (localStorage.getItem("extVOASA")) {
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
                //document.getElementById("deviceId").innerHTML = localStorage.getItem("extVOASA")
            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);

                // Listen for updates to the service worker
                registration.onupdatefound = () => {
                    const installingWorker = registration.installing;

                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // New update available
                                console.log('New or updated content is available.');
                                $("#updateAvailable").fadeIn("fast")
                                //if (confirm('New version available. Refresh to update?')) {
                                //    window.location.reload();
                                //}
                            } else {
                                // Content is cached for offline use
                                console.log('Content is cached for offline use.');
                            }
                        }
                    };
                };

            }).catch(error => {
                console.log('ServiceWorker registration failed: ', error);
            });
        });
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

                if (!localStorage.getItem("extVOASA")) {
                    const evoxJson = {
                        'username': localStorage.getItem("t50-username"),
                        'os1': os,
                        'osVersion': osVersion,
                        'method': "attachOASA",
                        'subscription': subscription
                    }
                    fetch('https://florida.evoxs.xyz/oasaAttach', {
                        method: 'POST',
                        body: JSON.stringify(evoxJson),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                        .then(data => {
                            console.log("Florida Response", data)
                            if (data.message === "Complete") {
                                localStorage.setItem("extVOASA", data.id)
                                $("#setupPage").fadeOut(function () {
                                    $("#homePage").fadeIn("fast")
                                    floridaAttached()
                                    sessionStorage.setItem("privileges", "florida")
                                    document.getElementById("profilePic").src = `reloading-pfp.gif`;
                                    document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
                                    document.getElementById('profileEmail').innerText = localStorage.getItem("t50-email")

                                    const url = `${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${localStorage.getItem("t50-username")}`;
                                    fetch(url)
                                        .then(response => response.text())
                                        .then(data => {
                                            if (data.indexOf("base64") === -1) {
                                                // If it doesn't contain "base64", add the prefix
                                                data = "data:image/jpeg;base64," + data;
                                            }
                                            document.getElementById("profilePic").src = `${data}`;
                                            sessionStorage.setItem("pfp", data)
                                        })
                                        .catch(error => {
                                            document.getElementById("profilePic").src = `snap.png`;
                                            console.error(error);
                                        });
                                })
                            }

                        }).catch(error => {
                            console.error('Fetch error:', error);
                        });
                } else {
                    console.log("Id exists", localStorage.getItem("extVOASA"));
                }

            })
            .catch(function (error) {
                console.error('Service Worker Error', error);
            });
    }
}

function continueFlo(isAnon) {
    if (isAnon === "noAcc") {
        $("#case2").fadeOut("fast", function () {
            $("#loginForm").fadeIn("fast")
        })

        //show login form
    } else {
        //just continue

        document.getElementById("floridaCont").classList.remove("active")
        document.getElementById("phone").classList.remove('out')
        setThemeColors(stockStatusBC)

        setTimeout(function () {
            $("#case1").fadeOut("fast", function () {
            })
            document.getElementById("floridaCont").style.backgroundColor = `#000`
            $("#homePage").fadeOut("fast", function () {
                document.getElementById("floridaCont").classList.add("active")
                document.getElementById("phone").classList.add('out')
                floridaCont.style.top = '';

                $("#loginForm").fadeOut("fast", function () {
                    $("#setupNotif2").fadeIn("fast", function () {
                        console.log("Setup Notif Showed")
                    })
                })
            })

        }, 550)


    }
}

function createOASA() {
    let username = document.getElementById("usernameO").value //!== ""
    let password = document.getElementById("passwordO").value //!== ""
    const evoxJson = {
        'username': username,
        'password': password
    }
    document.getElementById("registerBt").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.3s"
          repeatCount="indefinite"/>
        </path>
      </svg>`
    // Send subscription to server
    fetch('https://florida.evoxs.xyz/oasaReg', {
        method: 'POST',
        body: JSON.stringify(evoxJson),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
        .then(data => {
            console.log("Florida Response", data)
            if (!data.includes("Exists")) {
                document.getElementById("registerBt").innerHTML = `Καλωσορίσατε ${username}!`
                localStorage.setItem("t50-username", username)
                localStorage.setItem("t50-pswd", btoa(password))
                localStorage.setItem("t50-email", `${username}@evoxs.xyz`)
                setTimeout(function () {
                    document.getElementById("floridaCont").classList.remove("active")
                    document.getElementById("phone").classList.remove('out')
                    setThemeColors(stockStatusBC)
                    setTimeout(function () {
                        document.getElementById("floridaCont").style.backgroundColor = `#000`
                        $("#homePage").fadeOut("fast", function () {
                            document.getElementById("floridaCont").classList.add("active")
                            document.getElementById("phone").classList.add('out')
                            floridaCont.style.top = '';

                            $("#loginForm").fadeOut("fast", function () {
                                $("#setupNotif2").fadeIn("fast", function () {

                                })
                            })
                        })

                    }, 550)
                }, 500)
            } else {
                document.getElementById("registerBt").innerHTML = `Δοκιμάστε άλλο όνομα χρήστη.`
            }

        }).catch(error => {
            document.getElementById("registerBt").innerHTML = `Failed`
            console.error('Fetch error:', error);
        });
}

function floridaAttached() {
    if (localStorage.getItem('extVOASA')) {
        document.getElementById("personalInf").classList.remove("disabled")
        document.getElementById("recentNotif").classList.remove("disabled")
        document.getElementById("setupNotif").classList.add("disabled")
    }
}
floridaAttached()

let oldHTML;
function showPersonal() {
    if (localStorage.getItem("extVOASA")) {
        oldHTML = document.getElementById("changingICON").innerHTML
        document.getElementById("changingICON").innerHTML = `<svg style="margin-left: 0;margin-right: 0;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.3s"
          repeatCount="indefinite"/>
        </path>
      </svg>`

        document.getElementById("usernameOnly").innerText = localStorage.getItem("t50-username")
        if (localStorage.getItem("oasa-name")) {
            const theVal = JSON.parse(localStorage.getItem("oasa-name"))
            if (theVal.first) {
                document.getElementById("userTheName").innerText = theVal.first
            }
            if (theVal.last) {
                if (theVal.first) {
                    document.getElementById("userTheName").innerText = `${theVal.first} ${theVal.last}`
                } else {
                    document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
                }
            }

            if (!theVal.first && !theVal.last) {
                document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
            }
        } else {
            document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
        }

        if (document.getElementById("profilePic").src.includes("reloading-pfp.gif")) {
            console.log("Profile Picture Is Still Loading, Waiting Until Response")
            document.getElementById("personalImg").src = "reloading-pfp.gif"
            const pfpInt = setInterval(function () {
                if (document.getElementById("profilePic").src.includes("reloading-pfp.gif")) {
                    console.log("profile is loading")
                    return;
                } else {
                    console.log('Profile loaded')
                    document.getElementById("personalImg").src = document.getElementById("profilePic").src
                    document.getElementById("personal").classList.add('active')
                    clearInterval(pfpInt)
                }
            }, 100)
            setTimeout(function () {
                document.getElementById("personal").classList.add('active')
            }, 2000)
        } else if (document.getElementById("personalImg").src === "cbimage.png") {
            console.log("Default Image Is Set")
        } else {
            document.getElementById("personalImg").src = document.getElementById("profilePic").src
            setTimeout(function () {
                document.getElementById("personal").classList.add('active')
            }, 400)
        }


    } else {
        console.log("External V:", localStorage.getItem("extVOASA"))
    }
}

function returnToHome() {
    document.getElementById("floridaCont").style.overflow = "hidden"
    document.getElementById('personal').classList.remove('active')
    document.getElementById("changingICON").innerHTML = oldHTML
}

function changeName() {
    const inputName = document.getElementById('nameInput');

    // Add an event listener to the input element
    inputName.addEventListener('input', function (event) {
        // This function will be called whenever the input value changes
        const theLocal = localStorage.getItem("oasa-name")
        if (theLocal) {
            if (event.target.value === '') {
                const json = {
                    'first': null,
                    'last': JSON.parse(theLocal).last
                }
                localStorage.setItem("oasa-name", JSON.stringify(json))
                return;
            }
            const json = {
                'first': event.target.value,
                'last': JSON.parse(theLocal).last
            }
            localStorage.setItem("oasa-name", JSON.stringify(json))
        } else {
            if (event.target.value === '') {
                return;
            }
            const json = {
                'first': event.target.value
            }
            localStorage.setItem("oasa-name", JSON.stringify(json))
        }
        console.log('Input value:', event.target.value);
    });

    const inputLast = document.getElementById('lastInput');

    // Add an event listener to the input element
    inputLast.addEventListener('input', function (event) {
        // This function will be called whenever the input value changes
        const theLocal = localStorage.getItem("oasa-name")
        if (theLocal) {
            if (event.target.value === '') {
                const json = {
                    'first': JSON.parse(theLocal).first,
                    'last': null
                }
                localStorage.setItem("oasa-name", JSON.stringify(json))
                return;
            }
            const json = {
                'first': JSON.parse(theLocal).first,
                'last': event.target.value
            }
            localStorage.setItem("oasa-name", JSON.stringify(json))
        } else {
            if (event.target.value === '') {
                return;
            }
            const json = {
                'last': event.target.value
            }
            localStorage.setItem("oasa-name", JSON.stringify(json))
        }
        console.log('Input value:', event.target.value);
    });
    if (localStorage.getItem("oasa-name")) {
        //Name exists
        const theVal = JSON.parse(localStorage.getItem("oasa-name"))
        if (theVal.first) {
            document.getElementById("nameInput").value = theVal.first
        }
        if (theVal.last) {
            if (theVal.first) {
                document.getElementById("nameInput").value = theVal.first
                document.getElementById("lastInput").value = theVal.last
            } else {
                console.error('Needed parts arent filled')
                document.getElementById("lastInput").value = theVal.last
                //document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
            }
        }
    } else {
        //Name = username [doesnt exist]
        //document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
    }

    document.getElementById("nameEdit").classList.add("active")
}

function returnToPersonal() {
    document.getElementById("nameEdit").classList.remove("active")
    if (localStorage.getItem("oasa-name")) {
        const theVal = JSON.parse(localStorage.getItem("oasa-name"))
        if (theVal.first) {
            document.getElementById("userTheName").innerText = theVal.first
        }
        if (theVal.last) {
            if (theVal.first) {
                document.getElementById("userTheName").innerText = `${theVal.first} ${theVal.last}`
            } else {
                document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
            }
        }

        if (!theVal.first && !theVal.last) {
            document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
        }
    } else {
        document.getElementById("userTheName").innerText = localStorage.getItem("t50-username")
    }


    if (localStorage.getItem("oasa-name")) {
        const theVal = JSON.parse(localStorage.getItem("oasa-name"))
        if (theVal.first) {
            document.getElementById('profileEmail').innerText = theVal.first
        }
        if (theVal.last) {
            if (theVal.first) {
                document.getElementById("profileEmail").innerText = `${theVal.first} ${theVal.last}`
            } else {
                document.getElementById("profileEmail").innerText = localStorage.getItem("t50-username")
            }
        }

        document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")

        if (!theVal.first && !theVal.last) {
            console.log("both first and last are null")
            document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
            document.getElementById('profileEmail').innerText = localStorage.getItem("t50-email")
        }
    } else {
        console.log("No full name given")
        document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
        document.getElementById('profileEmail').innerText = localStorage.getItem("t50-email")
    }
}

function toggleFlorida() {
    const flstats = localStorage.getItem("OasaFloridaStatus")
    if (flstats) {
        if (flstats === 'disabled') {
            reSub()
        } else if (flstats === "enabled") {
            tempUnsub()
        }
    } else {
        tempUnsub()
    }
    document.getElementById("flstats").innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.3s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
}

async function tempUnsub() {
    try {
        const serviceWorkerRegistration = await navigator.serviceWorker.ready;
        const subscription = await serviceWorkerRegistration.pushManager.getSubscription();

        if (subscription) {
            // Store the subscription object in localStorage (or indexedDB)
            localStorage.setItem('OASApushSubscription', JSON.stringify(subscription.toJSON()));
            // Unsubscribe from push notifications
            await subscription.unsubscribe();
            console.log('Push notifications have been temporarily disabled.');
            localStorage.setItem("OasaFloridaStatus", "disabled")
            document.getElementById("flstats").innerText = 'Ανενεργές'
        } else {
            document.getElementById("flstats").innerText = 'Σφάλμα!'
            console.log('No push subscription found.');
        }
    } catch (error) {
        console.error('Error during temporary unsubscribe:', error);
    }
}

async function reSub() {
    try {
        const storedSubscription = localStorage.getItem('OASApushSubscription');

        if (storedSubscription) {
            const parsedSubscription = JSON.parse(storedSubscription);
            const serviceWorkerRegistration = await navigator.serviceWorker.ready;

            // Resubscribe using the stored subscription object
            const newSubscription = await serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(parsedSubscription.keys.p256dh)
            });

            // Update localStorage (or indexedDB) with the new subscription if needed
            localStorage.setItem('OASApushSubscription', JSON.stringify(newSubscription.toJSON()));
            console.log('Push notifications have been re-enabled.');
            localStorage.setItem("OasaFloridaStatus", "enabled")
            document.getElementById("flstats").innerText = 'Ενεργές'
        } else {
            console.log('No stored subscription found. Cannot re-enable notifications.');
        }
    } catch (error) {
        console.error('Error during re-subscribe:', error);
    }
}


function changeProfile() {
    document.getElementById("profileUplInfo").innerText = "Μη Διαθέσιμο"
    const oldCol = document.getElementById("profileUplInfo").style.color
    document.getElementById("profileUplInfo").style.color = "red"
    setTimeout(function () {
        document.getElementById("profileUplInfo").style.color = oldCol
        document.getElementById("profileUplInfo").innerText = "Επεξεργασία"
    }, 1500)
}
function truncateString(str) {
    if (str.length > 28) {
        return str.substring(0, 28) + '..';
    }
    return str;
}

let oldHTML2;
let skipLoad;
function showRecents() {
    if (localStorage.getItem("extVOASA")) {
        document.getElementById("floridaCont").style.overflow = "hidden"
        oldHTML2 = document.getElementById("changingICON2").innerHTML
        document.getElementById("changingICON2").innerHTML = `<svg style="margin-left: 0;margin-right: 0;" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.3s"
          repeatCount="indefinite"/>
        </path>
      </svg>`

        document.getElementById('recentsContainer').innerHTML = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
       width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
      <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
        s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
        c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
      <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
        C22.32,8.481,24.301,9.057,26.013,10.047z">
        <animateTransform attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.3s"
          repeatCount="indefinite"/>
        </path>
      </svg>`
        skipLoad = setTimeout(function () {
            document.getElementById("recents").classList.add('active')
        }, 1500)
        fetch('https://florida.evoxs.xyz/recents', {
            method: 'POST',
            body: JSON.stringify({
                'deviceId': localStorage.getItem("extVOASA"),
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
            if (!data) {
                return;
            }
            document.getElementById("recentsInfo").innerHTML = `Πρόσφατα`
            const final = JSON.parse(data.value)
            if (!final) {
                console.warn("No Notifications!")
                document.getElementById('recentsContainer').innerHTML = `<div class="option">
                <span>Καμία Ειδοποιήση</span></div>`
                document.getElementById("recents").classList.add('active')
                return;
            }
            console.log(final)
            console.log(final.username)
            document.getElementById('recentsContainer').innerHTML = ""
            let number = 0
            if (JSON.stringify(final.notifications) === '[]') {
                console.warn("No Notifications!")
                document.getElementById('recentsContainer').innerHTML = `<div class="option">
                <span>Καμία Ειδοποιήση</span></div>`
                document.getElementById("recents").classList.add('active')
                return;
            }
            final.notifications.forEach(notif => {
                if (number > 10) {
                    return;
                }
                number = number + 1
                console.log(notif)
                const payload = JSON.parse(notif.payload)
                let theNoti = document.getElementById('recentsContainer');


                // Create a new div element
                let newDiv = document.createElement('div');
                newDiv.className = 'option';

                let span;
                if (payload.title === "Gateway") {
                    span = document.createElement('img');
                    span.src = 'https://evoxs.xyz/notifications_assets/Gateway.png';
                } else if (payload.title === "Novus") {
                    span = document.createElement('img');
                    span.src = 'https://evoxs.xyz/notifications_assets/Notice.png';
                } else if (payload.title === "Notice") {
                    span = document.createElement('img');
                    span.src = 'https://evoxs.xyz/notifications_assets/Error.png';
                } else if (payload.title === "Welcome back") {
                    span = document.createElement('img');
                    span.src = 'https://evoxs.xyz/notifications_assets/Gateway.png';
                } else if (payload.title.includes("Schedo")) {
                    span = document.createElement('img');
                    span.src = './complete.png';
                } else if (payload.title === "Ειδοποίηση λεωφορείου") {
                    span = document.createElement('img');
                    span.src = './bus.png';
                } else if (payload.title.includes("έτοιμα")) {
                    span = document.createElement('img');
                    span.src = './ready.png';
                } else if (payload.title.includes("Γεια,")) {
                    span = document.createElement('img');
                    span.src = './wave.png';
                } else {
                    span = document.createElement('span');
                    span.innerHTML = payload.title;
                }


                // Create h4 and p elements
                let vo = document.createElement('vo');
                vo.textContent = truncateString(payload.body);



                // Append h4 and p to the new div
                newDiv.appendChild(span);
                newDiv.appendChild(vo);

                // Append the new div to the element with id "theNoti"
                theNoti.appendChild(newDiv);
            });
            document.getElementById("recents").classList.add('active')
        }).catch(error => {
            console.error("an error occured:", error)
            document.getElementById("netStats").innerHTML = offlineSvg
            clearTimeout(skipLoad)
            document.getElementById("changingICON2").innerHTML = `<img src='snap.png' style='width:20px;height:20px'>`
            document.getElementById("recentsInfo").innerHTML = `Διακομιστής&nbsp;μη&nbsp;προσβάσιμος`
            setTimeout(function () {
                document.getElementById("recentsInfo").innerHTML = `Πρόσφατα`
            }, 10000)
        });

        loadDevices()


    } else {
        console.log("External V:", localStorage.getItem("extVOASA"))
    }
}

function loadDevices() {
    const cont = document.getElementById("devices")
    cont.innerHTML = `<svg class="fade-in-slide-up" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px"
                            viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                            <path opacity="0.2" fill="#fff"
                                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                            <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                         C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml" attributeName="transform" type="rotate"
                                    from="0 20 20" to="360 20 20" dur="0.3s" repeatCount="indefinite" />
                            </path>
                        </svg>`
                        cont.style.display = null
    fetch(`https://florida.evoxs.xyz/devices?username=${localStorage.getItem("t50-username")}&password=${atob(localStorage. getItem("t50pswd"))}`)
        .then(response => response.json())
        .then(devs => {
            cont.innerHTML = ''
            devs.forEach(dev => {
                if(dev.os) {
                    let icon;
                    let type;
                    if(dev.os === 'macOS') {
                        icon = './appleDevice.png'
                        type = 'iPhone'
                    } else if(dev.os === 'Android') {
                        icon = './androidDevice.png'
                        type = 'Android'
                    } else {
                        icon = './linuxDevice.png'
                        type = 'Linux'
                    }

                    let add = ''
                    if(dev.extV === localStorage.getItem("extVOASA")) {
                        add = 'style="background-color:rgb(0, 92, 190)"'
                    }
                    cont.innerHTML = `${cont.innerHTML}<div ${add} onclick='alert("${dev.extV}")' class="option"><img src="${icon}">
                        <span>${type}</span>
                        <vo>${dev.last_used}</vo>
                    </div>`
                } else {
                    cont.innerHTML = `${cont.innerHTML}<div onclick='alert("${dev.extV}")' class="option">
                        <span>Unknown</span>
                        <vo>${dev.extV}</vo>
                    </div>`
                }
                
            })
        })
        .catch(error => {
            cont.style.display = 'none'
            console.error("Error fetching or processing devices:", error);
        });

}

function returnToHome2() {
    document.getElementById('recents').classList.remove('active')
    document.getElementById("changingICON2").innerHTML = oldHTML2
    try {
        clearInterval(skipLoad)
    } catch (error) {
        console.log("Ignoring Interval Error")
    }
}

const myDiv = document.getElementById('recents');
let touchStartX = 0;
let touchEndX = 0;

myDiv.addEventListener('touchstart', function (event) {
    const touch = event.touches[0];
    touchStartX = touch.clientX;
});

myDiv.addEventListener('touchend', function (event) {
    const touch = event.changedTouches[0];
    touchEndX = touch.clientX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 30; // Minimum distance to consider it a swipe
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > swipeThreshold) {
        console.log('Swiped right!');
        returnToHome2()
    }
    // else if (swipeDistance < -swipeThreshold) {
    //    console.log('Swiped left!');
    //}
}

const myDiv2 = document.getElementById('personal');
let touchStartX2 = 0;
let touchEndX2 = 0;

myDiv2.addEventListener('touchstart', function (event) {
    const touch = event.touches[0];
    touchStartX2 = touch.clientX;
});

myDiv2.addEventListener('touchend', function (event) {
    const touch = event.changedTouches[0];
    touchEndX2 = touch.clientX;
    handleSwipeGesture2();
});

function handleSwipeGesture2() {
    const swipeThreshold = 30; // Minimum distance to consider it a swipe
    const swipeDistance = touchEndX2 - touchStartX2;

    if (swipeDistance > swipeThreshold) {
        console.log('Swiped right!');
        returnToHome()
    }
    // else if (swipeDistance < -swipeThreshold) {
    //    console.log('Swiped left!');
    //}
}

function deleteElementById(elementId) {
    // Find the element by its id
    const element = document.getElementById(elementId);

    // If the element exists, remove it
    if (element) {
        element.remove();
    } else {
        console.log(`Element with id "${elementId}" not found.`);
    }
}

function isComputer() {
    const userAgent = navigator.userAgent;

    // Regular expressions for different types of devices
    const mobileRegex = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const tabletRegex = /Tablet|iPad/i;

    // Check for mobile or tablet
    const isMobile = mobileRegex.test(userAgent);
    const isTablet = tabletRegex.test(userAgent);

    // If it's not mobile and not tablet, it's likely a computer
    return !isMobile && !isTablet;
}

// Usage example
if (isComputer()) {

    console.log("This device is a computer.");
    //const theElemP1 = document.getElementById("popIt").innerHTML
    //deleteElementById("myElementId");
    //const phone = document.getElementById("phone")
    //phone.innerHTML = `${phone.innerHTML}<div id="popIt" class="popup">${theElemP1}</div>`
}

function updateServiceWorkerCache() {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            action: 'UPDATE_CACHE'
        });
    } else {
        console.log('No active service worker found.');
    }
}


function rotateElement() {
    // Get the element by its ID
    const element = document.getElementById('updateNow');

    // Check if the element exists
    if (element) {
        element.classList.add('scale-animation')
    }
    return;
    if (element) {
        // Get the current rotation angle
        const currentRotationMatch = element.style.transform.match(/rotate\((\d+)deg\)/);

        // Initialize current rotation to 0 if not set
        let currentRotation = 0;
        if (currentRotationMatch) {
            currentRotation = parseInt(currentRotationMatch[1], 10);
        }

        // Increment the current rotation by 45 degrees
        let newRotation = currentRotation + 365;

        // Apply the new rotation to the element
        element.style.transform = `rotate(${newRotation}deg)`;
    }
}

function updateNew() {
    rotateElement()
    setTimeout(function () {
        rotateElement()
        setTimeout(function () {
            updateServiceWorkerCache()
            rotateElement()
            sessionStorage.setItem("updateSuccess", true)
            document.getElementById("updateAvailable").innerHTML = `Επανεκκίνηση.. <svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
<circle cx="12" cy="12" r="9" fill="#2A4157" fill-opacity="0.24"/>
<path d="M12 21C14.0822 21 16.1 20.278 17.7095 18.9571C19.3191 17.6362 20.4209 15.798 20.8271 13.7558C21.2333 11.7136 20.9188 9.59376 19.9373 7.75743C18.9558 5.9211 17.3679 4.48191 15.4442 3.68508C13.5205 2.88826 11.38 2.78311 9.38744 3.38754C7.3949 3.99197 5.67358 5.26858 4.51677 6.99987C3.35997 8.73115 2.83925 10.81 3.04334 12.8822C3.24743 14.9543 4.1637 16.8916 5.63604 18.364" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
<path d="M16 10L12.402 14.3175C11.7465 15.1042 11.4187 15.4976 10.9781 15.5176C10.5375 15.5375 10.1755 15.1755 9.45139 14.4514L8 13" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
</svg>`
            setTimeout(function () {
                //alert("updating")
                window.location.reload()


            }, 800)

        }, 800)
    }, 800)
}

const scrollToClose = document.getElementById('popIt');
let touchStartYS = 0;
let touchEndYS = 0;

scrollToClose.addEventListener('touchstart', function (event) {
    const touch = event.touches[0];
    touchStartYS = touch.clientY;
    console.log('Touch Start Y:', touchStartYS); // Debug log
});

scrollToClose.addEventListener('touchend', function (event) {
    const touch = event.changedTouches[0];
    touchEndYS = touch.clientY;
    console.log('Touch End Y:', touchEndYS); // Debug log
    handleSwipeGestureView();
});

function handleSwipeGestureView() {
    const swipeThreshold = 150; // Minimum distance to consider it a swipe
    const swipeDistance = touchEndYS - touchStartYS;
    console.log('Swipe Distance:', swipeDistance); // Debug log

    if (swipeDistance > swipeThreshold) {
        console.log('Swiped down!');
        document.getElementById('phone').style.transform = ''
        document.getElementById("main-wrapper").style.overflow = 'auto'
        isCustom = false
        goBack()
    } else {
        console.log('Swipe too short or swiped up.');
    }
}

if (localStorage.getItem("t50-username") || localStorage.getItem("isNewOasa") === "false") {
    console.log("User is not new")
} else {
    document.getElementById("setup").classList.add("active")
    setThemeColors('#121212')

    document.getElementById("phone").classList.add('out')
    document.getElementById("homePage").style.display = "none"
    //document.getElementById("newUser").style.display = ""
    document.getElementById("grabFlorida").style.display = 'none'
    //continueSetup()
    //TEMP%document.getElementById("floridaCont").classList.add("active")
}
function setupStep(step) {
    const dot1 = document.getElementById("dot-1");
    const dot2 = document.getElementById("dot-2");
    const infos = document.querySelectorAll('.setup .info .info'); // Nested .info structure is preserved
    const currentInfo = infos[0];
    const nextInfo = infos[1];

    if (step) {
        // Move backward: from second info to first info
        dot2.classList.remove('active');
        dot1.classList.add('active');

        // Add backward animation classes
        currentInfo.classList.add('slide-out-right');
        nextInfo.classList.add('slide-in-left');
    } else {
        // Move forward: from first info to second info
        dot1.classList.remove('active');
        dot2.classList.add('active');

        currentInfo.classList.add('slide-out-left');
        nextInfo.classList.add('slide-in-right');
    }

    // Cleanup and animation end handling
    const handleAnimationEnd = (e) => {
        e.target.style.display = e.target === nextInfo ? 'block' : 'none';
        e.target.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
        e.target.removeEventListener('animationend', handleAnimationEnd);
    };

    // Attach event listeners for animations
    currentInfo.addEventListener('animationend', handleAnimationEnd);
    nextInfo.addEventListener('animationend', handleAnimationEnd);

    // Display settings for buttons
    if (step) {
        $("#buttonNext").fadeIn("fast");
        $("#skip").fadeIn("fast");
    } else {
        $("#buttonNext").fadeOut("fast");
        $("#skip").fadeOut("fast");
        $("#goBackToLanding").fadeIn("fast");
    }
}

function setupNext(step) {
    if (!step) {
        const infos = document.querySelectorAll('.setup .info .info');
        const currentInfo = infos[0];
        const nextInfo = infos[1];

        console.log('C', currentInfo)
        console.log('n', nextInfo)
        // Add animation classes
        currentInfo.classList.add('slide-out-left');
        nextInfo.classList.add('slide-in-right');

        // Wait for the animation to finish, then update display
        currentInfo.addEventListener('animationend', () => {
            currentInfo.style.display = 'none';
            currentInfo.classList.remove('slide-out-left');
        });


        nextInfo.addEventListener('animationend', () => {
            currentInfo.style.display = 'none';
            nextInfo.classList.remove('slide-in-right');
            nextInfo.style.display = 'block';
        });
        nextInfo.style.display = 'block';

        $("#buttonNext").fadeOut("fast");
        $("#skip").fadeOut("fast");
        $("#goBackToLanding").fadeIn("fast");
        document.getElementById("dot-1").classList.remove('active')
        document.getElementById("dot-2").classList.add('active')
    } else {
        const infos = document.querySelectorAll('.setup .info .info');
        const currentInfo = infos[1];
        const nextInfo = infos[0];

        console.log('C', currentInfo)
        console.log('n', nextInfo)
        // Add animation classes
        currentInfo.classList.add('slide-out-left');
        nextInfo.classList.add('slide-in-right');

        // Wait for the animation to finish, then update display
        currentInfo.addEventListener('animationend', () => {
            currentInfo.style.display = 'none';
            nextInfo.style.display = 'block'
            currentInfo.classList.remove('slide-out-left');
        });


        nextInfo.addEventListener('animationend', () => {

            nextInfo.classList.remove('slide-in-right');
        });
        nextInfo.style.display = 'block';
        $("#buttonNext").fadeIn("fast");
        $("#skip").fadeIn("fast");
        $("#goBackToLanding").fadeOut("fast");
        document.getElementById("dot-1").classList.add('active')
        document.getElementById("dot-2").classList.remove('active')
    }

}

function forLoginToEvox() {
    setTimeout(function () {
        //florida()
        //document.getElementById("floridaCont").classList.add("active")
        document.getElementById("setupPage").style.display = 'flex'
        continueSetup()
        $("#setup").fadeOut("fast")
        setThemeColors('#1C1B1E')
    }, 400)

}

function dismissSetup() {
    setThemeColors('#1C1B1E')
    $("#setup").fadeOut("fast")
    localStorage.setItem("isNewOasa", 'false')
    localStorage.setItem("hasDismissedSetup", 'true')
    document.getElementById("floridaCont").classList.remove("active")
    document.getElementById("phone").classList.remove('out')
    setThemeColors(stockStatusBC)
    setTimeout(function () {
        document.getElementById("homePage").style.display = ""
        document.getElementById("newUser").style.display = "none"
        document.getElementById("grabFlorida").style.display = ''
    }, 800)

}

function startSetup() {
    document.getElementById("phone").classList.add('out')
    document.getElementById("step2").classList.add("active")
}

function goBackToSetup(step) {
    if (step === "1") {
        document.getElementById("phone").classList.add('out')
        document.getElementById("step2").classList.remove("active")
    }
}

function disableElementById(id) {

    document.getElementById(id).classList.add('disabled');
}

function enableElementById(id) {
    document.getElementById(id).classList.remove('disabled');
}

function checkBoxThis(element) {
    const cMaxValue = element.getAttribute('c-max');
    console.log(cMaxValue)
    if (document.getElementById(`vo${cMaxValue}`).innerHTML.includes(`Unchecked`)) {
        document.getElementById(`vo${cMaxValue}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#fff"/>
                        </g>
                    </svg>`
        //make it checked
        if (cMaxValue === "2") {
            checkBoxCmax('3', 'onlyCheck')
            checkBoxCmax('4', 'onlyCheck')
            disableElementById('voc3')
            disableElementById('voc4')
        }
        if (cMaxValue === "4") {
            checkBoxCmax('3', 'onlyCheck')
            checkBoxCmax('2', 'onlyCheck')
            disableElementById('voc3')
            disableElementById('voc2')
        }
        if (cMaxValue === "1") {
            $("#preventContinue").fadeIn("fast")
        }
    } else {
        document.getElementById(`vo${cMaxValue}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <circle cx="12" cy="12" r="10" fill="#fff"/>
                            <!--Unchecked-->
                        </g>
                    </svg>`
        if (cMaxValue === "2") {
            checkBoxCmax('3')
            checkBoxCmax('4')
            enableElementById('voc3')
            enableElementById('voc4')
        }

        if (cMaxValue === "4") {
            checkBoxCmax('3')
            checkBoxCmax('2')
            enableElementById('voc3')
            enableElementById('voc2')
        }

        if (cMaxValue === "1") {
            $("#preventContinue").fadeOut("fast")
        }
    }
    console.log("Will access", `vo${cMaxValue}`)


}

function checkBoxCmax(cMaxValue, bypass) {
    if (bypass === "onlyCheck") {
        document.getElementById(`vo${cMaxValue}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#fff"/>
                        </g>
                    </svg>`
        return;
    }
    if (document.getElementById(`vo${cMaxValue}`).innerHTML.includes(`Unchecked`)) {
        document.getElementById(`vo${cMaxValue}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-.997-6l7.07-7.071-1.414-1.414-5.656 5.657-2.829-2.829-1.414 1.414L11.003 16z" fill="#fff"/>
                        </g>
                    </svg>`
        //make it checked
    } else {
        document.getElementById(`vo${cMaxValue}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24">
                        <g>
                            <path fill="none" d="M0 0h24v24H0z"/>
                            <circle cx="12" cy="12" r="10" fill="#fff"/>
                            <!--Unchecked-->
                        </g>
                    </svg>`
    }
}

function continueSetup() {
    const askedServices = ['oasa', 'evox', 'offline', 'florida']
    let vo1 = document.getElementById("vo1").innerHTML
    let vo2 = document.getElementById("vo2").innerHTML
    let vo3 = document.getElementById("vo3").innerHTML
    let vo4 = document.getElementById("vo4").innerHTML
    let vo5 = document.getElementById("vo5").innerHTML
    //if (vo1.includes("Unchecked")) {
    //    console.log("Setup cancelled")
    //    return;
    //} else {
    askedServices.push("oasa")
    if (!vo2.includes("Unchecked")) {
        askedServices.push("florida")
    }
    if (!vo3.includes("Unchecked")) {
        askedServices.push("evox")
    }
    if (!vo4.includes("Unchecked")) {
        askedServices.push("offline")
    }
    if (!vo5.includes("Unchecked")) {
        askedServices.push("devmode")
    }
    console.log(askedServices)
    console.log(`askedServ: ${askedServices}\nt/f: ${askedServices.includes('oasa')}`)
    //continue;
    if (askedServices.includes('devmode')) {
        localStorage.setItem("showDebug", true)
        document.getElementById('debug').style.display = ''
    }
    if (askedServices.includes('florida')) {
        document.getElementById("step2").classList.remove("active")

        setup_begin()
        setTimeout(function () {
            document.getElementById("newUser").style.display = 'none'
            setTimeout(function () {
                document.getElementById("grabFlorida").style.display = ''
            }, 800)
        }, 800)
        return;
    }
    //if (askedServices.includes('oasa')) {
    //    console.log("will only do oasa")
    //    localStorage.setItem("isNewOasa", 'false')
    //    document.getElementById("floridaCont").classList.remove("active")
    //    document.getElementById("phone").classList.remove('out')
    //    setTimeout(function () {
    //        document.getElementById("homePage").style.display = ""
    //        document.getElementById("newUser").style.display = "none"
    //        document.getElementById("grabFlorida").style.display = ''
    //        document.getElementById("step2").classList.remove("active")
    //    }, 800)
    //} else {
    //    console.log(`askedServ: ${askedServices}\nt/f: ${askedServices.includes('oasa')}`)
    //}




    //}

}

function scrollToBottom2() {
    try {
        var debugDiv = document.getElementById('fullDebug');
        debugDiv.scrollTop = debugDiv.scrollHeight - debugDiv.clientHeight;
    } catch (error) {
        console.log("Scroll Failed")
    }

}

let debug2Int;

function openFullScreen() {
    document.getElementById("popIt2").classList.add("active")
    document.getElementById("fullDebug").innerHTML = document.getElementById("theDebug").innerHTML

    debug2Int = setInterval(function () {
        document.getElementById("fullDebug").innerHTML = document.getElementById("theDebug").innerHTML
        const fullDebugElement = document.getElementById('fullDebug');
        let text = fullDebugElement.innerHTML;
        text = text.replace(/Service Worker/g, '<span style="color: red">Service Worker</span>');
        text = text.replace(/ServiceWorker/g, '<span style="color: red">ServiceWorker</span>');
        text = text.replace(/Copyright © Evox 2024/g, '<span style="color: lime">Copyright © Evox 2024</span>');

        const regex = /\[(\d+)\]/g;
        text = text.replace(regex, function (match, p1) {
            return '<span class="highlight">[' + p1 + ']</span>';
        });
        fullDebugElement.innerHTML = text;
    }, 1000)
    scrollToBottom2()
}
//OASA LIVE
function findBus(id, el) {

    if (el) {

        el.querySelector('.loadingIndicatorNOCLASS').innerHTML = `<svg class="fade-in-slide-up" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px"
                            viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                            <path opacity="0.2" fill="#fff"
                                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                            <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                         C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml" attributeName="transform" type="rotate"
                                    from="0 20 20" to="360 20 20" dur="0.3s" repeatCount="indefinite" />
                            </path>
                        </svg>`
    }

    if (id === 'T7' || id === 'Τ7') {
        //alert("?")
        el.querySelector('.loadingIndicatorNOCLASS').innerHTML = ''
        processSTASY("Τ7")
        return;
    } else {
        document.getElementById("showMore").style.display = null
    }
    const lineIdToFind = id;
    let matchingLines = fullLine.filter(line => line.LineID === lineIdToFind);
    if (el) {
        console.log("Will Edit [STOPS]:", matchingLines);
        const innerTxt = el.getAttribute("data-name");
        console.log("[STOPS]", innerTxt);
        matchingLines = matchingLines.filter(line => line.LineDescr === innerTxt);  // Reassign matchingLines
        console.log("FILTERED [STOPS]:", matchingLines);
    }
    activeBusPage = id
    // Log the LineDescr of each matching line
    matchingLines.forEach(line => {
        console.log("here", line)
        console.log(line.LineDescr);
        console.log('Line Code:', line.LineCode);

        if (matchingLines.length > 1) {
            console.log("Handling Multiple Lines. May Fail")
            //alert("Cannot handle multiple lines")
            //return;
            if (el) {
                matchingLines.forEach(handle => {
                    const toFind = `${capitalizeWords(handle.LineDescr)}`
                    if (el.querySelector('.button-text').innerHTML === toFind) {
                        findStops(handle.LineCode, el)
                        console.log(`Found ${toFind} in ${handle.LineDescr} so will choose that`)
                        activeBusNamePage = line.LineDescr
                    } else {
                        console.warn(`${toFind} !== ${handle.LineDescr}`)
                    }
                })
                console.log("El ok")
            } else {
                if (matchingLines[0].LineDescr.length < matchingLines[1].LineDescr.length) {
                    findStops(matchingLines[0].LineCode, el)
                    activeBusNamePage = line.LineDescr
                } else {
                    findStops(matchingLines[1].LineCode, el)
                    activeBusNamePage = line.LineDescr
                }
            }


            console.log("Will handle multiple");
        } else {
            findStops(line.LineCode)
            activeBusNamePage = line.LineDescr
        }
    });

    // Optional: If you want to handle the case where no matches are found
    if (matchingLines.length === 0) {
        console.log("No matching lines found.");
        alert("Δεν βρέθηκαν αντίστοιχες λεωφορειακές γραμμές.")
    }
}

function showAllInStop(name, code, el) {
    if (name && code) {
        el.innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
   width="25px" height="25px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
  <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
  <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 20 20"
      to="360 20 20"
      dur="0.4s"
      repeatCount="indefinite"/>
    </path>
  </svg>`
        activeStop.code = code
        activeStop.name = name
        showCurrentStop('deleteAfter', el)
    }
}

function processSTASY(id) {
    if (id === 'Τ7' || id === "T7") {
        document.getElementById("showMore").style.display = 'none';
        document.getElementById("whatBus").innerHTML = 'ALPHA-T7-VOX';
        document.getElementById("16defTime").style.display = "none";
        document.getElementById("16gounTime").style.display = "none";
        document.getElementById("049live1").style.display = "none";
        document.getElementById("049live2").style.display = "none";
        document.getElementById("831live1").style.display = "none";
        document.getElementById("evoxBased").innerHTML = "";
        document.getElementById("904live1").style.display = "none";
        document.getElementById("popIt").classList.add("active");

        fetch(`./T7BETA.json`)
            .then(response => response.json())
            .then(t7 => {
                let readyJSON = {
                    "future": [],
                    "past": null // Initialize `past` as null
                };

                const now = new Date();

                t7.evox_oasa.forEach(start => {
                    start.times.forEach(timeStr => {
                        const timeDate = parseTimeToDate(timeStr, now);
                        if (timeDate >= now) {
                            // Future times
                            readyJSON.future.push({ time: timeStr, date: timeDate });
                        } else {
                            // Past times
                            if (!readyJSON.past || timeDate > readyJSON.past.date) {
                                readyJSON.past = { time: timeStr, date: timeDate }; // Store the latest past time
                            }
                        }
                    });
                });

                // Sort future times in ascending order
                readyJSON.future.sort((a, b) => a.date - b.date);
                readyJSON.future = readyJSON.future.map(item => item.time);

                // If there's a past time, set it as a string
                if (readyJSON.past) {
                    readyJSON.past = readyJSON.past.time; // Only return the time of the closest past time
                }

                console.log("Fixed Ready T7 JSON:", readyJSON);

                // Display the fixed output
                //document.getElementById("evoxBased").innerHTML = JSON.stringify(readyJSON, null, 2);
                document.getElementById("evoxBased").innerHTML = '';
                readyJSON.future.forEach(function (remainTime) {
                    // Create the main div element with the class 'timeBox'
                    var timeBox = document.createElement('div');
                    timeBox.className = 'timeBox';
                    //timeBox.onclick = function () {
                    //    handleTimeBoxClick(this)
                    //}

                    let textNode;
                    textNode = document.createTextNode('Ασκληπιείο Βούλας');


                    // Append the text node to the main div element
                    timeBox.appendChild(textNode);

                    // Create the span element and set its content to '10m'
                    var span = document.createElement('span');
                    span.innerHTML = remainTime;

                    // Append the span element to the main div element
                    timeBox.appendChild(span);
                    //if (localStorage.getItem("extVOASA")) {
                    //    span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                    //    var optDiv = document.createElement('div');
                    //    optDiv.style.display = 'none'
                    //    optDiv.style.height = 'auto'
                    //    timeBox.appendChild(optDiv);
                    //}

                    // Optionally, append the timeBox to the body or another element in the DOM
                    document.getElementById("evoxBased").appendChild(timeBox);
                })
            })
            .catch(error => {
                console.error("Error fetching or processing T7BETA.json:", error);
            });
    }
}

// Helper function: Parse time string and return a Date object
function parseTimeToDate(timeString, now) {
    const timeParts = timeString.match(/(\d{2}):(\d{2})/);
    if (!timeParts) return null; // Invalid format
    const [_, hours, minutes] = timeParts.map(Number);

    const date = new Date(now);
    date.setHours(hours, minutes, 0, 0);

    // If time has passed today, shift it to tomorrow
    if (date < now) {
        date.setDate(date.getDate() + 1);
    }
    return date;
}


function getStopInfo(stopA) {
    return new Promise((resolve, reject) => {
        const getStops = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`);
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${getStops}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    const working = data[0].route_code;
                    const stopsFinal = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutesDetailsAndStops&p1=${working}&keyOrigin=evoxEpsilon`);
                    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stopsFinal}`)
                        .then(response => response.json())
                        .then(bata => {
                            let foundStop = null;
                            bata.stops.forEach(stop => {
                                if (stop.StopDescr === stopA) {
                                    foundStop = {
                                        stopCode: stop.StopCode,
                                        lineCode: lineCode,
                                        StopDescr: stop.StopDescr,
                                        StopDescrUI: capitalizeWords(stop.StopDescr)
                                    };
                                }
                            });
                            if (foundStop) {
                                resolve(foundStop);
                            } else {
                                reject('Stop not found');
                            }
                        })
                        .catch(error => {
                            console.log("FindStops [2] error:", error);
                            reject(error);
                        });
                } else {
                    reject('No data found');
                }
            })
            .catch(error => {
                console.log("FindStops EXT [1] error:", error);
                reject(error);
            });
    });
}


function capitalizeWords(str) {
    return str
        .toLowerCase() // Ensure the rest of the letters are lowercase
        .replace(/h/g, 'η') // Replace all lowercase "h" with "η"
        .split(' ') // Split the string into an array of words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
        .join(' '); // Join the words back into a single string
}

function isNearEvery3Hours(proximityInMinutes = 5) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Find the closest multiple of 3 to the current hour
    const closest3HourMark = Math.round(currentHour / 3) * 3;

    // Create a Date object for that time (using today's date)
    const closest3HourTime = new Date(now);
    closest3HourTime.setHours(closest3HourMark, 0, 0, 0); // Set to nearest 3-hour mark, with minutes and seconds as 0

    // Calculate the difference in minutes
    const diffInMilliseconds = Math.abs(now - closest3HourTime);
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // 60000 ms = 1 minute

    // Return true if the time is within the proximity
    return diffInMinutes <= proximityInMinutes;
}

function getStop(stopCode, lineCode, elementForLoading, stopName) {
    console.log("Line Code:", lineCode)
    //activeBusNamePage = capitalizeWords(busName)
    document.getElementById('alert').classList.remove('active')
    activeStop = {
        "name": stopName,
        "code": stopCode
    }

    document.getElementById("busLine").innerText = activeBusPage
    document.getElementById("stopName").innerText = capitalizeWords(stopName)
    document.getElementById("activeBuses").innerHTML = ''
    elementForLoading.querySelector('.loadingIndicatorNOCLASS').innerHTML = `<svg class="fade-in-slide-up" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px"
                            viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                            <path opacity="0.2" fill="#fff"
                                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                            <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                         C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml" attributeName="transform" type="rotate"
                                    from="0 20 20" to="360 20 20" dur="0.3s" repeatCount="indefinite" />
                            </path>
                        </svg>`
    const one = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutes&p1=${lineCode}&keyOrigin=evoxEpsilon`);
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${one}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("alert").classList.add("active")
            if (data) {

                console.log(data)
                const work = data[0].RouteCode

                const stop_url = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopCode}&keyOrigin=evoxEpsilon`);
                fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stop_url}`)
                    .then(response => response.json())
                    .then(arrivals => {
                        let matchFound = false; // Flag to track if a match is found

                        arrivals.forEach(arrive => {
                            if (arrive.route_code === work) {
                                document.getElementById("activeBuses").innerHTML = `${document.getElementById("activeBuses").innerHTML}${arrive.btime2} λεπτά<br>`
                                //alert(`${arrive.btime2} λεπτά`);
                                matchFound = true; // Set flag to true if a match is found
                            }
                        });

                        elementForLoading.querySelector('.loadingIndicatorNOCLASS').innerHTML = ''

                        // If no match was found, alert the user
                        if (!matchFound) {
                            document.getElementById("activeBuses").innerHTML = `Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [!matchFound]`
                            //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [!matchFound]");
                        }
                    })
                    .catch(error => {
                        document.getElementById("activeBuses").innerHTML = `Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]`
                        //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]");
                        console.log("getStop [2] error:", error);
                        elementForLoading.querySelector('.loadingIndicatorNOCLASS').innerHTML = ''
                    });
            } else {
                document.getElementById("activeBuses").innerHTML = `Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [null]`
                //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [null]")
            }

        })
        .catch(error => {
            console.log("getStop [1] error:", error)
            elementForLoading.querySelector('.loadingIndicatorNOCLASS').innerHTML = ''
            if (error.toString().includes('Unexpected token')) {
                //alert("OASA SQL error. Δοκιμάστε ξανά.")
                console.warn("Attempting to fix")
                getStop(stopCode, lineCode)
            }
        })

}

let pending = null
let currentLineCode = null
let currentRouteCode = null
let currentLineInfo = null

let chosenStopsMethod = 'default'
function findStops(lineCode, sentElementByfindBus) {
    currentLineCode = lineCode
    const getStops = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`);
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${getStops}`)
        .then(response => response.json())
        .then(data => {

            if (data) {
                const working = data[0].route_code
                currentRouteCode = working
                console.log(working)//
                $("#allBusesContainer").fadeOut("fast")

                //document.getElementById("spawnStopsHere").style.display = 'flex'
                if (chosenStopsMethod === 'default') {
                    document.getElementById("spawnStopsHere").style.display = 'flex'
                }
                document.getElementById("searchHere").style.display = 'none'
                document.getElementById("spawnHere").style.display = 'none'
                let randomId = Math.floor(1000000000 + Math.random() * 9000000000);
                const lc = localStorage.getItem("oasa_favorites")
                //document.getElementById("favoriteBusButton").style.display = 'block'
                document.getElementById("rowBox").style.display = 'flex'
                document.getElementById("isFavorite").style.display = 'flex'
                document.getElementById("currentBusNameUI").style.display = 'flex'
                document.getElementById("dailytimetable").style.display = 'flex'
                document.getElementById("goback").style.display = 'block'
                document.getElementById("currentBusName").innerText = activeBusPage
                if (lc) {
                    const fav = document.getElementById("isFavorite")
                    const string = lc
                    console.log(string)
                    if (string.includes(`"${activeBusPage}"`)) {
                        //alert("is favorite")

                        fav.setAttribute("data-f", "true")
                        fav.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#fff"/>
                                    </svg>`
                        //fav.classList.remove("red")
                        fav.classList.add("favoriteBus")
                    } else {
                        fav.setAttribute("data-f", "false")
                        fav.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        stroke="#fff" stroke-width="1.5" />
                                </svg>`
                        //fav.classList.add("red")
                        fav.classList.remove("favoriteBus")
                    }

                }
                document.getElementById("spawnStopsHere").innerHTML = `<svg id="${randomId}" class="fade-in-slide-up" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px"
                                viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                <path opacity="0.2" fill="#fff"
                                    d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                             s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                             c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                                <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                             C22.32,8.481,24.301,9.057,26.013,10.047z">
                                    <animateTransform attributeType="xml" attributeName="transform" type="rotate"
                                        from="0 20 20" to="360 20 20" dur="0.3s" repeatCount="indefinite" />
                                </path>
                            </svg>`
                if (sentElementByfindBus) {
                    sentElementByfindBus.querySelector('.loadingIndicatorNOCLASS').innerHTML = ''
                    resizeInput('blur')
                    $("#svgClear").fadeOut("fast")
                }

                const stopsFinal = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutesDetailsAndStops&p1=${working}&keyOrigin=evoxEpsilon`);
                fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stopsFinal}`)
                    .then(response => response.json())
                    .then(bata => {
                        currentLineInfo = bata
                        intelligence()
                        if (chosenStopsMethod === 'complete') {
                            return;
                        }
                        let stopPromises = bata.stops.map(stop => {
                            return new Promise((resolve, reject) => {
                                // Spawn the element
                                const element = document.getElementById("spawnStopsHere");
                                element.innerHTML = `${element.innerHTML}<button class="fade-in-slide-up oasaButton" onclick="getStop('${stop.StopCode}', '${lineCode}', this, '${stop.StopDescr}')">${capitalizeWords(stop.StopDescr)}<vox class="loadingIndicatorNOCLASS"></vox></button>`;

                                console.log(stop.StopDescr);

                                // Resolve the promise after the stop is processed
                                resolve();
                            });
                        });

                        // Wait for all promises to resolve (i.e., all stops are spawned)
                        Promise.all(stopPromises)
                            .then(() => {
                                // Code to run after all elements are spawned
                                console.log('All stops have been spawned!');
                                let element_b = document.getElementById(randomId);
                                if (element_b) {
                                    element_b.remove();
                                }
                                // Add additional functionality here
                            })
                            .catch(err => {
                                console.error('An error occurred while spawning stops:', err);
                            });


                    })
                    .catch(error => {
                        console.log("FindStops [2] error:", error)
                        if (error.toString().includes('Unexpected token')) {
                            //alert("OASA SQL error. Δοκιμάστε ξανά.")
                            console.warn("Attempting to fix")
                            findStops(lineCode, sentElementByfindBus)
                        }
                    })
            }

        })
        .catch(error => {
            console.log("FindStops [1] error:", error)
            if (sentElementByfindBus) {
                sentElementByfindBus.querySelector('.loadingIndicatorNOCLASS').innerHTML = ''
            }
            if (error.toString().includes('Unexpected token')) {
                //alert("OASA SQL error. Δοκιμάστε ξανά.")
                console.warn("Attempting to fix")
                findStops(lineCode, sentElementByfindBus)
            }
        })

}


let controller;

function intelligence() {
    controller = new AbortController();
    const signal = controller.signal;
    console.warn("Intelligence Triggered!")
    if (chosenStopsMethod === 'default') {
        return;
    }
    if (currentRouteCode && currentLineInfo) {
        const spawn = document.getElementById("intelligenceSpawn")
        spawn.style.display = 'flex'
        spawn.style.height = '100%'
        spawn.style.justifyContent = 'center'
        spawn.innerHTML = `<div id="wifi-loader" style="margin-top: 50px;">
    <svg class="circle-outer" viewBox="0 0 86 86">
        <circle class="back" cx="43" cy="43" r="40"></circle>
        <circle class="front" cx="43" cy="43" r="40"></circle>
        <circle class="new" cx="43" cy="43" r="40"></circle>
    </svg>
    <svg class="circle-middle" viewBox="0 0 60 60">
        <circle class="back" cx="30" cy="30" r="27"></circle>
        <circle class="front" cx="30" cy="30" r="27"></circle>
    </svg>
    <svg class="circle-inner" viewBox="0 0 34 34">
        <circle class="back" cx="17" cy="17" r="14"></circle>
        <circle class="front" cx="17" cy="17" r="14"></circle>
    </svg>
    <div class="text" data-text="Συλλέγοντας δεδομένα.."></div>
</div>
`
        const intelligenceInfo = {
            "type": "browseStops",
            "route_code": currentRouteCode,
            "stops": currentLineInfo.stops.map(stop => ({
                StopCode: stop.StopCode,
                StopDescr: stop.StopDescr,
                RouteStopOrder: stop.RouteStopOrder,
            }))
        }

        fetch(`https://data.evoxs.xyz/oasa?intelligence=${JSON.stringify(intelligenceInfo)}`, { signal })
            .then(response => response.json())
            .then(arrivals => {
                spawn.innerHTML = ''
                spawn.style.height = 'auto'
                spawn.style.justifyContent = null
                console.log("Intelligence Results:", arrivals)



                arrivals.sort((a, b) => a.RouteStopOrder - b.RouteStopOrder)
                arrivals.forEach(stop => {
                    let toSpawn = stop.time
                    if (toSpawn === null) {
                        toSpawn = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path opacity="0.4" d="M19.53 5.53L5.53 19.53C5.51 19.55 5.5 19.56 5.48 19.57C5.1 19.25 4.75 18.9 4.43 18.52C2.91 16.77 2 14.49 2 12C2 6.48 6.48 2 12 2C14.49 2 16.77 2.91 18.52 4.43C18.9 4.75 19.25 5.1 19.57 5.48C19.56 5.5 19.55 5.51 19.53 5.53Z" fill="#fff"/>
<path opacity="0.4" d="M21.9996 12.0001C21.9996 17.5201 17.5196 22.0001 11.9996 22.0001C10.0096 22.0001 8.15961 21.4201 6.59961 20.4001L20.3996 6.6001C21.4196 8.1601 21.9996 10.0101 21.9996 12.0001Z" fill="#fff"/>
<path d="M21.7709 2.22988C21.4709 1.92988 20.9809 1.92988 20.6809 2.22988L2.23086 20.6899C1.93086 20.9899 1.93086 21.4799 2.23086 21.7799C2.38086 21.9199 2.57086 21.9999 2.77086 21.9999C2.97086 21.9999 3.16086 21.9199 3.31086 21.7699L21.7709 3.30988C22.0809 3.00988 22.0809 2.52988 21.7709 2.22988Z" fill="#fff"/>
</svg>`
                    } else if (toSpawn === false) {
                        toSpawn = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path opacity="0.5" d="M22 19.2058V12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12V19.2058C2 20.4896 3.35098 21.3245 4.4992 20.7504C5.42726 20.2864 6.5328 20.3552 7.39614 20.9308C8.36736 21.5782 9.63264 21.5782 10.6039 20.9308L10.9565 20.6957C11.5884 20.2744 12.4116 20.2744 13.0435 20.6957L13.3961 20.9308C14.3674 21.5782 15.6326 21.5782 16.6039 20.9308C17.4672 20.3552 18.5727 20.2864 19.5008 20.7504C20.649 21.3245 22 20.4896 22 19.2058Z" fill="#fff"/>
<path d="M15 12C15.5523 12 16 11.3284 16 10.5C16 9.67157 15.5523 9 15 9C14.4477 9 14 9.67157 14 10.5C14 11.3284 14.4477 12 15 12Z" fill="#fff"/>
<path d="M10 10.5C10 11.3284 9.55228 12 9 12C8.44772 12 8 11.3284 8 10.5C8 9.67157 8.44772 9 9 9C9.55228 9 10 9.67157 10 10.5Z" fill="#fff"/>
</svg>`
                    } else if (toSpawn === "OASAERR") {
                        toSpawn = `Σφάλμα`
                    }
                    else {
                        toSpawn += "'"
                    }
                    spawn.innerHTML += `<div id="busArrival-${stop.StopCode}-${stop.placement}" class="busArrival">
                            <div>${capitalizeWords(stop.StopDescr)}</div>
                            <span>${toSpawn}</span>
                        </div>`
                })
            })
            .catch(error => {
                console.log("intelligence [1] error:", error);
            });

    } else {
        console.warn("Data not ready")
    }
}

function oasaIntelli() {
    document.getElementById("oasaIntelligence").classList.add('active')
}

function returnFromIntelli() {
    document.getElementById("oasaIntelligence").classList.remove('active')
}

function toggleIntelli() {
    if (chosenStopsMethod === 'default') {
        //enabling Intelli
        chosenStopsMethod = 'complete'
        localStorage.setItem("oasaIntelli", 'enabled')
        document.getElementById("intelliStatus").innerText = 'Ενεργό'
    } else {
        //disabling Intelli
        chosenStopsMethod = 'default'
        localStorage.removeItem("oasaIntelli", 'enabled')
        document.getElementById("intelliStatus").innerText = 'Ανενεργό'
    }
}

if (localStorage.getItem("oasaIntelli")) {
    chosenStopsMethod = 'complete'
    document.getElementById("intelliStatus").innerText = 'Ενεργό'
}
function back() {
    try {
        controller.abort();
    } catch {
        console.log("Controller Abort Failed")
    }

    reloadFavorites()
    document.getElementById("isFavorite").style.display = 'none'
    document.getElementById("currentBusNameUI").style.display = 'none'
    document.getElementById("rowBox").style.display = 'none'
    document.getElementById("favoriteBusButton").style.display = 'none'
    document.getElementById("dailytimetable").style.display = 'none'
    document.getElementById("goback").style.display = 'none'
    document.getElementById('alert').classList.remove('active')
    if (fullLine) {
        document.getElementById("spawnHere").style.display = 'flex'
    } else {
        console.log('FullLINE NOT FOUND')
        const toShow = setInterval(function () {
            if (fullLine) {
                console.log('FullLINE FOUND!')
                document.getElementById("spawnHere").style.display = 'flex'
                clearInterval(toShow)
            }
        }, 200)
    }

    document.getElementById("spawnStopsHere").style.display = 'none'
    document.getElementById("intelligenceSpawn").style.display = 'none'
    document.getElementById("searchHere").style.display = 'none'
    document.getElementById("spawnStopsHere").innerHTML = ''
    document.getElementById("intelligenceSpawn").innerHTML = ''

    const spawnHere = document.getElementById("spawnHere");

    // Get all child elements within the selected element
    let lc = localStorage.getItem("oasa_favorites")
    if (lc) {
        lc = JSON.parse(lc)
    }
    const childElements = spawnHere.children;

    // Loop through each child element
    for (let i = 0; i < childElements.length; i++) {
        const child = childElements[i];

        // Check if the child has the class 'favoriteBus'
        if (child.classList.contains("favoriteBus")) {
            // Do something if it has the class
            if (lc && !lc.includes(child.querySelector('.lineNOCLASS').innerHTML)) {
                child.classList.remove("favoriteBus")
            }
            // You can add any action you want to perform here
        } else {
            if (child.querySelector('.lineNOCLASS')) {
                if (lc && lc.includes(child.querySelector('.lineNOCLASS').innerHTML)) {
                    child.classList.add("favoriteBus")
                }
            }

        }
    }
}

document.getElementById('receiveEnter').addEventListener('input', function () {
    console.log('Input value changed:', document.getElementById('receiveEnter').value);
    $("#allBusesContainer").fadeOut("fast")
    back()
    const substring = document.getElementById('receiveEnter').value

    const targetDivId = 'searchHere'

    const sourceDiv = document.getElementById('spawnHere');
    if (document.getElementById('receiveEnter').value === '') {
        document.getElementById("spawnHere").style.display = 'none'
        $("#allBusesContainer").fadeIn("fast")
        $("#svgClear").fadeOut("fast")
    } else {
        $("#svgClear").fadeIn("fast", function () {
            $(this).css("display", "flex");
        });
        // Select all button elements in the source div
        const buttons = sourceDiv.querySelectorAll('button[data-bus]');

        // Select the target div by ID (create if it doesn't exist)
        let targetDiv = document.getElementById(targetDivId);
        sourceDiv.style.display = 'none'
        targetDiv.style.display = 'flex'


        // Clear the target div (optional)
        targetDiv.innerHTML = '';

        // Loop through each button and append it to the target div if the attribute contains the substring
        buttons.forEach(button => {
            const busValue = button.getAttribute('data-bus');
            const busNameValue = button.getAttribute('data-name').toLocaleLowerCase();
            if (busValue.includes(substring)) {
                // Clone the button to preserve the original
                const buttonClone = button.cloneNode(true);
                targetDiv.appendChild(buttonClone);
            } else if (busNameValue.includes(substring)) {
                const buttonClone = button.cloneNode(true);
                targetDiv.appendChild(buttonClone);
            }
        });
    }
});

document.getElementById('receiveEnter').addEventListener('focus', function () {
    back()
    resizeInput('focus')
    if (document.getElementById('receiveEnter').value === '') {
        if (fullLine) {
            document.getElementById("spawnHere").style.display = 'flex'
        } else {
            console.log('FullLINE NOT FOUND')
            const toShow = setInterval(function () {
                if (fullLine) {
                    console.log('FullLINE FOUND!')
                    document.getElementById("spawnHere").style.display = 'flex'
                    clearInterval(toShow)
                }
            }, 200)
        }
        $("#allBusesContainer").fadeOut("fast")
    }
    $("#svgClear").fadeIn("fast", function () {
        $(this).css("display", "flex");
    });
});

function resizeInput(func) {
    const buttons = document.getElementById("search-container").querySelectorAll('button')
    const inputC = document.getElementById("search-input-container")
    if (func === 'focus') {
        inputC.style.borderBottomLeftRadius = '0.5rem'
        inputC.style.borderBottomRightRadius = '0.5rem'
        inputC.style.width = '100%'
        buttons[0].style.display = 'none'
        buttons[1].style.display = 'none'
    } else {

        inputC.style.borderBottomLeftRadius = null
        inputC.style.borderBottomRightRadius = null
        inputC.style.width = null
        buttons[0].style.display = null
        buttons[1].style.display = null
    }

}

function unfocus(event) {
    activeBusNamePage = null
    activeBusPage = null
    const sourceDiv = document.getElementById('spawnHere');
    sourceDiv.style.display = 'none'
    const searchHere = document.getElementById('searchHere');
    searchHere.style.display = 'none'
    document.getElementById('receiveEnter').value = ''
    $("#allBusesContainer").fadeIn("fast")
    $("#svgClear").fadeOut("fast")
    $("#spawnStopsHere").fadeOut("fast")
    $("#intelligenceSpawn").fadeOut("fast")
    $("#favoriteBusButton").fadeOut("fast")
    $("#isFavorite").fadeOut("fast")
    $("#currentBusNameUI").fadeOut("fast")
    $("#rowBox").fadeOut("fast")
    $("#dailytimetable").fadeOut("fast")
    $("#goback").fadeOut("fast")
    reloadFavorites()
    resizeInput('blur')
    if (event) {
        event.preventDefault();
    }


}
document.getElementById('receiveEnter').addEventListener('blur', function () {

    //const sourceDiv = document.getElementById('spawnHere');
    //sourceDiv.style.display = 'none'
    //if (document.getElementById('receiveEnter').value === '') {
    //    $("#apps-container").fadeIn("fast")
    //}

});

document.getElementById('receiveEnter').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        findBus(document.getElementById('receiveEnter').value)
        return;
        let cleanedLoc = window.location.href.replace(/#/g, '');

        const url = `${cleanedLoc}${document.getElementById('receiveEnter').value}`;

        // Perform the fetch request
        fetch(url)
            .then(response => {
                // Check if the response status is 404
                if (response.status === 404) {
                    document.getElementById('receiveEnter').value = ''
                    document.getElementById('receiveEnter').placeholder = 'Η σελίδα δεν βρέθηκε.'
                    setTimeout(function () {
                        document.getElementById('receiveEnter').placeholder = 'Αναζητήστε στο Evox'
                    }, 8000)
                    console.log(`Resource not found [${url}] (404)`);
                } else {
                    window.location.href = `${cleanedLoc}${document.getElementById('receiveEnter').value}`
                    document.getElementById('receiveEnter').value = ''
                    console.log('Response status:', response.status);
                }

                // You can also handle other status codes or the response body here if needed
                return response.json(); // Assuming the response is in JSON format
            })
            .then(data => {
                // Handle the data from the response if needed
                console.log('Response data:', data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Fetch error:', error);
            });

        // You can add more actions here
    }
});

function favoriteCurrent() {
    if (!activeBusPage) return; // Check at the beginning
    const fav = document.getElementById("favoriteBusButton");

    if (fav.getAttribute('data-f') === 'false') {
        const lc = localStorage.getItem("oasa_favorites");

        if (lc) {
            let json;
            try {
                json = JSON.parse(lc);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return; // Handle error gracefully
            }
            json.push(activeBusPage); // Add the new favorite
            localStorage.setItem("oasa_favorites", JSON.stringify(json)); // Save back to localStorage
            const busname = capitalizeWords(activeBusNamePage.split(" - ")[0])
            localStorage.setItem(`OASA_${activeBusPage}_Info`, busname)
            localStorage.setItem(`OASA_${activeBusPage}_Code`, currentLineCode)

        } else {
            const newJson = [activeBusPage];
            localStorage.setItem("oasa_favorites", JSON.stringify(newJson));
            const busname = capitalizeWords(activeBusNamePage.split(" - ")[0])
            localStorage.setItem(`OASA_${activeBusPage}_Info`, busname)
            localStorage.setItem(`OASA_${activeBusPage}_Code`, currentLineCode)
        }

        fav.setAttribute("data-f", "true");
        fav.innerHTML = `Αφαίρεση ${activeBusPage} από αγαπημένα`
        //fav.classList.remove("red")
        fav.classList.add("favoriteBus")
    } else {
        const lc = localStorage.getItem("oasa_favorites");

        if (lc) {
            let json;
            try {
                json = JSON.parse(lc);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return; // Handle error gracefully
            }

            const newArray = json.filter(item => item !== activeBusPage);
            localStorage.setItem("oasa_favorites", JSON.stringify(newArray));
            localStorage.removeItem(`OASA_${activeBusPage}_Info`)
            localStorage.removeItem(`OASA_${activeBusPage}_Code`)
        }

        fav.setAttribute("data-f", "false");
        fav.innerHTML = `Προσθήκη ${activeBusPage} στα αγαπημένα`
        //fav.classList.add("red")
        fav.classList.remove("favoriteBus")
    }
}

function favoriteCurrentN(el) {
    //To favorite or not the current bus
    if (!activeBusPage) return; // Check at the beginning
    const fav = document.getElementById("isFavorite");
    el.querySelector("svg").style.transform = 'scale(1.7)'
    if (fav.getAttribute('data-f') === 'false') {
        const lc = localStorage.getItem("oasa_favorites");

        if (lc) {
            let json;
            try {
                json = JSON.parse(lc);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return; // Handle error gracefully
            }
            json.push(activeBusPage); // Add the new favorite
            localStorage.setItem("oasa_favorites", JSON.stringify(json)); // Save back to localStorage
            const busname = capitalizeWords(activeBusNamePage.split(" - ")[0])
            localStorage.setItem(`OASA_${activeBusPage}_Info`, busname)
            localStorage.setItem(`OASA_${activeBusPage}_Code`, currentLineCode)

        } else {
            const newJson = [activeBusPage];
            localStorage.setItem("oasa_favorites", JSON.stringify(newJson));
            const busname = capitalizeWords(activeBusNamePage.split(" - ")[0])
            localStorage.setItem(`OASA_${activeBusPage}_Info`, busname)
            localStorage.setItem(`OASA_${activeBusPage}_Code`, currentLineCode)
        }

        fav.setAttribute("data-f", "true");
        fav.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                                    <path d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z" fill="#fff"/>
                                    </svg>`
        //fav.innerHTML = `Αφαίρεση ${activeBusPage} από αγαπημένα`
        //now is Favorite
        //fav.classList.remove("red")
        fav.classList.add("favoriteBus")
    } else {
        const lc = localStorage.getItem("oasa_favorites");

        if (lc) {
            let json;
            try {
                json = JSON.parse(lc);
            } catch (error) {
                console.error("Error parsing JSON:", error);
                return; // Handle error gracefully
            }

            const newArray = json.filter(item => item !== activeBusPage);
            localStorage.setItem("oasa_favorites", JSON.stringify(newArray));
            localStorage.removeItem(`OASA_${activeBusPage}_Info`)
            localStorage.removeItem(`OASA_${activeBusPage}_Code`)
        }

        fav.setAttribute("data-f", "false");
        fav.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M9.15316 5.40838C10.4198 3.13613 11.0531 2 12 2C12.9469 2 13.5802 3.13612 14.8468 5.40837L15.1745 5.99623C15.5345 6.64193 15.7144 6.96479 15.9951 7.17781C16.2757 7.39083 16.6251 7.4699 17.3241 7.62805L17.9605 7.77203C20.4201 8.32856 21.65 8.60682 21.9426 9.54773C22.2352 10.4886 21.3968 11.4691 19.7199 13.4299L19.2861 13.9372C18.8096 14.4944 18.5713 14.773 18.4641 15.1177C18.357 15.4624 18.393 15.8341 18.465 16.5776L18.5306 17.2544C18.7841 19.8706 18.9109 21.1787 18.1449 21.7602C17.3788 22.3417 16.2273 21.8115 13.9243 20.7512L13.3285 20.4768C12.6741 20.1755 12.3469 20.0248 12 20.0248C11.6531 20.0248 11.3259 20.1755 10.6715 20.4768L10.0757 20.7512C7.77268 21.8115 6.62118 22.3417 5.85515 21.7602C5.08912 21.1787 5.21588 19.8706 5.4694 17.2544L5.53498 16.5776C5.60703 15.8341 5.64305 15.4624 5.53586 15.1177C5.42868 14.773 5.19043 14.4944 4.71392 13.9372L4.2801 13.4299C2.60325 11.4691 1.76482 10.4886 2.05742 9.54773C2.35002 8.60682 3.57986 8.32856 6.03954 7.77203L6.67589 7.62805C7.37485 7.4699 7.72433 7.39083 8.00494 7.17781C8.28555 6.96479 8.46553 6.64194 8.82547 5.99623L9.15316 5.40838Z"
                                        stroke="#fff" stroke-width="1.5" />
                                </svg>`
        //fav.innerHTML = `Προσθήκη ${activeBusPage} στα αγαπημένα`
        //fav.classList.add("red")
        fav.classList.remove("favoriteBus")
    }
    setTimeout(function () {
        el.querySelector("svg").style.transform = 'scale(1)'
    }, 1300)

}
let numstartto = 0; // Initialize the variable numstartto
let jsonForBTNIndex = {}; // Initialize the JSON object to store elements by ID
let reShown; // Track whether Businfo should be reshown
let clickLock = false; // Prevent rapid function execution

function handleTimeBoxClick(element, bypass) {
    if (!localStorage.getItem("extVOASA")) return;
    if (clickLock) return; // Prevent spamming
    clickLock = true;
    setTimeout(() => (clickLock = false), 300); // Unlock after 300ms

    const isActive = element.getAttribute("data-active") === "true";

    if (bypass || isActive) {
        element.setAttribute("data-active", "false");

        const imgElement = element.querySelector("img");
        if (imgElement) {
            imgElement.style.transform = "rotate(0deg)";
        }

        const optDiv = element.querySelector("div");
        if (optDiv) {
            optDiv.style.opacity = "0";
            setTimeout(() => {
                optDiv.style.display = "none";
                optDiv.innerHTML = "";
            }, 300); // Match transition duration
        }

        element.style.height = "55px";
        element.style.backgroundColor = "#333";

        if (reShown) {
            const busInfo = document.getElementById("Businfo");
            if (busInfo) busInfo.style.opacity = "1";
            reShown = false;
        }
        return;
    }

    // Activate the element
    element.setAttribute("data-active", "true");
    numstartto++; // Increment the global variable

    element.id = `globalelmt${numstartto}`;
    jsonForBTNIndex[`elmt${numstartto}`] = element;

    const optDiv = element.querySelector("div");
    if (optDiv) {
        optDiv.style.display = "block";
        setTimeout(() => {
            optDiv.style.opacity = "1";
        }, 50); // Start fade-in after display block

        const timetable = element.querySelector("span");
        const cleanedString = timetable
            ? timetable.innerHTML.replace(/<img[^>]*>/g, "")
            : "";
        let showStation = currentBus
        if (activeBusNamePage) {
            showStation = `${activeBusPage} - ${capitalizeWords(activeBusNamePage.split(" - ")[0])}`
        } else {
            showStation = currentBus
        }
        optDiv.innerHTML = `
            <p style="margin-top: 10px;">Πότε θέλετε ειδοποίηση για το λεωφορείο ${showStation};</p>
            <div onclick="this.classList.toggle('active');attachSchedo(this)" data-t="${cleanedString}" class="actionButton online">
                Αφετηρία
            </div>
            <!--<div id='elmt${numstartto}' onclick="this.classList.toggle('active')" class="actionButton">
                Ακύρωση
            </div>-->
        `;
    }

    const imgElement = element.querySelector("img");
    if (imgElement) {
        imgElement.style.transform = "rotate(180deg)";
    }

    element.style.height = "162px";
    element.style.backgroundColor = "#232323";

    const busInfo = document.getElementById("Businfo");
    if (busInfo && busInfo.style.opacity === "1") {
        busInfo.style.opacity = "0";
        reShown = true;
    } else {
        reShown = false;
    }
}


function convertTransition(transition) {
    // Regular expression to match Type 1 format: time - duration
    const type1Pattern = /^(\d{2}:\d{2}) - \d+ λεπτά$/;

    // Check if the transition matches Type 1 format
    const match = transition.match(type1Pattern);
    if (match) {
        // Extract the time part from the match
        return match[1];
    } else {
        // If it's not Type 1, return the original value
        return transition;
    }
}

function attachSchedo(element) {
    console.log("Attaching schedo")
    if (!localStorage.getItem("extVOASA")) {
        alert("Για να χρησιμοποιήσετε τις ειδοποιήσεις, πρέπει πρώτα να συνδεθείτε και να τις ενεργοποιήσετε.\nΓια να ξεκινήσετε, πηγαίνετε στις ρυθμίσεις ειδοποιήσεων.")
    }
    const dataTValue = element.getAttribute('data-t');

    // Log the value to the console
    console.log('datat', dataTValue);

    const evoxJson = {
        'username': localStorage.getItem("t50-username"),
        'extv': localStorage.getItem("extVOASA"),
        'type': "transition",
        'bus': currentBus,
        "transition": convertTransition(dataTValue)
    }

    console.log(evoxJson)
    fetch('https://florida.evoxs.xyz/oasaSchedo', {
        method: 'POST',
        body: JSON.stringify(evoxJson),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .then(data => {
            console.log("Florida Response", data)


        }).catch(error => {
            console.error('Fetch error:', error);
        });
}

function showDeviceDiscover() {
    const innera = document.getElementById("discover-a")
    const innerb = document.getElementById("discover-b")
    const infob = document.getElementById("discover-b-info")
    const terminalBT = document.getElementById("terminalbutton")
    const deviceBT = document.getElementById("devicebutton")
    console.log(innera.style.display)
    if (innera.style.display !== "none") {
        console.log('Will show B')
        innerb.style.display = "flex"
        innera.style.display = "none"
        //will show B
        const revert = terminalBT.style.backgroundColor
        terminalBT.style.backgroundColor = "transparent"
        deviceBT.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';

        infob.innerHTML = `
        currentBuild: ${sessionStorage.getItem("currentBuild")}<br><br>Αναγνωριστικό (extV): ${localStorage.getItem("extVOASA")}<br><br>Βρέθηκε ServiceWorker: ${'serviceWorker' in navigator}<br><br>Παράβλεψη εγκατάστασης: ${localStorage.getItem("hasDismissedSetup")}<br><br>Προνόμια: ${sessionStorage.getItem("privileges")}<br><br>Τοπική εικόνα προφίλ: ${sessionStorage.getItem("pfp") === true}<br><br>__compat_manifest [ΓΙΑ ΕΚΔΟΣΕΙΣ ALPHA]: <br><span style="color: yellow">${sessionStorage.getItem('__pwacompat_manifest')}</span><br><br>Καταστροφή Λειτουργικού: <span style="color: red;" onclick="localStorage.clear();window.location.reload()">Trigger</span><br><br><span onclick="changeTheme()">Change Theme</span><br><br><span onclick="customs()">Aurorabelle 😍🤯😐</span>`
    } else {
        console.log("Will show A")
        innerb.style.display = "none"
        innera.style.display = "flex"
        terminalBT.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        deviceBT.style.backgroundColor = "transparent";
    }
}

//OASA LIVE
function hasInternetConnection() {
    return navigator.onLine; // Returns true if online, false if offline
}

//https://telematics.oasa.gr/api/?act=webGetLines
//https://telematics.oasa.gr/api/?act=getLineName&p1=1076
const allLines = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetLines&keyOrigin=evoxEpsilon`);

fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${allLines}`)
    .then(response => response.json())
    .then(data => {
        fullLine = data
        if (data) {
            let lc = localStorage.getItem("oasa_favorites");
            if (lc) {
                lc = JSON.parse(lc);
            }



            let finalHtml = ``;
            // Map each line to a promise for asynchronous handling
            let linesPromises = data.map(eachLine => {
                return new Promise((resolve, reject) => {


                    document.getElementById("spawnHere").querySelectorAll("button").forEach(editBus => {
                        if (lc && lc.includes(editBus.getAttribute("data-bus"))) {
                            editBus.classList.add("favoriteBus")
                        }
                    })

                    // Check if the line is in the favorites
                    //if (lc && lc.includes(eachLine.LineID)) {
                    //    finalHtml = `${finalHtml}
                    //        <button data-bus="${eachLine.LineID}" data-name="${eachLine.LineDescr}"
                    //                class="fade-in-slide-up favoriteBus oasaButton" 
                    //                onclick="findBus('${eachLine.LineID}', this)">
                    //            <span class="lineNOCLASS">${eachLine.LineID}</span>
                    //            <span class="button-text">${capitalizeWords(eachLine.LineDescr)}</span>
                    //            <vox class="loadingIndicatorNOCLASS"></vox>
                    //        </button>`;
                    //} else {
                    //    finalHtml = `${finalHtml}
                    //        <button data-bus="${eachLine.LineID}" data-name="${eachLine.LineDescr}"
                    //                class="fade-in-slide-up oasaButton"
                    //                onclick="findBus('${eachLine.LineID}', this)">
                    //            <span class="lineNOCLASS">${eachLine.LineID}</span>
                    //            <span class="button-text">${capitalizeWords(eachLine.LineDescr)}</span>
                    //            <vox class="loadingIndicatorNOCLASS"></vox>
                    //        </button>`;
                    //}

                    // Append the generated HTML to the container
                    //const spawnHere = document.getElementById("spawnHere");
                    //if (spawnHere) {
                    //    spawnHere.innerHTML = finalHtml; // Safely append each button
                    //}

                    resolve(); // Mark the promise as resolved after DOM update
                });
            });

            // Wait for all promises to resolve (i.e., all buttons are added to the DOM)
            Promise.all(linesPromises)
                .then(() => {
                    console.log('All lines have been spawned!');
                    const element_b = document.getElementById('indexLoading');
                    if (element_b) {
                        element_b.remove(); // Remove the loading element
                    }

                    // Add additional functionality here
                })
                .catch(err => {
                    console.error('An error occurred while spawning stops:', err);
                });
        }


    })
    .catch(error => {
        console.log("All Lines Get Error:", error)
        if (isNearEvery3Hours()) {
            //alert(`Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.`)
            document.getElementById("performance").style.display = 'flex'
            document.getElementById("messagePerformance").innerHTML = 'Μερική Διακοπή'
            document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentBuild}`

            document.getElementById("spawnHere").innerHTML = 'Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.'
            document.getElementById("logErrors").innerHTML = `Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.`
        } else {
            //alert(`Δεν ηταν δυνατη η συνδεση στον διακομιστη.\nΑγνωστο σφαλμα`)
            document.getElementById("performance").style.display = 'flex'
            document.getElementById("messagePerformance").innerHTML = 'Σοβαρό περιστατικό'
            document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentBuild}`

            document.getElementById("spawnHere").innerHTML = 'Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα'
            document.getElementById("logErrors").innerHTML = `Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα<br>${error}`
        }
        if (error.toString().includes('Unexpected token')) {
            //alert("OASA SQL error. Δοκιμάστε ξανά.")
            document.getElementById("performance").style.display = 'flex'
            document.getElementById("italicBuild").innerHTML = `Evox© OASAP V${currentBuild}`
            document.getElementById("messagePerformance").innerHTML = 'Σφάλμα OASA'
            document.getElementById("spawnHere").innerHTML = "OASA SQL error. Δοκιμάστε ξανά."
            document.getElementById("logErrors").innerHTML = `Σφάλμα από την πλευρά του OASA [SQL].<br>Επανεκκινήστε την εφαρμογή.<br>${error}`

        }
        const pers = localStorage.getItem("personalization")
        if (pers) {
            const personalize = JSON.parse(pers);
            const savedDate = new Date(personalize.date); // Convert to Date object
            const currentDate = new Date();

            // Calculate the difference in days
            const differenceInDays = (currentDate - savedDate) / (1000 * 60 * 60 * 24);

            if (differenceInDays <= 3 && type === "muteOfflineAlerts") {
                return;
                console.log("Date is within 2 days. Do something.");
            }
            // else {
            //    console.log("Date is older than 2 days. Do something else.");
            //}
        } else if (!hasInternetConnection()) {
            return;
        }
        showErrors()
        //updateCountdown();


    })

function showErrors() {
    document.getElementById("performance").style.display = 'none'
    document.getElementById("popIt3").classList.add("active")
}

function muteOfflineAlerts() {
    document.getElementById("popIt3").classList.remove("active");
    document.getElementById("performance").style.display = 'flex'
    const json = {
        'date': new Date(),
        'type': 'muteOfflineAlerts'
    }
    localStorage.setItem("personalization", JSON.stringify(json))
}
function grabberEvents(id) {

    const notice = document.getElementById(id);
    let startY, currentY, isDragging = false;

    // Initialize event listeners for touch/mouse events
    notice.addEventListener("mousedown", startDrag);
    notice.addEventListener("touchstart", startDrag);
    notice.addEventListener("mousemove", drag);
    notice.addEventListener("touchmove", drag);
    notice.addEventListener("mouseup", endDrag);
    notice.addEventListener("touchend", endDrag);

    function startDrag(e) {
        startY = e.touches ? e.touches[0].clientY : e.clientY;
        isDragging = true;
        notice.style.transition = "none";  // Disable transitions for smoother dragging
    }

    function drag(e) {
        if (!isDragging) return;

        currentY = e.touches ? e.touches[0].clientY : e.clientY;
        let deltaY = currentY - startY;

        if (deltaY > 0) {  // Only allow downward dragging
            notice.style.transform = `translateY(${deltaY}px)`;
        }
    }

    function endDrag() {
        isDragging = false;
        notice.style.transition = "transform 0.4s ease";  // Add smooth return or dismiss transition

        if (currentY - startY > 150) {
            notice.style.transform = `translateY(100vh)`;

            if (id === 'popIt3') {
                document.getElementById("performance").style.display = 'flex'
            } else if (id === 'floridaCont') {
                const elementId = "popIt";
                const isOutsideViewport = isElementOutsideViewport(elementId);

                if (isOutsideViewport) {
                    console.log("Element with ID '" + elementId + "' is outside the viewport.");

                    goBack()
                    setTimeout(function () {
                        popIt.style.top = '';
                    }, 500)

                } else {
                    console.log("Element with ID '" + elementId + "' is inside the viewport.");
                }
            }
            notice.addEventListener("transitionend", () => {
                notice.classList.remove("active");
                notice.style.transform = ``;

            }, { once: true });
        } else {
            notice.style.transform = ``;  // Reset if not dismissed
        }
    }
}
grabberEvents("popIt3")
//grabberEvents("floridaCont")

function getNextBusStart(code, busid) {
    //OASA LIVE
    const id = `favoriteOASALIVE_${busid}`
    document.getElementById(id).innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="15px" height="15px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
              <path opacity="0.2" fill="#fff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
              <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml"
                  attributeName="transform"
                  type="rotate"
                  from="0 20 20"
                  to="360 20 20"
                  dur="0.3s"
                  repeatCount="indefinite"/>
                </path>
              </svg>`
    const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${code}&keyOrigin=evoxEpsilon`);
    function displayRemainingTimeLIVE(nextBusTime, elid) {
        console.log("Running", JSON.stringify(nextBusTime), "for", elid);
        const currentTime = new Date();
        const nextBusDate = new Date();
        nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

        const remainingTimeMs = nextBusDate - currentTime;
        const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
        const remainingHours = Math.floor(remainingMinutes / 60);
        const displayMinutes = remainingMinutes % 60;

        const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
        document.getElementById(elid).innerText = `Επόμενο: ${remainingTimeText}`;
    }
    function getNextBusTimeLIVE(times) {
        ////console.log("getting times", times);
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        for (let time of times) {
            const [hour, minutes] = time.split(':').map(Number);
            if (hour > currentHour || (hour === currentHour && minutes > currentMinutes)) {
                return { hour, minutes };
            }
        }
        return null;
    }
    function formatTime(dateTimeString) {
        if (!dateTimeString) {
            console.error("Invalid dateTimeString:", dateTimeString);
            return "Invalid";
        }

        const parts = dateTimeString.split(' ');
        if (parts.length !== 2) {
            console.error("Invalid dateTimeString format:", dateTimeString);
            return "Invalid";
        }

        const timePart = parts[1]; // "HH:MM:SS"
        const timeParts = timePart.split(':');
        if (timeParts.length !== 3) {
            console.error("Invalid time format:", timePart);
            return "Invalid";
        }

        const hours = timeParts[0];
        const minutes = timeParts[1];

        if (hours.length !== 2 || minutes.length !== 2) {
            console.error("Invalid time components:", hours, minutes);
            return "Invalid";
        }

        return `${hours}:${minutes}`;
    }
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
        .then(response => response.json())
        .then(data => {
            console.log("The data:", data)
            if (!data.come && !data.go) {
                console.log(data)
                return;
            } else {
                console.log("Come and go for ", busid, "\n", data)
            }
            document.getElementById("netStats").innerHTML = onlineSvg
            console.log("Success", code)

            var times = data.go.map(item => {
                //console.log("sde_start1:", item.sde_start1); // Debug log
                return formatTime(item.sde_start1);
            });

            //console.log("Formatted times:", times); // Debug log

            const nextBusTime = getNextBusTimeLIVE(times);

            if (nextBusTime) {
                localStorage.setItem(`${busid}_Timetable`, JSON.stringify(data));
                localStorage.setItem(`${busid}_Times`, JSON.stringify(times));
                displayRemainingTimeLIVE(nextBusTime, id);
            } else {
                document.getElementById(id).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`;
            }
        })
        .catch(error => {
            console.log('Load Favorite Times Error:', error)
            //document.getElementById("netStats").innerHTML = offlineSvg
            document.getElementById(`${id}`).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`;

        });

}
function reloadFavorites() {
    const lc = localStorage.getItem("oasa_favorites")
    if (lc) {
        const json = JSON.parse(lc)
        if (json.length !== 0) {
            document.getElementById("custom-container").innerHTML = ''
            $("#favs-p").fadeIn("fast")
            $("#custom-container").fadeIn("fast")

            json.forEach(favbus => {
                let add = favbus;
                if (favbus.length === 2) {
                    add = add + `<span class="invisible-number">&nbsp;</span>`
                }
                document.getElementById("custom-container").innerHTML = `${document.getElementById("custom-container").innerHTML}
                                        <a href="#" onclick="showInfoFav('${favbus}')">
                                        <p>${add}</p>
                                        <div class="label">
                                            <span class="name">${localStorage.getItem(`OASA_${favbus}_Info`)}</span>
                                            <span id="favoriteOASALIVE_${favbus}" class="url">Loading..</span>
                                        </div>
                                    </a>`
                getNextBusStart(localStorage.getItem(`OASA_${favbus}_Code`), favbus)
            });
        }

    }
}
reloadFavorites()

function showInfoFav(busId) {
    findBus(busId)
    $("#svgClear").fadeIn("fast", function () {
        $(this).css("display", "flex");
    });
}

let elmTimtbl;

function showInfoCSTM(bus, isInt, more, elementTimetable) {
    isCustom = true
    currentBus = bus
    howManyShowed = more ?? 7
    if (elementTimetable) {
        console.log("elem timetbl found")
        if (elementTimetable.querySelector('svg')) {
            elmTimtbl = elementTimetable.querySelector('svg')
            console.log("timetbl svg")
            elementTimetable.querySelector('svg').classList.add("shake")
            //setTimeout(function () {
            //    elementTimetable.querySelector('svg').classList.remove("shake")
            //}, 600)
        } else {
            elmTimtbl = elementTimetable.querySelector('img')
            console.log("timetbl img")
            elementTimetable.querySelector('img').classList.add("shake")
            //setTimeout(function () {
            //    elementTimetable.querySelector('img').classList.remove("shake")
            //}, 600)
        }

    } else {
        console.log("timetbl notfound")
    }
    document.getElementById("904live1").style.display = 'none'

    if (!document.getElementById("popIt").classList.contains("active") && isInt) {
        console.log(`Resolved Interval Bug [info: busReq: ${bus}, stoppedBy: classList]`)
        return;
    }
    if (sessionStorage.getItem("currentWatch") !== bus && isInt) {
        console.log(`Resolved Interval Bug [info: busReq: ${bus}, stoppedBy: currentWatch]`)
        return;
    }
    //document.getElementById("popIt").classList.add("active")
    document.getElementById("whatBus").innerHTML = bus
    document.getElementById("16defTime").style.display = "none"
    document.getElementById("16gounTime").style.display = "none"
    document.getElementById("049live1").style.display = "none"
    document.getElementById("049live2").style.display = "none"
    document.getElementById("831live1").style.display = "none"
    sessionStorage.setItem("currentWatch", bus)

    document.getElementById("evoxBased").innerHTML = ""
    document.getElementById("16defTime").style.display = "none"
    document.getElementById("16gounTime").style.display = "none"
    document.getElementById("049live1").style.display = "none"
    document.getElementById("049live2").style.display = "none"
    document.getElementById("831live1").style.display = "none"
    function getNextBusTimeLIVE(times) {
        //console.log("getting times", times);
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();

        for (let time of times) {
            const [hour, minutes] = time.split(':').map(Number);
            if (hour > currentHour || (hour === currentHour && minutes > currentMinutes)) {
                return { hour, minutes };
            }
        }
        return null;
    }
    function formatTime(dateTimeString) {
        if (!dateTimeString) {
            console.error("Invalid dateTimeString:", dateTimeString);
            return "Invalid";
        }

        const parts = dateTimeString.split(' ');
        if (parts.length !== 2) {
            console.error("Invalid dateTimeString format:", dateTimeString);
            return "Invalid";
        }

        const timePart = parts[1]; // "HH:MM:SS"
        const timeParts = timePart.split(':');
        if (timeParts.length !== 3) {
            console.error("Invalid time format:", timePart);
            return "Invalid";
        }

        const hours = timeParts[0];
        const minutes = timeParts[1];

        if (hours.length !== 2 || minutes.length !== 2) {
            console.error("Invalid time components:", hours, minutes);
            return "Invalid";
        }

        return `${hours}:${minutes}`;
    }
    //const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
    const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${currentLineCode}&keyOrigin=evoxEpsilon`);
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
        .then(response => response.json())
        .then(data => {
            console.log("The data:", data)
            if (!data.come && !data.go) {
                console.log(data)
                return;
            } else {
                console.log("Come and go for ", currentBus, "\n", data)
            }
            document.getElementById("netStats").innerHTML = onlineSvg
            console.log("Success", currentLineCode)

            var times = data.go.map(item => {
                //console.log("sde_start1:", item.sde_start1); // Debug log
                return formatTime(item.sde_start1);
            });

            //console.log("Formatted times:", times); // Debug log
            console.warn(data)

            const nextBusTime = getNextBusTimeLIVE(times);

            if (nextBusTime) {
                disableOverflow()
                document.getElementById("phone").classList.add('out')
                document.getElementById("main-wrapper").style.overflow = 'hidden'
                localStorage.setItem(`${currentBus}_Timetable`, JSON.stringify(data));
                localStorage.setItem(`${currentBus}_Times`, JSON.stringify(times));
                const remains = getNextBuses(times, more)
                console.log(remains)
                remains.forEach(function (remainTime) {
                    // Create the main div element with the class 'timeBox'
                    var timeBox = document.createElement('div');
                    timeBox.className = 'timeBox';
                    timeBox.onclick = function () {
                        handleTimeBoxClick(this)
                    }

                    let textNode;
                    textNode = document.createTextNode((capitalizeWords(activeBusNamePage.split(" - ")[0]).length > 9 ? capitalizeWords(activeBusNamePage.split(" - ")[0]).substring(0, 8) + ".." : capitalizeWords(activeBusNamePage.split(" - ")[0])));


                    // Append the text node to the main div element
                    timeBox.appendChild(textNode);

                    // Create the span element and set its content to '10m'
                    var span = document.createElement('span');
                    span.innerHTML = remainTime;

                    // Append the span element to the main div element
                    timeBox.appendChild(span);
                    if (localStorage.getItem("extVOASA")) {
                        span.innerHTML += `<img src="arrow-down.svg" width="25px" height="25px">`
                        var optDiv = document.createElement('div');
                        optDiv.style.display = 'none'
                        optDiv.style.height = 'auto'
                        timeBox.appendChild(optDiv);
                    }

                    // Optionally, append the timeBox to the body or another element in the DOM
                    document.getElementById("evoxBased").appendChild(timeBox);
                })
                let countThis2 = 25;
                count2 = setInterval(function () {
                    countThis2 = countThis2 - 1
                    if (countThis2 === -1) {
                        countThis2 = 25
                        console.log("Interval Countdown:", '25')
                    }
                    console.log("Interval Countdown:", countThis2)
                }, 1000)
                const div = document.getElementById("popIt");
                div.scrollTop = div.scrollHeight;
                document.getElementById("popIt").classList.add("active")
                elmTimtbl.classList.remove("shake")
                currentInt = setInterval(function () {
                    showInfoCSTM(bus, 'interval')
                }, 25000)
            } else {
                if (elementTimetable) {
                    elementTimetable.classList.remove("shake")
                    elementTimetable.innerHTML = '<img width="25px" height="25px" src="snap.png">'
                    setTimeout(function () {
                        elementTimetable.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M16.7502 3.56V2C16.7502 1.59 16.4102 1.25 16.0002 1.25C15.5902 1.25 15.2502 1.59 15.2502 2V3.5H8.75023V2C8.75023 1.59 8.41023 1.25 8.00023 1.25C7.59023 1.25 7.25023 1.59 7.25023 2V3.56C4.55023 3.81 3.24023 5.42 3.04023 7.81C3.02023 8.1 3.26023 8.34 3.54023 8.34H20.4602C20.7502 8.34 20.9902 8.09 20.9602 7.81C20.7602 5.42 19.4502 3.81 16.7502 3.56Z"
                                        fill="#fff" />
                                    <path
                                        d="M20 9.83984H4C3.45 9.83984 3 10.2898 3 10.8398V16.9998C3 19.9998 4.5 21.9998 8 21.9998H16C19.5 21.9998 21 19.9998 21 16.9998V10.8398C21 10.2898 20.55 9.83984 20 9.83984ZM9.21 18.2098C9.16 18.2498 9.11 18.2998 9.06 18.3298C9 18.3698 8.94 18.3998 8.88 18.4198C8.82 18.4498 8.76 18.4698 8.7 18.4798C8.63 18.4898 8.57 18.4998 8.5 18.4998C8.37 18.4998 8.24 18.4698 8.12 18.4198C7.99 18.3698 7.89 18.2998 7.79 18.2098C7.61 18.0198 7.5 17.7598 7.5 17.4998C7.5 17.2398 7.61 16.9798 7.79 16.7898C7.89 16.6998 7.99 16.6298 8.12 16.5798C8.3 16.4998 8.5 16.4798 8.7 16.5198C8.76 16.5298 8.82 16.5498 8.88 16.5798C8.94 16.5998 9 16.6298 9.06 16.6698C9.11 16.7098 9.16 16.7498 9.21 16.7898C9.39 16.9798 9.5 17.2398 9.5 17.4998C9.5 17.7598 9.39 18.0198 9.21 18.2098ZM9.21 14.7098C9.02 14.8898 8.76 14.9998 8.5 14.9998C8.24 14.9998 7.98 14.8898 7.79 14.7098C7.61 14.5198 7.5 14.2598 7.5 13.9998C7.5 13.7398 7.61 13.4798 7.79 13.2898C8.07 13.0098 8.51 12.9198 8.88 13.0798C9.01 13.1298 9.12 13.1998 9.21 13.2898C9.39 13.4798 9.5 13.7398 9.5 13.9998C9.5 14.2598 9.39 14.5198 9.21 14.7098ZM12.71 18.2098C12.52 18.3898 12.26 18.4998 12 18.4998C11.74 18.4998 11.48 18.3898 11.29 18.2098C11.11 18.0198 11 17.7598 11 17.4998C11 17.2398 11.11 16.9798 11.29 16.7898C11.66 16.4198 12.34 16.4198 12.71 16.7898C12.89 16.9798 13 17.2398 13 17.4998C13 17.7598 12.89 18.0198 12.71 18.2098ZM12.71 14.7098C12.66 14.7498 12.61 14.7898 12.56 14.8298C12.5 14.8698 12.44 14.8998 12.38 14.9198C12.32 14.9498 12.26 14.9698 12.2 14.9798C12.13 14.9898 12.07 14.9998 12 14.9998C11.74 14.9998 11.48 14.8898 11.29 14.7098C11.11 14.5198 11 14.2598 11 13.9998C11 13.7398 11.11 13.4798 11.29 13.2898C11.38 13.1998 11.49 13.1298 11.62 13.0798C11.99 12.9198 12.43 13.0098 12.71 13.2898C12.89 13.4798 13 13.7398 13 13.9998C13 14.2598 12.89 14.5198 12.71 14.7098ZM16.21 18.2098C16.02 18.3898 15.76 18.4998 15.5 18.4998C15.24 18.4998 14.98 18.3898 14.79 18.2098C14.61 18.0198 14.5 17.7598 14.5 17.4998C14.5 17.2398 14.61 16.9798 14.79 16.7898C15.16 16.4198 15.84 16.4198 16.21 16.7898C16.39 16.9798 16.5 17.2398 16.5 17.4998C16.5 17.7598 16.39 18.0198 16.21 18.2098ZM16.21 14.7098C16.16 14.7498 16.11 14.7898 16.06 14.8298C16 14.8698 15.94 14.8998 15.88 14.9198C15.82 14.9498 15.76 14.9698 15.7 14.9798C15.63 14.9898 15.56 14.9998 15.5 14.9998C15.24 14.9998 14.98 14.8898 14.79 14.7098C14.61 14.5198 14.5 14.2598 14.5 13.9998C14.5 13.7398 14.61 13.4798 14.79 13.2898C14.89 13.1998 14.99 13.1298 15.12 13.0798C15.3 12.9998 15.5 12.9798 15.7 13.0198C15.76 13.0298 15.82 13.0498 15.88 13.0798C15.94 13.0998 16 13.1298 16.06 13.1698C16.11 13.2098 16.16 13.2498 16.21 13.2898C16.39 13.4798 16.5 13.7398 16.5 13.9998C16.5 14.2598 16.39 14.5198 16.21 14.7098Z"
                                        fill="#fff" />
                                </svg>`
                    }, 3000)
                }
                //alert("Δεν υπάρχουν διαθέσιμες αφίξεις για την επιλεγμένη γραμμή.")
                document.getElementById("popIt").classList.remove("active")
                document.getElementById('phone').style.transform = ''
                document.getElementById("main-wrapper").style.overflow = 'auto'
                isCustom = false
                console.error(times, nextBusTime, getNextBuses(times, more))
                //document.getElementById(id).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`;
            }
        })
        .catch(error => {
            console.log('Load Favorite Times Error:', error)
            //document.getElementById("netStats").innerHTML = offlineSvg
            //alert("Something Failed [14]")
            if (elementTimetable) {
                elementTimetable.classList.remove("shake")
                elementTimetable.innerHTML = '<img width="25px" height="25px" src="snap.png">'
            }
            //document.getElementById(`${id}`).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`;

        });
}

function timetable(el) {
    showInfoCSTM(activeBusPage, null, null, el)
}

function showCurrentStop(customAction, popupEl) {
    const stopCode = activeStop.code
    const stopName = activeStop.name

    //https://telematics.oasa.gr/api/?act=webRoutesForStop&p1=400452

    const stop_url_1 = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webRoutesForStop&p1=${stopCode}&keyOrigin=evoxEpsilon`);
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stop_url_1}`)
        .then(response => response.json())
        .then(stop => {
            let start = {}
            let isReady = false
            let count = 0

            let finale = ''


            const stop_url = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=${stopCode}&keyOrigin=evoxEpsilon`);
            fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stop_url}`)
                .then(response => response.json())
                .then(arrivals => {
                    document.getElementById("904live1").style.display = 'none'
                    disableOverflow()
                    document.getElementById("phone").classList.add('out')
                    //document.getElementById("main-wrapper").style.overflow = 'hidden'
                    document.getElementById("popIt").classList.add("active")
                    document.getElementById("showMore").style.display = 'none'
                    document.getElementById("16defTime").style.display = "none"
                    document.getElementById("16gounTime").style.display = "none"
                    document.getElementById("049live1").style.display = "none"
                    document.getElementById("049live2").style.display = "none"
                    document.getElementById("831live1").style.display = "none"
                    document.getElementById("whatBus").innerHTML = `Κανένα<br>Στάση: ${capitalizeWords(stopName)}`
                    document.getElementById("evoxBased").innerHTML = ""
                    document.getElementById("16defTime").style.display = "none"
                    document.getElementById("16gounTime").style.display = "none"
                    document.getElementById("049live1").style.display = "none"
                    document.getElementById("049live2").style.display = "none"
                    document.getElementById("831live1").style.display = "none"
                    document.getElementById('alert').classList.remove('active')
                    // Flag to track if a match is found
                    let matchFound = false;



                    stop.forEach(data => {
                        count++
                        start[data.LineID] = {
                            "desc": data.LineDescr,
                            "lineCode": data.LineCode,
                            "routeCode": data.RouteCode,
                            "id": data.LineID
                        }
                        if (count === stop.length) {
                            isReady = true
                            //const work = THEROUTECODE
                        }

                        arrivals.forEach(arrive => {
                            if (arrive.route_code === data.RouteCode) {
                                finale = `${finale}${data.LineID} (${data.LineDescr}): ${arrive.btime2}\n`
                                var timeBox = document.createElement('div');
                                timeBox.className = 'timeBox';

                                let textNode;
                                textNode = document.createTextNode(data.LineID);


                                // Append the text node to the main div element
                                timeBox.appendChild(textNode);

                                // Create the span element and set its content to '10m'
                                var span = document.createElement('span');
                                span.innerHTML = arrive.btime2 + " λεπτά";

                                // Append the span element to the main div element
                                timeBox.appendChild(span);
                                if (localStorage.getItem("extVOASA")) {
                                    var optDiv = document.createElement('div');
                                    optDiv.style.display = 'none'
                                    optDiv.style.height = 'auto'
                                    timeBox.appendChild(optDiv);
                                }

                                // Optionally, append the timeBox to the body or another element in the DOM
                                document.getElementById("evoxBased").appendChild(timeBox);
                                //alert(`${arrive.btime2} λεπτά`);
                                matchFound = true; // Set flag to true if a match is found
                            }
                        });
                        if (customAction === 'deleteAfter') {
                            activeStop = {
                                "name": null,
                                "code": null
                            }
                            popupEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18.9698 3.75V7.25C18.9698 8.22 18.1898 9 17.2198 9H8.95987C8.56987 9 8.17985 8.85999 7.86985 8.62L5.67984 6.87C4.80984 6.17 4.80984 4.83 5.67984 4.13L7.86985 2.38C8.17985 2.14 8.56987 2 8.95987 2H17.2198C18.1898 2 18.9698 2.78 18.9698 3.75Z"
                                fill="#292D32" />
                            <path
                                d="M18.3408 16.87L16.1608 18.62C15.8508 18.86 15.4608 19 15.0608 19H6.80078C5.83078 19 5.05078 18.22 5.05078 17.25V13.75C5.05078 12.78 5.83078 12 6.80078 12H15.0608C15.4608 12 15.8508 12.14 16.1608 12.38L18.3408 14.13C19.2208 14.83 19.2208 16.17 18.3408 16.87Z"
                                fill="#292D32" />
                            <path opacity="0.4" d="M12.75 9H11.25V12H12.75V9Z" fill="#292D32" />
                            <path opacity="0.4"
                                d="M15.75 22C15.75 22.41 15.41 22.75 15 22.75H9C8.59 22.75 8.25 22.41 8.25 22C8.25 21.59 8.59 21.25 9 21.25H11.25V19H12.75V21.25H15C15.41 21.25 15.75 21.59 15.75 22Z"
                                fill="#292D32" />
                        </svg>`
                        }
                    })

                    //alert(finale)


                    // Create the main div element with the class 'timeBox'



                })
                .catch(error => {
                    //document.getElementById("activeBuses").innerHTML = `Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]`
                    //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]");
                    console.log("getStop [65] error:", error);
                    document.getElementById("evoxBased").innerHTML = 'Κανένα Λεωφορείο Δεν Ερχέται Στην Τρέχουσα Στάση.'
                    if (customAction === 'deleteAfter') {
                        activeStop = {
                            "name": null,
                            "code": null
                        }
                        popupEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18.9698 3.75V7.25C18.9698 8.22 18.1898 9 17.2198 9H8.95987C8.56987 9 8.17985 8.85999 7.86985 8.62L5.67984 6.87C4.80984 6.17 4.80984 4.83 5.67984 4.13L7.86985 2.38C8.17985 2.14 8.56987 2 8.95987 2H17.2198C18.1898 2 18.9698 2.78 18.9698 3.75Z"
                                fill="#292D32" />
                            <path
                                d="M18.3408 16.87L16.1608 18.62C15.8508 18.86 15.4608 19 15.0608 19H6.80078C5.83078 19 5.05078 18.22 5.05078 17.25V13.75C5.05078 12.78 5.83078 12 6.80078 12H15.0608C15.4608 12 15.8508 12.14 16.1608 12.38L18.3408 14.13C19.2208 14.83 19.2208 16.17 18.3408 16.87Z"
                                fill="#292D32" />
                            <path opacity="0.4" d="M12.75 9H11.25V12H12.75V9Z" fill="#292D32" />
                            <path opacity="0.4"
                                d="M15.75 22C15.75 22.41 15.41 22.75 15 22.75H9C8.59 22.75 8.25 22.41 8.25 22C8.25 21.59 8.59 21.25 9 21.25H11.25V19H12.75V21.25H15C15.41 21.25 15.75 21.59 15.75 22Z"
                                fill="#292D32" />
                        </svg>`
                    }
                });



        })
        .catch(error => {
            //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]");
            console.log("getStop [63] error:", error);
            if (customAction === 'deleteAfter') {
                activeStop = {
                    "name": null,
                    "code": null
                }
                popupEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18.9698 3.75V7.25C18.9698 8.22 18.1898 9 17.2198 9H8.95987C8.56987 9 8.17985 8.85999 7.86985 8.62L5.67984 6.87C4.80984 6.17 4.80984 4.83 5.67984 4.13L7.86985 2.38C8.17985 2.14 8.56987 2 8.95987 2H17.2198C18.1898 2 18.9698 2.78 18.9698 3.75Z"
                                fill="#292D32" />
                            <path
                                d="M18.3408 16.87L16.1608 18.62C15.8508 18.86 15.4608 19 15.0608 19H6.80078C5.83078 19 5.05078 18.22 5.05078 17.25V13.75C5.05078 12.78 5.83078 12 6.80078 12H15.0608C15.4608 12 15.8508 12.14 16.1608 12.38L18.3408 14.13C19.2208 14.83 19.2208 16.17 18.3408 16.87Z"
                                fill="#292D32" />
                            <path opacity="0.4" d="M12.75 9H11.25V12H12.75V9Z" fill="#292D32" />
                            <path opacity="0.4"
                                d="M15.75 22C15.75 22.41 15.41 22.75 15 22.75H9C8.59 22.75 8.25 22.41 8.25 22C8.25 21.59 8.59 21.25 9 21.25H11.25V19H12.75V21.25H15C15.41 21.25 15.75 21.59 15.75 22Z"
                                fill="#292D32" />
                        </svg>`
            }
        });

}

const notifyOnStart = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
                        <path d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`
const on2minutes = `<svg xmlns="http://www.w3.org/2000/svg" fill="#fff" width="25px" height="25px" viewBox="-1 0 19 19" class="cf-icon-svg"><path d="M16.417 9.6A7.917 7.917 0 1 1 8.5 1.683 7.917 7.917 0 0 1 16.417 9.6zm-5.431 2.113H8.309l1.519-1.353q.223-.203.43-.412a2.974 2.974 0 0 0 .371-.449 2.105 2.105 0 0 0 .255-.523 2.037 2.037 0 0 0 .093-.635 1.89 1.89 0 0 0-.2-.889 1.853 1.853 0 0 0-.532-.63 2.295 2.295 0 0 0-.76-.37 3.226 3.226 0 0 0-.88-.12 2.854 2.854 0 0 0-.912.144 2.373 2.373 0 0 0-.764.42 2.31 2.31 0 0 0-.55.666 2.34 2.34 0 0 0-.274.89l1.491.204a1.234 1.234 0 0 1 .292-.717.893.893 0 0 1 1.227-.056.76.76 0 0 1 .222.568 1.002 1.002 0 0 1-.148.536 2.42 2.42 0 0 1-.389.472L6.244 11.77v1.295h4.742z"/></svg>`
document.querySelectorAll('.swipe-container').forEach((container) => {
    let startX = 0,
        currentX = 0,
        isDragging = false,
        isRevealed = false; // Track whether actions are revealed
    const content = container.querySelector('.swipe-content');
    const actions = container.querySelector('.swipe-actions');
    const actionsWidth = actions.offsetWidth; // Width of the action buttons

    const resetPosition = () => {
        actions.style.display = 'none'
        content.style.transform = 'translateX(0)';
        actions.style.transform = 'translateX(200%)'; // Hide actions
        container.classList.remove('swiping');
        isRevealed = false; // Mark actions as hidden

    };

    const revealActions = () => {
        if (content.querySelector('span').innerText === "Κανένα") {
            actions.querySelector('.time1').innerHTML = notifyOnStart
            const station = content.querySelector('.liveCollumn').querySelector('vox').innerText.toLowerCase().replace(/\s+/g, '_')
            actions.querySelector('.time1').onclick = function () {
                notifyWhenStarted(currentBus, content.querySelector('span').innerText, station, null, actions)
            }
        } else {
            const station = content.querySelector('.liveCollumn').querySelector('vox').innerText.toLowerCase().replace(/\s+/g, '_')
            actions.querySelector('.time1').innerHTML = on2minutes
            actions.querySelector('.time1').onclick = function () {
                notifyWhen2Mins(currentBus, content.querySelector('span').innerText, station, null, actions)
            }
        }
        actions.style.display = 'flex'
        content.style.transform = `translateX(${-actionsWidth}px)`;
        actions.style.transform = 'translateX(0)'; // Show actions
        container.classList.add('swiping');
        isRevealed = true; // Mark actions as revealed
    };

    const setPosition = (deltaX) => {
        const translateX = isRevealed
            ? -actionsWidth + deltaX // Adjust for revealed state
            : deltaX; // Adjust for default state
        content.style.transform = `translateX(${Math.min(0, translateX)}px)`;
        actions.style.transform = `translateX(${100 + (translateX / actionsWidth) * 100}%)`;
    };

    container.addEventListener('touchstart', (e) => {
        document.getElementById("popIt").style.overflow = 'hidden'
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    container.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        setPosition(deltaX);
    });

    container.addEventListener('touchend', () => {
        document.getElementById("popIt").style.overflow = null
        if (!isDragging) return;
        isDragging = false;

        const deltaX = currentX - startX;

        if (isRevealed) {
            // If actions are revealed, swipe right to reset
            if (deltaX > actionsWidth / 2) {
                resetPosition(); // Reset to default position
            } else {
                revealActions(); // Keep actions revealed
            }
        } else {
            // If actions are hidden, swipe left to reveal
            if (deltaX < -actionsWidth / 2) {
                revealActions(); // Reveal actions
            } else {
                resetPosition(); // Keep in default position
            }
        }
    });

    container.addEventListener('touchcancel', () => {
        if (isRevealed) {
            revealActions(); // Keep actions revealed
        } else {
            resetPosition(); // Reset to default position
        }
    });
});

//const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400254&keyOrigin=evoxEpsilon`);
//    const targetUrlKeranhs = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400110&keyOrigin=evoxEpsilon`);
//    const targetUrlDhm = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400506&keyOrigin=evoxEpsilon`);
//    const targetUrlKor = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400004&keyOrigin=evoxEpsilon`);
//    const targetUrlGoun = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400452&keyOrigin=evoxEpsilon`);
//    const targetUrlEthn831 = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400451&keyOrigin=evoxEpsilon`);

const known = {
    "παναγίτσα": {
        "route_code": "first",
        "station": "400254"
    },
    "κεράνης": {
        "route_code": "first",
        "station": "400110"
    },
    "δημοτικό_θέατρο": {
        "route_code": "2995",
        "station": "400506"
    },
    "κοραή": {
        "route_code": "5158",
        "station": "400004"
    },
    "γούναρη": {
        "route_code": "2079",
        "station": "400452"
    },
    "εθνικής_αντιστάσεως": {
        "route_code": "1886",
        "station": "400451"
    }
}

let temporaryFunction_bus = null
let temporaryFunction_currentRemain = null
let temporaryFunction_station = null
let temporaryFunction_method = null
function notifyWhenStarted(bus, currentRemain, station, bypass, actionsElement) {
    if (localStorage.getItem("t50-username")) {
        if (localStorage.getItem("extVOASA") || bypass) {
            console.log("Start:", bus, currentRemain, station)
            fetch(`https://florida.evoxs.xyz/liveNotif?username=${localStorage.getItem("t50-username")}&deviceId=${localStorage.getItem("extVOASA")}&busId=${bus}&dictionary=${JSON.stringify(known)}&station=${station}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("runsRe").innerHTML = "Συνέχεια"
                    console.log("Live Notification Success")
                    actionsElement.querySelector('.time1').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">

<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="#fff"/>
</svg>`
                    document.getElementById("floridaNotice").classList.remove("active")
                })
                .catch(error => {
                    console.error("Failed to check for updates")
                })
        } else {
            temporaryFunction_bus = bus
            temporaryFunction_currentRemain = currentRemain
            temporaryFunction_station = station
            temporaryFunction_method = '1'
            document.getElementById("floridaNotice").classList.add("active")
        }
    } else {
        alert("Δεν υπάρχει συνδεδεμένος λογαριασμός στην συσκευή!")
    }


}

function reRunFunction(e) {
    e.innerHTML = `<svg class="fade-in-slide-up" version="1.1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="15px" height="15px"
                            viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                            <path opacity="0.2" fill="#fff"
                                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                         s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                         c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
                            <path fill="#fff" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                         C22.32,8.481,24.301,9.057,26.013,10.047z">
                                <animateTransform attributeType="xml" attributeName="transform" type="rotate"
                                    from="0 20 20" to="360 20 20" dur="0.3s" repeatCount="indefinite" />
                            </path>
                        </svg>`
    console.log("Rerunning funct", temporaryFunction_method)
    if (temporaryFunction_method === '1') {
        notifyWhenStarted(temporaryFunction_bus, temporaryFunction_currentRemain, temporaryFunction_station, 'bypass')
    } else if (temporaryFunction_method === '2') {
        notifyWhen2Mins(temporaryFunction_bus, temporaryFunction_currentRemain, temporaryFunction_station, 'bypass')
    }
}

function cancelLive() {
    document.getElementById("floridaNotice").classList.remove("active")
}
function notifyWhen2Mins(bus, currentRemain, station, bypass, actionsElement) {
    console.log("Start 2mins", bus, currentRemain, station)
    if (localStorage.getItem("t50-username")) {
        if (localStorage.getItem("extVOASA") || bypass) {
            console.log("Start:", bus, currentRemain, station)
            fetch(`https://florida.evoxs.xyz/liveNotif?username=${localStorage.getItem("t50-username")}&deviceId=${localStorage.getItem("extVOASA")}&busId=${bus}&dictionary=${JSON.stringify(known)}&station=${station}&method=2minutes`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("runsRe").innerHTML = "Συνέχεια"
                    console.log("Live Notification Success")
                    document.getElementById("floridaNotice").classList.remove("active")
                    actionsElement.querySelector('.time1').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">

<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.0243 14.3899C11.4586 14.9556 10.5414 14.9556 9.97568 14.3899L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z" fill="#fff"/>
</svg>`

                })
                .catch(error => {
                    console.error("Failed to check for updates")
                })
        } else {

            document.getElementById("floridaNotice").classList.add("active")
            temporaryFunction_bus = bus
            temporaryFunction_currentRemain = currentRemain
            temporaryFunction_station = station
            temporaryFunction_method = '2'
        }
    } else {
        alert("Δεν υπάρχει συνδεδεμένος λογαριασμός στην συσκευή!")
    }

}

function hexToRgb(hex) {
    // Remove the '#' if it's there
    hex = hex.replace(/^#/, '');

    // Convert 3-digit hex to 6-digit hex
    if (hex.length === 3) {
        hex = hex.split('').map(function (hexChar) {
            return hexChar + hexChar;
        }).join('');
    }

    // Extract the red, green, and blue values from the hex string
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}

let theme = 'day'
let stockStatusBC = '#1C1B1E'
function changeTheme() {
    if (theme === 'day') {
        localStorage.setItem("theme", 'dark')
        document.getElementById("themeName").innerText = 'Σκοτεινό'
        document.documentElement.style.setProperty('--theme-background', '18 18 18'); //night
        document.documentElement.style.setProperty('--theme-medium', '37, 37, 37');
        document.documentElement.style.setProperty("--body-color", "0 0 0")
        stockStatusBC = '#121212'
        setThemeColors('#121212')
        theme = 'night'
    } else {
        localStorage.removeItem("theme")
        document.getElementById("themeName").innerText = 'Προεπιλογή'
        document.documentElement.style.setProperty('--theme-medium', '46 44 53');
        document.documentElement.style.setProperty('--theme-background', '28 27 30'); //day
        document.documentElement.style.setProperty("--body-color", "0 0 0")
        setThemeColors('#1C1B1E')
        stockStatusBC = '#1C1B1E'
        theme = 'day'
    }
}

let steps = 0

function customs() {
    steps = 0
    document.getElementById("stepsToCustom").innerHTML = 'Med<br>Nxt'
    var script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/tinycolor/1.3.0/tinycolor.min.js';
    document.head.appendChild(script1);

    var script3 = document.createElement('script');
    script3.src = 'colorPickr.js';
    document.head.appendChild(script3);


    var link2 = document.createElement('link');
    link2.rel = 'stylesheet';
    link2.href = './pickr.css';
    document.head.appendChild(link2);

    var script4 = document.createElement('script');
    script3.src = 'https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js';
    document.head.appendChild(script4);
    document.getElementById("customizeTheme").classList.add("active")
}



function stepUp() {
    if (steps === 0) {
        document.getElementById("themeName").innerText = 'Σε Επεξεργασία'
        const inp = document.getElementById("hex").value
        document.documentElement.style.setProperty('--theme-medium', hexToRgb(inp));
        document.getElementById("stepsToCustom").innerHTML = 'BG<br>Nxt'
        steps = 1
    } else if (steps === 1) {
        const inp = document.getElementById("hex").value
        document.documentElement.style.setProperty('--theme-background', hexToRgb(inp)); //day
        document.getElementById("stepsToCustom").innerHTML = 'BODY<br>Nxt'
        steps = 2
    } else if (steps === 2) {
        const inp = document.getElementById("hex").value
        document.documentElement.style.setProperty("--body-color", hexToRgb(inp))
        document.getElementById("stepsToCustom").innerHTML = 'STATUS<br>end'
        steps = 3
    } else if (steps === 3) {
        document.getElementById("themeName").innerText = 'Προσαρμοσμένο'
        const inp = document.getElementById("hex").value
        setThemeColors(inp)
        stockStatusBC = inp
        document.getElementById("customizeTheme").classList.remove("active")
    }
}
function setCustomTheme() {
    document.getElementById("themeName").innerText = 'No config.vox'
    document.documentElement.style.setProperty('--theme-medium', '46 44 53');
    document.documentElement.style.setProperty('--theme-background', '28 27 30'); //day
    document.documentElement.style.setProperty("--body-color", "0 0 0")
    setThemeColors('#1C1B1E')
    stockStatusBC = '#1C1B1E'
    theme = 'day'
    let userInput = prompt("Please enter something:");
    if (userInput !== null) {
        alert("You entered: " + userInput);
    }
}

setInterval(function () {
    if (document.getElementById("phone").classList.contains("out")) {
        setThemeColors('#000000')
    }
}, 100)

if (sessionStorage.getItem("theme") === 'dark') {
    theme = 'day'
    changeTheme()
}

const countdownElement = document.getElementById("countdown");
let time = 100; // Start with 60 seconds

function updateCountdown() {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    // Update the countdown visually
    countdownElement.textContent = formattedTime;

    // Decrement time
    if (time > 0) {
        time--;

        // Use a timeout to count seconds accurately
        setTimeout(() => {
            updateCountdown();
        }, 1000);
    } else {
        location.reload(); // Reload the page when the countdown ends
    }
}




//ΤΟΜΕΑΣ Δ ΠΑΝΑΓΙΤΣΑ
//https://api.transitool.com/api/rin/get-next-scheduled-arrivals/20/v1.0/?t=gsa-000-xEt2lEOkD-&stop-ids=53&time-interval=60&agency-id=PIREAUS