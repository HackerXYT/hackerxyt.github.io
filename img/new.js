function getUrlParameter(name) {
	name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

$("#container").fadeOut("slow", function() {
    document.getElementById("text").innerHTML = `
        <h1>Please Wait..</h1><p><div id="loading_indicator" style="grid-column: 1;display:none" class="item">
        <i class="loader --3"></i>
    </div></p><p>Your account information is being retrieved</p>`
    $("#text").fadeIn("slow", function() {
        $("#loading_indicator").fadeIn("fast")
        setTimeout(function() {
            let username;
            if(localStorage.getItem("user")) {
                username = localStorage.getItem("user")
                show_dash(username)
            } else {
                username = "user"
                show_dash(username)
            }
            $("#bottom-logo").fadeIn("slow", function() {
                
            })
        }, 2000)
            
    })
})


if(localStorage.getItem("auto_t50") === "true") {
	console.log("Param",getUrlParameter('stop'))
	console.log(window.location.href)
	if(getUrlParameter('stop')) {
		console.log("Redirect Canceled")
	} else {
		window.location.href = "../../1index.html"
	}
}

function setup_settings() {
    $("#acc_email").html(localStorage.getItem("user_email"))
    $("#acc_ver").html(localStorage.getItem("acc-verified"))
    if(localStorage.getItem("pfpdata")) {
        $("#pfp_exist").html("<span style='color:blue'>true</span>")
    } else {
        $("#pfp_exist").html("<span style='color:red'>false</span>")
    }
    
    $("#last_login").html(localStorage.getItem("lastlogin"))
    //CLIENT

    if(localStorage.getItem("auto_t50")) {
        $("#auto_t50").html("<a style='color:blue' id='autot50_on_off'>true</a>")
    } else {
        $("#auto_t50").html("<a style='color:red' id='autot50_on_off'>false</a>")
    }
    
    if(localStorage.getItem("auto_connect_database")) {
        document.getElementById("auto_con_db_text").innerHTML = "<span style='color:blue'>true</span>"
    } else {
        document.getElementById("auto_con_db_text").innerHTML = "<span style='color:red'>false</span>"
    }
    if(localStorage.getItem("update_status")) {
        document.getElementById("update_status").innerHTML = "<span style='color:blue'>true</span>"
    } else {
        document.getElementById("update_status").innerHTML = "<span style='color:red'>false</span>"
    }
    let url = localStorage.getItem("srv")
    url = url.replace(/^https:\/\//, '');
    url = url.replace(/\/$/, '');
    $("#srv_url").html(`<span style='font-size:13px'>${url}</span>`)

}
setup_settings()

document.addEventListener('touchmove', function(event) {
	event.preventDefault();
}, { passive: false });

function logoff() {
	$("#popup").fadeOut("slow")
	doSomething()
}

function close_popup() {
	$("#popup").fadeOut("slow")
}

function restart() {
	$("#popup").fadeOut("fast", function() {
		$("#text").fadeOut("fast", function() {
			$("#bottom-logo").fadeOut("fast", function() {
				$("#settings").fadeOut("fast", function() {
					window.location.reload()
				})
			})
		})

	})

}

$('#auto_t50').click(function() {
	if(localStorage.getItem("auto_t50") && localStorage.getItem("auto_t50")=== "true") {
        $("#autot50_on_off").html("<a style='color:red' id='autot50_on_off'>false</a>")
        localStorage.removeItem("auto_t50")
    } else {
        $("#autot50_on_off").html("<a style='color:blue' id='autot50_on_off'>true</a>")
        localStorage.setItem("auto_t50", true)
    }

});
function delete_acc() {
	const jsonUrl = `https://evox-app-data.memeguy21.repl.co/users/${localStorage.getItem("username")}-${localStorage.getItem("password")}.remove`;

	fetch(jsonUrl)
	$("#bottom-logo").fadeOut("fast", function() {
		setTimeout(function() {
			document.getElementById("bottom-logo").src = "another_logo.png"
			$("#bottom-logo").fadeIn("slow", function() {
			})
		}, 1000)

	})
	localStorage.removeItem("username")
	localStorage.removeItem("password")
	$("#text").fadeOut("slow", function() {
		$("#popup").fadeOut("slow", function() {
		})
		enable()
		$("#settings").fadeOut("slow", function() {
			document.getElementById("username").value = ""
			document.getElementById("password").value = ""
			$("#container").fadeIn("slow", function() {
			})
		})
	})
}

var button2 = document.getElementById("settings");
button2.addEventListener("mousedown", startHoldTimer);
button2.addEventListener("mouseup", cancelHoldTimer);
button2.addEventListener("mouseleave", cancelHoldTimer);

// Touch events
button2.addEventListener("touchstart", startHoldTimer);
button2.addEventListener("touchend", cancelHoldTimer);
button2.addEventListener("touchcancel", cancelHoldTimer);

function goto_register() {
	$("#container").fadeOut("slow", function() {
		$("#bottom-logo").fadeOut("slow", function() {
			$("#register").fadeOut("slow", function() {
				window.location.href = "../Register/index.html"
			})
		})
	})
}

function limit(element, max_chars) {
	if (element.value.length > max_chars) {
		element.value = element.value.substr(0, max_chars);
	}
}
function minmax(value, min, max) {
	if (parseInt(value) < min || isNaN(parseInt(value)))
		return 0;
	else if (parseInt(value) > max)
		return 100;
	else return value;
}
// Fade duration in milliseconds

function fadeError(method) {
	var targetColor = "rgb(255, 99, 71)";
	var fadeDuration = 2000;
	let element;
	if (method == "1") {
		element = document.getElementById("username");
		element.style.backgroundColor = targetColor;
	} else if (method == "2") {
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	} else if (method == "3") {
		element1 = document.getElementById("username");
		element1.style.backgroundColor = targetColor;
		element2 = document.getElementById("password");
		element2.style.backgroundColor = targetColor;
		setTimeout(function() {
			element1.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
			element2.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
		}, 2000)
		return;
	}
	setTimeout(function() {
		element.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
	}, 2000)
}

function VerificationNeeded(method) {
	var targetColor = "rgb(169, 173, 43)";
	var fadeDuration = 2000;
	let element;
	if (method == "1") {//username
		element = document.getElementById("username");
		element.style.backgroundColor = targetColor;
	} else if (method == "2") {//password
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	} else if (method == "3") {//all
		element = document.getElementById("username");
		element.style.backgroundColor = targetColor;
		element = document.getElementById("password");
		element.style.backgroundColor = targetColor;
	}
	setTimeout(function() {
		element.style.backgroundColor = "rgba(252, 252, 252, 0.259)";
	}, 2000)
}
function enable() {
	setTimeout(function() {
		$("#register").fadeIn("slow", function() { })
		document.getElementById("submit").disabled = false;
		document.getElementById("submit").innerHTML = `Login`
	}, 500)
}
const input = document.getElementById('username');
const button = document.getElementById('submit');
input.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		// Simulate a click on the button
		button.click();
	}
});
const input2 = document.getElementById('password');
input2.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		// Simulate a click on the button
		button.click();
	}
});

$('.settings-button').click(function() {
	if (document.getElementById("popup").style.display == "" || document.getElementById("popup").style.display == "none") {
		document.getElementById("settings_username_ph").innerHTML = localStorage.getItem("user")
		$('#popup').fadeIn("slow");
	} else if (document.getElementById("popup").style.display == "block") {
		$('#popup').fadeOut("slow");
	}

});



var holdTimer;

function startHoldTimer() {
	holdTimer = setTimeout(doSomething, 500); // 2000 milliseconds = 2 seconds
}

function cancelHoldTimer() {
	clearTimeout(holdTimer);
}

function doSomething() {
	if (confirm('Log off your account?')) {
		// Save it!
		$("#bottom-logo").fadeOut("fast", function() {
			setTimeout(function() {
				document.getElementById("bottom-logo").src = "another_logo.png"
				$("#bottom-logo").fadeIn("slow", function() {
				})
			}, 1000)

		})
		localStorage.removeItem("user")
		localStorage.removeItem("password")
		$("#text").fadeOut("slow", function() {
			enable()
			$("#settings").fadeOut("slow", function() {
				document.getElementById("username").value = ""
				document.getElementById("password").value = ""
				$("#container").fadeIn("slow", function() {
				})
			})
		})
	} else {
		// Do nothing!
	}
}

function show_dash(username) {
	$("#container").fadeOut("slow", function() {
		$("#text").fadeOut("fast", function() {
            if(username === "user") {
                document.getElementById("text").innerHTML = `
                <h1>Welcome to T50</h1><br>
                <p style="text-align: center">All systems are operational.<br>Client is ready to connect.<br>Login required.<!--<br><br>Click here to <a style="color: red" onclick="delete_acc()">Delete Your Account</a></p>--></p>
                                            <a style="display: none" onclick="load_app('login')" href="#" id="app1"><img style="height:115px;width:115px;" src="../login-select.png" alt="Logo" ></a>&nbsp;<a style="display: none" onclick="load_app('t50')" href="#" id="app2"><img style="height:115px;width:115px;" src="../t50-select.png" alt="Logo" ></a>			
            
                            <div style="display: none" class="loading loading--dots" title="Loading" id="loadapp">
                        <svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" xml:space="preserve">
                        <path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952
                        s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
                        <animate
                        attributeName="fill"
                        dur="3s"
                        begin="0s"
                        repeatCount="indefinite"
                        values="#B200ED;
                        #2596be;
                        #B200ED;"/>
                        </path>
                        <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
                        s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
                        attributeName="fill"
                        dur="3s" 
                        begin="1s"
                        repeatCount="indefinite"
                        values="#B200ED;
                        #2596be;
                        #B200ED;"/>
                        </path>
                        <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
                        S512,289.609,512,256S484.657,195.048,451.048,195.048z">
                        <animate
                        attributeName="fill"
                        dur="3s" 
                        begin="2s"
                        repeatCount="indefinite"
                        values="#B200ED;
                        #2596be;
                        #B200ED;"/>
                        </path>
                        </svg>
                        </div><p style="display:none" id="notice_text_app">Loading&nbsp;apps..</p>`
            } else {
                document.getElementById("text").innerHTML = `
	<h1>Welcome to T50</h1><br>
	<p style="text-align: center">All systems are operational.<br>Client is ready to connect, ${username}.<!--<br><br>Click here to <a style="color: red" onclick="delete_acc()">Delete Your Account</a></p>--></p>
								<a style="display: none" onclick="load_app('login')" href="#" id="app1"><img style="height:115px;width:115px;" src="../login-select.png" alt="Logo" ></a>&nbsp;<a style="display: none" onclick="load_app('t50')" href="#" id="app2"><img style="height:115px;width:115px;" src="../t50-select.png" alt="Logo" ></a>			

            	<div style="display: none" class="loading loading--dots" title="Loading" id="loadapp">
            <svg version="1.1" id="loading-dots" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 512 512" xml:space="preserve">
            <path d="M60.952,195.048C27.343,195.048,0,222.391,0,256s27.343,60.952,60.952,60.952
            s60.952-27.343,60.952-60.952S94.562,195.048,60.952,195.048z">
            <animate
            attributeName="fill"
            dur="3s"
            begin="0s"
            repeatCount="indefinite"
            values="#B200ED;
            #2596be;
            #B200ED;"/>
            </path>
            <path d="M256,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
            s60.952-27.343,60.952-60.952S289.609,195.048,256,195.048z">      <animate
            attributeName="fill"
            dur="3s" 
            begin="1s"
            repeatCount="indefinite"
            values="#B200ED;
            #2596be;
            #B200ED;"/>
            </path>
            <path d="M451.048,195.048c-33.609,0-60.952,27.343-60.952,60.952s27.343,60.952,60.952,60.952
            S512,289.609,512,256S484.657,195.048,451.048,195.048z">
            <animate
            attributeName="fill"
            dur="3s" 
            begin="2s"
            repeatCount="indefinite"
            values="#B200ED;
            #2596be;
            #B200ED;"/>
            </path>
            </svg>
            </div><p style="display:none" id="notice_text_app">Loading&nbsp;apps..</p>`
            }
			
			$("#text").fadeIn("slow", function() {
				$("#bottom-logo").fadeOut("fast", function() {

					setTimeout(function() {
						document.getElementById("bottom-logo").src = "footer-in.png"
						$("#bottom-logo").fadeIn("slow", function() {
							$("#notice_text_app").fadeIn("slow")
							$("#loadapp").fadeIn("slow", function() {

								setTimeout(function() {
									$("#notice_text_app").fadeOut("slow")
									$("#loadapp").fadeOut("slow", function() {

									if(username === "user"){
                                        $("#app1").fadeIn("slow", function() {

                                        })
                                    } else {
                                        $("#app2").fadeIn("slow", function() {

                                        })
                                    }

									})
								}, 2000)

							})
							setTimeout(function() {
								$("#bottom-logo").fadeOut("fast", function() {

									document.getElementById("bottom-logo").src = "evox-verified.png"
									$("#bottom-logo").fadeIn("slow", function() {
										setTimeout(function() {
											$("#bottom-logo").fadeOut("fast", function() {
												document.getElementById("bottom-logo").src = "footer-in.png"
												$("#bottom-logo").fadeIn("slow", function() {

												})
											})
										}, 5000)
									})
								})
							}, 2000)
						})
					}, 1000)
				})
			})

            if(username === "user") {
                $("#register").fadeOut("slow")
            } else {
                $("#settings").fadeIn("slow")
                $("#register").fadeOut("slow")
            }
			
			// Animation complete.
		});
	});
}

function load_app(application) {
	if (application === "chatvia") {
		if (!localStorage.getItem("user")) {
			localStorage.setItem("user", localStorage.getItem("username"))
			$("#popup").fadeOut("fast", function() {
				$("#text").fadeOut("fast", function() {
					$("#bottom-logo").fadeOut("fast", function() {
						$("#settings").fadeOut("fast", function() {
							window.location.href = "../ChatVia"
						})
					})
				})
			})
		} else {
			$("#popup").fadeOut("fast", function() {
				$("#text").fadeOut("fast", function() {
					$("#bottom-logo").fadeOut("fast", function() {
						$("#settings").fadeOut("fast", function() {
							window.location.href = "../ChatVia"
						})
					})
				})
			})
		}
	} else if (application === "t50") {
		localStorage.setItem("auto_t50", true)
		$("#popup").fadeOut("fast", function() {
			$("#text").fadeOut("fast", function() {
				$("#bottom-logo").fadeOut("fast", function() {
					$("#settings").fadeOut("fast", function() {
						window.location.href = "../../1index.html"
					})
				})
			})
		})
	} else if (application === "login") {
        $("#popup").fadeOut("fast", function() {
			$("#text").fadeOut("fast", function() {
				$("#bottom-logo").fadeOut("fast", function() {
                    sessionStorage.setItem("login:redirect", "/evox-app/")
					$("#settings").fadeOut("fast", function() {
						window.location.href = "../../Login/index.html"
					})
				})
			})
		})
    }

}
