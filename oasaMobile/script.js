
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
}


function toggleDoodle() {
    const lcl = localStorage.getItem("disableDoodle")
    if (lcl) { //disabled, enable it
        localStorage.removeItem("disableDoodle")
        doodle()
        console.log("disabled, enabling doodle")
    } else { //enabled

        localStorage.setItem("disableDoodle", 'yes')
        document.getElementById("logo").src = 'doodle.png'
        console.log("enabled. disabling doodle")
    }
}
if (sessionStorage.getItem("pfp") && sessionStorage.getItem("pfp").includes('<!DOCTYPE html>')) {
    console.log(`PFP: DOCTYPE 404`)
    sessionStorage.removeItem("pfp")
}
if (sessionStorage.getItem("updateSuccess")) {
    document.getElementById("updatemanual").innerHTML = `<span style="color: green">updated!</span>`
    sessionStorage.removeItem("updateSuccess")
    setTimeout(function () {
        document.getElementById("updatemanual").innerHTML = `update`
    }, 1500)

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

                    console.log("Formatted times:", times); // Debug log

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
                    console.log(times);
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

                console.log("Formatted times:", times); // Debug log

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

                    console.log("Formatted times:", times); // Debug log

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
            console.log("getting times", times);
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
    document.getElementById("phone").style.transform = "scale(0.95)"
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
        const remains = getNextBusesPanagitsa(times, more)
        console.log(remains)
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
            span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

            // Append the span element to the main div element
            timeBox.appendChild(span);

            var optDiv = document.createElement('div');
            optDiv.style.display = 'none'
            optDiv.style.height = 'auto'
            timeBox.appendChild(optDiv);


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
                        span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);
                        var optDiv = document.createElement('div');
                        optDiv.style.display = 'none'
                        optDiv.style.height = 'auto'
                        timeBox.appendChild(optDiv);

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
                        span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);
                        var optDiv = document.createElement('div');
                        optDiv.style.display = 'none'
                        optDiv.style.height = 'auto'
                        timeBox.appendChild(optDiv);

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
                        span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);
                        var optDiv = document.createElement('div');
                        optDiv.style.display = 'none'
                        optDiv.style.height = 'auto'
                        timeBox.appendChild(optDiv);

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
            span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            var optDiv = document.createElement('div');
            optDiv.style.display = 'none'
            optDiv.style.height = 'auto'
            timeBox.appendChild(optDiv);

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
            span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            timeBox.style.fontSize = "16px";

            var optDiv = document.createElement('div');
            optDiv.style.display = 'none'
            optDiv.style.height = 'auto'
            timeBox.appendChild(optDiv);
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
            span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            timeBox.style.fontSize = "16px";

            var optDiv = document.createElement('div');
            optDiv.style.display = 'none'
            optDiv.style.height = 'auto'
            timeBox.appendChild(optDiv);
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
            span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            var optDiv = document.createElement('div');
            optDiv.style.display = 'none'
            optDiv.style.height = 'auto'
            timeBox.appendChild(optDiv);

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
    document.getElementById("phone").style.transform = ""
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
    document.getElementById("phone").style.transform = "scale(0.95)"
    document.getElementById("floridaCont").classList.add("active")
    document.getElementById("main-wrapper").style.overflow = 'hidden'
    loadActive()
}

function loadActive() {
    if (!localStorage.getItem("t50-username")) {
        console.log("<spans style='color: red'>Cancelled active schedo check due to lcstorage username being null!</span>")
        return;
    }
    fetch(`https://florida.evoxs.xyz/activeSchedo?username=${localStorage.getItem("t50-username")}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.length === 0) {
                console.log("No Active Schedos")
                const container = document.getElementById("pendingContainer")
                container.innerHTML = ''
                document.getElementById("pendingNotifications").style.display = 'none'
            } else {
                document.getElementById("pendingNotifications").style.display = ''
                console.log("Active schedos found")
                const filteredData = data.filter(item => item.id === localStorage.getItem("extVOASA"));
                console.log("data ready")
                console.log(filteredData)
                const container = document.getElementById("pendingContainer")
                container.innerHTML = ''
                if (filteredData.length === 0) {
                    document.getElementById("pendingNotifications").style.display = 'none'
                    return;
                }
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

        document.getElementById("phone").style.transform = "scale(1)"
        setTimeout(function () {
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
        document.getElementById("phone").style.transform = "scale(1)"
        setTimeout(function () {
            floridaCont.style.top = '';
        }, 500)

    } else {
        console.log("Element with ID '" + elementId + "' is inside the viewport.");
    }
}

//console.log("Debug Active!")
//florida()

function setup_begin() {
    if (localStorage.getItem("extVOASA")) {
        console.log("Florida already attached!")
        return;
    }
    console.log("Attaching Florida..")
    if ('serviceWorker' in navigator) {
        console.log("Service Worker Located")
        setTimeout(function () {

            document.getElementById("floridaCont").classList.remove("active")
            document.getElementById("phone").style.transform = "scale(1)"
            setTimeout(function () {
                document.getElementById("floridaCont").style.backgroundColor = `#242426`
                $("#homePage").fadeOut("fast", function () {
                    document.getElementById("floridaCont").classList.add("active")
                    document.getElementById("phone").style.transform = "scale(0.95)"
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
            document.getElementById("phone").style.transform = "scale(1)"
            setTimeout(function () {
                document.getElementById("floridaCont").style.backgroundColor = `#242426`
                $("#homePage").fadeOut("fast", function () {
                    document.getElementById("floridaCont").classList.add("active")
                    document.getElementById("phone").style.transform = "scale(0.95)"
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
        document.getElementById("phone").style.transform = "scale(1)"

        setTimeout(function () {
            $("#case1").fadeOut("fast", function () {
            })
            document.getElementById("floridaCont").style.backgroundColor = `#000`
            $("#homePage").fadeOut("fast", function () {
                document.getElementById("floridaCont").classList.add("active")
                document.getElementById("phone").style.transform = "scale(0.95)"
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
                    document.getElementById("phone").style.transform = "scale(1)"
                    setTimeout(function () {
                        document.getElementById("floridaCont").style.backgroundColor = `#000`
                        $("#homePage").fadeOut("fast", function () {
                            document.getElementById("floridaCont").classList.add("active")
                            document.getElementById("phone").style.transform = "scale(0.95)"
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


    } else {
        console.log("External V:", localStorage.getItem("extVOASA"))
    }
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
            document.getElementById("updateAvailable").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24" fill="none">
<circle cx="12" cy="12" r="9" fill="#2A4157" fill-opacity="0.24"/>
<path d="M12 21C14.0822 21 16.1 20.278 17.7095 18.9571C19.3191 17.6362 20.4209 15.798 20.8271 13.7558C21.2333 11.7136 20.9188 9.59376 19.9373 7.75743C18.9558 5.9211 17.3679 4.48191 15.4442 3.68508C13.5205 2.88826 11.38 2.78311 9.38744 3.38754C7.3949 3.99197 5.67358 5.26858 4.51677 6.99987C3.35997 8.73115 2.83925 10.81 3.04334 12.8822C3.24743 14.9543 4.1637 16.8916 5.63604 18.364" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
<path d="M16 10L12.402 14.3175C11.7465 15.1042 11.4187 15.4976 10.9781 15.5176C10.5375 15.5375 10.1755 15.1755 9.45139 14.4514L8 13" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
</svg>`
            setTimeout(function () {
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

if (localStorage.getItem("t50-username") && localStorage.getItem("16_Times") || localStorage.getItem("isNewOasa") === "false") {
    console.log("User is not new")
} else {
    document.getElementById("phone").style.transform = "scale(0.98)"
    document.getElementById("homePage").style.display = "none"
    document.getElementById("newUser").style.display = ""
    document.getElementById("grabFlorida").style.display = 'none'
    document.getElementById("floridaCont").classList.add("active")
}

function dismissSetup() {
    localStorage.setItem("isNewOasa", 'false')
    localStorage.setItem("hasDismissedSetup", 'true')
    document.getElementById("floridaCont").classList.remove("active")
    document.getElementById("phone").style.transform = "scale(1)"
    setTimeout(function () {
        document.getElementById("homePage").style.display = ""
        document.getElementById("newUser").style.display = "none"
        document.getElementById("grabFlorida").style.display = ''
    }, 800)

}

function startSetup() {
    document.getElementById("phone").style.transform = "scale(0.96)"
    document.getElementById("step2").classList.add("active")
}

function goBackToSetup(step) {
    if (step === "1") {
        document.getElementById("phone").style.transform = "scale(0.98)"
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
    const askedServices = []
    let vo1 = document.getElementById("vo1").innerHTML
    let vo2 = document.getElementById("vo2").innerHTML
    let vo3 = document.getElementById("vo3").innerHTML
    let vo4 = document.getElementById("vo4").innerHTML
    let vo5 = document.getElementById("vo5").innerHTML
    if (vo1.includes("Unchecked")) {
        console.log("Setup cancelled")
        return;
    } else {
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
        if (askedServices.includes('oasa')) {
            console.log("will only do oasa")
            localStorage.setItem("isNewOasa", 'false')
            document.getElementById("floridaCont").classList.remove("active")
            document.getElementById("phone").style.transform = "scale(1)"
            setTimeout(function () {
                document.getElementById("homePage").style.display = ""
                document.getElementById("newUser").style.display = "none"
                document.getElementById("grabFlorida").style.display = ''
                document.getElementById("step2").classList.remove("active")
            }, 800)
        } else {
            console.log(`askedServ: ${askedServices}\nt/f: ${askedServices.includes('oasa')}`)
        }




    }

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

    const lineIdToFind = id;
    const matchingLines = fullLine.filter(line => line.LineID === lineIdToFind);
    activeBusPage = id
    // Log the LineDescr of each matching line
    matchingLines.forEach(line => {
        console.log("here", line)
        console.log(line.LineDescr);
        console.log('Line Code:', line.LineCode);

        if (matchingLines.length > 1) {
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
function findStops(lineCode, sentElementByfindBus) {
    currentLineCode = lineCode
    const getStops = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getRoutesForLine&p1=${lineCode}&keyOrigin=evoxEpsilon`);
    fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${getStops}`)
        .then(response => response.json())
        .then(data => {

            if (data) {
                const working = data[0].route_code
                console.log(working)//
                $("#allBusesContainer").fadeOut("fast")

                document.getElementById("spawnStopsHere").style.display = 'flex'
                document.getElementById("searchHere").style.display = 'none'
                document.getElementById("spawnHere").style.display = 'none'
                let randomId = Math.floor(1000000000 + Math.random() * 9000000000);
                const lc = localStorage.getItem("oasa_favorites")
                document.getElementById("favoriteBusButton").style.display = 'block'
                document.getElementById("dailytimetable").style.display = 'block'
                document.getElementById("goback").style.display = 'block'
                if (lc) {
                    const fav = document.getElementById("favoriteBusButton")
                    const string = lc
                    console.log(string)
                    if (string.includes(`"${activeBusPage}"`)) {
                        //alert("is favorite")

                        fav.setAttribute("data-f", "true")
                        fav.innerHTML = `Αφαίρεση ${activeBusPage} από αγαπημένα`
                        fav.classList.remove("red")
                        fav.classList.add("favoriteBus")
                    } else {
                        fav.setAttribute("data-f", "false")
                        fav.innerHTML = `Προσθήκη ${activeBusPage} στα αγαπημένα`
                        fav.classList.add("red")
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
                }
                const stopsFinal = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetRoutesDetailsAndStops&p1=${working}&keyOrigin=evoxEpsilon`);
                fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${stopsFinal}`)
                    .then(response => response.json())
                    .then(bata => {
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

function back() {
    reloadFavorites()
    document.getElementById("favoriteBusButton").style.display = 'none'
    document.getElementById("dailytimetable").style.display = 'none'
    document.getElementById("goback").style.display = 'none'
    document.getElementById('alert').classList.remove('active')
    document.getElementById("spawnHere").style.display = 'flex'
    document.getElementById("spawnStopsHere").style.display = 'none'
    document.getElementById("searchHere").style.display = 'none'
    document.getElementById("spawnStopsHere").innerHTML = ''

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
            if (lc && lc.includes(child.querySelector('.lineNOCLASS').innerHTML)) {
                child.classList.add("favoriteBus")
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
        $("#svgClear").fadeIn("fast")
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
            if (busValue.includes(substring)) {
                // Clone the button to preserve the original
                const buttonClone = button.cloneNode(true);
                targetDiv.appendChild(buttonClone);
            }
        });
    }
});

document.getElementById('receiveEnter').addEventListener('focus', function () {
    back()
    if (document.getElementById('receiveEnter').value === '') {
        const sourceDiv = document.getElementById('spawnHere');
        sourceDiv.style.display = 'flex'
        $("#allBusesContainer").fadeOut("fast")
    }
    $("#svgClear").fadeIn("fast")


});

function unfocus(event) {
    const sourceDiv = document.getElementById('spawnHere');
    sourceDiv.style.display = 'none'
    const searchHere = document.getElementById('searchHere');
    searchHere.style.display = 'none'
    document.getElementById('receiveEnter').value = ''
    $("#allBusesContainer").fadeIn("fast")
    $("#svgClear").fadeOut("fast")
    $("#spawnStopsHere").fadeOut("fast")
    $("#favoriteBusButton").fadeOut("fast")
    $("#dailytimetable").fadeOut("fast")
    $("#goback").fadeOut("fast")
    reloadFavorites()
    event.preventDefault();

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
        fav.classList.remove("red")
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
        fav.classList.add("red")
        fav.classList.remove("favoriteBus")
    }
}

let numstartto = 0; // Initialize the variable numstartto
let jsonForBTNIndex = {}; // Initialize the JSON object to store elements by ID
let reShown;//?
function handleTimeBoxClick(element, bypass) {
    if (bypass) {
        const theElem = document.getElementById(`global${element.id}`);
        if (!theElem) {
            console.error("Element not found for ID:", `global${element.id}`);
            return;
        }

        // Remove active class
        theElem.classList.remove("thisisActive");

        const imgElement = theElem.querySelector('img');
        if (imgElement) {
            // Rotate the img element by 0 degrees
            imgElement.style.transform = 'rotate(0deg)';
        }

        const optDiv = theElem.querySelector('div');
        if (optDiv) {
            optDiv.style.opacity = '0';
        }

        theElem.style.height = '65px';
        return;
    }

    if (element.classList.contains("thisisActive")) {
        // Do nothing if the element is already active

        // Remove active class
        element.classList.remove("thisisActive");

        const imgElement = element.querySelector('img');
        if (imgElement) {
            // Rotate the img element by 0 degrees
            imgElement.style.transform = 'rotate(0deg)';
        }

        const optDiv = element.querySelector('div');
        if (optDiv) {

            optDiv.style.opacity = '0';
            setTimeout(function () {
                optDiv.innerHTML = ''
            }, 800)

        }

        element.style.height = '65px';
        element.style.backgroundColor = '#333'
        if (reShown === true) {
            document.getElementById("Businfo").style.opacity = '1'
            reShown = false
        }
        return;
    }

    numstartto++; // Increment the global variable

    // Assign a new ID to the element
    element.id = `globalelmt${numstartto}`;

    // Store the element in the JSON object
    jsonForBTNIndex[`elmt${numstartto}`] = element;
    console.log(jsonForBTNIndex);

    const optDiv = element.querySelector('div');
    if (optDiv) {
        console.log("optDiv Found")
        optDiv.style.opacity = '0';
        optDiv.style.display = 'block';
        setTimeout(() => {
            optDiv.style.opacity = '1';
        }, 100);

        const timetable = element.querySelector('span');
        let cleanedString = timetable.innerHTML.replace(/<img[^>]*>/g, '');
        console.log(cleanedString);


        optDiv.innerHTML = `
            <p style="margin-top: 10px;">Επιλέξτε πότε θα θέλατε να ενημερωθείτε για το λεωφορείο ${currentBus}:</p>
            <div onclick="this.classList.toggle('active');attachSchedo(this)" data-t="${cleanedString}" class="actionButton online">
                Αφετηρία
            </div>
            <div id='elmt${numstartto}' onclick="this.classList.toggle('active')" class="actionButton">
                Ακύρωση
            </div>
        `;
    }

    element.classList.add("thisisActive");

    const imgElement = element.querySelector('img');
    if (imgElement) {
        // Rotate the img element by 180 degrees
        imgElement.style.transform = 'rotate(180deg)';
    }
    element.style.backgroundColor = '#232323'
    if (document.getElementById("Businfo").style.opacity === '1') {
        document.getElementById("Businfo").style.opacity = '0'
        reShown = true
    } else {
        reShown = false
        console.log("the opacity is already set to 0")
    }

    element.style.height = '200px';
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
        currentBuild: ${sessionStorage.getItem("currentBuild")}<br><br>Device ID (extV): ${localStorage.getItem("extVOASA")}<br><br>ServiceWorker in window: ${'serviceWorker' in navigator}<br><br>hasDismissedSetup: ${localStorage.getItem("hasDismissedSetup")}<br><br>privileges: ${sessionStorage.getItem("privileges")}<br><br>hasLocalPfp: ${sessionStorage.getItem("pfp") === true}<br><br>__pwacompat_manifest: <br><span style="color: yellow">${sessionStorage.getItem('__pwacompat_manifest')}</span>`
    } else {
        console.log("Will show A")
        innerb.style.display = "none"
        innera.style.display = "flex"
        terminalBT.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        deviceBT.style.backgroundColor = "transparent";
    }
}

//OASA LIVE


//https://telematics.oasa.gr/api/?act=webGetLines
//https://telematics.oasa.gr/api/?act=getLineName&p1=1076
const allLines = encodeURIComponent(`https://telematics.oasa.gr/api/?act=webGetLines&keyOrigin=evoxEpsilon`);

fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${allLines}`)
    .then(response => response.json())
    .then(data => {
        fullLine = data
        if (data) {
            //data.forEach(eachLine => {
            //});
            let lc = localStorage.getItem("oasa_favorites")
            if (lc) {
                lc = JSON.parse(lc)
            }
            let linesPromises = data.map(eachLine => {
                return new Promise((resolve, reject) => {
                    const logger = `${eachLine.LineDescr} [${eachLine.LineID}]`

                    //console.log(logger)
                    if (lc && lc.includes(eachLine.LineID)) {
                        document.getElementById("spawnHere").innerHTML = `${document.getElementById("spawnHere").innerHTML}<button data-bus="${eachLine.LineID}" class="fade-in-slide-up favoriteBus oasaButton" onclick="findBus('${eachLine.LineID}', this)"><span class="lineNOCLASS">${eachLine.LineID}</span><span class="button-text">${capitalizeWords(eachLine.LineDescr)}</span><vox class="loadingIndicatorNOCLASS"></vox></button>`
                    } else {
                        document.getElementById("spawnHere").innerHTML = `${document.getElementById("spawnHere").innerHTML}<button data-bus="${eachLine.LineID}" class="fade-in-slide-up oasaButton" onclick="findBus('${eachLine.LineID}', this)"><span class="lineNOCLASS">${eachLine.LineID}</span><span class="button-text">${capitalizeWords(eachLine.LineDescr)}</span><vox class="loadingIndicatorNOCLASS"></vox></button>`
                    }


                    // Resolve the promise after the stop is processed
                    resolve();
                });
            });

            // Wait for all promises to resolve (i.e., all stops are spawned)
            Promise.all(linesPromises)
                .then(() => {
                    // Code to run after all elements are spawned
                    console.log('All lines have been spawned!');
                    let element_b = document.getElementById('indexLoading');
                    if (element_b) {
                        element_b.remove();
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
            document.getElementById("spawnHere").innerHTML = 'Ο διακομιστής επανεκκινείται, δοκιμάστε ξανά σε 2-3 λεπτά.'
        } else {
            //alert(`Δεν ηταν δυνατη η συνδεση στον διακομιστη.\nΑγνωστο σφαλμα`)
            document.getElementById("spawnHere").innerHTML = 'Δεν ηταν δυνατη η συνδεση στον διακομιστη.<br>Αγνωστο σφαλμα'
        }
        if (error.toString().includes('Unexpected token')) {
            alert("OASA SQL error. Δοκιμάστε ξανά.")
            document.getElementById("spawnHere").innerHTML = "OASA SQL error. Δοκιμάστε ξανά."
        }

    })

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
        console.log("getting times", times);
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

            console.log("Formatted times:", times); // Debug log

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
    $("#svgClear").fadeIn("fast")
}

function showInfoCSTM(bus, isInt, more) {
    isCustom = true
    currentBus = bus
    howManyShowed = more ?? 7
    document.getElementById("904live1").style.display = 'none'
    disableOverflow()
    document.getElementById("phone").style.transform = "scale(0.95)"
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

    document.getElementById("evoxBased").innerHTML = ""
    document.getElementById("16defTime").style.display = "none"
    document.getElementById("16gounTime").style.display = "none"
    document.getElementById("049live1").style.display = "none"
    document.getElementById("049live2").style.display = "none"
    document.getElementById("831live1").style.display = "none"
    function getNextBusTimeLIVE(times) {
        console.log("getting times", times);
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

            console.log("Formatted times:", times); // Debug log
            console.warn(data)

            const nextBusTime = getNextBusTimeLIVE(times);

            if (nextBusTime) {
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
                    textNode = document.createTextNode((capitalizeWords(activeBusNamePage.split(" - ")[0]).length > 13 ? capitalizeWords(activeBusNamePage.split(" - ")[0]).substring(0, 11) + ".." : capitalizeWords(activeBusNamePage.split(" - ")[0])));


                    // Append the text node to the main div element
                    timeBox.appendChild(textNode);

                    // Create the span element and set its content to '10m'
                    var span = document.createElement('span');
                    span.innerHTML = remainTime + `<img src="arrow-down.svg" width="25px" height="25px">`;

                    // Append the span element to the main div element
                    timeBox.appendChild(span);
                    var optDiv = document.createElement('div');
                    optDiv.style.display = 'none'
                    optDiv.style.height = 'auto'
                    timeBox.appendChild(optDiv);

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
                currentInt = setInterval(function () {
                    showInfoCSTM(bus, 'interval')
                }, 25000)
            } else {
                alert("Δεν υπάρχουν διαθέσιμες αφίξεις για την επιλεγμένη γραμμή.")
                document.getElementById("popIt").classList.remove("active")
                document.getElementById('phone').style.transform = ''
                document.getElementById("main-wrapper").style.overflow = 'auto'
                isCustom = false
                console.error(times)
                //document.getElementById(id).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`;
            }
        })
        .catch(error => {
            console.log('Load Favorite Times Error:', error)
            //document.getElementById("netStats").innerHTML = offlineSvg
            alert("Something Failed [14]")
            //document.getElementById(`${id}`).innerHTML = `<img width="auto" height="18px" src='${errorIconTime()}'>`;

        });
}

function timetable() {
    showInfoCSTM(activeBusPage)
}

function showCurrentStop() {
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
                    document.getElementById("phone").style.transform = "scale(0.95)"
                    document.getElementById("main-wrapper").style.overflow = 'hidden'
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
                    let matchFound = false; // Flag to track if a match is found



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
                                var optDiv = document.createElement('div');
                                optDiv.style.display = 'none'
                                optDiv.style.height = 'auto'
                                timeBox.appendChild(optDiv);

                                // Optionally, append the timeBox to the body or another element in the DOM
                                document.getElementById("evoxBased").appendChild(timeBox);
                                //alert(`${arrive.btime2} λεπτά`);
                                matchFound = true; // Set flag to true if a match is found
                            }
                        });
                    })

                    //alert(finale)


                    // Create the main div element with the class 'timeBox'



                })
                .catch(error => {
                    //document.getElementById("activeBuses").innerHTML = `Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]`
                    //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]");
                    console.log("getStop [65] error:", error);
                    document.getElementById("evoxBased").innerHTML = 'Κανένα Λεωφορείο Δεν Ερχέται Στην Τρέχουσα Στάση.'
                });



        })
        .catch(error => {
            //alert("Δεν βρέθηκαν αντιστοιχίες για την καθορισμένη διαδρομή. [E]");
            console.log("getStop [63] error:", error);
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
                notifyWhenStarted(currentBus, content.querySelector('span').innerText, station)
            }
        } else {
            const station = content.querySelector('.liveCollumn').querySelector('vox').innerText.toLowerCase().replace(/\s+/g, '_')
            actions.querySelector('.time1').innerHTML = on2minutes
            actions.querySelector('.time1').onclick = function () {
                notifyWhen2Mins(currentBus, content.querySelector('span').innerText, station)
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
function notifyWhenStarted(bus, currentRemain, station, bypass) {
    if (localStorage.getItem("t50-username")) {
        if (localStorage.getItem("extVOASA") || bypass) {
            console.log("Start:", bus, currentRemain, station)
            fetch(`https://florida.evoxs.xyz/liveNotif?username=${localStorage.getItem("t50-username")}&deviceId=${localStorage.getItem("extVOASA")}&busId=${bus}&dictionary=${JSON.stringify(known)}&station=${station}`)
                .then(response => response.text())
                .then(data => {
                    document.getElementById("runsRe").innerHTML = "Συνέχεια"
                    console.log("Live Notification Success")
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
    if(temporaryFunction_method === '1') {
        notifyWhenStarted(temporaryFunction_bus, temporaryFunction_currentRemain, temporaryFunction_station, 'bypass')
    } else if (temporaryFunction_method === '2') {
        notifyWhen2Mins(temporaryFunction_bus, temporaryFunction_currentRemain, temporaryFunction_station, 'bypass')
    }
}

function cancelLive() {
    document.getElementById("floridaNotice").classList.remove("active")
}
function notifyWhen2Mins(bus, currentRemain, station, bypass) {
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

