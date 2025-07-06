export class EUITabs extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const nav = document.createElement('nav');
    const slot = document.createElement('slot');
    slot.name = 'tab';
    nav.appendChild(slot);
    const content = document.createElement('div');
    content.className = 'content';
    const defaultSlot = document.createElement('slot');
    content.appendChild(defaultSlot);
    const style = document.createElement('style');
    style.textContent = `
      nav { display: flex; border-bottom: 1px solid #ccc; }
      ::slotted([slot="tab"]) { padding: 0.5em 1em; cursor: pointer; }
      .content { padding: 1em; }
    `;
    shadow.appendChild(style);
    shadow.appendChild(nav);
    shadow.appendChild(content);
  }
}
customElements.define('eui-tabs', EUITabs);
