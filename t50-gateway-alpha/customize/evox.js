$(document).ready(function() {
    $("#header").html("Welcome to Evox!")
    $("#header").fadeIn("slow", function() {
        setTimeout(function() {
            $("#header").fadeOut("slow", function() {
                
                if (window.innerWidth <= 767) {
                    //Mobile
                    document.getElementById("header").style.fontSize = "1.1rem"
                } else {
                    //Desktop
                    document.getElementById("header").style.fontSize = "1.6rem"
                }
                $("#header").html("Let's start customizing your account")
                $("#header").fadeIn("slow", function() {
                    setTimeout(function(){
                        $("#header").fadeOut("slow", function() {
                            if (window.innerWidth <= 767) {
                                //Mobile
                                document.getElementById("header").style.fontSize = "0.9rem"
                            } else {
                                //Desktop
                                document.getElementById("header").style.fontSize = "1.6rem"
                            }
                            $("#header").html("Start by picking a profile picture for your account")
                            $("#header").fadeIn("slow")
                            $("#cards-main").fadeIn("slow")
                        })
                    }, 900)
                })
            })
        }, 600)
    })
});

function setpfp() {
        // Create an invisible input element of type file
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
      
        // Append the input element to the body
        document.body.appendChild(input);
      
        // Trigger a click event on the input element
        input.click();
      
        // Listen for the change event on the input element
        input.addEventListener('change', handleFileSelect);
      
        function handleFileSelect() {
          // Get the selected file from the input element
          const file = input.files[0];
      
          // Check if a file was selected
          if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = function (e) {
                $("#loading").fadeIn("slow")
                sessionStorage.setItem("refuse", "true")
              // Encode the file to base64 and log it to the console
              const base64Data = e.target.result;
              if(localStorage.getItem("user") === null && localStorage.getItem("t50-username") === null) {
                console.log(localStorage.getItem("user"))
                console.log(localStorage.getItem("t50-username"))
                alert("Cannot Proceed. Logged Out!")
                console.error("Cannot Proceed. Logged Out!")
                return;
              }
              if(localStorage.getItem("user") === null) {
                sessionStorage.setItem("user-username", localStorage.getItem("t50-username"))
              } else if(localStorage.getItem("t50-username") === null) {
                sessionStorage.setItem("user-username", localStorage.getItem("user"))
              }
              fetch('https://profile-database.onrender.com', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: sessionStorage.getItem("user-username"),
                    pfp: base64Data
                  })
                })
                .then(response => response.text())
                .then(data => {
                  console.log(data);
                  if(data === "done") {
                    console.log("All ok")
                    $("#loading").fadeOut("slow", function() {
                        document.getElementById("checkmark").innerHTML = `
                            <div class="icon icon--order-success svg" style="width:95px; height:95px;display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 154 154">
                                <g fill="none" stroke="#22AE73" stroke-width="2"> 
                                <circle cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                                <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                                <polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px;"/>   
                              </g>
                                </svg>
                            </div>`;
                        $("#checkmark").fadeIn("slow");
                        sessionStorage.removeItem("refuse")
                        setTimeout(function() {
                            let b = "1"
                            dir = (b<currentCard)? 1:-1
                            currentCard = b
                            moveCards(0.75)
                        }, 200)
                        $("#header").fadeOut("slow", function() {
                           $("#header").html("Great! Now let's change some settings") 
                           $("#header").fadeIn("slow", function() {
                            //CONTINUE
                           })
                        })
                        
                    });
                  } else {
                    console.log("Something Went Wrong", data)
                    alert(data)
                  }
                  
                })
                .catch(error => {
                  console.error(error);
                });

            };
            reader.readAsDataURL(file);
          }
      
          // Remove the input element from the DOM
          document.body.removeChild(input);
        }
      
}

function run() {
    $("#loading").fadeOut("slow", function() {
        document.getElementById("checkmark").innerHTML = `
            <div class="icon icon--order-success svg" style="width:95px; height:95px;display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 154 154">
                <g fill="none" stroke="#22AE73" stroke-width="2"> 
                <circle cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                <polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px;"/>   
              </g>
                </svg>
            </div>`;
        $("#checkmark").fadeIn("slow");
        sessionStorage.removeItem("refuse")
        setTimeout(function() {
            let b = "1"
            dir = (b<currentCard)? 1:-1
            currentCard = b
            moveCards(0.75)
        }, 200)
        
    });
}