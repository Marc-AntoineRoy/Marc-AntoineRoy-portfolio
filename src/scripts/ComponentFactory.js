import Header from './components/Header.js';
import Scrolly from './components/Scrolly.js';
import TextAnim from './components/TextAnim.js';
import Scroller from './components/Scroller.js';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Header,
      Scrolly,
      TextAnim,
      Scroller,
    };
    this.init();
  }
  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
