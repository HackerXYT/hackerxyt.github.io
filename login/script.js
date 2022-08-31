const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const BtnLog = document.getElementById("login-form-submit");
const BtnLogger = document.getElementById("signup-form-submit");
const formlog = document.getElementById("login-form");
const formlogger = document.getElementById("signup-form");
const serverredirect = "/language/register.html?identity="
document.getElementById("container").style.visibility = "visible";
document.getElementById("message").style.visibility = "visible";

if (typeof window._isTor != 'undefined' && window._isTor == true) {
		var usingtor = true;
		console.log("using tor")
		var btn = document.createElement("footer");
		btn.innerHTML = `<h3>You are connected to LAN21 using the Tor Network. Do You Want To Visit <a href="http://g4soozcopyp2mygp36474qegyagrj7gsasnveiqz6aloepf27wz2gtad.onion/">T50 Dashboard</a>?<a onclick="var el =document.querySelector('footer');el.parentNode.removeChild(el);"><span class="material-symbols-outlined">close</span></a></h3>`;
		document.body.appendChild(btn);
		document.getElementById("header").style.color = "red";
		document.getElementById("header").innerHTML = `Darknet Version`
		document.getElementById("tochange").innerHTML = `To exit darknet version of lan21 you'll need to leave the tor network.`
	    } else {
		var usingtor = false;
		console.log("not using tor")
		document.getElementById("header").style.color = "green";
		document.getElementById("header").innerHTML = `Clearnet Version`
		document.getElementById("tochange").innerHTML = `To change LAN21 version you'll need to connect to the <a href="https://www.torproject.org/">tor network</a>!`
    }

if(localStorage.getItem("username") === null) {
	console.log("Welcome, Login")
} else {
	if(localStorage.getItem('rememberme') === null) {
		window.location.href = "./prompt/"
	} else {
		window.location.href = "/language/?username=" + localStorage.getItem('rememberme')
	}
}

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

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const user = urlParams.get('user')
const token = urlParams.get('token')
const pfp = urlParams.get('pfp')
const dev = urlParams.get('dev')
readTextFile("https://www.twentyonecore.com/login/read.json", function(get) {
	var result = JSON.parse(get)
	const check = result.tokenone
	if (token === check) {
		window.localStorage.setItem("User", user);
		window.location.href = "https://www.hackerx.xyz/21coreprocess.html?usr=" + user + "&pfp=" + pfp
	} else {
		console.log("Auto login: false")
		document.getElementById("container").style.visibility = "visible";
		document.getElementById("message").style.visibility = "hidden";

	}

})

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
	document.getElementById("or").style.color = "black"
		document.getElementById("ors").style.color = "black";
		document.getElementById("or").innerHTML = `or use your T50 account`
		document.getElementById("ors").innerHTML = `or use your T50 account`
	//console.log("Clicked sign up")
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
	document.getElementById("or").style.color = "black"
		document.getElementById("ors").style.color = "black";
		document.getElementById("or").innerHTML = `or use your T50 account`
		document.getElementById("ors").innerHTML = `or use your T50 account`
	//console.log("Clicked sign in")
});

BtnLog.addEventListener("click", (e) => {
	e.preventDefault();
	const email = formlog.email.value;
	const password = formlog.password.value;
	var MD5 = function(d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
	var value = password;
	var result = MD5(value);
	readTextFile("./users.json", function(text) {
		document.getElementById("msg").innerHTML = "Could Not Connect To Server!"
		document.getElementById("msg").style.color = "red";
		var user = JSON.parse(text)
		if (email === user.u1.email) {
			if (result === user.u1.password) {
				document.getElementById("msg").style.color = "green";
				document.getElementById("msg").innerHTML = "Welcome Back, " + user.u1.name + "!"
				document.getElementById("container").style.visibility = "hidden";
				document.getElementById("message").style.visibility = "visible";
				window.location.href = serverredirect + user.u1.name + "&pfp=" + user.u1.pfp
				//ADD
			} else {
				document.getElementById("msg").style.color = "red";
				document.getElementById("msg").innerHTML = "The password you entered is incorrect"
			}
		} else if (email === user.u2.email) {
			if (result === user.u2.password) {
				document.getElementById("msg").style.color = "green";
				document.getElementById("msg").innerHTML = "Welcome Back, " + user.u2.name + "!"
				document.getElementById("container").style.visibility = "hidden";
				document.getElementById("message").style.visibility = "visible";
				window.location.href = serverredirect + user.u2.name + "&pfp=" + user.u2.pfp
				//ADD
			} else {
				document.getElementById("msg").style.color = "red";
				document.getElementById("msg").innerHTML = "The password you entered is incorrect"
			}
		} else if (email === user.u3.email) {
			if (result === user.u3.password) {
				document.getElementById("msg").style.color = "green";
				document.getElementById("msg").innerHTML = "Welcome Back, " + user.u3.name + "!"
				document.getElementById("container").style.visibility = "hidden";
				document.getElementById("message").style.visibility = "visible";
				window.location.href = serverredirect + user.u3.name + "&pfp=" + user.u4.pfp
				//ADD
			} else {
				document.getElementById("msg").style.color = "red";
				document.getElementById("msg").innerHTML = "The password you entered is incorrect"
			}
		} else if (email === user.u4.email) {
			if (result === user.u4.password) {
				document.getElementById("msg").style.color = "green";
				document.getElementById("msg").innerHTML = "Welcome Back, " + user.u4.name + "!"
				document.getElementById("container").style.visibility = "hidden";
				document.getElementById("message").style.visibility = "visible";
				window.location.href = serverredirect + user.u4.name + "&pfp=" + user.u4.pfp
				//ADD
			} else {
				document.getElementById("msg").style.color = "red";
				document.getElementById("msg").innerHTML = "The password you entered is incorrect"
			}
		} else {
			document.getElementById("msg").innerHTML = "This email is not linked to an account in our system."
			document.getElementById("msg").style.color = "red";
			setTimeout(function () {
				container.classList.add("right-panel-active");
			}, 1450);
		}
	})
})


BtnLogger.addEventListener("click", (e) => {
	e.preventDefault();
	const email = formlogger.email.value;
	const password = formlogger.password.value;
	const name = formlogger.name.value;
  		var validRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if (email.match(validRegex)) {
    		//ok
  		} else {
    	document.getElementById("or").style.display = "block";
		document.getElementById("or").style.color = "red";
		document.getElementById("or").innerHTML = "Invalid email adress."
    	return false;
  		}
	readTextFile("./users.json", function(text) {
		var user = JSON.parse(text)
		if(email === user.u1.email) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = "The email address you provided is already associated with an existing account."
			
		} else if(email === user.u2.email) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = "The email address you provided is already associated with an existing account."
			
		} else if(email === user.u3.email) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = "The email address you provided is already associated with an existing account."
			
		} else if(email === user.u4.email) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = "The email address you provided is already associated with an existing account."
			
		} else if(email === user.u5.email) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = "The email address you provided is already associated with an existing account."
			
		} else if(name === user.u1.name) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = `The name you entered is already associated with an account. ${name}, please sign in.`
			
		} else if(name === user.u2.name) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = `The name you entered is already associated with an account. ${name}, please sign in.`
			
		} else if(name === user.u3.name) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = `The name you entered is already associated with an account. ${name}, please sign in.`
			
		} else if(name === user.u4.name) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = `The name you entered is already associated with an account. ${name}, please sign in.`
			
		} else if(name === user.u5.name) {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").innerHTML = `The name you entered is already associated with an account. ${name}, please sign in.`
			
		} else if(password === "") {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").style.color = "red";
			document.getElementById("passwordc").style.background.color = "red";
			document.getElementById("or").innerHTML = `Fill In Your Password!`
			
		} else if(name === "") {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").style.color = "red";
			document.getElementById("namec").style.background.color = "red";
			document.getElementById("or").innerHTML = `Fill In Your Codename!`
			
		} else if(email === "") {
			document.getElementById("or").style.display = "block";
			document.getElementById("or").style.color = "red";
			document.getElementById("emailc").style.background.color = "red";
			document.getElementById("or").innerHTML = `Fill In Your Email!`
			
		} else {
			const request = new XMLHttpRequest();
	request.open("POST", "https://discord.com/api/webhooks/1013966803397005333/n5_m74jwkeVx7ei8yCPJk2g1WPS-EWamoZhEmucgSKbT2U3OdMeCoT5F0otE3h8KP8Dp");
	request.setRequestHeader('Content-type', 'application/json');
	var MD5 = function(d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }
	var result = MD5(password);
	const params = {
		username: "New Account Request!",
		avatar_url: "",
		content: "```Name: " + name + "\nEmail: " + email + "\nPasswordHash: " + result + "```"
	}
	request.send(JSON.stringify(params));
	var btn = document.createElement("footer");
	btn.innerHTML = `<h3>Please wait for your account to get verified. This process usually takes 48-72 hours.<a onclick="var el =document.querySelector('footer');el.parentNode.removeChild(el);"><span class="material-symbols-outlined">close</span></a></h3>`;
	document.body.appendChild(btn);
	document.getElementById("signup-form-submit").disabled = true;
		}
	 })
})
function login() {
	//
}

function signup() {
	//
}

function twentyonelogin() {
	document.getElementById("or").style.display = "block";
	if(usingtor === true) {
		document.getElementById("or").style.color = "green";
		document.getElementById("or").innerHTML = `Requesting Access..`
		document.getElementById("or").style.display = "block";
		document.getElementById("ors").style.color = "green";
		document.getElementById("ors").innerHTML = `Requesting Access..`
		document.getElementById("ors").style.display = "block";
		setTimeout(function () {
			window.location.href = "http://g4soozcopyp2mygp36474qegyagrj7gsasnveiqz6aloepf27wz2gtad.onion/"
			document.getElementById("or").style.color = "cyan";
			document.getElementById("or").innerHTML = `Access Granted! Redirecting..`
			document.getElementById("or").style.display = "block";
			document.getElementById("ors").style.color = "cyan";
			document.getElementById("ors").innerHTML = `Access Granted! Redirecting..`
			document.getElementById("ors").style.display = "block";
			}, 1450);
	} else if(usingtor === false) {
		document.getElementById("or").style.color = "red";
		document.getElementById("or").innerHTML = `You're not connected to the Tor Network!`
		document.getElementById("ors").style.display = "block";
		document.getElementById("ors").style.color = "red";
		document.getElementById("ors").innerHTML = `You're not connected to the Tor Network!`
		setTimeout(function () {
			document.getElementById("or").style.color = "black"
			document.getElementById("ors").style.color = "black";
			document.getElementById("or").innerHTML = `or use your T50 account`
			document.getElementById("ors").innerHTML = `or use your T50 account`
		}, 5000);
	}
}