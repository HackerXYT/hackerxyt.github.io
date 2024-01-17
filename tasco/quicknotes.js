function quicknotes() {
    setTimeout(function() {
        document.getElementById("main-content").style.display = "none"
        document.getElementById("notes-content").style.display = "block"
        document.getElementById("logo").src = "home.svg"
        document.getElementById("logo-icon").onclick = home;
        if(sessionStorage.getItem("notes-saved")) {
          document.getElementById("notes_section").innerHTML = `<svg width="40px" height="40px" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
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
          sessionStorage.removeItem("notes-saved")
          set_notes()
        } else {
          set_notes()
        }
        
    }, 200)
}

function set_notes() {
    reload_notes()
}

function newnote() {
    document.getElementById("newnote").style.display = "none"
    var notesContent = document.getElementById('notes-content');
    notesContent.style.filter = 'blur(5px)';
    document.getElementById("popup").style.display = "block"
    document.getElementById("popup").innerHTML = `<h1 class="time" style="text-align: center;margin-top: 10px;margin-bottom: 12.72px;">New Note</h1>
    <p style="margin-bottom:15px;font-size:large">Choose a name for your new note</p><br>
    
    <div style="text-align: center;">
    <input autocomplete="off" id="name_note_input" style="width: 95%;margin: 0 auto;display: block;" class="tasco-input"><br>
    <button onclick="submitnewnote()" style="display: inline-block; margin-right: 10px;" class="tasco-button">Submit</button>
<button onclick="cancel_newnote()" style="display: inline-block;" class="tasco-button">Cancel</button>

</div>`
var inputElement = document.getElementById("name_note_input");
inputElement.addEventListener("keydown", function(event) {
    // Check if the pressed key is Enter (key code 13)
    if (event.keyCode === 13) {
        // Call the function or perform the desired action
        submitnewnote();
    }
});
}

function cancel_newnote() {
  document.getElementById("newnote").style.display = ""
  var notesContent = document.getElementById('notes-content');
  notesContent.style.filter = '';
  document.getElementById("popup").style.display = "none"
}

function submitnewnote() {
    cancel_newnote()
    let value = document.getElementById("name_note_input").value
    if(value != null) {
        const url = 'https://evox-datacenter.onrender.com/tasco';

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
        reload_notes("new", value)
        document.getElementById("popup").style.display = "none"
      }
    })
    .catch(error => {
      // Handle any errors that occurred during the fetch
      console.error('Fetch error:', error);
    });
    }
}



function reload_notes(is, whatname) {
    //notes_section
    const url = 'https://evox-datacenter.onrender.com/tasco';

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

            // Create a function to handle the onclick event with the correct username
            noteDiv.onclick = createNoteClickHandler(username);

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
            localStorage.setItem(`note-${username}`, notesObject[key]);
        }
    }
    if(is === "new" && whatname != null) {
      shownote(whatname)
    }
    }
  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
}
function createNoteClickHandler(username) {
  return function() {
      shownote(username);
  };
}

function shownote(name) {
    document.getElementById("textarea").value = ""
    let note_data = localStorage.getItem(`note-${name}`)
    console.log(`Note data for note-${name}:\n${note_data}`)
    sessionStorage.setItem("current-note", name)
    document.getElementById("notes_section").style.display = "none"
    document.getElementById("newnote").style.display = "none"
    document.getElementById("note_view").style.display = ""
    document.getElementById("return_notes").style.display = ""
    document.getElementById("savenote").style.display = ""
    document.getElementById("textarea").value = note_data
    document.getElementById("note_name_view").innerHTML = name
    //on exit clear id notes_section set loading as innerhtml, show notes_section and reload_notes
    //alert(note)
}

function return_notes() {
  //Go back to main notes view (The view where it shows all the notes)
  sessionStorage.removeItem("current-note")
  document.getElementById("notes_section").style.display = ""
  document.getElementById("newnote").style.display = ""
  document.getElementById("note_view").style.display = "none"
  document.getElementById("return_notes").style.display = "none"
  document.getElementById("savenote").style.display = "none"
}

function savenote() {
  const note_contents = document.getElementById("textarea").value
  const note_name = sessionStorage.getItem("current-note")
  console.log(`Note name ${note_name}, contents: ${note_contents}`)
  //show loading indicator
  document.getElementById('savenote').innerHTML = `<svg width="29px" height="29px" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
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
  const url = 'https://evox-datacenter.onrender.com/tasco';
  const data = {
    notename: note_name,
    noteuser: global_username,
    notemethod: "edit",
    contents: note_contents
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };

  // Make the POST request using fetch
  fetch(url, options)
  .then(response => {
    // Check if the request was successful (status code 2xx)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON response
    return response.text(); // Use response.json() instead of response.text()
  })
  .then(response => {
    if(response === "Done!") {
      localStorage.setItem(`note-${note_name}`, note_contents)
      document.getElementById('savenote').innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" viewBox="0 0 24 24" fill="none">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#fff"/>
      </svg>`
    }
    console.log(response)

  })
  .catch(error => {
    // Handle any errors that occurred during the fetch
    console.error('Fetch error:', error);
  });
}