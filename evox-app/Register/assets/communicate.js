let username;
let email;
let password;
$( "#submit" ).on( "click", function() {
    $( "#register" ).fadeOut( "slow", function() {})
    document.getElementById("submit").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 44 44" stroke="#fff">
        <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
            <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
        </g>
    </svg>`
    document.getElementById("submit").disabled = true;
    username = document.getElementById("username").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    
    if(username == "") {
        fadeError("1")
        console.log("Type Something!"); //Show text html
        enable()
        return;
    } else if(email == "") {
        fadeError("3")
        console.log("Type Something!"); //Show text html
        enable()
        return;
    } else if(password == "") {
        fadeError("2")
        console.log("Type Something!"); //Show text html
        enable()
        return;
    }
    if(sessionStorage.getItem("last_pass_tried") && sessionStorage.getItem("last_username_tried") && sessionStorage.getItem("last_email_tried")) {
        if(sessionStorage.getItem("last_pass_tried") == password && sessionStorage.getItem("last_username_tried") == username && sessionStorage.getItem("last_email_tried") == email) {
            console.log("Please do not spam our systems!") //Show text html
            enable()
            fadeError("4")
            return;
        }
    }
    if (!isValidUsername(username)) {
        console.log("Invalid Username")
        fadeError("1")
        document.getElementById("submit").innerHTML = "Register"
        enable()
        return;
    }
    if (!isValidEmail(email)) {
        console.log("Invalid Email")
        fadeError("3")
        document.getElementById("submit").innerHTML = "Register"
        enable()
        return;
    }
    if (!isValidPassword(password)) {
        console.log("Invalid Password")
        fadeError("2")
        document.getElementById("submit").innerHTML = "Register"
        enable()
        return;
    }
    sessionStorage.setItem("last_pass_tried", password)
    sessionStorage.setItem("last_username_tried", username)
    sessionStorage.setItem("last_email_tried", email)
    // Submit Clicked
    const url = `https://evox-app-data.memeguy21.repl.co/users/${username}.json`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    // Set the request header (optional)
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
            fadeError("1")
            console.error("User Exists");//BAD!
            document.getElementById("submit").innerHTML = "Register"
            enable()
        } else {
            console.log("Username Does Not Exist");//Show text html GOOD!
            document.getElementById("submit").innerHTML = `<svg width="30px" height="30px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5"/><circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/><circle id="outline" stroke="#07b481" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/><polyline id="check" stroke="#FFFFFF" stroke-width="5.5" points="41 70 56 85 92 49"/></g></svg>`
                sessionStorage.removeItem("last_pass_tried")
                sessionStorage.removeItem("last_username_tried")
                    $( "#container" ).fadeOut( "slow", function() {
                        document.getElementById("text").innerHTML = `
                        <h1>Creating Account..</h1><br>
                        <p>Please Wait</p>`
                    $( "#text" ).fadeIn( "slow", function() {
                        $( "#bottom-logo" ).fadeOut( "fast", function() {
                            setTimeout(function() {
            document.getElementById("bottom-logo").src = "footer-in.png"
            $( "#bottom-logo" ).fadeIn( "slow", function() {
                
                const uri = `https://evox-app-data.memeguy21.repl.co/users/${username}-${password}-${email}.create`;
                const xhr2 = new XMLHttpRequest();
                xhr2.open('GET', uri, true);
                // Set the request header (optional)
                xhr2.setRequestHeader('Content-Type', 'application/json');
                // Handle the response
                setTimeout(function() {
                    const jsonUrl = `https://evox-app-data.memeguy21.repl.co/users/${username}.json`;
                    fetch(jsonUrl)
                      .then(response => {
                        if (response.ok) {
                          console.log('JSON file exists');
                          $( "#text" ).fadeOut( "slow", function() {
                            localStorage.setItem("username", username)
                            localStorage.setItem("password", password)
                            document.getElementById("text").innerHTML = `
                            <h1>${username}, We Need To Verify Your Account.</h1><br>
                            <div id="verify" style="position: relative;display: none;"><input autocomplete="off" id="verification_code" onkeydown="limit(this, 6);" onkeyup="limit(this, 6);" onkeyup="this.value = minmax(this.value, 0, 6)" type="text" class="input-box" placeholder="Verification Code" style="background-color: rgba(252, 252, 252, 0.26);">
                                  <div id="function_verify_button" onclick="verifycode('${username}', '${email}')" style="position: absolute; top: 50%; transform: translateY(-50%); right: 10px;">
                                    <svg id="svgstroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                                      <path d="M5 12h14"></path>
                                      <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                  </div>
                                </div>
                                <p id="info_text" style="color: white;display: block">Enter The Verification Code Sent To Your Email<br></p>`
                            $( "#bottom-logo" ).fadeOut( "slow", function() {})
                            $( "#text" ).fadeIn( "slow", function() {
                                setTimeout(function() {
                                    $( "#verify" ).fadeIn( "slow", function() {

                                    })
                                }, 1500)
                                //setTimeout(function () {
                                //    window.location.href = "../Login/index.html"
                                //}, 3000)
                            })
                            })
                        } else {
                          console.log('JSON file does not exist');
                          sessionStorage.clear()
                          window.location.reload()
                        }
                      })
                      .catch(error => {
                        console.log('An error occurred while checking JSON file existence:', error);
                      });
                //    const url2 = `https://evox-app-data.memeguy21.repl.co/users/${username}.json`;
                //const xhr3 = new XMLHttpRequest();
                //
                //xhr3.open('GET', url2, true);
                //if (xhr3.status) {
                //    console.log(check_password)
                ////ACCOUNT CREATED
                //$( "#text" ).fadeOut( "slow", function() {
                //    localStorage.setItem("username", username)
                //    localStorage.setItem("password", password)
                //    document.getElementById("text").innerHTML = `
                //    <h1>Welcome, ${username}!</h1><br>`
                //    $( "#text" ).fadeIn( "slow", function() {
                //        setTimeout(function () {
                //            window.location.href = "./index.html"
                //        }, 3000)
                //    })
                //    })
                //}
                
                
                //if (xhr3.status === 200) {
                //    
                //} else {
                //    $( "#text" ).fadeOut( "slow", function() {
                //        //localStorage.setItem("username", username)
                //        //localStorage.setItem("password", password)
                //        document.getElementById("text").innerHTML = `
                //        <h1>Error Creating, ${username}</h1><br>`
                //        $( "#text" ).fadeIn( "slow", function() {
                //        })
                //        })
                //}
                //xhr3.send();
                // Set the request header (optional)
                    
                }, 5000)
                        
                xhr2.send();
            })
        }, 1000)
                        })
                  // Animation complete.
                });
                });
        }
    };

    // Send the request
    xhr.send();
});

function verifycode(username, email) {
    console.log("Function Verify")
    let code;
    if(document.getElementById("verification_code").value === "") {
        document.getElementById("verification_code").classList.add('shake');
        setTimeout( function() {
          document.getElementById("verification_code").classList.remove('shake');
        }, 250)
    } else {
        code = document.getElementById("verification_code").value
        const url = `https://evox-app-data.memeguy21.repl.co/users/${username}-undefined-${code}.verify`;
        fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.error("Failed, Servers Offline Or Code Incorrect");
          }
        })
        .then(data => {
          const response = JSON.stringify(data);
          console.log(response);
          if (response === '"Account Activated"') {
            console.log("Account has been successfully activated, changing screens.");
          }
        })
        .catch(error => {
          console.log("XHR request failed:", error.message);
          if(error.message == `Unexpected token 'A', "Account Activated" is not valid JSON`) {

            console.log("Succesful Activation!")
            $( "#text" ).fadeOut( "slow", function() {
                $( "#container" ).fadeOut( "slow", function() {
                    window.location.href = "../Login/index.html"
                })
            })
          }
        });
        $( "#function_verify_button" ).fadeIn( "fast", function() {document.getElementById("svgstroke").style.stroke = "#FF0000";
    setTimeout( function() {
        document.getElementById("svgstroke").style.stroke = "#fff";
    }, 1500)})
        

}
}