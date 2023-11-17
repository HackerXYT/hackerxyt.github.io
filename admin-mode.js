//admin-mode
var checkbox = document.getElementById('admin-mode');

if(localStorage.getItem("admin") === "true") {
    checkbox.checked = true
    document.getElementById("admin-mode-letter").innerHTML = "Τ50"
    document.getElementById("admin-mode-button").innerHTML = "#Διαχειριστής"
    localStorage.setItem("admin", true)
    getAdmin()
}

// Add an event listener to the checkbox
checkbox.addEventListener('change', function() {
  // Check if the checkbox is checked
  if (checkbox.checked) {
    // Run your function here
    myFunction();
  }
});
// Your function to run when the checkbox is checked
function myFunction() {
    if(localStorage.getItem("admin") === "true") {
        localStorage.setItem("admin", "false")
        alert("Admin Panel Has Been Disabled")
    } else {
        alert('Enabling Admin Panel..');
        document.getElementById("admin-mode-letter").innerHTML = "Τ50"
        document.getElementById("admin-mode-button").innerHTML = "#Διαχειριστής"
        localStorage.setItem("admin", true)
        getAdmin()
    }
  

  // Add your custom code here
}
function getAdmin() {
    const url = `https://team50-accounts-database-clear.memeguy21.repl.co/?admin=t50_accountnames&password=yes`;

    fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.text();
  })
  .then(data => {
    console.log(data); // Handle the response data here
    var accountsArray = JSON.parse(data);

    // Get the admin_panel element
    var adminPanel = document.getElementById('admin_panel');

    // Iterate through the array and create HTML structure
    accountsArray.forEach(function(account) {
        // Split the account string
        var parts = account.split(':');
        var email = parts[1];
    
        // Create HTML elements
        var paragraph = document.createElement('p');
    
        // Create a text node for the email
        var emailTextNode = document.createTextNode('Email: ' + email);
    
        var button = document.createElement('button');
        var buttonText = document.createTextNode('Delete');
    
        // Add a class to the button
        button.classList.add('btn');
        button.classList.add('btn-light');
        button.classList.add('btn-sm');
    
        // Add an onclick attribute to the button
        button.onclick = function() {
            delete_account(email);
        };
    
        // Append text nodes to elements
        button.appendChild(buttonText);
    
        // Create a span element with an ID for the username
        var usernameSpan = document.createElement('span');
        usernameSpan.id = 'username-' + email;
        var usernameTextNode = document.createTextNode('Username: <username>');
        usernameSpan.appendChild(usernameTextNode);
    
        // Create a span element with an ID for the password
        var passwordSpan = document.createElement('span');
        passwordSpan.id = 'password-' + email;
        var passwordTextNode = document.createTextNode('Password: <password>');
        passwordSpan.appendChild(passwordTextNode);
    
        // Append text nodes to the paragraph element
        paragraph.appendChild(emailTextNode);
        paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(usernameSpan);
        paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(passwordSpan);
        paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(button);
    
        // Append the paragraph element to the admin_panel
        adminPanel.appendChild(paragraph);
    });
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });


}

function admin() {
    document.getElementById("new_message_badge_2").style.display = "none"
    sessionStorage.setItem("chat", "admin")
    document.getElementById("unread_chat").style.display = "none"
    $("#download_files").fadeOut("fast");
    //document.getElementById("download_files").style.display = "none"
    localStorage.setItem("chat_2_read", "true");
    document.getElementById("pfp_video").src = ""
    //$("#send_messages_section").fadeOut("fast");
    //document.getElementById("send_messages_section").style.display = "none"
    document.getElementById("errors_setactive").classList.remove("active");
    document.getElementById("general_setactive").classList.remove("active");
    document.getElementById("error_logs").style.display = "none"
    document.getElementById("general_logs").style.display = "none"
    document.getElementById("changechat1").classList.remove("unread");
    document.getElementById("changechat1").classList.add("active");
    document.getElementById("changechat2").classList.remove("active");
    document.getElementById("user-name").innerHTML = "Admin Panel"
    document.getElementById("user-image").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
    document.getElementById("mainchat").style.display = "none"
    $("#secondchat").fadeIn("fast");
    //document.getElementById("secondchat").style.display = "block"
    document.getElementById("user-info-image").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
    document.getElementById("user-info-name").innerHTML = "Γρηγορης"
    document.getElementById("user-info-text").innerHTML = "Βιογραφικο Χρηστη"
    document.getElementById("profilename1").innerHTML = "Γρηγορης"
    document.getElementById("user-info-email").innerHTML = `gregpap03@gmail.com`
    document.getElementById("user-info-location").innerHTML = `Αθηνα, Ελλαδα`
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε Διαχειριστης</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)


    $("#admin-panel-setting1").fadeOut("fast")
    $("#greenbutton-admin").fadeOut("fast")
    $("#threedot_admin_setting").fadeOut("fast")
    $("#admin_sendmessage").fadeOut("fast")
    $("#admin_panel").fadeIn("fast")
    
}

setInterval(function() {
    if(sessionStorage.getItem("chat") !== "admin") {
        $("#admin-panel-setting1").fadeIn("fast")
    $("#greenbutton-admin").fadeIn("fast")
    $("#threedot_admin_setting").fadeIn("fast")
    $("#admin_sendmessage").fadeIn("fast")
    document.getElementById("admin_panel").style.display = "none"
    }
}, 10)

function delete_account(what) {
    console.log(what)
    fetch('https://team50-accounts-database-clear.memeguy21.repl.co/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: "no",
      email: what,
      password: "no",
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