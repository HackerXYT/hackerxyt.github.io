const getApiData = "https://lan.hackerx.xyz/language/language/";

function num1(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("word").value;
		if(value === " "|| value === "") {
			document.getElementById("word1end").style.color = "red";
			document.getElementById("word1end").innerHTML = "Enter A Number!";
		} else {
		fetch(`${getApiData}${value}.json`)
    	.then((response) => response.json())
    	.then((getApiResult) => {
				var result = ['green', 'yellow', 'cyan', 'magenta', 'white'][Math.floor(Math.random() * 5)];
				document.getElementById("word1end").style.color = result;
				document.getElementById("word1end").innerHTML = `${getApiResult[0].meanings[0].definitions[0].fast}`;
    	})
    	.catch(() => {
    	  document.getElementById("word1end").style.color = "red";
			document.getElementById("word1end").innerHTML = "Not Found";
    	});
		}
	}
}

function num2(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("wordt").value;
		if(value === " "|| value === "") {
			document.getElementById("word2end").style.color = "red";
			document.getElementById("word2end").innerHTML = "Enter A Number!";
		} else {
		fetch(`${getApiData}${value}.json`)
    	.then((response) => response.json())
    	.then((getApiResult) => {
				var result = ['green', 'yellow', 'cyan', 'magenta', 'white'][Math.floor(Math.random() * 5)];
				document.getElementById("word2end").style.color = result;
				document.getElementById("word2end").innerHTML = `${getApiResult[0].meanings[0].definitions[0].fast}`;
    	})
    	.catch(() => {
    	  document.getElementById("word2end").style.color = "red";
			document.getElementById("word2end").innerHTML = "Not Found";
    	});
	}
	}
}

function num3(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("word3").value;
		if(value === " "|| value === "") {
			document.getElementById("word3end").style.color = "red";
			document.getElementById("word3end").innerHTML = "Enter A Number!";
		} else {
		fetch(`${getApiData}${value}.json`)
    	.then((response) => response.json())
    	.then((getApiResult) => {
				var result = ['green', 'yellow', 'cyan', 'magenta', 'white'][Math.floor(Math.random() * 5)];
				document.getElementById("word3end").style.color = result;
				document.getElementById("word3end").innerHTML = `${getApiResult[0].meanings[0].definitions[0].fast}`;
    	})
    	.catch(() => {
    	  document.getElementById("word3end").style.color = "red";
			document.getElementById("word3end").innerHTML = "Not Found";
    	});
	}
	}
}

function num4(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("word4").value;
		if(value === " "|| value === "") {
			document.getElementById("word4end").style.color = "red";
			document.getElementById("word4end").innerHTML = "Enter A Number!";
		} else {
		fetch(`${getApiData}${value}.json`)
    	.then((response) => response.json())
    	.then((getApiResult) => {
				var result = ['green', 'yellow', 'cyan', 'magenta', 'white'][Math.floor(Math.random() * 5)];
				document.getElementById("word4end").style.color = result;
				document.getElementById("word4end").innerHTML = `${getApiResult[0].meanings[0].definitions[0].fast}`;
    	})
    	.catch(() => {
    	  document.getElementById("word4end").style.color = "red";
			document.getElementById("word4end").innerHTML = "Not Found";
    	});
	}
	}
}

function num5(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("word5").value;
		if(value === " "|| value === "") {
			document.getElementById("word5end").style.color = "red";
			document.getElementById("word5end").innerHTML = "Enter A Number!";
		} else {
		fetch(`${getApiData}${value}.json`)
    	.then((response) => response.json())
    	.then((getApiResult) => {
				var result = ['green', 'yellow', 'cyan', 'magenta', 'white'][Math.floor(Math.random() * 5)];
				document.getElementById("word5end").style.color = result;
				document.getElementById("word5end").innerHTML = `${getApiResult[0].meanings[0].definitions[0].fast}`;
    	})
    	.catch(() => {
    	  document.getElementById("word5end").style.color = "red";
			document.getElementById("word5end").innerHTML = "Not Found";
    	});
	}
	}
}

function num6(e, textarea) {
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { //Enter keycode
		var value = document.getElementById("word6").value;
		if(value === " "|| value === "") {
			document.getElementById("word6end").style.color = "red";
			document.getElementById("word6end").innerHTML = "Enter A Number!";
		} else {
		fetch(`${getApiData}${value}.json`)
    	.then((response) => response.json())
    	.then((getApiResult) => {
				var result = ['green', 'yellow', 'cyan', 'magenta', 'white'][Math.floor(Math.random() * 5)];
				document.getElementById("word6end").style.color = result;
				document.getElementById("word6end").innerHTML = `${getApiResult[0].meanings[0].definitions[0].fast}`;
    	})
    	.catch(() => {
    	  document.getElementById("word6end").style.color = "red";
			document.getElementById("word6end").innerHTML = "Not Found";
    	});
	}
	}
}