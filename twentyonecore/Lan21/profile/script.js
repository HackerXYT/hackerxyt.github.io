const buttons = document.querySelectorAll(".card-buttons button");
const sections = document.querySelectorAll(".card-section");
const card = document.querySelector(".card");

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

readTextFile('https://www.twentyonecore.com/users/21coreusers.json', function(get) {
	var username = localStorage.getItem("username")
	var info = JSON.parse(get);
	if (username === "21") {
		document.getElementById('name').innerHTML = info.id1.name
		var image = document.getElementById("pfp"); image.src = info.id1.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id1.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id1.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id1.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id1.year11
		document.getElementById("year1info").innerHTML = info.id1.year1
		document.getElementById("year2title").innerHTML = info.id1.year22
		document.getElementById("year2info").innerHTML = info.id1.year2
		document.getElementById("year3title").innerHTML = info.id1.year33
		document.getElementById("year3info").innerHTML = info.id1.year3
		document.getElementById("year4title").innerHTML = info.id1.year44
		document.getElementById("year4info").innerHTML = info.id1.year4
	} else if (username === "dritsas") {
		document.getElementById('name').innerHTML = info.id4.name
		var image = document.getElementById("pfp"); image.src = info.id4.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id4.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id4.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id4.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id4.year11
		document.getElementById("year1info").innerHTML = info.id4.year1
		document.getElementById("year2title").innerHTML = info.id4.year22
		document.getElementById("year2info").innerHTML = info.id4.year2
		document.getElementById("year3title").innerHTML = info.id4.year33
		document.getElementById("year3info").innerHTML = info.id4.year3
		document.getElementById("year4title").innerHTML = info.id4.year44
		document.getElementById("year4info").innerHTML = info.id4.year4
	} else if (username === "kyriakos") {
		document.getElementById('name').innerHTML = info.id2.name
		var image = document.getElementById("pfp"); image.src = info.id2.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id2.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id2.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id2.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id2.year11
		document.getElementById("year1info").innerHTML = info.id2.year1
		document.getElementById("year2title").innerHTML = info.id2.year22
		document.getElementById("year2info").innerHTML = info.id2.year2
		document.getElementById("year3title").innerHTML = info.id2.year33
		document.getElementById("year3info").innerHTML = info.id2.year3
		document.getElementById("year4title").innerHTML = info.id2.year44
		document.getElementById("year4info").innerHTML = info.id2.year4
	} else if (username === "tala") {
		document.getElementById('name').innerHTML = info.id3.name
		var image = document.getElementById("pfp"); image.src = info.id3.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id3.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id3.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id3.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id3.year11
		document.getElementById("year1info").innerHTML = info.id3.year1
		document.getElementById("year2title").innerHTML = info.id3.year22
		document.getElementById("year2info").innerHTML = info.id3.year2
		document.getElementById("year3title").innerHTML = info.id3.year33
		document.getElementById("year3info").innerHTML = info.id3.year3
		document.getElementById("year4title").innerHTML = info.id3.year44
		document.getElementById("year4info").innerHTML = info.id3.year4
	} else if (username === "psaltiras") {
		document.getElementById('name').innerHTML = info.id7.name
		var image = document.getElementById("pfp"); image.src = info.id7.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id7.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id7.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id7.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id7.year11
		document.getElementById("year1info").innerHTML = info.id7.year1
		document.getElementById("year2title").innerHTML = info.id7.year22
		document.getElementById("year2info").innerHTML = info.id7.year2
		document.getElementById("year3title").innerHTML = info.id7.year33
		document.getElementById("year3info").innerHTML = info.id7.year3
		document.getElementById("year4title").innerHTML = info.id7.year44
		document.getElementById("year4info").innerHTML = info.id7.year4
	} else if (username === "developer") {
		document.getElementById('name').innerHTML = info.id6.name
		var image = document.getElementById("pfp"); image.src = info.id6.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id6.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id6.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id6.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id6.year11
		document.getElementById("year1info").innerHTML = info.id6.year1
		document.getElementById("year2title").innerHTML = info.id6.year22
		document.getElementById("year2info").innerHTML = info.id6.year2
		document.getElementById("year3title").innerHTML = info.id6.year33
		document.getElementById("year3info").innerHTML = info.id6.year3
		document.getElementById("year4title").innerHTML = info.id6.year44
		document.getElementById("year4info").innerHTML = info.id6.year4
	} else if (username === "giorgikas") {
		document.getElementById('name').innerHTML = info.id5.name
		var image = document.getElementById("pfp"); image.src = info.id5.pfp;
		document.getElementById("pfpg").style.backgroundImage = `url('${info.id5.pfp}')`
		document.getElementById("title").innerHTML = "<b>" + info.id5.title + "</b>";
		document.getElementById("aboutme").innerHTML = info.id5.about
		document.getElementById("year1").setAttribute("data-year", "2019");
		document.getElementById("year2").setAttribute("data-year", "2020");
		document.getElementById("year3").setAttribute("data-year", "2021");
		document.getElementById("year4").setAttribute("data-year", "2022");
		document.getElementById("year1title").innerHTML = info.id5.year11
		document.getElementById("year1info").innerHTML = info.id5.year1
		document.getElementById("year2title").innerHTML = info.id5.year22
		document.getElementById("year2info").innerHTML = info.id5.year2
		document.getElementById("year3title").innerHTML = info.id5.year33
		document.getElementById("year3info").innerHTML = info.id5.year3
		document.getElementById("year4title").innerHTML = info.id5.year44
		document.getElementById("year4info").innerHTML = info.id5.year4
	} else {
		window.location.href = "https://www.twentyonecore.com"
	}
});

const handleButtonClick = e => {
	const targetSection = e.target.getAttribute("data-section");
	const section = document.querySelector(targetSection);
	targetSection !== "#about" ?
		card.classList.add("is-active") :
		card.classList.remove("is-active");
	card.setAttribute("data-state", targetSection);
	sections.forEach(s => s.classList.remove("is-active"));
	buttons.forEach(b => b.classList.remove("is-active"));
	e.target.classList.add("is-active");
	section.classList.add("is-active");
};

buttons.forEach(btn => {
	btn.addEventListener("click", handleButtonClick);
});