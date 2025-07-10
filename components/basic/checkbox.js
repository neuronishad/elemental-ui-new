import { EUIBaseElement } from './eui-base.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host { display:inline-block; }
    label {
      display:inline-flex;
      align-items:center;
      gap:0.5em;
      cursor:pointer;
      user-select:none;
    }
    input {
      position:absolute;
      width:18px;
      height:18px;
      margin:0;
      opacity:0;
    }
    .visual-box {
      position:relative;
      width:18px;
      height:18px;
      box-sizing:border-box;
      border:2px solid var(--eui-color-outline,#757575);
      background:var(--eui-color-surface,#fff);
      border-radius:2px;
      display:flex;
      align-items:center;
      justify-content:center;
      transition:background 0.2s,border-color 0.2s;
      color:var(--eui-color-on-secondary,#fff);
    }
    :host([variant="outlined"]) .visual-box {
      border-width:1px;
      box-shadow:var(--eui-shadow-1,0 1px 3px rgba(0,0,0,0.2));
    }
    input:checked + .visual-box,
    input:indeterminate + .visual-box {
      background:var(--eui-color-secondary-base,#018786);
      border-color:var(--eui-color-secondary-base,#018786);
    }
    label:hover input:not(:disabled) + .visual-box {
      background:var(--eui-color-secondary-hover,#016d6c);
    }
    input:not(:disabled):active + .visual-box {
      background:var(--eui-color-secondary-active,#014a49);
    }
    input:disabled + .visual-box {
      background:var(--eui-color-secondary-disabled,#ccc);
      border-color:var(--eui-color-secondary-disabled,#ccc);
      cursor:default;
    }
    input:focus-visible + .visual-box {
      outline:var(--eui-outline-focus,2px solid #2962ff);
      outline-offset:2px;
    }
    .checkmark {
      display:none;
      width:10px;
      height:6px;
      border:solid currentColor;
      border-width:0 2px 2px 0;
      transform:rotate(45deg);
      box-sizing:border-box;
    }
    input:indeterminate + .visual-box .checkmark {
      display:block;
      width:10px;
      height:0;
      border-width:0 0 2px 0;
      transform:none;
    }
    input:checked + .visual-box .checkmark {
      display:block;
    }
    .ripple {
      position:absolute;
      border-radius:50%;
      background:currentColor;
      opacity:0.15;
      transform:scale(0);
      animation:ripple 600ms ease-out;
      pointer-events:none;
    }
    @keyframes ripple { to { transform:scale(2); opacity:0; } }
  </style>
  <label class="container">
    <input type="checkbox" />
    <span class="visual-box">
      <span class="checkmark"></span>
    </span>
    <span class="label-text"><slot></slot></span>
  </label>
`;

export class EUICheckbox extends EUIBaseElement {
  static get observedAttributes() {
    return [...super.observedAttributes, 'checked', 'indeterminate', 'label', 'variant'];
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
  }
}

customElements.define('eui-checkbox', EUICheckbox);
