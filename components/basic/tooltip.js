export class EUITooltip extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const wrapper = document.createElement('span');
    wrapper.className = 'tooltip-wrapper';
    const slot = document.createElement('slot');
    wrapper.appendChild(slot);
    const tip = document.createElement('span');
    tip.className = 'tooltip';
    tip.textContent = this.getAttribute('text') || '';
    wrapper.appendChild(tip);
    const style = document.createElement('style');
    style.textContent = `
      .tooltip-wrapper { position: relative; display: inline-block; }
      .tooltip { visibility: hidden; background: #333; color: #fff; padding: 0.25em 0.5em; border-radius: 4px; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); white-space: nowrap; }
      .tooltip-wrapper:hover .tooltip { visibility: visible; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }
}
customElements.define('eui-tooltip', EUITooltip);
