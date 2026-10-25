import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export default class Scroller {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    this.element = element;
    this.options = {
      hasSkew: false,
      hasScale: false,
      hasPinItems: false,
    };
    this.init();
  }

  init() {
    this.setOptions();
    const scroller = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      smoothTouch: 0.1,
      onUpdate: this.onUpdateScroll.bind(this),
      onStop: this.onStopScroll.bind(this),
      ease: 'expo.out',
    });
  }

  setOptions() {
    // skew et scale
    if ('skew' in this.element.dataset) {
      this.options.hasSkew = true;
      this.initSkewScale();
    }
    if ('scale' in this.element.dataset) {
      this.options.hasScale = true;
      this.initSkewScale();
    }

    // pins
    if ('pinItems' in this.element.dataset) {
      this.options.hasScale = true;
      this.initPins();
    }

    // scroll horiz
    if (this.element.querySelector('.js-horiz')) {
      this.initHoriz();
    }
  }

  // -------------------------------------------------------
  //  SKEW AND SCALE CONTROLS
  // -------------------------------------------------------

  // changer le skew en fonction du scroll -----------------
  onUpdateScroll(self) {
    if (this.options.hasSkew) this.updateSkew(self);
    if (this.options.hasScale) this.updateScale(self);
  }

  onStopScroll(self) {
    if (this.options.hasSkew) this.stopSkew(self);
    if (this.options.hasScale) this.stopScale(self);
  }
  // update skew -----------------
  updateSkew(self) {
    // console.log(self.getVelocity);

    const velocity = self.getVelocity();
    const force = 5;
    let skew = gsap.utils.mapRange(-1000, 1000, -force, force, velocity);
    skew = gsap.utils.clamp(-force, force, skew);

    this.skewSetter(skew);
  }
  stopSkew() {
    this.skewSetter(0);
  }

  // update scale -----------------
  updateScale(self) {
    console.log(self.getVelocity);

    const velocity = self.getVelocity();
    let scale = 1 + velocity / 1000;
    scale = gsap.utils.clamp(0.8, 1.2, scale);

    this.scaleSetter(scale);
  }
  stopScale() {
    this.scaleSetter(1);
  }

  // seting le skew -----------------
  initSkewScale() {
    this.skewSetter = gsap.quickTo('img', 'skewY');
    this.scaleSetter = gsap.quickTo('img', 'scaleY');
  }

  // -------------------------------------------------------
  //  PINS CONTROLS
  // -------------------------------------------------------
  initPins() {
    console.log('pins');

    const pinnedItems = this.element.querySelectorAll('.js-pinned');
    for (let i = 0; i < pinnedItems.length; i++) {
      const pinnedItem = pinnedItems[i];

      ScrollTrigger.create({
        pin: pinnedItem,
        trigger: pinnedItem.parentElement, // ajuster selon structure
        start: 'center center',
        end: '95% center',
        // markers: true, // seulement pour le debug
      });
    }
  }

  // -------------------------------------------------------
  //  PINS CONTROLS
  // -------------------------------------------------------
  initHoriz() {
    const sectionHoriz = this.element.querySelector('.js-horiz');

    // Pour s'il y a plus qu'une section horiz
    // QuerySelectorAll Horiz
    // Boucler dans les sections
    // createHoriz

    const panels = sectionHoriz.querySelectorAll('.js-panel');
    const nbPanels = panels.length - 1;
    const buffer = 200;

    gsap.to(panels, {
      xPercent: -100 * nbPanels,
      ease: 'none',
      scrollTrigger: {
        pin: true,
        trigger: sectionHoriz,
        scrub: 1,
        snap: 1 / nbPanels,
        end: () => '+=' + (sectionHoriz.offsetWidth + buffer),
      },
    });
  }
}
