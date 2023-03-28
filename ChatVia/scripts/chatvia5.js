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
        document.getElementById("chat_2_user_pfp").src = "https://03.memeguy21.repl.co/user-profiles/Γρηγορης.png"
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