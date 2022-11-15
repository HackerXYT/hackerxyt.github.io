function enterpressalert(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("name").value;
		console.log("ok")
		if (value === "bad luck") {
			console.log("yes")
			window.location.href = "./2/"
		} else {
			console.log("no " + value)
		}
	}
}