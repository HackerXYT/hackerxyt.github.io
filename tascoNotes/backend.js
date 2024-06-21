let username;
let email;
let passwordEncrypted;
let blockConn;
if (localStorage.getItem("skipTheYap") === "true") {
    console.log("Yapping stopped")
    loadNotes()
    //do the thing reloadNotes does to append them
    reloadNotes()
}
document.addEventListener("DOMContentLoaded", () => {
    username = localStorage.getItem("t50-username")
    email = localStorage.getItem("t50-email")
    passwordEncrypted = localStorage.getItem("t50pswd")
    if (username && email && passwordEncrypted) {
        document.getElementById("notesNames").innerHTML = ''
        fetch(`https://data.evoxs.xyz/tasco?method=getUserNotesInfo&username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON data
            })
            .then(data => {
                // Work with the JSON data
                if (data.message === "userFolder doesn't exist") {
                    document.getElementById("welcome").style.display = ""
                    console.log("New User")
                    if (localStorage.getItem("skipTheYap") === "true") {
                        localStorage.removeItem("skipTheYap")
                        window.location.reload()
                    }
                } else {
                    localStorage.setItem("skipTheYap", "true")
                    loadNotes()
                    //do the thing reloadNotes does to append them
                    reloadNotes()
                }
                console.log(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    } else {
        document.getElementById("welcome").style.display = ""
        blockConn = true
    }
})

function createNote() {
    if (username && email && passwordEncrypted) {
        document.getElementById("newNote").style.display = "none"
        fetch(`https://data.evoxs.xyz/tasco?method=deluxeNew&noteCont=0none0&username=${username}&noteTitle=New Note`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON data
            })
            .then(data => {
                if (data.message === "All operations succeeded") {
                    document.getElementById("newNote").style.display = ""
                    reloadNotes()
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

let lastResponse;
setInterval(function () {
    reloadNotes("intervaling.")
}, 1500)
function reloadNotes(int) {
    if (username && email && passwordEncrypted) {
        if (!int) {
            loadBg()
        }
        fetch(`https://data.evoxs.xyz/tasco?method=getUserNotesInfo&username=${username}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON data
            })
            .then(data => {
                console.log("the data:", data)

                if (int) {
                    if (JSON.stringify(lastResponse) === JSON.stringify(data)) {
                        console.log("No changes")
                        return;
                    } else {

                        checkForChanges(sessionStorage.getItem('currentNote'))
                        console.log(`Auto reloading, because:`, lastResponse, data)
                        lastResponse = data
                    }
                }
                lastResponse = data
                if (data.settings) {
                    localStorage.setItem("userSettings", JSON.stringify(data.settings))
                    if (data.settings.background === "default") {
                        document.getElementById("bggradient").style.display = "block"
                        document.getElementById("neuro").style.display = "none"
                    } else if (data.settings.background === "evox") {
                        document.getElementById("bggradient").style.display = "none"
                        document.getElementById("neuro").style.display = "block"
                    } else if (data.settings.background === "false") {
                        document.getElementById("bggradient").style.display = "none"
                        document.getElementById("neuro").style.display = "none"
                    } else if (data.settings.background === "true") {
                        document.getElementById("bggradient").style.display = "block"
                        document.getElementById("neuro").style.display = "none"
                    } else {
                        document.getElementById("bggradient").style.display = "block"
                        document.getElementById("neuro").style.display = "none"
                    }
                }
                if (!data.message) {
                    const noteNames = data.names
                    document.getElementById("notesNames").innerHTML = ''
                    document.getElementById('notesFav').innerHTML = `<div class="section-title">Favorites<span><img src="arrow-down.svg"></span></div>`
                    let customClass = false;
                    console.log(noteNames.length)
                    document.getElementById("howmany").innerText = `${noteNames.length} Notes`
                    if (noteNames.length === 1) {
                        document.getElementById("howmany").innerText = `${noteNames.length} Note`
                    }
                    if (noteNames.length === 0) {
                        document.getElementById("notesNames").innerHTML = `<div class="note" style="border-radius:15px">
                    <div class="note-title">No Notes Created!</div> <!--changeBg()-->
                    <div class="note-date">Click the + to create one!</div>
                    
                </div>`
                    }
                    if (noteNames.length === 1) {
                        customClass = true
                    }
                    noteNames.forEach(noteId => {

                        fetch(`https://data.evoxs.xyz/tasco?method=getNoteById&username=${username}&noteId=${noteId}`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json(); // Parse JSON data
                            })
                            .then(noteData => {
                                console.log(noteData)
                                if (noteData.message === "Note doesn't exist") {
                                    console.error("Tried to access a note that doesn't exist.\nThis is probably a database error.")
                                    console.error("Resolving Errors.")
                                    const resolvingInt = setInterval(function () {
                                        document.getElementById("snap").style.opacity = "1"
                                        setTimeout(function () {
                                            document.getElementById("snap").style.opacity = "0"
                                        }, 500)
                                    }, 500)
                                    let milis = 0
                                    const milisInt = setInterval(function () {
                                        milis = milis + 500
                                    }, 500)
                                    fetch(`https://data.evoxs.xyz/tasco?method=deleteNote&username=${username}&noteId=${noteId}`)
                                        .then(response => {
                                            if (!response.ok) {
                                                throw new Error('Network response was not ok');
                                            }
                                            return response.json(); // Parse JSON data
                                        })
                                        .then(fixRes => {
                                            if (fixRes.message === "Done") {
                                                if (milis < 3000) {
                                                    console.log("Waiting.")
                                                    const waitThis = 3000 - milis
                                                    setTimeout(function () {
                                                        console.log("Done!")
                                                        reloadNotes()
                                                        clearInterval(resolvingInt)
                                                        clearInterval(milisInt)
                                                    }, waitThis)
                                                } else {
                                                    console.log("Done! Is Ready.")
                                                    reloadNotes()
                                                    clearInterval(resolvingInt)
                                                    clearInterval(milisInt)
                                                }


                                            } else {
                                                alert("Oh, Snap!\nSomething Failed!", data)
                                            }
                                        })
                                        .catch(error => {
                                            console.error('There has been a problem with your fetch operation:', error);
                                            alert("Oh Snap!\nSomething Failed!", error)
                                        });

                                    return;
                                }
                                if (data.favorites.includes(noteId)) {
                                    sessionStorage.setItem(noteId, JSON.stringify(noteData))
                                    const noteDiv = document.createElement('div');
                                    noteDiv.className = `note`;
                                    noteDiv.id = noteId
                                    noteDiv.setAttribute("e-fav", "true")
                                    if (customClass) {
                                        console.log("Setting border")
                                        noteDiv.style.borderRadius = "15px";
                                    }
                                    noteDiv.onclick = function () {
                                        handleNote(this);
                                    };


                                    const noteTitle = document.createElement('div');
                                    noteTitle.className = 'note-title';
                                    noteTitle.id = `title-${noteId}`
                                    noteTitle.textContent = noteData.title;

                                    const noteDate = document.createElement('div');
                                    noteDate.className = 'note-date';
                                    noteDate.textContent = noteData.dateCreated;

                                    // Append title and date to noteDiv
                                    noteDiv.appendChild(noteTitle);
                                    noteDiv.appendChild(noteDate);

                                    // Append noteDiv to the element with id 'notesNames'
                                    const notesNamesElem = document.getElementById('notesFav');
                                    if (notesNamesElem) {
                                        notesNamesElem.style.display = ""
                                        notesNamesElem.appendChild(noteDiv);
                                    } else {
                                        console.error('Element with id "notesNames" not found.');
                                    }
                                } else {
                                    sessionStorage.setItem(noteId, JSON.stringify(noteData))
                                    const noteDiv = document.createElement('div');
                                    noteDiv.className = `note`;
                                    noteDiv.id = noteId
                                    if (customClass) {
                                        console.log("Setting border")
                                        noteDiv.style.borderRadius = "15px";
                                    }
                                    noteDiv.onclick = function () {
                                        handleNote(this);
                                    };


                                    const noteTitle = document.createElement('div');
                                    noteTitle.className = 'note-title';
                                    noteTitle.id = `title-${noteId}`
                                    noteTitle.textContent = noteData.title;

                                    const noteDate = document.createElement('div');
                                    noteDate.className = 'note-date';
                                    noteDate.textContent = noteData.dateCreated;

                                    // Append title and date to noteDiv
                                    noteDiv.appendChild(noteTitle);
                                    noteDiv.appendChild(noteDate);

                                    // Append noteDiv to the element with id 'notesNames'
                                    const notesNamesElem = document.getElementById('notesNames');
                                    if (notesNamesElem) {
                                        notesNamesElem.appendChild(noteDiv);
                                    } else {
                                        console.error('Element with id "notesNames" not found.');
                                    }
                                }

                            })
                            .catch(error => {
                                console.error('There has been a problem with your fetch operation:', error);
                            });
                    });

                } else {
                    document.getElementById("notesNames").innerHTML = `<div class="note" style="border-radius:15px">
                    <div class="note-title">No Notes Created!</div> <!--changeBg()-->
                    <div class="note-date">Click the + to create one!</div></div>`
                    document.getElementById("howmany").innerText = `0 Notes`
                    if (localStorage.getItem("skipTheYap") === "true") {
                        alert("Failed to reload. No userFolder.")
                    }
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }
}

let wait;
let trigger = 0;
function updateNoteDaemon() {
    let theId = sessionStorage.getItem("currentNote")
    trigger = trigger + 1
    fetchTheNote(theId)
}

function fetchTheNote(id) {
    if (!id) {
        return "Rejected";
    }
    let noteCont = document.getElementById("noteInner").value
    let noteTitle = document.getElementById("noteTitle").value
    if (noteCont === "") {
        noteCont = "0none0"
    }
    if (noteTitle === "") {
        noteTitle = "Unnamed Note"
    }

    document.getElementById(`title-${id}`).innerText = noteTitle
    fetch(`https://data.evoxs.xyz/tasco?method=deluxeEdit&noteCont=${noteCont}&noteTitle=${noteTitle}&username=${username}&noteId=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            if (data.message === "All operations succeeded") {
                const sessionVal = sessionStorage.getItem(id)
                const jsonSes = JSON.parse(sessionVal)
                jsonSes.content = noteCont
                jsonSes.title = noteTitle
                sessionStorage.setItem(id, JSON.stringify(jsonSes))
                console.log("Saved!!")
            } else {
                console.log("Hm", data)
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
function getInnerNote(id) {
    const data = sessionStorage.getItem(id)
    const theJson = JSON.parse(data)
    return theJson.content
}

const textareaTitle = document.getElementById('noteTitle');

// Add an event listener for the 'input' event
textareaTitle.addEventListener('input', function (event) {
    // This function will be called whenever the user types something in the textarea
    console.log('Textarea content changed:', event.target.value);
    updateNoteDaemon()
});

const textareaMain = document.getElementById('noteInner');

// Add an event listener for the 'input' event
textareaMain.addEventListener('input', function (event) {
    // This function will be called whenever the user types something in the textarea
    console.log('Textarea content changed:', event.target.value);
    updateNoteDaemon()
});

function deleteCurrent() {
    const currentNote = sessionStorage.getItem("currentNote")
    fetch(`https://data.evoxs.xyz/tasco?method=deleteNote&username=${username}&noteId=${currentNote}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            // Work with the JSON data
            console.log(data);
            if (data.message === "Done") {
                console.log("Done!")
                backNote()
                reloadNotes()
            } else {
                alert("Something Failed!", data)
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
let reloadNow;
function favoriteCurrent() {
    reloadNow = true
    if (!document.getElementById("activateFav").src.includes("favorite-active.svg")) {
        const currentNote = sessionStorage.getItem("currentNote")
        fetch(`https://data.evoxs.xyz/tasco?method=favoriteNote&username=${username}&noteId=${currentNote}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse JSON data
            })
            .then(data => {
                // Work with the JSON data
                console.log(data);
                if (data.message === "Done") {
                    console.log("Done!")
                    document.getElementById("activateFav").src = "favorite-active.svg"
                } else {
                    alert("Something Failed!", data)
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }

}

function userSettings(setting, set) {
    fetch(`https://data.evoxs.xyz/tasco?method=settingsNotes&identifier=${setting}&newSet=${set}&username=${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(data => {
            console.log(data);
            if (data.message === "Complete!") {
                console.log("Success.")
                reloadNotes()
            } else {
                alert("Something Failed!", data)
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function checkForChanges(whatIsTheId) {
    if(!whatIsTheId) {
        return;
    }
    fetch(`https://data.evoxs.xyz/tasco?method=getNoteById&username=${username}&noteId=${whatIsTheId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON data
        })
        .then(noteData => {
            if (noteData.message === "Note doesn't exist") {
                reloadNow = true
                backNote()
            } else {
                if(noteData.content === document.getElementById("noteInner").value) {
                    //content is the same
                    console.log("Debug: content is the same")
                } else {
                    console.warn("Debug: content is not the same")
                    document.getElementById("noteInner").value = noteData.content
                    reloadNotes()
                }
                if(document.getElementById(`title-${whatIsTheId}`).innerText === noteData.title) {
                    //title is the same
                    console.log("Debug: title is the same")
                } else {
                    console.warn("Debug: title is not the same")
                    document.getElementById('noteTitle').value = noteData.title;
                    document.getElementById(`title-${whatIsTheId}`).innerText === noteData.title
                    reloadNotes()
                }
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            alert("Oh Snap!\nSomething Failed!", error)
        });
}