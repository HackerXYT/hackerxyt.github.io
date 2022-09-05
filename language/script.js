const updaterequired = false

//skip load if urlparam or localStorage skipload = true
function offline() {
	if(navigator.onLine) {
		document.body.style.backgroundColor = "#383838"
        if(document.getElementById('bodyy').style.display = 'none') {
			//$('#d1').html('🙉Back Online!')
			//setTimeout(function() {
			document.getElementById('bodyy').style.display = 'block';
			document.getElementById('d1').style.display = 'none';
			//}, 2000);
		} else {
			//good
		}
    } else {
        document.getElementById('bodyy').style.display = 'none';
		document.body.style.backgroundColor = "black"
		document.getElementById('d1').style.display = 'block';
		document.getElementById('d1').style.color = 'white';
		document.getElementById('d1').style.visibility = 'visible';
		document.getElementById('d1').innerHTML = `<h1 style="color: red">An Error Occured.</h2><br><p>In LAN21 Clearnet Version You Are Connected To A Server Remotely And Anonymously Using The Tor Network.<br>We Continously Check Your Connection So It's Safer For You.<br> Your Connection Isn't Private Right Now, That's Why You Are Reading This.</p><br><h5>To Fix This:<br>&#x2022;Check Your Internet Connection.<br>&#x2022;Verify Your Account<br>&#x2022;Relogin To Dashboard<br>&#x2022;Relauch The Application<br>&#x2022;Restart Your Device.`;
		document.getElementById("d1").classList.add('text-center');
    }
}
setInterval(offline, 500);
var rememberme = localStorage.getItem("username")
if(rememberme === null) {
	console.log("auto")
} else if(rememberme === "cock") {
	//nothing
}
function check() {
	var body = document.getElementById('body')
	if(sessionStorage.getItem("access") === "denied") {
		console.error("Security Check Finished With Error Code 403")
		window.location.href = "quit.js"
		body.parentNode.removeChild(body)
	} else if(sessionStorage.getItem("access") === "granted") {
		//done
	} else {
		//done
	}
}

setInterval(check, 1000);

var x = new XMLHttpRequest();

// Open a new connection, using the GET request on the URL endpoint
x.open('GET', './language/21.json', true);

x.onload = function() {
	console.log('Loaded!');
};
x.send();
const getApiData = 'language/';
const getResultSectionFromDom = document.getElementById('result');
const getDataFromDomOnBtnClick = document.getElementById('search-btn');
//UPPER CONNECTION MESSAGE
//document.getElementById("notifier").style.visibility = "hidden";

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
readTextFile('/version.json', function(get) {
	var version = JSON.parse(get);
	document.getElementById('bottom').innerHTML =
		'Current Version: ' + version.version;
});

document.getElementById('main').style.display = 'none';

$('#toggle').click(function() {
	$(this).toggleClass('active');
	$('#overlay').toggleClass('open');
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var product = urlParams.get('username');
const notifycontrol = urlParams.get('notify');
var identifier = urlParams.get('username');
const compatible = urlParams.get('desktopcompatible');
const skip = urlParams.get('skipload');

if(product === null && identifier === null) {
	if(rememberme === null) {
		console.error("User Is Not Logged In")
		sessionStorage.setItem("access", "denied")
	} else {
		var product = rememberme
		var identifier = rememberme
	}
} else {
	console.log("Param Login Chosen")
}

console.log('Logged in as ' + identifier);
if (compatible === null) {
	console.log("params for compatibility are not given")
} else if (compatible === "yes") {
	console.log("params for compatibility are set to desktop")
} else if (compatible === "no") {
	console.log('access denied because 21 is too bored to make a platform recognition system :/');
	//document.getElementById('body').style.visibility = 'hidden';
	//document.body.style.backgroundColor = 'red';
	//var e = document.body
	//e.parentNode.removeChild(e);
	//setTimeout(function() {
	//	window.location.href = "./log.log"
	//}, 350);
}
if (product == null	&& localStorage.getItem("username") == null) {
	console.log('access denied');
	document.getElementById('html').style.visibility = 'hidden';
	document.body.style.backgroundColor = 'red';
	window.location.href = '/';
} else {
	if(product === null) {var a = localStorage.getItem("username")} else {//no
	}
	var a = product;
	//ONDEFAULTLOGIN
	//document.getElementById("username").innerHTML = a;
	document.getElementById('usernamelocal').innerHTML = a;
	var timeone = setTimeout(function() {
		$('#notices').fadeIn();
		document.getElementById('welcome').className = 'fullscreen fadeOut';
		//welcometxt
		var welcometxt = ["WELCOME,&nbsp;", "WELCOME&nbsp;BACK,&nbsp;", "GREAT&nbsp;TO&nbsp;SEE&nbsp;YOU,&nbsp;", "HELLO,&nbsp;"]
			text = welcometxt[Math.floor(Math.random() * welcometxt.length)];
			document.getElementById('welcometxt').innerHTML = text;
	}, 1800);

	var timetwo = setTimeout(function() {
		document.getElementById('no2').style.visibility = 'visible';
		document.getElementById('no2').className = 'fullscreen fadeIn';
		//ACCOUNT VERIFICATION
		if(identifier === "21") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "Twentyone") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "Talamagas") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "Psaltiras") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "Kyriakos") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "giorgikas") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "Dritsas") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(identifier === "Anon") {
			document.getElementById('usernamesuccess').innerHTML = identifier;
		} else if(sessionStorage.getItem("bypass-verification") === "true") {
			document.getElementById('usernamesuccess').innerHTML = `<span style="color:red">BYPASSED:${identifier}</span>`;
		} else {
			document.getElementById('no3').style.color = '#ff2626';
			$('#no3').html("ACCOUNT&nbsp;VERIFICATION&nbsp;FAILED");
			setTimeout(function() {
				sessionStorage.setItem("access", "denied");
			}, 6200);
		}
		
	}, 2800);

	var timethree = setTimeout(function() {
		document.getElementById('no2').className = 'fullscreen fadeOut';
	}, 4000);

	var timefour = setTimeout(function() {
		document.getElementById('no3').style.visibility = 'visible';
		document.getElementById('no3').className = 'fullscreen fadeIn';
	}, 5800);

	var timefive = setTimeout(function() {
		document.getElementById('no3').className = 'fullscreen fadeOut';
	}, 7800);

	var timesix = setTimeout(function() {
		if(sessionStorage.getItem("access") === "denied") {
			document.getElementById('no4').style.color = 'grey';
			$('#no4').html("REDIRECTING");
			document.getElementById('no4').style.visibility = 'visible';
		document.getElementById('no4').className = 'fullscreen fadeIn';
		setTimeout(function() {
			window.location.href = "quit.js"
		}, 300)
		} else {
		document.getElementById('no4').style.visibility = 'visible';
		document.getElementById('no4').className = 'fullscreen fadeIn';
		}
	}, 8800);

	var timeseven = setTimeout(function() {
		if(sessionStorage.getItem("access") === "denied") {
			$('#no4').html('disconnecting');
			//EXITED?
		} else {
			if (localStorage.getItem("username") === null) {
				localStorage.setItem("username", product)
			} else {
				console.log("Ignoring LocalStorage Value Change")
			}
			$('#no4').html('loading assets.');
		}
	}, 9900);
	var timeeight = setTimeout(function() {
		$('#footer').fadeIn();
		$('#news').fadeIn();
		setTimeout(function() {
			$('#incase').html('Loading News. - Tap To Cancel');
			newstime =  setTimeout(function() {
				$('#incase').html('Loading News.. - Tap To Cancel');
				setTimeout(function() {
					$('#incase').html('Loading News... - Tap To Cancel');
					setTimeout(function() {
						$('#incase').html('Loading News - Tap To Cancel');
						setTimeout(function() {
							$('#incase').html('Loading News. - Tap To Cancel');
							setTimeout(function() {
								$('#incase').html('Loading News.. - Tap To Cancel');
								setTimeout(function() {
									$('#incase').html('Loading News... - Tap To Cancel');
									setTimeout(function() {
										$('#incase').html('Loading News - Tap To Cancel');
										setTimeout(function() {
											$('#incase').html('Loading News. - Tap To Cancel');
											setTimeout(function() {
												$('#incase').html('Loading News.. - Tap To Cancel');
												setTimeout(function() {
													$('#incase').html('Loading News... - Tap To Cancel');
													setTimeout(function() {
														$('#incase').html('Loading News - Tap To Cancel');
														setTimeout(function() {
															$('#incase').html('Loading News. - Tap To Cancel');
															setTimeout(function() {
																$('#incase').html('Loading News.. - Tap To Cancel');
																setTimeout(function() {
																	$('#incase').html('Loading News... - Tap To Cancel');
																	setTimeout(function() {
																		$('#incase').html('Loading News - Tap To Cancel');
																		setTimeout(function() {
																			$('#incase').html('Loading News. - Tap To Cancel');
																			setTimeout(function() {
																				$('#incase').html('Loading News.. - Tap To Cancel');
																				setTimeout(function() {
																					$('#incase').html('Loading News... - Tap To Cancel');
																					setTimeout(function() {
																						$('#incase').html('Loading News - Tap To Cancel');
																						setTimeout(function() {
																							$('#incase').html('Loading News. - Tap To Cancel');
																							setTimeout(function() {
																								$('#incase').html('Loading News.. - Tap To Cancel');
																								setTimeout(function() {
																									$('#incase').html('Loading News... - Tap To Cancel');
																								}, 400);
																							}, 400);
																						}, 400);
																					}, 400);
																				}, 400);
																			}, 400);
																		}, 400);
																	}, 400);
																}, 400);
															}, 400);
														}, 400);
													}, 400);
												}, 400);
											}, 400);
										}, 400);
									}, 400);
								}, 400);
							}, 400);
						}, 400);
					}, 400);
				}, 400);
			}, 400);
		}, 400);
		document.getElementById('incase').style.color = 'magenta';
		news = setTimeout(function() {
			document.getElementById('incase').style.color = 'green';
			$('#incase').html('In case you missed: ');
			$('#news1').fadeIn('slow');
			setTimeout(function() {
			$('#news1info').fadeIn('slow');
			setTimeout(function() {
				$('#news1').fadeOut('slow');
				setTimeout(function() {
					$('#news2').fadeIn('slow');
					setTimeout(function() {
						$('#news2info').fadeIn('slow');
						setTimeout(function() {
							$('#news2').fadeOut('fast');
							$('#news2info').fadeOut('fast');
							$('#news3').fadeIn('slow');
							setTimeout(function() {
								$('#news3info').fadeIn('slow');
								setTimeout(function() {
									$('#news3').fadeOut('fast');
									$('#news3info').fadeOut('fast');
									setTimeout(function() {
										$('#news4').fadeIn('slow');
										setTimeout(function() {
											$('#news').fadeOut('slow');
											$('#news4').fadeOut('slow');
											}, 2400);
										}, 400);
									}, 2400);
								}, 1000);
							}, 2600);
						}, 1000);
					}, 1100);
				}, 3500);
			}, 2500);
		}, 9500);
		$('#no4').html('loading assets..');
	}, 10500);
	var timenine = setTimeout(function() {
		$('#bottom').fadeIn();
		$('#no4').html('loading assets...');
	}, 11000);
	var timeten = setTimeout(function() {
		document.getElementById('no4').className = 'fullscreen fadeOut';
		$('#main').fadeIn();
		$('#toggle').fadeIn();
		$('#replit-badge').fadeOut();
	}, 11800);

	//UPPER NOTICE
	tor1 = setTimeout(function() {
		$('#footer').fadeOut('slow');
	}, 13500);
	tor2 = setTimeout(function() {
		$('#footer').fadeIn('slow');
	}, 14500);
	tor3 = setTimeout(function() {
		$('#footer').fadeOut('slow');
	}, 15500);
	tor4 = setTimeout(function() {
		$('#footer').fadeIn('slow');
	}, 16500);
	tor5 = setTimeout(function() {
		$('#footer').fadeOut('slow');
	}, 17500);
	tor6 = setTimeout(function() {
		$('#footer').fadeIn('slow');
	}, 18500);
	tor7 = setTimeout(function() {
		$('#footer').fadeOut('slow');
	}, 19500);
} 

$(document).keyup(function(event) {
	if (event.which === 13) {
		let storeUserInputKeyword = document.getElementById('user-input-data')
			.value;
		getResultSectionFromDom.innerHTML = `
            <p class="word-meaning">Translating..</p>`;
		fetch(`${getApiData}${storeUserInputKeyword}.json`)
			.then(response => response.json())
			.then(getApiResult => {
				getResultSectionFromDom.innerHTML = `
            <div class="word"><h3>Number: ${storeUserInputKeyword}</h3></div>
            <p class="word-meaning">${
					getApiResult[0].meanings[0].definitions[0].definition
					}</p>`;
			})
			.catch(() => {
				getResultSectionFromDom.innerHTML = `<h4 class="error">${product}, Number ${storeUserInputKeyword} Does Not Exist</h4>`;
			});
	}
});

getDataFromDomOnBtnClick.addEventListener('click', () => {
	getResultSectionFromDom.innerHTML = `
            <p class="word-meaning">Translating..</p>`;
	let storeUserInputKeyword = document.getElementById('user-input-data').value;
	if (
		storeUserInputKeyword == '12' ||
		storeUserInputKeyword == '13' ||
		storeUserInputKeyword == '30' ||
		storeUserInputKeyword == '74' ||
		storeUserInputKeyword == '1'
	) {
		getResultSectionFromDom.innerHTML = `<div class="word"><h4 class="error">${product}, Number ${storeUserInputKeyword} Has Been Banned From Lan21.</h4></div>`;
	} else if(updaterequired === true) {
		getResultSectionFromDom.innerHTML = `<div class="word"><h4 class="error">${product}, You need to update LAN21 first!</h4></div>`;
	} else {
		fetch(`${getApiData}${storeUserInputKeyword}.json`)
			.then(response => response.json())
			.then(getApiResult => {
				getResultSectionFromDom.innerHTML = `
            <div class="word"><h3>Number: ${storeUserInputKeyword}</h3></div>
            <p class="word-meaning">${
					getApiResult[0].meanings[0].definitions[0].definition
					}</p>`;
			})
			.catch(() => {
				getResultSectionFromDom.innerHTML = `<h4 class="error">${product}, Number ${storeUserInputKeyword} Does Not Exist</h4>`;
			});
	}
});
window.onload = function() { };
function reload() {
	document.getElementById('body').style.visibility = 'hidden';
	location.reload();
}
function list() {
	window.location.href = 'https://lan.memeguy21.repl.co/select/a.json';
}

function badge() {
	document.getElementById('html').style.visibility = 'hidden';
	document.getElementById('d1').style.visibility = 'visible';
	document.body.style.backgroundColor = '#fff';
}

let currentDate = new Date();
const name = JSON.parse(identifier);
if(notifycontrol === "yes") {
	$.getJSON('https://ipapi.co/json/', function(data) {
	const identity = JSON.stringify(data, null, 2);
	const identifiers = JSON.parse(identity);
	const ip = identifiers.ip;
	var OSName = 'Unknown OS';
	if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
	if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS/IOS';
	if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
	if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';
	var request = new XMLHttpRequest();
	request.open(
		'POST',
		'https://discord.com/api/webhooks/1001523756323311739/2gm1HnAeWOzUixhhgxWy8Fbm8w8CMjhq_juhTQzXrX1x2e6PWbZQaTBLQ3bOBq38bwh_'
	);
	request.setRequestHeader('Content-type', 'application/json');

	var params = {
		username: 'New Connection To UI',
		avatar_url: '',
		content: `User: **${identifier}** Succesfully Connected To UI With IP adress: **${ip}** and running **${OSName}** | ${currentDate}`
		// Username and content are required to be set, avatar_url isn't. Insert a direct link to an image to use the avatar_url.
	};

	request.send(JSON.stringify(params));
});
} else if(notifycontrol === "no") { 
	console.log("Notification to twentyone servers has been cancelled")
} else {
	$.getJSON('https://ipapi.co/json/', function(data) {
	const identity = JSON.stringify(data, null, 2);
	const identifiers = JSON.parse(identity);
	const ip = identifiers.ip;
	var OSName = 'Unknown OS';
	if (navigator.appVersion.indexOf('Win') != -1) OSName = 'Windows';
	if (navigator.appVersion.indexOf('Mac') != -1) OSName = 'MacOS/IOS';
	if (navigator.appVersion.indexOf('X11') != -1) OSName = 'UNIX';
	if (navigator.appVersion.indexOf('Linux') != -1) OSName = 'Linux';
	var request = new XMLHttpRequest();
	request.open(
		'POST',
		'https://discord.com/api/webhooks/1001523756323311739/2gm1HnAeWOzUixhhgxWy8Fbm8w8CMjhq_juhTQzXrX1x2e6PWbZQaTBLQ3bOBq38bwh_'
	);
	request.setRequestHeader('Content-type', 'application/json');

	var params = {
		username: 'New Connection To UI',
		avatar_url: '',
		content: `User: **${identifier}** Succesfully Connected To UI With IP adress: **${ip}** and running **${OSName}** | ${currentDate}`
		// Username and content are required to be set, avatar_url isn't. Insert a direct link to an image to use the avatar_url.
	};

	request.send(JSON.stringify(params));
});
}

document.addEventListener('touchstart', this.touchstart);
document.addEventListener('touchmove', this.touchmove);

function touchstart(e) {
	e.preventDefault();
}

function touchmove(e) {
	e.preventDefault();
}

function cancelnews() {
	$('#news').fadeOut('slow');
	clearTimeout("news")
}

//RANDOM WELCOME SCREEN EG. WECLOME, WELCOME BACK, GREAT TO SEE YOU, LONG TIME NO SEE, HELLO

if(skip === "true" || localStorage.getItem('skipload') === "true"){
	console.log("skipped")
	clearTimeout(timeone)
	clearTimeout(timetwo)
	clearTimeout(timethree)
	clearTimeout(timefour)
	clearTimeout(timefive)
	clearTimeout(timesix)
	clearTimeout(timeseven)
	clearTimeout(timeeight)
	clearTimeout(timenine)
	clearTimeout(timeten)
	clearTimeout(news)
	clearTimeout(tor1)
	clearTimeout(tor2)
	clearTimeout(tor3)
	clearTimeout(tor4)
	clearTimeout(tor5)
	clearTimeout(tor6)
	clearTimeout(tor7)
	$('#welcome').fadeOut();
	$('#no2').fadeOut();
	$('#no3').fadeOut()
	$('#no4').fadeOut()
	$('#main').fadeIn();
	document.getElementById('no4').className = 'fullscreen fadeOut';
	document.getElementById('main').style.display = 'block';
		$('#main').fadeIn();
	$('#footer').fadeIn();
	$('#bottom').fadeIn();
	$('#news').fadeIn();
	$('#bottom').fadeIn();
	$('#toggle').fadeIn();
	$('#replit-badge').fadeOut();
	$('#news').fadeOut();
	$('#incase').fadeOut();
	setTimeout(function() {
			$('#footer').fadeOut('fast');
		}, 1500)
} else {
	console.log("no")
}