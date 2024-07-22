function updateClock() {
    var now = new Date(), // current date
        months = ['January', 'February', 'March', 'April', 'May ', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    time = now.getHours() + ':' + now.getMinutes(), // again, you get the idea

        // a cleaner way than string concatenation
        date = [months[now.getMonth()],
        now.getDate(),
        now.getFullYear()].join(' ');

    // set the content of the element with the ID time to the formatted string
    document.getElementById('time').innerHTML = [date, time].join(' ');

    // call this function again in 1000ms
    setTimeout(updateClock, 1000);
}
updateClock(); // initial call


fetch('https://data.evoxs.xyz/accounts')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("accounts").classList.add("ok")
        document.getElementById("accounts").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("accounts").classList.add("outage")
        document.getElementById("accounts").innerText = "Outage"
    });

fetch('https://data.evoxs.xyz/profiles')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("profiles").classList.add("ok")
        document.getElementById("profiles").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("profiles").classList.add("outage")
        document.getElementById("profiles").innerText = "Outage"
    });

    fetch('https://data.evoxs.xyz/social')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("social").classList.add("ok")
        document.getElementById("social").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("social").classList.add("outage")
        document.getElementById("social").innerText = "Outage"
    });

    fetch('https://florida.evoxs.xyz/')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("florida").classList.add("ok")
        document.getElementById("florida").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("florida").classList.add("outage")
        document.getElementById("florida").innerText = "Outage"
    });

    fetch('https://data.evoxs.xyz/tasco')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("tasco").classList.add("ok")
        document.getElementById("tasco").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("tasco").classList.add("outage")
        document.getElementById("tasco").innerText = "Outage"
    });

    fetch('https://data.evoxs.xyz/secureline')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("secureline").classList.add("ok")
        document.getElementById("secureline").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("secureline").classList.add("outage")
        document.getElementById("secureline").innerText = "Outage"
    });

    fetch('https://data.evoxs.xyz/cryptox')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("cryptox").classList.add("ok")
        document.getElementById("cryptox").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("cryptox").classList.add("outage")
        document.getElementById("cryptox").innerText = "Outage"
    });

    fetch('https://data.evoxs.xyz/authip')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("authips").classList.add("ok")
        document.getElementById("authips").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("authips").classList.add("outage")
        document.getElementById("authips").innerText = "Outage"
    });

    fetch('https://data.evoxs.xyz/notifications')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("notifications").classList.add("ok")
        document.getElementById("notifications").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("notifications").classList.add("outage")
        document.getElementById("notifications").innerText = "Outage"
    });

    fetch('https://admin.evoxs.xyz/')
    .then(function (response) {
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        return response.text();
    })
    .then(function (data) {
        // Log the data
        document.getElementById("admin").classList.add("ok")
        document.getElementById("admin").innerText = "Operational"
        console.log(data);
    })
    .catch(function (error) {
        // Handle any errors that occurred during the fetch
        console.error('Error fetching data:', error);
        document.getElementById("admin").classList.add("outage")
        document.getElementById("admin").innerText = "Outage"
    });