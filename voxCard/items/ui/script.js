let myCards;
function createCard(theCard) {
    // Create the card div
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.onclick = function () {
        selectCard(theCard)
    }

    // Create the card-face div
    const cardFaceDiv = document.createElement('div');
    cardFaceDiv.className = 'card-face';

    // Create the image element
    const imgElement = document.createElement('img');
    imgElement.src = `../assets/${theCard}.svg`;

    // Append the image to the card-face div
    cardFaceDiv.appendChild(imgElement);

    // Append the card-face div to the card div
    cardDiv.appendChild(cardFaceDiv);

    // Find the element by ID and insert the card div into it

    const container = document.getElementById('mainDiv'); // Replace 'yourElementId' with the actual ID
    if (container) {

        container.appendChild(cardDiv);
    } else {
        console.error('Element with the specified ID not found.');
    }


    // Add an event listener for the 'blur' event


}

function createButton(name) {

    // Create the card div
    const Div = document.createElement('div');
    Div.className = 'button';
    Div.onclick = function () {
        sendCardTo(name)
    }
    Div.innerHTML = name

    // Find the element by ID and insert the card div into it

    const container = document.getElementById('allUsers'); // Replace 'yourElementId' with the actual ID
    if (container) {

        container.appendChild(Div);
    } else {
        console.error('Element with the specified ID not found.');
    }


    // Add an event listener for the 'blur' event


}



let selectedCard = 'none'

function sendCardTo(name) {
    const parts = selectedCard.split('-');
    const number = `-${parts[1]}`;
    const theJson = {
        'toUser': sessionStorage.getItem("tempUsername"),
        'fromUser': name,
        'card': number,
        'fullcard': selectedCard,
        'humanMethod': 'requestAcard'
    }
    socket.emit('send', theJson);
    deselectCard(selectedCard)
}

function send() {
    console.log('Clicked outside the div');
    const theJson = {
        'toUser': "me",
        'card': theCard
    }
    socket.emit('send', theJson);
    console.log("sent")
    deselectCard(theCard)

}

function deselectCard(cardNum) {
    console.log("deselected:", cardNum)
    document.getElementById("actions").classList.remove("active")
}
function selectCard(theCard) {
    console.log("selected:", theCard)
    selectedCard = theCard
    document.getElementById("actions").classList.add("active")
    fetch(`http://localhost:3000/`)
        .then(response => {
            // Check if the request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the JSON from the response
            return response.json();
        })
        .then(data => {
            const keys = Object.keys(data);
            document.getElementById('allUsers').innerHTML = ''
            keys.forEach(theUser => {
                if (theUser !== sessionStorage.getItem("tempUsername")) {
                    console.log(theUser)
                    createButton(theUser)
                }


            });
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}

function endGame() {
    fetch(`http://localhost:3000/endGame`)
        .then(response => {
            // Check if the request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the JSON from the response
            return response.text();
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}

var socket = io('http://localhost:3000');
socket.on('status', function (msg) {
    console.log(msg)
    if (msg === "ended") {
        setTimeout(function () {
            window.location.reload()
        }, 500)

    }
    if (msg === "started") {
        // Use the fetch API to make the request
        console.log("Game has started!")
        fetch('http://localhost:3000/getstartCards?username=' + sessionStorage.getItem("tempUsername"))
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Parse the JSON from the response
                return response.json();
            })
            .then(thise => {
                // Handle the data from the response
                console.log(thise);
                myCards = thise
                if (JSON.stringify(thise) === '[]') {
                    console.warn("out of cards")
                    return;
                }
                document.getElementById('mainDiv').innerHTML = ''
                thise.forEach(thecard => {
                    createCard(thecard);
                });
                document.getElementById("startActions").style.display = 'none'
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });

    }
});


document.addEventListener("DOMContentLoaded", function () {
    let spoil = document.getElementById("spoil")
    spoil.style.transform = 'scale(4)'
    spoil.style.opacity = '0'

    setTimeout(function () {
        spoil.style.display = 'none'

    }, 1000)



})

function startGame() {
    clearInterval(activUInt)
    const url = 'http://localhost:3000/startGame';

    // Use the fetch API to make the request
    fetch(url)
        .then(response => {
            // Check if the request was successful (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            // Parse the JSON from the response
            return response.text();
        })
        .then(data => {
            // Handle the data from the response
            console.log(data);
            return;
            fetch('http://localhost:3000/getstartCards')
                .then(response => {
                    // Check if the request was successful (status code 200-299)
                    if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                    }
                    // Parse the JSON from the response
                    return response.json();
                })
                .then(thise => {
                    // Handle the data from the response
                    console.log(thise);
                    myCards = thise
                    if (JSON.stringify(thise) === '[]') {
                        console.warn("out of cards")
                    }
                    document.getElementById('mainDiv').innerHTML = ''
                    thise.forEach(thecard => {
                        createCard(thecard);
                    });
                })
                .catch(error => {
                    // Handle any errors that occurred during the fetch
                    console.error('There was a problem with the fetch operation:', error);
                });
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('There was a problem with the fetch operation:', error);
        });
}



var username = '';

// Prompt user for username on page load
function setUsername() {
    username = prompt('Enter your username:');
    if (username) {
        socket.emit('set username', username);
        sessionStorage.setItem("tempUsername", username)
        showStartAction()
    } else {
        alert('Username is required.');
        setUsername(); // Re-prompt if no username is provided
    }
}

let activUInt;

function showStartAction() {

    document.getElementById("userName").innerText = sessionStorage.getItem("tempUsername")
    document.getElementById("startActions").style.display = ''
    activUInt = setInterval(function () {
        fetch(`http://localhost:3000/`)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Parse the JSON from the response
                return response.json();
            })
            .then(data => {

                const keys = Object.keys(data);
                console.log(data, keys)
                const count = keys.length
                document.getElementById('users').innerHTML = count
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }, 900)

}

if (!sessionStorage.getItem("tempUsername")) {
    setUsername();
} else {
    socket.emit('set username', sessionStorage.getItem("tempUsername"));
    showStartAction()
}
// Initialize username prompt

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');


socket.on('chat message', function (data) {
    alert(`${data.username}: ${data.msg}`);
});

socket.on('user connected', function (username) {
    if (username === sessionStorage.getItem("tempUsername")) {
        return;
    }
    console.warn(`${username} has joined the chat.`);

});

socket.on('user disconnected', function (username) {
    console.warn(`${username} has left the chat.`);
});

socket.on('talkie', function (dataB) {
    //alert(`${dataB}`);
    if (dataB.fromUser === sessionStorage.getItem("tempUsername")) {
        console.log("received call from", dataB.toUser)
        if (JSON.stringify(myCards).includes(dataB.card)) {
            // Call the function with "-j" as the search string
            const removedValue = findAndPopValue(myCards, '-j');

            // Output the results
            console.log('Removed Value:', removedValue);
            console.log('Updated Array:', myCards);
            document.getElementById('mainDiv').innerHTML = ''
            myCards.forEach(thecard => {
                createCard(thecard);
            });
            //myCards.pop[dataB.fullcard]
            const theJson = {
                'username': dataB.toUser,
                'card': dataB.card,
                'fullcard': dataB.fullcard
            }
            console.log("i have this")
            //console.log("i poped", dataB.fullcard)
            socket.emit('giveTo', theJson);
        } else {
            console.log(`i dont have ${dataB.card} in ->${myCards}`)
            const pass = {
                'makeUsername': dataB.toUser,
                'method': 'getFromDeck',
                'fullcard': dataB.fullcard
            }
            socket.emit('getFromDeck', pass);
        }
    } else {
        console.log("not for me", dataB.fromUser)
    }
});

socket.on('getFromDeck', function (dataA) {
    console.warn("You will get from the deck")
    //alert(`${dataB}`);
    if (dataA.makeUsername === sessionStorage.getItem("tempUsername") && dataA.method === 'getFromDeck') {
        fetch(`http://localhost:3000/pickFromDeck?username=${sessionStorage.getItem("tempUsername")}`)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                // Parse the JSON from the response
                return response.json();
            })
            .then(data => {
                if (JSON.stringify(data) === '[]') {
                    console.warn("out of cards")
                    return;
                }
                data.forEach(thecard => {
                    createCard(thecard);
                });
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });
    }
});

socket.on('giveTo', function (dataC) {
    console.log('giveTo', dataC)
    //alert(`${dataB}`);
    if (dataC.username === sessionStorage.getItem("tempUsername")) {
        myCards.push[dataC.fullcard]
        createCard(dataC.fullcard)
    }
});

function findAndPopValue(arr, searchString) {
    // Find the index of the value that contains the searchString
    const index = arr.findIndex(value => value.includes(searchString));

    if (index !== -1) {
        // Get the value that contains the searchString
        const value = arr[index];
        // Remove the value from the array
        arr.splice(index, 1);
        // Return the removed value
        return value;
    }

    // If no value was found, return null
    return null;
}

