// logout() send_mail() bypass()
let check;
sessionStorage.removeItem("loggedin")
my_mail = localStorage.getItem("user_email")
username = localStorage.getItem("user")

if(my_mail === null) {
    //No mail in local
    document.getElementById("alert_btn").innerHTML = `Log Out <svg width="19" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 8L22 12M22 12L18 16M22 12H9M15 4.20404C13.7252 3.43827 12.2452 3 10.6667 3C5.8802 3 2 7.02944 2 12C2 16.9706 5.8802 21 10.6667 21C12.2452 21 13.7252 20.5617 15 19.796" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
    document.getElementById("logout_btn").style.display = "none"
}
if(username === null && my_mail === null) {
  sessionStorage.setItem("loggedin", "no")
    //not logged in
    document.getElementById("continue_btn").style.display = "none"
    document.getElementById("logout_btn").style.display = "none"
    console.log("Not Logged In")
    document.getElementById("alert_btn").innerHTML = `Log In Now <svg fill="#F8F8F8" width="19" height="20" viewBox="0 0 24 24" id="log-in-3" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><polyline id="primary" points="14 9 17 12 14 15" style="fill: none; stroke: #F8F8F8; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><line id="primary-2" data-name="primary" x1="17" y1="12" x2="3" y2="12" style="fill: none; stroke: #F8F8F8; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></line><path id="primary-3" data-name="primary" d="M17,20h3a1,1,0,0,0,1-1V5a1,1,0,0,0-1-1H17" style="fill: none; stroke: #F8F8F8; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`
}

function logout() {
    var keysToClear = ['lastlogin', 'emoji', 'update_status', 'user', 'srv', 'pfpdata', 'contact_favorite_url', 'contact_favorite_name', 'auto_connect_database', 'private_chats', 'user_email'];

// Loop through the keys and remove each item from localStorage
for (var i = 0; i < keysToClear.length; i++) {
  localStorage.removeItem(keysToClear[i]);
}

for (var key in localStorage) {
  if (key.includes('liked_song_no')) {
    if (localStorage.getItem(key) === 'Οχι Ετοιμο') {
      console.log('The value for %c' + key + '%c is Οχι Ετοιμο. Setting it to null.', 'color: green', 'color: white');
      localStorage.removeItem(key);
    }
  }
}

for (let key in localStorage) {
  if (key.includes("saved_msg_") || key.includes("saved_user_") || key.includes("saved_date_")) {
    localStorage.removeItem(key);
  }
}
setTimeout(function() {
// An array of localStorage keys to clear
window.location.href='./Login'

//localStorage.clear()
//LOOP AND CLEAR ONLY REQUIRED
}, 550)
}

function bypass() {
    sessionStorage.setItem("construction_mode", true)
    window.location.href = "../1index.html"
}

function send_mail() {
  if(sessionStorage.getItem("loggedin") === "no") {
    window.location.href = "../Login/"
  }
  if(sessionStorage.getItem("email_sent") === "true") {
    console.log("Email Has Been Sent Already!")
    return;
  }
    sessionStorage.setItem("email_sent", true)
    fetch('https://email-server.memeguy21.repl.co/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: my_mail,
      username: username,
      method: "verify_construction"
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