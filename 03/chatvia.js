const today = new Date();
//Last Login Start
const lastlogin = new Date();
const year = lastlogin.getFullYear();
const month = lastlogin.getMonth();
const day = lastlogin.getDate();
const hour = lastlogin.getHours();
const minute = lastlogin.getMinutes();
const second = lastlogin.getSeconds();

console.log(`${day}-${month + 1}-${year} ${hour}:${minute}:${second}`);
//Last Login End
function sendimages() {
	socket.emit('message', {
		user: localStorage.getItem("user") || "Ανωνυμος",
		message: `!image`
	});
	console.log("Images Received")
}
let currentDate = new Date();
let time = currentDate.getHours() + ":" + currentDate.getMinutes()// + ":" + currentDate.getSeconds();
function startTime() {
	var elms = document.querySelectorAll("[id='liveclock']");
	for (var i = 0; i < elms.length; i++)
		elms[i].innerHTML = time
}
setInterval(startTime, 1000);

function smileySelect() {
	/*
	event.target = the actually clicked element
	event.currentTarget = the element that has the event handler
  
	When they are not equal we know the click was on a child of the .emoji element.
	Any child is valid since you only have the emoticon span elements inside the .emoji element.
	*/
	document.getElementById('emoji').value += "😂";
};

if (localStorage.getItem("banned") === "true") {
	document.getElementsByTagName("body")[0].style.display = "none";
	document.getElementById("error").style.display = "block"
	alert("Ο Διακομιστης δεν ειναι σε λειτουργια αυτη τη στιγμη. Παρακαλω Προσπαθηστε Αργοτερα")
}
if (localStorage.getItem("user") === "Villy") {
	document.getElementsByTagName("body")[0].style.display = "none";
	alert("Ο Διακομιστης δεν ειναι σε λειτουργια αυτη τη στιγμη. Παρακαλω Προσπαθηστε Αργοτερα")
}

//CHECK IF DEVICE INFO ARE GIVEN
if (!localStorage.getItem("device_info")) {

}

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType('application/json');
	rawFile.open('GET', file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == '200') {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

var sound = new Howl({
	src: ['https://03.memeguy21.repl.co/Google_Event.mp3'],
	volume: 0.9
});
var message = new Howl({
	src: ['https://03.memeguy21.repl.co/notification.mp3'],
	volume: 2
	//Google_Event.mp3
});
var welcome = new Howl({
	src: ['https://03.memeguy21.repl.co/starting.mp3'],
	volume: 2
	//Google_Event.mp3
});
var webhook = "https://discord.com/api/webhooks/1043238999537483877/MxrPRhDtbBA7ET_dhgccuIuJYRgJD3q_BuSaE0hUDjPUq2FIISDFkvuYsLhiozSLefo8"
var socket = io('https://04.memeguy21.repl.co');
function changeuser() {
	newuser = prompt('Επιλεξτε ενα όνομα χρήστη:');
	if (!newuser) {
		alert('Δεν λειτουργει ετσι! Τωρα θα φαινεστε ως ανωνυμος');
		localStorage.removeItem("user");
	} else {
		localStorage.setItem("user", newuser);
		location.reload()
	}
}
// Get the current username from the cookies
//password = prompt('Εισαγετε τον κωδικο προσβασης:');
//if(password === "1234") {
//	console.log("Authorized!")
//} else {
//	alert("Ο Κωδικος Που Πληκτρολογησατε Ειναι Λαθος!")
//	document.getElementsByTagName("body")[0].style.display = "none";
//	document.getElementById("error").style.display = "block"
//}
var user = localStorage.getItem("user");
if (!user) {
	window.location.href = "./login"
} else {
	//document.getElementById("profileemail").innerHTML = ``
	let apiKey = 'd9e53816d07345139c58d0ea733e3870';
	$.getJSON('https://api.bigdatacloud.net/data/ip-geolocation?key=' + apiKey, function(data) {
		var info = JSON.stringify(data, null, 2);
		var datac = JSON.parse(info)
		document.getElementById("profilelocation").innerHTML = datac.country.isoAlpha2
		document.getElementById("profilelocation2").innerHTML = datac.country.isoAlpha2
	});
	var elms = document.querySelectorAll("[id='pfpprofile']");
	for (var i = 0; i < elms.length; i++)
		elms[i].src = `https://03.memeguy21.repl.co/user-profiles/${localStorage.getItem("user") || 'Ανωνυμος'}.png`

	var elm = document.querySelectorAll("[id='profilename']");
	for (var i = 0; i < elms.length; i++)
		elm[i].innerHTML = `${localStorage.getItem("user") || 'Ανωνυμος'}`

	//νεα συνδεση συνδεδεμενου χρηστη
	if (sessionStorage.getItem("skip") === "true") {
		socket.emit('message', {
			user: "<span style='color: blue'>Αυτοματο Μηνυμα</span>",
			message: `Ο Χρηστης <b style="color:#00a12b">${user}</b> επανασυνδεθηκε με επιτυχια!`
		});
		const request = new XMLHttpRequest();
		request.open("POST", webhook);
		request.setRequestHeader('Content-type', 'application/json');
		const params = {
			username: "Συνδεση!",
			avatar_url: "",
			content: `Ο Χρηστης ${user} Επανασυνδεθηκε Με Επιτυχια!`
		}
		request.send(JSON.stringify(params));
	} else {
		socket.emit('message', {
			user: `Διακομιστης`,
			message: `Ο Χρηστης <b>${localStorage.getItem("user") || 'Ανωνυμος'}</b> συνδεθηκε με επιτυχια!`
		});
		const request = new XMLHttpRequest();
		request.open("POST", webhook);
		request.setRequestHeader('Content-type', 'application/json');
		const params = {
			username: "Συνδεση!",
			avatar_url: "",
			content: `Ο Χρηστης ${user} Συνδεθηκε Με Επιτυχια!`
		}
		request.send(JSON.stringify(params));
		if (user === "Αλεξια" || user === "ΑΛΕΞΙΑ" || user === "Αλεξία") {
			//window.location.href = "https://evoxpreview.memeguy21.repl.co/?autologin=Αλεξια"
			document.getElementById("updatelastmsg").innerHTML = `Καλωσορισατε, ${user}! Τελευταια Συνδεση: ${localStorage.getItem("lastlogin")}`
		}
	}
}


// The user count. Can change when someone joins/leaves
socket.on('count', function(data) {
	$('.user-count').html(data);
});

function msgtimeup() {
	function update() {
		document.getElementById("lastmsgtime").innerHTML = "1 λεπτο πριν"
	}
	setTimeout(update, 60000)
}
// When we receive a message
// it will be like { user: 'username', message: 'text' }
socket.on('message', function(data) {
	var text = data.message
	var included = text.includes('ετοιμασε τραγουδι')
	console.log(included)
	document.getElementById("lastmsgtime").innerHTML = "τωρα"
	msgtimeup()
	if (data.message === "!image") {
		$('.chat').append(`<li>
                                <div class="conversation-list">
                                    <div class="chat-avatar">
                                        <img src="https://03.memeguy21.repl.co/socket-io.png" alt="">
                                    </div>

                                    <div class="user-chat-content">
                                        <div class="ctext-wrap">

                                            <div class="ctext-wrap-content">
                                                <ul class="list-inline message-img  mb-0">
                                                    <li class="list-inline-item message-img-list me-2 ms-0">
                                                        <div>
                                                            <a class="popup-img d-inline-block m-1"
                                                                href="https://03.memeguy21.repl.co/liveimages/1.png" title="Project 1">
                                                                <img src="https://03.memeguy21.repl.co/liveimages/1.png" alt=""
                                                                    class="rounded border">
                                                            </a>
                                                        </div>
                                                        <div class="message-img-link">
                                                            <ul class="list-inline mb-0">
                                                                <li class="list-inline-item">
                                                                    <a download="img-1.jpg"
                                                                        href="https://03.memeguy21.repl.co/liveimages/1.png"
                                                                        class="fw-medium">
                                                                        <i class="ri-download-2-line"></i>
                                                                    </a>
                                                                </li>
                                                                <li class="list-inline-item dropdown">
                                                                    <a class="dropdown-toggle" href="#" role="button"
                                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                                        aria-expanded="false">
                                                                        <i class="ri-more-fill"></i>
                                                                    </a>
                                                                    <div class="dropdown-menu">
                                                                        <a class="dropdown-item" href="#">Αντιγραφη <i
                                                                                class="ri-file-copy-line float-end text-muted"></i></a>
                                                                        <a class="dropdown-item" href="#">Αποθηκευση <i
                                                                                class="ri-save-line float-end text-muted"></i></a>
                                                                        <a class="dropdown-item" href="#">Προωθηση <i
                                                                                class="ri-chat-forward-line float-end text-muted"></i></a>
                                                                        <a class="dropdown-item" href="#">Διαγραφη <i
                                                                                class="ri-delete-bin-line float-end text-muted"></i></a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>

                                                    <li class="list-inline-item message-img-list">
                                                        <div>
                                                            <a class="popup-img d-inline-block m-1"
                                                                href="https://03.memeguy21.repl.co/liveimages/2.png" title="Project 2">
                                                                <img src="https://03.memeguy21.repl.co/liveimages/2.png" alt=""
                                                                    class="rounded border">
                                                            </a>
                                                        </div>
                                                        <div class="message-img-link">
                                                            <ul class="list-inline mb-0">
                                                                <li class="list-inline-item">
                                                                    <a download="img-2.jpg"
                                                                        href="https://03.memeguy21.repl.co/liveimages/2.png"
                                                                        class="fw-medium">
                                                                        <i class="ri-download-2-line"></i>
                                                                    </a>
                                                                </li>
                                                                <li class="list-inline-item dropdown">
                                                                    <a class="dropdown-toggle" href="#" role="button"
                                                                        data-bs-toggle="dropdown" aria-haspopup="true"
                                                                        aria-expanded="false">
                                                                        <i class="ri-more-fill"></i>
                                                                    </a>
                                                                    <div class="dropdown-menu dropdown-menu-end">
                                                                        <a class="dropdown-item" href="#">Αντιγραφη <i
                                                                                class="ri-file-copy-line float-end text-muted"></i></a>
                                                                        <a class="dropdown-item" href="#">Αποθηκευση <i
                                                                                class="ri-save-line float-end text-muted"></i></a>
                                                                        <a class="dropdown-item" href="#">Προωθηση <i
                                                                                class="ri-chat-forward-line float-end text-muted"></i></a>
                                                                        <a class="dropdown-item" href="#">Διαγραφη <i
                                                                                class="ri-delete-bin-line float-end text-muted"></i></a>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
                                                    <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span></p>
                                            </div>

                                            <div class="dropdown align-self-start">
                                                <a class="dropdown-toggle" href="#" role="button"
                                                    data-bs-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                    <i class="ri-more-2-fill"></i>
                                                </a>
                                                <div class="dropdown-menu">
                                                    <a class="dropdown-item" href="#">Αντιγραφη <i
                                                            class="ri-file-copy-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Αποθηκευση <i
                                                            class="ri-save-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Προωθηση <i
                                                            class="ri-chat-forward-line float-end text-muted"></i></a>
                                                    <a class="dropdown-item" href="#">Διαγραφη <i
                                                            class="ri-delete-bin-line float-end text-muted"></i></a>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="conversation-name">Ζητηθηκε Απο Τον/Την ${data.user}</div>
                                    </div>

                                </div>
                            </li>`)
	} else if (data.user === `${localStorage.getItem("user") || 'Ανωνυμος'}`) {
		console.log("The message is sent by me")
		$('.chat').append(`<li class="right">
  <div class="conversation-list">
    <div class="chat-avatar">
      <img src="https://03.memeguy21.repl.co/user-profiles/${user}.png" alt="">
    </div>

    <div class="user-chat-content">
      <div class="ctext-wrap">
        <div class="ctext-wrap-content">
          <p class="mb-0">
            ${data.message}
          </p>
          <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
            <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span>
          </p>
        </div>
        <div class="dropdown align-self-start">
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="ri-more-2-fill"></i>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
          </div>
        </div>
      </div>
      <div class="conversation-name">${data.user}</div>
    </div>
  </div>
</li>`)
		document.getElementById("updatelastmsg").innerHTML = `${data.message}`
	} else {
		console.log("no, " + data.message)
		if (data.user === "Διακομιστης") {
			console.log(true)
			$('.chat').append(`<li class="left">
  <div class="conversation-list">
    <div class="chat-avatar">
      <img src="https://03.memeguy21.repl.co/socket-io.png" alt="">
    </div>

    <div class="user-chat-content">
      <div class="ctext-wrap">
        <div class="ctext-wrap-content">
          <p class="mb-0">
            ${data.message}
          </p>
          <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
            <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span>
          </p>
        </div>
        <div class="dropdown align-self-start">
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="ri-more-2-fill"></i>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
          </div>
        </div>
      </div>
      <div class="conversation-name">${data.user}</div>
    </div>
  </div>
</li>`)
			document.getElementById("updatelastmsg").innerHTML = `${data.message}`
			//play
		} else {
			message.play()
			//$('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
			$('.chat').append(`<li class="left">
  <div class="conversation-list">
    <div class="chat-avatar">
      <img src="https://03.memeguy21.repl.co/socket-io.png" alt="">
    </div>

    <div class="user-chat-content">
      <div class="ctext-wrap">
        <div class="ctext-wrap-content">
          <p class="mb-0">
            ${data.message}
          </p>
          <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
            <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span>
          </p>
        </div>
        <div class="dropdown align-self-start">
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="ri-more-2-fill"></i>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
          </div>
        </div>
      </div>
      <div class="conversation-name">${data.user}</div>
    </div>
  </div>
</li>`)
			document.getElementById("updatelastmsg").innerHTML = `${data.message}`
		}
	}

});

socket.on('disconnect', () => {
	socket.emit('message', {
		user: "Διακομιστης #01506",
		message: `Ο Χρηστης ${user} αποσυνδεθηκε`
	});
})

// When the form is submitted
$('form').submit(function(e) {
	//FIX MSGS POSITION
	// Avoid submitting it through HTTP
	e.preventDefault();

	// Retrieve the message from the user
	var message = $(e.target).find('input').val();

	// Send the message to the server
	if (message === "") {
		console.log("false info given")
		$('.chat').append(`<li class="left">
  <div class="conversation-list">
    <div class="chat-avatar">
      <img src="https://03.memeguy21.repl.co/socket-io.png" alt="">
    </div>

    <div class="user-chat-content">
      <div class="ctext-wrap">
        <div class="ctext-wrap-content">
          <p class="mb-0">
            ${localStorage.getItem("user") || 'Ανωνυμος'}, παρακαλω πληκτρολογηστε ενα μηνυμα!
          </p>
          <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
            <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span>
          </p>
        </div>
        <div class="dropdown align-self-start">
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="ri-more-2-fill"></i>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
          </div>
        </div>
      </div>
      <div class="conversation-name">Διακομιστης</div>
    </div>
  </div>
</li>`)
	} else {
		socket.emit('message', {
			user: `${localStorage.getItem("user") || 'Ανωνυμος'}`,
			message: `${message}`
		});
	}

	// Clear the input and focus it for a new message
	e.target.reset();
	const request = new XMLHttpRequest();
	request.open("POST", webhook);
	request.setRequestHeader('Content-type', 'application/json');
	const params = {
		username: "Message",
		avatar_url: "",
		content: `${user}: ${message}`
	}
	request.send(JSON.stringify(params));
	$(e.target).find('input').focus();

});

function reload() {
	sessionStorage.setItem("skip", true)
	location.reload()
}

var calling = new Howl({
	src: ['https://03.memeguy21.repl.co/calling.mp3'],
	volume: 0.9
});

function startcall() {
	calling.play()
	document.getElementById("callstatus").innerHTML = "Γινεται Κληση."
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Γινεται Κληση.."
	}, 400);
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Γινεται Κληση..."
	}, 800);
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Γινεται Κληση."
	}, 2170);
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Γινεται Κληση."
	}, 2570);
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Γινεται Κληση.."
	}, 2970);
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Γινεται Κληση..."
	}, 3370);
	setTimeout(function() {
		window.location.href = "https://video.twentyonecore.com/"
	}, 10000);

}

function stopcall() {
	var element = document.querySelector("#body");

	// make the element go to full-screen mode
	element.requestFullscreen()
		.then(function() {
			console.log("Success")
			// element has entered fullscreen mode successfully
		})
		.catch(function(error) {
			console.log("Error")
			// element could not enter fullscreen mode
		});
	calling.stop()
	document.getElementById("callstatus").innerHTML = "Ακυρωση.."
	setTimeout(function() {
		document.getElementById("callstatus").innerHTML = "Ξεκινηστε Ηχητικη Κληση"
	}, 1500);
}

$('#songrequest').bind('keyup', function(e) {
	var element = document.getElementById("songrequest")
	if (e.keyCode === 13) { // 13 is the enter key


		console.log("Sending Songs")


		$('.chat').append(`<li class="left">
  <div class="conversation-list">
    <div class="chat-avatar">
      <img src="https://03.memeguy21.repl.co/socket-io.png" alt="">
    </div>

    <div class="user-chat-content">
      <div class="ctext-wrap">
        <div class="ctext-wrap-content">
          <p class="mb-0">
            <strong>Τελεια!</strong> Τo Τραγουδι <span style="color: lime">${element.value}</span> σταλθηκε στον διακομιστη και θα ειναι ετοιμο για ληψη σε 6-24ωρες!
          </p>
          <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
            <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span>
          </p>
        </div>
        <div class="dropdown align-self-start">
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="ri-more-2-fill"></i>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
          </div>
        </div>
      </div>
      <div class="conversation-name">Διακομιστης</div>
    </div>
  </div>
</li>`)
		document.getElementById("updatelastmsg").innerHTML = `<strong>Τελεια!</strong> Τo Τραγουδι <span style="color: lime">${element.value}</span> σταλθηκε στον διακομιστη και θα ειναι ετοιμο για ληψη σε 6-24ωρες!`
		const request = new XMLHttpRequest();
		request.open("POST", webhook);
		request.setRequestHeader('Content-type', 'application/json');
		const params = {
			username: "Song Request",
			avatar_url: "",
			content: `**${localStorage.getItem("user")}** Requested A Song With The Name: *${element.value}*`
		}
		request.send(JSON.stringify(params));
		localStorage.setItem(element.value, "Song")

		console.log(element.value)

	}

});

function getsongs() {
	//Download Songs That Are Ready

	readTextFile("https://03.memeguy21.repl.co/ready.json", function(text) {
		var ready = JSON.parse(text)
		console.log(ready)
		$('.chat').append(`<li class="left">
  <div class="conversation-list">
    <div class="chat-avatar">
      <img src="https://03.memeguy21.repl.co/socket-io.png" alt="">
    </div>

    <div class="user-chat-content">
      <div class="ctext-wrap">
        <div class="ctext-wrap-content">
          <p class="mb-0">
            <strong>Εδω ειναι ολα τα ετοιμα τραγουδια για ληψη:</strong><br>
						&nbsp;&nbsp;${ready.s1.name}, <a style="color: cyan" href="${ready.s1.url}" download>Ληψη</a><br>
						&nbsp;&nbsp;${ready.s2.name}, <a style="color: cyan" href="${ready.s2.url}" download>Ληψη</a><br>
						&nbsp;&nbsp;${ready.s3.name}, <a style="color: cyan" href="${ready.s3.url}" download>Ληψη</a><br>
						&nbsp;&nbsp;${ready.s4.name}, <a style="color: cyan" href="${ready.s4.url}" download>Ληψη</a>
          </p> 
          <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
            <span class="align-middle">${today.getHours() + ":" + today.getMinutes()}</span>
          </p>
        </div>
        <div class="dropdown align-self-start">
          <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
            aria-expanded="false">
            <i class="ri-more-2-fill"></i>
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a>
            <a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a>
          </div>
        </div>
      </div>
      <div class="conversation-name">Διακομιστης</div>
    </div>
  </div>
</li>`)
		document.getElementById("updatelastmsg").innerHTML = `<strong>Εδω ειναι ολα τα ετοιμα τραγουδια για ληψη:</strong>`
	})
}

localStorage.setItem("lastlogin", `${day}/${month + 1}/${year} ${hour}:${minute}`)