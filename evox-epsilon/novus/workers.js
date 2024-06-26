function getHashValue() {
    // Get the hash value without the #
    let hashValue = window.location.hash.substring(1);

    // Log the raw hash value
    console.log('Raw hash value:', hashValue);

    // Split the hash value by '->'
    let parts = hashValue.split('-%3E');

    // Log the parts of the hash
    console.log('Parts:', parts);

    return parts;
}

function createAndClickHiddenLink(url) {
    // Create a new <a> element
    var link = document.createElement('a');

    // Set the href attribute to the provided URL
    link.href = url;

    // Set target attribute to '_blank' to open in a new tab
    link.target = '_blank';

    // Hide the link using CSS (optional)
    link.style.display = 'none';

    // Append the link to the document body
    document.body.appendChild(link);

    // Simulate a click on the link
    link.click();

    // Remove the link from the DOM (optional)
    document.body.removeChild(link);
}

// Call the function
let hashParts = getHashValue();
let loadPrevSline = false;
// Use the parts as needed
let firstPart;
let secondPart;
if (hashParts.length > 1) {
    firstPart = hashParts[0];
    secondPart = hashParts[1];

    //console.log('First part:', firstPart); // Output: messages
    //console.log('Second part:', secondPart); // Output: fando
    if (firstPart === "messages" && secondPart) {
        loadPrevSline = true
        document.getElementById("messages-side").style.display = "flex"
        document.getElementById("drop-zone").style.display = "none"
        console.log("Will Load Previous Sline")
    }
}

async function fetchIconUrl(url) {
    const urlObject = new URL(url);

    const domain = urlObject.hostname;
    const final = `https://logo.clearbit.com/${domain}`
    return final;
}

function messagesPreload() {
    if (!localStorage.getItem("t50-username")) {
        console.warn("Logged Out! Secureline Preloading Stopped!")
        return;
    }
    fetch(`https://data.evoxs.xyz/social?username=${localStorage.getItem("t50-username")}&todo=friends`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            console.log(JSON.stringify(data));
            if (JSON.stringify(data) === '"[]"') {
                //$("#load-users-friends").fadeOut("fast", function () {
                //	let containerId = "list-friends";
                //	var listContainer = document.getElementById(containerId);
                //	listContainer.style.textAlign = "center";
                //	listContainer.style.marginTop = "50px";
                //	listContainer.innerHTML = "No Friends"
                //})
                return;
            } else {
                console.log(`${JSON.stringify(data)} != "[]" data isnt empty`);
            }
            let user_requests;
            try {
                user_requests = JSON.parse(data);
            } catch (error) {
                console.warn("Data is empty")
            }

            console.log(user_requests)
            user_requests.sort(); // Sort the usernames alphabetically
            console.log(user_requests)
            let containerId = "messages-side-cont";
            var listContainer = document.getElementById(containerId);
            listContainer.innerHTML = "<!--Empty-->";
            user_requests.forEach(username => {
                fetch(`https://data.evoxs.xyz/accounts?method=getemailbyusername&username=${username}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(profileemail => {
                        let addButton;
                        // Check if the username already exists in the list
                        if (listContainer.querySelector(`#user-${username}-email`) === null) {
                            var userContainer = document.createElement("div");
                            userContainer.className = "list-user-info";
                            userContainer.id = username;
                            userContainer.onclick = function () {
                                showchat(this);
                            };
                            var userCircle = document.createElement("div");
                            userCircle.className = "user-circle-sl";
                            userCircle.innerHTML = `<img src="loading.gif" id="${username}-pfp-secureline" alt="User ${username} Image">`;
                            var userDetails = document.createElement("div");
                            userDetails.className = "user-details";

                            var userName = document.createElement("div");
                            userName.className = "user-name";
                            userName.textContent = username;

                            var userEmail = document.createElement("div");
                            userEmail.className = "user-email";
                            userEmail.id = `user-${username}-email-secureline`;
                            userEmail.textContent = 'Loading..';
                            fetch(`${srv}/secureline?method=lastMSG&username=${localStorage.getItem("t50-username")}&recipient_username=${username}&password=${atob(localStorage.getItem("t50pswd"))}`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error(`HTTP error! Status: ${response.status}`);
                                    }
                                    return response.text();
                                })
                                .then(lastmsg => {
                                    userEmail.textContent = lastmsg;
                                }).catch(error => {
                                    console.error(error)
                                })


                            //addButton = document.createElement("a");
                            //addButton.href = "#";
                            //addButton.id = username;
                            //addButton.onclick = function () {
                            //	acceptfriend(this);
                            //};
                            //addButton.className = "apple-button-list";
                            //addButton.textContent = "Accept";


                            userDetails.appendChild(userName);
                            userDetails.appendChild(userEmail);

                            userContainer.appendChild(userCircle);
                            userContainer.appendChild(userDetails);
                            //userContainer.appendChild(addButton);

                            listContainer.appendChild(userContainer);
                            loadPFP(username, '-pfp-secureline')
                            //fetch(`https://data.evoxs.xyz/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                            //  .then(response => {
                            //    if (!response.ok) {
                            //      throw new Error(`HTTP error! Status: ${response.status}`);
                            //    }
                            //    return response.text();
                            //  })
                            //  .then(profileimage => {
                            //    if (profileimage.indexOf("base64") === -1) {
                            //      // If it doesn't contain "base64", add the prefix
                            //      profileimage = "data:image/jpeg;base64," + profileimage;
                            //      document.getElementById(`${username}-pfp-secureline`).src = profileimage
                            //    } else {
                            //      document.getElementById(`${username}-pfp-secureline`).src = profileimage
                            //    }
                            //
                            //
                            //  }).catch(error => {
                            //    console.error("Cannot set src for", username)
                            //    console.error(error)
                            //  })
                        }
                    });
            });
        });
    if (loadPrevSline) {
        showchat({ "id": `${secondPart}` }, "para-normal")
    }
}

async function downloadFileDirectly(url, filename) {
    try {
        // Fetch the file data
        const response = await fetch(url);
        const blob = await response.blob();

        // Create a URL for the file blob
        const blobUrl = URL.createObjectURL(blob);

        // Create a link element
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;

        // Append the link to the body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Clean up: remove the link and revoke the URL object
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

    } catch (error) {
        console.error('Error downloading file:', error);
        // Handle error as needed
    }
}

function loadPFPget(username) {
    return new Promise((resolve, reject) => {
        checkUsernameAndGetData(username, function (error, data) {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log("Retrieved data:", data);
                if (data !== "None") {
                    console.log("Loading from localDB");
                    // Resolve with data if available
                    resolve(data.data);
                } else {
                    console.log("Loading from server");
                    fetch(`${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.text();
                        })
                        .then(profileimage => {
                            if (profileimage.indexOf("base64") === -1) {
                                console.log("Fixing Base64");
                                profileimage = "data:image/jpeg;base64," + profileimage;
                            }
                            // Resolve with profile image
                            resolve(profileimage);
                            profilesLocal(username, profileimage);
                        })
                        .catch(error => {
                            console.error("Cannot set src for", username);
                            console.error(error);
                            reject(error);
                        });
                }
            }
        });
    });
}

function changeUrl(newPageName) {
    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = baseUrl + `#${newPageName}`;
    history.pushState(null, '', newUrl);
}

window.addEventListener('mousedown', function (event) {
    if (event.button === 3 || event.button === 4) { // Typically 3 and 4 are the back and forward buttons
        //this.alert("this")
        if (this.sessionStorage.getItem("current_sline")) {
            this.sessionStorage.removeItem("current_sline")
            this.sessionStorage.removeItem("lastChatInter")
            try {
                clearInterval(reloading)
                console.log("Interval Cleared!", "green")
            } catch (error) {
                console.log(`Error Clearing Reload Interval ${error}`, "red")
            }
            document.getElementById("chat-show").style.display = "none"
            document.getElementById("messages-side-cont").style.display = ""

        }
        event.preventDefault();
    }
});

function createChatAttachment(url, sender, isitMe) {



}


function showchat(element, systemNotice) {//json id=Username
    if (systemNotice !== "para-normal") {
        changeUrl(`messages->${element.id}`)
    }

    document.getElementById("chat-show").style.display = ""
    document.getElementById("messages-side-cont").style.display = "none"
    document.getElementById("recipientName").innerHTML = element.id
    //$("#navigator").fadeOut("fast")
    //document.getElementById("secureline_chat").classList.add("active")
    //$("#private_chat").fadeIn("fast")
    sessionStorage.setItem("current_sline", element.id)
    if (systemNotice !== "para-normal") {
        pfp = document.getElementById(`${element.id}-pfp-secureline`)
    } else {
        pfp = { "src": 'loading.gif' }
        loadPFPget(element.id).then((profile) => {
            pfp = { "src": profile }
        })
    }

    loadPFPget(localStorage.getItem("t50-username")).then((profile) => {
        document.getElementById("av1").src = profile;
    })

    document.getElementById("av2").src = pfp.src;
    if (pfp.src === "loading.gif") {
        let pfpInterval = setInterval(function () {
            if (pfp.src !== "loading.gif") {
                document.getElementById("av2").src = pfp.src;
                clearInterval(pfpInterval)
            }
        }, 200)
    }


    document.getElementById("voCreation").innerHTML = 'Loading..'
    const messagesContainer = document.getElementById('messages-container');
    messagesContainer.innerHTML = "";
    fetch(`https://data.evoxs.xyz/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}&password=${atob(localStorage.getItem("t50pswd"))}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data !== "Chat Doesn't Exist") {

                let creationDate = new Date(data);
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
                let monthName = monthNames[creationDate.getMonth()];
                let day = creationDate.getDate();
                let curr = new Date();
                let monthCurrent = monthNames[curr.getMonth()];
                console.log("Creation:", data)

                // Format the date into the desired format
                let formattedFullDateInfo = `${monthName} ${day} - ${monthCurrent}`;
                document.getElementById("voCreation").innerHTML = formattedFullDateInfo
                console.log("Getting Existing Chat")
                fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}&password=${atob(localStorage.getItem("t50pswd"))}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(messages => {
                        try {
                            const integrityCheck = JSON.parse(messages)
                        } catch (error) {
                            console.error("Possible Account Verification Error:", messages)
                            return;
                        }
                        console.log(messages)
                        const jsonData = JSON.parse(messages);

                        // Check if jsonData and jsonData.messages are defined before sorting
                        if (jsonData && jsonData.messages) {
                            const messagesContainer = document.getElementById('messages-container');
                            messagesContainer.innerHTML = "";
                            // Sort messages by timestamp
                            const sortedMessages = jsonData.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));


                            // Iterate over each message
                            sortedMessages.forEach(message => {
                                // Create a new message element
                                //const messageElement = document.createElement('div');
                                //messageElement.textContent = message.content;
                                let whosent;
                                // Apply appropriate class based on the sender
                                if (message.sender === localStorage.getItem("t50-username")) {
                                    whosent = "me"
                                    //messageElement.classList.add('message-me');
                                } else {
                                    whosent = "user"
                                    //messageElement.classList.add('message');
                                }


                                // Append the message element to the messages container


                                if (whosent === "user") {
                                    console.log('URL:', message.content.includes("http"))
                                    if (message.content.includes("http") || message.content.includes("https")) {
                                        //createChatAttachment(message.content, element.id, 'no')
                                        // Create main container
                                        const chatMessage = document.createElement('div');
                                        chatMessage.className = 'chat-message';

                                        // Create message pack
                                        const messagePack = document.createElement('div');
                                        messagePack.className = 'messagePack';

                                        // Create avatar
                                        const avatar = document.createElement('img');
                                        avatar.src = pfp.src;
                                        avatar.alt = 'Novus Hyperlink';
                                        avatar.className = 'chat-avatar';

                                        // Create message content
                                        const messageContent = document.createElement('div');
                                        messageContent.className = 'message-content';

                                        // Create attachment
                                        const attachment = document.createElement('div');
                                        attachment.className = 'attachment';

                                        // Create row
                                        const theRow = document.createElement('div');
                                        theRow.className = 'theRow';

                                        // Create pdf icon
                                        const pdfIcon = document.createElement('img');
                                        pdfIcon.src = 'attach.svg';
                                        const urlObject = new URL(message.content);

                                        const domain = urlObject.hostname;
                                        const final = `https://logo.clearbit.com/${domain}`
                                        pdfIcon.src = final


                                        // Create info wrap
                                        const infoWrap = document.createElement('div');
                                        infoWrap.className = 'infoWrap';

                                        // Create project name
                                        const projectName = document.createElement('p');
                                        projectName.textContent = domain;

                                        // Create file info
                                        const fileInfo = document.createElement('span');
                                        const filenameWithoutExtension = message.content.split('/').pop().replace(/\.[^.]+$/, '');
                                        if (message.content.includes('.pdf')) {
                                            pdfIcon.src = 'pdf.svg';
                                            projectName.textContent = filenameWithoutExtension;
                                            fileInfo.innerHTML = 'PDF &#x2022; unkMB';
                                        } else if (message.content.includes('.png')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'PNG &#x2022; unkMB';
                                        } else if (message.content.includes('.jpg')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'JPG &#x2022; unkMB';
                                        } else if (message.content.includes('.webp')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'WEBP &#x2022; unkMB';
                                        } else if (message.content.includes('.gif')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'GIF &#x2022; unkMB';
                                        } else if (message.content.includes('.mp4')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = 'video.svg';
                                            fileInfo.innerHTML = 'MP4 &#x2022; unkMB';
                                        } else {
                                            fileInfo.innerHTML = 'URL &#x2022; unkMB';
                                        }

                                        const downloadIcon = document.createElement('img');

                                        downloadIcon.onclick = function () {
                                            createAndClickHiddenLink(message.content)
                                        }
                                        downloadIcon.className = 'imgBox';
                                        downloadIcon.style.marginRight = 0
                                        downloadIcon.src = 'open.svg';

                                        const downloadFile = document.createElement('img');
                                        downloadFile.src = 'download.svg';
                                        downloadFile.className = 'imgBoxLast';
                                        downloadFile.onclick = function () {
                                            console.log("Downloading..")
                                            downloadFileDirectly(message.content, filenameWithoutExtension)
                                        }


                                        if (message.content.includes('.pdf') || message.content.includes('.png') || message.content.includes('.jpg') || message.content.includes('.jpg') || message.content.includes('.webp') || message.content.includes('.gif') || message.content.includes('.mp4')) {
                                            downloadFile.style.display = "none"//cors so hidding it
                                            //is a file
                                        } else {
                                            downloadFile.style.display = "none"
                                        }



                                        // Create download icon


                                        // Create delete icon


                                        // Append elements to infoWrap
                                        infoWrap.appendChild(projectName);
                                        infoWrap.appendChild(fileInfo);

                                        // Append elements to theRow
                                        theRow.appendChild(pdfIcon);
                                        theRow.appendChild(infoWrap);
                                        theRow.appendChild(downloadIcon);
                                        try {
                                            theRow.appendChild(downloadFile);
                                        } catch (error) {
                                            console.warn("Cannot spawn element downloadFile", error)
                                        }


                                        // Append theRow to attachment
                                        attachment.appendChild(theRow);

                                        // Append attachment to messageContent
                                        messageContent.appendChild(attachment);

                                        // Append elements to messagePack
                                        messagePack.appendChild(avatar);
                                        messagePack.appendChild(messageContent);

                                        // Create message time
                                        const messageTime = document.createElement('div');
                                        messageTime.className = 'message-time';



                                        const sentDate = new Date(message.timestamp);

                                        // Month abbreviations array
                                        const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

                                        // Function to pad numbers with leading zeros
                                        const pad = (num) => {
                                            return num.toString().padStart(2, '0');
                                        };

                                        // Format the date into "DD Jun . HH:MM AM/PM"
                                        const formattedDateTime = () => {
                                            const day = pad(sentDate.getDate());
                                            const monthAbbreviation = monthAbbreviations[sentDate.getMonth()];
                                            const time = formattedTime(); // Get formatted time using the existing function

                                            return `${day} ${monthAbbreviation} &#x2022; ${time}`;
                                        };

                                        // Function to format time into "HH:MM AM/PM"
                                        const formattedTime = () => {
                                            let hours = sentDate.getHours();
                                            const minutes = pad(sentDate.getMinutes());
                                            const period = hours < 12 ? 'AM' : 'PM';

                                            // Convert hours from 24-hour format to 12-hour format
                                            hours = hours % 12;
                                            hours = hours ? hours : 12; // Handle midnight (0 hours)

                                            return `${pad(hours)}:${minutes} ${period}`;
                                        };

                                        console.log(formattedDateTime());

                                        messageTime.innerHTML = formattedDateTime();

                                        // Append elements to chatMessage
                                        chatMessage.appendChild(messagePack);
                                        chatMessage.appendChild(messageTime);

                                        // Append chatMessage to chat container
                                        document.getElementById('messages-container').appendChild(chatMessage);

                                    } else {
                                        var chatMessageDiv = document.createElement('div');
                                        chatMessageDiv.classList.add('chat-message');

                                        // Create the <div> with class "messagePack"
                                        var messagePackDiv = document.createElement('div');
                                        messagePackDiv.classList.add('messagePack');

                                        // Create the <img> element
                                        var imgElement = document.createElement('img');
                                        imgElement.src = pfp.src;
                                        if (pfp.src === "loading.gif") {
                                            let pfpInterval1 = setInterval(function () {
                                                if (pfp.src !== "loading.gif") {
                                                    document.getElementById(element.id).src = pfp.src;
                                                    clearInterval(pfpInterval1)
                                                }
                                            }, 200)
                                        }
                                        imgElement.alt = element.id; //the name
                                        imgElement.classList.add('chat-avatar');

                                        // Append the <img> to the "messagePack" <div>
                                        messagePackDiv.appendChild(imgElement);

                                        // Create the <div> with class "message-content"
                                        var messageContentDiv = document.createElement('div');
                                        messageContentDiv.classList.add('message-content');

                                        // Create the <p> element for nameTopMsg
                                        var nameTopMsgP = document.createElement('p');
                                        nameTopMsgP.classList.add('nameTopMsg');
                                        nameTopMsgP.textContent = element.id; //the name

                                        // Create the <p> element for msgCont
                                        var msgContP = document.createElement('p');
                                        msgContP.classList.add('msgCont');
                                        msgContP.textContent = message.content; //The actual message

                                        // Append the <p> elements to the "message-content" <div>
                                        messageContentDiv.appendChild(nameTopMsgP);
                                        messageContentDiv.appendChild(msgContP);

                                        // Append the "message-content" <div> to the "messagePack" <div>
                                        messagePackDiv.appendChild(messageContentDiv);

                                        // Append the "messagePack" <div> to the "chat-message" <div>
                                        chatMessageDiv.appendChild(messagePackDiv);

                                        // Create the <div> with class "message-time" and set its text content
                                        var messageTimeDiv = document.createElement('div');
                                        messageTimeDiv.classList.add('message-time');

                                        const sentDate = new Date(message.timestamp);

                                        // Month abbreviations array
                                        const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

                                        // Function to pad numbers with leading zeros
                                        const pad = (num) => {
                                            return num.toString().padStart(2, '0');
                                        };

                                        // Format the date into "DD Jun . HH:MM AM/PM"
                                        const formattedDateTime = () => {
                                            const day = pad(sentDate.getDate());
                                            const monthAbbreviation = monthAbbreviations[sentDate.getMonth()];
                                            const time = formattedTime(); // Get formatted time using the existing function

                                            return `${day} ${monthAbbreviation} &#x2022; ${time}`;
                                        };

                                        // Function to format time into "HH:MM AM/PM"
                                        const formattedTime = () => {
                                            let hours = sentDate.getHours();
                                            const minutes = pad(sentDate.getMinutes());
                                            const period = hours < 12 ? 'AM' : 'PM';

                                            // Convert hours from 24-hour format to 12-hour format
                                            hours = hours % 12;
                                            hours = hours ? hours : 12; // Handle midnight (0 hours)

                                            return `${pad(hours)}:${minutes} ${period}`;
                                        };

                                        console.log(formattedDateTime());

                                        messageTimeDiv.innerHTML = formattedDateTime();

                                        // Append the "message-time" <div> to the "chat-message" <div>
                                        chatMessageDiv.appendChild(messageTimeDiv);

                                        // Assuming you have a parent element with id "chat-container" where you want to append the chat message
                                        messagesContainer.appendChild(chatMessageDiv);
                                    }

                                } else {
                                    if (message.content.includes("http") || message.content.includes("https")) {
                                        //createChatAttachment(message.content, element.id, 'no')
                                        // Create main container
                                        const chatMessage = document.createElement('div');
                                        chatMessage.className = 'chat-message';

                                        // Create message pack
                                        const messagePack = document.createElement('div');
                                        messagePack.className = 'messagePackMe';

                                        // Create avatar
                                        const avatar = document.createElement('img');
                                        avatar.src = 'loading.gif';
                                        loadPFPget(localStorage.getItem("t50-username")).then((profile) => {
                                            avatar.src = profile;
                                        })
                                        avatar.alt = 'Novus Hyperlink';
                                        avatar.className = 'chat-avatar';

                                        // Create message content
                                        const messageContent = document.createElement('div');
                                        messageContent.className = 'message-content';

                                        // Create attachment
                                        const attachment = document.createElement('div');
                                        attachment.className = 'attachment';

                                        // Create row
                                        const theRow = document.createElement('div');
                                        theRow.className = 'theRow';

                                        // Create pdf icon
                                        const pdfIcon = document.createElement('img');
                                        pdfIcon.src = 'attach.svg';
                                        const urlObject = new URL(message.content);

                                        const domain = urlObject.hostname;
                                        const final = `https://logo.clearbit.com/${domain}`
                                        pdfIcon.src = final


                                        // Create info wrap
                                        const infoWrap = document.createElement('div');
                                        infoWrap.className = 'infoWrap';

                                        // Create project name
                                        const projectName = document.createElement('p');
                                        projectName.textContent = domain;

                                        // Create file info
                                        const fileInfo = document.createElement('span');
                                        const filenameWithoutExtension = message.content.split('/').pop().replace(/\.[^.]+$/, '');
                                        if (message.content.includes('.pdf')) {
                                            pdfIcon.src = 'pdf.svg';
                                            projectName.textContent = filenameWithoutExtension;
                                            fileInfo.innerHTML = 'PDF &#x2022; unkMB';
                                        } else if (message.content.includes('.png')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'PNG &#x2022; unkMB';
                                        } else if (message.content.includes('.jpg')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'JPG &#x2022; unkMB';
                                        } else if (message.content.includes('.webp')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'WEBP &#x2022; unkMB';
                                        } else if (message.content.includes('.gif')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = message.content;
                                            fileInfo.innerHTML = 'GIF &#x2022; unkMB';
                                        } else if (message.content.includes('.mp4')) {
                                            projectName.textContent = filenameWithoutExtension;
                                            pdfIcon.src = 'video.svg';
                                            fileInfo.innerHTML = 'MP4 &#x2022; unkMB';
                                        } else {
                                            fileInfo.innerHTML = 'URL &#x2022; unkMB';
                                        }

                                        const downloadIcon = document.createElement('img');

                                        downloadIcon.onclick = function () {
                                            createAndClickHiddenLink(message.content)
                                        }
                                        downloadIcon.className = 'imgBox';
                                        downloadIcon.style.marginRight = 0
                                        downloadIcon.src = 'open.svg';

                                        const downloadFile = document.createElement('img');
                                        downloadFile.src = 'download.svg';
                                        downloadFile.className = 'imgBoxLast';
                                        downloadFile.onclick = function () {
                                            console.log("Downloading..")
                                            downloadFileDirectly(message.content, filenameWithoutExtension)
                                        }


                                        if (message.content.includes('.pdf') || message.content.includes('.png') || message.content.includes('.jpg') || message.content.includes('.jpg') || message.content.includes('.webp') || message.content.includes('.gif') || message.content.includes('.mp4')) {
                                            downloadFile.style.display = "none"//cors so hidding it
                                            //is a file
                                        } else {
                                            downloadFile.style.display = "none"
                                        }



                                        // Create download icon


                                        // Create delete icon


                                        // Append elements to infoWrap
                                        infoWrap.appendChild(projectName);
                                        infoWrap.appendChild(fileInfo);

                                        // Append elements to theRow
                                        theRow.appendChild(pdfIcon);
                                        theRow.appendChild(infoWrap);
                                        theRow.appendChild(downloadIcon);
                                        try {
                                            theRow.appendChild(downloadFile);
                                        } catch (error) {
                                            console.warn("Cannot spawn element downloadFile", error)
                                        }


                                        // Append theRow to attachment
                                        attachment.appendChild(theRow);

                                        // Append attachment to messageContent
                                        messageContent.appendChild(attachment);

                                        // Append elements to messagePack
                                        messagePack.appendChild(avatar);
                                        messagePack.appendChild(messageContent);

                                        // Create message time
                                        const messageTime = document.createElement('div');
                                        messageTime.className = 'message-time-me';



                                        const sentDate = new Date(message.timestamp);

                                        // Month abbreviations array
                                        const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

                                        // Function to pad numbers with leading zeros
                                        const pad = (num) => {
                                            return num.toString().padStart(2, '0');
                                        };

                                        // Format the date into "DD Jun . HH:MM AM/PM"
                                        const formattedDateTime = () => {
                                            const day = pad(sentDate.getDate());
                                            const monthAbbreviation = monthAbbreviations[sentDate.getMonth()];
                                            const time = formattedTime(); // Get formatted time using the existing function

                                            return `${day} ${monthAbbreviation} &#x2022; ${time}`;
                                        };

                                        // Function to format time into "HH:MM AM/PM"
                                        const formattedTime = () => {
                                            let hours = sentDate.getHours();
                                            const minutes = pad(sentDate.getMinutes());
                                            const period = hours < 12 ? 'AM' : 'PM';

                                            // Convert hours from 24-hour format to 12-hour format
                                            hours = hours % 12;
                                            hours = hours ? hours : 12; // Handle midnight (0 hours)

                                            return `${pad(hours)}:${minutes} ${period}`;
                                        };

                                        console.log(formattedDateTime());

                                        messageTime.innerHTML = formattedDateTime();

                                        // Append elements to chatMessage
                                        chatMessage.appendChild(messagePack);
                                        chatMessage.appendChild(messageTime);

                                        // Append chatMessage to chat container
                                        document.getElementById('messages-container').appendChild(chatMessage);

                                    } else {
                                        var chatMessageDiv = document.createElement('div');
                                        chatMessageDiv.classList.add('chat-message');

                                        // Create the <div> with class "messagePack"
                                        var messagePackDiv = document.createElement('div');
                                        messagePackDiv.classList.add('messagePackMe');

                                        // Create the <img> element
                                        var imgElement = document.createElement('img');
                                        imgElement.src = 'evox-logo-apple.png';
                                        loadPFPget(localStorage.getItem("t50-username")).then((profile) => {
                                            imgElement.src = profile;
                                        })

                                        imgElement.alt = localStorage.getItem("t50-username"); //the name
                                        imgElement.classList.add('chat-avatar');

                                        // Append the <img> to the "messagePack" <div>
                                        messagePackDiv.appendChild(imgElement);

                                        // Create the <div> with class "message-content"
                                        var messageContentDiv = document.createElement('div');
                                        messageContentDiv.classList.add('message-content');

                                        // Create the <p> element for nameTopMsg
                                        var nameTopMsgP = document.createElement('p');
                                        nameTopMsgP.classList.add('nameTopMsg');
                                        nameTopMsgP.textContent = localStorage.getItem("t50-username"); //the name

                                        // Create the <p> element for msgCont
                                        var msgContP = document.createElement('p');
                                        msgContP.classList.add('msgCont');
                                        msgContP.textContent = message.content; //The actual message

                                        // Append the <p> elements to the "message-content" <div>
                                        messageContentDiv.appendChild(nameTopMsgP);
                                        messageContentDiv.appendChild(msgContP);

                                        // Append the "message-content" <div> to the "messagePack" <div>
                                        messagePackDiv.appendChild(messageContentDiv);

                                        // Append the "messagePack" <div> to the "chat-message" <div>
                                        chatMessageDiv.appendChild(messagePackDiv);

                                        // Create the <div> with class "message-time" and set its text content
                                        var messageTimeDiv = document.createElement('div');
                                        messageTimeDiv.classList.add('message-time-me');
                                        const sentDate = new Date(message.timestamp);

                                        // Month abbreviations array
                                        const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                                            "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

                                        // Function to pad numbers with leading zeros
                                        const pad = (num) => {
                                            return num.toString().padStart(2, '0');
                                        };

                                        // Format the date into "DD Jun . HH:MM AM/PM"
                                        const formattedDateTime = () => {
                                            const day = pad(sentDate.getDate());
                                            const monthAbbreviation = monthAbbreviations[sentDate.getMonth()];
                                            const time = formattedTime(); // Get formatted time using the existing function

                                            return `${day} ${monthAbbreviation} &#x2022; ${time}`;
                                        };

                                        // Function to format time into "HH:MM AM/PM"
                                        const formattedTime = () => {
                                            let hours = sentDate.getHours();
                                            const minutes = pad(sentDate.getMinutes());
                                            const period = hours < 12 ? 'AM' : 'PM';

                                            // Convert hours from 24-hour format to 12-hour format
                                            hours = hours % 12;
                                            hours = hours ? hours : 12; // Handle midnight (0 hours)

                                            return `${pad(hours)}:${minutes} ${period}`;
                                        };

                                        console.log(formattedDateTime());

                                        messageTimeDiv.innerHTML = formattedDateTime();

                                        // Append the "message-time" <div> to the "chat-message" <div>
                                        chatMessageDiv.appendChild(messageTimeDiv);

                                        // Assuming you have a parent element with id "chat-container" where you want to append the chat message
                                        messagesContainer.appendChild(chatMessageDiv);
                                    }
                                }

                            });
                        } else {
                            console.error("JSON data or messages array is undefined.");
                        }
                    })
            } else if (data === "Chat Doesn't Exist") {
                document.getElementById("messages-container").innerHTML = `<p class='centered-text'>Chat Hasn't Been Created.<button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`
            } else {
                //Make Prompt
                console.log("unknown error")
            }
        })
    //document.getElementById("secureline-img-chat").src = pfp.src
    //document.getElementById("chat-username").innerHTML = element.id
    //reload_chat(element.id)
    //document.getElementById("private_chat").classList.add("active")
    var chatdiv = document.getElementById("messages-container");
    // Scroll to the bottom of the div
    chatdiv.scrollTop = chatdiv.scrollHeight;
    console.log(pfp)
    console.log(pfp.src)
    console.log(element.id)
}
document.addEventListener("DOMContentLoaded", (event) => {
    messagesPreload()
});



function checkUsernameAndGetData(username, getDataCallback) {
    let request = window.indexedDB.open('EvoxSocial'); // Change version number to 2

    request.onerror = function (event) {
        console.log("Database error:", event.target.error);
    };

    request.onsuccess = function (event) {
        // Database has been opened successfully
        let db = event.target.result;

        if (!db.objectStoreNames.contains('Profiles')) {
            // If the 'Profiles' object store doesn't exist, create it
            let version = db.version + 1;
            db.close(); // Close the database to perform the upgrade

            let upgradeRequest = window.indexedDB.open('EvoxSocial', version);

            upgradeRequest.onerror = function (event) {
                console.log("Database upgrade error:", event.target.error);
            };

            upgradeRequest.onupgradeneeded = function (event) {
                // Create the 'Profiles' object store
                let db = event.target.result;
                db.createObjectStore('Profiles', { keyPath: 'username' });
            };

            upgradeRequest.onsuccess = function (event) {
                console.log("Object store 'Profiles' created.");
                // After creating the object store, retry retrieving data
                checkUsernameAndGetData(username, getDataCallback);
            };
        } else {
            // If the 'Profiles' object store exists, proceed with retrieving data
            let transaction = db.transaction(['Profiles'], 'readonly');
            let objectStore = transaction.objectStore('Profiles');
            let getRequest = objectStore.get(username);

            getRequest.onsuccess = function (event) {
                let result = event.target.result;
                if (result) {
                    // Username exists, run the getDataCallback function to retrieve the data
                    getDataCallback(null, result);
                } else {
                    getDataCallback(null, "None");
                    console.log("Username not found: " + username);
                }
            };

            getRequest.onerror = function (event) {
                console.log("Error checking username:", event.target.error);
            };
        }
    };
}



function loadPFP(username, idsuffix) {
    checkUsernameAndGetData(username, function (error, data) {
        if (error) {
            console.error(error);
        } else {
            console.log("Retrieved data:", data);
            const imgElement = document.getElementById(`${username}${idsuffix}`);
            if (!imgElement) {
                console.error(`Element with id ${username}${idsuffix} not found.`);
                console.log("Retrying..")
                loadPFP(username, idsuffix)
                return;
            }

            if (data !== "None") {
                console.log("Loading from localDB");
                imgElement.src = data.data;
                //Check if update is needed
                //disabled due to datacenter overload
                return;
                fetch(`${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(profileimage => {
                        if (profileimage.indexOf("base64") === -1) {
                            // If it doesn't contain "base64", add the prefix
                            console.log("Fixing Base64");
                            profileimage = "data:image/jpeg;base64," + profileimage;
                        }
                        if (profileimage === data.data) {
                            console.log("Profile Picture Appears to be the same as Db");
                        } else {
                            profilesLocal(username, profileimage);
                            imgElement.src = profileimage;
                            console.log("Updating!");
                        }
                    }).catch(error => {
                        console.error("Cannot set src for", username);
                        console.error(error);
                    });
            } else {
                console.log("Loading from server");
                fetch(`${srv}/profiles?authorize=351c3669b3760b20615808bdee568f33&pfp=${username}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(profileimage => {
                        if (profileimage.indexOf("base64") === -1) {
                            // If it doesn't contain "base64", add the prefix
                            console.log("Fixing Base64");
                            profileimage = "data:image/jpeg;base64," + profileimage;
                        }
                        imgElement.src = profileimage;
                        profilesLocal(username, profileimage);
                    }).catch(error => {
                        console.error("Cannot set src for", username);
                        console.error(error);
                    });
            }
        }
    });
}

