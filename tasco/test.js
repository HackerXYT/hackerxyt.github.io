function set(day) {
    if (day) {
      dayOfWeek = day.toUpperCase();
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
    //https://fat-swan-58.telebit.io/tasco
    fetch(`https://fat-swan-58.telebit.io/tasco?method=get&username=${username}&day=${dayOfWeek}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const jsonData = data;
        document.getElementById("todays-schedule").innerHTML = `<div style="display:none" id="list"></div>`
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
          label.onclick = function() {
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