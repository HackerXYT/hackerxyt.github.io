console.log("Welcome To Evox")
function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var username = atob(getUrlParameter('username'))
console.log(username)
var email = atob(getUrlParameter('email'))
console.log(email)
let method = getUrlParameter("camefrom")
if(method === "register") {//!!!!!!
  console.log("Must Prompt User To Set A Profile Picture After Register")
  //window.location.href = `./customize/?username=${username}&email=${email}`
} else {
  console.log("no method")
}
if(username == null || email == null || sessionStorage.getItem("email_sent") === "true") {
  console.error("Cannot Proceed!")
  if(sessionStorage.getItem("email_sent") === "true") {
    document.getElementById("email").value = email
    document.getElementById("code").disabled = false;
    sessionStorage.setItem("help", "Exists")
  }
} else {
  document.getElementById("email").value = email
  fetch('https://evox-emails.onrender.com', {//email server
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      username: username,
      method: "t50-code"
    })
  })
  .then(response => response.text())
  .then(data => {
    console.log("Server says:",data);
    if(data === "received POST request.") {
      console.log("Sent!")
      sessionStorage.setItem("email_sent", "true")
      document.getElementById("code").disabled = false;
      sessionStorage.setItem("help", "Sent")
    }
    if(data === "error, exists") {
      sessionStorage.setItem("email_sent", "true")
      console.log("Email Has Been Sent Previously, Try Using Latest Code Sent")
      document.getElementById("code").disabled = false;
      sessionStorage.setItem("help", "Exists")
    }
  })
  .catch(error => {
    console.error(error);
  });
}

function verifycode(username, email) {
  console.log("Function Verify")
  let code;
  if(document.getElementById("verification_code").value === "") {
      document.getElementById("verification_code").classList.add('shake');
      setTimeout( function() {
        document.getElementById("verification_code").classList.remove('shake');
      }, 250)
  } else {
      code = document.getElementById("verification_code").value
      const url = `https://5802c6b5-2c9e-4291-97a5-d5e86e3d99c3-00-26p6j11qdypct.global.replit.dev/users/${username}-undefined-${code}.verify`;
      fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed, Servers Offline Or Code Incorrect");
        }
      })
      .then(data => {
        const response = JSON.stringify(data);
        console.log(response);
        if (response === '"Account Activated"') {
          console.log("Account has been successfully activated, changing screens.");
        }
      })
      .catch(error => {
        console.log("XHR request failed:", error.message);
        if(error.message == `Unexpected token 'A', "Account Activated" is not valid JSON`) {

          console.log("Succesful Activation!")
          $( "#text" ).fadeOut( "slow", function() {
              $( "#container" ).fadeOut( "slow", function() {
                  window.location.href = "../Login/index.html"
              })
          })
        }
      });
      $( "#function_verify_button" ).fadeIn( "fast", function() {document.getElementById("svgstroke").style.stroke = "#FF0000";
  setTimeout( function() {
      document.getElementById("svgstroke").style.stroke = "#fff";
  }, 1500)})
      

}
}

const BtnLog = document.getElementById("submit");
BtnLog.addEventListener("click", (e) => {
    e.preventDefault();
    $("#loading_indicator").fadeIn("fast")
    $("#loading_indicator_error").fadeOut("fast")
    //document.getElementById("info").style.display = "block"
    //document.getElementById("info").style.color = "white"
    //document.getElementById("info").innerHTML = `Παρακαλω Περιμενετε..`
    const email = document.getElementById("email").value
    const code = document.getElementById("code").value
    console.log(email)
    console.log(code)
    console.log("Function Verify")
    const url = `https://evox-emails.onrender.com?email=${email}&code=${code}`;
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        console.error("Failed, Servers Offline Or Code Incorrect");
      }
    })
    .then(data => {
      const response = JSON.stringify(data);
      console.log(response);
      if (response === code) {
        console.log("Account has been successfully activated, changing screens.");
        $("#loading_indicator").fadeOut("fast")
        console.log("Verified, Welcome To T50!")
        localStorage.setItem("user", username)
        localStorage.setItem("user_email", email)
        localStorage.setItem("acc-verified", true)
        if(sessionStorage.getItem("login:redirect")) {
          window.location.href = `../../..${sessionStorage.getItem("login:redirect")}`
        } else {
          window.location.href = "../../../t50-gateway-alpha"
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


function help() {
  let me = sessionStorage.getItem("help")
  if(me === "Exists") {
    alert("Ensure you've received the initial email as a verification code has been sent. No additional emails will follow. Verify by checking your latest emails by T50 for the required code.")
  } else if(me === "Sent") {
    alert("Check your inbox for a recently sent email by T50.")
  }
}