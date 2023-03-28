var notyf = new Notyf();
sessionStorage.removeItem("input-text-chat-2")
sessionStorage.removeItem("input-text")
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    //Client On Mobile
    console.log("Client On Mobile")
} else{
    setTimeout( function () {
        document.getElementById("emoji").click()
        document.getElementById("emoji").focus();
    }, 5000)
} 
document.getElementById("pfp_download").href = `https://03.memeguy21.repl.co/user-profiles/${user}.png`
document.getElementById("profile_pfp_download").src = `https://03.memeguy21.repl.co/user-profiles/${user}.png`
sessionStorage.setItem("music", "inactive")
sessionStorage.removeItem("playing")


window.addEventListener("load", (event) => {
    if (!user) {
        window.location.href = "./Login-Files/login.html"
        return;
    }
    $("#loaderframe").fadeOut("fast");
    $("#chatvia_full").fadeIn("slow");
    console.log("loaded")
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
        sessionStorage.setItem("chat", "Γρηγορης")
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
        document.getElementById("user-info-text").innerHTML = "Βιογραφικο Χρηστη"
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
    sessionStorage.setItem("chat", "Γρηγορης")
    document.getElementById("unread_chat").style.display = "none"
    $("#download_files").fadeOut("fast");
    //document.getElementById("download_files").style.display = "none"
    localStorage.setItem("chat_2_read", "true");
    document.getElementById("video_call_name").innerHTML = "Γρηγορης"
    document.getElementById("pfp_video").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
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
    document.getElementById("user-name").innerHTML = "Γρηγορης"
    document.getElementById("user-image").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
    document.getElementById("mainchat").style.display = "none"
    $("#secondchat").fadeIn("fast");
    //document.getElementById("secondchat").style.display = "block"
    document.getElementById("user-info-image").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
    document.getElementById("user-info-name").innerHTML = "Γρηγορης"
    document.getElementById("user-info-text").innerHTML = "Βιογραφικο Χρηστη"
    document.getElementById("profilename1").innerHTML = "Γρηγορης"
    document.getElementById("user-info-email").innerHTML = `gregpap03@gmail.com`
    document.getElementById("user-info-location").innerHTML = `Αθηνα, Ελλαδα`
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε Γρηγορης</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
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
    document.getElementById("video_call_name").innerHTML = "Διακομιστης"
    document.getElementById("start_video_call" ).setAttribute( "onClick", "startcall();" );
    document.getElementById("pfp_video").src = "images/socket-io.png"
    document.getElementById("general_setactive").classList.remove("active");
    document.getElementById("error_logs").style.display = "none"
    document.getElementById("general_logs").style.display = "none"
    document.getElementById("changechat2").classList.remove("unread");
    document.getElementById("changechat2").classList.add("active");
    document.getElementById("changechat1").classList.remove("active");
    document.getElementById("user-name").innerHTML = "Διακομιστης"
    document.getElementById("user-image").src = "images/socket-io.png"
    $("#mainchat").fadeIn("fast");
    //document.getElementById("mainchat").style.display = "block"
    document.getElementById("secondchat").style.display = "none"
    document.getElementById("user-info-image").src = "images/socket-io.png"
    document.getElementById("user-info-name").innerHTML = "Διακομιστης"
    document.getElementById("user-info-text").innerHTML = `Λογαριασμος Διακομιστη #01506<br>Το συγκεκριμενο προφιλ απαντα αυτοματα και
                δεν ειναι αληθινος χρηστης. Ετσι βλεπετε οταν χρηστες συνδεονται/αποσυνδεονται απο τον
                διακομιστη και αλλα.`
    document.getElementById("profilename1").innerHTML = "Διακομιστης"
    document.getElementById("user-info-email").innerHTML = `server01506@twentyonecore.com`
    document.getElementById("user-info-location").innerHTML = `Κάνσας, ΗΠΑ`
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε επιστροφη στην αρχικη συνομιλια</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
}

var current_emoji = localStorage.getItem("emoji")
if(current_emoji === "😂") {
    document.getElementById("emoji_1").style.color = "lime"
} else if(current_emoji === "😢") {
    document.getElementById("emoji_2").style.color = "lime"
} else if(current_emoji === "😊") {
    document.getElementById("emoji_3").style.color = "lime"
} else if(current_emoji === "❤️") {
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
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε 😂</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
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
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε 😢</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
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
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε 😊</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
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
        $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Η φατσουλα αλλαξε σε ❤️</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
    }
}

function showgeneral() {
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
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε #Γενικα</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
}

function showerrors() {
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
    $('#general_logs').append(`<li class="left"><div class="conversation-list"><div class="chat-avatar"><img src="images/socket-io.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0">Εγινε αλλαγη συνομιλιας σε #Σφαλματα</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Διακομιστης</div></div></div></li>`)
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
        $('#mainchat').append(`<li id="notification_offline" class="left"><div class="conversation-list"><div class="chat-avatar"><img src="./images/system.png" alt=""></div><div class="user-chat-content"><div class="ctext-wrap"><div class="ctext-wrap-content"><p class="mb-0"><h4 style="color: lightcoral">Προσοχη!</h4>Η Συνδεση Με Τον Διακομιστη Σταματησε!<br>Τα Μηνυματα Που Πληκτρολογησετε Απο Τωρα Θα Αποθηκευθουν Για Αποστολη Μεχρι Να Επιστρεψει Η Συνδεση Με Τον Διακομιστη!</p><p class="chat-time mb-0"><i class="ri-time-line align-middle"></i><span class="align-middle">${new Date().getHours() + ":" + new Date().getMinutes()}</span></p></div><div class="dropdown align-self-start"><a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="ri-more-2-fill"></i></a><div class="dropdown-menu"><a class="dropdown-item" href="#">Copy <i class="ri-file-copy-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Save <i class="ri-save-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Forward <i class="ri-chat-forward-line float-end text-muted"></i></a><a class="dropdown-item" href="#">Delete <i class="ri-delete-bin-line float-end text-muted"></i></a></div></div></div><div class="conversation-name">Συστημα</div></div></div></li>`)
        error_sound.play()
        socket.disconnect()
        console.log("Offline")
    }
}

function report() {
    window.location.href = "./gfdgd"
    $("#report").fadeIn("fast");
}

$('#report').bind('keyup', function(e) {
    if (e.keyCode === 13) {
        report_sent.play()
        downloadlatest()
        $("#report").fadeOut("fast");
        notyf.success('Γινεται επιλυση σφαλματων..');

        const rep = new XMLHttpRequest();
		rep.open("POST", "https://discord.com/api/webhooks/1043238999537483877/MxrPRhDtbBA7ET_dhgccuIuJYRgJD3q_BuSaE0hUDjPUq2FIISDFkvuYsLhiozSLefo8");
		rep.setRequestHeader('Content-type', 'application/json');
		const params = {
			username: "Νεα Αναφορα",
			avatar_url: "",
			content: `${documen.getElementById("report").value} | user: ${user}}`
		}
		rep.send(JSON.stringify(params));
    } else if(e.keyCode == 27) {
        $("#report").fadeOut("fast");
    }
})

function private_chats_on_off() {
     var checkBox = document.getElementById("private_chats_setting");
     if (checkBox.checked === true){
        document.getElementById("changechat1").style.display = "block"
        localStorage.setItem("private_chats", "on")
        notyf.success('Οι προσωπικες συνομιλιες ενεργοποιηθηκαν');
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
        } else if(user === "Γρηγορης") {
          sessionStorage.setItem("connect_with", "GREGORY")
        }
    window.location.href = "index.ejs"
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
    document.getElementById('hidetoshowothers').style.display = 'none'
    document.getElementById('change_chatting_user_elem').style.display = 'none'
    document.getElementById("liked_songs").style.display = "none"
    if(localStorage.getItem("user_email") != null) {
        document.getElementById("updaterequired").click()
        document.getElementById("hidetoshowothers").style.display = "none"
        document.getElementById("dropdown34").style.display = "block"
        document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place">
        <div class="mb-3">
            <label for="updatemail" class="form-label">Επεξεργασια Email</label>
            <input type="email" class="form-control" value="${localStorage.getItem("user_email")}" id="updatemail"
              placeholder="Πληκτρολογηστε Email">
          </div>
          <button onclick="updateemail()" style="color: lime" type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal"><b>Εφαρμογη</b></button>&nbsp;
        <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Ακυρωση</button>
        </div>`
    } else {
        document.getElementById("updaterequired").click()
        document.getElementById("dropdown34").style.display = "block"
    document.getElementById("hidetoshowothers").style.display = "none"
    document.getElementById("dropdown34").innerHTML = `<div id="add_edit_email_place"><div class="mb-3">
                          <label for="updatemail" class="form-label">Προσθηκη Email</label>
                          <input type="email" class="form-control" id="updatemail"
                            placeholder="Πληκτρολογηστε Email">
                        </div>
                        <button onclick="updateemail()" style="color: lime" type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal"><b>Εφαρμογη</b></button>&nbsp;
                  <button type="button" id="email_dismiss" class="btn btn-light btn-sm" data-bs-dismiss="modal">Ακυρωση</button></div>`
    }
    

}

function updateemail() {
        localStorage.setItem('user_email', document.getElementById('updatemail').value);
    var elms = document.querySelectorAll("[id='profileemail']");
	for (var i = 0; i < elms.length; i++)
		elms[i].innerHTML = localStorage.getItem("user_email")
        document.getElementById("check_email").innerHTML = `<i class="ri-edit-fill me-1 ms-0 align-middle"></i>Επεξεργασια`
    
    //updatemail
    console.log(document.getElementById('updatemail').value)
    
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
    document.getElementById('change_chatting_user_elem').style.display = 'block'
    if(document.getElementById('add_edit_email_place')) {
        document.getElementById('add_edit_email_place').style.display = 'none'
    }
    current_name = user
    if(current_name == "Γρηγορης") { 
        document.getElementById("memberLabel2").style.color = "red";
        document.getElementById("memberCheck2").disabled = true;
    } else if(current_name == "Αλεξια") {
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
        if(favorite_now == "Γρηγορης") { 
            document.getElementById("memberCheck2").checked = true;
        } else if(favorite_now == "Αλεξια") {
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
        document.getElementById("chat_2_user_pfp").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
        document.getElementById("change_chatting_user_username").innerHTML = "Γρηγορης"
        document.getElementById("first_letter_contacts").innerHTML = "Γ"
        document.getElementById("contact_name_change").innerHTML = "Γρηγορης"
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
        if(user != "Αλεξια") {
            localStorage.setItem("contact_favorite_url", "https://03.memeguy21.repl.co/user-profiles/Αλεξια.png")
            localStorage.setItem("contact_favorite_name", "Αλεξια")
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
        if(user != "Γρηγορης") {
            localStorage.setItem("contact_favorite_url", "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png")
            localStorage.setItem("contact_favorite_name", "Γρηγορης")
            document.getElementById("chat_2_user_pfp").src = localStorage.getItem("contact_favorite_url")
            document.getElementById("change_chatting_user_username").innerHTML = localStorage.getItem("contact_favorite_name")
            let firstLetter = localStorage.getItem("contact_favorite_name").charAt(0);
            document.getElementById("first_letter_contacts").innerHTML = firstLetter
            document.getElementById("contact_name_change").innerHTML = localStorage.getItem("contact_favorite_name")
        } else {
            not_ready.play()
        }
        //Γρηγορης is checked
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
var file = `https://03.memeguy21.repl.co/evox/music_${user}.json`
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
}

window.addEventListener('keydown', event => {
  if (event.ctrlKey && event.shiftKey && event.key === 'W') {
    window.location.href = './dist/secondshitforwebcam.html';
  }
});