function pageReady(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else document.addEventListener("DOMContentLoaded", callback);
}

const Call = {
  init: () => {
    Call.Ui();
  },

  Ui: () => {
    const buttonList = document.querySelectorAll(
    ".ui-container .navigation-controls-container button");

    if (buttonList.length) {
      buttonList.forEach(button => {
        button.onclick = () => {
          button.classList.toggle("active");
          if (button.classList.contains("switch")) {
            button.querySelector(".icon").classList.toggle("active");
          }
          if (button.classList.contains("button-cam-element")) {
            const camElement = document.querySelector(".cam-container");
            Call.playPause(camElement.querySelector("video"));
            camElement.classList.toggle("disabled");
          }
        };
      });
    }
  },

  playPause: video => {
    if (video.paused) video.play();else
    video.pause();
  } };


pageReady(() => {
  Call.init();
});

const Config = {
  hasClass: (element, property) => element.classList.contains(property),
  findElement: (element, parentClass) => {
    const parent = element.parentElement;
    if (!Config.hasClass(parent, parentClass)) {
      return Config.findElement(parent, parentClass);
    }
    return parent;
  } };