if(localStorage.getItem("ld-scr") != null) {
    document.getElementById("loading").innerHTML = `<div class="item">
    <i class="loader --${localStorage.getItem("ld-scr")}"></i>
</div>`
    console.log("Custom LD Exists")
    
} else {
    console.log("Custom LD Doesn't Exist")
}
$(document).ready(function() {
    
    if(localStorage.getItem("img-app-on") === "true") {
        try {
        loadImages()
        } catch (error) {
            load_img()
        }
        setTimeout(function() {
            $("#usr").html(localStorage.getItem("img-app-username"))
            $("#settings_email_ph").html(localStorage.getItem("img-app-email"))
            $("#settings_username_ph").html(localStorage.getItem("img-app-username"))
            //$("#gallery-text").fadeOut("slow", function() {
                $("#gallery").fadeIn("slow")
                $("#navigator").fadeIn("fast")
                //$("#container-img").fadeOut("slow", function() {
                //    $("#gallery").fadeIn("slow")
                //});
            //});
            
            
            $("#header").fadeIn("slow")
            $("#gallery-set").fadeIn("slow")
            //$("#loading").fadeOut("slow");
        }, 1000)
    } else {
        
        if(localStorage.getItem("rem-email")) {
            document.getElementById("loading").innerHTML = `<div class="item">
            <i class="loader --6"></i>
        </div>`
        //document.getElementById("email").value = localStorage.getItem("rem-email")
       // document.getElementById("email").disabled = "true"
       document.getElementById("use_switch").style.display = "none"
       document.getElementById("rem-user").style.display = ""
       let username = localStorage.getItem("t50-username")
       var firstLetterUppercase = username.charAt(0).toUpperCase();

        // Get the rest of the word (excluding the first letter)
        var restOfWord = username.slice(1);

        // Combine the first letter and the rest of the word
        var result = firstLetterUppercase + restOfWord;

       document.getElementById("usr-name").innerHTML = result
       document.getElementById("usr-email").innerHTML = localStorage.getItem("t50-email")
       document.getElementById("email").value = localStorage.getItem("t50-email")
       let user = localStorage.getItem("t50-username")
       if(user != null) {
		    const url = `https://fat-swan-58.telebit.io/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
		    fetch(url)
		      .then(response => response.text())
		      .then(data => {
		    	document.getElementById("usr-img").src = `${data}`
                $("#container").fadeIn("slow", function() {
                    $("#change-acc").fadeIn("slow")
                });
                setTimeout(function() {
                    //$("#rem-email-lock").fadeIn("slow")
                    $("#loading").fadeOut("slow");
                    
                }, 950)
		    })
		    .catch(error => {
                console.error('Fetch error:', error);
                document.getElementById("usr-img").src = `loading.gif`
                $("#container").fadeIn("slow", function() {
                    $("#change-acc").fadeIn("slow")
                });
                setTimeout(function() {
                    //$("#rem-email-lock").fadeIn("slow")
                    $("#loading").fadeOut("slow");
                    
                }, 950)
            });
	    }
    
        
        
        } else {
            $("#loading").fadeOut("slow");
            $("#container").fadeIn("slow");
        }
        
    }
    
});

var submit = document.getElementById("submit");
submit.addEventListener("click", login())

function login() {
    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    console.log(email, password)
    const url = `https://fat-swan-58.telebit.io/accounts?email=${email}&password=${password}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        
        console.log(data); // Handle the response data here
        if(data.includes("Credentials Correct") || data.includes("Do 2FA") || data.includes("IP Not Verified")) {
            console.log("Welcome Abroad")
            localStorage.setItem("account", `{"imgpassword":"${btoa(password)}"}`)
            const credentialsString = data;
            // Use a regular expression to match the "Username:" followed by the value
            if(data !== "IP Not Verified") {
                const match = credentialsString.match(/Username:(\w+)/);
                // Extract the captured value (in this case, the username)
                const username = match && match[1];
                localStorage.setItem("img-app-username", username)
            }
            $("#container").fadeOut("slow");
            $("#gallery").fadeIn("slow");
            localStorage.setItem("img-app-email", email)
            localStorage.setItem("img-app-on", true)
            $("#navigator").fadeIn("fast")
            restart()
        } else if(data === "Credentials Incorrect") {
            fadeError("2")
            console.log("Wrong Email/Password")
            email = ""
            password = ""
        } else if(data === "Connection Blocked") {
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

function settings() {
    if(document.getElementById("container-img").innerHTML === `<p style="color: red;margin-left: 20px">Your Account Doesn't Have Access To T50 Images</p>`) {
        document.getElementById(`gallery-set`).classList.add('shake');
        $("#logout").fadeIn("slow")
        // Remove the "shake" class after the animation duration
        setTimeout(function () {
            document.getElementById(`gallery-set`).classList.remove('shake');
        }, 500);
        return;
    }
    //$("#bottom-logo").fadeIn("slow")
        $("#popup").fadeIn("fast")
        document.body.style.overflow = 'hidden';
        document.getElementById("navigator").innerHTML = `<div onclick="close_popup()" id="settings">
        <div
            style="background-color: #33333370; border: none; color: #fff; padding: 15px 30px; font-size: 16px; border-radius: 19px; cursor: pointer; display: flex; align-items: center; text-decoration: none; transition: background-color 0.3s ease;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"
                style="margin-right: 10px;">
                <defs>
                    <style>
                        .cls-1 {
                            fill: none;
                            stroke: #fff;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                        }
                    </style>
                </defs>
                <path class="cls-1"
                    d="M39.23,26a16.52,16.52,0,0,0,.14-2,16.52,16.52,0,0,0-.14-2l4.33-3.39a1,1,0,0,0,.25-1.31l-4.1-7.11a1,1,0,0,0-1.25-.44l-5.11,2.06a15.68,15.68,0,0,0-3.46-2l-.77-5.43a1,1,0,0,0-1-.86H19.9a1,1,0,0,0-1,.86l-.77,5.43a15.36,15.36,0,0,0-3.46,2L9.54,9.75a1,1,0,0,0-1.25.44L4.19,17.3a1,1,0,0,0,.25,1.31L8.76,22a16.66,16.66,0,0,0-.14,2,16.52,16.52,0,0,0,.14,2L4.44,29.39a1,1,0,0,0-.25,1.31l4.1,7.11a1,1,0,0,0,1.25.44l5.11-2.06a15.68,15.68,0,0,0,3.46,2l.77,5.43a1,1,0,0,0,1,.86h8.2a1,1,0,0,0,1-.86l.77-5.43a15.36,15.36,0,0,0,3.46-2l5.11,2.06a1,1,0,0,0,1.25-.44l4.1-7.11a1,1,0,0,0-.25-1.31ZM24,31.18A7.18,7.18,0,1,1,31.17,24,7.17,7.17,0,0,1,24,31.18Z" />
            </svg>
            Go back
        </div>
    </div>`
    
}

function close_popup() {
    //$("#bottom-logo").fadeOut("slow")
        $("#popup").fadeOut("fast")
        document.body.style.overflow = 'visible';
        document.getElementById("navigator").innerHTML = `<div onclick="settings()" id="settings">
        <div
            style="background-color: #33333370; border: none; color: #fff; padding: 15px 30px; font-size: 16px; border-radius: 19px; cursor: pointer; display: flex; align-items: center; text-decoration: none; transition: background-color 0.3s ease;">
            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 48 48"
                style="margin-right: 10px;">
                <defs>
                    <style>
                        .cls-1 {
                            fill: none;
                            stroke: #fff;
                            stroke-linecap: round;
                            stroke-linejoin: round;
                        }
                    </style>
                </defs>
                <path class="cls-1"
                    d="M39.23,26a16.52,16.52,0,0,0,.14-2,16.52,16.52,0,0,0-.14-2l4.33-3.39a1,1,0,0,0,.25-1.31l-4.1-7.11a1,1,0,0,0-1.25-.44l-5.11,2.06a15.68,15.68,0,0,0-3.46-2l-.77-5.43a1,1,0,0,0-1-.86H19.9a1,1,0,0,0-1,.86l-.77,5.43a15.36,15.36,0,0,0-3.46,2L9.54,9.75a1,1,0,0,0-1.25.44L4.19,17.3a1,1,0,0,0,.25,1.31L8.76,22a16.66,16.66,0,0,0-.14,2,16.52,16.52,0,0,0,.14,2L4.44,29.39a1,1,0,0,0-.25,1.31l4.1,7.11a1,1,0,0,0,1.25.44l5.11-2.06a15.68,15.68,0,0,0,3.46,2l.77,5.43a1,1,0,0,0,1,.86h8.2a1,1,0,0,0,1-.86l.77-5.43a15.36,15.36,0,0,0,3.46-2l5.11,2.06a1,1,0,0,0,1.25-.44l4.1-7.11a1,1,0,0,0-.25-1.31ZM24,31.18A7.18,7.18,0,1,1,31.17,24,7.17,7.17,0,0,1,24,31.18Z" />
            </svg>
            Settings
        </div>
    </div>`
        
}

//email, password, submit


function restart() {
	$("#popup").fadeOut("fast", function() {
        $("#gallery-text").fadeOut("slow")
		$("#container-img").fadeOut("fast", function() {
			$("#header").fadeOut("fast", function() {
				$("#settings").fadeOut("fast", function() {
					window.location.reload()
				})
			})
		})

	})

}

function logoff() {
    localStorage.removeItem("img-app-on")
    localStorage.removeItem("email")
    restart()
}

function settings_reload() {
    if(localStorage.getItem("auto-login") === "true") {
        console.log("Auto Login Enabled")
        $("#email-rem").fadeOut("slow")
        document.getElementById("auto-login").innerHTML = `<a class="enabled" onclick="auto_login('disable')" href="#autologin">Enabled</a>`
    } else {
        console.log("Auto Login Disabled")
        document.getElementById("auto-login").innerHTML = `<a class="disabled" onclick="auto_login('enable')" href="#autologin">Disabled</a>`
    }

    if(localStorage.getItem("rem-email")) {
        console.log("Remember Email Enabled")
        document.getElementById("rem-email").innerHTML = `<a class="enabled" onclick="rem_email('disable')" href="#rememail">Enabled</a>`
    } else {
        console.log("Remember Email Disabled")
        document.getElementById("rem-email").innerHTML = `<a class="disabled" onclick="rem_email('enable')" href="#rememail">Disabled</a>`
    }

    if(localStorage.getItem("ld-scr")) {
        document.getElementById("load-settings").innerHTML = `<a onclick="load_ld_ch('${localStorage.getItem("ld-scr")}')" href="#loading-settings">${localStorage.getItem("ld-scr")}</a>`;
    } else {
        document.getElementById("load-settings").innerHTML = `<a onclick="load_ld_ch('5')" href="#loading-settings">5 (default)</a>`;
    }

    
}

function auto_login(what) {
    if(what === "enable") {
        localStorage.setItem("img-app-on", true)
        $("#email-rem").fadeOut("slow")
    localStorage.setItem("auto-login", true)
    $("#auto-login").fadeOut("slow", function() {
        document.getElementById("auto-login").innerHTML = `<a class="enabled" onclick="auto_login('disable')" href="#autologin">Enabled</a>`
        $("#auto-login").fadeIn("slow")
    })
    } else if(what === "disable") {
        localStorage.removeItem("img-app-on")
        $("#email-rem").fadeIn("slow")
    localStorage.removeItem("auto-login")
    $("#auto-login").fadeOut("slow", function() {
        document.getElementById("auto-login").innerHTML = `<a class="disabled" onclick="auto_login('enable')" href="#autologin">Disabled</a>`
        $("#auto-login").fadeIn("slow")
    })
    }
}

function rem_email(what) {
    if(what == "enable") {
        console.log("Enable Rem Email")
        let temp_mail = localStorage.getItem("img-app-email")
        localStorage.setItem("rem-email", temp_mail)
        document.getElementById("rem-email").innerHTML = `<a class="enabled" onclick="rem_email('disable')" href="#rememail">Enabled</a>`

        
    } else if(what == "disable") {
        console.log("Disable Rem Email")
        localStorage.removeItem("rem-email")
        document.getElementById("rem-email").innerHTML = `<a class="disabled" onclick="rem_email('enable')" href="#rememail">Disabled</a>`
    } else {
        console.log("Error Rem-Email Func")
    }
}

function l_u_email() {
    if(document.getElementById("email").disabled == true) {
        document.getElementById("email").disabled = false;
        document.getElementById("l_u").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M16.584 6C15.8124 4.2341 14.0503 3 12 3C9.23858 3 7 5.23858 7 8V10.0288M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C16.8802 10 17.7202 10 18.362 10.327C18.9265 10.6146 19.3854 11.0735 19.673 11.638C20 12.2798 20 13.1198 20 14.8V16.2C20 17.8802 20 18.7202 19.673 19.362C19.3854 19.9265 18.9265 20.3854 18.362 20.673C17.7202 21 16.8802 21 15.2 21H8.8C7.11984 21 6.27976 21 5.63803 20.673C5.07354 20.3854 4.6146 19.9265 4.32698 19.362C4 18.7202 4 17.8802 4 16.2V14.8C4 13.1198 4 12.2798 4.32698 11.638C4.6146 11.0735 5.07354 10.6146 5.63803 10.327C5.99429 10.1455 6.41168 10.0647 7 10.0288Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    } else {
        document.getElementById("email").value = localStorage.getItem("rem-email")
        document.getElementById("email").disabled = true;
        document.getElementById("l_u").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
    }
}

function load_ld_ch(what) {
    let current = what
    sessionStorage.setItem("current", current)
    document.getElementById(`ld${current}`).innerHTML = `<div style="background-color: red" id="box${current}" class="box">${current}</div>`
    var elements = document.querySelectorAll('[id^="box"]');
    
    // Loop through the elements and change background color
    elements.forEach(function(element) {
      // Check if the element's ID is not "box5"
      if (element.id !== `box${current}`) { //GIA KATHE BOX AN DEN EINAI TO ID TOU BOX POU THES NA ALLAJEI
        console.log("Changing BG for", element.id)
        element.style.backgroundColor = "#333";
      }
      if(element.id === `box${current}`) {
        console.log("Chaning RED BG FOR", element.id)
        element.style.backgroundColor = "#FF0000"
      }
    })
    $("#popup").fadeOut("slow")
    //$("#bottom-logo").fadeOut("slow")//bottom-logo-start
    
    setTimeout(function() {
        //$("#bottom-logo-start").fadeIn("slow")
        document.body.style.overflow = 'hidden';
        $("#list-icons").fadeIn("slow")
        $("#list-alone").fadeOut("slow")
        setTimeout(function() {
            $("#ld-scr").fadeIn("slow")
        }, 500)
    }, 500)
    
    
}

function close_ld_set() {
    if(sessionStorage.getItem("done_select") === "no") {
        sessionStorage.setItem("current", sessionStorage.getItem("old"))
        localStorage.setItem("ld-scr", sessionStorage.getItem("old"));
        document.getElementById("loading").innerHTML = `<div class="item">
            <i class="loader --${sessionStorage.getItem("old")}"></i>
            </div>`;
        settings_reload()
        //$("#bottom-logo-start").fadeOut("slow", function() {
        //    $("#bottom-logo").fadeIn("slow")
        //})
        
        
        setTimeout(function() {
            $("#ld-scr").fadeOut("slow")
            $("#popup").fadeIn("slow")
        }, 500)
    } else {
        settings_reload()
        //$("#bottom-logo-start").fadeOut("slow", function() {
        //    $("#bottom-logo").fadeIn("slow")
        //})
        
        
        setTimeout(function() {
            $("#ld-scr").fadeOut("slow")
            $("#popup").fadeIn("slow")
        }, 500)
    }
    
}


function ch_ld(num) {
    if (num < 1 || num > 9) {
        console.log(`Loading Screen ${num} Doesn't Exist`);
        return;
    }
    localStorage.setItem("ld-scr", num);
    document.getElementById("loading").innerHTML = `<div class="item">
        <i class="loader --${num}"></i>
        </div>`;
        console.log("Set Loading Screen", num)
}

function beginld(num) {
    // Assuming `ch_ld` function is defined elsewhere in your code
    // You might want to make sure it's defined and does what you expect.
    
    if (num == sessionStorage.getItem("current")) {
        console.log("This Loading Screen Is Already Enabled");
        document.getElementById(`box${num}`).classList.add('shake');

        // Remove the "shake" class after the animation duration
        setTimeout(function () {
            document.getElementById(`box${num}`).classList.remove('shake');
        }, 500);
    } else {
        sessionStorage.setItem("old", sessionStorage.getItem("current"))
        sessionStorage.setItem("current", num)
        console.log("Changing Loading Screen", num);
        
        if (num < 1 || num > 9) {
            console.log(`Loading Screen ${num} Doesn't Exist`);
            return;
        } else {
            ch_ld(num);
            const currentBoxId = `box${sessionStorage.getItem("current")}`;
            var elements = document.querySelectorAll('[id^="box"]');
    
            // Loop through the elements and change background color
            elements.forEach(function(element) {
              // Check if the element's ID is not "box5"
              if (element.id !== `box${num}`) { //GIA KATHE BOX AN DEN EINAI TO ID TOU BOX POU THES NA ALLAJEI
                console.log("Changing BG for", element.id)
                element.style.backgroundColor = "#333";
              }
              if(element.id === `box${num}`) {
                console.log("Chaning RED BG FOR", element.id)
                element.style.backgroundColor = "#FF0000"
              }
            })

            $("#list-icons").fadeOut("slow", function() {
                sessionStorage.setItem("done_select", "no")
                document.getElementById("number-icon").innerHTML = num
                document.getElementById("icon-inside").innerHTML = `<i class="loader --${num}" style="display: inline-block; margin-right: 5px;"></i>`
                $("#list-alone").fadeIn("slow")   
            })
        }
    }
}

function continue_ok() {
    sessionStorage.setItem("done_select", "yes")
    close_ld_set()
}

function logout() {
    localStorage.removeItem("img-app-on")
    localStorage.removeItem("email")
		$("#container-img").fadeOut("fast", function() {
			$("#header").fadeOut("fast", function() {
				$("#settings").fadeOut("fast", function() {
					window.location.reload()
				})
			})
		})

}

function fadeError(method) {
	var targetColor = "rgb(255, 99, 71)";
	var fadeDuration = 2000;
	let element;
	if (method == "1") {//EMAIL WRONG
		element = document.getElementById("email");
		element.style.backgroundColor = targetColor;
	} else if (method == "2") {//PASWORD WRONG
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	} else if (method == "3") {//BOTH WRONG
		element1 = document.getElementById("email");
		element1.style.backgroundColor = targetColor;
		element2 = document.getElementById("password");
		element2.style.backgroundColor = targetColor;
		setTimeout(function() {
			element1.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
			element2.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
		}, 2000)
		return;
	}
	setTimeout(function() {
		element.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
	}, 2000)
}

function showimg(data, id) {
    document.getElementById("showimg").src = data
    document.getElementById("hyper").href = data
    document.getElementById("hyper").download = `Evox${id}.png`
    $("#imgcontainerpopup").fadeIn("fast")
}

function close_img() {
    $("#imgcontainerpopup").fadeOut("fast", function() {
        document.getElementById("showimg").src = ""
        document.getElementById("hyper").href = ""
        document.getElementById("hyper").download = ""
    })
    
}

function goback() {
    if(document.getElementById("back").innerHTML.includes("#00b300")) {
        console.log("FIRE")
        window.history.back()
    }
    document.getElementById("back").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" viewBox="0 0 24 24" fill="none">
    <path d="M11 6L5 12M5 12L11 18M5 12H19" stroke="#00b300" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    setTimeout(function() {
        document.getElementById("back").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="29px" height="29px" viewBox="0 0 24 24" fill="none">
    <path d="M11 6L5 12M5 12L11 18M5 12H19" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    }, 3500)
    
}

function ch_acc() {
    let inner = document.getElementById("change-acc").innerHTML
    console.log(document.getElementById("change-acc").innerHTML);
    if(inner.includes("Login") === true) {
        $("#use_switch").fadeOut("slow", function() {
            document.getElementById("email").style.display = "none"
            document.getElementById("email").value = localStorage.getItem("t50-email")
                $("#rem-user").fadeIn("slow")
            document.getElementById("change-acc").innerHTML = `Change Account`
            return;
            
        })
    }
    document.getElementById("email").value = ""
    $("#rem-user").fadeOut("slow", function() {
        $("#email").fadeIn("slow")
        $("#use_switch").fadeIn("slow")
        document.getElementById("change-acc").innerHTML = `Login: ${localStorage.getItem("t50-username")}`
    })
}

function saveImagesToIndexedDB(jsonArray) {
    return new Promise((resolve, reject) => {
        // Open or create the IndexedDB database
        const request = indexedDB.open('T50Images', 1);

        // Define the IndexedDB database schema
        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            const objectStore = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('base64', 'base64', { unique: false });
        };

        // Handling errors
        request.onerror = function(event) {
            reject("IndexedDB error: " + event.target.errorCode);
        };

        // Handling success
        request.onsuccess = function(event) {
            const db = event.target.result;

            // Start a new transaction
            const transaction = db.transaction(['images'], 'readwrite');
            const objectStore = transaction.objectStore('images');

            // Iterate through the JSON array and save each base64 value
            jsonArray.forEach((base64, index) => {
                const imageData = { base64 };
                const request = objectStore.add(imageData);
                request.onerror = function(event) {
                    reject("Error adding image " + (index + 1) + ": " + event.target.error);
                };
            });

            // Transaction completion handling
            transaction.oncomplete = function() {
                resolve("Images saved to IndexedDB successfully.");
            };

            transaction.onerror = function(event) {
                reject("Transaction error: " + event.target.errorCode);
            };
        };
    });
}