// ton code ici (ps, efface cette ligne stp)
export default class Header {
  constructor(element) {
    this.element = element;
    //console.log('constructor');

    this.html = document.documentElement;

    this.init();
  }

  init() {
    this.initNavMobile();
  }

  // activation du menu mobile
  initNavMobile() {
    const toggle = this.element.querySelector('.js-toggle');
    const toggleLabel = this.element.querySelectorAll('.js-toggle-label');
    //console.log(toggle);
    toggle.addEventListener('click', this.onToggleNav.bind(this));
    for (let i = 0; i < toggleLabel.length; i++) {
      const elements = toggleLabel[i];
      elements.addEventListener('click', this.onToggleNav.bind(this));
    }
  }

  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
