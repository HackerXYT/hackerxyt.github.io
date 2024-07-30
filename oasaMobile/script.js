
sessionStorage.setItem("currentBuild", currentBuild)

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

// Call disableScroll() to disable scrolling
disableScroll();

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
                        document.getElementById(`remain${num}`).innerHTML = `<img width="15px" height="15px" src='snap.png'>`
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
                    document.getElementById(`remain${num}`).innerHTML = `<img width="15px" height="15px" src='snap.png'>`
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
                        document.getElementById(`remain${num}`).innerHTML = `<img width="15px" height="15px" src='snap.png'>`
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
let currentInt;
function showInfo(bus, isInt) {
    document.getElementById("904live1").style.display = 'none'
    disableOverflow()
    document.getElementById("main-wrapper").style.overflow = 'hidden'
    if (!document.getElementById("popIt").classList.contains("active") && isInt) {
        console.log(`Resolved Interval Bug [info: busReq: ${bus}, stoppedBy: classList]`)
        return;
    }
    if (sessionStorage.getItem("currentWatch") !== bus && isInt) {
        console.log(`Resolved Interval Bug [info: busReq: ${bus}, stoppedBy: currentWatch]`)
        return;
    }

    if (bus === "16") {
        document.getElementById("Businfo").innerHTML = `Ε.Ω.Α:<br>3-8 λεπτά από αφετηρία`
        document.getElementById("Businfo").style.opacity = '1'
    }
    if (bus === "831") {
        document.getElementById("Businfo").innerHTML = `Ε.Ω.Α:<br>9-15 λεπτά από αφετηρία<br>[Αφετ.]->[Εθν. Αντιστάσεως]`
        document.getElementById("Businfo").style.opacity = '1'
    }
    if (bus === "420") {
        document.getElementById("Businfo").innerHTML = `Ε.Ω.Α:<br>~11 λεπτά από αφετηρία<br>[Αφετ.]->[Εθν. Αντιστάσεως]`
        document.getElementById("Businfo").style.opacity = '1'
    }
    document.getElementById("popIt").classList.add("active")
    document.getElementById("whatBus").innerHTML = bus
    document.getElementById("16defTime").style.display = "none"
    document.getElementById("049live1").style.display = "none"
    document.getElementById("049live2").style.display = "none"
    sessionStorage.setItem("currentWatch", bus)
    const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400254&keyOrigin=evoxEpsilon`);
    const targetUrlKeranhs = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400110&keyOrigin=evoxEpsilon`);
    const targetUrlDhm = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400506&keyOrigin=evoxEpsilon`);
    const targetUrlKor = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400004&keyOrigin=evoxEpsilon`);

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
        document.getElementById("16defTime").style.display = ""
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        const remains = getNextBusesPanagitsa(times)
        console.log(remains)
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';

            // Create the text node for the Greek text 'Παναγίτσα'
            var textNode = document.createTextNode('Παναγίτσα');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.textContent = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);

            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);
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
                    const remains = getNextBusesPanagitsa(times)
                    console.log(remains)
                    document.getElementById("based").innerHTML = `<img src="snap.png" width="25px">`
                    document.getElementById("16defTime").style.display = ""
                    remains.forEach(function (remainTime) {
                        // Create the main div element with the class 'timeBox'
                        var timeBox = document.createElement('div');
                        timeBox.className = 'timeBox';

                        // Create the text node for the Greek text 'Παναγίτσα'
                        var textNode = document.createTextNode('Παναγίτσα');

                        // Append the text node to the main div element
                        timeBox.appendChild(textNode);

                        // Create the span element and set its content to '10m'
                        var span = document.createElement('span');
                        span.textContent = remainTime;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);

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
                    const remains = getNextBuses(times)
                    console.log(remains)
                    remains.forEach(function (remainTime) {
                        // Create the main div element with the class 'timeBox'
                        var timeBox = document.createElement('div');
                        timeBox.className = 'timeBox';

                        var textNode = document.createTextNode('Πειραιάς');

                        // Append the text node to the main div element
                        timeBox.appendChild(textNode);

                        // Create the span element and set its content to '10m'
                        var span = document.createElement('span');
                        span.textContent = remainTime;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);

                        // Optionally, append the timeBox to the body or another element in the DOM
                        document.getElementById("evoxBased").appendChild(timeBox);


                    })
                } else {
                    console.log("VV:", bus)
                    document.getElementById("16defTime").style.display = "none"
                    const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
                    const remains = getNextBuses(times)
                    console.log(remains)
                    remains.forEach(function (remainTime) {
                        // Create the main div element with the class 'timeBox'
                        var timeBox = document.createElement('div');
                        timeBox.className = 'timeBox';

                        var textNode = document.createTextNode('Transition');

                        // Append the text node to the main div element
                        timeBox.appendChild(textNode);

                        // Create the span element and set its content to '10m'
                        var span = document.createElement('span');
                        span.textContent = remainTime;

                        // Append the span element to the main div element
                        timeBox.appendChild(span);

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
                currentInt = setInterval(function () {
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
        const remains = getNextBuses(times)
        console.log(remains)
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';

            var textNode = document.createTextNode('Πειραιάς');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.textContent = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);

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
        const remains = getNextBuses(times)
        console.log(remains)
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';

            var textNode = document.createTextNode('Πλ. Καραϊσκάκη');

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.textContent = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);
            timeBox.style.fontSize = "16px";

            // Optionally, append the timeBox to the body or another element in the DOM
            document.getElementById("evoxBased").appendChild(timeBox);


        })
    } else {
        document.getElementById("16defTime").style.display = "none"
        document.getElementById("049live1").style.display = "none"
        document.getElementById("049live2").style.display = "none"
        const times = JSON.parse(localStorage.getItem(`${bus}_Times`))
        const remains = getNextBuses(times)
        console.log(remains)
        remains.forEach(function (remainTime) {
            // Create the main div element with the class 'timeBox'
            var timeBox = document.createElement('div');
            timeBox.className = 'timeBox';

            let textNode;
            if (bus === "420") {
                textNode = document.createTextNode('Πειραιάς');
            } else if (bus === "831") {
                textNode = document.createTextNode('Πειραιάς');
            } else {
                textNode = document.createTextNode('Transition');
            }

            // Append the text node to the main div element
            timeBox.appendChild(textNode);

            // Create the span element and set its content to '10m'
            var span = document.createElement('span');
            span.textContent = remainTime;

            // Append the span element to the main div element
            timeBox.appendChild(span);

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

function getNextBuses(times) {
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

    let recon = false
    // Convert remaining times to the desired format
    const nextBuses = busTimes.slice(0, 7).map((bus, index) => {
        const diff = bus.remainingTime;
        let formattedRemainingTime;
        if (diff > 60) {
            let hours = Math.floor(diff / 60);
            let remainingMinutes = diff % 60;
            if (hours === 1) {
                formattedRemainingTime = `${hours} ώρα, ${remainingMinutes} λεπτά`;
            } else {
                formattedRemainingTime = `${hours} ώρες, ${remainingMinutes} λεπτά`;
            }
            if (hours >= 1) {
                recon = true
            }
        } else {
            formattedRemainingTime = `${diff} λεπτά`;
        }

        if (recon) {
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

function getNextBusesPanagitsa(times) {
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
    const nextBuses = busTimes.slice(0, 7).map((bus, index) => {

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
        document.getElementById('profileUsername').innerText = localStorage.getItem("t50-username")
        document.getElementById('profileEmail').innerText = localStorage.getItem("t50-email")
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
    document.getElementById("phone").style.transform = "scale(0.97)"
    document.getElementById("floridaCont").classList.add("active")
    document.getElementById("main-wrapper").style.overflow = 'hidden'
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
                    document.getElementById("phone").style.transform = "scale(0.97)"
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
                    document.getElementById("phone").style.transform = "scale(0.97)"
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
                document.getElementById("phone").style.transform = "scale(0.97)"
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
                            document.getElementById("phone").style.transform = "scale(0.97)"
                            floridaCont.style.top = '';

                            $("#loginForm").fadeOut("fast", function () {
                                $("#setupNotif2").fadeIn("fast", function () {

                                })
                            })
                        })

                    }, 550)
                }, 500)
            } else {
                document.getElementById("registerBt").innerHTML = `Δοκιμάστε άλλο όνομα χρήστη`
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
            document.getElementById("userTheName").innerText = localStorage.getItem("oasa-name")
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
                    span.textContent = payload.title;
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

document.getElementById('receiveEnter').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
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
                    console.log('Resource not found (404)');
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

