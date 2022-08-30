const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const BtnLog = document.getElementById("login-form-submit");
const BtnLogger = document.getElementById("signup-form-submit");
const formlog = document.getElementById("login-form");
const formlogger = document.getElementById("signup-form");
const serverredirect = "/language/?username="
sessionStorage.setItem("rememberme", "false");

const username = localStorage.getItem('username');
function loggedin() {
if(username === null) {
	window.location.href = "/"
}
}
setInterval(loggedin(), 100);
document.getElementById("msg").innerHTML = `<h4>Hello, ${username} <br><br>Looks Like You're Already Logged In.<br>Do You Want To Continue With This Account?</h4>`
document.getElementById("login-form-submit").innerHTML = `Continue with ${username}`
function logout() {
	localStorage.clear();
	sessionStorage.clear();
	window.location.href = "/"
}

function myFunction() {
  var checkBox = document.getElementById("checkbox");
  if (checkBox.checked == true){
    sessionStorage.setItem("rememberme", "true");
  } else {
    sessionStorage.setItem("rememberme", "false");
  }
}

function yes() {
	if(sessionStorage.getItem("rememberme") === "true") {
		localStorage.setItem("rememberme", username)
		window.location.href = "/language/?username=" + username
	} else if(sessionStorage.getItem("rememberme") === "false") {
		localStorage.removeItem("rememberme")
		window.location.href = "/language/?username=" + username
	}
}