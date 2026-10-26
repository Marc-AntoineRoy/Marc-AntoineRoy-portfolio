import { gsap } from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';

export default class Scroller {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    this.element = element;
    this.init();
  }

  init() {
    const scroller = ScrollSmoother.create({
      stagger: 20,
      smoothTouch: 7.5,
    });
  }
}
