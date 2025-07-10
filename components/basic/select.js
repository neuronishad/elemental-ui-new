import { EUIBaseElement } from './eui-base.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host { display:inline-block; position:relative; font:inherit; }
    .container { position:relative; }
    .trigger {
      display:flex;
      align-items:center;
      justify-content:space-between;
      min-height:36px;
      padding:0.5em;
      cursor:pointer;
      border-radius:4px;
      background: var(--eui-color-surface, #fff);
      color: var(--eui-color-on-surface, #000);
      box-shadow: var(--eui-shadow-1, 0 1px 3px rgba(0,0,0,0.2));
    }
    :host([variant="outlined"]) .trigger {
      border:1px solid var(--eui-color-outline, #ccc);
      background: transparent;
    }
    .trigger:focus-visible { outline: var(--eui-outline-focus, 2px solid #2962ff); }
    :host([disabled]) .trigger { pointer-events:none; opacity:0.6; }
    .floating-label {
      position:absolute;
      left:0.5em;
      top:50%;
      transform:translateY(-50%);
      transition:all 0.2s ease;
      pointer-events:none;
      background:inherit;
      padding:0 0.25em;
      color: var(--eui-color-on-surface, #000);
    }
    :host([focused]) .floating-label,
    :host([has-value]) .floating-label {
      top:-0.6em;
      font-size:0.75em;
    }
    .dropdown-panel {
      display:none;
      position:absolute;
      top:100%;
      left:0;
      width:100%;
      background: var(--eui-color-surface, #fff);
      color: var(--eui-color-on-surface, #000);
      box-shadow: var(--eui-shadow-1, 0 1px 3px rgba(0,0,0,0.2));
      max-height:240px;
      overflow:auto;
      z-index:1;
      border-radius:4px;
    }
    :host([open]) .dropdown-panel { display:block; }
    .search-input { width:100%; box-sizing:border-box; padding:0.25em 0.5em; border:none; outline:none; display:none; }
    .option-list ::slotted(eui-option) { display: block; }
    .support-text { font-size:0.75rem; color: var(--eui-color-error-base, #b00020); margin-top:0.25em; }
    :host(:not([error])) .support-text { display:none; }
    .ripple {
      position:absolute;
      border-radius:50%;
      background: currentColor;
      opacity:0.15;
      transform:scale(0);
      animation:ripple 600ms ease-out;
      pointer-events:none;
    }
    @keyframes ripple { to { transform:scale(2); opacity:0; } }
  </style>
  <div class="container" part="container">
    <label class="floating-label"></label>
    <div class="trigger" tabindex="0" role="combobox" aria-expanded="false">
      <div class="selected-value"></div>
      <div class="dropdown-icon">▾</div>
    </div>
    <div class="dropdown-panel">
      <input class="search-input" placeholder="Search...">
      <div class="option-list" role="listbox"><slot></slot></div>
    </div>
    <div class="ripple"></div>
    <div class="support-text"></div>
  </div>
`;

export class EUIMenuOption extends HTMLElement {
  static get observedAttributes() { return ['value']; }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 0.5em 1em;
          cursor: pointer;
          font: inherit;
        }
        :host([aria-selected="true"]) {
          background: var(--eui-color-primary-container, #e0f0ff);
        }
      </style>
      <slot></slot>
    `;
  }

  connectedCallback() {
    this.setAttribute('role', 'option');
  }

  get value() {
    return this.getAttribute('value') || this.textContent;
  }

  set value(v) {
    v === null ? this.removeAttribute('value') : this.setAttribute('value', v);
  }
}
customElements.define('eui-option', EUIMenuOption);

export class EUISelect extends EUIBaseElement {
  static get observedAttributes() {
    return [...super.observedAttributes, 'label', 'value', 'variant', 'placeholder', 'error', 'searchable', 'open'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    this._trigger = shadow.querySelector('.trigger');
    this._labelEl = shadow.querySelector('.floating-label');
    this._valueEl = shadow.querySelector('.selected-value');
    this._panel = shadow.querySelector('.dropdown-panel');
    this._searchInput = shadow.querySelector('.search-input');
    this._optionList = shadow.querySelector('.option-list');
    this._support = shadow.querySelector('.support-text');
    this._slot = shadow.querySelector('slot');
    this._button = this._trigger;

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._trigger.addEventListener('click', this.toggleDropdown);
    this._trigger.addEventListener('keydown', this.handleKeyDown);
    this._slot.addEventListener('slotchange', this.handleSlotChange);
    this._optionList.addEventListener('click', this.handleOptionClick);
    this._searchInput.addEventListener('input', this.handleSearch);
    this._trigger.addEventListener('focus', () => this.setAttribute('focused', ''));
    this._trigger.addEventListener('blur', () => this.removeAttribute('focused'));
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._trigger.removeEventListener('click', this.toggleDropdown);
    this._trigger.removeEventListener('keydown', this.handleKeyDown);
    this._slot.removeEventListener('slotchange', this.handleSlotChange);
    this._optionList.removeEventListener('click', this.handleOptionClick);
    this._searchInput.removeEventListener('input', this.handleSearch);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    super.attributeChangedCallback(name, oldValue, newValue);
    if (oldValue === newValue) return;
    switch (name) {
      case 'label':
        this._labelEl.textContent = newValue || '';
        break;
      case 'value':
        this._updateSelectedDisplay();
        break;
      case 'error':
        this._support.textContent = newValue || '';
        break;
      case 'searchable':
        this._searchInput.style.display = this.searchable ? 'block' : 'none';
        break;
      case 'open':
        this._trigger.setAttribute('aria-expanded', this.open);
        break;
    }
  }

  get label() { return this.getAttribute('label'); }
  set label(v) { v === null ? this.removeAttribute('label') : this.setAttribute('label', v); }

  get value() { return this.getAttribute('value'); }
  set value(v) { v === null ? this.removeAttribute('value') : this.setAttribute('value', v); }

  get variant() { return this.getAttribute('variant') || 'filled'; }
  set variant(v) { v === null ? this.removeAttribute('variant') : this.setAttribute('variant', v); }

  get placeholder() { return this.getAttribute('placeholder'); }
  set placeholder(v) { v === null ? this.removeAttribute('placeholder') : this.setAttribute('placeholder', v); }

  get error() { return this.getAttribute('error'); }
  set error(v) { v === null ? this.removeAttribute('error') : this.setAttribute('error', v); }

  get searchable() { return this.hasAttribute('searchable'); }
  set searchable(v) { v ? this.setAttribute('searchable', '') : this.removeAttribute('searchable'); }

  get open() { return this.hasAttribute('open'); }
  set open(v) { v ? this.setAttribute('open', '') : this.removeAttribute('open'); }

  get disabled() { return this.hasAttribute('disabled'); }
  set disabled(v) { v ? this.setAttribute('disabled', '') : this.removeAttribute('disabled'); }

  toggleDropdown() {
    if (this.disabled) return;
    this.open = !this.open;
    if (this.open) {
      this._spawnRipple();
      this.dispatchEvent(new Event('focus'));
    } else {
      this.dispatchEvent(new Event('blur'));
    }
  }

  handleKeyDown(e) {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      this.toggleDropdown();
    } else if (e.key === 'Escape') {
      this.open = false;
    }
  }

  handleOptionClick(e) {
    const option = e.target.closest('eui-option');
    if (!option) return;
    this.value = option.value;
    this.dispatchEvent(new CustomEvent('change', { detail: { value: this.value } }));
    this.open = false;
    const rect = this._trigger.getBoundingClientRect();
    this._spawnRipple(e.clientX - rect.left, e.clientY - rect.top);
  }

  handleSlotChange() { this._updateSelectedDisplay(); }

  handleSearch(e) {
    const q = e.target.value.toLowerCase();
    this.dispatchEvent(new CustomEvent('input', { detail: { query: q } }));
    const options = this._slot.assignedElements();
    options.forEach(opt => {
      const match = opt.textContent.toLowerCase().includes(q);
      opt.style.display = match ? '' : 'none';
    });
  }

  _updateSelectedDisplay() {
    const options = this._slot.assignedElements();
    options.forEach(opt => opt.setAttribute('aria-selected', 'false'));
    let match = options.find(o => o.value === this.value);
    if (match) {
      match.setAttribute('aria-selected', 'true');
    }
    const text = match ? match.textContent : this.placeholder || '';
    this._valueEl.textContent = text;
    this.toggleAttribute('has-value', !!match && match.value);
  }

  _spawnRipple(x, y) {
    const rect = this._trigger.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${(x ?? rect.width / 2) - size / 2}px`;
    ripple.style.top = `${(y ?? rect.height / 2) - size / 2}px`;
    this._trigger.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  render() {
    this._labelEl.textContent = this.label || '';
    this._support.textContent = this.error || '';
    this._searchInput.style.display = this.searchable ? 'block' : 'none';
    this._updateSelectedDisplay();
    this._trigger.setAttribute('aria-expanded', this.open);
  }
}

customElements.define('eui-select', EUISelect);
