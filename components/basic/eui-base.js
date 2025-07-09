export class EUIBaseElement extends HTMLElement {
  static get observedAttributes() {
    return ['disabled'];
  }

  constructor(template) {
    super();
    this._shadow = this.attachShadow({ mode: 'open' });
    if (template) {
      this._shadow.appendChild(template.content.cloneNode(true));
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === 'disabled') {
      this._updateDisabled();
    }
  }

  connectedCallback() {
    this._updateDisabled();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  _updateDisabled() {
    if (this._button) {
      this._button.disabled = this.disabled;
      this._button.setAttribute('aria-disabled', this.disabled);
    }
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  _ensureSlotContent(selector, fallback) {
    const slot = this._shadow.querySelector(selector);
    if (slot && !slot.assignedNodes().length) {
      slot.textContent = fallback || '';
    }
  }
}
