console.log("Welcome To Evox")
localStorage.setItem("update_status", true)
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
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if(username === "") {
      document.getElementById("info_1").innerHTML = "Fill Out All Fields!"
      document.getElementById("info_1").style.display = "block"
      document.getElementById("info_1").style.color = "rgb(215, 215, 8)"//yellow
      setTimeout(function() {
          document.getElementById("info_1").style.display = "none"
      }, 4000)
      if(password === "") {
          document.getElementById("info_3").innerHTML = "Fill Out All Fields!"
          document.getElementById("info_3").style.display = "block"
          document.getElementById("info_3").style.color = "rgb(215, 215, 8)"//yellow
          setTimeout(function() {
              document.getElementById("info_3").style.display = "none"
          }, 4000)
          return;
      }
      if(email === "") {
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

    if(email === "") {
      document.getElementById("info_2").innerHTML = "Fill Out All Fields!"
      document.getElementById("info_2").style.display = "block"
      document.getElementById("info_2").style.color = "rgb(215, 215, 8)"//yellow
      setTimeout(function() {
          document.getElementById("info_2").style.display = "none"
      }, 4000)
      if(password === "") {
          document.getElementById("info_3").innerHTML = "Fill Out All Fields!"
          document.getElementById("info_3").style.display = "block"
          document.getElementById("info_3").style.color = "rgb(215, 215, 8)"//yellow
          setTimeout(function() {
              document.getElementById("info_3").style.display = "none"
          }, 4000)
          return;
      }
      if(username === "") {
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
  if(password === "") {
      document.getElementById("info_3").innerHTML = "Fill Out All Fields!"
      document.getElementById("info_3").style.display = "block"
      document.getElementById("info_3").style.color = "rgb(215, 215, 8)"//yellow
      setTimeout(function() {
          document.getElementById("info_3").style.display = "none"
      }, 4000)
      if(email === "") {
          document.getElementById("info_2").innerHTML = "Fill Out All Fields!"
          document.getElementById("info_2").style.display = "block"
          document.getElementById("info_2").style.color = "rgb(215, 215, 8)"//yellow
          setTimeout(function() {
              document.getElementById("info_2").style.display = "none"
          }, 4000)
          return;
      }
      if(username === "") {
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
    fetch('https://team50-accounts-database-clear.memeguy21.repl.co/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    if(data === "Welcome Abroad") {
        console.log("Accepted!")
        localStorage.setItem("account", `{"password": "${password}"}`)
        window.location.href = `./Verification/?email=${email}&username=${username}`
    }
    else if(data === "Account Exists. Retry") {
      document.getElementById("info_2").innerHTML = "Email Is Linked To Another Account!"
        document.getElementById("info_2").style.display = "block"
        document.getElementById("info_2").style.color = "rgb(196, 0, 0)"//yellow
        setTimeout(function () {
          document.getElementById("info_2").style.display = "none"
        }, 3500)
    }
  })
  .catch(error => {
    console.error(error);
  });
    
    
})

function login() {
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
      if(data === "Credentials Correct") {
          console.log("Welcome Abroad")
          localStorage.setItem("account", `{"password": "${password}"}`)
          localStorage.setItem("user", email)
          window.location.href = "../"
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
}