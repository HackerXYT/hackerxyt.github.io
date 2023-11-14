const getApiData = "https://language.twentyonecore.com/language/language/";
const getResultSectionFromDom = document.getElementById("result");
const getDataFromDomOnBtnClick = document.getElementById("search-btn");

function readTextFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("application/json");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	}
	rawFile.send(null);
}
readTextFile("https://language.twentyonecore.com/reverse/lan21.json", function(get) {
	var lan21 = JSON.parse(get)
	console.log(lan21)
	getDataFromDomOnBtnClick.addEventListener("click", () => {
		let storeUserInputKeyword = document.getElementById("user-input-data").value;
		fetch(`${getApiData}${storeUserInputKeyword}.json`)
			.then((response) => response.json())
			.then((getApiResult) => {
				getResultSectionFromDom.innerHTML = `
            <div class="word"><h3>${lan21.storeUserInputKeyword}</h3></div>
            <p class="word-meaning">${getApiResult[0].meanings[0].definitions[0].definition}</p>`;
			})
			.catch(() => {
				getResultSectionFromDom.innerHTML = `<h3 class="error">Try Another Keyword</h3>`;
			});
	});
})