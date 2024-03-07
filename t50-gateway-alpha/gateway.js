
sessionStorage.removeItem("skipped")
sessionStorage.removeItem("sending")
sessionStorage.removeItem("current_sline")
const ip = sessionStorage.getItem("IPV4")
$(document).ready(docready())
function log(text, color) {
  const styles = `color: ${color}; font-size: 16px; font-weight: normal;`;
  console.log('%c' + text, styles)
}

function FloridaRun() {
  // Open the IndexedDB database
  var request = window.indexedDB.open('ONE_SIGNAL_SDK_DB');

  request.onerror = function (event) {
    console.error("IndexedDB error:", event.target.errorCode);
  };

  request.onsuccess = function (event) {
    var db = event.target.result;

    // Start a transaction to access the database
    var transaction = db.transaction(['pushSubscriptions'], 'readonly');

    // Retrieve the object store
    var objectStore = transaction.objectStore('pushSubscriptions');

    // Open a cursor to iterate over the data
    var cursorRequest = objectStore.openCursor();

    cursorRequest.onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        // Access each object in the object store and do something with it
        console.log(cursor.value);
        sessionStorage.setItem("flrd_info", JSON.stringify(cursor.value))

        // Move to the next object in the object store
        cursor.continue();
      } else {
        console.log('No more entries');
      }
    };

    cursorRequest.onerror = function (event) {
      console.error("Cursor error:", event.target.errorCode);
    };
  };

  request.onupgradeneeded = function (event) {
    var db = event.target.result;
    db.createObjectStore('pushSubscriptions');
  };

}

function greetUser() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  let greeting;

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = "Good evening";
  } else {
    greeting = "Greetings";
  }

  return greeting;
}

function setup() {
  //console.log("RUNNING SETUP!")

  try {
    custombg()
  } catch {
    let inter = setInterval(function () {
      try {
        custombg()
        clearInterval(inter)
      } catch {
        console.log("CustomBG Failed. Retrying")
      }
    }, 100)
  }

  let version;
  try {
    log("Evox Gateway V:Epsilon 0.7", "cyan")
    try {
      clearInterval(version)
    } catch {
      //
    }
  } catch {
    version = setInterval(function () {
      log("Evox Gateway V:Epsilon 0.7", "cyan")
    }, 800)
  }


  try {
    loadusers()
  } catch {
    let inter = setInterval(function () {
      try {
        loadusers()
        clearInterval(inter)
      } catch {
        console.log("loadusers Failed. Retrying")
      }
    }, 100)
  }
  let lg_status = sessionStorage.getItem("loaded")
  //window.OneSignalDeferred = window.OneSignalDeferred || [];
  //OneSignalDeferred.push(function (OneSignal) {
  //  OneSignal.setExternalUserId(localStorage.getItem("t50-username"));
  //  OneSignal.init({
  //    appId: "60647dcd-b776-4527-93fa-dbfcb86494af",
  //    safari_web_id: "web.onesignal.auto.27d2eba6-7621-43e8-b8d4-d2a9de3b8fea",
  //    notifyButton: {
  //      enable: true,
  //      position: "bottom-left",
  //    },
  //  });
  //});

  

  if (lg_status === "true") {
    let username = localStorage.getItem("t50-username")
    let email = localStorage.getItem("t50-email")
    //$("#user-text").html(username)
    const greet = greetUser()
    document.getElementById("greet").innerHTML = `${greet}, <span style="margin-bottom: 10px;" id="user-text">${username}</span>`
    try {
      log("Loading Gateway", "green")
    } catch {
      setTimeout(function () {
        log("Loading Gateway", "green")
      }, 950)
    }

    $("#container").fadeOut("slow", function () {
      $("#gateway").fadeIn("slow")
      if (username != null && email != null) {
        sessionStorage.setItem("skipped", "yes")
        $("#user-text").html(username)
        try {
          log("Loading Gateway", "green")
        } catch {
          setTimeout(function () {
            log("Loading Gateway", "green")
          }, 950)
        }

        $("#container").fadeOut("fast")
        $("#loading").fadeIn("slow")
        $("#stuck").fadeOut("slow")
        fetch(`https://evox-datacenter.onrender.com/accounts?applications=get&email=${localStorage.getItem("t50-email")}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then(data => {
            //document.body.style.overflow = 'hidden';
            if (data === "No Apps Owned") {
              console.log("No Apps Owned! Want To Register One?")
            }
            try {
              var inputString = data;
              var parts = inputString.split(', ');
              var notes, images, chatvia;
              for (var i = 0; i < parts.length; i++) {
                var keyValue = parts[i].split(':');
                if (keyValue.length === 2) { // Ensure there is a key and a value
                  var key = keyValue[0].trim();
                  var value = keyValue[1].trim();
                  if (key === 'Notes') {
                    notes = value;
                  }
                  if (key === 'Images') {
                    images = value;
                  }
                  if (key === 'Chatvia') {
                    chatvia = value;
                  }
                } else {
                  console.error(`Invalid format for part: ${parts[i]}`);
                }
              }
              console.log('Notes:', notes);
              console.log('Images:', images);
              console.log('Chatvia:', chatvia);
              if (notes === "owned") {//OWN NOTES
                localStorage.setItem("notes-owned", true)
                //document.getElementById("apps").innerHTML = `<a onclick="load('notes')" href="#loadapp-notes"><img src="EvoxNotes.png" class="app"></img></a>`
              } else {
                localStorage.setItem("notes-owned", false)
                //document.getElementById("apps").innerHTML = `<a onclick="buy('notes')" href="#loadapp-notes-disabled"><img src="EvoxNotes.png" class="disabledapp"></img></a>`
              }
              if (images === "owned") {//OWN IMAGES
                localStorage.setItem("images-owned", true)
                if (document.getElementById("apps").innerHTML != "") {
                  document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('images')" href="#loadapp-images"><img src="t50-img.png" class="app"></img></a>`
                } else {
                  document.getElementById("apps").innerHTML = `<a onclick="load('images')" href="#loadapp-images"><img src="t50-img.png" class="app"></img></a>`
                }
              } else {
                localStorage.setItem("images-owned", false)
                if (document.getElementById("apps").innerHTML != "") {
                  document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="buy('images')" href="#loadapp-images-disabled"><img src="t50-img.png" class="disabledapp"></img></a>`
                } else {
                  document.getElementById("apps").innerHTML = `<a onclick="buy('images')" href="#loadapp-images-disabled"><img src="t50-img.png" class="disabledapp"></img></a>`
                }
              }
              if (chatvia === "owned") { //OWN CHATVIA
                localStorage.setItem("chatvia-owned", true)
                //if (document.getElementById("apps").innerHTML != "") {
                //	document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('chatvia')" href="#loadapp-chatvia"><img src="chatvia-img.png" class="app"></img></a>`
                //} else {
                //	document.getElementById("apps").innerHTML = `<a onclick="load('chatvia')" href="#loadapp-chatvia"><img src="chatvia-img.png" class="app"></img></a>`
                //}
              } else {
                localStorage.setItem("chatvia-owned", false)
                //if (document.getElementById("apps").innerHTML != "") {
                //	document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="buy('chatvia')" href="#loadapp-chatvia"><img src="chatvia-img.png" class="disabledapp"></img></a>`
                //} else {
                //	document.getElementById("apps").innerHTML = `<a onclick="buy('chatvia')" href="#loadapp-chatvia"><img src="chatvia-img.png" class="disabledapp"></img></a>`
                //}
              }
              const styles = `color: #766ee6; font-size: 19px; font-weight: normal;`;
              console.log('%c' + "Enabling Tasco", styles)
              document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('tasco')" href="#loadapp-tasco"><img src="https://team50.sytes.net/tasco/tasco-app.png" class="app"></img></a>`
              console.log("Enabling SecureLine")
              //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('secureline')" href="#loadapp-secureline"><img src="./secureline/sline.png" class="app"></img></a>`
              if (localStorage.getItem("t50-username") === "papostol") {
                console.log('%c' + "Enabling Transports", styles)
                $("#transports-app").fadeIn("slow")
                //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('emails')" href="#loadapp-transports"><img src="evox-logo-dark.png" class="app"></img></a>`
                document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="window.location.href='../DC/'" href="#loadapp-dc"><img id="dc-enabled" src="evox-logo-apple.png" class="app"></img></a><a onclick="shake_me('transports-disabled');notice('T50 Transports is currently not available')" href="#loadapp-transports"><img id="transports-disabled" src="T50Transports.png" class="disabledapp"></img></a><a onclick="moretti()" href="#loadapp-mt"><img id="mt-disabled" src="mt.jpg" class="disabledapp"></img></a>`
              }
              $("#apps").fadeIn("slow")
              $("#loading-apps-text").fadeOut("slow", function () {
                const phrases = [
                  "Your Evox Applications are available below.",
                  "Find your Evox Applications listed below.",
                  "Below, you'll find your Evox Applications.",
                  "Listed below are your Evox Applications.",
                  "Discover your Evox Applications below.",
                  "Below, you'll see your Evox Applications.",
                  "Your Evox Applications can be found below.",
                  "Displayed below are your Evox Applications.",
                  "Your Evox Applications await you below.",
                  "Below, you'll locate your Evox Applications."
                ];

                const randomIndex = Math.floor(Math.random() * phrases.length);
                const randomlySelectedPhrase = phrases[randomIndex];
                document.getElementById("loading-apps-text").innerHTML = randomlySelectedPhrase
                $("#loading-apps-text").fadeIn("slow")
              })
              $("#loading").fadeOut("slow")
              uielements()
              var elementToRemove = document.getElementById("loading-div-text");

              // Check if the element exists before trying to remove it
              if (elementToRemove) {
                // Remove the element
                console.log("Loading Text Removed")
                elementToRemove.remove();
              } else {
                console.log("Element not found!");
              }
              try {
                uielements()
              } catch {
                let inter = setInterval(function () {
                  try {
                    uielements()
                    clearInterval(inter)
                  } catch {
                    console.log("uielements Failed. Retrying")
                  }
                }, 100)
              }

            } catch (error) {
              console.error('Error parsing data:', error);
            }
          })
          .catch(error => {
            console.error('Fetch error:', error);
          });
      }
    });

  } else {
    console.log('%c' + "Error! Cannot Load Page When Logged Out.", `color: red; font-size: 16px; font-weight: bold;`)
  }

}


function docready() {
  $("#loading").fadeOut("slow")
  console.log('%c' + "Loading Out", `color: green; font-size: 16px; font-weight: normal;`)
  document.getElementById("loading-text").innerHTML = `Storage Loaded!`
  console.log('%c' + "Text In", `color: cyan; font-size: 16px; font-weight: normal;`)
  let autologin = localStorage.getItem("t50-autologin")
  let loggedin = localStorage.getItem("t50-email")
  let acc = localStorage.getItem("t50pswd")
  let pswd = atob(acc)
  let username = localStorage.getItem("t50-username")
  if (loggedin != null && autologin === "true") {
    const url = `https://evox-datacenter.onrender.com/accounts?email=${loggedin}&password=${pswd}&autologin=true&ip=${localStorage.getItem("IPV4")}`;

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
          console.log('%c' + "Account Verified!", `color: green; font-size: 16px; font-weight: bold;`)
          sessionStorage.setItem("loaded", true)
          fetch(`https://evox-datacenter.onrender.com/authip?method=get&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
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
                fetch(`https://evox-datacenter.onrender.com/authip?method=forceadd&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                  })
                  .then(data => {
                    if (data === "Complete") {
                      var elementToRemove = document.getElementById("loading-div-text");

                      // Check if the element exists before trying to remove it
                      if (elementToRemove) {
                        // Remove the element
                        console.log("Loading Text Removed")
                        elementToRemove.remove();
                      } else {
                        console.log("Element not found!");
                      }
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
          FloridaRun()
        } else if (data === "IP Not Verified") {
          console.log('%c' + "Existing Account Verified! IP Not Mapped", `color: orange; font-size: 16px; font-weight: bold;`)
          fetch(`https://evox-datacenter.onrender.com/authip?method=forceadd&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
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
          FloridaRun()
        } else {
          console.log('%c' + "Account Verification Failed!", `color: red; font-size: 20px; font-weight: bold;`)
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
        const greet = greetUser()
        document.getElementById("gateway").innerHTML = `<div class="centered-text">
                                                <h2 id="text-me-two" style="margin:0">${greet}, <span id="user-text"></span></h2>
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
          try {
            critical.play()
          } catch {
            console.error("Couldn't play sound. User hasn't interacted yet")
          }

          setInterval(reconnect(), 1000)
        }

        $("#loading").fadeOut("fast")
        let notes = localStorage.getItem("notes-owned")
        let images = localStorage.getItem("images-owned")
        let chatvia = localStorage.getItem("chatvia-owned")
        if (notes === "true") {//OWN NOTES
          document.getElementById("apps").innerHTML = `<a onclick="shake_me('notes-app');notice('Evox Notes is currently not available')" href="#loadapp-notes-disabled"><img id="notes-app" src="EvoxNotes.png" class="disabledapp"></img></a>`
        }
        if (images === "true") {//OWN IMAGES
          if (document.getElementById("apps").innerHTML != "") {
            document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('images-app');notice('You do not have permission to use T50 Images')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
          } else {
            document.getElementById("apps").innerHTML = `<a onclick="shake_me('images-app');notice('You do not have permission to use T50 Images')" href="#loadapp-images"><img id="images-app" src="t50-img.png" class="disabledapp"></img></a>`
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
        document.getElementById("loading-text").innerHTML = `Connecting<span id="dots"></span>`
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
                        console.log('%c' + "Server Online!", `color: green; font-size: 16px; font-weight: normal;`)
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
                      const greet = greetUser()
                      document.getElementById("gateway").innerHTML = `<div class="centered-text">
                                                <h2 id="text-me-two" style="margin:0">${greet}, <span id="user-text"></span></h2>
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

document.getElementById("dig1").addEventListener("input", function () {
  if (document.getElementById("dig1").value !== "") {
    document.getElementById("dig2").focus()
  } else {
    console.log("2FA Possibly Empty")
  }

});

document.getElementById("dig2").addEventListener("input", function () {
  if (document.getElementById("dig2").value !== "") {
    document.getElementById("dig3").focus()
  }
});
document.getElementById("dig3").addEventListener("input", function () {
  if (document.getElementById("dig3").value !== "") {
    document.getElementById("dig4").focus()
  }
});
document.getElementById("dig4").addEventListener("input", function () {
  if (document.getElementById("dig4").value !== "") {
    document.getElementById("dig5").focus()
  }
});
document.getElementById("dig5").addEventListener("input", function () {
  if (document.getElementById("dig5").value !== "") {
    document.getElementById("dig6").focus()
  }
});

document.getElementById("dig2").addEventListener("keydown", function backspaceFunction(event) {
  if (event.key === "Backspace") {
    console.log("Backspace pressed");
    if (document.getElementById("dig2").value === "") {
      document.getElementById("dig1").focus()
    }
  }
});

document.getElementById("dig3").addEventListener("keydown", function backspaceFunction(event) {
  if (event.key === "Backspace") {
    console.log("Backspace pressed");
    if (document.getElementById("dig3").value === "") {
      document.getElementById("dig2").focus()
    }
  }
});

document.getElementById("dig4").addEventListener("keydown", function backspaceFunction(event) {
  if (event.key === "Backspace") {
    console.log("Backspace pressed");
    if (document.getElementById("dig4").value === "") {
      document.getElementById("dig3").focus()
    }
  }
});

document.getElementById("dig5").addEventListener("keydown", function backspaceFunction(event) {
  if (event.key === "Backspace") {
    console.log("Backspace pressed");
    if (document.getElementById("dig5").value === "") {
      document.getElementById("dig4").focus()
    }
  }
});
document.getElementById("dig6").addEventListener("keydown", function backspaceFunction(event) {
  if (event.key === "Backspace") {
    console.log("Backspace pressed");
    if (document.getElementById("dig6").value === "") {
      document.getElementById("dig5").focus()
    }
  }
});


function verifycode() {
  login_ok.play()
  let info = sessionStorage.getItem("ACCOUNT_DATA")
  const account = JSON.parse(info)
  let email = account.email
  let username = account.username
  let password = account.password
  let code = document.getElementById("ver_code").value
  //let dig1 = document.getElementById("dig1").value
  //let dig2 = document.getElementById("dig2").value
  //let dig3 = document.getElementById("dig3").value
  //let dig4 = document.getElementById("dig4").value
  //let dig5 = document.getElementById("dig5").value
  //let dig6 = document.getElementById("dig6").value
  //let code = `${dig1}${dig2}${dig3}${dig4}${dig5}${dig6}`
  console.log("Just to verify:\n", email, username, password, code)
  fetch(`https://evox-datacenter.onrender.com/authip?method=add&email=${email}&username=${username}&password=${password}&code=${code}&ip=${localStorage.getItem("IPV4")}`)
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
        localStorage.setItem("2fa_status", "On")
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
        localStorage.setItem("2fa_status", "On")
        setup()
      } else if (data === "Wrong Code") {
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
  login_ok.play()
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  console.log(email, "********")
  const url = `https://evox-datacenter.onrender.com/accounts?email=${email}&password=${password}&ip=${localStorage.getItem("IPV4")}`;

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
        localStorage.setItem("2fa_status", "On")
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
        FloridaRun()
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
  fetch("https://evox-datacenter.onrender.com/cron")
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Online!") {
        console.log("Back Online!")
        //docready()
        $("#stuck").fadeOut("slow", function () {
          window.location.reload()
        })
      } else {
        $("#loading-bar").fadeOut("slow")
      }
    }).catch(error => {
      $("#loading-bar").fadeOut("slow")
      reconnect()
    })
}

