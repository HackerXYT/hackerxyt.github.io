const container = document.getElementById('body');
const changeColorButton = document.getElementById('changeColorButton');
const randomNum = Math.random();


function changemode() {
	const newColor = generateRandomColor();
	container.style.transition = 'background-color 5s ease';
	container.style.backgroundColor = newColor;
}

function generateRandomColor() {
	let color = '#5e222e';
	console.log(color)
	return color;
}

setTimeout(function() {
	$("#loading_ind").fadeOut("fast", function() {
		$("#loading_ind").html(`
        <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none"><path stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/><path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/><path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
		$("#loading_ind").fadeIn("slow", function() {
			setTimeout(function() {
				$("#loading_ind").fadeOut("slow")
				$("#img").fadeOut("slow", function() {
					$("#loading_ind").fadeIn("slow", function() {
						setTimeout(function() {
							$("#loading_ind").html(`
                                <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                        <path stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                        <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                <path stroke="#36e036" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
							setTimeout(function() {
								$("#loading_ind").html(`
                                <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                        <path stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                        <path stroke="#36e036" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
								setTimeout(function() {
									$("#loading_ind").html(`
                                    <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                            <path stroke="#36e036" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                            <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                    <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
									setTimeout(function() {
										$("#loading_ind").html(`
                                        <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                                <path stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                                <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                        <path stroke="#36e036" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
										setTimeout(function() {
											$("#loading_ind").html(`
                                            <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                                    <path stroke="#333" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                                    <path stroke="#36e036" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                            <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
											setTimeout(function() {
												$("#loading_ind").html(`
                                                <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                                        <path stroke="#36e036" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                                        <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                                <path stroke="#333" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
												setTimeout(function() {
													$("#loading_ind").html(`
                                                    <svg class="centered-image" style="left:50%;right:50%;margin: auto;" xmlns="http://www.w3.org/2000/svg" width="60px" height="60px" viewBox="0 0 192 192" fill="none">
                                                            <path stroke="#068c06" stroke-linecap="round" stroke-linejoin="round" stroke-width="12" d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"/>
                                                            <path stroke="#068c06" stroke-linecap="round" stroke-width="12" d="M96 46a50 50 0 1 1 0 100"/>
                                                    <path stroke="#36e036" stroke-linecap="round" stroke-width="12" d="M96 70a26.003 26.003 0 0 1 24.021 16.05 26.012 26.012 0 0 1 0 19.9 26.023 26.023 0 0 1-5.636 8.435A26.015 26.015 0 0 1 96 122"/></svg>`)
													setTimeout(function() {
														$("#loading_ind").fadeOut("slow", function() {
															setTimeout(function() {
																x()
															}, 800)

														})
													}, 2100)

												}, 500)
											}, 500)
										}, 500)
									}, 500)
								}, 500)
							}, 500)
							//setTimeout(function() {
							//    $("#loading_ind").fadeOut("slow", function() {
							//        $("#loading_ind").html(`<svg width="80px" height="80px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
							//        <path d="M2 16C2 8.26801 8.26801 2 16 2C23.732 2 30 8.26801 30 16C30 23.732 23.732 30 16 30C8.26801 30 2 23.732 2 16Z" fill="#59316B"/>
							//        <path d="M17.0341 5.64229L16.4629 7.96739C17.272 6.32521 18.5572 5.0895 20.0329 4C18.9539 5.28452 17.9703 6.56916 17.3673 7.85369C18.3828 6.39022 19.7473 5.57729 21.2863 5.04069C19.2395 6.91062 17.6148 8.91715 16.3772 10.9334L15.3936 10.4944C15.5679 8.88465 16.1614 7.23589 17.0341 5.64229Z" fill="#ABCD03"/>
							//        <path d="M14.4073 10.0669L16.2796 10.8629C16.2796 11.3508 16.2409 12.8389 16.5386 13.2779C19.6525 17.3877 19.1286 25.6259 15.9079 25.8372C11.0033 25.8372 9.13281 22.4227 9.13281 19.2844C9.13281 16.4226 12.4805 14.5202 14.4798 12.8292C14.9875 12.3739 14.8994 11.3677 14.4073 10.0669Z" fill="#FFFCDB"/>
							//        <path d="M16.2803 10.8345L16.955 11.1872C16.8916 11.6424 16.9867 12.6507 17.4309 12.9107C19.3984 14.1627 21.2547 15.5286 21.9846 16.8944C24.5868 21.7075 20.16 26.1626 16.3362 25.7399C18.4147 24.1626 19.0176 20.9269 18.2402 17.3984C17.9229 16.0162 17.4309 14.7642 16.5582 13.3496C16.1801 12.6552 16.3121 11.794 16.2803 10.8345Z" fill="white"/>
							//        <path d="M15.9552 10.7157L17.3514 10.9108C16.9389 12.3092 18.1607 13.2847 18.5573 13.5125C19.4458 14.0166 20.3026 14.5369 20.9849 15.171C22.2702 16.3742 23 18.0653 23 19.8539C23 21.6262 22.2066 23.3335 20.8739 24.4717C19.6204 25.5449 17.891 26.0002 16.2091 26.0002C15.1619 26.0002 14.2258 25.9515 13.2104 25.6099C10.894 24.8132 9.16445 22.7807 9.02167 20.3416C8.89469 18.4391 9.30723 16.992 10.7512 15.4798C11.4968 14.6831 13.0042 13.7725 14.0356 13.0408C14.5434 12.683 15.0828 11.6748 14.0514 9.7725L14.2577 9.60986L15.7862 10.659L14.4958 10.114C14.6068 10.2766 14.9083 11.0083 14.9719 11.2197C15.1147 11.8213 15.0512 12.4068 14.9242 12.6668C14.2738 13.8701 13.1631 14.1953 12.354 14.8782C10.9259 16.0814 9.37101 17.0408 9.54551 20.3416C9.62486 21.9675 10.8625 23.9513 12.7187 24.8782C13.766 25.3986 14.9719 25.6099 16.1936 25.6749C17.2883 25.7237 19.3827 25.057 20.5251 24.0814C21.7468 23.0409 22.4291 21.4636 22.4291 19.8539C22.4291 18.2278 21.7944 16.6831 20.6044 15.5936C19.9221 14.9595 18.7957 14.1953 18.0976 13.7887C17.3995 13.3822 16.5268 12.244 16.8123 11.1546L15.9552 10.7157Z" fill="#000000"/>
							//        <path d="M15.5267 13.1221C15.3839 13.8701 15.2252 15.2196 14.5906 15.7237C14.3208 15.9188 14.051 16.114 13.7655 16.309C12.6231 17.1059 11.4806 17.8537 10.9572 19.7724C10.8461 20.179 10.9414 20.618 11.0366 21.0245C11.3222 22.1952 12.1313 23.4635 12.766 24.2115C12.766 24.244 12.893 24.3254 12.893 24.3579C13.4166 24.9921 13.5753 25.1709 15.5585 25.6261L15.5109 25.8538C14.3209 25.5287 13.3373 25.236 12.7184 24.5042C12.7184 24.488 12.6073 24.3741 12.6073 24.3741C11.9409 23.5935 11.1316 22.2928 10.8303 21.0733C10.7192 20.5854 10.6241 20.2115 10.7509 19.7073C11.2903 17.7237 12.4645 16.9431 13.6545 16.1139C13.9243 15.9351 14.2416 15.7723 14.4954 15.561C14.9872 15.1871 15.2568 14.0488 15.5267 13.1221Z" fill="#000000"/>
							//        <path d="M16.0344 16.2114C16.0504 17.057 15.9698 17.4812 16.176 18.0829C16.3029 18.4405 16.7316 18.9284 16.8586 19.4C17.0331 20.0342 17.2231 20.7333 17.2071 21.1561C17.2071 21.644 17.1773 22.5541 16.9711 23.5298C16.8139 24.336 16.4514 25.0277 15.842 25.4199C15.2178 25.2881 14.4848 25.0633 14.0522 24.6832C13.2113 23.9353 12.4665 22.6846 12.3713 21.5951C12.292 20.7009 13.1 19.382 14.2265 18.7154C15.1784 18.1463 15.3998 17.4977 15.606 16.457C15.3205 17.3675 15.0523 18.1309 14.1321 18.6186C12.7993 19.3341 12.1154 20.535 12.1789 21.6732C12.274 23.1366 12.8459 24.1282 13.9723 24.925C14.4483 25.2665 15.3375 25.6273 15.8929 25.7249V25.6505C16.314 25.5697 16.8592 24.8609 17.1309 23.9019C17.3689 23.0401 17.4627 21.9372 17.4467 21.2379C17.4308 20.8315 17.2558 19.9511 16.9384 19.1544C16.7639 18.7154 16.4959 18.2765 16.3213 17.9675C16.1311 17.6583 16.1297 16.9919 16.0344 16.2114Z" fill="#000000"/>
							//        <path d="M15.9395 19.3999C15.9553 19.969 16.1784 20.6982 16.2735 21.4462C16.353 21.9991 16.3185 22.5545 16.3026 23.0424C16.2869 23.6071 16.1033 24.6189 15.8524 25.111C15.6158 24.9998 15.5233 24.873 15.3695 24.6682C15.1792 24.3918 15.05 24.1153 14.923 23.7902C14.8278 23.5462 14.7166 23.267 14.6689 22.9419C14.6054 22.4541 14.6232 21.691 15.1626 20.9105C15.5751 20.2925 15.6697 20.2456 15.8125 19.5301C15.6219 20.1642 15.4799 20.2289 15.0355 20.7654C14.5438 21.3508 14.4619 22.213 14.4619 22.9121C14.4619 23.2049 14.5758 23.5297 14.687 23.8386C14.8139 24.1638 14.9228 24.4877 15.0973 24.7315C15.3596 25.1269 15.6953 25.3517 15.8597 25.3938C15.8607 25.394 15.8622 25.3935 15.8633 25.3938C15.8668 25.3946 15.8708 25.3968 15.8742 25.3975V25.3789C16.182 25.0271 16.3673 24.6777 16.4296 24.3259C16.509 23.9032 16.5272 23.4795 16.5749 22.9754C16.6224 22.5526 16.5879 21.9831 16.4768 21.3979C16.3183 20.6661 16.0506 19.9201 15.9395 19.3999L15.9395 19.3999Z" fill="#000000"/>
							//        <path d="M15.9871 12.439C16.003 13.2844 16.0664 14.8618 16.2886 15.4796C16.352 15.6909 16.939 16.6178 17.3515 17.7397C17.6371 18.5202 17.7006 19.2357 17.7482 19.447C17.9386 20.3739 17.7006 21.9348 17.3832 23.4145C17.2246 24.2112 16.6851 25.2031 16.0663 25.5934L15.9395 25.821C16.2886 25.8047 17.1452 24.943 17.4467 23.8698C17.9545 22.0487 18.1607 21.2031 17.9228 19.1868C17.8911 18.9916 17.8118 18.3251 17.5103 17.6096C17.066 16.5201 16.4313 15.4795 16.3521 15.268C16.2092 14.9267 16.0188 13.447 15.9871 12.439Z" fill="#000000"/>
							//        <path d="M16.2845 11.2827C16.2375 12.1516 16.2249 12.4716 16.3834 13.1057C16.5579 13.8049 17.4466 14.813 17.8115 15.9675C18.5096 18.1789 18.3351 21.0732 17.8273 23.3333C17.637 24.1299 16.7324 25.2846 15.8281 25.6584L16.4945 25.821C16.8594 25.8047 17.7955 24.9105 18.1605 23.8861C18.7474 22.2763 18.8586 20.3577 18.6205 18.3414C18.6046 18.1463 18.2872 16.4065 17.9859 15.6748C17.5574 14.5854 16.7958 13.6097 16.7165 13.3985C16.5739 13.0407 16.2604 12.2979 16.2845 11.2827Z" fill="#000000"/>
							//        <rect x="15.7803" y="10.6714" width="0.492005" height="15.0036" fill="#000000"/>
							//        </svg>`)
							//        $("#loading_ind").fadeIn("slow", function() {})
							//    })
							//    //x()
							//}, 2000)
						}, 2300)
					})


					//x()
				})

			}, 1000)

		})

	})



}, 2000)

function x() {


	$("#cont").html(`<img id="img" style="display: none" src="t50_marios_design2.png" alt="Centered Image" class="centered-image"><p id="welcome" style="display: none"><span style="display:none;color: #18191a;font-family: 'Bold';font-size: larger" id="name">Commander</span> <span style="color: #18191a;" id="first_name">*********</span>&nbsp;Is&nbsp;Back&nbsp;Online</p><p id="notice" style="font-family:'Bold';font-size:larger;color:#8c8d8f;display:none">New <span style="color:#bf1313">T50</span> <span style="color:#37a32a">Updates</span> And <span style="color:#e8e4e4">Messages</span> Will Show Up Here<p>`)
	$("#img").fadeIn("fast", function() {


	})
	setTimeout(function() {
		changemode()
		setTimeout(function() {
			$("#welcome").fadeIn("slow", function() {
				setTimeout(function() {
					$("#first_name").fadeOut("slow", function() {
						$("#name").fadeIn("slow")
						setTimeout(function() {
							$("#welcome").fadeOut("slow", function() {
								setTimeout(function() {
									load_msgs()
								}, 2500)
								setTimeout(function() {
									$("#notice").fadeIn("slow", function() {
										setTimeout(function() {
											$("#notice").fadeOut("slow")
										}, 5000)
									})
								}, 700)
							})
						}, 4000)
					})
				}, 500)
			})
		}, 4500)
	}, 400)


}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function load_msgs() {
	let PH = {
		"MSG1": {
			"msg": "eimaste sto meros perimenoyme",
			"user": "32"
		},
		"MSG2": {
			"msg": "Μεινετε εκει οπου να ναι θα τους δειτε",
			"user": "15"
		},
		"MSG3": {
			"msg": `Φτασαμε 19013 ειμαστε 18 ατομα. <span style='color: green'>[συναντηση]</span>`,
			"user": "90"
		},
		"MSG4": {
			"msg": "<b><span style='color: red'>32-15</span></b> EXOUME SHMA TA MATIA SAS STA BOREIA",
			"user": "6"
		},
		"MSG5": {
			"msg": "Παιδια μου καλημερα",
			"user": "<b>Trial</b>-26"
		},
		"MSG6": {
			"msg": "ειμαι στην διαθεση σας αν θελετε δωρεαν πιτσες και καφεδες :)",
			"user": "<b>Trial</b>-26"
		},
		"MSG7": {
			"msg": "koita dw typades poy mpenoyn t50",
			"user": "10"
		},
		"MSG8": {
			"msg": "afentiko mono na ton valeis sto team ee",
			"user": "10"
		},
		"MSG9": {
			"msg": "<b><span style='color: red'>10</span></b> Ειμαι πολυ χρησιμος συνεργατη αληθεια!",
			"user": "<b>Trial</b>-26"
		},
		"MSG10": {
			"msg": "<b><span style='color: red'>10</span></b> Μην κρινεις ενα βιβλιο απο το εξωφυλλο του σωστα? ;)",
			"user": "26"
		},
		"MSG11": {
			"msg": "<b><span style='color: red'>26</span></b> tin douleia sou jeftilla",
			"user": "10"
		},//ΗΕRΕ
		"MSG12": {
			"msg": "<b><span style='color: white'>SUPPORT</span></b> ΘΥΜΑ ΕΜΦΑΝΕΣ",
			"user": "32"
		},
		"MSG13": {
			"msg": "<b><span style='color: red'>32</span></b> Προχωρηστε οπως λεει το πλανο",
			"user": "15"
		},
		"MSG14": {
			"msg": "<b><span style='color: red'>32</span></b> Ειμαστε απο πανω σας",
			"user": "56"
		},
		"MSG15": {
			"msg": "<b><span style='color: red'>32</span></b> Οι moretti ειναι στην θεση τους. <b>Καταστρεψτε τους</b>",
			"user": "13"
		},
		"MSG16": {
			"msg": "<b><span style='color: red'>32</span></b> Περιμενετε σημα απο 13",
			"user": "15"
		},// φδσ
		"MSG17": {
			"msg": "Να ερθω;",
			"user": "26"
		},
		"MSG18": {
			"msg": "<b><span style='color: white'>SUPPORT</span></b> Οι 2/3 στο πατωμα ο ενας σοβαρα τραυματισμενος",
			"user": "15"
		},
		"MSG19": {
			"msg": "<b><span style='color: white'>SUPPORT</span></b> Ο 3/3 βρεθηκε απο moretti. σκοτωθηκε",
			"user": "15"
		},
		"MSG20": {
			"msg": "<b><span style='color: white'>SUPPORT</span></b> Ετοιμοι",
			"user": "32"
		},
		"MSG21": {
			"msg": "<b><span style='color: white'>SUPPORT</span></b> Γυρναμε κεντρικα με 2 τραυματισμενους - 1 νεκρο",
			"user": "32"
		},
		"MSG22": {
			"msg": "Μπραβο αγορινες, σας περιμενουμε",
			"user": "15"
		}
	};
	load(PH.MSG1.msg, PH.MSG1.user)
	setTimeout(function() {
		load(PH.MSG2.msg, PH.MSG2.user)
	}, 8000)
	setTimeout(function() {
		load(PH.MSG3.msg, PH.MSG3.user)
	}, 10000)
	setTimeout(function() {
		load(PH.MSG4.msg, PH.MSG4.user)
	}, 16000)
	setTimeout(function() {
		load(PH.MSG5.msg, PH.MSG5.user)
	}, 14000)
	setTimeout(function() {
		load(PH.MSG6.msg, PH.MSG6.user)
	}, 19000)


	setTimeout(function() {
		load(PH.MSG12.msg, PH.MSG12.user)
	}, 57000)
	setTimeout(function() {
		load(PH.MSG13.msg, PH.MSG13.user)
	}, 63000)
	setTimeout(function() {
		load(PH.MSG14.msg, PH.MSG14.user)
	}, 67000)
	setTimeout(function() {
		load(PH.MSG16.msg, PH.MSG16.user)
	}, 67600)
	setTimeout(function() {
		load(PH.MSG15.msg, PH.MSG15.user)
	}, 79000)
	setTimeout(function() {
		load(PH.MSG17.msg, PH.MSG17.user)
	}, 88000)
	setTimeout(function() {
		load(PH.MSG18.msg, PH.MSG18.user)
	}, 110000)
	setTimeout(function() {
		load(PH.MSG19.msg, PH.MSG19.user)
	}, 118000)
	setTimeout(function() {
		load(PH.MSG20.msg, PH.MSG20.user)
	}, 128000)
	setTimeout(function() {
		load(PH.MSG21.msg, PH.MSG21.user)
	}, 135000)
	setTimeout(function() {
		load(PH.MSG22.msg, PH.MSG22.user)
	}, 149000)



	//κοιτα τυπαδες
	setTimeout(function() {
		load(PH.MSG7.msg, PH.MSG7.user)
	}, 27000)
	setTimeout(function() {
		load(PH.MSG8.msg, PH.MSG8.user)
	}, 36000)
	//26
	setTimeout(function() {
		load(PH.MSG9.msg, PH.MSG9.user)
	}, 43000)
	setTimeout(function() {
		load(PH.MSG10.msg, PH.MSG10.user)
	}, 52000)
	setTimeout(function() {
		load(PH.MSG11.msg, PH.MSG11.user)
	}, 58000)
}

function load(msg, user) {
	let identity = getRandomInt(1, 100)
	let backup = document.getElementById("chat").innerHTML
	document.getElementById("chat").innerHTML = `${backup}<br>
	<div style="display: none" id="${identity}" class="rectangle">
          <p><b>${user}</b>: ${msg}</p>
      </div>`
	show(identity)
}

function show(id) {
	//$(`#${id}`).fadeIn("fast")
	document.getElementById(`${id}`).style.display = "flex"
}