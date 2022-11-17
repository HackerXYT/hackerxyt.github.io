function sendMessage() {
	  let username = document.getElementById("cf-name").value; 
	  let useremail = document.getElementById("cf-email").value; 
	  let text = document.getElementById("cf-message").value; 
      let subject = document.getElementById("cf-subject").value; 
		const webhookURL = "https://discord.com/api/webhooks/983062471961104455/vfen7sW92SZ1YW_MzaESSeIRD5QTAPZYYpPo-9OS-4zB4S490G7ekP4-nO1wO1rqpK2X"
        const request = new XMLHttpRequest();
        request.open("POST", webhookURL);
        request.setRequestHeader('Content-type', 'application/json');
		username = username || "User did not define a username";
		useremail = useremail || "User did not define an email address";
		text = text || "User did not define any text";
        subject = subject || "User did not define a subject";
		const params = {
            username: "New Message Twentyonecore",
            avatar_url: "",
            content: "```" + `Name: ${username}\nEmail: ${useremail}\nSubject: ${subject}\nText: ${text}\nFrom: ${window.location.href}` + "```" 
        }
        request.send(JSON.stringify(params));
		console.log(params)
    }

function signinont() {
    var username = document.getElementById("sf_username").value;
    var password = document.getElementById("sf_password").value;
    document.getElementById("result").innerHTML("err")
    document.getElementById("result").style.display("block")
    if(username === "21"){
        if(password === "admin") {
            localStorage.setItem("username", username)
            window.location.reload()
        }
    } else if(username === "kyriakos") {
        if(password === "Kyriakos2007") {
           localStorage.setItem("username", username)
           window.location.reload() 
        }
    } else if(username === "dritsas") {
        if(password === "08") {
           localStorage.setItem("username", username)
           window.location.reload() 
        }
    } else if(username === "talamagas") {
        if(password === "04") {
           localStorage.setItem("username", username)
           window.location.reload() 
        }
    } else if(username === "psaltiras") {
        if(password === "102") {
           localStorage.setItem("username", username)
           window.location.reload() 
        }
    }
}

console.log("%cStop!", "color: red; font-size: xxx-large");
console.log("This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a twentyonecore feature or hack someone's account, it is a scam and will give them access to your twentyonecore account");

function server() {
    if(window.location.href === "http://localhost/") {
        console.log("%cCurrent Server: PC", "color: yellow; font-size: xx-large");
    }
    if(window.location.href === "https://twentyonecore.com"||window.location.href === "http://twentyonecore.com") {
        console.log("%cCurrent Server: PC", "color: yellow; font-size: xx-large");
    }
    if(window.location.href === "https://www.twentyonecore.com"||window.location.href === "http://www.twentyonecore.com") {
        console.log("%cCurrent Server: Replit", "color: yellow; font-size: xx-large");
    } 
}