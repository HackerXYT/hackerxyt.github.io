const global_username = localStorage.getItem("t50-username")
const currentDate = new Date();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dayOfWeek = daysOfWeek[currentDate.getDay()];
const month = months[currentDate.getMonth()];
const date = currentDate.getDate();
const formattedDate = `${dayOfWeek} ${date}, ${month}`;
document.getElementById("button1-date").innerHTML = formattedDate
document.getElementById("todays-date-schedule").innerHTML = formattedDate+ ":"
//button2-remain tasks remaining
//button3-notes how many quick notes saved
//main-content -> services, latest transfers
//sidebar -> next to main-content
//transfers -> transfers section in main-content
//schedule-content -> hidden
document.getElementById("transfers").style.display = "none"
document.getElementById("sidebar").style.display = "none"


function schedule() {
    setTimeout(function() {
        document.getElementById("main-content").style.display = "none"
        document.getElementById("schedule-content").style.display = "block"
        set()
    }, 350)
}

        function set(day) {
            if(day) {
                dayOfWeek = day.toUpperCase();
            }
            const username = global_username
            fetch(`https://tasco-db.onrender.com?method=get&username=${username}&day=${dayOfWeek}`)
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

    var currentTime = new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});

// Convert the current time to minutes for easy comparison
var currentTimeInMinutes = convertTimeToMinutes(currentTime);

// Get all form-check elements
var formCheckElements = document.querySelectorAll('.form-check');

// Loop through each form-check element
formCheckElements.forEach(function(element) {
    // Get the time from the form-check element's ID
    var taskTime = element.id;

    // Convert the task time to minutes for easy comparison
    var taskTimeInMinutes = convertTimeToMinutes(taskTime);

    // Check if the task time is before the current time
    if (taskTimeInMinutes < currentTimeInMinutes) {
        // Get all child elements inside the form-check element
        var childElements = element.querySelectorAll('*');

        // Add the 'strikethrough-text' class to each child element
        childElements.forEach(function(childElement) {
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

        flatpickr("#time_set", {
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          time_24hr: true
      });
        

        function convertTimeToMinutes(timeString) {
          const [hours, minutes] = timeString.split(':').map(Number);
          return hours * 60 + minutes;
        }

        var inputElement = document.getElementById("task_label");

    // Add an event listener for the keydown event
    inputElement.addEventListener("keydown", function(event) {
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
          if(time_v!= "" && label_v != "") {
            console.log(`Will now add:\n${time_v}--->${label_v} for day ${day_v}`)
            addtask(day_v, time_v, label_v)
          } else {
            console.log(time_v, "time")
            console.log(label_v, "label")
            console.log("Error, fix inputs")
          }
          
        }
    function addtask(day_val, time_val, label_val) {
      const url = 'https://tasco-db.onrender.com/';

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
    if(data === "Ok") {
      console.log("Done!")
      reload()

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
            fetch(`https://tasco-db.onrender.com?method=get&username=${username}&day=${dayOfWeek}`)
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

    var currentTime = new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute: '2-digit'});

// Convert the current time to minutes for easy comparison
var currentTimeInMinutes = convertTimeToMinutes(currentTime);

// Get all form-check elements
var formCheckElements = document.querySelectorAll('.form-check');

// Loop through each form-check element
formCheckElements.forEach(function(element) {
    // Get the time from the form-check element's ID
    var taskTime = element.id;

    // Convert the task time to minutes for easy comparison
    var taskTimeInMinutes = convertTimeToMinutes(taskTime);

    // Check if the task time is before the current time
    if (taskTimeInMinutes < currentTimeInMinutes) {
        // Get all child elements inside the form-check element
        var childElements = element.querySelectorAll('*');

        // Add the 'strikethrough-text' class to each child element
        childElements.forEach(function(childElement) {
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