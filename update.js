let xhr = new XMLHttpRequest();
xhr.open("GET", "https://EvoxServer.memeguy21.repl.co/update");

xhr.onreadystatechange = function () {
if (xhr.readyState === 4) {
    if(xhr.responseText === "yes") {
        console.log("Update is needed")
      //make update
    } else {
      console.log("Evox Up To Date")
    }
  } else {
    console.log("Update Server Offline!")
  }
};
xhr.send();