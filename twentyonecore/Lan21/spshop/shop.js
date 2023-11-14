const user = localStorage.getItem('user');
const email = localStorage.getItem('email');
if(user === null) {
    console.log("Welcome, Guest!")
} else {
    document.getElementById("bigtext").innerHTML = `Καλωσορισατε, ${user}`
    document.getElementById("account").innerHTML = "ΛΟΓΑΡΙΑΣΜΟΣ"
    document.getElementById("login-out").innerHTML = `ΑΠΟΣΥΝΔΕΣΗ`
    document.getElementById("loginaccount").innerHTML = `<a href="#" onclick="logout()" class="cs-btn cs-btn_filed cs-black_btn cs-smoth_scroll"><span>ΑΠΟΣΥΝΔΕΣΗ</span></a><br><a href="#" onclick="contact()" class="cs-btn cs-btn_filed cs-black_btn cs-smoth_scroll"><span>ΥΠΟΣΤΗΡΙΞΗ</span></a><br><p>Email:</p>`
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
          if(document.getElementById("total").innerHTML <= "0"){
            console.error("Could not complete purchase, " + document.getElementById("total").innerHTML + "€ was given, " + "more than " + document.getElementById("price").innerHTML + "€ is needed")
            document.getElementById("status").innerHTML = "Could not complete purchase"
            document.getElementById("status").style.color = "red"
          } else {
            sessionStorage.setItem("quant", document.getElementById("number").value)
            console.log(document.getElementById("total").innerHTML + " Added to shopping cart")
            document.getElementById("status").innerHTML = "Success, " + document.getElementById("total").innerHTML + "€ to purchase product"
            document.getElementById("status").style.color = "green"
            sessionStorage.setItem("shopping_cart_random-candy", document.getElementById("total").innerHTML)
            document.getElementById("buytitle").innerHTML = "Complete Your Purchase"
            var price = sessionStorage.getItem("shopping_cart_random-candy")
            document.getElementById("buyimg").innerHTML = ""
            document.getElementById("quantbutton").innerHTML = ""
            document.getElementById("buypric").innerHTML = `Quantity: `  + sessionStorage.getItem("quant")
            document.getElementById("resetbtn").style.display = "block"
            document.getElementById("emailreq").style.display = "block"
            document.getElementById("status").innerHTML = "Σχεδον Ετοιμοι! Παρακαλω Συμπληρωστε Τα Στοιχεια Που Χρειαζονται"
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