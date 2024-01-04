console.log("Welcome To Evox")
function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var username_base = getUrlParameter('username')
var email_base = getUrlParameter('email')
var username = atob(username_base)
var email = atob(email_base)
console.log(username, email)
if(username == null || email == null) {
  console.error("Cannot Proceed!")
  window.stop()
}

const BtnLog = document.getElementById("submit");
BtnLog.addEventListener("click", (e) => {
    e.preventDefault();
    $("#loading_indicator").fadeIn("fast")
    $("#loading_indicator_error").fadeOut("fast")
    //document.getElementById("info").style.display = "block"
    //document.getElementById("info").style.color = "white"
    //document.getElementById("info").innerHTML = `Παρακαλω Περιμενετε..`
    const code = document.getElementById("code").value
    const uri = `https://dd8045ca-794c-4174-8a59-a72eb2c00e80-00-34wzzecd6f30q.kirk.replit.dev/t50?email=${email}&code=${code}`;


    fetch(uri)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Handle the response data here
      if(data === "Correct") {
        $("#loading_indicator").fadeOut("fast")
        console.log("Verified, Welcome To T50!")
        localStorage.setItem("user", username)
        localStorage.setItem("user_email", email)
        localStorage.setItem("acc-verified", true)
        if(sessionStorage.getItem("login:redirect")) {
          window.location.href = `../../../..${sessionStorage.getItem("login:redirect")}`
        } else {
          window.location.href = "../../../../"
        }
        
      } else {
        document.getElementById("submit").innerHTML = "Wrong Code, Try Again"
      $("#loading_indicator").fadeOut("fast")
      $("#loading_indicator_error").fadeIn("fast")
      setTimeout(function() {
        document.getElementById("submit").innerHTML = "Complete"
      }, 3500)
      }
    })
    .catch(error => {
      document.getElementById("submit").innerHTML = "Wrong Code, Try Again"
      $("#loading_indicator").fadeOut("fast")
      $("#loading_indicator_error").fadeIn("fast")
      setTimeout(function() {
        document.getElementById("submit").innerHTML = "Complete"
      }, 3500)
      console.error('Fetch error:', error);
      
    });
})

function reset() {
  console.error("Function Needs Fixing (T50Server-Side)")
  window.location.href = "/"
  const uri = `https://1ae8c6db-ea61-4bc7-b5fb-a2d0e77f2452-00-3aapnsyjaox5j.global.replit.dev/email?email=${email}&code=delete`;


    fetch(uri)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Handle the response data here
      if(data === "200") {
        console.log("Task 1 Completed, Email Server Deleted Account Successfully")
        //CONTINUE TO DELETE INFO FROM MAIN T50 CLEAN SERVER
        var password = JSON.parse(localStorage.getItem("account")).password
        console.log("LocalStorage Password:", password)
        fetch('https://81992af4-74a1-4846-b740-ff50d36d0b7d-00-57s3ry5y7ill.global.replit.dev/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password,
      func: "delete"
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    if(data === "Account Deleted From DB") {
      console.log("Task 2 Completed, T50 Server Deleted Account Successfully")
      window.location.href = "/"
    }
    
  })
  .catch(error => {
    console.error(error);
  });


      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

function login() {
  const url = `https://5802c6b5-2c9e-4291-97a5-d5e86e3d99c3-00-26p6j11qdypct.global.replit.dev/users/${username}-undefined-${code}.verify`;
  

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

function select(){
  window.location.href = `../select.html?username=${username_base}&email=${email_base}`
}