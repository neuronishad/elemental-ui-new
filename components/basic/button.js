const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host { display: inline-block; }
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5em;
      position: relative;
      overflow: hidden;
      min-height: 36px;
      font: inherit;
      padding: 0 1em;
      border-radius: 4px;
      border: none;
      background: transparent;
      color: var(--eui-color-primary-base, #6200ee);
      cursor: pointer;
    }
    button:focus-visible {
      outline: var(--eui-outline-focus, 2px solid #2962ff);
    }
    button[disabled] {
      cursor: default;
      pointer-events: none;
      background: var(--eui-color-primary-disabled, #ccc);
      color: var(--eui-color-on-disabled, #666);
      box-shadow: none;
    }
    :host([variant="contained"]) button {
      background: var(--eui-color-primary-base, #6200ee);
      color: var(--eui-color-on-primary, #fff);
      box-shadow: var(--eui-shadow-1, 0 1px 3px rgba(0,0,0,0.2));
    }
    :host([variant="contained"]) button:hover {
      background: var(--eui-color-primary-hover, #3700b3);
      box-shadow: var(--eui-shadow-2, 0 3px 6px rgba(0,0,0,0.3));
    }
    :host([variant="contained"]) button:active {
      background: var(--eui-color-primary-active, #30009c);
    }
    :host([variant="outlined"]) button {
      border: 1px solid var(--eui-color-outline, #ccc);
    }
    :host([variant="text"]) button {
      color: var(--eui-color-primary-base, #6200ee);
    }
    .icon { display: inline-flex; }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: currentColor;
      opacity: 0.15;
      transform: scale(0);
      animation: ripple 600ms ease-out;
      pointer-events: none;
    }
    @keyframes ripple {
      to { transform: scale(2); opacity: 0; }
    }
  </style>
  <button type="button">
    <span class="icon leading"><slot name="icon"></slot></span>
    <span class="label"><slot></slot></span>
    <span class="icon trailing"><slot name="trailing-icon"></slot></span>
  </button>
`;

export class EUIButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'disabled', 'label', 'icon', 'trailing-icon'];
  }

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(template.content.cloneNode(true));

    this._button = shadow.querySelector('button');
    this._iconSlot = shadow.querySelector('slot[name="icon"]');
    this._labelSlot = shadow.querySelector('slot:not([name])');
    this._trailingSlot = shadow.querySelector('slot[name="trailing-icon"]');

    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  connectedCallback() {
    this._button.addEventListener('pointerdown', this.handlePointerDown);
    this._button.addEventListener('keydown', this.handleKeyDown);
    this.render();
  }

  disconnectedCallback() {
    this._button.removeEventListener('pointerdown', this.handlePointerDown);
    this._button.removeEventListener('keydown', this.handleKeyDown);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'disabled':
        this._button.disabled = this.disabled;
        this._button.setAttribute('aria-disabled', this.disabled);
        break;
      case 'icon':
        if (!this._iconSlot.assignedNodes().length) {
          this._iconSlot.textContent = this.icon || '';
        }
        break;
      case 'trailing-icon':
        if (!this._trailingSlot.assignedNodes().length) {
          this._trailingSlot.textContent = this.trailingIcon || '';
        }
        break;
      case 'label':
        if (!this._labelSlot.assignedNodes().length) {
          this._labelSlot.textContent = this.label || '';
        }
        break;
      case 'variant':
        // styles react automatically via attribute selector
        break;
    }
  }

  // Properties
  get variant() {
    return this.getAttribute('variant') || 'text';
  }
  set variant(val) {
    if (val === null) {
      this.removeAttribute('variant');
    } else {
      this.setAttribute('variant', val);
    }
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

  get label() {
    return this.getAttribute('label');
  }
  set label(val) {
    if (val === null) {
      this.removeAttribute('label');
    } else {
      this.setAttribute('label', val);
    }
  }

  get icon() {
    return this.getAttribute('icon');
  }
  set icon(val) {
    if (val === null) {
      this.removeAttribute('icon');
    } else {
      this.setAttribute('icon', val);
    }
  }

  get trailingIcon() {
    return this.getAttribute('trailing-icon');
  }
  set trailingIcon(val) {
    if (val === null) {
      this.removeAttribute('trailing-icon');
    } else {
      this.setAttribute('trailing-icon', val);
    }
  }

  handlePointerDown(event) {
    if (this.disabled) return;
    const rect = this._button.getBoundingClientRect();
    this.spawnRipple(event.clientX - rect.left, event.clientY - rect.top);
  }

  handleKeyDown(event) {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      const rect = this._button.getBoundingClientRect();
      this.spawnRipple(rect.width / 2, rect.height / 2);
    }
  }

  spawnRipple(x, y) {
    const rect = this._button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x - size / 2}px`;
    ripple.style.top = `${y - size / 2}px`;
    this._button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  render() {
    this._button.disabled = this.disabled;
    this._button.setAttribute('aria-disabled', this.disabled);

    if (!this._iconSlot.assignedNodes().length) {
      this._iconSlot.textContent = this.icon || '';
    }

    if (!this._labelSlot.assignedNodes().length) {
      this._labelSlot.textContent = this.label || '';
    }

    if (!this._trailingSlot.assignedNodes().length) {
      this._trailingSlot.textContent = this.trailingIcon || '';
    }
  }
}

customElements.define('eui-button', EUIButton);
