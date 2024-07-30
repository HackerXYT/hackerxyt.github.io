let currentDay;
let tasco;
//fetch(`https://data.evoxs.xyz/tasco${localStorage.getItem("t50-username")}.tasco`)
//    .then(response => response.json())
//    .then(data => {
//        tasco = data
//        loadHome()
//    })
//    .catch(error => {
//        //alert("json failed to load")
//        tasco = {
//            'message': "Failed to resolve .tasco"
//        }
//
//    })
if (localStorage.getItem("t50-username") && localStorage.getItem("t50pswd") && localStorage.getItem("t50-email")) {
    fetch(`https://data.evoxs.xyz/tasco`, {
        method: "POST",
        body: JSON.stringify({
            username: localStorage.getItem("t50-username"),
            password: atob(localStorage.getItem("t50pswd")),
            email: localStorage.getItem("t50-email"),
            options: "get.tasco",
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
        .then(data => {
            tasco = data
            loadHome()
        })
        .catch(error => {
            //alert("json failed to load")
            tasco = {
                'message': "Failed to resolve .tasco"
            }

        })
} else {
    alert("Can't get access to Tasco. Please Login.")
    window.location.href = '/evox-epsilon/image gallery'
}
function parseDate(dateStr) {
    const [month, day, year] = dateStr.split('/');
    return new Date(`${year}-${month}-${day}`);
}
function loadHome() {
    const data = tasco
    console.log('Launch data:', JSON.stringify(data))
    if (tasco.ongoing) {
        document.getElementById("cardsContainer").innerHTML = '';
        console.log('PreSorted:', JSON.stringify(data.ongoing));
        data.ongoing.sort((a, b) => {
            const dateA = parseDate(a.dueTo);
            const dateB = parseDate(b.dueTo);
            return dateA - dateB; // Sort in ascending order
        });
        console.log('Sorted:', JSON.stringify(data.ongoing));
        data.ongoing.forEach(node => {
            try {
                console.log("working node:", JSON.stringify(node));

                // Ensure node has required properties
                if (!node.priority || !node.completed || !node.title) {
                    throw new Error("Missing node properties");
                }

                const card = document.createElement('div');
                card.className = 'card';

                // Create the top row div
                const rowTop = document.createElement('div');
                rowTop.className = 'rowTop';

                // Create the priority div
                const priority = document.createElement('div');
                priority.className = `priority ${node.priority}`;
                priority.textContent = node.priority.charAt(0).toUpperCase() + node.priority.slice(1);

                // Create the percentage span
                const percentage = document.createElement('span');
                percentage.textContent = node.completed;

                // Append the priority and percentage to the top row
                rowTop.appendChild(priority);
                rowTop.appendChild(percentage);

                // Create the info div
                const info = document.createElement('div');
                info.className = 'info';

                // Create the task name heading
                const taskName = document.createElement('h3');
                taskName.className = 'taskName';
                taskName.textContent = node.title;

                // Ensure timeStart and timeEnd are defined
                if (typeof node.timeStart === 'undefined' || typeof node.timeEnd === 'undefined') {
                    throw new Error("timeStart or timeEnd is undefined");
                }

                // Create the task time div
                const taskTime = document.createElement('div');
                taskTime.className = 'taskTime';

                // Create the clock image
                const clockTime = document.createElement('img');
                clockTime.className = 'clockTime';
                clockTime.src = 'clock.svg';

                // Create the time span
                const timeSpan = document.createElement('span');
                timeSpan.textContent = `${formatTime(node.timeStart)} - ${formatTime(node.timeEnd)}`;

                // Append the clock image and time span to the task time div
                taskTime.appendChild(clockTime);
                taskTime.appendChild(timeSpan);

                // Create the additional info div
                const additional = document.createElement('div');
                additional.className = 'additional';

                // Create the due date span
                const dueDateSpan = document.createElement('span');
                dueDateSpan.textContent = 'Due date: ';

                // Create the due date element
                const dueDate = document.createElement('span');
                const result = node.dueTo.replace(/\//g, '-');

                let date2 = new Date(result);
                let formattedDate2 = date2.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });
                dueDate.textContent = formattedDate2; // Ensure formattedDate2 is defined

                // Append the due date to the due date span
                dueDateSpan.appendChild(dueDate);

                // Append the due date span to the additional info div
                additional.appendChild(dueDateSpan);

                // Append the task name, task time, and additional info to the info div
                info.appendChild(taskName);
                info.appendChild(taskTime);
                info.appendChild(additional);

                // Append the top row and info div to the main card div
                card.appendChild(rowTop);
                card.appendChild(info);
                document.getElementById("cardsContainer").appendChild(card);

            } catch (error) {
                console.error("Error processing node:", error);
            }
        });
    } else {
        console.warn("No ongoing data was found");
    }

}



function goTo(place) {
    if (place === "home") {
        document.getElementById("nav-home").classList.add("active")
        document.getElementById("nav-tasks").classList.remove("active")
        document.getElementById("homeCont").style.display = ''
        document.getElementById("tasksCont").style.display = 'none'
    }
    if (place === "tasks") {
        document.getElementById("nav-home").classList.remove("active")
        document.getElementById("nav-tasks").classList.add("active")
        document.getElementById("homeCont").style.display = 'none'
        document.getElementById("tasksCont").style.display = ''
        document.getElementById("currentMonthYear").innerText = getCurrentMonthYear()
        const dayContainer = document.getElementById('dayContainer');
        document.getElementById('dayContainer').innerHTML = ''
        const today = new Date();
        const startDate = new Date();
        startDate.setDate(today.getDate() - 15);

        let currentDayElement;

        for (let i = 0; i < 30; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);

            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.id = `dayDiv${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`
            dayDiv.onclick = function () {
                if (currentDay === `${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`) {
                    return;
                }
                loadDay(date.toLocaleString('en-US', { weekday: 'short' }), date.getDate(), date.getMonth() + 1, date.getFullYear())
                setTimeout(function () {
                    loadDay(addToShort(date.toLocaleString('en-US', { weekday: 'short' }), 1), date.getDate() + 1, date.getMonth() + 1, date.getFullYear(), 'merge')//dayname: Sun, daynum: 28, month: undefined
                    setTimeout(function () {
                        loadDay(addToShort(date.toLocaleString('en-US', { weekday: 'short' }), 2), date.getDate() + 2, date.getMonth() + 1, date.getFullYear(), 'merge')//dayname: Sun, daynum: 28, month: undefined

                    }, 300)
                }, 200)
                document.getElementById(`${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`).classList.add("active")
                document.getElementById(currentDay).classList.remove("active")
                currentDay = `${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`

                const dayContainer = document.getElementById('dayContainer');
                const targetElement = document.getElementById(`${currentDay}`);

                if (dayContainer && targetElement) {
                    // Get bounding rectangles for both elements
                    const containerRect = dayContainer.getBoundingClientRect();
                    const elementRect = targetElement.getBoundingClientRect();

                    // Calculate the offset to scroll the element into view
                    const offsetTop = elementRect.top - containerRect.top + dayContainer.scrollTop;

                    // Scroll the container to the calculated position
                    dayContainer.scrollTo({
                        top: offsetTop - (containerRect.height / 2) + (elementRect.height / 2),
                        behavior: 'smooth' // Smooth scrolling
                    });
                } else {
                    console.error('dayContainer or targetElement not found.');
                }
                console.log("scrolled to", `#dayDiv${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`)
            }

            const dayName = document.createElement('span');
            dayName.className = 'name';
            dayName.innerText = date.toLocaleString('en-US', { weekday: 'short' });

            const dayCircle = document.createElement('div');
            dayCircle.className = 'circle';
            dayCircle.innerText = date.getDate();
            dayCircle.id = `${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`

            if (date.toDateString() === today.toDateString()) {
                dayCircle.classList.add('active');
                currentDayElement = dayDiv;  // Save reference to the current day element
                loadDay(date.toLocaleString('en-US', { weekday: 'short' }), date.getDate(), date.getMonth() + 1, date.getFullYear())
                document.getElementById("")
                loadDay(date.toLocaleString('en-US', { weekday: 'short' }), date.getDate(), date.getMonth() + 1, date.getFullYear())
                setTimeout(function () {
                    loadDay(addToShort(date.toLocaleString('en-US', { weekday: 'short' }), 1), date.getDate() + 1, date.getMonth() + 1, date.getFullYear(), 'merge')//dayname: Sun, daynum: 28, month: undefined
                    setTimeout(function () {
                        loadDay(addToShort(date.toLocaleString('en-US', { weekday: 'short' }), 2), date.getDate() + 2, date.getMonth() + 1, date.getFullYear(), 'merge')//dayname: Sun, daynum: 28, month: undefined

                    }, 300)
                }, 200)
                currentDay = `${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}` //add month

            }

            dayDiv.appendChild(dayName);
            dayDiv.appendChild(dayCircle);
            dayContainer.appendChild(dayDiv);
        }

        // Scroll to the current day element
        if (currentDayElement) {
            const containerRect = dayContainer.getBoundingClientRect();
            const elementRect = currentDayElement.getBoundingClientRect();
            const offset = elementRect.left - containerRect.left;
            dayContainer.scrollTo({
                left: offset - (containerRect.width / 2) + (elementRect.width / 2),
                behavior: 'smooth'
            });
        }

    }
}

function addToShort(day, daysToAdd) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let currentIndex = daysOfWeek.indexOf(day);

    if (currentIndex === -1) {
        throw new Error('Invalid day of the week');
    }

    let newIndex = (currentIndex + daysToAdd) % 7;
    return daysOfWeek[newIndex];
}

function shortDayToFullLowercase(shortDay) {
    // Map of short day abbreviations to full day names
    const dayMap = {
        'Sun': 'sunday',
        'Mon': 'monday',
        'Tue': 'tuesday',
        'Wed': 'wednesday',
        'Thu': 'thursday',
        'Fri': 'friday',
        'Sat': 'saturday'
    };

    // Return the full day name in lowercase
    return dayMap[shortDay] || 'Invalid day'; // Fallback to 'Invalid day' if abbreviation is not found
}

function getCurrentMonthYear() {
    // Create a new Date object
    const date = new Date();

    // Get the current month (0-11) and year
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Array of month names
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get the full month name
    const monthName = months[monthIndex];

    // Format and return the result
    return `${monthName} ${year}`;
}

function getCurrentDay() {
    // Create a new Date object
    const date = new Date();

    // Get the current day of the week (0-6, where 0 is Sunday)
    const dayIndex = date.getDay();

    // Array of weekday names
    const weekdays = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    // Get the full name of the current day
    const dayName = weekdays[dayIndex];

    // Return the result
    return dayName;
}

function formatTime(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

// Extract task times
function getTaskTimeRange(tasks) {
    const taskList = tasks;

    // Initialize earliest and latest times
    let earliestStart = '23:59'; // Set to a time later than any possible task start time
    let latestEnd = '00:00'; // Set to a time earlier than any possible task end time

    taskList.forEach(task => {
        if (task.timeStart < earliestStart) {
            earliestStart = task.timeStart;
        }
        if (task.timeEnd > latestEnd) {
            latestEnd = task.timeEnd;
        }
    });

    // Format times
    const startFormatted = formatTime(earliestStart);
    const endFormatted = formatTime(latestEnd);

    return `${startFormatted} - ${endFormatted}`;
}

function showAlertWithInput() {
    // Prompt the user for input
    const userInput = prompt("Please enter your username:");

    // Check if the user input is not null
    if (userInput !== null) {
        // Display an alert with the user's input
        alert(`Hello, ${userInput}!`);
        localStorage.setItem("t50-username", userInput)
        if (localStorage.getItem("tscBdebug")) {
            localStorage.removeItem("tscBdebug")
            alert("Debug is now disabled.")
        } else {
            localStorage.setItem("tscBdebug", true)
            alert("Debug is now enabled.")
        }
        window.location.reload()
    } else {
        alert("You didn't enter anything!");
    }
}


function loadDay(day, dayNum, month, year, merge) {
    console.log(`Triggered data:\ndayname: ${day}, daynum: ${dayNum}, month: ${month}, year: ${year}`) //dayname: Sun, daynum: 28, month: undefined
    const dayFull = shortDayToFullLowercase(day);
    if (month < 10) {
        month = `0${month}`
    }
    const data = tasco

    if (!data || !data.tasks || !data.tasks.daily) {
        console.warn(`Data structure is not as expected\nDebug:\nUsername: ${localStorage.getItem("t50-username")}\n\nAre you logged in?`);
        return;
    }
    console.log("User data [PREVIEW]:\n", JSON.stringify(data))
    //if (data.username === localStorage.getItem("t50-username")) {
    let finale = []
    if (data.tasks.daily[dayFull] || data.tasks.specific[`${dayNum}/${month}/${year}`]) {
        console.log("Daily or specific tasks found");
        // Use concat to merge the arrays
        if (data.tasks.daily[dayFull]) {
            finale = finale.concat(data.tasks.daily[dayFull]);
            console.log("Daily tasks pushed to working node");
        }


        if (data.tasks.specific[`${dayNum}/${month}/${year}`]) {
            console.log(`Found specific as:\ndata.tasks.specific[${dayNum}/${month}/${year}]`);
            // Use concat to merge the arrays
            finale = finale.concat(data.tasks.specific[`${dayNum}/${month}/${year}`]);
        } else {
            console.warn(`Specific Not FOUND as:\ndata.tasks.specific[${dayNum}/${month}/${year}]\n`, data.tasks.specific);
        }
        console.log("Current working value:\n", JSON.stringify(finale))
        finale.sort((a, b) => {
            return new Date(`1970-01-01T${a.timeStart}:00Z`) - new Date(`1970-01-01T${b.timeStart}:00Z`);
        });
        console.log("Finale successfully sorted.\n", JSON.stringify(finale))

        console.log(`Triggered day '${dayFull}' is inside:\n`, JSON.stringify(data.tasks.daily[dayFull]))


        const match = finale
        if (!merge) {
            document.getElementById("dayTasks").innerHTML = ''
        }

        const container = document.getElementById('dayTasks');

        // Create singleDayContainer div
        const singleDayContainer = document.createElement('div');
        singleDayContainer.className = 'singleDayContainer';

        // Create dayCircleCont div
        const dayCircleCont = document.createElement('div');
        dayCircleCont.className = 'dayCircleCont';

        // Create and append the span for the day
        const daySpan = document.createElement('span');
        daySpan.textContent = day; //Tue
        dayCircleCont.appendChild(daySpan);

        // Create and append the dayCircle div
        const dayCircle = document.createElement('div');
        dayCircle.className = 'dayCircle active';
        dayCircle.textContent = dayNum;//16
        dayCircleCont.appendChild(dayCircle);

        // Append dayCircleCont to singleDayContainer
        singleDayContainer.appendChild(dayCircleCont);

        // Create scheduled div
        const scheduled = document.createElement('div');
        scheduled.className = 'scheduled';

        // Create and append fullSchedule span
        const fullSchedule = document.createElement('span');
        fullSchedule.className = 'fullSchedule';
        console.log(`Will use ${day} as ${dayFull} with base set as:\n`, JSON.stringify(finale))
        const timeRange = getTaskTimeRange(finale);
        console.log(`Working hours for ${dayFull} :\n`, timeRange)
        fullSchedule.textContent = timeRange;
        scheduled.appendChild(fullSchedule);

        // Create and append scheduleRec div
        const scheduleRec = document.createElement('div');
        scheduleRec.className = 'scheduleRec';

        const circleSCH = document.createElement('div');
        circleSCH.className = 'circleSCH';
        scheduleRec.appendChild(circleSCH);

        const lineSCH = document.createElement('div');
        lineSCH.className = 'lineSCH';
        scheduleRec.appendChild(lineSCH);

        scheduled.appendChild(scheduleRec);



        // Create and append userIcons div


        //

        match.forEach(task => {
            if (task.title === "brake") {
                // Create and append taskCardBrake div
                const taskCardBrake = document.createElement('div');
                taskCardBrake.className = 'taskCardBrake';

                const brakeSpan = document.createElement('span');
                brakeSpan.textContent = 'Brake';
                taskCardBrake.appendChild(brakeSpan);

                const brakeTime = document.createElement('p');
                brakeTime.textContent = `${formatTime(task.timeStart)} - ${formatTime(task.timeEnd)}`;
                taskCardBrake.appendChild(brakeTime);

                scheduled.appendChild(taskCardBrake);
                return;
            }
            const userIcons = document.createElement('div');
            userIcons.className = 'userIcons';
            let count = 0;
            task.users.forEach(user => {



                const userPfp1 = document.createElement('img');
                const url = `https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
                userPfp1.src = '../oasaMobile/reloading-pfp.gif';
                if (sessionStorage.getItem(`pfp${user}`)) {
                    userPfp1.src = sessionStorage.getItem(`pfp${user}`);
                } else {
                    fetch(url)
                        .then(response => response.text())
                        .then(data => {
                            if (data.includes("<!DOCTYPE html>")) {
                                document.getElementById("profilePic").src = `../oasaMobile/snap.png`;
                                return;
                            }
                            if (data.indexOf("base64") === -1) {
                                // If it doesn't contain "base64", add the prefix
                                data = "data:image/jpeg;base64," + data;
                            }
                            userPfp1.src = data;
                            //try {
                            //    sessionStorage.setItem(`pfp${user}`, data)
                            //} catch (error){
                            //    console.warn("Client has no space left on profiles storage!")
                            //}

                        })
                        .catch(error => {
                            userPfp1.src = `../oasaMobile/snap.png`;
                            console.error(error);
                        });
                }


                if (count > 0) {
                    userPfp1.className = 'userPfp multi';
                    userPfp1.onclick = function () {
                        this.classList.toggle("multi")
                    }
                } else {
                    userPfp1.className = 'userPfp';
                }

                userIcons.appendChild(userPfp1);
                count++
            })


            // Create and append taskCard div
            const taskCard = document.createElement('div');
            taskCard.className = 'taskCard';

            const taskTimeSpan = document.createElement('span');
            taskTimeSpan.textContent = `${formatTime(task.timeStart)} - ${formatTime(task.timeEnd)}`;
            taskCard.appendChild(taskTimeSpan);

            const taskDescription = document.createElement('p');
            taskDescription.textContent = task.title;
            taskCard.appendChild(taskDescription);
            taskCard.appendChild(userIcons);
            scheduled.appendChild(taskCard);
        });




        // Append scheduled div to singleDayContainer
        singleDayContainer.appendChild(scheduled);

        // Append singleDayContainer to the container element
        container.appendChild(singleDayContainer);
    } else {
        console.log("User day data couldn't be found inside:\n", JSON.stringify(data.tasks.daily), `\nFor instance, returned value was:\n`, JSON.stringify(data.tasks.daily[dayFull]))
        if (!merge) {
            document.getElementById("dayTasks").innerHTML = '<h3>Day not created!</h3>'
        } else {
            document.getElementById("dayTasks").innerHTML = `${document.getElementById("dayTasks").innerHTML}<h3>Day ${dayNum}/${month}/${year} not created!</h3>`
        }

    }
    //}




}

function enableDisableDebug() {
    if (localStorage.getItem("t50-username")) {
        if (localStorage.getItem("tscBdebug")) {
            localStorage.removeItem("tscBdebug")
            alert("Debug is now disabled.")
        } else {
            localStorage.setItem("tscBdebug", true)
            alert("Debug is now enabled.")
        }
    } else {
        alert("You need an account to do that.")
        showAlertWithInput()
    }

}

const popIt = document.getElementById('creationCont');
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

let informed;

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
    if (newTop < 220) {
        console.warn(newTop)
        return;
    }
    if (newTop > 390) {
        console.warn("will quit", newTop)
        closeCreate()
        setTimeout(function () {
            popIt.style.top = '';
        }, 500)
    } else {
        console.warn("relocation", newTop)
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

    const elementId = "creationCont";
    const isOutsideViewport = isElementOutsideViewport(elementId);

    if (isOutsideViewport) {
        console.log("Element with ID '" + elementId + "' is outside the viewport.");

        console.warn("will quit")
        closeCreate()
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


function create() {
    document.getElementById("tasksCont").style.transform = 'scale(0.97)'
    document.getElementById("homeCont").style.transform = 'scale(0.97)'
    document.getElementById("creationCont").classList.add("active")
    document.getElementById("tasksCont").style.opacity = '0.3'
    document.getElementById("homeCont").style.opacity = '0.3'
    document.body.style.overflow = 'hidden'
}

function closeCreate() {
    document.getElementById("tasksCont").style.transform = 'scale(1)'
    document.getElementById("homeCont").style.transform = 'scale(1)'
    document.getElementById("tasksCont").style.opacity = '1'
    document.getElementById("homeCont").style.opacity = '1'
    document.getElementById("creationCont").classList.remove("active")
    document.body.style.overflow = 'auto'
}
const attendeesElem = document.getElementById("selfPfp")

const url = `https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${localStorage.getItem("t50-username") || 'anonymous'}`;
attendeesElem.src = '../oasaMobile/reloading-pfp.gif';
if (sessionStorage.getItem(`pfp${localStorage.getItem("t50-username")}`)) {
    attendeesElem.src = sessionStorage.getItem(`pfp${localStorage.getItem("t50-username")}`);
} else if (sessionStorage.getItem(`pfp`)) {
    attendeesElem.src = sessionStorage.getItem(`pfp`);
} else {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            if (data.includes("<!DOCTYPE html>")) {
                document.getElementById("profilePic").src = `../oasaMobile/snap.png`;
                return;
            }
            if (data.indexOf("base64") === -1) {
                // If it doesn't contain "base64", add the prefix
                data = "data:image/jpeg;base64," + data;
            }
            attendeesElem.src = data;
            //try {
            //    sessionStorage.setItem(`pfp${user}`, data)
            //} catch (error){
            //    console.warn("Client has no space left on profiles storage!")
            //}
        })
        .catch(error => {
            attendeesElem.src = `../oasaMobile/snap.png`;
            console.error(error);
        });
}
function changePriority() {
    const imgElem = document.getElementById("priorityImg")
    const priorityElem = document.getElementById("priority")
    const priorityJson = ['low', 'med', 'high'] //sorted
    if (imgElem.src.includes("low")) {
        imgElem.src = 'med.svg'
        priorityElem.innerText = 'Medium'
    } else if (imgElem.src.includes("med")) {
        imgElem.src = 'high.svg'
        priorityElem.innerText = 'High'
    } else if (imgElem.src.includes("high")) {
        imgElem.src = 'low.svg'
        priorityElem.innerText = 'Low'
    }
}
function addTask() {
    console.log("Running")
    const container = document.getElementById("container")
    const title = document.getElementById("taskTitle")
    const duedate = document.getElementById("duedate")
    const priority = document.getElementById("priority")
    const imgElem = document.getElementById("priorityImg")
    const priorityElem = document.getElementById("priority")

    if (container.innerText === 'Ongoing') {
        //will create .tasco for container Ongoing
        if (title.value && title.value !== "") {
            const taskJson = {
                "title": title.value,
                "timeStart": "15:00",
                "timeEnd": "16:00",
                "dueTo": new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }),
                "priority": priority.innerText.toLowerCase(),
                "completed": "0%",
                "users": [
                    "papostol"
                ]
            }
            console.log("This is it", taskJson)
            fetch(`https://data.evoxs.xyz/tasco`, {
                method: "POST",
                body: JSON.stringify({
                    username: localStorage.getItem("t50-username"),
                    password: atob(localStorage.getItem("t50pswd")),
                    email: localStorage.getItem("t50-email"),
                    options: "set.tasco.ongoing",
                    data: taskJson
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.json())
                .then(data => {
                    console.log("tasco returned:", data)
                    tasco = data
                    closeCreate()
                    loadHome()
                    title.value = ''
                    imgElem.src = 'low.svg'
                    priorityElem.innerText = 'Low'
                })
                .catch(error => {
                    //alert("json failed to load")
                    tasco = {
                        'message': "Failed to resolve .tasco"
                    }

                })

        } else {
            console.error("Fill out the title!")
        }
    } else {
        console.warn('unknown container')
    }
}