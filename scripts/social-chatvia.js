document.getElementById('search-users').addEventListener('input', function() {
  if(document.getElementById("search-users").value === "") {
    $("#contacts-list-searching").fadeOut("slow", function() {
      $("#contacts-list-stable").fadeIn("slow")
    });
    
    return;
  }
    console.log('User is typing inside search-users');
    $("#contacts-list-stable").fadeOut("slow", function() {
        //Loading Indicator
        document.getElementById("contacts-list-searching").innerHTML = `<div class="loading loading--circle" title="Loading">
        <svg fill="#a6b0cf" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="XML"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
          </path>
        </svg>
      </div>`
      var error_noti = setTimeout(function() {
        if(document.getElementById("contacts-list-searching").innerHTML == `<div class="loading loading--circle" title="Loading">
        <svg fill="#a6b0cf" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="XML" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
          </path>
        </svg>
      </div>`) {
        document.getElementById("contacts-list-searching").innerHTML = `<div class="loading loading--circle" title="Loading">
        <svg fill="#a6b0cf" version="1.1" id="loading-circle" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
        <path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
          <animateTransform attributeType="XML"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"/>
          </path>
        </svg>
      </div><br>Stuck At Infinite Loading Loop, Research.`
      $("#contacts-list-searching").fadeIn("slow");
      }
      }, 5500)

        //Fetch
        if(sessionStorage.getItem("got_usernames") != "yes") {
            getusernames()
        } else {
          sessionStorage.setItem("got_usernames", "no"); //should remove but when removed shows duplicates

          const intervalId = setInterval(function() {
            const usernames = sessionStorage.getItem("usernames");
          
            if (usernames) {
              const usernamesValue = JSON.parse(usernames);
              clearInterval(intervalId);
          
              const newArray = usernamesValue.filter(value => !value.includes("IP"));
              console.log(newArray);
          
              document.getElementById("contacts-list-searching").innerHTML = `<ul class="list-unstyled chat-list chat-user-list"></ul>`;
          
              const searchValue = document.getElementById("search-users").value.toLowerCase();
              if(searchValue == "") {
                $("#contacts-list-searching").fadeOut("slow", function() {
                  $("#contacts-list-stable").fadeIn("slow")
                });
                return;
              }
          
              const foundAccounts = newArray.filter(account => account.includes(searchValue));
              clearTimeout(error_noti)
              if (foundAccounts.length > 0) {
                foundAccounts.forEach(account => {
                  console.log(`Account: ${account}`);
                  appendContact(account);
                });
              } else {
                showNoResultsMessage(searchValue);
              }
          
              $("#contacts-list-searching").fadeIn("slow");
            }
          }, 1000);
          
        }
        
    })
});

function showNoResultsMessage(searchValue) {
  console.log(`No account found for ${searchValue}`);
  const noResultsMessage = document.createElement("p");
  noResultsMessage.innerHTML = `No account found for ${searchValue} <svg xmlns="http://www.w3.org/2000/svg" width="45px" height="45px" viewBox="0 0 24 24" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z" fill="#a6b0cf"/>
  </svg>`;
  document.getElementById("contacts-list-searching").appendChild(noResultsMessage);
}

function getusernames() {
  if(sessionStorage.getItem("donotrun") === "true") {
    return;
  } else {
    sessionStorage.setItem("donotrun", "true")
    fetch("https://team50-accounts-database-clear.memeguy21.repl.co/?admin=t50_accountnames&password=yes")
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          sessionStorage.setItem("donotrun", "false")
          sessionStorage.setItem("usernames", JSON.stringify(data))
          sessionStorage.setItem("got_usernames", "yes")
        })
        .catch(error => {
          sessionStorage.setItem("donotrun", "false")
          console.error('Fetch error:', error);
        });
  }
    
}


function appendContact(email) {
    
    fetch(`https://team50-accounts-database-clear.memeguy21.repl.co/?search=username&username=${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          console.log("Username fetch ok")
            const username = data
            fetch(`https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
  .then(response => response.text())
  .then(pfp_data => {
    console.log("pfp fetch ok")
    fetch(`https://t50-social-database.memeguy21.repl.co?username=${username}&method=status`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.text();
        })
        .then(status => {
          console.log("status fetch ok")
          console.log(`${username} is ${status}`)
          appenduser(username, email, pfp_data, status)
    
          
        }).catch(error => console.error(error));     
  
    // Create HTML elements
    
  }).catch(error => console.error(error));      
  })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    // Extract username from email (you can modify this logic based on your actual data)
    
}

function appenduser(username, email, pfp_data, status) {
  var searchText = document.getElementById('contacts-list-searching').innerHTML;

  if (searchText.includes(username) || searchText.includes(email)) {
      console.log(`Stopping the function because ${username}/${email} is found.`);
      return;
  }
  const li = document.createElement("li");
  li.className = "unread";

    const a = document.createElement("a");
    a.href = "#";

    const div1 = document.createElement("div");
    div1.className = "d-flex";

    const div2 = document.createElement("div");
    div2.className = "chat-user-img offline align-self-center me-3 ms-0"; //online-away-unknown for offline
    div2.id = `${username}_div`

    const img = document.createElement("img");
    img.id = `imagebase64temp`;
    img.src = `data:image/png;base64,${pfp_data}`;
    img.className = "rounded-circle avatar-xs";
    img.alt = "";

    div2.appendChild(img);

    const div3 = document.createElement("div");
    div3.className = "flex-grow-1 overflow-hidden";

    const h5 = document.createElement("h5");
    h5.id = "change_chatting_user_username";
    h5.className = "text-truncate font-size-15 mb-1";
    h5.textContent = username;

    const p = document.createElement("p");
    p.id = "updatelastmsg2";
    p.className = "chat-user-message text-truncate mb-0";
    var modifiedEmail = email.replace("Account:", "");
    p.textContent = modifiedEmail;

    div3.appendChild(h5);
    div3.appendChild(p);

    div1.appendChild(div2);
    div1.appendChild(div3);

    a.appendChild(div1);
    li.appendChild(a);

    // Append the new elements to the existing container
    document.getElementById("contacts-list-searching").appendChild(li);
    document.getElementById("contacts-list-searching").innerHTML = `<ul class="list-unstyled chat-list chat-user-list">`+document.getElementById("contacts-list-searching").innerHTML
    if(status === "online") {
      let oldhtml = document.getElementById(`${username}_div`).innerHTML
      document.getElementById(`${username}_div`).classList.remove("offline");
      document.getElementById(`${username}_div`).classList.add("online");
      document.getElementById(`${username}_div`).innerHTML = `${oldhtml}<span class="user-status"></span>`
    } else {
      let oldhtml = document.getElementById(`${username}_div`).innerHTML
      document.getElementById(`${username}_div`).innerHTML = `${oldhtml}<span class="user-status"></span>`
      console.log("user offline, no change")
    }
}
/*TO DO: 1. Add user pfps by connecting to db OK! (Prompt User to Add pfp on account register [not done]) 
2. Show only the accounts that match the search criteria (not all registered accounts) OK!  */