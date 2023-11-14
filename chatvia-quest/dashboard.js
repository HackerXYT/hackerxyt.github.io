let app1 = localStorage.getItem("app-1-status")
let app2 = localStorage.getItem("app-2-status")
let app3 = localStorage.getItem("app-3-status")
let app4 = localStorage.getItem("app-4-status")

var app1_notification = new Notyf({duration: 5000});

document.getElementById("close-button").onclick = function () {
  window.close()
}
  
const { ipcRenderer } = require('electron')


window.onload = function() {
  var styleSheets = document.styleSheets;
  var images = [];

  for (var i = 0; i < styleSheets.length; i++) {
    var styleSheet = styleSheets[i];
    if (styleSheet.href) {
      var rules = styleSheet.rules || styleSheet.cssRules;
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j];
        if (rule.style && rule.style.backgroundImage && rule.style.backgroundImage.indexOf('url') > -1) {
          var imageUrl = rule.style.backgroundImage.slice(4, -1).replace(/"/g, '');
          images.push(imageUrl);
        }
      }
    }
  }

  var loadedImages = 0;

  for (var i = 0; i < images.length; i++) {
    var image = new Image();
    image.src = images[i];
    image.onload = function() {
      loadedImages++;
      if (loadedImages == images.length) {
        
        $('#body2').fadeIn("slow")
        $('#loading').fadeOut("slow")
        
        console.log('All images have finished loading');
      }
    };
  }

  if (images.length == 0) {
    // code to execute when no images were found in CSS
    console.log('No images found in CSS');
  }
};


const box1 = document.getElementById("box1")
const box2 = document.getElementById("box2")
const box3 = document.getElementById("box3")
const box4 = document.getElementById("box4")

const description1 = document.getElementById("description1")
const description2 = document.getElementById("description2")
const description3 = document.getElementById("description3")
const description4 = document.getElementById("description4")

const options1 = document.getElementById("options1")
const options2 = document.getElementById("options2")
const options3 = document.getElementById("options3")
const options4 = document.getElementById("options4")

const def1 = document.getElementById("def1")
const def2 = document.getElementById("def2")
const def3 = document.getElementById("def3")
const def4 = document.getElementById("def4")

const rem1 = document.getElementById("rem1")
const rem2 = document.getElementById("rem2")
const rem3 = document.getElementById("rem3")
const rem4 = document.getElementById("rem4")

let default_app = localStorage.getItem("project")
if(default_app == "1") {
  def1.innerHTML = "ΑΦΑΙΡΕΣΗ&nbsp;ΠΡΟΕΠΙΛΟΓΗΣ"
} else if(default_app == "2") {
  def2.innerHTML = "ΑΦΑΙΡΕΣΗ&nbsp;ΠΡΟΕΠΙΛΟΓΗΣ"
} else if(default_app == "3") {
  def3.innerHTML = "ΑΦΑΙΡΕΣΗ&nbsp;ΠΡΟΕΠΙΛΟΓΗΣ"
} else if(default_app == "4") {
  def4.innerHTML = "ΑΦΑΙΡΕΣΗ&nbsp;ΠΡΟΕΠΙΛΟΓΗΣ"
}
if(app1 == "downloaded") {
  document.getElementById("status1").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button1").innerHTML = `ΑΝΟΙΓΜΑ`
    description1.style.display = "none"
    options1.style.display = "block"
}
if(app2 == "downloaded") {
  document.getElementById("status2").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button2").innerHTML = `ΑΝΟΙΓΜΑ`
    description2.style.display = "none"
    options2.style.display = "block"
}

if(app3 == "downloaded") {
  document.getElementById("status3").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button3").innerHTML = `ΑΝΟΙΓΜΑ`
    description3.style.display = "none"
    options3.style.display = "block"
}
if(app4 == "downloaded") {
  document.getElementById("status4").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button4").innerHTML = `ΑΝΟΙΓΜΑ`
    description4.style.display = "none"
    options4.style.display = "block"
}
function checkProduct() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString)
    const product = urlParams.get('stay')
  
    if(product != null && product == "true") {
      return;
    } else {
      if(localStorage.getItem("project") != null) {
        console.log("Searching Local Storage")
        let item = localStorage.getItem("project")
        if(item == "1") {
          //window.location.href = "index.html"
          window.close()
          ipcRenderer.send('open-file', 1)
        } else if(item == "2") {
          //window.location.href = "./shop/index.html"
          window.close()
          ipcRenderer.send('open-file', 2)
        } else if(item == "3") {
          //window.location.href = "./core/index.html"
          window.close()
          ipcRenderer.send('open-file', 3)
        } else if(item == "4") {
          //window.location.href = "./hackerx.xyz/"
          window.close()
          ipcRenderer.send('open-file', 4)
        }
      }
    }
  }
checkProduct();
    function save(param) {
      if(param == 1) {
        if(document.getElementById("button1").innerHTML == `ΑΝΟΙΓΜΑ`) {
          jQuery( "#box2" ).fadeOut("slow");
          jQuery( "#box3" ).fadeOut("slow");
          jQuery( "#box4" ).fadeOut("slow", function () {
            //window.location.href = "index.html"
            window.close()
            ipcRenderer.send('open-file', param)
            
          });
          
          return;
        }
        //localStorage.setItem("project", param)
        //window.location.href = "index.html"
        document.getElementById("button1").innerHTML = `Γινεται Ληψη`
        document.getElementById("status1").innerHTML = `
        <svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
  </svg>`
  setTimeout(function (){
    localStorage.setItem("app-1-status", "downloaded")
    document.getElementById("status1").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button1").innerHTML = `ΑΝΟΙΓΜΑ`
    description1.style.display = "none"
    options1.style.display = "block"
    createShortcut('chatvia')
  }, 5000)
      } else if(param == 2) {


        if(document.getElementById("button2").innerHTML == `ΑΝΟΙΓΜΑ`) {
          jQuery( "#box1" ).fadeOut("slow");
          jQuery( "#box3" ).fadeOut("slow");
          jQuery( "#box4" ).fadeOut("slow", function () {
            //window.location.href = "./shop/index.html"
            window.close()
            ipcRenderer.send('open-file', param)
          });
          return;
        }
        //localStorage.setItem("project", param)
        //window.location.href = "index.html"
        document.getElementById("button2").innerHTML = `Γινεται Ληψη`
        document.getElementById("status2").innerHTML = `
        <svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
  </svg>`
  setTimeout(function (){
    localStorage.setItem("app-2-status", "downloaded")
    document.getElementById("status2").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button2").innerHTML = `ΑΝΟΙΓΜΑ`
    description2.style.display = "none"
    options2.style.display = "block"
    createShortcut('shop')
  }, 1000)
      } else if(param == 3) {

        if(document.getElementById("button3").innerHTML == `ΑΝΟΙΓΜΑ`) {
          jQuery( "#box2" ).fadeOut("slow");
          jQuery( "#box1" ).fadeOut("slow");
          jQuery( "#box4" ).fadeOut("slow", function () {
            //window.location.href = "./core/index.html"
            window.close()
            ipcRenderer.send('open-file', param)
          });
          
          return;
        }
        //localStorage.setItem("project", param)
        //window.location.href = "index.html"
        document.getElementById("button3").innerHTML = `Γινεται Ληψη`
        document.getElementById("status3").innerHTML = `
        <svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
  </svg>`
  setTimeout(function (){
    localStorage.setItem("app-3-status", "downloaded")
    document.getElementById("status3").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button3").innerHTML = `ΑΝΟΙΓΜΑ`
    description3.style.display = "none"
    options3.style.display = "block"
    createShortcut('core')
  }, 5000)


        //localStorage.setItem("project", param)
        //window.location.href = "./core/index.html"
      } else if(param == 4) {

        if(document.getElementById("button4").innerHTML == `ΑΝΟΙΓΜΑ`) {
          jQuery( "#box2" ).fadeOut("slow");
          jQuery( "#box1" ).fadeOut("slow");
          jQuery( "#box3" ).fadeOut("slow", function () {
            //window.location.href = "./hackerx.xyz/index.html"
            window.close()
            ipcRenderer.send('open-file', param)
          });
          
          return;
        }
        //localStorage.setItem("project", param)
        //window.location.href = "index.html"
        document.getElementById("button4").innerHTML = `Γινεται Ληψη`
        document.getElementById("status4").innerHTML = `
        <svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#fff" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
    <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform>
    </path>
  </svg>`
  setTimeout(function (){
    localStorage.setItem("app-4-status", "downloaded")
    document.getElementById("status4").innerHTML = `<svg style="position: absolute;top: 10;right: 10;z-index: 1;width: 20px;height: 20px;" xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 24 24" fill="none">
    <path d="M7.29417 12.9577L10.5048 16.1681L17.6729 9" stroke="#32CD32" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="10" stroke="#32CD32" stroke-width="2"/>
    </svg>`
    document.getElementById("button4").innerHTML = `ΑΝΟΙΓΜΑ`
    description4.style.display = "none"
    options4.style.display = "block"
    createShortcut('xyz')
  }, 5000)

      }
    }

    //PERCENTAGE, DONE NOTIFICATION, REDO FOR ALL, MORE..

    function setdefault(param, element) {
      if(element.innerHTML == `ΑΦΑΙΡΕΣΗ&nbsp;ΠΡΟΕΠΙΛΟΓΗΣ`) {
        localStorage.removeItem("project")
        element.innerHTML = `ΠΡΟΕΠΙΛΟΓΗ`
        console.log("Removed Default App", param)
      } else {
        element.innerHTML = `ΑΦΑΙΡΕΣΗ&nbsp;ΠΡΟΕΠΙΛΟΓΗΣ`
      localStorage.setItem("project", param)
      } 
    }

    function remove(param) {
      localStorage.removeItem(`app-${param}-status`)
      if(param == "1") {
        document.getElementById("status1").innerHTML = ''
        description1.style.display = "block"
        options1.style.display = "none"
        button1.innerHTML = "Ληψη"
      } else if(param == "2") {
        document.getElementById("status2").innerHTML = ''
        description2.style.display = "block"
        options2.style.display = "none"
        button2.innerHTML = "Ληψη"
      } else if(param == "3") {
        document.getElementById("status3").innerHTML = ''
        description3.style.display = "block"
        options3.style.display = "none"
        button3.innerHTML = "Ληψη"
      } else if(param == "4") {
        document.getElementById("status4").innerHTML = ''
        description4.style.display = "block"
        options4.style.display = "none"
        button4.innerHTML = "Ληψη"
      }
    }

    //jQuery(".popup-btn").click(function() {
    //  var href = $(this).attr("href")
    //  jQuery(href).fadeIn(250);
    //  jQuery(href).children$("popup-box").removeClass("transform-out").addClass("transform-in");
    //  e.preventDefault();
    //});
    //
    //jQuery(".popup-close").click(function() {
    //  closeWindow();
    //});
    //// $(".popup-wrap").click(function(){
    ////   closeWindow();
    //// })
    //function closeWindow(){
    //  jQuery(".popup-wrap").fadeOut(200);
    //  jQuery(".popup-box").removeClass("transform-in").addClass("transform-out");
    //  event.preventDefault();
    //}

    function settingsload() {
      document.getElementById("page-main").style.filter = "grayscale(100%)"
      document.getElementById("settings-button").style.opacity = "0"
      const div = document.getElementById('page-main');
      div.classList.add('disabled');
    }

    function closesettings() {
      document.getElementById("page-main").style.filter = "grayscale(0%)"
      document.getElementById("settings-button").style.opacity = "1"
      const div = document.getElementById('page-main');
      div.classList.remove('disabled');
    }

    function createShortcut(app) {
      ipcRenderer.send('shortcut', app)
    }

    function enterpressalert(e, textarea) {
      var code = (e.keyCode ? e.keyCode : e.which);
      if (code == 13) { //Enter keycode
        var value = document.getElementById("token").value;
        if(!value) {
          return;
        }
        document.getElementById("close-settings").click();
        if(value == "FCVE-ABCD-1234") {
          document.getElementById("title4") = "My app"
          document.getElementById("description4") = "My app Description"
          
        }
        closesettings()
        console.log("ok")
        localStorage.setItem("token1", value);
      }
    }