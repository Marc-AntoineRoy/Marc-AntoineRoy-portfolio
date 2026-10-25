import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText.js';

export default class TextAnim {
  constructor(element) {
    gsap.registerPlugin(SplitText);
    this.element = element;
    this.options = {
      repeat: false,
    };

    document.fonts.ready.then(this.init.bind(this));
  }

  init() {
    this.setOptions();
    this.split = SplitText.create(this.element, {
      type: 'chars, words, lines',
      mask: 'chars, lines',
      autoSplit: true,
    });
    this.initAnim();
    this.initObserver();
  }

  initObserver() {
    const observer = new IntersectionObserver(this.watch.bind(this), {
      rootMargin: '0px 0px 0px 0px',
    });
    observer.observe(this.element);
  }

  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting) {
        this.anim(true);
        if (!this.options.repeat) observer.unobserve(target);
      } else {
        this.anim(false);
      }
    }
  }

  initAnim() {
    if ('top' in this.element.dataset) {
      gsap.set(this.split.chars, {
        yPercent: '-100',
        autoAlpha: 0,
      });
    }
    if ('right' in this.element.dataset) {
      gsap.set(this.split.chars, {
        xPercent: '-100',
        autoAlpha: 0,
      });
    }
  }

  // façon plus rtapide et simple de faire le anim in et out, basically standardiser les fonctions
  anim(isAnimIn) {
    const alpha = isAnimIn ? 1 : 0;
    const y = isAnimIn ? 0 : '-100';
    const x = isAnimIn ? 0 : '100';

    if ('top' in this.element.dataset) {
      gsap.to(this.split.chars, {
        duration: 1,
        yPercent: y,
        autoAlpha: alpha,
        delay: 0.25,
        stagger: 0.025,
        ease: 'expo.out',
      });
    }

    if ('left' in this.element.dataset) {
      gsap.to(this.split.chars, {
        duration: 1,
        xPercent: x,
        autoAlpha: alpha,
        delay: 0.25,
        stagger: 0.01,
        ease: 'expo.out',
      });
    }
  }

  // data-repeat
  setOptions() {
    if ('repeat' in this.element.dataset) {
      this.options.repeat = true;
    }
  }
}
