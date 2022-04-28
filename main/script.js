const video = document.getElementById("video");
const videoo = document.getElementById("video2");
const video3 = document.getElementById("video3");
const video4 = document.getElementById("video4");
const video5 = document.getElementById("video5");
const player = document.getElementById("my_video_1");

window.onload = function() {
    document.addEventListener("contextmenu", function(e){
      e.preventDefault();
    }, false);
    document.addEventListener("keydown", function(e) {
    //document.onkeydown = function(e) {
      // "I" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
        disabledEvent(e);
				window.location.href = "./banned.html";
      }
      // "J" key
      if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
        disabledEvent(e);
				window.location.href = "./banned.html";
      }
      // "S" key + macOS
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        disabledEvent(e);
				window.location.href = "./banned.html";
      }
      // "U" key
      if (e.ctrlKey && e.keyCode == 85) {
        disabledEvent(e);
				window.location.href = "./banned.html";
      }
      // "F12" key
      if (event.keyCode == 123) {
        disabledEvent(e);
				window.location.href = "./banned.html";
      }
    }, false);
    function disabledEvent(e){
      if (e.stopPropagation){
        e.stopPropagation();
      } else if (window.event){
        window.event.cancelBubble = true;
      }
      e.preventDefault();
      return false;
    }
  };

$(function () {
 $(".sidebar-link").click(function () {
  $(".sidebar-link").removeClass("is-active");
  $(this).addClass("is-active");
 });
});

$(window)
 .resize(function () {
  if ($(window).width() > 1090) {
   $(".sidebar").removeClass("collapse");
  } else {
   $(".sidebar").addClass("collapse");
  }
 })
 .resize();

const allVideos = document.querySelectorAll(".video");

allVideos.forEach((v) => {
 v.addEventListener("mouseover", () => {
  const video = v.querySelector("video");
  video.play();
 });
 v.addEventListener("mouseleave", () => {
  const video = v.querySelector("video");
  video.pause();
 });
});

$(function () {
 $(".logo, .logo-expand, .discover").on("click", function (e) {
  $(".main-container").removeClass("show");
  $(".main-container").scrollTop(0);
 });
 $(".trending, .video").on("click", function (e) {
  $(".main-container").addClass("show");
  $(".main-container").scrollTop(0);
  $(".sidebar-link").removeClass("is-active");
  $(".trending").addClass("is-active");
 });

 $(".video").click(function () {
  var source = $(this).find("source").attr("src");
  var title = $(this).find(".video-name").text();
  var person = $(this).find(".video-by").text();
  var img = $(this).find(".author-img").attr("src");
  $(".video-stream video").stop();
  $(".video-stream source").attr("src", source);
  $(".video-stream video").load();
  $(".video-p-title").text(title);
  $(".video-p-name").text(person);
  $(".video-detail .author-img").attr("src", img);
 });
});


const today = new Date();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

const num = ["12", "21", "35", "7", "26", "13", "74", "5"]

const count = {
  Server: `${num[Math.floor(Math.random() * num.length)]}`,
  Identity: 'user',
  Version: '3.1'
};

window.addEventListener("load", function(){
	console.log('%cHackerX Site', `
  background: black;
  border: 3px solid magenta;
  color: magenta;
  font-size: 50px;
  margin: 40px;
  padding: 20px;
`);
	console.log("%cYou Are Accessing Private Data Of HackerX's Servers! \nYou Will Be Banned Soon!", 'color: red; font-size: 30px;');
	console.log("Time Connected:" + time)
	console.log("Welcome Back user!")
	setTimeout(() => {  console.log("%c Default Settings Have Been Loaded! ", 'background: #222; color: #bada55'); }, 300);
	setTimeout(() => {  console.log("%c Connected To Database! ", 'background: #222; color: #00FF00'); }, 400);
	setTimeout(() => {  console.log("%cUser Info Is Not Being Stored!", 'background: #222; color: #AE00FF'); }, 500);
	setTimeout(() => {  console.dirxml(count); }, 500);
setTimeout(() => {
		console.group('%cOnline Servers', 'font-size: 20px; color: green;');
		console.log("12");
		console.log('21');
		console.log('35');
		console.log('7');
		console.log('26');
		console.log('13');
		console.log('74');
		console.log('5');
		console.groupEnd(); }, 2000);
	window.localStorage.setItem('identity', 'user');
	window.localStorage.setItem('developer', 'false');
});


video.addEventListener("click", (e) => {
	setTimeout(() => {  console.log("Requesting File From Server.."); }, 500);
	setTimeout(() => {  console.log("Ready"); }, 1000);
	setTimeout(() => {  console.log(" "); }, 1600);
})

videoo.addEventListener("click", (e) => {
	setTimeout(() => {  console.log("Requesting File From Server.."); }, 500);
	setTimeout(() => {  console.log("Ready"); }, 1000);
	setTimeout(() => {  console.log(" "); }, 1600);
})

video3.addEventListener("click", (e) => {
	setTimeout(() => {  console.log("Requesting File From Server.."); }, 500);
	setTimeout(() => {  console.log("Ready"); }, 1000);
	setTimeout(() => {  console.log(" "); }, 1600);
})

video4.addEventListener("click", (e) => {
	setTimeout(() => {  console.log("Requesting File From Server.."); }, 500);
	setTimeout(() => {  console.log("Ready"); }, 1000);
	setTimeout(() => {  console.log(" "); }, 1600);
})

video5.addEventListener("click", (e) => {
	setTimeout(() => {  console.log("Requesting File From Server.."); }, 500);
	setTimeout(() => {  console.log("Ready"); }, 1000);
	setTimeout(() => {  console.log(" "); }, 1600);
})

player.addEventListener("click", (e) => {
	setTimeout(() => {  console.log("Media Player Interaction"); }, 500);
})