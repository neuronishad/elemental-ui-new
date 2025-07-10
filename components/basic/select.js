import { EUIBaseElement } from './eui-base.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display:block;
      position:relative;
      font:inherit;
      width:100%;
    }
    .container { position:relative; width:100%; }
    .trigger {
      display:flex;
      align-items:center;
      justify-content:space-between;
      position:relative;
      width:100%;
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
    .trigger:focus-visible {
      outline: 2px solid var(--eui-color-primary-base, #6200ee);
    }
    :host([disabled]) .trigger { pointer-events:none; opacity:0.6; }
    .floating-label {
      position:absolute;
      left:0.5em;
      top:50%;
      transform:translateY(-50%);
      transition:all 0.2s ease;
      pointer-events:none;
      background: var(--eui-color-surface, #fff);
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
    .search-input {
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      box-sizing:border-box;
      padding:0.25em 0.5em;
      border:none;
      outline:none;
      display:none;
      background: transparent;
      font: inherit;
      color: var(--eui-color-on-surface, #000);
    }
    :host([open][searchable]) .search-input {
      display:block;
    }
    :host([open][searchable]) .selected-value {
      display:none;
    }
    .option-list ::slotted(eui-option) { display: block; }
    .support-text { font-size:0.75rem; color: var(--eui-color-error-base, #b00020); margin-top:0.25em; }
    :host(:not([error])) .support-text { display:none; }
  </style>
  <div class="container" part="container">
    <label class="floating-label"></label>
    <div class="trigger" tabindex="0" role="combobox" aria-expanded="false">
      <input class="search-input" placeholder="Search...">
      <div class="selected-value"></div>
      <div class="dropdown-icon">▾</div>
    </div>
    <div class="dropdown-panel">
      <div class="option-list" role="listbox"><slot></slot></div>
    </div>
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
        :host([aria-selected="true"]),
        :host(:hover) {
          background: var(--eui-color-primary-container, #e0f0ff);
          color: var(--eui-color-primary-base, #6200ee);
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
    super(template);
    const shadow = this._shadow;

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
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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
    document.addEventListener('click', this.handleOutsideClick);
    this.render();
  }

  disconnectedCallback() {
    super.disconnectedCallback?.();
    this._trigger.removeEventListener('click', this.toggleDropdown);
    this._trigger.removeEventListener('keydown', this.handleKeyDown);
    this._slot.removeEventListener('slotchange', this.handleSlotChange);
    this._optionList.removeEventListener('click', this.handleOptionClick);
    this._searchInput.removeEventListener('input', this.handleSearch);
    document.removeEventListener('click', this.handleOutsideClick);
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
        this._searchInput.style.display = this.searchable ? '' : 'none';
        break;
      case 'open':
        this._trigger.setAttribute('aria-expanded', this.open);
        if (this.open) {
          this._trigger.focus();
        } else {
          this._trigger.blur();
        }
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
      if (this.searchable) this._searchInput.focus();
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

  handleOutsideClick(e) {
    if (this.open && !this.contains(e.target)) {
      this.open = false;
    }
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


  render() {
    this._labelEl.textContent = this.label || '';
    this._support.textContent = this.error || '';
    this._searchInput.style.display = this.searchable ? '' : 'none';
    this._updateSelectedDisplay();
    this._trigger.setAttribute('aria-expanded', this.open);
  }
}

customElements.define('eui-select', EUISelect);
