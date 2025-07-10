import { EUIContainerElement } from './eui-container.js';

export class EUICenterBox extends EUIContainerElement {
  constructor() {
    super('column');
  }

  connectedCallback() {
    this.style.height = '100%';
    this.style.width = '100%';
    this.style.boxSizing = 'border-box';

    // Default justify-content and align-items if not set
    if (!this.hasAttribute('justify-content')) {
      this.setAttribute('justify-content', 'center');
    }
    if (!this.hasAttribute('align-items')) {
      this.setAttribute('align-items', 'center');
    }

    super.connectedCallback(); // call to _applyStyles via base class
  }

  get justifyContent() {
    return this.getAttribute('justify-content') || 'center';
  }
  set justifyContent(val) {
    if (val === null) this.removeAttribute('justify-content');
    else this.setAttribute('justify-content', val);
  }

  get alignItems() {
    return this.getAttribute('align-items') || 'center';
  }
  set alignItems(val) {
    if (val === null) this.removeAttribute('align-items');
    else this.setAttribute('align-items', val);
  }
}

customElements.define('eui-center-box', EUICenterBox);
