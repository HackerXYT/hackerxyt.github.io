$(document).ready(function() {
    if(localStorage.getItem("img-app-on") === "true") {
        load_img()
        setTimeout(function() {
            $("#usr").html(localStorage.getItem("img-app-username"))
            $("#settings_email_ph").html(localStorage.getItem("img-app-email"))
            $("#settings_username_ph").html(localStorage.getItem("img-app-username"))
            $("#gallery-set").fadeIn("slow");
            $("#gallery").fadeIn("slow")
            $("#loading").fadeOut("slow");
        }, 1000)
    } else {
        $("#loading").fadeOut("slow");
        $("#container").fadeIn("slow");
    }
    
});

var submit = document.getElementById("submit");
submit.addEventListener("click", login())

function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email, password)
    const url = `https://team50-accounts-database-clear.memeguy21.repl.co/?email=${email}&password=${password}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        
        console.log(data); // Handle the response data here
        if(data.includes("Credentials Correct")) {
            console.log("Welcome Abroad")
            const credentialsString = data;
            // Use a regular expression to match the "Username:" followed by the value
            const match = credentialsString.match(/Username:(\w+)/);
            // Extract the captured value (in this case, the username)
            const username = match && match[1];
            $("#container").fadeOut("slow");
            $("#gallery").fadeIn("slow");
            localStorage.setItem("img-app-email", email)
            localStorage.setItem("img-app-username", username)
            localStorage.setItem("img-app-on", true)
            restart()
        } else if(data === "Credentials Incorrect") {
            console.log("Wrong Email/Password")
            email = ""
            password = ""
        } else if(data === "Connection Blocked") {
            console.log("Doesn't Exist")
            email=""
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
}

document.getElementById("password").addEventListener("keypress", function(event) {
    if (event.keyCode === 13) {
        login()
    }
});

function settings() {
    $("#bottom-logo").fadeIn("slow")
    setTimeout(function() {
        $("#popup").fadeIn("slow")
        document.body.style.overflow = 'hidden';
    }, 500)
}

function close_popup() {
    $("#bottom-logo").fadeOut("slow")
    setTimeout(function() {
        $("#popup").fadeOut("slow")
        document.body.style.overflow = 'visible';
    }, 500)
}

//email, password, submit

function load_img() {
    const values = getLocalStorageValues();
    const jsonString = JSON.stringify(values);
    console.log('JSON String:', jsonString);
    var numberOfimg = jsonString.length;
    console.log("Loaded:", numberOfimg, "images")
    if(numberOfimg == 2) {
        console.log("No images loaded")
        $("#container-img").html(`<p style="color: red;margin-left: 20px">No images uploaded yet</p>`)
    }
    $("#loaded-img").html(numberOfimg)
    localStorage.setItem("images", numberOfimg)
    createElements(values);
}

function getLocalStorageValues() {
    const values = [];
    for (let i = 1; i <= 100; i++) {
        const key = 'image' + i;
        const value = localStorage.getItem(key);
        if (value) {
            values.push(value);
        }
    }
    return values;
}

// Function to create elements and append them to the container
function createElements(values) {
    const container = document.getElementById('container-img');
values.forEach((value, index) => {
    const div = document.createElement('div');
    div.className = 'image-wrapper';

    // Create an <a> element
    const link = document.createElement('a');
    link.href = atob(value);
    link.target = '_blank';

    // Create an <img> element
    const img = document.createElement('img');
    img.src = atob(value);
    img.alt = 'Image ' + (index + 1);

    // Append the <img> element to the <a> element
    link.appendChild(img);

    // Append the <a> element to the <div> element
    div.appendChild(link);

    // Append the <div> element to the container
    container.appendChild(div);
});

}


$("#upload").click(function () {
    alert("Element with ID 'myElement' clicked!");
});

function encodeImageToBase64() {
    const input = document.getElementById('imageFileInput');
    const file = input.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64Text = reader.result.split(',')[1];
      base64Temp = base64Text

      let final = `data:image/png;base64,${base64Text}`
      var nextImageNumber = getNextImageNumber();

      // Create the new image key with the format "image<number>"
      var newImageKey = "image" + nextImageNumber;
      
      // Set the new value in local storage
      localStorage.setItem(newImageKey, btoa(final));
      
      console.log("New image key:", newImageKey);
      $("#loading").fadeIn("slow")
      $("#gallery-set").fadeOut("slow")
      $("#popup").fadeOut("slow")
      document.body.style.overflow = 'hidden';
      
      $("#container-img").fadeOut("slow", function() {
        $("#container-img").html("")
        load_img()
        setTimeout(function() {
            $("#container-img").fadeIn("slow")
            setTimeout(function() {
                $("#loading").fadeOut("slow")
                $("#gallery-set").fadeIn("slow")
                $("#popup").fadeIn("slow")
            }, 800)
        }, 700)
      })
      
    };

    reader.readAsDataURL(file);
  }


function writeimage() {
    const image = new Image();

// Set the src attribute to the base64-encoded image string
image.src = "data:image/png;base64," + Base64Value;

// When the image has loaded, do something with it
image.onload = function() {
  // You can now access the image using the 'image' variable
  // For example, you could add it to the DOM:
  document.body.appendChild(image);
}
}

function getNextImageNumber() {
    // Get all keys from local storage
    var keys = Object.keys(localStorage);

    // Filter keys that match the pattern "image<number>"
    var imageKeys = keys.filter(function(key) {
        return /^image\d+$/.test(key);
    });

    // If no keys match the pattern, return 1
    if (imageKeys.length === 0) {
        return 1;
    }

    // Extract numbers from matching keys
    var imageNumbers = imageKeys.map(function(key) {
        return parseInt(key.match(/\d+/)[0]);
    });

    // Find the maximum number and add 1
    var nextImageNumber = Math.max(...imageNumbers) + 1;

    return nextImageNumber;
}

function format() {
    var result = confirm("Delete All Images? This Cannot Be Reverted!");
      if (result) {
        for (let key in localStorage) {
            if (key.startsWith("image")) {
              localStorage.removeItem(key);
            }
          }
          restart()
        } else {
        console.log("Cancelled")
      }
}

function restart() {
	$("#popup").fadeOut("fast", function() {
		$("#text").fadeOut("fast", function() {
			$("#bottom-logo").fadeOut("fast", function() {
				$("#settings").fadeOut("fast", function() {
					window.location.reload()
				})
			})
		})

	})

}

function logoff() {
    localStorage.removeItem("img-app-on")
    localStorage.removeItem("email")
    restart()
}