
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
        const url = `https://evox-accounts-database.onrender.com?email=${loggedin}&password=${pswd}`;

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
                                            fetch("https://evox-accounts-database.onrender.com")
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
                                                  alert("Servers Are Currently Not Responding, Update Your Application And Wait.")
                                                  window.location.href = "offline.html"
                                                } else if(errorString.includes("Load Failed")) {
                                                    alert("Servers Are Currently Not Responding. Please Check Back Later.")
                                                  window.location.href = "offline.html"
                                                }else {
                                                  alert(error)
                                                window.location.href = "offline.html"
                                                }
                                                
                                                console.error('Fetch error:', error);
                                              });
                                        }, 900)

                                    }, 300)
                                }, 300)
                            }, 300)
                        }, 300)
                    }, 300)
                })
            })
        }, 500)
        
    })
}



var submit = document.getElementById("submit");
submit.addEventListener("click", login())

function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email, password)
    const url = `https://evox-accounts-database.onrender.com?email=${email}&password=${password}`;

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


