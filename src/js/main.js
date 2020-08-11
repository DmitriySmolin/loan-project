import VideoPlayer from "./modules/playVideo";
import MainSlider from "./modules/slider/slider-main";

window.addEventListener("DOMContentLoaded", () => {
  const slider = new MainSlider({
    page: ".page",
    btns: ".next",
  });
  slider.render();

  const player = new VideoPlayer(".showup .play", ".overlay");
  player.init();
});
