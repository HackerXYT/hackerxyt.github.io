console.log("Welcome To Evox")
function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

// Remove the transformation if it's not a mobile device
if (!isMobileDevice()) {
  var htmlElement = document.querySelector('html');
  htmlElement.style.transform = '1';
} else {
  var htmlElement = document.querySelector('html');
  htmlElement.style.transform = 'scale(1.8)';
  document.body.style.overflow = 'hidden';
  console.log("Mobile")
}
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
const BtnLog = document.getElementById("submit");


localStorage.setItem("emoji", "😂")
  BtnLog.addEventListener("click", (e) => {
  BtnLog.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 44 44" stroke="#fff">
        <g fill="none" fill-rule="evenodd" stroke-width="2">
            <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="0s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" begin="0s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
            <circle cx="22" cy="22" r="1">
                <animate attributeName="r" begin="-0.9s" dur="1.8s" values="1; 20" calcMode="spline" keyTimes="0; 1" keySplines="0.165, 0.84, 0.44, 1" repeatCount="indefinite"/>
                <animate attributeName="stroke-opacity" begin="-0.9s" dur="1.8s" values="1; 0" calcMode="spline" keyTimes="0; 1" keySplines="0.3, 0.61, 0.355, 1" repeatCount="indefinite"/>
            </circle>
        </g>
    </svg>`
    e.preventDefault();
            

    //document.getElementById("info").style.display = "block"
    //document.getElementById("info").style.color = "white"
    //document.getElementById("info").innerHTML = `Παρακαλω Περιμενετε..`
    const email = document.getElementById("username").value
    const password = document.getElementById("password").value
    if(email === "") {
      BtnLog.innerHTML = `Sign In`
        document.getElementById("info_1").innerHTML = "Fill Out All Fields!"
        document.getElementById("info_1").style.display = "block"
        document.getElementById("info_1").style.color = "rgb(215, 215, 8)"//yellow
        setTimeout(function() {
            document.getElementById("info_1").style.display = "none"
        }, 4000)
        if(password === "") {
          BtnLog.innerHTML = `Sign In`
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
      BtnLog.innerHTML = `Sign In`
        document.getElementById("info_2").innerHTML = "Fill Out All Fields!"
        document.getElementById("info_2").style.display = "block"
        document.getElementById("info_2").style.color = "rgb(215, 215, 8)"//yellow
        setTimeout(function() {
            document.getElementById("info_2").style.display = "none"
        }, 4000)
        if(email === "") {
          BtnLog.innerHTML = `Sign In`
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
    const url = `https://evox-datacenter.onrender.com/accounts?email=${email}&password=${password}`;

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
          document.getElementById("submit").innerHTML = `<svg width="30px" height="30px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="filled-circle" fill="#07b481" cx="66.5" cy="66.5" r="54.5"/><circle id="white-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="55.5"/><circle id="outline" stroke="#07b481" stroke-width="4" cx="66.5" cy="66.5" r="54.5"/><polyline id="check" stroke="#FFFFFF" stroke-width="5.5" points="41 70 56 85 92 49"/></g></svg>`
            console.log("Welcome Abroad")
            const credentialsString = data;
            // Use a regular expression to match the "Username:" followed by the value
            const match = credentialsString.match(/Username:(\w+)/);
            // Extract the captured value (in this case, the username)
            const username = match && match[1];
            localStorage.setItem("account", `{"password": "${password}"}`)
            var base64email = btoa(email);
            var base64username = btoa(username);
            setTimeout(function() {
              window.location.href = `./Register/Verification/select.html?email=${base64email}&username=${base64username}`
            }, 2100)
        } else if(data === "Credentials Incorrect") {
            $("#submit").fadeOut("fast", function() {
              BtnLog.innerHTML = `Sign In`
            $("#submit").fadeIn("fast")
            })
            document.getElementById("info_2").innerHTML = "Credentials Incorrect"
            document.getElementById("info_2").style.display = "block"
            document.getElementById("info_2").style.color = "rgb(196, 0, 0)"//rgb(215, 215, 8) yellow
            console.log("Email Or Password Is Wrong")
            setTimeout(function() {
                document.getElementById("info_2").style.display = "none"
            }, 4000)
        } else if(data === "Connection Blocked") {
            $("#submit").fadeOut("fast", function() {
              BtnLog.innerHTML = `Sign In`
            $("#submit").fadeIn("fast")
            })
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
    fetch('https://evox-datacenter.onrender.com/accounts', {
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