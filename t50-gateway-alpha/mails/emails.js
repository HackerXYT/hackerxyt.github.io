document.addEventListener('DOMContentLoaded', function () {
    // Select the Compose button and the Compose popup
    var composeButton = document.querySelector('.compose-button');
    var composePopup = document.getElementById('compose-popup');
  
    // Add click event listener to the Compose button
    composeButton.addEventListener('click', function () {
      // Toggle the visibility of the Compose popup
      composePopup.classList.toggle('show');
    });
  });

//https://evox-datacenter.onrender.com/emails/?action=get&username=papostol&email=gregpap03@gmail.com&password=notyourtone
const global_username = localStorage.getItem("t50-username")
const pswd = localStorage.getItem("t50pswd")
const global_email = localStorage.getItem("t50-email")
let emails;
fetch(`https://evox-datacenter.onrender.com/emails/?action=get&username=${global_username}&email=${global_email}&password=${atob(pswd)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        if(data === "No emails in database") {
            console.log("No emails sent or received")
            document.getElementById("count").innerHTML = `(0)`
            return;
        }
        console.log(JSON.parse(data))
        const jsonData = JSON.parse(data)
        var keyCount = Object.keys(jsonData).length;
        document.getElementById("count").innerHTML = `(${keyCount})`
        emails = jsonData

        function createListItem(type, key, data) {
            const listItem = document.createElement("li");
            listItem.classList.add(type === "sent" ? "green-dot" : "unread");

            // Generate a unique email ID
            const emailId = type + "-" + key;

            // Add data-email-id attribute to the list item
            listItem.setAttribute("data-email-id", emailId);

            const col1 = document.createElement("div");
            col1.classList.add("col", "col-1");

            const dot = document.createElement("span");
            dot.classList.add("dot");

            const checkboxWrapper = document.createElement("div");
            checkboxWrapper.classList.add("checkbox-wrapper");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = `chk${key}`;

            const label = document.createElement("label");
            label.setAttribute("for", `chk${key}`);
            label.classList.add("toggle");

            const title = document.createElement("p");
            title.classList.add("title");
            title.textContent = type === "sent" ? JSON.parse(data).recipient : JSON.parse(data).sender;

            const starToggle = document.createElement("div");
            starToggle.classList.add("star-star-toggle", "glyphicon", "glyphicon-star-empty");

            col1.appendChild(dot);
            checkboxWrapper.appendChild(checkbox);
            checkboxWrapper.appendChild(label);
            col1.appendChild(checkboxWrapper);
            col1.appendChild(title);
            if (type === "received") {
                col1.appendChild(starToggle);
            }

            const col2 = document.createElement("div");
            col2.classList.add("col", "col-2");

            const subject = document.createElement("div");
            subject.classList.add("subject");
            subject.textContent = JSON.parse(data).subject;

            const date = document.createElement("div");
            date.classList.add("date");
            // You can set the date here based on your requirements.

            col2.appendChild(subject);
            col2.appendChild(date);

            listItem.appendChild(col1);
            listItem.appendChild(col2);

            return listItem;
        }

        const sentList = document.getElementById("sentList");
        const receivedList = document.getElementById("receivedList");

        for (const [key, data] of Object.entries(jsonData.sent)) {
            const listItem = createListItem("sent", key, data);
            sentList.appendChild(listItem);
        }

        for (const [key, data] of Object.entries(jsonData.received)) {
            const listItem = createListItem("received", key, data);
            receivedList.appendChild(listItem);
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });

function send() {
    var url = 'https://evox-datacenter.onrender.com/emails';

    // Check conditions for sending the request
    var username = global_username;
    var email = global_email;
    var password = atob(pswd);
    var to = document.getElementById("recipient").value;
    var subject = document.getElementById("subject").value;
    var body = document.getElementById("body").value;

    // Prepare the data to be sent in the request body
    var data = {
        do: "send",
        username: username,
        email: email,
        password: password,
        to: to,
        subject: subject,
        body: body
    };

    // Configure the request
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Successful response
            if(data === "Sent!") {
                console.log("Email sent successfully!")
                document.getElementById('compose-popup').classList.toggle('show');
                window.location.reload()
            }
            console.log(data);
        })
        .catch(error => {
            // Handle errors
            console.error('Error occurred:', error);
        });
}