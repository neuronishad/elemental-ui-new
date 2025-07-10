import { EUIContainerElement } from './eui-container.js';

export class EUIHBox extends EUIContainerElement {
  constructor() {
    super('row');
  }
}

customElements.define('eui-hbox', EUIHBox);
