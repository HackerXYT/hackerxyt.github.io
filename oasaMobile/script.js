const timetableDiv = document.getElementById('timetable');

const dictionary = {
    "16": "1076",
    "831": "874",
    "828": "1400",
    "420": "1164"
}




function getBus(num) {
    const dict = JSON.stringify(dictionary)
    if (dict.includes(num)) {
        const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getDailySchedule&line_code=${dictionary[`${num}`]}&keyOrigin=evoxEpsilon`);
        if (localStorage.getItem(`${num}_Timetable`)) {
            const data = JSON.parse(localStorage.getItem(`${num}_Timetable`))
            const times = data.go.map(item => formatTime(item.sde_start1));
            //displayTimes(times);
            const nextBusTime = getNextBusTime(times);
            localStorage.setItem(`${num}_Times`, JSON.stringify(times))
            //getNextBuses(times)
            if (nextBusTime) {
                displayRemainingTimeLC(nextBusTime);
            } else {
                timetableDiv.innerHTML += '<br>No more buses today';
            }
            console.warn('Preloaded from storage')
        } else {
            console.error('Error fetching data:', error)
        }
        fetch(`https://data.evoxs.xyz/proxy?key=21&targetUrl=${targetUrl}`)
            .then(response => response.json())
            .then(data => {
                console.warn("Success")
                localStorage.setItem(`${num}_Timetable`, JSON.stringify(data))
                const times = data.go.map(item => formatTime(item.sde_start1));
                //displayTimes(times);
                localStorage.setItem(`${num}_Times`, JSON.stringify(times))
                const nextBusTime = getNextBusTime(times);

                if (nextBusTime) {
                    displayRemainingTime(nextBusTime);
                } else {
                    timetableDiv.innerHTML += '<br>No more buses today';
                }
            })
            .catch(error => {
                if (localStorage.getItem(`${num}_Timetable`)) {
                    const data = JSON.parse(localStorage.getItem(`${num}_Timetable`))
                    const times = data.go.map(item => formatTime(item.sde_start1));
                    //displayTimes(times);
                    const nextBusTime = getNextBusTime(times);
                    localStorage.setItem(`${num}_Times`, JSON.stringify(times))
                    //getNextBuses(times)
                    if (nextBusTime) {
                        displayRemainingTime(nextBusTime);
                    } else {
                        timetableDiv.innerHTML += '<br>No more buses today';
                    }
                    console.warn('Loaded from storage')
                } else {
                    console.error('Error fetching data:', error)
                }

            });

        function formatTime(dateTimeString) {
            const date = new Date(dateTimeString);
            return date.toTimeString().slice(0, 5);
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
            const currentTime = new Date();
            const nextBusDate = new Date();
            nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

            const remainingTimeMs = nextBusDate - currentTime;
            const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
            const remainingHours = Math.floor(remainingMinutes / 60);
            const displayMinutes = remainingMinutes % 60;

            const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
            document.getElementById(`remain${num}`).innerText = `Next bus: ${remainingTimeText}`
            //timetableDiv.innerHTML += `<br>${remainingTimeText}`;
        }

        function displayRemainingTimeLC(nextBusTime) {
            const currentTime = new Date();
            const nextBusDate = new Date();
            nextBusDate.setHours(nextBusTime.hour, nextBusTime.minutes, 0);

            const remainingTimeMs = nextBusDate - currentTime;
            const remainingMinutes = Math.floor(remainingTimeMs / 1000 / 60);
            const remainingHours = Math.floor(remainingMinutes / 60);
            const displayMinutes = remainingMinutes % 60;

            const remainingTimeText = `${remainingHours > 0 ? `${remainingHours}h ` : ''}${displayMinutes}m`;
            document.getElementById(`remain${num}`).innerHTML = `Next bus: ${remainingTimeText} 
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
`
            //timetableDiv.innerHTML += `<br>${remainingTimeText}`;
        }

    } else {
        console.warn(`${num} not inside ${dictionary}, \n ${dict.includes(num)}`)
    }

}

getBus('16')
getBus('831')
getBus('828')
getBus('420')
let currentInt;
function showInfo(bus) {
    document.getElementById("popIt").classList.add("active")
    document.getElementById("whatBus").innerHTML = bus
    document.getElementById("16defTime").style.display = "none"
    const targetUrl = encodeURIComponent(`https://telematics.oasa.gr/api/?act=getStopArrivals&p1=400254&keyOrigin=evoxEpsilon`);

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
                

                if (data) {
                    document.getElementById("based").innerHTML = `${data[0].btime2} λεπτά`
                    if (data[0].btime2 === 1) {
                        document.getElementById("based").innerHTML = `${data[0].btime2} λεπτό`
                    }
                } else {
                    document.getElementById("based").innerHTML = `No data`
                }

            })
            .catch(error => {

                console.warn('Loading From Storage')
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
                } else {
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
                currentInt = setInterval(function () {
                    showInfo(bus)
                }, 25000)

            });
    } else {
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
    currentInt = setInterval(function () {
        showInfo(bus)
    }, 25000)


}

function getNextBuses(times) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

    const remainingTimes = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
        const diff = busTime - currentTime;
        return diff >= 0 ? diff : diff + 24 * 60; // Adjust for next day if time is negative
    }).filter(diff => diff >= 0); // Only keep times that are in the future

    remainingTimes.sort((a, b) => a - b); // Sort the times in ascending order

    // Convert remaining times to the desired format
    const nextBuses = remainingTimes.map(diff => `${diff}`);

    const fixItFirst = nextBuses.slice(0, 5)
    let theNewJsonGenerale = []
    fixItFirst.forEach(function (eachOne) {
        console.log(eachOne)
        if (eachOne > 60) {
            let hours = Math.floor(eachOne / 60);
            let remainingMinutes = eachOne % 60;
            let finale;
            if (hours === 1) {
                finale = `${hours} ώρα, ${remainingMinutes} λεπτά`
            } else {
                finale = `${hours} ώρες, ${remainingMinutes} λεπτά`
            }
            //console.log(hours + " hours and " + remainingMinutes + " minutes");
            theNewJsonGenerale.push(finale)
        } else {
            let finale;
            if (eachOne == 1) {
                finale = `${eachOne} λεπτό`
            } else {
                finale = `${eachOne} λεπτά`
            }
            theNewJsonGenerale.push(finale)
        }

    })
    return theNewJsonGenerale;
}

function getNextBusesPanagitsa(times) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Current time in minutes since midnight

    const remainingTimes = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const busTime = hours * 60 + minutes; // Bus time in minutes since midnight
        const diff = busTime - currentTime;
        return diff >= 0 ? diff : diff + 24 * 60; // Adjust for next day if time is negative
    }).filter(diff => diff >= 0); // Only keep times that are in the future

    remainingTimes.sort((a, b) => a - b); // Sort the times in ascending order

    // Convert remaining times to the desired format
    const nextBuses = remainingTimes.map(diff => `${diff}`);

    const nextBusJson = nextBuses.slice(0, 5)
    let thenewJson = []
    nextBusJson.forEach(function (eachOne) {
        //console.log(eachOne)
        //const newNum = Number(eachOne) + 4 + "'"
        //thenewJson.push(newNum)
        console.log(`eachOne -> ${eachOne} > 60 => ${eachOne > 60}`)
        if (eachOne > 60) {

            let hours = Math.floor(eachOne / 60);
            let remainingMinutes = eachOne % 60;
            let finale;
            if (hours === 1) {
                finale = `${hours} ώρα, ${Number(remainingMinutes) + 4} λεπτά`
            } else {
                finale = `${hours} ώρες, ${Number(remainingMinutes) + 4} λεπτά`
            }
            //console.log(hours + " hours and " + remainingMinutes + " minutes");
            thenewJson.push(finale)
        } else {
            let finale;
            if (eachOne === 1) {
                finale = `${Number(eachOne) + 4} λεπτά`
            } else {
                finale = `${Number(eachOne) + 4} λεπτά`
            }
            thenewJson.push(finale)
        }
    })
    return thenewJson; // Return the next 5 buses
}

function goBack() {
    document.getElementById("popIt").classList.remove("active")
    clearInterval(currentInt)
}