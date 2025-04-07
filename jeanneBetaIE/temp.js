let skipScreen;
function disableRightClick(imageSrc) {
    skipScreen = 0;
    document.addEventListener("contextmenu", function (event) {
        if (skipScreen == 21) return;
        event.preventDefault();
        if (skipScreen > 1) {
            skipScreen = 21;
            EvalertNext({
                "title": "Καλωσόρισες ξανά 👋",
                "description": "Η λειτουργία προγραμματιστή είναι πλέον ενεργή.",
                "buttons": ["Συνέχεια"],
                "buttonAction": [],
                "addons": []
            })
            //document.getElementById("loginContainer").style.display = null
            //document.getElementById("loadText").innerHTML = `Dev Mode Enabled`
            //document.getElementById("loadText").style.opacity = '1'
//
//
            //localStorage.setItem("devBypass", "temp")
//
            //$("#device-warning").fadeOut("fast")
            //$("#hexa").fadeOut('fast')
            //$("#tasks").fadeIn("fast")
            //setTimeout(function () {
            //    document.dispatchEvent(new Event("DOMContentLoaded"));
            //    setTimeout(function () {
            //        localStorage.removeItem("devBypass")
            //    }, 800)
            //}, 700)



        } else {
            skipScreen = 21;
            const img = document.createElement("img");
            img.src = imageSrc;
            img.style.position = "absolute";
            img.style.left = `${event.pageX}px`;
            img.style.top = `${event.pageY}px`;
            img.style.zIndex = "1000";
            img.style.pointerEvents = "none";
            img.style.width = "50px";
            img.style.height = "auto";

            document.body.appendChild(img);
            skipScreen++
            setTimeout(() => img.remove(), 300);
        }

    });
}

//disableRightClick("../evox-epsilon-beta/epsilon-transparent.png");
disableRightClick("assetView-2.png");
