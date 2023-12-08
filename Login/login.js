console.log("Welcome To Evox")
localStorage.setItem("update_status", true)
if(localStorage.getItem("account") && localStorage.getItem("user") && localStorage.getItem("user_email")) {
  console.log("Already Logged In")
  window.location.href = "../"
}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

localStorage.setItem("emoji", "😂")
const BtnLog = document.getElementById("submit");
BtnLog.addEventListener("click", (e) => {
    e.preventDefault();
    //document.getElementById("info").style.display = "block"
    //document.getElementById("info").style.color = "white"
    //document.getElementById("info").innerHTML = `Παρακαλω Περιμενετε..`
    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    if(email === "") {
        document.getElementById("info_1").innerHTML = "Fill Out All Fields!"
        document.getElementById("info_1").style.display = "block"
        document.getElementById("info_1").style.color = "rgb(215, 215, 8)"//yellow
        setTimeout(function() {
            document.getElementById("info_1").style.display = "none"
        }, 4000)
        if(password === "") {
            document.getElementById("info_2").innerHTML = "Fill Out All Fields!"
            document.getElementById("info_2").style.display = "block"
            document.getElementById("info_2").style.color = "rgb(215, 215, 8)"//yellow
            setTimeout(function() {
                document.getElementById("info_2").style.display = "none"
            }, 4000)
            return;
        }
        return;
    }
    if(password === "") {
        document.getElementById("info_2").innerHTML = "Fill Out All Fields!"
        document.getElementById("info_2").style.display = "block"
        document.getElementById("info_2").style.color = "rgb(215, 215, 8)"//yellow
        setTimeout(function() {
            document.getElementById("info_2").style.display = "none"
        }, 4000)
        if(email === "") {
            document.getElementById("info_1").innerHTML = "Fill Out All Fields!"
            document.getElementById("info_1").style.display = "block"
            document.getElementById("info_1").style.color = "rgb(215, 215, 8)"//yellow
            setTimeout(function() {
                document.getElementById("info_1").style.display = "none"
            }, 4000)
            return;
        }
        return;
    }
    const url = `https://team50-accounts-database-clear.memeguy21.repl.co/?email=${email}&password=${password}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        console.log(data); // Handle the response data here
        if(data.includes("Credentials Correct")) {
            console.log("Welcome Abroad")
            const credentialsString = data;
            // Use a regular expression to match the "Username:" followed by the value
            const match = credentialsString.match(/Username:(\w+)/);
            // Extract the captured value (in this case, the username)
            const username = match && match[1];
            localStorage.setItem("account", `{"password": "${password}"}`)
            var base64email = btoa(email);
            var base64username = btoa(username);
            window.location.href = `./Register/Verification/select.html?email=${base64email}&username=${base64username}`
        } else if(data === "Credentials Incorrect") {
            document.getElementById("info_2").innerHTML = "Credentials Incorrect"
            document.getElementById("info_2").style.display = "block"
            document.getElementById("info_2").style.color = "rgb(196, 0, 0)"//rgb(215, 215, 8) yellow
            console.log("Email Or Password Is Wrong")
            setTimeout(function() {
                document.getElementById("info_2").style.display = "none"
            }, 4000)
        } else if(data === "Connection Blocked") {
            document.getElementById("info_1").innerHTML = "Account Doesn't Exist"
            document.getElementById("info_1").style.display = "block"
            document.getElementById("info_1").style.color = "rgb(196, 0, 0)"//rgb(215, 215, 8) yellow
            console.log("Account Doesn't Exist")
            setTimeout(function() {
                document.getElementById("info_1").style.display = "none"
            }, 4000)
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
})

function register() {
    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    fetch('https://team50-accounts-database-clear.memeguy21.repl.co/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    if(data === "Welcome Abroad") {
        console.log("Accepted!")
    }
  })
  .catch(error => {
    console.error(error);
  });
}