var socket = io(':3000/');

var form = document.getElementById('form');
var input = document.getElementById('input');
var messages = document.getElementById('messages');

//form.addEventListener('submit', function (e) {
//    e.preventDefault();
//    if (input.value) {
//        socket.emit('chat message', input.value);
//        input.value = '';
//    }
//});

socket.on('chat message', function (msg) {
    var item = document.createElement('li');
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

document.addEventListener("DOMContentLoaded", function () {
    let spoil = document.getElementById("spoil")
    spoil.style.transform = 'scale(2)'
    spoil.style.opacity = '0'

    setTimeout(function () {
        spoil.style.display = 'none'
        let topOne = document.getElementById("topOne")
        topOne.style.display = ''
    }, 1000)

})