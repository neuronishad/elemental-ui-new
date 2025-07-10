import { EUIContainerElement } from './eui-container.js';

const GAP_MAP = {
  xs: 'var(--eui-spacing-xs, 4px)',
  sm: 'var(--eui-spacing-sm, 8px)',
  md: 'var(--eui-spacing-md, 16px)',
  lg: 'var(--eui-spacing-lg, 24px)',
  xl: 'var(--eui-spacing-xl, 32px)',
};

const JUSTIFY_MAP = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

const ALIGN_MAP = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: flex;
      flex-direction: column;
      flex-wrap: var(--_wrap, nowrap);
      gap: var(--_gap, 16px);
      padding: var(--_padding, 16px);
      justify-content: var(--_justify, flex-start);
      align-items: var(--_align, stretch);
    }
  </style>
  <slot></slot>
`;

export class EUIVBox extends EUIContainerElement {
  static get observedAttributes() {
    return ['gap', 'padding', 'justify-content', 'align-items', 'wrap'];
  }

  constructor() {
    super(template);
  }

  connectedCallback() {
    this._applyStyles();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this._applyStyles();
  }

  get gap() {
    return this.getAttribute('gap') || 'md';
  }
  set gap(val) {
    if (val === null) this.removeAttribute('gap');
    else this.setAttribute('gap', val);
  }

  get padding() {
    return this.getAttribute('padding');
  }
  set padding(val) {
    if (val === null) this.removeAttribute('padding');
    else this.setAttribute('padding', val);
  }

  get justifyContent() {
    return this.getAttribute('justify-content') || 'start';
  }
  set justifyContent(val) {
    if (val === null) this.removeAttribute('justify-content');
    else this.setAttribute('justify-content', val);
  }

  get alignItems() {
    return this.getAttribute('align-items') || 'stretch';
  }
  set alignItems(val) {
    if (val === null) this.removeAttribute('align-items');
    else this.setAttribute('align-items', val);
  }

  get wrap() {
    return this.hasAttribute('wrap');
  }
  set wrap(val) {
    if (val) this.setAttribute('wrap', '');
    else this.removeAttribute('wrap');
  }

  _applyStyles() {
    const gapKey = this.gap;
    const gapVal = GAP_MAP[gapKey] || gapKey;
    this.style.setProperty('--_gap', gapVal);

    const padKey = this.padding ?? gapKey;
    const padVal = GAP_MAP[padKey] || padKey;
    this.style.setProperty('--_padding', padVal);

    const justify = JUSTIFY_MAP[this.justifyContent] || this.justifyContent;
    this.style.setProperty('--_justify', justify);

    const align = ALIGN_MAP[this.alignItems] || this.alignItems;
    this.style.setProperty('--_align', align);

    this.style.setProperty('--_wrap', this.wrap ? 'wrap' : 'nowrap');
  }
}

customElements.define('eui-vbox', EUIVBox);
