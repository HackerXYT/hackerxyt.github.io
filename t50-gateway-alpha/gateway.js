
sessionStorage.removeItem("skipped")
sessionStorage.removeItem("sending")
sessionStorage.removeItem("current_sline")
sessionStorage.removeItem("block_interactions")
sessionStorage.setItem("loaded", true)
sessionStorage.removeItem("autolg_off")
sessionStorage.removeItem("blockBottomLogout")
sessionStorage.removeItem("unl")
sessionStorage.removeItem("lockNotif")
function fadeElement(elementId, speed) {
  var element = document.getElementById(elementId);
  var opacity = 1;
  var direction = -1; // -1 for fade out, 1 for fade in

  function fade() {
    opacity += 0.01 * direction;
    element.style.opacity = opacity;

    if (opacity <= 0 || opacity >= 1) {
      direction *= -1;
    }

    setTimeout(fade, speed);
  }

  fade();
}


var focusUnl = new Howl({
  src: ['./internal/focusUnlock.mp3'],
  volume: 1
});

var pressUnl = new Howl({
  src: ['./internal/pressUnl.mp3'],
  volume: 1
});

var successUnl = new Howl({
  src: ['./internal/successUnl.mp3'],
  volume: 1
});

var backUnl = new Howl({
  src: ['./internal/backUnl.mp3'],
  volume: 1
});



var merge_sound = new Howl({
  src: ['./ui-sounds/merge.mp3'],
  volume: 1
});

var update_complete = new Howl({
  src: ['./ui-sounds/update_complete.mp3'],
  volume: 1
});

var windowE = new URL(window.location.href);
var externalID = windowE.searchParams.get("id");
if (externalID) {
  document.getElementById("def_text").innerHTML = "Please log in to proceed with the Evox Desktop App."
}
//sessionStorage.removeItem("pfp")
const ip = sessionStorage.getItem("IPV4")
$(document).ready(docready())
function log(text, color) {
  const styles = `color: ${color}; font-size: 16px; font-weight: normal;`;
  console.log('%c' + text, styles)
}
var goback = new Howl({
  src: ['./ui-sounds/goback.mp3'],
  volume: 1
});
function login_to_storage() {
  $("#stuck").fadeIn("fast")
  custombg()
  let email = localStorage.getItem("t50-email")
  let username = localStorage.getItem("t50-username")
  document.getElementById("email").value = email
  document.getElementById("email").disabled = true
  $("#add_button").fadeOut("fast", function () {
    $("#rem_text").fadeOut("fast", function () {
      $("#remMeLB").fadeIn("fast")
      $("#password").fadeIn("fast")
      $("#submit").fadeIn("fast")
      $("#use_switch").fadeIn("fast", function () {
        setTimeout(function () {
          $("#def_text").fadeIn("slow")
          $("#stuck").fadeOut("fast")
        }, 700)

      })

      setTimeout(function () {
        document.getElementById("goback_login").style.border = "2px solid #38662c";
        $("#goback_login").fadeIn("slow")
      }, 2300)

    })
  })


}

function goback() {

  $("#rem-user-ic").fadeIn("fast")
  document.getElementById("background").innerHTML = `<div id="bgimaget" class="background" style="background: radial-gradient(circle, #400000, #000000)"></div>`
  $("#goback_login").fadeOut("fast", function () {
    $("#stuck").fadeIn("fast")
    $("#add_button").fadeIn("fast", function () {
      $("#rem_text").fadeIn("fast", function () {
        $("#password").fadeOut("fast")
        $("#remMeLB").fadeOut("fast")
        $("#submit").fadeOut("fast")
        $("#use_switch").fadeOut("fast")
        $("#def_text").fadeOut("slow")
        $("#stuck").fadeOut("fast")
        sessionStorage.removeItem("clearafter")
      })
    })
  })


  //try {
  //  
  //} catch {
  //  //ok
  //}

}

function change_acc() {
  if (sessionStorage.getItem("block_interactions") === "true") {
    shake_me("add_button")
    //Servers Offline
    return;
  }
  sessionStorage.setItem("clearafter", true)
  document.getElementById("email").value = ""
  document.getElementById("email").disabled = false
  $("#rem-user-ic").fadeOut("fast")
  $("#add_button").fadeOut("fast", function () {
    $("#rem_text").fadeOut("fast", function () {
      $("#remMeLB").fadeIn("fast")
      $("#password").fadeIn("fast")
      $("#submit").fadeIn("fast")
      $("#use_switch").fadeIn("fast", function () {
        setTimeout(function () {
          $("#def_text").fadeIn("slow")
        }, 700)

      })

      setTimeout(function () {
        document.getElementById("goback_login").style.border = "2px solid #38662c";
        $("#goback_login").fadeIn("slow")
      }, 2300)

    })
  })
}

if (sessionStorage.getItem("clearafter")) {
  sessionStorage.removeItem("clearafter")
}

function FloridaDelete() {
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  var request = indexedDB.open('ONE_SIGNAL_SDK_DB');
  request.onsuccess = function (event) {
    var db = event.target.result;
    db.close();
    var deleteRequest = indexedDB.deleteDatabase('ONE_SIGNAL_SDK_DB');
    deleteRequest.onsuccess = function () {
      console.log("Database deleted successfully");
    };
    deleteRequest.onerror = function () {
      console.error("Error deleting database");
    };
  };

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.errorCode);
  };
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
        const onesignalid = cursor.value
        sessionStorage.setItem("flrd_info", JSON.stringify(onesignalid.onesignalId))

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

function setupCrypt() {
  fetch(`https://data.evoxs.xyz/accounts?method=cryptox-status&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(status => {
      if (status.includes("Enabled")) {
        localStorage.setItem("cryptox-accepted", "true")
      } else if (status === "Disabled") {
        localStorage.setItem("cryptox-accepted", "false")
      } else if (status === "Ready To Setup") {
        localStorage.setItem("cryptox-accepted", "empty")
      } else {
        console.error("I dont know what i got from cryptox:", status)
      }

    }).catch(error => {
      console.error(error);
    });
}
function setup() {
  //if(localStorage.getItem("t50-username") === "papostol" || localStorage.getItem("t50-username") === "Kyriakos" || localStorage.getItem("t50-username") === "Clxpzie"|| localStorage.getItem("t50-username") === "DarkAngel"|| localStorage.getItem("t50-username") === "bantou") {
  //  if(localStorage.getItem("betaOK") !== "true") {
  //    console.log("Username was papostol or Kyriakos and neverSho")
  //    document.getElementById("gateway").style.filter = "blur(10px)"
  //    document.getElementById("recommendationUSR").classList.add("active")
  //    sessionStorage.setItem("blockBottomLogout", "true")
  //    sessionStorage.setItem("blockBottomLogout", "true")
  //  } else {
  //    console.log("Beta is seen")
  //  }
  //  
  //}
  //try {
  //  window.OneSignalDeferred = window.OneSignalDeferred || [];
  //  OneSignalDeferred.push(function (OneSignal) {
  //    OneSignal.init({
  //      appId: "986f81a5-5fab-4c0d-8fb3-9a7f6ff80eab",
  //      safari_web_id: "web.onesignal.auto.261dc44c-6b5c-4882-ba5f-51ef0736d918",
  //      notifyButton: {
  //        enable: true
  //      },
  //      userId: localStorage.getItem("t50-username") // Specify a unique user ID here
  //    });
  //  });
  //} catch (error) {
  //  console.error("Florida failed to load onesignal:", error);
  //}
  setupCrypt()
  //if (localStorage.getItem("updated_To_Epsilon") !== "ready" && localStorage.getItem("t50-username")) {
  //  window.location.href = "./update/"
  //  return;
  //}

  if (localStorage.getItem("t50-username") === "papostol") {
    $("#secureline-get").html("OPEN")
    $("#mti-get").html("OPEN")
    $("#transports-get").html("OPEN")
    $("#emails-get").html("OPEN")
    $("#dc-get").html("OPEN")
  }

  console.log("RUNNING SETUP!")
  $("#navigator").fadeIn("fast")
  loadGrounds()
  //if (localStorage.getItem("New_ID0.92.1") !== "SEEN") {
  //  document.getElementById("loading-text").innerHTML = "Waiting for user to read news."
  //  $("#loading-text").fadeOut("fast")
  //  $("#stuck").fadeOut("fast")
  //  $("#EvoxMerge").fadeOut("fast")
  //  $("#container").fadeOut("fast")
  //  document.getElementById('gateway').style.filter = 'blur(25px)'
  //  document.getElementById("whats_new").classList.add("active");
  //  document.getElementById("navigator").style.display = "none"
  //  return;
  //} else {
    $("#loading-text").fadeIn("fast")
    $("#stuck").fadeIn("fast")
  //}
  try {
    custombg()
  } catch {
    let inter = setInterval(function () {
      try {
        custombg()
        clearInterval(inter)
      } catch (error) {
        console.log("CustomBG Failed. Retrying", error)
      }
    }, 100)
  }

  let version;
  try {
    log("Evox Gateway V:Epsilon 1.0", "cyan")
    try {
      clearInterval(version)
    } catch {
      //
    }
  } catch {
    version = setInterval(function () {
      log("Evox Gateway V:Epsilon 1.0", "cyan")
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
  try {
    loadPrefs()
    console.log("Loaded Prefs")
  } catch {
    let interv = setInterval(function () {
      try {
        loadPrefs()
        clearInterval(interv)
      } catch {
        console.log("loadPrefs Failed. Retrying")
      }
    }, 100)
  }
  let lg_status = sessionStorage.getItem("loaded")
  //try {
  //  OneSignalDeferred.push(function() {
  //    OneSignal.logout();
  //  });
  //} catch {
  //  console.error("Error Logging Out Of Florida. Safe")
  //}
  fetch(`https://data.evoxs.xyz/notifications?process=get&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log("Fetching Notifications")
      if (data === `{"notifications":[]}` || data === "No notifications!") {
        console.log("No Notifications")
        //Do nothing
      } else {
        const notifications = JSON.parse(data)
        const numNotifications = notifications.notifications.length;
        const localNotif = localStorage.getItem("notifications_seen")
        if (localNotif) {
          const notifNum = Number(localNotif)
          if (notifNum < numNotifications) {
            var animatedButton = document.getElementById("animatedButton_notif");
            animatedButton.classList.add("fadeInOut")
            animatedButton.style.display = "block";
            animatedButton.innerHTML = `<svg id="notif" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" width="25px" height="25px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
            <path stroke="#fff" stroke-width="2" class="clr-i-outline--badged clr-i-outline-path-1--badged" d="M18,34.28A2.67,2.67,0,0,0,20.58,32H15.32A2.67,2.67,0,0,0,18,34.28Z"/><path class="clr-i-outline--badged clr-i-outline-path-2--badged" d="M32.51,27.83A14.4,14.4,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15a10.92,10.92,0,0,0-.16-1.79,7.44,7.44,0,0,1-2.24-.84,8.89,8.89,0,0,1,.4,2.64v4.94a14.24,14.24,0,0,0,1.65,5.85,16.17,16.17,0,0,0,2.44,3H5.13a16.17,16.17,0,0,0,2.44-3,14.24,14.24,0,0,0,1.65-5.85V15.15A8.8,8.8,0,0,1,18,6.31a8.61,8.61,0,0,1,4.76,1.44A7.49,7.49,0,0,1,22.5,6c0-.21,0-.42,0-.63a10.58,10.58,0,0,0-3.32-1V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93,1,1,0,0,0-.34.75v1.36a1,1,0,0,0,1,1h27.8a1,1,0,0,0,1-1V28.58A1,1,0,0,0,32.51,27.83Z"/><circle class="clr-i-outline--badged clr-i-outline-path-1--badged clr-i-badge" cx="30" cy="6" r="5"/>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
        </svg>`
            setTimeout(function () {
              animatedButton.style.opacity = "1";
              animatedButton.style.transform = "translateY(0)";
            }, 100);
          } else {
            console.log("No new notifications")
          }
        } else {
          console.log("No Local Value")
        }
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  if (!localStorage.getItem("florida_init") && !window.location.href.includes("localhost")) {
    fetch(`https://data.evoxs.xyz/florida?method=largest&username=${localStorage.getItem("t50-username")}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        if (data !== "Error") {
          //OneSignalDeferred.push(function () {
          //  const tologin = `${localStorage.getItem("t50-username")}${data}`
          //  OneSignal.login(tologin);
          //});
          localStorage.setItem("florida_init_registered", `${localStorage.getItem("t50-username")}${data}`)
          localStorage.setItem("florida_init", true)
        } else {
          console.error("Got an error response for florida")
        }

      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

  }






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
    $("#EvoxMerge").fadeOut("fast")
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

        $("#EvoxMerge").fadeOut("fast")
        $("#container").fadeOut("fast")
        $("#loading").fadeIn("slow")
        $("#stuck").fadeOut("slow")
        fetch(`https://data.evoxs.xyz/accounts?applications=get&email=${localStorage.getItem("t50-email")}`)
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
              document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('tasco')" href="#loadapp-tasco"><img src="https://evoxs.xyz/tasco/tasco-app.png" class="app"></img></a>`
              console.log("Enabling SecureLine")
              //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('secureline')" href="#loadapp-secureline"><img src="./secureline/sline.png" class="app"></img></a>`
              if (localStorage.getItem("t50-username") === "papostol") {
                console.log('%c' + "Enabling Transports", styles)
                $("#transports-app").fadeIn("slow")
                //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('emails')" href="#loadapp-transports"><img src="evox-logo-dark.png" class="app"></img></a>`
                document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('dc')" href="#loadapp-dc"><img id="dc-enabled" src="evox-logo-apple.png" class="app"></img></a><a onclick="shake_me('transports-disabled');notice('T50 Transports is currently not available');load('transports')" href="#loadapp-transports"><img id="transports-disabled" src="T50Transports.png" class="disabledapp"></img></a><a onclick="moretti()" href="#loadapp-mt"><img id="mt-disabled" src="mt.jpg" class="disabledapp"></img></a>`
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


function docready(merge) {
  //if (localStorage.getItem("updated_To_Epsilon") !== "ready" && localStorage.getItem("t50-username")) {
  //  window.location.href = "./update/"
  //  return;
  //}

  console.log('%c' + "Loading Out", `color: green; font-size: 16px; font-weight: normal;`)
  document.getElementById("loading-text").innerHTML = `Storage initialized!<br>Now verifying account...`
  console.log('%c' + "Text In", `color: cyan; font-size: 16px; font-weight: normal;`)
  let autologin = localStorage.getItem("t50-autologin")
  let loggedin = localStorage.getItem("t50-email")
  let acc = localStorage.getItem("t50pswd")
  let pswd = atob(acc)
  let username = localStorage.getItem("t50-username")


  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('merge') && !merge && !username) {
    merge_sound.play()
    let refixstr = urlParams.get('merge')
    let myinfo = JSON.parse(refixstr)
    sessionStorage.setItem("transfer", JSON.stringify(myinfo))
    document.getElementById("mrg-name").innerHTML = myinfo['t50-username']
    document.getElementById("transfUsr").innerHTML = myinfo['t50-username']
    document.getElementById("mrg-email").innerHTML = myinfo['t50-email']
    document.getElementById("loading-text").innerHTML = ``
    const url = `https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${myinfo['t50-username']}`;
    fetch(url)
      .then(response => response.text())
      .then(data => {
        if (data.indexOf("base64") === -1) {
          // If it doesn't contain "base64", add the prefix
          data = "data:image/jpeg;base64," + data;
        }
        document.getElementById("mrg-img").src = `${data}`;
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
    $("#loading").fadeOut("fast")
    document.getElementById("complete_merge").classList.add("active")
    return;
  }



  if (loggedin != null && autologin === "true") {
    var wind = new URL(window.location.href);
    var ext = wind.searchParams.get("id");
    var rel = wind.searchParams.get("switch");
    if (rel) {
      ext_relogin()
      return;
    }



    const url = `https://data.evoxs.xyz/accounts?email=${loggedin}&password=${pswd}&autologin=true&ip=${localStorage.getItem("IPV4")}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        if (data.includes("Credentials Correct")) {
          document.getElementById("loading-text").innerHTML = `Account Verified!`
          $("#loading-bar").fadeOut("slow")
          console.log('%c' + "Account Verified!", `color: green; font-size: 16px; font-weight: bold;`)

          if (ext) {
            fetch(`https://data.evoxs.xyz/evoxApp?method=assignAccount&id=${ext}&email=${loggedin}&password=${pswd}`)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
              })
              .then(data => {
                if (data === "Complete") {
                  //window.close()
                  window.location.href = "ext-ready.html"
                }
                return;

              }).catch(error => {
                console.error('Fetch error:', error);
              });
            //send to dc that id matches to acc email
          }

          sessionStorage.setItem("loaded", true)
          fetch(`https://data.evoxs.xyz/authip?method=get&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              $("#loading").fadeOut("slow")
              if (ext) {
                fetch(`https://data.evoxs.xyz/evoxApp?method=assignAccount&id=${ext}&email=${loggedin}&password=${pswd}`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                  })
                  .then(data => {
                    if (data === "Complete") {
                      //window.close()
                      window.location.href = "ext-ready.html"
                    }
                    return;

                  }).catch(error => {
                    console.error('Fetch error:', error);
                  });
                //send to dc that id matches to acc email
              }
              if (data === "IP is Mapped") {
                console.log("IP Mapped")
                if (sessionStorage.getItem("unlocked") === "true") {
                  setup()
                } else {
                  lockMe()
                  sessionStorage.setItem("unlocked", "true")
                }

                //setup() is old
              } else if (data === "Unknown IP") {
                fetch(`https://data.evoxs.xyz/authip?method=forceadd&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.text();
                  })
                  .then(data => {
                    $("#loading").fadeOut("slow")
                    console.log("IP Unknown")
                    if (data === "Complete") {
                      var elementToRemove = document.getElementById("loading-div-text");

                      // Check if the element exists before trying to remove it
                      //if (elementToRemove) {
                      // Remove the element
                      //console.log("Loading Text Removed")
                      //elementToRemove.remove();
                      //} else {
                      //console.log("Element not found!");
                      //}

                      //setup()
                      $("#loading-bar").fadeOut("slow")
                    }
                  }).catch(error => {
                    console.error('Fetch error:', error);
                  });
                //docready()
                //return;
              } else {

                console.error(`Unknown Error IPAUTH\nGot data: ${data}`)
                if (data === "Username doesn't match the account") {
                  document.getElementById("loading-div-text").innerHTML = "<p>Something messed up your client.<br>Your local username doesn't match your account<br>Click below to re-login</p><button onclick='logoff()'>Log out</button>"
                }
              }
              //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
            }).catch(error => {
              console.error('Fetch error:', error);
            });
          FloridaRun()
        } else if (data.includes("IP Not Verified")) {
          $("#loading").fadeOut("slow")
          console.log('%c' + "Existing Account Verified! IP Not Mapped", `color: orange; font-size: 16px; font-weight: bold;`)
          fetch(`https://data.evoxs.xyz/authip?method=forceadd&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              if (data === "Complete") {
                $("#loading-bar").fadeOut("slow")
                lockMe()
                //setup() is old
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

        $("#stuck").fadeOut("fast")
        $("#loading-bar").fadeOut("fast")
        $("#vox").fadeIn("fast")
        $("#profile").fadeIn("fast")
        custombg()
        fadeElement("nosignal", 10); // You can adjust the speed here (lower value for faster fading)
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
          document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.
          <br>Since you haven't logged in yet, please wait until the servers are back online.`
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
          document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a id="tasco-a" onclick="load('tasco')" href="#blocked-tasco"><img src="https://evoxs.xyz/tasco/tasco-app.png" class="disabledapp"></img></a>`
          document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a id="dc-a" onclick="shake_me('dc-a');notice('Client is trying to connect. Please stand by.')" href="#blocked-dc"><img src="https://evoxs.xyz/t50-gateway-alpha/srv-offline.gif" class="app"></img></a>`

          $("#apps").fadeIn("slow")
          $("#navigator").fadeIn("slow")
          $("#settings").fadeIn("slow")
          document.getElementById("usr-name").innerHTML = localStorage.getItem("t50-username")
          document.getElementById("usr-email").innerHTML = localStorage.getItem("t50-email")
          loadPFPget(localStorage.getItem("t50-username"))
            .then(image => {
              console.log("Got LOcal image")
              document.getElementById("usr-img").src = image
              document.getElementById("profile-pfp").src = image
              // You can use the image here
            })
            .catch(error => {
              document.getElementById("usr-img").src = "SVKl.gif"
              document.getElementById("profile-pfp").src = "SVKl.gif"
              console.error("Error loading image:", error);
            });

          sessionStorage.setItem("block_interactions", true)
          $("#logout_icon").fadeOut("fast")
          document.getElementById("restart_icon").style.right = "55px"

        })





        console.error('Fetch error:', error);
      });
    if (localStorage.getItem("remove-autolg") === "true") {
      localStorage.removeItem("remove-autolg")
      localStorage.removeItem("t50-autologin")
    }
    return;
  } else if (autologin === "false") {

    $("#stuck").fadeOut("fast")
    document.getElementById("use_switch").style.display = "none"
    document.getElementById("password").style.display = "none"
    document.getElementById("submit").style.display = "none"
    document.getElementById("def_text").style.display = "none"
    $("#remMeLB").fadeOut("fast")
    document.getElementById("rem_text").style.display = "block"
    document.getElementById("rem-user").style.display = "block"
    document.getElementById("usr-img-autolg").src = "reloading-pfp.gif"
    const user = localStorage.getItem("t50-username")
    const url = `https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
    fetch(url)
      .then(response => response.text())
      .then(data => {
        if (data.indexOf("base64") === -1) {
          // If it doesn't contain "base64", add the prefix
          data = "data:image/jpeg;base64," + data;
        }
        document.getElementById("usr-img-autolg").src = `${data}`;
        try {
          sessionStorage.setItem("pfp", data);
        } catch {
          console.error("Couldn't add PFP to sessionStorage")
        }

      })
      .catch(error => {
        auto_login()
        notice("Servers Are Offline!")
        sessionStorage.setItem("block_interactions", "true")
        document.getElementById("usr-img-autolg").src = "SVKl.gif"
        console.error(error);
        reject(error);

      });
    $("#loading-bar").fadeOut("slow")
    $("#EvoxMerge").fadeIn("fast")
    $("#container").fadeIn("slow", function () {
      $("#loading").fadeOut("slow")
      $("#loading-div-text").fadeOut("fast")
      $("#loading-text").fadeOut("slow")
    })
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
                  fetch("https://data.evoxs.xyz/accounts")
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
                        $("#EvoxMerge").fadeIn("fast")
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
                      custombg()
                      fadeElement("nosignal", 10); // You can adjust the speed here (lower value for faster fading)
                      $("#stuck").fadeOut("fast")
                      $("#loading-bar").fadeOut("fast")

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
                        document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.<br>Since you haven't logged in yet, please wait until the servers are back online.`
                      } else {
                        $("#vox").fadeIn("fast")
                        $("#profile").fadeIn("fast")
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
  fetch(`https://data.evoxs.xyz/authip?method=add&email=${email}&username=${username}&password=${password}&code=${code}&ip=${localStorage.getItem("IPV4")}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Complete") {
        var wind = new URL(window.location.href);
        var ext = wind.searchParams.get("id");
        if (ext) {
          fetch(`https://data.evoxs.xyz/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              if (data === "Complete") {
                //window.close()
                window.location.href = "ext-ready.html"
              }
              return;

            }).catch(error => {
              console.error('Fetch error:', error);
            });
          //send to dc that id matches to acc email
        }
        $("#2fa").fadeOut("slow")
        console.log("All Done")
        if (sessionStorage.getItem("clearafter")) {
          localStorage.clear()
        }

        localStorage.setItem("t50pswd", `${btoa(password)}`)
        sessionStorage.removeItem("ACCOUNT_DATA")
        sessionStorage.setItem("2FA_READY", "true")
        localStorage.setItem("t50-email", email)
        if (!sessionStorage.getItem("autolg_off")) {
          localStorage.setItem("t50-autologin", true)
        } else {
          localStorage.setItem("t50-autologin", false)
        }
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
        if (!sessionStorage.getItem("autolg_off")) {
          localStorage.setItem("t50-autologin", true)
        } else {
          localStorage.setItem("t50-autologin", false)
        }
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
  try {
    login_ok.play()
  } catch {
    //no problem
  }

  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  if (email === "" || password === "") {
    return;
  }
  console.log(email, "********")
  if (sessionStorage.getItem("block_interactions") === "true") {
    //notice("Servers Are Offline!")
    //return;
    if (password === atob(localStorage.getItem("t50pswd"))) {
      $("#EvoxMerge").fadeOut("fast")
      console.log("Welcome Abroad")
      //localStorage.setItem("2fa_status", "On")
      //localStorage.setItem("t50pswd", `${btoa(password)}`)
      //$("#container").fadeOut("fast")

      docready()
      $("#profile").fadeIn("slow")
      $("#vox").fadeIn("slow")
      $("#container").fadeOut("fast")
      localStorage.setItem("t50-email", email)
      localStorage.setItem("t50-autologin", true)
      sessionStorage.setItem("loaded", true)
      sessionStorage.setItem("loggedin", email)
      sessionStorage.setItem("loggedinpswd", btoa(password))
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
        document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.<br>Since you haven't logged in yet, please wait until the servers are back online.`
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
    } else {
      fadeError("2")
      console.log("Wrong Email/Password")
    }
  }
  const url = `https://data.evoxs.xyz/accounts?email=${email}&password=${password}&ip=${localStorage.getItem("IPV4")}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {

      var wind = new URL(window.location.href);
      var ext = wind.searchParams.get("id");
      console.log(data);
      if (data.includes("Do 2FA")) {
        if (data.includes("Email")) {
          var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

          // Extract email using match() method
          email = data.match(emailRegex);
          console.log("Ext Email:", email)
        }
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
        $("#EvoxMerge").fadeOut("fast")
        $("#container").fadeOut("slow")
        $("#2fa").fadeIn("slow")
        return;
      }
      if (data.includes("Credentials Correct")) {
        if (data.includes("Email")) {
          var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

          // Extract email using match() method
          email = data.match(emailRegex);
          console.log("Ext Email:", email)
        }
        if (sessionStorage.getItem("clearafter")) {
          localStorage.clear()
        }

        if (ext) {
          fetch(`https://data.evoxs.xyz/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              if (data === "Complete") {
                //window.close()
                window.location.href = "ext-ready.html"
              }
              return;

            }).catch(error => {
              console.error('Fetch error:', error);
            });
          //send to dc that id matches to acc email
        }
        console.log("Welcome Abroad")
        localStorage.setItem("2fa_status", "On")
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        const credentialsString = data;
        const match = credentialsString.match(/Username:(\w+)/);
        const username = match && match[1];
        localStorage.setItem("t50-email", email)
        if (!sessionStorage.getItem("autolg_off")) {
          localStorage.setItem("t50-autologin", true)
        } else {
          localStorage.setItem("t50-autologin", false)
        }
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
      } else if (data === "Disabled") {

        alert("Your account has been disabled by Evox. Please contact admins.")
        shake_me("email")
        fadeError("1")
        document.getElementById("email").value = ""
        document.getElementById("password").value = ""
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
  //$("#loading-bar").fadeIn("slow")
  fetch("https://data.evoxs.xyz/cron")
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
        //$("#loading-bar").fadeOut("slow")
      }
    }).catch(error => {
      //$("#loading-bar").fadeOut("slow")
      reconnect()
    })
}

function ext_relogin() {
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
                  fetch("https://data.evoxs.xyz/accounts")
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
                        $("#EvoxMerge").fadeIn("fast")
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
                        document.getElementById("loading-apps-text").innerHTML = `You cannot login at the moment.<br>Since you haven't logged in yet, please wait until the servers are back online.`
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

function merge() {
  merge_sound.play()
  document.getElementById("container").style.filter = "blur(10px)"
  document.getElementById("evox_merge").classList.add("active")
}

function return_login() {
  document.getElementById("container").style.filter = ""
  document.getElementById("evox_merge").classList.remove("active")
}

function mergenow() {
  localStorage.clear()
  sessionStorage.clear()
  window.location.href = "https://team50.sytes.net/?halt=true"
}

function deleteLocal() {
  localStorage.clear()
  sessionStorage.clear()
  var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  var request = indexedDB.open('EvoxSocial');
  request.onsuccess = function (event) {
    var db = event.target.result;
    db.close();
    var deleteRequest = indexedDB.deleteDatabase('EvoxSocial');
    deleteRequest.onsuccess = function () {
      console.log("Database deleted successfully");
    };
    deleteRequest.onerror = function () {
      console.error("Error deleting database");
    };
  };

  request.onerror = function (event) {
    console.error("Error opening database:", event.target.errorCode);
  };
  setTimeout(function () {
    window.location.reload()
  }, 1500)
}

function lockMe() {
  try {
    custombg()
  } catch {
    let inter = setInterval(function () {
      try {
        custombg()
        clearInterval(inter)
      } catch (error) {
        console.log("CustomBG Failed. Retrying", error)
      }
    }, 100)
  }
  const url = 'https://data.evoxs.xyz'; // Replace with your API URL

  const startTime = performance.now();

  fetch(url)
    .then(response => {
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      var integer = parseInt(elapsedTime);
      console.log('Time taken to fetch ~', integer, 'milliseconds');
      if (integer < 500) {
        document.getElementById("signalInd").src = "./internal/perfect.svg"
      } else if (integer < 900) {
        document.getElementById("signalInd").src = "./internal/strong.svg"
      } else {
        document.getElementById("signalInd").src = "./internal/fair.svg"
      }
      return response.text();
    })
    .then(data => {

      // Handle the fetched data
      console.log(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  //tips()
  loadPFPget(localStorage.getItem("t50-username")).then((exist) => {
    document.getElementById("userPfpLock").src = exist
  })
  $("#stuck").fadeOut("fast")
  $("#gateway").fadeOut("fast", function () {
    $("#lockscreen").fadeIn("fast")
    $("#dots").fadeOut()
    $("#profile").fadeOut()
    //document.getElementById("profile").style.opacity = '0'
    $("#vox").fadeOut()
    $("#navigator").fadeOut()
  })

  fetch(`https://data.evoxs.xyz/notifications?process=get&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log("Fetching Notifications")
      if (data === `{"notifications":[]}` || data === "No notifications!") {
        console.log("No Notifications")
        tips()
        sessionStorage.setItem("lockNotif", "stop")
        //Do nothing
      } else {

        const notifications = JSON.parse(data)

        const preLatest = notifications.notifications;

        // Initialize variables to hold the maximum and second maximum id and corresponding notifications
        let maxId = -Infinity;
        let secondMaxId = -Infinity;
        let maxNotification = null;
        let secondMaxNotification = null;

        // Iterate over notifications array
        preLatest.forEach(notification => {
          // Parse id to integer
          const id = parseInt(notification.id);
          // Check if current id is greater than current maximum id
          if (id > maxId) {
            // Update second maximum id and corresponding notification
            secondMaxId = maxId;
            secondMaxNotification = maxNotification;
            // Update maximum id and corresponding notification
            maxId = id;
            maxNotification = notification;
          } else if (id > secondMaxId) {
            // Update second maximum id and corresponding notification
            secondMaxId = id;
            secondMaxNotification = notification;
          }
        });
        //const numNotifications = notifications.notifications.length;
        console.log(notifications)
        console.log("Notification with the previous largest id:");
        console.log(secondMaxNotification);


        let maxId2 = -Infinity;
        let maxNotification2 = null;

        // Iterate over notifications array
        preLatest.forEach(notification => {
          // Parse id to integer
          const id = parseInt(notification.id);
          // Check if current id is greater than current maximum id
          if (id > maxId2) {
            // Update maximum id and corresponding notification
            maxId2 = id;
            maxNotification2 = notification;
          }
        });

        console.log("Notification with the highest id:");
        console.log(maxNotification2);

        let n1Icon = document.getElementById("notif1Icon")
        let n1Title = document.getElementById("n1Title")
        let n1Desc = document.getElementById("n1Desc")

        if (maxNotification2.image.includes("http")) {
          n1Icon.src = maxNotification2.image
        } else {
          loadPFPget(maxNotification2.image).then((exist) => {
            n1Icon.src = exist
          })
        }

        n1Title.innerHTML = maxNotification2.app
        n1Desc.innerHTML = maxNotification2.content


        let n2Icon = document.getElementById("notif2Icon")
        let n2Title = document.getElementById("n2Title")
        let n2Desc = document.getElementById("n2Desc")

        if (secondMaxNotification.image.includes("http")) {
          n2Icon.src = secondMaxNotification.image
        } else {
          loadPFPget(secondMaxNotification.image).then((exist) => {
            n2Icon.src = exist
          })

        }

        n2Title.innerHTML = secondMaxNotification.app
        n2Desc.innerHTML = secondMaxNotification.content



        document.getElementById('foryou').classList.remove('hidden')


      }



    })
    .catch(error => {
      console.error('Fetch error:', error);
    });


}

let initialWidth = window.innerWidth;

// Function to handle the resize event
function handleResize() {
  // Current width of the window
  const currentWidth = window.innerWidth;

  // Check if the width has changed
  if (currentWidth !== initialWidth) {
    console.log(`Width changed from ${initialWidth} to ${currentWidth}`);
    // Update the initial width
    initialWidth = currentWidth;

    // Add any additional logic you want to perform on width change
  }
}

// Add event listener for window resize
window.addEventListener('resize', handleResize);