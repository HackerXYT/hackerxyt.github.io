var notyf = new Notyf({
  duration: 1000,
  position: {
    y: 'top',
  },
  types: [
    {
      type: 'info',
      background: 'blue',
      icon: false
    }
  ]
});
sessionStorage.removeItem("input-text-chat-2")
sessionStorage.removeItem("input-text")
if(localStorage.getItem("auto_connect_database") == "true") {
    loadserver()
}

function t50_on_off() {
  if(localStorage.getItem("T50") === "enabled") {
    localStorage.removeItem("T50")
    window.location.reload()
  } else {
    localStorage.setItem("T50", "enabled")
    window.location.reload()
  }
}

if(localStorage.getItem("T50") === "enabled") {
  //CHANGE ALL ICONS
  
  document.getElementById("smart-icon-t50").src = "./t50/logo.png"
  document.getElementById("user-image").src = "./t50/socket-io.png"
  document.getElementById("user-info-image").src = "./t50/socket-io.png"
  document.getElementById("update_pfp_after_change").src = "./t50/socket-io.png"
  document.getElementById("pfp_video").src = "./t50/socket-io.png"

  var elements = document.querySelectorAll('#smart-icon-t50-pfp');
    elements.forEach(function(element) {
      element.src = './t50/socket-io.png';
    });

  document.querySelectorAll('#smart_t50_name').forEach(function(element) {
    element.innerHTML = 'T50';
  });
  document.querySelectorAll('#user-name').forEach(function(element) {
    element.innerHTML = 'T50';
  });
  document.querySelectorAll('#user-info-name').forEach(function(element) {
    element.innerHTML = 'T50';
  });
  document.querySelectorAll('#profilename1').forEach(function(element) {
    element.innerHTML = 'T50';
  });
  document.querySelectorAll('#video_call_name').forEach(function(element) {
    element.innerHTML = 'T50';
  });
  document.getElementById("smart_t50_letter").innerHTML = "T"
  document.getElementById("user-info-text").innerHTML = "Anonymous Server With Message Encryption Enabled (End To End)"
  document.getElementById("t50_toggle").style.display = "block"

}

if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //Client On Mobile
    //window.addEventListener("load", (event) => {
    //    $("#loaderframe").fadeOut("fast");
    //    $("#chatvia_full").fadeIn("slow");
    //})
    function addBottomSpace() {
        const body = document.body;
        const bottomSpace = window.innerHeight - document.documentElement.clientHeight;
        body.style.marginBottom = bottomSpace + 'px';
      }
      
      window.addEventListener('resize', addBottomSpace);

    console.log("Client On Mobile")
    // Get all elements with the class "btn btn-link text-decoration-none text-muted font-size-18 py-0"
var elements = document.querySelectorAll('.btn.btn-link.text-decoration-none.text-muted.font-size-18.py-0');

// Loop through the elements and set their display property to none
for(var i = 0; i < elements.length; i++) {
  elements[i].style.display = 'none';
}
    document.getElementById("music_hide_mobile").style.display = "none"
    document.getElementById("check_email").style.display = "none"
    document.getElementById("profile_photo_edit").style.display = "none"
    document.getElementById("pfp_change_mobile").innerHTML = `
    <label for="imageFileInputPfp" class="btn btn-light bg-light avatar-xs p-0 rounded-circle profile-photo-edit"><i class="ri-pencil-fill"></i>
                        </label>
                        <input type="file" id="imageFileInputPfp" onchange="changepfp()" style="display:none;" multiple accept="image/*">
                        `


} else{
    setTimeout( function () {
        //document.getElementById("emoji").click()
        //document.getElementById("emoji").focus();
    }, 5000)
} 
document.getElementById("pfp_download").href = `https://03.memeguy21.repl.co/user-profiles/${user}.png`
document.getElementById("profile_pfp_download").src = `https://03.memeguy21.repl.co/user-profiles/${user}.png`
sessionStorage.setItem("music", "inactive")
sessionStorage.removeItem("playing")

window.addEventListener('offline', function() {
    // Handle the event when the client disconnects from the internet
    console.log('Client disconnected from the internet');
    if(localStorage.getItem("bypass") == "offline") {
      return;
    }
    $("#loaderframe").fadeIn("fast");
    $("#chatvia_full").fadeOut("slow");
    sessionStorage.setItem("stage", 5)
  });

window.addEventListener('online', function() {
    if(sessionStorage.getItem("stage") == 5||sessionStorage.getItem("stage") == 4) {
        sessionStorage.setItem("stage_srv", 200)
        window.location.reload()
        //$("#loaderframe").fadeOut("fast");
        //$("#chatvia_full").fadeIn("slow");
        socket.connect()
    }
    
  });

if(localStorage.getItem("bypass") == "offline") {
setInterval( function() {
// Get all the elements with src="./t50/socket-io.png"
var elements = document.querySelectorAll('img[src="./t50/socket-io.png"]');

// Loop through all the elements and change the src attribute
for (var i = 0; i < elements.length; i++) {
  elements[i].src = "images/socket-offline.png";
}
}, 500)
}
window.addEventListener("load", (event) => {
    if (!user) {
        window.location.href = "./Login"
        return;
    }
    if(localStorage.getItem("bypass") == "offline") {
      sessionStorage.setItem("stage_srv", 200)
      sessionStorage.setItem("stage_window", 200)
    }
    sessionStorage.setItem("stage_window", 200)
    loader = setInterval(() => {
      if(sessionStorage.getItem("access") === "none") {
        
        return;
      } else if(sessionStorage.getItem("access") === "stop") {
        console.log("Must Change Windows!")
        return;
      }
        if(sessionStorage.getItem("stage_srv") == 200 && sessionStorage.getItem("stage_window") == 200) {
            $("#loaderframe").fadeOut("fast");
            $("#chatvia_full").fadeIn("slow");
            clearInterval(loader)
            sessionStorage.removeItem("stage")
            sessionStorage.removeItem("stage_srv")
            sessionStorage.removeItem("stage_window")
            sessionStorage.removeItem("stage", 5)
        }
        if(sessionStorage.getItem("stage") == 3) {
            $("#loaderframe").fadeOut("fast");
            $("#chatvia_full").fadeIn("slow");
            clearInterval(loader)
            sessionStorage.removeItem("stage")
            console.log("Loaded")
        }
    }, 20)
    //setTimeout( function () {
    //    sessionStorage.setItem("stage", 2)
    //}, 90)
    document.getElementById("loaderframe").src = "./loader-new/index.html?stage=1"
    //console.log("loaded")
    if(localStorage.getItem("private_chats") === "off") {
        document.getElementById("changechat1").style.display = "none"
    }
});
readTextFile("https://03.memeguy21.repl.co/saved_messages.json", function(saved) {
    var data = JSON.parse(saved)
    if(data.user_id == user) {
      if(data.slot1.user != "κενο" && data.slot1.message != "κενο" && data.slot1.time_sent != "κενο") {
        console.log("Νεα αποθηκευμενα μηνυματα βρεθηκαν στην θεση 1")
        $('#secondchat').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="https://03.memeguy21.repl.co/user-profiles/${data.slot1.user}.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">${data.slot1.message}</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${data.slot1.time_sent}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">${data.slot1.user}</div></div></div></li>`)
        if(document.getElementById("new_message_count_2").innerHTML === "ΝΕΟ") {
            console.log("Αλλη λειτουργια εθεσε το στοιχειο ως ΝΕΟ, αλλαγη..")
            document.getElementById("new_message_count_2").innerHTML === "1"
        } else {
            var new_count = Number(document.getElementById("new_message_count_2").innerHTML) + Number(1)
            console.log(new_count)
            $("#new_message_count_2").html(new_count)
        }
        document.getElementById("new_message_badge_2").style.display = "block"
        $('#updatelastmsg2').html(`${data.slot1.user}: ${data.slot1.message}`);
      }
      if(data.slot2.user != "κενο" && data.slot2.message != "κενο" && data.slot1.time_sent != "κενο") {
        console.log("Νεα αποθηκευμενα μηνυματα βρεθηκαν στην θεση 2")
        $('#secondchat').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="https://03.memeguy21.repl.co/user-profiles/${data.slot2.user}.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">${data.slot2.message}</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${data.slot2.time_sent}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">${data.slot2.user}</div></div></div></li>`)
        $('#updatelastmsg2').html(`${data.slot2.user}: ${data.slot2.message}`);
        if(document.getElementById("new_message_count_2").innerHTML === "ΝΕΟ") {
            console.log("Αλλη λειτουργια εθεσε το στοιχειο ως ΝΕΟ, αλλαγη..")
            document.getElementById("new_message_count_2").innerHTML === "1"
        } else {
            var new_count = Number(document.getElementById("new_message_count_2").innerHTML) + Number(1)
            console.log(new_count)
            $("#new_message_count_2").html(new_count)
        }
        document.getElementById("new_message_badge_2").style.display = "block"
      }
      if(data.slot3.user != "κενο" && data.slot3.message != "κενο" && data.slot1.time_sent != "κενο") {
        console.log("Νεα αποθηκευμενα μηνυματα βρεθηκαν στην θεση 3")
        $('#secondchat').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="https://03.memeguy21.repl.co/user-profiles/${data.slot3.user}.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">${data.slot3.message}</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${data.slot3.time_sent}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">${data.slot3.user}</div></div></div></li>`)
        $('#updatelastmsg2').html(`${data.slot3.user}: ${data.slot3.message}`);
        if(document.getElementById("new_message_count_2").innerHTML === "ΝΕΟ") {
            console.log("Αλλη λειτουργια εθεσε το στοιχειο ως ΝΕΟ, αλλαγη..")
            document.getElementById("new_message_count_2").innerHTML === "1"
        } else {
            var new_count = Number(document.getElementById("new_message_count_2").innerHTML) + Number(1)
            console.log(new_count)
            $("#new_message_count_2").html(new_count)
        }
        document.getElementById("new_message_badge_2").style.display = "block"
      }
      if(data.slot4.user != "κενο" && data.slot4.message != "κενο" && data.slot1.time_sent != "κενο") {
        console.log("Νεα αποθηκευμενα μηνυματα βρεθηκαν στην θεση 4")
        $('#secondchat').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="https://03.memeguy21.repl.co/user-profiles/${data.slot4.user}.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">${data.slot4.message}</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${data.slot4.time_sent}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">${data.slot4.user}</div></div></div></li>`)
        $('#updatelastmsg2').html(`${data.slot4.user}: ${data.slot4.message}`);
        if(document.getElementById("new_message_count_2").innerHTML === "ΝΕΟ") {
            console.log("Αλλη λειτουργια εθεσε το στοιχειο ως ΝΕΟ, αλλαγη..")
            document.getElementById("new_message_count_2").innerHTML === "1"
        } else {
            var new_count = Number(document.getElementById("new_message_count_2").innerHTML) + Number(1)
            console.log(new_count)
            $("#new_message_count_2").html(new_count)
        }
        document.getElementById("new_message_badge_2").style.display = "block"
      }
      if(data.slot4.user != "κενο" && data.slot4.message != "κενο" && data.slot1.time_sent != "κενο") {
        console.log("Νεα αποθηκευμενα μηνυματα βρεθηκαν στην θεση 4")
        $('#secondchat').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="https://03.memeguy21.repl.co/user-profiles/${data.slot5.user}.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">${data.slot5.message}</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${data.slot5.time_sent}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">${data.slot5.user}</div></div></div></li>`)
        $('#updatelastmsg2').html(`${data.slot5.user}: ${data.slot5.message}`);
        if(document.getElementById("new_message_count_2").innerHTML === "ΝΕΟ") {
            console.log("Αλλη λειτουργια εθεσε το στοιχειο ως ΝΕΟ, αλλαγη..")
            document.getElementById("new_message_count_2").innerHTML === "1"
        } else {
            var new_count = Number(document.getElementById("new_message_count_2").innerHTML) + Number(1)
            console.log(new_count)
            $("#new_message_count_2").html(new_count)
        }
        document.getElementById("new_message_badge_2").style.display = "block"
      }
    }
})

var error_sound = new Howl({
	src: ['./internal/error.mp3'],
	volume: 0.3
});

var disconnected = new Howl({
	src: ['./internal/disconnected_from_server.mp3'],
	volume: 0.7
});

var connected_to_server = new Howl({
	src: ['./internal/connected_to_server.mp3'],
	volume: 0.3
});

var server_complete = new Howl({
	src: ['./internal/server_complete.mp3'],
	volume: 0.3
});

var emoji_success = new Howl({
	src: ['./internal/emoji_success.mp3'],
	volume: 0.3
});

var notification = new Howl({
	src: ['./internal/new.mp3'],
	volume: 0.9
});

var report_sent = new Howl({
	src: ['./internal/report_sent.wav'],
	volume: 0.3
});

var sad_emoji_success = new Howl({
	src: ['./internal/sad_emoji_success.mp3'],
	volume: 0.3
});

var heart_emoji_success = new Howl({
	src: ['./internal/heart_emoji_success.mp3'],
	volume: 0.3
});

//DISABLED!
if(localStorage.getItem("chat_2_read") === "true") {
    console.log("Chat 2 is read")
    //document.getElementById("unread_chat").style.display = "none"
} else {
    console.log("Chat 2 is not yet read")
    //document.getElementById("unread_chat").style.display = "block"
}
//Change Chats
function changechat() {
    $('#file_upload_button').fadeOut('fast')
    //document.getElementById("emoji").value = ""
    //if(sessionStorage.getItem("input-text-chat-2") != null) {
    //    document.getElementById("emoji").value = sessionStorage.getItem("input-text-chat-2")
    //}
    //inputElement = document.getElementById('emoji')
    //if (inputElement.value.trim().length > 0) {
    //    sessionStorage.setItem('input-text', inputElement.value)
    //} else {
    //    //Input element in main chat is empty
    //}
    if(localStorage.getItem("contact_favorite_name") != null) {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            //Client On Mobile
        } else{
            document.getElementById("emoji").click()
            document.getElementById("emoji").focus();
        } 
        document.getElementById("new_message_badge_2").style.display = "none"
        sessionStorage.setItem("chat", "Placeholder")
        document.getElementById("unread_chat").style.display = "none"
        localStorage.setItem("chat_2_read", "true");
        document.getElementById("video_call_name").innerHTML = localStorage.getItem("contact_favorite_name")
        document.getElementById("pfp_video").src = localStorage.getItem("contact_favorite_url")
        document.getElementById("start_video_call" ).setAttribute( "onClick", "start_private_call();" );
        //$("#send_messages_section").fadeOut("fast");
        //document.getElementById("send_messages_section").style.display = "none"
        document.getElementById("errors_setactive").classList.remove("active");
        document.getElementById("general_setactive").classList.remove("active");
        $("#download_files").fadeOut("fast");
        //document.getElementById("download_files").style.display = "none"
        document.getElementById("error_logs").style.display = "none"
        document.getElementById("general_logs").style.display = "none"
        document.getElementById("changechat1").classList.remove("unread");
        document.getElementById("changechat1").classList.add("active");
        document.getElementById("changechat2").classList.remove("active");
        document.getElementById("user-name").innerHTML = localStorage.getItem("contact_favorite_name")
        document.getElementById("user-image").src = localStorage.getItem("contact_favorite_url")
        document.getElementById("mainchat").style.display = "none"
        $("#secondchat").fadeIn("fast");
        //document.getElementById("secondchat").style.display = "block"
        document.getElementById("user-info-image").src = localStorage.getItem("contact_favorite_url")
        document.getElementById("user-info-name").innerHTML = localStorage.getItem("contact_favorite_name")
        document.getElementById("user-info-text").innerHTML = "Χρηστης ChatVia"
        document.getElementById("profilename1").innerHTML = localStorage.getItem("contact_favorite_name")
        document.getElementById("user-info-email").innerHTML = `null`
        document.getElementById("user-info-location").innerHTML = `Ελλαδα`
        return;
    }
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        //Client On Mobile
    } else{
        document.getElementById("emoji").click()
        document.getElementById("emoji").focus();
    } 
    document.getElementById("new_message_badge_2").style.display = "none"
    sessionStorage.setItem("chat", "Placeholder")
    document.getElementById("unread_chat").style.display = "none"
    $("#download_files").fadeOut("fast");
    //document.getElementById("download_files").style.display = "none"
    localStorage.setItem("chat_2_read", "true");
    document.getElementById("video_call_name").innerHTML = "Placeholder"
    document.getElementById("pfp_video").src = "https://03.memeguy21.repl.co/user-profiles/Placeholder.png"
    document.getElementById("start_video_call" ).setAttribute( "onClick", "start_private_call();" );
    //$("#send_messages_section").fadeOut("fast");
    //document.getElementById("send_messages_section").style.display = "none"
    document.getElementById("errors_setactive").classList.remove("active");
    document.getElementById("general_setactive").classList.remove("active");
    document.getElementById("error_logs").style.display = "none"
    document.getElementById("general_logs").style.display = "none"
    document.getElementById("changechat1").classList.remove("unread");
    document.getElementById("changechat1").classList.add("active");
    document.getElementById("changechat2").classList.remove("active");
    document.getElementById("user-name").innerHTML = "Placeholder"
    document.getElementById("user-image").src = "https://03.memeguy21.repl.co/user-profiles/Placeholder.png"
    document.getElementById("mainchat").style.display = "none"
    $("#secondchat").fadeIn("fast");
    //document.getElementById("secondchat").style.display = "block"
    document.getElementById("user-info-image").src = "https://03.memeguy21.repl.co/user-profiles/Placeholder.png"
    document.getElementById("user-info-name").innerHTML = "Placeholder"
    document.getElementById("user-info-text").innerHTML = "Βιογραφικο Χρηστη"
    document.getElementById("profilename1").innerHTML = "Placeholder"
    document.getElementById("user-info-email").innerHTML = `gregpap03@gmail.com`
    document.getElementById("user-info-location").innerHTML = `Αθηνα, Ελλαδα`
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε Placeholder</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
}

function returntochat() {
    $('#file_upload_button').fadeIn('fast')
    //document.getElementById("emoji").value = ""
    //if(sessionStorage.getItem("input-text") != null) {
    //    document.getElementById("emoji").value = sessionStorage.getItem("input-text")
    //}
    //inputElement = document.getElementById('emoji')
    //if (inputElement.value.trim().length > 0) {
    //    sessionStorage.setItem('input-text-chat-2', inputElement.value)
    //} else {
    //    //Input element in chat 2 is empty
    //}
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        //Client On Mobile
    } else{
        document.getElementById("emoji").click()
        document.getElementById("emoji").focus();
    }    
    $("#download_files").fadeIn("fast");
    //document.getElementById("download_files").style.display = "block"
    sessionStorage.setItem("chat", "1");
    document.getElementById("new_message_badge").style.display = "none"
    $("#send_messages_section").fadeIn("fast");
    //document.getElementById("send_messages_section").style.display = "block"
    document.getElementById("errors_setactive").classList.remove("active");
    document.getElementById("video_call_name").innerHTML = "T50"
    document.getElementById("start_video_call" ).setAttribute( "onClick", "startcall();" );
    document.getElementById("pfp_video").src = "./t50/socket-io.png"
    document.getElementById("general_setactive").classList.remove("active");
    document.getElementById("error_logs").style.display = "none"
    document.getElementById("general_logs").style.display = "none"
    document.getElementById("changechat2").classList.remove("unread");
    document.getElementById("changechat2").classList.add("active");
    document.getElementById("changechat1").classList.remove("active");
    document.getElementById("user-name").innerHTML = "T50"
    document.getElementById("user-image").src = "./t50/socket-io.png"
    $("#mainchat").fadeIn("fast");
    //document.getElementById("mainchat").style.display = "block"
    document.getElementById("secondchat").style.display = "none"
    document.getElementById("user-info-image").src = "./t50/socket-io.png"
    document.getElementById("user-info-name").innerHTML = "T50"
    document.getElementById("user-info-text").innerHTML = `Anonymous Server With Message Encryption Enabled (End To End)`
    document.getElementById("profilename1").innerHTML = "T50"
    document.getElementById("user-info-email").innerHTML = `01506@onion.org`
    document.getElementById("user-info-location").innerHTML = `???`
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε επιστροφη στην αρχικη συνομιλια</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
}

var current_emoji = localStorage.getItem("emoji")
if(current_emoji === "😂") {
    document.getElementById("emoji_button").innerHTML = `<i class="ri-emotion-laugh-line"></i>`
    document.getElementById("emoji_1").style.color = "lime"
} else if(current_emoji === "😢") {
    document.getElementById("emoji_button").innerHTML = `<i class="ri-emotion-sad-line"></i>`
    document.getElementById("emoji_2").style.color = "lime"
} else if(current_emoji === "😊") {
    document.getElementById("emoji_button").innerHTML = `<i class="ri-emotion-line"></i>`
    document.getElementById("emoji_3").style.color = "lime"
} else if(current_emoji === "❤️") {
    document.getElementById("emoji_button").innerHTML = `<i class="ri-heart-fill"></i>`
    document.getElementById("emoji_4").style.color = "lime"
} else {
    localStorage.setItem("emoji", "😂")
}

function change_emoji_1() {
    //Change to 😂
    if(localStorage.getItem("emoji") === "😂") {
       error_sound.play()
       document.getElementById("emoji_1").style.color = "red"
        setTimeout(function() {
            document.getElementById("emoji_1").style.color = "lime"
        }, 500)
    } else {
        emoji_success.play()
        localStorage.setItem("emoji", "😂")
        document.getElementById("emoji_2").style.color = "white"
        document.getElementById("emoji_3").style.color = "white"
        document.getElementById("emoji_4").style.color = "white"
        document.getElementById("emoji_1").style.color = "lime"
        document.getElementById("emoji_button").innerHTML = `<i class="ri-emotion-laugh-line"></i>`
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε 😂</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
    }
}

function change_emoji_2() {
    //Change to 😢
    if(localStorage.getItem("emoji") === "😢") {
        error_sound.play()
        document.getElementById("emoji_2").style.color = "red"
        setTimeout(function() {
            document.getElementById("emoji_2").style.color = "lime"
        }, 500)
    } else {
        sad_emoji_success.play()
        localStorage.setItem("emoji", "😢")
        document.getElementById("emoji_2").style.color = "lime"
        document.getElementById("emoji_3").style.color = "white"
        document.getElementById("emoji_4").style.color = "white"
        document.getElementById("emoji_1").style.color = "white"
        document.getElementById("emoji_button").innerHTML = `<i class="ri-emotion-sad-line"></i>`
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε 😢</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
    }
}

function change_emoji_3() {
    //Change to 😊
    if(localStorage.getItem("emoji") == "😊") {
        error_sound.play()
        document.getElementById("emoji_3").style.color = "red"
        setTimeout(function() {
            document.getElementById("emoji_3").style.color = "lime"
        }, 500)
    } else {
        emoji_success.play()
        localStorage.setItem("emoji", "😊")
        document.getElementById("emoji_2").style.color = "white"
        document.getElementById("emoji_3").style.color = "lime"
        document.getElementById("emoji_4").style.color = "white"
        document.getElementById("emoji_1").style.color = "white"
        document.getElementById("emoji_button").innerHTML = `<i class="ri-emotion-line"></i>`
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε 😊</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
    }
}

function change_emoji_4() {
    //Change to ❤️
    if(localStorage.getItem("emoji") === "❤️") {
        error_sound.play()
        document.getElementById("emoji_4").style.color = "red"
        setTimeout(function() {
            document.getElementById("emoji_4").style.color = "lime"
        }, 500)
    } else {
        heart_emoji_success.play()
        localStorage.setItem("emoji", "❤️")
        document.getElementById("emoji_2").style.color = "white"
        document.getElementById("emoji_3").style.color = "white"
        document.getElementById("emoji_4").style.color = "lime"
        document.getElementById("emoji_1").style.color = "white"
        document.getElementById("emoji_button").innerHTML = `<i class="ri-heart-fill"></i>`
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε ❤️</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
    }
}

function showgeneral() {
  sessionStorage.setItem("chat", "logs_general")
    document.getElementById("new_hide_1").style.display = "none"
    $("#send_messages_section").fadeOut("fast");
    //document.getElementById("send_messages_section").style.display = "none"
    document.getElementById("user-name").innerHTML = "#Γενικα"
    document.getElementById("general_setactive").classList.add("active");
    document.getElementById("errors_setactive").classList.remove("active");
    document.getElementById("secondchat").style.display = "none"
    document.getElementById("mainchat").style.display = "none"
    document.getElementById("general_logs").style.display = "block"
    document.getElementById("error_logs").style.display = "none"
    document.getElementById("changechat1").classList.remove("active");
    document.getElementById("changechat2").classList.remove("active");
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε #Γενικα</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
}

function showerrors() {
  sessionStorage.setItem("chat", "logs_errors")
    document.getElementById("new_hide_2").style.display = "none"
    $("#send_messages_section").fadeOut("fast");
    //document.getElementById("send_messages_section").style.display = "none"
    document.getElementById("user-name").innerHTML = "#Σφαλματα"
    document.getElementById("general_setactive").classList.remove("active");
    document.getElementById("errors_setactive").classList.add("active");
    document.getElementById("secondchat").style.display = "none"
    document.getElementById("mainchat").style.display = "none"
    document.getElementById("general_logs").style.display = "none"
    document.getElementById("error_logs").style.display = "block"
    document.getElementById("changechat1").classList.remove("active");
    document.getElementById("changechat2").classList.remove("active");
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε #Σφαλματα</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">T50</div></div></div></li>`)
}



//var copyText = document.getElementById("myInput");
//copyText.select();
//copyText.setSelectionRange(0, 99999);
//navigator.clipboard.writeText(copyText.value);

function connect_disconnect() {
     var checkBox = document.getElementById("connect_disconnect_switch");
     if (checkBox.checked === true){
        socket.connect()
        document.getElementById("notification_offline").remove();
        console.log("Online")
    } else if(checkBox.checked === false) {
        $('#mainchat').append(`<li id="notification_offline" style="display:none" class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./images/system.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0"><h5 style="color: lightcoral">Προσοχη!</h5>Η Συνδεση Με Τον Διακομιστη Σταματησε!</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Συστημα</div></div></div></li>`)
        error_sound.play()
        socket.disconnect()
        console.log("Offline")
    }
}

function report() {
    $("#report").fadeIn("fast");
    $("#change_control").fadeIn("fast");
}

$('#report').bind('keyup', function(e) {
    if (e.keyCode === 13 && document.getElementById("report").placeholder == "Διευθυνση Διακομιστη") {
      var new_srv = document.getElementById("report").value
      localStorage.setItem("srv", new_srv)
      $("#report").fadeOut("fast");
      setTimeout( function() {
        $("#report").fadeIn("fast");
        document.getElementById("report").placeholder = "Κωδικος Προσβασης Προγραμματιστων"
        document.getElementById("report").value = ""
      }, 500)
     
      //report_sent.play()
      failed.play()
      notyf.error('Απαιτείται έλεγχος ταυτότητας!');
    } else if (e.keyCode === 13 && document.getElementById("report").placeholder == "Κωδικος Προσβασης Προγραμματιστων") {
      var hash = CryptoJS.MD5(document.getElementById("report").value).toString();
      if(hash == "d8ce4f990ded9e7897f47767463a259d") {
        localStorage.setItem("bypass", "offline")
        report_sent.play()
        $("#report").fadeOut("1000");
        $("#change_control").fadeOut("1000");
        $("#mainchat_top").fadeOut("1000");
        setTimeout( function () {
          window.location.reload()
        }, 1400)
      } else {
        error_sound.play()
        document.getElementById("report").classList.add('shake');
        setTimeout( function() {
          document.getElementById("report").classList.remove('shake');
        }, 250)
      }
    }else if(e.keyCode == 27) {
        $("#report").fadeOut("fast");
    }
})

function private_chats_on_off() {
     var checkBox = document.getElementById("private_chats_setting");
     if (checkBox.checked === true){
        document.getElementById("changechat1").style.display = "block"
        localStorage.setItem("private_chats", "on")
        notyf.success('Οι προσωπικες συνομιλιες απενεργοποιηθηκαν');
        calling.play()
        //console.log("Private Chats ON")
        //document.getElementById("secondchat").style.display = "block"
    } else if(checkBox.checked === false) {
       document.getElementById("changechat1").style.display = "none"
       localStorage.setItem("private_chats", "off")
       notyf.success('Οι προσωπικες συνομιλιες απενεργοποιηθηκαν');
       applied_off.play()
       //console.log("Private Chats OFF")
       //document.getElementById("secondchat").style.display = "block"
    }
}

function light_mode_on() {
    document.getElementById("body").dataset.layout_mode = "light";
}

function start_private_call() {
    socket.emit('message', {
		user: `${localStorage.getItem("user") || 'Ανωνυμος'}`,
		message: `Start_Call_General`
	});
    if(user === "Αλεξια") {
          sessionStorage.setItem("connect_with", "ALEXIA")
        } else if(user === "Placeholder") {
          sessionStorage.setItem("connect_with", "GREGORY")
        }
    window.location.href = "index_video.html"
    //not_ready.play()
    //document.getElementById("callstatus").innerHTML = "<span style='color: red'>Η Λειτουργια δεν ειναι ακομα ετοιμη!</span>"
    //console.log("Function not ready")
    //setTimeout(function() {
    //    document.getElementById("callstatus").innerHTML = "Ξεκινηστε Βιντεο Κληση"
    //}, 3000)
}

function testgoogle() {
    document.getElementById("mainchat").style.display = "none"
    document.getElementById("google").style.display = "block"
}

//Email Functions
// email id profileemail
if(localStorage.getItem("user_email") != null) {
    //email has been added
    var elms = document.querySelectorAll("[id='profileemail']");
	for (var i = 0; i < elms.length; i++)
		elms[i].innerHTML = localStorage.getItem("user_email")
        document.getElementById("check_email").innerHTML = `<i class="ri-edit-fill me-1 ms-0 align-middle"></i>Επεξεργασια`
} else {
    document.getElementById("check_email").innerHTML = `<i class="ri-add-fill me-1 ms-0 align-middle"></i>
                            Προσθηκη`
}

function email_functions() {
    document.getElementById("change_profile_picture").style.display = "none"
    document.getElementById('hidetoshowothers').style.display = 'none'
    document.getElementById('change_chatting_user_elem').style.display = 'none'
    document.getElementById("liked_songs").style.display = "none"
    if(localStorage.getItem("user_email") != null) {
        document.getElementById("updaterequired").click()
        document.getElementById("hidetoshowothers").style.display = "none"
        document.getElementById("dropdown34").style.display = "block"
        document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place"><div class="mb-3">
        <label for="updatemail" class="form-label">Αλλαγή Email</label>
        <h5 style="text-align: left;">Νεο Email:</h5>
        <input type="email" class="form-control" value="${localStorage.getItem("user_email")}" id="updatemail"
          placeholder="Πληκτρολογηστε Email"><br>
          <h5 style="text-align: left;">Κωδικος Προσβασης:</h5>
          <input type="password" class="form-control" id="update_email_password"
          placeholder="Πληκτρολογηστε τον κωδικο σας">
      </div>
      <button onclick="updateemail()" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Εφαρμογη</b></button>&nbsp;
<button type="button" id="email_dismiss" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Ακυρωση</button></div>`
    } else {
        document.getElementById("updaterequired").click()
        document.getElementById("dropdown34").style.display = "block"
    document.getElementById("hidetoshowothers").style.display = "none"
    document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place"><div class="mb-3">
                          <label for="updatemail" class="form-label">Προσθηκη Email</label>
                          <h5 style="text-align: left;">Νεο Email:</h5>
                          <input type="email" class="form-control" id="updatemail"
                            placeholder="Πληκτρολογηστε Email"><br>
                            <h5 style="text-align: left;">Κωδικος Προσβασης:</h5>
                            <input type="password" class="form-control" id="update_email_password"
                            placeholder="Πληκτρολογηστε τον κωδικο σας">
                        </div>
                        <button onclick="updateemail()" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Εφαρμογη</b></button>&nbsp;
                  <button type="button" id="email_dismiss" class="btn btn-danger btn-sm" data-bs-dismiss="modal">Ακυρωση</button></div>`
    }
    

}

function updateemail() {
  var elms = document.querySelectorAll("[id='profileemail']");
  let password = document.getElementById("update_email_password").value
  let new_mail =  document.getElementById('updatemail').value
  if(new_mail == localStorage.getItem("user_email")) {
    document.getElementById("updatemail").classList.add('shake');
        setTimeout( function() {
          document.getElementById("updatemail").classList.remove('shake');
        }, 250)
        if(password == ""){//repeating the code below so both elements shake
          document.getElementById("update_email_password").classList.add('shake');
          setTimeout( function() {
            document.getElementById("update_email_password").classList.remove('shake');
          }, 250)
        }
        return;
  }
  if(password == ""){
    document.getElementById("update_email_password").classList.add('shake');
    setTimeout( function() {
      document.getElementById("update_email_password").classList.remove('shake');
    }, 250)
    if(new_mail == localStorage.getItem("user_email")) { //repeating the code above so both elements shake
      document.getElementById("updatemail").classList.add('shake');
          setTimeout( function() {
            document.getElementById("updatemail").classList.remove('shake');
          }, 250)
    }
    return;
  }

  var correct_pass = JSON.parse(localStorage.getItem("account"))
  if(password == correct_pass.password) {
    console.log("Password Is Correct!")
  } else {
    console.log("Password Is Not Correct")
    document.getElementById("update_email_password").classList.add('shake');
    setTimeout( function() {
      document.getElementById("update_email_password").classList.remove('shake');
    }, 250)
    return;
  }

  //assuming password value is correct and email is different...
  $("#dropdown34").fadeOut("slow", function() {
    $("#dropdown34").fadeIn("slow")
    document.getElementById("dropdown34").innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="48px" height="60px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
       <rect x="0" y="10" width="4" height="10" fill="#fff" opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
       </rect>
       <rect x="8" y="10" width="4" height="10" fill="#fff"  opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
       </rect>
       <rect x="16" y="10" width="4" height="10" fill="#fff"  opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
       </rect>
      </svg><br><br><p id="info_show_loading_email_change" style="color: white">Περιμένετε..</p>`
  })
  //localStorage.setItem('user_email', new_mail);
  for (var i = 0; i < elms.length; i++) //here changes email values to loading
	  elms[i].innerHTML = "Περιμένετε.."
  const input1 = new_mail;
	const xhr = new XMLHttpRequest();
	const url = 'https://email-server.memeguy21.repl.co';
	const data = { email: input1, username: user, method: "edit_email" };
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
	xhr.onload = function() {
	  if (xhr.status === 200) {
	    console.log('Request sent successfully!');
	    console.log(xhr.responseText);
      default_time = setTimeout(function() {
        $("#dropdown34").fadeOut("slow", function() {
          document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place"><div class="mb-3">
                          <label for="updatemail" class="form-label">Προσθηκη Email / Τελευταιο Βημα</label>
                          <p>Ενας Κωδικος Επαληθευσης σταλθηκε στο email σας. Πληκτρολογηστε τον για να συνεχισετε</p>
                          <h5 style="text-align: left;">Νεο Email:</h5>
                          <input type="email" class="form-control" value="${input1}" id="updatemail" disabled><br>
                            <h5 style="text-align: left;">Κωδικος Επαληθευσης:</h5>
                            <input type="text" class="form-control" name="number" maxlength="6" id="verification_code"
                            placeholder="Πληκτρολογηστε τον κωδικο επαληθευσης">
                        </div>
                        <button onclick="verify_code('${input1}')" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Επαληθευση</b></button>&nbsp;`
        })
      }, 3000)
      if(xhr.responseText == "error, exists") {
        clearTimeout(default_time)
        $("#dropdown34").fadeOut("slow", function() {
          document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place"><div class="mb-3">
                          <h5 for="updatemail" class="form-label">Προσθηκη Email / Τελευταιο Βημα</h5>
                          <p>Ενας Κωδικος Επαληθευσης εχει σταλθει στο email σας. Πληκτρολογηστε τον πιο προσφατο για να συνεχισετε.</p>
                          <h5 style="text-align: left;">Email:</h5>
                          <input type="email" class="form-control" value="${input1}" id="updatemail" disabled><br>
                            <h5 style="text-align: left;">Κωδικος Επαληθευσης:</h5>
                            <input type="text" name="number" maxlength="6" class="form-control" id="verification_code"
                            placeholder="Πληκτρολογηστε τον κωδικο επαληθευσης">
                        </div>
                        <button onclick="verify_code('${input1}')" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Επαληθευση</b></button>&nbsp;`
        })
        $("#dropdown34").fadeIn("slow")
      }
	  } else {
	    console.log('Error sending request.');
	  }
	};
	xhr.onerror = function() {
	  console.log('Error sending request.');
	};
	xhr.send(JSON.stringify(data));

    
	for (var i = 0; i < elms.length; i++)
	  elms[i].innerHTML = localStorage.getItem("user_email")
  document.getElementById("check_email").innerHTML = `<i class="ri-edit-fill me-1 ms-0 align-middle"></i>Επεξεργασια`
    
}

function verify_code(email) {
  var code = document.getElementById("verification_code").value
  $("#dropdown34").fadeOut("slow", function() {
    $("#dropdown34").fadeIn("slow")
    document.getElementById("dropdown34").innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="48px" height="60px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
       <rect x="0" y="10" width="4" height="10" fill="#fff" opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0s" dur="0.6s" repeatCount="indefinite" />
       </rect>
       <rect x="8" y="10" width="4" height="10" fill="#fff"  opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.15s" dur="0.6s" repeatCount="indefinite" />
       </rect>
       <rect x="16" y="10" width="4" height="10" fill="#fff"  opacity="0.2">
         <animate attributeName="opacity" attributeType="XML" values="0.2; 1; .2" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="height" attributeType="XML" values="10; 20; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
         <animate attributeName="y" attributeType="XML" values="10; 5; 10" begin="0.3s" dur="0.6s" repeatCount="indefinite" />
       </rect>
      </svg><br><br><p id="info_show_loading_email_change" style="color: white">Περιμένετε..</p>`
      
      fetch(`https://email-server.memeguy21.repl.co?email=${email}`)
        .then(response => response.text())
        .then(data => {
	      if(code == data) {
	      console.log(true)
        setTimeout(function () {
          document.getElementById("updaterequired").click()
            localStorage.setItem("user_email", email)
            for (var i = 0; i < elms.length; i++) //here changes email values to new email
	            elms[i].innerHTML = localStorage.getItem("user_email")
        
        }, 3500)
	      } else {
          document.getElementById("updaterequired").click()
          for (var i = 0; i < elms.length; i++) //code wrong
	            elms[i].innerHTML = "code wrong"
          //Wrong Code


          //$("#dropdown34").fadeOut("slow", function() {
          //  $("#dropdown34").fadeIn("slow")
          //  document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place"><div class="mb-3">
          //                  <h5 for="updatemail" class="form-label">Προσθηκη Email / Τελευταιο Βημα</h5>
          //                  <p style="color: #ff3c2e">Ο Κωδικος Επαληθευσης Που Πληκτρολογησατε Ειναι Λαθος, Προσπαθηστε Ξανα.</p>
          //                  <h5 style="text-align: left;">Email:</h5>
          //                  <input type="email" class="form-control" value="${email}" id="updatemail" disabled><br>
          //                    <h5 style="text-align: left;">Κωδικος Επαληθευσης:</h5>
          //                    <input type="text" name="number" maxlength="6" class="form-control" id="verification_code"
          //                    placeholder="Πληκτρολογηστε τον κωδικο επαληθευσης">
          //                </div>
          //                <button onclick="verify_code('${email}')" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Επαληθευση</b></button>&nbsp;`
          //})
          console.error("Code Is Wrong")
        }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      })
  
}

function change_chatting_user() {
    var check1 = document.getElementById('memberCheck1')
    var check2 = document.getElementById('memberCheck2')
    var check3 = document.getElementById('memberCheck3')
    check1.disabled = false
    check2.disabled = false
    check3.disabled = false
    document.getElementById('updaterequired').click()
    document.getElementById('hidetoshowothers').style.display = 'none'
    //
    document.getElementById('liked_songs').style.display = 'none'
    document.getElementById("change_profile_picture").style.display = "none"
    document.getElementById('change_chatting_user_elem').style.display = 'block'
    if(document.getElementById('add_edit_email_place')) {
        document.getElementById('add_edit_email_place').style.display = 'none'
    }
    current_name = user
    if(current_name == "Placeholder") { 
        document.getElementById("memberLabel2").style.color = "red";
        document.getElementById("memberCheck2").disabled = true;
    } else if(current_name == "21") {
        document.getElementById("memberLabel1").style.color = "red";
        document.getElementById("memberCheck1").disabled = true;
    } else if(current_name == "Επισκεπτης") {
        document.getElementById("memberLabel3").style.color = "red";
        document.getElementById("memberCheck3").disabled = true;
    }


    if(check1.checked) {
        check2.disabled = true
        check3.disabled = true
    } else if (check2.checked) { 
        check1.disabled = true
        check3.disabled = true
    } else if(check3.checked) {
        check2.disabled = true
        check1.disabled = true
    }

    if(localStorage.getItem("contact_favorite_name") != null) {
        var favorite_now = localStorage.getItem("contact_favorite_name")
        if(favorite_now == "Placeholder") { 
            document.getElementById("memberCheck2").checked = true;
        } else if(favorite_now == "21") {
            document.getElementById("memberCheck1").checked = true;
        } else if(favorite_now == "Επισκεπτης") {
            document.getElementById("memberCheck3").checked = true;
        }
    }
}

var checkbox_no1 = document.getElementById('memberCheck1')
var checkbox_no2 = document.getElementById('memberCheck2')
var checkbox_no3 = document.getElementById('memberCheck3')
checkbox_no1.addEventListener('change', function() {
    if (this.checked) {
      // Checkbox is checked, do something
      checkbox_no2.disabled = true
      checkbox_no2.checked = false
      checkbox_no3.disabled = true
      checkbox_no3.checked = false
      //console.log("Checkbox 1 is checked!");
    } else {
      // Checkbox is unchecked, do something else
      checkbox_no2.disabled = false
      checkbox_no3.disabled = false
      //console.log("Checkbox 1 is unchecked!");
    }
  });
  checkbox_no2.addEventListener('change', function() {
    if (this.checked) {
      // Checkbox is checked, do something
      checkbox_no1.disabled = true
      checkbox_no1.checked = false

      checkbox_no3.disabled = true
      checkbox_no3.checked = false
      //console.log("Checkbox 2 is checked!");
    } else {
      // Checkbox is unchecked, do something else
      checkbox_no1.disabled = false
      checkbox_no3.disabled = false
      //console.log("Checkbox 2 is unchecked!");
    }
  });
  checkbox_no3.addEventListener('change', function() {
    if (this.checked) {
      // Checkbox is checked, do something
      checkbox_no2.disabled = true
      checkbox_no2.checked = false
      checkbox_no1.disabled = true
      checkbox_no1.checked = false
      //console.log("Checkbox 3 is checked!");
    } else {
      // Checkbox is unchecked, do something else
      checkbox_no2.disabled = false
      checkbox_no1.disabled = false
      //console.log("Checkbox 3 is unchecked!");
    }
  });

  function removefavorites_all() {
    if(localStorage.getItem("contact_favorite_name") != null) {
        localStorage.removeItem("contact_favorite_name")
        localStorage.removeItem("contact_favorite_url")
        document.getElementById("chat_2_user_pfp").src = "https://03.memeguy21.repl.co/user-profiles/Placeholder.png"
        document.getElementById("change_chatting_user_username").innerHTML = "Placeholder"
        document.getElementById("first_letter_contacts").innerHTML = "P"
        document.getElementById("contact_name_change").innerHTML = "Placeholder"
        checkbox_no1.checked = false
        checkbox_no2.checked = false
        checkbox_no3.checked = false
        calling.play()
    } else {
        failed.play()
    }    
  }
function change_chatting() {
    var check1 = document.getElementById('memberCheck1')
    var check2 = document.getElementById('memberCheck2')
    var check3 = document.getElementById('memberCheck3')
    if(check1.checked == true) {
        if(user != "21") {
            localStorage.setItem("contact_favorite_url", "https://03.memeguy21.repl.co/user-profiles/21.png")
            localStorage.setItem("contact_favorite_name", "21")
            document.getElementById("chat_2_user_pfp").src = localStorage.getItem("contact_favorite_url")
            document.getElementById("change_chatting_user_username").innerHTML = localStorage.getItem("contact_favorite_name")
            let firstLetter = localStorage.getItem("contact_favorite_name").charAt(0);
            document.getElementById("first_letter_contacts").innerHTML = firstLetter
            document.getElementById("contact_name_change").innerHTML = localStorage.getItem("contact_favorite_name")
        } else {
            not_ready.play()
        }
        //Αλεξια is checked
    } else if(check2.checked == true) {
        if(user != "Placeholder") {
            localStorage.setItem("contact_favorite_url", "https://03.memeguy21.repl.co/user-profiles/Placeholder.png")
            localStorage.setItem("contact_favorite_name", "Placeholder")
            document.getElementById("chat_2_user_pfp").src = localStorage.getItem("contact_favorite_url")
            document.getElementById("change_chatting_user_username").innerHTML = localStorage.getItem("contact_favorite_name")
            let firstLetter = localStorage.getItem("contact_favorite_name").charAt(0);
            document.getElementById("first_letter_contacts").innerHTML = firstLetter
            document.getElementById("contact_name_change").innerHTML = localStorage.getItem("contact_favorite_name")
        } else {
            not_ready.play()
        }
        //Placeholder is checked
    } else if(check3.checked == true) {
        //Επισκεπτης is checked
        localStorage.setItem("contact_favorite_url", "https://03.memeguy21.repl.co/user-profiles/Επισκεπτης.png")
            localStorage.setItem("contact_favorite_name", "Επισκεπτης")
            document.getElementById("chat_2_user_pfp").src = localStorage.getItem("contact_favorite_url")
            document.getElementById("change_chatting_user_username").innerHTML = localStorage.getItem("contact_favorite_name")
            let firstLetter = localStorage.getItem("contact_favorite_name").charAt(0);
            document.getElementById("first_letter_contacts").innerHTML = firstLetter
            document.getElementById("contact_name_change").innerHTML = localStorage.getItem("contact_favorite_name")
    } else {
        localStorage.setItem("contact_favorite_url", "https://03.memeguy21.repl.co/user-profiles/Επισκεπτης.png")
            localStorage.setItem("contact_favorite_name", "Επισκεπτης")
            document.getElementById("chat_2_user_pfp").src = localStorage.getItem("contact_favorite_url")
            document.getElementById("change_chatting_user_username").innerHTML = localStorage.getItem("contact_favorite_name")
            let firstLetter = localStorage.getItem("contact_favorite_name").charAt(0);
            document.getElementById("first_letter_contacts").innerHTML = firstLetter
            document.getElementById("contact_name_change").innerHTML = localStorage.getItem("contact_favorite_name")
    }
    calling.play()
}

function change_to_music() {
    //error_sound.play()
    document.getElementById('section_music').style.display = 'block'
    document.getElementById("section_contacts").style.display = 'none'
}

function change_to_contacts() {
    //report_sent.play()
    document.getElementById('section_music').style.display = 'none'
    document.getElementById("section_contacts").style.display = 'block'
}

//Start Functions For Pesonal Music
var file = `https://03.memeguy21.repl.co/evox/music_Γρηγορης.json` //CHANGE ME THIS IS DEFAULT
readTextFile(file, function(text) {
		var info = JSON.parse(text)
        var el = info.el
        var en = info.en
        $("#song_el_1").html(el.A)
        $("#song_el_2").html(el.B)
        $("#song_el_3").html(el.C)
        $("#song_el_4").html(el.D)
        $("#song_el_5").html(el.E)

        $("#song_en_1").html(en.A)
        $("#song_en_2").html(en.B)
        $("#song_en_3").html(en.C)
        $("#song_en_4").html(en.D)
        $("#song_en_5").html(en.E)


var el_1 = document.getElementById("song_el_1")
var el_2 = document.getElementById("song_el_2")
var el_3 = document.getElementById("song_el_3")
var el_4 = document.getElementById("song_el_4")
//var en_1 = document.getElementById("song_en_1")
//var en_2 = document.getElementById("song_en_2")
//var en_3 = document.getElementById("song_en_3")
//var en_4 = document.getElementById("song_en_4")
el_1.addEventListener('click', function() {
    
    //Clicked 1st Greek Song
    if(sessionStorage.getItem("playing") != "el_1" && sessionStorage.getItem("music") != "active") {
        //play music
        notification.play()
        el_1.style.color = "cyan"
        sessionStorage.setItem("playing", "el_1")
        sessionStorage.setItem("music", "active")
        var song_playing = new Howl({
	        src: [el.A_L],
	        volume: 1
        });
        song_playing.play()
    } else if(sessionStorage.getItem("playing") === "el_1") {
        setTimeout(function() {
            el_1.style.color = "";
        }, 600)
        Howler.stop()
        sessionStorage.setItem("music", "inactive")
        sessionStorage.removeItem("playing")
        el_1.style.color = "red";
        failed.play()
        //stop music
    }
});
el_2.addEventListener('click', function() {
    //Clicked 2nd Greek Song
    if(sessionStorage.getItem("playing") != "el_2" && sessionStorage.getItem("music") != "active") {
        //play music
        notification.play()
        el_2.style.color = "cyan"
        sessionStorage.setItem("playing", "el_2")
        sessionStorage.setItem("music", "active")
        var song_playing = new Howl({
	        src: [el.B_L],
	        volume: 1
        });
        song_playing.play()
    } else if(sessionStorage.getItem("playing") === "el_2") {
        setTimeout(function() {
            el_2.style.color = "";
        }, 600)
        Howler.stop()
        sessionStorage.setItem("music", "inactive")
        sessionStorage.removeItem("playing")
        el_2.style.color = "red";
        failed.play()
        //stop music
    }
});
el_3.addEventListener('click', function() {
    //Clicked 3rd Greek Song
    if(sessionStorage.getItem("playing") != "el_3" && sessionStorage.getItem("music") != "active") {
        //play music
        notification.play()
        el_3.style.color = "cyan"
        sessionStorage.setItem("playing", "el_3")
        sessionStorage.setItem("music", "active")
        var song_playing = new Howl({
	        src: [el.C_L],
	        volume: 1
        });
        song_playing.play()
    } else if(sessionStorage.getItem("playing") === "el_3") {
        setTimeout(function() {
            el_3.style.color = "";
        }, 600)
        Howler.stop()
        sessionStorage.setItem("music", "inactive")
        sessionStorage.removeItem("playing")
        el_3.style.color = "red";
        failed.play()
        //stop music
    }
});
el_4.addEventListener('click', function() {
    //Clicked 4th Greek Song
    if(sessionStorage.getItem("playing") != "el_4" && sessionStorage.getItem("music") != "active") {
        //play music
        notification.play()
        el_4.style.color = "cyan"
        sessionStorage.setItem("playing", "el_4")
        sessionStorage.setItem("music", "active")
        var song_playing = new Howl({
	        src: [el.D_L],
	        volume: 1
        });
        song_playing.play()
    } else if(sessionStorage.getItem("playing") === "el_4") {
        setTimeout(function() {
            el_4.style.color = "";
        }, 600)
        Howler.stop()
        sessionStorage.setItem("music", "inactive")
        sessionStorage.removeItem("playing")
        el_4.style.color = "red";
        failed.play()
        //stop music
    }
});



//en_1.addEventListener('click', function() {
//    //Clicked 1st EN Song
//    report_sent.play()
//});
//en_2.addEventListener('click', function() {
//    //Clicked 2nd EN Song
//    report_sent.play()
//});
//en_3.addEventListener('click', function() {
//    //Clicked 3rd EN Song
//    report_sent.play()
//});
//en_4.addEventListener('click', function() {
//    //Clicked 4th EN Song
//    report_sent.play()
//});

var el_1_up = document.getElementById("el_1_up");
var el_2_up = document.getElementById("el_2_up");
var el_3_up = document.getElementById("el_3_up");
var el_4_up = document.getElementById("el_4_up");
var el_1_down = document.getElementById("el_1_down");
var el_2_down = document.getElementById("el_2_down");
var el_3_down = document.getElementById("el_3_down");
var el_4_down = document.getElementById("el_4_down");
el_1_up.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`liked_song_no${randomNumber}`, el.A)
    el_1_down.style.display = 'none';
})
el_2_up.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`liked_song_no${randomNumber}`, el.B)
    el_2_down.style.display = 'none';
})
el_3_up.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`liked_song_no${randomNumber}`, el.C)
    el_3_down.style.display = 'none';
})
el_4_up.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`liked_song_no${randomNumber}`, el.D)
    el_4_down.style.display = 'none';
})

el_1_down.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`disliked_song_no${randomNumber}`, el.A)
    el_1_up.style.display = 'none';
})
el_2_down.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`disliked_song_no${randomNumber}`, el.B)
    el_2_up.style.display = 'none';
})
el_3_down.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`disliked_song_no${randomNumber}`, el.C)
    el_3_up.style.display = 'none';
})
el_4_down.addEventListener('click', function() {
    const randomNumber = Math.floor(Math.random() * 5000);
    calling.play()
    localStorage.setItem(`disliked_song_no${randomNumber}`, el.D)
    el_4_up.style.display = 'none';
})
})

function showLocalStorageItems(searchStr) {
      const tragoudiaSection = document.getElementById('tragoudia_section');
      tragoudiaSection.innerHTML = ''; // clear the section before adding new items
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.includes(searchStr)) {
          showname = key.replace('liked_song_no', 'No');
      const songNumber = localStorage.getItem(key);
      const itemText = `${showname}: <b>${songNumber}</b>`; // wrap song number in b tags
      const itemElement = document.createElement('p');
      itemElement.innerHTML = itemText;
      tragoudiaSection.appendChild(itemElement);
        }
      }
}

function saved_songs_show() {
    document.getElementById("dropdown34").style.display = 'none';
    document.getElementById("updaterequired").click()
    document.getElementById('change_chatting_user_elem').style.display = 'none'
    if(document.getElementById('add_edit_email_place')) {
        document.getElementById('add_edit_email_place').style.display = 'none'
    }
    document.getElementById("hidetoshowothers").style.display = "none"
    document.getElementById("liked_songs").style.display = "block"
    showLocalStorageItems('liked_song_no');
}

function delete_saved_songs() {
    for (var key in localStorage) {
  if (key.startsWith("liked_song_no")) {
    localStorage.removeItem(key);
  }
  if (key.startsWith("disliked_song_no")) {
    localStorage.removeItem(key);
  }
}
failed.play() //EINAI TO ONOMA ETSI APLA
}

window.addEventListener('keydown', event => {
  if (event.ctrlKey && event.shiftKey && event.key === 'W') {
    window.location.href = './dist/secondshitforwebcam.html';
  }
});

function changepfp() {
    const input = document.getElementById('imageFileInputPfp');
    const file = input.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64Text = reader.result.split(',')[1];
      const pfp = base64Text
      if(pfp == "twentyonecoreCHATVIAEVOX") {
        dev_msg()
        return;
      }
    connected_to_server.play()
    fetch('https://ChatVia-Database.memeguy21.repl.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user,
        pfp: pfp
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });

    var elms = document.querySelectorAll("[id='pfpprofile']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].src = `./images/loading.svg`;
    }

    setTimeout( function() {
        setTimeout( function() {
            server_complete.play()
        }, 200)
        const url = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;

    fetch(url)
  .then(response => response.text())
  .then(data => {
    localStorage.setItem("pfpdata", data)
    document.getElementById("self_user_image").src = `data:image/png;base64,${data}`
    document.getElementById("update_pfp_after_change").src = `data:image/png;base64,${data}`
    var elms = document.querySelectorAll("[id='pfpprofile']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].src = `data:image/png;base64,${data}`;
    }
  })
  .catch(error => console.error(error));
    }, 4000)
    

  } //TO CLOSE BASE64 ENCODED VALUE
  reader.readAsDataURL(file);
  if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //
  } else {
    document.getElementById("updaterequired").click()
  }

  setTimeout( function() {
    localStorage.setItem("auto_connect_database", true)
    document.getElementById("change_profile_picture").style.display = "none"
  }, 350)
}

function pfp_change() {
    document.getElementById("updaterequired").click()
    document.getElementById("change_profile_picture").style.display = "block"
    document.getElementById('hidetoshowothers').style.display = 'none'
    document.getElementById('change_chatting_user_elem').style.display = 'none'
    document.getElementById("liked_songs").style.display = "none"
    document.getElementById("dropdown34").style.display = "none"
}

function loadserver() {
    var toggle = document.getElementById("database_toggle")
    toggle.innerHTML = `<i class="ri-database-2-fill"></i>`
    localStorage.setItem("auto_connect_database", true)
    //connected_to_server.play()
    var elms = document.querySelectorAll("[id='pfpprofile']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].src = `./images/loading.svg`;
    }

        setTimeout( function() {
            server_complete.play()
        }, 200)
        const url = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;

    fetch(url)
  .then(response => response.text())
  .then(data => {

    localStorage.setItem("pfpdata", data)
    document.getElementById("self_user_image").src = `data:image/png;base64,${data}`
    document.getElementById("update_pfp_after_change").src = `data:image/png;base64,${data}`
    var elms = document.querySelectorAll("[id='pfpprofile']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].src = `data:image/png;base64,${data}`;
    }
  })
  .catch(error => console.error(error));
  document.getElementById("button_connect_database").style.display = "none"
  document.getElementById("text_connected_database").style.display = "block"
  
}

function disconnect_server() {
  if(sessionStorage.getItem("disc_temp") == "here") {
    clearTimeout(time)
    sessionStorage.removeItem("disc_temp")
    document.getElementById("text_connected_database").style.display = "none"
    document.getElementById("button_connect_database").style.display = "block"
    document.getElementById("database_toggle").innerHTML = `<i class="ri-database-2-line"></i>`
    localStorage.removeItem("auto_connect_database")
    checkImage(`https://03.memeguy21.repl.co/user-profiles/${localStorage.getItem("user")}.png`, function(exists) {
      if (exists) {
        console.log("All ok - SERVER 200")
          document.getElementById("self_user_image").src = `https://03.memeguy21.repl.co/user-profiles/${localStorage.getItem("user")}.png`
        console.log('Image exists');
      } else {
        document.getElementById("self_user_image").src = `https://03.memeguy21.repl.co/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png`
        var elms = document.querySelectorAll("[id='pfpprofile']");
      document.getElementById("update_pfp_after_change").src = `https://03.memeguy21.repl.co/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png`
      for (var i = 0; i < elms.length; i++)
        elms[i].src = `https://03.memeguy21.repl.co/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png`
        console.log('Image does not exist');
      }
    });
    disconnected.play()
  } else {
    document.getElementById("status_server").innerHTML = "Αποσυνδεση?"
    document.getElementById("status_server").style.color = "red"
    sessionStorage.setItem("disc_temp", "here")

  }
  var time = setTimeout(function () {
    document.getElementById("status_server").innerHTML = "Συνδεδεμενοι"
    document.getElementById("status_server").style.color = "lime"
    sessionStorage.removeItem("disc_temp")
  }, 7000)
}
function loadserveremail() {
    setTimeout( function() {
        server_complete.play()
    }, 200)
    const url_EMAIL = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&email=${user}`;

fetch(url_EMAIL)
.then(response => response.text())
.then(data => {
    console.log(data)
//localStorage.setItem("auto_connect_database", true)
var elms = document.querySelectorAll("[id='profileemail']");
for (var i = 0; i < elms.length; i++)
    elms[i].innerHTML = data
    document.getElementById("check_email").innerHTML = `<i class="ri-edit-fill me-1 ms-0 align-middle"></i>Επεξεργασια`

})
.catch(error => console.error(error));
}

function setfavorite() {
    const favorite_contact = "1" //SET

    //SEND INFO TO SERVER

    fetch('https://ChatVia-Database.memeguy21.repl.co', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: user, //WHO IS SENDING INFO
        favorite: favorite_contact
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error(error);
    });


    //MAKE LOADING


    //SET NEW INFO

    const url = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&favorite=${user}`;

    fetch(url)
  .then(response => response.text())
  .then(data => {
    console.log(data)
  })
  .catch(error => console.error(error));
}

const messagesContainer = document.getElementById("mainchat");


for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes("saved_msg")) {
      const messageId = key.split("_")[2];
      console.log(messageId)
      const message = localStorage.getItem(key);
      const userKey = `saved_user_${messageId}`;
      const DateKey = `saved_date_${messageId}`;
      const date = localStorage.getItem(DateKey)
      const userid = localStorage.getItem(userKey);
  
      if (userid === null) {
        console.warn(`Missing user value for message ${messageId}`);
        continue; // skip this message if user value is missing
      }
  
      if(userid == localStorage.getItem("user")) {
        const messageElement = document.createElement("div");
      messageElement.innerHTML = `<li id="${messageId}" class="right">
            <div class="conversation-list">
              <div class="chat-avatar">
              <img src="https://03.memeguy21.repl.co/user-profiles/${userid}.png" alt="">
              </div>
  
              <div class="user-chat-content">
                <div class="ctext-wrap">
                  <div class="ctext-wrap-content">
                    <p class="mb-0">
                      ${message}
                    </p>
                    <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
                      <span class="align-middle">${date}</span>
                    </p>
                  </div>
                  <div class="dropdown align-self-start">
                    <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                      <i class="ri-more-2-fill"></i>
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="#">Αντιγραφη <i class="ri-file-copy-line float-end text-muted"></i></a>
                      <a class="dropdown-item" onclick="saveinchat(e)" href="#">Αποθηκευση <i class="ri-save-line float-end text-muted"></i></a>
                      <a class="dropdown-item" href="#">Προωθηση <i class="ri-chat-forward-line float-end text-muted"></i></a>
                      <a class="dropdown-item" onclick='document.getElementById("${messageId}").parentNode.removeChild(document.getElementById("${messageId}"));var keysToDelete = ["saved_user_${messageId}", "saved_date_${messageId}", "saved_msg_${messageId}"];for (var i = 0; i < keysToDelete.length; i++) {localStorage.removeItem(keysToDelete[i]);}' href="#">Διαγραφη <i class="ri-delete-bin-line float-end text-muted"></i></a>
                    </div>
                  </div>
                </div>
                <div class="conversation-name">${userid}</div>
              </div>
            </div>
          </li>`;
  
      // Append element to container
      messagesContainer.appendChild(messageElement);
      } else {
        // Create HTML elements for each message and user
      const messageElement = document.createElement("div");
      messageElement.innerHTML =`<li id="${messageId}" class="left">
      <div class="conversation-list">
        <div class="chat-avatar">
        <img src="https://03.memeguy21.repl.co/user-profiles/${userid}.png" alt="">
        </div>

        <div class="user-chat-content">
          <div class="ctext-wrap">
            <div class="ctext-wrap-content">
              <p class="mb-0">
                ${message}
              </p>
              <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
                <span class="align-middle">${date}</span>
              </p>
            </div>
            <div class="dropdown align-self-start">
              <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="ri-more-2-fill"></i>
              </a>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Αντιγραφη <i class="ri-file-copy-line float-end text-muted"></i></a>
                <a class="dropdown-item" onclick="saveinchat(e)" href="#">Αποθηκευση <i class="ri-save-line float-end text-muted"></i></a>
                <a class="dropdown-item" href="#">Προωθηση <i class="ri-chat-forward-line float-end text-muted"></i></a>
                <a class="dropdown-item" onclick='document.getElementById("${messageId}").parentNode.removeChild(document.getElementById("${messageId}"));var keysToDelete = ["saved_user_${messageId}", "saved_date_${messageId}", "saved_msg_${messageId}"];for (var i = 0; i < keysToDelete.length; i++) {localStorage.removeItem(keysToDelete[i]);}' href="#">Διαγραφη <i class="ri-delete-bin-line float-end text-muted"></i></a>
              </div>
            </div>
          </div>
          <div class="conversation-name">${userid}</div>
        </div>
      </div>
    </li>`;
  
      // Append element to container
      messagesContainer.appendChild(messageElement);
      }
  
      
    }
  }


function clear_saved_chat() {
    for (let key in localStorage) {
        if (key.includes("saved_msg_") || key.includes("saved_user_") || key.includes("saved_date_")) {
          localStorage.removeItem(key);
        }
      }
    clear_chat()
}

function dev_msg() {
  $('#mainchat').append(`<li class="left">
          <div class="conversation-list">
            <div class="chat-avatar">
            <img src="./images/system.png" alt="">
            </div>

            <div class="user-chat-content">
              <div class="ctext-wrap">
                <div class="ctext-wrap-content">
                  <p class="mb-0">
                    <a style="color: white" href="./update/index.html">Installing Update Screen</a><br>
                    <a style="color: white" href="./loader/index.html">Loader Old</a><br>
                    <a style="color: white" href="./loader-new/index.html">Loader</a>
                  </p>
                  <p class="chat-time mb-0"><i class="ri-time-line align-middle"></i>
                    <span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span>
                  </p>
                </div>
                <div class="dropdown align-self-start">
                  <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                    aria-expanded="false">
                    <i class="ri-more-2-fill"></i>
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Αντιγραφη <i class="ri-file-copy-line float-end text-muted"></i></a>
                    <a class="dropdown-item" onclick="saveinchat(e)" href="#">Αποθηκευση <i class="ri-save-line float-end text-muted"></i></a>
                    <a class="dropdown-item" href="#">Προωθηση <i class="ri-chat-forward-line float-end text-muted"></i></a>
                    <a class="dropdown-item" href="#">Διαγραφη <i class="ri-delete-bin-line float-end text-muted"></i></a>
                  </div>
                </div>
              </div>
              <div class="conversation-name">Συστημα</div>
            </div>
          </div>
        </li>`)
        update_found.play()
}

function removepfp() {
  const url = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&remove=${user}:pfp`;
  connected_to_server.play()
var elms = document.querySelectorAll("[id='pfpprofile']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].src = `./images/loading.svg`;
    }
    fetch(url)
  .then(response => response.text(
  ))
  .then(data => {
    if(data == "200") { //Server Responded Saying That pfp Has Been Deleted
      const url = `https://ChatVia-Database.memeguy21.repl.co?authorize=351c3669b3760b20615808bdee568f33&pfp=${user}`;

    fetch(url)
  .then(response => response.text())
  .then(data => {

    localStorage.setItem("pfpdata", data)
    document.getElementById("self_user_image").src = `data:image/png;base64,${data}`
    document.getElementById("update_pfp_after_change").src = `data:image/png;base64,${data}`
    var elms = document.querySelectorAll("[id='pfpprofile']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].src = `data:image/png;base64,${data}`;
    }
    calling.play()
  })
  .catch(error => console.error(error));
  document.getElementById("button_connect_database").style.display = "none"
  document.getElementById("text_connected_database").style.display = "block"
  
    } else {
      error_sound.play()
    }
  })
  .catch(error => console.error(error));
}

function go_to(where) {
  if(where == "profile") {
    document.getElementById("set1").click()
  } else if(where == "settings") {
    document.getElementById("set6").click()
  }
}

function error(msg) {
  $('#error_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./t50/socket-io.png" alt=""></div>
  <div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">
  ${msg}</p><p class="chat-time mb-0">
  <i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div>
  </div><div class="conversation-name">T50</div></div></div></li>`)
}

function cookies_reset() {
  function getPushalertCookie() {
    var cookies = document.cookie.split("; ");

    for (var i = 0; i < cookies.length; i++) {
      var cookieParts = cookies[i].split("=");
      var currentCookieName = cookieParts[0].trim();
      var cookieValue = decodeURIComponent(cookieParts[1]);

      // Check if the current cookie name contains the keyword "pushalert"
      if (currentCookieName.includes("pushalert")) {
        return { name: currentCookieName, value: cookieValue };
      }
    }

    // Return null if no cookie with the keyword is found
    return null;
  }

  // Get the cookie containing the keyword "pushalert" and log it to the console
  var pushalertCookie = getPushalertCookie();
  console.log(pushalertCookie);
  if(pushalertCookie === null) {
    document.getElementById("msg-cookie").innerHTML = `<br>No Push Notifications Registered. Delete All Cookies? <button class="btn btn-danger" onclick="deleteAllCookies()">Yes</button>&nbsp;<button class="btn btn-primary" onclick='$("#msg-cookie").fadeOut("slow")'>No</button>`
    $("#msg-cookie").fadeIn("slow")
    return;
  }

  // Extract the cookie name from the pushalertCookie object
  var cookieName = pushalertCookie ? pushalertCookie.name : null;
  console.log("Cookie Name:", cookieName);
  if(cookieName !== null) {
    document.getElementById("msg-cookie").innerHTML = `<br>You Will Stop Receiving Notifications If You Continue. Delete PushAlert Cookies?<br><button class="btn btn-danger" onclick="deleteCookie('${cookieName}')">Yes</button>&nbsp;<button class="btn btn-primary" onclick='$("#msg-cookie").fadeOut("slow")'>No</button>`
    $("#msg-cookie").fadeIn("slow")
    return;
  }
}

function deleteCookie(cookieName) {
  document.cookie = cookieName + "=; expires=Sat, 21 Jul 2007 00:00:00 UTC; path=/;";
  window.location.reload()
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  window.location.reload()
}


//if (isMobileDevice()) {
//  showNotification();
//}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function truncateString(inputString) {
  // Check if inputString is defined and not null
  if (inputString && inputString.length > 65) {
    return inputString.slice(0, 65) + "....";
  }
  // Return inputString as is if it's either undefined, null, or not longer than 65 characters
  return inputString;
}


function showNotification(user, msg) {
  var notification = $('#notification');
  msg_fixed = truncateString(msg)
  notification.html(`${user}:<br>${msg_fixed}`)
  notification.slideDown().animate({
      top: '20px'
  }, 500);

  setTimeout(function () {
      notification.animate({
          top: '-100px'
      }, 500, function () {
          notification.slideUp();
      });
  }, 3000); // Adjust the time (in milliseconds) the notification stays visible
}

function twofa() {
  document.getElementById("button_2fa").innerHTML = "Enabling"
  fetch('https://2fa-t50.memeguy21.repl.co/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: localStorage.getItem("user_email"), //is defined
                    password: JSON.parse(localStorage.getItem("account")).password
                  })
                })
                .then(response => response.text())
                .then(data => {
                  console.log(data)
                  if(data === "Exists") {
                    document.getElementById("button_2fa").innerHTML = "Enabled"
                  } else {
                    document.getElementById("secret").innerHTML = `<img id="qrcode" src="${data}"></img><br><button id="qrcodebut" onclick="hideqr()">Ok</button>`
                    $("#secret").fadeIn("slow")
                    document.getElementById("button_2fa").innerHTML = "Auth In Progress"
                  }
                  
                })
                .catch(error => {
                  console.error(error);
                });
}

function hideqr() {
  $("#qrcode").fadeOut("slow")
  $("#qrcodebut").fadeOut("slow")
  document.getElementById("button_2fa").innerHTML = "Ready"
}

fetch(`https://2fa-t50.memeguy21.repl.co/t50?email=${localStorage.getItem("user_email")}&method=check`)
        .then(response => response.text())
        .then(data => {
	      console.log("2FA", data)
        if(data === "Enabled") {
          document.getElementById("2fa_div").innerHTML = `<button id="button_2fa_enabled" onclick="disable2fa()" type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal"><b>Disable</b></button>`
        } else {
          console.log("Stopping Here")
        }
        })
        .catch(error => {
          console.error('Error:', error);
        });

function disable2fa() {
  document.getElementById("2fa_h5").innerHTML = "Sorry, Cannot Do That Now"
  setTimeout(function() {
    document.getElementById("2fa_h5").innerHTML = "Two Factor Authentication"
  }, 4000)
}