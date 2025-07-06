export class EUISnackbar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    container.className = 'snackbar';
    const slot = document.createElement('slot');
    container.appendChild(slot);
    const style = document.createElement('style');
    style.textContent = `
      :host { position: fixed; left: 50%; bottom: 1em; transform: translateX(-50%); display: none; }
      .snackbar { background: #333; color: white; padding: 0.75em 1em; border-radius: 4px; }
      :host([open]) { display: block; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(container);
  }

  show() {
    this.setAttribute('open', '');
    setTimeout(() => this.removeAttribute('open'), 3000);
  }
}
customElements.define('eui-snackbar', EUISnackbar);
