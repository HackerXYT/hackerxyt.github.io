function quicknotes() {
    setTimeout(function() {
        document.getElementById("main-content").style.display = "none"
        document.getElementById("notes-content").style.display = "block"
        set_notes()
    }, 350)
}

function set_notes() {
    reload_notes()
}

function newnote() {
    document.getElementById("popup").style.display = "block"
    document.getElementById("popup").innerHTML = `<h1 class="time" style="text-align: center;margin-top: 10px;margin-bottom: 12.72px;">New Note</h1>
    <p style="margin-bottom:15px;font-size:large">Choose a name for your new note</p><br>
    
    <div style="text-align: center;">
    <input id="name_note_input" style="width: 95%;margin: 0 auto;display: block;" class="tasco-input"><br>
    <button onclick="submitnewnote()" style="margin: 0 auto;display: block;" class="tasco-button">Submit</button>
</div>`
}

function submitnewnote() {
    let value = document.getElementById("name_note_input").value
    if(value != null) {
        const url = 'https://tasco-db.onrender.com/';

  // Data to be sent in the request body (assuming it's JSON)
  const data = {
    notename: value,
    noteuser: global_username,
    notemethod: "new",
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
      if(data === "Done!") {
        console.log("All OK!")
        reload_notes()

      }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });
    }
}

var inputElement = document.getElementById("name_note_input");
inputElement.addEventListener("keydown", function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call the function or perform the desired action
        submitnewnote();
    }
});

function reload_notes() {
    //notes_section

    const url = 'https://tasco-db.onrender.com/';

  // Data to be sent in the request body (assuming it's JSON)
  const data = {
    notename: "smg",
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
    // Handle the response data
    console.log('Response data:', notesObject);
    if (notesObject) {
      console.log("All OK!");
      document.getElementById("notes_section").innerHTML = ""
      // Iterate over the object keys
      for (var key in notesObject) {
        if (notesObject.hasOwnProperty(key)) {
          // Extract username from the key
          var username = key.split('-')[1].split('.')[0];

          // Create the HTML elements
          var noteDiv = document.createElement('div');
          noteDiv.id = username + '-note';
          noteDiv.onclick = function () {
            shownote(username)
          };
          noteDiv.style.marginBottom = '20px';
          noteDiv.style.marginTop = '20px';
          noteDiv.className = 'modern-dark-box';

          var timeParagraph = document.createElement('p');
          timeParagraph.className = 'time';
          timeParagraph.textContent = username;

          // Append elements to the notes_section div
          noteDiv.appendChild(timeParagraph);
          document.getElementById('notes_section').appendChild(noteDiv);

          // Save values to local storage
          localStorage.setItem(username, notesObject[key]);
        }
      }
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
}

function shownote(name) {
    let note = localStorage.getItem(name)
    alert(note)
}