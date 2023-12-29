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
						fetch(`https://team50-accounts-database-clear.memeguy21.repl.co/?applications=get&email=${localStorage.getItem("t50-email")}`)
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
			window.location.href = "./Notes/index.html"
		} else {
			log("App Not Owned!", "red")
		}
	} else if(app === "images") {
		if(images === "true") {
			window.location.href = "https://img-type.memeguy21.repl.co/"
		} else {
			log("App Not Owned!", "red")
		}
	} else if(app === "chatvia") {
		if(chatvia === "true") {
			window.location.href = "https://team50.sytes.net/1index.html"
		} else {
			log("App Not Owned!", "red")
		}
	}
}

function buy(app) {
	//Say that user doesnt own the app ask if he wants to buy it
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
		document.getElementById("notes-own-ui-status").innerHTML = `Not Owned <button onclick='purchase("notes")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}
	if(images == "true") {
		console.log("Images Ok")
		document.getElementById("images-own-ui-status").innerHTML = "Owned"
	} else if(images == "false") {
		console.log("Images Not")
		document.getElementById("images-own-ui-status").innerHTML = `Not Owned <button onclick='purchase("images")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}
	if(chatvia == "true") {
		console.log("Chatvia OK")
		document.getElementById("chatvia-own-ui-status").innerHTML = "Owned"
	} else if(chatvia == "false") {
		console.log("Chatvia Not")
		document.getElementById("chatvia-own-ui-status").innerHTML = `Not Owned <button onclick='purchase("chatvia")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	}

	let autologin = localStorage.getItem("t50-autologin")
	if(autologin === "true") {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" href="#autologin">Enabled</a>`
	} else if(autologin === "false") {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" href="#autologin">Disabled</a>`
	} else {
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" href="#autologin">Disabled</a>`
	}
}

function settings() {
	$("#bottom-logo").fadeIn("slow")
    setTimeout(function() {
        $("#popup").fadeIn("slow")
        //document.body.style.overflow = 'hidden';
    }, 500)
}

function close_popup() {
    $("#bottom-logo").fadeOut("slow")
    setTimeout(function() {
        $("#popup").fadeOut("slow")
        //document.body.style.overflow = 'visible';
    }, 500)
}

function pfp() {
	let user = localStorage.getItem("t50-username")
	if(user != null) {
		const url = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;
		fetch(url)
		  .then(response => response.text())
		  .then(data => {
			document.getElementById("usr-img").src = `data:image/png;base64,${data}`
		})
		.catch(error => console.error(error));
	}
}

function auto_login() {
	let autologin = localStorage.getItem("t50-autologin")
	if(autologin === "true") {
		localStorage.setItem("t50-autologin", false)
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" href="#autologin">Disabled</a>`
	} else {
		localStorage.setItem("t50-autologin", true)
		document.getElementById("auto-login").innerHTML = `<a onclick="auto_login()" href="#autologin">Enabled</a>`
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