'use strict';
var room = "audio-call"
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

var isChannelReady = false;
var isInitiator = false;
var isStarted = false;
var localStream;
var pc;
var remoteStream;
var turnReady;

var pcConfig = turnConfig;
var localStreamConstraints = {
  audio: true,
  video: false
};


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
var call = io.connect("https://videoChat-WebFrontend.memeguy21.repl.co");

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
    document.getElementById("callstatus").innerHTML = "Γινεται Συνδεση.."
    isChannelReady = true;
  });
  
  call.on('joined', function (room) {
    console.log('joined: ' + room);
    isChannelReady = true;
  });

  call.on('log', function (array) {
    console.log.apply(console, array);
  });

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

  });

  function sendMessage(message, room) {
    console.log('Client sending message: ', message, room);
    call.emit('message', message, room);
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
    setTimeout(function() {
      connecting.stop()
    },650)
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
    catch(err) {
      window.location.href = "index.html"
    }
  }

  function handleRemoteHangup() {
    console.log('Session terminated.');
    document.getElementById("indicator").innerHTML = "Η Συνδεση εκλεισε"
    connection_closed.play()
    setTimeout(function() {
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

function startcall_embed() {
    call.emit('create or join', "audio-call"); //ATTEMP CREATING-CONNECTING TO ROOM audio-call
    console.log('Attempted to create or  join room', "audio-call");
}
