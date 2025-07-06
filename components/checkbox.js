export class EUICheckbox extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    const slot = document.createElement('slot');
    label.appendChild(input);
    label.appendChild(slot);

    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; font: inherit; }
      label { display: inline-flex; align-items: center; gap: 0.25em; cursor: pointer; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(label);
  }

  get checked() { return this.shadowRoot.querySelector('input').checked; }
  set checked(v) { this.shadowRoot.querySelector('input').checked = v; }
}
customElements.define('eui-checkbox', EUICheckbox);
