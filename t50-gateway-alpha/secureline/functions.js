var screenHeight = window.innerHeight;
//var chatsheight = document.getElementById("messages-container"); // Replace "yourElementId" with the ID of your element
//chatsheight.style.maxHeight = screenHeight - 20 + "px";
//var actionsheight = document.getElementById("actions"); // Replace "yourElementId" with the ID of your element
//actionsheight.style.maxHeight = screenHeight + "px";
sessionStorage.removeItem("sending")
sessionStorage.removeItem("skipped")
$(document).ready(docready())
var submit = document.getElementById("submit");
submit.addEventListener("click", login())
document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
});
function login() {
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value
  console.log(email, "********")
  const url = `https://evox-datacenter.onrender.com/accounts?email=${email}&password=${password}&autologin=true`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {

      console.log(data);
      if (data.includes("Credentials Correct") || data.includes("Do 2FA")) {
        console.log("Welcome Abroad")
        localStorage.setItem("t50pswd", `${btoa(password)}`)
        const credentialsString = data;
        const match = credentialsString.match(/Username:(\w+)/);
        const username = match && match[1];
        localStorage.setItem("t50-email", email)
        //localStorage.setItem("t50-autologin", false)
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


function docready(skipauto) {
  if (localStorage.getItem("t50-autologin") === "true" && skipauto != "yes") {
    //document.getElementById("email").value = localStorage.getItem("t50-email")
    //document.getElementById("password").value = atob(localStorage.getItem("t50pswd"))
    console.log("Logging In Automatically")
    let email = localStorage.getItem("t50-email")
    let password = atob(localStorage.getItem("t50pswd"))
    const url = `https://evox-datacenter.onrender.com/accounts?email=${email}&password=${password}&autologin=true`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        if (data.includes("Credentials Correct")|| data.includes("Do 2FA")) {
          console.log("Welcome Abroad")
          const credentialsString = data;
          const match = credentialsString.match(/Username:(\w+)/);
          const username = match && match[1];
          localStorage.setItem("t50-email", email)
          //localStorage.setItem("t50-autologin", false)
          localStorage.setItem("t50-username", username)
          sessionStorage.setItem("loaded", true)
          sessionStorage.setItem("loggedin", email)
          sessionStorage.setItem("loggedinpswd", btoa(password))
          setup()
          $("#loading-div-text").fadeOut("slow", function () {
            setTimeout(function() {
              $("#loading-bar").fadeOut("slow")
            }, 1500)
          })
        } else if (data === "Credentials Incorrect") {
          docready("yes")
          console.log("Wrong Email/Password")
          email = ""
          password = ""
        } else if (data === "Account Doesn't Exist") {
          if (email === "" || password === "") {
            docready("yes")
          } else {
            docready("yes")
          }

          console.log("Doesn't Exist")
          email = ""
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
      return;
  }
  $("#loading").fadeOut("slow")
  log("Loading Out", "green")
  document.getElementById("loading-text").innerHTML = `Storage Loaded!`
  log("Text In", "cyan")
  let autologin = localStorage.getItem("t50-autologin")
  let loggedin = localStorage.getItem("t50-email")
  let acc = localStorage.getItem("t50pswd")
  let pswd = atob(acc)
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
                  setTimeout(function () {
                    document.getElementById("loading-text").style.transform = `translate(-50%, -455%)`
                    $("#loading").fadeIn("slow")
                    $("#dots").html("...")
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
                          $("#gateway").fadeIn("fast", function () { })





                          console.error('Fetch error:', error);
                        });
                    }, 20)

                  }, 10)
                }, 10)
              }, 10)
            }, 10)
          }, 10)
        })
      })
    }, 10)

  })
  if (loggedin != null && autologin === "true") {
    return;
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

}

function setup() {
  log("SecureLine I:ALPHA 2", "CYAN")
  let lg_status = sessionStorage.getItem("loaded")
  if (lg_status === "true") {
    let username = localStorage.getItem("t50-username")
    let email = localStorage.getItem("t50-email")
    $("#user-text").html(username)
    log("Loading Gateway", "green")
    $("#container").fadeOut("slow", function () {
      $("#gateway").fadeIn("slow")
      if (username != null && email != null) {
        sessionStorage.setItem("skipped", "yes")
        $("#user-text").html(username)
        log("Loading Gateway", "green")
        $("#container").fadeOut("fast")
        $("#loading").fadeIn("slow")
        $("#stuck").fadeOut("slow")
        getFriends()
        setTimeout(function () {
          $("#gateway").fadeOut("fast", function () {
            $("#chats").fadeIn("fast")
            $("#loading").fadeOut("slow")

          })
        }, 1000)

      }
    });

  } else {
    log("Error! Cannot Load Page When Logged Out.", "red")
  }
}



document.getElementById("password").addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    login()
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

function log(text, color) {
  const styles = `color: ${color}; font-size: 16px; font-weight: normal;`;
  console.log('%c' + text, styles)
}
document.getElementById("message_input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    send_message()
  }
});
function send_message() {
  sender = localStorage.getItem("t50-username")
  recipient = sessionStorage.getItem("current_sline")
  message = document.getElementById("message_input")
  console.log("Sending message to", recipient)
  if (message.value != "") {
    if (sessionStorage.getItem("sending") === "true") {
      shake_me("message_input")
      return;
    }
    message.disabled = true
    sessionStorage.setItem("sending", "true")
    fetch(`https://evox-datacenter.onrender.com/secureline?method=SendMessage&username=${localStorage.getItem("t50-username")}&recipient_username=${recipient}&message=${message.value}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        message.value = ""
        if (data === `Message Sent To ${recipient}`) {
          console.log("Message Sent")
          fetch(`https://evox-datacenter.onrender.com/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${recipient}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.text();
            })
            .then(messages => {
              console.log(messages)
              const jsonData = JSON.parse(messages);

              // Check if jsonData and jsonData.messages are defined before sorting
              if (jsonData && jsonData.messages) {
                const messagesContainer = document.getElementById('messages-container');
                messagesContainer.innerHTML = "";

                // Sort messages by timestamp
                const sortedMessages = jsonData.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

                // Iterate over each message
                sortedMessages.forEach(message => {
                  // Create a new message element
                  const messageElement = document.createElement('div');
                  messageElement.textContent = message.content;

                  // Apply appropriate class based on the sender
                  if (message.sender === localStorage.getItem("t50-username")) {
                    messageElement.classList.add('message-me');
                  } else {
                    messageElement.classList.add('message');
                  }

                  // Append the message element to the messages container
                  messagesContainer.appendChild(messageElement);
                });
                if (message) {
                  message.disabled = false;
                  message.focus();
                } else {
                  console.error("Message element NOT FOUND - SL")
                }
                sessionStorage.removeItem("sending")
              } else {
                console.error("JSON data or messages array is undefined.");
              }
            })
        } else {
          console.error("Error Sending Message -SLINE ERROR")
        }
      })
  } else {
    shake_me("message_input")
  }

}
function shake_me(what) {
  document.getElementById(`${what}`).classList.add('shake');
  setTimeout(function () {
    document.getElementById(`${what}`).classList.remove('shake');
  }, 500);
}
let reloading;
function reload_chat(whoto) {
  reloading = setInterval(function () {
    sessionStorage.setItem("current_sline", whoto)
    pfp = document.getElementById(`${whoto}-pfp-friends`)
    fetch(`https://evox-datacenter.onrender.com/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${whoto}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(messages => {
        if(messages === "No Chats Found") {
          document.getElementById("messages-container").innerHTML = `<p class='centered-text'>Chat Hasn't Been Created.<button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`
          console.log("Chat Doesn't Exist")
          return;
        }
        const jsonData = JSON.parse(messages);

        // Check if jsonData and jsonData.messages are defined before sorting
        if (jsonData && jsonData.messages) {
          const messagesContainer = document.getElementById('messages-container');
          messagesContainer.innerHTML = "";

          // Sort messages by timestamp
          const sortedMessages = jsonData.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

          // Iterate over each message
          sortedMessages.forEach(message => {
            // Create a new message element
            const messageElement = document.createElement('div');
            messageElement.textContent = message.content;

            // Apply appropriate class based on the sender
            if (message.sender === localStorage.getItem("t50-username")) {
              messageElement.classList.add('message-me');
            } else {
              messageElement.classList.add('message');
            }

            // Append the message element to the messages container
            messagesContainer.appendChild(messageElement);
          });
        } else {
          console.error("JSON data or messages array is undefined.");
        }
      })
  }, 1000)
}

function return_main_chats() {
  sessionStorage.removeItem("current_sline")
  try {
    clearInterval(reloading)
    log("Interval Cleared!", "green")
  } catch {
    log("Error Clearing Reload Interval", "red")
  }
  $("#private_chat").fadeOut("fast", function () {
    $("#chats").fadeIn("fast")
  })
}
function showchat(element) {
  document.getElementById("actions").style.overflow = ""
  document.getElementById("messages-container").innerHTML = `<p class='centered-text'>Loading Messages
  <svg style="margin-top: 20px" width="50px" height="40px" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
      style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#fff"
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
              to="360 25 25" dur="0.6s" repeatCount="indefinite" />
      </path>
  </svg>
</p>`
  sessionStorage.setItem("current_sline", element.id)
  pfp = document.getElementById(`${element.id}-pfp-friends`)
  fetch(`https://evox-datacenter.onrender.com/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Chat Exists.") {
        console.log("Getting Existing Chat")
        fetch(`https://evox-datacenter.onrender.com/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then(messages => {
            console.log(messages)
            const jsonData = JSON.parse(messages);

            // Check if jsonData and jsonData.messages are defined before sorting
            if (jsonData && jsonData.messages) {
              const messagesContainer = document.getElementById('messages-container');
              messagesContainer.innerHTML = "";
              // Sort messages by timestamp
              const sortedMessages = jsonData.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

              // Iterate over each message
              sortedMessages.forEach(message => {
                // Create a new message element
                const messageElement = document.createElement('div');
                messageElement.textContent = message.content;

                // Apply appropriate class based on the sender
                if (message.sender === localStorage.getItem("t50-username")) {
                  messageElement.classList.add('message-me');
                } else {
                  messageElement.classList.add('message');
                }

                // Append the message element to the messages container
                messagesContainer.appendChild(messageElement);
              });
            } else {
              console.error("JSON data or messages array is undefined.");
            }
          })
      } else if (data === "Chat Doesn't Exist") {
        document.getElementById("messages-container").innerHTML = `<p class='centered-text'>Chat Hasn't Been Created.<button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`
        document.getElementById("actions").style.overflow = "hidden"
      } else {
        //Make Prompt
        console.log("unknown error")
      }
    })
  $("#chats").fadeOut("fast", function () {
    reload_chat(element.id)
    console.log(pfp)
    console.log(pfp.src)
    console.log(element.id)
    document.getElementById("usr-img-chat").src = pfp.src
    document.getElementById("chat-username").innerHTML = element.id
    //get messages and then fade in
    $("#private_chat").fadeIn("fast", function () {
      var chatdiv = document.getElementById("messages-container");
      // Scroll to the bottom of the div
      chatdiv.scrollTop = chatdiv.scrollHeight;
    })
  })

}

function create_chat() {
  document.getElementById("actions").style.overflow = ""
  try{
    clearInterval(reloading)
  } catch {
    console.error("Unknown Error, Cannot Clear Interval")
  }
  document.getElementById("messages-container").innerHTML = `<p class='centered-text'>Creating Chat
  <svg style="margin-top: 20px" width="50px" height="40px" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50"
      style="enable-background:new 0 0 50 50;" xml:space="preserve">
      <path fill="#fff"
          d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25"
              to="360 25 25" dur="0.6s" repeatCount="indefinite" />
      </path>
  </svg>
</p>`
  fetch(`https://evox-datacenter.onrender.com/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${sessionStorage.getItem("current_sline")}&createnew=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if(data === "Created") {
        console.log("Chat Created")
        let element = {
          "id": sessionStorage.getItem("current_sline")
        }
        console.log("Reloading")
        setTimeout(function() {
          showchat(element)
        }, 1000)
      }
    })
}
function go_dash() {
  window.location.href = "../"
}
function getFriends() {
  $("#load-users-friends").fadeIn("fast")
  fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(JSON.stringify(data))
      if (JSON.stringify(data) === '"[]"') {
        //$("#load-users-friends").fadeOut("fast", function () {
        //	let containerId = "list-friends";
        //	var listContainer = document.getElementById(containerId);
        //	listContainer.style.textAlign = "center";
        //	listContainer.style.marginTop = "50px";
        //	listContainer.innerHTML = "No Friends"
        //})
        return;
      } else {
        console.log(`${JSON.stringify(data)} != "[]" data isnt empty`)
      }
      const user_requests = JSON.parse(data)
      let containerId = "list-container";
      var listContainer = document.getElementById(containerId);
      listContainer.style.textAlign = "";
      listContainer.style.marginTop = "";
      listContainer.innerHTML = "<!--Empty-->";
      user_requests.forEach(username => {
        fetch(`https://evox-datacenter.onrender.com/accounts?method=getemailbyusername&username=${username}`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
          })
          .then(profileemail => {
            let addButton;
            // Check if the username already exists in the list
            if (listContainer.querySelector(`#user-${username}-email`) === null) {
              var userContainer = document.createElement("div");
              userContainer.className = "list-user-info";
              userContainer.id = username;
              userContainer.onclick = function () {
                showchat(this);
              };
              var userCircle = document.createElement("div");
              userCircle.className = "user-circle";
              userCircle.innerHTML = `<img src="../searching_users.gif" id="${username}-pfp-friends" alt="User ${username} Image">`;
              var userDetails = document.createElement("div");
              userDetails.className = "user-details";

              var userName = document.createElement("div");
              userName.className = "user-name";
              userName.textContent = username;

              var userEmail = document.createElement("div");
              userEmail.className = "user-email";
              userEmail.id = `user-${username}-email-friends`;
              userEmail.textContent = profileemail;


              //addButton = document.createElement("a");
              //addButton.href = "#";
              //addButton.id = username;
              //addButton.onclick = function () {
              //	acceptfriend(this);
              //};
              //addButton.className = "apple-button-list";
              //addButton.textContent = "Accept";


              userDetails.appendChild(userName);
              userDetails.appendChild(userEmail);

              userContainer.appendChild(userCircle);
              userContainer.appendChild(userDetails);
              //userContainer.appendChild(addButton);

              listContainer.appendChild(userContainer);
              fetch(`https://evox-datacenter.onrender.com/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.text();
                })
                .then(profileimage => {
                  if (profileimage.indexOf("base64") === -1) {
                    // If it doesn't contain "base64", add the prefix
                    profileimage = "data:image/jpeg;base64," + profileimage;
                    document.getElementById(`${username}-pfp-friends`).src = profileimage
                  } else {
                    document.getElementById(`${username}-pfp-friends`).src = profileimage
                  }


                }).catch(error => {
                  console.error("Cannot set src for", username)
                  console.error(error)
                })
            }
          });
        $("#load-users-friends").fadeOut("fast");
      })
    })

  $("#main_settings").fadeOut("fast", function () {
    $("#friends").fadeIn("fast")
  })
}