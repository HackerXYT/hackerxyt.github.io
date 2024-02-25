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
if (localStorage.getItem("t50-username") !== "papostol" && localStorage.getItem("t50-username") !== "Kyriakos") {
  document.getElementById("service3").style.display = "none"
} else {
  console.log("Is BETA TESTER")
}

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
  //https://evox-datacenter.onrender.com/tasco || httpe://192.168.1.21:4000/tasco -> added "e"
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
        if (task.type === "school") {
          let difficulty;
          console.log(task.label, "Task Is School Type")
          if (task.difficulty === "easy") {
            difficulty = "#006400"
          } else if (task.difficulty === "medium") {
            difficulty = "#A0522D"
          } else if (task.difficulty === "hard") {
            difficulty = "#8B0000"
          } else if (task.difficulty === "brake") {
            difficulty = "#06719e"
          } else {
            console.log("School task set operation failed!")
            return;
          }
          taskcount = taskcount + 1
          const li = document.createElement('li');
          li.className = 'task-list__item';

          const div = document.createElement('div');
          div.className = 'form-check';
          div.id = task.time

          const modernDarkBox = document.createElement('div');
          modernDarkBox.className = 'modern-dark-box';
          modernDarkBox.style.backgroundColor = difficulty

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
          return;
        }
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
    $("#loading-screen").fadeOut("fast", function () {
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
function loaddebts() {
  fetch(`https://evox-datacenter.onrender.com/tasco?method=debts&debts=get&username=${localStorage.getItem("t50-username")}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      const values = JSON.parse(data);

      const transformedJson = transformJson(values);
      const container = document.getElementById('user-container-debt');

      const users = transformedJson
      for (const [username, value] of Object.entries(users)) {
        // Creating user container
        const userContainer = document.createElement('div');
        userContainer.classList.add('user-container');

        // Creating user circle
        const userCircle = document.createElement('div');
        userCircle.classList.add('user-circle');
        const userImage = document.createElement('img');
        userImage.id = `${username}-img-opt`;
        userImage.src = "../t50-gateway-alpha/t50-img.png";
        userImage.alt = "User Image";
        userImage.onclick = function () {
          changeimg(this);
        };
        userCircle.appendChild(userImage);

        // Creating user details
        const userDetails = document.createElement('div');
        userDetails.classList.add('user-details');
        const userName = document.createElement('div');
        userName.classList.add('user-name');
        userName.textContent = username;
        userName.onclick = function () {
          debtoptions(this);
        };
        userName.id = `usr-{${username}}`;
        userDetails.appendChild(userName);

        // Creating modern dark box for debts
        const debtsBox = document.createElement('div');
        debtsBox.classList.add('modern-dark-box', 'debts-box');
        const costParagraph = document.createElement('p');
        costParagraph.id = `usr-{${username}}-cost`;
        costParagraph.classList.add('time');
        costParagraph.textContent = "€" + value;
        debtsBox.appendChild(costParagraph);

        // Appending elements to user container
        userContainer.appendChild(userCircle);
        userContainer.appendChild(userDetails);
        userContainer.appendChild(debtsBox);

        // Appending user container to main container
        container.appendChild(userContainer);
        const url = `https://evox-datacenter.onrender.com/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`;
        fetch(url)
          .then(response => response.text())
          .then(data => {
            if (data.indexOf("base64") === -1) {
              // If it doesn't contain "base64", add the prefix
              data = "data:image/jpeg;base64," + data;
            }
            document.getElementById(`${username}-img-opt`).src = `${data}`;
          })
          .catch(error => {
            console.error(error);
          });
      }
      donut(transformedJson)
    }).catch(error => {
      console.error('Fetch error:', error);
    });
  //
}

function transformJson(originalJson) {
  const transformedJson = {};
  for (let key in originalJson) {
    if (originalJson.hasOwnProperty(key)) {
      transformedJson[key] = originalJson[key].cost;
    }
  }
  return transformedJson;
}

document.getElementById("debt_username").addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    // Key code 13 is for the Enter key
    // Call your function here
    document.getElementById("debt_price").focus()
  }
});

document.getElementById("debt_price").addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    // Key code 13 is for the Enter key
    // Call your function here
    adddebt()
  }
});

function donut(json) {
  let jsonData = json
  if (JSON.stringify(jsonData) === "{}" || JSON.stringify(jsonData) === "[]") {
    jsonData = {
      "No Debts": "1000"
    }
  }
  // Extract labels and data from JSON
  var labels = Object.keys(jsonData);
  var data = Object.values(jsonData);

  // Get the canvas element by its ID
  var canvas = document.getElementById('donut');
  var ctx = canvas.getContext('2d');

  // Create the donut chart
  var myDonutChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)'
        ]
      }]
    },
    options: {
      responsive: true, // Disable responsiveness
      maintainAspectRatio: true, // Disable aspect ratio
      plugins: {
        annotation: {
          annotations: [{
            type: 'line',
            mode: 'horizontal',
            scaleID: 'y-axis-0',
            value: 0,
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0,
            borderDash: [8, 8],
          }],
        }
      },
      // Set the size of the chart
      width: 250,
      height: 250,
    }
  });
}
function debts() {
  document.getElementById("donut-container").innerHTML = `<canvas id="donut" width="250" height="250"></canvas>`
  document.getElementById("user-container-debt").innerHTML = ""
  $("#back").fadeOut("slow")
  setTimeout(function () {
    $("#main-content").fadeOut("fast", function () {
      $("#debts-content").fadeIn("fast")
    })
    //document.getElementById("main-content").style.display = "none"
    //document.getElementById("notes-content").style.display = "block"
    document.getElementById("logo").src = "home.svg"
    document.getElementById("logo-icon").onclick = home;
  })
  loaddebts()

  //$("#main-content").fadeOut("fast", function () {
  //  $("#debts-content").fadeIn("fast")
  //})
}

function adddebt() {
  let receiver = document.getElementById("debt_username").value
  let username = localStorage.getItem("t50-username")
  let price = document.getElementById("debt_price").value
  if (receiver === "" || price === "") {
    return;
  }
  fetch(`https://evox-datacenter.onrender.com/tasco?method=debts&debts=set&username=${username}&debtcost=${Number(price)}&issuer=${receiver}`)
    .then(response => response.text())
    .then(data => {
      console.log(data)
      document.getElementById("donut-container").innerHTML = `<canvas id="donut" width="250" height="250"></canvas>`
      document.getElementById("user-container-debt").innerHTML = ""
      document.getElementById("debt_username").value = ""
      document.getElementById("debt_price").value = ""
      loaddebts()
    })
    .catch(error => {
      console.error(error);
    });
}
function debtoptions(element) {
  console.log(element.id)
  let cost = document.getElementById(`${element.id}-cost`).innerHTML
  console.log(cost)
  //cost = cost.replace(/[€,\s]/g, '', '');
  //console.log(cost)
  document.getElementById("cost-debt").innerHTML = cost
  let extractedString = element.id.match(/\{([^}]+)\}/)[1];
  document.getElementById("username-debt").innerHTML = extractedString
  sessionStorage.setItem("curr_opt", extractedString)
  $("#debts-popup").fadeIn("fast")

  return;
  if (sessionStorage.getItem("session1") && sessionStorage.getItem("session2") && sessionStorage.getItem("session3")) {
    document.getElementById("card1bal").innerHTML = sessionStorage.getItem("session1")
    sessionStorage.removeItem("session1")
    document.getElementById("card2bal").innerHTML = sessionStorage.getItem("session2")
    sessionStorage.removeItem("session2")
    document.getElementById("card3bal").innerHTML = sessionStorage.getItem("session3")
    sessionStorage.removeItem("session3")
  }



  let match = element.id.match(/\{([^}]+)\}/); // This regular expression matches anything inside curly braces
  let result = match ? match[1] : null; // Access the captured group which contains "Flixie"
  //console.log(result); // Output: Flixie
  document.getElementById("selectdebtuser").value = result
  let bal1 = document.getElementById("card1bal").innerHTML
  sessionStorage.setItem("session1", bal1)
  let bal2 = document.getElementById("card2bal").innerHTML
  sessionStorage.setItem("session2", bal2)
  let bal3 = document.getElementById("card3bal").innerHTML
  sessionStorage.setItem("session3", bal3)
  console.log(bal1, cost)
  bal1 = bal1.replace(/[€,\s]/g, '', '');
  document.getElementById("card1bal").innerHTML = `${Number(bal1) - Number(cost)}`
  bal2 = bal2.replace(/[€,\s]/g, '', '');
  document.getElementById("card2bal").innerHTML = `${Number(bal2) - Number(cost)}`
  bal3 = bal3.replace(/[€,\s]/g, '', '');
  console.log(bal3, cost)
  document.getElementById("card3bal").innerHTML = `${Number(bal3) - Number(cost)}`
}

function cleardebt() {
  const username = localStorage.getItem("t50-username")
  const receiver = sessionStorage.getItem("curr_opt")
  fetch(`https://evox-datacenter.onrender.com/tasco?method=debts&debts=del&username=${username}&issuer=${receiver}`)
    .then(response => response.text())
    .then(data => {
      console.log(data)
      $('#debts-popup').fadeOut();
      sessionStorage.removeItem('curr_opt')
      debts()
    })
    .catch(error => {
      console.error(error);
    });
}

function changeimg(element) {
  if (element.src.includes("o4mXbwVvZ/C2aplm1ctNyKAD6VSXj7MZpvh8M9s9C5Wot8WWfqcDM1K044XnMLlgZsFaHehHGzxvsJc14FeArmJtQH1E2zEZ0FORO4Bqz4aJOT++LsfggeWiTM+qpPNDvZ1ncaEvYdqCpXa2f82cBJ6Wd5Zig2YA8Nr5BQz0Jef0tBTN3JBHKIKVAz7WxuUnOsJNGXimIG24AVY4htzXDBTN1JA7P3BdUZieOntR")) {
    //ok


  } else {
    //return;
  }

  let extractedValue = element.id.split('-')[0];
  sessionStorage.setItem("chdebtpfp", extractedValue)
  $("#chpfp-popup").fadeIn("fast")
}

function showUploadBox() {
  document.getElementById('upload-box').click();
}

function handleFileSelect() {
  const input = document.getElementById('upload-box');
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64String = e.target.result;
      // Now you have the base64 representation of the selected image
      //console.log(base64String);
      document.getElementById("upload-box").disabled = true
      document.getElementById(`${sessionStorage.getItem("chdebtpfp")}-img-opt`).src = "../t50-gateway-alpha/reloading.gif"
      $('#chpfp-popup').fadeOut();
      fetch('https://evox-datacenter.onrender.com/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: sessionStorage.getItem("chdebtpfp"),
          pfp: base64String
        })
      })
        .then(response => response.text())
        .then(data => {
          console.log(data);
          if (data === "done") {
            console.log("All ok")
            document.getElementById("upload-box").disabled = false

            document.getElementById(`${sessionStorage.getItem("chdebtpfp")}-img-opt`).src = "../t50-gateway-alpha/reloading-pfp.gif"
            const url = `https://evox-datacenter.onrender.com/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${sessionStorage.getItem("chdebtpfp")}`;
            fetch(url)
              .then(response => response.text())
              .then(prof => {
                if (prof.indexOf("base64") === -1) {
                  // If it doesn't contain "base64", add the prefix
                  prof = "data:image/jpeg;base64," + prof;
                }
                document.getElementById(`${sessionStorage.getItem("chdebtpfp")}-img-opt`).src = prof
                sessionStorage.removeItem('chdebtpfp');
              })
              .catch(error => {
                console.error(error);
              });


          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    reader.readAsDataURL(file);
  }

  // Reset the input value to allow selecting the same file again
  input.value = '';
}