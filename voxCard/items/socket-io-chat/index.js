// index.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');  // Import the CORS middleware
const _ = require('lodash');
const path = require('path');

const { spawn } = require('child_process');

function restart() {
  cards = [
    "clubs-2",
    "clubs-3",
    "clubs-4",
    "clubs-5",
    "clubs-6",
    "clubs-7",
    "clubs-8",
    "clubs-9",
    "clubs-a",
    "clubs-j",
    "clubs-k",
    "clubs-q",
    "diamonds-2",
    "diamonds-3",
    "diamonds-4",
    "diamonds-5",
    "diamonds-6",
    "diamonds-7",
    "diamonds-8",
    "diamonds-9",
    "diamonds-a",
    "diamonds-j",
    "diamonds-k",
    "diamonds-q",
    "hearts-2",
    "hearts-3",
    "hearts-4",
    "hearts-5",
    "hearts-6",
    "hearts-7",
    "hearts-8",
    "hearts-9",
    "hearts-a",
    "hearts-j",
    "hearts-k",
    "hearts-q",
    "spades-2",
    "spades-3",
    "spades-4",
    "spades-5",
    "spades-6",
    "spades-7",
    "spades-8",
    "spades-9",
    "spades-a",
    "spades-j",
    "spades-k",
    "spades-q"
  ]
}

function pickAndRemoveRandomCards(howMny) {
  deck = cards
  // Clone the deck to avoid mutating the original array during shuffling
  const deckCopy = [...deck];

  // Shuffle the deck copy
  const shuffledDeck = shuffle(deckCopy);

  // Array to store the picked cards
  const pickedCards = [];

  // Pick and remove 4 cards
  for (let i = 0; i < howMny; i++) {
    const card = shuffledDeck.pop();
    if (card) {
      pickedCards.push(card);
      // Remove the card from the original deck
      const index = deck.indexOf(card);
      if (index > -1) {
        deck.splice(index, 1);
      }
    }
  }

  return pickedCards;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let cards = [
  "clubs-2",
  "clubs-3",
  "clubs-4",
  "clubs-5",
  "clubs-6",
  "clubs-7",
  "clubs-8",
  "clubs-9",
  "clubs-a",
  "clubs-j",
  "clubs-k",
  "clubs-q",
  "diamonds-2",
  "diamonds-3",
  "diamonds-4",
  "diamonds-5",
  "diamonds-6",
  "diamonds-7",
  "diamonds-8",
  "diamonds-9",
  "diamonds-a",
  "diamonds-j",
  "diamonds-k",
  "diamonds-q",
  "hearts-2",
  "hearts-3",
  "hearts-4",
  "hearts-5",
  "hearts-6",
  "hearts-7",
  "hearts-8",
  "hearts-9",
  "hearts-a",
  "hearts-j",
  "hearts-k",
  "hearts-q",
  "spades-2",
  "spades-3",
  "spades-4",
  "spades-5",
  "spades-6",
  "spades-7",
  "spades-8",
  "spades-9",
  "spades-a",
  "spades-j",
  "spades-k",
  "spades-q"
]

const originalCarde = [
  "clubs-2",
  "clubs-3",
  "clubs-4",
  "clubs-5",
  "clubs-6",
  "clubs-7",
  "clubs-8",
  "clubs-9",
  "clubs-a",
  "clubs-j",
  "clubs-k",
  "clubs-q",
  "diamonds-2",
  "diamonds-3",
  "diamonds-4",
  "diamonds-5",
  "diamonds-6",
  "diamonds-7",
  "diamonds-8",
  "diamonds-9",
  "diamonds-a",
  "diamonds-j",
  "diamonds-k",
  "diamonds-q",
  "hearts-2",
  "hearts-3",
  "hearts-4",
  "hearts-5",
  "hearts-6",
  "hearts-7",
  "hearts-8",
  "hearts-9",
  "hearts-a",
  "hearts-j",
  "hearts-k",
  "hearts-q",
  "spades-2",
  "spades-3",
  "spades-4",
  "spades-5",
  "spades-6",
  "spades-7",
  "spades-8",
  "spades-9",
  "spades-a",
  "spades-j",
  "spades-k",
  "spades-q"
]

let users = {};

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080", // Update with the client's origin
    methods: ["GET", "POST"]
  }
});

// Enable CORS for Express
app.use(cors());

let userCards = []

let testCards = {
  'theusername': {
    'cards': ['21', '12']
  }
}

// Function to reverse keys and values in an object
function reverseObject(obj) {
  const reversed = {};
  for (const [key, value] of Object.entries(obj)) {
    reversed[value] = key;
  }
  return reversed;
}



app.get('/', (req, res) => {

  // Example usage
  const originalObject = users

  const reversedObject = reverseObject(originalObject);
  //console.log(reversedObject);
  res.end(JSON.stringify(reversedObject))
});

app.get('/endGame', (req, res) => {
  res.end("Ok")
  io.emit('status', 'ended');
  restart()

});

app.get('/startGame', (req, res) => {
  //console.log(`Cards now: ${cards}\n\n WILL BECOME ${originalCarde}\n\n\n`)
  //cards = originalCarde
  console.log(`NEW Cards now: ${cards}`)
  console.log("Cards reset")
  io.emit('status', 'started');
  res.end("Ok")
});
app.get('/getstartCards', (req, res) => {
  const username = req.query.username; // Access the query parameter
  const pickedCards = pickAndRemoveRandomCards(4);
  
  res.end(JSON.stringify(pickedCards))
  console.log("Sent:", pickedCards)
  console.log("Current json:", cards)
  
  const specific = {
    username: username,
    cards: pickedCards
  }
  userCards.push(specific)
  console.log("new", userCards)
  cards = cards
});

app.get('/pickFromDeck', (req, res) => {
  const username = req.query.username; // Access the query parameter
  const pickedCards = pickAndRemoveRandomCards(1);
  
  res.end(JSON.stringify(pickedCards))
  console.log("Sent:", pickedCards)
  console.log("Current json:", cards)
  
  const specific = {
    username: username,
    cards: pickedCards
  }
  userCards.push(specific)
  console.log("new", userCards)
  cards = cards
});

app.get('/alpha', (req, res) => {
  res.end(JSON.stringify(cards))
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  // Event to handle username assignment
  socket.on('set username', (username) => {
    users[socket.id] = username;
    io.emit('user connected', username); // Notify all clients
  });

  socket.on('giveTo', (app) => {
    io.emit('giveTo', app); // Notify all clients
  });

  socket.on('send', (app) => {
    console.log(app)
    const contactJson = {
      'fromUser': app.fromUser,
      'card': app.card,
      'receiving': app.toUser
    }
    io.emit('talkie', app);
    //io.emit('user connected', username); // Notify all clients
  });

  socket.on('getFromDeck', (app) => {
    console.log(app)
    io.emit('getFromDeck', app);
    //io.emit('user connected', username); // Notify all clients
  });

  // Handle incoming chat messages
  socket.on('chat message', (msg) => {
    const username = users[socket.id] || 'Anonymous';
    io.emit('chat message', { username, msg });
  });
  

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    const username = users[socket.id];
    if (username) {
      io.emit('user disconnected', username); // Notify all clients
      delete users[socket.id];
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});