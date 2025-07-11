import { EUIBaseElement } from './eui-base.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      display: inline-block;
      cursor: pointer;
      user-select: none;
    }

    .checkbox-wrapper {
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
    }

    input[type="checkbox"] {
      position: absolute;
      opacity: 0;
      width: 18px;
      height: 18px;
      margin: 0;
      pointer-events: none;
    }

    .visual-box {
      width: 18px;
      height: 18px;
      border: 2px solid var(--eui-color-secondary-outline);
      background: var(--eui-color-surface);
      border-radius: 2px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--eui-color-on-secondary);
      transition: background 0.2s, border-color 0.2s;
    }

    :host([checked]) .visual-box {
      background: var(--eui-color-secondary-base);
      border-color: var(--eui-color-secondary-base);
    }

    :host(:hover:not([disabled])) .visual-box {
      background: var(--eui-color-secondary-hover);
      border-color: var(--eui-color-secondary-hover);
    }

    :host([checked]:hover:not([disabled])) .visual-box {
      background: var(--eui-color-secondary-hover);
      border-color: var(--eui-color-secondary-hover);
    }

    :host([disabled]) {
      pointer-events: none;
      opacity: var(--eui-color-secondary-disabled);
    }

    :host(:focus-within) .visual-box {
      outline: var(--eui-outline-focus);
      outline-offset: 2px;
    }

    .check-icon {
      display: none;
    }

    :host([checked]) .check-icon {
      display: block;
    }
  </style>

 <label class="checkbox-wrapper">
    <input type="checkbox">
    <div class="visual-box">
      <slot name="icon" class="check-icon">✓</slot>
    </div>
  </label>
  <slot></slot>
`;

export class EUICheckbox extends EUIBaseElement {
  static get observedAttributes() {
    return [...super.observedAttributes, 'checked', 'indeterminate', 'label', 'variant', 'name', 'value', 'disabled'];
  }

  constructor() {
    super(template);
    this._input = this._shadow.querySelector('input');
    this._box = this._shadow.querySelector('.visual-box');
    this._slot = this._shadow.querySelector('slot');
    this._button = this._input;

    this.handleChange = this.handleChange.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._input.addEventListener('change', this.handleChange);
    this._box.addEventListener('pointerdown', this.handlePointerDown);
    this._input.addEventListener('keydown', this.handleKeyDown);
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._input.removeEventListener('change', this.handleChange);
    this._box.removeEventListener('pointerdown', this.handlePointerDown);
    this._input.removeEventListener('keydown', this.handleKeyDown);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    switch (name) {
      case 'checked':
        this._input.checked = this.checked;
        break;
      case 'indeterminate':
        this._input.indeterminate = this.indeterminate;
        break;
      case 'label':
        this._ensureSlotContent('slot', this.label);
        break;
      case 'name':
        this._input.name = newValue || '';
        break;
      case 'value':
        this._input.value = newValue || 'on';
        break;
      case 'disabled':
        this._input.disabled = this.disabled;
        break;
    }
  }

  get checked() { return this.hasAttribute('checked'); }
  set checked(v) { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }

  get indeterminate() { return this.hasAttribute('indeterminate'); }
  set indeterminate(v) { v ? this.setAttribute('indeterminate', '') : this.removeAttribute('indeterminate'); }

  get label() { return this.getAttribute('label'); }
  set label(v) { v === null ? this.removeAttribute('label') : this.setAttribute('label', v); }

  get variant() { return this.getAttribute('variant'); }
  set variant(v) { v === null ? this.removeAttribute('variant') : this.setAttribute('variant', v); }

  get name() { return this.getAttribute('name'); }
  set name(v) { v === null ? this.removeAttribute('name') : this.setAttribute('name', v); }

  get value() { return this.getAttribute('value'); }
  set value(v) { v === null ? this.removeAttribute('value') : this.setAttribute('value', v); }

  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(v) { v ? this.setAttribute('disabled', '') : this.removeAttribute('disabled'); }

  handleChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(new Event('change'));
  }

  handlePointerDown(e) {
    if (this.disabled) return;
    const rect = this._box.getBoundingClientRect();
    this.spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
  }

  handleKeyDown(e) {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      const rect = this._box.getBoundingClientRect();
      this.spawnRipple(rect.width / 2, rect.height / 2);
    }
  }

  spawnRipple(x, y) {
    const size = Math.max(this._box.clientWidth, this._box.clientHeight);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    this._box.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  render() {
    this._ensureSlotContent('slot', this.label);
    this._input.checked = this.checked;
    this._input.indeterminate = this.indeterminate;
    this._input.name = this.name || '';
    this._input.value = this.value || 'on';
    this._input.disabled = this.disabled;
  }
}

customElements.define('eui-checkbox', EUICheckbox);
