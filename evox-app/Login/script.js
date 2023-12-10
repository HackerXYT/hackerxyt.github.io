$('.settings-button').click(function() {
	if (document.getElementById("popup").style.display == "" || document.getElementById("popup").style.display == "none") {
		document.getElementById("settings_username_ph").innerHTML = localStorage.getItem("username")
		$('#popup').fadeIn("slow");
	} else if (document.getElementById("popup").style.display == "block") {
		$('#popup').fadeOut("slow");
	}

});

function getUrlParameter(name) {
	name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }
  

if(localStorage.getItem("auto_t50") === "true") {
	console.log("Param",getUrlParameter('stop'))
	console.log(window.location.href)
	if(getUrlParameter('stop')) {
		console.log("Redirect Canceled")
	} else {
		window.location.href = "../../1index.html"
	}
}
let auto_login_username = localStorage.getItem("username")
let auto_login_password = localStorage.getItem("password")
if (auto_login_username && auto_login_password) {
	$("#container").fadeOut("slow", function() {
		document.getElementById("text").innerHTML = `
            <h1>Please Wait..</h1><p><div id="loading_indicator" style="grid-column: 1;display:none" class="item">
			<i class="loader --3"></i>
		</div></p><p>Your account information is being retrieved</p>`
		$("#text").fadeIn("slow", function() {
			$("#loading_indicator").fadeIn("fast")
			const url = `https://evox-app-data.memeguy21.repl.co/users/${auto_login_username}.json`;
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			// Set the request header (optional)
			xhr.setRequestHeader('Content-Type', 'application/json');

			// Handle the response
			xhr.onload = function() {
				if (xhr.status === 200) {
					console.log("Username Exists");//Show text html
					const response = JSON.parse(xhr.responseText);
					console.log(response)
					if (response === "Error, Not activated") {
						console.log("Not Activated")
						VerificationNeeded("1")
						sessionStorage.removeItem("last_pass_tried")
						sessionStorage.removeItem("last_username_tried")
						setTimeout(function() {
							document.getElementById("username").value = ""
							$("#password").fadeOut("slow", function() {
								$("#submit").fadeOut("slow", function() {
									document.getElementById("submit").innerHTML = `<svg width="30px" height="30px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5"/><circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/><circle id="outline" stroke="#07b481" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/><polyline id="check" stroke="#FFFFFF" stroke-width="5.5" points="41 70 56 85 92 49"/></g></svg>`
									document.getElementById("username").placeholder = "Verification Code"
									document.getElementById("info_text").innerHTML = "Enter The Verification Code Sent To Your Email<br><br><br><span onclick='cancel_verification()' style='color: red'>Cancel</span>"
									$("#info_text").fadeIn("slow", function() {
										document.getElementById("use_switch").innerHTML = `<div style="position: relative;"><input autocomplete="off" id="username" onkeydown="limit(this, 6);" onkeyup="limit(this, 6);" onkeyup="this.value = minmax(this.value, 0, 6)" type="text" class="input-box" placeholder="Verification Code" style="background-color: rgba(252, 252, 252, 0.26);">
                                  <div id="function_verify_button" onclick="verifycode('${auto_login_username}')" style="position: absolute; top: 50%; transform: translateY(-50%); right: 10px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" id="svgstroke" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                                      <path d="M5 12h14"></path>
                                      <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                  </div>
                                </div>`
										//document.getElementById("use_switch").innerHTML = `
										//<input onkeypress="handleKeyNumbers(event, 1)" onkeydown="handleKeyPress(event, 1)" autocomplete="off" id="code1" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
										//<input onkeyup="handleKeyNumbers(event, 2)" onkeydown="handleKeyPress(event, 2)" autocomplete="off" id="code2" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
										//<input onkeyup="handleKeyNumbers(event, 3)" onkeydown="handleKeyPress(event, 3)" autocomplete="off" id="code3" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
										//<input onkeyup="handleKeyNumbers(event, 4)" onkeydown="handleKeyPress(event, 4)" autocomplete="off" id="code4" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
										//<input onkeyup="handleKeyNumbers(event, 5)" onkeydown="handleKeyPress(event, 5)" autocomplete="off" id="code5" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
										//<input onkeyup="console.log('Complete')" onkeydown="handleKeyPress(event, 6)" autocomplete="off" id="code6" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">`
									})

									$("#text").fadeOut("slow", function() {
										$("#container").fadeIn("slow", function() {

										})
									})
								})
							})
						}, 1500)

						return;
					}
					const account_password = response.password;
					if (account_password !== auto_login_password) {
						console.log("Wrong Password");//Show text html
						localStorage.removeItem("username")
						localStorage.removeItem("password")
						$("#text").fadeOut("slow", function() {
							enable()
							document.getElementById("username").value = auto_login_username
							$("#container").fadeIn("slow", function() {
								fadeError("2")

							})
						})
					} else {
						console.log("Correct Password");//Show text html
						document.getElementById("submit").innerHTML = `<svg width="30px" height="30px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5"/><circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/><circle id="outline" stroke="#07b481" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/><polyline id="check" stroke="#FFFFFF" stroke-width="5.5" points="41 70 56 85 92 49"/></g></svg>`
						sessionStorage.removeItem("last_pass_tried")
						sessionStorage.removeItem("last_username_tried")
						setTimeout(function() {
							$("#container").fadeOut("slow", function() {
								$("#text").fadeOut("fast", function() {
									document.getElementById("text").innerHTML = `
                            <h1>Welcome to T50</h1><br>
                            <p style="text-align: center">All systems are operational.<br>Client is ready to connect, ${auto_login_username}.<!--<br><br>Click here to <a style="color: red" onclick="delete_acc()">Delete Your Account</a></p>--></p>
														<a style="display: none" onclick="load_app('chatvia')" href="#" id="app1"><img style="height:115px;width:115px;" src="../chatvia-select.png" alt="Logo" ></a>&nbsp;<a style="display: none" onclick="load_app('t50')" href="#" id="app2"><img style="height:115px;width:115px;" src="../t50-select.png" alt="Logo" ></a>			
			 
							<div style="display: none" class="loading loading--dots" title="Loading" id="loadapp">
  <svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 512 512" xml:space="preserve">
    <path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952
      s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
      <animate
             attributeName="fill"
             dur="3s"
             begin="0s"
             repeatCount="indefinite"
             values="#B200ED;
                     #2596be;
                     #B200ED;"/>
    </path>
    <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
      s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
             attributeName="fill"
             dur="3s" 
             begin="1s"
             repeatCount="indefinite"
             values="#B200ED;
                     #2596be;
                     #B200ED;"/>
    </path>
    <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
      S512,289.609,512,256S484.657,195.048,451.048,195.048z">
            <animate
             attributeName="fill"
             dur="3s" 
             begin="2s"
             repeatCount="indefinite"
             values="#B200ED;
                     #2596be;
                     #B200ED;"/>
    </path>
  </svg>
</div><p style="display:none" id="notice_text_app">Loading&nbsp;apps..</p>`
									$("#text").fadeIn("slow", function() {
										localStorage.setItem("username", auto_login_username)
										localStorage.setItem("password", auto_login_password)
										$("#bottom-logo").fadeOut("fast", function() {

											setTimeout(function() {
												document.getElementById("bottom-logo").src = "footer-in.png"
												$("#bottom-logo").fadeIn("slow", function() {
													$("#notice_text_app").fadeIn("slow")
													$("#loadapp").fadeIn("slow", function() {

														setTimeout(function() {
															$("#notice_text_app").fadeOut("slow")
															$("#loadapp").fadeOut("slow", function() {

																	$("#app2").fadeIn("slow", function() {

																	})

															})
														}, 2000)

													})
													setTimeout(function() {
														$("#bottom-logo").fadeOut("fast", function() {

															document.getElementById("bottom-logo").src = "evox-verified.png"
															$("#bottom-logo").fadeIn("slow", function() {
																setTimeout(function() {
																	$("#bottom-logo").fadeOut("fast", function() {
																		document.getElementById("bottom-logo").src = "footer-in.png"
																		$("#bottom-logo").fadeIn("slow", function() {

																		})
																	})
																}, 5000)
															})
														})
													}, 2000)
												})
											}, 1000)
										})
									})


									$("#settings").fadeIn("slow", function() {
										$("#register").fadeOut("slow", function() { })


									})
									// Animation complete.
								});
							});
						}, 1500)

					}
				} else {
					console.log('Username does not exist');//Show text html
					localStorage.removeItem("username")
					localStorage.removeItem("password")
					$("#text").fadeOut("slow", function() {
						enable()
						document.getElementById("username").value = auto_login_username
						document.getElementById("password").value = auto_login_password
						$("#container").fadeIn("slow", function() {
							fadeError("1")
						})
					})
					//setTimeout(function() {
					//    window.location.reload()
					//}, 1000)
				}
			};

			// Send the request
			xhr.send();
		});
	})
} else {
	$("#container").fadeIn("slow", function() {
		show_dash()
		$("#bottom-logo").fadeIn("slow", function() {
			$("#register").fadeIn("slow", function() { })
		})
	})
}

let username;
let password;
$("#submit").on("click", function() {
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
	password = document.getElementById("password").value;

	if (username == "") {
		fadeError("1")
		console.log("Type Something!"); //Show text html
		enable()
		return;
	} else if (password == "") {
		fadeError("2")
		console.log("Type Something!"); //Show text html
		enable()
		return;
	}
	if (sessionStorage.getItem("last_pass_tried") && sessionStorage.getItem("last_username_tried")) {
		if (sessionStorage.getItem("last_pass_tried") == password && sessionStorage.getItem("last_username_tried") == username) {
			console.log("Please do not spam our systems!") //Show text html
			enable()
			fadeError("3")
			return;
		}
	}
	sessionStorage.setItem("last_pass_tried", password)
	sessionStorage.setItem("last_username_tried", username)
	// Submit Clicked
	const url = `https://evox-app-data.memeguy21.repl.co/users/${username}.json`;
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	// Set the request header (optional)
	xhr.setRequestHeader('Content-Type', 'application/json');

	// Handle the response
	xhr.onload = function() {
		if (xhr.status === 200) {
			console.log("Username Exists");//Show text html
			const response = JSON.parse(xhr.responseText);
			console.log(response)
			if (response === "Error, Not activated") {
				console.log("Not Activated")
				VerificationNeeded("1")
				sessionStorage.removeItem("last_pass_tried")
				sessionStorage.removeItem("last_username_tried")
				setTimeout(function() {
					document.getElementById("username").value = ""
					$("#password").fadeOut("slow", function() {
						$("#submit").fadeOut("slow", function() {
							document.getElementById("submit").innerHTML = `<svg width="30px" height="30px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5"/><circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/><circle id="outline" stroke="#07b481" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/><polyline id="check" stroke="#FFFFFF" stroke-width="5.5" points="41 70 56 85 92 49"/></g></svg>`
							document.getElementById("username").placeholder = "Verification Code"
							document.getElementById("info_text").innerHTML = "Enter The Verification Code Sent To Your Email<br><br><br><span onclick='cancel_verification()' style='color: red'>Cancel</span>"
							$("#info_text").fadeIn("slow", function() {
								document.getElementById("use_switch").innerHTML = `<div style="position: relative;"><input autocomplete="off" id="username" onkeydown="limit(this, 6);" onkeyup="limit(this, 6);" onkeyup="this.value = minmax(this.value, 0, 6)" type="text" class="input-box" placeholder="Verification Code" style="background-color: rgba(252, 252, 252, 0.26);">
                                  <div onclick="verifycode('${username}')" style="position: absolute; top: 50%; transform: translateY(-50%); right: 10px;">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 20px; height: 20px;">
                                      <path d="M5 12h14"></path>
                                      <path d="M12 5l7 7-7 7"></path>
                                    </svg>
                                  </div>
                                </div>`
								//document.getElementById("use_switch").innerHTML = `
								//<input onkeypress="handleKeyNumbers(event, 1)" onkeydown="handleKeyPress(event, 1)" autocomplete="off" id="code1" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
								//<input onkeyup="handleKeyNumbers(event, 2)" onkeydown="handleKeyPress(event, 2)" autocomplete="off" id="code2" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
								//<input onkeyup="handleKeyNumbers(event, 3)" onkeydown="handleKeyPress(event, 3)" autocomplete="off" id="code3" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
								//<input onkeyup="handleKeyNumbers(event, 4)" onkeydown="handleKeyPress(event, 4)" autocomplete="off" id="code4" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
								//<input onkeyup="handleKeyNumbers(event, 5)" onkeydown="handleKeyPress(event, 5)" autocomplete="off" id="code5" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">
								//<input onkeyup="console.log('Complete')" onkeydown="handleKeyPress(event, 6)" autocomplete="off" id="code6" type="text" class="input-box" style="background-color: rgba(252, 252, 252, 0.26);width: 25px;height: 25px">`
							})

							$("#register").fadeOut("slow", function() {

							})
						})
					})
				}, 1500)

				return;
			}
			const account_password = response.password;
			if (account_password !== password) {
				fadeError("2")
				console.log("Wrong Password");//Show text html
				enable()
			} else {
				console.log("Correct Password");//Show text html
				document.getElementById("submit").innerHTML = `<svg width="30px" height="30px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5"/><circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/><circle id="outline" stroke="#07b481" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/><polyline id="check" stroke="#FFFFFF" stroke-width="5.5" points="41 70 56 85 92 49"/></g></svg>`
				sessionStorage.removeItem("last_pass_tried")
				sessionStorage.removeItem("last_username_tried")
				localStorage.setItem("username", username)
				localStorage.setItem("password", password)
				setTimeout(function() {
					$("#container").fadeOut("slow", function() {
						document.getElementById("text").innerHTML = `
                            <h1>Welcome to T50</h1><br>
                            <p>All systems are operational.<br>Your pathway to the clearnet server is open, ${localStorage.getItem("username")}.<!--<br><br>Click here to <a style="color: red" onclick="delete_acc()">Delete Your Account</a></p>--></p>
														<a style="display: none" onclick="load_app('chatvia')" href="#" id="app1"><img style="height:115px;width:115px;" src="../chatvia-select.png" alt="Logo" ></a>&nbsp;<a style="display: none" onclick="load_app('t50')" href="#" id="app2"><img style="height:115px;width:115px;" src="../t50-select.png" alt="Logo" ></a>			
					<div style="display: none" class="loading loading--dots" title="Loading" id="loadapp">
  <svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 512 512" xml:space="preserve">
    <path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952
      s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
      <animate
             attributeName="fill"
             dur="3s"
             begin="0s"
             repeatCount="indefinite"
             values="#B200ED;
                     #2596be;
                     #B200ED;"/>
    </path>
    <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
      s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
             attributeName="fill"
             dur="3s" 
             begin="1s"
             repeatCount="indefinite"
             values="#B200ED;
                     #2596be;
                     #B200ED;"/>
    </path>
    <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
      S512,289.609,512,256S484.657,195.048,451.048,195.048z">
            <animate
             attributeName="fill"
             dur="3s" 
             begin="2s"
             repeatCount="indefinite"
             values="#B200ED;
                     #2596be;
                     #B200ED;"/>
    </path>
  </svg>
</div><p style="display:none" id="notice_text_app">Loading&nbsp;apps..</p>`
						$("#text").fadeIn("slow", function() {
							
							$("#bottom-logo").fadeOut("fast", function() {

								setTimeout(function() {
									document.getElementById("bottom-logo").src = "footer-in.png"
									$("#bottom-logo").fadeIn("slow", function() {
										$("#notice_text_app").fadeIn("slow")
										$("#loadapp").fadeIn("slow", function() {

											setTimeout(function() {
												$("#notice_text_app").fadeOut("slow")
												$("#loadapp").fadeOut("slow", function() {

														$("#app2").fadeIn("slow", function() {

														})
												})
											}, 2000)

										})
										setTimeout(function() {
											$("#bottom-logo").fadeOut("fast", function() {

												document.getElementById("bottom-logo").src = "evox-verified.png"
												document.getElementById("bottom-logo").src = "evox-verified.png"
												$("#bottom-logo").fadeIn("slow", function() {
													setTimeout(function() {
														$("#bottom-logo").fadeOut("fast", function() {
															document.getElementById("bottom-logo").src = "footer-in.png"
															$("#bottom-logo").fadeIn("slow", function() {

															})
														})
													}, 5000)
												})
											})
										}, 2000)
									})
								}, 1000)
							})
							$("#settings").fadeIn("slow", function() {
								$("#register").fadeOut("slow", function() { })


							})
							// Animation complete.
						});
					});
				}, 1500)

			}
		} else {
			fadeError("1")
			console.log('Username does not exist');//Show text html
			enable()
		}
	};

	// Send the request
	xhr.send();
});


// Fade duration in milliseconds

function fadeError(method) {
	var targetColor = "rgb(255, 99, 71)";
	var fadeDuration = 2000;
	let element;
	if (method == "1") {
		element = document.getElementById("username");
		element.style.backgroundColor = targetColor;
	} else if (method == "2") {
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	} else if (method == "3") {
		element1 = document.getElementById("username");
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

function VerificationNeeded(method) {
	var targetColor = "rgb(169, 173, 43)";
	var fadeDuration = 2000;
	let element;
	if (method == "1") {//username
		element = document.getElementById("username");
		element.style.backgroundColor = targetColor;
	} else if (method == "2") {//password
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	} else if (method == "3") {//all
		element = document.getElementById("username");
		element.style.backgroundColor = targetColor;
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	}
	setTimeout(function() {
		element.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
	}, 2000)
}
function enable() {
	setTimeout(function() {
		$("#register").fadeIn("slow", function() { })
		document.getElementById("submit").disabled = false;
		document.getElementById("submit").innerHTML = `Login`
	}, 500)
}
const input = document.getElementById('username');
const button = document.getElementById('submit');
input.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		// Simulate a click on the button
		button.click();
	}
});
const input2 = document.getElementById('password');
input2.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		// Simulate a click on the button
		button.click();
	}
});


var holdTimer;

function startHoldTimer() {
	holdTimer = setTimeout(doSomething, 500); // 2000 milliseconds = 2 seconds
}

function cancelHoldTimer() {
	clearTimeout(holdTimer);
}

function doSomething() {
	if (confirm('Log off your account?')) {
		// Save it!
		$("#bottom-logo").fadeOut("fast", function() {
			setTimeout(function() {
				document.getElementById("bottom-logo").src = "another_logo.png"
				$("#bottom-logo").fadeIn("slow", function() {
				})
			}, 1000)

		})
		localStorage.removeItem("username")
		localStorage.removeItem("password")
		$("#text").fadeOut("slow", function() {
			enable()
			$("#settings").fadeOut("slow", function() {
				document.getElementById("username").value = ""
				document.getElementById("password").value = ""
				$("#container").fadeIn("slow", function() {
				})
			})
		})
	} else {
		// Do nothing!
	}
}

var button2 = document.getElementById("settings");
button2.addEventListener("mousedown", startHoldTimer);
button2.addEventListener("mouseup", cancelHoldTimer);
button2.addEventListener("mouseleave", cancelHoldTimer);

// Touch events
button2.addEventListener("touchstart", startHoldTimer);
button2.addEventListener("touchend", cancelHoldTimer);
button2.addEventListener("touchcancel", cancelHoldTimer);

function goto_register() {
	$("#container").fadeOut("slow", function() {
		$("#bottom-logo").fadeOut("slow", function() {
			$("#register").fadeOut("slow", function() {
				window.location.href = "../Register/index.html"
			})
		})
	})
}

function limit(element, max_chars) {
	if (element.value.length > max_chars) {
		element.value = element.value.substr(0, max_chars);
	}
}
function minmax(value, min, max) {
	if (parseInt(value) < min || isNaN(parseInt(value)))
		return 0;
	else if (parseInt(value) > max)
		return 100;
	else return value;
}

function delete_acc() {
	const jsonUrl = `https://evox-app-data.memeguy21.repl.co/users/${localStorage.getItem("username")}-${localStorage.getItem("password")}.remove`;

	fetch(jsonUrl)
	$("#bottom-logo").fadeOut("fast", function() {
		setTimeout(function() {
			document.getElementById("bottom-logo").src = "another_logo.png"
			$("#bottom-logo").fadeIn("slow", function() {
			})
		}, 1000)

	})
	localStorage.removeItem("username")
	localStorage.removeItem("password")
	$("#text").fadeOut("slow", function() {
		$("#popup").fadeOut("slow", function() {
		})
		enable()
		$("#settings").fadeOut("slow", function() {
			document.getElementById("username").value = ""
			document.getElementById("password").value = ""
			$("#container").fadeIn("slow", function() {
			})
		})
	})
}

function logoff() {
	$("#popup").fadeOut("slow")
	doSomething()
}

function close_popup() {
	$("#popup").fadeOut("slow")
}

function restart() {
	$("#popup").fadeOut("fast", function() {
		$("#text").fadeOut("fast", function() {
			$("#bottom-logo").fadeOut("fast", function() {
				$("#settings").fadeOut("fast", function() {
					window.location.reload()
				})
			})
		})

	})

}

//function handleKeyPress(event, input) {
//    if (event.key === 'Backspace') {
//        console.log("Current Input= code"+input)
//            document.getElementById(`code${input}`).value = ""
//            if(input == "1") {
//                
//            } else {
//                const goto = String(Number(input)-Number(1))
//                console.log("Will switch to code"+goto)
//                document.getElementById(`code${goto}`).focus()
//
//                // Perform your desired action here
//                console.log('Backspace key released');
//
//            }
//            
//    }
//}

document.addEventListener('touchmove', function(event) {
	event.preventDefault();
}, { passive: false });

//unction handleKeyNumbers(event, input) {
//   if(input == 1) {
//           $("#code2").focus();
//           console.log("Trying to focus on 2")
//           return;
//       }
//   if (event.keyCode >= 48 && event.keyCode <= 57) {
//       if(input == 1) {
//           $("#code2").focus();
//           console.log("Trying to focus on 2")
//           return;
//       }
//     console.log("A number key was pressed!");
//     document.getElementById(`code${String(Number(input)+Number(1))}`).focus();
//     console.log("Focusing On", String(Number(input)+Number(1)))
//   }
//

function verifycode(username) {
	$("#function_verify_button").fadeOut("fast")
	let code;
	if (document.getElementById("username").value === "") {
		document.getElementById("username").classList.add('shake');
		setTimeout(function() {
			document.getElementById("username").classList.remove('shake');
		}, 250)
	} else {
		code = document.getElementById("username").value
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
				if (error.message == `Unexpected token 'A', "Account Activated" is not valid JSON`) {

					console.log("Succesful Activation!")
					$("#text").fadeOut("slow", function() {
						$("#container").fadeOut("slow", function() {
							window.location.reload()
						})
					})
				}
			});
		$("#function_verify_button").fadeIn("fast", function() {
			document.getElementById("svgstroke").style.stroke = "#FF0000";
			setTimeout(function() {
				document.getElementById("svgstroke").style.stroke = "#fff";
			}, 1500)
		})


	}
}

function cancel_verification() {
	$("#info_text").fadeOut("slow", function() {
		$("#use_switch").fadeOut("slow", function() {
			localStorage.removeItem("username")
			localStorage.removeItem("password")
			document.getElementById("use_switch").innerHTML = `<input autocomplete="off" id="username" type="text" class="input-box" placeholder="Username">`
			document.getElementById("password").value = ""
			document.getElementById("submit").innerHTML = "Login"
			$("#password").fadeIn("slow", function() {
				$("#use_switch").fadeIn("slow", function() {
					$("#submit").fadeIn("slow", function() {
						$("#register").fadeIn("slow", function() {
							console.log("Back to normal")
						})
					})
				})
			})
		})
	})
}

function load_app(application) {
	if (application === "chatvia") {
		if (!localStorage.getItem("user")) {
			localStorage.setItem("user", localStorage.getItem("username"))
			$("#popup").fadeOut("fast", function() {
				$("#text").fadeOut("fast", function() {
					$("#bottom-logo").fadeOut("fast", function() {
						$("#settings").fadeOut("fast", function() {
							window.location.href = "../ChatVia"
						})
					})
				})
			})
		} else {
			$("#popup").fadeOut("fast", function() {
				$("#text").fadeOut("fast", function() {
					$("#bottom-logo").fadeOut("fast", function() {
						$("#settings").fadeOut("fast", function() {
							window.location.href = "../ChatVia"
						})
					})
				})
			})
		}
	} else if (application === "t50") {
		localStorage.setItem("auto_t50", true)
		$("#popup").fadeOut("fast", function() {
			$("#text").fadeOut("fast", function() {
				$("#bottom-logo").fadeOut("fast", function() {
					$("#settings").fadeOut("fast", function() {
						window.location.href = "../../1index.html"
					})
				})
			})
		})
	}

}

function show_dash() {
	$("#container").fadeOut("slow", function() {
		$("#text").fadeOut("fast", function() {
			document.getElementById("text").innerHTML = `
	<h1>Welcome to T50</h1><br>
	<p style="text-align: center">All systems are operational.<br>Client is ready to connect, ${auto_login_username}.<!--<br><br>Click here to <a style="color: red" onclick="delete_acc()">Delete Your Account</a></p>--></p>
								<a style="display: none" onclick="load_app('chatvia')" href="#" id="app1"><img style="height:115px;width:115px;" src="../chatvia-select.png" alt="Logo" ></a>&nbsp;<a style="display: none" onclick="load_app('t50')" href="#" id="app2"><img style="height:115px;width:115px;" src="../t50-select.png" alt="Logo" ></a>			

	<div style="display: none" class="loading loading--dots" title="Loading" id="loadapp">
<svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 512 512" xml:space="preserve">
<path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952
s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
<animate
attributeName="fill"
dur="3s"
begin="0s"
repeatCount="indefinite"
values="#B200ED;
#2596be;
#B200ED;"/>
</path>
<path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
attributeName="fill"
dur="3s" 
begin="1s"
repeatCount="indefinite"
values="#B200ED;
#2596be;
#B200ED;"/>
</path>
<path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
S512,289.609,512,256S484.657,195.048,451.048,195.048z">
<animate
attributeName="fill"
dur="3s" 
begin="2s"
repeatCount="indefinite"
values="#B200ED;
#2596be;
#B200ED;"/>
</path>
</svg>
</div><p style="display:none" id="notice_text_app">Loading&nbsp;apps..</p>`
			$("#text").fadeIn("slow", function() {
				localStorage.setItem("username", auto_login_username)
				localStorage.setItem("password", auto_login_password)
				$("#bottom-logo").fadeOut("fast", function() {

					setTimeout(function() {
						document.getElementById("bottom-logo").src = "footer-in.png"
						$("#bottom-logo").fadeIn("slow", function() {
							$("#notice_text_app").fadeIn("slow")
							$("#loadapp").fadeIn("slow", function() {

								setTimeout(function() {
									$("#notice_text_app").fadeOut("slow")
									$("#loadapp").fadeOut("slow", function() {

											$("#app2").fadeIn("slow", function() {

											})

									})
								}, 2000)

							})
							setTimeout(function() {
								$("#bottom-logo").fadeOut("fast", function() {

									document.getElementById("bottom-logo").src = "evox-verified.png"
									$("#bottom-logo").fadeIn("slow", function() {
										setTimeout(function() {
											$("#bottom-logo").fadeOut("fast", function() {
												document.getElementById("bottom-logo").src = "footer-in.png"
												$("#bottom-logo").fadeIn("slow", function() {

												})
											})
										}, 5000)
									})
								})
							}, 2000)
						})
					}, 1000)
				})
			})


			$("#settings").fadeIn("slow", function() {
				$("#register").fadeOut("slow", function() { })


			})
			// Animation complete.
		});
	});
}