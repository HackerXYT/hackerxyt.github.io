function load_temp() {
	console.log("Is Loaded")
	const newDiv = document.createElement("div");

	// and give it some content
	const newContent = document.createTextNode(`<div class="mt-4">
                        <p class="text-muted mb-1">Τελευταια Συνδεση</p>
                        <h5 id="lastlogin" class="font-size-14 mb-0" onload="">X</h5>
                      </div>`);

	// add the text node to the newly created div
	newDiv.appendChild(newContent);

	// add the newly created element and its content into the DOM
	const currentDiv = document.getElementById("profilelocation");
	document.body.insertBefore(newDiv, currentDiv);
	console.log("Μονο errors")
}
if (current_version < "1.4.3") {
	console.log("Temp Loaded")
	function manual_update() {
		setTimeout(() => {
			document.getElementById("manual_update").innerHTML = `Ελεγχος..`
			console.log("manual update")
			console.log("Manual update version: " + current_version)
			const file = url
			if (current_version >= current_server_version) {
				notification.play()
				document.getElementById("manual_update").innerHTML = `<b style="font-size: 25px">ChatVia ${current_version}</b><br><span style="color: lime">ειστε ενημερωμενοι στην νεοτερη εκδοση<br><br><button onclick="downloadlatest()" style="color: grey" type="button" class="btn btn-light btn-sm"><b>Επιδιόρθωση Σφαλματων</b></button></span>`
			} else {

				document.getElementById("manual_update").innerHTML = `<b style="font-size: 25px">ChatVia ${current_version}→<span style="color: lime">${current_server_version}</span></b><br><span style="color: #0099ff">μια νεα εκδοση ειναι διαθεσιμη!<br><br>
            <button onclick="downloadlatest()" style="color: lime" type="button" class="btn btn-light btn-sm"><b>Ληψη</b></button>&nbsp;</span>`
				update_found.play()
			}
		}, "2000")
	}
}