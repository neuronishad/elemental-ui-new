export class EUIDialog extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('div');
    wrapper.className = 'dialog';
    const slot = document.createElement('slot');
    wrapper.appendChild(slot);
    const style = document.createElement('style');
    style.textContent = `
      :host { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); align-items: center; justify-content: center; }
      .dialog { background: white; padding: 1em; border-radius: 4px; min-width: 200px; }
      :host([open]) { display: flex; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  open() { this.setAttribute('open', ''); }
  close() { this.removeAttribute('open'); }
}
customElements.define('eui-dialog', EUIDialog);
