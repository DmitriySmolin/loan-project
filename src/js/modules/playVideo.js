export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector(".close");
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {
    this.btns.forEach((btn, i) => {
      try {
        const blodckedElem = btn.closest(".module__video-item").nextElementSibling;

        if (i % 2 === 0) {
          blodckedElem.setAttribute("data-disabled", "true");
        }
      } catch (error) {}

      btn.addEventListener("click", () => {
        if (
          !btn.closest(".module__video-item") ||
          btn.closest(".module__video-item").getAttribute("data-disabled") !== "true"
        ) {
          this.activeBtn = btn;

          if (document.querySelector("iframe#frame")) {
            this.overlay.style.display = "flex";
            if (this.url !== btn.getAttribute("data-url")) {
              this.url = btn.getAttribute("data-url");
              this.player.loadVideoById({
                videoId: this.url,
              });
            }
          } else {
            this.url = btn.getAttribute("data-url");
            this.createPlayer(this.url);
          }
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

  onPlayerStateChange(state) {
    try {
      const blockedElem = this.activeBtn.closest(".module__video-item").nextElementSibling;
      const playBtn = this.activeBtn.querySelector("svg").cloneNode(true);

      if (state.data === 0) {
        if (blockedElem.querySelector(".play__circle").classList.contains("closed")) {
          blockedElem.querySelector(".play__circle").classList.remove("closed");
          blockedElem.querySelector("svg").remove();
          blockedElem.querySelector(".play__circle").append(playBtn);
          blockedElem.querySelector(".play__text").textContent = "play video";
          blockedElem.querySelector(".play__text").classList.remove("attention");
          blockedElem.style.cssText = `
        opacity:1;
        filter:none;
        `;
          blockedElem.setAttribute("data-disabled", "false");
        }
      }
    } catch (error) {}
  }

  createPlayer(url) {
    this.player = new YT.Player("frame", {
      height: "100%",
      width: "100%",
      videoId: `${url}`,
      events: {
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  init() {
    if (this.btns.length > 0) {
      const tag = document.createElement("script");

      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindBtnClose();
    }
  }
}
