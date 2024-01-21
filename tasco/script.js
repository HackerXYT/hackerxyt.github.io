//text under schedule moved to important functions js
document.getElementById("todays-date-schedule").innerHTML = formattedDate + ":"
//button2-remain tasks remaining
//button3-notes how many quick notes saved
//main-content -> services, latest transfers
//sidebar -> next to main-content
//transfers -> transfers section in main-content
//schedule-content -> hidden
document.getElementById("transfers").style.display = "none"
document.getElementById("sidebar").style.display = "none"


function schedule() {
  let sort_schedule = localStorage.getItem("schedule-sort")
  if (!sort_schedule) {
    localStorage.setItem("schedule-sort", 1)
  } else {
    localStorage.setItem("schedule-sort", (Number(sort_schedule) + 1).toString())
  }

  //document.getElementById("back").style.display = "none"
  $("#back").fadeOut("slow")

  document.getElementById("logo").src = "home.svg"
  document.getElementById("logo-icon").onclick = home;
  setTimeout(function () {
    //document.getElementById("main-content").style.display = "none"
    $("#main-content").fadeOut("fast", function () {
      $("#schedule-content").fadeIn("fast")
    })
    //document.getElementById("schedule-content").style.display = "block"
    if (sessionStorage.getItem("schedule-saved")) {
      set()
      sessionStorage.removeItem("schedule-saved")
    } else {
      set()
    }

  }, 200)
}
function set(day, custom) {
  if (day) {
    if (day === daysOfWeek[currentDate.getDay()]) {
      console.log(`${day} = ${daysOfWeek[currentDate.getDay()]}`)
      custom = "false"
      dayOfWeek = day.toUpperCase();
      sessionStorage.removeItem("custom-day")
    } else {
      sessionStorage.setItem("custom-day", "true")
      dayOfWeek = day.toUpperCase();
    }

  } else {
    sessionStorage.removeItem("custom-day")
  }
  var weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  for (var i = 0; i < weekdays.length; i++) {
    var day = weekdays[i];
    document.getElementById(day).disabled = false;
    document.getElementById(day).selected = false;
  }

  document.getElementById(`${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek.slice(1).toLowerCase()}`).disabled = true;
  document.getElementById(`${dayOfWeek.charAt(0).toUpperCase()}${dayOfWeek.slice(1).toLowerCase()}`).selected = true
  const username = global_username
  //https://evox-datacenter.onrender.com/tasco
  fetch(`https://evox-datacenter.onrender.com/tasco?method=get&username=${username}&day=${dayOfWeek}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const jsonData = data;

      document.getElementById("list").innerHTML = ""
      const taskList = document.getElementById('list');

      // Sort tasks by time
      jsonData.tasks.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
      });
      let taskcount = 0
      jsonData.tasks.forEach(task => {
        taskcount = taskcount + 1
        const li = document.createElement('li');
        li.className = 'task-list__item';

        const div = document.createElement('div');
        div.className = 'form-check';
        div.id = task.time

        const modernDarkBox = document.createElement('div');
        modernDarkBox.className = 'modern-dark-box';

        const p = document.createElement('p');
        p.className = 'time';
        p.textContent = task.time;

        modernDarkBox.appendChild(p);
        div.appendChild(modernDarkBox);

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', task.label.toLowerCase().replace(/\s+/g, ''));
        label.textContent = task.label;
        label.id = `task${taskcount.toString()}`;
        label.onclick = function () {
          tasco_options(task.label, this.id);
        };

        div.appendChild(label);
        li.appendChild(div);
        taskList.appendChild(li);
      });

      var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      console.log("Time is:", currentTime);

      // Convert currentTime to a number
      var currentTimeNumber = parseInt(currentTime, 10);

      // Check if currentTimeNumber is greater than or equal to 24
      if (currentTimeNumber >= 24) {
        document.getElementById("list").style.display = "";
        try {
          document.getElementById("loader-schedule").style.display = "none";
        } catch (error) {
          console.error("An error occurred:", error);
        }
        return;

      }

      if (!custom || custom === "false") {
        console.log("Day isn't custom set")
        // Convert the current time to minutes for easy comparison
        var currentTimeInMinutes = convertTimeToMinutes(currentTime);
        // Get all form-check elements
        var formCheckElements = document.querySelectorAll('.form-check');
        // Loop through each form-check element
        formCheckElements.forEach(function (element) {
          // Get the time from the form-check element's ID
          var taskTime = element.id;

          // Convert the task time to minutes for easy comparison
          var taskTimeInMinutes = convertTimeToMinutes(taskTime);

          // Check if the task time is before the current time
          if (taskTimeInMinutes < currentTimeInMinutes) {
            // Get all child elements inside the form-check element
            var childElements = element.querySelectorAll('*');

            // Add the 'strikethrough-text' class to each child element
            childElements.forEach(function (childElement) {
              childElement.classList.add('strikethrough-text');
            });
          }
          document.getElementById("loader-schedule").style.display = "none"
        });
      }

      // Function to convert time in HH:mm format to minutes
      function convertTimeToMinutes(time) {
        var parts = time.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      }

      //after all
      document.getElementById("list").style.display = ""

      try {
        document.getElementById("loader-schedule").style.display = "none";
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })
    .catch(error => {
      document.getElementById("todays-schedule").innerHTML = `<li class="task-list__item"><div class="form-check"><div class="modern-dark-box"><p class="time">Error</p></div><label class="form-check-label" for="notset">Server Offline</label></div></li>`;
      console.error('Fetch error:', error);
    });

}

//flatpickr("#time_set", {
//  enableTime: true,
//  noCalendar: true,
//  dateFormat: "h:i K"
//});


function convertTimeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

var inputElement = document.getElementById("task_label");

// Add an event listener for the keydown event
inputElement.addEventListener("keydown", function (event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.keyCode === 13) {
    // Call the function or perform the desired action
    task_add();
  }
});
function task_add() {
  const day_v = dayOfWeek
  const time_v = document.getElementById("time_set").value
  const label_v = document.getElementById("task_label").value
  if (time_v != "" && label_v != "") {
    console.log(`Will now add:\n${time_v}--->${label_v} for day ${day_v}`)
    addtask(day_v, time_v, label_v)
  } else {
    console.log(`Time value: ${time_v}`)
    console.log(`Label value: ${label_v}`)
    console.log("Error, fix inputs")
    if (time_v === "") {
      shake("time_set")
    } else if (label_v === "") {
      shake("task_label")
    } else {
      shake("time_set")
    }
  }

}

function custom_task_add(day) {
  const day_v = day
  const time_v = document.getElementById("time_set").value
  const label_v = document.getElementById("task_label").value
  if (time_v != "" && label_v != "") {
    console.log(`Will now add:\n${time_v}--->${label_v} for day ${day_v}`)
    addtask(day_v, time_v, label_v, "true")
  } else {
    console.log(`Time value: ${time_v}`)
    console.log(`Label value: ${label_v}`)
    console.log("Error, fix inputs")
  }

}
function addtask(day_val, time_val, label_val, custom) {
  const url = 'https://evox-datacenter.onrender.com/tasco';

  // Data to be sent in the request body (assuming it's JSON)
  const data = {
    method: 'set',
    username: global_username,
    day: day_val,
    time: time_val,
    label: label_val
  };

  // Fetch options for the POST request
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Specify the content type as JSON
      // Add any other headers if needed
    },
    body: JSON.stringify(data) // Convert the data to a JSON string
  };

  // Make the POST request using fetch
  fetch(url, options)
    .then(response => {
      // Check if the request was successful (status code 2xx)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Parse the JSON response
      return response.text();
    })
    .then(data => {
      // Handle the response data
      console.log('Response data:', data);
      if (data === "Ok") {
        console.log("Done!")
        if (custom === "true") {
          document.getElementById("list").innerHTML = ``
          set(day_val, "true")
          return;
        }
        document.getElementById("loader-schedule").style.display = ""
        document.getElementById("list").innerHTML = ""
        set()

      }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });
}

function reload() {
  document.getElementById("loader-schedule").style.display = ""
  document.getElementById("list").style.display = "none"
  document.getElementById("list").innerHTML = ""
  const username = global_username
  fetch(`https://evox-datacenter.onrender.com/tasco?method=get&username=${username}&day=${dayOfWeek}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const jsonData = data;
      const taskList = document.getElementById('list');

      // Sort tasks by time
      jsonData.tasks.sort((a, b) => {
        const timeA = convertTimeToMinutes(a.time);
        const timeB = convertTimeToMinutes(b.time);
        return timeA - timeB;
      });

      jsonData.tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-list__item';

        const div = document.createElement('div');
        div.className = 'form-check';
        div.id = task.time

        const modernDarkBox = document.createElement('div');
        modernDarkBox.className = 'modern-dark-box';

        const p = document.createElement('p');
        p.className = 'time';
        p.textContent = task.time;

        modernDarkBox.appendChild(p);
        div.appendChild(modernDarkBox);

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.setAttribute('for', task.label.toLowerCase().replace(/\s+/g, ''));
        label.textContent = task.label;

        div.appendChild(label);
        li.appendChild(div);
        taskList.appendChild(li);
      });

      var currentTime = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

      // Convert the current time to minutes for easy comparison
      var currentTimeInMinutes = convertTimeToMinutes(currentTime);

      // Get all form-check elements
      var formCheckElements = document.querySelectorAll('.form-check');

      // Loop through each form-check element
      formCheckElements.forEach(function (element) {
        // Get the time from the form-check element's ID
        var taskTime = element.id;

        // Convert the task time to minutes for easy comparison
        var taskTimeInMinutes = convertTimeToMinutes(taskTime);

        // Check if the task time is before the current time
        if (taskTimeInMinutes < currentTimeInMinutes) {
          // Get all child elements inside the form-check element
          var childElements = element.querySelectorAll('*');

          // Add the 'strikethrough-text' class to each child element
          childElements.forEach(function (childElement) {
            childElement.classList.add('strikethrough-text');
          });
        }
      });

      // Function to convert time in HH:mm format to minutes
      function convertTimeToMinutes(time) {
        var parts = time.split(':');
        return parseInt(parts[0]) * 60 + parseInt(parts[1]);
      }

      //after all
      document.getElementById("list").style.display = ""

      try {
        document.getElementById("loader-schedule").style.display = "none";
      } catch (error) {
        console.error("An error occurred:", error);
      }
    })
    .catch(error => {
      document.getElementById("todays-schedule").innerHTML = `<li class="task-list__item"><div class="form-check"><div class="modern-dark-box"><p class="time">Error</p></div><label class="form-check-label" for="notset">Server Offline</label></div></li>`;
      console.error('Fetch error:', error);
    });
}

function customday(day) {
  sessionStorage.setItem("custom-day", "true")

  //document.getElementById("loading-screen").style.display = ""
  //document.getElementById("main").style.display = "none"
  document.getElementById("loading-text").innerHTML = `<br><p>Rebuilding Data</p><br><svg width="40px" height="40px" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z" fill="#fff">
    <animateTransform attributeType="XML"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
  </path>
</svg>`
  $("#main").fadeOut("fast")
  $("#loading-screen").fadeIn("fast")
  
  document.getElementById("list").innerHTML = ``
  set(day, "true")
  //21 Sun, i want Tuesday
  //currentday = getDayNumber("SUNDAY")
  let datenum = getFormattedDate(day)
  document.getElementById("todays-date-schedule").innerHTML = `${day} ${datenum}`
  document.getElementById("task-add-button").innerHTML = `<button onclick="custom_task_add('${day}')" style="margin-bottom: 30px" class="tasco-button">Submit</button>`
  setTimeout(function () {
    $("#loading-screen").fadeOut("fast", function() {
      $("#main").fadeIn("fast")
    })
    //document.getElementById("loading-screen").style.display = "none"
    //document.getElementById("main").style.display = "block"
  }, 1300)
}

function change_day() {
  var selectElement = document.getElementById("daySelect");
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  //console.log("Selected Value:", selectedOption.value);
  //console.log("Selected Text:", selectedOption.text);
  let day = selectedOption.text
  customday(day)
}

function getDayNumber(day) {
  // Convert the day to uppercase
  const uppercasedDay = day.toUpperCase();

  // Define an object with day names and their corresponding numbers
  const dayNumbers = {
    'SUNDAY': 7,
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5,
    'SATURDAY': 6
  };

  // Check if the input day exists in the dayNumbers object
  if (dayNumbers.hasOwnProperty(uppercasedDay)) {
    // Return the day number
    return dayNumbers[uppercasedDay];
  } else {
    // Return an error message for invalid input
    return 'Invalid day input. Please provide a valid day.';
  }
}
function getDayOfMonth() {
  // Create a new Date object for the current date
  const currentDate = new Date();

  // Get the day of the month
  const dayOfMonth = currentDate.getDate();

  // Return the day of the month
  return dayOfMonth;
}

function getFormattedDate(day) {
  // Convert the day to uppercase
  const uppercasedDay = day.toUpperCase();

  // Define an object with day names and their corresponding numbers
  const dayNumbers = {
    'SUNDAY': 0,
    'MONDAY': 1,
    'TUESDAY': 2,
    'WEDNESDAY': 3,
    'THURSDAY': 4,
    'FRIDAY': 5,
    'SATURDAY': 6
  };

  // Define an array with month names
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // Create a new Date object for the current date
  const currentDate = new Date();

  // Calculate the difference in days between the current day and the target day
  const dayDifference = dayNumbers[uppercasedDay] - currentDate.getDay();

  // Set the date to the next occurrence of the target day
  currentDate.setDate(currentDate.getDate() + dayDifference);

  // Get the day of the month
  const dayOfMonth = currentDate.getDate();

  // Get the month name
  const monthName = monthNames[currentDate.getMonth()];

  // Return the formatted date string
  return `${dayOfMonth}, ${monthName}`;
}
