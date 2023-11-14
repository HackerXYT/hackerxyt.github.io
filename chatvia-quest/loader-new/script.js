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
    text.innerHTML = "Επιτυχης&nbsp;Συνδεση&nbsp;Με&nbsp;Διακομιστη!"
  }
  if(sessionStorage.getItem("stage") == 4) {
    //text.innerHTML = "Σφαλμα&nbsp;Συνδεσης,&nbsp;Ελεγξτε&nbsp;Την&nbsp;Συνδεση&nbsp;Σας."
    text.style.color = "#ff230f"
    text.innerHTML = "Η&nbsp;σύνδεση&nbsp;με&nbsp;τον&nbsp;διακομιστή&nbsp;απετυχε,&nbsp;δοκιμάστε&nbsp;ξανά&nbsp;αργότερα."
    //document.getElementById("reload-button").style.display = "block"
  } else if(sessionStorage.getItem("stage") == 5) {
    text.style.color = "#ff230f"
    text.innerHTML = "Εγινε&nbsp;Αποσυνδεση&nbsp;Απο&nbsp;Τον&nbsp;Διακομιστη.&nbsp;Ελεγξτε&nbsp;Την&nbsp;Συνδεση&nbsp;Σας&nbsp;Στο&nbsp;Διαδικτυο."
  }
}, 10);
setTimeout( function () {
  if(sessionStorage.getItem("stage_srv") == null && sessionStorage.getItem("stage_window") == 200) {
    sessionStorage.setItem("stage", 4)
  }
}, 10000)