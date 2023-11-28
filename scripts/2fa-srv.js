input1 = document.getElementById("input1")
input2 = document.getElementById("input2")
input3 = document.getElementById("input3")
input4 = document.getElementById("input4")
input5 = document.getElementById("input5")
input6 = document.getElementById("input6")

let default_html;
let ip;
function getIP(json) {
      ip = json.ip
      console.log("Current IP:", ip)
  }

function submit() {
    setTimeout(function() {
        code = `${input1.value}${input2.value}${input3.value}${input4.value}${input5.value}${document.getElementById("input6").value}`
        console.log(code)
        if(input1.value === ""||input2.value === ""|| input3.value === ""|| input4.value === ""|| input5.value === ""|| document.getElementById("input6").value === "") {
          $("#submit").html("Fill Out All Fields!")
          default_html = setTimeout(function() {
            $("#submit").html("Begin")
          })
        }
        
        fetch(`https://2fa-t50.memeguy21.repl.co/t50?code=${code}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then(data => {
            if(data === "Correct") {
              console.log("Verified")
              $("#submit").html("Whitelisting..")
                fetch('https://team50-accounts-database-clear.memeguy21.repl.co/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: ip,
                    func: "ip-add",
                    username: "none",
                    password: "none"
                  })
                })
                .then(response => response.text())
                .then(data => {
                  ok_sound.play()
                  bg_change()
                  clearTimeout(default_html)
                  console.log(data);
                  if(data === "Added") {
                    console.log("OK")
                    $("#submit").html("Welcome To T50!")
                    
                    setTimeout(function () {
                        window.location.href = "frame.html"
                    }, 3000)
                  }
                })
                .catch(error => {
                  console.error(error);
                });
                default_html = setTimeout(function() {
                  $("#submit").html("Something Went Wrong")
                  error_sound.play()
                }, 8000)
                
            } else if(data === "Incorrect") {
              clearTimeout(default_html)
              $("#submit").html("Verification Failed!")
              console.error("Verification Failed!")
              error_sound.play()
              error()
              default_html = setTimeout(function() {
                $("#submit").html("Begin")
              }, 3500)
            }
              })
          .catch(error => {
            console.error('Fetch error:', error);
          });
    }, 700)
    
}

function bg_change() {
  // Set the initial background color
  $("body").css("background-color", "#2c0101");

  // Define the target color
  var targetColor = "#011a00"; // Dark green

  // Define the duration of the animation in milliseconds
  var duration = 2000;

  // Use jQuery UI's animate function to smoothly transition the background color
  $("body").animate({
    backgroundColor: targetColor
  }, duration);
}

function error() {
  // Set the initial background color
  $("body").css("background-color", "#2c0101");

  // Define the target color
  var targetColor = "#240101";

  // Define the duration of the animation in milliseconds
  var duration = 2000;

  // Use jQuery UI's animate function to smoothly transition the background color
  $("body").animate({
    backgroundColor: targetColor
  }, duration);
}