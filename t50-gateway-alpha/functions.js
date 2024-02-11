window.addEventListener('beforeunload', function (event) {
	fetch(`https://evox-datacenter.onrender.com/setOffline?username=${localStorage.getItem("t50-username")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(offline => {
			if (offline === "200") {
				console.log("Offline Set!")
			}
		})
		.catch(error => {
			console.error('Set Offline error:', error);
		});
});
fetch(`https://evox-datacenter.onrender.com/setOnline?username=${localStorage.getItem("t50-username")}`)
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.text();
	})
	.then(data => {
		if (data === "200") {
			fetch(`https://evox-datacenter.onrender.com/getOnlineUsers`)
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.text();
				})
				.then(users => {
					const onlineUsers = JSON.parse(users)
					console.log(onlineUsers)
				})
				.catch(error => {
					console.error('Fetch error:', error);
				});
		}

	})
	.catch(error => {
		console.error('Fetch error:', error);
	});
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
		setTimeout(function () {
			element1.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
			element2.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
		}, 2000)
		return;
	}
	setTimeout(function () {
		element.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
	}, 2000)
}

function skip() {
	log("Skipped!", "red")
	$("#container").fadeIn("slow", function () {
		$("#loading").fadeOut("slow")
		$("#loading-div-text").fadeOut("fast")
		$("#loading-text").fadeOut("slow")
	})
}

function log(text, color) {
	const styles = `color: ${color}; font-size: 16px; font-weight: normal;`;
	console.log('%c' + text, styles)
}

function setup() {
	log("T50 Gateway V:Delta 5", "red")
	loadusers()
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
							log("Enabling Tasco", "green")
							document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('tasco')" href="#loadapp-tasco"><img src="../tasco/tasco-app.png" class="app"></img></a>`
							log("Enabling SecureLine", "green")
							document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('secureline')" href="#loadapp-secureline"><img src="./secureline/sline.png" class="app"></img></a>`
							if (localStorage.getItem("t50-username") === "papostol") {
								log("Enabling Transports", "green")
								//document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="load('emails')" href="#loadapp-transports"><img src="evox-logo-dark.png" class="app"></img></a>`
								document.getElementById("apps").innerHTML = `${document.getElementById("apps").innerHTML}<a onclick="shake_me('transports-disabled')" href="#loadapp-transports"><img id="transports-disabled" src="T50Transports.png" class="disabledapp"></img></a>`
							}
							$("#apps").fadeIn("slow")
							$("#loading-apps-text").fadeOut("slow", function () {
								document.getElementById("loading-apps-text").innerHTML = `Here are the available Evox applications`
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
	if (app === "notes") {
		if (notes === "true") {
			window.location.href = "./Notes/"
		} else {
			log("App Not Owned!", "red")
		}
	} else if (app === "images") {
		if (images === "true") {
			if (localStorage.getItem("t50-autologin") === "true") {
				localStorage.setItem("img-app-username", localStorage.getItem("t50-username"))
				localStorage.setItem("rem-email", localStorage.getItem("t50-email"))
				localStorage.setItem("img-app-email", localStorage.getItem("t50-email"))
			}
			window.location.href = "./Images/"
		} else {
			log("App Not Owned!", "red")
		}
	} else if (app === "chatvia") {
		if (chatvia === "true") {
			window.location.href = "./customize/"
		} else {
			log("App Not Owned!", "red")
		}
	} else if (app === "transports") {
		if (localStorage.getItem("t50-username") === "papostol") {
			window.location.href = "./gmp/gmaps.html"
		}
	} else if (app === "emails" && localStorage.getItem("t50-username") === "papostol") {
		window.location.href = "./mails/"
	} else if (app === "tasco") {
		window.location.href = `../tasco/`
	} else if(app === "secureline") {
		window.location.href = `./secureline/`
	}
}

function buy(app) {
	$("#loading").fadeIn("slow")
	$("#popup").fadeOut("slow", function () {
		$(`#buy${app}`).fadeIn("fast")
		$("#buy-products").fadeIn("slow", function () {
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
	$("#buy-products").fadeOut("slow", function () {
		$(`#buychatvia`).fadeOut("fast")
		$(`#buyimages`).fadeOut("fast")
		$(`#buynotes`).fadeOut("fast")
		$("#purchase").fadeOut("fast")
		$("#choose_pm").fadeIn("slow")
		$("#code_pm").fadeOut("slow")
	})
}

function purchase(app) {
	if (app === "notes") {
		document.getElementById("purch-app-img").src = "EvoxNotes.png"
		document.getElementById("purch-app-text").innerHTML = "Evox Notes"
	} else if (app === "images") {
		document.getElementById("purch-app-img").src = "t50-img.png"
		document.getElementById("purch-app-text").innerHTML = "Evox Images"
	} else if (app === "chatvia") {
		document.getElementById("purch-app-img").src = "chatvia-img.png"
		document.getElementById("purch-app-text").innerHTML = "Chatvia"
	} else {
		log("A compatible app hasn't been defined")
	}
	$(`#buychatvia`).fadeOut("fast", function () {
		$(`#buyimages`).fadeOut("fast", function () {
			$(`#buynotes`).fadeOut("fast", function () {
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
	if (pm_cc) {
		log("Got pm_cc", "green")
		alert("Credit Card Purchases Are Currently Not Available!")
	} else if (pm_pp) {
		log("Got pm_pp", "green")
		alert("PayPal Purchases Are Currently Not Available!")
	} else if (pm_code) {
		log("Got pm_code", "green")
		$("#choose_pm").fadeOut("slow", function () {
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
	const url = `https://evox-datacenter.onrender.com/accounts?applications=${app}&coupon=${coupon}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`;

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
			if (data === `Registered To Evox ${capitalizedApp}`) {
				if (localStorage.getItem("t50-autologin") === "true") {
					console.log("Nothing")
					$("#loading").fadeOut("slow")
					$("#gateway").fadeOut("slow")
					$("#buy-products").fadeOut("slow", function () {
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
						$("#gateway").fadeIn("slow", function () {
							document.getElementById('gateway').style.filter = 'none'
							setTimeout(function () {
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
					$("#buy-products").fadeOut("slow", function () {
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
						$("#gateway").fadeIn("slow", function () {
							document.getElementById('gateway').style.filter = 'none'
							setTimeout(function () {
								restart()
							}, 2000)
						})
					})
				}
			} else if (data === "Invalid Coupon") {
				$("#loading").fadeOut("slow")
				document.getElementById(`coupon`).classList.add('shake');
				setTimeout(function () {
					document.getElementById(`coupon`).classList.remove('shake');
				}, 500);
			} else if (data === `Evox ${capitalizedApp} is already owned by ${localStorage.getItem("t50-username")}`) {
				$("#loading").fadeOut("slow")
				document.getElementById(`coupon`).classList.add('shake');
				setTimeout(function () {
					document.getElementById(`coupon`).classList.remove('shake');
				}, 500);
				localStorage.setItem("t50-autologin", true)
				localStorage.setItem("remove-autolg", true)
				document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
				restart()
			} else if (data === "Application Does Not Exist") {
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
	document.getElementById("usr-img").src = sessionStorage.getItem("pfp")
	pfp()
	document.getElementById("usr-name").innerHTML = localStorage.getItem("t50-username")
	document.getElementById("usr-email").innerHTML = localStorage.getItem("t50-email")
	if (notes == "true") {
		console.log("Notes OK")
		document.getElementById("notes-own-ui-status").innerHTML = "Owned"
	} else if (notes == "false") {
		console.log("Notes Not")
		document.getElementById("notes-own-ui-status").innerHTML = `Not Owned <button onclick='buy("notes")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}
	if (images == "true") {
		console.log("Images Ok")
		document.getElementById("images-own-ui-status").innerHTML = "Owned"
	} else if (images == "false") {
		console.log("Images Not")
		document.getElementById("images-own-ui-status").innerHTML = `Not Owned <button onclick='buy("images")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}
	if (chatvia == "true") {
		console.log("Chatvia OK")
		document.getElementById("chatvia-own-ui-status").innerHTML = "Owned"
	} else if (chatvia == "false") {
		console.log("Chatvia Not")
		document.getElementById("chatvia-own-ui-status").innerHTML = `Not Owned <button onclick='buy("chatvia")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	} else {
		console.log("ChatVia Ownership Error")
	}

	let autologin = localStorage.getItem("t50-autologin")
	if (autologin === "true") {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
	} else if (autologin === "false") {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: red" href="#autologin">Disabled</a>`
	} else {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: red" href="#autologin">Disabled</a>`
	}
}

function settings() {
	if (document.getElementById("popup").style.display == "none" || document.getElementById("popup").style.display == "") {
		document.getElementById('gateway').style.filter = 'blur(20px)'; // Add a blur effect to the mainContent
		$("#bottom-logo").fadeIn("slow")
		$("#settings").fadeOut("slow")
		setTimeout(function () {
			$("#popup").fadeIn("fast")
			//document.body.style.overflow = 'hidden';
		}, 100)
	} else {
		document.getElementById('gateway').style.filter = 'none'; // Add a blur effect to the mainContent
		$("#bottom-logo").fadeOut("slow")
		$("#settings").fadeIn("slow")
		setTimeout(function () {
			$("#popup").fadeOut("fast")
			//document.body.style.overflow = 'hidden';
		}, 100)
	}

}

function close_popup() {
	settings()
}

function pfp(give) {
	return new Promise((resolve, reject) => {
		let user = localStorage.getItem("t50-username");
		if (user != null) {
			document.getElementById("usr-img-opt").src = "reloading-pfp.gif"
			const url = `https://evox-datacenter.onrender.com/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
			fetch(url)
				.then(response => response.text())
				.then(data => {
					if (data.indexOf("base64") === -1) {
						// If it doesn't contain "base64", add the prefix
						data = "data:image/jpeg;base64," + data;
					}
					document.getElementById("usr-img").src = `${data}`;
					sessionStorage.setItem("pfp", data);
					if (give === "giveback") {
						resolve(data);
					}
				})
				.catch(error => {
					console.error(error);
					reject(error);
				});
		} else {
			reject("User not found");
		}
	});
}

function auto_login() {
	let autologin = localStorage.getItem("t50-autologin")
	if (autologin === "true") {
		localStorage.setItem("t50-autologin", false)
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: red" href="#autologin">Disabled</a>`
	} else {
		localStorage.setItem("t50-autologin", true)
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" style="color: green" href="#autologin">Enabled</a>`
	}
}

function restart() {
	$("#popup").fadeOut("fast", function () {
		$("#settings").fadeOut("fast")
		$("#gateway").fadeOut("fast", function () {
			$("#bottom-logo").fadeOut("fast", function () {
				setTimeout(function () {
					window.location.reload()
				}, 250)

			})
		})

	})

}

function logoff() {
	var keysToRemove = ['t50pswd', 't50-email', 't50-autologin', 't50-username', 'notes-owned', 'images-owned', 'chatvia-owned'];
	keysToRemove.forEach(function (key) {
		localStorage.removeItem(key);
	});
	var keysToRem = ['skipped', 'loaded', 'loggedinpswd', 'loggedin'];
	keysToRem.forEach(function (key) {
		sessionStorage.removeItem(key);
	});
	localStorage.clear()
	restart()
}

function fix() {
	alert("This function will fix any local errors created by beta builds. All local data will be deleted!")
	localStorage.clear()
	sessionStorage.clear()
	window.location.reload()
}

function shake_me(what) {
	document.getElementById(`${what}`).classList.add('shake');
	setTimeout(function () {
		document.getElementById(`${what}`).classList.remove('shake');
	}, 500);
}

function show_account() {
	console.log("Changing Screens to account")
	document.getElementById("usr-email-opt").innerHTML = localStorage.getItem("t50-email")
	document.getElementById("usr-name-opt").innerHTML = localStorage.getItem("t50-username")
	document.getElementById("usr-img-opt").src = sessionStorage.getItem("pfp")
	$("#main_popup_settings").fadeOut("fast", function () {
		$("#account_options").fadeIn("fast")
	})
}

function return_settings() {
	$("#account_options").fadeOut("fast", function () {
		$("#main_popup_settings").fadeIn("fast")
	})
}
function username_email_icon_show() {
	document.getElementById("options_section_1_username").innerHTML = localStorage.getItem("t50-username")
	document.getElementById("options_section_1_email").innerHTML = localStorage.getItem("t50-email")
	if (localStorage.getItem("t50-birthdate")) {
		document.getElementById("options_section_1_birthdate").innerHTML = localStorage.getItem("t50-birthdate")
	} else {
		document.getElementById("options_section_1_birthdate").innerHTML = "Not set"
	}

	if (localStorage.getItem("announcements-enabled")) {
		document.getElementById("options_section_1_announcements").innerHTML = localStorage.getItem("announcements-enabled")
	} else {
		document.getElementById("options_section_1_announcements").innerHTML = "Enabled"
	}
	$("#main_settings").fadeOut("fast", function () {
		$("#username_email_icon_show").fadeIn("fast")
	})

}

function pswd_secure() {
	if (localStorage.getItem("2fa_status")) {
		document.getElementById("2fa_status").innerHTML = localStorage.getItem("2fa_status")
	} else {
		document.getElementById("2fa_status").innerHTML = "Off"
	}
	document.getElementById("trusted_email").innerHTML = localStorage.getItem("t50-email")
	//document.getElementById("options_section_1_username").innerHTML = localStorage.getItem("t50-username")
	//document.getElementById("options_section_1_email").innerHTML = localStorage.getItem("t50-email")
	//if(localStorage.getItem("t50-birthdate")) {
	//	document.getElementById("options_section_1_birthdate").innerHTML = localStorage.getItem("t50-birthdate")
	//} else {
	//	document.getElementById("options_section_1_birthdate").innerHTML = "Not set"
	//}
	//
	//if(localStorage.getItem("announcements-enabled")) {
	//	document.getElementById("options_section_1_announcements").innerHTML = localStorage.getItem("announcements-enabled")
	//} else {
	//	document.getElementById("options_section_1_announcements").innerHTML = "Enabled"
	//}
	$("#main_settings").fadeOut("fast", function () {
		$("#pswd_secure").fadeIn("fast")
	})
}

function show_search() {
	//document.getElementById("options_section_1_username").innerHTML = localStorage.getItem("t50-username")
	//document.getElementById("options_section_1_email").innerHTML = localStorage.getItem("t50-email")
	//if(localStorage.getItem("t50-birthdate")) {
	//	document.getElementById("options_section_1_birthdate").innerHTML = localStorage.getItem("t50-birthdate")
	//} else {
	//	document.getElementById("options_section_1_birthdate").innerHTML = "Not set"
	//}
	//
	//if(localStorage.getItem("announcements-enabled")) {
	//	document.getElementById("options_section_1_announcements").innerHTML = localStorage.getItem("announcements-enabled")
	//} else {
	//	document.getElementById("options_section_1_announcements").innerHTML = "Enabled"
	//}
	$("#main_settings").fadeOut("fast", function () {
		$("#add_friends").fadeIn("fast")
	})
}
function acceptfriend(element) {
	document.getElementById(element.id).innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	x="0px" y="0px" width="25px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;"
	xml:space="preserve">
	<path fill="#fff"
		d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
		<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
			to="360 25 25" dur="0.5s" repeatCount="indefinite" />
	</path>
</svg>`
	console.log("Accepting Request From", element.id)
	fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&todo=acceptRequest&who=${element.id}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			element.innerHTML = "Friends"

		}).catch(error => {
			console.error(error)
		})
}
let friendinterval;
function showFriend(element) {
	try {
		clearInterval(friendinterval);
	} catch (error) {
		// Handle the error (optional)
		console.error("Error clearing interval:", error.message);
	}
	console.log(element)
	let elem = element.id
	var nameArray = elem.split('-');
	var friend = nameArray[1];

	document.getElementById("secureline-username").id = `secureline-${friend}`
	document.getElementById("friend-email").innerHTML = document.getElementById(`user-${friend}-email-friends`).innerHTML
	document.getElementById("friend-pfp").src = document.getElementById(`${friend}-pfp-friends`).src
	if (document.getElementById("friend-pfp").src.includes("searching_users.gif")) {
		friendinterval = setInterval(function () {
			document.getElementById("friend-pfp").src = document.getElementById(`${friend}-pfp-friends`).src
		}, 500)
	}
	document.getElementById("friend-username").innerHTML = friend
	$("#friends").fadeOut("fast", function () {
		$("#user-friend").fadeIn("fast")
	})
}
function show_friends() {
	$("#load-users-friends").fadeIn("fast")
	fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			if (data === "") {
				$("#load-users-friends").fadeOut("fast", function () {
					let containerId = "list-friends";
					var listContainer = document.getElementById(containerId);
					listContainer.style.textAlign = "center";
					listContainer.style.marginTop = "50px";
					listContainer.innerHTML = "No Friends"
				})
				return;
			}
			const user_requests = JSON.parse(data)
			let containerId = "list-friends";
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
							userContainer.id = `friend-${username}`;
							userContainer.onclick = function () {
								showFriend(this);
							};
							var userCircle = document.createElement("div");
							userCircle.className = "user-circle";
							userCircle.innerHTML = `<img src="searching_users.gif" id="${username}-pfp-friends" alt="User ${username} Image">`;
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
				.catch(error => {
					console.error(error);
				});
		}).catch(error => {
			console.error(error);
		});

	$("#main_settings").fadeOut("fast", function () {
		$("#friends").fadeIn("fast")
	})
}
function show_requests() {
	$("#load-users-requests").fadeIn("fast")
	document.getElementById("list-requests").innerHTML = ""
	fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=getRequests`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(JSON.stringify(data))
			if (data === "None") {
				$("#load-users-requests").fadeOut("fast", function () {
					let containerId = "list-requests";
					var listContainer = document.getElementById(containerId);
					listContainer.style.textAlign = "center";
					listContainer.style.marginTop = "50px";
					listContainer.innerHTML = "No Friend Requests"
				})
				return;
			}
			const user_requests = JSON.parse(data)
			let containerId = "list-requests";
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

							var userCircle = document.createElement("div");
							userCircle.className = "user-circle";
							userCircle.innerHTML = `<img src="searching_users.gif" id="${username}-pfp-requests" alt="User ${username} Image">`;
							var userDetails = document.createElement("div");
							userDetails.className = "user-details";

							var userName = document.createElement("div");
							userName.className = "user-name";
							userName.textContent = username;

							var userEmail = document.createElement("div");
							userEmail.className = "user-email";
							userEmail.id = `user-${username}-email-requests`;
							userEmail.textContent = profileemail;


							addButton = document.createElement("a");
							addButton.href = "#";
							addButton.id = username;
							addButton.onclick = function () {
								acceptfriend(this);
							};
							addButton.className = "apple-button-list";
							addButton.textContent = "Accept";


							userDetails.appendChild(userName);
							userDetails.appendChild(userEmail);

							userContainer.appendChild(userCircle);
							userContainer.appendChild(userDetails);
							userContainer.appendChild(addButton);

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
										document.getElementById(`${username}-pfp-requests`).src = profileimage
									} else {
										document.getElementById(`${username}-pfp-requests`).src = profileimage
									}


								}).catch(error => {
									console.error("Cannot set src for", username)
									console.error(error)
								})
						}
					});
				$("#load-users-requests").fadeOut("fast");
			})
				.catch(error => {
					console.error(error);
				});
		}).catch(error => {
			console.error(error);
		});
	$("#main_settings").fadeOut("fast", function () {
		$("#friend_requests").fadeIn("fast")
	})
}
function addfriend(element) {
	//if (localStorage.getItem("sent_friend_requests")) {
	//	if (localStorage.getItem("sent_friend_requests").includes(element.id)) {
	//		shake_me(element.id)
	//		return;
	//	}
	//}
	console.log(element.id)
	document.getElementById(element.id).innerHTML = `<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	x="0px" y="0px" width="25px" height="20px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;"
	xml:space="preserve">
	<path fill="#fff"
		d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z">
		<animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25"
			to="360 25 25" dur="0.5s" repeatCount="indefinite" />
	</path>
</svg>`
	fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&todo=friendRequest&who=${element.id}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			if (data === "Success") {
				let requests = localStorage.getItem("sent_friend_requests");

				// Parse the retrieved data into an array or initialize an empty array
				requests = requests ? JSON.parse(requests) : [];

				// Push the new value to the array
				requests.push(element.id);

				// Save the updated array back to localStorage
				//localStorage.setItem("sent_friend_requests", JSON.stringify(requests));
				document.getElementById(element.id).innerHTML = `Sent`
			}
		}).catch(error => {
			console.error(error);
		});

}
function submit_search() {
	console.log("Unready")
	//value = document.getElementById("")
}


function loadusers() {
	let url = `https://evox-datacenter.onrender.com/search?search=`;

	fetch(url)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			let userlist = JSON.parse(data);
			let containerId = "list-container";
			var listContainer = document.getElementById(containerId);
			listContainer.style.textAlign = "";
			listContainer.style.marginTop = "";
			listContainer.innerHTML = "<!--Empty-->";

			// Fetch emails for each user individually
			userlist.forEach(username => {
				if (username === localStorage.getItem("t50-username")) {
					return;
				}
				fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
					.then(response => {
						if (!response.ok) {
							throw new Error(`HTTP error! Status: ${response.status}`);
						}
						return response.text();
					})
					.then(friends => {
						let sentRequests;

						fetch(`https://evox-datacenter.onrender.com/accounts?method=getemailbyusername&username=${username}`)
							.then(response => {
								if (!response.ok) {
									throw new Error(`HTTP error! Status: ${response.status}`);
								}
								return response.text();
							})
							.then(profileemail => {
								let skipbutton;
								let addButton;
								// Check if the username already exists in the list
								if (listContainer.querySelector(`#user-${username}-email`) === null) {
									var userContainer = document.createElement("div");
									userContainer.className = "list-user-info";

									var userCircle = document.createElement("div");
									userCircle.className = "user-circle";
									userCircle.innerHTML = `<img src="searching_users.gif" id="${username}-pfp" alt="User ${username} Image">`;
									var userDetails = document.createElement("div");
									userDetails.className = "user-details";

									var userName = document.createElement("div");
									userName.className = "user-name";
									userName.textContent = username;

									var userEmail = document.createElement("div");
									userEmail.className = "user-email";
									userEmail.id = `user-${username}-email`;
									userEmail.textContent = profileemail;
									if (JSON.stringify(friends).includes(username)) {
										skipbutton = true
										userDetails.appendChild(userName);
										userDetails.appendChild(userEmail);

										userContainer.appendChild(userCircle);
										userContainer.appendChild(userDetails);

										listContainer.appendChild(userContainer);
										let localValue = localStorage.getItem("sent_friend_requests");

										// Parse the retrieved data into an array or initialize an empty array
										let requests = localValue ? JSON.parse(localValue) : [];

										// Assuming 'username' is the value you want to remove
										let indexToRemove = requests.indexOf(username);
										if (indexToRemove !== -1) {
											// Remove the element from the array
											requests.splice(indexToRemove, 1);

											// Save the updated array back to localStorage
											localStorage.setItem("sent_friend_requests", JSON.stringify(requests));
										} else {
											console.log("Username not found in the array");
										}
									}

									fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=sentRequests`)
										.then(response => {
											if (!response.ok) {
												throw new Error(`HTTP error! Status: ${response.status}`);
											}
											return response.text();
										})
										.then(usersSent => {
											sentRequests = usersSent
											if (sentRequests && sentRequests.includes(username) && skipbutton !== true) {
												addButton = document.createElement("a");
												addButton.href = "#";
												addButton.id = username;
												addButton.onclick = function () {
													shake_me(this.id);
												};
												addButton.className = "apple-button-list";
												addButton.textContent = "Sent";
												userDetails.appendChild(userName);
												userDetails.appendChild(userEmail);

												userContainer.appendChild(userCircle);
												userContainer.appendChild(userDetails);
												userContainer.appendChild(addButton);

												listContainer.appendChild(userContainer);
											} else if (skipbutton !== true) {
												addButton = document.createElement("a");
												addButton.href = "#";
												addButton.id = username;
												addButton.onclick = function () {
													addfriend(this);
												};
												addButton.className = "apple-button-list";
												addButton.textContent = "Add";

												userDetails.appendChild(userName);
												userDetails.appendChild(userEmail);

												userContainer.appendChild(userCircle);
												userContainer.appendChild(userDetails);
												userContainer.appendChild(addButton);

												listContainer.appendChild(userContainer);
											}
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
														document.getElementById(`${username}-pfp`).src = profileimage
													} else {
														document.getElementById(`${username}-pfp`).src = profileimage
													}


												}).catch(error => {
													console.error("Cannot set src for", username)
													console.error(error)
												})
										})
								}
							});
					}).catch(error => {
						console.error(error);
					});


			})
				.catch(error => {
					console.error(error);
				});
		})
		.catch(error => {
			console.error(error);
		});
}

function handlesearch(value) {
	console.log("Length", value.length);
	if (value.length < 0) {
		console.log("Declined");
		return;
	} else {
		// add timeout if search is started or end value exists in div
		console.log("Accepted");
		$("#load-users").fadeIn("fast");
		let url = `https://evox-datacenter.onrender.com/search?search=${value}`;

		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text();
			})
			.then(data => {
				if (JSON.stringify(data) === '"[]"') {
					$("#load-users").fadeOut("fast", function () {
						let containerId = "list-container";
						var listContainer = document.getElementById(containerId);
						listContainer.style.textAlign = "center";
						listContainer.style.marginTop = "50px";
						listContainer.innerHTML = `No user found named ${value}`
					})
					return;
				} else {
					console.log(`${JSON.stringify(data)} != "[]"`)
				}
				let userlist = JSON.parse(data);
				let containerId = "list-container";
				var listContainer = document.getElementById(containerId);
				listContainer.style.textAlign = "";
				listContainer.style.marginTop = "";
				listContainer.innerHTML = "<!--Empty-->";

				// Fetch emails for each user individually
				userlist.forEach(username => {
					if (username === localStorage.getItem("t50-username")) {
						return;
					}
					fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
						.then(response => {
							if (!response.ok) {
								throw new Error(`HTTP error! Status: ${response.status}`);
							}
							return response.text();
						})
						.then(friends => {
							let sentRequests;
							fetch(`https://evox-datacenter.onrender.com/accounts?method=getemailbyusername&username=${username}`)
								.then(response => {
									if (!response.ok) {
										throw new Error(`HTTP error! Status: ${response.status}`);
									}
									return response.text();
								})
								.then(profileemail => {
									let skipbutton;
									let addButton;
									// Check if the username already exists in the list
									if (listContainer.querySelector(`#user-${username}-email`) === null) {
										var userContainer = document.createElement("div");
										userContainer.className = "list-user-info";

										var userCircle = document.createElement("div");
										userCircle.className = "user-circle";
										userCircle.innerHTML = `<img src="searching_users.gif" id="${username}-pfp" alt="User ${username} Image">`;
										var userDetails = document.createElement("div");
										userDetails.className = "user-details";

										var userName = document.createElement("div");
										userName.className = "user-name";
										userName.textContent = username;

										var userEmail = document.createElement("div");
										userEmail.className = "user-email";
										userEmail.id = `user-${username}-email`;
										userEmail.textContent = profileemail;
										if (JSON.stringify(friends).includes(username)) {
											skipbutton = true
											userDetails.appendChild(userName);
											userDetails.appendChild(userEmail);

											userContainer.appendChild(userCircle);
											userContainer.appendChild(userDetails);

											listContainer.appendChild(userContainer);
											let localValue = localStorage.getItem("sent_friend_requests");

											// Parse the retrieved data into an array or initialize an empty array
											let requests = localValue ? JSON.parse(localValue) : [];

											// Assuming 'username' is the value you want to remove
											let indexToRemove = requests.indexOf(username);
											if (indexToRemove !== -1) {
												// Remove the element from the array
												requests.splice(indexToRemove, 1);

												// Save the updated array back to localStorage
												localStorage.setItem("sent_friend_requests", JSON.stringify(requests));
											} else {
												console.log("Username not found in the array");
											}
										}

										fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=sentRequests`)
											.then(response => {
												if (!response.ok) {
													throw new Error(`HTTP error! Status: ${response.status}`);
												}
												return response.text();
											})
											.then(usersSent => {
												sentRequests = usersSent
												if (sentRequests && sentRequests.includes(username) && skipbutton !== true) {
													addButton = document.createElement("a");
													addButton.href = "#";
													addButton.id = username;
													addButton.onclick = function () {
														shake_me(this.id);
													};
													addButton.className = "apple-button-list";
													addButton.textContent = "Sent";
													userDetails.appendChild(userName);
													userDetails.appendChild(userEmail);

													userContainer.appendChild(userCircle);
													userContainer.appendChild(userDetails);
													userContainer.appendChild(addButton);

													listContainer.appendChild(userContainer);
												} else if (skipbutton !== true) {
													addButton = document.createElement("a");
													addButton.href = "#";
													addButton.id = username;
													addButton.onclick = function () {
														addfriend(this);
													};
													addButton.className = "apple-button-list";
													addButton.textContent = "Add";

													userDetails.appendChild(userName);
													userDetails.appendChild(userEmail);

													userContainer.appendChild(userCircle);
													userContainer.appendChild(userDetails);
													userContainer.appendChild(addButton);

													listContainer.appendChild(userContainer);
												}
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
															document.getElementById(`${username}-pfp`).src = profileimage
														} else {
															document.getElementById(`${username}-pfp`).src = profileimage
														}


													}).catch(error => {
														console.error("Cannot set src for", username)
														console.error(error)
													})
											})





									}
								});
							$("#load-users").fadeOut("fast");
						}).catch(error => {
							console.error(error);
						});


				})
					.catch(error => {
						console.error(error);
					});
			})
			.catch(error => {
				console.error(error);
			});
	}
}



function change_password() {
	shake_me("change_password")
}

function return_to_options(where) {
	if (where) {
		if (where === "security") {
			$("#pswd_secure").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
			})
		} else if (where === "usr-emails") {
			$("#username_email_icon_show").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
			})
		} else if (where === "add_friends") {
			$("#add_friends").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
			})
		} else if (where === "requests") {
			$("#friend_requests").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
			})
		} else if (where === "friends") {
			$("#friends").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
			})
		} else if (where === "user-friend") {
			var element = document.querySelector('[id^="secureline-"]');

			// Check if the element is found
			if (element) {
				// Change the id attribute to "secureline-username"
				element.id = "secureline-username";
			} else {
				console.error('Element with id starting with "secureline-" not found');
			}
			$("#user-friend").fadeOut("fast", function () {
				$("#friends").fadeIn("fast")
			})
		}
	}
}

function showUploadBox() {
	document.getElementById('upload-box').click();
}

function handleFileSelect() {
	const input = document.getElementById('upload-box');
	const file = input.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const base64String = e.target.result;
			// Now you have the base64 representation of the selected image
			//console.log(base64String);
			document.getElementById("upload-box").disabled = true
			document.getElementById("usr-img-opt").src = "./reloading.gif"
			fetch('https://evox-datacenter.onrender.com/profiles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: localStorage.getItem("t50-username"),
					pfp: base64String
				})
			})
				.then(response => response.text())
				.then(data => {
					console.log(data);
					if (data === "done") {
						console.log("All ok")
						document.getElementById("upload-box").disabled = false
						pfp("giveback")
							.then(value => {
								// Do something with the value
								document.getElementById("usr-img-opt").src = value
							})
							.catch(error => {
								// Handle errors
								console.error(error);
							});

					}
				})
				.catch(error => {
					console.error(error);
				});
		};
		reader.readAsDataURL(file);
	}

	// Reset the input value to allow selecting the same file again
	input.value = '';
}

function secureline(element) {
	//remove "secureline-" from element.id
	window.location.href = `./secureline/?goto=${element.id}`
}