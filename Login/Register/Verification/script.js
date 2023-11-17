console.log("Welcome To Evox")
function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var username = getUrlParameter('username');
var email = getUrlParameter('email');
if(username == null || email == null) {
  console.error("Cannot Proceed!")
} else {
  document.getElementById("email").value = email
  fetch('https://email-server.memeguy21.repl.co/', {
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
    console.log(data);
    if(data === "error, exists") {
      console.log("Email Has Been Sent Previously, Try Using Latest Code Sent")
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
      const url = `https://evox-app-data.memeguy21.repl.co/users/${username}-undefined-${code}.verify`;
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
    //document.getElementById("info").style.display = "block"
    //document.getElementById("info").style.color = "white"
    //document.getElementById("info").innerHTML = `Παρακαλω Περιμενετε..`
    const email = document.getElementById("email").value
    const code = document.getElementById("code").value
    const uri = `https://email-server.memeguy21.repl.co/email?email=${email}&code=${code}`;


    fetch(uri)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.text();
    })
    .then(data => {
      console.log(data); // Handle the response data here
      if(data === code) {
        console.log("Verified, Welcome To T50!")
        localStorage.setItem("user", username)
        localStorage.setItem("user_email", email)
        window.location.href = "../../../"
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
})

function reset() {
  console.error("Function Needs Fixing (T50Server-Side)")
  window.location.href = "/"
  const uri = `https://email-server.memeguy21.repl.co/email?email=${email}&code=delete`;


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
        fetch('https://team50-accounts-database-clear.memeguy21.repl.co/', {
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
  const url = `https://evox-app-data.memeguy21.repl.co/users/${username}-undefined-${code}.verify`;
  

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