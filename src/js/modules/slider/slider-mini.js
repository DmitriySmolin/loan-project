import Slider from "./slider";

export default class MiniSlider extends Slider {
  constructor(container, prev, next, activeClass, animate, autoplay) {
    super(container, prev, next, activeClass, animate, autoplay);
  }

  decorizeSlides() {
    this.slides.forEach((slide) => {
      slide.classList.remove(this.activeClass);
      if (this.animate) {
        slide.querySelector(".card__title").style.opacity = "0.4";
        slide.querySelector(".card__controls-arrow").style.opacity = "0";
      }
    });

    if (this.slides[0].tagName !== "BUTTON") {
      this.slides[0].classList.add(this.activeClass);
    }

    if (this.animate) {
      this.slides[0].querySelector(".card__title").style.opacity = "1";
      this.slides[0].querySelector(".card__controls-arrow").style.opacity = "1";
    }
  }

  nextSlide() {
    //   if (this.slides[1].tagName === "BUTTON" && this.slides[2].tagName === "BUTTON") {
    //     this.container.append(this.slides[0]); //Slide
    //     this.container.append(this.slides[0]); //Btn
    //     this.container.append(this.slides[0]); //Btn
    //     this.decorizeSlides();
    //   } else {
    // this.container.append(this.slides[0]);
    // this.decorizeSlides();
    //   }

    for (let i = 0; i < this.slides.length; i += 1) {
      if (this.slides[1].tagName === "BUTTON" && this.slides[2].tagName === "BUTTON") {
        this.container.append(this.slides[i]); //Btn
        this.container.append(this.slides[i + 1]); //Btn
        break;
      }
    }
    this.container.append(this.slides[0]); //Slide
    this.decorizeSlides();
  }

  prevSlide() {
    for (let i = this.slides.length - 1; i > 0; i -= 1) {
      if (this.slides[i].tagName !== "BUTTON") {
        let active = this.slides[i];
        this.container.insertBefore(active, this.slides[0]);
        this.decorizeSlides();
        break;
      }
    }
  }

  bindTrigges() {
    this.next.addEventListener("click", () => this.nextSlide());
    this.prev.addEventListener("click", () => this.prevSlide());
  }

  activatedAnimation() {
    this.paused = setInterval(() => this.nextSlide(), 5000);
  }

  changeAnimation(selector) {
    selector.addEventListener("mouseenter", () => {
      clearInterval(this.paused);
    });
    selector.addEventListener("mouseleave", () => {
      this.activatedAnimation();
    });
  }

  init() {
    this.container.style.cssText = `
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        align-items: start;
    `;
    this.bindTrigges();
    this.decorizeSlides();

    if (this.autoplay) {
      this.activatedAnimation();
      this.changeAnimation(this.slides[0].parentNode);
      this.changeAnimation(document.querySelector(".slick-prev").parentNode);
    }
  }
}
