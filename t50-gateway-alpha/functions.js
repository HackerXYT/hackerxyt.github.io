function fadeError(method) {
	var targetColor = "rgb(255, 99, 71)";
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

function skip() {
    log("Skipped!", "red")
    $("#container").fadeIn("slow", function() {
        $("#loading").fadeOut("slow")
        $("#loading-div-text").fadeOut("fast")
        $("#loading-text").fadeOut("slow")
    })
}

function log(text, color) {
    const styles = `color: ${color}; font-size: 16px; font-weight: normal;`;
    console.log('%c'+text, styles)
}

function setup() {
	log("T50 Gateway V:Delta 5", "red")
	if(localStorage.getItem("t50-username") === "papostol") {
		$("#map").fadeIn("fast")
	}
    let lg_status = sessionStorage.getItem("loaded")
    if(lg_status === "true") {
		let username = localStorage.getItem("t50-username")
		let email = localStorage.getItem("t50-email")
		$("#user-text").html(username)
        log("Loading Gateway", "green")
        $("#container").fadeOut("slow", function() {
			$("#gateway").fadeIn("slow")
			if(username != null && email != null) {
				sessionStorage.setItem("skipped", "yes")
				$("#user-text").html(username)
					log("Loading Gateway", "green")
					$("#container").fadeOut("fast")
						$("#loading").fadeIn("slow")
						$("#stuck").fadeOut("slow")
						fetch(`https://evox-accounts-database.onrender.com?applications=get&email=${localStorage.getItem("t50-email")}`)
							.then(response => {
								if (!response.ok) {
									throw new Error(`HTTP error! Status: ${response.status}`);
								}
								return response.text();
							})
							.then(data => {
								//document.body.style.overflow = 'hidden';
								if(data === "No Apps Owned") {
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
									if(notes === "owned") {//OWN NOTES
										localStorage.setItem("notes-owned", true)
										document.getElementById("apps").innerHTML = `<a onclick="load('notes')" href="#loadapp-notes"><img src="EvoxNotes.png" class="app"></img></a>`
									} else {
										localStorage.setItem("notes-owned", false)
										document.getElementById("apps").innerHTML = `<a onclick="buy('notes')" href="#loadapp-notes-disabled"><img src="EvoxNotes.png" class="disabledapp"></img></a>`
									}
									if(images === "owned") {//OWN IMAGES
										localStorage.setItem("images-owned", true)
										if(document.getElementById("apps").innerHTML != "") {
											document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('images')" href="#loadapp-images"><img src="t50-img.png" class="app"></img></a>`
										} else {
											document.getElementById("apps").innerHTML = `<a onclick="load('images')" href="#loadapp-images"><img src="t50-img.png" class="app"></img></a>`
										}
									} else {
										localStorage.setItem("images-owned", false)
										if(document.getElementById("apps").innerHTML != "") {
											document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="buy('images')" href="#loadapp-images-disabled"><img src="t50-img.png" class="disabledapp"></img></a>`
										} else {
											document.getElementById("apps").innerHTML = `<a onclick="buy('images')" href="#loadapp-images-disabled"><img src="t50-img.png" class="disabledapp"></img></a>`
										}
									}
									if(chatvia === "owned") { //OWN CHATVIA
										localStorage.setItem("chatvia-owned", true)
										if(document.getElementById("apps").innerHTML != "") {
											document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('chatvia')" href="#loadapp-chatvia"><img src="chatvia-img.png" class="app"></img></a>`
										} else {
											document.getElementById("apps").innerHTML = `<a onclick="load('chatvia')" href="#loadapp-chatvia"><img src="chatvia-img.png" class="app"></img></a>`
										}
									} else {
										localStorage.setItem("chatvia-owned", false)
										if(document.getElementById("apps").innerHTML != "") {
											document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="buy('chatvia')" href="#loadapp-chatvia-disabled"><img src="chatvia-img.png" class="disabledapp"></img></a>`
										} else {
											document.getElementById("apps").innerHTML = `<a onclick="buy('chatvia')" href="#loadapp-chatvia-disabled"><img src="chatvia-img.png" class="disabledapp"></img></a>`
										}
									}
									$("#apps").fadeIn("slow")
									$("#loading-apps-text").fadeOut("slow", function() {
										document.getElementById("loading-apps-text").innerHTML = `Here are the available T50 applications`
										$("#loading-apps-text").fadeIn("slow")
									})
									$("#loading").fadeOut("slow")
									uielements()
									
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
        log("Error! Cannot Load Page When Logged Out.", "red")
    }
}

function load(app) {
	let notes = localStorage.getItem("notes-owned")
	let images = localStorage.getItem("images-owned")
	let chatvia = localStorage.getItem("chatvia-owned")
	if(app === "notes") {
		if(notes === "true") {
			window.location.href = "./Notes/"
		} else {
			log("App Not Owned!", "red")
		}
	} else if(app === "images") {
		if(images === "true") {
			window.location.href = "./Images/"
		} else {
			log("App Not Owned!", "red")
		}
	} else if(app === "chatvia") {
		if(chatvia === "true") {
			window.location.href = "./customize/"
		} else {
			log("App Not Owned!", "red")
		}
	}
}

function buy(app) {
	$("#loading").fadeIn("slow")
	$("#popup").fadeOut("slow", function() {
		$(`#buy${app}`).fadeIn("fast")
		$("#buy-products").fadeIn("slow", function() {
			$("#loading").fadeOut("slow")
		})
	})
	//Say that user doesnt own the app ask if he wants to buy it
}

function buy_back() {
	$("#bottom-logo").fadeOut("slow")
	document.getElementById('gateway').style.filter = 'none'
	let pm_cc_sb = document.getElementById("cc-pm")//Payment method credit card standby
	let pm_pp_sb = document.getElementById("pp-pm")
	let pm_code_sb = document.getElementById("ccode-pm")
	pm_cc_sb.checked = false;
	pm_pp_sb.checked = false;
	pm_code_sb.checked = false;
	$("#buy-products").fadeOut("slow", function() {
		$(`#buychatvia`).fadeOut("fast")
		$(`#buyimages`).fadeOut("fast")
		$(`#buynotes`).fadeOut("fast")
		$("#purchase").fadeOut("fast")
		$("#choose_pm").fadeIn("slow")
			$("#code_pm").fadeOut("slow")
	})
}

function purchase(app) {
	if(app === "notes") {
		document.getElementById("purch-app-img").src = "EvoxNotes.png"
		document.getElementById("purch-app-text").innerHTML = "T50 Notes"
	} else if (app === "images") {
		document.getElementById("purch-app-img").src = "t50-img.png"
		document.getElementById("purch-app-text").innerHTML = "T50 Images"
	} else if (app === "chatvia") {
		document.getElementById("purch-app-img").src = "chatvia-img.png"
		document.getElementById("purch-app-text").innerHTML = "Chatvia"
	} else {
		log("A compatible app hasn't been defined")
	}
	$(`#buychatvia`).fadeOut("fast",function() {
		$(`#buyimages`).fadeOut("fast", function() {
			$(`#buynotes`).fadeOut("fast", function() {
				$("#purchase").fadeIn("fast")
				document.getElementById("cont-pur").innerHTML = `<button onclick="continue_purch('${app}')" class="transparent-button" style="width:100%">Continue</button>`
			})
		})
	})	
}

function continue_purch(app) {
	let pm_cc = document.getElementById("cc-pm").checked
	let pm_pp = document.getElementById("pp-pm").checked
	let pm_code = document.getElementById("ccode-pm").checked
	if(pm_cc) {
		log("Got pm_cc", "green")
		alert("Credit Card Purchases Are Currently Not Available!")
	} else if(pm_pp) {
		log("Got pm_pp", "green")
		alert("PayPal Purchases Are Currently Not Available!")
	} else if(pm_code) {
		log("Got pm_code", "green")
		$("#choose_pm").fadeOut("slow", function() {
			$("#code_pm").fadeIn("slow")
			document.getElementById("cont-pur").innerHTML = `<button onclick="check_ccode('${app}')" class="transparent-button" style="width:100%">Confirm</button>`
		})
	} else {
		log("Operation Failed", "red")
	}
}

function check_ccode(app) {
	$("#loading").fadeIn("slow")
	let coupon = document.getElementById("coupon").value
	const url = `https://evox-accounts-database.onrender.com?applications=${app}&coupon=${coupon}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
		console.log(data)
		const capitalizedApp = app.charAt(0).toUpperCase() + app.slice(1);
        if(data === `Registered To Evox ${capitalizedApp}`){
			if(localStorage.getItem("t50-autologin") === "true"){
				console.log("Nothing")
				$("#loading").fadeOut("slow")
				$("#gateway").fadeOut("slow")
				$("#buy-products").fadeOut("slow", function() {
					document.getElementById("gateway").innerHTML = `<div class="animation-ctn container">
					<div class="icon icon--order-success svg">
						<svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">  
						  <g fill="none" stroke="#22AE73" stroke-width="2"> 
							<circle cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
							<circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
							<polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px;"/>   
						  </g> 
						</svg>
					  </div>
			  </div>`
			  $("#gateway").fadeIn("slow", function(){
				document.getElementById('gateway').style.filter = 'none'
				setTimeout(function() {
					restart()
				}, 2000)
			  })
				})
				
				
			} else {
				localStorage.setItem("t50-autologin", true)
				localStorage.setItem("remove-autolg", true)
				document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
				$("#loading").fadeOut("slow")
				$("#gateway").fadeOut("slow")
				$("#buy-products").fadeOut("slow", function() {
					document.getElementById("gateway").innerHTML = `<div class="animation-ctn container">
					<div class="icon icon--order-success svg">
						<svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">  
						  <g fill="none" stroke="#22AE73" stroke-width="2"> 
							<circle cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
							<circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
							<polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8 63.7,97.9 112.2,49.4 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px;"/>   
						  </g> 
						</svg>
					  </div>
			  </div>`
			  $("#gateway").fadeIn("slow", function(){
				document.getElementById('gateway').style.filter = 'none'
				setTimeout(function() {
					restart()
				}, 2000)
			  })
				})
			}
		} else if(data === "Invalid Coupon") {
			$("#loading").fadeOut("slow")
			document.getElementById(`coupon`).classList.add('shake');
        	setTimeout(function () {
        	    document.getElementById(`coupon`).classList.remove('shake');
        	}, 500);
		} else if(data === `Evox ${capitalizedApp} is already owned by ${localStorage.getItem("t50-username")}`) {
			$("#loading").fadeOut("slow")
			document.getElementById(`coupon`).classList.add('shake');
        	setTimeout(function () {
        	    document.getElementById(`coupon`).classList.remove('shake');
        	}, 500);
			localStorage.setItem("t50-autologin", true)
			localStorage.setItem("remove-autolg", true)
			document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
			restart()
		} else if(data === "Application Does Not Exist") {
			log("Function Wasn't Used Correctly")
		}
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
}
function uielements() {
	let notes = localStorage.getItem("notes-owned")
	let images = localStorage.getItem("images-owned")
	let chatvia = localStorage.getItem("chatvia-owned")
	console.log(notes, images, chatvia)
	$("#settings").fadeIn("slow")
	document.getElementById("usr-img").src = "loading.gif"
	pfp()
	document.getElementById("usr-name").innerHTML = localStorage.getItem("t50-username")
	document.getElementById("usr-email").innerHTML = localStorage.getItem("t50-email")
	if(notes == "true") {
		console.log("Notes OK")
		document.getElementById("notes-own-ui-status").innerHTML = "Owned"
	} else if(notes == "false") {
		console.log("Notes Not")
		document.getElementById("notes-own-ui-status").innerHTML = `Not Owned <button onclick='buy("notes")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}
	if(images == "true") {
		console.log("Images Ok")
		document.getElementById("images-own-ui-status").innerHTML = "Owned"
	} else if(images == "false") {
		console.log("Images Not")
		document.getElementById("images-own-ui-status").innerHTML = `Not Owned <button onclick='buy("images")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}
	if(chatvia == "true") {
		console.log("Chatvia OK")
		document.getElementById("chatvia-own-ui-status").innerHTML = "Owned"
	} else if(chatvia == "false") {
		console.log("Chatvia Not")
		document.getElementById("chatvia-own-ui-status").innerHTML = `Not Owned <button onclick='buy("chatvia")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}

	let autologin = localStorage.getItem("t50-autologin")
	if(autologin === "true") {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
	} else if(autologin === "false") {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: red" href="#autologin">Disabled</a>`
	} else {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: red" href="#autologin">Disabled</a>`
	}
}

function settings() {
	if(document.getElementById("popup").style.display == "none" || document.getElementById("popup").style.display == "") {
		document.getElementById('gateway').style.filter = 'blur(5px)'; // Add a blur effect to the mainContent
		$("#bottom-logo").fadeIn("slow")
		setTimeout(function() {
			$("#popup").fadeIn("fast")
			//document.body.style.overflow = 'hidden';
		}, 100)
	} else {
		document.getElementById('gateway').style.filter = 'none'; // Add a blur effect to the mainContent
	$("#bottom-logo").fadeOut("slow")
    setTimeout(function() {
        $("#popup").fadeOut("fast")
        //document.body.style.overflow = 'hidden';
    }, 100)
	}
	
}

function close_popup() {
    settings()
}

function pfp() {
	let user = localStorage.getItem("t50-username")
	if(user != null) {
		const url = `https://profile-database.onrender.com?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
		fetch(url)
		  .then(response => response.text())
		  .then(data => {
			document.getElementById("usr-img").src = `${data}`
		})
		.catch(error => console.error(error));
	}
}

function auto_login() {
	let autologin = localStorage.getItem("t50-autologin")
	if(autologin === "true") {
		localStorage.setItem("t50-autologin", false)
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: red" href="#autologin">Disabled</a>`
	} else {
		localStorage.setItem("t50-autologin", true)
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
	}
}

function restart() {
	$("#popup").fadeOut("fast", function() {
        $("#settings").fadeOut("fast")
		$("#gateway").fadeOut("fast", function() {
			$("#bottom-logo").fadeOut("fast", function() {
				setTimeout(function() {
					window.location.reload()
				}, 250)
					
			})
		})

	})

}

function logoff() {
	var keysToRemove = ['t50pswd', 't50-email', 't50-autologin', 't50-username', 'notes-owned', 'images-owned', 'chatvia-owned'];
	keysToRemove.forEach(function(key) {
	    localStorage.removeItem(key);
	});
	var keysToRem = ['skipped', 'loaded', 'loggedinpswd', 'loggedin'];
	keysToRem.forEach(function(key) {
	    sessionStorage.removeItem(key);
	});
	restart()
}

function fix() {
	var userResponse = window.confirm("This function will fix any errors created by beta builds. All local data will be deleted!");

    // Check the user's response
    if (userResponse) {
		localStorage.clear()
		sessionStorage.clear()
		window.location.reload()
    } else {
        alert("Operation Cancelled");
    }
}

function map_redirect() {
	if(localStorage.getItem("t50-username") === "papostol") {
		window.location.href = "https://3dcb9862-7e27-4033-98f8-c0e7d083a51d-00-10oadmzrhdlfs.riker.replit.dev/gmaps.html"
	} else {
		log("Error! 401", "red")
	}
	
}