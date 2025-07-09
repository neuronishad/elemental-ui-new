export class EUISwitch extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const label = document.createElement('label');
    const input = document.createElement('input');
    input.type = 'checkbox';
    const span = document.createElement('span');
    span.className = 'slider';
    label.appendChild(input);
    label.appendChild(span);
    const style = document.createElement('style');
    style.textContent = `
      :host { display: inline-block; }
      label { position: relative; display: inline-block; width: 40px; height: 20px; }
      input { opacity: 0; width: 0; height: 0; }
      .slider { position: absolute; cursor: pointer; inset: 0; background: #ccc; border-radius: 20px; transition: .2s; }
      .slider:before { content: ''; position: absolute; height: 16px; width: 16px; left: 2px; bottom: 2px; background: white; border-radius: 50%; transition: .2s; }
      input:checked + .slider { background: var(--eui-primary, #6200ee); }
      input:checked + .slider:before { transform: translateX(20px); }
    `;
    shadow.appendChild(style);
    shadow.appendChild(label);
  }

  get checked() { return this.shadowRoot.querySelector('input').checked; }
  set checked(v) { this.shadowRoot.querySelector('input').checked = v; }
}
customElements.define('eui-switch', EUISwitch);
