current_version = "???"
console.log("Current version: " + current_version)
try {
    try {
    throw new Error('oops');
    }
    finally {
    console.log('finally');
    }
    }
    catch (ex) {
    //console.error('outer', ex.message);
    }

    const { ipcRenderer } = require('electron')
function downloadFile(url) {
    ipcRenderer.send('download-file', url)
  }

  function notification_pc(usr, message) {
    ipcRenderer.send('notification', usr, message)
  }
var update_complete = new Howl({
	    src: ['./internal/update_complete.mp3'],
	    volume: 1
    });


function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType('application/json');
	rawFile.open('GET', file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == '200') {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

readTextFile("https://03.memeguy21.repl.co/update.json", function(data) {
    var version = JSON.parse(data)
    url = version.update_url
    //get file size start
    document.getElementById("evox_installer_size").innerHTML = version.size
    document.getElementById("evox_installer_link").href = url
    //end
    current_server_version = version.current
    if(current_version >= version.current) {
        console.log("Up To Date")
    } else {
        update_found.play()
        document.getElementById("updaterequired").click()
        update_found.play()
        document.getElementById("updatetext").innerHTML = `Μια Νεα Εκδοση Ειναι Διαθεσιμη Για Την Εφαρμογη ChatVia!<br>Εγκαταστηστε Την Καινουρια Εκδοση <b style="color: lime">${current_server_version}</b>, Για Να Λαβετε Ολα Τα Νεα Προνομια!`
        console.warn("Update Needed")
        if(version.required === "yes") {
            $('#updatetext').html("Μια νεα εκδοση ειναι διαθεσιμη και πρεπει να εγκατασταθει!<br>Παρακαλουμε πατηστε το κουμπι Εγκατασταση");
            console.log("Text Ready")
        } else if(bug_fix_update === "yes") {
        document.getElementById("updatetext").innerHTML = `Μια Νεα Ενημέρωση Επιδιόρθωσης Σφαλμάτων Ειναι Διαθεσιμη Για Την Εφαρμογη ChatVia!<br>Εγκαταστηστε Την Νεα Εκδοση <b style="color: lime">${current_server_version}</b>, Για Να Εχετε Την Καλυτερη Εμπειρια Χρηστη!`
        }
    }
})

function downloadlatest() {
    localStorage.removeItem("update_status")
    window.location = url;
    $('#updatetext').html("Πατηστε <b>Αποθηκευση</b>")
    $("#chatvia_full").fadeOut("fast");
    setTimeout(function() {
        $("#loaderframe").fadeIn("slow");
    }, 1000)
    setTimeout(function() {
        window.location.href = "update/index.html"
    }, 5000)
}

function manual_update() {
    document.getElementById("manual_update").innerHTML = `Ελεγχος..`
    console.log("manual update")
        console.log("Manual update version: " + current_version)
        const file = url
        if(current_version == current_server_version) {
            notification.play()
            document.getElementById("manual_update").innerHTML = `<b style="font-size: 25px">ChatVia ${current_version}</b><br><span style="color: lime">ειστε ενημερωμενοι στην νεοτερη εκδοση<br><br><button onclick="downloadlatest()" style="color: grey" type="button" class="btn btn-light btn-sm"><b>Επιδιόρθωση Σφαλματων</b></button></span>`
        } else if(current_version > current_server_version) {
            document.getElementById("manual_update").innerHTML = `<b style="font-size: 25px">ChatVia ${current_version}<span style="color: red">→</span><span style="color: magenta">${current_server_version}</span></b><br><span style="color: #0099ff">η υποβάθμιση είναι διαθέσιμη!<br><br>
            <button onclick="downloadlatest()" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Ληψη</b></button>&nbsp;</span>`
            update_found.play()
        } else {

            document.getElementById("manual_update").innerHTML = `<b style="font-size: 25px">ChatVia ${current_version}→<span style="color: lime">${current_server_version}</span></b><br><span style="color: #0099ff">μια νεα εκδοση ειναι διαθεσιμη!<br><br>
            <button onclick="downloadlatest()" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Ληψη</b></button>&nbsp;</span>`
            update_found.play()
        }
}

if(localStorage.getItem("update_status") === "true") {
    //ok
} else {
    update_complete.play()
    setTimeout(function() {
        localStorage.setItem("update_status", "true")
    }, 3000)
}

function oneclick() {
    window.location.href = "https://github.com/HackerXYT/evox/releases/download/Update/Update.exe"
}