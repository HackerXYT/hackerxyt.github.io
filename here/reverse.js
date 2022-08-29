const getApiData = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const getResultSectionFromDom = document.getElementById("result");
const getDataFromDomOnBtnClick = document.getElementById("search-btn");

getDataFromDomOnBtnClick.addEventListener("click", () => {
	let storeUserInputKeyword = document.getElementById("user-input-data").value;
	fetch(`${getApiData}${storeUserInputKeyword}`)
		.then((response) => response.json())
		.then((getApiResult) => {
			getResultSectionFromDom.innerHTML = `
            <div class="word"><h3>${storeUserInputKeyword}</h3></div>
            <p class="word-meaning">${getApiResult[0].meanings[0].definitions[0].definition}</p>`;
		})
		.catch(() => {
			getResultSectionFromDom.innerHTML = `<h3 class="error">Try Another Keyword</h3>`;
		});
});