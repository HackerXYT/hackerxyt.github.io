const contextMenu = document.getElementById("myContextMenu");
let timeout;
var notyf = new Notyf({duration: 1600});

window.addEventListener("contextmenu", (e) => {
    clearTimeout(timeout)
  e.preventDefault(); // Prevent default right-click menu from appearing

  if(localStorage.getItem("debug") != null) {
    localStorage.removeItem("debug")
    document.getElementById("myContextMenu").style.backgroundColor = "rgba(251,75,2,1)"
    document.getElementById("devmode").innerHTML = "Inactive"
  } else {
    localStorage.setItem("debug", true)
    document.getElementById("myContextMenu").style.backgroundColor = "limegreen"
    document.getElementById("devmode").innerHTML = "Active"
  }
  
  // Position the context menu where the user right-clicked
  contextMenu.style.top = `${e.clientY}px`;
  contextMenu.style.left = `${e.clientX}px`;

  contextMenu.classList.add("active"); // Show the context menu
  timeout = setTimeout(function() {
    contextMenu.classList.remove("active")
  }, 1000)
});

window.addEventListener("click", () => {
  contextMenu.classList.remove("active"); // Hide the context menu when user clicks anywhere else on the page
});

fetch('https://notificationsystem.memeguy21.repl.co/evox', {
  method: 'POST',
  body: "Test"
})
.then(response => {
    console.log("All ok - SERVER 200")
})
.catch(error => {
    notyf.error('Ο Διακομιστης-Γεφυρα Δεν Ειναι Ενεργος!');
    console.error('Error:', error);
});