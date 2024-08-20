function register(username, email, password, phone, first, last) {
    fetch('https://data.evoxs.xyz/accounts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            phone: phone,
            first_name: first,
            last_name: last
        })
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if (data === "Welcome Abroad") {
                var base64email = btoa(email);
                var base64username = btoa(username);
                console.log("Accepted!")
                //$("#container").fadeOut("fast", function () {
                //    //window.location.href = "index.html"
                //    return;
                //    $("#2fa").fadeIn("fast")
                //})
                const url = `https://data.evoxs.xyz/accounts?email=${email}&password=${password}&ip=0`;

                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }
                        return response.text();
                    })
                    .then(data => {
                        if (data.includes("Do 2FA")) {
                            console.log("Smooth")
                        }
                    })
                    .catch(error => {
                        console.error(error);
                    });

            }
            else if (data === "Account Exists. Retry") {
                //window.location.href = `identify.html?email=${btoa(email)}&phPS=${btoa(password)}&phUS=${btoa(username)}`
                //document.getElementById("info_text").innerHTML = "Email Is Linked To Another Account!"
                //document.getElementById("info_text").style.display = "block"
                //document.getElementById("info_text").style.color = "rgb(196, 0, 0)"//yellow
                //setTimeout(function () {
                //    document.getElementById("info_text").style.display = "none"
                //}, 3500)
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function submit() {
    console.log("preparing")
    var first_name = document.getElementById("fname").value
    var last_name = document.getElementById("lname").value
    var email = document.getElementById("email").value
    var username = document.getElementById("username").value
    var password = document.getElementById("password").value
    var selectElement = document.getElementById('countryCode');
    var selectedValue = selectElement.value;
    var number = document.getElementById("phone").value
    var phone_number = `${selectedValue}-${number}`
    let terms = document.getElementById("terms").checked
    if(terms) {
        //ok
        register(username, email, password, phone_number, first_name, last_name)
    } else {
        shake_me('termsh3')
    }
}

function shake_me(what) {
	document.getElementById(`${what}`).classList.add('shake');
	setTimeout(function () {
		document.getElementById(`${what}`).classList.remove('shake');
	}, 500);
}