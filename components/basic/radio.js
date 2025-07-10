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
      position:relative;
      user-select:none;
    }
    input {
      position:absolute;
      width:20px;
      height:20px;
      margin:0;
      opacity:0;
    }
    .control {
      position:relative;
      width:20px;
      height:20px;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .outer-circle {
      position:absolute;
      box-sizing:border-box;
      width:100%;
      height:100%;
      border-radius:50%;
      border:2px solid var(--eui-color-outline,#757575);
      background:var(--eui-color-surface,#fff);
      transition:border-color 0.2s,background 0.2s;
    }
    .inner-dot {
      width:12px;
      height:12px;
      border-radius:50%;
      background:var(--eui-color-secondary-base,#018786);
      transform:scale(0);
      opacity:0;
      transition:transform 0.2s,opacity 0.2s,background 0.2s;
    }
    input:checked + .control .inner-dot {
      transform:scale(1);
      opacity:1;
    }
    label:hover input:not(:disabled) + .control .outer-circle {
      border-color:var(--eui-color-secondary-hover,#016d6c);
    }
    input:not(:disabled):active + .control .inner-dot {
      background:var(--eui-color-secondary-active,#014a49);
    }
    input:disabled + .control .outer-circle {
      border-color:var(--eui-color-secondary-disabled,#ccc);
    }
    input:disabled:checked + .control .inner-dot {
      background:var(--eui-color-secondary-disabled,#ccc);
    }
    input:focus-visible + .control .outer-circle {
      outline:var(--eui-outline-focus,2px solid #2962ff);
      outline-offset:2px;
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
    <input type="radio" />
    <span class="control">
      <span class="outer-circle"></span>
      <span class="inner-dot"></span>
    </span>
    <span class="label-text"><slot></slot></span>
  </label>
`;

export class EUIRadio extends EUIBaseElement {
  static get observedAttributes() {
    return [...super.observedAttributes, 'name', 'value', 'checked', 'label'];
  }

  constructor() {
    super(template);
    this._input = this._shadow.querySelector('input');
    this._control = this._shadow.querySelector('.control');
    this._slot = this._shadow.querySelector('slot');
    this._button = this._input;

    this.handleChange = this.handleChange.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._input.addEventListener('change', this.handleChange);
    this._control.addEventListener('pointerdown', this.handlePointerDown);
    this._input.addEventListener('keydown', this.handleKeyDown);
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._input.removeEventListener('change', this.handleChange);
    this._control.removeEventListener('pointerdown', this.handlePointerDown);
    this._input.removeEventListener('keydown', this.handleKeyDown);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    switch (name) {
      case 'name':
        this._input.name = this.name;
        break;
      case 'value':
        this._input.value = this.value;
        break;
      case 'checked':
        this._input.checked = this.checked;
        break;
      case 'label':
        this._ensureSlotContent('slot', this.label);
        break;
    }
  }

  get name() { return this.getAttribute('name'); }
  set name(v) { v === null ? this.removeAttribute('name') : this.setAttribute('name', v); }

  get value() { return this.getAttribute('value'); }
  set value(v) { v === null ? this.removeAttribute('value') : this.setAttribute('value', v); }

  get checked() { return this.hasAttribute('checked'); }
  set checked(v) { v ? this.setAttribute('checked', '') : this.removeAttribute('checked'); }

  get label() { return this.getAttribute('label'); }
  set label(v) { v === null ? this.removeAttribute('label') : this.setAttribute('label', v); }

  handleChange() {
    this.checked = this._input.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: { name: this.name, value: this.value } }));
  }

  handlePointerDown(e) {
    if (this.disabled) return;
    const rect = this._control.getBoundingClientRect();
    this.spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
  }

  handleKeyDown(e) {
    if (this.disabled) return;
    if (e.key === ' ' || e.key === 'Enter') {
      const rect = this._control.getBoundingClientRect();
      this.spawnRipple(rect.width / 2, rect.height / 2);
    }
  }

  spawnRipple(x, y) {
    const size = Math.max(this._control.clientWidth, this._control.clientHeight);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    this._control.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  render() {
    this._ensureSlotContent('slot', this.label);
    this._input.name = this.name || '';
    this._input.value = this.value || '';
    this._input.checked = this.checked;
  }
}

customElements.define('eui-radio', EUIRadio);
