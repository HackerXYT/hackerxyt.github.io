document.getElementById('search-users').addEventListener('input', function() {
    console.log('User is typing inside search-users');
    $("#contacts-list-stable").fadeOut("slow", function() {
        //Loading Indicator

        //Fetch
        if(sessionStorage.getItem("got_usernames") != "yes") {
            getusernames()
        } else {
            sessionStorage.setItem("got_usernames", "no")
            const intervalId = setInterval(function() {
                const usernames = sessionStorage.getItem("usernames");
                if (usernames) {
                  const usernamesValue = JSON.parse(usernames);
                  //console.log("Usernames found:", usernamesValue);
                  clearInterval(intervalId);
                  const newArray = usernamesValue.filter(value => !value.includes("IP"));
                  //console.log(newArray);
                  document.getElementById("contacts-list-searching").innerHTML = `<ul class="list-unstyled chat-list chat-user-list">`
                  newArray.forEach(appendContact);
                  //console.log(newArray[0]) //gregpap
                  //Show only the ones that match the search criteria
                }
            }, 1000);
            $("#contacts-list-searching").fadeIn("slow")
        }
        
    })
});

function getusernames() {
    fetch("https://team50-accounts-database-clear.memeguy21.repl.co/?admin=t50_accountnames&password=yes")
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          sessionStorage.setItem("usernames", JSON.stringify(data))
          sessionStorage.setItem("got_usernames", "yes")
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
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
            const username = data

    // Create HTML elements
    const li = document.createElement("li");
    li.className = "unread";

    const a = document.createElement("a");
    a.href = "#";

    const div1 = document.createElement("div");
    div1.className = "d-flex";

    const div2 = document.createElement("div");
    div2.className = "chat-user-img away align-self-center me-3 ms-0";

    const img = document.createElement("img");
    img.id = "chat_2_user_pfp";
    img.src = "./offline/Placeholder.png";
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
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    // Extract username from email (you can modify this logic based on your actual data)
    
}

/*TO DO: 1. Add user pfps by connecting to db (Prompt User to Add pfp on account register) 2. Show only the accounts that match the search criteria (not all registered accounts)  */