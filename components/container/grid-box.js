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
      grid-template-areas: var(--_areas);
      gap: var(--_gap, 16px);
      padding: var(--_padding, 16px);
      box-sizing: border-box;
    }
    ::slotted([slot]) {
      grid-area: attr(slot);
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
    this._shadow = this.attachShadow({ mode: 'open' });
    this._shadow.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this._applyStyles();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this._applyStyles();
  }

  get columns() {
    return this.getAttribute('columns') || '1fr';
  }
  set columns(val) {
    if (val === null) this.removeAttribute('columns');
    else this.setAttribute('columns', val);
  }

  get rows() {
    return this.getAttribute('rows') || 'auto';
  }
  set rows(val) {
    if (val === null) this.removeAttribute('rows');
    else this.setAttribute('rows', val);
  }

  get areas() {
    return this.getAttribute('areas') || '';
  }
  set areas(val) {
    if (val === null) this.removeAttribute('areas');
    else this.setAttribute('areas', val);
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

  _applyStyles() {
    const gapKey = this.gap;
    const gapVal = GAP_MAP[gapKey] || gapKey;
    this.style.setProperty('--_gap', gapVal);

    const padKey = this.padding ?? gapKey;
    const padVal = GAP_MAP[padKey] || padKey;
    this.style.setProperty('--_padding', padVal);

    this.style.setProperty('--_columns', this.columns);
    this.style.setProperty('--_rows', this.rows);
    this.style.setProperty('--_areas', this.areas);
  }
}

customElements.define('eui-grid', EUIGrid);
