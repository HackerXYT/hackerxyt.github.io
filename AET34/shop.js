const user = localStorage.getItem('user');
const email = localStorage.getItem('email');
sessionStorage.setItem("phase", "0")
sessionStorage.removeItem("quant")
sessionStorage.removeItem("method")
sessionStorage.removeItem("paid")
sessionStorage.removeItem("shopping_cart_random-candy")
sessionStorage.removeItem("methodcheck")
sessionStorage.removeItem("namecheck")
sessionStorage.removeItem("usernamecheck")
if(user === null) {
    console.log("Welcome, Guest!")
} else {
    document.getElementById("bigtext").innerHTML = `Καλωσορισατε,<br>${user}`
    document.getElementById("account").innerHTML = "ΛΟΓΑΡΙΑΣΜΟΣ"
    document.getElementById("login-out").innerHTML = `ΛΟΓΑΡΙΑΣΜΟΣ`
    document.getElementById("loginaccount").innerHTML = `<a href="#" onclick="logout()" class="cs-btn cs-btn_filed cs-black_btn cs-smoth_scroll"><span>ΑΠΟΣΥΝΔΕΣΗ</span></a><br><a href="#" onclick="contact()" class="cs-btn cs-btn_filed cs-black_btn cs-smoth_scroll"><span>ΥΠΟΣΤΗΡΙΞΗ</span></a><br><p>Ονομα χρηστη: <span>${localStorage.getItem('email')}</span><br>Ονοματεπωνυμο: ${user}<br><br><span style="color: yellowgreen">Ειστε Συνδεδεμενοι Με Τον Πυρηνα 21!</span></p>`
}


function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}

buynow = document.getElementById("buynow")
    calculateminus = document.getElementById("calculateminus")
    calculateminus.addEventListener("click", function () {
        var current = document.getElementById("number").value
        var checkif = Number(current) - Number(1)
        if(checkif === Number(-1)) {
          //console.log("ERR")
          document.getElementById("total").style.color = "red"
        } else if (checkif === Number(0)) {
          document.getElementById("number").value = Number(current) - Number(1)
          document.getElementById("total").innerHTML = Number(document.getElementById("price").innerHTML) * Number(document.getElementById("number").value)
          document.getElementById("total").style.color = "red"
        } else {
          document.getElementById("number").value = Number(current) - Number(1)
          document.getElementById("total").innerHTML = Number(document.getElementById("price").innerHTML) * Number(document.getElementById("number").value)
          document.getElementById("total").style.color = "white"
        }
      })
      calculateplus = document.getElementById("calculateplus")
        calculateplus.addEventListener("click", function () {
            var price = document.getElementById("price").innerHTML
          var current = document.getElementById("number").value
          document.getElementById("number").value = Number(current) + Number(1)
          document.getElementById("total").innerHTML = Number(price) * Number(document.getElementById("number").value)
          document.getElementById("total").style.color = "white"
        })
        buynow.addEventListener("click", function () {
          if(sessionStorage.getItem("phase") === "0") {
          if(document.getElementById("total").innerHTML <= "0"){
            console.error("Could not complete purchase, " + document.getElementById("total").innerHTML + "€ was given, " + "more than " + document.getElementById("price").innerHTML + "€ is needed")
            document.getElementById("status").innerHTML = "Δεν ήταν δυνατή η ολοκλήρωση της αγοράς, " + document.getElementById("total").innerHTML + "€ δοθηκαν, " + "περισσότερο από " + document.getElementById("price").innerHTML + "€ απαιτουνται"
            document.getElementById("status").style.color = "red"
          } else {
            sessionStorage.setItem("quant", document.getElementById("number").value)
            console.log(document.getElementById("total").innerHTML + " Added to shopping cart")
            //document.getElementById("status").innerHTML = "Success, " + document.getElementById("total").innerHTML + "€ to purchase product"
            document.getElementById("status").style.color = "#00ff00"
            sessionStorage.setItem("shopping_cart_random-candy", document.getElementById("total").innerHTML)
            document.getElementById("buytitle").innerHTML = "Ολοκληρώστε την αγορά σας"
            var price = sessionStorage.getItem("shopping_cart_random-candy")
            document.getElementById("buyimg").innerHTML = ""
            document.getElementById("quantbutton").innerHTML = ""
            document.getElementById("buypric").innerHTML = `Ποσότητα: `  + sessionStorage.getItem("quant")
            document.getElementById("resetbtn").style.display = "block"
            document.getElementById("emailreq").style.display = "block"
            document.getElementById("status").innerHTML = "Σχεδον Ετοιμοι! Παρακαλω Συμπληρωστε Τα Στοιχεια Που Χρειαζονται"
            sessionStorage.setItem("phase", "1")
            setTimeout(function(){
              $("#status").fadeOut();
              setTimeout(function(){
                document.getElementById("status").innerHTML = "Χρειαζομαστε καποια βασικα στοιχεια για να μπορεσουμε να δημιουργησουμε τον λογαριασμο σας.<br><b>Οι πληροφοριες που μας δινετε παραμενουν ορατες ΜΟΝΟ σε εμας</b>"
                document.getElementById("status").style.color = "#00ff59"
                $("#status").fadeIn();
              }, 500);
            }, 2000);
          }
        } else if(sessionStorage.getItem("phase") === "1") {
          //HANDLE DETAILS
          console.log("Now Handling Phase 1")
          const name = document.getElementById("name").value
          const method = document.getElementById("selectgrade").value
          const username = document.getElementById("username").value          
          //USERNAME CHECK
          if(username === null||username === "") {
            console.error("Username Not Given")
            document.getElementById("status").style.color = "red"
            document.getElementById("status").innerHTML = "Πληκτρολογήστε Ενα Ονομα Χρηστη"
          } else {
            console.log(document.getElementById("username").value)
            console.log("200 - Username OK")
            sessionStorage.setItem("usernamecheck", "ok")
          }
          //NAME CHECK
          var nameArray = name.match(/([a-zA-ZΑ-Ωα-ω])/gi);
          if (nameArray != null && nameArray.length) {
            console.log("200 - Name OK")
            sessionStorage.setItem("namecheck", "ok")
          } else if(name === null||name === "") {
            console.error("Name Not Given")
            document.getElementById("status").style.color = "red"
            document.getElementById("status").innerHTML = "Πληκτρολογήστε ενα ονοματεπωνυμο"
          } else {
            console.error("Name Invalid")
            document.getElementById("status").style.color = "red"
            document.getElementById("status").innerHTML = "Πληκτρολογήστε ενα εγκυρο ονοματεπωνυμο"
          }
          //PAYMENT CHECK
          if(method === "1") {
            document.getElementById("status").style.color = "red"
            document.getElementById("status").innerHTML = "Επιλεξτε εναν εγκυρο τροπο πληρωμης"
          } else {
            console.log("method: " + method + " OK")
            sessionStorage.setItem("methodcheck", "ok")
            sessionStorage.setItem("method", method)
          }
          if(sessionStorage.getItem("usernamecheck")+sessionStorage.getItem("namecheck")+sessionStorage.getItem("methodcheck") === "okokok") {
            sessionStorage.setItem("username",username)
            sessionStorage.setItem("name", name)
            allfadeout()
          setTimeout(function(){
            document.getElementById("status").innerHTML = `<svg style="width: 120px;height: auto;" version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="25 25 50 50">
  <circle cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke="#ffffff" stroke-linecap="round" stroke-dashoffset="0" stroke-dasharray="100, 200">
    <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="stroke-dashoffset" values="0;-30;-124" dur="1.25s" repeatCount="indefinite"/>
    <animate attributeName="stroke-dasharray" values="0,200;110,200;110,200" dur="1.25s" repeatCount="indefinite"/>
  </circle>
</svg><br><br><br><span style="color: white" id="beginphase2">Επεξεργαζομαστε την παραγγελεια σας..</span>`
            $("#status").fadeIn("1000");
            setTimeout(function(){
              $("#status").fadeOut("500");
              setTimeout(function(){
                document.getElementById("status").innerHTML = `Παρακαλω Συμπληρωστε Τα Απαιτουμενα Στοιχεια`
                $("#status").fadeIn("slow")
                $("#hide4").fadeIn("slow")
                $("#buytitle").fadeIn("slow")
                if(sessionStorage.getItem("method") === "4") {
                  $("#coupontotal").fadeIn("slow")
                  $("#hide3").fadeIn("slow")
                  $("#totalheader").fadeIn("slow")
                  document.getElementById("couponmethodupdate").innerHTML = `<button id="couponupdate" onclick="couponupdate()" class="cs-btn cs-btn_filed cs-accent_btn text-center text-uppercase w-100"><span>Ενημερωση</span></button>`
                  document.getElementById("totalheader").innerHTML = `<br><br><b>Σχεδον τελειωσατε, ${name}!</b><br>Εισαγετε τον προπληρωμενο κωδικο που εχετε λαβει μετα πατηστε ενημερωση και δειτε το νεο ποσο πληρωμης`
                  document.getElementById("buytitle").innerHTML = `Αγορα Προιοντος - Βημα 3/4`
                  document.getElementById("namesur").innerHTML = `
                <input id="couponcode" type="text" autocomplete="off" required>
                <span class="highlight"></span>
                <span class="bar"></span>
                <label id="couponif">Κωδικος Προιοντος</label>`
                document.getElementById("select1").style.display = "none"
                document.getElementById("groupusername").style.display = "none"
                $("#emailreq").fadeIn("500");
                  //sessionStorage.setItem("paid", "ok") //fix
                } else {
                  document.getElementById("couponif").innerHTML = `error`
                  $("#emailreq").fadeIn("500");
                }
              }, 500);
            }, 2000); //change to 5000
          }, 600);

           }
          
          
        }
        })

function login() {
    var code = document.getElementById("code").value
    readTextFile("./data/customers.json", function(text) {
		var json = JSON.parse(text)
        if(code === json.code1||code === json.code2||code === json.code3||code === json.code4||code === json.code5) {
            document.getElementById("loginmsg").innerHTML = "Welcome Back User, " + code + "!"
            localStorage.setItem("user", code)
            localStorage.setItem("email", email)
            window.location.reload()
        } else if(code === json.code6){
          document.getElementById("loginmsg").innerHTML = "Downloading File, " + code + "!"
            localStorage.setItem("user", "21")
            localStorage.setItem("email", email)
            const anchor = document.createElement("a");
            anchor.href = "./data/special.pdf";
            anchor.download = "./data/special.pdf";
            document.body.appendChild(anchor);
            anchor.click();
            
        } else {
            document.getElementById("loginmsg").style.color = "red"
            document.getElementById("loginmsg").innerHTML = `Error: ο χρηστης <b>${code}</b> δεν υπαρχει`
        }
    })
}

function logout() {
    localStorage.removeItem("user")
    window.location.reload()
}

function contact() {
    console.log("200 - OK")
}

$( "#resetbtn" ).click(function() {
  console.log("XX")
  $("#purchasearea").fadeOut();
  setTimeout(function(){
    window.location.reload()
  }, 500);
})

function resetbuy() {
  document.getElementById("status").innerHTML = "Χρειαζομαστε καποια βασικα στοιχεια για να μπορεσουμε να δημιουργησουμε τον λογαριασμο σας.<br><b>Οι πληροφοριες που μας δινετε παραμενουν ορατες ΜΟΝΟ σε εμας</b>"
  document.getElementById("status").style.color = "#00ff59"
}

function couponupdate() {
  if(document.getElementById("couponcode").value === "8KMc7B21") {
    var newprice = document.getElementById("newpricecoupon").innerHTML * Number(0)
    document.getElementById("newpricecoupon").innerHTML = `<span style="color: green;">${newprice}</span>`
    document.getElementById("status").innerHTML = `<br>Το ποσο ενημερωθηκε!<br>Πατηστε Αγορα Για Να Ολοκληρώστε Την Παραγγελεια Σας`
    $("#resetbtn").fadeIn("500");
    $("#cancel").fadeIn("500");
    document.getElementById("couponmethodupdate").innerHTML = `<button id="purchase" onclick="purchase()" class="cs-btn cs-btn_filed cs-accent_btn text-center text-uppercase w-100"><span>Αγορα</span></button>`
    console.log(document.getElementById("newpricecoupon").innerHTML)
    sessionStorage.setItem("shopping_cart_random-candy", document.getElementById("newpricecoupon").innerHTML * Number(0))
  }
}

function purchase() {
  console.log("Purchased")
  allfadeout()
   $("#purchase").fadeOut("slow");
  setTimeout(function(){
    document.getElementById("status").innerHTML = `<svg class="purchaseanim" width="100" height="100" viewBox="0 0 300 300">
    <defs>
      <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
        <stop offset="0%">
          <animate attributeName="stop-color" values="#00E06B;#CB0255;#00E06B" dur="5s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%">
          <animate attributeName="stop-color" values="#04AFC8;#8904C5;#04AFC8" dur="8s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
      <clipPath id="clip">
        <rect class="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
        <rect class="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
        <rect class="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
        <rect class="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
        <rect class="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
        <rect class="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
        <rect class="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
      </clipPath>
    </defs>
    <rect class="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
  </svg><br><br><br><span style="color: white" id="beginphase2">Παρακαλω Περιμενετε Οσο Επιβεβαιωνουμε Την Δημιουργια Του Λογαριασμου Σας..</span>`
  $("#status").fadeIn("100");
  setTimeout(function(){
    $("#beginphase2").fadeOut("500");
    setTimeout(function(){document.getElementById("beginphase2").innerHTML = `Δημιουργουμε τον λογαριασμο σας!<br>Παρακαλω περιμενετε..`;$("#beginphase2").fadeIn("500");
    setTimeout(function(){$("#beginphase2").fadeOut("500");setTimeout(function(){document.getElementById("beginphase2").innerHTML = `Ετοιμοι?`;$("#beginphase2").fadeIn("500");},400)
    setTimeout(function(){$("#beginphase2").fadeOut("500");setTimeout(function(){document.getElementById("beginphase2").innerHTML = `<b>Παμε!</b>`;$("#beginphase2").fadeIn("500");
    setTimeout(function(){
      document.querySelectorAll('.bg').forEach(e => e.remove());
      $('body').css('background', '#000');
      document.getElementsByTagName('link')[0].disabled = true; 
      $("link[href='assets/css/style.css']").remove();
      localStorage.setItem("user", sessionStorage.getItem("name"))
      localStorage.setItem("email", sessionStorage.getItem("username"))
      window.location.reload();
    },1000)
  },400)
  },1200)
  },6000)
  },400)
    
  },5300)
  }, 600)
  
}

function allfadeout() {
   $("#buynow").fadeOut("slow");
          $("#emailreq").fadeOut("slow");
          $("#cancel").fadeOut("slow");
          $("#totalheader").fadeOut("slow");
          $("#totalprice").fadeOut("slow");
          $("#buypric").fadeOut("slow");
          $("#productheader").fadeOut("slow");
          $("#hide2").fadeOut("slow");
          $("#hide3").fadeOut("slow");
          $("#hide4").fadeOut("slow");
          $("#hide5").fadeOut("slow");
          $("#hide6").fadeOut("slow");
          $("#productname").fadeOut("slow");
          $("#buytitle").fadeOut("slow");
          $("#status").fadeOut("500");
}