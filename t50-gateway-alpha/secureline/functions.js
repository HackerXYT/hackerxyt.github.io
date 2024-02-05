
sessionStorage.removeItem("skipped")
$(document).ready(docready())
var submit = document.getElementById("submit");
submit.addEventListener("click", login())

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
      if (data.includes("Credentials Correct")) {
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
function docready() {
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
                            if(localStorage.getItem("t50-autologin") === "true"){
                              document.getElementById("email").value = localStorage.getItem("t50-email")
                              document.getElementById("password").value = atob(localStorage.getItem("t50pswd"))
                              login()
                            }
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
	log("T50 Gateway V:Delta 5", "red")
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
        setTimeout(function() {
          $("#gateway").fadeOut("fast", function() {
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

function showchat(element) {
  pfp = document.getElementById(`${element.id}-pfp-friends`)
    $("#chats").fadeOut("fast", function() {
      console.log(pfp)
      console.log(pfp.src)
      console.log(element.id)
      document.getElementById("usr-img-chat").src = pfp.src
      document.getElementById("chat-username").innerHTML = element.id
      //get messages and then fade in
        $("#private_chat").fadeIn("fast")
    })
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