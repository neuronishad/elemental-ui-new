const GAP_MAP = {
  xs: 'var(--eui-spacing-xs, 4px)',
  sm: 'var(--eui-spacing-sm, 8px)',
  md: 'var(--eui-spacing-md, 16px)',
  lg: 'var(--eui-spacing-lg, 24px)',
  xl: 'var(--eui-spacing-xl, 32px)',
};

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: grid;
      grid-template-columns: var(--_columns, 1fr);
      grid-template-rows: var(--_rows, auto);
      grid-template-areas: var(--_areas, unset);
      gap: var(--_gap, 16px);
      padding: var(--_padding, 16px);
      box-sizing: border-box;
    }
  </style>
  <slot></slot>
`;

export class EUIGrid extends HTMLElement {
  static get observedAttributes() {
    return ['columns', 'rows', 'areas', 'gap', 'padding'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._applyStyles();
    this._assignGridAreas();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this._applyStyles();
      if (name === 'areas') this._assignGridAreas();
    }
  }

  get columns() {
    return this.getAttribute('columns') || '1fr';
  }
  set columns(val) {
    this._setOrRemoveAttr('columns', val);
  }

  get rows() {
    return this.getAttribute('rows') || 'auto';
  }
  set rows(val) {
    this._setOrRemoveAttr('rows', val);
  }

  get areas() {
    return this.getAttribute('areas') || '';
  }
  set areas(val) {
    this._setOrRemoveAttr('areas', val);
  }

  get gap() {
    return this.getAttribute('gap') || 'md';
  }
  set gap(val) {
    this._setOrRemoveAttr('gap', val);
  }

  get padding() {
    return this.getAttribute('padding');
  }
  set padding(val) {
    this._setOrRemoveAttr('padding', val);
  }

  _setOrRemoveAttr(attr, val) {
    if (val == null) {
      this.removeAttribute(attr);
    } else {
      this.setAttribute(attr, val);
    }
  }

  _applyStyles() {
    const gapKey = this.gap;
    const gapVal = GAP_MAP[gapKey] || gapKey;
    this.style.setProperty('--_gap', gapVal);

    const padKey = this.hasAttribute('padding') ? this.padding : gapKey;
    const padVal = GAP_MAP[padKey] || padKey;
    this.style.setProperty('--_padding', padVal);

    this.style.setProperty('--_columns', this.columns);
    this.style.setProperty('--_rows', this.rows);
    this.style.setProperty('--_areas', this.areas || 'unset');
  }

  _assignGridAreas() {
    const children = this.querySelectorAll('[slot]');
    children.forEach(child => {
      const slotName = child.getAttribute('slot');
      if (slotName && !child.style.gridArea) {
        child.style.gridArea = slotName;
      }
    });
  }
}

customElements.define('eui-grid', EUIGrid);
