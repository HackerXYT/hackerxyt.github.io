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
    const url = 'http://192.168.1.21:4000/';
  
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

  window.addEventListener('load', function() {
    document.body.style.overflow = 'auto';
    document.getElementById("loading-screen").style.display = "none"
    document.getElementById("main").style.display = "block"
});

function home() {
    if(document.getElementById("schedule-content").style.display != "none") {
        //schedule page is open, so:
        let scheduleinner = document.getElementById("schedule-content").innerHTML
        sessionStorage.setItem("schedule-saved", scheduleinner)//INNER HTML IS SAVED
        document.getElementById("todays-schedule").innerHTML = ""
        document.getElementById("logo").src = "tasco-close.png"
        document.getElementById("logo-icon").onclick = "";
        document.getElementById("main-content").style.display = ""
        document.getElementById("schedule-content").style.display = "none"
    }
    if(document.getElementById("notes-content").style.display != "none") {
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