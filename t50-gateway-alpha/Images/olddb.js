
function load_img() {
    document.getElementById("back").style.left = ""
    document.getElementById("back").style.right = "55px"
    settings_reload()
    var storedValue = localStorage.getItem('account');
    var storedObject = JSON.parse(storedValue);
    var password = atob(storedObject.imgpassword)
    let api = "aHR0cHM6Ly84OTNkM2U5Ny00Y2YwLTRlN2QtOGY0MC1kMTVhMTcyZGZhMmEtMDAtcWxvc3BwYTY2M251LnNwb2NrLnJlcGxpdC5kZXYvP3Bhc3N3b3JkPQ=="
    console.log("Requesting")
    fetch(`https://evox-datacenter.onrender.com/images-gallery/?password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Modify this based on your API's requirements
        }
        })
        .then(response => response.text())
        .then(data => {
          if(data === "Access Denied") {
            $("#gallery-text").fadeOut("fast")
            $("#gallery").fadeIn("slow")
            $("#container-img").html(`<p style="color: red;margin-left: 20px">Your Account Doesn't Have Access To T50 Images</p>`)
            return;
          }
          
          // Handle the response data
          console.log('Response:', data);
          let jsonData = JSON.parse(data)
          const numberOfValues = Object.keys(jsonData).length;
          console.log(numberOfValues)
// Decode each value and store them in an array
const decodedValues = Object.values(jsonData).map(value => atob(value));
const totalSizeInMB = calculateTotalSize(decodedValues);
console.log(`Total gallery image size: ${totalSizeInMB.toFixed(2)} MB`);
document.getElementById("size-img").innerHTML = `${totalSizeInMB.toFixed(2)}MB`
console.log(decodedValues)
// Call the createElements function with the decoded values
createElements(decodedValues);
$("#gallery-text").html("Here is your personal encrypted gallery")
console.log("Loaded:", numberOfValues, "images")
    if(!localStorage.getItem("auto-login")) {
        localStorage.removeItem("img-app-on")
    }
    if(numberOfValues == null) {
        console.log("No images loaded")
			
        $("#container-img").html(`<p style="color: red;margin-left: 20px">No images uploaded yet</p>`)
    }
    $("#loaded-img").html(numberOfValues)
    $("#gallery").fadeIn("slow")
    localStorage.setItem("images", numberOfValues)
        })
        .catch(error => {
          // Handle errors
					alert(error)
          $("#container-img").html(`<p style="color: red;margin-left: 20px">No images loaded.<br>Server Error.</p>`)
          console.error('Error:', error);
        });

    
    //createElements(values);
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
        link.href = `#show?${value.substring(22, 50)}`;
        //link.download = `Image${(index + 1)}.png`;
        //link.target = '_blank';
        link.onclick = function() {
          showimg(`${value}`, index+1);
        };

        // Create an <img> element
        const img = document.createElement('img');
        img.src = value;
        img.alt = 'Image ' + (index + 1);

        // Append the <img> element to the <a> element
        link.appendChild(img);

        // Append the <a> element to the <div> element
        div.appendChild(link);

        // Append the <div> element to the container
        container.appendChild(div);
    });
    $("#container-img").fadeIn("slow", function() {
      $("#gallery-text").fadeIn("slow", function() {
        $("#loading").fadeOut("slow")
      })
    })
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
      //var nextImageNumber = getNextImageNumber();
      //var newImageKey = "image" + nextImageNumber;
      // Set the new value in local storage
      //localStorage.setItem(newImageKey, btoa(final));
      //console.log("New image key:", newImageKey);
      var storedValue = localStorage.getItem('account');
      var storedObject = JSON.parse(storedValue);
      var password = atob(storedObject.imgpassword)
      if(document.getElementById("dbcheck").checked) {
        console.log("Private DB")
        const totalSizeInMB = calculateImageSize(final);
        if(totalSizeInMB.toFixed(2) > 3.5) {
          var userResponse = window.confirm(`File Is Large And May Fail Uploading (${totalSizeInMB.toFixed(2)}MB). Continue?`);

          // Check the user's response
          if (userResponse) {
              console.log("User Confirmed");
          } else {
              console.log("Canceled!");
              return;
          }
        } else {
          var userResponse = window.confirm(`Size Is ${totalSizeInMB.toFixed(2)}MB. Continue?`);

          // Check the user's response
          if (userResponse) {
              console.log("User Confirmed");
          } else {
              console.log("Canceled!");
              return;
          }
        }
        
        const postData = {
          image: final,
          password: password
        };
        let api = "http://192.168.1.26:4000"
        fetch(api, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Modify this based on your API's requirements
        },
        body: JSON.stringify(postData), // Convert FormData to JSON
      })
        .then(response => response.text())
        .then(data => {
          // Handle the response data
          console.log('Response:', data);
          $("#container-img").fadeOut("slow", function() {
            $("#container-img").html("")
            setTimeout(function() {
              load_db()
            },1000)
            
            setTimeout(function() {
                
                setTimeout(function() {
                    $("#loading").fadeOut("slow")
                    $("#gallery-set").fadeIn("slow")
                    setTimeout(function() {
                      $("#gallery-text").html("Here is your personal encrypted gallery")
                      $("#container-img").fadeIn("slow")
                    }, 900)
                    
                    $("#popup").fadeIn("slow")
                }, 800)
            }, 700)
          })
        })
        .catch(error => {
					alert(error)
          // Handle errors
          console.error('Error:', error);
        });
      $("#loading").fadeIn("slow")
      $("#gallery-set").fadeOut("slow")
      $("#popup").fadeOut("slow")
      document.body.style.overflow = 'hidden';
      } else {
        const postData = {
          image: final,
          password: password
        };
        let mainapi = "aHR0cHM6Ly84OTNkM2U5Ny00Y2YwLTRlN2QtOGY0MC1kMTVhMTcyZGZhMmEtMDAtcWxvc3BwYTY2M251LnNwb2NrLnJlcGxpdC5kZXYv"
        fetch("https://evox-datacenter.onrender.com/images-gallery/", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Modify this based on your API's requirements
          },
          body: JSON.stringify(postData), // Convert FormData to JSON
        })
          .then(response => response.text())
          .then(data => {
            // Handle the response data
            console.log('Response:', data);
            $("#container-img").fadeOut("slow", function() {
              $("#container-img").html("")
              load_img()
              setTimeout(function() {
                  
                  setTimeout(function() {
                      $("#loading").fadeOut("slow")
                      $("#gallery-set").fadeIn("slow")
                      setTimeout(function() {
                        $("#gallery-text").html("Here is your personal encrypted gallery")
                        $("#container-img").fadeIn("slow")
                      }, 900)
                      
                      $("#popup").fadeIn("slow")
                  }, 800)
              }, 700)
            })
          })
          .catch(error => {
						alert(error)
            // Handle errors
            console.error('Error:', error);
          });
        $("#loading").fadeIn("slow")
        $("#gallery-set").fadeOut("slow")
        $("#popup").fadeOut("slow")
        document.body.style.overflow = 'hidden';
      }
      
      
      
      
    };

    reader.readAsDataURL(file);
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
    //var result = confirm("Delete All Images? This Cannot Be Reverted!");
    var userInput = prompt("Please enter gallery reset password:", localStorage.getItem("img-app-username"));

    // Check if the user clicked "OK" or "Cancel"
    if (userInput !== null) {
      // Display the input value in an alert
      let mainapi = "aHR0cHM6Ly84OTNkM2U5Ny00Y2YwLTRlN2QtOGY0MC1kMTVhMTcyZGZhMmEtMDAtcWxvc3BwYTY2M251LnNwb2NrLnJlcGxpdC5kZXYvP21ldGhvZD1kZWxldGUmcGFzc3dvcmQ9"
      fetch(`https://evox-datacenter.onrender.com/images-gallery/?method=delete&password=${userInput}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Modify this based on your API's requirements
        },
      })
        .then(response => response.text())
        .then(data => {
          if(data !== "Reset") {
            alert("Notification",data)
          } else {
            alert("Gallery Successfully Formatted!")
            $("#container-img").html("")
            load_img()
          }
          
        })
        .catch(error => {
          // Handle errors
          alert('Error:', error)
          console.error('Error:', error);
        });
    } else {
      // User clicked "Cancel" or pressed Esc
      alert("You canceled the operation.");
    }
}

function load_gallery() {
  $("#gallery-text").html("Loading..")
  $("#popup").fadeOut("slow")
  $("#loading").fadeIn("slow")
  $("#container-img").fadeOut("slow", function() {
    $("#container-img").html("")
    load_img()
    setTimeout(function() {
        
        setTimeout(function() {
            $("#loading").fadeOut("slow")
            $("#gallery-set").fadeIn("slow")
            setTimeout(function() {
              //
              $("#loading").fadeOut("slow")
              $("#container-img").fadeIn("slow")
            }, 900)
            
            $("#popup").fadeIn("slow")
        }, 800)
    }, 700)
  })
}