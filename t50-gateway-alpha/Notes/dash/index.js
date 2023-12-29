$(document).ready(docready())
function docready() {
    //HERE FUCK IT
    console.log("fuck it not ready!")
    //window.location.href = "https://weepymicroclosedsource.memeguy21.repl.co/srv"
    if(localStorage.getItem("notesok") === "true") {
        $("#loading").fadeIn("slow")
        $("#passwordOverlay").fadeOut("slow")
        let username = localStorage.getItem("t50-username")
        let email = localStorage.getItem("t50-email")
        $("#username").html(username)
        $("#email").html(email)
        $("#loading").fadeOut("slow")
        $("#newnote").fadeIn("slow")
    } else {
        blur()
    }
}

function blur() {
    document.getElementById('passwordOverlay').style.display = 'block';
    document.getElementById('mainContent').style.filter = 'blur(5px)'; // Add a blur effect to the mainContent
    document.getElementById("passwordInput").click()
}

function mergeacc() {
    localStorage.setItem("notesok", true)
    document.getElementById('mainContent').style.filter = 'none';
    $("#loading").fadeIn("slow")
    $("#passwordOverlay").fadeOut("slow")
    //Create notes acc
    let username = localStorage.getItem("t50-username")
    let email = localStorage.getItem("t50-email")
    $("#username").html(username)
    $("#email").html(email)
    $("#loading").fadeOut("slow")
    setTimeout(function() {
        $("#account").fadeIn("slow")
        $("#newnote").fadeIn("slow")
    }, 1000)
}

function acc() {
    if(document.getElementById("account").style.display === "none" || document.getElementById("account").style.display === "") {
        $("#account").fadeIn("fast")
    } else {
        $("#account").fadeOut("fast")
    }
}

function newnote() {
    console.log("NOT READY!")
    window.location.href = "https://weepymicroclosedsource.memeguy21.repl.co/srv"
    return; ///FIX ME FIX ME FIX ME 
    let email = localStorage.getItem("t50-email")
    $("#loading").fadeIn("slow")
    //
    var inside = btoa("Welcome To T50 Notes!")
    var name = btoa("Welcome Note")
    fetch(`https://team50-accounts-database-clear.memeguy21.repl.co/?email=${email}&note=create&what=${inside}&password=${atob(localStorage.getItem("t50pswd"))}&name=${name}`)
	.then(response => {
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		return response.text();
	})
	.then(data => {
        if(data === "Note Saved!") {
            console.log("All ok")
            document.getElementById("notes").innerHTML = `<div id="note:${name}" class="rounded-box">
			<a onclick="note('${name}')">
				<h3 id="note-1-title">${atob(name)}</h3>
				<!--<p id="note-1-description">Description for Note 1 goes here. This is a sample description.</p>-->
			</a>
		</div>`
        $(`#note:${name}`).fadeIn("slow")
        $("#loading").fadeOut("slow")
        }
    })
    .catch(error => {
		console.error('Fetch error:', error);
	});
}

function note(what) {
    if(what === null) {
        return;
    }

}