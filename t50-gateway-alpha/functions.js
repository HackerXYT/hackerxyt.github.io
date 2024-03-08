//window.addEventListener('beforeunload', function (event) {
//	fetch(`https://evox-datacenter.onrender.com/setOffline?username=${localStorage.getItem("t50-username")}`)
//		.then(response => {
//			if (!response.ok) {
//				throw new Error(`HTTP error! Status: ${response.status}`);
//			}
//			return response.text();
//		})
//		.then(offline => {
//			if (offline === "200") {
//				console.log("Offline Set!")
//			}
//		})
//		.catch(error => {
//			console.error('Set Offline error:', error);
//		});
//});

//var disabled = new Audio('./ui-sounds/qa_exit_old.mp3');
//var ac_complete = new Audio('./ui-sounds/action_complete.mp3');
//var qastart = new Audio('./ui-sounds/qa_start.mp3');
//var qaexit = new Audio('./ui-sounds/qa_exit.mp3');
//var notifications = new Audio('./ui-sounds/notifications.mp3');
//var notice_s = new Audio("./ui-sounds/notice.mp3")

var account_show = new Howl({
	src: ['./ui-sounds/qa_start_old.mp3'],
	volume: 1
});

var error = new Howl({
	src: ['./ui-sounds/critical.mp3'],
	volume: 1
});
var disabled = new Howl({
	src: ['./ui-sounds/qa_exit_old.mp3'],
	volume: 1
});
var ac_complete = new Howl({
	src: ['./ui-sounds/action_complete.mp3'],
	volume: 1
});
var qastart = new Howl({
	src: ['./ui-sounds/qa_start.mp3'],
	volume: 1
});
var qaexit = new Howl({
	src: ['./ui-sounds/qa_exit.mp3'],
	volume: 1
});
var notifications = new Howl({
	src: ['./ui-sounds/notifications.mp3'],
	volume: 1
});
var notif_out = new Howl({
	src: ['./ui-sounds/notif_out.mp3'],
	volume: 1
});
var notice_s = new Howl({
	src: ['./ui-sounds/notice.mp3'],
	volume: 1
});
var goback = new Howl({
	src: ['./ui-sounds/goback.mp3'],
	volume: 1
});
var settings_open = new Howl({
	src: ['./ui-sounds/settings_open.mp3'],
	volume: 1
});
var sline_open = new Howl({
	src: ['./ui-sounds/sline_in.mp3'],
	volume: 1
});
var sline_close = new Howl({
	src: ['./ui-sounds/sline_out.mp3'],
	volume: 1
});
var sline_refresh = new Howl({
	src: ['./ui-sounds/sline_refresh.mp3'],
	volume: 1
});
var click = new Howl({
	src: ['./ui-sounds/click_button.mp3'],
	volume: 1
});
var click_social = new Howl({
	src: ['./ui-sounds/click_social.mp3'],
	volume: 1
});
var more_opt = new Howl({
	src: ['./ui-sounds/more_options.mp3'],
	volume: 1
});
var more_opt_c = new Howl({
	src: ['./ui-sounds/more_options_c.mp3'],
	volume: 1
});
var login_ok = new Howl({
	src: ['./ui-sounds/login.mp3'],
	volume: 1
});
sessionStorage.removeItem("more_options")
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
	let Skipped;
	try {
		log("Skipped!", "red")
		try {
			clearInterval(Skipped)
		} catch {
			//
		}
	} catch {
		Skipped = setInterval(function () {
			log("Skipped!", "red")
		}, 800)
	}

	$("#container").fadeIn("slow", function () {
		$("#loading").fadeOut("slow")
		$("#loading-div-text").fadeOut("fast")
		$("#loading-text").fadeOut("slow")
	})
}

function custombg() {
	document.getElementById("current").style.display = "none"
	let blur = localStorage.getItem("cbg-blur")
	if (localStorage.getItem("cbg")) {
		let name = localStorage.getItem("cbg")
		document.getElementById("st1").classList.remove("active")
		if (name === "default_bg.png") {
			document.getElementById("bgname").innerHTML = "Default"
			document.getElementById("bgname").style.color = "#868686"
			document.getElementById("st1").classList.add("active")
			document.getElementById("background").innerHTML = `<div id="bgimaget" class="background" style="background: radial-gradient(circle, #400000, #000000)"></div>`
		} else if (name === "stock1.jpg") {
			document.getElementById("bgname").innerHTML = "Greek Mountain"
			document.getElementById("bgname").style.color = "#fff"
			document.getElementById("st2").classList.add("active")
			if (blur) {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock1.jpg');background-size: cover;background-position: center;filter: blur(${blur}px);"></div>`
			} else {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock1.jpg');background-size: cover;background-position: center;filter: blur(10px);"></div>`
			}

		} else if (name === "stock2.jpg") {
			document.getElementById("bgname").innerHTML = "Sea"
			document.getElementById("bgname").style.color = "#fff"
			document.getElementById("st3").classList.add("active")
			//document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock2.jpg');background-size: cover;background-position: center;filter: blur(10px);"></div>`
			if (blur) {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock2.jpg');background-size: cover;background-position: center;filter: blur(${blur}px);"></div>`
			} else {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock2.jpg');background-size: cover;background-position: center;filter: blur(10px);"></div>`
			}
		} else if (name === "stock4.jpg") {
			document.getElementById("bgname").innerHTML = "Dark Desert"
			document.getElementById("bgname").style.color = "#fff"
			document.getElementById("st4").classList.add("active")
			//document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock4.jpg');background-size: cover;background-position: center;filter: blur(10px);"></div>`
			if (blur) {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock4.jpg');background-size: cover;background-position: center;filter: blur(${blur}px);"></div>`
			} else {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('./bgs/stock4.jpg');background-size: cover;background-position: center;filter: blur(10px);"></div>`
			}
		} else if (name.includes("#")) {
			document.getElementById("st1").classList.add("active")
			document.getElementById("bgname").innerHTML = "Custom Color"
			document.getElementById("bgname").style.color = "#fff"
			document.getElementById("background").innerHTML = `<div  id="bgimaget" class="background" id="bgimaget" style="background: radial-gradient(circle, ${name}, #000000)"></div>`
		} else {
			document.getElementById("bgname").innerHTML = `${localStorage.getItem("t50-username")}'s custom`
			document.getElementById("bgname").style.color = "#eae1a5"
			//document.getElementById("background").innerHTML = `<div class="background" style="background-image: url('${name}');background-size: cover;background-position: center;filter: blur(10px);"></div>`
			document.getElementById("current").innerHTML = `<img class="active" id="st5" onclick="addbg(this)" src="${name}">`
			document.getElementById("current").style.display = ""
			if (blur) {
				document.getElementById("background").innerHTML = `<div id="bgimaget" class="background" style="filter: blur(${blur}px);background-image: url('${name}');background-size: cover;background-position: center;"></div>`
			} else {
				document.getElementById("background").innerHTML = `<div id="bgimaget" class="background" style="filter: blur(10px);background-image: url('${name}');background-size: cover;background-position: center;"></div>`
			}
			//base64
		}

	} else {
		//No Custom BG
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
	} else if (app === "secureline") {
		window.location.href = `./secureline/`
	}
}

function buy(app) {
	$("#settings").fadeOut("fast")
	console.log("Start Buying Process")
	$("#loading").fadeIn("slow")
	$("#popup").removeClass("active");
	$(`#buy${app}`).fadeIn("fast")
	$("#buy-products").addClass("active");
	document.getElementById('gateway').style.filter = 'blur(50px)'
	$("#buy-products").fadeIn("slow", function () {
		$("#loading").fadeOut("slow")
	})
	//Say that user doesnt own the app ask if he wants to buy it
}

function buy_back() {
	$("#bottom-logo").fadeOut("slow", function () {
		$("#settings").fadeIn("fast")
	})
	document.getElementById('gateway').style.filter = 'none'
	let pm_cc_sb = document.getElementById("cc-pm")//Payment method credit card standby
	let pm_pp_sb = document.getElementById("pp-pm")
	let pm_code_sb = document.getElementById("ccode-pm")
	pm_cc_sb.checked = false;
	pm_pp_sb.checked = false;
	pm_code_sb.checked = false;
	$("#buy-products").removeClass("active");
	$(`#buychatvia`).fadeOut("fast")
	$(`#buyimages`).fadeOut("fast")
	$(`#buynotes`).fadeOut("fast")
	$("#purchase").fadeOut("fast")
	$("#choose_pm").fadeIn("slow")
	$("#code_pm").fadeOut("slow")
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
					document.getElementById("auto-login").innerHTML = `Enabled`

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
				document.getElementById("auto-login").innerHTML = `Enabled`
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
	$("#vox").fadeIn("slow")
	//getFriends("pre")

	document.getElementById("usr-img").src = sessionStorage.getItem("pfp")

	if (sessionStorage.getItem("pfp")) {
		document.getElementById("profile-pfp").src = sessionStorage.getItem("pfp")
	} else {
		sessionStorage.setItem("show_profile", "waiting")
	}
	if (!localStorage.getItem("error_XMGE")) {
		$("#errors").fadeIn("slow")
	}

	$("#profile").fadeIn("fast")

	document.getElementById("dots").innerHTML = `<div
	style="background-color: #33333370; border: none; color: #fff; padding: 15px; font-size: 16px; border-radius: 100%; cursor: pointer; display: flex; align-items: center; text-decoration: none; transition: background-color 0.3s ease;"><svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
	<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	<path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
	</svg></div>`
	$("#dots").fadeIn("slow")

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
		document.getElementById("chatvia-own-ui-status").innerHTML = "Servers Offline"
	} else if (chatvia == "false") {
		console.log("Chatvia Not")
		document.getElementById("chatvia-own-ui-status").innerHTML = `Not Owned <button onclick='buy("chatvia")' style='margin-left:15pxdisplay: inline-block;padding: 10px 20px;text-decoration: none;color: #fff;background-color: #333;border: none;border-radius: 4px;transition: background-color 0.3s ease;cursor: pointer;'>Buy</button>`
	} else {
		console.log("ChatVia Ownership Error")
	}

	let autologin = localStorage.getItem("t50-autologin")
	if (autologin === "true") {
		document.getElementById("auto-login").innerHTML = `Enabled`
		document.getElementById("auto-login").style.color = ``
	} else if (autologin === "false") {
		document.getElementById("auto-login").innerHTML = `Disabled`
		document.getElementById("auto-login").style.color = `#eb2424`
	} else {
		document.getElementById("auto-login").innerHTML = `Disabled`
		document.getElementById("auto-login").style.color = `#eb2424`
	}

}

function settings() {
	$("#onesignal-bell-container").fadeIn("fast")
	//console.log(document.getElementById("popup").classList.contains("active"))
	if (document.getElementById("popup").classList.contains("active") === false) {
		settings_open.play()
		//document.body.style.overflow = 'hidden';
		document.getElementById("gateway").style.overflow = "hidden"
		$("#dots").fadeOut("slow")
		$("#profile").fadeOut("slow")
		if (document.getElementById("animatedButton_notif").style.display === "block") {
			var animatedButton = document.getElementById("animatedButton_notif");
			animatedButton.style.opacity = "0";
			animatedButton.style.transform = "translateY(20px)";
			setTimeout(function () {
				animatedButton.style.display = "none";
			}, 500); // Adjust the timing as needed
		}
		if (document.getElementById("animatedButton_chats").style.display === "block") {
			document.getElementById("gateway").style.overflow = "hidden"
			var animatedButton2 = document.getElementById("animatedButton_chats");
			animatedButton2.style.opacity = "0";
			animatedButton2.style.transform = "translateY(20px)";
			setTimeout(function () {
				animatedButton2.style.display = "none";
			}, 500); // Adjust the timing as needed
		}
		document.getElementById('gateway').style.filter = 'blur(20px)'; // Add a blur effect to the mainContent
		//$("#bottom-logo").fadeIn("slow")
		$("#settings").fadeOut("slow")
		setTimeout(function () {
			$("#popup").addClass("active");
			//$("#popup").fadeIn("fast")
			//document.body.style.overflow = 'hidden';
		}, 100)
	} else if (document.getElementById("popup").classList.contains("active")) {
		goback.play()
		document.getElementById('gateway').style.filter = 'none'; // Add a blur effect to the mainContent
		//$("#bottom-logo").fadeOut("slow", function () {
		$("#settings").fadeIn("slow")
		//})

		setTimeout(function () {
			$("#popup").removeClass("active");
			$("#dots").fadeIn("slow")
			$("#profile").fadeIn("slow")
			if (sessionStorage.getItem("more_options") === "active") {
				console.log("Showing more options")
				var animatedButton = document.getElementById("animatedButton_notif");
				animatedButton.style.display = "block";
				setTimeout(function () {
					animatedButton.style.opacity = "1";
					animatedButton.style.transform = "translateY(0)";
				}, 100);
				//animatedButton_chats
				var animatedButton2 = document.getElementById("animatedButton_chats");
				animatedButton2.style.display = "block";
				setTimeout(function () {
					animatedButton2.style.opacity = "1";
					animatedButton2.style.transform = "translateY(0)";
				}, 100);
			}
			//$("#popup").fadeOut("fast")
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
					document.getElementById("profile-pfp").src = `${data}`
					if (sessionStorage.getItem("show_profile") === "waiting") {
						$("#profile").fadeIn("slow")
					}
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
		document.getElementById("auto-login").style.color = `#eb2424`
		document.getElementById("auto-login").innerHTML = `Disabled`
	} else {
		localStorage.setItem("t50-autologin", true)
		document.getElementById("auto-login").innerHTML = `Enabled`
		document.getElementById("auto-login").style.color = ``
	}
}

function restart() {
	$("#popup").removeClass("active");
	$("#settings").fadeOut("fast")
	$("#gateway").fadeOut("fast", function () {
		//$("#bottom-logo").fadeOut("fast", function () {
		setTimeout(function () {
			window.location.reload()
		}, 250)

		//})
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
	sessionStorage.clear()
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

function show_authip() {
	//ipv4-list
	fetch(`https://evox-datacenter.onrender.com/authip?method=read&username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			//console.log(data)

			var ipAddresses = JSON.parse(data);
			if (data === "[]") {
				var ipv4List = document.getElementById("ipv4-list");
				ipv4List.innerHTML = ""
				var anchor = document.createElement("a");
				anchor.setAttribute("href", "#");
				anchor.setAttribute("style", "height: 50%");
				anchor.classList.add("apple-button");
				anchor.style.backgroundColor = "red"
				anchor.innerHTML = `<img src="error.svg">
				There are no IP adresses saved!<br>Try reloading Gateway.`;
				ipv4List.appendChild(anchor);
				console.log("No Values!")
				return;
			}

			// Get the element with id "ipv4-list"
			var ipv4List = document.getElementById("ipv4-list");
			ipv4List.innerHTML = ""
			// Loop through each IP address
			ipAddresses.forEach(function (ip) {
				if (ip === localStorage.getItem("IPV4")) {
					var anchor = document.createElement("a");
					anchor.setAttribute("href", "#");
					anchor.setAttribute("style", "height: 50%");
					anchor.classList.add("apple-button");
					anchor.style.backgroundColor = "#3879e0"
					anchor.innerText = `This Device (${ip})`;
					anchor.onclick = function () {
						let json = {
							"innerHTML": ip
						}
						removeIP(json);
					};
					ipv4List.appendChild(anchor);
					return;
				}
				if (ip === "1") {
					return;
				}
				if (ip === "null") {
					var anchor = document.createElement("a");
					anchor.setAttribute("href", "#");
					anchor.setAttribute("style", "height: 50%");
					anchor.classList.add("apple-button");
					anchor.style.backgroundColor = "red"
					anchor.innerHTML = `<img src="danger.svg">
					IP Verification is disabled!<br>Re-enable 2FA by removing this value.`;
					anchor.onclick = function () {
						let json = {
							"innerHTML": "null"
						}
						removeIP(json);
					};
					ipv4List.appendChild(anchor);
					return;
				}
				// Create a new anchor element
				var anchor = document.createElement("a");

				// Set href attribute to "#"
				anchor.setAttribute("href", "#");

				// Set style attribute for height
				anchor.setAttribute("style", "height: 50%");

				// Add class "apple-button"
				anchor.classList.add("apple-button");

				// Set the inner text to the IP address
				anchor.innerText = ip;
				anchor.onclick = function () {
					removeIP(this);
				};

				// Append the anchor element to the ipv4List
				ipv4List.appendChild(anchor);
			});

		}).catch(error => {
			console.error(error)
		})
	$("#main_settings").fadeOut("fast", function () {
		$("#authips").fadeIn("fast")
	})
}

function show_account() {
	//account_show.play()
	console.log("Changing Screens to account")
	document.getElementById("usr-email-opt").innerHTML = localStorage.getItem("t50-email")
	document.getElementById("usr-name-opt").innerHTML = localStorage.getItem("t50-username")
	if (sessionStorage.getItem("pfp")) {
		document.getElementById("usr-img-opt").src = sessionStorage.getItem("pfp")
	} else {
		document.getElementById("usr-img-opt").src = "reloading-pfp.gif"
	}

	$("#main_popup_settings").fadeOut("fast", function () {
		$("#account_options").fadeIn("fast")
	})
}

function return_settings() {
	$("#onesignal-bell-container").fadeOut("fast")
	goback.play()
	$("#account_options").fadeOut("fast", function () {
		$("#main_popup_settings").fadeIn("fast")
	})
}
function username_email_icon_show() {
	document.getElementById("options_section_1_username").innerHTML = localStorage.getItem("t50-username")
	document.getElementById("options_section_1_email").innerHTML = localStorage.getItem("t50-email")
	getBirth()
	//if (localStorage.getItem("t50-birthdate")) {
	//	document.getElementById("options_section_1_birthdate").innerHTML = localStorage.getItem("t50-birthdate")
	//} else {
	//	document.getElementById("options_section_1_birthdate").innerHTML = "Not set"
	//}

	if (localStorage.getItem("announcements-enabled")) {
		document.getElementById("options_section_1_announcements").innerHTML = localStorage.getItem("announcements-enabled")
	} else {
		document.getElementById("options_section_1_announcements").innerHTML = "Enabled"
	}
	loademails()
	$("#main_settings").fadeOut("fast", function () {
		$("#username_email_icon_show").fadeIn("fast")
	})

}


function disable2FA() {
	//disable 2fa
	fetch(`https://evox-datacenter.onrender.com/authip?method=forceadd&email=${localStorage.getItem("t50-email")}&username=${localStorage.getItem("t50-username")}&password=${atob(localStorage.getItem("t50pswd"))}&ip=null`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			document.getElementById("2fa_status").innerHTML = "Off"
			document.getElementById("2fa_button").onclick = function () {
				enable2FA(this);
			};
			localStorage.setItem("2fa_status", "Off")
			disabled.play()

		}).catch(error => {
			console.error(error)
		})
}

function enable2FA() {
	fetch(`https://evox-datacenter.onrender.com/authip?method=RemoveIP&username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&ip=null`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log("IP Remove Data", data)
			document.getElementById("2fa_status").innerHTML = "On"
			document.getElementById("2fa_button").onclick = function () {
				disable2FA(this);
			};
			localStorage.setItem("2fa_status", "On")
			ac_complete.play()

		}).catch(error => {
			console.error(error)
		})
}
function pswd_secure() {
	fetch(`https://evox-datacenter.onrender.com/authip?method=read&username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			if (data.includes("null")) {
				document.getElementById("2fa_status").innerHTML = "Off"
				document.getElementById("2fa_button").onclick = function () {
					enable2FA();
				};
				localStorage.setItem("2fa_status", "Off")
			} else {
				document.getElementById("2fa_status").innerHTML = "On"
				document.getElementById("2fa_button").onclick = function () {
					disable2FA();
				};
				localStorage.setItem("2fa_status", "On")
			}

		}).catch(error => {
			console.error(error)
		})
	//if (localStorage.getItem("2fa_status")) {
	//	document.getElementById("2fa_status").innerHTML = localStorage.getItem("2fa_status")
	//} else {
	//	document.getElementById("2fa_status").innerHTML = "Off"
	//}
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

function show_social() {
	$("#main_popup_settings").fadeOut("fast", function () {
		$("#evox_social").fadeIn("fast")
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
	//$("#bottom-logo").fadeOut("fast")
	$("#evox_social").fadeOut("fast", function () {
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
			ac_complete.play()

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
		fetch(`https://evox-datacenter.onrender.com/accounts?email=${document.getElementById("friend-email").innerHTML}&username=${friend}&method=last_login`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text();
			})
			.then(data => {
				if (data !== "Unknown") {
					const date = printTimeOrDate(data)
					document.getElementById("last_seen").innerHTML = date
					$("#user-friend").fadeIn("fast")
				} else {
					document.getElementById("last_seen").innerHTML = data
					$("#user-friend").fadeIn("fast")
				}

			})
			.catch(error => {
				console.error(error);
			});


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
			console.log(data);
			if (data === "") {
				$("#load-users-friends").fadeOut("fast", function () {
					let containerId = "list-friends";
					var listContainer = document.getElementById(containerId);
					listContainer.style.textAlign = "center";
					listContainer.style.marginTop = "50px";
					listContainer.innerHTML = "No Friends";
				});
				return;
			}
			const user_requests = JSON.parse(data);
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

							userDetails.appendChild(userName);
							userDetails.appendChild(userEmail);

							userContainer.appendChild(userCircle);
							userContainer.appendChild(userDetails);

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
										profileimage = "data:image/jpeg;base64," + profileimage;
										document.getElementById(`${username}-pfp-friends`).src = profileimage;
									} else {
										document.getElementById(`${username}-pfp-friends`).src = profileimage;
									}
								})
								.catch(error => {
									console.error("Cannot set src for", username);
									console.error(error);
								});
						}
					})
					.catch(error => {
						console.error(error);
					});
			});
			$("#load-users-friends").fadeOut("fast");
		})
		.catch(error => {
			console.error(error);
		});


	$("#evox_social").fadeOut("fast", function () {
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
	$("#evox_social").fadeOut("fast", function () {
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
				notice_s.play()
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
										}).catch(error => {
											console.error(error);
										});
								}
							}).catch(error => {
								console.error(error);
							});
					}).catch(error => {
						console.error(error);
					});


			});
		}).catch(error => {
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
	let current = document.getElementById("current_pswd")
	let newpswd = document.getElementById("new_pswd")
	let confirm = document.getElementById("confirm_pswd")
	current.value = ""
	newpswd.value = ""
	confirm.value = ""
	$("#same_pswd").fadeOut("fast")
	$("#old_pswd").fadeOut("fast")
	$("#wrong_pswd").fadeOut("fast")
	document.getElementById('gateway').style.filter = 'blur(50px)'
	document.getElementById("usr-img-chpswd").src = document.getElementById("usr-img-opt").src
	document.getElementById("usr-name-chpswd").innerHTML = document.getElementById("usr-name-opt").innerHTML
	document.getElementById("usr-email-chpswd").innerHTML = document.getElementById("usr-email-opt").innerHTML
	$("#pswd_secure").fadeOut("fast", function () {
		$("#password_change").fadeIn("fast")
	})
}

function return_to_options(where) {
	goback.play()
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
			//$("#bottom-logo").fadeIn("fast")
			$("#add_friends").fadeOut("fast", function () {
				$("#evox_social").fadeIn("fast")
			})
		} else if (where === "requests") {
			$("#friend_requests").fadeOut("fast", function () {
				$("#evox_social").fadeIn("fast")
			})
		} else if (where === "friends") {
			$("#friends").fadeOut("fast", function () {
				$("#evox_social").fadeIn("fast")
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
		} else if (where === "gateway_settings") {
			settings()
			vox()
			$("#background_change").fadeOut("fast", function () {
				$("#main_popup_settings").fadeIn("fast")
			})
		} else if (where === "evox_social") {
			$("#evox_social").fadeOut("fast", function () {
				$("#main_popup_settings").fadeIn("fast")
			})
		} else if (where === "password_change") {
			document.getElementById('gateway').style.filter = 'blur(20px)'
			$("#password_change").fadeOut("fast", function () {
				$("#pswd_secure").fadeIn("fast")
			})
		} else if (where === "authip") {
			$("#authips").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
			})
		} else if (where === "bg_settings") {
			$("#background_change_color").fadeOut("fast", function () {
				$("#background_change").fadeIn("fast")
			})
		} else if (where === "birth") {
			$("#date_of_birth_change").fadeOut("fast", function () {
				$("#username_email_icon_show").fadeIn("fast")
			})
		} else if (where === "add_email") {
			$("#add_email").fadeOut("fast", function () {
				$("#username_email_icon_show").fadeIn("fast")
			})
		} else if (where === "cancel_addemail") {
			$("#verify_email").fadeOut("fast", function () {
				$("#username_email_icon_show").fadeIn("fast")
			})
		} else if (where === "app_use_info") {
			$("#apps_using_evox").fadeOut("fast", function () {
				$("#pswd_secure").fadeIn("fast")
			})
		} else if (where === "evox_store") {
			$("#store").fadeOut("fast", function () {
				$("#main_popup_settings").fadeIn("fast")
			})
		} else if (where === "cryptox") {
			$("#cryptox_info").fadeOut("fast", function () {
				$("#main_settings").fadeIn("fast")
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
						document.getElementById("usr-img-opt").src = value
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
	settings()
	show_sline()
	//remove "secureline-" from element.id
	//window.location.href = `./secureline/?goto=${element.id}`
}

function bgch() {
	closevox()
	settings()
	try {
		var blurStyle = document.getElementById('bgimaget').style.filter;
		// Extract the blur amount from the filter style
		var blurAmount = parseFloat(blurStyle.match(/\d+/));

		console.log("Blur amount:", blurAmount, "pixels");
		var x = blurAmount; // Assuming x is 10 for example
		document.getElementById("myRange").value = x
	} catch {

	}

	$("#loading").fadeIn("fast")
	$("#main_popup_settings").fadeOut("fast", function () {
		$("#popup").addClass("active");
		//$("#popup").fadeIn("fast")
		$("#background_change").fadeIn("fast", function () {
			$("#loading").fadeOut("fast")
		})
		//$("#bottom-logo").fadeOut("slow")
	})
}

function addbg(element) {
	const which = element.src
	if (element.classList.contains("active")) {
		console.log("Activated");
		return;
	}
	let name;
	if (which.includes("localhost")) {
		name = which.replace(/^http:\/\/localhost:8080\/t50-gateway-alpha\/bgs\//, '');
	} else {
		name = which.replace(/^https:\/\/team50.sytes.net\/t50-gateway-alpha\/bgs\//, '');
	}

	if (name === "default_bg.png") {
		document.getElementById("background").innerHTML = `<div id="bgimaget" class="background" style="background: radial-gradient(circle, #400000, #000000)"></div>`
	} else {
		document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="background-image: url('${which}');background-size: cover;background-position: center;filter: blur(10px);"></div>`
	}
	document.getElementById("st1").classList.remove("active")
	document.getElementById("st2").classList.remove("active")
	document.getElementById("st3").classList.remove("active")
	document.getElementById("st4").classList.remove("active")
	try {
		document.getElementById("st5").classList.remove("active")
	} catch {
		console.error("Cannot find st5, normal err")
	}

	element.classList.add("active")
	localStorage.setItem("cbg", name)
	ac_complete.play()
	custombg()
}

function showUploadBox_BG() {
	document.getElementById('upload-box-bg').click();
}

function calculateImageSize(base64String) {
	// Remove the data URL prefix (e.g., 'data:image/jpeg;base64,')
	const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

	// Convert the base64 string to binary data
	const binaryData = atob(base64WithoutPrefix);

	// Calculate the size in megabytes
	const fileSizeInMB = binaryData.length / (1024 * 1024);

	return fileSizeInMB;
}

function handleFileSelect_BG() {
	const input = document.getElementById('upload-box-bg');
	const file = input.files[0];

	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const base64String = e.target.result;
			const totalSizeInMB = calculateImageSize(base64String);
			if (totalSizeInMB.toFixed(2) > 6.5) {
				alert(`File Is Too Large! (${totalSizeInMB.toFixed(2)}MB)`);
			} else {
				document.getElementById("background").innerHTML = `<div class="background" id="bgimaget" style="filter: blur(10px);background-image: url('${base64String}');background-size: cover;background-position: center;"></div>`
				document.getElementById("st1").classList.remove("active")
				document.getElementById("st2").classList.remove("active")
				document.getElementById("st3").classList.remove("active")
				document.getElementById("st4").classList.remove("active")
				document.getElementById("current").innerHTML = `<img class="active" id="st5" onclick="addbg(this)" src="${base64String}">`
				document.getElementById("current").style.display = ""
				localStorage.setItem("cbg", base64String)
				custombg()
			}

		};
		reader.readAsDataURL(file);
	}

	// Reset the input value to allow selecting the same file again
	input.value = '';
}

function complete_chpswd() {
	$("#old_pswd").fadeOut("fast")
	$("#wrong_pswd").fadeOut("fast")
	$("#same_pswd").fadeOut("fast")
	let current = document.getElementById("current_pswd").value
	let newpswd = document.getElementById("new_pswd").value
	let confirm = document.getElementById("confirm_pswd").value
	if (newpswd != confirm) {
		shake_me("confirm_pswd")
		return;
	}
	if (current === "") {
		shake_me("current_pswd")
		return;
	}
	if (newpswd === "") {
		shake_me("new_pswd")
		return;
	}
	if (current === newpswd) {
		$("#same_pswd").fadeIn("fast")
		console.log("Same Password!")
		return;
	}
	//info.email && info.password && info.username && info.newpass
	fetch('https://evox-datacenter.onrender.com/accounts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: localStorage.getItem("t50-email"),
			username: localStorage.getItem("t50-username"),
			password: current,
			newpass: newpswd
		})
	})
		.then(response => response.text())
		.then(data => {
			if (data === "Wrong Credentials") {
				shake_me("current_pswd")
				$("#wrong_pswd").fadeIn("fast")
			} else if (data === "Done") {
				localStorage.setItem("t50pswd", btoa(newpswd))
				$("#gateway").fadeOut("slow")
				$("#popup").removeClass("active");
				document.getElementById("current_pswd").value = ""
				document.getElementById("new_pswd").value = ""
				document.getElementById("confirm_pswd").value = ""
				const data = document.getElementById("gateway").innerHTML
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
					setTimeout(function () {
						$("#gateway").fadeOut("slow", function () {
							document.getElementById("gateway").innerHTML = data
							$("#gateway").fadeIn("slow")
							$("#popup").addClass("active");
							ac_complete.play()
						})


					}, 500)
				})
			} else if (data === "Cannot set previous password") {
				$("#old_pswd").fadeIn("fast")
				disabled.play()
				return;
			}
			//console.log(data);

		})
		.catch(error => {
			console.error(error);
		});
}


document.getElementById("current_pswd").addEventListener("keypress", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("new_pswd").focus()
	}
});
document.getElementById("new_pswd").addEventListener("keypress", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("confirm_pswd").focus()
	}
});
document.getElementById("confirm_pswd").addEventListener("keypress", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		complete_chpswd()
	}
});

function moretti() {
	document.getElementById("mt-disabled").src = "ZKZx.gif"
	setTimeout(function () {
		const oldhtml = document.getElementById("notification").innerHTML
		var notification = document.getElementById('notification');
		if (notification.className.includes("show")) {
			console.log("Notification Is Shown")
			notification.classList.remove('show');
			setTimeout(function () {
				document.getElementById("notification").innerHTML = "You are not in a safe environment.<br>Moretti cannot load."
				notification.classList.add('show');
				setTimeout(function () {
					notification.classList.remove('show');
				}, 2500);
			}, 500)
		} else {
			document.getElementById("notification").innerHTML = "You are not in a safe environment.<br>Moretti cannot load."
			notification.classList.add('show');
			setTimeout(function () {
				notification.classList.remove('show');
			}, 2500);
		}
		setTimeout(function () {
			document.getElementById("notification").innerHTML = oldhtml
		}, 3000)




	}, 1500)
	alert(`This will redirect you to Moretti onion dashboard for ${localStorage.getItem("t50-username")}`)
	shake_me('mt-disabled')
	document.getElementById("mt-disabled").src = "mt.jpg"
}

function notice(message) {
	const oldhtml = document.getElementById("notification").innerHTML
	var notification = document.getElementById('notification');
	if (notification.className.includes("show")) {
		console.log("Notification Is Shown")
		notification.classList.remove('show');
		setTimeout(function () {
			document.getElementById("notification").innerHTML = message
			notification.classList.add('show');
			setTimeout(function () {
				notification.classList.remove('show');
			}, 2500);
		}, 500)
	} else {
		document.getElementById("notification").innerHTML = message
		notification.classList.add('show');
		setTimeout(function () {
			notification.classList.remove('show');
		}, 2500);
	}
	setTimeout(function () {
		document.getElementById("notification").innerHTML = oldhtml
	}, 3000)
}

function dots() {
	if (sessionStorage.getItem("more_options")) {
		sessionStorage.removeItem("more_options")
		more_opt_c.play()
		//console.log("Hiding more options")
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.opacity = "0";
		animatedButton.style.transform = "translateY(20px)";
		setTimeout(function () {
			animatedButton.style.display = "none";
		}, 500); // Adjust the timing as needed

		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.opacity = "0";
		animatedButton2.style.transform = "translateY(20px)";
		setTimeout(function () {
			animatedButton2.style.display = "none";
		}, 500); // Adjust the timing as needed
	} else {
		more_opt.play()
		//console.log("Showing more options")
		sessionStorage.setItem("more_options", "active")
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.display = "block";
		setTimeout(function () {
			animatedButton.style.opacity = "1";
			animatedButton.style.transform = "translateY(0)";
		}, 100);
		//animatedButton_chats
		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.display = "block";
		setTimeout(function () {
			animatedButton2.style.opacity = "1";
			animatedButton2.style.transform = "translateY(0)";
		}, 100);
	}

}

function profile() {
	show_account()
	settings()
}

function errors() {
	//id errors
	localStorage.setItem("error_XMGE", "seen")
	var notification = document.getElementById('notification');
	notification.classList.add('show');
	setTimeout(function () {
		notification.classList.remove('show');
		setTimeout(function () {
			$("#errors").fadeOut("slow")
		}, 500)
	}, 2500);

}

let currentIndex = 0;

function prevSlide() {
	if (currentIndex > 0) {
		currentIndex--;
		updateCarousel();
	}
}

function nextSlide() {
	if (currentIndex < document.querySelectorAll('.app').length - 1) {
		currentIndex++;
		updateCarousel();
	}
}

function updateCarousel() {
	const carousel = document.getElementById('apps');
	const offset = currentIndex * (carousel.offsetWidth / 2);
	carousel.style.transform = `translateX(-${offset}px)`;
}

function apparrow() {
	const div = document.getElementById('apps');
	const numElements = div.children.length;
	if (numElements > 5) {
		console.log("Showing buttons, length", numElements)
		$("#buttons").fadeIn("slow")
	} else {
		console.log("Not showing buttons, length", numElements)
	}
}


function vox() {
	qactions()
	document.getElementById("gateway").style.filter = "blur(25px)"
	document.getElementById("vox_cont").classList.add("active")
	$("#settings").fadeOut("fast")
	$("#vox").fadeOut("fast")
	qastart.play()
	if (document.getElementById("animatedButton_notif").style.display === "block") {
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.opacity = "0";
		animatedButton.style.transform = "translateY(20px)";
		setTimeout(function () {
			animatedButton.style.display = "none";
		}, 500); // Adjust the timing as needed


	}
	if (document.getElementById("animatedButton_chats").style.display === "block") {
		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.opacity = "0";
		animatedButton2.style.transform = "translateY(20px)";
		setTimeout(function () {
			animatedButton2.style.display = "none";
		}, 500); // Adjust the timing as needed
	}
}
function closevox() {
	document.getElementById("gateway").style.filter = ""
	document.getElementById("vox_cont").classList.remove("active")
	$("#settings").fadeIn("fast")
	$("#vox").fadeIn("fast")
	qaexit.play()
	if (sessionStorage.getItem("more_options") === "active") {
		console.log("Showing more options")
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.display = "block";
		setTimeout(function () {
			animatedButton.style.opacity = "1";
			animatedButton.style.transform = "translateY(0)";
		}, 100);
		//animatedButton_chats
		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.display = "block";
		setTimeout(function () {
			animatedButton2.style.opacity = "1";
			animatedButton2.style.transform = "translateY(0)";
		}, 100);
	}
}

function clearNotifications() {
	$("#notif_container").fadeOut("fast")
	fetch(`https://evox-datacenter.onrender.com/notifications?process=clear&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			show_notif("no")
			$("#notif_container").fadeIn("fast")
		}).catch(error => {
			console.error(error)
		})
}


function show_notif(nosound) {
	fetch(`https://evox-datacenter.onrender.com/notifications?process=get&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data);
			var container = document.getElementById("notif_container");
			container.innerHTML = "";
			if (data === `{"notifications":[]}` || data === "No notifications!") {
				var a = document.createElement("a");
				a.href = "#";
				a.className = "apple-button";
				a.appendChild(document.createTextNode("There's nothing here, yet." + " "));
				container.appendChild(a);
				return;
			}
			let jsonData = JSON.parse(data);
			var notifications = jsonData.notifications;
			console.log(notifications);
			notifications.reverse(); // Reverse the order of notifications

			notifications.forEach(function (notification) {
				var image;
				const sentimage = notification.image;
				if (!sentimage.includes("http")) {
					const url = `https://evox-datacenter.onrender.com/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${notification.image}`;
					fetch(url)
						.then(response => response.text())
						.then(data => {
							if (data.indexOf("base64") === -1) {
								// If it doesn't contain "base64", add the prefix
								data = "data:image/jpeg;base64," + data;
							}
							image = data;
							createNotificationElement(image, notification);
						})
						.catch(error => {
							console.error(error);
						});

				} else {
					image = notification.image;
					createNotificationElement(image, notification);
				}
			});

		})
		.catch(error => {
			console.error(error);
		});

	document.getElementById("notifications").classList.add("active");
	$("#settings").fadeOut("fast");
	$("#vox").fadeOut("fast");
	if (!nosound) {
		notifications.play();
	} else {
		notice_s.play();
	}

	if (document.getElementById("animatedButton_notif").style.display === "block") {
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.opacity = "0";
		animatedButton.style.transform = "translateY(20px)";
		setTimeout(function () {
			animatedButton.style.display = "none";
		}, 500); // Adjust the timing as needed
	}
	if (document.getElementById("animatedButton_chats").style.display === "block") {
		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.opacity = "0";
		animatedButton2.style.transform = "translateY(20px)";
		setTimeout(function () {
			animatedButton2.style.display = "none";
		}, 500); // Adjust the timing as needed
	}
}

function createNotificationElement(image, notification) {
	var container = document.getElementById("notif_container");
	var currentDate = null;

	var timestamp = new Date(notification.timestamp);
	var day = timestamp.getDate();
	var month = timestamp.getMonth() + 1; // Months are zero-based
	var formattedDate = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '') + month;

	// Check if the date separator already exists
	var existingDateSeparator = document.querySelector('.notifdate[data-date="' + formattedDate + '"]');
	if (!existingDateSeparator) {
		var dateSeparator = document.createElement("p");
		dateSeparator.className = "notifdate";
		dateSeparator.textContent = timestamp.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
		dateSeparator.setAttribute('data-date', formattedDate);
		container.appendChild(dateSeparator);
	}

	var a = document.createElement("a");
	a.href = "#";
	a.className = "apple-button";
	a.style.display = "flex";
	a.style.alignItems = "center";
	a.onclick = function () {
		go_to(notification.app, this);
	};

	var div = document.createElement("div");
	div.className = "user-circle";
	div.style.marginRight = "10px";
	div.style.width = "50px";
	div.style.height = "50px";

	var img = document.createElement("img");
	img.src = image;
	img.alt = "User Image";
	div.appendChild(img);

	var p = document.createElement("p");
	p.textContent = notification.content;
	p.style.margin = "10px";

	var span = document.createElement("span");
	span.textContent = formattedDate;

	a.appendChild(div);
	a.appendChild(p);

	container.appendChild(a);
}


function close_notif() {
	notif_out.play()
	document.getElementById("notifications").classList.remove("active")
	$("#settings").fadeIn("fast")
	$("#vox").fadeIn("fast")
	if (sessionStorage.getItem("more_options") === "active") {
		console.log("Showing more options")
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.display = "block";
		setTimeout(function () {
			animatedButton.style.opacity = "1";
			animatedButton.style.transform = "translateY(0)";
		}, 100);
		//animatedButton_chats
		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.display = "block";
		setTimeout(function () {
			animatedButton2.style.opacity = "1";
			animatedButton2.style.transform = "translateY(0)";
		}, 100);
	}
}

function oneo(element) {
	shake_me(element.id)
	console.log("PlaceHolder")
}

function show_sline() {
	fetch(`https://evox-datacenter.onrender.com/accounts?method=cryptox-status&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(status => {
			if (status.includes("Enabled")) {
				sline_open.play()
				document.getElementById('gateway').style.filter = 'blur(35px)'
				document.getElementById("secureline").classList.add("active")
				$("#profile").fadeOut("fast")
				$("#vox").fadeOut("fast")
				$("#dots").fadeOut("fast")
				$("#settings").fadeOut("fast")
				if (document.getElementById("animatedButton_notif").style.display === "block") {
					var animatedButton = document.getElementById("animatedButton_notif");
					animatedButton.style.opacity = "0";
					animatedButton.style.transform = "translateY(20px)";
					setTimeout(function () {
						animatedButton.style.display = "none";
					}, 500); // Adjust the timing as needed
				}
				if (document.getElementById("animatedButton_chats").style.display === "block") {
					var animatedButton2 = document.getElementById("animatedButton_chats");
					animatedButton2.style.opacity = "0";
					animatedButton2.style.transform = "translateY(20px)";
					setTimeout(function () {
						animatedButton2.style.display = "none";
					}, 500); // Adjust the timing as needed
				}
				getFriends()
			} else if (status === "Disabled") {
				//Prompt to reenable
			} else if (status === "Ready To Setup") {
				click.play()
				var disabledDiv = document.body;
				disabledDiv.classList.toggle('disabled');
				document.getElementById("sline_cryptox").classList.add("active")


			} else {
				console.error("I dont know what i got from cryptox:", status)
			}

		}).catch(error => {
			console.error(error);
		});

}

function enableCryptox() {
	login_ok.play()
	fetch(`https://evox-datacenter.onrender.com/cryptox?method=create&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(cryptoxcheck => {
			if (cryptoxcheck === "Cryptox Already Enabled" || cryptoxcheck === "Cryptox Enabled") {
				console.log("I can proceed!")
				var disabledDiv = document.body;
				disabledDiv.classList.toggle('disabled');
				document.getElementById("sline_cryptox").classList.remove("active")
				show_sline()
			} else {
				console.error(cryptoxcheck)
			}
		}).catch(error => {
			console.error(error);
		});
}

function cancelCryptox() {
	disabled.play()
	var disabledDiv = document.body;
	disabledDiv.classList.toggle('disabled');
	document.getElementById("sline_cryptox").classList.remove("active")
}

function close_sline() {

	let fixxint;
	try {
		clearInterval(profint)
		try {
			clearInterval(fixxint)
		} catch {
			//
		}
	} catch {
		fixxint = setInterval(function () {
			clearInterval(profint)
		})
	}
	document.getElementById('gateway').style.filter = ''
	sline_close.play()
	document.getElementById("secureline").classList.remove("active")
	$("#profile").fadeIn("fast")
	$("#vox").fadeIn("fast")
	$("#dots").fadeIn("fast")
	$("#settings").fadeIn("fast")
	if (sessionStorage.getItem("more_options") === "active") {
		console.log("Showing more options")
		var animatedButton = document.getElementById("animatedButton_notif");
		animatedButton.style.display = "block";
		setTimeout(function () {
			animatedButton.style.opacity = "1";
			animatedButton.style.transform = "translateY(0)";
		}, 100);
		//animatedButton_chats
		var animatedButton2 = document.getElementById("animatedButton_chats");
		animatedButton2.style.display = "block";
		setTimeout(function () {
			animatedButton2.style.opacity = "1";
			animatedButton2.style.transform = "translateY(0)";
		}, 100);
	}
}

function addbg_color(element) {
	$("#background_change").fadeOut("fast")
	$("#background_change_color").fadeIn("fast")
	setInterval(function () {
		let hex = document.getElementById("hexInput").value
		const selectedColor = hex;
		if (selectedColor !== "") {
			const gradient = `radial-gradient(circle, ${selectedColor}, #000000)`;
			image.style.background = gradient;
		}

	}, 200)
}

function submitcolorch() {
	let hex = document.getElementById("hexInput").value
	const selectedColor = hex;
	document.getElementById("background").innerHTML = `<div id="bgimaget" class="background" style="background: radial-gradient(circle, ${selectedColor}, #000000)"></div>`
	localStorage.setItem("cbg", selectedColor)
	document.getElementById("st1").classList.add("active")
	document.getElementById("st2").classList.remove("active")
	document.getElementById("st3").classList.remove("active")
	document.getElementById("st4").classList.remove("active")
	document.getElementById("bgname").innerHTML = "Custom Color"
	document.getElementById("bgname").style.color = "#fff"
	notice_s.play()
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
//output.innerHTML = slider.value;



// Get the computed style directly from the element's style object

slider.oninput = function () {

	//output.innerHTML = this.value;
	let inputamount = this.value
	var y = inputamount; // Assuming x is 10 for example

	// Solve for y
	//var y = x / 100;
	//var x = 100*y
	document.getElementById('bgimaget').style.filter = `blur(${y}px)`
	localStorage.setItem("cbg-blur", y)
}

function removeIP(element) {
	$("#authip_back_btn").fadeOut("fast", function () {
		document.getElementById("authips").style.filter = "blur(10px)"
		document.getElementById("removeIP_box").classList.add("active")
		const ip = element.innerHTML
		console.log("IP", ip)
		document.getElementById("ip-del-content").innerHTML = ip

	})


}

function cancel_ipremove() {

	document.getElementById("authips").style.filter = ""
	document.getElementById("removeIP_box").classList.remove("active")
	setTimeout(function () {
		$("#authip_back_btn").fadeIn("fast", function () {
			document.getElementById("ip-del-content").innerHTML = ""
		})
	}, 500)
}

function confirm_ipremove() {
	const ip = document.getElementById("ip-del-content").innerHTML
	fetch(`https://evox-datacenter.onrender.com/authip?method=RemoveIP&username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&ip=${ip}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log("IP Remove Data", data)
			document.getElementById("authips").style.filter = ""
			document.getElementById("removeIP_box").classList.remove("active")
			setTimeout(function () {
				$("#authip_back_btn").fadeIn("fast", function () {
					document.getElementById("ip-del-content").innerHTML = ""
				})
			}, 500)
			show_authip()
			ac_complete.play()

		}).catch(error => {
			console.error(error)
		})
}

//cancel_ipremove
//confirm_ipremove

function loadflrdinf() {
	//$("#onesignal-bell-container").fadeIn("fast")
 FloridaRun()
	setTimeout(function () {
		const oldhtml = document.getElementById("notification").innerHTML
		var notification = document.getElementById('notification');
		if (notification.className.includes("show")) {
			$("#flrd_svg").fadeOut("fast")
			console.log("Notification Is Shown")
			notification.classList.remove('show');
			setTimeout(function () {
				document.getElementById("notification").innerHTML = sessionStorage.getItem("flrd_info")
				notification.classList.add('show');
				$("#flrd_svg").fadeOut("fast")
				setTimeout(function () {
					notification.classList.remove('show');
				}, 2500);
			}, 500)
		} else {
			$("#flrd_svg").fadeIn("fast")
			document.getElementById("notification").innerHTML = sessionStorage.getItem("flrd_info")
			notification.classList.add('show');
			$("#flrd_svg").fadeOut("fast")
			setTimeout(function () {
				notification.classList.remove('show');
			}, 2500);
		}
		setTimeout(function () {
			document.getElementById("notification").innerHTML = oldhtml
		}, 3000)




	}, 1900)
}

//date_of_birth_change
function birth_date() {
	document.getElementById("usr-name-chbirth").innerHTML = localStorage.getItem("t50-username")
	document.getElementById("usr-email-chbirth").innerHTML = localStorage.getItem("t50-email")
	document.getElementById("usr-img-chbirth").src = sessionStorage.getItem("pfp")
	$("#username_email_icon_show").fadeOut("fast", function () {
		$("#date_of_birth_change").fadeIn("fast")
	})
}

function isNumber(value) {
	return typeof value === 'number';
}

document.getElementById("day_b").addEventListener("keyup", function () {
	var input = this.value; // 'this' refers to the input field

	// Check if the input length is 2
	if (input.length === 2) {
		// Perform the action, for example, display an alert
		document.getElementById("month_b").focus()

		// You can add more actions here as needed
	}
});
document.getElementById("month_b").addEventListener("keyup", function () {
	var input = this.value; // 'this' refers to the input field

	// Check if the input length is 2
	if (input.length === 2 || input === "2" || input === "3" || input === "4" || input === "5" || input === "6" || input === "7" || input === "8" || input === "9") {
		// Perform the action, for example, display an alert
		document.getElementById("year_b").focus()

		// You can add more actions here as needed
	}
});
document.getElementById("year_b").addEventListener("keypress", function (event) {
	// Check if the Enter key is pressed
	if (event.keyCode === 13) {
		// Do something when Enter is pressed
		complete_birth()
		// You can add your desired action here
	}
});



function complete_birth() {
	let currentDate = new Date();
	let day = Number(document.getElementById("day_b").value)
	let month = Number(document.getElementById("month_b").value)
	let year = Number(document.getElementById("year_b").value)
	if (isNumber(day) && isNumber(month) && isNumber(year) && !isNaN(day) && !isNaN(month) && !isNaN(year)) {
		if (day > 0 && day <= 31 && month > 0 && month < 13 && year > 1899 && year < currentDate.getFullYear()) {
			document.getElementById("error_date").style.display = "none"
			let birthdate = `${day}/${month}/${year}`
			console.log(birthdate)
			fetch(`https://evox-datacenter.onrender.com/accounts?birth=true&username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&what=${birthdate}`)
				.then(response => {
					if (!response.ok) {
						throw new Error(`HTTP error! Status: ${response.status}`);
					}
					return response.text();
				})
				.then(data => {
					if (data === "Done") {
						return_to_options("birth")
						document.getElementById("day_b").value = ""
						document.getElementById("month_b").value = ""
						document.getElementById("year_b").value = ""
						getBirth()
						ac_complete.play()
					}

				}).catch(error => {
					console.error(error)
				})
		} else {
			console.log("Invalid Numbers")
			document.getElementById("error_date").style.display = ""
		}

	} else {
		console.log("Something isnt a number")
		document.getElementById("error_date").style.display = ""
	}



}

function getBirth() {
	fetch(`https://evox-datacenter.onrender.com/accounts?birth=get&username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			if (data === "") {
				document.getElementById("options_section_1_birthdate").innerHTML = "Not set"
			} else {
				document.getElementById("options_section_1_birthdate").innerHTML = data
				let dateParts = data.split('/');

				let day = parseInt(dateParts[0]);
				let month = parseInt(dateParts[1]);
				let year = parseInt(dateParts[2]);

				document.getElementById("day_b").value = day
				document.getElementById("month_b").value = month
				document.getElementById("year_b").value = year
			}


		}).catch(error => {
			console.error(error)
		})
}

function go_to(where, element) {
	// Find the <p> element inside the temporary element
	click.stop()
	notif_out.stop()
	const paragraphElement = element.querySelector('p');
	let paragraphContent;
	// Check if the <p> element exists
	if (paragraphElement) {
		// Get the text content of the <p> element
		paragraphContent = paragraphElement.textContent.trim();
		console.log(paragraphContent); // Output the content of <p>
	} else {
		console.log("No <p> element found in the provided HTML string.");
	}
	//where may be secureline or a url that contains an image for an evox app
	if (where === "Secureline") {
		close_notif()
		show_sline()
	} else if (paragraphContent.includes("IP")) {
		close_notif()
		profile()
		show_authip()
	} else if (paragraphContent.includes("Password")) {
		close_notif()
		profile()
	} else {
		console.log("Could not find what to do for", where)
	}

}

const appleButtons = document.querySelectorAll('.apple-button');

// Add click event listener to each apple button
appleButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Do something when the button is clicked
		console.log("Button clicked!");
		click.play()
	});
});

const appleButtonsWIC = document.querySelectorAll('.apple-button-withicon');

// Add click event listener to each apple button
appleButtonsWIC.forEach(button => {
	button.addEventListener('click', () => {
		// Do something when the button is clicked
		//console.log("Button clicked!");
		click_social.play()
	});
});

function printTimeOrDate(inputTime) {
	const inputDate = new Date(inputTime);
	const currentDate = new Date();

	const isToday = inputDate.getDate() === currentDate.getDate() &&
		inputDate.getMonth() === currentDate.getMonth() &&
		inputDate.getFullYear() === currentDate.getFullYear();

	if (isToday) {
		console.log(padWithZero(inputDate.getHours()) + ":" +
			padWithZero(inputDate.getMinutes()));
		return padWithZero(inputDate.getHours()) + ":" +
			padWithZero(inputDate.getMinutes());
	} else {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		const day = inputDate.getDate();
		const month = months[inputDate.getMonth()];
		const year = inputDate.getFullYear();
		console.log(month + " " + day + " " + year);
		return month + " " + day + " " + year
	}
}

function padWithZero(number) {
	return number < 10 ? '0' + number : number;
}

function addemail() {
	document.getElementById("usr-img-addemail").src = document.getElementById("usr-img-opt").src
	document.getElementById("usr-name-addemail").innerHTML = document.getElementById("usr-name-opt").innerHTML
	document.getElementById("usr-email-addemail").innerHTML = document.getElementById("usr-email-opt").innerHTML
	$("#username_email_icon_show").fadeOut("fast", function () {
		$("#add_email").fadeIn("fast")
	})
}

function complete_addemail() {

	let email = document.getElementById("new_email").value
	if (email === "") {
		error.play()
		shake_me("new_email")
		return;
	} else {
		login_ok.play()
	}
	fetch(`https://evox-datacenter.onrender.com/accounts?method=addemail&newemail=${email}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			document.getElementById("new_email").value = ""
			if (data === "Waiting For Verification") {
				document.getElementById("usr-img-vermail").src = document.getElementById("usr-img-opt").src
				document.getElementById("usr-name-vermail").innerHTML = document.getElementById("usr-name-opt").innerHTML
				document.getElementById("usr-email-vermail").innerHTML = `${document.getElementById("usr-email-opt").innerHTML} && ${email}`
				document.getElementById("textfinalstep").innerHTML = `Final step! Please enter the code that was sent to ${email}.`
				sessionStorage.setItem("ver_code_email", email)
				$("#add_email").fadeOut("fast", function () {
					$("#verify_email").fadeIn("fast")
				})

			} else if (data === "Email in use") {
				shake_me("new_email")
				error.play()
			} else {
				error.play()
			}


		}).catch(error => {
			console.error(error)
		})
}

function verify_addemail() {
	let code = document.getElementById("email_new_ver_code").value
	let email = sessionStorage.getItem("ver_code_email")
	if (code === "") {
		error.play()
		shake_me("email_new_ver_code")
		return;
	}
	fetch(`https://evox-datacenter.onrender.com/accounts?method=ver_new_email&email=${email}&what=${code}&mainemail=${localStorage.getItem("t50-email")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			document.getElementById("email_new_ver_code").value = ""
			if (data === "Complete") {
				ac_complete.play()
				sessionStorage.removeItem("ver_code_email")
				console.log("Complete!")
				return_to_options('cancel_addemail')
				loademails()
			} else if (data === "Incorrect Code") {
				error.play()
				shake_me("email_new_ver_code")
			} else if (data === "Email set already") {
				error.play()
				return_to_options('cancel_addemail')
				loademails()
			} else {
				console.error("Unknown response:", data)
				error.play()
			}


		}).catch(error => {
			console.error(error)
		})
}

function loademails() {
	fetch(`https://evox-datacenter.onrender.com/accounts?method=getemails&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			if (data === "None") {
				return;
			}
			let thisJson = JSON.parse(data)
			const container = document.getElementById("more_emails");
			container.innerHTML = ""

			thisJson.forEach(email => {
				const link = document.createElement("a");
				link.href = "#";
				link.classList.add("apple-button");
				link.innerHTML = email;
				link.onclick = function () {
					removeEmail(this)
				};
				container.appendChild(link);
				container.appendChild(document.createElement("br")); // Adding line breaks for separation
			});


		}).catch(error => {
			console.error(error)
		})

}

function sign_in_wevox() {
	let container = document.getElementById("more_apps")
	let appshtml = document.getElementById("apps").innerHTML
	if (appshtml.includes("load('images')")) {
		//console.log("Images Available")
		container.innerHTML = `<a onclick="app_use_info('images')" href="#" class="apple-button-withicon"><img style="width: auto; height: 40px; margin-right: 10px; border-radius: 7px;box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);" src="t50-img.png">
		T50 Images
		<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
		<path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#666"></path>
	</svg></a>`
	} else if (localStorage.getItem("images-owned") === "true") {
		container.innerHTML = `<a onclick="app_use_info('images')" href="#" class="apple-button-withicon"><img style="width: auto; height: 40px; margin-right: 10px; border-radius: 7px;box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);" src="t50-img.png">
		T50 Images
		<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
		<path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#666"></path>
	</svg></a>`
	}

	if (localStorage.getItem("notes-owned") === "true") {
		container.innerHTML = `${container.innerHTML}<a onclick="app_use_info('evox_notes')" href="#" class="apple-button-withicon"><img style="width: auto; height: 40px; margin-right: 10px; border-radius: 7px;box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);" src="EvoxNotes.png">
		Evox Notes
		<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
		<path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#666"></path>
	</svg></a>`
	}
	if (localStorage.getItem("chatvia-owned") === "true") {
		container.innerHTML = `${container.innerHTML}<a onclick="app_use_info('chatvia')" href="#" class="apple-button-withicon"><img style="width: auto; height: 40px; margin-right: 10px; border-radius: 7px;box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);" src="chatvia-img.png">
		Chatvia
		<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
		<path d="M9.71069 18.2929C10.1012 18.6834 10.7344 18.6834 11.1249 18.2929L16.0123 13.4006C16.7927 12.6195 16.7924 11.3537 16.0117 10.5729L11.1213 5.68254C10.7308 5.29202 10.0976 5.29202 9.70708 5.68254C9.31655 6.07307 9.31655 6.70623 9.70708 7.09676L13.8927 11.2824C14.2833 11.6729 14.2833 12.3061 13.8927 12.6966L9.71069 16.8787C9.32016 17.2692 9.32016 17.9023 9.71069 18.2929Z" fill="#666"></path>
	</svg></a>`
	}

	$("#pswd_secure").fadeOut("fast", function () {
		$("#apps_using_evox").fadeIn("fast")
	})
	console.log("Evox Apps Info Show clicked")
}

function removeEmail(element) {
	document.getElementById("hide_for_rememail").style.display = "none"
	document.getElementById("username_email_icon_show").style.filter = "blur(10px)"
	document.getElementById("confirm_email_remove").classList.add("active")
	document.getElementById("email-del-content").innerHTML = element.innerHTML
}

function cancelRemoveEmail() {
	document.getElementById("username_email_icon_show").style.filter = ""
	document.getElementById("confirm_email_remove").classList.remove("active")
	setTimeout(function () {
		document.getElementById("hide_for_rememail").style.display = ""
	}, 550)

	document.getElementById("email-del-content").innerHTML = ""
}

function confirmRemoveEmail() {
	let emailtorem = document.getElementById("email-del-content").innerHTML
	fetch(`https://evox-datacenter.onrender.com/accounts?method=removeemail&email=${emailtorem}&password=${atob(localStorage.getItem("t50pswd"))}&mainemail=${localStorage.getItem("t50-email")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			console.log(data)
			document.getElementById("email_new_ver_code").value = ""
			if (data === "Complete") {
				ac_complete.play()
				document.getElementById("username_email_icon_show").style.filter = ""
				document.getElementById("confirm_email_remove").classList.remove("active")
				setTimeout(function () {
					document.getElementById("hide_for_rememail").style.display = ""
				}, 550)

				document.getElementById("email-del-content").innerHTML = ""
				loademails()
			} else {
				console.error("Unknown response:", data)
				error.play()
			}


		}).catch(error => {
			console.error(error)
		})
}

function qactions() {
	fetch(`https://evox-datacenter.onrender.com/social?username=${localStorage.getItem("t50-username")}&todo=getRequests`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(data => {
			if (data === "None") {
				//Noting

			} else {
				let requests = JSON.parse(data)
				const reqcount = requests.length;
				if (reqcount >= 1) {
					//show req
					$("#friend_req_fastacc").fadeIn("fast")
					document.getElementById("friend_req_fastacc").innerHTML = `Accept All Friend Requests <span>(${reqcount})</span>`
				}
			}

		}).catch(error => {
			console.error(error);
		});

	//get weather
	fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Athens,GR?key=QE9ZKFMB84GFA95Z7EJCR5ASG`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(weather => {
			var responseData = JSON.parse(weather)
			var celsiusValue = fahrenheitToCelsius(responseData.currentConditions.temp);
			var temperature = celsiusValue;
			var windSpeed = responseData.currentConditions.visibility;
			if (temperature < 21) {
				document.getElementById("weather-icon").src = "./icons/temperature-low.svg"
			} else {
				document.getElementById("weather-icon").src = "./icons/temperature-sun.svg"
			}
			if (temperature < 14) {
				document.getElementById("weather-icon").src = "./icons/temperature-snow.svg"
			}

			// Creating HTML elements to display weather information
			document.getElementById("weather-c").innerHTML = "Temperature: " + temperature + "°C"
			document.getElementById("weather-vis").innerHTML = "Visibility: " + windSpeed + " km"
		}).catch(error => {
			console.error(error);
		});

}

function fahrenheitToCelsius(fahrenheit) {
	var celsius = (fahrenheit - 32) * (5 / 9);
	return Math.round(celsius);
}


function qa_pfp() {
	showUploadBox()
}

function store() {
	let appshtml = document.getElementById("apps").innerHTML

	let chatvia = document.getElementById("chatvia-get")
	let tasco = document.getElementById("tasco-get")
	let gateway = document.getElementById("gateway-get")
	let images = document.getElementById("images-get")
	let notes = document.getElementById("notes-get")

	let owned_json = []
	if (appshtml.includes("load('images')")) {
		//console.log("Images Available")
		owned_json.push("images")
	} else if (localStorage.getItem("images-owned") === "true") {
		owned_json.push("images")
	}

	if (localStorage.getItem("notes-owned") === "true") {
		owned_json.push("notes")
	}
	if (localStorage.getItem("chatvia-owned") === "true") {
		owned_json.push("chatvia")
	}

	if (owned_json.includes("images")) {
		images.innerHTML = "OPEN"
	}
	if (owned_json.includes("notes")) {
		notes.innerHTML = "OPEN"
	}
	if (owned_json.includes("chatvia")) {
		chatvia.innerHTML = "OPEN"
	}
	//shake_me("evox_store")
	$("#main_popup_settings").fadeOut("fast", function () {
		$("#store").fadeIn("fast")
	})

	//error.play()
}

function getNOpen(element) {
	var getButton = element.querySelector('.get-button');

	// Change the inner HTML of the <span> element
	getButton.style.height = "17px"
	getButton.style.width = "30px"
	//height: 17px; width: 30px
	getButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="55%" height="55%">
	<circle cx="50" cy="50" r="45" fill="none" stroke="#fff" stroke-width="10">
		<animate attributeName="stroke-dasharray" values="0, 200;200, 0" dur="2s"
			repeatCount="indefinite" />
		<animate attributeName="stroke-dashoffset" values="0, -200;-200, -900" dur="2s"
			repeatCount="indefinite" />
	</circle>
</svg>`;
}


function cryptox() {
	fetch(`https://evox-datacenter.onrender.com/accounts?method=cryptox-status&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.text();
		})
		.then(status => {
			if (status.includes("Enabled")) {
				console.log(status)
				var parts = status.split(":");
				var iv = parts[1].trim();
				document.getElementById("cryptox-status").checked = true
				document.getElementById("cryptox-iv").style.display = "block"
				document.getElementById("cryptox-iv").value = `IV: ${iv}`
			} else if (status === "Disabled") {
				document.getElementById("cryptox-status").checked = false
				document.getElementById("cryptox-iv").style.display = "none"
			} else if (status === "Ready To Setup") {
				//hide toggle show button to create
				document.getElementById("cryptox-status").checked = false
				document.getElementById("cryptox-iv").style.display = "none"
			}

			$("#main_settings").fadeOut("fast", function () {
				$("#cryptox_info").fadeIn("fast")
			})

		}).catch(error => {
			console.error(error);
		});

}

function changeCryptox() {
	let toggle = document.getElementById("cryptox-status").checked
	if (toggle === false) {
		console.log("Disable")
		fetch(`https://evox-datacenter.onrender.com/cryptox?method=disable&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text();
			})
			.then(check => {
				if (check === "Done") {
					console.log("Cryptox Disabled")
					cryptox()
				} else {
					console.error(check)
				}
			}).catch(error => {
				console.error(error);
			});
	} else {
		console.log("Enable")
		login_ok.play()
		fetch(`https://evox-datacenter.onrender.com/cryptox?method=create&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&username=${localStorage.getItem("t50-username")}`)
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.text();
			})
			.then(cryptoxcheck => {
				if (cryptoxcheck === "Cryptox Already Enabled" || cryptoxcheck === "Cryptox Enabled") {
					console.log("I can proceed!")
					cryptox()
				} else {
					console.error(cryptoxcheck)
				}
			}).catch(error => {
				console.error(error);
			});
	}
}
