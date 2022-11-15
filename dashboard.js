//get date and time on my account section <add>
document.getElementById("h1text").innerHTML = `Loading`
document.getElementById("text").innerHTML = `Loading`
document.getElementById("h1text").innerHTML = `This is<br><b>TwentyoneCore</b>`
document.getElementById("text").innerHTML = `We are upgrading twentyonecore for something new, giving you the best user experience!`
function changeusername() {
	let changeusername = prompt("Please enter your new username:");
	if (changeusername == null || changeusername == "") {
		alert("Please Fill Out The Field")
	} else {
		const request = new XMLHttpRequest();
		request.open("POST", "https://discord.com/api/webhooks/1002689097325891584/aXnAmdP6b19ln32DIPdDtFUryoJH2W9GgXhJrfCDU91owGFwGuV1VQezwcSEHrfmmO52");

		request.setRequestHeader('Content-type', 'application/json');

		const params = {
			username: "New Change Request",
			avatar_url: "",
			content: "```New Username Request For User: " + exists + "\nNew Username: " + changeusername + "```"
		}

		request.send(JSON.stringify(params));
		alert("Success! Changes Have Been Sent To Database! Soon Your Username Will Be: " + changeusername)
		document.getElementById("newusername").innerHTML = changeusername;
	}
}

function changeemail() {
	let newe = prompt("Please enter your new email:");
	if (newe == null || newe == "") {
		alert("Please Fill Out The Field")
	} else {
		const request = new XMLHttpRequest();
		request.open("POST", "https://discord.com/api/webhooks/1002689097325891584/aXnAmdP6b19ln32DIPdDtFUryoJH2W9GgXhJrfCDU91owGFwGuV1VQezwcSEHrfmmO52");

		request.setRequestHeader('Content-type', 'application/json');

		const params = {
			username: "New Change Request",
			avatar_url: "",
			content: "```New Email Request For User: " + exists + "\nNew Email: " + newe + "```"
		}

		request.send(JSON.stringify(params));
		alert("Success! Changes Have Been Sent To Database! Soon Your Email Will Be: " + newe)
		document.getElementById("changeemail").innerHTML = newe;
	}
}

if (localStorage.getItem("directmy") === "true") {
	setTimeout(function() {
		var hangoutButton = document.getElementById("learn")
		hangoutButton.click();
	}, 200);
} else if (localStorage.getItem("directmy") === "false") {
	console.warn("Auto 'My Account' Click Disabled")
}

console.log("%cStop!", "color: red; font-size: x-large");
console.log("This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a twentyonecore feature or hack someone's account, it is a scam and will give them access to your twentyonecore account");

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

console.log(window.location.href)
if (window.location.href === "https://twentyonecoreupdate.memeguy21.repl.co/") {
	document.getElementById("h1text").innerHTML = "Invalid Server!"
	document.getElementById("h1text").style.color = "red"
	document.getElementById("text").innerHTML = "Switching To A Valid Server.."
	document.getElementById("learn").style.display = "none";
	document.getElementById("login").style.display = "none";
	function Redirect() {
		window.location.href = "https://twentyonecore.com/index.html"
	}
	setTimeout(Redirect, 800);
} else if (window.location.href === "https://twentyonecore.com") {
	window.location.href = "https://www.twentyonecore.com"
}

var exists = localStorage.getItem("User")
window.addEventListener('load', function() {
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
		document.getElementById("sectionabout").style.display = "none"
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
		readTextFile("https://www.twentyonecore.com/users/21coreusers.json", function(text) {
			var json = JSON.parse(text)
			if (exists === "21") {
				document.getElementById("accsettings").innerHTML = `Username: <b id="newusername">${exists}</b>&nbsp;&nbsp;<a href="#NU" onclick="changeusername()" style="color: black" class="button button--basic button--small button--rounded">Change</a><br><br>Email: <b id="changeemail">${json.id1.email}</b>&nbsp;&nbsp;<a href="#CE" onclick="changeemail()" style="color: black" class="button button--basic button--small button--rounded">Add</a><br><br>Name: <b>${json.id1.name}</b><br>Profile Picture: <img class="pfp" src="${json.id1.pfp}"></img>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Title: <b><span style="color: blueviolet">${json.id1.title}<br></span></b><span style="color: red">Banned:</span><span style="color: green"> <b>${json.id1.banned}</b></span>`
				document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>full</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://replit.com/@MemeGuy21/HackerX-Bot-201">HackerX Bot Repl</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://replit.com/@MemeGuy21/twentyonecoreupdate">Twentyone Core Server Repl</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://replit.com/@MemeGuy21/HackerXSiteDirect">HackerX Site Server Repl</a><!-- <br><label class="switch"><input type="checkbox" checked><span class="slider round"></span></label> -->`
			} else if (exists === "dritsas") {
				document.getElementById("accsettings").innerHTML = `Username: <b>${exists}</b>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Email: <b>${json.id4.email}</b>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Add</a><br>Name: <b>${json.id4.name}</b><br>Profile Picture: <img class="pfp" src="${json.id4.pfp}"></img>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Title: <b><span style="color: blueviolet">${json.id4.title}<br></span></b><span style="color: red">Banned:</span><span style="color: green"> <b>${json.id4.banned}</b></span>`
				document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>limited</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="./login/dev/">Downloads</a>`
			} else if (exists === "psaltiras") {
				document.getElementById("accsettings").innerHTML = `Username: <b>${exists}</b>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Email: <b>${json.id7.email}</b>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Add</a><br>Name: <b>${json.id7.name}</b><br>Profile Picture: <img class="pfp" src="${json.id7.pfp}"></img>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Title: <b><span style="color: blueviolet">${json.id7.title}<br></span></b><span style="color: red">Banned:</span><span style="color: green"> <b>${json.id7.banned}</b></span>`
				document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>limited</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="./login/dev/">Downloads</a>`
			} else if (exists === "tala") {
				document.getElementById("accsettings").innerHTML = `Username: <b>${exists}</b>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Email: <b>${json.id3.email}</b>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Add</a><br>Name: <b>${json.id3.name}</b><br>Profile Picture: <img class="pfp" src="${json.id3.pfp}"></img>&nbsp;&nbsp;<a href="#" onclick="" style="color: black" class="button button--basic button--small button--rounded">Change</a><br>Title: <b><span style="color: blueviolet">${json.id3.title}<br></span></b><span style="color: red">Banned:</span><span style="color: green"> <b>${json.id3.banned}</b></span>`
				document.getElementById("fytext").innerHTML = `Great to see you, <b>${exists}</b><br>Your account has <b>limited</b> access to twentyonecore projects:<br><span class="material-symbols-outlined">chevron_right</span><a href="https://lan.hackerx.xyz">Lan21</a><br><span class="material-symbols-outlined">chevron_right</span><a href="https://hackerx.xyz/21/">21 Project</a><br><span class="material-symbols-outlined">chevron_right</span><a href="./login/dev/">Downloads</a>`
			} else if (exists === "333") {
				//
			}
		})
	}
})