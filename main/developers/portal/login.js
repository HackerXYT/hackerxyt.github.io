const formlog = document.getElementById("login-form");
const BtnLog = document.getElementById("login-form-submit");
const ErrorMessage = document.getElementById("login-error-msg");

BtnLog.addEventListener("click", (e) => {
    e.preventDefault();
    const username = formlog.username.value;
    const password = formlog.password.value;

    if (username === "admin" && password === "twentyone") {
				//alert("You have successfully logged in.");
        window.location.href = './home/'; //one level up
    } else {
        ErrorMessage.style.opacity = 1;
    }
		if (username === "hackerx" && password === "21") {
        //alert("You have successfully logged in.");
        window.location.href = './home/'; //one level up
    } else {
        ErrorMessage.style.opacity = 1;
    }
    if (username === "Byrus" && password === "dscbot") {
        //alert("You have successfully logged in.");
        window.location.href = './discordbot/'; //one level up
    } else {
        ErrorMessage.style.opacity = 1;
    }
})