export class EUISlider extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const input = document.createElement('input');
    input.type = 'range';
    const style = document.createElement('style');
    style.textContent = `
      input { width: 100%; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(input);
  }

  get value() { return this.shadowRoot.querySelector('input').value; }
  set value(v) { this.shadowRoot.querySelector('input').value = v; }
}
customElements.define('eui-slider', EUISlider);
