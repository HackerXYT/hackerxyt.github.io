const formlog = document.getElementById("login-form");
const BtnLog = document.getElementById("login-form-submit");
const BtnUp = document.getElementById("signup-form-submit");
const ErrorMessage = document.getElementById("login-error-msg");
console.log("%cThis server does not allow external files, which means that some credentials are exposed to the public", "color: red; font-size: xx-large");

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}
setTimeout(function() {
	console.log("Forgot Password Method Shown")
	$("#cant").fadeIn(800);
}, 4000);

const queryString = window.location.search;
//console.log(queryString);
const urlParams = new URLSearchParams(queryString);

const product = urlParams.get('twentyonecorelogin')
const ip = urlParams.get('identifier')
const dev = urlParams.get('dev')
const twentyone = urlParams.get('twentyone')
const autofill = urlParams.get('autofill')
if (autofill === null) {
	//OK
} else {
	if (autofill === "21") {
		document.getElementById('username').value = "21";
		document.getElementById('password').value = "admin";
		setTimeout(function() {
			document.getElementById("login-form-submit").click()
		}, 1350);
	} else if (autofill === "dritsas") {
		document.getElementById('username').value = "dritsas";
		document.getElementById('password').value = "08";
		setTimeout(function() {
			document.getElementById("login-form-submit").click()
		}, 1350);
	} else if (autofill === "psaltiras") {
		document.getElementById('username').value = "psaltiras";
		document.getElementById('password').value = "102";
		setTimeout(function() {
			document.getElementById("login-form-submit").click()
		}, 1350);
	} else if (autofill === "talamagas") {
		document.getElementById('username').value = "talamagas";
		document.getElementById('password').value = "04";
		setTimeout(function() {
			document.getElementById("login-form-submit").click()
		}, 1350);
	}
}
console.log(product);
if (product === "pending") {
	document.getElementById("msg").style.color = "green";
	document.getElementById("msg").innerHTML = "Welcome back!<br>Log in to your account to access hackerx dashboard:"
} else if (product === "lantwentyone") {
	document.getElementById("msg").style.color = "red";
	document.getElementById("msg").innerHTML = "Welcome back!<br>Log in to your account to access Language Twentyone:"
} else if (product === "lanapp") {
	document.getElementById("msg").style.color = "green";
	document.getElementById("msg").innerHTML = "Welcome, log in to access Language Twentyone App:"
} else if (twentyone === "newclient") {
	document.getElementById("msg").style.color = "#029E0F";
	document.getElementById("msg").innerHTML = "Welcome, you are one step away from accessing LanTwentyone"
}

const coreusers = "../users/21coreusers.json"
const users = "../users/users.json"
BtnLog.addEventListener("click", (e) => {
	e.preventDefault();
	document.getElementById("msg").style.color = "#22bd4e";
	document.getElementById("msg").innerHTML = "Connecting.."
	const username = formlog.username.value;
	const password = formlog.password.value;
	//START
	if(username === "" || password === "") {
		document.getElementById("msg").style.color = "red";
		document.getElementById("msg").innerHTML = "Error"
		setTimeout(function() {
			document.getElementById("msg").style.color = "green";
			document.getElementById("msg").innerHTML = "Welcome back!<br>Log in to your account to access hackerx dashboard:"
		}, 1700);
		return;
	}
	var MD5 = function(d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
	var pass = MD5(password);
	readTextFile(coreusers, function(json) {
		readTextFile(users, function(text) {
			readTextFile("read.json", function(get) {
				var pfp = JSON.parse(text)
				document.getElementById("msg").innerHTML = "Unable to connect to twentyonecore database."
				document.getElementById("msg").style.color = "red";
				var data = JSON.parse(json)
				if (username === data.id1.username) {
					if (pass === data.id1.password) {
						document.getElementById("msg").style.color = "green";
						document.getElementById("msg").innerHTML = "Welcome, " + data.id1.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else if (product === "switch") {
							window.location.href = "http://192.168.1.56/change.html?user=" + username
						} else {
							window.localStorage.setItem("User", username);
							window.location.href = "/"
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === "tala") {
					console.log("uptodate")
					document.getElementById("msg").style.color = "red";
					document.getElementById("msg").innerHTML = `Your Account Username Has Been Changed!<br><span style="black">Try</span> <span style="color:#0033ff">talamagas</span>`
				} else if (username === data.id2.username) {
					if (pass === data.id2.password) {
						document.getElementById("msg").style.color = "green"
						document.getElementById("msg").innerHTML = "Welcome, " + data.id2.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else {
							window.location.href = "/"
							window.localStorage.setItem("User", username);
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === data.id3.username) {
					if (pass === data.id3.password) {
						document.getElementById("msg").style.color = "green"
						document.getElementById("msg").innerHTML = "Welcome, " + data.id3.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else {
							window.location.href = "/"
							window.localStorage.setItem("User", username);
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === data.id4.username) {
					if (pass === data.id4.password) {
						document.getElementById("msg").style.color = "green"
						document.getElementById("msg").innerHTML = "Welcome, " + data.id4.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else {
							window.location.href = "/"
							window.localStorage.setItem("User", username);
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === data.id5.username) {
					if (pass === data.id5.password) {
						document.getElementById("msg").style.color = "green"
						document.getElementById("msg").innerHTML = "Welcome, " + data.id5.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else {
							window.location.href = "/"
							window.localStorage.setItem("User", username);
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === data.id6.username) {
					if (pass === data.id6.password) {
						document.getElementById("msg").style.color = "green"
						document.getElementById("msg").innerHTML = "Welcome, " + data.id6.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else {
							window.location.href = "/"
							window.localStorage.setItem("User", username);
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === data.id7.username) {
					if (pass === data.id7.password) {
						document.getElementById("msg").style.color = "green"
						document.getElementById("msg").innerHTML = "Welcome, " + data.id7.name + "!"
						if (product === "pending") {
							readTextFile("read.json", function(get) {
								var token = JSON.parse(get)
								const identity = token.tokenone
								window.location.href = "https://www.twentyonecore.com/newlogin/?user=" + username + "&token=" + identity + "&pfp=" + "https://www.twentyonecore.com/database/user.jpg"
							})
						} else if (product === "lantwentyone") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username
						} else if (product === "lanapp") {
							window.location.href = "https://language.twentyonecore.com/language/register.html?username=" + username
						} else if (twentyone === "newclient") {
							window.localStorage.setItem("loggedin", username);
							window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + username + "&ip=" + ip
						} else if (product === "xsite") {
							window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + username
						} else if (dev === "true") {
							window.location.href = "https://www.hackerx.xyz/main/developers/?loggedin=" + username
						} else {
							window.location.href = "/"
							window.localStorage.setItem("User", username);
						}
					} else {
						document.getElementById("msg").style.color = "red";
						document.getElementById("msg").innerHTML = "The password you entered is incorrect!"
					}
				} else if (username === "psaltiras" && password === "" || username === "dritsas" && password === "" || username === "talamagas" && password === "" || username === "21" && password === "") {
					$("#help").fadeOut(500);
					document.getElementById("msg").style.color = "green";
					document.getElementById("msg").innerHTML = "Starting Account Recovery For " + username + ".";
					setTimeout(function() {
						window.localStorage.setItem("Recovery", username);
						$("#body").fadeOut(3000);
					}, 1700);
					setTimeout(function() {
						window.location.href = "./recovery/"
						//CREATE PLS
					}, 4400);
				} else {
					document.getElementById("msg").style.color = "red";
					document.getElementById("msg").innerHTML = "Account Does Not Exist!"
				}
			})
		})
	})
})
var input = document.getElementById("login-form-submit");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
	// If the user presses the "Enter" key on the keyboard
	if (event.key === "Enter") {
		// Cancel the default action, if needed
		event.preventDefault();
		// Trigger the button element with a click
		document.getElementById("login-form-submit").click();
	}
});

window.addEventListener("load", function() {
	window.localStorage.setItem('developer', 'logged_out');
})
function recover() {
	localStorage.setItem("iamfrom", queryString)
	console.log("ok")
	setTimeout(function() {
		window.location.href = "./fix/"
	}, 1350);
}

var exists = localStorage.getItem("loggedin")
if (exists === null) {
	//ok
} else {
	window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + exists + "&ip=" + ip
}