$("#group").fadeIn("slow")
  
if(sessionStorage.getItem("reload") == "true") {
    sessionStorage.removeItem("reload")
    setTimeout(function () {
        $("#loading").fadeOut("slow")
    }, 1000)
} else {
    $("#loading").fadeOut("slow")
    setTimeout(function () {
        $("#loading").fadeOut("slow")
    }, 700)
}
let checkbox_1 = document.getElementById("checkbox_1")
let checkbox_2 = document.getElementById("checkbox_2")
let checkbox_3 = document.getElementById("checkbox_3")
let input_1 = document.getElementById("input_1")
let input_2 = document.getElementById("input_2")
let input_3 = document.getElementById("input_3")

function send() {
    console.log("request starting")
	const formData = new FormData();
    if(localStorage.getItem("debug") != null) {
        formData.append('product', `Νερό [TESTING]`);
    } else {
        formData.append('product', 'Νερό');
    }

	//const formData = new FormData(document.querySelector('form'));
	//console.log(formData)

	fetch('https://notificationsystem.memeguy21.repl.co/evox', {
  method: 'POST',
  body: formData
})
.then(response => {
    $("#loading").fadeOut("slow")
    $("#back").fadeIn("slow")
    success.play()
        document.getElementById("animation").style.display = "none"
        document.getElementById("animation").innerHTML = `<svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
        <path class="checkmark__check" fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
      </svg><br><p class="text-container">Your order is on the way!</p>
`       
$("#loader").fadeOut("fast", function() {
    $("#animation").fadeIn("slow")
})
  console.log('Success:', response);
})
.catch(error => {
    $("#back").fadeIn("slow")
    $("#loading").fadeOut("slow")
    let stringValue = error.toString();
    if(stringValue.includes("Failed")) {
        document.getElementById("denied").innerHTML = `<div class="animation-ctn">
        <div class="icon icon--order-success svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">  
              <g fill="none" stroke="#F44812" stroke-width="2"> 
                <circle cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                <circle id="colored" fill="#F44812" cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                <polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8  112.2,77.8 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px;"/>   
              </g> 
            </svg>
            <p class="text-container">Server Closed: Access Denied</p>
          </div>
    </div>`
        $("#loader").fadeOut("fast", function() {
            error_sound.play()
            $("#denied").fadeIn("slow")
        })
    } else {
        document.getElementById("denied").innerHTML = `<div class="animation-ctn">
        <div class="icon icon--order-success svg">
            <svg xmlns="http://www.w3.org/2000/svg" width="154px" height="154px">  
              <g fill="none" stroke="#F44812" stroke-width="2"> 
                <circle cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                <circle id="colored" fill="#F44812" cx="77" cy="77" r="72" style="stroke-dasharray:480px, 480px; stroke-dashoffset: 960px;"></circle>
                <polyline class="st0" stroke="#fff" stroke-width="10" points="43.5,77.8  112.2,77.8 " style="stroke-dasharray:100px, 100px; stroke-dashoffset: 200px;"/>   
              </g> 
            </svg>
            <p class="text-container">Unknown Error: Access Denied</p>
          </div>
    </div>`
        $("#loader").fadeOut("fast", function() {
            error_sound.play()
            $("#denied").fadeIn("slow")
        })
    }
  console.error('Error:', error);
});
}

var sound = new Howl({
    src: ['sound.mp3']
  });

var remove = new Howl({
    src: ['remove_coffee.mp3']
});

var add = new Howl({
    src: ['add.mp3']
});

var disabled = new Howl({
    src: ['disabled.mp3']
});

var error_sound = new Howl({
    src: ['error.mp3']
});

var done = new Howl({
    src: ['done.mp3']
});

var call = new Howl({
    src: ['call.mp3']
});

var success = new Howl({
    src: ['success.mp3']
});

function check1_click() {
    if(input_1.checked) {
        console.log("Input 1 is checked")
        disable(input_2, input_3)
        $( "#group" ).fadeOut( "slow", function() {
            $("#loader").fadeIn("slow")
          });
        send()
        slideBox(1)
    } else {
        console.log("Input 1 is not checked")
        enable(input_2, input_3)
    }
}

function check2_click() {
    if(input_2.checked) {
        console.log("Input 2 is checked")
        disable(input_1, input_3)
        slideBox()
        setTimeout(function () {
            window.location.href = "./index-coffee.html"
        }, 1000)
    } else {
        console.log("Input 2 is not checked")
        enable(input_1, input_3)
    }
}

function check3_click() {
    if(input_3.checked) {
        console.log("Input 3 is checked")
        disable(input_1, input_2)
        slideBox()
        setTimeout(function () {
            window.location.href = "./index-tea.html"
        }, 1000)
    } else {
        console.log("Input 3 is not checked")
        enable(input_1, input_2)
    }
    
}

function disable(elem1, elem2) {
    elem1.disabled = true
    elem2.disabled = true
}

function enable(elem1, elem2) {
    elem1.disabled = false
    elem2.disabled = false
}
function slideBox(num) {
    setTimeout(function () {
        input_1.checked = false
        input_2.checked = false
        input_3.checked = false 
    }, 1000)
    $("#loading").fadeIn("fast")
    setTimeout(function () {
        var box = document.querySelector('.checkbox-group');
    box.style.transform = 'translateY(-900px)';
        sound.play()
    }, 500)
  }

  
  function reload_page() {
    $("#loading").fadeIn("slow")
    $("#denied").fadeOut("slow")
    $("#denied").fadeOut("loader")
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "#f8f8f9"
    sessionStorage.setItem("reload",true)
    $("#group").fadeOut("slow")
    $("#animation").fadeOut("slow")
    $("#back").fadeOut("slow")
    done.play()
    setTimeout(function() {
        window.location.reload()
    }, 2000)

  }