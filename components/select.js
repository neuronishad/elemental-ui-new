export class EUISelect extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const select = document.createElement('select');
    const slot = document.createElement('slot');
    slot.addEventListener('slotchange', () => {
      select.innerHTML = '';
      this.querySelectorAll('option').forEach(opt => {
        select.appendChild(opt.cloneNode(true));
      });
    });
    const style = document.createElement('style');
    style.textContent = `
      select { font: inherit; padding: 0.5em; border-radius: 4px; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(select);
    shadow.appendChild(slot);
  }

  get value() { return this.shadowRoot.querySelector('select').value; }
  set value(v) { this.shadowRoot.querySelector('select').value = v; }
}
customElements.define('eui-select', EUISelect);
