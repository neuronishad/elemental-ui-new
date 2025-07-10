import { EUIContainerElement } from './eui-container.js';

export class EUIVBox extends EUIContainerElement {
  constructor() {
    super('column');
  }
}

customElements.define('eui-vbox', EUIVBox);
