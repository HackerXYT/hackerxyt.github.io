sessionStorage.setItem("loaded", "no")
const wrapper = document.querySelector(".wrapper"),
	searchInput = wrapper.querySelector("input"),
	volume = wrapper.querySelector(".word i"),
	infoText = wrapper.querySelector(".info-text"),
	synonyms = wrapper.querySelector(".synonyms .list"),
	removeIcon = wrapper.querySelector(".search span");
let audio;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('username');
localStorage.setItem("username", product)
if(product === null){
	window.location.href = "/Lan21"
} else {
	console.log("Welcome back, " + product + "!")
}
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
readTextFile('/Lan21/version.json', function(get) {
	var version = JSON.parse(get);
	document.getElementById('bottom').innerHTML = 'Current Version: ' + version.version;
});

window.onload = function() {
	const id1 = setTimeout(function() {
		$("#p1").fadeIn(500);
	}, 500);
	const id2 = setTimeout(function() { $("#p1").fadeOut(500); }, 1650)
	const id3 = setTimeout(function() {
		$("#p2").fadeIn(500);
	}, 2200);
	const id4 = setTimeout(function() {
		$("#p2").fadeOut(500);
	}, 3000);
	const id5 = setTimeout(function() {
		document.getElementById("wrapper").style.display = "none";
		document.getElementById("load").style.display = "block";
	}, 3700);
	const id6 = setTimeout(function() {
		$("#load").fadeOut(500);
	}, 6200);
	const id7 = setTimeout(function() {
		document.body.style.background = "#454545ff";
		document.getElementById("header").style.color = "#454545ff";
		$("#wrapper").fadeIn(300);
		$("#nav").fadeIn(300);
		localStorage.setItem("loaded", "yes")
	}, 6790);
	document.onkeyup = (e) => {
  if (e.ctrlKey && (e.keyCode == 16)) {
    clearTimeout(id1);
	clearTimeout(id2);
	clearTimeout(id3);
	clearTimeout(id4);
	clearTimeout(id5);
	clearTimeout(id6);
	clearTimeout(id7);
		$("#p1").fadeOut(100);
		$("#p2").fadeOut(100);
		$("#load").fadeOut(100);
		$("#wrapper").fadeIn(300);
		$("#nav").fadeIn(300);
  }
}
	if(localStorage.getItem("loaded") === "yes") {
	clearTimeout(id1);
	clearTimeout(id2);
	clearTimeout(id3);
	clearTimeout(id4);
	clearTimeout(id5);
	clearTimeout(id6);
	clearTimeout(id7);
		$("#wrapper").fadeIn(300);
		$("#nav").fadeIn(300);
} else {
	//DO Nothing
}
}

$(document).keyup(function(e) {
	if (e.key === "Escape") { // escape key maps to keycode `27`
		document.getElementById("xx").click()
	} else if (e.key === "Shift") {
		console.log("F5")
	}
});

function data(result, word) {
	if (result.title) {
		infoText.innerHTML = `Can't find the meaning of <span>"${word}"</span>. Please, try to search for another word.`;
	} else {
		if (result[0].word === "mango" || result[0].word === "ταβανιάζω" || result[0].word === "γκέλα" || result[0].word === "δαμάλα" || result[0].word === "ζαίος" || result[0].word === "σαλούγκα") {
			var language = "LAN21GR"
		} else {
			var language = "LAN21"
		}
		wrapper.classList.add("active");
		console.log(result[0].meanings[0].definitions[0].definition)
		let translation = result[0].meanings[0].definitions[0].definition
		let definitions = result[0].meanings[0].definitions[0].definition;
		document.getElementById("word").innerHTML = "Number: " + result[0].word;
		document.getElementById("meaning").innerHTML = translation
		document.getElementById("lan").innerHTML = language
		audio = new Audio("https:" + result[0].phonetics[0].audio);

		if (definitions.synonyms[0] == undefined) {
			synonyms.parentElement.style.display = "none";
		} else {
			synonyms.parentElement.style.display = "block";
			synonyms.innerHTML = "";
			for (let i = 0; i < 5; i++) {
				let tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[i]},</span>`;
				tag = i == 4 ? tag = `<span onclick="search('${definitions.synonyms[i]}')">${definitions.synonyms[4]}</span>` : tag;
				synonyms.insertAdjacentHTML("beforeend", tag);
			}
		}
	}
}

function search(word) {
	fetchApi(word);
	searchInput.value = word;
}

function fetchApi(word) {
	wrapper.classList.remove("active");
	infoText.style.color = "#000";
	infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
	let url = `Lan21/language/language/${word}.json`;
	fetch(url).then(response => response.json()).then(result => data(result, word)).catch(() => {
		if (word === "12" || word === "13" || word === "74" || word === "30") {
			infoText.style.color = "red"
			infoText.innerHTML = `<b>Number <span style="color: green"><b>${word}</b></span> has been banned from LAN21</b>`;
		} else {
			infoText.innerHTML = `Can't find the meaning of <b><span style="color: red">${word}</span></b>. Please, try to search for another number.`;
		}
	});
}

searchInput.addEventListener("keyup", e => {
	let word = e.target.value.replace(/\s+/g, ' ');
	if (e.key == "Enter" && word) {
		fetchApi(word);
	}
});

volume.addEventListener("click", () => {
	volume.style.color = "#4D59FB";
	audio.play();
	setTimeout(() => {
		volume.style.color = "#999";
	}, 800);
});

removeIcon.addEventListener("click", () => {
	searchInput.value = "";
	searchInput.focus();
	wrapper.classList.remove("active");
	infoText.style.color = "#9A9A9A";
	infoText.innerHTML = "Type any existing number in LAN21 and press enter to translate it.";
});

function logout() {
	localStorage.clear()
	sessionStorage.clear()
	window.location.href = "https://www.twentyonecore.com/logout.html"
}

window.onscroll = () => { window.scroll(0, 0); };
document.body.style.overflow = "hidden";

function fullscreen() {
	document.documentElement.requestFullscreen()
	document.getElementById("full").setAttribute("onClick", "javascript: exit();");
	$("#fullscreen").html('Exit Fullscreen');
	document.getElementById("icon1").innerHTML = "fullscreen_exit";
}

function exit() {
	document.exitFullscreen()
	document.getElementById("full").setAttribute("onClick", "javascript: fullscreen();");
	$("#fullscreen").html('Enter Fullscreen');
	document.getElementById("icon1").innerHTML = "fullscreen";
}

function logoff() {
	document.getElementById("sure").innerHTML = "Are You Sure?"
	document.getElementById("asure").onclick = sure;
	//Fresh Start
}

//document.getElementById("asure").addEventListener("click", function() {
//	var times = + Number(1)
//	console.log(times)
//	if(times === 1) {
		//none
//	} else if(times === 2) {
//		var buttclick = "true"
//		console.log(buttclick)
//	}
//});

function sure() {
	document.getElementById("sure").innerHTML = "Logging off...";
	console.log("Bye!")
	localStorage.clear()
	sessionStorage.clear()
	window.location.href = "/Lan21/";
}
