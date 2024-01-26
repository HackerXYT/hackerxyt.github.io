
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
    if(loggedin != null && autologin === "true") {
        const url = `https://evox-datacenter.onrender.com/accounts?email=${loggedin}&password=${pswd}&autologin=true`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        if(data.includes("Credentials Correct")) {
            log("Existing Account Verified!", "green")
            sessionStorage.setItem("loaded", true)
            setup()
        } else {
            log("Existing Account Verification Failed!", "red")
            localStorage.removeItem("t50-email")
            localStorage.removeItem("t50pswd")
            localStorage.removeItem("t50-username")
            docready()
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
      if(localStorage.getItem("remove-autolg") === "true") {
        localStorage.removeItem("remove-autolg")
        localStorage.removeItem("t50-autologin")
      }
      return;
    }
    $("#loading-div-text").fadeIn("slow", function() {
      $("#stuck").fadeOut("slow")
        setTimeout(function() {
            $("#loading-div-text").fadeOut("slow", function() {
                document.getElementById("loading-text").innerHTML = `Connecting To Database<span id="dots"></span>`
                $("#loading-div-text").fadeIn("slow", function(){
                    $("#dots").html(".")
                    setTimeout(function() {
                        $("#dots").html("..")
                        setTimeout(function() {
                            $("#dots").html("...")
                            setTimeout(function() {
                                $("#dots").html(".")
                                setTimeout(function() {
                                    $("#dots").html("..")
                                    setTimeout(function() {
                                        document.getElementById("loading-text").style.transform = `translate(-50%, -455%)`
                                        $("#loading").fadeIn("slow")
                                        $("#dots").html("...")
                                        setTimeout(function() {
                                            $("#dots").html("..")
                                            fetch("https://evox-datacenter.onrender.com/accounts")
                                            .then(response => {
                                                if (!response.ok) {
                                                  throw new Error(`HTTP error! Status: ${response.status}`);
                                                }
                                                return response.text();
                                              })
                                              .then(data => {
                                                if(data === "T50 Database Online" && sessionStorage.getItem("skipped") !== "yes") {
                                                    log("Server Online!", "green")
                                                    $("#container").fadeIn("slow", function() {
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
                                                if(errorString.includes("Failed to fetch")) {
                                                  //alert("Servers Are Currently Not Responding, Update Your Application And Wait.")
                                                  //window.location.href = "offline.html"
                                                } else if(errorString.includes("Load Failed")) {
                                                   // alert("Servers Are Currently Not Responding. Please Check Back Later.")
                                                  //window.location.href = "offline.html"
                                                }else {
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
                                            if(!localStorage.getItem("t50-username")) {
                                              document.getElementById("text-me-two").innerHTML = `We Are Sorry.`
                                              document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.<br>Since you are new to the gateway,<br>you must wait until servers are back online`
                                            } else {
                                              document.getElementById("text-me-two").innerHTML = `Welcome back, ${localStorage.getItem("t50-username")}`
                                              document.getElementById("loading-apps-text").innerHTML = `Servers are currently offline.`
                                            }

                                            $("#loading").fadeOut("fast")
                                            let notes = localStorage.getItem("notes-owned")
                                            let images = localStorage.getItem("images-owned")
                                            let chatvia = localStorage.getItem("chatvia-owned")
                                            if(notes === "true") {//OWN NOTES
                                              document.getElementById("apps").innerHTML = `<a onclick="shake_me('notes-app')" href="#loadapp-notes-disabled"><img id="notes-app" src="EvoxNotes.png" class="disabledapp"></img></a>`
                                            }
                                            if(images === "true") {//OWN IMAGES
                                              if(document.getElementById("apps").innerHTML != "") {
                                                document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('images-app')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
                                              } else {
                                                document.getElementById("apps").innerHTML = `<a onclick="shake_me('images-app')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
                                              }
                                            }
                                            if(chatvia === "true") { //OWN CHATVIA
                                              if(document.getElementById("apps").innerHTML != "") {
                                                document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('chatvia-app')" href="#loadapp-chatvia"><img id="chatvia-app" src="chatvia-img.png" class="disabledapp"></img></a>`
                                              } else {
                                                document.getElementById("apps").innerHTML = `<a onclick="shake_me('chatvia-app')" href="#loadapp-chatvia"><img id="chatvia-app" src="chatvia-img.png" class="disabledapp"></img></a>`
                                              }
                                            }
                                            $("#gateway").fadeIn("fast", function() {
                                              $("#apps").fadeIn("slow")
                                            })
                                           
                                            


                                                
                                                console.error('Fetch error:', error);
                                              });
                                        }, 450)

                                    }, 150)
                                }, 150)
                            }, 150)
                        }, 150)
                    }, 150)
                })
            })
        }, 250)
        
    })
}



var submit = document.getElementById("submit");
submit.addEventListener("click", login())

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
        if(data.includes("Credentials Correct")) {
            console.log("Welcome Abroad")
            localStorage.setItem("t50pswd", `${btoa(password)}`)
            const credentialsString = data;
            const match = credentialsString.match(/Username:(\w+)/);
            const username = match && match[1];
            localStorage.setItem("t50-email", email)
            localStorage.setItem("t50-autologin", false)
            localStorage.setItem("t50-username", username)
            sessionStorage.setItem("loaded", true)
            sessionStorage.setItem("loggedin", email)
            sessionStorage.setItem("loggedinpswd", btoa(password))
            if(localStorage.getItem("restart-for-florida")) {
              console.log("Florida Override!")
              localStorage.removeItem("restart-for-florida")
              localStorage.setItem("t50-autologin", true)
              localStorage.setItem("remove-autolg", true)
              restart()
              return;
            }
            setup()
        } else if(data === "Credentials Incorrect") {
            fadeError("2")
            console.log("Wrong Email/Password")
            email = ""
            password = ""
        } else if(data === "Account Doesn't Exist") {
            if(email === "" || password === "") {

            } else {
                fadeError("1")
            }
            
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


