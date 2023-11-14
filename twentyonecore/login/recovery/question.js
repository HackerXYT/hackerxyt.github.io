/**********

	This Pen uses no libraries except fonts and should 
	work on all modern browsers
  
	The answers are stored in the `questions` array
	with the key `answer`. 
  
	inspired by XavierCoulombeM
	https://dribbble.com/shots/2510592-Simple-register-form
  
 **********/
var user = localStorage.getItem("Recovery")
$("#myuser").html(user);
$("#myusername").html(user);
document.getElementById("center").style.display = "none"
$("#lan21").fadeIn(500);
setTimeout(function() {
	$("#lan21").fadeOut(500);
}, 900);
setTimeout(function() {
	$("#p2").fadeIn(500);
}, 1500);
setTimeout(function() {
	$("#p2").fadeOut(500);
}, 3200);
setTimeout(function() {
	$("#p3").fadeIn(500);
}, 3800);
setTimeout(function() {
	$("#p3").fadeOut(500);
}, 5500);
setTimeout(function() {
	$("#p4").fadeIn(500);
}, 6000);
setTimeout(function() {
	$("#p4").fadeOut(500);
}, 10000);
setTimeout(function() {
	$("#loading").fadeIn(500);
}, 11000);
setTimeout(function() {
	$("#loading").fadeOut(500);
}, 12900);
setTimeout(function() {
	$("#center").fadeIn(500);
}, 13500);
var questions = [
	{ question: "Welcome " + user + ", what's your first name?" },
	{ question: "What's your last name?" },
	{ question: "What's your email?", pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
	{ question: "What area do you live in (city)?" }
]

/*
	do something after the questions have been answered
*/
var onComplete = function() {

	var h1 = document.createElement('h1')
	h1.appendChild(document.createTextNode(user + ', please wait till we process your info..'))
	setTimeout(function() {
		register.parentElement.appendChild(h1)
		setTimeout(function() { h1.style.opacity = 1 }, 50)
	}, 1000)
	setTimeout(function() {
		h1.style.opacity = 0
	}, 3000)
	setTimeout(function() {
		document.getElementById("center").style.display = "none"
		document.getElementById("loading").style.display = "block"
		setTimeout(function() {
			if (user === "21") {
				if (questions[0].answer === "Gregory" || questions[0].answer === "Greg" || questions[0].answer === "gregory" || questions[0].answer === "gregory") {
					console.log("no1 correct")
					if (questions[1].answer === "Papapostolou" || questions[1].answer === "papostol" || questions[1].answer === "papapostolou" || questions[1].answer === "Papostol") {
						console.log("Last Name Correct")
						if (questions[2].answer === "gregpap03@gmail.com" || questions[2].answer === "pcar1234567@gmail.com" || questions[2].answer === "g.papapostolou2007@icloud.com" || questions[2].answer === "twentyone@t50.onion") {
							console.log("Email Correct")
							if (questions[3].answer === "Athens" || questions[3].answer === "athens" || questions[3].answer === "Piraeus" || questions[3].answer === "piraeus") {
								console.log("City Correct")
								console.log("ALL CORRECT!")
								window.location.href = "loading.html"
								//window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + user + "&ip=" + "blocked"
							} else {
								console.log("City incorrect")
								window.location.href = "./incorrect.html"
							}
						} else {
							console.log("Email Incorrect")
							window.location.href = "./incorrect.html"
						}
					} else {
						console.log("Last Name incorrect")
						window.location.href = "./incorrect.html"
					}
				} else {
					console.log("Name Incorrect!")
					window.location.href = "./incorrect.html"
				}
			} else if (user === "dritsas") {
				if (questions[0].answer === "Nikolas" || questions[0].answer === "nikolas" || questions[0].answer === "Nikos" || questions[0].answer === "nikos") {
					console.log("no1 correct")
					if (questions[1].answer === "Dritsas" || questions[1].answer === "dritsas") {
						console.log("Last Name Correct")
						if (questions[2].answer === "dritsas@hackerx.xyz" || questions[2].answer === "dritsas@gmail.com") {
							console.log("Email Correct")
							if (questions[3].answer === "Athens" || questions[3].answer === "athens" || questions[3].answer === "Piraeus" || questions[3].answer === "piraeus") {
								console.log("City Correct")
								console.log("ALL CORRECT!")
								window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + user + "&ip=" + "blocked"
							} else {
								console.log("City incorrect")
								window.location.href = "./incorrect.html"
							}
						} else {
							console.log("Email Incorrect")
							window.location.href = "./incorrect.html"
						}
					} else {
						console.log("Last Name incorrect")
						window.location.href = "./incorrect.html"
					}
				} else {
					console.log("Name Incorrect!")
					window.location.href = "./incorrect.html"
				}
			} else if (user === "psaltiras") {
				if (questions[0].answer === "Panagioths" || questions[0].answer === "panagioths" || questions[0].answer === "Panagiwths" || questions[0].answer === "panagiwths" || questions[0].answer === "panagiwtis" || questions[0].answer === "Panagiwtis" || questions[0].answer === "panagiotis" || questions[0].answer === "Panagiotis") {
					console.log("no1 correct")
					if (questions[1].answer === "Psalthras" || questions[1].answer === "psalthras" || questions[1].answer === "Psaltiras" || questions[1].answer === "psaltiras") {
						console.log("Last Name Correct")
						if (questions[2].answer === "panpsalt0907@gmail.com" || questions[2].answer === "psaltiras@hackerx.xyz") {
							console.log("Email Correct")
							if (questions[3].answer === "Athens" || questions[3].answer === "athens" || questions[3].answer === "Piraeus" || questions[3].answer === "piraeus") {
								console.log("City Correct")
								console.log("ALL CORRECT!")
								window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + user + "&ip=" + "blocked"
							} else {
								console.log("City incorrect")
								window.location.href = "./incorrect.html"
							}
						} else {
							console.log("Email Incorrect")
							window.location.href = "./incorrect.html"
						}
					} else {
						console.log("Last Name incorrect")
						window.location.href = "./incorrect.html"
					}
				} else {
					console.log("Name Incorrect!")
					window.location.href = "./incorrect.html"
				}
			} else if (user === "talamagas") {
				if (questions[0].answer === "Basilhs" || questions[0].answer === "basilhs" || questions[0].answer === "vasilhs" || questions[0].answer === "vasilis" || questions[0].answer === "Vassilhs" || questions[0].answer === "Vasilis" || questions[0].answer === "Billy" || questions[0].answer === "504") {
					console.log("no1 correct")
					if (questions[1].answer === "Talamagas" || questions[1].answer === "talamagas" || questions[1].answer === "Talamagkas" || questions[1].answer === "talamagkas") {
						console.log("Last Name Correct")
						if (questions[2].answer === "billakostala@gmail.com" || questions[2].answer === "bilakostala@gmail.com") {
							console.log("Email Correct")
							if (questions[3].answer === "Athens" || questions[3].answer === "athens" || questions[3].answer === "Glyfada" || questions[3].answer === "glyfada") {
								console.log("City Correct")
								console.log("ALL CORRECT!")
								window.location.href = "https://language.twentyonecore.com/language/register.html?identity=" + user + "&ip=" + "blocked"
							} else {
								console.log("City incorrect")
								window.location.href = "./incorrect.html"
							}
						} else {
							console.log("Email Incorrect")
							window.location.href = "./incorrect.html"
						}
					} else {
						console.log("Last Name incorrect")
						window.location.href = "./incorrect.html"
					}
				} else {
					console.log("Name Incorrect!")
					window.location.href = "./incorrect.html"
				}
			}
		}, 1000)
	}, 5000)

}

	; (function(questions, onComplete) {

		var tTime = 100 // transition transform time from #register in ms
		var wTime = 200 // transition width time from #register in ms
		var eTime = 1000 // transition width time from inputLabel in ms

		// init
		// --------------
		if (questions.length == 0) return

		var position = 0

		putQuestion()

		forwardButton.addEventListener('click', validate)
		inputField.addEventListener('keyup', function(e) {
			transform(0, 0) // ie hack to redraw
			if (e.keyCode == 13) validate()
		})

		previousButton.addEventListener('click', function(e) {
			if (position === 0) return
			position -= 1
			hideCurrent(putQuestion)
		})


		// functions
		// --------------

		// load the next question
		function putQuestion() {
			inputLabel.innerHTML = questions[position].question
			inputField.type = questions[position].type || 'text'
			inputField.value = questions[position].answer || ''
			inputField.focus()

			// set the progress of the background
			progress.style.width = position * 100 / questions.length + '%'

			previousButton.className = position ? 'ion-android-arrow-back' : 'ion-person'

			showCurrent()

		}

		// when submitting the current question
		function validate() {

			var validateCore = function() {
				return inputField.value.match(questions[position].pattern || /.+/)
			}

			if (!questions[position].validate) questions[position].validate = validateCore

			// check if the pattern matches
			if (!questions[position].validate()) wrong(inputField.focus.bind(inputField))
			else ok(function() {

				// execute the custom end function or the default value set
				if (questions[position].done) questions[position].done()
				else questions[position].answer = inputField.value

				++position

				// if there is a new question, hide current and load next
				if (questions[position]) hideCurrent(putQuestion)
				else hideCurrent(function() {
					// remove the box if there is no next question
					register.className = 'close'
					progress.style.width = '100%'

					onComplete()

				})

			})

		}


		// helper
		// --------------

		function hideCurrent(callback) {
			inputContainer.style.opacity = 0
			inputLabel.style.marginLeft = 0
			inputProgress.style.width = 0
			inputProgress.style.transition = 'none'
			inputContainer.style.border = null
			setTimeout(callback, wTime)
		}

		function showCurrent(callback) {
			inputContainer.style.opacity = 1
			inputProgress.style.transition = ''
			inputProgress.style.width = '100%'
			setTimeout(callback, wTime)
		}

		function transform(x, y) {
			register.style.transform = 'translate(' + x + 'px ,  ' + y + 'px)'
		}

		function ok(callback) {
			register.className = ''
			setTimeout(transform, tTime * 0, 0, 10)
			setTimeout(transform, tTime * 1, 0, 0)
			setTimeout(callback, tTime * 2)
		}

		function wrong(callback) {
			register.className = 'wrong'
			for (var i = 0; i < 6; i++) // shaking motion
				setTimeout(transform, tTime * i, (i % 2 * 2 - 1) * 20, 0)
			setTimeout(transform, tTime * 6, 0, 0)
			setTimeout(callback, tTime * 7)
		}

	}(questions, onComplete))