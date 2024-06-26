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
                            userCircle.innerHTML = `<img src="loading-circle.gif" id="${username}-pfp-secureline" alt="User ${username} Image">`;
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


function createChatMessage(url, sender, isitMe) {
    // Create main container
    const chatMessage = document.createElement('div');
    chatMessage.className = 'chat-message';

    // Create message pack
    const messagePack = document.createElement('div');
    messagePack.className = 'messagePack';

    // Create avatar
    const avatar = document.createElement('img');
    avatar.src = 'evox-logo-apple.png';
    avatar.alt = 'Kristin Watson';
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
    pdfIcon.src = 'pdf.svg';

    // Create info wrap
    const infoWrap = document.createElement('div');
    infoWrap.className = 'infoWrap';

    // Create project name
    const projectName = document.createElement('p');
    projectName.textContent = 'New_Project';

    // Create file info
    const fileInfo = document.createElement('span');
    fileInfo.innerHTML = 'PDF &#x2022; 1.9MB';

    // Create download icon
    const downloadIcon = document.createElement('img');
    downloadIcon.src = 'download.svg';
    downloadIcon.className = 'imgBox';

    // Create delete icon
    const deleteIcon = document.createElement('img');
    deleteIcon.src = 'delete.svg';
    deleteIcon.className = 'imgBoxLast';

    // Append elements to infoWrap
    infoWrap.appendChild(projectName);
    infoWrap.appendChild(fileInfo);

    // Append elements to theRow
    theRow.appendChild(pdfIcon);
    theRow.appendChild(infoWrap);
    theRow.appendChild(downloadIcon);
    theRow.appendChild(deleteIcon);

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
    messageTime.textContent = '11:00 AM';

    // Append elements to chatMessage
    chatMessage.appendChild(messagePack);
    chatMessage.appendChild(messageTime);

    // Append chatMessage to chat container
    document.getElementById('chat-container').appendChild(chatMessage);
}

function showchat(element) {//json id=Username
    document.getElementById("chat-show").style.display = ""
    document.getElementById("messages-side-cont").style.display = "none"
    //$("#navigator").fadeOut("fast")
    //document.getElementById("secureline_chat").classList.add("active")
    //$("#private_chat").fadeIn("fast")
    sessionStorage.setItem("current_sline", element.id)
    pfp = document.getElementById(`${element.id}-pfp-secureline`)
    fetch(`https://data.evoxs.xyz/secureline?method=CreateChat&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}&password=${atob(localStorage.getItem("t50pswd"))}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data === "Chat Exists.") {
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
                            console.log("Container", messagesContainer)
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
                                
                                
                                if(whosent === "user") {
                                    if(message.content.includes("http")) {


                                    } else {
                                        var chatMessageDiv = document.createElement('div');
                                        chatMessageDiv.classList.add('chat-message');
        
                                        // Create the <div> with class "messagePack"
                                        var messagePackDiv = document.createElement('div');
                                        messagePackDiv.classList.add('messagePack');
        
                                        // Create the <img> element
                                        var imgElement = document.createElement('img');
                                        imgElement.src = pfp.src;
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
                                        messageTimeDiv.textContent = 'Unknown AM';
        
                                        // Append the "message-time" <div> to the "chat-message" <div>
                                        chatMessageDiv.appendChild(messageTimeDiv);
        
                                        // Assuming you have a parent element with id "chat-container" where you want to append the chat message
                                        messagesContainer.appendChild(chatMessageDiv);
                                    }
                                    
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
                                    messageTimeDiv.textContent = 'Unknown AM';
    
                                    // Append the "message-time" <div> to the "chat-message" <div>
                                    chatMessageDiv.appendChild(messageTimeDiv);
    
                                    // Assuming you have a parent element with id "chat-container" where you want to append the chat message
                                    messagesContainer.appendChild(chatMessageDiv);
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