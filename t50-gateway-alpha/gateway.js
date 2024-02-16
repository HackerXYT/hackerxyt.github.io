
sessionStorage.removeItem("skipped")
$(document).ready(docready())

function docready() {
  $("#loading").fadeOut("slow")
  log("Loading Out", "green")
  document.getElementById("loading-text").innerHTML = `Storage Loaded!`
  log("Text In", "cyan")
  let autologin = localStorage.getItem("t50-autologin")
  let loggedin = localStorage.getItem("t50-email")
  let acc = localStorage.getItem("t50pswd")
  let pswd = atob(acc)
  let username = localStorage.getItem("t50-username")
  if (loggedin != null && autologin === "true") {
    const url = `https://evox-datacenter.onrender.com/accounts?email=${loggedin}&password=${pswd}&autologin=true`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        if (data.includes("Credentials Correct")) {
          $("#loading-bar").fadeOut("slow")
          log("Existing Account Verified!", "green")
          sessionStorage.setItem("loaded", true)
          fetch(`https://evox-datacenter.onrender.com/authip?method=get&email=${loggedin}&username=${username}&password=${pswd}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              if (data === "IP is Mapped") {
                setup()
              } else if (data === "Unknown IP") {
                fetch(`https://evox-datacenter.onrender.com/authip?method=forceadd&email=${loggedin}&username=${username}&password=${pswd}`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                  })
                  .then(data => {
                    if (data === "Complete") {
                      setup()
                      $("#loading-bar").fadeOut("slow")
                    }
                  }).catch(error => {
                    console.error('Fetch error:', error);
                  });
                //docready()
                return;
              } else {
                console.error("Unknown Error IPAUTH")
              }
              //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
            }).catch(error => {
              console.error('Fetch error:', error);
            });

        } else if (data === "IP Not Verified") {
          log("Existing Account Verified! IP Not Mapped", "orange")
          fetch(`https://evox-datacenter.onrender.com/authip?method=forceadd&email=${loggedin}&username=${username}&password=${pswd}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              if (data === "Complete") {
                $("#loading-bar").fadeOut("slow")
                setup()
              }
            }).catch(error => {
              console.error('Fetch error:', error);
            });
        } else {
          log("Existing Account Verification Failed!", "red")
          localStorage.removeItem("t50-email")
          localStorage.removeItem("t50pswd")
          localStorage.removeItem("t50-username")
          docready()
        }
      })
      .catch(error => {
        const errorString = error.toString();
        if (errorString.includes("Failed to fetch")) {
          //alert("Servers Are Currently Not Responding, Update Your Application And Wait.")
          //window.location.href = "offline.html"
        } else if (errorString.includes("Load Failed")) {
          // alert("Servers Are Currently Not Responding. Please Check Back Later.")
          //window.location.href = "offline.html"
        } else {
          //alert(error)
          //window.location.href = "offline.html"
        }
        $("#loading-div-text").fadeOut("fast")
        $("#loading").fadeIn("fast")
        document.getElementById("gateway").innerHTML = `<div class="centered-text">
                                                <h2 id="text-me-two" style="margin:0">Welcome, <span id="user-text"></span></h2>
                                               <p id="loading-apps-text"></p>
                                                <div style="display: none" id="apps"></div>
                                            </div>`
        if (!localStorage.getItem("t50-username")) {
          $("#loading-bar").fadeOut("slow")
          setInterval(reconnect(), 4000)
          document.getElementById("text-me-two").innerHTML = `We Are Sorry.`
          document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.<br>Since you are new to the gateway,<br>you must wait until servers are back online`
        } else {
          $("#loading-bar").fadeOut("slow")
          document.getElementById("text-me-two").innerHTML = `Welcome back, ${localStorage.getItem("t50-username")}`
          document.getElementById("loading-apps-text").innerHTML = `Servers are currently offline.`
          setInterval(reconnect(), 4000)
        }

        $("#loading").fadeOut("fast")
        let notes = localStorage.getItem("notes-owned")
        let images = localStorage.getItem("images-owned")
        let chatvia = localStorage.getItem("chatvia-owned")
        if (notes === "true") {//OWN NOTES
          document.getElementById("apps").innerHTML = `<a onclick="shake_me('notes-app')" href="#loadapp-notes-disabled"><img id="notes-app" src="EvoxNotes.png" class="disabledapp"></img></a>`
        }
        if (images === "true") {//OWN IMAGES
          if (document.getElementById("apps").innerHTML != "") {
            document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('images-app')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
          } else {
            document.getElementById("apps").innerHTML = `<a onclick="shake_me('images-app')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
          }
        }
        if (chatvia === "true") { //OWN CHATVIA
          if (document.getElementById("apps").innerHTML != "") {
            document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('chatvia-app')" href="#loadapp-chatvia"><img id="chatvia-app" src="chatvia-img.png" class="disabledapp"></img></a>`
          } else {
            document.getElementById("apps").innerHTML = `<a onclick="shake_me('chatvia-app')" href="#loadapp-chatvia"><img id="chatvia-app" src="chatvia-img.png" class="disabledapp"></img></a>`
          }
        }
        $("#gateway").fadeIn("fast", function () {
          $("#apps").fadeIn("slow")
        })





        console.error('Fetch error:', error);
      });
    if (localStorage.getItem("remove-autolg") === "true") {
      localStorage.removeItem("remove-autolg")
      localStorage.removeItem("t50-autologin")
    }
    return;
  }
  $("#loading-div-text").fadeIn("slow", function () {
    $("#stuck").fadeOut("slow")
    setTimeout(function () {
      $("#loading-div-text").fadeOut("slow", function () {
        document.getElementById("loading-text").innerHTML = `Connecting To Database<span id="dots"></span>`
        $("#loading-div-text").fadeIn("slow", function () {
          $("#dots").html(".")
          setTimeout(function () {
            $("#dots").html("..")
            setTimeout(function () {
              $("#dots").html("...")
              setTimeout(function () {
                $("#dots").html(".")
                setTimeout(function () {
                  $("#dots").html("..")
                  fetch("https://evox-datacenter.onrender.com/accounts")
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      return response.text();
                    })
                    .then(data => {
                      $("#loading-bar").fadeOut("slow")
                      if (data === "T50 Database Online" && sessionStorage.getItem("skipped") !== "yes") {
                        log("Server Online!", "green")
                        $("#container").fadeIn("slow", function () {
                          $("#loading").fadeOut("slow")
                          $("#loading-div-text").fadeOut("fast")
                          $("#loading-text").fadeOut("slow")
                        })
                      } else {
                        $("#loading").fadeOut("fast")
                      }
                    })
                    .catch(error => {
                      const errorString = error.toString();
                      if (errorString.includes("Failed to fetch")) {
                        //alert("Servers Are Currently Not Responding, Update Your Application And Wait.")
                        //window.location.href = "offline.html"
                      } else if (errorString.includes("Load Failed")) {
                        // alert("Servers Are Currently Not Responding. Please Check Back Later.")
                        //window.location.href = "offline.html"
                      } else {
                        //alert(error)
                        //window.location.href = "offline.html"
                      }
                      $("#loading-div-text").fadeOut("fast")
                      $("#loading").fadeIn("fast")
                      document.getElementById("gateway").innerHTML = `<div class="centered-text">
                                                <h2 id="text-me-two" style="margin:0">Welcome, <span id="user-text"></span></h2>
                                               <p id="loading-apps-text"></p>
                                                <div style="display: none" id="apps"></div>
                                            </div>`
                      if (!localStorage.getItem("t50-username")) {
                        $("#loading-bar").fadeOut("slow")
                        setInterval(reconnect(), 4000)
                        document.getElementById("text-me-two").innerHTML = `We Are Sorry.`
                        document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.<br>Since you are new to the gateway,<br>you must wait until servers are back online`
                      } else {
                        $("#loading-bar").fadeOut("slow")
                        setInterval(reconnect(), 4000)
                        document.getElementById("text-me-two").innerHTML = `Welcome back, ${localStorage.getItem("t50-username")}`
                        document.getElementById("loading-apps-text").innerHTML = `Servers are currently offline.`
                      }

                      $("#loading").fadeOut("fast")
                      let notes = localStorage.getItem("notes-owned")
                      let images = localStorage.getItem("images-owned")
                      let chatvia = localStorage.getItem("chatvia-owned")
                      if (notes === "true") {//OWN NOTES
                        document.getElementById("apps").innerHTML = `<a onclick="shake_me('notes-app')" href="#loadapp-notes-disabled"><img id="notes-app" src="EvoxNotes.png" class="disabledapp"></img></a>`
                      }
                      if (images === "true") {//OWN IMAGES
                        if (document.getElementById("apps").innerHTML != "") {
                          document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('images-app')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
                        } else {
                          document.getElementById("apps").innerHTML = `<a onclick="shake_me('images-app')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
                        }
                      }
                      if (chatvia === "true") { //OWN CHATVIA
                        if (document.getElementById("apps").innerHTML != "") {
                          document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('chatvia-app')" href="#loadapp-chatvia"><img id="chatvia-app" src="chatvia-img.png" class="disabledapp"></img></a>`
                        } else {
                          document.getElementById("apps").innerHTML = `<a onclick="shake_me('chatvia-app')" href="#loadapp-chatvia"><img id="chatvia-app" src="chatvia-img.png" class="disabledapp"></img></a>`
                        }
                      }
                      $("#gateway").fadeIn("fast", function () {
                        $("#apps").fadeIn("slow")
                      })





                      console.error('Fetch error:', error);
                    });
                }, 150)

              }, 90)
            }, 90)
          }, 90)
        })
      })
    }, 0)

  })
}



var submit = document.getElementById("submit");
submit.addEventListener("click", login())

function verifycode() {
  let info = sessionStorage.getItem("ACCOUNT_DATA")
  const account = JSON.parse(info)
  let email = account.email
  let username = account.username
  let password = account.password
  let code = document.getElementById("ver_code").value
  console.log("Just to verify:\n", email, username, password, code)
  fetch(`https://evox-datacenter.onrender.com/authip?method=add&email=${email}&username=${username}&password=${password}&code=${code}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Complete") {
        $("#2fa").fadeOut("slow")
        console.log("All Done")
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        sessionStorage.removeItem("ACCOUNT_DATA")
        sessionStorage.setItem("2FA_READY", "true")
        localStorage.setItem("t50-email", email)
        localStorage.setItem("t50-autologin", true)
        localStorage.setItem("t50-username", username)
        sessionStorage.setItem("loaded", true)
        sessionStorage.setItem("loggedin", email)
        sessionStorage.setItem("loggedinpswd", btoa(password))
        setup()
      } else if (data === "Exists") {
        console.log("IP Ready")
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        sessionStorage.removeItem("ACCOUNT_DATA")
        sessionStorage.setItem("2FA_READY", "true")
        localStorage.setItem("t50-email", email)
        localStorage.setItem("t50-autologin", true)
        localStorage.setItem("t50-username", username)
        sessionStorage.setItem("loaded", true)
        sessionStorage.setItem("loggedin", email)
        sessionStorage.setItem("loggedinpswd", btoa(password))
        setup()
      } else if(data === "Wrong Code") {
        shake_me("ver_code")
      } else {
        console.error("Client ip is strange")
      }
      //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
    }).catch(error => {
      console.error('Fetch error:', error);
    });
}

function login() {
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  console.log(email, "********")
  const url = `https://evox-datacenter.onrender.com/accounts?email=${email}&password=${password}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {

      console.log(data);
      if (data.includes("Do 2FA")) {
        localStorage.getItem("2FA_READY", "false")
        const credentialsString = data;
        const match = credentialsString.match(/Username:(\w+)/);
        const username = match && match[1];
        const jsondata = {
          "username": username,
          "email": email,
          "password": password
        }
        sessionStorage.setItem("ACCOUNT_DATA", JSON.stringify(jsondata))
        $("#container").fadeOut("slow")
        $("#2fa").fadeIn("slow")
        return;
      }
      if (data.includes("Credentials Correct")) {
        console.log("Welcome Abroad")
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        const credentialsString = data;
        const match = credentialsString.match(/Username:(\w+)/);
        const username = match && match[1];
        localStorage.setItem("t50-email", email)
        localStorage.setItem("t50-autologin", true)
        localStorage.setItem("t50-username", username)
        sessionStorage.setItem("loaded", true)
        sessionStorage.setItem("loggedin", email)
        sessionStorage.setItem("loggedinpswd", btoa(password))
        if (localStorage.getItem("restart-for-florida")) {
          console.log("Florida Override!")
          localStorage.removeItem("restart-for-florida")
          localStorage.setItem("t50-autologin", true)
          localStorage.setItem("remove-autolg", true)
          restart()
          return;
        }
        setup()
      } else if (data === "Credentials Incorrect") {
        fadeError("2")
        console.log("Wrong Email/Password")
        email = ""
        password = ""
      } else if (data === "Account Doesn't Exist") {
        if (email === "" || password === "") {

        } else {
          fadeError("1")
        }

        console.log("Doesn't Exist")
        email = ""
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

document.getElementById("password").addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    login()
  }
});

document.getElementById("ver_code").addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    verifycode()
  }
});


function reconnect() {
  console.log("Reconnecting..")
  $("#loading-bar").fadeIn("slow")
  fetch("https://evox-datacenter.onrender.com/accounts")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "T50 Database Online") {
        docready()
      } else {
        $("#loading-bar").fadeOut("slow")
      }
    }).catch(error => {
      $("#loading-bar").fadeOut("slow")
    })
}