$( "#group" ).fadeIn( "slow")
let checkbox_1 = document.getElementById("checkbox_1")
let checkbox_2 = document.getElementById("checkbox_2")
let checkbox_3 = document.getElementById("checkbox_3")
let input_1 = document.getElementById("input_1")
let input_2 = document.getElementById("input_2")
let input_3 = document.getElementById("input_3")

let checkbox_4 = document.getElementById("checkbox_4")
let checkbox_5 = document.getElementById("checkbox_5")
let checkbox_6 = document.getElementById("checkbox_6")
let checkbox_7 = document.getElementById("checkbox_7")
let input_4 = document.getElementById("input_4")
let input_5 = document.getElementById("input_5")
let input_6 = document.getElementById("input_6")
let input_7 = document.getElementById("input_7")

let tile_1 = document.getElementById("input_1_tile")
let tile_2 = document.getElementById("input_2_tile")
let tile_3 = document.getElementById("input_3_tile")
let tile_4 = document.getElementById("input_4_tile")
let tile_5 = document.getElementById("input_5_tile")
let tile_6 = document.getElementById("input_6_tile")
let tile_7 = document.getElementById("input_7_tile")

let submit = document.getElementById("submit")
let sugar = document.getElementById("tea_sugar")

var sound = new Howl({
    src: ['sound.mp3']
  });

var remove = new Howl({
    src: ['remove_coffee.mp3']
});

var add = new Howl({
    src: ['add.mp3']
});

var error_sound = new Howl({
    src: ['error.mp3']
});


var disabled = new Howl({
    src: ['disabled.mp3']
});

var call = new Howl({
    src: ['call.mp3']
});

var success = new Howl({
    src: ['success.mp3']
});

var done = new Howl({
    src: ['done.mp3']
});

var done_second = new Howl({
    src: ['done_second.mp3']
});


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

function send(product) {
    console.log("request starting")
	const formData = new FormData();
    if(localStorage.getItem("debug") != null) {
        formData.append('product', `${product} [TESTING]`);
    } else {
        formData.append('product', product);
    }
    console.log("Sending",product, formData)

	//const formData = new FormData(document.querySelector('form'));
	//console.log(formData)

	fetch('http://localhost:5000/evox', {
  method: 'POST',
  body: formData
})
.then(response => {
    document.getElementById("back").setAttribute("onclick", "reload_page()");
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
    document.getElementById("back").setAttribute("onclick", "reload_page()");
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

function check1_click() {
    if(input_1.checked) {
        console.log("Input 1 is checked")
        document.getElementById("tea_type").innerHTML = "chamomile"
        add.play()
        disable(input_2, input_3)
        if(input_4.checked || input_5.checked || input_6.checked|| input_7.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 1 is not checked")
        document.getElementById("tea_type").innerHTML = "tea"
        remove.play()
        enable(input_2, input_3)
        $( "#submit" ).fadeOut( "5000")
    }
}

function check2_click() {
    if(input_2.checked) {
        console.log("Input 2 is checked")
        document.getElementById("tea_type").innerHTML = "green tea"
        add.play()
        disable(input_1, input_3)
        if(input_4.checked || input_5.checked || input_6.checked|| input_7.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 2 is not checked")
        remove.play()
        document.getElementById("tea_type").innerHTML = "tea"
        enable(input_1, input_3)
        $( "#submit" ).fadeOut( "5000")
    }
}

function check3_click() {
    if(input_3.checked) {
        console.log("Input 3 is checked")
        document.getElementById("tea_type").innerHTML = "mountain tea"
        add.play()
        disable(input_1, input_2)
        if(input_4.checked || input_5.checked || input_6.checked|| input_7.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 3 is not checked")
        remove.play()
        document.getElementById("tea_type").innerHTML = "tea"
        enable(input_1, input_2)
        $( "#submit" ).fadeOut( "5000")
    }
    
}


function check4_click() {
    if(input_4.checked) {
        console.log("Input 4 is checked")
        add.play()
        sugar.innerHTML = "sugar free"
        dis(input_5, input_6, input_7)
        if(input_1.checked || input_2.checked || input_3.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 4 is not checked")
        remove.play()
        sugar.innerHTML = ""
        en(input_5, input_6, input_7)
        $( "#submit" ).fadeOut( "5000")
    }
}

function check5_click() {
    if(input_5.checked) {
        console.log("Input 5 is checked")
        add.play()
        sugar.innerHTML = "medium"
        dis(input_4, input_6, input_7)
        if(input_1.checked || input_2.checked || input_3.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 5 is not checked")
        remove.play()
        sugar.innerHTML = ""
        en(input_4, input_6, input_7)
        $( "#submit" ).fadeOut( "5000")
    }
}

function check6_click() {
    if(input_6.checked) {
        console.log("Input 6 is checked")
        add.play()
        sugar.innerHTML = "sweet"
        dis(input_4, input_5, input_7)
        if(input_1.checked || input_2.checked || input_3.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 6 is not checked")
        remove.play()
        sugar.innerHTML = ""
        en(input_4, input_5, input_7)
        $( "#submit" ).fadeOut( "5000")
    }
    
}

function check7_click() {
    if(input_7.checked) {
        console.log("Input 7 is checked")
        add.play()
        sugar.innerHTML = "honey with"
        dis(input_4, input_5, input_6)
        if(input_1.checked || input_2.checked || input_3.checked) {
            $( "#submit" ).fadeIn( "5000")
        }
    } else {
        console.log("Input 7 is not checked")
        remove.play()
        sugar.innerHTML = ""
        en(input_4, input_5, input_6)
        $( "#submit" ).fadeOut( "5000")
    }
    
}


function disable(elem1, elem2) {
    elem1.disabled = true
    elem2.disabled = true
}

function dis(elem1, elem2, elem3) {
    elem1.disabled = true
    elem2.disabled = true
    elem3.disabled = true
}

function enable(elem1, elem2) {
    elem1.disabled = false
    elem2.disabled = false
}

function en(elem1, elem2, elem3) {
    elem1.disabled = false
    elem2.disabled = false
    elem3.disabled = false
}

function slideBox() {
    setTimeout(function () {
        var box = document.querySelector('.checkbox-group');
    box.style.transform = 'translateY(-900px)';
    add.play()
    }, 500)
  }

  input_1_tile.addEventListener("click", function(event) {
    if (input_1.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  input_2_tile.addEventListener("click", function(event) {
    if (input_2.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  input_3_tile.addEventListener("click", function(event) {
    if (input_3.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  input_4_tile.addEventListener("click", function(event) {
    if (input_4.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  input_5_tile.addEventListener("click", function(event) {
    if (input_5.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  input_6_tile.addEventListener("click", function(event) {
    if (input_6.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  input_7_tile.addEventListener("click", function(event) {
    if (input_7.disabled) {
      event.preventDefault();
      disabled.play()
      console.log("Button is disabled");
      return;
    }
    console.log("Button is enabled");
    // Your code here for when the button is enabled and clicked
  });

  function submit_call() {
    $( "#group" ).fadeOut( "slow", function() {
        $("#loader").fadeIn("slow")
      });
      $("#loading").fadeIn("slow", function() {
        $("#loading").fadeOut("slow")
    })
    call.play()
    setTimeout(function() {
        if(input_1.checked) {
            const product = "Chamomile"
            if(input_4.checked) {
                const sugar = "Sugar Free"
                send(`${sugar} ${product}`)
            } else if(input_5.checked) {
                const sugar = "Medium"
                send(`${sugar} ${product}`)
            }   else if(input_6.checked) {
                const sugar = "Sweet"
                send(`${sugar} ${product}`)
            }   else if(input_7.checked) {
                const sugar = "Honey With"
                send(`${sugar} ${product}`)
            }
        } else if(input_2.checked) {
            const product = "Green Tea"
            if(input_4.checked) {
                const sugar = "Sugar Free"
                send(`${sugar} ${product}`)
            } else if(input_5.checked) {
                const sugar = "Medium"
                send(`${sugar} ${product}`)
            }   else if(input_6.checked) {
                const sugar = "Sweet"
                send(`${sugar} ${product}`)
            }   else if(input_7.checked) {
                const sugar = "Honey With"
                send(`${sugar} ${product}`)
            }
        } else if(input_3.checked) {
            const product = "Mountain Tea"
            if(input_4.checked) {
                const sugar = "Sugar Free"
                send(`${sugar} ${product}`)
            } else if(input_5.checked) {
                const sugar = "Medium"
                send(`${sugar} ${product}`)
            }   else if(input_6.checked) {
                const sugar = "Sweet"
                send(`${sugar} ${product}`)
            }   else if(input_7.checked) {
                const sugar = "Honey With"
                send(`${sugar} ${product}`)
            }
        }
//        setTimeout(function() {
//            var body = document.getElementsByTagName("body")[0];
//var interval = setInterval(function() {
//  var computedStyle = getComputedStyle(body);
//  var currentColor = computedStyle.backgroundColor;
//  var currentOpacity = parseInt(currentColor.slice(-4,-1));
//  if(currentOpacity > 0) {
//    body.style.backgroundColor = "rgba(237, 237, 237," + (currentOpacity - 0.01) + ")";
//  } else {
//    clearInterval(interval);
//  }
//}, 10);
//        }, 2000)
    }, 3000)
  }

  function return_index() {
    $("#loading").fadeIn("slow")
    $("#denied").fadeOut("slow")
    $("#denied").fadeOut("loader")
    var body = document.getElementsByTagName("body")[0];
    body.style.backgroundColor = "#f8f8f9"
    sessionStorage.setItem("reload",true)
    $("#group").fadeOut("slow")
    $("#animation").fadeOut("slow")
    $("#back").fadeOut("fast")
    done.play()
    setTimeout(function() {
        window.location.href = "index.html"
    }, 2000)
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
    $("#back").fadeOut("fast")
    done_second.play()
    setTimeout(function() {
        window.location.reload()
    }, 2000)
  }