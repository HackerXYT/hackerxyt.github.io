const username = localStorage.getItem("t50-username")
const email = localStorage.getItem("t50-email")
const password = localStorage.getItem("t50pswd")

if (username && email && password) {
    fetch(`https://data.evoxs.xyz/accounts?email=${email}&password=${atob(password)}&autologin=true&ip=null`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            if (data.includes("Credentials Correct")) {
                //200
                document.getElementById("headerText").innerText = `Welcome back, ${username}!`
            } else if (data.includes("IP Not Verified")) {
                //IP Unk
                document.getElementById("headerText").innerText = `Welcome back, ${username}!`
            } else {
                //Incorrect
            }
        }).catch(error => {
            console.error('Server Connection Failed!', error)
        })
}