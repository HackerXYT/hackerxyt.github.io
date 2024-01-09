function loadprivate() {
    $("#gallery-text").html("Loading..")
    $("#container-img").fadeOut("slow")
    load_db()
      $("#loading").fadeIn("slow")
      $("#gallery-set").fadeOut("slow")
      $("#popup").fadeOut("slow")
      document.body.style.overflow = 'hidden';
}

function calculateImageSize(base64String) {
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    const binaryData = atob(base64WithoutPrefix);
    const fileSizeInMB = binaryData.length / (1024 * 1024);
    return fileSizeInMB;
  }
  
  function calculateTotalSize(base64Array) {
    let totalSize = 0;
    base64Array.forEach(base64Image => {
      totalSize += calculateImageSize(base64Image);
    });
    return totalSize;
  }

  function calculateImageSize(base64String) {
    // Remove the data URL prefix (e.g., 'data:image/jpeg;base64,')
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
  
    // Convert the base64 string to binary data
    const binaryData = atob(base64WithoutPrefix);
  
    // Calculate the size in megabytes
    const fileSizeInMB = binaryData.length / (1024 * 1024);
  
    return fileSizeInMB;
  }
  
function load_db() {
    settings_reload()
    var storedValue = localStorage.getItem('account');
    var storedObject = JSON.parse(storedValue);
    var password = atob(storedObject.imgpassword)
    let api = "aHR0cDovLzE5Mi4xNjguMS4yNzo0MDAwP3Bhc3N3b3JkPQ=="//4000
    fetch(`https://images-database.onrender.com/?password=${password}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', // Modify this based on your API's requirements
        },
      })
        .then(response => response.text())
        .then(data => {
          // Handle the response data
          console.log('Response:', data);
          if(data === "Access Denied") {
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
          console.log(`Total database image size: ${totalSizeInMB.toFixed(2)} MB`);
          document.getElementById("size-img").innerHTML = `${totalSizeInMB.toFixed(2)}/50MB`
          console.log("Here are the decoded values for private db", decodedValues)
          $("#container-img").html("")
          // Call the createElements function with the decoded values
          createElements(decodedValues);

          console.log("Loaded:", numberOfValues, "images")
          $("#loading").fadeOut("slow")

                    $("#gallery-set").fadeIn("slow")
                    setTimeout(function() 
                    {
                        $("#gallery-text").html("Here is your personal encrypted gallery from database")
                      $("#container-img").fadeIn("slow")
                    }, 900)
                    
                    $("#popup").fadeIn("slow")
              if(!localStorage.getItem("auto-login")) {
                  localStorage.removeItem("img-app-on")
              }
              if(numberOfValues == 0) {
                  console.log("No images loaded")
              
                  $("#container-img").html(`<p style="color: red;margin-left: 20px">No images uploaded yet</p>`)
              }
              $("#loaded-img").html(numberOfValues)
              $("#gallery").fadeIn("slow")
              localStorage.setItem("images", numberOfValues)
        })
        .catch(error => {
					alert(error)
          // Handle errors
          console.error('Error:', error);
        });

    
    //createElements(values);
}

function format_db() {
    var userInput = prompt("Please enter database reset password:", localStorage.getItem("img-app-username"));
    var storedValue = localStorage.getItem('account');
    var storedObject = JSON.parse(storedValue);
    var password = atob(storedObject.imgpassword)
    // Check if the user clicked "OK" or "Cancel"
    if (userInput !== null) { 
        let api = "aHR0cDovLzE5Mi4xNjguMS4yNzo0MDAwP3Bhc3N3b3JkPQ=="//4000
        fetch(`https://images-database.onrender.com/?password=${password}&method=format&format=${userInput}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json', // Modify this based on your API's requirements
            },
          })
            .then(response => response.text())
            .then(data => {
                console.log("Format Data", data)
                if(data === "Deleted") {
                    alert("Database Formatted!")
                    loadprivate()
                }
            })
            .catch(error => {
							alert(error)
                // Handle errors
                console.error('Error:', error);
              });
    }   else {
        // User clicked "Cancel" or pressed Esc
        alert("You canceled the operation.");
    }
}