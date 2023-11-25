input1 = document.getElementById("input1")
input2 = document.getElementById("input2")
input3 = document.getElementById("input3")
input4 = document.getElementById("input4")
input5 = document.getElementById("input5")
input6 = document.getElementById("input6")

let ip;
function getIP(json) {
      ip = json.ip
      console.log("Current IP:", ip)
  }

function submit() {
    setTimeout(function() {
        code = `${input1.value}${input2.value}${input3.value}${input4.value}${input5.value}${document.getElementById("input6").value}`
        console.log(code)
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
                  console.log(data);
                  if(data === "Added") {
                    console.log("OK")
                    $("#submit").html("Welcome To T50!")
                    setTimeout(function () {
                        window.location.href = "frame.html"
                    }, 1000)
                  }
                })
                .catch(error => {
                  console.error(error);
                });
            } else if(data === "Incorrect") {
              $("#submit").html("Verification Failed!")
              console.error("Verification Failed!")
            }
              })
          .catch(error => {
            console.error('Fetch error:', error);
          });
    }, 700)
    
}
