export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
  }

  bindTriggers() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (document.querySelector("iframe#frame")) {
          this.overlay.style.display = "flex";
        } else {
          const url = btn.getAttribute("data-url");
          this.createPlayer(url);
        }
      });
    });
  }

  bindBtnClose() {
    this.overlay.addEventListener("click", () => {
      this.overlay.style.display = "none";
      this.player.stopVideo();
    });
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
    });
  }

  init() {
    const tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    this.bindTriggers();
    this.bindBtnClose();
  }
}
