if (localStorage.getItem("houseAuth") === 'ready') {
  window.location.href = "./dist?code=21"
}
var select = function (s) {
  return document.querySelector(s);
},
  selectAll = function (s) {
    return document.querySelectorAll(s);
  },
  animationWindow = select('#animationWindow'),
  anim = lottie.loadAnimation({
    container: animationWindow,
    renderer: 'svg',
    loop: false,
    autoplay: true,
    //initialSegment: [0, 420],
    path: 'https://assets.codepen.io/5260898/SHS_HomeManagement.json'
  });

anim.addEventListener('DOMLoaded', onDOMLoaded);
anim.setSpeed(1);

function onDOMLoaded(e) {

  anim.addEventListener('complete', function () {
    /*   if(anim.currentFrame > 0) {
        anim.setDirection(-1);
      } else {
        anim.setDirection(1);
       
      }
      anim.play(); */

    //console.log(anim.currentFrame)
    //anim.goToAndPlay(240, true);
    anim.playSegments([360, 480], true);
    //anim.loop = true;  
    //anim.playSegments(420, 0)
    //alert("Complete")
    window.location.href = "./dist?code=21"
  }
  )
}

//ScrubLottieTimeline(anim)