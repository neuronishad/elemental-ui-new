export class EUISelect extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const label = document.createElement('label');
    const select = document.createElement('select');
    const slot = document.createElement('slot');
    slot.addEventListener('slotchange', () => {
      select.innerHTML = '';
      this.querySelectorAll('option').forEach(opt => {
        select.appendChild(opt.cloneNode(true));
      });
    });
    label.appendChild(select);
    label.appendChild(slot);

    const style = document.createElement('style');
    style.textContent = `
      label { display: flex; flex-direction: column; font: inherit; gap: 0.25em; }
      select { font: inherit; padding: 0.5em; border-radius: 4px; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(label);
  }

  get value() { return this.shadowRoot.querySelector('select').value; }
  set value(v) { this.shadowRoot.querySelector('select').value = v; }
}
customElements.define('eui-select', EUISelect);
