var socket = io('http://192.168.1.26:3000');

var pinDelete = new Howl({
    src: ['./sounds/pinDelete.mp3'],
    volume: 0.5
});
var pinEnter = new Howl({
    src: ['./sounds/pinEnter.mp3'],
    volume: 0.5
});

var pinSubmit = new Howl({
    src: ['./sounds/pinSubmit.mp3'],
    volume: 0.5
});

var pinUnexpected = new Howl({
    src: ['./sounds/pinUnexpected.mp3'],
    volume: 1
});

var receiverConfirmation = new Howl({
    src: ['./sounds/receiverConfirmation.mp3'],
    volume: 1
});
var receiverConnect = new Howl({
    src: ['./sounds/receiverConnect.mp3'],
    volume: 1
});

var welcome = new Howl({
    src: ['./sounds/welcome.mp3'],
    volume: 1
});


welcome.play()
$("#lock").fadeIn("slow")
socket.on('action', function (msg) {
    if (msg === "lock") {

    }
});
let pin = "";
let proccessingPIN = false
function clickPIN(element) {
    pinEnter.play()
    let number = element.innerHTML
    //console.log(number)

    if (pin.length <= 3) {
        if (pin.length == 0) {
            document.getElementById("ps1").style.width = "10px"
            document.getElementById("ps1").style.height = "10px"
        } else if (pin.length == 1) {
            document.getElementById("ps2").style.width = "10px"
            document.getElementById("ps2").style.height = "10px"
        } else if (pin.length == 2) {
            document.getElementById("ps3").style.width = "10px"
            document.getElementById("ps3").style.height = "10px"
        } else if (pin.length == 3) {
            document.getElementById("ps4").style.width = "10px"
            document.getElementById("ps4").style.height = "10px"
        }
        //not full
        pin = `${pin}${number}`
        //console.log("Pin Got:", pin)
        if (pin.length == 4) {
            proccessingPIN = true
            $("#PINdots").fadeOut("fast", function () {
                $("#PINload").fadeIn("fast")
            })
            receiverConnect.play()
            setTimeout(function () {
                //console.log(pin, "-->", accpin)
                //socket.emit('chat message', pin);
                fetch(`http://192.168.1.26:3000/auth?isCorrect=${pin}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.text();
                    })
                    .then(data => {
                        proccessingPIN = false
                        if (data === "correct") {
                            receiverConfirmation.play()
                            document.getElementById("iframed").src = "https://evoxs.xyz/evox-epsilon/Home/dist/?code=AQCq"
                            $("#lock").fadeOut("slow")

                            $("#PINload").fadeOut("fast", function () {
                                deletePIN("no")
                                deletePIN("no")
                                deletePIN("no")
                                deletePIN("no")
                                $("#iframed").fadeIn("fast")
                                $("#PINdots").fadeIn("fast")
                            })
                            
                            return;
                            fetch(`https://data.evoxs.xyz/house?username=${localStorage.getItem("t50-username")}&email=${localStorage.getItem("t50-email")}&password=${atob(localStorage.getItem("t50pswd"))}&method=shutdown`)
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    return response.text();
                                })
                                .then(data => {
                                    $("#lock").fadeOut("slow")

                                    $("#PINload").fadeOut("fast", function () {
                                        deletePIN("no")
                                        deletePIN("no")
                                        deletePIN("no")
                                        deletePIN("no")
                                        $("#PINdots").fadeIn("fast")
                                    })
                                }).catch(error => {
                                    console.error('Error:', error);
                                });
                            //alert("Correct")

                        } else {

                            $("#PINload").fadeOut("fast", function () {
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                deletePIN()
                                $("#PINdots").fadeIn("fast", function () {
                                    shake_me("pin-input")

                                })
                            })
                        }

                        // Process the retrieved user data
                        //console.log('User Data:', userData);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

            }, 900)
        }
    }
    // else {    
    // Complete here    
    //    //console.log("Pin Final:", pin)
    //}
}

function deletePIN(no) {
    if (!no) {
        pinDelete.play()
    }
    if (proccessingPIN === true) {
        shake_me("pin-input")
        return;
    }
    if (pin.length == 0) {
        document.getElementById("ps1").style.width = "5px"
        document.getElementById("ps1").style.height = "5px"
    } else if (pin.length == 1) {
        document.getElementById("ps1").style.width = "5px"
        document.getElementById("ps1").style.height = "5px"
    } else if (pin.length == 2) {
        document.getElementById("ps2").style.width = "5px"
        document.getElementById("ps2").style.height = "5px"
    } else if (pin.length == 3) {
        document.getElementById("ps3").style.width = "5px"
        document.getElementById("ps3").style.height = "5px"
    } else if (pin.length == 4) {
        document.getElementById("ps4").style.width = "5px"
        document.getElementById("ps4").style.height = "5px"
    }

    pin = pin.slice(0, -1);
    //console.log("Removed last", pin)
}

function shake_me(what) {
    document.getElementById(`${what}`).classList.add('shake');
    setTimeout(function () {
        document.getElementById(`${what}`).classList.remove('shake');
    }, 500);
}

function removePIN() {
    localStorage.removeItem("T50Pin")
}

function lockNow() {
    sessionStorage.removeItem("remUnlocked")
    window.location.reload()
}