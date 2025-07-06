export class EUIProgress extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const bar = document.createElement('div');
    bar.className = 'bar';
    const style = document.createElement('style');
    style.textContent = `
      :host { display: block; width: 100%; height: 4px; background: #e0e0e0; }
      .bar { width: 0; height: 100%; background: var(--eui-primary, #6200ee); transition: width 0.2s; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(bar);
  }

  set value(val) { this.shadowRoot.querySelector('.bar').style.width = val + '%'; }
  get value() { return parseFloat(this.shadowRoot.querySelector('.bar').style.width) || 0; }
}
customElements.define('eui-progress', EUIProgress);
