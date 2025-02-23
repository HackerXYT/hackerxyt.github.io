
let allUsers = {}
let selfClass;
let usersElems = {}
let classes = {}




let waitForIt = {}
// Check if the user entered something
function runNow() {


    if (userInput !== null) {
        


        fetch('https://arc.evoxs.xyz/?metode=merrniEmrat')
            .then(response => response.json())
            .then(names => {
                //namesData = names
                const fullNames = Object.keys(names.names);
                document.getElementById("allSt").innerHTML = '';
                let selfClass = null
                const fetchPromises = fullNames.map(name => {
                    return fetch(`https://arc.evoxs.xyz/?metode=informacion&emri=${name}`)
                        .then(response => response.json())
                        .then(info => {
                            if (info.emri !== foundName) {

                            } else {
                                selfClass = `${info.seksioni}${info.klasa}`
                            }
                            allUsers[info.emri] = info;

                        })
                        .catch(error => {
                            console.error("Jeanne D'arc Database is offline.");
                            console.log('Error:', error);
                        });
                });

                Promise.all(fetchPromises)
                    .then(() => {
                        Object.entries(allUsers).forEach(([key, user]) => {
                            // key -> emri, user -> data
                            if (classes[`${user.seksioni}${user.klasa}`]) {
                                classes[`${user.seksioni}${user.klasa}`].push(user);
                            } else {
                                classes[`${user.seksioni}${user.klasa}`] = [user];
                            }

                            document.getElementById("allSt").innerHTML += `<div class="student">
                <div class="topRow">
            <div class="avatar">
                <img src="${user.foto}" alt="evx-error">
            </div>
            <div class="coll">
            <p>${key.split(" ")[1]}</p>
            <span>${key.split(" ")[0]}</span>
            </div>
            
            </div>
        </div>`
                        });
                        //runNow()

                        console.log(classes);

                        return;
                        Object.entries(classes).forEach(([key, aclass]) => {
                            if (!document.getElementById("allSt").innerText.includes(key)) {
                                document.getElementById("allSt").innerHTML += `<div class="student">
                <div class="topRow">
            <div class="avatar">
                <img src="${null}" alt="evx-error">
            </div>
            <div class="coll">
            <p>${key.split(" ")[1]}</p>
            <span>${key.split(" ")[0]}</span>
            </div>
            
            </div>
        </div>` //${key.includes("ΚΑΘ") ? " style='display: none'" : ""}
                            }
                            console.log(key, aclass)




                            // key -> class, user -> data
                            if (key === selfClass) {

                                //classes[`${user.seksioni}${user.klasa}`].push(user);
                            }

                        });
                    });

                    fetch(`https://arc.evoxs.xyz/?metode=inputs&pin=${userInput}`) //base64Pin
            .then(response => response.text())
            .then(datas => {
                if (datas === 'Ndodhi nje gabim ne Evox!') {
                    return;
                } else {
                    
                    document.querySelector(".accepted").style.opacity = '1'
                    document.querySelector(".accepted").style.display = 'flex'
                    document.querySelector(".login").style.opacity = '0'
                    setTimeout(function () {
                        document.querySelector(".login").style.display = 'none'
                    }, 500)
                }
                const data = JSON.parse(datas)
                document.getElementById("myuser").innerText = data.Self.username
                document.getElementById("selfImg").src = data.Self.foto
                document.getElementById("students").innerHTML = ''
                localStorage.setItem("pinMeta", userInput)

                document.getElementById("inputs").innerHTML = ''

                Object.entries(data).forEach(([key, value]) => { //each user
                    if (value.count === 0) { return; }
                    console.log("as", key)
                    if(key.includes("�") || key.includes("Self")) {
                        console.warn("Invalid character detected in name. Skipping...");
                        return;
                    }
                    let inputs = ``
                    let count = 0

                    document.getElementById("inputs").innerHTML += `<div id="${key.replace(" ", "-")}" class="showInputs">
<p>${key}</p></div>`


                    Object.entries(value.inputs).forEach(([nameEvox, input]) => { //each input
                        console.log(nameEvox.replace('.evox', ''))
                        console.log(allUsers[nameEvox.replace('.evox', '')])
                        count++
                        const ranId = Math.floor(Math.random() * 909999) + 1
                        inputs += `<div class="avatar">
                    <img src="reloading-pfp.gif" alt="evx-error" id="${ranId}-evox">
                </div>` //<vox class="nameInput">${count}. ${nameEvox.replace('.evox', '')}</vox>


                        // Load actual image
                        try {
                            const tempImage = new Image();
                            tempImage.src = allUsers[nameEvox.replace(".evox", "")].foto;
                            tempImage.onload = () => {
                                document.getElementById(`${ranId}-evox`).src = tempImage.src; // Swap to the loaded image
                            };
                        } catch(error) {
                            console.error(error)
                            document.getElementById(`${ranId}-evox`).src = 'snap.png'
                        }
                        

                        const inputToWork = JSON.parse(input)

                        document.getElementById(key.replace(" ", "-")).innerHTML += `<div class="students details">
                    <div class="student">
                        <div class="topRow">
                            <div class="avatar">
                                <img src="${allUsers[nameEvox.replace('.evox', '')].foto !== undefined ? allUsers[nameEvox.replace('.evox', '')].foto : `../oasaMobile/span.png`} "
                                    alt="evx-error">
                            </div>
                            <div class="coll details">
                                <p>${nameEvox.replace(".evox", "").split(" ")[1]}</p>
                                <span>${nameEvox.replace(".evox", "").split(" ")[0]}</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24"
                                fill="none">
                                <path d="M6 12H18M18 12L13 7M18 12L13 17" stroke="#fff" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="avatar">
                                <img src="${value.foto}"
                                    alt="evx-error">
                            </div>


                        </div>
                        <div class="moreInfo nameInput">
                            <p>${inputToWork.vleresim}</p>
                        </div>
                    </div>
                </div>`
                    })
                    console.log(`Name: ${key}`);
                    if(key.includes("�")) {
                        console.warn("Invalid character detected in name. Skipping...");
                        return;
                    }
                    console.log(value.foto !== null, "Fotos:", value.foto, value)
                    const ranId = Math.floor(Math.random() * 909999) + 1


                    document.getElementById("students").innerHTML += `<div class="student">
                    <div class="topRow">
                <div class="avatar">
                    <img id="${ranId}-evox-user" src="user.gif" alt="evx-error">
                </div>
                <div class="coll">
                <p>${key.split(" ")[1]}</p>
                <span>${key.split(" ")[0]}</span>
                </div>
                
                </div>
                <div class="moreInfo nameInput">
                    <p>${inputs}</p>
                </div>
            </div>`
                    try {
                        const tempImage = new Image();
                        tempImage.src = value.foto !== undefined ? value.foto : allUsers[key].foto;
                        tempImage.onload = () => {
                            document.getElementById(`${ranId}-evox-user`).src = tempImage.src; // Swap to the loaded image
                        };
                        Object.entries(value.inputs).forEach(([file, content]) => {
                            console.log(`File: ${file}`);
                            console.log(`Content: ${content}`);
                        });
                    } catch (error) {
                        document.getElementById(`${ranId}-evox-user`).src = 'snap.png'
                    }


                });
            }).catch(error => {
                console.error("Jeanne D'arc Database is offline.")
                console.log('Error:', error);
            });


        fetch('https://arc.evoxs.xyz/?metode=progresin')
            .then(response => response.json())
            .then(progress_global => {
                const progress = progress_global.global
                document.getElementById("countDone").innerHTML = progress.have_participated
                document.getElementById("countFull").innerHTML = progress.total_users
                document.getElementById("countLeft").innerHTML = progress.total_users - progress.have_participated
                const percentage = Number.parseInt(100 * progress.have_participated / progress.total_users)
                //document.getElementById("isDone").innerHTML = percentage + "%"
                updateProgress(percentage);
                const progress_class = progress_global.byclass
                document.getElementById("classes").innerHTML = ''
                Object.entries(progress_class.class_counts).forEach(([key, value]) => {
                    if (key === 'ΚΑΘ') { return; }
                    document.getElementById("classes").innerHTML += `<div class="aclass">
                <div class="left">
                ${key === "ΓΥΓ" ? "Υγείας" : key.includes("ΓΑΝΘ1") ? "Θεωρητ. 1" : key === 'ΓΟΠ1' ? "Οικον. 1" : key === 'ΓΟΠ2' ? "Οικον. 2" : key === "ΓΑΝΘ2" ? "Θεωρητ. 2" : key === "ΓΘΤ" ? "Θετικών" : key}
                <p>${value.have_participated}<vox class="smallto">/${value.total}</vox></p>
                </div>
                <div class="right">
                    ${key === 'ΓΥΓ' ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 32 32">

<defs>

<style>.cls-1{fill:#e291a8;}.cls-2{fill:#dd2853;}</style>

</defs>

<title/>

<g data-name="Layer 22" id="Layer_22">

<path class="cls-1" d="M27.31,7.54a8,8,0,0,0-5.64-2.3h-.09A8,8,0,0,0,16,7.58a8.2,8.2,0,0,0-5.71-2.26,8.17,8.17,0,0,0-5.62,14l.43.39a1.07,1.07,0,0,0,.14.16l10.22,10a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.3l10-10.23a1.06,1.06,0,0,0,.24-.39l.32-.31a8.08,8.08,0,0,0-.12-11.39Z"/>

<path class="cls-2" d="M29,15.13,18.26,15h0a1,1,0,0,0-.92.61L17,14.28a1,1,0,0,0-.61-.67,1,1,0,0,0-.91.11l-1.26.85-1.4-4a1,1,0,0,0-.8-.66,1,1,0,0,0-1,.4L7.57,15,3,15.13a1,1,0,0,0,.06,2L8.11,17a1,1,0,0,0,.78-.41L11.52,13l1.2,3.45a1,1,0,0,0,.63.62,1,1,0,0,0,.88-.12l1.18-.8.79,2.9a1,1,0,0,0,.92.74h.05a1,1,0,0,0,.93-.64L18.93,17,29,17.13h0a1,1,0,0,0,0-2Z"/>

</g>

</svg>`: key.includes('ΓΑΝΘ') ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" viewBox="0 0 512 512" xml:space="preserve">
<polygon style="fill:#B4B4B4;" points="435.298,32.603 256,32.603 235.102,272.301 256,512 435.298,512 "/>
<rect x="76.706" y="32.601" style="fill:#E0E0E0;" width="179.294" height="479.399"/>
<g>
<rect x="150.183" y="103.424" style="fill:#707070;" width="211.634" height="31.347"/>
<rect x="150.674" y="161.061" style="fill:#707070;" width="31.347" height="308.987"/>
<rect x="240.327" y="161.061" style="fill:#707070;" width="31.347" height="308.987"/>
<rect x="329.979" y="161.061" style="fill:#707070;" width="31.347" height="308.987"/>
</g>
<polygon style="fill:#424242;" points="446.794,0 256,0 235.102,32.603 256,65.206 446.794,65.206 "/>
<rect x="65.202" style="fill:#707070;" width="190.798" height="65.202"/>
<path style="fill:#B4B4B4;" d="M65.206,0L44.308,65.206l20.898,65.206c36.012,0,65.206-29.193,65.206-65.206  C130.411,29.193,101.217,0,65.206,0z"/>
<path style="fill:#E0E0E0;" d="M0,65.206c0,36.012,29.193,65.206,65.206,65.206V0C29.193,0,0,29.193,0,65.206z"/>
<path style="fill:#424242;" d="M65.206,40.774L54.757,65.206l10.449,24.432c13.493,0,24.432-10.938,24.432-24.432  C89.637,51.712,78.699,40.774,65.206,40.774z"/>
<path style="fill:#707070;" d="M40.774,65.206c0,13.493,10.938,24.432,24.432,24.432V40.774  C51.712,40.774,40.774,51.712,40.774,65.206z"/>
<path style="fill:#B4B4B4;" d="M446.794,0l-20.898,65.206l20.898,65.206c36.012,0,65.206-29.193,65.206-65.206S482.807,0,446.794,0z  "/>
<path style="fill:#E0E0E0;" d="M381.589,65.206c0,36.012,29.193,65.206,65.206,65.206V0C410.783,0,381.589,29.193,381.589,65.206z"/>
<path style="fill:#424242;" d="M446.794,40.774l-10.449,24.432l10.449,24.432c13.493,0,24.432-10.938,24.432-24.432  S460.288,40.774,446.794,40.774z"/>
<path style="fill:#707070;" d="M422.363,65.206c0,13.493,10.938,24.432,24.432,24.432V40.774  C433.301,40.774,422.363,51.712,422.363,65.206z"/>
</svg>`: key.includes("ΓΟΠ") ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM10.6158 9.5C11.0535 8.71823 11.8025 8 12.7498 8C13.284 8 13.819 8.23239 14.2923 8.70646C14.6824 9.09734 15.3156 9.09792 15.7065 8.70775C16.0973 8.31758 16.0979 7.68442 15.7077 7.29354C14.9274 6.51179 13.9042 6 12.7498 6C11.3289 6 10.1189 6.77025 9.29826 7.86449C8.93769 8.34528 8.64329 8.89783 8.42654 9.5H8C7.44772 9.5 7 9.94772 7 10.5C7 10.9581 7.30804 11.3443 7.72828 11.4626C7.82228 11.4891 7.91867 11.5 8.01613 11.5C7.99473 11.8304 7.99473 12.1696 8.01613 12.5C7.91867 12.5 7.82228 12.5109 7.72828 12.5374C7.30804 12.6557 7 13.0419 7 13.5C7 14.0523 7.44772 14.5 8 14.5H8.42654C8.64329 15.1022 8.93769 15.6547 9.29826 16.1355C10.1189 17.2298 11.3289 18 12.7498 18C13.9042 18 14.9274 17.4882 15.7077 16.7065C16.0979 16.3156 16.0973 15.6824 15.7065 15.2923C15.3156 14.9021 14.6824 14.9027 14.2923 15.2935C13.819 15.7676 13.284 16 12.7498 16C11.8025 16 11.0535 15.2818 10.6158 14.5H12C12.5523 14.5 13 14.0523 13 13.5C13 12.9477 12.5523 12.5 12 12.5H10.0217C9.99312 12.1735 9.99312 11.8265 10.0217 11.5H13C13.5523 11.5 14 11.0523 14 10.5C14 9.94772 13.5523 9.5 13 9.5H10.6158Z" fill="#fff"/>
</svg>` : key.includes("ΓΘΤ") ? `<svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 1024 1024" class="icon" version="1.1"><path d="M857.7 583.1c-6.7-11.8-21.8-15.8-33.5-9-11.8 6.7-15.8 21.8-9.1 33.5 66.6 115.9 83.4 212.6 43.8 252.2-75.7 75.8-311.6-54.5-476-218.9-41.5-41.5-78.8-84.7-111.3-127.9 33.4-45.1 71.3-89.2 111.3-129.2C547.2 219.5 783.1 89.3 858.9 165c30.9 30.9 27.7 97.6-8.9 183-40.1 93.6-114.7 197.7-210 293-22.3 22.3-45.4 43.8-68.7 63.8-10.3 8.8-11.4 24.4-2.6 34.6 8.9 10.3 24.4 11.4 34.6 2.6 24.2-20.8 48.2-43.2 71.4-66.3 99.6-99.6 177.9-209.1 220.4-308.3 45.6-106.3 45-190.5-1.5-237C802 38.8 562.4 135 348.2 349.3c-39.9 39.9-75.7 80.7-107 121.2-28.1-41.7-51.4-83-68.3-122.4-36.6-85.3-39.8-152-8.9-183 39.6-39.6 136.1-22.9 252 43.6 11.7 6.7 26.8 2.7 33.5-9.1 6.7-11.8 2.7-26.8-9.1-33.5-140-80.3-253.4-93.4-311.1-35.7-46.6 46.6-47.1 130.7-1.5 237 20 46.8 48.2 95.8 82.6 145C97.5 674.2 60.7 825.9 129.3 894.5c23.8 23.8 57 35.5 97.6 35.5 58.7 0 132.9-24.6 216.5-73 11.7-6.8 15.7-21.8 8.9-33.6-6.8-11.7-21.8-15.7-33.6-8.9-117.1 68-214.7 85.3-254.7 45.3-51.6-51.6-7.5-177.6 77.8-304.7 31.6 40.9 67.3 81.5 106.3 120.5 99.6 99.6 209.1 177.8 308.4 220.4 52.5 22.5 99.7 33.8 139.6 33.8 40.8 0 73.9-11.8 97.5-35.3 57.7-57.7 44.6-171.2-35.9-311.4zM511.5 430.5c-45.2 0-81.9 36.7-81.9 81.9s36.7 81.9 81.9 81.9 81.9-36.7 81.9-81.9c-0.1-45.2-36.7-81.9-81.9-81.9z" fill="#FFF"/></svg>` : "error"}
                </div>
            </div>`
                    console.log(`Class: ${key}, Total: ${value.total}, Participated: ${value.have_participated}`);
                });
            }).catch(error => {
                console.log('Error:', error);
            });




            }).catch(error => {
                console.error("Jeanne D'arc Database is offline.")
                console.log('Error:', error);
            });

    }

}

function showMenu() {
    document.querySelector(".navbar").classList.toggle("active")
}

function triggerLogin() {
    userInput = document.getElementById("pswd").value
    runNow()
}

let userInput = null;
if (!localStorage.getItem("pinMeta")) {
    document.querySelector(".login").style.opacity = '1'
    setTimeout(function () {
        document.querySelector(".accepted").style.display = 'none'
    }, 500)

    //userInput = prompt("Please enter Evox© access code:");
} else {

    document.querySelector(".accepted").style.opacity = '1'
    document.querySelector(".login").style.opacity = '0'
    setTimeout(function () {
        document.querySelector(".login").style.display = 'none'
    }, 500)
    userInput = localStorage.getItem("pinMeta")
    runNow()
}
let foundName = ""
if (localStorage.getItem("jeanDarc_accountData")) {
    foundName = JSON.parse(localStorage.getItem("jeanDarc_accountData")).name
}

function downl() {
    window.location.href = `https://arc.evoxs.xyz/?metode=excel&pin=${userInput}`
}