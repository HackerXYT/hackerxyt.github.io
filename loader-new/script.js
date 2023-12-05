//let dots = document.getElementsByClassName('loading-dot');
//function startLoad(){
//  Array.prototype.forEach.call(dots, function(el,index){
//    dots[index].style.display = "none";
//    setTimeout(function(){
//      dots[index].style.display = "inline-block";
//    },1000 + (1000 * index))
//  })
//}
//startLoad();
//setInterval(startLoad,4000)
const text = document.getElementById("loading-text")
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
//const stage = urlParams.get('stage')
//if(stage == 1) {
//  text.innerHTML = "Περιβαλλον Χρηστη Ετοιμο"
//}

setInterval(() => {
  //const stage = sessionStorage.getItem("stage")
  //if(stage == 1) {
  //  text.style.color = "white"
  //  text.innerHTML = "Περιβαλλον&nbsp;Χρηστη&nbsp;Ετοιμο!<br>Γινεται&nbsp;Συνδεση&nbsp;Με&nbsp;Διακομιστη.."
  //} else if(stage == 2) {
  //  text.style.color = "white"
  //  text.innerHTML = "Ελεγχος&nbsp;Για&nbsp;Ενημερωση.."
  //} else if(stage == 3) {
  //  text.style.color = "white"
  //  text.innerHTML = "Επιτυχης&nbsp;Συνδεση&nbsp;Με&nbsp;Διακομιστη!"
  //} else if(stage == 4) {
  //  //text.innerHTML = "Σφαλμα&nbsp;Συνδεσης,&nbsp;Ελεγξτε&nbsp;Την&nbsp;Συνδεση&nbsp;Σας."
  //  text.style.color = "#ff230f"
  //  text.innerHTML = "Η&nbsp;σύνδεση&nbsp;με&nbsp;τον&nbsp;διακομιστή&nbsp;απετυχε,&nbsp;δοκιμάστε&nbsp;ξανά&nbsp;αργότερα."
  //}

  
  //document.getElementById("reload-button").style.display = "none"
  if(sessionStorage.getItem("stage_window") == 200) {
    text.style.color = "white"
    text.innerHTML = `Περιβαλλον&nbsp;Χρηστη&nbsp;Ετοιμο!<br>Γινεται&nbsp;Συνδεση&nbsp;Με&nbsp;Διακομιστη..`
  }
  if(sessionStorage.getItem("stage_srv") == 200) {
    text.style.color = "white"
    text.innerHTML = `Επιτυχης&nbsp;Συνδεση&nbsp;Με&nbsp;Διακομιστη!<br>Εκκίνηση..<!--<div class="loading loading--dots" title="Loading"><svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     viewBox="0 0 512 512" xml:space="preserve">
    <path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952
      s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
      <animate
             attributeName="fill"
             dur="3s"
             begin="0s"
             repeatCount="indefinite"
             values="#000000;
                     #f3f3f3;
                     #000000;"/>
    </path>
    <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
      s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
             attributeName="fill"
             dur="3s" 
             begin="1s"
             repeatCount="indefinite"
             values="#000000;
                     #f3f3f3;
                     #000000;"/>
    </path>
    <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
      S512,289.609,512,256S484.657,195.048,451.048,195.048z">
            <animate
             attributeName="fill"
             dur="3s" 
             begin="2s"
             repeatCount="indefinite"
             values="#000000;
                     #f3f3f3;
                     #000000;"/>
    </path>
  </svg></div>-->`
  }
  if(sessionStorage.getItem("stage") == 4) {
    //text.innerHTML = "Σφαλμα&nbsp;Συνδεσης,&nbsp;Ελεγξτε&nbsp;Την&nbsp;Συνδεση&nbsp;Σας."
    text.style.color = "#ff230f"
    text.innerHTML = "Η&nbsp;σύνδεση&nbsp;με&nbsp;τον&nbsp;διακομιστή&nbsp;απετυχε,<br>&nbsp;δοκιμάστε&nbsp;ξανά&nbsp;αργότερα."
    //document.getElementById("reload-button").style.display = "block"
  } else if(sessionStorage.getItem("stage") == 5) {
    text.style.color = "#ff230f"
    text.innerHTML = "Εγινε&nbsp;Αποσυνδεση&nbsp;Απο&nbsp;Τον&nbsp;Διακομιστη.&nbsp;<br>Ελεγξτε&nbsp;Την&nbsp;Συνδεση&nbsp;Σας&nbsp;Στο&nbsp;Διαδικτυο."
  }
  if(sessionStorage.getItem("stage") == "00") {
    text.style.color = "#ad1c40"
    text.innerHTML = "Unauthorized&nbsp;access&nbsp;to&nbsp;T50&nbsp;is&nbsp;restricted due&nbsp;to&nbsp;user&nbsp;non-compliance."
    // Get the SVG element
var svgElement = document.getElementById("load_icon");

// Get all circle elements inside the SVG
var circles = svgElement.getElementsByTagName("circle");

// Set the fill color for each circle
for (var i = 0; i < circles.length; i++) {
  circles[i].setAttribute("fill", "#ad1c40");
}
  } else if(sessionStorage.getItem("stage") == "22") {
    text.style.color = "#b84333"
    text.innerHTML = "Authorizing&nbsp;Client&nbsp;For&nbsp;T50"
    // Get the SVG element
var svgElement = document.getElementById("load_icon");

// Get all circle elements inside the SVG
var circles = svgElement.getElementsByTagName("circle");

// Set the fill color for each circle
for (var i = 0; i < circles.length; i++) {
  circles[i].setAttribute("fill", "#b84333");
}
  } else {
    // Get the SVG element
var svgElement = document.getElementById("load_icon");

// Get all circle elements inside the SVG
var circles = svgElement.getElementsByTagName("circle");

// Set the fill color for each circle
for (var i = 0; i < circles.length; i++) {
  circles[i].setAttribute("fill", "#fff");
}
  }
}, 10);
setTimeout( function () {
  if(sessionStorage.getItem("stage_srv") == null && sessionStorage.getItem("stage_window") == 200) {
    sessionStorage.setItem("stage", 4)
  }
}, 10000)