if(localStorage.getItem("contact_favorite_name") != null) {
    document.getElementById("chat_2_user_pfp").src = localStorage.getItem("contact_favorite_url")
    document.getElementById("change_chatting_user_username").innerHTML = localStorage.getItem("contact_favorite_name")
    let firstLetter = localStorage.getItem("contact_favorite_name").charAt(0);
    document.getElementById("first_letter_contacts").innerHTML = firstLetter
    document.getElementById("contact_name_change").innerHTML = localStorage.getItem("contact_favorite_name")
}

function remove_favorites() {
    if(localStorage.getItem("contact_favorite_name") != null) {
        localStorage.removeItem("contact_favorite_name")
        localStorage.removeItem("contact_favorite_url")
        document.getElementById("chat_2_user_pfp").src = "https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/Γρηγορης.png"
        document.getElementById("change_chatting_user_username").innerHTML = "Γρηγορης"
        document.getElementById("first_letter_contacts").innerHTML = "Γ"
        document.getElementById("contact_name_change").innerHTML = "Γρηγορης"
        calling.play()
    } else {
        failed.play()
    }
}


function encodeImageToBase64() {
    const input = document.getElementById('imageFileInput');
    const file = input.files[0];
  
    const reader = new FileReader();
    reader.onload = () => {
      const base64Text = reader.result.split(',')[1];
      base64Temp = base64Text

      //console.log(base64Temp)
      socket.emit('message', {
        user: `${localStorage.getItem("user") || 'Ανωνυμος'}`,
        message: `data:image/png;base64,${base64Text}`
    });
    };

    message_sent.play()
    reader.readAsDataURL(file);
  }


function writeimage() {
    const image = new Image();

// Set the src attribute to the base64-encoded image string
image.src = "data:image/png;base64," + Base64Value;

// When the image has loaded, do something with it
image.onload = function() {
  // You can now access the image using the 'image' variable
  // For example, you could add it to the DOM:
  document.body.appendChild(image);
}
}

function count() {
  let count = 0;
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  if (key.startsWith("saved_song_")) {
    count++;
  }
}
document.getElementById("count").innerHTML = count
}
count()

if(localStorage.getItem("auto_connect_database") == "true") {
  document.getElementById("database_toggle").innerHTML = `<i class="ri-database-2-fill"></i>`
}
function database_on_off() {
  var toggle = document.getElementById("database_toggle")
  var database = localStorage.getItem("auto_connect_database")
  if(database != "true") {
    //Turn Database On
    toggle.innerHTML = `<i class="ri-database-2-fill"></i>`
    loadserver()
  } else if(database == "true") {
    //Turn Database Off
    document.getElementById("text_connected_database").style.display = "none"
    document.getElementById("button_connect_database").style.display = "block"
    toggle.innerHTML = `<i class="ri-database-2-line"></i>`
    localStorage.removeItem("auto_connect_database")
    checkImage(`https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/${localStorage.getItem("user")}.png`, function(exists) {
      if (exists) {
        console.log("All ok - SERVER 200")
          document.getElementById("self_user_image").src = `https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/${localStorage.getItem("user")}.png`
        console.log('Image exists');
      } else {
        document.getElementById("self_user_image").src = `https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png`
        var elms = document.querySelectorAll("[id='pfpprofile']");
      document.getElementById("update_pfp_after_change").src = `https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png`
      for (var i = 0; i < elms.length; i++)
        elms[i].src = `https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png`
        console.log('Image does not exist');
      }
    });
    disconnected.play()
  }
}

setInterval(function () {
  // Get all images on the page
  var allImages = document.querySelectorAll('img');

  // Iterate through each image
  allImages.forEach(function (img) {
      // Set an onerror event handler to detect 404 errors
      img.onerror = function () {
          // Replace the source with the specified URL
          img.src = 'https://7b7d38f4-3236-41bf-9c59-3a2a57fbc58d-00-1ws109ztxf2ow.worf.replit.dev/user-profiles/%CE%95%CF%80%CE%B9%CF%83%CE%BA%CE%B5%CF%80%CF%84%CE%B7%CF%82.png';
      };
  });
}, 1000); // Run every 1000 milliseconds (1 second)
