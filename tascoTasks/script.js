let currentDay;
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
                loadDay(date.toLocaleString('en-US', { weekday: 'short' }), date.getDate())
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
                console.log("scrolled to", `dayDiv${date.getDate()}${date.toLocaleString('en-US', { weekday: 'short' })}`)
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
                loadDay(date.toLocaleString('en-US', { weekday: 'short' }), date.getDate())
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


function loadDay(day, dayNum, month) {
    console.log(`dayname: ${day}, daynum: ${dayNum}, month: ${month}`) //dayname: Sun, daynum: 28, month: undefined
    const dayFull = shortDayToFullLowercase(day);
    fetch(`${localStorage.getItem("t50-username")}.tasco`)
        .then(response => response.json())
        .then(data => {
            console.log("The data:", data)
            if (data.username === localStorage.getItem("t50-username")) {
                if (data.tasks.daily[dayFull]) {
                    console.log("day found", data.tasks.daily[dayFull])
                    const match = data.tasks.daily[dayFull]
                    document.getElementById("dayTasks").innerHTML = ''
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
                    console.log("Will do", data.tasks.daily[dayFull])
                    const timeRange = getTaskTimeRange(data.tasks.daily[dayFull]);
                    console.log(timeRange)
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
                            if(sessionStorage.getItem(`pfp${user}`)) {
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
                                    sessionStorage.setItem(`pfp${user}`, data)
                                })
                                .catch(error => {
                                    userPfp1.src = `../oasaMobile/snap.png`;
                                    console.error(error);
                                });
                            }
                            
                            
                            if (count > 0) {
                                userPfp1.className = 'userPfp multi';
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
                    console.log("not found", data.tasks.daily[dayFull])
                    document.getElementById("dayTasks").innerHTML = '<h3>Day not created!</h3>'
                }
            }
        })
        .catch(error => {
            alert("json failed to load")
        })
}
