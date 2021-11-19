console.clear();
// register the plugins to use.
gsap.registerPlugin(Draggable, InertiaPlugin, DrawSVGPlugin);

// target range-slider
const gravity = document.querySelector(".gravity-range");

// setup dial transformOrigin
gsap.set(".dial", { transformOrigin: "50% 50%", rotation: "135deg" });

// ui color
const colorSetter = gsap
  .timeline({ paused: true, defaults: { ease: "none" } })
  .fromTo("body", { "--current-ui": "#198D00" }, { "--current-ui": "#FFB300" })
  .to("body", { "--current-ui": "#C50000" });

// font-weight (variable font)
const gravityWeight = gsap.fromTo(
  "body",
  {
    "--weight": 400
  },
  { "--weight": 900, ease: "none", paused: true }
);

// gravity number
const gNumber = { num: 09.8 };
const gravityNumber = gsap.fromTo(
  gNumber,
  { num: 0.1 },
  { num: 19.6, ease: "none", paused: true }
);

// bounce height
let yBounce = -150;
const bounceOMeter = gsap
  .timeline({ defaults: { duration: 0.5 }, repeatRefresh: true, repeat: -1 })
  .to(".ball", {
    y: () => {
      return yBounce;
    },
    ease: "power2.out"
  })
  .to(".ball", { y: 0, ease: "power2.in" });

// bounceOMeter timescale
const bounceSpeed = gsap.fromTo(
  bounceOMeter,
  { timeScale: 0.1 },
  { paused: true, timeScale: 8, duration: 1, ease: "circ.in" }
);

// gravity meter guage
const gravOMeter = gsap.from(".grav-o-meter", {
  paused: true,
  ease: "none",
  drawSVG: "100% 100%"
});

//  handle range/draggable inputs
const numberEl = document.querySelector(".number");
let isDragging = false;

const handleRangeInput = (isDragging) => {
  // chrome gradient
  gsap.set("body", { "--range-gradient": `${gravity.value}%` });

  // tween progress of the progress ring
  gsap.to([gravOMeter, colorSetter, gravityWeight], {
    progress: (gravity.value - 0) / 100
  });

  // ui rings
  gsap.to(".ring", {
    y: gsap.utils.mapRange(100, 0, 0, 567, gravity.value),
    stagger: { amount: 0.333 }
  });

  // other tweens progress
  gsap.set([gravityNumber, bounceSpeed], {
    progress: gravity.value / 100
  });

  // set bounce height for repreat refresh
  yBounce = gsap.utils.mapRange(0, -100, 0, -450, gravity.value - 100);

  if (gNumber.num < 10) {
    numberEl.innerHTML = `0${gNumber.num.toFixed(1)}`;
  } else {
    numberEl.innerHTML = `${gNumber.num.toFixed(1)}`;
  }

  // is dragging?
  if (isDragging !== true) {
    gsap.to(".dial", {
      duration: 0.5,
      rotate: `${(gravity.value / 100) * 270}deg`
    });
  }
};

handleRangeInput();

// setup input function
gravity.oninput = handleRangeInput;

// create draggable
Draggable.create(".dial", {
  type: "rotation",
  bounds: { maxRotation: 270, minRotation: 0 },
  inertia: true,
  snap: (value) => Math.round(value / (270 / 100)) * (270 / 100),
  onDrag() {
    gravity.value = (this.rotation / this.maxRotation) * 100;
    handleRangeInput(true);
  },
  onThrowUpdate() {
    gravity.value = (this.rotation / this.maxRotation) * 100;
    handleRangeInput(true);
  }
});