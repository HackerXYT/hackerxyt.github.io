database = "https://notes-db.memeguy21.repl.co"
	if (localStorage.getItem("password") != null) {
		document.getElementById("note-1-title").innerHTML = "Connecting.."
		document.getElementById("note-1-title").style.color = "#cc441b"
		document.getElementById("note-1-description").innerHTML = "<i>Note Is Loading..</i>"
		document.getElementById("note-2-title").innerHTML = "Connecting.."
		document.getElementById("note-2-title").style.color = "#cc441b"
		document.getElementById("note-2-description").innerHTML = "<i>Note Is Loading..</i>"
		console.log("Passwd Exists")
		load(localStorage.getItem("password"))
	} else {
		console.log("Auth Required")
	}
	function blur() {
		document.getElementById('passwordOverlay').style.display = 'block';
		document.getElementById('mainContent').style.filter = 'blur(5px)'; // Add a blur effect to the mainContent
		document.getElementById("passwordInput").click()
	}

	function login() {
		if (document.getElementById('passwordOverlay').style.display == 'block') {
			document.getElementById('passwordOverlay').style.display = 'none';
			document.getElementById('mainContent').style.filter = 'none';
		} else {
			blur()
		}

	}

	document.getElementById('passwordInput').addEventListener('keydown', function (event) {
		if (event.key === 'Enter' || event.keyCode === 13) {
			checkPassword();
		}
	});

	function checkPassword() {
		const passwordInput = document.getElementById('passwordInput');

		if (passwordInput.value != null && passwordInput.value != "" && passwordInput.value != " ") {
			// If the password is correct, hide the overlay and remove the blur effect


			load(passwordInput.value)
		} else {
			alert("Invalid password!");
			passwordInput.value = ''; // Reset the input field
		}
	}

	function load(password) {
		
		fetch(`${database}?password=${password}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(response => response.json())
			.then(data => check(data))
			.catch(error => console.error('Error:', error));
	}

	function check(what) {
		if (what === "Auth Failed") {
			//Failed
			document.getElementById('passwordInput').value = ""
			document.getElementById('auth-title').style.color = "red"
			setTimeout(function () {
				document.getElementById('auth-title').style.color = "black"
			}, 2000)
		} else {
			document.getElementById('group').style.display = "none"
			document.getElementById('auth-title').innerHTML = "Account"
			//document.getElementById('auth-title').style.display = "none"
			document.getElementById("auth-success").style.display = "block"
			document.getElementById("auth-success").innerHTML = "You Are Logged In As <b>Admin</b><br>V1.0.0<br><a style='color: red' onclick='localStorage.clear()'>Clear Saved Accounts</a><br><a style='color: green' onclick='sessionStorage.clear()'>Clear Sessions</a><br><a style='color: green' onclick='sessionStorage.clear()'>Clear Sessions</a>"
			document.getElementById('login-button').style.display = "none"
			document.getElementById('passwordOverlay').style.display = 'none';
			document.getElementById('mainContent').style.filter = 'none';
			if (document.getElementById('passwordInput').value != "") {
				sessionStorage.setItem("password", document.getElementById('passwordInput').value)
				localStorage.setItem("password", document.getElementById('passwordInput').value)
			}

			//document.getElementById('passwordInput').value = ""
			//document.getElementById("svg-account").style.fill = "#008000"
			document.getElementById("note-1-title").innerHTML = "ΨΧ"
			document.getElementById("note-1-title").style.color = "#fff"
			document.getElementById("note-1-description").innerHTML = "Further Authentication Is Needed For This Note."
			sessionStorage.setItem("note1", "../index1.html")
			document.getElementById("note-2-title").innerHTML = "Unnamed"
			document.getElementById("note-2-title").style.color = "#fff"
			document.getElementById("note-2-description").innerHTML = "<i>Empty Note</i>"
		}
	}

	function note1() {
		if (sessionStorage.getItem("note1") != null) {
			window.location.href = sessionStorage.getItem("note1")
		} else {
			//Nothing
		}

	}