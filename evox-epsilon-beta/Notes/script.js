database = "https://notes-db.memeguy21.repl.co"

function blur() {
	document.getElementById('passwordOverlay').style.display = 'block';
	document.getElementById('mainContent').style.filter = 'blur(13px)'; // Add a blur effect to the mainContent
	document.getElementById("passwordInput").click()
}

window.onload = function() {
	// When the page loads, show the password overlay
	blur()
}

document.getElementById('passwordInput').addEventListener('keydown', function(event) {
	if (event.key === 'Enter' || event.keyCode === 13) {
		checkPassword();
	}
});

function checkPassword() {
	const passwordInput = document.getElementById('passwordInput');

	if (passwordInput.value != null && passwordInput.value != "" && passwordInput.value != " ") {
		// If the password is correct, hide the overlay and remove the blur effect
		document.getElementById('passwordOverlay').style.display = 'none';
		document.getElementById('mainContent').style.filter = 'none';
		sessionStorage.setItem("password", passwordInput.value)
		load(passwordInput.value)
	} else {
		alert("Invalid password!");
		passwordInput.value = ''; // Reset the input field
	}
}

function saved(data) {
	console.log(data);
	document.getElementById("indicator").style.color = "rgb(237, 237, 237)"
}


function save() {
	let password = sessionStorage.getItem("password")
	document.getElementById("indicator").style.color = "rgb(55, 172, 245)"
	fetch(database, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			text: document.getElementById("textarea").value,
			password: password
		})
	})
		.then(response => response.json())
		.then(data => saved(data))
		.catch(error => console.error('Error:', error));
}
function write(what) {
	if (what === "Auth Failed") {
		blur()
		document.getElementById("indicator").style.color = "rgb(237, 237, 237)"
		document.getElementById('passwordInput').value = "";
		return;
	}
	document.getElementById("textarea").value = "Decoding..\n" + what
	fetch(database, {
		method: 'POST',
		headers: {
			'Content-Type': 'text'
		},
		body: JSON.stringify({
			base64: what,
		})
	})
		.then(response => response.json())
		.then(data => document.getElementById("textarea").value = data)
		.catch(error => console.error('Error:', error));


	document.getElementById("indicator").style.color = "rgb(237, 237, 237)"
	document.getElementById('indicator').innerHTML = "Private Note: ΨΧ";
}

function load(password) {
	document.getElementById("indicator").style.color = "rgb(55, 172, 245)"
	fetch(`${database}?password=${password}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
		.then(response => response.json())
		.then(data => write(data))
		.catch(error => console.error('Error:', error));
}

document.body.addEventListener('touchmove', function(e) {
	if (e.target.tagName !== 'TEXTAREA') {
		e.preventDefault();
	}
}, { passive: false });

let pressTimer;

document.getElementById("longPressButton").addEventListener("touchstart", function(e) {
	e.preventDefault(); // Prevent default click behavior

	// Start the timer when button is pressed
	pressTimer = setTimeout(function() {
		// Your code here
		document.getElementById("passwd-title").innerHTML = "Loading From Session.."
		let passwd = sessionStorage.getItem("password")
		if (passwd != null) {
			document.getElementById("passwordInput").value = passwd
			checkPassword()
		} else {
			document.getElementById("passwd-title").innerHTML = "No Active Sessions Found!"
			document.getElementById("passwd-title").style.color = "#c42525"
			setTimeout(function() {
				document.getElementById("passwd-title").innerHTML = "Locked Note"
				document.getElementById("passwd-title").style.color = "#fff"
			}, 2500)
		}


	}, 800);  // 1000ms = 1s. Adjust this value to change the required press duration
});

document.getElementById("longPressButton").addEventListener("touchend", function(e) {
	e.preventDefault(); // Prevent default click behavior

	// Clear the timer when button is released
	clearTimeout(pressTimer);
});

// Note: For better user experience, you might also want to handle the touchmove event. 
// This way, if users move their finger away from the button, the action will be canceled.
document.getElementById("longPressButton").addEventListener("touchmove", function(e) {
	e.preventDefault(); // Prevent default scrolling behavior

	// Clear the timer if the finger moves
	clearTimeout(pressTimer);
});

function go_back() {
	if (confirm('Go Back Without Saving?')) {
		// Go back
		window.location.href = './dash/'
	} else {
		// Do nothing!
		console.log('Out');
	}

}

