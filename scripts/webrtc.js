'use strict';

//Defining some global utility variables
var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var turnReady;

var connecting = new Howl({
  src: ['./internal/connecting.mp3'],
  volume: 0.6,
  loop: true
});
var connection_closed = new Howl({
  src: ['./internal/connection_closed.mp3'],
  volume: 0.6
});
var connected_to_existing = new Howl({
  src: ['./internal/connected_to_existing.mp3'],
  volume: 0.6
});

//Initialize turn/stun server here
var pcConfig = turnConfig;

var localStreamConstraints = {
  audio: true,
  video: true
};


//Not prompting for room name
//var room = 'foo';

const queryString = window.location.search;
// Create a URLSearchParams object from the query string
const urlParams = new URLSearchParams(queryString);
// Get the value of the 'value' parameter from the URL
const connc = urlParams.get('friend');

// Prompting for room name:
if (connc) {
  var room = `${localStorage.getItem("t50-username")}-->${connc}`
} else {
  alert("Something went wrong! Please go back and retry")
  window.location.reload()
}

//Initializing call.io
var call = io.connect("http://192.168.1.21:8000");

if (room !== '') {
  call.emit('create or join', room);
  console.log('Attempted to create or join room', room);
  var storedValue = room

  // Value to compare
  var comparisonValue = localStorage.getItem('t50-username');

  // Check if the stored value contains the comparison value
  if (storedValue && storedValue.includes(comparisonValue)) {
    // Extract the part after "-->"
    var newValue = storedValue.split('-->')[1];

    // Check if newValue is not undefined before attempting to trim
    if (newValue !== undefined) {
      // Trim any leading or trailing spaces
      newValue = newValue.trim();

      // Update the value in localStorage
      console.log(newValue)//Will connect to
    }
  }
  sessionStorage.setItem("EvoxToConnect", newValue)
}

//Defining call connections for signalling
call.on('created', function (room) {
  console.log('Created room ' + room);
  isInitiator = true;
});

call.on('full', function (room) {
  console.log('Room ' + room + ' is full');
});

call.on('join', function (room) {
  console.log('Another peer made a request to join room ' + room);
  console.log('This peer is the initiator of room ' + room + '!');
  connecting.play()
  document.getElementById("indicator").innerHTML = "Γινεται Συνδεση.."
  isChannelReady = true;
});

call.on('joined', function (room) {
  console.log('joined: ' + room);
  isChannelReady = true;
});

call.on('log', function (array) {
  console.log.apply(console, array);
});


//Driver code
call.on('message', function (message, room) {
  console.log('Client received message:', message, room);
  if (message === 'got user media') {
    maybeStart();
  } else if (message.type === 'offer') {
    if (!isInitiator && !isStarted) {
      maybeStart();
    }
    pc.setRemoteDescription(new RTCSessionDescription(message));
    doAnswer();
  } else if (message.type === 'answer' && isStarted) {
    pc.setRemoteDescription(new RTCSessionDescription(message));
  } else if (message.type === 'candidate' && isStarted) {
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    pc.addIceCandidate(candidate);
  } else if (message === 'bye' && isStarted) {
    handleRemoteHangup();
  }
});



//Function to send message in a room
function sendMessage(message, room) {
  console.log('Client sending message: ', message, room);
  call.emit('message', message, room);
}



//Displaying Local Stream and Remote Stream on webpage
var localVideo = document.querySelector('#localVideo');
var remoteVideo = document.querySelector('#remoteVideo');
console.log("Going to find Local media");
navigator.mediaDevices.getUserMedia(localStreamConstraints)
  .then(gotStream)
  .catch(function (e) {
    alert('getUserMedia() error: ' + e.name);
  });

//If found local stream
function gotStream(stream) {
  console.log('Adding local stream.');
  localStream = stream;
  localVideo.srcObject = stream;
  sendMessage('got user media', room);
  if (isInitiator) {
    maybeStart();
  }
}


console.log('Getting user media with constraints', localStreamConstraints);

//If initiator, create the peer connection
function maybeStart() {
  console.log('>>>>>>> maybeStart() ', isStarted, localStream, isChannelReady);
  if (!isStarted && typeof localStream !== 'undefined' && isChannelReady) {
    console.log('>>>>>> creating peer connection');
    document.getElementById("indicator").innerHTML = "Καποιος Προσπαθει Να Συνδεθει!"
    createPeerConnection();
    pc.addStream(localStream);
    isStarted = true;
    console.log('isInitiator', isInitiator);
    if (isInitiator) {
      doCall();
    }
  }
}

//Sending bye if user closes the window
window.onbeforeunload = function () {
  sendMessage('bye', room);
};


//Creating peer connection
function createPeerConnection() {
  try {
    pc = new RTCPeerConnection(pcConfig);
    pc.onicecandidate = handleIceCandidate;
    pc.onaddstream = handleRemoteStreamAdded;
    pc.onremovestream = handleRemoteStreamRemoved;
    console.log('Created RTCPeerConnnection');
    //connecting.stop()
  } catch (e) {
    console.log('Failed to create PeerConnection, exception: ' + e.message);
    alert('Cannot create RTCPeerConnection object.');
    connecting.stop()
    return;
  }
}

//Function to handle Ice candidates
function handleIceCandidate(event) {
  console.log('icecandidate event: ', event);
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    }, room);
  } else {
    console.log('End of candidates.');
  }
}

function handleCreateOfferError(event) {
  console.log('createOffer() error: ', event);
}

function doCall() {
  console.log('Sending offer to peer');
  setTimeout(function () {
    connecting.stop()
  }, 650)
  document.getElementById("indicator").innerHTML = "Ειστε Συνδεδεμενοι!"
  
  pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
}

function doAnswer() {
  console.log('Sending answer to peer.');
  connected_to_existing.play()
  pc.createAnswer().then(
    setLocalAndSendMessage,
    onCreateSessionDescriptionError
  );
}

function setLocalAndSendMessage(sessionDescription) {
  pc.setLocalDescription(sessionDescription);
  console.log('setLocalAndSendMessage sending message', sessionDescription);
  sendMessage(sessionDescription, room);
}

function onCreateSessionDescriptionError(error) {
  trace('Failed to create session description: ' + error.toString());
}


function handleRemoteStreamAdded(event) {
  console.log('Remote stream added.');
  document.getElementById("indicator").innerHTML = "Ειστε συνδεδεμενοι"
  document.getElementById("indicator").innerHTML = sessionStorage.getItem("EvoxToConnect")

  remoteStream = event.stream;
  remoteVideo.srcObject = remoteStream;
}

function handleRemoteStreamRemoved(event) {
  console.log('Remote stream removed. Event: ', event);
}

function hangup() {
  try {
    console.log('Hanging up.');
    stop();
    window.location.href = "index.html"
  }
  catch (err) {
    window.location.href = "index.html"
  }
}

function handleRemoteHangup() {
  console.log('Session terminated.');
  document.getElementById("indicator").innerHTML = "Η Συνδεση εκλεισε"
  connection_closed.play()
  setTimeout(function () {
    window.location.href = "index.html"
  }, 5000)
  stop();
  isInitiator = false;
}

function stop() {
  isStarted = false;
  pc.close();
  pc = null;
}


function pageReady(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else document.addEventListener("DOMContentLoaded", callback);
}

const Call = {
  init: () => {
    Call.Ui();
  },

  Ui: () => {
    const buttonList = document.querySelectorAll(
    ".ui-container .navigation-controls-container button");

    if (buttonList.length) {
      buttonList.forEach(button => {
        button.onclick = () => {
          button.classList.toggle("active");
          if (button.classList.contains("switch")) {
            button.querySelector(".icon").classList.toggle("active");
          }
          if (button.classList.contains("button-cam-element")) {
            const camElement = document.querySelector(".cam-container");
            Call.playPause(camElement.querySelector("video"));
            camElement.classList.toggle("disabled");
          }
        };
      });
    }
  },

  playPause: video => {
    if (video.paused) video.play();else
    video.pause();
  } };


pageReady(() => {
  Call.init();
});

const Config = {
  hasClass: (element, property) => element.classList.contains(property),
  findElement: (element, parentClass) => {
    const parent = element.parentElement;
    if (!Config.hasClass(parent, parentClass)) {
      return Config.findElement(parent, parentClass);
    }
    return parent;
  } };

function stopcam() {
  localStreamConstraints.video = false
}

function toggleCam() {
  const videoTracks = localStream.getVideoTracks();
  if (videoTracks.length === 0) {
    console.log('No video tracks found');
    return;
  }

  const isEnabled = videoTracks[0].enabled;
  videoTracks.forEach(track => {
    track.enabled = !isEnabled;
  });

  if (isEnabled) {
    console.log('Video tracks disabled');
  } else {
    console.log('Video tracks enabled');
  }
}

function isPitchBlack(imageData) {
  const threshold = 20; // Adjust this threshold as needed

  // Iterate through the pixel data and check if all RGB values are below the threshold
  for (let i = 0; i < imageData.data.length; i += 4) {
    const red = imageData.data[i];
    const green = imageData.data[i + 1];
    const blue = imageData.data[i + 2];

    // Check if any of the RGB values exceed the threshold
    if (red > threshold || green > threshold || blue > threshold) {
      return false; // Not pitch black
    }
  }

  return true; // All RGB values are below the threshold, indicating a pitch-black image
}

function checkPitchBlack() {
  const remoteVideo = document.getElementById('remoteVideo');
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  remoteVideo.addEventListener('loadedmetadata', () => {
    canvas.width = remoteVideo.videoWidth;
    canvas.height = remoteVideo.videoHeight;

    // Draw the current frame of the remote video onto the canvas
    ctx.drawImage(remoteVideo, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Check if the image is pitch black
    const result = isPitchBlack(imageData);

    if (result) {
      console.log('The remote video is displaying a pitch-black image.');
    } else {
      console.log('The remote video is not displaying a pitch-black image.');
    }
  });
}