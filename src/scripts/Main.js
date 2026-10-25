import ComponentFactory from './ComponentFactory.js';
import Icons from './utils/Icons.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    console.log('test');

    document.documentElement.classList.add('has-js');

    Icons.load();
    new ComponentFactory();
  }
}

new Main();
