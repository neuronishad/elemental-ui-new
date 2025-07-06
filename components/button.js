export class EUIButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const button = document.createElement('button');
    button.innerHTML = '<slot></slot>';
    const style = document.createElement('style');
    style.textContent = `
      button {
        font: inherit;
        padding: 0.5em 1em;
        border: none;
        border-radius: 4px;
        background: var(--eui-primary, #6200ee);
        color: var(--eui-on-primary, #fff);
        cursor: pointer;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
}

customElements.define('eui-button', EUIButton);
