const global_username = localStorage.getItem("t50-username")
document.getElementById("username-header").innerHTML = global_username
document.getElementById("username2").innerHTML = global_username
const currentDate = new Date();
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dayOfWeek = daysOfWeek[currentDate.getDay()];
const month = months[currentDate.getMonth()];
const date = currentDate.getDate();
const formattedDate = `${dayOfWeek} ${date}, ${month}`;
document.getElementById("button1-date").innerHTML = formattedDate
function getnotes_num() {
  const url = 'http://192.168.1.21:4000/tasco';

  // Data to be sent in the request body (assuming it's JSON)
  const data = {
    notename: "none",
    noteuser: global_username,
    notemethod: "get",
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
      return response.json(); // Use response.json() instead of response.text()
    })
    .then(notesObject => {
      const numberOfValues = Object.keys(notesObject).length;
      console.log("Number of notes:", numberOfValues);
      document.getElementById("button3-notes").innerHTML = `${numberOfValues} saved`
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });
}
getnotes_num()

window.addEventListener('load', function () {
  document.body.style.overflow = 'auto';
  document.getElementById("loading-screen").style.display = "none"
  document.getElementById("main").style.display = "block"
});

function home() {
  document.getElementById("back").style.display = ""
  if (document.getElementById("schedule-content").style.display != "none") {
    //schedule page is open, so:
    let scheduleinner = document.getElementById("schedule-content").innerHTML
    sessionStorage.setItem("schedule-saved", scheduleinner)//INNER HTML IS SAVED
    document.getElementById("todays-schedule").innerHTML = ""
    document.getElementById("logo").src = "tasco-close.png"
    document.getElementById("logo-icon").onclick = "";
    document.getElementById("main-content").style.display = ""
    document.getElementById("schedule-content").style.display = "none"
  }
  if (document.getElementById("notes-content").style.display != "none") {
    //notes page is open, so:
    sessionStorage.setItem("notes-saved", true)
    //document.getElementById("todays-schedule").innerHTML = ""
    document.getElementById("logo").src = "tasco-close.png"
    document.getElementById("logo-icon").onclick = "";
    document.getElementById("main-content").style.display = ""
    document.getElementById("notes-content").style.display = "none"
  }
  console.log("Going home")

}

function pfp_set() {
  document.getElementById("pfp").src = sessionStorage.getItem("pfp")
}
pfp_set()

function schedule_tab() {
  home()
  schedule()
}

function quicknotes_tab() {
  home()
  quicknotes()
}

function convertToLatin(greekString) {
  greekString = greekString.toUpperCase();
  const greekToLatinMap = {
    'Α': 'A',
    'Β': 'B',
    'Γ': 'G',
    'Δ': 'D',
    'Ε': 'E',
    'Ζ': 'Z',
    'Η': 'E',
    'Θ': 'Th',
    'Ι': 'I',
    'Κ': 'K',
    'Λ': 'L',
    'Μ': 'M',
    'Ν': 'N',
    'Ξ': 'X',
    'Ο': 'O',
    'Π': 'P',
    'Ρ': 'R',
    'Σ': 'S',
    'Τ': 'T',
    'Υ': 'Y',
    'Φ': 'F',
    'Χ': 'Ch',
    'Ψ': 'Ps',
    'Ω': 'O',
    'ά': 'a',
    'έ': 'e',
    'ή': 'e',
    'ί': 'i',
    'ό': 'o',
    'ύ': 'y',
    'ώ': 'o'
    // Add more mappings as needed
  };

  const latinString = greekString.split('').map(char => greekToLatinMap[char] || char).join('');
  return latinString.toLowerCase();;
}

function tasco_options(name, id) {
  console.log("Label:", name)
  console.log("Id:", id)
  if (name) {
    document.getElementById("schedule-content").style.filter = 'blur(5px)';
    document.getElementById("tasco_options").style.display = "block"
    document.getElementById("name").innerHTML = name
    document.getElementById('remove_task').onclick = function() {
      remove_task(name);
    };
    document.getElementById('edit_task').onclick = function() {
      console.log("Clicked Edit Task!")
      edit_task(name);
    };
    return;
  }
}

function remove_task(name) {
  console.log("Removing task", name)
  if(!name) {
    console.log("No label defined!")
  }
  fetch(`http://192.168.1.21:4000/tasco?method=delete&username=${global_username}&day=${dayOfWeek}&taskname=${name}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    console.log(data)
    document.getElementById("list").innerHTML = ""
    document.getElementById("loader-schedule").style.display = ""
    set()
    document.getElementById("schedule-content").style.filter = '';
    document.getElementById("tasco_options").style.display = "none"
  }).catch(error => {
    console.error('Fetch error:', error);
  });
}

function edit_task(name) {
  console.log("Editing task", name)
  if(!name) {
    console.log("No task defined!")
    return;
  }
  document.getElementById("task_edit").style.display = ""
  document.getElementById("task_edit_input").value = name
  document.getElementById("task_edit_input").placeholder = name
  document.getElementById("task_edit_button").style.display = "inline-block"
}

function finalize_edit() {
  document.getElementById("task_edit_button").innerHTML = `<svg width="15px" height="15px" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
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
  document.getElementById("task_edit_button").disabled = true
  const taskname = document.getElementById("task_edit_input").placeholder
  const newtaskname = document.getElementById("task_edit_input").value
  fetch(`http://192.168.1.21:4000/tasco?method=edit&username=${global_username}&day=${dayOfWeek}&taskname=${taskname}&newtaskname=${newtaskname}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    console.log(data)
    document.getElementById("list").innerHTML = ""
    document.getElementById("loader-schedule").style.display = ""
    set()
    document.getElementById("schedule-content").style.filter = '';

    document.getElementById("tasco_options").style.display = "none"
    document.getElementById("schedule-content").style.filter = '';
    document.getElementById("tasco_options").style.display = "none"
    document.getElementById("task_edit").style.display = "none"
    document.getElementById("task_edit_button").style.display = "none"
    document.getElementById("task_edit_button").innerHTML = `Submit`
    document.getElementById("task_edit_button").disabled = false
  }).catch(error => {
    document.getElementById("task_edit_button").innerHTML = `Submit`
    console.error('Fetch error:', error);
  });
}
function cancel_options() {
  document.getElementById("schedule-content").style.filter = '';
  document.getElementById("tasco_options").style.display = "none"
  document.getElementById("task_edit").style.display = "none"
  document.getElementById("task_edit_button").style.display = "none"
}

