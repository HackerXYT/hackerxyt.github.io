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
    //if (sessionStorage.getItem("sending") === "true") {
    //    shake_me("message_input")
    //    return;
    //}
    //message.disabled = true
    //sessionStorage.setItem("sending", "true")
    fetch(`https://data.evoxs.xyz/secureline?method=SendMessage&username=${localStorage.getItem("t50-username")}&recipient_username=${recipient}&message=${message.value}`)
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
          fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${recipient}`)
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
                  //message.disabled = false;
                  message.focus();
                } else {
                  console.error("Message element NOT FOUND - SL")
                }
                //sessionStorage.removeItem("sending")
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

let reloading;
function reload_chat(whoto) {
  reloading = setInterval(function () {
    sessionStorage.setItem("current_sline", whoto)
    pfp = document.getElementById(`${whoto}-pfp-secureline`)
    fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${whoto}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(messages => {

        if (sessionStorage.getItem("lastChatInter") === messages) {
          console.log("No new messages")
          return;
        }
        sessionStorage.setItem("lastChatInter", messages)
        if (messages === "Chat not created") {
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
          const removeContainer = document.getElementById('delete_msg_list');
          removeContainer.innerHTML = "";
          sortedMessages.forEach(message => {

            //<span onclick="deletemessage(this)" class="apple-button">Hello</span>

            // Create a new message element
            const messageElement = document.createElement('div');
            messageElement.textContent = message.content;

            // Apply appropriate class based on the sender
            if (message.sender === localStorage.getItem("t50-username")) {
              messageElement.classList.add('message-me');
              const msgelem = document.createElement('span');
              msgelem.textContent = message.content;
              msgelem.className = "apple-button";
              msgelem.onclick = function () {
                deletemessage(this)
              };
              removeContainer.appendChild(msgelem)
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

  $("#navbar").fadeIn("fast", function () {
    document.getElementById("navbar").classList.add("active")
  })
  $("#navigator").fadeIn("fast")
  sessionStorage.removeItem("current_sline")
  sessionStorage.removeItem("lastChatInter")
  try {
    clearInterval(reloading)
    log("Interval Cleared!", "green")
  } catch (error) {
    log(`Error Clearing Reload Interval ${error}`, "red")
  }
  document.getElementById("secureline").classList.add("active")
  document.getElementById("private_chat").classList.remove("active")
  $("#secureline").fadeIn("fast")
}
function showchat(element) {//json id=Username
  const swipeArea = document.getElementById('private_chat');

  let touchstartX = 0;
  let touchendX = 0;

  function handleGesture() {
    if (touchendX > touchstartX) {
      const distance = touchendX - touchstartX;
      if (distance > 50) { // Detect a swipe if the distance is greater than 50 pixels
        console.log('Swiped from left to right');
        // Run your desired function here
        //alert('Swiped from left to right');
        return_main_chats()
      }
    }
  }

  swipeArea.addEventListener('touchstart', (event) => {
    touchstartX = event.changedTouches[0].screenX;
  });

  swipeArea.addEventListener('touchend', (event) => {
    touchendX = event.changedTouches[0].screenX;
    handleGesture();
  });
  $("#navbar").fadeOut("fast", function () {
    document.getElementById("navbar").classList.remove("active")
  })
  //$("#navigator").fadeOut("fast")
  $("#profile").fadeOut("slow")
  console.log("Got element:", element)
  //document.getElementById("secureline_chat").classList.add("active")
  //$("#private_chat").fadeIn("fast")

  document.getElementById("private_chat").classList.add("active")
  document.getElementById("secureline").classList.remove("active")
  document.getElementById("delete_msg_list").innerHTML = ""
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
  pfp = document.getElementById(`${element.id}-pfp-secureline`)
  fetch(`https://data.evoxs.xyz/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Chat Exists.") {
        console.log("Getting Existing Chat")
        fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}`)
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
  document.getElementById("secureline-img-chat").src = pfp.src
  document.getElementById("chat-username").innerHTML = element.id
  reload_chat(element.id)
  document.getElementById("private_chat").classList.add("active")
  var chatdiv = document.getElementById("messages-container");
  // Scroll to the bottom of the div
  chatdiv.scrollTop = chatdiv.scrollHeight;
  console.log(pfp)
  console.log(pfp.src)
  console.log(element.id)


}

function create_chat() {
  document.getElementById("actions").style.overflow = ""
  try {
    clearInterval(reloading)
  } catch (error){
    console.error("Unknown Error, Cannot Clear Interval", error)
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
  fetch(`https://data.evoxs.xyz/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${sessionStorage.getItem("current_sline")}&createnew=true`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Created") {
        console.log("Chat Created")
        let element = {
          "id": sessionStorage.getItem("current_sline")
        }
        console.log("Reloading")
        setTimeout(function () {
          showchat(element)
        }, 1000)
      }
    })
}
let profint;

function preloadSFriends() {
  $("#sline-container").fadeIn("slow");
  //$("#sline-container").fadeOut("fast");
  if (!localStorage.getItem("t50-username")) {
    console.warn("Logged Out! Secureline Preloading Stopped!")
    return;
  }
  fetch(`https://data.evoxs.xyz/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(JSON.stringify(data)); //["Kyriakos","bantou","twentysix","Moretti","fando","Clxpzie","Kravaritis","DarkAngel","AIT","Oykas"]
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
        console.log(`${JSON.stringify(data)} != "[]" data isnt empty`);
      }
      let user_requests;
      try {
        user_requests = JSON.parse(data);
      } catch (error) {
        console.warn("Data is empty")
      }

      console.log(user_requests)
      user_requests.sort(); // Sort the usernames alphabetically
      console.log(user_requests)
      let containerId = "sline-container";
      var listContainer = document.getElementById(containerId);
      listContainer.style.textAlign = "";
      listContainer.style.marginTop = "";
      listContainer.innerHTML = "<!--Empty-->";
      user_requests.forEach(username => {
        fetch(`https://data.evoxs.xyz/accounts?method=getemailbyusername&username=${username}`)
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
              userCircle.className = "user-circle-sl";
              userCircle.innerHTML = `<img src="loading-circle.gif" id="${username}-pfp-secureline" alt="User ${username} Image">`;
              var userDetails = document.createElement("div");
              userDetails.className = "user-details";

              var userName = document.createElement("div");
              userName.className = "user-name";
              userName.textContent = username;

              var userEmail = document.createElement("div");
              userEmail.className = "user-email";
              userEmail.id = `user-${username}-email-secureline`;
              userEmail.textContent = 'Loading..';
              fetch(`${srv}/secureline?method=lastMSG&username=${localStorage.getItem("t50-username")}&recipient_username=${username}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.text();
                })
                .then(lastmsg => {
                  userEmail.textContent = lastmsg;
                }).catch(error => {
                  console.error(error)
                })


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
              loadPFP(username, '-pfp-secureline')
              //fetch(`https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
              //  .then(response => {
              //    if (!response.ok) {
              //      throw new Error(`HTTP error! Status: ${response.status}`);
              //    }
              //    return response.text();
              //  })
              //  .then(profileimage => {
              //    if (profileimage.indexOf("base64") === -1) {
              //      // If it doesn't contain "base64", add the prefix
              //      profileimage = "data:image/jpeg;base64," + profileimage;
              //      document.getElementById(`${username}-pfp-secureline`).src = profileimage
              //    } else {
              //      document.getElementById(`${username}-pfp-secureline`).src = profileimage
              //    }
              //
              //
              //  }).catch(error => {
              //    console.error("Cannot set src for", username)
              //    console.error(error)
              //  })
            }
          });
        $("#load-users-friends").fadeOut("fast");
        $("#sline-container").fadeIn("slow");
      });
    });
}

function preloadSFriends() {
  sessionStorage.setItem("preloaded-sline", "true")
  //$("#sline-container").fadeOut("fast");
  fetch(`https://data.evoxs.xyz/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(JSON.stringify(data)); //["Kyriakos","bantou","twentysix","Moretti","fando","Clxpzie","Kravaritis","DarkAngel","AIT","Oykas"]
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
        console.log(`${JSON.stringify(data)} != "[]" data isnt empty`);
      }
      const user_requests = JSON.parse(data);
      console.log(user_requests)
      user_requests.sort(); // Sort the usernames alphabetically
      console.log(user_requests)
      let containerId = "sline-container";
      var listContainer = document.getElementById(containerId);
      listContainer.style.textAlign = "";
      listContainer.style.marginTop = "";
      listContainer.innerHTML = "<!--Empty-->";

      // Array to store promises of fetch requests
      const fetchPromises = [];
      let onlineUsrs;
      fetch(`${srv}/getOnlineUsers`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(thisJSON => {
          onlineUsrs = JSON.stringify(thisJSON)
        }).catch(error => {
          console.error(error)
        })

      user_requests.forEach(username => {
        const promise = fetch(`https://data.evoxs.xyz/accounts?method=getemailbyusername&username=${username}`)
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
              userCircle.className = "user-circle-sl";
              //if(onlineUsrs.includes(username)) {
              //  userCircle.className = "user-circle-sl activeUser";
              //}
              userCircle.innerHTML = `<img src="loading-circle.gif" id="${username}-pfp-secureline" alt="User ${username} Image">`;
              var userDetails = document.createElement("div");
              userDetails.className = "user-details";

              var userName = document.createElement("div");
              userName.className = "user-name";
              userName.textContent = username;

              var userEmail = document.createElement("div");
              userEmail.className = "user-email";
              userEmail.id = `user-${username}-email-secureline`;
              userEmail.textContent = "Loading..";
              fetch(`${srv}/secureline?method=lastMSG&username=${localStorage.getItem("t50-username")}&recipient_username=${username}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.text();
                })
                .then(lastmsg => {
                  userEmail.textContent = lastmsg;
                }).catch(error => {
                  console.error(error)
                })



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


              return userContainer;
            }
          });
        setTimeout(function () {
          loadPFP(username, '-pfp-secureline')
        }, 850)


        fetchPromises.push(promise);
      });

      Promise.all(fetchPromises)
        .then(userContainers => {

          // Sort userContainers alphabetically by username
          userContainers.sort((a, b) => {
            const usernameA = a.querySelector('.user-name').textContent;
            const usernameB = b.querySelector('.user-name').textContent;
            return usernameA.localeCompare(usernameB);
          });

          // Append sorted userContainers to listContainer
          userContainers.forEach(userContainer => {
            listContainer.appendChild(userContainer);

          });

          $("#load-users-friends").fadeOut("fast");
          $("#sline-container").fadeIn("slow");
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    });
}

if (localStorage.getItem("t50-username")) {
  preloadSFriends()
}

function getFriends(pre) {
  if (!pre) {
    if (sessionStorage.getItem("preloaded-sline")) {

    }
    profint = setInterval(function () {
      $("#profile").fadeOut("slow")
    }, 500)
  } else {
    preloadSFriends()

    sline_refresh.play()
  }
  $("#load-users-friends").fadeIn("fast")


  //$("#main_settings").fadeOut("fast", function () {
  //  $("#friends").fadeIn("fast")
  //})
}

function options() {
  navigator("sline_options")
  $("#navigator").fadeIn("fast")
  $("#options_box").fadeIn("fast")
  //document.getElementById("options_box").classList.add("active")
  document.getElementById('private_chat').style.filter = 'blur(10px)'

}

function goback_options() {
  $("#options_box").fadeOut("fast")
  //document.getElementById("options_box").classList.remove("active")
  document.getElementById('private_chat').style.filter = ''
}

function deletemessage(element) {
  if (element === "all") {
    sessionStorage.setItem("removemsg", "**SLINECOMDELALL_EVOXWEBCOMM**")
    document.getElementById('options_box').style.filter = 'blur(20px)'
    document.getElementById("confirm_box").classList.add("active")
    document.getElementById("message-del-content").innerHTML = "All messages in conversation."
    return;
  }
  sessionStorage.setItem("removemsg", element.innerHTML)
  document.getElementById('options_box').style.filter = 'blur(20px)'
  document.getElementById("confirm_box").classList.add("active")
  document.getElementById("message-del-content").innerHTML = element.innerHTML
}

function canceldelete() {
  sessionStorage.removeItem("removemsg")
  document.getElementById('options_box').style.filter = ''
  document.getElementById("confirm_box").classList.remove("active")
  document.getElementById("message-del-content").innerHTML = ''
}

function confirmdelete() {
  document.getElementById("cancelbtn").style.display = "none"
  const message = sessionStorage.getItem("removemsg")
  fetch(`https://data.evoxs.xyz/secureline?method=DeleteMessage&username=${localStorage.getItem("t50-username")}&recipient_username=${sessionStorage.getItem("current_sline")}&whosentit=me&message=${message}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      if (data === "Deleted Message") {
        ac_complete.play()
        sessionStorage.removeItem("removemsg")
        document.getElementById('options_box').style.filter = ''
        document.getElementById("confirm_box").classList.remove("active")
        document.getElementById("message-del-content").innerHTML = ''
        document.getElementById("cancelbtn").style.display = ""
      } else if (data === "Complete") {
        ac_complete.play()
        sessionStorage.removeItem("removemsg")
        document.getElementById('options_box').style.filter = ''
        document.getElementById("confirm_box").classList.remove("active")
        document.getElementById("message-del-content").innerHTML = ''
        document.getElementById("cancelbtn").style.display = ""
        const oldhtml = document.getElementById("notification").innerHTML
        var notification = document.getElementById('notification');
        if (notification.className.includes("show")) {
          console.log("Notification Is Shown")
          notification.classList.remove('show');
          setTimeout(function () {
            document.getElementById("notification").innerHTML = "Deleted All Messages"
            notification.classList.add('show');
            $("#flrd_svg").fadeOut("fast")
            setTimeout(function () {
              notification.classList.remove('show');
            }, 2500);
          }, 500)
        } else {
          document.getElementById("notification").innerHTML = "Deleted All Messages"
          notification.classList.add('show');
          $("#flrd_svg").fadeOut("fast")
          setTimeout(function () {
            notification.classList.remove('show');
          }, 2500);
        }
        setTimeout(function () {
          document.getElementById("notification").innerHTML = oldhtml
        }, 3000)
      } else {
        sessionStorage.removeItem("removemsg")
        document.getElementById('options_box').style.filter = ''
        document.getElementById("confirm_box").classList.remove("active")
        document.getElementById("cancelbtn").style.display = ""
      }


    }).catch(error => {
      console.error(error)
    })
}