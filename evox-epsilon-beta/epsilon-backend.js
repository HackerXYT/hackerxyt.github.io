//IndexedDB
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

//Time Management
function formatTimeDifference(timestamp) {
    // Parse the provided timestamp into a Date object
    const givenDate = new Date(timestamp);
    const now = new Date();
    
    // Calculate the difference in milliseconds
    const diffMs = now - givenDate;
    
    // Convert milliseconds into various units
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);

    // Determine the appropriate format
    if (diffHours < 24) {
        if (diffMinutes < 60) {
            return `${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
        } else {
            return `${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
        }
    } else if (diffDays < 6) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    } else if (diffDays >= 7) {
        return `${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`;
    } else {
        return 'Time difference is too large';
    }
}

//Secureline
// Helper function to format date and time
function formatDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const pad = (num) => num.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = months[date.getMonth()];
    const hours = pad(date.getHours() % 12 || 12);
    const minutes = pad(date.getMinutes());
    const ampm = date.getHours() < 12 ? "AM" : "PM";
    return `${day} ${month} &#x2022; ${hours}:${minutes} ${ampm}`;
}

function processMessage(data, element) {
    const creationDate = new Date(data);
    const todayMonth = new Date().getMonth();
    const creationMonth = creationDate.getMonth();
    const creationDay = creationDate.getDate();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (data === "Chat Doesn't Exist") {
        document.getElementById("messages-container").innerHTML = `
        <p class='centered-text'>Chat Hasn't Been Created.
        <button style="margin-top: 20px" id="submit" onclick="create_chat()" class="transparent-button">Create Chat</button></p>`;
        return;
    }

    console.log("Creation:", data);
    const creationText = `${months[creationMonth]} ${creationDay} - ${months[todayMonth]}`;

    console.log("Getting Existing Chat");
    fetch(`https://data.evoxs.xyz/secureline?method=MyChats&username=${localStorage.getItem("t50-username")}&recipient_username=${element.id}&password=${atob(localStorage.getItem("t50pswd"))}`)
        .then(response => response.ok ? response.text() : Promise.reject(`HTTP error! Status: ${response.status}`))
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (!data || !data.messages) throw new Error("Invalid data format");

                const container = document.getElementById("messages-container");
                container.innerHTML = "";

                data.messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).forEach(message => {
                    const messageContainer = document.createElement("div");
                    messageContainer.className = "chat-message";

                    const messagePack = document.createElement("div");
                    messagePack.className = message.sender === localStorage.getItem("t50-username") ? "messagePackMe" : "messagePack";

                    const avatar = document.createElement("img");
                    avatar.className = "chat-avatar";
                    //avatar.style.display = 'none'
                    avatar.src = message.sender === localStorage.getItem("t50-username") ? "evox-logo-apple.png" : pfp.src;
                    avatar.alt = message.sender;

                    const content = document.createElement("div");
                    content.className = "message-content";

                    const timestamp = document.createElement("div");
                    timestamp.className = message.sender === localStorage.getItem("t50-username") ? "message-time-me" : "message-time";
                    timestamp.innerHTML = formatDate(new Date(message.timestamp));

                    if (message.content.includes("http") || message.content.includes("https")) {
                        const attachment = document.createElement("div");
                        attachment.className = "attachment";

                        const attachRow = document.createElement("div");
                        attachRow.className = "theRow";

                        const attachIcon = document.createElement("img");
                        attachIcon.src = "./novus/attach.svg";

                        const url = new URL(message.content);
                        const logoUrl = `https://logo.clearbit.com/${url.hostname}`;
                        attachIcon.src = logoUrl;

                        const infoWrap = document.createElement("div");
                        infoWrap.className = "infoWrap";

                        const fileName = message.content.split("/").pop().replace(/\.[^.]+$/, "");
                        const fileType = /\.(pdf|png|jpg|webp|gif|mp4)$/i.exec(message.content)?.[1] || "URL";
                        const fileIcon = fileType === "URL" ? "./novus/attach.svg" : `./novus/${fileType}.svg`;
                        if (fileType === "png" || fileType === "jpg") {
                            attachIcon.src = message.content;
                        } else {
                            attachIcon.src = fileIcon;
                        }


                        const fileTypeInfo = document.createElement("span");
                        fileTypeInfo.innerHTML = `${fileType.toUpperCase()} &#x2022; unkMB`;

                        infoWrap.innerHTML = `<p>${url.hostname}</p>`;
                        infoWrap.appendChild(fileTypeInfo);

                        attachRow.appendChild(attachIcon);
                        attachRow.appendChild(infoWrap);

                        const openButton = document.createElement("img");
                        openButton.src = "./novus/open.svg";
                        openButton.className = "imgBox";
                        openButton.onclick = () => createAndClickHiddenLink(message.content);

                        const downloadButton = document.createElement("img");
                        downloadButton.src = "./novus/download.svg";
                        downloadButton.className = "imgBoxLast";
                        downloadButton.onclick = () => downloadFileDirectly(message.content, fileName);

                        attachRow.appendChild(openButton);
                        attachRow.appendChild(downloadButton);

                        attachment.appendChild(attachRow);
                        content.appendChild(attachment);
                    } else {
                        const name = document.createElement("p");
                        name.className = "nameTopMsg";
                        name.style.display = 'none'
                        name.textContent = message.sender;

                        const msgContent = document.createElement("p");
                        msgContent.className = "msgCont";
                        msgContent.textContent = message.content;

                        content.appendChild(name);
                        content.appendChild(msgContent);
                    }

                    messagePack.appendChild(avatar);
                    messagePack.appendChild(content);
                    messageContainer.appendChild(messagePack);
                    messageContainer.appendChild(timestamp);

                    container.appendChild(messageContainer);
                    const chatdiv = document.getElementById("messages-container");
                    chatdiv.scrollTop = chatdiv.scrollHeight;
                });
            } catch (error) {
                console.error("Error parsing messages:", error);
            }
        })
        .catch(error => console.error("Fetch error:", error));
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