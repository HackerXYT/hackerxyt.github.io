
const navbarItemsHover = document.querySelectorAll('.navbar-item');
navbarItemsHover.forEach(item => {
    item.addEventListener('mouseover', function () {
        // Mouseover (hover) event handler
        item.style.borderRadius = "5px";
        item.style.backgroundColor = "#232323"
    });

    item.addEventListener('mouseout', function () {
        item.style.backgroundColor = "transparent"
    });

    item.ontouchstart = function () {
        // Add a class or change style when touched
        item.style.borderRadius = "5px";
        item.style.backgroundColor = "#232323"
    };

    item.ontouchend = function () {
        // Remove the class or revert style when touch ends
        item.style.backgroundColor = "transparent"
    };
});


setTimeout(function () {
    document.getElementById("yourapps").classList.add('hover-effect');
}, 500)

function handleService(what) {
    console.log(what)
    navbarItems.forEach(item => {
        item.classList.remove('hover-effect')
    });
    setTimeout(function () {
        what.style.backgroundColor = "transparent"
    }, 250)

    what.classList.add('hover-effect')

}

const navbarItems = document.querySelectorAll('.navbar-item');

// Attach event listeners
navbarItems.forEach(item => {
    item.addEventListener('click', function () {
        handleService(item)
    });
});

let oldOffset = document.getElementById("navBar").offsetWidth
if (document.getElementById("navBar").offsetWidth > 269) {
    document.getElementById("navBar").style.width = "288px"
    const theNew = window.innerWidth - 288
    let newLeft = window.innerWidth - theNew

    console.log(theNew, 'width')
    console.log(newLeft, 'left')
    document.getElementById("container").style.left = `${newLeft}px`
    document.getElementById("container").style.width = `${theNew}px`
} else {
    document.getElementById("notificationIcon").style.marginLeft = "50px"
    document.documentElement.style.setProperty('--SearchWidth', '90%');
    document.documentElement.style.setProperty('--appContWith', '90.5%');
    document.documentElement.style.setProperty('--horLine', '100%');
    document.documentElement.style.setProperty('--verLine', '192%');
    document.documentElement.style.setProperty('--sideBarWidth', '-21%');
    document.documentElement.style.setProperty('--sideDisplay', 'none');
}

function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Usage:
let element = document.querySelector('#accInfo');
if (isElementInViewport(element)) {
    console.log('Element is visible');
} else {
    document.documentElement.style.setProperty('--setProfile', '70px');
    document.documentElement.style.setProperty('--navbarMargin', '1px');
    console.log("Not Visible")
    //alert('Element is not visible');
    //document.getElementById("topImage").style.opacity = "0"
    //setTimeout(function() {
    //    document.getElementById("topImage").style.display = "none"
    //}, 500)
}

function changeAppSection(elem) {
    let div = document.getElementById("yoapps")
    let div1 = document.getElementById("mu")
    let div2 = document.getElementById("ru")
    let div3 = document.getElementById("tf")

    let cha;

    if (elem.innerHTML.includes("Most Used")) {
        cha = 'mu'
        div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path d="M11.8114 6.7267C12.8247 4.9089 13.3314 4 14.0889 4C14.8464 4 15.353 4.9089 16.3663 6.7267L16.6285 7.19699C16.9164 7.71355 17.0604 7.97183 17.2849 8.14225C17.5094 8.31266 17.789 8.37592 18.3482 8.50244L18.8572 8.61762C20.825 9.06284 21.8089 9.28545 22.0429 10.0382C22.277 10.7909 21.6063 11.5753 20.2648 13.1439L19.9177 13.5498C19.5365 13.9955 19.3459 14.2184 19.2602 14.4942C19.1744 14.7699 19.2032 15.0673 19.2609 15.662L19.3133 16.2035C19.5162 18.2965 19.6176 19.343 19.0047 19.8082C18.3919 20.2734 17.4707 19.8492 15.6283 19.0009L15.1517 18.7815C14.6281 18.5404 14.3664 18.4199 14.0889 18.4199C13.8114 18.4199 13.5496 18.5404 13.0261 18.7815L12.5494 19.0009C10.707 19.8492 9.78581 20.2734 9.17299 19.8082C8.56016 19.343 8.66157 18.2965 8.86438 16.2035L8.91685 15.662C8.97449 15.0673 9.0033 14.7699 8.91756 14.4942C8.83181 14.2184 8.64121 13.9955 8.26 13.5498L7.91295 13.1439C6.57147 11.5753 5.90073 10.7909 6.1348 10.0382C6.36888 9.28545 7.35275 9.06284 9.3205 8.61762L9.82958 8.50244C10.3887 8.37592 10.6683 8.31266 10.8928 8.14225C11.1173 7.97183 11.2613 7.71355 11.5492 7.19699L11.8114 6.7267Z" fill="#757575"/>
                        <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M8.74549 5.20241C6.76387 4.63138 4.63821 4.933 2.58729 6.13407L2.37913 6.25598C2.0217 6.4653 1.56226 6.34523 1.35293 5.9878C1.14361 5.63037 1.26368 5.17092 1.62111 4.9616L1.82927 4.8397C4.18969 3.45737 6.73702 3.0626 9.16083 3.76106L9.36871 3.82096C9.76673 3.93566 9.99641 4.35129 9.88171 4.74931C9.76702 5.14733 9.35139 5.37701 8.95337 5.26231L8.74549 5.20241ZM4.83628 9.93646C4.87144 10.3492 4.56537 10.7123 4.15265 10.7474C3.99949 10.7605 3.88206 10.7679 3.78365 10.7742C3.60627 10.7854 3.49069 10.7928 3.33902 10.8219C3.14253 10.8596 2.8874 10.9394 2.4244 11.1709C2.05391 11.3562 1.60341 11.206 1.41817 10.8355C1.23293 10.465 1.38309 10.0145 1.75358 9.8293C2.29057 9.5608 2.68032 9.42092 3.05627 9.34876C3.30317 9.30137 3.55804 9.28477 3.78724 9.26984C3.87053 9.26441 3.95043 9.25921 4.02533 9.25283C4.43804 9.21767 4.80112 9.52374 4.83628 9.93646ZM5.91788 15.8561C4.73392 15.5786 3.48653 15.8538 2.55316 16.5892C2.22781 16.8456 1.75624 16.7896 1.49988 16.4643C1.24353 16.1389 1.29946 15.6674 1.62482 15.411C2.92261 14.3884 4.63911 14.0158 6.2601 14.3956C6.66339 14.4901 6.91371 14.8937 6.81921 15.297C6.72471 15.7003 6.32117 15.9506 5.91788 15.8561Z" fill="#757575"/>
                        </svg>Most Used`
    } else if (elem.innerHTML.includes("Recently Updated")) {
        cha = 'ru'
        div.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
<path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#757575"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.25C12.4142 7.25 12.75 7.58579 12.75 8V11.6893L15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2626 15.3232 13.9697 15.0303L11.4697 12.5303C11.329 12.3897 11.25 12.1989 11.25 12V8C11.25 7.58579 11.5858 7.25 12 7.25Z" fill="white"/>
</svg>Recently Updated`
    } else if (elem.innerHTML.includes("Testflights")) {
        cha = 'tf'
        div.innerHTML = `<svg fill="#757575" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 52 52" xml:space="preserve">
<g>
	<path d="M52,26C52,11.727,40.438,0.108,26.189,0.005C26.173,0.005,26.157,0,26.141,0h-0.281c-0.017,0-0.032,0.005-0.049,0.005
		C11.561,0.108,0,11.727,0,26c0,4.635,1.225,8.987,3.36,12.76c0.02,0.038,0.031,0.079,0.053,0.117l0.141,0.245
		c0.021,0.037,0.05,0.066,0.073,0.102C8.16,46.864,16.49,52,26,52c9.51,0,17.84-5.135,22.373-12.776
		c0.023-0.037,0.053-0.066,0.075-0.104l0.139-0.242c0.021-0.037,0.032-0.077,0.052-0.114C50.774,34.99,52,30.637,52,26z M50,26
		c0,3.095-0.595,6.051-1.667,8.77c-0.333-0.435-0.755-0.804-1.264-1.066h0l-16.131-8.317c-0.17-1.372-0.887-2.566-1.938-3.361
		l0.863-18.123c0.027-0.576-0.084-1.128-0.298-1.636C41.114,3.994,50,13.978,50,26z M46.644,38.22
		c-0.244,0.366-0.597,0.626-1.016,0.727c-0.457,0.111-0.933,0.028-1.341-0.234l-14.481-9.307l1.046-1.813l15.299,7.888c0,0,0,0,0,0
		c0.434,0.224,0.746,0.595,0.878,1.043c0.12,0.41,0.071,0.845-0.126,1.243C46.819,37.919,46.733,38.071,46.644,38.22z M7.712,38.712
		c-0.411,0.265-0.889,0.35-1.342,0.238c-0.417-0.1-0.771-0.363-1.016-0.732c-0.089-0.15-0.175-0.301-0.261-0.453
		c-0.193-0.394-0.242-0.829-0.121-1.24c0.132-0.451,0.443-0.821,0.875-1.044l15.299-7.888l1.046,1.813L7.712,38.712z M23,26
		c0-1.654,1.346-3,3-3s3,1.346,3,3s-1.346,3-3,3S23,27.654,23,26z M24.954,21L24.135,3.807c-0.023-0.488,0.142-0.943,0.465-1.282
		c0.311-0.326,0.74-0.507,1.209-0.52C25.873,2.004,25.936,2,26,2c0.064,0,0.127,0.004,0.19,0.005
		c0.467,0.013,0.895,0.194,1.208,0.523c0.324,0.34,0.49,0.794,0.467,1.279L27.046,21H24.954z M22.432,2.266
		c-0.213,0.508-0.323,1.059-0.295,1.635c0,0.001,0,0.001,0,0.001L23,22.026c-1.051,0.796-1.768,1.99-1.938,3.361L4.931,33.704
		c-0.51,0.263-0.931,0.632-1.263,1.069C2.596,32.053,2,29.096,2,26C2,13.979,10.885,3.995,22.432,2.266z M26,50
		c-7.578,0-14.342-3.534-18.744-9.036c0.537-0.072,1.06-0.262,1.537-0.568v-0.001l15.246-9.797C24.642,30.855,25.304,31,26,31
		s1.358-0.145,1.961-0.403l15.246,9.797c0.477,0.307,1,0.495,1.539,0.567C40.344,46.465,33.579,50,26,50z"/>
</g>
</svg>Testflights`
    } else {
        return;
    }

    div1.classList.remove("active")
    div2.classList.remove("active")
    div3.classList.remove("active")

    if(cha === 'mu') {
        div1.classList.add("active")
    } else if(cha === 'ru') {
        div2.classList.add("active")
    } else if(cha === 'tf') {
        div3.classList.add("active")
    } else {
        alert(`Error! ${cha} is not identified.`)
    }

}

const draggableT = document.getElementById('navbar-tasco');
const draggableA = document.getElementById('navbar-activity');
const draggableM = document.getElementById('navbar-messages')
const draggableS = document.getElementById('navbar-social');
const draggableSS = document.getElementById('navbar-settings');
const draggableU = document.getElementById('navbar-updates');
const dropZone = document.getElementById('drop-zone');


draggableT.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
});
draggableA.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
});
draggableM.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
});
draggableS.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
});
draggableSS.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
});
draggableU.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.dataTransfer.effectAllowed = 'move';
});
dropZone.addEventListener('dragover', (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    dropZone.classList.add('drag-over');

});
dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});
dropZone.addEventListener('drop', (event) => {
    event.preventDefault();
    const id = event.dataTransfer.getData('text/plain');
    console.log(id)
    //const draggableElement = document.getElementById(id);
    //dropZone.appendChild(draggableElement);
    dropZone.classList.remove('drag-over');
    if(id === "navbar-tasco") {

    }
    if(id === "navbar-settings") {
        console.log("hit")
        document.getElementById("settings-side").style.display = "flex"
    }
    document.getElementById("drop-zone").style.display = "none"
});