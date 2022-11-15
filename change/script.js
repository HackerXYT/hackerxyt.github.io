var exists = localStorage.getItem("User")
  function text() {
	document.getElementById("text").innerHTML = `We are upgrading twentyonecore for something new, giving you the best user experience!`
	document.getElementById("login").innerHTML = `Logout <span id="loginicon" class="material-symbols-outlined">logout</span>`
	document.getElementById("login").href = "/logoff.html";
	document.getElementById("learn").innerHTML = `My account <span class="material-symbols-outlined">account_circle</span>`
	document.getElementById("foryou").style.display = "block"
}

function clear() {
	localStorage.clear()
	location.reload()
}
var d = new Date();
var time = d.getHours();
if (exists === null) {
	//ok
} else {
	if (document.getElementById("h1text") == null){
    console.log("is null")
		console.log(exists)
	} else {
		console.log("is " + document.getElementById("h1text"))
		console.log(exists)
	}

	var time = "18"
	if (time === "1" || time === "2" || time === "3" || time === "4" || time === "5" || time === "6") {
		document.getElementById("h1text").innerHTML = "Good night, <b>" + exists + "</b>"
		text()
	} else if (time < 12) {
		document.getElementById("h1text").innerHTML = "Good morning, <b>" + exists + "</b>"
		text()
	} else if (time > 12) {
		document.getElementById("h1text").innerHTML = "Good afternoon, <b>" + exists + "</b>"
		text()
	} else {
		console.error("Could Not Get Time")
		text()
	}
	if (exists === "21") {
		document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>full</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://replit.com/@MemeGuy21/HackerX-Bot-201">HackerX Bot Repl</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://replit.com/@MemeGuy21/twentyonecoreupdate">Twentyone Core Server Repl</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://replit.com/@MemeGuy21/HackerXSiteDirect">HackerX Site Server Repl</a>`
	} else if (exists === "dritsas") {
		document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>limited</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="./login/dev/">Downloads</a>`
	} else if (exists === "psaltiras") {
		document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>limited</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="./login/dev/">Downloads</a>`
	} else if (exists === "tala") {
		document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>limited</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="./login/dev/">Downloads</a>`
	} else if (exists === "333") {
		//
	}

}
