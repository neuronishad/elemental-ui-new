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

      :host([variant="text"]) button {
        background: transparent;
        color: var(--eui-primary, #6200ee);
      }

      :host([variant="outlined"]) button {
        background: transparent;
        color: var(--eui-primary, #6200ee);
        border: 1px solid var(--eui-primary, #6200ee);
      }

      :host([variant="icon"]) button {
        background: transparent;
        padding: 0.25em;
        border-radius: 50%;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(button);
  }
}

customElements.define('eui-button', EUIButton);
