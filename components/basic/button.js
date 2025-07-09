export class EUIButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'disabled', 'icon', 'trailing-icon', 'label'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.handlePointerDown = this.handlePointerDown.bind(this);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.addEventListener('pointerdown', this.handlePointerDown);
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('pointerdown', this.handlePointerDown);
  }

  attributeChangedCallback() {
    this.render();
  }

  get variant() {
    return this.getAttribute('variant') || 'text';
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  handlePointerDown(event) {
    if (this.disabled) return;
    const button = this.shadowRoot.querySelector('button');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
    button.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }

  render() {
    const icon = this.getAttribute('icon');
    const trailing = this.getAttribute('trailing-icon');
    const label = this.getAttribute('label') || '';
    const disabled = this.disabled ? 'disabled' : '';

    this.shadowRoot.innerHTML = `
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
          color: var(--eui-color-primary-base);
          cursor: pointer;
        }
        button:focus-visible {
          outline: var(--eui-outline-focus);
        }
        button[disabled] {
          cursor: default;
          pointer-events: none;
          background: var(--eui-color-primary-disabled);
          color: var(--eui-color-on-disabled);
          box-shadow: none;
        }
        :host([variant="contained"]) button {
          background: var(--eui-color-primary-base);
          color: var(--eui-color-on-primary);
          box-shadow: var(--eui-shadow-1);
        }
        :host([variant="contained"]) button:hover {
          background: var(--eui-color-primary-hover);
          box-shadow: var(--eui-shadow-2);
        }
        :host([variant="contained"]) button:active {
          background: var(--eui-color-primary-active);
        }
        :host([variant="outlined"]) button {
          border: 1px solid var(--eui-color-outline);
        }
        :host([variant="text"]) button {
          color: var(--eui-color-primary-base);
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
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      </style>
      <button type="button" ${disabled} aria-disabled="${this.disabled}">
        ${icon ? `<span class="icon leading">${icon}</span>` : ''}
        <span class="label">${label}</span>
        ${trailing ? `<span class="icon trailing">${trailing}</span>` : ''}
      </button>`;
  }
}

customElements.define('eui-button', EUIButton);
