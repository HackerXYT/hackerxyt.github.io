let srv = "https://data.evoxs.xyz"
document.startViewTransition(() => updateDOM());
let selfLoginLoad = false
function loadSelfLogin() {
  if (localStorage.getItem("t50-email")) {
    fetch(`${srv}/accounts?email=${localStorage.getItem("t50-email")}&username=${localStorage.getItem("t50-username")}&method=last_login`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        selfLoginLoad = true
        console.log(data)
        if (data === "Unknown") {
          document.getElementById("options_section_0_lastseen").innerHTML = "Never"
        } else {
          const inputDate = new Date(data);
          const currentDate = new Date();
          let final;

          const isToday = inputDate.getDate() === currentDate.getDate() &&
            inputDate.getMonth() === currentDate.getMonth() &&
            inputDate.getFullYear() === currentDate.getFullYear();

          if (isToday) {
            console.log(padWithZero(inputDate.getHours()) + ":" +
              padWithZero(inputDate.getMinutes()));
            final = "Today at " + padWithZero(inputDate.getHours()) + ":" + padWithZero(inputDate.getMinutes());
          } else {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const day = inputDate.getDate();
            const month = months[inputDate.getMonth()];
            const year = inputDate.getFullYear();
            console.log(month + " " + day + " " + year);
            final = month + " " + day + " " + year
          }
          document.getElementById("options_section_0_lastseen").innerHTML = final
        }


      }).catch(error => {
        console.error(error)
      })
  } else {
    selfLoginLoad = false
  }

}
if (selfLoginLoad === false) {
  loadSelfLogin()
}
if (localStorage.getItem("currentSrv")) {
  srv = localStorage.getItem("currentSrv")
} else {
  localStorage.setItem("currentSrv", "https://data.evoxs.xyz")
  srv = "https://data.evoxs.xyz"
}


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
  return;

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
  fetch(`${srv}/accounts?method=cryptox-status&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
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
function preloadHubDetails() {
  fetch(`${srv}/getOnlineUsers`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(onlineUsers => {
      console.log("<--- Online Users! --->")
      console.log(onlineUsers)
      console.log(onlineUsers.length)
      console.log('NO1:', onlineUsers[0])

      if (onlineUsers.length === 1) {
        if (onlineUsers[0] === "null" || onlineUsers[0] === localStorage.getItem("t50-username")) {
          document.getElementById("delivery-1-shipping").innerHTML = `No users are online`
          return;
        }
      }
      let friendNum = 0;





      fetch(`${srv}/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(friends => {
          onlineUsers.forEach(thisUser => {
            if (thisUser === null) {
              console.log("NULL User")
              return;
            } else {
              if (JSON.stringify(friends).includes(thisUser)) {
                //is friends
                friendNum = friendNum + 1
              } else if (friends.length === 0) {
                //no friends
                friendNum = 0
              }
              console.log(thisUser)
            }
          })
          if (friendNum === 1) {
            document.getElementById("delivery-1-shipping").innerHTML = `${friendNum} friend is online`
          } else if (friendNum === 0) {
            let usersNum;
            if (JSON.stringify(onlineUsers).includes("null")) {
              usersNum = onlineUsers.length - 2
            } else {
              usersNum = onlineUsers.length - 1
            }
            if (usersNum === 1) {
              document.getElementById("delivery-1-shipping").innerHTML = `${usersNum} user is online`
            } else if (usersNum <= 0) {
              document.getElementById("delivery-1-shipping").innerHTML = `No users online`
            } else {
              document.getElementById("delivery-1-shipping").innerHTML = `${usersNum} users are online`
            }

          } else {
            document.getElementById("delivery-1-shipping").innerHTML = `${friendNum} friends are online`
          }
        }).catch(error => {
          console.error(error);
        });


    }).catch(error => {
      console.error(error);
    });
}
let carouselaInt;
function setup() {
  $("#bggradient").fadeIn("slow")
  preloadHubDetails()

  preloadSFriends()
  fetch(`${srv}/profiles?name=${localStorage.getItem("t50-username")}&authorize=cover`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(coverIMG => {
      if (coverIMG !== "None") {
        document.getElementById("user-video-self").src = coverIMG
      }
    })
    .catch(error => {
      console.error(error);
    })

  fetch(`${srv}/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('friendsOp', data.length)
      if (data.length === 0) {
        document.getElementById("friendsCount").innerHTML = "0"
      } else {
        document.getElementById("friendsCount").innerHTML = data.length
      }

    })
    .catch(error => {
      document.getElementById("friendsCount").innerHTML = "0"
      console.error(error);
    });

  try {
    setupCrypt()
  } catch (error) {
    alert("Cryptox Operations Failed", error)
  }

  if (!localStorage.getItem("betaNotice")) {
    try {
      createLocalNotification("You are using beta!", "The Evox app is still a work in progress, so you might run into a few bugs or errors. Just keep that in mind and enjoy exploring!", null, "13000")
      setTimeout(function () {
        notice("Swipe from left to right to dismiss!")
      }, 3000)
      setTimeout(function () {
        localStorage.setItem("betaNotice", "acknowledged")
      }, 9000)
    } catch (error) {
      setTimeout(function () {
        createLocalNotification("You are using beta!", "The Evox app is still a work in progress, so you might run into a few bugs or errors. Just keep that in mind and enjoy exploring!", null, "13000")
        setTimeout(function () {
          notice("Swipe from left to right to dismiss!")
        }, 3000)
        setTimeout(function () {
          localStorage.setItem("betaNotice", "acknowledged")
        }, 9000)
      }, 5000)
    }

  }



  carouselaInt = setInterval(nextSlide, 5000); // Change image every 5 seconds
  //if (localStorage.getItem("updated_To_Epsilon") !== "ready" && localStorage.getItem("t50-username")) {
  //  window.location.href = "./update/"
  //  return;
  //}

  if (localStorage.getItem("t50-username") === "papostol") {
    try {
      $("#secureline-get").html("OPEN")
      $("#mti-get").html("OPEN")
      $("#transports-get").html("OPEN")
      $("#emails-get").html("OPEN")
      $("#dc-get").html("OPEN")
    } catch (error) {
      console.error(error)
    }

  }

  console.log("RUNNING SETUP!")
  //$("#navigator").fadeIn("fast")
  //loadGrounds()

  $("#loading-text").fadeIn("fast")
  $("#stuck").fadeIn("fast")
  try {
    custombg()
  } catch (error) {
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
    log("Evox Gateway V:Epsilon 2.0", "cyan")
    try {
      clearInterval(version)
    } catch (error) {
      console.error(error)
    }
  } catch (error) {
    version = setInterval(function () {
      log("Evox Gateway V:Epsilon 2.0", "cyan")
    }, 800)
  }


  try {
    loadusers()
  } catch (error) {
    let inter = setInterval(function () {
      try {
        loadusers()
        clearInterval(inter)
      } catch (error) {
        console.log("loadusers Failed. Retrying")
      }
    }, 100)
  }
  try {
    loadPrefs()
    console.log("Loaded Prefs")
  } catch (error) {
    let interv = setInterval(function () {
      try {
        loadPrefs()
        clearInterval(interv)
      } catch (error) {
        console.log("loadPrefs Failed. Retrying")
      }
    }, 100)
  }
  let lg_status = sessionStorage.getItem("loaded")
  fetch(`${srv}/notifications?process=get&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
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
            //var animatedButton = document.getElementById("animatedButton_notif");
            //animatedButton.classList.add("fadeInOut")
            //animatedButton.style.display = "block";
            //animatedButton.innerHTML = `<svg id="notif" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#fff" width="25px" height="25px" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet">
            //<path stroke="#fff" stroke-width="2" class="clr-i-outline--badged clr-i-outline-path-1--badged" d="M18,34.28A2.67,2.67,0,0,0,20.58,32H15.32A2.67,2.67,0,0,0,18,34.28Z"/><path class="clr-i-outline--badged clr-i-outline-path-2--badged" d="M32.51,27.83A14.4,14.4,0,0,1,30,24.9a12.63,12.63,0,0,1-1.35-4.81V15.15a10.92,10.92,0,0,0-.16-1.79,7.44,7.44,0,0,1-2.24-.84,8.89,8.89,0,0,1,.4,2.64v4.94a14.24,14.24,0,0,0,1.65,5.85,16.17,16.17,0,0,0,2.44,3H5.13a16.17,16.17,0,0,0,2.44-3,14.24,14.24,0,0,0,1.65-5.85V15.15A8.8,8.8,0,0,1,18,6.31a8.61,8.61,0,0,1,4.76,1.44A7.49,7.49,0,0,1,22.5,6c0-.21,0-.42,0-.63a10.58,10.58,0,0,0-3.32-1V3.11a1.33,1.33,0,1,0-2.67,0V4.42A10.81,10.81,0,0,0,7.21,15.15v4.94A12.63,12.63,0,0,1,5.86,24.9a14.4,14.4,0,0,1-2.47,2.93,1,1,0,0,0-.34.75v1.36a1,1,0,0,0,1,1h27.8a1,1,0,0,0,1-1V28.58A1,1,0,0,0,32.51,27.83Z"/><circle class="clr-i-outline--badged clr-i-outline-path-1--badged clr-i-badge" cx="30" cy="6" r="5"/>
            //<rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
            //</svg>`
            //setTimeout(function () {
            //  animatedButton.style.opacity = "1";
            //  animatedButton.style.transform = "translateY(0)";
            //}, 100);
            console.log("New Notifications Available")
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
  //if (!localStorage.getItem("florida_init") && !window.location.href.includes("localhost")) {
  //  fetch(`${srv}/florida?method=largest&username=${localStorage.getItem("t50-username")}`)
  //    .then(response => {
  //      if (!response.ok) {
  //        throw new Error(`HTTP error! Status: ${response.status}`);
  //      }
  //      return response.text();
  //    })
  //    .then(data => {
  //      if (data !== "Error") {;
  //        localStorage.setItem("florida_init_registered", `${localStorage.getItem("t50-username")}${data}`)
  //        localStorage.setItem("florida_init", true)
  //      } else {
  //        console.error("Got an error response for florida")
  //      }
  //
  //    })
  //    .catch(error => {
  //      console.error('Fetch error:', error);
  //    });
  //
  //}






  if (lg_status === "true") {
    let username = localStorage.getItem("t50-username")
    let email = localStorage.getItem("t50-email")
    //$("#user-text").html(username)
    const greet = greetUser()
    document.getElementById("greet").innerHTML = `${greet}, <span style="margin-bottom: 10px;" id="user-text">${username}</span>`
    try {
      log("Loading Gateway", "green")
    } catch (error) {
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
        } catch (error) {
          setTimeout(function () {
            log("Loading Gateway", "green")
          }, 950)
        }

        $("#EvoxMerge").fadeOut("fast")
        $("#container").fadeOut("fast")
        $("#loading").fadeIn("slow")
        $("#stuck").fadeOut("slow")
        fetch(`${srv}/accounts?applications=get&email=${localStorage.getItem("t50-email")}`)
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
                addElemApp("images")
                if (document.getElementById("apps").innerHTML != "") {
                  document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('images')" href="#loadapp-images"><img src="t50-img.png" class="app"></img></a>`
                } else {
                  document.getElementById("apps").innerHTML = `<a onclick="load('images')" href="#loadapp-images"><img src="t50-img.png" class="app"></img></a>`
                }
              } else {
                localStorage.setItem("images-owned", false)
                document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="getNOpen('emails', '2')" href="#loadapp-mails"><img src="mails.png" class="app"></img></a>`
                if (document.getElementById("apps").innerHTML != "") {
                  //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a class="hide" onclick="buy('images')" href="#loadapp-images-disabled"><img src="t50-img.png" class="disabledapp"></img></a>`
                } else {
                  //document.getElementById("apps").innerHTML = `<a class="hide" onclick="buy('images')" href="#loadapp-images-disabled"><img src="t50-img.png" class="disabledapp"></img></a>`
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
              addElemApp("tasco")
              document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('tasco')" href="#loadapp-tasco"><img src="https://evoxs.xyz/tasco/tasco-app.png" class="app"></img></a>`
              console.log("Enabling SecureLine")
              //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('secureline')" href="#loadapp-secureline"><img src="./secureline/sline.png" class="app"></img></a>`
              if (localStorage.getItem("t50-username") === "papostol") {
                console.log('%c' + "Enabling Transports", styles)
                $("#transports-app").fadeIn("slow")
                //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('emails')" href="#loadapp-transports"><img src="evox-logo-dark.png" class="app"></img></a>`
                //document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('dc')" href="#loadapp-dc"><img id="dc-enabled" src="evox-logo-apple.png" class="app"></img></a><a onclick="shake_me('transports-disabled');notice('T50 Transports is currently not available');load('transports')" href="#loadapp-transports"><img id="transports-disabled" src="T50Transports.png" class="disabledapp"></img></a><a onclick="moretti()" href="#loadapp-mt"><img id="mt-disabled" src="mt.jpg" class="disabledapp"></img></a>`
                addElemApp("Evox Datacenter")
                addElemApp("Home")
                addElemApp("OASA")
                addElemApp("Tasco Deluxe")
                if(localStorage.getItem("customApps")) {
                  document.getElementById("customAppsStore").style.display = ''
                  const lcVl = JSON.parse(localStorage.getItem("customApps"))
                  Object.entries(lcVl).forEach(([key, value]) => {
                    document.getElementById("customAppsList").innerHTML = `${document.getElementById("customAppsList").innerHTML}<div id="${key}-appst" href="#" class="apple-button-withicon storeApp"><img
                                style="width: auto; height: 40px; margin-right: 10px; border-radius: 7px;box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);"
                                src="${value.icon}">
                            ${value.name}
                            <span onclick="optimize('${key}', this)" id="${key}-get" class="get-button">OPTIMIZE</span>
                        </div>`
                    console.log(`Key: ${key}`);
                    console.log(`Value:`, value);
                    addElemApp(value, 'true')
                  });
                }
                document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('dc')" href="#loadapp-dc"><img id="dc-enabled" src="evox-logo-apple.png" class="app"></img></a>`
                //
              }
              $("#apps").fadeIn("slow")
              $("#loading-apps-text").fadeOut("slow", function () {
                const OLDphrases = [
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
                const phrases = [
                  ""
                ];

                const randomIndex = Math.floor(Math.random() * phrases.length);
                const randomlySelectedPhrase = phrases[randomIndex];
                document.getElementById("loading-apps-text").innerHTML = randomlySelectedPhrase
                $("#loading-apps-text").fadeIn("slow")
                if (sessionStorage.getItem("extLoaded")) {
                  document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="sessionStorage.setItem('extRun', 'back')" href="#loadapp-return"><img src="return.png" class="app"></img></a>`
                }

              })
              $("#loading").fadeOut("slow")
              try {
                uielements()
              } catch (error) {
                let inter = setInterval(function () {
                  try {
                    uielements()
                    clearInterval(inter)
                  } catch (error) {
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
              } catch (error) {
                let inter = setInterval(function () {
                  try {
                    uielements()
                    clearInterval(inter)
                  } catch (error) {
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
  //document.getElementById("loading-text").innerHTML = `Storage initialized!<br>Now verifying account...`
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
    const url = `${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${myinfo['t50-username']}`;
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



    const url = `${srv}/accounts?email=${loggedin}&password=${pswd}&autologin=true&ip=${localStorage.getItem("IPV4")}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        if (data.includes("Credentials Correct")) {
          //document.getElementById("loading-text").innerHTML = `Account Verified!`
          $("#loading-bar").fadeOut("slow")
          console.log('%c' + "Account Verified!", `color: green; font-size: 16px; font-weight: bold;`)

          if (ext) {
            fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${loggedin}&password=${pswd}`)
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
          fetch(`${srv}/authip?method=Eget&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              $("#loading").fadeOut("slow")
              if (ext) {
                fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${loggedin}&password=${pswd}`)
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
                  //lockMe()
                  setup()
                } else {
                  //$("#loading-text").fadeOut("fast")
                  //lockMe()
                  setup()
                  sessionStorage.setItem("unlocked", "true")
                }

                //setup() is old
              } else if (data === "Unknown IP") {
                fetch(`${srv}/authip?method=Eforceadd&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
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
                      setup()
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
                  document.getElementById("loading-text").classList.remove("loading-text-default")
                  document.getElementById("loading-text").classList.add("default-parent")
                  document.getElementById("loading-text").innerHTML = `Loading..`
                  fetch(`${srv}/accounts?method=getUserbyEmail&email=${localStorage.getItem("t50-email")}`)
                    .then(response => {
                      if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                      }
                      return response.text();
                    })
                    .then(data => {
                      if (data === "Account Not Found") {
                        document.getElementById("loading-text").innerHTML = `<p>Something messed up your client.<br>Your credentials don't match your account<br>Click below to re-login</p><button class="transparent-button" onclick='logoff()'>Log out</button>`
                        $("#loading-text").fadeIn("fast", function () {
                          $("#stuck").fadeOut("fast")
                        })
                      } else {
                        document.getElementById("loading-text").innerHTML = `<p>Something messed up your client.<br>Your local username doesn't match your account<br><br>Local Username: ${localStorage.getItem("t50-username")} <br>Correct Username: ${data}</p><button style="border: 2px solid #439723;" class="transparent-button" onclick='localStorage.setItem("t50-username", "${data}");restart()'>Fix Automatically</button><br><button class="transparent-button" onclick='logoff()'>Log out</button>`
                        $("#loading-text").fadeIn("fast", function () {
                          $("#stuck").fadeOut("fast")
                        })
                      }
                    }).catch(error => {
                      console.error('Fetch error:', error);
                      document.getElementById("loading-text").innerHTML = `<p>Something messed up your client and server.<br>Click below to re-login</p><button class="transparent-button" onclick='logoff()'>Log out</button><br><button class="transparent-button" onclick='restart()'>Reload</button>`
                      $("#loading-text").fadeIn("fast", function () {
                        $("#stuck").fadeOut("fast")
                      })
                    });

                }
              }
              //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
            }).catch(error => {
              console.error('Fetch error:', error);
            });
          //FloridaRun()
        } else if (data.includes("IP Not Verified")) {
          $("#loading").fadeOut("slow")
          console.log('%c' + "Existing Account Verified! IP Not Mapped", `color: orange; font-size: 16px; font-weight: bold;`)
          fetch(`${srv}/authip?method=Eforceadd&email=${loggedin}&username=${username}&password=${pswd}&ip=${localStorage.getItem("IPV4")}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(data => {
              if (data === "Complete") {
                $("#loading-bar").fadeOut("slow")
                //lockMe()
                sessionStorage.setItem("unlocked", "true")
                setup() //is old
              } else if (data === "Exists") {
                sessionStorage.setItem("unlocked", "true")
                setup() //is old
              } else {
                createLocalNotification("Error", `Authorization IP Ops Failed<br>Data: ${data}`, "bogon.svg")
              }
            }).catch(error => {
              console.error('Fetch error:', error);
            });
          //FloridaRun()
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
        //$("#vox").fadeIn("fast")
        //$("#profile").fadeIn("fast")
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
          document.getElementById("navbar").classList.add("active")
          //if (localStorage.getItem("topNav") !== "disabled") {
          //  document.getElementById("apple-style").classList.add("active")
          //}

          try {
            critical.play()
          } catch (error) {
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
    const url = `${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
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
        } catch (error) {
          console.error("Couldn't add PFP to sessionStorage")
        }

      })
      .catch(error => {
        auto_login()
        createLocalNotification("Gateway", "Servers Are Offline!")
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
        //document.getElementById("loading-text").innerHTML = `Connecting<span id="dots"></span>`
        fetch(`${srv}/accounts`)
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
              $("#bggradient").fadeIn("slow")

              $("#container").fadeIn("slow", function () {
                document.getElementById("epsilonLogoLogin").style.top = "18%"
                document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
                document.getElementById("headerVox").classList.add('active')
                setTimeout(function () {
                  document.getElementById("optionsVox").classList.add('active')
                }, 100)
                console.log("Hit. [DEBUG]")
                //setTimeout(function() {
                //  $("#bggradient").fadeIn("slow")
                //}, 3000)
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
              //$("#vox").fadeIn("fast")
              //$("#profile").fadeIn("fast")
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
  fetch(`${srv}/authip?method=Eadd&email=${email}&username=${username}&password=${password}&code=${code}&ip=${localStorage.getItem("IPV4")}`)
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
          fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
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
  } catch (error) {
    console.error("Sound can't play", error)
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
      //$("#profile").fadeIn("slow")
      //$("#vox").fadeIn("slow")
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
  const url = `${srv}/accounts?email=${email}&password=${password}&ip=${localStorage.getItem("IPV4")}`;

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
          fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
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
        //FloridaRun()
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
  fetch(`${srv}/cron`)
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
      setTimeout(function () {
        reconnect()
      }, 1000)

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
                  fetch(`${srv}/accounts`)
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
  $("#loading-text").fadeOut("slow")
  try {
    custombg()
  } catch (error) {
    let inter = setInterval(function () {
      try {
        custombg()
        clearInterval(inter)
      } catch (error) {
        console.log("CustomBG Failed. Retrying", error)
      }
    }, 100)
  }
  const url = srv // Replace with your API URL

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
        document.getElementById("lockScreen-signal").style.backgroundColor = "transparent"
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

  fetch(`${srv}/notifications?process=get&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
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
        console.log("Second Max:", secondMaxNotification)
        if (secondMaxNotification) {
          if (secondMaxNotification.image.includes("http")) {
            n2Icon.src = secondMaxNotification.image
          } else {
            loadPFPget(secondMaxNotification.image).then((exist) => {
              n2Icon.src = exist
            })

          }
        } else {
          document.getElementById("notification2").style.display = "none"
          document.getElementById('foryou').style.height = "150px"
          setTimeout(function () {
            document.getElementById('foryou').classList.remove('hidden')
          }, 100)


          return;
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

let currentState;

const swipeAreaChats = document.getElementById('myAcc'); //not chats

let touchstartXChats = 0;
let touchendXChats = 0;

function handleGestureChats() {
  const distance = touchendXChats - touchstartXChats;

  if (distance > 40) { // Left-to-right swipe
    console.log('Swiped from left to right');
    // Run your desired function for left-to-right swipe here
    if (currentState === "more_options") {
      currentState = "customize";
      $("#profile-options").fadeOut("fast", function () {
        $("#profile-preview").fadeIn("fast");
      });
    } else if (currentState === "customize") {
      currentState = "";
      $("#profile-preview").fadeOut("fast", function () {
        $("#main_settings").fadeIn("fast");
      });
    }

    return;
    let secureline = document.getElementById("secureline");
    if (secureline.classList.contains("slideL-R")) {
      secureline.classList.remove("slideL-R");
      secureline.classList.add("slideR-L");
    } else {
      secureline.classList.remove("slideR-L");
      secureline.classList.add("slideL-R");
    }
    secureline.classList.remove("active");

    document.getElementById("gateway").classList.add("active");
    setActive("Home");
    currScreen = "Home";
    //alert('Swiped from left to right');
  } else if (distance < -50) { // Right-to-left swipe

    return;
    let secureline = document.getElementById("secureline");
    let notifications = document.getElementById("notifications");
    console.log('Swiped from right to left');
    secureline.classList.remove("active");
    notifications.classList.remove("slideL-R");
    notifications.classList.add("slideR-L");
    notifications.classList.add("active");
    notifications.style.opacity = "1";
    show_notif();
    setActive("Notifications");
    currScreen = "Notifications";
  }
}

swipeAreaChats.addEventListener('touchstart', (event) => {
  touchstartXChats = event.changedTouches[0].screenX;
});

swipeAreaChats.addEventListener('touchend', (event) => {
  touchendXChats = event.changedTouches[0].screenX;
  handleGestureChats();
});





const swipeAreaCarousela = document.getElementById('carouselHandler');

let touchstartXCarousela = 0;
let touchendXCarousela = 0;

function handleGestureCarousela() {
  const distance = touchendXCarousela - touchstartXCarousela;

  if (distance > 50) { // Left-to-right swipe
    console.log('Swiped from left to right');
    prevSlide()
  } else if (distance < -50) { // Right-to-left swipe
    console.log('Swiped from right to left');
    nextSlide()

  }
}

swipeAreaCarousela.addEventListener('touchstart', (event) => {
  touchstartXCarousela = event.changedTouches[0].screenX;
});

swipeAreaCarousela.addEventListener('touchend', (event) => {
  touchendXCarousela = event.changedTouches[0].screenX;
  handleGestureCarousela();
});

const swipeAreaNotifications = document.getElementById('notifications');

let touchstartXNotifications = 0;
let touchendXNotifications = 0;

function handleGestureNotifications() {
  return;
  const distance = touchendXNotifications - touchstartXNotifications;

  if (distance > 50) { // Left-to-right swipe
    console.log('Swiped from left to right');
    // Run your desired function for left-to-right swipe here
    let secureline = document.getElementById("secureline")
    let notifications = document.getElementById("notifications")
    notifications.classList.remove("active")
    secureline.classList.remove("slideR-L")
    //notifications.classList.add("vox")
    secureline.classList.remove("secureline")
    //secureline.classList.remove("slideL-R")
    secureline.classList.add("slideR-L")
    setTimeout(function () {

      secureline.classList.add("active")
    }, 250)
    setActive("Chats")
    currScreen = "Chats"
  } else if (distance < -50) { // Right-to-left swipe
    console.log('Swiped from right to left');
    // Run your desired function for right-to-left swipe here
    $("#nav-Notifications-text").fadeOut("fast")
    setActive("Profile")
    currScreen = "Profile"
    let notifications = document.getElementById("notifications")
    notifications.classList.remove("slideL-R");
    notifications.classList.add("slideR-L");
    document.getElementById("notifications").classList.remove("active")
    document.getElementById("myAcc").classList.add("active")
    show_account()
  }
}

swipeAreaNotifications.addEventListener('touchstart', (event) => {
  touchstartXNotifications = event.changedTouches[0].screenX;
});

swipeAreaNotifications.addEventListener('touchend', (event) => {
  touchendXNotifications = event.changedTouches[0].screenX;
  handleGestureNotifications();
});

const swipeAreaProfile = document.getElementById('lnotif');

let touchstartXProfile = 0;
let touchendXProfile = 0;

function handleGestureProfile() {
  const distance = touchendXProfile - touchstartXProfile;

  if (distance > 50) { // Left-to-right swipe
    console.log('Swiped from left to right');
    let ele = document.getElementById("lnotif")
    ele.classList.remove("active")
    clearTimeout(lnele)
    isLNactive = false
    if (ele.innerHTML.includes("The Evox app is still a work in progress, so you might run into a few bugs or errors. Just keep that in mind and enjoy exploring!")) {
      console.log("This is the beta notice one")
      localStorage.setItem("betaNotice", "acknowledged")
    }



    return;
    // Run your desired function for left-to-right swipe here
    setActive("Notifications")
    currScreen = "Notifications"
    let notifications = document.getElementById("notifications")
    let secureline = document.getElementById("secureline")
    notifications.classList.remove("slideR-L");
    notifications.classList.add("slideL-R");
    document.getElementById("myAcc").classList.remove("active")
    notifications.classList.add("active");
    notifications.style.opacity = "1"
    show_notif()
    setTimeout(function () {
      notifications.classList.remove("slideR-L");
      notifications.classList.add("slideL-R");
    }, 800)

  } else if (distance < -50) { // Right-to-left swipe
    console.log('Swiped from right to left');
    // Run your desired function for right-to-left swipe here
    shake_me("lnotif")
  }
}

swipeAreaProfile.addEventListener('touchstart', (event) => {
  touchstartXProfile = event.changedTouches[0].screenX;
});

swipeAreaProfile.addEventListener('touchend', (event) => {
  touchendXProfile = event.changedTouches[0].screenX;
  handleGestureProfile();
});

//let totalSeconds = 0;

// Function to update the counter display
function updateCounterDisplay() {
  let totalSeconds = Number(localStorage.getItem("app-Evox-track")) + Math.floor(totalTimeSpent / 1000)
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const formattedDays = days < 10 ? `0${days}` : days;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  if (days > 0) {
    document.getElementById('timeUsed').innerText = `${formattedDays}:${formattedHours}:${formattedMinutes}`;
  } else {
    document.getElementById('timeUsed').innerText = `${formattedMinutes}:${formattedSeconds}`;
  }
}

// Function to update the time variables and counter display
function updateCounter() {
  //totalSeconds++;
  updateCounterDisplay();
}

// Function to save the time to localStorage
function saveTime() {
  localStorage.setItem('totalSeconds', totalSeconds);
}

// Retrieve the time from localStorage if it exists
window.onload = function () {
  //if (localStorage.getItem('totalSeconds') !== null) {
  //  totalSeconds = parseInt(localStorage.getItem('totalSeconds'), 10);
  //}
  updateCounterDisplay();
}
setInterval(updateCounter, 1000);
//setInterval(saveTime, 2000);
function howMuchPlay(app) {
  const localVal = localStorage.getItem(`${app}_timeUsed`);
  if (localVal) {
    const localValJson = JSON.parse(localVal);
    const timeInSeconds = localValJson.playtime;

    // Convert the time from seconds to minutes and seconds
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    // Format the minutes and seconds to always be two digits
    const formatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return formatted;
  } else {
    return '00:00';
  }
}
let attachedApps = []
function addElemApp(app, custom) {
  if(custom === "true" && app) {
    let prevHTML = document.getElementById("app-cont").innerHTML;
    document.getElementById("app-cont").innerHTML = `${prevHTML}<button onclick="getNOpenNX('${app.name.split(' ')[0]}', null , 'epsilon', 'customApp', '${app.name}')" id="${app.name.split(' ')[0]}-nx" class="evox-app">
    <img src="${app.icon}" alt="Ext App Icon">
    <div class="info">
      <div class="title">${app.name}</div>
      <div id='timeUsed-${app.name.split(' ')[0]}' class="time"><svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" width="13px" height="13px" viewBox="0 0 24 24" fill="none">
        <path d="M12 7V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg><vo id='playTime-${app.name}'>${howMuchPlay(app.name)}</vo></div>
    </div>
    <div id="tag-${app.name.split(' ')[0]}" class="tag ${app.name.split(' ')[0]}">${getAppType(app.type)}</div>
    <span style='display: none' class="get-button-nx">OPEN</span>
  </button>`
    attachedApps.push(app.name)
    return;
  }
  if (app === "images" || app === "tasco" || app === "Evox Datacenter" || app === "Home" || app === "OASA") {
    let prevHTML = document.getElementById("app-cont").innerHTML;
    document.getElementById("app-cont").innerHTML = `${prevHTML}<button onclick="getNOpenNX('${app.split(' ')[0]}', null , 'epsilon')" id="${app.split(' ')[0]}-nx" class="evox-app">
    <img src="./appicons/${app}.png" alt="App Icon">
    <div class="info">
      <div class="title">${app}</div>
      <div id='timeUsed-${app.split(' ')[0]}' class="time"><svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" width="13px" height="13px" viewBox="0 0 24 24" fill="none">
        <path d="M12 7V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg><vo id='playTime-${app}'>${howMuchPlay(app)}</vo></div>
    </div>
    <div id="tag-${app.split(' ')[0]}" class="tag ${app.split(' ')[0]}">${getAppType(app)}</div>
    <span style='display: none' class="get-button-nx">OPEN</span>
  </button>`
    attachedApps.push(app)
  } else if (app === "Tasco Deluxe") {
    let prevHTML = document.getElementById("app-cont").innerHTML;
    document.getElementById("app-cont").innerHTML = `${prevHTML}<button onclick="getNOpenNX('deluxe', null , 'epsilon')" id="deluxe-nx" class="evox-app">
    <img src="../tascoNotes/tasco.png" alt="App Icon">
    <div class="info">
      <div class="title">${app}</div>
      <div id='timeUsed-deluxe' class="time"><svg style="margin-right: 5px;" xmlns="http://www.w3.org/2000/svg" width="13px" height="13px" viewBox="0 0 24 24" fill="none">
        <path d="M12 7V12L10.5 14.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg><vo id='playTime-${app}'>${howMuchPlay(app)}</vo></div>
    </div>
    <div id="tag-deluxe" class="tag tasco">${getAppType('tasco')}</div>
    <span style='display: none' class="get-button-nx">OPEN</span>
  </button>`
    attachedApps.push(app)
  } else {
    return "Denied."
  }

}

function getAppType(app) {
  if (app === "tasco") {
    return 'Productivity'
  } else if (app === "images") {
    return 'Gallery'
  } else if (app === "Evox Datacenter") {
    return 'Management'
  } else if (app === "Home") {
    return 'Security'
  } else if (app === "Epsilon") {
    return 'Epsilon'
  } else {
    return 'External'
  }
}

let currentIndex = 0;
const slides = document.querySelectorAll('.carousel img');
const dotsca = document.querySelectorAll('.carousel-dot');
const totalSlides = 5;

function moveToSlide(index) {
  const carouselImages = document.querySelector('.carousel-images');
  carouselImages.style.transform = `translateX(-${index * 100}%)`;
  currentIndex = index;
  updateDots();
}

function updateDots() {
  dotsca.forEach(dot => dot.classList.remove('active'));
  dotsca[currentIndex].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  moveToSlide(currentIndex);
  restartCarouselCount()
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex = (currentIndex - 1) % totalSlides;
    moveToSlide(currentIndex);
    restartCarouselCount()
  }

}

function restartCarouselCount() {
  clearInterval(carouselaInt)
  carouselaInt = setInterval(nextSlide, 5000);
}

function beginLogin() {

  document.getElementById("epsilonLogoLogin").style.top = "200px"
  document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"

  document.getElementById("headerVox").classList.remove('active')
  document.getElementById("optionsVox").classList.remove('active')
  setTimeout(function () {
    document.getElementById("formLogin").style.display = 'flex'
    setTimeout(function () {
      document.getElementById("formLogin").classList.add('active')
      //document.getElementById("formLogin").style.paddingBottom = "100px"
    }, 50)
  }, 920)


  //setTimeout(function() {
  //  $("#createVox").fadeOut("fast")
  //  $("#loginVox").fadeOut("fast")
  //  $("#trademarkVox").fadeOut("fast")
  //}, 1000)

  //setTimeout(function () {
  //  document.getElementById("optionsVox").classList.add('active')
  //}, 100)


}

function returnToLoginMenu() {
  document.getElementById("formLogin").classList.remove('active')
  setTimeout(function () {
    document.getElementById("formLogin").style.display = 'none'
    setTimeout(function () {
      document.getElementById("epsilonLogoLogin").style.top = "18%"
      document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
      document.getElementById("headerVox").classList.add('active')
      setTimeout(function () {
        document.getElementById("optionsVox").classList.add('active')
      }, 100)

    }, 50)
  }, 920)
}

const voxPasswordInput = document.getElementById('voxPassword');
const voxEmailInput = document.getElementById('voxEmail');
const eyeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M9.60997 9.60714C8.05503 10.4549 7 12.1043 7 14C7 16.7614 9.23858 19 12 19C13.8966 19 15.5466 17.944 16.3941 16.3878M21 14C21 9.02944 16.9706 5 12 5C11.5582 5 11.1238 5.03184 10.699 5.09334M3 14C3 11.0069 4.46104 8.35513 6.70883 6.71886M3 3L21 21" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
const lockIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                            viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                                stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>`
const eyeShown = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`
let iconState = 'default'
// Add an event listener for the 'input' event
voxPasswordInput.addEventListener('input', function (event) {
  //console.log('Typed value:', event.target.value);
  if (event.target.value !== "") {
    if (iconState === 'eye') {
      return;
    }
    if (isPswdShown === true) {
      iconState = 'eye'
      document.getElementById("eyeIcon").style.opacity = "0"
      setTimeout(function () {
        document.getElementById("eyeIcon").innerHTML = eyeShown
        document.getElementById("eyeIcon").style.opacity = "1"
      }, 400)
    } else {
      iconState = 'eye'
      document.getElementById("eyeIcon").style.opacity = "0"
      setTimeout(function () {
        document.getElementById("eyeIcon").innerHTML = eyeIcon
        document.getElementById("eyeIcon").style.opacity = "1"
      }, 400)
    }

  } else {
    iconState = 'default'
    document.getElementById("eyeIcon").style.opacity = "0"
    setTimeout(function () {
      document.getElementById("eyeIcon").innerHTML = lockIcon
      document.getElementById("eyeIcon").style.opacity = "1"
    }, 400)
  }
});

voxEmailInput.addEventListener('input', function (event) {
  //console.log('Typed value:', event.target.value);
  if (event.target.value === "") {
    document.getElementById("welcomeText").style.opacity = "0"
    setTimeout(function () {
      document.getElementById("welcomeText").innerHTML = `Login`
      document.getElementById("welcomeText").style.opacity = "1"
    }, 400)
  }
});

let isPswdShown = false

function showPasswd() {
  if (iconState === 'eye' && !isPswdShown) {
    document.getElementById("eyeIcon").style.opacity = "0"
    setTimeout(function () {
      document.getElementById("eyeIcon").innerHTML = eyeShown
      document.getElementById("eyeIcon").style.opacity = "1"
    }, 400)
    voxPasswordInput.type = 'text'
    isPswdShown = true
  } else if (isPswdShown) {
    document.getElementById("eyeIcon").style.opacity = "0"
    setTimeout(function () {
      document.getElementById("eyeIcon").innerHTML = eyeIcon
      document.getElementById("eyeIcon").style.opacity = "1"
    }, 400)
    voxPasswordInput.type = 'password'
    isPswdShown = false
  }
}

voxEmailInput.addEventListener('blur', function () {
  console.log('Input has lost focus.');
  document.getElementById("emailIcon").style.opacity = "0"
  setTimeout(function () {
    document.getElementById("emailIcon").innerHTML = `
		<svg version="1.1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
			y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
			<path fill="#fff"
				d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
				<animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
					to="360 25 25" dur="0.6s" repeatCount="indefinite" />
			</path>
		</svg>
	`
    document.getElementById("emailIcon").style.opacity = "1"
    fetch(`${srv}/accounts?method=getUserbyEmail&email=${document.getElementById('voxEmail').value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(matchedUser => {
        if (matchedUser !== "Account Not Found" && !matchedUser.includes("Something Went Wrong")) {
          document.getElementById("emailIcon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                            viewBox="0 0 24 24" fill="none">
                            <g id="style=stroke">
                                <g>
                                    <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
                                        fill="#fff" />
                                    <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
                                        fill="#fff" />
                                </g>
                            </g>
                        </svg>`
          document.getElementById("welcomeText").style.opacity = "0"
          setTimeout(function () {
            document.getElementById("welcomeText").innerHTML = `Hello, ${matchedUser}`
            document.getElementById("welcomeText").style.opacity = "1"
          }, 400)
        } else {
          if (document.getElementById("welcomeText").innerHTML.includes('Hello')) {
            document.getElementById("welcomeText").style.opacity = "0"
            setTimeout(function () {
              document.getElementById("welcomeText").innerHTML = `Login`
              document.getElementById("welcomeText").style.opacity = "1"
            }, 400)
          }
          document.getElementById("emailIcon").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                            viewBox="0 0 24 24" fill="none">
                            <g id="style=stroke">
                                <g>
                                    <path id="vector (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M3.88534 5.2371C3.20538 5.86848 2.75 6.89295 2.75 8.5V15.5C2.75 17.107 3.20538 18.1315 3.88534 18.7629C4.57535 19.4036 5.61497 19.75 7 19.75H17C18.385 19.75 19.4246 19.4036 20.1147 18.7629C20.7946 18.1315 21.25 17.107 21.25 15.5V8.5C21.25 6.89295 20.7946 5.86848 20.1147 5.2371C19.4246 4.59637 18.385 4.25 17 4.25H7C5.61497 4.25 4.57535 4.59637 3.88534 5.2371ZM2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z"
                                        fill="#fff" />
                                    <path id="vector (Stroke)_2" fill-rule="evenodd" clip-rule="evenodd"
                                        d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z"
                                        fill="#fff" />
                                </g>
                            </g>
                        </svg>`
        }

      }).catch(error => {
        console.error(error);
      });
  }, 400)

});

function startLogin() {
  document.getElementById("beginLoginBtn").innerHTML = `<svg version="1.1" width="25px" height="25px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
			y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
			<path fill="#fff"
				d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
				<animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
					to="360 25 25" dur="0.6s" repeatCount="indefinite" />
			</path>
		</svg>`
  const email = document.getElementById('voxEmail').value
  const password = document.getElementById('voxPassword').value
  if (email !== '' && password !== '') {
    console.log("Front Accepted")

    const url = `${srv}/accounts?email=${email}&password=${password}&ip=${localStorage.getItem("IPV4")}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        document.getElementById("beginLoginBtn").innerHTML = `Login`

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

          document.getElementById("formLogin").classList.remove('active')
          setTimeout(function () {
            document.getElementById("formLogin").style.display = 'none'
            document.getElementById("form2FA").style.display = 'flex'
            setTimeout(function () {
              document.getElementById("epsilonLogoLogin").style.top = "50%"
              document.getElementById("epsilonLogoLogin").style.transform = "translate(-50%, -50%)"
              document.getElementById("form2FA").classList.add('active')

            }, 50)
          }, 920)
          //$("#EvoxMerge").fadeOut("fast")
          //$("#container").fadeOut("slow")
          //$("#2fa").fadeIn("slow")
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
            fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
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
          returnToLoginMenu()
          setTimeout(function () {
            $("#container").fadeOut("fast")
            setup()
          }, 1000)

          //FloridaRun()
        } else if (data === "Credentials Incorrect") {
          shake_me("voxPassword")
          //fadeError("2")
          console.log("Wrong Email/Password")
          email = ""
          password = ""
        } else if (data === "Account Doesn't Exist") {
          if (email === "" || password === "") {

          } else {
            shake_me("voxEmail")
          }

          console.log("Doesn't Exist")
          email = ""
        } else if (data === "Disabled") {

          alert("Your account has been disabled by Evox. Please contact admins.")
          shake_me("voxEmail")
          //fadeError("1")
          //document.getElementById("email").value = ""
          //document.getElementById("password").value = ""
        }
      })
      .catch(error => {
        document.getElementById("beginLoginBtn").innerHTML = `Login Failed`
        console.error('Fetch error:', error);
      });
  } else {
    document.getElementById("beginLoginBtn").innerHTML = `Login`
  }
}

const emailElemInput = document.getElementById('voxEmail');

// Add an event listener for the 'keydown' event
emailElemInput.addEventListener('keydown', function (event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === 'Enter') {
    // Your code to execute when Enter is pressed
    console.log('Enter key was pressed!');
    document.getElementById('voxPassword').focus();
  }
});
document.getElementById('voxPassword').addEventListener('keydown', function (event) {
  // Check if the pressed key is Enter (key code 13)
  if (event.key === 'Enter') {
    // Your code to execute when Enter is pressed
    console.log('Enter key was pressed! [PASS]');
    startLogin()
  }
});

function on2FAComplete() {
  const num1 = document.getElementById("2faIn1").value
  const num2 = document.getElementById("2faIn2").value
  const num3 = document.getElementById("2faIn3").value
  const num4 = document.getElementById("2faIn4").value
  const num5 = document.getElementById("2faIn5").value
  const num6 = document.getElementById("2faIn6").value
  const otp_2fa = num1 + num2 + num3 + num4 + num5 + num6


  let info = sessionStorage.getItem("ACCOUNT_DATA")
  const account = JSON.parse(info)
  let email = account.email
  let username = account.username
  let password = account.password
  let code = otp_2fa
  //let dig1 = document.getElementById("dig1").value
  //let dig2 = document.getElementById("dig2").value
  //let dig3 = document.getElementById("dig3").value
  //let dig4 = document.getElementById("dig4").value
  //let dig5 = document.getElementById("dig5").value
  //let dig6 = document.getElementById("dig6").value
  //let code = `${dig1}${dig2}${dig3}${dig4}${dig5}${dig6}`
  //console.log("Just to verify:\n", email, username, password, code)
  document.getElementById("form2FA").style.paddingBottom = '0'
  fetch(`${srv}/authip?method=Eadd&email=${email}&username=${username}&password=${password}&code=${code}&ip=${localStorage.getItem("IPV4")}`)
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
          fetch(`${srv}/evoxApp?method=assignAccount&id=${ext}&email=${email}&password=${password}`)
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
        //$("#2fa").fadeOut("slow")

        document.getElementById("form2FA").classList.remove('active')
        setTimeout(function () {
          document.getElementById("form2FA").style.display = 'none'
          setTimeout(function () {
            document.getElementById("epsilonLogoLogin").style.top = "18%"
            document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
          }, 50)
        }, 920)

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
        $("#container").fadeOut("fast")
        setup()
      } else if (data === "Exists") {
        document.getElementById("form2FA").classList.remove('active')
        setTimeout(function () {
          document.getElementById("form2FA").style.display = 'none'
          setTimeout(function () {
            document.getElementById("epsilonLogoLogin").style.top = "18%"
            document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
          }, 50)
        }, 920)
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
        $("#container").fadeOut("fast")
        setup()
      } else if (data === "Wrong Code") {
        shake_me("ver_code")
        document.getElementById("form2FA").style.paddingBottom = '50px'
        document.getElementById("2faIn1").value = ""
        document.getElementById("2faIn2").value = ""
        document.getElementById("2faIn3").value = ""
        document.getElementById("2faIn4").value = ""
        document.getElementById("2faIn5").value = ""
        document.getElementById("2faIn6").value = ""
        document.getElementById("2faIn1").focus()
      } else {
        console.error("Client ip is strange")
      }
      //IF IP EXISTS THEN DONT REQUIRE 2FA, ELSE REQUIRE 2FA
    }).catch(error => {
      console.error('Fetch error:', error);
    });
}

document.querySelectorAll('.boxPut input').forEach((input, index, inputs) => {
  input.addEventListener('input', (e) => {
    if (e.target.value.length === 1) {
      if (index < inputs.length - 1) {
        inputs[index + 1].focus();
      } else {
        // Check if all inputs are filled
        if ([...inputs].every(input => input.value.length === 1)) {
          on2FAComplete();
        }
      }
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputs[index - 1].focus();
    }
  });
});

function returnToLoginMenuBy2fa() {
  document.getElementById("form2FA").classList.remove('active')
  setTimeout(function () {
    document.getElementById("form2FA").style.display = 'none'
    setTimeout(function () {
      document.getElementById("epsilonLogoLogin").style.top = "18%"
      document.getElementById("epsilonLogoLogin").style.transform = "translateX(-50%)"
      returnToLoginMenu()
    }, 50)
  }, 920)
}