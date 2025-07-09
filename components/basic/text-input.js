export class EUITextInput extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('label');
    const slot = document.createElement('slot');
    slot.name = 'label';
    const input = document.createElement('input');
    input.type = 'text';
    wrapper.appendChild(slot);
    wrapper.appendChild(input);

    const style = document.createElement('style');
    style.textContent = `
      :host { display: block; }
      label { display: flex; flex-direction: column; font: inherit; gap: 0.25em; }
      input {
        font: inherit;
        padding: 0.5em;
        border: 1px solid #ccc;
        border-radius: 4px;
        background: var(--eui-input-bg, white);
      }

      :host([variant="filled"]) input {
        background: #f5f5f5;
        border: none;
      }

      :host([variant="outlined"]) input {
        border: 1px solid #ccc;
        background: var(--eui-input-bg, white);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  get value() { return this.shadowRoot.querySelector('input').value; }
  set value(v) { this.shadowRoot.querySelector('input').value = v; }
}

customElements.define('eui-text-input', EUITextInput);
