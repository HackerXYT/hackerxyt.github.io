readTextFile("https://www.twentyonecore.com/users/21coreusers.json", function(json) {
	var data = JSON.parse(json)
	if (product === "kyriakos") {
		if (data.id2.banned === "true") {
			window.location.href = "banned.html?user=" + product
		} else if (data.id2.banned === "false") {
			console.log("good")
		}
	} else if (product === "dritsas") {
		if (data.id4.banned === "true") {
			window.location.href = "banned.html?user=" + product
		} else if (data.id4.banned === "false") {
			console.log("good")
		}
	} else if (product === "tala") {
		if (data.id3.banned === "true") {
			window.location.href = "banned.html?user=" + product
		} else if (data.id3.banned === "false") {
			console.log("good")
		}
	} else if (product === "giorgikas") {
		if (data.id5.banned === "true") {
			window.location.href = "banned.html?user=" + product
		} else if (data.id5.banned === "false") {
			console.log("good")
		}
	} else if (product === "developer") {
		if (data.id6.banned === "true") {
			window.location.href = "banned.html?user=" + product
		} else if (data.id6.banned === "false") {
			console.log("good")
		}
	} else if (product === "psaltiras") {
		if (data.id7.banned === "true") {
			window.location.href = "banned.html?user=" + product
		} else if (data.id7.banned === "false") {
			console.log("good")
		} else {
			console.log("Security Check Complete!")